/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */

import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { changeCurrentUrl, goToLastPage } from '@craftercms/studio-ui/state/actions/preview';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useCurrentPreviewItem from '@craftercms/studio-ui/hooks/useCurrentPreviewItem';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import StudioAPI, { TranslationRemoveCandidate } from '../api/studio';
import { localeSegmentsCompatible } from '../utils/localePathUtils';
import {
  TranslationCurrentBadge,
  TranslationOutdatedBadge,
  TranslationSourceBadge
} from './TranslationLocaleIndicatorBadges';
import { openEditFormStudioDispatch } from '../utils/studioEditDialog';
import { pruneSidebarTrees, refreshSidebarTrees } from '../utils/sidebarTreePrune';
import { hasConfiguredTranslationLocales } from '../config/multiLocaleConfig';

type IconConfig = { id: string };
type LocaleMenuRow = {
  locale: string;
  label: string;
  flag: string;
  targetFilePath: string;
  destinationParentPath: string;
  exists: boolean;
  isOutdated: boolean;
  isSource: boolean;
  isCurrentPreview: boolean;
};

function normalizeRepoPath(p: string | null | undefined): string {
  return String(p ?? '')
    .replace(/\\/g, '/')
    .replace(/\/+$/, '');
}

/** Same rule as translation-versions form control: pages under website only. */
function isPageRepoPath(p: string): boolean {
  const n = normalizeRepoPath(p).toLowerCase();
  return n.includes('/website/') && n.endsWith('.xml');
}

/** Studio ItemMegaMenu ignores includeOnly; keep only these action labels visible. */
const TRANSLATION_ITEM_MENU_LABELS: Record<string, true> = {
  edit: true,
  view: true,
  'view form': true,
  history: true,
  dependencies: true,
  publish: true,
  'request publish': true,
  approve: true,
  preview: true
};

function normalizeMegaMenuLabel(text: string): string {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function isAllowedMegaMenuLabel(text: string, hideEdit = false): boolean {
  const txt = normalizeMegaMenuLabel(text);
  if (!txt) return false;
  if (hideEdit && (txt === 'edit' || txt.startsWith('edit '))) return false;
  if (TRANSLATION_ITEM_MENU_LABELS[txt]) return true;
  return Object.keys(TRANSLATION_ITEM_MENU_LABELS).some(
    (key) => txt === key || txt.startsWith(`${key} `)
  );
}

function enforceAllowedItemsInOpenMegaMenu(hideEdit = false): void {
  if (typeof document === 'undefined') return;
  document.querySelectorAll<HTMLElement>("li[role='menuitem'], .MuiMenuItem-root").forEach((node) => {
    if (!isAllowedMegaMenuLabel(node.textContent || '', hideEdit)) {
      node.style.display = 'none';
    }
  });
}

function scheduleEnforceAllowedItemsInMegaMenu(hideEdit = false): void {
  enforceAllowedItemsInOpenMegaMenu(hideEdit);
  window.setTimeout(() => enforceAllowedItemsInOpenMegaMenu(hideEdit), 0);
  window.setTimeout(() => enforceAllowedItemsInOpenMegaMenu(hideEdit), 60);
  window.setTimeout(() => enforceAllowedItemsInOpenMegaMenu(hideEdit), 160);
}

type RemoveDialogState =
  | null
  | {
      pagePath: string;
      label: string;
      loading: boolean;
      candidates: TranslationRemoveCandidate[];
      selected: Record<string, boolean>;
      error?: string;
      submitting?: boolean;
    };

function storePathToPreviewPath(storePath: string): string | null {
  const m = String(storePath || '').match(/^\/site\/[^/]+\/website\/([^/]+)(\/.*)?$/i);
  if (!m) {
    return null;
  }
  const locale = m[1];
  const rest = m[2] || '';
  let clean = rest.replace(/\/index\.xml$/i, '/').replace(/\.xml$/i, '');
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }
  clean = clean.replace(/\/+/g, '/');
  return `/${locale}${clean}`;
}

/**
 * One level up in the website tree: .../website/{locale}/.../child/index.xml -> .../parent/index.xml.
 * Returns null when already at locale root (.../website/{locale}/index.xml).
 */
function parentWebsiteIndexStorePath(storePath: string): string | null {
  const n = normalizeRepoPath(storePath);
  if (!n.toLowerCase().endsWith('/index.xml')) {
    return null;
  }
  const folder = n.replace(/\/index\.xml$/i, '');
  const parentFolder = folder.replace(/\/[^/]+$/, '');
  if (!parentFolder || parentFolder === folder) {
    return null;
  }
  const localeRoot = /\/website\/[^/]+$/i.test(parentFolder);
  const hasSegmentUnderLocale = /\/website\/[^/]+\/[^/]+/i.test(`${parentFolder}/`);
  if (!localeRoot && !hasSegmentUnderLocale) {
    return null;
  }
  return `${parentFolder}/index.xml`;
}

/**
 * Preview toolbar: icon opens a menu of locales to add this item under (mirrored path, copy + form).
 */
export function OpenTranslationToolbarButton(props: {
  tooltip?: string;
  icon?: IconConfig;
  buttonSize?: 'small' | 'medium' | 'large';
}) {
  const {
    tooltip = 'Add to Scope',
    icon = { id: '@mui/icons-material/TranslateOutlined' },
    buttonSize = 'small'
  } = props;

  const dispatch = useDispatch();
  const store = useStore<any>();
  const siteId = useActiveSiteId();
  const { authoringBase } = useEnv();
  const currentPreviewItem = useCurrentPreviewItem();
  const sourceItem = useMemo(
    () => (currentPreviewItem ? StudioAPI.getPreviewItem(currentPreviewItem) : null),
    [currentPreviewItem]
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [rows, setRows] = useState<LocaleMenuRow[]>([]);
  /** Preview path `rows` belong to; rows for any other path are stale. */
  const [rowsPath, setRowsPath] = useState<string | null>(null);
  const rowsPathRef = useRef<string | null>(null);
  rowsPathRef.current = rowsPath;
  const [loading, setLoading] = useState(false);
  /** Last request for `rowsPath` failed (as opposed to the page having no translations). */
  const [loadFailed, setLoadFailed] = useState(false);
  /** null until the first response; the button is only rendered for projects with locales configured. */
  const [translationConfigured, setTranslationConfigured] = useState<boolean | null>(null);
  const [allowRemoveFromScope, setAllowRemoveFromScope] = useState(true);
  const [copyBusy, setCopyBusy] = useState(false);
  /** Existing base-language variant of the previewed item; translations are copied from it when present. */
  const baseCopySourceRef = useRef<string | null>(null);
  const [removeDialog, setRemoveDialog] = useState<RemoveDialogState>(null);
  const loadSeqRef = useRef(0);

  /** One server call: config + every locale variant of the previewed item (none when it is not under a locale). */
  const loadTargets = useCallback(async () => {
    const seq = ++loadSeqRef.current;
    const base = authoringBase || '';
    const path = sourceItem?.path || null;
    if (!siteId || !base) {
      setRows([]);
      setRowsPath(null);
      setLoading(false);
      baseCopySourceRef.current = null;
      return;
    }
    setLoading(true);
    try {
      const res = await StudioAPI.getTranslationLocales(base, siteId, path);
      if (seq !== loadSeqRef.current) {
        return;
      }
      if (!res) {
        // Failed request: keep what we already know about this page.
        if (path && rowsPathRef.current !== path) {
          setRows([]);
          setRowsPath(path);
          setLoadFailed(true);
          baseCopySourceRef.current = null;
        }
        return;
      }
      const cfg = res.config;
      setTranslationConfigured(hasConfiguredTranslationLocales(cfg));
      setAllowRemoveFromScope(res.allowRemoveFromScope);
      setLoadFailed(false);
      if (!path) {
        setRows([]);
        setRowsPath(null);
        baseCopySourceRef.current = null;
        return;
      }
      const locales = res.relativeUnderLocale && hasConfiguredTranslationLocales(cfg) ? res.locales : [];
      if (locales.length < 2) {
        setRows([]);
        setRowsPath(path);
        baseCopySourceRef.current = null;
        return;
      }
      const baseRow = cfg?.baseLanguage
        ? locales.find((l) => l.exists && localeSegmentsCompatible(l.locale, cfg.baseLanguage))
        : undefined;
      baseCopySourceRef.current = baseRow?.path ?? null;
      setRows(
        locales.map((l) => ({
          locale: l.locale,
          label: l.label,
          flag: l.flag,
          targetFilePath: l.path,
          destinationParentPath: l.parentPath,
          exists: l.exists,
          isOutdated: l.isOutdated,
          isSource: l.isSource,
          isCurrentPreview: l.isCurrent
        }))
      );
      setRowsPath(path);
    } finally {
      if (seq === loadSeqRef.current) {
        setLoading(false);
      }
    }
  }, [siteId, authoringBase, sourceItem?.path]);

  const openRemoveDialog = async (row: LocaleMenuRow) => {
    if (!siteId || !authoringBase) {
      return;
    }
    setAnchorEl(null);
    setRemoveDialog({
      pagePath: row.targetFilePath,
      label: row.label,
      loading: true,
      candidates: [],
      selected: {}
    });
    try {
      const res = await StudioAPI.fetchTranslationRemoveCandidates(authoringBase, siteId, row.targetFilePath);
      const selected: Record<string, boolean> = {};
      (res.candidates ?? []).forEach((c) => {
        if (c.path) {
          selected[c.path] = true;
        }
      });
      setRemoveDialog({
        pagePath: row.targetFilePath,
        label: row.label,
        loading: false,
        candidates: res.candidates ?? [],
        selected,
        error: res.ok ? undefined : res.message ?? 'Could not load removable components.'
      });
    } catch {
      setRemoveDialog({
        pagePath: row.targetFilePath,
        label: row.label,
        loading: false,
        candidates: [],
        selected: {},
        error: 'Network error loading removable components.'
      });
    }
  };

  const closeRemoveDialog = () => {
    setRemoveDialog(null);
  };

  const confirmRemoveTranslation = async () => {
    if (!removeDialog || removeDialog.loading || removeDialog.submitting || !siteId || !authoringBase) {
      return;
    }
    const pagePath = removeDialog.pagePath;
    const label = removeDialog.label;
    const paths = Object.keys(removeDialog.selected).filter((p) => removeDialog.selected[p]);
    const currentPreviewNorm = normalizeRepoPath(sourceItem?.path ?? '');
    setRemoveDialog((prev) => (prev ? { ...prev, submitting: true, error: undefined } : prev));
    // Studio's delete event can arrive before this request returns, so prune the Sidebar first.
    const prunedTreeIds = pruneSidebarTrees(dispatch, store.getState()?.pathNavigatorTree, [pagePath, ...paths]);
    try {
      const res = await StudioAPI.postTranslationRemove(authoringBase, siteId, pagePath, paths, true);
      const failed = res.failed ?? [];
      if (failed.length) {
        refreshSidebarTrees(dispatch, prunedTreeIds);
      }
      const deletedList = res.deleted ?? [];
      const pageRemoved = deletedList.some((p) => normalizeRepoPath(p) === normalizeRepoPath(pagePath));
      const removedWhatWeWerePreviewing =
        pageRemoved && currentPreviewNorm && currentPreviewNorm === normalizeRepoPath(pagePath);

      if (failed.length) {
        dispatch(
          showSystemNotification({
            message: `Remove finished with issues: ${failed.map((f) => `${f.path ?? ''} ${f.message ?? ''}`.trim()).join('; ')}`
          })
        );
      } else {
        dispatch(
          showSystemNotification({
            message: `Removed translation: ${label}`
          })
        );
      }
      closeRemoveDialog();
      if (removedWhatWeWerePreviewing) {
        let parentCandidate = parentWebsiteIndexStorePath(pagePath);
        while (parentCandidate) {
          if (await StudioAPI.contentExists(authoringBase, siteId, parentCandidate)) {
            const previewUrl = storePathToPreviewPath(parentCandidate);
            if (previewUrl) {
              dispatch(changeCurrentUrl(previewUrl));
            } else {
              dispatch(goToLastPage());
            }
            await loadTargets();
            return;
          }
          parentCandidate = parentWebsiteIndexStorePath(parentCandidate);
        }
        dispatch(goToLastPage());
        await loadTargets();
        return;
      }
      await loadTargets();
    } catch {
      refreshSidebarTrees(dispatch, prunedTreeIds);
      dispatch(
        showSystemNotification({
          message: 'Remove translation failed (network).'
        })
      );
      setRemoveDialog((prev) => (prev ? { ...prev, submitting: false } : prev));
    }
  };

  useEffect(() => {
    void loadTargets();
  }, [loadTargets]);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    void loadTargets();
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleTranslateTo = async (target: LocaleMenuRow) => {
    if (!sourceItem?.path || !siteId || !authoringBase || copyBusy) {
      return;
    }
    setCopyBusy(true);
    try {
      const copySource = baseCopySourceRef.current || sourceItem.path;
      const res = await StudioAPI.copyItem(
        authoringBase,
        siteId,
        copySource,
        target.destinationParentPath,
        target.targetFilePath
      );
      const pastedPath = (res?.pastedPath || res?.items?.[0]) as string | undefined;
      if (!res?.ok || !pastedPath) {
        dispatch(
          showSystemNotification({
            message: res?.message || `Could not translate to ${target.label}.`
          })
        );
        return;
      }
      dispatch(
        showSystemNotification({
          message: `Copied to ${target.label}: ${pastedPath}`
        })
      );
      openEditFormStudioDispatch(dispatch, siteId, pastedPath, authoringBase);
      await loadTargets();
    } catch {
      dispatch(
        showSystemNotification({
          message: `Could not translate to ${target.label}.`
        })
      );
    } finally {
      setCopyBusy(false);
    }
  };

  const disabledCore = !siteId || !authoringBase || !sourceItem?.path;
  const menuOpen = Boolean(anchorEl);
  const openPreview = (targetPath: string) => {
    const previewPath = storePathToPreviewPath(targetPath);
    closeMenu();
    if (previewPath) {
      const sep = previewPath.includes('?') ? '&' : '?';
      window.location.assign(`${previewPath}${sep}crafterSite=${encodeURIComponent(siteId)}`);
      return;
    }
    openEditFormStudioDispatch(dispatch, siteId, targetPath, authoringBase);
  };

  const showStudioItemMegaMenu = (event: React.MouseEvent<HTMLElement>, path: string) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: 'SHOW_ITEM_MEGA_MENU',
      payload: {
        path,
        anchorReference: 'anchorPosition',
        anchorPosition: {
          top: typeof event.clientY === 'number' ? event.clientY : 0,
          left: typeof event.clientX === 'number' ? event.clientX : 0
        }
      }
    });
    const hideEdit = normalizeRepoPath(path) === normalizeRepoPath(sourceItem?.path ?? '');
    scheduleEnforceAllowedItemsInMegaMenu(hideEdit);
  };

  // Rows are only trusted for the page they were loaded for; until then the button stays disabled.
  const currentPath = sourceItem?.path || null;
  const pageLoaded = Boolean(currentPath) && rowsPath === currentPath;
  const pageLoading = Boolean(currentPath) && !pageLoaded;
  const canOpen = pageLoaded && rows.length > 0;
  const buttonTooltip = disabledCore
    ? 'Select an item in preview'
    : pageLoading
      ? 'Loading translations…'
      : loadFailed
        ? "Couldn't load translations for this page"
        : rows.length === 0
          ? "This page isn't part of a translated section"
          : tooltip;

  useEffect(() => {
    if (!canOpen) {
      setAnchorEl(null);
    }
  }, [canOpen]);

  return (
    <>
      {translationConfigured ? (
        <>
      <Tooltip title={buttonTooltip}>
        <span>
          <IconButton
            size={buttonSize}
            onClick={openMenu}
            disabled={!canOpen || copyBusy}
            aria-label={tooltip}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
          >
            {copyBusy || pageLoading || (loading && menuOpen) ? (
              <CircularProgress size={buttonSize === 'small' ? 18 : 22} />
            ) : (
              <SystemIcon icon={icon} />
            )}
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { minWidth: 220 } }}
      >
        {rows.map((o) => {
            const showRemove = allowRemoveFromScope && o.exists && !o.isSource && isPageRepoPath(o.targetFilePath);
            return (
            <MenuItem
              key={o.locale}
              dense
              disabled={copyBusy}
              onClick={o.exists ? () => openPreview(o.targetFilePath) : undefined}
              sx={{ py: 1 }}
            >
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap',
                  typography: 'body2',
                  flex: 1,
                  minWidth: 0
                }}
              >
                <Box component="span" sx={{ fontSize: '1.25rem', lineHeight: 1 }} aria-hidden>
                  {o.flag}
                </Box>
                <Box component="span" sx={{ minWidth: 100 }}>
                  {o.label}
                </Box>
                <Box
                  component="span"
                  sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}
                >
                  {o.isSource ? <TranslationSourceBadge /> : null}
                  {o.isOutdated ? <TranslationOutdatedBadge /> : null}
                  {o.isCurrentPreview ? <TranslationCurrentBadge /> : null}
                </Box>
              </Box>
              <Box sx={{ ml: 'auto', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                {o.exists ? (
                  <>
                    {showRemove ? (
                      <Tooltip
                        title={
                          o.isCurrentPreview
                            ? 'Remove this translation (preview moves to the parent page, or back if there is no parent)'
                            : 'Remove this translated page (and optional locale-only components)'
                        }
                      >
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void openRemoveDialog(o);
                          }}
                          aria-label={`Remove translation ${o.label}`}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        showStudioItemMegaMenu(e, o.targetFilePath);
                      }}
                      aria-label={`Options for ${o.label}`}
                    >
                      ⋮
                    </IconButton>
                  </>
                ) : (
                  <Box
                    component="button"
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void handleTranslateTo(o);
                    }}
                    disabled={copyBusy}
                    sx={{
                      border: 'none',
                      borderRadius: 1,
                      px: 1,
                      py: 0.25,
                      fontSize: '0.75rem',
                      color: 'white',
                      bgcolor: copyBusy ? 'grey.400' : 'primary.main',
                      cursor: copyBusy ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: 96,
                      justifyContent: 'center'
                    }}
                  >
                    {copyBusy ? (
                      <>
                        <CircularProgress size={12} sx={{ color: 'white' }} />
                        Adding…
                      </>
                    ) : (
                      'Add to Scope'
                    )}
                  </Box>
                )}
              </Box>
            </MenuItem>
            );
          })}
      </Menu>
        </>
      ) : null}
      <Dialog open={Boolean(removeDialog)} onClose={removeDialog?.submitting ? undefined : closeRemoveDialog} maxWidth="sm" fullWidth>
        {removeDialog ? (
          <>
            <DialogTitle>Remove translation</DialogTitle>
            <DialogContent dividers>
              {removeDialog.loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    Loading removable components…
                  </Typography>
                </Box>
              ) : null}
              {removeDialog.error ? (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                  {removeDialog.error}
                </Typography>
              ) : null}
              {!removeDialog.loading && !removeDialog.error && removeDialog.candidates.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  No locale-only components were found that are safe to delete automatically. The translated page will
                  still be removed.
                </Typography>
              ) : null}
              {removeDialog.candidates.length > 0 ? (
                <>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Also delete these components (checked by default)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Button
                      size="small"
                      onClick={() =>
                        setRemoveDialog((prev) => {
                          if (!prev || prev.loading) {
                            return prev;
                          }
                          const next: Record<string, boolean> = {};
                          prev.candidates.forEach((c) => {
                            if (c.path) {
                              next[c.path] = true;
                            }
                          });
                          return { ...prev, selected: next };
                        })
                      }
                    >
                      Select all
                    </Button>
                    <Button
                      size="small"
                      onClick={() =>
                        setRemoveDialog((prev) => {
                          if (!prev || prev.loading) {
                            return prev;
                          }
                          const next: Record<string, boolean> = {};
                          prev.candidates.forEach((c) => {
                            if (c.path) {
                              next[c.path] = false;
                            }
                          });
                          return { ...prev, selected: next };
                        })
                      }
                    >
                      Select none
                    </Button>
                  </Box>
                  {removeDialog.candidates.map((c) => (
                    <FormControlLabel
                      key={c.path}
                      control={
                        <Checkbox
                          size="small"
                          checked={Boolean(removeDialog.selected[c.path])}
                          disabled={Boolean(removeDialog.submitting)}
                          onChange={(ev) => {
                            const checked = ev.target.checked;
                            setRemoveDialog((prev) => {
                              if (!prev) {
                                return prev;
                              }
                              return {
                                ...prev,
                                selected: { ...prev.selected, [c.path]: checked }
                              };
                            });
                          }}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2">{c.internalName || '(no internal name)'}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                            {c.path}
                          </Typography>
                        </Box>
                      }
                      sx={{ alignItems: 'flex-start', ml: 0, display: 'flex' }}
                    />
                  ))}
                </>
              ) : null}
              <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 2 }}>
                The translated page will be deleted. This cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeRemoveDialog} disabled={Boolean(removeDialog.submitting)}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                disabled={Boolean(removeDialog.loading || removeDialog.submitting)}
                onClick={() => void confirmRemoveTranslation()}
                startIcon={
                  removeDialog.submitting ? <CircularProgress size={16} color="inherit" /> : undefined
                }
              >
                {removeDialog.submitting ? 'Removing…' : 'Remove translation'}
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </>
  );
}

export default OpenTranslationToolbarButton;
