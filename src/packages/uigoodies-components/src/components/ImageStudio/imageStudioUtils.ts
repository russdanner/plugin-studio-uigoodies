/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import Pica from 'pica';
import { getGlobalHeaders } from '@craftercms/studio-ui/utils/ajax';
import type { CropArea } from './imageLayout';

export type Point = { x: number; y: number };

export type ImageAdjustments = {
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  hueRotate: number;
  sepia: number;
  grayscale: number;
  blur: number;
  vignette: number;
  tintColor: string;
  tintStrength: number;
};

export type DrawTool = 'brush' | 'eraser' | 'line' | 'text' | 'fillRect' | 'fillEllipse';

export type DrawStroke = {
  tool: 'brush' | 'eraser' | 'line' | 'fillRect' | 'fillEllipse';
  color: string;
  size: number;
  /** Pixel coordinates on the full source image. */
  points: { x: number; y: number }[];
};

export type TextAnnotation = {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
};

export type DrawState = {
  strokes: DrawStroke[];
  texts: TextAnnotation[];
};

export const EMPTY_DRAW_STATE: DrawState = { strokes: [], texts: [] };

export const DEFAULT_TEXT_FONT_FAMILY = 'system-ui, sans-serif';
export const DEFAULT_TEXT_FONT_SIZE = 32;

export const TEXT_FONT_OPTIONS: { label: string; value: string }[] = [
  { label: 'System', value: 'system-ui, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Impact', value: 'Impact, sans-serif' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Trebuchet', value: '"Trebuchet MS", sans-serif' }
];

export type OutputBackgroundMode = 'transparent' | 'color';

export type OutputBackground = {
  mode: OutputBackgroundMode;
  color: string;
};

export const DEFAULT_OUTPUT_BACKGROUND: OutputBackground = {
  mode: 'transparent',
  color: '#ffffff'
};

export const OUTPUT_BACKGROUND_SWATCHES = [
  '#ffffff',
  '#000000',
  '#f5f5f5',
  '#e0e0e0',
  '#ff3b30',
  '#007aff',
  '#34c759',
  '#ffcc00'
];

export type FocalPoint = {
  x: number;
  y: number;
};

export const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,
  hueRotate: 0,
  sepia: 0,
  grayscale: 0,
  blur: 0,
  vignette: 0,
  tintColor: '',
  tintStrength: 0
};

export function buildCssFilter(adjustments: ImageAdjustments): string {
  const parts = [
    `brightness(${adjustments.brightness}%)`,
    `contrast(${adjustments.contrast}%)`,
    `saturate(${adjustments.saturation}%)`
  ];
  if (adjustments.hueRotate) {
    parts.push(`hue-rotate(${adjustments.hueRotate}deg)`);
  }
  if (adjustments.sepia) {
    parts.push(`sepia(${adjustments.sepia}%)`);
  }
  if (adjustments.grayscale) {
    parts.push(`grayscale(${adjustments.grayscale}%)`);
  }
  if (adjustments.blur) {
    parts.push(`blur(${adjustments.blur}px)`);
  }
  return parts.join(' ');
}

export type ImageRequirement = {
  contentType: string;
  contentTypeLabel: string;
  fieldId: string;
  fieldTitle: string;
  widthMin?: number;
  widthMax?: number;
  widthExact?: number;
  heightMin?: number;
  heightMax?: number;
  heightExact?: number;
};

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function dataUrlToFile(dataUrl: string, name: string, type?: string): { name: string; type: string; dataUrl: string } {
  const mime = type ?? dataUrl.match(/^data:([^;]+);/)?.[1] ?? 'image/png';
  return { name, type: mime, dataUrl };
}

/** Crafter write-content.json expects `path` = parent folder (with trailing slash), `name` = file leaf. */
export function splitStaticAssetPath(fullPath: string): { folderPath: string; fileName: string } {
  const normalized = fullPath.startsWith('/') ? fullPath : `/${fullPath}`;
  const slash = normalized.lastIndexOf('/');
  if (slash < 0) {
    return { folderPath: '/', fileName: normalized };
  }
  return {
    folderPath: `${normalized.substring(0, slash + 1)}`,
    fileName: normalized.substring(slash + 1)
  };
}

export async function loadRepoImageAsDataUrl(
  siteId: string,
  assetPath: string,
  guestOrigin?: string | null
): Promise<string> {
  const urls: string[] = [];
  if (guestOrigin) {
    urls.push(`${guestOrigin.replace(/\/$/, '')}${assetPath}?t=${Date.now()}`);
  }
  urls.push(
    `/studio/api/2/content/get_content_by_commit_id?siteId=${encodeURIComponent(siteId)}&path=${encodeURIComponent(assetPath)}&_=${Date.now()}`
  );

  for (const url of urls) {
    try {
      const response = await fetch(url, { headers: getGlobalHeaders(), credentials: 'include' });
      if (!response.ok) {
        continue;
      }
      const blob = await response.blob();
      if (!blob.type.startsWith('image/')) {
        continue;
      }
      return await blobToDataUrl(blob);
    } catch {
      // try next source
    }
  }
  throw new Error(`Unable to load image at ${assetPath}`);
}

export async function loadFileAsDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('File is not an image');
  }
  return blobToDataUrl(file);
}

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  };
}

function applyTint(ctx: CanvasRenderingContext2D, width: number, height: number, adjustments: ImageAdjustments) {
  if (!adjustments.tintStrength || !adjustments.tintColor) {
    return;
  }
  ctx.save();
  ctx.globalAlpha = adjustments.tintStrength / 100;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = adjustments.tintColor;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/** Apply a vignette (darkened edges) effect to the canvas. */
function applyVignette(ctx: CanvasRenderingContext2D, width: number, height: number, strength: number) {
  if (!strength) {
    return;
  }
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(width, height) * 0.65;
  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, `rgba(0,0,0,${(strength / 100) * 0.65})`);
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function applyDrawLayer(
  ctx: CanvasRenderingContext2D,
  pixelCrop: CropArea,
  sourceWidth: number,
  sourceHeight: number,
  drawState?: DrawState
) {
  if (!drawState || (!drawState.strokes.length && !drawState.texts.length)) {
    return;
  }

  const toLocal = (p: { x: number; y: number }) => ({
    x: p.x - pixelCrop.x,
    y: p.y - pixelCrop.y
  });

  for (const stroke of drawState.strokes) {
    if (!stroke.points.length) {
      continue;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = stroke.size;

    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = stroke.color;
    }

    if (stroke.tool === 'line' && stroke.points.length >= 2) {
      const start = toLocal(stroke.points[0]);
      const end = toLocal(stroke.points[stroke.points.length - 1]);
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      continue;
    }

    if (stroke.tool === 'fillRect' && stroke.points.length >= 2) {
      const a = toLocal(stroke.points[0]);
      const b = toLocal(stroke.points[stroke.points.length - 1]);
      const x = Math.min(a.x, b.x);
      const y = Math.min(a.y, b.y);
      const w = Math.abs(b.x - a.x);
      const h = Math.abs(b.y - a.y);
      ctx.fillStyle = stroke.color;
      ctx.fillRect(x, y, w, h);
      continue;
    }

    if (stroke.tool === 'fillEllipse' && stroke.points.length >= 2) {
      const a = toLocal(stroke.points[0]);
      const b = toLocal(stroke.points[stroke.points.length - 1]);
      const x = Math.min(a.x, b.x);
      const y = Math.min(a.y, b.y);
      const w = Math.abs(b.x - a.x);
      const h = Math.abs(b.y - a.y);
      ctx.fillStyle = stroke.color;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    ctx.beginPath();
    stroke.points.forEach((point, index) => {
      const local = toLocal(point);
      if (index === 0) {
        ctx.moveTo(local.x, local.y);
      } else {
        ctx.lineTo(local.x, local.y);
      }
    });
    ctx.stroke();
  }

  ctx.globalCompositeOperation = 'source-over';
  for (const text of drawState.texts) {
    const pos = toLocal({ x: text.x, y: text.y });
    ctx.fillStyle = text.color;
    ctx.font = `${text.fontSize}px ${text.fontFamily}`;
    ctx.textBaseline = 'top';
    ctx.fillText(text.text, pos.x, pos.y);
  }
}

async function composeToOutputSize(
  sourceCanvas: HTMLCanvasElement,
  outputWidth: number,
  outputHeight: number,
  background: OutputBackground,
  mimeType: string
): Promise<HTMLCanvasElement> {
  const srcW = sourceCanvas.width;
  const srcH = sourceCanvas.height;
  const scale = Math.min(outputWidth / srcW, outputHeight / srcH);
  const drawW = Math.max(1, Math.round(srcW * scale));
  const drawH = Math.max(1, Math.round(srcH * scale));

  let contentCanvas = sourceCanvas;
  if (drawW !== srcW || drawH !== srcH) {
    const scaled = document.createElement('canvas');
    scaled.width = drawW;
    scaled.height = drawH;
    const pica = Pica({ features: ['js', 'wasm'] });
    await pica.resize(sourceCanvas, scaled, { quality: 3 });
    contentCanvas = scaled;
  }

  const final = document.createElement('canvas');
  final.width = outputWidth;
  final.height = outputHeight;
  const ctx = final.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas not supported');
  }

  const useTransparent = background.mode === 'transparent' && mimeType !== 'image/jpeg';
  if (useTransparent) {
    ctx.clearRect(0, 0, outputWidth, outputHeight);
  } else {
    ctx.fillStyle = background.mode === 'color' ? background.color : '#ffffff';
    ctx.fillRect(0, 0, outputWidth, outputHeight);
  }

  const x = (outputWidth - drawW) / 2;
  const y = (outputHeight - drawH) / 2;
  ctx.drawImage(contentCanvas, x, y, drawW, drawH);
  return final;
}

export async function getCroppedImageBlob(
  imageSrc: string,
  pixelCrop: CropArea,
  adjustments: ImageAdjustments,
  outputWidth?: number,
  outputHeight?: number,
  mimeType = 'image/png',
  quality = 0.92,
  drawState?: DrawState,
  outputBackground: OutputBackground = DEFAULT_OUTPUT_BACKGROUND
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas not supported');
  }

  const rotRad = getRadianAngle(adjustments.rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, adjustments.rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  const scaleX = adjustments.flipHorizontal ? -1 : 1;
  const scaleY = adjustments.flipVertical ? -1 : 1;
  ctx.scale(scaleX, scaleY);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.filter = buildCssFilter(adjustments);
  ctx.drawImage(image, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  applyTint(ctx, bBoxWidth, bBoxHeight, adjustments);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');
  if (!croppedCtx) {
    throw new Error('Canvas not supported');
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  applyDrawLayer(croppedCtx, pixelCrop, image.width, image.height, drawState);
  applyVignette(croppedCtx, pixelCrop.width, pixelCrop.height, adjustments.vignette);

  let resultCanvas = croppedCanvas;
  if (outputWidth && outputHeight && (outputWidth !== pixelCrop.width || outputHeight !== pixelCrop.height)) {
    resultCanvas = await composeToOutputSize(
      croppedCanvas,
      outputWidth,
      outputHeight,
      outputBackground,
      mimeType
    );
  }

  return new Promise((resolve, reject) => {
    resultCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Export failed'));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

/** Compute a crop rectangle around a focal point for a target aspect ratio. */
export function focalCropArea(
  imageWidth: number,
  imageHeight: number,
  focal: FocalPoint,
  aspectRatio: number
): CropArea {
  const fx = (focal.x / 100) * imageWidth;
  const fy = (focal.y / 100) * imageHeight;

  let cropWidth = imageWidth;
  let cropHeight = imageHeight;

  if (imageWidth / imageHeight > aspectRatio) {
    cropHeight = imageHeight;
    cropWidth = cropHeight * aspectRatio;
  } else {
    cropWidth = imageWidth;
    cropHeight = cropWidth / aspectRatio;
  }

  let x = fx - cropWidth / 2;
  let y = fy - cropHeight / 2;

  x = Math.max(0, Math.min(x, imageWidth - cropWidth));
  y = Math.max(0, Math.min(y, imageHeight - cropHeight));

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight)
  };
}

export function suggestVariantFilename(originalPath: string): string {
  const lastSlash = originalPath.lastIndexOf('/');
  const dir = lastSlash >= 0 ? originalPath.slice(0, lastSlash + 1) : '';
  const file = lastSlash >= 0 ? originalPath.slice(lastSlash + 1) : originalPath;
  const dot = file.lastIndexOf('.');
  const base = dot >= 0 ? file.slice(0, dot) : file;
  const ext = dot >= 0 ? file.slice(dot) : '.png';
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return `${dir}${base}-variant-${stamp}${ext}`;
}

export function parseRangeProperty(value: string | null | undefined): {
  min?: number;
  max?: number;
  exact?: number;
} {
  if (!value) {
    return {};
  }
  try {
    const parsed = JSON.parse(value);
    const exact = parsed.exact ? Number(parsed.exact) : undefined;
    const min = parsed.min ? Number(parsed.min) : undefined;
    const max = parsed.max ? Number(parsed.max) : undefined;
    return {
      exact: Number.isFinite(exact) ? exact : undefined,
      min: Number.isFinite(min) ? min : undefined,
      max: Number.isFinite(max) ? max : undefined
    };
  } catch {
    return {};
  }
}

export function formatDimensionSpec(req: ImageRequirement): string {
  const parts: string[] = [];
  const w =
    req.widthExact != null
      ? `${req.widthExact}px`
      : req.widthMin != null || req.widthMax != null
        ? `${req.widthMin ?? '—'}–${req.widthMax ?? '—'}px`
        : null;
  const h =
    req.heightExact != null
      ? `${req.heightExact}px`
      : req.heightMin != null || req.heightMax != null
        ? `${req.heightMin ?? '—'}–${req.heightMax ?? '—'}px`
        : null;
  if (w) parts.push(`W: ${w}`);
  if (h) parts.push(`H: ${h}`);
  return parts.length ? parts.join(', ') : 'No size constraints';
}

export function imageMatchesRequirement(width: number, height: number, req: ImageRequirement): boolean {
  const check = (value: number, exact?: number, min?: number, max?: number) => {
    if (exact != null && value !== exact) return false;
    if (min != null && value < min) return false;
    if (max != null && value > max) return false;
    return true;
  };
  return check(width, req.widthExact, req.widthMin, req.widthMax) && check(height, req.heightExact, req.heightMin, req.heightMax);
}

function pickConstraintDimension(exact?: number, min?: number, max?: number): number | undefined {
  if (exact != null) {
    return exact;
  }
  if (max != null) {
    return max;
  }
  if (min != null) {
    return min;
  }
  return undefined;
}

export type ResolvedImageConstraints = {
  outputWidth?: number;
  outputHeight?: number;
  aspect?: number;
};

/** Resolve form constraints into editor targets (exact preferred, else max, else min). */
export function resolveImageConstraints(req: ImageRequirement): ResolvedImageConstraints | null {
  const outputWidth = pickConstraintDimension(req.widthExact, req.widthMin, req.widthMax);
  const outputHeight = pickConstraintDimension(req.heightExact, req.heightMin, req.heightMax);
  if (outputWidth == null && outputHeight == null) {
    return null;
  }
  const resolved: ResolvedImageConstraints = {};
  if (outputWidth != null) {
    resolved.outputWidth = outputWidth;
  }
  if (outputHeight != null) {
    resolved.outputHeight = outputHeight;
  }
  if (outputWidth != null && outputHeight != null) {
    resolved.aspect = outputWidth / outputHeight;
  }
  return resolved;
}

export function hasApplicableConstraints(req: ImageRequirement): boolean {
  return resolveImageConstraints(req) != null;
}

/** Max zoom so users can crop down to roughly minEdgePx on the long edge of the source image. */
export function computeCropMaxZoom(naturalWidth: number, naturalHeight: number, minEdgePx = 48): number {
  const maxDim = Math.max(naturalWidth, naturalHeight);
  if (!maxDim) {
    return 10;
  }
  return Math.min(20, Math.max(4, Math.ceil(maxDim / minEdgePx)));
}

export const ASPECT_PRESETS: Array<{ label: string; value: number | undefined }> = [
  { label: 'Free', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:2', value: 3 / 2 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '2:1', value: 2 }
];

export const FOCAL_PREVIEW_RATIOS = [
  { label: '16:9', ratio: 16 / 9 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '1:1', ratio: 1 },
  { label: '9:16', ratio: 9 / 16 }
];

export type EditorTool = 'crop' | 'focal' | 'adjust' | 'resize' | 'filters' | 'draw';

export const DEFAULT_FOCAL: FocalPoint = { x: 50, y: 50 };

export function clampFocal(point: Point): FocalPoint {
  return {
    x: Math.max(0, Math.min(100, point.x)),
    y: Math.max(0, Math.min(100, point.y))
  };
}
