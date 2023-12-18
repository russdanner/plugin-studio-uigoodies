import * as React from 'react';
import { Alert, Backdrop, CircularProgress, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useRoles from '@craftercms/studio-ui/hooks/useRoles';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import { pull, push } from '@craftercms/studio-ui/services/repositories';
import DownloadIcon from '@mui/icons-material/DownloadOutlined';
import PublishIcon from '@mui/icons-material/PublishOutlined';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

export function PullPushRemoteButtons(props) {
  const { useIcon, remoteName, mergeStrategy, pullBranch, pushBranch, pullLabel, pushLabel, enablePull, enablePush } =
    props;
  const siteId = useActiveSiteId();
  const env = useEnv();
  const roles = useRoles();
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snackSuccess, setSnackSuccess] = React.useState(true);
  const [snackShow, setSnackShow] = React.useState(false);
  const [progressShow, setProgressShow] = React.useState(false);

  const onPullSuccess = (result) => {
    setSnackMessage(`${pullLabel ? pullLabel : 'Pull'} completed successfully.`);
    setSnackSuccess(true);
    setSnackShow(true);
  };

  const onPullError = (result) => {
    setSnackMessage(`${pullLabel ? pullLabel : 'Pull'} failed.`);
    setSnackSuccess(false);
    setSnackShow(true);
  };

  const onPushSuccess = () => {
    setSnackMessage(`${pushLabel ? pushLabel : 'Push'} completed successfully.`);
    setSnackSuccess(true);
    setSnackShow(true);
  };

  const onPushError = (result) => {
    setSnackMessage(`${pushLabel ? pushLabel : 'Push'} failed.`);
    setSnackSuccess(false);
    setSnackShow(true);
  };

  const handlePullClick = (event: React.MouseEvent<HTMLElement>) => {
    setProgressShow(true);

    pull({
      siteId,
      remoteName,
      remoteBranch: pullBranch,
      mergeStrategy: mergeStrategy
    }).subscribe({
      next(result) {
        onPullSuccess(result);
      },
      error({ response }) {
        onPullError(response.response);
      }
    });
  };

  const handlePushClick = (event: React.MouseEvent<HTMLElement>) => {
    setProgressShow(true);

    push(siteId, remoteName, pushBranch, false).subscribe({
      next() {
        onPushSuccess();
      },
      error({ response }) {
        onPushError(response.response);
      }
    });
  };

  const shouldShowButton = (enabled: Boolean) => {
    let allowed = false;

    if (props.permittedRoles) {
      let allowedRoles = props.permittedRoles;
      let userRoles = roles[siteId];

      if (allowedRoles.role) {
        var aRoles = Object.values(allowedRoles.role);

        for (var i = 0; i < aRoles.length; i++) {
          //@ts-ignore
          if (userRoles.indexOf(aRoles[i]) != -1) {
            allowed = true;
            break;
          }
        }
      } else {
        for (var i = 0; i < allowedRoles.length; i++) {
          //@ts-ignore
          if (userRoles.indexOf(allowedRoles[i]) != -1) {
            allowed = true;
            break;
          }
        }
      }
    } else {
      allowed = true;
    }

    return enabled && allowed;
  };

  function handleSnackClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void {
    setProgressShow(false);
    setSnackShow(false);
  }

  return (
    <>
      {useIcon ? (
        <>
          {shouldShowButton(enablePull) ? (
            <Tooltip title={pullLabel ? pullLabel : `Pull`}>
              <IconButton size="small" onClick={handlePullClick}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
          {shouldShowButton(enablePush) ? (
            <Tooltip title={pushLabel ? pushLabel : `Push`}>
              <IconButton size="small" onClick={handlePushClick}>
                <PublishIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {shouldShowButton(enablePull) ? (
            <Button size="small" variant="text" onClick={handlePullClick}>
              {pullLabel ? pullLabel : `Pull`}
            </Button>
          ) : (
            <></>
          )}
          {shouldShowButton(enablePush) ? (
            <Button size="small" variant="text" onClick={handlePushClick}>
              {pushLabel ? pushLabel : `Push`}
            </Button>
          ) : (
            <></>
          )}
        </>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={progressShow}>
        <CircularProgress color="inherit" />

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackShow}
          autoHideDuration={5000}
          onClose={handleSnackClose}
        >
          <Alert severity={snackSuccess ? `success` : `error`} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Backdrop>
    </>
  );
}

export default PullPushRemoteButtons;
