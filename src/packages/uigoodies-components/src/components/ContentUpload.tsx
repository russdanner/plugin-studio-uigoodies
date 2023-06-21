/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
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

import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  showPathSelectionDialog,
  closePathSelectionDialog,
  pathSelectionDialogClosed
} from '@craftercms/studio-ui/state/actions/dialogs';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { dispatchDOMEvent, batchActions } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { writeContent } from '@craftercms/studio-ui/services/content';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

export interface ContentUploadProps {
  defaultPath: string;
}

export function ContentUpload(props: ContentUploadProps) {
  console.log(props);
  const [path, setPath] = useState(props.defaultPath ?? '');
  const [content, setContent] = useState('');
  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const siteId = useActiveSiteId();

  const handleSelectPath = () => {
    const rootPath = '/site';
    const callbackId = 'pathSelectionDialogCallback';
    const callbackAccept = 'accept';

    dispatch(
      showPathSelectionDialog({
        rootPath: rootPath ?? `/${path.split('/')[1] ?? ''}`,
        initialPath: path,
        showCreateFolderOption: false,
        allowSwitchingRootPath: !rootPath,
        stripXmlIndex: true,
        onClosed: batchActions([dispatchDOMEvent({
          id: callbackId,
          action: 'close'
        }), pathSelectionDialogClosed()]),
        onOk: batchActions([dispatchDOMEvent({
          id: callbackId,
          action: callbackAccept
        }), closePathSelectionDialog()])
      })
    );

    createCustomDocumentEventListener(callbackId, (detail) => {
      if (detail.action === callbackAccept) {
        const path = detail.path;
        setPath(path);
      }
    });
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(event.target.files[0], 'UTF-8');
    reader.onload = (e) => {
      setContent(e.target.result as string);
    };

    reader.onerror = (e) => {
      dispatch(showSystemNotification({
        message: `Error while reading file. Please try again.`,
        options: { variant: 'error' }
      }));
    };
  };

  const handleUploadXMLFile = () => {
    if (!content) {
      return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content as string, 'text/xml');
    const contentTypeNode = xmlDoc.evaluate('/*/content-type', xmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
    const fileNameNode = xmlDoc.evaluate('/*/file-name', xmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (!contentTypeNode || !fileNameNode) {
      dispatch(showSystemNotification({ message: 'Invalid XML document. Cannot upload content' }));
      return;
    }

    const contentType = contentTypeNode.childNodes[0].nodeValue;
    const fileName = fileNameNode.childNodes[0].nodeValue;
    const contentFullPath = `${path}/${fileName}`;

    setProcessing(true);
    writeContent(siteId, contentFullPath, content).subscribe({
      next: () => {
        setContent('');
        setProcessing(false);
        inputRef.current.value = null;
        dispatch(showSystemNotification({ message: 'Content uploaded to the destination.' }));
      },
      error: (e) => {
        console.error(e);
        setProcessing(false);
        dispatch(showSystemNotification({ message: `Error while uploading content: ${(e as Error).message}` }));
      }
    });
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, padding: '50px' }}>
        <Grid container spacing={4}>
          <Grid xs={12} sx={{ display: 'inline-flex', marginTop: '30px', alignItems: 'center' }}>
            <Grid xs={8}>
              <TextField
                id="path-read-only-input"
                label="Path to upload"
                value={path}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid xs={4} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={handleSelectPath}
                disabled={processing}
                sx={{
                  minWidth: '130px'
                }}
              >
                Select Path
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12} sx={{ display: 'inline-flex', marginTop: '30px', alignItems: 'center' }}>
            <Grid
              xs={8}
              sx={{
                '& input::file-selector-button': {
                  'display': 'inline-flex',
                  '-webkit-box-align': 'center',
                  'align-items': 'center',
                  '-webkit-box-pack': 'center',
                  'justify-content': 'center',
                  'position': 'relative',
                  'box-sizing': 'border-box',
                  '-webkit-tap-highlight-color': 'transparent',
                  'outline': '0px',
                  'border': '0px',
                  'margin': '0px',
                  'cursor': 'pointer',
                  'user-select': 'none',
                  'vertical-align': 'middle',
                  'appearance': 'none',
                  'text-decoration': 'none',
                  'text-transform': 'none',
                  'font-weight': '600',
                  'font-size': '0.875rem',
                  'line-height': '1.75',
                  'padding': '6px 16px',
                  'border-radius': '4px',
                  'transition': 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  'color': 'rgb(255, 255, 255)',
                  'background-color': 'rgb(0, 122, 255)',
                  'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
                  'min-width': '130px',
                  'marginRight': '10px',
                  'font-family': '"Source Sans Pro", "Open Sans", sans-serif'
                }
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xml"
                onChange={onFileChange}
                onClick={() => {
                  inputRef.current.value = null;
                }}
              />
            </Grid>
            <Grid xs={4} sx={{ textAlign: 'center' }}>
              <LoadingButton
                variant="contained"
                onClick={handleUploadXMLFile}
                loading={processing}
                disabled={!content}
                loadingPosition="start"
                sx={{ minWidth: '130px' }}
              >
                Upload Content
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ContentUpload;
