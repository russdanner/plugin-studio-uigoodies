# Log Tail (Project Tool)

Streams a server-side log file into Studio so authors and developers can watch live activity without leaving the browser. The server side only does work while the panel is open — when no panel is open, there is no memory in use and no background thread running.

- **Widget id:** `org.rd.plugin.uigoodies.LogTail`
- **Project Tool URL:** `uigoodies-log-tail`

## Configuration (`config/studio/ui.xml`)

**Placement:** merge a `<tool>` under **`//reference[@id='craftercms.siteTools']/tools`** (Project Tools), same as GraphQL / Content Types.

The log file path comes from `ui.xml` — there are no JVM `-D` properties, no environment variables, no auto-discovery. The plugin's `installation` block ships the default configuration shown below, and the widget itself falls back to those same defaults if no `<path>` and no `<files>` is provided, so a fresh install works without any per-environment editing.

### Default (auto-wired on install)

The plugin install merges this `<tool>` (with this `<configuration>`) into `config/studio/ui.xml`:

```xml
<tool>
    <title id="uigoodies.logTail.title" defaultMessage="Log Tail"/>
    <icon id="@mui/icons-material/TerminalRounded"/>
    <url>uigoodies-log-tail</url>
    <widget id="org.rd.plugin.uigoodies.LogTail">
        <plugin id="org.rd.plugin.uigoodies" type="apps" name="uigoodies" file="index.js"/>
        <configuration>
            <files>
                <file><label>Tomcat</label><path>../logs/tomcat/catalina.out</path></file>
                <file><label>Deployer</label><path>../logs/deployer/crafter-deployer.out</path></file>
                <file><label>Search</label><path>../logs/search/opensearch.log</path></file>
            </files>
        </configuration>
    </widget>
</tool>
```

The default uses paths relative to the Tomcat working directory (typically `crafter-authoring/bin`), so `../logs/...` lands in the standard CrafterCMS `logs/` tree without any per-environment edits.

### Single log file

```xml
<widget id="org.rd.plugin.uigoodies.LogTail">
    <plugin id="org.rd.plugin.uigoodies" type="apps" name="uigoodies" file="index.js"/>
    <configuration>
        <path>/opt/crafter-cms-authoring/logs/tomcat/catalina.out</path>
    </configuration>
</widget>
```

`<path>` may be absolute or relative. Relative paths are resolved against the JVM working directory (typically `crafter-authoring/bin`).

### Multiple log files (dropdown)

Add a `<file>` per log; the widget shows a **Log file** dropdown so users can switch between them. `<label>` is what the dropdown displays; `<path>` is what the server actually opens.

```xml
<widget id="org.rd.plugin.uigoodies.LogTail">
    <plugin id="org.rd.plugin.uigoodies" type="apps" name="uigoodies" file="index.js"/>
    <configuration>
        <files>
            <file>
                <label>Tomcat</label>
                <path>../logs/tomcat/catalina.out</path>
            </file>
            <file>
                <label>Deployer</label>
                <path>../logs/deployer/crafter-deployer.out</path>
            </file>
            <file>
                <label>Search</label>
                <path>../logs/search/opensearch.log</path>
            </file>
        </files>
    </configuration>
</widget>
```

### Path validation rules

To prevent traversal abuse the script enforces:

- **No NUL bytes.**
- **At most one `..` segment** in the path. So `../logs/tomcat/catalina.out` is allowed; `../../etc/passwd` and `foo/../../bar` are rejected.
- **At most one `.` segment** in the path. So `./logs/x` is allowed; `./logs/./x` is rejected.
- **File extension must be `.log` or `.out`** (case-insensitive). Anything else — `foo.txt`, `bar.conf`, `passwd` — is rejected.
- The resolved file must exist, be a regular file, and be readable by the Crafter process.

### What happens when the path is wrong

When the configured log file is missing, isn't a regular file, or isn't readable, the script:

1. Logs a clear error to the server log (logger name `org.rd.plugin.uigoodies.LogTail`), naming the absolute path tried and the active site, with a hint that the fix is in `ui.xml`. Examples:
   - `LogTail: no <path> configured in ui.xml for this widget (site=mysite)`
   - `LogTail: log file does not exist (path='/opt/crafter/logs/tomcat/catalina.out', site=mysite). Update <path> in this widget's ui.xml configuration to point at a real log file on this server.`
   - `LogTail: log file is not readable by the Crafter process (path='/var/log/tomcat/catalina.out', site=mysite). Check filesystem permissions for the user running Tomcat.`
   - `LogTail: refused unsafe path '../etc/passwd' (site=mysite, remote=10.0.0.5)`
2. Returns an error response with the same human-readable message.
3. The widget shows that message inline at the top of the panel (red banner) instead of a generic "Connection error".

## Packaging — one site plugin, no separate install

Everything ships in this single site plugin (`org.rd.plugin.uigoodies`, `type: site` in `craftercms-plugin.yaml`). There is no separate plugin to install. Installing the plugin into a project drops the React bundle and the Groovy script into the site, and adds the Project Tools `<tool>` entry to `config/studio/ui.xml`.

## What it does

- Tails the configured log file and renders the stream in a monospaced viewer that follows the Studio theme (light / dark).
- **Colorizes** lines by detected level (`ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, plus a neutral `OTHER`).
- **Groups stack traces** with their parent error/warn message. Continuation lines (`at …`, `Caused by:`, `Suppressed:`, `… N more`) are folded behind a small `N trace lines` toggle on the parent entry, so a single 200-line stack trace shows as one row until expanded.
- **Fullscreen** toggle — pins the panel as a fixed overlay covering the whole viewport and also requests the browser Fullscreen API. `Escape` exits.
- **Auto-scroll** toggle, **filter** by substring, and **level filter** select.
- **Buffer cap** in the browser: keeps the most recent 5,000 entries; older ones are dropped to keep memory bounded.

### Toolbar actions

| Action | Scope | What it does |
|---|---|---|
| **Start** / **Stop** | This tab only | Opens / closes this panel's streaming request. Other users' tails continue. |
| **Clear** | This tab only | Empties the in-memory buffer for this view. Log files on disk are not touched. |
| **Drop all connections** | **Server-wide, all users** | Bumps a global "drop generation" counter on the Studio servlet context. Every active streaming loop notices on its next poll (≤ ~750 ms) and exits with a `bye` event whose reason is `drop-all`. Affected viewers see the status flip to *Disconnected* and stay there until they click **Start**. The button shows a confirmation prompt first. |

The drop-all action calls a separate Groovy script: `GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail-drop-all?siteId=…` and returns `{ dropGeneration, previousActive, active }`.

## Wire format

The endpoint streams **NDJSON** (`Content-Type: application/x-ndjson`): one JSON object per line, terminated by `\n`. The widget consumes the response with `fetch()` + `ReadableStream.getReader()` so it can send Studio's `Authorization: Bearer <jwt>` header (which `EventSource` cannot do).

Event types:

| `type`     | Payload                                              | Meaning                                                                                       |
|------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `hello`    | `path`, `startOffset`, `active`                      | Stream is open. First event in every response.                                                |
| `log`      | `line` (string)                                      | One log line.                                                                                 |
| `rotated`  | `path`                                               | The log file shrank below the read pointer; the script reopened it from offset 0.             |
| `hb`       | `ts` (epoch ms)                                      | Heartbeat. Every 15 s. Confirms liveness across proxies.                                      |
| `bye`      | `reason` (`"time-cap"` \| `"drop-all"`)              | The script is closing this response on purpose. `time-cap`: 25-minute cap, widget reconnects automatically. `drop-all`: an admin clicked **Drop all connections**; the widget stays disconnected until the user clicks **Start**. |
| `error`    | `message`                                            | Server-side streaming failure. The widget surfaces it in the red banner.                      |

## How memory is bounded

- Per-request memory in the script is capped:
  - 64 KB per read pass.
  - 8 KB per single line; longer lines are truncated and marked `… [truncated]`.
- Concurrent connections are capped (8). The counter lives on the servlet context so multiple installs across sites share the same total.
- Runtime cap: each connection ends after 25 minutes with a `bye` event; the widget reconnects automatically, so no servlet thread is held forever by a forgotten tab.
- No global ring buffer on the server: there is no shared accumulator, no Log4j appender, no `System.out` tee. When the last client disconnects the script's loop exits, the file handle is closed, and all per-request buffers are eligible for GC.
- Every write checks for client disconnect; a failed write means the client is gone, so the loop returns immediately.
- Heartbeats every 15 s keep proxies happy and surface dead connections.

## How the panel only works when it is in use

- The browser opens one connection when the panel mounts.
- The script reads from the log file only inside that request thread — no work happens when the connection isn't held.
- When the user closes the tool, navigates away, or hides the tab, the panel closes the connection; the script's write fails on the next flush and exits in `finally`, decrementing the active-connection counter.
- A `visibilitychange` listener pauses the stream when the tab is hidden and resumes when it becomes visible again.

## Security notes

- The script accepts the path supplied by this widget's `ui.xml` `<configuration>`, subject to the [path validation rules](#path-validation-rules) above. Each rejection is logged with the source IP and active site. Treat `ui.xml` as the authoritative allowlist: only paths an admin has put in `ui.xml` are shown to users, and the widget never lets users type an arbitrary path.
- All plugin options live in `ui.xml`. The script does not read JVM `-D` properties or environment variables for plugin configuration.
- This tool is for authoring / preview environments. If you expose it in any environment that real end-users can reach, gate the endpoint with role-based auth in `permission-mappings-config.xml` or your security layer — logs routinely contain secrets and PII.

## Files

- React widget: `src/packages/uigoodies-components/src/components/LogTail.tsx`.
- Server scripts:
  - `authoring/scripts/rest/plugins/org/rd/plugin/uigoodies/log-tail.get.groovy` — NDJSON streaming tail. `GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail?siteId=…&path=…`.
  - `authoring/scripts/rest/plugins/org/rd/plugin/uigoodies/log-tail-drop-all.get.groovy` — server-wide kill switch for active tails. `GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail-drop-all?siteId=…`.

  Both are **Studio plugin scripts** — they run in Studio (not Engine). The `authoring/` prefix is the plugin install convention. Endpoints require a Studio session; the widget sends the JWT via the `Authorization` header that `@craftercms/studio-ui` registers globally.
- Project Tool auto-wire: `craftercms-plugin.yaml` (`installation:` block with `url: uigoodies-log-tail`).
