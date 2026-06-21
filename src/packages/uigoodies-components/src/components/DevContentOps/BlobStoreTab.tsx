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
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha
} from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { firstValueFrom } from 'rxjs';
import {
  fetchBlobStoreChildren,
  fetchBlobStoreOverview,
  postSyncBlobStore,
  type BlobAssetPresence,
  type BlobStoreConfig,
  type BlobStoreOverview,
  type BlobStoreTreeEntry
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

  const loadRoot = useCallback(() => {
    setRootState({ entries: [], loading: true });
    setError(null);
    firstValueFrom(fetchBlobStoreChildren(siteId, store.id, store.treeRoot || '/static-assets'))
      .then((data) => setRootState({ entries: data.entries, loading: false }))
      .catch((err: Error) => {
        setRootState({ entries: [], loading: false });
        setError(err.message);
      });
  }, [siteId, store.id, store.treeRoot]);

  useEffect(() => {
    loadRoot();
  }, [loadRoot]);

  const selectedList = useMemo(
    () => Object.keys(selectedPaths).filter((path) => selectedPaths[path]),
    [selectedPaths]
  );

  const hasStagingMapping = store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'staging');
  const hasLiveMapping = store.mappings.some((m) => m.publishingTarget.toLowerCase() === 'live');

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
          <Button size="small" startIcon={<RefreshRoundedIcon />} onClick={loadRoot}>
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

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, ...monoSx }}>
        Pattern: {store.pattern}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', ...monoSx }}>
        Tree root: {store.treeRoot || '/static-assets'}
      </Typography>

      <SectionLabel sx={{ mt: 1.5 }}>Mappings</SectionLabel>
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
    firstValueFrom(fetchBlobStoreOverview(siteId))
      .then((data) => setOverview(data))
      .catch((err: Error) => {
        setOverview(null);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [siteId]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  return (
    <TabShell>
      <TabToolbar>
        <ToolbarRow>
          <ToolbarGroup>
            <Typography variant="body2" color="text.secondary">
              External blob storage paths, presence across environments, and preview sync.
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
            <Alert severity="info" icon={false}>
              <Typography variant="body2">
                <strong>Repo</strong> — sandbox pointer file (.blob) in Git.{' '}
                <strong>Preview</strong> — asset in preview blob storage.{' '}
                <strong>Staging / Live</strong> — published pointer on the environment branch (confirms publish state;
                sync copies preview blobs to the target external storage).
              </Typography>
            </Alert>
            {overview.stores.map((store) => (
              <BlobStoreSection key={store.id} siteId={siteId} store={store} overview={overview} />
            ))}
          </Stack>
        )}
      </TabContentPanel>
    </TabShell>
  );
}
