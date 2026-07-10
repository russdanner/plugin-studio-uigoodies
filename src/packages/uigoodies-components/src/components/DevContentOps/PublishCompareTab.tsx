/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import { firstValueFrom } from 'rxjs';
import { DiffViewer } from './DiffViewer';
import {
  fetchPublishCompare,
  fetchPublishCompareDiff,
  fetchPublishCompareOverview,
  type FileDiff,
  type PublishCompareFile,
  type PublishCompareOverview,
  type PublishCompareResponse
} from './devContentOpsApi';
import { FileChangeSummary, FileChangeTypeChip } from './changeTypeUi';
import { monoSx, TabAlertStack, TabContentPanel, TabShell, TabToolbar, ToolbarRow } from './devContentOpsUi';

type Props = {
  siteId: string;
  siteName?: string;
};

const PAGE_SIZE = 50;
const PATH_PRESETS = ['/site', '/static-assets', '/config'];
const selectMenuProps = { disablePortal: true };

type TargetMode = 'auto' | 'staging' | 'live';

export function PublishCompareTab({ siteId, siteName }: Props) {
  const [overview, setOverview] = useState<PublishCompareOverview | null>(null);
  const [data, setData] = useState<PublishCompareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [pathPrefix, setPathPrefix] = useState('/site');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideNoDiff, setHideNoDiff] = useState(true);
  const [targetMode, setTargetMode] = useState<TargetMode>('auto');
  const [diffOpen, setDiffOpen] = useState(false);
  const [diffLoading, setDiffLoading] = useState(false);
  const [diffTitle, setDiffTitle] = useState('');
  const [fileDiffs, setFileDiffs] = useState<FileDiff[]>([]);
  const [diffNotice, setDiffNotice] = useState('');
  const requestGenRef = useRef(0);

  const targetParam = targetMode === 'auto' ? '' : targetMode;
  const publishLabel = useMemo(() => {
    if (!overview) {
      return '';
    }
    if (targetMode === 'staging') {
      return overview.stagingTarget || 'staging';
    }
    if (targetMode === 'live') {
      return overview.liveTarget || 'live';
    }
    return overview.defaultTarget || overview.liveTarget || 'live';
  }, [overview, targetMode]);

  const loadOverview = useCallback(
    async (requestGen: number) => {
      const result = await firstValueFrom(fetchPublishCompareOverview(siteId));
      if (requestGen !== requestGenRef.current) {
        return null;
      }
      setOverview(result);
      return result;
    },
    [siteId]
  );

  const loadCompare = useCallback(
    async (opts: { append?: boolean; skip?: number } = {}) => {
      const append = Boolean(opts.append);
      const requestGen = append ? requestGenRef.current : ++requestGenRef.current;
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError('');
      }
      try {
        if (!append) {
          await loadOverview(requestGen);
        }
        const result = await firstValueFrom(
          fetchPublishCompare(siteId, {
            target: targetParam,
            pathPrefix,
            query: searchQuery.trim(),
            hideNoDiff,
            skip: opts.skip ?? 0,
            limit: PAGE_SIZE
          })
        );
        if (requestGen !== requestGenRef.current) {
          return;
        }
        setData((prev) => {
          if (!append || !prev) {
            return result;
          }
          return {
            ...result,
            files: [...(prev.files ?? []), ...(result.files ?? [])]
          };
        });
      } catch (e) {
        if (requestGen !== requestGenRef.current) {
          return;
        }
        setError(e instanceof Error ? e.message : 'Failed to load publish compare');
        if (!append) {
          setData(null);
        }
      } finally {
        if (requestGen === requestGenRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [siteId, targetParam, pathPrefix, searchQuery, hideNoDiff, loadOverview]
  );

  useEffect(() => {
    requestGenRef.current += 1;
    setOverview(null);
    setData(null);
    setError('');
    void loadCompare();
  }, [siteId, targetMode]);

  const openDiff = useCallback(
    async (file: PublishCompareFile) => {
      setDiffOpen(true);
      setDiffLoading(true);
      setDiffTitle(file.internalName ? `${file.internalName} — ${file.path}` : file.path);
      setFileDiffs([]);
      setDiffNotice('');
      try {
        const result = await firstValueFrom(
          fetchPublishCompareDiff(siteId, file.path, targetParam || undefined)
        );
        if (result.binary) {
          setDiffNotice(result.message || 'Binary file cannot be diffed as text');
          return;
        }
        if (!result.diff?.trim() && result.lines?.length === 0) {
          setDiffNotice('No text differences between published and sandbox versions.');
          return;
        }
        const diffs = result.fileDiffs?.length
          ? result.fileDiffs
          : [
              {
                changeType: result.changeType || file.changeType,
                path: file.path,
                diff: result.diff || '',
                lines: result.lines || []
              }
            ];
        setFileDiffs(diffs);
      } catch (e) {
        setDiffNotice(e instanceof Error ? e.message : 'Failed to load diff');
      } finally {
        setDiffLoading(false);
      }
    },
    [siteId, targetParam]
  );

  const files = data?.files ?? [];
  const hasMore = Boolean(data?.hasMore);
  const changeCounts = data?.changeCounts ?? {};
  const activeFilter = searchQuery.trim() || data?.query;

  return (
    <TabShell>
      <TabToolbar>
        <Typography variant="body2" color="text.secondary">
          Compare sandbox (authoring) against the published repository
          {siteName ? ` for ${siteName}` : ''}. Uses staging when enabled and available; otherwise live.
        </Typography>
        <ToolbarRow>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="publish-compare-target-label">Published branch</InputLabel>
            <Select
              labelId="publish-compare-target-label"
              label="Published branch"
              value={targetMode}
              onChange={(e) => setTargetMode(e.target.value as TargetMode)}
              MenuProps={selectMenuProps}
            >
              <MenuItem value="auto">Auto (staging → live)</MenuItem>
              {overview?.stagingEnabled ? <MenuItem value="staging">Staging</MenuItem> : null}
              <MenuItem value="live">Live</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Path prefix"
            value={pathPrefix}
            onChange={(e) => setPathPrefix(e.target.value)}
            placeholder="/site"
            sx={{ minWidth: 160 }}
          />
          <TextField
            size="small"
            label="Filter path or internal name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                void loadCompare();
              }
            }}
            placeholder="e.g. home, /site/website/about"
            sx={{ minWidth: 240 }}
          />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={hideNoDiff}
                onChange={(e) => setHideNoDiff(e.target.checked)}
              />
            }
            label="Hide files with no text diff"
            sx={{ ml: 0.5, mr: 0 }}
          />
          <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap" useFlexGap>
            {PATH_PRESETS.map((preset) => (
              <Chip
                key={preset}
                size="small"
                label={preset}
                variant={pathPrefix === preset ? 'filled' : 'outlined'}
                onClick={() => setPathPrefix(preset)}
              />
            ))}
          </Stack>
          <Button
            size="small"
            variant="outlined"
            startIcon={loading ? <CircularProgress size={16} /> : <RefreshRoundedIcon />}
            onClick={() => void loadCompare()}
            disabled={loading}
          >
            Apply / refresh
          </Button>
        </ToolbarRow>
      </TabToolbar>

      <TabAlertStack>
        {error ? <Alert severity="error">{error}</Alert> : null}
        {overview && !overview.publishedRepositoryExists ? (
          <Alert severity="info">No published repository exists for this site yet.</Alert>
        ) : null}
      </TabAlertStack>

      <TabContentPanel>
        {loading && !data ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2} sx={{ minHeight: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <Chip
                size="small"
                variant="outlined"
                label={`Sandbox: ${data?.sandboxBranch || overview?.sandboxBranch || 'master'}`}
                sx={monoSx}
              />
              <Chip
                size="small"
                variant="outlined"
                label={`Published: ${publishLabel}`}
                color="primary"
                sx={monoSx}
              />
              {data?.sandboxHeadCommitId ? (
                <Chip size="small" label={`sandbox @ ${data.sandboxHeadCommitId.slice(0, 8)}`} sx={monoSx} />
              ) : null}
              {data?.publishHeadCommitId ? (
                <Chip size="small" label={`published @ ${data.publishHeadCommitId.slice(0, 8)}`} sx={monoSx} />
              ) : null}
              {data ? (
                <>
                  <Chip size="small" variant="outlined" label={`${data.total ?? files.length} differences`} />
                  <FileChangeSummary counts={changeCounts} />
                </>
              ) : null}
            </Stack>

            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell width={96}>Change</TableCell>
                    <TableCell width="28%">Internal name</TableCell>
                    <TableCell>Path</TableCell>
                    <TableCell width={120} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                          {!overview?.publishedRepositoryExists
                            ? 'Publish content to create a published repository, then compare again.'
                            : activeFilter
                              ? 'No matching differences for the current filter.'
                              : 'No differences between sandbox and the selected published branch for this path prefix.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    files.map((file) => (
                      <TableRow key={file.path} hover>
                        <TableCell>
                          <FileChangeTypeChip changeType={file.changeType} />
                        </TableCell>
                        <TableCell>
                          {file.internalName ? (
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {file.internalName}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.disabled">
                              —
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={monoSx}>{file.path}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            startIcon={<CompareArrowsRoundedIcon />}
                            onClick={() => void openDiff(file)}
                            disabled={file.changeType === 'DELETE' || file.hasTextDiff === false}
                          >
                            Diff
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>

            {hasMore ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  disabled={loadingMore}
                  startIcon={loadingMore ? <CircularProgress size={16} /> : undefined}
                  onClick={() => void loadCompare({ append: true, skip: data?.nextSkip ?? files.length })}
                >
                  Load more
                </Button>
              </Box>
            ) : null}
          </Stack>
        )}
      </TabContentPanel>

      <Dialog open={diffOpen} onClose={() => setDiffOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={monoSx}>{diffTitle}</DialogTitle>
        <DialogContent dividers sx={{ minHeight: 320, display: 'flex', flexDirection: 'column' }}>
          {diffLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : diffNotice ? (
            <Alert severity="info">{diffNotice}</Alert>
          ) : (
            <DiffViewer
              title={`Published (${publishLabel}) → sandbox (${data?.sandboxBranch || 'master'})`}
              fileDiffs={fileDiffs}
            />
          )}
        </DialogContent>
      </Dialog>
    </TabShell>
  );
}
