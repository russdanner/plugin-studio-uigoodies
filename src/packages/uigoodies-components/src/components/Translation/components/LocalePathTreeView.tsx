/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import React, { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import StudioAPI from '../api/studio';
import { LOCALE_META, MULTI_LOCALE_BASE_LOCALE } from '../config/multiLocaleConfig';
import { emitDestinationPath as publishDestinationPath } from '../services/subscribe';
import { isTranslationDebugStorage } from '../utils/translationDebug';
import type { LocaleLayoutInfo } from '../hooks/useLocaleLayout';
import TranslationTreeItemLabel from './tree/TranslationTreeItemLabel';
import {
  firstFolderUnderLocale,
  parseLocaleRelative,
  pathForLocale
} from '../utils/localePathUtils';

/** Stable empty reference — avoid new [] each render (breaks memo/deps downstream). */
const EMPTY_LOCALES: string[] = [];

interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  /** Locale flag(s) for filtered rows (missing translation targets). */
  missingTranslationFlags?: string;
}

/** Emoji string for locales where `relativeUnderSourceLocale` has no file yet (excludes source locale). */
async function emojiFlagsForMissingLocales(
  authoringBase: string,
  siteId: string,
  rootDir: string,
  locales: string[],
  sourceLocale: string,
  relativeUnderSourceLocale: string
): Promise<string> {
  const lowerSource = sourceLocale.toLowerCase();
  const checks = await Promise.all(
    locales.map(async (loc) => {
      if (loc.toLowerCase() === lowerSource) {
        return null;
      }
      const p = pathForLocale(rootDir, relativeUnderSourceLocale, loc);
      const exists = await StudioAPI.contentExists(authoringBase, siteId, p);
      if (!exists) {
        const meta = LOCALE_META[loc.toLowerCase()] ?? { flag: '🌐' };
        return meta.flag;
      }
      return null;
    })
  );
  return checks.filter((flag): flag is string => flag != null).join('');
}

function localeFolderEmoji(name: string, locales: string[]): string | undefined {
  const loc = locales.find((l) => l.toLowerCase() === name.toLowerCase());
  if (!loc) {
    return undefined;
  }
  return (LOCALE_META[loc.toLowerCase()] ?? { flag: '🌐' }).flag;
}

/** Immutable: replace `nodeId`'s children with `childNodes` (no in-place mutation). */
function mapReplaceChildren(root: TreeNode, nodeId: string, childNodes: TreeNode[]): TreeNode {
  if (root.id === nodeId) {
    return { ...root, children: childNodes };
  }
  if (!root.children.length) {
    return root;
  }
  return {
    ...root,
    children: root.children.map((c) => mapReplaceChildren(c, nodeId, childNodes))
  };
}

function findNodeByPath(path: string, root: TreeNode | null, anchorRoot: string): TreeNode | null {
  if (!root?.id) {
    return null;
  }

  const subPaths = path.split('/').filter((elm) => !!elm);
  const fullPaths: string[] = [];
  let nextPath = '';
  for (let i = 0; i < subPaths.length; i += 1) {
    if (i === 0) {
      nextPath = `/${subPaths[i]}`;
    } else {
      nextPath = `${nextPath}/${subPaths[i]}`;
    }

    if (nextPath.indexOf(anchorRoot) >= 0) {
      fullPaths.push(nextPath);
    }
  }

  let foundNode: TreeNode | null = null;

  while (fullPaths.length > 0) {
    const currPath = fullPaths.shift()!;
    if (!foundNode) {
      if (root.id === currPath) {
        foundNode = root;
      } else {
        return null;
      }
    } else if (foundNode.children?.length) {
      const child = foundNode.children.find((item) => item.id === currPath);
      if (!child) {
        return null;
      }
      foundNode = child;
    } else {
      return null;
    }
  }

  return foundNode;
}

const LARGE_FOLDER_THRESHOLD = 80;

function applyChildCap(
  paths: string[],
  maxPerFolder: number | undefined
): { paths: string[]; notice: string | null } {
  const max = maxPerFolder ?? Number.POSITIVE_INFINITY;
  if (paths.length <= max) {
    return { paths, notice: null };
  }
  return {
    paths: paths.slice(0, max),
    notice: `Large folder: showing ${max} of ${paths.length} items. Open subfolders or use Studio search for the rest.`
  };
}

export type { LocaleLayoutInfo };

export type PathTreeViewMode = 'traditional' | 'translation';

export type LocalePathTreeViewProps = {
  rootDir: string;
  siteId: string;
  authoringBase: string;
  viewMode: PathTreeViewMode;
  /** When null or viewMode is traditional, tree uses full multi-root layout. */
  localeLayout: LocaleLayoutInfo | null;
  onNodeContextMenu?: (event: React.MouseEvent<HTMLElement>, nodePath: string) => void;
  onSelectedPathChange?: (path: string) => void;
  /** When false, do not notify Translation destination subscriber. */
  emitDestinationPath?: boolean;
  /**
   * Cap how many child nodes mount under one folder. Omit for no cap.
   * Translation dialog passes a default.
   */
  maxChildrenPerFolder?: number;
  /** When true (or `localStorage.translationDebug=1`), logs expand fetches and child counts. */
  debug?: boolean;
  /** Source item path (form or preview) — used to hide locale/folder roots that already have a translation. */
  sourceItemPath?: string | null;
  /**
   * Path of the item currently open in Studio (same as form path when editing). Marks the matching tree row
   * and disables "Edit" for that path in the translation actions menu.
   */
  openItemPath?: string | null;
};

export default function LocalePathTreeView({
  rootDir,
  siteId,
  authoringBase,
  viewMode,
  localeLayout,
  onNodeContextMenu,
  onSelectedPathChange,
  emitDestinationPath = true,
  maxChildrenPerFolder,
  debug = false,
  sourceItemPath = null,
  openItemPath = null
}: LocalePathTreeViewProps) {
  const [nodes, setNodes] = useState<TreeNode | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [folderCapNotice, setFolderCapNotice] = useState<string | null>(null);
  const [rootFilterNotice, setRootFilterNotice] = useState<string | null>(null);
  /** Avoid selection/subscriber storms when MUI TreeView re-fires onNodeSelect with the same node. */
  const lastSelectedPathRef = useRef<string>('');

  const nodesRef = useRef<TreeNode | null>(null);
  nodesRef.current = nodes;
  /** Keeps last expanded list in sync for expand-only lazy loading (avoids duplicate fetch with onNodeSelect). */
  const expandedRef = useRef<string[]>([]);
  const inFlightChildFetchRef = useRef<Set<string>>(new Set());

  const translationActive = viewMode === 'translation' && localeLayout != null;
  const anchorRoot = translationActive ? localeLayout!.baseRootPath : rootDir;
  const locales = localeLayout?.locales ?? EMPTY_LOCALES;

  const fetchChildNodes = useCallback(
    async (nodeId: string, forceUpdate: boolean) => {
      if (!nodeId) {
        return;
      }
      const current = nodesRef.current;
      if (!current) {
        return;
      }
      const foundNode = findNodeByPath(nodeId, current, anchorRoot);
      if (!foundNode) {
        return;
      }
      if (!forceUpdate && foundNode.children.length > 0) {
        return;
      }
      if (inFlightChildFetchRef.current.has(nodeId)) {
        return;
      }
      inFlightChildFetchRef.current.add(nodeId);
      try {
        const items = await StudioAPI.getChildrenPaths(authoringBase, siteId, nodeId);
        if (debug || isTranslationDebugStorage()) {
          // eslint-disable-next-line no-console
          console.log('[Translation] tree fetchChildren', nodeId, 'rawCount=', items.length, 'cap=', maxChildrenPerFolder ?? 'none');
        }
        const { paths: cappedPaths, notice } = applyChildCap(items, maxChildrenPerFolder);
        if (notice) {
          setFolderCapNotice(notice);
        }
        const childNodes: TreeNode[] = cappedPaths.map((item) => ({
          id: item,
          name: item.split('/').pop() || item,
          children: []
        }));

        const apply = () => {
          setNodes((prev) => {
            if (!prev) {
              return prev;
            }
            const target = findNodeByPath(nodeId, prev, anchorRoot);
            if (!target) {
              return prev;
            }
            return mapReplaceChildren(prev, nodeId, childNodes);
          });
        };
        if (childNodes.length >= LARGE_FOLDER_THRESHOLD) {
          startTransition(apply);
        } else {
          apply();
        }
      } finally {
        inFlightChildFetchRef.current.delete(nodeId);
      }
    },
    [authoringBase, siteId, anchorRoot, maxChildrenPerFolder, debug]
  );

  useEffect(() => {
    if (!rootDir || !siteId || !authoringBase) {
      setNodes(null);
      setExpanded([]);
      setSelected('');
      setFolderCapNotice(null);
      lastSelectedPathRef.current = '';
      expandedRef.current = [];
      inFlightChildFetchRef.current.clear();
      return;
    }

    lastSelectedPathRef.current = '';
    inFlightChildFetchRef.current.clear();
    setFolderCapNotice(null);
    setRootFilterNotice(null);
    let cancelled = false;

    (async function loadRoot() {
      if (translationActive && localeLayout) {
        const items = await StudioAPI.getChildrenPaths(authoringBase, siteId, localeLayout.baseRootPath);
        if (cancelled) {
          return;
        }
        if (debug || isTranslationDebugStorage()) {
          // eslint-disable-next-line no-console
          console.log('[Translation] tree loadRoot', 'translation', localeLayout.baseRootPath, 'rawCount=', items.length);
        }
        const { paths: cappedPaths, notice } = applyChildCap(items, maxChildrenPerFolder);
        if (notice) {
          setFolderCapNotice(notice);
        }

        const trimmedSource = sourceItemPath?.trim() ?? '';
        const parsed =
          trimmedSource && localeLayout
            ? parseLocaleRelative(trimmedSource, rootDir, localeLayout.locales)
            : null;

        let pathsToMount = cappedPaths;
        let filterApplied = false;
        const flagsByPath: Record<string, string> = {};

        if (parsed) {
          const folderSeg = firstFolderUnderLocale(parsed.relativeUnderLocale);
          // Only narrow the base-locale tree when the item lives under a subfolder; at locale root,
          // every top-level folder would incorrectly match the same translation check.
          if (folderSeg) {
            filterApplied = true;
            const candidates = cappedPaths.filter((item) => {
              const name = item.split('/').pop() || '';
              return name.toLowerCase() === folderSeg.toLowerCase();
            });
            const nextPaths: string[] = [];
            const flags = await emojiFlagsForMissingLocales(
              authoringBase,
              siteId,
              rootDir,
              localeLayout.locales,
              parsed.locale,
              parsed.relativeUnderLocale
            );
            if (cancelled) {
              return;
            }
            for (const item of candidates) {
              if (flags.length > 0) {
                nextPaths.push(item);
                flagsByPath[item] = flags;
              }
            }
            pathsToMount = nextPaths;
          }
        }

        const childNodes: TreeNode[] = pathsToMount.map((item) => ({
          id: item,
          name: item.split('/').pop() || item,
          children: [],
          missingTranslationFlags: parsed ? flagsByPath[item] : undefined
        }));

        if (filterApplied && childNodes.length === 0) {
          setRootFilterNotice(
            'No folder here still needs a translation for this item (or it lives at the locale root — switch to Traditional view to browse all folders).'
          );
        }

        const next: TreeNode = {
          id: localeLayout.baseRootPath,
          name: `Base (${MULTI_LOCALE_BASE_LOCALE})`,
          children: childNodes
        };
        const apply = () => {
          setNodes(next);
          setExpanded([localeLayout.baseRootPath]);
        };
        if (childNodes.length >= LARGE_FOLDER_THRESHOLD) {
          startTransition(apply);
        } else {
          apply();
        }
        return;
      }

      const items = await StudioAPI.getChildrenPaths(authoringBase, siteId, rootDir);
      if (cancelled) {
        return;
      }
      if (debug || isTranslationDebugStorage()) {
        // eslint-disable-next-line no-console
        console.log('[Translation] tree loadRoot', 'traditional', rootDir, 'rawCount=', items.length);
      }
      const { paths: cappedPaths, notice } = applyChildCap(items, maxChildrenPerFolder);
      if (notice) {
        setFolderCapNotice(notice);
      }

      const trimmedSource = sourceItemPath?.trim() ?? '';
      const parsed =
        trimmedSource && localeLayout
          ? parseLocaleRelative(trimmedSource, rootDir, localeLayout.locales)
          : null;

      let pathsToMount = cappedPaths;
      let filterApplied = false;
      if (parsed && localeLayout) {
        filterApplied = true;
        const rd = rootDir.replace(/\/$/, '');
        const checks = await Promise.all(
          cappedPaths.map(async (item) => {
            const rest = item.startsWith(`${rd}/`) ? item.slice(rd.length + 1) : '';
            const seg = rest.split('/').filter(Boolean)[0];
            const isLocale = localeLayout.locales.some((l) => l.toLowerCase() === seg?.toLowerCase());
            if (!isLocale) {
              return { item, include: true };
            }
            if (seg.toLowerCase() === parsed.locale.toLowerCase()) {
              return { item, include: false };
            }
            const target = pathForLocale(rootDir, parsed.relativeUnderLocale, seg);
            const exists = await StudioAPI.contentExists(authoringBase, siteId, target);
            return { item, include: !exists };
          })
        );
        if (cancelled) {
          return;
        }
        pathsToMount = checks.filter((c) => c.include).map((c) => c.item);
      }

      const childNodes: TreeNode[] = pathsToMount.map((item) => {
        const name = item.split('/').pop() || item;
        const emoji = localeLayout ? localeFolderEmoji(name, localeLayout.locales) : undefined;
        return {
          id: item,
          name,
          children: [],
          missingTranslationFlags: emoji
        };
      });

      if (filterApplied && childNodes.length === 0) {
        setRootFilterNotice('No locale folders left to add — every configured locale already has this item.');
      }

      const next: TreeNode = {
        id: rootDir,
        name: rootDir.split('/').pop() || rootDir,
        children: childNodes
      };
      const apply = () => {
        setNodes(next);
        setExpanded([rootDir]);
      };
      if (childNodes.length >= LARGE_FOLDER_THRESHOLD) {
        startTransition(apply);
      } else {
        apply();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    rootDir,
    siteId,
    authoringBase,
    translationActive,
    localeLayout,
    maxChildrenPerFolder,
    debug,
    sourceItemPath
  ]);

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  const handleToggle = useCallback(
    (_event: React.SyntheticEvent, nodeIds: string[]) => {
      const prev = expandedRef.current;
      expandedRef.current = nodeIds;
      setExpanded(nodeIds);
      const prevSet = new Set(prev);
      for (let i = 0; i < nodeIds.length; i += 1) {
        const id = nodeIds[i];
        if (!prevSet.has(id)) {
          void fetchChildNodes(id, false);
        }
      }
    },
    [fetchChildNodes]
  );

  /** Mirror path only here; lazy-load children on expand in `handleToggle` to avoid duplicate API work with Lab TreeView. */
  const handleSelect = useCallback(
    (_event: React.SyntheticEvent, nodeId: string | null) => {
      if (!nodeId) {
        return;
      }
      const pathChanged = lastSelectedPathRef.current !== nodeId;
      lastSelectedPathRef.current = nodeId;
      setSelected((prev) => (prev === nodeId ? prev : nodeId));
      if (pathChanged) {
        onSelectedPathChange?.(nodeId);
        if (emitDestinationPath) {
          publishDestinationPath(nodeId, 'LocalePathTreeView.select');
        }
      }
    },
    [emitDestinationPath, onSelectedPathChange]
  );

  const renderTree = (tree: TreeNode | null) => {
    if (!tree?.id) {
      return <TreeItem nodeId="__empty-root" label="No folders" />;
    }

    const rowSelected = selected === tree.id;

    return (
      <TreeItem
        key={tree.id}
        nodeId={tree.id}
        sx={{
          '& > .MuiTreeItem-content': {
            borderRadius: 1,
            ...(rowSelected
              ? {
                  bgcolor: 'action.selected',
                  '&:hover': { bgcolor: 'action.selected' }
                }
              : {})
          }
        }}
        label={
          <TranslationTreeItemLabel
            displayName={tree.name}
            nodePath={tree.id}
            rootDir={rootDir}
            baseRootPath={localeLayout?.baseRootPath ?? `${rootDir}/${MULTI_LOCALE_BASE_LOCALE}`}
            locales={locales}
            siteId={siteId}
            translationMode={translationActive}
            missingTranslationFlags={tree.missingTranslationFlags}
            openItemPath={openItemPath}
          />
        }
        onContextMenu={
          onNodeContextMenu
            ? (event) => {
                onNodeContextMenu(event, tree.id);
              }
            : undefined
        }
      >
        {Array.isArray(tree.children) && tree.children.length > 0
          ? tree.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: 'auto',
        borderRadius: 1.5,
        border: 1,
        borderColor: 'divider',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : theme.palette.grey[50]),
        px: 1,
        py: 0.5
      }}
    >
      {folderCapNotice ? (
        <Typography variant="caption" color="warning.main" sx={{ display: 'block', px: 1, pt: 0.75, pb: 0.25 }}>
          {folderCapNotice}
        </Typography>
      ) : null}
      {rootFilterNotice ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', px: 1, pt: 0.75, pb: 0.25 }}>
          {rootFilterNotice}
        </Typography>
      ) : null}
      {!nodes ? (
        <Typography variant="body2" color="text.secondary" sx={{ p: 1.5 }}>
          Loading folders…
        </Typography>
      ) : (
        <TreeView
          key={nodes.id}
          defaultCollapseIcon={<ExpandMoreOutlinedIcon />}
          defaultExpandIcon={<ChevronRightOutlinedIcon />}
          expanded={expanded}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          sx={{ py: 0.5 }}
        >
          {renderTree(nodes)}
        </TreeView>
      )}
    </Box>
  );
}
