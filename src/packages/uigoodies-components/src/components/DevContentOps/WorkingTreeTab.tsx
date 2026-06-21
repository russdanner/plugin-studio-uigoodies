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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import CommitRoundedIcon from '@mui/icons-material/CommitRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { firstValueFrom } from 'rxjs';
import { DiffViewer } from './DiffViewer';
import {
  fetchWorkTree,
  fetchWorkTreeDiff,
  postWorkTreeClean,
  postWorkTreeCommit,
  postWorkTreeDiscard,
  postWorkTreeResetHard,
  postWorkTreeResolveConflict,
  postWorkTreeStage,
  postWorkTreeUnstage,
  type FileDiff,
  type WorkTreeFile,
  type WorkTreeResponse
} from './devContentOpsApi';
import { monoSx, TabAlertStack, TabContentPanel, TabShell, TabToolbar, ToolbarGroup } from './devContentOpsUi';

type Props = {
  siteId: string;
  siteName?: string;
};

function isUntracked(file: WorkTreeFile): boolean {
  return file.workTreeStatus === 'untracked' || file.status.includes('untracked');
}

function canStage(file: WorkTreeFile): boolean {
  if (file.conflict) {
    return false;
  }
  const ws = file.workTreeStatus;
  return ws === 'modified' || ws === 'deleted' || ws === 'untracked';
}

function canUnstage(file: WorkTreeFile): boolean {
  return Boolean(file.staged) && !file.conflict;
}

function canDiscard(file: WorkTreeFile): boolean {
  if (file.conflict) {
    return false;
  }
  const ws = file.workTreeStatus;
  return ws === 'modified' || ws === 'deleted' || ws === 'untracked';
}

function canClean(file: WorkTreeFile): boolean {
  return isUntracked(file);
}

function statusChipColor(status: string): 'default' | 'success' | 'warning' | 'error' | 'info' {
  if (status.includes('conflict')) {
    return 'error';
  }
  if (status.includes('untracked')) {
    return 'info';
  }
  if (status.includes('deleted') || status.includes('removed')) {
    return 'warning';
  }
  if (status.includes('staged')) {
    return 'success';
  }
  if (status.includes('modified')) {
    return 'warning';
  }
  return 'default';
}

export function WorkingTreeTab({ siteId, siteName }: Props) {
  const [data, setData] = useState<WorkTreeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [commitOpen, setCommitOpen] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  const [resetAck, setResetAck] = useState(false);
  const [diffOpen, setDiffOpen] = useState(false);
  const [diffLoading, setDiffLoading] = useState(false);
  const [diffTitle, setDiffTitle] = useState('');
  const [fileDiffs, setFileDiffs] = useState<FileDiff[]>([]);

  const files = data?.files ?? [];
  const selectedPaths = useMemo(() => Array.from(selected), [selected]);
  const hasSelection = selectedPaths.length > 0;
  const selectedFiles = useMemo(
    () => files.filter((file) => selected.has(file.path)),
    [files, selected]
  );
  const conflictCount = data?.conflictCount ?? files.filter((f) => f.conflict).length;
  const hasChanges = Boolean(data?.hasChanges) || files.length > 0 || !data?.workTreeClean;
  const anyStageable = files.some(canStage);
  const anyStaged = files.some(canUnstage);
  const anyDiscardable = files.some(canDiscard);
  const anyUntracked = files.some(canClean);
  const selectedStageable = selectedFiles.some(canStage);
  const selectedStaged = selectedFiles.some(canUnstage);
  const selectedDiscardable = selectedFiles.some(canDiscard);
  const selectedUntracked = selectedFiles.some(canClean);
  const canStageAction = hasSelection ? selectedStageable : anyStageable;
  const canUnstageAction = hasSelection && selectedStaged;
  const canCommitAction = anyStaged;
  const canDiscardAction = hasSelection ? selectedDiscardable : anyDiscardable;
  const canCleanAction = hasSelection ? selectedUntracked : anyUntracked;
  const canResetAction = hasChanges;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await firstValueFrom(fetchWorkTree(siteId));
      setData(result);
      setSelected(new Set());
    } catch (e) {
      setData(null);
      setError((e as Error).message || 'Failed to load working tree');
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    load();
  }, [load]);

  const runAction = async (action: () => Promise<void>, okMessage?: string) => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await action();
      if (okMessage) {
        setNotice(okMessage);
      }
      await load();
    } catch (e) {
      setError((e as Error).message || 'Operation failed');
    } finally {
      setBusy(false);
    }
  };

  const togglePath = (path: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === files.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(files.map((f) => f.path)));
    }
  };

  const onDiff = async (file: WorkTreeFile, mode: 'unstaged' | 'staged') => {
    setDiffLoading(true);
    setDiffOpen(true);
    setDiffTitle(`${file.path} (${mode === 'staged' ? 'staged vs HEAD' : 'working tree vs index'})`);
    setFileDiffs([]);
    try {
      const result = await firstValueFrom(fetchWorkTreeDiff(siteId, file.path, mode));
      setFileDiffs(result.fileDiffs ?? []);
    } catch (e) {
      setError((e as Error).message || 'Failed to load diff');
      setDiffOpen(false);
    } finally {
      setDiffLoading(false);
    }
  };

  const onCommit = async () => {
    const message = commitMessage.trim();
    if (!message) {
      setError('Commit message is required');
      return;
    }
    await runAction(async () => {
      const result = await firstValueFrom(postWorkTreeCommit(siteId, message));
      setCommitOpen(false);
      setCommitMessage('');
      setNotice(result.message || `Committed ${result.shortId ?? ''}`);
    });
  };

  const onResetHard = async () => {
    if (!resetAck) {
      return;
    }
    await runAction(async () => {
      const result = await firstValueFrom(postWorkTreeResetHard(siteId));
      setResetOpen(false);
      setResetAck(false);
      setNotice(result.message || 'Working tree reset');
    });
  };

  return (
    <TabShell>
      <TabAlertStack>
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {notice && (
          <Alert severity="success" onClose={() => setNotice('')}>
            {notice}
          </Alert>
        )}
      </TabAlertStack>

      <TabToolbar>
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={700}>Working tree</Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {siteName ? `${siteName} (${siteId})` : siteId}
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              startIcon={loading ? <CircularProgress size={14} /> : <RefreshRoundedIcon />}
              disabled={loading || busy}
              onClick={() => load()}
            >
              Refresh
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
            <Chip
              size="small"
              label={data?.workTreeClean ? 'Working tree clean' : 'Working tree dirty'}
              color={data?.workTreeClean ? 'success' : 'warning'}
              variant={data?.workTreeClean ? 'outlined' : 'filled'}
            />
            <Chip
              size="small"
              label={data?.gitStatusOk ? 'Git index OK' : 'Git index issues'}
              color={data?.gitStatusOk ? 'success' : 'error'}
              variant="outlined"
            />
            {conflictCount > 0 && (
              <Chip size="small" color="error" label={`${conflictCount} conflict(s)`} />
            )}
            {data?.headCommitId && (
              <Chip size="small" variant="outlined" sx={monoSx} label={`HEAD · ${data.headCommitId.slice(0, 7)}`} />
            )}
            {data?.branch && (
              <Chip size="small" variant="outlined" sx={monoSx} label={`Branch · ${data.branch}`} />
            )}
            <Typography variant="caption" color="text.secondary" sx={monoSx}>
              {files.length} changed path(s)
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="flex-start">
            <ToolbarGroup label="Staging">
              <Tooltip title={hasSelection ? 'Stage selected unstaged paths' : 'Stage all unstaged paths'}>
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={busy || loading || !canStageAction}
                    startIcon={<PlaylistAddCheckRoundedIcon />}
                    onClick={() =>
                      runAction(async () => {
                        const result = await firstValueFrom(
                          postWorkTreeStage(siteId, hasSelection ? { paths: selectedPaths } : { all: true })
                        );
                        setNotice(result.message || 'Staged');
                      })
                    }
                  >
                    {hasSelection ? 'Stage selected' : 'Stage all'}
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Unstage selected paths in the index">
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={busy || loading || !canUnstageAction}
                    onClick={() =>
                      runAction(async () => {
                        const result = await firstValueFrom(postWorkTreeUnstage(siteId, { paths: selectedPaths }));
                        setNotice(result.message || 'Unstaged');
                      })
                    }
                  >
                    Unstage selected
                  </Button>
                </span>
              </Tooltip>
            </ToolbarGroup>

            <Divider flexItem orientation="vertical" sx={{ alignSelf: 'stretch', my: 0.5 }} />

            <ToolbarGroup label="Commit">
              <Tooltip title="Commit staged changes to the sandbox repository">
                <span>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={busy || loading || !canCommitAction}
                    startIcon={<CommitRoundedIcon />}
                    onClick={() => {
                      setCommitMessage('');
                      setCommitOpen(true);
                    }}
                  >
                    Commit staged
                  </Button>
                </span>
              </Tooltip>
            </ToolbarGroup>

            <Divider flexItem orientation="vertical" sx={{ alignSelf: 'stretch', my: 0.5 }} />

            <ToolbarGroup label="Restore">
              <Tooltip title={hasSelection ? 'Discard working tree changes for selected paths' : 'Discard all unstaged changes'}>
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    disabled={busy || loading || !canDiscardAction}
                    startIcon={<RestoreRoundedIcon />}
                    onClick={() =>
                      runAction(async () => {
                        const result = await firstValueFrom(
                          postWorkTreeDiscard(siteId, hasSelection ? { paths: selectedPaths } : { all: true })
                        );
                        setNotice(result.message || 'Discarded');
                      })
                    }
                  >
                    {hasSelection ? 'Discard selected' : 'Discard all'}
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title={hasSelection ? 'Remove selected untracked paths' : 'Remove all untracked files'}>
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={busy || loading || !canCleanAction}
                    startIcon={<CleaningServicesRoundedIcon />}
                    onClick={() =>
                      runAction(async () => {
                        const result = await firstValueFrom(
                          postWorkTreeClean(
                            siteId,
                            hasSelection ? { paths: selectedPaths } : { allUntracked: true }
                          )
                        );
                        setNotice(result.message || 'Cleaned');
                      })
                    }
                  >
                    {hasSelection ? 'Remove untracked selected' : 'Clean untracked'}
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Reset tracked files to HEAD and remove uncommitted changes">
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    disabled={busy || loading || !canResetAction}
                    onClick={() => {
                      setResetAck(false);
                      setResetOpen(true);
                    }}
                  >
                    Reset hard
                  </Button>
                </span>
              </Tooltip>
            </ToolbarGroup>
          </Stack>
      </TabToolbar>

      <TabContentPanel>
        <Box
          sx={{
            px: 2,
            py: 1.25,
            borderBottom: 1,
            borderColor: 'divider',
            flexShrink: 0
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>Changed paths</Typography>
        </Box>
        {loading && !data ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        ) : files.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No uncommitted changes in the sandbox working tree.</Typography>
          </Box>
        ) : (
          <Box sx={{ overflow: 'auto', flex: 1 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={files.length > 0 && selected.size === files.length}
                      indeterminate={selected.size > 0 && selected.size < files.length}
                      onChange={toggleAll}
                    />
                  </TableCell>
                  <TableCell>Path</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.path} hover selected={selected.has(file.path)}>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" checked={selected.has(file.path)} onChange={() => togglePath(file.path)} />
                    </TableCell>
                    <TableCell sx={{ ...monoSx, maxWidth: 420 }}>{file.path}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={file.status}
                        color={statusChipColor(file.status)}
                        variant={file.conflict ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end" flexWrap="wrap" useFlexGap>
                        {(file.workTreeStatus || file.conflict) && (
                          <Tooltip title="Diff working tree changes">
                            <span>
                              <Button
                                size="small"
                                variant="text"
                                disabled={busy || loading}
                                startIcon={<CompareArrowsRoundedIcon />}
                                onClick={() => onDiff(file, 'unstaged')}
                              >
                                Diff
                              </Button>
                            </span>
                          </Tooltip>
                        )}
                        {file.staged && (
                          <Button
                            size="small"
                            variant="text"
                            disabled={busy || loading}
                            onClick={() => onDiff(file, 'staged')}
                          >
                            Staged diff
                          </Button>
                        )}
                        {canStage(file) && (
                          <Button
                            size="small"
                            variant="text"
                            disabled={busy || loading}
                            onClick={() =>
                              runAction(async () => {
                                const result = await firstValueFrom(
                                  postWorkTreeStage(siteId, { paths: [file.path] })
                                );
                                setNotice(result.message || 'Staged');
                              })
                            }
                          >
                            Stage
                          </Button>
                        )}
                        {canUnstage(file) && (
                          <Button
                            size="small"
                            variant="text"
                            disabled={busy || loading}
                            onClick={() =>
                              runAction(async () => {
                                const result = await firstValueFrom(
                                  postWorkTreeUnstage(siteId, { paths: [file.path] })
                                );
                                setNotice(result.message || 'Unstaged');
                              })
                            }
                          >
                            Unstage
                          </Button>
                        )}
                        {canDiscard(file) && (
                          <Button
                            size="small"
                            variant="text"
                            color="warning"
                            disabled={busy || loading}
                            startIcon={<DeleteOutlineRoundedIcon />}
                            onClick={() =>
                              runAction(async () => {
                                const result = await firstValueFrom(
                                  postWorkTreeDiscard(siteId, { paths: [file.path] })
                                );
                                setNotice(result.message || 'Discarded');
                              })
                            }
                          >
                            Discard
                          </Button>
                        )}
                        {file.conflict && (
                          <>
                            <Button
                              size="small"
                              variant="text"
                              disabled={busy || loading}
                              onClick={() =>
                                runAction(async () => {
                                  const result = await firstValueFrom(
                                    postWorkTreeResolveConflict(siteId, file.path, 'ours')
                                  );
                                  setNotice(result.message || 'Resolved with current branch');
                                })
                              }
                            >
                              Use ours
                            </Button>
                            <Button
                              size="small"
                              variant="text"
                              disabled={busy || loading}
                              onClick={() =>
                                runAction(async () => {
                                  const result = await firstValueFrom(
                                    postWorkTreeResolveConflict(siteId, file.path, 'theirs')
                                  );
                                  setNotice(result.message || 'Resolved with incoming');
                                })
                              }
                            >
                              Use theirs
                            </Button>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </TabContentPanel>

      <Dialog open={commitOpen} onClose={() => !busy && setCommitOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Commit staged changes</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Creates a new commit in the sandbox git repository. Studio may need to sync to ingest the commit.
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Commit message"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              multiline
              minRows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommitOpen(false)} disabled={busy}>Cancel</Button>
          <Button variant="contained" disabled={busy || !commitMessage.trim()} onClick={onCommit}>
            {busy ? 'Committing…' : 'Commit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetOpen} onClose={() => !busy && setResetOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reset working tree to HEAD?</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="error" icon={<WarningAmberRoundedIcon />}>
              This discards all uncommitted changes and resets tracked files to HEAD. Untracked files may also be removed.
            </Alert>
            <FormControlLabel
              control={<Checkbox checked={resetAck} onChange={(e) => setResetAck(e.target.checked)} />}
              label="I understand this cannot be undone."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetOpen(false)} disabled={busy}>Cancel</Button>
          <Button color="error" variant="contained" disabled={!resetAck || busy} onClick={onResetHard}>
            Reset hard
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={diffOpen} onClose={() => setDiffOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{diffTitle}</DialogTitle>
        <DialogContent sx={{ minHeight: 320, display: 'flex', flexDirection: 'column' }}>
          {diffLoading ? (
            <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <DiffViewer title={diffTitle} fileDiffs={fileDiffs} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDiffOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </TabShell>
  );
}

export default WorkingTreeTab;
