/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, Typography, alpha, useTheme } from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';

type Props = {
  onFile: (file: File) => void;
  onBrowseRequest: () => void;
};

export function ImageStudioWelcome({ onFile, onBrowseRequest }: Props) {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) {
        return;
      }
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            onFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFile]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) {
      onFile(file);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        minHeight: 420
      }}
    >
      <Box
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        sx={{
          width: '100%',
          maxWidth: 520,
          textAlign: 'center',
          p: 4,
          borderRadius: 3,
          border: `2px dashed ${dragOver ? theme.palette.primary.main : alpha(theme.palette.divider, 0.9)}`,
          bgcolor: dragOver ? alpha(theme.palette.primary.main, 0.06) : alpha(theme.palette.background.paper, 0.8),
          transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
          boxShadow: dragOver ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}` : 'none'
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: 'auto',
            mb: 2,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: 'primary.main'
          }}
        >
          <CloudUploadRoundedIcon sx={{ fontSize: 36 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Start with an image
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Drag and drop here, or choose an option below
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<CloudUploadRoundedIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload file
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<PhotoLibraryRoundedIcon />}
            onClick={onBrowseRequest}
          >
            Browse repository
          </Button>
        </Stack>

        <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="center">
          <ContentPasteRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            You can also paste an image from your clipboard
          </Typography>
        </Stack>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFile(file);
            }
            e.target.value = '';
          }}
        />
      </Box>
    </Box>
  );
}

export default ImageStudioWelcome;
