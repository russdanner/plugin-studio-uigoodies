import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useDispatch } from 'react-redux';

export const CONTENT_UPLOAD_DEFAULTS = {
  title: 'Content Upload',
  defaultPath: '/site',
  icon: { id: '@mui/icons-material/FileUploadOutlined' },
  allowPathSelection: true
}

export function useOpenContentUpload(props: { title?: string; defaultPath?: string; allowPathSelection?: boolean; }) {
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
          allowPathSelection: props.allowPathSelection ?? CONTENT_UPLOAD_DEFAULTS.allowPathSelection
        }
      }
    })
  );
}
