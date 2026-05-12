# Cross-site content type copy (`org.rd.plugin.uigoodies.CrossSiteContentTypeCopy`)

**Project Tool** that lets admins copy **content type definitions** from one site to another.

## What it does

1. Select a **source project**
2. Select one or more **content types**
3. Select a **destination project**
4. Confirm and execute copy

For each selected content type, it copies:

- `/config/studio/content-types/.../config.xml`
- `/config/studio/content-types/.../form-definition.xml`

to the destination project (overwriting existing files of the same content type).

## What it does not copy

- Preview images and any other extra files under the content type folder
- Content items that use the content type

## Permissions

The user running the tool should have:

- Access to both source and destination sites
- Configuration read access on source and write access on destination

## Configuration (`config/studio/ui.xml`)

**Placement:** merge a `<tool>` under **`//reference[@id='craftercms.siteTools']/tools`**.

```xml
<tool>
    <title id="uigoodies.crossSiteContentTypeCopy.title" defaultMessage="Content Type Copy"/>
    <icon id="@mui/icons-material/FileCopyOutlined"/>
    <url>uigoodies-cross-site-content-types</url>
    <widget id="org.rd.plugin.uigoodies.CrossSiteContentTypeCopy">
        <plugin
                id="org.rd.plugin.uigoodies"
                site="{site}"
                type="apps"
                name="uigoodies"
                file="index.js"
        />
    </widget>
</tool>
```

The plugin’s `craftercms-plugin.yaml` can auto-wire this tool; if you manage `config/studio/ui.xml` manually, merge the generated tool entry into `//reference[@id='craftercms.siteTools']/tools`.
