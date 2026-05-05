# Canned search — toolbar (`org.rd.plugin.uigoodies.openCannedSearchToolbarButton`)

Same as the [sidebar canned search](open-canned-search-panel-button.md), as an **icon** or **text** control on the **preview toolbar** (`PreviewToolbar`).

| Element | Required | Description |
|--------|----------|-------------|
| `title` | optional | Button label when not icon-only |
| `tooltip` | optional | Tooltip (toolbar icon mode) |
| `dialogTitle` | optional | Title of the Search dialog when `openInNewBrowserTab` is false |
| `useIcon` | optional | `true` (default): icon button. `false`: text button |
| `useIconWithText` | optional | `true`: text button with leading icon |
| `buttonSize` | optional | `small` (default), `medium`, or `large` |
| `icon`, `searchParams`, `openInNewBrowserTab`, `initialParameters` | | Same as sidebar canned search |

```xml
<widget id="org.rd.plugin.uigoodies.openCannedSearchToolbarButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <title>Articles</title>
        <tooltip>Open article search</tooltip>
        <useIcon>true</useIcon>
        <icon id="@mui/icons-material/DescriptionRounded"/>
        <searchParams><![CDATA[filters=%7B"content-type"%3A%5B"%2Fpage%2Farticle"%5D%7D&sortBy=last-edit-date&sortOrder=desc]]></searchParams>
    </configuration>
</widget>
```
