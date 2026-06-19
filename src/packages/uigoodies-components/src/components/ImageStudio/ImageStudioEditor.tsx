/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import EasyCrop, { Area, Point, CropperProps } from 'react-easy-crop';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControlLabel,
  Paper,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import FlipRoundedIcon from '@mui/icons-material/FlipRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import {
  ASPECT_PRESETS,
  EditorTool,
  FOCAL_PREVIEW_RATIOS,
  FocalPoint,
  ImageAdjustments,
  clampFocal,
  focalCropArea
} from './imageStudioUtils';

const Cropper = EasyCrop as unknown as React.ComponentType<CropperProps>;

type Props = {
  imageSrc: string;
  tool: EditorTool;
  adjustments: ImageAdjustments;
  onAdjustmentsChange: (next: ImageAdjustments) => void;
  focal: FocalPoint;
  onFocalChange: (next: FocalPoint) => void;
  cropPosition: Point;
  onCropPositionChange: (next: Point) => void;
  croppedAreaPixels: Area | null;
  onCroppedAreaPixelsChange: (next: Area | null) => void;
  aspect: number | undefined;
  onAspectChange: (next: number | undefined) => void;
  outputWidth: number | '';
  outputHeight: number | '';
  onOutputWidthChange: (v: number | '') => void;
  onOutputHeightChange: (v: number | '') => void;
  lockOutputAspect: boolean;
  onLockOutputAspectChange: (v: boolean) => void;
  onReset: () => void;
};

export function ImageStudioEditor({
  imageSrc,
  tool,
  adjustments,
  onAdjustmentsChange,
  focal,
  onFocalChange,
  cropPosition,
  onCropPositionChange,
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
  onReset
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = imageSrc;
  }, [imageSrc]);

  const onCropComplete = useCallback(
    (_: Area, pixels: Area) => {
      onCroppedAreaPixelsChange(pixels);
    },
    [onCroppedAreaPixelsChange]
  );

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0 }}>
      <Paper variant="outlined" sx={{ position: 'relative', flex: 1, minHeight: 320, bgcolor: '#1e1e1e' }}>
        {tool === 'crop' && (
          <Cropper
            image={imageSrc}
            crop={cropPosition}
            zoom={zoom}
            aspect={aspect ?? (naturalSize.width && naturalSize.height ? naturalSize.width / naturalSize.height : 1)}
            rotation={adjustments.rotation}
            minZoom={1}
            maxZoom={3}
            cropShape="rect"
            zoomSpeed={1}
            restrictPosition={true}
            keyboardStep={1}
            style={{ containerStyle: { borderRadius: 4 } }}
            classes={{}}
            mediaProps={{}}
            cropperProps={{}}
            onCropChange={onCropPositionChange}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        )}

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
                userSelect: 'none'
              }}
            >
              <img
                src={imageSrc}
                alt="Focal point"
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(100vh - 280px)',
                  display: 'block',
                  filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: `${focal.x}%`,
                  top: `${focal.y}%`,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.5)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}
              />
            </Box>
          </Box>
        )}

        {(tool === 'adjust' || tool === 'resize') && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <img
              src={imageSrc}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 280px)',
                transform: `rotate(${adjustments.rotation}deg) scaleX(${adjustments.flipHorizontal ? -1 : 1}) scaleY(${adjustments.flipVertical ? -1 : 1})`,
                filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`
              }}
            />
          </Box>
        )}
      </Paper>

      {tool === 'crop' && (
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Typography variant="caption" color="text.secondary">Aspect:</Typography>
          <ToggleButtonGroup
            size="small"
            value={aspect ?? 'free'}
            exclusive
            onChange={(_, val) => {
              if (val === null) return;
              onAspectChange(val === 'free' ? undefined : Number(val));
            }}
          >
            {ASPECT_PRESETS.map((preset) => (
              <ToggleButton key={preset.label} value={preset.value ?? 'free'}>
                {preset.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Box sx={{ flex: 1, minWidth: 120, px: 1 }}>
            <Typography variant="caption">Zoom</Typography>
            <Slider size="small" min={1} max={3} step={0.05} value={zoom} onChange={(_, v) => setZoom(v as number)} />
          </Box>
        </Stack>
      )}

      {tool === 'focal' && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {focalPreviews.map((preview) => (
            <Box key={preview.label} sx={{ width: { xs: '48%', sm: '23%' } }}>
              <Typography variant="caption" display="block">{preview.label} preview</Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: `${preview.ratio}`,
                  overflow: 'hidden',
                  bgcolor: '#111',
                  borderRadius: 1
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
      )}

      {tool === 'adjust' && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 160 }}>
            <Typography variant="caption">Brightness</Typography>
            <Slider
              min={50}
              max={150}
              value={adjustments.brightness}
              onChange={(_, v) => onAdjustmentsChange({ ...adjustments, brightness: v as number })}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 160 }}>
            <Typography variant="caption">Contrast</Typography>
            <Slider
              min={50}
              max={150}
              value={adjustments.contrast}
              onChange={(_, v) => onAdjustmentsChange({ ...adjustments, contrast: v as number })}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 160 }}>
            <Typography variant="caption">Saturation</Typography>
            <Slider
              min={0}
              max={200}
              value={adjustments.saturation}
              onChange={(_, v) => onAdjustmentsChange({ ...adjustments, saturation: v as number })}
            />
          </Box>
        </Box>
      )}

      {tool === 'resize' && (
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <TextField
            size="small"
            label="Output width"
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
            label="Output height"
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
              <Switch checked={lockOutputAspect} onChange={(e) => onLockOutputAspectChange(e.target.checked)} />
            }
            label="Lock aspect"
          />
          {croppedAreaPixels && (
            <Typography variant="body2" color="text.secondary">
              Crop area: {croppedAreaPixels.width} × {croppedAreaPixels.height}px
            </Typography>
          )}
        </Stack>
      )}

      <Divider />

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <ButtonGroup size="small" variant="outlined">
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
        <Button size="small" startIcon={<RestartAltRoundedIcon />} onClick={onReset}>
          Reset edits
        </Button>
        {naturalSize.width > 0 && (
          <Typography variant="caption" color="text.secondary">
            Source: {naturalSize.width} × {naturalSize.height}px
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default ImageStudioEditor;
