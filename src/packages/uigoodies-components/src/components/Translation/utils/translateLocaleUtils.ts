import StudioAPI from '../api/studio';
import { LOCALE_META, MULTI_LOCALE_CODES } from '../config/multiLocaleConfig';
import {
  detectLocaleFolderNames,
  isMultiLocaleLayout,
  localeSegmentsCompatible,
  parentFolderPath,
  parseLocaleRelative,
  pathForLocale
} from './localePathUtils';

export type MissingLocaleTarget = {
  locale: string;
  label: string;
  flag: string;
  targetFilePath: string;
  destinationParentPath: string;
};

/** Every non-source configured locale with content-exists (for pickers that list all locales from translation-config.xml). */
export type LocaleTranslateTarget = MissingLocaleTarget & { exists: boolean };

/**
 * Ordered locale segments for mirrored paths.
 *
 * With `translation-config.xml` codes: at least two configured locales; every code is returned in order
 * (disk folder casing when present). Without site config codes, falls back to legacy detection: at least
 * two matching locale folders on disk including the default locale.
 *
 * Targets: every configured locale code is included in order. Missing folders still appear as targets
 * so authors can translate after creating `/site/website/{locale}/…`.
 */
export async function resolveLocaleFoldersOnSite(
  authoringBase: string,
  siteId: string,
  rootDir: string,
  configuredLocaleCodes?: string[],
  defaultLocaleCode?: string
): Promise<string[] | null> {
  const configured = (configuredLocaleCodes && configuredLocaleCodes.length > 0
    ? configuredLocaleCodes
    : [...MULTI_LOCALE_CODES]
  ).map((s) => String(s).toLowerCase());
  const paths = await StudioAPI.getChildrenPaths(authoringBase, siteId, rootDir);
  const detected = detectLocaleFolderNames(paths, rootDir, configured);
  const base = (defaultLocaleCode && String(defaultLocaleCode).trim()) || undefined;
  const fromSiteConfig = Boolean(configuredLocaleCodes && configuredLocaleCodes.length > 0);

  // When locales come from translation-config.xml, list every configured code (e.g. `de`)
  // even if that folder is not created yet — translate flow prompts to create it.
  if (fromSiteConfig) {
    if (configured.length < 2) {
      return null;
    }
    const primary: string[] = [];
    for (const code of configured) {
      const match = detected.find((d) => localeSegmentsCompatible(d, code));
      primary.push(match ?? code);
    }
    const extra = detected.filter((d) => !configured.some((c) => localeSegmentsCompatible(d, c)));
    return [...primary, ...extra];
  }

  if (!isMultiLocaleLayout(detected, base)) {
    return null;
  }
  const primary: string[] = [];
  for (const code of configured) {
    const match = detected.find((d) => localeSegmentsCompatible(d, code));
    primary.push(match ?? code);
  }
  const extra = detected.filter((d) => !configured.some((c) => localeSegmentsCompatible(d, c)));
  return [...primary, ...extra];
}

/**
 * Locales where the same relative path as `sourcePath` does not exist yet (excludes source locale).
 */
export async function listMissingLocaleTargets(
  authoringBase: string,
  siteId: string,
  sourcePath: string,
  rootDir: string,
  localeFolders: string[],
  localeMetaOverride?: Record<string, { label: string; flag: string }>
): Promise<MissingLocaleTarget[]> {
  const parsed = parseLocaleRelative(sourcePath, rootDir, localeFolders);
  if (!parsed) {
    return [];
  }
  const { locale: sourceLocale, relativeUnderLocale } = parsed;
  const out: MissingLocaleTarget[] = [];
  for (const loc of localeFolders) {
    if (localeSegmentsCompatible(loc, sourceLocale)) {
      continue;
    }
    const targetFilePath = pathForLocale(rootDir, relativeUnderLocale, loc);
    const exists = await StudioAPI.contentExists(authoringBase, siteId, targetFilePath);
    if (exists) {
      continue;
    }
    const meta =
      localeMetaOverride?.[loc.toLowerCase()] ??
      LOCALE_META[loc.toLowerCase()] ??
      { label: loc, flag: '🌐' };
    out.push({
      locale: loc,
      label: meta.label,
      flag: meta.flag,
      targetFilePath,
      destinationParentPath: parentFolderPath(targetFilePath)
    });
  }
  return out;
}

/**
 * All mirrored locale targets except the source locale (same paths as {@link listMissingLocaleTargets}),
 * including locales where the target file already exists (`exists: true`).
 */
export async function listAllLocaleTargets(
  authoringBase: string,
  siteId: string,
  sourcePath: string,
  rootDir: string,
  localeFolders: string[],
  localeMetaOverride?: Record<string, { label: string; flag: string }>
): Promise<LocaleTranslateTarget[]> {
  const parsed = parseLocaleRelative(sourcePath, rootDir, localeFolders);
  if (!parsed) {
    return [];
  }
  const { locale: sourceLocale, relativeUnderLocale } = parsed;
  const out: LocaleTranslateTarget[] = [];
  for (const loc of localeFolders) {
    if (localeSegmentsCompatible(loc, sourceLocale)) {
      continue;
    }
    const targetFilePath = pathForLocale(rootDir, relativeUnderLocale, loc);
    const exists = await StudioAPI.contentExists(authoringBase, siteId, targetFilePath);
    const meta =
      localeMetaOverride?.[loc.toLowerCase()] ??
      LOCALE_META[loc.toLowerCase()] ??
      { label: loc, flag: '🌐' };
    out.push({
      locale: loc,
      label: meta.label,
      flag: meta.flag,
      targetFilePath,
      destinationParentPath: parentFolderPath(targetFilePath),
      exists
    });
  }
  return out;
}
