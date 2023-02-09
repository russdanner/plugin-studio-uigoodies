import { PluginDescriptor } from '@craftercms/studio-ui';
import EditOrViewCurrent from './components/EditOrViewCurrent';
import PublishOrRequestPublish from './components/PublishOrRequestPublish';
import ToolPanelAccordion from './components/ToolPanelAccordion';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.uigoodies',
  widgets: {
    'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
    'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish,
    'org.rd.plugin.uigoodies.ToolPanelAccordion': ToolPanelAccordion
  }
};

export { EditOrViewCurrent, PublishOrRequestPublish, ToolPanelAccordion };

export default plugin;
