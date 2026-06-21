# DevContentOps Tools (`org.rd.plugin.uigoodies.DevContentOpsTools`)

Project tool for advanced git and Studio ingestion operations. Use the **Project** selector in the header to work on any site you can access (defaults to the current Studio project).

All plugin REST calls pass the selected site as `?siteId=` on the URL and `siteId` in POST bodies. Git operations use `GitRepositoryHelper.getRepository(siteId, SANDBOX)` for that site's sandbox repo. Studio workflow APIs (`fetchItemStates`, pull/push remotes, etc.) receive the same selected `siteId`.

## Tabs

| Tab | Description |
|-----|-------------|
| Git Log | Browse sandbox git history, patches, ingestion sync |
| Working tree | View sandbox working tree; stage, commit, discard, clean, resolve conflicts |
| Branches & tags | Local/remote branches and tags; pull/push when remotes exist |
| Repository health | GitSizer-style metrics; optimize repository (GC, repack, prune) |
| Site items | Filter items by name, path, type; set or clear workflow state flags |

## Git Log features

- Default branch from site sandbox; switch branch
- Infinite scroll commit list + **since / until** date filters
- **Order** — newest first (default) or oldest first (ascending from first commit)
- SVG **commit graph** beside the log
- Expand commit for message and file list; view file contents at commit
- Diff commit vs parent; diff arbitrary refs (via API)
- Create format-patch, download, apply patch
- Set Studio **last processed commit** (`sitesService.updateLastCommitId`) and run repository sync via Studio's `syncFromRepoTask` bean (same path as `SyncFromRepoEvent`)
- Revert working tree to commit; reset HEAD (Studio cleanup + hard reset + processed commit sync)
- Trim History — garbage collection on the sandbox repo; resets processed commit when requested
- **Remove file from history** — returns a **host CLI** plan (`git filter-repo`); filter-repo cannot run inside the Groovy sandbox. Run the suggested command or `scripts/dev-content-ops-cli/filter-file-from-history.sh` on the Studio host, then reset processed commit and sync.

## Branches & tags features

- List local branches, tags, and remote-tracking branches
- Create/delete branches and tags (optional remote delete)
- **Remote sync** (only when Studio remotes exist): select remote and branch, then pull or push via Studio remotes API

## Working tree features

- Lists modified, staged, untracked, deleted, and conflicted paths in the sandbox repo
- Stage / unstage selected or all paths; commit staged changes with a message
- Discard changes (checkout tracked files, remove untracked); clean untracked files
- Diff unstaged or staged changes per file
- Resolve conflicts with **Use ours** (current branch) or **Use theirs** (incoming)
- Reset hard to HEAD (destructive; confirmation checkbox)

**Warning:** History rewrite and hard reset are destructive. Restrict this tool to administrators.

## Configuration (`config/studio/ui.xml`)

Auto-wired on plugin install under **Project Tools** (`craftercms.siteTools`). The install script also merges `authoring/config/studio/ui-dev-content-ops-tools.append.xml` into the site sandbox `config/studio/ui.xml` when you run `./scripts/install-plugin.sh`.

Manual merge under **`//reference[@id='craftercms.siteTools']/tools`**:

```xml
<tool>
    <title id="uigoodies.devContentOpsTools.title" defaultMessage="DevContentOps Tools"/>
    <icon id="@mui/icons-material/BuildRounded"/>
    <url>uigoodies-dev-content-ops</url>
    <widget id="org.rd.plugin.uigoodies.DevContentOpsTools">
        <plugin id="org.rd.plugin.uigoodies" site="{site}" type="apps" name="uigoodies" file="index.js"/>
    </widget>
</tool>
```

## REST API (plugin scripts)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `dev-content-ops-git` | GET | `action=status\|log\|commit\|file\|diff\|patch\|repoHealth` |
| `dev-content-ops-git` | POST | `applyPatch`, `setProcessedCommit`, `revertToCommit`, `resetHead`, `filterFile`, `trimHistory`, `buildPatch`, `optimizeRepo` |

### `filterFile` POST body

```json
{
  "action": "filterFile",
  "path": "static-assets/images/large-file.mp4"
}
```

On success, the API updates `lastProcessedCommitId` to the new HEAD and publishes `SyncFromRepoEvent`. **Reset HEAD** and **trim history** do the same for the target commit.

### `optimizeRepo` POST body

```json
{
  "action": "optimizeRepo",
  "operation": "gc"
}
```

`operation`: `gc` | `repack` | `prune`

### Repository health GET

`action=repoHealth` returns GitSizer-style metrics (`metrics[]` with `concern` 0–30), `overallConcern`, and `summary`.

### Site items tab

Uses Studio workflow APIs (`fetchItemStates`, `setItemStates`, `setItemStatesByQuery`) — filter by path regex and state bitmap on the server; name and type filters apply to the loaded page. Bulk apply accepts one path or regex per line.
