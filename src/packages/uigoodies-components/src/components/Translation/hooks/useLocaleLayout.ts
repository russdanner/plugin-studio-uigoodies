/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */

import { useEffect, useState } from 'react';

import StudioAPI from '../api/studio';
import { MULTI_LOCALE_BASE_LOCALE, MULTI_LOCALE_CODES } from '../config/multiLocaleConfig';
import {
  baseLocaleRootPath,
  detectLocaleFolderNames,
  isMultiLocaleLayout,
  localeSegmentsCompatible
} from '../utils/localePathUtils';

export type LocaleLayoutInfo = {
  baseRootPath: string;
  locales: string[];
};

function pickBaseLocale(detected: string[]): string {
  const preferred = [MULTI_LOCALE_BASE_LOCALE, 'us', 'en-us', 'en-gb', 'uk'];
  for (const code of preferred) {
    const match = detected.find((d) => localeSegmentsCompatible(d, code));
    if (match) {
      return match;
    }
  }
  return detected[0] || MULTI_LOCALE_BASE_LOCALE;
}

/**
 * Detects multi-locale folder layout under `rootDir` (e.g. en, es under /site/website).
 * @param reloadToken Increment (e.g. refresh button) to re-fetch children and re-detect locale folders.
 */
export function useLocaleLayout(
  rootDir: string | null,
  siteId: string,
  authoringBase: string,
  reloadToken = 0
): LocaleLayoutInfo | null {
  const [localeLayout, setLocaleLayout] = useState<LocaleLayoutInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async function detectLocales() {
      if (!rootDir || !siteId || !authoringBase) {
        setLocaleLayout(null);
        return;
      }
      const paths = await StudioAPI.getChildrenPaths(authoringBase, siteId, rootDir);
      if (cancelled) {
        return;
      }
      const detected = detectLocaleFolderNames(paths, rootDir);
      if (!isMultiLocaleLayout(detected)) {
        setLocaleLayout(null);
        return;
      }
      const ordered: string[] = [];
      for (const code of MULTI_LOCALE_CODES) {
        const match = detected.find((d) => localeSegmentsCompatible(d, code));
        if (match && !ordered.some((o) => o.toLowerCase() === match.toLowerCase())) {
          ordered.push(match);
        }
      }
      const extra = detected.filter(
        (d) => !ordered.some((o) => o.toLowerCase() === d.toLowerCase())
      );
      const locales = [...ordered, ...extra];
      const base = pickBaseLocale(locales);
      setLocaleLayout({
        baseRootPath: baseLocaleRootPath(rootDir, base),
        locales
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [rootDir, siteId, authoringBase, reloadToken]);

  return localeLayout;
}
