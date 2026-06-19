# Image Studio (`org.rd.plugin.uigoodies.ImageStudio`)

Full-screen dialog widget for image editing in Studio. Usually opened via [open-image-studio-panel-button](open-image-studio-panel-button.md).

## Features

- **Sources:** browse `/static-assets`, drag-and-drop, clipboard paste, file upload
- **Crop:** `react-easy-crop` (MIT) with aspect presets and zoom
- **Focal point:** click to set focus; live previews at 16:9, 4:3, 1:1, 9:16
- **Adjust:** brightness, contrast, saturation; rotate and flip
- **Resize:** optional output dimensions (Pica for high-quality scaling)
- **Save:** choose folder and filename; when editing an existing asset, replace original or save as variant
- **Size requirements:** scans `form-definition.xml` for `image-picker` width/height constraints

## Libraries (browser-only, bundled in plugin)

| Library | License | Use |
|---------|---------|-----|
| [react-easy-crop](https://github.com/ValentinH/react-easy-crop) | MIT | Interactive crop UI |
| [pica](https://github.com/nodeca/pica) | MIT | High-quality resize on export |

## Configuration (`config/studio/ui.xml`)

Embedded in a dialog via the panel button (recommended):

```xml
<widget id="org.rd.plugin.uigoodies.openImageStudioPanelButton">
    <plugin id="org.rd.plugin.uigoodies" site="{site}" type="apps" name="uigoodies" file="index.js"/>
    <configuration>
        <defaultPath>/static-assets/images</defaultPath>
    </configuration>
</widget>
```

Direct widget reference (custom dialog):

```xml
<widget id="org.rd.plugin.uigoodies.ImageStudio">
    <plugin id="org.rd.plugin.uigoodies" site="{site}" type="apps" name="uigoodies" file="index.js"/>
    <configuration>
        <defaultPath>/static-assets/images</defaultPath>
    </configuration>
</widget>
```
