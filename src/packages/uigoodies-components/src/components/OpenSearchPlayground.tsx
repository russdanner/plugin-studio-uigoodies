/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
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
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import { Group, Panel, Separator, usePanelRef } from 'react-resizable-panels';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { CRAFTER_OPENSEARCH_FIELD_GROUPS } from '../utils/crafterOpenSearchFieldCatalog';
import { executeOpenSearchOnEngine, prettifyJson } from '../utils/openSearchEngine';
import {
  appendBoolMustClause,
  buildExistsClause,
  buildMatchClause,
  buildPrefixClause,
  buildRangeClause,
  buildTermClause,
  buildWildcardClause,
  readSourceArray,
  setSourceArray
} from '../utils/openSearchQueryBuilder';
import type { InferredField } from '../utils/openSearchInferSchema';
import { OpenSearchSchemaPanel } from './OpenSearchSchemaPanel';
import { OpenSearchJsonEditor } from './OpenSearchJsonEditor';

const DEFAULT_QUERY = `{
  "size": 10,
  "query": {
    "match_all": {}
  },
  "_source": ["localId", "internal-name", "content-type"]
}`;

const RESPONSE_LOADING_JSON = '{\n  "_studioOpenSearch": "Running query…"\n}\n';

const RESPONSE_EMPTY_JSON =
  '{\n  "_studioOpenSearch": "Run from the request panel (Run button or ⌘/Ctrl+Enter in the editor). Fold JSON with gutter chevrons."\n}\n';

const TEMPLATES: { label: string; body: string }[] = [
  { label: 'Match all (10 hits)', body: DEFAULT_QUERY },
  {
    label: 'Prefix on localId',
    body: `{
  "size": 20,
  "query": {
    "prefix": {
      "localId": "/site/website/"
    }
  },
  "_source": ["localId", "title_t", "content-type"]
}`
  },
  {
    label: 'Term on content-type',
    body: `{
  "size": 10,
  "query": {
    "term": {
      "content-type": {
        "value": "/page/article"
      }
    }
  }
}`
  }
];

function ResizeGrip({ vertical }: { vertical: boolean }) {
  if (vertical) {
    return (
      <Separator style={{ height: 10, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Box sx={{ height: 4, alignSelf: 'stretch', mx: 2, borderRadius: 1, bgcolor: 'divider' }} />
      </Separator>
    );
  }
  return (
    <Separator style={{ width: 10, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <Box sx={{ width: 4, alignSelf: 'stretch', my: 1.5, borderRadius: 1, bgcolor: 'divider' }} />
    </Separator>
  );
}

export function OpenSearchPlayground() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const explorerPanelRef = usePanelRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [explorerCollapsed, setExplorerCollapsed] = useState(false);
  const siteId = useActiveSiteId();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [response, setResponse] = useState('');
  const [extraIndexes, setExtraIndexes] = useState('');
  const [loading, setLoading] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CRAFTER_OPENSEARCH_FIELD_GROUPS.map((g) => [g.title, true]))
  );
  const [templateMenuKey, setTemplateMenuKey] = useState(0);
  const [inferredFields, setInferredFields] = useState<InferredField[]>([]);
  const [builderField, setBuilderField] = useState('');
  const [builderMode, setBuilderMode] = useState<'match' | 'term' | 'prefix' | 'wildcard' | 'range' | 'exists'>(
    'match'
  );
  const [builderValue, setBuilderValue] = useState('');
  const [builderGte, setBuilderGte] = useState('');
  const [builderLte, setBuilderLte] = useState('');

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenRef.current);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setExplorerCollapsed(explorerPanelRef.current?.isCollapsed() ?? false);
    });
    return () => cancelAnimationFrame(id);
  }, [isMdUp]);

  const toggleFullscreen = useCallback(() => {
    const el = fullscreenRef.current;
    if (!el) return;
    if (document.fullscreenElement === el) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void el.requestFullscreen().catch(() => undefined);
    }
  }, []);

  const syncExplorerCollapsed = useCallback(() => {
    queueMicrotask(() => {
      setExplorerCollapsed(explorerPanelRef.current?.isCollapsed() ?? false);
    });
  }, []);

  const collapseExplorerPanel = useCallback(() => {
    explorerPanelRef.current?.collapse();
    syncExplorerCollapsed();
  }, [syncExplorerCollapsed]);

  const expandExplorerPanel = useCallback(() => {
    explorerPanelRef.current?.expand();
    syncExplorerCollapsed();
  }, [syncExplorerCollapsed]);

  const sourceIsWildcard = useMemo(() => {
    try {
      return (JSON.parse(query) as Record<string, unknown>)._source === true;
    } catch {
      return false;
    }
  }, [query]);

  const selectedFields = useMemo(() => {
    try {
      const arr = readSourceArray(JSON.parse(query) as Record<string, unknown>);
      return new Set(arr.filter((p) => p !== '*'));
    } catch {
      return new Set<string>();
    }
  }, [query]);

  const pathOptions = useMemo(() => inferredFields.map((f) => f.path), [inferredFields]);

  const toggleField = useCallback(
    (field: string, checked: boolean) => {
      try {
        const body = JSON.parse(query) as Record<string, unknown>;
        const cur = readSourceArray(body).filter((p) => p !== '*');
        const next = new Set(cur);
        if (checked) {
          next.add(field);
        } else {
          next.delete(field);
        }
        setQuery(JSON.stringify(setSourceArray(body, Array.from(next)), null, 2));
      } catch {
        dispatch(
          showSystemNotification({
            message: 'Fix JSON in the query editor before toggling fields (invalid JSON).'
          })
        );
      }
    },
    [dispatch, query]
  );

  const insertFromBuilderBar = useCallback(() => {
    if (!builderField.trim()) {
      dispatch(showSystemNotification({ message: 'Choose a field path.' }));
      return;
    }
    const field = builderField.trim();
    try {
      const body = JSON.parse(query) as Record<string, unknown>;
      let clause: Record<string, unknown> | null = null;
      if (builderMode === 'exists') {
        clause = buildExistsClause(field);
      } else if (builderMode === 'match' && builderValue.trim()) {
        clause = buildMatchClause(field, builderValue.trim());
      } else if (builderMode === 'term' && builderValue.trim()) {
        clause = buildTermClause(field, builderValue.trim());
      } else if (builderMode === 'prefix' && builderValue.trim()) {
        clause = buildPrefixClause(field, builderValue.trim());
      } else if (builderMode === 'wildcard' && builderValue.trim()) {
        clause = buildWildcardClause(field, builderValue.trim());
      } else if (builderMode === 'range' && (builderGte.trim() || builderLte.trim())) {
        clause = buildRangeClause(field, builderGte, builderLte);
      }
      if (!clause) {
        dispatch(showSystemNotification({ message: 'Enter a value (or gte/lte for range).' }));
        return;
      }
      setQuery(JSON.stringify(appendBoolMustClause(body, clause), null, 2));
      dispatch(showSystemNotification({ message: `Inserted ${builderMode} for "${field}".` }));
    } catch {
      dispatch(showSystemNotification({ message: 'Fix invalid JSON in the query editor first.' }));
    }
  }, [builderField, builderGte, builderLte, builderMode, builderValue, dispatch, query]);

  const runQuery = useCallback(async () => {
    if (!siteId) {
      dispatch(showSystemNotification({ message: 'No active site.' }));
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const result = await executeOpenSearchOnEngine(siteId, query, extraIndexes);
      const pretty = result.parsedJson != null ? JSON.stringify(result.parsedJson, null, 2) : result.bodyText;
      setResponse(pretty);
      if (!result.ok) {
        dispatch(
          showSystemNotification({
            message: `OpenSearch returned HTTP ${result.status}. See response pane for body.`
          })
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setResponse(msg);
      dispatch(showSystemNotification({ message: `Request failed: ${msg}` }));
    } finally {
      setLoading(false);
    }
  }, [dispatch, extraIndexes, query, siteId]);

  const displayedResponse = useMemo(
    () => (loading && !response ? RESPONSE_LOADING_JSON : response || RESPONSE_EMPTY_JSON),
    [loading, response]
  );

  const onPrettify = useCallback(() => {
    try {
      setQuery(prettifyJson(query));
      dispatch(showSystemNotification({ message: 'Query formatted.' }));
    } catch {
      dispatch(showSystemNotification({ message: 'Query is not valid JSON.' }));
    }
  }, [dispatch, query]);

  const onCopyQuery = useCallback(() => {
    void navigator.clipboard.writeText(query);
    dispatch(showSystemNotification({ message: 'Query copied to clipboard.' }));
  }, [dispatch, query]);

  const onCopyResponse = useCallback(() => {
    void navigator.clipboard.writeText(displayedResponse);
    dispatch(showSystemNotification({ message: 'Response copied to clipboard.' }));
  }, [dispatch, displayedResponse]);

  const orientationVertical = !isMdUp;

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
          minHeight: '100vh'
        })
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap' }}>
        <SearchRoundedIcon color="primary" sx={{ mt: 0.5 }} />
        <Typography variant="h5" component="h1">
          OpenSearch
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flex: '1 1 200px' }}>
          Raw DSL against{' '}
          <Typography component="span" variant="body2" fontFamily="monospace">
            POST /api/1/site/search/search.json?crafterSite=…
          </Typography>
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
        <TextField
          size="small"
          label="Extra indexes (optional)"
          placeholder="e.g. other-alias (see multi-index docs)"
          value={extraIndexes}
          onChange={(e) => setExtraIndexes(e.target.value)}
          sx={{ flex: '1 1 220px', minWidth: 200 }}
        />
        <TextField
          key={templateMenuKey}
          select
          size="small"
          label="Load template"
          defaultValue=""
          sx={{ minWidth: 200 }}
          SelectProps={{ displayEmpty: true }}
          onChange={(e) => {
            const t = TEMPLATES.find((x) => x.label === e.target.value);
            if (t) {
              setQuery(t.body);
            }
            setTemplateMenuKey((k) => k + 1);
          }}
        >
          <MenuItem value="">
            <em>Choose…</em>
          </MenuItem>
          {TEMPLATES.map((t) => (
            <MenuItem key={t.label} value={t.label}>
              {t.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Group
          key={isMdUp ? 'opensearch-layout-wide' : 'opensearch-layout-stack'}
          id="uigoodies-opensearch-panels"
          orientation={orientationVertical ? 'vertical' : 'horizontal'}
          style={{ flex: 1, minHeight: 0, minWidth: 0, width: '100%', display: 'flex' }}
        >
          <Panel
            id="explorer"
            panelRef={explorerPanelRef}
            collapsible
            collapsedSize={orientationVertical ? 52 : 44}
            minSize={orientationVertical ? '18%' : '14%'}
            maxSize={orientationVertical ? '55%' : '42%'}
            defaultSize={orientationVertical ? '30%' : '24%'}
            onResize={syncExplorerCollapsed}
          >
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                overflow: 'hidden',
                borderRadius: 1
              }}
            >
              {!explorerCollapsed ? (
                <>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderBottom: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexShrink: 0
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ flex: 1, minWidth: 0 }}>
                      Explorer &amp; query builder
                    </Typography>
                    <Tooltip title="Collapse explorer">
                      <IconButton
                        size="small"
                        onClick={collapseExplorerPanel}
                        aria-label="Collapse explorer"
                        edge="end"
                      >
                        {orientationVertical ? <KeyboardArrowUpRoundedIcon /> : <ChevronLeftRoundedIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ overflow: 'auto', flex: 1, minHeight: 0 }}>
                    <OpenSearchSchemaPanel
                      siteId={siteId}
                      extraIndexes={extraIndexes}
                      query={query}
                      setQuery={setQuery}
                      openGroups={openGroups}
                      setOpenGroups={setOpenGroups}
                      selectedFields={selectedFields}
                      toggleField={toggleField}
                      onInferredFieldsChange={setInferredFields}
                      sourceIsWildcard={sourceIsWildcard}
                    />
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: orientationVertical ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    py: orientationVertical ? 0 : 1,
                    px: orientationVertical ? 1 : 0,
                    gap: 1
                  }}
                >
                  <Tooltip title="Expand explorer">
                    <IconButton size="small" onClick={expandExplorerPanel} aria-label="Expand explorer">
                      {orientationVertical ? <KeyboardArrowDownRoundedIcon /> : <ChevronRightRoundedIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Paper>
          </Panel>

          <ResizeGrip vertical={orientationVertical} />

          <Panel id="request" defaultSize={orientationVertical ? '35%' : '38%'} minSize="20%">
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap'
                }}
              >
                <Typography variant="subtitle2" sx={{ flex: '1 1 auto' }}>
                  Request body (OpenSearch DSL)
                </Typography>
                <Tooltip title="Run query (⌘/Ctrl+Enter in editor)">
                  <span>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PlayArrowRoundedIcon />}
                      disabled={loading || !siteId}
                      onClick={() => void runQuery()}
                    >
                      Run
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip title="Prettify query JSON">
                  <Button size="small" variant="outlined" startIcon={<AutoFixHighRoundedIcon />} onClick={onPrettify}>
                    Prettify
                  </Button>
                </Tooltip>
                <Tooltip title="Copy query">
                  <IconButton size="small" onClick={onCopyQuery} aria-label="Copy query">
                    <ContentCopyRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Quick insert (appends to{' '}
                  <Typography component="span" fontFamily="monospace">
                    bool.must
                  </Typography>
                  ). Load schema first for field autocomplete.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'flex-start' }}>
                  <TextField
                    size="small"
                    sx={{ flex: '1 1 180px', minWidth: 160 }}
                    label="Field path"
                    placeholder="localId"
                    value={builderField}
                    onChange={(e) => setBuilderField(e.target.value)}
                    inputProps={{ list: 'uigoodies-opensearch-field-paths' }}
                  />
                  <datalist id="uigoodies-opensearch-field-paths">
                    {pathOptions.map((p) => (
                      <option key={p} value={p} />
                    ))}
                  </datalist>
                  <TextField
                    select
                    size="small"
                    label="Clause"
                    value={builderMode}
                    onChange={(e) =>
                      setBuilderMode(e.target.value as 'match' | 'term' | 'prefix' | 'wildcard' | 'range' | 'exists')
                    }
                    sx={{ width: 130 }}
                  >
                    <MenuItem value="match">match</MenuItem>
                    <MenuItem value="term">term</MenuItem>
                    <MenuItem value="prefix">prefix</MenuItem>
                    <MenuItem value="wildcard">wildcard</MenuItem>
                    <MenuItem value="range">range</MenuItem>
                    <MenuItem value="exists">exists</MenuItem>
                  </TextField>
                  {builderMode === 'range' ? (
                    <>
                      <TextField
                        size="small"
                        label="gte"
                        value={builderGte}
                        onChange={(e) => setBuilderGte(e.target.value)}
                        sx={{ width: 140 }}
                      />
                      <TextField
                        size="small"
                        label="lte"
                        value={builderLte}
                        onChange={(e) => setBuilderLte(e.target.value)}
                        sx={{ width: 140 }}
                      />
                    </>
                  ) : builderMode === 'exists' ? null : (
                    <TextField
                      size="small"
                      label={builderMode === 'wildcard' ? 'Pattern' : 'Value'}
                      value={builderValue}
                      onChange={(e) => setBuilderValue(e.target.value)}
                      sx={{ flex: '2 1 200px', minWidth: 160 }}
                      multiline={builderMode === 'match'}
                      minRows={builderMode === 'match' ? 2 : 1}
                    />
                  )}
                  <Button size="small" variant="outlined" onClick={insertFromBuilderBar}>
                    Insert clause
                  </Button>
                </Box>
              </Box>
              <OpenSearchJsonEditor value={query} onChange={setQuery} onModEnter={() => void runQuery()} />
            </Paper>
          </Panel>

          <ResizeGrip vertical={orientationVertical} />

          <Panel id="response" defaultSize={orientationVertical ? '35%' : '38%'} minSize="20%">
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                bgcolor: (t) => (t.palette.mode === 'dark' ? 'action.hover' : 'grey.50')
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  flexShrink: 0,
                  bgcolor: 'background.paper'
                }}
              >
                <Typography variant="subtitle2" color="text.primary">
                  Response
                </Typography>
                <Tooltip title="Copy response JSON">
                  <IconButton size="small" onClick={onCopyResponse} aria-label="Copy response">
                    <ContentCopyRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <OpenSearchJsonEditor readOnly value={displayedResponse} />
            </Paper>
          </Panel>
        </Group>
      </Box>
    </Box>
  );
}

export default OpenSearchPlayground;
