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
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useDispatch } from 'react-redux';

export function OpenContentUploadPanelButton(props) {
  console.log(props)
  const dispatch = useDispatch();
  const { title = 'Content Upload', icon = { id: '@mui/icons-material/FileUploadOutlined' } } = props;
  return (
    <ToolsPanelListItemButton
      icon={icon}
      title={title}
      onClick={() =>
        dispatch(
          showWidgetDialog({
            title,
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
        )
      }
    />
  );
}

export default OpenContentUploadPanelButton;
