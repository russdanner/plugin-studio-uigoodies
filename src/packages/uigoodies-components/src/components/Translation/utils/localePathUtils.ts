import { MULTI_LOCALE_BASE_LOCALE, MULTI_LOCALE_CODES } from '../config/multiLocaleConfig';

/** True if a repo locale folder segment matches a configured locale code (exact or zh ↔ zh-cn style). */
export function localeSegmentsCompatible(a: string, b: string): boolean {
  const s = String(a || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  const c = String(b || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  if (!s || !c) {
    return false;
  }
  if (s === c) {
    return true;
  }
  if (s.startsWith(`${c}-`)) {
    return true;
  }
  if (c.startsWith(`${s}-`)) {
    return true;
  }
  return false;
}

export function pathLastSegment(path: string): string {
  const parts = path.split('/').filter(Boolean);
  return parts[parts.length - 1] || path;
}

const DEFAULT_WEBSITE_PATH = '/site/website';
const DEFAULT_COMPONENT_PATH = '/site/components';

/** Repo root for locale folders from a full content path. */
export function getWebsiteComponentsRootDir(fullPath: string | null | undefined): string | null {
  if (!fullPath) {
    return null;
  }
  const withSite = fullPath.match(/^(\/site\/[^/]+\/(?:website|components))(?=\/|$)/i);
  if (withSite) {
    return withSite[1];
  }
  if (fullPath.startsWith(DEFAULT_WEBSITE_PATH)) {
    return DEFAULT_WEBSITE_PATH;
  }
  if (fullPath.startsWith(DEFAULT_COMPONENT_PATH)) {
    return DEFAULT_COMPONENT_PATH;
  }
  const bare = fullPath.match(/^(\/site\/(?:website|components))(?=\/|$)/i);
  return bare ? bare[1] : null;
}

/**
 * Returns locale folder names found as direct children of rootDir (e.g. en, es under /site/website).
 * @param allowedLocaleCodes When set (e.g. from `translation-config.xml`), only these folder names count;
 *   otherwise falls back to `MULTI_LOCALE_CODES` from the plugin bundle.
 */
export function detectLocaleFolderNames(
  childPaths: string[],
  rootDir: string,
  allowedLocaleCodes?: string[]
): string[] {
  const codes =
    allowedLocaleCodes && allowedLocaleCodes.length > 0 ? allowedLocaleCodes : [...MULTI_LOCALE_CODES];
  const prefix = rootDir.endsWith('/') ? rootDir : `${rootDir}/`;
  const names: string[] = [];
  for (const p of childPaths) {
    if (!p.startsWith(prefix)) {
      continue;
    }
    const rest = p.slice(prefix.length);
    const seg = rest.split('/').filter(Boolean)[0];
    if (seg && codes.some((code) => localeSegmentsCompatible(seg, code))) {
      names.push(seg);
    }
  }
  return Array.from(new Set(names));
}

/** At least two configured locale folders on disk, including the site default locale (from config or `en`). */
export function isMultiLocaleLayout(localeFolders: string[], baseLocale?: string): boolean {
  if (localeFolders.length < 2) {
    return false;
  }
  const base = (baseLocale || MULTI_LOCALE_BASE_LOCALE).toLowerCase();
  const lower = localeFolders.map((s) => s.toLowerCase());
  return lower.includes(base);
}

export function baseLocaleRootPath(rootDir: string, baseLocale: string = MULTI_LOCALE_BASE_LOCALE): string {
  const base = rootDir.replace(/\/$/, '');
  return `${base}/${baseLocale}`;
}

/**
 * Path under the base locale root, including leading slash (e.g. "/articles/foo.xml").
 * Null if fullPath is not under baseRoot.
 */
export function relativePathUnderBase(fullPath: string, baseRoot: string): string | null {
  const br = baseRoot.replace(/\/$/, '');
  const fp = fullPath.replace(/\/$/, '');
  if (fp === br) {
    return '';
  }
  if (!fp.startsWith(`${br}/`)) {
    return null;
  }
  return fp.slice(br.length);
}

/**
 * Full repo path for the same relative path in another locale folder.
 */
export function pathForLocale(rootDir: string, relativeUnderBase: string, locale: string): string {
  const r = rootDir.replace(/\/$/, '');
  const suffix = relativeUnderBase === '' ? '' : relativeUnderBase.startsWith('/') ? relativeUnderBase : `/${relativeUnderBase}`;
  return `${r}/${locale}${suffix}`;
}

export function parentFolderPath(fileOrFolderPath: string): string {
  const i = fileOrFolderPath.lastIndexOf('/');
  if (i <= 0) {
    return '/';
  }
  return fileOrFolderPath.slice(0, i) || '/';
}

/**
 * Parse `fullPath` under `rootDir` when the first segment is a locale folder (e.g. en, es).
 * @returns locale folder name and path under that locale (starts with `/`, or empty if path is the locale root).
 */
export function parseLocaleRelative(
  fullPath: string,
  rootDir: string,
  localeFolderNames: string[]
): { locale: string; relativeUnderLocale: string } | null {
  const rd = rootDir.replace(/\/$/, '');
  const norm = fullPath.replace(/\/$/, '');
  if (!norm.startsWith(`${rd}/`) && norm !== rd) {
    return null;
  }
  const rest = norm === rd ? '' : norm.slice(rd.length + 1);
  if (!rest) {
    return null;
  }
  const parts = rest.split('/').filter(Boolean);
  const first = parts[0];
  const match = localeFolderNames.find((l) => localeSegmentsCompatible(first, l));
  if (!match) {
    return null;
  }
  const tail = parts.slice(1);
  const relativeUnderLocale = tail.length ? `/${tail.join('/')}` : '';
  return { locale: match, relativeUnderLocale };
}

/**
 * First directory segment under the locale root (null if the path is a single segment file/folder at locale root).
 */
export function firstFolderUnderLocale(relativeUnderLocale: string): string | null {
  const r = relativeUnderLocale.replace(/^\/+/, '');
  if (!r) {
    return null;
  }
  const parts = r.split('/').filter(Boolean);
  if (parts.length < 2) {
    return null;
  }
  return parts[0];
}
