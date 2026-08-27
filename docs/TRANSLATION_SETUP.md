# Translation setup guide

This guide covers everything needed for **locale-aware copy**, **translation lineage**, and the **Translations** form control on multi-locale Crafter sites.

Related docs:

- [widgets/translation-config-tools.md](widgets/translation-config-tools.md) — Project Tool UI
- [widgets/translation-tools.md](widgets/translation-tools.md) — Toolbar, dialog, REST
- [TRANSLATION_SPEC.md](TRANSLATION_SPEC.md) — product spec

## Overview

| Piece | Purpose |
|-------|---------|
| **`translation-config.xml`** | Site locale list and default locale |
| **Project Tool → Translation** | Edit locales, scan content types, scaffold locale folders |
| **Preview toolbar → Translation** | Copy current page into another locale path |
| **Form controls** | `custom-locale`, `translation-versions` on content types |
| **REST `translation-copy`** | Server paste + `objectId` / locale field normalization |

## Requirements

1. **Plugin installed** — see [INSTALLATION.md](INSTALLATION.md) (includes `custom-locale` and `translation-versions` bundles).
2. **At least two locales** in `translation-config.xml` (toolbar and scaffold require this).
3. **Content types** must include all Translation form pieces (see below).
4. **OpenSearch** indexed content (siblings search uses the index; commit content after changes).

## Step 1 — Configure locales

**Project Tools → Translation → Locales tab**

File: `/config/studio/translation-config.xml` (module `studio`)

Locale codes should match first-segment folder names under `/site/website` and `/site/components`.
The plugin catalog includes:

- **ISO 639-1** language codes (e.g. `de`, `fr`, `ja`)
- **Common regional tags** (e.g. `en-gb`, `pt-br`, `zh-cn`)
- **ISO 3166-1 country/market folder codes** when not already a language code (e.g. `jp`, `dk`, `se`)
- **CMS aliases** such as `us`, `uk`, `br`, `cn`, `shared`, `global`, `common`

Note: `uk` is English (UK) for folders; use `ua` / `uk-ua` for Ukrainian. Some rare ISO language codes that collide with market folders (`br`, `ae`, `sa`, `tw`, …) prefer the market label.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<translation-config>
  <defaultLocaleCode>en</defaultLocaleCode>
  <localeCodes>
    <localeCode>en</localeCode>
    <localeCode>es</localeCode>
    <localeCode>ar</localeCode>
  </localeCodes>
</translation-config>
```

Save in Studio and commit. The preview **Translation** toolbar button appears only when **two or more** locale codes are configured.

## Step 2 — Content type form fields

Each translatable content type needs **all** of the following in `form-definition.xml`:

| Requirement | Field / control | Notes |
|-------------|-----------------|-------|
| Locale / translation section | Default title `Translation` | Prefer existing titles (default: `Alternative Locale Properties`) when present; Fix keeps other fields in that section. Section is placed **last** and collapsed by default. |
| Locale code | `localeCode_s` | `input`, **readonly** |
| Source locale | `sourceLocaleCode_s` | `input`, **readonly** |
| Lineage id | `localeSourceId_s` | **`custom-locale`** control (plugin) |
| Translations UI | `translations` | **`translation-versions`** control (plugin) |

**Project Tools → Translation → Content types tab** scans every content type and lists anything missing. Set the form section title / preferred existing titles, then use **Fix translation setup on selected**.

### Form control plugin blocks

```xml
<field>
  <type>custom-locale</type>
  <id>localeSourceId_s</id>
  <title>Locale Source ID</title>
  <plugin>
    <pluginId>org.rd.plugin.uigoodies</pluginId>
    <type>control</type>
    <name>custom-locale</name>
    <filename>main.js</filename>
  </plugin>
</field>
```

```xml
<field>
  <type>translation-versions</type>
  <id>translations</id>
  <title>Translations</title>
  <plugin>
    <pluginId>org.rd.plugin.uigoodies</pluginId>
    <type>control</type>
    <name>translation-versions</name>
    <filename>main.js</filename>
  </plugin>
</field>
```

Controls load from:

`config/studio/static-assets/plugins/org/rd/plugin/uigoodies/control/{name}/main.js`

After adding fields, **commit** form definitions and hard-refresh Studio before testing the Content Form.

## Step 3 — Site structure (global home vs locale homes)

Typical multi-locale layout:

| Path | Role |
|------|------|
| `/site/website/index.xml` | **Global home** — internal-name **Global Home**; **not** grouped with locale-home translations |
| `/site/website/{locale}/index.xml` | **Locale home** — e.g. **Home (EN)**; shares one `localeSourceId_s` across all locale homes |
| `/site/components/{locale}/` | Optional locale component folders |

### Lineage and object IDs

- **Global home** has its own `localeSourceId_s` and `objectId`. `localeCode_s` and `sourceLocaleCode_s` are both the default locale (self-source → not shown as “linked elsewhere”).
- **Locale homes** share a **single** `localeSourceId_s` (translation family). Each locale home has a **unique** `objectId` (assigned on copy via `translation-copy`).
- Global home must **not** share `localeSourceId_s` with locale homes (otherwise it appears as a translation sibling in the form control).

### Create locale site structure

**Project Tools → Translation → Locales tab → Create locale site structure**

This action:

1. Updates `/site/website/index.xml` → **Global Home** with standalone locale metadata.
2. Copies global home into each configured locale folder (or updates existing locale homes).
3. Assigns **Home (LOCALE)** internal names and locale metadata.
4. Ensures locale homes use a **shared** lineage id separate from global.
5. Regenerates `objectId` on a locale home if it incorrectly duplicates the global home’s `objectId`.
6. Creates `/site/components/{locale}/` folders when `/site/components` exists.

Re-run scaffold after changing locales or to fix sites that previously shared one `localeSourceId_s` between global and locale homes.

## Step 4 — Author workflows

### Content Form

Open any translatable item. The **Translations** control (pinned at the top of the form) shows:

- Locale shortcuts and translation list
- Filter, translate, compare, remove actions
- Links to open sibling locale items

The panel is **collapsible**. Collapse/expand is remembered **per site** in the browser (`localStorage`) and applies to all forms for that site.

If the control is missing: scroll to the **Translation** section, hard-refresh, verify form-definition is committed, check the browser console for `[translation-versions]` errors.

### Preview toolbar

With a page open in preview, use **Translation** (or configured label) to pick a target locale and copy the current page under a mirrored path (`translation-copy`).

## REST endpoints

Base: `/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/`

| Script | Method | Purpose |
|--------|--------|---------|
| `translation-config` | GET | Locale list |
| `translation-copy` | POST | Copy + normalize `objectId`, `localeCode_s`, `sourceLocaleCode_s`, `localeSourceId_s` |
| `translation-siblings` | POST | Search siblings |
| `translation-remove-candidates` | POST | Removal candidates |
| `translation-remove` | POST | Delete translations |

`translation-copy` always assigns a **new** `objectId` and updates `objectGroupId` on the pasted item.

## Configuration (`ui.xml`)

### Project Tool

Auto-wired on install. Manual merge: `authoring/config/studio/ui-translation-config-tools.append.xml`

### Preview toolbar

Auto-wired on install. Manual merge: `authoring/config/studio/ui-translation-toolbar.append.xml` under Preview toolbar `rightSection/widgets`.

Toolbar widget: `org.rd.plugin.uigoodies.openTranslationToolbarButton`

## Checklist

- [ ] Plugin installed with form-control bundles built
- [ ] `translation-config.xml` saved with ≥2 locales
- [ ] All translatable content types **Ready** in Content types tab
- [ ] Locale site structure created (global + locale homes)
- [ ] Sandbox changes committed
- [ ] Content Form shows **Translations** control
- [ ] Preview toolbar Translation button visible
- [ ] Test copy to a new locale path and verify siblings in the form control
