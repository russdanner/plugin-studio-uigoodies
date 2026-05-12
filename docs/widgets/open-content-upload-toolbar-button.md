# Content upload — toolbar (`org.rd.plugin.uigoodies.openContentUploadToolbarButton`)

Same **content upload** behavior as the sidebar button, as a **preview toolbar** control (icon or label, optional dialog title).

See also: [Content upload view](content-upload-view.md).

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.PreviewToolbar`** → `leftSection`, `middleSection`, or `rightSection` → `widgets`.

```xml
<widget id="org.rd.plugin.uigoodies.openContentUploadToolbarButton">
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
        <dialogTitle>Upload Content</dialogTitle>
        <icon id="@mui/icons-material/FileUploadRounded"/>
        <defaultPath>/site/components/headers</defaultPath>
        <allowPathSelection>true</allowPathSelection>
    </configuration>
</widget>
```
