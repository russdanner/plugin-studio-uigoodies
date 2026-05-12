# Bulk publish — sidebar (`org.rd.plugin.uigoodies.openBulkPublishPanelButton`)

Opens **bulk publish** from the **Tools Panel**, starting from a configurable root path (for example `/static-assets`).

See also: [Bulk publish view](bulk-publish-view.md) and [Bulk publish — toolbar](open-bulk-publish-toolbar-button.md).

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.ToolsPanel`** → `configuration` → `widgets`.

```xml
<widget id="org.rd.plugin.uigoodies.openBulkPublishPanelButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Bulk Publish</title>
        <icon id="@mui/icons-material/AutoAwesomeMotionOutlined"/>
        <defaultPath>/static-assets</defaultPath>
    </configuration>
</widget>
```
