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

3. **Filesystem (Log Tail, Repository health)** — Do **not** use `java.io.File` construction, `RandomAccessFile`, or `File.createTempFile` (blacklisted). Use `java.nio.file.Path.of`, `Files.*`, and `SeekableByteChannel` instead. Repository health scratch files live under `.git/uigoodies-scratch/` via `DevContentOpsSandboxIoSupport`.

4. **IO reads** — Use `InputStream.readAllBytes()` (not Groovy `bytes` on streams) when reading content from `cstudioContentService.getContent()`.

5. **Logging** — Use `org.slf4j.LoggerFactory.getLogger` (allowed by default).

6. **Git operations (DevContentOps)** — Use a tiered strategy from sandboxed Groovy:
   - **Tier 1 — Studio beans:** `studio.gitCli` (`clean`, `resetHard`, `isRepoClean`) and `GitRepositoryHelper` (`removeIndexAndClean`, `gitStatusOk`, `getRepository`, …) under `cstudioGeneralLockService` sandbox lock.
   - **Tier 2 — JGit:** reads, branch/tag CRUD, GC/repack-style maintenance when GitCli has no API (`DevContentOpsRefsSupport`, `DevContentOpsRepoHealthSupport` analysis/optimize).
   - **Tier 3 — Host CLI instructions:** operations with no Studio or JGit equivalent (e.g. `git filter-repo`, `reflog expire`) return `mode: external` with a suggested command for the Studio host.

   Do **not** construct `GitCli$GitCommandLine` or custom GitCli subclasses from plugin Groovy — that bypasses Studio's sandbox-safe path and fails with `SecurityException` on default installs.

## Beans used

| Bean | Scripts |
|------|---------|
| `cstudioContentService` | cross-site-content-copy, cross-site-content-copy-plan |
| `dependencyServiceInternal` | cross-site-content-copy, cross-site-content-copy-plan (when `copyDependencies` is true) |
| `studio.gitRepositoryHelper` | dev-content-ops-git |
| `studio.gitCli` | dev-content-ops-git (work tree clean/reset, repo clean check) |
| `cstudioGeneralLockService` | dev-content-ops-git (sandbox repo lock during git ops) |
| `contentRepository` | dev-content-ops-git |
| `sitesService` | dev-content-ops-git (branch, last commit, sync trigger) |
| `syncFromRepoTask` | dev-content-ops-git (`SyncFromRepositoryTask.syncRepoListener` after set processed) |
| `applicationEventPublisher` | dev-content-ops-git (fallback `SyncFromRepoEvent` publish if `syncFromRepoTask` unavailable) |
| `processedCommitsDao` | dev-content-ops-git (processed flag on commits) |
| `blobStoreResolver` | dev-content-ops-git (blob store overview, tree, preview → staging/live sync) |
| `crafter.s3ClientFactory` | dev-content-ops-git (S3 blob version list/restore) |
| `studio.securityService` / `cstudioSecurityService` | dev-content-ops-git blob sync (current user for publish audit) |

If **bean restriction** is enabled (`studio.scripting.restrictBeans: true`), add at least:

```yaml
studio.scripting.allowedBeans: cstudioContentService,dependencyServiceInternal,studio.gitRepositoryHelper,studio.gitCli,cstudioGeneralLockService,contentRepository,sitesService,processedCommitsDao,syncFromRepoTask,applicationEventPublisher,blobStoreResolver,crafter.s3ClientFactory,studio.securityService
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

DevContentOps git via Studio beans requires (among others):

```
method org.craftercms.studio.impl.v2.utils.git.GitCli isRepoClean java.io.File
method org.craftercms.studio.impl.v2.utils.git.GitCli clean java.io.File boolean boolean
method org.craftercms.studio.impl.v2.utils.git.GitCli resetHard java.io.File
method org.craftercms.studio.api.v2.utils.GitRepositoryHelper removeIndexAndClean java.io.File
method org.craftercms.studio.api.v2.utils.GitRepositoryHelper gitStatusOk org.eclipse.jgit.lib.Repository
```

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
| `dev-content-ops-git.get.groovy` | Git log, diff, patch, file content, repo health |
| `dev-content-ops-git.post.groovy` | Patch apply, ingestion sync, history ops, repo optimize |
| `log-tail.get.groovy` | Stream server log file (NDJSON) |
| `log-tail-drop-all.get.groovy` | Disconnect all active log tails |

| Class | Purpose |
|-------|---------|
| `CrossSiteContentCopySupport.groovy` | Shared cross-site copy helpers |
| `DevContentOpsSupport.groovy` | Git log, diff, patch, ingestion sync helpers |
| `DevContentOpsStudioGitSupport.groovy` | Sandbox-safe git: Studio GitCli + GitRepositoryHelper, JGit GC fallback |
| `DevContentOpsCliGitSupport.groovy` | External host CLI hints (filter-repo) |
| `DevContentOpsRefsSupport.groovy` | Branch/tag list and CRUD via JGit + sandbox lock |
| `DevContentOpsRepoHealthSupport.groovy` | GitSizer-style metrics (JGit) and optimize (GitCli + JGit + external hints) |
| `DevContentOpsRepoConfigSupport.groovy` | Repo config metrics via JGit Config + NIO |
| `DevContentOpsBlobStoreSupport.groovy` | Blob store config/tree/presence; sync via `DeploymentItemTO` + `StudioBlobStore.publish`; S3 version list/restore via `crafter.s3ClientFactory` / `S3Utils`; version preview streams through the plugin REST endpoint (no S3 presigner) |
| `DevContentOpsPublishCompareSupport.groovy` | Cross-repo tree compare: sandbox branch vs published staging/live; per-file text diff |
