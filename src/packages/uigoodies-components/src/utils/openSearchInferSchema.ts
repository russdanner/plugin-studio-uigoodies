/**
 * Infer a field tree from indexed document _source payloads (no mapping API required).
 */

export type InferredField = {
  path: string;
  types: string[];
};

function typeLabel(value: unknown): string {
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  return typeof value;
}

function addType(path: string, value: unknown, into: Map<string, Set<string>>) {
  if (!into.has(path)) {
    into.set(path, new Set());
  }
  into.get(path)!.add(typeLabel(value));
}

/**
 * Walk _source objects; uses `[]` in paths for array-of-object branches (Crafter-style nested components).
 */
export function ingestDocumentSource(obj: Record<string, unknown>, into: Map<string, Set<string>>, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    addType(path, value, into);

    if (value !== null && typeof value === 'object') {
      if (Array.isArray(value)) {
        const sample = value.slice(0, 12);
        for (const item of sample) {
          if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
            ingestDocumentSource(item as Record<string, unknown>, into, `${path}[]`);
          } else {
            addType(`${path}[]`, item, into);
          }
        }
      } else {
        ingestDocumentSource(value as Record<string, unknown>, into, path);
      }
    }
  }
}

export function inferFieldsFromDocuments(sources: Record<string, unknown>[]): InferredField[] {
  const into = new Map<string, Set<string>>();
  for (const src of sources) {
    ingestDocumentSource(src, into);
  }
  return Array.from(into.entries())
    .map(([path, types]) => ({ path, types: Array.from(types).sort() }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export function extractHitSourcesFromSearchResponse(parsed: unknown): Record<string, unknown>[] {
  if (!parsed || typeof parsed !== 'object') {
    return [];
  }
  const root = parsed as Record<string, unknown>;
  const hitsWrapper = root.hits;
  if (!hitsWrapper || typeof hitsWrapper !== 'object') {
    return [];
  }
  const inner = (hitsWrapper as Record<string, unknown>).hits;
  if (!Array.isArray(inner)) {
    return [];
  }
  const out: Record<string, unknown>[] = [];
  for (const h of inner) {
    if (h && typeof h === 'object' && '_source' in h) {
      const src = (h as Record<string, unknown>)._source;
      if (src && typeof src === 'object' && !Array.isArray(src)) {
        out.push(src as Record<string, unknown>);
      }
    }
  }
  return out;
}

/** Body used to sample documents for schema inference. */
export function buildSchemaSampleQuery(sampleSize: number): string {
  return JSON.stringify(
    {
      size: Math.min(200, Math.max(1, sampleSize)),
      query: { match_all: {} },
      _source: true
    },
    null,
    2
  );
}
