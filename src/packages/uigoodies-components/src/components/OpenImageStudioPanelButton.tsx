/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import * as React from 'react';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import { IMAGE_STUDIO_DEFAULTS, useOpenImageStudio } from '../utils';

export function OpenImageStudioPanelButton(props: {
  title?: string;
  icon?: { id: string };
  dialogTitle?: string;
  defaultPath?: string;
}) {
  const {
    title = IMAGE_STUDIO_DEFAULTS.title,
    icon = IMAGE_STUDIO_DEFAULTS.icon,
    dialogTitle = title,
    defaultPath
  } = props;
  const handleClick = useOpenImageStudio({ title: dialogTitle, defaultPath });
  return <ToolsPanelListItemButton icon={icon} title={title} onClick={handleClick} />;
}

export default OpenImageStudioPanelButton;
