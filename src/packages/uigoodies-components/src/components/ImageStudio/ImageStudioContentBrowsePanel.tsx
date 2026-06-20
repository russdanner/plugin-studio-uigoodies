/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import PathNavigator from '@craftercms/studio-ui/components/PathNavigator';
import { DetailedItem } from '@craftercms/studio-ui/models/Item';
import { pathNavigatorFetchPath } from '@craftercms/studio-ui/state/actions/pathNavigator';
import { useDispatch } from 'react-redux';
import { isSelectableContentPath } from './imageStudioContentPicker';

const NAVIGATOR_ID = 'imageStudioSaveContentBrowse';

function isFolderItem(item: DetailedItem): boolean {
  return item?.systemType === 'folder';
}

type Props = {
  selectedPath: string | null;
  onSelect(path: string, label?: string | null): void;
};

export function ImageStudioContentBrowsePanel({ selectedPath, onSelect }: Props) {
  const dispatch = useDispatch();

  const onItemClicked = (item: DetailedItem) => {
    if (isFolderItem(item)) {
      dispatch(
        pathNavigatorFetchPath({
          id: NAVIGATOR_ID,
          path: item.path
        })
      );
      return;
    }
    if (isSelectableContentPath(item.path)) {
      onSelect(item.path, item.label);
    }
  };

  return (
    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={600}>Browse repository</Typography>
        <Typography variant="caption" color="text.secondary">
          Open folders to find pages and components under /site
        </Typography>
        {selectedPath ? (
          <Typography variant="caption" display="block" sx={{ mt: 0.5 }} color="primary.main">
            Selected: {selectedPath}
          </Typography>
        ) : null}
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', px: 1 }}>
        <PathNavigator
          id={NAVIGATOR_ID}
          label="Site content"
          rootPath="/site"
          limit={50}
          initialCollapsed={false}
          excludes={['level\\.xml$']}
          onItemClicked={onItemClicked}
        />
      </Box>
    </Box>
  );
}

export default ImageStudioContentBrowsePanel;
