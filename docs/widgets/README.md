# Studio UI Goodies — widgets

Each file in this folder documents one **registered widget** (or embedded view used by open buttons). Plugin id: **`org.rd.plugin.uigoodies`**, app bundle: **`uigoodies`** / `index.js`.

**Installation and requirements:** [../INSTALLATION.md](../INSTALLATION.md) · **Translation setup:** [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md) · **Doc index:** [../README.md](../README.md)

**Every widget doc includes a `## Configuration` section** with a copy-paste **`config/studio/ui.xml`** example: either a `<widget>` snippet (toolbar / tools panel) or a full **Project Tools** `<tool>` block where that applies.

| Widget ID | Description | Page |
|-----------|-------------|------|
| `org.rd.plugin.uigoodies.EditOrViewCurrent` | Toolbar edit / view toggle for the current preview item. | [edit-or-view-current.md](edit-or-view-current.md) |
| `org.rd.plugin.uigoodies.PublishOrRequestPublish` | Toolbar publish or request-publish. | [publish-or-request-publish.md](publish-or-request-publish.md) |
| `org.rd.plugin.uigoodies.ToolPanelAccordion` | Accordion grouping for multiple tools panel shortcuts. | [tool-panel-accordion.md](tool-panel-accordion.md) |
| `org.rd.plugin.uigoodies.openContentUploadPanelButton` | Sidebar button → content upload dialog. | [open-content-upload-panel-button.md](open-content-upload-panel-button.md) |
| `org.rd.plugin.uigoodies.openContentUploadToolbarButton` | Preview toolbar button → content upload dialog. | [open-content-upload-toolbar-button.md](open-content-upload-toolbar-button.md) |
| `org.rd.plugin.uigoodies.ContentUpload` | Upload UI embedded in upload dialogs (usually not wired in `ui.xml` directly). | [content-upload-view.md](content-upload-view.md) |
| `org.rd.plugin.uigoodies.openBulkPublishPanelButton` | Sidebar button → bulk publish from a root path. | [open-bulk-publish-panel-button.md](open-bulk-publish-panel-button.md) |
| `org.rd.plugin.uigoodies.openBulkPublishToolbarButton` | Toolbar button → bulk publish dialog. | [open-bulk-publish-toolbar-button.md](open-bulk-publish-toolbar-button.md) |
| `org.rd.plugin.uigoodies.bulkPublishView` | Bulk publish UI embedded in dialogs. | [bulk-publish-view.md](bulk-publish-view.md) |
| `org.rd.plugin.uigoodies.PullPushRemoteButtons` | Toolbar Git pull/push for a configured remote and branches. | [pull-push-remote-buttons.md](pull-push-remote-buttons.md) |
| `org.rd.plugin.uigoodies.CopyCurrentPageUrl` | Copy preview or environment URL with `[URL]` / `[SITEID]` patterns. | [copy-current-page-url.md](copy-current-page-url.md) |
| `org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton` | Audience targeting in a preview-toolbar popover. | [audience-targeting-flyout-toolbar-button.md](audience-targeting-flyout-toolbar-button.md) |
| `org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton` | Device size presets in a preview-toolbar popover. | [device-simulator-flyout-toolbar-button.md](device-simulator-flyout-toolbar-button.md) |
| `org.rd.plugin.uigoodies.openCannedSearchPanelButton` | Sidebar shortcut to Search with preset query or dialog. | [open-canned-search-panel-button.md](open-canned-search-panel-button.md) |
| `org.rd.plugin.uigoodies.openCannedSearchToolbarButton` | Toolbar shortcut to Search with preset query or dialog. | [open-canned-search-toolbar-button.md](open-canned-search-toolbar-button.md) |
| `org.rd.plugin.uigoodies.CrossSiteContentTypeCopy` | Project tool: copy content types between sites. | [cross-site-content-type-copy.md](cross-site-content-type-copy.md) |
| `org.rd.plugin.uigoodies.CrossSiteContentCopy` | Project tool: multi-select cross-site content copy with plan preview, item actions, and switch-to-destination. | [cross-site-content-copy.md](cross-site-content-copy.md) |
| `org.rd.plugin.uigoodies.ComponentPreviewPathNavigator` | Sidebar path navigator that opens component preview URLs. | [component-preview-path-navigator.md](component-preview-path-navigator.md) |
| `org.rd.plugin.uigoodies.OpenSearchPlayground` | Project tool: Explorer + Dictionary tabs, expanded Search API options, OpenSearch DSL editor, and Engine `search.json`. | [open-search-playground.md](open-search-playground.md) |
| `org.rd.plugin.uigoodies.LogTail` | Project tool: live SSE tail of Tomcat `catalina.out`, colorized levels, collapsible stack traces, fullscreen. Server streams only while the panel is open. | [log-tail.md](log-tail.md) |
| `org.rd.plugin.uigoodies.openImageStudioPanelButton` | Sidebar button → Image Studio dialog (crop, focal point, adjust, save). | [open-image-studio-panel-button.md](open-image-studio-panel-button.md) |
| `org.rd.plugin.uigoodies.ImageStudio` | Image editing UI embedded in Image Studio dialog. | [image-studio.md](image-studio.md) |
| `org.rd.plugin.uigoodies.DevContentOpsTools` | Project tool: git log graph, remotes, patches, ingestion sync. | [dev-content-ops-tools.md](dev-content-ops-tools.md) |
| `org.rd.plugin.uigoodies.TranslationConfigTools` | Project tool: edit translation-config.xml and add Translation fields to content types. | [translation-config-tools.md](translation-config-tools.md) |
| `org.rd.plugin.uigoodies.TranslationDialog` | Translation dialog (locale path tree + copy). | [translation-tools.md](translation-tools.md) |
| `org.rd.plugin.uigoodies.openTranslationToolbarButton` | Preview toolbar → translation locale picker. | [translation-tools.md](translation-tools.md) |
| `org.rd.plugin.uigoodies.openTranslationPanelButton` | Tools panel locale picker + copy actions. | [translation-tools.md](translation-tools.md) |

### Form controls (separate bundles)

| Control | Field id | Doc |
|---------|----------|-----|
| `custom-locale` | `localeSourceId_s` | [translation-tools.md](translation-tools.md), [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md) |
| `translation-versions` | `translations` | [translation-tools.md](translation-tools.md), [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md) |

Back to repository root: [../../README.md](../../README.md).
