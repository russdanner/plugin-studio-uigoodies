/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { CRAFTER_OPENSEARCH_FIELD_GROUPS } from '../utils/crafterOpenSearchFieldCatalog';
import { executeOpenSearchOnEngine } from '../utils/openSearchEngine';
import {
  buildExistsClause,
  buildMatchClause,
  buildPrefixClause,
  buildRangeClause,
  buildTermClause,
  buildWildcardClause,
  appendBoolMustClause,
  readSourceArray,
  setSourceArray
} from '../utils/openSearchQueryBuilder';
import {
  buildSchemaSampleQuery,
  extractHitSourcesFromSearchResponse,
  inferFieldsFromDocuments,
  type InferredField
} from '../utils/openSearchInferSchema';

type ClauseMode = 'match' | 'term' | 'prefix' | 'wildcard' | 'range' | null;

export type OpenSearchSchemaPanelProps = {
  siteId: string | undefined;
  extraIndexes: string;
  query: string;
  setQuery: (q: string) => void;
  openGroups: Record<string, boolean>;
  setOpenGroups: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  selectedFields: Set<string>;
  toggleField: (field: string, checked: boolean) => void;
  onInferredFieldsChange: (fields: InferredField[]) => void;
  /** When true, `_source` is the boolean `true` and field checkboxes are disabled. */
  sourceIsWildcard: boolean;
};

export function OpenSearchSchemaPanel({
  siteId,
  extraIndexes,
  query,
  setQuery,
  openGroups,
  setOpenGroups,
  selectedFields,
  toggleField,
  onInferredFieldsChange,
  sourceIsWildcard
}: OpenSearchSchemaPanelProps) {
  const dispatch = useDispatch();
  const [inferred, setInferred] = useState<InferredField[]>([]);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [sampleSize, setSampleSize] = useState(40);
  const [pathFilter, setPathFilter] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuField, setMenuField] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{
    open: boolean;
    mode: ClauseMode;
    field: string;
    value: string;
    gte: string;
    lte: string;
  }>({ open: false, mode: null, field: '', value: '', gte: '', lte: '' });

  const filteredInferred = useMemo(() => {
    const f = pathFilter.trim().toLowerCase();
    if (!f) {
      return inferred;
    }
    return inferred.filter((row) => row.path.toLowerCase().includes(f));
  }, [inferred, pathFilter]);

  const refreshSchema = useCallback(async () => {
    if (!siteId) {
      dispatch(showSystemNotification({ message: 'No active site.' }));
      return;
    }
    setSchemaLoading(true);
    try {
      const body = buildSchemaSampleQuery(sampleSize);
      const result = await executeOpenSearchOnEngine(siteId, body, extraIndexes);
      if (!result.ok || !result.parsedJson) {
        dispatch(
          showSystemNotification({
            message: `Could not load sample hits (HTTP ${result.status}). Is the index empty or Engine unreachable?`
          })
        );
        setInferred([]);
        onInferredFieldsChange([]);
        return;
      }
      const sources = extractHitSourcesFromSearchResponse(result.parsedJson);
      const fields = inferFieldsFromDocuments(sources);
      setInferred(fields);
      onInferredFieldsChange(fields);
      dispatch(
        showSystemNotification({
          message:
            fields.length === 0
              ? 'No hits returned — schema list is empty. Try a larger sample or publish content.'
              : `Inferred ${fields.length} field paths from ${sources.length} documents.`
        })
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(showSystemNotification({ message: `Schema refresh failed: ${msg}` }));
      setInferred([]);
      onInferredFieldsChange([]);
    } finally {
      setSchemaLoading(false);
    }
  }, [dispatch, extraIndexes, onInferredFieldsChange, sampleSize, siteId]);

  const applyBodyUpdate = useCallback(
    (updater: (body: Record<string, unknown>) => Record<string, unknown>) => {
      try {
        const body = JSON.parse(query) as Record<string, unknown>;
        setQuery(JSON.stringify(updater(body), null, 2));
      } catch {
        dispatch(showSystemNotification({ message: 'Fix invalid JSON in the query editor first.' }));
      }
    },
    [dispatch, query, setQuery]
  );

  const insertExists = useCallback(
    (field: string) => {
      applyBodyUpdate((body) => appendBoolMustClause(body, buildExistsClause(field)));
      dispatch(showSystemNotification({ message: `Inserted exists for "${field}".` }));
    },
    [applyBodyUpdate, dispatch]
  );

  const openClauseDialog = (mode: Exclude<ClauseMode, null>, field: string) => {
    setMenuAnchor(null);
    setMenuField(null);
    setDialog({
      open: true,
      mode,
      field,
      value: '',
      gte: '',
      lte: ''
    });
  };

  const confirmClauseDialog = () => {
    const { mode, field, value, gte, lte } = dialog;
    if (!mode || !field) {
      setDialog((d) => ({ ...d, open: false, mode: null }));
      return;
    }
    let clause: Record<string, unknown> | null = null;
    if (mode === 'match' && value.trim()) {
      clause = buildMatchClause(field, value.trim());
    } else if (mode === 'term' && value.trim()) {
      clause = buildTermClause(field, value.trim());
    } else if (mode === 'prefix' && value.trim()) {
      clause = buildPrefixClause(field, value.trim());
    } else if (mode === 'wildcard' && value.trim()) {
      clause = buildWildcardClause(field, value.trim());
    } else if (mode === 'range' && (gte.trim() || lte.trim())) {
      clause = buildRangeClause(field, gte, lte);
    }
    if (clause) {
      applyBodyUpdate((body) => appendBoolMustClause(body, clause));
      dispatch(showSystemNotification({ message: `Inserted ${mode} clause for "${field}".` }));
    } else {
      dispatch(showSystemNotification({ message: 'Enter a value for this clause type.' }));
    }
    setDialog((d) => ({ ...d, open: false, mode: null }));
  };

  const onMenuOpen = (e: React.MouseEvent<HTMLElement>, field: string) => {
    setMenuAnchor(e.currentTarget);
    setMenuField(field);
  };

  const addFieldToSource = (path: string) => {
    applyBodyUpdate((body) => {
      const cur = readSourceArray(body).filter((p) => p !== '*');
      return setSourceArray(body, Array.from(new Set([...cur, path])));
    });
    dispatch(showSystemNotification({ message: `Added "${path}" to _source.` }));
    setMenuAnchor(null);
    setMenuField(null);
  };

  return (
    <>
      <Box sx={{ px: 1.5, py: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2">Schema (inferred)</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Loads sample hits and walks <Typography component="span" variant="caption" fontFamily="monospace">_source</Typography> to list fields. Use the menu to insert clauses into{' '}
          <Typography component="span" variant="caption" fontFamily="monospace">bool.must</Typography>.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <TextField
            size="small"
            type="number"
            label="Sample size"
            value={sampleSize}
            onChange={(e) => setSampleSize(Math.min(200, Math.max(1, Number(e.target.value) || 1)))}
            sx={{ width: 110 }}
            inputProps={{ min: 1, max: 200 }}
          />
          <Button
            size="small"
            variant="outlined"
            startIcon={
              schemaLoading ? <CircularProgress color="inherit" size={16} /> : <RefreshRoundedIcon />
            }
            disabled={schemaLoading || !siteId}
            onClick={() => void refreshSchema()}
          >
            {schemaLoading ? 'Loading…' : 'Refresh schema'}
          </Button>
        </Box>
        <TextField
          size="small"
          fullWidth
          sx={{ mt: 1 }}
          label="Filter paths"
          value={pathFilter}
          onChange={(e) => setPathFilter(e.target.value)}
          placeholder="e.g. localId or title"
          InputProps={{
            endAdornment: pathFilter ? (
              <InputAdornment position="end">
                <Button size="small" onClick={() => setPathFilter('')}>
                  Clear
                </Button>
              </InputAdornment>
            ) : undefined
          }}
        />
      </Box>
      {sourceIsWildcard && (
        <Alert severity="info" sx={{ mx: 1, mt: 1 }}>
          Query uses <Typography component="span" fontFamily="monospace">_source: true</Typography>. Checkboxes are disabled until you set an explicit <Typography component="span" fontFamily="monospace">_source</Typography> array in JSON.
        </Alert>
      )}
      <List dense sx={{ overflow: 'auto', py: 0, maxHeight: { xs: 200, md: 320 } }}>
        {filteredInferred.length === 0 && !schemaLoading && (
          <ListItem>
            <ListItemText
              primary="No schema loaded"
              secondary='Click "Refresh schema" after documents are indexed.'
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        )}
        {filteredInferred.map((row) => (
          <ListItem
            key={row.path}
            secondaryAction={
              <Tooltip title="Query builder">
                <IconButton edge="end" size="small" onClick={(e) => onMenuOpen(e, row.path)}>
                  <MoreVertRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            }
            sx={{ alignItems: 'flex-start', pr: 7 }}
          >
            <FormControlLabel
              sx={{ mr: 0, alignItems: 'flex-start' }}
              control={
                <Checkbox
                  size="small"
                  checked={sourceIsWildcard || selectedFields.has(row.path)}
                  disabled={sourceIsWildcard}
                  onChange={(_, c) => toggleField(row.path, c)}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                    {row.path}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {row.types.map((t) => (
                      <Chip key={t} label={t} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            if (menuField) {
              addFieldToSource(menuField);
            }
          }}
        >
          Add to <Typography component="span" fontFamily="monospace">_source</Typography>
        </MenuItem>
        <Divider />
        {menuField && (
          <MenuItem
            onClick={() => {
              insertExists(menuField);
              setMenuAnchor(null);
            }}
          >
            Insert exists
          </MenuItem>
        )}
        <MenuItem onClick={() => menuField && openClauseDialog('match', menuField)}>Insert match…</MenuItem>
        <MenuItem onClick={() => menuField && openClauseDialog('term', menuField)}>Insert term…</MenuItem>
        <MenuItem onClick={() => menuField && openClauseDialog('prefix', menuField)}>Insert prefix…</MenuItem>
        <MenuItem onClick={() => menuField && openClauseDialog('wildcard', menuField)}>Insert wildcard…</MenuItem>
        <MenuItem onClick={() => menuField && openClauseDialog('range', menuField)}>Insert range…</MenuItem>
      </Menu>

      <Dialog open={dialog.open} onClose={() => setDialog((d) => ({ ...d, open: false, mode: null }))} fullWidth maxWidth="sm">
        <DialogTitle>
          {dialog.mode === 'match' && 'Match'}
          {dialog.mode === 'term' && 'Term'}
          {dialog.mode === 'prefix' && 'Prefix'}
          {dialog.mode === 'wildcard' && 'Wildcard'}
          {dialog.mode === 'range' && 'Range'}
          {dialog.field && (
            <Typography component="span" variant="body2" fontFamily="monospace" display="block" sx={{ mt: 1 }}>
              {dialog.field}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {dialog.mode === 'range' ? (
            <>
              <TextField
                margin="dense"
                fullWidth
                label="gte (optional)"
                value={dialog.gte}
                onChange={(e) => setDialog((d) => ({ ...d, gte: e.target.value }))}
                placeholder="2024-01-01 or now-1y"
              />
              <TextField
                margin="dense"
                fullWidth
                label="lte (optional)"
                value={dialog.lte}
                onChange={(e) => setDialog((d) => ({ ...d, lte: e.target.value }))}
                placeholder="now"
              />
            </>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label={dialog.mode === 'wildcard' ? 'Pattern (* and ? allowed)' : 'Value'}
              value={dialog.value}
              onChange={(e) => setDialog((d) => ({ ...d, value: e.target.value }))}
              multiline={dialog.mode === 'match'}
              minRows={dialog.mode === 'match' ? 3 : 1}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog((d) => ({ ...d, open: false, mode: null }))}>Cancel</Button>
          <Button variant="contained" onClick={confirmClauseDialog}>
            Insert clause
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ my: 1 }} />
      <Box sx={{ px: 1.5, py: 0.5 }}>
        <Typography variant="subtitle2">Common fields (shortcuts)</Typography>
        <Typography variant="caption" color="text.secondary">
          Curated list — toggles <Typography component="span" variant="caption" fontFamily="monospace">_source</Typography>.
        </Typography>
      </Box>
      <List dense sx={{ overflow: 'auto', py: 0, maxHeight: 220 }}>
        {CRAFTER_OPENSEARCH_FIELD_GROUPS.map((group) => (
          <React.Fragment key={group.title}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  aria-label={openGroups[group.title] ? 'Collapse' : 'Expand'}
                  onClick={() => setOpenGroups((s) => ({ ...s, [group.title]: !s[group.title] }))}
                >
                  {openGroups[group.title] ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </IconButton>
              }
              sx={{ py: 0.5 }}
            >
              <ListItemText primary={group.title} primaryTypographyProps={{ variant: 'subtitle2' }} />
            </ListItem>
            <Collapse in={openGroups[group.title]} timeout="auto" unmountOnExit>
              <List component="div" dense disablePadding>
                {group.fields.map((field) => (
                  <ListItem key={field} sx={{ pl: 2, py: 0 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={sourceIsWildcard || selectedFields.has(field)}
                          disabled={sourceIsWildcard}
                          onChange={(_, c) => toggleField(field, c)}
                        />
                      }
                      label={
                        <Typography variant="body2" fontFamily="monospace">
                          {field}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
}
