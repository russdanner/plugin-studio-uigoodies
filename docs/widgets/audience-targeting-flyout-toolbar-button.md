# Audience targeting — toolbar flyout (`org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton`)

Puts **Audience Targeting** on the **preview toolbar** as a compact **icon**; the panel opens in a **popover** (flyout) instead of the Experience Builder right rail or a full dialog. It embeds Studio’s **`PreviewAudiencesPanel`** (same Redux targeting flow as the ICE tool).

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.PreviewToolbar`** → `leftSection`, `middleSection`, or `rightSection` → `widgets`, same as other toolbar widgets.

Use the same `<fields>` block as your `ICEToolsPanel` audience tool (`PreviewAudiencesPanel` under `ToolsPanelPageButton`). Toolbar XML parsing does not use ICE’s `lookupTables: ['fields']`; this widget normalizes `fields` and dropdown `values` so the panel still works.

| Element | Required | Description |
|--------|----------|-------------|
| `title` | optional | Icon `aria-label` default |
| `tooltip` | optional | Tooltip text (defaults to `title`) |
| `icon` | optional | `SystemIcon` descriptor, e.g. `<icon id="@mui/icons-material/EmojiPeopleRounded"/>` |
| `fields` | **yes** | Segment, dropdown, input, etc. (same structure as ICE audience configuration) |

```xml
<widget id="org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <title>Audience targeting</title>
        <tooltip>Preview as a specific audience</tooltip>
        <icon id="@mui/icons-material/EmojiPeopleRounded"/>
        <fields>
            <segment>
                <id>segment</id>
                <name>Segment</name>
                <description>User segment.</description>
                <type>dropdown</type>
                <defaultValue>anonymous</defaultValue>
                <values>
                    <value>
                        <label>Guy</label>
                        <value>guy</value>
                    </value>
                    <value>
                        <label>Gal</label>
                        <value>gal</value>
                    </value>
                    <value>
                        <label>Anonymous</label>
                        <value>anonymous</value>
                    </value>
                </values>
            </segment>
            <name>
                <id>name</id>
                <name>Name</name>
                <description>User's first and last name.</description>
                <type>input</type>
                <helpText>Optional help for authors.</helpText>
            </name>
        </fields>
    </configuration>
</widget>
```

If `fields` is missing, the flyout shows a warning instead of a blank panel.
