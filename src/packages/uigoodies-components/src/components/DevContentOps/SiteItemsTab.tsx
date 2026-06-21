/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  alpha
} from '@mui/material';
import ItemStateIcon from '@craftercms/studio-ui/components/ItemStateIcon';
import ItemTypeIcon from '@craftercms/studio-ui/components/ItemTypeIcon';
import type { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { fetchItemStates } from '@craftercms/studio-ui/services/workflow';
import { createPresenceTable } from '@craftercms/studio-ui/utils/array';
import { useDebouncedInput } from '@craftercms/studio-ui/hooks/useDebouncedInput';
import { firstValueFrom } from 'rxjs';
import { postUpdateItemStateBits } from './devContentOpsApi';
import { monoSx, PanelHeader, SectionLabel, surfacePaperSx, TabAlertStack, TabContentPanel, TabShell, TabToolbar } from './devContentOpsUi';
import {
  ITEM_STATE_TOGGLE_CONTROLS,
  STATE_FILTER_BITS,
  activeStateBitEntries,
  buildItemStateBitMasks,
  displayItemPath,
  formatStateBitLabel,
  formatStateBitShortLabel,
  getStateBitmap,
  itemMatchesName,
  itemMatchesType,
  itemStateDraftFromState,
  itemStateDraftHasChanges,
  resolveItemPathRegex,
  shortContentTypeLabel,
  stateIntegerFromDraft,
  type StateFilterKey
} from './siteItemStateUtils';

const INITIAL_STATE_FILTERS = STATE_FILTER_BITS.map(({ key }) => key);

const compactCellSx = {
  py: 0.75,
  px: 1.25,
  fontSize: '0.8125rem'
} as const;

function StateFilterChips({
  stateFilters,
  onStateFilterChange
}: {
  stateFilters: Record<StateFilterKey, boolean>;
  onStateFilterChange: (key: StateFilterKey | 'any', checked: boolean) => void;
}) {
  const anyActive = !Object.values(stateFilters).some(Boolean);
  return (
    <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.5} sx={{ mt: 0.75 }}>
      <Chip
        size="small"
        label="Any state"
        variant={anyActive ? 'filled' : 'outlined'}
        color={anyActive ? 'primary' : 'default'}
        onClick={() => onStateFilterChange('any', true)}
      />
      {STATE_FILTER_BITS.map(({ key, label }) => (
        <Chip
          key={key}
          size="small"
          label={label}
          variant={stateFilters[key] ? 'filled' : 'outlined'}
          color={stateFilters[key] ? 'primary' : 'default'}
          onClick={() => onStateFilterChange(key, !stateFilters[key])}
        />
      ))}
    </Stack>
  );
}

function ItemStatesCell({ item }: { item: SandboxItem }) {
  const bits = activeStateBitEntries(item.state);
  return (
    <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap" useFlexGap>
      <Tooltip title={`Combined state value: ${item.state}`}>
        <Box sx={{ display: 'inline-flex', lineHeight: 0 }}>
          <ItemStateIcon item={item} />
        </Box>
      </Tooltip>
      {bits.length === 0 ? (
        <Typography variant="caption" color="text.secondary">
          —
        </Typography>
      ) : (
        bits.map((bit) => (
          <Chip
            key={bit.id}
            size="small"
            label={formatStateBitShortLabel(bit.label)}
            variant="outlined"
            sx={{ height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } }}
            title={formatStateBitLabel(bit.label, bit.mask)}
          />
        ))
      )}
    </Stack>
  );
}

export function SiteItemsTab({ siteId }: { siteId: string; siteName?: string }) {
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState<SandboxItem[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pathRegex, setPathRegex] = useState('');
  const [debouncedPathRegex, setDebouncedPathRegex] = useState('');
  const [invalidPathRegex, setInvalidPathRegex] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilters, setStateFilters] = useState<Record<StateFilterKey, boolean>>(
    createPresenceTable(INITIAL_STATE_FILTERS, false) as Record<StateFilterKey, boolean>
  );
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);
  const [selectedPaths, setSelectedPaths] = useState<Record<string, boolean>>({});
  const [activeItemPath, setActiveItemPath] = useState<string | null>(null);
  const [itemStateDraft, setItemStateDraft] = useState<Record<string, boolean>>({});
  const [applying, setApplying] = useState(false);

  const stateBitmap = useMemo(() => {
    const bitmap = getStateBitmap(stateFilters);
    return bitmap || null;
  }, [stateFilters]);

  const onPathRegex$ = useDebouncedInput(
    useCallback((keyword: string) => {
      try {
        if (keyword) {
          new RegExp(keyword);
        }
        setOffset(0);
        setDebouncedPathRegex(keyword);
        setInvalidPathRegex(false);
      } catch {
        setInvalidPathRegex(true);
      }
    }, []),
    400
  );

  const fetchStates = useCallback(() => {
    setFetching(true);
    setError(null);
    const pathQuery = resolveItemPathRegex(debouncedPathRegex);
    fetchItemStates(siteId, pathQuery, stateBitmap ?? undefined, { limit, offset }).subscribe({
      next(states) {
        setItems(states);
        setTotal(states.total ?? states.length);
        setFetching(false);
      },
      error(err) {
        setError(err?.message || 'Failed to load items');
        setFetching(false);
      }
    });
  }, [debouncedPathRegex, limit, offset, siteId, stateBitmap]);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const filteredItems = useMemo(() => {
    if (!items) {
      return [];
    }
    return items.filter(
      (item) => itemMatchesName(item, nameFilter) && itemMatchesType(item, typeFilter)
    );
  }, [items, nameFilter, typeFilter]);

  const selectedList = useMemo(
    () => Object.entries(selectedPaths).filter(([, v]) => v).map(([path]) => path),
    [selectedPaths]
  );

  const activeItem = useMemo(
    () => filteredItems.find((item) => item.path === activeItemPath) ?? null,
    [activeItemPath, filteredItems]
  );

  const applyTargetPaths = useMemo(() => {
    if (selectedList.length) {
      return selectedList;
    }
    if (activeItem) {
      return [activeItem.path];
    }
    return [];
  }, [selectedList, activeItem]);

  const applyTargetItems = useMemo(
    () =>
      applyTargetPaths
        .map((path) => filteredItems.find((item) => item.path === path))
        .filter((item): item is SandboxItem => Boolean(item)),
    [applyTargetPaths, filteredItems]
  );

  const referenceItem = useMemo(() => {
    if (activeItem && applyTargetPaths.includes(activeItem.path)) {
      return activeItem;
    }
    return applyTargetItems[0] ?? null;
  }, [activeItem, applyTargetPaths, applyTargetItems]);

  const draftStateValue = useMemo(() => stateIntegerFromDraft(itemStateDraft), [itemStateDraft]);

  const itemStateDraftDirty = useMemo(
    () => applyTargetItems.some((item) => itemStateDraftHasChanges(item.state, itemStateDraft)),
    [applyTargetItems, itemStateDraft]
  );

  useEffect(() => {
    if (referenceItem) {
      setItemStateDraft(itemStateDraftFromState(referenceItem.state));
    } else {
      setItemStateDraft({});
    }
  }, [referenceItem?.path, referenceItem?.state]);

  const onApplyItemStateDraft = async () => {
    if (!applyTargetItems.length) {
      setError('Check items or select a row to apply state changes');
      return;
    }
    const updates = applyTargetItems
      .map((item) => ({
        item,
        masks: buildItemStateBitMasks(item.state, itemStateDraft)
      }))
      .filter(({ masks }) => masks.onMask !== 0 || masks.offMask !== 0);

    if (!updates.length) {
      return;
    }

    setApplying(true);
    setNotice(null);
    setError(null);
    try {
      for (const { item, masks } of updates) {
        await firstValueFrom(
          postUpdateItemStateBits(siteId, item.path, masks.onMask, masks.offMask)
        );
      }
      setNotice(`State updated for ${updates.length} item${updates.length === 1 ? '' : 's'}`);
      fetchStates();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setApplying(false);
    }
  };

  const onResetItemStateDraft = () => {
    if (referenceItem) {
      setItemStateDraft(itemStateDraftFromState(referenceItem.state));
    }
  };

  const itemStatesSubtitle = useMemo(() => {
    if (!applyTargetItems.length) {
      return 'Check items or select a row';
    }
    if (applyTargetItems.length === 1) {
      const item = applyTargetItems[0];
      const dirty = itemStateDraftDirty ? ' · unsaved changes' : '';
      return `${item.label} · current ${item.state}${dirty}`;
    }
    const dirty = itemStateDraftDirty ? ' · unsaved changes' : '';
    return `${applyTargetItems.length} checked items${dirty}`;
  }, [applyTargetItems, itemStateDraftDirty]);

  const toggleSelectAll = () => {
    if (selectedList.length === filteredItems.length) {
      setSelectedPaths({});
    } else {
      const next: Record<string, boolean> = {};
      filteredItems.forEach((item) => {
        next[item.path] = true;
      });
      setSelectedPaths(next);
    }
  };

  const onStateFilterChange = (key: StateFilterKey | 'any', checked: boolean) => {
    setOffset(0);
    if (key === 'any') {
      setStateFilters(createPresenceTable(INITIAL_STATE_FILTERS, false) as Record<StateFilterKey, boolean>);
    } else {
      setStateFilters({ ...stateFilters, [key]: checked });
    }
  };

  return (
    <TabShell>
      <TabToolbar>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} alignItems={{ md: 'flex-start' }} useFlexGap>
          <TextField
            size="small"
            label="Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            sx={{ minWidth: 140, flex: { md: '0 1 180px' } }}
          />
          <TextField
            size="small"
            label="Path (regex)"
            value={pathRegex}
            error={invalidPathRegex}
            helperText={invalidPathRegex ? 'Invalid regex' : 'Empty = all paths'}
            FormHelperTextProps={{ sx: { mx: 0, mt: 0.25 } }}
            onChange={(e) => {
              setPathRegex(e.target.value);
              onPathRegex$.next(e.target.value);
            }}
            sx={{ flex: 1, minWidth: 0 }}
          />
          <TextField
            size="small"
            label="Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            helperText="Client filter on page"
            FormHelperTextProps={{ sx: { mx: 0, mt: 0.25 } }}
            sx={{ minWidth: 140, flex: { md: '0 1 160px' } }}
          />
        </Stack>
        <Box>
          <SectionLabel>Match items in state</SectionLabel>
          <StateFilterChips stateFilters={stateFilters} onStateFilterChange={onStateFilterChange} />
        </Box>
      </TabToolbar>

      <TabAlertStack>
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {notice && (
          <Alert severity="success" onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        )}
      </TabAlertStack>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 1.5,
          overflow: 'hidden'
        }}
      >
        <TabContentPanel sx={{ flex: 1 }}>
          <PanelHeader
            title="Site items"
            subtitle={`${filteredItems.length} on page · ${total} matching`}
            action={
              <Button size="small" variant="outlined" disabled={fetching} onClick={() => fetchStates()}>
                Refresh
              </Button>
            }
          />
          <Box sx={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {fetching && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: (theme) => alpha(theme.palette.background.paper, 0.65),
                  zIndex: 2
                }}
              >
                <CircularProgress size={28} />
              </Box>
            )}
            <TableContainer sx={{ flex: 1, minHeight: 0 }}>
              <Table stickyHeader size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ ...compactCellSx, width: 42 }}>
                      <Checkbox
                        size="small"
                        indeterminate={selectedList.length > 0 && selectedList.length < filteredItems.length}
                        checked={filteredItems.length > 0 && selectedList.length === filteredItems.length}
                        onChange={toggleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ ...compactCellSx, width: '18%' }}>Name</TableCell>
                    <TableCell sx={{ ...compactCellSx, width: '42%' }}>Path</TableCell>
                    <TableCell sx={{ ...compactCellSx, width: '14%' }}>Type</TableCell>
                    <TableCell sx={{ ...compactCellSx, width: '26%' }}>State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow
                      key={item.path}
                      hover
                      selected={activeItemPath === item.path}
                      onClick={() => setActiveItemPath(item.path)}
                      sx={{ cursor: 'pointer', '& .MuiTableCell-root': compactCellSx }}
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          size="small"
                          checked={Boolean(selectedPaths[item.path])}
                          onChange={(_, checked) =>
                            setSelectedPaths({ ...selectedPaths, [item.path]: checked })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap title={item.label}>
                          {item.label}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={item.path}>
                          <Typography variant="body2" noWrap sx={monoSx}>
                            {displayItemPath(item.path)}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={item.contentTypeId || item.systemType || ''}>
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 0 }}>
                            <ItemTypeIcon item={item} />
                            <Typography variant="caption" noWrap sx={{ minWidth: 0 }}>
                              {shortContentTypeLabel(item)}
                            </Typography>
                          </Stack>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <ItemStatesCell item={item} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {!fetching && filteredItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ py: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No items match the current filters
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TablePagination
            component="div"
            count={total}
            page={Math.floor(offset / limit)}
            onPageChange={(_, page) => setOffset(page * limit)}
            rowsPerPage={limit}
            onRowsPerPageChange={(e) => {
              setLimit(parseInt(e.target.value, 10));
              setOffset(0);
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
            sx={{ flexShrink: 0, borderTop: 1, borderColor: 'divider' }}
          />
        </TabContentPanel>

        <Stack
          spacing={1.5}
          sx={{
            width: { xs: '100%', lg: 360 },
            flexShrink: 0,
            minHeight: 0,
            minWidth: { lg: 300 },
            maxWidth: { lg: 400 },
            maxHeight: { xs: 'min(48vh, 520px)', lg: '100%' },
            overflowY: 'auto',
            overflowX: 'hidden',
            pb: 0.5
          }}
        >
          <Paper
            elevation={0}
            sx={{
              ...surfacePaperSx,
              display: 'flex',
              flexDirection: 'column',
              minHeight: { lg: 280 },
              maxHeight: { lg: 'min(52vh, 520px)' }
            }}
          >
            <PanelHeader
              title={
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Typography variant="subtitle2" fontWeight={700} lineHeight={1.3}>
                    Item states
                  </Typography>
                  {applyTargetItems.length > 0 && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={draftStateValue}
                      sx={{ ...monoSx, fontWeight: 700 }}
                      title="Combined state integer from toggles below"
                    />
                  )}
                </Stack>
              }
              subtitle={itemStatesSubtitle}
            />
            {applyTargetItems.length > 0 ? (
              <>
                <Box sx={{ flex: 1, minHeight: 120, overflow: 'auto', px: 1.5, py: 0.5 }}>
                  <Stack spacing={0.25}>
                    {ITEM_STATE_TOGGLE_CONTROLS.map((control) => (
                      <FormControlLabel
                        key={control.id}
                        sx={{ ml: 0, mr: 0, py: 0.25, alignItems: 'center' }}
                        control={
                          <Switch
                            size="small"
                            checked={Boolean(itemStateDraft[control.id])}
                            disabled={applying}
                            onChange={(_, checked) =>
                              setItemStateDraft({ ...itemStateDraft, [control.id]: checked })
                            }
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                            {formatStateBitLabel(control.label, control.mask)}
                          </Typography>
                        }
                      />
                    ))}
                  </Stack>
                </Box>
                <Box
                  sx={{
                    flexShrink: 0,
                    px: 1.5,
                    py: 1.25,
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.5)
                  }}
                >
                  <Stack spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      disabled={applying || !itemStateDraftDirty}
                      onClick={onResetItemStateDraft}
                    >
                      Reset
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      disabled={applying || !itemStateDraftDirty}
                      onClick={onApplyItemStateDraft}
                    >
                      Apply
                      {applyTargetItems.length > 1 ? ` (${applyTargetItems.length})` : ''}
                    </Button>
                  </Stack>
                </Box>
              </>
            ) : (
              <Box sx={{ p: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Check items or click a row, adjust flags, then Apply
                </Typography>
              </Box>
            )}
          </Paper>
        </Stack>
      </Box>
    </TabShell>
  );
}

export default SiteItemsTab;
