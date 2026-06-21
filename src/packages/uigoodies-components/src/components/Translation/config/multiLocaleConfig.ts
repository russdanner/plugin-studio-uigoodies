/**
 * Multi–locale folder layout under paths like /site/website and /site/components.
 * Adjust for your site (folder names must match repo locale roots).
 */
export const MULTI_LOCALE_BASE_LOCALE = 'en';

/** Locales to show in translation mode (order = UI order). Must match folder names under the root. */
export const MULTI_LOCALE_CODES = ['en', 'es', 'ja', 'zh'] as const;

export type MultiLocaleCode = (typeof MULTI_LOCALE_CODES)[number];

export const LOCALE_META: Record<
  string,
  {
    label: string;
    flag: string;
  }
> = {
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Spanish', flag: '🇪🇸' },
  ja: { label: 'Japanese', flag: '🇯🇵' },
  zh: { label: 'Chinese', flag: '🇨🇳' },
  de: { label: 'German', flag: '🇩🇪' },
  ar: { label: 'Arabic', flag: '🇸🇦' }
};

/**
 * Fallback map for locale flags. Supports 2-char and common 5-char codes.
 * Users should not need to configure flags in site-config.xml.
 */
export const LOCALE_FLAG_BY_CODE: Record<string, string> = {
  en: '🇺🇸',
  'en-us': '🇺🇸',
  'en-gb': '🇬🇧',
  es: '🇪🇸',
  'es-es': '🇪🇸',
  de: '🇩🇪',
  'de-de': '🇩🇪',
  zh: '🇨🇳',
  cn: '🇨🇳',
  'zh-cn': '🇨🇳',
  'zh-tw': '🇹🇼',
  ja: '🇯🇵',
  'ja-jp': '🇯🇵',
  fr: '🇫🇷',
  'fr-fr': '🇫🇷',
  it: '🇮🇹',
  'it-it': '🇮🇹',
  pt: '🇵🇹',
  'pt-pt': '🇵🇹',
  'pt-br': '🇧🇷',
  ko: '🇰🇷',
  'ko-kr': '🇰🇷',
  /** Arabic (language code); flag is Saudi Arabia — common default for `ar` in path folders. */
  ar: '🇸🇦',
  'ar-sa': '🇸🇦',
  'ar-ae': '🇦🇪',
  'ar-eg': '🇪🇬'
};

export function getFlagForLocale(localeCode: string): string {
  const k = String(localeCode || '').toLowerCase();
  if (!k) return '🌐';
  return LOCALE_FLAG_BY_CODE[k] ?? LOCALE_FLAG_BY_CODE[k.slice(0, 2)] ?? '🌐';
}

export type SiteTranslationConfig = {
  baseLanguage: string;
  languages: Array<{ locale: string; label: string; flag?: string }>;
};

/** Avoid redundant `setTranslationConfig` when API returns a new object with the same locale list (prevents load/effect loops). */
export function translationConfigsEqual(
  a: SiteTranslationConfig | null | undefined,
  b: SiteTranslationConfig | null | undefined
): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (a.baseLanguage !== b.baseLanguage) {
    return false;
  }
  if (a.languages.length !== b.languages.length) {
    return false;
  }
  for (let i = 0; i < a.languages.length; i += 1) {
    const x = a.languages[i];
    const y = b.languages[i];
    if (x.locale !== y.locale || x.label !== y.label) {
      return false;
    }
    const xf = x.flag ?? '';
    const yf = y.flag ?? '';
    if (xf !== yf) {
      return false;
    }
  }
  return true;
}

/** True when translation-config.xml defines at least a base locale and one target (two or more entries). */
export function hasConfiguredTranslationLocales(
  config: SiteTranslationConfig | null | undefined
): boolean {
  return (config?.languages?.filter((l) => Boolean(l.locale)).length ?? 0) >= 2;
}
