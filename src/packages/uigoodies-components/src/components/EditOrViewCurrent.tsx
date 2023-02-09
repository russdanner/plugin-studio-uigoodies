import * as React from 'react';

import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useCurrentPreviewItem from '@craftercms/studio-ui/hooks/useCurrentPreviewItem';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';

import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';

export function EditOrViewCurrent(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const useIcon = props.useIcon != 'undefined' ? props.useIcon : true;

  const env = useEnv();
  const item = useCurrentPreviewItem();
  let forceView = true;

  if (item?.availableActionsMap.edit === true) {
    forceView = false;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(
      showEditDialog({
        site: siteId,
        path: item.path,
        authoringBase: env.authoringBase,
        readonly: forceView ? true : false
      })
    );
  };

  let label = forceView ? 'View' : 'Edit';
  let iconId = forceView ? '@mui/icons-material/PreviewRounded' : '@mui/icons-material/EditRounded';

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
}

export default EditOrViewCurrent;
