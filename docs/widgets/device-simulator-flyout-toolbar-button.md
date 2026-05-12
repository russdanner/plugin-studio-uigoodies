# Device simulator — toolbar flyout (`org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton`)

Puts **Device Simulator** presets on the **preview toolbar** as an **icon** with a **popover** flyout. It embeds Studio’s **`PreviewSimulatorPanel`** (same `setHostSize` behavior as the ICE tool).

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.PreviewToolbar`** → `leftSection`, `middleSection`, or `rightSection` → `widgets`.

Use the same `<devices>` / `<device>` structure as the ICE simulator. Toolbar parsing does not mark `devices` as an array; this widget coerces common XML shapes (including numeric-key objects after transforms) and falls back to phone **375×667** and tablet **768×1024** if no valid devices remain.

| Element | Required | Description |
|--------|----------|-------------|
| `title` | optional | Icon `aria-label` default |
| `tooltip` | optional | Tooltip text |
| `icon` | optional | e.g. `<icon id="@mui/icons-material/DevicesRounded"/>` |
| `devices` | optional | List of `<device>` with `title`, `width`, `height` (pixels) |

```xml
<widget id="org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <title>Device simulator</title>
        <tooltip>Resize preview to a device preset</tooltip>
        <icon id="@mui/icons-material/DevicesRounded"/>
        <devices>
            <device>
                <title>smartPhone</title>
                <width>375</width>
                <height>667</height>
            </device>
            <device>
                <title>tablet</title>
                <width>768</width>
                <height>1024</height>
            </device>
        </devices>
    </configuration>
</widget>
```
