import { createLookupTable } from '@craftercms/studio-ui/utils/object';

type AudienceFieldRecord = Record<string, unknown>;

type AudienceValue = { label: string; value: string };

function objectValuesIfNumericKeys(obj: Record<string, unknown>): unknown[] {
  const keys = Object.keys(obj);
  if (!keys.length || !keys.every((k) => /^\d+$/.test(k))) {
    return [];
  }
  return keys.sort((a, b) => Number(a) - Number(b)).map((k) => obj[k]);
}

/**
 * Toolbar transforms turn <values><value/></values> into arrays or { value: [...] } or { value: {0:{},1:{}} }.
 * Dropdown expects field.values as an array of { label, value }.
 */
export function coerceAudienceFieldValues(raw: unknown): AudienceValue[] | undefined {
  if (raw == null) {
    return undefined;
  }
  if (Array.isArray(raw)) {
    return raw.filter(Boolean) as AudienceValue[];
  }
  if (typeof raw !== 'object') {
    return undefined;
  }
  const o = raw as Record<string, unknown>;
  const inner = o.value;
  if (Array.isArray(inner)) {
    return inner.filter(Boolean) as AudienceValue[];
  }
  if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
    const numeric = objectValuesIfNumericKeys(inner as Record<string, unknown>);
    if (numeric.length) {
      return numeric.filter(Boolean) as AudienceValue[];
    }
    return [inner as AudienceValue];
  }
  return undefined;
}

function scalarish(v: unknown): string | undefined {
  if (v == null) {
    return undefined;
  }
  if (typeof v === 'string' || typeof v === 'number') {
    return String(v);
  }
  if (Array.isArray(v)) {
    return scalarish(v[0]);
  }
  if (typeof v === 'object' && '#text' in (v as Record<string, unknown>)) {
    return scalarish((v as Record<string, unknown>)['#text']);
  }
  return undefined;
}

function normalizeDropdownValueRow(row: unknown): AudienceValue | null {
  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    return null;
  }
  const r = row as Record<string, unknown>;
  const value = scalarish(r.value) ?? '';
  let label = scalarish(r.label);
  if (!label && r.label && typeof r.label === 'object') {
    const dm = (r.label as { defaultMessage?: string }).defaultMessage;
    label = typeof dm === 'string' ? dm : undefined;
  }
  return { label: label ?? value, value };
}

function normalizeOneField(key: string, field: AudienceFieldRecord): AudienceFieldRecord {
  const id = scalarish(field.id) ?? key;
  const name = scalarish(field.name) ?? id;
  const rawValues = coerceAudienceFieldValues(field.values);
  const coercedValues = rawValues
    ?.map((row) => normalizeDropdownValueRow(row))
    .filter((row): row is AudienceValue => row != null && row.value.length > 0);
  return {
    ...field,
    id,
    name,
    type: scalarish(field.type) ?? 'input',
    description: field.description != null ? scalarish(field.description) ?? '' : undefined,
    helpText: field.helpText != null ? scalarish(field.helpText) ?? '' : undefined,
    defaultValue: field.defaultValue,
    validations: (field.validations as object) ?? {},
    ...(coercedValues && coercedValues.length ? { values: coercedValues } : {})
  };
}

/**
 * Toolbar ui.xml deserialization does not apply ICE-panel `lookupTables: ['fields']`.
 * Normalize `<fields>` content into a lookup table for PreviewAudiencesPanel.
 */
export function normalizeAudienceFields(raw: unknown): Record<string, AudienceFieldRecord> | undefined {
  if (raw == null) {
    return undefined;
  }
  if (Array.isArray(raw)) {
    return createLookupTable(raw as { id: string }[], 'id') as Record<string, AudienceFieldRecord>;
  }
  if (typeof raw !== 'object') {
    return undefined;
  }
  const o = raw as Record<string, AudienceFieldRecord>;
  const out: Record<string, AudienceFieldRecord> = {};
  Object.keys(o).forEach((key) => {
    const field = o[key];
    if (!field || typeof field !== 'object' || Array.isArray(field)) {
      return;
    }
    const id = scalarish((field as AudienceFieldRecord).id) ?? key;
    out[id] = normalizeOneField(key, field as AudienceFieldRecord);
  });
  return Object.keys(out).length ? out : undefined;
}

export function buildAudienceFields(raw: unknown): Record<string, AudienceFieldRecord> | undefined {
  return normalizeAudienceFields(raw);
}
