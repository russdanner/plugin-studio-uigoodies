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
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';
import { fetchChildrenByPath } from '@craftercms/studio-ui/services/content';
import { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { take } from 'rxjs/operators';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

type Props = {
  defaultPath: string;
  onImageSelected: (payload: { dataUrl: string; sourcePath?: string; name: string }) => void;
  onError: (message: string) => void;
  loadRepoImage: (path: string) => Promise<string>;
};

function isImageAsset(item: SandboxItem): boolean {
  return item.systemType === 'asset' && item.mimeType?.startsWith('image/');
}

export function ImageSourcePicker({ defaultPath, onImageSelected, onError, loadRepoImage }: Props) {
  const siteId = useActiveSiteId();
  const [browsePath, setBrowsePath] = useState(defaultPath);
  const [items, setItems] = useState<SandboxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadFolder = useCallback(
    async (path: string) => {
      if (!siteId) {
        return;
      }
      setLoading(true);
      try {
        const response = await fetchChildrenByPath(siteId, path, { limit: 200 }).pipe(take(1)).toPromise();
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
    loadFolder(defaultPath);
  }, [defaultPath, loadFolder]);

  const folders = useMemo(() => items.filter((item) => item.systemType === 'folder'), [items]);
  const images = useMemo(() => items.filter(isImageAsset), [items]);

  const handleLocalFile = async (file: File) => {
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      onImageSelected({ dataUrl, name: file.name });
    } catch (e) {
      onError((e as Error).message);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleLocalFile(file);
    }
  };

  const openRepoImage = async (path: string, name: string) => {
    setLoading(true);
    try {
      const dataUrl = await loadRepoImage(path);
      onImageSelected({ dataUrl, sourcePath: path, name });
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 280 }}>
      <Paper
        variant="outlined"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        sx={{
          p: 2,
          textAlign: 'center',
          borderStyle: 'dashed',
          borderColor: dragOver ? 'primary.main' : 'divider',
          bgcolor: dragOver ? 'action.hover' : 'background.paper'
        }}
      >
        <UploadFileRoundedIcon color="action" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="body2" gutterBottom>
          Drag an image here, paste from clipboard, or upload
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
          <Button size="small" variant="outlined" onClick={() => fileInputRef.current?.click()}>
            Upload file
          </Button>
        </Box>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleLocalFile(file);
            }
            e.target.value = '';
          }}
        />
      </Paper>

      <Box>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <ImageSearchRoundedIcon fontSize="small" />
          Browse repository
        </Typography>
        <TextField
          size="small"
          fullWidth
          label="Folder"
          value={browsePath}
          onChange={(e) => setBrowsePath(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              loadFolder(browsePath);
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={() => loadFolder(browsePath)} title="Open folder">
                <FolderOpenRoundedIcon fontSize="small" />
              </IconButton>
            )
          }}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <List dense sx={{ maxHeight: 220, overflow: 'auto', mt: 1 }}>
            {folders.map((folder) => (
              <ListItemButton key={folder.path} onClick={() => loadFolder(folder.path)}>
                <ListItemText primary={folder.label || folder.path.split('/').pop()} secondary="Folder" />
              </ListItemButton>
            ))}
            {images.map((image) => (
              <ListItemButton key={image.path} onClick={() => openRepoImage(image.path, image.label || image.path)}>
                <ListItemText primary={image.label || image.path.split('/').pop()} secondary={image.path} />
              </ListItemButton>
            ))}
            {!folders.length && !images.length && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                No subfolders or images in this folder.
              </Typography>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default ImageSourcePicker;
