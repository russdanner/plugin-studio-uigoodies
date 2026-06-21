import { fetchContentXML, writeContent } from '@craftercms/studio-ui/services/content';
import { firstValueFrom } from 'rxjs';

import StudioAPI from './api/studio';
import type { TranslationConfigModel } from './translationConfigSupport';

export const GLOBAL_HOME_PATH = '/site/website/index.xml';
export const WEBSITE_ROOT = '/site/website';
export const COMPONENTS_ROOT = '/site/components';

export const GLOBAL_HOME_INTERNAL_NAME = 'Global Home';

export type LocaleScaffoldAction = 'created' | 'updated' | 'skipped';

export type LocaleScaffoldRow = {
  locale: string;
  path: string;
  action: LocaleScaffoldAction;
  message?: string;
};

export type ScaffoldLocaleSiteResult = {
  ok: boolean;
  message: string;
  globalHomeUpdated: boolean;
  componentFoldersCreated: string[];
  locales: LocaleScaffoldRow[];
  errors: string[];
};

function newObjectId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getXmlElementText(xml: string, localName: string): string {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    return '';
  }
  const el = doc.documentElement.querySelector(`:scope > ${localName}`);
  return (el?.textContent || '').trim();
}

function objectGroupIdFrom(objectId: string): string {
  const id = String(objectId || '').trim();
  return id.length >= 4 ? id.substring(0, 4) : id;
}

function applyXmlFieldPatches(
  xml: string,
  patches: Record<string, string>,
  options?: { objectId?: string }
): string {
  let next = xml;
  for (const [tag, value] of Object.entries(patches)) {
    next = upsertXmlElementText(next, tag, value);
  }
  if (options?.objectId) {
    next = upsertXmlElementText(next, 'objectId', options.objectId);
    next = upsertXmlElementText(next, 'objectGroupId', objectGroupIdFrom(options.objectId));
  }
  return next;
}

function upsertXmlElementText(xml: string, localName: string, value: string): string {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid content XML');
  }
  const root = doc.documentElement;
  let el = root.querySelector(`:scope > ${localName}`);
  if (!el) {
    el = doc.createElement(localName);
    const anchor =
      root.querySelector(':scope > objectId') ||
      root.querySelector(':scope > merge-strategy') ||
      root.querySelector(':scope > file-name');
    if (anchor?.nextSibling) {
      root.insertBefore(el, anchor.nextSibling);
    } else if (anchor) {
      root.appendChild(el);
    } else {
      root.insertBefore(el, root.firstChild);
    }
  }
  el.textContent = value;
  const body = new XMLSerializer().serializeToString(doc);
  if (xml.trimStart().startsWith('<?xml') && !body.trimStart().startsWith('<?xml')) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n${body}`;
  }
  return body;
}

export function localeHomeInternalName(locale: string): string {
  return `Home (${String(locale || '').trim().toUpperCase()})`;
}

function localeFolderName(locale: string, configuredLocales: string[]): string {
  const key = String(locale || '')
    .trim()
    .toLowerCase();
  const match = configuredLocales.find((c) => c.toLowerCase() === key);
  return match ?? key;
}

async function writeStoreContent(siteId: string, path: string, xml: string): Promise<void> {
  await firstValueFrom(writeContent(siteId, path, xml));
}

async function patchStoreContent(
  siteId: string,
  path: string,
  patches: Record<string, string>,
  options?: { objectId?: string }
): Promise<boolean> {
  const current = await firstValueFrom(fetchContentXML(siteId, path));
  if (!current?.trim()) {
    return false;
  }
  const next = applyXmlFieldPatches(current, patches, options);
  if (next === current) {
    return false;
  }
  await writeStoreContent(siteId, path, next);
  return true;
}

async function localeHomeUsesLocaleSourceId(
  siteId: string,
  authoringBase: string,
  configuredCodes: string[],
  localeSourceId: string
): Promise<boolean> {
  if (!localeSourceId) {
    return false;
  }
  for (const locale of configuredCodes) {
    const folder = localeFolderName(locale, configuredCodes);
    const path = `${WEBSITE_ROOT}/${folder}/index.xml`;
    const exists = await StudioAPI.contentExists(authoringBase, siteId, path);
    if (!exists) {
      continue;
    }
    const xml = await firstValueFrom(fetchContentXML(siteId, path));
    if (getXmlElementText(xml, 'localeSourceId_s') === localeSourceId) {
      return true;
    }
  }
  return false;
}

async function readLocaleHomeLineageId(
  siteId: string,
  authoringBase: string,
  configuredCodes: string[],
  excludeLocaleSourceIds: string[] = []
): Promise<string | null> {
  const excluded = new Set(excludeLocaleSourceIds.filter(Boolean));
  for (const locale of configuredCodes) {
    const folder = localeFolderName(locale, configuredCodes);
    const path = `${WEBSITE_ROOT}/${folder}/index.xml`;
    const exists = await StudioAPI.contentExists(authoringBase, siteId, path);
    if (!exists) {
      continue;
    }
    const xml = await firstValueFrom(fetchContentXML(siteId, path));
    const lineageId = getXmlElementText(xml, 'localeSourceId_s');
    if (lineageId && !excluded.has(lineageId)) {
      return lineageId;
    }
  }
  return null;
}

async function ensureComponentLocaleFolders(
  authoringBase: string,
  siteId: string,
  locales: string[],
  configuredLocales: string[]
): Promise<string[]> {
  const created: string[] = [];
  const componentsExists = await StudioAPI.contentExists(authoringBase, siteId, COMPONENTS_ROOT);
  if (!componentsExists) {
    return created;
  }
  for (const locale of locales) {
    const folder = localeFolderName(locale, configuredLocales);
    const folderPath = `${COMPONENTS_ROOT}/${folder}`;
    const exists = await StudioAPI.contentExists(authoringBase, siteId, folderPath);
    if (exists) {
      continue;
    }
    const res = await StudioAPI.createFolder(authoringBase, siteId, COMPONENTS_ROOT, folder);
    if (res) {
      created.push(folderPath);
    }
  }
  return created;
}

/**
 * Copies the global home page into each configured locale folder and renames items for translation layout.
 *
 * - `/site/website/index.xml` → internal-name **Global Home** (standalone; not in the locale-home translation set)
 * - `/site/website/{locale}/index.xml` → internal-name **Home (LOCALE)** sharing one `localeSourceId_s` among locales
 * - Each locale home gets a unique `objectId` when created (via translation-copy); duplicates vs global are fixed on update
 * - Creates empty `/site/components/{locale}/` folders when `/site/components` exists
 */
export async function scaffoldLocaleSiteStructure(
  siteId: string,
  authoringBase: string,
  config: TranslationConfigModel
): Promise<ScaffoldLocaleSiteResult> {
  const errors: string[] = [];
  const locales: LocaleScaffoldRow[] = [];
  const configuredCodes = config.languages.map((row) => row.locale);

  if (!siteId || !authoringBase) {
    return { ok: false, message: 'Site and authoring context are required.', globalHomeUpdated: false, componentFoldersCreated: [], locales, errors };
  }
  if (configuredCodes.length < 2) {
    return {
      ok: false,
      message: 'Save at least two locales in translation-config.xml first.',
      globalHomeUpdated: false,
      componentFoldersCreated: [],
      locales,
      errors
    };
  }

  const globalExists = await StudioAPI.contentExists(authoringBase, siteId, GLOBAL_HOME_PATH);
  if (!globalExists) {
    return {
      ok: false,
      message: `Global home not found at ${GLOBAL_HOME_PATH}. Create a site home page there first.`,
      globalHomeUpdated: false,
      componentFoldersCreated: [],
      locales,
      errors
    };
  }

  let globalHomeUpdated = false;
  const baseLanguage = config.baseLanguage || configuredCodes[0];
  let globalObjectId = '';
  let globalLocaleSourceId = '';
  let localeHomeLineageId = '';

  try {
    const globalXml = await firstValueFrom(fetchContentXML(siteId, GLOBAL_HOME_PATH));
    if (!globalXml?.trim()) {
      throw new Error(`Could not read ${GLOBAL_HOME_PATH}`);
    }
    globalObjectId = getXmlElementText(globalXml, 'objectId') || newObjectId();
    const globalLsidFromXml = getXmlElementText(globalXml, 'localeSourceId_s');
    globalLocaleSourceId = globalLsidFromXml || newObjectId();

    const existingLocaleLineageId = await readLocaleHomeLineageId(siteId, authoringBase, configuredCodes, [
      globalLsidFromXml,
      globalObjectId
    ]);
    localeHomeLineageId = existingLocaleLineageId || newObjectId();

    // Global home is not a translation sibling of locale homes — keep lineage ids separate.
    if (globalLocaleSourceId === localeHomeLineageId) {
      globalLocaleSourceId = newObjectId();
    }
    if (await localeHomeUsesLocaleSourceId(siteId, authoringBase, configuredCodes, globalLocaleSourceId)) {
      globalLocaleSourceId = newObjectId();
    }

    const patchedGlobal = applyXmlFieldPatches(globalXml, {
      'internal-name': GLOBAL_HOME_INTERNAL_NAME,
      localeSourceId_s: globalLocaleSourceId,
      localeCode_s: baseLanguage,
      sourceLocaleCode_s: baseLanguage
    });
    if (patchedGlobal !== globalXml) {
      await writeStoreContent(siteId, GLOBAL_HOME_PATH, patchedGlobal);
      globalHomeUpdated = true;
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    errors.push(`Global home: ${msg}`);
    return {
      ok: false,
      message: `Failed to update global home: ${msg}`,
      globalHomeUpdated: false,
      componentFoldersCreated: [],
      locales,
      errors
    };
  }

  let componentFoldersCreated: string[] = [];
  try {
    componentFoldersCreated = await ensureComponentLocaleFolders(
      authoringBase,
      siteId,
      configuredCodes,
      configuredCodes
    );
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  for (const locale of configuredCodes) {
    const folder = localeFolderName(locale, configuredCodes);
    const targetPath = `${WEBSITE_ROOT}/${folder}/index.xml`;
    const targetParent = `${WEBSITE_ROOT}/${folder}`;
    const displayName = localeHomeInternalName(folder);

    try {
      const targetExists = await StudioAPI.contentExists(authoringBase, siteId, targetPath);
      if (targetExists) {
        const localeXml = await firstValueFrom(fetchContentXML(siteId, targetPath));
        const localeObjectId = getXmlElementText(localeXml, 'objectId');
        const needsNewObjectId = Boolean(globalObjectId && localeObjectId && localeObjectId === globalObjectId);
        const updated = await patchStoreContent(
          siteId,
          targetPath,
          {
            'internal-name': displayName,
            localeSourceId_s: localeHomeLineageId,
            localeCode_s: folder.toLowerCase(),
            sourceLocaleCode_s: baseLanguage,
            'folder-name': folder
          },
          needsNewObjectId ? { objectId: newObjectId() } : undefined
        );
        locales.push({
          locale: folder,
          path: targetPath,
          action: updated ? 'updated' : 'skipped',
          message: updated
            ? needsNewObjectId
              ? 'Updated metadata and assigned a new objectId'
              : 'Updated labels and locale metadata'
            : 'Already present'
        });
        continue;
      }

      const copyRes = await StudioAPI.copyItem(
        authoringBase,
        siteId,
        GLOBAL_HOME_PATH,
        targetParent,
        targetPath
      );
      const pastedPath = (copyRes?.pastedPath || copyRes?.items?.[0]) as string | undefined;
      if (!copyRes?.ok || !pastedPath) {
        errors.push(`${folder}: ${copyRes?.message || 'Copy failed'}`);
        locales.push({
          locale: folder,
          path: targetPath,
          action: 'skipped',
          message: copyRes?.message || 'Copy failed'
        });
        continue;
      }

      await patchStoreContent(siteId, pastedPath, {
        'internal-name': displayName,
        localeSourceId_s: localeHomeLineageId,
        localeCode_s: folder.toLowerCase(),
        sourceLocaleCode_s: baseLanguage,
        'folder-name': folder
      });

      locales.push({
        locale: folder,
        path: pastedPath,
        action: 'created',
        message: 'Copied from global home'
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      errors.push(`${folder}: ${msg}`);
      locales.push({ locale: folder, path: targetPath, action: 'skipped', message: msg });
    }
  }

  const createdCount = locales.filter((row) => row.action === 'created').length;
  const updatedCount = locales.filter((row) => row.action === 'updated').length;
  const ok = errors.length === 0;

  const parts: string[] = [];
  if (globalHomeUpdated) {
    parts.push('global home renamed to Global Home');
  }
  if (createdCount) {
    parts.push(`${createdCount} locale home page(s) created`);
  }
  if (updatedCount) {
    parts.push(`${updatedCount} locale home page(s) updated`);
  }
  if (componentFoldersCreated.length) {
    parts.push(`${componentFoldersCreated.length} component locale folder(s) created`);
  }

  const message = ok
    ? parts.length
      ? parts.join('; ')
      : 'Locale site structure is already in place.'
    : `Completed with ${errors.length} error(s). ${parts.join('; ')}`;

  return {
    ok,
    message,
    globalHomeUpdated,
    componentFoldersCreated,
    locales,
    errors
  };
}
