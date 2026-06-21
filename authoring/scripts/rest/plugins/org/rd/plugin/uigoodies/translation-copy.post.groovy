import groovy.json.JsonSlurper
import org.dom4j.Document
import org.dom4j.DocumentHelper
import org.dom4j.Element
import org.dom4j.Text
import org.dom4j.io.OutputFormat
import org.dom4j.io.XMLWriter
import org.craftercms.studio.api.v1.service.content.ContentService as V1ContentService

import java.io.ByteArrayInputStream
import java.io.StringWriter
import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.ArrayList
import java.util.HashSet
import java.util.UUID
import java.util.regex.Matcher

/**
 * Translation server-side copy/translate endpoint.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-copy.post?siteId=...
 *
 * Params (query, form fields, or JSON body — see mergePluginParams):
 *   - sourcePath          (required) absolute source item path
 *   - targetParentPath    (required) absolute parent folder for the copy (missing folders are created)
 *   - expectedTargetPath  (optional) absolute destination file path; if omitted, uses {@code targetParentPath + '/' + source file name}
 *
 * Note: Studio passes {@code params} from servlet parameters only. JSON POST bodies are not exposed as parameters,
 * so we merge {@code application/json} into the effective map (query/form still override the body).
 *
 * Implementation: reads source XML through {@code cstudioContentService}, applies locale / shared-ref updates, then
 * writes with the form pipeline {@code writeContent(site, folderPath, fileName, contentType, input, createFolders,
 * edit, unlock)} so missing parent folders and object state stay in sync with the DB (do not use {@code createFolder}
 * plus 3-arg {@code writeContent}, which only touches git and can desync Studio metadata).
 * Referenced shared components under another locale are raw-copied when missing — no clipboard API.
 */

/**
 * Default Document.asXML() can leave stray whitespace-only {@link Text} nodes; strip before writing.
 */
void stripWhitespaceOnlyTextNodes(Element el) {
    def snapshot = new ArrayList(el.content())
    snapshot.each { node ->
        if (node instanceof Text) {
            String t = node.text
            if (t != null && t.trim().isEmpty()) {
                el.remove(node)
            }
        } else if (node instanceof Element) {
            stripWhitespaceOnlyTextNodes((Element) node)
        }
    }
}

/**
 * Studio round-trip often stores RTE / HTML fields in CDATA (see site global home index.xml).
 * Entity-escaped HTML from our parse/write cycle can confuse the legacy forms-engine / TinyMCE bootstrap.
 */
void upgradeHtmlFieldsToCdata(Element el) {
    el.elements().each { child -> upgradeHtmlFieldsToCdata((Element) child) }
    def name = el.name
    if (name != null && name.endsWith('_html')) {
        String t = el.text
        if (t != null && !t.isEmpty() && !t.contains(']]>')) {
            el.clearContent()
            el.addCDATA(t)
        }
    }
}

/**
 * Tab-indented UTF-8 XML like normal Studio saves — avoids single-line blobs and matches working locale peers.
 */
String serializeStudioContentXml(Document doc) {
    upgradeHtmlFieldsToCdata(doc.rootElement)
    stripWhitespaceOnlyTextNodes(doc.rootElement)
    def format = OutputFormat.createPrettyPrint()
    format.setEncoding('UTF-8')
    format.setIndent('\t')
    format.setExpandEmptyElements(false)
    StringWriter sw = new StringWriter()
    XMLWriter xw = new XMLWriter(sw, format)
    xw.write(doc)
    xw.close()
    String s = sw.toString()
    // Tighten declaration + root (avoid stray space after ?> seen with some writers)
    s = s.replaceFirst(/<\?xml version="1\.0" encoding="UTF-8"\?>\s*/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    if (!s.endsWith('\n')) {
        s += '\n'
    }
    return s
}

Map mergePluginParams(def servletParams, def httpRequest) {
    Map out = new LinkedHashMap()
    if (httpRequest != null) {
        def ct = String.valueOf(httpRequest.contentType ?: '').toLowerCase()
        try {
            if (ct.contains('json')) {
                def txt = httpRequest.inputStream.text
                if (txt?.trim()) {
                    def parsed = new JsonSlurper().parseText(txt.trim())
                    if (parsed instanceof Map) {
                        parsed.each { k, v -> out[k.toString()] = v }
                    }
                }
            }
        } catch (Throwable ex) {
            if (ct.contains('json')) {
                throw new IllegalArgumentException("Invalid JSON body: ${ex.message}", ex)
            }
        }
    }
    if (servletParams instanceof Map) {
        servletParams.each { k, v -> out[k.toString()] = v }
    }
    return out
}

def effectiveParams = mergePluginParams(params, request)

def sourcePath = trimParam(effectiveParams, 'sourcePath')
def targetParentPath = trimParam(effectiveParams, 'targetParentPath')
def expectedTargetPath = trimParam(effectiveParams, 'expectedTargetPath')

if (!sourcePath || !targetParentPath) {
    return [
        ok                : false,
        message           : 'sourcePath and targetParentPath are required',
        sourcePath        : sourcePath,
        targetParentPath  : targetParentPath,
        expectedTargetPath: expectedTargetPath
    ]
}

def site = trimParam(effectiveParams, 'siteId') ?: trimParam(effectiveParams, 'site')
if (!site) {
    return [ok: false, message: 'siteId is required']
}

// Studio plugin scripts bind applicationContext as ApplicationContextAccessor — use get(), not getBean().
def v1Content = applicationContext.get('cstudioContentService', V1ContentService)

def writtenPath = expectedTargetPath ?: deriveTargetFilePath(sourcePath, targetParentPath)

Map writeRes
try {
    writeRes = writeTranslatedCopy(site, sourcePath, writtenPath, v1Content)
} catch (Throwable t) {
    return [
        ok                 : false,
        message            : "Copy failed: ${t.message}",
        sourcePath         : sourcePath,
        targetParentPath   : targetParentPath,
        expectedTargetPath : expectedTargetPath,
        writtenPath        : writtenPath,
        foldersCreated     : [],
        exception          : t.class.name
    ]
}

if (!writeRes.ok) {
    return [
        ok                 : false,
        message            : writeRes.message ?: 'Copy failed',
        sourcePath         : sourcePath,
        targetParentPath   : targetParentPath,
        expectedTargetPath : expectedTargetPath,
        writtenPath        : writtenPath,
        foldersCreated     : [],
        writeDetail        : writeRes
    ]
}

def existsAfter = false
try {
    existsAfter = v1Content.contentExists(site, writtenPath)
} catch (Throwable ignored) {
    existsAfter = false
}

def strictOk = Boolean.TRUE.equals(existsAfter)

return [
    ok                : strictOk,
    message           : strictOk ? 'Copy completed' : "Copy finished but target not found at ${writtenPath}",
    sourcePath        : sourcePath,
    targetParentPath  : targetParentPath,
    expectedTargetPath: expectedTargetPath,
    pastedPath        : writtenPath,
    writtenPath       : writtenPath,
    existsAfter       : existsAfter,
    normalization     : writeRes,
    foldersCreated    : []
]

/** Child element text (handles hyphenated names like {@code content-type}). */
String elementTextLocal(Element root, String localName) {
    def e = root.element(localName)
    return e != null ? String.valueOf(e.text ?: '').trim() : ''
}

/**
 * Writes through Studio's form content pipeline (creates missing folders, updates object state / DB).
 * The 3-arg {@code writeContent(site, fullPath, stream)} only writes to git and publishes {@code SyncFromRepoEvent}.
 */
void writeContentThroughFormPipeline(V1ContentService svc, String siteId, String fullPath, String contentType, InputStream input) {
    def norm = String.valueOf(fullPath).trim().replaceAll(/\/+/, '/')
    int li = norm.lastIndexOf('/')
    if (li <= 0) {
        throw new RuntimeException("Invalid content path: ${fullPath}")
    }
    def folderPath = norm.substring(0, li)
    def fileName = norm.substring(li + 1)
    if (!fileName) {
        throw new RuntimeException("Missing file name in path: ${fullPath}")
    }
    def ct = contentType != null ? String.valueOf(contentType).trim() : ''
    svc.writeContent(siteId, folderPath, fileName, ct, input, 'true', 'false', 'true')
}

/** When {@code expectedTargetPath} is absent: same file name as source under {@code targetParentPath}. */
String deriveTargetFilePath(String sourcePath, String targetParentPath) {
    def tp = targetParentPath ? String.valueOf(targetParentPath).trim().replaceAll(/\/+\$/, '') : ''
    def idx = sourcePath.lastIndexOf('/')
    def fileName = idx >= 0 ? sourcePath.substring(idx + 1) : sourcePath
    return "${tp}/${fileName}".replace('//', '/')
}

/**
 * Rewrites {@code key}/{@code include} paths under {@code item-list="true"} from source locale folder to target folder.
 * Copies missing shared XML via {@link #rawCopyXml} (which applies the same rules recursively).
 */
Map rewriteItemListRefsForTranslation(Element root, String siteId, String sourceFolderSeg, String targetFolderSeg,
                                     String originLocaleMeta, V1ContentService contentSvc, Set inFlight = null) {
    if (inFlight == null) {
        inFlight = new HashSet<String>()
    }
    int rewrittenRefs = 0
    int copiedShared = 0
    if (!sourceFolderSeg || !targetFolderSeg || sourceFolderSeg.equalsIgnoreCase(targetFolderSeg)) {
        return [rewrittenRefs: rewrittenRefs, copiedShared: copiedShared]
    }
    def listParents = root.selectNodes('//*[@item-list="true"]') ?: []
    listParents.each { parent ->
        parent.elements('item').each { itemElm ->
            if (itemElm.attributeValue('inline')) return
            ['key', 'include'].each { tag ->
                def pathElm = itemElm.element(tag)
                def oldPath = textOf(pathElm)
                if (!oldPath || !oldPath.startsWith('/site/') || !oldPath.endsWith('.xml')) return
                def refSeg = getLocaleFolderSegmentFromPath(oldPath)
                if (!refLocaleMatchesTranslationSource(refSeg, sourceFolderSeg, originLocaleMeta)) return
                def newPath = replaceLocaleFolderInRepoPath(oldPath, refSeg, targetFolderSeg)
                if (newPath == oldPath) return
                boolean exists = contentSvc.contentExists(siteId, newPath)
                if (!exists) {
                    if (rawCopyXml(siteId, oldPath, newPath, contentSvc, inFlight)) {
                        copiedShared++
                        exists = true
                    }
                }
                if (exists && upsertElementText(pathElm, itemElm, tag, newPath)) {
                    rewrittenRefs++
                }
            }
        }
    }
    return [rewrittenRefs: rewrittenRefs, copiedShared: copiedShared]
}

/**
 * Read source XML, apply Translation field / ref updates, write to {@code targetPath}.
 * Missing referenced shared XML under the target locale is raw-copied first.
 */
Map writeTranslatedCopy(String siteId, String sourcePath, String targetPath, V1ContentService contentSvc) {
    def src = contentSvc.getContentAsString(siteId, sourcePath)
    if (src == null || String.valueOf(src).trim().isEmpty()) {
        return [ok: false, message: "Source missing or empty: ${sourcePath}"]
    }

    def doc = DocumentHelper.parseText(String.valueOf(src))
    def root = doc.rootElement

    /** Exact locale folder names from repo paths (e.g. {@code ar-sa}), not shortened metadata codes. */
    def sourceFolderSeg = getLocaleFolderSegmentFromPath(sourcePath)
    def targetFolderSeg = getLocaleFolderSegmentFromPath(targetPath)
    def originLocaleMeta = textOf(root.selectSingleNode('localeCode_s')) ?:
        (sourceFolderSeg ? sourceFolderSeg.toLowerCase() : '')

    int updatedFields = normalizeForTranslatedCopy(root, sourcePath, targetPath)

    def refStats = rewriteItemListRefsForTranslation(root, siteId, sourceFolderSeg, targetFolderSeg, originLocaleMeta, contentSvc)
    int rewrittenRefs = refStats.rewrittenRefs
    int copiedShared = refStats.copiedShared

    def ctype = elementTextLocal(root, 'content-type')
    if (!ctype) {
        return [ok: false, message: 'content-type element is missing in source XML (required for pipeline write)']
    }

    def xml = serializeStudioContentXml(doc)
    writeContentThroughFormPipeline(contentSvc, siteId, targetPath, ctype, new ByteArrayInputStream(xml.getBytes('UTF-8')))
    return [ok: true, updatedFields: updatedFields, rewrittenRefs: rewrittenRefs, copiedShared: copiedShared]
}

/**
 * Copy shared XML to the target locale path with the same normalization as the page (ids, folder-name, locale fields)
 * so nested items open in Studio.
 */
boolean rawCopyXml(String siteId, String fromPath, String toPath, V1ContentService contentSvc, Set inFlight = null) {
    if (inFlight == null) {
        inFlight = new HashSet<String>()
    }
    if (inFlight.contains(toPath)) {
        return false
    }
    inFlight.add(toPath)
    try {
        def raw = contentSvc.getContentAsString(siteId, fromPath)
        if (raw == null || String.valueOf(raw).trim().isEmpty()) {
            return false
        }
        def doc = DocumentHelper.parseText(String.valueOf(raw))
        def root = doc.rootElement
        def sourceFolderSeg = getLocaleFolderSegmentFromPath(fromPath)
        def targetFolderSeg = getLocaleFolderSegmentFromPath(toPath)
        def originMeta = textOf(root.selectSingleNode('localeCode_s')) ?:
            (sourceFolderSeg ? sourceFolderSeg.toLowerCase() : '')
        normalizeForTranslatedCopy(root, fromPath, toPath)
        rewriteItemListRefsForTranslation(root, siteId, sourceFolderSeg, targetFolderSeg, originMeta, contentSvc, inFlight)
        def ctype = elementTextLocal(root, 'content-type')
        if (!ctype) {
            return false
        }
        def xml = serializeStudioContentXml(doc)
        writeContentThroughFormPipeline(contentSvc, siteId, toPath, ctype, new ByteArrayInputStream(xml.getBytes('UTF-8')))
        return contentSvc.contentExists(siteId, toPath)
    } catch (Throwable t) {
        return false
    } finally {
        inFlight.remove(toPath)
    }
}

String getLocaleFromPath(String path) {
    if (!path) return ''
    def seg = getLocaleFolderSegmentFromPath(path)
    return seg ? String.valueOf(seg).toLowerCase() : ''
}

/**
 * BCP47-style compatibility (matches Translation JS): {@code ar} matches {@code ar-sa}; {@code en} matches {@code en-us}.
 */
boolean localeSegmentsCompatible(String a, String b) {
    if (!a || !b) return false
    def s = String.valueOf(a).trim().toLowerCase().replace('_', '-')
    def c = String.valueOf(b).trim().toLowerCase().replace('_', '-')
    if (!s || !c) return false
    if (s == c) return true
    if (s.startsWith(c + '-')) return true
    if (c.startsWith(s + '-')) return true
    return false
}

/**
 * Replace the locale folder segment after {@code /components/} or {@code /website/} only (full segment — avoids
 * replacing {@code /en/} inside {@code /en-us/}). {@code oldSeg} must match the folder name in {@code path} (any casing).
 */
String replaceLocaleFolderInRepoPath(String path, String oldSeg, String newSeg) {
    if (!path || !oldSeg || !newSeg) return path
    if (oldSeg.equalsIgnoreCase(newSeg)) return path
    def q = java.util.regex.Pattern.quote(oldSeg)
    def r = Matcher.quoteReplacement(newSeg)
    def out = String.valueOf(path)
    out = out.replaceAll("(?i)(/components/)${q}(/)", "\$1${r}\$2")
    out = out.replaceAll("(?i)(/website/)${q}(/)", "\$1${r}\$2")
    return out
}

/** True if {@code refSeg} is the locale folder used by this translation source (path segment or metadata). */
boolean refLocaleMatchesTranslationSource(String refSeg, String sourceFolderSeg, String originLocaleMeta) {
    if (!refSeg) return false
    if (sourceFolderSeg && refSeg.equalsIgnoreCase(sourceFolderSeg)) return true
    if (originLocaleMeta && refSeg.equalsIgnoreCase(originLocaleMeta)) return true
    if (sourceFolderSeg && localeSegmentsCompatible(refSeg, sourceFolderSeg)) return true
    if (originLocaleMeta && localeSegmentsCompatible(refSeg, originLocaleMeta)) return true
    return false
}

/** Same locale segment as {@link #getLocaleFromPath} but preserves repo casing (must match {@code folder-name}). */
String getLocaleFolderSegmentFromPath(String path) {
    if (!path) return ''
    def parts = path.replaceFirst('^/site/[^/]+/', '').split('/').findAll { it }
    if (!parts) return ''
    def reserved = ['website', 'components', 'static-assets', 'templates', 'scripts', 'config'] as Set
    if (reserved.contains(parts[0]?.toLowerCase()) && parts.size() > 1) {
        return String.valueOf(parts[1])
    }
    return String.valueOf(parts[0])
}

/** Crafter-style UTC timestamps e.g. {@code 2026-04-28T21:04:31.969Z}. */
String crafterUtcTimestampNow() {
    return DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        .withZone(ZoneOffset.UTC)
        .format(Instant.now())
}

/**
 * New object ids, folder-name, locale metadata, and fresh timestamps so Studio can open the item and indexes stay unique.
 */
int normalizeForTranslatedCopy(def root, String sourcePath, String targetPath) {
    def targetLocale = getLocaleFromPath(targetPath)
    def sourceLocaleFromPath = getLocaleFromPath(sourcePath)
    def originLocale = textOf(root.selectSingleNode('localeCode_s')) ?: sourceLocaleFromPath
    def folderSeg = getLocaleFolderSegmentFromPath(targetPath)
    int n = 0
    def newOid = UUID.randomUUID().toString()
    def newGroup = newOid.length() >= 4 ? newOid.substring(0, 4) : newOid
    n += upsertText(root, 'objectId', newOid) ? 1 : 0
    n += upsertText(root, 'objectGroupId', newGroup) ? 1 : 0
    if (folderSeg) {
        n += upsertText(root, 'folder-name', folderSeg) ? 1 : 0
    }
    def nowIso = crafterUtcTimestampNow()
    n += upsertText(root, 'createdDate', nowIso) ? 1 : 0
    n += upsertText(root, 'createdDate_dt', nowIso) ? 1 : 0
    n += upsertText(root, 'lastModifiedDate', nowIso) ? 1 : 0
    n += upsertText(root, 'lastModifiedDate_dt', nowIso) ? 1 : 0
    if (targetLocale) {
        if (originLocale && !originLocale.equalsIgnoreCase(targetLocale)) {
            n += upsertText(root, 'localeCode_s', targetLocale) ? 1 : 0
            n += upsertText(root, 'sourceLocaleCode_s', originLocale) ? 1 : 0
        } else {
            n += upsertText(root, 'localeSourceId_s', UUID.randomUUID().toString()) ? 1 : 0
            n += upsertText(root, 'sourceLocaleCode_s', targetLocale) ? 1 : 0
            n += upsertText(root, 'localeCode_s', targetLocale) ? 1 : 0
        }
    }
    return n
}

String textOf(def node) {
    if (node == null) return ''
    def s = String.valueOf(node.text ?: '').trim()
    return s
}

boolean upsertText(def rootElem, String name, String value) {
    def elem = rootElem.element(name)
    if (elem != null) {
        if (String.valueOf(elem.text ?: '') == String.valueOf(value ?: '')) return false
        elem.text = String.valueOf(value ?: '')
        return true
    }
    def newElem = DocumentHelper.createElement(name)
    newElem.text = String.valueOf(value ?: '')
    rootElem.add(newElem)
    return true
}

boolean upsertElementText(def elem, def parent, String name, String value) {
    if (elem != null) {
        if (String.valueOf(elem.text ?: '') == String.valueOf(value ?: '')) return false
        elem.text = String.valueOf(value ?: '')
        return true
    }
    def newElem = DocumentHelper.createElement(name)
    newElem.text = String.valueOf(value ?: '')
    parent.add(newElem)
    return true
}

String trimParam(Map p, String key) {
    def v = p[key]
    if (v == null) return null
    def s = String.valueOf(v).trim()
    return s ? s : null
}
