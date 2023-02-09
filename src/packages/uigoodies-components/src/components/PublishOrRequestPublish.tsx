import * as React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import { closePublishDialog, showPublishDialog } from '@craftercms/studio-ui/state/actions/dialogs';

export function PublishOrRequestPublish(props) {
  // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
  const { item, useIcon } = props;
  const dispatch = useDispatch();
  let showButton = Boolean(item) && (item.stateMap.modified || item.stateMap.new);
  let forceRequest = !item?.availableActionsMap.publish;

  let label = forceRequest ? 'Request Publish' : 'Publish';
  let iconId = item
    ? forceRequest
      ? '@mui/icons-material/CloudDoneOutlined'
      : '@mui/icons-material/BackupOutlined'
    : '@mui/icons-material/HourglassEmptyOutlined';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(showPublishDialog({ items: [item], onSuccess: closePublishDialog() }));
  };

  return showButton === true ? (
    useIcon ? (
      <Tooltip title={item ? label : ''}>
        <IconButton size="small" onClick={handleClick} disabled={!item}>
          <SystemIcon icon={{ id: iconId }} />
        </IconButton>
      </Tooltip>
    ) : (
      <Button size="small" variant="text" onClick={handleClick} disabled={!item}>
        {label}
      </Button>
    )
  ) : (
    <></>
  );
}

export default PublishOrRequestPublish;
