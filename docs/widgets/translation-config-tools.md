# Translation (`org.rd.plugin.uigoodies.TranslationConfigTools`)

**Project Tool** for managing site translation settings, content-type readiness, and locale site structure.

**Full setup workflow:** [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md)

## What it does

### Locales tab

- Loads and edits `/config/studio/translation-config.xml` (**not** `site-config.xml`)
- Set default locale; add/remove locales; **reorder** (order is used by all translation UIs)
- Optionally set per-locale **language** (display name) and **flag** (saved only when overridden)
- Creates the config file if missing (requires at least two locales)
- **Create locale site structure** — global home + per-locale home pages and component folders (see below)

### Content types tab

- Scans all content types and reports Translation readiness against **all** required form pieces
- Status **Ready** only when every requirement is present and correctly typed
- Shows missing items, e.g. `localeCode_s (readonly input)`, `translations (translation-versions control)`
- Bulk-fixes a locale/translation form section with standard fields on selected content types
- **Form section options** (before Scan / Fix):
  - **Section title when creating new** — default `Translation`
  - **Prefer existing section if present** — default includes `Alternative Locale Properties` (Smart Copy). If that section already exists, Fix reuses it and **preserves** other fields in the section
- Re-running **Fix translation setup** also moves the section last and collapses it when needed

Uses Studio configuration APIs (`fetchConfigurationXML` / `writeConfiguration`) — no custom Groovy on this tab.

## Required form pieces (content types)

| Requirement | Details |
|-------------|---------|
| Locale / translation section | Default title `Translation`, or a preferred existing title such as `Alternative Locale Properties` |
| `localeCode_s` | `input`, readonly `true` |
| `sourceLocaleCode_s` | `input`, readonly `true` |
| `localeSourceId_s` | `custom-locale` plugin control |
| `translations` | `translation-versions` plugin control (field id must be `translations`) |

## Create locale site structure

From the **Locales** tab, creates or updates:

| Path | Internal name | Lineage |
|------|---------------|---------|
| `/site/website/index.xml` | Global Home | **Standalone** `localeSourceId_s` (not grouped with locale homes) |
| `/site/website/{locale}/index.xml` | Home (LOCALE) | **Shared** `localeSourceId_s` among locale homes only |
| `/site/components/{locale}/` | — | Empty folders when `/site/components` exists |

- New locale homes are copied via `translation-copy` (unique `objectId` each).
- Existing locale homes are updated in place (not overwritten).
- If a locale home shares `objectId` with global home, scaffold assigns a new `objectId`.
- If global and locale homes incorrectly shared one `localeSourceId_s`, scaffold separates them.

## Configuration (`config/studio/ui.xml`)

Merge under **`//reference[@id='craftercms.siteTools']/tools`**:

```xml
<tool>
   <title id="uigoodies.translationConfigTools.title" defaultMessage="Translation"/>
   <icon id="@mui/icons-material/TranslateRounded"/>
   <url>uigoodies-translation-config</url>
   <widget id="org.rd.plugin.uigoodies.TranslationConfigTools">
      <plugin id="org.rd.plugin.uigoodies"
              site="{site}"
              type="apps"
              name="uigoodies"
              file="index.js"/>
   </widget>
</tool>
```

Auto-wired on plugin install via `craftercms-plugin.yaml`. The install script merges `authoring/config/studio/ui-translation-config-tools.append.xml` unless `SKIP_UI_XML=1`.

See also [translation-tools.md](translation-tools.md) for preview toolbar and form controls.
