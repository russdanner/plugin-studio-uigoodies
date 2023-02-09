import { PluginDescriptor } from '@craftercms/studio-ui';
import EditOrViewCurrent from './components/EditOrViewCurrent';
import PublishOrRequestPublish from './components/PublishOrRequestPublish';
import ToolPanelAccordian from './components/ToolPanelAccordian';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.uigoodies',
  widgets: {
    'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
    'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish,
    'org.rd.plugin.uigoodies.ToolPanelAccordian': ToolPanelAccordian
  }
};

export { EditOrViewCurrent, PublishOrRequestPublish };

export default plugin;
