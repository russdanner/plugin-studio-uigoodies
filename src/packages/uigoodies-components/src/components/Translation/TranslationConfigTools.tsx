/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import { fetchContentTypes } from '@craftercms/studio-ui/services/contentTypes';
import { fetchConfigurationXML, writeConfiguration } from '@craftercms/studio-ui/services/configuration';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { from, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, toArray } from 'rxjs/operators';
import {
  ContentTypeTranslationRow,
  TRANSLATION_CONFIG_MODULE,
  TRANSLATION_CONFIG_PATH,
  TranslationConfigModel,
  TRANSLATION_FORM_REQUIREMENTS,
  analyzeFormDefinition,
  buildTranslationConfigXml,
  contentTypeFormPath,
  defaultTranslationConfigModel,
  parseTranslationConfigXml,
  patchFormDefinitionWithTranslationFields,
  suggestedLocaleOptions
} from './translationConfigSupport';
import {
  GLOBAL_HOME_INTERNAL_NAME,
  GLOBAL_HOME_PATH,
  WEBSITE_ROOT,
  localeHomeInternalName,
  scaffoldLocaleSiteStructure
} from './translationSiteScaffold';

type TabId = 'locales' | 'content-types';

function statusColor(complete: boolean, missingCount: number): 'success' | 'warning' | 'default' {
  if (complete) {
    return 'success';
  }
  if (missingCount > 0) {
    return 'warning';
  }
  return 'default';
}

export function TranslationConfigTools() {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const { authoringBase } = useEnv();
  const [tab, setTab] = useState<TabId>('locales');
  const [configLoading, setConfigLoading] = useState(true);
  const [configSaving, setConfigSaving] = useState(false);
  const [configExists, setConfigExists] = useState(false);
  const [configError, setConfigError] = useState('');
  const [configModel, setConfigModel] = useState<TranslationConfigModel>(defaultTranslationConfigModel());
  const [newLocaleCode, setNewLocaleCode] = useState<string | null>(null);

  const [typesLoading, setTypesLoading] = useState(false);
  const [typesError, setTypesError] = useState('');
  const [typeRows, setTypeRows] = useState<ContentTypeTranslationRow[]>([]);
  const [selectedTypeIds, setSelectedTypeIds] = useState<Set<string>>(new Set());
  const [applyLoading, setApplyLoading] = useState(false);
  const [scaffoldOpen, setScaffoldOpen] = useState(false);
  const [scaffoldLoading, setScaffoldLoading] = useState(false);

  const localeSuggestions = useMemo(() => suggestedLocaleOptions(), []);
  const localePreview = useMemo(
    () =>
      configModel.languages
        .map((row) => `${WEBSITE_ROOT}/${row.locale}/index.xml → ${localeHomeInternalName(row.locale)}`)
        .join('\n'),
    [configModel.languages]
  );

  const loadConfig = useCallback(() => {
    if (!siteId) {
      setConfigLoading(false);
      return;
    }
    setConfigLoading(true);
    setConfigError('');
    const sub = fetchConfigurationXML(siteId, TRANSLATION_CONFIG_PATH, TRANSLATION_CONFIG_MODULE).subscribe({
      next(xml: string) {
        const parsed = parseTranslationConfigXml(xml);
        if (parsed) {
          setConfigModel(parsed);
          setConfigExists(true);
        } else {
          setConfigModel(defaultTranslationConfigModel());
          setConfigExists(false);
          setConfigError('translation-config.xml is missing or invalid. Save below to create it.');
        }
        setConfigLoading(false);
      },
      error() {
        setConfigModel(defaultTranslationConfigModel());
        setConfigExists(false);
        setConfigError('translation-config.xml is not configured yet. Save below to create it.');
        setConfigLoading(false);
      }
    });
    return () => sub.unsubscribe();
  }, [siteId]);

  useEffect(() => {
    const cleanup = loadConfig();
    return cleanup;
  }, [loadConfig]);

  const scanContentTypes = useCallback(() => {
    if (!siteId) {
      return;
    }
    setTypesLoading(true);
    setTypesError('');
    setTypeRows([]);
    setSelectedTypeIds(new Set());
    const sub = fetchContentTypes(siteId)
      .pipe(
        mergeMap((types: Array<{ id?: string; name?: string }>) => from(types ?? [])),
        map((type) => ({
          id: (type.id ?? '').trim(),
          name: (type.name ?? type.id ?? '').trim()
        })),
        mergeMap((type) => {
          if (!type.id) {
            return of(null);
          }
          const formPath = contentTypeFormPath(type.id);
          return fetchConfigurationXML(siteId, formPath, TRANSLATION_CONFIG_MODULE).pipe(
            map((xml: string) => ({
              id: type.id,
              name: type.name || type.id,
              formPath,
              status: analyzeFormDefinition(xml)
            })),
            catchError(() =>
              of({
                id: type.id,
                name: type.name || type.id,
                formPath,
                status: {
                  hasTranslationSection: false,
                  hasLocaleCode: false,
                  hasSourceLocaleCode: false,
                  hasLocaleSourceId: false,
                  hasCustomLocaleControl: false,
                  hasTranslationVersions: false,
                  hasTranslationsField: false,
                  complete: false,
                  missing: ['Unable to load form-definition.xml']
                }
              })
            )
          );
        }),
        toArray(),
        map((rows) =>
          rows
            .filter(Boolean)
            .sort((a, b) => (a as ContentTypeTranslationRow).id.localeCompare((b as ContentTypeTranslationRow).id)) as ContentTypeTranslationRow[]
        )
      )
      .subscribe({
        next(rows) {
          setTypeRows(rows);
          const missing = rows.filter((row) => !row.status.complete).map((row) => row.id);
          setSelectedTypeIds(new Set(missing));
          setTypesLoading(false);
        },
        error(error) {
          setTypesError(error instanceof Error ? error.message : String(error));
          setTypesLoading(false);
        }
      });
    return () => sub.unsubscribe();
  }, [siteId]);

  useEffect(() => {
    if (tab === 'content-types' && siteId && typeRows.length === 0 && !typesLoading) {
      scanContentTypes();
    }
  }, [tab, siteId, typeRows.length, typesLoading, scanContentTypes]);

  const saveConfig = () => {
    if (!siteId) {
      return;
    }
    if (configModel.languages.length < 2) {
      dispatch(
        showSystemNotification({
          message: 'Add at least two locales for translation workflows.',
          options: { variant: 'warning' }
        })
      );
      return;
    }
    setConfigSaving(true);
    let xml = '';
    try {
      xml = buildTranslationConfigXml(configModel);
    } catch (error) {
      setConfigSaving(false);
      dispatch(
        showSystemNotification({
          message: error instanceof Error ? error.message : String(error),
          options: { variant: 'error' }
        })
      );
      return;
    }
    writeConfiguration(siteId, TRANSLATION_CONFIG_PATH, TRANSLATION_CONFIG_MODULE, xml).subscribe({
      next() {
        setConfigSaving(false);
        setConfigExists(true);
        setConfigError('');
        dispatch(
          showSystemNotification({
            message: 'Saved translation-config.xml',
            options: { variant: 'success' }
          })
        );
      },
      error(error) {
        setConfigSaving(false);
        dispatch(
          showSystemNotification({
            message: error instanceof Error ? error.message : String(error),
            options: { variant: 'error' }
          })
        );
      }
    });
  };

  const addLocale = () => {
    const code = (newLocaleCode || '').trim().toLowerCase().replace(/_/g, '-');
    if (!code) {
      return;
    }
    if (configModel.languages.some((row) => row.locale === code)) {
      return;
    }
    const suggestion = localeSuggestions.find((row) => row.code === code);
    setConfigModel((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          locale: code,
          label: suggestion?.label ?? code,
          flag: suggestion?.flag ?? '🌐'
        }
      ]
    }));
    setNewLocaleCode(null);
  };

  const removeLocale = (locale: string) => {
    setConfigModel((prev) => {
      const languages = prev.languages.filter((row) => row.locale !== locale);
      let baseLanguage = prev.baseLanguage;
      if (baseLanguage === locale) {
        baseLanguage = languages[0]?.locale ?? '';
      }
      return { baseLanguage, languages };
    });
  };

  const applyTranslationFields = () => {
    if (!siteId || selectedTypeIds.size === 0) {
      return;
    }
    const targets = typeRows.filter((row) => selectedTypeIds.has(row.id));
    setApplyLoading(true);
    from(targets)
      .pipe(
        concatMap((row) =>
          fetchConfigurationXML(siteId, row.formPath, TRANSLATION_CONFIG_MODULE).pipe(
            mergeMap((xml: string) => {
              const patched = patchFormDefinitionWithTranslationFields(xml);
              if (!patched.changed) {
                return of({ id: row.id, skipped: true as const });
              }
              return writeConfiguration(siteId, row.formPath, TRANSLATION_CONFIG_MODULE, patched.xml).pipe(
                map(() => ({ id: row.id, skipped: false as const, actions: patched.added.length }))
              );
            })
          )
        ),
        toArray()
      )
      .subscribe({
        next(results) {
          setApplyLoading(false);
          const updated = results.filter((result) => !result.skipped).length;
          dispatch(
            showSystemNotification({
              message: updated
                ? `Fixed translation setup on ${updated} content type(s).`
                : 'Selected content types already match the translation form layout.',
              options: { variant: 'success' }
            })
          );
          scanContentTypes();
        },
        error(error) {
          setApplyLoading(false);
          dispatch(
            showSystemNotification({
              message: error instanceof Error ? error.message : String(error),
              options: { variant: 'error' }
            })
          );
        }
      });
  };

  const runScaffold = async () => {
    if (!siteId || !authoringBase) {
      return;
    }
    if (configModel.languages.length < 2) {
      dispatch(
        showSystemNotification({
          message: 'Save at least two locales before creating locale home pages.',
          options: { variant: 'warning' }
        })
      );
      return;
    }
    setScaffoldLoading(true);
    try {
      const result = await scaffoldLocaleSiteStructure(siteId, authoringBase, configModel);
      dispatch(
        showSystemNotification({
          message: result.message,
          options: { variant: result.ok ? 'success' : 'warning' }
        })
      );
      if (result.ok) {
        setScaffoldOpen(false);
      }
    } catch (error) {
      dispatch(
        showSystemNotification({
          message: error instanceof Error ? error.message : String(error),
          options: { variant: 'error' }
        })
      );
    } finally {
      setScaffoldLoading(false);
    }
  };

  const incompleteCount = typeRows.filter((row) => !row.status.complete).length;

  return (
    <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Translation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure site locales and add Translation form controls to content types for project{' '}
          <Box component="span" sx={{ fontFamily: 'monospace' }}>
            {siteId || '—'}
          </Box>
          .
        </Typography>
      </Box>

      <Tabs value={tab} onChange={(_, value: TabId) => setTab(value)}>
        <Tab value="locales" label="Locales" />
        <Tab value="content-types" label={`Content types${incompleteCount ? ` (${incompleteCount})` : ''}`} />
      </Tabs>

      {tab === 'locales' && (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {configLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <>
              {configError && (
                <Alert severity={configExists ? 'warning' : 'info'} onClose={() => setConfigError('')}>
                  {configError}
                </Alert>
              )}
              <Typography variant="subtitle2" color="text.secondary">
                File: <Box component="code">/config/studio/translation-config.xml</Box>
              </Typography>
              <TextField
                select
                SelectProps={{ native: true }}
                label="Default locale"
                value={configModel.baseLanguage}
                onChange={(event) =>
                  setConfigModel((prev) => ({ ...prev, baseLanguage: event.target.value }))
                }
                size="small"
                sx={{ maxWidth: 280 }}
              >
                {configModel.languages.map((row) => (
                  <option key={row.locale} value={row.locale}>
                    {row.flag} {row.label} ({row.locale})
                  </option>
                ))}
              </TextField>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {configModel.languages.map((row) => (
                  <Chip
                    key={row.locale}
                    label={`${row.flag} ${row.label} (${row.locale})`}
                    color={row.locale === configModel.baseLanguage ? 'primary' : 'default'}
                    onDelete={configModel.languages.length > 1 ? () => removeLocale(row.locale) : undefined}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Autocomplete
                  size="small"
                  sx={{ minWidth: 280 }}
                  options={localeSuggestions}
                  getOptionLabel={(option) => `${option.flag} ${option.label} (${option.code})`}
                  value={localeSuggestions.find((row) => row.code === newLocaleCode) ?? null}
                  onChange={(_, value) => setNewLocaleCode(value?.code ?? null)}
                  renderInput={(params) => <TextField {...params} label="Add locale" placeholder="Search locales" />}
                />
                <Button variant="outlined" onClick={addLocale} disabled={!newLocaleCode}>
                  Add locale
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={configSaving ? <CircularProgress size={16} color="inherit" /> : <SaveRoundedIcon />}
                  onClick={saveConfig}
                  disabled={configSaving}
                >
                  Save locale config
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HomeWorkOutlinedIcon />}
                  onClick={() => setScaffoldOpen(true)}
                  disabled={configLoading || configModel.languages.length < 2 || !siteId}
                >
                  Create locale site structure
                </Button>
                <Button variant="text" startIcon={<RefreshRoundedIcon />} onClick={loadConfig}>
                  Reload
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 720 }}>
                <strong>Create locale site structure</strong> copies{' '}
                <Box component="code">{GLOBAL_HOME_PATH}</Box> into each configured locale folder, renames the global
                page to <strong>{GLOBAL_HOME_INTERNAL_NAME}</strong>, and creates locale home pages named{' '}
                <strong>{localeHomeInternalName('en')}</strong>, etc. Empty{' '}
                <Box component="code">/site/components/&lt;locale&gt;/</Box> folders are added when{' '}
                <Box component="code">/site/components</Box> exists.
              </Typography>
            </>
          )}
        </Paper>
      )}

      <Dialog open={scaffoldOpen} onClose={scaffoldLoading ? undefined : () => setScaffoldOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create locale site structure</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This will update <Box component="code">{GLOBAL_HOME_PATH}</Box> to internal-name{' '}
            <strong>{GLOBAL_HOME_INTERNAL_NAME}</strong> (standalone — not grouped with locale homes), then copy it
            into each locale folder below. Locale homes share one translation lineage and each gets its own{' '}
            <Box component="code">objectId</Box>. Existing locale home pages are updated, not overwritten.
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Planned locale home pages
          </Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 1.5,
              bgcolor: 'action.hover',
              borderRadius: 1,
              fontSize: '0.75rem',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
            {localePreview || 'Add locales and save the config first.'}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScaffoldOpen(false)} disabled={scaffoldLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => void runScaffold()}
            disabled={scaffoldLoading || configModel.languages.length < 2}
            startIcon={scaffoldLoading ? <CircularProgress size={16} color="inherit" /> : <HomeWorkOutlinedIcon />}
          >
            {scaffoldLoading ? 'Creating…' : 'Create structure'}
          </Button>
        </DialogActions>
      </Dialog>

      {tab === 'content-types' && (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0, flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={typesLoading ? <CircularProgress size={16} /> : <RefreshRoundedIcon />}
              onClick={scanContentTypes}
              disabled={typesLoading || !siteId}
            >
              Scan content types
            </Button>
            <Button
              variant="contained"
              startIcon={applyLoading ? <CircularProgress size={16} color="inherit" /> : <PlaylistAddRoundedIcon />}
              onClick={applyTranslationFields}
              disabled={applyLoading || selectedTypeIds.size === 0}
            >
              Fix translation setup on selected
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeRows.length > 0 && selectedTypeIds.size === typeRows.length}
                  indeterminate={selectedTypeIds.size > 0 && selectedTypeIds.size < typeRows.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedTypeIds(new Set(typeRows.map((row) => row.id)));
                    } else {
                      setSelectedTypeIds(new Set());
                    }
                  }}
                />
              }
              label="Select all"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    typeRows.filter((row) => !row.status.complete).length > 0 &&
                    typeRows.filter((row) => !row.status.complete).every((row) => selectedTypeIds.has(row.id))
                  }
                  indeterminate={
                    typeRows.some((row) => !row.status.complete && selectedTypeIds.has(row.id)) &&
                    !typeRows.filter((row) => !row.status.complete).every((row) => selectedTypeIds.has(row.id))
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedTypeIds(new Set(typeRows.filter((row) => !row.status.complete).map((row) => row.id)));
                    } else {
                      setSelectedTypeIds(new Set());
                    }
                  }}
                />
              }
              label="Select incomplete"
            />
          </Box>
          {typesError && <Alert severity="error">{typesError}</Alert>}
          <Alert severity="info" sx={{ mb: 2 }}>
            Each content type must have exactly one Translation section (last on the form, collapsed by default)
            containing{' '}
            {TRANSLATION_FORM_REQUIREMENTS.filter((req) => req.id !== 'translation-section')
              .map((req) => req.label)
              .join('; ')}
            . The translations control renders at the top of the form. Use <strong>Fix translation setup</strong> to
            move stray fields, remove duplicates, and repair broken layouts.
          </Alert>
          {!typesLoading && typeRows.length === 0 && !typesError && (
            <Alert severity="info">Scan content types to see which definitions need Translation fields.</Alert>
          )}
          {typeRows.length > 0 && (
            <Box sx={{ overflow: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell>Content type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Missing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {typeRows.map((row) => {
                    const checked = selectedTypeIds.has(row.id);
                    return (
                      <TableRow key={row.id} hover selected={checked}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={checked}
                            onChange={(event) => {
                              setSelectedTypeIds((prev) => {
                                const next = new Set(prev);
                                if (event.target.checked) {
                                  next.add(row.id);
                                } else {
                                  next.delete(row.id);
                                }
                                return next;
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {row.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {row.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={row.status.complete ? 'Ready' : 'Incomplete'}
                            color={statusColor(row.status.complete, row.status.missing.length)}
                          />
                        </TableCell>
                        <TableCell>
                          {row.status.complete ? (
                            <Typography variant="caption" color="text.secondary">
                              —
                            </Typography>
                          ) : (
                            row.status.missing.join(', ')
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default TranslationConfigTools;
