/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
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
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useDispatch } from 'react-redux';
import { Button, buttonClasses } from '@mui/material';

export function OpenContentUploadToolbarButton(props) {
  const dispatch = useDispatch();
  let {
    title = 'Content Upload',
    tooltip = title,
    useIcon = true,
    useIconWithText = false,
    buttonSize = 'small',
    dialogTitle = title,
    icon = { id: '@mui/icons-material/FileUploadOutlined' }
  } = props;
  // Protection against confusion of using the two props combined (i.e. useIcon, useIconWithText)...
  if (useIconWithText) {
    useIcon = false;
  }
  const handleClick = () =>
    dispatch(
      showWidgetDialog({
        title: dialogTitle,
        extraProps: props,
        fullHeight: false,
        fullWidth: false,
        widget: {
          id: 'org.rd.plugin.uigoodies.ContentUpload',
          configuration: {
            defaultPath: props.defaultPath
          }
        }
      })
    );
  const applyTooltip = (children) => {
    return useIcon || props.tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : children;
  };
  return applyTooltip(
    useIcon ? (
      <IconButton size={buttonSize} onClick={handleClick}>
        <SystemIcon icon={icon} />
      </IconButton>
    ) : (
      <Button
        size={buttonSize}
        onClick={handleClick}
        startIcon={useIconWithText ? <SystemIcon icon={icon} /> : void 0}
        sx={{ [`.${buttonClasses.startIcon}`]: { mr: 0.5 } }}
      >
        {title}
      </Button>
    )
  );
}

export default OpenContentUploadToolbarButton;
