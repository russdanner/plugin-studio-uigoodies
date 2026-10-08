# Groovy sandbox compatibility

Crafter Studio plugin REST scripts and classes under `config/studio/scripts/classes/` run with the **Groovy sandbox** enabled by default (`studio.scripting.sandbox.enable: true`).

## Default Studio configuration

| Setting | Default | Plugin impact |
|--------|---------|----------------|
| `studio.scripting.sandbox.enable` | `true` | Sandbox + `SandboxTransformer` on scripts/classes |
| `studio.scripting.sandbox.blacklist.enable` | `true` | Blocks `java.io.File`, `RandomAccessFile`, process execution, reflection, etc. |
| `studio.scripting.sandbox.whitelist.enable` | `false` | When `false`, only the **blacklist** applies |
| `studio.scripting.restrictBeans` | `false` | When `true`, only beans in `studio.scripting.allowedBeans` are returned by `applicationContext.get()` |

With default settings, this plugin works **without any site-specific Studio configuration**.

## Rules used by this plugin

1. **Bean lookup** — Use only `applicationContext.get('beanName')`. Do **not** use `getBean`, `containsBean`, `WebApplicationContextUtils`, or `RequestContextHolder`.

2. **Content APIs** — Cross-site copy uses `cstudioContentService` and `dependencyServiceInternal` beans. Shared logic lives in `scripts/classes/plugins/org/rd/plugin/uigoodies/CrossSiteContentCopySupport.groovy`.

3. **Filesystem** — Do **not** use `java.io.File` construction, `RandomAccessFile`, or `File.createTempFile` (blacklisted). Use `java.nio.file.Path.of`, `Files.*`, and `SeekableByteChannel` instead.

4. **IO reads** — Use `InputStream.readAllBytes()` (not Groovy `bytes` on streams) when reading content from `cstudioContentService.getContent()`.

5. **Logging** — Use `org.slf4j.LoggerFactory.getLogger` (allowed by default).

## Beans used

| Bean | Scripts |
|------|---------|
| `cstudioContentService` | cross-site-content-copy, cross-site-content-copy-plan |
| `dependencyServiceInternal` | cross-site-content-copy, cross-site-content-copy-plan (when `copyDependencies` is true) |

If **bean restriction** is enabled (`studio.scripting.restrictBeans: true`), add at least:

```yaml
studio.scripting.allowedBeans: cstudioContentService,dependencyServiceInternal
```

## Whitelist-enabled environments

The install script **does not** modify Studio or site whitelists by default (`SKIP_WHITELIST=1`). With default Studio settings (`studio.scripting.sandbox.whitelist.enable: false`), no whitelist changes are needed.

If your organization enables whitelist mode, merge the plugin fragment **manually** into the whitelist path configured in `studio.scripting.sandbox.whitelist.path` (often `shared/classes/crafter/studio/extension/groovy/whitelist`). See `authoring/config/studio/extension/groovy/uigoodies-plugin-whitelist.append`. Restart Studio after changing the global whitelist.

Optional site sandbox copy (only if you maintain one):

```bash
cat authoring/config/studio/extension/groovy/uigoodies-plugin-whitelist.append >> \
  "$CRAFTER_DATA/repos/sites/<siteId>/sandbox/config/studio/extension/groovy/whitelist"
```

Marker line in the append file: `# Studio UI Goodies plugin (org.rd.plugin.uigoodies)`

To opt in during install (site sandbox only): `SKIP_WHITELIST=0 ./scripts/install-plugin.sh <siteId>`

## Remote install failures

Symptoms on another server (500, HTML error page, or `Bad control character in string literal in JSON` in the browser) usually mean one of:

1. **Stale install** — Groovy or JS on the server is older than your local repo. Re-run `./scripts/install-plugin.sh` after `yarn dist`, bump plugin patch version, and reload scripts.
2. **Whitelist / bean restriction** — Enterprise or hardened Studio blocks methods or beans this plugin uses. Merge the whitelist append and allowed beans (above).
3. **Wrong install path** — `marketplace/copy` `path` must be readable on the **Studio host**, not a dev-machine path from a README example.
4. **Uncommitted site config** — Whitelist or plugin files copied but not committed in the site sandbox never load in Studio.

REST responses sanitize path and error strings (`jsonSafeText`) so control characters in exception messages do not break JSON parsing in the UI.

## Scripts in this plugin

| Script | Purpose |
|--------|---------|
| `cross-site-content-copy-plan.post.groovy` | Preview copy plan |
| `cross-site-content-copy.post.groovy` | Execute copy |

| Class | Purpose |
|-------|---------|
| `CrossSiteContentCopySupport.groovy` | Shared cross-site copy helpers |

DevContentOps, Log Tail and plugin-installer scripts moved to [Studio DevOps Goodies](https://github.com/russdanner/plugin-studio-devopsgoodies); see its `docs/GROOVY_SANDBOX.md`.
