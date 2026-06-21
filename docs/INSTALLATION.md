# Installation and configuration

## Requirements

| Requirement | Notes |
|-------------|--------|
| **CrafterCMS** | 4.0.0+ (Community or Enterprise). See `crafterCmsVersions` in `craftercms-plugin.yaml`. |
| **Studio** | Plugin REST scripts run under the Groovy sandbox (default Studio settings work). See [GROOVY_SANDBOX.md](GROOVY_SANDBOX.md). |
| **Build host** | Node **18+** (or Docker) to run `yarn dist` for UI and form-control packages. |
| **Install host** | `marketplace/copy` reads the plugin **`path` from the Studio server filesystem** — clone the repo on Studio or point `path` at that clone. |
| **Auth** | Studio API Bearer token (`scripts/.studio-token` or `CRAFTER_STUDIO_TOKEN`). |

Optional (restricted environments):

- `studio.scripting.restrictBeans: true` — add beans listed in [GROOVY_SANDBOX.md](GROOVY_SANDBOX.md).
- `studio.scripting.sandbox.whitelist.enable: true` — merge `authoring/config/studio/extension/groovy/uigoodies-plugin-whitelist.append` manually.

## Quick install

```bash
cp scripts/.studio-token.example scripts/.studio-token   # paste a fresh Bearer token
./scripts/install-plugin.sh YOUR-SITE-ID http://YOUR-STUDIO:8080
```

Hard-refresh Studio (**Ctrl+Shift+R**) after install. Commit sandbox changes in Studio so `ui.xml` and static assets are active.

### What the install script does

1. **Builds** (unless `SKIP_YARN_DIST=1`):
   - `src/packages/uigoodies-components` → `apps/uigoodies/index.js`
   - `src/packages/custom-locale` → `control/custom-locale/main.js`
   - `src/packages/translation-versions` → `control/translation-versions/main.js`
2. **`POST /studio/api/2/marketplace/copy`** — copies plugin into site sandbox (committed).
3. **Groovy script reload** — `GET /studio/api/2/plugin/script/reload?siteId=...` (unless `SKIP_SCRIPT_RELOAD=1`).
4. **Optional `ui.xml` merges** (unless `SKIP_UI_XML=1`):
   - Image Studio tools panel widget
   - DevContentOps Project Tool
   - Translation Project Tool
   - Translation preview toolbar button
   - Site tools reference fragment (if needed)
5. **Optional whitelist** — only when `SKIP_WHITELIST=0` (default: skipped).

### Install script environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `SKIP_YARN_DIST` | unset | Skip all `yarn dist` builds |
| `SKIP_SCRIPT_RELOAD` | unset | Skip Groovy reload |
| `SKIP_UI_XML` | unset | Do not merge `ui.xml` fragments |
| `SKIP_WHITELIST` | `1` | Do not copy whitelist fragment into site sandbox |
| `CRAFTER_DATA` | Crafter authoring data path | Site sandbox location for merges |
| `CRAFTER_STUDIO_TOKEN` | — | Bearer token (or use `scripts/.studio-token`) |

### Manual install (CURL)

```bash
# 1. Build all bundles on the Studio host
cd src/packages/uigoodies-components && yarn install && yarn dist
cd ../custom-locale && yarn install && yarn dist
cd ../translation-versions && yarn install && yarn dist

# 2. Copy plugin into site
curl --location --request POST 'http://SERVER:8080/studio/api/2/marketplace/copy' \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "siteId": "YOUR-SITE-ID",
    "path": "/absolute/path/on/studio/server/plugin-studio-uigoodies",
    "parameters": {}
  }'

# 3. Reload Groovy
curl 'http://SERVER:8080/studio/api/2/plugin/script/reload?siteId=YOUR-SITE-ID&token=YOUR_TOKEN'
```

Bump **`patch`** in `craftercms-plugin.yaml` after changes so marketplace copy picks up new artifacts.

## Post-install checklist

| Step | Action |
|------|--------|
| 1 | Hard-refresh Studio |
| 2 | **Project Tools** — confirm tools appear (OpenSearch, Log Tail, DevContentOps, Translation, etc.) |
| 3 | **Tools panel** — Image Studio button (if `ui.xml` merged) |
| 4 | **Preview toolbar** — Translation button (only when ≥2 locales in `translation-config.xml`) |
| 5 | **Commit** pending sandbox files (`ui.xml`, static assets, scripts) |
| 6 | **Translation sites** — follow [TRANSLATION_SETUP.md](TRANSLATION_SETUP.md) |
| 7 | **Bean restriction** — if enabled, update `allowedBeans` (see GROOVY_SANDBOX) |

Do **not** rsync files into `static-assets/` at the site root. Marketplace maps plugin assets to `config/studio/static-assets/plugins/...`.

## Auto-wiring (`craftercms-plugin.yaml`)

Plugin install merges these when Crafter applies the descriptor:

| Type | What |
|------|------|
| `preview-app` | Project Tools entries (Cross Site Copy, OpenSearch, Log Tail, DevContentOps, Translation) |
| `preview-app` | Image Studio tools panel widget |
| `preview-app` | Translation preview toolbar button |
| `form-control` | `custom-locale` and `translation-versions` in Studio form-control registry |

If you manage `config/studio/ui.xml` manually, merge fragments from `authoring/config/studio/`:

- `ui-image-studio-widget.append.xml`
- `ui-dev-content-ops-tools.append.xml`
- `ui-translation-config-tools.append.xml`
- `ui-translation-toolbar.append.xml`
- `ui-site-tools-reference.append.xml` (site tools reference, if missing)

## REST API (plugin scripts)

Base URL: `/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/`

| Script | Method | Purpose |
|--------|--------|---------|
| `translation-copy` | POST | Copy content to locale path; new `objectId`, locale metadata |
| `translation-config` | GET | Read `translation-config.xml` |
| `translation-siblings` | POST | Find sibling translations by `localeSourceId_s` / `objectId` |
| `translation-remove-candidates` | POST | Candidates for translation removal |
| `translation-remove` | POST | Remove translation items |
| `cross-site-content-copy` | POST | Cross-site content copy |
| `cross-site-content-copy-plan` | POST | Plan preview for cross-site copy |
| `dev-content-ops-git` | GET/POST | Git log, working tree, branches, health, blob sync |
| `database-tools` | GET/POST | DevContentOps database helpers |
| `log-tail` | GET | SSE log tail (Engine; used by Log Tail widget) |
| `log-tail-drop-all` | GET | Drop active log-tail streams |

Translation copy is also used internally by scaffold and the Translation dialog.

## Building from source

```bash
cd src/packages/uigoodies-components && yarn && yarn dist
cd ../custom-locale && yarn && yarn dist
cd ../translation-versions && yarn && yarn dist
```

Output is written under `authoring/static-assets/plugins/org/rd/plugin/uigoodies/` and copied into sites on install.

Main app bundle only (no form controls):

```bash
cd src/packages/uigoodies-components && yarn dist
```

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Widget missing in Studio | Stale `index.js`, or `ui.xml` not merged / not committed |
| Groovy REST 500 after upgrade | Script reload not run; or bean not in `allowedBeans` |
| Translation toolbar hidden | Fewer than two locales in `translation-config.xml` |
| Form controls empty in Content Form | Control JS not built; hard-refresh; check browser console |
| `marketplace/copy` fails | `path` not on Studio server; or invalid token |

See also [../README.md](../README.md) and [widgets/README.md](widgets/README.md).
