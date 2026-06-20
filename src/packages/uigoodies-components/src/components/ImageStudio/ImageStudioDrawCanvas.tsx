/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import AutoFixOffRoundedIcon from '@mui/icons-material/AutoFixOffRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import {
  clientToImage,
  computeImageLayout,
  imageToDisplay,
  CanvasViewTransform
} from './imageLayout';
import {
  DrawState,
  DrawStroke,
  DrawTool,
  ImageAdjustments,
  TextAnnotation,
  TEXT_FONT_OPTIONS,
  buildCssFilter,
  createImage
} from './imageStudioUtils';
import ImageCanvasZoomBar from './ImageCanvasZoomBar';
import { useImageCanvasView } from './useImageCanvasView';

const BRUSH_COLORS = ['#ffffff', '#000000', '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#af52de'];
const TINT_COLORS = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#5856d6', '#af52de', '#ff2d55'];

function newTextId(): string {
  return `text-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type Props = {
  imageSrc: string;
  adjustments: ImageAdjustments;
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
};

export function ImageStudioDrawCanvas({
  imageSrc,
  adjustments,
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
  onCanvasViewChange
}: Props) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const layoutRef = useRef<ReturnType<typeof computeImageLayout> | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [activeStroke, setActiveStroke] = useState<DrawStroke | null>(null);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const dragTextRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const viewInteraction = useImageCanvasView(containerRef, naturalSize, canvasView, onCanvasViewChange);

  useEffect(() => {
    let cancelled = false;
    createImage(imageSrc).then((img) => {
      if (!cancelled) {
        imageRef.current = img;
        setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [imageSrc]);

  const hitTestText = (ctx: CanvasRenderingContext2D, layout: ReturnType<typeof computeImageLayout>, px: number, py: number): TextAnnotation | null => {
    for (let i = drawState.texts.length - 1; i >= 0; i--) {
      const text = drawState.texts[i];
      const pos = imageToDisplay(text.x, text.y, layout);
      const fontSize = text.fontSize * layout.scale;
      ctx.font = `${fontSize}px ${text.fontFamily}`;
      const width = ctx.measureText(text.text).width;
      const height = fontSize * 1.25;
      if (px >= pos.x && px <= pos.x + width && py >= pos.y && py <= pos.y + height) {
        return text;
      }
    }
    return null;
  };

  const paintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imageRef.current;
    if (!canvas || !container || !img || !naturalSize.width) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const displayWidth = Math.max(1, Math.floor(rect.width));
    const displayHeight = Math.max(1, Math.floor(rect.height));
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const layout = computeImageLayout(displayWidth, displayHeight, naturalSize.width, naturalSize.height, canvasView);
    layoutRef.current = layout;
    const drawWidth = naturalSize.width * layout.scale;
    const drawHeight = naturalSize.height * layout.scale;

    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.save();
    ctx.filter = buildCssFilter(adjustments);
    ctx.drawImage(img, layout.offsetX, layout.offsetY, drawWidth, drawHeight);
    ctx.restore();

    if (adjustments.tintStrength && adjustments.tintColor) {
      ctx.save();
      ctx.globalAlpha = adjustments.tintStrength / 100;
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = adjustments.tintColor;
      ctx.fillRect(layout.offsetX, layout.offsetY, drawWidth, drawHeight);
      ctx.restore();
    }

    const toDisplay = (p: { x: number; y: number }) => imageToDisplay(p.x, p.y, layout);

    const drawStrokePath = (stroke: DrawStroke) => {
      if (stroke.points.length < 1) {
        return;
      }
      const size = stroke.size * layout.scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = size;

      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
      }

      if (stroke.tool === 'line' && stroke.points.length >= 2) {
        const start = toDisplay(stroke.points[0]);
        const end = toDisplay(stroke.points[stroke.points.length - 1]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
        return;
      }

      if (stroke.tool === 'fillRect' && stroke.points.length >= 2) {
        const a = toDisplay(stroke.points[0]);
        const b = toDisplay(stroke.points[stroke.points.length - 1]);
        const x = Math.min(a.x, b.x);
        const y = Math.min(a.y, b.y);
        const w = Math.abs(b.x - a.x);
        const h = Math.abs(b.y - a.y);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = stroke.color;
        ctx.fillRect(x, y, w, h);
        return;
      }

      if (stroke.tool === 'fillEllipse' && stroke.points.length >= 2) {
        const a = toDisplay(stroke.points[0]);
        const b = toDisplay(stroke.points[stroke.points.length - 1]);
        const x = Math.min(a.x, b.x);
        const y = Math.min(a.y, b.y);
        const w = Math.abs(b.x - a.x);
        const h = Math.abs(b.y - a.y);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = stroke.color;
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      ctx.beginPath();
      stroke.points.forEach((point, index) => {
        const d = toDisplay(point);
        if (index === 0) {
          ctx.moveTo(d.x, d.y);
        } else {
          ctx.lineTo(d.x, d.y);
        }
      });
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    };

    drawState.strokes.forEach(drawStrokePath);
    if (activeStroke) {
      drawStrokePath(activeStroke);
    }

    drawState.texts.forEach((text) => {
      const pos = toDisplay({ x: text.x, y: text.y });
      const fontSize = text.fontSize * layout.scale;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = text.color;
      ctx.font = `${fontSize}px ${text.fontFamily}`;
      ctx.textBaseline = 'top';
      ctx.fillText(text.text, pos.x, pos.y);

      if (text.id === selectedTextId) {
        const width = ctx.measureText(text.text).width;
        const height = fontSize * 1.25;
        ctx.strokeStyle = theme.palette.primary.main;
        ctx.lineWidth = 2;
        ctx.strokeRect(pos.x - 2, pos.y - 2, width + 4, height + 4);
      }
    });
  }, [adjustments, activeStroke, canvasView, drawState, naturalSize, selectedTextId, theme.palette.primary.main]);

  useEffect(() => {
    paintCanvas();
  }, [paintCanvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(() => paintCanvas());
    observer.observe(container);
    return () => observer.disconnect();
  }, [paintCanvas]);

  useEffect(() => {
    const selected = drawState.texts.find((t) => t.id === selectedTextId);
    setEditingText(selected?.text ?? '');
  }, [selectedTextId, drawState.texts]);

  useEffect(() => {
    const selected = drawState.texts.find((t) => t.id === selectedTextId);
    if (selected) {
      onTextFontFamilyChange(selected.fontFamily);
      onTextFontSizeChange(selected.fontSize);
    }
  }, [selectedTextId, drawState.texts, onTextFontFamilyChange, onTextFontSizeChange]);

  const commitStroke = (stroke: DrawStroke) => {
    onDrawStateChange({ ...drawState, strokes: [...drawState.strokes, stroke] });
  };

  const updateSelectedText = (patch: Partial<TextAnnotation>) => {
    if (!selectedTextId) {
      return;
    }
    onDrawStateChange({
      ...drawState,
      texts: drawState.texts.map((t) => (t.id === selectedTextId ? { ...t, ...patch } : t))
    });
  };

  const pointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (viewInteraction.tryStartPan(e)) {
      return;
    }
    if (!naturalSize.width) {
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    const layout = layoutRef.current;
    if (!rect || !layout) {
      return;
    }

    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const hit = hitTestText(ctx, layout, displayX, displayY);
      if (hit) {
        const imgPoint = clientToImage(e.clientX, e.clientY, rect, layout);
        if (!imgPoint) {
          return;
        }
        setSelectedTextId(hit.id);
        dragTextRef.current = {
          id: hit.id,
          offsetX: hit.x - imgPoint.x,
          offsetY: hit.y - imgPoint.y
        };
        (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
        return;
      }
    }

    const point = clientToImage(e.clientX, e.clientY, rect, layout);
    if (!point) {
      setSelectedTextId(null);
      return;
    }

    if (drawTool === 'text') {
      setSelectedTextId(null);
      const annotation: TextAnnotation = {
        id: newTextId(),
        x: point.x,
        y: point.y,
        text: 'Text',
        color: brushColor,
        fontSize: textFontSize,
        fontFamily: textFontFamily
      };
      onDrawStateChange({ ...drawState, texts: [...drawState.texts, annotation] });
      setSelectedTextId(annotation.id);
      return;
    }

    setSelectedTextId(null);

    if (drawTool === 'line' || drawTool === 'fillRect' || drawTool === 'fillEllipse') {
      setLineStart(point);
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
      return;
    }

    if (drawTool !== 'brush' && drawTool !== 'eraser') {
      return;
    }

    const stroke: DrawStroke = {
      tool: drawTool,
      color: brushColor,
      size: brushSize,
      points: [point]
    };
    setActiveStroke(stroke);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const pointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (viewInteraction.handlePanMove(e)) {
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    const layout = layoutRef.current;
    if (!rect || !layout) {
      return;
    }

    if (dragTextRef.current) {
      const point = clientToImage(e.clientX, e.clientY, rect, layout);
      if (!point) {
        return;
      }
      updateSelectedText({
        x: Math.max(0, Math.min(naturalSize.width, point.x + dragTextRef.current.offsetX)),
        y: Math.max(0, Math.min(naturalSize.height, point.y + dragTextRef.current.offsetY))
      });
      return;
    }

    if (activeStroke && drawTool !== 'line' && drawTool !== 'text' && drawTool !== 'fillRect' && drawTool !== 'fillEllipse') {
      const point = clientToImage(e.clientX, e.clientY, rect, layout);
      if (!point) {
        return;
      }
      setActiveStroke({
        ...activeStroke,
        points: [...activeStroke.points, point]
      });
      return;
    }

    if (
      (drawTool === 'line' || drawTool === 'fillRect' || drawTool === 'fillEllipse') &&
      lineStart
    ) {
      const point = clientToImage(e.clientX, e.clientY, rect, layout);
      if (!point) {
        return;
      }
      setActiveStroke({
        tool: drawTool,
        color: brushColor,
        size: drawTool === 'line' ? brushSize : 0,
        points: [lineStart, point]
      });
    }
  };

  const pointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    viewInteraction.endPan();
    dragTextRef.current = null;

    if (activeStroke && activeStroke.points.length > 0 && drawTool !== 'line' && drawTool !== 'fillRect' && drawTool !== 'fillEllipse') {
      commitStroke(activeStroke);
      setActiveStroke(null);
      return;
    }

    if (drawTool === 'line' && lineStart) {
      const rect = containerRef.current?.getBoundingClientRect();
      const layout = layoutRef.current;
      if (rect && layout) {
        const end = clientToImage(e.clientX, e.clientY, rect, layout);
        if (end) {
          commitStroke({
            tool: 'line',
            color: brushColor,
            size: brushSize,
            points: [lineStart, end]
          });
        }
      }
      setLineStart(null);
      setActiveStroke(null);
    }

    if ((drawTool === 'fillRect' || drawTool === 'fillEllipse') && lineStart) {
      const rect = containerRef.current?.getBoundingClientRect();
      const layout = layoutRef.current;
      if (rect && layout) {
        const end = clientToImage(e.clientX, e.clientY, rect, layout);
        if (end) {
          commitStroke({
            tool: drawTool,
            color: brushColor,
            size: 0,
            points: [lineStart, end]
          });
        }
      }
      setLineStart(null);
      setActiveStroke(null);
    }
  };

  const selectedText = drawState.texts.find((t) => t.id === selectedTextId);
  const showTextControls = drawTool === 'text' || selectedTextId;
  const activeFontFamily = selectedText?.fontFamily ?? textFontFamily;
  const activeFontSize = selectedText?.fontSize ?? textFontSize;

  const setActiveFontFamily = (family: string) => {
    if (selectedTextId) {
      updateSelectedText({ fontFamily: family });
    } else {
      onTextFontFamilyChange(family);
    }
  };

  const setActiveFontSize = (size: number) => {
    const clamped = Math.max(8, Math.min(200, Math.round(size)));
    if (selectedTextId) {
      updateSelectedText({ fontSize: clamped });
    } else {
      onTextFontSizeChange(clamped);
    }
  };

  const undo = () => {
    if (drawState.texts.length) {
      onDrawStateChange({ ...drawState, texts: drawState.texts.slice(0, -1) });
      setSelectedTextId(null);
      return;
    }
    if (drawState.strokes.length) {
      onDrawStateChange({ ...drawState, strokes: drawState.strokes.slice(0, -1) });
    }
  };

  const drawCursor =
    viewInteraction.panCursor ??
    (drawTool === 'text' ? 'text' : 'crosshair');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minHeight: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
        <ImageCanvasZoomBar view={canvasView} onViewChange={onCanvasViewChange} compact />
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
          <ToggleButtonGroup size="small" value={drawTool} exclusive onChange={(_, val) => val && onDrawToolChange(val)}>
            <ToggleButton value="brush">
              <Tooltip title="Brush"><BrushRoundedIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="eraser">
              <Tooltip title="Eraser"><AutoFixOffRoundedIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="line">
              <Tooltip title="Line"><ShowChartRoundedIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="text">
              <Tooltip title="Add text"><TextFieldsRoundedIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="fillRect">
              <Tooltip title="Filled rectangle"><CropSquareRoundedIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="fillEllipse">
              <Tooltip title="Filled circle"><CircleOutlinedIcon fontSize="small" /></Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {BRUSH_COLORS.map((color) => (
              <IconButton
                key={color}
                size="small"
                onClick={() => {
                  onBrushColorChange(color);
                  if (selectedTextId) {
                    updateSelectedText({ color });
                  }
                }}
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: color,
                  border: brushColor === color ? `2px solid ${theme.palette.primary.main}` : '1px solid',
                  borderColor: brushColor === color ? 'primary.main' : 'divider'
                }}
              />
            ))}
          </Box>

          <Box sx={{ minWidth: 120, flex: 1, maxWidth: 160 }}>
            <Typography variant="caption" color="text.secondary">
              {drawTool === 'text' || drawTool === 'fillRect' || drawTool === 'fillEllipse' ? 'Stroke' : 'Brush'} size
            </Typography>
            <Slider
              size="small"
              min={2}
              max={48}
              value={brushSize}
              onChange={(_, v) => onBrushSizeChange(v as number)}
              disabled={drawTool === 'text' || drawTool === 'fillRect' || drawTool === 'fillEllipse'}
            />
          </Box>

          <Button size="small" startIcon={<UndoRoundedIcon />} onClick={undo} disabled={!drawState.strokes.length && !drawState.texts.length}>
            Undo
          </Button>
        </Stack>

        {showTextControls && (
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Font</InputLabel>
              <Select
                label="Font"
                value={activeFontFamily}
                onChange={(e) => setActiveFontFamily(e.target.value)}
              >
                {TEXT_FONT_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontFamily: opt.value }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ minWidth: 120, flex: 1, maxWidth: 200 }}>
              <Typography variant="caption" color="text.secondary">Text size (px)</Typography>
              <Slider
                size="small"
                min={8}
                max={120}
                value={activeFontSize}
                onChange={(_, v) => setActiveFontSize(v as number)}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, minWidth: 48 }}>
              {activeFontSize}px
            </Typography>
            <TextField
              size="small"
              label="Size"
              type="number"
              value={activeFontSize}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) {
                  setActiveFontSize(n);
                }
              }}
              inputProps={{ min: 8, max: 200, step: 1 }}
              sx={{ width: 88 }}
            />
          </Stack>
        )}

        {selectedTextId && (
          <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
            <TextField
              size="small"
              fullWidth
              label="Text content"
              value={editingText}
              onChange={(e) => {
                setEditingText(e.target.value);
                updateSelectedText({ text: e.target.value });
              }}
            />
            <Typography variant="caption" color="text.secondary">Drag to move</Typography>
          </Stack>
        )}
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
            cursor: drawCursor
          }}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerLeave={pointerUp}
        />
      </Paper>
    </Box>
  );
}

export default ImageStudioDrawCanvas;
