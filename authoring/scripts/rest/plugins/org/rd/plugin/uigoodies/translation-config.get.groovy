import groovy.transform.Field
import org.dom4j.DocumentHelper
import org.craftercms.studio.api.v1.service.content.ContentService as V1ContentService

/**
 * Reads Translation locale list from /config/studio/translation-config.xml (not site-config.xml).
 * Locale document order is preserved. Optional per-locale language/flag override the catalog.
 * No auto-seed and no hardcoded default locale list: missing or invalid XML returns ok:false.
 *
 * Query param ensureDefault is ignored (kept for backward-compatible URLs).
 *
 * LOCALE_KNOWN must be @Field: typed helper methods (Map lookupLocaleMeta, etc.) are compiled as
 * real class methods and do not see plain {@code def LOCALE_KNOWN} — MissingPropertyException at runtime.
 */

/**
 * Locale catalog (ISO 639-1, regional tags, ISO 3166 market aliases). Keep in sync with multiLocaleConfig.ts.
 * Note: {@code uk} is English (UK) for CMS folders; use {@code ua} / {@code uk-ua} for Ukrainian.
 */
@Field Map LOCALE_KNOWN = [
    'aa' : [label: 'Afar', flag: '\uD83C\uDDEA\uD83C\uDDF9'],
    'ab' : [label: 'Abkhaz', flag: '\uD83C\uDDEC\uD83C\uDDEA'],
    'ad' : [label: 'Andorra', flag: '\uD83C\uDDE6\uD83C\uDDE9'],
    'ae' : [label: 'Arabic (UAE)', flag: '\uD83C\uDDE6\uD83C\uDDEA'],
    'af' : [label: 'Afrikaans', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'ag' : [label: 'Antigua and Barbuda', flag: '\uD83C\uDDE6\uD83C\uDDEC'],
    'ai' : [label: 'Anguilla', flag: '\uD83C\uDDE6\uD83C\uDDEE'],
    'ak' : [label: 'Akan', flag: '\uD83C\uDDEC\uD83C\uDDED'],
    'al' : [label: 'Albania', flag: '\uD83C\uDDE6\uD83C\uDDF1'],
    'am' : [label: 'Amharic', flag: '\uD83C\uDDEA\uD83C\uDDF9'],
    'an' : [label: 'Aragonese', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'ao' : [label: 'Angola', flag: '\uD83C\uDDE6\uD83C\uDDF4'],
    'aq' : [label: 'Antarctica', flag: '\uD83C\uDDE6\uD83C\uDDF6'],
    'ar' : [label: 'Arabic', flag: '\uD83C\uDDF8\uD83C\uDDE6'],
    'ar-ae' : [label: 'Arabic (UAE)', flag: '\uD83C\uDDE6\uD83C\uDDEA'],
    'ar-bh' : [label: 'Arabic (Bahrain)', flag: '\uD83C\uDDE7\uD83C\uDDED'],
    'ar-dz' : [label: 'Arabic (Algeria)', flag: '\uD83C\uDDE9\uD83C\uDDFF'],
    'ar-eg' : [label: 'Arabic (Egypt)', flag: '\uD83C\uDDEA\uD83C\uDDEC'],
    'ar-iq' : [label: 'Arabic (Iraq)', flag: '\uD83C\uDDEE\uD83C\uDDF6'],
    'ar-jo' : [label: 'Arabic (Jordan)', flag: '\uD83C\uDDEF\uD83C\uDDF4'],
    'ar-kw' : [label: 'Arabic (Kuwait)', flag: '\uD83C\uDDF0\uD83C\uDDFC'],
    'ar-lb' : [label: 'Arabic (Lebanon)', flag: '\uD83C\uDDF1\uD83C\uDDE7'],
    'ar-ly' : [label: 'Arabic (Libya)', flag: '\uD83C\uDDF1\uD83C\uDDFE'],
    'ar-ma' : [label: 'Arabic (Morocco)', flag: '\uD83C\uDDF2\uD83C\uDDE6'],
    'ar-om' : [label: 'Arabic (Oman)', flag: '\uD83C\uDDF4\uD83C\uDDF2'],
    'ar-qa' : [label: 'Arabic (Qatar)', flag: '\uD83C\uDDF6\uD83C\uDDE6'],
    'ar-sa' : [label: 'Arabic (Saudi Arabia)', flag: '\uD83C\uDDF8\uD83C\uDDE6'],
    'ar-sy' : [label: 'Arabic (Syria)', flag: '\uD83C\uDDF8\uD83C\uDDFE'],
    'ar-tn' : [label: 'Arabic (Tunisia)', flag: '\uD83C\uDDF9\uD83C\uDDF3'],
    'ar-ye' : [label: 'Arabic (Yemen)', flag: '\uD83C\uDDFE\uD83C\uDDEA'],
    'as' : [label: 'Assamese', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'at' : [label: 'Austria', flag: '\uD83C\uDDE6\uD83C\uDDF9'],
    'au' : [label: 'English (Australia)', flag: '\uD83C\uDDE6\uD83C\uDDFA'],
    'av' : [label: 'Avaric', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'aw' : [label: 'Aruba', flag: '\uD83C\uDDE6\uD83C\uDDFC'],
    'ax' : [label: 'Åland Islands', flag: '\uD83C\uDDE6\uD83C\uDDFD'],
    'ay' : [label: 'Aymara', flag: '\uD83C\uDDE7\uD83C\uDDF4'],
    'az' : [label: 'Azerbaijani', flag: '\uD83C\uDDE6\uD83C\uDDFF'],
    'ba' : [label: 'Bashkir', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'bb' : [label: 'Barbados', flag: '\uD83C\uDDE7\uD83C\uDDE7'],
    'bd' : [label: 'Bangladesh', flag: '\uD83C\uDDE7\uD83C\uDDE9'],
    'be' : [label: 'Belarusian', flag: '\uD83C\uDDE7\uD83C\uDDFE'],
    'bf' : [label: 'Burkina Faso', flag: '\uD83C\uDDE7\uD83C\uDDEB'],
    'bg' : [label: 'Bulgarian', flag: '\uD83C\uDDE7\uD83C\uDDEC'],
    'bh' : [label: 'Bihari', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'bi' : [label: 'Bislama', flag: '\uD83C\uDDFB\uD83C\uDDFA'],
    'bj' : [label: 'Benin', flag: '\uD83C\uDDE7\uD83C\uDDEF'],
    'bl' : [label: 'Saint Barthélemy', flag: '\uD83C\uDDE7\uD83C\uDDF1'],
    'bm' : [label: 'Bambara', flag: '\uD83C\uDDF2\uD83C\uDDF1'],
    'bn' : [label: 'Bengali', flag: '\uD83C\uDDE7\uD83C\uDDE9'],
    'bn-bd' : [label: 'Bengali (Bangladesh)', flag: '\uD83C\uDDE7\uD83C\uDDE9'],
    'bn-in' : [label: 'Bengali (India)', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'bo' : [label: 'Tibetan Standard', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'bq' : [label: 'Bonaire, Sint Eustatius and Saba', flag: '\uD83C\uDDE7\uD83C\uDDF6'],
    'br' : [label: 'Portuguese (Brazil)', flag: '\uD83C\uDDE7\uD83C\uDDF7'],
    'bs' : [label: 'Bosnian', flag: '\uD83C\uDDE7\uD83C\uDDE6'],
    'bt' : [label: 'Bhutan', flag: '\uD83C\uDDE7\uD83C\uDDF9'],
    'bv' : [label: 'Bouvet Island', flag: '\uD83C\uDDE7\uD83C\uDDFB'],
    'bw' : [label: 'Botswana', flag: '\uD83C\uDDE7\uD83C\uDDFC'],
    'by' : [label: 'Belarus', flag: '\uD83C\uDDE7\uD83C\uDDFE'],
    'bz' : [label: 'Belize', flag: '\uD83C\uDDE7\uD83C\uDDFF'],
    'ca' : [label: 'Catalan', flag: '\uD83C\uDDE6\uD83C\uDDE9'],
    'cc' : [label: 'Cocos (Keeling) Islands', flag: '\uD83C\uDDE8\uD83C\uDDE8'],
    'cd' : [label: 'Congo, Democratic Republic of the', flag: '\uD83C\uDDE8\uD83C\uDDE9'],
    'ce' : [label: 'Chechen', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'cf' : [label: 'Central African Republic', flag: '\uD83C\uDDE8\uD83C\uDDEB'],
    'cg' : [label: 'Congo', flag: '\uD83C\uDDE8\uD83C\uDDEC'],
    'ch' : [label: 'Chamorro', flag: '\uD83C\uDDEC\uD83C\uDDFA'],
    'ci' : [label: 'Côte d\'Ivoire', flag: '\uD83C\uDDE8\uD83C\uDDEE'],
    'ck' : [label: 'Cook Islands', flag: '\uD83C\uDDE8\uD83C\uDDF0'],
    'cl' : [label: 'Chile', flag: '\uD83C\uDDE8\uD83C\uDDF1'],
    'cm' : [label: 'Cameroon', flag: '\uD83C\uDDE8\uD83C\uDDF2'],
    'cn' : [label: 'Chinese', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'co' : [label: 'Corsican', flag: '\uD83C\uDDEB\uD83C\uDDF7'],
    'common' : [label: 'Common', flag: '\uD83C\uDF10'],
    'cr' : [label: 'Cree', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'cs' : [label: 'Czech', flag: '\uD83C\uDDE8\uD83C\uDDFF'],
    'cu' : [label: 'Old Church Slavonic', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'cv' : [label: 'Chuvash', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'cw' : [label: 'Curaçao', flag: '\uD83C\uDDE8\uD83C\uDDFC'],
    'cx' : [label: 'Christmas Island', flag: '\uD83C\uDDE8\uD83C\uDDFD'],
    'cy' : [label: 'Welsh', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'cz' : [label: 'Czechia', flag: '\uD83C\uDDE8\uD83C\uDDFF'],
    'da' : [label: 'Danish', flag: '\uD83C\uDDE9\uD83C\uDDF0'],
    'de' : [label: 'German', flag: '\uD83C\uDDE9\uD83C\uDDEA'],
    'de-at' : [label: 'German (Austria)', flag: '\uD83C\uDDE6\uD83C\uDDF9'],
    'de-ch' : [label: 'German (Switzerland)', flag: '\uD83C\uDDE8\uD83C\uDDED'],
    'de-de' : [label: 'German (Germany)', flag: '\uD83C\uDDE9\uD83C\uDDEA'],
    'de-li' : [label: 'German (Liechtenstein)', flag: '\uD83C\uDDF1\uD83C\uDDEE'],
    'de-lu' : [label: 'German (Luxembourg)', flag: '\uD83C\uDDF1\uD83C\uDDFA'],
    'dj' : [label: 'Djibouti', flag: '\uD83C\uDDE9\uD83C\uDDEF'],
    'dk' : [label: 'Danish', flag: '\uD83C\uDDE9\uD83C\uDDF0'],
    'dm' : [label: 'Dominica', flag: '\uD83C\uDDE9\uD83C\uDDF2'],
    'do' : [label: 'Dominican Republic', flag: '\uD83C\uDDE9\uD83C\uDDF4'],
    'dv' : [label: 'Divehi', flag: '\uD83C\uDDF2\uD83C\uDDFB'],
    'dz' : [label: 'Dzongkha', flag: '\uD83C\uDDE7\uD83C\uDDF9'],
    'ec' : [label: 'Ecuador', flag: '\uD83C\uDDEA\uD83C\uDDE8'],
    'ee' : [label: 'Ewe', flag: '\uD83C\uDDEC\uD83C\uDDED'],
    'eg' : [label: 'Egypt', flag: '\uD83C\uDDEA\uD83C\uDDEC'],
    'eh' : [label: 'Western Sahara', flag: '\uD83C\uDDEA\uD83C\uDDED'],
    'el' : [label: 'Greek (modern)', flag: '\uD83C\uDDEC\uD83C\uDDF7'],
    'en' : [label: 'English', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'en-au' : [label: 'English (Australia)', flag: '\uD83C\uDDE6\uD83C\uDDFA'],
    'en-bz' : [label: 'English (Belize)', flag: '\uD83C\uDDE7\uD83C\uDDFF'],
    'en-ca' : [label: 'English (Canada)', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'en-gb' : [label: 'English (UK)', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'en-hk' : [label: 'English (Hong Kong)', flag: '\uD83C\uDDED\uD83C\uDDF0'],
    'en-ie' : [label: 'English (Ireland)', flag: '\uD83C\uDDEE\uD83C\uDDEA'],
    'en-in' : [label: 'English (India)', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'en-jm' : [label: 'English (Jamaica)', flag: '\uD83C\uDDEF\uD83C\uDDF2'],
    'en-my' : [label: 'English (Malaysia)', flag: '\uD83C\uDDF2\uD83C\uDDFE'],
    'en-nz' : [label: 'English (New Zealand)', flag: '\uD83C\uDDF3\uD83C\uDDFF'],
    'en-ph' : [label: 'English (Philippines)', flag: '\uD83C\uDDF5\uD83C\uDDED'],
    'en-sg' : [label: 'English (Singapore)', flag: '\uD83C\uDDF8\uD83C\uDDEC'],
    'en-tt' : [label: 'English (Trinidad & Tobago)', flag: '\uD83C\uDDF9\uD83C\uDDF9'],
    'en-us' : [label: 'English (US)', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'en-za' : [label: 'English (South Africa)', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'en-zw' : [label: 'English (Zimbabwe)', flag: '\uD83C\uDDFF\uD83C\uDDFC'],
    'eo' : [label: 'Esperanto', flag: '\uD83C\uDF10'],
    'er' : [label: 'Eritrea', flag: '\uD83C\uDDEA\uD83C\uDDF7'],
    'es' : [label: 'Spanish', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'es-ar' : [label: 'Spanish (Argentina)', flag: '\uD83C\uDDE6\uD83C\uDDF7'],
    'es-bo' : [label: 'Spanish (Bolivia)', flag: '\uD83C\uDDE7\uD83C\uDDF4'],
    'es-cl' : [label: 'Spanish (Chile)', flag: '\uD83C\uDDE8\uD83C\uDDF1'],
    'es-co' : [label: 'Spanish (Colombia)', flag: '\uD83C\uDDE8\uD83C\uDDF4'],
    'es-cr' : [label: 'Spanish (Costa Rica)', flag: '\uD83C\uDDE8\uD83C\uDDF7'],
    'es-do' : [label: 'Spanish (Dominican Republic)', flag: '\uD83C\uDDE9\uD83C\uDDF4'],
    'es-ec' : [label: 'Spanish (Ecuador)', flag: '\uD83C\uDDEA\uD83C\uDDE8'],
    'es-es' : [label: 'Spanish (Spain)', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'es-gt' : [label: 'Spanish (Guatemala)', flag: '\uD83C\uDDEC\uD83C\uDDF9'],
    'es-hn' : [label: 'Spanish (Honduras)', flag: '\uD83C\uDDED\uD83C\uDDF3'],
    'es-mx' : [label: 'Spanish (Mexico)', flag: '\uD83C\uDDF2\uD83C\uDDFD'],
    'es-ni' : [label: 'Spanish (Nicaragua)', flag: '\uD83C\uDDF3\uD83C\uDDEE'],
    'es-pa' : [label: 'Spanish (Panama)', flag: '\uD83C\uDDF5\uD83C\uDDE6'],
    'es-pe' : [label: 'Spanish (Peru)', flag: '\uD83C\uDDF5\uD83C\uDDEA'],
    'es-pr' : [label: 'Spanish (Puerto Rico)', flag: '\uD83C\uDDF5\uD83C\uDDF7'],
    'es-py' : [label: 'Spanish (Paraguay)', flag: '\uD83C\uDDF5\uD83C\uDDFE'],
    'es-sv' : [label: 'Spanish (El Salvador)', flag: '\uD83C\uDDF8\uD83C\uDDFB'],
    'es-uy' : [label: 'Spanish (Uruguay)', flag: '\uD83C\uDDFA\uD83C\uDDFE'],
    'es-ve' : [label: 'Spanish (Venezuela)', flag: '\uD83C\uDDFB\uD83C\uDDEA'],
    'et' : [label: 'Estonian', flag: '\uD83C\uDDEA\uD83C\uDDEA'],
    'eu' : [label: 'Basque', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'fa' : [label: 'Persian (Farsi)', flag: '\uD83C\uDDEE\uD83C\uDDF7'],
    'ff' : [label: 'Fula', flag: '\uD83C\uDDF8\uD83C\uDDF3'],
    'fi' : [label: 'Finnish', flag: '\uD83C\uDDEB\uD83C\uDDEE'],
    'fj' : [label: 'Fijian', flag: '\uD83C\uDDEB\uD83C\uDDEF'],
    'fk' : [label: 'Falkland Islands (Malvinas)', flag: '\uD83C\uDDEB\uD83C\uDDF0'],
    'fm' : [label: 'Micronesia, Federated States of', flag: '\uD83C\uDDEB\uD83C\uDDF2'],
    'fo' : [label: 'Faroese', flag: '\uD83C\uDDEB\uD83C\uDDF4'],
    'fr' : [label: 'French', flag: '\uD83C\uDDEB\uD83C\uDDF7'],
    'fr-be' : [label: 'French (Belgium)', flag: '\uD83C\uDDE7\uD83C\uDDEA'],
    'fr-ca' : [label: 'French (Canada)', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'fr-ch' : [label: 'French (Switzerland)', flag: '\uD83C\uDDE8\uD83C\uDDED'],
    'fr-fr' : [label: 'French (France)', flag: '\uD83C\uDDEB\uD83C\uDDF7'],
    'fr-lu' : [label: 'French (Luxembourg)', flag: '\uD83C\uDDF1\uD83C\uDDFA'],
    'fr-mc' : [label: 'French (Monaco)', flag: '\uD83C\uDDF2\uD83C\uDDE8'],
    'fy' : [label: 'Western Frisian', flag: '\uD83C\uDDF3\uD83C\uDDF1'],
    'ga' : [label: 'Irish', flag: '\uD83C\uDDEE\uD83C\uDDEA'],
    'gb' : [label: 'English (UK)', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'gd' : [label: 'Scottish Gaelic', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'ge' : [label: 'Georgia', flag: '\uD83C\uDDEC\uD83C\uDDEA'],
    'gf' : [label: 'French Guiana', flag: '\uD83C\uDDEC\uD83C\uDDEB'],
    'gg' : [label: 'Guernsey', flag: '\uD83C\uDDEC\uD83C\uDDEC'],
    'gh' : [label: 'Ghana', flag: '\uD83C\uDDEC\uD83C\uDDED'],
    'gi' : [label: 'Gibraltar', flag: '\uD83C\uDDEC\uD83C\uDDEE'],
    'gl' : [label: 'Galician', flag: '\uD83C\uDDEA\uD83C\uDDF8'],
    'global' : [label: 'Global', flag: '\uD83C\uDF10'],
    'gm' : [label: 'Gambia', flag: '\uD83C\uDDEC\uD83C\uDDF2'],
    'gn' : [label: 'Guaraní', flag: '\uD83C\uDDF5\uD83C\uDDFE'],
    'gp' : [label: 'Guadeloupe', flag: '\uD83C\uDDEC\uD83C\uDDF5'],
    'gq' : [label: 'Equatorial Guinea', flag: '\uD83C\uDDEC\uD83C\uDDF6'],
    'gr' : [label: 'Greece', flag: '\uD83C\uDDEC\uD83C\uDDF7'],
    'gs' : [label: 'South Georgia and the South Sandwich Islands', flag: '\uD83C\uDDEC\uD83C\uDDF8'],
    'gt' : [label: 'Guatemala', flag: '\uD83C\uDDEC\uD83C\uDDF9'],
    'gu' : [label: 'Gujarati', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'gv' : [label: 'Manx', flag: '\uD83C\uDDEE\uD83C\uDDF2'],
    'gw' : [label: 'Guinea-Bissau', flag: '\uD83C\uDDEC\uD83C\uDDFC'],
    'gy' : [label: 'Guyana', flag: '\uD83C\uDDEC\uD83C\uDDFE'],
    'ha' : [label: 'Hausa', flag: '\uD83C\uDDF3\uD83C\uDDEC'],
    'he' : [label: 'Hebrew (modern)', flag: '\uD83C\uDDEE\uD83C\uDDF1'],
    'hi' : [label: 'Hindi', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'hk' : [label: 'Chinese (Hong Kong)', flag: '\uD83C\uDDED\uD83C\uDDF0'],
    'hm' : [label: 'Heard Island and McDonald Islands', flag: '\uD83C\uDDED\uD83C\uDDF2'],
    'hn' : [label: 'Honduras', flag: '\uD83C\uDDED\uD83C\uDDF3'],
    'ho' : [label: 'Hiri Motu', flag: '\uD83C\uDDF5\uD83C\uDDEC'],
    'hr' : [label: 'Croatian', flag: '\uD83C\uDDED\uD83C\uDDF7'],
    'ht' : [label: 'Haitian', flag: '\uD83C\uDDED\uD83C\uDDF9'],
    'hu' : [label: 'Hungarian', flag: '\uD83C\uDDED\uD83C\uDDFA'],
    'hy' : [label: 'Armenian', flag: '\uD83C\uDDE6\uD83C\uDDF2'],
    'hz' : [label: 'Herero', flag: '\uD83C\uDDF3\uD83C\uDDE6'],
    'ia' : [label: 'Interlingua', flag: '\uD83C\uDF10'],
    'id' : [label: 'Indonesian', flag: '\uD83C\uDDEE\uD83C\uDDE9'],
    'ie' : [label: 'Interlingue', flag: '\uD83C\uDF10'],
    'ig' : [label: 'Igbo', flag: '\uD83C\uDDF3\uD83C\uDDEC'],
    'ii' : [label: 'Nuosu', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'ik' : [label: 'Inupiaq', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'il' : [label: 'Israel', flag: '\uD83C\uDDEE\uD83C\uDDF1'],
    'im' : [label: 'Isle of Man', flag: '\uD83C\uDDEE\uD83C\uDDF2'],
    'in' : [label: 'India', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'io' : [label: 'Ido', flag: '\uD83C\uDF10'],
    'iq' : [label: 'Iraq', flag: '\uD83C\uDDEE\uD83C\uDDF6'],
    'ir' : [label: 'Iran, Islamic Republic of', flag: '\uD83C\uDDEE\uD83C\uDDF7'],
    'is' : [label: 'Icelandic', flag: '\uD83C\uDDEE\uD83C\uDDF8'],
    'it' : [label: 'Italian', flag: '\uD83C\uDDEE\uD83C\uDDF9'],
    'it-ch' : [label: 'Italian (Switzerland)', flag: '\uD83C\uDDE8\uD83C\uDDED'],
    'it-it' : [label: 'Italian (Italy)', flag: '\uD83C\uDDEE\uD83C\uDDF9'],
    'iu' : [label: 'Inuktitut', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'ja' : [label: 'Japanese', flag: '\uD83C\uDDEF\uD83C\uDDF5'],
    'ja-jp' : [label: 'Japanese (Japan)', flag: '\uD83C\uDDEF\uD83C\uDDF5'],
    'je' : [label: 'Jersey', flag: '\uD83C\uDDEF\uD83C\uDDEA'],
    'jm' : [label: 'Jamaica', flag: '\uD83C\uDDEF\uD83C\uDDF2'],
    'jo' : [label: 'Jordan', flag: '\uD83C\uDDEF\uD83C\uDDF4'],
    'jp' : [label: 'Japanese', flag: '\uD83C\uDDEF\uD83C\uDDF5'],
    'jv' : [label: 'Javanese', flag: '\uD83C\uDDEE\uD83C\uDDE9'],
    'ka' : [label: 'Georgian', flag: '\uD83C\uDDEC\uD83C\uDDEA'],
    'ke' : [label: 'Kenya', flag: '\uD83C\uDDF0\uD83C\uDDEA'],
    'kg' : [label: 'Kongo', flag: '\uD83C\uDDE8\uD83C\uDDE9'],
    'kh' : [label: 'Cambodia', flag: '\uD83C\uDDF0\uD83C\uDDED'],
    'ki' : [label: 'Kikuyu', flag: '\uD83C\uDDF0\uD83C\uDDEA'],
    'kj' : [label: 'Kwanyama', flag: '\uD83C\uDDF3\uD83C\uDDE6'],
    'kk' : [label: 'Kazakh', flag: '\uD83C\uDDF0\uD83C\uDDFF'],
    'kl' : [label: 'Kalaallisut', flag: '\uD83C\uDDEC\uD83C\uDDF1'],
    'km' : [label: 'Khmer', flag: '\uD83C\uDDF0\uD83C\uDDED'],
    'kn' : [label: 'Kannada', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'ko' : [label: 'Korean', flag: '\uD83C\uDDF0\uD83C\uDDF7'],
    'ko-kr' : [label: 'Korean (Korea)', flag: '\uD83C\uDDF0\uD83C\uDDF7'],
    'kp' : [label: 'Korea, Democratic People\'s Republic of', flag: '\uD83C\uDDF0\uD83C\uDDF5'],
    'kr' : [label: 'Korean', flag: '\uD83C\uDDF0\uD83C\uDDF7'],
    'ks' : [label: 'Kashmiri', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'ku' : [label: 'Kurdish', flag: '\uD83C\uDDEE\uD83C\uDDF6'],
    'kv' : [label: 'Komi', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'kw' : [label: 'Cornish', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'ky' : [label: 'Kyrgyz', flag: '\uD83C\uDDF0\uD83C\uDDEC'],
    'kz' : [label: 'Kazakhstan', flag: '\uD83C\uDDF0\uD83C\uDDFF'],
    'la' : [label: 'Latin', flag: '\uD83C\uDDFB\uD83C\uDDE6'],
    'lb' : [label: 'Luxembourgish', flag: '\uD83C\uDDF1\uD83C\uDDFA'],
    'lc' : [label: 'Saint Lucia', flag: '\uD83C\uDDF1\uD83C\uDDE8'],
    'lg' : [label: 'Ganda', flag: '\uD83C\uDDFA\uD83C\uDDEC'],
    'li' : [label: 'Limburgish', flag: '\uD83C\uDDF3\uD83C\uDDF1'],
    'lk' : [label: 'Sri Lanka', flag: '\uD83C\uDDF1\uD83C\uDDF0'],
    'ln' : [label: 'Lingala', flag: '\uD83C\uDDE8\uD83C\uDDE9'],
    'lo' : [label: 'Lao', flag: '\uD83C\uDDF1\uD83C\uDDE6'],
    'lr' : [label: 'Liberia', flag: '\uD83C\uDDF1\uD83C\uDDF7'],
    'ls' : [label: 'Lesotho', flag: '\uD83C\uDDF1\uD83C\uDDF8'],
    'lt' : [label: 'Lithuanian', flag: '\uD83C\uDDF1\uD83C\uDDF9'],
    'lu' : [label: 'Luba-Katanga', flag: '\uD83C\uDDE8\uD83C\uDDE9'],
    'lv' : [label: 'Latvian', flag: '\uD83C\uDDF1\uD83C\uDDFB'],
    'ly' : [label: 'Libya', flag: '\uD83C\uDDF1\uD83C\uDDFE'],
    'ma' : [label: 'Morocco', flag: '\uD83C\uDDF2\uD83C\uDDE6'],
    'mc' : [label: 'Monaco', flag: '\uD83C\uDDF2\uD83C\uDDE8'],
    'md' : [label: 'Moldova, Republic of', flag: '\uD83C\uDDF2\uD83C\uDDE9'],
    'me' : [label: 'Montenegro', flag: '\uD83C\uDDF2\uD83C\uDDEA'],
    'mf' : [label: 'Saint Martin (French part)', flag: '\uD83C\uDDF2\uD83C\uDDEB'],
    'mg' : [label: 'Malagasy', flag: '\uD83C\uDDF2\uD83C\uDDEC'],
    'mh' : [label: 'Marshallese', flag: '\uD83C\uDDF2\uD83C\uDDED'],
    'mi' : [label: 'Māori', flag: '\uD83C\uDDF3\uD83C\uDDFF'],
    'mk' : [label: 'Macedonian', flag: '\uD83C\uDDF2\uD83C\uDDF0'],
    'ml' : [label: 'Malayalam', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'mm' : [label: 'Myanmar', flag: '\uD83C\uDDF2\uD83C\uDDF2'],
    'mn' : [label: 'Mongolian', flag: '\uD83C\uDDF2\uD83C\uDDF3'],
    'mo' : [label: 'Macao', flag: '\uD83C\uDDF2\uD83C\uDDF4'],
    'mp' : [label: 'Northern Mariana Islands', flag: '\uD83C\uDDF2\uD83C\uDDF5'],
    'mq' : [label: 'Martinique', flag: '\uD83C\uDDF2\uD83C\uDDF6'],
    'mr' : [label: 'Marathi (Marāṭhī)', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'ms' : [label: 'Malay', flag: '\uD83C\uDDF2\uD83C\uDDFE'],
    'mt' : [label: 'Maltese', flag: '\uD83C\uDDF2\uD83C\uDDF9'],
    'mu' : [label: 'Mauritius', flag: '\uD83C\uDDF2\uD83C\uDDFA'],
    'mv' : [label: 'Maldives', flag: '\uD83C\uDDF2\uD83C\uDDFB'],
    'mw' : [label: 'Malawi', flag: '\uD83C\uDDF2\uD83C\uDDFC'],
    'mx' : [label: 'Spanish (Mexico)', flag: '\uD83C\uDDF2\uD83C\uDDFD'],
    'my' : [label: 'Burmese', flag: '\uD83C\uDDF2\uD83C\uDDF2'],
    'mz' : [label: 'Mozambique', flag: '\uD83C\uDDF2\uD83C\uDDFF'],
    'na' : [label: 'Nauruan', flag: '\uD83C\uDDF3\uD83C\uDDF7'],
    'nb' : [label: 'Norwegian Bokmål', flag: '\uD83C\uDDF3\uD83C\uDDF4'],
    'nb-no' : [label: 'Norwegian Bokmål (Norway)', flag: '\uD83C\uDDF3\uD83C\uDDF4'],
    'nc' : [label: 'New Caledonia', flag: '\uD83C\uDDF3\uD83C\uDDE8'],
    'nd' : [label: 'Northern Ndebele', flag: '\uD83C\uDDFF\uD83C\uDDFC'],
    'ne' : [label: 'Nepali', flag: '\uD83C\uDDF3\uD83C\uDDF5'],
    'nf' : [label: 'Norfolk Island', flag: '\uD83C\uDDF3\uD83C\uDDEB'],
    'ng' : [label: 'Ndonga', flag: '\uD83C\uDDF3\uD83C\uDDE6'],
    'ni' : [label: 'Nicaragua', flag: '\uD83C\uDDF3\uD83C\uDDEE'],
    'nl' : [label: 'Dutch', flag: '\uD83C\uDDF3\uD83C\uDDF1'],
    'nl-be' : [label: 'Dutch (Belgium)', flag: '\uD83C\uDDE7\uD83C\uDDEA'],
    'nl-nl' : [label: 'Dutch (Netherlands)', flag: '\uD83C\uDDF3\uD83C\uDDF1'],
    'nn' : [label: 'Norwegian Nynorsk', flag: '\uD83C\uDDF3\uD83C\uDDF4'],
    'nn-no' : [label: 'Norwegian Nynorsk (Norway)', flag: '\uD83C\uDDF3\uD83C\uDDF4'],
    'no' : [label: 'Norwegian', flag: '\uD83C\uDDF3\uD83C\uDDF4'],
    'np' : [label: 'Nepal', flag: '\uD83C\uDDF3\uD83C\uDDF5'],
    'nr' : [label: 'Southern Ndebele', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'nu' : [label: 'Niue', flag: '\uD83C\uDDF3\uD83C\uDDFA'],
    'nv' : [label: 'Navajo', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'ny' : [label: 'Chichewa', flag: '\uD83C\uDDF2\uD83C\uDDFC'],
    'nz' : [label: 'New Zealand', flag: '\uD83C\uDDF3\uD83C\uDDFF'],
    'oc' : [label: 'Occitan', flag: '\uD83C\uDDEB\uD83C\uDDF7'],
    'oj' : [label: 'Ojibwe', flag: '\uD83C\uDDE8\uD83C\uDDE6'],
    'om' : [label: 'Oromo', flag: '\uD83C\uDDEA\uD83C\uDDF9'],
    'or' : [label: 'Oriya', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'os' : [label: 'Ossetian', flag: '\uD83C\uDDEC\uD83C\uDDEA'],
    'pa' : [label: '(Eastern) Punjabi', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'pe' : [label: 'Peru', flag: '\uD83C\uDDF5\uD83C\uDDEA'],
    'pf' : [label: 'French Polynesia', flag: '\uD83C\uDDF5\uD83C\uDDEB'],
    'pg' : [label: 'Papua New Guinea', flag: '\uD83C\uDDF5\uD83C\uDDEC'],
    'ph' : [label: 'Philippines', flag: '\uD83C\uDDF5\uD83C\uDDED'],
    'pi' : [label: 'Pāli', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'pk' : [label: 'Pakistan', flag: '\uD83C\uDDF5\uD83C\uDDF0'],
    'pl' : [label: 'Polish', flag: '\uD83C\uDDF5\uD83C\uDDF1'],
    'pm' : [label: 'Saint Pierre and Miquelon', flag: '\uD83C\uDDF5\uD83C\uDDF2'],
    'pn' : [label: 'Pitcairn', flag: '\uD83C\uDDF5\uD83C\uDDF3'],
    'pr' : [label: 'Puerto Rico', flag: '\uD83C\uDDF5\uD83C\uDDF7'],
    'ps' : [label: 'Pashto', flag: '\uD83C\uDDE6\uD83C\uDDEB'],
    'pt' : [label: 'Portuguese', flag: '\uD83C\uDDF5\uD83C\uDDF9'],
    'pt-ao' : [label: 'Portuguese (Angola)', flag: '\uD83C\uDDE6\uD83C\uDDF4'],
    'pt-br' : [label: 'Portuguese (Brazil)', flag: '\uD83C\uDDE7\uD83C\uDDF7'],
    'pt-pt' : [label: 'Portuguese (Portugal)', flag: '\uD83C\uDDF5\uD83C\uDDF9'],
    'pw' : [label: 'Palau', flag: '\uD83C\uDDF5\uD83C\uDDFC'],
    'py' : [label: 'Paraguay', flag: '\uD83C\uDDF5\uD83C\uDDFE'],
    'qa' : [label: 'Qatar', flag: '\uD83C\uDDF6\uD83C\uDDE6'],
    'qu' : [label: 'Quechua', flag: '\uD83C\uDDF5\uD83C\uDDEA'],
    're' : [label: 'Réunion', flag: '\uD83C\uDDF7\uD83C\uDDEA'],
    'rm' : [label: 'Romansh', flag: '\uD83C\uDDE8\uD83C\uDDED'],
    'rn' : [label: 'Kirundi', flag: '\uD83C\uDDE7\uD83C\uDDEE'],
    'ro' : [label: 'Romanian', flag: '\uD83C\uDDF7\uD83C\uDDF4'],
    'rs' : [label: 'Serbia', flag: '\uD83C\uDDF7\uD83C\uDDF8'],
    'ru' : [label: 'Russian', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'ru-ru' : [label: 'Russian (Russia)', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'rw' : [label: 'Kinyarwanda', flag: '\uD83C\uDDF7\uD83C\uDDFC'],
    'sa' : [label: 'Arabic (Saudi Arabia)', flag: '\uD83C\uDDF8\uD83C\uDDE6'],
    'sb' : [label: 'Solomon Islands', flag: '\uD83C\uDDF8\uD83C\uDDE7'],
    'sc' : [label: 'Sardinian', flag: '\uD83C\uDDEE\uD83C\uDDF9'],
    'sd' : [label: 'Sindhi', flag: '\uD83C\uDDF5\uD83C\uDDF0'],
    'se' : [label: 'Swedish', flag: '\uD83C\uDDF8\uD83C\uDDEA'],
    'sg' : [label: 'Sango', flag: '\uD83C\uDDE8\uD83C\uDDEB'],
    'sh' : [label: 'Saint Helena, Ascension and Tristan da Cunha', flag: '\uD83C\uDDF8\uD83C\uDDED'],
    'shared' : [label: 'Shared', flag: '\uD83C\uDF10'],
    'si' : [label: 'Sinhalese', flag: '\uD83C\uDDF1\uD83C\uDDF0'],
    'sj' : [label: 'Svalbard and Jan Mayen', flag: '\uD83C\uDDF8\uD83C\uDDEF'],
    'sk' : [label: 'Slovak', flag: '\uD83C\uDDF8\uD83C\uDDF0'],
    'sl' : [label: 'Slovene', flag: '\uD83C\uDDF8\uD83C\uDDEE'],
    'sm' : [label: 'Samoan', flag: '\uD83C\uDDFC\uD83C\uDDF8'],
    'sn' : [label: 'Shona', flag: '\uD83C\uDDFF\uD83C\uDDFC'],
    'so' : [label: 'Somali', flag: '\uD83C\uDDF8\uD83C\uDDF4'],
    'sq' : [label: 'Albanian', flag: '\uD83C\uDDE6\uD83C\uDDF1'],
    'sr' : [label: 'Serbian', flag: '\uD83C\uDDF7\uD83C\uDDF8'],
    'ss' : [label: 'Swati', flag: '\uD83C\uDDF8\uD83C\uDDFF'],
    'st' : [label: 'Southern Sotho', flag: '\uD83C\uDDF1\uD83C\uDDF8'],
    'su' : [label: 'Sundanese', flag: '\uD83C\uDDEE\uD83C\uDDE9'],
    'sv' : [label: 'Swedish', flag: '\uD83C\uDDF8\uD83C\uDDEA'],
    'sv-fi' : [label: 'Swedish (Finland)', flag: '\uD83C\uDDEB\uD83C\uDDEE'],
    'sv-se' : [label: 'Swedish (Sweden)', flag: '\uD83C\uDDF8\uD83C\uDDEA'],
    'sw' : [label: 'Swahili', flag: '\uD83C\uDDF9\uD83C\uDDFF'],
    'sx' : [label: 'Sint Maarten (Dutch part)', flag: '\uD83C\uDDF8\uD83C\uDDFD'],
    'sy' : [label: 'Syrian Arab Republic', flag: '\uD83C\uDDF8\uD83C\uDDFE'],
    'sz' : [label: 'Eswatini', flag: '\uD83C\uDDF8\uD83C\uDDFF'],
    'ta' : [label: 'Tamil', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'tc' : [label: 'Turks and Caicos Islands', flag: '\uD83C\uDDF9\uD83C\uDDE8'],
    'td' : [label: 'Chad', flag: '\uD83C\uDDF9\uD83C\uDDE9'],
    'te' : [label: 'Telugu', flag: '\uD83C\uDDEE\uD83C\uDDF3'],
    'tf' : [label: 'French Southern Territories', flag: '\uD83C\uDDF9\uD83C\uDDEB'],
    'tg' : [label: 'Tajik', flag: '\uD83C\uDDF9\uD83C\uDDEF'],
    'th' : [label: 'Thai', flag: '\uD83C\uDDF9\uD83C\uDDED'],
    'ti' : [label: 'Tigrinya', flag: '\uD83C\uDDEA\uD83C\uDDF7'],
    'tj' : [label: 'Tajikistan', flag: '\uD83C\uDDF9\uD83C\uDDEF'],
    'tk' : [label: 'Turkmen', flag: '\uD83C\uDDF9\uD83C\uDDF2'],
    'tl' : [label: 'Tagalog', flag: '\uD83C\uDDF5\uD83C\uDDED'],
    'tm' : [label: 'Turkmenistan', flag: '\uD83C\uDDF9\uD83C\uDDF2'],
    'tn' : [label: 'Tswana', flag: '\uD83C\uDDE7\uD83C\uDDFC'],
    'to' : [label: 'Tonga (Tonga Islands)', flag: '\uD83C\uDDF9\uD83C\uDDF4'],
    'tr' : [label: 'Turkish', flag: '\uD83C\uDDF9\uD83C\uDDF7'],
    'ts' : [label: 'Tsonga', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'tt' : [label: 'Tatar', flag: '\uD83C\uDDF7\uD83C\uDDFA'],
    'tv' : [label: 'Tuvalu', flag: '\uD83C\uDDF9\uD83C\uDDFB'],
    'tw' : [label: 'Chinese (Traditional)', flag: '\uD83C\uDDF9\uD83C\uDDFC'],
    'ty' : [label: 'Tahitian', flag: '\uD83C\uDDF5\uD83C\uDDEB'],
    'tz' : [label: 'Tanzania, United Republic of', flag: '\uD83C\uDDF9\uD83C\uDDFF'],
    'ua' : [label: 'Ukrainian', flag: '\uD83C\uDDFA\uD83C\uDDE6'],
    'ug' : [label: 'Uyghur', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'uk' : [label: 'English (UK)', flag: '\uD83C\uDDEC\uD83C\uDDE7'],
    'uk-ua' : [label: 'Ukrainian (Ukraine)', flag: '\uD83C\uDDFA\uD83C\uDDE6'],
    'um' : [label: 'United States Minor Outlying Islands', flag: '\uD83C\uDDFA\uD83C\uDDF2'],
    'ur' : [label: 'Urdu', flag: '\uD83C\uDDF5\uD83C\uDDF0'],
    'us' : [label: 'English (US)', flag: '\uD83C\uDDFA\uD83C\uDDF8'],
    'uy' : [label: 'Uruguay', flag: '\uD83C\uDDFA\uD83C\uDDFE'],
    'uz' : [label: 'Uzbek', flag: '\uD83C\uDDFA\uD83C\uDDFF'],
    'va' : [label: 'Holy See', flag: '\uD83C\uDDFB\uD83C\uDDE6'],
    'vc' : [label: 'Saint Vincent and the Grenadines', flag: '\uD83C\uDDFB\uD83C\uDDE8'],
    've' : [label: 'Venda', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'vg' : [label: 'Virgin Islands (British)', flag: '\uD83C\uDDFB\uD83C\uDDEC'],
    'vi' : [label: 'Vietnamese', flag: '\uD83C\uDDFB\uD83C\uDDF3'],
    'vn' : [label: 'Viet Nam', flag: '\uD83C\uDDFB\uD83C\uDDF3'],
    'vo' : [label: 'Volapük', flag: '\uD83C\uDF10'],
    'vu' : [label: 'Vanuatu', flag: '\uD83C\uDDFB\uD83C\uDDFA'],
    'wa' : [label: 'Walloon', flag: '\uD83C\uDDE7\uD83C\uDDEA'],
    'wf' : [label: 'Wallis and Futuna', flag: '\uD83C\uDDFC\uD83C\uDDEB'],
    'wo' : [label: 'Wolof', flag: '\uD83C\uDDF8\uD83C\uDDF3'],
    'ws' : [label: 'Samoa', flag: '\uD83C\uDDFC\uD83C\uDDF8'],
    'xh' : [label: 'Xhosa', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'ye' : [label: 'Yemen', flag: '\uD83C\uDDFE\uD83C\uDDEA'],
    'yi' : [label: 'Yiddish', flag: '\uD83C\uDDEE\uD83C\uDDF1'],
    'yo' : [label: 'Yoruba', flag: '\uD83C\uDDF3\uD83C\uDDEC'],
    'yt' : [label: 'Mayotte', flag: '\uD83C\uDDFE\uD83C\uDDF9'],
    'za' : [label: 'Zhuang', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'zh' : [label: 'Chinese', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'zh-cn' : [label: 'Chinese (Simplified)', flag: '\uD83C\uDDE8\uD83C\uDDF3'],
    'zh-hk' : [label: 'Chinese (Hong Kong)', flag: '\uD83C\uDDED\uD83C\uDDF0'],
    'zh-mo' : [label: 'Chinese (Macau)', flag: '\uD83C\uDDF2\uD83C\uDDF4'],
    'zh-sg' : [label: 'Chinese (Singapore)', flag: '\uD83C\uDDF8\uD83C\uDDEC'],
    'zh-tw' : [label: 'Chinese (Traditional)', flag: '\uD83C\uDDF9\uD83C\uDDFC'],
    'zm' : [label: 'Zambia', flag: '\uD83C\uDDFF\uD83C\uDDF2'],
    'zu' : [label: 'Zulu', flag: '\uD83C\uDDFF\uD83C\uDDE6'],
    'zw' : [label: 'Zimbabwe', flag: '\uD83C\uDDFF\uD83C\uDDFC']
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
    // Preserve document order (author-defined). Support <locale>…</locale> and legacy <localeCode>.
    codesParent.elements().each { elm ->
        def row = parseLocaleEntry(elm)
        if (!row) return
        def norm = row.locale as String
        if (!norm || seen[norm]) return
        seen[norm] = true
        list << row
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

/**
 * Parse one locale entry. Optional language/flag override catalog defaults when present.
 */
Map parseLocaleEntry(def elm) {
    if (elm == null) return null
    def tag = String.valueOf(elm.name ?: '').toLowerCase()
    def rawCode = ''
    def languageRaw = ''
    def flagRaw = ''

    if (tag == 'locale') {
        rawCode = text(elm.element('code')) ?: text(elm.element('localeCode'))
        languageRaw = text(elm.element('language')) ?: text(elm.element('label'))
        flagRaw = text(elm.element('flag'))
    } else if (tag == 'localecode') {
        def nestedCode = text(elm.element('code'))
        if (nestedCode) {
            rawCode = nestedCode
            languageRaw = text(elm.element('language')) ?: text(elm.element('label'))
            flagRaw = text(elm.element('flag'))
        } else {
            rawCode = text(elm)
            languageRaw = attrText(elm, 'language') ?: attrText(elm, 'label')
            flagRaw = attrText(elm, 'flag')
        }
    } else {
        return null
    }

    def key = normalizeLookupKey(rawCode)
    if (!key) return null
    def norm = folderLocaleFromKey(key)
    if (!norm) return null
    def meta = lookupLocaleMeta(key) ?: lookupLocaleMeta(norm) ?: [label: norm, flag: '\uD83C\uDF10']
    def label = languageRaw ? languageRaw : (meta.label as String)
    def flag = flagRaw ? flagRaw : (meta.flag as String)
    return [locale: norm, label: label, flag: flag]
}

String attrText(def e, String name) {
    if (e == null || !name) return ''
    try {
        def v = e.attributeValue(name)
        return v != null ? String.valueOf(v).trim() : ''
    } catch (Throwable ignored) {
        return ''
    }
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
