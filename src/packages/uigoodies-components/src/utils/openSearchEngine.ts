export type OpenSearchEngineResult = {
  ok: boolean;
  status: number;
  bodyText: string;
  parsedJson: unknown | null;
};

/**
 * Executes a raw OpenSearch JSON body against Crafter Engine for the given site.
 * @see https://docs.craftercms.org/en/4.2/_static/api/engine.html#tag/search/operation/search
 */
export async function executeOpenSearchOnEngine(
  siteId: string,
  jsonBody: string,
  extraIndexes?: string,
  queryParams?: Record<string, string | number | boolean>
): Promise<OpenSearchEngineResult> {
  const params = new URLSearchParams();
  params.set('crafterSite', siteId);
  if (extraIndexes && extraIndexes.trim() !== '') {
    params.set('index', extraIndexes.trim());
  }
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === '' || value == null) {
        return;
      }
      params.set(key, String(value));
    });
  }
  const url = `/api/1/site/search/search.json?${params.toString()}`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: jsonBody
  });
  const bodyText = await res.text();
  let parsedJson: unknown | null = null;
  try {
    parsedJson = JSON.parse(bodyText);
  } catch {
    parsedJson = null;
  }
  return { ok: res.ok, status: res.status, bodyText, parsedJson };
}

export function prettifyJson(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) {
    return '';
  }
  return JSON.stringify(JSON.parse(trimmed), null, 2);
}

export type IndexDumpProgress = {
  fetched: number;
  total: number | null;
  batches: number;
};

export type IndexDumpResult = {
  index: string;
  total: number | null;
  took_total_ms: number;
  batches: number;
  hits: unknown[];
  /** True when total exceeds OpenSearch `index.max_result_window` and we stopped paging early. */
  truncated: boolean;
};

/**
 * Dump an index by paging `match_all` through Crafter's existing search endpoint
 * (`/api/1/site/search/search.json`). Uses `from`/`size` pagination — same auth/CORS context
 * as the regular Run button, so no extra configuration is needed.
 *
 * NOTE: OpenSearch's `from + size` is bounded by `index.max_result_window` (default 10,000).
 * If the index has more docs than that, `truncated: true` is returned. For larger dumps,
 * use the scroll or PIT/search_after API directly against OpenSearch.
 */
export async function dumpIndexThroughEngine(
  siteId: string,
  opts: {
    extraIndexes?: string;
    batchSize?: number;
    onProgress?: (p: IndexDumpProgress) => void;
  } = {}
): Promise<IndexDumpResult> {
  if (!siteId || !siteId.trim()) {
    throw new Error('Active site is required.');
  }
  const batchSize = Math.max(1, Math.min(opts.batchSize ?? 1000, 1000));
  const indexLabel = opts.extraIndexes?.trim() || siteId;

  const allHits: unknown[] = [];
  let totalTook = 0;
  let batches = 0;
  let total: number | null = null;
  let from = 0;
  let truncated = false;
  const MAX_BATCHES = 10_000; // safety net

  while (batches < MAX_BATCHES) {
    const body = {
      from,
      size: batchSize,
      query: { match_all: {} },
      sort: [{ _doc: 'asc' }]
    };
    const result = await executeOpenSearchOnEngine(
      siteId,
      JSON.stringify(body),
      opts.extraIndexes,
      { track_total_hits: true }
    );
    if (!result.ok) {
      throw new Error(`Crafter search.json HTTP ${result.status}: ${result.bodyText.slice(0, 400)}`);
    }
    const json = result.parsedJson as
      | {
          took?: number;
          hits?: { total?: number | { value?: number }; hits?: unknown[] };
        }
      | null;
    if (!json) {
      throw new Error('Crafter search.json returned a non-JSON body.');
    }
    totalTook += json.took ?? 0;
    if (total === null) {
      const totalRaw = json.hits?.total;
      if (typeof totalRaw === 'number') {
        total = totalRaw;
      } else if (totalRaw && typeof totalRaw === 'object' && typeof totalRaw.value === 'number') {
        total = totalRaw.value;
      }
    }
    const batch = json.hits?.hits ?? [];
    if (batch.length === 0) {
      break;
    }
    allHits.push(...batch);
    batches += 1;
    opts.onProgress?.({ fetched: allHits.length, total, batches });

    if (batch.length < batchSize) {
      break;
    }
    from += batchSize;
    // OpenSearch refuses from + size > index.max_result_window (default 10000).
    if (from + batchSize > 10_000) {
      if (total !== null && allHits.length < total) {
        truncated = true;
      }
      break;
    }
  }

  return {
    index: indexLabel,
    total,
    took_total_ms: totalTook,
    batches,
    hits: allHits,
    truncated
  };
}
