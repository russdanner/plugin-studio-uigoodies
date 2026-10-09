import type { Dispatch } from 'redux';

type PathNavigatorTreeState = {
  id: string;
  expanded: string[];
  childrenByParentPath: Record<string, string[]>;
  totalByPath: Record<string, number>;
  keywordByPath: Record<string, string>;
  offsetByPath: Record<string, number>;
};

function withoutIndex(path: string): string {
  return path.replace(/\/index\.xml$/, '');
}

/**
 * Removes the given paths (and everything under them) from every Sidebar tree.
 *
 * Studio 4.x drops deleted items from `content.itemsByPath` on the delete event, but its tree reducer only
 * prunes when `getParentPath(path)` is a key in `totalByPath`. For a page under another page that is the
 * parent's folder path while the tree keys it as `.../index.xml`, so the tree keeps the deleted path and
 * PathNavigatorTreeItem crashes reading `item.childrenCount`. Call this before deleting.
 *
 * @return ids of the trees that were changed (refresh them if the delete fails).
 */
export function pruneSidebarTrees(
  dispatch: Dispatch,
  trees: Record<string, PathNavigatorTreeState> | undefined,
  paths: string[]
): string[] {
  const roots = paths.filter(Boolean).map(withoutIndex);
  if (!trees || !roots.length) return [];
  const isRemoved = (path: string) => {
    const p = withoutIndex(path);
    return roots.some((root) => p === root || p.startsWith(`${root}/`));
  };

  const changed: string[] = [];
  Object.values(trees).forEach((tree) => {
    if (!tree?.childrenByParentPath) return;
    let touched = false;
    const childrenByParentPath: Record<string, string[]> = {};
    const totalByPath = { ...tree.totalByPath };
    Object.entries(tree.childrenByParentPath).forEach(([parent, children]) => {
      if (isRemoved(parent)) {
        touched = true;
        return;
      }
      const kept = (children ?? []).filter((child) => !isRemoved(child));
      if (kept.length !== (children ?? []).length) {
        touched = true;
        if (typeof totalByPath[parent] === 'number') {
          totalByPath[parent] = Math.max(0, totalByPath[parent] - ((children ?? []).length - kept.length));
        }
      }
      childrenByParentPath[parent] = kept;
    });
    Object.keys(totalByPath).forEach((key) => {
      if (isRemoved(key)) {
        delete totalByPath[key];
        touched = true;
      }
    });
    if (!touched) return;
    const dropKeys = <T>(table: Record<string, T> = {}) =>
      Object.fromEntries(Object.entries(table).filter(([key]) => !isRemoved(key)));
    dispatch({
      type: 'PATH_NAV_TREE_UPDATE',
      payload: {
        id: tree.id,
        childrenByParentPath,
        totalByPath,
        keywordByPath: dropKeys(tree.keywordByPath),
        offsetByPath: dropKeys(tree.offsetByPath),
        expanded: (tree.expanded ?? []).filter((path) => !isRemoved(path))
      }
    });
    changed.push(tree.id);
  });
  return changed;
}

export function refreshSidebarTrees(dispatch: Dispatch, ids: string[]): void {
  ids.forEach((id) => dispatch({ type: 'PATH_NAV_TREE_REFRESH', payload: { id } }));
}
