# OpenSearch playground (`org.rd.plugin.uigoodies.OpenSearchPlayground`)

**Project tool** (Project Tools panel) for building and running **raw OpenSearch** search JSON against the active site—similar in spirit to Studio’s **GraphQL** tool, but for the Engine search endpoint.

## Layout

| Area | Purpose |
|------|---------|
| **Left — Explorer & query builder** | Inferred **schema** from sample hits (refresh, filter paths, type chips, `_source` checkboxes), **common field shortcuts**, and a **⋮** menu per path to insert clauses or add to `_source`. |
| **Middle — Request body** | **Run**, **Prettify**, and **Copy** for the request; **quick insert** bar; **CodeMirror** JSON editor with **syntax highlighting**, **line numbers**, and **code folding** (gutter chevrons). **⌘/Ctrl+Enter** runs the query. |
| **Right — Response** | **Dark-theme** CodeMirror with the same **highlighting** and **folding**; shows pretty-printed JSON (or error text if the body is not JSON). |

No query **history** is stored; each run is independent.

## Prerequisites

- Site has the **Studio UI Goodies** plugin installed (`org.rd.plugin.uigoodies`) with the `uigoodies` app built to `static-assets/plugins/.../uigoodies/index.js`.
- After changing the plugin, run `yarn dist` / `npm run dist` in `uigoodies-components` and publish/sync so Studio loads the updated bundle.

## Execution endpoint

The tool calls (same browser session, same origin as Studio in typical installs):

`POST /api/1/site/search/search.json?crafterSite=<activeSiteId>&index=<optional>`

The body must be valid **OpenSearch search JSON**. See the Crafter Engine docs: [Search (Engine REST)](https://docs.craftercms.org/current/_static/api/engine.html#tag/search/operation/search).

Optional query parameter **`index`**: comma-separated extra indexes/aliases (multi-index search), same as Engine.

**Note:** Which physical index is used depends on your Crafter **authoring vs delivery** setup and site configuration. The playground always targets the **active site** from Studio (`crafterSite`).

## Wiring in `config/studio/ui.xml`

Add a `<tool>` under **`//reference[@id='craftercms.siteTools']/tools`**, alongside Content Types, GraphQL, etc.

Minimal entry (matches plugin auto-wire in `craftercms-plugin.yaml`):

```xml
<tool>
   <title id="uigoodies.openSearchPlayground.title" defaultMessage="OpenSearch"/>
   <icon id="@mui/icons-material/SearchRounded"/>
   <url>uigoodies-opensearch-playground</url>
   <widget id="org.rd.plugin.uigoodies.OpenSearchPlayground">
      <plugin id="org.rd.plugin.uigoodies"
              site="{site}"
              type="apps"
              name="uigoodies"
              file="index.js"/>
   </widget>
</tool>
```

- **`url`** must match the route Studio uses for this tool (`uigoodies-opensearch-playground`).
- **`widget id`** must be exactly `org.rd.plugin.uigoodies.OpenSearchPlayground`.

If the plugin’s `installation` block in `craftercms-plugin.yaml` already merged this tool on install, you can still add or reorder it manually in `ui.xml`; avoid duplicate `<tool>` entries with the same `url`.

## Schema explorer (inferred)

There is no public Engine **mapping** API from the browser, so fields are **inferred** from indexed documents:

1. Set **Sample size** (1–200) and click **Refresh schema**.
2. The tool runs `match_all` with `_source: true` for that many hits, walks each `_source`, and lists **dot paths** (with `[]` where it walked into array elements).
3. Each path shows **inferred types** (`string`, `object`, `array`, …) aggregated across the sample.
4. **Filter paths** narrows the list.

Checkboxes add or remove paths in **`_source`**. If the JSON uses **`_source: true`**, field checkboxes are disabled until you use an explicit `_source` array.

## Per-field query builder (⋮ menu)

For each inferred path:

- **Add to `_source`**
- **Insert exists**
- **Insert match / term / prefix / wildcard / range** — opens a short dialog; clauses are appended to **`bool.must`**, wrapping or merging the existing `query` as needed.

## Quick insert bar (above the JSON editor)

After a schema refresh, inferred paths appear in the **Field path** datalist. Choose **clause** type, enter a value (or `gte` / `lte` for **range**), and **Insert clause** — same `bool.must` behavior as the menu.

**Caveats:** `term` and some wildcards often need **`.keyword`** (or other subfields) depending on your mapping. Inferred paths reflect **`_source`** keys, which may differ from internal index field names.

## Other controls

- **Common fields (shortcuts):** curated Crafter-style names for quick `_source` toggles.
- **Templates:** quick-start bodies (match all, prefix on `localId`, term on `content-type`).
- **Run / Prettify / Copy query:** on the **request** panel header (not only the page title row).
- **Run shortcut:** **⌘+Enter** / **Ctrl+Enter** in the request JSON editor.
- **Response panel:** darker background; fold blocks via the **gutter**; **Copy response** in the panel header.
- The plugin bundles **CodeMirror 6** (`@uiw/react-codemirror`, VS Code–style light/dark themes) for these editors (~1.3MB `index.js`).
