/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DialogBody, DialogFooter } from '@craftercms/studio-ui';
import ItemPublishingTargetIcon from '@craftercms/studio-ui/components/ItemPublishingTargetIcon';
import ItemStateIcon from '@craftercms/studio-ui/components/ItemStateIcon';
import ItemTypeIcon from '@craftercms/studio-ui/components/ItemTypeIcon';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import { DetailedItem, ItemStateMap } from '@craftercms/studio-ui/models/Item';
import { fetchDetailedItems } from '@craftercms/studio-ui/services/content';
import { fetchAll } from '@craftercms/studio-ui/services/sites';
import {
  closePathSelectionDialog,
  pathSelectionDialogClosed,
  showDependenciesDialog,
  showEditDialog,
  showHistoryDialog,
  showPathSelectionDialog
} from '@craftercms/studio-ui/state/actions/dialogs';
import { batchActions, dispatchDOMEvent } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { changeSite } from '@craftercms/studio-ui/state/actions/sites';
import { fetchItemVersions } from '@craftercms/studio-ui/state/actions/versions';
import { postJSON } from '@craftercms/studio-ui/utils/ajax';
import { getRootPath } from '@craftercms/studio-ui/utils/path';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

type SiteOption = { id: string; name: string };

type PlanItem = {
  path: string;
  folder: boolean;
  existsOnDestination: boolean;
  role: 'primary' | 'dependency';
  sourceSelection?: string;
};

type CopyPlan = {
  sourceSiteId: string;
  destinationSiteId: string;
  sourcePath?: string;
  sourcePaths: string[];
  copyDependencies: boolean;
  total: number;
  overwriteCount: number;
  items: PlanItem[];
  error?: string;
};

type CopyResult = {
  sourceSiteId?: string;
  destinationSiteId?: string;
  sourcePath?: string;
  sourcePaths?: string[];
  successCount: number;
  failureCount: number;
  skippedCount: number;
  successes: Array<{ path: string; destinationPath: string; overwritten: boolean }>;
  failures: Array<{ path: string; message: string }>;
  skipped: Array<{ path: string; reason: string }>;
  error?: string;
};

function isInWorkflow(stateMap?: ItemStateMap): boolean {
  return stateMap
    ? Boolean(
        stateMap.deleted ||
          stateMap.disabled ||
          stateMap.systemProcessing ||
          stateMap.locked ||
          stateMap.submittedToLive ||
          stateMap.submittedToStaging ||
          stateMap.submitted ||
          stateMap.scheduled ||
          stateMap.new ||
          stateMap.modified ||
          stateMap.publishing
      )
    : false;
}

/** Groovy GStrings can serialize as { values, strings, empty, valueCount, bytes } in REST JSON. */
type GroovyGStringJson = {
  values?: unknown[];
  strings?: unknown[];
  bytes?: string;
};

function isKeepFile(path: string): boolean {
  return path.endsWith('/.keep');
}

function asPlainString(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    const gstring = value as GroovyGStringJson;
    if (typeof gstring.bytes === 'string' && gstring.bytes) {
      try {
        return atob(gstring.bytes);
      } catch {
        /* fall through */
      }
    }
  }
  return String(value);
}

function pluginScriptUrl(scriptName: string, sourceSiteId: string): string {
  return (
    '/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/' +
    scriptName +
    '?siteId=' +
    encodeURIComponent(sourceSiteId)
  );
}

function isApiResponse(value: unknown): value is { code: number; message: string; response?: unknown } {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return 'code' in obj && 'message' in obj;
}

function isAjaxResponse(value: unknown): value is { response: unknown; status?: number; xhr?: unknown } {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return 'response' in obj && ('status' in obj || 'xhr' in obj);
}

function isPlanPayload(value: Record<string, unknown>): boolean {
  return 'sourceSiteId' in value || 'sourcePath' in value || 'sourcePaths' in value || 'items' in value;
}

function isCopyResultPayload(value: Record<string, unknown>): boolean {
  return 'successCount' in value || 'successes' in value || 'failureCount' in value;
}

function isApiErrorCode(code: unknown): boolean {
  return typeof code === 'number' && code >= 1000;
}

function unwrapPluginResponse<T extends Record<string, unknown>>(
  response: unknown,
  payloadCheck: (value: Record<string, unknown>) => boolean = isPlanPayload
): T {
  let current: unknown = response;

  for (let depth = 0; depth < 6; depth++) {
    if (!current || typeof current !== 'object') {
      break;
    }
    if (isAjaxResponse(current)) {
      current = current.response;
      continue;
    }

    const obj = current as Record<string, unknown>;

    if (isApiResponse(obj)) {
      if (isApiErrorCode(obj.code)) {
        break;
      }
      if (obj.response != null && typeof obj.response === 'object' && !payloadCheck(obj)) {
        current = obj.response;
        continue;
      }
    }

    if ('result' in obj && obj.result != null && typeof obj.result === 'object' && !payloadCheck(obj)) {
      current = obj.result;
      continue;
    }

    break;
  }

  return (current ?? {}) as T;
}

function parsePlanResponse(response: unknown): CopyPlan {
  const raw = unwrapPluginResponse<CopyPlan & { code?: number; message?: string }>(response, isPlanPayload);
  if (raw.error) {
    return { ...raw, items: [] };
  }
  if (isApiResponse(raw) && isApiErrorCode(raw.code)) {
    return { error: raw.message ?? 'Failed to build copy plan', items: [] } as CopyPlan;
  }
  if (!raw.sourceSiteId && !Array.isArray(raw.items) && !raw.sourcePath && !raw.sourcePaths) {
    return { error: 'Invalid copy plan response from server', items: [], sourcePaths: [] } as CopyPlan;
  }
  const items: PlanItem[] = Array.isArray(raw.items)
    ? raw.items
        .map((entry) => ({
          path: asPlainString(entry?.path),
          folder: Boolean(entry?.folder),
          existsOnDestination: Boolean(entry?.existsOnDestination),
          role: (entry?.role === 'dependency' ? 'dependency' : 'primary') as PlanItem['role'],
          sourceSelection: entry?.sourceSelection ? asPlainString(entry.sourceSelection) : undefined
        }))
        .filter((entry) => !isKeepFile(entry.path))
    : [];

  return {
    ...raw,
    error: raw.error ? asPlainString(raw.error) : undefined,
    sourcePaths: Array.isArray(raw.sourcePaths)
      ? raw.sourcePaths.map(asPlainString)
      : raw.sourcePath
        ? [asPlainString(raw.sourcePath)]
        : [],
    items
  };
}

function parseCopyResponse(response: unknown): CopyResult {
  const raw = unwrapPluginResponse<CopyResult & { code?: number; message?: string }>(response, isCopyResultPayload);
  if (raw.error) {
    return {
      successCount: 0,
      failureCount: 0,
      skippedCount: 0,
      successes: [],
      failures: [],
      skipped: [],
      error: raw.error
    };
  }
  if (isApiResponse(raw) && isApiErrorCode(raw.code)) {
    return {
      successCount: 0,
      failureCount: 0,
      skippedCount: 0,
      successes: [],
      failures: [],
      skipped: [],
      error: raw.message ?? 'Copy failed'
    };
  }
  const successes = (Array.isArray(raw.successes)
    ? raw.successes.map((entry) => ({
        path: asPlainString(entry?.path),
        destinationPath: asPlainString(entry?.destinationPath),
        overwritten: Boolean(entry?.overwritten)
      }))
    : []
  ).filter((entry) => !isKeepFile(entry.path));
  const failures = (Array.isArray(raw.failures)
    ? raw.failures.map((entry) => ({
        path: asPlainString(entry?.path),
        message: asPlainString(entry?.message)
      }))
    : []
  ).filter((entry) => !isKeepFile(entry.path));
  const skipped = (Array.isArray(raw.skipped)
    ? raw.skipped.map((entry) => ({
        path: asPlainString(entry?.path),
        reason: asPlainString(entry?.reason)
      }))
    : []
  ).filter((entry) => !isKeepFile(entry.path));

  return {
    successCount: successes.length,
    failureCount: failures.length,
    skippedCount: skipped.length,
    successes,
    failures,
    skipped,
    error: raw.error ? asPlainString(raw.error) : undefined,
    sourceSiteId: raw.sourceSiteId ? asPlainString(raw.sourceSiteId) : undefined,
    destinationSiteId: raw.destinationSiteId ? asPlainString(raw.destinationSiteId) : undefined,
    sourcePath: raw.sourcePath ? asPlainString(raw.sourcePath) : undefined,
    sourcePaths: Array.isArray(raw.sourcePaths)
      ? raw.sourcePaths.map(asPlainString)
      : raw.sourcePath
        ? [asPlainString(raw.sourcePath)]
        : []
  };
}

function extractAjaxErrorMessage(error: unknown, fallback: string): string {
  const e = error as {
    message?: string;
    response?: {
      response?: { message?: string; error?: string; result?: { error?: string; message?: string } };
      message?: string;
      error?: string;
      result?: { error?: string; message?: string };
    };
  };
  const nested = e?.response?.response;
  if (nested && typeof nested === 'object') {
    if (typeof nested.result?.error === 'string' && nested.result.error) {
      return nested.result.error;
    }
    if (typeof nested.error === 'string' && nested.error) {
      return nested.error;
    }
    if (typeof nested.message === 'string' && nested.message) {
      return nested.message;
    }
  }
  const ajaxBody = e?.response;
  if (ajaxBody && typeof ajaxBody === 'object') {
    if (typeof ajaxBody.result?.error === 'string' && ajaxBody.result.error) {
      return ajaxBody.result.error;
    }
    if (typeof ajaxBody.error === 'string' && ajaxBody.error) {
      return ajaxBody.error;
    }
    if (typeof ajaxBody.message === 'string' && ajaxBody.message && ajaxBody.message !== 'OK') {
      return ajaxBody.message;
    }
  }
  if (typeof e?.message === 'string' && e.message) {
    return e.message;
  }
  return fallback;
}

function callPlan(sourceSiteId: string, body: object): Observable<CopyPlan> {
  return postJSON(pluginScriptUrl('cross-site-content-copy-plan', sourceSiteId), body).pipe(
    map((response) => parsePlanResponse(response)),
    catchError((error) =>
      of({ error: extractAjaxErrorMessage(error, 'Failed to build copy plan'), items: [] } as CopyPlan)
    )
  );
}

function callCopy(sourceSiteId: string, body: object): Observable<CopyResult> {
  return postJSON(pluginScriptUrl('cross-site-content-copy', sourceSiteId), body).pipe(
    map((response) => parseCopyResponse(response)),
    catchError((error) =>
      of({
        error: extractAjaxErrorMessage(error, 'Copy failed'),
        successCount: 0,
        failureCount: 0,
        skippedCount: 0,
        successes: [],
        failures: [],
        skipped: []
      } as CopyResult)
    )
  );
}

type ContentItemRowProps = {
  item?: DetailedItem;
  path: string;
  loading?: boolean;
  trailing?: React.ReactNode;
  leading?: React.ReactNode;
};

function ContentItemRow({ item, path, loading, trailing, leading }: ContentItemRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0, flex: 1 }}>
      {leading}
      {loading && !item && <CircularProgress size={16} sx={{ flexShrink: 0 }} />}
      {item && (
        <>
          {isInWorkflow(item.stateMap) || item.systemType === 'folder' ? (
            <Box component="span" sx={{ fontSize: '1.1rem', flexShrink: 0, display: 'inline-flex' }}>
              <ItemStateIcon item={item} />
            </Box>
          ) : (
            <Box component="span" sx={{ fontSize: '1.1rem', flexShrink: 0, display: 'inline-flex' }}>
              <ItemPublishingTargetIcon item={item} />
            </Box>
          )}
          <Box component="span" sx={{ fontSize: '1.1rem', flexShrink: 0, display: 'inline-flex' }}>
            <ItemTypeIcon item={item} />
          </Box>
        </>
      )}
      <Typography
        variant="body2"
        noWrap
        title={item ? `${item.label} — ${path}` : path}
        sx={{ minWidth: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {item ? (
          <>
            {asPlainString(item.label)}
            <Box component="span" sx={{ color: 'text.secondary', fontFamily: 'monospace', ml: 1 }}>
              {path}
            </Box>
          </>
        ) : loading ? (
          'Loading…'
        ) : (
          <Box component="span" sx={{ fontFamily: 'monospace' }}>
            {path}
          </Box>
        )}
      </Typography>
      {trailing}
    </Box>
  );
}

function useDetailedItemsByPath(siteId: string | undefined, paths: string[]) {
  const [itemsByPath, setItemsByPath] = useState<Record<string, DetailedItem>>({});
  const [loading, setLoading] = useState(false);
  const pathsKey = paths.join('\0');

  useEffect(() => {
    if (!siteId || paths.length === 0) {
      setItemsByPath({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const sub = fetchDetailedItems(siteId, paths).subscribe({
      next(items) {
        const next: Record<string, DetailedItem> = {};
        paths.forEach((path, index) => {
          if (items[index]) {
            next[path] = items[index];
          }
        });
        setItemsByPath(next);
        setLoading(false);
      },
      error() {
        setItemsByPath({});
        setLoading(false);
      }
    });

    return () => sub.unsubscribe();
  }, [siteId, pathsKey]);

  return { itemsByPath, loading };
}

function PlanItemTrailing({ planItem }: { planItem: PlanItem }) {
  return (
    <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0, ml: 0.5 }}>
      <Chip
        size="small"
        variant="outlined"
        label={planItem.role === 'dependency' ? 'Dependency' : 'Primary'}
        sx={{ height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } }}
      />
      <Chip
        size="small"
        variant="outlined"
        color={planItem.existsOnDestination ? 'warning' : 'success'}
        label={planItem.existsOnDestination ? 'Overwrite' : 'Create'}
        sx={{ height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } }}
      />
    </Stack>
  );
}

function CopyStatusIcon({ status }: { status: 'success' | 'failure' | 'skipped' }) {
  if (status === 'success') {
    return <CheckCircleIcon color="success" sx={{ fontSize: '1.1rem', flexShrink: 0 }} />;
  }
  if (status === 'failure') {
    return <CancelIcon color="error" sx={{ fontSize: '1.1rem', flexShrink: 0 }} />;
  }
  return null;
}

function ItemListTable({
  headerLabel,
  children,
  actionsColumn = false,
  sx
}: {
  headerLabel: string;
  children: React.ReactNode;
  actionsColumn?: boolean;
  sx?: object;
}) {
  return (
    <Paper variant="outlined" sx={sx}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{headerLabel}</TableCell>
            {actionsColumn && (
              <TableCell align="right" width={88}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </Paper>
  );
}

export function CrossSiteContentCopy() {
  const dispatch = useDispatch();
  const activeSiteId = useActiveSiteId();
  const env = useEnv();
  const [sites, setSites] = useState<SiteOption[]>([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  const [sourcePaths, setSourcePaths] = useState<string[]>([]);
  const [itemMenuAnchor, setItemMenuAnchor] = useState<null | HTMLElement>(null);
  const [itemMenuPath, setItemMenuPath] = useState<string | null>(null);
  const [addPathError, setAddPathError] = useState<string | null>(null);
  const [destSite, setDestSite] = useState<SiteOption | null>(null);
  const [copyDependencies, setCopyDependencies] = useState(true);
  const [plan, setPlan] = useState<CopyPlan | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [copying, setCopying] = useState(false);
  const [copyResult, setCopyResult] = useState<CopyResult | null>(null);
  const mountedRef = useRef(true);
  const copySubRef = useRef<{ unsubscribe: () => void } | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      copySubRef.current?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const sub = fetchAll({ limit: 500, offset: 0 }).subscribe({
      next(sitesResponse: SiteOption[] & { total?: number }) {
        setSites((Array.isArray(sitesResponse) ? sitesResponse : []).filter(Boolean) as SiteOption[]);
        setSitesLoading(false);
      },
      error() {
        setSitesLoading(false);
      }
    });
    return () => sub.unsubscribe();
  }, []);

  const destOptions = useMemo(
    () => sites.filter((site) => site.id !== activeSiteId),
    [sites, activeSiteId]
  );

  const readyForPlan = Boolean(activeSiteId && sourcePaths.length > 0 && destSite);

  const handlePathSelected = (path: string) => {
    const normalized = path.trim();
    if (!normalized) {
      return;
    }
    const duplicate = sourcePaths.some(
      (existing) => existing === normalized || existing.replace(/\/$/, '') === normalized.replace(/\/$/, '')
    );
    if (duplicate) {
      setAddPathError('That path is already in the list.');
      return;
    }
    setSourcePaths((current) => [...current, normalized]);
    setAddPathError(null);
  };

  const openAddItemDialog = () => {
    const callbackId = 'crossSiteCopyPathSelection';
    const callbackAccept = 'accept';

    dispatch(
      showPathSelectionDialog({
        rootPath: '/site',
        initialPath: '',
        showCreateFolderOption: false,
        stripXmlIndex: false,
        onClosed: batchActions([
          dispatchDOMEvent({ id: callbackId, action: 'close' }),
          pathSelectionDialogClosed()
        ]),
        onOk: batchActions([
          dispatchDOMEvent({ id: callbackId, action: callbackAccept }),
          closePathSelectionDialog()
        ])
      })
    );

    createCustomDocumentEventListener(callbackId, (detail) => {
      if (detail.action === callbackAccept && detail.path) {
        handlePathSelected(detail.path);
      }
    });
  };

  const removeSourcePath = (path: string) => {
    setSourcePaths((current) => current.filter((entry) => entry !== path));
  };

  const clearSourcePaths = () => {
    setSourcePaths([]);
    setAddPathError(null);
  };

  const copyableItems = (plan?.items ?? []).filter((item) => !item.folder && !isKeepFile(item.path));
  const planItemPaths = useMemo(
    () => (plan?.items ?? []).filter((item) => !item.folder).map((item) => item.path),
    [plan]
  );

  const resultItemPaths = useMemo(() => {
    if (!copyResult) {
      return [];
    }
    const paths = new Set<string>();
    copyResult.successes.forEach((entry) => paths.add(entry.path));
    copyResult.failures.forEach((entry) => paths.add(entry.path));
    copyResult.skipped.forEach((entry) => paths.add(entry.path));
    return Array.from(paths);
  }, [copyResult]);

  const { itemsByPath: sourceItemsByPath, loading: sourceItemsLoading } = useDetailedItemsByPath(
    activeSiteId,
    sourcePaths
  );
  const { itemsByPath: planItemsByPath, loading: planItemsLoading } = useDetailedItemsByPath(
    activeSiteId,
    planItemPaths
  );
  const { itemsByPath: resultItemsByPath, loading: resultItemsLoading } = useDetailedItemsByPath(
    activeSiteId,
    resultItemPaths
  );

  const resultRows = useMemo(() => {
    if (!copyResult) {
      return [];
    }
    const rows: Array<{
      path: string;
      status: 'success' | 'failure' | 'skipped';
      detail?: string;
    }> = [];
    copyResult.successes.forEach((entry) =>
      rows.push({
        path: entry.path,
        status: 'success',
        detail: entry.overwritten ? 'Overwritten' : 'Created'
      })
    );
    copyResult.failures.forEach((entry) =>
      rows.push({ path: entry.path, status: 'failure', detail: entry.message })
    );
    copyResult.skipped.forEach((entry) =>
      rows.push({ path: entry.path, status: 'skipped', detail: entry.reason })
    );
    return rows;
  }, [copyResult]);

  const itemMenuItem = itemMenuPath ? sourceItemsByPath[itemMenuPath] : null;

  const openItemMenu = (event: React.MouseEvent<HTMLElement>, path: string) => {
    setItemMenuAnchor(event.currentTarget);
    setItemMenuPath(path);
  };

  const closeItemMenu = () => {
    setItemMenuAnchor(null);
    setItemMenuPath(null);
  };

  const handleItemView = () => {
    if (!itemMenuItem || !activeSiteId) {
      return;
    }
    dispatch(
      showEditDialog({
        site: activeSiteId,
        path: itemMenuItem.path,
        authoringBase: env.authoringBase,
        readonly: true
      })
    );
    closeItemMenu();
  };

  const handleItemHistory = () => {
    if (!itemMenuItem) {
      return;
    }
    dispatch(
      batchActions([
        fetchItemVersions({ item: itemMenuItem, rootPath: getRootPath(itemMenuItem.path) }),
        showHistoryDialog({})
      ])
    );
    closeItemMenu();
  };

  const handleItemDependencies = () => {
    if (!itemMenuItem) {
      return;
    }
    dispatch(showDependenciesDialog({ item: itemMenuItem, rootPath: getRootPath(itemMenuItem.path) }));
    closeItemMenu();
  };

  useEffect(() => {
    if (!readyForPlan) {
      setPlan(null);
      setPlanError(null);
      setPlanLoading(false);
      return;
    }

    setPlanError(null);
    setPlanLoading(true);
    setCopyResult(null);

    const sub = callPlan(activeSiteId, {
      sourcePaths,
      destinationSiteId: destSite!.id,
      copyDependencies
    }).subscribe({
      next(result) {
        setPlanLoading(false);
        if (result.error) {
          setPlanError(result.error);
          setPlan(null);
          return;
        }
        setPlan(result);
      },
      error(error) {
        setPlanLoading(false);
        setPlanError(extractAjaxErrorMessage(error, 'Failed to build copy plan'));
        setPlan(null);
      }
    });

    return () => sub.unsubscribe();
  }, [readyForPlan, activeSiteId, sourcePaths, destSite, copyDependencies]);

  const overwriteCount = copyableItems.filter((item) => item.existsOnDestination).length;
  const newCount = copyableItems.length - overwriteCount;

  const runCopy = () => {
    if (!activeSiteId || sourcePaths.length === 0 || !destSite || copyableItems.length === 0) {
      return;
    }
    copySubRef.current?.unsubscribe();
    setCopying(true);
    copySubRef.current = callCopy(activeSiteId, {
      sourcePaths,
      destinationSiteId: destSite.id,
      copyDependencies
    }).subscribe({
      next(result) {
        if (!mountedRef.current) {
          return;
        }
        setCopying(false);
        setCopyResult(result);
        if (result.error) {
          dispatch(showSystemNotification({ message: result.error }));
          return;
        }
        if (result.successCount === 0) {
          dispatch(showSystemNotification({ message: 'Copy failed — no items were written.' }));
          return;
        }
        const destId = result.destinationSiteId ?? destSite.id;
        const msg =
          result.failureCount > 0
            ? `Copied ${result.successCount} item(s) to ${destId} (${result.failureCount} failed).`
            : `Copied ${result.successCount} item(s) to ${destId}. Open that project to view them.`;
        dispatch(showSystemNotification({ message: msg }));
      },
      error(error) {
        if (!mountedRef.current) {
          return;
        }
        setCopying(false);
        dispatch(showSystemNotification({ message: extractAjaxErrorMessage(error, 'Copy failed') }));
      }
    });
  };

  const reset = () => {
    setSourcePaths([]);
    setAddPathError(null);
    setDestSite(null);
    setCopyDependencies(true);
    setPlan(null);
    setPlanError(null);
    setCopyResult(null);
  };

  const copiedDestinationSiteId = copyResult?.destinationSiteId ?? destSite?.id;

  const copiedDestinationLabel = useMemo(() => {
    if (!copiedDestinationSiteId) {
      return '';
    }
    const match = sites.find((site) => site.id === copiedDestinationSiteId);
    return match ? `${match.name} (${match.id})` : copiedDestinationSiteId;
  }, [copiedDestinationSiteId, sites]);

  const switchToDestination = () => {
    if (!copiedDestinationSiteId) {
      return;
    }
    dispatch(changeSite(copiedDestinationSiteId));
  };

  return (
    <Paper elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <DialogBody sx={{ flex: 1, overflow: 'auto', pt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Copy content from <strong>{activeSiteId}</strong> into another project. Copied items appear in the
          destination project only.
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="subtitle2">1. Source content</Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" onClick={openAddItemDialog}>
                  Add item
                </Button>
                {sourcePaths.length > 0 && (
                  <Button size="small" onClick={clearSourcePaths}>
                    Clear list
                  </Button>
                )}
              </Stack>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Add pages, components, or folders to copy. Use Add item to browse the project and confirm a path.
            </Typography>
            {addPathError && (
              <Typography variant="caption" color="error" sx={{ mb: 1, display: 'block' }}>
                {addPathError}
              </Typography>
            )}
            {sourcePaths.length > 0 ? (
              <ItemListTable headerLabel="Selected items" actionsColumn sx={{ mt: 2 }}>
                {sourcePaths.map((path) => {
                  const item = sourceItemsByPath[path];
                  const itemLoading = sourceItemsLoading && !item;

                  return (
                    <TableRow key={path} hover>
                      <TableCell sx={{ py: 1.25, maxWidth: 0, width: '100%' }}>
                        <ContentItemRow item={item} path={path} loading={itemLoading} />
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        <IconButton
                          size="small"
                          aria-label="Item options"
                          onClick={(event) => openItemMenu(event, path)}
                          disabled={!item}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" aria-label="Remove" onClick={() => removeSourcePath(path)}>
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </ItemListTable>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                No source items yet. Click <strong>Add item</strong> to browse and add paths to copy.
              </Alert>
            )}
            <Menu anchorEl={itemMenuAnchor} open={Boolean(itemMenuAnchor)} onClose={closeItemMenu}>
              <MenuItem onClick={handleItemView}>View</MenuItem>
              <MenuItem onClick={handleItemHistory}>History</MenuItem>
              <MenuItem onClick={handleItemDependencies}>Dependencies</MenuItem>
            </Menu>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              2. Destination
            </Typography>
            {sitesLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Stack spacing={1.5}>
                <Autocomplete
                  options={destOptions}
                  getOptionLabel={(option) => `${option.name} (${option.id})`}
                  value={destSite}
                  onChange={(_, value) => setDestSite(value)}
                  renderInput={(params) => <TextField {...params} label="Destination project" required size="small" />}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={copyDependencies}
                      onChange={(e) => setCopyDependencies(e.target.checked)}
                    />
                  }
                  label="Include dependencies (components, linked assets)"
                />
              </Stack>
            )}
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              3. Preview
            </Typography>

            {!readyForPlan && (
              <Typography variant="body2" color="text.secondary">
                Add at least one source item and choose a destination project to preview what will be copied.
              </Typography>
            )}

            {readyForPlan && plan && !planLoading && !copyResult && sourcePaths.length > 1 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Copying {sourcePaths.length} source selection(s) into <strong>{destSite?.id}</strong>.
              </Typography>
            )}

            {readyForPlan && planLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Building copy plan…
                </Typography>
              </Box>
            )}

            {readyForPlan && planError && !planLoading && (
              <Alert severity="error">{planError}</Alert>
            )}

            {readyForPlan && plan && !planLoading && !copyResult && (
              <>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                  <Chip size="small" label={`${copyableItems.length} file(s)`} color="primary" variant="outlined" />
                  {newCount > 0 && <Chip size="small" label={`${newCount} new`} color="success" variant="outlined" />}
                  {overwriteCount > 0 && (
                    <Chip size="small" label={`${overwriteCount} overwrite`} color="warning" variant="outlined" />
                  )}
                </Stack>

                {overwriteCount > 0 && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    {overwriteCount} item(s) already exist in <strong>{destSite?.id}</strong> and will be replaced.
                  </Alert>
                )}

                {copyableItems.length === 0 ? (
                  <Alert severity="info">No copyable files found for this selection.</Alert>
                ) : (
                  <Box sx={{ mt: 0 }}>
                    <ItemListTable headerLabel="Items to copy">
                      {copyableItems.map((planItem) => {
                        const item = planItemsByPath[planItem.path];
                        const itemLoading = planItemsLoading && !item;

                        return (
                          <TableRow key={planItem.path} hover>
                            <TableCell sx={{ py: 1.25, maxWidth: 0, width: '100%' }}>
                              <ContentItemRow
                                item={item}
                                path={planItem.path}
                                loading={itemLoading}
                                trailing={<PlanItemTrailing planItem={planItem} />}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </ItemListTable>
                  </Box>
                )}
              </>
            )}

            {copyResult && (
              <Stack spacing={2}>
                {copyResult.successCount === 0 ? (
                  <Alert severity="error">Copy failed. No items were written.</Alert>
                ) : copyResult.failureCount === 0 ? (
                  <Alert severity="success">
                    Copied {copyResult.successCount} item(s) to <strong>{copiedDestinationLabel}</strong>.
                  </Alert>
                ) : (
                  <Alert severity="warning">
                    Copied {copyResult.successCount} item(s) to <strong>{copiedDestinationLabel}</strong>;{' '}
                    {copyResult.failureCount} failed.
                  </Alert>
                )}

                {resultRows.length > 0 && (
                  <ItemListTable headerLabel="Copy results">
                    {resultRows.map((row) => {
                      const item = resultItemsByPath[row.path];
                      const itemLoading = resultItemsLoading && !item;

                      return (
                        <TableRow key={`${row.status}-${row.path}`} hover>
                          <TableCell sx={{ py: 1.25, maxWidth: 0, width: '100%' }}>
                            <ContentItemRow
                              item={item}
                              path={row.path}
                              loading={itemLoading}
                              leading={<CopyStatusIcon status={row.status} />}
                              trailing={
                                row.detail && row.status === 'failure' ? (
                                  <Typography
                                    variant="caption"
                                    color="error"
                                    noWrap
                                    title={row.detail}
                                    sx={{ flexShrink: 1, minWidth: 0, maxWidth: 180, ml: 0.5 }}
                                  >
                                    {row.detail}
                                  </Typography>
                                ) : row.detail ? (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ flexShrink: 0, ml: 0.5 }}
                                  >
                                    {row.detail}
                                  </Typography>
                                ) : undefined
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </ItemListTable>
                )}
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogBody>

      <DialogFooter sx={{ borderTop: 1, borderColor: 'divider', gap: 1 }}>
        {copyResult ? (
          <>
            <Button onClick={reset}>Copy another</Button>
            {copyResult.successCount > 0 && copiedDestinationSiteId && (
              <Button variant="outlined" onClick={switchToDestination}>
                Switch to {copiedDestinationSiteId}
              </Button>
            )}
            <Button variant="contained" onClick={reset}>
              Done
            </Button>
          </>
        ) : (
          <>
            <Button disabled={copying || planLoading} onClick={reset}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={runCopy}
              disabled={copying || planLoading || !plan || copyableItems.length === 0}
            >
              {copying ? <CircularProgress size={22} color="inherit" /> : `Copy ${copyableItems.length || ''} item(s)`}
            </Button>
          </>
        )}
      </DialogFooter>
    </Paper>
  );
}

export default CrossSiteContentCopy;
