// shim

import { DetailedItem, SandboxItem } from '@craftercms/studio-ui';

export function isNavigable(item: DetailedItem | SandboxItem): boolean {
  if (item) {
    // Assets have a valid previewUrl but we don't want assets to show in the
    // Guest iFrame but rather as a preview dialog.
    return item.previewUrl !== null && item.systemType !== 'asset';
  }
  return false;
}

export function isEditableViaFormEditor(item: DetailedItem | SandboxItem): boolean {
  return ['page', 'component', 'taxonomy'].includes(item.systemType);
}

export function isImage(item: DetailedItem | SandboxItem): boolean {
  return item?.mimeType.startsWith('image/');
}

export function isPreviewable(item: DetailedItem | SandboxItem): boolean {
  return ['page', 'component', 'asset', 'renderingTemplate', 'script', 'taxonomy'].includes(item?.systemType);
}

export function isFolder(item: DetailedItem | SandboxItem): boolean {
  return item?.systemType === 'folder';
}

export function getEditorMode(item: DetailedItem | SandboxItem): 'ftl' | 'groovy' | 'javascript' | 'css' | 'text' {
  if (item.systemType === 'renderingTemplate') {
    return 'ftl';
  } else if (item.systemType === 'script') {
    return 'groovy';
  } else if (item.mimeType === 'application/javascript') {
    return 'javascript';
  } else if (item.mimeType === 'text/css') {
    return 'css';
  } else {
    return 'text';
  }
}

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
