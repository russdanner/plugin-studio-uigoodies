/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import * as React from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import { Button, buttonClasses } from '@mui/material';
import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { mergePluginConfiguration, openCannedSearchStudioSearch, openInNewTabDefault } from '../utils/cannedSearch';

const DEFAULT_ICON = { id: '@mui/icons-material/SavedSearchRounded' };

export function OpenCannedSearchToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const p = mergePluginConfiguration(props);
  const title = (p.title as string) || 'Search';
  const tooltip = (p.tooltip as string) || title;
  const dialogTitle = (p.dialogTitle as string) || title;
  const icon = (p.icon as { id?: string })?.id ? (p.icon as { id: string }) : DEFAULT_ICON;
  const searchParams = String(p.searchParams ?? '');
  const useNewTab = openInNewTabDefault(p.openInNewBrowserTab);
  const initialParameters = p.initialParameters;
  let useIcon = p.useIcon !== false;
  const useIconWithText = Boolean(p.useIconWithText);
  const buttonSize = (p.buttonSize as 'small' | 'medium' | 'large') || 'small';

  if (useIconWithText) {
    useIcon = false;
  }

  const onClick = () => {
    if (useNewTab) {
      openCannedSearchStudioSearch(searchParams);
    } else {
      dispatch(
        showWidgetDialog({
          id: 'CannedSearchDialog',
          title: dialogTitle,
          widget: {
            id: 'craftercms.components.Search',
            configuration: {
              embedded: true,
              initialParameters
            }
          }
        })
      );
    }
  };

  const applyTooltip = (children: React.ReactElement) =>
    useIcon || p.tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : children;

  return applyTooltip(
    useIcon ? (
      <IconButton size={buttonSize} onClick={onClick} aria-label={title}>
        <SystemIcon icon={icon} />
      </IconButton>
    ) : (
      <Button
        size={buttonSize}
        onClick={onClick}
        startIcon={useIconWithText ? <SystemIcon icon={icon} /> : undefined}
        sx={{ [`.${buttonClasses.startIcon}`]: { mr: 0.5 } }}
      >
        {title}
      </Button>
    )
  );
}

export default OpenCannedSearchToolbarButton;
