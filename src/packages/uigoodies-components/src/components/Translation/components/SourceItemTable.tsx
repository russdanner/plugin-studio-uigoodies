/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import { PreviewItemType } from '../api/studio';

const SourceItemTable = ({
  sourceItem,
  subheader = 'Item selected in preview'
}: {
  sourceItem: PreviewItemType | null;
  /** Shown under the "Source" title (preview vs form editor). */
  subheader?: string;
}) => (
  <Card
    variant="outlined"
    sx={{
      mx: 2.5,
      mb: 2,
      borderRadius: 2,
      boxShadow: (theme) =>
        theme.palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(15, 23, 42, 0.06)'
    }}
  >
    <CardHeader
      avatar={
        <ContentCopyOutlinedIcon color="primary" sx={{ opacity: 0.9 }} aria-hidden />
      }
      title="Source"
      titleTypographyProps={{ variant: 'subtitle1', fontWeight: 600 }}
      subheader={subheader}
      subheaderTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
    />
    <CardContent sx={{ pt: 0 }}>
      {sourceItem ? (
        <Stack spacing={1.25}>
          <div>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {sourceItem.name}
            </Typography>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Path
            </Typography>
            <Typography
              variant="body2"
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.8125rem',
                wordBreak: 'break-all',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : theme.palette.grey[100],
                px: 1,
                py: 0.75,
                borderRadius: 1
              }}
            >
              {sourceItem.path}
            </Typography>
          </div>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ py: 0.5 }}>
          <Chip size="small" label="No selection" color="default" variant="outlined" />
          <Typography variant="body2" color="text.secondary">
            Select an item in preview to copy it.
          </Typography>
        </Stack>
      )}
    </CardContent>
  </Card>
);

export default SourceItemTable;
