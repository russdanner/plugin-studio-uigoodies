/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useMemo } from 'react';
import { Chip, Stack, Tooltip } from '@mui/material';
import { monoSx } from './devContentOpsUi';

export type FileChangeCounts = Partial<Record<string, number>>;

export function changeLabel(changeType: string): string {
  switch (changeType) {
    case 'ADD':
      return 'created';
    case 'MODIFY':
      return 'updated';
    case 'DELETE':
      return 'deleted';
    case 'COPY':
      return 'copied';
    case 'RENAME':
      return 'renamed';
    default:
      return changeType.toLowerCase();
  }
}

export function changeShortLabel(changeType: string): string {
  switch (changeType) {
    case 'ADD':
      return '+';
    case 'MODIFY':
      return '~';
    case 'DELETE':
      return '−';
    case 'COPY':
      return 'C';
    case 'RENAME':
      return 'R';
    default:
      return changeType.charAt(0);
  }
}

export function changeColor(changeType: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  switch (changeType) {
    case 'ADD':
      return 'success';
    case 'DELETE':
      return 'error';
    case 'MODIFY':
      return 'warning';
    case 'COPY':
    case 'RENAME':
      return 'info';
    default:
      return 'default';
  }
}

const CHANGE_TYPE_ORDER = ['ADD', 'MODIFY', 'DELETE', 'COPY', 'RENAME'];

export function countFileChanges(files: { changeType: string }[]): FileChangeCounts {
  const counts: FileChangeCounts = {};
  for (const file of files) {
    counts[file.changeType] = (counts[file.changeType] ?? 0) + 1;
  }
  return counts;
}

export function orderedChangeEntries(counts: FileChangeCounts): Array<[string, number]> {
  const seen = new Set<string>();
  const entries: Array<[string, number]> = [];
  for (const type of CHANGE_TYPE_ORDER) {
    const n = counts[type];
    if (n && n > 0) {
      entries.push([type, n]);
      seen.add(type);
    }
  }
  for (const [type, n] of Object.entries(counts)) {
    if (!seen.has(type) && n && n > 0) {
      entries.push([type, n]);
    }
  }
  return entries;
}

export function isMixedChangeSet(counts: FileChangeCounts): boolean {
  return orderedChangeEntries(counts).length > 1;
}

export function FileChangeTypeChip({
  changeType,
  compact
}: {
  changeType: string;
  compact?: boolean;
}) {
  const label = compact ? changeShortLabel(changeType) : changeLabel(changeType);
  const chip = (
    <Chip
      size="small"
      label={label}
      color={changeColor(changeType)}
      sx={{
        height: 20,
        fontSize: 10,
        flexShrink: 0,
        minWidth: compact ? 22 : undefined,
        ...(compact ? monoSx : {})
      }}
    />
  );
  if (compact) {
    return <Tooltip title={changeLabel(changeType)}>{chip}</Tooltip>;
  }
  return chip;
}

export function FileChangeSummary({ counts }: { counts: FileChangeCounts }) {
  const entries = useMemo(() => orderedChangeEntries(counts), [counts]);
  if (entries.length === 0) {
    return null;
  }

  if (entries.length === 1) {
    const [type, n] = entries[0];
    return (
      <Chip
        size="small"
        label={`${n} ${changeLabel(type)}`}
        color={changeColor(type)}
        sx={{ height: 20, fontWeight: 600 }}
      />
    );
  }

  return (
    <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap" useFlexGap>
      <Chip size="small" variant="outlined" label="Mixed" sx={{ height: 20, fontWeight: 600 }} />
      {entries.map(([type, n]) => (
        <Tooltip key={type} title={`${n} ${changeLabel(type)}`}>
          <Chip
            size="small"
            label={`${changeShortLabel(type)}${n}`}
            color={changeColor(type)}
            sx={{ height: 20, minWidth: 28, fontWeight: 700, ...monoSx }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}
