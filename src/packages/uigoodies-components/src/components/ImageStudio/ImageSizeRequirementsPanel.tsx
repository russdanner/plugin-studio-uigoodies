/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useContentTypes from '@craftercms/studio-ui/hooks/useContentTypes';
import { fetchContentTypes } from '@craftercms/studio-ui/state/actions/preview';
import {
  formatDimensionSpec,
  hasApplicableConstraints,
  imageMatchesRequirement,
  ImageRequirement
} from './imageStudioUtils';
import {
  ContentTypeFormOption,
  contentTypeFormOptionsFromCatalog,
  parseImageRequirementsFromContentType
} from './imageSizeRequirements';

type Props = {
  currentWidth?: number;
  currentHeight?: number;
  active?: boolean;
  appliedFieldId?: string | null;
  onApplyConstraints?: (req: ImageRequirement) => void;
};

export function ImageSizeRequirementsPanel({
  currentWidth,
  currentHeight,
  active = true,
  appliedFieldId,
  onApplyConstraints
}: Props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const contentTypesById = useContentTypes();
  const contentTypesFetching = useSelector(
    (state: { contentTypes?: { isFetching?: boolean | null } }) => state.contentTypes?.isFetching
  );
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [selectedType, setSelectedType] = useState<ContentTypeFormOption | null>(null);
  const [requirements, setRequirements] = useState<ImageRequirement[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedFieldId(null);
  }, [selectedType?.formPath]);

  useEffect(() => {
    if (!siteId || !active) {
      return;
    }
    if (!contentTypesById && contentTypesFetching === null) {
      dispatch(fetchContentTypes());
    }
  }, [siteId, active, contentTypesById, contentTypesFetching, dispatch]);

  const contentTypes = useMemo<ContentTypeFormOption[]>(() => {
    if (!contentTypesById) {
      return [];
    }
    return contentTypeFormOptionsFromCatalog(Object.values(contentTypesById));
  }, [contentTypesById]);

  useEffect(() => {
    setLoadingTypes(Boolean(active && siteId && !contentTypesById && contentTypesFetching));
  }, [active, siteId, contentTypesById, contentTypesFetching]);

  useEffect(() => {
    if (!selectedType || !contentTypesById) {
      setRequirements([]);
      return;
    }
    const contentType = contentTypesById[selectedType.contentType];
    if (!contentType) {
      setRequirements([]);
      return;
    }
    setError(null);
    setRequirements(parseImageRequirementsFromContentType(contentType));
  }, [selectedType, contentTypesById]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) {
      return requirements;
    }
    return requirements.filter(
      (req) =>
        req.fieldId.toLowerCase().includes(q) ||
        req.fieldTitle.toLowerCase().includes(q) ||
        formatDimensionSpec(req).toLowerCase().includes(q)
    );
  }, [requirements, filter]);

  const selectedRequirement = requirements.find((r) => r.fieldId === selectedFieldId) ?? null;
  const applyEnabled = Boolean(selectedRequirement && hasApplicableConstraints(selectedRequirement));

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Image size requirements
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Choose a content type to see image-picker width and height constraints for its fields.
      </Typography>

      {currentWidth && currentHeight && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            Current image: <strong>{currentWidth} × {currentHeight}px</strong>
          </Typography>
        </Box>
      )}

      <Autocomplete
        size="small"
        options={contentTypes}
        value={selectedType}
        onChange={(_, value) => setSelectedType(value)}
        getOptionLabel={(opt) => opt.label}
        isOptionEqualToValue={(a, b) => a.formPath === b.formPath}
        loading={loadingTypes}
        disabled={loadingTypes || !contentTypes.length}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Content type"
            placeholder="Search content types…"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingTypes ? <CircularProgress color="inherit" size={18} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        sx={{ mb: 2 }}
      />

      {selectedType && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          {selectedType.contentType}
        </Typography>
      )}

      {selectedType && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
          <TextField
            size="small"
            fullWidth
            placeholder="Filter image fields…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
          {onApplyConstraints && (
            <Button
              size="small"
              variant="contained"
              startIcon={<CheckRoundedIcon />}
              disabled={!applyEnabled}
              onClick={() => selectedRequirement && onApplyConstraints(selectedRequirement)}
            >
              Apply constraints
            </Button>
          )}
        </Stack>
      )}

      {selectedType && selectedRequirement && !hasApplicableConstraints(selectedRequirement) && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Selected field has no width or height constraints to apply.
        </Typography>
      )}

      {selectedType && !selectedRequirement && requirements.length > 0 && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Click a field row, then apply constraints to crop, resize, and output size.
        </Typography>
      )}

      {error && (
        <Typography color="error" variant="body2">{error}</Typography>
      )}

      {!loadingTypes && !error && !contentTypes.length && (
        <Typography variant="body2" color="text.secondary">
          No content types found in this site.
        </Typography>
      )}

      {!selectedType && !loadingTypes && contentTypes.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
          Select a content type above to load its image field requirements.
        </Typography>
      )}

      {selectedType && !error && (
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Requirements</TableCell>
                {currentWidth && currentHeight ? <TableCell>Match</TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((req) => {
                const matches =
                  currentWidth && currentHeight
                    ? imageMatchesRequirement(currentWidth, currentHeight, req)
                    : null;
                return (
                  <TableRow
                    key={req.fieldId}
                    hover
                    selected={selectedFieldId === req.fieldId}
                    onClick={() => setSelectedFieldId(req.fieldId)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography variant="body2">{req.fieldTitle}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.fieldId}</Typography>
                      {appliedFieldId === req.fieldId && (
                        <Chip size="small" label="Applied" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDimensionSpec(req)}</Typography>
                    </TableCell>
                    {currentWidth && currentHeight ? (
                      <TableCell>
                        <Chip
                          size="small"
                          label={matches ? 'OK' : 'Mismatch'}
                          color={matches ? 'success' : 'warning'}
                          variant={matches ? 'filled' : 'outlined'}
                        />
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
              {!filtered.length && (
                <TableRow>
                  <TableCell colSpan={currentWidth && currentHeight ? 3 : 2}>
                    <Typography variant="body2" color="text.secondary">
                      No image-picker fields on this content type.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  );
}

export default ImageSizeRequirementsPanel;
