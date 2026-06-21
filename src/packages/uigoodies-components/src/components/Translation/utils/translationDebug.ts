/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * Diagnostics when Studio hangs / OOM / excessive network:
 * - Browser devtools → Application → Local Storage → set key `translationDebug` = `1`, refresh Studio.
 * - Or widget `<configuration><translationDebug>true</translationDebug></configuration>`.
 */

export function isTranslationDebugStorage(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem('translationDebug') === '1';
  } catch {
    return false;
  }
}

export function isTranslationDebugConfig(cfg: Record<string, unknown> | undefined): boolean {
  if (!cfg) {
    return false;
  }
  const v = cfg.translationDebug ?? cfg.debug;
  return v === true || String(v).toLowerCase() === 'true';
}

/** Log when storage flag OR widget config enables debug. */
export function translationLog(cfg: Record<string, unknown> | undefined, ...args: unknown[]): void {
  if (!isTranslationDebugConfig(cfg) && !isTranslationDebugStorage()) {
    return;
  }
  // eslint-disable-next-line no-console
  console.log('[Translation]', ...args);
}
