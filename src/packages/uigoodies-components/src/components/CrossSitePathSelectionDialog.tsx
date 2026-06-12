/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Stock Studio path selection is bound to the active project. This dialog mirrors that UX
 * but loads content via explicit siteId (fetchChildrenByPath / checkPathExistence).
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ErrorRounded from '@mui/icons-material/ErrorRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { BasePathSelector, DialogBody, DialogFooter, DialogHeader } from '@craftercms/studio-ui';
import ItemTypeIcon from '@craftercms/studio-ui/components/ItemTypeIcon';
import { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { GetChildrenResponse } from '@craftercms/studio-ui/models/GetChildrenResponse';
import { SystemType } from '@craftercms/studio-ui/models/SystemType';
import { checkPathExistence, fetchChildrenByPath } from '@craftercms/studio-ui/services/content';
import { getIndividualPaths, getRootPath, withIndex, withoutFile, withoutIndex } from '@craftercms/studio-ui/utils/path';
import { takeUntil } from 'rxjs/operators';
import useUnmount$ from '@craftercms/studio-ui/hooks/useUnmount$';

const DEFAULT_ROOT = '/site';
const TREE_FETCH_LIMIT = 100;

/** Same roots as Studio's PathSelectionDialog BasePathSelector defaults. */
const STUDIO_BASE_PATHS = [
  { id: 'content', path: '/site' },
  { id: 'assets', path: '/static-assets' },
  { id: 'templates', path: '/templates' },
  { id: 'scripts', path: '/scripts' }
];

function getTreeSystemTypes(rootPath: string): SystemType[] {
  switch (getRootPath(rootPath || DEFAULT_ROOT)) {
    case '/static-assets':
      return ['folder', 'asset'];
    case '/templates':
      return ['folder', 'renderingTemplate'];
    case '/scripts':
      return ['folder', 'script'];
    default:
      return ['folder', 'page', 'component'];
  }
}

function allowsFileSelection(rootPath: string): boolean {
  const root = getRootPath(rootPath || '');
  return root === '/static-assets' || root === '/templates' || root === '/scripts';
}

type ParsedChildrenResponse = {
  items: SandboxItem[];
  total: number;
};

function parseChildrenResponse(response: GetChildrenResponse): ParsedChildrenResponse {
  const items: SandboxItem[] = [];
  for (let index = 0; index < response.length; index++) {
    const item = response[index];
    if (item?.path) {
      items.push(item);
    }
  }
  if (response.levelDescriptor?.path) {
    items.unshift(response.levelDescriptor);
  }
  return {
    items,
    total: response.total ?? items.length
  };
}

function getChildrenFetchPath(itemPath: string): string {
  if (itemPath.startsWith('/site/website') && itemPath.endsWith('/index.xml')) {
    return withoutIndex(itemPath);
  }
  return itemPath;
}

function isWebsiteFolderPage(item: SandboxItem): boolean {
  return item.systemType === 'page' && item.path.startsWith('/site/website') && item.path.endsWith('/index.xml');
}

/** Tree item ids for website folder pages use index.xml; folder paths from the path field do not. */
function toTreeItemId(contentPath: string): string {
  const normalized = contentPath.replace(/\/$/, '');
  if (normalized === '/site/website') {
    return withIndex(normalized);
  }
  return contentPath;
}

function pathsMatchForSelection(selectedPath: string, itemPath: string): boolean {
  return selectedPath === itemPath || withoutIndex(selectedPath) === withoutIndex(itemPath);
}

function isBranchNode(item: SandboxItem, children: SandboxItem[] | undefined, isRoot = false): boolean {
  if (isRoot) {
    return true;
  }
  if (children !== undefined) {
    return children.length > 0;
  }
  if (item.systemType === 'folder') {
    return true;
  }
  if (item.systemType === 'page') {
    return (item.childrenCount ?? 0) > 0 || isWebsiteFolderPage(item);
  }
  return false;
}

function rootItem(rootPath: string): SandboxItem {
  const name = rootPath.split('/').filter(Boolean).pop() ?? rootPath;
  return {
    path: rootPath,
    label: name,
    systemType: 'folder'
  } as SandboxItem;
}

type SourcePathSelectionInputProps = {
  siteId: string;
  rootPath: string;
  currentPath: string;
  allowFiles?: boolean;
  onChange: (path: string) => void;
  allowSwitchingRootPath?: boolean;
  onChangeRoot?: () => void;
};

function SourcePathSelectionInput({
  siteId,
  rootPath,
  currentPath,
  allowFiles = false,
  onChange,
  allowSwitchingRootPath = false,
  onChangeRoot
}: SourcePathSelectionInputProps) {
  const unmount$ = useUnmount$();
  const [path, setPath] = useState('');
  const [pathExists, setPathExists] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const relative = withoutIndex(currentPath.startsWith(rootPath) ? currentPath.slice(rootPath.length) : currentPath);
    setPath(relative);
    setPathExists(null);
    setIsChecking(false);
  }, [rootPath, currentPath]);

  const getFullPath = () => `${rootPath}${path}`.trim();

  const validatePath = () => {
    setIsChecking(true);
    let value = getFullPath();
    if (!allowFiles) {
      value = withoutFile(value);
    }
    value = value.replace(/\/$/, '');
    const relative = value.startsWith(rootPath) ? value.slice(rootPath.length) : value;
    setPath(relative);

    checkPathExistence(siteId, value)
      .pipe(takeUntil(unmount$))
      .subscribe({
        next(exists) {
          setIsChecking(false);
          setPathExists(exists);
          if (exists) {
            onChange(value);
          }
        },
        error() {
          setIsChecking(false);
          setPathExists(false);
        }
      });
  };

  return (
    <FormControl sx={{ mb: 1, width: '100%' }}>
      <TextField
        fullWidth
        value={path}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            validatePath();
          }
        }}
        onChange={(event) => {
          setPath(event.target.value);
          setPathExists(null);
        }}
        error={pathExists === false}
        label={<FormattedMessage id="words.path" defaultMessage="Path" />}
        InputProps={{
          startAdornment: rootPath ? (
            <InputAdornment position="start" sx={{ mr: 0 }}>
              {allowSwitchingRootPath && onChangeRoot ? (
                <Tooltip
                  title={
                    <FormattedMessage
                      id="pathSelectionDialog.changeRootButtonLabel"
                      defaultMessage="Change root"
                    />
                  }
                >
                  <IconButton sx={{ mr: 0.5 }} onClick={onChangeRoot} size="small">
                    <KeyboardArrowLeftRoundedIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
              {rootPath}
            </InputAdornment>
          ) : undefined,
          endAdornment: isChecking ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : pathExists === true ? (
            <InputAdornment position="end">
              <CheckRounded color="success" />
            </InputAdornment>
          ) : pathExists === false ? (
            <InputAdornment position="end">
              <ErrorRounded color="error" />
            </InputAdornment>
          ) : undefined
        }}
      />
      <FormHelperText error={pathExists === false}>
        {pathExists ? (
          <FormattedMessage id="pathSelectionInput.found" defaultMessage="Path found" />
        ) : pathExists === false ? (
          <FormattedMessage
            id="pathSelectionInput.invalidPath"
            defaultMessage="The entered path doesn't exist"
          />
        ) : (
          <FormattedMessage
            id="pathSelectionInput.description"
            defaultMessage="Enter a path and press `enter` to validate"
          />
        )}
      </FormHelperText>
    </FormControl>
  );
}

type SiteTreeItemProps = {
  item: SandboxItem;
  selectedPath: string;
  expandedItems: string[];
  childrenByParent: Record<string, SandboxItem[] | undefined>;
  loadingParents: Record<string, boolean>;
  onPathSelected: (path: string) => void;
  isRoot?: boolean;
};

function SiteTreeItem({
  item,
  selectedPath,
  expandedItems,
  childrenByParent,
  loadingParents,
  onPathSelected,
  isRoot = false
}: SiteTreeItemProps) {
  const children = childrenByParent[item.path];
  const loading = Boolean(loadingParents[item.path]);
  const isExpanded = expandedItems.includes(item.path);
  const branch = isBranchNode(item, children, isRoot);
  const isSelected = pathsMatchForSelection(selectedPath, item.path);

  let treeChildren: React.ReactNode = null;
  if (branch) {
    if (loading || (isExpanded && children === undefined)) {
      treeChildren = (
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 3, py: 0.5 }}>
          <CircularProgress size={14} />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            <FormattedMessage id="words.loading" defaultMessage="Loading" />
          </Typography>
        </Box>
      );
    } else if (children?.length) {
      treeChildren = children.map((child) => (
        <SiteTreeItem
          key={child.path}
          item={child}
          selectedPath={selectedPath}
          expandedItems={expandedItems}
          childrenByParent={childrenByParent}
          loadingParents={loadingParents}
          onPathSelected={onPathSelected}
        />
      ));
    } else if (children === undefined) {
      // Non-tree placeholder child so MUI shows the expand affordance before the first fetch.
      treeChildren = <Box key={`${item.path}::placeholder`} sx={{ display: 'none' }} aria-hidden />;
    }
  }

  return (
    <TreeItem
      itemId={item.path}
      slots={{
        expandIcon: ArrowRightRoundedIcon,
        collapseIcon: ArrowDropDownRoundedIcon
      }}
      label={
        <Box
          role="button"
          onClick={(event) => {
            event.stopPropagation();
            onPathSelected(item.path);
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 28,
            width: '100%',
            borderRadius: 0.5,
            px: 0.5,
            bgcolor: isSelected ? 'action.selected' : 'transparent',
            '&:hover': {
              bgcolor: isSelected ? 'action.selected' : 'action.hover'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 0.5, '& svg': { fontSize: '1.1rem' } }}>
            <ItemTypeIcon item={item} />
          </Box>
          <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0 }}>
            {item.label || item.path}
          </Typography>
        </Box>
      }
    >
      {branch ? treeChildren : undefined}
    </TreeItem>
  );
}

type SourceSiteContentTreeProps = {
  siteId: string;
  rootPath: string;
  selectedPath: string;
  onPathSelected: (path: string) => void;
};

function SourceSiteContentTree({ siteId, rootPath, selectedPath, onPathSelected }: SourceSiteContentTreeProps) {
  const [childrenByParent, setChildrenByParent] = useState<Record<string, SandboxItem[] | undefined>>({});
  const [loadingParents, setLoadingParents] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<string[]>([rootPath]);
  const childrenByParentRef = useRef(childrenByParent);
  const loadingParentsRef = useRef(loadingParents);
  const systemTypes = useMemo(() => getTreeSystemTypes(rootPath), [rootPath]);

  childrenByParentRef.current = childrenByParent;
  loadingParentsRef.current = loadingParents;

  const loadChildren = useCallback(
    (parentPath: string) => {
      if (
        childrenByParentRef.current[parentPath] !== undefined ||
        loadingParentsRef.current[parentPath]
      ) {
        return;
      }

      setLoadingParents((current) => ({ ...current, [parentPath]: true }));

      const fetchPath = getChildrenFetchPath(parentPath);

      fetchChildrenByPath(siteId, fetchPath, {
        limit: TREE_FETCH_LIMIT,
        sortStrategy: 'foldersFirst',
        order: 'ASC',
        systemTypes
      }).subscribe({
        next(response) {
          setChildrenByParent((current) => ({
            ...current,
            [parentPath]: parseChildrenResponse(response).items
          }));
          setLoadingParents((current) => {
            const next = { ...current };
            delete next[parentPath];
            return next;
          });
        },
        error() {
          setChildrenByParent((current) => ({
            ...current,
            [parentPath]: []
          }));
          setLoadingParents((current) => {
            const next = { ...current };
            delete next[parentPath];
            return next;
          });
        }
      });
    },
    [siteId, systemTypes]
  );

  const expandPathAncestors = useCallback(
    (path: string) => {
      if (!path || !path.startsWith(rootPath)) {
        return;
      }

      const ancestors = getIndividualPaths(path, rootPath);
      const expandedPaths = new Set<string>();
      const loadPaths = new Set<string>();

      ancestors.forEach((ancestorPath) => {
        expandedPaths.add(ancestorPath);
        expandedPaths.add(toTreeItemId(ancestorPath));
        loadPaths.add(toTreeItemId(ancestorPath));
      });

      loadPaths.add(toTreeItemId(path));

      setExpandedItems((current) => {
        const merged = new Set([...current, ...Array.from(expandedPaths)]);
        return Array.from(merged);
      });

      loadPaths.forEach((loadPath) => {
        loadChildren(loadPath);
      });
    },
    [rootPath, loadChildren]
  );

  useEffect(() => {
    setChildrenByParent({});
    setLoadingParents({});
    setExpandedItems([rootPath]);
    loadChildren(rootPath);
  }, [siteId, rootPath, loadChildren]);

  useEffect(() => {
    if (selectedPath) {
      expandPathAncestors(selectedPath);
    }
  }, [selectedPath, expandPathAncestors]);

  const root = useMemo(() => rootItem(rootPath), [rootPath]);

  const handleExpandedItemsChange = (_event: React.SyntheticEvent, itemIds: string[]) => {
    const newlyExpanded = itemIds.filter((id) => !expandedItems.includes(id));
    newlyExpanded.forEach((path) => loadChildren(toTreeItemId(path)));
    setExpandedItems(itemIds);
  };

  if (!rootPath) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 1.5,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'auto',
        maxHeight: '45vh',
        py: 0.5
      }}
    >
      <SimpleTreeView
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpandedItemsChange}
        disableSelection
        sx={{ flexGrow: 1 }}
      >
        <SiteTreeItem
          item={root}
          selectedPath={selectedPath}
          expandedItems={expandedItems}
          childrenByParent={childrenByParent}
          loadingParents={loadingParents}
          onPathSelected={onPathSelected}
          isRoot
        />
      </SimpleTreeView>
    </Box>
  );
}

export type CrossSitePathSelectionDialogProps = {
  open: boolean;
  siteId: string;
  siteLabel?: string;
  stripXmlIndex?: boolean;
  onClose: () => void;
  onAccept: (path: string) => void;
};

export function CrossSitePathSelectionDialog({
  open,
  siteId,
  siteLabel,
  stripXmlIndex = false,
  onClose,
  onAccept
}: CrossSitePathSelectionDialogProps) {
  const [rootPath, setRootPath] = useState(DEFAULT_ROOT);
  const [currentPath, setCurrentPath] = useState(DEFAULT_ROOT);

  useEffect(() => {
    if (!open) {
      return;
    }
    setRootPath(DEFAULT_ROOT);
    setCurrentPath(DEFAULT_ROOT);
  }, [open, siteId]);

  const handleAccept = () => {
    const path = (stripXmlIndex ? withoutIndex(currentPath) : currentPath).trim();
    if (!path) {
      return;
    }
    onAccept(path);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogHeader
        title={
          <>
            <FormattedMessage id="pathSelectionDialog.title" defaultMessage="Select Path" />
            {siteLabel ? ` — ${siteLabel}` : ''}
          </>
        }
        onCloseButtonClick={onClose}
      />
      <DialogBody sx={{ minHeight: '60vh' }}>
        {rootPath ? (
          <>
            <SourcePathSelectionInput
              siteId={siteId}
              rootPath={rootPath}
              currentPath={currentPath}
              allowFiles={allowsFileSelection(rootPath)}
              onChange={setCurrentPath}
              allowSwitchingRootPath
              onChangeRoot={() => {
                setRootPath('');
                setCurrentPath('');
              }}
            />
            <SourceSiteContentTree
              siteId={siteId}
              rootPath={rootPath}
              selectedPath={currentPath}
              onPathSelected={setCurrentPath}
            />
          </>
        ) : (
          <BasePathSelector
            value=""
            basePaths={STUDIO_BASE_PATHS}
            onChange={(event) => {
              const path = event.target.value;
              setRootPath(path);
              setCurrentPath(path);
            }}
          />
        )}
      </DialogBody>
      <DialogFooter>
        <Button onClick={onClose}>
          <FormattedMessage id="words.cancel" defaultMessage="Cancel" />
        </Button>
        <Button variant="contained" onClick={handleAccept}>
          <FormattedMessage id="words.accept" defaultMessage="Accept" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default CrossSitePathSelectionDialog;
