/*
 * Copyright (C) 2007-2024 Crafter Software Corporation. All Rights Reserved.
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
import { Button, buttonClasses } from '@mui/material';
import { BULK_PUBLISH_DEFAULTS, useOpenBulkPublish } from '../utils';

export function OpenBulkPublishToolbarButton(props) {
  let {
    title = BULK_PUBLISH_DEFAULTS.title,
    tooltip = title,
    useIcon = true,
    useIconWithText = false,
    buttonSize = 'small',
    dialogTitle = title,
    icon = BULK_PUBLISH_DEFAULTS.icon
  } = props;
  // Protection against confusion of using the two props combined (i.e. useIcon, useIconWithText)...
  if (useIconWithText) {
    useIcon = false;
  }
  const handleClick = useOpenBulkPublish({ ...props, title: dialogTitle });
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

export default OpenBulkPublishToolbarButton;
