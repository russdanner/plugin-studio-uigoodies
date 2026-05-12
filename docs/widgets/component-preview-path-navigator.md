# Component preview path navigator (`org.rd.plugin.uigoodies.ComponentPreviewPathNavigator`)

Crafter Studio normally previews **pages**, not isolated **components**. On **headless** or app-driven sites, authors often need to preview how a component renders in the consuming app. This widget adds a **PathNavigator** in the sidebar whose clicks **navigate preview** to a URL derived from the repository path (with configurable **path mapping**).

Under the covers it overrides **`onItemClick`** on the PathNavigator so clicks go to preview instead of only opening the form (selectively; paths can be excluded).

When an item is clicked, the plugin uses the item path (without the `.xml` extension) as part of the preview URL.

### Example

Assume a component at `/site/components/cards/bb8847b4-7b14-7962-5255-f7290cb43c42.xml`. A generated preview URL might look like:

```text
http://localhost:8080/studio/preview#/?page=/card/bb8847b4-7b14-7962-5255-f7290cb43c42&site=cool-demo-site
```

Map storage paths to app routes with the `paths` element (`source` → `target`). Your app must handle the resulting URLs.

## Configuration (`config/studio/ui.xml`)

**Placement:** add the widget under **`craftercms.components.ToolsPanel`** → `configuration` → `widgets` (or `pages`, depending on your Studio version — same place as other sidebar tools).

| Configuration | Purpose |
|---------------|---------|
| `rootPath` | Root of the tree shown in the navigator |
| `paths` / `item` | `source` (repo prefix) → `target` (preview URL prefix). Supports patterns like `/product?productId=` → `/product?productId={componentId}` |
| `nonPreviewablePaths` | Regex: matching items open the form instead of preview |
| `excludedPaths` | Comma-separated paths excluded from the tree (pass-through to PathNavigator) |
| `limit` | Max records before pagination |

```xml
<widget id="org.rd.plugin.uigoodies.ComponentPreviewPathNavigator">
    <plugin
            id="org.rd.plugin.uigoodies"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <icon>@mui/icons-material/DevicesRounded</icon>
        <label>Content</label>
        <rootPath>/site/components/content</rootPath>
        <paths>
            <item>
                <source>/site/components/content/articles</source>
                <target>/article</target>
            </item>
            <item>
                <source>/site/components/content/videos</source>
                <target>/video</target>
            </item>
            <item>
                <source>/site/components/content/products</source>
                <target>/product?productId=</target>
            </item>
        </paths>
        <nonPreviewablePaths>.*\/crafter-level-descriptor.level.xml,.*/my-configs/.*</nonPreviewablePaths>
        <limit>50</limit>
    </configuration>
</widget>
```
