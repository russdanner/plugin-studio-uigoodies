/*
 * Copyright (C) 2007-2024 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import {
  closeConfirmDialog,
  closePublishDialog,
  showConfirmDialog,
  showPublishDialog
} from '@craftercms/studio-ui/state/actions/dialogs';
import { batchActions, dispatchDOMEvent } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';
import usePermissionsBySite from '@craftercms/studio-ui/hooks/usePermissionsBySite';
import { useSpreadState } from '@craftercms/studio-ui/hooks/useSpreadState';
import { useSelection } from '@craftercms/studio-ui/hooks/useSelection';
import useDetailedItem from '@craftercms/studio-ui/hooks/useDetailedItem';
import { PublishFormData } from '@craftercms/studio-ui/models/Publishing';
import { hasInitialPublish as hasInitialPublishService } from '@craftercms/studio-ui/services/sites';
import { bulkGoLive, fetchPublishingTargets } from '@craftercms/studio-ui/services/publishing';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { showErrorDialog } from '@craftercms/studio-ui/state/reducers/dialogs/error';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { isBlank } from '@craftercms/studio-ui/utils/string';
import { useTheme } from '@mui/material/styles';
import {
  Paper,
  Box,
  Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { PublishOnDemandForm, DialogFooter } from '@craftercms/studio-ui';

import { BULK_PUBLISH_ASSETS_DEFAULTS } from '../utils';

// for 4.1.x since `@craftercms/studio-ui/PathSelector` is not a valid component
// @ts-ignore
const PathSelector = craftercms.components.SiteSearchPathSelector;

const messages = defineMessages({
  publishStudioWarning: {
    id: 'publishingDashboard.warning',
    defaultMessage:
      "This will force publish all items that match the pattern requested including their dependencies, and it may take a long time depending on the number of items. Please make sure that all modified items (including potentially someone's work in progress) are ready to be published before continuing."
  },
  warningLabel: {
    id: 'words.warning',
    defaultMessage: 'Warning'
  },
  publishStudioNote: {
    id: 'publishingDashboard.studioNote',
    defaultMessage:
      'Publishing by path should be used to publish changes made in Studio via the UI. For changes made via direct git actions, please <a>publish by commit or tag</a>.'
  },
  publishSuccess: {
    id: 'publishingDashboard.publishSuccess',
    defaultMessage: 'Published successfully.'
  },
  bulkPublishStarted: {
    id: 'publishingDashboard.bulkPublishStarted',
    defaultMessage: 'Bulk Publish process has been started.'
  },
  invalidForm: {
    id: 'publishingDashboard.invalidForm',
    defaultMessage: 'You cannot publish until form requirements are satisfied.'
  }
});

export interface BulkPublishViewProps {
  defaultPath: string;
};

export function BulkPublishView(props: Readonly<BulkPublishViewProps>) {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const theme = useTheme();
  const permissionsBySite = usePermissionsBySite();
  const hasPublishPermission = permissionsBySite[siteId]?.includes('publish');
  const initialPublishItem = useDetailedItem('/site/website/index.xml');
  const [path, setPath] = useState(props.defaultPath ?? BULK_PUBLISH_ASSETS_DEFAULTS.defaultPath);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bulkPublishCommentRequired, publishByCommitCommentRequired } = useSelection(
    (state) => state.uiConfig.publishing
  );

  const initialPublishStudioFormData = {
    path: props.defaultPath ?? BULK_PUBLISH_ASSETS_DEFAULTS.defaultPath,
    publishingTarget: '',
    comment: ''
  };

  const [publishStudioFormData, setPublishStudioFormData] =
    useSpreadState<PublishFormData>(initialPublishStudioFormData);
  const [hasInitialPublish, setHasInitialPublish] = useState(null);
  const [publishingTargets, setPublishingTargets] = useState(null);
  const [publishingTargetsError, setPublishingTargetsError] = useState(null);
  const publishStudioFormValid =
    !isBlank(publishStudioFormData.publishingTarget) &&
    (!bulkPublishCommentRequired || !isBlank(publishStudioFormData.comment)) &&
    publishStudioFormData.path.replace(/\s/g, '') !== '';

  const setDefaultPublishingTarget = (targets, clearData?) => {
    if (targets.length) {
      const stagingEnv = targets.find((target) => target.name === 'staging');
      const publishingTarget = stagingEnv?.name ?? targets[0].name;
      setPublishStudioFormData({
        ...(clearData && initialPublishStudioFormData),
        publishingTarget
      });
    }
  };

  useEffect(() => {
    hasInitialPublishService(siteId).subscribe({
      next(response) {
        setHasInitialPublish(response);
      },
      error(error) {
        dispatch(showErrorDialog(error));
      }
    });
    fetchPublishingTargets(siteId).subscribe({
      next({ publishingTargets: targets }) {
        setPublishingTargets(targets);
        // Set pre-selected environment.
        setDefaultPublishingTarget(targets);
      },
      error(error) {
        setPublishingTargetsError(error);
      }
    });
    // We only want to re-fetch the publishingTargets when the site changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);

  const onSubmitBulkPublish = () => {
    const eventId = 'bulkPublishWidgetSubmit';
    const studioNote = formatMessage(messages.publishStudioNote, { a: (msg) => msg[0] });
    dispatch(
      showConfirmDialog({
        body: `${formatMessage(messages.publishStudioWarning)} ${studioNote}`,
        onCancel: batchActions([closeConfirmDialog(), dispatchDOMEvent({ id: eventId, button: 'cancel' })]),
        onOk: batchActions([closeConfirmDialog(), dispatchDOMEvent({ id: eventId, button: 'ok' })])
      })
    );
    createCustomDocumentEventListener<{ button: 'ok' | 'cancel' }>(eventId, ({ button }) => {
      if (button === 'ok') {
        setIsSubmitting(true);
        const { path, publishingTarget, comment } = publishStudioFormData;
        bulkGoLive(siteId, path, publishingTarget, comment).subscribe({
          next() {
            setIsSubmitting(false);
            setPublishStudioFormData({ ...initialPublishStudioFormData, publishingTarget });
            dispatch(
              showSystemNotification({
                message: formatMessage(messages.bulkPublishStarted)
              })
            );
          },
          error({ response }) {
            setIsSubmitting(false);
            showSystemNotification({
              message: response.message,
              options: { variant: 'error' }
            });
          }
        });
      }
    });
  };

  const customEventId = 'dialogDismissConfirm';
  const onInitialPublish = () => {
    dispatch(
      showPublishDialog({
        items: [initialPublishItem],
        onSuccess: batchActions([closePublishDialog(), dispatchDOMEvent({ id: customEventId, type: 'publish' })]),
        onClosed: dispatchDOMEvent({ id: customEventId, type: 'cancel' })
      })
    );

    createCustomDocumentEventListener(customEventId, ({ type }) => {
      type === 'publish' && setHasInitialPublish(true);
    });
  };

  const onPathSelected = (value) => {
    setPath(value);
    setPublishStudioFormData({
      ...publishStudioFormData,
      path: value
    })
  };

  if (hasInitialPublish === null) {
    return (
      <Paper elevation={2} sx={{ height: '100%' }}>
        <Typography>Loading...</Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} sx={{ height: '100%' }}>
        <Box sx={{ p: 1 }}>
          {hasInitialPublish ? (
            <>
              <Box sx={{ paddingBottom: 1 }}>
                <PathSelector value={path} disabled={false} onPathSelected={onPathSelected} stripXmlIndex={false} />
              </Box>
              <PublishOnDemandForm
                disabled={isSubmitting}
                formData={publishStudioFormData}
                setFormData={setPublishStudioFormData}
                mode={'studio'}
                publishingTargets={publishingTargets}
                publishingTargetsError={publishingTargetsError}
                bulkPublishCommentRequired={bulkPublishCommentRequired}
                publishByCommitCommentRequired={publishByCommitCommentRequired}
              />
              <DialogFooter>
                <LoadingButton
                  sx={{ float: 'right' }}
                  variant="contained"
                  color="primary"
                  disabled={!publishStudioFormValid}
                  loading={isSubmitting}
                  onClick={onSubmitBulkPublish}
                >
                  Bulk Publish
                </LoadingButton>
              </DialogFooter>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                rowGap: theme.spacing(2),
                padding: theme.spacing(5)
              }}
            >
              <InfoOutlinedIcon
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '1.75rem'
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '470px',
                  textAlign: 'center'
                }}
              >
                <FormattedMessage
                  id="publishOnDemand.noInitialPublish"
                  defaultMessage="The project needs to undergo its initial publish before other publishing options become available"
                />
              </Typography>
              {hasPublishPermission && (
                <LoadingButton variant="contained" color="primary" onClick={onInitialPublish}>
                  <FormattedMessage id="publishOnDemand.publishEntireProject" defaultMessage="Publish Entire Project" />
                </LoadingButton>
              )}
            </Box>
          )}
        </Box>
      </Paper>
  );
}

export default BulkPublishView;