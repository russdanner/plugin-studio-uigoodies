/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import React, { memo, useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TranslateIcon from '@mui/icons-material/Translate';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';

import StudioAPI from '../../api/studio';
import { getFlagForLocale, LOCALE_META, MULTI_LOCALE_BASE_LOCALE } from '../../config/multiLocaleConfig';
import {
  localeSegmentsCompatible,
  parentFolderPath,
  pathForLocale,
  relativePathUnderBase
} from '../../utils/localePathUtils';
import {
  TranslationCurrentBadge,
  TranslationOutdatedBadge,
  TranslationSourceBadge
} from '../TranslationLocaleIndicatorBadges';

type StudioEnvState = { env?: { authoringBase?: string } };

export type TranslationStatusMap = Record<string, boolean>;

export type TranslationLocaleInsight = {
  isSource: boolean;
  isOutdated: boolean;
};

type CachedTranslationOverlay = {
  exists: TranslationStatusMap;
  insights: Record<string, TranslationLocaleInsight>;
};

function normalizeRepoPath(p: string | null | undefined): string {
  return String(p ?? '')
    .replace(/\\/g, '/')
    .replace(/\/+$/, '');
}

type TranslationTreeItemLabelProps = {
  displayName: string;
  /** Full path of this node in the base locale tree */
  nodePath: string;
  rootDir: string;
  baseRootPath: string;
  /** Locale folder names present on the site (e.g. en, es, ja, zh) */
  locales: string[];
  siteId: string;
  /** When false, render plain label (traditional mode). */
  translationMode: boolean;
  /**
   * Optional emoji flags for locales that do not have this content yet (set on filtered root rows).
   */
  missingTranslationFlags?: string;
  /**
   * Full path of the content item currently open in Studio (e.g. form path). Used for a "Current" badge
   * and to disable "Edit" for that locale in the actions menu.
   */
  openItemPath?: string | null;
};

function TranslationTreeItemLabelInner({
  displayName,
  nodePath,
  rootDir,
  baseRootPath,
  locales,
  siteId,
  translationMode,
  missingTranslationFlags,
  openItemPath
}: TranslationTreeItemLabelProps) {
  const dispatch = useDispatch();
  const authoringBase = useSelector((state: StudioEnvState) => state.env?.authoringBase ?? '');
  const [flagsAnchor, setFlagsAnchor] = useState<HTMLElement | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const statusCache = useRef<Map<string, CachedTranslationOverlay>>(new Map());
  const [statuses, setStatuses] = useState<TranslationStatusMap | null>(null);
  const [insights, setInsights] = useState<Record<string, TranslationLocaleInsight> | null>(null);
  const [loading, setLoading] = useState(false);
  /** Prevents overlapping contentExists storms if menu/globe retriggers load rapidly. */
  const loadStatusesInFlightRef = useRef(false);

  const relative = relativePathUnderBase(nodePath, baseRootPath);
  const canMapLocales = relative !== null;

  const openNorm = normalizeRepoPath(openItemPath);
  const isCurrentRow =
    Boolean(openNorm) &&
    canMapLocales &&
    (openNorm === normalizeRepoPath(nodePath) ||
      locales.some((loc) => openNorm === normalizeRepoPath(pathForLocale(rootDir, relative ?? '', loc))));

  const loadStatuses = useCallback(async () => {
    if (!canMapLocales || !translationMode) {
      return;
    }
    const cached = statusCache.current.get(nodePath);
    if (cached) {
      setStatuses(cached.exists);
      setInsights(cached.insights);
      return;
    }
    if (loadStatusesInFlightRef.current) {
      return;
    }
    loadStatusesInFlightRef.current = true;
    setLoading(true);
    try {
      const next: TranslationStatusMap = {};
      await Promise.all(
        locales.map(async (loc) => {
          const p = pathForLocale(rootDir, relative ?? '', loc);
          next[loc] = await StudioAPI.contentExists(authoringBase, siteId, p);
        })
      );

      const hints = await StudioAPI.getTranslationLocaleHints(authoringBase, siteId, nodePath);
      const sourceKey = hints.sourceLocaleCode;
      const sourceFolder =
        sourceKey !== '' ? locales.find((l) => localeSegmentsCompatible(l, sourceKey)) : undefined;
      const sourcePath =
        sourceFolder != null && relative != null
          ? pathForLocale(rootDir, relative, sourceFolder)
          : nodePath;
      const sourceMs = await StudioAPI.getItemModifiedTimestamp(authoringBase, siteId, sourcePath);

      const insightMap: Record<string, TranslationLocaleInsight> = {};
      await Promise.all(
        locales.map(async (loc) => {
          const p = pathForLocale(rootDir, relative ?? '', loc);
          const exists = next[loc];
          const targetMs = exists ? await StudioAPI.getItemModifiedTimestamp(authoringBase, siteId, p) : null;
          const isSource = Boolean(sourceKey && localeSegmentsCompatible(loc, sourceKey));
          const isOutdated =
            Boolean(exists) &&
            !isSource &&
            sourceMs != null &&
            targetMs != null &&
            targetMs < sourceMs;
          insightMap[loc] = { isSource, isOutdated };
        })
      );

      const payload: CachedTranslationOverlay = { exists: next, insights: insightMap };
      statusCache.current.set(nodePath, payload);
      setStatuses(next);
      setInsights(insightMap);
    } finally {
      loadStatusesInFlightRef.current = false;
      setLoading(false);
    }
  }, [authoringBase, siteId, rootDir, relative, locales, nodePath, canMapLocales, translationMode]);

  const closeFlags = useCallback(() => {
    setFlagsAnchor(null);
  }, []);

  const openEdit = (path: string) => {
    setMenuAnchor(null);
    dispatch(
      showEditDialog({
        path,
        authoringBase,
        site: siteId
      } as any)
    );
  };

  const runTranslate = async (targetLocale: string) => {
    setMenuAnchor(null);
    if (relative == null) {
      return;
    }
    const sourcePath = nodePath;
    const targetPath = pathForLocale(rootDir, relative, targetLocale);
    const targetParent = parentFolderPath(targetPath);
    const exists = await StudioAPI.contentExists(authoringBase, siteId, targetPath);
    if (exists) {
      dispatch(
        showSystemNotification({
          message: `Already exists: ${targetPath}`
        })
      );
      return;
    }
    const res = await StudioAPI.copyItem(authoringBase, siteId, sourcePath, targetParent, targetPath);
    if (res?.ok && (res?.pastedPath || res?.items?.[0])) {
      statusCache.current.delete(nodePath);
      dispatch(
        showSystemNotification({
          message: `Copied to ${targetLocale}: ${targetPath}`
        })
      );
    } else {
      dispatch(
        showSystemNotification({
          message: res?.message || `Could not copy to ${targetLocale}.`
        })
      );
    }
  };

  if (!translationMode) {
    return (
      <span>
        {displayName}
        {missingTranslationFlags ? (
          <Typography
            component="span"
            variant="caption"
            sx={{ ml: 0.75, color: 'text.secondary' }}
            title="Locale folder — item has no copy here yet"
          >
            {missingTranslationFlags}
          </Typography>
        ) : null}
      </span>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        maxWidth: '100%',
        pr: 0.5,
        '&:hover .translation-tree-actions': { opacity: 1 }
      }}
    >
      <Typography component="span" variant="body2" noWrap sx={{ flex: 1, minWidth: 0 }}>
        {displayName}
        {missingTranslationFlags ? (
          <Typography
            component="span"
            variant="caption"
            sx={{ ml: 0.75, color: 'text.secondary', whiteSpace: 'nowrap' }}
            title="Locales without a copy of this item yet"
          >
            {missingTranslationFlags}
          </Typography>
        ) : null}
      </Typography>

      {isCurrentRow ? (
        <Chip label="Current" size="small" color="success" variant="outlined" sx={{ height: 22, fontSize: '0.7rem', flexShrink: 0 }} />
      ) : null}

      <Box
        className="translation-tree-actions"
        sx={{ opacity: flagsAnchor ? 1 : 0, transition: 'opacity 0.15s', display: 'inline-flex', alignItems: 'center' }}
      >
        <Tooltip title="Translation coverage">
          <IconButton
            size="small"
            aria-label="show translations"
            onClick={(e) => {
              e.stopPropagation();
              const el = e.currentTarget;
              setFlagsAnchor((prev) => (prev === el ? null : el));
              void loadStatuses();
            }}
          >
            <PublicOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Translations & actions">
          <IconButton
            size="small"
            aria-label="translation actions"
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchor(e.currentTarget);
              void loadStatuses();
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {flagsAnchor ? (
        <Popover
          open
          anchorEl={flagsAnchor}
          onClose={closeFlags}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          disableRestoreFocus
          PaperProps={{ sx: { px: 1, py: 0.75 } }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Translations
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {locales.map((loc) => {
              const meta = LOCALE_META[loc.toLowerCase()] ?? { label: loc, flag: getFlagForLocale(loc) };
              const ok = statuses?.[loc];
              const rowInsight = insights?.[loc];
              const openLocalePath = pathForLocale(rootDir, relative ?? '', loc);
              const isCurrentHere = Boolean(openNorm && normalizeRepoPath(openLocalePath) === openNorm);
              return (
                <Tooltip
                  key={loc}
                  title={
                    loading
                      ? '…'
                      : ok
                        ? `${meta.label} — available`
                        : `${meta.label} — not created`
                  }
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.35,
                      minWidth: rowInsight || isCurrentHere ? 56 : undefined
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontSize: '1.15rem',
                        lineHeight: 1,
                        opacity: loading ? 0.4 : ok ? 1 : 0.35,
                        filter: ok ? 'none' : 'grayscale(0.9)'
                      }}
                    >
                      {meta.flag}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.35,
                        justifyContent: 'center',
                        maxWidth: 72
                      }}
                    >
                      {rowInsight?.isSource ? <TranslationSourceBadge /> : null}
                      {rowInsight?.isOutdated ? <TranslationOutdatedBadge /> : null}
                      {isCurrentHere ? <TranslationCurrentBadge /> : null}
                    </Box>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Popover>
      ) : null}

      {menuAnchor ? (
        <Menu anchorEl={menuAnchor} open onClose={() => setMenuAnchor(null)}>
          {loading && !statuses && (
            <MenuItem disabled>
              <ListItemText primary="Loading…" />
            </MenuItem>
          )}
          {locales.map((loc) => {
            const meta = LOCALE_META[loc.toLowerCase()] ?? { label: loc, flag: getFlagForLocale(loc) };
            const isBase = loc.toLowerCase() === MULTI_LOCALE_BASE_LOCALE.toLowerCase();
            const p = pathForLocale(rootDir, relative ?? '', loc);
            const isOpenLocale = Boolean(openNorm && normalizeRepoPath(p) === openNorm);
            const rowInsight = insights?.[loc];
            const badgeRow = (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {rowInsight?.isSource ? <TranslationSourceBadge /> : null}
                {rowInsight?.isOutdated ? <TranslationOutdatedBadge /> : null}
                {isOpenLocale ? <TranslationCurrentBadge /> : null}
              </Box>
            );
            if (isBase) {
              const isOpenBase = Boolean(openNorm && normalizeRepoPath(nodePath) === openNorm);
              return (
                <MenuItem key={loc} disabled={isOpenBase} onClick={isOpenBase ? undefined : () => openEdit(nodePath)}>
                  <ListItemIcon>
                    <EditOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={isOpenBase ? `Current (${meta.label}, base)` : `Edit (${meta.label}, base)`}
                    secondary={
                      <Box component="span">
                        <Typography variant="caption" component="span" display="block" color="text.secondary">
                          {nodePath}
                        </Typography>
                        {badgeRow}
                      </Box>
                    }
                  />
                </MenuItem>
              );
            }
            if (statuses?.[loc]) {
              return (
                <MenuItem key={loc} disabled={isOpenLocale} onClick={isOpenLocale ? undefined : () => openEdit(p)}>
                  <ListItemIcon>
                    <EditOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={isOpenLocale ? `Current (${meta.label})` : `Edit (${meta.label})`}
                    secondary={
                      <Box component="span">
                        <Typography variant="caption" component="span" display="block" color="text.secondary">
                          {p}
                        </Typography>
                        {badgeRow}
                      </Box>
                    }
                  />
                </MenuItem>
              );
            }
            return (
              <MenuItem key={loc} onClick={() => void runTranslate(loc)}>
                <ListItemIcon>
                  <TranslateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`Translate to ${meta.label}`}
                  secondary={
                    <Box component="span">
                      <Typography variant="caption" component="span" display="block" color="text.secondary">
                        {`Create ${p}`}
                      </Typography>
                      {badgeRow}
                    </Box>
                  }
                />
              </MenuItem>
            );
          })}
        </Menu>
      ) : null}
    </Box>
  );
}

function translationTreeItemLabelPropsAreEqual(
  prev: TranslationTreeItemLabelProps,
  next: TranslationTreeItemLabelProps
): boolean {
  if (
    prev.displayName !== next.displayName ||
    prev.nodePath !== next.nodePath ||
    prev.rootDir !== next.rootDir ||
    prev.baseRootPath !== next.baseRootPath ||
    prev.siteId !== next.siteId ||
    prev.translationMode !== next.translationMode ||
    prev.missingTranslationFlags !== next.missingTranslationFlags ||
    normalizeRepoPath(prev.openItemPath) !== normalizeRepoPath(next.openItemPath)
  ) {
    return false;
  }
  if (prev.locales.length !== next.locales.length) {
    return false;
  }
  for (let i = 0; i < prev.locales.length; i += 1) {
    if (prev.locales[i] !== next.locales[i]) {
      return false;
    }
  }
  return true;
}

const TranslationTreeItemLabel = memo(TranslationTreeItemLabelInner, translationTreeItemLabelPropsAreEqual);
export default TranslationTreeItemLabel;
