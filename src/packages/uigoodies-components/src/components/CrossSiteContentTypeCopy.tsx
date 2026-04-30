/*
 * Copyright (C) 2007-2024 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { concatMap, forkJoin, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  List,
  ListItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { DialogBody, DialogFooter } from '@craftercms/studio-ui';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { showErrorDialog } from '@craftercms/studio-ui/state/reducers/dialogs/error';
import { fetchAll } from '@craftercms/studio-ui/services/sites';
import { fetchContentTypes } from '@craftercms/studio-ui/services/contentTypes';
import { fetchConfigurationXML, writeConfiguration } from '@craftercms/studio-ui/services/configuration';

const MODULE = 'studio';

function contentTypeConfigPaths(contentTypeId: string): { configPath: string; formPath: string } {
  const id = contentTypeId.startsWith('/') ? contentTypeId : `/${contentTypeId}`;
  const base = `/content-types${id}`.replace(/\/{2,}/g, '/');
  return {
    configPath: `${base}/config.xml`,
    formPath: `${base}/form-definition.xml`
  };
}

type SiteOption = { id: string; name: string };

type ContentTypeRow = { id: string; name: string };
type RenameOverride = { newId: string; newLabel: string };

function normalizeContentTypeId(value: string): string {
  const trimmed = (value ?? '').trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function suggestCopyId(baseId: string, takenIds: Set<string>): string {
  const normalizedBase = normalizeContentTypeId(baseId);
  const suffix = '-copy';
  let candidate = `${normalizedBase}${suffix}`;
  let counter = 2;
  while (takenIds.has(candidate)) {
    candidate = `${normalizedBase}${suffix}-${counter}`;
    counter += 1;
  }
  return candidate;
}

function assertValidXml(doc: Document, xmlType: string) {
  if (doc.querySelector('parsererror')) {
    throw new Error(`Unable to parse ${xmlType} XML while preparing copied content type.`);
  }
}

function transformConfigXml(xml: string, targetId: string, targetLabel: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  assertValidXml(doc, 'config');
  const root = doc.querySelector('content-type');
  if (root) {
    root.setAttribute('name', targetId);
  }
  const labelNode = doc.querySelector('content-type > label');
  if (labelNode) {
    labelNode.textContent = targetLabel;
  }
  return new XMLSerializer().serializeToString(doc);
}

function transformFormDefinitionXml(xml: string, targetId: string, targetLabel: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  assertValidXml(doc, 'form-definition');
  const contentTypeNode = doc.querySelector('form > content-type');
  if (contentTypeNode) {
    contentTypeNode.textContent = targetId;
  }
  const titleNode = doc.querySelector('form > title');
  if (titleNode) {
    titleNode.textContent = targetLabel;
  }
  return new XMLSerializer().serializeToString(doc);
}

export function CrossSiteContentTypeCopy() {
  const dispatch = useDispatch();
  const activeSiteId = useActiveSiteId();
  const [activeStep, setActiveStep] = useState(0);
  const [sites, setSites] = useState<SiteOption[]>([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  const [sourceSite, setSourceSite] = useState<SiteOption | null>(null);
  const [destSite, setDestSite] = useState<SiteOption | null>(null);
  const [typesLoading, setTypesLoading] = useState(false);
  const [contentTypes, setContentTypes] = useState<ContentTypeRow[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [destinationTypeIds, setDestinationTypeIds] = useState<Set<string>>(new Set());
  const [destinationTypesLoading, setDestinationTypesLoading] = useState(false);
  const [renameOverrides, setRenameOverrides] = useState<Record<string, RenameOverride>>({});
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const sub = fetchAll({ limit: 500, offset: 0 }).subscribe({
      next(sitesResponse: SiteOption[] & { total?: number }) {
        const list = (Array.isArray(sitesResponse) ? sitesResponse : []).filter(Boolean) as SiteOption[];
        setSites(list);
        setSitesLoading(false);
      },
      error(error) {
        setSitesLoading(false);
        dispatch(showErrorDialog(error));
      }
    });
    return () => sub.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    setSelectedIds({});
  }, [sourceSite?.id]);

  useEffect(() => {
    if (!sourceSite) {
      setContentTypes([]);
      return;
    }
    setTypesLoading(true);
    const sub = fetchContentTypes(sourceSite.id).subscribe({
      next(types: Array<{ id?: string; name?: string }>) {
        const rows: ContentTypeRow[] = (types ?? [])
          .map((t) => ({
            id: (t.id ?? '').trim(),
            name: (t.name ?? t.id ?? '').trim()
          }))
          .filter((t) => t.id.length > 0)
          .sort((a, b) => a.id.localeCompare(b.id));
        setContentTypes(rows);
        setTypesLoading(false);
      },
      error(error) {
        setTypesLoading(false);
        dispatch(showErrorDialog(error));
      }
    });
    return () => sub.unsubscribe();
  }, [dispatch, sourceSite]);

  useEffect(() => {
    if (!destSite) {
      setDestinationTypeIds(new Set());
      return;
    }
    setDestinationTypesLoading(true);
    const sub = fetchContentTypes(destSite.id).subscribe({
      next(types: Array<{ id?: string }>) {
        const ids = new Set((types ?? []).map((t) => normalizeContentTypeId(t.id ?? '')).filter(Boolean));
        setDestinationTypeIds(ids);
        setDestinationTypesLoading(false);
      },
      error(error) {
        setDestinationTypesLoading(false);
        dispatch(showErrorDialog(error));
      }
    });
    return () => sub.unsubscribe();
  }, [dispatch, destSite]);

  useEffect(() => {
    if (activeSiteId && sites.length && !sourceSite) {
      const current = sites.find((s) => s.id === activeSiteId);
      if (current) {
        setSourceSite(current);
      }
    }
  }, [activeSiteId, sites, sourceSite]);

  const filteredTypes = useMemo(() => {
    const q = typeFilter.trim().toLowerCase();
    if (!q) {
      return contentTypes;
    }
    return contentTypes.filter((t) => t.id.toLowerCase().includes(q) || t.name.toLowerCase().includes(q));
  }, [contentTypes, typeFilter]);

  const selectedList = useMemo(
    () => contentTypes.filter((t) => selectedIds[t.id]).map((t) => t.id),
    [contentTypes, selectedIds]
  );
  const selectedRows = useMemo(() => contentTypes.filter((t) => selectedIds[t.id]), [contentTypes, selectedIds]);
  const selectedLookup = useMemo(
    () => selectedRows.reduce((acc, row) => ({ ...acc, [row.id]: row }), {} as Record<string, ContentTypeRow>),
    [selectedRows]
  );
  const conflictingIds = useMemo(
    () => selectedList.filter((id) => destinationTypeIds.has(normalizeContentTypeId(id))),
    [selectedList, destinationTypeIds]
  );

  useEffect(() => {
    if (!conflictingIds.length) {
      setRenameOverrides({});
      return;
    }
    setRenameOverrides((prev) => {
      const next: Record<string, RenameOverride> = {};
      const takenIds = new Set(destinationTypeIds);
      selectedList.forEach((id) => {
        const normalizedId = normalizeContentTypeId(id);
        if (!destinationTypeIds.has(normalizedId)) {
          return;
        }
        const existing = prev[id];
        const defaultLabel = `${selectedLookup[id]?.name || id} Copy`;
        const newId = existing?.newId ? normalizeContentTypeId(existing.newId) : suggestCopyId(normalizedId, takenIds);
        next[id] = {
          newId,
          newLabel: existing?.newLabel ?? defaultLabel
        };
        takenIds.add(newId);
      });
      return next;
    });
  }, [conflictingIds.length, destinationTypeIds, selectedList, selectedLookup]);

  const toggleType = useCallback((id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleAllFiltered = useCallback(() => {
    const allOn = filteredTypes.every((t) => selectedIds[t.id]);
    setSelectedIds((prev) => {
      const next = { ...prev };
      filteredTypes.forEach((t) => {
        next[t.id] = !allOn;
      });
      return next;
    });
  }, [filteredTypes, selectedIds]);

  const canNextFromSource = Boolean(sourceSite);
  const canNextFromTypes = selectedList.length > 0;
  const conflictValidationErrors = useMemo(() => {
    const errors: string[] = [];
    if (!destSite) {
      return errors;
    }
    const reserved = new Set<string>(destinationTypeIds);
    conflictingIds.forEach((id) => {
      const override = renameOverrides[id];
      const newId = normalizeContentTypeId(override?.newId ?? '');
      const newLabel = (override?.newLabel ?? '').trim();
      if (!newId) {
        errors.push(`Provide a new ID for ${id}.`);
        return;
      }
      if (newId === normalizeContentTypeId(id)) {
        errors.push(`New ID for ${id} must be different from existing ID.`);
      }
      if (reserved.has(newId)) {
        errors.push(`ID ${newId} already exists in destination project.`);
      }
      if (!newLabel) {
        errors.push(`Provide a new label for ${id}.`);
      }
      reserved.add(newId);
    });
    return errors;
  }, [conflictingIds, destinationTypeIds, renameOverrides, destSite]);

  const canNextFromDest = Boolean(destSite);
  const canCopy = canNextFromDest && selectedList.length > 0 && conflictValidationErrors.length === 0;

  const handleNext = () => {
    if (activeStep === 0 && !canNextFromSource) {
      return;
    }
    if (activeStep === 1 && !canNextFromTypes) {
      return;
    }
    if (activeStep === 2 && !canNextFromDest) {
      return;
    }
    setActiveStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const runCopy = () => {
    if (!sourceSite || !destSite || selectedList.length === 0) {
      return;
    }
    setCopying(true);
    from(selectedList)
      .pipe(
        concatMap((sourceTypeId) => {
          const sourceRow = selectedLookup[sourceTypeId];
          const isConflict = conflictingIds.includes(sourceTypeId);
          const targetTypeId = isConflict
            ? normalizeContentTypeId(renameOverrides[sourceTypeId]?.newId ?? '')
            : normalizeContentTypeId(sourceTypeId);
          const targetLabel = isConflict
            ? (renameOverrides[sourceTypeId]?.newLabel ?? '').trim()
            : sourceRow?.name || sourceTypeId;
          const sourcePaths = contentTypeConfigPaths(sourceTypeId);
          const targetPaths = contentTypeConfigPaths(targetTypeId);

          return forkJoin({
            config: fetchConfigurationXML(sourceSite.id, sourcePaths.configPath, MODULE).pipe(
              catchError((err) => {
                dispatch(showErrorDialog(err));
                throw err;
              })
            ),
            form: fetchConfigurationXML(sourceSite.id, sourcePaths.formPath, MODULE).pipe(
              catchError((err) => {
                dispatch(showErrorDialog(err));
                throw err;
              })
            )
          }).pipe(
            switchMap(({ config, form }) => {
              const configContent = isConflict ? transformConfigXml(config, targetTypeId, targetLabel) : config;
              const formContent = isConflict ? transformFormDefinitionXml(form, targetTypeId, targetLabel) : form;
              return forkJoin([
                writeConfiguration(destSite.id, targetPaths.configPath, MODULE, configContent),
                writeConfiguration(destSite.id, targetPaths.formPath, MODULE, formContent)
              ]);
            })
          );
        })
      )
      .subscribe({
        complete() {
          setCopying(false);
          dispatch(
            showSystemNotification({
              message: `Copied ${selectedList.length} content type(s) from "${sourceSite.id}" to "${destSite.id}".`
            })
          );
          setActiveStep(0);
          setSelectedIds({});
          setDestSite(null);
        },
        error() {
          setCopying(false);
        }
      });
  };

  const destOptions = useMemo(() => sites, [sites]);

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Copy content types across projects
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Copies <code>config.xml</code> and <code>form-definition.xml</code> for each selected type from a source
          project to a destination project. If a selected ID already exists in destination, you must provide a new ID
          and label (supports same-project duplication). Preview images and other files in the type folder are not
          copied.
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          <Step>
            <StepLabel>Source project</StepLabel>
          </Step>
          <Step>
            <StepLabel>Content types</StepLabel>
          </Step>
          <Step>
            <StepLabel>Destination</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <DialogBody>
            {sitesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={32} />
              </Box>
            ) : (
              <Autocomplete
                options={sites}
                getOptionLabel={(o) => `${o.name} (${o.id})`}
                value={sourceSite}
                onChange={(_, v) => setSourceSite(v)}
                renderInput={(params) => <TextField {...params} label="Source project" required />}
              />
            )}
          </DialogBody>
        )}

        {activeStep === 1 && (
          <DialogBody sx={{ minHeight: '40vh' }}>
            {typesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={32} />
              </Box>
            ) : (
              <>
                <TextField
                  fullWidth
                  size="small"
                  label="Filter types"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filteredTypes.length > 0 && filteredTypes.every((t) => selectedIds[t.id])}
                      indeterminate={
                        filteredTypes.some((t) => selectedIds[t.id]) &&
                        !filteredTypes.every((t) => selectedIds[t.id])
                      }
                      onChange={toggleAllFiltered}
                    />
                  }
                  label="Select all (filtered)"
                />
                <List dense sx={{ maxHeight: 360, overflow: 'auto', border: 1, borderColor: 'divider' }}>
                  {filteredTypes.map((t) => (
                    <ListItem key={t.id} disablePadding>
                      <FormControlLabel
                        sx={{ px: 1, width: '100%', m: 0 }}
                        control={<Checkbox checked={Boolean(selectedIds[t.id])} onChange={() => toggleType(t.id)} />}
                        label={
                          <span>
                            <Typography component="span" variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {t.id}
                            </Typography>
                            {t.name && t.name !== t.id ? (
                              <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                — {t.name}
                              </Typography>
                            ) : null}
                          </span>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </DialogBody>
        )}

        {activeStep === 2 && (
          <DialogBody>
            <Autocomplete
              options={destOptions}
              getOptionLabel={(o) => `${o.name} (${o.id})`}
              value={destSite}
              onChange={(_, v) => setDestSite(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination project"
                  required
                  helperText={destinationTypesLoading ? 'Loading destination content types...' : ' '}
                />
              )}
            />
          </DialogBody>
        )}

        {activeStep === 3 && (
          <DialogBody>
            <Typography variant="body1" gutterBottom>
              Please confirm:
            </Typography>
            <Typography variant="body2" component="div">
              <strong>From:</strong> {sourceSite?.name} ({sourceSite?.id})
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              <strong>To:</strong> {destSite?.name} ({destSite?.id})
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Types ({selectedList.length}):</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 0, pl: 2, maxHeight: 240, overflow: 'auto' }}>
              {selectedList.map((id) => (
                <li key={id}>
                  <Typography variant="body2" component="code">
                    {id}
                  </Typography>
                </li>
              ))}
            </Box>
            {conflictingIds.length > 0 && (
              <>
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Destination already has {conflictingIds.length} selected content type ID(s). Provide a new label and
                  new ID for each conflict.
                </Alert>
                <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
                  {conflictingIds.map((id) => (
                    <Box key={id} sx={{ border: 1, borderColor: 'divider', p: 1.5, borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Existing ID: <code>{id}</code>
                      </Typography>
                      <TextField
                        fullWidth
                        label="New content type ID"
                        value={renameOverrides[id]?.newId ?? ''}
                        onChange={(e) =>
                          setRenameOverrides((prev) => ({
                            ...prev,
                            [id]: { ...(prev[id] ?? { newLabel: '', newId: '' }), newId: e.target.value }
                          }))
                        }
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        label="New label"
                        value={renameOverrides[id]?.newLabel ?? ''}
                        onChange={(e) =>
                          setRenameOverrides((prev) => ({
                            ...prev,
                            [id]: { ...(prev[id] ?? { newLabel: '', newId: '' }), newLabel: e.target.value }
                          }))
                        }
                      />
                    </Box>
                  ))}
                </Box>
              </>
            )}
            {conflictValidationErrors.length > 0 && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {conflictValidationErrors[0]}
              </Alert>
            )}
          </DialogBody>
        )}
      </Box>

      <DialogFooter sx={{ borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={handleBack} disabled={activeStep === 0 || copying}>
          Back
        </Button>
        {activeStep < 3 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              copying ||
              (activeStep === 0 && !canNextFromSource) ||
              (activeStep === 1 && !canNextFromTypes) ||
              (activeStep === 2 && !canNextFromDest)
            }
          >
            Next
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={runCopy} disabled={!canCopy || copying}>
            {copying ? <CircularProgress size={22} color="inherit" /> : 'Copy'}
          </Button>
        )}
      </DialogFooter>
    </Paper>
  );
}

export default CrossSiteContentTypeCopy;
