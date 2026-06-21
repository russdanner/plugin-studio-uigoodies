/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * Translation dialog only. Site Explorer uses stock Studio `PathNavigatorTree` in ui.xml.
 */

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import RightClickMenu from './RightClickMenu';
import NewFolderDialog from './NewFolderDialog';
import RenameFolderDialog from './RenameFolderDialog';
import LocalePathTreeView, { PathTreeViewMode } from './LocalePathTreeView';
import { useLocaleLayout } from '../hooks/useLocaleLayout';
import { emitDestinationPath as publishDestinationPath } from '../services/subscribe';

import { MULTI_LOCALE_BASE_LOCALE } from '../config/multiLocaleConfig';

/** Max child folders rendered under one node in the Translation dialog tree (sidebar uses stock `limit` in ui.xml). */
const DIALOG_MAX_CHILDREN_PER_FOLDER = 500;

export type DirectoryTreeViewProps = {
  rootDir: string | null;
  /** Used to hide locale / folder roots that already have a translation of this item. */
  sourceItemPath?: string | null;
};

export default function DirectoryTreeView({ rootDir, sourceItemPath = null }: DirectoryTreeViewProps) {
  const siteId = useActiveSiteId();
  const { authoringBase } = useEnv();
  const [refreshKey, setRefreshKey] = useState(0);
  const localeLayout = useLocaleLayout(rootDir, siteId, authoringBase, refreshKey);

  const [viewMode, setViewMode] = useState<PathTreeViewMode>('traditional');
  const [rightClickAnchorEl, setRightClickAnchorEl] = useState<HTMLElement | null>(null);
  const [rightClickPosition, setRightClickPosition] = useState<{ path?: string; pageX?: number; pageY?: number }>({});
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [renameFolderDialogOpen, setRenameFolderDialogOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    if (!localeLayout) {
      setViewMode((m) => (m === 'traditional' ? m : 'traditional'));
    }
  }, [localeLayout]);

  const onNodeContextMenuClick = (event: React.MouseEvent<HTMLElement>, nodeId: string) => {
    event.stopPropagation();
    event.preventDefault();
    setRightClickAnchorEl(event.currentTarget);
    setRightClickPosition({
      pageX: event.pageX,
      pageY: event.pageY,
      path: nodeId
    });
  };

  const bumpTreeRefresh = () => {
    setSelectedPath('');
    publishDestinationPath('', 'DirectoryTreeView.refresh');
    setRefreshKey((k) => k + 1);
  };

  const onCreateFolderClose = (isSuccess: boolean) => {
    if (isSuccess) {
      bumpTreeRefresh();
    }
    setNewFolderDialogOpen(false);
  };

  const onRenameFolderClose = (isSuccess: boolean) => {
    if (isSuccess) {
      bumpTreeRefresh();
    }
    setRenameFolderDialogOpen(false);
  };

  if (!rootDir) {
    return (
      <Box sx={{ px: 2.5, py: 1, flex: 1 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            height: '100%',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(15, 23, 42, 0.06)'
          }}
        >
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520 }}>
              Open content under <strong>/site/website</strong> or <strong>/site/components</strong> in preview to
              browse destinations.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ px: 2.5, py: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Card
          variant="outlined"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            borderRadius: 2,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(15, 23, 42, 0.06)'
          }}
        >
          <CardHeader
            avatar={<FolderOpenOutlinedIcon color="primary" aria-hidden />}
            title="Destination folder"
            subheader={
              viewMode === 'translation' && localeLayout
                ? `Base locale tree (${MULTI_LOCALE_BASE_LOCALE}). Use globe / ⋮ on rows when translation view is on.`
                : 'Expand folders and select a path. Right-click for new folder or rename.'
            }
            titleTypographyProps={{ variant: 'subtitle1', fontWeight: 600 }}
            subheaderTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
            action={
              <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 0.25 }}>
                <Tooltip title="Reload folder list, locale detection, and translation checks (same REST calls as initial load).">
                  <IconButton
                    size="small"
                    aria-label="Refresh destination tree"
                    onClick={() => bumpTreeRefresh()}
                    edge="end"
                  >
                    <RefreshOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {localeLayout ? (
                  <FormControlLabel
                    sx={{ mr: 0, ml: 0.5 }}
                    control={
                      <Switch
                        size="small"
                        checked={viewMode === 'translation'}
                        onChange={(_, c) => setViewMode(c ? 'translation' : 'traditional')}
                        inputProps={{ 'aria-label': 'Translation view' }}
                      />
                    }
                    label={
                      <Typography variant="caption" color="text.secondary">
                        Translation view
                      </Typography>
                    }
                    labelPlacement="start"
                  />
                ) : null}
              </Box>
            }
          />
          <CardContent sx={{ flex: 1, pt: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Selected path
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 1.5,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.8125rem',
                wordBreak: 'break-all',
                color: selectedPath ? 'text.primary' : 'text.disabled'
              }}
            >
              {selectedPath || '—'}
            </Typography>
            <LocalePathTreeView
              key={`${refreshKey}-${viewMode}-${localeLayout?.baseRootPath ?? 'na'}`}
              rootDir={rootDir}
              siteId={siteId}
              authoringBase={authoringBase}
              viewMode={viewMode}
              localeLayout={localeLayout}
              onNodeContextMenu={onNodeContextMenuClick}
              onSelectedPathChange={setSelectedPath}
              emitDestinationPath
              maxChildrenPerFolder={DIALOG_MAX_CHILDREN_PER_FOLDER}
              sourceItemPath={sourceItemPath}
              openItemPath={sourceItemPath}
            />
          </CardContent>
        </Card>
        <RightClickMenu
          anchorEl={rightClickAnchorEl}
          onMenuClose={() => {
            setRightClickAnchorEl(null);
          }}
          position={rightClickPosition}
          onCreateFolder={() => {
            setRightClickAnchorEl(null);
            setNewFolderDialogOpen(true);
          }}
          onRenameFolder={() => {
            setRightClickAnchorEl(null);
            setRenameFolderDialogOpen(true);
          }}
          onContextMenu={(event) => {
            setRightClickAnchorEl(null);
            event.preventDefault();
          }}
        />
      </Box>
      <NewFolderDialog open={newFolderDialogOpen} onClose={onCreateFolderClose} path={rightClickPosition.path} />
      <RenameFolderDialog open={renameFolderDialogOpen} onClose={onRenameFolderClose} path={rightClickPosition.path} />
    </>
  );
}
