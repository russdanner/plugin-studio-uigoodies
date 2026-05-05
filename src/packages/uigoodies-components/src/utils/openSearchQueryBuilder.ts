/**
 * Merge OpenSearch query clauses into the request body while preserving size, _source, aggs, etc.
 */

export function readSourceArray(body: Record<string, unknown>): string[] {
  const src = body._source;
  if (src === true) {
    return ['*'];
  }
  if (Array.isArray(src)) {
    return src.map(String);
  }
  if (typeof src === 'string') {
    return [src];
  }
  return [];
}

export function setSourceArray(body: Record<string, unknown>, paths: string[]): Record<string, unknown> {
  const next = { ...body };
  if (paths.length === 0) {
    delete next._source;
  } else if (paths.length === 1 && paths[0] === '*') {
    next._source = true;
  } else {
    next._source = paths;
  }
  return next;
}

export function addSourcePaths(body: Record<string, unknown>, paths: string[]): Record<string, unknown> {
  const cur = readSourceArray(body).filter((p) => p !== '*');
  const merged = Array.from(new Set([...cur, ...paths]));
  return setSourceArray(body, merged);
}

export function removeSourcePath(body: Record<string, unknown>, path: string): Record<string, unknown> {
  const cur = readSourceArray(body).filter((p) => p !== '*' && p !== path);
  return setSourceArray(body, cur);
}

function cloneQueryBody(body: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(body)) as Record<string, unknown>;
}

/**
 * Appends a clause to bool.must, wrapping or merging existing `query` as needed.
 */
export function appendBoolMustClause(
  body: Record<string, unknown>,
  clause: Record<string, unknown>
): Record<string, unknown> {
  const out = cloneQueryBody(body);
  const q = out.query;

  if (q === undefined || q === null) {
    out.query = { bool: { must: [clause] } };
    return out;
  }

  if (typeof q === 'object' && !Array.isArray(q) && 'match_all' in q) {
    out.query = { bool: { must: [clause] } };
    return out;
  }

  if (typeof q === 'object' && !Array.isArray(q) && 'bool' in q) {
    const b = (q as Record<string, unknown>).bool as Record<string, unknown> | undefined;
    if (b && typeof b === 'object') {
      const must = Array.isArray(b.must) ? [...(b.must as unknown[]), clause] : [clause];
      out.query = { bool: { ...b, must } };
      return out;
    }
  }

  out.query = { bool: { must: [q, clause] } };
  return out;
}

export function buildMatchClause(field: string, text: string): Record<string, unknown> {
  return {
    match: {
      [field]: { query: text, operator: 'and' }
    }
  };
}

export function buildTermClause(field: string, value: string): Record<string, unknown> {
  return {
    term: {
      [field]: { value }
    }
  };
}

export function buildPrefixClause(field: string, prefix: string): Record<string, unknown> {
  return {
    prefix: {
      [field]: prefix
    }
  };
}

export function buildWildcardClause(field: string, pattern: string): Record<string, unknown> {
  return {
    wildcard: {
      [field]: { value: pattern, case_insensitive: true }
    }
  };
}

export function buildExistsClause(field: string): Record<string, unknown> {
  return { exists: { field } };
}

export function buildRangeClause(
  field: string,
  gte?: string,
  lte?: string
): Record<string, unknown> {
  const range: Record<string, string> = {};
  if (gte && gte.trim() !== '') {
    range.gte = gte.trim();
  }
  if (lte && lte.trim() !== '') {
    range.lte = lte.trim();
  }
  return { range: { [field]: range } };
}
