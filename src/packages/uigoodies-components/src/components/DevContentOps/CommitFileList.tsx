/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { firstValueFrom } from 'rxjs';
import {
  fetchCommitFiles,
  type CommitFileChange,
  type GitCommit,
  type PatchSelection
} from './devContentOpsApi';
import { selectionKey } from './PatchBasketPanel';
import { SectionLabel } from './devContentOpsUi';
import {
  FileChangeSummary,
  FileChangeTypeChip,
  countFileChanges,
  isMixedChangeSet,
  type FileChangeCounts
} from './changeTypeUi';

const FILE_PAGE = 25;

type Props = {
  siteId: string;
  commit: GitCommit;
  onViewFile: (commit: GitCommit, file: CommitFileChange) => void;
  onDiffFile: (commit: GitCommit, file: CommitFileChange) => void;
  onAddToPatch: (selection: PatchSelection) => void;
  onRemoveFromHistory: (commit: GitCommit, file: CommitFileChange) => void;
  patchKeys: Set<string>;
};

export function CommitFileList({
  siteId,
  commit,
  onViewFile,
  onDiffFile,
  onAddToPatch,
  onRemoveFromHistory,
  patchKeys
}: Props) {
  const [files, setFiles] = useState<CommitFileChange[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changeCounts, setChangeCounts] = useState<FileChangeCounts>({});

  const load = useCallback(
    async (nextSkip: number, append: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const data = await firstValueFrom(
          fetchCommitFiles(siteId, commit.id, { skip: nextSkip, limit: FILE_PAGE })
        );
        setFiles((prev) => {
          const nextFiles = append ? [...prev, ...(data.files ?? [])] : data.files ?? [];
          if (data.changeCounts) {
            setChangeCounts(data.changeCounts);
          } else {
            setChangeCounts(countFileChanges(nextFiles));
          }
          return nextFiles;
        });
        setTotal(data.total ?? 0);
        setSkip(data.nextSkip ?? nextSkip);
        setHasMore(data.hasMore ?? false);
      } catch (e) {
        setError((e as Error).message || 'Failed to load files');
      } finally {
        setLoading(false);
      }
    },
    [siteId, commit.id]
  );

  useEffect(() => {
    load(0, false);
  }, [load]);

  const mixedChanges = useMemo(() => isMixedChangeSet(changeCounts), [changeCounts]);

  return (
    <Box sx={{ mt: 1, mb: 1, minWidth: 0, maxWidth: '100%' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={0.75}
        sx={{ mb: 0.75 }}
      >
        <SectionLabel>Changed files ({total})</SectionLabel>
        {!loading && files.length > 0 && <FileChangeSummary counts={changeCounts} />}
      </Stack>
      {error && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mb: 0.5 }}>
          {error}
        </Typography>
      )}
      {loading && files.length === 0 ? (
        <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={20} />
        </Box>
      ) : files.length === 0 ? (
        <Typography variant="caption" color="text.secondary">No file changes in this commit.</Typography>
      ) : (
        <List dense disablePadding>
          {files.map((file) => {
            const inPatch = patchKeys.has(selectionKey({ commitId: commit.id, path: file.path }));
            return (
              <ListItem
                key={file.path + file.changeType}
                sx={{
                  py: 0.75,
                  pl: 1,
                  pr: 0,
                  mb: 0.5,
                  alignItems: 'stretch',
                  flexDirection: 'column',
                  minWidth: 0,
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.default'
                }}
              >
                <Stack direction="row" spacing={0.5} alignItems="flex-start" sx={{ width: '100%', minWidth: 0 }}>
                  <FileChangeTypeChip changeType={file.changeType} compact={mixedChanges} />
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ flex: 1, minWidth: 0, wordBreak: 'break-all', lineHeight: 1.4 }}
                  >
                    {file.path}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.25} sx={{ mt: 0.25, flexShrink: 0 }}>
                  <Tooltip title="View at commit">
                    <IconButton size="small" onClick={() => onViewFile(commit, file)}>
                      <VisibilityRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {commit.parents[0] && file.changeType !== 'DELETE' && (
                    <Tooltip title="Diff vs parent">
                      <IconButton size="small" onClick={() => onDiffFile(commit, file)}>
                        <CompareArrowsRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title={inPatch ? 'Already in patch' : 'Add to patch'}>
                    <span>
                      <IconButton
                        size="small"
                        disabled={inPatch}
                        onClick={() =>
                          onAddToPatch({
                            commitId: commit.id,
                            shortId: commit.shortId,
                            subject: commit.subject,
                            path: file.path,
                            changeType: file.changeType
                          })
                        }
                      >
                        <PlaylistAddRoundedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Remove from history">
                    <IconButton size="small" onClick={() => onRemoveFromHistory(commit, file)}>
                      <DeleteForeverRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      )}
      {hasMore && (
        <Button
          size="small"
          disabled={loading}
          onClick={() => load(skip, true)}
          sx={{ mt: 0.5 }}
        >
          {loading ? 'Loading…' : 'Load more files'}
        </Button>
      )}
    </Box>
  );
}
