/**
 * Build a stable CSS selector for an element inside parsed preview HTML.
 * Prefer #id when present; otherwise use a short nth-of-type path from the root.
 */
export function cssSelectorForElement(el: Element | null | undefined): string | undefined {
  if (!el || el.nodeType !== 1) {
    return undefined;
  }

  const id = el.getAttribute('id')?.trim();
  if (id) {
    return `#${escapeCssIdent(id)}`;
  }

  const parts: string[] = [];
  let current: Element | null = el;
  const stopAt = el.ownerDocument?.documentElement ?? null;

  while (current && current !== stopAt && current.parentElement) {
    const parent = current.parentElement;
    const tag = current.tagName.toLowerCase();
    const sameTagSiblings = Array.from(parent.children).filter((child) => child.tagName === current!.tagName);
    if (sameTagSiblings.length === 1) {
      parts.unshift(tag);
    } else {
      const index = sameTagSiblings.indexOf(current) + 1;
      parts.unshift(`${tag}:nth-of-type(${index})`);
    }
    current = parent;
  }

  return parts.length > 0 ? parts.join(' > ') : tagNameSelector(el);
}

function tagNameSelector(el: Element): string {
  return el.tagName.toLowerCase();
}

function escapeCssIdent(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}
