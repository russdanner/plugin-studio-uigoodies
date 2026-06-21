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
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { fetchRepositories, pull, push } from '@craftercms/studio-ui/services/repositories';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  fetchGitRefs,
  postCreateBranch,
  postCreateTag,
  postDeleteBranch,
  postDeleteTag,
  type GitRefRow,
  type GitRefsResponse
} from './devContentOpsApi';
import { monoSx, TabContentPanel, TabAlertStack, TabShell, TabToolbar, ToolbarDivider, ToolbarGroup, ToolbarRow } from './devContentOpsUi';

type Props = {
  siteId: string;
  siteName?: string;
};

type RefSection = 'branches' | 'tags' | 'remote';

type CreateDialog =
  | { kind: 'branch' }
  | { kind: 'tag' }
  | null;

type DeleteDialog =
  | {
      kind: 'branch' | 'tag';
      ref: GitRefRow;
    }
  | null;

export function BranchesTab({ siteId, siteName }: Props) {
  const [refs, setRefs] = useState<GitRefsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [section, setSection] = useState<RefSection>('branches');
  const [createDialog, setCreateDialog] = useState<CreateDialog>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialog>(null);
  const [busy, setBusy] = useState(false);

  const [branchName, setBranchName] = useState('');
  const [branchStart, setBranchStart] = useState('');
  const [branchForce, setBranchForce] = useState(false);

  const [tagName, setTagName] = useState('');
  const [tagCommit, setTagCommit] = useState('');
  const [tagMessage, setTagMessage] = useState('');
  const [tagAnnotated, setTagAnnotated] = useState(false);

  const [deleteLocal, setDeleteLocal] = useState(true);
  const [deleteRemote, setDeleteRemote] = useState(false);
  const [deleteForce, setDeleteForce] = useState(false);
  const [deleteRemoteName, setDeleteRemoteName] = useState('');
  const [remotes, setRemotes] = useState<string[]>([]);
  const [remoteName, setRemoteName] = useState('');
  const [syncBranch, setSyncBranch] = useState('');
  const [remoteSyncing, setRemoteSyncing] = useState(false);

  const loadRefs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await firstValueFrom(fetchGitRefs(siteId));
      setRefs(data);
    } catch (e) {
      setError((e as Error).message || 'Failed to load branches and tags');
      setRefs(null);
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    loadRefs();
  }, [loadRefs]);

  useEffect(() => {
    if (refs?.remotes?.length && !deleteRemoteName) {
      setDeleteRemoteName(refs.remotes[0]);
    }
  }, [refs, deleteRemoteName]);

  const loadRemotes = useCallback(async () => {
    try {
      const list = await firstValueFrom(fetchRepositories(siteId).pipe(take(1)));
      const names = (list ?? []).map((r) => r.name).filter(Boolean);
      setRemotes(names);
      if (remoteName && !names.includes(remoteName)) {
        setRemoteName('');
      }
    } catch {
      setRemotes([]);
    }
  }, [siteId, remoteName]);

  useEffect(() => {
    loadRemotes();
  }, [loadRemotes]);

  const resetCreateForm = () => {
    setBranchName('');
    setBranchStart('');
    setBranchForce(false);
    setTagName('');
    setTagCommit('');
    setTagMessage('');
    setTagAnnotated(false);
  };

  const resetDeleteForm = () => {
    setDeleteLocal(true);
    setDeleteRemote(false);
    setDeleteForce(false);
    setDeleteRemoteName(refs?.remotes?.[0] ?? '');
  };

  const openDelete = (kind: 'branch' | 'tag', ref: GitRefRow) => {
    resetDeleteForm();
    setDeleteDialog({ kind, ref });
  };

  const onCreate = async () => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (createDialog?.kind === 'branch') {
        const result = await firstValueFrom(
          postCreateBranch(siteId, {
            name: branchName.trim(),
            startPoint: branchStart.trim() || undefined,
            force: branchForce
          })
        );
        setNotice(result.message || `Branch "${branchName.trim()}" created`);
      } else if (createDialog?.kind === 'tag') {
        const result = await firstValueFrom(
          postCreateTag(siteId, {
            name: tagName.trim(),
            commit: tagCommit.trim() || undefined,
            message: tagMessage.trim() || undefined,
            annotated: tagAnnotated
          })
        );
        setNotice(result.message || `Tag "${tagName.trim()}" created`);
      }
      setCreateDialog(null);
      resetCreateForm();
      await loadRefs();
    } catch (e) {
      setError((e as Error).message || 'Create failed');
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async () => {
    if (!deleteDialog) {
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (deleteDialog.kind === 'branch') {
        const result = await firstValueFrom(
          postDeleteBranch(siteId, {
            name: deleteDialog.ref.name,
            force: deleteForce,
            deleteLocal,
            deleteRemote,
            remote: deleteRemote ? deleteRemoteName : undefined
          })
        );
        setNotice(result.message || `Branch "${deleteDialog.ref.name}" deleted`);
      } else {
        const result = await firstValueFrom(
          postDeleteTag(siteId, {
            name: deleteDialog.ref.name,
            deleteLocal,
            deleteRemote,
            remote: deleteRemote ? deleteRemoteName : undefined
          })
        );
        setNotice(result.message || `Tag "${deleteDialog.ref.name}" deleted`);
      }
      setDeleteDialog(null);
      resetDeleteForm();
      await loadRefs();
    } catch (e) {
      setError((e as Error).message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  const rows = useMemo(() => {
    if (section === 'tags') {
      return refs?.tags ?? [];
    }
    if (section === 'remote') {
      return refs?.remoteBranches ?? [];
    }
    return refs?.branches ?? [];
  }, [refs, section]);

  const sandboxBranch = refs?.sandboxBranch ?? '';
  const currentBranch = refs?.currentBranch ?? '';
  const branchNames = useMemo(() => (refs?.branches ?? []).map((b) => b.name), [refs?.branches]);
  const canRemoteSync = Boolean(remoteName && syncBranch);

  useEffect(() => {
    const preferred = sandboxBranch || currentBranch;
    if (preferred && (!syncBranch || !branchNames.includes(syncBranch))) {
      setSyncBranch(preferred);
    }
  }, [sandboxBranch, currentBranch, syncBranch, branchNames]);

  const onPull = async () => {
    if (!canRemoteSync) {
      setError('Select a remote and branch before pulling');
      return;
    }
    setRemoteSyncing(true);
    setError('');
    setNotice('');
    try {
      await firstValueFrom(
        pull({ siteId, remoteName, remoteBranch: syncBranch, mergeStrategy: 'none' }).pipe(take(1))
      );
      setNotice(`Pulled ${syncBranch} from ${remoteName}`);
      await loadRefs();
    } catch (e: unknown) {
      const err = e as { response?: { response?: { message?: string } } };
      setError(err?.response?.response?.message || 'Pull failed');
    } finally {
      setRemoteSyncing(false);
    }
  };

  const onPush = async () => {
    if (!canRemoteSync) {
      setError('Select a remote and branch before pushing');
      return;
    }
    setRemoteSyncing(true);
    setError('');
    setNotice('');
    try {
      await firstValueFrom(push(siteId, remoteName, syncBranch, false).pipe(take(1)));
      setNotice(`Pushed ${syncBranch} to ${remoteName}`);
    } catch (e: unknown) {
      const err = e as { response?: { response?: { message?: string } } };
      setError(err?.response?.response?.message || 'Push failed');
    } finally {
      setRemoteSyncing(false);
    }
  };

  return (
    <TabShell>
      <TabToolbar>
        <ToolbarRow>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={700}>Branches & tags</Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {siteName ? `${siteName} (${siteId})` : siteId}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={loading ? <CircularProgress size={14} /> : <RefreshRoundedIcon />}
            disabled={loading}
            onClick={loadRefs}
          >
            Refresh
          </Button>
        </ToolbarRow>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
          <Chip size="small" label={`HEAD · ${currentBranch || '(detached)'}`} sx={{ ...monoSx, fontWeight: 600 }} />
          {sandboxBranch && (
            <Chip size="small" variant="outlined" label={`Sandbox · ${sandboxBranch}`} sx={monoSx} />
          )}
        </Stack>

        <Divider />

        <ToolbarRow justify="flex-start">
          {remotes.length > 0 && (
            <>
              <ToolbarGroup label="Remote sync">
                <FormControl size="small" required sx={{ minWidth: 132 }}>
                  <InputLabel>Remote</InputLabel>
                  <Select
                    label="Remote"
                    value={remoteName}
                    displayEmpty
                    onChange={(e) => setRemoteName(e.target.value)}
                    disabled={remoteSyncing}
                  >
                    <MenuItem value="" disabled>
                      <em>Select remote</em>
                    </MenuItem>
                    {remotes.map((name) => (
                      <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 148 }}>
                  <InputLabel>Branch</InputLabel>
                  <Select
                    label="Branch"
                    value={syncBranch}
                    onChange={(e) => setSyncBranch(e.target.value)}
                    disabled={remoteSyncing || branchNames.length === 0}
                  >
                    {branchNames.map((name) => (
                      <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={
                    remoteSyncing ? <CircularProgress size={14} /> : <CloudDownloadRoundedIcon />
                  }
                  disabled={!canRemoteSync || remoteSyncing}
                  onClick={onPull}
                >
                  Pull
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={
                    remoteSyncing ? <CircularProgress size={14} /> : <CloudUploadRoundedIcon />
                  }
                  disabled={!canRemoteSync || remoteSyncing}
                  onClick={onPush}
                >
                  Push
                </Button>
              </ToolbarGroup>
              <ToolbarDivider />
            </>
          )}
          <ToolbarGroup label="Actions">
            <Button
              size="small"
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => {
                resetCreateForm();
                setCreateDialog({ kind: section === 'tags' ? 'tag' : 'branch' });
              }}
            >
              {section === 'tags' ? 'New tag' : 'New branch'}
            </Button>
          </ToolbarGroup>
        </ToolbarRow>
      </TabToolbar>

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

      <TabContentPanel>
        <Tabs
          value={section}
          onChange={(_, value: RefSection) => setSection(value)}
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider', minHeight: 42, flexShrink: 0 }}
        >
          <Tab value="branches" label={`Local branches (${refs?.branches?.length ?? 0})`} sx={{ textTransform: 'none', minHeight: 42 }} />
          <Tab value="tags" label={`Tags (${refs?.tags?.length ?? 0})`} sx={{ textTransform: 'none', minHeight: 42 }} />
          <Tab value="remote" label={`Remote tracking (${refs?.remoteBranches?.length ?? 0})`} sx={{ textTransform: 'none', minHeight: 42 }} />
        </Tabs>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          {loading && !refs ? (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={28} />
            </Box>
          ) : rows.length === 0 ? (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {section === 'tags' ? 'No tags in this repository.' : section === 'remote' ? 'No remote tracking branches.' : 'No local branches.'}
              </Typography>
            </Box>
          ) : (
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell sx={{ width: 110 }}>Commit</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell align="right" sx={{ width: 88 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell sx={{ ...monoSx, wordBreak: 'break-all' }}>
                      <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" useFlexGap>
                        <span>{row.name}</span>
                        {row.current && <Chip size="small" color="primary" label="current" sx={{ height: 20 }} />}
                        {section === 'branches' && row.name === sandboxBranch && (
                          <Chip size="small" variant="outlined" label="sandbox" sx={{ height: 20 }} />
                        )}
                        {section === 'remote' && row.remote && (
                          <Chip size="small" variant="outlined" label={row.remote} sx={{ height: 20 }} />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell sx={monoSx}>{row.commit || '—'}</TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap title={row.subject}>
                        {row.subject || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {section !== 'remote' && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteOutlineRoundedIcon />}
                          onClick={() => openDelete(section === 'tags' ? 'tag' : 'branch', row)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </TabContentPanel>

      <Dialog open={Boolean(createDialog)} onClose={() => !busy && setCreateDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{createDialog?.kind === 'tag' ? 'Create tag' : 'Create branch'}</DialogTitle>
        <DialogContent>
          {createDialog?.kind === 'branch' ? (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Branch name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                fullWidth
                autoFocus
              />
              <TextField
                label="Start point (optional)"
                value={branchStart}
                onChange={(e) => setBranchStart(e.target.value)}
                placeholder="commit, tag, or branch"
                fullWidth
                helperText="Leave empty to branch from HEAD."
              />
              <FormControlLabel
                control={<Checkbox checked={branchForce} onChange={(e) => setBranchForce(e.target.checked)} />}
                label="Force (reset branch if it already exists)"
              />
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Tag name" value={tagName} onChange={(e) => setTagName(e.target.value)} fullWidth autoFocus />
              <TextField
                label="Commit (optional)"
                value={tagCommit}
                onChange={(e) => setTagCommit(e.target.value)}
                placeholder="defaults to HEAD"
                fullWidth
              />
              <FormControlLabel
                control={<Checkbox checked={tagAnnotated} onChange={(e) => setTagAnnotated(e.target.checked)} />}
                label="Annotated tag"
              />
              {tagAnnotated && (
                <TextField
                  label="Tag message"
                  value={tagMessage}
                  onChange={(e) => setTagMessage(e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  required
                />
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog(null)} disabled={busy}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={
              busy ||
              (createDialog?.kind === 'branch' ? !branchName.trim() : !tagName.trim() || (tagAnnotated && !tagMessage.trim()))
            }
            onClick={onCreate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteDialog)} onClose={() => !busy && setDeleteDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Delete {deleteDialog?.kind === 'tag' ? 'tag' : 'branch'} · {deleteDialog?.ref.name}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Remove the ref locally, from the remote, or both. Remote deletion is permanent for collaborators.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={deleteLocal} onChange={(e) => setDeleteLocal(e.target.checked)} />}
              label="Delete locally"
            />
            <FormControlLabel
              control={<Checkbox checked={deleteRemote} onChange={(e) => setDeleteRemote(e.target.checked)} />}
              label="Delete from remote (permanent)"
            />
            {deleteDialog?.kind === 'branch' && (
              <FormControlLabel
                control={<Checkbox checked={deleteForce} onChange={(e) => setDeleteForce(e.target.checked)} />}
                label="Force local delete (-D)"
              />
            )}
            {deleteRemote && (refs?.remotes?.length ?? 0) > 0 && (
              <FormControl fullWidth size="small">
                <InputLabel>Remote</InputLabel>
                <Select
                  label="Remote"
                  value={deleteRemoteName || refs?.remotes?.[0] || ''}
                  onChange={(e) => setDeleteRemoteName(e.target.value)}
                >
                  {(refs?.remotes ?? []).map((remote) => (
                    <MenuItem key={remote} value={remote}>
                      {remote}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {deleteDialog?.kind === 'branch' && deleteDialog.ref.name === sandboxBranch && deleteLocal && !deleteForce && (
              <Alert severity="warning">
                This is the site sandbox branch. Enable force to delete it locally.
              </Alert>
            )}
            {deleteDialog?.kind === 'branch' && deleteDialog.ref.current && deleteLocal && (
              <Alert severity="warning">This branch is currently checked out and cannot be deleted locally.</Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)} disabled={busy}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={
              busy ||
              (!deleteLocal && !deleteRemote) ||
              (deleteDialog?.kind === 'branch' && deleteDialog.ref.current && deleteLocal) ||
              (deleteDialog?.kind === 'branch' &&
                deleteDialog.ref.name === sandboxBranch &&
                deleteLocal &&
                !deleteForce)
            }
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TabShell>
  );
}
