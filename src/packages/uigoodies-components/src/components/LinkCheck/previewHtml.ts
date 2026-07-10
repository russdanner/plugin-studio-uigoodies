/**
 * Read preview DOM HTML (same-origin iframe) or fetch the guest page URL.
 */
import { cssSelectorForElement } from './cssSelector';

export async function getPreviewHtml(pageUrl: string): Promise<string | null> {
  const iframe = document.getElementById('crafterCMSPreviewIframe') as HTMLIFrameElement | null;
  try {
    const root = iframe?.contentDocument?.documentElement;
    if (root) {
      return root.outerHTML;
    }
  } catch {
    // cross-origin iframe
  }

  try {
    const res = await fetch(pageUrl, {
      credentials: 'include',
      mode: 'cors',
      cache: 'no-store'
    });
    if (!res.ok) {
      return null;
    }
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Collect unique absolute http(s) URLs from anchor hrefs (fragments stripped for the request).
 */
export function extractHttpUrlsFromAnchors(html: string, baseUrl: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  let base: URL;
  try {
    base = new URL(baseUrl);
  } catch {
    return [];
  }

  const seen = new Set<string>();
  doc.querySelectorAll('a[href]').forEach((el) => {
    const href = el.getAttribute('href')?.trim();
    if (!href) {
      return;
    }
    const lower = href.toLowerCase();
    if (
      lower.startsWith('javascript:') ||
      lower.startsWith('mailto:') ||
      lower.startsWith('tel:') ||
      lower.startsWith('data:')
    ) {
      return;
    }
    if (href === '#' || (href.startsWith('#') && !href.includes('://'))) {
      return;
    }
    try {
      const abs = new URL(href, base);
      const u = abs.href;
      const noHash = u.split('#')[0];
      if (noHash.startsWith('http:') || noHash.startsWith('https:')) {
        seen.add(noHash);
      }
    } catch {
      /* ignore invalid */
    }
  });

  return Array.from(seen);
}

export type AnchorUrlRef = {
  url: string;
  selector: string;
  href: string;
};

/**
 * Map each same-origin http(s) anchor target to one or more CSS selectors in the parsed HTML.
 */
export function extractAnchorUrlRefs(html: string, baseUrl: string): AnchorUrlRef[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  let base: URL;
  try {
    base = new URL(baseUrl);
  } catch {
    return [];
  }

  const refs: AnchorUrlRef[] = [];
  const seen = new Set<string>();

  doc.querySelectorAll('a[href]').forEach((node) => {
    const el = node as HTMLAnchorElement;
    const href = el.getAttribute('href')?.trim();
    if (!href) {
      return;
    }
    const lower = href.toLowerCase();
    if (
      lower.startsWith('javascript:') ||
      lower.startsWith('mailto:') ||
      lower.startsWith('tel:') ||
      lower.startsWith('data:')
    ) {
      return;
    }
    if (href === '#' || (href.startsWith('#') && !href.includes('://'))) {
      return;
    }
    try {
      const abs = new URL(href, base);
      const noHash = abs.href.split('#')[0];
      if (!noHash.startsWith('http:') && !noHash.startsWith('https:')) {
        return;
      }
      const selector = cssSelectorForElement(el);
      if (!selector) {
        return;
      }
      const key = `${noHash}\0${selector}`;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      refs.push({ url: noHash, selector, href });
    } catch {
      /* ignore invalid */
    }
  });

  return refs;
}

export function selectorsByUrl(refs: AnchorUrlRef[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  refs.forEach((ref) => {
    const list = map.get(ref.url) ?? [];
    if (!list.includes(ref.selector)) {
      list.push(ref.selector);
    }
    map.set(ref.url, list);
  });
  return map;
}

export function guestPageUrl(guest: { origin?: string; url?: string } | null): string | null {
  if (!guest?.origin || guest.url == null) {
    return null;
  }
  return guest.origin + guest.url;
}
