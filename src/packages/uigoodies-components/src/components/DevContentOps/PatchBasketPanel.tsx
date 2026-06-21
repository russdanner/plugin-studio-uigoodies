/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import type { PatchSelection } from './devContentOpsApi';
import { codeBlockSx, monoSx, surfacePaperSx } from './devContentOpsUi';
import { changeLabel, changeColor } from './changeTypeUi';

type SiteOption = { id: string; name: string };

type Props = {
  selections: PatchSelection[];
  onRemove: (index: number) => void;
  onClear: () => void;
  onBuildPatch: () => void;
  onApplyPatch: () => void;
  onDownloadPatch: () => void;
  building?: boolean;
  patchPreview?: string;
  sourceSiteId?: string;
  sites?: SiteOption[];
  applyTargetSiteId?: string;
  onApplyTargetSiteChange?: (siteId: string) => void;
};

export function selectionKey(sel: PatchSelection): string {
  return `${sel.commitId}:${sel.path ?? '*'}`;
}

export function PatchBasketPanel({
  selections,
  onRemove,
  onClear,
  onBuildPatch,
  onApplyPatch,
  onDownloadPatch,
  building,
  patchPreview,
  sourceSiteId,
  sites = [],
  applyTargetSiteId,
  onApplyTargetSiteChange
}: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const applyTarget = applyTargetSiteId || sourceSiteId || '';
  const applyTargetSite = sites.find((site) => site.id === applyTarget) ?? null;
  const applyToOtherProject = Boolean(sourceSiteId && applyTarget && applyTarget !== sourceSiteId);
  const hasContent = selections.length > 0 || Boolean(patchPreview);
  const showExpanded = expanded || hasContent;

  return (
    <Paper variant="outlined" sx={{ ...surfacePaperSx, flexShrink: 0 }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          px: 1.5,
          py: 1,
          borderBottom: showExpanded ? 1 : 0,
          borderColor: 'divider',
          flexWrap: 'wrap',
          useFlexGap: true
        }}
      >
        <IconButton
          size="small"
          onClick={() => setExpanded((v) => !v)}
          aria-label={showExpanded ? 'Collapse patch basket' : 'Expand patch basket'}
          sx={{ ml: -0.5 }}
        >
          <ExpandMoreRoundedIcon
            fontSize="small"
            sx={{
              transform: showExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease'
            }}
          />
        </IconButton>
        <Typography variant="subtitle2" fontWeight={700} sx={{ flex: 1, minWidth: 0 }}>
          Patch basket
          <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.75 }}>
            ({selections.length})
          </Typography>
        </Typography>
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
          <Button size="small" variant="contained" disabled={!selections.length || building} onClick={onBuildPatch}>
            Build
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={!patchPreview}
            startIcon={<DownloadRoundedIcon />}
            onClick={onDownloadPatch}
          >
            Download
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={!patchPreview}
            startIcon={<ContentPasteRoundedIcon />}
            onClick={onApplyPatch}
          >
            Apply
          </Button>
          <Button size="small" color="inherit" disabled={!selections.length} onClick={onClear}>
            Clear
          </Button>
        </Stack>
      </Stack>

      <Collapse in={showExpanded}>
        <Box sx={{ p: 1.5 }}>
          {!hasContent ? (
            <Typography variant="body2" color="text.secondary">
              Add commits or files from the log, then build a patch.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {selections.length > 0 && (
                <List dense disablePadding sx={{ maxHeight: 140, overflow: 'auto' }}>
                  {selections.map((sel, idx) => (
                    <ListItem
                      key={selectionKey(sel) + idx}
                      sx={{
                        py: 0.5,
                        pl: 1,
                        pr: 0,
                        mb: 0.5,
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.default'
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => onRemove(idx)}
                          aria-label="Remove from patch basket"
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" useFlexGap>
                            <Chip
                              size="small"
                              label={sel.shortId ?? sel.commitId.slice(0, 8)}
                              sx={{ height: 20, ...monoSx, fontWeight: 600 }}
                            />
                            {sel.path ? (
                              <Typography variant="caption" sx={{ wordBreak: 'break-all' }}>{sel.path}</Typography>
                            ) : (
                              <Typography variant="caption" color="text.secondary">entire commit</Typography>
                            )}
                            {sel.changeType && (
                              <Chip
                                size="small"
                                variant="outlined"
                                label={changeLabel(sel.changeType)}
                                color={changeColor(sel.changeType)}
                                sx={{ height: 20 }}
                              />
                            )}
                          </Stack>
                        }
                        secondary={sel.subject}
                        secondaryTypographyProps={{ variant: 'caption', sx: { mt: 0.25 } }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {patchPreview && (
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Preview
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{ ...codeBlockSx, mt: 0.5, maxHeight: 96, overflow: 'auto', fontSize: 11 }}
                  >
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{patchPreview.slice(0, 4000)}</pre>
                  </Paper>
                </Box>
              )}

              {patchPreview && sites.length > 0 && onApplyTargetSiteChange && (
                <Stack spacing={0.75}>
                  <Autocomplete
                    size="small"
                    options={sites}
                    value={applyTargetSite}
                    onChange={(_, value) => onApplyTargetSiteChange(value?.id ?? sourceSiteId ?? '')}
                    getOptionLabel={(option) => `${option.name} (${option.id})`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Apply to project"
                        placeholder="Same as header unless changed"
                      />
                    )}
                  />
                  {applyToOtherProject && (
                    <Typography variant="caption" color="warning.main">
                      Patch applies to another project&apos;s sandbox repository.
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}
