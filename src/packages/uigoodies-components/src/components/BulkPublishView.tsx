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
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { of } from 'rxjs';
import { expand, toArray, concatMap } from 'rxjs/operators';
import { closePublishDialog, showPublishDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { fetchUnpublished } from '@craftercms/studio-ui/services/dashboard';
import { batchActions, dispatchDOMEvent } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';
import usePermissionsBySite from '@craftercms/studio-ui/hooks/usePermissionsBySite';
import useDetailedItem from '@craftercms/studio-ui/hooks/useDetailedItem';
import { hasInitialPublish as hasInitialPublishService } from '@craftercms/studio-ui/services/sites';
import { showSystemNotification, showPublishItemSuccessNotification } from '@craftercms/studio-ui/state/actions/system';
import { showErrorDialog } from '@craftercms/studio-ui/state/reducers/dialogs/error';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { useTheme } from '@mui/material/styles';
import { Paper, Box, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DialogBody, DialogFooter } from '@craftercms/studio-ui';

import { BULK_PUBLISH_DEFAULTS } from '../utils';

// for 4.1.x since `@craftercms/studio-ui/PathSelector` is not a valid component
// @ts-ignore
const PathSelector = craftercms.components.SiteSearchPathSelector;

const FETCH_UNPUBLISHED_ITEMS_LIMIT = 100;

export interface BulkPublishViewProps {
  defaultPath: string;
}

export function BulkPublishView(props: Readonly<BulkPublishViewProps>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const theme = useTheme();
  const permissionsBySite = usePermissionsBySite();
  const hasPublishPermission = permissionsBySite[siteId]?.includes('publish');
  const initialPublishItem = useDetailedItem('/site/website/index.xml');
  const [selectedPath, setSelectedPath] = useState(props.defaultPath ?? BULK_PUBLISH_DEFAULTS.defaultPath);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasInitialPublish, setHasInitialPublish] = useState(null);

  useEffect(() => {
    hasInitialPublishService(siteId).subscribe({
      next(response) {
        setHasInitialPublish(response);
      },
      error(error) {
        dispatch(showErrorDialog(error));
      }
    });
  }, [siteId]);

  const customEventId = 'dialogDismissConfirm';
  const onSubmitBulkPublish = () => {
    setIsSubmitting(true);

    const fetchItems = (offset) => fetchUnpublished(siteId, { limit: FETCH_UNPUBLISHED_ITEMS_LIMIT, offset });
    const itemsByPath = [];
    of(0)
      .pipe(
        concatMap((offset) => fetchItems(offset)),
        expand((data) => {
          itemsByPath.push(...data.filter((item) => item.path.startsWith(selectedPath)));
          return data.total > data.limit + data.offset ? fetchItems(data.limit + data.offset) : of();
        }),
        toArray()
      )
      .subscribe({
        complete: () => {
          if (itemsByPath.length === 0) {
            dispatch(
              showSystemNotification({
                message: 'No items to publish at provided path'
              })
            );
            setIsSubmitting(false);
            return;
          }

          dispatch(
            showPublishDialog({
              items: itemsByPath,
              onSuccess: batchActions([
                showPublishItemSuccessNotification(),
                closePublishDialog(),
                dispatchDOMEvent({ id: customEventId, type: 'publish' })
              ]),
              onClosed: dispatchDOMEvent({ id: customEventId, type: 'cancel' })
            })
          );
          setIsSubmitting(false);
        }
      });
  };

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

  const onPathSelected = (value: string) => {
    setSelectedPath(value.replace('/index.xml', ''));
  };

  if (hasInitialPublish === null) {
    return <Paper elevation={2} sx={{ height: '100%' }} />;
  }

  return (
    <Paper elevation={2} sx={{ height: '100%' }}>
      <Box sx={{ p: 1 }}>
        {hasInitialPublish ? (
          <>
            <DialogBody sx={{ minHeight: '24vh', minWidth: '48vh' }}>
              <Typography
                variant="body1"
                sx={{
                  paddingBottom: 2,
                  float: 'left'
                }}
              >
                Select a path to calculate publish packages.
              </Typography>
              <Box sx={{ paddingBottom: 1 }}>
                <PathSelector
                  value={selectedPath}
                  disabled={false}
                  onPathSelected={onPathSelected}
                  stripXmlIndex={false}
                />
              </Box>
            </DialogBody>
            <DialogFooter>
              <Button
                sx={{ float: 'right' }}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={onSubmitBulkPublish}
              >
                Bulk Publish
              </Button>
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
