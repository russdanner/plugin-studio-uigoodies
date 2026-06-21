/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Alert,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { fetchLegacySite } from '@craftercms/studio-ui/services/sites';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommitGraphMarker } from './GitGraph';
import { CommitFileList } from './CommitFileList';
import { DiffViewer } from './DiffViewer';
import { PatchBasketPanel, selectionKey } from './PatchBasketPanel';
import {
  buildPatchFromSelection,
  fetchDevContentOpsStatus,
  apiText,
  fetchGitCommitDetail,
  fetchGitDiff,
  fetchGitFileContent,
  fetchGitLog,
  postDevContentOpsAction,
  type CommitFileChange,
  type FileDiff,
  type GitCommit,
  type GitLogOrder,
  type FilterFileResult,
  type PatchSelection,
  type ProcessedCommitUpdate,
  type RepoStatus
} from './devContentOpsApi';
import {
  CommitSummaryCard,
  DangerZone,
  ActionButtonStack,
  PanelHeader,
  ProcessedStatusChip,
  RepoStatusBar,
  SectionLabel,
  TabShell,
  TabToolbar,
  codeBlockSx,
  monoSx,
  surfacePaperSx
} from './devContentOpsUi';

const LOG_LIMIT = 50;

type SiteOption = { id: string; name: string };

type Props = {
  siteId: string;
  siteName?: string;
  sites?: SiteOption[];
};

export function GitLogTab({ siteId, sites = [] }: Props) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<RepoStatus | null>(null);
  const [branch, setBranch] = useState('');
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [selected, setSelected] = useState<GitCommit | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextSkip, setNextSkip] = useState(0);
  const [sinceDate, setSinceDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [logOrder, setLogOrder] = useState<GitLogOrder>('desc');
  const [fileContent, setFileContent] = useState<{ path: string; content: string } | null>(null);
  const [diffFrom, setDiffFrom] = useState('');
  const [diffTo, setDiffTo] = useState('');
  const [diffView, setDiffView] = useState<{
    title: string;
    fileDiffs: FileDiff[];
    activePath?: string;
    fallbackText?: string;
  } | null>(null);
  const [patchSelections, setPatchSelections] = useState<PatchSelection[]>([]);
  const [patchPreview, setPatchPreview] = useState('');
  const [patchText, setPatchText] = useState('');
  const [patchApplyTargetSiteId, setPatchApplyTargetSiteId] = useState(siteId);
  const [buildingPatch, setBuildingPatch] = useState(false);
  const [diffDialogOpen, setDiffDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    commit?: Pick<GitCommit, 'id' | 'shortId' | 'subject'>;
    action: () => void;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [filterFileResult, setFilterFileResult] = useState<FilterFileResult | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const nextSkipRef = useRef(0);
  const hasMoreRef = useRef(false);

  const patchKeys = useMemo(() => new Set(patchSelections.map(selectionKey)), [patchSelections]);

  const branchOptions = React.useMemo(() => {
    const names = new Set(status?.branches ?? []);
    if (branch) {
      names.add(branch);
    }
    return Array.from(names);
  }, [status?.branches, branch]);

  const notify = (message: string, variant?: 'error' | 'success') => {
    dispatch(
      showSystemNotification({
        message,
        options: variant ? { variant } : undefined
      })
    );
  };

  const reportProcessedCommitUpdate = (
    update: ProcessedCommitUpdate | undefined,
    okMessage: string,
    partialMessage?: string
  ) => {
    if (!update) {
      notify(partialMessage?.replace('; sync failed', '') || okMessage.replace(' and sync triggered', ''), 'success');
      notify('Repository sync was not triggered', 'error');
      return false;
    }
    if (update.error && !update.success) {
      notify(partialMessage ? `${partialMessage}: ${apiText(update.error)}` : apiText(update.error), 'error');
      return false;
    }
    if (update.error) {
      notify(`${partialMessage ?? 'Processed commit updated'}: ${apiText(update.error)}`, 'error');
      notify(okMessage.replace(' and sync triggered', ''), 'success');
      return true;
    }
    notify(okMessage, 'success');
    return true;
  };

  const loadStatus = useCallback(async () => {
    try {
      setApiError(null);
      const s = await firstValueFrom(fetchDevContentOpsStatus(siteId, branch || undefined));
      setStatus(s);
      if (!branch && s?.branch) {
        setBranch(s.branch);
      }
    } catch (e) {
      const message = (e as Error).message || 'Failed to load repo status';
      setApiError(message);
      notify(message, 'error');
    }
  }, [siteId, branch]);

  const parseEpoch = (dateStr: string): number | undefined => {
    if (!dateStr) {
      return undefined;
    }
    const ms = Date.parse(dateStr);
    return Number.isFinite(ms) ? Math.floor(ms / 1000) : undefined;
  };

  const loadLog = useCallback(
    async (reset = true, explicitSkip?: number) => {
      if (!branch) {
        return;
      }
      const skip = reset ? 0 : explicitSkip ?? nextSkip;
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      try {
        setApiError(null);
        const since = parseEpoch(sinceDate);
        const until = parseEpoch(untilDate);
        const data = await firstValueFrom(
          fetchGitLog(siteId, { branch, skip, limit: LOG_LIMIT, since, until, order: logOrder })
        );
        if (reset) {
          setCommits(data.commits ?? []);
        } else {
          setCommits((prev) => {
            const ids = new Set(prev.map((c) => c.id));
            const appended = (data.commits ?? []).filter((c) => !ids.has(c.id));
            return appended.length ? [...prev, ...appended] : prev;
          });
        }
        setHasMore(data.hasMore);
        setNextSkip(data.nextSkip);
      } catch (e) {
        const message = (e as Error).message || 'Failed to load git log';
        setApiError(message);
        notify(message, 'error');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [siteId, branch, nextSkip, sinceDate, untilDate, logOrder]
  );

  useEffect(() => {
    let cancelled = false;
    firstValueFrom(fetchLegacySite(siteId).pipe(take(1)))
      .then((site) => {
        if (!cancelled) {
          setBranch(site?.sandboxBranch || 'master');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBranch('master');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [siteId]);

  useEffect(() => {
    setPatchApplyTargetSiteId(siteId);
  }, [siteId]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  useEffect(() => {
    if (branch) {
      loadLog(true, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when filters change
  }, [branch, sinceDate, untilDate, logOrder]);

  useEffect(() => {
    nextSkipRef.current = nextSkip;
  }, [nextSkip]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    const root = listRef.current;
    const sentinel = loadMoreRef.current;
    if (!root || !sentinel || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingMoreRef.current || !hasMoreRef.current) {
          return;
        }
        loadingMoreRef.current = true;
        loadLog(false, nextSkipRef.current).finally(() => {
          loadingMoreRef.current = false;
        });
      },
      { root, rootMargin: '160px', threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadLog, hasMore, commits.length]);

  const selectCommit = async (commit: GitCommit) => {
    setSelected(commit);
    setFileContent(null);
    try {
      const detail = await firstValueFrom(fetchGitCommitDetail(siteId, commit.id));
      setSelected(detail);
    } catch {
      // keep basic row data
    }
  };

  const onDownloadPatch = () => {
    const content = patchText || patchPreview;
    if (!content) {
      return;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'git-patch.patch';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onApplyPatch = async () => {
    const content = patchText || patchPreview;
    if (!content) {
      notify('Build a patch first', 'error');
      return;
    }
    const targetSiteId = patchApplyTargetSiteId || siteId;
    const targetSite = sites.find((site) => site.id === targetSiteId);
    const targetLabel = targetSite ? `${targetSite.name} (${targetSite.id})` : targetSiteId;

    const applyToTarget = async () => {
      try {
        await firstValueFrom(postDevContentOpsAction(targetSiteId, { action: 'applyPatch', patch: content }));
        notify(
          targetSiteId === siteId
            ? 'Patch applied'
            : `Patch applied to ${targetLabel}`,
          'success'
        );
        if (targetSiteId === siteId) {
          loadLog(true);
        }
      } catch (e) {
        notify((e as Error).message || 'Apply patch failed', 'error');
      }
    };

    if (targetSiteId !== siteId) {
      setConfirmDialog({
        title: 'Apply patch to another project',
        message: `Apply this patch to ${targetLabel}? Changes are written to that project's sandbox git repository.`,
        action: () => {
          setConfirmDialog(null);
          void applyToTarget();
        }
      });
      return;
    }

    await applyToTarget();
  };

  const onSetProcessedCommit = async (commitId: string) => {
    if (!commitId) {
      return;
    }
    try {
      const result = await firstValueFrom(
        postDevContentOpsAction<ProcessedCommitUpdate>(siteId, { action: 'setProcessedCommit', commitId, batchSize: 500 })
      );
      reportProcessedCommitUpdate(
        result,
        'Processed commit updated and sync triggered',
        'Processed commit updated; sync failed'
      );
      loadStatus();
      loadLog(true);
    } catch (e) {
      notify((e as Error).message || 'Failed to set processed commit', 'error');
    }
  };

  const onSetProcessed = async () => {
    if (!selected) {
      return;
    }
    await onSetProcessedCommit(selected.id);
  };

  const addToPatch = (sel: PatchSelection) => {
    const key = selectionKey(sel);
    if (patchSelections.some((s) => selectionKey(s) === key)) {
      notify('Already in patch basket', 'error');
      return;
    }
    setPatchSelections((prev) => [...prev, sel]);
    notify('Added to patch basket', 'success');
  };

  const removeFromPatch = (index: number) => {
    setPatchSelections((prev) => prev.filter((_, i) => i !== index));
  };

  const clearPatchBasket = () => {
    setPatchSelections([]);
    setPatchPreview('');
    setPatchText('');
  };

  const onBuildPatchBasket = async () => {
    if (!patchSelections.length) {
      return;
    }
    setBuildingPatch(true);
    try {
      const result = await firstValueFrom(buildPatchFromSelection(siteId, patchSelections));
      const patch = result.patch ?? '';
      setPatchPreview(patch);
      setPatchText(patch);
      notify('Patch built', 'success');
    } catch (e) {
      notify((e as Error).message || 'Failed to build patch', 'error');
    } finally {
      setBuildingPatch(false);
    }
  };

  const onDiffRefs = async () => {
    if (!diffFrom || !diffTo) {
      notify('Enter from and to refs', 'error');
      return;
    }
    try {
      const result = await firstValueFrom(fetchGitDiff(siteId, diffFrom, diffTo));
      setDiffView({
        title: `Diff ${diffFrom} → ${diffTo}`,
        fileDiffs: result.fileDiffs ?? [],
        activePath: result.fileDiffs?.[0]?.path,
        fallbackText: result.diff
      });
      setDiffDialogOpen(true);
    } catch (e) {
      notify((e as Error).message || 'Diff failed', 'error');
    }
  };

  const onDiffCommits = async () => {
    if (!selected?.parents[0]) {
      notify('Select a commit with a parent to diff', 'error');
      return;
    }
    try {
      const result = await firstValueFrom(fetchGitDiff(siteId, selected.parents[0], selected.id));
      setDiffView({
        title: `Diff parent → ${selected.shortId}`,
        fileDiffs: result.fileDiffs ?? [],
        activePath: result.fileDiffs?.[0]?.path,
        fallbackText: result.diff
      });
      setDiffDialogOpen(true);
    } catch (e) {
      notify((e as Error).message || 'Diff failed', 'error');
    }
  };

  const onDiffFile = async (commit: GitCommit, file: CommitFileChange) => {
    const parent = commit.parents[0];
    if (!parent) {
      notify('Commit has no parent to diff against', 'error');
      return;
    }
    try {
      const result = await firstValueFrom(fetchGitDiff(siteId, parent, commit.id, file.path));
      setDiffView({
        title: `${file.path} (${commit.shortId})`,
        fileDiffs: result.fileDiffs ?? [],
        activePath: result.fileDiffs?.[0]?.path ?? file.path,
        fallbackText: result.diff
      });
      setDiffDialogOpen(true);
    } catch (e) {
      notify((e as Error).message || 'Diff failed', 'error');
    }
  };

  const onViewFileAtCommit = async (commit: GitCommit, file: CommitFileChange) => {
    if (file.changeType === 'DELETE') {
      notify('File was deleted in this commit', 'error');
      return;
    }
    try {
      const result = await firstValueFrom(fetchGitFileContent(siteId, commit.id, file.path));
      if (result.binary) {
        notify(result.message || 'Binary file cannot be previewed as text', 'error');
        return;
      }
      setFileContent({ path: result.path, content: result.content });
      setSelected(commit);
    } catch (e) {
      notify((e as Error).message || 'Failed to load file', 'error');
    }
  };

  const onRemoveFileFromHistory = (commit: GitCommit, file: CommitFileChange) => {
    const path = file.path.startsWith('/') ? file.path.slice(1) : file.path;
    destructiveAction(
      'Remove file from history',
      `Remove "${path}" from all history? Commit IDs will change.`,
      async () => {
        try {
          const result = await firstValueFrom(
            postDevContentOpsAction<FilterFileResult>(siteId, {
              action: 'filterFile',
              path
            })
          );
          if (result.error) {
            notify(apiText(result.error), 'error');
            setFilterFileResult(result);
            return;
          }
          setFilterFileResult(result);
          if (result.processedCommitUpdate?.error) {
            notify(`History rewritten; sync failed: ${apiText(result.processedCommitUpdate.error)}`, 'error');
          } else {
            notify(apiText(result.message) || 'History rewritten and sync triggered', result.warning ? 'error' : 'success');
          }
          loadStatus();
          loadLog(true);
        } catch (e) {
          notify((e as Error).message || 'Failed to remove file from history', 'error');
        }
      }
    );
  };

  const copyFilterFileDetails = () => {
    if (!filterFileResult) {
      return;
    }
    const text = [
      filterFileResult.error ? apiText(filterFileResult.error) : '',
      filterFileResult.warning ? apiText(filterFileResult.warning) : '',
      filterFileResult.message ? apiText(filterFileResult.message) : '',
      filterFileResult.headCommitId ? `New HEAD: ${filterFileResult.headCommitId}` : '',
      filterFileResult.lastProcessedCommitId
        ? `Previous processed: ${filterFileResult.lastProcessedCommitId}`
        : ''
    ]
      .filter(Boolean)
      .join('\n\n');
    navigator.clipboard?.writeText(text).then(
      () => notify('Copied to clipboard', 'success'),
      () => notify('Could not copy to clipboard', 'error')
    );
  };

  const onAddEntireCommitToPatch = (commit: GitCommit) => {
    addToPatch({
      commitId: commit.id,
      shortId: commit.shortId,
      subject: commit.subject
    });
  };

  const destructiveAction = (
    title: string,
    message: string,
    action: () => Promise<void>,
    commit?: Pick<GitCommit, 'id' | 'shortId' | 'subject'>
  ) => {
    setConfirmDialog({
      title,
      message,
      commit,
      action: () => {
        action()
          .then(() => setConfirmDialog(null))
          .catch((e) => notify((e as Error).message || 'Action failed', 'error'));
      }
    });
  };

  return (
    <TabShell>
      {apiError && (
        <Alert severity="error" onClose={() => setApiError(null)} sx={{ flexShrink: 0 }}>
          {apiError}
        </Alert>
      )}
      <TabToolbar>
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <FormControl size="small" sx={{ minWidth: 132 }}>
                <InputLabel>Branch</InputLabel>
                <Select label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {branchOptions.map((b) => (
                    <MenuItem key={b} value={b}>{b}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Tooltip
                title={
                  status?.sandboxBranch && branch !== status.sandboxBranch
                    ? `Sandbox branch is ${status.sandboxBranch}`
                    : undefined
                }
                disableHoverListener={!(status?.sandboxBranch && branch !== status.sandboxBranch)}
              >
                <Chip
                  size="small"
                  variant="outlined"
                  color={status?.sandboxBranch && branch !== status.sandboxBranch ? 'warning' : 'default'}
                  label={'Sandbox · ' + (status?.sandboxBranch || '—')}
                  sx={{ fontWeight: 600 }}
                />
              </Tooltip>
              <Button
                size="small"
                variant="outlined"
                startIcon={<RefreshRoundedIcon />}
                onClick={() => loadLog(true)}
              >
                Refresh
              </Button>
            </Stack>
            {status && <RepoStatusBar status={status} />}
          </Stack>

          <Divider />

          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Order</InputLabel>
              <Select
                label="Order"
                value={logOrder}
                onChange={(e) => setLogOrder(e.target.value as GitLogOrder)}
              >
                <MenuItem value="desc">Newest first</MenuItem>
                <MenuItem value="asc">Oldest first</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Since"
              type="datetime-local"
              value={sinceDate}
              onChange={(e) => setSinceDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 188 }}
            />
            <TextField
              size="small"
              label="Until"
              type="datetime-local"
              value={untilDate}
              onChange={(e) => setUntilDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 188 }}
            />
            <Divider flexItem orientation="vertical" sx={{ alignSelf: 'stretch', my: 0.5 }} />
            <TextField
              size="small"
              label="Diff from"
              placeholder="commit or branch"
              value={diffFrom}
              onChange={(e) => setDiffFrom(e.target.value)}
              sx={{ width: 132 }}
            />
            <TextField
              size="small"
              label="Diff to"
              placeholder="commit or branch"
              value={diffTo}
              onChange={(e) => setDiffTo(e.target.value)}
              sx={{ width: 132 }}
            />
            <Button size="small" variant="outlined" startIcon={<CompareArrowsRoundedIcon />} onClick={onDiffRefs}>
              Diff refs
            </Button>
          </Stack>
      </TabToolbar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 2,
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          overflow: 'hidden'
        }}
      >
        <Paper
          variant="outlined"
          sx={{ ...surfacePaperSx, flex: '1 1 0', minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}
        >
          <PanelHeader
            title="Commit history"
            action={
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                  <Typography variant="caption" color="text.secondary">Processed</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
                  <Typography variant="caption" color="text.secondary">Unprocessed</Typography>
                </Stack>
              </Stack>
            }
          />
          {loading && !commits.length ? (
            <Box sx={{ p: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={32} />
            </Box>
          ) : commits.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No commits
              </Typography>
            </Box>
          ) : (
            <Box
              ref={listRef}
              sx={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                minHeight: 0,
                minWidth: 0
              }}
            >
              <List dense sx={{ py: 0, minWidth: 0 }}>
                {commits.map((commit, index) => {
                  const isOpen = expanded[commit.id];
                  const isSelected = selected?.id === commit.id;
                  const isLast = index === commits.length - 1 && !hasMore;
                  return (
                    <Box key={commit.id} sx={{ display: 'flex', minWidth: 0 }}>
                      <CommitGraphMarker
                        commit={commit}
                        isSelected={isSelected}
                        isFirst={index === 0}
                        isLast={isLast}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                      <ListItemButton
                        selected={isSelected}
                        onClick={() => selectCommit(commit)}
                        sx={{
                          py: 1,
                          alignItems: 'flex-start',
                          minWidth: 0,
                          pr: 1,
                          borderLeft: 3,
                          borderColor: 'transparent',
                          transition: 'background-color 0.15s ease, border-color 0.15s ease',
                          '&.Mui-selected': {
                            bgcolor: 'action.selected',
                            borderColor: 'primary.main'
                          },
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ mr: 0.5, mt: 0.25 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((prev) => ({ ...prev, [commit.id]: !prev[commit.id] }));
                          }}
                        >
                          {isOpen ? <KeyboardArrowDownRoundedIcon fontSize="small" /> : <KeyboardArrowRightRoundedIcon fontSize="small" />}
                        </IconButton>
                        <ListItemText
                          sx={{ minWidth: 0, mr: 0 }}
                          primary={
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                              <Typography
                                variant="body2"
                                sx={{ ...monoSx, flexShrink: 0, fontWeight: 700, color: 'primary.main' }}
                              >
                                {commit.shortId}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  flex: 1,
                                  minWidth: 0,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {commit.subject}
                              </Typography>
                              <ProcessedStatusChip processed={commit.processed} />
                            </Stack>
                          }
                          secondary={`${commit.author ?? '—'} · ${new Date(commit.date).toLocaleString()}`}
                          secondaryTypographyProps={{ noWrap: true, sx: { overflow: 'hidden', textOverflow: 'ellipsis' } }}
                        />
                      </ListItemButton>
                      {isOpen && (
                        <Box sx={{ pl: 4, pr: 1, pb: 1, minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            sx={{ wordBreak: 'break-all' }}
                          >
                            {commit.id}
                          </Typography>
                          {commit.body && (
                            <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                              {commit.body}
                            </Typography>
                          )}
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5, mb: 0.5 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<PlaylistAddRoundedIcon />}
                              disabled={patchKeys.has(selectionKey({ commitId: commit.id }))}
                              onClick={() => onAddEntireCommitToPatch(commit)}
                            >
                              Add commit to patch
                            </Button>
                          </Stack>
                          <CommitFileList
                            siteId={siteId}
                            commit={commit}
                            onViewFile={onViewFileAtCommit}
                            onDiffFile={onDiffFile}
                            onAddToPatch={addToPatch}
                            onRemoveFromHistory={onRemoveFileFromHistory}
                            patchKeys={patchKeys}
                          />
                        </Box>
                      )}
                      </Box>
                    </Box>
                  );
                })}
                {hasMore && <Box ref={loadMoreRef} sx={{ height: 8 }} aria-hidden />}
                {loadingMore && (
                  <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress size={24} />
                  </Box>
                )}
              </List>
            </Box>
          )}
        </Paper>

        <Box
          sx={{
            flex: { xs: '0 1 auto', lg: '0 0 360px' },
            width: { xs: '100%', lg: 360 },
            maxWidth: { lg: '42%' },
            minWidth: { lg: 300 },
            minHeight: 0,
            maxHeight: { xs: 'min(48vh, 520px)', lg: 'none' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflow: 'hidden'
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              ...surfacePaperSx,
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
          <PanelHeader title="Details & actions" />
          <Box sx={{ p: 2, flex: 1, minHeight: 0, overflow: 'auto' }}>
            {!selected ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                No commit selected
              </Typography>
            ) : (
              <Stack spacing={2}>
                <CommitSummaryCard commit={selected} processed={selected.processed} />

                <Box>
                  <SectionLabel>Patch</SectionLabel>
                  <ActionButtonStack spacing={1} sx={{ mt: 1, mb: 1.5 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<PlaylistAddRoundedIcon />}
                      disabled={patchKeys.has(selectionKey({ commitId: selected.id }))}
                      onClick={() => onAddEntireCommitToPatch(selected)}
                    >
                      Add commit to patch
                    </Button>
                  </ActionButtonStack>
                  <CommitFileList
                    siteId={siteId}
                    commit={selected}
                    onViewFile={onViewFileAtCommit}
                    onDiffFile={onDiffFile}
                    onAddToPatch={addToPatch}
                    onRemoveFromHistory={onRemoveFileFromHistory}
                    patchKeys={patchKeys}
                  />
                </Box>

                <Box>
                  <SectionLabel>Actions</SectionLabel>
                  <ActionButtonStack spacing={1} sx={{ mt: 1 }}>
                    <Button size="small" variant="outlined" startIcon={<CompareArrowsRoundedIcon />} onClick={onDiffCommits}>
                      Diff parent
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<HistoryRoundedIcon />} onClick={onSetProcessed}>
                      Set processed + sync
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      startIcon={<RestoreRoundedIcon />}
                      onClick={() =>
                        destructiveAction('Revert working tree', 'Revert working tree to this commit?', async () => {
                          await firstValueFrom(postDevContentOpsAction(siteId, { action: 'revertToCommit', commitId: selected.id }));
                          notify('Working tree reverted', 'success');
                          loadLog(true);
                        })
                      }
                    >
                      Revert to commit
                    </Button>
                  </ActionButtonStack>
                </Box>

                {fileContent && (
                  <Box>
                    <SectionLabel>File preview</SectionLabel>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.75, mb: 0.5, wordBreak: 'break-all' }}>
                      {fileContent.path}
                    </Typography>
                    <Paper variant="outlined" sx={{ ...codeBlockSx, maxHeight: 220, overflow: 'auto', fontSize: 11 }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{fileContent.content}</pre>
                    </Paper>
                  </Box>
                )}

                <DangerZone>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<WarningAmberRoundedIcon />}
                    onClick={() =>
                      destructiveAction(
                        'Reset HEAD',
                        'Reset HEAD to this commit?',
                        async () => {
                          const result = await firstValueFrom(
                            postDevContentOpsAction<{ processedCommitUpdate?: ProcessedCommitUpdate }>(siteId, {
                              action: 'resetHead',
                              commitId: selected.id
                            })
                          );
                          reportProcessedCommitUpdate(
                            result.processedCommitUpdate,
                            'HEAD reset and sync triggered',
                            'HEAD reset; sync failed'
                          );
                          loadStatus();
                          loadLog(true);
                        },
                        selected
                      )
                    }
                  >
                    Reset HEAD
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      destructiveAction(
                        'Trim history',
                        'Discard history before this commit?',
                        async () => {
                          const result = await firstValueFrom(
                            postDevContentOpsAction<{ processedCommitUpdate?: ProcessedCommitUpdate }>(siteId, {
                              action: 'trimHistory',
                              keepCommitId: selected.id
                            })
                          );
                          reportProcessedCommitUpdate(
                            result.processedCommitUpdate,
                            'History trimmed and sync triggered',
                            'History trimmed; sync failed'
                          );
                          loadStatus();
                          loadLog(true);
                        },
                        selected
                      )
                    }
                  >
                    Trim History
                  </Button>
                </DangerZone>
              </Stack>
            )}
          </Box>
        </Paper>

          <PatchBasketPanel
            selections={patchSelections}
            onRemove={removeFromPatch}
            onClear={clearPatchBasket}
            onBuildPatch={onBuildPatchBasket}
            onApplyPatch={onApplyPatch}
            onDownloadPatch={onDownloadPatch}
            building={buildingPatch}
            patchPreview={patchPreview}
            sourceSiteId={siteId}
            sites={sites}
            applyTargetSiteId={patchApplyTargetSiteId}
            onApplyTargetSiteChange={setPatchApplyTargetSiteId}
          />
        </Box>
      </Box>

      <Dialog
        open={diffDialogOpen}
        onClose={() => setDiffDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { minHeight: 520, borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>Diff viewer</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', minHeight: 400 }}>
          {diffView && (
            <DiffViewer
              title={diffView.title}
              fileDiffs={diffView.fileDiffs}
              activePath={diffView.activePath}
              fallbackText={diffView.fallbackText}
              onActivePathChange={(path) => setDiffView((prev) => (prev ? { ...prev, activePath: path } : prev))}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDiffDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(filterFileResult)} onClose={() => setFilterFileResult(null)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {filterFileResult?.success ? 'File removed from history' : 'Remove file from history'}
        </DialogTitle>
        <DialogContent>
          {filterFileResult?.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiText(filterFileResult.error)}
            </Alert>
          )}
          {filterFileResult?.warning && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {apiText(filterFileResult.warning)}
            </Alert>
          )}
          {filterFileResult?.message && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              {apiText(filterFileResult.message)}
            </Typography>
          )}
          {filterFileResult?.processedCommitUpdate?.error && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Sync failed: {apiText(filterFileResult.processedCommitUpdate.error)}
            </Alert>
          )}
          {filterFileResult?.headCommitId && (
            <>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>New HEAD commit</Typography>
              <Paper variant="outlined" sx={{ ...codeBlockSx, mb: 1.5 }}>
                {apiText(filterFileResult.headCommitId)}
              </Paper>
            </>
          )}
          {filterFileResult?.lastProcessedCommitId && (
            <>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Previous processed commit</Typography>
              <Paper variant="outlined" sx={{ ...codeBlockSx, mb: 1.5 }}>
                {apiText(filterFileResult.lastProcessedCommitId)}
              </Paper>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={copyFilterFileDetails}>Copy</Button>
          {filterFileResult?.processedCommitUpdate?.error && filterFileResult.headCommitId && (
            <Button
              color="primary"
              onClick={() => {
                const head = apiText(filterFileResult.headCommitId);
                setFilterFileResult(null);
                onSetProcessedCommit(head);
              }}
            >
              Retry sync
            </Button>
          )}
          <Button onClick={() => setFilterFileResult(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(confirmDialog)} onClose={() => setConfirmDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{confirmDialog?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{confirmDialog?.message}</Typography>
          {confirmDialog?.commit && (
            <Paper variant="outlined" sx={{ ...codeBlockSx, mt: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.75, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                Commit
              </Typography>
              <Typography variant="body2" sx={{ ...monoSx, wordBreak: 'break-all' }}>
                {(confirmDialog.commit.shortId || confirmDialog.commit.id.slice(0, 8)) + ' · ' + confirmDialog.commit.id}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                {confirmDialog.commit.subject || '(no commit message)'}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(null)}>Cancel</Button>
          <Button color="error" onClick={() => confirmDialog?.action()}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </TabShell>
  );
}
