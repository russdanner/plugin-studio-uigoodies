/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import { Box, Tab, Tabs, Typography, useTheme, alpha, type Theme } from '@mui/material';
import type { DiffLine, FileDiff } from './devContentOpsApi';
import { apiText } from './devContentOpsApi';

type Props = {
  title?: string;
  fileDiffs: FileDiff[];
  activePath?: string;
  onActivePathChange?: (path: string) => void;
  fallbackText?: string;
};

function lineColor(type: DiffLine['type'], theme: Theme) {
  switch (type) {
    case 'add':
      return { bg: alpha(theme.palette.success.main, 0.18), color: theme.palette.success.dark };
    case 'remove':
      return { bg: alpha(theme.palette.error.main, 0.15), color: theme.palette.error.dark };
    case 'meta':
      return { bg: alpha(theme.palette.info.main, 0.08), color: theme.palette.text.secondary };
    default:
      return { bg: 'transparent', color: theme.palette.text.primary };
  }
}

export function DiffViewer({ title, fileDiffs, activePath, onActivePathChange, fallbackText }: Props) {
  const theme = useTheme();
  const paths = fileDiffs.map((f) => f.path);
  const selectedPath = activePath && paths.includes(activePath) ? activePath : paths[0];
  const active = fileDiffs.find((f) => f.path === selectedPath);

  if (!fileDiffs.length && fallbackText) {
    return (
      <PaperFallback>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 12 }}>
          {fallbackText ? apiText(fallbackText) : ''}
        </pre>
      </PaperFallback>
    );
  }

  if (!active) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      {title && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {title ? apiText(title) : null}
        </Typography>
      )}
      {paths.length > 1 && (
        <Tabs
          value={selectedPath}
          onChange={(_, v) => onActivePathChange?.(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 36, mb: 1, borderBottom: 1, borderColor: 'divider' }}
        >
          {fileDiffs.map((f) => (
            <Tab key={f.path} value={f.path} label={f.path.split('/').pop() || f.path} sx={{ minHeight: 36, py: 0.5 }} />
          ))}
        </Tabs>
      )}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 12,
          lineHeight: 1.45,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: alpha(theme.palette.background.default, 0.6)
        }}
      >
        {active.lines?.map((line, idx) => {
          const colors = lineColor(line.type, theme);
          return (
            <Box
              key={idx}
              sx={{
                px: 1,
                py: 0.125,
                bgcolor: colors.bg,
                color: colors.color,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
              {apiText(line.content)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function PaperFallback({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 1,
        maxHeight: 480,
        overflow: 'auto',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1
      }}
    >
      {children}
    </Box>
  );
}
