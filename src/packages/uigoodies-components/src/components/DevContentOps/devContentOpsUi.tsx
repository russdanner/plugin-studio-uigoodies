/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import { Box, Chip, Divider, Paper, Stack, Typography, alpha, type SxProps, type Theme } from '@mui/material';

export const monoSx: SxProps<Theme> = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.8125rem'
};

export const codeBlockSx: SxProps<Theme> = {
  ...monoSx,
  p: 1.25,
  borderRadius: 1.5,
  border: 1,
  borderColor: 'divider',
  bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03),
  wordBreak: 'break-all'
};

export const surfacePaperSx: SxProps<Theme> = {
  borderRadius: 2,
  border: 1,
  borderColor: 'divider',
  bgcolor: 'background.paper',
  overflow: 'hidden',
  boxShadow: (theme) => `0 1px 2px ${alpha(theme.palette.common.black, 0.04)}`
};

export const panelHeaderSx: SxProps<Theme> = {
  px: 2,
  py: 1.25,
  borderBottom: 1,
  borderColor: 'divider',
  bgcolor: (theme) => alpha(theme.palette.text.primary, 0.025),
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 1.5,
  flexWrap: 'wrap',
  minHeight: 48,
  flexShrink: 0
};

export const toolbarPaperSx: SxProps<Theme> = {
  ...surfacePaperSx,
  flexShrink: 0,
  overflow: 'hidden'
};

/** Standard tab root — flex column, no overflow bleed. */
export function TabShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflow: 'hidden'
      }}
    >
      {children}
    </Box>
  );
}

export function TabToolbar({ children }: { children: React.ReactNode }) {
  return (
    <Paper variant="outlined" sx={{ ...toolbarPaperSx, py: 1.25, px: 1.5 }}>
      <Stack spacing={1.25}>{children}</Stack>
    </Paper>
  );
}

export function TabAlertStack({ children }: { children: React.ReactNode }) {
  return (
    <Stack spacing={1} sx={{ flexShrink: 0 }}>
      {children}
    </Stack>
  );
}

export function TabContentPanel({
  children,
  sx
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Paper
      variant="outlined"
      sx={[
        {
          ...surfacePaperSx,
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        },
        ...(sx ? [sx] : [])
      ]}
    >
      {children}
    </Paper>
  );
}

export function ToolbarRow({
  children,
  justify = 'space-between'
}: {
  children: React.ReactNode;
  justify?: 'flex-start' | 'space-between' | 'flex-end';
}) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      flexWrap="wrap"
      useFlexGap
      alignItems="center"
      justifyContent={justify}
      sx={{ minWidth: 0 }}
    >
      {children}
    </Stack>
  );
}

export function ToolbarDivider() {
  return (
    <Divider
      flexItem
      orientation="vertical"
      sx={{ alignSelf: 'stretch', my: 0.5, borderColor: 'divider' }}
    />
  );
}

export function OperatingSiteChip({ siteId, siteName }: { siteId: string; siteName?: string }) {
  return (
    <Chip
      size="small"
      color="primary"
      variant="outlined"
      label={siteName ? `${siteName} (${siteId})` : siteId}
      sx={{ fontWeight: 600, maxWidth: 320 }}
    />
  );
}

export function PanelHeader({
  title,
  subtitle,
  action
}: {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <Box sx={panelHeaderSx}>
      <Box sx={{ minWidth: 0, flex: '1 1 160px' }}>
        <Typography variant="subtitle2" fontWeight={700} lineHeight={1.3}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action ? (
        <Box
          sx={{
            minWidth: 0,
            flex: '0 1 auto',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'flex-end'
          }}
        >
          {action}
        </Box>
      ) : null}
    </Box>
  );
}

export const actionStackSx: SxProps<Theme> = {
  alignItems: 'stretch',
  minWidth: 0,
  '& > .MuiButton-root': {
    justifyContent: 'flex-start'
  },
  '& > .MuiFormControl-root': {
    width: '100%',
    minWidth: 0
  }
};

export function ActionButtonStack({
  children,
  spacing = 1,
  align = 'stretch',
  sx
}: {
  children: React.ReactNode;
  spacing?: number;
  align?: 'stretch' | 'flex-start' | 'flex-end';
  sx?: SxProps<Theme>;
}) {
  return (
    <Stack direction="column" spacing={spacing} sx={[actionStackSx, { alignItems: align }, ...(sx ? [sx] : [])]}>
      {children}
    </Stack>
  );
}

export function ToolbarGroup({
  label,
  children,
  inline = true
}: {
  label: string;
  children: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <Stack spacing={inline ? 0.5 : 0.75} sx={{ minWidth: 0, flex: inline ? '0 1 auto' : '1 1 auto' }}>
      <Typography
        variant="caption"
        fontWeight={700}
        color="text.secondary"
        sx={{ letterSpacing: 0.8, textTransform: 'uppercase', fontSize: '0.65rem' }}
      >
        {label}
      </Typography>
      {inline ? (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center" sx={{ minWidth: 0 }}>
          {children}
        </Stack>
      ) : (
        <ActionButtonStack>{children}</ActionButtonStack>
      )}
    </Stack>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      fontWeight={700}
      color="text.secondary"
      sx={{ letterSpacing: 0.6, textTransform: 'uppercase', fontSize: '0.65rem' }}
    >
      {children}
    </Typography>
  );
}

export function ProcessedStatusChip({
  processed,
  size = 'small'
}: {
  processed: boolean;
  size?: 'small' | 'medium';
}) {
  if (processed) {
    return (
      <Chip
        size={size}
        label="Processed"
        color="success"
        variant="outlined"
        sx={{ height: 20, fontWeight: 600, flexShrink: 0 }}
      />
    );
  }
  return (
    <Chip
      size={size}
      label="Unprocessed"
      color="warning"
      sx={{ height: 20, fontWeight: 600, flexShrink: 0 }}
    />
  );
}

export function RepoStatusBar({ status }: { status: { headCommitId?: string; branchHeadCommitId?: string; lastProcessedCommitId?: string; unprocessedCount?: number } }) {
  const head = (status.headCommitId || status.branchHeadCommitId)?.slice(0, 8) ?? '—';
  const processed = status.lastProcessedCommitId?.slice(0, 8) || '—';
  const unprocessed = status.unprocessedCount ?? 0;

  return (
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}>
      <Chip size="small" label={`HEAD ${head}`} sx={{ fontWeight: 600, ...monoSx }} />
      <Chip size="small" variant="outlined" label={`Processed ${processed}`} sx={{ ...monoSx }} />
      <Chip
        size="small"
        color={unprocessed ? 'warning' : 'success'}
        variant={unprocessed ? 'filled' : 'outlined'}
        label={unprocessed ? `${unprocessed} unprocessed` : 'All processed'}
        sx={{ fontWeight: 600 }}
      />
    </Stack>
  );
}

export function CommitSummaryCard({
  commit,
  processed
}: {
  commit: { id: string; shortId: string; subject: string; author?: string; date: string; body?: string };
  processed?: boolean;
}) {
  return (
    <Box sx={{ ...codeBlockSx, p: 1.5 }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
        <Chip label={commit.shortId} size="small" color="primary" variant="outlined" sx={{ ...monoSx, fontWeight: 700 }} />
        <ProcessedStatusChip processed={processed === true} />
      </Stack>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.75 }}>
        {commit.subject}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
        {commit.author ?? 'Unknown author'} · {new Date(commit.date).toLocaleString()}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ ...monoSx, fontSize: '0.7rem', wordBreak: 'break-all' }}>
        {commit.id}
      </Typography>
      {commit.body && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
          {commit.body}
        </Typography>
      )}
    </Box>
  );
}

type DangerZoneProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function DangerZone({ children, title, description, action }: DangerZoneProps) {
  const structured = Boolean(title || description || action);

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 1.5,
        border: 1,
        borderColor: (theme) => alpha(theme.palette.error.main, 0.35),
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.04)
      }}
    >
      <SectionLabel>Danger zone</SectionLabel>
      {structured ? (
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {title ? (
            <Typography variant="subtitle2" fontWeight={700}>
              {title}
            </Typography>
          ) : null}
          {description ? (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          ) : null}
          {action ? <Box>{action}</Box> : null}
        </Stack>
      ) : (
        <ActionButtonStack spacing={1} sx={{ mt: 1 }}>
          {children}
        </ActionButtonStack>
      )}
    </Box>
  );
}
