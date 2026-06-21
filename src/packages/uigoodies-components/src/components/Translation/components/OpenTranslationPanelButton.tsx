/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TranslateToLocalePicker from './TranslateToLocalePicker';

/**
 * Tools panel: full-width locale picker + copy actions (no dialog).
 */
export function OpenTranslationPanelButton(props: { title?: string }) {
  const { title = 'Add translation' } = props;
  return (
    <Box sx={{ width: '100%', px: 1.5, py: 1.5, boxSizing: 'border-box' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <TranslateToLocalePicker variant="panel" />
    </Box>
  );
}

export default OpenTranslationPanelButton;
