# Studio UI Goodies — documentation

Plugin id: **`org.rd.plugin.uigoodies`**

This folder documents installation, configuration, and every widget / REST surface shipped with the plugin.

## Start here

| Document | Contents |
|----------|----------|
| [INSTALLATION.md](INSTALLATION.md) | Requirements, build, `install-plugin.sh`, post-install checklist, `ui.xml`, form controls, REST index |
| [TRANSLATION_SETUP.md](TRANSLATION_SETUP.md) | Locale config, content-type fields, global vs locale homes, scaffold, toolbar, form controls |
| [GROOVY_SANDBOX.md](GROOVY_SANDBOX.md) | Groovy sandbox, beans, whitelist (optional) |
| [TRANSLATION_SPEC.md](TRANSLATION_SPEC.md) | Product spec and phased delivery notes |

## Widget reference

Each registered React widget is documented under **[widgets/](widgets/README.md)** with a `## Configuration` section and copy-paste `ui.xml` examples.

### Project Tools (auto-wired on install)

| Tool | Widget ID | Doc |
|------|-----------|-----|
| Content Type Copy | `org.rd.plugin.uigoodies.CrossSiteContentTypeCopy` | [cross-site-content-type-copy.md](widgets/cross-site-content-type-copy.md) |
| Cross Site Copy | `org.rd.plugin.uigoodies.CrossSiteContentCopy` | [cross-site-content-copy.md](widgets/cross-site-content-copy.md) |
| OpenSearch | `org.rd.plugin.uigoodies.OpenSearchPlayground` | [open-search-playground.md](widgets/open-search-playground.md) |
| Log Tail | `org.rd.plugin.uigoodies.LogTail` | [log-tail.md](widgets/log-tail.md) |
| DevContentOps Tools | `org.rd.plugin.uigoodies.DevContentOpsTools` | [dev-content-ops-tools.md](widgets/dev-content-ops-tools.md) |
| Translation | `org.rd.plugin.uigoodies.TranslationConfigTools` | [translation-config-tools.md](widgets/translation-config-tools.md) |

### Tools panel & preview toolbar

| Feature | Widget ID(s) | Doc |
|---------|--------------|-----|
| Image Studio | `openImageStudioPanelButton`, `ImageStudio` | [open-image-studio-panel-button.md](widgets/open-image-studio-panel-button.md), [image-studio.md](widgets/image-studio.md) |
| Translation (toolbar) | `openTranslationToolbarButton`, `TranslationDialog`, `openTranslationPanelButton` | [translation-tools.md](widgets/translation-tools.md) |
| Content upload, bulk publish, search, etc. | See [widgets/README.md](widgets/README.md) | — |

### Form controls (separate JS bundles)

| Control | Field id | Bundle path |
|---------|----------|-------------|
| `custom-locale` | `localeSourceId_s` | `control/custom-locale/main.js` |
| `translation-versions` | `translations` | `control/translation-versions/main.js` |

Registered via `craftercms-plugin.yaml` (`type: form-control`). See [TRANSLATION_SETUP.md](TRANSLATION_SETUP.md).

## Repository layout (after install)

Assets land in the **site sandbox** under:

```
config/studio/static-assets/plugins/org/rd/plugin/uigoodies/
  apps/uigoodies/index.js          # main React bundle
  control/custom-locale/main.js
  control/translation-versions/main.js
config/studio/scripts/rest/plugins/org/rd/plugin/uigoodies/*.groovy
config/studio/scripts/classes/plugins/org/rd/plugin/uigoodies/*.groovy
```

Back to [../README.md](../README.md).
