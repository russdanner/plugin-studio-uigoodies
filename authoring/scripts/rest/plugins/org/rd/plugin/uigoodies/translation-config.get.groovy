import groovy.transform.Field
import org.dom4j.DocumentHelper
import org.craftercms.studio.api.v1.service.content.ContentService as V1ContentService

/**
 * Reads Translation locale list from /config/studio/translation-config.xml.
 * No auto-seed and no hardcoded default locale list: missing or invalid XML returns ok:false.
 *
 * Query param ensureDefault is ignored (kept for backward-compatible URLs).
 *
 * LOCALE_KNOWN must be @Field: typed helper methods (Map lookupLocaleMeta, etc.) are compiled as
 * real class methods and do not see plain {@code def LOCALE_KNOWN} — MissingPropertyException at runtime.
 */

/** 2-char and common BCP47-style keys (lowercase, hyphen). Values: display label + flag emoji. */
@Field Map LOCALE_KNOWN = [
    'ar'    : [label: 'Arabic', flag: '\uD83C\uDDF8\uD83C\uDDE6'],
    'ar-sa' : [label: 'Arabic (Saudi Arabia)', flag: '\uD83C\uDDF8\uD83C\uDDE6'],
    'bg'    : [label: 'Bulgarian', flag: '\uD83C\uDDE7\uD83C\uDDEC'],
    'bn'    : [label: 'Bengali', flag: '\uD83C\uDDE7\uD83C\uDDE9'],
    'ca'    : [label: 'Catalan', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'cs'    : [label: 'Czech', flag: '\uD83C\uDDE8\uD83C\uDDFF'],
    'da'    : [label: 'Danish', flag: '\uD83C\uDDE9\uD83C\uDDF0'],
    'de'    : [label: 'German', flag: '\uD83C\uDDE9\uD83C\uDDEA'],
    'de-at' : [label: 'German (Austria)', flag: '\uD83C\uDDE6\uD83C\uDDF9'],
    'de-ch' : [label: 'German (Switzerland)', flag: '\uD83C\uDDE8\uD83C\uDDED'],
    'de-de' : [label: 'German (Germany)', flag: '\uD83C\uDDE9\uD83C\uDDEA'],
    'el'    : [label: 'Greek', flag: '\uD83C\uDDEC\uD83C\uDDF7'],
    'en'    : [label: 'English', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'en-au' : [label: 'English (Australia)', flag: '\uD83C\uDDE6\uD83C\uDDFA'],
    'en-ca' : [label: 'English (Canada)', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'en-gb' : [label: 'English (UK)', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'en-us' : [label: 'English (US)', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'es'    : [label: 'Spanish', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'es-es' : [label: 'Spanish (Spain)', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'es-mx' : [label: 'Spanish (Mexico)', flag: '\uD83C\uDDF2\uD83C\uDDFD'],
    'et'    : [label: 'Estonian', flag: '\uD83C\uDDEA\uD83C\uDDEA'],
    'fi'    : [label: 'Finnish', flag: '\uD83C\uDDEB\uD83C\uDDEE'],
    'fr'    : [label: 'French', flag: '\uD83C\uDDEB\uD83C\uDDF7'],
    'fr-ca' : [label: 'French (Canada)', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'fr-fr' : [label: 'French (France)', flag: '\uD83C\uDDEB\uD83C\uDDF7'],
    'he'    : [label: 'Hebrew', flag: '\uD83C\uDDEE\uD83C\uDDF1'],
    'hi'    : [label: 'Hindi', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'hr'    : [label: 'Croatian', flag: '\uD83C\uDDED\uD83C\uDDF7'],
    'hu'    : [label: 'Hungarian', flag: '\uD83C\uDDED\uD83C\uDDFA'],
    'id'    : [label: 'Indonesian', flag: '\uD83C\uDDEE\uD83C\uDDE9'],
    'it'    : [label: 'Italian', flag: '\uD83C\uDDEE\uD83C\uDDF9'],
    'it-it' : [label: 'Italian (Italy)', flag: '\uD83C\uDDEE\uD83C\uDDF9'],
    'ja'    : [label: 'Japanese', flag: '\uD83C\uDDEF\uD83C\uDDF5'],
    'ja-jp' : [label: 'Japanese (Japan)', flag: '\uD83C\uDDEF\uD83C\uDDF5'],
    'ko'    : [label: 'Korean', flag: '\uD83C\uDDF0\uD83C\uDDF7'],
    'ko-kr' : [label: 'Korean (Korea)', flag: '\uD83C\uDDF0\uD83C\uDDF7'],
    'ms'    : [label: 'Malay', flag: '\uD83C\uDDF2\uD83C\uDDFE'],
    'nl'    : [label: 'Dutch', flag: '\uD83C\uDDF3\uD83C\uDDF1'],
    'nl-be' : [label: 'Dutch (Belgium)', flag: '\uD83C\uDDE7\uD83C\uDDEA'],
    'nl-nl' : [label: 'Dutch (Netherlands)', flag: '\uD83C\uDDF3\uD83C\uDDF1'],
    'no'    : [label: 'Norwegian', flag: '\uD83C\uDDF3\uD83C\uDDF4'],
    'pl'    : [label: 'Polish', flag: '\uD83C\uDDF5\uD83C\uDDF1'],
    'pt'    : [label: 'Portuguese', flag: '\uD83C\uDDF5\uD83C\uDDF9'],
    'pt-br' : [label: 'Portuguese (Brazil)', flag: '\uD83C\uDDE7\uD83C\uDDF7'],
    'pt-pt' : [label: 'Portuguese (Portugal)', flag: '\uD83C\uDDF5\uD83C\uDDF9'],
    'ro'    : [label: 'Romanian', flag: '\uD83C\uDDF7\uD83C\uDDF4'],
    'ru'    : [label: 'Russian', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'ru-ru' : [label: 'Russian (Russia)', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'sk'    : [label: 'Slovak', flag: '\uD83C\uDDF8\uD83C\uDDF0'],
    'sv'    : [label: 'Swedish', flag: '\uD83C\uDDF8\uD83C\uDDEA'],
    'th'    : [label: 'Thai', flag: '\uD83C\uDDF9\uD83C\uDDED'],
    'tr'    : [label: 'Turkish', flag: '\uD83C\uDDF9\uD83C\uDDF7'],
    'uk'    : [label: 'Ukrainian', flag: '\uD83C\uDDFA\uD83C\uDDE6'],
    'vi'    : [label: 'Vietnamese', flag: '\uD83C\uDDFB\uD83C\uDDF3'],
    'zh'    : [label: 'Chinese', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'zh-cn' : [label: 'Chinese (Simplified)', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'zh-tw' : [label: 'Chinese (Traditional)', flag: '\uD83C\uDDF9\uD83C\uDDFC'],
    'cn'    : [label: 'Chinese', flag: '\uD83C\uDDE8\uD83C\uDDF3']
]

def site = (params.siteId ?: params.site ?: '').toString().trim()
if (!site) {
    return [ok: false, message: 'siteId is required']
}

def cfgPath = '/config/studio/translation-config.xml'
// Studio binds applicationContext as ApplicationContextAccessor — use get(name, type), not getBean().
def contentSvc = applicationContext.get('cstudioContentService', V1ContentService)
def raw = contentSvc.getContentAsString(site, cfgPath)

if (!raw || String.valueOf(raw).trim().isEmpty()) {
    return [ok: false, message: "Missing or empty ${cfgPath}", path: cfgPath]
}

def doc
try {
    doc = DocumentHelper.parseText(String.valueOf(raw))
} catch (Throwable t) {
    return [ok: false, message: "Invalid XML in ${cfgPath}: ${t.message}", path: cfgPath]
}

def result = parseTranslationConfig(doc?.rootElement)
if (!result) {
    return [ok: false, message: "Could not read localeCodes from ${cfgPath}", path: cfgPath]
}

return [
    ok          : true,
    path        : cfgPath,
    baseLanguage: result.baseLanguage,
    languages   : result.languages
]

Map parseTranslationConfig(def root) {
    if (root == null) return null
    if (String.valueOf(root.name ?: '') != 'translation-config') return null

    def codesParent = root.element('localeCodes')
    def defaultCodeRaw = text(root.element('defaultLocaleCode'))
    if (codesParent == null) return null

    def seen = [:]
    def list = []
    codesParent.elements('localeCode').each { codeElm ->
        def rawCode = text(codeElm)
        if (!rawCode) return
        def key = normalizeLookupKey(rawCode)
        if (!key) return
        def norm = folderLocaleFromKey(key)
        if (!norm) return
        if (seen[norm]) return
        seen[norm] = true
        def meta = lookupLocaleMeta(key) ?: lookupLocaleMeta(norm) ?: [label: norm, flag: '\uD83C\uDF10']
        list << [locale: norm, label: meta.label, flag: meta.flag]
    }

    if (list.isEmpty()) return null

    def defaultKey = normalizeLookupKey(defaultCodeRaw)
    def normalizedDefault = defaultKey ? folderLocaleFromKey(defaultKey) : ''
    if (!normalizedDefault || !seen[normalizedDefault]) {
        normalizedDefault = list[0].locale
    }
    return [
        baseLanguage: normalizedDefault,
        languages   : list
    ]
}

/** Lowercase, hyphen; preserve 5-char style keys for map lookup. */
String normalizeLookupKey(String code) {
    if (!code) return ''
    def c = String.valueOf(code).trim().toLowerCase()
    if (!c) return ''
    return c.replace('_', '-')
}

/**
 * Normalized locale folder / API segment (BCP-47 style: ar-sa, zh-cn).
 * Must match the first path segment under website/components — do not truncate to 2 letters,
 * or folders named {@code ar-SA} / {@code zh-CN} will not align with {@code localeCode} values.
 */
String folderLocaleFromKey(String key) {
    if (!key) return ''
    def k = String.valueOf(key).trim().toLowerCase().replace('_', '-')
    return k ?: ''
}

Map lookupLocaleMeta(String key) {
    if (!key) return null
    def k = normalizeLookupKey(key)
    if (LOCALE_KNOWN.containsKey(k)) {
        return LOCALE_KNOWN[k] as Map
    }
    if (k.length() > 2) {
        def two = k.substring(0, 2)
        if (LOCALE_KNOWN.containsKey(two)) {
            return LOCALE_KNOWN[two] as Map
        }
    }
    return null
}

String text(def e) {
    if (e == null) return ''
    return String.valueOf(e.text ?: '').trim()
}
