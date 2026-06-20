/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CanvasViewTransform = {
  zoom: number;
  panX: number;
  panY: number;
};

export const DEFAULT_CANVAS_VIEW: CanvasViewTransform = { zoom: 1, panX: 0, panY: 0 };

export const MIN_CANVAS_ZOOM = 0.25;
export const MAX_CANVAS_ZOOM = 6;

export function clampCanvasZoom(zoom: number): number {
  return Math.min(MAX_CANVAS_ZOOM, Math.max(MIN_CANVAS_ZOOM, zoom));
}

export type ImageLayout = {
  containerWidth: number;
  containerHeight: number;
  offsetX: number;
  offsetY: number;
  scale: number;
  fitScale: number;
  imageWidth: number;
  imageHeight: number;
};

export function computeImageLayout(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
  view: CanvasViewTransform = { zoom: 1, panX: 0, panY: 0 }
): ImageLayout {
  const fitScale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
  const scale = fitScale * view.zoom;
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  return {
    containerWidth,
    containerHeight,
    offsetX: (containerWidth - drawWidth) / 2 + view.panX,
    offsetY: (containerHeight - drawHeight) / 2 + view.panY,
    scale,
    fitScale,
    imageWidth,
    imageHeight
  };
}

/** Zoom toward a display-space point (e.g. cursor) so that point stays fixed on the image. */
export function zoomViewAtPoint(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
  view: CanvasViewTransform,
  displayX: number,
  displayY: number,
  newZoom: number
): CanvasViewTransform {
  const zoom = clampCanvasZoom(newZoom);
  const layout = computeImageLayout(containerWidth, containerHeight, imageWidth, imageHeight, view);
  const imgX = (displayX - layout.offsetX) / layout.scale;
  const imgY = (displayY - layout.offsetY) / layout.scale;
  const fitScale = layout.fitScale;
  const scale = fitScale * zoom;
  const panX = displayX - imgX * scale - (containerWidth - imageWidth * scale) / 2;
  const panY = displayY - imgY * scale - (containerHeight - imageHeight * scale) / 2;
  return { zoom, panX, panY };
}

export function imageToDisplay(x: number, y: number, layout: ImageLayout): { x: number; y: number } {
  return {
    x: layout.offsetX + x * layout.scale,
    y: layout.offsetY + y * layout.scale
  };
}

export function displayToImage(
  displayX: number,
  displayY: number,
  layout: ImageLayout,
  clamp = true
): { x: number; y: number } | null {
  const x = (displayX - layout.offsetX) / layout.scale;
  const y = (displayY - layout.offsetY) / layout.scale;
  if (!clamp) {
    return { x, y };
  }
  if (x < 0 || y < 0 || x > layout.imageWidth || y > layout.imageHeight) {
    return null;
  }
  return {
    x: Math.max(0, Math.min(layout.imageWidth, x)),
    y: Math.max(0, Math.min(layout.imageHeight, y))
  };
}

export function clientToImage(
  clientX: number,
  clientY: number,
  containerRect: DOMRect,
  layout: ImageLayout,
  clamp = true
): { x: number; y: number } | null {
  const displayX = clientX - containerRect.left;
  const displayY = clientY - containerRect.top;
  return displayToImage(displayX, displayY, layout, clamp);
}

export function clampCropArea(
  area: CropArea,
  imageWidth: number,
  imageHeight: number,
  minSize = 8
): CropArea {
  let width = Math.max(minSize, Math.min(area.width, imageWidth));
  let height = Math.max(minSize, Math.min(area.height, imageHeight));
  let x = Math.max(0, Math.min(area.x, imageWidth - width));
  let y = Math.max(0, Math.min(area.y, imageHeight - height));
  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height)
  };
}

export function fullImageCrop(imageWidth: number, imageHeight: number): CropArea {
  return { x: 0, y: 0, width: imageWidth, height: imageHeight };
}

export function cropAreaWithAspect(
  area: CropArea,
  aspect: number | undefined,
  imageWidth: number,
  imageHeight: number
): CropArea {
  if (!aspect) {
    return clampCropArea(area, imageWidth, imageHeight);
  }
  const centerX = area.x + area.width / 2;
  const centerY = area.y + area.height / 2;
  let width = area.width;
  let height = width / aspect;
  if (height > imageHeight) {
    height = imageHeight;
    width = height * aspect;
  }
  if (width > imageWidth) {
    width = imageWidth;
    height = width / aspect;
  }
  let x = centerX - width / 2;
  let y = centerY - height / 2;
  return clampCropArea({ x, y, width, height }, imageWidth, imageHeight);
}

export function resizeCropToDimensions(
  area: CropArea,
  targetWidth: number,
  targetHeight: number,
  imageWidth: number,
  imageHeight: number,
  aspect: number | undefined
): CropArea {
  let width = Math.max(8, Math.min(targetWidth, imageWidth));
  let height = Math.max(8, Math.min(targetHeight, imageHeight));
  if (aspect) {
    height = width / aspect;
    if (height > imageHeight) {
      height = imageHeight;
      width = height * aspect;
    }
  }
  const centerX = area.x + area.width / 2;
  const centerY = area.y + area.height / 2;
  let x = centerX - width / 2;
  let y = centerY - height / 2;
  return clampCropArea({ x, y, width, height }, imageWidth, imageHeight);
}
