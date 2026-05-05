# Studio UI Goodies

This is a plugin that contains a number of UI "Goodies."

What is a goodie? Nothing specific. This plugin is a collection of UI tweaks and alternatives to
help you customize the editing experience for your content authors to make them as efficient as
possible.

If you see a widget that helps you here, install it and be happy. If not, make the world a better
place by doing a bit of programming and send us pull request :)

# Installation

[//]: # (## Install via CrafterCMS Marketplace)

[//]: # (Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.)

## Install based on this repository

You can install this plugin by cloning this repository and using the Studio API.

1. Create a Studio API token.
2. Execute the following CURL command a terminal

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer YOUR_STUDIO_API_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "YOUR-SITE-ID",
  "path": "THE_ABSOLUTEL_FILE_SYSTEM_PATH_TO_THIS_REPO",
  "parameters": { }
}
```

Here is a real-life functioning example:

```bash
curl --location --request POST 'http://localhost:8080/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiY3R5IjoiSldUIiwicDJjIjo2NTUzNiwicDJzIjoiQ0hmZDQ4SmlsT1I5bzVociJ9.Iq5RcXLbT85nTXKWFr054e0LZ-RaMpkVVdAo5UtqW17hgkJ_MNPIXPf_NcW9q-GuRsHpCjtwbhTjgHHLdLK8vbl8Kb3dKsS-.HdJcVASJ1_SnaafB5hiY2g.T0hOxNfhfDuhVPEF1lCgCCuuChpj_8tvpD48CXo8RoXOXqa-fgkyOV88dk0OaRDmKY2QLcPeiQAddGI_gsn_bJd0LM0lA_zVpDdiUkWvDYzO5tDefpG3z7tfC5DWIkHUtPQBlWLNkkIzNyv2xsSEQUGClPurP2Bue70Q8WG75YPZkhl6uw2FWKM_ida3kyCakOgt51TVKN3Fbn4MbtuzX6f5Rc0QPOs0i9E0ejejfL5U4sHu-0ULFTPmSrECxcSg_yjPRu2Z39IhPPJ44ehMClho4kWGtsLnMiP0380BkspNTEN1O8tUl1D3bZ5nznC_iat0EM651t-uFAGrVKrlsg.9P0gqUGEvr6XDFXm8Py_0hdfXKcdF7BR8T_2gqu7Jcw' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "ed3",
  "path": "/Volumes/Projects/repositories/plugin-studio-uigoodies",
  "parameters": { }
}'
```

### Installation note for Project Tools auto-wiring

This plugin now includes auto-wiring in `craftercms-plugin.yaml` to add Project Tools entries:

- **Copy Content Types (cross-project)** (URL: `uigoodies-cross-site-content-types`)
- **OpenSearch playground** (URL: `uigoodies-opensearch-playground`) — raw OpenSearch DSL against Engine `search.json` for the active site

If you are upgrading from a previous install, re-install/upgrade the plugin so the auto-wiring section is applied.
If your project manages `config/studio/ui.xml` manually, merge the generated tool entry into
`//reference[@id='craftercms.siteTools']/tools`.

# Building

To build this plugin on your own, make your customizations as required, then run `yarn` and then `yarn dist` in the
`uigoodies-components` folder. The output will be placed in the `/authoring` folder of this project.

# Widgets

Registered widgets use plugin id **`org.rd.plugin.uigoodies`**, app **`uigoodies`**, file **`index.js`**. Full XML, tables, and notes for each widget live under **[`docs/widgets/`](docs/widgets/README.md)**.

| Widget ID | What it does | Doc |
|-----------|----------------|-----|
| `org.rd.plugin.uigoodies.EditOrViewCurrent` | Toolbar toggle between edit and view for the current preview item. | [edit-or-view-current.md](docs/widgets/edit-or-view-current.md) |
| `org.rd.plugin.uigoodies.PublishOrRequestPublish` | Toolbar publish / request publish. | [publish-or-request-publish.md](docs/widgets/publish-or-request-publish.md) |
| `org.rd.plugin.uigoodies.ToolPanelAccordion` | Groups several tools-panel shortcuts in one accordion. | [tool-panel-accordion.md](docs/widgets/tool-panel-accordion.md) |
| `org.rd.plugin.uigoodies.openContentUploadPanelButton` | Sidebar control opening the content upload dialog. | [open-content-upload-panel-button.md](docs/widgets/open-content-upload-panel-button.md) |
| `org.rd.plugin.uigoodies.openContentUploadToolbarButton` | Preview toolbar control for content upload. | [open-content-upload-toolbar-button.md](docs/widgets/open-content-upload-toolbar-button.md) |
| `org.rd.plugin.uigoodies.ContentUpload` | Upload UI embedded in upload dialogs (not usually added to `ui.xml` directly). | [content-upload-view.md](docs/widgets/content-upload-view.md) |
| `org.rd.plugin.uigoodies.openBulkPublishPanelButton` | Sidebar bulk publish from a configurable root path. | [open-bulk-publish-panel-button.md](docs/widgets/open-bulk-publish-panel-button.md) |
| `org.rd.plugin.uigoodies.openBulkPublishToolbarButton` | Toolbar bulk publish dialog. | [open-bulk-publish-toolbar-button.md](docs/widgets/open-bulk-publish-toolbar-button.md) |
| `org.rd.plugin.uigoodies.bulkPublishView` | Bulk publish UI embedded in dialogs. | [bulk-publish-view.md](docs/widgets/bulk-publish-view.md) |
| `org.rd.plugin.uigoodies.PullPushRemoteButtons` | Toolbar Git pull/push for a named remote and branches. | [pull-push-remote-buttons.md](docs/widgets/pull-push-remote-buttons.md) |
| `org.rd.plugin.uigoodies.CopyCurrentPageUrl` | Copy full preview or environment URLs using `[URL]` / `[SITEID]` patterns. | [copy-current-page-url.md](docs/widgets/copy-current-page-url.md) |
| `org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton` | Audience targeting in a preview-toolbar popover (ICE-compatible `fields`). | [audience-targeting-flyout-toolbar-button.md](docs/widgets/audience-targeting-flyout-toolbar-button.md) |
| `org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton` | Device presets in a preview-toolbar popover (ICE-compatible `devices`). | [device-simulator-flyout-toolbar-button.md](docs/widgets/device-simulator-flyout-toolbar-button.md) |
| `org.rd.plugin.uigoodies.openCannedSearchPanelButton` | Sidebar shortcut to Search (replaces standalone canned-search plugin). | [open-canned-search-panel-button.md](docs/widgets/open-canned-search-panel-button.md) |
| `org.rd.plugin.uigoodies.openCannedSearchToolbarButton` | Toolbar shortcut to Search with the same options as the sidebar widget. | [open-canned-search-toolbar-button.md](docs/widgets/open-canned-search-toolbar-button.md) |
| `org.rd.plugin.uigoodies.CrossSiteContentTypeCopy` | Project tool: copy `config.xml` + `form-definition.xml` for content types between sites. | [cross-site-content-type-copy.md](docs/widgets/cross-site-content-type-copy.md) |
| `org.rd.plugin.uigoodies.ComponentPreviewPathNavigator` | Path navigator that opens headless/component preview URLs with path mapping. | [component-preview-path-navigator.md](docs/widgets/component-preview-path-navigator.md) |
| `org.rd.plugin.uigoodies.OpenSearchPlayground` | Project tool: inferred schema explorer, query builder, and raw OpenSearch JSON against Engine `search.json`. | [open-search-playground.md](docs/widgets/open-search-playground.md) |
