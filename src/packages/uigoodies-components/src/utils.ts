import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useDispatch } from 'react-redux';

export const CONTENT_UPLOAD_DEFAULTS = {
  title: 'Content Upload',
  defaultPath: '/site',
  icon: { id: '@mui/icons-material/FileUploadOutlined' },
  allowPathSelection: true,
  allowPathInput: false
};

export const BULK_PUBLISH_ASSETS_DEFAULTS = {
  title: 'Bulk Publish Assets',
  defaultPath: '/static-assets',
  icon: { id: '@mui/icons-material/AutoAwesomeMotionOutlined' }
};

export function useOpenContentUpload(props: { title?: string; defaultPath?: string; allowPathSelection?: boolean; allowPathInput?: boolean; }) {
  const dispatch = useDispatch();
  return () => dispatch(
    showWidgetDialog({
      title: props.title ?? CONTENT_UPLOAD_DEFAULTS.title,
      fullHeight: false,
      fullWidth: false,
      widget: {
        id: 'org.rd.plugin.uigoodies.ContentUpload',
        configuration: {
          defaultPath: props.defaultPath ?? CONTENT_UPLOAD_DEFAULTS.defaultPath,
          allowPathSelection: props.allowPathSelection ?? CONTENT_UPLOAD_DEFAULTS.allowPathSelection,
          allowPathInput: props.allowPathInput ?? CONTENT_UPLOAD_DEFAULTS.allowPathInput
        }
      }
    })
  );
};

export function useOpenBulkPublishAssets(props: { title?: string; defaultPath?: string; allowPathSelection?: boolean; allowPathInput?: boolean; }) {
  const dispatch = useDispatch();
  return () => dispatch(
    showWidgetDialog({
      title: props.title ?? BULK_PUBLISH_ASSETS_DEFAULTS.title,
      fullHeight: false,
      fullWidth: false,
      widget: {
        id: 'org.rd.plugin.uigoodies.bulkPublishView',
        configuration: {
          defaultPath: props.defaultPath ?? BULK_PUBLISH_ASSETS_DEFAULTS.defaultPath
        }
      }
    })
  );
};
