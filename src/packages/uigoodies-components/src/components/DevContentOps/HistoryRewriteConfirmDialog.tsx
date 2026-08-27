/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export const HISTORY_REWRITE_ACK_LABEL =
  'I understand that git history will be rewritten from this point, commit IDs will change, and this will impact other workflows (clones, remotes, patches, publish compare, and Studio sync).';

export const HISTORY_REWRITE_IMPACTS = [
  'Commit IDs change for rewritten history; old SHAs become invalid.',
  'Other clones, remotes, and open work based on previous SHAs will diverge.',
  'Patches, publish compare, and Studio processed-commit sync are affected until re-ingest completes.'
];

export type HistoryRewriteCommitRef = {
  id: string;
  shortId?: string;
  subject?: string;
};

type Props = {
  open: boolean;
  title: string;
  message: string;
  commit?: HistoryRewriteCommitRef;
  confirmLabel?: string;
  ackLabel?: string;
  impacts?: string[];
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  codeBlockSx?: object;
  monoSx?: object;
};

/**
 * Confirm dialog for operations that rewrite or discard git history.
 * Requires an explicit checkbox acknowledgment before Confirm is enabled.
 */
export function HistoryRewriteConfirmDialog({
  open,
  title,
  message,
  commit,
  confirmLabel = 'Rewrite history',
  ackLabel = HISTORY_REWRITE_ACK_LABEL,
  impacts = HISTORY_REWRITE_IMPACTS,
  busy = false,
  onCancel,
  onConfirm,
  codeBlockSx,
  monoSx
}: Props) {
  const [acked, setAcked] = useState(false);

  useEffect(() => {
    if (open) {
      setAcked(false);
    }
  }, [open, title, message]);

  return (
    <Dialog open={open} onClose={() => !busy && onCancel()} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <Alert severity="error" icon={<WarningAmberRoundedIcon />}>
            {message}
          </Alert>
          {impacts.length > 0 && (
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.75 }}>
                Impact on other workflows
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
                {impacts.map((item) => (
                  <Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          {commit && (
            <Paper variant="outlined" sx={codeBlockSx}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 0.75, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}
              >
                Commit
              </Typography>
              <Typography variant="body2" sx={{ ...monoSx, wordBreak: 'break-all' }}>
                {(commit.shortId || commit.id.slice(0, 8)) + ' · ' + commit.id}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                {commit.subject || '(no commit message)'}
              </Typography>
            </Paper>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={acked}
                onChange={(e) => setAcked(e.target.checked)}
                disabled={busy}
                color="error"
              />
            }
            label={ackLabel}
            sx={{ alignItems: 'flex-start', mr: 0, '& .MuiFormControlLabel-label': { typography: 'body2' } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button color="error" variant="contained" disabled={!acked || busy} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HistoryRewriteConfirmDialog;
