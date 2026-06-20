/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import ItemTypeIcon from '@craftercms/studio-ui/components/ItemTypeIcon';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { fetchItemsByPath } from '@craftercms/studio-ui/services/content';
import type { ContentPickerFeedEntry } from './imageStudioContentPicker';

type Props = {
  title: string;
  description: string;
  entries: ContentPickerFeedEntry[];
  loading: boolean;
  error?: string | null;
  selectedPath: string | null;
  onSelect(path: string, label?: string | null): void;
  onRefresh?(): void;
};

export function ImageStudioContentFeedPanel({
  title,
  description,
  entries,
  loading,
  error,
  selectedPath,
  onSelect,
  onRefresh
}: Props) {
  const siteId = useActiveSiteId();
  const [itemsByPath, setItemsByPath] = useState<Record<string, SandboxItem>>({});

  const pathsKey = useMemo(() => entries.map((entry) => entry.path).join('\0'), [entries]);

  useEffect(() => {
    if (!siteId || entries.length === 0) {
      setItemsByPath({});
      return;
    }

    const paths = entries.map((entry) => entry.path).filter(Boolean);
    if (paths.length === 0) {
      setItemsByPath({});
      return;
    }

    fetchItemsByPath(siteId, paths, { castAsDetailedItem: true }).subscribe({
      next(items) {
        const nextMap: Record<string, SandboxItem> = {};
        (items as SandboxItem[]).forEach((item) => {
          if (item?.path) {
            nextMap[item.path] = item;
          }
        });
        setItemsByPath(nextMap);
      },
      error() {
        setItemsByPath({});
      }
    });
  }, [pathsKey, siteId]);

  return (
    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider' }}
      >
        <Box sx={{ minWidth: 0, pr: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>{title}</Typography>
          <Typography variant="caption" color="text.secondary">{description}</Typography>
        </Box>
        {onRefresh ? (
          <Tooltip title="Refresh">
            <span>
              <IconButton size="small" aria-label="Refresh" onClick={onRefresh} disabled={loading}>
                <RefreshRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        ) : null}
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ px: 2, py: 2 }}>{error}</Typography>
        ) : entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2 }}>
            Nothing to show in this feed right now.
          </Typography>
        ) : (
          entries.map((entry, index) => {
            const item = itemsByPath[entry.path];
            const label = item?.label ?? entry.label ?? entry.path;
            const selected = selectedPath === entry.path;
            return (
              <React.Fragment key={entry.path}>
                {index > 0 ? <Divider /> : null}
                <ListItemButton
                  selected={selected}
                  onClick={() => onSelect(entry.path, label)}
                  sx={{ alignItems: 'flex-start', py: 1 }}
                >
                  <Box sx={{ mr: 1, mt: 0.25, display: 'flex', '& svg': { fontSize: '1.1rem' } }}>
                    <ItemTypeIcon item={item ?? { path: entry.path, systemType: entry.systemType }} />
                  </Box>
                  <ListItemText
                    primary={label}
                    secondary={entry.subtitle ?? entry.path}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: selected ? 600 : 400 }}
                    secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                  />
                </ListItemButton>
              </React.Fragment>
            );
          })
        )}
      </Box>
    </Box>
  );
}

export default ImageStudioContentFeedPanel;
