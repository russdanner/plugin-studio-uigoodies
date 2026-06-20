/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import { Box, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import FitScreenRoundedIcon from '@mui/icons-material/FitScreenRounded';
import {
  CanvasViewTransform,
  DEFAULT_CANVAS_VIEW,
  MIN_CANVAS_ZOOM,
  MAX_CANVAS_ZOOM,
  clampCanvasZoom
} from './imageLayout';

type Props = {
  view: CanvasViewTransform;
  onViewChange: (view: CanvasViewTransform) => void;
  compact?: boolean;
};

export function ImageCanvasZoomBar({ view, onViewChange, compact }: Props) {
  const setZoom = (zoom: number) => {
    onViewChange({ ...view, zoom: clampCanvasZoom(zoom) });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      flexWrap="wrap"
      useFlexGap
      sx={{ py: compact ? 0 : 0.5 }}
    >
      <Tooltip title="Zoom out">
        <IconButton size="small" onClick={() => setZoom(view.zoom / 1.2)}>
          <ZoomOutRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Box sx={{ width: compact ? 100 : 140, px: 0.5 }}>
        <Slider
          size="small"
          min={MIN_CANVAS_ZOOM}
          max={MAX_CANVAS_ZOOM}
          step={0.05}
          value={view.zoom}
          onChange={(_, v) => setZoom(v as number)}
        />
      </Box>
      <Tooltip title="Zoom in">
        <IconButton size="small" onClick={() => setZoom(view.zoom * 1.2)}>
          <ZoomInRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 40 }}>
        {Math.round(view.zoom * 100)}%
      </Typography>
      <Tooltip title="Fit to view">
        <IconButton size="small" onClick={() => onViewChange(DEFAULT_CANVAS_VIEW)}>
          <FitScreenRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {!compact && (
        <Typography variant="caption" color="text.secondary">
          Scroll to zoom · Space + drag to pan
        </Typography>
      )}
    </Stack>
  );
}

export default ImageCanvasZoomBar;
