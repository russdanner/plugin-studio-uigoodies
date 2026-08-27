/**
 * Multi–locale folder layout under paths like /site/website and /site/components.
 * Folder names must match repo locale roots (or aliases below).
 *
 * Catalog: full ISO 639-1 languages, common BCP-47 regional tags, ISO 3166-1 country/market
 * folder codes, and CMS aliases (us, uk, br, shared, …).
 */
export const MULTI_LOCALE_BASE_LOCALE = 'en';

export type LocaleMeta = {
  label: string;
  flag: string;
};

/**
 * Canonical locale catalog: key = folder / config code (lowercase, hyphen).
 *
 * Includes:
 * - ISO 639-1 language codes
 * - Common BCP-47 regional tags (en-us, pt-br, zh-cn, …)
 * - ISO 3166-1 alpha-2 country/market folder codes (when not already a language code)
 * - CMS aliases (us, uk, br, jp, dk, se, shared, …)
 *
 * CMS alias precedence (intentional overrides of rare ISO language codes):
 * - `uk` = English (UK); use `ua` / `uk-ua` for Ukrainian
 * - `br` = Portuguese (Brazil); Breton is not exposed as a folder alias
 * - `ae` / `sa` / `tw` prefer market Arabic/Chinese labels over rare ISO language uses
 */
export const LOCALE_CATALOG: Record<string, LocaleMeta> = {
  'aa': { label: 'Afar', flag: '🇪🇹' },
  'ab': { label: 'Abkhaz', flag: '🇬🇪' },
  'ad': { label: 'Andorra', flag: '🇦🇩' },
  'ae': { label: 'Arabic (UAE)', flag: '🇦🇪' },
  'af': { label: 'Afrikaans', flag: '🇿🇦' },
  'ag': { label: 'Antigua and Barbuda', flag: '🇦🇬' },
  'ai': { label: 'Anguilla', flag: '🇦🇮' },
  'ak': { label: 'Akan', flag: '🇬🇭' },
  'al': { label: 'Albania', flag: '🇦🇱' },
  'am': { label: 'Amharic', flag: '🇪🇹' },
  'an': { label: 'Aragonese', flag: '🇪🇸' },
  'ao': { label: 'Angola', flag: '🇦🇴' },
  'aq': { label: 'Antarctica', flag: '🇦🇶' },
  'ar': { label: 'Arabic', flag: '🇸🇦' },
  'ar-ae': { label: 'Arabic (UAE)', flag: '🇦🇪' },
  'ar-bh': { label: 'Arabic (Bahrain)', flag: '🇧🇭' },
  'ar-dz': { label: 'Arabic (Algeria)', flag: '🇩🇿' },
  'ar-eg': { label: 'Arabic (Egypt)', flag: '🇪🇬' },
  'ar-iq': { label: 'Arabic (Iraq)', flag: '🇮🇶' },
  'ar-jo': { label: 'Arabic (Jordan)', flag: '🇯🇴' },
  'ar-kw': { label: 'Arabic (Kuwait)', flag: '🇰🇼' },
  'ar-lb': { label: 'Arabic (Lebanon)', flag: '🇱🇧' },
  'ar-ly': { label: 'Arabic (Libya)', flag: '🇱🇾' },
  'ar-ma': { label: 'Arabic (Morocco)', flag: '🇲🇦' },
  'ar-om': { label: 'Arabic (Oman)', flag: '🇴🇲' },
  'ar-qa': { label: 'Arabic (Qatar)', flag: '🇶🇦' },
  'ar-sa': { label: 'Arabic (Saudi Arabia)', flag: '🇸🇦' },
  'ar-sy': { label: 'Arabic (Syria)', flag: '🇸🇾' },
  'ar-tn': { label: 'Arabic (Tunisia)', flag: '🇹🇳' },
  'ar-ye': { label: 'Arabic (Yemen)', flag: '🇾🇪' },
  'as': { label: 'Assamese', flag: '🇮🇳' },
  'at': { label: 'Austria', flag: '🇦🇹' },
  'au': { label: 'English (Australia)', flag: '🇦🇺' },
  'av': { label: 'Avaric', flag: '🇷🇺' },
  'aw': { label: 'Aruba', flag: '🇦🇼' },
  'ax': { label: 'Åland Islands', flag: '🇦🇽' },
  'ay': { label: 'Aymara', flag: '🇧🇴' },
  'az': { label: 'Azerbaijani', flag: '🇦🇿' },
  'ba': { label: 'Bashkir', flag: '🇷🇺' },
  'bb': { label: 'Barbados', flag: '🇧🇧' },
  'bd': { label: 'Bangladesh', flag: '🇧🇩' },
  'be': { label: 'Belarusian', flag: '🇧🇾' },
  'bf': { label: 'Burkina Faso', flag: '🇧🇫' },
  'bg': { label: 'Bulgarian', flag: '🇧🇬' },
  'bh': { label: 'Bihari', flag: '🇮🇳' },
  'bi': { label: 'Bislama', flag: '🇻🇺' },
  'bj': { label: 'Benin', flag: '🇧🇯' },
  'bl': { label: 'Saint Barthélemy', flag: '🇧🇱' },
  'bm': { label: 'Bambara', flag: '🇲🇱' },
  'bn': { label: 'Bengali', flag: '🇧🇩' },
  'bn-bd': { label: 'Bengali (Bangladesh)', flag: '🇧🇩' },
  'bn-in': { label: 'Bengali (India)', flag: '🇮🇳' },
  'bo': { label: 'Tibetan Standard', flag: '🇨🇳' },
  'bq': { label: 'Bonaire, Sint Eustatius and Saba', flag: '🇧🇶' },
  'br': { label: 'Portuguese (Brazil)', flag: '🇧🇷' },
  'bs': { label: 'Bosnian', flag: '🇧🇦' },
  'bt': { label: 'Bhutan', flag: '🇧🇹' },
  'bv': { label: 'Bouvet Island', flag: '🇧🇻' },
  'bw': { label: 'Botswana', flag: '🇧🇼' },
  'by': { label: 'Belarus', flag: '🇧🇾' },
  'bz': { label: 'Belize', flag: '🇧🇿' },
  'ca': { label: 'Catalan', flag: '🇦🇩' },
  'cc': { label: 'Cocos (Keeling) Islands', flag: '🇨🇨' },
  'cd': { label: 'Congo, Democratic Republic of the', flag: '🇨🇩' },
  'ce': { label: 'Chechen', flag: '🇷🇺' },
  'cf': { label: 'Central African Republic', flag: '🇨🇫' },
  'cg': { label: 'Congo', flag: '🇨🇬' },
  'ch': { label: 'Chamorro', flag: '🇬🇺' },
  'ci': { label: 'Côte d\'Ivoire', flag: '🇨🇮' },
  'ck': { label: 'Cook Islands', flag: '🇨🇰' },
  'cl': { label: 'Chile', flag: '🇨🇱' },
  'cm': { label: 'Cameroon', flag: '🇨🇲' },
  'cn': { label: 'Chinese', flag: '🇨🇳' },
  'co': { label: 'Corsican', flag: '🇫🇷' },
  'common': { label: 'Common', flag: '🌐' },
  'cr': { label: 'Cree', flag: '🇨🇦' },
  'cs': { label: 'Czech', flag: '🇨🇿' },
  'cu': { label: 'Old Church Slavonic', flag: '🇷🇺' },
  'cv': { label: 'Chuvash', flag: '🇷🇺' },
  'cw': { label: 'Curaçao', flag: '🇨🇼' },
  'cx': { label: 'Christmas Island', flag: '🇨🇽' },
  'cy': { label: 'Welsh', flag: '🇬🇧' },
  'cz': { label: 'Czechia', flag: '🇨🇿' },
  'da': { label: 'Danish', flag: '🇩🇰' },
  'de': { label: 'German', flag: '🇩🇪' },
  'de-at': { label: 'German (Austria)', flag: '🇦🇹' },
  'de-ch': { label: 'German (Switzerland)', flag: '🇨🇭' },
  'de-de': { label: 'German (Germany)', flag: '🇩🇪' },
  'de-li': { label: 'German (Liechtenstein)', flag: '🇱🇮' },
  'de-lu': { label: 'German (Luxembourg)', flag: '🇱🇺' },
  'dj': { label: 'Djibouti', flag: '🇩🇯' },
  'dk': { label: 'Danish', flag: '🇩🇰' },
  'dm': { label: 'Dominica', flag: '🇩🇲' },
  'do': { label: 'Dominican Republic', flag: '🇩🇴' },
  'dv': { label: 'Divehi', flag: '🇲🇻' },
  'dz': { label: 'Dzongkha', flag: '🇧🇹' },
  'ec': { label: 'Ecuador', flag: '🇪🇨' },
  'ee': { label: 'Ewe', flag: '🇬🇭' },
  'eg': { label: 'Egypt', flag: '🇪🇬' },
  'eh': { label: 'Western Sahara', flag: '🇪🇭' },
  'el': { label: 'Greek (modern)', flag: '🇬🇷' },
  'en': { label: 'English', flag: '🇺🇸' },
  'en-au': { label: 'English (Australia)', flag: '🇦🇺' },
  'en-bz': { label: 'English (Belize)', flag: '🇧🇿' },
  'en-ca': { label: 'English (Canada)', flag: '🇨🇦' },
  'en-gb': { label: 'English (UK)', flag: '🇬🇧' },
  'en-hk': { label: 'English (Hong Kong)', flag: '🇭🇰' },
  'en-ie': { label: 'English (Ireland)', flag: '🇮🇪' },
  'en-in': { label: 'English (India)', flag: '🇮🇳' },
  'en-jm': { label: 'English (Jamaica)', flag: '🇯🇲' },
  'en-my': { label: 'English (Malaysia)', flag: '🇲🇾' },
  'en-nz': { label: 'English (New Zealand)', flag: '🇳🇿' },
  'en-ph': { label: 'English (Philippines)', flag: '🇵🇭' },
  'en-sg': { label: 'English (Singapore)', flag: '🇸🇬' },
  'en-tt': { label: 'English (Trinidad & Tobago)', flag: '🇹🇹' },
  'en-us': { label: 'English (US)', flag: '🇺🇸' },
  'en-za': { label: 'English (South Africa)', flag: '🇿🇦' },
  'en-zw': { label: 'English (Zimbabwe)', flag: '🇿🇼' },
  'eo': { label: 'Esperanto', flag: '🌐' },
  'er': { label: 'Eritrea', flag: '🇪🇷' },
  'es': { label: 'Spanish', flag: '🇪🇸' },
  'es-ar': { label: 'Spanish (Argentina)', flag: '🇦🇷' },
  'es-bo': { label: 'Spanish (Bolivia)', flag: '🇧🇴' },
  'es-cl': { label: 'Spanish (Chile)', flag: '🇨🇱' },
  'es-co': { label: 'Spanish (Colombia)', flag: '🇨🇴' },
  'es-cr': { label: 'Spanish (Costa Rica)', flag: '🇨🇷' },
  'es-do': { label: 'Spanish (Dominican Republic)', flag: '🇩🇴' },
  'es-ec': { label: 'Spanish (Ecuador)', flag: '🇪🇨' },
  'es-es': { label: 'Spanish (Spain)', flag: '🇪🇸' },
  'es-gt': { label: 'Spanish (Guatemala)', flag: '🇬🇹' },
  'es-hn': { label: 'Spanish (Honduras)', flag: '🇭🇳' },
  'es-mx': { label: 'Spanish (Mexico)', flag: '🇲🇽' },
  'es-ni': { label: 'Spanish (Nicaragua)', flag: '🇳🇮' },
  'es-pa': { label: 'Spanish (Panama)', flag: '🇵🇦' },
  'es-pe': { label: 'Spanish (Peru)', flag: '🇵🇪' },
  'es-pr': { label: 'Spanish (Puerto Rico)', flag: '🇵🇷' },
  'es-py': { label: 'Spanish (Paraguay)', flag: '🇵🇾' },
  'es-sv': { label: 'Spanish (El Salvador)', flag: '🇸🇻' },
  'es-uy': { label: 'Spanish (Uruguay)', flag: '🇺🇾' },
  'es-ve': { label: 'Spanish (Venezuela)', flag: '🇻🇪' },
  'et': { label: 'Estonian', flag: '🇪🇪' },
  'eu': { label: 'Basque', flag: '🇪🇸' },
  'fa': { label: 'Persian (Farsi)', flag: '🇮🇷' },
  'ff': { label: 'Fula', flag: '🇸🇳' },
  'fi': { label: 'Finnish', flag: '🇫🇮' },
  'fj': { label: 'Fijian', flag: '🇫🇯' },
  'fk': { label: 'Falkland Islands (Malvinas)', flag: '🇫🇰' },
  'fm': { label: 'Micronesia, Federated States of', flag: '🇫🇲' },
  'fo': { label: 'Faroese', flag: '🇫🇴' },
  'fr': { label: 'French', flag: '🇫🇷' },
  'fr-be': { label: 'French (Belgium)', flag: '🇧🇪' },
  'fr-ca': { label: 'French (Canada)', flag: '🇨🇦' },
  'fr-ch': { label: 'French (Switzerland)', flag: '🇨🇭' },
  'fr-fr': { label: 'French (France)', flag: '🇫🇷' },
  'fr-lu': { label: 'French (Luxembourg)', flag: '🇱🇺' },
  'fr-mc': { label: 'French (Monaco)', flag: '🇲🇨' },
  'fy': { label: 'Western Frisian', flag: '🇳🇱' },
  'ga': { label: 'Irish', flag: '🇮🇪' },
  'gb': { label: 'English (UK)', flag: '🇬🇧' },
  'gd': { label: 'Scottish Gaelic', flag: '🇬🇧' },
  'ge': { label: 'Georgia', flag: '🇬🇪' },
  'gf': { label: 'French Guiana', flag: '🇬🇫' },
  'gg': { label: 'Guernsey', flag: '🇬🇬' },
  'gh': { label: 'Ghana', flag: '🇬🇭' },
  'gi': { label: 'Gibraltar', flag: '🇬🇮' },
  'gl': { label: 'Galician', flag: '🇪🇸' },
  'global': { label: 'Global', flag: '🌐' },
  'gm': { label: 'Gambia', flag: '🇬🇲' },
  'gn': { label: 'Guaraní', flag: '🇵🇾' },
  'gp': { label: 'Guadeloupe', flag: '🇬🇵' },
  'gq': { label: 'Equatorial Guinea', flag: '🇬🇶' },
  'gr': { label: 'Greece', flag: '🇬🇷' },
  'gs': { label: 'South Georgia and the South Sandwich Islands', flag: '🇬🇸' },
  'gt': { label: 'Guatemala', flag: '🇬🇹' },
  'gu': { label: 'Gujarati', flag: '🇮🇳' },
  'gv': { label: 'Manx', flag: '🇮🇲' },
  'gw': { label: 'Guinea-Bissau', flag: '🇬🇼' },
  'gy': { label: 'Guyana', flag: '🇬🇾' },
  'ha': { label: 'Hausa', flag: '🇳🇬' },
  'he': { label: 'Hebrew (modern)', flag: '🇮🇱' },
  'hi': { label: 'Hindi', flag: '🇮🇳' },
  'hk': { label: 'Chinese (Hong Kong)', flag: '🇭🇰' },
  'hm': { label: 'Heard Island and McDonald Islands', flag: '🇭🇲' },
  'hn': { label: 'Honduras', flag: '🇭🇳' },
  'ho': { label: 'Hiri Motu', flag: '🇵🇬' },
  'hr': { label: 'Croatian', flag: '🇭🇷' },
  'ht': { label: 'Haitian', flag: '🇭🇹' },
  'hu': { label: 'Hungarian', flag: '🇭🇺' },
  'hy': { label: 'Armenian', flag: '🇦🇲' },
  'hz': { label: 'Herero', flag: '🇳🇦' },
  'ia': { label: 'Interlingua', flag: '🌐' },
  'id': { label: 'Indonesian', flag: '🇮🇩' },
  'ie': { label: 'Interlingue', flag: '🌐' },
  'ig': { label: 'Igbo', flag: '🇳🇬' },
  'ii': { label: 'Nuosu', flag: '🇨🇳' },
  'ik': { label: 'Inupiaq', flag: '🇺🇸' },
  'il': { label: 'Israel', flag: '🇮🇱' },
  'im': { label: 'Isle of Man', flag: '🇮🇲' },
  'in': { label: 'India', flag: '🇮🇳' },
  'io': { label: 'Ido', flag: '🌐' },
  'iq': { label: 'Iraq', flag: '🇮🇶' },
  'ir': { label: 'Iran, Islamic Republic of', flag: '🇮🇷' },
  'is': { label: 'Icelandic', flag: '🇮🇸' },
  'it': { label: 'Italian', flag: '🇮🇹' },
  'it-ch': { label: 'Italian (Switzerland)', flag: '🇨🇭' },
  'it-it': { label: 'Italian (Italy)', flag: '🇮🇹' },
  'iu': { label: 'Inuktitut', flag: '🇨🇦' },
  'ja': { label: 'Japanese', flag: '🇯🇵' },
  'ja-jp': { label: 'Japanese (Japan)', flag: '🇯🇵' },
  'je': { label: 'Jersey', flag: '🇯🇪' },
  'jm': { label: 'Jamaica', flag: '🇯🇲' },
  'jo': { label: 'Jordan', flag: '🇯🇴' },
  'jp': { label: 'Japanese', flag: '🇯🇵' },
  'jv': { label: 'Javanese', flag: '🇮🇩' },
  'ka': { label: 'Georgian', flag: '🇬🇪' },
  'ke': { label: 'Kenya', flag: '🇰🇪' },
  'kg': { label: 'Kongo', flag: '🇨🇩' },
  'kh': { label: 'Cambodia', flag: '🇰🇭' },
  'ki': { label: 'Kikuyu', flag: '🇰🇪' },
  'kj': { label: 'Kwanyama', flag: '🇳🇦' },
  'kk': { label: 'Kazakh', flag: '🇰🇿' },
  'kl': { label: 'Kalaallisut', flag: '🇬🇱' },
  'km': { label: 'Khmer', flag: '🇰🇭' },
  'kn': { label: 'Kannada', flag: '🇮🇳' },
  'ko': { label: 'Korean', flag: '🇰🇷' },
  'ko-kr': { label: 'Korean (Korea)', flag: '🇰🇷' },
  'kp': { label: 'Korea, Democratic People\'s Republic of', flag: '🇰🇵' },
  'kr': { label: 'Korean', flag: '🇰🇷' },
  'ks': { label: 'Kashmiri', flag: '🇮🇳' },
  'ku': { label: 'Kurdish', flag: '🇮🇶' },
  'kv': { label: 'Komi', flag: '🇷🇺' },
  'kw': { label: 'Cornish', flag: '🇬🇧' },
  'ky': { label: 'Kyrgyz', flag: '🇰🇬' },
  'kz': { label: 'Kazakhstan', flag: '🇰🇿' },
  'la': { label: 'Latin', flag: '🇻🇦' },
  'lb': { label: 'Luxembourgish', flag: '🇱🇺' },
  'lc': { label: 'Saint Lucia', flag: '🇱🇨' },
  'lg': { label: 'Ganda', flag: '🇺🇬' },
  'li': { label: 'Limburgish', flag: '🇳🇱' },
  'lk': { label: 'Sri Lanka', flag: '🇱🇰' },
  'ln': { label: 'Lingala', flag: '🇨🇩' },
  'lo': { label: 'Lao', flag: '🇱🇦' },
  'lr': { label: 'Liberia', flag: '🇱🇷' },
  'ls': { label: 'Lesotho', flag: '🇱🇸' },
  'lt': { label: 'Lithuanian', flag: '🇱🇹' },
  'lu': { label: 'Luba-Katanga', flag: '🇨🇩' },
  'lv': { label: 'Latvian', flag: '🇱🇻' },
  'ly': { label: 'Libya', flag: '🇱🇾' },
  'ma': { label: 'Morocco', flag: '🇲🇦' },
  'mc': { label: 'Monaco', flag: '🇲🇨' },
  'md': { label: 'Moldova, Republic of', flag: '🇲🇩' },
  'me': { label: 'Montenegro', flag: '🇲🇪' },
  'mf': { label: 'Saint Martin (French part)', flag: '🇲🇫' },
  'mg': { label: 'Malagasy', flag: '🇲🇬' },
  'mh': { label: 'Marshallese', flag: '🇲🇭' },
  'mi': { label: 'Māori', flag: '🇳🇿' },
  'mk': { label: 'Macedonian', flag: '🇲🇰' },
  'ml': { label: 'Malayalam', flag: '🇮🇳' },
  'mm': { label: 'Myanmar', flag: '🇲🇲' },
  'mn': { label: 'Mongolian', flag: '🇲🇳' },
  'mo': { label: 'Macao', flag: '🇲🇴' },
  'mp': { label: 'Northern Mariana Islands', flag: '🇲🇵' },
  'mq': { label: 'Martinique', flag: '🇲🇶' },
  'mr': { label: 'Marathi (Marāṭhī)', flag: '🇮🇳' },
  'ms': { label: 'Malay', flag: '🇲🇾' },
  'mt': { label: 'Maltese', flag: '🇲🇹' },
  'mu': { label: 'Mauritius', flag: '🇲🇺' },
  'mv': { label: 'Maldives', flag: '🇲🇻' },
  'mw': { label: 'Malawi', flag: '🇲🇼' },
  'mx': { label: 'Spanish (Mexico)', flag: '🇲🇽' },
  'my': { label: 'Burmese', flag: '🇲🇲' },
  'mz': { label: 'Mozambique', flag: '🇲🇿' },
  'na': { label: 'Nauruan', flag: '🇳🇷' },
  'nb': { label: 'Norwegian Bokmål', flag: '🇳🇴' },
  'nb-no': { label: 'Norwegian Bokmål (Norway)', flag: '🇳🇴' },
  'nc': { label: 'New Caledonia', flag: '🇳🇨' },
  'nd': { label: 'Northern Ndebele', flag: '🇿🇼' },
  'ne': { label: 'Nepali', flag: '🇳🇵' },
  'nf': { label: 'Norfolk Island', flag: '🇳🇫' },
  'ng': { label: 'Ndonga', flag: '🇳🇦' },
  'ni': { label: 'Nicaragua', flag: '🇳🇮' },
  'nl': { label: 'Dutch', flag: '🇳🇱' },
  'nl-be': { label: 'Dutch (Belgium)', flag: '🇧🇪' },
  'nl-nl': { label: 'Dutch (Netherlands)', flag: '🇳🇱' },
  'nn': { label: 'Norwegian Nynorsk', flag: '🇳🇴' },
  'nn-no': { label: 'Norwegian Nynorsk (Norway)', flag: '🇳🇴' },
  'no': { label: 'Norwegian', flag: '🇳🇴' },
  'np': { label: 'Nepal', flag: '🇳🇵' },
  'nr': { label: 'Southern Ndebele', flag: '🇿🇦' },
  'nu': { label: 'Niue', flag: '🇳🇺' },
  'nv': { label: 'Navajo', flag: '🇺🇸' },
  'ny': { label: 'Chichewa', flag: '🇲🇼' },
  'nz': { label: 'New Zealand', flag: '🇳🇿' },
  'oc': { label: 'Occitan', flag: '🇫🇷' },
  'oj': { label: 'Ojibwe', flag: '🇨🇦' },
  'om': { label: 'Oromo', flag: '🇪🇹' },
  'or': { label: 'Oriya', flag: '🇮🇳' },
  'os': { label: 'Ossetian', flag: '🇬🇪' },
  'pa': { label: '(Eastern) Punjabi', flag: '🇮🇳' },
  'pe': { label: 'Peru', flag: '🇵🇪' },
  'pf': { label: 'French Polynesia', flag: '🇵🇫' },
  'pg': { label: 'Papua New Guinea', flag: '🇵🇬' },
  'ph': { label: 'Philippines', flag: '🇵🇭' },
  'pi': { label: 'Pāli', flag: '🇮🇳' },
  'pk': { label: 'Pakistan', flag: '🇵🇰' },
  'pl': { label: 'Polish', flag: '🇵🇱' },
  'pm': { label: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  'pn': { label: 'Pitcairn', flag: '🇵🇳' },
  'pr': { label: 'Puerto Rico', flag: '🇵🇷' },
  'ps': { label: 'Pashto', flag: '🇦🇫' },
  'pt': { label: 'Portuguese', flag: '🇵🇹' },
  'pt-ao': { label: 'Portuguese (Angola)', flag: '🇦🇴' },
  'pt-br': { label: 'Portuguese (Brazil)', flag: '🇧🇷' },
  'pt-pt': { label: 'Portuguese (Portugal)', flag: '🇵🇹' },
  'pw': { label: 'Palau', flag: '🇵🇼' },
  'py': { label: 'Paraguay', flag: '🇵🇾' },
  'qa': { label: 'Qatar', flag: '🇶🇦' },
  'qu': { label: 'Quechua', flag: '🇵🇪' },
  're': { label: 'Réunion', flag: '🇷🇪' },
  'rm': { label: 'Romansh', flag: '🇨🇭' },
  'rn': { label: 'Kirundi', flag: '🇧🇮' },
  'ro': { label: 'Romanian', flag: '🇷🇴' },
  'rs': { label: 'Serbia', flag: '🇷🇸' },
  'ru': { label: 'Russian', flag: '🇷🇺' },
  'ru-ru': { label: 'Russian (Russia)', flag: '🇷🇺' },
  'rw': { label: 'Kinyarwanda', flag: '🇷🇼' },
  'sa': { label: 'Arabic (Saudi Arabia)', flag: '🇸🇦' },
  'sb': { label: 'Solomon Islands', flag: '🇸🇧' },
  'sc': { label: 'Sardinian', flag: '🇮🇹' },
  'sd': { label: 'Sindhi', flag: '🇵🇰' },
  'se': { label: 'Swedish', flag: '🇸🇪' },
  'sg': { label: 'Sango', flag: '🇨🇫' },
  'sh': { label: 'Saint Helena, Ascension and Tristan da Cunha', flag: '🇸🇭' },
  'shared': { label: 'Shared', flag: '🌐' },
  'si': { label: 'Sinhalese', flag: '🇱🇰' },
  'sj': { label: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
  'sk': { label: 'Slovak', flag: '🇸🇰' },
  'sl': { label: 'Slovene', flag: '🇸🇮' },
  'sm': { label: 'Samoan', flag: '🇼🇸' },
  'sn': { label: 'Shona', flag: '🇿🇼' },
  'so': { label: 'Somali', flag: '🇸🇴' },
  'sq': { label: 'Albanian', flag: '🇦🇱' },
  'sr': { label: 'Serbian', flag: '🇷🇸' },
  'ss': { label: 'Swati', flag: '🇸🇿' },
  'st': { label: 'Southern Sotho', flag: '🇱🇸' },
  'su': { label: 'Sundanese', flag: '🇮🇩' },
  'sv': { label: 'Swedish', flag: '🇸🇪' },
  'sv-fi': { label: 'Swedish (Finland)', flag: '🇫🇮' },
  'sv-se': { label: 'Swedish (Sweden)', flag: '🇸🇪' },
  'sw': { label: 'Swahili', flag: '🇹🇿' },
  'sx': { label: 'Sint Maarten (Dutch part)', flag: '🇸🇽' },
  'sy': { label: 'Syrian Arab Republic', flag: '🇸🇾' },
  'sz': { label: 'Eswatini', flag: '🇸🇿' },
  'ta': { label: 'Tamil', flag: '🇮🇳' },
  'tc': { label: 'Turks and Caicos Islands', flag: '🇹🇨' },
  'td': { label: 'Chad', flag: '🇹🇩' },
  'te': { label: 'Telugu', flag: '🇮🇳' },
  'tf': { label: 'French Southern Territories', flag: '🇹🇫' },
  'tg': { label: 'Tajik', flag: '🇹🇯' },
  'th': { label: 'Thai', flag: '🇹🇭' },
  'ti': { label: 'Tigrinya', flag: '🇪🇷' },
  'tj': { label: 'Tajikistan', flag: '🇹🇯' },
  'tk': { label: 'Turkmen', flag: '🇹🇲' },
  'tl': { label: 'Tagalog', flag: '🇵🇭' },
  'tm': { label: 'Turkmenistan', flag: '🇹🇲' },
  'tn': { label: 'Tswana', flag: '🇧🇼' },
  'to': { label: 'Tonga (Tonga Islands)', flag: '🇹🇴' },
  'tr': { label: 'Turkish', flag: '🇹🇷' },
  'ts': { label: 'Tsonga', flag: '🇿🇦' },
  'tt': { label: 'Tatar', flag: '🇷🇺' },
  'tv': { label: 'Tuvalu', flag: '🇹🇻' },
  'tw': { label: 'Chinese (Traditional)', flag: '🇹🇼' },
  'ty': { label: 'Tahitian', flag: '🇵🇫' },
  'tz': { label: 'Tanzania, United Republic of', flag: '🇹🇿' },
  'ua': { label: 'Ukrainian', flag: '🇺🇦' },
  'ug': { label: 'Uyghur', flag: '🇨🇳' },
  'uk': { label: 'English (UK)', flag: '🇬🇧' },
  'uk-ua': { label: 'Ukrainian (Ukraine)', flag: '🇺🇦' },
  'um': { label: 'United States Minor Outlying Islands', flag: '🇺🇲' },
  'ur': { label: 'Urdu', flag: '🇵🇰' },
  'us': { label: 'English (US)', flag: '🇺🇸' },
  'uy': { label: 'Uruguay', flag: '🇺🇾' },
  'uz': { label: 'Uzbek', flag: '🇺🇿' },
  'va': { label: 'Holy See', flag: '🇻🇦' },
  'vc': { label: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  've': { label: 'Venda', flag: '🇿🇦' },
  'vg': { label: 'Virgin Islands (British)', flag: '🇻🇬' },
  'vi': { label: 'Vietnamese', flag: '🇻🇳' },
  'vn': { label: 'Viet Nam', flag: '🇻🇳' },
  'vo': { label: 'Volapük', flag: '🌐' },
  'vu': { label: 'Vanuatu', flag: '🇻🇺' },
  'wa': { label: 'Walloon', flag: '🇧🇪' },
  'wf': { label: 'Wallis and Futuna', flag: '🇼🇫' },
  'wo': { label: 'Wolof', flag: '🇸🇳' },
  'ws': { label: 'Samoa', flag: '🇼🇸' },
  'xh': { label: 'Xhosa', flag: '🇿🇦' },
  'ye': { label: 'Yemen', flag: '🇾🇪' },
  'yi': { label: 'Yiddish', flag: '🇮🇱' },
  'yo': { label: 'Yoruba', flag: '🇳🇬' },
  'yt': { label: 'Mayotte', flag: '🇾🇹' },
  'za': { label: 'Zhuang', flag: '🇨🇳' },
  'zh': { label: 'Chinese', flag: '🇨🇳' },
  'zh-cn': { label: 'Chinese (Simplified)', flag: '🇨🇳' },
  'zh-hk': { label: 'Chinese (Hong Kong)', flag: '🇭🇰' },
  'zh-mo': { label: 'Chinese (Macau)', flag: '🇲🇴' },
  'zh-sg': { label: 'Chinese (Singapore)', flag: '🇸🇬' },
  'zh-tw': { label: 'Chinese (Traditional)', flag: '🇹🇼' },
  'zm': { label: 'Zambia', flag: '🇿🇲' },
  'zu': { label: 'Zulu', flag: '🇿🇦' },
  'zw': { label: 'Zimbabwe', flag: '🇿🇼' }
};

/** @deprecated Prefer LOCALE_CATALOG — kept for existing imports. */
export const LOCALE_META: Record<string, LocaleMeta> = LOCALE_CATALOG;

/** @deprecated Prefer getFlagForLocale / LOCALE_CATALOG. */
export const LOCALE_FLAG_BY_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(LOCALE_CATALOG).map(([code, meta]) => [code, meta.flag])
);

/**
 * Codes used when detecting locale folders without a site translation-config.xml.
 * Includes ISO codes and common CMS aliases.
 */
export const MULTI_LOCALE_CODES: string[] = Object.keys(LOCALE_CATALOG).sort((a, b) =>
  a.localeCompare(b)
);

export type MultiLocaleCode = string;

export function getLocaleMeta(localeCode: string): LocaleMeta {
  const k = String(localeCode || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  if (!k) {
    return { label: '', flag: '🌐' };
  }
  return (
    LOCALE_CATALOG[k] ??
    LOCALE_CATALOG[k.slice(0, 2)] ?? {
      label: k,
      flag: '🌐'
    }
  );
}

export function getFlagForLocale(localeCode: string): string {
  return getLocaleMeta(localeCode).flag || '🌐';
}

export function getLabelForLocale(localeCode: string): string {
  const meta = getLocaleMeta(localeCode);
  return meta.label || String(localeCode || '').trim() || '';
}

export type SiteTranslationConfig = {
  baseLanguage: string;
  languages: Array<{ locale: string; label: string; flag?: string }>;
};

/** Avoid redundant `setTranslationConfig` when API returns a new object with the same locale list (prevents load/effect loops). */
export function translationConfigsEqual(
  a: SiteTranslationConfig | null | undefined,
  b: SiteTranslationConfig | null | undefined
): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (a.baseLanguage !== b.baseLanguage) {
    return false;
  }
  if (a.languages.length !== b.languages.length) {
    return false;
  }
  for (let i = 0; i < a.languages.length; i += 1) {
    const x = a.languages[i];
    const y = b.languages[i];
    if (x.locale !== y.locale || x.label !== y.label) {
      return false;
    }
    const xf = x.flag ?? '';
    const yf = y.flag ?? '';
    if (xf !== yf) {
      return false;
    }
  }
  return true;
}

/** True when translation-config.xml defines at least a base locale and one target (two or more entries). */
export function hasConfiguredTranslationLocales(
  config: SiteTranslationConfig | null | undefined
): boolean {
  return (config?.languages?.filter((l) => Boolean(l.locale)).length ?? 0) >= 2;
}
