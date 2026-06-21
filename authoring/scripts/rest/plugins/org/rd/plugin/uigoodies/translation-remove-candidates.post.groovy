import groovy.json.JsonSlurper
import java.util.regex.Pattern
import org.craftercms.studio.api.v1.service.content.ContentService as V1ContentService
import org.craftercms.studio.api.v1.service.dependency.DependencyService as V1DependencyService

/**
 * Lists shared components under the same locale as {@code pagePath} that are reachable from the page XML
 * and only depended on by {@code pagePath} (for website XML) or by other components in that same reachable set.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove-candidates.post?siteId=...
 * Body JSON: { "pagePath": "/site/.../website/es/foo/index.xml" }
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

String readInternalName(String xml) {
    if (!xml) return ''
    def m = (xml =~ /<internal-name>\s*([^<]*)\s*<\/internal-name>/)
    return m.find() ? String.valueOf(m.group(1)).trim() : ''
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
    if (deps == null) return false
    if (deps.isEmpty()) return true
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
def pagePath = trimParam(effectiveParams, 'pagePath')

if (!siteId || !pagePath) {
    return [ok: false, message: 'siteId and pagePath are required', candidates: []]
}

String localeSeg = extractLocaleFolderFromPagePath(pagePath)
if (!localeSeg) {
    return [ok: false, message: 'Could not infer locale folder from page path (expected .../website/{locale}/...)', candidates: []]
}

def contentSvc = applicationContext.get('cstudioContentService', V1ContentService)
def depSvc = resolveDependencyService(applicationContext)
if (depSvc == null) {
    return [ok: false, message: 'DependencyService is not available', candidates: []]
}

String pageXml
try {
    pageXml = contentSvc.getContentAsString(siteId, pagePath)
} catch (Throwable t) {
    return [ok: false, message: "Cannot read page: ${t.message}", candidates: []]
}
if (!pageXml) {
    return [ok: false, message: 'Page content is empty', candidates: []]
}

Set<String> closure = collectComponentClosure(siteId, localeSeg, pageXml, contentSvc)
Set<String> closureNorm = closure.collect { normPath(it) }.toSet()

List<Map> outList = []
for (String comp : closure) {
    String np = normPath(comp)
    if (!componentEligible(depSvc, siteId, pagePath, np, closureNorm)) continue
    String cx = ''
    try {
        cx = contentSvc.getContentAsString(siteId, np)
    } catch (Throwable ignored) {
    }
    outList << [
        path        : np,
        internalName: readInternalName(cx)
    ]
}

return [
    ok          : true,
    pagePath    : normPath(pagePath),
    localeFolder: localeSeg,
    candidates  : outList
]
