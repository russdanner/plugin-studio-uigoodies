# Translation Tools

Locale-aware copy and translation management for multi-language CrafterCMS sites.

**Setup guide:** [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md) (locales, content types, global vs locale homes, scaffold).

## Features

- **Preview toolbar** — Copy current page into another locale (mirrored path). Hidden until ≥2 locales exist in `translation-config.xml`.
- **Form controls** — `custom-locale` (lineage) and `translation-versions` (siblings, compare, translate, remove). The Translations panel at the top of the form is collapsible; open/closed is stored per site in `localStorage` and shared across all forms for that site.
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
| `translation-locales` | GET | Config plus every locale variant of an item in one call (see below) |
| `translation-siblings` | POST | Find sibling translations |
| `translation-remove-candidates` | POST | List deletable locale components |
| `translation-remove` | POST | Delete translation and optional components |

### `translation-locales`

The **Translations** form control and the preview toolbar button each make a single request to this endpoint instead of probing every locale from the browser.

`GET translation-locales?siteId={site}&path={repo path}`

| Param | Required | Notes |
|-------|----------|-------|
| `siteId` | yes | |
| `path` | no | Item repo path, e.g. `/site/website/en/about/index.xml`. Without it only the config is returned. |
| `contentType`, `localeSourceId`, `objectId`, `sourceLocale` | no | Override the values read from the saved item (the form control sends unsaved form values). |

For each configured locale, the server:

1. Maps the configured code to the locale folder on disk (`ar-sa` vs `ar-SA`, `zh` vs `zh-cn`).
2. Finds lineage matches in the preview index (same `content-type`, and `localeSourceId_s` equal to the item's `localeSourceId_s` or `objectId`). In the item's own locale, the item itself always wins.
3. Falls back to the mirrored path `{root}/{locale}{relative path}`.
4. Reads the modified date of each existing variant and flags variants that are older than the source-locale variant.

The response contains `baseLanguage` and `languages` (same shape as `translation-config`), `currentLocale`, `sourceLocale`, `relativeUnderLocale`, and `locales[]` in config order. Each `locales[]` row has: `locale`, `code`, `label`, `flag`, `path`, `parentPath`, `exists`, `lastModified` (epoch ms), `isSource`, `isOutdated`, `isCurrent`, `isPage` and `matchedBy` (`lineage` or `folder`).

See [../TRANSLATION_SPEC.md](../TRANSLATION_SPEC.md) for the product spec.
