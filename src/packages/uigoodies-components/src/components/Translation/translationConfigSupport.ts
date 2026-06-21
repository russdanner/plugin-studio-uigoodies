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
  complete: boolean;
  missing: string[];
};

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
  for (const property of properties) {
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

function allFormFields(doc: Document): Element[] {
  return Array.from(doc.querySelectorAll('form sections section fields field'));
}

function fieldById(fields: Element[], id: string): Element | undefined {
  return fields.find((field) => fieldId(field) === id);
}

export function analyzeFormDefinition(xml: string): TranslationFieldStatus {
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

  const hasTranslationSection = findTranslationSection(doc) !== null;
  const fields = allFormFields(doc);

  const localeCodeField = fieldById(fields, 'localeCode_s');
  const sourceLocaleCodeField = fieldById(fields, 'sourceLocaleCode_s');
  const localeSourceIdField = fieldById(fields, 'localeSourceId_s');
  const translationsField = fieldById(fields, 'translations');

  const hasLocaleCode = isReadonlyInputField(localeCodeField);
  const hasSourceLocaleCode = isReadonlyInputField(sourceLocaleCodeField);
  const hasLocaleSourceId = Boolean(localeSourceIdField);
  const hasCustomLocaleControl =
    Boolean(localeSourceIdField) && fieldType(localeSourceIdField!) === 'custom-locale' && pluginName(localeSourceIdField!, 'custom-locale');
  const hasTranslationsField = Boolean(translationsField);
  const hasTranslationVersions =
    Boolean(translationsField) && fieldType(translationsField!) === 'translation-versions' && pluginName(translationsField!, 'translation-versions');

  const missing: string[] = [];

  if (!hasTranslationSection) {
    missing.push('Translation section');
  }
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

  return {
    hasTranslationSection,
    hasLocaleCode,
    hasSourceLocaleCode,
    hasLocaleSourceId,
    hasCustomLocaleControl,
    hasTranslationVersions,
    hasTranslationsField,
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

function ensureTranslationSection(doc: Document): Element {
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    throw new Error('form-definition.xml has no <sections> element.');
  }
  const existing = findTranslationSection(doc);
  if (existing) {
    let fields = existing.querySelector(':scope > fields');
    if (!fields) {
      fields = doc.createElement('fields');
      existing.appendChild(fields);
    }
    return fields;
  }
  const section = doc.createElement('section');
  section.innerHTML = `
			<title>Translation</title>
			<description></description>
			<defaultOpen>true</defaultOpen>
			<fields>
			</fields>`;
  const firstSection = sections.querySelector(':scope > section');
  if (firstSection) {
    sections.insertBefore(section, firstSection);
  } else {
    sections.appendChild(section);
  }
  const fields = section.querySelector('fields');
  if (!fields) {
    throw new Error('Unable to create Translation section.');
  }
  return fields;
}

function findTranslationSection(doc: Document): Element | null {
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    return null;
  }
  return Array.from(sections.querySelectorAll(':scope > section')).find((section) => {
    const title = (section.querySelector(':scope > title')?.textContent || '').trim().toLowerCase();
    return title === 'translation';
  }) ?? null;
}

/** Move Translation section to the top and put translation-versions first inside it. */
export function ensureTranslationFormLayout(doc: Document): boolean {
  const sections = doc.querySelector('form > sections');
  if (!sections) {
    return false;
  }
  const translationSection = findTranslationSection(doc);
  if (!translationSection) {
    return false;
  }

  let changed = false;
  const firstSection = sections.querySelector(':scope > section');
  if (firstSection && firstSection !== translationSection) {
    sections.insertBefore(translationSection, firstSection);
    changed = true;
  }

  const fields = translationSection.querySelector(':scope > fields');
  if (fields) {
    const translationField = Array.from(fields.querySelectorAll(':scope > field')).find((field) =>
      pluginName(field, 'translation-versions')
    );
    const firstField = fields.querySelector(':scope > field');
    if (translationField && firstField && translationField !== firstField) {
      fields.insertBefore(translationField, firstField);
      changed = true;
    }
  }

  return changed;
}

export function patchFormDefinitionWithTranslationFields(xml: string): { xml: string; added: string[] } {
  const doc = new DOMParser().parseFromString(String(xml || ''), 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Unable to parse form-definition.xml.');
  }
  const status = analyzeFormDefinition(xml);
  const layoutChanged = ensureTranslationFormLayout(doc);
  if (status.complete) {
    const serialized = new XMLSerializer().serializeToString(doc);
    return {
      xml: serialized,
      added: layoutChanged ? ['Translation section moved to top of form'] : []
    };
  }
  const fieldsContainer = ensureTranslationSection(doc);
  const added: string[] = [];
  const appendIfMissing = (fragment: string, label: string, present: boolean) => {
    if (present) {
      return;
    }
    fieldsContainer.appendChild(doc.importNode(parseFieldFragment(fragment), true));
    added.push(label);
  };
  appendIfMissing(CUSTOM_LOCALE_FIELD, 'localeSourceId_s (custom-locale)', status.hasCustomLocaleControl);
  appendIfMissing(READONLY_INPUT_FIELD('localeCode_s', 'Locale Code'), 'localeCode_s', status.hasLocaleCode);
  appendIfMissing(
    READONLY_INPUT_FIELD('sourceLocaleCode_s', 'Source Locale Code'),
    'sourceLocaleCode_s',
    status.hasSourceLocaleCode
  );
  appendIfMissing(TRANSLATION_VERSIONS_FIELD, 'translations (translation-versions)', status.hasTranslationVersions);
  ensureTranslationFormLayout(doc);
  return { xml: new XMLSerializer().serializeToString(doc), added };
}
