/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import HttpUtils from '../utils/http';
import { getFlagForLocale, LOCALE_META, SiteTranslationConfig } from '../config/multiLocaleConfig';

/**
 * Same GET transport as `translation-versions` `studioAjaxGet`: `craftercms.utils.ajax` when present (preview/auth),
 * otherwise `@craftercms/studio-ui/utils/ajax` via HttpUtils.
 */
function studioPluginScriptGet(url: string): Promise<any> {
  try {
    const ajax = typeof window !== 'undefined' ? (window as any).craftercms?.utils?.ajax : null;
    if (ajax && typeof ajax.get === 'function') {
      return new Promise((resolve, reject) => {
        ajax.get(url).subscribe({
          next: (r: unknown) => resolve(r),
          error: (e: unknown) => reject(e)
        });
      });
    }
  } catch {
    /* ignore */
  }
  return HttpUtils.get(url);
}

/** Same unwrap + nested `result` as `translation-versions` (`unwrapAjaxResponse` + `fetchTranslationConfig` / `extractPathsFromPluginResult`). */
function parsePluginScriptPayload(res: any): any {
  if (res == null) {
    return null;
  }
  let body = res.response !== undefined ? res.response : res;
  if (body == null || typeof body !== 'object') {
    return null;
  }
  let p: any = body.result !== undefined ? body.result : body;
  if (p && typeof p === 'object' && p.result != null && p.ok === undefined) {
    p = p.result;
  }
  if (!p || typeof p !== 'object' || p.ok === undefined) {
    p = body.response?.result ?? p;
  }
  return p;
}

const API_GET_ITEM_TREE = '/api/1/services/api/1/content/get-items-tree.json';
const API_GET_CONTENT = '/api/1/services/api/1/content/get-content.json';
const API_CONTENT_EXISTS = '/api/1/services/api/1/content/content-exists.json';
const API_CREATE_FOLDER = '/api/1/services/api/1/content/create-folder.json';
const API_RENAME_FOLDER = '/api/1/services/api/1/content/rename-folder.json';
const API_TRANSLATION_SERVER_COPY = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-copy.post';
const API_TRANSLATION_REMOVE_CANDIDATES =
  '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove-candidates.post';
const API_TRANSLATION_REMOVE = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove.post';
const API_TRANSLATION_CONFIG = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-config.get';
/** Same as Studio `fetchConfigurationXML` — path under `module=studio` (file: `config/studio/translation-config.xml`). */
const API_GET_CONFIGURATION = '/api/2/configuration/get_configuration';
const CONFIG_STUDIO_TRANSLATION_XML_PATH = '/translation-config.xml';

function extractConfigurationXmlContent(res: any): string | null {
  if (res == null) {
    return null;
  }
  const inner = res.response !== undefined ? res.response : res;
  if (typeof inner?.content === 'string' && inner.content.trim()) {
    return inner.content;
  }
  if (typeof inner?.response?.content === 'string' && inner.response.content.trim()) {
    return inner.response.content;
  }
  return null;
}

function normalizeLookupKey(code: string): string {
  return String(code || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
}

/** Same as Groovy {@code folderLocaleFromKey}: full normalized tag (e.g. zh-cn, ar-sa). */
function folderLocaleFromKey(key: string): string {
  const k = String(key || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  return k || '';
}

function lookupLocaleMetaForUi(key: string): { label: string; flag: string } | null {
  const k = normalizeLookupKey(key);
  const direct = LOCALE_META[k];
  if (direct) {
    return { label: direct.label, flag: direct.flag };
  }
  if (k.length > 2) {
    const two = k.substring(0, 2);
    const fromTwo = LOCALE_META[two];
    if (fromTwo) {
      return { label: fromTwo.label, flag: fromTwo.flag };
    }
  }
  return null;
}

/**
 * Parse `translation-config.xml` the same way as `translation-config.get.groovy`
 * (2-char folder locales, default falls back to first listed).
 */
function parseTranslationConfigFromXml(xml: string): SiteTranslationConfig | null {
  const trimmed = String(xml || '').trim();
  if (!trimmed) {
    return null;
  }
  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(trimmed, 'text/xml');
  } catch {
    return null;
  }
  if (doc.querySelector('parsererror')) {
    return null;
  }
  const root = doc.querySelector('translation-config');
  if (!root) {
    return null;
  }
  const codesParent = root.querySelector('localeCodes');
  if (!codesParent) {
    return null;
  }
  const seen = new Set<string>();
  const languages: Array<{ locale: string; label: string; flag?: string }> = [];
  codesParent.querySelectorAll('localeCode').forEach((codeElm) => {
    const rawCode = (codeElm.textContent || '').trim();
    if (!rawCode) {
      return;
    }
    const key = normalizeLookupKey(rawCode);
    if (!key) {
      return;
    }
    const norm = folderLocaleFromKey(key);
    if (!norm) {
      return;
    }
    if (seen.has(norm)) {
      return;
    }
    seen.add(norm);
    const meta = lookupLocaleMetaForUi(key) || lookupLocaleMetaForUi(norm);
    const label = meta?.label ?? norm;
    const flag = meta?.flag ?? getFlagForLocale(norm);
    languages.push({ locale: norm, label, flag });
  });
  if (languages.length === 0) {
    return null;
  }
  const defaultCodeRaw = (root.querySelector('defaultLocaleCode')?.textContent || '').trim();
  const defaultKey = normalizeLookupKey(defaultCodeRaw);
  let normalizedDefault = defaultKey ? folderLocaleFromKey(defaultKey) : '';
  if (!normalizedDefault || !seen.has(normalizedDefault)) {
    normalizedDefault = languages[0].locale;
  }
  return { baseLanguage: normalizedDefault, languages };
}

async function getTranslationConfigFromStudioConfigurationApi(
  base: string,
  siteId: string
): Promise<SiteTranslationConfig | null> {
  const qs = [
    `siteId=${encodeURIComponent(siteId)}`,
    `module=${encodeURIComponent('studio')}`,
    `path=${encodeURIComponent(CONFIG_STUDIO_TRANSLATION_XML_PATH)}`,
    `environment=${encodeURIComponent('default')}`
  ].join('&');
  const url = `${base}${API_GET_CONFIGURATION}?${qs}`;
  try {
    const res = await studioPluginScriptGet(url);
    const status = (res as any)?.status ?? (res as any)?.statusCode;
    if (status != null && status !== 200) {
      return null;
    }
    const xml = extractConfigurationXmlContent(res);
    if (!xml) {
      return null;
    }
    return parseTranslationConfigFromXml(xml);
  } catch {
    return null;
  }
}

export type PreviewItemType = {
  name: string;
  path: string;
  contentType: string;
};

export type TranslationLocaleHints = {
  sourceLocaleCode: string;
  localeCode: string;
};

export type TranslationRemoveCandidate = {
  path: string;
  internalName?: string;
};

export type TranslationRemoveCandidatesResult = {
  ok: boolean;
  message?: string;
  candidates: TranslationRemoveCandidate[];
  pagePath?: string;
};

export type TranslationRemoveExecuteResult = {
  ok: boolean;
  deleted?: string[];
  failed?: Array<{ path?: string; message?: string }>;
};

function extractContentXmlString(body: any): string | null {
  if (body == null) {
    return null;
  }
  if (typeof body === 'string' && body.includes('<')) {
    return body;
  }
  const inner = body.response ?? body;
  if (typeof inner === 'string' && inner.includes('<')) {
    return inner;
  }
  const c = inner?.content ?? inner?.item?.content ?? inner?.text ?? inner?.xml;
  if (typeof c === 'string' && c.includes('<')) {
    return c;
  }
  return null;
}

function parseTranslationLocaleHintsFromXml(xml: string): TranslationLocaleHints {
  const pick = (tag: string): string => {
    const re = new RegExp(`<${tag}\\s*>([\\s\\S]*?)<\\/${tag}\\s*>`, 'i');
    const m = xml.match(re);
    if (!m) {
      return '';
    }
    let inner = String(m[1]).trim();
    const cdata = inner.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
    if (cdata) {
      inner = String(cdata[1]).trim();
    }
    return inner
      .replace(/<[^>]+>/g, '')
      .trim()
      .toLowerCase();
  };
  return {
    sourceLocaleCode: pick('sourceLocaleCode_s'),
    localeCode: pick('localeCode_s')
  };
}

function parseTimestampMs(input: any): number | null {
  if (input == null) {
    return null;
  }
  if (typeof input === 'number' && Number.isFinite(input)) {
    return input;
  }
  const asNum = Number(input);
  if (Number.isFinite(asNum) && asNum > 0) {
    return asNum;
  }
  const parsed = Date.parse(String(input));
  return Number.isFinite(parsed) ? parsed : null;
}

const StudioAPI = {
  /** Store path for the item currently shown in preview (toolbar / XB context). */
  getPreviewItem: function (previewItem: any): PreviewItemType {
    const p = previewItem ?? {};
    const path =
      (typeof p.path === 'string' && p.path.trim()) ||
      (typeof p.storeUrl === 'string' && p.storeUrl.trim()) ||
      (p.item && typeof p.item.path === 'string' && p.item.path.trim()) ||
      '';
    const name =
      (typeof p.label === 'string' && p.label) ||
      (typeof p.internalName === 'string' && p.internalName) ||
      (path ? path.replace(/^.*\//, '') : '');
    const contentType =
      (typeof p.contentTypeId === 'string' && p.contentTypeId) ||
      (typeof p.contentType === 'string' && p.contentType) ||
      '';
    return { name, path, contentType };
  },
  async contentExists(authoringBase: string, siteId: string, path: string): Promise<boolean> {
    const url = `${authoringBase}${API_CONTENT_EXISTS}?site_id=${encodeURIComponent(siteId)}&path=${encodeURIComponent(path)}`;
    try {
      const res = await HttpUtils.get(url);
      if (res.status === 200 && res.response) {
        const body = res.response;
        const flag = body.content ?? body.response?.content;
        if (flag != null) {
          return Boolean(flag);
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  async getChildrenPaths(authoringBase: string, siteId: string, path: string) {
    const url = `${authoringBase}${API_GET_ITEM_TREE}?site=${siteId}&path=${path}&depth=1`;
    try {
      const res = await HttpUtils.get(url);

      if (res.status === 200) {
        const raw = res.response?.item?.children;
        const list = Array.isArray(raw) ? raw : [];
        return list
          .filter((child) => child && child.path && child.path !== path)
          .map((child) => child.path);
      }
      return [];
    } catch (e) {
      return [];
    }
  },
  async getContentXml(authoringBase: string, siteId: string, path: string): Promise<string | null> {
    const url = `${authoringBase}${API_GET_CONTENT}?site_id=${encodeURIComponent(siteId)}&path=${encodeURIComponent(path)}`;
    try {
      const res = await HttpUtils.get(url);
      if (res.status !== 200) {
        return null;
      }
      const body = res.response ?? res;
      return extractContentXmlString(body);
    } catch {
      return null;
    }
  },

  /** Reads Translation locale fields from item XML (same semantics as translation-versions form `sourceLocaleCode_s`). */
  async getTranslationLocaleHints(authoringBase: string, siteId: string, path: string): Promise<TranslationLocaleHints> {
    const xml = await this.getContentXml(authoringBase, siteId, path);
    if (!xml) {
      return { sourceLocaleCode: '', localeCode: '' };
    }
    return parseTranslationLocaleHintsFromXml(xml);
  },

  async getItemModifiedTimestamp(authoringBase: string, siteId: string, path: string): Promise<number | null> {
    const url = `${authoringBase}${API_GET_ITEM_TREE}?site=${encodeURIComponent(siteId)}&path=${encodeURIComponent(path)}&depth=0`;
    try {
      const res = await HttpUtils.get(url);
      if (res.status !== 200) {
        return null;
      }
      const item = res.response?.item;
      if (!item) {
        return null;
      }
      return (
        parseTimestampMs(item.lastModifiedDate_dt) ??
        parseTimestampMs(item.lastModifiedDate) ??
        parseTimestampMs(item.lastEditDate) ??
        parseTimestampMs(item.modifiedDate) ??
        parseTimestampMs(item.dateModified) ??
        null
      );
    } catch (e) {
      return null;
    }
  },
  async copyItem(
    authoringBase: string,
    siteId: string,
    path: string,
    destinationPath: string,
    expectedTargetPath?: string
  ) {
    const url = `${authoringBase}${API_TRANSLATION_SERVER_COPY}?siteId=${encodeURIComponent(siteId)}`;
    const body = {
      sourcePath: path,
      targetParentPath: destinationPath,
      expectedTargetPath: expectedTargetPath || ''
    };

    try {
      const res = await HttpUtils.post(url, body);
      if (res.status !== 200) {
        return null;
      }
      const p = parsePluginScriptPayload(res);
      return p && typeof p === 'object' ? p : null;
    } catch (e) {
      return null;
    }
  },

  async fetchTranslationRemoveCandidates(
    authoringBase: string,
    siteId: string,
    pagePath: string
  ): Promise<TranslationRemoveCandidatesResult> {
    const url = `${authoringBase}${API_TRANSLATION_REMOVE_CANDIDATES}?siteId=${encodeURIComponent(siteId)}`;
    try {
      const res = await HttpUtils.post(url, { pagePath });
      if (res.status !== 200) {
        return { ok: false, candidates: [], message: `HTTP ${res.status}` };
      }
      const p = parsePluginScriptPayload(res);
      if (!p || typeof p !== 'object') {
        return { ok: false, candidates: [], message: 'Empty response' };
      }
      return {
        ok: Boolean(p.ok),
        message: typeof p.message === 'string' ? p.message : undefined,
        candidates: Array.isArray(p.candidates) ? p.candidates : [],
        pagePath: typeof p.pagePath === 'string' ? p.pagePath : pagePath
      };
    } catch {
      return { ok: false, candidates: [], message: 'Request failed' };
    }
  },

  async postTranslationRemove(
    authoringBase: string,
    siteId: string,
    pagePath: string,
    componentPaths: string[],
    deletePage = true
  ): Promise<TranslationRemoveExecuteResult> {
    const url = `${authoringBase}${API_TRANSLATION_REMOVE}?siteId=${encodeURIComponent(siteId)}`;
    try {
      const res = await HttpUtils.post(url, {
        pagePath,
        componentPaths: componentPaths ?? [],
        deletePage
      });
      if (res.status !== 200) {
        return { ok: false, deleted: [], failed: [{ message: `HTTP ${res.status}` }] };
      }
      const p = parsePluginScriptPayload(res);
      if (!p || typeof p !== 'object') {
        return { ok: false, deleted: [], failed: [{ message: 'Empty response' }] };
      }
      return {
        ok: Boolean(p.ok),
        deleted: Array.isArray(p.deleted) ? p.deleted : [],
        failed: Array.isArray(p.failed) ? p.failed : []
      };
    } catch {
      return { ok: false, deleted: [], failed: [{ message: 'Request failed' }] };
    }
  },
  async createFolder(authoringBase: string, siteId: string, path: string, name: string) {
    const url = `${authoringBase}${API_CREATE_FOLDER}?site=${siteId}&path=${path}&name=${name}`;
    const body = '';
    try {
      const res = await HttpUtils.post(url, body);
      if (res.status === 200) {
        return res.response;
      }
      return false;
    } catch (e) {
      return false;
    }
  },
  async renameFolder(authoringBase: string, siteId: string, path: string, name: string) {
    const url = `${authoringBase}${API_RENAME_FOLDER}?site=${siteId}&path=${path}&name=${name}`;
    const body = '';

    try {
      const res = await HttpUtils.post(url, body);
      if (res.status === 200) {
        return res.response;
      }
      return false;
    } catch (e) {
      return false;
    }
  },
  async getTranslationConfig(authoringBase: string, siteId: string, _ensureDefault = true): Promise<SiteTranslationConfig | null> {
    const base = String(authoringBase || '').replace(/\/$/, '');
    if (!base || !siteId) {
      return null;
    }
    const fromConfiguration = await getTranslationConfigFromStudioConfigurationApi(base, siteId);
    if (fromConfiguration && fromConfiguration.languages.length > 0) {
      return fromConfiguration;
    }
    const url = `${base}${API_TRANSLATION_CONFIG}?siteId=${encodeURIComponent(siteId)}`;
    try {
      const res = await studioPluginScriptGet(url);
      const status = (res as any)?.status ?? (res as any)?.statusCode;
      if (status != null && status !== 200) {
        return null;
      }
      const p: any = parsePluginScriptPayload(res);
      if (!p || !p.ok || !p.baseLanguage || !Array.isArray(p.languages)) {
        return null;
      }
      const languages = p.languages
        .map((row: any) => ({
          locale: String(row?.locale || '').toLowerCase(),
          label: String(row?.label || row?.locale || ''),
          ...(row?.flag != null && String(row.flag).trim() !== '' ? { flag: String(row.flag) } : {})
        }))
        .filter((row: { locale: string }) => row.locale);
      if (languages.length === 0) {
        return null;
      }
      const baseLanguage = String(p.baseLanguage).toLowerCase();
      return { baseLanguage, languages };
    } catch (e) {
      return null;
    }
  }
};

export default StudioAPI;
