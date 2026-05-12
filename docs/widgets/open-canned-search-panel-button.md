# Canned search — sidebar (`org.rd.plugin.uigoodies.openCannedSearchPanelButton`)

Opens Studio **Search** with a **preset query string** (URL-encoded filters, sort, etc.), matching the behavior of the standalone **plugin-studio-cannedsearch** plugin (now included here).

## Configuration (`config/studio/ui.xml`)

**Placement:** add one widget per shortcut under **`craftercms.components.ToolsPanel`** → `configuration` → `widgets`.

| Element | Required | Description |
|--------|----------|-------------|
| `title` | optional | Label shown in the sidebar (default: `Search`) |
| `icon` | optional | MUI icon id (default: Saved Search) |
| `searchParams` | optional | Query string for `/studio/search#/?…` (use CDATA for `&` and special chars) |
| `openInNewBrowserTab` | optional | `true` (default): new browser tab. `false`: embedded Search in a Studio dialog |
| `initialParameters` | optional | When not using a new tab, object passed to `craftercms.components.Search` (filters, sort, path, etc.) |

### New tab mode (typical)

```xml
<widget id="org.rd.plugin.uigoodies.openCannedSearchPanelButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <title>Articles by last edit</title>
        <icon id="@mui/icons-material/DescriptionRounded"/>
        <searchParams><![CDATA[filters=%7B"content-type"%3A%5B"%2Fpage%2Farticle"%5D%7D&sortBy=last-edit-date&sortOrder=desc]]></searchParams>
    </configuration>
</widget>
```

### Dialog mode (`openInNewBrowserTab` false)

Supply `initialParameters` using the same structure Studio’s Search expects (see Crafter Studio docs for Search / OpenSearch). Example shape: `query`, `keywords`, `offset`, `limit`, `sortBy`, `sortOrder`, `filters`, path constraints, etc.

See also: [Canned search — toolbar](open-canned-search-toolbar-button.md).
