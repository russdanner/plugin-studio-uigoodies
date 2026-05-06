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
