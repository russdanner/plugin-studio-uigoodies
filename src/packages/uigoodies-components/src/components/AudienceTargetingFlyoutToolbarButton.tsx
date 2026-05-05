import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import PreviewAudiencesPanel from '@craftercms/studio-ui/components/PreviewAudiencesPanel';
import { buildAudienceFields } from '../utils/audienceFields';

const defaultIcon = { id: '@mui/icons-material/EmojiPeopleRounded' };

function rawFieldsFromProps(props: Record<string, unknown>, configuration: Record<string, unknown>): unknown {
  if (configuration.fields != null) {
    return configuration.fields;
  }
  if (props.fields != null) {
    return props.fields;
  }
  const widget = props.widget as { configuration?: { fields?: unknown } } | undefined;
  return widget?.configuration?.fields;
}

export function AudienceTargetingFlyoutToolbarButton(props: Record<string, unknown>) {
  const configuration = (props.configuration as Record<string, unknown>) ?? {};
  const title = (configuration.title as string) ?? 'Audience targeting';
  const tooltip = (configuration.tooltip as string) ?? title;
  const icon = (configuration.icon as { id?: string }) ?? defaultIcon;
  const fields = buildAudienceFields(rawFieldsFromProps(props, configuration));

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton
          size="small"
          aria-label={title}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
        >
          <SystemIcon icon={icon} />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 8,
            sx: { mt: 0.5, maxWidth: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(480px, calc(100vh - 120px))' }
          }
        }}
      >
        <Paper variant="outlined" sx={{ overflow: 'auto' }}>
          {/* minHeight so Studio LoadingState (minHeight:100%) is visible inside Popover */}
          <Box sx={{ minWidth: 320, minHeight: 280, p: 1 }}>
            {fields ? (
              <PreviewAudiencesPanel fields={fields as never} />
            ) : (
              <Alert severity="warning">
                <Typography variant="body2">
                  No audience fields were found for this toolbar button. Add a fields block under this
                  widget&apos;s configuration in ui.xml (same structure as the Experience Builder audience tool).
                </Typography>
              </Alert>
            )}
          </Box>
        </Paper>
      </Popover>
    </>
  );
}

export default AudienceTargetingFlyoutToolbarButton;
