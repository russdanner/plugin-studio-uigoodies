import org.craftercms.studio.api.v1.service.content.ContentService as V1ContentService
import org.opensearch.client.opensearch.OpenSearchClient
import org.opensearch.client.opensearch._types.FieldValue
import org.opensearch.client.opensearch._types.query_dsl.BoolQuery
import org.opensearch.client.opensearch._types.query_dsl.Query
import org.opensearch.client.opensearch.core.SearchRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.uigoodies.TranslationConfigSupport

/**
 * Translation — every configured locale variant of one content item, in a single call.
 * Used by the translation form control and the preview toolbar instead of per-locale requests.
 *
 * GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-locales?siteId=…&path=…
 *
 *   path — optional repo path of the item (e.g. /site/website/en/about/index.xml). Without it only the
 *          translation config is returned.
 *
 * Variants are found two ways and merged per locale:
 *   lineage — preview-index items of the same content-type whose localeSourceId_s equals this item's
 *             localeSourceId_s or objectId (same query as translation-siblings.post)
 *   folder  — the same relative path under each configured locale folder ({root}/{locale}/…)
 *
 * Response:
 *   ok, baseLanguage, languages[{locale,label,flag}], path, rootDir, relativeUnderLocale, currentLocale,
 *   sourceLocale, contentType, objectId, localeSourceId,
 *   locales[{locale, code, label, flag, path, parentPath, exists, lastModified, isSource, isOutdated,
 *            isCurrent, isPage, matchedBy}]
 */

Logger log = LoggerFactory.getLogger('org.rd.plugin.uigoodies.TranslationLocales')

def site = (params.siteId ?: params.site ?: '').toString().trim()
def itemPath = normalizePath((params.path ?: '').toString().trim())
if (!site) {
    return [ok: false, message: 'siteId is required', locales: []]
}

def cfg = TranslationConfigSupport.load(applicationContext, site)
if (!cfg.ok) {
    return [ok: false, message: cfg.message, locales: []]
}
List<Map> languages = cfg.languages as List<Map>
Map result = [ok: true, baseLanguage: cfg.baseLanguage, languages: languages, path: itemPath, locales: []]
if (!itemPath || languages.size() < 2) {
    return result
}

def contentSvc = applicationContext.get('cstudioContentService', V1ContentService)

String rootDir = rootDirFor(itemPath)
if (!rootDir) {
    result.message = 'Path is not under a website or components folder.'
    return result
}

// Configured codes mapped to the folder names actually on disk (ar-sa vs ar-SA, zh vs zh-cn).
List<String> diskFolders = []
try {
    def tree = contentSvc.getContentItemTree(site, rootDir, 1)
    tree?.children?.each { child ->
        def seg = lastSegment(child?.uri ?: child?.path ?: child?.name)
        if (seg) diskFolders << seg
    }
} catch (Throwable t) {
    log.debug('translation-locales: could not list {}: {}', rootDir, t.message)
}
List<Map> folderRows = languages.collect { lang ->
    String code = lang.locale as String
    String folder = diskFolders.find { it.equalsIgnoreCase(code) } ?:
        diskFolders.find { localeCompatible(it, code) } ?: code
    [code: code, folder: folder, label: lang.label, flag: lang.flag]
}

// Where the item sits: {rootDir}/{locale}{relativeUnderLocale}
String rest = itemPath.length() > rootDir.length() ? itemPath.substring(rootDir.length() + 1) : ''
if (!rest) {
    result.message = 'Path is the locale root folder.'
    return result
}
String firstSeg = rest.split('/')[0]
Map currentRow = folderRows.find { localeCompatible(firstSeg, it.folder as String) }
String relativeUnderLocale = currentRow ? rest.substring(firstSeg.length()) : '/' + rest
result.rootDir = rootDir
result.relativeUnderLocale = relativeUnderLocale
result.currentLocale = currentRow?.folder

// Lineage fields from the item itself (missing for new, unsaved items).
Map fields = readItemFields(contentSvc, site, itemPath)
String contentType = (params.contentType ?: fields.contentType ?: '').toString().trim()
String localeSourceId = (params.localeSourceId ?: fields.localeSourceId ?: '').toString().trim()
String objectId = (params.objectId ?: fields.objectId ?: '').toString().trim()
String sourceLocale = (params.sourceLocale ?: fields.sourceLocale ?: '').toString().trim()
result.contentType = contentType
result.localeSourceId = localeSourceId
result.objectId = objectId
result.sourceLocale = sourceLocale

// Lineage matches: locale folder -> path. In its own locale the open item wins over copies sharing its lineage id.
Map<String, String> lineageByFolder = [:]
if (currentRow) {
    lineageByFolder[currentRow.folder as String] = itemPath
}
if (contentType && (localeSourceId || objectId)) {
    searchLineage(site, contentType, localeSourceId, objectId, log).each { String p ->
        String r = rootDirFor(p)
        if (!r || p.length() <= r.length()) return
        String seg = p.substring(r.length() + 1).split('/')[0]
        Map row = folderRows.find { localeCompatible(seg, it.folder as String) }
        if (row && !lineageByFolder.containsKey(row.folder) && contentSvc.contentExists(site, p)) {
            lineageByFolder[row.folder as String] = p
        }
    }
}

List<Map> locales = folderRows.collect { row ->
    String folder = row.folder as String
    String lineagePath = lineageByFolder[folder]
    String folderPath = "${rootDir}/${folder}${relativeUnderLocale}".toString()
    String path = lineagePath ?: folderPath
    boolean exists = lineagePath ? true : contentSvc.contentExists(site, folderPath)
    [
        locale      : folder,
        code        : row.code,
        label       : row.label ?: folder,
        flag        : row.flag ?: '',
        path        : path,
        parentPath  : parentOf(path),
        exists      : exists,
        lastModified: exists ? lastModifiedMs(contentSvc, site, path) : null,
        isSource    : sourceLocale ? localeCompatible(folder, sourceLocale) : false,
        isCurrent   : path == itemPath,
        isPage      : path.toLowerCase().contains('/website/') && path.toLowerCase().endsWith('.xml'),
        matchedBy   : lineagePath ? 'lineage' : (exists ? 'folder' : null)
    ]
}

// The open item counts as present even before its first save.
locales.findAll { it.isCurrent && !it.exists }.each { it.exists = true }

Map sourceRow = locales.find { it.isSource && it.exists }
Long sourceModified = sourceRow ? (Long) sourceRow.lastModified : lastModifiedMs(contentSvc, site, itemPath)
locales.each { row ->
    row.isOutdated = row.exists && !row.isSource && sourceModified != null && row.lastModified != null &&
        (Long) row.lastModified < sourceModified
}

result.locales = locales
return result

// ---------------------------------------------------------------------------

String normalizePath(String p) {
    if (!p) return ''
    return p.replace('\\', '/').replaceAll('/+$', '')
}

String rootDirFor(String fullPath) {
    if (!fullPath) return null
    def m = (fullPath =~ /^(\/site\/[^\/]+\/(?:website|components))(?=\/|$)/)
    if (m.find()) return m.group(1)
    if (fullPath.startsWith('/site/website')) return '/site/website'
    if (fullPath.startsWith('/site/components')) return '/site/components'
    return null
}

String lastSegment(Object p) {
    if (p == null) return ''
    def parts = String.valueOf(p).split('/').findAll { it }
    return parts ? parts[-1] : ''
}

String parentOf(String p) {
    int i = p.lastIndexOf('/')
    return i <= 0 ? '/' : p.substring(0, i)
}

/** Exact match, or one is a regional form of the other (zh ↔ zh-cn). Mirrors localeSegmentsCompatible. */
boolean localeCompatible(String a, String b) {
    String s = (a ?: '').trim().toLowerCase().replace('_', '-')
    String c = (b ?: '').trim().toLowerCase().replace('_', '-')
    if (!s || !c) return false
    return s == c || s.startsWith(c + '-') || c.startsWith(s + '-')
}

Map readItemFields(def contentSvc, String site, String path) {
    try {
        if (!contentSvc.contentExists(site, path)) return [:]
        def root = contentSvc.getContentAsDocument(site, path)?.rootElement
        if (root == null) return [:]
        return [
            contentType   : root.elementTextTrim('content-type'),
            objectId      : root.elementTextTrim('objectId'),
            localeSourceId: root.elementTextTrim('localeSourceId_s'),
            sourceLocale  : root.elementTextTrim('sourceLocaleCode_s')
        ]
    } catch (Throwable ignored) {
        return [:]
    }
}

Long lastModifiedMs(def contentSvc, String site, String path) {
    try {
        def item = contentSvc.getContentItem(site, path, 0)
        def d = item?.lastEditDate
        return d != null ? d.toInstant().toEpochMilli() : null
    } catch (Throwable ignored) {
        return null
    }
}

List<String> searchLineage(String site, String contentType, String localeSourceId, String objectId, Logger log) {
    def indexSuffix = '-preview'
    try {
        if (pluginConfig != null && pluginConfig.containsKey('translationSearchIndexSuffix')) {
            def v = pluginConfig.getString('translationSearchIndexSuffix')
            if (v) indexSuffix = v
        }
    } catch (Exception ignored) {
    }
    def client = applicationContext.get('searchClient')
    if (client == null) return []

    def boolB = new BoolQuery.Builder()
    boolB.minimumShouldMatch('1')
    boolB.must(Query.of { q -> q.term { t -> t.field('content-type').value(FieldValue.of(contentType)) } })
    [localeSourceId, objectId].findAll { it }.unique().each { String v ->
        boolB.should(Query.of { q -> q.term { t -> t.field('localeSourceId_s').value(FieldValue.of(v)) } })
    }
    def req = new SearchRequest.Builder()
        .index(site + indexSuffix + '*')
        .query(Query.of { q -> q.bool(boolB.build()) })
        .size(200)
        .build()
    try {
        def resp = (client as OpenSearchClient).search(req, Map.class)
        return (resp.hits()?.hits() ?: []).collect { hit -> hit.source()?.get('localId') as String }.findAll { it }
    } catch (Exception e) {
        log.warn('translation-locales: lineage search failed for site {}: {}', site, e.message)
        return []
    }
}
