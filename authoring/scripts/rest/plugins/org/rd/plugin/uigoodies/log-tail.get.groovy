/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Studio plugin script: NDJSON streaming tail of a server-side log file.
 *
 * Endpoint (Studio plugin script API — runs in Studio, not Engine):
 *   GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail
 *       ?siteId=<site>
 *       &path=<absolute log file path>
 *
 * The absolute file path is supplied by the LogTail widget from its `ui.xml`
 * <configuration>; this script does not invent defaults or read any plugin
 * options from JVM/system properties or environment variables.
 *
 * Wire format: NDJSON (one JSON object per line, terminated by \n).
 * Why not SSE: EventSource cannot send custom headers, and Studio authenticates
 * web requests with `Authorization: Bearer <jwt>`; SSE would always be 401.
 * The widget consumes this with fetch() + ReadableStream.getReader(), which can
 * carry the JWT header.
 *
 * Event objects:
 *   {"type":"hello","path":"...","startOffset":N,"active":N}
 *   {"type":"log","line":"..."}
 *   {"type":"rotated","path":"..."}
 *   {"type":"hb","ts":<epoch_ms>}
 *   {"type":"bye","reason":"time-cap"}
 *   {"type":"error","message":"..."}
 *
 * Design notes:
 *   - Streams ONLY while the HTTP connection is alive. When the client aborts
 *     the fetch, writer.checkError() flips and the loop exits, releasing all
 *     in-memory buffers. No background threads, no global ring buffer.
 *   - Concurrent connections are capped (MAX_CONCURRENT_CONNECTIONS).
 *   - Per-batch reads are capped (MAX_BYTES_PER_BATCH); huge single lines are
 *     truncated to MAX_LINE_BYTES so memory cannot grow unboundedly.
 *   - Hard runtime cap (MAX_RUN_MILLIS) so the browser reconnects periodically
 *     and no thread is held forever by a forgotten tab. The widget reconnects
 *     automatically after a `bye` event.
 *   - The "active connections" counter lives on the ServletContext so multiple
 *     widget instances observe the same counter.
 *   - Any reason the file cannot be read is logged via SLF4J and returned to the
 *     client as JSON so the widget can show it inline.
 */

import java.io.RandomAccessFile
import java.io.PrintWriter
import java.util.concurrent.atomic.AtomicInteger

import org.slf4j.Logger
import org.slf4j.LoggerFactory

Logger log = LoggerFactory.getLogger('org.rd.plugin.uigoodies.LogTail')

// ---- Tunables -------------------------------------------------------------
final int MAX_CONCURRENT_CONNECTIONS = 8
final int MAX_BYTES_PER_BATCH = 64 * 1024      // bytes read in one filesystem pass
final int MAX_LINE_BYTES = 8 * 1024            // any single line longer than this is truncated
final int INITIAL_REWIND_BYTES = 64 * 1024     // show last ~64 KB to bootstrap the view
final int MAX_RUN_MILLIS = 25 * 60 * 1000      // 25 min then send 'bye'; client reconnects
final long POLL_INTERVAL_MS = 750
final long HEARTBEAT_INTERVAL_MS = 15_000

// ---- Resolve the log file -------------------------------------------------

def writeJsonError = { int status, String message ->
  response.status = status
  response.contentType = 'application/json'
  response.characterEncoding = 'UTF-8'
  response.writer.print('{"error":"' + message.replace('\\', '\\\\').replace('"', '\\"') + '"}')
  response.writer.flush()
}

/** Allowed file extensions for log paths. Comparison is case-insensitive. */
final List<String> ALLOWED_EXTENSIONS = ['.log', '.out']

// Path validation rules:
//   - No NUL bytes.
//   - At most ONE `..` path segment (so `../logs/tomcat/catalina.out` is OK,
//     but `../../etc/passwd` and `foo/../../bar` are rejected).
//   - At most ONE `.` path segment (so `./logs/x` is OK, `./logs/./x` is not).
//   - Filename must end in one of ALLOWED_EXTENSIONS (case-insensitive).
// A "segment" means a token between path separators (forward or back slash).
// Relative paths are allowed; absolute paths are also allowed.
def isPathSafe = { String p ->
  if (p == null || p.isEmpty()) return false
  // Reject NUL byte. Use the (int) overload of String.indexOf — Groovy's
  // dynamic dispatch otherwise boxes `(char) 0` into a Character for which
  // there is no matching indexOf overload.
  if (p.indexOf(0 as int) >= 0) return false
  String lower = p.toLowerCase(Locale.ROOT)
  boolean extOk = ALLOWED_EXTENSIONS.any { ext -> lower.endsWith(ext) }
  if (!extOk) return false
  String[] segments = p.split('[/\\\\]')
  int dotDot = 0
  int dot = 0
  for (String seg : segments) {
    if (seg == '..') {
      dotDot++
      if (dotDot > 1) return false
    } else if (seg == '.') {
      dot++
      if (dot > 1) return false
    }
  }
  return true
}

String requestedPath = (params.path ?: '').toString().trim()

if (requestedPath.isEmpty()) {
  log.error("LogTail: no <path> configured in ui.xml for this widget (site={})", params.siteId)
  writeJsonError(400,
      "No log file path configured. Set <path> in this widget's ui.xml configuration.")
  return null
}
if (!isPathSafe(requestedPath)) {
  log.error("LogTail: refused unsafe path '{}' (site={}, remote={})",
      requestedPath, params.siteId, request.remoteAddr)
  writeJsonError(400, "Refused unsafe log file path: ${requestedPath}".toString())
  return null
}

File logFile = new File(requestedPath)

if (!logFile.exists()) {
  log.error("LogTail: log file does not exist (path='{}', site={}). " +
      "Update <path> in this widget's ui.xml configuration to point at a real log file on this server.",
      logFile.absolutePath, params.siteId)
  writeJsonError(404,
      "Log file does not exist on the server: ${logFile.absolutePath}. " +
      "Fix <path> in this widget's ui.xml configuration.".toString())
  return null
}
if (!logFile.isFile()) {
  log.error("LogTail: configured path is not a regular file (path='{}', site={})",
      logFile.absolutePath, params.siteId)
  writeJsonError(400,
      "Configured log path is not a regular file: ${logFile.absolutePath}".toString())
  return null
}
if (!logFile.canRead()) {
  log.error("LogTail: log file is not readable by the Crafter process (path='{}', site={}). " +
      "Check filesystem permissions for the user running Tomcat.",
      logFile.absolutePath, params.siteId)
  writeJsonError(403,
      "Log file exists but is not readable by the Crafter process: ${logFile.absolutePath}. " +
      "Check filesystem permissions.".toString())
  return null
}

// ---- Servlet-context shared state ----------------------------------------
// Two AtomicIntegers live on the Studio ServletContext so all instances of
// this script (across users, sites, panels) coordinate:
//
//   uigoodies.logTail.activeConnections  — current count of running tails.
//   uigoodies.logTail.dropGeneration     — bumped by `log-tail-drop-all`;
//                                          every streaming loop samples it
//                                          at start and exits cleanly when
//                                          it changes, so ALL active users
//                                          get disconnected at once.

def servletContext = request.getServletContext()
def getOrCreateCounter = { String attr ->
  def ref = servletContext.getAttribute(attr)
  if (ref == null) {
    synchronized (servletContext) {
      ref = servletContext.getAttribute(attr)
      if (ref == null) {
        ref = new AtomicInteger(0)
        servletContext.setAttribute(attr, ref)
      }
    }
  }
  return (AtomicInteger) ref
}
AtomicInteger active = getOrCreateCounter('uigoodies.logTail.activeConnections')
AtomicInteger dropGen = getOrCreateCounter('uigoodies.logTail.dropGeneration')
int dropGenAtStart = dropGen.get()

int current = active.incrementAndGet()
if (current > MAX_CONCURRENT_CONNECTIONS) {
  active.decrementAndGet()
  log.warn("LogTail: rejecting connection — over MAX_CONCURRENT_CONNECTIONS={} (site={})",
      MAX_CONCURRENT_CONNECTIONS, params.siteId)
  writeJsonError(503, "Too many log tail connections.")
  return null
}

log.debug("LogTail: streaming '{}' (site={}, active={}/{}, dropGen={})",
    logFile.absolutePath, params.siteId, current, MAX_CONCURRENT_CONNECTIONS, dropGenAtStart)

// ---- Streaming response headers (NDJSON) ---------------------------------

response.contentType = 'application/x-ndjson'
response.characterEncoding = 'UTF-8'
response.setHeader('Cache-Control', 'no-cache, no-transform')
response.setHeader('Connection', 'keep-alive')
response.setHeader('X-Accel-Buffering', 'no') // disable proxy buffering (nginx)
response.flushBuffer()

PrintWriter writer = response.writer

def jsonEscape = { String s ->
  if (s == null) return ''
  StringBuilder out = new StringBuilder(s.length() + 8)
  for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i)
    switch (c) {
      case '"': out.append('\\"'); break
      case '\\': out.append('\\\\'); break
      case '\n': out.append('\\n'); break
      case '\r': out.append('\\r'); break
      case '\t': out.append('\\t'); break
      case '\b': out.append('\\b'); break
      case '\f': out.append('\\f'); break
      default:
        if (c < 0x20) {
          out.append(String.format('\\u%04x', (int) c))
        } else {
          out.append(c)
        }
    }
  }
  return out.toString()
}

// Each event is a single JSON object on its own line. `extra` is a map of
// additional already-formatted JSON fragments to merge in (no values escaped
// here — caller passes pre-built JSON values).
def sendEvent = { String type, Map<String, String> extra ->
  StringBuilder line = new StringBuilder(128)
  line.append('{"type":"').append(type).append('"')
  extra.each { k, v ->
    line.append(',"').append(k).append('":').append(v)
  }
  line.append('}\n')
  writer.print(line.toString())
  writer.flush()
  return !writer.checkError()
}

// Convenience: send a `log` event whose only payload is one line of text.
def sendLog = { String line ->
  return sendEvent('log', ['line': '"' + jsonEscape(line) + '"'])
}

// ---- Stream loop ----------------------------------------------------------

RandomAccessFile raf = null

try {
  raf = new RandomAccessFile(logFile, 'r')
  long fileLen = logFile.length()
  long startOffset = Math.max(0L, fileLen - INITIAL_REWIND_BYTES)
  raf.seek(startOffset)

  // Drop a partial first line so we always start at a clean line boundary
  if (startOffset > 0) {
    int b
    while ((b = raf.read()) != -1 && b != 0x0A) { /* skip until newline */ }
  }

  if (!sendEvent('hello', [
      'path': '"' + jsonEscape(logFile.absolutePath) + '"',
      'startOffset': String.valueOf(raf.getFilePointer()),
      'active': String.valueOf(current)
  ])) {
    return null
  }

  long started = System.currentTimeMillis()
  long lastHeartbeat = started
  byte[] buf = new byte[MAX_BYTES_PER_BATCH]
  StringBuilder partial = new StringBuilder(1024)

  while (true) {
    long now = System.currentTimeMillis()
    if (now - started > MAX_RUN_MILLIS) {
      sendEvent('bye', ['reason': '"time-cap"'])
      break
    }
    // Global kill switch: bumped by the log-tail-drop-all script.
    if (dropGen.get() != dropGenAtStart) {
      sendEvent('bye', ['reason': '"drop-all"'])
      break
    }

    // Handle truncation / rotation: file shrank below our pointer.
    long len = logFile.length()
    if (len < raf.getFilePointer()) {
      raf.close()
      raf = new RandomAccessFile(logFile, 'r')
      raf.seek(0)
      partial.setLength(0)
      if (!sendEvent('rotated', ['path': '"' + jsonEscape(logFile.absolutePath) + '"'])) {
        return null
      }
    }

    int read
    boolean readSomething = false
    while ((read = raf.read(buf)) > 0) {
      readSomething = true
      String chunk = new String(buf, 0, read, 'UTF-8')
      int from = 0
      int idx
      while ((idx = chunk.indexOf('\n', from)) >= 0) {
        partial.append(chunk, from, idx)
        String line = partial.length() > MAX_LINE_BYTES
          ? partial.substring(0, MAX_LINE_BYTES) + '\u2026 [truncated]'
          : partial.toString()
        if (!sendLog(line)) {
          return null
        }
        partial.setLength(0)
        from = idx + 1
      }
      if (from < chunk.length()) {
        partial.append(chunk, from, chunk.length())
        if (partial.length() > MAX_LINE_BYTES) {
          String line = partial.substring(0, MAX_LINE_BYTES) + '\u2026 [truncated]'
          if (!sendLog(line)) {
            return null
          }
          partial.setLength(0)
        }
      }
    }

    if (now - lastHeartbeat > HEARTBEAT_INTERVAL_MS) {
      if (!sendEvent('hb', ['ts': String.valueOf(now)])) {
        return null
      }
      lastHeartbeat = now
    }

    if (!readSomething) {
      Thread.sleep(POLL_INTERVAL_MS)
    }
  }
} catch (InterruptedException ignored) {
  Thread.currentThread().interrupt()
} catch (Throwable t) {
  log.error("LogTail: error while streaming '{}' (site={}): {}",
      logFile?.absolutePath, params.siteId, t.message, t)
  try {
    sendEvent('error', ['message': '"' + jsonEscape(t.message ?: t.class.simpleName) + '"'])
  } catch (Throwable ignored) {
    /* connection probably already gone */
  }
} finally {
  try {
    if (raf != null) raf.close()
  } catch (Throwable ignored) {}
  active.decrementAndGet()
}

return null
