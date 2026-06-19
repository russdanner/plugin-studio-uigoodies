# Image Studio — sidebar (`org.rd.plugin.uigoodies.openImageStudioPanelButton`)

Opens **Image Studio** from the **Tools Panel** (sidebar): crop, focal point, adjustments, resize, and a content-type image size lookup. Supports browse, drag-and-drop, clipboard paste, and file upload.

See also: [Image Studio view](image-studio.md).

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.ToolsPanel`** → `configuration` → `widgets`.

The plugin `installation` block in `craftercms-plugin.yaml` auto-wires this on install/upgrade. To add manually, merge the snippet below into `config/studio/ui.xml`.

```xml
<widget id="org.rd.plugin.uigoodies.openImageStudioPanelButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <title>Image Studio</title>
        <icon id="@mui/icons-material/PhotoLibraryRounded"/>
        <defaultPath>/static-assets/images</defaultPath>
    </configuration>
</widget>
```
