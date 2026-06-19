/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Area, Point } from 'react-easy-crop';
import {
  Box,
  Divider,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import CropRoundedIcon from '@mui/icons-material/CropRounded';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import PhotoSizeSelectLargeRoundedIcon from '@mui/icons-material/PhotoSizeSelectLargeRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { DialogBody, DialogFooter } from '@craftercms/studio-ui';
import { uploadDataUrl } from '@craftercms/studio-ui/services/content';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { take } from 'rxjs/operators';
import MyLoadingButton from '../MyLoadingButton';
import ImageSourcePicker from './ImageSourcePicker';
import ImageStudioEditor from './ImageStudioEditor';
import ImageSizeRequirementsPanel from './ImageSizeRequirementsPanel';
import ImageStudioSaveDialog, { ImageStudioSaveOptions } from './ImageStudioSaveDialog';
import {
  DEFAULT_ADJUSTMENTS,
  DEFAULT_FOCAL,
  EditorTool,
  blobToDataUrl,
  dataUrlToFile,
  focalCropArea,
  getCroppedImageBlob,
  loadRepoImageAsDataUrl,
  suggestVariantFilename
} from './imageStudioUtils';

export type ImageStudioProps = {
  defaultPath?: string;
};

type LoadedImage = {
  dataUrl: string;
  name: string;
  sourcePath?: string;
};

export function ImageStudio({ defaultPath = '/static-assets/images' }: ImageStudioProps) {
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();
  const guestOrigin = useSelector((state: { preview?: { guest?: { origin?: string } } }) => state.preview?.guest?.origin);

  const [mainTab, setMainTab] = useState<'studio' | 'requirements'>('studio');
  const [loaded, setLoaded] = useState<LoadedImage | null>(null);
  const [tool, setTool] = useState<EditorTool>('crop');
  const [adjustments, setAdjustments] = useState(DEFAULT_ADJUSTMENTS);
  const [focal, setFocal] = useState(DEFAULT_FOCAL);
  const [cropPosition, setCropPosition] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [outputWidth, setOutputWidth] = useState<number | ''>('');
  const [outputHeight, setOutputHeight] = useState<number | ''>('');
  const [lockOutputAspect, setLockOutputAspect] = useState(true);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadRepoImage = useCallback(
    (path: string) => loadRepoImageAsDataUrl(siteId, path, guestOrigin),
    [siteId, guestOrigin]
  );

  const resetEdits = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setFocal(DEFAULT_FOCAL);
    setCropPosition({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    setAspect(undefined);
    setOutputWidth('');
    setOutputHeight('');
  }, []);

  const handleImageSelected = (payload: { dataUrl: string; sourcePath?: string; name: string }) => {
    setLoaded(payload);
    resetEdits();
    setMainTab('studio');
    setTool('crop');
  };

  const handleError = (message: string) => {
    dispatch(showSystemNotification({ message, options: { variant: 'error' } }));
  };

  // Clipboard paste support
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) {
        return;
      }
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            blobToDataUrl(file).then((dataUrl) => {
              handleImageSelected({ dataUrl, name: file.name || 'pasted-image.png' });
            });
          }
          break;
        }
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, []);

  const openSave = () => {
    if (!loaded) {
      return;
    }
    setSaveOpen(true);
  };
  const previewDimensions = useMemo(() => {
    if (croppedAreaPixels) {
      return { width: croppedAreaPixels.width, height: croppedAreaPixels.height };
    }
    return null;
  }, [croppedAreaPixels]);

  const handleSave = async (options: ImageStudioSaveOptions) => {
    if (!loaded || !siteId) {
      return;
    }
    setSaving(true);
    try {
      let cropArea = croppedAreaPixels;
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = loaded.dataUrl;
      });

      if (!cropArea) {
        cropArea = {
          x: 0,
          y: 0,
          width: img.naturalWidth,
          height: img.naturalHeight
        };
      }

      if (tool === 'focal') {
        const ratio = aspect ?? img.naturalWidth / img.naturalHeight;
        cropArea = focalCropArea(img.naturalWidth, img.naturalHeight, focal, ratio);
      }

      const outW = outputWidth === '' ? undefined : Number(outputWidth);
      const outH = outputHeight === '' ? undefined : Number(outputHeight);

      const blob = await getCroppedImageBlob(
        loaded.dataUrl,
        cropArea,
        adjustments,
        outW,
        outH,
        options.mimeType,
        options.quality
      );

      const ext =
        options.mimeType === 'image/jpeg'
          ? '.jpg'
          : options.mimeType === 'image/webp'
            ? '.webp'
            : '.png';
      const targetPath = options.fullPath;
      const fileName = targetPath.substring(targetPath.lastIndexOf('/') + 1);
      const savedDataUrl = await blobToDataUrl(blob);
      const file = dataUrlToFile(
        savedDataUrl,
        fileName.endsWith(ext) ? fileName : `${fileName.replace(/\.[^.]+$/, '')}${ext}`,
        options.mimeType
      );

      await uploadDataUrl(siteId, file, targetPath, '_csrf').pipe(take(1)).toPromise();

      dispatch(
        showSystemNotification({
          message: `Image saved to ${targetPath}`,
          options: { variant: 'success' }
        })
      );
      setSaveOpen(false);
      if (options.mode === 'replace') {
        setLoaded({ ...loaded, sourcePath: targetPath, name: fileName });
      } else {
        setLoaded({ dataUrl: savedDataUrl, sourcePath: targetPath, name: file.name });
      }
    } catch (e) {
      handleError(`Save failed: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const suggestedSaveName = loaded
    ? loaded.sourcePath
      ? suggestVariantFilename(loaded.sourcePath).split('/').pop() ?? loaded.name
      : loaded.name
    : 'image.png';

  return (
    <>
      <DialogBody sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 480 }}>
        <Tabs value={mainTab} onChange={(_, v) => setMainTab(v)} sx={{ mb: 2 }}>
          <Tab value="studio" label="Image Studio" />
          <Tab value="requirements" label="Size requirements" />
        </Tabs>

        {mainTab === 'requirements' && (
          <ImageSizeRequirementsPanel
            currentWidth={previewDimensions?.width}
            currentHeight={previewDimensions?.height}
          />
        )}

        {mainTab === 'studio' && (
          <Box sx={{ display: 'flex', gap: 2, flex: 1, minHeight: 0, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <ImageSourcePicker
              defaultPath={defaultPath}
              onImageSelected={handleImageSelected}
              onError={handleError}
              loadRepoImage={loadRepoImage}
            />

            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {!loaded ? (
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 4
                  }}
                >
                  <Typography color="text.secondary" align="center">
                    Select an existing image, drag one in, paste from clipboard, or upload to start editing.
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle1">{loaded.name}</Typography>
                      {loaded.sourcePath && (
                        <Typography variant="caption" color="text.secondary">{loaded.sourcePath}</Typography>
                      )}
                    </Box>
                    <ToggleButtonGroup
                      size="small"
                      value={tool}
                      exclusive
                      onChange={(_, val) => val && setTool(val)}
                    >
                      <ToggleButton value="crop">
                        <CropRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Crop
                      </ToggleButton>
                      <ToggleButton value="focal">
                        <CenterFocusStrongRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Focal
                      </ToggleButton>
                      <ToggleButton value="adjust">
                        <TuneRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Adjust
                      </ToggleButton>
                      <ToggleButton value="resize">
                        <PhotoSizeSelectLargeRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Resize
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  <ImageStudioEditor
                    imageSrc={loaded.dataUrl}
                    tool={tool}
                    adjustments={adjustments}
                    onAdjustmentsChange={setAdjustments}
                    focal={focal}
                    onFocalChange={setFocal}
                    cropPosition={cropPosition}
                    onCropPositionChange={setCropPosition}
                    croppedAreaPixels={croppedAreaPixels}
                    onCroppedAreaPixelsChange={setCroppedAreaPixels}
                    aspect={aspect}
                    onAspectChange={setAspect}
                    outputWidth={outputWidth}
                    outputHeight={outputHeight}
                    onOutputWidthChange={setOutputWidth}
                    onOutputHeightChange={setOutputHeight}
                    lockOutputAspect={lockOutputAspect}
                    onLockOutputAspectChange={setLockOutputAspect}
                    onReset={resetEdits}
                  />
                </>
              )}
            </Box>
          </Box>
        )}
      </DialogBody>

      <Divider />

      <DialogFooter>
        <MyLoadingButton
          variant="contained"
          startIcon={<SaveRoundedIcon />}
          disabled={!loaded}
          loading={saving}
          onClick={openSave}
        >
          Save image…
        </MyLoadingButton>
      </DialogFooter>

      <ImageStudioSaveDialog
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSave={handleSave}
        saving={saving}
        defaultFolder={loaded?.sourcePath ? loaded.sourcePath.substring(0, loaded.sourcePath.lastIndexOf('/')) : defaultPath}
        sourcePath={loaded?.sourcePath}
        suggestedName={suggestedSaveName}
      />
    </>
  );
}

export default ImageStudio;
