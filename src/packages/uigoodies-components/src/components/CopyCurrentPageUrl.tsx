import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch((err) => {
    console.error('Failed to copy text: ', err);
  });
}

export function CopyCurrentPageUrl(props) {
  const { item, useIcon, environments } = props;
  const [optionMenuAnchorEl, setOptionMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const iconId = '@mui/icons-material/FileCopyOutlined';
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();

  const options =
    environments?.label && environments?.pattern
      ? Object.keys(environments.label).map((key) => ({
          label: environments.label[key],
          pattern: environments.pattern[key]
        }))
      : [];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    copyToClipboard(item.previewUrl);
    dispatch(
      showSystemNotification({
        message: 'URL copied to clipboard'
      })
    );
  };

  const handleOptionMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setOptionMenuAnchorEl(optionMenuAnchorEl ? null : event.currentTarget);
  };

  const handleOptionSelect = (label: string, pattern: string) => {
    const url = pattern.replace('[URL]', item.previewUrl).replace('[SITEID]', siteId);
    copyToClipboard(url);
    dispatch(
      showSystemNotification({
        message: 'URL copied to clipboard'
      })
    );
    setTimeout(() => {
      setOptionMenuAnchorEl(null);
    }, 50);
  };

  return (
    <>
      {useIcon ? (
        <>
          <Tooltip title="Copy Page URL">
            <IconButton size="small" onClick={handleClick}>
              <SystemIcon icon={{ id: iconId }} />
            </IconButton>
          </Tooltip>
          {options && options.length > 0 && (
            <Button
              id="urls-select-button"
              variant="text"
              color="inherit"
              onClick={handleOptionMenuClick}
              aria-controls={optionMenuAnchorEl ? 'urls-select-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(optionMenuAnchorEl)}
              sx={{
                typography: 'subtitle1',
                textTransform: 'none',
                borderRadius: 1,
                minWidth: 0
              }}
              endIcon={<ExpandMoreRounded />}
            >
              Copy URLs
            </Button>
          )}
        </>
      ) : (
        <>
          <Button size="small" variant="text" onClick={handleClick}>
            Copy Page URL
          </Button>
          {options && options.length > 0 && (
            <Tooltip title="Copy more URLs">
              <IconButton
                id="urls-select-button"
                color="inherit"
                size="small"
                aria-controls={optionMenuAnchorEl ? 'urls-select-menu' : undefined}
                aria-haspopup="true"
                onClick={handleOptionMenuClick}
              >
                <ExpandMoreRounded />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
      {options && options.length > 0 && (
        <Menu
          id="urls-select-menu"
          anchorEl={optionMenuAnchorEl}
          open={Boolean(optionMenuAnchorEl)}
          onClose={() => setOptionMenuAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'urls-select-button'
          }}
          slotProps={{
            paper: {
              style: { minWidth: 132 }
            }
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.label} onClick={() => handleOptionSelect(option.label, option.pattern)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}

export default CopyCurrentPageUrl;
