import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';

export function EditOrViewCurrent(props) {
  // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
  const { item, useIcon } = props;
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const env = useEnv();
  let readonly = item?.availableActionsMap.edit !== true;
  let label = readonly ? 'View' : 'Edit';
  let iconId = item
    ? readonly
      ? '@mui/icons-material/PreviewOutlined'
      : '@mui/icons-material/EditOutlined'
    : '@mui/icons-material/HourglassEmptyOutlined';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(
      showEditDialog({
        site: siteId,
        path: item.path,
        authoringBase: env.authoringBase,
        readonly
      })
    );
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
