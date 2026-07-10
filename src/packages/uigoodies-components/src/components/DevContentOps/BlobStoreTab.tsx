/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  alpha
} from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { firstValueFrom } from 'rxjs';
import {
  fetchBlobStoreChildren,
  fetchBlobStoreDeleted,
  fetchBlobStoreOverview,
  fetchBlobStoreVersions,
  fetchBlobVersionPreview,
  loadBlobVersionContent,
  postRestoreBlobVersion,
  postSyncBlobStore,
  type BlobAssetPresence,
  type BlobDeletedEntry,
  type BlobObjectVersion,
  type BlobStoreConfig,
  type BlobStoreOverview,
  type BlobStoreTreeEntry,
  type BlobVersionPreviewResponse
} from './devContentOpsApi';
import {
  monoSx,
  PanelHeader,
  SectionLabel,
  surfacePaperSx,
  TabAlertStack,
  TabContentPanel,
  TabShell,
  TabToolbar,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRow
} from './devContentOpsUi';

type LoadedFolder = {
  entries: BlobStoreTreeEntry[];
  loading: boolean;
  error?: string;
};

type PresenceChipProps = {
  label: string;
  active: boolean;
  configured?: boolean;
  title: string;
};

function PresenceChip({ label, active, configured = true, title }: PresenceChipProps) {
  if (!configured) {
    return (
      <Tooltip title={`${label} mapping not configured`}>
        <Chip
          size="small"
          label={label}
          variant="outlined"
          sx={{ height: 22, opacity: 0.55, '& .MuiChip-label': { px: 0.75, fontSize: '0.68rem' } }}
        />
      </Tooltip>
    );
  }
  return (
    <Tooltip title={title}>
      <Chip
        size="small"
        label={label}
        color={active ? 'success' : 'default'}
        variant={active ? 'filled' : 'outlined'}
        sx={{ height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.68rem' } }}
      />
    </Tooltip>
  );
}

function PresenceChips({ presence }: { presence: BlobAssetPresence }) {
  return (
    <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
      <PresenceChip
        label="Repo"
        active={presence.inRepo}
        title="Pointer file (.blob) exists in the sandbox Git repository"
      />
      <PresenceChip
        label="Preview"
        active={presence.inPreview}
        title="Asset exists in preview blob storage"
      />
      <PresenceChip
        label="Staging"
        active={presence.inStaging}
        configured={presence.stagingConfigured}
        title="Published pointer exists on the staging branch (asset was published to staging)"
      />
      <PresenceChip
        label="Live"
        active={presence.inLive}
        configured={presence.liveConfigured}
        title="Published pointer exists on the live branch (asset was published to live)"
      />
    </Stack>
  );
}

function BlobStoreTreeNode({
  siteId,
  store,
  entry,
  depth,
  expanded,
  onToggle,
  folderState,
  onLoadFolder,
  selectedPaths,
  onToggleSelect
}: {
  siteId: string;
  store: BlobStoreConfig;
  entry: BlobStoreTreeEntry;
  depth: number;
  expanded: boolean;
  onToggle: () => void;
  folderState?: LoadedFolder;
  onLoadFolder: (path: string) => void;
  selectedPaths: Record<string, boolean>;
  onToggleSelect: (path: string, checked: boolean) => void;
}) {
  const isFolder = entry.folder;
  const indent = depth * 16 + 8;

  useEffect(() => {
    if (isFolder && expanded && !folderState) {
      onLoadFolder(entry.path);
    }
  }, [isFolder, expanded, folderState, entry.path, onLoadFolder]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          py: 0.5,
          pl: `${indent}px`,
          pr: 1,
          borderRadius: 1,
          '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.04) }
        }}
      >
        {isFolder ? (
          <IconButton size="small" onClick={onToggle} aria-label={expanded ? 'Collapse folder' : 'Expand folder'}>
            {expanded ? <ExpandMoreRoundedIcon fontSize="small" /> : <ChevronRightRoundedIcon fontSize="small" />}
          </IconButton>
        ) : (
          <Checkbox
            size="small"
            checked={Boolean(selectedPaths[entry.path])}
            onChange={(e) => onToggleSelect(entry.path, e.target.checked)}
            sx={{ p: 0.25 }}
          />
        )}
        {isFolder ? (
          <FolderRoundedIcon fontSize="small" color="action" />
        ) : (
          <InsertDriveFileRoundedIcon fontSize="small" color="action" />
        )}
        <Typography variant="body2" sx={{ ...monoSx, flex: 1, minWidth: 0 }} noWrap title={entry.path}>
          {entry.name}
        </Typography>
        {!isFolder && entry.presence && <PresenceChips presence={entry.presence} />}
      </Stack>

      {isFolder && (
        <Collapse in={expanded}>
          {folderState?.loading ? (
            <Box sx={{ pl: `${indent + 28}px`, py: 0.5 }}>
              <CircularProgress size={16} />
            </Box>
          ) : folderState?.error ? (
            <Typography variant="caption" color="error" sx={{ pl: `${indent + 28}px` }}>
              {folderState.error}
            </Typography>
          ) : (
            folderState?.entries.map((child) => (
              <BlobStoreTreeBranch
                key={child.path}
                siteId={siteId}
                store={store}
                entry={child}
                depth={depth + 1}
                selectedPaths={selectedPaths}
                onToggleSelect={onToggleSelect}
              />
            ))
          )}
        </Collapse>
      )}
    </Box>
  );
}

function BlobStoreTreeBranch({
  siteId,
  store,
  entry,
  depth,
  selectedPaths,
  onToggleSelect
}: {
  siteId: string;
  store: BlobStoreConfig;
  entry: BlobStoreTreeEntry;
  depth: number;
  selectedPaths: Record<string, boolean>;
  onToggleSelect: (path: string, checked: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [folderCache, setFolderCache] = useState<Record<string, LoadedFolder>>({});

  const loadFolder = useCallback(
    (path: string) => {
      setFolderCache((prev) => ({
        ...prev,
        [path]: { entries: prev[path]?.entries ?? [], loading: true }
      }));
      firstValueFrom(fetchBlobStoreChildren(siteId, store.id, path))
        .then((data) => {
          setFolderCache((prev) => ({
            ...prev,
            [path]: { entries: data.entries, loading: false }
          }));
        })
        .catch((err: Error) => {
          setFolderCache((prev) => ({
            ...prev,
            [path]: { entries: [], loading: false, error: err.message }
          }));
        });
    },
    [siteId, store.id]
  );

  return (
    <BlobStoreTreeNode
      siteId={siteId}
      store={store}
      entry={entry}
      depth={depth}
      expanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      folderState={entry.folder ? folderCache[entry.path] : undefined}
      onLoadFolder={loadFolder}
      selectedPaths={selectedPaths}
      onToggleSelect={onToggleSelect}
    />
  );
}

type BlobPublishingTarget = 'preview' | 'staging' | 'live';

function formatBytes(size: number): string {
  if (!size || size < 0) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = size;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value < 10 && unit > 0 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}

function formatVersionDate(value?: string): string {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatBlobVersionLabel(version: BlobObjectVersion): string {
  if (version.versionLabel) {
    return version.versionLabel;
  }
  if (version.legacyNullVersion || !version.versionId || version.versionId === 'null') {
    return 'Original (pre-versioning)';
  }
  return version.versionId;
}

function blobVersionRowKey(version: BlobObjectVersion): string {
  return `${version.versionId || 'null'}:${version.lastModified || ''}:${version.deleteMarker ? 'deleted' : 'object'}`;
}

function BlobVersionPreviewPanel({
  preview,
  loading,
  error
}: {
  preview: BlobVersionPreviewResponse | null;
  loading: boolean;
  error: string | null;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    if (!preview?.previewUrl) {
      setObjectUrl(null);
      setContentError(null);
      return;
    }

    const ac = new AbortController();
    setContentLoading(true);
    setContentError(null);

    loadBlobVersionContent(preview.previewUrl, ac.signal)
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setObjectUrl((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }
          return url;
        });
      })
      .catch((e) => {
        if (ac.signal.aborted) {
          return;
        }
        setObjectUrl((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }
          return null;
        });
        setContentError(e instanceof Error ? e.message : 'Failed to load preview');
      })
      .finally(() => {
        if (!ac.signal.aborted) {
          setContentLoading(false);
        }
      });

    return () => {
      ac.abort();
      setObjectUrl((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return null;
      });
    };
  }, [preview?.previewUrl]);

  if (loading || contentLoading) {
    return (
      <Box sx={{ mt: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" color="text.secondary">Loading preview…</Typography>
      </Box>
    );
  }
  if (error || contentError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error || contentError}
      </Alert>
    );
  }
  if (!preview?.previewUrl || !objectUrl) {
    return null;
  }

  const contentType = preview.contentType || '';
  const url = objectUrl;

  return (
    <Box
      sx={{
        mt: 2,
        p: 1.5,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: (t) => alpha(t.palette.text.primary, 0.02)
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="subtitle2">
          Preview — {formatBlobVersionLabel({
            versionId: preview.versionId,
            versionLabel: preview.versionLabel,
            legacyNullVersion: preview.versionId === 'null'
          })}
        </Typography>
        <Button
          size="small"
          onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
          startIcon={<OpenInNewRoundedIcon />}
        >
          Open in tab
        </Button>
      </Stack>

      {contentType.startsWith('image/') ? (
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src={url}
            alt=""
            sx={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain', borderRadius: 1 }}
          />
        </Box>
      ) : contentType === 'application/pdf' ? (
        <Box component="iframe" src={url} title="PDF preview" sx={{ width: '100%', height: 360, border: 0, borderRadius: 1 }} />
      ) : contentType.startsWith('video/') ? (
        <Box component="video" src={url} controls sx={{ maxWidth: '100%', maxHeight: 360, display: 'block', mx: 'auto' }} />
      ) : contentType.startsWith('audio/') ? (
        <Box component="audio" src={url} controls sx={{ width: '100%' }} />
      ) : (
        <Alert severity="info">
          Inline preview is not available for this file type ({contentType || 'unknown'}). Use Open in tab to download or
          view the object.
        </Alert>
      )}
    </Box>
  );
}

function BlobVersionHistoryDialog({
  siteId,
  store,
  assetPath,
  overview,
  open,
  onClose,
  onRestored
}: {
  siteId: string;
  store: BlobStoreConfig;
  assetPath: string;
  overview: BlobStoreOverview;
  open: boolean;
  onClose: () => void;
  onRestored: () => void;
}) {
  const targetOptions = useMemo(() => {
    const options: BlobPublishingTarget[] = ['preview'];
    if (store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'staging') && overview.stagingEnabled) {
      options.push('staging');
    }
    if (store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'live')) {
      options.push('live');
    }
    return options;
  }, [store.mappings, overview.stagingEnabled]);

  const [target, setTarget] = useState<BlobPublishingTarget>('preview');
  const [loading, setLoading] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [versions, setVersions] = useState<BlobObjectVersion[]>([]);
  const [objectKey, setObjectKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [preview, setPreview] = useState<BlobVersionPreviewResponse | null>(null);
  const [previewVersionId, setPreviewVersionId] = useState<string | null>(null);

  const loadVersions = useCallback(() => {
    setLoading(true);
    setError(null);
    setPreview(null);
    setPreviewVersionId(null);
    setPreviewError(null);
    firstValueFrom(fetchBlobStoreVersions(siteId, store.id, assetPath, target))
      .then((data) => {
        setVersions(data.versions ?? []);
        setObjectKey(data.objectKey ?? '');
      })
      .catch((err: Error) => {
        setVersions([]);
        setObjectKey('');
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [siteId, store.id, assetPath, target]);

  useEffect(() => {
    if (open) {
      setNotice(null);
      loadVersions();
    }
  }, [open, loadVersions]);

  useEffect(() => {
    setPreview(null);
    setPreviewVersionId(null);
    setPreviewError(null);
  }, [target]);

  const loadPreview = useCallback(
    (version: BlobObjectVersion) => {
      if (version.deleteMarker) {
        return;
      }
      setPreviewLoading(true);
      setPreviewError(null);
      setPreviewVersionId(version.versionId);
      firstValueFrom(fetchBlobVersionPreview(siteId, store.id, assetPath, version.versionId, target))
        .then((data) => setPreview(data))
        .catch((err: Error) => {
          setPreview(null);
          setPreviewError(err.message);
        })
        .finally(() => setPreviewLoading(false));
    },
    [siteId, store.id, assetPath, target]
  );

  const restore = async (version: BlobObjectVersion) => {
    if (store.readOnly) {
      return;
    }
    const label = version.deleteMarker
      ? 'delete marker (undelete)'
      : version.latest
        ? 'current version'
        : formatBlobVersionLabel(version);
    const action = version.deleteMarker
      ? `Remove the delete marker and restore the previous version in ${target}?`
      : `Restore this asset from ${label}? This creates a new current version in ${target} storage.`;
    if (!window.confirm(action)) {
      return;
    }
    setRestoringId(version.versionId);
    setError(null);
    setNotice(null);
    try {
      const result = await firstValueFrom(
        postRestoreBlobVersion(siteId, {
          storeId: store.id,
          path: assetPath,
          versionId: version.versionId,
          target,
          deleteMarker: Boolean(version.deleteMarker)
        })
      );
      setNotice(result.message || 'Version restored.');
      loadVersions();
      onRestored();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Restore failed');
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Version history</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: '80vh', overflow: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ ...monoSx, mb: 1.5 }} noWrap title={assetPath}>
          {assetPath}
        </Typography>
        {objectKey && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', ...monoSx, mb: 1.5 }}>
            S3 key: {objectKey}
          </Typography>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} sx={{ mb: 1.5 }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="blob-version-target-label">Environment</InputLabel>
            <Select
              labelId="blob-version-target-label"
              label="Environment"
              value={target}
              onChange={(e) => setTarget(e.target.value as BlobPublishingTarget)}
            >
              {targetOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button size="small" startIcon={<RefreshRoundedIcon />} onClick={loadVersions} disabled={loading}>
            Refresh
          </Button>
        </Stack>

        {notice && (
          <Alert severity="success" sx={{ mb: 1.5 }} onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 1.5 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 3, justifyContent: 'center' }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">Loading versions…</Typography>
          </Box>
        ) : versions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No versions found. Ensure bucket versioning is enabled on the S3/MinIO bucket.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Version</TableCell>
                <TableCell>Modified</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {versions.map((version) => (
                <TableRow
                  key={blobVersionRowKey(version)}
                  hover
                  selected={previewVersionId === version.versionId}
                  sx={{ cursor: version.deleteMarker ? 'default' : 'pointer' }}
                  onClick={() => !version.deleteMarker && loadPreview(version)}
                >
                  <TableCell sx={{ ...monoSx, maxWidth: 220 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center" useFlexGap flexWrap="wrap">
                      <Typography
                        variant="body2"
                        sx={version.legacyNullVersion ? undefined : monoSx}
                        noWrap
                        title={
                          version.legacyNullVersion
                            ? 'Object uploaded before bucket versioning was enabled'
                            : version.versionId
                        }
                      >
                        {formatBlobVersionLabel(version)}
                      </Typography>
                      {version.latest && !version.deleteMarker && (
                        <Chip size="small" label="Current" color="primary" variant="outlined" />
                      )}
                      {version.deleteMarker && (
                        <Chip size="small" label="Deleted" color="warning" variant="outlined" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>{formatVersionDate(version.lastModified)}</TableCell>
                  <TableCell align="right">{version.deleteMarker ? '—' : formatBytes(version.size)}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="small"
                        variant="text"
                        startIcon={
                          previewLoading && previewVersionId === version.versionId ? (
                            <CircularProgress size={14} />
                          ) : (
                            <VisibilityRoundedIcon />
                          )
                        }
                        disabled={Boolean(version.deleteMarker) || previewLoading}
                        onClick={() => loadPreview(version)}
                      >
                        Preview
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={
                          restoringId === version.versionId ? (
                            <CircularProgress size={14} />
                          ) : (
                            <RestoreRoundedIcon />
                          )
                        }
                        disabled={Boolean(store.readOnly) || restoringId !== null}
                        onClick={() => restore(version)}
                      >
                        {version.deleteMarker ? 'Undelete' : 'Restore'}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <BlobVersionPreviewPanel preview={preview} loading={previewLoading} error={previewError} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function DeletedBlobsPanel({
  siteId,
  store,
  overview,
  onOpenHistory,
  onRestored
}: {
  siteId: string;
  store: BlobStoreConfig;
  overview: BlobStoreOverview;
  onOpenHistory: (path: string) => void;
  onRestored: () => void;
}) {
  const targetOptions = useMemo(() => {
    const options: BlobPublishingTarget[] = ['preview'];
    if (store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'staging') && overview.stagingEnabled) {
      options.push('staging');
    }
    if (store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'live')) {
      options.push('live');
    }
    return options;
  }, [store.mappings, overview.stagingEnabled]);

  const [target, setTarget] = useState<BlobPublishingTarget>('preview');
  const [loading, setLoading] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [entries, setEntries] = useState<BlobDeletedEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadDeleted = useCallback(() => {
    if (!store.versioningSupported) {
      return;
    }
    setLoading(true);
    setError(null);
    firstValueFrom(fetchBlobStoreDeleted(siteId, store.id, target))
      .then((data) => setEntries(data.entries ?? []))
      .catch((err: Error) => {
        setEntries([]);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [siteId, store.id, store.versioningSupported, target]);

  useEffect(() => {
    loadDeleted();
  }, [loadDeleted]);

  const undelete = async (entry: BlobDeletedEntry) => {
    if (store.readOnly) {
      return;
    }
    if (
      !window.confirm(
        `Restore deleted blob ${entry.path}? This removes the delete marker and makes the previous version current in ${target} storage.`
      )
    ) {
      return;
    }
    setRestoringId(entry.versionId);
    setError(null);
    setNotice(null);
    try {
      const result = await firstValueFrom(
        postRestoreBlobVersion(siteId, {
          storeId: store.id,
          path: entry.path,
          versionId: entry.versionId,
          target,
          deleteMarker: true
        })
      );
      setNotice(result.message || 'Blob restored.');
      loadDeleted();
      onRestored();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Restore failed');
    } finally {
      setRestoringId(null);
    }
  };

  if (!store.versioningSupported) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <SectionLabel>Deleted in storage</SectionLabel>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Objects removed from blob storage (S3 delete markers). Restore brings back the latest non-deleted version.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} sx={{ mb: 1 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id={`deleted-target-${store.id}`}>Environment</InputLabel>
          <Select
            labelId={`deleted-target-${store.id}`}
            label="Environment"
            value={target}
            onChange={(e) => setTarget(e.target.value as BlobPublishingTarget)}
          >
            {targetOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button size="small" startIcon={<RefreshRoundedIcon />} onClick={loadDeleted} disabled={loading}>
          Refresh deleted
        </Button>
      </Stack>

      {notice && (
        <Alert severity="success" sx={{ mb: 1 }} onClose={() => setNotice(null)}>
          {notice}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 1 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          maxHeight: 240,
          overflow: 'auto',
          bgcolor: (t) => alpha(t.palette.text.primary, 0.02)
        }}
      >
        {loading ? (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">Loading deleted objects…</Typography>
          </Box>
        ) : entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No deleted blobs found under this store path.
          </Typography>
        ) : (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Path</TableCell>
                <TableCell>Deleted</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={`${entry.path}-${entry.versionId}`} hover>
                  <TableCell sx={{ ...monoSx, maxWidth: 360 }} title={entry.path}>
                    {entry.path}
                  </TableCell>
                  <TableCell>{formatVersionDate(entry.lastModified)}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Button size="small" onClick={() => onOpenHistory(entry.path)}>
                        History
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={
                          restoringId === entry.versionId ? <CircularProgress size={14} /> : <RestoreRoundedIcon />
                        }
                        disabled={Boolean(store.readOnly) || restoringId !== null}
                        onClick={() => undelete(entry)}
                      >
                        Restore
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Box>
  );
}

function BlobStoreSection({
  siteId,
  store,
  overview
}: {
  siteId: string;
  store: BlobStoreConfig;
  overview: BlobStoreOverview;
}) {
  const [rootState, setRootState] = useState<LoadedFolder>({ entries: [], loading: true });
  const [selectedPaths, setSelectedPaths] = useState<Record<string, boolean>>({});
  const [syncing, setSyncing] = useState<'staging' | 'live' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [versionDialogPath, setVersionDialogPath] = useState<string | null>(null);

  const loadRoot = useCallback((isActive: () => boolean = () => true) => {
    setRootState({ entries: [], loading: true });
    setError(null);
    firstValueFrom(fetchBlobStoreChildren(siteId, store.id, store.treeRoot || '/static-assets'))
      .then((data) => {
        if (isActive()) {
          setRootState({ entries: data.entries, loading: false });
        }
      })
      .catch((err: Error) => {
        if (isActive()) {
          setRootState({ entries: [], loading: false });
          setError(err.message);
        }
      });
  }, [siteId, store.id, store.treeRoot]);

  useEffect(() => {
    let cancelled = false;
    loadRoot(() => !cancelled);
    return () => {
      cancelled = true;
    };
  }, [loadRoot]);

  const selectedList = useMemo(
    () => Object.keys(selectedPaths).filter((path) => selectedPaths[path]),
    [selectedPaths]
  );

  const hasStagingMapping = store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'staging');
  const hasLiveMapping = store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'live');

  const openVersionHistory = (path: string) => {
    setVersionDialogPath(path);
    setVersionDialogOpen(true);
  };

  const sync = async (target: 'staging' | 'live') => {
    if (!selectedList.length) {
      return;
    }
    setSyncing(target);
    setNotice(null);
    setError(null);
    try {
      const result = await firstValueFrom(
        postSyncBlobStore(siteId, { target, paths: selectedList, storeId: store.id })
      );
      setNotice(result.message || `Synced ${result.syncedCount ?? 0} asset(s).`);
      setSelectedPaths({});
      loadRoot();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setSyncing(null);
    }
  };

  return (
    <Paper elevation={0} sx={{ ...surfacePaperSx, p: 2 }}>
      <PanelHeader
        title={store.id}
        action={
          <Button size="small" startIcon={<RefreshRoundedIcon />} onClick={() => loadRoot()}>
            Refresh tree
          </Button>
        }
      />
      <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ mt: 0.5 }}>
        <Chip size="small" label={store.type} variant="outlined" />
        <Chip
          size="small"
          label={store.active ? 'Active' : 'Inactive'}
          color={store.active ? 'success' : 'default'}
          variant="outlined"
        />
        {store.readOnly && <Chip size="small" label="Read-only" color="warning" variant="outlined" />}
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Browse files in preview storage, then sync to staging or live when needed.
      </Typography>

      <SectionLabel sx={{ mt: 1.5 }}>Storage targets</SectionLabel>
      <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
        {store.mappings.map((mapping) => (
          <Chip
            key={mapping.publishingTarget}
            size="small"
            variant="outlined"
            label={`${mapping.publishingTarget}: ${mapping.storeTarget}${mapping.prefix ? ` (${mapping.prefix})` : ''}`}
            sx={{ maxWidth: '100%', '& .MuiChip-label': { ...monoSx, fontSize: '0.72rem' } }}
          />
        ))}
      </Stack>

      <TabAlertStack sx={{ mt: 1.5 }}>
        {store.versioningSupported && store.versioningNote && (
          <Alert severity="warning">{store.versioningNote}</Alert>
        )}
        {notice && (
          <Alert severity="success" onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </TabAlertStack>

      <TabToolbar sx={{ mt: 1.5, px: 0 }}>
        <ToolbarRow>
          <ToolbarGroup>
            <Typography variant="body2" color="text.secondary">
              {selectedList.length} selected
            </Typography>
          </ToolbarGroup>
          <ToolbarDivider />
          <ToolbarGroup>
            {store.versioningSupported ? (
              <Button
                size="small"
                variant="outlined"
                startIcon={<HistoryRoundedIcon />}
                disabled={selectedList.length !== 1}
                onClick={() => openVersionHistory(selectedList[0])}
              >
                Version history
              </Button>
            ) : store.type === 's3BlobStore' ? (
              <Typography variant="body2" color="text.secondary" sx={{ px: 0.5 }}>
                Version history requires S3 bucket versioning
              </Typography>
            ) : null}
            <Button
              size="small"
              variant="outlined"
              startIcon={syncing === 'staging' ? <CircularProgress size={14} /> : <CloudUploadRoundedIcon />}
              disabled={
                !selectedList.length ||
                syncing !== null ||
                !overview.stagingEnabled ||
                !hasStagingMapping
              }
              onClick={() => sync('staging')}
            >
              Preview → staging
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={syncing === 'live' ? <CircularProgress size={14} /> : <CloudUploadRoundedIcon />}
              disabled={!selectedList.length || syncing !== null || !hasLiveMapping}
              onClick={() => sync('live')}
            >
              Preview → live
            </Button>
          </ToolbarGroup>
        </ToolbarRow>
      </TabToolbar>

      {!overview.stagingEnabled && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Staging environment is not enabled for this project.
        </Typography>
      )}

      <Box
        sx={{
          mt: 1,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          maxHeight: 420,
          overflow: 'auto',
          bgcolor: (t) => alpha(t.palette.text.primary, 0.02)
        }}
      >
        {rootState.loading ? (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">Loading tree…</Typography>
          </Box>
        ) : rootState.entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No matching assets under this path.
          </Typography>
        ) : (
          rootState.entries.map((entry) => (
            <BlobStoreTreeBranch
              key={entry.path}
              siteId={siteId}
              store={store}
              entry={entry}
              depth={0}
              selectedPaths={selectedPaths}
              onToggleSelect={(path, checked) =>
                setSelectedPaths((prev) => {
                  const next = { ...prev };
                  if (checked) {
                    next[path] = true;
                  } else {
                    delete next[path];
                  }
                  return next;
                })
              }
            />
          ))
        )}
      </Box>

      {store.type === 's3BlobStore' && !store.versioningSupported ? (
        <Box sx={{ mt: 2 }}>
          <SectionLabel>Version history &amp; deleted blobs</SectionLabel>
          <Alert severity="info">
            {store.versioningNote ||
              'S3 bucket versioning is not enabled. Enable versioning on the blob store bucket to use version history, deleted-blob restore, and version previews.'}
          </Alert>
        </Box>
      ) : (
        <DeletedBlobsPanel
          siteId={siteId}
          store={store}
          overview={overview}
          onOpenHistory={openVersionHistory}
          onRestored={loadRoot}
        />
      )}

      {versionDialogPath && (
        <BlobVersionHistoryDialog
          siteId={siteId}
          store={store}
          assetPath={versionDialogPath}
          overview={overview}
          open={versionDialogOpen}
          onClose={() => {
            setVersionDialogOpen(false);
            setVersionDialogPath(null);
          }}
          onRestored={() => {
            loadRoot();
          }}
        />
      )}
    </Paper>
  );
}

export function BlobStoreTab({ siteId }: { siteId: string; siteName?: string }) {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<BlobStoreOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadOverview = useCallback(() => {
    setLoading(true);
    setError(null);
    return firstValueFrom(fetchBlobStoreOverview(siteId))
      .then((data) => {
        setOverview(data);
      })
      .catch((err: Error) => {
        setOverview(null);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [siteId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    firstValueFrom(fetchBlobStoreOverview(siteId))
      .then((data) => {
        if (!cancelled) {
          setOverview(data);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setOverview(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [siteId]);

  return (
    <TabShell>
      <TabToolbar>
        <ToolbarRow>
          <ToolbarGroup>
            <Typography variant="body2" color="text.secondary">
              Browse and sync assets in external storage.
            </Typography>
          </ToolbarGroup>
          <ToolbarDivider />
          <ToolbarGroup>
            <Button size="small" startIcon={<RefreshRoundedIcon />} onClick={loadOverview} disabled={loading}>
              Refresh
            </Button>
          </ToolbarGroup>
        </ToolbarRow>
      </TabToolbar>

      <TabContentPanel>
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', p: 2 }}>
          <TabAlertStack>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
          </TabAlertStack>

          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 4, justifyContent: 'center' }}>
              <CircularProgress size={22} />
              <Typography variant="body2" color="text.secondary">Loading blob store configuration…</Typography>
            </Box>
          ) : !overview?.configured ? (
            <Alert severity="info">
              No blob store is configured for this project. Add blob stores under{' '}
              <Typography component="span" sx={monoSx}>Configuration → Blob Stores</Typography>
              {overview?.configPresent === false && ' (config file not found in the repository).'}
              {overview?.configPresent && overview.stores.length === 0 && ' (config file has no blob store entries).'}
            </Alert>
          ) : (
            <Stack spacing={2}>
              {overview.stores.map((store) => (
                <BlobStoreSection key={store.id} siteId={siteId} store={store} overview={overview} />
              ))}
            </Stack>
          )}
        </Box>
      </TabContentPanel>
    </TabShell>
  );
}
