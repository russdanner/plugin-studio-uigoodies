/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { getGlobalHeaders } from '@craftercms/studio-ui/utils/ajax';

const MAX_BUFFERED_ENTRIES = 5000;
/** Delay before reconnecting after the server sends a `bye` (time-cap) event. */
const RECONNECT_AFTER_BYE_MS = 750;

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'OTHER';

type LogEntry = {
  /** Stable id for React keys. */
  id: number;
  /** First line of the entry (the actual log message). */
  head: string;
  /** Detected level (used for color). */
  level: LogLevel;
  /** Stack-trace / continuation lines appended after the head. */
  trace: string[];
  /** Whether the trace block has been opened in the UI. */
  open: boolean;
};

type StreamStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error';

type ServerEvent =
  | { type: 'hello'; path?: string; startOffset?: number; active?: number }
  | { type: 'log'; line?: string }
  | { type: 'rotated'; path?: string }
  | { type: 'hb'; ts?: number }
  | { type: 'bye'; reason?: string }
  | { type: 'error'; message?: string };

const LEVEL_PATTERNS: Array<{ level: LogLevel; rx: RegExp }> = [
  { level: 'ERROR', rx: /\b(ERROR|FATAL|SEVERE)\b/ },
  { level: 'WARN', rx: /\b(WARN|WARNING)\b/ },
  { level: 'INFO', rx: /\b(INFO|NOTICE)\b/ },
  { level: 'DEBUG', rx: /\b(DEBUG|FINE)\b/ },
  { level: 'TRACE', rx: /\b(TRACE|FINER|FINEST)\b/ }
];

/** Level row styling tuned for dark log panel background. */
const LEVEL_COLORS_DARK: Record<LogLevel, { fg: string; bg: string; chip: string }> = {
  ERROR: { fg: '#ffd2d2', bg: 'rgba(244, 67, 54, 0.18)', chip: '#f44336' },
  WARN: { fg: '#ffe4ad', bg: 'rgba(255, 152, 0, 0.18)', chip: '#ff9800' },
  INFO: { fg: '#cfe7ff', bg: 'rgba(33, 150, 243, 0.12)', chip: '#2196f3' },
  DEBUG: { fg: '#cdcdcd', bg: 'rgba(120, 120, 120, 0.12)', chip: '#9e9e9e' },
  TRACE: { fg: '#b8b8b8', bg: 'rgba(120, 120, 120, 0.08)', chip: '#757575' },
  OTHER: { fg: '#e0e0e0', bg: 'transparent', chip: '#616161' }
};

/** Level row styling tuned for light log panel background. */
const LEVEL_COLORS_LIGHT: Record<LogLevel, { fg: string; bg: string; chip: string }> = {
  ERROR: { fg: '#7f1d1d', bg: 'rgba(244, 67, 54, 0.1)', chip: '#d32f2f' },
  WARN: { fg: '#7c2d12', bg: 'rgba(255, 152, 0, 0.12)', chip: '#ef6c00' },
  INFO: { fg: '#0d47a1', bg: 'rgba(33, 150, 243, 0.08)', chip: '#1565c0' },
  DEBUG: { fg: '#424242', bg: 'rgba(97, 97, 97, 0.06)', chip: '#616161' },
  TRACE: { fg: '#616161', bg: 'rgba(97, 97, 97, 0.05)', chip: '#757575' },
  OTHER: { fg: '#212121', bg: 'transparent', chip: '#616161' }
};

const ENTRY_START_RX =
  /^\s*(\d{2,4}[-/]\d{2}[-/]\d{2,4}[ T]\d{2}:\d{2}:\d{2}|\[\d{2,4}-\d{2}-\d{2}|\d{2}:\d{2}:\d{2}|[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})/;
const TRACE_LINE_RX = /^(\s+at\s|\s*Caused by:|\s*Suppressed:|\s+\.{3}\s+\d+\s+more)/;

function detectLevel(line: string): LogLevel {
  for (const { level, rx } of LEVEL_PATTERNS) {
    if (rx.test(line)) {
      return level;
    }
  }
  return 'OTHER';
}

function isTraceLine(line: string): boolean {
  return TRACE_LINE_RX.test(line);
}

function isEntryHead(line: string): boolean {
  if (isTraceLine(line)) return false;
  return ENTRY_START_RX.test(line) || /\b(ERROR|WARN|INFO|DEBUG|TRACE|FATAL|SEVERE)\b/.test(line);
}

/**
 * Configuration props supplied via the `ui.xml` <configuration> block.
 *
 * Single file:
 *   <configuration>
 *     <path>/opt/crafter/logs/tomcat/catalina.out</path>
 *   </configuration>
 *
 * Multiple files (dropdown shown):
 *   <configuration>
 *     <files>
 *       <file>
 *         <label>Tomcat catalina.out</label>
 *         <path>/opt/crafter/logs/tomcat/catalina.out</path>
 *       </file>
 *       <file>
 *         <label>Engine</label>
 *         <path>/opt/crafter/logs/tomcat/crafter.log</path>
 *       </file>
 *     </files>
 *   </configuration>
 */
export interface LogTailFile {
  label?: string;
  path?: string;
}

/**
 * Default file list used when neither `<path>` nor `<files>` is supplied in
 * the widget's `ui.xml` `<configuration>`. These match the defaults wired
 * into `craftercms-plugin.yaml` so a fresh install of the plugin shows
 * something useful even if the admin never edits `ui.xml`.
 *
 * Paths are relative to the JVM working directory (typically
 * `crafter-authoring/bin`), which lands in the standard CrafterCMS `logs/`
 * tree on a default install.
 */
const DEFAULT_FILES: LogTailFile[] = [
  { label: 'Tomcat', path: '../logs/tomcat/catalina.out' },
  { label: 'Deployer', path: '../logs/deployer/crafter-deployer.out' },
  { label: 'Search', path: '../logs/search/opensearch.log' }
];

export interface LogTailProps {
  /** Single absolute path to a log file on the server. */
  path?: string;
  /**
   * Multiple files to choose from. Studio's XML→JSON conversion turns
   * sibling `<file>` elements into either an array or an object keyed by
   * index — both shapes are normalized.
   */
  files?:
    | { file?: LogTailFile | LogTailFile[] | Record<string, LogTailFile> }
    | LogTailFile[]
    | Record<string, LogTailFile>;
}

function normalizeFiles(files: LogTailProps['files']): LogTailFile[] {
  if (!files) return [];
  let raw: unknown =
    Array.isArray(files) || typeof files !== 'object' ? files : (files as { file?: unknown }).file ?? files;
  if (!raw) return [];
  let list: LogTailFile[];
  if (Array.isArray(raw)) {
    list = raw as LogTailFile[];
  } else if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    // Object keyed by integer (multi `<file>` after XML→JSON), or single object literal.
    const numericKeys = Object.keys(obj).filter((k) => /^\d+$/.test(k));
    if (numericKeys.length > 0 && numericKeys.length === Object.keys(obj).length) {
      list = numericKeys.map((k) => obj[k] as LogTailFile);
    } else if ('path' in obj || 'label' in obj) {
      list = [obj as LogTailFile];
    } else {
      list = [];
    }
  } else {
    list = [];
  }
  return list
    .filter((f): f is LogTailFile => Boolean(f && typeof f === 'object'))
    .map((f) => ({
      label: typeof f.label === 'string' ? f.label.trim() : undefined,
      path: typeof f.path === 'string' ? f.path.trim() : undefined
    }))
    .filter((f) => Boolean(f.path));
}

export default function LogTail(props: LogTailProps = {}) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const theme = useTheme();
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  /**
   * AbortController for the in-flight fetch() stream. Set to null when no
   * stream is active. Calling .abort() cancels the response stream, which
   * makes the server-side writer.checkError() flip and the loop exits.
   */
  const abortRef = useRef<AbortController | null>(null);
  /**
   * Generation token; incremented on every (re)connect. Async callbacks check
   * this before mutating state so a stale stream from a previous selection
   * cannot overwrite the current view.
   */
  const generationRef = useRef(0);
  /** Pending reconnect timer id (after a `bye` event). */
  const reconnectTimerRef = useRef<number | null>(null);
  const nextIdRef = useRef(1);

  const configuredFiles = useMemo<LogTailFile[]>(() => {
    const list = normalizeFiles(props.files);
    if (list.length > 0) return list;
    if (props.path && typeof props.path === 'string' && props.path.trim()) {
      return [{ label: props.path.trim(), path: props.path.trim() }];
    }
    // Nothing in ui.xml — fall back to the same defaults the plugin's
    // installation block ships, so a fresh install still works without
    // any per-environment editing.
    return DEFAULT_FILES;
  }, [props.files, props.path]);

  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<StreamStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'ALL'>('ALL');
  const [selectedPath, setSelectedPath] = useState<string>(() => configuredFiles[0]?.path ?? '');
  const [serverInfo, setServerInfo] = useState<{ path?: string; active?: number } | null>(null);

  // If the configured list changes (e.g. ui.xml edit) and the current
  // selection is no longer valid, drop back to the first configured path.
  useEffect(() => {
    if (configuredFiles.length === 0) {
      if (selectedPath) setSelectedPath('');
      return;
    }
    if (!configuredFiles.some((f) => f.path === selectedPath)) {
      setSelectedPath(configuredFiles[0].path ?? '');
    }
  }, [configuredFiles, selectedPath]);

  const endpoint = useMemo(() => {
    if (!siteId || !selectedPath) return '';
    const params = new URLSearchParams();
    params.set('siteId', siteId);
    params.set('path', selectedPath);
    return `/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail?${params.toString()}`;
  }, [siteId, selectedPath]);

  const closeStream = useCallback(() => {
    if (reconnectTimerRef.current != null) {
      window.clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    // Bump generation so any pending async readers stop touching state.
    generationRef.current += 1;
    setStatus((s) => (s === 'idle' ? s : 'closed'));
  }, []);

  const appendLine = useCallback((rawLine: string) => {
    setEntries((prev) => {
      const next = prev.slice();
      if (next.length > 0 && (isTraceLine(rawLine) || !isEntryHead(rawLine))) {
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, trace: [...last.trace, rawLine] };
      } else {
        next.push({
          id: nextIdRef.current++,
          head: rawLine,
          level: detectLevel(rawLine),
          trace: [],
          open: false
        });
      }
      if (next.length > MAX_BUFFERED_ENTRIES) {
        next.splice(0, next.length - MAX_BUFFERED_ENTRIES);
      }
      return next;
    });
  }, []);

  /**
   * Open a fetch() streaming request to the log-tail script and consume
   * NDJSON events from the response body. We use fetch() (not EventSource)
   * because Studio authenticates with `Authorization: Bearer <jwt>` set as
   * a global header by `@craftercms/studio-ui`; EventSource cannot send
   * custom headers and would always be rejected with HTTP 401.
   */
  const startStream = useCallback(() => {
    if (!siteId) {
      dispatch(showSystemNotification({ message: 'No active site for log tail.' }));
      return;
    }
    if (!selectedPath || !endpoint) {
      // Should not happen in practice — `configuredFiles` always has at least
      // one entry (the DEFAULT_FILES fallback). Fires only if siteId is empty
      // or `<files>` was supplied with no usable children.
      setStatus('error');
      setErrorMessage('No log file selected for this widget.');
      return;
    }
    // Cancel any prior stream / pending reconnect.
    if (reconnectTimerRef.current != null) {
      window.clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    const generation = ++generationRef.current;
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus('connecting');
    setErrorMessage(null);

    const url = endpoint;

    void (async () => {
      let res: Response;
      try {
        res = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          credentials: 'include',
          headers: {
            // Pull JWT (`Authorization: Bearer ...`) and any other Studio
            // global headers from the studio-ui ajax module so the request
            // is treated as authenticated by Studio.
            ...getGlobalHeaders(),
            Accept: 'application/x-ndjson'
          }
        });
      } catch (e) {
        if (generation !== generationRef.current) return;
        if (controller.signal.aborted) return;
        const msg = e instanceof Error ? e.message : String(e);
        setStatus('error');
        setErrorMessage(`Network error: ${msg}`);
        return;
      }

      if (generation !== generationRef.current) return;

      if (!res.ok || !res.body) {
        // Read the JSON error body the script returns on validation failures
        // (missing path, unsafe path, file not found, etc).
        let detail = '';
        try {
          const body = await res.text();
          if (body) {
            try {
              const parsed = JSON.parse(body) as { error?: string; response?: { message?: string } };
              detail = parsed.error || parsed.response?.message || body.slice(0, 500);
            } catch {
              detail = body.slice(0, 500);
            }
          }
        } catch {
          /* ignore */
        }
        if (generation !== generationRef.current) return;
        setStatus('error');
        setErrorMessage(`HTTP ${res.status} — ${detail || res.statusText || 'no response body'}`);
        return;
      }

      // Successful stream — consume NDJSON line-by-line.
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let helloSeen = false;
      let serverSentBye = false;

      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (generation !== generationRef.current) {
            try {
              await reader.cancel();
            } catch {
              /* ignore */
            }
            return;
          }
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            const rawLine = buffer.slice(0, nl);
            buffer = buffer.slice(nl + 1);
            const trimmed = rawLine.trim();
            if (!trimmed) continue;
            let evt: ServerEvent | null = null;
            try {
              evt = JSON.parse(trimmed) as ServerEvent;
            } catch {
              continue;
            }
            if (!evt || typeof evt.type !== 'string') continue;
            switch (evt.type) {
              case 'hello':
                helloSeen = true;
                setServerInfo({ path: evt.path, active: evt.active });
                setErrorMessage(null);
                setStatus('open');
                break;
              case 'log':
                if (typeof evt.line === 'string') {
                  appendLine(evt.line);
                }
                break;
              case 'rotated':
                appendLine('--- log rotated ---');
                break;
              case 'hb':
                // Heartbeat — nothing to do; receipt confirms liveness.
                break;
              case 'bye':
                serverSentBye = true;
                break;
              case 'error':
                setStatus('error');
                setErrorMessage(evt.message ?? 'Server reported an error.');
                break;
              default:
                break;
            }
          }
        }
      } catch (e) {
        if (generation !== generationRef.current) return;
        if (controller.signal.aborted) return;
        const msg = e instanceof Error ? e.message : String(e);
        setStatus('error');
        setErrorMessage(helloSeen ? `Stream interrupted: ${msg}` : `Connection failed: ${msg}`);
        return;
      }

      if (generation !== generationRef.current) return;

      // Stream closed cleanly. If the server sent `bye` we reconnect (it
      // closes the response after MAX_RUN_MILLIS to avoid pinning a thread).
      if (serverSentBye) {
        setStatus('connecting');
        reconnectTimerRef.current = window.setTimeout(() => {
          reconnectTimerRef.current = null;
          startStream();
        }, RECONNECT_AFTER_BYE_MS);
      } else {
        setStatus('closed');
      }
    })();
  }, [appendLine, dispatch, endpoint, selectedPath, siteId]);

  // Auto-start when the panel mounts; auto-close when it unmounts.
  useEffect(() => {
    startStream();
    return () => {
      closeStream();
    };
  }, [closeStream, startStream]);

  // Pause when the tab is hidden so we don't pile up entries while not visible.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        closeStream();
      } else if (status !== 'open' && status !== 'connecting') {
        startStream();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [closeStream, startStream, status]);

  // Auto-scroll to bottom when new entries arrive.
  useEffect(() => {
    if (!autoScroll) return;
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [autoScroll, entries.length]);

  useEffect(() => {
    if (!isFullscreen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        if (document.fullscreenElement) {
          void document.exitFullscreen().catch(() => undefined);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    const el = fullscreenRef.current;
    if (!el) return;
    const goingFullscreen = document.fullscreenElement !== el;
    setIsFullscreen(goingFullscreen);
    if (goingFullscreen) {
      try {
        const p = el.requestFullscreen?.();
        if (p && typeof p.catch === 'function') {
          p.catch(() => undefined);
        }
      } catch {
        /* CSS overlay covers it */
      }
    } else if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    }
  }, []);

  const toggleEntry = useCallback((id: number) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, open: !e.open } : e)));
  }, []);

  const onClear = useCallback(() => setEntries([]), []);

  const [dropAllInFlight, setDropAllInFlight] = useState(false);

  /**
   * Server-side fan-out kill switch. Calls the companion plugin script
   * `log-tail-drop-all`, which bumps a "drop generation" counter on the
   * Studio servlet context. Every active streaming loop samples that
   * counter once per iteration and exits cleanly when it changes, so all
   * users — not just the one clicking this button — get cut off. Also
   * closes our own local stream immediately, then notifies the user with
   * how many connections were dropped.
   */
  const dropAllConnections = useCallback(async () => {
    if (dropAllInFlight) return;
    if (!siteId) {
      dispatch(showSystemNotification({ message: 'No active site for log tail.' }));
      return;
    }
    const ok = window.confirm(
      'Drop ALL active log-tail connections for every user in this Studio?\n\n' +
        'Each affected viewer will need to click Start to reconnect.'
    );
    if (!ok) return;
    setDropAllInFlight(true);
    closeStream();
    try {
      const params = new URLSearchParams();
      params.set('siteId', siteId);
      const url = `/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail-drop-all?${params.toString()}`;
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { ...getGlobalHeaders(), Accept: 'application/json' }
      });
      let body: { dropGeneration?: number; previousActive?: number; error?: string } = {};
      try {
        body = (await res.json()) as typeof body;
      } catch {
        /* ignore */
      }
      if (!res.ok) {
        const msg = body.error || res.statusText || `HTTP ${res.status}`;
        dispatch(showSystemNotification({ message: `Drop all failed: ${msg}` }));
        return;
      }
      const dropped = body.previousActive ?? 0;
      dispatch(
        showSystemNotification({
          message:
            dropped === 0
              ? 'No active log-tail connections to drop.'
              : `Dropped ${dropped} active log-tail connection${dropped === 1 ? '' : 's'}.`
        })
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(showSystemNotification({ message: `Drop all error: ${msg}` }));
    } finally {
      setDropAllInFlight(false);
    }
  }, [closeStream, dispatch, dropAllInFlight, siteId]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q && levelFilter === 'ALL') {
      return entries;
    }
    return entries.filter((e) => {
      if (levelFilter !== 'ALL' && e.level !== levelFilter) return false;
      if (!q) return true;
      const haystack = [e.head, ...e.trace].join('\n').toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, filter, levelFilter]);

  // Render Select menus inside the fullscreen container while the panel is
  // fullscreen. MUI's default is to portal menus into `document.body`, but
  // `document.fullscreenElement` masks everything outside its subtree, so a
  // body-level portal would be invisible. Re-memoize whenever fullscreen
  // changes so the underlying Popover picks up the new container.
  const selectMenuProps = useMemo(
    () => ({
      MenuProps: {
        container: () => (isFullscreen ? fullscreenRef.current : document.body)
      }
    }),
    [isFullscreen]
  );

  return (
    <Box
      ref={fullscreenRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 480,
        p: 2,
        gap: 1.5,
        boxSizing: 'border-box',
        bgcolor: 'background.default',
        ...(isFullscreen && {
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          zIndex: (theme) => theme.zIndex.modal + 100,
          overflow: 'auto'
        })
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <TerminalRoundedIcon color="primary" />
        <Typography variant="h5" component="h1" sx={{ flex: 1 }}>
          Log Tail
        </Typography>
        <Tooltip title={isFullscreen ? 'Exit full screen' : 'Full screen'}>
          <IconButton
            size="small"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
            sx={{ flexShrink: 0 }}
          >
            {isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField size="small" label="Active site" value={siteId ?? ''} disabled sx={{ minWidth: 160 }} />
        {configuredFiles.length > 1 ? (
          <TextField
            select
            size="small"
            label="Log file"
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            sx={{ minWidth: 220 }}
            SelectProps={selectMenuProps}
          >
            {configuredFiles.map((f) => (
              <MenuItem key={f.path} value={f.path}>
                {f.label || f.path}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
        <Chip
          label={
            status === 'open'
              ? 'Streaming'
              : status === 'connecting'
              ? 'Connecting…'
              : status === 'error'
              ? 'Connection error'
              : status === 'closed'
              ? 'Disconnected'
              : 'Idle'
          }
          color={
            status === 'open'
              ? 'success'
              : status === 'connecting'
              ? 'info'
              : status === 'error'
              ? 'error'
              : 'default'
          }
          size="small"
        />
        {serverInfo?.active != null && (
          <Chip
            label={`active connections: ${serverInfo.active}`}
            size="small"
            variant="outlined"
          />
        )}
        <Box sx={{ flex: 1 }} />
        <TextField
          size="small"
          label="Filter"
          placeholder="Search line text…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ minWidth: 200, flex: '0 1 280px' }}
        />
        <TextField
          select
          size="small"
          label="Level"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value as LogLevel | 'ALL')}
          sx={{ width: 130 }}
          SelectProps={selectMenuProps}
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="ERROR">Error</MenuItem>
          <MenuItem value="WARN">Warn</MenuItem>
          <MenuItem value="INFO">Info</MenuItem>
          <MenuItem value="DEBUG">Debug</MenuItem>
          <MenuItem value="TRACE">Trace</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </TextField>
        <Button
          size="small"
          variant={autoScroll ? 'contained' : 'outlined'}
          onClick={() => setAutoScroll((v) => !v)}
        >
          {autoScroll ? 'Auto-scroll: on' : 'Auto-scroll: off'}
        </Button>
        {status === 'open' || status === 'connecting' ? (
          <Tooltip title="Close this panel’s streaming request only. Other users keep streaming.">
            <Button size="small" variant="outlined" onClick={closeStream} startIcon={<StopRoundedIcon />}>
              Stop
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Open a streaming connection for the selected log file.">
            <Button size="small" variant="outlined" onClick={startStream} startIcon={<PlayArrowRoundedIcon />}>
              Start
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Remove all lines from this view only. Does not truncate log files on the server.">
          <span>
            <Button size="small" variant="outlined" onClick={onClear} startIcon={<DeleteSweepRoundedIcon />}>
              Clear
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Server-wide: close every active log-tail stream for ALL users in this Studio. Frees server-side tail slots; log files on disk are unchanged.">
          <span>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={dropAllConnections}
              disabled={dropAllInFlight}
              startIcon={<PowerSettingsNewRoundedIcon />}
            >
              {dropAllInFlight ? 'Dropping…' : 'Drop all connections'}
            </Button>
          </span>
        </Tooltip>
      </Box>

      {status === 'error' && errorMessage && (
        <Paper
          variant="outlined"
          sx={{
            p: 1.25,
            bgcolor: 'rgba(244, 67, 54, 0.08)',
            borderColor: 'rgba(244, 67, 54, 0.5)',
            color: 'error.main',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 12.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          <strong>Log tail server error:</strong> {errorMessage}
        </Paper>
      )}
      <Paper
        variant="outlined"
        ref={scrollRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          p: 0,
          bgcolor: theme.palette.mode === 'dark' ? '#101418' : theme.palette.grey[100],
          color: theme.palette.mode === 'dark' ? '#e6e6e6' : theme.palette.text.primary,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 12.5,
          lineHeight: 1.45
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((entry) => (
            <LogEntryRow key={entry.id} entry={entry} onToggle={toggleEntry} />
          ))
        ) : entries.length > 0 ? (
          <Box sx={{ p: 2, color: 'text.secondary' }}>
            <Typography variant="body2" component="p" sx={{ mb: 1 }}>
              No log entries match the current filter or level.
            </Typography>
            {(filter.trim() || levelFilter !== 'ALL') && (
              <Typography variant="caption" component="p" sx={{ fontFamily: 'monospace' }}>
                {filter.trim() ? `Filter: "${filter.trim()}"` : null}
                {filter.trim() && levelFilter !== 'ALL' ? ' · ' : null}
                {levelFilter !== 'ALL' ? `Level: ${levelFilter}` : null}
                {' — '}
                {entries.length} entr{entries.length === 1 ? 'y' : 'ies'} loaded
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ p: 2, color: 'text.secondary' }}>
            {status === 'connecting'
              ? 'Connecting to log stream…'
              : status === 'error'
              ? errorMessage ?? 'Connection error. Click Start to retry.'
              : status === 'closed'
              ? 'Stopped.'
              : 'Waiting for log lines…'}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

function LogEntryRow({
  entry,
  onToggle
}: {
  entry: LogEntry;
  onToggle: (id: number) => void;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const palette = (isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT)[entry.level];
  const hasTrace = entry.trace.length > 0;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        px: 1.5,
        py: 0.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: palette.bg,
        color: palette.fg,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}
    >
      <Box
        sx={{
          width: 50,
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 700,
          color: '#fff',
          bgcolor: palette.chip,
          borderRadius: 0.5,
          textAlign: 'center',
          py: 0.25,
          mt: 0.25
        }}
      >
        {entry.level === 'OTHER' ? '·' : entry.level}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
          {hasTrace && (
            <IconButton
              size="small"
              onClick={() => onToggle(entry.id)}
              sx={{ p: 0, color: 'inherit', mt: '-2px' }}
              aria-label={entry.open ? 'Collapse stack trace' : 'Expand stack trace'}
            >
              {entry.open ? (
                <KeyboardArrowDownRoundedIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightRoundedIcon fontSize="small" />
              )}
            </IconButton>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>{entry.head}</Box>
          {hasTrace && (
            <Box
              onClick={() => onToggle(entry.id)}
              sx={{
                cursor: 'pointer',
                fontSize: 11,
                px: 0.75,
                py: 0.25,
                borderRadius: 0.5,
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                color: isDark ? '#ffd6a8' : '#b45309',
                flexShrink: 0,
                ml: 1
              }}
            >
              {entry.open ? 'hide trace' : `${entry.trace.length} trace line${entry.trace.length === 1 ? '' : 's'}`}
            </Box>
          )}
        </Box>
        {hasTrace && entry.open && (
          <Box
            sx={{
              mt: 0.5,
              pl: 2,
              borderLeft: '2px solid',
              borderColor: isDark ? 'rgba(255,214,168,0.4)' : 'rgba(234, 88, 12, 0.35)',
              color: isDark ? '#c8c8c8' : 'text.secondary',
              fontSize: 12
            }}
          >
            {entry.trace.map((line, i) => (
              <Box key={i}>{line}</Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
