import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import PreviewSimulatorPanel from '@craftercms/studio-ui/components/PreviewSimulatorPanel';
import { buildSimulatorDevices, type SimulatorDevice } from '../utils/deviceList';

const defaultIcon = { id: '@mui/icons-material/DevicesRounded' };

const defaultDevices: SimulatorDevice[] = [
  { title: 'smartPhone', width: 375, height: 667 },
  { title: 'tablet', width: 768, height: 1024 }
];

function rawDevicesFromProps(props: Record<string, unknown>, configuration: Record<string, unknown>): unknown {
  if (configuration.devices != null) {
    return configuration.devices;
  }
  if (props.devices != null) {
    return props.devices;
  }
  const widget = props.widget as { configuration?: { devices?: unknown } } | undefined;
  return widget?.configuration?.devices;
}

export function DeviceSimulatorFlyoutToolbarButton(props: Record<string, unknown>) {
  const configuration = (props.configuration as Record<string, unknown>) ?? {};
  const title = (configuration.title as string) ?? 'Device simulator';
  const tooltip = (configuration.tooltip as string) ?? title;
  const icon = (configuration.icon as { id?: string }) ?? defaultIcon;
  const devices = buildSimulatorDevices(rawDevicesFromProps(props, configuration), defaultDevices);

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
            sx: { mt: 0.5, maxWidth: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(520px, calc(100vh - 120px))' }
          }
        }}
      >
        <Paper variant="outlined" sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 320 }}>
            <PreviewSimulatorPanel devices={devices} />
          </Box>
        </Paper>
      </Popover>
    </>
  );
}

export default DeviceSimulatorFlyoutToolbarButton;
