/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import { translationIndicatorSx } from '../config/translationIndicatorStyles';

export function TranslationSourceBadge() {
  return <Box component="span" sx={translationIndicatorSx.source} title="Source translation (authoritative)">Source</Box>;
}

export function TranslationOutdatedBadge() {
  return (
    <Box component="span" sx={translationIndicatorSx.outdated} title="Outdated translation">
      🚩 Outdated
    </Box>
  );
}

export function TranslationCurrentBadge() {
  return (
    <Box component="span" sx={translationIndicatorSx.current} title="This is the item you have open">
      Current
    </Box>
  );
}
