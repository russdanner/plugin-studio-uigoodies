/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material';
import {
  closePathSelectionDialog,
  pathSelectionDialogClosed,
  showPathSelectionDialog
} from '@craftercms/studio-ui/state/actions/dialogs';
import { batchActions, dispatchDOMEvent } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';
import { suggestVariantFilename } from './imageStudioUtils';

export type SaveMode = 'replace' | 'variant' | 'new';

export type ImageStudioSaveOptions = {
  fullPath: string;
  mode: SaveMode;
  mimeType: string;
  quality: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (options: ImageStudioSaveOptions) => void;
  saving: boolean;
  defaultFolder: string;
  sourcePath?: string | null;
  suggestedName?: string;
};

export function ImageStudioSaveDialog({
  open,
  onClose,
  onSave,
  saving,
  defaultFolder,
  sourcePath,
  suggestedName
}: Props) {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState(defaultFolder);
  const [fileName, setFileName] = useState(suggestedName ?? 'image.png');
  const [mode, setMode] = useState<SaveMode>(sourcePath ? 'variant' : 'new');
  const [mimeType, setMimeType] = useState('image/png');
  const [quality, setQuality] = useState(0.92);

  useEffect(() => {
    if (open) {
      setFolder(defaultFolder);
      setFileName(suggestedName ?? 'image.png');
      setMode(sourcePath ? 'variant' : 'new');
    }
  }, [open, defaultFolder, suggestedName, sourcePath]);

  const fullPath = useMemo(() => {
    const normalizedFolder = folder.replace(/\/$/, '');
    const name = fileName.replace(/^\//, '');
    return `${normalizedFolder}/${name}`;
  }, [folder, fileName]);

  const handleModeChange = (nextMode: SaveMode) => {
    setMode(nextMode);
    if (nextMode === 'replace' && sourcePath) {
      setFolder(sourcePath.substring(0, sourcePath.lastIndexOf('/')));
      setFileName(sourcePath.substring(sourcePath.lastIndexOf('/') + 1));
    } else if (nextMode === 'variant' && sourcePath) {
      const variantPath = suggestVariantFilename(sourcePath);
      setFolder(variantPath.substring(0, variantPath.lastIndexOf('/')));
      setFileName(variantPath.substring(variantPath.lastIndexOf('/') + 1));
    }
  };

  const handleSelectFolder = () => {
    const callbackId = 'ImageStudioSavePathSelection';
    const callbackAccept = 'accept';

    dispatch(
      showPathSelectionDialog({
        rootPath: '/static-assets',
        initialPath: folder,
        showCreateFolderOption: true,
        allowSwitchingRootPath: true,
        stripXmlIndex: true,
        onClosed: batchActions([
          dispatchDOMEvent({ id: callbackId, action: 'close' }),
          pathSelectionDialogClosed()
        ]),
        onOk: batchActions([
          dispatchDOMEvent({ id: callbackId, action: callbackAccept }),
          closePathSelectionDialog()
        ])
      })
    );

    createCustomDocumentEventListener(callbackId, (detail) => {
      if (detail.action === callbackAccept) {
        setFolder(detail.path);
      }
    });
  };

  const handleSubmit = () => {
    onSave({
      fullPath: mode === 'replace' && sourcePath ? sourcePath : fullPath,
      mode,
      mimeType,
      quality
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Save image</DialogTitle>
      <DialogContent>
        {sourcePath && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Save as</Typography>
            <RadioGroup
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as SaveMode)}
            >
              <FormControlLabel value="replace" control={<Radio />} label="Replace original image" />
              <FormControlLabel value="variant" control={<Radio />} label="Save as new variant (recommended)" />
              <FormControlLabel value="new" control={<Radio />} label="Save to a new path" />
            </RadioGroup>
          </Box>
        )}

        {mode !== 'replace' && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
            <TextField
              label="Folder"
              fullWidth
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              helperText="Repository folder under /static-assets"
            />
            <Button variant="outlined" onClick={handleSelectFolder} sx={{ mt: 1, minWidth: 120 }}>
              Browse
            </Button>
          </Box>
        )}

        {mode !== 'replace' && (
          <TextField
            label="File name"
            fullWidth
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Use letters, numbers, dots, dashes, and underscores"
          />
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Format</InputLabel>
          <Select
            label="Format"
            value={mimeType}
            onChange={(e) => setMimeType(e.target.value)}
          >
            <MenuItem value="image/png">PNG (lossless)</MenuItem>
            <MenuItem value="image/jpeg">JPEG</MenuItem>
            <MenuItem value="image/webp">WebP</MenuItem>
          </Select>
        </FormControl>

        {mimeType !== 'image/png' && (
          <TextField
            label="Quality"
            type="number"
            fullWidth
            inputProps={{ min: 0.1, max: 1, step: 0.05 }}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            sx={{ mb: 1 }}
          />
        )}

        <FormHelperText>
          Destination: <strong>{mode === 'replace' && sourcePath ? sourcePath : fullPath}</strong>
        </FormHelperText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={saving || !fileName.trim()}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageStudioSaveDialog;
