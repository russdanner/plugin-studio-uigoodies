function scalarXmlValue(v: unknown): string | number | undefined {
  if (v == null) {
    return undefined;
  }
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
    return v as string | number;
  }
  if (Array.isArray(v)) {
    return scalarXmlValue(v[0]);
  }
  if (typeof v === 'object' && v !== null && '#text' in (v as Record<string, unknown>)) {
    return scalarXmlValue((v as Record<string, unknown>)['#text']);
  }
  return undefined;
}

function parsePositiveInt(v: unknown): number {
  const s = scalarXmlValue(v);
  if (s === undefined) {
    return NaN;
  }
  const n = parseInt(String(s), 10);
  return Number.isFinite(n) && n > 0 ? n : NaN;
}

function pickTitle(d: Record<string, unknown>, index: number): string {
  const t = d.title;
  if (typeof t === 'string' && t.length) {
    return t;
  }
  if (t && typeof t === 'object' && 'defaultMessage' in (t as Record<string, unknown>)) {
    const m = (t as { defaultMessage?: string }).defaultMessage;
    if (typeof m === 'string' && m.length) {
      return m;
    }
  }
  return `device-${index}`;
}

export type SimulatorDevice = { title: string; width: number; height: number };

/**
 * Preview toolbar widget config does not use ICE-panel `arrays: ['devices', ...]`, so
 * `applyDeserializedXMLTransforms` may turn `<device>` lists into `{ 0: {...}, 1: {...} }`
 * instead of an array. Coerce all common shapes into a device array for PreviewSimulatorPanel.
 */
export function coercePreviewDeviceList(raw: unknown): Array<Record<string, unknown>> {
  if (raw == null) {
    return [];
  }
  if (Array.isArray(raw)) {
    return raw.filter(Boolean) as Array<Record<string, unknown>>;
  }
  if (typeof raw !== 'object') {
    return [];
  }
  const o = raw as Record<string, unknown>;

  const inner = o.device;
  if (Array.isArray(inner)) {
    return inner.filter(Boolean) as Array<Record<string, unknown>>;
  }
  if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
    const innerObj = inner as Record<string, unknown>;
    const fromNumeric = objectValuesIfNumericKeys(innerObj);
    if (fromNumeric.length > 0) {
      return fromNumeric;
    }
    return [innerObj];
  }

  const topNumeric = objectValuesIfNumericKeys(o);
  if (topNumeric.length > 0) {
    return topNumeric;
  }

  return [];
}

function objectValuesIfNumericKeys(obj: Record<string, unknown>): Array<Record<string, unknown>> {
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return [];
  }
  const allNumeric = keys.every((k) => /^\d+$/.test(k));
  if (!allNumeric) {
    return [];
  }
  return keys
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => obj[k])
    .filter((v): v is Record<string, unknown> => Boolean(v) && typeof v === 'object' && !Array.isArray(v));
}

/**
 * Produces width/height numbers Studio's PreviewSimulatorPanel can use (avoids NaN `value` keys).
 * Falls back when XML shapes are odd or rows are invalid.
 */
export function buildSimulatorDevices(raw: unknown, fallback: SimulatorDevice[]): SimulatorDevice[] {
  const rows = coercePreviewDeviceList(raw);
  const out: SimulatorDevice[] = rows
    .map((d, i) => ({
      title: pickTitle(d, i),
      width: parsePositiveInt(d.width),
      height: parsePositiveInt(d.height)
    }))
    .filter((d) => Number.isFinite(d.width) && Number.isFinite(d.height));
  return out.length > 0 ? out : fallback;
}
