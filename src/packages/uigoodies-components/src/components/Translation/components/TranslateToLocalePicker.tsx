/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */

import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { closeWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useCurrentPreviewItem from '@craftercms/studio-ui/hooks/useCurrentPreviewItem';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import StudioAPI, { PreviewItemType } from '../api/studio';
import { getWebsiteComponentsRootDir, pathLastSegment } from '../utils/localePathUtils';
import { openEditFormStudioDispatch } from '../utils/studioEditDialog';
import { getFlagForLocale, SiteTranslationConfig, translationConfigsEqual } from '../config/multiLocaleConfig';
import {
  listAllLocaleTargets,
  LocaleTranslateTarget,
  resolveLocaleFoldersOnSite
} from '../utils/translateLocaleUtils';

export type TranslateToLocalePickerProps = {
  variant?: 'dialog' | 'toolbar' | 'panel';
  translationFormPath?: string;
  translationFormName?: string;
  translationFormContentType?: string;
  translationAuthoringBase?: string;
  /** When true, successful copy closes the host widget dialog (default off so you can copy to several locales). */
  closeDialogOnSuccess?: boolean;
};

export function TranslateToLocalePicker(props: TranslateToLocalePickerProps) {
  const {
    variant = 'dialog',
    translationFormPath,
    translationFormName,
    translationFormContentType,
    translationAuthoringBase,
    closeDialogOnSuccess = false
  } = props;

  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const { authoringBase: envAuthoringBase } = useEnv();
  const currentPreviewItem = useCurrentPreviewItem();
  const previewDerived = currentPreviewItem ? StudioAPI.getPreviewItem(currentPreviewItem) : null;

  const authoringBase = translationAuthoringBase?.trim() || envAuthoringBase || '';

  const sourceItem: PreviewItemType | null = useMemo(() => {
    const trimmed = typeof translationFormPath === 'string' ? translationFormPath.trim() : '';
    if (trimmed !== '') {
      return {
        name:
          (typeof translationFormName === 'string' && translationFormName.trim()) || pathLastSegment(trimmed),
        path: trimmed,
        contentType: (typeof translationFormContentType === 'string' && translationFormContentType) || ''
      };
    }
    return previewDerived;
  }, [translationFormPath, translationFormName, translationFormContentType, previewDerived]);

  const [options, setOptions] = useState<LocaleTranslateTarget[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState('');
  const [copyBusy, setCopyBusy] = useState(false);
  const [translationConfig, setTranslationConfig] = useState<SiteTranslationConfig | null>(null);
  const translationConfigRef = useRef<SiteTranslationConfig | null>(null);
  translationConfigRef.current = translationConfig;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!siteId || !authoringBase) {
        setTranslationConfig(null);
        return;
      }
      const cfg = await StudioAPI.getTranslationConfig(authoringBase, siteId, true);
      if (!cancelled) {
        setTranslationConfig(cfg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [siteId, authoringBase]);

  const loadTargets = useCallback(async () => {
    setLoading(true);
    setSelectedLocale('');
    try {
      if (!siteId || !authoringBase || !sourceItem?.path) {
        setOptions([]);
        return;
      }
      const rootDir = getWebsiteComponentsRootDir(sourceItem.path);
      if (!rootDir) {
        setOptions([]);
        return;
      }
      const liveConfig = await StudioAPI.getTranslationConfig(authoringBase, siteId, true);
      if (liveConfig) {
        setTranslationConfig((prev) =>
          translationConfigsEqual(prev, liveConfig) ? prev : liveConfig
        );
      }
      const effectiveConfig = liveConfig ?? translationConfigRef.current;
      const localeCodes = (effectiveConfig?.languages ?? [])
        .map((l) => l.locale)
        .filter((c): c is string => Boolean(c));
      if (localeCodes.length < 2) {
        setOptions([]);
        return;
      }
      const localeMeta = localeCodes.reduce<Record<string, { label: string; flag: string }>>((acc, code) => {
        const row = effectiveConfig?.languages?.find((l) => l.locale.toLowerCase() === code.toLowerCase());
        const label = row?.label || code;
        const flag = (row?.flag && String(row.flag).trim()) || getFlagForLocale(code);
        acc[code.toLowerCase()] = { label, flag };
        return acc;
      }, {});
      const folders = await resolveLocaleFoldersOnSite(
        authoringBase,
        siteId,
        rootDir,
        localeCodes,
        effectiveConfig?.baseLanguage
      );
      if (!folders) {
        setOptions([]);
        return;
      }
      const targets = await listAllLocaleTargets(
        authoringBase,
        siteId,
        sourceItem.path,
        rootDir,
        folders,
        localeMeta
      );
      setOptions(targets);
    } finally {
      setLoading(false);
    }
  }, [siteId, authoringBase, sourceItem?.path]);

  useEffect(() => {
    void loadTargets();
  }, [loadTargets]);

  const selected = options.find((o) => o.locale === selectedLocale) ?? null;

  const runCopy = async (copyAndEdit: boolean) => {
    if (!selected || !sourceItem?.path || !siteId || !authoringBase || copyBusy) {
      return;
    }
    if (selected.exists) {
      dispatch(
        showSystemNotification({
          message: `A file already exists for ${selected.label} (${selected.locale}).`
        })
      );
      return;
    }
    setCopyBusy(true);
    try {
      const res = await StudioAPI.copyItem(
        authoringBase,
        siteId,
        sourceItem.path,
        selected.destinationParentPath,
        selected.targetFilePath
      );
      const pastedPath = (res?.pastedPath || res?.items?.[0]) as string | undefined;
      if (!res?.ok || !pastedPath) {
        dispatch(
          showSystemNotification({
            message: res?.message || `Could not copy to ${selected.label}.`
          })
        );
        return;
      }
      dispatch(
        showSystemNotification({
          message: `Copied to ${selected.label}: ${pastedPath}`
        })
      );
      if (copyAndEdit && pastedPath) {
        openEditFormStudioDispatch(dispatch, siteId, pastedPath, authoringBase);
      }
      await loadTargets();
      if (closeDialogOnSuccess && variant === 'dialog') {
        dispatch(closeWidgetDialog());
      }
    } catch {
      dispatch(
        showSystemNotification({
          message: `Could not copy to ${selected.label}.`
        })
      );
    } finally {
      setCopyBusy(false);
    }
  };

  const onSelectChange = (e: SelectChangeEvent<string>) => {
    setSelectedLocale(e.target.value);
  };

  const disabledCore = !siteId || !authoringBase || !sourceItem?.path;
  const hint = disabledCore
    ? variant === 'toolbar'
      ? 'Select an item in preview or open a form.'
      : 'No source path — open from preview or a content form.'
    : !getWebsiteComponentsRootDir(sourceItem.path)
      ? 'Path must be under /site/…/website or …/components.'
      : options.length === 0 && !loading
        ? 'No target locales: ensure /config/studio/translation-config.xml lists at least two localeCodes, the plugin script returns them, and this path is under /site/…/website or …/components.'
        : options.length > 0 && options.every((o) => o.exists) && !loading
          ? 'All configured locales already have a file at this path.'
          : null;

  const isToolbar = variant === 'toolbar';
  const labelId = 'translation-locale-select-label';

  const controls = (
    <Stack
      direction={isToolbar ? 'row' : 'column'}
      spacing={isToolbar ? 1 : 1.5}
      alignItems={isToolbar ? 'center' : 'stretch'}
      sx={{ width: isToolbar ? 'auto' : '100%', minWidth: 0 }}
    >
      <FormControl
        size="small"
        disabled={disabledCore || loading || options.length === 0}
        sx={{ minWidth: isToolbar ? 140 : '100%', flex: isToolbar ? '0 1 auto' : undefined }}
      >
        <InputLabel id={labelId}>Locale</InputLabel>
        <Select
          labelId={labelId}
          label="Locale"
          value={selectedLocale}
          onChange={onSelectChange}
          displayEmpty
          renderValue={(v) => {
            if (!v) {
              return loading ? '…' : options.length === 0 ? '—' : 'Choose locale…';
            }
            const o = options.find((x) => x.locale === v);
            return o ? `${o.flag} ${o.label}` : v;
          }}
        >
          <MenuItem value="" disabled>
            <em>Choose locale…</em>
          </MenuItem>
          {options.map((o) => (
            <MenuItem key={o.locale} value={o.locale} disabled={o.exists}>
              {o.flag} {o.label} ({o.locale})
              {o.exists ? ' — exists' : ''}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Tooltip title="Reload locale list and content-exists checks">
          <span>
            <IconButton
              size="small"
              aria-label="Refresh locales"
              onClick={() => void loadTargets()}
              disabled={disabledCore || loading || copyBusy}
            >
              {loading ? <CircularProgress size={18} /> : <RefreshOutlinedIcon fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
        <Button
          size="small"
          variant="contained"
          disabled={!selected || !!selected?.exists || copyBusy || loading}
          onClick={() => void runCopy(false)}
        >
          Copy
        </Button>
        <Button
          size="small"
          variant="outlined"
          disabled={!selected || !!selected?.exists || copyBusy || loading}
          onClick={() => void runCopy(true)}
        >
          Copy &amp; edit
        </Button>
      </Stack>
    </Stack>
  );

  if (isToolbar) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', maxWidth: '100%' }}>
        {hint ? (
          <Tooltip title={hint}>
            <span style={{ display: 'inline-flex' }}>{controls}</span>
          </Tooltip>
        ) : (
          controls
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {hint ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {hint}
        </Typography>
      ) : null}
      {sourceItem?.path ? (
        <Typography
          variant="caption"
          color="text.secondary"
          component="div"
          sx={{ mb: 1, fontFamily: 'ui-monospace, monospace', wordBreak: 'break-all' }}
        >
          {sourceItem.path}
        </Typography>
      ) : null}
      {controls}
    </Box>
  );
}

export default TranslateToLocalePicker;
