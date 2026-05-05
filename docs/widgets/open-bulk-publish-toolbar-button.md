# Bulk publish — toolbar (`org.rd.plugin.uigoodies.openBulkPublishToolbarButton`)

Same **bulk publish** flow as the sidebar button, from the **preview toolbar** (with optional `dialogTitle`).

See also: [Bulk publish view](bulk-publish-view.md).

## Configuration

```xml
<widget id="org.rd.plugin.uigoodies.openBulkPublishToolbarButton">
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
        <dialogTitle>Bulk Publish</dialogTitle>
        <icon id="@mui/icons-material/AutoAwesomeMotionOutlined"/>
        <defaultPath>/static-assets</defaultPath>
    </configuration>
</widget>
```
