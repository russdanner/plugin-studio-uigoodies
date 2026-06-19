/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import type { Area, Point } from 'react-easy-crop';
import Pica from 'pica';
import { getGlobalHeaders } from '@craftercms/studio-ui/utils/ajax';

export type ImageAdjustments = {
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
};

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
  flipVertical: false
};

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

export async function loadRepoImageAsDataUrl(
  siteId: string,
  assetPath: string,
  guestOrigin?: string | null
): Promise<string> {
  const urls: string[] = [];
  if (guestOrigin) {
    urls.push(`${guestOrigin.replace(/\/$/, '')}${assetPath}`);
  }
  urls.push(
    `/studio/api/2/content/get_content_by_commit_id?siteId=${encodeURIComponent(siteId)}&path=${encodeURIComponent(assetPath)}`
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

function createImage(url: string): Promise<HTMLImageElement> {
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

/** Apply rotation / flip transforms before cropping (react-easy-crop pattern). */
export async function getCroppedImageBlob(
  imageSrc: string,
  pixelCrop: Area,
  adjustments: ImageAdjustments,
  outputWidth?: number,
  outputHeight?: number,
  mimeType = 'image/png',
  quality = 0.92
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
  ctx.filter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`;
  ctx.drawImage(image, 0, 0);

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

  let resultCanvas = croppedCanvas;
  if (outputWidth && outputHeight && (outputWidth !== pixelCrop.width || outputHeight !== pixelCrop.height)) {
    const resized = document.createElement('canvas');
    resized.width = outputWidth;
    resized.height = outputHeight;
    const pica = Pica({ features: ['js', 'wasm'] });
    await pica.resize(croppedCanvas, resized, { quality: 3 });
    resultCanvas = resized;
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
): Area {
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

export type EditorTool = 'crop' | 'focal' | 'adjust' | 'resize';

export const DEFAULT_FOCAL: FocalPoint = { x: 50, y: 50 };

export function clampFocal(point: Point): FocalPoint {
  return {
    x: Math.max(0, Math.min(100, point.x)),
    y: Math.max(0, Math.min(100, point.y))
  };
}
