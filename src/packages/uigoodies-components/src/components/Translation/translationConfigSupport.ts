import { LOCALE_META } from './config/multiLocaleConfig';

export const TRANSLATION_CONFIG_PATH = '/translation-config.xml';
export const TRANSLATION_CONFIG_MODULE = 'studio';
export const UIGOODIES_PLUGIN_ID = 'org.rd.plugin.uigoodies';

export type LocaleRow = { locale: string; label: string; flag: string };

export type TranslationConfigModel = {
  baseLanguage: string;
  languages: LocaleRow[];
};

export type TranslationFieldStatus = {
  hasTranslationSection: boolean;
  hasLocaleCode: boolean;
  hasSourceLocaleCode: boolean;
  hasLocaleSourceId: boolean;
  hasCustomLocaleControl: boolean;
  hasTranslationVersions: boolean;
  hasTranslationsField: boolean;
  /** Resolved section title found or created (when present). */
  sectionTitle?: string;
  complete: boolean;
  missing: string[];
};

/**
 * Options for scanning / patching Translation form sections on content types.
 * Prefer an existing section title (e.g. Smart Copy’s “Alternative Locale Properties”)
 * when present; otherwise create {@link sectionTitle}.
 */
export type TranslationFormSectionOptions = {
  /** Title used when creating a new section. Default: {@link DEFAULT_TRANSLATION_SECTION_TITLE}. */
  sectionTitle?: string;
  /**
   * Prefer these section titles when they already exist (first match wins).
   * Default: {@link DEFAULT_PREFERRED_EXISTING_SECTION_TITLES}.
   */
  preferExistingSectionTitles?: string[];
};

export const DEFAULT_TRANSLATION_SECTION_TITLE = 'Translation';

/** Legacy / Smart Copy section title reused when present so Fix does not rename it. */
export const DEFAULT_PREFERRED_EXISTING_SECTION_TITLES: readonly string[] = [
  'Alternative Locale Properties'
];

export type ResolvedTranslationFormSectionOptions = {
  /** Title for a newly created section. */
  createTitle: string;
  /** Existing titles to prefer (display casing preserved). */
  preferExisting: string[];
  /** All accepted titles for match (create + prefer), lowercased unique. */
  acceptedLower: Set<string>;
};

export function resolveTranslationFormSectionOptions(
  options?: TranslationFormSectionOptions | null
): ResolvedTranslationFormSectionOptions {
  const createTitle =
    String(options?.sectionTitle ?? DEFAULT_TRANSLATION_SECTION_TITLE).trim() ||
    DEFAULT_TRANSLATION_SECTION_TITLE;
  const preferRaw =
    options?.preferExistingSectionTitles !== undefined
      ? options.preferExistingSectionTitles
      : [...DEFAULT_PREFERRED_EXISTING_SECTION_TITLES];
  const preferExisting: string[] = [];
  const seenPrefer = new Set<string>();
  for (const raw of preferRaw) {
    const title = String(raw || '').trim();
    if (!title) {
      continue;
    }
    const key = title.toLowerCase();
    if (seenPrefer.has(key) || key === createTitle.toLowerCase()) {
      continue;
    }
    seenPrefer.add(key);
    preferExisting.push(title);
  }
  const acceptedLower = new Set<string>([
    createTitle.toLowerCase(),
    ...preferExisting.map((t) => t.toLowerCase())
  ]);
  return { createTitle, preferExisting, acceptedLower };
}

function sectionTitleText(section: Element): string {
  return (section.querySelector(':scope > title')?.textContent || '').trim();
}

function isAcceptedTranslationSectionTitle(
  title: string,
  resolved: ResolvedTranslationFormSectionOptions
): boolean {
  return resolved.acceptedLower.has(title.trim().toLowerCase());
}

/**
 * Pick the section title to keep/create: first preferred title that already exists on the form,
 * else an existing createTitle section, else createTitle for a new section.
 */
export function resolveTargetTranslationSectionTitle(
  doc: Document,
  options?: TranslationFormSectionOptions | null
): string {
  const resolved = resolveTranslationFormSectionOptions(options);
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    return resolved.createTitle;
  }
  const titles = Array.from(sections.querySelectorAll(':scope > section')).map(sectionTitleText);
  for (const preferred of resolved.preferExisting) {
    if (titles.some((t) => t.toLowerCase() === preferred.toLowerCase())) {
      return preferred;
    }
  }
  const createMatch = titles.find((t) => t.toLowerCase() === resolved.createTitle.toLowerCase());
  return createMatch || resolved.createTitle;
}

/** Human-readable labels for each required piece of the Translation form definition. */
export const TRANSLATION_FORM_REQUIREMENTS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'translation-section', label: 'Translation section' },
  { id: 'localeCode_s', label: 'localeCode_s (readonly input)' },
  { id: 'sourceLocaleCode_s', label: 'sourceLocaleCode_s (readonly input)' },
  { id: 'localeSourceId_s', label: 'localeSourceId_s (custom-locale control)' },
  { id: 'translations', label: 'translations (translation-versions control)' }
];

export type ContentTypeTranslationRow = {
  id: string;
  name: string;
  formPath: string;
  status: TranslationFieldStatus;
};

function normalizeLookupKey(code: string): string {
  return String(code || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
}

function folderLocaleFromKey(key: string): string {
  return normalizeLookupKey(key);
}

function lookupMeta(code: string): { label: string; flag: string } {
  const k = normalizeLookupKey(code);
  const fromMeta = LOCALE_META[k] ?? LOCALE_META[k.slice(0, 2)];
  if (fromMeta) {
    return { label: fromMeta.label, flag: fromMeta.flag };
  }
  // Unknown custom folder names (e.g. site-specific aliases) still appear with a globe.
  return { label: k, flag: '🌐' };
}

export function contentTypeFormPath(contentTypeId: string): string {
  const id = contentTypeId.startsWith('/') ? contentTypeId : `/${contentTypeId}`;
  return `/content-types${id}/form-definition.xml`.replace(/\/{2,}/g, '/');
}

export function parseTranslationConfigXml(xml: string): TranslationConfigModel | null {
  const trimmed = String(xml || '').trim();
  if (!trimmed) {
    return null;
  }
  const doc = new DOMParser().parseFromString(trimmed, 'application/xml');
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
  const languages: LocaleRow[] = [];
  codesParent.querySelectorAll('localeCode').forEach((codeElm) => {
    const rawCode = (codeElm.textContent || '').trim();
    if (!rawCode) {
      return;
    }
    const norm = folderLocaleFromKey(rawCode);
    if (!norm || seen.has(norm)) {
      return;
    }
    seen.add(norm);
    const meta = lookupMeta(norm);
    languages.push({ locale: norm, label: meta.label, flag: meta.flag });
  });
  if (languages.length === 0) {
    return null;
  }
  const defaultRaw = (root.querySelector('defaultLocaleCode')?.textContent || '').trim();
  let baseLanguage = folderLocaleFromKey(defaultRaw);
  if (!baseLanguage || !seen.has(baseLanguage)) {
    baseLanguage = languages[0].locale;
  }
  return { baseLanguage, languages };
}

export function buildTranslationConfigXml(model: TranslationConfigModel): string {
  const languages = model.languages
    .map((row) => folderLocaleFromKey(row.locale))
    .filter(Boolean)
    .filter((code, index, all) => all.indexOf(code) === index);
  if (languages.length === 0) {
    throw new Error('At least one locale is required.');
  }
  let baseLanguage = folderLocaleFromKey(model.baseLanguage);
  if (!baseLanguage || !languages.includes(baseLanguage)) {
    baseLanguage = languages[0];
  }
  const lines = languages.map((code) => `    <localeCode>${escapeXmlText(code)}</localeCode>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<translation-config>
  <defaultLocaleCode>${escapeXmlText(baseLanguage)}</defaultLocaleCode>
  <localeCodes>
${lines.join('\n')}
  </localeCodes>
</translation-config>
`;
}

export function defaultTranslationConfigModel(): TranslationConfigModel {
  return {
    baseLanguage: 'en',
    languages: [
      { locale: 'en', label: 'English', flag: '🇺🇸' },
      { locale: 'es', label: 'Spanish', flag: '🇪🇸' }
    ]
  };
}

export function suggestedLocaleOptions(): Array<{ code: string; label: string; flag: string }> {
  return Object.entries(LOCALE_META)
    .map(([code, meta]) => ({ code, label: meta.label, flag: meta.flag }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function escapeXmlText(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pluginName(field: Element, name: string): boolean {
  const plugin = field.querySelector(':scope > plugin');
  if (!plugin) {
    return false;
  }
  const pluginNameNode = plugin.querySelector('name');
  const pluginIdNode = plugin.querySelector('pluginId');
  const pluginNameVal = (pluginNameNode?.textContent || '').trim();
  const pluginIdVal = (pluginIdNode?.textContent || '').trim();
  return pluginNameVal === name && (!pluginIdVal || pluginIdVal === UIGOODIES_PLUGIN_ID);
}

function fieldId(field: Element): string {
  return (field.querySelector(':scope > id')?.textContent || '').trim();
}

function fieldType(field: Element): string {
  return (field.querySelector(':scope > type')?.textContent || '').trim();
}

function fieldPropertyValue(field: Element, propName: string): string | null {
  const properties = field.querySelectorAll(':scope > properties > property');
  for (const property of Array.from(properties)) {
    const name = (property.querySelector('name')?.textContent || '').trim();
    if (name === propName) {
      return (property.querySelector('value')?.textContent || '').trim();
    }
  }
  return null;
}

function isReadonlyInputField(field: Element | undefined): boolean {
  if (!field) {
    return false;
  }
  if (fieldType(field) !== 'input') {
    return false;
  }
  return fieldPropertyValue(field, 'readonly')?.toLowerCase() === 'true';
}

export const TRANSLATION_FIELD_IDS = [
  'translations',
  'localeSourceId_s',
  'localeCode_s',
  'sourceLocaleCode_s'
] as const;

const CANONICAL_FIELD_ORDER = [...TRANSLATION_FIELD_IDS];

function allFormFields(doc: Document): Element[] {
  return Array.from(doc.querySelectorAll('form field')).filter((field) => field.querySelector(':scope > id'));
}

function allTranslationSections(
  doc: Document,
  resolved: ResolvedTranslationFormSectionOptions = resolveTranslationFormSectionOptions()
): Element[] {
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    return [];
  }
  return Array.from(sections.querySelectorAll(':scope > section')).filter((section) =>
    isAcceptedTranslationSectionTitle(sectionTitleText(section), resolved)
  );
}

function findTranslationSection(
  doc: Document,
  resolved: ResolvedTranslationFormSectionOptions = resolveTranslationFormSectionOptions()
): Element | null {
  const matches = allTranslationSections(doc, resolved);
  if (matches.length === 0) {
    return null;
  }
  // Prefer preferred-existing title order, then createTitle.
  for (const preferred of resolved.preferExisting) {
    const hit = matches.find((s) => sectionTitleText(s).toLowerCase() === preferred.toLowerCase());
    if (hit) {
      return hit;
    }
  }
  const createHit = matches.find(
    (s) => sectionTitleText(s).toLowerCase() === resolved.createTitle.toLowerCase()
  );
  return createHit ?? matches[0] ?? null;
}

function translationSectionFieldElements(section: Element | null): Element[] {
  if (!section) {
    return [];
  }
  return Array.from(section.querySelectorAll(':scope > fields > field'));
}

function fieldsById(doc: Document, id: string): Element[] {
  return allFormFields(doc).filter((field) => fieldId(field) === id);
}

function fieldById(fields: Element[], id: string): Element | undefined {
  return fields.find((field) => fieldId(field) === id);
}

function isCanonicalTranslationsField(field: Element | undefined): boolean {
  return (
    Boolean(field) &&
    fieldType(field!) === 'translation-versions' &&
    pluginName(field!, 'translation-versions')
  );
}

function isCanonicalLocaleSourceIdField(field: Element | undefined): boolean {
  return Boolean(field) && fieldType(field!) === 'custom-locale' && pluginName(field!, 'custom-locale');
}

function isTranslationSectionCollapsed(section: Element): boolean {
  const defaultOpen = (section.querySelector(':scope > defaultOpen')?.textContent || '').trim().toLowerCase();
  return defaultOpen === 'false';
}

function isTranslationSectionLast(doc: Document, section: Element | null): boolean {
  if (!section) {
    return false;
  }
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    return false;
  }
  const allSections = sections.querySelectorAll(':scope > section');
  if (allSections.length === 0) {
    return false;
  }
  return allSections[allSections.length - 1] === section;
}

export function analyzeFormDefinition(
  xml: string,
  options?: TranslationFormSectionOptions | null
): TranslationFieldStatus {
  const resolved = resolveTranslationFormSectionOptions(options);
  const doc = new DOMParser().parseFromString(String(xml || ''), 'application/xml');
  if (doc.querySelector('parsererror')) {
    return {
      hasTranslationSection: false,
      hasLocaleCode: false,
      hasSourceLocaleCode: false,
      hasLocaleSourceId: false,
      hasCustomLocaleControl: false,
      hasTranslationVersions: false,
      hasTranslationsField: false,
      complete: false,
      missing: ['Invalid form-definition XML']
    };
  }

  const translationSections = allTranslationSections(doc, resolved);
  const translationSection = findTranslationSection(doc, resolved);
  const hasTranslationSection = translationSection !== null;
  const foundSectionTitle = translationSection ? sectionTitleText(translationSection) : undefined;
  const sectionFields = translationSectionFieldElements(translationSection);

  const localeCodeField = fieldById(sectionFields, 'localeCode_s');
  const sourceLocaleCodeField = fieldById(sectionFields, 'sourceLocaleCode_s');
  const localeSourceIdField = fieldById(sectionFields, 'localeSourceId_s');
  const translationsField = fieldById(sectionFields, 'translations');

  const hasLocaleCode = isReadonlyInputField(localeCodeField);
  const hasSourceLocaleCode = isReadonlyInputField(sourceLocaleCodeField);
  const hasLocaleSourceId = Boolean(localeSourceIdField);
  const hasCustomLocaleControl = isCanonicalLocaleSourceIdField(localeSourceIdField);
  const hasTranslationsField = Boolean(translationsField);
  const hasTranslationVersions = isCanonicalTranslationsField(translationsField);

  const missing: string[] = [];
  const sectionLabel = foundSectionTitle || resolved.createTitle;

  if (!hasTranslationSection) {
    missing.push(`Form section "${resolved.createTitle}" (or preferred existing)`);
  }
  if (translationSections.length > 1) {
    missing.push(`Multiple locale/translation sections (${translationSections.length})`);
  }
  if (translationSection && !isTranslationSectionLast(doc, translationSection)) {
    missing.push(`Section "${sectionLabel}" must be last`);
  }
  if (translationSection && !isTranslationSectionCollapsed(translationSection)) {
    missing.push(`Section "${sectionLabel}" must default closed`);
  }

  TRANSLATION_FIELD_IDS.forEach((id) => {
    const matches = fieldsById(doc, id);
    if (matches.length > 1) {
      missing.push(`Duplicate ${id} field (${matches.length})`);
    }
    const outsideSection = matches.filter(
      (field) => !translationSection || !translationSection.contains(field)
    );
    if (outsideSection.length > 0) {
      missing.push(`${id} outside section "${sectionLabel}"`);
    }
  });

  if (!localeCodeField) {
    missing.push('localeCode_s (readonly input)');
  } else if (!hasLocaleCode) {
    missing.push('localeCode_s (must be readonly input)');
  }
  if (!sourceLocaleCodeField) {
    missing.push('sourceLocaleCode_s (readonly input)');
  } else if (!hasSourceLocaleCode) {
    missing.push('sourceLocaleCode_s (must be readonly input)');
  }
  if (!localeSourceIdField) {
    missing.push('localeSourceId_s (custom-locale control)');
  } else if (!hasCustomLocaleControl) {
    missing.push('localeSourceId_s (must use custom-locale control)');
  }
  if (!translationsField) {
    missing.push('translations (translation-versions control)');
  } else if (!hasTranslationVersions) {
    missing.push('translations (must use translation-versions control)');
  }

  const translationFieldIdsInSection = sectionFields
    .map((field) => fieldId(field))
    .filter((id) => TRANSLATION_FIELD_IDS.includes(id as (typeof TRANSLATION_FIELD_IDS)[number]));

  if (translationSection && translationFieldIdsInSection.length === CANONICAL_FIELD_ORDER.length) {
    if (translationFieldIdsInSection.join(',') !== CANONICAL_FIELD_ORDER.join(',')) {
      missing.push(
        'Translation fields must be ordered: translations, localeSourceId_s, localeCode_s, sourceLocaleCode_s'
      );
    }
  } else if (translationSection && translationFieldIdsInSection.length === 0) {
    missing.push(`Section "${sectionLabel}" has no translation fields`);
  } else if (translationSection && translationFieldIdsInSection.length !== CANONICAL_FIELD_ORDER.length) {
    missing.push(
      `Section "${sectionLabel}" must contain all 4 translation fields (found ${translationFieldIdsInSection.length})`
    );
  }

  return {
    hasTranslationSection,
    hasLocaleCode,
    hasSourceLocaleCode,
    hasLocaleSourceId,
    hasCustomLocaleControl,
    hasTranslationVersions,
    hasTranslationsField,
    sectionTitle: foundSectionTitle,
    complete: missing.length === 0,
    missing
  };
}

const READONLY_INPUT_FIELD = (id: string, title: string) => `
				<field>
					<type>input</type>
					<id>${id}</id>
					<iceId></iceId>
					<title>${title}</title>
					<description></description>
					<defaultValue></defaultValue>
					<help></help>
					<properties>
						<property>
							<name>size</name>
							<value>50</value>
							<type>int</type>
						</property>
						<property>
							<name>maxlength</name>
							<value>50</value>
							<type>int</type>
						</property>
						<property>
							<name>readonly</name>
							<value>true</value>
							<type>boolean</type>
						</property>
						<property>
							<name>tokenize</name>
							<value>false</value>
							<type>boolean</type>
						</property>
						<property>
							<name>escapeContent</name>
							<value>false</value>
							<type>boolean</type>
						</property>
					</properties>
					<constraints>
					</constraints>
				</field>`;

const CUSTOM_LOCALE_FIELD = `
				<field>
					<type>custom-locale</type>
					<id>localeSourceId_s</id>
					<iceId></iceId>
					<title>Locale Source ID</title>
					<description></description>
					<defaultValue></defaultValue>
					<help></help>
					<plugin>
						<pluginId>${UIGOODIES_PLUGIN_ID}</pluginId>
						<type>control</type>
						<name>custom-locale</name>
						<filename>main.js</filename>
					</plugin>
					<properties>
					</properties>
					<constraints>
					</constraints>
				</field>`;

const TRANSLATION_VERSIONS_FIELD = `
				<field>
					<type>translation-versions</type>
					<id>translations</id>
					<iceId></iceId>
					<title>Translations</title>
					<description></description>
					<defaultValue></defaultValue>
					<help></help>
					<plugin>
						<pluginId>${UIGOODIES_PLUGIN_ID}</pluginId>
						<type>control</type>
						<name>translation-versions</name>
						<filename>main.js</filename>
					</plugin>
					<properties>
					</properties>
					<constraints>
					</constraints>
				</field>`;

function parseFieldFragment(fragment: string): Element {
  const doc = new DOMParser().parseFromString(`<fields>${fragment}</fields>`, 'application/xml');
  if (doc.querySelector('parsererror') || !doc.documentElement.firstElementChild) {
    throw new Error('Unable to build translation field fragment.');
  }
  return doc.documentElement.firstElementChild;
}

function removeTranslationFieldsEverywhere(doc: Document): string[] {
  const removed: string[] = [];
  allFormFields(doc).forEach((field) => {
    const id = fieldId(field);
    if (TRANSLATION_FIELD_IDS.includes(id as (typeof TRANSLATION_FIELD_IDS)[number])) {
      removed.push(id);
      field.parentNode?.removeChild(field);
    }
  });
  return removed;
}

function harvestTranslationFields(doc: Document): Map<string, Element> {
  const harvested = new Map<string, Element>();
  allFormFields(doc).forEach((field) => {
    const id = fieldId(field);
    if (!TRANSLATION_FIELD_IDS.includes(id as (typeof TRANSLATION_FIELD_IDS)[number])) {
      return;
    }
    if (!harvested.has(id)) {
      harvested.set(id, field);
    }
  });
  return harvested;
}

function canonicalFieldTemplate(id: (typeof TRANSLATION_FIELD_IDS)[number]): string {
  switch (id) {
    case 'translations':
      return TRANSLATION_VERSIONS_FIELD;
    case 'localeSourceId_s':
      return CUSTOM_LOCALE_FIELD;
    case 'localeCode_s':
      return READONLY_INPUT_FIELD('localeCode_s', 'Locale Code');
    case 'sourceLocaleCode_s':
      return READONLY_INPUT_FIELD('sourceLocaleCode_s', 'Source Locale Code');
    default:
      throw new Error(`Unknown translation field id: ${id}`);
  }
}

function isCanonicalTranslationField(field: Element, id: (typeof TRANSLATION_FIELD_IDS)[number]): boolean {
  switch (id) {
    case 'translations':
      return isCanonicalTranslationsField(field);
    case 'localeSourceId_s':
      return isCanonicalLocaleSourceIdField(field);
    case 'localeCode_s':
    case 'sourceLocaleCode_s':
      return isReadonlyInputField(field);
    default:
      return false;
  }
}

function buildCanonicalTranslationField(
  doc: Document,
  id: (typeof TRANSLATION_FIELD_IDS)[number],
  harvested: Map<string, Element>
): Element {
  const existing = harvested.get(id);
  if (existing && isCanonicalTranslationField(existing, id)) {
    return doc.importNode(existing, true);
  }
  return doc.importNode(parseFieldFragment(canonicalFieldTemplate(id)), true);
}

function ensureTranslationSectionCollapsed(doc: Document, section: Element): boolean {
  let defaultOpen = section.querySelector(':scope > defaultOpen');
  if (!defaultOpen) {
    defaultOpen = doc.createElement('defaultOpen');
    const description = section.querySelector(':scope > description');
    if (description?.nextSibling) {
      section.insertBefore(defaultOpen, description.nextSibling);
    } else if (description) {
      description.after(defaultOpen);
    } else {
      const title = section.querySelector(':scope > title');
      if (title?.nextSibling) {
        section.insertBefore(defaultOpen, title.nextSibling);
      } else {
        section.prepend(defaultOpen);
      }
    }
    defaultOpen.textContent = 'false';
    return true;
  }
  if (defaultOpen.textContent?.trim().toLowerCase() !== 'false') {
    defaultOpen.textContent = 'false';
    return true;
  }
  return false;
}

function createTranslationSectionAtBottom(doc: Document, sectionTitle: string): Element {
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    throw new Error('form-definition.xml has no <sections> element.');
  }
  const section = doc.createElement('section');
  const title = doc.createElement('title');
  title.textContent = sectionTitle;
  const description = doc.createElement('description');
  const defaultOpen = doc.createElement('defaultOpen');
  defaultOpen.textContent = 'false';
  const fields = doc.createElement('fields');
  section.append(title, description, defaultOpen, fields);
  sections.appendChild(section);
  return section;
}

function ensureSectionFieldsContainer(doc: Document, section: Element): Element {
  let fields = section.querySelector(':scope > fields');
  if (!fields) {
    fields = doc.createElement('fields');
    section.appendChild(fields);
  }
  return fields;
}

function moveNonTranslationFields(fromSection: Element, toFields: Element): number {
  const fromFields = fromSection.querySelector(':scope > fields');
  if (!fromFields) {
    return 0;
  }
  let moved = 0;
  Array.from(fromFields.querySelectorAll(':scope > field')).forEach((field) => {
    const id = fieldId(field);
    if (TRANSLATION_FIELD_IDS.includes(id as (typeof TRANSLATION_FIELD_IDS)[number])) {
      return;
    }
    toFields.appendChild(field);
    moved += 1;
  });
  return moved;
}

/** Move locale/translation section to the bottom and collapse it by default. */
export function ensureTranslationFormLayout(
  doc: Document,
  options?: TranslationFormSectionOptions | null
): boolean {
  const resolved = resolveTranslationFormSectionOptions(options);
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    return false;
  }
  const translationSection = findTranslationSection(doc, resolved);
  if (!translationSection) {
    return false;
  }

  let changed = false;
  if (!isTranslationSectionLast(doc, translationSection)) {
    sections.appendChild(translationSection);
    changed = true;
  }

  if (ensureTranslationSectionCollapsed(doc, translationSection)) {
    changed = true;
  }

  const fields = translationSection.querySelector(':scope > fields');
  if (fields && orderTranslationFieldsInSection(fields)) {
    changed = true;
  }

  return changed;
}

function orderTranslationFieldsInSection(fields: Element): boolean {
  const allFields = Array.from(fields.querySelectorAll(':scope > field'));
  const byId = new Map<string, Element>();
  allFields.forEach((field) => {
    const id = fieldId(field);
    if (TRANSLATION_FIELD_IDS.includes(id as (typeof TRANSLATION_FIELD_IDS)[number]) && !byId.has(id)) {
      byId.set(id, field);
    }
  });
  const ordered = CANONICAL_FIELD_ORDER.map((id) => byId.get(id)).filter((f): f is Element => Boolean(f));
  if (ordered.length === 0) {
    return false;
  }
  const currentOrder = allFields
    .map((field) => fieldId(field))
    .filter((id) => TRANSLATION_FIELD_IDS.includes(id as (typeof TRANSLATION_FIELD_IDS)[number]));
  const desiredOrder = ordered.map((field) => fieldId(field));
  if (currentOrder.join(',') === desiredOrder.join(',')) {
    return false;
  }

  let insertAt = 0;
  for (let i = 0; i < allFields.length; i += 1) {
    if (TRANSLATION_FIELD_IDS.includes(fieldId(allFields[i]) as (typeof TRANSLATION_FIELD_IDS)[number])) {
      break;
    }
    insertAt += 1;
  }
  const others = allFields.filter(
    (field) => !TRANSLATION_FIELD_IDS.includes(fieldId(field) as (typeof TRANSLATION_FIELD_IDS)[number])
  );

  while (fields.firstChild) {
    fields.removeChild(fields.firstChild);
  }
  others.slice(0, insertAt).forEach((field) => fields.appendChild(field));
  ordered.forEach((field) => fields.appendChild(field));
  others.slice(insertAt).forEach((field) => fields.appendChild(field));
  return true;
}

function consolidateTranslationForm(
  doc: Document,
  options?: TranslationFormSectionOptions | null
): string[] {
  const resolved = resolveTranslationFormSectionOptions(options);
  const targetTitle = resolveTargetTranslationSectionTitle(doc, options);
  const actions: string[] = [];
  const harvested = harvestTranslationFields(doc);
  const movedFromElsewhere = TRANSLATION_FIELD_IDS.filter((id) => {
    const field = harvested.get(id);
    if (!field) {
      return false;
    }
    const section = field.closest('section');
    const title = section ? sectionTitleText(section) : '';
    return title.toLowerCase() !== targetTitle.toLowerCase();
  });
  if (movedFromElsewhere.length > 0) {
    actions.push(`Moved translation fields into section "${targetTitle}": ${movedFromElsewhere.join(', ')}`);
  }

  // Prefer keeping an existing target section (preserves non-translation fields).
  let targetSection: Element | null = null;
  const sectionsEl = doc.querySelector('form > sections');
  if (sectionsEl) {
    targetSection =
      Array.from(sectionsEl.querySelectorAll(':scope > section')).find(
        (section) => sectionTitleText(section).toLowerCase() === targetTitle.toLowerCase()
      ) ?? null;
  }
  if (!targetSection) {
    targetSection = createTranslationSectionAtBottom(doc, targetTitle);
    actions.push(`Created section "${targetTitle}"`);
  }

  const targetFields = ensureSectionFieldsContainer(doc, targetSection);

  // Merge extras from duplicate accepted sections, then remove those duplicates.
  const duplicates = allTranslationSections(doc, resolved).filter((section) => section !== targetSection);
  let preservedExtras = 0;
  duplicates.forEach((section) => {
    preservedExtras += moveNonTranslationFields(section, targetFields);
    section.parentNode?.removeChild(section);
  });
  if (duplicates.length > 0) {
    actions.push(
      duplicates.length === 1
        ? `Removed duplicate locale/translation section`
        : `Removed ${duplicates.length} duplicate locale/translation sections`
    );
  }
  if (preservedExtras > 0) {
    actions.push(`Preserved ${preservedExtras} non-translation field(s) in "${targetTitle}"`);
  }

  const removedFields = removeTranslationFieldsEverywhere(doc);
  if (removedFields.length > 0 && movedFromElsewhere.length === 0) {
    const unique = Array.from(new Set(removedFields));
    actions.push(`Normalized translation fields: ${unique.join(', ')}`);
  }

  const added: string[] = [];
  CANONICAL_FIELD_ORDER.forEach((id) => {
    if (!harvested.has(id)) {
      added.push(id);
    }
    targetFields.appendChild(buildCanonicalTranslationField(doc, id, harvested));
  });
  if (added.length > 0) {
    actions.push(`Added missing translation fields: ${added.join(', ')}`);
  }

  if (orderTranslationFieldsInSection(targetFields)) {
    actions.push(`Ordered translation fields in "${targetTitle}"`);
  }

  ensureTranslationFormLayout(doc, options);
  return actions;
}

export function patchFormDefinitionWithTranslationFields(
  xml: string,
  options?: TranslationFormSectionOptions | null
): {
  xml: string;
  added: string[];
  changed: boolean;
} {
  const originalXml = String(xml || '');
  const doc = new DOMParser().parseFromString(originalXml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Unable to parse form-definition.xml.');
  }

  const beforeStatus = analyzeFormDefinition(originalXml, options);
  const actions = consolidateTranslationForm(doc, options);
  const serialized = new XMLSerializer().serializeToString(doc);
  const afterStatus = analyzeFormDefinition(serialized, options);
  const changed = serialized !== originalXml || !beforeStatus.complete;

  return {
    xml: serialized,
    added: actions.length > 0 ? actions : changed ? ['Normalized translation form layout'] : [],
    changed: changed || !afterStatus.complete
  };
}
