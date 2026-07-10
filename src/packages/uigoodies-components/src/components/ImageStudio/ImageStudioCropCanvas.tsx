/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, alpha, useTheme } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { ASPECT_PRESETS } from './imageStudioUtils';
import {
  CropArea,
  CanvasViewTransform,
  clampCropArea,
  clientToImage,
  computeImageLayout,
  cropAreaWithAspect,
  fullImageCrop,
  imageToDisplay,
  resizeCropToDimensions
} from './imageLayout';
import { createImage } from './imageStudioUtils';
import ImageCanvasZoomBar from './ImageCanvasZoomBar';
import { useImageCanvasView } from './useImageCanvasView';

type HandleId = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'move';

const HANDLE_SIZE = 10;

type Props = {
  imageSrc: string;
  cropArea: CropArea | null;
  onCropAreaChange: (area: CropArea) => void;
  aspect: number | undefined;
  onAspectChange: (aspect: number | undefined) => void;
  canvasView: CanvasViewTransform;
  onCanvasViewChange: (view: CanvasViewTransform) => void;
  onApplyCrop?: () => void;
  applyingCrop?: boolean;
};

function hitHandle(
  px: number,
  py: number,
  crop: CropArea,
  layout: ReturnType<typeof computeImageLayout>
): HandleId | null {
  const tl = imageToDisplay(crop.x, crop.y, layout);
  const br = imageToDisplay(crop.x + crop.width, crop.y + crop.height, layout);
  const cx = (tl.x + br.x) / 2;
  const cy = (tl.y + br.y) / 2;
  const hs = HANDLE_SIZE;
  const checks: Array<{ id: HandleId; x: number; y: number }> = [
    { id: 'nw', x: tl.x, y: tl.y },
    { id: 'n', x: cx, y: tl.y },
    { id: 'ne', x: br.x, y: tl.y },
    { id: 'e', x: br.x, y: cy },
    { id: 'se', x: br.x, y: br.y },
    { id: 's', x: cx, y: br.y },
    { id: 'sw', x: tl.x, y: br.y },
    { id: 'w', x: tl.x, y: cy }
  ];
  for (const check of checks) {
    if (Math.abs(px - check.x) <= hs && Math.abs(py - check.y) <= hs) {
      return check.id;
    }
  }
  if (px >= tl.x && px <= br.x && py >= tl.y && py <= br.y) {
    return 'move';
  }
  return null;
}

function resizeCrop(
  crop: CropArea,
  handle: HandleId,
  pointer: { x: number; y: number },
  startCrop: CropArea,
  startPointer: { x: number; y: number },
  imageWidth: number,
  imageHeight: number,
  aspect: number | undefined
): CropArea {
  const dx = pointer.x - startPointer.x;
  const dy = pointer.y - startPointer.y;
  let { x, y, width, height } = startCrop;

  if (handle === 'move') {
    x = startCrop.x + dx;
    y = startCrop.y + dy;
    return clampCropArea({ x, y, width, height }, imageWidth, imageHeight);
  }

  if (handle.includes('e')) {
    width = startCrop.width + dx;
  }
  if (handle.includes('w')) {
    width = startCrop.width - dx;
    x = startCrop.x + dx;
  }
  if (handle.includes('s')) {
    height = startCrop.height + dy;
  }
  if (handle.includes('n')) {
    height = startCrop.height - dy;
    y = startCrop.y + dy;
  }

  if (aspect) {
    if (handle === 'e' || handle === 'w' || handle === 'ne' || handle === 'nw' || handle === 'se' || handle === 'sw') {
      height = width / aspect;
      if (handle.includes('n')) {
        y = startCrop.y + startCrop.height - height;
      }
    } else {
      width = height * aspect;
      if (handle.includes('w')) {
        x = startCrop.x + startCrop.width - width;
      }
    }
  }

  return clampCropArea({ x, y, width, height }, imageWidth, imageHeight);
}

export function ImageStudioCropCanvas({
  imageSrc,
  cropArea,
  onCropAreaChange,
  aspect,
  onAspectChange,
  canvasView,
  onCanvasViewChange,
  onApplyCrop,
  applyingCrop = false
}: Props) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const dragRef = useRef<{
    handle: HandleId;
    startCrop: CropArea;
    startPointer: { x: number; y: number };
  } | null>(null);
  const [cropWidthInput, setCropWidthInput] = useState('');
  const [cropHeightInput, setCropHeightInput] = useState('');

  const viewInteraction = useImageCanvasView(containerRef, naturalSize, canvasView, onCanvasViewChange);

  useEffect(() => {
    let cancelled = false;
    createImage(imageSrc)
      .then((img) => {
        if (!cancelled) {
          imageRef.current = img;
          setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
          if (!cropArea) {
            onCropAreaChange(fullImageCrop(img.naturalWidth, img.naturalHeight));
          }
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error('Failed to load image for crop canvas:', error);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [imageSrc]);

  useEffect(() => {
    if (cropArea) {
      setCropWidthInput(String(cropArea.width));
      setCropHeightInput(String(cropArea.height));
    }
  }, [cropArea?.width, cropArea?.height, cropArea?.x, cropArea?.y]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imageRef.current;
    if (!canvas || !container || !img || !naturalSize.width || !cropArea) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const cw = Math.max(1, Math.floor(rect.width));
    const ch = Math.max(1, Math.floor(rect.height));
    canvas.width = cw;
    canvas.height = ch;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const layout = computeImageLayout(cw, ch, naturalSize.width, naturalSize.height, canvasView);
    const tl = imageToDisplay(cropArea.x, cropArea.y, layout);
    const br = imageToDisplay(cropArea.x + cropArea.width, cropArea.y + cropArea.height, layout);

    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, cw, ch);

    const drawW = naturalSize.width * layout.scale;
    const drawH = naturalSize.height * layout.scale;
    ctx.drawImage(img, layout.offsetX, layout.offsetY, drawW, drawH);

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.rect(0, 0, cw, ch);
    ctx.rect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
    ctx.fill('evenodd');
    ctx.restore();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2;
    ctx.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#007aff';
    ctx.lineWidth = 1;
    const handles = [
      [tl.x, tl.y],
      [(tl.x + br.x) / 2, tl.y],
      [br.x, tl.y],
      [br.x, (tl.y + br.y) / 2],
      [br.x, br.y],
      [(tl.x + br.x) / 2, br.y],
      [tl.x, br.y],
      [tl.x, (tl.y + br.y) / 2]
    ];
    handles.forEach(([hx, hy]) => {
      ctx.fillRect(hx - HANDLE_SIZE / 2, hy - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
      ctx.strokeRect(hx - HANDLE_SIZE / 2, hy - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
    });
  }, [cropArea, naturalSize, canvasView]);

  useEffect(() => {
    paint();
  }, [paint]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(() => paint());
    observer.observe(container);
    return () => observer.disconnect();
  }, [paint]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (viewInteraction.tryStartPan(e)) {
      return;
    }
    if (!cropArea || !naturalSize.width) {
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const layout = computeImageLayout(rect.width, rect.height, naturalSize.width, naturalSize.height, canvasView);
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;
    const handle = hitHandle(displayX, displayY, cropArea, layout);
    if (!handle) {
      return;
    }
    const pointer = clientToImage(e.clientX, e.clientY, rect, layout, false);
    if (!pointer) {
      return;
    }
    dragRef.current = { handle, startCrop: cropArea, startPointer: pointer };
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (viewInteraction.handlePanMove(e)) {
      return;
    }
    const drag = dragRef.current;
    if (!drag || !naturalSize.width) {
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const layout = computeImageLayout(rect.width, rect.height, naturalSize.width, naturalSize.height, canvasView);
    const pointer = clientToImage(e.clientX, e.clientY, rect, layout, false);
    if (!pointer) {
      return;
    }
    const next = resizeCrop(
      cropArea!,
      drag.handle,
      pointer,
      drag.startCrop,
      drag.startPointer,
      naturalSize.width,
      naturalSize.height,
      aspect
    );
    onCropAreaChange(cropAreaWithAspect(next, aspect, naturalSize.width, naturalSize.height));
  };

  const onPointerUp = () => {
    viewInteraction.endPan();
    dragRef.current = null;
  };

  const applyDimensionInputs = () => {
    if (!cropArea || !naturalSize.width) {
      return;
    }
    const w = Number(cropWidthInput);
    const h = Number(cropHeightInput);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w < 8 || h < 8) {
      return;
    }
    onCropAreaChange(
      resizeCropToDimensions(cropArea, w, h, naturalSize.width, naturalSize.height, aspect)
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minHeight: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
        <Stack spacing={1}>
          <ImageCanvasZoomBar view={canvasView} onViewChange={onCanvasViewChange} compact />
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Aspect</Typography>
            <ToggleButtonGroup
              size="small"
              value={aspect ?? 'free'}
              exclusive
              onChange={(_, val) => {
                if (val === null || !cropArea || !naturalSize.width) return;
                const nextAspect = val === 'free' ? undefined : Number(val);
                onAspectChange(nextAspect);
                if (nextAspect) {
                  onCropAreaChange(
                    cropAreaWithAspect(cropArea, nextAspect, naturalSize.width, naturalSize.height)
                  );
                }
              }}
            >
              {ASPECT_PRESETS.map((preset) => (
                <ToggleButton key={preset.label} value={preset.value ?? 'free'}>
                  {preset.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <TextField
              size="small"
              label="W (px)"
              type="number"
              value={cropWidthInput}
              onChange={(e) => setCropWidthInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyDimensionInputs()}
              sx={{ width: 100 }}
            />
            <TextField
              size="small"
              label="H (px)"
              type="number"
              value={cropHeightInput}
              onChange={(e) => setCropHeightInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyDimensionInputs()}
              sx={{ width: 100 }}
            />
            <Button size="small" variant="outlined" onClick={applyDimensionInputs} disabled={!cropArea}>
              Set size
            </Button>
            {onApplyCrop && (
              <Button
                size="small"
                variant="contained"
                startIcon={<CheckRoundedIcon />}
                onClick={onApplyCrop}
                disabled={!cropArea || applyingCrop}
              >
                {applyingCrop ? 'Applying…' : 'Apply crop'}
              </Button>
            )}
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Drag handles to adjust the crop, then click <strong>Apply crop</strong> to lock it in before filters or save.
          </Typography>
        </Stack>
      </Paper>

      <Paper
        ref={containerRef}
        elevation={0}
        onWheel={viewInteraction.handleWheel}
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#141414',
          border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
          touchAction: 'none'
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            cursor: viewInteraction.panCursor ?? 'crosshair'
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </Paper>
    </Box>
  );
}

export default ImageStudioCropCanvas;
