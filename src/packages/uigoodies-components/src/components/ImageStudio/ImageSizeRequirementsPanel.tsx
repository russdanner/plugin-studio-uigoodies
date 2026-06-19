/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import {
  formatDimensionSpec,
  imageMatchesRequirement,
  ImageRequirement
} from './imageStudioUtils';
import { scanImageSizeRequirements } from './imageSizeRequirements';

type Props = {
  currentWidth?: number;
  currentHeight?: number;
};

export function ImageSizeRequirementsPanel({ currentWidth, currentHeight }: Props) {
  const siteId = useActiveSiteId();
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<ImageRequirement[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      return;
    }
    setLoading(true);
    setError(null);
    scanImageSizeRequirements(siteId)
      .then(setRequirements)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [siteId]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) {
      return requirements;
    }
    return requirements.filter(
      (req) =>
        req.contentTypeLabel.toLowerCase().includes(q) ||
        req.contentType.toLowerCase().includes(q) ||
        req.fieldId.toLowerCase().includes(q) ||
        req.fieldTitle.toLowerCase().includes(q)
    );
  }, [requirements, filter]);

  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>
        Image size requirements
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Scans content type form definitions for image-picker width and height constraints.
      </Typography>

      {currentWidth && currentHeight && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            Current image: <strong>{currentWidth} × {currentHeight}px</strong>
          </Typography>
        </Box>
      )}

      <TextField
        size="small"
        fullWidth
        placeholder="Filter by content type or field…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          )
        }}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2">{error}</Typography>
      )}

      {!loading && !error && (
        <Box sx={{ maxHeight: 360, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Content type</TableCell>
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
                  <TableRow key={`${req.contentType}-${req.fieldId}`} hover>
                    <TableCell>
                      <Typography variant="body2">{req.contentTypeLabel}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.contentType}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{req.fieldTitle}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.fieldId}</Typography>
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
                  <TableCell colSpan={currentWidth ? 4 : 3}>
                    <Typography variant="body2" color="text.secondary">
                      No image-picker fields found.
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
