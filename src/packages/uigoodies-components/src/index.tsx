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
import CrossSiteContentTypeCopy from './components/CrossSiteContentTypeCopy';
import CrossSiteContentCopy from './components/CrossSiteContentCopy';
import AudienceTargetingFlyoutToolbarButton from './components/AudienceTargetingFlyoutToolbarButton';
import DeviceSimulatorFlyoutToolbarButton from './components/DeviceSimulatorFlyoutToolbarButton';
import OpenCannedSearchPanelButton from './components/OpenCannedSearchPanelButton';
import OpenCannedSearchToolbarButton from './components/OpenCannedSearchToolbarButton';
import OpenSearchPlayground from './components/OpenSearchPlayground';
import LogTail from './components/LogTail';
import ImageStudio from './components/ImageStudio/ImageStudio';
import OpenImageStudioPanelButton from './components/OpenImageStudioPanelButton';
import DevContentOpsTools from './components/DevContentOps/DevContentOpsTools';
import TranslationDialog from './components/Translation/TranslationDialog';
import TranslationConfigTools from './components/Translation/TranslationConfigTools';
import OpenTranslationPanelButton from './components/Translation/components/OpenTranslationPanelButton';
import OpenTranslationToolbarButton from './components/Translation/components/OpenTranslationToolbarButton';

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
    'org.rd.plugin.uigoodies.CopyCurrentPageUrl': CopyCurrentPageUrl,
    'org.rd.plugin.uigoodies.CrossSiteContentTypeCopy': CrossSiteContentTypeCopy,
    'org.rd.plugin.uigoodies.CrossSiteContentCopy': CrossSiteContentCopy,
    'org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton': AudienceTargetingFlyoutToolbarButton,
    'org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton': DeviceSimulatorFlyoutToolbarButton,
    'org.rd.plugin.uigoodies.openCannedSearchPanelButton': OpenCannedSearchPanelButton,
    'org.rd.plugin.uigoodies.openCannedSearchToolbarButton': OpenCannedSearchToolbarButton,
    'org.rd.plugin.uigoodies.OpenSearchPlayground': OpenSearchPlayground,
    'org.rd.plugin.uigoodies.LogTail': LogTail,
    'org.rd.plugin.uigoodies.ImageStudio': ImageStudio,
    'org.rd.plugin.uigoodies.openImageStudioPanelButton': OpenImageStudioPanelButton,
    'org.rd.plugin.uigoodies.DevContentOpsTools': DevContentOpsTools,
    'org.rd.plugin.uigoodies.TranslationConfigTools': TranslationConfigTools,
    'org.rd.plugin.uigoodies.TranslationDialog': TranslationDialog,
    'org.rd.plugin.uigoodies.openTranslationPanelButton': OpenTranslationPanelButton,
    'org.rd.plugin.uigoodies.openTranslationToolbarButton': OpenTranslationToolbarButton
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
  CopyCurrentPageUrl,
  CrossSiteContentTypeCopy,
  CrossSiteContentCopy,
  AudienceTargetingFlyoutToolbarButton,
  DeviceSimulatorFlyoutToolbarButton,
  OpenCannedSearchPanelButton,
  OpenCannedSearchToolbarButton,
  OpenSearchPlayground,
  LogTail,
  ImageStudio,
  OpenImageStudioPanelButton,
  DevContentOpsTools,
  TranslationConfigTools,
  TranslationDialog,
  OpenTranslationPanelButton,
  OpenTranslationToolbarButton
};

export default plugin;
