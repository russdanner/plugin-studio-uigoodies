/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { fetchAll } from '@craftercms/studio-ui/services/sites';
import { setDevContentOpsStudioSiteId } from './devContentOpsApi';
import { GitLogTab } from './GitLogTab';
import { RepoHealthTab } from './RepoHealthTab';
import { SiteItemsTab } from './SiteItemsTab';
import { BranchesTab } from './BranchesTab';
import { DatabaseTab } from './DatabaseTab';
import { WorkingTreeTab } from './WorkingTreeTab';
import { BlobStoreTab } from './BlobStoreTab';
import { PublishCompareTab } from './PublishCompareTab';

type TabId = 'git-log' | 'working-tree' | 'branches' | 'database' | 'repo-health' | 'site-items' | 'blob-stores' | 'publish-compare';

type SiteOption = { id: string; name: string };

export function DevContentOpsTools() {
  const theme = useTheme();
  const activeSiteId = useActiveSiteId();
  const [tab, setTab] = useState<TabId>('git-log');
  const [sites, setSites] = useState<SiteOption[]>([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState<SiteOption | null>(null);
  const userPickedSiteRef = useRef(false);

  useEffect(() => {
    setDevContentOpsStudioSiteId(activeSiteId ?? null);
  }, [activeSiteId]);

  useEffect(() => {
    setSitesLoading(true);
    const sub = fetchAll({ limit: 500, offset: 0 }).subscribe({
      next(sitesResponse: SiteOption[] & { total?: number }) {
        const list = (Array.isArray(sitesResponse) ? sitesResponse : []).filter(Boolean) as SiteOption[];
        setSites(list.sort((a, b) => a.name.localeCompare(b.name)));
        setSitesLoading(false);
      },
      error() {
        setSites([]);
        setSitesLoading(false);
      }
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!sites.length) {
      return;
    }
    setSelectedSite((current) => {
      if (userPickedSiteRef.current && current) {
        return sites.find((site) => site.id === current.id) ?? current;
      }
      const preferredId = activeSiteId || sites[0]?.id;
      return sites.find((site) => site.id === preferredId) ?? sites[0] ?? null;
    });
  }, [activeSiteId, sites]);

  const operatingSite =
    selectedSite ?? sites.find((site) => site.id === activeSiteId) ?? sites[0] ?? null;
  const siteId = operatingSite?.id;
  const projectPickerValue = operatingSite;

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: (t) => alpha(t.palette.text.primary, 0.02)
      }}
    >
      <Paper
        elevation={0}
        square
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          bgcolor: 'background.paper',
          flexWrap: 'wrap',
          flexShrink: 0,
          overflow: 'visible'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: 'primary.main',
              flexShrink: 0
            }}
          >
            <AccountTreeRoundedIcon fontSize="small" />
          </Box>
          <Typography variant="h6" fontWeight={700} lineHeight={1.25} letterSpacing="-0.01em" sx={{ minWidth: 0 }}>
            DevContentOps Tools
          </Typography>
        </Box>
        <Box sx={{ minWidth: { xs: '100%', sm: 280 }, maxWidth: 360, flex: { sm: '0 1 360px' }, pt: 0.5 }}>
          {sitesLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <CircularProgress size={18} />
              <Typography variant="body2" color="text.secondary">
                Loading projects…
              </Typography>
            </Box>
          ) : sites.length === 0 ? (
            <Chip size="small" label="No accessible projects" color="warning" variant="outlined" />
          ) : projectPickerValue ? (
            <Autocomplete
              size="small"
              disableClearable
              options={sites}
              value={projectPickerValue}
              onChange={(_, value) => {
                userPickedSiteRef.current = true;
                setSelectedSite(value);
              }}
              getOptionLabel={(option) => `${option.name} (${option.id})`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project"
                  helperText="Tools run against this project; does not change your Studio session"
                  InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
                />
              )}
            />
          ) : null}
        </Box>
      </Paper>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          px: 2.5,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          minHeight: 44,
          flexShrink: 0,
          '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' }
        }}
      >
        <Tab value="git-log" label="Git log" />
        <Tab value="working-tree" label="Working tree" />
        <Tab value="branches" label="Branches" />
        <Tab value="database" label="Database" />
        <Tab value="repo-health" label="Repository health" />
        <Tab value="site-items" label="Site items" />
        <Tab value="blob-stores" label="Blob stores" />
        <Tab value="publish-compare" label="Publish compare" />
      </Tabs>

      <Box sx={{ flex: 1, minHeight: 0, p: 2.5, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {!siteId ? (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
            <Typography color="text.secondary" variant="body1">
              {sitesLoading ? 'Loading projects…' : 'Select a project to continue.'}
            </Typography>
          </Box>
        ) : (
          <>
            {tab === 'git-log' && (
              <GitLogTab key={siteId} siteId={siteId} siteName={operatingSite.name} sites={sites} />
            )}
            {tab === 'working-tree' && (
              <WorkingTreeTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
            {tab === 'branches' && (
              <BranchesTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
            {tab === 'database' && (
              <DatabaseTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
            {tab === 'repo-health' && (
              <RepoHealthTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
            {tab === 'site-items' && (
              <SiteItemsTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
            {tab === 'blob-stores' && (
              <BlobStoreTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
            {tab === 'publish-compare' && (
              <PublishCompareTab key={siteId} siteId={siteId} siteName={operatingSite.name} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default DevContentOpsTools;
