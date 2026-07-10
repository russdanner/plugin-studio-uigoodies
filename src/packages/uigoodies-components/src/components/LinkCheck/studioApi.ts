export interface ValidateResultRow {
  url: string;
  ok: boolean;
  status?: number;
  error?: string;
  /** Human-readable explanation (English) with HTTP/API codes in parentheses where useful. */
  detail?: string;
  /** Always `browser` — this plugin only runs checks from the bundled toolbar (no server script). */
  checkedBy?: 'browser';
  /** CSS selectors for <a href> elements pointing at this URL on the preview page. */
  selectors?: string[];
}

export interface ValidateResponse {
  results?: ValidateResultRow[];
  message?: string;
}

function englishHttpDetail(status: number): string {
  const ctx = '(checked in your browser from the plugin bundle)';
  if (status === 401) {
    return `Unauthorized (HTTP 401) ${ctx} — the target returned 401. Preview URLs may require an active preview session.`;
  }
  if (status === 403) {
    return `Forbidden (HTTP 403) ${ctx} — access denied for this URL.`;
  }
  if (status === 404) {
    return `Not found (HTTP 404) ${ctx} — no resource at this URL.`;
  }
  if (status >= 500 && status < 600) {
    return `Server error (HTTP ${status}) ${ctx} — the target server failed while handling the request.`;
  }
  if (status >= 400) {
    return `Client or policy error (HTTP ${status}) ${ctx} — the request was not satisfied.`;
  }
  return `Unexpected status (HTTP ${status}) ${ctx}.`;
}

async function checkUrlInBrowser(url: string): Promise<ValidateResultRow> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      redirect: 'follow',
      mode: 'same-origin'
    });
    const ok = res.status >= 200 && res.status < 400;
    return {
      url,
      ok,
      status: res.status,
      checkedBy: 'browser',
      ...(!ok && { detail: englishHttpDetail(res.status), error: `HTTP ${res.status}` })
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      url,
      ok: false,
      checkedBy: 'browser',
      error: msg,
      detail: `Could not fetch this URL in the browser (${msg}).`
    };
  }
}

/**
 * Keep only URLs that share the preview page origin (same site as the guest iframe).
 * External links are not validated — all checks run only from the plugin bundle in-browser.
 */
export function filterSameOriginPreviewUrls(urls: string[], previewOrigin: string | null | undefined): string[] {
  if (!previewOrigin) {
    return [];
  }
  let base: URL;
  try {
    base = new URL(previewOrigin);
  } catch {
    return [];
  }
  const out: string[] = [];
  const seen = new Set<string>();
  for (const u of urls) {
    try {
      if (new URL(u).origin === base.origin && !seen.has(u)) {
        seen.add(u);
        out.push(u);
      }
    } catch {
      /* skip invalid */
    }
  }
  return out;
}

/**
 * Validates links using **only** the bundled toolbar code: same-origin-as-preview URLs are checked
 * with `fetch` in the browser. No Studio REST script, no server-side requests to arbitrary URLs.
 * External (different-origin) links are ignored.
 */
export async function validateAllLinks(
  urls: string[],
  opts?: { previewOrigin?: string | null }
): Promise<ValidateResponse> {
  const previewOrigin = opts?.previewOrigin ?? null;
  const toCheck = filterSameOriginPreviewUrls(urls, previewOrigin);

  if (urls.length > 0 && toCheck.length === 0) {
    return {
      results: [],
      message:
        'No links on the preview origin to check. This plugin validates only same-origin URLs; external links are skipped.'
    };
  }

  const results = await Promise.all(toCheck.map((u) => checkUrlInBrowser(u)));
  return { results };
}

/** @deprecated Use validateAllLinks(urls, opts) */
export async function validateUrls(_siteId: string, urls: string[], opts?: { previewOrigin?: string | null }): Promise<ValidateResponse> {
  return validateAllLinks(urls, opts);
}
