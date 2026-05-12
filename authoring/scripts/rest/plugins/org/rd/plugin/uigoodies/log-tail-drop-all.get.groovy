/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Studio plugin script: server-wide kill switch for all active log-tail
 * streams. Bumps a "drop generation" AtomicInteger on the Studio
 * ServletContext; every running `log-tail.get` streaming loop samples that
 * counter once per iteration and exits cleanly when it changes, so ALL
 * users currently tailing a log are disconnected at once.
 *
 * Endpoint (Studio plugin script API — runs in Studio, not Engine):
 *   GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/log-tail-drop-all
 *       ?siteId=<site>
 *
 * Response:
 *   200 application/json
 *   { "dropGeneration": <new int>, "previousActive": <int>, "active": <int> }
 *
 * `previousActive` is the number of tails that were running when the kill
 * switch was thrown (useful for the UI to report how many viewers were
 * affected). `active` is the count immediately after — usually still
 * non-zero for a moment since streams take up to POLL_INTERVAL_MS (~750ms)
 * to notice the change and exit their finally{} block.
 */

import java.util.concurrent.atomic.AtomicInteger

import org.slf4j.Logger
import org.slf4j.LoggerFactory

Logger log = LoggerFactory.getLogger('org.rd.plugin.uigoodies.LogTail')

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

int previousActive = active.get()
int newGeneration = dropGen.incrementAndGet()

log.warn("LogTail: drop-all triggered (site={}, user={}, previousActive={}, dropGeneration={})",
    params.siteId, request.remoteUser, previousActive, newGeneration)

response.status = 200
response.contentType = 'application/json'
response.characterEncoding = 'UTF-8'
response.writer.print(
    '{"dropGeneration":' + newGeneration +
    ',"previousActive":' + previousActive +
    ',"active":' + active.get() + '}'
)
response.writer.flush()

return null
