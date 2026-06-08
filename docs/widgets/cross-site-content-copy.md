# Cross-site content copy (`org.rd.plugin.uigoodies.CrossSiteContentCopy`)

**Project Tool** (or sidebar embedded app) that lets authors copy **content items** from the active project to another project they can access.

## What it does

Single-page flow with three sections:

1. **Source content** — browse with the path selector; confirming a path **auto-adds** it to the selected-items list (pages, folders, or components). Multiple sources are supported.
2. **Destination** — pick another project from the sites API and optionally include **dependencies** (**Copy Dependencies** is checked by default).
3. **Preview** — auto-builds a copy plan when source list + destination are set; shows every file to copy with overwrite warnings.

After **Copy**, results list each item with a green check (success) or red X (failure). When at least one item copies successfully, **Switch to {destinationSiteId}** opens that project in Studio (same as the project switcher).

### Selected items list

Each row shows:

- Workflow / publishing state icon and content-type icon
- Internal name and source path on one line (ellipsis when long)
- **⋮** menu: **View**, **History**, **Dependencies** (Studio dialogs for the source item)
- Remove (trash)

### Preview list

Same row layout as selected items (no action menu). Trailing chips show **Primary** / **Dependency** and **Create** / **Overwrite**.

## Server scripts

| Script | Method | Purpose |
|--------|--------|---------|
| `cross-site-content-copy-plan` | POST | Builds the copy plan (paths, dependencies, overwrite detection) |
| `cross-site-content-copy` | POST | Executes the copy via `cstudioContentService` APIs (no direct filesystem writes) |

**Base URL:** `/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/...?siteId={sourceSiteId}`

**Request body:**

```json
{
  "sourcePaths": ["/site/website/about/index.xml", "/site/components/headers/main.xml"],
  "destinationSiteId": "copy-to",
  "copyDependencies": true
}
```

Legacy single `sourcePath` is still accepted. Invalid JSON returns **400**. If `copyDependencies` is true and `dependencyServiceInternal` is unavailable, returns **500**.

Beans: `cstudioContentService`, `dependencyServiceInternal` (via `applicationContext.get(...)`).

## Permissions

The user should have:

- Read access on the source project for all paths being copied
- Write access on the destination project

## Configuration

### Project Tools (`config/studio/ui.xml`)

Merge a `<tool>` under **`//reference[@id='craftercms.siteTools']/tools`**:

```xml
<tool>
    <title id="uigoodies.crossSiteContentCopy.title" defaultMessage="Cross Site Copy"/>
    <icon id="@mui/icons-material/ContentCopyOutlined"/>
    <url>uigoodies-cross-site-content-copy</url>
    <widget id="org.rd.plugin.uigoodies.CrossSiteContentCopy">
        <plugin
                id="org.rd.plugin.uigoodies"
                site="{site}"
                type="apps"
                name="uigoodies"
                file="index.js"
        />
    </widget>
</tool>
```

`craftercms-plugin.yaml` can auto-wire this entry on plugin install.

### Sidebar (optional)

Embed in the tools panel with `ToolsPanelEmbeddedAppViewButton`:

```xml
<widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
    <configuration>
        <title id="uigoodies.crossSiteContentCopy.title" defaultMessage="Cross Site Copy"/>
        <icon id="@mui/icons-material/ContentCopyOutlined"/>
        <widget id="org.rd.plugin.uigoodies.CrossSiteContentCopy">
            <plugin id="org.rd.plugin.uigoodies" site="{site}" type="apps" name="uigoodies" file="index.js"/>
        </widget>
    </configuration>
</widget>
```
