import * as React from 'react';
import { useDispatch } from 'react-redux';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';

import Button from '@mui/material/Button';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useCurrentPreviewItem from '@craftercms/studio-ui/hooks/useCurrentPreviewItem';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import { showPublishDialog, closePublishDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { batchActions } from '@craftercms/studio-ui/state/actions/misc';

export function PublishOrRequestPublish(props) {
  const dispatch = useDispatch();
  const useIcon = props.useIcon != 'undefined' ? props.useIcon : true;
  const siteId = useActiveSiteId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const env = useEnv();
  const item = useCurrentPreviewItem();

  let showButton = false;
  let forceRequest = false;

  if (item?.stateMap.modified === true || item?.stateMap.new === true) {
    showButton = true;

    if (item.availableActionsMap.publish === false) {
      forceRequest = true;
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(showPublishDialog({ items: [item], onSuccess: batchActions([closePublishDialog()]) }));
  };

  let label = forceRequest ? 'Request Publish' : 'Publish';
  let iconId = forceRequest ? '@mui/icons-material/CloudDoneRounded' : '@mui/icons-material/BackupRounded';

  if (showButton === true) {
    return useIcon ? (
      <Tooltip title={label}>
        <IconButton size="medium" style={{ padding: 4 }} onClick={handleClick}>
          <SystemIcon icon={{ id: iconId }} fontIconProps={{ fontSize: 'small' }} />
        </IconButton>
      </Tooltip>
    ) : (
      <Button size="small" variant="text" onClick={handleClick}>
        {label}
      </Button>
    );
  } else {
    return <></>;
  }
}

export default PublishOrRequestPublish;
