/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { fetchChildrenByPath } from '@craftercms/studio-ui/services/content';
import { search } from '@craftercms/studio-ui/services/search';
import { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { SearchItem } from '@craftercms/studio-ui/models/Search';
import { take } from 'rxjs/operators';
import { firstValueFrom, Subscription } from 'rxjs';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultPath: string;
  guestOrigin?: string;
  onImageSelected: (payload: { dataUrl: string; sourcePath: string; name: string }) => void;
  onError: (message: string) => void;
  loadRepoImage: (path: string) => Promise<string>;
};

type BrowseImage = {
  path: string;
  label?: string;
  name?: string;
  previewUrl?: string;
  mimeType?: string;
};

const IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
  'image/x-icon',
  'image/vnd.microsoft.icon'
];

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i;

function isImageAsset(item: SandboxItem): boolean {
  if (item.mimeType?.startsWith('image/')) {
    return true;
  }
  if (item.systemType === 'asset' && IMAGE_EXT_RE.test(item.path || '')) {
    return true;
  }
  return IMAGE_EXT_RE.test(item.path || '');
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

function itemName(item: BrowseImage | SandboxItem): string {
  if ('label' in item && item.label) {
    return item.label;
  }
  if ('name' in item && item.name) {
    return item.name;
  }
  return item.path.split('/').pop() || item.path;
}

function matchesNameQuery(item: BrowseImage | SandboxItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }
  const name = itemName(item).toLowerCase();
  const path = (item.path || '').toLowerCase();
  return name.includes(q) || path.includes(q);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** OpenSearch path filter: everything under the folder (recursive). */
function recursivePathFilter(folderPath: string): string {
  const normalized = folderPath.replace(/\/+$/, '') || '/';
  return `${escapeRegex(normalized)}/.*`;
}

function previewSrc(item: BrowseImage, guestOrigin?: string): string | undefined {
  if (item.previewUrl) {
    return item.previewUrl;
  }
  if (guestOrigin && item.path) {
    return `${guestOrigin.replace(/\/$/, '')}${item.path.startsWith('/') ? item.path : `/${item.path}`}`;
  }
  return item.path || undefined;
}

function searchItemToBrowseImage(item: SearchItem): BrowseImage {
  return {
    path: item.path,
    name: item.name,
    label: item.name,
    previewUrl: item.previewUrl,
    mimeType: item.mimeType
  };
}

function ImageThumb({
  item,
  guestOrigin
}: {
  item: BrowseImage;
  guestOrigin?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = previewSrc(item, guestOrigin);

  if (!src || failed) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.selected'
        }}
      >
        <ImageRoundedIcon color="primary" />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={itemName(item)}
      loading="lazy"
      onError={() => setFailed(true)}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }}
    />
  );
}

export function ImageRepoBrowserDialog({
  open,
  onClose,
  defaultPath,
  guestOrigin,
  onImageSelected,
  onError,
  loadRepoImage
}: Props) {
  const siteId = useActiveSiteId();
  const [browsePath, setBrowsePath] = useState(defaultPath);
  const [nameQuery, setNameQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [items, setItems] = useState<SandboxItem[]>([]);
  const [searchImages, setSearchImages] = useState<BrowseImage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const searchSubRef = useRef<Subscription | null>(null);
  const wasOpenRef = useRef(false);

  const loadFolder = useCallback(async (path: string) => {
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
      onErrorRef.current((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  // Reset only when the dialog opens (not when loadFolder identity changes).
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setBrowsePath(defaultPath);
      setNameQuery('');
      setDebouncedQuery('');
      setSearchImages(null);
      loadFolder(defaultPath);
    }
    wasOpenRef.current = open;
  }, [open, defaultPath, loadFolder]);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebouncedQuery(nameQuery.trim()), 350);
    return () => window.clearTimeout(handle);
  }, [nameQuery]);

  // Recursive site search when the user types a name (scoped under the current browse folder).
  useEffect(() => {
    searchSubRef.current?.unsubscribe();
    searchSubRef.current = null;

    if (!open || !siteId || !debouncedQuery) {
      setSearchImages(null);
      setSearching(false);
      return;
    }

    setSearching(true);
    const sub = search(siteId, {
      keywords: debouncedQuery,
      path: recursivePathFilter(browsePath),
      offset: 0,
      limit: 60,
      sortBy: '_score',
      sortOrder: 'desc',
      filters: {
        'mime-type': IMAGE_MIME_TYPES
      }
    }).subscribe({
      next(result) {
        const found = (result?.items ?? [])
          .filter((item) => item?.path && (item.mimeType?.startsWith('image/') || IMAGE_EXT_RE.test(item.path)))
          .map(searchItemToBrowseImage);
        setSearchImages(found);
        setSearching(false);
      },
      error(e) {
        setSearchImages([]);
        setSearching(false);
        onErrorRef.current((e as Error)?.message || 'Image search failed');
      }
    });
    searchSubRef.current = sub;
    return () => {
      sub.unsubscribe();
    };
  }, [open, siteId, debouncedQuery, browsePath]);

  const isSearching = Boolean(debouncedQuery);
  const folders = useMemo(
    () =>
      isSearching
        ? []
        : items.filter((item) => item.systemType === 'folder' && matchesNameQuery(item, nameQuery)),
    [items, nameQuery, isSearching]
  );
  const folderImages = useMemo(
    () =>
      items
        .filter((item) => isImageAsset(item) && matchesNameQuery(item, nameQuery))
        .map(
          (item): BrowseImage => ({
            path: item.path,
            label: item.label,
            previewUrl: item.previewUrl,
            mimeType: item.mimeType
          })
        ),
    [items, nameQuery]
  );
  const images = isSearching ? searchImages ?? [] : folderImages;
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                onClick={() => {
                  setNameQuery('');
                  setDebouncedQuery('');
                  loadFolder(segment);
                }}
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
              setNameQuery('');
              setDebouncedQuery('');
              loadFolder(browsePath);
            }
          }}
          sx={{ mb: 1.5 }}
        />

        <TextField
          size="small"
          fullWidth
          label="Search by name"
          placeholder="Find images under this folder by filename…"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          sx={{ mb: 1.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
            endAdornment: nameQuery ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="Clear name search" onClick={() => setNameQuery('')} edge="end">
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined
          }}
          helperText={
            isSearching
              ? `Searching under ${browsePath}…`
              : 'Leave empty to browse this folder. Type a name to search nested folders.'
          }
        />

        <Box sx={{ position: 'relative', minHeight: 320, maxHeight: 440, overflow: 'auto', borderRadius: 1, bgcolor: 'action.hover', p: 1 }}>
          {(loading || searching || loadingImage) && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.6)',
                zIndex: 1
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}

          {folders.length > 0 && (
            <List dense disablePadding sx={{ mb: images.length ? 1 : 0 }}>
              {folders.map((folder) => (
                <ListItemButton key={folder.path} onClick={() => loadFolder(folder.path)} sx={{ borderRadius: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <FolderRoundedIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText primary={itemName(folder)} />
                </ListItemButton>
              ))}
            </List>
          )}

          {images.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
                gap: 1
              }}
            >
              {images.map((image) => {
                const name = itemName(image);
                return (
                  <Box
                    key={image.path}
                    component="button"
                    type="button"
                    onClick={() => openRepoImage(image.path, name)}
                    title={image.path}
                    sx={{
                      appearance: 'none',
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 0,
                      m: 0,
                      bgcolor: 'background.paper',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textAlign: 'left',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1
                      }
                    }}
                  >
                    <Box sx={{ width: '100%', aspectRatio: '1 / 1', bgcolor: 'action.hover' }}>
                      <ImageThumb item={image} guestOrigin={guestOrigin} />
                    </Box>
                    <Box sx={{ px: 1, py: 0.75 }}>
                      <Typography variant="caption" noWrap display="block" fontWeight={600}>
                        {name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap display="block">
                        {image.path}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {!loading && !searching && !folders.length && !images.length && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {isSearching ? 'No matching images found.' : 'No images in this folder.'}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ImageRepoBrowserDialog;
