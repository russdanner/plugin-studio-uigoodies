/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  IconButton,
  Paper,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
  alpha,
  ToggleButton,
  ToggleButtonGroup,
  useTheme
} from '@mui/material';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import FlipRoundedIcon from '@mui/icons-material/FlipRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import type { CropArea, CanvasViewTransform } from './imageLayout';
import {
  buildCssFilter,
  DrawState,
  DrawTool,
  EditorTool,
  FOCAL_PREVIEW_RATIOS,
  FocalPoint,
  ImageAdjustments,
  clampFocal,
  focalCropArea,
  OUTPUT_BACKGROUND_SWATCHES,
  OutputBackground
} from './imageStudioUtils';
import ImageStudioFiltersPanel from './ImageStudioFiltersPanel';
import ImageStudioDrawCanvas from './ImageStudioDrawCanvas';
import ImageStudioCropCanvas from './ImageStudioCropCanvas';

type Props = {
  imageSrc: string;
  tool: EditorTool;
  adjustments: ImageAdjustments;
  onAdjustmentsChange: (next: ImageAdjustments) => void;
  focal: FocalPoint;
  onFocalChange: (next: FocalPoint) => void;
  croppedAreaPixels: CropArea | null;
  onCroppedAreaPixelsChange: (next: CropArea | null) => void;
  aspect: number | undefined;
  onAspectChange: (next: number | undefined) => void;
  outputWidth: number | '';
  outputHeight: number | '';
  onOutputWidthChange: (v: number | '') => void;
  onOutputHeightChange: (v: number | '') => void;
  lockOutputAspect: boolean;
  onLockOutputAspectChange: (v: boolean) => void;
  outputBackground: OutputBackground;
  onOutputBackgroundChange: (next: OutputBackground) => void;
  onReset: () => void;
  filterPresetId: string;
  onSelectFilterPreset: (presetId: string, adjustments: ImageAdjustments) => void;
  onTintChange: (tintColor: string, tintStrength: number) => void;
  drawState: DrawState;
  onDrawStateChange: (next: DrawState) => void;
  drawTool: DrawTool;
  onDrawToolChange: (tool: DrawTool) => void;
  brushColor: string;
  onBrushColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  textFontFamily: string;
  onTextFontFamilyChange: (family: string) => void;
  textFontSize: number;
  onTextFontSizeChange: (size: number) => void;
  canvasView: CanvasViewTransform;
  onCanvasViewChange: (view: CanvasViewTransform) => void;
  onApplyCrop?: () => void;
  applyingCrop?: boolean;
};

export function ImageStudioEditor({
  imageSrc,
  tool,
  adjustments,
  onAdjustmentsChange,
  focal,
  onFocalChange,
  croppedAreaPixels,
  onCroppedAreaPixelsChange,
  aspect,
  onAspectChange,
  outputWidth,
  outputHeight,
  onOutputWidthChange,
  onOutputHeightChange,
  lockOutputAspect,
  onLockOutputAspectChange,
  outputBackground,
  onOutputBackgroundChange,
  onReset,
  filterPresetId,
  onSelectFilterPreset,
  onTintChange,
  drawState,
  onDrawStateChange,
  drawTool,
  onDrawToolChange,
  brushColor,
  onBrushColorChange,
  brushSize,
  onBrushSizeChange,
  textFontFamily,
  onTextFontFamilyChange,
  textFontSize,
  onTextFontSizeChange,
  canvasView,
  onCanvasViewChange,
  onApplyCrop,
  applyingCrop
}: Props) {
  const theme = useTheme();
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = imageSrc;
  }, [imageSrc]);

  const focalPreviews = useMemo(() => {
    if (!naturalSize.width || !naturalSize.height) {
      return [];
    }
    return FOCAL_PREVIEW_RATIOS.map((preset) => ({
      ...preset,
      area: focalCropArea(naturalSize.width, naturalSize.height, focal, preset.ratio)
    }));
  }, [naturalSize, focal]);

  const handleFocalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onFocalChange(clampFocal({ x, y }));
  };

  const rotate = (delta: number) => {
    onAdjustmentsChange({
      ...adjustments,
      rotation: (adjustments.rotation + delta) % 360
    });
  };

  const canvasBg = '#141414';
  const showSidePanel = tool === 'adjust' || tool === 'resize';
  const previewFilter = buildCssFilter(adjustments);

  const cropW = croppedAreaPixels?.width ?? naturalSize.width;
  const cropH = croppedAreaPixels?.height ?? naturalSize.height;
  const outW = outputWidth === '' ? 0 : Number(outputWidth);
  const outH = outputHeight === '' ? 0 : Number(outputHeight);
  const outputSizeDiffers = outW > 0 && outH > 0 && cropW > 0 && cropH > 0 && (outW !== cropW || outH !== cropH);

  if (tool === 'filters') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <ImageStudioFiltersPanel
          imageSrc={imageSrc}
          activePresetId={filterPresetId}
          adjustments={adjustments}
          onSelectPreset={onSelectFilterPreset}
          onTintChange={onTintChange}
        />
      </Box>
    );
  }

  if (tool === 'crop') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <ImageStudioCropCanvas
          imageSrc={imageSrc}
          cropArea={croppedAreaPixels}
          onCropAreaChange={onCroppedAreaPixelsChange}
          aspect={aspect}
          onAspectChange={onAspectChange}
          canvasView={canvasView}
          onCanvasViewChange={onCanvasViewChange}
          onApplyCrop={onApplyCrop}
          applyingCrop={applyingCrop}
        />
      </Box>
    );
  }

  if (tool === 'draw') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <ImageStudioDrawCanvas
          imageSrc={imageSrc}
          adjustments={adjustments}
          drawState={drawState}
          onDrawStateChange={onDrawStateChange}
          drawTool={drawTool}
          onDrawToolChange={onDrawToolChange}
          brushColor={brushColor}
          onBrushColorChange={onBrushColorChange}
          brushSize={brushSize}
          onBrushSizeChange={onBrushSizeChange}
          textFontFamily={textFontFamily}
          onTextFontFamilyChange={onTextFontFamilyChange}
          textFontSize={textFontSize}
          onTextFontSizeChange={onTextFontSizeChange}
          canvasView={canvasView}
          onCanvasViewChange={onCanvasViewChange}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minHeight: 0 }}>
      <Box sx={{ display: 'flex', gap: 2, flex: 1, minHeight: 0, minWidth: 0 }}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            position: 'relative',
            minHeight: 0,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: canvasBg,
            border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`
          }}
        >
          {tool === 'focal' && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <Box
                onClick={handleFocalClick}
                sx={{
                  position: 'relative',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  cursor: 'crosshair',
                  userSelect: 'none',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}
              >
                <img
                  src={imageSrc}
                  alt="Focal point"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block',
                    filter: previewFilter
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: `${focal.x}%`,
                    top: `${focal.y}%`,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    boxShadow: '0 0 0 2px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                />
              </Box>
            </Box>
          )}

          {(tool === 'adjust' || tool === 'resize') && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <img
                src={imageSrc}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: 4,
                  transform: `rotate(${adjustments.rotation}deg) scaleX(${adjustments.flipHorizontal ? -1 : 1}) scaleY(${adjustments.flipVertical ? -1 : 1})`,
                  filter: previewFilter
                }}
              />
            </Box>
          )}
        </Paper>

        {showSidePanel && (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              width: { xs: '100%', md: 280 },
              flexShrink: 0,
              p: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minHeight: 0,
              overflowY: 'auto'
            }}
          >
            {tool === 'adjust' && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Adjustments</Typography>
                <Box>
                  <Typography variant="caption" color="text.secondary">Brightness</Typography>
                  <Slider
                    size="small"
                    min={50}
                    max={150}
                    value={adjustments.brightness}
                    onChange={(_, v) => onAdjustmentsChange({ ...adjustments, brightness: v as number })}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Contrast</Typography>
                  <Slider
                    size="small"
                    min={50}
                    max={150}
                    value={adjustments.contrast}
                    onChange={(_, v) => onAdjustmentsChange({ ...adjustments, contrast: v as number })}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Saturation</Typography>
                  <Slider
                    size="small"
                    min={0}
                    max={200}
                    value={adjustments.saturation}
                    onChange={(_, v) => onAdjustmentsChange({ ...adjustments, saturation: v as number })}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Hue</Typography>
                  <Slider
                    size="small"
                    min={-90}
                    max={90}
                    value={adjustments.hueRotate}
                    onChange={(_, v) => onAdjustmentsChange({ ...adjustments, hueRotate: v as number })}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Vignette</Typography>
                  <Slider
                    size="small"
                    min={0}
                    max={100}
                    value={adjustments.vignette}
                    onChange={(_, v) => onAdjustmentsChange({ ...adjustments, vignette: v as number })}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Blur</Typography>
                  <Slider
                    size="small"
                    min={0}
                    max={8}
                    step={0.5}
                    value={adjustments.blur}
                    onChange={(_, v) => onAdjustmentsChange({ ...adjustments, blur: v as number })}
                  />
                </Box>
              </>
            )}

            {tool === 'resize' && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Output size</Typography>
                <TextField
                  size="small"
                  fullWidth
                  label="Width (px)"
                  type="number"
                  value={outputWidth}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    onOutputWidthChange(val);
                    if (lockOutputAspect && val && croppedAreaPixels) {
                      const ratio = croppedAreaPixels.height / croppedAreaPixels.width;
                      onOutputHeightChange(Math.round(Number(val) * ratio));
                    }
                  }}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Height (px)"
                  type="number"
                  value={outputHeight}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    onOutputHeightChange(val);
                    if (lockOutputAspect && val && croppedAreaPixels) {
                      const ratio = croppedAreaPixels.width / croppedAreaPixels.height;
                      onOutputWidthChange(Math.round(Number(val) * ratio));
                    }
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={lockOutputAspect}
                      onChange={(e) => onLockOutputAspectChange(e.target.checked)}
                    />
                  }
                  label="Lock aspect ratio"
                />
                {croppedAreaPixels && (
                  <Typography variant="body2" color="text.secondary">
                    Crop area: {croppedAreaPixels.width} × {croppedAreaPixels.height}px
                  </Typography>
                )}
                {outputSizeDiffers && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      Image is scaled to fit and centered. Extra canvas area uses the background below.
                    </Typography>
                    <ToggleButtonGroup
                      size="small"
                      exclusive
                      value={outputBackground.mode}
                      onChange={(_, val) => {
                        if (val) {
                          onOutputBackgroundChange({ ...outputBackground, mode: val });
                        }
                      }}
                    >
                      <ToggleButton value="transparent">Transparent</ToggleButton>
                      <ToggleButton value="color">Color</ToggleButton>
                    </ToggleButtonGroup>
                    {outputBackground.mode === 'color' && (
                      <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                        {OUTPUT_BACKGROUND_SWATCHES.map((color) => (
                          <IconButton
                            key={color}
                            size="small"
                            onClick={() => onOutputBackgroundChange({ ...outputBackground, color })}
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: color,
                              border: outputBackground.color === color ? `2px solid ${theme.palette.primary.main}` : '1px solid',
                              borderColor: outputBackground.color === color ? 'primary.main' : 'divider'
                            }}
                          />
                        ))}
                        <TextField
                          size="small"
                          label="Custom"
                          value={outputBackground.color}
                          onChange={(e) =>
                            onOutputBackgroundChange({ ...outputBackground, color: e.target.value })
                          }
                          sx={{ width: 100 }}
                        />
                      </Stack>
                    )}
                  </Box>
                )}
              </>
            )}
          </Paper>
        )}
      </Box>

      {tool === 'focal' && (
        <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1.5 }}>
            Crop previews at focal point
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 0.5 }}>
            {focalPreviews.map((preview) => (
              <Box key={preview.label} sx={{ flexShrink: 0, width: 120 }}>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>{preview.label}</Typography>
                <Box
                  sx={{
                    position: 'relative',
                    width: 120,
                    aspectRatio: `${preview.ratio}`,
                    overflow: 'hidden',
                    bgcolor: canvasBg,
                    borderRadius: 1.5,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={preview.label}
                    style={{
                      position: 'absolute',
                      width: `${(naturalSize.width / preview.area.width) * 100}%`,
                      height: `${(naturalSize.height / preview.area.height) * 100}%`,
                      left: `${-(preview.area.x / preview.area.width) * 100}%`,
                      top: `${-(preview.area.y / preview.area.height) * 100}%`,
                      maxWidth: 'none'
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
        sx={{
          pt: 0.5,
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <ButtonGroup size="small" variant="outlined" sx={{ borderRadius: 2 }}>
          <Button onClick={() => rotate(-90)} title="Rotate left">
            <RotateLeftRoundedIcon fontSize="small" />
          </Button>
          <Button onClick={() => rotate(90)} title="Rotate right">
            <RotateRightRoundedIcon fontSize="small" />
          </Button>
          <Button
            onClick={() => onAdjustmentsChange({ ...adjustments, flipHorizontal: !adjustments.flipHorizontal })}
            title="Flip horizontal"
          >
            <FlipRoundedIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <Button size="small" variant="text" startIcon={<RestartAltRoundedIcon />} onClick={onReset}>
          Reset edits
        </Button>
        {naturalSize.width > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            Source: {naturalSize.width} × {naturalSize.height}px
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default ImageStudioEditor;
