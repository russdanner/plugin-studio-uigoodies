import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Badge, CircularProgress, Tooltip } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';

import { showPublishDialog, closePublishDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { fetchItemsByPath } from '@craftercms/studio-ui/services/content';
import { dispatchDOMEvent, batchActions } from '@craftercms/studio-ui/state/actions/misc';

export function PublishOrRequestPublish(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);
  const [isFetching, setIsFetching] = React.useState<Boolean>(false);
  const [forceView, setForceView] = React.useState<Boolean>(false);

  const useIcon = props.useIcon != 'undefined' ? props.useIcon : true;

  useEffect(() => {
    currentUrlPath && setInternalUrl(currentUrlPath);

    const path = '/site/website' + internalUrl + '/index.xml';
    setIsFetching(true);

    fetchItemsByPath(siteId, [path], { castAsDetailedItem: true }).subscribe({
      next(sandboxItems) {
        let sandboxItem = sandboxItems[0];
        setForceView(false);
        setIsFetching(false);

        if (sandboxItem.stateMap.locked) {
          setForceView(true);
        }
      }
    });
  }, [currentUrlPath]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const site = siteId;
    const path = '/site/website' + internalUrl + '/index.xml';
    const authoringBase = '/studio';

    fetchItemsByPath(siteId, [path], { castAsDetailedItem: true }).subscribe({
      next(sandboxItems) {
          dispatch(showPublishDialog({ items: sandboxItems, onSuccess: batchActions([closePublishDialog()])}));
      }
    });
  }

  let label = forceView ? 'Request Publish' : 'Publish';
  let iconId = forceView ? '@mui/icons-material/CloudDoneRounded' : '@mui/icons-material/BackupRounded';

  return (
    <>
      <Tooltip title={label}>
        <Badge badgeContent={null} color="primary" overlap="circular" style={{ position: 'relative' }}>
          <IconButton
            size="medium"
            style={{ padding: 4 }}
            id="go-positioned-button"
            aria-controls="false"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={handleClick}
          >
            {useIcon ? (
              <SystemIcon icon={{ id: iconId }} fontIconProps={{ fontSize: 'small' }} />
            ) : (
              <MenuItem>{label}</MenuItem>
            )}
          </IconButton>
          {isFetching && (
            <CircularProgress
              size={void 0}
              value={100}
              variant={'determinate'}
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            />
          )}
        </Badge>
      </Tooltip>
    </>
  );
}

export default PublishOrRequestPublish;
