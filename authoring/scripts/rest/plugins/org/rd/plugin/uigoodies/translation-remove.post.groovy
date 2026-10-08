import groovy.json.JsonSlurper
import java.util.regex.Pattern
import org.craftercms.studio.api.v1.service.content.ContentService as V1ContentService
import org.craftercms.studio.api.v1.service.dependency.DependencyService as V1DependencyService
import org.craftercms.studio.api.v2.service.content.ContentService as V2ContentService

/**
 * Deletes selected locale-specific components and the translated page in one Studio delete
 * (same workflow as the Delete dialog, including removal from live for published items).
 *
 * POST .../translation-remove.post?siteId=...
 * Body JSON:
 * {
 *   "pagePath": "/site/.../website/es/foo/index.xml",
 *   "componentPaths": [ "/site/.../components/es/hero.xml", ... ],
 *   "deletePage": true
 * }
 */

Map mergePluginParams(def servletParams, def httpRequest) {
    Map out = new LinkedHashMap()
    if (httpRequest != null) {
        try {
            def ct = String.valueOf(httpRequest.contentType ?: '').toLowerCase()
            if (ct.contains('json')) {
                def txt = httpRequest.inputStream.text
                if (txt?.trim()) {
                    def parsed = new JsonSlurper().parseText(txt.trim())
                    if (parsed instanceof Map) {
                        parsed.each { k, v -> out[k.toString()] = v }
                    }
                }
            }
        } catch (Throwable ignored) {
        }
    }
    if (servletParams instanceof Map) {
        servletParams.each { k, v -> out[k.toString()] = v }
    }
    return out
}

String trimParam(Map params, String key) {
    def v = params[key]
    return v != null ? String.valueOf(v).trim() : ''
}

String normPath(String p) {
    if (!p) return ''
    return p.replace('\\', '/').replaceAll(/\/+$/, '').trim()
}

String extractLocaleFolderFromPagePath(String pagePath) {
    String n = normPath(pagePath)
    def m1 = (n =~ /^\/site\/[^\/]+\/website\/([^\/]+)\//)
    if (m1.find()) return m1.group(1)
    def m2 = (n =~ /^\/site\/website\/([^\/]+)\//)
    if (m2.find()) return m2.group(1)
    return ''
}

Set<String> extractComponentPathsFromXml(String xml, String localeSeg) {
    Set<String> found = new LinkedHashSet<>()
    if (!xml || !localeSeg) return found
    String q = Pattern.quote(localeSeg)
    List<Pattern> pats = [
        Pattern.compile('/site/[^/]+/components/' + q + '/[^\\s"\'<>]+\\.xml'),
        Pattern.compile('/site/components/' + q + '/[^\\s"\'<>]+\\.xml')
    ]
    for (Pattern pat : pats) {
        def m = pat.matcher(xml)
        while (m.find()) {
            found.add(normPath(m.group()))
        }
    }
    return found
}

Set<String> collectComponentClosure(String site, String localeSeg, String rootXml, V1ContentService contentSvc) {
    Set<String> closure = new LinkedHashSet<>()
    ArrayDeque<String> q = new ArrayDeque<>()
    extractComponentPathsFromXml(rootXml, localeSeg).each { q.add(normPath(it)) }
    Set<String> visited = new HashSet<>()
    while (!q.isEmpty()) {
        String path = q.poll()
        String np = normPath(path)
        if (!visited.add(np)) continue
        closure.add(np)
        try {
            String cx = contentSvc.getContentAsString(site, np)
            if (cx) {
                extractComponentPathsFromXml(cx, localeSeg).each { child ->
                    String cn = normPath(child)
                    if (!visited.contains(cn)) q.add(cn)
                }
            }
        } catch (Throwable ignored) {
        }
    }
    return closure
}

boolean componentEligible(
    V1DependencyService depSvc,
    String site,
    String pagePath,
    String compPath,
    Set<String> closureNorm
) {
    Set<String> deps = null
    try {
        deps = depSvc.getItemsDependingOn(site, compPath, 1)
    } catch (Throwable t) {
        return false
    }
    if (deps == null || deps.isEmpty()) return false
    String npPage = normPath(pagePath)
    for (String r : deps) {
        String nr = normPath(r)
        if (!nr) continue
        if (nr.contains('/website/') && nr.endsWith('.xml')) {
            if (!nr.equalsIgnoreCase(npPage)) return false
            continue
        }
        if (nr.contains('/components/')) {
            boolean inClosure = closureNorm.any { cn -> cn.equalsIgnoreCase(nr) }
            if (!inClosure) return false
            continue
        }
        return false
    }
    return true
}

V1DependencyService resolveDependencyService(def ctx) {
    String[] names = ['dependencyService', 'studioDependencyService']
    for (String n : names) {
        try {
            def bean = ctx.get(n, V1DependencyService)
            if (bean != null) return bean
        } catch (Throwable ignored) {
        }
    }
    return null
}

def effectiveParams = mergePluginParams(params, request)
def siteId = trimParam(effectiveParams, 'siteId') ?: trimParam(effectiveParams, 'site')
def pagePath = normPath(trimParam(effectiveParams, 'pagePath'))
def deletePageFlag = effectiveParams.containsKey('deletePage') ? Boolean.valueOf(String.valueOf(effectiveParams.deletePage)) : true

List<String> requestedPaths = []
def rawList = effectiveParams.componentPaths
if (rawList instanceof List) {
    rawList.each { requestedPaths << normPath(String.valueOf(it)) }
}

if (!siteId || !pagePath) {
    return [ok: false, message: 'siteId and pagePath are required', deleted: [], failed: []]
}

String localeSeg = extractLocaleFolderFromPagePath(pagePath)
if (!localeSeg) {
    return [ok: false, message: 'Invalid page path for locale inference', deleted: [], failed: []]
}

def contentSvc = applicationContext.get('cstudioContentService', V1ContentService)
def depSvc = resolveDependencyService(applicationContext)
if (depSvc == null) {
    return [ok: false, message: 'DependencyService is not available', deleted: [], failed: []]
}

String pageXml
try {
    pageXml = contentSvc.getContentAsString(siteId, pagePath)
} catch (Throwable t) {
    return [ok: false, message: "Cannot read page: ${t.message}", deleted: [], failed: []]
}
if (!pageXml) {
    return [ok: false, message: 'Page content is empty', deleted: [], failed: []]
}

Set<String> closure = collectComponentClosure(siteId, localeSeg, pageXml, contentSvc)
Set<String> closureNorm = closure.collect { normPath(it) }.toSet()

Set<String> allowed = new LinkedHashSet<>()
for (String comp : closure) {
    String np = normPath(comp)
    if (componentEligible(depSvc, siteId, pagePath, np, closureNorm)) {
        allowed.add(np)
    }
}

List<String> toDelete = requestedPaths.findAll { p ->
    p && allowed.any { a -> a.equalsIgnoreCase(p) }
}

// deepest paths first (nested components before parents)
toDelete.sort { a, b -> Integer.compare(b.count('/'), a.count('/')) }

List<String> deleted = []
List<Map> failed = []

List<String> batch = new ArrayList<>(toDelete)
if (deletePageFlag) {
    batch << pagePath
}

// v1 deleteContent removes the page folder from git but leaves its row in the item table; the Sidebar
// then lists a folder that does not exist. Use the same v2 delete as Studio's Delete dialog.
if (!batch.isEmpty()) {
    def deleteSvc = applicationContext.get('contentService', V2ContentService)
    try {
        if (deleteSvc.deleteContent(siteId, batch, "Removed translation ${pagePath}".toString())) {
            deleted.addAll(batch)
        } else {
            batch.each { failed << [path: it, message: 'deleteContent returned false'] }
        }
    } catch (Throwable t) {
        batch.each { failed << [path: it, message: String.valueOf(t.message)] }
    }
}

return [
    ok    : failed.isEmpty(),
    deleted: deleted,
    failed : failed
]
