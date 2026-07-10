/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_CANVAS_VIEW, cropAreaWithAspect, fullImageCrop, type CropArea, type CanvasViewTransform } from './imageLayout';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import CropRoundedIcon from '@mui/icons-material/CropRounded';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import PhotoSizeSelectLargeRoundedIcon from '@mui/icons-material/PhotoSizeSelectLargeRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { DialogBody, DialogFooter } from '@craftercms/studio-ui';
import { uploadDataUrl } from '@craftercms/studio-ui/services/content';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { updateWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { filter, take } from 'rxjs/operators';
import MyLoadingButton from '../MyLoadingButton';
import ImageStudioEditor from './ImageStudioEditor';
import ImageSizeRequirementsPanel from './ImageSizeRequirementsPanel';
import ImageStudioSaveDialog, { ImageStudioSaveOptions } from './ImageStudioSaveDialog';
import { updateContentImageField } from './imageSizeRequirements';
import ImageStudioWelcome from './ImageStudioWelcome';
import ImageRepoBrowserDialog from './ImageRepoBrowserDialog';
import {
  DEFAULT_ADJUSTMENTS,
  DEFAULT_FOCAL,
  DEFAULT_TEXT_FONT_FAMILY,
  DEFAULT_TEXT_FONT_SIZE,
  DEFAULT_OUTPUT_BACKGROUND,
  DrawTool,
  EditorTool,
  EMPTY_DRAW_STATE,
  ImageAdjustments,
  OutputBackground,
  blobToDataUrl,
  dataUrlToFile,
  focalCropArea,
  formatDimensionSpec,
  getCroppedImageBlob,
  ImageRequirement,
  loadRepoImageAsDataUrl,
  resolveImageConstraints,
  suggestVariantFilename,
  splitStaticAssetPath,
  createImage
} from './imageStudioUtils';

export type ImageStudioProps = {
  defaultPath?: string;
};

type LoadedImage = {
  dataUrl: string;
  name: string;
  sourcePath?: string;
};

const TOOL_OPTIONS: { value: EditorTool; label: string; icon: React.ReactElement }[] = [
  { value: 'crop', label: 'Crop', icon: <CropRoundedIcon fontSize="small" /> },
  { value: 'focal', label: 'Focal', icon: <CenterFocusStrongRoundedIcon fontSize="small" /> },
  { value: 'filters', label: 'Filters', icon: <AutoAwesomeRoundedIcon fontSize="small" /> },
  { value: 'adjust', label: 'Adjust', icon: <TuneRoundedIcon fontSize="small" /> },
  { value: 'draw', label: 'Draw', icon: <BrushRoundedIcon fontSize="small" /> },
  { value: 'resize', label: 'Resize', icon: <PhotoSizeSelectLargeRoundedIcon fontSize="small" /> }
];

export function ImageStudio({ defaultPath = '/static-assets/images' }: ImageStudioProps) {
  const theme = useTheme();
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();
  const guestOrigin = useSelector((state: { preview?: { guest?: { origin?: string } } }) => state.preview?.guest?.origin);
  const isFullScreen = useSelector((state: { dialogs?: { widget?: { isFullScreen?: boolean } } }) =>
    state.dialogs?.widget?.isFullScreen ?? false
  );

  const [mainTab, setMainTab] = useState<'studio' | 'requirements'>('studio');
  const [loaded, setLoaded] = useState<LoadedImage | null>(null);
  const [tool, setTool] = useState<EditorTool>('crop');
  const [adjustments, setAdjustments] = useState(DEFAULT_ADJUSTMENTS);
  const [focal, setFocal] = useState(DEFAULT_FOCAL);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [outputWidth, setOutputWidth] = useState<number | ''>('');
  const [outputHeight, setOutputHeight] = useState<number | ''>('');
  const [lockOutputAspect, setLockOutputAspect] = useState(true);
  const [outputBackground, setOutputBackground] = useState<OutputBackground>(DEFAULT_OUTPUT_BACKGROUND);
  const [saveOpen, setSaveOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [applyingCrop, setApplyingCrop] = useState(false);
  const [filterPresetId, setFilterPresetId] = useState('normal');
  const [drawState, setDrawState] = useState(EMPTY_DRAW_STATE);
  const [drawTool, setDrawTool] = useState<DrawTool>('brush');
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(8);
  const [textFontFamily, setTextFontFamily] = useState(DEFAULT_TEXT_FONT_FAMILY);
  const [textFontSize, setTextFontSize] = useState(DEFAULT_TEXT_FONT_SIZE);
  const [canvasView, setCanvasView] = useState<CanvasViewTransform>(DEFAULT_CANVAS_VIEW);
  const [appliedFieldId, setAppliedFieldId] = useState<string | null>(null);

  const loadRepoImage = useCallback(
    (path: string) => loadRepoImageAsDataUrl(siteId, path, guestOrigin),
    [siteId, guestOrigin]
  );

  const resetEdits = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setFocal(DEFAULT_FOCAL);
    setCroppedAreaPixels(null);
    setAspect(undefined);
    setOutputWidth('');
    setOutputHeight('');
    setOutputBackground(DEFAULT_OUTPUT_BACKGROUND);
    setFilterPresetId('normal');
    setDrawState(EMPTY_DRAW_STATE);
    setDrawTool('brush');
    setBrushColor('#ffffff');
    setBrushSize(8);
    setTextFontFamily(DEFAULT_TEXT_FONT_FAMILY);
    setTextFontSize(DEFAULT_TEXT_FONT_SIZE);
    setCanvasView(DEFAULT_CANVAS_VIEW);
    setAppliedFieldId(null);
  }, []);

  const handleAdjustmentsChange = useCallback((next: ImageAdjustments) => {
    setAdjustments(next);
    setFilterPresetId('custom');
  }, []);

  const handleSelectFilterPreset = useCallback((presetId: string, presetAdjustments: ImageAdjustments) => {
    setFilterPresetId(presetId);
    setAdjustments(presetAdjustments);
  }, []);

  const handleTintChange = useCallback((tintColor: string, tintStrength: number) => {
    setAdjustments((prev) => ({ ...prev, tintColor, tintStrength }));
    setFilterPresetId('custom');
  }, []);

  const handleImageSelected = useCallback((payload: { dataUrl: string; sourcePath?: string; name: string }) => {
    setLoaded(payload);
    resetEdits();
    setMainTab('studio');
    setTool('crop');
  }, [resetEdits]);

  const handleError = useCallback((message: string) => {
    dispatch(showSystemNotification({ message, options: { variant: 'error' } }));
  }, [dispatch]);

  const handleLocalFile = useCallback(async (file: File) => {
    try {
      const dataUrl = await blobToDataUrl(file);
      handleImageSelected({ dataUrl, name: file.name });
    } catch (e) {
      handleError((e as Error).message);
    }
  }, [handleImageSelected, handleError]);

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
  }, [handleImageSelected]);

  const handleApplyConstraints = useCallback(
    async (req: ImageRequirement) => {
      const resolved = resolveImageConstraints(req);
      if (!resolved) {
        handleError('This field has no size constraints to apply.');
        return;
      }

      setAppliedFieldId(req.fieldId);

      if (resolved.outputWidth != null) {
        setOutputWidth(resolved.outputWidth);
      }
      if (resolved.outputHeight != null) {
        setOutputHeight(resolved.outputHeight);
      }
      setLockOutputAspect(true);

      if (resolved.aspect != null) {
        setAspect(resolved.aspect);
        if (loaded) {
          try {
            const img = await createImage(loaded.dataUrl);
            const crop =
              croppedAreaPixels ?? fullImageCrop(img.naturalWidth, img.naturalHeight);
            setCroppedAreaPixels(
              cropAreaWithAspect(crop, resolved.aspect, img.naturalWidth, img.naturalHeight)
            );
          } catch {
            // keep existing crop if image decode fails
          }
        }
      }

      setMainTab('studio');
      setTool('resize');

      dispatch(
        showSystemNotification({
          message: `Applied ${req.fieldTitle}: ${formatDimensionSpec(req)}`,
          options: { variant: 'success' }
        })
      );
    },
    [croppedAreaPixels, dispatch, handleError, loaded]
  );

  const previewDimensions = useMemo(() => {
    if (croppedAreaPixels) {
      return { width: croppedAreaPixels.width, height: croppedAreaPixels.height };
    }
    return null;
  }, [croppedAreaPixels]);

  const resolveCropArea = useCallback(
    async (img: HTMLImageElement): Promise<CropArea> => {
      if (croppedAreaPixels) {
        return croppedAreaPixels;
      }
      if (tool === 'focal') {
        const ratio = aspect ?? img.naturalWidth / img.naturalHeight;
        return focalCropArea(img.naturalWidth, img.naturalHeight, focal, ratio);
      }
      return fullImageCrop(img.naturalWidth, img.naturalHeight);
    },
    [aspect, croppedAreaPixels, focal, tool]
  );

  const handleApplyCrop = useCallback(async () => {
    if (!loaded || !croppedAreaPixels) {
      return;
    }
    setApplyingCrop(true);
    try {
      const img = await createImage(loaded.dataUrl);
      const cropArea = await resolveCropArea(img);
      const blob = await getCroppedImageBlob(
        loaded.dataUrl,
        cropArea,
        DEFAULT_ADJUSTMENTS,
        undefined,
        undefined,
        'image/png',
        0.92,
        EMPTY_DRAW_STATE
      );
      const dataUrl = await blobToDataUrl(blob);
      const cropped = await createImage(dataUrl);
      setLoaded({ ...loaded, dataUrl });
      setCroppedAreaPixels(fullImageCrop(cropped.naturalWidth, cropped.naturalHeight));
      setAspect(undefined);
      setCanvasView(DEFAULT_CANVAS_VIEW);
      dispatch(
        showSystemNotification({
          message: `Crop applied — working image is now ${cropped.naturalWidth} × ${cropped.naturalHeight}px`,
          options: { variant: 'success' }
        })
      );
    } catch (e) {
      handleError(`Apply crop failed: ${(e as Error).message}`);
    } finally {
      setApplyingCrop(false);
    }
  }, [croppedAreaPixels, dispatch, handleError, loaded, resolveCropArea]);

  const handleSave = async (options: ImageStudioSaveOptions) => {
    if (!loaded || !siteId) {
      return;
    }
    setSaving(true);
    try {
      const img = await createImage(loaded.dataUrl);
      const cropArea = await resolveCropArea(img);

      const outW = outputWidth === '' ? undefined : Number(outputWidth);
      const outH = outputHeight === '' ? undefined : Number(outputHeight);

      const targetPath = options.fullPath;
      const { folderPath, fileName } = splitStaticAssetPath(targetPath);
      const mimeType =
        options.mode === 'replace' ? mimeTypeForPath(targetPath) ?? options.mimeType : options.mimeType;
      const ext =
        mimeType === 'image/jpeg' ? '.jpg' : mimeType === 'image/webp' ? '.webp' : '.png';

      const blob = await getCroppedImageBlob(
        loaded.dataUrl,
        cropArea,
        adjustments,
        outW,
        outH,
        mimeType,
        options.quality,
        drawState,
        outputBackground
      );

      const savedDataUrl = await blobToDataUrl(blob);
      const uploadFileName = fileName.endsWith(ext) ? fileName : `${fileName.replace(/\.[^.]+$/, '')}${ext}`;
      const file = dataUrlToFile(savedDataUrl, uploadFileName, mimeType);

      await uploadDataUrl(siteId, file, folderPath, '_csrf')
        .pipe(
          filter((event: { type?: string }) => event.type === 'complete'),
          take(1)
        )
        .toPromise();

      const savedFullPath = `${folderPath}${uploadFileName}`;

      if (options.contentFieldLink && siteId) {
        await updateContentImageField(
          siteId,
          options.contentFieldLink.contentPath,
          options.contentFieldLink.objectId,
          options.contentFieldLink.fieldId,
          savedFullPath
        );
      }

      dispatch(
        showSystemNotification({
          message: options.contentFieldLink
            ? `Image saved and ${options.contentFieldLink.fieldTitle} updated`
            : `Image saved to ${savedFullPath}`,
          options: { variant: 'success' }
        })
      );
      setSaveOpen(false);
      const nextImage = await createImage(savedDataUrl);
      setLoaded({ dataUrl: savedDataUrl, sourcePath: savedFullPath, name: uploadFileName });
      setCroppedAreaPixels(fullImageCrop(nextImage.naturalWidth, nextImage.naturalHeight));
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <DialogBody
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          bgcolor: alpha(theme.palette.background.default, 0.4)
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pt: 1.5,
            pb: 0,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Tabs
              value={mainTab}
              onChange={(_, v) => setMainTab(v)}
              sx={{
                minHeight: 40,
                '& .MuiTab-root': { minHeight: 40, py: 0.5, fontWeight: 500 }
              }}
            >
              <Tab value="studio" label="Editor" />
              <Tab
                value="requirements"
                label="Size requirements"
                icon={<InfoOutlinedIcon sx={{ fontSize: 18 }} />}
                iconPosition="start"
              />
            </Tabs>
            {loaded && mainTab === 'studio' && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Tooltip title={isFullScreen ? 'Exit full screen' : 'Full screen'}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(updateWidgetDialog({ isFullScreen: !isFullScreen }))}
                  >
                    {isFullScreen ? (
                      <FullscreenExitRoundedIcon fontSize="small" />
                    ) : (
                      <FullscreenRoundedIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Load a different image">
                  <IconButton size="small" onClick={() => setBrowseOpen(true)}>
                    <SwapHorizRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </Stack>

          {loaded && mainTab === 'studio' && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              justifyContent="space-between"
              gap={1.5}
              sx={{ pb: 1.5 }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                  {loaded.name}
                </Typography>
                {loaded.sourcePath && (
                  <Typography variant="caption" color="text.secondary" noWrap display="block">
                    {loaded.sourcePath}
                  </Typography>
                )}
              </Box>
              <ToggleButtonGroup
                size="small"
                value={tool}
                exclusive
                onChange={(_, val) => val && setTool(val)}
                sx={{
                  flexWrap: 'wrap',
                  maxWidth: { xs: '100%', sm: 520 },
                  '& .MuiToggleButton-root': {
                    px: 1.5,
                    gap: 0.5,
                    borderRadius: 2,
                    mx: 0.25,
                    border: 0,
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: 'primary.main'
                    }
                  }
                }}
              >
                {TOOL_OPTIONS.map((opt) => (
                  <ToggleButton key={opt.value} value={opt.value}>
                    {opt.icon}
                    {opt.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          )}
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          {mainTab === 'requirements' && (
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', p: 1.5, overflow: 'hidden' }}>
              <ImageSizeRequirementsPanel
                active={mainTab === 'requirements'}
                appliedFieldId={appliedFieldId}
                onApplyConstraints={handleApplyConstraints}
                currentWidth={previewDimensions?.width}
                currentHeight={previewDimensions?.height}
              />
            </Box>
          )}

          {mainTab === 'studio' && !loaded && (
            <ImageStudioWelcome
              onFile={handleLocalFile}
              onBrowseRequest={() => setBrowseOpen(true)}
            />
          )}

          {mainTab === 'studio' && loaded && (
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', px: 1.5, py: 1 }}>
              <ImageStudioEditor
                imageSrc={loaded.dataUrl}
                tool={tool}
                adjustments={adjustments}
                onAdjustmentsChange={handleAdjustmentsChange}
                focal={focal}
                onFocalChange={setFocal}
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
                outputBackground={outputBackground}
                onOutputBackgroundChange={setOutputBackground}
                onReset={resetEdits}
                filterPresetId={filterPresetId}
                onSelectFilterPreset={handleSelectFilterPreset}
                onTintChange={handleTintChange}
                drawState={drawState}
                onDrawStateChange={setDrawState}
                drawTool={drawTool}
                onDrawToolChange={setDrawTool}
                brushColor={brushColor}
                onBrushColorChange={setBrushColor}
                brushSize={brushSize}
                onBrushSizeChange={setBrushSize}
                textFontFamily={textFontFamily}
                onTextFontFamilyChange={setTextFontFamily}
                textFontSize={textFontSize}
                onTextFontSizeChange={setTextFontSize}
                canvasView={canvasView}
                onCanvasViewChange={setCanvasView}
                onApplyCrop={handleApplyCrop}
                applyingCrop={applyingCrop}
              />
            </Box>
          )}
        </Box>
      </DialogBody>

      <Divider />

      <DialogFooter sx={{ px: 2.5, py: 1.5, bgcolor: 'background.paper' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          {loaded && previewDimensions ? (
            <Chip
              size="small"
              variant="outlined"
              label={`${previewDimensions.width} × ${previewDimensions.height}px`}
              sx={{ fontWeight: 500 }}
            />
          ) : (
            <Box />
          )}
          <MyLoadingButton
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            disabled={!loaded}
            loading={saving}
            onClick={() => loaded && setSaveOpen(true)}
          >
            Save image
          </MyLoadingButton>
        </Stack>
      </DialogFooter>

      <ImageRepoBrowserDialog
        open={browseOpen}
        onClose={() => setBrowseOpen(false)}
        defaultPath={defaultPath}
        onImageSelected={handleImageSelected}
        onError={handleError}
        loadRepoImage={loadRepoImage}
      />

      <ImageStudioSaveDialog
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSave={handleSave}
        saving={saving}
        defaultFolder={loaded?.sourcePath ? loaded.sourcePath.substring(0, loaded.sourcePath.lastIndexOf('/')) : defaultPath}
        sourcePath={loaded?.sourcePath}
        suggestedName={suggestedSaveName}
      />
    </Box>
  );
}

function mimeTypeForPath(path: string): string | undefined {
  const ext = path.split('.').pop()?.toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') {
    return 'image/jpeg';
  }
  if (ext === 'webp') {
    return 'image/webp';
  }
  if (ext === 'png') {
    return 'image/png';
  }
  return undefined;
}

export default ImageStudio;
