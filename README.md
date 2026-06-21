# Studio UI Goodies

This is a plugin that contains a number of UI "Goodies."

What is a goodie? Nothing specific. This plugin is a collection of UI tweaks and alternatives to
help you customize the editing experience for your content authors to make them as efficient as
possible.

If you see a widget that helps you here, install it and be happy. If not, make the world a better
place by doing a bit of programming and send us pull request :)

**Full documentation:** [docs/README.md](docs/README.md) — installation, requirements, Translation setup, and per-widget configuration.

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

1. Runs `yarn dist` in `src/packages/uigoodies-components`, `custom-locale`, and `translation-versions`
2. Calls `POST /studio/api/2/marketplace/copy` (commits into the site sandbox)
3. Reloads Groovy plugin scripts
4. Merges optional `ui.xml` fragments (Image Studio, DevContentOps, Translation tool + toolbar) unless `SKIP_UI_XML=1`
5. Optionally merges `uigoodies-plugin-whitelist.append` into the **site sandbox** whitelist only when `SKIP_WHITELIST=0` (skipped by default)

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for environment variables, post-install checklist, and REST API index.

### Manual CURL install

1. Build all bundles on the Studio host:

```bash
cd src/packages/uigoodies-components && yarn install && yarn dist
cd ../custom-locale && yarn install && yarn dist
cd ../translation-versions && yarn install && yarn dist
```

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

This plugin auto-wires Project Tools entries in `craftercms-plugin.yaml`:

- **Content Type Copy** (`uigoodies-cross-site-content-types`)
- **Cross Site Copy** (`uigoodies-cross-site-content-copy`)
- **OpenSearch** (`uigoodies-opensearch-playground`)
- **Log Tail** (`uigoodies-log-tail`)
- **DevContentOps Tools** (`uigoodies-dev-content-ops`)
- **Translation** (`uigoodies-translation-config`) — locales, content-type fields, locale site scaffold

Also auto-wired when install merges `ui.xml`:

- **Image Studio** (Tools Panel sidebar)
- **Translation** preview toolbar button (visible when ≥2 locales configured)

**Form controls** (`custom-locale`, `translation-versions`) register via the plugin descriptor; bundles install to `config/studio/static-assets/plugins/.../control/`.

If you are upgrading from a previous install, re-install/upgrade the plugin so auto-wiring is applied.
If your project manages `config/studio/ui.xml` manually, merge fragments from `authoring/config/studio/` or see [docs/INSTALLATION.md](docs/INSTALLATION.md).

**Translation sites:** after install, follow [docs/TRANSLATION_SETUP.md](docs/TRANSLATION_SETUP.md) (locales, content types, global vs locale homes).

# Building

To build this plugin on your own, make your customizations as required, then run `yarn` and `yarn dist` in:

- `src/packages/uigoodies-components` (main Studio UI bundle)
- `src/packages/custom-locale` (form control)
- `src/packages/translation-versions` (form control)

Output is placed in `/authoring/static-assets/plugins/org/rd/plugin/uigoodies/`.

## CodeRabbit review (working tree)

Review uncommitted plugin source with the [CodeRabbit CLI](https://docs.coderabbit.ai/cli):

```bash
cr auth login
./scripts/coderabbit-review-working-tree.sh
```

By default the script reviews changes under `src/packages/uigoodies-components/src`, `authoring/scripts`, and `docs` (not the generated bundle in `authoring/static-assets/`). Use `--full` for the entire working tree, or `--dir PATH` for a single path. Agent-friendly output: `./scripts/coderabbit-review-working-tree.sh --agent`.

# Widgets

Registered widgets use plugin id **`org.rd.plugin.uigoodies`**, app **`uigoodies`**, file **`index.js`**. Each doc under **[`docs/widgets/`](docs/widgets/README.md)** includes a **`## Configuration`** section with copy-paste **`ui.xml`** (or Project Tools `<tool>`) examples.

Screenshots below are from Studio **Project Tools**, the **Tools Panel**, and the **preview toolbar**. Full widget index at the end of this section.

## Project Tools

### OpenSearch Playground

Explorer, OpenSearch DSL editor, and live JSON from Engine `search.json`.

![OpenSearch Playground — Explorer, DSL editor, and response](docs/images/opensearch-playground.png)

Doc: [open-search-playground.md](docs/widgets/open-search-playground.md)

### Log Tail

Live SSE tail of Tomcat `catalina.out` (and related logs) while the panel is open.

![Log Tail — streaming log console](docs/images/log-tail.png)

Doc: [log-tail.md](docs/widgets/log-tail.md)

### DevContentOps Tools

Git log, working tree, branches, database maintenance, repository health, and site item state management for any Studio project you can access.

**Git log** — commit graph, patches, ingestion sync, cross-project patch apply:

![DevContentOps Tools — Git log tab](docs/images/dev-content-ops-git-log.png)

**Working tree** — stage, commit, discard, clean, resolve conflicts:

![DevContentOps Tools — Working tree tab](docs/images/dev-content-ops-working-tree.png)

**Repository health** — git-sizer-style metrics and safe optimize operations:

![DevContentOps Tools — Repository health tab](docs/images/dev-content-ops-repository-health.png)

**Site items** — filter by path/type/state; bulk state updates:

![DevContentOps Tools — Site items tab](docs/images/dev-content-ops-site-items.png)

**Database** — audit history and processed-commits cache (ingestion helper):

![DevContentOps Tools — Database tab](docs/images/dev-content-ops-database.png)

Doc: [dev-content-ops-tools.md](docs/widgets/dev-content-ops-tools.md)

### Cross Site Copy

Multi-select copy between projects with plan preview, per-item actions, and switch-to-destination after copy.

![Cross Site Copy — source, destination, and preview](docs/images/cross-site-content-copy.png)

![Cross Site Copy — copy results](docs/images/cross-site-content-copy-results.png)

Doc: [cross-site-content-copy.md](docs/widgets/cross-site-content-copy.md)

### Translation (Project Tool)

Locales, content-type Translation field readiness, and locale site scaffold. See [TRANSLATION_SETUP.md](docs/TRANSLATION_SETUP.md).

Doc: [translation-config-tools.md](docs/widgets/translation-config-tools.md)

## Tools Panel

### Image Studio

Crop, focal point, filters, adjustments, draw annotations, resize, and save back to `/static-assets`.

![Image Studio editor](docs/images/image-studio-editor.png)

Docs: [open-image-studio-panel-button.md](docs/widgets/open-image-studio-panel-button.md), [image-studio.md](docs/widgets/image-studio.md)

## Preview toolbar

### Translation

Locale picker and copy (visible when ≥2 locales are configured in `translation-config.xml`).

![Preview toolbar — Translation button with other toolbar widgets](docs/images/translation-toolbar.png)

Docs: [translation-tools.md](docs/widgets/translation-tools.md)

### Device simulator

Responsive preview presets in a flyout (ICE-compatible `devices` configuration).

![Device simulator flyout on preview toolbar](docs/images/device-simulator-toolbar.png)

Doc: [device-simulator-flyout-toolbar-button.md](docs/widgets/device-simulator-flyout-toolbar-button.md)

## Form controls

Translation form controls (`custom-locale`, `translation-versions`) render inside the Content Form when content types include the Translation section. Setup: [TRANSLATION_SETUP.md](docs/TRANSLATION_SETUP.md).

## Full widget index

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
| `org.rd.plugin.uigoodies.OpenSearchPlayground` | Project tool: Explorer + Dictionary tabs, OpenSearch DSL, Engine `search.json`. | [open-search-playground.md](docs/widgets/open-search-playground.md) |
| `org.rd.plugin.uigoodies.LogTail` | Project tool: SSE live tail of Tomcat/deployer/search logs. | [log-tail.md](docs/widgets/log-tail.md) |
| `org.rd.plugin.uigoodies.DevContentOpsTools` | Project tool: git log, working tree, branches, repo health, item states. | [dev-content-ops-tools.md](docs/widgets/dev-content-ops-tools.md) |
| `org.rd.plugin.uigoodies.TranslationConfigTools` | Project tool: `translation-config.xml`, content-type Translation fields, locale scaffold. | [translation-config-tools.md](docs/widgets/translation-config-tools.md) |
| `org.rd.plugin.uigoodies.TranslationDialog` | Translation dialog (locale tree + copy). | [translation-tools.md](docs/widgets/translation-tools.md) |
| `org.rd.plugin.uigoodies.openTranslationToolbarButton` | Preview toolbar → locale picker / copy. | [translation-tools.md](docs/widgets/translation-tools.md) |
| `org.rd.plugin.uigoodies.openTranslationPanelButton` | Tools panel translation entry (optional). | [translation-tools.md](docs/widgets/translation-tools.md) |
| `org.rd.plugin.uigoodies.openImageStudioPanelButton` | Sidebar → Image Studio dialog. | [open-image-studio-panel-button.md](docs/widgets/open-image-studio-panel-button.md) |
| `org.rd.plugin.uigoodies.ImageStudio` | Image Studio UI (embedded in dialog). | [image-studio.md](docs/widgets/image-studio.md) |

### Form controls (separate bundles)

| Control | Field id | Doc |
|---------|----------|-----|
| `custom-locale` | `localeSourceId_s` | [translation-tools.md](docs/widgets/translation-tools.md), [TRANSLATION_SETUP.md](docs/TRANSLATION_SETUP.md) |
| `translation-versions` | `translations` | [translation-tools.md](docs/widgets/translation-tools.md), [TRANSLATION_SETUP.md](docs/TRANSLATION_SETUP.md) |

Full widget index: [docs/widgets/README.md](docs/widgets/README.md).
  