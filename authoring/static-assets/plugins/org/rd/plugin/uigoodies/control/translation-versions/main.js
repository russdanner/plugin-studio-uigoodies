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
    var SPINNER_STYLE_ID = "uigoodies-translation-versions-spinner-css";
    function ensureSpinnerStyles() {
      if (typeof document === "undefined") return;
      if (document.getElementById(SPINNER_STYLE_ID)) return;
      var style = document.createElement("style");
      style.id = SPINNER_STYLE_ID;
      style.textContent = ":root,.translation-versions-control{" + "--tv-bg:#ffffff;" + "--tv-header:#f8f9fa;" + "--tv-paper:#f9f9f9;" + "--tv-paper-2:#fafafa;" + "--tv-elevated:#ffffff;" + "--tv-text:#212529;" + "--tv-text-muted:#495057;" + "--tv-text-soft:#64748b;" + "--tv-text-dim:#555555;" + "--tv-border:#dee2e6;" + "--tv-border-soft:#e9ecef;" + "--tv-border-input:#e2e8f0;" + "--tv-border-row:#e0e0e0;" + "--tv-input-bg:#ffffff;" + "--tv-input-bg-disabled:#f8fafc;" + "--tv-input-text:#0f172a;" + "--tv-btn-icon-bg:#ffffff;" + "--tv-btn-icon-fg:#475569;" + "--tv-actions-bg:linear-gradient(180deg,#ffffff 0%,#f8fafc 100%);" + "--tv-actions-border:#e8eaed;" + "--tv-busy-chip-bg:rgba(255,255,255,0.92);" + "--tv-select-focus:#3b82f6;" + "--tv-compare-selected-bg:#f8fafc;" + "--tv-pill-source-bg:#e8f1ff;" + "--tv-pill-source-fg:#0d4ea6;" + "--tv-pill-source-bd:#b6d4fe;" + "--tv-pill-current-bg:#f6ffed;" + "--tv-pill-current-fg:#237804;" + "--tv-pill-current-bd:#b7eb8f;" + "--tv-pill-outdated-bg:#fff7e6;" + "--tv-pill-outdated-fg:#ad6800;" + "--tv-pill-outdated-bd:#ffd591;" + "--tv-warn-bg:#fffbe6;" + "--tv-warn-fg:#8c4a00;" + "--tv-warn-bd:#ffe58f;" + "--tv-modal-bg:#ffffff;" + "--tv-modal-border:#eeeeee;" + "--tv-resize:#e9ecef;" + "--tv-resize-bd:#cfd4db;" + "--tv-shadow:0 1px 3px rgba(15,23,42,0.06);" + "--tv-shadow-chip:0 1px 2px rgba(15,23,42,0.08);" + "--tv-input-inset:inset 0 1px 2px rgba(15,23,42,0.04);" + "--tv-select-chevron:url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>') + "\");" + "}" + "@media (prefers-color-scheme: dark){" + ":root,.translation-versions-control{" + "--tv-bg:#1e1e1e;" + "--tv-header:#2a2a2a;" + "--tv-paper:#252525;" + "--tv-paper-2:#2a2a2a;" + "--tv-elevated:#2d2d2d;" + "--tv-text:#e8eaed;" + "--tv-text-muted:#b0b4ba;" + "--tv-text-soft:#9aa0a6;" + "--tv-text-dim:#a8adb4;" + "--tv-border:#3c4043;" + "--tv-border-soft:#3c4043;" + "--tv-border-input:#5f6368;" + "--tv-border-row:#3c4043;" + "--tv-input-bg:#2d2d2d;" + "--tv-input-bg-disabled:#252525;" + "--tv-input-text:#e8eaed;" + "--tv-btn-icon-bg:#2d2d2d;" + "--tv-btn-icon-fg:#c4c7cc;" + "--tv-actions-bg:linear-gradient(180deg,#2d2d2d 0%,#252525 100%);" + "--tv-actions-border:#3c4043;" + "--tv-busy-chip-bg:rgba(45,45,45,0.94);" + "--tv-select-focus:#60a5fa;" + "--tv-compare-selected-bg:#1e3a5f;" + "--tv-pill-source-bg:rgba(59,130,246,0.22);" + "--tv-pill-source-fg:#93c5fd;" + "--tv-pill-source-bd:rgba(147,197,253,0.45);" + "--tv-pill-current-bg:rgba(34,197,94,0.2);" + "--tv-pill-current-fg:#86efac;" + "--tv-pill-current-bd:rgba(134,239,172,0.4);" + "--tv-pill-outdated-bg:rgba(245,158,11,0.2);" + "--tv-pill-outdated-fg:#fcd34d;" + "--tv-pill-outdated-bd:rgba(252,211,77,0.4);" + "--tv-warn-bg:rgba(245,158,11,0.15);" + "--tv-warn-fg:#fcd34d;" + "--tv-warn-bd:rgba(252,211,77,0.35);" + "--tv-modal-bg:#2d2d2d;" + "--tv-modal-border:#3c4043;" + "--tv-resize:#3c4043;" + "--tv-resize-bd:#5f6368;" + "--tv-shadow:0 1px 3px rgba(0,0,0,0.45);" + "--tv-shadow-chip:0 1px 2px rgba(0,0,0,0.4);" + "--tv-input-inset:inset 0 1px 2px rgba(0,0,0,0.35);" + "--tv-select-chevron:url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>') + "\");" + "}" + ".uigoodies-tv-spinner{border-color:rgba(255,255,255,0.22);border-top-color:#60a5fa}" + "}" + "@keyframes uigoodies-tv-spin{to{transform:rotate(360deg)}}" + ".uigoodies-tv-spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(15,23,42,0.18);" + "border-top-color:#2563eb;border-radius:50%;animation:uigoodies-tv-spin 0.7s linear infinite;" + "vertical-align:-2px;flex-shrink:0}" + ".uigoodies-tv-spinner--light{border-color:rgba(255,255,255,0.35);border-top-color:#fff}" + ".uigoodies-tv-busy{display:inline-flex;align-items:center;gap:8px}" + ".uigoodies-tv-pager-btn{display:inline-flex;align-items:center;justify-content:center;" + "min-height:28px;padding:4px 10px;font-size:12px;line-height:1.2;border-radius:6px;" + "border:1px solid var(--tv-border);background:var(--tv-btn-icon-bg);color:var(--tv-btn-icon-fg);" + "cursor:pointer;box-shadow:var(--tv-shadow-chip)}" + ".uigoodies-tv-pager-btn:hover:not(:disabled){border-color:var(--tv-border-input)}" + ".uigoodies-tv-pager-btn:disabled{opacity:0.45;cursor:not-allowed}";
      document.head.appendChild(style);
    }
    ensureSpinnerStyles();
    function SpinnerEl(opts) {
      opts = opts || {};
      return React.createElement("span", {
        className: "uigoodies-tv-spinner" + (opts.light ? " uigoodies-tv-spinner--light" : ""),
        role: "progressbar",
        "aria-label": opts.label || "Loading",
        style: opts.size ? {
          width: opts.size,
          height: opts.size,
          borderWidth: Math.max(2, Math.round(opts.size / 7))
        } : undefined
      });
    }
    function BusyLabel(text, opts) {
      opts = opts || {};
      return React.createElement("span", {
        className: "uigoodies-tv-busy"
      }, SpinnerEl({
        light: !!opts.light,
        size: opts.size,
        label: text
      }), React.createElement("span", null, text));
    }
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
      splitter.style.cssText = "flex:0 0 10px;width:10px;cursor:col-resize;align-self:stretch;touch-action:none;-webkit-user-select:none;user-select:none;position:relative;background:var(--tv-resize);border-radius:4px;border:1px solid var(--tv-resize-bd);";
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
     * Puts read-only source iframe to the left of all current form fields (sections).
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
            existingIframe.style.cssText = "flex:1 1 auto;min-height:0;width:100%;height:100%;border:1px solid var(--tv-resize-bd);border-radius:6px;background:var(--tv-bg);box-sizing:border-box;";
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
        strong.style.cssText = "font-size:12px;color:var(--tv-text);";
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
        iframe.style.cssText = "flex:1 1 auto;min-height:0;width:100%;height:100%;border:1px solid var(--tv-resize-bd);border-radius:6px;background:var(--tv-bg);box-sizing:border-box;";
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

    /** Source locale row(s) first; remaining rows follow translation-config.xml order when provided. */
    function sortTranslationPathsForDisplay(paths, sourceLocaleKey, orderedLocaleCodes) {
      var src = (sourceLocaleKey || "").toLowerCase();
      var order = Array.isArray(orderedLocaleCodes) ? orderedLocaleCodes : [];
      var orderIndex = {};
      order.forEach(function (code, i) {
        var k = String(code || "").toLowerCase().replace(/_/g, "-");
        if (k && orderIndex[k] == null) orderIndex[k] = i;
      });
      function configRank(path) {
        var loc = (getLocaleFromPath(path) || "").toLowerCase().replace(/_/g, "-");
        if (!loc) return 100000;
        if (orderIndex[loc] != null) return orderIndex[loc];
        for (var key in orderIndex) {
          if (!Object.prototype.hasOwnProperty.call(orderIndex, key)) continue;
          if (localeSegmentsCompatible(loc, key)) return orderIndex[key];
        }
        return 100000 + String(loc).charCodeAt(0);
      }
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
        if (order.length > 0) {
          var ra = configRank(a);
          var rb = configRank(b);
          if (ra !== rb) {
            return ra - rb;
          }
        } else {
          var la = localeLabelForPath(a).toLowerCase();
          var lb = localeLabelForPath(b).toLowerCase();
          var cmp = la.localeCompare(lb, undefined, {
            sensitivity: "base"
          });
          if (cmp !== 0) {
            return cmp;
          }
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
            var meta = metaForPathLocale(activeMeta, loc) || {
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
        border: "1px solid " + (selectFocused && !selectDisabled ? "var(--tv-select-focus)" : "var(--tv-border-input)"),
        borderRadius: "10px",
        padding: "10px 14px",
        paddingRight: "44px",
        fontSize: "14px",
        lineHeight: 1.45,
        color: "var(--tv-input-text)",
        backgroundColor: selectDisabled ? "var(--tv-input-bg-disabled)" : "var(--tv-input-bg)",
        boxShadow: selectFocused && !selectDisabled ? "0 0 0 3px rgba(59, 130, 246, 0.2)" : "var(--tv-input-inset)",
        outline: "none",
        cursor: selectDisabled ? "not-allowed" : "pointer",
        opacity: selectDisabled ? 0.88 : 1,
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundImage: "var(--tv-select-chevron)",
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
        border: "1px solid var(--tv-actions-border)",
        background: "var(--tv-actions-bg)",
        boxShadow: "var(--tv-shadow)",
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
        border: "1px solid var(--tv-border-input)",
        background: "var(--tv-btn-icon-bg)",
        color: "var(--tv-btn-icon-fg)",
        cursor: copyBusy || loading ? "not-allowed" : "pointer",
        fontSize: "20px",
        lineHeight: 1,
        flexShrink: 0,
        boxShadow: "var(--tv-shadow-chip)",
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
          color: "var(--tv-text)",
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
        "aria-label": loading ? "Loading locales" : "Reload locale list",
        style: btnIconStyle
      }, loading ? SpinnerEl({
        size: 16,
        label: "Loading locales"
      }) : "\u21BB"), React.createElement("button", {
        type: "button",
        disabled: copyBusy || !selected || !dispatch,
        style: btnPrimaryStyle,
        onClick: function onClick() {
          runTranslate();
        }
      }, copyBusy ? BusyLabel("Translating\u2026", {
        light: true,
        size: 14
      }) : "Translate")));
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
        background: "var(--tv-pill-source-bg)",
        color: "var(--tv-pill-source-fg)",
        border: "1px solid var(--tv-pill-source-bd)"
      },
      current: {
        background: "var(--tv-pill-current-bg)",
        color: "var(--tv-pill-current-fg)",
        border: "1px solid var(--tv-pill-current-bd)"
      }
    };
    var ROW_SURFACE = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "6px 10px",
      borderRadius: "6px",
      border: "1px solid var(--tv-border-row)",
      marginBottom: "6px",
      background: "var(--tv-paper)"
    };
    var MENU_TRIGGER_STYLE = {
      background: "var(--tv-elevated)",
      border: "1px solid var(--tv-border-row)",
      borderRadius: "4px",
      padding: "4px 8px",
      minWidth: "32px",
      fontSize: "16px",
      lineHeight: 1,
      color: "var(--tv-text-muted)",
      cursor: "pointer"
    };

    /** Studio ItemMegaMenu ignores includeOnly; whitelist visible labels after open. */
    var TRANSLATION_ITEM_MENU_LABELS = {
      edit: 1,
      view: 1,
      "view form": 1,
      history: 1,
      dependencies: 1,
      publish: 1,
      "request publish": 1,
      approve: 1,
      preview: 1
    };
    function normalizeMegaMenuLabel(text) {
      return String(text || "").replace(/\s+/g, " ").trim().toLowerCase();
    }
    function isAllowedMegaMenuLabel(text, hideEdit) {
      var txt = normalizeMegaMenuLabel(text);
      if (!txt) return false;
      if (hideEdit && (txt === "edit" || txt.indexOf("edit ") === 0)) return false;
      if (TRANSLATION_ITEM_MENU_LABELS[txt]) return true;
      for (var key in TRANSLATION_ITEM_MENU_LABELS) {
        if (!Object.prototype.hasOwnProperty.call(TRANSLATION_ITEM_MENU_LABELS, key)) continue;
        if (txt === key || txt.indexOf(key + " ") === 0) return true;
      }
      return false;
    }
    function enforceAllowedItemsInOpenMegaMenu(hideEdit) {
      if (typeof document === "undefined") return;
      var nodes = document.querySelectorAll("li[role='menuitem'], .MuiMenuItem-root");
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var txt = n.textContent || "";
        if (!isAllowedMegaMenuLabel(txt, hideEdit)) {
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
      var translateBusy = !!props.translateBusy;
      var showRemoveTranslation = !!props.showRemoveTranslation;
      var onRemoveTranslation = props.onRemoveTranslation;
      var formPath = props.formPath || "";
      var isCurrentRow = formPath && targetPath && normalizeStudioPath(formPath) === normalizeStudioPath(targetPath);
      var isCompareSelected = !!props.isCompareSelected;
      var rowClickable = !!isSource && !isCurrentRow && exists;
      var rowStyle = Object.assign({}, ROW_SURFACE);
      if (isCompareSelected) {
        rowStyle = Object.assign({}, rowStyle, {
          borderColor: "var(--tv-select-focus)",
          boxShadow: "0 0 0 1px rgba(37, 99, 235, 0.45) inset",
          background: "var(--tv-compare-selected-bg)"
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
          color: "var(--tv-text)"
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
          background: "var(--tv-pill-outdated-bg)",
          color: "var(--tv-pill-outdated-fg)",
          border: "1px solid var(--tv-pill-outdated-bd)"
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
        disabled: translateBusy,
        onClick: function onClick(ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (translateBusy) return;
          if (typeof onTranslate === "function") {
            onTranslate(targetPath, meta);
          }
        },
        "aria-label": translateBusy ? "Translating to " + meta.label : "Translate to " + meta.label,
        style: {
          whiteSpace: "nowrap",
          minWidth: "88px"
        }
      }, translateBusy ? BusyLabel("Translating\u2026", {
        light: true,
        size: 12
      }) : "Translate")));
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
      var rowTranslateBusySt = React.useState("");
      var rowTranslateBusyPath = rowTranslateBusySt[0];
      var setRowTranslateBusyPath = rowTranslateBusySt[1];
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
            finish(sortTranslationPathsForDisplay(Object.keys(m), resolvedSourceKey, translationCfg && translationCfg.codes));
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
            finish(sortTranslationPathsForDisplay(Object.keys(m), resolvedSourceKey, translationCfg && translationCfg.codes));
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
        if (rowTranslateBusyPath) {
          return;
        }
        setRowTranslateBusyPath(normalizeStudioPath(targetPath));
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
        })["finally"](function () {
          setRowTranslateBusyPath("");
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
      var sortedPaths = sortTranslationPathsForDisplay(translationPaths, resolvedSourceKey, translationCfg && translationCfg.codes);
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
          flex: "1 1 180px",
          background: "var(--tv-input-bg)",
          color: "var(--tv-input-text)",
          border: "1px solid var(--tv-border-input)"
        },
        "aria-label": "Filter translations"
      }), totalFiltered > 0 ? React.createElement("span", {
        style: {
          fontSize: "12px",
          whiteSpace: "nowrap",
          color: "var(--tv-text-muted)"
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
        className: "uigoodies-tv-pager-btn",
        disabled: safePage <= 0,
        onClick: function onClick() {
          setPageIndex(Math.max(0, safePage - 1));
        }
      }, "Previous"), React.createElement("span", {
        style: {
          fontSize: "12px",
          color: "var(--tv-text-muted)"
        }
      }, "Page ", safePage + 1, " / ", totalPages), React.createElement("button", {
        type: "button",
        className: "uigoodies-tv-pager-btn",
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
        className: "text-muted uigoodies-tv-busy",
        style: {
          fontSize: "13px",
          padding: "8px 0",
          gap: "10px"
        },
        role: "status",
        "aria-live": "polite"
      }, SpinnerEl({
        size: 16,
        label: "Loading translations"
      }), React.createElement("span", null, "Loading translations\u2026")) : translationPaths.length === 0 ? React.createElement("div", {
        className: "text-muted",
        style: {
          fontSize: "13px",
          padding: "4px 0 8px"
        }
      }, "No translations found.") : React.createElement("div", {
        style: {
          opacity: loading ? 0.55 : 1,
          position: "relative",
          pointerEvents: loading ? "none" : undefined
        }
      }, loading && translationPaths.length > 0 ? React.createElement("div", {
        className: "uigoodies-tv-busy",
        style: {
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 2,
          fontSize: "12px",
          color: "var(--tv-text-soft)",
          background: "var(--tv-busy-chip-bg)",
          padding: "4px 8px",
          borderRadius: "8px",
          boxShadow: "var(--tv-shadow-chip)"
        },
        role: "status"
      }, SpinnerEl({
        size: 12,
        label: "Refreshing translations"
      }), React.createElement("span", null, "Refreshing\u2026")) : null, filterToolbar, pageSlice.length === 0 ? React.createElement("div", {
        style: {
          fontSize: "13px",
          padding: "6px 0",
          color: "var(--tv-text-muted)"
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
          translateBusy: !!rowTranslateBusyPath && normalizeStudioPath(rowTranslateBusyPath) === normalizeStudioPath(targetPath),
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
              border: "1px solid var(--tv-border-soft)",
              marginBottom: "6px",
              cursor: rm.submitting ? "default" : "pointer",
              background: "var(--tv-paper-2)"
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
              color: "var(--tv-text)"
            }
          }, c.internalName && String(c.internalName).trim() || "(no internal name)"), React.createElement("code", {
            style: {
              fontSize: "12px",
              color: "var(--tv-text-dim)"
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
            background: "var(--tv-modal-bg)",
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
            borderBottom: "1px solid var(--tv-modal-border)",
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
          className: "text-muted uigoodies-tv-busy",
          style: {
            fontSize: "13px",
            padding: "8px 0",
            gap: "10px"
          },
          role: "status"
        }, SpinnerEl({
          size: 16,
          label: "Finding components"
        }), React.createElement("span", null, "Finding locale-specific components only used by this page\u2026")) : null, rm.error ? React.createElement("div", {
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
            color: "var(--tv-warn-fg)",
            background: "var(--tv-warn-bg)",
            border: "1px solid var(--tv-warn-bd)",
            borderRadius: "4px",
            padding: "8px 10px",
            marginTop: "12px",
            marginBottom: 0
          }
        }, "The translated page will be deleted after the selected components. This cannot be undone.")), React.createElement("div", {
          style: {
            padding: "12px 18px",
            borderTop: "1px solid var(--tv-modal-border)",
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
          border: "1px solid var(--tv-border)",
          borderRadius: "6px",
          background: "var(--tv-bg)",
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
          borderBottom: widgetCollapsed ? "none" : "1px solid var(--tv-border-soft)",
          background: "var(--tv-header)",
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
          color: "var(--tv-text-muted)",
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
          color: "var(--tv-text)",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3BhY2thZ2VzL3RyYW5zbGF0aW9uLXZlcnNpb25zL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBib290VHJhbnNsYXRpb25WZXJzaW9uc0NvbnRyb2woKSB7XG4gIHZhciBSZWFjdCA9IENyYWZ0ZXJDTVNOZXh0LlJlYWN0O1xuXG4gIHZhciBTUElOTkVSX1NUWUxFX0lEID0gXCJ1aWdvb2RpZXMtdHJhbnNsYXRpb24tdmVyc2lvbnMtc3Bpbm5lci1jc3NcIjtcbiAgZnVuY3Rpb24gZW5zdXJlU3Bpbm5lclN0eWxlcygpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFNQSU5ORVJfU1RZTEVfSUQpKSByZXR1cm47XG4gICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLmlkID0gU1BJTk5FUl9TVFlMRV9JRDtcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9XG4gICAgICBcIjpyb290LC50cmFuc2xhdGlvbi12ZXJzaW9ucy1jb250cm9se1wiICtcbiAgICAgIFwiLS10di1iZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di1oZWFkZXI6I2Y4ZjlmYTtcIiArXG4gICAgICBcIi0tdHYtcGFwZXI6I2Y5ZjlmOTtcIiArXG4gICAgICBcIi0tdHYtcGFwZXItMjojZmFmYWZhO1wiICtcbiAgICAgIFwiLS10di1lbGV2YXRlZDojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di10ZXh0OiMyMTI1Mjk7XCIgK1xuICAgICAgXCItLXR2LXRleHQtbXV0ZWQ6IzQ5NTA1NztcIiArXG4gICAgICBcIi0tdHYtdGV4dC1zb2Z0OiM2NDc0OGI7XCIgK1xuICAgICAgXCItLXR2LXRleHQtZGltOiM1NTU1NTU7XCIgK1xuICAgICAgXCItLXR2LWJvcmRlcjojZGVlMmU2O1wiICtcbiAgICAgIFwiLS10di1ib3JkZXItc29mdDojZTllY2VmO1wiICtcbiAgICAgIFwiLS10di1ib3JkZXItaW5wdXQ6I2UyZThmMDtcIiArXG4gICAgICBcIi0tdHYtYm9yZGVyLXJvdzojZTBlMGUwO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC1iZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC1iZy1kaXNhYmxlZDojZjhmYWZjO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC10ZXh0OiMwZjE3MmE7XCIgK1xuICAgICAgXCItLXR2LWJ0bi1pY29uLWJnOiNmZmZmZmY7XCIgK1xuICAgICAgXCItLXR2LWJ0bi1pY29uLWZnOiM0NzU1Njk7XCIgK1xuICAgICAgXCItLXR2LWFjdGlvbnMtYmc6bGluZWFyLWdyYWRpZW50KDE4MGRlZywjZmZmZmZmIDAlLCNmOGZhZmMgMTAwJSk7XCIgK1xuICAgICAgXCItLXR2LWFjdGlvbnMtYm9yZGVyOiNlOGVhZWQ7XCIgK1xuICAgICAgXCItLXR2LWJ1c3ktY2hpcC1iZzpyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpO1wiICtcbiAgICAgIFwiLS10di1zZWxlY3QtZm9jdXM6IzNiODJmNjtcIiArXG4gICAgICBcIi0tdHYtY29tcGFyZS1zZWxlY3RlZC1iZzojZjhmYWZjO1wiICtcbiAgICAgIFwiLS10di1waWxsLXNvdXJjZS1iZzojZThmMWZmO1wiICtcbiAgICAgIFwiLS10di1waWxsLXNvdXJjZS1mZzojMGQ0ZWE2O1wiICtcbiAgICAgIFwiLS10di1waWxsLXNvdXJjZS1iZDojYjZkNGZlO1wiICtcbiAgICAgIFwiLS10di1waWxsLWN1cnJlbnQtYmc6I2Y2ZmZlZDtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1jdXJyZW50LWZnOiMyMzc4MDQ7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtY3VycmVudC1iZDojYjdlYjhmO1wiICtcbiAgICAgIFwiLS10di1waWxsLW91dGRhdGVkLWJnOiNmZmY3ZTY7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtb3V0ZGF0ZWQtZmc6I2FkNjgwMDtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1vdXRkYXRlZC1iZDojZmZkNTkxO1wiICtcbiAgICAgIFwiLS10di13YXJuLWJnOiNmZmZiZTY7XCIgK1xuICAgICAgXCItLXR2LXdhcm4tZmc6IzhjNGEwMDtcIiArXG4gICAgICBcIi0tdHYtd2Fybi1iZDojZmZlNThmO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1iZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1ib3JkZXI6I2VlZWVlZTtcIiArXG4gICAgICBcIi0tdHYtcmVzaXplOiNlOWVjZWY7XCIgK1xuICAgICAgXCItLXR2LXJlc2l6ZS1iZDojY2ZkNGRiO1wiICtcbiAgICAgIFwiLS10di1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMTUsMjMsNDIsMC4wNik7XCIgK1xuICAgICAgXCItLXR2LXNoYWRvdy1jaGlwOjAgMXB4IDJweCByZ2JhKDE1LDIzLDQyLDAuMDgpO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC1pbnNldDppbnNldCAwIDFweCAycHggcmdiYSgxNSwyMyw0MiwwLjA0KTtcIiArXG4gICAgICBcIi0tdHYtc2VsZWN0LWNoZXZyb246dXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsXCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzY0NzQ4YlwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTYgOWw2IDYgNi02XCIvPjwvc3ZnPidcbiAgICAgICkgK1xuICAgICAgXCJcXFwiKTtcIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspe1wiICtcbiAgICAgIFwiOnJvb3QsLnRyYW5zbGF0aW9uLXZlcnNpb25zLWNvbnRyb2x7XCIgK1xuICAgICAgXCItLXR2LWJnOiMxZTFlMWU7XCIgK1xuICAgICAgXCItLXR2LWhlYWRlcjojMmEyYTJhO1wiICtcbiAgICAgIFwiLS10di1wYXBlcjojMjUyNTI1O1wiICtcbiAgICAgIFwiLS10di1wYXBlci0yOiMyYTJhMmE7XCIgK1xuICAgICAgXCItLXR2LWVsZXZhdGVkOiMyZDJkMmQ7XCIgK1xuICAgICAgXCItLXR2LXRleHQ6I2U4ZWFlZDtcIiArXG4gICAgICBcIi0tdHYtdGV4dC1tdXRlZDojYjBiNGJhO1wiICtcbiAgICAgIFwiLS10di10ZXh0LXNvZnQ6IzlhYTBhNjtcIiArXG4gICAgICBcIi0tdHYtdGV4dC1kaW06I2E4YWRiNDtcIiArXG4gICAgICBcIi0tdHYtYm9yZGVyOiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LWJvcmRlci1zb2Z0OiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LWJvcmRlci1pbnB1dDojNWY2MzY4O1wiICtcbiAgICAgIFwiLS10di1ib3JkZXItcm93OiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LWJnOiMyZDJkMmQ7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LWJnLWRpc2FibGVkOiMyNTI1MjU7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LXRleHQ6I2U4ZWFlZDtcIiArXG4gICAgICBcIi0tdHYtYnRuLWljb24tYmc6IzJkMmQyZDtcIiArXG4gICAgICBcIi0tdHYtYnRuLWljb24tZmc6I2M0YzdjYztcIiArXG4gICAgICBcIi0tdHYtYWN0aW9ucy1iZzpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCMyZDJkMmQgMCUsIzI1MjUyNSAxMDAlKTtcIiArXG4gICAgICBcIi0tdHYtYWN0aW9ucy1ib3JkZXI6IzNjNDA0MztcIiArXG4gICAgICBcIi0tdHYtYnVzeS1jaGlwLWJnOnJnYmEoNDUsNDUsNDUsMC45NCk7XCIgK1xuICAgICAgXCItLXR2LXNlbGVjdC1mb2N1czojNjBhNWZhO1wiICtcbiAgICAgIFwiLS10di1jb21wYXJlLXNlbGVjdGVkLWJnOiMxZTNhNWY7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtc291cmNlLWJnOnJnYmEoNTksMTMwLDI0NiwwLjIyKTtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1zb3VyY2UtZmc6IzkzYzVmZDtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1zb3VyY2UtYmQ6cmdiYSgxNDcsMTk3LDI1MywwLjQ1KTtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1jdXJyZW50LWJnOnJnYmEoMzQsMTk3LDk0LDAuMik7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtY3VycmVudC1mZzojODZlZmFjO1wiICtcbiAgICAgIFwiLS10di1waWxsLWN1cnJlbnQtYmQ6cmdiYSgxMzQsMjM5LDE3MiwwLjQpO1wiICtcbiAgICAgIFwiLS10di1waWxsLW91dGRhdGVkLWJnOnJnYmEoMjQ1LDE1OCwxMSwwLjIpO1wiICtcbiAgICAgIFwiLS10di1waWxsLW91dGRhdGVkLWZnOiNmY2QzNGQ7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtb3V0ZGF0ZWQtYmQ6cmdiYSgyNTIsMjExLDc3LDAuNCk7XCIgK1xuICAgICAgXCItLXR2LXdhcm4tYmc6cmdiYSgyNDUsMTU4LDExLDAuMTUpO1wiICtcbiAgICAgIFwiLS10di13YXJuLWZnOiNmY2QzNGQ7XCIgK1xuICAgICAgXCItLXR2LXdhcm4tYmQ6cmdiYSgyNTIsMjExLDc3LDAuMzUpO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1iZzojMmQyZDJkO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1ib3JkZXI6IzNjNDA0MztcIiArXG4gICAgICBcIi0tdHYtcmVzaXplOiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LXJlc2l6ZS1iZDojNWY2MzY4O1wiICtcbiAgICAgIFwiLS10di1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsMC40NSk7XCIgK1xuICAgICAgXCItLXR2LXNoYWRvdy1jaGlwOjAgMXB4IDJweCByZ2JhKDAsMCwwLDAuNCk7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LWluc2V0Omluc2V0IDAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMzUpO1wiICtcbiAgICAgIFwiLS10di1zZWxlY3QtY2hldnJvbjp1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCxcIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjOWFhMGE2XCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNNiA5bDYgNiA2LTZcIi8+PC9zdmc+J1xuICAgICAgKSArXG4gICAgICBcIlxcXCIpO1wiICtcbiAgICAgIFwifVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy10di1zcGlubmVye2JvcmRlci1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMjIpO2JvcmRlci10b3AtY29sb3I6IzYwYTVmYX1cIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIkBrZXlmcmFtZXMgdWlnb29kaWVzLXR2LXNwaW57dG97dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtdHYtc3Bpbm5lcntkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlcjoycHggc29saWQgcmdiYSgxNSwyMyw0MiwwLjE4KTtcIiArXG4gICAgICBcImJvcmRlci10b3AtY29sb3I6IzI1NjNlYjtib3JkZXItcmFkaXVzOjUwJTthbmltYXRpb246dWlnb29kaWVzLXR2LXNwaW4gMC43cyBsaW5lYXIgaW5maW5pdGU7XCIgK1xuICAgICAgXCJ2ZXJ0aWNhbC1hbGlnbjotMnB4O2ZsZXgtc2hyaW5rOjB9XCIgK1xuICAgICAgXCIudWlnb29kaWVzLXR2LXNwaW5uZXItLWxpZ2h0e2JvcmRlci1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMzUpO2JvcmRlci10b3AtY29sb3I6I2ZmZn1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtdHYtYnVzeXtkaXNwbGF5OmlubGluZS1mbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4fVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy10di1wYWdlci1idG57ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtcIiArXG4gICAgICBcIm1pbi1oZWlnaHQ6MjhweDtwYWRkaW5nOjRweCAxMHB4O2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEuMjtib3JkZXItcmFkaXVzOjZweDtcIiArXG4gICAgICBcImJvcmRlcjoxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyKTtiYWNrZ3JvdW5kOnZhcigtLXR2LWJ0bi1pY29uLWJnKTtjb2xvcjp2YXIoLS10di1idG4taWNvbi1mZyk7XCIgK1xuICAgICAgXCJjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OnZhcigtLXR2LXNoYWRvdy1jaGlwKX1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtdHYtcGFnZXItYnRuOmhvdmVyOm5vdCg6ZGlzYWJsZWQpe2JvcmRlci1jb2xvcjp2YXIoLS10di1ib3JkZXItaW5wdXQpfVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy10di1wYWdlci1idG46ZGlzYWJsZWR7b3BhY2l0eTowLjQ1O2N1cnNvcjpub3QtYWxsb3dlZH1cIjtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuICBlbnN1cmVTcGlubmVyU3R5bGVzKCk7XG5cbiAgZnVuY3Rpb24gU3Bpbm5lckVsKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInVpZ29vZGllcy10di1zcGlubmVyXCIgKyAob3B0cy5saWdodCA/IFwiIHVpZ29vZGllcy10di1zcGlubmVyLS1saWdodFwiIDogXCJcIiksXG4gICAgICByb2xlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICBcImFyaWEtbGFiZWxcIjogb3B0cy5sYWJlbCB8fCBcIkxvYWRpbmdcIixcbiAgICAgIHN0eWxlOiBvcHRzLnNpemVcbiAgICAgICAgPyB7IHdpZHRoOiBvcHRzLnNpemUsIGhlaWdodDogb3B0cy5zaXplLCBib3JkZXJXaWR0aDogTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChvcHRzLnNpemUgLyA3KSkgfVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gQnVzeUxhYmVsKHRleHQsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwic3BhblwiLFxuICAgICAgeyBjbGFzc05hbWU6IFwidWlnb29kaWVzLXR2LWJ1c3lcIiB9LFxuICAgICAgU3Bpbm5lckVsKHsgbGlnaHQ6ICEhb3B0cy5saWdodCwgc2l6ZTogb3B0cy5zaXplLCBsYWJlbDogdGV4dCB9KSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRleHQpXG4gICAgKTtcbiAgfVxuXG4gIHZhciBSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyA9IHtcbiAgICB3ZWJzaXRlOiAxLFxuICAgIGNvbXBvbmVudHM6IDEsXG4gICAgXCJzdGF0aWMtYXNzZXRzXCI6IDEsXG4gICAgdGVtcGxhdGVzOiAxLFxuICAgIHNjcmlwdHM6IDEsXG4gICAgY29uZmlnOiAxXG4gIH07XG5cbiAgLyoqIEtlZXAgaW4gc3luYyB3aXRoIHRyYW5zbGF0aW9uLWNvbXBvbmVudHMgYGNvbmZpZy9tdWx0aUxvY2FsZUNvbmZpZy50c2AuICovXG4gIHZhciBCQVNFX0xPQ0FMRSA9IFwiZW5cIjtcbiAgdmFyIE1VTFRJX0xPQ0FMRV9DT0RFUyA9IFtcImFhXCIsXCJhYlwiLFwiYWRcIixcImFlXCIsXCJhZlwiLFwiYWdcIixcImFpXCIsXCJha1wiLFwiYWxcIixcImFtXCIsXCJhblwiLFwiYW9cIixcImFxXCIsXCJhclwiLFwiYXItYWVcIixcImFyLWJoXCIsXCJhci1kelwiLFwiYXItZWdcIixcImFyLWlxXCIsXCJhci1qb1wiLFwiYXIta3dcIixcImFyLWxiXCIsXCJhci1seVwiLFwiYXItbWFcIixcImFyLW9tXCIsXCJhci1xYVwiLFwiYXItc2FcIixcImFyLXN5XCIsXCJhci10blwiLFwiYXIteWVcIixcImFzXCIsXCJhdFwiLFwiYXVcIixcImF2XCIsXCJhd1wiLFwiYXhcIixcImF5XCIsXCJhelwiLFwiYmFcIixcImJiXCIsXCJiZFwiLFwiYmVcIixcImJmXCIsXCJiZ1wiLFwiYmhcIixcImJpXCIsXCJialwiLFwiYmxcIixcImJtXCIsXCJiblwiLFwiYm4tYmRcIixcImJuLWluXCIsXCJib1wiLFwiYnFcIixcImJyXCIsXCJic1wiLFwiYnRcIixcImJ2XCIsXCJid1wiLFwiYnlcIixcImJ6XCIsXCJjYVwiLFwiY2NcIixcImNkXCIsXCJjZVwiLFwiY2ZcIixcImNnXCIsXCJjaFwiLFwiY2lcIixcImNrXCIsXCJjbFwiLFwiY21cIixcImNuXCIsXCJjb1wiLFwiY29tbW9uXCIsXCJjclwiLFwiY3NcIixcImN1XCIsXCJjdlwiLFwiY3dcIixcImN4XCIsXCJjeVwiLFwiY3pcIixcImRhXCIsXCJkZVwiLFwiZGUtYXRcIixcImRlLWNoXCIsXCJkZS1kZVwiLFwiZGUtbGlcIixcImRlLWx1XCIsXCJkalwiLFwiZGtcIixcImRtXCIsXCJkb1wiLFwiZHZcIixcImR6XCIsXCJlY1wiLFwiZWVcIixcImVnXCIsXCJlaFwiLFwiZWxcIixcImVuXCIsXCJlbi1hdVwiLFwiZW4tYnpcIixcImVuLWNhXCIsXCJlbi1nYlwiLFwiZW4taGtcIixcImVuLWllXCIsXCJlbi1pblwiLFwiZW4tam1cIixcImVuLW15XCIsXCJlbi1uelwiLFwiZW4tcGhcIixcImVuLXNnXCIsXCJlbi10dFwiLFwiZW4tdXNcIixcImVuLXphXCIsXCJlbi16d1wiLFwiZW9cIixcImVyXCIsXCJlc1wiLFwiZXMtYXJcIixcImVzLWJvXCIsXCJlcy1jbFwiLFwiZXMtY29cIixcImVzLWNyXCIsXCJlcy1kb1wiLFwiZXMtZWNcIixcImVzLWVzXCIsXCJlcy1ndFwiLFwiZXMtaG5cIixcImVzLW14XCIsXCJlcy1uaVwiLFwiZXMtcGFcIixcImVzLXBlXCIsXCJlcy1wclwiLFwiZXMtcHlcIixcImVzLXN2XCIsXCJlcy11eVwiLFwiZXMtdmVcIixcImV0XCIsXCJldVwiLFwiZmFcIixcImZmXCIsXCJmaVwiLFwiZmpcIixcImZrXCIsXCJmbVwiLFwiZm9cIixcImZyXCIsXCJmci1iZVwiLFwiZnItY2FcIixcImZyLWNoXCIsXCJmci1mclwiLFwiZnItbHVcIixcImZyLW1jXCIsXCJmeVwiLFwiZ2FcIixcImdiXCIsXCJnZFwiLFwiZ2VcIixcImdmXCIsXCJnZ1wiLFwiZ2hcIixcImdpXCIsXCJnbFwiLFwiZ2xvYmFsXCIsXCJnbVwiLFwiZ25cIixcImdwXCIsXCJncVwiLFwiZ3JcIixcImdzXCIsXCJndFwiLFwiZ3VcIixcImd2XCIsXCJnd1wiLFwiZ3lcIixcImhhXCIsXCJoZVwiLFwiaGlcIixcImhrXCIsXCJobVwiLFwiaG5cIixcImhvXCIsXCJoclwiLFwiaHRcIixcImh1XCIsXCJoeVwiLFwiaHpcIixcImlhXCIsXCJpZFwiLFwiaWVcIixcImlnXCIsXCJpaVwiLFwiaWtcIixcImlsXCIsXCJpbVwiLFwiaW5cIixcImlvXCIsXCJpcVwiLFwiaXJcIixcImlzXCIsXCJpdFwiLFwiaXQtY2hcIixcIml0LWl0XCIsXCJpdVwiLFwiamFcIixcImphLWpwXCIsXCJqZVwiLFwiam1cIixcImpvXCIsXCJqcFwiLFwianZcIixcImthXCIsXCJrZVwiLFwia2dcIixcImtoXCIsXCJraVwiLFwia2pcIixcImtrXCIsXCJrbFwiLFwia21cIixcImtuXCIsXCJrb1wiLFwia28ta3JcIixcImtwXCIsXCJrclwiLFwia3NcIixcImt1XCIsXCJrdlwiLFwia3dcIixcImt5XCIsXCJrelwiLFwibGFcIixcImxiXCIsXCJsY1wiLFwibGdcIixcImxpXCIsXCJsa1wiLFwibG5cIixcImxvXCIsXCJsclwiLFwibHNcIixcImx0XCIsXCJsdVwiLFwibHZcIixcImx5XCIsXCJtYVwiLFwibWNcIixcIm1kXCIsXCJtZVwiLFwibWZcIixcIm1nXCIsXCJtaFwiLFwibWlcIixcIm1rXCIsXCJtbFwiLFwibW1cIixcIm1uXCIsXCJtb1wiLFwibXBcIixcIm1xXCIsXCJtclwiLFwibXNcIixcIm10XCIsXCJtdVwiLFwibXZcIixcIm13XCIsXCJteFwiLFwibXlcIixcIm16XCIsXCJuYVwiLFwibmJcIixcIm5iLW5vXCIsXCJuY1wiLFwibmRcIixcIm5lXCIsXCJuZlwiLFwibmdcIixcIm5pXCIsXCJubFwiLFwibmwtYmVcIixcIm5sLW5sXCIsXCJublwiLFwibm4tbm9cIixcIm5vXCIsXCJucFwiLFwibnJcIixcIm51XCIsXCJudlwiLFwibnlcIixcIm56XCIsXCJvY1wiLFwib2pcIixcIm9tXCIsXCJvclwiLFwib3NcIixcInBhXCIsXCJwZVwiLFwicGZcIixcInBnXCIsXCJwaFwiLFwicGlcIixcInBrXCIsXCJwbFwiLFwicG1cIixcInBuXCIsXCJwclwiLFwicHNcIixcInB0XCIsXCJwdC1hb1wiLFwicHQtYnJcIixcInB0LXB0XCIsXCJwd1wiLFwicHlcIixcInFhXCIsXCJxdVwiLFwicmVcIixcInJtXCIsXCJyblwiLFwicm9cIixcInJzXCIsXCJydVwiLFwicnUtcnVcIixcInJ3XCIsXCJzYVwiLFwic2JcIixcInNjXCIsXCJzZFwiLFwic2VcIixcInNnXCIsXCJzaFwiLFwic2hhcmVkXCIsXCJzaVwiLFwic2pcIixcInNrXCIsXCJzbFwiLFwic21cIixcInNuXCIsXCJzb1wiLFwic3FcIixcInNyXCIsXCJzc1wiLFwic3RcIixcInN1XCIsXCJzdlwiLFwic3YtZmlcIixcInN2LXNlXCIsXCJzd1wiLFwic3hcIixcInN5XCIsXCJzelwiLFwidGFcIixcInRjXCIsXCJ0ZFwiLFwidGVcIixcInRmXCIsXCJ0Z1wiLFwidGhcIixcInRpXCIsXCJ0alwiLFwidGtcIixcInRsXCIsXCJ0bVwiLFwidG5cIixcInRvXCIsXCJ0clwiLFwidHNcIixcInR0XCIsXCJ0dlwiLFwidHdcIixcInR5XCIsXCJ0elwiLFwidWFcIixcInVnXCIsXCJ1a1wiLFwidWstdWFcIixcInVtXCIsXCJ1clwiLFwidXNcIixcInV5XCIsXCJ1elwiLFwidmFcIixcInZjXCIsXCJ2ZVwiLFwidmdcIixcInZpXCIsXCJ2blwiLFwidm9cIixcInZ1XCIsXCJ3YVwiLFwid2ZcIixcIndvXCIsXCJ3c1wiLFwieGhcIixcInllXCIsXCJ5aVwiLFwieW9cIixcInl0XCIsXCJ6YVwiLFwiemhcIixcInpoLWNuXCIsXCJ6aC1oa1wiLFwiemgtbW9cIixcInpoLXNnXCIsXCJ6aC10d1wiLFwiem1cIixcInp1XCIsXCJ6d1wiXTtcbiAgdmFyIExPQ0FMRV9NRVRBID0ge1xuICAgIFwiYWFcIjogeyBsYWJlbDogXCJBZmFyXCIsIGZsYWc6IFwi8J+HqvCfh7lcIiB9LFxuICAgIFwiYWJcIjogeyBsYWJlbDogXCJBYmtoYXpcIiwgZmxhZzogXCLwn4es8J+HqlwiIH0sXG4gICAgXCJhZFwiOiB7IGxhYmVsOiBcIkFuZG9ycmFcIiwgZmxhZzogXCLwn4em8J+HqVwiIH0sXG4gICAgXCJhZVwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoVUFFKVwiLCBmbGFnOiBcIvCfh6bwn4eqXCIgfSxcbiAgICBcImFmXCI6IHsgbGFiZWw6IFwiQWZyaWthYW5zXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwiYWdcIjogeyBsYWJlbDogXCJBbnRpZ3VhIGFuZCBCYXJidWRhXCIsIGZsYWc6IFwi8J+HpvCfh6xcIiB9LFxuICAgIFwiYWlcIjogeyBsYWJlbDogXCJBbmd1aWxsYVwiLCBmbGFnOiBcIvCfh6bwn4euXCIgfSxcbiAgICBcImFrXCI6IHsgbGFiZWw6IFwiQWthblwiLCBmbGFnOiBcIvCfh6zwn4etXCIgfSxcbiAgICBcImFsXCI6IHsgbGFiZWw6IFwiQWxiYW5pYVwiLCBmbGFnOiBcIvCfh6bwn4exXCIgfSxcbiAgICBcImFtXCI6IHsgbGFiZWw6IFwiQW1oYXJpY1wiLCBmbGFnOiBcIvCfh6rwn4e5XCIgfSxcbiAgICBcImFuXCI6IHsgbGFiZWw6IFwiQXJhZ29uZXNlXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiYW9cIjogeyBsYWJlbDogXCJBbmdvbGFcIiwgZmxhZzogXCLwn4em8J+HtFwiIH0sXG4gICAgXCJhcVwiOiB7IGxhYmVsOiBcIkFudGFyY3RpY2FcIiwgZmxhZzogXCLwn4em8J+HtlwiIH0sXG4gICAgXCJhclwiOiB7IGxhYmVsOiBcIkFyYWJpY1wiLCBmbGFnOiBcIvCfh7jwn4emXCIgfSxcbiAgICBcImFyLWFlXCI6IHsgbGFiZWw6IFwiQXJhYmljIChVQUUpXCIsIGZsYWc6IFwi8J+HpvCfh6pcIiB9LFxuICAgIFwiYXItYmhcIjogeyBsYWJlbDogXCJBcmFiaWMgKEJhaHJhaW4pXCIsIGZsYWc6IFwi8J+Hp/Cfh61cIiB9LFxuICAgIFwiYXItZHpcIjogeyBsYWJlbDogXCJBcmFiaWMgKEFsZ2VyaWEpXCIsIGZsYWc6IFwi8J+HqfCfh79cIiB9LFxuICAgIFwiYXItZWdcIjogeyBsYWJlbDogXCJBcmFiaWMgKEVneXB0KVwiLCBmbGFnOiBcIvCfh6rwn4esXCIgfSxcbiAgICBcImFyLWlxXCI6IHsgbGFiZWw6IFwiQXJhYmljIChJcmFxKVwiLCBmbGFnOiBcIvCfh67wn4e2XCIgfSxcbiAgICBcImFyLWpvXCI6IHsgbGFiZWw6IFwiQXJhYmljIChKb3JkYW4pXCIsIGZsYWc6IFwi8J+Hr/Cfh7RcIiB9LFxuICAgIFwiYXIta3dcIjogeyBsYWJlbDogXCJBcmFiaWMgKEt1d2FpdClcIiwgZmxhZzogXCLwn4ew8J+HvFwiIH0sXG4gICAgXCJhci1sYlwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoTGViYW5vbilcIiwgZmxhZzogXCLwn4ex8J+Hp1wiIH0sXG4gICAgXCJhci1seVwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoTGlieWEpXCIsIGZsYWc6IFwi8J+HsfCfh75cIiB9LFxuICAgIFwiYXItbWFcIjogeyBsYWJlbDogXCJBcmFiaWMgKE1vcm9jY28pXCIsIGZsYWc6IFwi8J+HsvCfh6ZcIiB9LFxuICAgIFwiYXItb21cIjogeyBsYWJlbDogXCJBcmFiaWMgKE9tYW4pXCIsIGZsYWc6IFwi8J+HtPCfh7JcIiB9LFxuICAgIFwiYXItcWFcIjogeyBsYWJlbDogXCJBcmFiaWMgKFFhdGFyKVwiLCBmbGFnOiBcIvCfh7bwn4emXCIgfSxcbiAgICBcImFyLXNhXCI6IHsgbGFiZWw6IFwiQXJhYmljIChTYXVkaSBBcmFiaWEpXCIsIGZsYWc6IFwi8J+HuPCfh6ZcIiB9LFxuICAgIFwiYXItc3lcIjogeyBsYWJlbDogXCJBcmFiaWMgKFN5cmlhKVwiLCBmbGFnOiBcIvCfh7jwn4e+XCIgfSxcbiAgICBcImFyLXRuXCI6IHsgbGFiZWw6IFwiQXJhYmljIChUdW5pc2lhKVwiLCBmbGFnOiBcIvCfh7nwn4ezXCIgfSxcbiAgICBcImFyLXllXCI6IHsgbGFiZWw6IFwiQXJhYmljIChZZW1lbilcIiwgZmxhZzogXCLwn4e+8J+HqlwiIH0sXG4gICAgXCJhc1wiOiB7IGxhYmVsOiBcIkFzc2FtZXNlXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwiYXRcIjogeyBsYWJlbDogXCJBdXN0cmlhXCIsIGZsYWc6IFwi8J+HpvCfh7lcIiB9LFxuICAgIFwiYXVcIjogeyBsYWJlbDogXCJFbmdsaXNoIChBdXN0cmFsaWEpXCIsIGZsYWc6IFwi8J+HpvCfh7pcIiB9LFxuICAgIFwiYXZcIjogeyBsYWJlbDogXCJBdmFyaWNcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJhd1wiOiB7IGxhYmVsOiBcIkFydWJhXCIsIGZsYWc6IFwi8J+HpvCfh7xcIiB9LFxuICAgIFwiYXhcIjogeyBsYWJlbDogXCLDhWxhbmQgSXNsYW5kc1wiLCBmbGFnOiBcIvCfh6bwn4e9XCIgfSxcbiAgICBcImF5XCI6IHsgbGFiZWw6IFwiQXltYXJhXCIsIGZsYWc6IFwi8J+Hp/Cfh7RcIiB9LFxuICAgIFwiYXpcIjogeyBsYWJlbDogXCJBemVyYmFpamFuaVwiLCBmbGFnOiBcIvCfh6bwn4e/XCIgfSxcbiAgICBcImJhXCI6IHsgbGFiZWw6IFwiQmFzaGtpclwiLCBmbGFnOiBcIvCfh7fwn4e6XCIgfSxcbiAgICBcImJiXCI6IHsgbGFiZWw6IFwiQmFyYmFkb3NcIiwgZmxhZzogXCLwn4en8J+Hp1wiIH0sXG4gICAgXCJiZFwiOiB7IGxhYmVsOiBcIkJhbmdsYWRlc2hcIiwgZmxhZzogXCLwn4en8J+HqVwiIH0sXG4gICAgXCJiZVwiOiB7IGxhYmVsOiBcIkJlbGFydXNpYW5cIiwgZmxhZzogXCLwn4en8J+HvlwiIH0sXG4gICAgXCJiZlwiOiB7IGxhYmVsOiBcIkJ1cmtpbmEgRmFzb1wiLCBmbGFnOiBcIvCfh6fwn4erXCIgfSxcbiAgICBcImJnXCI6IHsgbGFiZWw6IFwiQnVsZ2FyaWFuXCIsIGZsYWc6IFwi8J+Hp/Cfh6xcIiB9LFxuICAgIFwiYmhcIjogeyBsYWJlbDogXCJCaWhhcmlcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJiaVwiOiB7IGxhYmVsOiBcIkJpc2xhbWFcIiwgZmxhZzogXCLwn4e78J+HulwiIH0sXG4gICAgXCJialwiOiB7IGxhYmVsOiBcIkJlbmluXCIsIGZsYWc6IFwi8J+Hp/Cfh69cIiB9LFxuICAgIFwiYmxcIjogeyBsYWJlbDogXCJTYWludCBCYXJ0aMOpbGVteVwiLCBmbGFnOiBcIvCfh6fwn4exXCIgfSxcbiAgICBcImJtXCI6IHsgbGFiZWw6IFwiQmFtYmFyYVwiLCBmbGFnOiBcIvCfh7Lwn4exXCIgfSxcbiAgICBcImJuXCI6IHsgbGFiZWw6IFwiQmVuZ2FsaVwiLCBmbGFnOiBcIvCfh6fwn4epXCIgfSxcbiAgICBcImJuLWJkXCI6IHsgbGFiZWw6IFwiQmVuZ2FsaSAoQmFuZ2xhZGVzaClcIiwgZmxhZzogXCLwn4en8J+HqVwiIH0sXG4gICAgXCJibi1pblwiOiB7IGxhYmVsOiBcIkJlbmdhbGkgKEluZGlhKVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImJvXCI6IHsgbGFiZWw6IFwiVGliZXRhbiBTdGFuZGFyZFwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImJxXCI6IHsgbGFiZWw6IFwiQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmFcIiwgZmxhZzogXCLwn4en8J+HtlwiIH0sXG4gICAgXCJiclwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEJyYXppbClcIiwgZmxhZzogXCLwn4en8J+Ht1wiIH0sXG4gICAgXCJic1wiOiB7IGxhYmVsOiBcIkJvc25pYW5cIiwgZmxhZzogXCLwn4en8J+HplwiIH0sXG4gICAgXCJidFwiOiB7IGxhYmVsOiBcIkJodXRhblwiLCBmbGFnOiBcIvCfh6fwn4e5XCIgfSxcbiAgICBcImJ2XCI6IHsgbGFiZWw6IFwiQm91dmV0IElzbGFuZFwiLCBmbGFnOiBcIvCfh6fwn4e7XCIgfSxcbiAgICBcImJ3XCI6IHsgbGFiZWw6IFwiQm90c3dhbmFcIiwgZmxhZzogXCLwn4en8J+HvFwiIH0sXG4gICAgXCJieVwiOiB7IGxhYmVsOiBcIkJlbGFydXNcIiwgZmxhZzogXCLwn4en8J+HvlwiIH0sXG4gICAgXCJielwiOiB7IGxhYmVsOiBcIkJlbGl6ZVwiLCBmbGFnOiBcIvCfh6fwn4e/XCIgfSxcbiAgICBcImNhXCI6IHsgbGFiZWw6IFwiQ2F0YWxhblwiLCBmbGFnOiBcIvCfh6bwn4epXCIgfSxcbiAgICBcImNjXCI6IHsgbGFiZWw6IFwiQ29jb3MgKEtlZWxpbmcpIElzbGFuZHNcIiwgZmxhZzogXCLwn4eo8J+HqFwiIH0sXG4gICAgXCJjZFwiOiB7IGxhYmVsOiBcIkNvbmdvLCBEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZVwiLCBmbGFnOiBcIvCfh6jwn4epXCIgfSxcbiAgICBcImNlXCI6IHsgbGFiZWw6IFwiQ2hlY2hlblwiLCBmbGFnOiBcIvCfh7fwn4e6XCIgfSxcbiAgICBcImNmXCI6IHsgbGFiZWw6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIGZsYWc6IFwi8J+HqPCfh6tcIiB9LFxuICAgIFwiY2dcIjogeyBsYWJlbDogXCJDb25nb1wiLCBmbGFnOiBcIvCfh6jwn4esXCIgfSxcbiAgICBcImNoXCI6IHsgbGFiZWw6IFwiQ2hhbW9ycm9cIiwgZmxhZzogXCLwn4es8J+HulwiIH0sXG4gICAgXCJjaVwiOiB7IGxhYmVsOiBcIkPDtHRlIGQnSXZvaXJlXCIsIGZsYWc6IFwi8J+HqPCfh65cIiB9LFxuICAgIFwiY2tcIjogeyBsYWJlbDogXCJDb29rIElzbGFuZHNcIiwgZmxhZzogXCLwn4eo8J+HsFwiIH0sXG4gICAgXCJjbFwiOiB7IGxhYmVsOiBcIkNoaWxlXCIsIGZsYWc6IFwi8J+HqPCfh7FcIiB9LFxuICAgIFwiY21cIjogeyBsYWJlbDogXCJDYW1lcm9vblwiLCBmbGFnOiBcIvCfh6jwn4eyXCIgfSxcbiAgICBcImNuXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImNvXCI6IHsgbGFiZWw6IFwiQ29yc2ljYW5cIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJjb21tb25cIjogeyBsYWJlbDogXCJDb21tb25cIiwgZmxhZzogXCLwn4yQXCIgfSxcbiAgICBcImNyXCI6IHsgbGFiZWw6IFwiQ3JlZVwiLCBmbGFnOiBcIvCfh6jwn4emXCIgfSxcbiAgICBcImNzXCI6IHsgbGFiZWw6IFwiQ3plY2hcIiwgZmxhZzogXCLwn4eo8J+Hv1wiIH0sXG4gICAgXCJjdVwiOiB7IGxhYmVsOiBcIk9sZCBDaHVyY2ggU2xhdm9uaWNcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJjdlwiOiB7IGxhYmVsOiBcIkNodXZhc2hcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJjd1wiOiB7IGxhYmVsOiBcIkN1cmHDp2FvXCIsIGZsYWc6IFwi8J+HqPCfh7xcIiB9LFxuICAgIFwiY3hcIjogeyBsYWJlbDogXCJDaHJpc3RtYXMgSXNsYW5kXCIsIGZsYWc6IFwi8J+HqPCfh71cIiB9LFxuICAgIFwiY3lcIjogeyBsYWJlbDogXCJXZWxzaFwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcImN6XCI6IHsgbGFiZWw6IFwiQ3plY2hpYVwiLCBmbGFnOiBcIvCfh6jwn4e/XCIgfSxcbiAgICBcImRhXCI6IHsgbGFiZWw6IFwiRGFuaXNoXCIsIGZsYWc6IFwi8J+HqfCfh7BcIiB9LFxuICAgIFwiZGVcIjogeyBsYWJlbDogXCJHZXJtYW5cIiwgZmxhZzogXCLwn4ep8J+HqlwiIH0sXG4gICAgXCJkZS1hdFwiOiB7IGxhYmVsOiBcIkdlcm1hbiAoQXVzdHJpYSlcIiwgZmxhZzogXCLwn4em8J+HuVwiIH0sXG4gICAgXCJkZS1jaFwiOiB7IGxhYmVsOiBcIkdlcm1hbiAoU3dpdHplcmxhbmQpXCIsIGZsYWc6IFwi8J+HqPCfh61cIiB9LFxuICAgIFwiZGUtZGVcIjogeyBsYWJlbDogXCJHZXJtYW4gKEdlcm1hbnkpXCIsIGZsYWc6IFwi8J+HqfCfh6pcIiB9LFxuICAgIFwiZGUtbGlcIjogeyBsYWJlbDogXCJHZXJtYW4gKExpZWNodGVuc3RlaW4pXCIsIGZsYWc6IFwi8J+HsfCfh65cIiB9LFxuICAgIFwiZGUtbHVcIjogeyBsYWJlbDogXCJHZXJtYW4gKEx1eGVtYm91cmcpXCIsIGZsYWc6IFwi8J+HsfCfh7pcIiB9LFxuICAgIFwiZGpcIjogeyBsYWJlbDogXCJEamlib3V0aVwiLCBmbGFnOiBcIvCfh6nwn4evXCIgfSxcbiAgICBcImRrXCI6IHsgbGFiZWw6IFwiRGFuaXNoXCIsIGZsYWc6IFwi8J+HqfCfh7BcIiB9LFxuICAgIFwiZG1cIjogeyBsYWJlbDogXCJEb21pbmljYVwiLCBmbGFnOiBcIvCfh6nwn4eyXCIgfSxcbiAgICBcImRvXCI6IHsgbGFiZWw6IFwiRG9taW5pY2FuIFJlcHVibGljXCIsIGZsYWc6IFwi8J+HqfCfh7RcIiB9LFxuICAgIFwiZHZcIjogeyBsYWJlbDogXCJEaXZlaGlcIiwgZmxhZzogXCLwn4ey8J+Hu1wiIH0sXG4gICAgXCJkelwiOiB7IGxhYmVsOiBcIkR6b25na2hhXCIsIGZsYWc6IFwi8J+Hp/Cfh7lcIiB9LFxuICAgIFwiZWNcIjogeyBsYWJlbDogXCJFY3VhZG9yXCIsIGZsYWc6IFwi8J+HqvCfh6hcIiB9LFxuICAgIFwiZWVcIjogeyBsYWJlbDogXCJFd2VcIiwgZmxhZzogXCLwn4es8J+HrVwiIH0sXG4gICAgXCJlZ1wiOiB7IGxhYmVsOiBcIkVneXB0XCIsIGZsYWc6IFwi8J+HqvCfh6xcIiB9LFxuICAgIFwiZWhcIjogeyBsYWJlbDogXCJXZXN0ZXJuIFNhaGFyYVwiLCBmbGFnOiBcIvCfh6rwn4etXCIgfSxcbiAgICBcImVsXCI6IHsgbGFiZWw6IFwiR3JlZWsgKG1vZGVybilcIiwgZmxhZzogXCLwn4es8J+Ht1wiIH0sXG4gICAgXCJlblwiOiB7IGxhYmVsOiBcIkVuZ2xpc2hcIiwgZmxhZzogXCLwn4e68J+HuFwiIH0sXG4gICAgXCJlbi1hdVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEF1c3RyYWxpYSlcIiwgZmxhZzogXCLwn4em8J+HulwiIH0sXG4gICAgXCJlbi1ielwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEJlbGl6ZSlcIiwgZmxhZzogXCLwn4en8J+Hv1wiIH0sXG4gICAgXCJlbi1jYVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKENhbmFkYSlcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJlbi1nYlwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFVLKVwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcImVuLWhrXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcImVuLWllXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSXJlbGFuZClcIiwgZmxhZzogXCLwn4eu8J+HqlwiIH0sXG4gICAgXCJlbi1pblwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEluZGlhKVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImVuLWptXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSmFtYWljYSlcIiwgZmxhZzogXCLwn4ev8J+HslwiIH0sXG4gICAgXCJlbi1teVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKE1hbGF5c2lhKVwiLCBmbGFnOiBcIvCfh7Lwn4e+XCIgfSxcbiAgICBcImVuLW56XCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoTmV3IFplYWxhbmQpXCIsIGZsYWc6IFwi8J+Hs/Cfh79cIiB9LFxuICAgIFwiZW4tcGhcIjogeyBsYWJlbDogXCJFbmdsaXNoIChQaGlsaXBwaW5lcylcIiwgZmxhZzogXCLwn4e18J+HrVwiIH0sXG4gICAgXCJlbi1zZ1wiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFNpbmdhcG9yZSlcIiwgZmxhZzogXCLwn4e48J+HrFwiIH0sXG4gICAgXCJlbi10dFwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFRyaW5pZGFkICYgVG9iYWdvKVwiLCBmbGFnOiBcIvCfh7nwn4e5XCIgfSxcbiAgICBcImVuLXVzXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoVVMpXCIsIGZsYWc6IFwi8J+HuvCfh7hcIiB9LFxuICAgIFwiZW4temFcIjogeyBsYWJlbDogXCJFbmdsaXNoIChTb3V0aCBBZnJpY2EpXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwiZW4tendcIjogeyBsYWJlbDogXCJFbmdsaXNoIChaaW1iYWJ3ZSlcIiwgZmxhZzogXCLwn4e/8J+HvFwiIH0sXG4gICAgXCJlb1wiOiB7IGxhYmVsOiBcIkVzcGVyYW50b1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiZXJcIjogeyBsYWJlbDogXCJFcml0cmVhXCIsIGZsYWc6IFwi8J+HqvCfh7dcIiB9LFxuICAgIFwiZXNcIjogeyBsYWJlbDogXCJTcGFuaXNoXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiZXMtYXJcIjogeyBsYWJlbDogXCJTcGFuaXNoIChBcmdlbnRpbmEpXCIsIGZsYWc6IFwi8J+HpvCfh7dcIiB9LFxuICAgIFwiZXMtYm9cIjogeyBsYWJlbDogXCJTcGFuaXNoIChCb2xpdmlhKVwiLCBmbGFnOiBcIvCfh6fwn4e0XCIgfSxcbiAgICBcImVzLWNsXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoQ2hpbGUpXCIsIGZsYWc6IFwi8J+HqPCfh7FcIiB9LFxuICAgIFwiZXMtY29cIjogeyBsYWJlbDogXCJTcGFuaXNoIChDb2xvbWJpYSlcIiwgZmxhZzogXCLwn4eo8J+HtFwiIH0sXG4gICAgXCJlcy1jclwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKENvc3RhIFJpY2EpXCIsIGZsYWc6IFwi8J+HqPCfh7dcIiB9LFxuICAgIFwiZXMtZG9cIjogeyBsYWJlbDogXCJTcGFuaXNoIChEb21pbmljYW4gUmVwdWJsaWMpXCIsIGZsYWc6IFwi8J+HqfCfh7RcIiB9LFxuICAgIFwiZXMtZWNcIjogeyBsYWJlbDogXCJTcGFuaXNoIChFY3VhZG9yKVwiLCBmbGFnOiBcIvCfh6rwn4eoXCIgfSxcbiAgICBcImVzLWVzXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoU3BhaW4pXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiZXMtZ3RcIjogeyBsYWJlbDogXCJTcGFuaXNoIChHdWF0ZW1hbGEpXCIsIGZsYWc6IFwi8J+HrPCfh7lcIiB9LFxuICAgIFwiZXMtaG5cIjogeyBsYWJlbDogXCJTcGFuaXNoIChIb25kdXJhcylcIiwgZmxhZzogXCLwn4et8J+Hs1wiIH0sXG4gICAgXCJlcy1teFwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE1leGljbylcIiwgZmxhZzogXCLwn4ey8J+HvVwiIH0sXG4gICAgXCJlcy1uaVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE5pY2FyYWd1YSlcIiwgZmxhZzogXCLwn4ez8J+HrlwiIH0sXG4gICAgXCJlcy1wYVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBhbmFtYSlcIiwgZmxhZzogXCLwn4e18J+HplwiIH0sXG4gICAgXCJlcy1wZVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBlcnUpXCIsIGZsYWc6IFwi8J+HtfCfh6pcIiB9LFxuICAgIFwiZXMtcHJcIjogeyBsYWJlbDogXCJTcGFuaXNoIChQdWVydG8gUmljbylcIiwgZmxhZzogXCLwn4e18J+Ht1wiIH0sXG4gICAgXCJlcy1weVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBhcmFndWF5KVwiLCBmbGFnOiBcIvCfh7Xwn4e+XCIgfSxcbiAgICBcImVzLXN2XCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoRWwgU2FsdmFkb3IpXCIsIGZsYWc6IFwi8J+HuPCfh7tcIiB9LFxuICAgIFwiZXMtdXlcIjogeyBsYWJlbDogXCJTcGFuaXNoIChVcnVndWF5KVwiLCBmbGFnOiBcIvCfh7rwn4e+XCIgfSxcbiAgICBcImVzLXZlXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoVmVuZXp1ZWxhKVwiLCBmbGFnOiBcIvCfh7vwn4eqXCIgfSxcbiAgICBcImV0XCI6IHsgbGFiZWw6IFwiRXN0b25pYW5cIiwgZmxhZzogXCLwn4eq8J+HqlwiIH0sXG4gICAgXCJldVwiOiB7IGxhYmVsOiBcIkJhc3F1ZVwiLCBmbGFnOiBcIvCfh6rwn4e4XCIgfSxcbiAgICBcImZhXCI6IHsgbGFiZWw6IFwiUGVyc2lhbiAoRmFyc2kpXCIsIGZsYWc6IFwi8J+HrvCfh7dcIiB9LFxuICAgIFwiZmZcIjogeyBsYWJlbDogXCJGdWxhXCIsIGZsYWc6IFwi8J+HuPCfh7NcIiB9LFxuICAgIFwiZmlcIjogeyBsYWJlbDogXCJGaW5uaXNoXCIsIGZsYWc6IFwi8J+Hq/Cfh65cIiB9LFxuICAgIFwiZmpcIjogeyBsYWJlbDogXCJGaWppYW5cIiwgZmxhZzogXCLwn4er8J+Hr1wiIH0sXG4gICAgXCJma1wiOiB7IGxhYmVsOiBcIkZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKVwiLCBmbGFnOiBcIvCfh6vwn4ewXCIgfSxcbiAgICBcImZtXCI6IHsgbGFiZWw6IFwiTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZlwiLCBmbGFnOiBcIvCfh6vwn4eyXCIgfSxcbiAgICBcImZvXCI6IHsgbGFiZWw6IFwiRmFyb2VzZVwiLCBmbGFnOiBcIvCfh6vwn4e0XCIgfSxcbiAgICBcImZyXCI6IHsgbGFiZWw6IFwiRnJlbmNoXCIsIGZsYWc6IFwi8J+Hq/Cfh7dcIiB9LFxuICAgIFwiZnItYmVcIjogeyBsYWJlbDogXCJGcmVuY2ggKEJlbGdpdW0pXCIsIGZsYWc6IFwi8J+Hp/Cfh6pcIiB9LFxuICAgIFwiZnItY2FcIjogeyBsYWJlbDogXCJGcmVuY2ggKENhbmFkYSlcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJmci1jaFwiOiB7IGxhYmVsOiBcIkZyZW5jaCAoU3dpdHplcmxhbmQpXCIsIGZsYWc6IFwi8J+HqPCfh61cIiB9LFxuICAgIFwiZnItZnJcIjogeyBsYWJlbDogXCJGcmVuY2ggKEZyYW5jZSlcIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJmci1sdVwiOiB7IGxhYmVsOiBcIkZyZW5jaCAoTHV4ZW1ib3VyZylcIiwgZmxhZzogXCLwn4ex8J+HulwiIH0sXG4gICAgXCJmci1tY1wiOiB7IGxhYmVsOiBcIkZyZW5jaCAoTW9uYWNvKVwiLCBmbGFnOiBcIvCfh7Lwn4eoXCIgfSxcbiAgICBcImZ5XCI6IHsgbGFiZWw6IFwiV2VzdGVybiBGcmlzaWFuXCIsIGZsYWc6IFwi8J+Hs/Cfh7FcIiB9LFxuICAgIFwiZ2FcIjogeyBsYWJlbDogXCJJcmlzaFwiLCBmbGFnOiBcIvCfh67wn4eqXCIgfSxcbiAgICBcImdiXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoVUspXCIsIGZsYWc6IFwi8J+HrPCfh6dcIiB9LFxuICAgIFwiZ2RcIjogeyBsYWJlbDogXCJTY290dGlzaCBHYWVsaWNcIiwgZmxhZzogXCLwn4es8J+Hp1wiIH0sXG4gICAgXCJnZVwiOiB7IGxhYmVsOiBcIkdlb3JnaWFcIiwgZmxhZzogXCLwn4es8J+HqlwiIH0sXG4gICAgXCJnZlwiOiB7IGxhYmVsOiBcIkZyZW5jaCBHdWlhbmFcIiwgZmxhZzogXCLwn4es8J+Hq1wiIH0sXG4gICAgXCJnZ1wiOiB7IGxhYmVsOiBcIkd1ZXJuc2V5XCIsIGZsYWc6IFwi8J+HrPCfh6xcIiB9LFxuICAgIFwiZ2hcIjogeyBsYWJlbDogXCJHaGFuYVwiLCBmbGFnOiBcIvCfh6zwn4etXCIgfSxcbiAgICBcImdpXCI6IHsgbGFiZWw6IFwiR2licmFsdGFyXCIsIGZsYWc6IFwi8J+HrPCfh65cIiB9LFxuICAgIFwiZ2xcIjogeyBsYWJlbDogXCJHYWxpY2lhblwiLCBmbGFnOiBcIvCfh6rwn4e4XCIgfSxcbiAgICBcImdsb2JhbFwiOiB7IGxhYmVsOiBcIkdsb2JhbFwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiZ21cIjogeyBsYWJlbDogXCJHYW1iaWFcIiwgZmxhZzogXCLwn4es8J+HslwiIH0sXG4gICAgXCJnblwiOiB7IGxhYmVsOiBcIkd1YXJhbsOtXCIsIGZsYWc6IFwi8J+HtfCfh75cIiB9LFxuICAgIFwiZ3BcIjogeyBsYWJlbDogXCJHdWFkZWxvdXBlXCIsIGZsYWc6IFwi8J+HrPCfh7VcIiB9LFxuICAgIFwiZ3FcIjogeyBsYWJlbDogXCJFcXVhdG9yaWFsIEd1aW5lYVwiLCBmbGFnOiBcIvCfh6zwn4e2XCIgfSxcbiAgICBcImdyXCI6IHsgbGFiZWw6IFwiR3JlZWNlXCIsIGZsYWc6IFwi8J+HrPCfh7dcIiB9LFxuICAgIFwiZ3NcIjogeyBsYWJlbDogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLCBmbGFnOiBcIvCfh6zwn4e4XCIgfSxcbiAgICBcImd0XCI6IHsgbGFiZWw6IFwiR3VhdGVtYWxhXCIsIGZsYWc6IFwi8J+HrPCfh7lcIiB9LFxuICAgIFwiZ3VcIjogeyBsYWJlbDogXCJHdWphcmF0aVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImd2XCI6IHsgbGFiZWw6IFwiTWFueFwiLCBmbGFnOiBcIvCfh67wn4eyXCIgfSxcbiAgICBcImd3XCI6IHsgbGFiZWw6IFwiR3VpbmVhLUJpc3NhdVwiLCBmbGFnOiBcIvCfh6zwn4e8XCIgfSxcbiAgICBcImd5XCI6IHsgbGFiZWw6IFwiR3V5YW5hXCIsIGZsYWc6IFwi8J+HrPCfh75cIiB9LFxuICAgIFwiaGFcIjogeyBsYWJlbDogXCJIYXVzYVwiLCBmbGFnOiBcIvCfh7Pwn4esXCIgfSxcbiAgICBcImhlXCI6IHsgbGFiZWw6IFwiSGVicmV3IChtb2Rlcm4pXCIsIGZsYWc6IFwi8J+HrvCfh7FcIiB9LFxuICAgIFwiaGlcIjogeyBsYWJlbDogXCJIaW5kaVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImhrXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcImhtXCI6IHsgbGFiZWw6IFwiSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HrfCfh7JcIiB9LFxuICAgIFwiaG5cIjogeyBsYWJlbDogXCJIb25kdXJhc1wiLCBmbGFnOiBcIvCfh63wn4ezXCIgfSxcbiAgICBcImhvXCI6IHsgbGFiZWw6IFwiSGlyaSBNb3R1XCIsIGZsYWc6IFwi8J+HtfCfh6xcIiB9LFxuICAgIFwiaHJcIjogeyBsYWJlbDogXCJDcm9hdGlhblwiLCBmbGFnOiBcIvCfh63wn4e3XCIgfSxcbiAgICBcImh0XCI6IHsgbGFiZWw6IFwiSGFpdGlhblwiLCBmbGFnOiBcIvCfh63wn4e5XCIgfSxcbiAgICBcImh1XCI6IHsgbGFiZWw6IFwiSHVuZ2FyaWFuXCIsIGZsYWc6IFwi8J+HrfCfh7pcIiB9LFxuICAgIFwiaHlcIjogeyBsYWJlbDogXCJBcm1lbmlhblwiLCBmbGFnOiBcIvCfh6bwn4eyXCIgfSxcbiAgICBcImh6XCI6IHsgbGFiZWw6IFwiSGVyZXJvXCIsIGZsYWc6IFwi8J+Hs/Cfh6ZcIiB9LFxuICAgIFwiaWFcIjogeyBsYWJlbDogXCJJbnRlcmxpbmd1YVwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaWRcIjogeyBsYWJlbDogXCJJbmRvbmVzaWFuXCIsIGZsYWc6IFwi8J+HrvCfh6lcIiB9LFxuICAgIFwiaWVcIjogeyBsYWJlbDogXCJJbnRlcmxpbmd1ZVwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaWdcIjogeyBsYWJlbDogXCJJZ2JvXCIsIGZsYWc6IFwi8J+Hs/Cfh6xcIiB9LFxuICAgIFwiaWlcIjogeyBsYWJlbDogXCJOdW9zdVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImlrXCI6IHsgbGFiZWw6IFwiSW51cGlhcVwiLCBmbGFnOiBcIvCfh7rwn4e4XCIgfSxcbiAgICBcImlsXCI6IHsgbGFiZWw6IFwiSXNyYWVsXCIsIGZsYWc6IFwi8J+HrvCfh7FcIiB9LFxuICAgIFwiaW1cIjogeyBsYWJlbDogXCJJc2xlIG9mIE1hblwiLCBmbGFnOiBcIvCfh67wn4eyXCIgfSxcbiAgICBcImluXCI6IHsgbGFiZWw6IFwiSW5kaWFcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJpb1wiOiB7IGxhYmVsOiBcIklkb1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaXFcIjogeyBsYWJlbDogXCJJcmFxXCIsIGZsYWc6IFwi8J+HrvCfh7ZcIiB9LFxuICAgIFwiaXJcIjogeyBsYWJlbDogXCJJcmFuLCBJc2xhbWljIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HrvCfh7dcIiB9LFxuICAgIFwiaXNcIjogeyBsYWJlbDogXCJJY2VsYW5kaWNcIiwgZmxhZzogXCLwn4eu8J+HuFwiIH0sXG4gICAgXCJpdFwiOiB7IGxhYmVsOiBcIkl0YWxpYW5cIiwgZmxhZzogXCLwn4eu8J+HuVwiIH0sXG4gICAgXCJpdC1jaFwiOiB7IGxhYmVsOiBcIkl0YWxpYW4gKFN3aXR6ZXJsYW5kKVwiLCBmbGFnOiBcIvCfh6jwn4etXCIgfSxcbiAgICBcIml0LWl0XCI6IHsgbGFiZWw6IFwiSXRhbGlhbiAoSXRhbHkpXCIsIGZsYWc6IFwi8J+HrvCfh7lcIiB9LFxuICAgIFwiaXVcIjogeyBsYWJlbDogXCJJbnVrdGl0dXRcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJqYVwiOiB7IGxhYmVsOiBcIkphcGFuZXNlXCIsIGZsYWc6IFwi8J+Hr/Cfh7VcIiB9LFxuICAgIFwiamEtanBcIjogeyBsYWJlbDogXCJKYXBhbmVzZSAoSmFwYW4pXCIsIGZsYWc6IFwi8J+Hr/Cfh7VcIiB9LFxuICAgIFwiamVcIjogeyBsYWJlbDogXCJKZXJzZXlcIiwgZmxhZzogXCLwn4ev8J+HqlwiIH0sXG4gICAgXCJqbVwiOiB7IGxhYmVsOiBcIkphbWFpY2FcIiwgZmxhZzogXCLwn4ev8J+HslwiIH0sXG4gICAgXCJqb1wiOiB7IGxhYmVsOiBcIkpvcmRhblwiLCBmbGFnOiBcIvCfh6/wn4e0XCIgfSxcbiAgICBcImpwXCI6IHsgbGFiZWw6IFwiSmFwYW5lc2VcIiwgZmxhZzogXCLwn4ev8J+HtVwiIH0sXG4gICAgXCJqdlwiOiB7IGxhYmVsOiBcIkphdmFuZXNlXCIsIGZsYWc6IFwi8J+HrvCfh6lcIiB9LFxuICAgIFwia2FcIjogeyBsYWJlbDogXCJHZW9yZ2lhblwiLCBmbGFnOiBcIvCfh6zwn4eqXCIgfSxcbiAgICBcImtlXCI6IHsgbGFiZWw6IFwiS2VueWFcIiwgZmxhZzogXCLwn4ew8J+HqlwiIH0sXG4gICAgXCJrZ1wiOiB7IGxhYmVsOiBcIktvbmdvXCIsIGZsYWc6IFwi8J+HqPCfh6lcIiB9LFxuICAgIFwia2hcIjogeyBsYWJlbDogXCJDYW1ib2RpYVwiLCBmbGFnOiBcIvCfh7Dwn4etXCIgfSxcbiAgICBcImtpXCI6IHsgbGFiZWw6IFwiS2lrdXl1XCIsIGZsYWc6IFwi8J+HsPCfh6pcIiB9LFxuICAgIFwia2pcIjogeyBsYWJlbDogXCJLd2FueWFtYVwiLCBmbGFnOiBcIvCfh7Pwn4emXCIgfSxcbiAgICBcImtrXCI6IHsgbGFiZWw6IFwiS2F6YWtoXCIsIGZsYWc6IFwi8J+HsPCfh79cIiB9LFxuICAgIFwia2xcIjogeyBsYWJlbDogXCJLYWxhYWxsaXN1dFwiLCBmbGFnOiBcIvCfh6zwn4exXCIgfSxcbiAgICBcImttXCI6IHsgbGFiZWw6IFwiS2htZXJcIiwgZmxhZzogXCLwn4ew8J+HrVwiIH0sXG4gICAgXCJrblwiOiB7IGxhYmVsOiBcIkthbm5hZGFcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJrb1wiOiB7IGxhYmVsOiBcIktvcmVhblwiLCBmbGFnOiBcIvCfh7Dwn4e3XCIgfSxcbiAgICBcImtvLWtyXCI6IHsgbGFiZWw6IFwiS29yZWFuIChLb3JlYSlcIiwgZmxhZzogXCLwn4ew8J+Ht1wiIH0sXG4gICAgXCJrcFwiOiB7IGxhYmVsOiBcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZSdzIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HsPCfh7VcIiB9LFxuICAgIFwia3JcIjogeyBsYWJlbDogXCJLb3JlYW5cIiwgZmxhZzogXCLwn4ew8J+Ht1wiIH0sXG4gICAgXCJrc1wiOiB7IGxhYmVsOiBcIkthc2htaXJpXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwia3VcIjogeyBsYWJlbDogXCJLdXJkaXNoXCIsIGZsYWc6IFwi8J+HrvCfh7ZcIiB9LFxuICAgIFwia3ZcIjogeyBsYWJlbDogXCJLb21pXCIsIGZsYWc6IFwi8J+Ht/Cfh7pcIiB9LFxuICAgIFwia3dcIjogeyBsYWJlbDogXCJDb3JuaXNoXCIsIGZsYWc6IFwi8J+HrPCfh6dcIiB9LFxuICAgIFwia3lcIjogeyBsYWJlbDogXCJLeXJneXpcIiwgZmxhZzogXCLwn4ew8J+HrFwiIH0sXG4gICAgXCJrelwiOiB7IGxhYmVsOiBcIkthemFraHN0YW5cIiwgZmxhZzogXCLwn4ew8J+Hv1wiIH0sXG4gICAgXCJsYVwiOiB7IGxhYmVsOiBcIkxhdGluXCIsIGZsYWc6IFwi8J+Hu/Cfh6ZcIiB9LFxuICAgIFwibGJcIjogeyBsYWJlbDogXCJMdXhlbWJvdXJnaXNoXCIsIGZsYWc6IFwi8J+HsfCfh7pcIiB9LFxuICAgIFwibGNcIjogeyBsYWJlbDogXCJTYWludCBMdWNpYVwiLCBmbGFnOiBcIvCfh7Hwn4eoXCIgfSxcbiAgICBcImxnXCI6IHsgbGFiZWw6IFwiR2FuZGFcIiwgZmxhZzogXCLwn4e68J+HrFwiIH0sXG4gICAgXCJsaVwiOiB7IGxhYmVsOiBcIkxpbWJ1cmdpc2hcIiwgZmxhZzogXCLwn4ez8J+HsVwiIH0sXG4gICAgXCJsa1wiOiB7IGxhYmVsOiBcIlNyaSBMYW5rYVwiLCBmbGFnOiBcIvCfh7Hwn4ewXCIgfSxcbiAgICBcImxuXCI6IHsgbGFiZWw6IFwiTGluZ2FsYVwiLCBmbGFnOiBcIvCfh6jwn4epXCIgfSxcbiAgICBcImxvXCI6IHsgbGFiZWw6IFwiTGFvXCIsIGZsYWc6IFwi8J+HsfCfh6ZcIiB9LFxuICAgIFwibHJcIjogeyBsYWJlbDogXCJMaWJlcmlhXCIsIGZsYWc6IFwi8J+HsfCfh7dcIiB9LFxuICAgIFwibHNcIjogeyBsYWJlbDogXCJMZXNvdGhvXCIsIGZsYWc6IFwi8J+HsfCfh7hcIiB9LFxuICAgIFwibHRcIjogeyBsYWJlbDogXCJMaXRodWFuaWFuXCIsIGZsYWc6IFwi8J+HsfCfh7lcIiB9LFxuICAgIFwibHVcIjogeyBsYWJlbDogXCJMdWJhLUthdGFuZ2FcIiwgZmxhZzogXCLwn4eo8J+HqVwiIH0sXG4gICAgXCJsdlwiOiB7IGxhYmVsOiBcIkxhdHZpYW5cIiwgZmxhZzogXCLwn4ex8J+Hu1wiIH0sXG4gICAgXCJseVwiOiB7IGxhYmVsOiBcIkxpYnlhXCIsIGZsYWc6IFwi8J+HsfCfh75cIiB9LFxuICAgIFwibWFcIjogeyBsYWJlbDogXCJNb3JvY2NvXCIsIGZsYWc6IFwi8J+HsvCfh6ZcIiB9LFxuICAgIFwibWNcIjogeyBsYWJlbDogXCJNb25hY29cIiwgZmxhZzogXCLwn4ey8J+HqFwiIH0sXG4gICAgXCJtZFwiOiB7IGxhYmVsOiBcIk1vbGRvdmEsIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HsvCfh6lcIiB9LFxuICAgIFwibWVcIjogeyBsYWJlbDogXCJNb250ZW5lZ3JvXCIsIGZsYWc6IFwi8J+HsvCfh6pcIiB9LFxuICAgIFwibWZcIjogeyBsYWJlbDogXCJTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KVwiLCBmbGFnOiBcIvCfh7Lwn4erXCIgfSxcbiAgICBcIm1nXCI6IHsgbGFiZWw6IFwiTWFsYWdhc3lcIiwgZmxhZzogXCLwn4ey8J+HrFwiIH0sXG4gICAgXCJtaFwiOiB7IGxhYmVsOiBcIk1hcnNoYWxsZXNlXCIsIGZsYWc6IFwi8J+HsvCfh61cIiB9LFxuICAgIFwibWlcIjogeyBsYWJlbDogXCJNxIFvcmlcIiwgZmxhZzogXCLwn4ez8J+Hv1wiIH0sXG4gICAgXCJta1wiOiB7IGxhYmVsOiBcIk1hY2Vkb25pYW5cIiwgZmxhZzogXCLwn4ey8J+HsFwiIH0sXG4gICAgXCJtbFwiOiB7IGxhYmVsOiBcIk1hbGF5YWxhbVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcIm1tXCI6IHsgbGFiZWw6IFwiTXlhbm1hclwiLCBmbGFnOiBcIvCfh7Lwn4eyXCIgfSxcbiAgICBcIm1uXCI6IHsgbGFiZWw6IFwiTW9uZ29saWFuXCIsIGZsYWc6IFwi8J+HsvCfh7NcIiB9LFxuICAgIFwibW9cIjogeyBsYWJlbDogXCJNYWNhb1wiLCBmbGFnOiBcIvCfh7Lwn4e0XCIgfSxcbiAgICBcIm1wXCI6IHsgbGFiZWw6IFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HsvCfh7VcIiB9LFxuICAgIFwibXFcIjogeyBsYWJlbDogXCJNYXJ0aW5pcXVlXCIsIGZsYWc6IFwi8J+HsvCfh7ZcIiB9LFxuICAgIFwibXJcIjogeyBsYWJlbDogXCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJtc1wiOiB7IGxhYmVsOiBcIk1hbGF5XCIsIGZsYWc6IFwi8J+HsvCfh75cIiB9LFxuICAgIFwibXRcIjogeyBsYWJlbDogXCJNYWx0ZXNlXCIsIGZsYWc6IFwi8J+HsvCfh7lcIiB9LFxuICAgIFwibXVcIjogeyBsYWJlbDogXCJNYXVyaXRpdXNcIiwgZmxhZzogXCLwn4ey8J+HulwiIH0sXG4gICAgXCJtdlwiOiB7IGxhYmVsOiBcIk1hbGRpdmVzXCIsIGZsYWc6IFwi8J+HsvCfh7tcIiB9LFxuICAgIFwibXdcIjogeyBsYWJlbDogXCJNYWxhd2lcIiwgZmxhZzogXCLwn4ey8J+HvFwiIH0sXG4gICAgXCJteFwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE1leGljbylcIiwgZmxhZzogXCLwn4ey8J+HvVwiIH0sXG4gICAgXCJteVwiOiB7IGxhYmVsOiBcIkJ1cm1lc2VcIiwgZmxhZzogXCLwn4ey8J+HslwiIH0sXG4gICAgXCJtelwiOiB7IGxhYmVsOiBcIk1vemFtYmlxdWVcIiwgZmxhZzogXCLwn4ey8J+Hv1wiIH0sXG4gICAgXCJuYVwiOiB7IGxhYmVsOiBcIk5hdXJ1YW5cIiwgZmxhZzogXCLwn4ez8J+Ht1wiIH0sXG4gICAgXCJuYlwiOiB7IGxhYmVsOiBcIk5vcndlZ2lhbiBCb2ttw6VsXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibmItbm9cIjogeyBsYWJlbDogXCJOb3J3ZWdpYW4gQm9rbcOlbCAoTm9yd2F5KVwiLCBmbGFnOiBcIvCfh7Pwn4e0XCIgfSxcbiAgICBcIm5jXCI6IHsgbGFiZWw6IFwiTmV3IENhbGVkb25pYVwiLCBmbGFnOiBcIvCfh7Pwn4eoXCIgfSxcbiAgICBcIm5kXCI6IHsgbGFiZWw6IFwiTm9ydGhlcm4gTmRlYmVsZVwiLCBmbGFnOiBcIvCfh7/wn4e8XCIgfSxcbiAgICBcIm5lXCI6IHsgbGFiZWw6IFwiTmVwYWxpXCIsIGZsYWc6IFwi8J+Hs/Cfh7VcIiB9LFxuICAgIFwibmZcIjogeyBsYWJlbDogXCJOb3Jmb2xrIElzbGFuZFwiLCBmbGFnOiBcIvCfh7Pwn4erXCIgfSxcbiAgICBcIm5nXCI6IHsgbGFiZWw6IFwiTmRvbmdhXCIsIGZsYWc6IFwi8J+Hs/Cfh6ZcIiB9LFxuICAgIFwibmlcIjogeyBsYWJlbDogXCJOaWNhcmFndWFcIiwgZmxhZzogXCLwn4ez8J+HrlwiIH0sXG4gICAgXCJubFwiOiB7IGxhYmVsOiBcIkR1dGNoXCIsIGZsYWc6IFwi8J+Hs/Cfh7FcIiB9LFxuICAgIFwibmwtYmVcIjogeyBsYWJlbDogXCJEdXRjaCAoQmVsZ2l1bSlcIiwgZmxhZzogXCLwn4en8J+HqlwiIH0sXG4gICAgXCJubC1ubFwiOiB7IGxhYmVsOiBcIkR1dGNoIChOZXRoZXJsYW5kcylcIiwgZmxhZzogXCLwn4ez8J+HsVwiIH0sXG4gICAgXCJublwiOiB7IGxhYmVsOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibm4tbm9cIjogeyBsYWJlbDogXCJOb3J3ZWdpYW4gTnlub3JzayAoTm9yd2F5KVwiLCBmbGFnOiBcIvCfh7Pwn4e0XCIgfSxcbiAgICBcIm5vXCI6IHsgbGFiZWw6IFwiTm9yd2VnaWFuXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibnBcIjogeyBsYWJlbDogXCJOZXBhbFwiLCBmbGFnOiBcIvCfh7Pwn4e1XCIgfSxcbiAgICBcIm5yXCI6IHsgbGFiZWw6IFwiU291dGhlcm4gTmRlYmVsZVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcIm51XCI6IHsgbGFiZWw6IFwiTml1ZVwiLCBmbGFnOiBcIvCfh7Pwn4e6XCIgfSxcbiAgICBcIm52XCI6IHsgbGFiZWw6IFwiTmF2YWpvXCIsIGZsYWc6IFwi8J+HuvCfh7hcIiB9LFxuICAgIFwibnlcIjogeyBsYWJlbDogXCJDaGljaGV3YVwiLCBmbGFnOiBcIvCfh7Lwn4e8XCIgfSxcbiAgICBcIm56XCI6IHsgbGFiZWw6IFwiTmV3IFplYWxhbmRcIiwgZmxhZzogXCLwn4ez8J+Hv1wiIH0sXG4gICAgXCJvY1wiOiB7IGxhYmVsOiBcIk9jY2l0YW5cIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJvalwiOiB7IGxhYmVsOiBcIk9qaWJ3ZVwiLCBmbGFnOiBcIvCfh6jwn4emXCIgfSxcbiAgICBcIm9tXCI6IHsgbGFiZWw6IFwiT3JvbW9cIiwgZmxhZzogXCLwn4eq8J+HuVwiIH0sXG4gICAgXCJvclwiOiB7IGxhYmVsOiBcIk9yaXlhXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwib3NcIjogeyBsYWJlbDogXCJPc3NldGlhblwiLCBmbGFnOiBcIvCfh6zwn4eqXCIgfSxcbiAgICBcInBhXCI6IHsgbGFiZWw6IFwiKEVhc3Rlcm4pIFB1bmphYmlcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJwZVwiOiB7IGxhYmVsOiBcIlBlcnVcIiwgZmxhZzogXCLwn4e18J+HqlwiIH0sXG4gICAgXCJwZlwiOiB7IGxhYmVsOiBcIkZyZW5jaCBQb2x5bmVzaWFcIiwgZmxhZzogXCLwn4e18J+Hq1wiIH0sXG4gICAgXCJwZ1wiOiB7IGxhYmVsOiBcIlBhcHVhIE5ldyBHdWluZWFcIiwgZmxhZzogXCLwn4e18J+HrFwiIH0sXG4gICAgXCJwaFwiOiB7IGxhYmVsOiBcIlBoaWxpcHBpbmVzXCIsIGZsYWc6IFwi8J+HtfCfh61cIiB9LFxuICAgIFwicGlcIjogeyBsYWJlbDogXCJQxIFsaVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcInBrXCI6IHsgbGFiZWw6IFwiUGFraXN0YW5cIiwgZmxhZzogXCLwn4e18J+HsFwiIH0sXG4gICAgXCJwbFwiOiB7IGxhYmVsOiBcIlBvbGlzaFwiLCBmbGFnOiBcIvCfh7Xwn4exXCIgfSxcbiAgICBcInBtXCI6IHsgbGFiZWw6IFwiU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvblwiLCBmbGFnOiBcIvCfh7Xwn4eyXCIgfSxcbiAgICBcInBuXCI6IHsgbGFiZWw6IFwiUGl0Y2Fpcm5cIiwgZmxhZzogXCLwn4e18J+Hs1wiIH0sXG4gICAgXCJwclwiOiB7IGxhYmVsOiBcIlB1ZXJ0byBSaWNvXCIsIGZsYWc6IFwi8J+HtfCfh7dcIiB9LFxuICAgIFwicHNcIjogeyBsYWJlbDogXCJQYXNodG9cIiwgZmxhZzogXCLwn4em8J+Hq1wiIH0sXG4gICAgXCJwdFwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2VcIiwgZmxhZzogXCLwn4e18J+HuVwiIH0sXG4gICAgXCJwdC1hb1wiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEFuZ29sYSlcIiwgZmxhZzogXCLwn4em8J+HtFwiIH0sXG4gICAgXCJwdC1iclwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEJyYXppbClcIiwgZmxhZzogXCLwn4en8J+Ht1wiIH0sXG4gICAgXCJwdC1wdFwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKFBvcnR1Z2FsKVwiLCBmbGFnOiBcIvCfh7Xwn4e5XCIgfSxcbiAgICBcInB3XCI6IHsgbGFiZWw6IFwiUGFsYXVcIiwgZmxhZzogXCLwn4e18J+HvFwiIH0sXG4gICAgXCJweVwiOiB7IGxhYmVsOiBcIlBhcmFndWF5XCIsIGZsYWc6IFwi8J+HtfCfh75cIiB9LFxuICAgIFwicWFcIjogeyBsYWJlbDogXCJRYXRhclwiLCBmbGFnOiBcIvCfh7bwn4emXCIgfSxcbiAgICBcInF1XCI6IHsgbGFiZWw6IFwiUXVlY2h1YVwiLCBmbGFnOiBcIvCfh7Xwn4eqXCIgfSxcbiAgICBcInJlXCI6IHsgbGFiZWw6IFwiUsOpdW5pb25cIiwgZmxhZzogXCLwn4e38J+HqlwiIH0sXG4gICAgXCJybVwiOiB7IGxhYmVsOiBcIlJvbWFuc2hcIiwgZmxhZzogXCLwn4eo8J+HrVwiIH0sXG4gICAgXCJyblwiOiB7IGxhYmVsOiBcIktpcnVuZGlcIiwgZmxhZzogXCLwn4en8J+HrlwiIH0sXG4gICAgXCJyb1wiOiB7IGxhYmVsOiBcIlJvbWFuaWFuXCIsIGZsYWc6IFwi8J+Ht/Cfh7RcIiB9LFxuICAgIFwicnNcIjogeyBsYWJlbDogXCJTZXJiaWFcIiwgZmxhZzogXCLwn4e38J+HuFwiIH0sXG4gICAgXCJydVwiOiB7IGxhYmVsOiBcIlJ1c3NpYW5cIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJydS1ydVwiOiB7IGxhYmVsOiBcIlJ1c3NpYW4gKFJ1c3NpYSlcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJyd1wiOiB7IGxhYmVsOiBcIktpbnlhcndhbmRhXCIsIGZsYWc6IFwi8J+Ht/Cfh7xcIiB9LFxuICAgIFwic2FcIjogeyBsYWJlbDogXCJBcmFiaWMgKFNhdWRpIEFyYWJpYSlcIiwgZmxhZzogXCLwn4e48J+HplwiIH0sXG4gICAgXCJzYlwiOiB7IGxhYmVsOiBcIlNvbG9tb24gSXNsYW5kc1wiLCBmbGFnOiBcIvCfh7jwn4enXCIgfSxcbiAgICBcInNjXCI6IHsgbGFiZWw6IFwiU2FyZGluaWFuXCIsIGZsYWc6IFwi8J+HrvCfh7lcIiB9LFxuICAgIFwic2RcIjogeyBsYWJlbDogXCJTaW5kaGlcIiwgZmxhZzogXCLwn4e18J+HsFwiIH0sXG4gICAgXCJzZVwiOiB7IGxhYmVsOiBcIlN3ZWRpc2hcIiwgZmxhZzogXCLwn4e48J+HqlwiIH0sXG4gICAgXCJzZ1wiOiB7IGxhYmVsOiBcIlNhbmdvXCIsIGZsYWc6IFwi8J+HqPCfh6tcIiB9LFxuICAgIFwic2hcIjogeyBsYWJlbDogXCJTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYVwiLCBmbGFnOiBcIvCfh7jwn4etXCIgfSxcbiAgICBcInNoYXJlZFwiOiB7IGxhYmVsOiBcIlNoYXJlZFwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwic2lcIjogeyBsYWJlbDogXCJTaW5oYWxlc2VcIiwgZmxhZzogXCLwn4ex8J+HsFwiIH0sXG4gICAgXCJzalwiOiB7IGxhYmVsOiBcIlN2YWxiYXJkIGFuZCBKYW4gTWF5ZW5cIiwgZmxhZzogXCLwn4e48J+Hr1wiIH0sXG4gICAgXCJza1wiOiB7IGxhYmVsOiBcIlNsb3Zha1wiLCBmbGFnOiBcIvCfh7jwn4ewXCIgfSxcbiAgICBcInNsXCI6IHsgbGFiZWw6IFwiU2xvdmVuZVwiLCBmbGFnOiBcIvCfh7jwn4euXCIgfSxcbiAgICBcInNtXCI6IHsgbGFiZWw6IFwiU2Ftb2FuXCIsIGZsYWc6IFwi8J+HvPCfh7hcIiB9LFxuICAgIFwic25cIjogeyBsYWJlbDogXCJTaG9uYVwiLCBmbGFnOiBcIvCfh7/wn4e8XCIgfSxcbiAgICBcInNvXCI6IHsgbGFiZWw6IFwiU29tYWxpXCIsIGZsYWc6IFwi8J+HuPCfh7RcIiB9LFxuICAgIFwic3FcIjogeyBsYWJlbDogXCJBbGJhbmlhblwiLCBmbGFnOiBcIvCfh6bwn4exXCIgfSxcbiAgICBcInNyXCI6IHsgbGFiZWw6IFwiU2VyYmlhblwiLCBmbGFnOiBcIvCfh7fwn4e4XCIgfSxcbiAgICBcInNzXCI6IHsgbGFiZWw6IFwiU3dhdGlcIiwgZmxhZzogXCLwn4e48J+Hv1wiIH0sXG4gICAgXCJzdFwiOiB7IGxhYmVsOiBcIlNvdXRoZXJuIFNvdGhvXCIsIGZsYWc6IFwi8J+HsfCfh7hcIiB9LFxuICAgIFwic3VcIjogeyBsYWJlbDogXCJTdW5kYW5lc2VcIiwgZmxhZzogXCLwn4eu8J+HqVwiIH0sXG4gICAgXCJzdlwiOiB7IGxhYmVsOiBcIlN3ZWRpc2hcIiwgZmxhZzogXCLwn4e48J+HqlwiIH0sXG4gICAgXCJzdi1maVwiOiB7IGxhYmVsOiBcIlN3ZWRpc2ggKEZpbmxhbmQpXCIsIGZsYWc6IFwi8J+Hq/Cfh65cIiB9LFxuICAgIFwic3Ytc2VcIjogeyBsYWJlbDogXCJTd2VkaXNoIChTd2VkZW4pXCIsIGZsYWc6IFwi8J+HuPCfh6pcIiB9LFxuICAgIFwic3dcIjogeyBsYWJlbDogXCJTd2FoaWxpXCIsIGZsYWc6IFwi8J+HufCfh79cIiB9LFxuICAgIFwic3hcIjogeyBsYWJlbDogXCJTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpXCIsIGZsYWc6IFwi8J+HuPCfh71cIiB9LFxuICAgIFwic3lcIjogeyBsYWJlbDogXCJTeXJpYW4gQXJhYiBSZXB1YmxpY1wiLCBmbGFnOiBcIvCfh7jwn4e+XCIgfSxcbiAgICBcInN6XCI6IHsgbGFiZWw6IFwiRXN3YXRpbmlcIiwgZmxhZzogXCLwn4e48J+Hv1wiIH0sXG4gICAgXCJ0YVwiOiB7IGxhYmVsOiBcIlRhbWlsXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwidGNcIjogeyBsYWJlbDogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIiwgZmxhZzogXCLwn4e58J+HqFwiIH0sXG4gICAgXCJ0ZFwiOiB7IGxhYmVsOiBcIkNoYWRcIiwgZmxhZzogXCLwn4e58J+HqVwiIH0sXG4gICAgXCJ0ZVwiOiB7IGxhYmVsOiBcIlRlbHVndVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcInRmXCI6IHsgbGFiZWw6IFwiRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzXCIsIGZsYWc6IFwi8J+HufCfh6tcIiB9LFxuICAgIFwidGdcIjogeyBsYWJlbDogXCJUYWppa1wiLCBmbGFnOiBcIvCfh7nwn4evXCIgfSxcbiAgICBcInRoXCI6IHsgbGFiZWw6IFwiVGhhaVwiLCBmbGFnOiBcIvCfh7nwn4etXCIgfSxcbiAgICBcInRpXCI6IHsgbGFiZWw6IFwiVGlncmlueWFcIiwgZmxhZzogXCLwn4eq8J+Ht1wiIH0sXG4gICAgXCJ0alwiOiB7IGxhYmVsOiBcIlRhamlraXN0YW5cIiwgZmxhZzogXCLwn4e58J+Hr1wiIH0sXG4gICAgXCJ0a1wiOiB7IGxhYmVsOiBcIlR1cmttZW5cIiwgZmxhZzogXCLwn4e58J+HslwiIH0sXG4gICAgXCJ0bFwiOiB7IGxhYmVsOiBcIlRhZ2Fsb2dcIiwgZmxhZzogXCLwn4e18J+HrVwiIH0sXG4gICAgXCJ0bVwiOiB7IGxhYmVsOiBcIlR1cmttZW5pc3RhblwiLCBmbGFnOiBcIvCfh7nwn4eyXCIgfSxcbiAgICBcInRuXCI6IHsgbGFiZWw6IFwiVHN3YW5hXCIsIGZsYWc6IFwi8J+Hp/Cfh7xcIiB9LFxuICAgIFwidG9cIjogeyBsYWJlbDogXCJUb25nYSAoVG9uZ2EgSXNsYW5kcylcIiwgZmxhZzogXCLwn4e58J+HtFwiIH0sXG4gICAgXCJ0clwiOiB7IGxhYmVsOiBcIlR1cmtpc2hcIiwgZmxhZzogXCLwn4e58J+Ht1wiIH0sXG4gICAgXCJ0c1wiOiB7IGxhYmVsOiBcIlRzb25nYVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInR0XCI6IHsgbGFiZWw6IFwiVGF0YXJcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJ0dlwiOiB7IGxhYmVsOiBcIlR1dmFsdVwiLCBmbGFnOiBcIvCfh7nwn4e7XCIgfSxcbiAgICBcInR3XCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoVHJhZGl0aW9uYWwpXCIsIGZsYWc6IFwi8J+HufCfh7xcIiB9LFxuICAgIFwidHlcIjogeyBsYWJlbDogXCJUYWhpdGlhblwiLCBmbGFnOiBcIvCfh7Xwn4erXCIgfSxcbiAgICBcInR6XCI6IHsgbGFiZWw6IFwiVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZlwiLCBmbGFnOiBcIvCfh7nwn4e/XCIgfSxcbiAgICBcInVhXCI6IHsgbGFiZWw6IFwiVWtyYWluaWFuXCIsIGZsYWc6IFwi8J+HuvCfh6ZcIiB9LFxuICAgIFwidWdcIjogeyBsYWJlbDogXCJVeWdodXJcIiwgZmxhZzogXCLwn4eo8J+Hs1wiIH0sXG4gICAgXCJ1a1wiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFVLKVwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcInVrLXVhXCI6IHsgbGFiZWw6IFwiVWtyYWluaWFuIChVa3JhaW5lKVwiLCBmbGFnOiBcIvCfh7rwn4emXCIgfSxcbiAgICBcInVtXCI6IHsgbGFiZWw6IFwiVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HuvCfh7JcIiB9LFxuICAgIFwidXJcIjogeyBsYWJlbDogXCJVcmR1XCIsIGZsYWc6IFwi8J+HtfCfh7BcIiB9LFxuICAgIFwidXNcIjogeyBsYWJlbDogXCJFbmdsaXNoIChVUylcIiwgZmxhZzogXCLwn4e68J+HuFwiIH0sXG4gICAgXCJ1eVwiOiB7IGxhYmVsOiBcIlVydWd1YXlcIiwgZmxhZzogXCLwn4e68J+HvlwiIH0sXG4gICAgXCJ1elwiOiB7IGxhYmVsOiBcIlV6YmVrXCIsIGZsYWc6IFwi8J+HuvCfh79cIiB9LFxuICAgIFwidmFcIjogeyBsYWJlbDogXCJIb2x5IFNlZVwiLCBmbGFnOiBcIvCfh7vwn4emXCIgfSxcbiAgICBcInZjXCI6IHsgbGFiZWw6IFwiU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXNcIiwgZmxhZzogXCLwn4e78J+HqFwiIH0sXG4gICAgXCJ2ZVwiOiB7IGxhYmVsOiBcIlZlbmRhXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwidmdcIjogeyBsYWJlbDogXCJWaXJnaW4gSXNsYW5kcyAoQnJpdGlzaClcIiwgZmxhZzogXCLwn4e78J+HrFwiIH0sXG4gICAgXCJ2aVwiOiB7IGxhYmVsOiBcIlZpZXRuYW1lc2VcIiwgZmxhZzogXCLwn4e78J+Hs1wiIH0sXG4gICAgXCJ2blwiOiB7IGxhYmVsOiBcIlZpZXQgTmFtXCIsIGZsYWc6IFwi8J+Hu/Cfh7NcIiB9LFxuICAgIFwidm9cIjogeyBsYWJlbDogXCJWb2xhcMO8a1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwidnVcIjogeyBsYWJlbDogXCJWYW51YXR1XCIsIGZsYWc6IFwi8J+Hu/Cfh7pcIiB9LFxuICAgIFwid2FcIjogeyBsYWJlbDogXCJXYWxsb29uXCIsIGZsYWc6IFwi8J+Hp/Cfh6pcIiB9LFxuICAgIFwid2ZcIjogeyBsYWJlbDogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLCBmbGFnOiBcIvCfh7zwn4erXCIgfSxcbiAgICBcIndvXCI6IHsgbGFiZWw6IFwiV29sb2ZcIiwgZmxhZzogXCLwn4e48J+Hs1wiIH0sXG4gICAgXCJ3c1wiOiB7IGxhYmVsOiBcIlNhbW9hXCIsIGZsYWc6IFwi8J+HvPCfh7hcIiB9LFxuICAgIFwieGhcIjogeyBsYWJlbDogXCJYaG9zYVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInllXCI6IHsgbGFiZWw6IFwiWWVtZW5cIiwgZmxhZzogXCLwn4e+8J+HqlwiIH0sXG4gICAgXCJ5aVwiOiB7IGxhYmVsOiBcIllpZGRpc2hcIiwgZmxhZzogXCLwn4eu8J+HsVwiIH0sXG4gICAgXCJ5b1wiOiB7IGxhYmVsOiBcIllvcnViYVwiLCBmbGFnOiBcIvCfh7Pwn4esXCIgfSxcbiAgICBcInl0XCI6IHsgbGFiZWw6IFwiTWF5b3R0ZVwiLCBmbGFnOiBcIvCfh77wn4e5XCIgfSxcbiAgICBcInphXCI6IHsgbGFiZWw6IFwiWmh1YW5nXCIsIGZsYWc6IFwi8J+HqPCfh7NcIiB9LFxuICAgIFwiemhcIjogeyBsYWJlbDogXCJDaGluZXNlXCIsIGZsYWc6IFwi8J+HqPCfh7NcIiB9LFxuICAgIFwiemgtY25cIjogeyBsYWJlbDogXCJDaGluZXNlIChTaW1wbGlmaWVkKVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcInpoLWhrXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcInpoLW1vXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoTWFjYXUpXCIsIGZsYWc6IFwi8J+HsvCfh7RcIiB9LFxuICAgIFwiemgtc2dcIjogeyBsYWJlbDogXCJDaGluZXNlIChTaW5nYXBvcmUpXCIsIGZsYWc6IFwi8J+HuPCfh6xcIiB9LFxuICAgIFwiemgtdHdcIjogeyBsYWJlbDogXCJDaGluZXNlIChUcmFkaXRpb25hbClcIiwgZmxhZzogXCLwn4e58J+HvFwiIH0sXG4gICAgXCJ6bVwiOiB7IGxhYmVsOiBcIlphbWJpYVwiLCBmbGFnOiBcIvCfh7/wn4eyXCIgfSxcbiAgICBcInp1XCI6IHsgbGFiZWw6IFwiWnVsdVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInp3XCI6IHsgbGFiZWw6IFwiWmltYmFid2VcIiwgZmxhZzogXCLwn4e/8J+HvFwiIH1cbiAgfTtcblxuICAvKiogQHJldHVybnMge0hUTUxFbGVtZW50fG51bGx9ICovXG4gIGZ1bmN0aW9uIGZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QoZm9ybSwgY29udHJvbENvbnRhaW5lckVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChmb3JtICYmIGZvcm0uc2VjdGlvbnMgJiYgZm9ybS5zZWN0aW9uc1swXSAmJiBmb3JtLnNlY3Rpb25zWzBdLmNvbnRhaW5lckVsKSB7XG4gICAgICAgIHZhciBzZWMgPSBmb3JtLnNlY3Rpb25zWzBdLmNvbnRhaW5lckVsO1xuICAgICAgICBpZiAoc2VjLmNsb3Nlc3QpIHtcbiAgICAgICAgICAvKiogUHJlZmVyIGAucGFuZWwtZ3JvdXBgIG92ZXIgYCNpY2UtY29udGFpbmVyYCBzbyB3ZSB3cmFwIGFjY29yZGlvbiBzZWN0aW9ucyBvbmx5LCBub3QgdGhlIHdob2xlIElDRSBzaGVsbCAoZml4ZXMgY29udHJvbHMgbGlrZSBmaWxlLW5hbWUgLyBYQikuICovXG4gICAgICAgICAgdmFyIHBnID0gc2VjLmNsb3Nlc3QoXCIucGFuZWwtZ3JvdXBcIik7XG4gICAgICAgICAgaWYgKHBnKSByZXR1cm4gcGc7XG4gICAgICAgICAgdmFyIGljZSA9IHNlYy5jbG9zZXN0KFwiI2ljZS1jb250YWluZXJcIik7XG4gICAgICAgICAgaWYgKGljZSkgcmV0dXJuIGljZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VjLnBhcmVudE5vZGUgJiYgc2VjLnBhcmVudE5vZGUubm9kZVR5cGUgPT09IDEgPyAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyAoc2VjLnBhcmVudE5vZGUpIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sQ29udGFpbmVyRWwgJiYgY29udHJvbENvbnRhaW5lckVsLmNsb3Nlc3QpIHtcbiAgICAgICAgdmFyIHBnMiA9IGNvbnRyb2xDb250YWluZXJFbC5jbG9zZXN0KFwiLnBhbmVsLWdyb3VwXCIpO1xuICAgICAgICBpZiAocGcyKSByZXR1cm4gcGcyO1xuICAgICAgICB2YXIgaWNlMiA9IGNvbnRyb2xDb250YWluZXJFbC5jbG9zZXN0KFwiI2ljZS1jb250YWluZXJcIik7XG4gICAgICAgIGlmIChpY2UyKSByZXR1cm4gaWNlMjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlMikge31cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVud3JhcEZvcm1Db21wYXJlTGF5b3V0KGhvc3QpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFob3N0IHx8IGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkICE9PSBcIjFcIikgcmV0dXJuO1xuICAgICAgdmFyIHJvdyA9IGhvc3QuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBpZiAoIXJvdyB8fCAhcm93LmNsYXNzTGlzdCB8fCAhcm93LmNsYXNzTGlzdC5jb250YWlucyhcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1yb3dcIikpIHtcbiAgICAgICAgZGVsZXRlIGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgbWFpbiA9IHJvdy5xdWVyeVNlbGVjdG9yKFwiLnRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1tYWluXCIpO1xuICAgICAgaWYgKG1haW4pIHtcbiAgICAgICAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGhvc3QuYXBwZW5kQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaG9zdC5yZW1vdmVDaGlsZChyb3cpO1xuICAgICAgZGVsZXRlIGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkO1xuICAgIH0gY2F0Y2ggKGUzKSB7fVxuICB9XG5cbiAgdmFyIFNNQVJUQ09QWV9DT01QQVJFX1dJRFRIX0xTID0gXCJ0cmFuc2xhdGlvblNvdXJjZUNvbXBhcmVXaWR0aFB4XCI7XG4gIC8qKiBQZXItc2l0ZTogXCIxXCIgPSBjb2xsYXBzZWQgb24gYWxsIGZvcm1zIGZvciB0aGF0IHNpdGUuICovXG4gIHZhciBUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfTFNfUFJFRklYID0gXCJ1aWdvb2RpZXMudHJhbnNsYXRpb25WZXJzaW9ucy5jb2xsYXBzZWQuXCI7XG4gIHZhciBUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfRVZFTlQgPSBcInVpZ29vZGllcy50cmFuc2xhdGlvblZlcnNpb25zLmNvbGxhcHNlZENoYW5nZWRcIjtcblxuICBmdW5jdGlvbiB0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleShzaXRlSWQpIHtcbiAgICByZXR1cm4gVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0xTX1BSRUZJWCArIFN0cmluZyhzaXRlSWQgfHwgXCJfXCIpLnRyaW0oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZChzaXRlSWQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleShzaXRlSWQpKSA9PT0gXCIxXCJcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQoc2l0ZUlkLCBjb2xsYXBzZWQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZVN0b3JhZ2VLZXkoc2l0ZUlkKSwgY29sbGFwc2VkID8gXCIxXCIgOiBcIjBcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZUxzKSB7fVxuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LmRpc3BhdGNoRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHsgc2l0ZUlkOiBTdHJpbmcoc2l0ZUlkIHx8IFwiXCIpLnRyaW0oKSwgY29sbGFwc2VkOiAhIWNvbGxhcHNlZCB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlRXYpIHt9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVNvdXJjZVBhbmVXaWR0aFB4KGxlZnRFbCwgdG90YWxSb3dXaWR0aFB4LCB3aWR0aFB4KSB7XG4gICAgdmFyIG1pblcgPSAyMDA7XG4gICAgdmFyIG1heFcgPSBNYXRoLm1heChtaW5XICsgODAsIE1hdGgucm91bmQodG90YWxSb3dXaWR0aFB4KSAtIDI2MCk7XG4gICAgdmFyIHcgPSBNYXRoLm1heChtaW5XLCBNYXRoLm1pbihtYXhXLCBNYXRoLnJvdW5kKHdpZHRoUHgpKSk7XG4gICAgbGVmdEVsLnN0eWxlLmZsZXggPSBcIjAgMCBcIiArIHcgKyBcInB4XCI7XG4gICAgbGVmdEVsLnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbiAgICBsZWZ0RWwuc3R5bGUubWF4V2lkdGggPSBcIm5vbmVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRJbml0aWFsU291cmNlUGFuZVdpZHRoUHgoaG9zdFdpZHRoUHgpIHtcbiAgICB2YXIgbWF4QWxsb3dlZCA9IE1hdGgubWF4KDI4MCwgTWF0aC5yb3VuZChob3N0V2lkdGhQeCkgLSAyNjApO1xuICAgIHRyeSB7XG4gICAgICB2YXIgcyA9IHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU01BUlRDT1BZX0NPTVBBUkVfV0lEVEhfTFMpO1xuICAgICAgdmFyIG4gPSBwYXJzZUludChzLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKG4pICYmIG4gPj0gMjAwICYmIG4gPD0gbWF4QWxsb3dlZCkge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlMCkge31cbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5mbG9vcihob3N0V2lkdGhQeCAqIDAuNDQpLCA2MDAsIG1heEFsbG93ZWQpO1xuICB9XG5cbiAgLyoqIERyYWdnYWJsZSB2ZXJ0aWNhbCBzcGxpdHRlciBiZXR3ZWVuIHNvdXJjZSBwYW5lIGFuZCBtYWluIGZvcm0gY29sdW1uLiAqL1xuICBmdW5jdGlvbiBhdHRhY2hTbWFydGNvcHlDb21wYXJlU3BsaXR0ZXIocm93KSB7XG4gICAgdmFyIHNwbGl0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcGxpdHRlci5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1zcGxpdHRlclwiO1xuICAgIHNwbGl0dGVyLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJzZXBhcmF0b3JcIik7XG4gICAgc3BsaXR0ZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1vcmllbnRhdGlvblwiLCBcInZlcnRpY2FsXCIpO1xuICAgIHNwbGl0dGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEcmFnIHRvIHJlc2l6ZSBzb3VyY2UgcGFuZWwgd2lkdGhcIik7XG4gICAgc3BsaXR0ZXIudGFiSW5kZXggPSAwO1xuICAgIHNwbGl0dGVyLnN0eWxlLmNzc1RleHQgPVxuICAgICAgXCJmbGV4OjAgMCAxMHB4O3dpZHRoOjEwcHg7Y3Vyc29yOmNvbC1yZXNpemU7YWxpZ24tc2VsZjpzdHJldGNoO3RvdWNoLWFjdGlvbjpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQ6dmFyKC0tdHYtcmVzaXplKTtib3JkZXItcmFkaXVzOjRweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLXR2LXJlc2l6ZS1iZCk7XCI7XG4gICAgc3BsaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgbGVmdEVsID0gcm93LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtaWZyYW1lLWhvc3RcIik7XG4gICAgICBpZiAoIWxlZnRFbCkgcmV0dXJuO1xuICAgICAgdmFyIHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICAgIHZhciBzdGFydFcgPSBsZWZ0RWwub2Zmc2V0V2lkdGg7XG4gICAgICB2YXIgbWluVyA9IDIwMDtcbiAgICAgIGZ1bmN0aW9uIGdldE1heFcoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChtaW5XICsgODAsIE1hdGgucm91bmQocm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSAtIDI2MCk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBzcGxpdHRlci5zZXRQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICB9IGNhdGNoIChjYXApIHt9XG4gICAgICBmdW5jdGlvbiBvbk1vdmUoZXYpIHtcbiAgICAgICAgdmFyIGR4ID0gZXYuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgICAgdmFyIG53ID0gc3RhcnRXICsgZHg7XG4gICAgICAgIHZhciBtYXhXID0gZ2V0TWF4VygpO1xuICAgICAgICBpZiAobncgPCBtaW5XKSBudyA9IG1pblc7XG4gICAgICAgIGlmIChudyA+IG1heFcpIG53ID0gbWF4VztcbiAgICAgICAgbGVmdEVsLnN0eWxlLmZsZXggPSBcIjAgMCBcIiArIG53ICsgXCJweFwiO1xuICAgICAgICBsZWZ0RWwuc3R5bGUud2lkdGggPSBudyArIFwicHhcIjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvbk1vdmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIG9uVXApO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCBvblVwKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzcGxpdHRlci5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpO1xuICAgICAgICB9IGNhdGNoIChyZWwpIHt9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNNQVJUQ09QWV9DT01QQVJFX1dJRFRIX0xTLCBTdHJpbmcobGVmdEVsLm9mZnNldFdpZHRoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChscykge31cbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBvblVwKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIG9uVXApO1xuICAgIH0pO1xuICAgIHJvdy5hcHBlbmRDaGlsZChzcGxpdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUHV0cyByZWFkLW9ubHkgc291cmNlIGlmcmFtZSB0byB0aGUgbGVmdCBvZiBhbGwgY3VycmVudCBmb3JtIGZpZWxkcyAoc2VjdGlvbnMpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWZyYW1lU3JjXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoTGFiZWxcbiAgICovXG4gIGZ1bmN0aW9uIHdyYXBGb3JtQ29tcGFyZUxheW91dChob3N0LCBpZnJhbWVTcmMsIHBhdGhMYWJlbCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWhvc3QgfHwgIWlmcmFtZVNyYykgcmV0dXJuO1xuICAgICAgaWYgKGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkID09PSBcIjFcIikge1xuICAgICAgICB2YXIgZXhpc3RpbmdJZnJhbWUgPSBob3N0LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtaWZyYW1lLWhvc3QgaWZyYW1lXCIpO1xuICAgICAgICBpZiAoZXhpc3RpbmdJZnJhbWUpIHtcbiAgICAgICAgICBleGlzdGluZ0lmcmFtZS5zcmMgPSBpZnJhbWVTcmM7XG4gICAgICAgICAgZXhpc3RpbmdJZnJhbWUuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgICAgICBcImZsZXg6MSAxIGF1dG87bWluLWhlaWdodDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS10di1yZXNpemUtYmQpO2JvcmRlci1yYWRpdXM6NnB4O2JhY2tncm91bmQ6dmFyKC0tdHYtYmcpO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29kZUVsID0gaG9zdC5xdWVyeVNlbGVjdG9yKFwiLnRyYW5zbGF0aW9uLXNvdXJjZS1jb21wYXJlLXBhdGhcIik7XG4gICAgICAgIGlmIChjb2RlRWwpIGNvZGVFbC50ZXh0Q29udGVudCA9IHBhdGhMYWJlbCB8fCBcIlwiO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHJvdy5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1yb3dcIjtcbiAgICAgIHJvdy5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgXCJkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOnN0cmV0Y2g7Z2FwOjhweDt3aWR0aDoxMDAlO21pbi1oZWlnaHQ6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCI7XG5cbiAgICAgIHZhciBob3N0VyA9IGhvc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDgwMCkgfHwgODAwO1xuICAgICAgdmFyIGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbGVmdC5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLXNvdXJjZS1jb21wYXJlLWlmcmFtZS1ob3N0XCI7XG4gICAgICBsZWZ0LnN0eWxlLmNzc1RleHQgPVxuICAgICAgICBcImZsZXg6MCAwIGF1dG87ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6OHB4O21pbi1oZWlnaHQ6MDthbGlnbi1zZWxmOnN0cmV0Y2g7Ym94LXNpemluZzpib3JkZXItYm94O1wiO1xuICAgICAgYXBwbHlTb3VyY2VQYW5lV2lkdGhQeChsZWZ0LCBob3N0VywgcmVhZEluaXRpYWxTb3VyY2VQYW5lV2lkdGhQeChob3N0VykpO1xuXG4gICAgICB2YXIgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhlYWRlci5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgXCJkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2dhcDo4cHg7ZmxleC13cmFwOndyYXA7ZmxleC1zaHJpbms6MDtcIjtcbiAgICAgIHZhciB0aXRsZUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRpdGxlQmxvY2suc3R5bGUubWluV2lkdGggPSBcIjBcIjtcbiAgICAgIHZhciBzdHJvbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3Ryb25nXCIpO1xuICAgICAgc3Ryb25nLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLXR2LXRleHQpO1wiO1xuICAgICAgc3Ryb25nLnRleHRDb250ZW50ID0gXCJTb3VyY2UgKHJlYWQtb25seSlcIjtcbiAgICAgIHRpdGxlQmxvY2suYXBwZW5kQ2hpbGQoc3Ryb25nKTtcbiAgICAgIHZhciBzdWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3ViLmNsYXNzTmFtZSA9IFwidGV4dC1tdXRlZFwiO1xuICAgICAgc3ViLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxMHB4O21hcmdpbi10b3A6MnB4O3dvcmQtYnJlYWs6YnJlYWstYWxsO1wiO1xuICAgICAgdmFyIGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY29kZVwiKTtcbiAgICAgIGNvZGUuY2xhc3NOYW1lID0gXCJ0cmFuc2xhdGlvbi1zb3VyY2UtY29tcGFyZS1wYXRoXCI7XG4gICAgICBjb2RlLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxMHB4O1wiO1xuICAgICAgY29kZS50ZXh0Q29udGVudCA9IHBhdGhMYWJlbCB8fCBcIlwiO1xuICAgICAgc3ViLmFwcGVuZENoaWxkKGNvZGUpO1xuICAgICAgdGl0bGVCbG9jay5hcHBlbmRDaGlsZChzdWIpO1xuICAgICAgdmFyIGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNsb3NlQnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgY2xvc2VCdG4uY2xhc3NOYW1lID0gXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCI7XG4gICAgICBjbG9zZUJ0bi50ZXh0Q29udGVudCA9IFwiQ2xvc2VcIjtcbiAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidHJhbnNsYXRpb246Y2xvc2Utc291cmNlLWNvbXBhcmVcIikpO1xuICAgICAgICB9IGNhdGNoIChlNCkge31cbiAgICAgIH0pO1xuICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlQmxvY2spO1xuICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICBpZnJhbWUudGl0bGUgPSBcIlNvdXJjZSBpdGVtIOKAlCByZWFkLW9ubHkgZm9ybVwiO1xuICAgICAgaWZyYW1lLnNyYyA9IGlmcmFtZVNyYztcbiAgICAgIGlmcmFtZS5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgXCJmbGV4OjEgMSBhdXRvO21pbi1oZWlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JvcmRlcjoxcHggc29saWQgdmFyKC0tdHYtcmVzaXplLWJkKTtib3JkZXItcmFkaXVzOjZweDtiYWNrZ3JvdW5kOnZhcigtLXR2LWJnKTtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCI7XG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGlmcmFtZSk7XG5cbiAgICAgIHZhciBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1haW4uY2xhc3NOYW1lID0gXCJ0cmFuc2xhdGlvbi1mb3JtLWNvbXBhcmUtbWFpblwiO1xuICAgICAgbWFpbi5zdHlsZS5jc3NUZXh0ID0gXCJmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MDt3aWR0aDoxMDAlO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcbiAgICAgIHdoaWxlIChob3N0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChob3N0LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgcm93LmFwcGVuZENoaWxkKGxlZnQpO1xuICAgICAgYXR0YWNoU21hcnRjb3B5Q29tcGFyZVNwbGl0dGVyKHJvdyk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQobWFpbik7XG4gICAgICBob3N0LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICBob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZCA9IFwiMVwiO1xuICAgIH0gY2F0Y2ggKGU1KSB7fVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxlTGlzdCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgXCJlblwiLFxuICAgICAgXCJlc1wiLFxuICAgICAgXCJqYVwiLFxuICAgICAgXCJ6aFwiLFxuICAgICAgXCJ1c1wiLFxuICAgICAgXCJ1a1wiLFxuICAgICAgXCJkZVwiLFxuICAgICAgXCJmclwiLFxuICAgICAgXCJpdFwiLFxuICAgICAgXCJka1wiLFxuICAgICAgXCJmaVwiLFxuICAgICAgXCJubFwiLFxuICAgICAgXCJub1wiLFxuICAgICAgXCJydVwiLFxuICAgICAgXCJzZVwiLFxuICAgICAgXCJiclwiLFxuICAgICAgXCJlbFwiLFxuICAgICAgXCJqcFwiLFxuICAgICAgXCJwdFwiLFxuICAgICAgXCJrb1wiLFxuICAgICAgXCJhclwiLFxuICAgICAgXCJwbFwiLFxuICAgICAgXCJ0clwiLFxuICAgICAgXCJ2aVwiXG4gICAgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvY2FsZUZyb21QYXRoKHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHJldHVybiBcIlwiO1xuICAgIHZhciBwYXJ0cyA9IHBhdGhcbiAgICAgIC5yZXBsYWNlKC9eXFwvc2l0ZVxcL1teL10rXFwvL2ksIFwiXCIpXG4gICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHJldHVybiBcIlwiO1xuICAgIHZhciBsaXN0ID0gZ2V0TG9jYWxlTGlzdCgpO1xuICAgIHZhciBmaXJzdCA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKFJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTW2ZpcnN0XSAmJiBwYXJ0c1sxXSkge1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IHBhcnRzWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAobGlzdC5pbmRleE9mKGNhbmRpZGF0ZSkgPj0gMCkgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICAgIGlmICgvXlthLXpdezJ9KC1bYS16MC05XXsxLDh9KT8kL2kudGVzdChwYXJ0c1sxXSkpIHJldHVybiBjYW5kaWRhdGU7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgaWYgKFJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTW2ZpcnN0XSkgcmV0dXJuIFwiXCI7XG4gICAgaWYgKGxpc3QuaW5kZXhPZihmaXJzdCkgPj0gMCkgcmV0dXJuIGZpcnN0O1xuICAgIGlmICgvXlthLXpdezJ9KC1bYS16MC05XXsxLDh9KT8kL2kudGVzdChwYXJ0c1swXSkpIHJldHVybiBmaXJzdDtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKiBTYW1lIGFzIHRyYW5zbGF0aW9uLWNvbXBvbmVudHMge0Bjb2RlIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZX0gKGFyIOKGlCBhci1zYSwgemgg4oaUIHpoLWNuKS4gKi9cbiAgZnVuY3Rpb24gbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGEsIGIpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhhIHx8IFwiXCIpXG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL18vZywgXCItXCIpO1xuICAgIHZhciBjID0gU3RyaW5nKGIgfHwgXCJcIilcbiAgICAgIC50cmltKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgvXy9nLCBcIi1cIik7XG4gICAgaWYgKCFzIHx8ICFjKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHMgPT09IGMpIHJldHVybiB0cnVlO1xuICAgIGlmIChzLnN0YXJ0c1dpdGgoYyArIFwiLVwiKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGMuc3RhcnRzV2l0aChzICsgXCItXCIpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXRhRm9yUGF0aExvY2FsZShhY3RpdmVNZXRhLCBsb2MpIHtcbiAgICB2YXIgbGsgPSBTdHJpbmcobG9jIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGFjdGl2ZU1ldGEgJiYgYWN0aXZlTWV0YVtsa10pIHJldHVybiBhY3RpdmVNZXRhW2xrXTtcbiAgICBpZiAoIWFjdGl2ZU1ldGEpIHJldHVybiBudWxsO1xuICAgIGZvciAodmFyIGtleSBpbiBhY3RpdmVNZXRhKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhY3RpdmVNZXRhLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobGssIGtleSkpIHJldHVybiBhY3RpdmVNZXRhW2tleV07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRpb25Mb2NhbGVBbHJlYWR5UHJlc2VudCh0cmFuc2xhdGVkTG9jYWxlcywgbG9jKSB7XG4gICAgdmFyIGxrID0gU3RyaW5nKGxvYyB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0cmFuc2xhdGVkTG9jYWxlc1tsa10pIHJldHVybiB0cnVlO1xuICAgIGZvciAodmFyIHNlZyBpbiB0cmFuc2xhdGVkTG9jYWxlcykge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodHJhbnNsYXRlZExvY2FsZXMsIHNlZykpIGNvbnRpbnVlO1xuICAgICAgaWYgKCF0cmFuc2xhdGVkTG9jYWxlc1tzZWddKSBjb250aW51ZTtcbiAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUoc2VnLCBsaykpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogTm9ybWFsaXplIHJlcG8gcGF0aHMgZm9yIGVxdWFsaXR5IChzbGFzaGVzLCBubyB0cmFpbGluZyBzbGFzaCkuICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVN0dWRpb1BhdGgocCkge1xuICAgIHJldHVybiBTdHJpbmcocCB8fCBcIlwiKVxuICAgICAgLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpXG4gICAgICAucmVwbGFjZSgvXFwvKyQvLCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE11bHRpTG9jYWxlUm9vdERpcihmdWxsUGF0aCkge1xuICAgIGlmICghZnVsbFBhdGgpIHJldHVybiBudWxsO1xuICAgIHZhciBtID0gZnVsbFBhdGgubWF0Y2goL14oXFwvc2l0ZVxcL1teL10rXFwvKD86d2Vic2l0ZXxjb21wb25lbnRzKSkoPz1cXC98JCkvaSk7XG4gICAgaWYgKG0pIHJldHVybiBtWzFdO1xuICAgIG0gPSBmdWxsUGF0aC5tYXRjaCgvXihcXC9zaXRlXFwvKD86d2Vic2l0ZXxjb21wb25lbnRzKSkoPz1cXC98JCkvaSk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN1ZmZpeEFmdGVyTG9jYWxlKGZ1bGxQYXRoLCByb290RGlyLCBsb2NhbGUpIHtcbiAgICBpZiAoIWZ1bGxQYXRoIHx8ICFyb290RGlyIHx8ICFsb2NhbGUpIHJldHVybiBudWxsO1xuICAgIHZhciBwID0gcm9vdERpci5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIiArIGxvY2FsZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBsb3dlciA9IGZ1bGxQYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHBsID0gcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsb3dlciA9PT0gcGwpIHJldHVybiBcIlwiO1xuICAgIHZhciBwcmVmaXggPSBwbCArIFwiL1wiO1xuICAgIGlmIChsb3dlci5zdGFydHNXaXRoKHByZWZpeCkpIHtcbiAgICAgIHJldHVybiBmdWxsUGF0aC5zbGljZShwLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBsb2NhbGUsIHN1ZmZpeCkge1xuICAgIHZhciByID0gcm9vdERpci5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgdmFyIHN1ZiA9IHN1ZmZpeCA9PT0gXCJcIiA/IFwiXCIgOiBzdWZmaXguc3RhcnRzV2l0aChcIi9cIikgPyBzdWZmaXggOiBcIi9cIiArIHN1ZmZpeDtcbiAgICByZXR1cm4gciArIFwiL1wiICsgbG9jYWxlLnRvTG93ZXJDYXNlKCkgKyBzdWY7XG4gIH1cblxuICAvKipcbiAgICogVW5kZXIgcm9vdERpciAoL3NpdGUve2lkfS93ZWJzaXRlIG9yIC4uLi9jb21wb25lbnRzKSwgZmlyc3QgcGF0aCBzZWdtZW50IGlzIHRoZSBsb2NhbGUgZm9sZGVyO1xuICAgKiBldmVyeXRoaW5nIGFmdGVyIHRoYXQgaXMgdGhlIG1pcnJvcmVkIHN1ZmZpeCBmb3Igb3RoZXIgbG9jYWxlcy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlU3VmZml4RnJvbUZvcm1QYXRoKGZvcm1QYXRoLCByb290RGlyKSB7XG4gICAgaWYgKCFmb3JtUGF0aCB8fCAhcm9vdERpcikgcmV0dXJuIHsgc3VmZml4OiBudWxsIH07XG4gICAgdmFyIHIgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB2YXIgZnAgPSBTdHJpbmcoZm9ybVBhdGgpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xuICAgIHZhciBybCA9IHIudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgZmwgPSBmcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChmbCA9PT0gcmwpIHJldHVybiB7IHN1ZmZpeDogXCJcIiB9O1xuICAgIGlmIChmbC5pbmRleE9mKHJsICsgXCIvXCIpICE9PSAwKSByZXR1cm4geyBzdWZmaXg6IG51bGwgfTtcbiAgICB2YXIgcmVzdCA9IGZwLnNsaWNlKHIubGVuZ3RoKTtcbiAgICBpZiAocmVzdC5jaGFyQXQoMCkgPT09IFwiL1wiKSByZXN0ID0gcmVzdC5zbGljZSgxKTtcbiAgICB2YXIgcGFydHMgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHsgc3VmZml4OiBcIlwiIH07XG4gICAgdmFyIHN1ZmZpeFBhcnRzID0gcGFydHMuc2xpY2UoMSk7XG4gICAgaWYgKHN1ZmZpeFBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHsgc3VmZml4OiBcIlwiIH07XG4gICAgcmV0dXJuIHsgc3VmZml4OiBcIi9cIiArIHN1ZmZpeFBhcnRzLmpvaW4oXCIvXCIpIH07XG4gIH1cblxuICAvKiogRmlyc3QgcGF0aCBzZWdtZW50IHVuZGVyIHJvb3REaXIgKHRoZSBsb2NhbGUgZm9sZGVyKSwgbG93ZXJjYXNlZC4gKi9cbiAgZnVuY3Rpb24gZmlyc3RMb2NhbGVTZWdtZW50VW5kZXJSb290KHBhdGgsIHJvb3REaXIpIHtcbiAgICBpZiAoIXBhdGggfHwgIXJvb3REaXIpIHJldHVybiBcIlwiO1xuICAgIHZhciByID0gcm9vdERpci5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgdmFyIGZwID0gU3RyaW5nKHBhdGgpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xuICAgIHZhciBybCA9IHIudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgZmwgPSBmcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChmbCAhPT0gcmwgJiYgZmwuaW5kZXhPZihybCArIFwiL1wiKSAhPT0gMCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHJlc3QgPSBmbCA9PT0gcmwgPyBcIlwiIDogZnAuc2xpY2Uoci5sZW5ndGgpO1xuICAgIGlmIChyZXN0LmNoYXJBdCgwKSA9PT0gXCIvXCIpIHJlc3QgPSByZXN0LnNsaWNlKDEpO1xuICAgIHZhciBzZWcgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbilbMF0gfHwgXCJcIjtcbiAgICByZXR1cm4gU3RyaW5nKHNlZykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKiBMb2NhbGVzIHRoYXQgYWxyZWFkeSBoYXZlIGEgdHJhbnNsYXRpb24gaXRlbSAoZnJvbSByZXBvIHBhdGhzIHVuZGVyIHJvb3REaXIpLiAqL1xuICBmdW5jdGlvbiBleGlzdGluZ1RyYW5zbGF0aW9uTG9jYWxlS2V5cyhwYXRocywgcm9vdERpciwgZm9ybVBhdGgpIHtcbiAgICB2YXIga2V5cyA9IHt9O1xuICAgIGZ1bmN0aW9uIGFkZChwKSB7XG4gICAgICB2YXIgayA9IGZpcnN0TG9jYWxlU2VnbWVudFVuZGVyUm9vdChwLCByb290RGlyKTtcbiAgICAgIGlmIChrKSBrZXlzW2tdID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkKGZvcm1QYXRoKTtcbiAgICAocGF0aHMgfHwgW10pLmZvckVhY2goYWRkKTtcbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIC8qKiBTdHVkaW8gL2FwaS8xL2NvbnRlbnQvY29udGVudC1leGlzdHMg4oCUIHVud3JhcCBjb21tb24gcmVzcG9uc2Ugc2hhcGVzLiAqL1xuICBmdW5jdGlvbiBwYXJzZUNvbnRlbnRFeGlzdHNQYXlsb2FkKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHJldHVybiBmYWxzZTtcbiAgICB2YXIgYyA9IGJvZHkuY29udGVudDtcbiAgICBpZiAoYyA9PSBudWxsICYmIGJvZHkucmVzcG9uc2UpIGMgPSBib2R5LnJlc3BvbnNlLmNvbnRlbnQ7XG4gICAgaWYgKGMgPT0gbnVsbCAmJiBib2R5LnJlc3VsdCkgYyA9IGJvZHkucmVzdWx0LmNvbnRlbnQ7XG4gICAgaWYgKGMgPT0gbnVsbCkgYyA9IGJvZHkuZXhpc3RzO1xuICAgIGlmICh0eXBlb2YgYyA9PT0gXCJib29sZWFuXCIpIHJldHVybiBjO1xuICAgIGlmICh0eXBlb2YgYyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIFN0cmluZyhjKS50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIjtcbiAgICBpZiAodHlwZW9mIGMgPT09IFwibnVtYmVyXCIpIHJldHVybiBjICE9PSAwO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBBdXRob3JpbmcgYmFzZSBmb3IgL2FwaS8xL3NlcnZpY2VzL2FwaS8xL2NvbnRlbnQvLi4uIChwcmVmIHByb3AgbWF5IGJlIGVtcHR5IG9uIGZpcnN0IHBhaW50KS4gKi9cbiAgZnVuY3Rpb24gcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKHByZWYpIHtcbiAgICB2YXIgYSA9IHByZWYgJiYgU3RyaW5nKHByZWYpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAoYSkgcmV0dXJuIGE7XG4gICAgdHJ5IHtcbiAgICAgIGEgPSBnZXRBdXRob3JpbmdCYXNlKCkgJiYgU3RyaW5nKGdldEF1dGhvcmluZ0Jhc2UoKSkucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGEgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoYSkgcmV0dXJuIGE7XG4gICAgcmV0dXJuIChnZXRTdHVkaW9BcGlCYXNlKCkgfHwgXCJcIikucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXV0aG9yaW5nQmFzZSgpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGNtcyA9IHdpbmRvdy5jcmFmdGVyY21zO1xuICAgICAgaWYgKGNtcyAmJiB0eXBlb2YgY21zLmdldFN0b3JlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gY21zLmdldFN0b3JlKCk7XG4gICAgICAgIGlmIChzdG9yZSAmJiB0eXBlb2Ygc3RvcmUuZ2V0U3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHZhciBlbnYgPSBzdG9yZS5nZXRTdGF0ZSgpLmVudiB8fCB7fTtcbiAgICAgICAgICBpZiAoZW52LmF1dGhvcmluZ0Jhc2UpIHJldHVybiBlbnYuYXV0aG9yaW5nQmFzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICAvKiogU3R1ZGlvIFJFU1QgYmFzZSAoZS5nLiBodHRwczovL2hvc3Qvc3R1ZGlvKSBmb3IgL2FwaS8yLy4uLiAqL1xuICBmdW5jdGlvbiBnZXRTdHVkaW9BcGlCYXNlKCkge1xuICAgIHZhciBiID0gZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgIGlmIChiKSByZXR1cm4gYi5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgaWYgKHR5cGVvZiBDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dC5iYXNlVXJpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKENTdHVkaW9BdXRob3JpbmdDb250ZXh0LmJhc2VVcmkpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogU2FtZSB0cmFuc3BvcnQgYXMgVHJhbnNsYXRpb24gKGBhcHBzL3RyYW5zbGF0aW9uL2luZGV4LmpzYCk6IGBjcmFmdGVyY21zLnV0aWxzLmFqYXhgXG4gICAqIG1lcmdlcyBBdXRob3JpemF0aW9uIChKV1QpIGFuZCBvdGhlciBnbG9iYWwgaGVhZGVycyDigJQgcmF3IGBmZXRjaGAgZ2V0cyA0MDEgb24gYC9hcGkvMi8uLi5gLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0Q3JhZnRlclN0dWRpb0FqYXgoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjbXMgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5jcmFmdGVyY21zO1xuICAgICAgaWYgKGNtcyAmJiBjbXMudXRpbHMgJiYgY21zLnV0aWxzLmFqYXgpIHtcbiAgICAgICAgcmV0dXJuIGNtcy51dGlscy5hamF4O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZUZldGNoSGVhZGVycyhleHRyYSkge1xuICAgIHZhciBvdXQgPSBPYmplY3QuYXNzaWduKHt9LCBleHRyYSB8fCB7fSk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBhamF4ID0gZ2V0Q3JhZnRlclN0dWRpb0FqYXgoKTtcbiAgICAgIGlmIChhamF4ICYmIHR5cGVvZiBhamF4LmdldEdsb2JhbEhlYWRlcnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dCwgYWpheC5nZXRHbG9iYWxIZWFkZXJzKCkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdmFyIG0gPVxuICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvKD86Xnw7XFxzKilYU1JGLVRPS0VOPShbXjtdKykvKTtcbiAgICBpZiAobSAmJiAhb3V0W1wiWC1YU1JGLVRPS0VOXCJdKSB7XG4gICAgICB0cnkge1xuICAgICAgICBvdXRbXCJYLVhTUkYtVE9LRU5cIl0gPSBkZWNvZGVVUklDb21wb25lbnQobVsxXSk7XG4gICAgICB9IGNhdGNoIChlMikge31cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVud3JhcEFqYXhSZXNwb25zZShyZXMpIHtcbiAgICBpZiAoIXJlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyZXMucmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlcy5yZXNwb25zZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0dWRpb0FqYXhHZXQodXJsKSB7XG4gICAgdmFyIGFqYXggPSBnZXRDcmFmdGVyU3R1ZGlvQWpheCgpO1xuICAgIGlmIChhamF4ICYmIHR5cGVvZiBhamF4LmdldCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBhamF4LmdldCh1cmwpLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgIGhlYWRlcnM6IG1lcmdlRmV0Y2hIZWFkZXJzKHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmpzb24oKS50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogci5zdGF0dXMsIHJlc3BvbnNlOiBqc29uIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0gYm9keSBzdHJpbmcgb3Igb2JqZWN0IChvYmplY3QgaXMgSlNPTi5zdHJpbmdpZmllZCkgKi9cbiAgZnVuY3Rpb24gc3R1ZGlvQWpheFBvc3QodXJsLCBib2R5LCBoZWFkZXJzKSB7XG4gICAgdmFyIGFqYXggPSBnZXRDcmFmdGVyU3R1ZGlvQWpheCgpO1xuICAgIHZhciBwYXlsb2FkID1cbiAgICAgIGJvZHkgIT0gbnVsbCAmJiB0eXBlb2YgYm9keSA9PT0gXCJvYmplY3RcIiA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogYm9keSAhPSBudWxsID8gU3RyaW5nKGJvZHkpIDogXCJcIjtcbiAgICB2YXIgaCA9IE9iamVjdC5hc3NpZ24oeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH0sIGhlYWRlcnMgfHwge30pO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gXCJvYmplY3RcIiAmJiBib2R5ICE9IG51bGwgJiYgIWhbXCJDb250ZW50LVR5cGVcIl0pIHtcbiAgICAgIGhbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgICB9XG4gICAgaWYgKGFqYXggJiYgdHlwZW9mIGFqYXgucG9zdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBhamF4LnBvc3QodXJsLCBwYXlsb2FkLCBoKS5zdWJzY3JpYmUoe1xuICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgaGVhZGVyczogbWVyZ2VGZXRjaEhlYWRlcnMoaCksXG4gICAgICBib2R5OiBwYXlsb2FkXG4gICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuanNvbigpLnRoZW4oZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiByLnN0YXR1cywgcmVzcG9uc2U6IGpzb24gfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW53cmFwUGx1Z2luU2NyaXB0UmVzdWx0Qm9keShib2R5KSB7XG4gICAgdmFyIHAgPSBib2R5ICYmIGJvZHkucmVzdWx0ICE9PSB1bmRlZmluZWQgPyBib2R5LnJlc3VsdCA6IGJvZHk7XG4gICAgaWYgKHAgJiYgdHlwZW9mIHAgPT09IFwib2JqZWN0XCIgJiYgcC5yZXN1bHQgIT0gbnVsbCAmJiBwLm9rID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHAgPSBwLnJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHAgJiYgdHlwZW9mIHAgPT09IFwib2JqZWN0XCIgPyBwIDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZldGNoVHJhbnNsYXRpb25SZW1vdmVDYW5kaWRhdGVzKHN0dWRpb0Jhc2UsIHNpdGVJZCwgcGFnZVBhdGgpIHtcbiAgICB2YXIgdXJsID1cbiAgICAgIFN0cmluZyhzdHVkaW9CYXNlIHx8IFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tcmVtb3ZlLWNhbmRpZGF0ZXMucG9zdD9zaXRlSWQ9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCk7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KHVybCwgeyBwYWdlUGF0aDogcGFnZVBhdGggfSwgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICAgICAgLnRoZW4odW53cmFwQWpheFJlc3BvbnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIHAgPSB1bndyYXBQbHVnaW5TY3JpcHRSZXN1bHRCb2R5KGJvZHkpO1xuICAgICAgICByZXR1cm4gcCB8fCB7IG9rOiBmYWxzZSwgbWVzc2FnZTogXCJFbXB0eSByZXNwb25zZVwiLCBjYW5kaWRhdGVzOiBbXSB9O1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3N0VHJhbnNsYXRpb25SZW1vdmUoc3R1ZGlvQmFzZSwgc2l0ZUlkLCBwYWdlUGF0aCwgY29tcG9uZW50UGF0aHMsIGRlbGV0ZVBhZ2UpIHtcbiAgICB2YXIgdXJsID1cbiAgICAgIFN0cmluZyhzdHVkaW9CYXNlIHx8IFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tcmVtb3ZlLnBvc3Q/c2l0ZUlkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzaXRlSWQpO1xuICAgIHJldHVybiBzdHVkaW9BamF4UG9zdChcbiAgICAgIHVybCxcbiAgICAgIHtcbiAgICAgICAgcGFnZVBhdGg6IHBhZ2VQYXRoLFxuICAgICAgICBjb21wb25lbnRQYXRoczogY29tcG9uZW50UGF0aHMgfHwgW10sXG4gICAgICAgIGRlbGV0ZVBhZ2U6IGRlbGV0ZVBhZ2UgIT09IGZhbHNlXG4gICAgICB9LFxuICAgICAgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9XG4gICAgKVxuICAgICAgLnRoZW4odW53cmFwQWpheFJlc3BvbnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIHAgPSB1bndyYXBQbHVnaW5TY3JpcHRSZXN1bHRCb2R5KGJvZHkpO1xuICAgICAgICByZXR1cm4gcCB8fCB7IG9rOiBmYWxzZSwgZGVsZXRlZDogW10sIGZhaWxlZDogW3sgcGF0aDogXCJcIiwgbWVzc2FnZTogXCJFbXB0eSByZXNwb25zZVwiIH1dIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKiBQYWdlIGl0ZW1zIG9ubHkgKG5vdCBjb21wb25lbnRzIGZvbGRlcik6IHNob3cgUmVtb3ZlIHRyYW5zbGF0aW9uIGluc3RlYWQgb2Ygb25seSDii64gZm9yIG5vbi1zb3VyY2Ugcm93cy4gKi9cbiAgZnVuY3Rpb24gaXNQYWdlVHJhbnNsYXRpb25Sb3codGFyZ2V0UGF0aCwgY29udGVudFR5cGVJZCkge1xuICAgIHZhciBjdCA9IFN0cmluZyhjb250ZW50VHlwZUlkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoY3QuaW5kZXhPZihcIi9wYWdlL1wiKSA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgdmFyIHAgPSBub3JtYWxpemVTdHVkaW9QYXRoKHRhcmdldFBhdGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHAuaW5kZXhPZihcIi93ZWJzaXRlL1wiKSA+PSAwICYmIHAuZW5kc1dpdGgoXCIueG1sXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdFBhdGhzRnJvbVNlYXJjaEl0ZW1zKGl0ZW1zKSB7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGlmICghaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIG91dDtcbiAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgcCA9IGl0ZW0ucGF0aCB8fCBpdGVtLmxvY2FsSWQgfHwgKGl0ZW0uaXRlbSAmJiAoaXRlbS5pdGVtLnBhdGggfHwgaXRlbS5pdGVtLmxvY2FsSWQpKTtcbiAgICAgIGlmIChwICYmIG91dC5pbmRleE9mKHApID09PSAtMSkgb3V0LnB1c2gocCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHVkaW8gT3BlblNlYXJjaDogZmluZCBhbGwgaW5kZXhlZCBpdGVtcyBzaGFyaW5nIHRoZSBzYW1lIHRyYW5zbGF0aW9uIGxpbmVhZ2UgaWQuXG4gICAqL1xuICBmdW5jdGlvbiBleHRyYWN0UGF0aHNGcm9tUGx1Z2luUmVzdWx0KGJvZHkpIHtcbiAgICB2YXIgcGF5bG9hZCA9IGJvZHkgJiYgYm9keS5yZXN1bHQ7XG4gICAgaWYgKHBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCIgJiYgcGF5bG9hZC5yZXN1bHQgIT0gbnVsbCAmJiBwYXlsb2FkLm9rID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBheWxvYWQgPSBwYXlsb2FkLnJlc3VsdDtcbiAgICB9XG4gICAgaWYgKCFwYXlsb2FkIHx8IHR5cGVvZiBwYXlsb2FkICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICBwYXlsb2FkID0gYm9keSAmJiBib2R5LnJlc3BvbnNlICYmIGJvZHkucmVzcG9uc2UucmVzdWx0O1xuICAgIH1cbiAgICBpZiAoIXBheWxvYWQgfHwgIXBheWxvYWQub2spIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIGl0ZW1zID0gcGF5bG9hZC5pdGVtcyB8fCBbXTtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXQpIHtcbiAgICAgIHZhciBwID0gaXQgJiYgKGl0LmxvY2FsSWQgfHwgaXQucGF0aCk7XG4gICAgICBpZiAocCAmJiBvdXQuaW5kZXhPZihwKSA9PT0gLTEpIHtcbiAgICAgICAgb3V0LnB1c2gocCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2aWV3IE9wZW5TZWFyY2ggKHBsdWdpbiBHcm9vdnkpOiBzYW1lIGNvbnRlbnQtdHlwZSBhbmQgbG9jYWxlU291cmNlSWRfcyBtYXRjaGluZyBsaW5lYWdlIG9yIG9iamVjdElkLlxuICAgKi9cbiAgZnVuY3Rpb24gZmV0Y2hUcmFuc2xhdGlvblNpYmxpbmdzRnJvbVBsdWdpbihzdHVkaW9CYXNlLCBzaXRlSWQsIGNvbnRlbnRUeXBlLCBsb2NhbGVTb3VyY2VJZCwgb2JqZWN0SWQpIHtcbiAgICBpZiAoIXN0dWRpb0Jhc2UgfHwgIXNpdGVJZCB8fCAhY29udGVudFR5cGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH1cbiAgICB2YXIgbGlkID0gbG9jYWxlU291cmNlSWQgJiYgU3RyaW5nKGxvY2FsZVNvdXJjZUlkKS50cmltKCk7XG4gICAgdmFyIG9pZCA9IG9iamVjdElkICYmIFN0cmluZyhvYmplY3RJZCkudHJpbSgpO1xuICAgIGlmICghbGlkICYmICFvaWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH1cbiAgICB2YXIgdXJsID1cbiAgICAgIHN0dWRpb0Jhc2UgK1xuICAgICAgXCIvYXBpLzIvcGx1Z2luL3NjcmlwdC9wbHVnaW5zL29yZy9yZC9wbHVnaW4vdWlnb29kaWVzL3RyYW5zbGF0aW9uLXNpYmxpbmdzLnBvc3Q/c2l0ZUlkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzaXRlSWQpICtcbiAgICAgIFwiJmNvbnRlbnRUeXBlPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoY29udGVudFR5cGUpLnRyaW0oKSkgK1xuICAgICAgXCImbG9jYWxlU291cmNlSWQ9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGxpZCB8fCBcIlwiKSArXG4gICAgICBcIiZvYmplY3RJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQob2lkIHx8IFwiXCIpO1xuICAgIHJldHVybiBzdHVkaW9BamF4UG9zdCh1cmwsIFwiXCIsIHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICAgICAgLnRoZW4odW53cmFwQWpheFJlc3BvbnNlKVxuICAgICAgLnRoZW4oZXh0cmFjdFBhdGhzRnJvbVBsdWdpblJlc3VsdClcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbG9jYWxlU291cmNlSWQpIHtcbiAgICBpZiAoIXN0dWRpb0Jhc2UgfHwgIXNpdGVJZCB8fCAhbG9jYWxlU291cmNlSWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH1cbiAgICB2YXIgdXJsID1cbiAgICAgIHN0dWRpb0Jhc2UgKyBcIi9hcGkvMi9zZWFyY2gvc2VhcmNoLmpzb24/c2l0ZUlkPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCk7XG4gICAgZnVuY3Rpb24gcG9zdFNlYXJjaChib2R5KSB7XG4gICAgICByZXR1cm4gc3R1ZGlvQWpheFBvc3QodXJsLCBib2R5LCB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH0pLnRoZW4oXG4gICAgICAgIHVud3JhcEFqYXhSZXNwb25zZVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvc3RTZWFyY2goe1xuICAgICAga2V5d29yZHM6IFwiXCIsXG4gICAgICBvZmZzZXQ6IDAsXG4gICAgICBsaW1pdDogMjAwLFxuICAgICAgZmlsdGVyczoge1xuICAgICAgICBsb2NhbGVTb3VyY2VJZF9zOiBbU3RyaW5nKGxvY2FsZVNvdXJjZUlkKS50cmltKCldXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIHZhciBpdGVtcyA9IChib2R5LnJlc3BvbnNlICYmIGJvZHkucmVzcG9uc2UucmVzdWx0ICYmIGJvZHkucmVzcG9uc2UucmVzdWx0Lml0ZW1zKSB8fCBbXTtcbiAgICAgICAgdmFyIHBhdGhzID0gZXh0cmFjdFBhdGhzRnJvbVNlYXJjaEl0ZW1zKGl0ZW1zKTtcbiAgICAgICAgaWYgKHBhdGhzLmxlbmd0aCA+IDApIHJldHVybiBwYXRocztcbiAgICAgICAgcmV0dXJuIHBvc3RTZWFyY2goe1xuICAgICAgICAgIGtleXdvcmRzOiBTdHJpbmcobG9jYWxlU291cmNlSWQpLnRyaW0oKSxcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgbGltaXQ6IDIwMFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChib2R5Mikge1xuICAgICAgICAgIHZhciBpdGVtczIgPSAoYm9keTIucmVzcG9uc2UgJiYgYm9keTIucmVzcG9uc2UucmVzdWx0ICYmIGJvZHkyLnJlc3BvbnNlLnJlc3VsdC5pdGVtcykgfHwgW107XG4gICAgICAgICAgcmV0dXJuIGV4dHJhY3RQYXRoc0Zyb21TZWFyY2hJdGVtcyhpdGVtczIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsYWdGb3JMb2NhbGVDb2RlKGxvY2FsZUNvZGUpIHtcbiAgICB2YXIgayA9IFN0cmluZyhsb2NhbGVDb2RlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFrKSByZXR1cm4gXCJcXHVEODNDXFx1REYxMFwiO1xuICAgIHZhciBtYXAgPSB7XG4gICAgICBlbjogXCJcXHVEODNDXFx1RERGQVxcdUQ4M0NcXHVEREY4XCIsXG4gICAgICBcImVuLXVzXCI6IFwiXFx1RDgzQ1xcdURERkFcXHVEODNDXFx1RERGOFwiLFxuICAgICAgXCJlbi1nYlwiOiBcIlxcdUQ4M0NcXHVEREVDXFx1RDgzQ1xcdURERTdcIixcbiAgICAgIGVzOiBcIlxcdUQ4M0NcXHVEREVBXFx1RDgzQ1xcdURERjhcIixcbiAgICAgIFwiZXMtZXNcIjogXCJcXHVEODNDXFx1RERFQVxcdUQ4M0NcXHVEREY4XCIsXG4gICAgICBkZTogXCJcXHVEODNDXFx1RERFOVxcdUQ4M0NcXHVEREVBXCIsXG4gICAgICBcImRlLWRlXCI6IFwiXFx1RDgzQ1xcdURERTlcXHVEODNDXFx1RERFQVwiLFxuICAgICAgemg6IFwiXFx1RDgzQ1xcdURERThcXHVEODNDXFx1RERGM1wiLFxuICAgICAgY246IFwiXFx1RDgzQ1xcdURERThcXHVEODNDXFx1RERGM1wiLFxuICAgICAgXCJ6aC1jblwiOiBcIlxcdUQ4M0NcXHVEREU4XFx1RDgzQ1xcdURERjNcIixcbiAgICAgIFwiemgtdHdcIjogXCJcXHVEODNDXFx1RERGOVxcdUQ4M0NcXHVEREZDXCIsXG4gICAgICBqYTogXCJcXHVEODNDXFx1RERFRlxcdUQ4M0NcXHVEREY1XCIsXG4gICAgICBcImphLWpwXCI6IFwiXFx1RDgzQ1xcdURERUZcXHVEODNDXFx1RERGNVwiLFxuICAgICAgZnI6IFwiXFx1RDgzQ1xcdURERUJcXHVEODNDXFx1RERGN1wiLFxuICAgICAgXCJmci1mclwiOiBcIlxcdUQ4M0NcXHVEREVCXFx1RDgzQ1xcdURERjdcIixcbiAgICAgIGl0OiBcIlxcdUQ4M0NcXHVEREVFXFx1RDgzQ1xcdURERjlcIixcbiAgICAgIFwiaXQtaXRcIjogXCJcXHVEODNDXFx1RERFRVxcdUQ4M0NcXHVEREY5XCIsXG4gICAgICBwdDogXCJcXHVEODNDXFx1RERGNVxcdUQ4M0NcXHVEREY5XCIsXG4gICAgICBcInB0LXB0XCI6IFwiXFx1RDgzQ1xcdURERjVcXHVEODNDXFx1RERGOVwiLFxuICAgICAgXCJwdC1iclwiOiBcIlxcdUQ4M0NcXHVEREU3XFx1RDgzQ1xcdURERjdcIixcbiAgICAgIGtvOiBcIlxcdUQ4M0NcXHVEREYwXFx1RDgzQ1xcdURERjdcIixcbiAgICAgIFwia28ta3JcIjogXCJcXHVEODNDXFx1RERGMFxcdUQ4M0NcXHVEREY3XCIsXG4gICAgICBhcjogXCJcXHVEODNDXFx1RERGOFxcdUQ4M0NcXHVEREU2XCIsXG4gICAgICBcImFyLXNhXCI6IFwiXFx1RDgzQ1xcdURERjhcXHVEODNDXFx1RERFNlwiLFxuICAgICAgXCJhci1hZVwiOiBcIlxcdUQ4M0NcXHVEREU2XFx1RDgzQ1xcdURERUFcIixcbiAgICAgIFwiYXItZWdcIjogXCJcXHVEODNDXFx1RERFQVxcdUQ4M0NcXHVEREVDXCJcbiAgICB9O1xuICAgIHJldHVybiBtYXBba10gfHwgbWFwW2suc2xpY2UoMCwgMildIHx8IFwiXFx1RDgzQ1xcdURGMTBcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZldGNoVHJhbnNsYXRpb25Db25maWcoc3R1ZGlvQmFzZSwgc2l0ZUlkKSB7XG4gICAgaWYgKCFzdHVkaW9CYXNlIHx8ICFzaXRlSWQpIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgdmFyIHVybCA9XG4gICAgICBzdHVkaW9CYXNlICtcbiAgICAgIFwiL2FwaS8yL3BsdWdpbi9zY3JpcHQvcGx1Z2lucy9vcmcvcmQvcGx1Z2luL3VpZ29vZGllcy90cmFuc2xhdGlvbi1jb25maWcuZ2V0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheEdldCh1cmwpXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgcCA9IGJvZHkgJiYgYm9keS5yZXN1bHQgIT09IHVuZGVmaW5lZCA/IGJvZHkucmVzdWx0IDogYm9keTtcbiAgICAgICAgaWYgKCFwIHx8ICFwLm9rIHx8ICFBcnJheS5pc0FycmF5KHAubGFuZ3VhZ2VzKSB8fCBwLmxhbmd1YWdlcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgY29kZXMgPSBbXTtcbiAgICAgICAgdmFyIG1ldGEgPSB7fTtcbiAgICAgICAgcC5sYW5ndWFnZXMuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgdmFyIGxjID0gcm93ICYmIHJvdy5sb2NhbGUgPyBTdHJpbmcocm93LmxvY2FsZSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG4gICAgICAgICAgaWYgKCFsYykgcmV0dXJuO1xuICAgICAgICAgIGlmIChjb2Rlcy5pbmRleE9mKGxjKSA8IDApIGNvZGVzLnB1c2gobGMpO1xuICAgICAgICAgIG1ldGFbbGNdID0ge1xuICAgICAgICAgICAgbGFiZWw6IChyb3cgJiYgcm93LmxhYmVsKSB8fCBsYyxcbiAgICAgICAgICAgIGZsYWc6IHJvdyAmJiByb3cuZmxhZyAmJiBTdHJpbmcocm93LmZsYWcpLnRyaW0oKSA/IFN0cmluZyhyb3cuZmxhZykudHJpbSgpIDogZmxhZ0ZvckxvY2FsZUNvZGUobGMpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb2Rlcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgYmFzZVJhdyA9IHAuYmFzZUxhbmd1YWdlICE9IG51bGwgJiYgU3RyaW5nKHAuYmFzZUxhbmd1YWdlKS50cmltKCkgPyBTdHJpbmcocC5iYXNlTGFuZ3VhZ2UpLnRyaW0oKSA6IFwiXCI7XG4gICAgICAgIHZhciBiYXNlTG9jYWxlID0gYmFzZVJhdyA/IGJhc2VSYXcudG9Mb3dlckNhc2UoKSA6IGNvZGVzWzBdO1xuICAgICAgICBpZiAoY29kZXMuaW5kZXhPZihiYXNlTG9jYWxlKSA8IDApIHtcbiAgICAgICAgICBiYXNlTG9jYWxlID0gY29kZXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBiYXNlTG9jYWxlOiBiYXNlTG9jYWxlLFxuICAgICAgICAgIGNvZGVzOiBjb2RlcyxcbiAgICAgICAgICBtZXRhOiBtZXRhXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIHZhciBUUkFOU0xBVElPTlNfUEFHRV9TSVpFID0gNTtcblxuICBmdW5jdGlvbiBsb2NhbGVMYWJlbEZvclBhdGgocGF0aCkge1xuICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocGF0aCkgfHwgXCJ1bmtub3duXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG0gPSBMT0NBTEVfTUVUQVtsb2NdO1xuICAgIHJldHVybiBtICYmIG0ubGFiZWwgPyBtLmxhYmVsIDogbG9jO1xuICB9XG5cbiAgLyoqIFNvdXJjZSBsb2NhbGUgcm93KHMpIGZpcnN0OyByZW1haW5pbmcgcm93cyBmb2xsb3cgdHJhbnNsYXRpb24tY29uZmlnLnhtbCBvcmRlciB3aGVuIHByb3ZpZGVkLiAqL1xuICBmdW5jdGlvbiBzb3J0VHJhbnNsYXRpb25QYXRoc0ZvckRpc3BsYXkocGF0aHMsIHNvdXJjZUxvY2FsZUtleSwgb3JkZXJlZExvY2FsZUNvZGVzKSB7XG4gICAgdmFyIHNyYyA9IChzb3VyY2VMb2NhbGVLZXkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgb3JkZXIgPSBBcnJheS5pc0FycmF5KG9yZGVyZWRMb2NhbGVDb2RlcykgPyBvcmRlcmVkTG9jYWxlQ29kZXMgOiBbXTtcbiAgICB2YXIgb3JkZXJJbmRleCA9IHt9O1xuICAgIG9yZGVyLmZvckVhY2goZnVuY3Rpb24gKGNvZGUsIGkpIHtcbiAgICAgIHZhciBrID0gU3RyaW5nKGNvZGUgfHwgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL18vZywgXCItXCIpO1xuICAgICAgaWYgKGsgJiYgb3JkZXJJbmRleFtrXSA9PSBudWxsKSBvcmRlckluZGV4W2tdID0gaTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjb25maWdSYW5rKHBhdGgpIHtcbiAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocGF0aCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbiAgICAgIGlmICghbG9jKSByZXR1cm4gMTAwMDAwO1xuICAgICAgaWYgKG9yZGVySW5kZXhbbG9jXSAhPSBudWxsKSByZXR1cm4gb3JkZXJJbmRleFtsb2NdO1xuICAgICAgZm9yICh2YXIga2V5IGluIG9yZGVySW5kZXgpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3JkZXJJbmRleCwga2V5KSkgY29udGludWU7XG4gICAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobG9jLCBrZXkpKSByZXR1cm4gb3JkZXJJbmRleFtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDEwMDAwMCArIFN0cmluZyhsb2MpLmNoYXJDb2RlQXQoMCk7XG4gICAgfVxuICAgIHZhciBhcnIgPSBwYXRocy5zbGljZSgpO1xuICAgIGZ1bmN0aW9uIGlzU291cmNlUGF0aChwKSB7XG4gICAgICByZXR1cm4gISEoc3JjICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiLCBzcmMpKTtcbiAgICB9XG4gICAgYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHZhciBhcyA9IGlzU291cmNlUGF0aChhKTtcbiAgICAgIHZhciBicyA9IGlzU291cmNlUGF0aChiKTtcbiAgICAgIGlmIChhcyAmJiAhYnMpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKCFhcyAmJiBicykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciByYSA9IGNvbmZpZ1JhbmsoYSk7XG4gICAgICAgIHZhciByYiA9IGNvbmZpZ1JhbmsoYik7XG4gICAgICAgIGlmIChyYSAhPT0gcmIpIHtcbiAgICAgICAgICByZXR1cm4gcmEgLSByYjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxhID0gbG9jYWxlTGFiZWxGb3JQYXRoKGEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBsYiA9IGxvY2FsZUxhYmVsRm9yUGF0aChiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgY21wID0gbGEubG9jYWxlQ29tcGFyZShsYiwgdW5kZWZpbmVkLCB7IHNlbnNpdGl2aXR5OiBcImJhc2VcIiB9KTtcbiAgICAgICAgaWYgKGNtcCAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiBjbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcoYSkubG9jYWxlQ29tcGFyZShTdHJpbmcoYikpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJUcmFuc2xhdGlvblBhdGhzKHBhdGhzLCBxdWVyeSkge1xuICAgIHZhciBxID0gKHF1ZXJ5IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghcSkge1xuICAgICAgcmV0dXJuIHBhdGhzLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBwYXRocy5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBsYWJlbCA9IGxvY2FsZUxhYmVsRm9yUGF0aChwKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgU3RyaW5nKHApLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxKSA+PSAwIHx8XG4gICAgICAgIGxvYy5pbmRleE9mKHEpID49IDAgfHxcbiAgICAgICAgbGFiZWwuaW5kZXhPZihxKSA+PSAwXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGF0Y2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjbXMgPSB3aW5kb3cuY3JhZnRlcmNtcztcbiAgICAgIGlmIChjbXMgJiYgdHlwZW9mIGNtcy5nZXRTdG9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IGNtcy5nZXRTdG9yZSgpO1xuICAgICAgICBpZiAoc3RvcmUgJiYgdHlwZW9mIHN0b3JlLmRpc3BhdGNoID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzdG9yZS5kaXNwYXRjaC5iaW5kKHN0b3JlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudEV4aXN0cyhhdXRob3JpbmdCYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgYmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICBpZiAoIWJhc2UgfHwgIXNpdGVJZCB8fCAhcGF0aCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2NvbnRlbnQtZXhpc3RzLmpzb24/c2l0ZV9pZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheEdldCh1cmwpXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciBib2R5ID0gdW53cmFwQWpheFJlc3BvbnNlKHJlcyk7XG4gICAgICAgIHJldHVybiBwYXJzZUNvbnRlbnRFeGlzdHNQYXlsb2FkKGJvZHkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VUaW1lc3RhbXBNcyhpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICAgIHZhciBhc051bSA9IE51bWJlcihpbnB1dCk7XG4gICAgaWYgKGlzRmluaXRlKGFzTnVtKSAmJiBhc051bSA+IDApIHJldHVybiBhc051bTtcbiAgICB2YXIgcGFyc2VkID0gRGF0ZS5wYXJzZShTdHJpbmcoaW5wdXQpKTtcbiAgICByZXR1cm4gaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAoYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCBwYXRoKSB7XG4gICAgdmFyIGJhc2UgPSByZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSk7XG4gICAgaWYgKCFiYXNlIHx8ICFzaXRlSWQgfHwgIXBhdGgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2dldC1pdGVtcy10cmVlLmpzb24/c2l0ZT1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKSArXG4gICAgICBcIiZkZXB0aD0wXCI7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhHZXQodXJsKVxuICAgICAgLnRoZW4odW53cmFwQWpheFJlc3BvbnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBib2R5ICYmIGJvZHkuaXRlbTtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdE1vZGlmaWVkRGF0ZV9kdCkgfHxcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdE1vZGlmaWVkRGF0ZSkgfHxcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdEVkaXREYXRlKSB8fFxuICAgICAgICAgIHBhcnNlVGltZXN0YW1wTXMoaXRlbS5tb2RpZmllZERhdGUpIHx8XG4gICAgICAgICAgcGFyc2VUaW1lc3RhbXBNcyhpdGVtLmRhdGVNb2RpZmllZCkgfHxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIFVSTCBzaGFwZSBhcyBDcmFmdGVyIFN0dWRpbyBVSSB7QGNvZGUgZ2V0RWRpdEZvcm1TcmN9IChsZWdhY3kgZm9ybSBlbmdpbmUpLCByZWFkLW9ubHkgZm9yIHNvdXJjZSBjb21wYXJlIGlmcmFtZS5cbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3JhZnRlcmNtcy9zdHVkaW8tdWkvYmxvYi9kZXZlbG9wL3VpL2FwcC9zcmMvdXRpbHMvcGF0aC50c1xuICAgKi9cbiAgZnVuY3Rpb24gYnVpbGRMZWdhY3lSZWFkb25seUZvcm1TcmMoYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCBwYXRoKSB7XG4gICAgdmFyIGJhc2UgPSBTdHJpbmcoYXV0aG9yaW5nQmFzZSB8fCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAoIWJhc2UgfHwgIXNpdGVJZCB8fCAhcGF0aCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBiYXNlICtcbiAgICAgIFwiL2xlZ2FjeS9mb3JtP3NpdGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImcGF0aD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQocGF0aCkgK1xuICAgICAgXCImcmVhZG9ubHk9dHJ1ZVwiICtcbiAgICAgIFwiJmlzSGlkZGVuPWZhbHNlXCJcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIWRpc3BhdGNoIHx8IG1lc3NhZ2UgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiU0hPV19TWVNURU1fTk9USUZJQ0FUSU9OXCIsIHBheWxvYWQ6IHsgbWVzc2FnZTogU3RyaW5nKG1lc3NhZ2UpIH0gfSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIC8qKiBPcGVucyBTdHVkaW8gZm9ybSBlZGl0b3IgZm9yIGBwYXRoYCAoc2FtZSBwYXlsb2FkIGFzIFRyYW5zbGF0aW9uIFJlYWN0IGhlbHBlcnMpLiAqL1xuICBmdW5jdGlvbiBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgcGF0aCwgYXV0aG9yaW5nQmFzZUZvckRpYWxvZykge1xuICAgIGlmICghZGlzcGF0Y2ggfHwgIXNpdGVJZCB8fCAhcGF0aCkgcmV0dXJuO1xuICAgIHZhciBhYiA9IFN0cmluZyhhdXRob3JpbmdCYXNlRm9yRGlhbG9nIHx8IGdldEF1dGhvcmluZ0Jhc2UoKSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgaWYgKCFhYikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwiU0hPV19FRElUX0RJQUxPR1wiLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2l0ZTogc2l0ZUlkLFxuICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgYXV0aG9yaW5nQmFzZTogYWIsXG4gICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgICAgIG9uU2F2ZVN1Y2Nlc3M6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiQkFUQ0hfQUNUSU9OU1wiLFxuICAgICAgICAgICAgcGF5bG9hZDogW1xuICAgICAgICAgICAgICB7IHR5cGU6IFwiRElTUEFUQ0hfRE9NX0VWRU5UXCIsIHBheWxvYWQ6IHsgaWQ6IFwiZWRpdERpYWxvZ1N1Y2Nlc3NcIiB9IH0sXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJTSE9XX0VESVRfSVRFTV9TVUNDRVNTX05PVElGSUNBVElPTlwiIH0sXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJDTE9TRV9FRElUX0RJQUxPR1wiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2FuY2VsOiB7XG4gICAgICAgICAgICB0eXBlOiBcIkJBVENIX0FDVElPTlNcIixcbiAgICAgICAgICAgIHBheWxvYWQ6IFtcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkNMT1NFX0VESVRfRElBTE9HXCIgfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkRJU1BBVENIX0RPTV9FVkVOVFwiLCBwYXlsb2FkOiB7IGlkOiBcImVkaXREaWFsb2dEaXNtaXNzZWRcIiB9IH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICAvKipcbiAgICogQ29weSBzb3VyY2UgZm9yIFRyYW5zbGF0aW9uIHRyYW5zbGF0ZTogcGx1Z2luLWNvbmZpZyBiYXNlIGxhbmd1YWdlIHBhdGggd2hlbiBsYXlvdXQgc3VwcG9ydHMgaXQsXG4gICAqIGVsc2UgbGVnYWN5IHNvdXJjZSBsb2NhbGUgZnJvbSBjb250ZW50IHRyZWUgcGF0aHMgLyBjdXJyZW50IGZvcm0uXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlVHJhbnNsYXRlQ29weVNvdXJjZVBhdGgodHJhbnNsYXRpb25DZmcsIHJvb3REaXIsIHN1ZmZpeCwgdHJhbnNsYXRpb25QYXRocywgZm9ybVBhdGgsIHJlc29sdmVkU291cmNlS2V5KSB7XG4gICAgaWYgKHRyYW5zbGF0aW9uQ2ZnICYmIHRyYW5zbGF0aW9uQ2ZnLmJhc2VMb2NhbGUgJiYgcm9vdERpciAhPSBudWxsICYmIHN1ZmZpeCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBTdHJpbmcodHJhbnNsYXRpb25DZmcuYmFzZUxvY2FsZSkudG9Mb3dlckNhc2UoKSwgc3VmZml4KTtcbiAgICB9XG4gICAgdmFyIGZyb21Tb3VyY2VMb2NhbGUgPVxuICAgICAgKHRyYW5zbGF0aW9uUGF0aHMgfHwgW10pLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgfSkgfHwgZm9ybVBhdGg7XG4gICAgcmV0dXJuIGZyb21Tb3VyY2VMb2NhbGUgfHwgZm9ybVBhdGg7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weShwKSB7XG4gICAgdmFyIGkgPSBwLmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICBpZiAoaSA8PSAwKSByZXR1cm4gXCIvXCI7XG4gICAgcmV0dXJuIHAuc2xpY2UoMCwgaSkgfHwgXCIvXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkZXRlY3RMb2NhbGVGb2xkZXJOYW1lc0ZvclNpdGUoY2hpbGRQYXRocywgcm9vdERpciwgbG9jYWxlQ29kZXMpIHtcbiAgICB2YXIgcHJlZml4ID0gcm9vdERpci5lbmRzV2l0aChcIi9cIikgPyByb290RGlyIDogcm9vdERpciArIFwiL1wiO1xuICAgIHZhciBsb2NhbGVTZXQgPSB7fTtcbiAgICB2YXIgY29kZXMgPSBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGggPyBsb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIChjaGlsZFBhdGhzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICBpZiAoIXAgfHwgcC5pbmRleE9mKHByZWZpeCkgIT09IDApIHJldHVybjtcbiAgICAgIHZhciByZXN0ID0gcC5zbGljZShwcmVmaXgubGVuZ3RoKTtcbiAgICAgIHZhciBzZWcgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbilbMF07XG4gICAgICB2YXIgbWF0Y2hlZCA9XG4gICAgICAgIHNlZyAmJlxuICAgICAgICBjb2Rlcy5zb21lKGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShzZWcsIGNvZGUpO1xuICAgICAgICB9KTtcbiAgICAgIGlmIChtYXRjaGVkICYmICFzZWVuW3NlZy50b0xvd2VyQ2FzZSgpXSkge1xuICAgICAgICBzZWVuW3NlZy50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICAgIG5hbWVzLnB1c2goc2VnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmFtZXM7XG4gIH1cblxuICBmdW5jdGlvbiBpc011bHRpTG9jYWxlRm9sZGVyU2V0KG5hbWVzLCBiYXNlTG9jYWxlKSB7XG4gICAgaWYgKCFuYW1lcyB8fCBuYW1lcy5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFiYXNlTG9jYWxlIHx8ICFTdHJpbmcoYmFzZUxvY2FsZSkudHJpbSgpKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgYmFzZSA9IFN0cmluZyhiYXNlTG9jYWxlKS50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKG5hbWVzW2ldLCBiYXNlKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBtdWx0aS1sb2NhbGUgaXMgY29uZmlybWVkIGZyb20gZXhpc3RpbmcgZm9sZGVycywgbGlzdCBldmVyeSBNVUxUSV9MT0NBTEVfQ09ERVMgdGFyZ2V0XG4gICAqICh1c2UgcmVwbyBmb2xkZXIgY2FzaW5nIHdoZW4gcHJlc2VudCwgZWxzZSB0aGUgY29kZSBlLmcuIGphIHNvIEphcGFuZXNlIGFwcGVhcnMgYmVmb3JlIC9qYSBleGlzdHMpLlxuICAgKi9cbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBmcm9tVHJhbnNsYXRpb25Db25maWc/OiBib29sZWFuIH19IFtvcHRzXVxuICAgKiAgIFdoZW4gZnJvbVRyYW5zbGF0aW9uQ29uZmlnIGFuZCB0cmFuc2xhdGlvbi1jb25maWcueG1sIGxpc3RzIDIrIGxvY2FsZXMsIHJldHVybiBvcmRlcmVkIGNvZGVzXG4gICAqICAgZXZlbiBpZiBmZXdlciB0aGFuIHR3byBsb2NhbGUgZm9sZGVycyBleGlzdCBvbiBkaXNrIHlldCAoYXV0aG9ycyBjYW4gdHJhbnNsYXRlIGludG8gbWlzc2luZyB0cmVlcykuXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlTG9jYWxlRm9sZGVyc09yZGVyZWRGcm9tUGF0aHMoY2hpbGRQYXRocywgcm9vdERpciwgbG9jYWxlQ29kZXMsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgZnJvbVRyYW5zbGF0aW9uQ29uZmlnID0gISFvcHRzLmZyb21UcmFuc2xhdGlvbkNvbmZpZztcbiAgICB2YXIgYWN0aXZlQ29kZXMgPSBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGggPyBsb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgbmFtZXMgPSBkZXRlY3RMb2NhbGVGb2xkZXJOYW1lc0ZvclNpdGUoY2hpbGRQYXRocywgcm9vdERpciwgYWN0aXZlQ29kZXMpO1xuICAgIGlmICghaXNNdWx0aUxvY2FsZUZvbGRlclNldChuYW1lcykpIHtcbiAgICAgIGlmICghZnJvbVRyYW5zbGF0aW9uQ29uZmlnIHx8IGFjdGl2ZUNvZGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBvcmRlcmVkID0gW107XG4gICAgYWN0aXZlQ29kZXMuZm9yRWFjaChmdW5jdGlvbiAoY29kZSkge1xuICAgICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShuYW1lc1tpXSwgY29kZSkpIHtcbiAgICAgICAgICBtYXRjaCA9IG5hbWVzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZnJvbVRyYW5zbGF0aW9uQ29uZmlnKSB7XG4gICAgICAgIG9yZGVyZWQucHVzaChtYXRjaCB8fCBjb2RlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFyIGFscmVhZHkgPSBvcmRlcmVkLnNvbWUoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG8pLnRvTG93ZXJDYXNlKCkgPT09IFN0cmluZyhtYXRjaCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYWxyZWFkeSkgb3JkZXJlZC5wdXNoKG1hdGNoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICB2YXIgaW5PcmRlcmVkID0gb3JkZXJlZC5zb21lKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobiwgbyk7XG4gICAgICB9KTtcbiAgICAgIGlmICghaW5PcmRlcmVkKSBvcmRlcmVkLnB1c2gobik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9yZGVyZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGlsZHJlblBhdGhzVHJlZShiYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgdXJsID1cbiAgICAgIGJhc2UgK1xuICAgICAgXCIvYXBpLzEvc2VydmljZXMvYXBpLzEvY29udGVudC9nZXQtaXRlbXMtdHJlZS5qc29uP3NpdGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImcGF0aD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQocGF0aCkgK1xuICAgICAgXCImZGVwdGg9MVwiO1xuICAgIHJldHVybiBzdHVkaW9BamF4R2V0KHVybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdmFyIGJvZHkgPSB1bndyYXBBamF4UmVzcG9uc2UocmVzKTtcbiAgICAgICAgdmFyIHJhdyA9IGJvZHkgJiYgYm9keS5pdGVtICYmIGJvZHkuaXRlbS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIHJhd1xuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2ggJiYgY2gucGF0aCAmJiBjaC5wYXRoICE9PSBwYXRoO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBjaC5wYXRoO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29weUl0ZW1QYXN0ZVN0dWRpbyhiYXNlLCBzaXRlSWQsIHNvdXJjZVBhdGgsIHRhcmdldFBhcmVudFBhdGgsIGV4cGVjdGVkVGFyZ2V0UGF0aCkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKGJhc2UpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tY29weS5wb3N0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICB2YXIgYm9keSA9IHtcbiAgICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGgsXG4gICAgICB0YXJnZXRQYXJlbnRQYXRoOiB0YXJnZXRQYXJlbnRQYXRoLFxuICAgICAgZXhwZWN0ZWRUYXJnZXRQYXRoOiBleHBlY3RlZFRhcmdldFBhdGggfHwgXCJcIlxuICAgIH07XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KHVybCwgYm9keSwgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB2YXIgYm9keSA9IHVud3JhcEFqYXhSZXNwb25zZShyZXMpO1xuICAgICAgICByZXR1cm4gYm9keSAmJiBib2R5LnJlc3VsdCAhPT0gdW5kZWZpbmVkID8gYm9keS5yZXN1bHQgOiBib2R5O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRHJvcGRvd246IGxvY2FsZXMgc3RpbGwgbWlzc2luZyB0aGlzIGl0ZW07IGNvcHkgdXNlcyB0aGUgc2FtZSBwYXRoIHVuZGVyIHRoZSBjaG9zZW4gbG9jYWxlIGZvbGRlci5cbiAgICovXG4gIC8qKiBAcGFyYW0gcHJvcHMub25UcmFuc2xhdGVkIG9wdGlvbmFsIOKAlCBjYWxsZWQgYWZ0ZXIgYSBzdWNjZXNzZnVsIHBhc3RlIHRvIHJlZmV0Y2ggdGhlIHRyYW5zbGF0aW9ucyBsaXN0IGFib3ZlLiAqL1xuICAvKiogQHBhcmFtIHByb3BzLnRyYW5zbGF0aW9uQ2ZnIG9wdGlvbmFsIOKAlCBmcm9tIHBhbmVsIHN0YXRlIHdoZW4gR0VUIGZhaWxzLiAqL1xuICAvKiogQHBhcmFtIHByb3BzLmV4aXN0aW5nUGF0aHMgdHJhbnNsYXRpb24gc2libGluZyBwYXRocyArIGN1cnJlbnQgZm9ybSBwYXRoIGNvdW50cyBhcyBleGlzdGluZyBjb250ZW50LiAqL1xuICAvKiogQHBhcmFtIHByb3BzLnRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIHJlcG8gcGF0aCB0byBjb3B5IGZyb20gKGJhc2UgbGFuZ3VhZ2UpOyBmYWxscyBiYWNrIHRvIGZvcm1QYXRoIGlmIG9taXR0ZWQuICovXG4gIGZ1bmN0aW9uIEFkZFRyYW5zbGF0aW9uTG9jYWxlQmFyKHByb3BzKSB7XG4gICAgdmFyIGZvcm1QYXRoID0gcHJvcHMuZm9ybVBhdGg7XG4gICAgdmFyIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoID0gcHJvcHMudHJhbnNsYXRlQ29weVNvdXJjZVBhdGggfHwgZm9ybVBhdGg7XG4gICAgdmFyIHNpdGVJZCA9IHByb3BzLnNpdGVJZDtcbiAgICB2YXIgZGlzcGF0Y2ggPSBwcm9wcy5kaXNwYXRjaDtcbiAgICB2YXIgYXV0aG9yaW5nQmFzZSA9IHByb3BzLmF1dGhvcmluZ0Jhc2UgfHwgXCJcIjtcbiAgICB2YXIgcm9vdERpciA9IHByb3BzLnJvb3REaXI7XG4gICAgdmFyIHN1ZmZpeCA9IHByb3BzLnN1ZmZpeDtcbiAgICB2YXIgZXhpc3RpbmdQYXRocyA9IHByb3BzLmV4aXN0aW5nUGF0aHMgfHwgW107XG4gICAgdmFyIG9uVHJhbnNsYXRlZCA9IHByb3BzLm9uVHJhbnNsYXRlZDtcbiAgICB2YXIgdHJhbnNsYXRpb25DZmdQcm9wID0gcHJvcHMudHJhbnNsYXRpb25DZmc7XG4gICAgdmFyIGxvY2FsZUNvZGVzID0gcHJvcHMubG9jYWxlQ29kZXMgJiYgcHJvcHMubG9jYWxlQ29kZXMubGVuZ3RoID8gcHJvcHMubG9jYWxlQ29kZXMgOiBNVUxUSV9MT0NBTEVfQ09ERVM7XG4gICAgdmFyIGxvY2FsZU1ldGEgPSBwcm9wcy5sb2NhbGVNZXRhIHx8IExPQ0FMRV9NRVRBO1xuXG4gICAgdmFyIG9wdFN0ID0gUmVhY3QudXNlU3RhdGUoW10pO1xuICAgIHZhciBvcHRpb25zID0gb3B0U3RbMF07XG4gICAgdmFyIHNldE9wdGlvbnMgPSBvcHRTdFsxXTtcbiAgICB2YXIgc2VsU3QgPSBSZWFjdC51c2VTdGF0ZShcIlwiKTtcbiAgICB2YXIgc2VsZWN0ZWQgPSBzZWxTdFswXTtcbiAgICB2YXIgc2V0U2VsZWN0ZWQgPSBzZWxTdFsxXTtcbiAgICB2YXIgbG9hZFN0ID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIHZhciBsb2FkaW5nID0gbG9hZFN0WzBdO1xuICAgIHZhciBzZXRMb2FkaW5nID0gbG9hZFN0WzFdO1xuICAgIHZhciBidXN5U3QgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgdmFyIGNvcHlCdXN5ID0gYnVzeVN0WzBdO1xuICAgIHZhciBzZXRDb3B5QnVzeSA9IGJ1c3lTdFsxXTtcbiAgICB2YXIgZm9jdXNTZWxTdCA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICB2YXIgc2VsZWN0Rm9jdXNlZCA9IGZvY3VzU2VsU3RbMF07XG4gICAgdmFyIHNldFNlbGVjdEZvY3VzZWQgPSBmb2N1c1NlbFN0WzFdO1xuXG4gICAgLyoqIFN1cHBvcnRlZCBsb2NhbGVzIGZyb20gY29uZmlnIG1pbnVzIGxvY2FsZXMgYWxyZWFkeSBwcmVzZW50IGluIGZvcm1QYXRoICsgdHJhbnNsYXRpb25QYXRocyAobm8gY29udGVudC1leGlzdHMpLiAqL1xuICAgIHZhciBsb2FkVGFyZ2V0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWZvcm1QYXRoIHx8ICFzaXRlSWQgfHwgIXJvb3REaXIpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVmZlN1ZmZpeCA9IHN1ZmZpeDtcbiAgICAgICAgaWYgKGVmZlN1ZmZpeCA9PSBudWxsKSB7XG4gICAgICAgICAgZWZmU3VmZml4ID0gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpLnN1ZmZpeDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWZmU3VmZml4ID09IG51bGwpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdmFyIHN0dWRpb0Jhc2UgPSBnZXRTdHVkaW9BcGlCYXNlKCk7XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5Q29kZXMoYWN0aXZlTWV0YSwgcmF3Q29kZXMpIHtcbiAgICAgICAgICB2YXIgc2VlbiA9IHt9O1xuICAgICAgICAgIHZhciBhY3RpdmVDb2RlcyA9IFtdO1xuICAgICAgICAgIChyYXdDb2RlcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgdmFyIHMgPSBTdHJpbmcoYyB8fCBcIlwiKS50cmltKCk7XG4gICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBrID0gcy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlZW5ba10pIHJldHVybjtcbiAgICAgICAgICAgIHNlZW5ba10gPSB0cnVlO1xuICAgICAgICAgICAgYWN0aXZlQ29kZXMucHVzaChzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIWFjdGl2ZUNvZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB0cmFuc2xhdGVkTG9jYWxlcyA9IGV4aXN0aW5nVHJhbnNsYXRpb25Mb2NhbGVLZXlzKGV4aXN0aW5nUGF0aHMsIHJvb3REaXIsIGZvcm1QYXRoKTtcbiAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgYWN0aXZlQ29kZXMuZm9yRWFjaChmdW5jdGlvbiAobG9jKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRpb25Mb2NhbGVBbHJlYWR5UHJlc2VudCh0cmFuc2xhdGVkTG9jYWxlcywgbG9jKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRhcmdldFBhdGggPSBwYXRoRm9yVGFyZ2V0TG9jYWxlKHJvb3REaXIsIGxvYywgZWZmU3VmZml4KTtcbiAgICAgICAgICAgIHZhciBtZXRhID0gbWV0YUZvclBhdGhMb2NhbGUoYWN0aXZlTWV0YSwgbG9jKSB8fCB7XG4gICAgICAgICAgICAgIGxhYmVsOiBsb2MsXG4gICAgICAgICAgICAgIGZsYWc6IGZsYWdGb3JMb2NhbGVDb2RlKGxvYylcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvdXQucHVzaCh7XG4gICAgICAgICAgICAgIGxvY2FsZTogbG9jLFxuICAgICAgICAgICAgICBsYWJlbDogbWV0YS5sYWJlbCxcbiAgICAgICAgICAgICAgZmxhZzogbWV0YS5mbGFnIHx8IFwiXFx1RDgzQ1xcdURGMTBcIixcbiAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgZXhpc3RzOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0T3B0aW9ucyhvdXQpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2hUcmFuc2xhdGlvbkNvbmZpZyhzdHVkaW9CYXNlLCBzaXRlSWQpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGZldGNoZWQpIHtcbiAgICAgICAgICAgIHZhciByYXdDb2RlcyA9XG4gICAgICAgICAgICAgIGZldGNoZWQgJiYgZmV0Y2hlZC5jb2RlcyAmJiBmZXRjaGVkLmNvZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gZmV0Y2hlZC5jb2Rlc1xuICAgICAgICAgICAgICAgIDogdHJhbnNsYXRpb25DZmdQcm9wICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2RlcyAmJiB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICA/IHRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2Rlc1xuICAgICAgICAgICAgICAgICAgOiBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyBsb2NhbGVDb2Rlc1xuICAgICAgICAgICAgICAgICAgICA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICAgICAgICAgIHZhciBhY3RpdmVNZXRhID1cbiAgICAgICAgICAgICAgKGZldGNoZWQgJiYgZmV0Y2hlZC5tZXRhKSB8fFxuICAgICAgICAgICAgICAodHJhbnNsYXRpb25DZmdQcm9wICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5tZXRhKSB8fFxuICAgICAgICAgICAgICBsb2NhbGVNZXRhO1xuICAgICAgICAgICAgcmV0dXJuIGFwcGx5Q29kZXMoYWN0aXZlTWV0YSwgcmF3Q29kZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByYXdDb2RlcyA9XG4gICAgICAgICAgICAgIHRyYW5zbGF0aW9uQ2ZnUHJvcCAmJiB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXMgJiYgdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzXG4gICAgICAgICAgICAgICAgOiBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgID8gbG9jYWxlQ29kZXNcbiAgICAgICAgICAgICAgICAgIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgICAgICAgICAgdmFyIGFjdGl2ZU1ldGEgPSAodHJhbnNsYXRpb25DZmdQcm9wICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5tZXRhKSB8fCBsb2NhbGVNZXRhO1xuICAgICAgICAgICAgcmV0dXJuIGFwcGx5Q29kZXMoYWN0aXZlTWV0YSwgcmF3Q29kZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgW2Zvcm1QYXRoLCBzaXRlSWQsIHJvb3REaXIsIHN1ZmZpeCwgZXhpc3RpbmdQYXRocywgbG9jYWxlQ29kZXMsIGxvY2FsZU1ldGEsIHRyYW5zbGF0aW9uQ2ZnUHJvcF1cbiAgICApO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2FkVGFyZ2V0cygpO1xuICAgICAgfSxcbiAgICAgIFtsb2FkVGFyZ2V0c11cbiAgICApO1xuXG4gICAgdmFyIHJ1blRyYW5zbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoIHx8ICFmb3JtUGF0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNob2ljZSA9IG51bGw7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnNbaV0ubG9jYWxlID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgIGNob2ljZSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghY2hvaWNlKSByZXR1cm47XG4gICAgICBpZiAoY2hvaWNlLmV4aXN0cykge1xuICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJBIHRyYW5zbGF0aW9uIGFscmVhZHkgZXhpc3RzIGF0IFwiICsgY2hvaWNlLnRhcmdldFBhdGgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRDb3B5QnVzeSh0cnVlKTtcbiAgICAgIHZhciBwYXJlbnQgPSBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weShjaG9pY2UudGFyZ2V0UGF0aCk7XG4gICAgICB2YXIgY29udGVudEFwaUJhc2UgPSByZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSk7XG4gICAgICByZXR1cm4gY29weUl0ZW1QYXN0ZVN0dWRpbyhjb250ZW50QXBpQmFzZSwgc2l0ZUlkLCB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCwgcGFyZW50LCBjaG9pY2UudGFyZ2V0UGF0aClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKFxuICAgICAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAgICAgKHJlcyAmJiByZXMubWVzc2FnZSkgfHwgXCJUcmFuc2xhdGUgZmFpbGVkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2V0Q29weUJ1c3koZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJUcmFuc2xhdGVkIHRvIFwiICsgY2hvaWNlLmxhYmVsICsgXCI6IFwiICsgY2hvaWNlLnRhcmdldFBhdGgpO1xuICAgICAgICAgIHNldFNlbGVjdGVkKFwiXCIpO1xuICAgICAgICAgIG9wZW5TdHVkaW9FZGl0Rm9ybShkaXNwYXRjaCwgc2l0ZUlkLCBjaG9pY2UudGFyZ2V0UGF0aCwgYXV0aG9yaW5nQmFzZSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBvblRyYW5zbGF0ZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgb25UcmFuc2xhdGVkKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlMSkge31cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGxvYWRUYXJnZXRzKCkuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRDb3B5QnVzeShmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIFwiVHJhbnNsYXRlIGZhaWxlZC5cIik7XG4gICAgICAgICAgc2V0Q29weUJ1c3koZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGVmZmVjdGl2ZU1pcnJvcmVkU3VmZml4ID1cbiAgICAgIHN1ZmZpeCAhPSBudWxsID8gc3VmZml4IDogcm9vdERpciAmJiBmb3JtUGF0aCA/IHBhcnNlU3VmZml4RnJvbUZvcm1QYXRoKGZvcm1QYXRoLCByb290RGlyKS5zdWZmaXggOiBudWxsO1xuXG4gICAgdmFyIGhpbnQgPSBcIlwiO1xuICAgIGlmICghZGlzcGF0Y2gpIGhpbnQgPSBcIlN0dWRpbyBhY3Rpb25zIHJlcXVpcmUgYW4gYWN0aXZlIHNlc3Npb24uXCI7XG4gICAgZWxzZSBpZiAoIWZvcm1QYXRoIHx8ICFzaXRlSWQpIGhpbnQgPSBcIk1pc3NpbmcgcGF0aCBvciBzaXRlLlwiO1xuICAgIGVsc2UgaWYgKCFyb290RGlyIHx8IGVmZmVjdGl2ZU1pcnJvcmVkU3VmZml4ID09IG51bGwpXG4gICAgICBoaW50ID0gXCJQYXRoIGxheW91dCBkb2VzIG5vdCBzdXBwb3J0IG1pcnJvcmVkIGxvY2FsZSBjb3B5IGZvciB0aGlzIGl0ZW0uXCI7XG4gICAgZWxzZSBpZiAoIXJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKSlcbiAgICAgIGhpbnQgPSBcIkxvYWRpbmcgYXV0aG9yaW5nIGNvbnRleHRcXHUyMDI2XCI7XG4gICAgZWxzZSBpZiAoIWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPT09IDApXG4gICAgICBoaW50ID0gXCJBbGwgY29uZmlndXJlZCBsb2NhbGVzIGFscmVhZHkgaGF2ZSBhIHRyYW5zbGF0aW9uIGF0IHRoaXMgcGF0aC5cIjtcblxuICAgIHZhciBzZWxlY3REaXNhYmxlZCA9XG4gICAgICBsb2FkaW5nIHx8XG4gICAgICBjb3B5QnVzeSB8fFxuICAgICAgb3B0aW9ucy5sZW5ndGggPT09IDAgfHxcbiAgICAgICFkaXNwYXRjaCB8fFxuICAgICAgIXJvb3REaXIgfHxcbiAgICAgIGVmZmVjdGl2ZU1pcnJvcmVkU3VmZml4ID09IG51bGwgfHxcbiAgICAgICFyZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSk7XG5cbiAgICB2YXIgc2VsZWN0U3R5bGUgPSB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgbWluSGVpZ2h0OiBcIjQycHhcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgXCIgKyAoc2VsZWN0Rm9jdXNlZCAmJiAhc2VsZWN0RGlzYWJsZWQgPyBcInZhcigtLXR2LXNlbGVjdC1mb2N1cylcIiA6IFwidmFyKC0tdHYtYm9yZGVyLWlucHV0KVwiKSxcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICBwYWRkaW5nOiBcIjEwcHggMTRweFwiLFxuICAgICAgcGFkZGluZ1JpZ2h0OiBcIjQ0cHhcIixcbiAgICAgIGZvbnRTaXplOiBcIjE0cHhcIixcbiAgICAgIGxpbmVIZWlnaHQ6IDEuNDUsXG4gICAgICBjb2xvcjogXCJ2YXIoLS10di1pbnB1dC10ZXh0KVwiLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxlY3REaXNhYmxlZCA/IFwidmFyKC0tdHYtaW5wdXQtYmctZGlzYWJsZWQpXCIgOiBcInZhcigtLXR2LWlucHV0LWJnKVwiLFxuICAgICAgYm94U2hhZG93OlxuICAgICAgICBzZWxlY3RGb2N1c2VkICYmICFzZWxlY3REaXNhYmxlZFxuICAgICAgICAgID8gXCIwIDAgMCAzcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuMilcIlxuICAgICAgICAgIDogXCJ2YXIoLS10di1pbnB1dC1pbnNldClcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgY3Vyc29yOiBzZWxlY3REaXNhYmxlZCA/IFwibm90LWFsbG93ZWRcIiA6IFwicG9pbnRlclwiLFxuICAgICAgb3BhY2l0eTogc2VsZWN0RGlzYWJsZWQgPyAwLjg4IDogMSxcbiAgICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgV2Via2l0QXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBNb3pBcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ2YXIoLS10di1zZWxlY3QtY2hldnJvbilcIixcbiAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IFwicmlnaHQgMTJweCBjZW50ZXJcIixcbiAgICAgIGJhY2tncm91bmRTaXplOiBcIjIwcHggMjBweFwiLFxuICAgICAgdHJhbnNpdGlvbjogXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlXCJcbiAgICB9O1xuXG4gICAgdmFyIGFjdGlvbnNSb3dTdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBwYWRkaW5nOiBcIjE0cHggMTZweFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtYWN0aW9ucy1ib3JkZXIpXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LWFjdGlvbnMtYmcpXCIsXG4gICAgICBib3hTaGFkb3c6IFwidmFyKC0tdHYtc2hhZG93KVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuICAgIH07XG5cbiAgICB2YXIgc2VsZWN0V3JhcFN0eWxlID0ge1xuICAgICAgZmxleDogXCIxIDEgMjIwcHhcIixcbiAgICAgIG1pbldpZHRoOiBcIjIwMHB4XCIsXG4gICAgICBtYXhXaWR0aDogXCIxMDAlXCJcbiAgICB9O1xuXG4gICAgdmFyIGJ0bkljb25TdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgIHdpZHRoOiBcIjQycHhcIixcbiAgICAgIGhlaWdodDogXCI0MnB4XCIsXG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyLWlucHV0KVwiLFxuICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1idG4taWNvbi1iZylcIixcbiAgICAgIGNvbG9yOiBcInZhcigtLXR2LWJ0bi1pY29uLWZnKVwiLFxuICAgICAgY3Vyc29yOiBjb3B5QnVzeSB8fCBsb2FkaW5nID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICBmb250U2l6ZTogXCIyMHB4XCIsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgZmxleFNocmluazogMCxcbiAgICAgIGJveFNoYWRvdzogXCJ2YXIoLS10di1zaGFkb3ctY2hpcClcIixcbiAgICAgIHRyYW5zaXRpb246IFwiYmFja2dyb3VuZCAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZVwiXG4gICAgfTtcblxuICAgIHZhciBidG5QcmltYXJ5U3R5bGUgPSB7XG4gICAgICBwYWRkaW5nOiBcIjExcHggMjBweFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCIjOTRhM2I4XCIgOiBcIiMyNTYzZWJcIixcbiAgICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgIGZvbnRTaXplOiBcIjEzcHhcIixcbiAgICAgIGxldHRlclNwYWNpbmc6IFwiMC4wMmVtXCIsXG4gICAgICBjdXJzb3I6IGNvcHlCdXN5IHx8ICFzZWxlY3RlZCB8fCAhZGlzcGF0Y2ggPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICBib3hTaGFkb3c6XG4gICAgICAgIGNvcHlCdXN5IHx8ICFzZWxlY3RlZCB8fCAhZGlzcGF0Y2ggPyBcIm5vbmVcIiA6IFwiMCAxcHggMnB4IHJnYmEoMzcsIDk5LCAyMzUsIDAuMzUpXCIsXG4gICAgICB0cmFuc2l0aW9uOiBcImJhY2tncm91bmQgMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdHlsZTogeyB3aWR0aDogXCIxMDAlXCIsIG1hcmdpblRvcDogXCI4cHhcIiB9IH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogXCJ2YXIoLS10di10ZXh0KVwiLCBtYXJnaW5Cb3R0b206IFwiOHB4XCIgfSB9LFxuICAgICAgICBcIlRyYW5zbGF0ZVwiXG4gICAgICApLFxuICAgICAgaGludFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsIGxpbmVIZWlnaHQ6IDEuNDUgfSB9LFxuICAgICAgICAgICAgaGludFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdHlsZTogYWN0aW9uc1Jvd1N0eWxlIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0eWxlOiBzZWxlY3RXcmFwU3R5bGUgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJzZWxlY3RcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHNlbGVjdFN0eWxlLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogc2VsZWN0RGlzYWJsZWQsXG4gICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbkZvY3VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0Rm9jdXNlZCh0cnVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb25CbHVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0Rm9jdXNlZChmYWxzZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIlRhcmdldCBsb2NhbGUgZm9yIHRyYW5zbGF0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcIm9wdGlvblwiLFxuICAgICAgICAgICAgICB7IHZhbHVlOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGxvYWRpbmcgPyBcIkxvYWRpbmdcXHUyMDI2XCIgOiBvcHRpb25zLmxlbmd0aCA9PT0gMCA/IFwiXFx1MjAxNFwiIDogXCJDaG9vc2UgbG9jYWxlXFx1MjAyNlwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb3B0aW9ucy5tYXAoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJvcHRpb25cIixcbiAgICAgICAgICAgICAgICB7IGtleTogby5sb2NhbGUsIHZhbHVlOiBvLmxvY2FsZSB9LFxuICAgICAgICAgICAgICAgIG8uZmxhZyArIFwiIFwiICsgby5sYWJlbCArIFwiIChcIiArIG8ubG9jYWxlICsgXCIpXCJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGRpc2FibGVkOiBjb3B5QnVzeSB8fCBsb2FkaW5nLFxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBsb2FkVGFyZ2V0cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiBcIlJlbG9hZCBsb2NhbGUgbGlzdFwiLFxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGxvYWRpbmcgPyBcIkxvYWRpbmcgbG9jYWxlc1wiIDogXCJSZWxvYWQgbG9jYWxlIGxpc3RcIixcbiAgICAgICAgICAgIHN0eWxlOiBidG5JY29uU3R5bGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxvYWRpbmcgPyBTcGlubmVyRWwoeyBzaXplOiAxNiwgbGFiZWw6IFwiTG9hZGluZyBsb2NhbGVzXCIgfSkgOiBcIlxcdTIxQkJcIlxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGRpc2FibGVkOiBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoLFxuICAgICAgICAgICAgc3R5bGU6IGJ0blByaW1hcnlTdHlsZSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcnVuVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb3B5QnVzeSA/IEJ1c3lMYWJlbChcIlRyYW5zbGF0aW5nXFx1MjAyNlwiLCB7IGxpZ2h0OiB0cnVlLCBzaXplOiAxNCB9KSA6IFwiVHJhbnNsYXRlXCJcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICB2YXIgUElMTF9TVFlMRVMgPSB7XG4gICAgYmFzZToge1xuICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgIGZvbnRTaXplOiBcIjEwcHhcIixcbiAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgIGxldHRlclNwYWNpbmc6IFwiMC4wNGVtXCIsXG4gICAgICB0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiLFxuICAgICAgcGFkZGluZzogXCIycHggOHB4XCIsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiOTk5cHhcIixcbiAgICAgIGxpbmVIZWlnaHQ6IDEuM1xuICAgIH0sXG4gICAgc291cmNlOiB7XG4gICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LXBpbGwtc291cmNlLWJnKVwiLFxuICAgICAgY29sb3I6IFwidmFyKC0tdHYtcGlsbC1zb3VyY2UtZmcpXCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LXBpbGwtc291cmNlLWJkKVwiXG4gICAgfSxcbiAgICBjdXJyZW50OiB7XG4gICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LXBpbGwtY3VycmVudC1iZylcIixcbiAgICAgIGNvbG9yOiBcInZhcigtLXR2LXBpbGwtY3VycmVudC1mZylcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtcGlsbC1jdXJyZW50LWJkKVwiXG4gICAgfVxuICB9O1xuXG4gIHZhciBST1dfU1VSRkFDRSA9IHtcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGdhcDogXCIxMHB4XCIsXG4gICAgcGFkZGluZzogXCI2cHggMTBweFwiLFxuICAgIGJvcmRlclJhZGl1czogXCI2cHhcIixcbiAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LWJvcmRlci1yb3cpXCIsXG4gICAgbWFyZ2luQm90dG9tOiBcIjZweFwiLFxuICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtcGFwZXIpXCJcbiAgfTtcblxuICB2YXIgTUVOVV9UUklHR0VSX1NUWUxFID0ge1xuICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtZWxldmF0ZWQpXCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCB2YXIoLS10di1ib3JkZXItcm93KVwiLFxuICAgIGJvcmRlclJhZGl1czogXCI0cHhcIixcbiAgICBwYWRkaW5nOiBcIjRweCA4cHhcIixcbiAgICBtaW5XaWR0aDogXCIzMnB4XCIsXG4gICAgZm9udFNpemU6IFwiMTZweFwiLFxuICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgY29sb3I6IFwidmFyKC0tdHYtdGV4dC1tdXRlZClcIixcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiXG4gIH07XG5cbiAgLyoqIFN0dWRpbyBJdGVtTWVnYU1lbnUgaWdub3JlcyBpbmNsdWRlT25seTsgd2hpdGVsaXN0IHZpc2libGUgbGFiZWxzIGFmdGVyIG9wZW4uICovXG4gIHZhciBUUkFOU0xBVElPTl9JVEVNX01FTlVfTEFCRUxTID0ge1xuICAgIGVkaXQ6IDEsXG4gICAgdmlldzogMSxcbiAgICBcInZpZXcgZm9ybVwiOiAxLFxuICAgIGhpc3Rvcnk6IDEsXG4gICAgZGVwZW5kZW5jaWVzOiAxLFxuICAgIHB1Ymxpc2g6IDEsXG4gICAgXCJyZXF1ZXN0IHB1Ymxpc2hcIjogMSxcbiAgICBhcHByb3ZlOiAxLFxuICAgIHByZXZpZXc6IDFcbiAgfTtcblxuICBmdW5jdGlvbiBub3JtYWxpemVNZWdhTWVudUxhYmVsKHRleHQpIHtcbiAgICByZXR1cm4gU3RyaW5nKHRleHQgfHwgXCJcIilcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0FsbG93ZWRNZWdhTWVudUxhYmVsKHRleHQsIGhpZGVFZGl0KSB7XG4gICAgdmFyIHR4dCA9IG5vcm1hbGl6ZU1lZ2FNZW51TGFiZWwodGV4dCk7XG4gICAgaWYgKCF0eHQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaGlkZUVkaXQgJiYgKHR4dCA9PT0gXCJlZGl0XCIgfHwgdHh0LmluZGV4T2YoXCJlZGl0IFwiKSA9PT0gMCkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoVFJBTlNMQVRJT05fSVRFTV9NRU5VX0xBQkVMU1t0eHRdKSByZXR1cm4gdHJ1ZTtcbiAgICBmb3IgKHZhciBrZXkgaW4gVFJBTlNMQVRJT05fSVRFTV9NRU5VX0xBQkVMUykge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoVFJBTlNMQVRJT05fSVRFTV9NRU5VX0xBQkVMUywga2V5KSkgY29udGludWU7XG4gICAgICBpZiAodHh0ID09PSBrZXkgfHwgdHh0LmluZGV4T2Yoa2V5ICsgXCIgXCIpID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHZhciBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVtyb2xlPSdtZW51aXRlbSddLCAuTXVpTWVudUl0ZW0tcm9vdFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbiA9IG5vZGVzW2ldO1xuICAgICAgdmFyIHR4dCA9IG4udGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgIGlmICghaXNBbGxvd2VkTWVnYU1lbnVMYWJlbCh0eHQsIGhpZGVFZGl0KSkge1xuICAgICAgICBuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY2hlZHVsZUVuZm9yY2VBbGxvd2VkSXRlbXNJbk1lZ2FNZW51KGhpZGVFZGl0KSB7XG4gICAgZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCk7XG4gICAgfSwgMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBlbmZvcmNlQWxsb3dlZEl0ZW1zSW5PcGVuTWVnYU1lbnUoaGlkZUVkaXQpO1xuICAgIH0sIDYwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCk7XG4gICAgfSwgMTYwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFRyYW5zbGF0aW9uVmVyc2lvblJvdyhwcm9wcykge1xuICAgIHZhciBtZXRhID0gcHJvcHMubWV0YTtcbiAgICB2YXIgaXNTb3VyY2UgPSBwcm9wcy5pc1NvdXJjZTtcbiAgICB2YXIgZXhpc3RzID0gcHJvcHMuZXhpc3RzICE9PSBmYWxzZTtcbiAgICB2YXIgdGFyZ2V0UGF0aCA9IHByb3BzLnRhcmdldFBhdGg7XG4gICAgdmFyIGRpc3BhdGNoID0gcHJvcHMuZGlzcGF0Y2g7XG4gICAgdmFyIGlzT3V0ZGF0ZWQgPSAhIXByb3BzLmlzT3V0ZGF0ZWQ7XG4gICAgdmFyIG9uVHJhbnNsYXRlID0gcHJvcHMub25UcmFuc2xhdGU7XG4gICAgdmFyIHRyYW5zbGF0ZUJ1c3kgPSAhIXByb3BzLnRyYW5zbGF0ZUJ1c3k7XG4gICAgdmFyIHNob3dSZW1vdmVUcmFuc2xhdGlvbiA9ICEhcHJvcHMuc2hvd1JlbW92ZVRyYW5zbGF0aW9uO1xuICAgIHZhciBvblJlbW92ZVRyYW5zbGF0aW9uID0gcHJvcHMub25SZW1vdmVUcmFuc2xhdGlvbjtcbiAgICB2YXIgZm9ybVBhdGggPSBwcm9wcy5mb3JtUGF0aCB8fCBcIlwiO1xuICAgIHZhciBpc0N1cnJlbnRSb3cgPSBmb3JtUGF0aCAmJiB0YXJnZXRQYXRoICYmIG5vcm1hbGl6ZVN0dWRpb1BhdGgoZm9ybVBhdGgpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKHRhcmdldFBhdGgpO1xuICAgIHZhciBpc0NvbXBhcmVTZWxlY3RlZCA9ICEhcHJvcHMuaXNDb21wYXJlU2VsZWN0ZWQ7XG4gICAgdmFyIHJvd0NsaWNrYWJsZSA9ICEhaXNTb3VyY2UgJiYgIWlzQ3VycmVudFJvdyAmJiBleGlzdHM7XG4gICAgdmFyIHJvd1N0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgUk9XX1NVUkZBQ0UpO1xuICAgIGlmIChpc0NvbXBhcmVTZWxlY3RlZCkge1xuICAgICAgcm93U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCByb3dTdHlsZSwge1xuICAgICAgICBib3JkZXJDb2xvcjogXCJ2YXIoLS10di1zZWxlY3QtZm9jdXMpXCIsXG4gICAgICAgIGJveFNoYWRvdzogXCIwIDAgMCAxcHggcmdiYSgzNywgOTksIDIzNSwgMC40NSkgaW5zZXRcIixcbiAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1jb21wYXJlLXNlbGVjdGVkLWJnKVwiXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHJvd0NsaWNrYWJsZSkge1xuICAgICAgcm93U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCByb3dTdHlsZSwgeyBjdXJzb3I6IFwicG9pbnRlclwiIH0pO1xuICAgIH1cbiAgICB2YXIgc2hvd1N0dWRpb0l0ZW1NZWdhTWVudSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYgKCFkaXNwYXRjaCB8fCAhdGFyZ2V0UGF0aCkgcmV0dXJuO1xuICAgICAgdmFyIHRvcCA9IHR5cGVvZiBldmVudC5jbGllbnRZID09PSBcIm51bWJlclwiID8gZXZlbnQuY2xpZW50WSA6IDA7XG4gICAgICB2YXIgbGVmdCA9IHR5cGVvZiBldmVudC5jbGllbnRYID09PSBcIm51bWJlclwiID8gZXZlbnQuY2xpZW50WCA6IDA7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwiU0hPV19JVEVNX01FR0FfTUVOVVwiLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgcGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICBhbmNob3JSZWZlcmVuY2U6IFwiYW5jaG9yUG9zaXRpb25cIixcbiAgICAgICAgICBhbmNob3JQb3NpdGlvbjogeyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2NoZWR1bGVFbmZvcmNlQWxsb3dlZEl0ZW1zSW5NZWdhTWVudShpc0N1cnJlbnRSb3cpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJ0cmFuc2xhdGlvbi12ZXJzaW9ucy1yb3dcIixcbiAgICAgICAgc3R5bGU6IHJvd1N0eWxlLFxuICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwcm9wcy5vbkFjdGl2YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHByb3BzLm9uQWN0aXZhdGUoe1xuICAgICAgICAgICAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICBpc1NvdXJjZTogISFpc1NvdXJjZSxcbiAgICAgICAgICAgICAgaXNDdXJyZW50Um93OiAhIWlzQ3VycmVudFJvd1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByb2xlOiByb3dDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkLFxuICAgICAgICB0YWJJbmRleDogcm93Q2xpY2thYmxlID8gMCA6IHVuZGVmaW5lZCxcbiAgICAgICAgb25LZXlEb3duOiByb3dDbGlja2FibGVcbiAgICAgICAgICA/IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIgfHwgZXYua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wcy5vbkFjdGl2YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIHByb3BzLm9uQWN0aXZhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICAgICAgICBpc1NvdXJjZTogISFpc1NvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50Um93OiAhIWlzQ3VycmVudFJvd1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHRpdGxlOiByb3dDbGlja2FibGUgPyBcIlNob3cgc291cmNlIGZpZWxkcyAocmVhZC1vbmx5KSBuZXh0IHRvIHRoaXMgZm9ybVwiIDogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMS4xNXJlbVwiLCBsaW5lSGVpZ2h0OiAxIH0sIFwiYXJpYS1oaWRkZW5cIjogdHJ1ZSB9LFxuICAgICAgICBtZXRhLmZsYWdcbiAgICAgICksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcInNwYW5cIixcbiAgICAgICAgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIG1pbldpZHRoOiBcIjcycHhcIiwgZm9udFNpemU6IFwiMTNweFwiLCBjb2xvcjogXCJ2YXIoLS10di10ZXh0KVwiIH0gfSxcbiAgICAgICAgbWV0YS5sYWJlbFxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGZsZXg6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzU291cmNlXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgUElMTF9TVFlMRVMuYmFzZSwgUElMTF9TVFlMRVMuc291cmNlKSB9LFxuICAgICAgICAgICAgICBcIlNvdXJjZVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBpc091dGRhdGVkXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgUElMTF9TVFlMRVMuYmFzZSwgeyBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LXBpbGwtb3V0ZGF0ZWQtYmcpXCIsIGNvbG9yOiBcInZhcigtLXR2LXBpbGwtb3V0ZGF0ZWQtZmcpXCIsIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtcGlsbC1vdXRkYXRlZC1iZClcIiB9KSwgdGl0bGU6IFwiT3V0ZGF0ZWQgdHJhbnNsYXRpb25cIiB9LFxuICAgICAgICAgICAgICBcIlxcdUQ4M0RcXHVERUE5IE91dGRhdGVkXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG51bGwsXG4gICAgICAgIGlzQ3VycmVudFJvd1xuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIFBJTExfU1RZTEVTLmJhc2UsIFBJTExfU1RZTEVTLmN1cnJlbnQpLCB0aXRsZTogXCJUaGlzIGlzIHRoZSBpdGVtIHlvdSBoYXZlIG9wZW4gaW4gdGhlIGZvcm1cIiB9LFxuICAgICAgICAgICAgICBcIkN1cnJlbnRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3R5bGU6IHsgbWFyZ2luTGVmdDogXCJhdXRvXCIsIGZsZXhTaHJpbms6IDAsIGRpc3BsYXk6IFwiZmxleFwiLCBnYXA6IFwiNnB4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfSB9LFxuICAgICAgICBleGlzdHNcbiAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIiwgZ2FwOiBcIjZweFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0gfSxcbiAgICAgICAgICAgICAgc2hvd1JlbW92ZVRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXYgJiYgZXYuc3RvcFByb3BhZ2F0aW9uKSBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25SZW1vdmVUcmFuc2xhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlVHJhbnNsYXRpb24odGFyZ2V0UGF0aCwgbWV0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogXCJSZW1vdmUgdHJhbnNsYXRpb24gZm9yIFwiICsgbWV0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVtb3ZlIHRoaXMgdHJhbnNsYXRlZCBwYWdlIChvcHRpb25hbCBzaGFyZWQgY29tcG9uZW50cyB3aXRoIG5vIG90aGVyIHBhZ2UgcmVmZXJlbmNlcylcIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJSZW1vdmVcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1zbVwiLFxuICAgICAgICAgICAgICAgICAgb25DbGljazogc2hvd1N0dWRpb0l0ZW1NZWdhTWVudSxcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiAoaXNDdXJyZW50Um93ID8gXCJPcHRpb25zIChlZGl0aW5nIHRoaXMgaXRlbSDigJQgRWRpdCBoaWRkZW4pIFwiIDogXCJPcHRpb25zIGZvciBcIikgKyBtZXRhLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGlzQ3VycmVudFJvdyA/IFwiT3BlbiBpdGVtIG1lbnUgKEVkaXQgaXMgaGlkZGVuIHdoaWxlIHRoaXMgZm9ybSBpcyBvcGVuIGZvciB0aGlzIHBhdGgpXCIgOiBcIkl0ZW0gYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IE1FTlVfVFJJR0dFUl9TVFlMRVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJcXHUyMkVFXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4teHNcIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJhbnNsYXRlQnVzeSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChldiAmJiBldi5zdG9wUHJvcGFnYXRpb24pIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZUJ1c3kpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25UcmFuc2xhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBvblRyYW5zbGF0ZSh0YXJnZXRQYXRoLCBtZXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0cmFuc2xhdGVCdXN5ID8gXCJUcmFuc2xhdGluZyB0byBcIiArIG1ldGEubGFiZWwgOiBcIlRyYW5zbGF0ZSB0byBcIiArIG1ldGEubGFiZWwsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHsgd2hpdGVTcGFjZTogXCJub3dyYXBcIiwgbWluV2lkdGg6IFwiODhweFwiIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlQnVzeSA/IEJ1c3lMYWJlbChcIlRyYW5zbGF0aW5nXFx1MjAyNlwiLCB7IGxpZ2h0OiB0cnVlLCBzaXplOiAxMiB9KSA6IFwiVHJhbnNsYXRlXCJcbiAgICAgICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gVHJhbnNsYXRpb25WZXJzaW9uc1BhbmVsKHByb3BzKSB7XG4gICAgdmFyIGZvcm1QYXRoID0gcHJvcHMuZm9ybVBhdGg7XG4gICAgdmFyIHNpdGVJZCA9IHByb3BzLnNpdGVJZDtcbiAgICB2YXIgbW9kZWwgPSBwcm9wcy5tb2RlbCB8fCB7fTtcbiAgICB2YXIgZm9ybSA9IHByb3BzLmZvcm07XG4gICAgdmFyIGNvbnRyb2xDb250YWluZXJFbCA9IHByb3BzLmNvbnRyb2xDb250YWluZXJFbDtcbiAgICB2YXIgcmVzb2x2ZWRDb250ZW50VHlwZUlkID0gU3RyaW5nKFxuICAgICAgcHJvcHMuY29udGVudFR5cGVJZCB8fCBtb2RlbFtcImNvbnRlbnQtdHlwZVwiXSB8fCBtb2RlbC5jb250ZW50VHlwZSB8fCBcIlwiXG4gICAgKS50cmltKCk7XG5cbiAgICB2YXIgc291cmNlTG9jYWxlID0gKG1vZGVsLnNvdXJjZUxvY2FsZUNvZGVfcyAmJiBTdHJpbmcobW9kZWwuc291cmNlTG9jYWxlQ29kZV9zKS50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgXCJcIjtcbiAgICB2YXIgbW9kZWxMb2NhbGUgPSAobW9kZWwubG9jYWxlQ29kZV9zICYmIFN0cmluZyhtb2RlbC5sb2NhbGVDb2RlX3MpLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSB8fCBcIlwiO1xuICAgIHZhciBwYXRoTG9jYWxlID0gZ2V0TG9jYWxlRnJvbVBhdGgoZm9ybVBhdGgpIHx8IFwiXCI7XG5cbiAgICAvLyBTb3VyY2UgaW5kaWNhdG9yIGlzIGRhdGEtZHJpdmVuIG9ubHkgZnJvbSBYTUwgc291cmNlTG9jYWxlQ29kZV9zLlxuICAgIC8vIElmIG1pc3NpbmcsIGRvIG5vdCBtYXJrIGFueSByb3cgYXMgc291cmNlLlxuICAgIHZhciByZXNvbHZlZFNvdXJjZSA9IHNvdXJjZUxvY2FsZTtcbiAgICB2YXIgcmVzb2x2ZWRTb3VyY2VLZXkgPSBTdHJpbmcocmVzb2x2ZWRTb3VyY2UgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcblxuICAgIHZhciByb290RGlyID0gZ2V0TXVsdGlMb2NhbGVSb290RGlyKGZvcm1QYXRoKTtcblxuICAgIHZhciBhdXRob3JpbmdCYXNlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShcIlwiKTtcbiAgICB2YXIgYXV0aG9yaW5nQmFzZSA9IGF1dGhvcmluZ0Jhc2VTdGF0ZVswXTtcbiAgICB2YXIgc2V0QXV0aG9yaW5nQmFzZSA9IGF1dGhvcmluZ0Jhc2VTdGF0ZVsxXTtcblxuICAgIHZhciBwYXRoc1N0YXRlID0gUmVhY3QudXNlU3RhdGUoW10pO1xuICAgIHZhciB0cmFuc2xhdGlvblBhdGhzID0gcGF0aHNTdGF0ZVswXTtcbiAgICB2YXIgc2V0VHJhbnNsYXRpb25QYXRocyA9IHBhdGhzU3RhdGVbMV07XG5cbiAgICB2YXIgbG9hZGluZ1N0YXRlID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gICAgdmFyIGxvYWRpbmcgPSBsb2FkaW5nU3RhdGVbMF07XG4gICAgdmFyIHNldExvYWRpbmcgPSBsb2FkaW5nU3RhdGVbMV07XG5cbiAgICB2YXIgZmlsdGVyU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShcIlwiKTtcbiAgICB2YXIgZmlsdGVyUXVlcnkgPSBmaWx0ZXJTdGF0ZVswXTtcbiAgICB2YXIgc2V0RmlsdGVyUXVlcnkgPSBmaWx0ZXJTdGF0ZVsxXTtcbiAgICB2YXIgcGFnZVN0YXRlID0gUmVhY3QudXNlU3RhdGUoMCk7XG4gICAgdmFyIHBhZ2VJbmRleCA9IHBhZ2VTdGF0ZVswXTtcbiAgICB2YXIgc2V0UGFnZUluZGV4ID0gcGFnZVN0YXRlWzFdO1xuXG4gICAgdmFyIGxpc3RSZWZyZXNoU3QgPSBSZWFjdC51c2VTdGF0ZSgwKTtcbiAgICB2YXIgdHJhbnNsYXRpb25MaXN0UmVmcmVzaEtleSA9IGxpc3RSZWZyZXNoU3RbMF07XG4gICAgdmFyIGJ1bXBUcmFuc2xhdGlvbkxpc3QgPSBsaXN0UmVmcmVzaFN0WzFdO1xuICAgIHZhciB0cmFuc2xhdGlvbkNmZ1N0ID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgdmFyIHRyYW5zbGF0aW9uQ2ZnID0gdHJhbnNsYXRpb25DZmdTdFswXTtcbiAgICB2YXIgc2V0VHJhbnNsYXRpb25DZmcgPSB0cmFuc2xhdGlvbkNmZ1N0WzFdO1xuXG4gICAgdmFyIHN0YWxlQnlQYXRoU3QgPSBSZWFjdC51c2VTdGF0ZSh7fSk7XG4gICAgdmFyIHN0YWxlQnlQYXRoID0gc3RhbGVCeVBhdGhTdFswXTtcbiAgICB2YXIgc2V0U3RhbGVCeVBhdGggPSBzdGFsZUJ5UGF0aFN0WzFdO1xuICAgIHZhciBleGlzdHNCeVBhdGhTdCA9IFJlYWN0LnVzZVN0YXRlKHt9KTtcbiAgICB2YXIgZXhpc3RzQnlQYXRoID0gZXhpc3RzQnlQYXRoU3RbMF07XG4gICAgdmFyIHNldEV4aXN0c0J5UGF0aCA9IGV4aXN0c0J5UGF0aFN0WzFdO1xuXG4gICAgdmFyIGNvbXBhcmVQYXRoU3QgPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgICB2YXIgY29tcGFyZVNvdXJjZVBhdGggPSBjb21wYXJlUGF0aFN0WzBdO1xuICAgIHZhciBzZXRDb21wYXJlU291cmNlUGF0aCA9IGNvbXBhcmVQYXRoU3RbMV07XG5cbiAgICB2YXIgcmVtb3ZlTW9kYWxTdCA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIHZhciByZW1vdmVNb2RhbCA9IHJlbW92ZU1vZGFsU3RbMF07XG4gICAgdmFyIHNldFJlbW92ZU1vZGFsID0gcmVtb3ZlTW9kYWxTdFsxXTtcblxuICAgIHZhciByb3dUcmFuc2xhdGVCdXN5U3QgPSBSZWFjdC51c2VTdGF0ZShcIlwiKTtcbiAgICB2YXIgcm93VHJhbnNsYXRlQnVzeVBhdGggPSByb3dUcmFuc2xhdGVCdXN5U3RbMF07XG4gICAgdmFyIHNldFJvd1RyYW5zbGF0ZUJ1c3lQYXRoID0gcm93VHJhbnNsYXRlQnVzeVN0WzFdO1xuXG4gICAgdmFyIGNvbGxhcHNlZFN0ID0gUmVhY3QudXNlU3RhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlYWRUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZChzaXRlSWQpO1xuICAgIH0pO1xuICAgIHZhciB3aWRnZXRDb2xsYXBzZWQgPSBjb2xsYXBzZWRTdFswXTtcbiAgICB2YXIgc2V0V2lkZ2V0Q29sbGFwc2VkID0gY29sbGFwc2VkU3RbMV07XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFdpZGdldENvbGxhcHNlZChyZWFkVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQoc2l0ZUlkKSk7XG4gICAgICB9LFxuICAgICAgW3NpdGVJZF1cbiAgICApO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBvblN0b3JhZ2UoZSkge1xuICAgICAgICAgIGlmICghZSB8fCBlLmtleSAhPT0gdHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZVN0b3JhZ2VLZXkoc2l0ZUlkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmV4dENvbGxhcHNlZCA9IGUubmV3VmFsdWUgPT09IFwiMVwiO1xuICAgICAgICAgIHNldFdpZGdldENvbGxhcHNlZChuZXh0Q29sbGFwc2VkKTtcbiAgICAgICAgICBpZiAobmV4dENvbGxhcHNlZCkge1xuICAgICAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uQ3VzdG9tKGUpIHtcbiAgICAgICAgICB2YXIgZGV0YWlsID0gZSAmJiBlLmRldGFpbDtcbiAgICAgICAgICBpZiAoIWRldGFpbCB8fCBTdHJpbmcoZGV0YWlsLnNpdGVJZCB8fCBcIlwiKSAhPT0gU3RyaW5nKHNpdGVJZCB8fCBcIlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmV4dENvbGxhcHNlZCA9ICEhZGV0YWlsLmNvbGxhcHNlZDtcbiAgICAgICAgICBzZXRXaWRnZXRDb2xsYXBzZWQobmV4dENvbGxhcHNlZCk7XG4gICAgICAgICAgaWYgKG5leHRDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHNldENvbXBhcmVTb3VyY2VQYXRoKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgb25TdG9yYWdlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0VWRU5ULCBvbkN1c3RvbSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdG9yYWdlXCIsIG9uU3RvcmFnZSk7XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0VWRU5ULCBvbkN1c3RvbSk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgW3NpdGVJZF1cbiAgICApO1xuXG4gICAgdmFyIHRvZ2dsZVdpZGdldENvbGxhcHNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFdpZGdldENvbGxhcHNlZChmdW5jdGlvbiAocHJldikge1xuICAgICAgICB2YXIgbmV4dCA9ICFwcmV2O1xuICAgICAgICB3cml0ZVRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VkKHNpdGVJZCwgbmV4dCk7XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHN1ZmZpeCA9IHBhcnNlU3VmZml4RnJvbUZvcm1QYXRoKGZvcm1QYXRoLCByb290RGlyKS5zdWZmaXg7XG4gICAgdmFyIGN1cnJlbnRMb2NhbGUgPSAocGF0aExvY2FsZSB8fCBtb2RlbExvY2FsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFBhZ2VJbmRleCgwKTtcbiAgICB9LCBbdHJhbnNsYXRpb25QYXRocywgZmlsdGVyUXVlcnldKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICB9LFxuICAgICAgW2Zvcm1QYXRoXVxuICAgICk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3RpdmUgPSB0cnVlO1xuICAgICAgICBmZXRjaFRyYW5zbGF0aW9uQ29uZmlnKHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKSwgc2l0ZUlkKS50aGVuKGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgICAgICBpZiAoYWN0aXZlKSBzZXRUcmFuc2xhdGlvbkNmZyhjZmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbYXV0aG9yaW5nQmFzZSwgc2l0ZUlkXVxuICAgICk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGFiID0gZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBzZXRBdXRob3JpbmdCYXNlKGFiKTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5pc2gobGlzdCkge1xuICAgICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICBzZXRUcmFuc2xhdGlvblBhdGhzKGxpc3QpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzaXRlSWQgfHwgIWZvcm1QYXRoKSB7XG4gICAgICAgICAgZmluaXNoKFtdKTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdmFyIHN0dWRpb0Jhc2UgPSBnZXRTdHVkaW9BcGlCYXNlKCk7XG4gICAgICAgIHZhciBsc2lkID0gbW9kZWwubG9jYWxlU291cmNlSWRfcyAmJiBTdHJpbmcobW9kZWwubG9jYWxlU291cmNlSWRfcykudHJpbSgpO1xuICAgICAgICB2YXIgb2lkID0gbW9kZWwub2JqZWN0SWQgJiYgU3RyaW5nKG1vZGVsLm9iamVjdElkKS50cmltKCk7XG4gICAgICAgIHZhciBjdHlwZSA9IHJlc29sdmVkQ29udGVudFR5cGVJZDtcbiAgICAgICAgdmFyIGN1ciA9IChjdXJyZW50TG9jYWxlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBwYXRoT2tGb3JMb2NhbGVQcm9iZSA9IEJvb2xlYW4ocm9vdERpciAmJiBzdWZmaXggIT0gbnVsbCk7XG5cbiAgICAgICAgZnVuY3Rpb24gcnVuRmFsbGJhY2soKSB7XG4gICAgICAgICAgdmFyIGJhc2UgPSBhYiB8fCBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgICAgICAgaWYgKCFiYXNlKSB7XG4gICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKFtmb3JtUGF0aF0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXBhdGhPa0ZvckxvY2FsZVByb2JlKSB7XG4gICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKFtmb3JtUGF0aF0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICgodHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMpIHx8IE1VTFRJX0xPQ0FMRV9DT0RFUykubWFwKGZ1bmN0aW9uIChsb2MpIHtcbiAgICAgICAgICAgICAgdmFyIHAgPSBwYXRoRm9yVGFyZ2V0TG9jYWxlKHJvb3REaXIsIGxvYywgc3VmZml4KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRFeGlzdHMoYmFzZSwgc2l0ZUlkLCBwKS50aGVuKGZ1bmN0aW9uIChvaykge1xuICAgICAgICAgICAgICAgIGlmIChvaykgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgaWYgKGN1ciAmJiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUoY3VyLCBsb2MpKSByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgdmFyIG0gPSB7fTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHApIG1bcF0gPSB0cnVlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1QYXRoKSB7XG4gICAgICAgICAgICAgICAgbVtmb3JtUGF0aF0gPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZpbmlzaChzb3J0VHJhbnNsYXRpb25QYXRoc0ZvckRpc3BsYXkoT2JqZWN0LmtleXMobSksIHJlc29sdmVkU291cmNlS2V5LCB0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5jb2RlcykpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2goW2Zvcm1QYXRoXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSb3dzID0gdHJhbnNsYXRlZCBjb3BpZXMgb25seTogc2libGluZy9pbmRleCBwYXRocyBwbHVzIG9uLWRpc2sgcGF0aHMgZm9yIGNvbmZpZ3VyZWQgbG9jYWxlcy5cbiAgICAgICAgICogRG8gbm90IGFkZCBjb25maWcgbG9jYWxlIHBhdGhzIHVubGVzcyBjb250ZW50IGV4aXN0cyAobWlzc2luZyBsb2NhbGVzIGJlbG9uZyBpbiBUcmFuc2xhdGUgZHJvcGRvd24gb25seSkuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBtZXJnZVBhdGhzQW5kRmluaXNoKHBhdGhzKSB7XG4gICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIHZhciBtID0ge307XG4gICAgICAgICAgKHBhdGhzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICBpZiAocCkgbVtwXSA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGZvcm1QYXRoKSB7XG4gICAgICAgICAgICBtW2Zvcm1QYXRoXSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gYXBwbHlNYXAoKSB7XG4gICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgICAgICBmaW5pc2goc29ydFRyYW5zbGF0aW9uUGF0aHNGb3JEaXNwbGF5KE9iamVjdC5rZXlzKG0pLCByZXNvbHZlZFNvdXJjZUtleSwgdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYmFzZSA9IGFiIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICAgICAgICB2YXIgY2ZnQ29kZXMgPVxuICAgICAgICAgICAgdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgID8gdHJhbnNsYXRpb25DZmcuY29kZXNcbiAgICAgICAgICAgICAgOiBNVUxUSV9MT0NBTEVfQ09ERVM7XG4gICAgICAgICAgaWYgKGJhc2UgJiYgc2l0ZUlkICYmIHJvb3REaXIgIT0gbnVsbCAmJiBzdWZmaXggIT0gbnVsbCAmJiBjZmdDb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICBjZmdDb2Rlcy5tYXAoZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHBhdGhGb3JUYXJnZXRMb2NhbGUocm9vdERpciwgY29kZSwgc3VmZml4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudEV4aXN0cyhiYXNlLCBzaXRlSWQsIHApLnRoZW4oZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2sgPyBwIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIChmb3VuZCB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHApIG1bcF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwcGx5TWFwKCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlNYXAoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5TWFwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqIFByZXZpZXcgT3BlblNlYXJjaCBwbHVnaW46IHNhbWUgY29udGVudC10eXBlICsgbGluZWFnZSAobG9jYWxlU291cmNlSWRfcyBvciBvYmplY3RJZCBvbiBoaXRzKS4gKi9cbiAgICAgICAgaWYgKGN0eXBlICYmIChsc2lkIHx8IG9pZCkgJiYgc3R1ZGlvQmFzZSkge1xuICAgICAgICAgIGZldGNoVHJhbnNsYXRpb25TaWJsaW5nc0Zyb21QbHVnaW4oc3R1ZGlvQmFzZSwgc2l0ZUlkLCBjdHlwZSwgbHNpZCwgb2lkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBhdGhzKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKHBhdGhzICYmIHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKHBhdGhzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGxzaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbHNpZCkudGhlbihmdW5jdGlvbiAobGVnYWN5UGF0aHMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIGlmIChsZWdhY3lQYXRocyAmJiBsZWdhY3lQYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2gobGVnYWN5UGF0aHMpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBydW5GYWxsYmFjaygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKGxzaWQgJiYgc3R1ZGlvQmFzZSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaFBhdGhzQnlMb2NhbGVTb3VyY2VJZChzdHVkaW9CYXNlLCBzaXRlSWQsIGxzaWQpXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGVnYWN5UGF0aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGVnYWN5UGF0aHMgJiYgbGVnYWN5UGF0aHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2gobGVnYWN5UGF0aHMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bkZhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBydW5GYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobHNpZCAmJiBzdHVkaW9CYXNlKSB7XG4gICAgICAgICAgc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbHNpZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYXRocykge1xuICAgICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmICghcGF0aHMgfHwgcGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbWVyZ2VQYXRoc0FuZEZpbmlzaChwYXRocyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bkZhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBmb3JtUGF0aCxcbiAgICAgICAgc2l0ZUlkLFxuICAgICAgICByb290RGlyLFxuICAgICAgICBzdWZmaXgsXG4gICAgICAgIG1vZGVsLmxvY2FsZVNvdXJjZUlkX3MsXG4gICAgICAgIG1vZGVsLm9iamVjdElkLFxuICAgICAgICByZXNvbHZlZENvbnRlbnRUeXBlSWQsXG4gICAgICAgIGN1cnJlbnRMb2NhbGUsXG4gICAgICAgIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXksXG4gICAgICAgIHRyYW5zbGF0aW9uQ2ZnXG4gICAgICBdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYmFzZSA9IGF1dGhvcmluZ0Jhc2UgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhYmFzZSB8fCAhdHJhbnNsYXRpb25QYXRocyB8fCB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldFN0YWxlQnlQYXRoKHt9KTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzb3VyY2VQYXRoID1cbiAgICAgICAgICB0cmFuc2xhdGlvblBhdGhzLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlZFNvdXJjZUtleSAmJiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobG9jLCByZXNvbHZlZFNvdXJjZUtleSk7XG4gICAgICAgICAgfSkgfHwgZm9ybVBhdGg7XG4gICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgIFtnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAoYmFzZSwgc2l0ZUlkLCBzb3VyY2VQYXRoKV0uY29uY2F0KFxuICAgICAgICAgICAgdHJhbnNsYXRpb25QYXRocy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldEl0ZW1Nb2RpZmllZFRpbWVzdGFtcChiYXNlLCBzaXRlSWQsIHApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIHZhciBzb3VyY2VNcyA9IGFyclswXTtcbiAgICAgICAgICB2YXIgbWFwID0ge307XG4gICAgICAgICAgdHJhbnNsYXRpb25QYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TXMgPSBhcnJbaSArIDFdO1xuICAgICAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIGlzU291cmNlID0gcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgICAgICAgbWFwW3BdID1cbiAgICAgICAgICAgICAgIWlzU291cmNlICYmXG4gICAgICAgICAgICAgIHNvdXJjZU1zICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgdGFyZ2V0TXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBOdW1iZXIodGFyZ2V0TXMpIDwgTnVtYmVyKHNvdXJjZU1zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRTdGFsZUJ5UGF0aChtYXApO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHNldFN0YWxlQnlQYXRoKHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCB0cmFuc2xhdGlvblBhdGhzLCByZXNvbHZlZFNvdXJjZUtleSwgZm9ybVBhdGhdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYmFzZSA9IGF1dGhvcmluZ0Jhc2UgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhYmFzZSB8fCAhdHJhbnNsYXRpb25QYXRocyB8fCB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldEV4aXN0c0J5UGF0aCh7fSk7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICB0cmFuc2xhdGlvblBhdGhzLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRFeGlzdHMoYmFzZSwgc2l0ZUlkLCBwKS50aGVuKGZ1bmN0aW9uIChvaykge1xuICAgICAgICAgICAgICByZXR1cm4gW3AsICEhb2tdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYWlycykge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgICAgICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgIG1hcFtyb3dbMF1dID0gcm93WzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRFeGlzdHNCeVBhdGgobWFwKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0RXhpc3RzQnlQYXRoKHt9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFthdXRob3JpbmdCYXNlLCBzaXRlSWQsIHRyYW5zbGF0aW9uUGF0aHNdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBvbkNsb3NlQ29tcGFyZSgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zbGF0aW9uOmNsb3NlLXNvdXJjZS1jb21wYXJlXCIsIG9uQ2xvc2VDb21wYXJlKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNsYXRpb246Y2xvc2Utc291cmNlLWNvbXBhcmVcIiwgb25DbG9zZUNvbXBhcmUpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2l0ZUlkIHx8ICFmb3JtUGF0aCB8fCAhZm9ybSB8fCAhY29udHJvbENvbnRhaW5lckVsKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYXNlID0gYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgICAgIHZhciBzcmMgPSBidWlsZExlZ2FjeVJlYWRvbmx5Rm9ybVNyYyhiYXNlLCBzaXRlSWQsIGNvbXBhcmVTb3VyY2VQYXRoIHx8IFwiXCIpO1xuICAgICAgICB2YXIgaG9zdCA9IGZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QoZm9ybSwgY29udHJvbENvbnRhaW5lckVsKTtcbiAgICAgICAgaWYgKCFob3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWRnZXRDb2xsYXBzZWQgfHwgIWNvbXBhcmVTb3VyY2VQYXRoIHx8ICFzcmMpIHtcbiAgICAgICAgICB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW53cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB3cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCwgc3JjLCBjb21wYXJlU291cmNlUGF0aCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdW53cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgW2NvbXBhcmVTb3VyY2VQYXRoLCBhdXRob3JpbmdCYXNlLCBzaXRlSWQsIGZvcm1QYXRoLCBmb3JtLCBjb250cm9sQ29udGFpbmVyRWwsIHdpZGdldENvbGxhcHNlZF1cbiAgICApO1xuXG4gICAgaWYgKCFzaXRlSWQgfHwgIWZvcm1QYXRoKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzc05hbWU6IFwiaGVscC1ibG9ja1wiLCBzdHlsZTogeyBtYXJnaW5Ub3A6IDAgfSB9LFxuICAgICAgICBcIlNhdmUgdGhlIGl0ZW0gYW5kIG9wZW4gaXQgZnJvbSB0aGUgY29udGVudCB0cmVlIHRvIHNlZSB0cmFuc2xhdGlvbiB2ZXJzaW9ucy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBnZXREaXNwYXRjaCgpO1xuICAgIHZhciB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCA9IHJlc29sdmVUcmFuc2xhdGVDb3B5U291cmNlUGF0aChcbiAgICAgIHRyYW5zbGF0aW9uQ2ZnLFxuICAgICAgcm9vdERpcixcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHRyYW5zbGF0aW9uUGF0aHMsXG4gICAgICBmb3JtUGF0aCxcbiAgICAgIHJlc29sdmVkU291cmNlS2V5XG4gICAgKTtcbiAgICB2YXIgY2xvc2VSZW1vdmVUcmFuc2xhdGlvbk1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0UmVtb3ZlTW9kYWwobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBvcGVuUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCA9IGZ1bmN0aW9uICh0YXJnZXRQYXRoLCBtZXRhKSB7XG4gICAgICBpZiAoIXNpdGVJZCB8fCAhdGFyZ2V0UGF0aCkgcmV0dXJuO1xuICAgICAgdmFyIHRwID0gdGFyZ2V0UGF0aDtcbiAgICAgIHNldFJlbW92ZU1vZGFsKHtcbiAgICAgICAgcGFnZVBhdGg6IHRwLFxuICAgICAgICBtZXRhTGFiZWw6IChtZXRhICYmIG1ldGEubGFiZWwpIHx8IHRwLFxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgY2FuZGlkYXRlczogW10sXG4gICAgICAgIHNlbGVjdGVkUGF0aHM6IHt9LFxuICAgICAgICBzdWJtaXR0aW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB2YXIgc2IgPSBnZXRTdHVkaW9BcGlCYXNlKCk7XG4gICAgICBmZXRjaFRyYW5zbGF0aW9uUmVtb3ZlQ2FuZGlkYXRlcyhzYiwgc2l0ZUlkLCB0cClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IChyZXMgJiYgcmVzLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgcmVtb3ZhYmxlIGNvbXBvbmVudHMuXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGxpc3QgPSByZXMuY2FuZGlkYXRlcyB8fCBbXTtcbiAgICAgICAgICB2YXIgc2VsID0ge307XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoYyAmJiBjLnBhdGgpIHNlbFtjLnBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwge1xuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgY2FuZGlkYXRlczogbGlzdCxcbiAgICAgICAgICAgICAgc2VsZWN0ZWRQYXRoczogc2VsLFxuICAgICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IFwiTmV0d29yayBlcnJvciBsb2FkaW5nIGNhbmRpZGF0ZXMuXCIgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlUmVtb3ZlQ2FuZGlkYXRlID0gZnVuY3Rpb24gKHBhdGgsIGNoZWNrZWQpIHtcbiAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgIGlmICghcHJldiB8fCBwcmV2LmxvYWRpbmcgfHwgcHJldi5zdWJtaXR0aW5nKSByZXR1cm4gcHJldjtcbiAgICAgICAgdmFyIG5leHRTZWwgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2LnNlbGVjdGVkUGF0aHMgfHwge30pO1xuICAgICAgICBuZXh0U2VsW3BhdGhdID0gISFjaGVja2VkO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzZWxlY3RlZFBhdGhzOiBuZXh0U2VsIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXRBbGxSZW1vdmVDYW5kaWRhdGVzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBzZXRSZW1vdmVNb2RhbChmdW5jdGlvbiAocHJldikge1xuICAgICAgICBpZiAoIXByZXYgfHwgcHJldi5sb2FkaW5nIHx8IHByZXYuc3VibWl0dGluZykgcmV0dXJuIHByZXY7XG4gICAgICAgIHZhciBuZXh0U2VsID0ge307XG4gICAgICAgIChwcmV2LmNhbmRpZGF0ZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoYyAmJiBjLnBhdGgpIG5leHRTZWxbYy5wYXRoXSA9ICEhdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzZWxlY3RlZFBhdGhzOiBuZXh0U2VsIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjb25maXJtUmVtb3ZlVHJhbnNsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXJlbW92ZU1vZGFsIHx8IHJlbW92ZU1vZGFsLmxvYWRpbmcgfHwgcmVtb3ZlTW9kYWwuc3VibWl0dGluZykgcmV0dXJuO1xuICAgICAgdmFyIHNiID0gZ2V0U3R1ZGlvQXBpQmFzZSgpO1xuICAgICAgaWYgKCFzYiB8fCAhc2l0ZUlkKSB7XG4gICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlN0dWRpbyBBUEkgYmFzZSBvciBzaXRlIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcGFnZVBhdGggPSByZW1vdmVNb2RhbC5wYWdlUGF0aDtcbiAgICAgIHZhciBzZWwgPSByZW1vdmVNb2RhbC5zZWxlY3RlZFBhdGhzIHx8IHt9O1xuICAgICAgdmFyIHBhdGhzID0gW107XG4gICAgICBPYmplY3Qua2V5cyhzZWwpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgaWYgKHNlbFtwXSkgcGF0aHMucHVzaChwKTtcbiAgICAgIH0pO1xuICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgcmV0dXJuIHByZXYgPyBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7IHN1Ym1pdHRpbmc6IHRydWUsIGVycm9yOiBudWxsIH0pIDogcHJldjtcbiAgICAgIH0pO1xuICAgICAgcG9zdFRyYW5zbGF0aW9uUmVtb3ZlKHNiLCBzaXRlSWQsIHBhZ2VQYXRoLCBwYXRocywgdHJ1ZSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBkZWxldGVkID0gKHJlcyAmJiByZXMuZGVsZXRlZCkgfHwgW107XG4gICAgICAgICAgdmFyIGZhaWxlZCA9IChyZXMgJiYgcmVzLmZhaWxlZCkgfHwgW107XG4gICAgICAgICAgdmFyIGRlbGV0ZWRQYWdlID1cbiAgICAgICAgICAgIGRlbGV0ZWQuc29tZShmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplU3R1ZGlvUGF0aChwKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aChwYWdlUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmFpbGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG1zZyA9XG4gICAgICAgICAgICAgIFwiUmVtb3ZlIGZpbmlzaGVkIHdpdGggZXJyb3JzOiBcIiArXG4gICAgICAgICAgICAgIGZhaWxlZFxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoZiAmJiBmLnBhdGgpICsgKGYgJiYgZi5tZXNzYWdlID8gXCIgKFwiICsgZi5tZXNzYWdlICsgXCIpXCIgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiOyBcIik7XG4gICAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgbXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goXG4gICAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgICBcIlJlbW92ZWQgdHJhbnNsYXRpb25cIiArXG4gICAgICAgICAgICAgICAgKGRlbGV0ZWQubGVuZ3RoID8gXCIgKFwiICsgZGVsZXRlZC5sZW5ndGggKyBcIiBpdGVtKHMpKS5cIiA6IFwiLlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVtcFRyYW5zbGF0aW9uTGlzdChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCgpO1xuICAgICAgICAgIGlmIChkZWxldGVkUGFnZSAmJiBmb3JtUGF0aCAmJiBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aChwYWdlUGF0aCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJESVNQQVRDSF9ET01fRVZFTlRcIiwgcGF5bG9hZDogeyBpZDogXCJlZGl0RGlhbG9nU3VjY2Vzc1wiIH0gfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlMSkge31cbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKFxuICAgICAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAgICAgXCJUaGUgcGFnZSB5b3UgaGFkIG9wZW4gd2FzIGRlbGV0ZWQuIENsb3NlIG9yIHJlZnJlc2ggdGhpcyBkaWFsb2cgaWYgaXQgaXMgc3RpbGwgc2hvd24uXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldiA/IE9iamVjdC5hc3NpZ24oe30sIHByZXYsIHsgc3VibWl0dGluZzogZmFsc2UsIGVycm9yOiBcIk5ldHdvcmsgZXJyb3Igd2hpbGUgZGVsZXRpbmcuXCIgfSkgOiBwcmV2O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlJlbW92ZSB0cmFuc2xhdGlvbiBmYWlsZWQgKG5ldHdvcmspLlwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBydW5UcmFuc2xhdGVGb3JSb3cgPSBmdW5jdGlvbiAodGFyZ2V0UGF0aCwgbWV0YSkge1xuICAgICAgaWYgKCFkaXNwYXRjaCB8fCAhcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpIHx8ICFzaXRlSWQgfHwgIXRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIHx8ICF0YXJnZXRQYXRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChyb3dUcmFuc2xhdGVCdXN5UGF0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRSb3dUcmFuc2xhdGVCdXN5UGF0aChub3JtYWxpemVTdHVkaW9QYXRoKHRhcmdldFBhdGgpKTtcbiAgICAgIHZhciBwYXJlbnQgPSBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weSh0YXJnZXRQYXRoKTtcbiAgICAgIHZhciBjb250ZW50QXBpQmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICAgIGNvcHlJdGVtUGFzdGVTdHVkaW8oY29udGVudEFwaUJhc2UsIHNpdGVJZCwgdHJhbnNsYXRlQ29weVNvdXJjZVBhdGgsIHBhcmVudCwgdGFyZ2V0UGF0aClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCAocmVzICYmIHJlcy5tZXNzYWdlKSB8fCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJUcmFuc2xhdGVkIHRvIFwiICsgbWV0YS5sYWJlbCArIFwiOiBcIiArIHRhcmdldFBhdGgpO1xuICAgICAgICAgIGJ1bXBUcmFuc2xhdGlvbkxpc3QoZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHJldHVybiBuICsgMTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgdGFyZ2V0UGF0aCwgYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0Um93VHJhbnNsYXRlQnVzeVBhdGgoXCJcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHBhdGhMYXlvdXROb3RlID1cbiAgICAgICFyb290RGlyIHx8IHN1ZmZpeCA9PSBudWxsXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEycHhcIiwgbWFyZ2luVG9wOiBcIjRweFwiLCBtYXhXaWR0aDogXCI1MjBweFwiLCBsaW5lSGVpZ2h0OiAxLjQ1IH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlRyYW5zbGF0aW9uIGxvY2FsZSBzaG9ydGN1dHMgd29yayBiZXN0IHdoZW4gdGhpcyBpdGVtIGxpdmVzIHVuZGVyIGEgcGF0aCBsaWtlIFwiLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvc2l0ZS/igKYvd2Vic2l0ZS97bG9jYWxlfS/igKZcIiksXG4gICAgICAgICAgICBcIiBvciBcIixcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL3NpdGUv4oCmL2NvbXBvbmVudHMve2xvY2FsZX0v4oCmXCIpLFxuICAgICAgICAgICAgXCIuIFJlbGF0ZWQgdHJhbnNsYXRpb25zIG1heSBzdGlsbCBhcHBlYXIgZnJvbSB0aGUgc2VhcmNoIGluZGV4IGFib3ZlLlwiXG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGw7XG5cbiAgICB2YXIgc29ydGVkUGF0aHMgPSBzb3J0VHJhbnNsYXRpb25QYXRoc0ZvckRpc3BsYXkoXG4gICAgICB0cmFuc2xhdGlvblBhdGhzLFxuICAgICAgcmVzb2x2ZWRTb3VyY2VLZXksXG4gICAgICB0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5jb2Rlc1xuICAgICk7XG4gICAgdmFyIGZpbHRlcmVkUGF0aHMgPSBmaWx0ZXJUcmFuc2xhdGlvblBhdGhzKHNvcnRlZFBhdGhzLCBmaWx0ZXJRdWVyeSk7XG4gICAgLyoqIExpc3Qgcm93cyBvbmx5IGZvciBsb2NhbGVzIHRoYXQgaGF2ZSBjb250ZW50IChvciB0aGlzIGZvcm0pOyBtaXNzaW5nIGxvY2FsZXMgYXBwZWFyIHVuZGVyIFRyYW5zbGF0ZSBvbmx5LiAqL1xuICAgIHZhciB0cmFuc2xhdGVkT25seVBhdGhzID0gZmlsdGVyZWRQYXRocy5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICAgIGlmICghcCkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHAgPT09IGZvcm1QYXRoKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHZhciBleCA9IGV4aXN0c0J5UGF0aFtwXTtcbiAgICAgIGlmIChleCA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHZhciBhY3RpdmVMb2NhbGVNZXRhID0gKHRyYW5zbGF0aW9uQ2ZnICYmIHRyYW5zbGF0aW9uQ2ZnLm1ldGEpIHx8IExPQ0FMRV9NRVRBO1xuICAgIHZhciB0b3RhbEZpbHRlcmVkID0gdHJhbnNsYXRlZE9ubHlQYXRocy5sZW5ndGg7XG4gICAgdmFyIHRvdGFsUGFnZXMgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwodG90YWxGaWx0ZXJlZCAvIFRSQU5TTEFUSU9OU19QQUdFX1NJWkUpKTtcbiAgICB2YXIgc2FmZVBhZ2UgPSBNYXRoLm1pbihwYWdlSW5kZXgsIHRvdGFsUGFnZXMgLSAxKTtcbiAgICB2YXIgcGFnZVN0YXJ0ID0gc2FmZVBhZ2UgKiBUUkFOU0xBVElPTlNfUEFHRV9TSVpFO1xuICAgIHZhciBwYWdlU2xpY2UgPSB0cmFuc2xhdGVkT25seVBhdGhzLnNsaWNlKHBhZ2VTdGFydCwgcGFnZVN0YXJ0ICsgVFJBTlNMQVRJT05TX1BBR0VfU0laRSk7XG4gICAgdmFyIHJhbmdlRnJvbSA9IHRvdGFsRmlsdGVyZWQgPT09IDAgPyAwIDogcGFnZVN0YXJ0ICsgMTtcbiAgICB2YXIgcmFuZ2VUbyA9IE1hdGgubWluKHBhZ2VTdGFydCArIFRSQU5TTEFUSU9OU19QQUdFX1NJWkUsIHRvdGFsRmlsdGVyZWQpO1xuXG4gICAgdmFyIGZpbHRlclRvb2xiYXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCI4cHhcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgaW5wdXQtc21cIixcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiRmlsdGVyIGJ5IGxhbmd1YWdlLCBjb2RlLCBvciBwYXRoXFx1MjAyNlwiLFxuICAgICAgICB2YWx1ZTogZmlsdGVyUXVlcnksXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNldEZpbHRlclF1ZXJ5KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBtYXhXaWR0aDogXCIyODBweFwiLFxuICAgICAgICAgIGZsZXg6IFwiMSAxIDE4MHB4XCIsXG4gICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1pbnB1dC1iZylcIixcbiAgICAgICAgICBjb2xvcjogXCJ2YXIoLS10di1pbnB1dC10ZXh0KVwiLFxuICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyLWlucHV0KVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIkZpbHRlciB0cmFuc2xhdGlvbnNcIlxuICAgICAgfSksXG4gICAgICB0b3RhbEZpbHRlcmVkID4gMFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLCBjb2xvcjogXCJ2YXIoLS10di10ZXh0LW11dGVkKVwiIH0gfSxcbiAgICAgICAgICAgIFwiU2hvd2luZyBcIixcbiAgICAgICAgICAgIHJhbmdlRnJvbSxcbiAgICAgICAgICAgIFwiXFx1MjAxM1wiLFxuICAgICAgICAgICAgcmFuZ2VUbyxcbiAgICAgICAgICAgIFwiIG9mIFwiLFxuICAgICAgICAgICAgdG90YWxGaWx0ZXJlZFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsXG4gICAgKTtcblxuICAgIHZhciBwYWdpbmF0aW9uQmFyID1cbiAgICAgIHRvdGFsRmlsdGVyZWQgPiBUUkFOU0xBVElPTlNfUEFHRV9TSVpFXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpZ29vZGllcy10di1wYWdlci1idG5cIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogc2FmZVBhZ2UgPD0gMCxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRQYWdlSW5kZXgoTWF0aC5tYXgoMCwgc2FmZVBhZ2UgLSAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlByZXZpb3VzXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIGNvbG9yOiBcInZhcigtLXR2LXRleHQtbXV0ZWQpXCIgfSB9LFxuICAgICAgICAgICAgICBcIlBhZ2UgXCIsXG4gICAgICAgICAgICAgIHNhZmVQYWdlICsgMSxcbiAgICAgICAgICAgICAgXCIgLyBcIixcbiAgICAgICAgICAgICAgdG90YWxQYWdlc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aWdvb2RpZXMtdHYtcGFnZXItYnRuXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHNhZmVQYWdlID49IHRvdGFsUGFnZXMgLSAxLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFBhZ2VJbmRleChNYXRoLm1pbih0b3RhbFBhZ2VzIC0gMSwgc2FmZVBhZ2UgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIk5leHRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgdmFyIG9uVHJhbnNsYXRpb25Sb3dBY3RpdmF0ZSA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICBpZiAoaW5mbyAmJiBpbmZvLmlzU291cmNlICYmICFpbmZvLmlzQ3VycmVudFJvdyAmJiBpbmZvLnRhcmdldFBhdGgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICBpZiAocHJldiAmJiBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKGluZm8udGFyZ2V0UGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaW5mby50YXJnZXRQYXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBsaXN0U2VjdGlvbiA9XG4gICAgICBsb2FkaW5nICYmIHRyYW5zbGF0aW9uUGF0aHMubGVuZ3RoID09PSAwXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkIHVpZ29vZGllcy10di1idXN5XCIsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI4cHggMFwiLCBnYXA6IFwiMTBweFwiIH0sXG4gICAgICAgICAgICAgIHJvbGU6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgIFwiYXJpYS1saXZlXCI6IFwicG9saXRlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTcGlubmVyRWwoeyBzaXplOiAxNiwgbGFiZWw6IFwiTG9hZGluZyB0cmFuc2xhdGlvbnNcIiB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiTG9hZGluZyB0cmFuc2xhdGlvbnNcXHUyMDI2XCIpXG4gICAgICAgICAgKVxuICAgICAgICA6IHRyYW5zbGF0aW9uUGF0aHMubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIHBhZGRpbmc6IFwiNHB4IDAgOHB4XCIgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIk5vIHRyYW5zbGF0aW9ucyBmb3VuZC5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogeyBvcGFjaXR5OiBsb2FkaW5nID8gMC41NSA6IDEsIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsIHBvaW50ZXJFdmVudHM6IGxvYWRpbmcgPyBcIm5vbmVcIiA6IHVuZGVmaW5lZCB9IH0sXG4gICAgICAgICAgICAgIGxvYWRpbmcgJiYgdHJhbnNsYXRpb25QYXRocy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpZ29vZGllcy10di1idXN5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInZhcigtLXR2LXRleHQtc29mdClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtYnVzeS1jaGlwLWJnKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI0cHggOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFwidmFyKC0tdHYtc2hhZG93LWNoaXApXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFwic3RhdHVzXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgU3Bpbm5lckVsKHsgc2l6ZTogMTIsIGxhYmVsOiBcIlJlZnJlc2hpbmcgdHJhbnNsYXRpb25zXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiUmVmcmVzaGluZ1xcdTIwMjZcIilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgIGZpbHRlclRvb2xiYXIsXG4gICAgICAgICAgICAgIHBhZ2VTbGljZS5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIHBhZGRpbmc6IFwiNnB4IDBcIiwgY29sb3I6IFwidmFyKC0tdHYtdGV4dC1tdXRlZClcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmlsdGVyZWQgPT09IDAgJiYgZmlsdGVyZWRQYXRocy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgPyBcIk5vIHRyYW5zbGF0ZWQgbG9jYWxlcyBtYXRjaCB5b3VyIGZpbHRlciAodW50cmFuc2xhdGVkIGxvY2FsZXMgYXJlIGluIFRyYW5zbGF0ZSBiZWxvdykuXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiTm8gdHJhbnNsYXRpb25zIG1hdGNoIHlvdXIgZmlsdGVyLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBwYWdlU2xpY2UubWFwKGZ1bmN0aW9uICh0YXJnZXRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgodGFyZ2V0UGF0aCkgfHwgXCJ1bmtub3duXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRhID1cbiAgICAgICAgICAgICAgICAgICAgICBtZXRhRm9yUGF0aExvY2FsZShhY3RpdmVMb2NhbGVNZXRhLCBsb2MpIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcIlxcdUQ4M0NcXHVERjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNTb3VyY2UgPVxuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkU291cmNlS2V5ICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShsb2MsIHJlc29sdmVkU291cmNlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IGV4aXN0c0J5UGF0aFt0YXJnZXRQYXRoXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRSb3cgPVxuICAgICAgICAgICAgICAgICAgICAgICEhZm9ybVBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAhIXRhcmdldFBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aCh0YXJnZXRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNsYXRpb25WZXJzaW9uUm93LCB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIG1ldGE6IG1ldGEsXG4gICAgICAgICAgICAgICAgICAgICAgaXNTb3VyY2U6IGlzU291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgIGV4aXN0czogZXhpc3RzLFxuICAgICAgICAgICAgICAgICAgICAgIGlzT3V0ZGF0ZWQ6ICEhc3RhbGVCeVBhdGhbdGFyZ2V0UGF0aF0sXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgb25UcmFuc2xhdGU6IHJ1blRyYW5zbGF0ZUZvclJvdyxcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVCdXN5OlxuICAgICAgICAgICAgICAgICAgICAgICAgISFyb3dUcmFuc2xhdGVCdXN5UGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplU3R1ZGlvUGF0aChyb3dUcmFuc2xhdGVCdXN5UGF0aCkgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgZm9ybVBhdGg6IGZvcm1QYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQWN0aXZhdGU6IG9uVHJhbnNsYXRpb25Sb3dBY3RpdmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhcmVTZWxlY3RlZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICEhY29tcGFyZVNvdXJjZVBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZVN0dWRpb1BhdGgoY29tcGFyZVNvdXJjZVBhdGgpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKHRhcmdldFBhdGgpLFxuICAgICAgICAgICAgICAgICAgICAgIHNob3dSZW1vdmVUcmFuc2xhdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzU291cmNlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNDdXJyZW50Um93ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BhZ2VUcmFuc2xhdGlvblJvdyh0YXJnZXRQYXRoLCByZXNvbHZlZENvbnRlbnRUeXBlSWQpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlVHJhbnNsYXRpb246IG9wZW5SZW1vdmVUcmFuc2xhdGlvbk1vZGFsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHBhZ2luYXRpb25CYXJcbiAgICAgICAgICAgICk7XG5cbiAgICB2YXIgYXV0aG9yaW5nQmFzZVJlc29sdmVkID0gYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCk7XG5cbiAgICB2YXIgYWRkVHJhbnNsYXRpb25CYXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KEFkZFRyYW5zbGF0aW9uTG9jYWxlQmFyLCB7XG4gICAgICBmb3JtUGF0aDogZm9ybVBhdGgsXG4gICAgICB0cmFuc2xhdGVDb3B5U291cmNlUGF0aDogdHJhbnNsYXRlQ29weVNvdXJjZVBhdGgsXG4gICAgICBzaXRlSWQ6IHNpdGVJZCxcbiAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICAgIGF1dGhvcmluZ0Jhc2U6IGF1dGhvcmluZ0Jhc2VSZXNvbHZlZCxcbiAgICAgIHJvb3REaXI6IHJvb3REaXIsXG4gICAgICBzdWZmaXg6IHN1ZmZpeCxcbiAgICAgIGV4aXN0aW5nUGF0aHM6IHRyYW5zbGF0aW9uUGF0aHMsXG4gICAgICBvblRyYW5zbGF0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYnVtcFRyYW5zbGF0aW9uTGlzdChmdW5jdGlvbiAobikge1xuICAgICAgICAgIHJldHVybiBuICsgMTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbG9jYWxlQ29kZXM6IHRyYW5zbGF0aW9uQ2ZnICYmIHRyYW5zbGF0aW9uQ2ZnLmNvZGVzLFxuICAgICAgbG9jYWxlTWV0YTogdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcubWV0YSxcbiAgICAgIHRyYW5zbGF0aW9uQ2ZnOiB0cmFuc2xhdGlvbkNmZ1xuICAgIH0pO1xuXG4gICAgdmFyIGNvbXBhcmVMYXlvdXRCb2R5ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiwgbWluV2lkdGg6IDAgfSB9LFxuICAgICAgbGlzdFNlY3Rpb24sXG4gICAgICBhZGRUcmFuc2xhdGlvbkJhclxuICAgICk7XG5cbiAgICB2YXIgcmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsID0gbnVsbDtcbiAgICBpZiAocmVtb3ZlTW9kYWwpIHtcbiAgICAgIHZhciBybSA9IHJlbW92ZU1vZGFsO1xuICAgICAgdmFyIGNhbmRpZGF0ZVJvd3MgPVxuICAgICAgICAhcm0ubG9hZGluZyAmJiBybS5jYW5kaWRhdGVzICYmIHJtLmNhbmRpZGF0ZXMubGVuZ3RoXG4gICAgICAgICAgPyBybS5jYW5kaWRhdGVzLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICB2YXIgcHRoID0gYy5wYXRoO1xuICAgICAgICAgICAgICB2YXIgY2hlY2tlZCA9IHJtLnNlbGVjdGVkUGF0aHMgJiYgcm0uc2VsZWN0ZWRQYXRoc1twdGhdO1xuICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBwdGgsXG4gICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJmbGV4LXN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LWJvcmRlci1zb2Z0KVwiLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcm0uc3VibWl0dGluZyA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtcGFwZXItMilcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6ICEhY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIXJtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUmVtb3ZlQ2FuZGlkYXRlKHB0aCwgZS50YXJnZXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgbWFyZ2luVG9wOiBcIjNweFwiLCBmbGV4U2hyaW5rOiAwIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgbGluZUhlaWdodDogMS40LCB3b3JkQnJlYWs6IFwiYnJlYWstYWxsXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJvbmdcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiBcImJsb2NrXCIsIGNvbG9yOiBcInZhcigtLXR2LXRleHQpXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAoYy5pbnRlcm5hbE5hbWUgJiYgU3RyaW5nKGMuaW50ZXJuYWxOYW1lKS50cmltKCkpIHx8IFwiKG5vIGludGVybmFsIG5hbWUpXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEycHhcIiwgY29sb3I6IFwidmFyKC0tdHYtdGV4dC1kaW0pXCIgfSB9LCBwdGgpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IG51bGw7XG5cbiAgICAgIHJlbW92ZVRyYW5zbGF0aW9uTW9kYWxFbCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiBcImRpYWxvZ1wiLFxuICAgICAgICAgIFwiYXJpYS1tb2RhbFwiOiBcInRydWVcIixcbiAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiBcInRyYW5zbGF0aW9uLXJlbW92ZS10cmFuc2xhdGlvbi10aXRsZVwiLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgaW5zZXQ6IDAsXG4gICAgICAgICAgICB6SW5kZXg6IDEwMDUwLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNDUpXCIsXG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMTZweFwiLFxuICAgICAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0ICYmICFybS5zdWJtaXR0aW5nKSBjbG9zZVJlbW92ZVRyYW5zbGF0aW9uTW9kYWwoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LW1vZGFsLWJnKVwiLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICAgICAgICAgIG1heFdpZHRoOiBcIjU2MHB4XCIsXG4gICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgbWF4SGVpZ2h0OiBcIm1pbig4NXZoLCA2ODBweClcIixcbiAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC4yMilcIixcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjE0cHggMThweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgdmFyKC0tdHYtbW9kYWwtYm9yZGVyKVwiLFxuICAgICAgICAgICAgICAgIGZsZXhTaHJpbms6IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRyYW5zbGF0aW9uLXJlbW92ZS10cmFuc2xhdGlvbi10aXRsZVwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IG1hcmdpbjogMCwgZm9udFNpemU6IFwiMTZweFwiLCBmb250V2VpZ2h0OiA2MDAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlJlbW92ZSB0cmFuc2xhdGlvblwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpblRvcDogXCI2cHhcIiwgbGluZUhlaWdodDogMS40NSB9IH0sXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHJtLm1ldGFMYWJlbCksXG4gICAgICAgICAgICAgIFwiIOKAlCBcIixcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMXB4XCIgfSB9LCBybS5wYWdlUGF0aClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiBcIjEycHggMThweFwiLCBvdmVyZmxvd1k6IFwiYXV0b1wiLCBmbGV4OiBcIjEgMSBhdXRvXCIsIG1pbkhlaWdodDogMCB9IH0sXG4gICAgICAgICAgICBybS5sb2FkaW5nXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkIHVpZ29vZGllcy10di1idXN5XCIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI4cHggMFwiLCBnYXA6IFwiMTBweFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFwic3RhdHVzXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBTcGlubmVyRWwoeyBzaXplOiAxNiwgbGFiZWw6IFwiRmluZGluZyBjb21wb25lbnRzXCIgfSksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgXCJGaW5kaW5nIGxvY2FsZS1zcGVjaWZpYyBjb21wb25lbnRzIG9ubHkgdXNlZCBieSB0aGlzIHBhZ2VcXHUyMDI2XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIHJtLmVycm9yXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJhbGVydCBhbGVydC1kYW5nZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBwYWRkaW5nOiBcIjhweCAxMnB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHJtLmVycm9yXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAhcm0ubG9hZGluZyAmJiAhcm0uZXJyb3IgJiYgKCFybS5jYW5kaWRhdGVzIHx8ICFybS5jYW5kaWRhdGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJwXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgbWFyZ2luOiBcIjhweCAwIDEycHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBcIk5vIHNoYXJlZCBjb21wb25lbnRzIGluIHRoaXMgbG9jYWxlIHdlcmUgZm91bmQgdGhhdCBhcmUgc2FmZSB0byBkZWxldGUgYXV0b21hdGljYWxseSAodGhleSBtYXkgYmUgcmVmZXJlbmNlZCBlbHNld2hlcmUpLiBUaGUgdHJhbnNsYXRlZCBwYWdlIGNhbiBzdGlsbCBiZSByZW1vdmVkIGJlbG93LlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAhcm0ubG9hZGluZyAmJiBybS5jYW5kaWRhdGVzICYmIHJtLmNhbmRpZGF0ZXMubGVuZ3RoXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogXCIxMHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiBcIjZweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgXCJBbHNvIGRlbGV0ZSB0aGVzZSBsb2NhbGUgY29tcG9uZW50cyAobm8gb3RoZXIgcGFnZSByZWZlcmVuY2VzKVwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiBcImZsZXhcIiwgZ2FwOiBcIjhweFwiLCBmbGV4V3JhcDogXCJ3cmFwXCIsIG1hcmdpbkJvdHRvbTogXCI4cHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGVmYXVsdCBidG4teHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIXJtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFsbFJlbW92ZUNhbmRpZGF0ZXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcIlNlbGVjdCBhbGxcIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBbGxSZW1vdmVDYW5kaWRhdGVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiU2VsZWN0IG5vbmVcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlUm93c1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJwXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IFwidmFyKC0tdHYtd2Fybi1mZylcIixcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtd2Fybi1iZylcIixcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtd2Fybi1iZClcIixcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI0cHhcIixcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDEwcHhcIixcbiAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiVGhlIHRyYW5zbGF0ZWQgcGFnZSB3aWxsIGJlIGRlbGV0ZWQgYWZ0ZXIgdGhlIHNlbGVjdGVkIGNvbXBvbmVudHMuIFRoaXMgY2Fubm90IGJlIHVuZG9uZS5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogXCIxMnB4IDE4cHhcIixcbiAgICAgICAgICAgICAgICBib3JkZXJUb3A6IFwiMXB4IHNvbGlkIHZhcigtLXR2LW1vZGFsLWJvcmRlcilcIixcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiLFxuICAgICAgICAgICAgICAgIGdhcDogXCI4cHhcIixcbiAgICAgICAgICAgICAgICBmbGV4U2hyaW5rOiAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVwiLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIXJtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgb25DbGljazogY2xvc2VSZW1vdmVUcmFuc2xhdGlvbk1vZGFsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiQ2FuY2VsXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0ubG9hZGluZyB8fCAhIXJtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgb25DbGljazogY29uZmlybVJlbW92ZVRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJtLnN1Ym1pdHRpbmcgPyBcIlJlbW92aW5nXFx1MjAyNlwiIDogXCJSZW1vdmUgdHJhbnNsYXRpb25cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzTmFtZTogXCJjc3R1ZGlvLWZvcm0tY29udHJvbC1pbnB1dC1jb250YWluZXIgdHJhbnNsYXRpb24tdmVyc2lvbnMtY29udHJvbFwiIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwic3RyZXRjaFwiLFxuICAgICAgICAgICAgZ2FwOiB3aWRnZXRDb2xsYXBzZWQgPyBcIjBcIiA6IFwiMjBweFwiLFxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyKVwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjZweFwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1iZylcIixcbiAgICAgICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0cmFuc2xhdGlvbi12ZXJzaW9ucy1jb2xsYXBzZS10b2dnbGVcIixcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRvZ2dsZVdpZGdldENvbGxhcHNlZCxcbiAgICAgICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiB3aWRnZXRDb2xsYXBzZWQgPyBcImZhbHNlXCIgOiBcInRydWVcIixcbiAgICAgICAgICAgIFwiYXJpYS1jb250cm9sc1wiOiBcInRyYW5zbGF0aW9uLXZlcnNpb25zLXBhbmVsLWJvZHlcIixcbiAgICAgICAgICAgIHRpdGxlOiB3aWRnZXRDb2xsYXBzZWQgPyBcIkV4cGFuZCBUcmFuc2xhdGlvbnNcIiA6IFwiQ29sbGFwc2UgVHJhbnNsYXRpb25zXCIsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBweCAxMnB4XCIsXG4gICAgICAgICAgICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogd2lkZ2V0Q29sbGFwc2VkID8gXCJub25lXCIgOiBcIjFweCBzb2xpZCB2YXIoLS10di1ib3JkZXItc29mdClcIixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1oZWFkZXIpXCIsXG4gICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgIHRleHRBbGlnbjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IFwiMThweFwiLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJ2YXIoLS10di10ZXh0LW11dGVkKVwiLFxuICAgICAgICAgICAgICAgIGZsZXg6IFwiMCAwIGF1dG9cIixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHdpZGdldENvbGxhcHNlZCA/IFwicm90YXRlKC05MGRlZylcIiA6IFwicm90YXRlKDBkZWcpXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJ0cmFuc2Zvcm0gMC4xNXMgZWFzZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlxcdTI1QkNcIlxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZsZXg6IFwiMSAxIGF1dG9cIixcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogMCxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcInZhcigtLXR2LXRleHQpXCIsXG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCItMC4wMWVtXCIsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogMS4zXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlRyYW5zbGF0aW9uc1wiXG4gICAgICAgICAgKSxcbiAgICAgICAgICB3aWRnZXRDb2xsYXBzZWQgJiYgdG90YWxGaWx0ZXJlZCA+IDBcbiAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLCBmbGV4OiBcIjAgMCBhdXRvXCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG90YWxGaWx0ZXJlZCArICh0b3RhbEZpbHRlcmVkID09PSAxID8gXCIgbG9jYWxlXCIgOiBcIiBsb2NhbGVzXCIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjExcHhcIiwgd2hpdGVTcGFjZTogXCJub3dyYXBcIiwgZmxleDogXCIwIDAgYXV0b1wiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWRnZXRDb2xsYXBzZWQgPyBcIlNob3dcIiA6IFwiSGlkZVwiXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICB3aWRnZXRDb2xsYXBzZWRcbiAgICAgICAgICA/IG51bGxcbiAgICAgICAgICA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0cmFuc2xhdGlvbi12ZXJzaW9ucy1wYW5lbC1ib2R5XCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6IFwic3RyZXRjaFwiLFxuICAgICAgICAgICAgICAgICAgZ2FwOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEycHhcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcGF0aExheW91dE5vdGVcbiAgICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgcGF0aExheW91dE5vdGUpXG4gICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyB3aWR0aDogXCIxMDAlXCIsIG1pbldpZHRoOiAwIH0gfSxcbiAgICAgICAgICAgICAgICBjb21wYXJlTGF5b3V0Qm9keVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICApLFxuICAgICAgcmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsXG4gICAgKTtcbiAgfVxuXG4gIENTdHVkaW9Gb3Jtcy5Db250cm9scy5UcmFuc2xhdGlvblZlcnNpb25zID1cbiAgICBDU3R1ZGlvRm9ybXMuQ29udHJvbHMuVHJhbnNsYXRpb25WZXJzaW9ucyB8fFxuICAgIGZ1bmN0aW9uIChpZCwgZm9ybSwgb3duZXIsIHByb3BlcnRpZXMsIGNvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRmllbGQodGhpcyk7XG4gICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICAgIHRoaXMuY29uc3RyYWludHMgPSBjb25zdHJhaW50cztcbiAgICAgIHRoaXMucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudmFsdWUgPSBcIl9ub3Qtc2V0XCI7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgdGhpcy5zdXBwb3J0ZWRQb3N0Rml4ZXMgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgWUFIT08uZXh0ZW5kKENTdHVkaW9Gb3Jtcy5Db250cm9scy5UcmFuc2xhdGlvblZlcnNpb25zLCBDU3R1ZGlvRm9ybXMuQ1N0dWRpb0Zvcm1GaWVsZCwge1xuICAgIC8qKiBTaG93biBpbiB0aGUgQ29udGVudCBUeXBlcyBidWlsZGVyIGNvbnRyb2wgcGFsZXR0ZSAoZHJhZy1hbmQtZHJvcCBsaXN0KS4gKi9cbiAgICBnZXRMYWJlbDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFwiVHJhbnNsYXRpb24gdmVyc2lvbnMgKFRyYW5zbGF0aW9uKVwiO1xuICAgIH0sXG4gICAgX3JlbmRlcjogZnVuY3Rpb24gKHNlbGYpIHtcbiAgICAgIHZhciBjbXMgPSBDcmFmdGVyQ01TTmV4dDtcbiAgICAgIHZhciBzaXRlID1cbiAgICAgICAgKHR5cGVvZiBDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dC5zaXRlKSB8fFxuICAgICAgICAoc2VsZi5mb3JtICYmIHNlbGYuZm9ybS5zaXRlKSB8fFxuICAgICAgICBcIlwiO1xuICAgICAgdmFyIGludGVybmFsTmFtZSA9XG4gICAgICAgIChzZWxmLmZvcm0ubW9kZWwgJiYgKHNlbGYuZm9ybS5tb2RlbFtcImludGVybmFsLW5hbWVcIl0gfHwgc2VsZi5mb3JtLm1vZGVsLmludGVybmFsTmFtZSkpIHx8IFwiXCI7XG4gICAgICB2YXIgY29udGVudFR5cGVJZCA9XG4gICAgICAgIChzZWxmLmZvcm0ubW9kZWwgJiYgKHNlbGYuZm9ybS5tb2RlbFtcImNvbnRlbnQtdHlwZVwiXSB8fCBzZWxmLmZvcm0ubW9kZWwuY29udGVudFR5cGUpKSB8fCBcIlwiO1xuICAgICAgdmFyIHBhbmVsUHJvcHMgPSB7XG4gICAgICAgIGZvcm1QYXRoOiBzZWxmLmZvcm0ucGF0aCxcbiAgICAgICAgc2l0ZUlkOiBzaXRlLFxuICAgICAgICBtb2RlbDogc2VsZi5mb3JtLm1vZGVsLFxuICAgICAgICBpbnRlcm5hbE5hbWU6IGludGVybmFsTmFtZSxcbiAgICAgICAgY29udGVudFR5cGVJZDogY29udGVudFR5cGVJZCxcbiAgICAgICAgZm9ybTogc2VsZi5mb3JtLFxuICAgICAgICBjb250cm9sQ29udGFpbmVyRWw6IHNlbGYuY29udGFpbmVyRWxcbiAgICAgIH07XG4gICAgICBpZiAoc2VsZi5fY21zUmVuZGVySGFuZGxlICYmIHNlbGYuX2Ntc1JlbmRlckhhbmRsZS51bm1vdW50KSB7XG4gICAgICAgIHNlbGYuX2Ntc1JlbmRlckhhbmRsZS51bm1vdW50KHsgcmVtb3ZlQ29udGFpbmVyOiBmYWxzZSB9KTtcbiAgICAgICAgc2VsZi5fY21zUmVuZGVySGFuZGxlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNtc1xuICAgICAgICAucmVuZGVyKFxuICAgICAgICAgIHNlbGYuY29udGFpbmVyRWwsXG4gICAgICAgICAgZnVuY3Rpb24gVHJhbnNsYXRpb25WZXJzaW9uc0JyaWRnZShwcm9wcykge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNsYXRpb25WZXJzaW9uc1BhbmVsLCBwcm9wcyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYW5lbFByb3BzXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICAgIHNlbGYuX2Ntc1JlbmRlckhhbmRsZSA9IGhhbmRsZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW3RyYW5zbGF0aW9uLXZlcnNpb25zXSBGYWlsZWQgdG8gcmVuZGVyIGNvbnRyb2xcIiwgZXJyKTtcbiAgICAgICAgICBzZWxmLmNvbnRhaW5lckVsLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIiBzdHlsZT1cIm1hcmdpbjo4cHggMFwiPlRyYW5zbGF0aW9uIGNvbnRyb2wgY291bGQgbm90IGxvYWQuIFJlZnJlc2ggU3R1ZGlvIGFuZCBjaGVjayB0aGUgYnJvd3NlciBjb25zb2xlLjwvZGl2Pic7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoY29uZmlnLCBjb250YWluZXJFbCkge1xuICAgICAgY29udGFpbmVyRWwuaWQgPSB0aGlzLmlkO1xuICAgICAgdGhpcy5jb250YWluZXJFbCA9IGNvbnRhaW5lckVsO1xuICAgICAgdGhpcy5fcmVuZGVyKHRoaXMpO1xuICAgIH0sXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyRWwpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH0sXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRpb24tdmVyc2lvbnNcIjtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZFByb3BlcnRpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRQb3N0Rml4ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZFBvc3RGaXhlcztcbiAgICB9XG4gIH0pO1xuXG4gIENTdHVkaW9BdXRob3JpbmcuTW9kdWxlLm1vZHVsZUxvYWRlZChcInRyYW5zbGF0aW9uLXZlcnNpb25zXCIsIENTdHVkaW9Gb3Jtcy5Db250cm9scy5UcmFuc2xhdGlvblZlcnNpb25zKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBDcmFmdGVyQ01TTmV4dCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBDcmFmdGVyQ01TTmV4dC5SZWFjdCkge1xuICAgIGJvb3RUcmFuc2xhdGlvblZlcnNpb25zQ29udHJvbCgpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJDcmFmdGVyQ01TLkNvZGViYXNlQnJpZGdlUmVhZHlcIiwgYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sLCB7IG9uY2U6IHRydWUgfSk7XG4gIH1cbn0pKCk7XG4iXSwibmFtZXMiOlsiYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sIiwiUmVhY3QiLCJDcmFmdGVyQ01TTmV4dCIsIlNQSU5ORVJfU1RZTEVfSUQiLCJlbnN1cmVTcGlubmVyU3R5bGVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsImlkIiwidGV4dENvbnRlbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJTcGlubmVyRWwiLCJvcHRzIiwiY2xhc3NOYW1lIiwibGlnaHQiLCJyb2xlIiwibGFiZWwiLCJzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXJXaWR0aCIsIk1hdGgiLCJtYXgiLCJyb3VuZCIsInVuZGVmaW5lZCIsIkJ1c3lMYWJlbCIsInRleHQiLCJSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyIsIndlYnNpdGUiLCJjb21wb25lbnRzIiwidGVtcGxhdGVzIiwic2NyaXB0cyIsImNvbmZpZyIsIk1VTFRJX0xPQ0FMRV9DT0RFUyIsIkxPQ0FMRV9NRVRBIiwiZmxhZyIsImZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QiLCJmb3JtIiwiY29udHJvbENvbnRhaW5lckVsIiwic2VjdGlvbnMiLCJjb250YWluZXJFbCIsInNlYyIsImNsb3Nlc3QiLCJwZyIsImljZSIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsInBnMiIsImljZTIiLCJlMiIsInVud3JhcEZvcm1Db21wYXJlTGF5b3V0IiwiaG9zdCIsImRhdGFzZXQiLCJ0cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkIiwicm93IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm1haW4iLCJxdWVyeVNlbGVjdG9yIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZTMiLCJTTUFSVENPUFlfQ09NUEFSRV9XSURUSF9MUyIsIlRSQU5TTEFUSU9OX1dJREdFVF9DT0xMQVBTRV9MU19QUkVGSVgiLCJUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfRVZFTlQiLCJ0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleSIsInNpdGVJZCIsIlN0cmluZyIsInRyaW0iLCJyZWFkVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZSIsIndyaXRlVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQiLCJjb2xsYXBzZWQiLCJzZXRJdGVtIiwiZUxzIiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZUV2IiwiYXBwbHlTb3VyY2VQYW5lV2lkdGhQeCIsImxlZnRFbCIsInRvdGFsUm93V2lkdGhQeCIsIndpZHRoUHgiLCJtaW5XIiwibWF4VyIsInciLCJtaW4iLCJmbGV4IiwibWF4V2lkdGgiLCJyZWFkSW5pdGlhbFNvdXJjZVBhbmVXaWR0aFB4IiwiaG9zdFdpZHRoUHgiLCJtYXhBbGxvd2VkIiwicyIsIm4iLCJwYXJzZUludCIsImlzTmFOIiwiZTAiLCJmbG9vciIsImF0dGFjaFNtYXJ0Y29weUNvbXBhcmVTcGxpdHRlciIsInNwbGl0dGVyIiwic2V0QXR0cmlidXRlIiwidGFiSW5kZXgiLCJjc3NUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBvaW50ZXJUeXBlIiwiYnV0dG9uIiwicHJldmVudERlZmF1bHQiLCJzdGFydFgiLCJjbGllbnRYIiwic3RhcnRXIiwib2Zmc2V0V2lkdGgiLCJnZXRNYXhXIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2V0UG9pbnRlckNhcHR1cmUiLCJwb2ludGVySWQiLCJjYXAiLCJvbk1vdmUiLCJldiIsImR4IiwibnciLCJvblVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbGVhc2VQb2ludGVyQ2FwdHVyZSIsInJlbCIsImxzIiwid3JhcEZvcm1Db21wYXJlTGF5b3V0IiwiaWZyYW1lU3JjIiwicGF0aExhYmVsIiwiZXhpc3RpbmdJZnJhbWUiLCJzcmMiLCJjb2RlRWwiLCJob3N0VyIsImlubmVyV2lkdGgiLCJsZWZ0IiwiaGVhZGVyIiwidGl0bGVCbG9jayIsIm1pbldpZHRoIiwic3Ryb25nIiwic3ViIiwiY29kZSIsImNsb3NlQnRuIiwidHlwZSIsImU0IiwiaWZyYW1lIiwidGl0bGUiLCJlNSIsImdldExvY2FsZUxpc3QiLCJnZXRMb2NhbGVGcm9tUGF0aCIsInBhdGgiLCJwYXJ0cyIsInJlcGxhY2UiLCJzcGxpdCIsImZpbHRlciIsIkJvb2xlYW4iLCJsZW5ndGgiLCJsaXN0IiwiZmlyc3QiLCJ0b0xvd2VyQ2FzZSIsImNhbmRpZGF0ZSIsImluZGV4T2YiLCJ0ZXN0IiwibG9jYWxlU2VnbWVudHNDb21wYXRpYmxlIiwiYSIsImIiLCJjIiwic3RhcnRzV2l0aCIsIm1ldGFGb3JQYXRoTG9jYWxlIiwiYWN0aXZlTWV0YSIsImxvYyIsImxrIiwia2V5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwidHJhbnNsYXRpb25Mb2NhbGVBbHJlYWR5UHJlc2VudCIsInRyYW5zbGF0ZWRMb2NhbGVzIiwic2VnIiwibm9ybWFsaXplU3R1ZGlvUGF0aCIsInAiLCJnZXRNdWx0aUxvY2FsZVJvb3REaXIiLCJmdWxsUGF0aCIsIm0iLCJtYXRjaCIsInBhdGhGb3JUYXJnZXRMb2NhbGUiLCJyb290RGlyIiwibG9jYWxlIiwic3VmZml4IiwiciIsInN1ZiIsInBhcnNlU3VmZml4RnJvbUZvcm1QYXRoIiwiZm9ybVBhdGgiLCJmcCIsInJsIiwiZmwiLCJyZXN0Iiwic2xpY2UiLCJjaGFyQXQiLCJzdWZmaXhQYXJ0cyIsImpvaW4iLCJmaXJzdExvY2FsZVNlZ21lbnRVbmRlclJvb3QiLCJleGlzdGluZ1RyYW5zbGF0aW9uTG9jYWxlS2V5cyIsInBhdGhzIiwia2V5cyIsImFkZCIsImsiLCJmb3JFYWNoIiwicGFyc2VDb250ZW50RXhpc3RzUGF5bG9hZCIsImJvZHkiLCJjb250ZW50IiwicmVzcG9uc2UiLCJyZXN1bHQiLCJleGlzdHMiLCJyZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UiLCJwcmVmIiwiZ2V0QXV0aG9yaW5nQmFzZSIsImdldFN0dWRpb0FwaUJhc2UiLCJjbXMiLCJjcmFmdGVyY21zIiwiZ2V0U3RvcmUiLCJzdG9yZSIsImdldFN0YXRlIiwiZW52IiwiYXV0aG9yaW5nQmFzZSIsIkNTdHVkaW9BdXRob3JpbmdDb250ZXh0IiwiYmFzZVVyaSIsImdldENyYWZ0ZXJTdHVkaW9BamF4IiwidXRpbHMiLCJhamF4IiwibWVyZ2VGZXRjaEhlYWRlcnMiLCJleHRyYSIsIm91dCIsImFzc2lnbiIsImdldEdsb2JhbEhlYWRlcnMiLCJjb29raWUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ1bndyYXBBamF4UmVzcG9uc2UiLCJyZXMiLCJzdHVkaW9BamF4R2V0IiwidXJsIiwiZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdWJzY3JpYmUiLCJuZXh0IiwiZXJyb3IiLCJmZXRjaCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsIkFjY2VwdCIsInRoZW4iLCJqc29uIiwic3RhdHVzIiwic3R1ZGlvQWpheFBvc3QiLCJwYXlsb2FkIiwiX3R5cGVvZiIsIkpTT04iLCJzdHJpbmdpZnkiLCJoIiwicG9zdCIsIm1ldGhvZCIsInVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkiLCJvayIsImZldGNoVHJhbnNsYXRpb25SZW1vdmVDYW5kaWRhdGVzIiwic3R1ZGlvQmFzZSIsInBhZ2VQYXRoIiwibWVzc2FnZSIsImNhbmRpZGF0ZXMiLCJwb3N0VHJhbnNsYXRpb25SZW1vdmUiLCJjb21wb25lbnRQYXRocyIsImRlbGV0ZVBhZ2UiLCJkZWxldGVkIiwiZmFpbGVkIiwiaXNQYWdlVHJhbnNsYXRpb25Sb3ciLCJ0YXJnZXRQYXRoIiwiY29udGVudFR5cGVJZCIsImN0IiwiZW5kc1dpdGgiLCJleHRyYWN0UGF0aHNGcm9tU2VhcmNoSXRlbXMiLCJpdGVtcyIsIml0ZW0iLCJsb2NhbElkIiwicHVzaCIsImV4dHJhY3RQYXRoc0Zyb21QbHVnaW5SZXN1bHQiLCJpdCIsImZldGNoVHJhbnNsYXRpb25TaWJsaW5nc0Zyb21QbHVnaW4iLCJjb250ZW50VHlwZSIsImxvY2FsZVNvdXJjZUlkIiwib2JqZWN0SWQiLCJsaWQiLCJvaWQiLCJzZWFyY2hQYXRoc0J5TG9jYWxlU291cmNlSWQiLCJwb3N0U2VhcmNoIiwia2V5d29yZHMiLCJvZmZzZXQiLCJsaW1pdCIsImZpbHRlcnMiLCJsb2NhbGVTb3VyY2VJZF9zIiwiYm9keTIiLCJpdGVtczIiLCJmbGFnRm9yTG9jYWxlQ29kZSIsImxvY2FsZUNvZGUiLCJtYXAiLCJlbiIsImVzIiwiZGUiLCJ6aCIsImNuIiwiamEiLCJmciIsInB0Iiwia28iLCJhciIsImZldGNoVHJhbnNsYXRpb25Db25maWciLCJBcnJheSIsImlzQXJyYXkiLCJsYW5ndWFnZXMiLCJjb2RlcyIsIm1ldGEiLCJsYyIsImJhc2VSYXciLCJiYXNlTGFuZ3VhZ2UiLCJiYXNlTG9jYWxlIiwiVFJBTlNMQVRJT05TX1BBR0VfU0laRSIsImxvY2FsZUxhYmVsRm9yUGF0aCIsInNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheSIsInNvdXJjZUxvY2FsZUtleSIsIm9yZGVyZWRMb2NhbGVDb2RlcyIsIm9yZGVyIiwib3JkZXJJbmRleCIsImkiLCJjb25maWdSYW5rIiwiY2hhckNvZGVBdCIsImFyciIsImlzU291cmNlUGF0aCIsInNvcnQiLCJhcyIsImJzIiwicmEiLCJyYiIsImxhIiwibGIiLCJjbXAiLCJsb2NhbGVDb21wYXJlIiwic2Vuc2l0aXZpdHkiLCJmaWx0ZXJUcmFuc2xhdGlvblBhdGhzIiwicXVlcnkiLCJxIiwiZ2V0RGlzcGF0Y2giLCJkaXNwYXRjaCIsImJpbmQiLCJjb250ZW50RXhpc3RzIiwiYmFzZSIsInBhcnNlVGltZXN0YW1wTXMiLCJpbnB1dCIsImlzRmluaXRlIiwiYXNOdW0iLCJOdW1iZXIiLCJwYXJzZWQiLCJEYXRlIiwicGFyc2UiLCJnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAiLCJsYXN0TW9kaWZpZWREYXRlX2R0IiwibGFzdE1vZGlmaWVkRGF0ZSIsImxhc3RFZGl0RGF0ZSIsIm1vZGlmaWVkRGF0ZSIsImRhdGVNb2RpZmllZCIsImJ1aWxkTGVnYWN5UmVhZG9ubHlGb3JtU3JjIiwibm90aWZ5RGlzcGF0Y2giLCJvcGVuU3R1ZGlvRWRpdEZvcm0iLCJhdXRob3JpbmdCYXNlRm9yRGlhbG9nIiwiYWIiLCJzaXRlIiwiaXNIaWRkZW4iLCJvblNhdmVTdWNjZXNzIiwib25DYW5jZWwiLCJyZXNvbHZlVHJhbnNsYXRlQ29weVNvdXJjZVBhdGgiLCJ0cmFuc2xhdGlvbkNmZyIsInRyYW5zbGF0aW9uUGF0aHMiLCJyZXNvbHZlZFNvdXJjZUtleSIsImZyb21Tb3VyY2VMb2NhbGUiLCJmaW5kIiwicGFyZW50Rm9sZGVyUGF0aEZvckNvcHkiLCJsYXN0SW5kZXhPZiIsImNvcHlJdGVtUGFzdGVTdHVkaW8iLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGFyZW50UGF0aCIsImV4cGVjdGVkVGFyZ2V0UGF0aCIsIkFkZFRyYW5zbGF0aW9uTG9jYWxlQmFyIiwicHJvcHMiLCJ0cmFuc2xhdGVDb3B5U291cmNlUGF0aCIsImV4aXN0aW5nUGF0aHMiLCJvblRyYW5zbGF0ZWQiLCJ0cmFuc2xhdGlvbkNmZ1Byb3AiLCJsb2NhbGVDb2RlcyIsImxvY2FsZU1ldGEiLCJvcHRTdCIsInVzZVN0YXRlIiwib3B0aW9ucyIsInNldE9wdGlvbnMiLCJzZWxTdCIsInNlbGVjdGVkIiwic2V0U2VsZWN0ZWQiLCJsb2FkU3QiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImJ1c3lTdCIsImNvcHlCdXN5Iiwic2V0Q29weUJ1c3kiLCJmb2N1c1NlbFN0Iiwic2VsZWN0Rm9jdXNlZCIsInNldFNlbGVjdEZvY3VzZWQiLCJsb2FkVGFyZ2V0cyIsInVzZUNhbGxiYWNrIiwiZWZmU3VmZml4IiwiYXBwbHlDb2RlcyIsInJhd0NvZGVzIiwic2VlbiIsImFjdGl2ZUNvZGVzIiwiZmV0Y2hlZCIsInVzZUVmZmVjdCIsInJ1blRyYW5zbGF0ZSIsImNob2ljZSIsInBhcmVudCIsImNvbnRlbnRBcGlCYXNlIiwiZTEiLCJlZmZlY3RpdmVNaXJyb3JlZFN1ZmZpeCIsImhpbnQiLCJzZWxlY3REaXNhYmxlZCIsInNlbGVjdFN0eWxlIiwiYm94U2l6aW5nIiwibWluSGVpZ2h0IiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwicGFkZGluZyIsInBhZGRpbmdSaWdodCIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm94U2hhZG93Iiwib3V0bGluZSIsImN1cnNvciIsIm9wYWNpdHkiLCJhcHBlYXJhbmNlIiwiV2Via2l0QXBwZWFyYW5jZSIsIk1vekFwcGVhcmFuY2UiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kUmVwZWF0IiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiYmFja2dyb3VuZFNpemUiLCJ0cmFuc2l0aW9uIiwiYWN0aW9uc1Jvd1N0eWxlIiwiZGlzcGxheSIsImZsZXhXcmFwIiwiZ2FwIiwiYWxpZ25JdGVtcyIsImJhY2tncm91bmQiLCJzZWxlY3RXcmFwU3R5bGUiLCJidG5JY29uU3R5bGUiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhTaHJpbmsiLCJidG5QcmltYXJ5U3R5bGUiLCJmb250V2VpZ2h0IiwibGV0dGVyU3BhY2luZyIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsImRpc2FibGVkIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJvIiwib25DbGljayIsIlBJTExfU1RZTEVTIiwidGV4dFRyYW5zZm9ybSIsInNvdXJjZSIsImN1cnJlbnQiLCJST1dfU1VSRkFDRSIsIk1FTlVfVFJJR0dFUl9TVFlMRSIsIlRSQU5TTEFUSU9OX0lURU1fTUVOVV9MQUJFTFMiLCJlZGl0IiwidmlldyIsImhpc3RvcnkiLCJkZXBlbmRlbmNpZXMiLCJwdWJsaXNoIiwiYXBwcm92ZSIsInByZXZpZXciLCJub3JtYWxpemVNZWdhTWVudUxhYmVsIiwiaXNBbGxvd2VkTWVnYU1lbnVMYWJlbCIsImhpZGVFZGl0IiwidHh0IiwiZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51Iiwibm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2NoZWR1bGVFbmZvcmNlQWxsb3dlZEl0ZW1zSW5NZWdhTWVudSIsInNldFRpbWVvdXQiLCJUcmFuc2xhdGlvblZlcnNpb25Sb3ciLCJpc1NvdXJjZSIsImlzT3V0ZGF0ZWQiLCJvblRyYW5zbGF0ZSIsInRyYW5zbGF0ZUJ1c3kiLCJzaG93UmVtb3ZlVHJhbnNsYXRpb24iLCJvblJlbW92ZVRyYW5zbGF0aW9uIiwiaXNDdXJyZW50Um93IiwiaXNDb21wYXJlU2VsZWN0ZWQiLCJyb3dDbGlja2FibGUiLCJyb3dTdHlsZSIsImJvcmRlckNvbG9yIiwic2hvd1N0dWRpb0l0ZW1NZWdhTWVudSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwidG9wIiwiY2xpZW50WSIsImFuY2hvclJlZmVyZW5jZSIsImFuY2hvclBvc2l0aW9uIiwib25BY3RpdmF0ZSIsIm9uS2V5RG93biIsIm1hcmdpbkxlZnQiLCJ3aGl0ZVNwYWNlIiwiVHJhbnNsYXRpb25WZXJzaW9uc1BhbmVsIiwibW9kZWwiLCJyZXNvbHZlZENvbnRlbnRUeXBlSWQiLCJzb3VyY2VMb2NhbGUiLCJzb3VyY2VMb2NhbGVDb2RlX3MiLCJtb2RlbExvY2FsZSIsImxvY2FsZUNvZGVfcyIsInBhdGhMb2NhbGUiLCJyZXNvbHZlZFNvdXJjZSIsImF1dGhvcmluZ0Jhc2VTdGF0ZSIsInNldEF1dGhvcmluZ0Jhc2UiLCJwYXRoc1N0YXRlIiwic2V0VHJhbnNsYXRpb25QYXRocyIsImxvYWRpbmdTdGF0ZSIsImZpbHRlclN0YXRlIiwiZmlsdGVyUXVlcnkiLCJzZXRGaWx0ZXJRdWVyeSIsInBhZ2VTdGF0ZSIsInBhZ2VJbmRleCIsInNldFBhZ2VJbmRleCIsImxpc3RSZWZyZXNoU3QiLCJ0cmFuc2xhdGlvbkxpc3RSZWZyZXNoS2V5IiwiYnVtcFRyYW5zbGF0aW9uTGlzdCIsInRyYW5zbGF0aW9uQ2ZnU3QiLCJzZXRUcmFuc2xhdGlvbkNmZyIsInN0YWxlQnlQYXRoU3QiLCJzdGFsZUJ5UGF0aCIsInNldFN0YWxlQnlQYXRoIiwiZXhpc3RzQnlQYXRoU3QiLCJleGlzdHNCeVBhdGgiLCJzZXRFeGlzdHNCeVBhdGgiLCJjb21wYXJlUGF0aFN0IiwiY29tcGFyZVNvdXJjZVBhdGgiLCJzZXRDb21wYXJlU291cmNlUGF0aCIsInJlbW92ZU1vZGFsU3QiLCJyZW1vdmVNb2RhbCIsInNldFJlbW92ZU1vZGFsIiwicm93VHJhbnNsYXRlQnVzeVN0Iiwicm93VHJhbnNsYXRlQnVzeVBhdGgiLCJzZXRSb3dUcmFuc2xhdGVCdXN5UGF0aCIsImNvbGxhcHNlZFN0Iiwid2lkZ2V0Q29sbGFwc2VkIiwic2V0V2lkZ2V0Q29sbGFwc2VkIiwib25TdG9yYWdlIiwibmV4dENvbGxhcHNlZCIsIm5ld1ZhbHVlIiwib25DdXN0b20iLCJ0b2dnbGVXaWRnZXRDb2xsYXBzZWQiLCJwcmV2IiwiY3VycmVudExvY2FsZSIsImFjdGl2ZSIsImNmZyIsImNhbmNlbGxlZCIsImZpbmlzaCIsImxzaWQiLCJjdHlwZSIsImN1ciIsInBhdGhPa0ZvckxvY2FsZVByb2JlIiwicnVuRmFsbGJhY2siLCJtZXJnZVBhdGhzQW5kRmluaXNoIiwiYWxsIiwicmVzdWx0cyIsImFwcGx5TWFwIiwiY2ZnQ29kZXMiLCJmb3VuZCIsImxlZ2FjeVBhdGhzIiwiY29uY2F0Iiwic291cmNlTXMiLCJ0YXJnZXRNcyIsInBhaXJzIiwib25DbG9zZUNvbXBhcmUiLCJjbG9zZVJlbW92ZVRyYW5zbGF0aW9uTW9kYWwiLCJvcGVuUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCIsInRwIiwibWV0YUxhYmVsIiwic2VsZWN0ZWRQYXRocyIsInN1Ym1pdHRpbmciLCJzYiIsInNlbCIsInRvZ2dsZVJlbW92ZUNhbmRpZGF0ZSIsImNoZWNrZWQiLCJuZXh0U2VsIiwic2V0QWxsUmVtb3ZlQ2FuZGlkYXRlcyIsImNvbmZpcm1SZW1vdmVUcmFuc2xhdGlvbiIsImRlbGV0ZWRQYWdlIiwic29tZSIsIm1zZyIsImYiLCJydW5UcmFuc2xhdGVGb3JSb3ciLCJwYXRoTGF5b3V0Tm90ZSIsInNvcnRlZFBhdGhzIiwiZmlsdGVyZWRQYXRocyIsInRyYW5zbGF0ZWRPbmx5UGF0aHMiLCJleCIsImFjdGl2ZUxvY2FsZU1ldGEiLCJ0b3RhbEZpbHRlcmVkIiwidG90YWxQYWdlcyIsImNlaWwiLCJzYWZlUGFnZSIsInBhZ2VTdGFydCIsInBhZ2VTbGljZSIsInJhbmdlRnJvbSIsInJhbmdlVG8iLCJmaWx0ZXJUb29sYmFyIiwicGxhY2Vob2xkZXIiLCJwYWdpbmF0aW9uQmFyIiwib25UcmFuc2xhdGlvblJvd0FjdGl2YXRlIiwiaW5mbyIsImxpc3RTZWN0aW9uIiwicG9zaXRpb24iLCJwb2ludGVyRXZlbnRzIiwicmlnaHQiLCJ6SW5kZXgiLCJhdXRob3JpbmdCYXNlUmVzb2x2ZWQiLCJhZGRUcmFuc2xhdGlvbkJhciIsImNvbXBhcmVMYXlvdXRCb2R5IiwicmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsIiwicm0iLCJjYW5kaWRhdGVSb3dzIiwicHRoIiwid29yZEJyZWFrIiwiaW50ZXJuYWxOYW1lIiwiaW5zZXQiLCJjdXJyZW50VGFyZ2V0IiwibWF4SGVpZ2h0IiwiZmxleERpcmVjdGlvbiIsIm92ZXJmbG93IiwiYm9yZGVyQm90dG9tIiwibWFyZ2luIiwib3ZlcmZsb3dZIiwiYm9yZGVyVG9wIiwidGV4dEFsaWduIiwidHJhbnNmb3JtIiwiQ1N0dWRpb0Zvcm1zIiwiQ29udHJvbHMiLCJUcmFuc2xhdGlvblZlcnNpb25zIiwib3duZXIiLCJwcm9wZXJ0aWVzIiwiY29uc3RyYWludHMiLCJyZWdpc3RlckZpZWxkIiwiZXJyb3JzIiwicmVxdWlyZWQiLCJzdXBwb3J0ZWRQb3N0Rml4ZXMiLCJZQUhPTyIsImV4dGVuZCIsIkNTdHVkaW9Gb3JtRmllbGQiLCJnZXRMYWJlbCIsIl9yZW5kZXIiLCJzZWxmIiwicGFuZWxQcm9wcyIsIl9jbXNSZW5kZXJIYW5kbGUiLCJ1bm1vdW50IiwicmVtb3ZlQ29udGFpbmVyIiwicmVuZGVyIiwiVHJhbnNsYXRpb25WZXJzaW9uc0JyaWRnZSIsImhhbmRsZSIsImVyciIsImNvbnNvbGUiLCJpbm5lckhUTUwiLCJyZWZyZXNoIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImdldE5hbWUiLCJnZXRTdXBwb3J0ZWRQcm9wZXJ0aWVzIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJnZXRTdXBwb3J0ZWRQb3N0Rml4ZXMiLCJDU3R1ZGlvQXV0aG9yaW5nIiwiTW9kdWxlIiwibW9kdWxlTG9hZGVkIiwib25jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztFQUVBLFNBQVNBLDhCQUE4QkEsR0FBRztFQUN4QyxFQUFBLElBQUlDLEtBQUssR0FBR0MsY0FBYyxDQUFDRCxLQUFLLENBQUE7SUFFaEMsSUFBSUUsZ0JBQWdCLEdBQUcsNENBQTRDLENBQUE7SUFDbkUsU0FBU0MsbUJBQW1CQSxHQUFHO0VBQzdCLElBQUEsSUFBSSxPQUFPQyxRQUFRLEtBQUssV0FBVyxFQUFFLE9BQUE7RUFDckMsSUFBQSxJQUFJQSxRQUFRLENBQUNDLGNBQWMsQ0FBQ0gsZ0JBQWdCLENBQUMsRUFBRSxPQUFBO0VBQy9DLElBQUEsSUFB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LGVBQWUsRUFBRSxDQUFDO0VBQ2xCQyxJQUFBQSxTQUFTLEVBQUUsQ0FBQztFQUNaQyxJQUFBQSxPQUFPLEVBQUUsQ0FBQztFQUNWQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQTtLQUNULENBQUE7SUFJRCxJQUFJQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJ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QUFBQSxLQUFLLEVBQUUsbUJBQW1CO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3JELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsaUJBQWlCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ25ELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsb0JBQW9CO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsc0JBQXNCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3hELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsOEJBQThCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ2hFLElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsbUJBQW1CO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3JELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsaUJBQWlCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ25ELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUscUJBQXFCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsb0JBQW9CO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3RELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUsa0JBQWtCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3BELElBQUEsT0FBTyxFQUFFO0VBQUVuQixNQUFBQSxLQUFLLEVBQUUscUJBQXFCO0VBQUVtQixNQUFBQSxJQUFJLEVBQUUsTUFBQTtPQUFRO0VBQ3ZE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
