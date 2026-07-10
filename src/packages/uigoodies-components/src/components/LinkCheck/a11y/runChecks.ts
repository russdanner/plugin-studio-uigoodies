/**
 * Bundled accessibility heuristics (WCAG-aligned hints). Not a full audit — manual testing still required.
 *
 * Implementation is original to this plugin (MIT). Checks are aligned with WCAG 2.1 success criteria as
 * described in public W3C guidance (facts are not copyrightable). We do not ship or embed third-party
 * rule engines (e.g. axe-core); rules are maintained here for a small, dependency-free bundle.
 */

import { cssSelectorForElement } from '../cssSelector';

export type A11ySeverity = 'critical' | 'serious' | 'moderate' | 'minor';

export interface A11yIssue {
  ruleId: string;
  severity: A11ySeverity;
  /** WCAG 2.x success criterion reference where applicable */
  wcag?: string;
  message: string;
  /** Short selector or tag context for authors */
  context?: string;
  /** CSS selector to locate the element in the live preview iframe */
  selector?: string;
}

function push(issues: A11yIssue[], issue: A11yIssue): void {
  issues.push(issue);
}

function pushForElement(issues: A11yIssue[], el: Element, issue: Omit<A11yIssue, 'selector'>): void {
  push(issues, { ...issue, selector: cssSelectorForElement(el) });
}

function idExists(doc: Document, id: string): boolean {
  return Boolean(id && doc.getElementById(id));
}

function normalizeText(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

/** Suspicious link text (sole link content) — common anti-pattern per public WCAG technique guidance. */
const SUSPICIOUS_LINK_TEXT = new Set([
  'click here',
  'read more',
  'here',
  'more',
  'learn more',
  'link',
  'details',
  'this',
  'more here',
  'download'
]);

function checkAriaTokenRefs(
  doc: Document,
  issues: A11yIssue[],
  el: Element,
  attr: 'aria-labelledby' | 'aria-describedby',
  ruleId: string,
  wcag: string
): void {
  const raw = el.getAttribute(attr)?.trim();
  if (!raw) {
    return;
  }
  const tokens = raw.split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    if (!idExists(doc, token)) {
      pushForElement(issues, el, {
        ruleId,
        severity: 'serious',
        wcag,
        message: `${attr} references id "${token}" but no element with that id exists in the document.`,
        context: el.tagName.toLowerCase()
      });
    }
  }
}

function metaViewportRestrictsZoom(content: string): boolean {
  const c = content.toLowerCase().replace(/\s+/g, '');
  return (
    c.includes('user-scalable=no') ||
    c.includes('user-scalable=0') ||
    /maximum-scale=1(\.0)?(?![0-9])/.test(c) ||
    c.includes('maximum-scale=1;')
  );
}

/**
 * Parse preview HTML and collect issues. Runs entirely in the bundled toolbar (no network).
 */
export function runA11yChecks(html: string): A11yIssue[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const issues: A11yIssue[] = [];

  const root = doc.documentElement;
  if (root && root.tagName.toLowerCase() === 'html' && !root.getAttribute('lang')?.trim()) {
    push(issues, {
      ruleId: 'html-lang',
      severity: 'serious',
      wcag: '3.1.1',
      message: 'The root <html> element should have a lang attribute.',
      context: 'html',
      selector: 'html'
    });
  }

  const titleEl = doc.querySelector('title');
  const titleText = titleEl?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  if (!titleText) {
    push(issues, {
      ruleId: 'document-title',
      severity: 'serious',
      wcag: '2.4.2',
      message: 'The page should have a non-empty <title> in <head>.',
      context: 'title',
      selector: 'head'
    });
  }

  const head = doc.querySelector('head');
  const hasCharset =
    doc.querySelector('meta[charset]') !== null ||
    doc.querySelector('meta[http-equiv="Content-Type" i]') !== null;
  if (head && !hasCharset) {
    push(issues, {
      ruleId: 'html-charset',
      severity: 'moderate',
      wcag: '4.1.1',
      message: 'Declare character encoding (e.g. <meta charset="utf-8">) in <head>.',
      context: 'head',
      selector: 'head'
    });
  }

  doc.querySelectorAll('meta[name="viewport" i]').forEach((meta) => {
    const content = meta.getAttribute('content') ?? '';
    if (metaViewportRestrictsZoom(content)) {
      pushForElement(issues, meta, {
        ruleId: 'meta-viewport-zoom',
        severity: 'moderate',
        wcag: '1.4.10',
        message:
          'Viewport meta should not disable zoom (avoid user-scalable=no or maximum-scale=1) unless you have a documented exception.',
        context: 'meta[name=viewport]'
      });
    }
  });

  doc.querySelectorAll('meta[http-equiv="refresh" i]').forEach((meta) => {
    const c = meta.getAttribute('content') ?? '';
    if (/\d+\s*;\s*url\s*=/i.test(c) || /^\d+\s*$/i.test(c.trim())) {
      pushForElement(issues, meta, {
        ruleId: 'meta-refresh',
        severity: 'moderate',
        wcag: '2.2.1',
        message: 'Avoid auto-refresh redirects; they can disorient users and interfere with reading time.',
        context: 'meta[http-equiv=refresh]'
      });
    }
  });

  doc.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('alt')) {
      pushForElement(issues, img, {
        ruleId: 'img-missing-alt',
        severity: 'serious',
        wcag: '1.1.1',
        message: 'Images must have an alt attribute (use alt="" if decorative).',
        context: 'img'
      });
    }
  });

  doc.querySelectorAll('input[type="image" i]').forEach((inp) => {
    if (!inp.hasAttribute('alt')) {
      pushForElement(issues, inp, {
        ruleId: 'input-image-alt',
        severity: 'serious',
        wcag: '1.1.1',
        message: 'input[type=image] must have an alt attribute describing the button.',
        context: 'input[type=image]'
      });
    }
  });

  doc.querySelectorAll('a[href]').forEach((a) => {
    const text = (a.textContent || '').replace(/\s+/g, ' ').trim();
    const aria = a.getAttribute('aria-label')?.trim();
    const title = a.getAttribute('title')?.trim();
    if (!text && !aria && !title) {
      pushForElement(issues, a, {
        ruleId: 'link-name',
        severity: 'serious',
        wcag: '2.4.4',
        message: 'Links should have visible text, aria-label, or title.',
        context: 'a'
      });
    } else if (text && !aria && !title) {
      const norm = normalizeText(text);
      if (SUSPICIOUS_LINK_TEXT.has(norm)) {
        pushForElement(issues, a, {
          ruleId: 'link-suspicious-text',
          severity: 'moderate',
          wcag: '2.4.4',
          message: 'Link text is vague; use descriptive text that makes sense out of context.',
          context: 'a'
        });
      }
    }
  });

  doc.querySelectorAll('button').forEach((btn) => {
    const text = (btn.textContent || '').replace(/\s+/g, ' ').trim();
    const aria = btn.getAttribute('aria-label')?.trim();
    if (!text && !aria) {
      pushForElement(issues, btn, {
        ruleId: 'button-name',
        severity: 'serious',
        wcag: '4.1.2',
        message: 'Buttons should have visible text or aria-label.',
        context: 'button'
      });
    }
  });

  const h1s = doc.querySelectorAll('h1');
  if (h1s.length > 1) {
    pushForElement(issues, h1s[0], {
      ruleId: 'heading-multiple-h1',
      severity: 'moderate',
      wcag: '1.3.1',
      message: 'Multiple <h1> elements found; prefer a single top-level heading per page unless using a documented pattern.',
      context: 'h1'
    });
  }

  const firstHeading = doc.querySelector('h1, h2, h3, h4, h5, h6');
  if (firstHeading && firstHeading.tagName.toLowerCase() !== 'h1') {
    pushForElement(issues, firstHeading, {
      ruleId: 'heading-no-h1',
      severity: 'minor',
      wcag: '1.3.1',
      message: 'First heading is not <h1>; consider starting the main outline with an h1 for consistency.',
      context: firstHeading.tagName.toLowerCase()
    });
  }

  const idCounts = new Map<string, number>();
  doc.querySelectorAll('[id]').forEach((el) => {
    const id = el.id;
    if (id) {
      idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
    }
  });
  idCounts.forEach((count, id) => {
    if (count > 1) {
      const first = doc.getElementById(id);
      push(issues, {
        ruleId: 'duplicate-id',
        severity: 'serious',
        wcag: '4.1.1',
        message: `Duplicate id "${id}" appears ${count} times; ids must be unique.`,
        context: `#${id}`,
        selector: first ? cssSelectorForElement(first) : `#${id}`
      });
    }
  });

  doc.querySelectorAll('[aria-label]').forEach((el) => {
    const v = el.getAttribute('aria-label');
    if (v !== null && v.trim() === '') {
      pushForElement(issues, el, {
        ruleId: 'aria-label-empty',
        severity: 'moderate',
        wcag: '4.1.2',
        message: 'aria-label is present but empty; remove it or provide a meaningful name.',
        context: el.tagName.toLowerCase()
      });
    }
  });

  doc.querySelectorAll('[aria-labelledby], [aria-describedby]').forEach((el) => {
    checkAriaTokenRefs(doc, issues, el, 'aria-labelledby', 'aria-labelledby-missing', '1.3.1');
    checkAriaTokenRefs(doc, issues, el, 'aria-describedby', 'aria-describedby-missing', '1.3.1');
  });

  doc.querySelectorAll('[tabindex]').forEach((el) => {
    const t = el.getAttribute('tabindex');
    if (t == null) {
      return;
    }
    const n = parseInt(t, 10);
    if (!Number.isNaN(n) && n > 0) {
      pushForElement(issues, el, {
        ruleId: 'tabindex-positive',
        severity: 'moderate',
        wcag: '2.4.3',
        message: 'Positive tabindex values can disrupt focus order; prefer natural DOM order or tabindex="0".',
        context: el.tagName.toLowerCase()
      });
    }
  });

  doc.querySelectorAll('iframe').forEach((frame) => {
    const t = frame.getAttribute('title')?.trim();
    if (!t) {
      pushForElement(issues, frame, {
        ruleId: 'iframe-title',
        severity: 'serious',
        wcag: '4.1.2',
        message: 'Frames should have a title attribute describing their purpose.',
        context: 'iframe'
      });
    }
  });

  doc.querySelectorAll('object, embed').forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const title = el.getAttribute('title')?.trim();
    const aria = el.getAttribute('aria-label')?.trim();
    if (!title && !aria) {
      pushForElement(issues, el, {
        ruleId: `${tag}-name`,
        severity: 'serious',
        wcag: '4.1.2',
        message: `<${tag}> should have a title or aria-label describing the embedded content.`,
        context: tag
      });
    }
  });

  doc.querySelectorAll('svg').forEach((svg) => {
    const role = svg.getAttribute('role')?.toLowerCase();
    if (role === 'img') {
      const aria = svg.getAttribute('aria-label')?.trim();
      const title = svg.querySelector('title')?.textContent?.trim();
      if (!aria && !title) {
        pushForElement(issues, svg, {
          ruleId: 'svg-img-name',
          severity: 'serious',
          wcag: '1.1.1',
          message: 'SVG with role="img" should have aria-label or a <title> child.',
          context: 'svg'
        });
      }
    }
  });

  doc.querySelectorAll('fieldset').forEach((fs) => {
    if (!fs.querySelector('legend')) {
      pushForElement(issues, fs, {
        ruleId: 'fieldset-legend',
        severity: 'moderate',
        wcag: '1.3.1',
        message: '<fieldset> should include a <legend> describing the group.',
        context: 'fieldset'
      });
    }
  });

  doc.querySelectorAll('table').forEach((table) => {
    const role = table.getAttribute('role')?.toLowerCase();
    if (role === 'presentation' || role === 'none') {
      return;
    }
    const hasTh = table.querySelector('th') !== null;
    if (!hasTh) {
      pushForElement(issues, table, {
        ruleId: 'table-headers',
        severity: 'moderate',
        wcag: '1.3.1',
        message: 'Data tables should use <th> for headers (or verify this is a layout table with role presentation).',
        context: 'table'
      });
    }
  });

  doc.querySelectorAll('video').forEach((video) => {
    if (video.hasAttribute('muted') && video.hasAttribute('autoplay')) {
      return;
    }
    const hasCaptions =
      video.querySelector('track[kind="captions" i]') !== null ||
      video.querySelector('track[kind="subtitles" i]') !== null;
    if (!hasCaptions) {
      pushForElement(issues, video, {
        ruleId: 'video-captions',
        severity: 'moderate',
        wcag: '1.2.2',
        message: 'Prerecorded video should include captions (e.g. <track kind="captions">) unless exempt.',
        context: 'video'
      });
    }
  });

  doc.querySelectorAll('audio').forEach((audio) => {
    if (!audio.hasAttribute('controls')) {
      pushForElement(issues, audio, {
        ruleId: 'audio-controls',
        severity: 'minor',
        wcag: '1.1.1',
        message: 'Audio elements should expose controls so users can adjust playback.',
        context: 'audio'
      });
    }
  });

  doc.querySelectorAll('blink, marquee').forEach((el) => {
    pushForElement(issues, el, {
      ruleId: 'deprecated-element',
      severity: 'moderate',
      wcag: '2.2.2',
      message: `Avoid deprecated <${el.tagName.toLowerCase()}>; it can distract users or cause seizures.`,
      context: el.tagName.toLowerCase()
    });
  });

  doc.querySelectorAll('[accesskey]').forEach((el) => {
    pushForElement(issues, el, {
      ruleId: 'accesskey',
      severity: 'minor',
      wcag: '2.1.4',
      message: 'accesskey can conflict with assistive tech and browser shortcuts; use sparingly.',
      context: el.tagName.toLowerCase()
    });
  });

  doc.querySelectorAll('a button, a input, a textarea, a select').forEach((el) => {
    pushForElement(issues, el, {
      ruleId: 'interactive-nested-in-link',
      severity: 'moderate',
      wcag: '4.1.2',
      message: 'Avoid nesting interactive elements inside a link; use a single focusable control.',
      context: el.tagName.toLowerCase()
    });
  });

  doc.querySelectorAll('figure').forEach((fig) => {
    if ((fig.querySelector('img') || fig.querySelector('picture')) && !fig.querySelector('figcaption')) {
      pushForElement(issues, fig, {
        ruleId: 'figure-figcaption',
        severity: 'moderate',
        wcag: '1.1.1',
        message: 'Figures with images should include a <figcaption> or ensure the image alt is sufficient in context.',
        context: 'figure'
      });
    }
  });

  doc.querySelectorAll('ul, ol').forEach((list) => {
    const invalidChild = Array.from(list.children).some((child) => {
      const t = child.tagName.toLowerCase();
      return t !== 'li' && t !== 'script' && t !== 'template';
    });
    if (invalidChild) {
      pushForElement(issues, list, {
        ruleId: 'list-structure',
        severity: 'moderate',
        wcag: '1.3.1',
        message: 'List elements should only contain <li>, <script>, or <template> as direct children.',
        context: list.tagName.toLowerCase()
      });
    }
  });

  doc.querySelectorAll('abbr').forEach((abbr) => {
    if (!abbr.getAttribute('title')?.trim()) {
      pushForElement(issues, abbr, {
        ruleId: 'abbr-title',
        severity: 'minor',
        wcag: '3.1.4',
        message: 'Abbreviations should provide expansion via a title attribute (or surrounding text).',
        context: 'abbr'
      });
    }
  });

  doc.querySelectorAll('area[href]').forEach((area) => {
    if (!area.hasAttribute('alt')) {
      pushForElement(issues, area, {
        ruleId: 'area-alt',
        severity: 'serious',
        wcag: '1.1.1',
        message: 'Image map <area> elements should have an alt attribute describing the destination.',
        context: 'area'
      });
    }
  });

  doc.querySelectorAll('canvas').forEach((canvas) => {
    const aria = canvas.getAttribute('aria-label')?.trim();
    const labelledby = canvas.getAttribute('aria-labelledby')?.trim();
    const fallback = canvas.textContent?.replace(/\s+/g, ' ').trim();
    if (!aria && !labelledby && !fallback) {
      pushForElement(issues, canvas, {
        ruleId: 'canvas-fallback',
        severity: 'moderate',
        wcag: '1.1.1',
        message: 'Canvas should have accessible text (aria-label, aria-labelledby, or fallback content).',
        context: 'canvas'
      });
    }
  });

  doc.querySelectorAll('[autofocus]').forEach((el) => {
    pushForElement(issues, el, {
      ruleId: 'autofocus',
      severity: 'minor',
      wcag: '2.4.3',
      message: 'autofocus moves focus on load and can disorient users; use only when intentional.',
      context: el.tagName.toLowerCase()
    });
  });

  doc.querySelectorAll('input, select, textarea').forEach((control) => {
    if (control.tagName.toLowerCase() === 'input') {
      const type = (control as HTMLInputElement).type?.toLowerCase() ?? 'text';
      if (type === 'hidden' || type === 'button' || type === 'submit' || type === 'reset') {
        return;
      }
    }
    const wrappedInLabel = control.closest('label');
    const id = control.getAttribute('id');
    const labelByFor =
      id &&
      Array.from(doc.querySelectorAll('label[for]')).find((l) => l.getAttribute('for') === id);
    const ariaLabel = control.getAttribute('aria-label')?.trim();
    const ariaLabelledby = control.getAttribute('aria-labelledby')?.trim();
    const hasVisibleLabel = !!(wrappedInLabel || labelByFor);
    const hasAccessibleName = !!(hasVisibleLabel || ariaLabel || ariaLabelledby);

    if (!hasAccessibleName) {
      pushForElement(issues, control, {
        ruleId: 'form-label',
        severity: 'moderate',
        wcag: '1.3.1',
        message:
          'Form controls should have an accessible name (label, aria-label, or aria-labelledby). Do not rely on placeholder alone.',
        context: control.tagName.toLowerCase()
      });
    }
  });

  return issues;
}
