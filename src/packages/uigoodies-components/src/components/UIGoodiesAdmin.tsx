import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { buildInfo } from '../buildInfo';

function formatBuiltAt(iso: string): string {
  const date = new Date(iso);
  return isNaN(date.getTime()) ? iso : date.toLocaleString();
}

const rows: Array<[string, string]> = [
  ['Plugin', 'org.rd.plugin.uigoodies'],
  ['Version', buildInfo.version],
  ['Built', formatBuiltAt(buildInfo.builtAt)],
  ['Commit', buildInfo.commit]
];

export function UIGoodiesAdmin() {
  return (
    <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', p: 2, gap: 2, overflow: 'auto' }}>
      <Typography variant="h5">UI Goodies</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Build
        </Typography>
        <Box
          component="dl"
          sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 3, rowGap: 1, m: 0 }}
        >
          {rows.map(([label, value]) => (
            <React.Fragment key={label}>
              <Typography component="dt" color="text.secondary">
                {label}
              </Typography>
              <Typography component="dd" sx={{ m: 0, fontFamily: 'monospace' }}>
                {value}
              </Typography>
            </React.Fragment>
          ))}
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>
        <Typography color="text.secondary">No preferences yet.</Typography>
      </Paper>
    </Box>
  );
}

export default UIGoodiesAdmin;
