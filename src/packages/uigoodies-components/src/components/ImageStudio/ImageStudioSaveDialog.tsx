/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
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
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { suggestVariantFilename } from './imageStudioUtils';
import ImageStudioContentPickerDialog, { ContentPickerSelection } from './ImageStudioContentPickerDialog';
import {
  ImagePickerFieldOption,
  loadImagePickerFieldsForContent
} from './imageSizeRequirements';

export type SaveMode = 'replace' | 'variant' | 'new';

export type ContentFieldLink = {
  contentPath: string;
  objectId: string;
  fieldId: string;
  fieldTitle: string;
};

export type ImageStudioSaveOptions = {
  fullPath: string;
  mode: SaveMode;
  mimeType: string;
  quality: number;
  contentFieldLink?: ContentFieldLink | null;
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
  const siteId = useActiveSiteId();
  const [folder, setFolder] = useState(defaultFolder);
  const [fileName, setFileName] = useState(suggestedName ?? 'image.png');
  const [mode, setMode] = useState<SaveMode>(sourcePath ? 'variant' : 'new');
  const [mimeType, setMimeType] = useState('image/png');
  const [quality, setQuality] = useState(0.92);
  const [linkEnabled, setLinkEnabled] = useState(false);
  const [contentPickerOpen, setContentPickerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentPickerSelection | null>(null);
  const [imageFields, setImageFields] = useState<ImagePickerFieldOption[]>([]);
  const [fieldsLoading, setFieldsLoading] = useState(false);
  const [fieldsError, setFieldsError] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<ImagePickerFieldOption | null>(null);
  const [contentObjectId, setContentObjectId] = useState('');

  useEffect(() => {
    if (open) {
      setFolder(defaultFolder);
      setFileName(suggestedName ?? 'image.png');
      setMode(sourcePath ? 'variant' : 'new');
      setLinkEnabled(false);
      setContentPickerOpen(false);
      setSelectedContent(null);
      setImageFields([]);
      setSelectedField(null);
      setContentObjectId('');
      setFieldsError(null);
    }
  }, [open, defaultFolder, suggestedName, sourcePath]);

  useEffect(() => {
    if (!open || !linkEnabled || !siteId || !selectedContent) {
      setImageFields([]);
      setSelectedField(null);
      setContentObjectId('');
      setFieldsError(null);
      return;
    }
    let cancelled = false;
    setFieldsLoading(true);
    setFieldsError(null);
    loadImagePickerFieldsForContent(siteId, selectedContent.path)
      .then((result) => {
        if (!cancelled) {
          setImageFields(result.fields);
          setContentObjectId(result.objectId);
          setSelectedField(result.fields[0] ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setImageFields([]);
          setSelectedField(null);
          setContentObjectId('');
          setFieldsError('Unable to load image fields for this content item.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setFieldsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, linkEnabled, siteId, selectedContent]);

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

  const contentFieldLink: ContentFieldLink | null =
    linkEnabled && selectedContent && selectedField && contentObjectId
      ? {
          contentPath: selectedContent.path,
          objectId: contentObjectId,
          fieldId: selectedField.fieldId,
          fieldTitle: selectedField.fieldTitle
        }
      : null;

  const handleSubmit = () => {
    onSave({
      fullPath: mode === 'replace' && sourcePath ? sourcePath : fullPath,
      mode,
      mimeType,
      quality,
      contentFieldLink
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Save image</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sourcePath && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>Save as</Typography>
            <RadioGroup value={mode} onChange={(e) => handleModeChange(e.target.value as SaveMode)}>
              <FormControlLabel value="replace" control={<Radio />} label="Replace original image" />
              <FormControlLabel value="variant" control={<Radio />} label="Save as new variant (recommended)" />
              <FormControlLabel value="new" control={<Radio />} label="Save to a new path" />
            </RadioGroup>
          </Box>
        )}

        {mode !== 'replace' && (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <TextField
              label="Folder"
              fullWidth
              size="small"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              helperText="Repository folder under /static-assets"
            />
            <Button variant="outlined" onClick={handleSelectFolder} sx={{ mt: 1, minWidth: 100 }}>
              Browse
            </Button>
          </Stack>
        )}

        {mode !== 'replace' && (
          <TextField
            label="File name"
            fullWidth
            size="small"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            helperText="Use letters, numbers, dots, dashes, and underscores"
          />
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Format</InputLabel>
            <Select label="Format" value={mimeType} onChange={(e) => setMimeType(e.target.value)}>
              <MenuItem value="image/png">PNG (lossless)</MenuItem>
              <MenuItem value="image/jpeg">JPEG</MenuItem>
              <MenuItem value="image/webp">WebP</MenuItem>
            </Select>
          </FormControl>
          {mimeType !== 'image/png' && (
            <TextField
              label="Quality"
              type="number"
              size="small"
              fullWidth
              inputProps={{ min: 0.1, max: 1, step: 0.05 }}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />
          )}
        </Stack>

        <FormHelperText sx={{ mt: 0 }}>
          Destination: <strong>{mode === 'replace' && sourcePath ? sourcePath : fullPath}</strong>
        </FormHelperText>

        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox checked={linkEnabled} onChange={(e) => setLinkEnabled(e.target.checked)} />
            }
            label="Update a content item image field after save"
          />
          <Collapse in={linkEnabled}>
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                <Button variant="outlined" size="small" onClick={() => setContentPickerOpen(true)}>
                  {selectedContent ? 'Change content…' : 'Choose content…'}
                </Button>
                {selectedContent ? (
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" noWrap fontWeight={500}>
                      {selectedContent.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                      {selectedContent.path}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Browse, pick recent or unpublished items, or search
                  </Typography>
                )}
              </Stack>
              {selectedContent && (
                <FormControl fullWidth size="small" disabled={fieldsLoading || !imageFields.length}>
                  <InputLabel>Image field</InputLabel>
                  <Select
                    label="Image field"
                    value={selectedField?.fieldId ?? ''}
                    onChange={(e) => {
                      const field = imageFields.find((f) => f.fieldId === e.target.value);
                      setSelectedField(field ?? null);
                    }}
                  >
                    {imageFields.map((field) => (
                      <MenuItem key={field.fieldId} value={field.fieldId}>
                        {field.fieldTitle} ({field.fieldId})
                      </MenuItem>
                    ))}
                  </Select>
                  {!fieldsLoading && fieldsError && (
                    <FormHelperText error>{fieldsError}</FormHelperText>
                  )}
                  {!fieldsLoading && !fieldsError && imageFields.length === 0 && (
                    <FormHelperText>No image-picker fields on this content type.</FormHelperText>
                  )}
                  {fieldsLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                      <CircularProgress size={16} />
                      <Typography variant="caption" color="text.secondary">Loading fields…</Typography>
                    </Box>
                  ) : null}
                </FormControl>
              )}
            </Stack>
          </Collapse>
        </Box>
      </DialogContent>
      <ImageStudioContentPickerDialog
        open={contentPickerOpen}
        onClose={() => setContentPickerOpen(false)}
        initialPath={selectedContent?.path}
        onSelect={(selection) => {
          setSelectedContent(selection);
          setContentPickerOpen(false);
        }}
      />
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={saving || !fileName.trim()}>
          {saving ? 'Saving…' : linkEnabled && contentFieldLink ? 'Save & update content' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageStudioSaveDialog;
