import plugins.org.rd.plugin.uigoodies.TranslationConfigSupport

/**
 * Reads Translation locale list from /config/studio/translation-config.xml (not site-config.xml).
 * Locale document order is preserved. Optional per-locale language/flag override the catalog.
 * No auto-seed and no hardcoded default locale list: missing or invalid XML returns ok:false.
 *
 * Query param ensureDefault is ignored (kept for backward-compatible URLs).
 */

def site = (params.siteId ?: params.site ?: '').toString().trim()
if (!site) {
    return [ok: false, message: 'siteId is required']
}

return TranslationConfigSupport.load(applicationContext, site)
