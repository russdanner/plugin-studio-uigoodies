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

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import StyledActionButton from './StyledButton';
import StyledDialogComponent from './StyledDialog';

import StudioAPI from '../api/studio';

export default function RenameFolderDialog({
  open,
  onClose,
  path
}: {
  open: boolean;
  onClose: (isSuccess: boolean) => void;
  path?: string;
}) {
  const siteId = useActiveSiteId();
  const { authoringBase } = useEnv();

  const [folderName, setFolderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (path) {
      setFolderName(path.split('/').pop() ?? '');
    }
  }, [path]);

  const handleSubmit = async () => {
    if (folderName && path) {
      setIsProcessing(true);
      const res = await StudioAPI.renameFolder(authoringBase, siteId, path, folderName);
      onClose(res);
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <>
      <StyledDialogComponent open={open} onClose={handleCancel} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Rename Folder
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Rename the folder at:
            </Typography>
            <Typography
              variant="body2"
              component="code"
              sx={{
                wordBreak: 'break-all',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.8125rem',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : theme.palette.grey[100],
                px: 1,
                py: 0.75,
                borderRadius: 1
              }}
            >
              {path || '—'}
            </Typography>
            <TextField
              autoFocus
              id="rename-folder-name"
              label="New folder name"
              type="text"
              fullWidth
              variant="outlined"
              size="small"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value.trim())}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <StyledActionButton variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
          </StyledActionButton>
          <StyledActionButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!folderName || isProcessing}
          >
            Rename
          </StyledActionButton>
        </DialogActions>
      </StyledDialogComponent>
    </>
  );
}
