/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useCurrentPreviewItem from '@craftercms/studio-ui/hooks/useCurrentPreviewItem';

import SourceItemTable from './components/SourceItemTable';
import TranslateToLocalePicker from './components/TranslateToLocalePicker';
import StudioAPI, { PreviewItemType } from './api/studio';
import { pathLastSegment } from './utils/localePathUtils';

/** Props passed via `showWidgetDialog` `extraProps` when opening from a host that still uses the dialog. */
export type TranslationDialogFormProps = {
  translationFormPath?: string;
  translationFormName?: string;
  translationFormContentType?: string;
  translationFormSiteId?: string;
  translationAuthoringBase?: string;
};

export default function TranslationDialog(props: TranslationDialogFormProps = {}) {
  const currentPreviewItem = useCurrentPreviewItem();
  const previewDerived = currentPreviewItem ? StudioAPI.getPreviewItem(currentPreviewItem) : null;

  const trimmedPath = typeof props.translationFormPath === 'string' ? props.translationFormPath.trim() : '';
  const sourceItemFromForm: PreviewItemType | null =
    trimmedPath !== ''
      ? {
          name:
            (typeof props.translationFormName === 'string' && props.translationFormName.trim()) ||
            pathLastSegment(trimmedPath),
          path: trimmedPath,
          contentType:
            (typeof props.translationFormContentType === 'string' && props.translationFormContentType) || ''
        }
      : null;

  const sourceItem = sourceItemFromForm ?? previewDerived;
  const sourceItemFromFormFlag = Boolean(sourceItemFromForm);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        maxHeight: '100%',
        overflow: 'auto',
        bgcolor: 'background.default',
        pb: 2
      }}
    >
      <Box sx={{ flexShrink: 0, px: 2.5, pt: 2.5, pb: 1 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
          Smart copy
        </Typography>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 600, mt: 0.25 }}>
          Add translation
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 520 }}>
          Pick a locale that does not have this item yet. The copy uses the same path under that locale folder.
        </Typography>
      </Box>

      <Box sx={{ flexShrink: 0, px: 2.5 }}>
        <SourceItemTable
          sourceItem={sourceItem}
          subheader={sourceItemFromFormFlag ? 'Current form item' : 'Item selected in preview'}
        />
      </Box>

      <Divider sx={{ mx: 2.5, my: 2, flexShrink: 0 }} />

      <Stack spacing={1.5} sx={{ px: 2.5, flexShrink: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Target locale
        </Typography>
        <TranslateToLocalePicker
          variant="dialog"
          translationFormPath={props.translationFormPath}
          translationFormName={props.translationFormName}
          translationFormContentType={props.translationFormContentType}
          translationAuthoringBase={props.translationAuthoringBase}
        />
      </Stack>
    </Box>
  );
}
