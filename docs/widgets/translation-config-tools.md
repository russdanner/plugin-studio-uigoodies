# Translation (`org.rd.plugin.uigoodies.TranslationConfigTools`)

**Project Tool** for managing site translation settings, content-type readiness, and locale site structure.

**Full setup workflow:** [../TRANSLATION_SETUP.md](../TRANSLATION_SETUP.md)

## What it does

### Locales tab

- Loads and edits `/config/studio/translation-config.xml`
- Set default locale and manage the locale list (add/remove)
- Creates the config file if missing (requires at least two locales)
- **Create locale site structure** — global home + per-locale home pages and component folders (see below)

### Content types tab

- Scans all content types and reports Translation readiness against **all** required form pieces
- Status **Ready** only when every requirement is present and correctly typed
- Shows missing items, e.g. `localeCode_s (readonly input)`, `translations (translation-versions control)`
- Bulk-adds a **Translation** section (first in form) with standard fields to selected content types
- Re-running **Add translation fields** also reorders the Translation section to the top when needed

Uses Studio configuration APIs (`fetchConfigurationXML` / `writeConfiguration`) — no custom Groovy on this tab.

## Required form pieces (content types)

| Requirement | Details |
|-------------|---------|
| Translation section | Section title `Translation` |
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
