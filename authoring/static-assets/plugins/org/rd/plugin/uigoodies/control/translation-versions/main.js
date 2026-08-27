(function () {
  'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function bootTranslationVersionsControl() {
    var React = CrafterCMSNext.React;
    var RESERVED_FIRST_SEGMENTS = {
      website: 1,
      components: 1,
      "static-assets": 1,
      templates: 1,
      scripts: 1,
      config: 1
    };
    var MULTI_LOCALE_CODES = ["aa", "ab", "ad", "ae", "af", "ag", "ai", "ak", "al", "am", "an", "ao", "aq", "ar", "ar-ae", "ar-bh", "ar-dz", "ar-eg", "ar-iq", "ar-jo", "ar-kw", "ar-lb", "ar-ly", "ar-ma", "ar-om", "ar-qa", "ar-sa", "ar-sy", "ar-tn", "ar-ye", "as", "at", "au", "av", "aw", "ax", "ay", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bn-bd", "bn-in", "bo", "bq", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "common", "cr", "cs", "cu", "cv", "cw", "cx", "cy", "cz", "da", "de", "de-at", "de-ch", "de-de", "de-li", "de-lu", "dj", "dk", "dm", "do", "dv", "dz", "ec", "ee", "eg", "eh", "el", "en", "en-au", "en-bz", "en-ca", "en-gb", "en-hk", "en-ie", "en-in", "en-jm", "en-my", "en-nz", "en-ph", "en-sg", "en-tt", "en-us", "en-za", "en-zw", "eo", "er", "es", "es-ar", "es-bo", "es-cl", "es-co", "es-cr", "es-do", "es-ec", "es-es", "es-gt", "es-hn", "es-mx", "es-ni", "es-pa", "es-pe", "es-pr", "es-py", "es-sv", "es-uy", "es-ve", "et", "eu", "fa", "ff", "fi", "fj", "fk", "fm", "fo", "fr", "fr-be", "fr-ca", "fr-ch", "fr-fr", "fr-lu", "fr-mc", "fy", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "global", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gy", "ha", "he", "hi", "hk", "hm", "hn", "ho", "hr", "ht", "hu", "hy", "hz", "ia", "id", "ie", "ig", "ii", "ik", "il", "im", "in", "io", "iq", "ir", "is", "it", "it-ch", "it-it", "iu", "ja", "ja-jp", "je", "jm", "jo", "jp", "jv", "ka", "ke", "kg", "kh", "ki", "kj", "kk", "kl", "km", "kn", "ko", "ko-kr", "kp", "kr", "ks", "ku", "kv", "kw", "ky", "kz", "la", "lb", "lc", "lg", "li", "lk", "ln", "lo", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mi", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nb", "nb-no", "nc", "nd", "ne", "nf", "ng", "ni", "nl", "nl-be", "nl-nl", "nn", "nn-no", "no", "np", "nr", "nu", "nv", "ny", "nz", "oc", "oj", "om", "or", "os", "pa", "pe", "pf", "pg", "ph", "pi", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pt-ao", "pt-br", "pt-pt", "pw", "py", "qa", "qu", "re", "rm", "rn", "ro", "rs", "ru", "ru-ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "shared", "si", "sj", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sv-fi", "sv-se", "sw", "sx", "sy", "sz", "ta", "tc", "td", "te", "tf", "tg", "th", "ti", "tj", "tk", "tl", "tm", "tn", "to", "tr", "ts", "tt", "tv", "tw", "ty", "tz", "ua", "ug", "uk", "uk-ua", "um", "ur", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vo", "vu", "wa", "wf", "wo", "ws", "xh", "ye", "yi", "yo", "yt", "za", "zh", "zh-cn", "zh-hk", "zh-mo", "zh-sg", "zh-tw", "zm", "zu", "zw"];
    var LOCALE_META = {
      "aa": {
        label: "Afar",
        flag: "🇪🇹"
      },
      "ab": {
        label: "Abkhaz",
        flag: "🇬🇪"
      },
      "ad": {
        label: "Andorra",
        flag: "🇦🇩"
      },
      "ae": {
        label: "Arabic (UAE)",
        flag: "🇦🇪"
      },
      "af": {
        label: "Afrikaans",
        flag: "🇿🇦"
      },
      "ag": {
        label: "Antigua and Barbuda",
        flag: "🇦🇬"
      },
      "ai": {
        label: "Anguilla",
        flag: "🇦🇮"
      },
      "ak": {
        label: "Akan",
        flag: "🇬🇭"
      },
      "al": {
        label: "Albania",
        flag: "🇦🇱"
      },
      "am": {
        label: "Amharic",
        flag: "🇪🇹"
      },
      "an": {
        label: "Aragonese",
        flag: "🇪🇸"
      },
      "ao": {
        label: "Angola",
        flag: "🇦🇴"
      },
      "aq": {
        label: "Antarctica",
        flag: "🇦🇶"
      },
      "ar": {
        label: "Arabic",
        flag: "🇸🇦"
      },
      "ar-ae": {
        label: "Arabic (UAE)",
        flag: "🇦🇪"
      },
      "ar-bh": {
        label: "Arabic (Bahrain)",
        flag: "🇧🇭"
      },
      "ar-dz": {
        label: "Arabic (Algeria)",
        flag: "🇩🇿"
      },
      "ar-eg": {
        label: "Arabic (Egypt)",
        flag: "🇪🇬"
      },
      "ar-iq": {
        label: "Arabic (Iraq)",
        flag: "🇮🇶"
      },
      "ar-jo": {
        label: "Arabic (Jordan)",
        flag: "🇯🇴"
      },
      "ar-kw": {
        label: "Arabic (Kuwait)",
        flag: "🇰🇼"
      },
      "ar-lb": {
        label: "Arabic (Lebanon)",
        flag: "🇱🇧"
      },
      "ar-ly": {
        label: "Arabic (Libya)",
        flag: "🇱🇾"
      },
      "ar-ma": {
        label: "Arabic (Morocco)",
        flag: "🇲🇦"
      },
      "ar-om": {
        label: "Arabic (Oman)",
        flag: "🇴🇲"
      },
      "ar-qa": {
        label: "Arabic (Qatar)",
        flag: "🇶🇦"
      },
      "ar-sa": {
        label: "Arabic (Saudi Arabia)",
        flag: "🇸🇦"
      },
      "ar-sy": {
        label: "Arabic (Syria)",
        flag: "🇸🇾"
      },
      "ar-tn": {
        label: "Arabic (Tunisia)",
        flag: "🇹🇳"
      },
      "ar-ye": {
        label: "Arabic (Yemen)",
        flag: "🇾🇪"
      },
      "as": {
        label: "Assamese",
        flag: "🇮🇳"
      },
      "at": {
        label: "Austria",
        flag: "🇦🇹"
      },
      "au": {
        label: "English (Australia)",
        flag: "🇦🇺"
      },
      "av": {
        label: "Avaric",
        flag: "🇷🇺"
      },
      "aw": {
        label: "Aruba",
        flag: "🇦🇼"
      },
      "ax": {
        label: "Åland Islands",
        flag: "🇦🇽"
      },
      "ay": {
        label: "Aymara",
        flag: "🇧🇴"
      },
      "az": {
        label: "Azerbaijani",
        flag: "🇦🇿"
      },
      "ba": {
        label: "Bashkir",
        flag: "🇷🇺"
      },
      "bb": {
        label: "Barbados",
        flag: "🇧🇧"
      },
      "bd": {
        label: "Bangladesh",
        flag: "🇧🇩"
      },
      "be": {
        label: "Belarusian",
        flag: "🇧🇾"
      },
      "bf": {
        label: "Burkina Faso",
        flag: "🇧🇫"
      },
      "bg": {
        label: "Bulgarian",
        flag: "🇧🇬"
      },
      "bh": {
        label: "Bihari",
        flag: "🇮🇳"
      },
      "bi": {
        label: "Bislama",
        flag: "🇻🇺"
      },
      "bj": {
        label: "Benin",
        flag: "🇧🇯"
      },
      "bl": {
        label: "Saint Barthélemy",
        flag: "🇧🇱"
      },
      "bm": {
        label: "Bambara",
        flag: "🇲🇱"
      },
      "bn": {
        label: "Bengali",
        flag: "🇧🇩"
      },
      "bn-bd": {
        label: "Bengali (Bangladesh)",
        flag: "🇧🇩"
      },
      "bn-in": {
        label: "Bengali (India)",
        flag: "🇮🇳"
      },
      "bo": {
        label: "Tibetan Standard",
        flag: "🇨🇳"
      },
      "bq": {
        label: "Bonaire, Sint Eustatius and Saba",
        flag: "🇧🇶"
      },
      "br": {
        label: "Portuguese (Brazil)",
        flag: "🇧🇷"
      },
      "bs": {
        label: "Bosnian",
        flag: "🇧🇦"
      },
      "bt": {
        label: "Bhutan",
        flag: "🇧🇹"
      },
      "bv": {
        label: "Bouvet Island",
        flag: "🇧🇻"
      },
      "bw": {
        label: "Botswana",
        flag: "🇧🇼"
      },
      "by": {
        label: "Belarus",
        flag: "🇧🇾"
      },
      "bz": {
        label: "Belize",
        flag: "🇧🇿"
      },
      "ca": {
        label: "Catalan",
        flag: "🇦🇩"
      },
      "cc": {
        label: "Cocos (Keeling) Islands",
        flag: "🇨🇨"
      },
      "cd": {
        label: "Congo, Democratic Republic of the",
        flag: "🇨🇩"
      },
      "ce": {
        label: "Chechen",
        flag: "🇷🇺"
      },
      "cf": {
        label: "Central African Republic",
        flag: "🇨🇫"
      },
      "cg": {
        label: "Congo",
        flag: "🇨🇬"
      },
      "ch": {
        label: "Chamorro",
        flag: "🇬🇺"
      },
      "ci": {
        label: "Côte d'Ivoire",
        flag: "🇨🇮"
      },
      "ck": {
        label: "Cook Islands",
        flag: "🇨🇰"
      },
      "cl": {
        label: "Chile",
        flag: "🇨🇱"
      },
      "cm": {
        label: "Cameroon",
        flag: "🇨🇲"
      },
      "cn": {
        label: "Chinese",
        flag: "🇨🇳"
      },
      "co": {
        label: "Corsican",
        flag: "🇫🇷"
      },
      "common": {
        label: "Common",
        flag: "🌐"
      },
      "cr": {
        label: "Cree",
        flag: "🇨🇦"
      },
      "cs": {
        label: "Czech",
        flag: "🇨🇿"
      },
      "cu": {
        label: "Old Church Slavonic",
        flag: "🇷🇺"
      },
      "cv": {
        label: "Chuvash",
        flag: "🇷🇺"
      },
      "cw": {
        label: "Curaçao",
        flag: "🇨🇼"
      },
      "cx": {
        label: "Christmas Island",
        flag: "🇨🇽"
      },
      "cy": {
        label: "Welsh",
        flag: "🇬🇧"
      },
      "cz": {
        label: "Czechia",
        flag: "🇨🇿"
      },
      "da": {
        label: "Danish",
        flag: "🇩🇰"
      },
      "de": {
        label: "German",
        flag: "🇩🇪"
      },
      "de-at": {
        label: "German (Austria)",
        flag: "🇦🇹"
      },
      "de-ch": {
        label: "German (Switzerland)",
        flag: "🇨🇭"
      },
      "de-de": {
        label: "German (Germany)",
        flag: "🇩🇪"
      },
      "de-li": {
        label: "German (Liechtenstein)",
        flag: "🇱🇮"
      },
      "de-lu": {
        label: "German (Luxembourg)",
        flag: "🇱🇺"
      },
      "dj": {
        label: "Djibouti",
        flag: "🇩🇯"
      },
      "dk": {
        label: "Danish",
        flag: "🇩🇰"
      },
      "dm": {
        label: "Dominica",
        flag: "🇩🇲"
      },
      "do": {
        label: "Dominican Republic",
        flag: "🇩🇴"
      },
      "dv": {
        label: "Divehi",
        flag: "🇲🇻"
      },
      "dz": {
        label: "Dzongkha",
        flag: "🇧🇹"
      },
      "ec": {
        label: "Ecuador",
        flag: "🇪🇨"
      },
      "ee": {
        label: "Ewe",
        flag: "🇬🇭"
      },
      "eg": {
        label: "Egypt",
        flag: "🇪🇬"
      },
      "eh": {
        label: "Western Sahara",
        flag: "🇪🇭"
      },
      "el": {
        label: "Greek (modern)",
        flag: "🇬🇷"
      },
      "en": {
        label: "English",
        flag: "🇺🇸"
      },
      "en-au": {
        label: "English (Australia)",
        flag: "🇦🇺"
      },
      "en-bz": {
        label: "English (Belize)",
        flag: "🇧🇿"
      },
      "en-ca": {
        label: "English (Canada)",
        flag: "🇨🇦"
      },
      "en-gb": {
        label: "English (UK)",
        flag: "🇬🇧"
      },
      "en-hk": {
        label: "English (Hong Kong)",
        flag: "🇭🇰"
      },
      "en-ie": {
        label: "English (Ireland)",
        flag: "🇮🇪"
      },
      "en-in": {
        label: "English (India)",
        flag: "🇮🇳"
      },
      "en-jm": {
        label: "English (Jamaica)",
        flag: "🇯🇲"
      },
      "en-my": {
        label: "English (Malaysia)",
        flag: "🇲🇾"
      },
      "en-nz": {
        label: "English (New Zealand)",
        flag: "🇳🇿"
      },
      "en-ph": {
        label: "English (Philippines)",
        flag: "🇵🇭"
      },
      "en-sg": {
        label: "English (Singapore)",
        flag: "🇸🇬"
      },
      "en-tt": {
        label: "English (Trinidad & Tobago)",
        flag: "🇹🇹"
      },
      "en-us": {
        label: "English (US)",
        flag: "🇺🇸"
      },
      "en-za": {
        label: "English (South Africa)",
        flag: "🇿🇦"
      },
      "en-zw": {
        label: "English (Zimbabwe)",
        flag: "🇿🇼"
      },
      "eo": {
        label: "Esperanto",
        flag: "🌐"
      },
      "er": {
        label: "Eritrea",
        flag: "🇪🇷"
      },
      "es": {
        label: "Spanish",
        flag: "🇪🇸"
      },
      "es-ar": {
        label: "Spanish (Argentina)",
        flag: "🇦🇷"
      },
      "es-bo": {
        label: "Spanish (Bolivia)",
        flag: "🇧🇴"
      },
      "es-cl": {
        label: "Spanish (Chile)",
        flag: "🇨🇱"
      },
      "es-co": {
        label: "Spanish (Colombia)",
        flag: "🇨🇴"
      },
      "es-cr": {
        label: "Spanish (Costa Rica)",
        flag: "🇨🇷"
      },
      "es-do": {
        label: "Spanish (Dominican Republic)",
        flag: "🇩🇴"
      },
      "es-ec": {
        label: "Spanish (Ecuador)",
        flag: "🇪🇨"
      },
      "es-es": {
        label: "Spanish (Spain)",
        flag: "🇪🇸"
      },
      "es-gt": {
        label: "Spanish (Guatemala)",
        flag: "🇬🇹"
      },
      "es-hn": {
        label: "Spanish (Honduras)",
        flag: "🇭🇳"
      },
      "es-mx": {
        label: "Spanish (Mexico)",
        flag: "🇲🇽"
      },
      "es-ni": {
        label: "Spanish (Nicaragua)",
        flag: "🇳🇮"
      },
      "es-pa": {
        label: "Spanish (Panama)",
        flag: "🇵🇦"
      },
      "es-pe": {
        label: "Spanish (Peru)",
        flag: "🇵🇪"
      },
      "es-pr": {
        label: "Spanish (Puerto Rico)",
        flag: "🇵🇷"
      },
      "es-py": {
        label: "Spanish (Paraguay)",
        flag: "🇵🇾"
      },
      "es-sv": {
        label: "Spanish (El Salvador)",
        flag: "🇸🇻"
      },
      "es-uy": {
        label: "Spanish (Uruguay)",
        flag: "🇺🇾"
      },
      "es-ve": {
        label: "Spanish (Venezuela)",
        flag: "🇻🇪"
      },
      "et": {
        label: "Estonian",
        flag: "🇪🇪"
      },
      "eu": {
        label: "Basque",
        flag: "🇪🇸"
      },
      "fa": {
        label: "Persian (Farsi)",
        flag: "🇮🇷"
      },
      "ff": {
        label: "Fula",
        flag: "🇸🇳"
      },
      "fi": {
        label: "Finnish",
        flag: "🇫🇮"
      },
      "fj": {
        label: "Fijian",
        flag: "🇫🇯"
      },
      "fk": {
        label: "Falkland Islands (Malvinas)",
        flag: "🇫🇰"
      },
      "fm": {
        label: "Micronesia, Federated States of",
        flag: "🇫🇲"
      },
      "fo": {
        label: "Faroese",
        flag: "🇫🇴"
      },
      "fr": {
        label: "French",
        flag: "🇫🇷"
      },
      "fr-be": {
        label: "French (Belgium)",
        flag: "🇧🇪"
      },
      "fr-ca": {
        label: "French (Canada)",
        flag: "🇨🇦"
      },
      "fr-ch": {
        label: "French (Switzerland)",
        flag: "🇨🇭"
      },
      "fr-fr": {
        label: "French (France)",
        flag: "🇫🇷"
      },
      "fr-lu": {
        label: "French (Luxembourg)",
        flag: "🇱🇺"
      },
      "fr-mc": {
        label: "French (Monaco)",
        flag: "🇲🇨"
      },
      "fy": {
        label: "Western Frisian",
        flag: "🇳🇱"
      },
      "ga": {
        label: "Irish",
        flag: "🇮🇪"
      },
      "gb": {
        label: "English (UK)",
        flag: "🇬🇧"
      },
      "gd": {
        label: "Scottish Gaelic",
        flag: "🇬🇧"
      },
      "ge": {
        label: "Georgia",
        flag: "🇬🇪"
      },
      "gf": {
        label: "French Guiana",
        flag: "🇬🇫"
      },
      "gg": {
        label: "Guernsey",
        flag: "🇬🇬"
      },
      "gh": {
        label: "Ghana",
        flag: "🇬🇭"
      },
      "gi": {
        label: "Gibraltar",
        flag: "🇬🇮"
      },
      "gl": {
        label: "Galician",
        flag: "🇪🇸"
      },
      "global": {
        label: "Global",
        flag: "🌐"
      },
      "gm": {
        label: "Gambia",
        flag: "🇬🇲"
      },
      "gn": {
        label: "Guaraní",
        flag: "🇵🇾"
      },
      "gp": {
        label: "Guadeloupe",
        flag: "🇬🇵"
      },
      "gq": {
        label: "Equatorial Guinea",
        flag: "🇬🇶"
      },
      "gr": {
        label: "Greece",
        flag: "🇬🇷"
      },
      "gs": {
        label: "South Georgia and the South Sandwich Islands",
        flag: "🇬🇸"
      },
      "gt": {
        label: "Guatemala",
        flag: "🇬🇹"
      },
      "gu": {
        label: "Gujarati",
        flag: "🇮🇳"
      },
      "gv": {
        label: "Manx",
        flag: "🇮🇲"
      },
      "gw": {
        label: "Guinea-Bissau",
        flag: "🇬🇼"
      },
      "gy": {
        label: "Guyana",
        flag: "🇬🇾"
      },
      "ha": {
        label: "Hausa",
        flag: "🇳🇬"
      },
      "he": {
        label: "Hebrew (modern)",
        flag: "🇮🇱"
      },
      "hi": {
        label: "Hindi",
        flag: "🇮🇳"
      },
      "hk": {
        label: "Chinese (Hong Kong)",
        flag: "🇭🇰"
      },
      "hm": {
        label: "Heard Island and McDonald Islands",
        flag: "🇭🇲"
      },
      "hn": {
        label: "Honduras",
        flag: "🇭🇳"
      },
      "ho": {
        label: "Hiri Motu",
        flag: "🇵🇬"
      },
      "hr": {
        label: "Croatian",
        flag: "🇭🇷"
      },
      "ht": {
        label: "Haitian",
        flag: "🇭🇹"
      },
      "hu": {
        label: "Hungarian",
        flag: "🇭🇺"
      },
      "hy": {
        label: "Armenian",
        flag: "🇦🇲"
      },
      "hz": {
        label: "Herero",
        flag: "🇳🇦"
      },
      "ia": {
        label: "Interlingua",
        flag: "🌐"
      },
      "id": {
        label: "Indonesian",
        flag: "🇮🇩"
      },
      "ie": {
        label: "Interlingue",
        flag: "🌐"
      },
      "ig": {
        label: "Igbo",
        flag: "🇳🇬"
      },
      "ii": {
        label: "Nuosu",
        flag: "🇨🇳"
      },
      "ik": {
        label: "Inupiaq",
        flag: "🇺🇸"
      },
      "il": {
        label: "Israel",
        flag: "🇮🇱"
      },
      "im": {
        label: "Isle of Man",
        flag: "🇮🇲"
      },
      "in": {
        label: "India",
        flag: "🇮🇳"
      },
      "io": {
        label: "Ido",
        flag: "🌐"
      },
      "iq": {
        label: "Iraq",
        flag: "🇮🇶"
      },
      "ir": {
        label: "Iran, Islamic Republic of",
        flag: "🇮🇷"
      },
      "is": {
        label: "Icelandic",
        flag: "🇮🇸"
      },
      "it": {
        label: "Italian",
        flag: "🇮🇹"
      },
      "it-ch": {
        label: "Italian (Switzerland)",
        flag: "🇨🇭"
      },
      "it-it": {
        label: "Italian (Italy)",
        flag: "🇮🇹"
      },
      "iu": {
        label: "Inuktitut",
        flag: "🇨🇦"
      },
      "ja": {
        label: "Japanese",
        flag: "🇯🇵"
      },
      "ja-jp": {
        label: "Japanese (Japan)",
        flag: "🇯🇵"
      },
      "je": {
        label: "Jersey",
        flag: "🇯🇪"
      },
      "jm": {
        label: "Jamaica",
        flag: "🇯🇲"
      },
      "jo": {
        label: "Jordan",
        flag: "🇯🇴"
      },
      "jp": {
        label: "Japanese",
        flag: "🇯🇵"
      },
      "jv": {
        label: "Javanese",
        flag: "🇮🇩"
      },
      "ka": {
        label: "Georgian",
        flag: "🇬🇪"
      },
      "ke": {
        label: "Kenya",
        flag: "🇰🇪"
      },
      "kg": {
        label: "Kongo",
        flag: "🇨🇩"
      },
      "kh": {
        label: "Cambodia",
        flag: "🇰🇭"
      },
      "ki": {
        label: "Kikuyu",
        flag: "🇰🇪"
      },
      "kj": {
        label: "Kwanyama",
        flag: "🇳🇦"
      },
      "kk": {
        label: "Kazakh",
        flag: "🇰🇿"
      },
      "kl": {
        label: "Kalaallisut",
        flag: "🇬🇱"
      },
      "km": {
        label: "Khmer",
        flag: "🇰🇭"
      },
      "kn": {
        label: "Kannada",
        flag: "🇮🇳"
      },
      "ko": {
        label: "Korean",
        flag: "🇰🇷"
      },
      "ko-kr": {
        label: "Korean (Korea)",
        flag: "🇰🇷"
      },
      "kp": {
        label: "Korea, Democratic People's Republic of",
        flag: "🇰🇵"
      },
      "kr": {
        label: "Korean",
        flag: "🇰🇷"
      },
      "ks": {
        label: "Kashmiri",
        flag: "🇮🇳"
      },
      "ku": {
        label: "Kurdish",
        flag: "🇮🇶"
      },
      "kv": {
        label: "Komi",
        flag: "🇷🇺"
      },
      "kw": {
        label: "Cornish",
        flag: "🇬🇧"
      },
      "ky": {
        label: "Kyrgyz",
        flag: "🇰🇬"
      },
      "kz": {
        label: "Kazakhstan",
        flag: "🇰🇿"
      },
      "la": {
        label: "Latin",
        flag: "🇻🇦"
      },
      "lb": {
        label: "Luxembourgish",
        flag: "🇱🇺"
      },
      "lc": {
        label: "Saint Lucia",
        flag: "🇱🇨"
      },
      "lg": {
        label: "Ganda",
        flag: "🇺🇬"
      },
      "li": {
        label: "Limburgish",
        flag: "🇳🇱"
      },
      "lk": {
        label: "Sri Lanka",
        flag: "🇱🇰"
      },
      "ln": {
        label: "Lingala",
        flag: "🇨🇩"
      },
      "lo": {
        label: "Lao",
        flag: "🇱🇦"
      },
      "lr": {
        label: "Liberia",
        flag: "🇱🇷"
      },
      "ls": {
        label: "Lesotho",
        flag: "🇱🇸"
      },
      "lt": {
        label: "Lithuanian",
        flag: "🇱🇹"
      },
      "lu": {
        label: "Luba-Katanga",
        flag: "🇨🇩"
      },
      "lv": {
        label: "Latvian",
        flag: "🇱🇻"
      },
      "ly": {
        label: "Libya",
        flag: "🇱🇾"
      },
      "ma": {
        label: "Morocco",
        flag: "🇲🇦"
      },
      "mc": {
        label: "Monaco",
        flag: "🇲🇨"
      },
      "md": {
        label: "Moldova, Republic of",
        flag: "🇲🇩"
      },
      "me": {
        label: "Montenegro",
        flag: "🇲🇪"
      },
      "mf": {
        label: "Saint Martin (French part)",
        flag: "🇲🇫"
      },
      "mg": {
        label: "Malagasy",
        flag: "🇲🇬"
      },
      "mh": {
        label: "Marshallese",
        flag: "🇲🇭"
      },
      "mi": {
        label: "Māori",
        flag: "🇳🇿"
      },
      "mk": {
        label: "Macedonian",
        flag: "🇲🇰"
      },
      "ml": {
        label: "Malayalam",
        flag: "🇮🇳"
      },
      "mm": {
        label: "Myanmar",
        flag: "🇲🇲"
      },
      "mn": {
        label: "Mongolian",
        flag: "🇲🇳"
      },
      "mo": {
        label: "Macao",
        flag: "🇲🇴"
      },
      "mp": {
        label: "Northern Mariana Islands",
        flag: "🇲🇵"
      },
      "mq": {
        label: "Martinique",
        flag: "🇲🇶"
      },
      "mr": {
        label: "Marathi (Marāṭhī)",
        flag: "🇮🇳"
      },
      "ms": {
        label: "Malay",
        flag: "🇲🇾"
      },
      "mt": {
        label: "Maltese",
        flag: "🇲🇹"
      },
      "mu": {
        label: "Mauritius",
        flag: "🇲🇺"
      },
      "mv": {
        label: "Maldives",
        flag: "🇲🇻"
      },
      "mw": {
        label: "Malawi",
        flag: "🇲🇼"
      },
      "mx": {
        label: "Spanish (Mexico)",
        flag: "🇲🇽"
      },
      "my": {
        label: "Burmese",
        flag: "🇲🇲"
      },
      "mz": {
        label: "Mozambique",
        flag: "🇲🇿"
      },
      "na": {
        label: "Nauruan",
        flag: "🇳🇷"
      },
      "nb": {
        label: "Norwegian Bokmål",
        flag: "🇳🇴"
      },
      "nb-no": {
        label: "Norwegian Bokmål (Norway)",
        flag: "🇳🇴"
      },
      "nc": {
        label: "New Caledonia",
        flag: "🇳🇨"
      },
      "nd": {
        label: "Northern Ndebele",
        flag: "🇿🇼"
      },
      "ne": {
        label: "Nepali",
        flag: "🇳🇵"
      },
      "nf": {
        label: "Norfolk Island",
        flag: "🇳🇫"
      },
      "ng": {
        label: "Ndonga",
        flag: "🇳🇦"
      },
      "ni": {
        label: "Nicaragua",
        flag: "🇳🇮"
      },
      "nl": {
        label: "Dutch",
        flag: "🇳🇱"
      },
      "nl-be": {
        label: "Dutch (Belgium)",
        flag: "🇧🇪"
      },
      "nl-nl": {
        label: "Dutch (Netherlands)",
        flag: "🇳🇱"
      },
      "nn": {
        label: "Norwegian Nynorsk",
        flag: "🇳🇴"
      },
      "nn-no": {
        label: "Norwegian Nynorsk (Norway)",
        flag: "🇳🇴"
      },
      "no": {
        label: "Norwegian",
        flag: "🇳🇴"
      },
      "np": {
        label: "Nepal",
        flag: "🇳🇵"
      },
      "nr": {
        label: "Southern Ndebele",
        flag: "🇿🇦"
      },
      "nu": {
        label: "Niue",
        flag: "🇳🇺"
      },
      "nv": {
        label: "Navajo",
        flag: "🇺🇸"
      },
      "ny": {
        label: "Chichewa",
        flag: "🇲🇼"
      },
      "nz": {
        label: "New Zealand",
        flag: "🇳🇿"
      },
      "oc": {
        label: "Occitan",
        flag: "🇫🇷"
      },
      "oj": {
        label: "Ojibwe",
        flag: "🇨🇦"
      },
      "om": {
        label: "Oromo",
        flag: "🇪🇹"
      },
      "or": {
        label: "Oriya",
        flag: "🇮🇳"
      },
      "os": {
        label: "Ossetian",
        flag: "🇬🇪"
      },
      "pa": {
        label: "(Eastern) Punjabi",
        flag: "🇮🇳"
      },
      "pe": {
        label: "Peru",
        flag: "🇵🇪"
      },
      "pf": {
        label: "French Polynesia",
        flag: "🇵🇫"
      },
      "pg": {
        label: "Papua New Guinea",
        flag: "🇵🇬"
      },
      "ph": {
        label: "Philippines",
        flag: "🇵🇭"
      },
      "pi": {
        label: "Pāli",
        flag: "🇮🇳"
      },
      "pk": {
        label: "Pakistan",
        flag: "🇵🇰"
      },
      "pl": {
        label: "Polish",
        flag: "🇵🇱"
      },
      "pm": {
        label: "Saint Pierre and Miquelon",
        flag: "🇵🇲"
      },
      "pn": {
        label: "Pitcairn",
        flag: "🇵🇳"
      },
      "pr": {
        label: "Puerto Rico",
        flag: "🇵🇷"
      },
      "ps": {
        label: "Pashto",
        flag: "🇦🇫"
      },
      "pt": {
        label: "Portuguese",
        flag: "🇵🇹"
      },
      "pt-ao": {
        label: "Portuguese (Angola)",
        flag: "🇦🇴"
      },
      "pt-br": {
        label: "Portuguese (Brazil)",
        flag: "🇧🇷"
      },
      "pt-pt": {
        label: "Portuguese (Portugal)",
        flag: "🇵🇹"
      },
      "pw": {
        label: "Palau",
        flag: "🇵🇼"
      },
      "py": {
        label: "Paraguay",
        flag: "🇵🇾"
      },
      "qa": {
        label: "Qatar",
        flag: "🇶🇦"
      },
      "qu": {
        label: "Quechua",
        flag: "🇵🇪"
      },
      "re": {
        label: "Réunion",
        flag: "🇷🇪"
      },
      "rm": {
        label: "Romansh",
        flag: "🇨🇭"
      },
      "rn": {
        label: "Kirundi",
        flag: "🇧🇮"
      },
      "ro": {
        label: "Romanian",
        flag: "🇷🇴"
      },
      "rs": {
        label: "Serbia",
        flag: "🇷🇸"
      },
      "ru": {
        label: "Russian",
        flag: "🇷🇺"
      },
      "ru-ru": {
        label: "Russian (Russia)",
        flag: "🇷🇺"
      },
      "rw": {
        label: "Kinyarwanda",
        flag: "🇷🇼"
      },
      "sa": {
        label: "Arabic (Saudi Arabia)",
        flag: "🇸🇦"
      },
      "sb": {
        label: "Solomon Islands",
        flag: "🇸🇧"
      },
      "sc": {
        label: "Sardinian",
        flag: "🇮🇹"
      },
      "sd": {
        label: "Sindhi",
        flag: "🇵🇰"
      },
      "se": {
        label: "Swedish",
        flag: "🇸🇪"
      },
      "sg": {
        label: "Sango",
        flag: "🇨🇫"
      },
      "sh": {
        label: "Saint Helena, Ascension and Tristan da Cunha",
        flag: "🇸🇭"
      },
      "shared": {
        label: "Shared",
        flag: "🌐"
      },
      "si": {
        label: "Sinhalese",
        flag: "🇱🇰"
      },
      "sj": {
        label: "Svalbard and Jan Mayen",
        flag: "🇸🇯"
      },
      "sk": {
        label: "Slovak",
        flag: "🇸🇰"
      },
      "sl": {
        label: "Slovene",
        flag: "🇸🇮"
      },
      "sm": {
        label: "Samoan",
        flag: "🇼🇸"
      },
      "sn": {
        label: "Shona",
        flag: "🇿🇼"
      },
      "so": {
        label: "Somali",
        flag: "🇸🇴"
      },
      "sq": {
        label: "Albanian",
        flag: "🇦🇱"
      },
      "sr": {
        label: "Serbian",
        flag: "🇷🇸"
      },
      "ss": {
        label: "Swati",
        flag: "🇸🇿"
      },
      "st": {
        label: "Southern Sotho",
        flag: "🇱🇸"
      },
      "su": {
        label: "Sundanese",
        flag: "🇮🇩"
      },
      "sv": {
        label: "Swedish",
        flag: "🇸🇪"
      },
      "sv-fi": {
        label: "Swedish (Finland)",
        flag: "🇫🇮"
      },
      "sv-se": {
        label: "Swedish (Sweden)",
        flag: "🇸🇪"
      },
      "sw": {
        label: "Swahili",
        flag: "🇹🇿"
      },
      "sx": {
        label: "Sint Maarten (Dutch part)",
        flag: "🇸🇽"
      },
      "sy": {
        label: "Syrian Arab Republic",
        flag: "🇸🇾"
      },
      "sz": {
        label: "Eswatini",
        flag: "🇸🇿"
      },
      "ta": {
        label: "Tamil",
        flag: "🇮🇳"
      },
      "tc": {
        label: "Turks and Caicos Islands",
        flag: "🇹🇨"
      },
      "td": {
        label: "Chad",
        flag: "🇹🇩"
      },
      "te": {
        label: "Telugu",
        flag: "🇮🇳"
      },
      "tf": {
        label: "French Southern Territories",
        flag: "🇹🇫"
      },
      "tg": {
        label: "Tajik",
        flag: "🇹🇯"
      },
      "th": {
        label: "Thai",
        flag: "🇹🇭"
      },
      "ti": {
        label: "Tigrinya",
        flag: "🇪🇷"
      },
      "tj": {
        label: "Tajikistan",
        flag: "🇹🇯"
      },
      "tk": {
        label: "Turkmen",
        flag: "🇹🇲"
      },
      "tl": {
        label: "Tagalog",
        flag: "🇵🇭"
      },
      "tm": {
        label: "Turkmenistan",
        flag: "🇹🇲"
      },
      "tn": {
        label: "Tswana",
        flag: "🇧🇼"
      },
      "to": {
        label: "Tonga (Tonga Islands)",
        flag: "🇹🇴"
      },
      "tr": {
        label: "Turkish",
        flag: "🇹🇷"
      },
      "ts": {
        label: "Tsonga",
        flag: "🇿🇦"
      },
      "tt": {
        label: "Tatar",
        flag: "🇷🇺"
      },
      "tv": {
        label: "Tuvalu",
        flag: "🇹🇻"
      },
      "tw": {
        label: "Chinese (Traditional)",
        flag: "🇹🇼"
      },
      "ty": {
        label: "Tahitian",
        flag: "🇵🇫"
      },
      "tz": {
        label: "Tanzania, United Republic of",
        flag: "🇹🇿"
      },
      "ua": {
        label: "Ukrainian",
        flag: "🇺🇦"
      },
      "ug": {
        label: "Uyghur",
        flag: "🇨🇳"
      },
      "uk": {
        label: "English (UK)",
        flag: "🇬🇧"
      },
      "uk-ua": {
        label: "Ukrainian (Ukraine)",
        flag: "🇺🇦"
      },
      "um": {
        label: "United States Minor Outlying Islands",
        flag: "🇺🇲"
      },
      "ur": {
        label: "Urdu",
        flag: "🇵🇰"
      },
      "us": {
        label: "English (US)",
        flag: "🇺🇸"
      },
      "uy": {
        label: "Uruguay",
        flag: "🇺🇾"
      },
      "uz": {
        label: "Uzbek",
        flag: "🇺🇿"
      },
      "va": {
        label: "Holy See",
        flag: "🇻🇦"
      },
      "vc": {
        label: "Saint Vincent and the Grenadines",
        flag: "🇻🇨"
      },
      "ve": {
        label: "Venda",
        flag: "🇿🇦"
      },
      "vg": {
        label: "Virgin Islands (British)",
        flag: "🇻🇬"
      },
      "vi": {
        label: "Vietnamese",
        flag: "🇻🇳"
      },
      "vn": {
        label: "Viet Nam",
        flag: "🇻🇳"
      },
      "vo": {
        label: "Volapük",
        flag: "🌐"
      },
      "vu": {
        label: "Vanuatu",
        flag: "🇻🇺"
      },
      "wa": {
        label: "Walloon",
        flag: "🇧🇪"
      },
      "wf": {
        label: "Wallis and Futuna",
        flag: "🇼🇫"
      },
      "wo": {
        label: "Wolof",
        flag: "🇸🇳"
      },
      "ws": {
        label: "Samoa",
        flag: "🇼🇸"
      },
      "xh": {
        label: "Xhosa",
        flag: "🇿🇦"
      },
      "ye": {
        label: "Yemen",
        flag: "🇾🇪"
      },
      "yi": {
        label: "Yiddish",
        flag: "🇮🇱"
      },
      "yo": {
        label: "Yoruba",
        flag: "🇳🇬"
      },
      "yt": {
        label: "Mayotte",
        flag: "🇾🇹"
      },
      "za": {
        label: "Zhuang",
        flag: "🇨🇳"
      },
      "zh": {
        label: "Chinese",
        flag: "🇨🇳"
      },
      "zh-cn": {
        label: "Chinese (Simplified)",
        flag: "🇨🇳"
      },
      "zh-hk": {
        label: "Chinese (Hong Kong)",
        flag: "🇭🇰"
      },
      "zh-mo": {
        label: "Chinese (Macau)",
        flag: "🇲🇴"
      },
      "zh-sg": {
        label: "Chinese (Singapore)",
        flag: "🇸🇬"
      },
      "zh-tw": {
        label: "Chinese (Traditional)",
        flag: "🇹🇼"
      },
      "zm": {
        label: "Zambia",
        flag: "🇿🇲"
      },
      "zu": {
        label: "Zulu",
        flag: "🇿🇦"
      },
      "zw": {
        label: "Zimbabwe",
        flag: "🇿🇼"
      }
    };

    /**
     * Crafter forms-engine lays out sections as `.panel.panel-default` children of `.panel-group`
     * (standard form) or uses `#ice-container` (ICE). Reparent this field's `.cstudio-form-field-container`
     * so it always renders immediately before the first section container, no matter where the field
     * appears in the form definition.
     */
    function pinTranslationVersionsFieldToTopOfForm(form, containerEl) {
      try {
        if (!form || !containerEl || typeof containerEl.closest !== "function") {
          return;
        }
        if (containerEl.closest(".cstudio-form-repeat-container")) {
          return;
        }
        var row = containerEl.closest(".cstudio-form-field-container");
        if (!row) {
          return;
        }
        if (!form.sections || form.sections.length === 0) {
          return;
        }
        var firstSection = form.sections[0];
        if (!firstSection || !firstSection.containerEl) {
          return;
        }
        var marker = firstSection.containerEl;
        var parent = marker.parentNode;
        if (!parent) {
          return;
        }
        if (row.parentNode === parent && row.nextSibling === marker) {
          return;
        }
        parent.insertBefore(row, marker);
        row.style.marginBottom = "12px";
        row.setAttribute("data-translation-translation-versions-pinned", "true");
      } catch (e) {}
    }

    /** @returns {HTMLElement|null} */
    function findFormFieldsCompareHost(form, controlContainerEl) {
      try {
        if (form && form.sections && form.sections[0] && form.sections[0].containerEl) {
          var sec = form.sections[0].containerEl;
          if (sec.closest) {
            /** Prefer `.panel-group` over `#ice-container` so we wrap accordion sections only, not the whole ICE shell (fixes controls like file-name / XB). */
            var pg = sec.closest(".panel-group");
            if (pg) return pg;
            var ice = sec.closest("#ice-container");
            if (ice) return ice;
          }
          return sec.parentNode && sec.parentNode.nodeType === 1 ? (/** @type {HTMLElement} */sec.parentNode) : null;
        }
        if (controlContainerEl && controlContainerEl.closest) {
          var pg2 = controlContainerEl.closest(".panel-group");
          if (pg2) return pg2;
          var ice2 = controlContainerEl.closest("#ice-container");
          if (ice2) return ice2;
        }
      } catch (e2) {}
      return null;
    }
    function unwrapFormCompareLayout(host) {
      try {
        if (!host || host.dataset.translationCompareWrapped !== "1") return;
        var row = host.firstElementChild;
        if (!row || !row.classList || !row.classList.contains("translation-form-compare-row")) {
          delete host.dataset.translationCompareWrapped;
          return;
        }
        var main = row.querySelector(".translation-form-compare-main");
        if (main) {
          while (main.firstChild) {
            host.appendChild(main.firstChild);
          }
        }
        host.removeChild(row);
        delete host.dataset.translationCompareWrapped;
      } catch (e3) {}
    }
    var SMARTCOPY_COMPARE_WIDTH_LS = "translationSourceCompareWidthPx";
    /** Per-site: "1" = collapsed on all forms for that site. */
    var TRANSLATION_WIDGET_COLLAPSE_LS_PREFIX = "uigoodies.translationVersions.collapsed.";
    var TRANSLATION_WIDGET_COLLAPSE_EVENT = "uigoodies.translationVersions.collapsedChanged";
    function translationWidgetCollapseStorageKey(siteId) {
      return TRANSLATION_WIDGET_COLLAPSE_LS_PREFIX + String(siteId || "_").trim();
    }
    function readTranslationWidgetCollapsed(siteId) {
      try {
        return typeof localStorage !== "undefined" && localStorage.getItem(translationWidgetCollapseStorageKey(siteId)) === "1";
      } catch (e) {
        return false;
      }
    }
    function writeTranslationWidgetCollapsed(siteId, collapsed) {
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(translationWidgetCollapseStorageKey(siteId), collapsed ? "1" : "0");
        }
      } catch (eLs) {}
      try {
        if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
          window.dispatchEvent(new CustomEvent(TRANSLATION_WIDGET_COLLAPSE_EVENT, {
            detail: {
              siteId: String(siteId || "").trim(),
              collapsed: !!collapsed
            }
          }));
        }
      } catch (eEv) {}
    }
    function applySourcePaneWidthPx(leftEl, totalRowWidthPx, widthPx) {
      var minW = 200;
      var maxW = Math.max(minW + 80, Math.round(totalRowWidthPx) - 260);
      var w = Math.max(minW, Math.min(maxW, Math.round(widthPx)));
      leftEl.style.flex = "0 0 " + w + "px";
      leftEl.style.width = w + "px";
      leftEl.style.maxWidth = "none";
    }
    function readInitialSourcePaneWidthPx(hostWidthPx) {
      var maxAllowed = Math.max(280, Math.round(hostWidthPx) - 260);
      try {
        var s = typeof localStorage !== "undefined" && localStorage.getItem(SMARTCOPY_COMPARE_WIDTH_LS);
        var n = parseInt(s, 10);
        if (!isNaN(n) && n >= 200 && n <= maxAllowed) {
          return n;
        }
      } catch (e0) {}
      return Math.min(Math.floor(hostWidthPx * 0.44), 600, maxAllowed);
    }

    /** Draggable vertical splitter between source pane and main form column. */
    function attachSmartcopyCompareSplitter(row) {
      var splitter = document.createElement("div");
      splitter.className = "translation-form-compare-splitter";
      splitter.setAttribute("role", "separator");
      splitter.setAttribute("aria-orientation", "vertical");
      splitter.setAttribute("aria-label", "Drag to resize source panel width");
      splitter.tabIndex = 0;
      splitter.style.cssText = "flex:0 0 10px;width:10px;cursor:col-resize;align-self:stretch;touch-action:none;-webkit-user-select:none;user-select:none;position:relative;background:#e9ecef;border-radius:4px;border:1px solid #cfd4db;";
      splitter.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        var leftEl = row.querySelector(".translation-source-compare-iframe-host");
        if (!leftEl) return;
        var startX = e.clientX;
        var startW = leftEl.offsetWidth;
        var minW = 200;
        function getMaxW() {
          return Math.max(minW + 80, Math.round(row.getBoundingClientRect().width) - 260);
        }
        try {
          splitter.setPointerCapture(e.pointerId);
        } catch (cap) {}
        function onMove(ev) {
          var dx = ev.clientX - startX;
          var nw = startW + dx;
          var maxW = getMaxW();
          if (nw < minW) nw = minW;
          if (nw > maxW) nw = maxW;
          leftEl.style.flex = "0 0 " + nw + "px";
          leftEl.style.width = nw + "px";
        }
        function onUp() {
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
          document.removeEventListener("pointercancel", onUp);
          try {
            splitter.releasePointerCapture(e.pointerId);
          } catch (rel) {}
          try {
            if (typeof localStorage !== "undefined") {
              localStorage.setItem(SMARTCOPY_COMPARE_WIDTH_LS, String(leftEl.offsetWidth));
            }
          } catch (ls) {}
        }
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
        document.addEventListener("pointercancel", onUp);
      });
      row.appendChild(splitter);
    }

    /**
     * Puts read-only source iframe to the left of all current form fields (sections + pinned widgets).
     * @param {string} iframeSrc
     * @param {string} pathLabel
     */
    function wrapFormCompareLayout(host, iframeSrc, pathLabel) {
      try {
        if (!host || !iframeSrc) return;
        if (host.dataset.translationCompareWrapped === "1") {
          var existingIframe = host.querySelector(".translation-source-compare-iframe-host iframe");
          if (existingIframe) {
            existingIframe.src = iframeSrc;
            existingIframe.style.cssText = "flex:1 1 auto;min-height:0;width:100%;height:100%;border:1px solid #cfd4db;border-radius:6px;background:#fff;box-sizing:border-box;";
          }
          var codeEl = host.querySelector(".translation-source-compare-path");
          if (codeEl) codeEl.textContent = pathLabel || "";
          return;
        }
        var row = document.createElement("div");
        row.className = "translation-form-compare-row";
        row.style.cssText = "display:flex;flex-direction:row;align-items:stretch;gap:8px;width:100%;min-height:0;box-sizing:border-box;";
        var hostW = host.getBoundingClientRect().width || (typeof window !== "undefined" ? window.innerWidth : 800) || 800;
        var left = document.createElement("div");
        left.className = "translation-source-compare-iframe-host";
        left.style.cssText = "flex:0 0 auto;display:flex;flex-direction:column;gap:8px;min-height:0;align-self:stretch;box-sizing:border-box;";
        applySourcePaneWidthPx(left, hostW, readInitialSourcePaneWidthPx(hostW));
        var header = document.createElement("div");
        header.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;flex-shrink:0;";
        var titleBlock = document.createElement("div");
        titleBlock.style.minWidth = "0";
        var strong = document.createElement("strong");
        strong.style.cssText = "font-size:12px;color:#212529;";
        strong.textContent = "Source (read-only)";
        titleBlock.appendChild(strong);
        var sub = document.createElement("div");
        sub.className = "text-muted";
        sub.style.cssText = "font-size:10px;margin-top:2px;word-break:break-all;";
        var code = document.createElement("code");
        code.className = "translation-source-compare-path";
        code.style.cssText = "font-size:10px;";
        code.textContent = pathLabel || "";
        sub.appendChild(code);
        titleBlock.appendChild(sub);
        var closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "btn btn-default btn-xs";
        closeBtn.textContent = "Close";
        closeBtn.addEventListener("click", function () {
          try {
            window.dispatchEvent(new CustomEvent("translation:close-source-compare"));
          } catch (e4) {}
        });
        header.appendChild(titleBlock);
        header.appendChild(closeBtn);
        left.appendChild(header);
        var iframe = document.createElement("iframe");
        iframe.title = "Source item — read-only form";
        iframe.src = iframeSrc;
        iframe.style.cssText = "flex:1 1 auto;min-height:0;width:100%;height:100%;border:1px solid #cfd4db;border-radius:6px;background:#fff;box-sizing:border-box;";
        left.appendChild(iframe);
        var main = document.createElement("div");
        main.className = "translation-form-compare-main";
        main.style.cssText = "flex:1 1 auto;min-width:0;min-height:0;width:100%;box-sizing:border-box;";
        while (host.firstChild) {
          main.appendChild(host.firstChild);
        }
        row.appendChild(left);
        attachSmartcopyCompareSplitter(row);
        row.appendChild(main);
        host.appendChild(row);
        host.dataset.translationCompareWrapped = "1";
      } catch (e5) {}
    }
    function getLocaleList() {
      return ["en", "es", "ja", "zh", "us", "uk", "de", "fr", "it", "dk", "fi", "nl", "no", "ru", "se", "br", "el", "jp", "pt", "ko", "ar", "pl", "tr", "vi"];
    }
    function getLocaleFromPath(path) {
      if (!path) return "";
      var parts = path.replace(/^\/site\/[^/]+\//i, "").split("/").filter(Boolean);
      if (parts.length === 0) return "";
      var list = getLocaleList();
      var first = parts[0].toLowerCase();
      if (RESERVED_FIRST_SEGMENTS[first] && parts[1]) {
        var candidate = parts[1].toLowerCase();
        if (list.indexOf(candidate) >= 0) return candidate;
        if (/^[a-z]{2}(-[a-z0-9]{1,8})?$/i.test(parts[1])) return candidate;
        return "";
      }
      if (RESERVED_FIRST_SEGMENTS[first]) return "";
      if (list.indexOf(first) >= 0) return first;
      if (/^[a-z]{2}(-[a-z0-9]{1,8})?$/i.test(parts[0])) return first;
      return "";
    }

    /** Same as translation-components {@code localeSegmentsCompatible} (ar ↔ ar-sa, zh ↔ zh-cn). */
    function localeSegmentsCompatible(a, b) {
      var s = String(a || "").trim().toLowerCase().replace(/_/g, "-");
      var c = String(b || "").trim().toLowerCase().replace(/_/g, "-");
      if (!s || !c) return false;
      if (s === c) return true;
      if (s.startsWith(c + "-")) return true;
      if (c.startsWith(s + "-")) return true;
      return false;
    }
    function metaForPathLocale(activeMeta, loc) {
      var lk = String(loc || "").toLowerCase();
      if (activeMeta && activeMeta[lk]) return activeMeta[lk];
      if (!activeMeta) return null;
      for (var key in activeMeta) {
        if (!Object.prototype.hasOwnProperty.call(activeMeta, key)) continue;
        if (localeSegmentsCompatible(lk, key)) return activeMeta[key];
      }
      return null;
    }
    function translationLocaleAlreadyPresent(translatedLocales, loc) {
      var lk = String(loc || "").toLowerCase();
      if (translatedLocales[lk]) return true;
      for (var seg in translatedLocales) {
        if (!Object.prototype.hasOwnProperty.call(translatedLocales, seg)) continue;
        if (!translatedLocales[seg]) continue;
        if (localeSegmentsCompatible(seg, lk)) return true;
      }
      return false;
    }

    /** Normalize repo paths for equality (slashes, no trailing slash). */
    function normalizeStudioPath(p) {
      return String(p || "").replace(/\\/g, "/").replace(/\/+$/, "");
    }
    function getMultiLocaleRootDir(fullPath) {
      if (!fullPath) return null;
      var m = fullPath.match(/^(\/site\/[^/]+\/(?:website|components))(?=\/|$)/i);
      if (m) return m[1];
      m = fullPath.match(/^(\/site\/(?:website|components))(?=\/|$)/i);
      return m ? m[1] : null;
    }
    function pathForTargetLocale(rootDir, locale, suffix) {
      var r = rootDir.replace(/\/$/, "");
      var suf = suffix === "" ? "" : suffix.startsWith("/") ? suffix : "/" + suffix;
      return r + "/" + locale.toLowerCase() + suf;
    }

    /**
     * Under rootDir (/site/{id}/website or .../components), first path segment is the locale folder;
     * everything after that is the mirrored suffix for other locales.
     */
    function parseSuffixFromFormPath(formPath, rootDir) {
      if (!formPath || !rootDir) return {
        suffix: null
      };
      var r = rootDir.replace(/\/$/, "");
      var fp = String(formPath).replace(/\\/g, "/");
      var rl = r.toLowerCase();
      var fl = fp.toLowerCase();
      if (fl === rl) return {
        suffix: ""
      };
      if (fl.indexOf(rl + "/") !== 0) return {
        suffix: null
      };
      var rest = fp.slice(r.length);
      if (rest.charAt(0) === "/") rest = rest.slice(1);
      var parts = rest.split("/").filter(Boolean);
      if (parts.length === 0) return {
        suffix: ""
      };
      var suffixParts = parts.slice(1);
      if (suffixParts.length === 0) return {
        suffix: ""
      };
      return {
        suffix: "/" + suffixParts.join("/")
      };
    }

    /** First path segment under rootDir (the locale folder), lowercased. */
    function firstLocaleSegmentUnderRoot(path, rootDir) {
      if (!path || !rootDir) return "";
      var r = rootDir.replace(/\/$/, "");
      var fp = String(path).replace(/\\/g, "/");
      var rl = r.toLowerCase();
      var fl = fp.toLowerCase();
      if (fl !== rl && fl.indexOf(rl + "/") !== 0) return "";
      var rest = fl === rl ? "" : fp.slice(r.length);
      if (rest.charAt(0) === "/") rest = rest.slice(1);
      var seg = rest.split("/").filter(Boolean)[0] || "";
      return String(seg).toLowerCase();
    }

    /** Locales that already have a translation item (from repo paths under rootDir). */
    function existingTranslationLocaleKeys(paths, rootDir, formPath) {
      var keys = {};
      function add(p) {
        var k = firstLocaleSegmentUnderRoot(p, rootDir);
        if (k) keys[k] = true;
      }
      add(formPath);
      (paths || []).forEach(add);
      return keys;
    }

    /** Studio /api/1/content/content-exists — unwrap common response shapes. */
    function parseContentExistsPayload(body) {
      if (!body) return false;
      var c = body.content;
      if (c == null && body.response) c = body.response.content;
      if (c == null && body.result) c = body.result.content;
      if (c == null) c = body.exists;
      if (typeof c === "boolean") return c;
      if (typeof c === "string") return String(c).toLowerCase() === "true";
      if (typeof c === "number") return c !== 0;
      return false;
    }

    /** Authoring base for /api/1/services/api/1/content/... (pref prop may be empty on first paint). */
    function resolveAuthoringContentApiBase(pref) {
      var a = pref && String(pref).replace(/\/$/, "");
      if (a) return a;
      try {
        a = getAuthoringBase() && String(getAuthoringBase()).replace(/\/$/, "");
      } catch (e) {
        a = "";
      }
      if (a) return a;
      return (getStudioApiBase() || "").replace(/\/$/, "");
    }
    function getAuthoringBase() {
      try {
        var cms = window.craftercms;
        if (cms && typeof cms.getStore === "function") {
          var store = cms.getStore();
          if (store && typeof store.getState === "function") {
            var env = store.getState().env || {};
            if (env.authoringBase) return env.authoringBase;
          }
        }
      } catch (e) {}
      return "";
    }

    /** Studio REST base (e.g. https://host/studio) for /api/2/... */
    function getStudioApiBase() {
      var b = getAuthoringBase();
      if (b) return b.replace(/\/$/, "");
      if (typeof CStudioAuthoringContext !== "undefined" && CStudioAuthoringContext.baseUri) {
        return String(CStudioAuthoringContext.baseUri).replace(/\/$/, "");
      }
      return "";
    }

    /**
     * Same transport as Translation (`apps/translation/index.js`): `craftercms.utils.ajax`
     * merges Authorization (JWT) and other global headers — raw `fetch` gets 401 on `/api/2/...`.
     */
    function getCrafterStudioAjax() {
      try {
        var cms = typeof window !== "undefined" && window.craftercms;
        if (cms && cms.utils && cms.utils.ajax) {
          return cms.utils.ajax;
        }
      } catch (e) {}
      return null;
    }
    function mergeFetchHeaders(extra) {
      var out = Object.assign({}, extra || {});
      try {
        var ajax = getCrafterStudioAjax();
        if (ajax && typeof ajax.getGlobalHeaders === "function") {
          Object.assign(out, ajax.getGlobalHeaders());
        }
      } catch (e) {}
      var m = typeof document !== "undefined" && document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
      if (m && !out["X-XSRF-TOKEN"]) {
        try {
          out["X-XSRF-TOKEN"] = decodeURIComponent(m[1]);
        } catch (e2) {}
      }
      return out;
    }
    function unwrapAjaxResponse(res) {
      if (!res) {
        return null;
      }
      if (res.response !== undefined) {
        return res.response;
      }
      return res;
    }
    function studioAjaxGet(url) {
      var ajax = getCrafterStudioAjax();
      if (ajax && typeof ajax.get === "function") {
        return new Promise(function (resolve, reject) {
          ajax.get(url).subscribe({
            next: function next(r) {
              resolve(r);
            },
            error: function error(e) {
              reject(e);
            }
          });
        });
      }
      return fetch(url, {
        credentials: "include",
        headers: mergeFetchHeaders({
          Accept: "application/json"
        })
      }).then(function (r) {
        return r.json().then(function (json) {
          return {
            status: r.status,
            response: json
          };
        });
      });
    }

    /** @param body string or object (object is JSON.stringified) */
    function studioAjaxPost(url, body, headers) {
      var ajax = getCrafterStudioAjax();
      var payload = body != null && _typeof(body) === "object" ? JSON.stringify(body) : body != null ? String(body) : "";
      var h = Object.assign({
        Accept: "application/json"
      }, headers || {});
      if (_typeof(body) === "object" && body != null && !h["Content-Type"]) {
        h["Content-Type"] = "application/json";
      }
      if (ajax && typeof ajax.post === "function") {
        return new Promise(function (resolve, reject) {
          ajax.post(url, payload, h).subscribe({
            next: function next(r) {
              resolve(r);
            },
            error: function error(e) {
              reject(e);
            }
          });
        });
      }
      return fetch(url, {
        method: "POST",
        credentials: "include",
        headers: mergeFetchHeaders(h),
        body: payload
      }).then(function (r) {
        return r.json().then(function (json) {
          return {
            status: r.status,
            response: json
          };
        });
      });
    }
    function unwrapPluginScriptResultBody(body) {
      var p = body && body.result !== undefined ? body.result : body;
      if (p && _typeof(p) === "object" && p.result != null && p.ok === undefined) {
        p = p.result;
      }
      return p && _typeof(p) === "object" ? p : null;
    }
    function fetchTranslationRemoveCandidates(studioBase, siteId, pagePath) {
      var url = String(studioBase || "").replace(/\/$/, "") + "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove-candidates.post?siteId=" + encodeURIComponent(siteId);
      return studioAjaxPost(url, {
        pagePath: pagePath
      }, {
        Accept: "application/json",
        "Content-Type": "application/json"
      }).then(unwrapAjaxResponse).then(function (body) {
        var p = unwrapPluginScriptResultBody(body);
        return p || {
          ok: false,
          message: "Empty response",
          candidates: []
        };
      });
    }
    function postTranslationRemove(studioBase, siteId, pagePath, componentPaths, deletePage) {
      var url = String(studioBase || "").replace(/\/$/, "") + "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove.post?siteId=" + encodeURIComponent(siteId);
      return studioAjaxPost(url, {
        pagePath: pagePath,
        componentPaths: componentPaths || [],
        deletePage: deletePage !== false
      }, {
        Accept: "application/json",
        "Content-Type": "application/json"
      }).then(unwrapAjaxResponse).then(function (body) {
        var p = unwrapPluginScriptResultBody(body);
        return p || {
          ok: false,
          deleted: [],
          failed: [{
            path: "",
            message: "Empty response"
          }]
        };
      });
    }

    /** Page items only (not components folder): show Remove translation instead of only ⋮ for non-source rows. */
    function isPageTranslationRow(targetPath, contentTypeId) {
      var ct = String(contentTypeId || "").trim();
      if (ct.indexOf("/page/") === 0) return true;
      var p = normalizeStudioPath(targetPath).toLowerCase();
      return p.indexOf("/website/") >= 0 && p.endsWith(".xml");
    }
    function extractPathsFromSearchItems(items) {
      var out = [];
      if (!items || !items.length) return out;
      items.forEach(function (item) {
        var p = item.path || item.localId || item.item && (item.item.path || item.item.localId);
        if (p && out.indexOf(p) === -1) out.push(p);
      });
      return out;
    }

    /**
     * Studio OpenSearch: find all indexed items sharing the same translation lineage id.
     */
    function extractPathsFromPluginResult(body) {
      var payload = body && body.result;
      if (payload && _typeof(payload) === "object" && payload.result != null && payload.ok === undefined) {
        payload = payload.result;
      }
      if (!payload || _typeof(payload) !== "object") {
        payload = body && body.response && body.response.result;
      }
      if (!payload || !payload.ok) {
        return [];
      }
      var items = payload.items || [];
      var out = [];
      items.forEach(function (it) {
        var p = it && (it.localId || it.path);
        if (p && out.indexOf(p) === -1) {
          out.push(p);
        }
      });
      return out;
    }

    /**
     * Preview OpenSearch (plugin Groovy): same content-type and localeSourceId_s matching lineage or objectId.
     */
    function fetchTranslationSiblingsFromPlugin(studioBase, siteId, contentType, localeSourceId, objectId) {
      if (!studioBase || !siteId || !contentType) {
        return Promise.resolve([]);
      }
      var lid = localeSourceId && String(localeSourceId).trim();
      var oid = objectId && String(objectId).trim();
      if (!lid && !oid) {
        return Promise.resolve([]);
      }
      var url = studioBase + "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-siblings.post?siteId=" + encodeURIComponent(siteId) + "&contentType=" + encodeURIComponent(String(contentType).trim()) + "&localeSourceId=" + encodeURIComponent(lid || "") + "&objectId=" + encodeURIComponent(oid || "");
      return studioAjaxPost(url, "", {
        Accept: "application/json"
      }).then(unwrapAjaxResponse).then(extractPathsFromPluginResult)["catch"](function () {
        return [];
      });
    }
    function searchPathsByLocaleSourceId(studioBase, siteId, localeSourceId) {
      if (!studioBase || !siteId || !localeSourceId) {
        return Promise.resolve([]);
      }
      var url = studioBase + "/api/2/search/search.json?siteId=" + encodeURIComponent(siteId);
      function postSearch(body) {
        return studioAjaxPost(url, body, {
          "Content-Type": "application/json",
          Accept: "application/json"
        }).then(unwrapAjaxResponse);
      }
      return postSearch({
        keywords: "",
        offset: 0,
        limit: 200,
        filters: {
          localeSourceId_s: [String(localeSourceId).trim()]
        }
      }).then(function (body) {
        var items = body.response && body.response.result && body.response.result.items || [];
        var paths = extractPathsFromSearchItems(items);
        if (paths.length > 0) return paths;
        return postSearch({
          keywords: String(localeSourceId).trim(),
          offset: 0,
          limit: 200
        }).then(function (body2) {
          var items2 = body2.response && body2.response.result && body2.response.result.items || [];
          return extractPathsFromSearchItems(items2);
        });
      })["catch"](function () {
        return [];
      });
    }
    function flagForLocaleCode(localeCode) {
      var k = String(localeCode || "").toLowerCase();
      if (!k) return "\uD83C\uDF10";
      var map = {
        en: "\uD83C\uDDFA\uD83C\uDDF8",
        "en-us": "\uD83C\uDDFA\uD83C\uDDF8",
        "en-gb": "\uD83C\uDDEC\uD83C\uDDE7",
        es: "\uD83C\uDDEA\uD83C\uDDF8",
        "es-es": "\uD83C\uDDEA\uD83C\uDDF8",
        de: "\uD83C\uDDE9\uD83C\uDDEA",
        "de-de": "\uD83C\uDDE9\uD83C\uDDEA",
        zh: "\uD83C\uDDE8\uD83C\uDDF3",
        cn: "\uD83C\uDDE8\uD83C\uDDF3",
        "zh-cn": "\uD83C\uDDE8\uD83C\uDDF3",
        "zh-tw": "\uD83C\uDDF9\uD83C\uDDFC",
        ja: "\uD83C\uDDEF\uD83C\uDDF5",
        "ja-jp": "\uD83C\uDDEF\uD83C\uDDF5",
        fr: "\uD83C\uDDEB\uD83C\uDDF7",
        "fr-fr": "\uD83C\uDDEB\uD83C\uDDF7",
        it: "\uD83C\uDDEE\uD83C\uDDF9",
        "it-it": "\uD83C\uDDEE\uD83C\uDDF9",
        pt: "\uD83C\uDDF5\uD83C\uDDF9",
        "pt-pt": "\uD83C\uDDF5\uD83C\uDDF9",
        "pt-br": "\uD83C\uDDE7\uD83C\uDDF7",
        ko: "\uD83C\uDDF0\uD83C\uDDF7",
        "ko-kr": "\uD83C\uDDF0\uD83C\uDDF7",
        ar: "\uD83C\uDDF8\uD83C\uDDE6",
        "ar-sa": "\uD83C\uDDF8\uD83C\uDDE6",
        "ar-ae": "\uD83C\uDDE6\uD83C\uDDEA",
        "ar-eg": "\uD83C\uDDEA\uD83C\uDDEC"
      };
      return map[k] || map[k.slice(0, 2)] || "\uD83C\uDF10";
    }
    function fetchTranslationConfig(studioBase, siteId) {
      if (!studioBase || !siteId) return Promise.resolve(null);
      var url = studioBase + "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-config.get?siteId=" + encodeURIComponent(siteId);
      return studioAjaxGet(url).then(unwrapAjaxResponse).then(function (body) {
        var p = body && body.result !== undefined ? body.result : body;
        if (!p || !p.ok || !Array.isArray(p.languages) || p.languages.length === 0) return null;
        var codes = [];
        var meta = {};
        p.languages.forEach(function (row) {
          var lc = row && row.locale ? String(row.locale).toLowerCase() : "";
          if (!lc) return;
          if (codes.indexOf(lc) < 0) codes.push(lc);
          meta[lc] = {
            label: row && row.label || lc,
            flag: row && row.flag && String(row.flag).trim() ? String(row.flag).trim() : flagForLocaleCode(lc)
          };
        });
        if (codes.length === 0) return null;
        var baseRaw = p.baseLanguage != null && String(p.baseLanguage).trim() ? String(p.baseLanguage).trim() : "";
        var baseLocale = baseRaw ? baseRaw.toLowerCase() : codes[0];
        if (codes.indexOf(baseLocale) < 0) {
          baseLocale = codes[0];
        }
        return {
          baseLocale: baseLocale,
          codes: codes,
          meta: meta
        };
      })["catch"](function () {
        return null;
      });
    }
    var TRANSLATIONS_PAGE_SIZE = 5;
    function localeLabelForPath(path) {
      var loc = (getLocaleFromPath(path) || "unknown").toLowerCase();
      var m = LOCALE_META[loc];
      return m && m.label ? m.label : loc;
    }

    /** Source locale row(s) first; remaining rows A–Z by display label, then path. */
    function sortTranslationPathsForDisplay(paths, sourceLocaleKey) {
      var src = (sourceLocaleKey || "").toLowerCase();
      var arr = paths.slice();
      function isSourcePath(p) {
        return !!(src && localeSegmentsCompatible(getLocaleFromPath(p) || "", src));
      }
      arr.sort(function (a, b) {
        var as = isSourcePath(a);
        var bs = isSourcePath(b);
        if (as && !bs) {
          return -1;
        }
        if (!as && bs) {
          return 1;
        }
        var la = localeLabelForPath(a).toLowerCase();
        var lb = localeLabelForPath(b).toLowerCase();
        var cmp = la.localeCompare(lb, undefined, {
          sensitivity: "base"
        });
        if (cmp !== 0) {
          return cmp;
        }
        return String(a).localeCompare(String(b));
      });
      return arr;
    }
    function filterTranslationPaths(paths, query) {
      var q = (query || "").trim().toLowerCase();
      if (!q) {
        return paths.slice();
      }
      return paths.filter(function (p) {
        var loc = (getLocaleFromPath(p) || "").toLowerCase();
        var label = localeLabelForPath(p).toLowerCase();
        return String(p).toLowerCase().indexOf(q) >= 0 || loc.indexOf(q) >= 0 || label.indexOf(q) >= 0;
      });
    }
    function getDispatch() {
      try {
        var cms = window.craftercms;
        if (cms && typeof cms.getStore === "function") {
          var store = cms.getStore();
          if (store && typeof store.dispatch === "function") return store.dispatch.bind(store);
        }
      } catch (e) {}
      return null;
    }
    function contentExists(authoringBase, siteId, path) {
      var base = resolveAuthoringContentApiBase(authoringBase);
      if (!base || !siteId || !path) {
        return Promise.resolve(false);
      }
      var url = base + "/api/1/services/api/1/content/content-exists.json?site_id=" + encodeURIComponent(siteId) + "&path=" + encodeURIComponent(path);
      return studioAjaxGet(url).then(function (res) {
        var body = unwrapAjaxResponse(res);
        return parseContentExistsPayload(body);
      })["catch"](function () {
        return false;
      });
    }
    function parseTimestampMs(input) {
      if (input == null) return null;
      if (typeof input === "number" && isFinite(input)) return input;
      var asNum = Number(input);
      if (isFinite(asNum) && asNum > 0) return asNum;
      var parsed = Date.parse(String(input));
      return isFinite(parsed) ? parsed : null;
    }
    function getItemModifiedTimestamp(authoringBase, siteId, path) {
      var base = resolveAuthoringContentApiBase(authoringBase);
      if (!base || !siteId || !path) {
        return Promise.resolve(null);
      }
      var url = base + "/api/1/services/api/1/content/get-items-tree.json?site=" + encodeURIComponent(siteId) + "&path=" + encodeURIComponent(path) + "&depth=0";
      return studioAjaxGet(url).then(unwrapAjaxResponse).then(function (body) {
        var item = body && body.item;
        if (!item) return null;
        return parseTimestampMs(item.lastModifiedDate_dt) || parseTimestampMs(item.lastModifiedDate) || parseTimestampMs(item.lastEditDate) || parseTimestampMs(item.modifiedDate) || parseTimestampMs(item.dateModified) || null;
      })["catch"](function () {
        return null;
      });
    }

    /**
     * Same URL shape as Crafter Studio UI {@code getEditFormSrc} (legacy form engine), read-only for source compare iframe.
     * @see https://github.com/craftercms/studio-ui/blob/develop/ui/app/src/utils/path.ts
     */
    function buildLegacyReadonlyFormSrc(authoringBase, siteId, path) {
      var base = String(authoringBase || "").trim().replace(/\/$/, "");
      if (!base || !siteId || !path) {
        return "";
      }
      return base + "/legacy/form?site=" + encodeURIComponent(siteId) + "&path=" + encodeURIComponent(path) + "&readonly=true" + "&isHidden=false";
    }
    function notifyDispatch(dispatch, message) {
      if (!dispatch || message == null) return;
      try {
        dispatch({
          type: "SHOW_SYSTEM_NOTIFICATION",
          payload: {
            message: String(message)
          }
        });
      } catch (e) {}
    }

    /** Opens Studio form editor for `path` (same payload as Translation React helpers). */
    function openStudioEditForm(dispatch, siteId, path, authoringBaseForDialog) {
      if (!dispatch || !siteId || !path) return;
      var ab = String(authoringBaseForDialog || getAuthoringBase() || "").replace(/\/$/, "");
      if (!ab) return;
      try {
        dispatch({
          type: "SHOW_EDIT_DIALOG",
          payload: {
            site: siteId,
            path: path,
            type: "form",
            authoringBase: ab,
            isHidden: false,
            onSaveSuccess: {
              type: "BATCH_ACTIONS",
              payload: [{
                type: "DISPATCH_DOM_EVENT",
                payload: {
                  id: "editDialogSuccess"
                }
              }, {
                type: "SHOW_EDIT_ITEM_SUCCESS_NOTIFICATION"
              }, {
                type: "CLOSE_EDIT_DIALOG"
              }]
            },
            onCancel: {
              type: "BATCH_ACTIONS",
              payload: [{
                type: "CLOSE_EDIT_DIALOG"
              }, {
                type: "DISPATCH_DOM_EVENT",
                payload: {
                  id: "editDialogDismissed"
                }
              }]
            }
          }
        });
      } catch (e) {}
    }

    /**
     * Copy source for Translation translate: plugin-config base language path when layout supports it,
     * else legacy source locale from content tree paths / current form.
     */
    function resolveTranslateCopySourcePath(translationCfg, rootDir, suffix, translationPaths, formPath, resolvedSourceKey) {
      if (translationCfg && translationCfg.baseLocale && rootDir != null && suffix != null) {
        return pathForTargetLocale(rootDir, String(translationCfg.baseLocale).toLowerCase(), suffix);
      }
      var fromSourceLocale = (translationPaths || []).find(function (p) {
        var loc = (getLocaleFromPath(p) || "").toLowerCase();
        return resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
      }) || formPath;
      return fromSourceLocale || formPath;
    }
    function parentFolderPathForCopy(p) {
      var i = p.lastIndexOf("/");
      if (i <= 0) return "/";
      return p.slice(0, i) || "/";
    }
    function copyItemPasteStudio(base, siteId, sourcePath, targetParentPath, expectedTargetPath) {
      var url = String(base).replace(/\/$/, "") + "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-copy.post?siteId=" + encodeURIComponent(siteId);
      var body = {
        sourcePath: sourcePath,
        targetParentPath: targetParentPath,
        expectedTargetPath: expectedTargetPath || ""
      };
      return studioAjaxPost(url, body, {
        Accept: "application/json",
        "Content-Type": "application/json"
      }).then(function (res) {
        var body = unwrapAjaxResponse(res);
        return body && body.result !== undefined ? body.result : body;
      })["catch"](function () {
        return null;
      });
    }

    /** Chevron for native select (no Bootstrap). */
    var ADD_TRANSLATION_SELECT_CHEVRON = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');

    /**
     * Dropdown: locales still missing this item; copy uses the same path under the chosen locale folder.
     */
    /** @param props.onTranslated optional — called after a successful paste to refetch the translations list above. */
    /** @param props.translationCfg optional — from panel state when GET fails. */
    /** @param props.existingPaths translation sibling paths + current form path counts as existing content. */
    /** @param props.translateCopySourcePath repo path to copy from (base language); falls back to formPath if omitted. */
    function AddTranslationLocaleBar(props) {
      var formPath = props.formPath;
      var translateCopySourcePath = props.translateCopySourcePath || formPath;
      var siteId = props.siteId;
      var dispatch = props.dispatch;
      var authoringBase = props.authoringBase || "";
      var rootDir = props.rootDir;
      var suffix = props.suffix;
      var existingPaths = props.existingPaths || [];
      var onTranslated = props.onTranslated;
      var translationCfgProp = props.translationCfg;
      var localeCodes = props.localeCodes && props.localeCodes.length ? props.localeCodes : MULTI_LOCALE_CODES;
      var localeMeta = props.localeMeta || LOCALE_META;
      var optSt = React.useState([]);
      var options = optSt[0];
      var setOptions = optSt[1];
      var selSt = React.useState("");
      var selected = selSt[0];
      var setSelected = selSt[1];
      var loadSt = React.useState(false);
      var loading = loadSt[0];
      var setLoading = loadSt[1];
      var busySt = React.useState(false);
      var copyBusy = busySt[0];
      var setCopyBusy = busySt[1];
      var focusSelSt = React.useState(false);
      var selectFocused = focusSelSt[0];
      var setSelectFocused = focusSelSt[1];

      /** Supported locales from config minus locales already present in formPath + translationPaths (no content-exists). */
      var loadTargets = React.useCallback(function () {
        if (!formPath || !siteId || !rootDir) {
          setOptions([]);
          return Promise.resolve();
        }
        var effSuffix = suffix;
        if (effSuffix == null) {
          effSuffix = parseSuffixFromFormPath(formPath, rootDir).suffix;
        }
        if (effSuffix == null) {
          setOptions([]);
          return Promise.resolve();
        }
        setLoading(true);
        var studioBase = getStudioApiBase();
        function applyCodes(activeMeta, rawCodes) {
          var seen = {};
          var activeCodes = [];
          (rawCodes || []).forEach(function (c) {
            var s = String(c || "").trim();
            if (!s) return;
            var k = s.toLowerCase();
            if (seen[k]) return;
            seen[k] = true;
            activeCodes.push(s);
          });
          if (!activeCodes.length) {
            setOptions([]);
            return Promise.resolve();
          }
          var translatedLocales = existingTranslationLocaleKeys(existingPaths, rootDir, formPath);
          var out = [];
          activeCodes.forEach(function (loc) {
            if (translationLocaleAlreadyPresent(translatedLocales, loc)) return;
            var targetPath = pathForTargetLocale(rootDir, loc, effSuffix);
            var meta = activeMeta[lk] || {
              label: loc,
              flag: flagForLocaleCode(loc)
            };
            out.push({
              locale: loc,
              label: meta.label,
              flag: meta.flag || "\uD83C\uDF10",
              targetPath: targetPath,
              exists: false
            });
          });
          setOptions(out);
          return Promise.resolve();
        }
        return fetchTranslationConfig(studioBase, siteId).then(function (fetched) {
          var rawCodes = fetched && fetched.codes && fetched.codes.length ? fetched.codes : translationCfgProp && translationCfgProp.codes && translationCfgProp.codes.length ? translationCfgProp.codes : localeCodes && localeCodes.length ? localeCodes : MULTI_LOCALE_CODES;
          var activeMeta = fetched && fetched.meta || translationCfgProp && translationCfgProp.meta || localeMeta;
          return applyCodes(activeMeta, rawCodes);
        })["catch"](function () {
          var rawCodes = translationCfgProp && translationCfgProp.codes && translationCfgProp.codes.length ? translationCfgProp.codes : localeCodes && localeCodes.length ? localeCodes : MULTI_LOCALE_CODES;
          var activeMeta = translationCfgProp && translationCfgProp.meta || localeMeta;
          return applyCodes(activeMeta, rawCodes);
        })["finally"](function () {
          setLoading(false);
        });
      }, [formPath, siteId, rootDir, suffix, existingPaths, localeCodes, localeMeta, translationCfgProp]);
      React.useEffect(function () {
        loadTargets();
      }, [loadTargets]);
      var runTranslate = function runTranslate() {
        if (copyBusy || !selected || !dispatch || !formPath) return;
        var choice = null;
        for (var i = 0; i < options.length; i++) {
          if (options[i].locale === selected) {
            choice = options[i];
            break;
          }
        }
        if (!choice) return;
        if (choice.exists) {
          notifyDispatch(dispatch, "A translation already exists at " + choice.targetPath);
          return;
        }
        setCopyBusy(true);
        var parent = parentFolderPathForCopy(choice.targetPath);
        var contentApiBase = resolveAuthoringContentApiBase(authoringBase);
        return copyItemPasteStudio(contentApiBase, siteId, translateCopySourcePath, parent, choice.targetPath).then(function (res) {
          if (!res || !res.ok) {
            notifyDispatch(dispatch, res && res.message || "Translate failed.");
            setCopyBusy(false);
            return;
          }
          notifyDispatch(dispatch, "Translated to " + choice.label + ": " + choice.targetPath);
          setSelected("");
          openStudioEditForm(dispatch, siteId, choice.targetPath, authoringBase);
          if (typeof onTranslated === "function") {
            try {
              onTranslated();
            } catch (e1) {}
          }
          return loadTargets()["finally"](function () {
            setCopyBusy(false);
          });
        })["catch"](function () {
          notifyDispatch(dispatch, "Translate failed.");
          setCopyBusy(false);
        });
      };
      var effectiveMirroredSuffix = suffix != null ? suffix : rootDir && formPath ? parseSuffixFromFormPath(formPath, rootDir).suffix : null;
      var hint = "";
      if (!dispatch) hint = "Studio actions require an active session.";else if (!formPath || !siteId) hint = "Missing path or site.";else if (!rootDir || effectiveMirroredSuffix == null) hint = "Path layout does not support mirrored locale copy for this item.";else if (!resolveAuthoringContentApiBase(authoringBase)) hint = "Loading authoring context\u2026";else if (!loading && options.length === 0) hint = "All configured locales already have a translation at this path.";
      var selectDisabled = loading || copyBusy || options.length === 0 || !dispatch || !rootDir || effectiveMirroredSuffix == null || !resolveAuthoringContentApiBase(authoringBase);
      var selectStyle = {
        width: "100%",
        boxSizing: "border-box",
        minHeight: "42px",
        border: "1px solid " + (selectFocused && !selectDisabled ? "#3b82f6" : "#e2e8f0"),
        borderRadius: "10px",
        padding: "10px 14px",
        paddingRight: "44px",
        fontSize: "14px",
        lineHeight: 1.45,
        color: "#0f172a",
        backgroundColor: selectDisabled ? "#f8fafc" : "#ffffff",
        boxShadow: selectFocused && !selectDisabled ? "0 0 0 3px rgba(59, 130, 246, 0.2)" : "inset 0 1px 2px rgba(15, 23, 42, 0.04)",
        outline: "none",
        cursor: selectDisabled ? "not-allowed" : "pointer",
        opacity: selectDisabled ? 0.88 : 1,
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundImage: 'url("' + ADD_TRANSLATION_SELECT_CHEVRON + '")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        backgroundSize: "20px 20px",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease"
      };
      var actionsRowStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        padding: "14px 16px",
        borderRadius: "10px",
        border: "1px solid #e8eaed",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
        boxSizing: "border-box"
      };
      var selectWrapStyle = {
        flex: "1 1 220px",
        minWidth: "200px",
        maxWidth: "100%"
      };
      var btnIconStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        padding: 0,
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        color: "#475569",
        cursor: copyBusy || loading ? "not-allowed" : "pointer",
        fontSize: "20px",
        lineHeight: 1,
        flexShrink: 0,
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        transition: "background 0.15s ease, border-color 0.15s ease"
      };
      var btnPrimaryStyle = {
        padding: "11px 20px",
        borderRadius: "10px",
        border: "none",
        background: copyBusy || !selected || !dispatch ? "#94a3b8" : "#2563eb",
        color: "#ffffff",
        fontWeight: 600,
        fontSize: "13px",
        letterSpacing: "0.02em",
        cursor: copyBusy || !selected || !dispatch ? "not-allowed" : "pointer",
        flexShrink: 0,
        boxShadow: copyBusy || !selected || !dispatch ? "none" : "0 1px 2px rgba(37, 99, 235, 0.35)",
        transition: "background 0.15s ease, box-shadow 0.15s ease"
      };
      return React.createElement("div", {
        style: {
          width: "100%",
          marginTop: "8px"
        }
      }, React.createElement("div", {
        style: {
          fontSize: "13px",
          fontWeight: 600,
          color: "#212529",
          marginBottom: "8px"
        }
      }, "Translate"), hint ? React.createElement("div", {
        className: "text-muted",
        style: {
          fontSize: "12px",
          marginBottom: "10px",
          lineHeight: 1.45
        }
      }, hint) : null, React.createElement("div", {
        style: actionsRowStyle
      }, React.createElement("div", {
        style: selectWrapStyle
      }, React.createElement("select", {
        style: selectStyle,
        disabled: selectDisabled,
        value: selected,
        onChange: function onChange(e) {
          setSelected(e.target.value);
        },
        onFocus: function onFocus() {
          setSelectFocused(true);
        },
        onBlur: function onBlur() {
          setSelectFocused(false);
        },
        "aria-label": "Target locale for translation"
      }, React.createElement("option", {
        value: ""
      }, loading ? "Loading\u2026" : options.length === 0 ? "\u2014" : "Choose locale\u2026"), options.map(function (o) {
        return React.createElement("option", {
          key: o.locale,
          value: o.locale
        }, o.flag + " " + o.label + " (" + o.locale + ")");
      }))), React.createElement("button", {
        type: "button",
        disabled: copyBusy || loading,
        onClick: function onClick() {
          loadTargets();
        },
        title: "Reload locale list",
        style: btnIconStyle
      }, "\u21BB"), React.createElement("button", {
        type: "button",
        disabled: copyBusy || !selected || !dispatch,
        style: btnPrimaryStyle,
        onClick: function onClick() {
          runTranslate();
        }
      }, "Translate")));
    }
    var PILL_STYLES = {
      base: {
        display: "inline-block",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "999px",
        lineHeight: 1.3
      },
      source: {
        background: "#e8f1ff",
        color: "#0d4ea6",
        border: "1px solid #b6d4fe"
      },
      current: {
        background: "#f6ffed",
        color: "#237804",
        border: "1px solid #b7eb8f"
      }
    };
    var ROW_SURFACE = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "6px 10px",
      borderRadius: "6px",
      border: "1px solid #e0e0e0",
      marginBottom: "6px",
      background: "#f9f9f9"
    };
    var MENU_TRIGGER_STYLE = {
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      padding: "4px 8px",
      minWidth: "32px",
      fontSize: "16px",
      lineHeight: 1,
      color: "#444",
      cursor: "pointer"
    };

    /** Studio 4.4 mega menu doesn't honor includeOnly; enforce a whitelist after open. */
    function enforceAllowedItemsInOpenMegaMenu(hideEdit) {
      if (typeof document === "undefined") return;
      var allowedLabels = hideEdit ? {
        "delete": 1,
        "view form": 1,
        unlock: 1,
        history: 1,
        dependencies: 1
      } : {
        edit: 1,
        "delete": 1,
        "view form": 1,
        unlock: 1,
        history: 1,
        dependencies: 1
      };
      var nodes = document.querySelectorAll("li[role='menuitem'], .MuiMenuItem-root");
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var txt = (n.textContent || "").trim().toLowerCase();
        if (!allowedLabels[txt]) {
          n.style.display = "none";
        }
      }
    }
    function scheduleEnforceAllowedItemsInMegaMenu(hideEdit) {
      enforceAllowedItemsInOpenMegaMenu(hideEdit);
      setTimeout(function () {
        enforceAllowedItemsInOpenMegaMenu(hideEdit);
      }, 0);
      setTimeout(function () {
        enforceAllowedItemsInOpenMegaMenu(hideEdit);
      }, 60);
      setTimeout(function () {
        enforceAllowedItemsInOpenMegaMenu(hideEdit);
      }, 160);
    }
    function TranslationVersionRow(props) {
      var meta = props.meta;
      var isSource = props.isSource;
      var exists = props.exists !== false;
      var targetPath = props.targetPath;
      var dispatch = props.dispatch;
      var isOutdated = !!props.isOutdated;
      var onTranslate = props.onTranslate;
      var showRemoveTranslation = !!props.showRemoveTranslation;
      var onRemoveTranslation = props.onRemoveTranslation;
      var formPath = props.formPath || "";
      var isCurrentRow = formPath && targetPath && normalizeStudioPath(formPath) === normalizeStudioPath(targetPath);
      var isCompareSelected = !!props.isCompareSelected;
      var rowClickable = !!isSource && !isCurrentRow && exists;
      var rowStyle = Object.assign({}, ROW_SURFACE);
      if (isCompareSelected) {
        rowStyle = Object.assign({}, rowStyle, {
          borderColor: "#2563eb",
          boxShadow: "0 0 0 1px rgba(37, 99, 235, 0.45) inset",
          background: "#f8fafc"
        });
      }
      if (rowClickable) {
        rowStyle = Object.assign({}, rowStyle, {
          cursor: "pointer"
        });
      }
      var showStudioItemMegaMenu = function showStudioItemMegaMenu(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!dispatch || !targetPath) return;
        var top = typeof event.clientY === "number" ? event.clientY : 0;
        var left = typeof event.clientX === "number" ? event.clientX : 0;
        dispatch({
          type: "SHOW_ITEM_MEGA_MENU",
          payload: {
            path: targetPath,
            anchorReference: "anchorPosition",
            anchorPosition: {
              top: top,
              left: left
            }
          }
        });
        scheduleEnforceAllowedItemsInMegaMenu(isCurrentRow);
      };
      return React.createElement("div", {
        className: "translation-versions-row",
        style: rowStyle,
        onClick: function onClick() {
          if (typeof props.onActivate === "function") {
            props.onActivate({
              targetPath: targetPath,
              isSource: !!isSource,
              isCurrentRow: !!isCurrentRow
            });
          }
        },
        role: rowClickable ? "button" : undefined,
        tabIndex: rowClickable ? 0 : undefined,
        onKeyDown: rowClickable ? function (ev) {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            if (typeof props.onActivate === "function") {
              props.onActivate({
                targetPath: targetPath,
                isSource: !!isSource,
                isCurrentRow: !!isCurrentRow
              });
            }
          }
        } : undefined,
        title: rowClickable ? "Show source fields (read-only) next to this form" : undefined
      }, React.createElement("span", {
        style: {
          fontSize: "1.15rem",
          lineHeight: 1
        },
        "aria-hidden": true
      }, meta.flag), React.createElement("span", {
        style: {
          fontWeight: 600,
          minWidth: "72px",
          fontSize: "13px",
          color: "#212529"
        }
      }, meta.label), React.createElement("span", {
        style: {
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
          flex: 1
        }
      }, isSource ? React.createElement("span", {
        style: Object.assign({}, PILL_STYLES.base, PILL_STYLES.source)
      }, "Source") : null, isOutdated ? React.createElement("span", {
        style: Object.assign({}, PILL_STYLES.base, {
          background: "#fff7e6",
          color: "#ad6800",
          border: "1px solid #ffd591"
        }),
        title: "Outdated translation"
      }, "\uD83D\uDEA9 Outdated") : null, isCurrentRow ? React.createElement("span", {
        style: Object.assign({}, PILL_STYLES.base, PILL_STYLES.current),
        title: "This is the item you have open in the form"
      }, "Current") : null), React.createElement("div", {
        style: {
          marginLeft: "auto",
          flexShrink: 0,
          display: "flex",
          gap: "6px",
          alignItems: "center"
        }
      }, exists ? React.createElement("span", {
        style: {
          display: "inline-flex",
          gap: "6px",
          alignItems: "center"
        }
      }, showRemoveTranslation ? React.createElement("button", {
        type: "button",
        className: "btn btn-danger btn-xs",
        onClick: function onClick(ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (typeof onRemoveTranslation === "function") {
            onRemoveTranslation(targetPath, meta);
          }
        },
        "aria-label": "Remove translation for " + meta.label,
        title: "Remove this translated page (optional shared components with no other page references)",
        style: {
          whiteSpace: "nowrap"
        }
      }, "Remove") : null, React.createElement("button", {
        type: "button",
        className: "btn btn-sm",
        onClick: showStudioItemMegaMenu,
        "aria-haspopup": "true",
        "aria-label": (isCurrentRow ? "Options (editing this item — Edit hidden) " : "Options for ") + meta.label,
        title: isCurrentRow ? "Open item menu (Edit is hidden while this form is open for this path)" : "Item actions",
        style: MENU_TRIGGER_STYLE
      }, "\u22EE")) : React.createElement("button", {
        type: "button",
        className: "btn btn-primary btn-xs",
        onClick: function onClick(ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (typeof onTranslate === "function") {
            onTranslate(targetPath, meta);
          }
        },
        "aria-label": "Translate to " + meta.label
      }, "Translate")));
    }
    function TranslationVersionsPanel(props) {
      var formPath = props.formPath;
      var siteId = props.siteId;
      var model = props.model || {};
      var form = props.form;
      var controlContainerEl = props.controlContainerEl;
      var resolvedContentTypeId = String(props.contentTypeId || model["content-type"] || model.contentType || "").trim();
      var sourceLocale = model.sourceLocaleCode_s && String(model.sourceLocaleCode_s).trim().toLowerCase() || "";
      var modelLocale = model.localeCode_s && String(model.localeCode_s).trim().toLowerCase() || "";
      var pathLocale = getLocaleFromPath(formPath) || "";

      // Source indicator is data-driven only from XML sourceLocaleCode_s.
      // If missing, do not mark any row as source.
      var resolvedSource = sourceLocale;
      var resolvedSourceKey = String(resolvedSource || "").toLowerCase();
      var rootDir = getMultiLocaleRootDir(formPath);
      var authoringBaseState = React.useState("");
      var authoringBase = authoringBaseState[0];
      var setAuthoringBase = authoringBaseState[1];
      var pathsState = React.useState([]);
      var translationPaths = pathsState[0];
      var setTranslationPaths = pathsState[1];
      var loadingState = React.useState(true);
      var loading = loadingState[0];
      var setLoading = loadingState[1];
      var filterState = React.useState("");
      var filterQuery = filterState[0];
      var setFilterQuery = filterState[1];
      var pageState = React.useState(0);
      var pageIndex = pageState[0];
      var setPageIndex = pageState[1];
      var listRefreshSt = React.useState(0);
      var translationListRefreshKey = listRefreshSt[0];
      var bumpTranslationList = listRefreshSt[1];
      var translationCfgSt = React.useState(null);
      var translationCfg = translationCfgSt[0];
      var setTranslationCfg = translationCfgSt[1];
      var staleByPathSt = React.useState({});
      var staleByPath = staleByPathSt[0];
      var setStaleByPath = staleByPathSt[1];
      var existsByPathSt = React.useState({});
      var existsByPath = existsByPathSt[0];
      var setExistsByPath = existsByPathSt[1];
      var comparePathSt = React.useState(null);
      var compareSourcePath = comparePathSt[0];
      var setCompareSourcePath = comparePathSt[1];
      var removeModalSt = React.useState(null);
      var removeModal = removeModalSt[0];
      var setRemoveModal = removeModalSt[1];
      var collapsedSt = React.useState(function () {
        return readTranslationWidgetCollapsed(siteId);
      });
      var widgetCollapsed = collapsedSt[0];
      var setWidgetCollapsed = collapsedSt[1];
      React.useEffect(function () {
        setWidgetCollapsed(readTranslationWidgetCollapsed(siteId));
      }, [siteId]);
      React.useEffect(function () {
        function onStorage(e) {
          if (!e || e.key !== translationWidgetCollapseStorageKey(siteId)) {
            return;
          }
          var nextCollapsed = e.newValue === "1";
          setWidgetCollapsed(nextCollapsed);
          if (nextCollapsed) {
            setCompareSourcePath(null);
          }
        }
        function onCustom(e) {
          var detail = e && e.detail;
          if (!detail || String(detail.siteId || "") !== String(siteId || "")) {
            return;
          }
          var nextCollapsed = !!detail.collapsed;
          setWidgetCollapsed(nextCollapsed);
          if (nextCollapsed) {
            setCompareSourcePath(null);
          }
        }
        window.addEventListener("storage", onStorage);
        window.addEventListener(TRANSLATION_WIDGET_COLLAPSE_EVENT, onCustom);
        return function () {
          window.removeEventListener("storage", onStorage);
          window.removeEventListener(TRANSLATION_WIDGET_COLLAPSE_EVENT, onCustom);
        };
      }, [siteId]);
      var toggleWidgetCollapsed = function toggleWidgetCollapsed() {
        setWidgetCollapsed(function (prev) {
          var next = !prev;
          writeTranslationWidgetCollapsed(siteId, next);
          if (next) {
            setCompareSourcePath(null);
          }
          return next;
        });
      };
      var suffix = parseSuffixFromFormPath(formPath, rootDir).suffix;
      var currentLocale = (pathLocale || modelLocale || "").toLowerCase();
      React.useEffect(function () {
        setPageIndex(0);
      }, [translationPaths, filterQuery]);
      React.useEffect(function () {
        setCompareSourcePath(null);
      }, [formPath]);
      React.useEffect(function () {
        var active = true;
        fetchTranslationConfig(resolveAuthoringContentApiBase(authoringBase), siteId).then(function (cfg) {
          if (active) setTranslationCfg(cfg);
        });
        return function () {
          active = false;
        };
      }, [authoringBase, siteId]);
      React.useEffect(function () {
        var cancelled = false;
        var ab = getAuthoringBase();
        setAuthoringBase(ab);
        function finish(list) {
          if (!cancelled) {
            setTranslationPaths(list);
            setLoading(false);
          }
        }
        if (!siteId || !formPath) {
          finish([]);
          return function () {
            cancelled = true;
          };
        }
        setLoading(true);
        var studioBase = getStudioApiBase();
        var lsid = model.localeSourceId_s && String(model.localeSourceId_s).trim();
        var oid = model.objectId && String(model.objectId).trim();
        var ctype = resolvedContentTypeId;
        var cur = (currentLocale || "").toLowerCase();
        var pathOkForLocaleProbe = Boolean(rootDir && suffix != null);
        function runFallback() {
          var base = ab || getAuthoringBase();
          if (!base) {
            mergePathsAndFinish([formPath]);
            return;
          }
          if (!pathOkForLocaleProbe) {
            mergePathsAndFinish([formPath]);
            return;
          }
          Promise.all((translationCfg && translationCfg.codes || MULTI_LOCALE_CODES).map(function (loc) {
            var p = pathForTargetLocale(rootDir, loc, suffix);
            return contentExists(base, siteId, p).then(function (ok) {
              if (ok) return p;
              if (cur && localeSegmentsCompatible(cur, loc)) return p;
              return null;
            });
          })).then(function (results) {
            if (cancelled) return;
            var m = {};
            results.forEach(function (p) {
              if (p) m[p] = true;
            });
            if (formPath) {
              m[formPath] = true;
            }
            finish(sortTranslationPathsForDisplay(Object.keys(m), resolvedSourceKey));
          })["catch"](function () {
            mergePathsAndFinish([formPath]);
          });
        }

        /**
         * Rows = translated copies only: sibling/index paths plus on-disk paths for configured locales.
         * Do not add config locale paths unless content exists (missing locales belong in Translate dropdown only).
         */
        function mergePathsAndFinish(paths) {
          if (cancelled) return;
          var m = {};
          (paths || []).forEach(function (p) {
            if (p) m[p] = true;
          });
          if (formPath) {
            m[formPath] = true;
          }
          function applyMap() {
            if (cancelled) return;
            finish(sortTranslationPathsForDisplay(Object.keys(m), resolvedSourceKey));
          }
          var base = ab || getAuthoringBase();
          var cfgCodes = translationCfg && translationCfg.codes && translationCfg.codes.length ? translationCfg.codes : MULTI_LOCALE_CODES;
          if (base && siteId && rootDir != null && suffix != null && cfgCodes.length) {
            Promise.all(cfgCodes.map(function (code) {
              var p = pathForTargetLocale(rootDir, code, suffix);
              return contentExists(base, siteId, p).then(function (ok) {
                return ok ? p : null;
              });
            })).then(function (found) {
              if (cancelled) return;
              (found || []).forEach(function (p) {
                if (p) m[p] = true;
              });
              applyMap();
            })["catch"](function () {
              applyMap();
            });
          } else {
            applyMap();
          }
        }

        /** Preview OpenSearch plugin: same content-type + lineage (localeSourceId_s or objectId on hits). */
        if (ctype && (lsid || oid) && studioBase) {
          fetchTranslationSiblingsFromPlugin(studioBase, siteId, ctype, lsid, oid).then(function (paths) {
            if (cancelled) return;
            if (paths && paths.length > 0) {
              mergePathsAndFinish(paths);
              return;
            }
            if (lsid) {
              return searchPathsByLocaleSourceId(studioBase, siteId, lsid).then(function (legacyPaths) {
                if (cancelled) return;
                if (legacyPaths && legacyPaths.length > 0) {
                  mergePathsAndFinish(legacyPaths);
                } else {
                  runFallback();
                }
              });
            }
            runFallback();
          })["catch"](function () {
            if (cancelled) return;
            if (lsid && studioBase) {
              searchPathsByLocaleSourceId(studioBase, siteId, lsid).then(function (legacyPaths) {
                if (cancelled) return;
                if (legacyPaths && legacyPaths.length > 0) {
                  mergePathsAndFinish(legacyPaths);
                } else {
                  runFallback();
                }
              })["catch"](function () {
                runFallback();
              });
            } else {
              runFallback();
            }
          });
        } else if (lsid && studioBase) {
          searchPathsByLocaleSourceId(studioBase, siteId, lsid).then(function (paths) {
            if (cancelled) return;
            if (!paths || paths.length === 0) {
              runFallback();
              return;
            }
            mergePathsAndFinish(paths);
          })["catch"](function () {
            runFallback();
          });
        } else {
          runFallback();
        }
        return function () {
          cancelled = true;
        };
      }, [formPath, siteId, rootDir, suffix, model.localeSourceId_s, model.objectId, resolvedContentTypeId, currentLocale, translationListRefreshKey, translationCfg]);
      React.useEffect(function () {
        var cancelled = false;
        var base = authoringBase || getAuthoringBase();
        if (!siteId || !base || !translationPaths || translationPaths.length === 0) {
          setStaleByPath({});
          return function () {
            cancelled = true;
          };
        }
        var sourcePath = translationPaths.find(function (p) {
          var loc = (getLocaleFromPath(p) || "").toLowerCase();
          return resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
        }) || formPath;
        Promise.all([getItemModifiedTimestamp(base, siteId, sourcePath)].concat(translationPaths.map(function (p) {
          return getItemModifiedTimestamp(base, siteId, p);
        }))).then(function (arr) {
          if (cancelled) return;
          var sourceMs = arr[0];
          var map = {};
          translationPaths.forEach(function (p, i) {
            var targetMs = arr[i + 1];
            var loc = (getLocaleFromPath(p) || "").toLowerCase();
            var isSource = resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
            map[p] = !isSource && sourceMs != null && targetMs != null && Number(targetMs) < Number(sourceMs);
          });
          setStaleByPath(map);
        })["catch"](function () {
          if (!cancelled) setStaleByPath({});
        });
        return function () {
          cancelled = true;
        };
      }, [authoringBase, siteId, translationPaths, resolvedSourceKey, formPath]);
      React.useEffect(function () {
        var cancelled = false;
        var base = authoringBase || getAuthoringBase();
        if (!siteId || !base || !translationPaths || translationPaths.length === 0) {
          setExistsByPath({});
          return function () {
            cancelled = true;
          };
        }
        Promise.all(translationPaths.map(function (p) {
          return contentExists(base, siteId, p).then(function (ok) {
            return [p, !!ok];
          });
        })).then(function (pairs) {
          if (cancelled) return;
          var map = {};
          pairs.forEach(function (row) {
            map[row[0]] = row[1];
          });
          setExistsByPath(map);
        })["catch"](function () {
          if (!cancelled) setExistsByPath({});
        });
        return function () {
          cancelled = true;
        };
      }, [authoringBase, siteId, translationPaths]);
      React.useEffect(function () {
        function onCloseCompare() {
          setCompareSourcePath(null);
        }
        window.addEventListener("translation:close-source-compare", onCloseCompare);
        return function () {
          window.removeEventListener("translation:close-source-compare", onCloseCompare);
        };
      }, []);
      React.useEffect(function () {
        if (!siteId || !formPath || !form || !controlContainerEl) {
          return function () {};
        }
        var base = authoringBase || getAuthoringBase();
        var src = buildLegacyReadonlyFormSrc(base, siteId, compareSourcePath || "");
        var host = findFormFieldsCompareHost(form, controlContainerEl);
        if (!host) {
          return function () {};
        }
        if (widgetCollapsed || !compareSourcePath || !src) {
          unwrapFormCompareLayout(host);
          return function () {
            unwrapFormCompareLayout(host);
          };
        }
        wrapFormCompareLayout(host, src, compareSourcePath);
        return function () {
          unwrapFormCompareLayout(host);
        };
      }, [compareSourcePath, authoringBase, siteId, formPath, form, controlContainerEl, widgetCollapsed]);
      if (!siteId || !formPath) {
        return React.createElement("div", {
          className: "help-block",
          style: {
            marginTop: 0
          }
        }, "Save the item and open it from the content tree to see translation versions.");
      }
      var dispatch = getDispatch();
      var translateCopySourcePath = resolveTranslateCopySourcePath(translationCfg, rootDir, suffix, translationPaths, formPath, resolvedSourceKey);
      var closeRemoveTranslationModal = function closeRemoveTranslationModal() {
        setRemoveModal(null);
      };
      var openRemoveTranslationModal = function openRemoveTranslationModal(targetPath, meta) {
        if (!siteId || !targetPath) return;
        var tp = targetPath;
        setRemoveModal({
          pagePath: tp,
          metaLabel: meta && meta.label || tp,
          loading: true,
          error: null,
          candidates: [],
          selectedPaths: {},
          submitting: false
        });
        var sb = getStudioApiBase();
        fetchTranslationRemoveCandidates(sb, siteId, tp).then(function (res) {
          if (!res || !res.ok) {
            setRemoveModal(function (prev) {
              if (!prev || normalizeStudioPath(prev.pagePath) !== normalizeStudioPath(tp)) return prev;
              return Object.assign({}, prev, {
                loading: false,
                error: res && res.message || "Could not load removable components."
              });
            });
            return;
          }
          var list = res.candidates || [];
          var sel = {};
          for (var i = 0; i < list.length; i++) {
            var c = list[i];
            if (c && c.path) sel[c.path] = true;
          }
          setRemoveModal(function (prev) {
            if (!prev || normalizeStudioPath(prev.pagePath) !== normalizeStudioPath(tp)) return prev;
            return Object.assign({}, prev, {
              loading: false,
              candidates: list,
              selectedPaths: sel,
              error: null
            });
          });
        })["catch"](function () {
          setRemoveModal(function (prev) {
            if (!prev || normalizeStudioPath(prev.pagePath) !== normalizeStudioPath(tp)) return prev;
            return Object.assign({}, prev, {
              loading: false,
              error: "Network error loading candidates."
            });
          });
        });
      };
      var toggleRemoveCandidate = function toggleRemoveCandidate(path, checked) {
        setRemoveModal(function (prev) {
          if (!prev || prev.loading || prev.submitting) return prev;
          var nextSel = Object.assign({}, prev.selectedPaths || {});
          nextSel[path] = !!checked;
          return Object.assign({}, prev, {
            selectedPaths: nextSel
          });
        });
      };
      var setAllRemoveCandidates = function setAllRemoveCandidates(value) {
        setRemoveModal(function (prev) {
          if (!prev || prev.loading || prev.submitting) return prev;
          var nextSel = {};
          (prev.candidates || []).forEach(function (c) {
            if (c && c.path) nextSel[c.path] = !!value;
          });
          return Object.assign({}, prev, {
            selectedPaths: nextSel
          });
        });
      };
      var confirmRemoveTranslation = function confirmRemoveTranslation() {
        if (!removeModal || removeModal.loading || removeModal.submitting) return;
        var sb = getStudioApiBase();
        if (!sb || !siteId) {
          notifyDispatch(dispatch, "Studio API base or site is missing.");
          return;
        }
        var pagePath = removeModal.pagePath;
        var sel = removeModal.selectedPaths || {};
        var paths = [];
        Object.keys(sel).forEach(function (p) {
          if (sel[p]) paths.push(p);
        });
        setRemoveModal(function (prev) {
          return prev ? Object.assign({}, prev, {
            submitting: true,
            error: null
          }) : prev;
        });
        postTranslationRemove(sb, siteId, pagePath, paths, true).then(function (res) {
          var deleted = res && res.deleted || [];
          var failed = res && res.failed || [];
          var deletedPage = deleted.some(function (p) {
            return normalizeStudioPath(p) === normalizeStudioPath(pagePath);
          });
          if (failed.length) {
            var msg = "Remove finished with errors: " + failed.map(function (f) {
              return (f && f.path) + (f && f.message ? " (" + f.message + ")" : "");
            }).join("; ");
            notifyDispatch(dispatch, msg);
          } else {
            notifyDispatch(dispatch, "Removed translation" + (deleted.length ? " (" + deleted.length + " item(s))." : "."));
          }
          bumpTranslationList(function (n) {
            return n + 1;
          });
          closeRemoveTranslationModal();
          if (deletedPage && formPath && normalizeStudioPath(formPath) === normalizeStudioPath(pagePath)) {
            try {
              dispatch({
                type: "DISPATCH_DOM_EVENT",
                payload: {
                  id: "editDialogSuccess"
                }
              });
            } catch (e1) {}
            notifyDispatch(dispatch, "The page you had open was deleted. Close or refresh this dialog if it is still shown.");
          }
        })["catch"](function () {
          setRemoveModal(function (prev) {
            return prev ? Object.assign({}, prev, {
              submitting: false,
              error: "Network error while deleting."
            }) : prev;
          });
          notifyDispatch(dispatch, "Remove translation failed (network).");
        });
      };
      var runTranslateForRow = function runTranslateForRow(targetPath, meta) {
        if (!dispatch || !resolveAuthoringContentApiBase(authoringBase) || !siteId || !translateCopySourcePath || !targetPath) {
          return;
        }
        var parent = parentFolderPathForCopy(targetPath);
        var contentApiBase = resolveAuthoringContentApiBase(authoringBase);
        copyItemPasteStudio(contentApiBase, siteId, translateCopySourcePath, parent, targetPath).then(function (res) {
          if (!res || !res.ok) {
            notifyDispatch(dispatch, res && res.message || "Translate failed.");
            return;
          }
          notifyDispatch(dispatch, "Translated to " + meta.label + ": " + targetPath);
          bumpTranslationList(function (n) {
            return n + 1;
          });
          openStudioEditForm(dispatch, siteId, targetPath, authoringBase || getAuthoringBase());
        })["catch"](function () {
          notifyDispatch(dispatch, "Translate failed.");
        });
      };
      var pathLayoutNote = !rootDir || suffix == null ? React.createElement("div", {
        className: "text-muted",
        style: {
          fontSize: "12px",
          marginTop: "4px",
          maxWidth: "520px",
          lineHeight: 1.45
        }
      }, "Translation locale shortcuts work best when this item lives under a path like ", React.createElement("code", null, "/site/…/website/{locale}/…"), " or ", React.createElement("code", null, "/site/…/components/{locale}/…"), ". Related translations may still appear from the search index above.") : null;
      var sortedPaths = sortTranslationPathsForDisplay(translationPaths, resolvedSourceKey);
      var filteredPaths = filterTranslationPaths(sortedPaths, filterQuery);
      /** List rows only for locales that have content (or this form); missing locales appear under Translate only. */
      var translatedOnlyPaths = filteredPaths.filter(function (p) {
        if (!p) return false;
        if (p === formPath) return true;
        var ex = existsByPath[p];
        if (ex === false) return false;
        return true;
      });
      var activeLocaleMeta = translationCfg && translationCfg.meta || LOCALE_META;
      var totalFiltered = translatedOnlyPaths.length;
      var totalPages = Math.max(1, Math.ceil(totalFiltered / TRANSLATIONS_PAGE_SIZE));
      var safePage = Math.min(pageIndex, totalPages - 1);
      var pageStart = safePage * TRANSLATIONS_PAGE_SIZE;
      var pageSlice = translatedOnlyPaths.slice(pageStart, pageStart + TRANSLATIONS_PAGE_SIZE);
      var rangeFrom = totalFiltered === 0 ? 0 : pageStart + 1;
      var rangeTo = Math.min(pageStart + TRANSLATIONS_PAGE_SIZE, totalFiltered);
      var filterToolbar = React.createElement("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px"
        }
      }, React.createElement("input", {
        type: "text",
        className: "form-control input-sm",
        placeholder: "Filter by language, code, or path\u2026",
        value: filterQuery,
        onChange: function onChange(e) {
          setFilterQuery(e.target.value);
        },
        style: {
          maxWidth: "280px",
          flex: "1 1 180px"
        },
        "aria-label": "Filter translations"
      }), totalFiltered > 0 ? React.createElement("span", {
        className: "text-muted",
        style: {
          fontSize: "12px",
          whiteSpace: "nowrap"
        }
      }, "Showing ", rangeFrom, "\u2013", rangeTo, " of ", totalFiltered) : null);
      var paginationBar = totalFiltered > TRANSLATIONS_PAGE_SIZE ? React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "8px",
          flexWrap: "wrap"
        }
      }, React.createElement("button", {
        type: "button",
        className: "btn btn-default btn-xs",
        disabled: safePage <= 0,
        onClick: function onClick() {
          setPageIndex(Math.max(0, safePage - 1));
        }
      }, "Previous"), React.createElement("span", {
        className: "text-muted",
        style: {
          fontSize: "12px"
        }
      }, "Page ", safePage + 1, " / ", totalPages), React.createElement("button", {
        type: "button",
        className: "btn btn-default btn-xs",
        disabled: safePage >= totalPages - 1,
        onClick: function onClick() {
          setPageIndex(Math.min(totalPages - 1, safePage + 1));
        }
      }, "Next")) : null;
      var onTranslationRowActivate = function onTranslationRowActivate(info) {
        if (info && info.isSource && !info.isCurrentRow && info.targetPath) {
          setCompareSourcePath(function (prev) {
            if (prev && normalizeStudioPath(prev) === normalizeStudioPath(info.targetPath)) {
              return null;
            }
            return info.targetPath;
          });
          return;
        }
        setCompareSourcePath(null);
      };
      var listSection = loading && translationPaths.length === 0 ? React.createElement("div", {
        className: "text-muted",
        style: {
          fontSize: "13px",
          padding: "4px 0 8px"
        }
      }, "Loading translations\u2026") : translationPaths.length === 0 ? React.createElement("div", {
        className: "text-muted",
        style: {
          fontSize: "13px",
          padding: "4px 0 8px"
        }
      }, "No translations found.") : React.createElement("div", {
        style: {
          opacity: loading ? 0.9 : 1
        }
      }, filterToolbar, pageSlice.length === 0 ? React.createElement("div", {
        className: "text-muted",
        style: {
          fontSize: "13px",
          padding: "6px 0"
        }
      }, totalFiltered === 0 && filteredPaths.length > 0 ? "No translated locales match your filter (untranslated locales are in Translate below)." : "No translations match your filter.") : pageSlice.map(function (targetPath) {
        var loc = (getLocaleFromPath(targetPath) || "unknown").toLowerCase();
        var meta = metaForPathLocale(activeLocaleMeta, loc) || {
          label: loc,
          flag: "\uD83C\uDF10"
        };
        var isSource = resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
        var exists = existsByPath[targetPath] !== false;
        var isCurrentRow = !!formPath && !!targetPath && normalizeStudioPath(formPath) === normalizeStudioPath(targetPath);
        return React.createElement(TranslationVersionRow, {
          key: targetPath,
          meta: meta,
          isSource: isSource,
          exists: exists,
          isOutdated: !!staleByPath[targetPath],
          targetPath: targetPath,
          dispatch: dispatch,
          onTranslate: runTranslateForRow,
          formPath: formPath,
          onActivate: onTranslationRowActivate,
          isCompareSelected: !!compareSourcePath && normalizeStudioPath(compareSourcePath) === normalizeStudioPath(targetPath),
          showRemoveTranslation: exists && !isSource && !isCurrentRow && isPageTranslationRow(targetPath, resolvedContentTypeId),
          onRemoveTranslation: openRemoveTranslationModal
        });
      }), paginationBar);
      var authoringBaseResolved = authoringBase || getAuthoringBase();
      var addTranslationBar = React.createElement(AddTranslationLocaleBar, {
        formPath: formPath,
        translateCopySourcePath: translateCopySourcePath,
        siteId: siteId,
        dispatch: dispatch,
        authoringBase: authoringBaseResolved,
        rootDir: rootDir,
        suffix: suffix,
        existingPaths: translationPaths,
        onTranslated: function onTranslated() {
          bumpTranslationList(function (n) {
            return n + 1;
          });
        },
        localeCodes: translationCfg && translationCfg.codes,
        localeMeta: translationCfg && translationCfg.meta,
        translationCfg: translationCfg
      });
      var compareLayoutBody = React.createElement("div", {
        style: {
          width: "100%",
          minWidth: 0
        }
      }, listSection, addTranslationBar);
      var removeTranslationModalEl = null;
      if (removeModal) {
        var rm = removeModal;
        var candidateRows = !rm.loading && rm.candidates && rm.candidates.length ? rm.candidates.map(function (c) {
          var pth = c.path;
          var checked = rm.selectedPaths && rm.selectedPaths[pth];
          return React.createElement("label", {
            key: pth,
            style: {
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #e8e8e8",
              marginBottom: "6px",
              cursor: rm.submitting ? "default" : "pointer",
              background: "#fafafa"
            }
          }, React.createElement("input", {
            type: "checkbox",
            checked: !!checked,
            disabled: !!rm.submitting,
            onChange: function onChange(e) {
              toggleRemoveCandidate(pth, e.target.checked);
            },
            style: {
              marginTop: "3px",
              flexShrink: 0
            }
          }), React.createElement("span", {
            style: {
              fontSize: "13px",
              lineHeight: 1.4,
              wordBreak: "break-all"
            }
          }, React.createElement("strong", {
            style: {
              display: "block",
              color: "#212529"
            }
          }, c.internalName && String(c.internalName).trim() || "(no internal name)"), React.createElement("code", {
            style: {
              fontSize: "12px",
              color: "#555"
            }
          }, pth)));
        }) : null;
        removeTranslationModalEl = React.createElement("div", {
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "translation-remove-translation-title",
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 10050,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxSizing: "border-box"
          },
          onClick: function onClick(e) {
            if (e.target === e.currentTarget && !rm.submitting) closeRemoveTranslationModal();
          }
        }, React.createElement("div", {
          style: {
            background: "#fff",
            borderRadius: "8px",
            maxWidth: "560px",
            width: "100%",
            maxHeight: "min(85vh, 680px)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
            overflow: "hidden"
          },
          onClick: function onClick(ev) {
            ev.stopPropagation();
          }
        }, React.createElement("div", {
          style: {
            padding: "14px 18px",
            borderBottom: "1px solid #eee",
            flexShrink: 0
          }
        }, React.createElement("h4", {
          id: "translation-remove-translation-title",
          style: {
            margin: 0,
            fontSize: "16px",
            fontWeight: 600
          }
        }, "Remove translation"), React.createElement("div", {
          className: "text-muted",
          style: {
            fontSize: "12px",
            marginTop: "6px",
            lineHeight: 1.45
          }
        }, React.createElement("span", null, rm.metaLabel), " — ", React.createElement("code", {
          style: {
            fontSize: "11px"
          }
        }, rm.pagePath))), React.createElement("div", {
          style: {
            padding: "12px 18px",
            overflowY: "auto",
            flex: "1 1 auto",
            minHeight: 0
          }
        }, rm.loading ? React.createElement("div", {
          className: "text-muted",
          style: {
            fontSize: "13px",
            padding: "8px 0"
          }
        }, "Finding locale-specific components only used by this page\u2026") : null, rm.error ? React.createElement("div", {
          className: "alert alert-danger",
          style: {
            fontSize: "13px",
            padding: "8px 12px",
            marginBottom: "10px"
          }
        }, rm.error) : null, !rm.loading && !rm.error && (!rm.candidates || !rm.candidates.length) ? React.createElement("p", {
          className: "text-muted",
          style: {
            fontSize: "13px",
            margin: "8px 0 12px"
          }
        }, "No shared components in this locale were found that are safe to delete automatically (they may be referenced elsewhere). The translated page can still be removed below.") : null, !rm.loading && rm.candidates && rm.candidates.length ? React.createElement("div", {
          style: {
            marginBottom: "10px"
          }
        }, React.createElement("div", {
          style: {
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "6px"
          }
        }, "Also delete these locale components (no other page references)"), React.createElement("div", {
          style: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "8px"
          }
        }, React.createElement("button", {
          type: "button",
          className: "btn btn-default btn-xs",
          disabled: !!rm.submitting,
          onClick: function onClick() {
            setAllRemoveCandidates(true);
          }
        }, "Select all"), React.createElement("button", {
          type: "button",
          className: "btn btn-default btn-xs",
          disabled: !!rm.submitting,
          onClick: function onClick() {
            setAllRemoveCandidates(false);
          }
        }, "Select none")), candidateRows) : null, React.createElement("p", {
          style: {
            fontSize: "12px",
            color: "#8c4a00",
            background: "#fffbe6",
            border: "1px solid #ffe58f",
            borderRadius: "4px",
            padding: "8px 10px",
            marginTop: "12px",
            marginBottom: 0
          }
        }, "The translated page will be deleted after the selected components. This cannot be undone.")), React.createElement("div", {
          style: {
            padding: "12px 18px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            flexShrink: 0
          }
        }, React.createElement("button", {
          type: "button",
          className: "btn btn-default btn-sm",
          disabled: !!rm.submitting,
          onClick: closeRemoveTranslationModal
        }, "Cancel"), React.createElement("button", {
          type: "button",
          className: "btn btn-danger btn-sm",
          disabled: !!rm.loading || !!rm.submitting,
          onClick: confirmRemoveTranslation
        }, rm.submitting ? "Removing\u2026" : "Remove translation"))));
      }
      return React.createElement("div", {
        className: "cstudio-form-control-input-container translation-versions-control"
      }, React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: widgetCollapsed ? "0" : "20px",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          background: "#fff",
          overflow: "hidden"
        }
      }, React.createElement("button", {
        type: "button",
        className: "translation-versions-collapse-toggle",
        onClick: toggleWidgetCollapsed,
        "aria-expanded": widgetCollapsed ? "false" : "true",
        "aria-controls": "translation-versions-panel-body",
        title: widgetCollapsed ? "Expand Translations" : "Collapse Translations",
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          margin: 0,
          padding: "10px 12px",
          border: "none",
          borderBottom: widgetCollapsed ? "none" : "1px solid #e9ecef",
          background: "#f8f9fa",
          cursor: "pointer",
          textAlign: "left",
          boxSizing: "border-box"
        }
      }, React.createElement("span", {
        "aria-hidden": "true",
        style: {
          display: "inline-flex",
          width: "18px",
          justifyContent: "center",
          fontSize: "12px",
          color: "#495057",
          flex: "0 0 auto",
          transform: widgetCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
          transition: "transform 0.15s ease"
        }
      }, "\u25BC"), React.createElement("span", {
        style: {
          flex: "1 1 auto",
          minWidth: 0,
          fontSize: "16px",
          fontWeight: 600,
          color: "#212529",
          letterSpacing: "-0.01em",
          lineHeight: 1.3
        }
      }, "Translations"), widgetCollapsed && totalFiltered > 0 ? React.createElement("span", {
        className: "text-muted",
        style: {
          fontSize: "12px",
          whiteSpace: "nowrap",
          flex: "0 0 auto"
        }
      }, totalFiltered + (totalFiltered === 1 ? " locale" : " locales")) : null, React.createElement("span", {
        className: "text-muted",
        style: {
          fontSize: "11px",
          whiteSpace: "nowrap",
          flex: "0 0 auto"
        }
      }, widgetCollapsed ? "Show" : "Hide")), widgetCollapsed ? null : React.createElement("div", {
        id: "translation-versions-panel-body",
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "20px",
          width: "100%",
          boxSizing: "border-box",
          padding: "12px"
        }
      }, pathLayoutNote ? React.createElement("div", null, pathLayoutNote) : null, React.createElement("div", {
        style: {
          width: "100%",
          minWidth: 0
        }
      }, compareLayoutBody))), removeTranslationModalEl);
    }
    CStudioForms.Controls.TranslationVersions = CStudioForms.Controls.TranslationVersions || function (id, form, owner, properties, constraints) {
      this.owner = owner;
      this.owner.registerField(this);
      this.errors = [];
      this.properties = properties;
      this.constraints = constraints;
      this.required = false;
      this.value = "_not-set";
      this.form = form;
      this.id = id;
      this.supportedPostFixes = [];
      return this;
    };
    YAHOO.extend(CStudioForms.Controls.TranslationVersions, CStudioForms.CStudioFormField, {
      /** Shown in the Content Types builder control palette (drag-and-drop list). */
      getLabel: function getLabel() {
        return "Translation versions (Translation)";
      },
      _render: function _render(self) {
        var cms = CrafterCMSNext;
        var site = typeof CStudioAuthoringContext !== "undefined" && CStudioAuthoringContext.site || self.form && self.form.site || "";
        var internalName = self.form.model && (self.form.model["internal-name"] || self.form.model.internalName) || "";
        var contentTypeId = self.form.model && (self.form.model["content-type"] || self.form.model.contentType) || "";
        var panelProps = {
          formPath: self.form.path,
          siteId: site,
          model: self.form.model,
          internalName: internalName,
          contentTypeId: contentTypeId,
          form: self.form,
          controlContainerEl: self.containerEl
        };
        if (self._cmsRenderHandle && self._cmsRenderHandle.unmount) {
          self._cmsRenderHandle.unmount({
            removeContainer: false
          });
          self._cmsRenderHandle = null;
        }
        cms.render(self.containerEl, function TranslationVersionsBridge(props) {
          return React.createElement(TranslationVersionsPanel, props);
        }, panelProps).then(function (handle) {
          self._cmsRenderHandle = handle;
          pinTranslationVersionsFieldToTopOfForm(self.form, self.containerEl);
        })["catch"](function (err) {
          console.error("[translation-versions] Failed to render control", err);
          self.containerEl.innerHTML = '<div class="alert alert-warning" style="margin:8px 0">Translation control could not load. Refresh Studio and check the browser console.</div>';
        });
      },
      render: function render(config, containerEl) {
        containerEl.id = this.id;
        this.containerEl = containerEl;
        this._render(this);
      },
      refresh: function refresh() {
        if (this.containerEl) {
          this._render(this);
        }
      },
      getValue: function getValue() {
        return this.value;
      },
      setValue: function setValue(value) {
        this.value = value;
      },
      getName: function getName() {
        return "translation-versions";
      },
      getSupportedProperties: function getSupportedProperties() {
        return [];
      },
      getSupportedConstraints: function getSupportedConstraints() {
        return [];
      },
      getSupportedPostFixes: function getSupportedPostFixes() {
        return this.supportedPostFixes;
      }
    });
    CStudioAuthoring.Module.moduleLoaded("translation-versions", CStudioForms.Controls.TranslationVersions);
  }
  (function () {
    if (typeof CrafterCMSNext !== "undefined" && CrafterCMSNext.React) {
      bootTranslationVersionsControl();
    } else {
      document.addEventListener("CrafterCMS.CodebaseBridgeReady", bootTranslationVersionsControl, {
        once: true
      });
    }
  })();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3BhY2thZ2VzL3RyYW5zbGF0aW9uLXZlcnNpb25zL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBib290VHJhbnNsYXRpb25WZXJzaW9uc0NvbnRyb2woKSB7XG4gIHZhciBSZWFjdCA9IENyYWZ0ZXJDTVNOZXh0LlJlYWN0O1xuXG4gIHZhciBSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyA9IHtcbiAgICB3ZWJzaXRlOiAxLFxuICAgIGNvbXBvbmVudHM6IDEsXG4gICAgXCJzdGF0aWMtYXNzZXRzXCI6IDEsXG4gICAgdGVtcGxhdGVzOiAxLFxuICAgIHNjcmlwdHM6IDEsXG4gICAgY29uZmlnOiAxXG4gIH07XG5cbiAgLyoqIEtlZXAgaW4gc3luYyB3aXRoIHRyYW5zbGF0aW9uLWNvbXBvbmVudHMgYGNvbmZpZy9tdWx0aUxvY2FsZUNvbmZpZy50c2AuICovXG4gIHZhciBCQVNFX0xPQ0FMRSA9IFwiZW5cIjtcbiAgdmFyIE1VTFRJX0xPQ0FMRV9DT0RFUyA9IFtcImFhXCIsXCJhYlwiLFwiYWRcIixcImFlXCIsXCJhZlwiLFwiYWdcIixcImFpXCIsXCJha1wiLFwiYWxcIixcImFtXCIsXCJhblwiLFwiYW9cIixcImFxXCIsXCJhclwiLFwiYXItYWVcIixcImFyLWJoXCIsXCJhci1kelwiLFwiYXItZWdcIixcImFyLWlxXCIsXCJhci1qb1wiLFwiYXIta3dcIixcImFyLWxiXCIsXCJhci1seVwiLFwiYXItbWFcIixcImFyLW9tXCIsXCJhci1xYVwiLFwiYXItc2FcIixcImFyLXN5XCIsXCJhci10blwiLFwiYXIteWVcIixcImFzXCIsXCJhdFwiLFwiYXVcIixcImF2XCIsXCJhd1wiLFwiYXhcIixcImF5XCIsXCJhelwiLFwiYmFcIixcImJiXCIsXCJiZFwiLFwiYmVcIixcImJmXCIsXCJiZ1wiLFwiYmhcIixcImJpXCIsXCJialwiLFwiYmxcIixcImJtXCIsXCJiblwiLFwiYm4tYmRcIixcImJuLWluXCIsXCJib1wiLFwiYnFcIixcImJyXCIsXCJic1wiLFwiYnRcIixcImJ2XCIsXCJid1wiLFwiYnlcIixcImJ6XCIsXCJjYVwiLFwiY2NcIixcImNkXCIsXCJjZVwiLFwiY2ZcIixcImNnXCIsXCJjaFwiLFwiY2lcIixcImNrXCIsXCJjbFwiLFwiY21cIixcImNuXCIsXCJjb1wiLFwiY29tbW9uXCIsXCJjclwiLFwiY3NcIixcImN1XCIsXCJjdlwiLFwiY3dcIixcImN4XCIsXCJjeVwiLFwiY3pcIixcImRhXCIsXCJkZVwiLFwiZGUtYXRcIixcImRlLWNoXCIsXCJkZS1kZVwiLFwiZGUtbGlcIixcImRlLWx1XCIsXCJkalwiLFwiZGtcIixcImRtXCIsXCJkb1wiLFwiZHZcIixcImR6XCIsXCJlY1wiLFwiZWVcIixcImVnXCIsXCJlaFwiLFwiZWxcIixcImVuXCIsXCJlbi1hdVwiLFwiZW4tYnpcIixcImVuLWNhXCIsXCJlbi1nYlwiLFwiZW4taGtcIixcImVuLWllXCIsXCJlbi1pblwiLFwiZW4tam1cIixcImVuLW15XCIsXCJlbi1uelwiLFwiZW4tcGhcIixcImVuLXNnXCIsXCJlbi10dFwiLFwiZW4tdXNcIixcImVuLXphXCIsXCJlbi16d1wiLFwiZW9cIixcImVyXCIsXCJlc1wiLFwiZXMtYXJcIixcImVzLWJvXCIsXCJlcy1jbFwiLFwiZXMtY29cIixcImVzLWNyXCIsXCJlcy1kb1wiLFwiZXMtZWNcIixcImVzLWVzXCIsXCJlcy1ndFwiLFwiZXMtaG5cIixcImVzLW14XCIsXCJlcy1uaVwiLFwiZXMtcGFcIixcImVzLXBlXCIsXCJlcy1wclwiLFwiZXMtcHlcIixcImVzLXN2XCIsXCJlcy11eVwiLFwiZXMtdmVcIixcImV0XCIsXCJldVwiLFwiZmFcIixcImZmXCIsXCJmaVwiLFwiZmpcIixcImZrXCIsXCJmbVwiLFwiZm9cIixcImZyXCIsXCJmci1iZVwiLFwiZnItY2FcIixcImZyLWNoXCIsXCJmci1mclwiLFwiZnItbHVcIixcImZyLW1jXCIsXCJmeVwiLFwiZ2FcIixcImdiXCIsXCJnZFwiLFwiZ2VcIixcImdmXCIsXCJnZ1wiLFwiZ2hcIixcImdpXCIsXCJnbFwiLFwiZ2xvYmFsXCIsXCJnbVwiLFwiZ25cIixcImdwXCIsXCJncVwiLFwiZ3JcIixcImdzXCIsXCJndFwiLFwiZ3VcIixcImd2XCIsXCJnd1wiLFwiZ3lcIixcImhhXCIsXCJoZVwiLFwiaGlcIixcImhrXCIsXCJobVwiLFwiaG5cIixcImhvXCIsXCJoclwiLFwiaHRcIixcImh1XCIsXCJoeVwiLFwiaHpcIixcImlhXCIsXCJpZFwiLFwiaWVcIixcImlnXCIsXCJpaVwiLFwiaWtcIixcImlsXCIsXCJpbVwiLFwiaW5cIixcImlvXCIsXCJpcVwiLFwiaXJcIixcImlzXCIsXCJpdFwiLFwiaXQtY2hcIixcIml0LWl0XCIsXCJpdVwiLFwiamFcIixcImphLWpwXCIsXCJqZVwiLFwiam1cIixcImpvXCIsXCJqcFwiLFwianZcIixcImthXCIsXCJrZVwiLFwia2dcIixcImtoXCIsXCJraVwiLFwia2pcIixcImtrXCIsXCJrbFwiLFwia21cIixcImtuXCIsXCJrb1wiLFwia28ta3JcIixcImtwXCIsXCJrclwiLFwia3NcIixcImt1XCIsXCJrdlwiLFwia3dcIixcImt5XCIsXCJrelwiLFwibGFcIixcImxiXCIsXCJsY1wiLFwibGdcIixcImxpXCIsXCJsa1wiLFwibG5cIixcImxvXCIsXCJsclwiLFwibHNcIixcImx0XCIsXCJsdVwiLFwibHZcIixcImx5XCIsXCJtYVwiLFwibWNcIixcIm1kXCIsXCJtZVwiLFwibWZcIixcIm1nXCIsXCJtaFwiLFwibWlcIixcIm1rXCIsXCJtbFwiLFwibW1cIixcIm1uXCIsXCJtb1wiLFwibXBcIixcIm1xXCIsXCJtclwiLFwibXNcIixcIm10XCIsXCJtdVwiLFwibXZcIixcIm13XCIsXCJteFwiLFwibXlcIixcIm16XCIsXCJuYVwiLFwibmJcIixcIm5iLW5vXCIsXCJuY1wiLFwibmRcIixcIm5lXCIsXCJuZlwiLFwibmdcIixcIm5pXCIsXCJubFwiLFwibmwtYmVcIixcIm5sLW5sXCIsXCJublwiLFwibm4tbm9cIixcIm5vXCIsXCJucFwiLFwibnJcIixcIm51XCIsXCJudlwiLFwibnlcIixcIm56XCIsXCJvY1wiLFwib2pcIixcIm9tXCIsXCJvclwiLFwib3NcIixcInBhXCIsXCJwZVwiLFwicGZcIixcInBnXCIsXCJwaFwiLFwicGlcIixcInBrXCIsXCJwbFwiLFwicG1cIixcInBuXCIsXCJwclwiLFwicHNcIixcInB0XCIsXCJwdC1hb1wiLFwicHQtYnJcIixcInB0LXB0XCIsXCJwd1wiLFwicHlcIixcInFhXCIsXCJxdVwiLFwicmVcIixcInJtXCIsXCJyblwiLFwicm9cIixcInJzXCIsXCJydVwiLFwicnUtcnVcIixcInJ3XCIsXCJzYVwiLFwic2JcIixcInNjXCIsXCJzZFwiLFwic2VcIixcInNnXCIsXCJzaFwiLFwic2hhcmVkXCIsXCJzaVwiLFwic2pcIixcInNrXCIsXCJzbFwiLFwic21cIixcInNuXCIsXCJzb1wiLFwic3FcIixcInNyXCIsXCJzc1wiLFwic3RcIixcInN1XCIsXCJzdlwiLFwic3YtZmlcIixcInN2LXNlXCIsXCJzd1wiLFwic3hcIixcInN5XCIsXCJzelwiLFwidGFcIixcInRjXCIsXCJ0ZFwiLFwidGVcIixcInRmXCIsXCJ0Z1wiLFwidGhcIixcInRpXCIsXCJ0alwiLFwidGtcIixcInRsXCIsXCJ0bVwiLFwidG5cIixcInRvXCIsXCJ0clwiLFwidHNcIixcInR0XCIsXCJ0dlwiLFwidHdcIixcInR5XCIsXCJ0elwiLFwidWFcIixcInVnXCIsXCJ1a1wiLFwidWstdWFcIixcInVtXCIsXCJ1clwiLFwidXNcIixcInV5XCIsXCJ1elwiLFwidmFcIixcInZjXCIsXCJ2ZVwiLFwidmdcIixcInZpXCIsXCJ2blwiLFwidm9cIixcInZ1XCIsXCJ3YVwiLFwid2ZcIixcIndvXCIsXCJ3c1wiLFwieGhcIixcInllXCIsXCJ5aVwiLFwieW9cIixcInl0XCIsXCJ6YVwiLFwiemhcIixcInpoLWNuXCIsXCJ6aC1oa1wiLFwiemgtbW9cIixcInpoLXNnXCIsXCJ6aC10d1wiLFwiem1cIixcInp1XCIsXCJ6d1wiXTtcbiAgdmFyIExPQ0FMRV9NRVRBID0ge1xuICAgIFwiYWFcIjogeyBsYWJlbDogXCJBZmFyXCIsIGZsYWc6IFwi8J+HqvCfh7lcIiB9LFxuICAgIFwiYWJcIjogeyBsYWJlbDogXCJBYmtoYXpcIiwgZmxhZzogXCLwn4es8J+HqlwiIH0sXG4gICAgXCJhZFwiOiB7IGxhYmVsOiBcIkFuZG9ycmFcIiwgZmxhZzogXCLwn4em8J+HqVwiIH0sXG4gICAgXCJhZVwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoVUFFKVwiLCBmbGFnOiBcIvCfh6bwn4eqXCIgfSxcbiAgICBcImFmXCI6IHsgbGFiZWw6IFwiQWZyaWthYW5zXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwiYWdcIjogeyBsYWJlbDogXCJBbnRpZ3VhIGFuZCBCYXJidWRhXCIsIGZsYWc6IFwi8J+HpvCfh6xcIiB9LFxuICAgIFwiYWlcIjogeyBsYWJlbDogXCJBbmd1aWxsYVwiLCBmbGFnOiBcIvCfh6bwn4euXCIgfSxcbiAgICBcImFrXCI6IHsgbGFiZWw6IFwiQWthblwiLCBmbGFnOiBcIvCfh6zwn4etXCIgfSxcbiAgICBcImFsXCI6IHsgbGFiZWw6IFwiQWxiYW5pYVwiLCBmbGFnOiBcIvCfh6bwn4exXCIgfSxcbiAgICBcImFtXCI6IHsgbGFiZWw6IFwiQW1oYXJpY1wiLCBmbGFnOiBcIvCfh6rwn4e5XCIgfSxcbiAgICBcImFuXCI6IHsgbGFiZWw6IFwiQXJhZ29uZXNlXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiYW9cIjogeyBsYWJlbDogXCJBbmdvbGFcIiwgZmxhZzogXCLwn4em8J+HtFwiIH0sXG4gICAgXCJhcVwiOiB7IGxhYmVsOiBcIkFudGFyY3RpY2FcIiwgZmxhZzogXCLwn4em8J+HtlwiIH0sXG4gICAgXCJhclwiOiB7IGxhYmVsOiBcIkFyYWJpY1wiLCBmbGFnOiBcIvCfh7jwn4emXCIgfSxcbiAgICBcImFyLWFlXCI6IHsgbGFiZWw6IFwiQXJhYmljIChVQUUpXCIsIGZsYWc6IFwi8J+HpvCfh6pcIiB9LFxuICAgIFwiYXItYmhcIjogeyBsYWJlbDogXCJBcmFiaWMgKEJhaHJhaW4pXCIsIGZsYWc6IFwi8J+Hp/Cfh61cIiB9LFxuICAgIFwiYXItZHpcIjogeyBsYWJlbDogXCJBcmFiaWMgKEFsZ2VyaWEpXCIsIGZsYWc6IFwi8J+HqfCfh79cIiB9LFxuICAgIFwiYXItZWdcIjogeyBsYWJlbDogXCJBcmFiaWMgKEVneXB0KVwiLCBmbGFnOiBcIvCfh6rwn4esXCIgfSxcbiAgICBcImFyLWlxXCI6IHsgbGFiZWw6IFwiQXJhYmljIChJcmFxKVwiLCBmbGFnOiBcIvCfh67wn4e2XCIgfSxcbiAgICBcImFyLWpvXCI6IHsgbGFiZWw6IFwiQXJhYmljIChKb3JkYW4pXCIsIGZsYWc6IFwi8J+Hr/Cfh7RcIiB9LFxuICAgIFwiYXIta3dcIjogeyBsYWJlbDogXCJBcmFiaWMgKEt1d2FpdClcIiwgZmxhZzogXCLwn4ew8J+HvFwiIH0sXG4gICAgXCJhci1sYlwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoTGViYW5vbilcIiwgZmxhZzogXCLwn4ex8J+Hp1wiIH0sXG4gICAgXCJhci1seVwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoTGlieWEpXCIsIGZsYWc6IFwi8J+HsfCfh75cIiB9LFxuICAgIFwiYXItbWFcIjogeyBsYWJlbDogXCJBcmFiaWMgKE1vcm9jY28pXCIsIGZsYWc6IFwi8J+HsvCfh6ZcIiB9LFxuICAgIFwiYXItb21cIjogeyBsYWJlbDogXCJBcmFiaWMgKE9tYW4pXCIsIGZsYWc6IFwi8J+HtPCfh7JcIiB9LFxuICAgIFwiYXItcWFcIjogeyBsYWJlbDogXCJBcmFiaWMgKFFhdGFyKVwiLCBmbGFnOiBcIvCfh7bwn4emXCIgfSxcbiAgICBcImFyLXNhXCI6IHsgbGFiZWw6IFwiQXJhYmljIChTYXVkaSBBcmFiaWEpXCIsIGZsYWc6IFwi8J+HuPCfh6ZcIiB9LFxuICAgIFwiYXItc3lcIjogeyBsYWJlbDogXCJBcmFiaWMgKFN5cmlhKVwiLCBmbGFnOiBcIvCfh7jwn4e+XCIgfSxcbiAgICBcImFyLXRuXCI6IHsgbGFiZWw6IFwiQXJhYmljIChUdW5pc2lhKVwiLCBmbGFnOiBcIvCfh7nwn4ezXCIgfSxcbiAgICBcImFyLXllXCI6IHsgbGFiZWw6IFwiQXJhYmljIChZZW1lbilcIiwgZmxhZzogXCLwn4e+8J+HqlwiIH0sXG4gICAgXCJhc1wiOiB7IGxhYmVsOiBcIkFzc2FtZXNlXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwiYXRcIjogeyBsYWJlbDogXCJBdXN0cmlhXCIsIGZsYWc6IFwi8J+HpvCfh7lcIiB9LFxuICAgIFwiYXVcIjogeyBsYWJlbDogXCJFbmdsaXNoIChBdXN0cmFsaWEpXCIsIGZsYWc6IFwi8J+HpvCfh7pcIiB9LFxuICAgIFwiYXZcIjogeyBsYWJlbDogXCJBdmFyaWNcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJhd1wiOiB7IGxhYmVsOiBcIkFydWJhXCIsIGZsYWc6IFwi8J+HpvCfh7xcIiB9LFxuICAgIFwiYXhcIjogeyBsYWJlbDogXCLDhWxhbmQgSXNsYW5kc1wiLCBmbGFnOiBcIvCfh6bwn4e9XCIgfSxcbiAgICBcImF5XCI6IHsgbGFiZWw6IFwiQXltYXJhXCIsIGZsYWc6IFwi8J+Hp/Cfh7RcIiB9LFxuICAgIFwiYXpcIjogeyBsYWJlbDogXCJBemVyYmFpamFuaVwiLCBmbGFnOiBcIvCfh6bwn4e/XCIgfSxcbiAgICBcImJhXCI6IHsgbGFiZWw6IFwiQmFzaGtpclwiLCBmbGFnOiBcIvCfh7fwn4e6XCIgfSxcbiAgICBcImJiXCI6IHsgbGFiZWw6IFwiQmFyYmFkb3NcIiwgZmxhZzogXCLwn4en8J+Hp1wiIH0sXG4gICAgXCJiZFwiOiB7IGxhYmVsOiBcIkJhbmdsYWRlc2hcIiwgZmxhZzogXCLwn4en8J+HqVwiIH0sXG4gICAgXCJiZVwiOiB7IGxhYmVsOiBcIkJlbGFydXNpYW5cIiwgZmxhZzogXCLwn4en8J+HvlwiIH0sXG4gICAgXCJiZlwiOiB7IGxhYmVsOiBcIkJ1cmtpbmEgRmFzb1wiLCBmbGFnOiBcIvCfh6fwn4erXCIgfSxcbiAgICBcImJnXCI6IHsgbGFiZWw6IFwiQnVsZ2FyaWFuXCIsIGZsYWc6IFwi8J+Hp/Cfh6xcIiB9LFxuICAgIFwiYmhcIjogeyBsYWJlbDogXCJCaWhhcmlcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJiaVwiOiB7IGxhYmVsOiBcIkJpc2xhbWFcIiwgZmxhZzogXCLwn4e78J+HulwiIH0sXG4gICAgXCJialwiOiB7IGxhYmVsOiBcIkJlbmluXCIsIGZsYWc6IFwi8J+Hp/Cfh69cIiB9LFxuICAgIFwiYmxcIjogeyBsYWJlbDogXCJTYWludCBCYXJ0aMOpbGVteVwiLCBmbGFnOiBcIvCfh6fwn4exXCIgfSxcbiAgICBcImJtXCI6IHsgbGFiZWw6IFwiQmFtYmFyYVwiLCBmbGFnOiBcIvCfh7Lwn4exXCIgfSxcbiAgICBcImJuXCI6IHsgbGFiZWw6IFwiQmVuZ2FsaVwiLCBmbGFnOiBcIvCfh6fwn4epXCIgfSxcbiAgICBcImJuLWJkXCI6IHsgbGFiZWw6IFwiQmVuZ2FsaSAoQmFuZ2xhZGVzaClcIiwgZmxhZzogXCLwn4en8J+HqVwiIH0sXG4gICAgXCJibi1pblwiOiB7IGxhYmVsOiBcIkJlbmdhbGkgKEluZGlhKVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImJvXCI6IHsgbGFiZWw6IFwiVGliZXRhbiBTdGFuZGFyZFwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImJxXCI6IHsgbGFiZWw6IFwiQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmFcIiwgZmxhZzogXCLwn4en8J+HtlwiIH0sXG4gICAgXCJiclwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEJyYXppbClcIiwgZmxhZzogXCLwn4en8J+Ht1wiIH0sXG4gICAgXCJic1wiOiB7IGxhYmVsOiBcIkJvc25pYW5cIiwgZmxhZzogXCLwn4en8J+HplwiIH0sXG4gICAgXCJidFwiOiB7IGxhYmVsOiBcIkJodXRhblwiLCBmbGFnOiBcIvCfh6fwn4e5XCIgfSxcbiAgICBcImJ2XCI6IHsgbGFiZWw6IFwiQm91dmV0IElzbGFuZFwiLCBmbGFnOiBcIvCfh6fwn4e7XCIgfSxcbiAgICBcImJ3XCI6IHsgbGFiZWw6IFwiQm90c3dhbmFcIiwgZmxhZzogXCLwn4en8J+HvFwiIH0sXG4gICAgXCJieVwiOiB7IGxhYmVsOiBcIkJlbGFydXNcIiwgZmxhZzogXCLwn4en8J+HvlwiIH0sXG4gICAgXCJielwiOiB7IGxhYmVsOiBcIkJlbGl6ZVwiLCBmbGFnOiBcIvCfh6fwn4e/XCIgfSxcbiAgICBcImNhXCI6IHsgbGFiZWw6IFwiQ2F0YWxhblwiLCBmbGFnOiBcIvCfh6bwn4epXCIgfSxcbiAgICBcImNjXCI6IHsgbGFiZWw6IFwiQ29jb3MgKEtlZWxpbmcpIElzbGFuZHNcIiwgZmxhZzogXCLwn4eo8J+HqFwiIH0sXG4gICAgXCJjZFwiOiB7IGxhYmVsOiBcIkNvbmdvLCBEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZVwiLCBmbGFnOiBcIvCfh6jwn4epXCIgfSxcbiAgICBcImNlXCI6IHsgbGFiZWw6IFwiQ2hlY2hlblwiLCBmbGFnOiBcIvCfh7fwn4e6XCIgfSxcbiAgICBcImNmXCI6IHsgbGFiZWw6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIGZsYWc6IFwi8J+HqPCfh6tcIiB9LFxuICAgIFwiY2dcIjogeyBsYWJlbDogXCJDb25nb1wiLCBmbGFnOiBcIvCfh6jwn4esXCIgfSxcbiAgICBcImNoXCI6IHsgbGFiZWw6IFwiQ2hhbW9ycm9cIiwgZmxhZzogXCLwn4es8J+HulwiIH0sXG4gICAgXCJjaVwiOiB7IGxhYmVsOiBcIkPDtHRlIGQnSXZvaXJlXCIsIGZsYWc6IFwi8J+HqPCfh65cIiB9LFxuICAgIFwiY2tcIjogeyBsYWJlbDogXCJDb29rIElzbGFuZHNcIiwgZmxhZzogXCLwn4eo8J+HsFwiIH0sXG4gICAgXCJjbFwiOiB7IGxhYmVsOiBcIkNoaWxlXCIsIGZsYWc6IFwi8J+HqPCfh7FcIiB9LFxuICAgIFwiY21cIjogeyBsYWJlbDogXCJDYW1lcm9vblwiLCBmbGFnOiBcIvCfh6jwn4eyXCIgfSxcbiAgICBcImNuXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImNvXCI6IHsgbGFiZWw6IFwiQ29yc2ljYW5cIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJjb21tb25cIjogeyBsYWJlbDogXCJDb21tb25cIiwgZmxhZzogXCLwn4yQXCIgfSxcbiAgICBcImNyXCI6IHsgbGFiZWw6IFwiQ3JlZVwiLCBmbGFnOiBcIvCfh6jwn4emXCIgfSxcbiAgICBcImNzXCI6IHsgbGFiZWw6IFwiQ3plY2hcIiwgZmxhZzogXCLwn4eo8J+Hv1wiIH0sXG4gICAgXCJjdVwiOiB7IGxhYmVsOiBcIk9sZCBDaHVyY2ggU2xhdm9uaWNcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJjdlwiOiB7IGxhYmVsOiBcIkNodXZhc2hcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJjd1wiOiB7IGxhYmVsOiBcIkN1cmHDp2FvXCIsIGZsYWc6IFwi8J+HqPCfh7xcIiB9LFxuICAgIFwiY3hcIjogeyBsYWJlbDogXCJDaHJpc3RtYXMgSXNsYW5kXCIsIGZsYWc6IFwi8J+HqPCfh71cIiB9LFxuICAgIFwiY3lcIjogeyBsYWJlbDogXCJXZWxzaFwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcImN6XCI6IHsgbGFiZWw6IFwiQ3plY2hpYVwiLCBmbGFnOiBcIvCfh6jwn4e/XCIgfSxcbiAgICBcImRhXCI6IHsgbGFiZWw6IFwiRGFuaXNoXCIsIGZsYWc6IFwi8J+HqfCfh7BcIiB9LFxuICAgIFwiZGVcIjogeyBsYWJlbDogXCJHZXJtYW5cIiwgZmxhZzogXCLwn4ep8J+HqlwiIH0sXG4gICAgXCJkZS1hdFwiOiB7IGxhYmVsOiBcIkdlcm1hbiAoQXVzdHJpYSlcIiwgZmxhZzogXCLwn4em8J+HuVwiIH0sXG4gICAgXCJkZS1jaFwiOiB7IGxhYmVsOiBcIkdlcm1hbiAoU3dpdHplcmxhbmQpXCIsIGZsYWc6IFwi8J+HqPCfh61cIiB9LFxuICAgIFwiZGUtZGVcIjogeyBsYWJlbDogXCJHZXJtYW4gKEdlcm1hbnkpXCIsIGZsYWc6IFwi8J+HqfCfh6pcIiB9LFxuICAgIFwiZGUtbGlcIjogeyBsYWJlbDogXCJHZXJtYW4gKExpZWNodGVuc3RlaW4pXCIsIGZsYWc6IFwi8J+HsfCfh65cIiB9LFxuICAgIFwiZGUtbHVcIjogeyBsYWJlbDogXCJHZXJtYW4gKEx1eGVtYm91cmcpXCIsIGZsYWc6IFwi8J+HsfCfh7pcIiB9LFxuICAgIFwiZGpcIjogeyBsYWJlbDogXCJEamlib3V0aVwiLCBmbGFnOiBcIvCfh6nwn4evXCIgfSxcbiAgICBcImRrXCI6IHsgbGFiZWw6IFwiRGFuaXNoXCIsIGZsYWc6IFwi8J+HqfCfh7BcIiB9LFxuICAgIFwiZG1cIjogeyBsYWJlbDogXCJEb21pbmljYVwiLCBmbGFnOiBcIvCfh6nwn4eyXCIgfSxcbiAgICBcImRvXCI6IHsgbGFiZWw6IFwiRG9taW5pY2FuIFJlcHVibGljXCIsIGZsYWc6IFwi8J+HqfCfh7RcIiB9LFxuICAgIFwiZHZcIjogeyBsYWJlbDogXCJEaXZlaGlcIiwgZmxhZzogXCLwn4ey8J+Hu1wiIH0sXG4gICAgXCJkelwiOiB7IGxhYmVsOiBcIkR6b25na2hhXCIsIGZsYWc6IFwi8J+Hp/Cfh7lcIiB9LFxuICAgIFwiZWNcIjogeyBsYWJlbDogXCJFY3VhZG9yXCIsIGZsYWc6IFwi8J+HqvCfh6hcIiB9LFxuICAgIFwiZWVcIjogeyBsYWJlbDogXCJFd2VcIiwgZmxhZzogXCLwn4es8J+HrVwiIH0sXG4gICAgXCJlZ1wiOiB7IGxhYmVsOiBcIkVneXB0XCIsIGZsYWc6IFwi8J+HqvCfh6xcIiB9LFxuICAgIFwiZWhcIjogeyBsYWJlbDogXCJXZXN0ZXJuIFNhaGFyYVwiLCBmbGFnOiBcIvCfh6rwn4etXCIgfSxcbiAgICBcImVsXCI6IHsgbGFiZWw6IFwiR3JlZWsgKG1vZGVybilcIiwgZmxhZzogXCLwn4es8J+Ht1wiIH0sXG4gICAgXCJlblwiOiB7IGxhYmVsOiBcIkVuZ2xpc2hcIiwgZmxhZzogXCLwn4e68J+HuFwiIH0sXG4gICAgXCJlbi1hdVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEF1c3RyYWxpYSlcIiwgZmxhZzogXCLwn4em8J+HulwiIH0sXG4gICAgXCJlbi1ielwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEJlbGl6ZSlcIiwgZmxhZzogXCLwn4en8J+Hv1wiIH0sXG4gICAgXCJlbi1jYVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKENhbmFkYSlcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJlbi1nYlwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFVLKVwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcImVuLWhrXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcImVuLWllXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSXJlbGFuZClcIiwgZmxhZzogXCLwn4eu8J+HqlwiIH0sXG4gICAgXCJlbi1pblwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEluZGlhKVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImVuLWptXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSmFtYWljYSlcIiwgZmxhZzogXCLwn4ev8J+HslwiIH0sXG4gICAgXCJlbi1teVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKE1hbGF5c2lhKVwiLCBmbGFnOiBcIvCfh7Lwn4e+XCIgfSxcbiAgICBcImVuLW56XCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoTmV3IFplYWxhbmQpXCIsIGZsYWc6IFwi8J+Hs/Cfh79cIiB9LFxuICAgIFwiZW4tcGhcIjogeyBsYWJlbDogXCJFbmdsaXNoIChQaGlsaXBwaW5lcylcIiwgZmxhZzogXCLwn4e18J+HrVwiIH0sXG4gICAgXCJlbi1zZ1wiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFNpbmdhcG9yZSlcIiwgZmxhZzogXCLwn4e48J+HrFwiIH0sXG4gICAgXCJlbi10dFwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFRyaW5pZGFkICYgVG9iYWdvKVwiLCBmbGFnOiBcIvCfh7nwn4e5XCIgfSxcbiAgICBcImVuLXVzXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoVVMpXCIsIGZsYWc6IFwi8J+HuvCfh7hcIiB9LFxuICAgIFwiZW4temFcIjogeyBsYWJlbDogXCJFbmdsaXNoIChTb3V0aCBBZnJpY2EpXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwiZW4tendcIjogeyBsYWJlbDogXCJFbmdsaXNoIChaaW1iYWJ3ZSlcIiwgZmxhZzogXCLwn4e/8J+HvFwiIH0sXG4gICAgXCJlb1wiOiB7IGxhYmVsOiBcIkVzcGVyYW50b1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiZXJcIjogeyBsYWJlbDogXCJFcml0cmVhXCIsIGZsYWc6IFwi8J+HqvCfh7dcIiB9LFxuICAgIFwiZXNcIjogeyBsYWJlbDogXCJTcGFuaXNoXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiZXMtYXJcIjogeyBsYWJlbDogXCJTcGFuaXNoIChBcmdlbnRpbmEpXCIsIGZsYWc6IFwi8J+HpvCfh7dcIiB9LFxuICAgIFwiZXMtYm9cIjogeyBsYWJlbDogXCJTcGFuaXNoIChCb2xpdmlhKVwiLCBmbGFnOiBcIvCfh6fwn4e0XCIgfSxcbiAgICBcImVzLWNsXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoQ2hpbGUpXCIsIGZsYWc6IFwi8J+HqPCfh7FcIiB9LFxuICAgIFwiZXMtY29cIjogeyBsYWJlbDogXCJTcGFuaXNoIChDb2xvbWJpYSlcIiwgZmxhZzogXCLwn4eo8J+HtFwiIH0sXG4gICAgXCJlcy1jclwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKENvc3RhIFJpY2EpXCIsIGZsYWc6IFwi8J+HqPCfh7dcIiB9LFxuICAgIFwiZXMtZG9cIjogeyBsYWJlbDogXCJTcGFuaXNoIChEb21pbmljYW4gUmVwdWJsaWMpXCIsIGZsYWc6IFwi8J+HqfCfh7RcIiB9LFxuICAgIFwiZXMtZWNcIjogeyBsYWJlbDogXCJTcGFuaXNoIChFY3VhZG9yKVwiLCBmbGFnOiBcIvCfh6rwn4eoXCIgfSxcbiAgICBcImVzLWVzXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoU3BhaW4pXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiZXMtZ3RcIjogeyBsYWJlbDogXCJTcGFuaXNoIChHdWF0ZW1hbGEpXCIsIGZsYWc6IFwi8J+HrPCfh7lcIiB9LFxuICAgIFwiZXMtaG5cIjogeyBsYWJlbDogXCJTcGFuaXNoIChIb25kdXJhcylcIiwgZmxhZzogXCLwn4et8J+Hs1wiIH0sXG4gICAgXCJlcy1teFwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE1leGljbylcIiwgZmxhZzogXCLwn4ey8J+HvVwiIH0sXG4gICAgXCJlcy1uaVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE5pY2FyYWd1YSlcIiwgZmxhZzogXCLwn4ez8J+HrlwiIH0sXG4gICAgXCJlcy1wYVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBhbmFtYSlcIiwgZmxhZzogXCLwn4e18J+HplwiIH0sXG4gICAgXCJlcy1wZVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBlcnUpXCIsIGZsYWc6IFwi8J+HtfCfh6pcIiB9LFxuICAgIFwiZXMtcHJcIjogeyBsYWJlbDogXCJTcGFuaXNoIChQdWVydG8gUmljbylcIiwgZmxhZzogXCLwn4e18J+Ht1wiIH0sXG4gICAgXCJlcy1weVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBhcmFndWF5KVwiLCBmbGFnOiBcIvCfh7Xwn4e+XCIgfSxcbiAgICBcImVzLXN2XCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoRWwgU2FsdmFkb3IpXCIsIGZsYWc6IFwi8J+HuPCfh7tcIiB9LFxuICAgIFwiZXMtdXlcIjogeyBsYWJlbDogXCJTcGFuaXNoIChVcnVndWF5KVwiLCBmbGFnOiBcIvCfh7rwn4e+XCIgfSxcbiAgICBcImVzLXZlXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoVmVuZXp1ZWxhKVwiLCBmbGFnOiBcIvCfh7vwn4eqXCIgfSxcbiAgICBcImV0XCI6IHsgbGFiZWw6IFwiRXN0b25pYW5cIiwgZmxhZzogXCLwn4eq8J+HqlwiIH0sXG4gICAgXCJldVwiOiB7IGxhYmVsOiBcIkJhc3F1ZVwiLCBmbGFnOiBcIvCfh6rwn4e4XCIgfSxcbiAgICBcImZhXCI6IHsgbGFiZWw6IFwiUGVyc2lhbiAoRmFyc2kpXCIsIGZsYWc6IFwi8J+HrvCfh7dcIiB9LFxuICAgIFwiZmZcIjogeyBsYWJlbDogXCJGdWxhXCIsIGZsYWc6IFwi8J+HuPCfh7NcIiB9LFxuICAgIFwiZmlcIjogeyBsYWJlbDogXCJGaW5uaXNoXCIsIGZsYWc6IFwi8J+Hq/Cfh65cIiB9LFxuICAgIFwiZmpcIjogeyBsYWJlbDogXCJGaWppYW5cIiwgZmxhZzogXCLwn4er8J+Hr1wiIH0sXG4gICAgXCJma1wiOiB7IGxhYmVsOiBcIkZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKVwiLCBmbGFnOiBcIvCfh6vwn4ewXCIgfSxcbiAgICBcImZtXCI6IHsgbGFiZWw6IFwiTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZlwiLCBmbGFnOiBcIvCfh6vwn4eyXCIgfSxcbiAgICBcImZvXCI6IHsgbGFiZWw6IFwiRmFyb2VzZVwiLCBmbGFnOiBcIvCfh6vwn4e0XCIgfSxcbiAgICBcImZyXCI6IHsgbGFiZWw6IFwiRnJlbmNoXCIsIGZsYWc6IFwi8J+Hq/Cfh7dcIiB9LFxuICAgIFwiZnItYmVcIjogeyBsYWJlbDogXCJGcmVuY2ggKEJlbGdpdW0pXCIsIGZsYWc6IFwi8J+Hp/Cfh6pcIiB9LFxuICAgIFwiZnItY2FcIjogeyBsYWJlbDogXCJGcmVuY2ggKENhbmFkYSlcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJmci1jaFwiOiB7IGxhYmVsOiBcIkZyZW5jaCAoU3dpdHplcmxhbmQpXCIsIGZsYWc6IFwi8J+HqPCfh61cIiB9LFxuICAgIFwiZnItZnJcIjogeyBsYWJlbDogXCJGcmVuY2ggKEZyYW5jZSlcIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJmci1sdVwiOiB7IGxhYmVsOiBcIkZyZW5jaCAoTHV4ZW1ib3VyZylcIiwgZmxhZzogXCLwn4ex8J+HulwiIH0sXG4gICAgXCJmci1tY1wiOiB7IGxhYmVsOiBcIkZyZW5jaCAoTW9uYWNvKVwiLCBmbGFnOiBcIvCfh7Lwn4eoXCIgfSxcbiAgICBcImZ5XCI6IHsgbGFiZWw6IFwiV2VzdGVybiBGcmlzaWFuXCIsIGZsYWc6IFwi8J+Hs/Cfh7FcIiB9LFxuICAgIFwiZ2FcIjogeyBsYWJlbDogXCJJcmlzaFwiLCBmbGFnOiBcIvCfh67wn4eqXCIgfSxcbiAgICBcImdiXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoVUspXCIsIGZsYWc6IFwi8J+HrPCfh6dcIiB9LFxuICAgIFwiZ2RcIjogeyBsYWJlbDogXCJTY290dGlzaCBHYWVsaWNcIiwgZmxhZzogXCLwn4es8J+Hp1wiIH0sXG4gICAgXCJnZVwiOiB7IGxhYmVsOiBcIkdlb3JnaWFcIiwgZmxhZzogXCLwn4es8J+HqlwiIH0sXG4gICAgXCJnZlwiOiB7IGxhYmVsOiBcIkZyZW5jaCBHdWlhbmFcIiwgZmxhZzogXCLwn4es8J+Hq1wiIH0sXG4gICAgXCJnZ1wiOiB7IGxhYmVsOiBcIkd1ZXJuc2V5XCIsIGZsYWc6IFwi8J+HrPCfh6xcIiB9LFxuICAgIFwiZ2hcIjogeyBsYWJlbDogXCJHaGFuYVwiLCBmbGFnOiBcIvCfh6zwn4etXCIgfSxcbiAgICBcImdpXCI6IHsgbGFiZWw6IFwiR2licmFsdGFyXCIsIGZsYWc6IFwi8J+HrPCfh65cIiB9LFxuICAgIFwiZ2xcIjogeyBsYWJlbDogXCJHYWxpY2lhblwiLCBmbGFnOiBcIvCfh6rwn4e4XCIgfSxcbiAgICBcImdsb2JhbFwiOiB7IGxhYmVsOiBcIkdsb2JhbFwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiZ21cIjogeyBsYWJlbDogXCJHYW1iaWFcIiwgZmxhZzogXCLwn4es8J+HslwiIH0sXG4gICAgXCJnblwiOiB7IGxhYmVsOiBcIkd1YXJhbsOtXCIsIGZsYWc6IFwi8J+HtfCfh75cIiB9LFxuICAgIFwiZ3BcIjogeyBsYWJlbDogXCJHdWFkZWxvdXBlXCIsIGZsYWc6IFwi8J+HrPCfh7VcIiB9LFxuICAgIFwiZ3FcIjogeyBsYWJlbDogXCJFcXVhdG9yaWFsIEd1aW5lYVwiLCBmbGFnOiBcIvCfh6zwn4e2XCIgfSxcbiAgICBcImdyXCI6IHsgbGFiZWw6IFwiR3JlZWNlXCIsIGZsYWc6IFwi8J+HrPCfh7dcIiB9LFxuICAgIFwiZ3NcIjogeyBsYWJlbDogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLCBmbGFnOiBcIvCfh6zwn4e4XCIgfSxcbiAgICBcImd0XCI6IHsgbGFiZWw6IFwiR3VhdGVtYWxhXCIsIGZsYWc6IFwi8J+HrPCfh7lcIiB9LFxuICAgIFwiZ3VcIjogeyBsYWJlbDogXCJHdWphcmF0aVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImd2XCI6IHsgbGFiZWw6IFwiTWFueFwiLCBmbGFnOiBcIvCfh67wn4eyXCIgfSxcbiAgICBcImd3XCI6IHsgbGFiZWw6IFwiR3VpbmVhLUJpc3NhdVwiLCBmbGFnOiBcIvCfh6zwn4e8XCIgfSxcbiAgICBcImd5XCI6IHsgbGFiZWw6IFwiR3V5YW5hXCIsIGZsYWc6IFwi8J+HrPCfh75cIiB9LFxuICAgIFwiaGFcIjogeyBsYWJlbDogXCJIYXVzYVwiLCBmbGFnOiBcIvCfh7Pwn4esXCIgfSxcbiAgICBcImhlXCI6IHsgbGFiZWw6IFwiSGVicmV3IChtb2Rlcm4pXCIsIGZsYWc6IFwi8J+HrvCfh7FcIiB9LFxuICAgIFwiaGlcIjogeyBsYWJlbDogXCJIaW5kaVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImhrXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcImhtXCI6IHsgbGFiZWw6IFwiSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HrfCfh7JcIiB9LFxuICAgIFwiaG5cIjogeyBsYWJlbDogXCJIb25kdXJhc1wiLCBmbGFnOiBcIvCfh63wn4ezXCIgfSxcbiAgICBcImhvXCI6IHsgbGFiZWw6IFwiSGlyaSBNb3R1XCIsIGZsYWc6IFwi8J+HtfCfh6xcIiB9LFxuICAgIFwiaHJcIjogeyBsYWJlbDogXCJDcm9hdGlhblwiLCBmbGFnOiBcIvCfh63wn4e3XCIgfSxcbiAgICBcImh0XCI6IHsgbGFiZWw6IFwiSGFpdGlhblwiLCBmbGFnOiBcIvCfh63wn4e5XCIgfSxcbiAgICBcImh1XCI6IHsgbGFiZWw6IFwiSHVuZ2FyaWFuXCIsIGZsYWc6IFwi8J+HrfCfh7pcIiB9LFxuICAgIFwiaHlcIjogeyBsYWJlbDogXCJBcm1lbmlhblwiLCBmbGFnOiBcIvCfh6bwn4eyXCIgfSxcbiAgICBcImh6XCI6IHsgbGFiZWw6IFwiSGVyZXJvXCIsIGZsYWc6IFwi8J+Hs/Cfh6ZcIiB9LFxuICAgIFwiaWFcIjogeyBsYWJlbDogXCJJbnRlcmxpbmd1YVwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaWRcIjogeyBsYWJlbDogXCJJbmRvbmVzaWFuXCIsIGZsYWc6IFwi8J+HrvCfh6lcIiB9LFxuICAgIFwiaWVcIjogeyBsYWJlbDogXCJJbnRlcmxpbmd1ZVwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaWdcIjogeyBsYWJlbDogXCJJZ2JvXCIsIGZsYWc6IFwi8J+Hs/Cfh6xcIiB9LFxuICAgIFwiaWlcIjogeyBsYWJlbDogXCJOdW9zdVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImlrXCI6IHsgbGFiZWw6IFwiSW51cGlhcVwiLCBmbGFnOiBcIvCfh7rwn4e4XCIgfSxcbiAgICBcImlsXCI6IHsgbGFiZWw6IFwiSXNyYWVsXCIsIGZsYWc6IFwi8J+HrvCfh7FcIiB9LFxuICAgIFwiaW1cIjogeyBsYWJlbDogXCJJc2xlIG9mIE1hblwiLCBmbGFnOiBcIvCfh67wn4eyXCIgfSxcbiAgICBcImluXCI6IHsgbGFiZWw6IFwiSW5kaWFcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJpb1wiOiB7IGxhYmVsOiBcIklkb1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaXFcIjogeyBsYWJlbDogXCJJcmFxXCIsIGZsYWc6IFwi8J+HrvCfh7ZcIiB9LFxuICAgIFwiaXJcIjogeyBsYWJlbDogXCJJcmFuLCBJc2xhbWljIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HrvCfh7dcIiB9LFxuICAgIFwiaXNcIjogeyBsYWJlbDogXCJJY2VsYW5kaWNcIiwgZmxhZzogXCLwn4eu8J+HuFwiIH0sXG4gICAgXCJpdFwiOiB7IGxhYmVsOiBcIkl0YWxpYW5cIiwgZmxhZzogXCLwn4eu8J+HuVwiIH0sXG4gICAgXCJpdC1jaFwiOiB7IGxhYmVsOiBcIkl0YWxpYW4gKFN3aXR6ZXJsYW5kKVwiLCBmbGFnOiBcIvCfh6jwn4etXCIgfSxcbiAgICBcIml0LWl0XCI6IHsgbGFiZWw6IFwiSXRhbGlhbiAoSXRhbHkpXCIsIGZsYWc6IFwi8J+HrvCfh7lcIiB9LFxuICAgIFwiaXVcIjogeyBsYWJlbDogXCJJbnVrdGl0dXRcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJqYVwiOiB7IGxhYmVsOiBcIkphcGFuZXNlXCIsIGZsYWc6IFwi8J+Hr/Cfh7VcIiB9LFxuICAgIFwiamEtanBcIjogeyBsYWJlbDogXCJKYXBhbmVzZSAoSmFwYW4pXCIsIGZsYWc6IFwi8J+Hr/Cfh7VcIiB9LFxuICAgIFwiamVcIjogeyBsYWJlbDogXCJKZXJzZXlcIiwgZmxhZzogXCLwn4ev8J+HqlwiIH0sXG4gICAgXCJqbVwiOiB7IGxhYmVsOiBcIkphbWFpY2FcIiwgZmxhZzogXCLwn4ev8J+HslwiIH0sXG4gICAgXCJqb1wiOiB7IGxhYmVsOiBcIkpvcmRhblwiLCBmbGFnOiBcIvCfh6/wn4e0XCIgfSxcbiAgICBcImpwXCI6IHsgbGFiZWw6IFwiSmFwYW5lc2VcIiwgZmxhZzogXCLwn4ev8J+HtVwiIH0sXG4gICAgXCJqdlwiOiB7IGxhYmVsOiBcIkphdmFuZXNlXCIsIGZsYWc6IFwi8J+HrvCfh6lcIiB9LFxuICAgIFwia2FcIjogeyBsYWJlbDogXCJHZW9yZ2lhblwiLCBmbGFnOiBcIvCfh6zwn4eqXCIgfSxcbiAgICBcImtlXCI6IHsgbGFiZWw6IFwiS2VueWFcIiwgZmxhZzogXCLwn4ew8J+HqlwiIH0sXG4gICAgXCJrZ1wiOiB7IGxhYmVsOiBcIktvbmdvXCIsIGZsYWc6IFwi8J+HqPCfh6lcIiB9LFxuICAgIFwia2hcIjogeyBsYWJlbDogXCJDYW1ib2RpYVwiLCBmbGFnOiBcIvCfh7Dwn4etXCIgfSxcbiAgICBcImtpXCI6IHsgbGFiZWw6IFwiS2lrdXl1XCIsIGZsYWc6IFwi8J+HsPCfh6pcIiB9LFxuICAgIFwia2pcIjogeyBsYWJlbDogXCJLd2FueWFtYVwiLCBmbGFnOiBcIvCfh7Pwn4emXCIgfSxcbiAgICBcImtrXCI6IHsgbGFiZWw6IFwiS2F6YWtoXCIsIGZsYWc6IFwi8J+HsPCfh79cIiB9LFxuICAgIFwia2xcIjogeyBsYWJlbDogXCJLYWxhYWxsaXN1dFwiLCBmbGFnOiBcIvCfh6zwn4exXCIgfSxcbiAgICBcImttXCI6IHsgbGFiZWw6IFwiS2htZXJcIiwgZmxhZzogXCLwn4ew8J+HrVwiIH0sXG4gICAgXCJrblwiOiB7IGxhYmVsOiBcIkthbm5hZGFcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJrb1wiOiB7IGxhYmVsOiBcIktvcmVhblwiLCBmbGFnOiBcIvCfh7Dwn4e3XCIgfSxcbiAgICBcImtvLWtyXCI6IHsgbGFiZWw6IFwiS29yZWFuIChLb3JlYSlcIiwgZmxhZzogXCLwn4ew8J+Ht1wiIH0sXG4gICAgXCJrcFwiOiB7IGxhYmVsOiBcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZSdzIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HsPCfh7VcIiB9LFxuICAgIFwia3JcIjogeyBsYWJlbDogXCJLb3JlYW5cIiwgZmxhZzogXCLwn4ew8J+Ht1wiIH0sXG4gICAgXCJrc1wiOiB7IGxhYmVsOiBcIkthc2htaXJpXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwia3VcIjogeyBsYWJlbDogXCJLdXJkaXNoXCIsIGZsYWc6IFwi8J+HrvCfh7ZcIiB9LFxuICAgIFwia3ZcIjogeyBsYWJlbDogXCJLb21pXCIsIGZsYWc6IFwi8J+Ht/Cfh7pcIiB9LFxuICAgIFwia3dcIjogeyBsYWJlbDogXCJDb3JuaXNoXCIsIGZsYWc6IFwi8J+HrPCfh6dcIiB9LFxuICAgIFwia3lcIjogeyBsYWJlbDogXCJLeXJneXpcIiwgZmxhZzogXCLwn4ew8J+HrFwiIH0sXG4gICAgXCJrelwiOiB7IGxhYmVsOiBcIkthemFraHN0YW5cIiwgZmxhZzogXCLwn4ew8J+Hv1wiIH0sXG4gICAgXCJsYVwiOiB7IGxhYmVsOiBcIkxhdGluXCIsIGZsYWc6IFwi8J+Hu/Cfh6ZcIiB9LFxuICAgIFwibGJcIjogeyBsYWJlbDogXCJMdXhlbWJvdXJnaXNoXCIsIGZsYWc6IFwi8J+HsfCfh7pcIiB9LFxuICAgIFwibGNcIjogeyBsYWJlbDogXCJTYWludCBMdWNpYVwiLCBmbGFnOiBcIvCfh7Hwn4eoXCIgfSxcbiAgICBcImxnXCI6IHsgbGFiZWw6IFwiR2FuZGFcIiwgZmxhZzogXCLwn4e68J+HrFwiIH0sXG4gICAgXCJsaVwiOiB7IGxhYmVsOiBcIkxpbWJ1cmdpc2hcIiwgZmxhZzogXCLwn4ez8J+HsVwiIH0sXG4gICAgXCJsa1wiOiB7IGxhYmVsOiBcIlNyaSBMYW5rYVwiLCBmbGFnOiBcIvCfh7Hwn4ewXCIgfSxcbiAgICBcImxuXCI6IHsgbGFiZWw6IFwiTGluZ2FsYVwiLCBmbGFnOiBcIvCfh6jwn4epXCIgfSxcbiAgICBcImxvXCI6IHsgbGFiZWw6IFwiTGFvXCIsIGZsYWc6IFwi8J+HsfCfh6ZcIiB9LFxuICAgIFwibHJcIjogeyBsYWJlbDogXCJMaWJlcmlhXCIsIGZsYWc6IFwi8J+HsfCfh7dcIiB9LFxuICAgIFwibHNcIjogeyBsYWJlbDogXCJMZXNvdGhvXCIsIGZsYWc6IFwi8J+HsfCfh7hcIiB9LFxuICAgIFwibHRcIjogeyBsYWJlbDogXCJMaXRodWFuaWFuXCIsIGZsYWc6IFwi8J+HsfCfh7lcIiB9LFxuICAgIFwibHVcIjogeyBsYWJlbDogXCJMdWJhLUthdGFuZ2FcIiwgZmxhZzogXCLwn4eo8J+HqVwiIH0sXG4gICAgXCJsdlwiOiB7IGxhYmVsOiBcIkxhdHZpYW5cIiwgZmxhZzogXCLwn4ex8J+Hu1wiIH0sXG4gICAgXCJseVwiOiB7IGxhYmVsOiBcIkxpYnlhXCIsIGZsYWc6IFwi8J+HsfCfh75cIiB9LFxuICAgIFwibWFcIjogeyBsYWJlbDogXCJNb3JvY2NvXCIsIGZsYWc6IFwi8J+HsvCfh6ZcIiB9LFxuICAgIFwibWNcIjogeyBsYWJlbDogXCJNb25hY29cIiwgZmxhZzogXCLwn4ey8J+HqFwiIH0sXG4gICAgXCJtZFwiOiB7IGxhYmVsOiBcIk1vbGRvdmEsIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HsvCfh6lcIiB9LFxuICAgIFwibWVcIjogeyBsYWJlbDogXCJNb250ZW5lZ3JvXCIsIGZsYWc6IFwi8J+HsvCfh6pcIiB9LFxuICAgIFwibWZcIjogeyBsYWJlbDogXCJTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KVwiLCBmbGFnOiBcIvCfh7Lwn4erXCIgfSxcbiAgICBcIm1nXCI6IHsgbGFiZWw6IFwiTWFsYWdhc3lcIiwgZmxhZzogXCLwn4ey8J+HrFwiIH0sXG4gICAgXCJtaFwiOiB7IGxhYmVsOiBcIk1hcnNoYWxsZXNlXCIsIGZsYWc6IFwi8J+HsvCfh61cIiB9LFxuICAgIFwibWlcIjogeyBsYWJlbDogXCJNxIFvcmlcIiwgZmxhZzogXCLwn4ez8J+Hv1wiIH0sXG4gICAgXCJta1wiOiB7IGxhYmVsOiBcIk1hY2Vkb25pYW5cIiwgZmxhZzogXCLwn4ey8J+HsFwiIH0sXG4gICAgXCJtbFwiOiB7IGxhYmVsOiBcIk1hbGF5YWxhbVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcIm1tXCI6IHsgbGFiZWw6IFwiTXlhbm1hclwiLCBmbGFnOiBcIvCfh7Lwn4eyXCIgfSxcbiAgICBcIm1uXCI6IHsgbGFiZWw6IFwiTW9uZ29saWFuXCIsIGZsYWc6IFwi8J+HsvCfh7NcIiB9LFxuICAgIFwibW9cIjogeyBsYWJlbDogXCJNYWNhb1wiLCBmbGFnOiBcIvCfh7Lwn4e0XCIgfSxcbiAgICBcIm1wXCI6IHsgbGFiZWw6IFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HsvCfh7VcIiB9LFxuICAgIFwibXFcIjogeyBsYWJlbDogXCJNYXJ0aW5pcXVlXCIsIGZsYWc6IFwi8J+HsvCfh7ZcIiB9LFxuICAgIFwibXJcIjogeyBsYWJlbDogXCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJtc1wiOiB7IGxhYmVsOiBcIk1hbGF5XCIsIGZsYWc6IFwi8J+HsvCfh75cIiB9LFxuICAgIFwibXRcIjogeyBsYWJlbDogXCJNYWx0ZXNlXCIsIGZsYWc6IFwi8J+HsvCfh7lcIiB9LFxuICAgIFwibXVcIjogeyBsYWJlbDogXCJNYXVyaXRpdXNcIiwgZmxhZzogXCLwn4ey8J+HulwiIH0sXG4gICAgXCJtdlwiOiB7IGxhYmVsOiBcIk1hbGRpdmVzXCIsIGZsYWc6IFwi8J+HsvCfh7tcIiB9LFxuICAgIFwibXdcIjogeyBsYWJlbDogXCJNYWxhd2lcIiwgZmxhZzogXCLwn4ey8J+HvFwiIH0sXG4gICAgXCJteFwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE1leGljbylcIiwgZmxhZzogXCLwn4ey8J+HvVwiIH0sXG4gICAgXCJteVwiOiB7IGxhYmVsOiBcIkJ1cm1lc2VcIiwgZmxhZzogXCLwn4ey8J+HslwiIH0sXG4gICAgXCJtelwiOiB7IGxhYmVsOiBcIk1vemFtYmlxdWVcIiwgZmxhZzogXCLwn4ey8J+Hv1wiIH0sXG4gICAgXCJuYVwiOiB7IGxhYmVsOiBcIk5hdXJ1YW5cIiwgZmxhZzogXCLwn4ez8J+Ht1wiIH0sXG4gICAgXCJuYlwiOiB7IGxhYmVsOiBcIk5vcndlZ2lhbiBCb2ttw6VsXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibmItbm9cIjogeyBsYWJlbDogXCJOb3J3ZWdpYW4gQm9rbcOlbCAoTm9yd2F5KVwiLCBmbGFnOiBcIvCfh7Pwn4e0XCIgfSxcbiAgICBcIm5jXCI6IHsgbGFiZWw6IFwiTmV3IENhbGVkb25pYVwiLCBmbGFnOiBcIvCfh7Pwn4eoXCIgfSxcbiAgICBcIm5kXCI6IHsgbGFiZWw6IFwiTm9ydGhlcm4gTmRlYmVsZVwiLCBmbGFnOiBcIvCfh7/wn4e8XCIgfSxcbiAgICBcIm5lXCI6IHsgbGFiZWw6IFwiTmVwYWxpXCIsIGZsYWc6IFwi8J+Hs/Cfh7VcIiB9LFxuICAgIFwibmZcIjogeyBsYWJlbDogXCJOb3Jmb2xrIElzbGFuZFwiLCBmbGFnOiBcIvCfh7Pwn4erXCIgfSxcbiAgICBcIm5nXCI6IHsgbGFiZWw6IFwiTmRvbmdhXCIsIGZsYWc6IFwi8J+Hs/Cfh6ZcIiB9LFxuICAgIFwibmlcIjogeyBsYWJlbDogXCJOaWNhcmFndWFcIiwgZmxhZzogXCLwn4ez8J+HrlwiIH0sXG4gICAgXCJubFwiOiB7IGxhYmVsOiBcIkR1dGNoXCIsIGZsYWc6IFwi8J+Hs/Cfh7FcIiB9LFxuICAgIFwibmwtYmVcIjogeyBsYWJlbDogXCJEdXRjaCAoQmVsZ2l1bSlcIiwgZmxhZzogXCLwn4en8J+HqlwiIH0sXG4gICAgXCJubC1ubFwiOiB7IGxhYmVsOiBcIkR1dGNoIChOZXRoZXJsYW5kcylcIiwgZmxhZzogXCLwn4ez8J+HsVwiIH0sXG4gICAgXCJublwiOiB7IGxhYmVsOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibm4tbm9cIjogeyBsYWJlbDogXCJOb3J3ZWdpYW4gTnlub3JzayAoTm9yd2F5KVwiLCBmbGFnOiBcIvCfh7Pwn4e0XCIgfSxcbiAgICBcIm5vXCI6IHsgbGFiZWw6IFwiTm9yd2VnaWFuXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibnBcIjogeyBsYWJlbDogXCJOZXBhbFwiLCBmbGFnOiBcIvCfh7Pwn4e1XCIgfSxcbiAgICBcIm5yXCI6IHsgbGFiZWw6IFwiU291dGhlcm4gTmRlYmVsZVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcIm51XCI6IHsgbGFiZWw6IFwiTml1ZVwiLCBmbGFnOiBcIvCfh7Pwn4e6XCIgfSxcbiAgICBcIm52XCI6IHsgbGFiZWw6IFwiTmF2YWpvXCIsIGZsYWc6IFwi8J+HuvCfh7hcIiB9LFxuICAgIFwibnlcIjogeyBsYWJlbDogXCJDaGljaGV3YVwiLCBmbGFnOiBcIvCfh7Lwn4e8XCIgfSxcbiAgICBcIm56XCI6IHsgbGFiZWw6IFwiTmV3IFplYWxhbmRcIiwgZmxhZzogXCLwn4ez8J+Hv1wiIH0sXG4gICAgXCJvY1wiOiB7IGxhYmVsOiBcIk9jY2l0YW5cIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJvalwiOiB7IGxhYmVsOiBcIk9qaWJ3ZVwiLCBmbGFnOiBcIvCfh6jwn4emXCIgfSxcbiAgICBcIm9tXCI6IHsgbGFiZWw6IFwiT3JvbW9cIiwgZmxhZzogXCLwn4eq8J+HuVwiIH0sXG4gICAgXCJvclwiOiB7IGxhYmVsOiBcIk9yaXlhXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwib3NcIjogeyBsYWJlbDogXCJPc3NldGlhblwiLCBmbGFnOiBcIvCfh6zwn4eqXCIgfSxcbiAgICBcInBhXCI6IHsgbGFiZWw6IFwiKEVhc3Rlcm4pIFB1bmphYmlcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJwZVwiOiB7IGxhYmVsOiBcIlBlcnVcIiwgZmxhZzogXCLwn4e18J+HqlwiIH0sXG4gICAgXCJwZlwiOiB7IGxhYmVsOiBcIkZyZW5jaCBQb2x5bmVzaWFcIiwgZmxhZzogXCLwn4e18J+Hq1wiIH0sXG4gICAgXCJwZ1wiOiB7IGxhYmVsOiBcIlBhcHVhIE5ldyBHdWluZWFcIiwgZmxhZzogXCLwn4e18J+HrFwiIH0sXG4gICAgXCJwaFwiOiB7IGxhYmVsOiBcIlBoaWxpcHBpbmVzXCIsIGZsYWc6IFwi8J+HtfCfh61cIiB9LFxuICAgIFwicGlcIjogeyBsYWJlbDogXCJQxIFsaVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcInBrXCI6IHsgbGFiZWw6IFwiUGFraXN0YW5cIiwgZmxhZzogXCLwn4e18J+HsFwiIH0sXG4gICAgXCJwbFwiOiB7IGxhYmVsOiBcIlBvbGlzaFwiLCBmbGFnOiBcIvCfh7Xwn4exXCIgfSxcbiAgICBcInBtXCI6IHsgbGFiZWw6IFwiU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvblwiLCBmbGFnOiBcIvCfh7Xwn4eyXCIgfSxcbiAgICBcInBuXCI6IHsgbGFiZWw6IFwiUGl0Y2Fpcm5cIiwgZmxhZzogXCLwn4e18J+Hs1wiIH0sXG4gICAgXCJwclwiOiB7IGxhYmVsOiBcIlB1ZXJ0byBSaWNvXCIsIGZsYWc6IFwi8J+HtfCfh7dcIiB9LFxuICAgIFwicHNcIjogeyBsYWJlbDogXCJQYXNodG9cIiwgZmxhZzogXCLwn4em8J+Hq1wiIH0sXG4gICAgXCJwdFwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2VcIiwgZmxhZzogXCLwn4e18J+HuVwiIH0sXG4gICAgXCJwdC1hb1wiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEFuZ29sYSlcIiwgZmxhZzogXCLwn4em8J+HtFwiIH0sXG4gICAgXCJwdC1iclwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEJyYXppbClcIiwgZmxhZzogXCLwn4en8J+Ht1wiIH0sXG4gICAgXCJwdC1wdFwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKFBvcnR1Z2FsKVwiLCBmbGFnOiBcIvCfh7Xwn4e5XCIgfSxcbiAgICBcInB3XCI6IHsgbGFiZWw6IFwiUGFsYXVcIiwgZmxhZzogXCLwn4e18J+HvFwiIH0sXG4gICAgXCJweVwiOiB7IGxhYmVsOiBcIlBhcmFndWF5XCIsIGZsYWc6IFwi8J+HtfCfh75cIiB9LFxuICAgIFwicWFcIjogeyBsYWJlbDogXCJRYXRhclwiLCBmbGFnOiBcIvCfh7bwn4emXCIgfSxcbiAgICBcInF1XCI6IHsgbGFiZWw6IFwiUXVlY2h1YVwiLCBmbGFnOiBcIvCfh7Xwn4eqXCIgfSxcbiAgICBcInJlXCI6IHsgbGFiZWw6IFwiUsOpdW5pb25cIiwgZmxhZzogXCLwn4e38J+HqlwiIH0sXG4gICAgXCJybVwiOiB7IGxhYmVsOiBcIlJvbWFuc2hcIiwgZmxhZzogXCLwn4eo8J+HrVwiIH0sXG4gICAgXCJyblwiOiB7IGxhYmVsOiBcIktpcnVuZGlcIiwgZmxhZzogXCLwn4en8J+HrlwiIH0sXG4gICAgXCJyb1wiOiB7IGxhYmVsOiBcIlJvbWFuaWFuXCIsIGZsYWc6IFwi8J+Ht/Cfh7RcIiB9LFxuICAgIFwicnNcIjogeyBsYWJlbDogXCJTZXJiaWFcIiwgZmxhZzogXCLwn4e38J+HuFwiIH0sXG4gICAgXCJydVwiOiB7IGxhYmVsOiBcIlJ1c3NpYW5cIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJydS1ydVwiOiB7IGxhYmVsOiBcIlJ1c3NpYW4gKFJ1c3NpYSlcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJyd1wiOiB7IGxhYmVsOiBcIktpbnlhcndhbmRhXCIsIGZsYWc6IFwi8J+Ht/Cfh7xcIiB9LFxuICAgIFwic2FcIjogeyBsYWJlbDogXCJBcmFiaWMgKFNhdWRpIEFyYWJpYSlcIiwgZmxhZzogXCLwn4e48J+HplwiIH0sXG4gICAgXCJzYlwiOiB7IGxhYmVsOiBcIlNvbG9tb24gSXNsYW5kc1wiLCBmbGFnOiBcIvCfh7jwn4enXCIgfSxcbiAgICBcInNjXCI6IHsgbGFiZWw6IFwiU2FyZGluaWFuXCIsIGZsYWc6IFwi8J+HrvCfh7lcIiB9LFxuICAgIFwic2RcIjogeyBsYWJlbDogXCJTaW5kaGlcIiwgZmxhZzogXCLwn4e18J+HsFwiIH0sXG4gICAgXCJzZVwiOiB7IGxhYmVsOiBcIlN3ZWRpc2hcIiwgZmxhZzogXCLwn4e48J+HqlwiIH0sXG4gICAgXCJzZ1wiOiB7IGxhYmVsOiBcIlNhbmdvXCIsIGZsYWc6IFwi8J+HqPCfh6tcIiB9LFxuICAgIFwic2hcIjogeyBsYWJlbDogXCJTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYVwiLCBmbGFnOiBcIvCfh7jwn4etXCIgfSxcbiAgICBcInNoYXJlZFwiOiB7IGxhYmVsOiBcIlNoYXJlZFwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwic2lcIjogeyBsYWJlbDogXCJTaW5oYWxlc2VcIiwgZmxhZzogXCLwn4ex8J+HsFwiIH0sXG4gICAgXCJzalwiOiB7IGxhYmVsOiBcIlN2YWxiYXJkIGFuZCBKYW4gTWF5ZW5cIiwgZmxhZzogXCLwn4e48J+Hr1wiIH0sXG4gICAgXCJza1wiOiB7IGxhYmVsOiBcIlNsb3Zha1wiLCBmbGFnOiBcIvCfh7jwn4ewXCIgfSxcbiAgICBcInNsXCI6IHsgbGFiZWw6IFwiU2xvdmVuZVwiLCBmbGFnOiBcIvCfh7jwn4euXCIgfSxcbiAgICBcInNtXCI6IHsgbGFiZWw6IFwiU2Ftb2FuXCIsIGZsYWc6IFwi8J+HvPCfh7hcIiB9LFxuICAgIFwic25cIjogeyBsYWJlbDogXCJTaG9uYVwiLCBmbGFnOiBcIvCfh7/wn4e8XCIgfSxcbiAgICBcInNvXCI6IHsgbGFiZWw6IFwiU29tYWxpXCIsIGZsYWc6IFwi8J+HuPCfh7RcIiB9LFxuICAgIFwic3FcIjogeyBsYWJlbDogXCJBbGJhbmlhblwiLCBmbGFnOiBcIvCfh6bwn4exXCIgfSxcbiAgICBcInNyXCI6IHsgbGFiZWw6IFwiU2VyYmlhblwiLCBmbGFnOiBcIvCfh7fwn4e4XCIgfSxcbiAgICBcInNzXCI6IHsgbGFiZWw6IFwiU3dhdGlcIiwgZmxhZzogXCLwn4e48J+Hv1wiIH0sXG4gICAgXCJzdFwiOiB7IGxhYmVsOiBcIlNvdXRoZXJuIFNvdGhvXCIsIGZsYWc6IFwi8J+HsfCfh7hcIiB9LFxuICAgIFwic3VcIjogeyBsYWJlbDogXCJTdW5kYW5lc2VcIiwgZmxhZzogXCLwn4eu8J+HqVwiIH0sXG4gICAgXCJzdlwiOiB7IGxhYmVsOiBcIlN3ZWRpc2hcIiwgZmxhZzogXCLwn4e48J+HqlwiIH0sXG4gICAgXCJzdi1maVwiOiB7IGxhYmVsOiBcIlN3ZWRpc2ggKEZpbmxhbmQpXCIsIGZsYWc6IFwi8J+Hq/Cfh65cIiB9LFxuICAgIFwic3Ytc2VcIjogeyBsYWJlbDogXCJTd2VkaXNoIChTd2VkZW4pXCIsIGZsYWc6IFwi8J+HuPCfh6pcIiB9LFxuICAgIFwic3dcIjogeyBsYWJlbDogXCJTd2FoaWxpXCIsIGZsYWc6IFwi8J+HufCfh79cIiB9LFxuICAgIFwic3hcIjogeyBsYWJlbDogXCJTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpXCIsIGZsYWc6IFwi8J+HuPCfh71cIiB9LFxuICAgIFwic3lcIjogeyBsYWJlbDogXCJTeXJpYW4gQXJhYiBSZXB1YmxpY1wiLCBmbGFnOiBcIvCfh7jwn4e+XCIgfSxcbiAgICBcInN6XCI6IHsgbGFiZWw6IFwiRXN3YXRpbmlcIiwgZmxhZzogXCLwn4e48J+Hv1wiIH0sXG4gICAgXCJ0YVwiOiB7IGxhYmVsOiBcIlRhbWlsXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwidGNcIjogeyBsYWJlbDogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIiwgZmxhZzogXCLwn4e58J+HqFwiIH0sXG4gICAgXCJ0ZFwiOiB7IGxhYmVsOiBcIkNoYWRcIiwgZmxhZzogXCLwn4e58J+HqVwiIH0sXG4gICAgXCJ0ZVwiOiB7IGxhYmVsOiBcIlRlbHVndVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcInRmXCI6IHsgbGFiZWw6IFwiRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzXCIsIGZsYWc6IFwi8J+HufCfh6tcIiB9LFxuICAgIFwidGdcIjogeyBsYWJlbDogXCJUYWppa1wiLCBmbGFnOiBcIvCfh7nwn4evXCIgfSxcbiAgICBcInRoXCI6IHsgbGFiZWw6IFwiVGhhaVwiLCBmbGFnOiBcIvCfh7nwn4etXCIgfSxcbiAgICBcInRpXCI6IHsgbGFiZWw6IFwiVGlncmlueWFcIiwgZmxhZzogXCLwn4eq8J+Ht1wiIH0sXG4gICAgXCJ0alwiOiB7IGxhYmVsOiBcIlRhamlraXN0YW5cIiwgZmxhZzogXCLwn4e58J+Hr1wiIH0sXG4gICAgXCJ0a1wiOiB7IGxhYmVsOiBcIlR1cmttZW5cIiwgZmxhZzogXCLwn4e58J+HslwiIH0sXG4gICAgXCJ0bFwiOiB7IGxhYmVsOiBcIlRhZ2Fsb2dcIiwgZmxhZzogXCLwn4e18J+HrVwiIH0sXG4gICAgXCJ0bVwiOiB7IGxhYmVsOiBcIlR1cmttZW5pc3RhblwiLCBmbGFnOiBcIvCfh7nwn4eyXCIgfSxcbiAgICBcInRuXCI6IHsgbGFiZWw6IFwiVHN3YW5hXCIsIGZsYWc6IFwi8J+Hp/Cfh7xcIiB9LFxuICAgIFwidG9cIjogeyBsYWJlbDogXCJUb25nYSAoVG9uZ2EgSXNsYW5kcylcIiwgZmxhZzogXCLwn4e58J+HtFwiIH0sXG4gICAgXCJ0clwiOiB7IGxhYmVsOiBcIlR1cmtpc2hcIiwgZmxhZzogXCLwn4e58J+Ht1wiIH0sXG4gICAgXCJ0c1wiOiB7IGxhYmVsOiBcIlRzb25nYVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInR0XCI6IHsgbGFiZWw6IFwiVGF0YXJcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJ0dlwiOiB7IGxhYmVsOiBcIlR1dmFsdVwiLCBmbGFnOiBcIvCfh7nwn4e7XCIgfSxcbiAgICBcInR3XCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoVHJhZGl0aW9uYWwpXCIsIGZsYWc6IFwi8J+HufCfh7xcIiB9LFxuICAgIFwidHlcIjogeyBsYWJlbDogXCJUYWhpdGlhblwiLCBmbGFnOiBcIvCfh7Xwn4erXCIgfSxcbiAgICBcInR6XCI6IHsgbGFiZWw6IFwiVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZlwiLCBmbGFnOiBcIvCfh7nwn4e/XCIgfSxcbiAgICBcInVhXCI6IHsgbGFiZWw6IFwiVWtyYWluaWFuXCIsIGZsYWc6IFwi8J+HuvCfh6ZcIiB9LFxuICAgIFwidWdcIjogeyBsYWJlbDogXCJVeWdodXJcIiwgZmxhZzogXCLwn4eo8J+Hs1wiIH0sXG4gICAgXCJ1a1wiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFVLKVwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcInVrLXVhXCI6IHsgbGFiZWw6IFwiVWtyYWluaWFuIChVa3JhaW5lKVwiLCBmbGFnOiBcIvCfh7rwn4emXCIgfSxcbiAgICBcInVtXCI6IHsgbGFiZWw6IFwiVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HuvCfh7JcIiB9LFxuICAgIFwidXJcIjogeyBsYWJlbDogXCJVcmR1XCIsIGZsYWc6IFwi8J+HtfCfh7BcIiB9LFxuICAgIFwidXNcIjogeyBsYWJlbDogXCJFbmdsaXNoIChVUylcIiwgZmxhZzogXCLwn4e68J+HuFwiIH0sXG4gICAgXCJ1eVwiOiB7IGxhYmVsOiBcIlVydWd1YXlcIiwgZmxhZzogXCLwn4e68J+HvlwiIH0sXG4gICAgXCJ1elwiOiB7IGxhYmVsOiBcIlV6YmVrXCIsIGZsYWc6IFwi8J+HuvCfh79cIiB9LFxuICAgIFwidmFcIjogeyBsYWJlbDogXCJIb2x5IFNlZVwiLCBmbGFnOiBcIvCfh7vwn4emXCIgfSxcbiAgICBcInZjXCI6IHsgbGFiZWw6IFwiU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXNcIiwgZmxhZzogXCLwn4e78J+HqFwiIH0sXG4gICAgXCJ2ZVwiOiB7IGxhYmVsOiBcIlZlbmRhXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwidmdcIjogeyBsYWJlbDogXCJWaXJnaW4gSXNsYW5kcyAoQnJpdGlzaClcIiwgZmxhZzogXCLwn4e78J+HrFwiIH0sXG4gICAgXCJ2aVwiOiB7IGxhYmVsOiBcIlZpZXRuYW1lc2VcIiwgZmxhZzogXCLwn4e78J+Hs1wiIH0sXG4gICAgXCJ2blwiOiB7IGxhYmVsOiBcIlZpZXQgTmFtXCIsIGZsYWc6IFwi8J+Hu/Cfh7NcIiB9LFxuICAgIFwidm9cIjogeyBsYWJlbDogXCJWb2xhcMO8a1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwidnVcIjogeyBsYWJlbDogXCJWYW51YXR1XCIsIGZsYWc6IFwi8J+Hu/Cfh7pcIiB9LFxuICAgIFwid2FcIjogeyBsYWJlbDogXCJXYWxsb29uXCIsIGZsYWc6IFwi8J+Hp/Cfh6pcIiB9LFxuICAgIFwid2ZcIjogeyBsYWJlbDogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLCBmbGFnOiBcIvCfh7zwn4erXCIgfSxcbiAgICBcIndvXCI6IHsgbGFiZWw6IFwiV29sb2ZcIiwgZmxhZzogXCLwn4e48J+Hs1wiIH0sXG4gICAgXCJ3c1wiOiB7IGxhYmVsOiBcIlNhbW9hXCIsIGZsYWc6IFwi8J+HvPCfh7hcIiB9LFxuICAgIFwieGhcIjogeyBsYWJlbDogXCJYaG9zYVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInllXCI6IHsgbGFiZWw6IFwiWWVtZW5cIiwgZmxhZzogXCLwn4e+8J+HqlwiIH0sXG4gICAgXCJ5aVwiOiB7IGxhYmVsOiBcIllpZGRpc2hcIiwgZmxhZzogXCLwn4eu8J+HsVwiIH0sXG4gICAgXCJ5b1wiOiB7IGxhYmVsOiBcIllvcnViYVwiLCBmbGFnOiBcIvCfh7Pwn4esXCIgfSxcbiAgICBcInl0XCI6IHsgbGFiZWw6IFwiTWF5b3R0ZVwiLCBmbGFnOiBcIvCfh77wn4e5XCIgfSxcbiAgICBcInphXCI6IHsgbGFiZWw6IFwiWmh1YW5nXCIsIGZsYWc6IFwi8J+HqPCfh7NcIiB9LFxuICAgIFwiemhcIjogeyBsYWJlbDogXCJDaGluZXNlXCIsIGZsYWc6IFwi8J+HqPCfh7NcIiB9LFxuICAgIFwiemgtY25cIjogeyBsYWJlbDogXCJDaGluZXNlIChTaW1wbGlmaWVkKVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcInpoLWhrXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcInpoLW1vXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoTWFjYXUpXCIsIGZsYWc6IFwi8J+HsvCfh7RcIiB9LFxuICAgIFwiemgtc2dcIjogeyBsYWJlbDogXCJDaGluZXNlIChTaW5nYXBvcmUpXCIsIGZsYWc6IFwi8J+HuPCfh6xcIiB9LFxuICAgIFwiemgtdHdcIjogeyBsYWJlbDogXCJDaGluZXNlIChUcmFkaXRpb25hbClcIiwgZmxhZzogXCLwn4e58J+HvFwiIH0sXG4gICAgXCJ6bVwiOiB7IGxhYmVsOiBcIlphbWJpYVwiLCBmbGFnOiBcIvCfh7/wn4eyXCIgfSxcbiAgICBcInp1XCI6IHsgbGFiZWw6IFwiWnVsdVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInp3XCI6IHsgbGFiZWw6IFwiWmltYmFid2VcIiwgZmxhZzogXCLwn4e/8J+HvFwiIH1cbiAgfTtcblxuICAvKipcbiAgICogQ3JhZnRlciBmb3Jtcy1lbmdpbmUgbGF5cyBvdXQgc2VjdGlvbnMgYXMgYC5wYW5lbC5wYW5lbC1kZWZhdWx0YCBjaGlsZHJlbiBvZiBgLnBhbmVsLWdyb3VwYFxuICAgKiAoc3RhbmRhcmQgZm9ybSkgb3IgdXNlcyBgI2ljZS1jb250YWluZXJgIChJQ0UpLiBSZXBhcmVudCB0aGlzIGZpZWxkJ3MgYC5jc3R1ZGlvLWZvcm0tZmllbGQtY29udGFpbmVyYFxuICAgKiBzbyBpdCBhbHdheXMgcmVuZGVycyBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGZpcnN0IHNlY3Rpb24gY29udGFpbmVyLCBubyBtYXR0ZXIgd2hlcmUgdGhlIGZpZWxkXG4gICAqIGFwcGVhcnMgaW4gdGhlIGZvcm0gZGVmaW5pdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIHBpblRyYW5zbGF0aW9uVmVyc2lvbnNGaWVsZFRvVG9wT2ZGb3JtKGZvcm0sIGNvbnRhaW5lckVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZm9ybSB8fCAhY29udGFpbmVyRWwgfHwgdHlwZW9mIGNvbnRhaW5lckVsLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY29udGFpbmVyRWwuY2xvc2VzdChcIi5jc3R1ZGlvLWZvcm0tcmVwZWF0LWNvbnRhaW5lclwiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciByb3cgPSBjb250YWluZXJFbC5jbG9zZXN0KFwiLmNzdHVkaW8tZm9ybS1maWVsZC1jb250YWluZXJcIik7XG4gICAgICBpZiAoIXJvdykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWZvcm0uc2VjdGlvbnMgfHwgZm9ybS5zZWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0U2VjdGlvbiA9IGZvcm0uc2VjdGlvbnNbMF07XG4gICAgICBpZiAoIWZpcnN0U2VjdGlvbiB8fCAhZmlyc3RTZWN0aW9uLmNvbnRhaW5lckVsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hcmtlciA9IGZpcnN0U2VjdGlvbi5jb250YWluZXJFbDtcbiAgICAgIHZhciBwYXJlbnQgPSBtYXJrZXIucGFyZW50Tm9kZTtcbiAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvdy5wYXJlbnROb2RlID09PSBwYXJlbnQgJiYgcm93Lm5leHRTaWJsaW5nID09PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHJvdywgbWFya2VyKTtcbiAgICAgIHJvdy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEycHhcIjtcbiAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0aW9uLXRyYW5zbGF0aW9uLXZlcnNpb25zLXBpbm5lZFwiLCBcInRydWVcIik7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIC8qKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8bnVsbH0gKi9cbiAgZnVuY3Rpb24gZmluZEZvcm1GaWVsZHNDb21wYXJlSG9zdChmb3JtLCBjb250cm9sQ29udGFpbmVyRWwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGZvcm0gJiYgZm9ybS5zZWN0aW9ucyAmJiBmb3JtLnNlY3Rpb25zWzBdICYmIGZvcm0uc2VjdGlvbnNbMF0uY29udGFpbmVyRWwpIHtcbiAgICAgICAgdmFyIHNlYyA9IGZvcm0uc2VjdGlvbnNbMF0uY29udGFpbmVyRWw7XG4gICAgICAgIGlmIChzZWMuY2xvc2VzdCkge1xuICAgICAgICAgIC8qKiBQcmVmZXIgYC5wYW5lbC1ncm91cGAgb3ZlciBgI2ljZS1jb250YWluZXJgIHNvIHdlIHdyYXAgYWNjb3JkaW9uIHNlY3Rpb25zIG9ubHksIG5vdCB0aGUgd2hvbGUgSUNFIHNoZWxsIChmaXhlcyBjb250cm9scyBsaWtlIGZpbGUtbmFtZSAvIFhCKS4gKi9cbiAgICAgICAgICB2YXIgcGcgPSBzZWMuY2xvc2VzdChcIi5wYW5lbC1ncm91cFwiKTtcbiAgICAgICAgICBpZiAocGcpIHJldHVybiBwZztcbiAgICAgICAgICB2YXIgaWNlID0gc2VjLmNsb3Nlc3QoXCIjaWNlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICBpZiAoaWNlKSByZXR1cm4gaWNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWMucGFyZW50Tm9kZSAmJiBzZWMucGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMSA/IC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovIChzZWMucGFyZW50Tm9kZSkgOiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2xDb250YWluZXJFbCAmJiBjb250cm9sQ29udGFpbmVyRWwuY2xvc2VzdCkge1xuICAgICAgICB2YXIgcGcyID0gY29udHJvbENvbnRhaW5lckVsLmNsb3Nlc3QoXCIucGFuZWwtZ3JvdXBcIik7XG4gICAgICAgIGlmIChwZzIpIHJldHVybiBwZzI7XG4gICAgICAgIHZhciBpY2UyID0gY29udHJvbENvbnRhaW5lckVsLmNsb3Nlc3QoXCIjaWNlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgaWYgKGljZTIpIHJldHVybiBpY2UyO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUyKSB7fVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdW53cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWhvc3QgfHwgaG9zdC5kYXRhc2V0LnRyYW5zbGF0aW9uQ29tcGFyZVdyYXBwZWQgIT09IFwiMVwiKSByZXR1cm47XG4gICAgICB2YXIgcm93ID0gaG9zdC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGlmICghcm93IHx8ICFyb3cuY2xhc3NMaXN0IHx8ICFyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKFwidHJhbnNsYXRpb24tZm9ybS1jb21wYXJlLXJvd1wiKSkge1xuICAgICAgICBkZWxldGUgaG9zdC5kYXRhc2V0LnRyYW5zbGF0aW9uQ29tcGFyZVdyYXBwZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtYWluID0gcm93LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tZm9ybS1jb21wYXJlLW1haW5cIik7XG4gICAgICBpZiAobWFpbikge1xuICAgICAgICB3aGlsZSAobWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgICAgaG9zdC5hcHBlbmRDaGlsZChtYWluLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBob3N0LnJlbW92ZUNoaWxkKHJvdyk7XG4gICAgICBkZWxldGUgaG9zdC5kYXRhc2V0LnRyYW5zbGF0aW9uQ29tcGFyZVdyYXBwZWQ7XG4gICAgfSBjYXRjaCAoZTMpIHt9XG4gIH1cblxuICB2YXIgU01BUlRDT1BZX0NPTVBBUkVfV0lEVEhfTFMgPSBcInRyYW5zbGF0aW9uU291cmNlQ29tcGFyZVdpZHRoUHhcIjtcbiAgLyoqIFBlci1zaXRlOiBcIjFcIiA9IGNvbGxhcHNlZCBvbiBhbGwgZm9ybXMgZm9yIHRoYXQgc2l0ZS4gKi9cbiAgdmFyIFRSQU5TTEFUSU9OX1dJREdFVF9DT0xMQVBTRV9MU19QUkVGSVggPSBcInVpZ29vZGllcy50cmFuc2xhdGlvblZlcnNpb25zLmNvbGxhcHNlZC5cIjtcbiAgdmFyIFRSQU5TTEFUSU9OX1dJREdFVF9DT0xMQVBTRV9FVkVOVCA9IFwidWlnb29kaWVzLnRyYW5zbGF0aW9uVmVyc2lvbnMuY29sbGFwc2VkQ2hhbmdlZFwiO1xuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VTdG9yYWdlS2V5KHNpdGVJZCkge1xuICAgIHJldHVybiBUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfTFNfUFJFRklYICsgU3RyaW5nKHNpdGVJZCB8fCBcIl9cIikudHJpbSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VkKHNpdGVJZCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0eXBlb2YgbG9jYWxTdG9yYWdlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VTdG9yYWdlS2V5KHNpdGVJZCkpID09PSBcIjFcIlxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZChzaXRlSWQsIGNvbGxhcHNlZCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleShzaXRlSWQpLCBjb2xsYXBzZWQgPyBcIjFcIiA6IFwiMFwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlTHMpIHt9XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuZGlzcGF0Y2hFdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudChUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfRVZFTlQsIHtcbiAgICAgICAgICAgIGRldGFpbDogeyBzaXRlSWQ6IFN0cmluZyhzaXRlSWQgfHwgXCJcIikudHJpbSgpLCBjb2xsYXBzZWQ6ICEhY29sbGFwc2VkIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVFdikge31cbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5U291cmNlUGFuZVdpZHRoUHgobGVmdEVsLCB0b3RhbFJvd1dpZHRoUHgsIHdpZHRoUHgpIHtcbiAgICB2YXIgbWluVyA9IDIwMDtcbiAgICB2YXIgbWF4VyA9IE1hdGgubWF4KG1pblcgKyA4MCwgTWF0aC5yb3VuZCh0b3RhbFJvd1dpZHRoUHgpIC0gMjYwKTtcbiAgICB2YXIgdyA9IE1hdGgubWF4KG1pblcsIE1hdGgubWluKG1heFcsIE1hdGgucm91bmQod2lkdGhQeCkpKTtcbiAgICBsZWZ0RWwuc3R5bGUuZmxleCA9IFwiMCAwIFwiICsgdyArIFwicHhcIjtcbiAgICBsZWZ0RWwuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuICAgIGxlZnRFbC5zdHlsZS5tYXhXaWR0aCA9IFwibm9uZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEluaXRpYWxTb3VyY2VQYW5lV2lkdGhQeChob3N0V2lkdGhQeCkge1xuICAgIHZhciBtYXhBbGxvd2VkID0gTWF0aC5tYXgoMjgwLCBNYXRoLnJvdW5kKGhvc3RXaWR0aFB4KSAtIDI2MCk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBzID0gdHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTTUFSVENPUFlfQ09NUEFSRV9XSURUSF9MUyk7XG4gICAgICB2YXIgbiA9IHBhcnNlSW50KHMsIDEwKTtcbiAgICAgIGlmICghaXNOYU4obikgJiYgbiA+PSAyMDAgJiYgbiA8PSBtYXhBbGxvd2VkKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUwKSB7fVxuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLmZsb29yKGhvc3RXaWR0aFB4ICogMC40NCksIDYwMCwgbWF4QWxsb3dlZCk7XG4gIH1cblxuICAvKiogRHJhZ2dhYmxlIHZlcnRpY2FsIHNwbGl0dGVyIGJldHdlZW4gc291cmNlIHBhbmUgYW5kIG1haW4gZm9ybSBjb2x1bW4uICovXG4gIGZ1bmN0aW9uIGF0dGFjaFNtYXJ0Y29weUNvbXBhcmVTcGxpdHRlcihyb3cpIHtcbiAgICB2YXIgc3BsaXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNwbGl0dGVyLmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tZm9ybS1jb21wYXJlLXNwbGl0dGVyXCI7XG4gICAgc3BsaXR0ZXIuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInNlcGFyYXRvclwiKTtcbiAgICBzcGxpdHRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLW9yaWVudGF0aW9uXCIsIFwidmVydGljYWxcIik7XG4gICAgc3BsaXR0ZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkRyYWcgdG8gcmVzaXplIHNvdXJjZSBwYW5lbCB3aWR0aFwiKTtcbiAgICBzcGxpdHRlci50YWJJbmRleCA9IDA7XG4gICAgc3BsaXR0ZXIuc3R5bGUuY3NzVGV4dCA9XG4gICAgICBcImZsZXg6MCAwIDEwcHg7d2lkdGg6MTBweDtjdXJzb3I6Y29sLXJlc2l6ZTthbGlnbi1zZWxmOnN0cmV0Y2g7dG91Y2gtYWN0aW9uOm5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZDojZTllY2VmO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgI2NmZDRkYjtcIjtcbiAgICBzcGxpdHRlci5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZS5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBsZWZ0RWwgPSByb3cucXVlcnlTZWxlY3RvcihcIi50cmFuc2xhdGlvbi1zb3VyY2UtY29tcGFyZS1pZnJhbWUtaG9zdFwiKTtcbiAgICAgIGlmICghbGVmdEVsKSByZXR1cm47XG4gICAgICB2YXIgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgdmFyIHN0YXJ0VyA9IGxlZnRFbC5vZmZzZXRXaWR0aDtcbiAgICAgIHZhciBtaW5XID0gMjAwO1xuICAgICAgZnVuY3Rpb24gZ2V0TWF4VygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pblcgKyA4MCwgTWF0aC5yb3VuZChyb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIC0gMjYwKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHNwbGl0dGVyLnNldFBvaW50ZXJDYXB0dXJlKGUucG9pbnRlcklkKTtcbiAgICAgIH0gY2F0Y2ggKGNhcCkge31cbiAgICAgIGZ1bmN0aW9uIG9uTW92ZShldikge1xuICAgICAgICB2YXIgZHggPSBldi5jbGllbnRYIC0gc3RhcnRYO1xuICAgICAgICB2YXIgbncgPSBzdGFydFcgKyBkeDtcbiAgICAgICAgdmFyIG1heFcgPSBnZXRNYXhXKCk7XG4gICAgICAgIGlmIChudyA8IG1pblcpIG53ID0gbWluVztcbiAgICAgICAgaWYgKG53ID4gbWF4VykgbncgPSBtYXhXO1xuICAgICAgICBsZWZ0RWwuc3R5bGUuZmxleCA9IFwiMCAwIFwiICsgbncgKyBcInB4XCI7XG4gICAgICAgIGxlZnRFbC5zdHlsZS53aWR0aCA9IG53ICsgXCJweFwiO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG9uTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgb25VcCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIG9uVXApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNwbGl0dGVyLnJlbGVhc2VQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgIH0gY2F0Y2ggKHJlbCkge31cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU01BUlRDT1BZX0NPTVBBUkVfV0lEVEhfTFMsIFN0cmluZyhsZWZ0RWwub2Zmc2V0V2lkdGgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7fVxuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIG9uVXApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJjYW5jZWxcIiwgb25VcCk7XG4gICAgfSk7XG4gICAgcm93LmFwcGVuZENoaWxkKHNwbGl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHJlYWQtb25seSBzb3VyY2UgaWZyYW1lIHRvIHRoZSBsZWZ0IG9mIGFsbCBjdXJyZW50IGZvcm0gZmllbGRzIChzZWN0aW9ucyArIHBpbm5lZCB3aWRnZXRzKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlmcmFtZVNyY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aExhYmVsXG4gICAqL1xuICBmdW5jdGlvbiB3cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCwgaWZyYW1lU3JjLCBwYXRoTGFiZWwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFob3N0IHx8ICFpZnJhbWVTcmMpIHJldHVybjtcbiAgICAgIGlmIChob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZCA9PT0gXCIxXCIpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nSWZyYW1lID0gaG9zdC5xdWVyeVNlbGVjdG9yKFwiLnRyYW5zbGF0aW9uLXNvdXJjZS1jb21wYXJlLWlmcmFtZS1ob3N0IGlmcmFtZVwiKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nSWZyYW1lKSB7XG4gICAgICAgICAgZXhpc3RpbmdJZnJhbWUuc3JjID0gaWZyYW1lU3JjO1xuICAgICAgICAgIGV4aXN0aW5nSWZyYW1lLnN0eWxlLmNzc1RleHQgPVxuICAgICAgICAgICAgXCJmbGV4OjEgMSBhdXRvO21pbi1oZWlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JvcmRlcjoxcHggc29saWQgI2NmZDRkYjtib3JkZXItcmFkaXVzOjZweDtiYWNrZ3JvdW5kOiNmZmY7Ym94LXNpemluZzpib3JkZXItYm94O1wiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlRWwgPSBob3N0LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtcGF0aFwiKTtcbiAgICAgICAgaWYgKGNvZGVFbCkgY29kZUVsLnRleHRDb250ZW50ID0gcGF0aExhYmVsIHx8IFwiXCI7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgcm93LmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tZm9ybS1jb21wYXJlLXJvd1wiO1xuICAgICAgcm93LnN0eWxlLmNzc1RleHQgPVxuICAgICAgICBcImRpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24taXRlbXM6c3RyZXRjaDtnYXA6OHB4O3dpZHRoOjEwMCU7bWluLWhlaWdodDowO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcblxuICAgICAgdmFyIGhvc3RXID0gaG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5pbm5lcldpZHRoIDogODAwKSB8fCA4MDA7XG4gICAgICB2YXIgbGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBsZWZ0LmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtaWZyYW1lLWhvc3RcIjtcbiAgICAgIGxlZnQuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgIFwiZmxleDowIDAgYXV0bztkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo4cHg7bWluLWhlaWdodDowO2FsaWduLXNlbGY6c3RyZXRjaDtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCI7XG4gICAgICBhcHBseVNvdXJjZVBhbmVXaWR0aFB4KGxlZnQsIGhvc3RXLCByZWFkSW5pdGlhbFNvdXJjZVBhbmVXaWR0aFB4KGhvc3RXKSk7XG5cbiAgICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPVxuICAgICAgICBcImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjhweDtmbGV4LXdyYXA6d3JhcDtmbGV4LXNocmluazowO1wiO1xuICAgICAgdmFyIHRpdGxlQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGl0bGVCbG9jay5zdHlsZS5taW5XaWR0aCA9IFwiMFwiO1xuICAgICAgdmFyIHN0cm9uZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIik7XG4gICAgICBzdHJvbmcuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjEycHg7Y29sb3I6IzIxMjUyOTtcIjtcbiAgICAgIHN0cm9uZy50ZXh0Q29udGVudCA9IFwiU291cmNlIChyZWFkLW9ubHkpXCI7XG4gICAgICB0aXRsZUJsb2NrLmFwcGVuZENoaWxkKHN0cm9uZyk7XG4gICAgICB2YXIgc3ViID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHN1Yi5jbGFzc05hbWUgPSBcInRleHQtbXV0ZWRcIjtcbiAgICAgIHN1Yi5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MTBweDttYXJnaW4tdG9wOjJweDt3b3JkLWJyZWFrOmJyZWFrLWFsbDtcIjtcbiAgICAgIHZhciBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNvZGVcIik7XG4gICAgICBjb2RlLmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtcGF0aFwiO1xuICAgICAgY29kZS5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MTBweDtcIjtcbiAgICAgIGNvZGUudGV4dENvbnRlbnQgPSBwYXRoTGFiZWwgfHwgXCJcIjtcbiAgICAgIHN1Yi5hcHBlbmRDaGlsZChjb2RlKTtcbiAgICAgIHRpdGxlQmxvY2suYXBwZW5kQ2hpbGQoc3ViKTtcbiAgICAgIHZhciBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjbG9zZUJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgIGNsb3NlQnRuLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiO1xuICAgICAgY2xvc2VCdG4udGV4dENvbnRlbnQgPSBcIkNsb3NlXCI7XG4gICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInRyYW5zbGF0aW9uOmNsb3NlLXNvdXJjZS1jb21wYXJlXCIpKTtcbiAgICAgICAgfSBjYXRjaCAoZTQpIHt9XG4gICAgICB9KTtcbiAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZUJsb2NrKTtcbiAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgICAgaWZyYW1lLnRpdGxlID0gXCJTb3VyY2UgaXRlbSDigJQgcmVhZC1vbmx5IGZvcm1cIjtcbiAgICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVTcmM7XG4gICAgICBpZnJhbWUuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgIFwiZmxleDoxIDEgYXV0bzttaW4taGVpZ2h0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtib3JkZXI6MXB4IHNvbGlkICNjZmQ0ZGI7Ym9yZGVyLXJhZGl1czo2cHg7YmFja2dyb3VuZDojZmZmO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcbiAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuICAgICAgdmFyIG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWFpbi5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1tYWluXCI7XG4gICAgICBtYWluLnN0eWxlLmNzc1RleHQgPSBcImZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowO3dpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O1wiO1xuICAgICAgd2hpbGUgKGhvc3QuZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGhvc3QuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICByb3cuYXBwZW5kQ2hpbGQobGVmdCk7XG4gICAgICBhdHRhY2hTbWFydGNvcHlDb21wYXJlU3BsaXR0ZXIocm93KTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChtYWluKTtcbiAgICAgIGhvc3QuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgIGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkID0gXCIxXCI7XG4gICAgfSBjYXRjaCAoZTUpIHt9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2NhbGVMaXN0KCkge1xuICAgIHJldHVybiBbXG4gICAgICBcImVuXCIsXG4gICAgICBcImVzXCIsXG4gICAgICBcImphXCIsXG4gICAgICBcInpoXCIsXG4gICAgICBcInVzXCIsXG4gICAgICBcInVrXCIsXG4gICAgICBcImRlXCIsXG4gICAgICBcImZyXCIsXG4gICAgICBcIml0XCIsXG4gICAgICBcImRrXCIsXG4gICAgICBcImZpXCIsXG4gICAgICBcIm5sXCIsXG4gICAgICBcIm5vXCIsXG4gICAgICBcInJ1XCIsXG4gICAgICBcInNlXCIsXG4gICAgICBcImJyXCIsXG4gICAgICBcImVsXCIsXG4gICAgICBcImpwXCIsXG4gICAgICBcInB0XCIsXG4gICAgICBcImtvXCIsXG4gICAgICBcImFyXCIsXG4gICAgICBcInBsXCIsXG4gICAgICBcInRyXCIsXG4gICAgICBcInZpXCJcbiAgICBdO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxlRnJvbVBhdGgocGF0aCkge1xuICAgIGlmICghcGF0aCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHBhcnRzID0gcGF0aFxuICAgICAgLnJlcGxhY2UoL15cXC9zaXRlXFwvW14vXStcXC8vaSwgXCJcIilcbiAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIGxpc3QgPSBnZXRMb2NhbGVMaXN0KCk7XG4gICAgdmFyIGZpcnN0ID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoUkVTRVJWRURfRklSU1RfU0VHTUVOVFNbZmlyc3RdICYmIHBhcnRzWzFdKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcGFydHNbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChsaXN0LmluZGV4T2YoY2FuZGlkYXRlKSA+PSAwKSByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgaWYgKC9eW2Etel17Mn0oLVthLXowLTldezEsOH0pPyQvaS50ZXN0KHBhcnRzWzFdKSkgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBpZiAoUkVTRVJWRURfRklSU1RfU0VHTUVOVFNbZmlyc3RdKSByZXR1cm4gXCJcIjtcbiAgICBpZiAobGlzdC5pbmRleE9mKGZpcnN0KSA+PSAwKSByZXR1cm4gZmlyc3Q7XG4gICAgaWYgKC9eW2Etel17Mn0oLVthLXowLTldezEsOH0pPyQvaS50ZXN0KHBhcnRzWzBdKSkgcmV0dXJuIGZpcnN0O1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgLyoqIFNhbWUgYXMgdHJhbnNsYXRpb24tY29tcG9uZW50cyB7QGNvZGUgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlfSAoYXIg4oaUIGFyLXNhLCB6aCDihpQgemgtY24pLiAqL1xuICBmdW5jdGlvbiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUoYSwgYikge1xuICAgIHZhciBzID0gU3RyaW5nKGEgfHwgXCJcIilcbiAgICAgIC50cmltKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgvXy9nLCBcIi1cIik7XG4gICAgdmFyIGMgPSBTdHJpbmcoYiB8fCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbiAgICBpZiAoIXMgfHwgIWMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocyA9PT0gYykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHMuc3RhcnRzV2l0aChjICsgXCItXCIpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoYy5zdGFydHNXaXRoKHMgKyBcIi1cIikpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ldGFGb3JQYXRoTG9jYWxlKGFjdGl2ZU1ldGEsIGxvYykge1xuICAgIHZhciBsayA9IFN0cmluZyhsb2MgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoYWN0aXZlTWV0YSAmJiBhY3RpdmVNZXRhW2xrXSkgcmV0dXJuIGFjdGl2ZU1ldGFbbGtdO1xuICAgIGlmICghYWN0aXZlTWV0YSkgcmV0dXJuIG51bGw7XG4gICAgZm9yICh2YXIga2V5IGluIGFjdGl2ZU1ldGEpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFjdGl2ZU1ldGEsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShsaywga2V5KSkgcmV0dXJuIGFjdGl2ZU1ldGFba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGlvbkxvY2FsZUFscmVhZHlQcmVzZW50KHRyYW5zbGF0ZWRMb2NhbGVzLCBsb2MpIHtcbiAgICB2YXIgbGsgPSBTdHJpbmcobG9jIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHRyYW5zbGF0ZWRMb2NhbGVzW2xrXSkgcmV0dXJuIHRydWU7XG4gICAgZm9yICh2YXIgc2VnIGluIHRyYW5zbGF0ZWRMb2NhbGVzKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0cmFuc2xhdGVkTG9jYWxlcywgc2VnKSkgY29udGludWU7XG4gICAgICBpZiAoIXRyYW5zbGF0ZWRMb2NhbGVzW3NlZ10pIGNvbnRpbnVlO1xuICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShzZWcsIGxrKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBOb3JtYWxpemUgcmVwbyBwYXRocyBmb3IgZXF1YWxpdHkgKHNsYXNoZXMsIG5vIHRyYWlsaW5nIHNsYXNoKS4gKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplU3R1ZGlvUGF0aChwKSB7XG4gICAgcmV0dXJuIFN0cmluZyhwIHx8IFwiXCIpXG4gICAgICAucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcbiAgICAgIC5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TXVsdGlMb2NhbGVSb290RGlyKGZ1bGxQYXRoKSB7XG4gICAgaWYgKCFmdWxsUGF0aCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG0gPSBmdWxsUGF0aC5tYXRjaCgvXihcXC9zaXRlXFwvW14vXStcXC8oPzp3ZWJzaXRlfGNvbXBvbmVudHMpKSg/PVxcL3wkKS9pKTtcbiAgICBpZiAobSkgcmV0dXJuIG1bMV07XG4gICAgbSA9IGZ1bGxQYXRoLm1hdGNoKC9eKFxcL3NpdGVcXC8oPzp3ZWJzaXRlfGNvbXBvbmVudHMpKSg/PVxcL3wkKS9pKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3VmZml4QWZ0ZXJMb2NhbGUoZnVsbFBhdGgsIHJvb3REaXIsIGxvY2FsZSkge1xuICAgIGlmICghZnVsbFBhdGggfHwgIXJvb3REaXIgfHwgIWxvY2FsZSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHAgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArIFwiL1wiICsgbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGxvd2VyID0gZnVsbFBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgcGwgPSBwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGxvd2VyID09PSBwbCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHByZWZpeCA9IHBsICsgXCIvXCI7XG4gICAgaWYgKGxvd2VyLnN0YXJ0c1dpdGgocHJlZml4KSkge1xuICAgICAgcmV0dXJuIGZ1bGxQYXRoLnNsaWNlKHAubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBwYXRoRm9yVGFyZ2V0TG9jYWxlKHJvb3REaXIsIGxvY2FsZSwgc3VmZml4KSB7XG4gICAgdmFyIHIgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB2YXIgc3VmID0gc3VmZml4ID09PSBcIlwiID8gXCJcIiA6IHN1ZmZpeC5zdGFydHNXaXRoKFwiL1wiKSA/IHN1ZmZpeCA6IFwiL1wiICsgc3VmZml4O1xuICAgIHJldHVybiByICsgXCIvXCIgKyBsb2NhbGUudG9Mb3dlckNhc2UoKSArIHN1ZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmRlciByb290RGlyICgvc2l0ZS97aWR9L3dlYnNpdGUgb3IgLi4uL2NvbXBvbmVudHMpLCBmaXJzdCBwYXRoIHNlZ21lbnQgaXMgdGhlIGxvY2FsZSBmb2xkZXI7XG4gICAqIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhhdCBpcyB0aGUgbWlycm9yZWQgc3VmZml4IGZvciBvdGhlciBsb2NhbGVzLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpIHtcbiAgICBpZiAoIWZvcm1QYXRoIHx8ICFyb290RGlyKSByZXR1cm4geyBzdWZmaXg6IG51bGwgfTtcbiAgICB2YXIgciA9IHJvb3REaXIucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIHZhciBmcCA9IFN0cmluZyhmb3JtUGF0aCkucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XG4gICAgdmFyIHJsID0gci50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBmbCA9IGZwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGZsID09PSBybCkgcmV0dXJuIHsgc3VmZml4OiBcIlwiIH07XG4gICAgaWYgKGZsLmluZGV4T2YocmwgKyBcIi9cIikgIT09IDApIHJldHVybiB7IHN1ZmZpeDogbnVsbCB9O1xuICAgIHZhciByZXN0ID0gZnAuc2xpY2Uoci5sZW5ndGgpO1xuICAgIGlmIChyZXN0LmNoYXJBdCgwKSA9PT0gXCIvXCIpIHJlc3QgPSByZXN0LnNsaWNlKDEpO1xuICAgIHZhciBwYXJ0cyA9IHJlc3Quc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSByZXR1cm4geyBzdWZmaXg6IFwiXCIgfTtcbiAgICB2YXIgc3VmZml4UGFydHMgPSBwYXJ0cy5zbGljZSgxKTtcbiAgICBpZiAoc3VmZml4UGFydHMubGVuZ3RoID09PSAwKSByZXR1cm4geyBzdWZmaXg6IFwiXCIgfTtcbiAgICByZXR1cm4geyBzdWZmaXg6IFwiL1wiICsgc3VmZml4UGFydHMuam9pbihcIi9cIikgfTtcbiAgfVxuXG4gIC8qKiBGaXJzdCBwYXRoIHNlZ21lbnQgdW5kZXIgcm9vdERpciAodGhlIGxvY2FsZSBmb2xkZXIpLCBsb3dlcmNhc2VkLiAqL1xuICBmdW5jdGlvbiBmaXJzdExvY2FsZVNlZ21lbnRVbmRlclJvb3QocGF0aCwgcm9vdERpcikge1xuICAgIGlmICghcGF0aCB8fCAhcm9vdERpcikgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHIgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB2YXIgZnAgPSBTdHJpbmcocGF0aCkucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XG4gICAgdmFyIHJsID0gci50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBmbCA9IGZwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGZsICE9PSBybCAmJiBmbC5pbmRleE9mKHJsICsgXCIvXCIpICE9PSAwKSByZXR1cm4gXCJcIjtcbiAgICB2YXIgcmVzdCA9IGZsID09PSBybCA/IFwiXCIgOiBmcC5zbGljZShyLmxlbmd0aCk7XG4gICAgaWYgKHJlc3QuY2hhckF0KDApID09PSBcIi9cIikgcmVzdCA9IHJlc3Quc2xpY2UoMSk7XG4gICAgdmFyIHNlZyA9IHJlc3Quc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKVswXSB8fCBcIlwiO1xuICAgIHJldHVybiBTdHJpbmcoc2VnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqIExvY2FsZXMgdGhhdCBhbHJlYWR5IGhhdmUgYSB0cmFuc2xhdGlvbiBpdGVtIChmcm9tIHJlcG8gcGF0aHMgdW5kZXIgcm9vdERpcikuICovXG4gIGZ1bmN0aW9uIGV4aXN0aW5nVHJhbnNsYXRpb25Mb2NhbGVLZXlzKHBhdGhzLCByb290RGlyLCBmb3JtUGF0aCkge1xuICAgIHZhciBrZXlzID0ge307XG4gICAgZnVuY3Rpb24gYWRkKHApIHtcbiAgICAgIHZhciBrID0gZmlyc3RMb2NhbGVTZWdtZW50VW5kZXJSb290KHAsIHJvb3REaXIpO1xuICAgICAgaWYgKGspIGtleXNba10gPSB0cnVlO1xuICAgIH1cbiAgICBhZGQoZm9ybVBhdGgpO1xuICAgIChwYXRocyB8fCBbXSkuZm9yRWFjaChhZGQpO1xuICAgIHJldHVybiBrZXlzO1xuICB9XG5cbiAgLyoqIFN0dWRpbyAvYXBpLzEvY29udGVudC9jb250ZW50LWV4aXN0cyDigJQgdW53cmFwIGNvbW1vbiByZXNwb25zZSBzaGFwZXMuICovXG4gIGZ1bmN0aW9uIHBhcnNlQ29udGVudEV4aXN0c1BheWxvYWQoYm9keSkge1xuICAgIGlmICghYm9keSkgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBjID0gYm9keS5jb250ZW50O1xuICAgIGlmIChjID09IG51bGwgJiYgYm9keS5yZXNwb25zZSkgYyA9IGJvZHkucmVzcG9uc2UuY29udGVudDtcbiAgICBpZiAoYyA9PSBudWxsICYmIGJvZHkucmVzdWx0KSBjID0gYm9keS5yZXN1bHQuY29udGVudDtcbiAgICBpZiAoYyA9PSBudWxsKSBjID0gYm9keS5leGlzdHM7XG4gICAgaWYgKHR5cGVvZiBjID09PSBcImJvb2xlYW5cIikgcmV0dXJuIGM7XG4gICAgaWYgKHR5cGVvZiBjID09PSBcInN0cmluZ1wiKSByZXR1cm4gU3RyaW5nKGMpLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiO1xuICAgIGlmICh0eXBlb2YgYyA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGMgIT09IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEF1dGhvcmluZyBiYXNlIGZvciAvYXBpLzEvc2VydmljZXMvYXBpLzEvY29udGVudC8uLi4gKHByZWYgcHJvcCBtYXkgYmUgZW1wdHkgb24gZmlyc3QgcGFpbnQpLiAqL1xuICBmdW5jdGlvbiByZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UocHJlZikge1xuICAgIHZhciBhID0gcHJlZiAmJiBTdHJpbmcocHJlZikucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIGlmIChhKSByZXR1cm4gYTtcbiAgICB0cnkge1xuICAgICAgYSA9IGdldEF1dGhvcmluZ0Jhc2UoKSAmJiBTdHJpbmcoZ2V0QXV0aG9yaW5nQmFzZSgpKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChhKSByZXR1cm4gYTtcbiAgICByZXR1cm4gKGdldFN0dWRpb0FwaUJhc2UoKSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBdXRob3JpbmdCYXNlKCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgY21zID0gd2luZG93LmNyYWZ0ZXJjbXM7XG4gICAgICBpZiAoY21zICYmIHR5cGVvZiBjbXMuZ2V0U3RvcmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgc3RvcmUgPSBjbXMuZ2V0U3RvcmUoKTtcbiAgICAgICAgaWYgKHN0b3JlICYmIHR5cGVvZiBzdG9yZS5nZXRTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdmFyIGVudiA9IHN0b3JlLmdldFN0YXRlKCkuZW52IHx8IHt9O1xuICAgICAgICAgIGlmIChlbnYuYXV0aG9yaW5nQmFzZSkgcmV0dXJuIGVudi5hdXRob3JpbmdCYXNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKiBTdHVkaW8gUkVTVCBiYXNlIChlLmcuIGh0dHBzOi8vaG9zdC9zdHVkaW8pIGZvciAvYXBpLzIvLi4uICovXG4gIGZ1bmN0aW9uIGdldFN0dWRpb0FwaUJhc2UoKSB7XG4gICAgdmFyIGIgPSBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgaWYgKGIpIHJldHVybiBiLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAodHlwZW9mIENTdHVkaW9BdXRob3JpbmdDb250ZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIENTdHVkaW9BdXRob3JpbmdDb250ZXh0LmJhc2VVcmkpIHtcbiAgICAgIHJldHVybiBTdHJpbmcoQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQuYmFzZVVyaSkucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIHRyYW5zcG9ydCBhcyBUcmFuc2xhdGlvbiAoYGFwcHMvdHJhbnNsYXRpb24vaW5kZXguanNgKTogYGNyYWZ0ZXJjbXMudXRpbHMuYWpheGBcbiAgICogbWVyZ2VzIEF1dGhvcml6YXRpb24gKEpXVCkgYW5kIG90aGVyIGdsb2JhbCBoZWFkZXJzIOKAlCByYXcgYGZldGNoYCBnZXRzIDQwMSBvbiBgL2FwaS8yLy4uLmAuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRDcmFmdGVyU3R1ZGlvQWpheCgpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGNtcyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmNyYWZ0ZXJjbXM7XG4gICAgICBpZiAoY21zICYmIGNtcy51dGlscyAmJiBjbXMudXRpbHMuYWpheCkge1xuICAgICAgICByZXR1cm4gY21zLnV0aWxzLmFqYXg7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRmV0Y2hIZWFkZXJzKGV4dHJhKSB7XG4gICAgdmFyIG91dCA9IE9iamVjdC5hc3NpZ24oe30sIGV4dHJhIHx8IHt9KTtcbiAgICB0cnkge1xuICAgICAgdmFyIGFqYXggPSBnZXRDcmFmdGVyU3R1ZGlvQWpheCgpO1xuICAgICAgaWYgKGFqYXggJiYgdHlwZW9mIGFqYXguZ2V0R2xvYmFsSGVhZGVycyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0LCBhamF4LmdldEdsb2JhbEhlYWRlcnMoKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB2YXIgbSA9XG4gICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQuY29va2llLm1hdGNoKC8oPzpefDtcXHMqKVhTUkYtVE9LRU49KFteO10rKS8pO1xuICAgIGlmIChtICYmICFvdXRbXCJYLVhTUkYtVE9LRU5cIl0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG91dFtcIlgtWFNSRi1UT0tFTlwiXSA9IGRlY29kZVVSSUNvbXBvbmVudChtWzFdKTtcbiAgICAgIH0gY2F0Y2ggKGUyKSB7fVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gdW53cmFwQWpheFJlc3BvbnNlKHJlcykge1xuICAgIGlmICghcmVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHJlcy5yZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzLnJlc3BvbnNlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgZnVuY3Rpb24gc3R1ZGlvQWpheEdldCh1cmwpIHtcbiAgICB2YXIgYWpheCA9IGdldENyYWZ0ZXJTdHVkaW9BamF4KCk7XG4gICAgaWYgKGFqYXggJiYgdHlwZW9mIGFqYXguZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGFqYXguZ2V0KHVybCkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgcmVzb2x2ZShyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgaGVhZGVyczogbWVyZ2VGZXRjaEhlYWRlcnMoeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuanNvbigpLnRoZW4oZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiByLnN0YXR1cywgcmVzcG9uc2U6IGpzb24gfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwYXJhbSBib2R5IHN0cmluZyBvciBvYmplY3QgKG9iamVjdCBpcyBKU09OLnN0cmluZ2lmaWVkKSAqL1xuICBmdW5jdGlvbiBzdHVkaW9BamF4UG9zdCh1cmwsIGJvZHksIGhlYWRlcnMpIHtcbiAgICB2YXIgYWpheCA9IGdldENyYWZ0ZXJTdHVkaW9BamF4KCk7XG4gICAgdmFyIHBheWxvYWQgPVxuICAgICAgYm9keSAhPSBudWxsICYmIHR5cGVvZiBib2R5ID09PSBcIm9iamVjdFwiID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiBib2R5ICE9IG51bGwgPyBTdHJpbmcoYm9keSkgOiBcIlwiO1xuICAgIHZhciBoID0gT2JqZWN0LmFzc2lnbih7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSwgaGVhZGVycyB8fCB7fSk7XG4gICAgaWYgKHR5cGVvZiBib2R5ID09PSBcIm9iamVjdFwiICYmIGJvZHkgIT0gbnVsbCAmJiAhaFtcIkNvbnRlbnQtVHlwZVwiXSkge1xuICAgICAgaFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICAgIH1cbiAgICBpZiAoYWpheCAmJiB0eXBlb2YgYWpheC5wb3N0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGFqYXgucG9zdCh1cmwsIHBheWxvYWQsIGgpLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBoZWFkZXJzOiBtZXJnZUZldGNoSGVhZGVycyhoKSxcbiAgICAgIGJvZHk6IHBheWxvYWRcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5qc29uKCkudGhlbihmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4geyBzdGF0dXM6IHIuc3RhdHVzLCByZXNwb25zZToganNvbiB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bndyYXBQbHVnaW5TY3JpcHRSZXN1bHRCb2R5KGJvZHkpIHtcbiAgICB2YXIgcCA9IGJvZHkgJiYgYm9keS5yZXN1bHQgIT09IHVuZGVmaW5lZCA/IGJvZHkucmVzdWx0IDogYm9keTtcbiAgICBpZiAocCAmJiB0eXBlb2YgcCA9PT0gXCJvYmplY3RcIiAmJiBwLnJlc3VsdCAhPSBudWxsICYmIHAub2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcCA9IHAucmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gcCAmJiB0eXBlb2YgcCA9PT0gXCJvYmplY3RcIiA/IHAgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hUcmFuc2xhdGlvblJlbW92ZUNhbmRpZGF0ZXMoc3R1ZGlvQmFzZSwgc2l0ZUlkLCBwYWdlUGF0aCkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKHN0dWRpb0Jhc2UgfHwgXCJcIikucmVwbGFjZSgvXFwvJC8sIFwiXCIpICtcbiAgICAgIFwiL2FwaS8yL3BsdWdpbi9zY3JpcHQvcGx1Z2lucy9vcmcvcmQvcGx1Z2luL3VpZ29vZGllcy90cmFuc2xhdGlvbi1yZW1vdmUtY2FuZGlkYXRlcy5wb3N0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheFBvc3QodXJsLCB7IHBhZ2VQYXRoOiBwYWdlUGF0aCB9LCB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgcCA9IHVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkoYm9keSk7XG4gICAgICAgIHJldHVybiBwIHx8IHsgb2s6IGZhbHNlLCBtZXNzYWdlOiBcIkVtcHR5IHJlc3BvbnNlXCIsIGNhbmRpZGF0ZXM6IFtdIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc3RUcmFuc2xhdGlvblJlbW92ZShzdHVkaW9CYXNlLCBzaXRlSWQsIHBhZ2VQYXRoLCBjb21wb25lbnRQYXRocywgZGVsZXRlUGFnZSkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKHN0dWRpb0Jhc2UgfHwgXCJcIikucmVwbGFjZSgvXFwvJC8sIFwiXCIpICtcbiAgICAgIFwiL2FwaS8yL3BsdWdpbi9zY3JpcHQvcGx1Z2lucy9vcmcvcmQvcGx1Z2luL3VpZ29vZGllcy90cmFuc2xhdGlvbi1yZW1vdmUucG9zdD9zaXRlSWQ9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCk7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KFxuICAgICAgdXJsLFxuICAgICAge1xuICAgICAgICBwYWdlUGF0aDogcGFnZVBhdGgsXG4gICAgICAgIGNvbXBvbmVudFBhdGhzOiBjb21wb25lbnRQYXRocyB8fCBbXSxcbiAgICAgICAgZGVsZXRlUGFnZTogZGVsZXRlUGFnZSAhPT0gZmFsc2VcbiAgICAgIH0sXG4gICAgICB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cbiAgICApXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgcCA9IHVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkoYm9keSk7XG4gICAgICAgIHJldHVybiBwIHx8IHsgb2s6IGZhbHNlLCBkZWxldGVkOiBbXSwgZmFpbGVkOiBbeyBwYXRoOiBcIlwiLCBtZXNzYWdlOiBcIkVtcHR5IHJlc3BvbnNlXCIgfV0gfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIFBhZ2UgaXRlbXMgb25seSAobm90IGNvbXBvbmVudHMgZm9sZGVyKTogc2hvdyBSZW1vdmUgdHJhbnNsYXRpb24gaW5zdGVhZCBvZiBvbmx5IOKLriBmb3Igbm9uLXNvdXJjZSByb3dzLiAqL1xuICBmdW5jdGlvbiBpc1BhZ2VUcmFuc2xhdGlvblJvdyh0YXJnZXRQYXRoLCBjb250ZW50VHlwZUlkKSB7XG4gICAgdmFyIGN0ID0gU3RyaW5nKGNvbnRlbnRUeXBlSWQgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChjdC5pbmRleE9mKFwiL3BhZ2UvXCIpID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgcCA9IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCkudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gcC5pbmRleE9mKFwiL3dlYnNpdGUvXCIpID49IDAgJiYgcC5lbmRzV2l0aChcIi54bWxcIik7XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0UGF0aHNGcm9tU2VhcmNoSXRlbXMoaXRlbXMpIHtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgaWYgKCFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoKSByZXR1cm4gb3V0O1xuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBwID0gaXRlbS5wYXRoIHx8IGl0ZW0ubG9jYWxJZCB8fCAoaXRlbS5pdGVtICYmIChpdGVtLml0ZW0ucGF0aCB8fCBpdGVtLml0ZW0ubG9jYWxJZCkpO1xuICAgICAgaWYgKHAgJiYgb3V0LmluZGV4T2YocCkgPT09IC0xKSBvdXQucHVzaChwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0dWRpbyBPcGVuU2VhcmNoOiBmaW5kIGFsbCBpbmRleGVkIGl0ZW1zIHNoYXJpbmcgdGhlIHNhbWUgdHJhbnNsYXRpb24gbGluZWFnZSBpZC5cbiAgICovXG4gIGZ1bmN0aW9uIGV4dHJhY3RQYXRoc0Zyb21QbHVnaW5SZXN1bHQoYm9keSkge1xuICAgIHZhciBwYXlsb2FkID0gYm9keSAmJiBib2R5LnJlc3VsdDtcbiAgICBpZiAocGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIiAmJiBwYXlsb2FkLnJlc3VsdCAhPSBudWxsICYmIHBheWxvYWQub2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGF5bG9hZCA9IHBheWxvYWQucmVzdWx0O1xuICAgIH1cbiAgICBpZiAoIXBheWxvYWQgfHwgdHlwZW9mIHBheWxvYWQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHBheWxvYWQgPSBib2R5ICYmIGJvZHkucmVzcG9uc2UgJiYgYm9keS5yZXNwb25zZS5yZXN1bHQ7XG4gICAgfVxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC5vaykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgaXRlbXMgPSBwYXlsb2FkLml0ZW1zIHx8IFtdO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdCkge1xuICAgICAgdmFyIHAgPSBpdCAmJiAoaXQubG9jYWxJZCB8fCBpdC5wYXRoKTtcbiAgICAgIGlmIChwICYmIG91dC5pbmRleE9mKHApID09PSAtMSkge1xuICAgICAgICBvdXQucHVzaChwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZpZXcgT3BlblNlYXJjaCAocGx1Z2luIEdyb292eSk6IHNhbWUgY29udGVudC10eXBlIGFuZCBsb2NhbGVTb3VyY2VJZF9zIG1hdGNoaW5nIGxpbmVhZ2Ugb3Igb2JqZWN0SWQuXG4gICAqL1xuICBmdW5jdGlvbiBmZXRjaFRyYW5zbGF0aW9uU2libGluZ3NGcm9tUGx1Z2luKHN0dWRpb0Jhc2UsIHNpdGVJZCwgY29udGVudFR5cGUsIGxvY2FsZVNvdXJjZUlkLCBvYmplY3RJZCkge1xuICAgIGlmICghc3R1ZGlvQmFzZSB8fCAhc2l0ZUlkIHx8ICFjb250ZW50VHlwZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIHZhciBsaWQgPSBsb2NhbGVTb3VyY2VJZCAmJiBTdHJpbmcobG9jYWxlU291cmNlSWQpLnRyaW0oKTtcbiAgICB2YXIgb2lkID0gb2JqZWN0SWQgJiYgU3RyaW5nKG9iamVjdElkKS50cmltKCk7XG4gICAgaWYgKCFsaWQgJiYgIW9pZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgc3R1ZGlvQmFzZSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tc2libGluZ3MucG9zdD9zaXRlSWQ9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImY29udGVudFR5cGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhjb250ZW50VHlwZSkudHJpbSgpKSArXG4gICAgICBcIiZsb2NhbGVTb3VyY2VJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQobGlkIHx8IFwiXCIpICtcbiAgICAgIFwiJm9iamVjdElkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChvaWQgfHwgXCJcIik7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KHVybCwgXCJcIiwgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihleHRyYWN0UGF0aHNGcm9tUGx1Z2luUmVzdWx0KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2hQYXRoc0J5TG9jYWxlU291cmNlSWQoc3R1ZGlvQmFzZSwgc2l0ZUlkLCBsb2NhbGVTb3VyY2VJZCkge1xuICAgIGlmICghc3R1ZGlvQmFzZSB8fCAhc2l0ZUlkIHx8ICFsb2NhbGVTb3VyY2VJZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgc3R1ZGlvQmFzZSArIFwiL2FwaS8yL3NlYXJjaC9zZWFyY2guanNvbj9zaXRlSWQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICBmdW5jdGlvbiBwb3N0U2VhcmNoKGJvZHkpIHtcbiAgICAgIHJldHVybiBzdHVkaW9BamF4UG9zdCh1cmwsIGJvZHksIHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSkudGhlbihcbiAgICAgICAgdW53cmFwQWpheFJlc3BvbnNlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcG9zdFNlYXJjaCh7XG4gICAgICBrZXl3b3JkczogXCJcIixcbiAgICAgIG9mZnNldDogMCxcbiAgICAgIGxpbWl0OiAyMDAsXG4gICAgICBmaWx0ZXJzOiB7XG4gICAgICAgIGxvY2FsZVNvdXJjZUlkX3M6IFtTdHJpbmcobG9jYWxlU291cmNlSWQpLnRyaW0oKV1cbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gKGJvZHkucmVzcG9uc2UgJiYgYm9keS5yZXNwb25zZS5yZXN1bHQgJiYgYm9keS5yZXNwb25zZS5yZXN1bHQuaXRlbXMpIHx8IFtdO1xuICAgICAgICB2YXIgcGF0aHMgPSBleHRyYWN0UGF0aHNGcm9tU2VhcmNoSXRlbXMoaXRlbXMpO1xuICAgICAgICBpZiAocGF0aHMubGVuZ3RoID4gMCkgcmV0dXJuIHBhdGhzO1xuICAgICAgICByZXR1cm4gcG9zdFNlYXJjaCh7XG4gICAgICAgICAga2V5d29yZHM6IFN0cmluZyhsb2NhbGVTb3VyY2VJZCkudHJpbSgpLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBsaW1pdDogMjAwXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGJvZHkyKSB7XG4gICAgICAgICAgdmFyIGl0ZW1zMiA9IChib2R5Mi5yZXNwb25zZSAmJiBib2R5Mi5yZXNwb25zZS5yZXN1bHQgJiYgYm9keTIucmVzcG9uc2UucmVzdWx0Lml0ZW1zKSB8fCBbXTtcbiAgICAgICAgICByZXR1cm4gZXh0cmFjdFBhdGhzRnJvbVNlYXJjaEl0ZW1zKGl0ZW1zMik7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZmxhZ0ZvckxvY2FsZUNvZGUobG9jYWxlQ29kZSkge1xuICAgIHZhciBrID0gU3RyaW5nKGxvY2FsZUNvZGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIWspIHJldHVybiBcIlxcdUQ4M0NcXHVERjEwXCI7XG4gICAgdmFyIG1hcCA9IHtcbiAgICAgIGVuOiBcIlxcdUQ4M0NcXHVEREZBXFx1RDgzQ1xcdURERjhcIixcbiAgICAgIFwiZW4tdXNcIjogXCJcXHVEODNDXFx1RERGQVxcdUQ4M0NcXHVEREY4XCIsXG4gICAgICBcImVuLWdiXCI6IFwiXFx1RDgzQ1xcdURERUNcXHVEODNDXFx1RERFN1wiLFxuICAgICAgZXM6IFwiXFx1RDgzQ1xcdURERUFcXHVEODNDXFx1RERGOFwiLFxuICAgICAgXCJlcy1lc1wiOiBcIlxcdUQ4M0NcXHVEREVBXFx1RDgzQ1xcdURERjhcIixcbiAgICAgIGRlOiBcIlxcdUQ4M0NcXHVEREU5XFx1RDgzQ1xcdURERUFcIixcbiAgICAgIFwiZGUtZGVcIjogXCJcXHVEODNDXFx1RERFOVxcdUQ4M0NcXHVEREVBXCIsXG4gICAgICB6aDogXCJcXHVEODNDXFx1RERFOFxcdUQ4M0NcXHVEREYzXCIsXG4gICAgICBjbjogXCJcXHVEODNDXFx1RERFOFxcdUQ4M0NcXHVEREYzXCIsXG4gICAgICBcInpoLWNuXCI6IFwiXFx1RDgzQ1xcdURERThcXHVEODNDXFx1RERGM1wiLFxuICAgICAgXCJ6aC10d1wiOiBcIlxcdUQ4M0NcXHVEREY5XFx1RDgzQ1xcdURERkNcIixcbiAgICAgIGphOiBcIlxcdUQ4M0NcXHVEREVGXFx1RDgzQ1xcdURERjVcIixcbiAgICAgIFwiamEtanBcIjogXCJcXHVEODNDXFx1RERFRlxcdUQ4M0NcXHVEREY1XCIsXG4gICAgICBmcjogXCJcXHVEODNDXFx1RERFQlxcdUQ4M0NcXHVEREY3XCIsXG4gICAgICBcImZyLWZyXCI6IFwiXFx1RDgzQ1xcdURERUJcXHVEODNDXFx1RERGN1wiLFxuICAgICAgaXQ6IFwiXFx1RDgzQ1xcdURERUVcXHVEODNDXFx1RERGOVwiLFxuICAgICAgXCJpdC1pdFwiOiBcIlxcdUQ4M0NcXHVEREVFXFx1RDgzQ1xcdURERjlcIixcbiAgICAgIHB0OiBcIlxcdUQ4M0NcXHVEREY1XFx1RDgzQ1xcdURERjlcIixcbiAgICAgIFwicHQtcHRcIjogXCJcXHVEODNDXFx1RERGNVxcdUQ4M0NcXHVEREY5XCIsXG4gICAgICBcInB0LWJyXCI6IFwiXFx1RDgzQ1xcdURERTdcXHVEODNDXFx1RERGN1wiLFxuICAgICAga286IFwiXFx1RDgzQ1xcdURERjBcXHVEODNDXFx1RERGN1wiLFxuICAgICAgXCJrby1rclwiOiBcIlxcdUQ4M0NcXHVEREYwXFx1RDgzQ1xcdURERjdcIixcbiAgICAgIGFyOiBcIlxcdUQ4M0NcXHVEREY4XFx1RDgzQ1xcdURERTZcIixcbiAgICAgIFwiYXItc2FcIjogXCJcXHVEODNDXFx1RERGOFxcdUQ4M0NcXHVEREU2XCIsXG4gICAgICBcImFyLWFlXCI6IFwiXFx1RDgzQ1xcdURERTZcXHVEODNDXFx1RERFQVwiLFxuICAgICAgXCJhci1lZ1wiOiBcIlxcdUQ4M0NcXHVEREVBXFx1RDgzQ1xcdURERUNcIlxuICAgIH07XG4gICAgcmV0dXJuIG1hcFtrXSB8fCBtYXBbay5zbGljZSgwLCAyKV0gfHwgXCJcXHVEODNDXFx1REYxMFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hUcmFuc2xhdGlvbkNvbmZpZyhzdHVkaW9CYXNlLCBzaXRlSWQpIHtcbiAgICBpZiAoIXN0dWRpb0Jhc2UgfHwgIXNpdGVJZCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB2YXIgdXJsID1cbiAgICAgIHN0dWRpb0Jhc2UgK1xuICAgICAgXCIvYXBpLzIvcGx1Z2luL3NjcmlwdC9wbHVnaW5zL29yZy9yZC9wbHVnaW4vdWlnb29kaWVzL3RyYW5zbGF0aW9uLWNvbmZpZy5nZXQ/c2l0ZUlkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzaXRlSWQpO1xuICAgIHJldHVybiBzdHVkaW9BamF4R2V0KHVybClcbiAgICAgIC50aGVuKHVud3JhcEFqYXhSZXNwb25zZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIHZhciBwID0gYm9keSAmJiBib2R5LnJlc3VsdCAhPT0gdW5kZWZpbmVkID8gYm9keS5yZXN1bHQgOiBib2R5O1xuICAgICAgICBpZiAoIXAgfHwgIXAub2sgfHwgIUFycmF5LmlzQXJyYXkocC5sYW5ndWFnZXMpIHx8IHAubGFuZ3VhZ2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBjb2RlcyA9IFtdO1xuICAgICAgICB2YXIgbWV0YSA9IHt9O1xuICAgICAgICBwLmxhbmd1YWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICB2YXIgbGMgPSByb3cgJiYgcm93LmxvY2FsZSA/IFN0cmluZyhyb3cubG9jYWxlKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcbiAgICAgICAgICBpZiAoIWxjKSByZXR1cm47XG4gICAgICAgICAgaWYgKGNvZGVzLmluZGV4T2YobGMpIDwgMCkgY29kZXMucHVzaChsYyk7XG4gICAgICAgICAgbWV0YVtsY10gPSB7XG4gICAgICAgICAgICBsYWJlbDogKHJvdyAmJiByb3cubGFiZWwpIHx8IGxjLFxuICAgICAgICAgICAgZmxhZzogcm93ICYmIHJvdy5mbGFnICYmIFN0cmluZyhyb3cuZmxhZykudHJpbSgpID8gU3RyaW5nKHJvdy5mbGFnKS50cmltKCkgOiBmbGFnRm9yTG9jYWxlQ29kZShsYylcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBiYXNlUmF3ID0gcC5iYXNlTGFuZ3VhZ2UgIT0gbnVsbCAmJiBTdHJpbmcocC5iYXNlTGFuZ3VhZ2UpLnRyaW0oKSA/IFN0cmluZyhwLmJhc2VMYW5ndWFnZSkudHJpbSgpIDogXCJcIjtcbiAgICAgICAgdmFyIGJhc2VMb2NhbGUgPSBiYXNlUmF3ID8gYmFzZVJhdy50b0xvd2VyQ2FzZSgpIDogY29kZXNbMF07XG4gICAgICAgIGlmIChjb2Rlcy5pbmRleE9mKGJhc2VMb2NhbGUpIDwgMCkge1xuICAgICAgICAgIGJhc2VMb2NhbGUgPSBjb2Rlc1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJhc2VMb2NhbGU6IGJhc2VMb2NhbGUsXG4gICAgICAgICAgY29kZXM6IGNvZGVzLFxuICAgICAgICAgIG1ldGE6IG1ldGFcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICB9XG5cbiAgdmFyIFRSQU5TTEFUSU9OU19QQUdFX1NJWkUgPSA1O1xuXG4gIGZ1bmN0aW9uIGxvY2FsZUxhYmVsRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwYXRoKSB8fCBcInVua25vd25cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbSA9IExPQ0FMRV9NRVRBW2xvY107XG4gICAgcmV0dXJuIG0gJiYgbS5sYWJlbCA/IG0ubGFiZWwgOiBsb2M7XG4gIH1cblxuICAvKiogU291cmNlIGxvY2FsZSByb3cocykgZmlyc3Q7IHJlbWFpbmluZyByb3dzIEHigJNaIGJ5IGRpc3BsYXkgbGFiZWwsIHRoZW4gcGF0aC4gKi9cbiAgZnVuY3Rpb24gc29ydFRyYW5zbGF0aW9uUGF0aHNGb3JEaXNwbGF5KHBhdGhzLCBzb3VyY2VMb2NhbGVLZXkpIHtcbiAgICB2YXIgc3JjID0gKHNvdXJjZUxvY2FsZUtleSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBhcnIgPSBwYXRocy5zbGljZSgpO1xuICAgIGZ1bmN0aW9uIGlzU291cmNlUGF0aChwKSB7XG4gICAgICByZXR1cm4gISEoc3JjICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiLCBzcmMpKTtcbiAgICB9XG4gICAgYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHZhciBhcyA9IGlzU291cmNlUGF0aChhKTtcbiAgICAgIHZhciBicyA9IGlzU291cmNlUGF0aChiKTtcbiAgICAgIGlmIChhcyAmJiAhYnMpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKCFhcyAmJiBicykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIHZhciBsYSA9IGxvY2FsZUxhYmVsRm9yUGF0aChhKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGxiID0gbG9jYWxlTGFiZWxGb3JQYXRoKGIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgY21wID0gbGEubG9jYWxlQ29tcGFyZShsYiwgdW5kZWZpbmVkLCB7IHNlbnNpdGl2aXR5OiBcImJhc2VcIiB9KTtcbiAgICAgIGlmIChjbXAgIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGNtcDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcoYSkubG9jYWxlQ29tcGFyZShTdHJpbmcoYikpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJUcmFuc2xhdGlvblBhdGhzKHBhdGhzLCBxdWVyeSkge1xuICAgIHZhciBxID0gKHF1ZXJ5IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghcSkge1xuICAgICAgcmV0dXJuIHBhdGhzLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBwYXRocy5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBsYWJlbCA9IGxvY2FsZUxhYmVsRm9yUGF0aChwKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgU3RyaW5nKHApLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxKSA+PSAwIHx8XG4gICAgICAgIGxvYy5pbmRleE9mKHEpID49IDAgfHxcbiAgICAgICAgbGFiZWwuaW5kZXhPZihxKSA+PSAwXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGF0Y2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjbXMgPSB3aW5kb3cuY3JhZnRlcmNtcztcbiAgICAgIGlmIChjbXMgJiYgdHlwZW9mIGNtcy5nZXRTdG9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IGNtcy5nZXRTdG9yZSgpO1xuICAgICAgICBpZiAoc3RvcmUgJiYgdHlwZW9mIHN0b3JlLmRpc3BhdGNoID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzdG9yZS5kaXNwYXRjaC5iaW5kKHN0b3JlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudEV4aXN0cyhhdXRob3JpbmdCYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgYmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICBpZiAoIWJhc2UgfHwgIXNpdGVJZCB8fCAhcGF0aCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2NvbnRlbnQtZXhpc3RzLmpzb24/c2l0ZV9pZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheEdldCh1cmwpXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciBib2R5ID0gdW53cmFwQWpheFJlc3BvbnNlKHJlcyk7XG4gICAgICAgIHJldHVybiBwYXJzZUNvbnRlbnRFeGlzdHNQYXlsb2FkKGJvZHkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VUaW1lc3RhbXBNcyhpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICAgIHZhciBhc051bSA9IE51bWJlcihpbnB1dCk7XG4gICAgaWYgKGlzRmluaXRlKGFzTnVtKSAmJiBhc051bSA+IDApIHJldHVybiBhc051bTtcbiAgICB2YXIgcGFyc2VkID0gRGF0ZS5wYXJzZShTdHJpbmcoaW5wdXQpKTtcbiAgICByZXR1cm4gaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAoYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCBwYXRoKSB7XG4gICAgdmFyIGJhc2UgPSByZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSk7XG4gICAgaWYgKCFiYXNlIHx8ICFzaXRlSWQgfHwgIXBhdGgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2dldC1pdGVtcy10cmVlLmpzb24/c2l0ZT1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKSArXG4gICAgICBcIiZkZXB0aD0wXCI7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhHZXQodXJsKVxuICAgICAgLnRoZW4odW53cmFwQWpheFJlc3BvbnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBib2R5ICYmIGJvZHkuaXRlbTtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdE1vZGlmaWVkRGF0ZV9kdCkgfHxcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdE1vZGlmaWVkRGF0ZSkgfHxcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdEVkaXREYXRlKSB8fFxuICAgICAgICAgIHBhcnNlVGltZXN0YW1wTXMoaXRlbS5tb2RpZmllZERhdGUpIHx8XG4gICAgICAgICAgcGFyc2VUaW1lc3RhbXBNcyhpdGVtLmRhdGVNb2RpZmllZCkgfHxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIFVSTCBzaGFwZSBhcyBDcmFmdGVyIFN0dWRpbyBVSSB7QGNvZGUgZ2V0RWRpdEZvcm1TcmN9IChsZWdhY3kgZm9ybSBlbmdpbmUpLCByZWFkLW9ubHkgZm9yIHNvdXJjZSBjb21wYXJlIGlmcmFtZS5cbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3JhZnRlcmNtcy9zdHVkaW8tdWkvYmxvYi9kZXZlbG9wL3VpL2FwcC9zcmMvdXRpbHMvcGF0aC50c1xuICAgKi9cbiAgZnVuY3Rpb24gYnVpbGRMZWdhY3lSZWFkb25seUZvcm1TcmMoYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCBwYXRoKSB7XG4gICAgdmFyIGJhc2UgPSBTdHJpbmcoYXV0aG9yaW5nQmFzZSB8fCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAoIWJhc2UgfHwgIXNpdGVJZCB8fCAhcGF0aCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBiYXNlICtcbiAgICAgIFwiL2xlZ2FjeS9mb3JtP3NpdGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImcGF0aD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQocGF0aCkgK1xuICAgICAgXCImcmVhZG9ubHk9dHJ1ZVwiICtcbiAgICAgIFwiJmlzSGlkZGVuPWZhbHNlXCJcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIWRpc3BhdGNoIHx8IG1lc3NhZ2UgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiU0hPV19TWVNURU1fTk9USUZJQ0FUSU9OXCIsIHBheWxvYWQ6IHsgbWVzc2FnZTogU3RyaW5nKG1lc3NhZ2UpIH0gfSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIC8qKiBPcGVucyBTdHVkaW8gZm9ybSBlZGl0b3IgZm9yIGBwYXRoYCAoc2FtZSBwYXlsb2FkIGFzIFRyYW5zbGF0aW9uIFJlYWN0IGhlbHBlcnMpLiAqL1xuICBmdW5jdGlvbiBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgcGF0aCwgYXV0aG9yaW5nQmFzZUZvckRpYWxvZykge1xuICAgIGlmICghZGlzcGF0Y2ggfHwgIXNpdGVJZCB8fCAhcGF0aCkgcmV0dXJuO1xuICAgIHZhciBhYiA9IFN0cmluZyhhdXRob3JpbmdCYXNlRm9yRGlhbG9nIHx8IGdldEF1dGhvcmluZ0Jhc2UoKSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgaWYgKCFhYikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwiU0hPV19FRElUX0RJQUxPR1wiLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2l0ZTogc2l0ZUlkLFxuICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgYXV0aG9yaW5nQmFzZTogYWIsXG4gICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgICAgIG9uU2F2ZVN1Y2Nlc3M6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiQkFUQ0hfQUNUSU9OU1wiLFxuICAgICAgICAgICAgcGF5bG9hZDogW1xuICAgICAgICAgICAgICB7IHR5cGU6IFwiRElTUEFUQ0hfRE9NX0VWRU5UXCIsIHBheWxvYWQ6IHsgaWQ6IFwiZWRpdERpYWxvZ1N1Y2Nlc3NcIiB9IH0sXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJTSE9XX0VESVRfSVRFTV9TVUNDRVNTX05PVElGSUNBVElPTlwiIH0sXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJDTE9TRV9FRElUX0RJQUxPR1wiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2FuY2VsOiB7XG4gICAgICAgICAgICB0eXBlOiBcIkJBVENIX0FDVElPTlNcIixcbiAgICAgICAgICAgIHBheWxvYWQ6IFtcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkNMT1NFX0VESVRfRElBTE9HXCIgfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkRJU1BBVENIX0RPTV9FVkVOVFwiLCBwYXlsb2FkOiB7IGlkOiBcImVkaXREaWFsb2dEaXNtaXNzZWRcIiB9IH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICAvKipcbiAgICogQ29weSBzb3VyY2UgZm9yIFRyYW5zbGF0aW9uIHRyYW5zbGF0ZTogcGx1Z2luLWNvbmZpZyBiYXNlIGxhbmd1YWdlIHBhdGggd2hlbiBsYXlvdXQgc3VwcG9ydHMgaXQsXG4gICAqIGVsc2UgbGVnYWN5IHNvdXJjZSBsb2NhbGUgZnJvbSBjb250ZW50IHRyZWUgcGF0aHMgLyBjdXJyZW50IGZvcm0uXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlVHJhbnNsYXRlQ29weVNvdXJjZVBhdGgodHJhbnNsYXRpb25DZmcsIHJvb3REaXIsIHN1ZmZpeCwgdHJhbnNsYXRpb25QYXRocywgZm9ybVBhdGgsIHJlc29sdmVkU291cmNlS2V5KSB7XG4gICAgaWYgKHRyYW5zbGF0aW9uQ2ZnICYmIHRyYW5zbGF0aW9uQ2ZnLmJhc2VMb2NhbGUgJiYgcm9vdERpciAhPSBudWxsICYmIHN1ZmZpeCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBTdHJpbmcodHJhbnNsYXRpb25DZmcuYmFzZUxvY2FsZSkudG9Mb3dlckNhc2UoKSwgc3VmZml4KTtcbiAgICB9XG4gICAgdmFyIGZyb21Tb3VyY2VMb2NhbGUgPVxuICAgICAgKHRyYW5zbGF0aW9uUGF0aHMgfHwgW10pLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgfSkgfHwgZm9ybVBhdGg7XG4gICAgcmV0dXJuIGZyb21Tb3VyY2VMb2NhbGUgfHwgZm9ybVBhdGg7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weShwKSB7XG4gICAgdmFyIGkgPSBwLmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICBpZiAoaSA8PSAwKSByZXR1cm4gXCIvXCI7XG4gICAgcmV0dXJuIHAuc2xpY2UoMCwgaSkgfHwgXCIvXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkZXRlY3RMb2NhbGVGb2xkZXJOYW1lc0ZvclNpdGUoY2hpbGRQYXRocywgcm9vdERpciwgbG9jYWxlQ29kZXMpIHtcbiAgICB2YXIgcHJlZml4ID0gcm9vdERpci5lbmRzV2l0aChcIi9cIikgPyByb290RGlyIDogcm9vdERpciArIFwiL1wiO1xuICAgIHZhciBsb2NhbGVTZXQgPSB7fTtcbiAgICB2YXIgY29kZXMgPSBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGggPyBsb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIChjaGlsZFBhdGhzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICBpZiAoIXAgfHwgcC5pbmRleE9mKHByZWZpeCkgIT09IDApIHJldHVybjtcbiAgICAgIHZhciByZXN0ID0gcC5zbGljZShwcmVmaXgubGVuZ3RoKTtcbiAgICAgIHZhciBzZWcgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbilbMF07XG4gICAgICB2YXIgbWF0Y2hlZCA9XG4gICAgICAgIHNlZyAmJlxuICAgICAgICBjb2Rlcy5zb21lKGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShzZWcsIGNvZGUpO1xuICAgICAgICB9KTtcbiAgICAgIGlmIChtYXRjaGVkICYmICFzZWVuW3NlZy50b0xvd2VyQ2FzZSgpXSkge1xuICAgICAgICBzZWVuW3NlZy50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICAgIG5hbWVzLnB1c2goc2VnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmFtZXM7XG4gIH1cblxuICBmdW5jdGlvbiBpc011bHRpTG9jYWxlRm9sZGVyU2V0KG5hbWVzLCBiYXNlTG9jYWxlKSB7XG4gICAgaWYgKCFuYW1lcyB8fCBuYW1lcy5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFiYXNlTG9jYWxlIHx8ICFTdHJpbmcoYmFzZUxvY2FsZSkudHJpbSgpKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgYmFzZSA9IFN0cmluZyhiYXNlTG9jYWxlKS50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKG5hbWVzW2ldLCBiYXNlKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBtdWx0aS1sb2NhbGUgaXMgY29uZmlybWVkIGZyb20gZXhpc3RpbmcgZm9sZGVycywgbGlzdCBldmVyeSBNVUxUSV9MT0NBTEVfQ09ERVMgdGFyZ2V0XG4gICAqICh1c2UgcmVwbyBmb2xkZXIgY2FzaW5nIHdoZW4gcHJlc2VudCwgZWxzZSB0aGUgY29kZSBlLmcuIGphIHNvIEphcGFuZXNlIGFwcGVhcnMgYmVmb3JlIC9qYSBleGlzdHMpLlxuICAgKi9cbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBmcm9tVHJhbnNsYXRpb25Db25maWc/OiBib29sZWFuIH19IFtvcHRzXVxuICAgKiAgIFdoZW4gZnJvbVRyYW5zbGF0aW9uQ29uZmlnIGFuZCB0cmFuc2xhdGlvbi1jb25maWcueG1sIGxpc3RzIDIrIGxvY2FsZXMsIHJldHVybiBvcmRlcmVkIGNvZGVzXG4gICAqICAgZXZlbiBpZiBmZXdlciB0aGFuIHR3byBsb2NhbGUgZm9sZGVycyBleGlzdCBvbiBkaXNrIHlldCAoYXV0aG9ycyBjYW4gdHJhbnNsYXRlIGludG8gbWlzc2luZyB0cmVlcykuXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlTG9jYWxlRm9sZGVyc09yZGVyZWRGcm9tUGF0aHMoY2hpbGRQYXRocywgcm9vdERpciwgbG9jYWxlQ29kZXMsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgZnJvbVRyYW5zbGF0aW9uQ29uZmlnID0gISFvcHRzLmZyb21UcmFuc2xhdGlvbkNvbmZpZztcbiAgICB2YXIgYWN0aXZlQ29kZXMgPSBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGggPyBsb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgbmFtZXMgPSBkZXRlY3RMb2NhbGVGb2xkZXJOYW1lc0ZvclNpdGUoY2hpbGRQYXRocywgcm9vdERpciwgYWN0aXZlQ29kZXMpO1xuICAgIGlmICghaXNNdWx0aUxvY2FsZUZvbGRlclNldChuYW1lcykpIHtcbiAgICAgIGlmICghZnJvbVRyYW5zbGF0aW9uQ29uZmlnIHx8IGFjdGl2ZUNvZGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBvcmRlcmVkID0gW107XG4gICAgYWN0aXZlQ29kZXMuZm9yRWFjaChmdW5jdGlvbiAoY29kZSkge1xuICAgICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShuYW1lc1tpXSwgY29kZSkpIHtcbiAgICAgICAgICBtYXRjaCA9IG5hbWVzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZnJvbVRyYW5zbGF0aW9uQ29uZmlnKSB7XG4gICAgICAgIG9yZGVyZWQucHVzaChtYXRjaCB8fCBjb2RlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFyIGFscmVhZHkgPSBvcmRlcmVkLnNvbWUoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG8pLnRvTG93ZXJDYXNlKCkgPT09IFN0cmluZyhtYXRjaCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYWxyZWFkeSkgb3JkZXJlZC5wdXNoKG1hdGNoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICB2YXIgaW5PcmRlcmVkID0gb3JkZXJlZC5zb21lKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobiwgbyk7XG4gICAgICB9KTtcbiAgICAgIGlmICghaW5PcmRlcmVkKSBvcmRlcmVkLnB1c2gobik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9yZGVyZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGlsZHJlblBhdGhzVHJlZShiYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgdXJsID1cbiAgICAgIGJhc2UgK1xuICAgICAgXCIvYXBpLzEvc2VydmljZXMvYXBpLzEvY29udGVudC9nZXQtaXRlbXMtdHJlZS5qc29uP3NpdGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImcGF0aD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQocGF0aCkgK1xuICAgICAgXCImZGVwdGg9MVwiO1xuICAgIHJldHVybiBzdHVkaW9BamF4R2V0KHVybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdmFyIGJvZHkgPSB1bndyYXBBamF4UmVzcG9uc2UocmVzKTtcbiAgICAgICAgdmFyIHJhdyA9IGJvZHkgJiYgYm9keS5pdGVtICYmIGJvZHkuaXRlbS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIHJhd1xuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2ggJiYgY2gucGF0aCAmJiBjaC5wYXRoICE9PSBwYXRoO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBjaC5wYXRoO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29weUl0ZW1QYXN0ZVN0dWRpbyhiYXNlLCBzaXRlSWQsIHNvdXJjZVBhdGgsIHRhcmdldFBhcmVudFBhdGgsIGV4cGVjdGVkVGFyZ2V0UGF0aCkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKGJhc2UpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tY29weS5wb3N0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICB2YXIgYm9keSA9IHtcbiAgICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGgsXG4gICAgICB0YXJnZXRQYXJlbnRQYXRoOiB0YXJnZXRQYXJlbnRQYXRoLFxuICAgICAgZXhwZWN0ZWRUYXJnZXRQYXRoOiBleHBlY3RlZFRhcmdldFBhdGggfHwgXCJcIlxuICAgIH07XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KHVybCwgYm9keSwgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB2YXIgYm9keSA9IHVud3JhcEFqYXhSZXNwb25zZShyZXMpO1xuICAgICAgICByZXR1cm4gYm9keSAmJiBib2R5LnJlc3VsdCAhPT0gdW5kZWZpbmVkID8gYm9keS5yZXN1bHQgOiBib2R5O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gIH1cblxuICAvKiogQ2hldnJvbiBmb3IgbmF0aXZlIHNlbGVjdCAobm8gQm9vdHN0cmFwKS4gKi9cbiAgdmFyIEFERF9UUkFOU0xBVElPTl9TRUxFQ1RfQ0hFVlJPTiA9XG4gICAgXCJkYXRhOmltYWdlL3N2Zyt4bWwsXCIgK1xuICAgIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjNjQ3NDhiXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNNiA5bDYgNiA2LTZcIi8+PC9zdmc+J1xuICAgICk7XG5cbiAgLyoqXG4gICAqIERyb3Bkb3duOiBsb2NhbGVzIHN0aWxsIG1pc3NpbmcgdGhpcyBpdGVtOyBjb3B5IHVzZXMgdGhlIHNhbWUgcGF0aCB1bmRlciB0aGUgY2hvc2VuIGxvY2FsZSBmb2xkZXIuXG4gICAqL1xuICAvKiogQHBhcmFtIHByb3BzLm9uVHJhbnNsYXRlZCBvcHRpb25hbCDigJQgY2FsbGVkIGFmdGVyIGEgc3VjY2Vzc2Z1bCBwYXN0ZSB0byByZWZldGNoIHRoZSB0cmFuc2xhdGlvbnMgbGlzdCBhYm92ZS4gKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy50cmFuc2xhdGlvbkNmZyBvcHRpb25hbCDigJQgZnJvbSBwYW5lbCBzdGF0ZSB3aGVuIEdFVCBmYWlscy4gKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy5leGlzdGluZ1BhdGhzIHRyYW5zbGF0aW9uIHNpYmxpbmcgcGF0aHMgKyBjdXJyZW50IGZvcm0gcGF0aCBjb3VudHMgYXMgZXhpc3RpbmcgY29udGVudC4gKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy50cmFuc2xhdGVDb3B5U291cmNlUGF0aCByZXBvIHBhdGggdG8gY29weSBmcm9tIChiYXNlIGxhbmd1YWdlKTsgZmFsbHMgYmFjayB0byBmb3JtUGF0aCBpZiBvbWl0dGVkLiAqL1xuICBmdW5jdGlvbiBBZGRUcmFuc2xhdGlvbkxvY2FsZUJhcihwcm9wcykge1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoO1xuICAgIHZhciB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCA9IHByb3BzLnRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIHx8IGZvcm1QYXRoO1xuICAgIHZhciBzaXRlSWQgPSBwcm9wcy5zaXRlSWQ7XG4gICAgdmFyIGRpc3BhdGNoID0gcHJvcHMuZGlzcGF0Y2g7XG4gICAgdmFyIGF1dGhvcmluZ0Jhc2UgPSBwcm9wcy5hdXRob3JpbmdCYXNlIHx8IFwiXCI7XG4gICAgdmFyIHJvb3REaXIgPSBwcm9wcy5yb290RGlyO1xuICAgIHZhciBzdWZmaXggPSBwcm9wcy5zdWZmaXg7XG4gICAgdmFyIGV4aXN0aW5nUGF0aHMgPSBwcm9wcy5leGlzdGluZ1BhdGhzIHx8IFtdO1xuICAgIHZhciBvblRyYW5zbGF0ZWQgPSBwcm9wcy5vblRyYW5zbGF0ZWQ7XG4gICAgdmFyIHRyYW5zbGF0aW9uQ2ZnUHJvcCA9IHByb3BzLnRyYW5zbGF0aW9uQ2ZnO1xuICAgIHZhciBsb2NhbGVDb2RlcyA9IHByb3BzLmxvY2FsZUNvZGVzICYmIHByb3BzLmxvY2FsZUNvZGVzLmxlbmd0aCA/IHByb3BzLmxvY2FsZUNvZGVzIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgIHZhciBsb2NhbGVNZXRhID0gcHJvcHMubG9jYWxlTWV0YSB8fCBMT0NBTEVfTUVUQTtcblxuICAgIHZhciBvcHRTdCA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdFN0WzBdO1xuICAgIHZhciBzZXRPcHRpb25zID0gb3B0U3RbMV07XG4gICAgdmFyIHNlbFN0ID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIHNlbGVjdGVkID0gc2VsU3RbMF07XG4gICAgdmFyIHNldFNlbGVjdGVkID0gc2VsU3RbMV07XG4gICAgdmFyIGxvYWRTdCA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICB2YXIgbG9hZGluZyA9IGxvYWRTdFswXTtcbiAgICB2YXIgc2V0TG9hZGluZyA9IGxvYWRTdFsxXTtcbiAgICB2YXIgYnVzeVN0ID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIHZhciBjb3B5QnVzeSA9IGJ1c3lTdFswXTtcbiAgICB2YXIgc2V0Q29weUJ1c3kgPSBidXN5U3RbMV07XG4gICAgdmFyIGZvY3VzU2VsU3QgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgdmFyIHNlbGVjdEZvY3VzZWQgPSBmb2N1c1NlbFN0WzBdO1xuICAgIHZhciBzZXRTZWxlY3RGb2N1c2VkID0gZm9jdXNTZWxTdFsxXTtcblxuICAgIC8qKiBTdXBwb3J0ZWQgbG9jYWxlcyBmcm9tIGNvbmZpZyBtaW51cyBsb2NhbGVzIGFscmVhZHkgcHJlc2VudCBpbiBmb3JtUGF0aCArIHRyYW5zbGF0aW9uUGF0aHMgKG5vIGNvbnRlbnQtZXhpc3RzKS4gKi9cbiAgICB2YXIgbG9hZFRhcmdldHMgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFmb3JtUGF0aCB8fCAhc2l0ZUlkIHx8ICFyb290RGlyKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlZmZTdWZmaXggPSBzdWZmaXg7XG4gICAgICAgIGlmIChlZmZTdWZmaXggPT0gbnVsbCkge1xuICAgICAgICAgIGVmZlN1ZmZpeCA9IHBhcnNlU3VmZml4RnJvbUZvcm1QYXRoKGZvcm1QYXRoLCByb290RGlyKS5zdWZmaXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVmZlN1ZmZpeCA9PSBudWxsKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHZhciBzdHVkaW9CYXNlID0gZ2V0U3R1ZGlvQXBpQmFzZSgpO1xuICAgICAgICBmdW5jdGlvbiBhcHBseUNvZGVzKGFjdGl2ZU1ldGEsIHJhd0NvZGVzKSB7XG4gICAgICAgICAgdmFyIHNlZW4gPSB7fTtcbiAgICAgICAgICB2YXIgYWN0aXZlQ29kZXMgPSBbXTtcbiAgICAgICAgICAocmF3Q29kZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHZhciBzID0gU3RyaW5nKGMgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgayA9IHMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWVuW2tdKSByZXR1cm47XG4gICAgICAgICAgICBzZWVuW2tdID0gdHJ1ZTtcbiAgICAgICAgICAgIGFjdGl2ZUNvZGVzLnB1c2gocyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFhY3RpdmVDb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhbnNsYXRlZExvY2FsZXMgPSBleGlzdGluZ1RyYW5zbGF0aW9uTG9jYWxlS2V5cyhleGlzdGluZ1BhdGhzLCByb290RGlyLCBmb3JtUGF0aCk7XG4gICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgIGFjdGl2ZUNvZGVzLmZvckVhY2goZnVuY3Rpb24gKGxvYykge1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0aW9uTG9jYWxlQWxyZWFkeVByZXNlbnQodHJhbnNsYXRlZExvY2FsZXMsIGxvYykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0YXJnZXRQYXRoID0gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBsb2MsIGVmZlN1ZmZpeCk7XG4gICAgICAgICAgICB2YXIgbWV0YSA9IGFjdGl2ZU1ldGFbbGtdIHx8IHtcbiAgICAgICAgICAgICAgbGFiZWw6IGxvYyxcbiAgICAgICAgICAgICAgZmxhZzogZmxhZ0ZvckxvY2FsZUNvZGUobG9jKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG91dC5wdXNoKHtcbiAgICAgICAgICAgICAgbG9jYWxlOiBsb2MsXG4gICAgICAgICAgICAgIGxhYmVsOiBtZXRhLmxhYmVsLFxuICAgICAgICAgICAgICBmbGFnOiBtZXRhLmZsYWcgfHwgXCJcXHVEODNDXFx1REYxMFwiLFxuICAgICAgICAgICAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICBleGlzdHM6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRPcHRpb25zKG91dCk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaFRyYW5zbGF0aW9uQ29uZmlnKHN0dWRpb0Jhc2UsIHNpdGVJZClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZmV0Y2hlZCkge1xuICAgICAgICAgICAgdmFyIHJhd0NvZGVzID1cbiAgICAgICAgICAgICAgZmV0Y2hlZCAmJiBmZXRjaGVkLmNvZGVzICYmIGZldGNoZWQuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyBmZXRjaGVkLmNvZGVzXG4gICAgICAgICAgICAgICAgOiB0cmFuc2xhdGlvbkNmZ1Byb3AgJiYgdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgID8gdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzXG4gICAgICAgICAgICAgICAgICA6IGxvY2FsZUNvZGVzICYmIGxvY2FsZUNvZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2FsZUNvZGVzXG4gICAgICAgICAgICAgICAgICAgIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgICAgICAgICAgdmFyIGFjdGl2ZU1ldGEgPVxuICAgICAgICAgICAgICAoZmV0Y2hlZCAmJiBmZXRjaGVkLm1ldGEpIHx8XG4gICAgICAgICAgICAgICh0cmFuc2xhdGlvbkNmZ1Byb3AgJiYgdHJhbnNsYXRpb25DZmdQcm9wLm1ldGEpIHx8XG4gICAgICAgICAgICAgIGxvY2FsZU1ldGE7XG4gICAgICAgICAgICByZXR1cm4gYXBwbHlDb2RlcyhhY3RpdmVNZXRhLCByYXdDb2Rlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJhd0NvZGVzID1cbiAgICAgICAgICAgICAgdHJhbnNsYXRpb25DZmdQcm9wICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2RlcyAmJiB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXNcbiAgICAgICAgICAgICAgICA6IGxvY2FsZUNvZGVzICYmIGxvY2FsZUNvZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgPyBsb2NhbGVDb2Rlc1xuICAgICAgICAgICAgICAgICAgOiBNVUxUSV9MT0NBTEVfQ09ERVM7XG4gICAgICAgICAgICB2YXIgYWN0aXZlTWV0YSA9ICh0cmFuc2xhdGlvbkNmZ1Byb3AgJiYgdHJhbnNsYXRpb25DZmdQcm9wLm1ldGEpIHx8IGxvY2FsZU1ldGE7XG4gICAgICAgICAgICByZXR1cm4gYXBwbHlDb2RlcyhhY3RpdmVNZXRhLCByYXdDb2Rlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBbZm9ybVBhdGgsIHNpdGVJZCwgcm9vdERpciwgc3VmZml4LCBleGlzdGluZ1BhdGhzLCBsb2NhbGVDb2RlcywgbG9jYWxlTWV0YSwgdHJhbnNsYXRpb25DZmdQcm9wXVxuICAgICk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRUYXJnZXRzKCk7XG4gICAgICB9LFxuICAgICAgW2xvYWRUYXJnZXRzXVxuICAgICk7XG5cbiAgICB2YXIgcnVuVHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNvcHlCdXN5IHx8ICFzZWxlY3RlZCB8fCAhZGlzcGF0Y2ggfHwgIWZvcm1QYXRoKSByZXR1cm47XG4gICAgICB2YXIgY2hvaWNlID0gbnVsbDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAob3B0aW9uc1tpXS5sb2NhbGUgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgY2hvaWNlID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFjaG9pY2UpIHJldHVybjtcbiAgICAgIGlmIChjaG9pY2UuZXhpc3RzKSB7XG4gICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIkEgdHJhbnNsYXRpb24gYWxyZWFkeSBleGlzdHMgYXQgXCIgKyBjaG9pY2UudGFyZ2V0UGF0aCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldENvcHlCdXN5KHRydWUpO1xuICAgICAgdmFyIHBhcmVudCA9IHBhcmVudEZvbGRlclBhdGhGb3JDb3B5KGNob2ljZS50YXJnZXRQYXRoKTtcbiAgICAgIHZhciBjb250ZW50QXBpQmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICAgIHJldHVybiBjb3B5SXRlbVBhc3RlU3R1ZGlvKGNvbnRlbnRBcGlCYXNlLCBzaXRlSWQsIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoLCBwYXJlbnQsIGNob2ljZS50YXJnZXRQYXRoKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5vaykge1xuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goXG4gICAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgICAocmVzICYmIHJlcy5tZXNzYWdlKSB8fCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRDb3B5QnVzeShmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZWQgdG8gXCIgKyBjaG9pY2UubGFiZWwgKyBcIjogXCIgKyBjaG9pY2UudGFyZ2V0UGF0aCk7XG4gICAgICAgICAgc2V0U2VsZWN0ZWQoXCJcIik7XG4gICAgICAgICAgb3BlblN0dWRpb0VkaXRGb3JtKGRpc3BhdGNoLCBzaXRlSWQsIGNob2ljZS50YXJnZXRQYXRoLCBhdXRob3JpbmdCYXNlKTtcbiAgICAgICAgICBpZiAodHlwZW9mIG9uVHJhbnNsYXRlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBvblRyYW5zbGF0ZWQoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUxKSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbG9hZFRhcmdldHMoKS5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldENvcHlCdXN5KGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJUcmFuc2xhdGUgZmFpbGVkLlwiKTtcbiAgICAgICAgICBzZXRDb3B5QnVzeShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZWZmZWN0aXZlTWlycm9yZWRTdWZmaXggPVxuICAgICAgc3VmZml4ICE9IG51bGwgPyBzdWZmaXggOiByb290RGlyICYmIGZvcm1QYXRoID8gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpLnN1ZmZpeCA6IG51bGw7XG5cbiAgICB2YXIgaGludCA9IFwiXCI7XG4gICAgaWYgKCFkaXNwYXRjaCkgaGludCA9IFwiU3R1ZGlvIGFjdGlvbnMgcmVxdWlyZSBhbiBhY3RpdmUgc2Vzc2lvbi5cIjtcbiAgICBlbHNlIGlmICghZm9ybVBhdGggfHwgIXNpdGVJZCkgaGludCA9IFwiTWlzc2luZyBwYXRoIG9yIHNpdGUuXCI7XG4gICAgZWxzZSBpZiAoIXJvb3REaXIgfHwgZWZmZWN0aXZlTWlycm9yZWRTdWZmaXggPT0gbnVsbClcbiAgICAgIGhpbnQgPSBcIlBhdGggbGF5b3V0IGRvZXMgbm90IHN1cHBvcnQgbWlycm9yZWQgbG9jYWxlIGNvcHkgZm9yIHRoaXMgaXRlbS5cIjtcbiAgICBlbHNlIGlmICghcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpKVxuICAgICAgaGludCA9IFwiTG9hZGluZyBhdXRob3JpbmcgY29udGV4dFxcdTIwMjZcIjtcbiAgICBlbHNlIGlmICghbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMClcbiAgICAgIGhpbnQgPSBcIkFsbCBjb25maWd1cmVkIGxvY2FsZXMgYWxyZWFkeSBoYXZlIGEgdHJhbnNsYXRpb24gYXQgdGhpcyBwYXRoLlwiO1xuXG4gICAgdmFyIHNlbGVjdERpc2FibGVkID1cbiAgICAgIGxvYWRpbmcgfHxcbiAgICAgIGNvcHlCdXN5IHx8XG4gICAgICBvcHRpb25zLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgIWRpc3BhdGNoIHx8XG4gICAgICAhcm9vdERpciB8fFxuICAgICAgZWZmZWN0aXZlTWlycm9yZWRTdWZmaXggPT0gbnVsbCB8fFxuICAgICAgIXJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcblxuICAgIHZhciBzZWxlY3RTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICBtaW5IZWlnaHQ6IFwiNDJweFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCBcIiArIChzZWxlY3RGb2N1c2VkICYmICFzZWxlY3REaXNhYmxlZCA/IFwiIzNiODJmNlwiIDogXCIjZTJlOGYwXCIpLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIHBhZGRpbmc6IFwiMTBweCAxNHB4XCIsXG4gICAgICBwYWRkaW5nUmlnaHQ6IFwiNDRweFwiLFxuICAgICAgZm9udFNpemU6IFwiMTRweFwiLFxuICAgICAgbGluZUhlaWdodDogMS40NSxcbiAgICAgIGNvbG9yOiBcIiMwZjE3MmFcIixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZWN0RGlzYWJsZWQgPyBcIiNmOGZhZmNcIiA6IFwiI2ZmZmZmZlwiLFxuICAgICAgYm94U2hhZG93OlxuICAgICAgICBzZWxlY3RGb2N1c2VkICYmICFzZWxlY3REaXNhYmxlZFxuICAgICAgICAgID8gXCIwIDAgMCAzcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuMilcIlxuICAgICAgICAgIDogXCJpbnNldCAwIDFweCAycHggcmdiYSgxNSwgMjMsIDQyLCAwLjA0KVwiLFxuICAgICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgICBjdXJzb3I6IHNlbGVjdERpc2FibGVkID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICBvcGFjaXR5OiBzZWxlY3REaXNhYmxlZCA/IDAuODggOiAxLFxuICAgICAgYXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBXZWJraXRBcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIE1vekFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiJyArIEFERF9UUkFOU0xBVElPTl9TRUxFQ1RfQ0hFVlJPTiArICdcIiknLFxuICAgICAgYmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIixcbiAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogXCJyaWdodCAxMnB4IGNlbnRlclwiLFxuICAgICAgYmFja2dyb3VuZFNpemU6IFwiMjBweCAyMHB4XCIsXG4gICAgICB0cmFuc2l0aW9uOiBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2VcIlxuICAgIH07XG5cbiAgICB2YXIgYWN0aW9uc1Jvd1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgIHBhZGRpbmc6IFwiMTRweCAxNnB4XCIsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZThlYWVkXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmOGZhZmMgMTAwJSlcIixcbiAgICAgIGJveFNoYWRvdzogXCIwIDFweCAzcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA2KVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuICAgIH07XG5cbiAgICB2YXIgc2VsZWN0V3JhcFN0eWxlID0ge1xuICAgICAgZmxleDogXCIxIDEgMjIwcHhcIixcbiAgICAgIG1pbldpZHRoOiBcIjIwMHB4XCIsXG4gICAgICBtYXhXaWR0aDogXCIxMDAlXCJcbiAgICB9O1xuXG4gICAgdmFyIGJ0bkljb25TdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgIHdpZHRoOiBcIjQycHhcIixcbiAgICAgIGhlaWdodDogXCI0MnB4XCIsXG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2UyZThmMFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjZmZmZmZmXCIsXG4gICAgICBjb2xvcjogXCIjNDc1NTY5XCIsXG4gICAgICBjdXJzb3I6IGNvcHlCdXN5IHx8IGxvYWRpbmcgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIGZvbnRTaXplOiBcIjIwcHhcIixcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYm94U2hhZG93OiBcIjAgMXB4IDJweCByZ2JhKDE1LCAyMywgNDIsIDAuMDQpXCIsXG4gICAgICB0cmFuc2l0aW9uOiBcImJhY2tncm91bmQgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2VcIlxuICAgIH07XG5cbiAgICB2YXIgYnRuUHJpbWFyeVN0eWxlID0ge1xuICAgICAgcGFkZGluZzogXCIxMXB4IDIwcHhcIixcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgYmFja2dyb3VuZDogY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCA/IFwiIzk0YTNiOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICBmb250U2l6ZTogXCIxM3B4XCIsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDJlbVwiLFxuICAgICAgY3Vyc29yOiBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYm94U2hhZG93OlxuICAgICAgICBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCJub25lXCIgOiBcIjAgMXB4IDJweCByZ2JhKDM3LCA5OSwgMjM1LCAwLjM1KVwiLFxuICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZVwiXG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtYXJnaW5Ub3A6IFwiOHB4XCIgfSB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IFwiIzIxMjUyOVwiLCBtYXJnaW5Cb3R0b206IFwiOHB4XCIgfSB9LFxuICAgICAgICBcIlRyYW5zbGF0ZVwiXG4gICAgICApLFxuICAgICAgaGludFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsIGxpbmVIZWlnaHQ6IDEuNDUgfSB9LFxuICAgICAgICAgICAgaGludFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdHlsZTogYWN0aW9uc1Jvd1N0eWxlIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0eWxlOiBzZWxlY3RXcmFwU3R5bGUgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJzZWxlY3RcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHNlbGVjdFN0eWxlLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogc2VsZWN0RGlzYWJsZWQsXG4gICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbkZvY3VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0Rm9jdXNlZCh0cnVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb25CbHVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0Rm9jdXNlZChmYWxzZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIlRhcmdldCBsb2NhbGUgZm9yIHRyYW5zbGF0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcIm9wdGlvblwiLFxuICAgICAgICAgICAgICB7IHZhbHVlOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGxvYWRpbmcgPyBcIkxvYWRpbmdcXHUyMDI2XCIgOiBvcHRpb25zLmxlbmd0aCA9PT0gMCA/IFwiXFx1MjAxNFwiIDogXCJDaG9vc2UgbG9jYWxlXFx1MjAyNlwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb3B0aW9ucy5tYXAoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJvcHRpb25cIixcbiAgICAgICAgICAgICAgICB7IGtleTogby5sb2NhbGUsIHZhbHVlOiBvLmxvY2FsZSB9LFxuICAgICAgICAgICAgICAgIG8uZmxhZyArIFwiIFwiICsgby5sYWJlbCArIFwiIChcIiArIG8ubG9jYWxlICsgXCIpXCJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGRpc2FibGVkOiBjb3B5QnVzeSB8fCBsb2FkaW5nLFxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBsb2FkVGFyZ2V0cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiBcIlJlbG9hZCBsb2NhbGUgbGlzdFwiLFxuICAgICAgICAgICAgc3R5bGU6IGJ0bkljb25TdHlsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJcXHUyMUJCXCJcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBkaXNhYmxlZDogY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCxcbiAgICAgICAgICAgIHN0eWxlOiBidG5QcmltYXJ5U3R5bGUsXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJ1blRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJUcmFuc2xhdGVcIlxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHZhciBQSUxMX1NUWUxFUyA9IHtcbiAgICBiYXNlOiB7XG4gICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgZm9udFNpemU6IFwiMTBweFwiLFxuICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjA0ZW1cIixcbiAgICAgIHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCIsXG4gICAgICBwYWRkaW5nOiBcIjJweCA4cHhcIixcbiAgICAgIGJvcmRlclJhZGl1czogXCI5OTlweFwiLFxuICAgICAgbGluZUhlaWdodDogMS4zXG4gICAgfSxcbiAgICBzb3VyY2U6IHtcbiAgICAgIGJhY2tncm91bmQ6IFwiI2U4ZjFmZlwiLFxuICAgICAgY29sb3I6IFwiIzBkNGVhNlwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjYjZkNGZlXCJcbiAgICB9LFxuICAgIGN1cnJlbnQ6IHtcbiAgICAgIGJhY2tncm91bmQ6IFwiI2Y2ZmZlZFwiLFxuICAgICAgY29sb3I6IFwiIzIzNzgwNFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjYjdlYjhmXCJcbiAgICB9XG4gIH07XG5cbiAgdmFyIFJPV19TVVJGQUNFID0ge1xuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgZ2FwOiBcIjEwcHhcIixcbiAgICBwYWRkaW5nOiBcIjZweCAxMHB4XCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjZweFwiLFxuICAgIGJvcmRlcjogXCIxcHggc29saWQgI2UwZTBlMFwiLFxuICAgIG1hcmdpbkJvdHRvbTogXCI2cHhcIixcbiAgICBiYWNrZ3JvdW5kOiBcIiNmOWY5ZjlcIlxuICB9O1xuXG4gIHZhciBNRU5VX1RSSUdHRVJfU1RZTEUgPSB7XG4gICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZTBlMGUwXCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgIHBhZGRpbmc6IFwiNHB4IDhweFwiLFxuICAgIG1pbldpZHRoOiBcIjMycHhcIixcbiAgICBmb250U2l6ZTogXCIxNnB4XCIsXG4gICAgbGluZUhlaWdodDogMSxcbiAgICBjb2xvcjogXCIjNDQ0XCIsXG4gICAgY3Vyc29yOiBcInBvaW50ZXJcIlxuICB9O1xuXG4gIC8qKiBTdHVkaW8gNC40IG1lZ2EgbWVudSBkb2Vzbid0IGhvbm9yIGluY2x1ZGVPbmx5OyBlbmZvcmNlIGEgd2hpdGVsaXN0IGFmdGVyIG9wZW4uICovXG4gIGZ1bmN0aW9uIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICB2YXIgYWxsb3dlZExhYmVscyA9IGhpZGVFZGl0XG4gICAgICA/IHtcbiAgICAgICAgICBkZWxldGU6IDEsXG4gICAgICAgICAgXCJ2aWV3IGZvcm1cIjogMSxcbiAgICAgICAgICB1bmxvY2s6IDEsXG4gICAgICAgICAgaGlzdG9yeTogMSxcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IDFcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgZWRpdDogMSxcbiAgICAgICAgICBkZWxldGU6IDEsXG4gICAgICAgICAgXCJ2aWV3IGZvcm1cIjogMSxcbiAgICAgICAgICB1bmxvY2s6IDEsXG4gICAgICAgICAgaGlzdG9yeTogMSxcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IDFcbiAgICAgICAgfTtcbiAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlbcm9sZT0nbWVudWl0ZW0nXSwgLk11aU1lbnVJdGVtLXJvb3RcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG4gPSBub2Rlc1tpXTtcbiAgICAgIHZhciB0eHQgPSAobi50ZXh0Q29udGVudCB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghYWxsb3dlZExhYmVsc1t0eHRdKSB7XG4gICAgICAgIG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlRW5mb3JjZUFsbG93ZWRJdGVtc0luTWVnYU1lbnUoaGlkZUVkaXQpIHtcbiAgICBlbmZvcmNlQWxsb3dlZEl0ZW1zSW5PcGVuTWVnYU1lbnUoaGlkZUVkaXQpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KTtcbiAgICB9LCAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCk7XG4gICAgfSwgNjApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KTtcbiAgICB9LCAxNjApO1xuICB9XG5cbiAgZnVuY3Rpb24gVHJhbnNsYXRpb25WZXJzaW9uUm93KHByb3BzKSB7XG4gICAgdmFyIG1ldGEgPSBwcm9wcy5tZXRhO1xuICAgIHZhciBpc1NvdXJjZSA9IHByb3BzLmlzU291cmNlO1xuICAgIHZhciBleGlzdHMgPSBwcm9wcy5leGlzdHMgIT09IGZhbHNlO1xuICAgIHZhciB0YXJnZXRQYXRoID0gcHJvcHMudGFyZ2V0UGF0aDtcbiAgICB2YXIgZGlzcGF0Y2ggPSBwcm9wcy5kaXNwYXRjaDtcbiAgICB2YXIgaXNPdXRkYXRlZCA9ICEhcHJvcHMuaXNPdXRkYXRlZDtcbiAgICB2YXIgb25UcmFuc2xhdGUgPSBwcm9wcy5vblRyYW5zbGF0ZTtcbiAgICB2YXIgc2hvd1JlbW92ZVRyYW5zbGF0aW9uID0gISFwcm9wcy5zaG93UmVtb3ZlVHJhbnNsYXRpb247XG4gICAgdmFyIG9uUmVtb3ZlVHJhbnNsYXRpb24gPSBwcm9wcy5vblJlbW92ZVRyYW5zbGF0aW9uO1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoIHx8IFwiXCI7XG4gICAgdmFyIGlzQ3VycmVudFJvdyA9IGZvcm1QYXRoICYmIHRhcmdldFBhdGggJiYgbm9ybWFsaXplU3R1ZGlvUGF0aChmb3JtUGF0aCkgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCk7XG4gICAgdmFyIGlzQ29tcGFyZVNlbGVjdGVkID0gISFwcm9wcy5pc0NvbXBhcmVTZWxlY3RlZDtcbiAgICB2YXIgcm93Q2xpY2thYmxlID0gISFpc1NvdXJjZSAmJiAhaXNDdXJyZW50Um93ICYmIGV4aXN0cztcbiAgICB2YXIgcm93U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBST1dfU1VSRkFDRSk7XG4gICAgaWYgKGlzQ29tcGFyZVNlbGVjdGVkKSB7XG4gICAgICByb3dTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHJvd1N0eWxlLCB7XG4gICAgICAgIGJvcmRlckNvbG9yOiBcIiMyNTYzZWJcIixcbiAgICAgICAgYm94U2hhZG93OiBcIjAgMCAwIDFweCByZ2JhKDM3LCA5OSwgMjM1LCAwLjQ1KSBpbnNldFwiLFxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmOGZhZmNcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChyb3dDbGlja2FibGUpIHtcbiAgICAgIHJvd1N0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgcm93U3R5bGUsIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9KTtcbiAgICB9XG4gICAgdmFyIHNob3dTdHVkaW9JdGVtTWVnYU1lbnUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICghZGlzcGF0Y2ggfHwgIXRhcmdldFBhdGgpIHJldHVybjtcbiAgICAgIHZhciB0b3AgPSB0eXBlb2YgZXZlbnQuY2xpZW50WSA9PT0gXCJudW1iZXJcIiA/IGV2ZW50LmNsaWVudFkgOiAwO1xuICAgICAgdmFyIGxlZnQgPSB0eXBlb2YgZXZlbnQuY2xpZW50WCA9PT0gXCJudW1iZXJcIiA/IGV2ZW50LmNsaWVudFggOiAwO1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcIlNIT1dfSVRFTV9NRUdBX01FTlVcIixcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHBhdGg6IHRhcmdldFBhdGgsXG4gICAgICAgICAgYW5jaG9yUmVmZXJlbmNlOiBcImFuY2hvclBvc2l0aW9uXCIsXG4gICAgICAgICAgYW5jaG9yUG9zaXRpb246IHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNjaGVkdWxlRW5mb3JjZUFsbG93ZWRJdGVtc0luTWVnYU1lbnUoaXNDdXJyZW50Um93KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6IFwidHJhbnNsYXRpb24tdmVyc2lvbnMtcm93XCIsXG4gICAgICAgIHN0eWxlOiByb3dTdHlsZSxcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMub25BY3RpdmF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBwcm9wcy5vbkFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgaXNTb3VyY2U6ICEhaXNTb3VyY2UsXG4gICAgICAgICAgICAgIGlzQ3VycmVudFJvdzogISFpc0N1cnJlbnRSb3dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcm9sZTogcm93Q2xpY2thYmxlID8gXCJidXR0b25cIiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGFiSW5kZXg6IHJvd0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWQsXG4gICAgICAgIG9uS2V5RG93bjogcm93Q2xpY2thYmxlXG4gICAgICAgICAgPyBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMub25BY3RpdmF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBwcm9wcy5vbkFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgaXNTb3VyY2U6ICEhaXNTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudFJvdzogISFpc0N1cnJlbnRSb3dcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICB0aXRsZTogcm93Q2xpY2thYmxlID8gXCJTaG93IHNvdXJjZSBmaWVsZHMgKHJlYWQtb25seSkgbmV4dCB0byB0aGlzIGZvcm1cIiA6IHVuZGVmaW5lZFxuICAgICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEuMTVyZW1cIiwgbGluZUhlaWdodDogMSB9LCBcImFyaWEtaGlkZGVuXCI6IHRydWUgfSxcbiAgICAgICAgbWV0YS5mbGFnXG4gICAgICApLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBtaW5XaWR0aDogXCI3MnB4XCIsIGZvbnRTaXplOiBcIjEzcHhcIiwgY29sb3I6IFwiIzIxMjUyOVwiIH0gfSxcbiAgICAgICAgbWV0YS5sYWJlbFxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGZsZXg6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzU291cmNlXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgUElMTF9TVFlMRVMuYmFzZSwgUElMTF9TVFlMRVMuc291cmNlKSB9LFxuICAgICAgICAgICAgICBcIlNvdXJjZVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBpc091dGRhdGVkXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgUElMTF9TVFlMRVMuYmFzZSwgeyBiYWNrZ3JvdW5kOiBcIiNmZmY3ZTZcIiwgY29sb3I6IFwiI2FkNjgwMFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNmZmQ1OTFcIiB9KSwgdGl0bGU6IFwiT3V0ZGF0ZWQgdHJhbnNsYXRpb25cIiB9LFxuICAgICAgICAgICAgICBcIlxcdUQ4M0RcXHVERUE5IE91dGRhdGVkXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG51bGwsXG4gICAgICAgIGlzQ3VycmVudFJvd1xuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIFBJTExfU1RZTEVTLmJhc2UsIFBJTExfU1RZTEVTLmN1cnJlbnQpLCB0aXRsZTogXCJUaGlzIGlzIHRoZSBpdGVtIHlvdSBoYXZlIG9wZW4gaW4gdGhlIGZvcm1cIiB9LFxuICAgICAgICAgICAgICBcIkN1cnJlbnRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3R5bGU6IHsgbWFyZ2luTGVmdDogXCJhdXRvXCIsIGZsZXhTaHJpbms6IDAsIGRpc3BsYXk6IFwiZmxleFwiLCBnYXA6IFwiNnB4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfSB9LFxuICAgICAgICBleGlzdHNcbiAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIiwgZ2FwOiBcIjZweFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0gfSxcbiAgICAgICAgICAgICAgc2hvd1JlbW92ZVRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXYgJiYgZXYuc3RvcFByb3BhZ2F0aW9uKSBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25SZW1vdmVUcmFuc2xhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlVHJhbnNsYXRpb24odGFyZ2V0UGF0aCwgbWV0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogXCJSZW1vdmUgdHJhbnNsYXRpb24gZm9yIFwiICsgbWV0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVtb3ZlIHRoaXMgdHJhbnNsYXRlZCBwYWdlIChvcHRpb25hbCBzaGFyZWQgY29tcG9uZW50cyB3aXRoIG5vIG90aGVyIHBhZ2UgcmVmZXJlbmNlcylcIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJSZW1vdmVcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1zbVwiLFxuICAgICAgICAgICAgICAgICAgb25DbGljazogc2hvd1N0dWRpb0l0ZW1NZWdhTWVudSxcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiAoaXNDdXJyZW50Um93ID8gXCJPcHRpb25zIChlZGl0aW5nIHRoaXMgaXRlbSDigJQgRWRpdCBoaWRkZW4pIFwiIDogXCJPcHRpb25zIGZvciBcIikgKyBtZXRhLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGlzQ3VycmVudFJvdyA/IFwiT3BlbiBpdGVtIG1lbnUgKEVkaXQgaXMgaGlkZGVuIHdoaWxlIHRoaXMgZm9ybSBpcyBvcGVuIGZvciB0aGlzIHBhdGgpXCIgOiBcIkl0ZW0gYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IE1FTlVfVFJJR0dFUl9TVFlMRVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJcXHUyMkVFXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4teHNcIixcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChldiAmJiBldi5zdG9wUHJvcGFnYXRpb24pIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvblRyYW5zbGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uVHJhbnNsYXRlKHRhcmdldFBhdGgsIG1ldGEpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiVHJhbnNsYXRlIHRvIFwiICsgbWV0YS5sYWJlbFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlRyYW5zbGF0ZVwiXG4gICAgICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFRyYW5zbGF0aW9uVmVyc2lvbnNQYW5lbChwcm9wcykge1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoO1xuICAgIHZhciBzaXRlSWQgPSBwcm9wcy5zaXRlSWQ7XG4gICAgdmFyIG1vZGVsID0gcHJvcHMubW9kZWwgfHwge307XG4gICAgdmFyIGZvcm0gPSBwcm9wcy5mb3JtO1xuICAgIHZhciBjb250cm9sQ29udGFpbmVyRWwgPSBwcm9wcy5jb250cm9sQ29udGFpbmVyRWw7XG4gICAgdmFyIHJlc29sdmVkQ29udGVudFR5cGVJZCA9IFN0cmluZyhcbiAgICAgIHByb3BzLmNvbnRlbnRUeXBlSWQgfHwgbW9kZWxbXCJjb250ZW50LXR5cGVcIl0gfHwgbW9kZWwuY29udGVudFR5cGUgfHwgXCJcIlxuICAgICkudHJpbSgpO1xuXG4gICAgdmFyIHNvdXJjZUxvY2FsZSA9IChtb2RlbC5zb3VyY2VMb2NhbGVDb2RlX3MgJiYgU3RyaW5nKG1vZGVsLnNvdXJjZUxvY2FsZUNvZGVfcykudHJpbSgpLnRvTG93ZXJDYXNlKCkpIHx8IFwiXCI7XG4gICAgdmFyIG1vZGVsTG9jYWxlID0gKG1vZGVsLmxvY2FsZUNvZGVfcyAmJiBTdHJpbmcobW9kZWwubG9jYWxlQ29kZV9zKS50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgXCJcIjtcbiAgICB2YXIgcGF0aExvY2FsZSA9IGdldExvY2FsZUZyb21QYXRoKGZvcm1QYXRoKSB8fCBcIlwiO1xuXG4gICAgLy8gU291cmNlIGluZGljYXRvciBpcyBkYXRhLWRyaXZlbiBvbmx5IGZyb20gWE1MIHNvdXJjZUxvY2FsZUNvZGVfcy5cbiAgICAvLyBJZiBtaXNzaW5nLCBkbyBub3QgbWFyayBhbnkgcm93IGFzIHNvdXJjZS5cbiAgICB2YXIgcmVzb2x2ZWRTb3VyY2UgPSBzb3VyY2VMb2NhbGU7XG4gICAgdmFyIHJlc29sdmVkU291cmNlS2V5ID0gU3RyaW5nKHJlc29sdmVkU291cmNlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB2YXIgcm9vdERpciA9IGdldE11bHRpTG9jYWxlUm9vdERpcihmb3JtUGF0aCk7XG5cbiAgICB2YXIgYXV0aG9yaW5nQmFzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIGF1dGhvcmluZ0Jhc2UgPSBhdXRob3JpbmdCYXNlU3RhdGVbMF07XG4gICAgdmFyIHNldEF1dGhvcmluZ0Jhc2UgPSBhdXRob3JpbmdCYXNlU3RhdGVbMV07XG5cbiAgICB2YXIgcGF0aHNTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcbiAgICB2YXIgdHJhbnNsYXRpb25QYXRocyA9IHBhdGhzU3RhdGVbMF07XG4gICAgdmFyIHNldFRyYW5zbGF0aW9uUGF0aHMgPSBwYXRoc1N0YXRlWzFdO1xuXG4gICAgdmFyIGxvYWRpbmdTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKHRydWUpO1xuICAgIHZhciBsb2FkaW5nID0gbG9hZGluZ1N0YXRlWzBdO1xuICAgIHZhciBzZXRMb2FkaW5nID0gbG9hZGluZ1N0YXRlWzFdO1xuXG4gICAgdmFyIGZpbHRlclN0YXRlID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIGZpbHRlclF1ZXJ5ID0gZmlsdGVyU3RhdGVbMF07XG4gICAgdmFyIHNldEZpbHRlclF1ZXJ5ID0gZmlsdGVyU3RhdGVbMV07XG4gICAgdmFyIHBhZ2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuICAgIHZhciBwYWdlSW5kZXggPSBwYWdlU3RhdGVbMF07XG4gICAgdmFyIHNldFBhZ2VJbmRleCA9IHBhZ2VTdGF0ZVsxXTtcblxuICAgIHZhciBsaXN0UmVmcmVzaFN0ID0gUmVhY3QudXNlU3RhdGUoMCk7XG4gICAgdmFyIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXkgPSBsaXN0UmVmcmVzaFN0WzBdO1xuICAgIHZhciBidW1wVHJhbnNsYXRpb25MaXN0ID0gbGlzdFJlZnJlc2hTdFsxXTtcbiAgICB2YXIgdHJhbnNsYXRpb25DZmdTdCA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIHZhciB0cmFuc2xhdGlvbkNmZyA9IHRyYW5zbGF0aW9uQ2ZnU3RbMF07XG4gICAgdmFyIHNldFRyYW5zbGF0aW9uQ2ZnID0gdHJhbnNsYXRpb25DZmdTdFsxXTtcblxuICAgIHZhciBzdGFsZUJ5UGF0aFN0ID0gUmVhY3QudXNlU3RhdGUoe30pO1xuICAgIHZhciBzdGFsZUJ5UGF0aCA9IHN0YWxlQnlQYXRoU3RbMF07XG4gICAgdmFyIHNldFN0YWxlQnlQYXRoID0gc3RhbGVCeVBhdGhTdFsxXTtcbiAgICB2YXIgZXhpc3RzQnlQYXRoU3QgPSBSZWFjdC51c2VTdGF0ZSh7fSk7XG4gICAgdmFyIGV4aXN0c0J5UGF0aCA9IGV4aXN0c0J5UGF0aFN0WzBdO1xuICAgIHZhciBzZXRFeGlzdHNCeVBhdGggPSBleGlzdHNCeVBhdGhTdFsxXTtcblxuICAgIHZhciBjb21wYXJlUGF0aFN0ID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgdmFyIGNvbXBhcmVTb3VyY2VQYXRoID0gY29tcGFyZVBhdGhTdFswXTtcbiAgICB2YXIgc2V0Q29tcGFyZVNvdXJjZVBhdGggPSBjb21wYXJlUGF0aFN0WzFdO1xuXG4gICAgdmFyIHJlbW92ZU1vZGFsU3QgPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgICB2YXIgcmVtb3ZlTW9kYWwgPSByZW1vdmVNb2RhbFN0WzBdO1xuICAgIHZhciBzZXRSZW1vdmVNb2RhbCA9IHJlbW92ZU1vZGFsU3RbMV07XG5cbiAgICB2YXIgY29sbGFwc2VkU3QgPSBSZWFjdC51c2VTdGF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVhZFRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VkKHNpdGVJZCk7XG4gICAgfSk7XG4gICAgdmFyIHdpZGdldENvbGxhcHNlZCA9IGNvbGxhcHNlZFN0WzBdO1xuICAgIHZhciBzZXRXaWRnZXRDb2xsYXBzZWQgPSBjb2xsYXBzZWRTdFsxXTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0V2lkZ2V0Q29sbGFwc2VkKHJlYWRUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZChzaXRlSWQpKTtcbiAgICAgIH0sXG4gICAgICBbc2l0ZUlkXVxuICAgICk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3RvcmFnZShlKSB7XG4gICAgICAgICAgaWYgKCFlIHx8IGUua2V5ICE9PSB0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleShzaXRlSWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBuZXh0Q29sbGFwc2VkID0gZS5uZXdWYWx1ZSA9PT0gXCIxXCI7XG4gICAgICAgICAgc2V0V2lkZ2V0Q29sbGFwc2VkKG5leHRDb2xsYXBzZWQpO1xuICAgICAgICAgIGlmIChuZXh0Q29sbGFwc2VkKSB7XG4gICAgICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25DdXN0b20oZSkge1xuICAgICAgICAgIHZhciBkZXRhaWwgPSBlICYmIGUuZGV0YWlsO1xuICAgICAgICAgIGlmICghZGV0YWlsIHx8IFN0cmluZyhkZXRhaWwuc2l0ZUlkIHx8IFwiXCIpICE9PSBTdHJpbmcoc2l0ZUlkIHx8IFwiXCIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBuZXh0Q29sbGFwc2VkID0gISFkZXRhaWwuY29sbGFwc2VkO1xuICAgICAgICAgIHNldFdpZGdldENvbGxhcHNlZChuZXh0Q29sbGFwc2VkKTtcbiAgICAgICAgICBpZiAobmV4dENvbGxhcHNlZCkge1xuICAgICAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCBvblN0b3JhZ2UpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfRVZFTlQsIG9uQ3VzdG9tKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgb25TdG9yYWdlKTtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfRVZFTlQsIG9uQ3VzdG9tKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbc2l0ZUlkXVxuICAgICk7XG5cbiAgICB2YXIgdG9nZ2xlV2lkZ2V0Q29sbGFwc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0V2lkZ2V0Q29sbGFwc2VkKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgIHZhciBuZXh0ID0gIXByZXY7XG4gICAgICAgIHdyaXRlVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQoc2l0ZUlkLCBuZXh0KTtcbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc3VmZml4ID0gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpLnN1ZmZpeDtcbiAgICB2YXIgY3VycmVudExvY2FsZSA9IChwYXRoTG9jYWxlIHx8IG1vZGVsTG9jYWxlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgc2V0UGFnZUluZGV4KDApO1xuICAgIH0sIFt0cmFuc2xhdGlvblBhdGhzLCBmaWx0ZXJRdWVyeV0pO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICAgIH0sXG4gICAgICBbZm9ybVBhdGhdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGZldGNoVHJhbnNsYXRpb25Db25maWcocmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpLCBzaXRlSWQpLnRoZW4oZnVuY3Rpb24gKGNmZykge1xuICAgICAgICAgIGlmIChhY3RpdmUpIHNldFRyYW5zbGF0aW9uQ2ZnKGNmZyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFthdXRob3JpbmdCYXNlLCBzaXRlSWRdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYWIgPSBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgICAgIHNldEF1dGhvcmluZ0Jhc2UoYWIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmlzaChsaXN0KSB7XG4gICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHNldFRyYW5zbGF0aW9uUGF0aHMobGlzdCk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhZm9ybVBhdGgpIHtcbiAgICAgICAgICBmaW5pc2goW10pO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB2YXIgc3R1ZGlvQmFzZSA9IGdldFN0dWRpb0FwaUJhc2UoKTtcbiAgICAgICAgdmFyIGxzaWQgPSBtb2RlbC5sb2NhbGVTb3VyY2VJZF9zICYmIFN0cmluZyhtb2RlbC5sb2NhbGVTb3VyY2VJZF9zKS50cmltKCk7XG4gICAgICAgIHZhciBvaWQgPSBtb2RlbC5vYmplY3RJZCAmJiBTdHJpbmcobW9kZWwub2JqZWN0SWQpLnRyaW0oKTtcbiAgICAgICAgdmFyIGN0eXBlID0gcmVzb2x2ZWRDb250ZW50VHlwZUlkO1xuICAgICAgICB2YXIgY3VyID0gKGN1cnJlbnRMb2NhbGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHBhdGhPa0ZvckxvY2FsZVByb2JlID0gQm9vbGVhbihyb290RGlyICYmIHN1ZmZpeCAhPSBudWxsKTtcblxuICAgICAgICBmdW5jdGlvbiBydW5GYWxsYmFjaygpIHtcbiAgICAgICAgICB2YXIgYmFzZSA9IGFiIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICAgICAgICBpZiAoIWJhc2UpIHtcbiAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2goW2Zvcm1QYXRoXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcGF0aE9rRm9yTG9jYWxlUHJvYmUpIHtcbiAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2goW2Zvcm1QYXRoXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgKCh0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5jb2RlcykgfHwgTVVMVElfTE9DQUxFX0NPREVTKS5tYXAoZnVuY3Rpb24gKGxvYykge1xuICAgICAgICAgICAgICB2YXIgcCA9IHBhdGhGb3JUYXJnZXRMb2NhbGUocm9vdERpciwgbG9jLCBzdWZmaXgpO1xuICAgICAgICAgICAgICByZXR1cm4gY29udGVudEV4aXN0cyhiYXNlLCBzaXRlSWQsIHApLnRoZW4oZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9rKSByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICBpZiAoY3VyICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShjdXIsIGxvYykpIHJldHVybiBwO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICB2YXIgbSA9IHt9O1xuICAgICAgICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICBpZiAocCkgbVtwXSA9IHRydWU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoZm9ybVBhdGgpIHtcbiAgICAgICAgICAgICAgICBtW2Zvcm1QYXRoXSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmluaXNoKHNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheShPYmplY3Qua2V5cyhtKSwgcmVzb2x2ZWRTb3VyY2VLZXkpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKFtmb3JtUGF0aF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUm93cyA9IHRyYW5zbGF0ZWQgY29waWVzIG9ubHk6IHNpYmxpbmcvaW5kZXggcGF0aHMgcGx1cyBvbi1kaXNrIHBhdGhzIGZvciBjb25maWd1cmVkIGxvY2FsZXMuXG4gICAgICAgICAqIERvIG5vdCBhZGQgY29uZmlnIGxvY2FsZSBwYXRocyB1bmxlc3MgY29udGVudCBleGlzdHMgKG1pc3NpbmcgbG9jYWxlcyBiZWxvbmcgaW4gVHJhbnNsYXRlIGRyb3Bkb3duIG9ubHkpLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VQYXRoc0FuZEZpbmlzaChwYXRocykge1xuICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICB2YXIgbSA9IHt9O1xuICAgICAgICAgIChwYXRocyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgaWYgKHApIG1bcF0gPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmb3JtUGF0aCkge1xuICAgICAgICAgICAgbVtmb3JtUGF0aF0gPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFwcGx5TWFwKCkge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgZmluaXNoKHNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheShPYmplY3Qua2V5cyhtKSwgcmVzb2x2ZWRTb3VyY2VLZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYmFzZSA9IGFiIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICAgICAgICB2YXIgY2ZnQ29kZXMgPVxuICAgICAgICAgICAgdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgID8gdHJhbnNsYXRpb25DZmcuY29kZXNcbiAgICAgICAgICAgICAgOiBNVUxUSV9MT0NBTEVfQ09ERVM7XG4gICAgICAgICAgaWYgKGJhc2UgJiYgc2l0ZUlkICYmIHJvb3REaXIgIT0gbnVsbCAmJiBzdWZmaXggIT0gbnVsbCAmJiBjZmdDb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICBjZmdDb2Rlcy5tYXAoZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHBhdGhGb3JUYXJnZXRMb2NhbGUocm9vdERpciwgY29kZSwgc3VmZml4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudEV4aXN0cyhiYXNlLCBzaXRlSWQsIHApLnRoZW4oZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2sgPyBwIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIChmb3VuZCB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHApIG1bcF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwcGx5TWFwKCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlNYXAoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5TWFwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqIFByZXZpZXcgT3BlblNlYXJjaCBwbHVnaW46IHNhbWUgY29udGVudC10eXBlICsgbGluZWFnZSAobG9jYWxlU291cmNlSWRfcyBvciBvYmplY3RJZCBvbiBoaXRzKS4gKi9cbiAgICAgICAgaWYgKGN0eXBlICYmIChsc2lkIHx8IG9pZCkgJiYgc3R1ZGlvQmFzZSkge1xuICAgICAgICAgIGZldGNoVHJhbnNsYXRpb25TaWJsaW5nc0Zyb21QbHVnaW4oc3R1ZGlvQmFzZSwgc2l0ZUlkLCBjdHlwZSwgbHNpZCwgb2lkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBhdGhzKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKHBhdGhzICYmIHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKHBhdGhzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGxzaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbHNpZCkudGhlbihmdW5jdGlvbiAobGVnYWN5UGF0aHMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIGlmIChsZWdhY3lQYXRocyAmJiBsZWdhY3lQYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2gobGVnYWN5UGF0aHMpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBydW5GYWxsYmFjaygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKGxzaWQgJiYgc3R1ZGlvQmFzZSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaFBhdGhzQnlMb2NhbGVTb3VyY2VJZChzdHVkaW9CYXNlLCBzaXRlSWQsIGxzaWQpXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGVnYWN5UGF0aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGVnYWN5UGF0aHMgJiYgbGVnYWN5UGF0aHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2gobGVnYWN5UGF0aHMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bkZhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBydW5GYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobHNpZCAmJiBzdHVkaW9CYXNlKSB7XG4gICAgICAgICAgc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbHNpZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYXRocykge1xuICAgICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmICghcGF0aHMgfHwgcGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbWVyZ2VQYXRoc0FuZEZpbmlzaChwYXRocyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bkZhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBmb3JtUGF0aCxcbiAgICAgICAgc2l0ZUlkLFxuICAgICAgICByb290RGlyLFxuICAgICAgICBzdWZmaXgsXG4gICAgICAgIG1vZGVsLmxvY2FsZVNvdXJjZUlkX3MsXG4gICAgICAgIG1vZGVsLm9iamVjdElkLFxuICAgICAgICByZXNvbHZlZENvbnRlbnRUeXBlSWQsXG4gICAgICAgIGN1cnJlbnRMb2NhbGUsXG4gICAgICAgIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXksXG4gICAgICAgIHRyYW5zbGF0aW9uQ2ZnXG4gICAgICBdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYmFzZSA9IGF1dGhvcmluZ0Jhc2UgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhYmFzZSB8fCAhdHJhbnNsYXRpb25QYXRocyB8fCB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldFN0YWxlQnlQYXRoKHt9KTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzb3VyY2VQYXRoID1cbiAgICAgICAgICB0cmFuc2xhdGlvblBhdGhzLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlZFNvdXJjZUtleSAmJiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobG9jLCByZXNvbHZlZFNvdXJjZUtleSk7XG4gICAgICAgICAgfSkgfHwgZm9ybVBhdGg7XG4gICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgIFtnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAoYmFzZSwgc2l0ZUlkLCBzb3VyY2VQYXRoKV0uY29uY2F0KFxuICAgICAgICAgICAgdHJhbnNsYXRpb25QYXRocy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldEl0ZW1Nb2RpZmllZFRpbWVzdGFtcChiYXNlLCBzaXRlSWQsIHApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIHZhciBzb3VyY2VNcyA9IGFyclswXTtcbiAgICAgICAgICB2YXIgbWFwID0ge307XG4gICAgICAgICAgdHJhbnNsYXRpb25QYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TXMgPSBhcnJbaSArIDFdO1xuICAgICAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIGlzU291cmNlID0gcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgICAgICAgbWFwW3BdID1cbiAgICAgICAgICAgICAgIWlzU291cmNlICYmXG4gICAgICAgICAgICAgIHNvdXJjZU1zICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgdGFyZ2V0TXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBOdW1iZXIodGFyZ2V0TXMpIDwgTnVtYmVyKHNvdXJjZU1zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRTdGFsZUJ5UGF0aChtYXApO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHNldFN0YWxlQnlQYXRoKHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCB0cmFuc2xhdGlvblBhdGhzLCByZXNvbHZlZFNvdXJjZUtleSwgZm9ybVBhdGhdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYmFzZSA9IGF1dGhvcmluZ0Jhc2UgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhYmFzZSB8fCAhdHJhbnNsYXRpb25QYXRocyB8fCB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldEV4aXN0c0J5UGF0aCh7fSk7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICB0cmFuc2xhdGlvblBhdGhzLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRFeGlzdHMoYmFzZSwgc2l0ZUlkLCBwKS50aGVuKGZ1bmN0aW9uIChvaykge1xuICAgICAgICAgICAgICByZXR1cm4gW3AsICEhb2tdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYWlycykge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgICAgICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgIG1hcFtyb3dbMF1dID0gcm93WzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRFeGlzdHNCeVBhdGgobWFwKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0RXhpc3RzQnlQYXRoKHt9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFthdXRob3JpbmdCYXNlLCBzaXRlSWQsIHRyYW5zbGF0aW9uUGF0aHNdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBvbkNsb3NlQ29tcGFyZSgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zbGF0aW9uOmNsb3NlLXNvdXJjZS1jb21wYXJlXCIsIG9uQ2xvc2VDb21wYXJlKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNsYXRpb246Y2xvc2Utc291cmNlLWNvbXBhcmVcIiwgb25DbG9zZUNvbXBhcmUpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2l0ZUlkIHx8ICFmb3JtUGF0aCB8fCAhZm9ybSB8fCAhY29udHJvbENvbnRhaW5lckVsKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYXNlID0gYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgICAgIHZhciBzcmMgPSBidWlsZExlZ2FjeVJlYWRvbmx5Rm9ybVNyYyhiYXNlLCBzaXRlSWQsIGNvbXBhcmVTb3VyY2VQYXRoIHx8IFwiXCIpO1xuICAgICAgICB2YXIgaG9zdCA9IGZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QoZm9ybSwgY29udHJvbENvbnRhaW5lckVsKTtcbiAgICAgICAgaWYgKCFob3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWRnZXRDb2xsYXBzZWQgfHwgIWNvbXBhcmVTb3VyY2VQYXRoIHx8ICFzcmMpIHtcbiAgICAgICAgICB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW53cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB3cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCwgc3JjLCBjb21wYXJlU291cmNlUGF0aCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdW53cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgW2NvbXBhcmVTb3VyY2VQYXRoLCBhdXRob3JpbmdCYXNlLCBzaXRlSWQsIGZvcm1QYXRoLCBmb3JtLCBjb250cm9sQ29udGFpbmVyRWwsIHdpZGdldENvbGxhcHNlZF1cbiAgICApO1xuXG4gICAgaWYgKCFzaXRlSWQgfHwgIWZvcm1QYXRoKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzc05hbWU6IFwiaGVscC1ibG9ja1wiLCBzdHlsZTogeyBtYXJnaW5Ub3A6IDAgfSB9LFxuICAgICAgICBcIlNhdmUgdGhlIGl0ZW0gYW5kIG9wZW4gaXQgZnJvbSB0aGUgY29udGVudCB0cmVlIHRvIHNlZSB0cmFuc2xhdGlvbiB2ZXJzaW9ucy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBnZXREaXNwYXRjaCgpO1xuICAgIHZhciB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCA9IHJlc29sdmVUcmFuc2xhdGVDb3B5U291cmNlUGF0aChcbiAgICAgIHRyYW5zbGF0aW9uQ2ZnLFxuICAgICAgcm9vdERpcixcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHRyYW5zbGF0aW9uUGF0aHMsXG4gICAgICBmb3JtUGF0aCxcbiAgICAgIHJlc29sdmVkU291cmNlS2V5XG4gICAgKTtcbiAgICB2YXIgY2xvc2VSZW1vdmVUcmFuc2xhdGlvbk1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0UmVtb3ZlTW9kYWwobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBvcGVuUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCA9IGZ1bmN0aW9uICh0YXJnZXRQYXRoLCBtZXRhKSB7XG4gICAgICBpZiAoIXNpdGVJZCB8fCAhdGFyZ2V0UGF0aCkgcmV0dXJuO1xuICAgICAgdmFyIHRwID0gdGFyZ2V0UGF0aDtcbiAgICAgIHNldFJlbW92ZU1vZGFsKHtcbiAgICAgICAgcGFnZVBhdGg6IHRwLFxuICAgICAgICBtZXRhTGFiZWw6IChtZXRhICYmIG1ldGEubGFiZWwpIHx8IHRwLFxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgY2FuZGlkYXRlczogW10sXG4gICAgICAgIHNlbGVjdGVkUGF0aHM6IHt9LFxuICAgICAgICBzdWJtaXR0aW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB2YXIgc2IgPSBnZXRTdHVkaW9BcGlCYXNlKCk7XG4gICAgICBmZXRjaFRyYW5zbGF0aW9uUmVtb3ZlQ2FuZGlkYXRlcyhzYiwgc2l0ZUlkLCB0cClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IChyZXMgJiYgcmVzLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgcmVtb3ZhYmxlIGNvbXBvbmVudHMuXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGxpc3QgPSByZXMuY2FuZGlkYXRlcyB8fCBbXTtcbiAgICAgICAgICB2YXIgc2VsID0ge307XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoYyAmJiBjLnBhdGgpIHNlbFtjLnBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwge1xuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgY2FuZGlkYXRlczogbGlzdCxcbiAgICAgICAgICAgICAgc2VsZWN0ZWRQYXRoczogc2VsLFxuICAgICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IFwiTmV0d29yayBlcnJvciBsb2FkaW5nIGNhbmRpZGF0ZXMuXCIgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlUmVtb3ZlQ2FuZGlkYXRlID0gZnVuY3Rpb24gKHBhdGgsIGNoZWNrZWQpIHtcbiAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgIGlmICghcHJldiB8fCBwcmV2LmxvYWRpbmcgfHwgcHJldi5zdWJtaXR0aW5nKSByZXR1cm4gcHJldjtcbiAgICAgICAgdmFyIG5leHRTZWwgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2LnNlbGVjdGVkUGF0aHMgfHwge30pO1xuICAgICAgICBuZXh0U2VsW3BhdGhdID0gISFjaGVja2VkO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzZWxlY3RlZFBhdGhzOiBuZXh0U2VsIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXRBbGxSZW1vdmVDYW5kaWRhdGVzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBzZXRSZW1vdmVNb2RhbChmdW5jdGlvbiAocHJldikge1xuICAgICAgICBpZiAoIXByZXYgfHwgcHJldi5sb2FkaW5nIHx8IHByZXYuc3VibWl0dGluZykgcmV0dXJuIHByZXY7XG4gICAgICAgIHZhciBuZXh0U2VsID0ge307XG4gICAgICAgIChwcmV2LmNhbmRpZGF0ZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoYyAmJiBjLnBhdGgpIG5leHRTZWxbYy5wYXRoXSA9ICEhdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzZWxlY3RlZFBhdGhzOiBuZXh0U2VsIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjb25maXJtUmVtb3ZlVHJhbnNsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXJlbW92ZU1vZGFsIHx8IHJlbW92ZU1vZGFsLmxvYWRpbmcgfHwgcmVtb3ZlTW9kYWwuc3VibWl0dGluZykgcmV0dXJuO1xuICAgICAgdmFyIHNiID0gZ2V0U3R1ZGlvQXBpQmFzZSgpO1xuICAgICAgaWYgKCFzYiB8fCAhc2l0ZUlkKSB7XG4gICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlN0dWRpbyBBUEkgYmFzZSBvciBzaXRlIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcGFnZVBhdGggPSByZW1vdmVNb2RhbC5wYWdlUGF0aDtcbiAgICAgIHZhciBzZWwgPSByZW1vdmVNb2RhbC5zZWxlY3RlZFBhdGhzIHx8IHt9O1xuICAgICAgdmFyIHBhdGhzID0gW107XG4gICAgICBPYmplY3Qua2V5cyhzZWwpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgaWYgKHNlbFtwXSkgcGF0aHMucHVzaChwKTtcbiAgICAgIH0pO1xuICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgcmV0dXJuIHByZXYgPyBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7IHN1Ym1pdHRpbmc6IHRydWUsIGVycm9yOiBudWxsIH0pIDogcHJldjtcbiAgICAgIH0pO1xuICAgICAgcG9zdFRyYW5zbGF0aW9uUmVtb3ZlKHNiLCBzaXRlSWQsIHBhZ2VQYXRoLCBwYXRocywgdHJ1ZSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBkZWxldGVkID0gKHJlcyAmJiByZXMuZGVsZXRlZCkgfHwgW107XG4gICAgICAgICAgdmFyIGZhaWxlZCA9IChyZXMgJiYgcmVzLmZhaWxlZCkgfHwgW107XG4gICAgICAgICAgdmFyIGRlbGV0ZWRQYWdlID1cbiAgICAgICAgICAgIGRlbGV0ZWQuc29tZShmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplU3R1ZGlvUGF0aChwKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aChwYWdlUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmFpbGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG1zZyA9XG4gICAgICAgICAgICAgIFwiUmVtb3ZlIGZpbmlzaGVkIHdpdGggZXJyb3JzOiBcIiArXG4gICAgICAgICAgICAgIGZhaWxlZFxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoZiAmJiBmLnBhdGgpICsgKGYgJiYgZi5tZXNzYWdlID8gXCIgKFwiICsgZi5tZXNzYWdlICsgXCIpXCIgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiOyBcIik7XG4gICAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgbXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goXG4gICAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgICBcIlJlbW92ZWQgdHJhbnNsYXRpb25cIiArXG4gICAgICAgICAgICAgICAgKGRlbGV0ZWQubGVuZ3RoID8gXCIgKFwiICsgZGVsZXRlZC5sZW5ndGggKyBcIiBpdGVtKHMpKS5cIiA6IFwiLlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVtcFRyYW5zbGF0aW9uTGlzdChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCgpO1xuICAgICAgICAgIGlmIChkZWxldGVkUGFnZSAmJiBmb3JtUGF0aCAmJiBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aChwYWdlUGF0aCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJESVNQQVRDSF9ET01fRVZFTlRcIiwgcGF5bG9hZDogeyBpZDogXCJlZGl0RGlhbG9nU3VjY2Vzc1wiIH0gfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlMSkge31cbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKFxuICAgICAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAgICAgXCJUaGUgcGFnZSB5b3UgaGFkIG9wZW4gd2FzIGRlbGV0ZWQuIENsb3NlIG9yIHJlZnJlc2ggdGhpcyBkaWFsb2cgaWYgaXQgaXMgc3RpbGwgc2hvd24uXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldiA/IE9iamVjdC5hc3NpZ24oe30sIHByZXYsIHsgc3VibWl0dGluZzogZmFsc2UsIGVycm9yOiBcIk5ldHdvcmsgZXJyb3Igd2hpbGUgZGVsZXRpbmcuXCIgfSkgOiBwcmV2O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlJlbW92ZSB0cmFuc2xhdGlvbiBmYWlsZWQgKG5ldHdvcmspLlwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBydW5UcmFuc2xhdGVGb3JSb3cgPSBmdW5jdGlvbiAodGFyZ2V0UGF0aCwgbWV0YSkge1xuICAgICAgaWYgKCFkaXNwYXRjaCB8fCAhcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpIHx8ICFzaXRlSWQgfHwgIXRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIHx8ICF0YXJnZXRQYXRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBwYXJlbnQgPSBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weSh0YXJnZXRQYXRoKTtcbiAgICAgIHZhciBjb250ZW50QXBpQmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICAgIGNvcHlJdGVtUGFzdGVTdHVkaW8oY29udGVudEFwaUJhc2UsIHNpdGVJZCwgdHJhbnNsYXRlQ29weVNvdXJjZVBhdGgsIHBhcmVudCwgdGFyZ2V0UGF0aClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCAocmVzICYmIHJlcy5tZXNzYWdlKSB8fCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJUcmFuc2xhdGVkIHRvIFwiICsgbWV0YS5sYWJlbCArIFwiOiBcIiArIHRhcmdldFBhdGgpO1xuICAgICAgICAgIGJ1bXBUcmFuc2xhdGlvbkxpc3QoZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHJldHVybiBuICsgMTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgdGFyZ2V0UGF0aCwgYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBwYXRoTGF5b3V0Tm90ZSA9XG4gICAgICAhcm9vdERpciB8fCBzdWZmaXggPT0gbnVsbFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpblRvcDogXCI0cHhcIiwgbWF4V2lkdGg6IFwiNTIwcHhcIiwgbGluZUhlaWdodDogMS40NSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJUcmFuc2xhdGlvbiBsb2NhbGUgc2hvcnRjdXRzIHdvcmsgYmVzdCB3aGVuIHRoaXMgaXRlbSBsaXZlcyB1bmRlciBhIHBhdGggbGlrZSBcIixcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL3NpdGUv4oCmL3dlYnNpdGUve2xvY2FsZX0v4oCmXCIpLFxuICAgICAgICAgICAgXCIgb3IgXCIsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9zaXRlL+KApi9jb21wb25lbnRzL3tsb2NhbGV9L+KAplwiKSxcbiAgICAgICAgICAgIFwiLiBSZWxhdGVkIHRyYW5zbGF0aW9ucyBtYXkgc3RpbGwgYXBwZWFyIGZyb20gdGhlIHNlYXJjaCBpbmRleCBhYm92ZS5cIlxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgdmFyIHNvcnRlZFBhdGhzID0gc29ydFRyYW5zbGF0aW9uUGF0aHNGb3JEaXNwbGF5KHRyYW5zbGF0aW9uUGF0aHMsIHJlc29sdmVkU291cmNlS2V5KTtcbiAgICB2YXIgZmlsdGVyZWRQYXRocyA9IGZpbHRlclRyYW5zbGF0aW9uUGF0aHMoc29ydGVkUGF0aHMsIGZpbHRlclF1ZXJ5KTtcbiAgICAvKiogTGlzdCByb3dzIG9ubHkgZm9yIGxvY2FsZXMgdGhhdCBoYXZlIGNvbnRlbnQgKG9yIHRoaXMgZm9ybSk7IG1pc3NpbmcgbG9jYWxlcyBhcHBlYXIgdW5kZXIgVHJhbnNsYXRlIG9ubHkuICovXG4gICAgdmFyIHRyYW5zbGF0ZWRPbmx5UGF0aHMgPSBmaWx0ZXJlZFBhdGhzLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgICAgaWYgKCFwKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAocCA9PT0gZm9ybVBhdGgpIHJldHVybiB0cnVlO1xuICAgICAgdmFyIGV4ID0gZXhpc3RzQnlQYXRoW3BdO1xuICAgICAgaWYgKGV4ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgdmFyIGFjdGl2ZUxvY2FsZU1ldGEgPSAodHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcubWV0YSkgfHwgTE9DQUxFX01FVEE7XG4gICAgdmFyIHRvdGFsRmlsdGVyZWQgPSB0cmFuc2xhdGVkT25seVBhdGhzLmxlbmd0aDtcbiAgICB2YXIgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbEZpbHRlcmVkIC8gVFJBTlNMQVRJT05TX1BBR0VfU0laRSkpO1xuICAgIHZhciBzYWZlUGFnZSA9IE1hdGgubWluKHBhZ2VJbmRleCwgdG90YWxQYWdlcyAtIDEpO1xuICAgIHZhciBwYWdlU3RhcnQgPSBzYWZlUGFnZSAqIFRSQU5TTEFUSU9OU19QQUdFX1NJWkU7XG4gICAgdmFyIHBhZ2VTbGljZSA9IHRyYW5zbGF0ZWRPbmx5UGF0aHMuc2xpY2UocGFnZVN0YXJ0LCBwYWdlU3RhcnQgKyBUUkFOU0xBVElPTlNfUEFHRV9TSVpFKTtcbiAgICB2YXIgcmFuZ2VGcm9tID0gdG90YWxGaWx0ZXJlZCA9PT0gMCA/IDAgOiBwYWdlU3RhcnQgKyAxO1xuICAgIHZhciByYW5nZVRvID0gTWF0aC5taW4ocGFnZVN0YXJ0ICsgVFJBTlNMQVRJT05TX1BBR0VfU0laRSwgdG90YWxGaWx0ZXJlZCk7XG5cbiAgICB2YXIgZmlsdGVyVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGdhcDogXCIxMHB4XCIsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjhweFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBpbnB1dC1zbVwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJGaWx0ZXIgYnkgbGFuZ3VhZ2UsIGNvZGUsIG9yIHBhdGhcXHUyMDI2XCIsXG4gICAgICAgIHZhbHVlOiBmaWx0ZXJRdWVyeSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2V0RmlsdGVyUXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBzdHlsZTogeyBtYXhXaWR0aDogXCIyODBweFwiLCBmbGV4OiBcIjEgMSAxODBweFwiIH0sXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIkZpbHRlciB0cmFuc2xhdGlvbnNcIlxuICAgICAgfSksXG4gICAgICB0b3RhbEZpbHRlcmVkID4gMFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIiwgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIH0gfSxcbiAgICAgICAgICAgIFwiU2hvd2luZyBcIixcbiAgICAgICAgICAgIHJhbmdlRnJvbSxcbiAgICAgICAgICAgIFwiXFx1MjAxM1wiLFxuICAgICAgICAgICAgcmFuZ2VUbyxcbiAgICAgICAgICAgIFwiIG9mIFwiLFxuICAgICAgICAgICAgdG90YWxGaWx0ZXJlZFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsXG4gICAgKTtcblxuICAgIHZhciBwYWdpbmF0aW9uQmFyID1cbiAgICAgIHRvdGFsRmlsdGVyZWQgPiBUUkFOU0xBVElPTlNfUEFHRV9TSVpFXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGVmYXVsdCBidG4teHNcIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogc2FmZVBhZ2UgPD0gMCxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRQYWdlSW5kZXgoTWF0aC5tYXgoMCwgc2FmZVBhZ2UgLSAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlByZXZpb3VzXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIgfSB9LFxuICAgICAgICAgICAgICBcIlBhZ2UgXCIsXG4gICAgICAgICAgICAgIHNhZmVQYWdlICsgMSxcbiAgICAgICAgICAgICAgXCIgLyBcIixcbiAgICAgICAgICAgICAgdG90YWxQYWdlc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHNhZmVQYWdlID49IHRvdGFsUGFnZXMgLSAxLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFBhZ2VJbmRleChNYXRoLm1pbih0b3RhbFBhZ2VzIC0gMSwgc2FmZVBhZ2UgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIk5leHRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgdmFyIG9uVHJhbnNsYXRpb25Sb3dBY3RpdmF0ZSA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICBpZiAoaW5mbyAmJiBpbmZvLmlzU291cmNlICYmICFpbmZvLmlzQ3VycmVudFJvdyAmJiBpbmZvLnRhcmdldFBhdGgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICBpZiAocHJldiAmJiBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKGluZm8udGFyZ2V0UGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaW5mby50YXJnZXRQYXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBsaXN0U2VjdGlvbiA9XG4gICAgICBsb2FkaW5nICYmIHRyYW5zbGF0aW9uUGF0aHMubGVuZ3RoID09PSAwXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI0cHggMCA4cHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJMb2FkaW5nIHRyYW5zbGF0aW9uc1xcdTIwMjZcIlxuICAgICAgICAgIClcbiAgICAgICAgOiB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBwYWRkaW5nOiBcIjRweCAwIDhweFwiIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJObyB0cmFuc2xhdGlvbnMgZm91bmQuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogbG9hZGluZyA/IDAuOSA6IDEgfSB9LFxuICAgICAgICAgICAgICBmaWx0ZXJUb29sYmFyLFxuICAgICAgICAgICAgICBwYWdlU2xpY2UubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIHBhZGRpbmc6IFwiNnB4IDBcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmlsdGVyZWQgPT09IDAgJiYgZmlsdGVyZWRQYXRocy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgPyBcIk5vIHRyYW5zbGF0ZWQgbG9jYWxlcyBtYXRjaCB5b3VyIGZpbHRlciAodW50cmFuc2xhdGVkIGxvY2FsZXMgYXJlIGluIFRyYW5zbGF0ZSBiZWxvdykuXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiTm8gdHJhbnNsYXRpb25zIG1hdGNoIHlvdXIgZmlsdGVyLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBwYWdlU2xpY2UubWFwKGZ1bmN0aW9uICh0YXJnZXRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgodGFyZ2V0UGF0aCkgfHwgXCJ1bmtub3duXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRhID1cbiAgICAgICAgICAgICAgICAgICAgICBtZXRhRm9yUGF0aExvY2FsZShhY3RpdmVMb2NhbGVNZXRhLCBsb2MpIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcIlxcdUQ4M0NcXHVERjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNTb3VyY2UgPVxuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkU291cmNlS2V5ICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShsb2MsIHJlc29sdmVkU291cmNlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IGV4aXN0c0J5UGF0aFt0YXJnZXRQYXRoXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRSb3cgPVxuICAgICAgICAgICAgICAgICAgICAgICEhZm9ybVBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAhIXRhcmdldFBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aCh0YXJnZXRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNsYXRpb25WZXJzaW9uUm93LCB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIG1ldGE6IG1ldGEsXG4gICAgICAgICAgICAgICAgICAgICAgaXNTb3VyY2U6IGlzU291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgIGV4aXN0czogZXhpc3RzLFxuICAgICAgICAgICAgICAgICAgICAgIGlzT3V0ZGF0ZWQ6ICEhc3RhbGVCeVBhdGhbdGFyZ2V0UGF0aF0sXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgb25UcmFuc2xhdGU6IHJ1blRyYW5zbGF0ZUZvclJvdyxcbiAgICAgICAgICAgICAgICAgICAgICBmb3JtUGF0aDogZm9ybVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgb25BY3RpdmF0ZTogb25UcmFuc2xhdGlvblJvd0FjdGl2YXRlLFxuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGFyZVNlbGVjdGVkOlxuICAgICAgICAgICAgICAgICAgICAgICAgISFjb21wYXJlU291cmNlUGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplU3R1ZGlvUGF0aChjb21wYXJlU291cmNlUGF0aCkgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZVRyYW5zbGF0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNTb3VyY2UgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc0N1cnJlbnRSb3cgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGFnZVRyYW5zbGF0aW9uUm93KHRhcmdldFBhdGgsIHJlc29sdmVkQ29udGVudFR5cGVJZCksXG4gICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVUcmFuc2xhdGlvbjogb3BlblJlbW92ZVRyYW5zbGF0aW9uTW9kYWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgcGFnaW5hdGlvbkJhclxuICAgICAgICAgICAgKTtcblxuICAgIHZhciBhdXRob3JpbmdCYXNlUmVzb2x2ZWQgPSBhdXRob3JpbmdCYXNlIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcblxuICAgIHZhciBhZGRUcmFuc2xhdGlvbkJhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWRkVHJhbnNsYXRpb25Mb2NhbGVCYXIsIHtcbiAgICAgIGZvcm1QYXRoOiBmb3JtUGF0aCxcbiAgICAgIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoOiB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCxcbiAgICAgIHNpdGVJZDogc2l0ZUlkLFxuICAgICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgICAgYXV0aG9yaW5nQmFzZTogYXV0aG9yaW5nQmFzZVJlc29sdmVkLFxuICAgICAgcm9vdERpcjogcm9vdERpcixcbiAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgZXhpc3RpbmdQYXRoczogdHJhbnNsYXRpb25QYXRocyxcbiAgICAgIG9uVHJhbnNsYXRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBidW1wVHJhbnNsYXRpb25MaXN0KGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBsb2NhbGVDb2RlczogdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMsXG4gICAgICBsb2NhbGVNZXRhOiB0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5tZXRhLFxuICAgICAgdHJhbnNsYXRpb25DZmc6IHRyYW5zbGF0aW9uQ2ZnXG4gICAgfSk7XG5cbiAgICB2YXIgY29tcGFyZUxheW91dEJvZHkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtaW5XaWR0aDogMCB9IH0sXG4gICAgICBsaXN0U2VjdGlvbixcbiAgICAgIGFkZFRyYW5zbGF0aW9uQmFyXG4gICAgKTtcblxuICAgIHZhciByZW1vdmVUcmFuc2xhdGlvbk1vZGFsRWwgPSBudWxsO1xuICAgIGlmIChyZW1vdmVNb2RhbCkge1xuICAgICAgdmFyIHJtID0gcmVtb3ZlTW9kYWw7XG4gICAgICB2YXIgY2FuZGlkYXRlUm93cyA9XG4gICAgICAgICFybS5sb2FkaW5nICYmIHJtLmNhbmRpZGF0ZXMgJiYgcm0uY2FuZGlkYXRlcy5sZW5ndGhcbiAgICAgICAgICA/IHJtLmNhbmRpZGF0ZXMubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHZhciBwdGggPSBjLnBhdGg7XG4gICAgICAgICAgICAgIHZhciBjaGVja2VkID0gcm0uc2VsZWN0ZWRQYXRocyAmJiBybS5zZWxlY3RlZFBhdGhzW3B0aF07XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IHB0aCxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2U4ZThlOFwiLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcm0uc3VibWl0dGluZyA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZhZmFmYVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgY2hlY2tlZDogISFjaGVja2VkLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVSZW1vdmVDYW5kaWRhdGUocHRoLCBlLnRhcmdldC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBzdHlsZTogeyBtYXJnaW5Ub3A6IFwiM3B4XCIsIGZsZXhTaHJpbms6IDAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBsaW5lSGVpZ2h0OiAxLjQsIHdvcmRCcmVhazogXCJicmVhay1hbGxcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcInN0cm9uZ1wiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiYmxvY2tcIiwgY29sb3I6IFwiIzIxMjUyOVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgKGMuaW50ZXJuYWxOYW1lICYmIFN0cmluZyhjLmludGVybmFsTmFtZSkudHJpbSgpKSB8fCBcIihubyBpbnRlcm5hbCBuYW1lKVwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIGNvbG9yOiBcIiM1NTVcIiB9IH0sIHB0aClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogbnVsbDtcblxuICAgICAgcmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6IFwiZGlhbG9nXCIsXG4gICAgICAgICAgXCJhcmlhLW1vZGFsXCI6IFwidHJ1ZVwiLFxuICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwidHJhbnNsYXRpb24tcmVtb3ZlLXRyYW5zbGF0aW9uLXRpdGxlXCIsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgIHpJbmRleDogMTAwNTAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40NSlcIixcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgcGFkZGluZzogXCIxNnB4XCIsXG4gICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQgJiYgIXJtLnN1Ym1pdHRpbmcpIGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICAgICAgICAgIG1heFdpZHRoOiBcIjU2MHB4XCIsXG4gICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgbWF4SGVpZ2h0OiBcIm1pbig4NXZoLCA2ODBweClcIixcbiAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC4yMilcIixcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjE0cHggMThweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgI2VlZVwiLFxuICAgICAgICAgICAgICAgIGZsZXhTaHJpbms6IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRyYW5zbGF0aW9uLXJlbW92ZS10cmFuc2xhdGlvbi10aXRsZVwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IG1hcmdpbjogMCwgZm9udFNpemU6IFwiMTZweFwiLCBmb250V2VpZ2h0OiA2MDAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlJlbW92ZSB0cmFuc2xhdGlvblwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpblRvcDogXCI2cHhcIiwgbGluZUhlaWdodDogMS40NSB9IH0sXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHJtLm1ldGFMYWJlbCksXG4gICAgICAgICAgICAgIFwiIOKAlCBcIixcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMXB4XCIgfSB9LCBybS5wYWdlUGF0aClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiBcIjEycHggMThweFwiLCBvdmVyZmxvd1k6IFwiYXV0b1wiLCBmbGV4OiBcIjEgMSBhdXRvXCIsIG1pbkhlaWdodDogMCB9IH0sXG4gICAgICAgICAgICBybS5sb2FkaW5nXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI4cHggMFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIFwiRmluZGluZyBsb2NhbGUtc3BlY2lmaWMgY29tcG9uZW50cyBvbmx5IHVzZWQgYnkgdGhpcyBwYWdlXFx1MjAyNlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBybS5lcnJvclxuICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI4cHggMTJweFwiLCBtYXJnaW5Cb3R0b206IFwiMTBweFwiIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBybS5lcnJvclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgIXJtLmxvYWRpbmcgJiYgIXJtLmVycm9yICYmICghcm0uY2FuZGlkYXRlcyB8fCAhcm0uY2FuZGlkYXRlcy5sZW5ndGgpXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwicFwiLFxuICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIG1hcmdpbjogXCI4cHggMCAxMnB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgXCJObyBzaGFyZWQgY29tcG9uZW50cyBpbiB0aGlzIGxvY2FsZSB3ZXJlIGZvdW5kIHRoYXQgYXJlIHNhZmUgdG8gZGVsZXRlIGF1dG9tYXRpY2FsbHkgKHRoZXkgbWF5IGJlIHJlZmVyZW5jZWQgZWxzZXdoZXJlKS4gVGhlIHRyYW5zbGF0ZWQgcGFnZSBjYW4gc3RpbGwgYmUgcmVtb3ZlZCBiZWxvdy5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgIXJtLmxvYWRpbmcgJiYgcm0uY2FuZGlkYXRlcyAmJiBybS5jYW5kaWRhdGVzLmxlbmd0aFxuICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBtYXJnaW5Cb3R0b206IFwiMTBweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogXCI2cHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFwiQWxzbyBkZWxldGUgdGhlc2UgbG9jYWxlIGNvbXBvbmVudHMgKG5vIG90aGVyIHBhZ2UgcmVmZXJlbmNlcylcIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogXCJmbGV4XCIsIGdhcDogXCI4cHhcIiwgZmxleFdyYXA6IFwid3JhcFwiLCBtYXJnaW5Cb3R0b206IFwiOHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBbGxSZW1vdmVDYW5kaWRhdGVzKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJTZWxlY3QgYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWxsUmVtb3ZlQ2FuZGlkYXRlcyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcIlNlbGVjdCBub25lXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZVJvd3NcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwicFwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM4YzRhMDBcIixcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZmZmJlNlwiLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZmZlNThmXCIsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlRoZSB0cmFuc2xhdGVkIHBhZ2Ugd2lsbCBiZSBkZWxldGVkIGFmdGVyIHRoZSBzZWxlY3RlZCBjb21wb25lbnRzLiBUaGlzIGNhbm5vdCBiZSB1bmRvbmUuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTJweCAxOHB4XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyVG9wOiBcIjFweCBzb2xpZCAjZWVlXCIsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiZmxleC1lbmRcIixcbiAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgZmxleFNocmluazogMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGVmYXVsdCBidG4tc21cIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIkNhbmNlbFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGFuZ2VyIGJ0bi1zbVwiLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIXJtLmxvYWRpbmcgfHwgISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGNvbmZpcm1SZW1vdmVUcmFuc2xhdGlvblxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBybS5zdWJtaXR0aW5nID8gXCJSZW1vdmluZ1xcdTIwMjZcIiA6IFwiUmVtb3ZlIHRyYW5zbGF0aW9uXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzc05hbWU6IFwiY3N0dWRpby1mb3JtLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyIHRyYW5zbGF0aW9uLXZlcnNpb25zLWNvbnRyb2xcIiB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcbiAgICAgICAgICAgIGdhcDogd2lkZ2V0Q29sbGFwc2VkID8gXCIwXCIgOiBcIjIwcHhcIixcbiAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNkZWUyZTZcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI2cHhcIixcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRyYW5zbGF0aW9uLXZlcnNpb25zLWNvbGxhcHNlLXRvZ2dsZVwiLFxuICAgICAgICAgICAgb25DbGljazogdG9nZ2xlV2lkZ2V0Q29sbGFwc2VkLFxuICAgICAgICAgICAgXCJhcmlhLWV4cGFuZGVkXCI6IHdpZGdldENvbGxhcHNlZCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IFwidHJhbnNsYXRpb24tdmVyc2lvbnMtcGFuZWwtYm9keVwiLFxuICAgICAgICAgICAgdGl0bGU6IHdpZGdldENvbGxhcHNlZCA/IFwiRXhwYW5kIFRyYW5zbGF0aW9uc1wiIDogXCJDb2xsYXBzZSBUcmFuc2xhdGlvbnNcIixcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgcGFkZGluZzogXCIxMHB4IDEycHhcIixcbiAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiB3aWRnZXRDb2xsYXBzZWQgPyBcIm5vbmVcIiA6IFwiMXB4IHNvbGlkICNlOWVjZWZcIixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjZjhmOWZhXCIsXG4gICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgIHRleHRBbGlnbjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IFwiMThweFwiLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjNDk1MDU3XCIsXG4gICAgICAgICAgICAgICAgZmxleDogXCIwIDAgYXV0b1wiLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogd2lkZ2V0Q29sbGFwc2VkID8gXCJyb3RhdGUoLTkwZGVnKVwiIDogXCJyb3RhdGUoMGRlZylcIixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcInRyYW5zZm9ybSAwLjE1cyBlYXNlXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiXFx1MjVCQ1wiXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZmxleDogXCIxIDEgYXV0b1wiLFxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiIzIxMjUyOVwiLFxuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiLTAuMDFlbVwiLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuM1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJUcmFuc2xhdGlvbnNcIlxuICAgICAgICAgICksXG4gICAgICAgICAgd2lkZ2V0Q29sbGFwc2VkICYmIHRvdGFsRmlsdGVyZWQgPiAwXG4gICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEycHhcIiwgd2hpdGVTcGFjZTogXCJub3dyYXBcIiwgZmxleDogXCIwIDAgYXV0b1wiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvdGFsRmlsdGVyZWQgKyAodG90YWxGaWx0ZXJlZCA9PT0gMSA/IFwiIGxvY2FsZVwiIDogXCIgbG9jYWxlc1wiKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxMXB4XCIsIHdoaXRlU3BhY2U6IFwibm93cmFwXCIsIGZsZXg6IFwiMCAwIGF1dG9cIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkZ2V0Q29sbGFwc2VkID8gXCJTaG93XCIgOiBcIkhpZGVcIlxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgd2lkZ2V0Q29sbGFwc2VkXG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHJhbnNsYXRpb24tdmVyc2lvbnMtcGFuZWwtYm9keVwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcbiAgICAgICAgICAgICAgICAgIGdhcDogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCIxMnB4XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHBhdGhMYXlvdXROb3RlXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHBhdGhMYXlvdXROb3RlKVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtaW5XaWR0aDogMCB9IH0sXG4gICAgICAgICAgICAgICAgY29tcGFyZUxheW91dEJvZHlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHJlbW92ZVRyYW5zbGF0aW9uTW9kYWxFbFxuICAgICk7XG4gIH1cblxuICBDU3R1ZGlvRm9ybXMuQ29udHJvbHMuVHJhbnNsYXRpb25WZXJzaW9ucyA9XG4gICAgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRyYW5zbGF0aW9uVmVyc2lvbnMgfHxcbiAgICBmdW5jdGlvbiAoaWQsIGZvcm0sIG93bmVyLCBwcm9wZXJ0aWVzLCBjb25zdHJhaW50cykge1xuICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgdGhpcy5vd25lci5yZWdpc3RlckZpZWxkKHRoaXMpO1xuICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgICB0aGlzLmNvbnN0cmFpbnRzID0gY29uc3RyYWludHM7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbHVlID0gXCJfbm90LXNldFwiO1xuICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuc3VwcG9ydGVkUG9zdEZpeGVzID0gW107XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gIFlBSE9PLmV4dGVuZChDU3R1ZGlvRm9ybXMuQ29udHJvbHMuVHJhbnNsYXRpb25WZXJzaW9ucywgQ1N0dWRpb0Zvcm1zLkNTdHVkaW9Gb3JtRmllbGQsIHtcbiAgICAvKiogU2hvd24gaW4gdGhlIENvbnRlbnQgVHlwZXMgYnVpbGRlciBjb250cm9sIHBhbGV0dGUgKGRyYWctYW5kLWRyb3AgbGlzdCkuICovXG4gICAgZ2V0TGFiZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBcIlRyYW5zbGF0aW9uIHZlcnNpb25zIChUcmFuc2xhdGlvbilcIjtcbiAgICB9LFxuICAgIF9yZW5kZXI6IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgICB2YXIgY21zID0gQ3JhZnRlckNNU05leHQ7XG4gICAgICB2YXIgc2l0ZSA9XG4gICAgICAgICh0eXBlb2YgQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQgIT09IFwidW5kZWZpbmVkXCIgJiYgQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQuc2l0ZSkgfHxcbiAgICAgICAgKHNlbGYuZm9ybSAmJiBzZWxmLmZvcm0uc2l0ZSkgfHxcbiAgICAgICAgXCJcIjtcbiAgICAgIHZhciBpbnRlcm5hbE5hbWUgPVxuICAgICAgICAoc2VsZi5mb3JtLm1vZGVsICYmIChzZWxmLmZvcm0ubW9kZWxbXCJpbnRlcm5hbC1uYW1lXCJdIHx8IHNlbGYuZm9ybS5tb2RlbC5pbnRlcm5hbE5hbWUpKSB8fCBcIlwiO1xuICAgICAgdmFyIGNvbnRlbnRUeXBlSWQgPVxuICAgICAgICAoc2VsZi5mb3JtLm1vZGVsICYmIChzZWxmLmZvcm0ubW9kZWxbXCJjb250ZW50LXR5cGVcIl0gfHwgc2VsZi5mb3JtLm1vZGVsLmNvbnRlbnRUeXBlKSkgfHwgXCJcIjtcbiAgICAgIHZhciBwYW5lbFByb3BzID0ge1xuICAgICAgICBmb3JtUGF0aDogc2VsZi5mb3JtLnBhdGgsXG4gICAgICAgIHNpdGVJZDogc2l0ZSxcbiAgICAgICAgbW9kZWw6IHNlbGYuZm9ybS5tb2RlbCxcbiAgICAgICAgaW50ZXJuYWxOYW1lOiBpbnRlcm5hbE5hbWUsXG4gICAgICAgIGNvbnRlbnRUeXBlSWQ6IGNvbnRlbnRUeXBlSWQsXG4gICAgICAgIGZvcm06IHNlbGYuZm9ybSxcbiAgICAgICAgY29udHJvbENvbnRhaW5lckVsOiBzZWxmLmNvbnRhaW5lckVsXG4gICAgICB9O1xuICAgICAgaWYgKHNlbGYuX2Ntc1JlbmRlckhhbmRsZSAmJiBzZWxmLl9jbXNSZW5kZXJIYW5kbGUudW5tb3VudCkge1xuICAgICAgICBzZWxmLl9jbXNSZW5kZXJIYW5kbGUudW5tb3VudCh7IHJlbW92ZUNvbnRhaW5lcjogZmFsc2UgfSk7XG4gICAgICAgIHNlbGYuX2Ntc1JlbmRlckhhbmRsZSA9IG51bGw7XG4gICAgICB9XG4gICAgICBjbXNcbiAgICAgICAgLnJlbmRlcihcbiAgICAgICAgICBzZWxmLmNvbnRhaW5lckVsLFxuICAgICAgICAgIGZ1bmN0aW9uIFRyYW5zbGF0aW9uVmVyc2lvbnNCcmlkZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRyYW5zbGF0aW9uVmVyc2lvbnNQYW5lbCwgcHJvcHMpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFuZWxQcm9wc1xuICAgICAgICApXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICBzZWxmLl9jbXNSZW5kZXJIYW5kbGUgPSBoYW5kbGU7XG4gICAgICAgICAgcGluVHJhbnNsYXRpb25WZXJzaW9uc0ZpZWxkVG9Ub3BPZkZvcm0oc2VsZi5mb3JtLCBzZWxmLmNvbnRhaW5lckVsKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW3RyYW5zbGF0aW9uLXZlcnNpb25zXSBGYWlsZWQgdG8gcmVuZGVyIGNvbnRyb2xcIiwgZXJyKTtcbiAgICAgICAgICBzZWxmLmNvbnRhaW5lckVsLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIiBzdHlsZT1cIm1hcmdpbjo4cHggMFwiPlRyYW5zbGF0aW9uIGNvbnRyb2wgY291bGQgbm90IGxvYWQuIFJlZnJlc2ggU3R1ZGlvIGFuZCBjaGVjayB0aGUgYnJvd3NlciBjb25zb2xlLjwvZGl2Pic7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoY29uZmlnLCBjb250YWluZXJFbCkge1xuICAgICAgY29udGFpbmVyRWwuaWQgPSB0aGlzLmlkO1xuICAgICAgdGhpcy5jb250YWluZXJFbCA9IGNvbnRhaW5lckVsO1xuICAgICAgdGhpcy5fcmVuZGVyKHRoaXMpO1xuICAgIH0sXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyRWwpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH0sXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRpb24tdmVyc2lvbnNcIjtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZFByb3BlcnRpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRQb3N0Rml4ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZFBvc3RGaXhlcztcbiAgICB9XG4gIH0pO1xuXG4gIENTdHVkaW9BdXRob3JpbmcuTW9kdWxlLm1vZHVsZUxvYWRlZChcInRyYW5zbGF0aW9uLXZlcnNpb25zXCIsIENTdHVkaW9Gb3Jtcy5Db250cm9scy5UcmFuc2xhdGlvblZlcnNpb25zKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBDcmFmdGVyQ01TTmV4dCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBDcmFmdGVyQ01TTmV4dC5SZWFjdCkge1xuICAgIGJvb3RUcmFuc2xhdGlvblZlcnNpb25zQ29udHJvbCgpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJDcmFmdGVyQ01TLkNvZGViYXNlQnJpZGdlUmVhZHlcIiwgYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sLCB7IG9uY2U6IHRydWUgfSk7XG4gIH1cbn0pKCk7XG4iXSwibmFtZXMiOlsiYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sIiwiUmVhY3QiLCJDcmFmdGVyQ01TTmV4dCIsIlJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTIiwid2Vic2l0ZSIsImNvbXBvbmVudHMiLCJ0ZW1wbGF0ZXMiLCJzY3JpcHRzIiwiY29uZmlnIiwiTVVMVElfTE9DQUxFX0NPREVTIiwiTE9DQUxFX01FVEEiLCJsYWJlbCIsImZsYWciLCJwaW5UcmFuc2xhdGlvblZlcnNpb25zRmllbGRUb1RvcE9mRm9ybSIsImZvcm0iLCJjb250YWluZXJFbCIsImNsb3Nlc3QiLCJyb3ciLCJzZWN0aW9ucyIsImxlbmd0aCIsImZpcnN0U2VjdGlvbiIsIm1hcmtlciIsInBhcmVudCIsInBhcmVudE5vZGUiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsInN0eWxlIiwibWFyZ2luQm90dG9tIiwic2V0QXR0cmlidXRlIiwiZSIsImZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QiLCJjb250cm9sQ29udGFpbmVyRWwiLCJzZWMiLCJwZyIsImljZSIsIm5vZGVUeXBlIiwicGcyIiwiaWNlMiIsImUyIiwidW53cmFwRm9ybUNvbXBhcmVMYXlvdXQiLCJob3N0IiwiZGF0YXNldCIsInRyYW5zbGF0aW9uQ29tcGFyZVdyYXBwZWQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibWFpbiIsInF1ZXJ5U2VsZWN0b3IiLCJmaXJzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImUzIiwiU01BUlRDT1BZX0NPTVBBUkVfV0lEVEhfTFMiLCJUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfTFNfUFJFRklYIiwiVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0VWRU5UIiwidHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZVN0b3JhZ2VLZXkiLCJzaXRlSWQiLCJTdHJpbmciLCJ0cmltIiwicmVhZFRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIndyaXRlVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQiLCJjb2xsYXBzZWQiLCJzZXRJdGVtIiwiZUxzIiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZUV2IiwiYXBwbHlTb3VyY2VQYW5lV2lkdGhQeCIsImxlZnRFbCIsInRvdGFsUm93V2lkdGhQeCIsIndpZHRoUHgiLCJtaW5XIiwibWF4VyIsIk1hdGgiLCJtYXgiLCJyb3VuZCIsInciLCJtaW4iLCJmbGV4Iiwid2lkdGgiLCJtYXhXaWR0aCIsInJlYWRJbml0aWFsU291cmNlUGFuZVdpZHRoUHgiLCJob3N0V2lkdGhQeCIsIm1heEFsbG93ZWQiLCJzIiwibiIsInBhcnNlSW50IiwiaXNOYU4iLCJlMCIsImZsb29yIiwiYXR0YWNoU21hcnRjb3B5Q29tcGFyZVNwbGl0dGVyIiwic3BsaXR0ZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ0YWJJbmRleCIsImNzc1RleHQiLCJhZGRFdmVudExpc3RlbmVyIiwicG9pbnRlclR5cGUiLCJidXR0b24iLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0WCIsImNsaWVudFgiLCJzdGFydFciLCJvZmZzZXRXaWR0aCIsImdldE1heFciLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzZXRQb2ludGVyQ2FwdHVyZSIsInBvaW50ZXJJZCIsImNhcCIsIm9uTW92ZSIsImV2IiwiZHgiLCJudyIsIm9uVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVsZWFzZVBvaW50ZXJDYXB0dXJlIiwicmVsIiwibHMiLCJ3cmFwRm9ybUNvbXBhcmVMYXlvdXQiLCJpZnJhbWVTcmMiLCJwYXRoTGFiZWwiLCJleGlzdGluZ0lmcmFtZSIsInNyYyIsImNvZGVFbCIsInRleHRDb250ZW50IiwiaG9zdFciLCJpbm5lcldpZHRoIiwibGVmdCIsImhlYWRlciIsInRpdGxlQmxvY2siLCJtaW5XaWR0aCIsInN0cm9uZyIsInN1YiIsImNvZGUiLCJjbG9zZUJ0biIsInR5cGUiLCJlNCIsImlmcmFtZSIsInRpdGxlIiwiZTUiLCJnZXRMb2NhbGVMaXN0IiwiZ2V0TG9jYWxlRnJvbVBhdGgiLCJwYXRoIiwicGFydHMiLCJyZXBsYWNlIiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwibGlzdCIsImZpcnN0IiwidG9Mb3dlckNhc2UiLCJjYW5kaWRhdGUiLCJpbmRleE9mIiwidGVzdCIsImxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZSIsImEiLCJiIiwiYyIsInN0YXJ0c1dpdGgiLCJtZXRhRm9yUGF0aExvY2FsZSIsImFjdGl2ZU1ldGEiLCJsb2MiLCJsayIsImtleSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInRyYW5zbGF0aW9uTG9jYWxlQWxyZWFkeVByZXNlbnQiLCJ0cmFuc2xhdGVkTG9jYWxlcyIsInNlZyIsIm5vcm1hbGl6ZVN0dWRpb1BhdGgiLCJwIiwiZ2V0TXVsdGlMb2NhbGVSb290RGlyIiwiZnVsbFBhdGgiLCJtIiwibWF0Y2giLCJwYXRoRm9yVGFyZ2V0TG9jYWxlIiwicm9vdERpciIsImxvY2FsZSIsInN1ZmZpeCIsInIiLCJzdWYiLCJwYXJzZVN1ZmZpeEZyb21Gb3JtUGF0aCIsImZvcm1QYXRoIiwiZnAiLCJybCIsImZsIiwicmVzdCIsInNsaWNlIiwiY2hhckF0Iiwic3VmZml4UGFydHMiLCJqb2luIiwiZmlyc3RMb2NhbGVTZWdtZW50VW5kZXJSb290IiwiZXhpc3RpbmdUcmFuc2xhdGlvbkxvY2FsZUtleXMiLCJwYXRocyIsImtleXMiLCJhZGQiLCJrIiwiZm9yRWFjaCIsInBhcnNlQ29udGVudEV4aXN0c1BheWxvYWQiLCJib2R5IiwiY29udGVudCIsInJlc3BvbnNlIiwicmVzdWx0IiwiZXhpc3RzIiwicmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlIiwicHJlZiIsImdldEF1dGhvcmluZ0Jhc2UiLCJnZXRTdHVkaW9BcGlCYXNlIiwiY21zIiwiY3JhZnRlcmNtcyIsImdldFN0b3JlIiwic3RvcmUiLCJnZXRTdGF0ZSIsImVudiIsImF1dGhvcmluZ0Jhc2UiLCJDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dCIsImJhc2VVcmkiLCJnZXRDcmFmdGVyU3R1ZGlvQWpheCIsInV0aWxzIiwiYWpheCIsIm1lcmdlRmV0Y2hIZWFkZXJzIiwiZXh0cmEiLCJvdXQiLCJhc3NpZ24iLCJnZXRHbG9iYWxIZWFkZXJzIiwiY29va2llIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidW53cmFwQWpheFJlc3BvbnNlIiwicmVzIiwidW5kZWZpbmVkIiwic3R1ZGlvQWpheEdldCIsInVybCIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3Vic2NyaWJlIiwibmV4dCIsImVycm9yIiwiZmV0Y2giLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwianNvbiIsInN0YXR1cyIsInN0dWRpb0FqYXhQb3N0IiwicGF5bG9hZCIsIl90eXBlb2YiLCJKU09OIiwic3RyaW5naWZ5IiwiaCIsInBvc3QiLCJtZXRob2QiLCJ1bndyYXBQbHVnaW5TY3JpcHRSZXN1bHRCb2R5Iiwib2siLCJmZXRjaFRyYW5zbGF0aW9uUmVtb3ZlQ2FuZGlkYXRlcyIsInN0dWRpb0Jhc2UiLCJwYWdlUGF0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1lc3NhZ2UiLCJjYW5kaWRhdGVzIiwicG9zdFRyYW5zbGF0aW9uUmVtb3ZlIiwiY29tcG9uZW50UGF0aHMiLCJkZWxldGVQYWdlIiwiZGVsZXRlZCIsImZhaWxlZCIsImlzUGFnZVRyYW5zbGF0aW9uUm93IiwidGFyZ2V0UGF0aCIsImNvbnRlbnRUeXBlSWQiLCJjdCIsImVuZHNXaXRoIiwiZXh0cmFjdFBhdGhzRnJvbVNlYXJjaEl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwibG9jYWxJZCIsInB1c2giLCJleHRyYWN0UGF0aHNGcm9tUGx1Z2luUmVzdWx0IiwiaXQiLCJmZXRjaFRyYW5zbGF0aW9uU2libGluZ3NGcm9tUGx1Z2luIiwiY29udGVudFR5cGUiLCJsb2NhbGVTb3VyY2VJZCIsIm9iamVjdElkIiwibGlkIiwib2lkIiwic2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkIiwicG9zdFNlYXJjaCIsImtleXdvcmRzIiwib2Zmc2V0IiwibGltaXQiLCJmaWx0ZXJzIiwibG9jYWxlU291cmNlSWRfcyIsImJvZHkyIiwiaXRlbXMyIiwiZmxhZ0ZvckxvY2FsZUNvZGUiLCJsb2NhbGVDb2RlIiwibWFwIiwiZW4iLCJlcyIsImRlIiwiemgiLCJjbiIsImphIiwiZnIiLCJwdCIsImtvIiwiYXIiLCJmZXRjaFRyYW5zbGF0aW9uQ29uZmlnIiwiQXJyYXkiLCJpc0FycmF5IiwibGFuZ3VhZ2VzIiwiY29kZXMiLCJtZXRhIiwibGMiLCJiYXNlUmF3IiwiYmFzZUxhbmd1YWdlIiwiYmFzZUxvY2FsZSIsIlRSQU5TTEFUSU9OU19QQUdFX1NJWkUiLCJsb2NhbGVMYWJlbEZvclBhdGgiLCJzb3J0VHJhbnNsYXRpb25QYXRoc0ZvckRpc3BsYXkiLCJzb3VyY2VMb2NhbGVLZXkiLCJhcnIiLCJpc1NvdXJjZVBhdGgiLCJzb3J0IiwiYXMiLCJicyIsImxhIiwibGIiLCJjbXAiLCJsb2NhbGVDb21wYXJlIiwic2Vuc2l0aXZpdHkiLCJmaWx0ZXJUcmFuc2xhdGlvblBhdGhzIiwicXVlcnkiLCJxIiwiZ2V0RGlzcGF0Y2giLCJkaXNwYXRjaCIsImJpbmQiLCJjb250ZW50RXhpc3RzIiwiYmFzZSIsInBhcnNlVGltZXN0YW1wTXMiLCJpbnB1dCIsImlzRmluaXRlIiwiYXNOdW0iLCJOdW1iZXIiLCJwYXJzZWQiLCJEYXRlIiwicGFyc2UiLCJnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAiLCJsYXN0TW9kaWZpZWREYXRlX2R0IiwibGFzdE1vZGlmaWVkRGF0ZSIsImxhc3RFZGl0RGF0ZSIsIm1vZGlmaWVkRGF0ZSIsImRhdGVNb2RpZmllZCIsImJ1aWxkTGVnYWN5UmVhZG9ubHlGb3JtU3JjIiwibm90aWZ5RGlzcGF0Y2giLCJvcGVuU3R1ZGlvRWRpdEZvcm0iLCJhdXRob3JpbmdCYXNlRm9yRGlhbG9nIiwiYWIiLCJzaXRlIiwiaXNIaWRkZW4iLCJvblNhdmVTdWNjZXNzIiwiaWQiLCJvbkNhbmNlbCIsInJlc29sdmVUcmFuc2xhdGVDb3B5U291cmNlUGF0aCIsInRyYW5zbGF0aW9uQ2ZnIiwidHJhbnNsYXRpb25QYXRocyIsInJlc29sdmVkU291cmNlS2V5IiwiZnJvbVNvdXJjZUxvY2FsZSIsImZpbmQiLCJwYXJlbnRGb2xkZXJQYXRoRm9yQ29weSIsImkiLCJsYXN0SW5kZXhPZiIsImNvcHlJdGVtUGFzdGVTdHVkaW8iLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGFyZW50UGF0aCIsImV4cGVjdGVkVGFyZ2V0UGF0aCIsIkFERF9UUkFOU0xBVElPTl9TRUxFQ1RfQ0hFVlJPTiIsIkFkZFRyYW5zbGF0aW9uTG9jYWxlQmFyIiwicHJvcHMiLCJ0cmFuc2xhdGVDb3B5U291cmNlUGF0aCIsImV4aXN0aW5nUGF0aHMiLCJvblRyYW5zbGF0ZWQiLCJ0cmFuc2xhdGlvbkNmZ1Byb3AiLCJsb2NhbGVDb2RlcyIsImxvY2FsZU1ldGEiLCJvcHRTdCIsInVzZVN0YXRlIiwib3B0aW9ucyIsInNldE9wdGlvbnMiLCJzZWxTdCIsInNlbGVjdGVkIiwic2V0U2VsZWN0ZWQiLCJsb2FkU3QiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImJ1c3lTdCIsImNvcHlCdXN5Iiwic2V0Q29weUJ1c3kiLCJmb2N1c1NlbFN0Iiwic2VsZWN0Rm9jdXNlZCIsInNldFNlbGVjdEZvY3VzZWQiLCJsb2FkVGFyZ2V0cyIsInVzZUNhbGxiYWNrIiwiZWZmU3VmZml4IiwiYXBwbHlDb2RlcyIsInJhd0NvZGVzIiwic2VlbiIsImFjdGl2ZUNvZGVzIiwiZmV0Y2hlZCIsInVzZUVmZmVjdCIsInJ1blRyYW5zbGF0ZSIsImNob2ljZSIsImNvbnRlbnRBcGlCYXNlIiwiZTEiLCJlZmZlY3RpdmVNaXJyb3JlZFN1ZmZpeCIsImhpbnQiLCJzZWxlY3REaXNhYmxlZCIsInNlbGVjdFN0eWxlIiwiYm94U2l6aW5nIiwibWluSGVpZ2h0IiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwicGFkZGluZyIsInBhZGRpbmdSaWdodCIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm94U2hhZG93Iiwib3V0bGluZSIsImN1cnNvciIsIm9wYWNpdHkiLCJhcHBlYXJhbmNlIiwiV2Via2l0QXBwZWFyYW5jZSIsIk1vekFwcGVhcmFuY2UiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kUmVwZWF0IiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiYmFja2dyb3VuZFNpemUiLCJ0cmFuc2l0aW9uIiwiYWN0aW9uc1Jvd1N0eWxlIiwiZGlzcGxheSIsImZsZXhXcmFwIiwiZ2FwIiwiYWxpZ25JdGVtcyIsImJhY2tncm91bmQiLCJzZWxlY3RXcmFwU3R5bGUiLCJidG5JY29uU3R5bGUiLCJqdXN0aWZ5Q29udGVudCIsImhlaWdodCIsImZsZXhTaHJpbmsiLCJidG5QcmltYXJ5U3R5bGUiLCJmb250V2VpZ2h0IiwibGV0dGVyU3BhY2luZyIsIm1hcmdpblRvcCIsImRpc2FibGVkIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJvIiwib25DbGljayIsIlBJTExfU1RZTEVTIiwidGV4dFRyYW5zZm9ybSIsInNvdXJjZSIsImN1cnJlbnQiLCJST1dfU1VSRkFDRSIsIk1FTlVfVFJJR0dFUl9TVFlMRSIsImVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudSIsImhpZGVFZGl0IiwiYWxsb3dlZExhYmVscyIsInVubG9jayIsImhpc3RvcnkiLCJkZXBlbmRlbmNpZXMiLCJlZGl0Iiwibm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidHh0Iiwic2NoZWR1bGVFbmZvcmNlQWxsb3dlZEl0ZW1zSW5NZWdhTWVudSIsInNldFRpbWVvdXQiLCJUcmFuc2xhdGlvblZlcnNpb25Sb3ciLCJpc1NvdXJjZSIsImlzT3V0ZGF0ZWQiLCJvblRyYW5zbGF0ZSIsInNob3dSZW1vdmVUcmFuc2xhdGlvbiIsIm9uUmVtb3ZlVHJhbnNsYXRpb24iLCJpc0N1cnJlbnRSb3ciLCJpc0NvbXBhcmVTZWxlY3RlZCIsInJvd0NsaWNrYWJsZSIsInJvd1N0eWxlIiwiYm9yZGVyQ29sb3IiLCJzaG93U3R1ZGlvSXRlbU1lZ2FNZW51IiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b3AiLCJjbGllbnRZIiwiYW5jaG9yUmVmZXJlbmNlIiwiYW5jaG9yUG9zaXRpb24iLCJvbkFjdGl2YXRlIiwicm9sZSIsIm9uS2V5RG93biIsIm1hcmdpbkxlZnQiLCJ3aGl0ZVNwYWNlIiwiVHJhbnNsYXRpb25WZXJzaW9uc1BhbmVsIiwibW9kZWwiLCJyZXNvbHZlZENvbnRlbnRUeXBlSWQiLCJzb3VyY2VMb2NhbGUiLCJzb3VyY2VMb2NhbGVDb2RlX3MiLCJtb2RlbExvY2FsZSIsImxvY2FsZUNvZGVfcyIsInBhdGhMb2NhbGUiLCJyZXNvbHZlZFNvdXJjZSIsImF1dGhvcmluZ0Jhc2VTdGF0ZSIsInNldEF1dGhvcmluZ0Jhc2UiLCJwYXRoc1N0YXRlIiwic2V0VHJhbnNsYXRpb25QYXRocyIsImxvYWRpbmdTdGF0ZSIsImZpbHRlclN0YXRlIiwiZmlsdGVyUXVlcnkiLCJzZXRGaWx0ZXJRdWVyeSIsInBhZ2VTdGF0ZSIsInBhZ2VJbmRleCIsInNldFBhZ2VJbmRleCIsImxpc3RSZWZyZXNoU3QiLCJ0cmFuc2xhdGlvbkxpc3RSZWZyZXNoS2V5IiwiYnVtcFRyYW5zbGF0aW9uTGlzdCIsInRyYW5zbGF0aW9uQ2ZnU3QiLCJzZXRUcmFuc2xhdGlvbkNmZyIsInN0YWxlQnlQYXRoU3QiLCJzdGFsZUJ5UGF0aCIsInNldFN0YWxlQnlQYXRoIiwiZXhpc3RzQnlQYXRoU3QiLCJleGlzdHNCeVBhdGgiLCJzZXRFeGlzdHNCeVBhdGgiLCJjb21wYXJlUGF0aFN0IiwiY29tcGFyZVNvdXJjZVBhdGgiLCJzZXRDb21wYXJlU291cmNlUGF0aCIsInJlbW92ZU1vZGFsU3QiLCJyZW1vdmVNb2RhbCIsInNldFJlbW92ZU1vZGFsIiwiY29sbGFwc2VkU3QiLCJ3aWRnZXRDb2xsYXBzZWQiLCJzZXRXaWRnZXRDb2xsYXBzZWQiLCJvblN0b3JhZ2UiLCJuZXh0Q29sbGFwc2VkIiwibmV3VmFsdWUiLCJvbkN1c3RvbSIsInRvZ2dsZVdpZGdldENvbGxhcHNlZCIsInByZXYiLCJjdXJyZW50TG9jYWxlIiwiYWN0aXZlIiwiY2ZnIiwiY2FuY2VsbGVkIiwiZmluaXNoIiwibHNpZCIsImN0eXBlIiwiY3VyIiwicGF0aE9rRm9yTG9jYWxlUHJvYmUiLCJydW5GYWxsYmFjayIsIm1lcmdlUGF0aHNBbmRGaW5pc2giLCJhbGwiLCJyZXN1bHRzIiwiYXBwbHlNYXAiLCJjZmdDb2RlcyIsImZvdW5kIiwibGVnYWN5UGF0aHMiLCJjb25jYXQiLCJzb3VyY2VNcyIsInRhcmdldE1zIiwicGFpcnMiLCJvbkNsb3NlQ29tcGFyZSIsImNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCIsIm9wZW5SZW1vdmVUcmFuc2xhdGlvbk1vZGFsIiwidHAiLCJtZXRhTGFiZWwiLCJzZWxlY3RlZFBhdGhzIiwic3VibWl0dGluZyIsInNiIiwic2VsIiwidG9nZ2xlUmVtb3ZlQ2FuZGlkYXRlIiwiY2hlY2tlZCIsIm5leHRTZWwiLCJzZXRBbGxSZW1vdmVDYW5kaWRhdGVzIiwiY29uZmlybVJlbW92ZVRyYW5zbGF0aW9uIiwiZGVsZXRlZFBhZ2UiLCJzb21lIiwibXNnIiwiZiIsInJ1blRyYW5zbGF0ZUZvclJvdyIsInBhdGhMYXlvdXROb3RlIiwic29ydGVkUGF0aHMiLCJmaWx0ZXJlZFBhdGhzIiwidHJhbnNsYXRlZE9ubHlQYXRocyIsImV4IiwiYWN0aXZlTG9jYWxlTWV0YSIsInRvdGFsRmlsdGVyZWQiLCJ0b3RhbFBhZ2VzIiwiY2VpbCIsInNhZmVQYWdlIiwicGFnZVN0YXJ0IiwicGFnZVNsaWNlIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImZpbHRlclRvb2xiYXIiLCJwbGFjZWhvbGRlciIsInBhZ2luYXRpb25CYXIiLCJvblRyYW5zbGF0aW9uUm93QWN0aXZhdGUiLCJpbmZvIiwibGlzdFNlY3Rpb24iLCJhdXRob3JpbmdCYXNlUmVzb2x2ZWQiLCJhZGRUcmFuc2xhdGlvbkJhciIsImNvbXBhcmVMYXlvdXRCb2R5IiwicmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsIiwicm0iLCJjYW5kaWRhdGVSb3dzIiwicHRoIiwid29yZEJyZWFrIiwiaW50ZXJuYWxOYW1lIiwicG9zaXRpb24iLCJpbnNldCIsInpJbmRleCIsImN1cnJlbnRUYXJnZXQiLCJtYXhIZWlnaHQiLCJmbGV4RGlyZWN0aW9uIiwib3ZlcmZsb3ciLCJib3JkZXJCb3R0b20iLCJtYXJnaW4iLCJvdmVyZmxvd1kiLCJib3JkZXJUb3AiLCJ0ZXh0QWxpZ24iLCJ0cmFuc2Zvcm0iLCJDU3R1ZGlvRm9ybXMiLCJDb250cm9scyIsIlRyYW5zbGF0aW9uVmVyc2lvbnMiLCJvd25lciIsInByb3BlcnRpZXMiLCJjb25zdHJhaW50cyIsInJlZ2lzdGVyRmllbGQiLCJlcnJvcnMiLCJyZXF1aXJlZCIsInN1cHBvcnRlZFBvc3RGaXhlcyIsIllBSE9PIiwiZXh0ZW5kIiwiQ1N0dWRpb0Zvcm1GaWVsZCIsImdldExhYmVsIiwiX3JlbmRlciIsInNlbGYiLCJwYW5lbFByb3BzIiwiX2Ntc1JlbmRlckhhbmRsZSIsInVubW91bnQiLCJyZW1vdmVDb250YWluZXIiLCJyZW5kZXIiLCJUcmFuc2xhdGlvblZlcnNpb25zQnJpZGdlIiwiaGFuZGxlIiwiZXJyIiwiY29uc29sZSIsImlubmVySFRNTCIsInJlZnJlc2giLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0TmFtZSIsImdldFN1cHBvcnRlZFByb3BlcnRpZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsImdldFN1cHBvcnRlZFBvc3RGaXhlcyIsIkNTdHVkaW9BdXRob3JpbmciLCJNb2R1bGUiLCJtb2R1bGVMb2FkZWQiLCJvbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBRUEsU0FBU0EsOEJBQThCQSxHQUFHO0VBQ3hDLEVBQUEsSUFBSUMsS0FBSyxHQUFHQyxjQUFjLENBQUNELEtBQUssQ0FBQTtFQUVoQyxFQUFBLElBQUlFLHVCQUF1QixHQUFHO0VBQzVCQyxJQUFBQSxPQUFPLEVBQUUsQ0FBQztFQUNWQyxJQUFBQSxVQUFVLEVBQUUsQ0FBQztFQUNiLElBQUEsZUFBZSxFQUFFLENBQUM7RUFDbEJDLElBQUFBLFNBQVMsRUFBRSxDQUFDO0VBQ1pDLElBQUFBLE9BQU8sRUFBRSxDQUFDO0VBQ1ZDLElBQUFBLE1BQU0sRUFBRSxDQUFBO0tBQ1QsQ0FBQTtJQUlELElBQUlDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMs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LE1BQUE7T0FBUTtFQUN6RCxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxVQUFVO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDekMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLGVBQWU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUM5QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsY0FBYztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzdDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN6QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsU0FBUztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3hDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxVQUFVO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDekMsSUFBQSxRQUFRLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLElBQUE7T0FBTTtFQUN6QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsTUFBTTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3JDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFB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SUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxVQUFVO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDekMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN2QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsYUFBYTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsSUFBQTtPQUFNO0VBQzFDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxZQUFZO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDM0MsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLGFBQWE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLElBQUE7T0FBTTtFQUMxQyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsTUFBTTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3JDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsUUFBUTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxhQUFhO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDNUMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsS0FBSztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsSUFBQTtPQUFNO0VBQ2xDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxNQUFNO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDckMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLDJCQUEyQjtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzFELElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxXQUFXO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDMUMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLE9BQU8sRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsdUJBQXVCO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDekQsSUFBQSxPQUFPLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLGlCQUFpQjtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ25ELElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxXQUFXO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDMUMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN6QyxJQUFBLE9BQU8sRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsa0JBQWtCO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDcEQsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN2QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsU0FBUztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3hDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdkMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN6QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3pDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxVQUFVO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDekMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxVQUFVO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDekMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN2QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3pDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdkMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLGFBQWE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUM1QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN2QyxJQUFBLE9BQU8sRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsZ0JBQWdCO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDbEQsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLHdDQUF3QztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZFLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdkMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN6QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsU0FBUztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3hDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxNQUFNO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDckMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsUUFBUTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxZQUFZO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDM0MsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzlDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxhQUFhO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDNUMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzNDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxXQUFXO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDMUMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsS0FBSztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3BDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzNDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxjQUFjO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDN0MsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN2QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsc0JBQXNCO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDckQsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFlBQVk7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUMzQyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsNEJBQTRCO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDM0QsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN6QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsYUFBYTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzVDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFlBQVk7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUMzQyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsV0FBVztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzFDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFdBQVc7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUMxQyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSwwQkFBMEI7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN6RCxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQzNDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxtQkFBbUI7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUNsRCxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFdBQVc7RUFB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QUFFQyxNQUFBQSxJQUFJLEVBQUUsSUFBQTtPQUFNO0VBQ3pDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxXQUFXO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDMUMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLHdCQUF3QjtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZELElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdkMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsUUFBUTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN2QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3pDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsZ0JBQWdCO0VBQUVDLE1BQUFBLElBQUks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QUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLElBQUE7T0FBTTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsU0FBUztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3hDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLG1CQUFtQjtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ2xELElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN0QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLE1BQUE7T0FBUTtFQUN4QyxJQUFBLElBQUksRUFBRTtFQUFFRCxNQUFBQSxLQUFLLEVBQUUsUUFBUTtFQUFFQyxNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZDLElBQUEsSUFBSSxFQUFFO0VBQUVELE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVDLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEMsSUFBQSxJQUFJLEVBQUU7RUFBRUQsTUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsTUFB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
