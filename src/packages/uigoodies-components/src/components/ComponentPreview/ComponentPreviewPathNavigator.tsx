import React from 'react';
import useActiveSite from '@craftercms/studio-ui/hooks/useActiveSite';
import { useDispatch } from 'react-redux';
import { pathNavigatorFetchPath } from '@craftercms/studio-ui/state/actions/pathNavigator';
import { PathNavigator } from '@craftercms/studio-ui/components';
import { Alert, AlertTitle } from '@mui/material';
import { DetailedItem } from '@craftercms/studio-ui';
import { isFolder } from './utils';
import { getSystemLink } from './system';
import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { changeCurrentUrl} from '@craftercms/studio-ui/state/actions/preview';

type Item = {
  source: string;
  target: string;
  idParameter: string;
};

type Paths = {
  item: Item | Item[];
};

type ComponentPreviewPathNavigator = {
  icon: string;
  label: string;
  rootPath: string;
  limit: number;
  excludedPaths: string; // comma separated
  nonPreviewablePaths: string; // comma separated
  paths: Paths;
};

const ComponentPreviewPathNavigator = (props: ComponentPreviewPathNavigator) => {
  const dispatch = useDispatch();
  const { id: siteId } = useActiveSite();

  const pathNavigatorId = 'componentPreviewPathNavigator';

  const doesPathMatchRegex = (inputPath) => {
    const regexList = props.nonPreviewablePaths.split(',');
    for (let i = 0; i < regexList.length; i++) {
      const regex = new RegExp(`^${regexList[i]}$`);
      if (regex.test(inputPath)) {
        return true;
      }
    }
    return false;
  };

  const onItemClicked = (item: DetailedItem, e: React.MouseEvent) => {
    if (isFolder(item)) {
      onPathSelected(item);
    } else {
      // show edit form
      // const foundExactMatch = props.nonPreviewablePaths.includes(item.path);
      // const itemFolderPath = item.path.substring(0, item.path.lastIndexOf('/'));
      // const foundFolderMatch = props.nonPreviewablePaths.includes(itemFolderPath);
      const isLevelDescriptor = item.path
        .substring(item.path.length, item.path.lastIndexOf('/'))
        .includes('crafter-level-descriptor.level.xml');
      const isNotPreviewable = doesPathMatchRegex(item.path);
      if (isNotPreviewable) {
        showEditForm(item);
        return;
      }

      let path;
      if (props.paths.item[0]) {
        const paths = Object.values(props.paths.item);
        paths.map((p) => {
          const path_without_extension = item.path.substring(0, item.path.lastIndexOf('/'));
          if (isLevelDescriptor && path_without_extension.includes(p.source) && p.isLevelDescriptor) {
            path = p;
            return;
          }
          if (path_without_extension.includes(p.source) && !p.isLevelDescriptor) {
            path = p;
            return;
          }
        });
      } else {
        path = props.paths.item;
      }

      // construct preview path
      let previewPath = item.path
          .substring(0, item.path.length - 4) // remove .xml extension
          .replace(path.source, path.target)

      if(path.idParameter) {
        // if optional idParameter is supplied, restructure previewPath with parameter
        let id = previewPath.substring(previewPath.lastIndexOf("/")+1)
        previewPath = previewPath.replace("/"+id, "?"+path.idParameter+"="+id)
      }

      // Send path to preview in xb
      dispatch(changeCurrentUrl(previewPath));
    }
  };

  const onPathSelected = (item: DetailedItem) => {
    dispatch(
      pathNavigatorFetchPath({
        id: pathNavigatorId,
        path: item.path
      })
    );
  };

  const validConfigurationExists = () => {
    return props.icon && props.label && props.rootPath && props.limit;
  };

  const showEditForm = (item: DetailedItem) => {
    const authoringBase = '/studio';
    dispatch(
      showEditDialog({
        path: item.path,
        authoringBase,
        site: siteId,
        readonly: true
      })
    );
  };

  return (
    <div>
      {validConfigurationExists() ? (
        <PathNavigator
          id={pathNavigatorId}
          label={props.label}
          rootPath={props.rootPath}
          onItemClicked={onItemClicked}
          icon={{ id: props.icon }}
          limit={props.limit}
          excludes={props.excludedPaths?.split(',') ?? []}
        />
      ) : (
        <Alert severity="warning">
          <AlertTitle>Component Preview Path Navigator plugin configuration not found</AlertTitle>
          Please edit the ui.xml file and configure the widget as described in the README.md.
        </Alert>
      )}
    </div>
  );
};

export default ComponentPreviewPathNavigator;
