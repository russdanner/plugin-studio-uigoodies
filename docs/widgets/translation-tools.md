# Translation Tools

Locale-aware copy and translation management for multi-language CrafterCMS sites.

**Setup guide:** [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md) (locales, content types, global vs locale homes, scaffold).

## Features

- **Preview toolbar** — Copy current page into another locale (mirrored path). Hidden until ≥2 locales exist in `translation-config.xml`.
- **Form controls** — `custom-locale` (lineage) and `translation-versions` (siblings, compare, translate, remove)
- **REST API** — Server-side copy with new `objectId` and locale field normalization
- **Translation Project Tool** — See [translation-config-tools.md](translation-config-tools.md)

## Lineage model

| Item | `localeSourceId_s` | `objectId` | Notes |
|------|-------------------|------------|--------|
| Global home (`/site/website/index.xml`) | **Own** id (not shared with locale homes) | Unique | `localeCode_s` = `sourceLocaleCode_s` = default locale |
| Locale home (`/site/website/{locale}/index.xml`) | **Shared** across all locale homes | **Unique** per locale | e.g. Home (EN), Home (ES) |

`translation-siblings` and the **Translations** form control group items by `localeSourceId_s`. Global home must not share that id with locale homes.

Scaffold (**Project Tools → Translation → Create locale site structure**) enforces this separation. See [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md).

## Required content-type fields

Every translatable type needs **all** of:

1. **Translation** section (first in form)
2. `localeCode_s` — readonly `input`
3. `sourceLocaleCode_s` — readonly `input`
4. `localeSourceId_s` — `custom-locale` control
5. `translations` — `translation-versions` control

Scan and bulk-add via **Project Tools → Translation → Content types**.

## Configuration

### Site locale config

`/config/studio/translation-config.xml` (module `studio`). Edited in **Project Tools → Translation → Locales**.

Read at runtime via `translation-config.get`.

### Preview toolbar (manual merge)

If auto-install did not patch `ui.xml`, merge:

`authoring/config/studio/ui-translation-toolbar.append.xml`

into `config/studio/ui.xml` under the Preview toolbar `rightSection/widgets`.

Widget: `org.rd.plugin.uigoodies.openTranslationToolbarButton`

### Form controls

Bundles (installed with plugin):

- `config/studio/static-assets/plugins/org/rd/plugin/uigoodies/control/custom-locale/main.js`
- `config/studio/static-assets/plugins/org/rd/plugin/uigoodies/control/translation-versions/main.js`

Register in form definitions:

```xml
<plugin>
  <pluginId>org.rd.plugin.uigoodies</pluginId>
  <type>control</type>
  <name>custom-locale</name>
  <filename>main.js</filename>
</plugin>
```

```xml
<plugin>
  <pluginId>org.rd.plugin.uigoodies</pluginId>
  <type>control</type>
  <name>translation-versions</name>
  <filename>main.js</filename>
</plugin>
```

Also registered via `craftercms-plugin.yaml` (`type: form-control`).

### Widget IDs

| Widget | ID |
|--------|-----|
| Translation dialog | `org.rd.plugin.uigoodies.TranslationDialog` |
| Preview toolbar | `org.rd.plugin.uigoodies.openTranslationToolbarButton` |
| Tools panel (optional) | `org.rd.plugin.uigoodies.openTranslationPanelButton` |
| Configuration / scaffold | `org.rd.plugin.uigoodies.TranslationConfigTools` |

## REST endpoints

Base: `/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/`

| Script | Method | Purpose |
|--------|--------|---------|
| `translation-copy` | POST | Copy item; new `objectId`; locale metadata |
| `translation-config` | GET | Read site locale list |
| `translation-siblings` | POST | Find sibling translations |
| `translation-remove-candidates` | POST | List deletable locale components |
| `translation-remove` | POST | Delete translation and optional components |

See [../TRANSLATION_SPEC.md](../TRANSLATION_SPEC.md) for the product spec.
