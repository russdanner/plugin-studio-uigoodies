/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import * as React from 'react';
import { useDispatch } from 'react-redux';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { mergePluginConfiguration, openCannedSearchStudioSearch, openInNewTabDefault } from '../utils/cannedSearch';

const DEFAULT_ICON = { id: '@mui/icons-material/SavedSearchRounded' };

export function OpenCannedSearchPanelButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const p = mergePluginConfiguration(props);
  const title = (p.title as string) || 'Search';
  const icon = (p.icon as { id?: string })?.id ? (p.icon as { id: string }) : DEFAULT_ICON;
  const searchParams = String(p.searchParams ?? '');
  const useNewTab = openInNewTabDefault(p.openInNewBrowserTab);
  const initialParameters = p.initialParameters;

  const onClick = () => {
    if (useNewTab) {
      openCannedSearchStudioSearch(searchParams);
    } else {
      dispatch(
        showWidgetDialog({
          id: 'CannedSearchDialog',
          title,
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

  return <ToolsPanelListItemButton icon={icon} title={title} onClick={onClick} />;
}

export default OpenCannedSearchPanelButton;
