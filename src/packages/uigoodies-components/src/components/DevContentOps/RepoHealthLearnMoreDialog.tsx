/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  alpha
} from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
  REPO_HEALTH_CONCERN_LEVELS,
  REPO_HEALTH_CONFIG_NOTE,
  REPO_HEALTH_INTRO,
  REPO_HEALTH_METRIC_GROUPS,
  REPO_HEALTH_PROFILE_LABEL,
  REPO_HEALTH_SCORING_NOTE,
  type RepoHealthConcernLevelId
} from './repoHealthLegend';

function concernChipColor(id: RepoHealthConcernLevelId): 'success' | 'info' | 'warning' | 'error' {
  switch (id) {
    case 'critical':
      return 'error';
    case 'elevated':
      return 'warning';
    case 'watch':
      return 'info';
    default:
      return 'success';
  }
}

function concernChipIcon(id: RepoHealthConcernLevelId) {
  switch (id) {
    case 'critical':
      return <ErrorOutlineRoundedIcon />;
    case 'elevated':
      return <WarningAmberRoundedIcon />;
    case 'watch':
      return <InfoOutlinedIcon />;
    default:
      return <CheckCircleOutlineRoundedIcon />;
  }
}

export type RepoHealthLearnMoreDialogProps = {
  open: boolean;
  onClose: () => void;
  profileLabel?: string;
};

export function RepoHealthLearnMoreDialog({ open, onClose, profileLabel }: RepoHealthLearnMoreDialogProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | false>('overall');
  const thresholdLabel = profileLabel?.trim() || REPO_HEALTH_PROFILE_LABEL;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle sx={{ pr: 6 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" component="span" fontWeight={700}>
            Repository health guide
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Concern levels, metrics, and content thresholds
          </Typography>
        </Stack>
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
          size="small"
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <Stack spacing={2.5}>
          <Alert severity="info" icon={<InfoOutlinedIcon />}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Threshold profile: {thresholdLabel}
            </Typography>
            <Typography variant="body2">{REPO_HEALTH_INTRO}</Typography>
          </Alert>

          <Box>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Concern levels
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {REPO_HEALTH_SCORING_NOTE}
            </Typography>
            <Stack spacing={1.25}>
              {REPO_HEALTH_CONCERN_LEVELS.map((level) => (
                <Box
                  key={level.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '140px 1fr' },
                    gap: 1,
                    alignItems: 'start',
                    p: 1.25,
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: (theme) => alpha(theme.palette[concernChipColor(level.id)].main, 0.04)
                  }}
                >
                  <Stack spacing={0.5}>
                    <Chip
                      size="small"
                      icon={concernChipIcon(level.id)}
                      label={level.label}
                      color={concernChipColor(level.id)}
                      variant={level.id === 'ok' ? 'outlined' : 'filled'}
                      sx={{ fontWeight: 700, width: 'fit-content' }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ pl: 0.25 }}>
                      Score {level.scoreRange}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">{level.summary}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Metrics &amp; thresholds
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Watch = first alert level. Critical = maximum concern (score 30). Values between warn and critical scale
              proportionally.
            </Typography>
            {REPO_HEALTH_METRIC_GROUPS.map((group) => (
              <Accordion
                key={group.id}
                expanded={expandedGroup === group.id}
                onChange={(_, isExpanded) => setExpandedGroup(isExpanded ? group.id : false)}
                disableGutters
                elevation={0}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  '&:not(:last-child)': { borderBottom: 0 },
                  '&:before': { display: 'none' },
                  bgcolor: 'transparent'
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                  <Stack spacing={0.25} sx={{ minWidth: 0, pr: 1 }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {group.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {group.summary}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, px: 0 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, width: '28%' }}>Metric</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>What it measures</TableCell>
                        <TableCell sx={{ fontWeight: 700, width: 88 }} align="right">
                          Watch
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, width: 88 }} align="right">
                          Critical
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.metrics.map((metric) => (
                        <TableRow key={metric.id} hover>
                          <TableCell sx={{ verticalAlign: 'top', fontWeight: 600 }}>{metric.label}</TableCell>
                          <TableCell sx={{ verticalAlign: 'top' }}>
                            <Typography variant="body2" color="text.secondary">
                              {metric.description}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" color="info.main" fontWeight={600}>
                              {metric.warn}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" color="error.main" fontWeight={600}>
                              {metric.critical}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Alert severity="warning" icon={<WarningAmberRoundedIcon />} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Repository configuration
            </Typography>
            <Typography variant="body2">{REPO_HEALTH_CONFIG_NOTE}</Typography>
          </Alert>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
