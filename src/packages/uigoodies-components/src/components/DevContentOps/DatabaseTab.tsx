/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { firstValueFrom } from 'rxjs';
import {
  fetchAuditStats,
  fetchDatabaseAccess,
  fetchProcessedCommitsStats,
  postTruncateAudit,
  postTruncateProcessedCommits,
  type AuditStatsResponse,
  type ProcessedCommitsStatsResponse
} from './devContentOpsApi';
import {
  getAuditTruncateOption,
  getProcessedCommitsTruncateOption,
  type AuditTruncateMode,
  type AuditTruncateScope,
  type ProcessedCommitsTruncateScope
} from './databaseAuditOptions';
import {
  DangerZone,
  surfacePaperSx,
  TabAlertStack,
  TabShell,
  TabToolbar,
  ToolbarRow
} from './devContentOpsUi';

type Props = {
  siteId: string;
  siteName?: string;
};

export function DatabaseTab({ siteId, siteName }: Props) {
  const [accessLoading, setAccessLoading] = useState(true);
  const [systemAdmin, setSystemAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [accessError, setAccessError] = useState('');

  const [scope, setScope] = useState<AuditTruncateScope>('site');
  const [mode, setMode] = useState<AuditTruncateMode>('all');
  const [beforeDate, setBeforeDate] = useState('');
  const [stats, setStats] = useState<AuditStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ackChecked, setAckChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [actionError, setActionError] = useState('');

  const [processedScope, setProcessedScope] = useState<ProcessedCommitsTruncateScope>('site');
  const [processedStats, setProcessedStats] = useState<ProcessedCommitsStatsResponse | null>(null);
  const [processedStatsLoading, setProcessedStatsLoading] = useState(false);
  const [processedStatsError, setProcessedStatsError] = useState('');
  const [processedConfirmOpen, setProcessedConfirmOpen] = useState(false);
  const [processedAckChecked, setProcessedAckChecked] = useState(false);
  const [processedBusy, setProcessedBusy] = useState(false);
  const [processedNotice, setProcessedNotice] = useState('');
  const [processedActionError, setProcessedActionError] = useState('');

  const option = useMemo(() => getAuditTruncateOption(scope, mode), [scope, mode]);
  const processedOption = useMemo(
    () => getProcessedCommitsTruncateOption(processedScope),
    [processedScope]
  );

  const loadAccess = useCallback(async () => {
    setAccessLoading(true);
    setAccessError('');
    try {
      const data = await firstValueFrom(fetchDatabaseAccess(siteId));
      setSystemAdmin(Boolean(data.systemAdmin));
      setUsername(data.username ?? '');
    } catch (e) {
      setAccessError((e as Error).message || 'Failed to verify access');
      setSystemAdmin(false);
    } finally {
      setAccessLoading(false);
    }
  }, [siteId]);

  const loadStats = useCallback(async () => {
    if (!systemAdmin) {
      return;
    }
    setStatsLoading(true);
    setStatsError('');
    try {
      const data = await firstValueFrom(
        fetchAuditStats(siteId, {
          scope,
          beforeDate: mode === 'beforeDate' ? beforeDate : undefined
        })
      );
      setStats(data);
    } catch (e) {
      setStats(null);
      setStatsError((e as Error).message || 'Failed to load audit statistics');
    } finally {
      setStatsLoading(false);
    }
  }, [beforeDate, mode, scope, siteId, systemAdmin]);

  const loadProcessedStats = useCallback(async () => {
    if (!systemAdmin) {
      return;
    }
    setProcessedStatsLoading(true);
    setProcessedStatsError('');
    try {
      const data = await firstValueFrom(fetchProcessedCommitsStats(siteId, { scope: processedScope }));
      setProcessedStats(data);
    } catch (e) {
      setProcessedStats(null);
      setProcessedStatsError((e as Error).message || 'Failed to load processed commits statistics');
    } finally {
      setProcessedStatsLoading(false);
    }
  }, [processedScope, siteId, systemAdmin]);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadStats(), loadProcessedStats()]);
  }, [loadProcessedStats, loadStats]);

  useEffect(() => {
    loadAccess();
  }, [loadAccess]);

  useEffect(() => {
    if (systemAdmin) {
      loadStats();
    }
  }, [loadStats, systemAdmin]);

  useEffect(() => {
    if (systemAdmin) {
      loadProcessedStats();
    }
  }, [loadProcessedStats, systemAdmin]);

  const canConfirm = ackChecked && (mode !== 'beforeDate' || Boolean(beforeDate));

  const canConfirmProcessed = processedAckChecked;

  const onOpenConfirm = () => {
    setAckChecked(false);
    setConfirmOpen(true);
  };

  const onOpenProcessedConfirm = () => {
    setProcessedAckChecked(false);
    setProcessedConfirmOpen(true);
  };

  const onTruncate = async () => {
    setBusy(true);
    setActionError('');
    setNotice('');
    try {
      const result = await firstValueFrom(
        postTruncateAudit(siteId, {
          scope,
          mode,
          beforeDate: mode === 'beforeDate' ? beforeDate : undefined,
          confirmed: true
        })
      );
      setNotice(result.message || `Deleted ${result.deletedCount ?? 0} audit entries.`);
      setConfirmOpen(false);
      await loadStats();
    } catch (e) {
      setActionError((e as Error).message || 'Audit truncation failed');
    } finally {
      setBusy(false);
    }
  };

  const onTruncateProcessed = async () => {
    setProcessedBusy(true);
    setProcessedActionError('');
    setProcessedNotice('');
    try {
      const result = await firstValueFrom(
        postTruncateProcessedCommits(siteId, {
          scope: processedScope,
          confirmed: true
        })
      );
      setProcessedNotice(result.message || `Deleted ${result.deletedCount ?? 0} processed commit rows.`);
      setProcessedConfirmOpen(false);
      await loadProcessedStats();
    } catch (e) {
      setProcessedActionError((e as Error).message || 'Processed commits truncation failed');
    } finally {
      setProcessedBusy(false);
    }
  };

  if (accessLoading) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!systemAdmin) {
    return (
      <Alert severity="warning" icon={<WarningAmberRoundedIcon />}>
        {accessError || 'Database maintenance requires system administrator (system_admin) access.'}
        {username ? ` Signed in as ${username}.` : ''}
      </Alert>
    );
  }

  const statsRefreshing = statsLoading || processedStatsLoading;

  return (
    <TabShell>
      <TabToolbar>
        <ToolbarRow>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={700}>Database</Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {siteName ? `${siteName} (${siteId})` : siteId} · sysadmin: {username}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={statsRefreshing ? <CircularProgress size={14} /> : <RefreshRoundedIcon />}
            disabled={statsRefreshing}
            onClick={refreshAll}
          >
            Refresh stats
          </Button>
        </ToolbarRow>
      </TabToolbar>

      <TabAlertStack>
        {notice && (
          <Alert severity="success" onClose={() => setNotice('')}>
            {notice}
          </Alert>
        )}
        {actionError && (
          <Alert severity="error" onClose={() => setActionError('')}>
            {actionError}
          </Alert>
        )}
        {processedNotice && (
          <Alert severity="success" onClose={() => setProcessedNotice('')}>
            {processedNotice}
          </Alert>
        )}
        {processedActionError && (
          <Alert severity="error" onClose={() => setProcessedActionError('')}>
            {processedActionError}
          </Alert>
        )}
      </TabAlertStack>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pr: 0.5
        }}
      >
      <Paper variant="outlined" sx={{ ...surfacePaperSx, flexShrink: 0 }}>
        <Box sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
            <StorageRoundedIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Audit history
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Permanently delete Studio audit log entries. This cannot be undone.
              </Typography>
            </Box>
          </Stack>

          {statsError && (
            <Alert severity="error" onClose={() => setStatsError('')} sx={{ mb: 2 }}>
              {statsError}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Scope</InputLabel>
              <Select label="Scope" value={scope} onChange={(e) => setScope(e.target.value as AuditTruncateScope)}>
                <MenuItem value="site">This project only</MenuItem>
                <MenuItem value="global">Entire Studio (all projects)</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Operation</InputLabel>
              <Select label="Operation" value={mode} onChange={(e) => setMode(e.target.value as AuditTruncateMode)}>
                <MenuItem value="all">Delete all audit history</MenuItem>
                <MenuItem value="beforeDate">Delete before date</MenuItem>
              </Select>
            </FormControl>
            {mode === 'beforeDate' && (
              <TextField
                size="small"
                type="date"
                label="Delete before"
                value={beforeDate}
                onChange={(e) => setBeforeDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                helperText="Entries before this date (UTC midnight) will be deleted."
              />
            )}
          </Stack>

          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {option.label}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {option.summary}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Matching entries
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {statsLoading ? '…' : Number(stats?.deleteCount ?? stats?.matchingEntries ?? 0).toLocaleString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Total in scope
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {statsLoading ? '…' : Number(stats?.totalEntries ?? 0).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <DangerZone
            title="Destructive database operation"
            description={option.consequence}
            action={
              <Button color="error" variant="contained" onClick={onOpenConfirm} disabled={mode === 'beforeDate' && !beforeDate}>
                Truncate audit history
              </Button>
            }
          />
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ ...surfacePaperSx, flexShrink: 0 }}>
        <Box sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
            <HistoryRoundedIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Processed commits (git sync cache)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clears the Studio processed_commits table. Safe after history rewrite; does not delete git or content.
              </Typography>
            </Box>
          </Stack>

          {processedStatsError && (
            <Alert severity="error" onClose={() => setProcessedStatsError('')} sx={{ mb: 2 }}>
              {processedStatsError}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Scope</InputLabel>
              <Select
                label="Scope"
                value={processedScope}
                onChange={(e) => setProcessedScope(e.target.value as ProcessedCommitsTruncateScope)}
              >
                <MenuItem value="site">This project only</MenuItem>
                <MenuItem value="global">Entire Studio (all projects)</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {processedOption.label}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {processedOption.summary}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Cached rows
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {processedStatsLoading ? '…' : Number(processedStats?.rowCount ?? 0).toLocaleString()}
                </Typography>
              </Box>
              {processedScope === 'site' && (
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Sync pointer (preserved)
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                    {processedStatsLoading
                      ? '…'
                      : processedStats?.lastProcessedCommitId || '(none set)'}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Paper>

          <DangerZone
            title="Clear sync cache"
            description={processedOption.consequence}
            action={
              <Button color="warning" variant="contained" onClick={onOpenProcessedConfirm}>
                Truncate processed commits
              </Button>
            }
          />
        </Box>
      </Paper>
      </Box>

      <Dialog open={confirmOpen} onClose={() => !busy && setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm audit history truncation</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="error" icon={<WarningAmberRoundedIcon />}>
              {option.consequence}
            </Alert>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                What will be deleted
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.whatIsDestroyed}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                What is preserved
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.whatIsPreserved}
              </Typography>
            </Box>
            <Typography variant="body2">
              This action is logged in the Studio audit log and server log as performed by <strong>{username}</strong>.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={ackChecked} onChange={(e) => setAckChecked(e.target.checked)} />}
              label="I understand this permanently deletes audit history and cannot be undone."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={busy}>
            Cancel
          </Button>
          <Button color="error" variant="contained" disabled={!canConfirm || busy} onClick={onTruncate}>
            {busy ? 'Deleting…' : 'Delete audit history'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={processedConfirmOpen}
        onClose={() => !processedBusy && setProcessedConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm processed commits truncation</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="warning" icon={<WarningAmberRoundedIcon />}>
              {processedOption.consequence}
            </Alert>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                What will be deleted
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {processedOption.whatIsDestroyed}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                What is preserved
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {processedOption.whatIsPreserved}
              </Typography>
            </Box>
            <Typography variant="body2">
              This action is logged in the Studio audit log and server log as performed by <strong>{username}</strong>.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={processedAckChecked}
                  onChange={(e) => setProcessedAckChecked(e.target.checked)}
                />
              }
              label="I understand this clears the git sync cache and may affect Git Log processed badges until the next sync."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProcessedConfirmOpen(false)} disabled={processedBusy}>
            Cancel
          </Button>
          <Button
            color="warning"
            variant="contained"
            disabled={!canConfirmProcessed || processedBusy}
            onClick={onTruncateProcessed}
          >
            {processedBusy ? 'Clearing…' : 'Truncate processed commits'}
          </Button>
        </DialogActions>
      </Dialog>
    </TabShell>
  );
}
