/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import { Box, alpha, useTheme } from '@mui/material';
import type { GitCommit } from './devContentOpsApi';

type MarkerProps = {
  commit: GitCommit;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export function CommitGraphMarker({ commit, isSelected, isFirst, isLast }: MarkerProps) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const lineColor = alpha(theme.palette.text.primary, 0.12);
  const processedColor = theme.palette.success.main;
  const unprocessedColor = theme.palette.warning.main;
  const nodeColor = commit.processed ? processedColor : unprocessedColor;
  const radius = isSelected ? 6 : 4.5;

  return (
    <Box
      sx={{
        width: 32,
        minWidth: 32,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        py: 0.75
      }}
    >
      {!isFirst && <Box sx={{ width: 2, flex: 1, minHeight: 8, bgcolor: lineColor, borderRadius: 1 }} />}
      <Box
        sx={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          bgcolor: isSelected ? primary : nodeColor,
          border: isSelected ? `2px solid ${alpha(primary, 0.35)}` : `2px solid ${alpha(nodeColor, 0.35)}`,
          boxShadow: isSelected ? `0 0 0 3px ${alpha(primary, 0.15)}` : 'none',
          boxSizing: 'border-box',
          flexShrink: 0,
          transition: 'box-shadow 0.15s ease, transform 0.15s ease',
          transform: isSelected ? 'scale(1.05)' : 'none'
        }}
      />
      {!isLast && <Box sx={{ width: 2, flex: 1, minHeight: 8, bgcolor: lineColor, borderRadius: 1 }} />}
    </Box>
  );
}
