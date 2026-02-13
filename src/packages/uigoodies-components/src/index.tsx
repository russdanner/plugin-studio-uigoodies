import { PluginDescriptor } from '@craftercms/studio-ui';
import EditOrViewCurrent from './components/EditOrViewCurrent';
import PublishOrRequestPublish from './components/PublishOrRequestPublish';
import ToolPanelAccordion from './components/ToolPanelAccordion';
import ContentUpload from './components/ContentUpload';
import OpenContentUploadPanelButton from './components/OpenContentUploadPanelButton';
import OpenContentUploadToolbarButton from './components/OpenContentUploadToolbarButton';
import PullPushRemoteButtons from './components/PullPushRemoteButtons';
import BulkPublishView from './components/BulkPublishView';
import OpenBulkPublishPanelButton from './components/OpenBulkPublishPanelButton';
import OpenBulkPublishToolbarButton from './components/OpenBulkPublishToolbarButton';
import CopyCurrentPageUrl from './components/CopyCurrentPageUrl';
import ComponentPreviewPathNavigator from './components/ComponentPreview/ComponentPreviewPathNavigator';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.uigoodies',
  widgets: {
    'org.rd.plugin.uigoodies.ComponentPreviewPathNavigator': ComponentPreviewPathNavigator,
    'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
    'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish,
    'org.rd.plugin.uigoodies.ToolPanelAccordion': ToolPanelAccordion,
    'org.rd.plugin.uigoodies.ContentUpload': ContentUpload,
    'org.rd.plugin.uigoodies.openContentUploadPanelButton': OpenContentUploadPanelButton,
    'org.rd.plugin.uigoodies.openContentUploadToolbarButton': OpenContentUploadToolbarButton,
    'org.rd.plugin.uigoodies.PullPushRemoteButtons': PullPushRemoteButtons,
    'org.rd.plugin.uigoodies.bulkPublishView': BulkPublishView,
    'org.rd.plugin.uigoodies.openBulkPublishPanelButton': OpenBulkPublishPanelButton,
    'org.rd.plugin.uigoodies.openBulkPublishToolbarButton': OpenBulkPublishToolbarButton,
    'org.rd.plugin.uigoodies.CopyCurrentPageUrl': CopyCurrentPageUrl
  }
};

export {
  ComponentPreviewPathNavigator,
  EditOrViewCurrent,
  PublishOrRequestPublish,
  ToolPanelAccordion,
  ContentUpload,
  OpenContentUploadPanelButton,
  OpenContentUploadToolbarButton,
  PullPushRemoteButtons,
  BulkPublishView,
  OpenBulkPublishPanelButton,
  OpenBulkPublishToolbarButton,
  CopyCurrentPageUrl
};

export default plugin;
