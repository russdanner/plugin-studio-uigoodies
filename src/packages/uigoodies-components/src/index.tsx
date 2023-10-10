import { PluginDescriptor } from '@craftercms/studio-ui';
import EditOrViewCurrent from './components/EditOrViewCurrent';
import PublishOrRequestPublish from './components/PublishOrRequestPublish';
import ToolPanelAccordion from './components/ToolPanelAccordion';
import ContentUpload from './components/ContentUpload';
import OpenContentUploadPanelButton from './components/OpenContentUploadPanelButton';
import OpenContentUploadToolbarButton from './components/OpenContentUploadToolbarButton';
import PullPushRemoteButtons from './components/PullPushRemoteButtons';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.uigoodies',
  widgets: {
    'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
    'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish,
    'org.rd.plugin.uigoodies.ToolPanelAccordion': ToolPanelAccordion,
    'org.rd.plugin.uigoodies.ContentUpload': ContentUpload,
    'org.rd.plugin.uigoodies.openContentUploadPanelButton': OpenContentUploadPanelButton,
    'org.rd.plugin.uigoodies.openContentUploadToolbarButton': OpenContentUploadToolbarButton,
    'org.rd.plugin.uigoodies.PullPushRemoteButtons': PullPushRemoteButtons,
  }
};

export { EditOrViewCurrent, PublishOrRequestPublish, ToolPanelAccordion, PullPushRemoteButtons };

export default plugin;
