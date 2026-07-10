import { cssSelectorForElement } from './cssSelector';

const HIGHLIGHT_CLASS = 'crafter-linkcheck-issue-highlight';
const STYLE_ID = 'crafter-linkcheck-issue-highlight-style';

let activeHighlightEl: Element | null = null;
let activeHighlightTimer: number | undefined;

export function getPreviewDocument(): Document | null {
  const iframe = document.getElementById('crafterCMSPreviewIframe') as HTMLIFrameElement | null;
  try {
    return iframe?.contentDocument ?? null;
  } catch {
    return null;
  }
}

function ensureHighlightStyle(doc: Document): void {
  if (doc.getElementById(STYLE_ID)) {
    return;
  }
  const style = doc.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
.${HIGHLIGHT_CLASS} {
  outline: 3px solid #e53935 !important;
  outline-offset: 2px !important;
  box-shadow: 0 0 0 4px rgba(229, 57, 53, 0.22) !important;
  scroll-margin: 64px 16px !important;
}`;
  (doc.head ?? doc.documentElement).appendChild(style);
}

function clearHighlight(): void {
  if (activeHighlightEl) {
    activeHighlightEl.classList.remove(HIGHLIGHT_CLASS);
    activeHighlightEl = null;
  }
  if (activeHighlightTimer != null) {
    window.clearTimeout(activeHighlightTimer);
    activeHighlightTimer = undefined;
  }
}

function highlightBriefly(el: Element): void {
  clearHighlight();
  const doc = el.ownerDocument;
  ensureHighlightStyle(doc);
  el.classList.add(HIGHLIGHT_CLASS);
  activeHighlightEl = el;
  activeHighlightTimer = window.setTimeout(() => clearHighlight(), 2200);
}

export function jumpToPreviewElement(el: Element | null | undefined): boolean {
  if (!el || el.nodeType !== 1) {
    return false;
  }
  try {
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    highlightBriefly(el);
    return true;
  } catch {
    return false;
  }
}

export function jumpToPreviewSelector(selector: string | null | undefined): boolean {
  const trimmed = String(selector || '').trim();
  if (!trimmed) {
    return false;
  }
  const doc = getPreviewDocument();
  if (!doc) {
    return false;
  }
  let el: Element | null = null;
  try {
    el = doc.querySelector(trimmed);
  } catch {
    return false;
  }
  return jumpToPreviewElement(el);
}

/** Resolve a selector captured from parsed HTML against the live preview document. */
export function jumpToPreviewSelectorFromParsedHtml(selector: string | null | undefined): boolean {
  if (jumpToPreviewSelector(selector)) {
    return true;
  }
  const doc = getPreviewDocument();
  if (!doc || !selector) {
    return false;
  }
  if (selector.startsWith('#')) {
    const id = selector.slice(1).replace(/\\/g, '');
    return jumpToPreviewElement(doc.getElementById(id));
  }
  return false;
}

export function selectorForPreviewElement(el: Element | null | undefined): string | undefined {
  return cssSelectorForElement(el);
}
