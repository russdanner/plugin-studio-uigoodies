# UI Goodies (`org.rd.plugin.uigoodies.UIGoodiesAdmin`)

**Project Tool** that shows which UI Goodies build is loaded in Studio. It will also be the home for plugin preferences.

## What it does

- **Build:** plugin id, version (from `craftercms-plugin.yaml`), build time, and the git commit the bundle was built from. `-dirty` after the commit means the build had uncommitted changes.
- **Preferences:** placeholder; no preferences yet.

The build details are stamped into `index.js` by `rollup.config.cjs` when the bundle is built (`yarn dist`), so they describe the bundle the browser actually loaded. If the version looks old after an install, hard-refresh Studio (Ctrl+Shift+R).

## Configuration

Installed automatically into Project Tools by `scripts/install-plugin.sh`. To add it manually, put this inside `<reference id="craftercms.siteTools"><tools>` in `config/studio/ui.xml`:

```xml
<tool>
    <title id="uigoodies.uigoodiesAdmin.title" defaultMessage="UI Goodies"/>
    <icon id="@mui/icons-material/SettingsSuggestOutlined"/>
    <url>uigoodies-admin</url>
    <widget id="org.rd.plugin.uigoodies.UIGoodiesAdmin">
        <plugin id="org.rd.plugin.uigoodies" type="apps" name="uigoodies" file="index.js"/>
    </widget>
</tool>
```

The widget takes no configuration.
