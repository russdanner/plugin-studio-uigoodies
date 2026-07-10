# Bulk Edit (`org.craftercms.plugin.bulkedit`)

**Separate Studio plugin** (not part of UI Goodies) that adds a **Tools Panel** sidebar entry for spreadsheet-style bulk editing of content items by content type, with keyword and last-modified filters.

Plugin id: **`org.craftercms.plugin.bulkedit`** · Widget id: **`org.craftercms.plugin.bulkedit.components.reactComponent`**

Upstream source: [craftercms/bulkedit-plugin](https://github.com/craftercms/bulkedit-plugin) (local clone often lives at `plugin-studio-bulkedit`).

## Install the plugin

Install into the site sandbox via **Project Tools → Plugin Management** or marketplace copy:

```bash
curl --location --request POST 'http://YOUR-STUDIO:8080/studio/api/2/marketplace/copy' \
  --header 'Authorization: Bearer YOUR_STUDIO_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "siteId": "YOUR-SITE-ID",
    "path": "/absolute/path/on/studio/server/to/bulkedit-plugin",
    "parameters": {}
  }'
```

After install, commit sandbox changes. The plugin descriptor auto-wires the sidebar widget when `craftercms-plugin.yaml` `installation` entries are applied.

Groovy REST handlers must exist under:

`config/studio/scripts/rest/plugins/org/craftercms/plugin/bulkedit/studio/bulkedit/`

(`bulk-read.post.groovy`, `bulk-write.post.groovy`)

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.ToolsPanel`** → `configuration` → `widgets`.

The bulk edit widget is a **direct** sidebar entry (it renders its own list row and opens a full-screen dialog). It does **not** use `ToolsPanelEmbeddedAppViewButton`.

```xml
<widget id="org.craftercms.plugin.bulkedit.components.reactComponent">
    <plugin id="org.craftercms.plugin.bulkedit"
            site="{site}"
            type="sidebar"
            name="bulkedit"
            file="index.js"/>
</widget>
```

Reference fragment in this repo: [`authoring/config/studio/ui-bulk-edit.append.xml`](../../authoring/config/studio/ui-bulk-edit.append.xml).

### Inside `ToolPanelAccordion` (optional)

You can nest the same widget inside [`ToolPanelAccordion`](tool-panel-accordion.md) when grouping shortcuts:

```xml
<widget id="org.rd.plugin.uigoodies.ToolPanelAccordion">
    <plugin id="org.rd.plugin.uigoodies" site="{site}" type="apps" name="uigoodies" file="index.js"/>
    <configuration>
        <title>Authoring shortcuts</title>
        <icon id="@mui/icons-material/SentimentSatisfiedOutlined"/>
        <widgets>
            <!-- …other nested widgets… -->
            <widget id="org.craftercms.plugin.bulkedit.components.reactComponent">
                <plugin id="org.craftercms.plugin.bulkedit"
                        site="{site}"
                        type="sidebar"
                        name="bulkedit"
                        file="index.js"/>
            </widget>
        </widgets>
    </configuration>
</widget>
```

## Plugin load failures

If Studio shows **Plugin load failed** for `org.craftercms.plugin.bulkedit` / `sidebar` / `bulkedit` / `index.js`:

1. Confirm the plugin is installed and committed in the site sandbox.
2. Confirm the bundle is served from **`/static-assets/plugins/org/craftercms/plugin/bulkedit/sidebar/bulkedit/index.js`** (not only under `config/studio/static-assets/...`). After marketplace copy, sync or copy assets to the site root `static-assets/` tree if the sidebar URL 404s.
3. Hard-refresh Studio (**Ctrl+Shift+R**).

## REST API (batched read/write)

Studio exposes batched operations via PluginController (include **`siteId`** query param):

| Endpoint | Purpose |
|----------|---------|
| `POST …/bulk-read?siteId=…` | Load grid rows (batched full XML) |
| `POST …/bulk-write?siteId=…` | Save grid changes (batched JSON) |

Path prefix:

`/studio/api/2/plugin/script/plugins/org/craftercms/plugin/bulkedit/studio/bulkedit/`

Optional browser overrides (see bulk edit plugin README): `bulkedit.batchSize`, `bulkedit.maxRequestBytes`, `bulkedit.readBatchSize` via `localStorage`.

## Related UI Goodies widgets

| Widget | Doc |
|--------|-----|
| Bulk **publish** (subtree go-live) | [open-bulk-publish-panel-button.md](open-bulk-publish-panel-button.md) |
| DevContentOps bulk **state** updates | [dev-content-ops-tools.md](dev-content-ops-tools.md) |
