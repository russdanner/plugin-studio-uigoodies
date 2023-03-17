import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import useActiveUser from '@craftercms/studio-ui/hooks/useActiveUser';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { isItemLockedForMe } from '@craftercms/studio-ui/utils/content';


export function EditOrViewCurrent(props) {
  // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
  const { item, useIcon } = props;
  const dispatch = useDispatch();
  const currentUser = useActiveUser()
  const siteId = useActiveSiteId();
  const env = useEnv();
  let readonly = true;
  
  // make sure the user has access to the item, 
  if(item?.availableActionsMap.edit === true
  && isItemLockedForMe(item, currentUser.username) === false) {
    readonly = false
  }


  let label = readonly ? 'View' : 'Edit';
  let iconId = item
    ? readonly
      ? '@mui/icons-material/PreviewOutlined'
      : '@mui/icons-material/EditOutlined'
    : '@mui/icons-material/HourglassEmptyOutlined';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if(!item.stateMap.systemProcessing) {        
      dispatch(
        showEditDialog({
          site: siteId,
          path: item.path,
          authoringBase: env.authoringBase,
          readonly
        })
      );
    }
  };

  return useIcon ? (
    <Tooltip title={item ? `${label} (shift+e)` : ''}>
      <IconButton size="small" onClick={handleClick} disabled={!item}>
        <SystemIcon icon={{ id: iconId }} />
      </IconButton>
    </Tooltip>
  ) : (
    <Button size="small" variant="text" onClick={handleClick} disabled={!item}>
      {label}
    </Button>
  );
}

export default EditOrViewCurrent;

