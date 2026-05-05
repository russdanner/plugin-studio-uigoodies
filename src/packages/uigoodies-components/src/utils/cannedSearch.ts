/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

/** Merge `configuration` from ui.xml onto props (Studio passes both on plugin widgets). */
export function mergePluginConfiguration(props: Record<string, unknown>): Record<string, unknown> {
  const { configuration, ...rest } = props;
  const conf = configuration && typeof configuration === 'object' ? (configuration as Record<string, unknown>) : {};
  return { ...rest, ...conf };
}

/** Default: open Studio search in a new tab (matches legacy cannedsearch behavior). */
export function openInNewTabDefault(value: unknown): boolean {
  if (value === false || value === 0) {
    return false;
  }
  if (value === true || value === 1) {
    return true;
  }
  if (typeof value === 'string') {
    const s = value.toLowerCase().trim();
    if (s === 'false' || s === '0') {
      return false;
    }
    if (s === 'true' || s === '1') {
      return true;
    }
  }
  return true;
}

export function openCannedSearchStudioSearch(searchParams: string): void {
  const urlRoot = `${window.location.protocol}//${window.location.host}`;
  let windowUrl = `${urlRoot}/studio/search#/`;
  if (searchParams && searchParams.trim() !== '') {
    windowUrl += `?${searchParams}`;
  }
  window.open(windowUrl, '_studioSearch');
}
