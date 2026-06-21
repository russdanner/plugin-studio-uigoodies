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

### Recommended: install script

From this repo (on the **Studio server**, or with `path` pointing at a clone on that host):

```bash
cp scripts/.studio-token.example scripts/.studio-token   # paste a fresh Bearer token
./scripts/install-plugin.sh YOUR-SITE-ID http://YOUR-STUDIO:8080
```

The script:

1. Runs `yarn dist` in `src/packages/uigoodies-components` (fresh `index.js`)
2. Calls `POST /studio/api/2/marketplace/copy` (commits into the site sandbox)
3. Reloads Groovy plugin scripts
4. Optionally merges `uigoodies-plugin-whitelist.append` into the **site sandbox** whitelist only when `SKIP_WHITELIST=0` (skipped by default; never touches Studio global whitelist)

### Manual CURL install

1. Build the UI: `cd src/packages/uigoodies-components && yarn install && yarn dist`
2. Create a Studio API token.
3. Run marketplace/copy — **`path` must exist on the Studio host**, not only on your laptop:

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
  --header 'Authorization: Bearer YOUR_STUDIO_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "siteId": "YOUR-SITE-ID",
    "path": "/absolute/path/on/studio/server/plugin-studio-uigoodies",
    "parameters": {}
  }'
```

4. Reload scripts: `GET /studio/api/2/plugin/script/reload?siteId=YOUR-SITE-ID&token=YOUR_TOKEN`
5. Hard-refresh Studio (Ctrl+Shift+R).

### Remote server checklist (works locally, fails elsewhere)

| Check | Why it matters |
|-------|----------------|
| Plugin repo cloned **on the Studio server** | `marketplace/copy` reads `path` from Studio's filesystem |
| `yarn dist` run before copy | Without it, sites get stale or missing `index.js` |
| Bump `craftercms-plugin.yaml` version after changes | Marketplace may skip unchanged plugin artifacts |
| Groovy script reload after install | Updated `.groovy` / class files are not live until reload |
| `studio.scripting.sandbox.whitelist.enable: true` | Manually append `authoring/config/studio/extension/groovy/uigoodies-plugin-whitelist.append` to your Studio whitelist path; install script does not modify it |
| `studio.scripting.restrictBeans: true` | Add `cstudioContentService,dependencyServiceInternal,studio.gitRepositoryHelper,contentRepository,sitesService,processedCommitsDao` to `studio.scripting.allowedBeans` |

Do **not** rsync into `static-assets/` at the site root — marketplace maps plugin assets to `config/studio/static-assets/...`. Manual copies leave dirty git and wrong paths.

See [docs/GROOVY_SANDBOX.md](docs/GROOVY_SANDBOX.md) for sandbox and bean-restriction details.

### Installation note for Project Tools auto-wiring

This plugin now includes auto-wiring in `craftercms-plugin.yaml` to add Project Tools entries:

- **Copy Content Types (cross-project)** (URL: `uigoodies-cross-site-content-types`)
- **Cross Site Copy** (URL: `uigoodies-cross-site-content-copy`) — copy content items (and optional dependencies) to another project
- **OpenSearch playground** (URL: `uigoodies-opensearch-playground`) — raw OpenSearch DSL against Engine `search.json` for the active site
- **Tomcat Log** (URL: `uigoodies-log-tail`) — live SSE tail of `catalina.out` via an Engine REST script; the server only streams while the panel is open
- **Image Studio** (Tools Panel sidebar) — crop, focal point, adjustments, and image size requirements lookup

If you are upgrading from a previous install, re-install/upgrade the plugin so the auto-wiring section is applied.
If your project manages `config/studio/ui.xml` manually, merge the generated tool entry into
`//reference[@id='craftercms.siteTools']/tools`.

# Building

To build this plugin on your own, make your customizations as required, then run `yarn` and then `yarn dist` in the
`uigoodies-components` folder. The output will be placed in the `/authoring` folder of this project.

## CodeRabbit review (working tree)

Review uncommitted plugin source with the [CodeRabbit CLI](https://docs.coderabbit.ai/cli):

```bash
cr auth login
./scripts/coderabbit-review-working-tree.sh
```

By default the script reviews changes under `src/packages/uigoodies-components/src`, `authoring/scripts`, and `docs` (not the generated bundle in `authoring/static-assets/`). Use `--full` for the entire working tree, or `--dir PATH` for a single path. Agent-friendly output: `./scripts/coderabbit-review-working-tree.sh --agent`.

# Widgets

Registered widgets use plugin id **`org.rd.plugin.uigoodies`**, app **`uigoodies`**, file **`index.js`**. Each doc under **[`docs/widgets/`](docs/widgets/README.md)** includes a **`## Configuration`** section with copy-paste **`ui.xml`** (or Project Tools `<tool>`) examples, or TypeScript for embedded-only views.

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
| `org.rd.plugin.uigoodies.CrossSiteContentCopy` | Project tool: multi-select cross-site content copy with plan preview, per-item actions, and switch-to-destination after copy. | [cross-site-content-copy.md](docs/widgets/cross-site-content-copy.md) |
| `org.rd.plugin.uigoodies.ComponentPreviewPathNavigator` | Path navigator that opens headless/component preview URLs with path mapping. | [component-preview-path-navigator.md](docs/widgets/component-preview-path-navigator.md) |
| `org.rd.plugin.uigoodies.OpenSearchPlayground` | Project tool: Explorer + Dictionary tabs for schema/content-type discovery, expanded Search API options, and raw OpenSearch JSON against Engine `search.json`. | [open-search-playground.md](docs/widgets/open-search-playground.md) |
| `org.rd.plugin.uigoodies.LogTail` | Project tool: SSE live tail of `catalina.out` (colorized, collapsible stack traces, fullscreen). Server-side script streams only while the panel is open. | [log-tail.md](docs/widgets/log-tail.md) |
  