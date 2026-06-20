/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { fetchChildrenByPath } from '@craftercms/studio-ui/services/content';
import { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultPath: string;
  onImageSelected: (payload: { dataUrl: string; sourcePath: string; name: string }) => void;
  onError: (message: string) => void;
  loadRepoImage: (path: string) => Promise<string>;
};

function isImageAsset(item: SandboxItem): boolean {
  return item.systemType === 'asset' && item.mimeType?.startsWith('image/');
}

function pathSegments(path: string): string[] {
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
  const segments: string[] = [];
  let current = '';
  for (const part of parts) {
    current += `/${part}`;
    segments.push(current);
  }
  return segments;
}

export function ImageRepoBrowserDialog({
  open,
  onClose,
  defaultPath,
  onImageSelected,
  onError,
  loadRepoImage
}: Props) {
  const siteId = useActiveSiteId();
  const [browsePath, setBrowsePath] = useState(defaultPath);
  const [items, setItems] = useState<SandboxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const loadFolder = useCallback(
    async (path: string) => {
      if (!siteId) {
        return;
      }
      setLoading(true);
      try {
        const response = await firstValueFrom(fetchChildrenByPath(siteId, path, { limit: 200 }).pipe(take(1)));
        const list: SandboxItem[] = [];
        if (response) {
          for (let i = 0; i < response.length; i++) {
            const item = response[i];
            if (item?.path) {
              list.push(item);
            }
          }
        }
        setItems(list);
        setBrowsePath(path);
      } catch (e) {
        onError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [siteId, onError]
  );

  useEffect(() => {
    if (open) {
      setBrowsePath(defaultPath);
      loadFolder(defaultPath);
    }
  }, [open, defaultPath, loadFolder]);

  const folders = useMemo(() => items.filter((item) => item.systemType === 'folder'), [items]);
  const images = useMemo(() => items.filter(isImageAsset), [items]);
  const crumbs = useMemo(() => pathSegments(browsePath), [browsePath]);

  const openRepoImage = async (path: string, name: string) => {
    setLoadingImage(true);
    try {
      const dataUrl = await loadRepoImage(path);
      onImageSelected({ dataUrl, sourcePath: path, name });
      onClose();
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography variant="h6" component="span">Browse images</Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <Breadcrumbs sx={{ mb: 1.5, flexWrap: 'wrap' }}>
          {crumbs.map((segment, index) => {
            const label = segment.split('/').pop() || '/';
            const isLast = index === crumbs.length - 1;
            return isLast ? (
              <Typography key={segment} variant="body2" color="text.primary">{label}</Typography>
            ) : (
              <Link
                key={segment}
                component="button"
                variant="body2"
                underline="hover"
                onClick={() => loadFolder(segment)}
              >
                {label}
              </Link>
            );
          })}
        </Breadcrumbs>

        <TextField
          size="small"
          fullWidth
          label="Folder path"
          value={browsePath}
          onChange={(e) => setBrowsePath(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              loadFolder(browsePath);
            }
          }}
          sx={{ mb: 1.5 }}
        />

        <Box sx={{ position: 'relative', minHeight: 280, maxHeight: 360, overflow: 'auto', borderRadius: 1, bgcolor: 'action.hover' }}>
          {(loading || loadingImage) && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255,255,255,0.6)',
                zIndex: 1
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}
          <List dense disablePadding>
            {folders.map((folder) => (
              <ListItemButton key={folder.path} onClick={() => loadFolder(folder.path)}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <FolderRoundedIcon fontSize="small" color="action" />
                </ListItemIcon>
                <ListItemText primary={folder.label || folder.path.split('/').pop()} />
              </ListItemButton>
            ))}
            {images.map((image) => (
              <ListItemButton
                key={image.path}
                onClick={() =>
                  openRepoImage(image.path, image.label || image.path.split('/').pop() || image.path)
                }
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ImageRoundedIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={image.label || image.path.split('/').pop()}
                  secondary={image.path}
                  secondaryTypographyProps={{ noWrap: true }}
                />
              </ListItemButton>
            ))}
            {!loading && !folders.length && !images.length && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">No images in this folder.</Typography>
              </Box>
            )}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ImageRepoBrowserDialog;
