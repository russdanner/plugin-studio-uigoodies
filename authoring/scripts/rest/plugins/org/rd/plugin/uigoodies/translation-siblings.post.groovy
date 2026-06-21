import org.opensearch.client.opensearch.OpenSearchClient
import org.opensearch.client.opensearch._types.FieldValue
import org.opensearch.client.opensearch._types.query_dsl.BoolQuery
import org.opensearch.client.opensearch._types.query_dsl.Query
import org.opensearch.client.opensearch.core.SearchRequest

/**
 * Translation — translation siblings search (preview OpenSearch index).
 *
 * Invoked by Studio: POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-siblings.post?siteId=...
 *
 * Query params (or form fields):
 *   contentType     — required, e.g. /page/article
 *   localeSourceId  — optional lineage id (localeSourceId_s on the current item)
 *   objectId        — optional; also matched against localeSourceId_s on indexed docs
 *   limit           — optional, default 200, max 500
 *
 * OpenSearch index pattern: {siteId}{suffix}* where suffix defaults to -preview (preview index).
 * Optional plugin config key translationSearchIndexSuffix overrides suffix (e.g. -authoring for testing).
 */

def ctype = trimParam(params, 'contentType') ?: trimParam(params, 'content-type')
def lsid = trimParam(params, 'localeSourceId')
def oid = trimParam(params, 'objectId')
def limit = parseLimit(params.get('limit'))

if (!ctype) {
    return [ok: false, message: 'contentType is required', items: [], total: 0]
}
if (!lsid && !oid) {
    return [ok: false, message: 'localeSourceId and/or objectId is required', items: [], total: 0]
}

def indexSuffix = '-preview'
try {
    if (pluginConfig != null && pluginConfig.containsKey('translationSearchIndexSuffix')) {
        def v = pluginConfig.getString('translationSearchIndexSuffix')
        if (v) {
            indexSuffix = v
        }
    }
} catch (Exception ignored) {
}

def indexPattern = siteId + indexSuffix + '*'

def boolB = new BoolQuery.Builder()
boolB.minimumShouldMatch('1')
boolB.must(
    Query.of { q ->
        q.term { t ->
            t.field('content-type').value(FieldValue.of(ctype))
        }
    }
)
if (lsid) {
    boolB.should(
        Query.of { q ->
            q.term { t ->
                t.field('localeSourceId_s').value(FieldValue.of(lsid))
            }
        }
    )
}
if (oid) {
    boolB.should(
        Query.of { q ->
            q.term { t ->
                t.field('localeSourceId_s').value(FieldValue.of(oid))
            }
        }
    )
}

def searchReq = new SearchRequest.Builder()
    .index(indexPattern)
    .query(Query.of { q -> q.bool(boolB.build()) })
    .size(limit)
    .build()

def client = applicationContext.get('searchClient')
if (client == null) {
    return [ok: false, message: 'searchClient not available', items: [], total: 0]
}

def resp
try {
    resp = (client as OpenSearchClient).search(searchReq, Map.class)
} catch (Exception e) {
    return [ok: false, message: "Search failed: ${e.message}", items: [], total: 0]
}

def hits = resp.hits()?.hits() ?: []
def items = hits.collect { hit ->
    def src = hit.source() ?: [:]
    [
        localId       : src['localId'],
        contentType   : src['content-type'],
        localeSourceId: src['localeSourceId_s'],
        objectId      : src['objectId'],
        localeCode    : src['localeCode_s'],
        internalName  : src['internal-name'],
        title         : src['title_t']
    ]
}

def total = resp.hits()?.total()?.value()
if (total == null) {
    total = items.size()
}

return [
    ok          : true,
    items       : items,
    total       : total,
    indexPattern: indexPattern
]

String trimParam(Map p, String key) {
    def v = p[key]
    if (v == null) {
        return null
    }
    def s = String.valueOf(v).trim()
    return s ? s : null
}

int parseLimit(Object raw) {
    def defLimit = 200
    if (raw == null) {
        return defLimit
    }
    try {
        int n = Integer.parseInt(String.valueOf(raw).trim())
        if (n < 1) {
            return defLimit
        }
        return Math.min(n, 500)
    } catch (NumberFormatException e) {
        return defLimit
    }
}
