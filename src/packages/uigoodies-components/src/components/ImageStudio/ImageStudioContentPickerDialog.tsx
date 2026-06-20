/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import Search from '@craftercms/studio-ui/components/Search';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import ImageStudioContentBrowsePanel from './ImageStudioContentBrowsePanel';
import ImageStudioContentFeedPanel from './ImageStudioContentFeedPanel';
import {
  ContentPickerFeedEntry,
  ContentPickerSelection,
  ImageStudioContentPickerTab,
  loadMyRecentActivityFeed,
  loadUnpublishedWorkFeed
} from './imageStudioContentPicker';

export type { ContentPickerSelection };

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (selection: ContentPickerSelection) => void;
  initialPath?: string | null;
};

export function ImageStudioContentPickerDialog({ open, onClose, onSelect, initialPath }: Props) {
  const siteId = useActiveSiteId();
  const [activeTab, setActiveTab] = useState<ImageStudioContentPickerTab>('recent');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  const [recentEntries, setRecentEntries] = useState<ContentPickerFeedEntry[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState<string | null>(null);

  const [unpublishedEntries, setUnpublishedEntries] = useState<ContentPickerFeedEntry[]>([]);
  const [unpublishedLoading, setUnpublishedLoading] = useState(false);
  const [unpublishedError, setUnpublishedError] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setSelectedPath(null);
    setSelectedLabel('');
    setActiveTab('recent');
    onClose();
  }, [onClose]);

  const pickPath = useCallback((path: string, label?: string | null) => {
    setSelectedPath(path);
    setSelectedLabel(label?.trim() || path);
  }, []);

  const handleSearchSelect = useCallback(
    (path: string, selected: boolean) => {
      if (selected) {
        pickPath(path);
      }
    },
    [pickPath]
  );

  const handleConfirm = useCallback(() => {
    if (!selectedPath) {
      return;
    }
    onSelect({ path: selectedPath, label: selectedLabel || selectedPath });
    setSelectedPath(null);
    setSelectedLabel('');
    setActiveTab('recent');
  }, [onSelect, selectedLabel, selectedPath]);

  const loadRecentFeed = useCallback(() => {
    if (!siteId) {
      setRecentEntries([]);
      return undefined;
    }
    setRecentLoading(true);
    setRecentError(null);
    return loadMyRecentActivityFeed(siteId).subscribe({
      next(entries) {
        setRecentEntries(entries);
        setRecentLoading(false);
      },
      error() {
        setRecentError('Unable to load your recent activity.');
        setRecentEntries([]);
        setRecentLoading(false);
      }
    });
  }, [siteId]);

  const loadUnpublishedFeed = useCallback(() => {
    if (!siteId) {
      setUnpublishedEntries([]);
      return undefined;
    }
    setUnpublishedLoading(true);
    setUnpublishedError(null);
    return loadUnpublishedWorkFeed(siteId).subscribe({
      next(entries) {
        setUnpublishedEntries(entries);
        setUnpublishedLoading(false);
      },
      error() {
        setUnpublishedError('Unable to load unpublished work.');
        setUnpublishedEntries([]);
        setUnpublishedLoading(false);
      }
    });
  }, [siteId]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setSelectedPath(initialPath ?? null);
    setSelectedLabel(initialPath ?? '');
  }, [open, initialPath]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (activeTab === 'recent') {
      const subscription = loadRecentFeed();
      return () => subscription?.unsubscribe();
    }
    if (activeTab === 'unpublished') {
      const subscription = loadUnpublishedFeed();
      return () => subscription?.unsubscribe();
    }
  }, [activeTab, loadRecentFeed, loadUnpublishedFeed, open]);

  const isSearchTab = activeTab === 'search';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      scroll="paper"
      disableRestoreFocus
      PaperProps={{
        sx: (theme) => ({
          width: 'min(96vw, 1100px)',
          maxWidth: `min(${theme.breakpoints.values.lg}px, calc(100vw - ${theme.spacing(4)}))`,
          height: 'min(85vh, 880px)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        })
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>Choose content item</DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          flex: 1,
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value: ImageStudioContentPickerTab) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
        >
          <Tab value="browse" label="Browse" />
          <Tab value="recent" label="My recent activity" />
          <Tab value="unpublished" label="Unpublished work" />
          <Tab value="search" label="Search" />
        </Tabs>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {open && activeTab === 'browse' ? (
            <ImageStudioContentBrowsePanel selectedPath={selectedPath} onSelect={pickPath} />
          ) : null}

          {open ? (
            <Box
              hidden={activeTab !== 'search'}
              sx={{
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                width: '100%',
                display: activeTab === 'search' ? 'block' : 'none',
                overflow: 'hidden',
                '& > section': {
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  minWidth: 0
                },
                '& > section > section:last-of-type': {
                  display: 'none'
                }
              }}
            >
              <Search embedded mode="select" onClose={handleClose} onSelect={handleSearchSelect} />
            </Box>
          ) : null}

          {activeTab === 'recent' ? (
            <ImageStudioContentFeedPanel
              title="My recent activity"
              description="Pages and components you created or edited recently"
              entries={recentEntries}
              loading={recentLoading}
              error={recentError}
              selectedPath={selectedPath}
              onSelect={pickPath}
              onRefresh={loadRecentFeed}
            />
          ) : null}

          {activeTab === 'unpublished' ? (
            <ImageStudioContentFeedPanel
              title="Unpublished work"
              description="Sandbox items not yet published"
              entries={unpublishedEntries}
              loading={unpublishedLoading}
              error={unpublishedError}
              selectedPath={selectedPath}
              onSelect={pickPath}
              onRefresh={loadUnpublishedFeed}
            />
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1.5, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          {selectedPath ? (
            <Typography variant="body2" color="text.secondary" noWrap>
              {selectedLabel}
              <Typography component="span" variant="caption" color="text.disabled" sx={{ ml: 1 }}>
                {selectedPath}
              </Typography>
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Select a page or component
            </Typography>
          )}
        </Box>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disabled={!selectedPath} onClick={handleConfirm}>
          Use this content
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageStudioContentPickerDialog;
