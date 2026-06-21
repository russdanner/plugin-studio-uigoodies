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
import { useDispatch } from 'react-redux';
import DialogActions from '@mui/material/DialogActions';
import { closeWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import StyledActionButton from './StyledButton';

import StudioAPI, { PreviewItemType } from '../api/studio';
import { destinationPathSubscriber } from '../services/subscribe';
import { openEditFormStudioDispatch } from '../utils/studioEditDialog';

export default function AppActions({
  rootDir,
  sourceItem
}: {
  rootDir: string | null;
  sourceItem?: PreviewItemType | null;
}) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const { authoringBase } = useEnv();

  const [destinationPath, setDestinationPath] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const sub = destinationPathSubscriber.subscribe((path) => {
      setDestinationPath(path);
    });
    return () => sub.unsubscribe();
  }, []);

  const handleCopy = async (event: React.MouseEvent<HTMLElement>, copyAndEdit: boolean) => {
    event.preventDefault();

    if (isProcessing || !destinationPath || !sourceItem || !sourceItem.path) {
      return;
    }

    setIsProcessing(true);
    const sourcePath = sourceItem.path;
    const res = await StudioAPI.copyItem(authoringBase, siteId, sourcePath, destinationPath);
    const pastedPath = (res?.pastedPath || res?.items?.[0]) as string | undefined;
    if (!res?.ok || !pastedPath) {
      setIsProcessing(false);
      return dispatch(
        showSystemNotification({
          message: res?.message || `There is an error while copying content: ${sourcePath}`
        })
      );
    }

    if (copyAndEdit) {
      openEditFormStudioDispatch(dispatch, siteId, pastedPath, authoringBase);
    }

    if (!copyAndEdit) {
      dispatch(
        showSystemNotification({
          message: 'Selected files are copied to destination folder.'
        })
      );
    }

    setIsProcessing(false);
  };

  const handleCopyAndOpen = (event: React.MouseEvent<HTMLElement>) => {
    const openEditForm = true;
    handleCopy(event, openEditForm);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason?: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      resetState();
      dispatch(closeWidgetDialog());
    }
  };

  const resetState = () => {
    setDestinationPath('');
    setIsProcessing(false);
  };

  return (
    <DialogActions sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end', px: 0 }}>
      <StyledActionButton
        variant="outlined"
        color="primary"
        onClick={(event) => handleClose(event, null)}
        disabled={isProcessing}
      >
        Close
      </StyledActionButton>
      <StyledActionButton
        variant="contained"
        color="primary"
        onClick={(event) => handleCopy(event, false)}
        disabled={isProcessing || !rootDir || !destinationPath}
      >
        Copy
      </StyledActionButton>
      <StyledActionButton
        variant="contained"
        color="primary"
        onClick={handleCopyAndOpen}
        disabled={isProcessing || !rootDir || !destinationPath}
      >
        Copy and Edit
      </StyledActionButton>
    </DialogActions>
  );
}
