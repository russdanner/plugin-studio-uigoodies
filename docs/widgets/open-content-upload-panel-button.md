# Content upload — sidebar (`org.rd.plugin.uigoodies.openContentUploadPanelButton`)

Opens the **content upload** flow from the **Tools Panel** (sidebar). Optional starting path and whether authors can change the path before upload.

See also: [Content upload view](content-upload-view.md) (embedded dialog body) and [Content upload — toolbar](open-content-upload-toolbar-button.md).

## Configuration

```xml
<widget id="org.rd.plugin.uigoodies.openContentUploadPanelButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Upload Content</title>
        <icon id="@mui/icons-material/FileUploadRounded"/>
        <defaultPath>/site/components/headers</defaultPath>
        <allowPathSelection>true</allowPathSelection>
    </configuration>
</widget>
```
