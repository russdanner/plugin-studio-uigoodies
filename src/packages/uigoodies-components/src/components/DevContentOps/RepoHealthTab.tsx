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
  FormControl,
  FormControlLabel,
  Divider,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  alpha
} from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { RepoHealthLearnMoreDialog } from './RepoHealthLearnMoreDialog';
import { downloadRepoHealthReportMarkdown } from './repoHealthReportMarkdown';
import { fetchRepoHealth, postOptimizeRepo, type RepoConfigSetting, type RepoHealthMetric, type RepoHealthReport } from './devContentOpsApi';
import {
  REPO_OPTIMIZE_OPTIONS,
  getRepoOptimizeOption,
  requiresConfirmation,
  type RepoOptimizeOperation,
  type RepoOptimizeOption,
  type RepoOptimizeRisk
} from './repoOptimizeOptions';
import {
  codeBlockSx,
  monoSx,
  PanelHeader,
  surfacePaperSx,
  TabAlertStack,
  TabShell,
  TabToolbar,
  ToolbarGroup,
  ToolbarRow
} from './devContentOpsUi';

import { firstValueFrom } from 'rxjs';

type ConcernLevel = 'ok' | 'watch' | 'elevated' | 'critical';

function concernLevel(concern: number): ConcernLevel {
  if (concern >= 30) {
    return 'critical';
  }
  if (concern >= 10) {
    return 'elevated';
  }
  if (concern >= 3) {
    return 'watch';
  }
  return 'ok';
}

function concernPalette(level: ConcernLevel): 'success' | 'info' | 'warning' | 'error' {
  switch (level) {
    case 'critical':
      return 'error';
    case 'elevated':
      return 'warning';
    case 'watch':
      return 'info';
    default:
      return 'success';
  }
}

function concernLabel(level: ConcernLevel): string {
  switch (level) {
    case 'critical':
      return 'Critical';
    case 'elevated':
      return 'Elevated';
    case 'watch':
      return 'Watch';
    default:
      return 'OK';
  }
}

function concernProgress(concern: number): number {
  return Math.min(100, Math.round((Math.max(0, concern) / 30) * 100));
}

function ConcernIndicator({ concern, compact = false }: { concern: number; compact?: boolean }) {
  const level = concernLevel(concern);
  const color = concernPalette(level);
  const progress = concernProgress(concern);

  return (
    <Stack spacing={0.75} alignItems={compact ? 'flex-start' : 'flex-end'} sx={{ minWidth: compact ? 0 : 108 }}>
      <Chip
        size="small"
        icon={
          level === 'ok' ? (
            <CheckCircleOutlineRoundedIcon />
          ) : level === 'critical' ? (
            <ErrorOutlineRoundedIcon />
          ) : level === 'elevated' ? (
            <WarningAmberRoundedIcon />
          ) : (
            <InfoOutlinedIcon />
          )
        }
        label={concernLabel(level)}
        color={color}
        variant={level === 'ok' ? 'outlined' : 'filled'}
        sx={{ fontWeight: 700 }}
      />
      {concern > 0 && (
        <LinearProgress
          variant="determinate"
          value={progress}
          color={color}
          sx={{ width: compact ? 72 : '100%', height: 6, borderRadius: 999 }}
        />
      )}
    </Stack>
  );
}

function riskColor(risk: RepoOptimizeRisk): 'success' | 'warning' | 'error' | 'default' {
  if (risk === 'destructive') {
    return 'error';
  }
  if (risk === 'moderate') {
    return 'warning';
  }
  return 'success';
}

function riskLabel(risk: RepoOptimizeRisk): string {
  if (risk === 'destructive') {
    return 'Destructive';
  }
  if (risk === 'moderate') {
    return 'Moderate';
  }
  return 'Safe';
}

function groupMetrics(metrics: RepoHealthMetric[]): Array<{ group: string; metrics: RepoHealthMetric[] }> {
  const order: string[] = [];
  const map = new Map<string, RepoHealthMetric[]>();
  metrics.forEach((metric) => {
    const group = metric.group?.trim() || 'Metrics';
    if (!map.has(group)) {
      map.set(group, []);
      order.push(group);
    }
    map.get(group)!.push(metric);
  });
  return order.map((group) => ({ group, metrics: map.get(group)! }));
}

function groupConfigSettings(settings: RepoConfigSetting[]): Array<{ group: string; settings: RepoConfigSetting[] }> {
  const order: string[] = [];
  const map = new Map<string, RepoConfigSetting[]>();
  settings.forEach((setting) => {
    const group = setting.group?.trim() || 'Configuration';
    if (!map.has(group)) {
      map.set(group, []);
      order.push(group);
    }
    map.get(group)!.push(setting);
  });
  return order.map((group) => ({ group, settings: map.get(group)! }));
}

function sourceLabel(setting: RepoConfigSetting): string {
  switch (setting.source) {
    case 'local':
      return setting.sourceDetail || '.git/config';
    case 'global':
      return setting.sourceDetail || 'global gitconfig';
    case 'system':
      return setting.sourceDetail || 'system gitconfig';
    case 'runtime':
      return 'git count-objects';
    case 'default':
      return 'Git default';
    default:
      return setting.sourceDetail || setting.source || '—';
  }
}

function ConfigRow({ setting }: { setting: RepoConfigSetting }) {
  const deviates = Boolean(setting.deviatesFromRecommended);
  const recommended = setting.recommendedValue?.trim();

  return (
    <TableRow
      hover
      sx={
        deviates
          ? {
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
              boxShadow: (theme) => `inset 3px 0 0 ${theme.palette.warning.main}`,
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.14)
              }
            }
          : undefined
      }
    >
      <TableCell sx={{ fontWeight: 600, width: '22%', verticalAlign: 'top' }}>
        <Stack direction="row" spacing={0.75} alignItems="flex-start">
          {deviates ? (
            <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 18, mt: 0.25, flexShrink: 0 }} />
          ) : null}
          <Box>
            <Typography variant="body2" sx={monoSx}>
              {setting.label}
            </Typography>
            {setting.description && (
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, fontWeight: 400 }}>
                {setting.description}
              </Typography>
            )}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={{ width: '14%', verticalAlign: 'top' }}>
        <Typography
          variant="body2"
          sx={{
            ...monoSx,
            fontWeight: deviates ? 700 : 400,
            color: deviates ? 'warning.dark' : 'text.primary'
          }}
        >
          {setting.value}
        </Typography>
        {deviates && recommended && (
          <Typography variant="caption" color="warning.dark" display="block" sx={{ mt: 0.5, fontWeight: 600 }}>
            Recommended: {recommended}
          </Typography>
        )}
      </TableCell>
      <TableCell sx={{ width: '14%', verticalAlign: 'top' }}>
        <Typography variant="caption" color="text.secondary">
          {sourceLabel(setting)}
        </Typography>
        {setting.defaultValue && setting.value !== setting.defaultValue && !deviates && (
          <Typography variant="caption" color="text.secondary" display="block">
            default: {setting.defaultValue}
          </Typography>
        )}
        {deviates && setting.defaultValue && (
          <Typography variant="caption" color="text.secondary" display="block">
            Git default: {setting.defaultValue}
          </Typography>
        )}
      </TableCell>
      <TableCell sx={{ verticalAlign: 'top' }}>
        <Typography variant="body2">{setting.performanceNote || '—'}</Typography>
      </TableCell>
      <TableCell align="right" sx={{ width: 120, verticalAlign: 'top' }}>
        <Stack spacing={0.5} alignItems="flex-end">
          {deviates ? (
            <Chip size="small" color="warning" variant="outlined" label="Non-recommended" />
          ) : null}
          <ConcernIndicator concern={setting.concern ?? 0} compact />
        </Stack>
      </TableCell>
    </TableRow>
  );
}

function OptimizeRiskDetails({ option }: { option: RepoOptimizeOption }) {
  return (
    <Stack spacing={1.25} sx={{ mt: 0.5 }}>
      <Typography variant="body2" color="text.secondary">
        {option.summary}
      </Typography>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.06)
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
          Site content &amp; history
        </Typography>
        <Typography variant="body2">{option.contentHistoryRisk}</Typography>
      </Box>
      {(option.risk === 'moderate' || option.risk === 'destructive') && (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            border: 1,
            borderColor: option.risk === 'destructive' ? 'error.light' : 'warning.light',
            bgcolor: (theme) =>
              alpha(theme.palette[option.risk === 'destructive' ? 'error' : 'warning'].main, 0.06)
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
            Why {riskLabel(option.risk).toLowerCase()}
          </Typography>
          <Typography variant="body2">{option.whyRisky}</Typography>
        </Box>
      )}
      <Stack spacing={0.75}>
        <Typography variant="caption" color="text.secondary">
          <strong>Preserved:</strong> {option.whatIsPreserved}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          <strong>May be removed:</strong> {option.whatIsDestroyed}
        </Typography>
      </Stack>
    </Stack>
  );
}

function MetricCard({ metric }: { metric: RepoHealthMetric }) {
  const level = concernLevel(metric.concern ?? 0);
  const borderColor = (theme: { palette: { [key: string]: { main: string } } }) =>
    level === 'ok' ? theme.palette.divider : theme.palette[concernPalette(level)].main;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.75,
        height: '100%',
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        borderLeftColor: borderColor,
        bgcolor: (theme) =>
          level === 'ok' ? 'background.paper' : alpha(theme.palette[concernPalette(level)].main, 0.04)
      }}
    >
      <Stack direction="row" spacing={1.5} justifyContent="space-between" alignItems="flex-start">
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ mb: 0.75 }}>
            {metric.label}
          </Typography>
          <Typography variant="h6" fontWeight={800} lineHeight={1.2} sx={monoSx}>
            {String(metric.value)}
          </Typography>
          {metric.objectId && (
            <Chip
              size="small"
              variant="outlined"
              label={metric.objectId.slice(0, 12)}
              sx={{ ...monoSx, mt: 1, maxWidth: '100%' }}
            />
          )}
        </Box>
        <ConcernIndicator concern={metric.concern ?? 0} />
      </Stack>
    </Paper>
  );
}

function MetricGroupSection({ group, metrics }: { group: string; metrics: RepoHealthMetric[] }) {
  const groupConcern = Math.max(0, ...metrics.map((metric) => metric.concern ?? 0));
  const level = concernLevel(groupConcern);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.08em', flex: 1 }}>
          {group}
        </Typography>
        <Chip
          size="small"
          label={concernLabel(level)}
          color={concernPalette(level)}
          variant={level === 'ok' ? 'outlined' : 'filled'}
        />
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' },
          gap: 1.5
        }}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </Box>
    </Box>
  );
}

export function RepoHealthTab({ siteId, siteName }: { siteId: string; siteName?: string }) {
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState<RepoOptimizeOperation | null>(null);
  const [report, setReport] = useState<RepoHealthReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<RepoOptimizeOperation>('gcAuto');
  const [confirmOption, setConfirmOption] = useState<RepoOptimizeOption | null>(null);
  const [ackChecked, setAckChecked] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  const selectedOptimize = useMemo(
    () => getRepoOptimizeOption(selectedOperation) ?? REPO_OPTIMIZE_OPTIONS[0],
    [selectedOperation]
  );

  const metricGroups = useMemo(() => groupMetrics(report?.metrics ?? []), [report?.metrics]);
  const configGroups = useMemo(
    () => groupConfigSettings(report?.repoConfig?.settings ?? []),
    [report?.repoConfig?.settings]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await firstValueFrom(fetchRepoHealth(siteId));
      if (!data.success) {
        setError(data.error || data.message || 'Analysis failed');
        setReport(null);
      } else {
        setReport(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed');
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    load();
  }, [load]);

  const runOptimize = async (operation: RepoOptimizeOperation) => {
    setOptimizing(operation);
    setNotice(null);
    setError(null);
    try {
      const result = await firstValueFrom(postOptimizeRepo(siteId, operation));
      if (!result.success) {
        const option = getRepoOptimizeOption(operation);
        const parts = [result.error, result.hint].filter(Boolean);
        if (result.mode === 'external' && result.command) {
          parts.push(result.command);
        }
        setError(parts.join(' — ') || `${option?.label ?? operation} could not be completed`);
        return;
      }
      const option = getRepoOptimizeOption(operation);
      setNotice(result.message || `${option?.label ?? operation} completed`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Optimization failed');
    } finally {
      setOptimizing(null);
    }
  };

  const openConfirm = (option: RepoOptimizeOption) => {
    setConfirmOption(option);
    setAckChecked(false);
  };

  const closeConfirm = () => {
    setConfirmOption(null);
    setAckChecked(false);
  };

  const confirmReady = useMemo(() => {
    if (!confirmOption) {
      return false;
    }
    if (requiresConfirmation(confirmOption)) {
      return ackChecked;
    }
    return true;
  }, [ackChecked, confirmOption]);

  const requestOptimize = () => {
    const option = selectedOptimize;
    if (option.risk === 'safe') {
      runOptimize(option.id);
      return;
    }
    openConfirm(option);
  };

  const confirmAndRun = () => {
    if (!confirmOption || !confirmReady) {
      return;
    }
    const operation = confirmOption.id;
    closeConfirm();
    runOptimize(operation);
  };

  const onDownloadReport = () => {
    if (!report) {
      return;
    }
    downloadRepoHealthReportMarkdown(report, { siteId, siteName });
    setNotice('Repository health report downloaded');
  };

  const overall = report?.overallConcern ?? 0;

  return (
    <TabShell>
      <TabToolbar>
        <ToolbarRow>
          <Box sx={{ minWidth: 0, flex: '1 1 200px' }}>
            <Typography variant="subtitle2" fontWeight={700}>Repository health</Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {siteName ? `${siteName} (${siteId})` : siteId}
              {report?.thresholdProfileLabel ? ` · Thresholds: ${report.thresholdProfileLabel}` : ''}
            </Typography>
            {report?.repoPath && (
              <Typography variant="caption" color="text.secondary" sx={{ ...monoSx, display: 'block', mt: 0.25 }} noWrap>
                {report.repoPath}
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center" sx={{ flexShrink: 0 }}>
            {report ? <ConcernIndicator concern={overall} compact /> : null}
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadRoundedIcon />}
              disabled={!report || loading}
              onClick={onDownloadReport}
            >
              Download report
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<HelpOutlineRoundedIcon />}
              onClick={() => setLearnMoreOpen(true)}
            >
              Learn more
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={loading ? <CircularProgress size={16} /> : <RefreshRoundedIcon />}
              disabled={loading || Boolean(optimizing)}
              onClick={() => load()}
            >
              Refresh
            </Button>
          </Stack>
        </ToolbarRow>

        <Divider />

        <ToolbarGroup label="Optimize">
          <FormControl size="small" sx={{ minWidth: 220, maxWidth: 320 }}>
            <InputLabel>Operation</InputLabel>
            <Select
              label="Operation"
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value as RepoOptimizeOperation)}
              disabled={loading || Boolean(optimizing)}
            >
              {REPO_OPTIMIZE_OPTIONS.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Chip size="small" label={riskLabel(selectedOptimize.risk)} color={riskColor(selectedOptimize.risk)} />
          <Button
            size="small"
            variant="contained"
            color={selectedOptimize.risk === 'destructive' ? 'error' : 'primary'}
            disabled={loading || Boolean(optimizing)}
            startIcon={
              optimizing === selectedOperation ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <AutoFixHighRoundedIcon />
              )
            }
            onClick={requestOptimize}
          >
            Run
          </Button>
        </ToolbarGroup>
        <Box sx={{ minWidth: 0 }}>
          <OptimizeRiskDetails option={selectedOptimize} />
        </Box>
      </TabToolbar>

      <TabAlertStack>
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {notice && (
          <Alert severity="success" onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        )}
      </TabAlertStack>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          pr: 0.5,
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <Paper variant="outlined" sx={{ ...surfacePaperSx, display: 'flex', flexDirection: 'column' }}>
          <PanelHeader
            title="Health metrics"
            subtitle={report?.summary ?? 'Run analysis to load repository metrics'}
          />
          {loading && !report ? (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <Stack spacing={0} divider={<Box sx={{ borderBottom: 1, borderColor: 'divider' }} />}>
              {metricGroups.map(({ group, metrics }) => (
                <MetricGroupSection key={group} group={group} metrics={metrics} />
              ))}

              {configGroups.length > 0 && (
                <Box>
                  <Box sx={{ px: 2, py: 1.5, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03) }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      Repository configuration
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Git settings and runtime object-store stats that affect GC, repack, status, and Studio commit performance.
                    </Typography>
                    {configGroups.some(({ settings }) => settings.some((s) => s.deviatesFromRecommended)) && (
                      <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 1 }}>
                        <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 16 }} />
                        <Typography variant="caption" color="warning.dark" fontWeight={600}>
                          Highlighted rows use a non-recommended value — compare current vs recommended in the Value column.
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Setting</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Performance impact</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {configGroups.map(({ group, settings }) => (
                        <React.Fragment key={group}>
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              sx={{ bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04), fontWeight: 700 }}
                            >
                              {group}
                            </TableCell>
                          </TableRow>
                          {settings.map((setting) => (
                            <ConfigRow key={setting.key} setting={setting} />
                          ))}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Stack>
          )}
          <Box
            sx={{
              px: 2,
              py: 1.25,
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02),
              flexShrink: 0
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Metrics follow git-sizer style. Optimize operations reorganize or prune Git storage — they do not remove committed site files from branches. Use Git log → Trim History to rewrite history and remove content from the past.
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Dialog open={Boolean(confirmOption)} onClose={closeConfirm} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {confirmOption?.risk === 'destructive' && <WarningAmberRoundedIcon color="error" />}
          Confirm: {confirmOption?.label}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Alert severity={confirmOption?.risk === 'destructive' ? 'error' : 'warning'} icon={<WarningAmberRoundedIcon />}>
              {confirmOption?.consequence}
            </Alert>
            {confirmOption && (
              <>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'success.light',
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.06)
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Your site content &amp; branch history
                  </Typography>
                  <Typography variant="body2">{confirmOption.contentHistoryRisk}</Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Why this is labeled {riskLabel(confirmOption.risk).toLowerCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    {confirmOption.whyRisky}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                    <strong>Preserved:</strong> {confirmOption.whatIsPreserved}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    <strong>May be permanently removed:</strong> {confirmOption.whatIsDestroyed}
                  </Typography>
                </Box>
              </>
            )}
            <Box sx={codeBlockSx}>{confirmOption?.command}</Box>
            <FormControlLabel
              control={
                <Checkbox checked={ackChecked} onChange={(_, checked) => setAckChecked(checked)} />
              }
              label="I understand what may be removed, what stays on branches, and want to proceed."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Cancel</Button>
          <Button color="error" variant="contained" disabled={!confirmReady || Boolean(optimizing)} onClick={confirmAndRun}>
            Run optimization
          </Button>
        </DialogActions>
      </Dialog>

      <RepoHealthLearnMoreDialog
        open={learnMoreOpen}
        onClose={() => setLearnMoreOpen(false)}
        profileLabel={report?.thresholdProfileLabel}
      />
    </TabShell>
  );
}

export default RepoHealthTab;
