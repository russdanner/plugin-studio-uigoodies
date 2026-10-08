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

    /**
     * GET translation-locales: config ({ baseLocale, codes, meta }) plus one row per configured locale for `path`
     * ({ locale, path, exists, isOutdated, isSource, isCurrent, ... }). `overrides` carry unsaved form values.
     */
    function fetchTranslationLocales(studioBase, siteId, path, overrides) {
      if (!studioBase || !siteId) return Promise.resolve(null);
      var o = overrides || {};
      var qs = ["siteId=" + encodeURIComponent(siteId)];
      if (path) qs.push("path=" + encodeURIComponent(path));
      ["contentType", "localeSourceId", "objectId", "sourceLocale"].forEach(function (k) {
        var v = o[k] != null ? String(o[k]).trim() : "";
        if (v) qs.push(k + "=" + encodeURIComponent(v));
      });
      var url = studioBase + "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-locales?" + qs.join("&");
      return studioAjaxGet(url).then(unwrapAjaxResponse).then(function (body) {
        var p = unwrapPluginScriptResultBody(body);
        if (!p || !p.ok) return null;
        var codes = [];
        var meta = {};
        (Array.isArray(p.languages) ? p.languages : []).forEach(function (row) {
          var lc = row && row.locale ? String(row.locale).toLowerCase() : "";
          if (!lc) return;
          if (codes.indexOf(lc) < 0) codes.push(lc);
          meta[lc] = {
            label: row && row.label || lc,
            flag: row && row.flag && String(row.flag).trim() ? String(row.flag).trim() : flagForLocaleCode(lc)
          };
        });
        var cfg = null;
        if (codes.length) {
          var baseLocale = p.baseLanguage ? String(p.baseLanguage).trim().toLowerCase() : codes[0];
          if (codes.indexOf(baseLocale) < 0) baseLocale = codes[0];
          cfg = {
            baseLocale: baseLocale,
            codes: codes,
            meta: meta
          };
        }
        return {
          cfg: cfg,
          locales: Array.isArray(p.locales) ? p.locales : []
        };
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
      loadSt[1];
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
        if (!translationCfgProp || !translationCfgProp.codes || !translationCfgProp.codes.length) {
          setOptions([]);
          return Promise.resolve();
        }
        return applyCodes(translationCfgProp.meta || localeMeta, translationCfgProp.codes);
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
      (pathLocale || modelLocale || "").toLowerCase();
      React.useEffect(function () {
        setPageIndex(0);
      }, [translationPaths, filterQuery]);
      React.useEffect(function () {
        setCompareSourcePath(null);
      }, [formPath]);

      /** One server call: translation config + every locale variant of this item (lineage, exists, outdated). */
      React.useEffect(function () {
        var cancelled = false;
        setAuthoringBase(getAuthoringBase());
        if (!siteId || !formPath) {
          setTranslationPaths([]);
          setExistsByPath({});
          setStaleByPath({});
          setLoading(false);
          return function () {
            cancelled = true;
          };
        }
        setLoading(true);
        fetchTranslationLocales(getStudioApiBase(), siteId, formPath, {
          contentType: resolvedContentTypeId,
          localeSourceId: model.localeSourceId_s,
          objectId: model.objectId,
          sourceLocale: resolvedSourceKey
        }).then(function (res) {
          if (cancelled) return;
          if (res && res.cfg) {
            setTranslationCfg(res.cfg);
          }
          var paths = {};
          var exists = {};
          var stale = {};
          (res && res.locales || []).forEach(function (row) {
            if (!row || !row.path) return;
            exists[row.path] = !!row.exists;
            stale[row.path] = !!row.isOutdated;
            if (row.exists) paths[row.path] = true;
          });
          paths[formPath] = true;
          exists[formPath] = true;
          setExistsByPath(exists);
          setStaleByPath(stale);
          setTranslationPaths(sortTranslationPathsForDisplay(Object.keys(paths), resolvedSourceKey, res && res.cfg && res.cfg.codes));
        })["catch"](function () {
          if (cancelled) return;
          setTranslationPaths([formPath]);
          setExistsByPath({});
          setStaleByPath({});
        })["finally"](function () {
          if (!cancelled) setLoading(false);
        });
        return function () {
          cancelled = true;
        };
      }, [formPath, siteId, model.localeSourceId_s, model.objectId, resolvedContentTypeId, resolvedSourceKey, translationListRefreshKey]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3BhY2thZ2VzL3RyYW5zbGF0aW9uLXZlcnNpb25zL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBib290VHJhbnNsYXRpb25WZXJzaW9uc0NvbnRyb2woKSB7XG4gIHZhciBSZWFjdCA9IENyYWZ0ZXJDTVNOZXh0LlJlYWN0O1xuXG4gIHZhciBTUElOTkVSX1NUWUxFX0lEID0gXCJ1aWdvb2RpZXMtdHJhbnNsYXRpb24tdmVyc2lvbnMtc3Bpbm5lci1jc3NcIjtcbiAgZnVuY3Rpb24gZW5zdXJlU3Bpbm5lclN0eWxlcygpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFNQSU5ORVJfU1RZTEVfSUQpKSByZXR1cm47XG4gICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLmlkID0gU1BJTk5FUl9TVFlMRV9JRDtcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9XG4gICAgICBcIjpyb290LC50cmFuc2xhdGlvbi12ZXJzaW9ucy1jb250cm9se1wiICtcbiAgICAgIFwiLS10di1iZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di1oZWFkZXI6I2Y4ZjlmYTtcIiArXG4gICAgICBcIi0tdHYtcGFwZXI6I2Y5ZjlmOTtcIiArXG4gICAgICBcIi0tdHYtcGFwZXItMjojZmFmYWZhO1wiICtcbiAgICAgIFwiLS10di1lbGV2YXRlZDojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di10ZXh0OiMyMTI1Mjk7XCIgK1xuICAgICAgXCItLXR2LXRleHQtbXV0ZWQ6IzQ5NTA1NztcIiArXG4gICAgICBcIi0tdHYtdGV4dC1zb2Z0OiM2NDc0OGI7XCIgK1xuICAgICAgXCItLXR2LXRleHQtZGltOiM1NTU1NTU7XCIgK1xuICAgICAgXCItLXR2LWJvcmRlcjojZGVlMmU2O1wiICtcbiAgICAgIFwiLS10di1ib3JkZXItc29mdDojZTllY2VmO1wiICtcbiAgICAgIFwiLS10di1ib3JkZXItaW5wdXQ6I2UyZThmMDtcIiArXG4gICAgICBcIi0tdHYtYm9yZGVyLXJvdzojZTBlMGUwO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC1iZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC1iZy1kaXNhYmxlZDojZjhmYWZjO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC10ZXh0OiMwZjE3MmE7XCIgK1xuICAgICAgXCItLXR2LWJ0bi1pY29uLWJnOiNmZmZmZmY7XCIgK1xuICAgICAgXCItLXR2LWJ0bi1pY29uLWZnOiM0NzU1Njk7XCIgK1xuICAgICAgXCItLXR2LWFjdGlvbnMtYmc6bGluZWFyLWdyYWRpZW50KDE4MGRlZywjZmZmZmZmIDAlLCNmOGZhZmMgMTAwJSk7XCIgK1xuICAgICAgXCItLXR2LWFjdGlvbnMtYm9yZGVyOiNlOGVhZWQ7XCIgK1xuICAgICAgXCItLXR2LWJ1c3ktY2hpcC1iZzpyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpO1wiICtcbiAgICAgIFwiLS10di1zZWxlY3QtZm9jdXM6IzNiODJmNjtcIiArXG4gICAgICBcIi0tdHYtY29tcGFyZS1zZWxlY3RlZC1iZzojZjhmYWZjO1wiICtcbiAgICAgIFwiLS10di1waWxsLXNvdXJjZS1iZzojZThmMWZmO1wiICtcbiAgICAgIFwiLS10di1waWxsLXNvdXJjZS1mZzojMGQ0ZWE2O1wiICtcbiAgICAgIFwiLS10di1waWxsLXNvdXJjZS1iZDojYjZkNGZlO1wiICtcbiAgICAgIFwiLS10di1waWxsLWN1cnJlbnQtYmc6I2Y2ZmZlZDtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1jdXJyZW50LWZnOiMyMzc4MDQ7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtY3VycmVudC1iZDojYjdlYjhmO1wiICtcbiAgICAgIFwiLS10di1waWxsLW91dGRhdGVkLWJnOiNmZmY3ZTY7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtb3V0ZGF0ZWQtZmc6I2FkNjgwMDtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1vdXRkYXRlZC1iZDojZmZkNTkxO1wiICtcbiAgICAgIFwiLS10di13YXJuLWJnOiNmZmZiZTY7XCIgK1xuICAgICAgXCItLXR2LXdhcm4tZmc6IzhjNGEwMDtcIiArXG4gICAgICBcIi0tdHYtd2Fybi1iZDojZmZlNThmO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1iZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1ib3JkZXI6I2VlZWVlZTtcIiArXG4gICAgICBcIi0tdHYtcmVzaXplOiNlOWVjZWY7XCIgK1xuICAgICAgXCItLXR2LXJlc2l6ZS1iZDojY2ZkNGRiO1wiICtcbiAgICAgIFwiLS10di1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMTUsMjMsNDIsMC4wNik7XCIgK1xuICAgICAgXCItLXR2LXNoYWRvdy1jaGlwOjAgMXB4IDJweCByZ2JhKDE1LDIzLDQyLDAuMDgpO1wiICtcbiAgICAgIFwiLS10di1pbnB1dC1pbnNldDppbnNldCAwIDFweCAycHggcmdiYSgxNSwyMyw0MiwwLjA0KTtcIiArXG4gICAgICBcIi0tdHYtc2VsZWN0LWNoZXZyb246dXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsXCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzY0NzQ4YlwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTYgOWw2IDYgNi02XCIvPjwvc3ZnPidcbiAgICAgICkgK1xuICAgICAgXCJcXFwiKTtcIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspe1wiICtcbiAgICAgIFwiOnJvb3QsLnRyYW5zbGF0aW9uLXZlcnNpb25zLWNvbnRyb2x7XCIgK1xuICAgICAgXCItLXR2LWJnOiMxZTFlMWU7XCIgK1xuICAgICAgXCItLXR2LWhlYWRlcjojMmEyYTJhO1wiICtcbiAgICAgIFwiLS10di1wYXBlcjojMjUyNTI1O1wiICtcbiAgICAgIFwiLS10di1wYXBlci0yOiMyYTJhMmE7XCIgK1xuICAgICAgXCItLXR2LWVsZXZhdGVkOiMyZDJkMmQ7XCIgK1xuICAgICAgXCItLXR2LXRleHQ6I2U4ZWFlZDtcIiArXG4gICAgICBcIi0tdHYtdGV4dC1tdXRlZDojYjBiNGJhO1wiICtcbiAgICAgIFwiLS10di10ZXh0LXNvZnQ6IzlhYTBhNjtcIiArXG4gICAgICBcIi0tdHYtdGV4dC1kaW06I2E4YWRiNDtcIiArXG4gICAgICBcIi0tdHYtYm9yZGVyOiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LWJvcmRlci1zb2Z0OiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LWJvcmRlci1pbnB1dDojNWY2MzY4O1wiICtcbiAgICAgIFwiLS10di1ib3JkZXItcm93OiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LWJnOiMyZDJkMmQ7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LWJnLWRpc2FibGVkOiMyNTI1MjU7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LXRleHQ6I2U4ZWFlZDtcIiArXG4gICAgICBcIi0tdHYtYnRuLWljb24tYmc6IzJkMmQyZDtcIiArXG4gICAgICBcIi0tdHYtYnRuLWljb24tZmc6I2M0YzdjYztcIiArXG4gICAgICBcIi0tdHYtYWN0aW9ucy1iZzpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCMyZDJkMmQgMCUsIzI1MjUyNSAxMDAlKTtcIiArXG4gICAgICBcIi0tdHYtYWN0aW9ucy1ib3JkZXI6IzNjNDA0MztcIiArXG4gICAgICBcIi0tdHYtYnVzeS1jaGlwLWJnOnJnYmEoNDUsNDUsNDUsMC45NCk7XCIgK1xuICAgICAgXCItLXR2LXNlbGVjdC1mb2N1czojNjBhNWZhO1wiICtcbiAgICAgIFwiLS10di1jb21wYXJlLXNlbGVjdGVkLWJnOiMxZTNhNWY7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtc291cmNlLWJnOnJnYmEoNTksMTMwLDI0NiwwLjIyKTtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1zb3VyY2UtZmc6IzkzYzVmZDtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1zb3VyY2UtYmQ6cmdiYSgxNDcsMTk3LDI1MywwLjQ1KTtcIiArXG4gICAgICBcIi0tdHYtcGlsbC1jdXJyZW50LWJnOnJnYmEoMzQsMTk3LDk0LDAuMik7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtY3VycmVudC1mZzojODZlZmFjO1wiICtcbiAgICAgIFwiLS10di1waWxsLWN1cnJlbnQtYmQ6cmdiYSgxMzQsMjM5LDE3MiwwLjQpO1wiICtcbiAgICAgIFwiLS10di1waWxsLW91dGRhdGVkLWJnOnJnYmEoMjQ1LDE1OCwxMSwwLjIpO1wiICtcbiAgICAgIFwiLS10di1waWxsLW91dGRhdGVkLWZnOiNmY2QzNGQ7XCIgK1xuICAgICAgXCItLXR2LXBpbGwtb3V0ZGF0ZWQtYmQ6cmdiYSgyNTIsMjExLDc3LDAuNCk7XCIgK1xuICAgICAgXCItLXR2LXdhcm4tYmc6cmdiYSgyNDUsMTU4LDExLDAuMTUpO1wiICtcbiAgICAgIFwiLS10di13YXJuLWZnOiNmY2QzNGQ7XCIgK1xuICAgICAgXCItLXR2LXdhcm4tYmQ6cmdiYSgyNTIsMjExLDc3LDAuMzUpO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1iZzojMmQyZDJkO1wiICtcbiAgICAgIFwiLS10di1tb2RhbC1ib3JkZXI6IzNjNDA0MztcIiArXG4gICAgICBcIi0tdHYtcmVzaXplOiMzYzQwNDM7XCIgK1xuICAgICAgXCItLXR2LXJlc2l6ZS1iZDojNWY2MzY4O1wiICtcbiAgICAgIFwiLS10di1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsMC40NSk7XCIgK1xuICAgICAgXCItLXR2LXNoYWRvdy1jaGlwOjAgMXB4IDJweCByZ2JhKDAsMCwwLDAuNCk7XCIgK1xuICAgICAgXCItLXR2LWlucHV0LWluc2V0Omluc2V0IDAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMzUpO1wiICtcbiAgICAgIFwiLS10di1zZWxlY3QtY2hldnJvbjp1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCxcIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjOWFhMGE2XCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNNiA5bDYgNiA2LTZcIi8+PC9zdmc+J1xuICAgICAgKSArXG4gICAgICBcIlxcXCIpO1wiICtcbiAgICAgIFwifVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy10di1zcGlubmVye2JvcmRlci1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMjIpO2JvcmRlci10b3AtY29sb3I6IzYwYTVmYX1cIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIkBrZXlmcmFtZXMgdWlnb29kaWVzLXR2LXNwaW57dG97dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtdHYtc3Bpbm5lcntkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlcjoycHggc29saWQgcmdiYSgxNSwyMyw0MiwwLjE4KTtcIiArXG4gICAgICBcImJvcmRlci10b3AtY29sb3I6IzI1NjNlYjtib3JkZXItcmFkaXVzOjUwJTthbmltYXRpb246dWlnb29kaWVzLXR2LXNwaW4gMC43cyBsaW5lYXIgaW5maW5pdGU7XCIgK1xuICAgICAgXCJ2ZXJ0aWNhbC1hbGlnbjotMnB4O2ZsZXgtc2hyaW5rOjB9XCIgK1xuICAgICAgXCIudWlnb29kaWVzLXR2LXNwaW5uZXItLWxpZ2h0e2JvcmRlci1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMzUpO2JvcmRlci10b3AtY29sb3I6I2ZmZn1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtdHYtYnVzeXtkaXNwbGF5OmlubGluZS1mbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4fVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy10di1wYWdlci1idG57ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtcIiArXG4gICAgICBcIm1pbi1oZWlnaHQ6MjhweDtwYWRkaW5nOjRweCAxMHB4O2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEuMjtib3JkZXItcmFkaXVzOjZweDtcIiArXG4gICAgICBcImJvcmRlcjoxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyKTtiYWNrZ3JvdW5kOnZhcigtLXR2LWJ0bi1pY29uLWJnKTtjb2xvcjp2YXIoLS10di1idG4taWNvbi1mZyk7XCIgK1xuICAgICAgXCJjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OnZhcigtLXR2LXNoYWRvdy1jaGlwKX1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtdHYtcGFnZXItYnRuOmhvdmVyOm5vdCg6ZGlzYWJsZWQpe2JvcmRlci1jb2xvcjp2YXIoLS10di1ib3JkZXItaW5wdXQpfVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy10di1wYWdlci1idG46ZGlzYWJsZWR7b3BhY2l0eTowLjQ1O2N1cnNvcjpub3QtYWxsb3dlZH1cIjtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuICBlbnN1cmVTcGlubmVyU3R5bGVzKCk7XG5cbiAgZnVuY3Rpb24gU3Bpbm5lckVsKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInVpZ29vZGllcy10di1zcGlubmVyXCIgKyAob3B0cy5saWdodCA/IFwiIHVpZ29vZGllcy10di1zcGlubmVyLS1saWdodFwiIDogXCJcIiksXG4gICAgICByb2xlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICBcImFyaWEtbGFiZWxcIjogb3B0cy5sYWJlbCB8fCBcIkxvYWRpbmdcIixcbiAgICAgIHN0eWxlOiBvcHRzLnNpemVcbiAgICAgICAgPyB7IHdpZHRoOiBvcHRzLnNpemUsIGhlaWdodDogb3B0cy5zaXplLCBib3JkZXJXaWR0aDogTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChvcHRzLnNpemUgLyA3KSkgfVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gQnVzeUxhYmVsKHRleHQsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwic3BhblwiLFxuICAgICAgeyBjbGFzc05hbWU6IFwidWlnb29kaWVzLXR2LWJ1c3lcIiB9LFxuICAgICAgU3Bpbm5lckVsKHsgbGlnaHQ6ICEhb3B0cy5saWdodCwgc2l6ZTogb3B0cy5zaXplLCBsYWJlbDogdGV4dCB9KSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRleHQpXG4gICAgKTtcbiAgfVxuXG4gIHZhciBSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyA9IHtcbiAgICB3ZWJzaXRlOiAxLFxuICAgIGNvbXBvbmVudHM6IDEsXG4gICAgXCJzdGF0aWMtYXNzZXRzXCI6IDEsXG4gICAgdGVtcGxhdGVzOiAxLFxuICAgIHNjcmlwdHM6IDEsXG4gICAgY29uZmlnOiAxXG4gIH07XG5cbiAgLyoqIEtlZXAgaW4gc3luYyB3aXRoIHRyYW5zbGF0aW9uLWNvbXBvbmVudHMgYGNvbmZpZy9tdWx0aUxvY2FsZUNvbmZpZy50c2AuICovXG4gIHZhciBCQVNFX0xPQ0FMRSA9IFwiZW5cIjtcbiAgdmFyIE1VTFRJX0xPQ0FMRV9DT0RFUyA9IFtcImFhXCIsXCJhYlwiLFwiYWRcIixcImFlXCIsXCJhZlwiLFwiYWdcIixcImFpXCIsXCJha1wiLFwiYWxcIixcImFtXCIsXCJhblwiLFwiYW9cIixcImFxXCIsXCJhclwiLFwiYXItYWVcIixcImFyLWJoXCIsXCJhci1kelwiLFwiYXItZWdcIixcImFyLWlxXCIsXCJhci1qb1wiLFwiYXIta3dcIixcImFyLWxiXCIsXCJhci1seVwiLFwiYXItbWFcIixcImFyLW9tXCIsXCJhci1xYVwiLFwiYXItc2FcIixcImFyLXN5XCIsXCJhci10blwiLFwiYXIteWVcIixcImFzXCIsXCJhdFwiLFwiYXVcIixcImF2XCIsXCJhd1wiLFwiYXhcIixcImF5XCIsXCJhelwiLFwiYmFcIixcImJiXCIsXCJiZFwiLFwiYmVcIixcImJmXCIsXCJiZ1wiLFwiYmhcIixcImJpXCIsXCJialwiLFwiYmxcIixcImJtXCIsXCJiblwiLFwiYm4tYmRcIixcImJuLWluXCIsXCJib1wiLFwiYnFcIixcImJyXCIsXCJic1wiLFwiYnRcIixcImJ2XCIsXCJid1wiLFwiYnlcIixcImJ6XCIsXCJjYVwiLFwiY2NcIixcImNkXCIsXCJjZVwiLFwiY2ZcIixcImNnXCIsXCJjaFwiLFwiY2lcIixcImNrXCIsXCJjbFwiLFwiY21cIixcImNuXCIsXCJjb1wiLFwiY29tbW9uXCIsXCJjclwiLFwiY3NcIixcImN1XCIsXCJjdlwiLFwiY3dcIixcImN4XCIsXCJjeVwiLFwiY3pcIixcImRhXCIsXCJkZVwiLFwiZGUtYXRcIixcImRlLWNoXCIsXCJkZS1kZVwiLFwiZGUtbGlcIixcImRlLWx1XCIsXCJkalwiLFwiZGtcIixcImRtXCIsXCJkb1wiLFwiZHZcIixcImR6XCIsXCJlY1wiLFwiZWVcIixcImVnXCIsXCJlaFwiLFwiZWxcIixcImVuXCIsXCJlbi1hdVwiLFwiZW4tYnpcIixcImVuLWNhXCIsXCJlbi1nYlwiLFwiZW4taGtcIixcImVuLWllXCIsXCJlbi1pblwiLFwiZW4tam1cIixcImVuLW15XCIsXCJlbi1uelwiLFwiZW4tcGhcIixcImVuLXNnXCIsXCJlbi10dFwiLFwiZW4tdXNcIixcImVuLXphXCIsXCJlbi16d1wiLFwiZW9cIixcImVyXCIsXCJlc1wiLFwiZXMtYXJcIixcImVzLWJvXCIsXCJlcy1jbFwiLFwiZXMtY29cIixcImVzLWNyXCIsXCJlcy1kb1wiLFwiZXMtZWNcIixcImVzLWVzXCIsXCJlcy1ndFwiLFwiZXMtaG5cIixcImVzLW14XCIsXCJlcy1uaVwiLFwiZXMtcGFcIixcImVzLXBlXCIsXCJlcy1wclwiLFwiZXMtcHlcIixcImVzLXN2XCIsXCJlcy11eVwiLFwiZXMtdmVcIixcImV0XCIsXCJldVwiLFwiZmFcIixcImZmXCIsXCJmaVwiLFwiZmpcIixcImZrXCIsXCJmbVwiLFwiZm9cIixcImZyXCIsXCJmci1iZVwiLFwiZnItY2FcIixcImZyLWNoXCIsXCJmci1mclwiLFwiZnItbHVcIixcImZyLW1jXCIsXCJmeVwiLFwiZ2FcIixcImdiXCIsXCJnZFwiLFwiZ2VcIixcImdmXCIsXCJnZ1wiLFwiZ2hcIixcImdpXCIsXCJnbFwiLFwiZ2xvYmFsXCIsXCJnbVwiLFwiZ25cIixcImdwXCIsXCJncVwiLFwiZ3JcIixcImdzXCIsXCJndFwiLFwiZ3VcIixcImd2XCIsXCJnd1wiLFwiZ3lcIixcImhhXCIsXCJoZVwiLFwiaGlcIixcImhrXCIsXCJobVwiLFwiaG5cIixcImhvXCIsXCJoclwiLFwiaHRcIixcImh1XCIsXCJoeVwiLFwiaHpcIixcImlhXCIsXCJpZFwiLFwiaWVcIixcImlnXCIsXCJpaVwiLFwiaWtcIixcImlsXCIsXCJpbVwiLFwiaW5cIixcImlvXCIsXCJpcVwiLFwiaXJcIixcImlzXCIsXCJpdFwiLFwiaXQtY2hcIixcIml0LWl0XCIsXCJpdVwiLFwiamFcIixcImphLWpwXCIsXCJqZVwiLFwiam1cIixcImpvXCIsXCJqcFwiLFwianZcIixcImthXCIsXCJrZVwiLFwia2dcIixcImtoXCIsXCJraVwiLFwia2pcIixcImtrXCIsXCJrbFwiLFwia21cIixcImtuXCIsXCJrb1wiLFwia28ta3JcIixcImtwXCIsXCJrclwiLFwia3NcIixcImt1XCIsXCJrdlwiLFwia3dcIixcImt5XCIsXCJrelwiLFwibGFcIixcImxiXCIsXCJsY1wiLFwibGdcIixcImxpXCIsXCJsa1wiLFwibG5cIixcImxvXCIsXCJsclwiLFwibHNcIixcImx0XCIsXCJsdVwiLFwibHZcIixcImx5XCIsXCJtYVwiLFwibWNcIixcIm1kXCIsXCJtZVwiLFwibWZcIixcIm1nXCIsXCJtaFwiLFwibWlcIixcIm1rXCIsXCJtbFwiLFwibW1cIixcIm1uXCIsXCJtb1wiLFwibXBcIixcIm1xXCIsXCJtclwiLFwibXNcIixcIm10XCIsXCJtdVwiLFwibXZcIixcIm13XCIsXCJteFwiLFwibXlcIixcIm16XCIsXCJuYVwiLFwibmJcIixcIm5iLW5vXCIsXCJuY1wiLFwibmRcIixcIm5lXCIsXCJuZlwiLFwibmdcIixcIm5pXCIsXCJubFwiLFwibmwtYmVcIixcIm5sLW5sXCIsXCJublwiLFwibm4tbm9cIixcIm5vXCIsXCJucFwiLFwibnJcIixcIm51XCIsXCJudlwiLFwibnlcIixcIm56XCIsXCJvY1wiLFwib2pcIixcIm9tXCIsXCJvclwiLFwib3NcIixcInBhXCIsXCJwZVwiLFwicGZcIixcInBnXCIsXCJwaFwiLFwicGlcIixcInBrXCIsXCJwbFwiLFwicG1cIixcInBuXCIsXCJwclwiLFwicHNcIixcInB0XCIsXCJwdC1hb1wiLFwicHQtYnJcIixcInB0LXB0XCIsXCJwd1wiLFwicHlcIixcInFhXCIsXCJxdVwiLFwicmVcIixcInJtXCIsXCJyblwiLFwicm9cIixcInJzXCIsXCJydVwiLFwicnUtcnVcIixcInJ3XCIsXCJzYVwiLFwic2JcIixcInNjXCIsXCJzZFwiLFwic2VcIixcInNnXCIsXCJzaFwiLFwic2hhcmVkXCIsXCJzaVwiLFwic2pcIixcInNrXCIsXCJzbFwiLFwic21cIixcInNuXCIsXCJzb1wiLFwic3FcIixcInNyXCIsXCJzc1wiLFwic3RcIixcInN1XCIsXCJzdlwiLFwic3YtZmlcIixcInN2LXNlXCIsXCJzd1wiLFwic3hcIixcInN5XCIsXCJzelwiLFwidGFcIixcInRjXCIsXCJ0ZFwiLFwidGVcIixcInRmXCIsXCJ0Z1wiLFwidGhcIixcInRpXCIsXCJ0alwiLFwidGtcIixcInRsXCIsXCJ0bVwiLFwidG5cIixcInRvXCIsXCJ0clwiLFwidHNcIixcInR0XCIsXCJ0dlwiLFwidHdcIixcInR5XCIsXCJ0elwiLFwidWFcIixcInVnXCIsXCJ1a1wiLFwidWstdWFcIixcInVtXCIsXCJ1clwiLFwidXNcIixcInV5XCIsXCJ1elwiLFwidmFcIixcInZjXCIsXCJ2ZVwiLFwidmdcIixcInZpXCIsXCJ2blwiLFwidm9cIixcInZ1XCIsXCJ3YVwiLFwid2ZcIixcIndvXCIsXCJ3c1wiLFwieGhcIixcInllXCIsXCJ5aVwiLFwieW9cIixcInl0XCIsXCJ6YVwiLFwiemhcIixcInpoLWNuXCIsXCJ6aC1oa1wiLFwiemgtbW9cIixcInpoLXNnXCIsXCJ6aC10d1wiLFwiem1cIixcInp1XCIsXCJ6d1wiXTtcbiAgdmFyIExPQ0FMRV9NRVRBID0ge1xuICAgIFwiYWFcIjogeyBsYWJlbDogXCJBZmFyXCIsIGZsYWc6IFwi8J+HqvCfh7lcIiB9LFxuICAgIFwiYWJcIjogeyBsYWJlbDogXCJBYmtoYXpcIiwgZmxhZzogXCLwn4es8J+HqlwiIH0sXG4gICAgXCJhZFwiOiB7IGxhYmVsOiBcIkFuZG9ycmFcIiwgZmxhZzogXCLwn4em8J+HqVwiIH0sXG4gICAgXCJhZVwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoVUFFKVwiLCBmbGFnOiBcIvCfh6bwn4eqXCIgfSxcbiAgICBcImFmXCI6IHsgbGFiZWw6IFwiQWZyaWthYW5zXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwiYWdcIjogeyBsYWJlbDogXCJBbnRpZ3VhIGFuZCBCYXJidWRhXCIsIGZsYWc6IFwi8J+HpvCfh6xcIiB9LFxuICAgIFwiYWlcIjogeyBsYWJlbDogXCJBbmd1aWxsYVwiLCBmbGFnOiBcIvCfh6bwn4euXCIgfSxcbiAgICBcImFrXCI6IHsgbGFiZWw6IFwiQWthblwiLCBmbGFnOiBcIvCfh6zwn4etXCIgfSxcbiAgICBcImFsXCI6IHsgbGFiZWw6IFwiQWxiYW5pYVwiLCBmbGFnOiBcIvCfh6bwn4exXCIgfSxcbiAgICBcImFtXCI6IHsgbGFiZWw6IFwiQW1oYXJpY1wiLCBmbGFnOiBcIvCfh6rwn4e5XCIgfSxcbiAgICBcImFuXCI6IHsgbGFiZWw6IFwiQXJhZ29uZXNlXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiYW9cIjogeyBsYWJlbDogXCJBbmdvbGFcIiwgZmxhZzogXCLwn4em8J+HtFwiIH0sXG4gICAgXCJhcVwiOiB7IGxhYmVsOiBcIkFudGFyY3RpY2FcIiwgZmxhZzogXCLwn4em8J+HtlwiIH0sXG4gICAgXCJhclwiOiB7IGxhYmVsOiBcIkFyYWJpY1wiLCBmbGFnOiBcIvCfh7jwn4emXCIgfSxcbiAgICBcImFyLWFlXCI6IHsgbGFiZWw6IFwiQXJhYmljIChVQUUpXCIsIGZsYWc6IFwi8J+HpvCfh6pcIiB9LFxuICAgIFwiYXItYmhcIjogeyBsYWJlbDogXCJBcmFiaWMgKEJhaHJhaW4pXCIsIGZsYWc6IFwi8J+Hp/Cfh61cIiB9LFxuICAgIFwiYXItZHpcIjogeyBsYWJlbDogXCJBcmFiaWMgKEFsZ2VyaWEpXCIsIGZsYWc6IFwi8J+HqfCfh79cIiB9LFxuICAgIFwiYXItZWdcIjogeyBsYWJlbDogXCJBcmFiaWMgKEVneXB0KVwiLCBmbGFnOiBcIvCfh6rwn4esXCIgfSxcbiAgICBcImFyLWlxXCI6IHsgbGFiZWw6IFwiQXJhYmljIChJcmFxKVwiLCBmbGFnOiBcIvCfh67wn4e2XCIgfSxcbiAgICBcImFyLWpvXCI6IHsgbGFiZWw6IFwiQXJhYmljIChKb3JkYW4pXCIsIGZsYWc6IFwi8J+Hr/Cfh7RcIiB9LFxuICAgIFwiYXIta3dcIjogeyBsYWJlbDogXCJBcmFiaWMgKEt1d2FpdClcIiwgZmxhZzogXCLwn4ew8J+HvFwiIH0sXG4gICAgXCJhci1sYlwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoTGViYW5vbilcIiwgZmxhZzogXCLwn4ex8J+Hp1wiIH0sXG4gICAgXCJhci1seVwiOiB7IGxhYmVsOiBcIkFyYWJpYyAoTGlieWEpXCIsIGZsYWc6IFwi8J+HsfCfh75cIiB9LFxuICAgIFwiYXItbWFcIjogeyBsYWJlbDogXCJBcmFiaWMgKE1vcm9jY28pXCIsIGZsYWc6IFwi8J+HsvCfh6ZcIiB9LFxuICAgIFwiYXItb21cIjogeyBsYWJlbDogXCJBcmFiaWMgKE9tYW4pXCIsIGZsYWc6IFwi8J+HtPCfh7JcIiB9LFxuICAgIFwiYXItcWFcIjogeyBsYWJlbDogXCJBcmFiaWMgKFFhdGFyKVwiLCBmbGFnOiBcIvCfh7bwn4emXCIgfSxcbiAgICBcImFyLXNhXCI6IHsgbGFiZWw6IFwiQXJhYmljIChTYXVkaSBBcmFiaWEpXCIsIGZsYWc6IFwi8J+HuPCfh6ZcIiB9LFxuICAgIFwiYXItc3lcIjogeyBsYWJlbDogXCJBcmFiaWMgKFN5cmlhKVwiLCBmbGFnOiBcIvCfh7jwn4e+XCIgfSxcbiAgICBcImFyLXRuXCI6IHsgbGFiZWw6IFwiQXJhYmljIChUdW5pc2lhKVwiLCBmbGFnOiBcIvCfh7nwn4ezXCIgfSxcbiAgICBcImFyLXllXCI6IHsgbGFiZWw6IFwiQXJhYmljIChZZW1lbilcIiwgZmxhZzogXCLwn4e+8J+HqlwiIH0sXG4gICAgXCJhc1wiOiB7IGxhYmVsOiBcIkFzc2FtZXNlXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwiYXRcIjogeyBsYWJlbDogXCJBdXN0cmlhXCIsIGZsYWc6IFwi8J+HpvCfh7lcIiB9LFxuICAgIFwiYXVcIjogeyBsYWJlbDogXCJFbmdsaXNoIChBdXN0cmFsaWEpXCIsIGZsYWc6IFwi8J+HpvCfh7pcIiB9LFxuICAgIFwiYXZcIjogeyBsYWJlbDogXCJBdmFyaWNcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJhd1wiOiB7IGxhYmVsOiBcIkFydWJhXCIsIGZsYWc6IFwi8J+HpvCfh7xcIiB9LFxuICAgIFwiYXhcIjogeyBsYWJlbDogXCLDhWxhbmQgSXNsYW5kc1wiLCBmbGFnOiBcIvCfh6bwn4e9XCIgfSxcbiAgICBcImF5XCI6IHsgbGFiZWw6IFwiQXltYXJhXCIsIGZsYWc6IFwi8J+Hp/Cfh7RcIiB9LFxuICAgIFwiYXpcIjogeyBsYWJlbDogXCJBemVyYmFpamFuaVwiLCBmbGFnOiBcIvCfh6bwn4e/XCIgfSxcbiAgICBcImJhXCI6IHsgbGFiZWw6IFwiQmFzaGtpclwiLCBmbGFnOiBcIvCfh7fwn4e6XCIgfSxcbiAgICBcImJiXCI6IHsgbGFiZWw6IFwiQmFyYmFkb3NcIiwgZmxhZzogXCLwn4en8J+Hp1wiIH0sXG4gICAgXCJiZFwiOiB7IGxhYmVsOiBcIkJhbmdsYWRlc2hcIiwgZmxhZzogXCLwn4en8J+HqVwiIH0sXG4gICAgXCJiZVwiOiB7IGxhYmVsOiBcIkJlbGFydXNpYW5cIiwgZmxhZzogXCLwn4en8J+HvlwiIH0sXG4gICAgXCJiZlwiOiB7IGxhYmVsOiBcIkJ1cmtpbmEgRmFzb1wiLCBmbGFnOiBcIvCfh6fwn4erXCIgfSxcbiAgICBcImJnXCI6IHsgbGFiZWw6IFwiQnVsZ2FyaWFuXCIsIGZsYWc6IFwi8J+Hp/Cfh6xcIiB9LFxuICAgIFwiYmhcIjogeyBsYWJlbDogXCJCaWhhcmlcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJiaVwiOiB7IGxhYmVsOiBcIkJpc2xhbWFcIiwgZmxhZzogXCLwn4e78J+HulwiIH0sXG4gICAgXCJialwiOiB7IGxhYmVsOiBcIkJlbmluXCIsIGZsYWc6IFwi8J+Hp/Cfh69cIiB9LFxuICAgIFwiYmxcIjogeyBsYWJlbDogXCJTYWludCBCYXJ0aMOpbGVteVwiLCBmbGFnOiBcIvCfh6fwn4exXCIgfSxcbiAgICBcImJtXCI6IHsgbGFiZWw6IFwiQmFtYmFyYVwiLCBmbGFnOiBcIvCfh7Lwn4exXCIgfSxcbiAgICBcImJuXCI6IHsgbGFiZWw6IFwiQmVuZ2FsaVwiLCBmbGFnOiBcIvCfh6fwn4epXCIgfSxcbiAgICBcImJuLWJkXCI6IHsgbGFiZWw6IFwiQmVuZ2FsaSAoQmFuZ2xhZGVzaClcIiwgZmxhZzogXCLwn4en8J+HqVwiIH0sXG4gICAgXCJibi1pblwiOiB7IGxhYmVsOiBcIkJlbmdhbGkgKEluZGlhKVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImJvXCI6IHsgbGFiZWw6IFwiVGliZXRhbiBTdGFuZGFyZFwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImJxXCI6IHsgbGFiZWw6IFwiQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmFcIiwgZmxhZzogXCLwn4en8J+HtlwiIH0sXG4gICAgXCJiclwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEJyYXppbClcIiwgZmxhZzogXCLwn4en8J+Ht1wiIH0sXG4gICAgXCJic1wiOiB7IGxhYmVsOiBcIkJvc25pYW5cIiwgZmxhZzogXCLwn4en8J+HplwiIH0sXG4gICAgXCJidFwiOiB7IGxhYmVsOiBcIkJodXRhblwiLCBmbGFnOiBcIvCfh6fwn4e5XCIgfSxcbiAgICBcImJ2XCI6IHsgbGFiZWw6IFwiQm91dmV0IElzbGFuZFwiLCBmbGFnOiBcIvCfh6fwn4e7XCIgfSxcbiAgICBcImJ3XCI6IHsgbGFiZWw6IFwiQm90c3dhbmFcIiwgZmxhZzogXCLwn4en8J+HvFwiIH0sXG4gICAgXCJieVwiOiB7IGxhYmVsOiBcIkJlbGFydXNcIiwgZmxhZzogXCLwn4en8J+HvlwiIH0sXG4gICAgXCJielwiOiB7IGxhYmVsOiBcIkJlbGl6ZVwiLCBmbGFnOiBcIvCfh6fwn4e/XCIgfSxcbiAgICBcImNhXCI6IHsgbGFiZWw6IFwiQ2F0YWxhblwiLCBmbGFnOiBcIvCfh6bwn4epXCIgfSxcbiAgICBcImNjXCI6IHsgbGFiZWw6IFwiQ29jb3MgKEtlZWxpbmcpIElzbGFuZHNcIiwgZmxhZzogXCLwn4eo8J+HqFwiIH0sXG4gICAgXCJjZFwiOiB7IGxhYmVsOiBcIkNvbmdvLCBEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZVwiLCBmbGFnOiBcIvCfh6jwn4epXCIgfSxcbiAgICBcImNlXCI6IHsgbGFiZWw6IFwiQ2hlY2hlblwiLCBmbGFnOiBcIvCfh7fwn4e6XCIgfSxcbiAgICBcImNmXCI6IHsgbGFiZWw6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIGZsYWc6IFwi8J+HqPCfh6tcIiB9LFxuICAgIFwiY2dcIjogeyBsYWJlbDogXCJDb25nb1wiLCBmbGFnOiBcIvCfh6jwn4esXCIgfSxcbiAgICBcImNoXCI6IHsgbGFiZWw6IFwiQ2hhbW9ycm9cIiwgZmxhZzogXCLwn4es8J+HulwiIH0sXG4gICAgXCJjaVwiOiB7IGxhYmVsOiBcIkPDtHRlIGQnSXZvaXJlXCIsIGZsYWc6IFwi8J+HqPCfh65cIiB9LFxuICAgIFwiY2tcIjogeyBsYWJlbDogXCJDb29rIElzbGFuZHNcIiwgZmxhZzogXCLwn4eo8J+HsFwiIH0sXG4gICAgXCJjbFwiOiB7IGxhYmVsOiBcIkNoaWxlXCIsIGZsYWc6IFwi8J+HqPCfh7FcIiB9LFxuICAgIFwiY21cIjogeyBsYWJlbDogXCJDYW1lcm9vblwiLCBmbGFnOiBcIvCfh6jwn4eyXCIgfSxcbiAgICBcImNuXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImNvXCI6IHsgbGFiZWw6IFwiQ29yc2ljYW5cIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJjb21tb25cIjogeyBsYWJlbDogXCJDb21tb25cIiwgZmxhZzogXCLwn4yQXCIgfSxcbiAgICBcImNyXCI6IHsgbGFiZWw6IFwiQ3JlZVwiLCBmbGFnOiBcIvCfh6jwn4emXCIgfSxcbiAgICBcImNzXCI6IHsgbGFiZWw6IFwiQ3plY2hcIiwgZmxhZzogXCLwn4eo8J+Hv1wiIH0sXG4gICAgXCJjdVwiOiB7IGxhYmVsOiBcIk9sZCBDaHVyY2ggU2xhdm9uaWNcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJjdlwiOiB7IGxhYmVsOiBcIkNodXZhc2hcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJjd1wiOiB7IGxhYmVsOiBcIkN1cmHDp2FvXCIsIGZsYWc6IFwi8J+HqPCfh7xcIiB9LFxuICAgIFwiY3hcIjogeyBsYWJlbDogXCJDaHJpc3RtYXMgSXNsYW5kXCIsIGZsYWc6IFwi8J+HqPCfh71cIiB9LFxuICAgIFwiY3lcIjogeyBsYWJlbDogXCJXZWxzaFwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcImN6XCI6IHsgbGFiZWw6IFwiQ3plY2hpYVwiLCBmbGFnOiBcIvCfh6jwn4e/XCIgfSxcbiAgICBcImRhXCI6IHsgbGFiZWw6IFwiRGFuaXNoXCIsIGZsYWc6IFwi8J+HqfCfh7BcIiB9LFxuICAgIFwiZGVcIjogeyBsYWJlbDogXCJHZXJtYW5cIiwgZmxhZzogXCLwn4ep8J+HqlwiIH0sXG4gICAgXCJkZS1hdFwiOiB7IGxhYmVsOiBcIkdlcm1hbiAoQXVzdHJpYSlcIiwgZmxhZzogXCLwn4em8J+HuVwiIH0sXG4gICAgXCJkZS1jaFwiOiB7IGxhYmVsOiBcIkdlcm1hbiAoU3dpdHplcmxhbmQpXCIsIGZsYWc6IFwi8J+HqPCfh61cIiB9LFxuICAgIFwiZGUtZGVcIjogeyBsYWJlbDogXCJHZXJtYW4gKEdlcm1hbnkpXCIsIGZsYWc6IFwi8J+HqfCfh6pcIiB9LFxuICAgIFwiZGUtbGlcIjogeyBsYWJlbDogXCJHZXJtYW4gKExpZWNodGVuc3RlaW4pXCIsIGZsYWc6IFwi8J+HsfCfh65cIiB9LFxuICAgIFwiZGUtbHVcIjogeyBsYWJlbDogXCJHZXJtYW4gKEx1eGVtYm91cmcpXCIsIGZsYWc6IFwi8J+HsfCfh7pcIiB9LFxuICAgIFwiZGpcIjogeyBsYWJlbDogXCJEamlib3V0aVwiLCBmbGFnOiBcIvCfh6nwn4evXCIgfSxcbiAgICBcImRrXCI6IHsgbGFiZWw6IFwiRGFuaXNoXCIsIGZsYWc6IFwi8J+HqfCfh7BcIiB9LFxuICAgIFwiZG1cIjogeyBsYWJlbDogXCJEb21pbmljYVwiLCBmbGFnOiBcIvCfh6nwn4eyXCIgfSxcbiAgICBcImRvXCI6IHsgbGFiZWw6IFwiRG9taW5pY2FuIFJlcHVibGljXCIsIGZsYWc6IFwi8J+HqfCfh7RcIiB9LFxuICAgIFwiZHZcIjogeyBsYWJlbDogXCJEaXZlaGlcIiwgZmxhZzogXCLwn4ey8J+Hu1wiIH0sXG4gICAgXCJkelwiOiB7IGxhYmVsOiBcIkR6b25na2hhXCIsIGZsYWc6IFwi8J+Hp/Cfh7lcIiB9LFxuICAgIFwiZWNcIjogeyBsYWJlbDogXCJFY3VhZG9yXCIsIGZsYWc6IFwi8J+HqvCfh6hcIiB9LFxuICAgIFwiZWVcIjogeyBsYWJlbDogXCJFd2VcIiwgZmxhZzogXCLwn4es8J+HrVwiIH0sXG4gICAgXCJlZ1wiOiB7IGxhYmVsOiBcIkVneXB0XCIsIGZsYWc6IFwi8J+HqvCfh6xcIiB9LFxuICAgIFwiZWhcIjogeyBsYWJlbDogXCJXZXN0ZXJuIFNhaGFyYVwiLCBmbGFnOiBcIvCfh6rwn4etXCIgfSxcbiAgICBcImVsXCI6IHsgbGFiZWw6IFwiR3JlZWsgKG1vZGVybilcIiwgZmxhZzogXCLwn4es8J+Ht1wiIH0sXG4gICAgXCJlblwiOiB7IGxhYmVsOiBcIkVuZ2xpc2hcIiwgZmxhZzogXCLwn4e68J+HuFwiIH0sXG4gICAgXCJlbi1hdVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEF1c3RyYWxpYSlcIiwgZmxhZzogXCLwn4em8J+HulwiIH0sXG4gICAgXCJlbi1ielwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEJlbGl6ZSlcIiwgZmxhZzogXCLwn4en8J+Hv1wiIH0sXG4gICAgXCJlbi1jYVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKENhbmFkYSlcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJlbi1nYlwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFVLKVwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcImVuLWhrXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcImVuLWllXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSXJlbGFuZClcIiwgZmxhZzogXCLwn4eu8J+HqlwiIH0sXG4gICAgXCJlbi1pblwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKEluZGlhKVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImVuLWptXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoSmFtYWljYSlcIiwgZmxhZzogXCLwn4ev8J+HslwiIH0sXG4gICAgXCJlbi1teVwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKE1hbGF5c2lhKVwiLCBmbGFnOiBcIvCfh7Lwn4e+XCIgfSxcbiAgICBcImVuLW56XCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoTmV3IFplYWxhbmQpXCIsIGZsYWc6IFwi8J+Hs/Cfh79cIiB9LFxuICAgIFwiZW4tcGhcIjogeyBsYWJlbDogXCJFbmdsaXNoIChQaGlsaXBwaW5lcylcIiwgZmxhZzogXCLwn4e18J+HrVwiIH0sXG4gICAgXCJlbi1zZ1wiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFNpbmdhcG9yZSlcIiwgZmxhZzogXCLwn4e48J+HrFwiIH0sXG4gICAgXCJlbi10dFwiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFRyaW5pZGFkICYgVG9iYWdvKVwiLCBmbGFnOiBcIvCfh7nwn4e5XCIgfSxcbiAgICBcImVuLXVzXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoVVMpXCIsIGZsYWc6IFwi8J+HuvCfh7hcIiB9LFxuICAgIFwiZW4temFcIjogeyBsYWJlbDogXCJFbmdsaXNoIChTb3V0aCBBZnJpY2EpXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwiZW4tendcIjogeyBsYWJlbDogXCJFbmdsaXNoIChaaW1iYWJ3ZSlcIiwgZmxhZzogXCLwn4e/8J+HvFwiIH0sXG4gICAgXCJlb1wiOiB7IGxhYmVsOiBcIkVzcGVyYW50b1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiZXJcIjogeyBsYWJlbDogXCJFcml0cmVhXCIsIGZsYWc6IFwi8J+HqvCfh7dcIiB9LFxuICAgIFwiZXNcIjogeyBsYWJlbDogXCJTcGFuaXNoXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiZXMtYXJcIjogeyBsYWJlbDogXCJTcGFuaXNoIChBcmdlbnRpbmEpXCIsIGZsYWc6IFwi8J+HpvCfh7dcIiB9LFxuICAgIFwiZXMtYm9cIjogeyBsYWJlbDogXCJTcGFuaXNoIChCb2xpdmlhKVwiLCBmbGFnOiBcIvCfh6fwn4e0XCIgfSxcbiAgICBcImVzLWNsXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoQ2hpbGUpXCIsIGZsYWc6IFwi8J+HqPCfh7FcIiB9LFxuICAgIFwiZXMtY29cIjogeyBsYWJlbDogXCJTcGFuaXNoIChDb2xvbWJpYSlcIiwgZmxhZzogXCLwn4eo8J+HtFwiIH0sXG4gICAgXCJlcy1jclwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKENvc3RhIFJpY2EpXCIsIGZsYWc6IFwi8J+HqPCfh7dcIiB9LFxuICAgIFwiZXMtZG9cIjogeyBsYWJlbDogXCJTcGFuaXNoIChEb21pbmljYW4gUmVwdWJsaWMpXCIsIGZsYWc6IFwi8J+HqfCfh7RcIiB9LFxuICAgIFwiZXMtZWNcIjogeyBsYWJlbDogXCJTcGFuaXNoIChFY3VhZG9yKVwiLCBmbGFnOiBcIvCfh6rwn4eoXCIgfSxcbiAgICBcImVzLWVzXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoU3BhaW4pXCIsIGZsYWc6IFwi8J+HqvCfh7hcIiB9LFxuICAgIFwiZXMtZ3RcIjogeyBsYWJlbDogXCJTcGFuaXNoIChHdWF0ZW1hbGEpXCIsIGZsYWc6IFwi8J+HrPCfh7lcIiB9LFxuICAgIFwiZXMtaG5cIjogeyBsYWJlbDogXCJTcGFuaXNoIChIb25kdXJhcylcIiwgZmxhZzogXCLwn4et8J+Hs1wiIH0sXG4gICAgXCJlcy1teFwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE1leGljbylcIiwgZmxhZzogXCLwn4ey8J+HvVwiIH0sXG4gICAgXCJlcy1uaVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE5pY2FyYWd1YSlcIiwgZmxhZzogXCLwn4ez8J+HrlwiIH0sXG4gICAgXCJlcy1wYVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBhbmFtYSlcIiwgZmxhZzogXCLwn4e18J+HplwiIH0sXG4gICAgXCJlcy1wZVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBlcnUpXCIsIGZsYWc6IFwi8J+HtfCfh6pcIiB9LFxuICAgIFwiZXMtcHJcIjogeyBsYWJlbDogXCJTcGFuaXNoIChQdWVydG8gUmljbylcIiwgZmxhZzogXCLwn4e18J+Ht1wiIH0sXG4gICAgXCJlcy1weVwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKFBhcmFndWF5KVwiLCBmbGFnOiBcIvCfh7Xwn4e+XCIgfSxcbiAgICBcImVzLXN2XCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoRWwgU2FsdmFkb3IpXCIsIGZsYWc6IFwi8J+HuPCfh7tcIiB9LFxuICAgIFwiZXMtdXlcIjogeyBsYWJlbDogXCJTcGFuaXNoIChVcnVndWF5KVwiLCBmbGFnOiBcIvCfh7rwn4e+XCIgfSxcbiAgICBcImVzLXZlXCI6IHsgbGFiZWw6IFwiU3BhbmlzaCAoVmVuZXp1ZWxhKVwiLCBmbGFnOiBcIvCfh7vwn4eqXCIgfSxcbiAgICBcImV0XCI6IHsgbGFiZWw6IFwiRXN0b25pYW5cIiwgZmxhZzogXCLwn4eq8J+HqlwiIH0sXG4gICAgXCJldVwiOiB7IGxhYmVsOiBcIkJhc3F1ZVwiLCBmbGFnOiBcIvCfh6rwn4e4XCIgfSxcbiAgICBcImZhXCI6IHsgbGFiZWw6IFwiUGVyc2lhbiAoRmFyc2kpXCIsIGZsYWc6IFwi8J+HrvCfh7dcIiB9LFxuICAgIFwiZmZcIjogeyBsYWJlbDogXCJGdWxhXCIsIGZsYWc6IFwi8J+HuPCfh7NcIiB9LFxuICAgIFwiZmlcIjogeyBsYWJlbDogXCJGaW5uaXNoXCIsIGZsYWc6IFwi8J+Hq/Cfh65cIiB9LFxuICAgIFwiZmpcIjogeyBsYWJlbDogXCJGaWppYW5cIiwgZmxhZzogXCLwn4er8J+Hr1wiIH0sXG4gICAgXCJma1wiOiB7IGxhYmVsOiBcIkZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKVwiLCBmbGFnOiBcIvCfh6vwn4ewXCIgfSxcbiAgICBcImZtXCI6IHsgbGFiZWw6IFwiTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZlwiLCBmbGFnOiBcIvCfh6vwn4eyXCIgfSxcbiAgICBcImZvXCI6IHsgbGFiZWw6IFwiRmFyb2VzZVwiLCBmbGFnOiBcIvCfh6vwn4e0XCIgfSxcbiAgICBcImZyXCI6IHsgbGFiZWw6IFwiRnJlbmNoXCIsIGZsYWc6IFwi8J+Hq/Cfh7dcIiB9LFxuICAgIFwiZnItYmVcIjogeyBsYWJlbDogXCJGcmVuY2ggKEJlbGdpdW0pXCIsIGZsYWc6IFwi8J+Hp/Cfh6pcIiB9LFxuICAgIFwiZnItY2FcIjogeyBsYWJlbDogXCJGcmVuY2ggKENhbmFkYSlcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJmci1jaFwiOiB7IGxhYmVsOiBcIkZyZW5jaCAoU3dpdHplcmxhbmQpXCIsIGZsYWc6IFwi8J+HqPCfh61cIiB9LFxuICAgIFwiZnItZnJcIjogeyBsYWJlbDogXCJGcmVuY2ggKEZyYW5jZSlcIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJmci1sdVwiOiB7IGxhYmVsOiBcIkZyZW5jaCAoTHV4ZW1ib3VyZylcIiwgZmxhZzogXCLwn4ex8J+HulwiIH0sXG4gICAgXCJmci1tY1wiOiB7IGxhYmVsOiBcIkZyZW5jaCAoTW9uYWNvKVwiLCBmbGFnOiBcIvCfh7Lwn4eoXCIgfSxcbiAgICBcImZ5XCI6IHsgbGFiZWw6IFwiV2VzdGVybiBGcmlzaWFuXCIsIGZsYWc6IFwi8J+Hs/Cfh7FcIiB9LFxuICAgIFwiZ2FcIjogeyBsYWJlbDogXCJJcmlzaFwiLCBmbGFnOiBcIvCfh67wn4eqXCIgfSxcbiAgICBcImdiXCI6IHsgbGFiZWw6IFwiRW5nbGlzaCAoVUspXCIsIGZsYWc6IFwi8J+HrPCfh6dcIiB9LFxuICAgIFwiZ2RcIjogeyBsYWJlbDogXCJTY290dGlzaCBHYWVsaWNcIiwgZmxhZzogXCLwn4es8J+Hp1wiIH0sXG4gICAgXCJnZVwiOiB7IGxhYmVsOiBcIkdlb3JnaWFcIiwgZmxhZzogXCLwn4es8J+HqlwiIH0sXG4gICAgXCJnZlwiOiB7IGxhYmVsOiBcIkZyZW5jaCBHdWlhbmFcIiwgZmxhZzogXCLwn4es8J+Hq1wiIH0sXG4gICAgXCJnZ1wiOiB7IGxhYmVsOiBcIkd1ZXJuc2V5XCIsIGZsYWc6IFwi8J+HrPCfh6xcIiB9LFxuICAgIFwiZ2hcIjogeyBsYWJlbDogXCJHaGFuYVwiLCBmbGFnOiBcIvCfh6zwn4etXCIgfSxcbiAgICBcImdpXCI6IHsgbGFiZWw6IFwiR2licmFsdGFyXCIsIGZsYWc6IFwi8J+HrPCfh65cIiB9LFxuICAgIFwiZ2xcIjogeyBsYWJlbDogXCJHYWxpY2lhblwiLCBmbGFnOiBcIvCfh6rwn4e4XCIgfSxcbiAgICBcImdsb2JhbFwiOiB7IGxhYmVsOiBcIkdsb2JhbFwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiZ21cIjogeyBsYWJlbDogXCJHYW1iaWFcIiwgZmxhZzogXCLwn4es8J+HslwiIH0sXG4gICAgXCJnblwiOiB7IGxhYmVsOiBcIkd1YXJhbsOtXCIsIGZsYWc6IFwi8J+HtfCfh75cIiB9LFxuICAgIFwiZ3BcIjogeyBsYWJlbDogXCJHdWFkZWxvdXBlXCIsIGZsYWc6IFwi8J+HrPCfh7VcIiB9LFxuICAgIFwiZ3FcIjogeyBsYWJlbDogXCJFcXVhdG9yaWFsIEd1aW5lYVwiLCBmbGFnOiBcIvCfh6zwn4e2XCIgfSxcbiAgICBcImdyXCI6IHsgbGFiZWw6IFwiR3JlZWNlXCIsIGZsYWc6IFwi8J+HrPCfh7dcIiB9LFxuICAgIFwiZ3NcIjogeyBsYWJlbDogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLCBmbGFnOiBcIvCfh6zwn4e4XCIgfSxcbiAgICBcImd0XCI6IHsgbGFiZWw6IFwiR3VhdGVtYWxhXCIsIGZsYWc6IFwi8J+HrPCfh7lcIiB9LFxuICAgIFwiZ3VcIjogeyBsYWJlbDogXCJHdWphcmF0aVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImd2XCI6IHsgbGFiZWw6IFwiTWFueFwiLCBmbGFnOiBcIvCfh67wn4eyXCIgfSxcbiAgICBcImd3XCI6IHsgbGFiZWw6IFwiR3VpbmVhLUJpc3NhdVwiLCBmbGFnOiBcIvCfh6zwn4e8XCIgfSxcbiAgICBcImd5XCI6IHsgbGFiZWw6IFwiR3V5YW5hXCIsIGZsYWc6IFwi8J+HrPCfh75cIiB9LFxuICAgIFwiaGFcIjogeyBsYWJlbDogXCJIYXVzYVwiLCBmbGFnOiBcIvCfh7Pwn4esXCIgfSxcbiAgICBcImhlXCI6IHsgbGFiZWw6IFwiSGVicmV3IChtb2Rlcm4pXCIsIGZsYWc6IFwi8J+HrvCfh7FcIiB9LFxuICAgIFwiaGlcIjogeyBsYWJlbDogXCJIaW5kaVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcImhrXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcImhtXCI6IHsgbGFiZWw6IFwiSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HrfCfh7JcIiB9LFxuICAgIFwiaG5cIjogeyBsYWJlbDogXCJIb25kdXJhc1wiLCBmbGFnOiBcIvCfh63wn4ezXCIgfSxcbiAgICBcImhvXCI6IHsgbGFiZWw6IFwiSGlyaSBNb3R1XCIsIGZsYWc6IFwi8J+HtfCfh6xcIiB9LFxuICAgIFwiaHJcIjogeyBsYWJlbDogXCJDcm9hdGlhblwiLCBmbGFnOiBcIvCfh63wn4e3XCIgfSxcbiAgICBcImh0XCI6IHsgbGFiZWw6IFwiSGFpdGlhblwiLCBmbGFnOiBcIvCfh63wn4e5XCIgfSxcbiAgICBcImh1XCI6IHsgbGFiZWw6IFwiSHVuZ2FyaWFuXCIsIGZsYWc6IFwi8J+HrfCfh7pcIiB9LFxuICAgIFwiaHlcIjogeyBsYWJlbDogXCJBcm1lbmlhblwiLCBmbGFnOiBcIvCfh6bwn4eyXCIgfSxcbiAgICBcImh6XCI6IHsgbGFiZWw6IFwiSGVyZXJvXCIsIGZsYWc6IFwi8J+Hs/Cfh6ZcIiB9LFxuICAgIFwiaWFcIjogeyBsYWJlbDogXCJJbnRlcmxpbmd1YVwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaWRcIjogeyBsYWJlbDogXCJJbmRvbmVzaWFuXCIsIGZsYWc6IFwi8J+HrvCfh6lcIiB9LFxuICAgIFwiaWVcIjogeyBsYWJlbDogXCJJbnRlcmxpbmd1ZVwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaWdcIjogeyBsYWJlbDogXCJJZ2JvXCIsIGZsYWc6IFwi8J+Hs/Cfh6xcIiB9LFxuICAgIFwiaWlcIjogeyBsYWJlbDogXCJOdW9zdVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcImlrXCI6IHsgbGFiZWw6IFwiSW51cGlhcVwiLCBmbGFnOiBcIvCfh7rwn4e4XCIgfSxcbiAgICBcImlsXCI6IHsgbGFiZWw6IFwiSXNyYWVsXCIsIGZsYWc6IFwi8J+HrvCfh7FcIiB9LFxuICAgIFwiaW1cIjogeyBsYWJlbDogXCJJc2xlIG9mIE1hblwiLCBmbGFnOiBcIvCfh67wn4eyXCIgfSxcbiAgICBcImluXCI6IHsgbGFiZWw6IFwiSW5kaWFcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJpb1wiOiB7IGxhYmVsOiBcIklkb1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwiaXFcIjogeyBsYWJlbDogXCJJcmFxXCIsIGZsYWc6IFwi8J+HrvCfh7ZcIiB9LFxuICAgIFwiaXJcIjogeyBsYWJlbDogXCJJcmFuLCBJc2xhbWljIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HrvCfh7dcIiB9LFxuICAgIFwiaXNcIjogeyBsYWJlbDogXCJJY2VsYW5kaWNcIiwgZmxhZzogXCLwn4eu8J+HuFwiIH0sXG4gICAgXCJpdFwiOiB7IGxhYmVsOiBcIkl0YWxpYW5cIiwgZmxhZzogXCLwn4eu8J+HuVwiIH0sXG4gICAgXCJpdC1jaFwiOiB7IGxhYmVsOiBcIkl0YWxpYW4gKFN3aXR6ZXJsYW5kKVwiLCBmbGFnOiBcIvCfh6jwn4etXCIgfSxcbiAgICBcIml0LWl0XCI6IHsgbGFiZWw6IFwiSXRhbGlhbiAoSXRhbHkpXCIsIGZsYWc6IFwi8J+HrvCfh7lcIiB9LFxuICAgIFwiaXVcIjogeyBsYWJlbDogXCJJbnVrdGl0dXRcIiwgZmxhZzogXCLwn4eo8J+HplwiIH0sXG4gICAgXCJqYVwiOiB7IGxhYmVsOiBcIkphcGFuZXNlXCIsIGZsYWc6IFwi8J+Hr/Cfh7VcIiB9LFxuICAgIFwiamEtanBcIjogeyBsYWJlbDogXCJKYXBhbmVzZSAoSmFwYW4pXCIsIGZsYWc6IFwi8J+Hr/Cfh7VcIiB9LFxuICAgIFwiamVcIjogeyBsYWJlbDogXCJKZXJzZXlcIiwgZmxhZzogXCLwn4ev8J+HqlwiIH0sXG4gICAgXCJqbVwiOiB7IGxhYmVsOiBcIkphbWFpY2FcIiwgZmxhZzogXCLwn4ev8J+HslwiIH0sXG4gICAgXCJqb1wiOiB7IGxhYmVsOiBcIkpvcmRhblwiLCBmbGFnOiBcIvCfh6/wn4e0XCIgfSxcbiAgICBcImpwXCI6IHsgbGFiZWw6IFwiSmFwYW5lc2VcIiwgZmxhZzogXCLwn4ev8J+HtVwiIH0sXG4gICAgXCJqdlwiOiB7IGxhYmVsOiBcIkphdmFuZXNlXCIsIGZsYWc6IFwi8J+HrvCfh6lcIiB9LFxuICAgIFwia2FcIjogeyBsYWJlbDogXCJHZW9yZ2lhblwiLCBmbGFnOiBcIvCfh6zwn4eqXCIgfSxcbiAgICBcImtlXCI6IHsgbGFiZWw6IFwiS2VueWFcIiwgZmxhZzogXCLwn4ew8J+HqlwiIH0sXG4gICAgXCJrZ1wiOiB7IGxhYmVsOiBcIktvbmdvXCIsIGZsYWc6IFwi8J+HqPCfh6lcIiB9LFxuICAgIFwia2hcIjogeyBsYWJlbDogXCJDYW1ib2RpYVwiLCBmbGFnOiBcIvCfh7Dwn4etXCIgfSxcbiAgICBcImtpXCI6IHsgbGFiZWw6IFwiS2lrdXl1XCIsIGZsYWc6IFwi8J+HsPCfh6pcIiB9LFxuICAgIFwia2pcIjogeyBsYWJlbDogXCJLd2FueWFtYVwiLCBmbGFnOiBcIvCfh7Pwn4emXCIgfSxcbiAgICBcImtrXCI6IHsgbGFiZWw6IFwiS2F6YWtoXCIsIGZsYWc6IFwi8J+HsPCfh79cIiB9LFxuICAgIFwia2xcIjogeyBsYWJlbDogXCJLYWxhYWxsaXN1dFwiLCBmbGFnOiBcIvCfh6zwn4exXCIgfSxcbiAgICBcImttXCI6IHsgbGFiZWw6IFwiS2htZXJcIiwgZmxhZzogXCLwn4ew8J+HrVwiIH0sXG4gICAgXCJrblwiOiB7IGxhYmVsOiBcIkthbm5hZGFcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJrb1wiOiB7IGxhYmVsOiBcIktvcmVhblwiLCBmbGFnOiBcIvCfh7Dwn4e3XCIgfSxcbiAgICBcImtvLWtyXCI6IHsgbGFiZWw6IFwiS29yZWFuIChLb3JlYSlcIiwgZmxhZzogXCLwn4ew8J+Ht1wiIH0sXG4gICAgXCJrcFwiOiB7IGxhYmVsOiBcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZSdzIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HsPCfh7VcIiB9LFxuICAgIFwia3JcIjogeyBsYWJlbDogXCJLb3JlYW5cIiwgZmxhZzogXCLwn4ew8J+Ht1wiIH0sXG4gICAgXCJrc1wiOiB7IGxhYmVsOiBcIkthc2htaXJpXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwia3VcIjogeyBsYWJlbDogXCJLdXJkaXNoXCIsIGZsYWc6IFwi8J+HrvCfh7ZcIiB9LFxuICAgIFwia3ZcIjogeyBsYWJlbDogXCJLb21pXCIsIGZsYWc6IFwi8J+Ht/Cfh7pcIiB9LFxuICAgIFwia3dcIjogeyBsYWJlbDogXCJDb3JuaXNoXCIsIGZsYWc6IFwi8J+HrPCfh6dcIiB9LFxuICAgIFwia3lcIjogeyBsYWJlbDogXCJLeXJneXpcIiwgZmxhZzogXCLwn4ew8J+HrFwiIH0sXG4gICAgXCJrelwiOiB7IGxhYmVsOiBcIkthemFraHN0YW5cIiwgZmxhZzogXCLwn4ew8J+Hv1wiIH0sXG4gICAgXCJsYVwiOiB7IGxhYmVsOiBcIkxhdGluXCIsIGZsYWc6IFwi8J+Hu/Cfh6ZcIiB9LFxuICAgIFwibGJcIjogeyBsYWJlbDogXCJMdXhlbWJvdXJnaXNoXCIsIGZsYWc6IFwi8J+HsfCfh7pcIiB9LFxuICAgIFwibGNcIjogeyBsYWJlbDogXCJTYWludCBMdWNpYVwiLCBmbGFnOiBcIvCfh7Hwn4eoXCIgfSxcbiAgICBcImxnXCI6IHsgbGFiZWw6IFwiR2FuZGFcIiwgZmxhZzogXCLwn4e68J+HrFwiIH0sXG4gICAgXCJsaVwiOiB7IGxhYmVsOiBcIkxpbWJ1cmdpc2hcIiwgZmxhZzogXCLwn4ez8J+HsVwiIH0sXG4gICAgXCJsa1wiOiB7IGxhYmVsOiBcIlNyaSBMYW5rYVwiLCBmbGFnOiBcIvCfh7Hwn4ewXCIgfSxcbiAgICBcImxuXCI6IHsgbGFiZWw6IFwiTGluZ2FsYVwiLCBmbGFnOiBcIvCfh6jwn4epXCIgfSxcbiAgICBcImxvXCI6IHsgbGFiZWw6IFwiTGFvXCIsIGZsYWc6IFwi8J+HsfCfh6ZcIiB9LFxuICAgIFwibHJcIjogeyBsYWJlbDogXCJMaWJlcmlhXCIsIGZsYWc6IFwi8J+HsfCfh7dcIiB9LFxuICAgIFwibHNcIjogeyBsYWJlbDogXCJMZXNvdGhvXCIsIGZsYWc6IFwi8J+HsfCfh7hcIiB9LFxuICAgIFwibHRcIjogeyBsYWJlbDogXCJMaXRodWFuaWFuXCIsIGZsYWc6IFwi8J+HsfCfh7lcIiB9LFxuICAgIFwibHVcIjogeyBsYWJlbDogXCJMdWJhLUthdGFuZ2FcIiwgZmxhZzogXCLwn4eo8J+HqVwiIH0sXG4gICAgXCJsdlwiOiB7IGxhYmVsOiBcIkxhdHZpYW5cIiwgZmxhZzogXCLwn4ex8J+Hu1wiIH0sXG4gICAgXCJseVwiOiB7IGxhYmVsOiBcIkxpYnlhXCIsIGZsYWc6IFwi8J+HsfCfh75cIiB9LFxuICAgIFwibWFcIjogeyBsYWJlbDogXCJNb3JvY2NvXCIsIGZsYWc6IFwi8J+HsvCfh6ZcIiB9LFxuICAgIFwibWNcIjogeyBsYWJlbDogXCJNb25hY29cIiwgZmxhZzogXCLwn4ey8J+HqFwiIH0sXG4gICAgXCJtZFwiOiB7IGxhYmVsOiBcIk1vbGRvdmEsIFJlcHVibGljIG9mXCIsIGZsYWc6IFwi8J+HsvCfh6lcIiB9LFxuICAgIFwibWVcIjogeyBsYWJlbDogXCJNb250ZW5lZ3JvXCIsIGZsYWc6IFwi8J+HsvCfh6pcIiB9LFxuICAgIFwibWZcIjogeyBsYWJlbDogXCJTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KVwiLCBmbGFnOiBcIvCfh7Lwn4erXCIgfSxcbiAgICBcIm1nXCI6IHsgbGFiZWw6IFwiTWFsYWdhc3lcIiwgZmxhZzogXCLwn4ey8J+HrFwiIH0sXG4gICAgXCJtaFwiOiB7IGxhYmVsOiBcIk1hcnNoYWxsZXNlXCIsIGZsYWc6IFwi8J+HsvCfh61cIiB9LFxuICAgIFwibWlcIjogeyBsYWJlbDogXCJNxIFvcmlcIiwgZmxhZzogXCLwn4ez8J+Hv1wiIH0sXG4gICAgXCJta1wiOiB7IGxhYmVsOiBcIk1hY2Vkb25pYW5cIiwgZmxhZzogXCLwn4ey8J+HsFwiIH0sXG4gICAgXCJtbFwiOiB7IGxhYmVsOiBcIk1hbGF5YWxhbVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcIm1tXCI6IHsgbGFiZWw6IFwiTXlhbm1hclwiLCBmbGFnOiBcIvCfh7Lwn4eyXCIgfSxcbiAgICBcIm1uXCI6IHsgbGFiZWw6IFwiTW9uZ29saWFuXCIsIGZsYWc6IFwi8J+HsvCfh7NcIiB9LFxuICAgIFwibW9cIjogeyBsYWJlbDogXCJNYWNhb1wiLCBmbGFnOiBcIvCfh7Lwn4e0XCIgfSxcbiAgICBcIm1wXCI6IHsgbGFiZWw6IFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HsvCfh7VcIiB9LFxuICAgIFwibXFcIjogeyBsYWJlbDogXCJNYXJ0aW5pcXVlXCIsIGZsYWc6IFwi8J+HsvCfh7ZcIiB9LFxuICAgIFwibXJcIjogeyBsYWJlbDogXCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJtc1wiOiB7IGxhYmVsOiBcIk1hbGF5XCIsIGZsYWc6IFwi8J+HsvCfh75cIiB9LFxuICAgIFwibXRcIjogeyBsYWJlbDogXCJNYWx0ZXNlXCIsIGZsYWc6IFwi8J+HsvCfh7lcIiB9LFxuICAgIFwibXVcIjogeyBsYWJlbDogXCJNYXVyaXRpdXNcIiwgZmxhZzogXCLwn4ey8J+HulwiIH0sXG4gICAgXCJtdlwiOiB7IGxhYmVsOiBcIk1hbGRpdmVzXCIsIGZsYWc6IFwi8J+HsvCfh7tcIiB9LFxuICAgIFwibXdcIjogeyBsYWJlbDogXCJNYWxhd2lcIiwgZmxhZzogXCLwn4ey8J+HvFwiIH0sXG4gICAgXCJteFwiOiB7IGxhYmVsOiBcIlNwYW5pc2ggKE1leGljbylcIiwgZmxhZzogXCLwn4ey8J+HvVwiIH0sXG4gICAgXCJteVwiOiB7IGxhYmVsOiBcIkJ1cm1lc2VcIiwgZmxhZzogXCLwn4ey8J+HslwiIH0sXG4gICAgXCJtelwiOiB7IGxhYmVsOiBcIk1vemFtYmlxdWVcIiwgZmxhZzogXCLwn4ey8J+Hv1wiIH0sXG4gICAgXCJuYVwiOiB7IGxhYmVsOiBcIk5hdXJ1YW5cIiwgZmxhZzogXCLwn4ez8J+Ht1wiIH0sXG4gICAgXCJuYlwiOiB7IGxhYmVsOiBcIk5vcndlZ2lhbiBCb2ttw6VsXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibmItbm9cIjogeyBsYWJlbDogXCJOb3J3ZWdpYW4gQm9rbcOlbCAoTm9yd2F5KVwiLCBmbGFnOiBcIvCfh7Pwn4e0XCIgfSxcbiAgICBcIm5jXCI6IHsgbGFiZWw6IFwiTmV3IENhbGVkb25pYVwiLCBmbGFnOiBcIvCfh7Pwn4eoXCIgfSxcbiAgICBcIm5kXCI6IHsgbGFiZWw6IFwiTm9ydGhlcm4gTmRlYmVsZVwiLCBmbGFnOiBcIvCfh7/wn4e8XCIgfSxcbiAgICBcIm5lXCI6IHsgbGFiZWw6IFwiTmVwYWxpXCIsIGZsYWc6IFwi8J+Hs/Cfh7VcIiB9LFxuICAgIFwibmZcIjogeyBsYWJlbDogXCJOb3Jmb2xrIElzbGFuZFwiLCBmbGFnOiBcIvCfh7Pwn4erXCIgfSxcbiAgICBcIm5nXCI6IHsgbGFiZWw6IFwiTmRvbmdhXCIsIGZsYWc6IFwi8J+Hs/Cfh6ZcIiB9LFxuICAgIFwibmlcIjogeyBsYWJlbDogXCJOaWNhcmFndWFcIiwgZmxhZzogXCLwn4ez8J+HrlwiIH0sXG4gICAgXCJubFwiOiB7IGxhYmVsOiBcIkR1dGNoXCIsIGZsYWc6IFwi8J+Hs/Cfh7FcIiB9LFxuICAgIFwibmwtYmVcIjogeyBsYWJlbDogXCJEdXRjaCAoQmVsZ2l1bSlcIiwgZmxhZzogXCLwn4en8J+HqlwiIH0sXG4gICAgXCJubC1ubFwiOiB7IGxhYmVsOiBcIkR1dGNoIChOZXRoZXJsYW5kcylcIiwgZmxhZzogXCLwn4ez8J+HsVwiIH0sXG4gICAgXCJublwiOiB7IGxhYmVsOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibm4tbm9cIjogeyBsYWJlbDogXCJOb3J3ZWdpYW4gTnlub3JzayAoTm9yd2F5KVwiLCBmbGFnOiBcIvCfh7Pwn4e0XCIgfSxcbiAgICBcIm5vXCI6IHsgbGFiZWw6IFwiTm9yd2VnaWFuXCIsIGZsYWc6IFwi8J+Hs/Cfh7RcIiB9LFxuICAgIFwibnBcIjogeyBsYWJlbDogXCJOZXBhbFwiLCBmbGFnOiBcIvCfh7Pwn4e1XCIgfSxcbiAgICBcIm5yXCI6IHsgbGFiZWw6IFwiU291dGhlcm4gTmRlYmVsZVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcIm51XCI6IHsgbGFiZWw6IFwiTml1ZVwiLCBmbGFnOiBcIvCfh7Pwn4e6XCIgfSxcbiAgICBcIm52XCI6IHsgbGFiZWw6IFwiTmF2YWpvXCIsIGZsYWc6IFwi8J+HuvCfh7hcIiB9LFxuICAgIFwibnlcIjogeyBsYWJlbDogXCJDaGljaGV3YVwiLCBmbGFnOiBcIvCfh7Lwn4e8XCIgfSxcbiAgICBcIm56XCI6IHsgbGFiZWw6IFwiTmV3IFplYWxhbmRcIiwgZmxhZzogXCLwn4ez8J+Hv1wiIH0sXG4gICAgXCJvY1wiOiB7IGxhYmVsOiBcIk9jY2l0YW5cIiwgZmxhZzogXCLwn4er8J+Ht1wiIH0sXG4gICAgXCJvalwiOiB7IGxhYmVsOiBcIk9qaWJ3ZVwiLCBmbGFnOiBcIvCfh6jwn4emXCIgfSxcbiAgICBcIm9tXCI6IHsgbGFiZWw6IFwiT3JvbW9cIiwgZmxhZzogXCLwn4eq8J+HuVwiIH0sXG4gICAgXCJvclwiOiB7IGxhYmVsOiBcIk9yaXlhXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwib3NcIjogeyBsYWJlbDogXCJPc3NldGlhblwiLCBmbGFnOiBcIvCfh6zwn4eqXCIgfSxcbiAgICBcInBhXCI6IHsgbGFiZWw6IFwiKEVhc3Rlcm4pIFB1bmphYmlcIiwgZmxhZzogXCLwn4eu8J+Hs1wiIH0sXG4gICAgXCJwZVwiOiB7IGxhYmVsOiBcIlBlcnVcIiwgZmxhZzogXCLwn4e18J+HqlwiIH0sXG4gICAgXCJwZlwiOiB7IGxhYmVsOiBcIkZyZW5jaCBQb2x5bmVzaWFcIiwgZmxhZzogXCLwn4e18J+Hq1wiIH0sXG4gICAgXCJwZ1wiOiB7IGxhYmVsOiBcIlBhcHVhIE5ldyBHdWluZWFcIiwgZmxhZzogXCLwn4e18J+HrFwiIH0sXG4gICAgXCJwaFwiOiB7IGxhYmVsOiBcIlBoaWxpcHBpbmVzXCIsIGZsYWc6IFwi8J+HtfCfh61cIiB9LFxuICAgIFwicGlcIjogeyBsYWJlbDogXCJQxIFsaVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcInBrXCI6IHsgbGFiZWw6IFwiUGFraXN0YW5cIiwgZmxhZzogXCLwn4e18J+HsFwiIH0sXG4gICAgXCJwbFwiOiB7IGxhYmVsOiBcIlBvbGlzaFwiLCBmbGFnOiBcIvCfh7Xwn4exXCIgfSxcbiAgICBcInBtXCI6IHsgbGFiZWw6IFwiU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvblwiLCBmbGFnOiBcIvCfh7Xwn4eyXCIgfSxcbiAgICBcInBuXCI6IHsgbGFiZWw6IFwiUGl0Y2Fpcm5cIiwgZmxhZzogXCLwn4e18J+Hs1wiIH0sXG4gICAgXCJwclwiOiB7IGxhYmVsOiBcIlB1ZXJ0byBSaWNvXCIsIGZsYWc6IFwi8J+HtfCfh7dcIiB9LFxuICAgIFwicHNcIjogeyBsYWJlbDogXCJQYXNodG9cIiwgZmxhZzogXCLwn4em8J+Hq1wiIH0sXG4gICAgXCJwdFwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2VcIiwgZmxhZzogXCLwn4e18J+HuVwiIH0sXG4gICAgXCJwdC1hb1wiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEFuZ29sYSlcIiwgZmxhZzogXCLwn4em8J+HtFwiIH0sXG4gICAgXCJwdC1iclwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKEJyYXppbClcIiwgZmxhZzogXCLwn4en8J+Ht1wiIH0sXG4gICAgXCJwdC1wdFwiOiB7IGxhYmVsOiBcIlBvcnR1Z3Vlc2UgKFBvcnR1Z2FsKVwiLCBmbGFnOiBcIvCfh7Xwn4e5XCIgfSxcbiAgICBcInB3XCI6IHsgbGFiZWw6IFwiUGFsYXVcIiwgZmxhZzogXCLwn4e18J+HvFwiIH0sXG4gICAgXCJweVwiOiB7IGxhYmVsOiBcIlBhcmFndWF5XCIsIGZsYWc6IFwi8J+HtfCfh75cIiB9LFxuICAgIFwicWFcIjogeyBsYWJlbDogXCJRYXRhclwiLCBmbGFnOiBcIvCfh7bwn4emXCIgfSxcbiAgICBcInF1XCI6IHsgbGFiZWw6IFwiUXVlY2h1YVwiLCBmbGFnOiBcIvCfh7Xwn4eqXCIgfSxcbiAgICBcInJlXCI6IHsgbGFiZWw6IFwiUsOpdW5pb25cIiwgZmxhZzogXCLwn4e38J+HqlwiIH0sXG4gICAgXCJybVwiOiB7IGxhYmVsOiBcIlJvbWFuc2hcIiwgZmxhZzogXCLwn4eo8J+HrVwiIH0sXG4gICAgXCJyblwiOiB7IGxhYmVsOiBcIktpcnVuZGlcIiwgZmxhZzogXCLwn4en8J+HrlwiIH0sXG4gICAgXCJyb1wiOiB7IGxhYmVsOiBcIlJvbWFuaWFuXCIsIGZsYWc6IFwi8J+Ht/Cfh7RcIiB9LFxuICAgIFwicnNcIjogeyBsYWJlbDogXCJTZXJiaWFcIiwgZmxhZzogXCLwn4e38J+HuFwiIH0sXG4gICAgXCJydVwiOiB7IGxhYmVsOiBcIlJ1c3NpYW5cIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJydS1ydVwiOiB7IGxhYmVsOiBcIlJ1c3NpYW4gKFJ1c3NpYSlcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJyd1wiOiB7IGxhYmVsOiBcIktpbnlhcndhbmRhXCIsIGZsYWc6IFwi8J+Ht/Cfh7xcIiB9LFxuICAgIFwic2FcIjogeyBsYWJlbDogXCJBcmFiaWMgKFNhdWRpIEFyYWJpYSlcIiwgZmxhZzogXCLwn4e48J+HplwiIH0sXG4gICAgXCJzYlwiOiB7IGxhYmVsOiBcIlNvbG9tb24gSXNsYW5kc1wiLCBmbGFnOiBcIvCfh7jwn4enXCIgfSxcbiAgICBcInNjXCI6IHsgbGFiZWw6IFwiU2FyZGluaWFuXCIsIGZsYWc6IFwi8J+HrvCfh7lcIiB9LFxuICAgIFwic2RcIjogeyBsYWJlbDogXCJTaW5kaGlcIiwgZmxhZzogXCLwn4e18J+HsFwiIH0sXG4gICAgXCJzZVwiOiB7IGxhYmVsOiBcIlN3ZWRpc2hcIiwgZmxhZzogXCLwn4e48J+HqlwiIH0sXG4gICAgXCJzZ1wiOiB7IGxhYmVsOiBcIlNhbmdvXCIsIGZsYWc6IFwi8J+HqPCfh6tcIiB9LFxuICAgIFwic2hcIjogeyBsYWJlbDogXCJTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYVwiLCBmbGFnOiBcIvCfh7jwn4etXCIgfSxcbiAgICBcInNoYXJlZFwiOiB7IGxhYmVsOiBcIlNoYXJlZFwiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwic2lcIjogeyBsYWJlbDogXCJTaW5oYWxlc2VcIiwgZmxhZzogXCLwn4ex8J+HsFwiIH0sXG4gICAgXCJzalwiOiB7IGxhYmVsOiBcIlN2YWxiYXJkIGFuZCBKYW4gTWF5ZW5cIiwgZmxhZzogXCLwn4e48J+Hr1wiIH0sXG4gICAgXCJza1wiOiB7IGxhYmVsOiBcIlNsb3Zha1wiLCBmbGFnOiBcIvCfh7jwn4ewXCIgfSxcbiAgICBcInNsXCI6IHsgbGFiZWw6IFwiU2xvdmVuZVwiLCBmbGFnOiBcIvCfh7jwn4euXCIgfSxcbiAgICBcInNtXCI6IHsgbGFiZWw6IFwiU2Ftb2FuXCIsIGZsYWc6IFwi8J+HvPCfh7hcIiB9LFxuICAgIFwic25cIjogeyBsYWJlbDogXCJTaG9uYVwiLCBmbGFnOiBcIvCfh7/wn4e8XCIgfSxcbiAgICBcInNvXCI6IHsgbGFiZWw6IFwiU29tYWxpXCIsIGZsYWc6IFwi8J+HuPCfh7RcIiB9LFxuICAgIFwic3FcIjogeyBsYWJlbDogXCJBbGJhbmlhblwiLCBmbGFnOiBcIvCfh6bwn4exXCIgfSxcbiAgICBcInNyXCI6IHsgbGFiZWw6IFwiU2VyYmlhblwiLCBmbGFnOiBcIvCfh7fwn4e4XCIgfSxcbiAgICBcInNzXCI6IHsgbGFiZWw6IFwiU3dhdGlcIiwgZmxhZzogXCLwn4e48J+Hv1wiIH0sXG4gICAgXCJzdFwiOiB7IGxhYmVsOiBcIlNvdXRoZXJuIFNvdGhvXCIsIGZsYWc6IFwi8J+HsfCfh7hcIiB9LFxuICAgIFwic3VcIjogeyBsYWJlbDogXCJTdW5kYW5lc2VcIiwgZmxhZzogXCLwn4eu8J+HqVwiIH0sXG4gICAgXCJzdlwiOiB7IGxhYmVsOiBcIlN3ZWRpc2hcIiwgZmxhZzogXCLwn4e48J+HqlwiIH0sXG4gICAgXCJzdi1maVwiOiB7IGxhYmVsOiBcIlN3ZWRpc2ggKEZpbmxhbmQpXCIsIGZsYWc6IFwi8J+Hq/Cfh65cIiB9LFxuICAgIFwic3Ytc2VcIjogeyBsYWJlbDogXCJTd2VkaXNoIChTd2VkZW4pXCIsIGZsYWc6IFwi8J+HuPCfh6pcIiB9LFxuICAgIFwic3dcIjogeyBsYWJlbDogXCJTd2FoaWxpXCIsIGZsYWc6IFwi8J+HufCfh79cIiB9LFxuICAgIFwic3hcIjogeyBsYWJlbDogXCJTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpXCIsIGZsYWc6IFwi8J+HuPCfh71cIiB9LFxuICAgIFwic3lcIjogeyBsYWJlbDogXCJTeXJpYW4gQXJhYiBSZXB1YmxpY1wiLCBmbGFnOiBcIvCfh7jwn4e+XCIgfSxcbiAgICBcInN6XCI6IHsgbGFiZWw6IFwiRXN3YXRpbmlcIiwgZmxhZzogXCLwn4e48J+Hv1wiIH0sXG4gICAgXCJ0YVwiOiB7IGxhYmVsOiBcIlRhbWlsXCIsIGZsYWc6IFwi8J+HrvCfh7NcIiB9LFxuICAgIFwidGNcIjogeyBsYWJlbDogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIiwgZmxhZzogXCLwn4e58J+HqFwiIH0sXG4gICAgXCJ0ZFwiOiB7IGxhYmVsOiBcIkNoYWRcIiwgZmxhZzogXCLwn4e58J+HqVwiIH0sXG4gICAgXCJ0ZVwiOiB7IGxhYmVsOiBcIlRlbHVndVwiLCBmbGFnOiBcIvCfh67wn4ezXCIgfSxcbiAgICBcInRmXCI6IHsgbGFiZWw6IFwiRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzXCIsIGZsYWc6IFwi8J+HufCfh6tcIiB9LFxuICAgIFwidGdcIjogeyBsYWJlbDogXCJUYWppa1wiLCBmbGFnOiBcIvCfh7nwn4evXCIgfSxcbiAgICBcInRoXCI6IHsgbGFiZWw6IFwiVGhhaVwiLCBmbGFnOiBcIvCfh7nwn4etXCIgfSxcbiAgICBcInRpXCI6IHsgbGFiZWw6IFwiVGlncmlueWFcIiwgZmxhZzogXCLwn4eq8J+Ht1wiIH0sXG4gICAgXCJ0alwiOiB7IGxhYmVsOiBcIlRhamlraXN0YW5cIiwgZmxhZzogXCLwn4e58J+Hr1wiIH0sXG4gICAgXCJ0a1wiOiB7IGxhYmVsOiBcIlR1cmttZW5cIiwgZmxhZzogXCLwn4e58J+HslwiIH0sXG4gICAgXCJ0bFwiOiB7IGxhYmVsOiBcIlRhZ2Fsb2dcIiwgZmxhZzogXCLwn4e18J+HrVwiIH0sXG4gICAgXCJ0bVwiOiB7IGxhYmVsOiBcIlR1cmttZW5pc3RhblwiLCBmbGFnOiBcIvCfh7nwn4eyXCIgfSxcbiAgICBcInRuXCI6IHsgbGFiZWw6IFwiVHN3YW5hXCIsIGZsYWc6IFwi8J+Hp/Cfh7xcIiB9LFxuICAgIFwidG9cIjogeyBsYWJlbDogXCJUb25nYSAoVG9uZ2EgSXNsYW5kcylcIiwgZmxhZzogXCLwn4e58J+HtFwiIH0sXG4gICAgXCJ0clwiOiB7IGxhYmVsOiBcIlR1cmtpc2hcIiwgZmxhZzogXCLwn4e58J+Ht1wiIH0sXG4gICAgXCJ0c1wiOiB7IGxhYmVsOiBcIlRzb25nYVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInR0XCI6IHsgbGFiZWw6IFwiVGF0YXJcIiwgZmxhZzogXCLwn4e38J+HulwiIH0sXG4gICAgXCJ0dlwiOiB7IGxhYmVsOiBcIlR1dmFsdVwiLCBmbGFnOiBcIvCfh7nwn4e7XCIgfSxcbiAgICBcInR3XCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoVHJhZGl0aW9uYWwpXCIsIGZsYWc6IFwi8J+HufCfh7xcIiB9LFxuICAgIFwidHlcIjogeyBsYWJlbDogXCJUYWhpdGlhblwiLCBmbGFnOiBcIvCfh7Xwn4erXCIgfSxcbiAgICBcInR6XCI6IHsgbGFiZWw6IFwiVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZlwiLCBmbGFnOiBcIvCfh7nwn4e/XCIgfSxcbiAgICBcInVhXCI6IHsgbGFiZWw6IFwiVWtyYWluaWFuXCIsIGZsYWc6IFwi8J+HuvCfh6ZcIiB9LFxuICAgIFwidWdcIjogeyBsYWJlbDogXCJVeWdodXJcIiwgZmxhZzogXCLwn4eo8J+Hs1wiIH0sXG4gICAgXCJ1a1wiOiB7IGxhYmVsOiBcIkVuZ2xpc2ggKFVLKVwiLCBmbGFnOiBcIvCfh6zwn4enXCIgfSxcbiAgICBcInVrLXVhXCI6IHsgbGFiZWw6IFwiVWtyYWluaWFuIChVa3JhaW5lKVwiLCBmbGFnOiBcIvCfh7rwn4emXCIgfSxcbiAgICBcInVtXCI6IHsgbGFiZWw6IFwiVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzXCIsIGZsYWc6IFwi8J+HuvCfh7JcIiB9LFxuICAgIFwidXJcIjogeyBsYWJlbDogXCJVcmR1XCIsIGZsYWc6IFwi8J+HtfCfh7BcIiB9LFxuICAgIFwidXNcIjogeyBsYWJlbDogXCJFbmdsaXNoIChVUylcIiwgZmxhZzogXCLwn4e68J+HuFwiIH0sXG4gICAgXCJ1eVwiOiB7IGxhYmVsOiBcIlVydWd1YXlcIiwgZmxhZzogXCLwn4e68J+HvlwiIH0sXG4gICAgXCJ1elwiOiB7IGxhYmVsOiBcIlV6YmVrXCIsIGZsYWc6IFwi8J+HuvCfh79cIiB9LFxuICAgIFwidmFcIjogeyBsYWJlbDogXCJIb2x5IFNlZVwiLCBmbGFnOiBcIvCfh7vwn4emXCIgfSxcbiAgICBcInZjXCI6IHsgbGFiZWw6IFwiU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXNcIiwgZmxhZzogXCLwn4e78J+HqFwiIH0sXG4gICAgXCJ2ZVwiOiB7IGxhYmVsOiBcIlZlbmRhXCIsIGZsYWc6IFwi8J+Hv/Cfh6ZcIiB9LFxuICAgIFwidmdcIjogeyBsYWJlbDogXCJWaXJnaW4gSXNsYW5kcyAoQnJpdGlzaClcIiwgZmxhZzogXCLwn4e78J+HrFwiIH0sXG4gICAgXCJ2aVwiOiB7IGxhYmVsOiBcIlZpZXRuYW1lc2VcIiwgZmxhZzogXCLwn4e78J+Hs1wiIH0sXG4gICAgXCJ2blwiOiB7IGxhYmVsOiBcIlZpZXQgTmFtXCIsIGZsYWc6IFwi8J+Hu/Cfh7NcIiB9LFxuICAgIFwidm9cIjogeyBsYWJlbDogXCJWb2xhcMO8a1wiLCBmbGFnOiBcIvCfjJBcIiB9LFxuICAgIFwidnVcIjogeyBsYWJlbDogXCJWYW51YXR1XCIsIGZsYWc6IFwi8J+Hu/Cfh7pcIiB9LFxuICAgIFwid2FcIjogeyBsYWJlbDogXCJXYWxsb29uXCIsIGZsYWc6IFwi8J+Hp/Cfh6pcIiB9LFxuICAgIFwid2ZcIjogeyBsYWJlbDogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLCBmbGFnOiBcIvCfh7zwn4erXCIgfSxcbiAgICBcIndvXCI6IHsgbGFiZWw6IFwiV29sb2ZcIiwgZmxhZzogXCLwn4e48J+Hs1wiIH0sXG4gICAgXCJ3c1wiOiB7IGxhYmVsOiBcIlNhbW9hXCIsIGZsYWc6IFwi8J+HvPCfh7hcIiB9LFxuICAgIFwieGhcIjogeyBsYWJlbDogXCJYaG9zYVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInllXCI6IHsgbGFiZWw6IFwiWWVtZW5cIiwgZmxhZzogXCLwn4e+8J+HqlwiIH0sXG4gICAgXCJ5aVwiOiB7IGxhYmVsOiBcIllpZGRpc2hcIiwgZmxhZzogXCLwn4eu8J+HsVwiIH0sXG4gICAgXCJ5b1wiOiB7IGxhYmVsOiBcIllvcnViYVwiLCBmbGFnOiBcIvCfh7Pwn4esXCIgfSxcbiAgICBcInl0XCI6IHsgbGFiZWw6IFwiTWF5b3R0ZVwiLCBmbGFnOiBcIvCfh77wn4e5XCIgfSxcbiAgICBcInphXCI6IHsgbGFiZWw6IFwiWmh1YW5nXCIsIGZsYWc6IFwi8J+HqPCfh7NcIiB9LFxuICAgIFwiemhcIjogeyBsYWJlbDogXCJDaGluZXNlXCIsIGZsYWc6IFwi8J+HqPCfh7NcIiB9LFxuICAgIFwiemgtY25cIjogeyBsYWJlbDogXCJDaGluZXNlIChTaW1wbGlmaWVkKVwiLCBmbGFnOiBcIvCfh6jwn4ezXCIgfSxcbiAgICBcInpoLWhrXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoSG9uZyBLb25nKVwiLCBmbGFnOiBcIvCfh63wn4ewXCIgfSxcbiAgICBcInpoLW1vXCI6IHsgbGFiZWw6IFwiQ2hpbmVzZSAoTWFjYXUpXCIsIGZsYWc6IFwi8J+HsvCfh7RcIiB9LFxuICAgIFwiemgtc2dcIjogeyBsYWJlbDogXCJDaGluZXNlIChTaW5nYXBvcmUpXCIsIGZsYWc6IFwi8J+HuPCfh6xcIiB9LFxuICAgIFwiemgtdHdcIjogeyBsYWJlbDogXCJDaGluZXNlIChUcmFkaXRpb25hbClcIiwgZmxhZzogXCLwn4e58J+HvFwiIH0sXG4gICAgXCJ6bVwiOiB7IGxhYmVsOiBcIlphbWJpYVwiLCBmbGFnOiBcIvCfh7/wn4eyXCIgfSxcbiAgICBcInp1XCI6IHsgbGFiZWw6IFwiWnVsdVwiLCBmbGFnOiBcIvCfh7/wn4emXCIgfSxcbiAgICBcInp3XCI6IHsgbGFiZWw6IFwiWmltYmFid2VcIiwgZmxhZzogXCLwn4e/8J+HvFwiIH1cbiAgfTtcblxuICAvKiogQHJldHVybnMge0hUTUxFbGVtZW50fG51bGx9ICovXG4gIGZ1bmN0aW9uIGZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QoZm9ybSwgY29udHJvbENvbnRhaW5lckVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChmb3JtICYmIGZvcm0uc2VjdGlvbnMgJiYgZm9ybS5zZWN0aW9uc1swXSAmJiBmb3JtLnNlY3Rpb25zWzBdLmNvbnRhaW5lckVsKSB7XG4gICAgICAgIHZhciBzZWMgPSBmb3JtLnNlY3Rpb25zWzBdLmNvbnRhaW5lckVsO1xuICAgICAgICBpZiAoc2VjLmNsb3Nlc3QpIHtcbiAgICAgICAgICAvKiogUHJlZmVyIGAucGFuZWwtZ3JvdXBgIG92ZXIgYCNpY2UtY29udGFpbmVyYCBzbyB3ZSB3cmFwIGFjY29yZGlvbiBzZWN0aW9ucyBvbmx5LCBub3QgdGhlIHdob2xlIElDRSBzaGVsbCAoZml4ZXMgY29udHJvbHMgbGlrZSBmaWxlLW5hbWUgLyBYQikuICovXG4gICAgICAgICAgdmFyIHBnID0gc2VjLmNsb3Nlc3QoXCIucGFuZWwtZ3JvdXBcIik7XG4gICAgICAgICAgaWYgKHBnKSByZXR1cm4gcGc7XG4gICAgICAgICAgdmFyIGljZSA9IHNlYy5jbG9zZXN0KFwiI2ljZS1jb250YWluZXJcIik7XG4gICAgICAgICAgaWYgKGljZSkgcmV0dXJuIGljZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VjLnBhcmVudE5vZGUgJiYgc2VjLnBhcmVudE5vZGUubm9kZVR5cGUgPT09IDEgPyAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyAoc2VjLnBhcmVudE5vZGUpIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sQ29udGFpbmVyRWwgJiYgY29udHJvbENvbnRhaW5lckVsLmNsb3Nlc3QpIHtcbiAgICAgICAgdmFyIHBnMiA9IGNvbnRyb2xDb250YWluZXJFbC5jbG9zZXN0KFwiLnBhbmVsLWdyb3VwXCIpO1xuICAgICAgICBpZiAocGcyKSByZXR1cm4gcGcyO1xuICAgICAgICB2YXIgaWNlMiA9IGNvbnRyb2xDb250YWluZXJFbC5jbG9zZXN0KFwiI2ljZS1jb250YWluZXJcIik7XG4gICAgICAgIGlmIChpY2UyKSByZXR1cm4gaWNlMjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlMikge31cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVud3JhcEZvcm1Db21wYXJlTGF5b3V0KGhvc3QpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFob3N0IHx8IGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkICE9PSBcIjFcIikgcmV0dXJuO1xuICAgICAgdmFyIHJvdyA9IGhvc3QuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBpZiAoIXJvdyB8fCAhcm93LmNsYXNzTGlzdCB8fCAhcm93LmNsYXNzTGlzdC5jb250YWlucyhcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1yb3dcIikpIHtcbiAgICAgICAgZGVsZXRlIGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgbWFpbiA9IHJvdy5xdWVyeVNlbGVjdG9yKFwiLnRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1tYWluXCIpO1xuICAgICAgaWYgKG1haW4pIHtcbiAgICAgICAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGhvc3QuYXBwZW5kQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaG9zdC5yZW1vdmVDaGlsZChyb3cpO1xuICAgICAgZGVsZXRlIGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkO1xuICAgIH0gY2F0Y2ggKGUzKSB7fVxuICB9XG5cbiAgdmFyIFNNQVJUQ09QWV9DT01QQVJFX1dJRFRIX0xTID0gXCJ0cmFuc2xhdGlvblNvdXJjZUNvbXBhcmVXaWR0aFB4XCI7XG4gIC8qKiBQZXItc2l0ZTogXCIxXCIgPSBjb2xsYXBzZWQgb24gYWxsIGZvcm1zIGZvciB0aGF0IHNpdGUuICovXG4gIHZhciBUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfTFNfUFJFRklYID0gXCJ1aWdvb2RpZXMudHJhbnNsYXRpb25WZXJzaW9ucy5jb2xsYXBzZWQuXCI7XG4gIHZhciBUUkFOU0xBVElPTl9XSURHRVRfQ09MTEFQU0VfRVZFTlQgPSBcInVpZ29vZGllcy50cmFuc2xhdGlvblZlcnNpb25zLmNvbGxhcHNlZENoYW5nZWRcIjtcblxuICBmdW5jdGlvbiB0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleShzaXRlSWQpIHtcbiAgICByZXR1cm4gVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0xTX1BSRUZJWCArIFN0cmluZyhzaXRlSWQgfHwgXCJfXCIpLnRyaW0oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZChzaXRlSWQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0cmFuc2xhdGlvbldpZGdldENvbGxhcHNlU3RvcmFnZUtleShzaXRlSWQpKSA9PT0gXCIxXCJcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQoc2l0ZUlkLCBjb2xsYXBzZWQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZVN0b3JhZ2VLZXkoc2l0ZUlkKSwgY29sbGFwc2VkID8gXCIxXCIgOiBcIjBcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZUxzKSB7fVxuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LmRpc3BhdGNoRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHsgc2l0ZUlkOiBTdHJpbmcoc2l0ZUlkIHx8IFwiXCIpLnRyaW0oKSwgY29sbGFwc2VkOiAhIWNvbGxhcHNlZCB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlRXYpIHt9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVNvdXJjZVBhbmVXaWR0aFB4KGxlZnRFbCwgdG90YWxSb3dXaWR0aFB4LCB3aWR0aFB4KSB7XG4gICAgdmFyIG1pblcgPSAyMDA7XG4gICAgdmFyIG1heFcgPSBNYXRoLm1heChtaW5XICsgODAsIE1hdGgucm91bmQodG90YWxSb3dXaWR0aFB4KSAtIDI2MCk7XG4gICAgdmFyIHcgPSBNYXRoLm1heChtaW5XLCBNYXRoLm1pbihtYXhXLCBNYXRoLnJvdW5kKHdpZHRoUHgpKSk7XG4gICAgbGVmdEVsLnN0eWxlLmZsZXggPSBcIjAgMCBcIiArIHcgKyBcInB4XCI7XG4gICAgbGVmdEVsLnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbiAgICBsZWZ0RWwuc3R5bGUubWF4V2lkdGggPSBcIm5vbmVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRJbml0aWFsU291cmNlUGFuZVdpZHRoUHgoaG9zdFdpZHRoUHgpIHtcbiAgICB2YXIgbWF4QWxsb3dlZCA9IE1hdGgubWF4KDI4MCwgTWF0aC5yb3VuZChob3N0V2lkdGhQeCkgLSAyNjApO1xuICAgIHRyeSB7XG4gICAgICB2YXIgcyA9IHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU01BUlRDT1BZX0NPTVBBUkVfV0lEVEhfTFMpO1xuICAgICAgdmFyIG4gPSBwYXJzZUludChzLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKG4pICYmIG4gPj0gMjAwICYmIG4gPD0gbWF4QWxsb3dlZCkge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlMCkge31cbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5mbG9vcihob3N0V2lkdGhQeCAqIDAuNDQpLCA2MDAsIG1heEFsbG93ZWQpO1xuICB9XG5cbiAgLyoqIERyYWdnYWJsZSB2ZXJ0aWNhbCBzcGxpdHRlciBiZXR3ZWVuIHNvdXJjZSBwYW5lIGFuZCBtYWluIGZvcm0gY29sdW1uLiAqL1xuICBmdW5jdGlvbiBhdHRhY2hTbWFydGNvcHlDb21wYXJlU3BsaXR0ZXIocm93KSB7XG4gICAgdmFyIHNwbGl0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcGxpdHRlci5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1zcGxpdHRlclwiO1xuICAgIHNwbGl0dGVyLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJzZXBhcmF0b3JcIik7XG4gICAgc3BsaXR0ZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1vcmllbnRhdGlvblwiLCBcInZlcnRpY2FsXCIpO1xuICAgIHNwbGl0dGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEcmFnIHRvIHJlc2l6ZSBzb3VyY2UgcGFuZWwgd2lkdGhcIik7XG4gICAgc3BsaXR0ZXIudGFiSW5kZXggPSAwO1xuICAgIHNwbGl0dGVyLnN0eWxlLmNzc1RleHQgPVxuICAgICAgXCJmbGV4OjAgMCAxMHB4O3dpZHRoOjEwcHg7Y3Vyc29yOmNvbC1yZXNpemU7YWxpZ24tc2VsZjpzdHJldGNoO3RvdWNoLWFjdGlvbjpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQ6dmFyKC0tdHYtcmVzaXplKTtib3JkZXItcmFkaXVzOjRweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLXR2LXJlc2l6ZS1iZCk7XCI7XG4gICAgc3BsaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgbGVmdEVsID0gcm93LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtaWZyYW1lLWhvc3RcIik7XG4gICAgICBpZiAoIWxlZnRFbCkgcmV0dXJuO1xuICAgICAgdmFyIHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICAgIHZhciBzdGFydFcgPSBsZWZ0RWwub2Zmc2V0V2lkdGg7XG4gICAgICB2YXIgbWluVyA9IDIwMDtcbiAgICAgIGZ1bmN0aW9uIGdldE1heFcoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChtaW5XICsgODAsIE1hdGgucm91bmQocm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSAtIDI2MCk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBzcGxpdHRlci5zZXRQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICB9IGNhdGNoIChjYXApIHt9XG4gICAgICBmdW5jdGlvbiBvbk1vdmUoZXYpIHtcbiAgICAgICAgdmFyIGR4ID0gZXYuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgICAgdmFyIG53ID0gc3RhcnRXICsgZHg7XG4gICAgICAgIHZhciBtYXhXID0gZ2V0TWF4VygpO1xuICAgICAgICBpZiAobncgPCBtaW5XKSBudyA9IG1pblc7XG4gICAgICAgIGlmIChudyA+IG1heFcpIG53ID0gbWF4VztcbiAgICAgICAgbGVmdEVsLnN0eWxlLmZsZXggPSBcIjAgMCBcIiArIG53ICsgXCJweFwiO1xuICAgICAgICBsZWZ0RWwuc3R5bGUud2lkdGggPSBudyArIFwicHhcIjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvbk1vdmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIG9uVXApO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCBvblVwKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzcGxpdHRlci5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpO1xuICAgICAgICB9IGNhdGNoIChyZWwpIHt9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNNQVJUQ09QWV9DT01QQVJFX1dJRFRIX0xTLCBTdHJpbmcobGVmdEVsLm9mZnNldFdpZHRoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChscykge31cbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBvblVwKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIG9uVXApO1xuICAgIH0pO1xuICAgIHJvdy5hcHBlbmRDaGlsZChzcGxpdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogUHV0cyByZWFkLW9ubHkgc291cmNlIGlmcmFtZSB0byB0aGUgbGVmdCBvZiBhbGwgY3VycmVudCBmb3JtIGZpZWxkcyAoc2VjdGlvbnMpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWZyYW1lU3JjXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoTGFiZWxcbiAgICovXG4gIGZ1bmN0aW9uIHdyYXBGb3JtQ29tcGFyZUxheW91dChob3N0LCBpZnJhbWVTcmMsIHBhdGhMYWJlbCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWhvc3QgfHwgIWlmcmFtZVNyYykgcmV0dXJuO1xuICAgICAgaWYgKGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkID09PSBcIjFcIikge1xuICAgICAgICB2YXIgZXhpc3RpbmdJZnJhbWUgPSBob3N0LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtaWZyYW1lLWhvc3QgaWZyYW1lXCIpO1xuICAgICAgICBpZiAoZXhpc3RpbmdJZnJhbWUpIHtcbiAgICAgICAgICBleGlzdGluZ0lmcmFtZS5zcmMgPSBpZnJhbWVTcmM7XG4gICAgICAgICAgZXhpc3RpbmdJZnJhbWUuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgICAgICBcImZsZXg6MSAxIGF1dG87bWluLWhlaWdodDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS10di1yZXNpemUtYmQpO2JvcmRlci1yYWRpdXM6NnB4O2JhY2tncm91bmQ6dmFyKC0tdHYtYmcpO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29kZUVsID0gaG9zdC5xdWVyeVNlbGVjdG9yKFwiLnRyYW5zbGF0aW9uLXNvdXJjZS1jb21wYXJlLXBhdGhcIik7XG4gICAgICAgIGlmIChjb2RlRWwpIGNvZGVFbC50ZXh0Q29udGVudCA9IHBhdGhMYWJlbCB8fCBcIlwiO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHJvdy5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1yb3dcIjtcbiAgICAgIHJvdy5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgXCJkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOnN0cmV0Y2g7Z2FwOjhweDt3aWR0aDoxMDAlO21pbi1oZWlnaHQ6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCI7XG5cbiAgICAgIHZhciBob3N0VyA9IGhvc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDgwMCkgfHwgODAwO1xuICAgICAgdmFyIGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbGVmdC5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLXNvdXJjZS1jb21wYXJlLWlmcmFtZS1ob3N0XCI7XG4gICAgICBsZWZ0LnN0eWxlLmNzc1RleHQgPVxuICAgICAgICBcImZsZXg6MCAwIGF1dG87ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6OHB4O21pbi1oZWlnaHQ6MDthbGlnbi1zZWxmOnN0cmV0Y2g7Ym94LXNpemluZzpib3JkZXItYm94O1wiO1xuICAgICAgYXBwbHlTb3VyY2VQYW5lV2lkdGhQeChsZWZ0LCBob3N0VywgcmVhZEluaXRpYWxTb3VyY2VQYW5lV2lkdGhQeChob3N0VykpO1xuXG4gICAgICB2YXIgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhlYWRlci5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgXCJkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2dhcDo4cHg7ZmxleC13cmFwOndyYXA7ZmxleC1zaHJpbms6MDtcIjtcbiAgICAgIHZhciB0aXRsZUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRpdGxlQmxvY2suc3R5bGUubWluV2lkdGggPSBcIjBcIjtcbiAgICAgIHZhciBzdHJvbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3Ryb25nXCIpO1xuICAgICAgc3Ryb25nLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLXR2LXRleHQpO1wiO1xuICAgICAgc3Ryb25nLnRleHRDb250ZW50ID0gXCJTb3VyY2UgKHJlYWQtb25seSlcIjtcbiAgICAgIHRpdGxlQmxvY2suYXBwZW5kQ2hpbGQoc3Ryb25nKTtcbiAgICAgIHZhciBzdWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3ViLmNsYXNzTmFtZSA9IFwidGV4dC1tdXRlZFwiO1xuICAgICAgc3ViLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxMHB4O21hcmdpbi10b3A6MnB4O3dvcmQtYnJlYWs6YnJlYWstYWxsO1wiO1xuICAgICAgdmFyIGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY29kZVwiKTtcbiAgICAgIGNvZGUuY2xhc3NOYW1lID0gXCJ0cmFuc2xhdGlvbi1zb3VyY2UtY29tcGFyZS1wYXRoXCI7XG4gICAgICBjb2RlLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxMHB4O1wiO1xuICAgICAgY29kZS50ZXh0Q29udGVudCA9IHBhdGhMYWJlbCB8fCBcIlwiO1xuICAgICAgc3ViLmFwcGVuZENoaWxkKGNvZGUpO1xuICAgICAgdGl0bGVCbG9jay5hcHBlbmRDaGlsZChzdWIpO1xuICAgICAgdmFyIGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNsb3NlQnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgY2xvc2VCdG4uY2xhc3NOYW1lID0gXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCI7XG4gICAgICBjbG9zZUJ0bi50ZXh0Q29udGVudCA9IFwiQ2xvc2VcIjtcbiAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidHJhbnNsYXRpb246Y2xvc2Utc291cmNlLWNvbXBhcmVcIikpO1xuICAgICAgICB9IGNhdGNoIChlNCkge31cbiAgICAgIH0pO1xuICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlQmxvY2spO1xuICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICBpZnJhbWUudGl0bGUgPSBcIlNvdXJjZSBpdGVtIOKAlCByZWFkLW9ubHkgZm9ybVwiO1xuICAgICAgaWZyYW1lLnNyYyA9IGlmcmFtZVNyYztcbiAgICAgIGlmcmFtZS5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgXCJmbGV4OjEgMSBhdXRvO21pbi1oZWlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JvcmRlcjoxcHggc29saWQgdmFyKC0tdHYtcmVzaXplLWJkKTtib3JkZXItcmFkaXVzOjZweDtiYWNrZ3JvdW5kOnZhcigtLXR2LWJnKTtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCI7XG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGlmcmFtZSk7XG5cbiAgICAgIHZhciBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1haW4uY2xhc3NOYW1lID0gXCJ0cmFuc2xhdGlvbi1mb3JtLWNvbXBhcmUtbWFpblwiO1xuICAgICAgbWFpbi5zdHlsZS5jc3NUZXh0ID0gXCJmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MDt3aWR0aDoxMDAlO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcbiAgICAgIHdoaWxlIChob3N0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChob3N0LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgcm93LmFwcGVuZENoaWxkKGxlZnQpO1xuICAgICAgYXR0YWNoU21hcnRjb3B5Q29tcGFyZVNwbGl0dGVyKHJvdyk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQobWFpbik7XG4gICAgICBob3N0LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICBob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZCA9IFwiMVwiO1xuICAgIH0gY2F0Y2ggKGU1KSB7fVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxlTGlzdCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgXCJlblwiLFxuICAgICAgXCJlc1wiLFxuICAgICAgXCJqYVwiLFxuICAgICAgXCJ6aFwiLFxuICAgICAgXCJ1c1wiLFxuICAgICAgXCJ1a1wiLFxuICAgICAgXCJkZVwiLFxuICAgICAgXCJmclwiLFxuICAgICAgXCJpdFwiLFxuICAgICAgXCJka1wiLFxuICAgICAgXCJmaVwiLFxuICAgICAgXCJubFwiLFxuICAgICAgXCJub1wiLFxuICAgICAgXCJydVwiLFxuICAgICAgXCJzZVwiLFxuICAgICAgXCJiclwiLFxuICAgICAgXCJlbFwiLFxuICAgICAgXCJqcFwiLFxuICAgICAgXCJwdFwiLFxuICAgICAgXCJrb1wiLFxuICAgICAgXCJhclwiLFxuICAgICAgXCJwbFwiLFxuICAgICAgXCJ0clwiLFxuICAgICAgXCJ2aVwiXG4gICAgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvY2FsZUZyb21QYXRoKHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHJldHVybiBcIlwiO1xuICAgIHZhciBwYXJ0cyA9IHBhdGhcbiAgICAgIC5yZXBsYWNlKC9eXFwvc2l0ZVxcL1teL10rXFwvL2ksIFwiXCIpXG4gICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHJldHVybiBcIlwiO1xuICAgIHZhciBsaXN0ID0gZ2V0TG9jYWxlTGlzdCgpO1xuICAgIHZhciBmaXJzdCA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKFJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTW2ZpcnN0XSAmJiBwYXJ0c1sxXSkge1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IHBhcnRzWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAobGlzdC5pbmRleE9mKGNhbmRpZGF0ZSkgPj0gMCkgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICAgIGlmICgvXlthLXpdezJ9KC1bYS16MC05XXsxLDh9KT8kL2kudGVzdChwYXJ0c1sxXSkpIHJldHVybiBjYW5kaWRhdGU7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgaWYgKFJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTW2ZpcnN0XSkgcmV0dXJuIFwiXCI7XG4gICAgaWYgKGxpc3QuaW5kZXhPZihmaXJzdCkgPj0gMCkgcmV0dXJuIGZpcnN0O1xuICAgIGlmICgvXlthLXpdezJ9KC1bYS16MC05XXsxLDh9KT8kL2kudGVzdChwYXJ0c1swXSkpIHJldHVybiBmaXJzdDtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKiBTYW1lIGFzIHRyYW5zbGF0aW9uLWNvbXBvbmVudHMge0Bjb2RlIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZX0gKGFyIOKGlCBhci1zYSwgemgg4oaUIHpoLWNuKS4gKi9cbiAgZnVuY3Rpb24gbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGEsIGIpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhhIHx8IFwiXCIpXG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL18vZywgXCItXCIpO1xuICAgIHZhciBjID0gU3RyaW5nKGIgfHwgXCJcIilcbiAgICAgIC50cmltKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgvXy9nLCBcIi1cIik7XG4gICAgaWYgKCFzIHx8ICFjKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHMgPT09IGMpIHJldHVybiB0cnVlO1xuICAgIGlmIChzLnN0YXJ0c1dpdGgoYyArIFwiLVwiKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGMuc3RhcnRzV2l0aChzICsgXCItXCIpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXRhRm9yUGF0aExvY2FsZShhY3RpdmVNZXRhLCBsb2MpIHtcbiAgICB2YXIgbGsgPSBTdHJpbmcobG9jIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGFjdGl2ZU1ldGEgJiYgYWN0aXZlTWV0YVtsa10pIHJldHVybiBhY3RpdmVNZXRhW2xrXTtcbiAgICBpZiAoIWFjdGl2ZU1ldGEpIHJldHVybiBudWxsO1xuICAgIGZvciAodmFyIGtleSBpbiBhY3RpdmVNZXRhKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhY3RpdmVNZXRhLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobGssIGtleSkpIHJldHVybiBhY3RpdmVNZXRhW2tleV07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRpb25Mb2NhbGVBbHJlYWR5UHJlc2VudCh0cmFuc2xhdGVkTG9jYWxlcywgbG9jKSB7XG4gICAgdmFyIGxrID0gU3RyaW5nKGxvYyB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0cmFuc2xhdGVkTG9jYWxlc1tsa10pIHJldHVybiB0cnVlO1xuICAgIGZvciAodmFyIHNlZyBpbiB0cmFuc2xhdGVkTG9jYWxlcykge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodHJhbnNsYXRlZExvY2FsZXMsIHNlZykpIGNvbnRpbnVlO1xuICAgICAgaWYgKCF0cmFuc2xhdGVkTG9jYWxlc1tzZWddKSBjb250aW51ZTtcbiAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUoc2VnLCBsaykpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogTm9ybWFsaXplIHJlcG8gcGF0aHMgZm9yIGVxdWFsaXR5IChzbGFzaGVzLCBubyB0cmFpbGluZyBzbGFzaCkuICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVN0dWRpb1BhdGgocCkge1xuICAgIHJldHVybiBTdHJpbmcocCB8fCBcIlwiKVxuICAgICAgLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpXG4gICAgICAucmVwbGFjZSgvXFwvKyQvLCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE11bHRpTG9jYWxlUm9vdERpcihmdWxsUGF0aCkge1xuICAgIGlmICghZnVsbFBhdGgpIHJldHVybiBudWxsO1xuICAgIHZhciBtID0gZnVsbFBhdGgubWF0Y2goL14oXFwvc2l0ZVxcL1teL10rXFwvKD86d2Vic2l0ZXxjb21wb25lbnRzKSkoPz1cXC98JCkvaSk7XG4gICAgaWYgKG0pIHJldHVybiBtWzFdO1xuICAgIG0gPSBmdWxsUGF0aC5tYXRjaCgvXihcXC9zaXRlXFwvKD86d2Vic2l0ZXxjb21wb25lbnRzKSkoPz1cXC98JCkvaSk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN1ZmZpeEFmdGVyTG9jYWxlKGZ1bGxQYXRoLCByb290RGlyLCBsb2NhbGUpIHtcbiAgICBpZiAoIWZ1bGxQYXRoIHx8ICFyb290RGlyIHx8ICFsb2NhbGUpIHJldHVybiBudWxsO1xuICAgIHZhciBwID0gcm9vdERpci5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIiArIGxvY2FsZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBsb3dlciA9IGZ1bGxQYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHBsID0gcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsb3dlciA9PT0gcGwpIHJldHVybiBcIlwiO1xuICAgIHZhciBwcmVmaXggPSBwbCArIFwiL1wiO1xuICAgIGlmIChsb3dlci5zdGFydHNXaXRoKHByZWZpeCkpIHtcbiAgICAgIHJldHVybiBmdWxsUGF0aC5zbGljZShwLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBsb2NhbGUsIHN1ZmZpeCkge1xuICAgIHZhciByID0gcm9vdERpci5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgdmFyIHN1ZiA9IHN1ZmZpeCA9PT0gXCJcIiA/IFwiXCIgOiBzdWZmaXguc3RhcnRzV2l0aChcIi9cIikgPyBzdWZmaXggOiBcIi9cIiArIHN1ZmZpeDtcbiAgICByZXR1cm4gciArIFwiL1wiICsgbG9jYWxlLnRvTG93ZXJDYXNlKCkgKyBzdWY7XG4gIH1cblxuICAvKipcbiAgICogVW5kZXIgcm9vdERpciAoL3NpdGUve2lkfS93ZWJzaXRlIG9yIC4uLi9jb21wb25lbnRzKSwgZmlyc3QgcGF0aCBzZWdtZW50IGlzIHRoZSBsb2NhbGUgZm9sZGVyO1xuICAgKiBldmVyeXRoaW5nIGFmdGVyIHRoYXQgaXMgdGhlIG1pcnJvcmVkIHN1ZmZpeCBmb3Igb3RoZXIgbG9jYWxlcy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlU3VmZml4RnJvbUZvcm1QYXRoKGZvcm1QYXRoLCByb290RGlyKSB7XG4gICAgaWYgKCFmb3JtUGF0aCB8fCAhcm9vdERpcikgcmV0dXJuIHsgc3VmZml4OiBudWxsIH07XG4gICAgdmFyIHIgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB2YXIgZnAgPSBTdHJpbmcoZm9ybVBhdGgpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xuICAgIHZhciBybCA9IHIudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgZmwgPSBmcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChmbCA9PT0gcmwpIHJldHVybiB7IHN1ZmZpeDogXCJcIiB9O1xuICAgIGlmIChmbC5pbmRleE9mKHJsICsgXCIvXCIpICE9PSAwKSByZXR1cm4geyBzdWZmaXg6IG51bGwgfTtcbiAgICB2YXIgcmVzdCA9IGZwLnNsaWNlKHIubGVuZ3RoKTtcbiAgICBpZiAocmVzdC5jaGFyQXQoMCkgPT09IFwiL1wiKSByZXN0ID0gcmVzdC5zbGljZSgxKTtcbiAgICB2YXIgcGFydHMgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHsgc3VmZml4OiBcIlwiIH07XG4gICAgdmFyIHN1ZmZpeFBhcnRzID0gcGFydHMuc2xpY2UoMSk7XG4gICAgaWYgKHN1ZmZpeFBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHsgc3VmZml4OiBcIlwiIH07XG4gICAgcmV0dXJuIHsgc3VmZml4OiBcIi9cIiArIHN1ZmZpeFBhcnRzLmpvaW4oXCIvXCIpIH07XG4gIH1cblxuICAvKiogRmlyc3QgcGF0aCBzZWdtZW50IHVuZGVyIHJvb3REaXIgKHRoZSBsb2NhbGUgZm9sZGVyKSwgbG93ZXJjYXNlZC4gKi9cbiAgZnVuY3Rpb24gZmlyc3RMb2NhbGVTZWdtZW50VW5kZXJSb290KHBhdGgsIHJvb3REaXIpIHtcbiAgICBpZiAoIXBhdGggfHwgIXJvb3REaXIpIHJldHVybiBcIlwiO1xuICAgIHZhciByID0gcm9vdERpci5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgdmFyIGZwID0gU3RyaW5nKHBhdGgpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xuICAgIHZhciBybCA9IHIudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgZmwgPSBmcC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChmbCAhPT0gcmwgJiYgZmwuaW5kZXhPZihybCArIFwiL1wiKSAhPT0gMCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHJlc3QgPSBmbCA9PT0gcmwgPyBcIlwiIDogZnAuc2xpY2Uoci5sZW5ndGgpO1xuICAgIGlmIChyZXN0LmNoYXJBdCgwKSA9PT0gXCIvXCIpIHJlc3QgPSByZXN0LnNsaWNlKDEpO1xuICAgIHZhciBzZWcgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbilbMF0gfHwgXCJcIjtcbiAgICByZXR1cm4gU3RyaW5nKHNlZykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKiBMb2NhbGVzIHRoYXQgYWxyZWFkeSBoYXZlIGEgdHJhbnNsYXRpb24gaXRlbSAoZnJvbSByZXBvIHBhdGhzIHVuZGVyIHJvb3REaXIpLiAqL1xuICBmdW5jdGlvbiBleGlzdGluZ1RyYW5zbGF0aW9uTG9jYWxlS2V5cyhwYXRocywgcm9vdERpciwgZm9ybVBhdGgpIHtcbiAgICB2YXIga2V5cyA9IHt9O1xuICAgIGZ1bmN0aW9uIGFkZChwKSB7XG4gICAgICB2YXIgayA9IGZpcnN0TG9jYWxlU2VnbWVudFVuZGVyUm9vdChwLCByb290RGlyKTtcbiAgICAgIGlmIChrKSBrZXlzW2tdID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkKGZvcm1QYXRoKTtcbiAgICAocGF0aHMgfHwgW10pLmZvckVhY2goYWRkKTtcbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIC8qKiBTdHVkaW8gL2FwaS8xL2NvbnRlbnQvY29udGVudC1leGlzdHMg4oCUIHVud3JhcCBjb21tb24gcmVzcG9uc2Ugc2hhcGVzLiAqL1xuICAvKiogQXV0aG9yaW5nIGJhc2UgZm9yIC9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50Ly4uLiAocHJlZiBwcm9wIG1heSBiZSBlbXB0eSBvbiBmaXJzdCBwYWludCkuICovXG4gIGZ1bmN0aW9uIHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShwcmVmKSB7XG4gICAgdmFyIGEgPSBwcmVmICYmIFN0cmluZyhwcmVmKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgaWYgKGEpIHJldHVybiBhO1xuICAgIHRyeSB7XG4gICAgICBhID0gZ2V0QXV0aG9yaW5nQmFzZSgpICYmIFN0cmluZyhnZXRBdXRob3JpbmdCYXNlKCkpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGEpIHJldHVybiBhO1xuICAgIHJldHVybiAoZ2V0U3R1ZGlvQXBpQmFzZSgpIHx8IFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF1dGhvcmluZ0Jhc2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjbXMgPSB3aW5kb3cuY3JhZnRlcmNtcztcbiAgICAgIGlmIChjbXMgJiYgdHlwZW9mIGNtcy5nZXRTdG9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IGNtcy5nZXRTdG9yZSgpO1xuICAgICAgICBpZiAoc3RvcmUgJiYgdHlwZW9mIHN0b3JlLmdldFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB2YXIgZW52ID0gc3RvcmUuZ2V0U3RhdGUoKS5lbnYgfHwge307XG4gICAgICAgICAgaWYgKGVudi5hdXRob3JpbmdCYXNlKSByZXR1cm4gZW52LmF1dGhvcmluZ0Jhc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgLyoqIFN0dWRpbyBSRVNUIGJhc2UgKGUuZy4gaHR0cHM6Ly9ob3N0L3N0dWRpbykgZm9yIC9hcGkvMi8uLi4gKi9cbiAgZnVuY3Rpb24gZ2V0U3R1ZGlvQXBpQmFzZSgpIHtcbiAgICB2YXIgYiA9IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICBpZiAoYikgcmV0dXJuIGIucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIGlmICh0eXBlb2YgQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQgIT09IFwidW5kZWZpbmVkXCIgJiYgQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQuYmFzZVVyaSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dC5iYXNlVXJpKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbWUgdHJhbnNwb3J0IGFzIFRyYW5zbGF0aW9uIChgYXBwcy90cmFuc2xhdGlvbi9pbmRleC5qc2ApOiBgY3JhZnRlcmNtcy51dGlscy5hamF4YFxuICAgKiBtZXJnZXMgQXV0aG9yaXphdGlvbiAoSldUKSBhbmQgb3RoZXIgZ2xvYmFsIGhlYWRlcnMg4oCUIHJhdyBgZmV0Y2hgIGdldHMgNDAxIG9uIGAvYXBpLzIvLi4uYC5cbiAgICovXG4gIGZ1bmN0aW9uIGdldENyYWZ0ZXJTdHVkaW9BamF4KCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgY21zID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuY3JhZnRlcmNtcztcbiAgICAgIGlmIChjbXMgJiYgY21zLnV0aWxzICYmIGNtcy51dGlscy5hamF4KSB7XG4gICAgICAgIHJldHVybiBjbXMudXRpbHMuYWpheDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VGZXRjaEhlYWRlcnMoZXh0cmEpIHtcbiAgICB2YXIgb3V0ID0gT2JqZWN0LmFzc2lnbih7fSwgZXh0cmEgfHwge30pO1xuICAgIHRyeSB7XG4gICAgICB2YXIgYWpheCA9IGdldENyYWZ0ZXJTdHVkaW9BamF4KCk7XG4gICAgICBpZiAoYWpheCAmJiB0eXBlb2YgYWpheC5nZXRHbG9iYWxIZWFkZXJzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXQsIGFqYXguZ2V0R2xvYmFsSGVhZGVycygpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHZhciBtID1cbiAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5jb29raWUubWF0Y2goLyg/Ol58O1xccyopWFNSRi1UT0tFTj0oW147XSspLyk7XG4gICAgaWYgKG0gJiYgIW91dFtcIlgtWFNSRi1UT0tFTlwiXSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0W1wiWC1YU1JGLVRPS0VOXCJdID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMV0pO1xuICAgICAgfSBjYXRjaCAoZTIpIHt9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiB1bndyYXBBamF4UmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocmVzLnJlc3BvbnNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXMucmVzcG9uc2U7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBmdW5jdGlvbiBzdHVkaW9BamF4R2V0KHVybCkge1xuICAgIHZhciBhamF4ID0gZ2V0Q3JhZnRlclN0dWRpb0FqYXgoKTtcbiAgICBpZiAoYWpheCAmJiB0eXBlb2YgYWpheC5nZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgYWpheC5nZXQodXJsKS5zdWJzY3JpYmUoe1xuICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBoZWFkZXJzOiBtZXJnZUZldGNoSGVhZGVycyh7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSlcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5qc29uKCkudGhlbihmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4geyBzdGF0dXM6IHIuc3RhdHVzLCByZXNwb25zZToganNvbiB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHBhcmFtIGJvZHkgc3RyaW5nIG9yIG9iamVjdCAob2JqZWN0IGlzIEpTT04uc3RyaW5naWZpZWQpICovXG4gIGZ1bmN0aW9uIHN0dWRpb0FqYXhQb3N0KHVybCwgYm9keSwgaGVhZGVycykge1xuICAgIHZhciBhamF4ID0gZ2V0Q3JhZnRlclN0dWRpb0FqYXgoKTtcbiAgICB2YXIgcGF5bG9hZCA9XG4gICAgICBib2R5ICE9IG51bGwgJiYgdHlwZW9mIGJvZHkgPT09IFwib2JqZWN0XCIgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IGJvZHkgIT0gbnVsbCA/IFN0cmluZyhib2R5KSA6IFwiXCI7XG4gICAgdmFyIGggPSBPYmplY3QuYXNzaWduKHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LCBoZWFkZXJzIHx8IHt9KTtcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09IFwib2JqZWN0XCIgJiYgYm9keSAhPSBudWxsICYmICFoW1wiQ29udGVudC1UeXBlXCJdKSB7XG4gICAgICBoW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG4gICAgfVxuICAgIGlmIChhamF4ICYmIHR5cGVvZiBhamF4LnBvc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgYWpheC5wb3N0KHVybCwgcGF5bG9hZCwgaCkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgcmVzb2x2ZShyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgIGhlYWRlcnM6IG1lcmdlRmV0Y2hIZWFkZXJzKGgpLFxuICAgICAgYm9keTogcGF5bG9hZFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmpzb24oKS50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogci5zdGF0dXMsIHJlc3BvbnNlOiBqc29uIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkoYm9keSkge1xuICAgIHZhciBwID0gYm9keSAmJiBib2R5LnJlc3VsdCAhPT0gdW5kZWZpbmVkID8gYm9keS5yZXN1bHQgOiBib2R5O1xuICAgIGlmIChwICYmIHR5cGVvZiBwID09PSBcIm9iamVjdFwiICYmIHAucmVzdWx0ICE9IG51bGwgJiYgcC5vayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwID0gcC5yZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBwICYmIHR5cGVvZiBwID09PSBcIm9iamVjdFwiID8gcCA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaFRyYW5zbGF0aW9uUmVtb3ZlQ2FuZGlkYXRlcyhzdHVkaW9CYXNlLCBzaXRlSWQsIHBhZ2VQYXRoKSB7XG4gICAgdmFyIHVybCA9XG4gICAgICBTdHJpbmcoc3R1ZGlvQmFzZSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIikgK1xuICAgICAgXCIvYXBpLzIvcGx1Z2luL3NjcmlwdC9wbHVnaW5zL29yZy9yZC9wbHVnaW4vdWlnb29kaWVzL3RyYW5zbGF0aW9uLXJlbW92ZS1jYW5kaWRhdGVzLnBvc3Q/c2l0ZUlkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzaXRlSWQpO1xuICAgIHJldHVybiBzdHVkaW9BamF4UG9zdCh1cmwsIHsgcGFnZVBhdGg6IHBhZ2VQYXRoIH0sIHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiwgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSlcbiAgICAgIC50aGVuKHVud3JhcEFqYXhSZXNwb25zZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIHZhciBwID0gdW53cmFwUGx1Z2luU2NyaXB0UmVzdWx0Qm9keShib2R5KTtcbiAgICAgICAgcmV0dXJuIHAgfHwgeyBvazogZmFsc2UsIG1lc3NhZ2U6IFwiRW1wdHkgcmVzcG9uc2VcIiwgY2FuZGlkYXRlczogW10gfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zdFRyYW5zbGF0aW9uUmVtb3ZlKHN0dWRpb0Jhc2UsIHNpdGVJZCwgcGFnZVBhdGgsIGNvbXBvbmVudFBhdGhzLCBkZWxldGVQYWdlKSB7XG4gICAgdmFyIHVybCA9XG4gICAgICBTdHJpbmcoc3R1ZGlvQmFzZSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIikgK1xuICAgICAgXCIvYXBpLzIvcGx1Z2luL3NjcmlwdC9wbHVnaW5zL29yZy9yZC9wbHVnaW4vdWlnb29kaWVzL3RyYW5zbGF0aW9uLXJlbW92ZS5wb3N0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheFBvc3QoXG4gICAgICB1cmwsXG4gICAgICB7XG4gICAgICAgIHBhZ2VQYXRoOiBwYWdlUGF0aCxcbiAgICAgICAgY29tcG9uZW50UGF0aHM6IGNvbXBvbmVudFBhdGhzIHx8IFtdLFxuICAgICAgICBkZWxldGVQYWdlOiBkZWxldGVQYWdlICE9PSBmYWxzZVxuICAgICAgfSxcbiAgICAgIHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiwgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgIClcbiAgICAgIC50aGVuKHVud3JhcEFqYXhSZXNwb25zZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIHZhciBwID0gdW53cmFwUGx1Z2luU2NyaXB0UmVzdWx0Qm9keShib2R5KTtcbiAgICAgICAgcmV0dXJuIHAgfHwgeyBvazogZmFsc2UsIGRlbGV0ZWQ6IFtdLCBmYWlsZWQ6IFt7IHBhdGg6IFwiXCIsIG1lc3NhZ2U6IFwiRW1wdHkgcmVzcG9uc2VcIiB9XSB9O1xuICAgICAgfSk7XG4gIH1cblxuICAvKiogUGFnZSBpdGVtcyBvbmx5IChub3QgY29tcG9uZW50cyBmb2xkZXIpOiBzaG93IFJlbW92ZSB0cmFuc2xhdGlvbiBpbnN0ZWFkIG9mIG9ubHkg4ouuIGZvciBub24tc291cmNlIHJvd3MuICovXG4gIGZ1bmN0aW9uIGlzUGFnZVRyYW5zbGF0aW9uUm93KHRhcmdldFBhdGgsIGNvbnRlbnRUeXBlSWQpIHtcbiAgICB2YXIgY3QgPSBTdHJpbmcoY29udGVudFR5cGVJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGN0LmluZGV4T2YoXCIvcGFnZS9cIikgPT09IDApIHJldHVybiB0cnVlO1xuICAgIHZhciBwID0gbm9ybWFsaXplU3R1ZGlvUGF0aCh0YXJnZXRQYXRoKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBwLmluZGV4T2YoXCIvd2Vic2l0ZS9cIikgPj0gMCAmJiBwLmVuZHNXaXRoKFwiLnhtbFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsYWdGb3JMb2NhbGVDb2RlKGxvY2FsZUNvZGUpIHtcbiAgICB2YXIgayA9IFN0cmluZyhsb2NhbGVDb2RlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFrKSByZXR1cm4gXCJcXHVEODNDXFx1REYxMFwiO1xuICAgIHZhciBtYXAgPSB7XG4gICAgICBlbjogXCJcXHVEODNDXFx1RERGQVxcdUQ4M0NcXHVEREY4XCIsXG4gICAgICBcImVuLXVzXCI6IFwiXFx1RDgzQ1xcdURERkFcXHVEODNDXFx1RERGOFwiLFxuICAgICAgXCJlbi1nYlwiOiBcIlxcdUQ4M0NcXHVEREVDXFx1RDgzQ1xcdURERTdcIixcbiAgICAgIGVzOiBcIlxcdUQ4M0NcXHVEREVBXFx1RDgzQ1xcdURERjhcIixcbiAgICAgIFwiZXMtZXNcIjogXCJcXHVEODNDXFx1RERFQVxcdUQ4M0NcXHVEREY4XCIsXG4gICAgICBkZTogXCJcXHVEODNDXFx1RERFOVxcdUQ4M0NcXHVEREVBXCIsXG4gICAgICBcImRlLWRlXCI6IFwiXFx1RDgzQ1xcdURERTlcXHVEODNDXFx1RERFQVwiLFxuICAgICAgemg6IFwiXFx1RDgzQ1xcdURERThcXHVEODNDXFx1RERGM1wiLFxuICAgICAgY246IFwiXFx1RDgzQ1xcdURERThcXHVEODNDXFx1RERGM1wiLFxuICAgICAgXCJ6aC1jblwiOiBcIlxcdUQ4M0NcXHVEREU4XFx1RDgzQ1xcdURERjNcIixcbiAgICAgIFwiemgtdHdcIjogXCJcXHVEODNDXFx1RERGOVxcdUQ4M0NcXHVEREZDXCIsXG4gICAgICBqYTogXCJcXHVEODNDXFx1RERFRlxcdUQ4M0NcXHVEREY1XCIsXG4gICAgICBcImphLWpwXCI6IFwiXFx1RDgzQ1xcdURERUZcXHVEODNDXFx1RERGNVwiLFxuICAgICAgZnI6IFwiXFx1RDgzQ1xcdURERUJcXHVEODNDXFx1RERGN1wiLFxuICAgICAgXCJmci1mclwiOiBcIlxcdUQ4M0NcXHVEREVCXFx1RDgzQ1xcdURERjdcIixcbiAgICAgIGl0OiBcIlxcdUQ4M0NcXHVEREVFXFx1RDgzQ1xcdURERjlcIixcbiAgICAgIFwiaXQtaXRcIjogXCJcXHVEODNDXFx1RERFRVxcdUQ4M0NcXHVEREY5XCIsXG4gICAgICBwdDogXCJcXHVEODNDXFx1RERGNVxcdUQ4M0NcXHVEREY5XCIsXG4gICAgICBcInB0LXB0XCI6IFwiXFx1RDgzQ1xcdURERjVcXHVEODNDXFx1RERGOVwiLFxuICAgICAgXCJwdC1iclwiOiBcIlxcdUQ4M0NcXHVEREU3XFx1RDgzQ1xcdURERjdcIixcbiAgICAgIGtvOiBcIlxcdUQ4M0NcXHVEREYwXFx1RDgzQ1xcdURERjdcIixcbiAgICAgIFwia28ta3JcIjogXCJcXHVEODNDXFx1RERGMFxcdUQ4M0NcXHVEREY3XCIsXG4gICAgICBhcjogXCJcXHVEODNDXFx1RERGOFxcdUQ4M0NcXHVEREU2XCIsXG4gICAgICBcImFyLXNhXCI6IFwiXFx1RDgzQ1xcdURERjhcXHVEODNDXFx1RERFNlwiLFxuICAgICAgXCJhci1hZVwiOiBcIlxcdUQ4M0NcXHVEREU2XFx1RDgzQ1xcdURERUFcIixcbiAgICAgIFwiYXItZWdcIjogXCJcXHVEODNDXFx1RERFQVxcdUQ4M0NcXHVEREVDXCJcbiAgICB9O1xuICAgIHJldHVybiBtYXBba10gfHwgbWFwW2suc2xpY2UoMCwgMildIHx8IFwiXFx1RDgzQ1xcdURGMTBcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHRVQgdHJhbnNsYXRpb24tbG9jYWxlczogY29uZmlnICh7IGJhc2VMb2NhbGUsIGNvZGVzLCBtZXRhIH0pIHBsdXMgb25lIHJvdyBwZXIgY29uZmlndXJlZCBsb2NhbGUgZm9yIGBwYXRoYFxuICAgKiAoeyBsb2NhbGUsIHBhdGgsIGV4aXN0cywgaXNPdXRkYXRlZCwgaXNTb3VyY2UsIGlzQ3VycmVudCwgLi4uIH0pLiBgb3ZlcnJpZGVzYCBjYXJyeSB1bnNhdmVkIGZvcm0gdmFsdWVzLlxuICAgKi9cbiAgZnVuY3Rpb24gZmV0Y2hUcmFuc2xhdGlvbkxvY2FsZXMoc3R1ZGlvQmFzZSwgc2l0ZUlkLCBwYXRoLCBvdmVycmlkZXMpIHtcbiAgICBpZiAoIXN0dWRpb0Jhc2UgfHwgIXNpdGVJZCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB2YXIgbyA9IG92ZXJyaWRlcyB8fCB7fTtcbiAgICB2YXIgcXMgPSBbXCJzaXRlSWQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKV07XG4gICAgaWYgKHBhdGgpIHFzLnB1c2goXCJwYXRoPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhdGgpKTtcbiAgICBbXCJjb250ZW50VHlwZVwiLCBcImxvY2FsZVNvdXJjZUlkXCIsIFwib2JqZWN0SWRcIiwgXCJzb3VyY2VMb2NhbGVcIl0uZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgdmFyIHYgPSBvW2tdICE9IG51bGwgPyBTdHJpbmcob1trXSkudHJpbSgpIDogXCJcIjtcbiAgICAgIGlmICh2KSBxcy5wdXNoKGsgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfSk7XG4gICAgdmFyIHVybCA9XG4gICAgICBzdHVkaW9CYXNlICsgXCIvYXBpLzIvcGx1Z2luL3NjcmlwdC9wbHVnaW5zL29yZy9yZC9wbHVnaW4vdWlnb29kaWVzL3RyYW5zbGF0aW9uLWxvY2FsZXM/XCIgKyBxcy5qb2luKFwiJlwiKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheEdldCh1cmwpXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgcCA9IHVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkoYm9keSk7XG4gICAgICAgIGlmICghcCB8fCAhcC5vaykgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBjb2RlcyA9IFtdO1xuICAgICAgICB2YXIgbWV0YSA9IHt9O1xuICAgICAgICAoQXJyYXkuaXNBcnJheShwLmxhbmd1YWdlcykgPyBwLmxhbmd1YWdlcyA6IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICB2YXIgbGMgPSByb3cgJiYgcm93LmxvY2FsZSA/IFN0cmluZyhyb3cubG9jYWxlKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcbiAgICAgICAgICBpZiAoIWxjKSByZXR1cm47XG4gICAgICAgICAgaWYgKGNvZGVzLmluZGV4T2YobGMpIDwgMCkgY29kZXMucHVzaChsYyk7XG4gICAgICAgICAgbWV0YVtsY10gPSB7XG4gICAgICAgICAgICBsYWJlbDogKHJvdyAmJiByb3cubGFiZWwpIHx8IGxjLFxuICAgICAgICAgICAgZmxhZzogcm93ICYmIHJvdy5mbGFnICYmIFN0cmluZyhyb3cuZmxhZykudHJpbSgpID8gU3RyaW5nKHJvdy5mbGFnKS50cmltKCkgOiBmbGFnRm9yTG9jYWxlQ29kZShsYylcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNmZyA9IG51bGw7XG4gICAgICAgIGlmIChjb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgYmFzZUxvY2FsZSA9IHAuYmFzZUxhbmd1YWdlID8gU3RyaW5nKHAuYmFzZUxhbmd1YWdlKS50cmltKCkudG9Mb3dlckNhc2UoKSA6IGNvZGVzWzBdO1xuICAgICAgICAgIGlmIChjb2Rlcy5pbmRleE9mKGJhc2VMb2NhbGUpIDwgMCkgYmFzZUxvY2FsZSA9IGNvZGVzWzBdO1xuICAgICAgICAgIGNmZyA9IHsgYmFzZUxvY2FsZTogYmFzZUxvY2FsZSwgY29kZXM6IGNvZGVzLCBtZXRhOiBtZXRhIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgY2ZnOiBjZmcsIGxvY2FsZXM6IEFycmF5LmlzQXJyYXkocC5sb2NhbGVzKSA/IHAubG9jYWxlcyA6IFtdIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIHZhciBUUkFOU0xBVElPTlNfUEFHRV9TSVpFID0gNTtcblxuICBmdW5jdGlvbiBsb2NhbGVMYWJlbEZvclBhdGgocGF0aCkge1xuICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocGF0aCkgfHwgXCJ1bmtub3duXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG0gPSBMT0NBTEVfTUVUQVtsb2NdO1xuICAgIHJldHVybiBtICYmIG0ubGFiZWwgPyBtLmxhYmVsIDogbG9jO1xuICB9XG5cbiAgLyoqIFNvdXJjZSBsb2NhbGUgcm93KHMpIGZpcnN0OyByZW1haW5pbmcgcm93cyBmb2xsb3cgdHJhbnNsYXRpb24tY29uZmlnLnhtbCBvcmRlciB3aGVuIHByb3ZpZGVkLiAqL1xuICBmdW5jdGlvbiBzb3J0VHJhbnNsYXRpb25QYXRoc0ZvckRpc3BsYXkocGF0aHMsIHNvdXJjZUxvY2FsZUtleSwgb3JkZXJlZExvY2FsZUNvZGVzKSB7XG4gICAgdmFyIHNyYyA9IChzb3VyY2VMb2NhbGVLZXkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgb3JkZXIgPSBBcnJheS5pc0FycmF5KG9yZGVyZWRMb2NhbGVDb2RlcykgPyBvcmRlcmVkTG9jYWxlQ29kZXMgOiBbXTtcbiAgICB2YXIgb3JkZXJJbmRleCA9IHt9O1xuICAgIG9yZGVyLmZvckVhY2goZnVuY3Rpb24gKGNvZGUsIGkpIHtcbiAgICAgIHZhciBrID0gU3RyaW5nKGNvZGUgfHwgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL18vZywgXCItXCIpO1xuICAgICAgaWYgKGsgJiYgb3JkZXJJbmRleFtrXSA9PSBudWxsKSBvcmRlckluZGV4W2tdID0gaTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjb25maWdSYW5rKHBhdGgpIHtcbiAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocGF0aCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbiAgICAgIGlmICghbG9jKSByZXR1cm4gMTAwMDAwO1xuICAgICAgaWYgKG9yZGVySW5kZXhbbG9jXSAhPSBudWxsKSByZXR1cm4gb3JkZXJJbmRleFtsb2NdO1xuICAgICAgZm9yICh2YXIga2V5IGluIG9yZGVySW5kZXgpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3JkZXJJbmRleCwga2V5KSkgY29udGludWU7XG4gICAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobG9jLCBrZXkpKSByZXR1cm4gb3JkZXJJbmRleFtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDEwMDAwMCArIFN0cmluZyhsb2MpLmNoYXJDb2RlQXQoMCk7XG4gICAgfVxuICAgIHZhciBhcnIgPSBwYXRocy5zbGljZSgpO1xuICAgIGZ1bmN0aW9uIGlzU291cmNlUGF0aChwKSB7XG4gICAgICByZXR1cm4gISEoc3JjICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiLCBzcmMpKTtcbiAgICB9XG4gICAgYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHZhciBhcyA9IGlzU291cmNlUGF0aChhKTtcbiAgICAgIHZhciBicyA9IGlzU291cmNlUGF0aChiKTtcbiAgICAgIGlmIChhcyAmJiAhYnMpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKCFhcyAmJiBicykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciByYSA9IGNvbmZpZ1JhbmsoYSk7XG4gICAgICAgIHZhciByYiA9IGNvbmZpZ1JhbmsoYik7XG4gICAgICAgIGlmIChyYSAhPT0gcmIpIHtcbiAgICAgICAgICByZXR1cm4gcmEgLSByYjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxhID0gbG9jYWxlTGFiZWxGb3JQYXRoKGEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBsYiA9IGxvY2FsZUxhYmVsRm9yUGF0aChiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgY21wID0gbGEubG9jYWxlQ29tcGFyZShsYiwgdW5kZWZpbmVkLCB7IHNlbnNpdGl2aXR5OiBcImJhc2VcIiB9KTtcbiAgICAgICAgaWYgKGNtcCAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiBjbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcoYSkubG9jYWxlQ29tcGFyZShTdHJpbmcoYikpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJUcmFuc2xhdGlvblBhdGhzKHBhdGhzLCBxdWVyeSkge1xuICAgIHZhciBxID0gKHF1ZXJ5IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghcSkge1xuICAgICAgcmV0dXJuIHBhdGhzLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBwYXRocy5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBsYWJlbCA9IGxvY2FsZUxhYmVsRm9yUGF0aChwKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgU3RyaW5nKHApLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxKSA+PSAwIHx8XG4gICAgICAgIGxvYy5pbmRleE9mKHEpID49IDAgfHxcbiAgICAgICAgbGFiZWwuaW5kZXhPZihxKSA+PSAwXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGF0Y2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjbXMgPSB3aW5kb3cuY3JhZnRlcmNtcztcbiAgICAgIGlmIChjbXMgJiYgdHlwZW9mIGNtcy5nZXRTdG9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IGNtcy5nZXRTdG9yZSgpO1xuICAgICAgICBpZiAoc3RvcmUgJiYgdHlwZW9mIHN0b3JlLmRpc3BhdGNoID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzdG9yZS5kaXNwYXRjaC5iaW5kKHN0b3JlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbWUgVVJMIHNoYXBlIGFzIENyYWZ0ZXIgU3R1ZGlvIFVJIHtAY29kZSBnZXRFZGl0Rm9ybVNyY30gKGxlZ2FjeSBmb3JtIGVuZ2luZSksIHJlYWQtb25seSBmb3Igc291cmNlIGNvbXBhcmUgaWZyYW1lLlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jcmFmdGVyY21zL3N0dWRpby11aS9ibG9iL2RldmVsb3AvdWkvYXBwL3NyYy91dGlscy9wYXRoLnRzXG4gICAqL1xuICBmdW5jdGlvbiBidWlsZExlZ2FjeVJlYWRvbmx5Rm9ybVNyYyhhdXRob3JpbmdCYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgYmFzZSA9IFN0cmluZyhhdXRob3JpbmdCYXNlIHx8IFwiXCIpXG4gICAgICAudHJpbSgpXG4gICAgICAucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIGlmICghYmFzZSB8fCAhc2l0ZUlkIHx8ICFwYXRoKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIGJhc2UgK1xuICAgICAgXCIvbGVnYWN5L2Zvcm0/c2l0ZT1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKSArXG4gICAgICBcIiZyZWFkb25seT10cnVlXCIgK1xuICAgICAgXCImaXNIaWRkZW49ZmFsc2VcIlxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgbWVzc2FnZSkge1xuICAgIGlmICghZGlzcGF0Y2ggfHwgbWVzc2FnZSA9PSBudWxsKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJTSE9XX1NZU1RFTV9OT1RJRklDQVRJT05cIiwgcGF5bG9hZDogeyBtZXNzYWdlOiBTdHJpbmcobWVzc2FnZSkgfSB9KTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgLyoqIE9wZW5zIFN0dWRpbyBmb3JtIGVkaXRvciBmb3IgYHBhdGhgIChzYW1lIHBheWxvYWQgYXMgVHJhbnNsYXRpb24gUmVhY3QgaGVscGVycykuICovXG4gIGZ1bmN0aW9uIG9wZW5TdHVkaW9FZGl0Rm9ybShkaXNwYXRjaCwgc2l0ZUlkLCBwYXRoLCBhdXRob3JpbmdCYXNlRm9yRGlhbG9nKSB7XG4gICAgaWYgKCFkaXNwYXRjaCB8fCAhc2l0ZUlkIHx8ICFwYXRoKSByZXR1cm47XG4gICAgdmFyIGFiID0gU3RyaW5nKGF1dGhvcmluZ0Jhc2VGb3JEaWFsb2cgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpIHx8IFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAoIWFiKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJTSE9XX0VESVRfRElBTE9HXCIsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzaXRlOiBzaXRlSWQsXG4gICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgICBhdXRob3JpbmdCYXNlOiBhYixcbiAgICAgICAgICBpc0hpZGRlbjogZmFsc2UsXG4gICAgICAgICAgb25TYXZlU3VjY2Vzczoge1xuICAgICAgICAgICAgdHlwZTogXCJCQVRDSF9BQ1RJT05TXCIsXG4gICAgICAgICAgICBwYXlsb2FkOiBbXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJESVNQQVRDSF9ET01fRVZFTlRcIiwgcGF5bG9hZDogeyBpZDogXCJlZGl0RGlhbG9nU3VjY2Vzc1wiIH0gfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIlNIT1dfRURJVF9JVEVNX1NVQ0NFU1NfTk9USUZJQ0FUSU9OXCIgfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkNMT1NFX0VESVRfRElBTE9HXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DYW5jZWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiQkFUQ0hfQUNUSU9OU1wiLFxuICAgICAgICAgICAgcGF5bG9hZDogW1xuICAgICAgICAgICAgICB7IHR5cGU6IFwiQ0xPU0VfRURJVF9ESUFMT0dcIiB9LFxuICAgICAgICAgICAgICB7IHR5cGU6IFwiRElTUEFUQ0hfRE9NX0VWRU5UXCIsIHBheWxvYWQ6IHsgaWQ6IFwiZWRpdERpYWxvZ0Rpc21pc3NlZFwiIH0gfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHNvdXJjZSBmb3IgVHJhbnNsYXRpb24gdHJhbnNsYXRlOiBwbHVnaW4tY29uZmlnIGJhc2UgbGFuZ3VhZ2UgcGF0aCB3aGVuIGxheW91dCBzdXBwb3J0cyBpdCxcbiAgICogZWxzZSBsZWdhY3kgc291cmNlIGxvY2FsZSBmcm9tIGNvbnRlbnQgdHJlZSBwYXRocyAvIGN1cnJlbnQgZm9ybS5cbiAgICovXG4gIGZ1bmN0aW9uIHJlc29sdmVUcmFuc2xhdGVDb3B5U291cmNlUGF0aCh0cmFuc2xhdGlvbkNmZywgcm9vdERpciwgc3VmZml4LCB0cmFuc2xhdGlvblBhdGhzLCBmb3JtUGF0aCwgcmVzb2x2ZWRTb3VyY2VLZXkpIHtcbiAgICBpZiAodHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuYmFzZUxvY2FsZSAmJiByb290RGlyICE9IG51bGwgJiYgc3VmZml4ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBwYXRoRm9yVGFyZ2V0TG9jYWxlKHJvb3REaXIsIFN0cmluZyh0cmFuc2xhdGlvbkNmZy5iYXNlTG9jYWxlKS50b0xvd2VyQ2FzZSgpLCBzdWZmaXgpO1xuICAgIH1cbiAgICB2YXIgZnJvbVNvdXJjZUxvY2FsZSA9XG4gICAgICAodHJhbnNsYXRpb25QYXRocyB8fCBbXSkuZmluZChmdW5jdGlvbiAocCkge1xuICAgICAgICB2YXIgbG9jID0gKGdldExvY2FsZUZyb21QYXRoKHApIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiByZXNvbHZlZFNvdXJjZUtleSAmJiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobG9jLCByZXNvbHZlZFNvdXJjZUtleSk7XG4gICAgICB9KSB8fCBmb3JtUGF0aDtcbiAgICByZXR1cm4gZnJvbVNvdXJjZUxvY2FsZSB8fCBmb3JtUGF0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcmVudEZvbGRlclBhdGhGb3JDb3B5KHApIHtcbiAgICB2YXIgaSA9IHAubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgIGlmIChpIDw9IDApIHJldHVybiBcIi9cIjtcbiAgICByZXR1cm4gcC5zbGljZSgwLCBpKSB8fCBcIi9cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRldGVjdExvY2FsZUZvbGRlck5hbWVzRm9yU2l0ZShjaGlsZFBhdGhzLCByb290RGlyLCBsb2NhbGVDb2Rlcykge1xuICAgIHZhciBwcmVmaXggPSByb290RGlyLmVuZHNXaXRoKFwiL1wiKSA/IHJvb3REaXIgOiByb290RGlyICsgXCIvXCI7XG4gICAgdmFyIGxvY2FsZVNldCA9IHt9O1xuICAgIHZhciBjb2RlcyA9IGxvY2FsZUNvZGVzICYmIGxvY2FsZUNvZGVzLmxlbmd0aCA/IGxvY2FsZUNvZGVzIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgIHZhciBzZWVuID0ge307XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgKGNoaWxkUGF0aHMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIGlmICghcCB8fCBwLmluZGV4T2YocHJlZml4KSAhPT0gMCkgcmV0dXJuO1xuICAgICAgdmFyIHJlc3QgPSBwLnNsaWNlKHByZWZpeC5sZW5ndGgpO1xuICAgICAgdmFyIHNlZyA9IHJlc3Quc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKVswXTtcbiAgICAgIHZhciBtYXRjaGVkID1cbiAgICAgICAgc2VnICYmXG4gICAgICAgIGNvZGVzLnNvbWUoZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKHNlZywgY29kZSk7XG4gICAgICAgIH0pO1xuICAgICAgaWYgKG1hdGNoZWQgJiYgIXNlZW5bc2VnLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgIHNlZW5bc2VnLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgICAgbmFtZXMucHVzaChzZWcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuYW1lcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTXVsdGlMb2NhbGVGb2xkZXJTZXQobmFtZXMsIGJhc2VMb2NhbGUpIHtcbiAgICBpZiAoIW5hbWVzIHx8IG5hbWVzLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWJhc2VMb2NhbGUgfHwgIVN0cmluZyhiYXNlTG9jYWxlKS50cmltKCkpIHJldHVybiB0cnVlO1xuICAgIHZhciBiYXNlID0gU3RyaW5nKGJhc2VMb2NhbGUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgXCItXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobmFtZXNbaV0sIGJhc2UpKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIG11bHRpLWxvY2FsZSBpcyBjb25maXJtZWQgZnJvbSBleGlzdGluZyBmb2xkZXJzLCBsaXN0IGV2ZXJ5IE1VTFRJX0xPQ0FMRV9DT0RFUyB0YXJnZXRcbiAgICogKHVzZSByZXBvIGZvbGRlciBjYXNpbmcgd2hlbiBwcmVzZW50LCBlbHNlIHRoZSBjb2RlIGUuZy4gamEgc28gSmFwYW5lc2UgYXBwZWFycyBiZWZvcmUgL2phIGV4aXN0cykuXG4gICAqL1xuICAvKipcbiAgICogQHBhcmFtIHt7IGZyb21UcmFuc2xhdGlvbkNvbmZpZz86IGJvb2xlYW4gfX0gW29wdHNdXG4gICAqICAgV2hlbiBmcm9tVHJhbnNsYXRpb25Db25maWcgYW5kIHRyYW5zbGF0aW9uLWNvbmZpZy54bWwgbGlzdHMgMisgbG9jYWxlcywgcmV0dXJuIG9yZGVyZWQgY29kZXNcbiAgICogICBldmVuIGlmIGZld2VyIHRoYW4gdHdvIGxvY2FsZSBmb2xkZXJzIGV4aXN0IG9uIGRpc2sgeWV0IChhdXRob3JzIGNhbiB0cmFuc2xhdGUgaW50byBtaXNzaW5nIHRyZWVzKS5cbiAgICovXG4gIGZ1bmN0aW9uIHJlc29sdmVMb2NhbGVGb2xkZXJzT3JkZXJlZEZyb21QYXRocyhjaGlsZFBhdGhzLCByb290RGlyLCBsb2NhbGVDb2Rlcywgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHZhciBmcm9tVHJhbnNsYXRpb25Db25maWcgPSAhIW9wdHMuZnJvbVRyYW5zbGF0aW9uQ29uZmlnO1xuICAgIHZhciBhY3RpdmVDb2RlcyA9IGxvY2FsZUNvZGVzICYmIGxvY2FsZUNvZGVzLmxlbmd0aCA/IGxvY2FsZUNvZGVzIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgIHZhciBuYW1lcyA9IGRldGVjdExvY2FsZUZvbGRlck5hbWVzRm9yU2l0ZShjaGlsZFBhdGhzLCByb290RGlyLCBhY3RpdmVDb2Rlcyk7XG4gICAgaWYgKCFpc011bHRpTG9jYWxlRm9sZGVyU2V0KG5hbWVzKSkge1xuICAgICAgaWYgKCFmcm9tVHJhbnNsYXRpb25Db25maWcgfHwgYWN0aXZlQ29kZXMubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIG9yZGVyZWQgPSBbXTtcbiAgICBhY3RpdmVDb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBudWxsO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKG5hbWVzW2ldLCBjb2RlKSkge1xuICAgICAgICAgIG1hdGNoID0gbmFtZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmcm9tVHJhbnNsYXRpb25Db25maWcpIHtcbiAgICAgICAgb3JkZXJlZC5wdXNoKG1hdGNoIHx8IGNvZGUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRjaCkge1xuICAgICAgICB2YXIgYWxyZWFkeSA9IG9yZGVyZWQuc29tZShmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcobykudG9Mb3dlckNhc2UoKSA9PT0gU3RyaW5nKG1hdGNoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFhbHJlYWR5KSBvcmRlcmVkLnB1c2gobWF0Y2gpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIHZhciBpbk9yZGVyZWQgPSBvcmRlcmVkLnNvbWUoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShuLCBvKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCFpbk9yZGVyZWQpIG9yZGVyZWQucHVzaChuKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3JkZXJlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoaWxkcmVuUGF0aHNUcmVlKGJhc2UsIHNpdGVJZCwgcGF0aCkge1xuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2dldC1pdGVtcy10cmVlLmpzb24/c2l0ZT1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKSArXG4gICAgICBcIiZkZXB0aD0xXCI7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhHZXQodXJsKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB2YXIgYm9keSA9IHVud3JhcEFqYXhSZXNwb25zZShyZXMpO1xuICAgICAgICB2YXIgcmF3ID0gYm9keSAmJiBib2R5Lml0ZW0gJiYgYm9keS5pdGVtLmNoaWxkcmVuO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmF3KSkgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gcmF3XG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBjaCAmJiBjaC5wYXRoICYmIGNoLnBhdGggIT09IHBhdGg7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uIChjaCkge1xuICAgICAgICAgICAgcmV0dXJuIGNoLnBhdGg7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb3B5SXRlbVBhc3RlU3R1ZGlvKGJhc2UsIHNpdGVJZCwgc291cmNlUGF0aCwgdGFyZ2V0UGFyZW50UGF0aCwgZXhwZWN0ZWRUYXJnZXRQYXRoKSB7XG4gICAgdmFyIHVybCA9XG4gICAgICBTdHJpbmcoYmFzZSkucmVwbGFjZSgvXFwvJC8sIFwiXCIpICtcbiAgICAgIFwiL2FwaS8yL3BsdWdpbi9zY3JpcHQvcGx1Z2lucy9vcmcvcmQvcGx1Z2luL3VpZ29vZGllcy90cmFuc2xhdGlvbi1jb3B5LnBvc3Q/c2l0ZUlkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzaXRlSWQpO1xuICAgIHZhciBib2R5ID0ge1xuICAgICAgc291cmNlUGF0aDogc291cmNlUGF0aCxcbiAgICAgIHRhcmdldFBhcmVudFBhdGg6IHRhcmdldFBhcmVudFBhdGgsXG4gICAgICBleHBlY3RlZFRhcmdldFBhdGg6IGV4cGVjdGVkVGFyZ2V0UGF0aCB8fCBcIlwiXG4gICAgfTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheFBvc3QodXJsLCBib2R5LCB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciBib2R5ID0gdW53cmFwQWpheFJlc3BvbnNlKHJlcyk7XG4gICAgICAgIHJldHVybiBib2R5ICYmIGJvZHkucmVzdWx0ICE9PSB1bmRlZmluZWQgPyBib2R5LnJlc3VsdCA6IGJvZHk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcm9wZG93bjogbG9jYWxlcyBzdGlsbCBtaXNzaW5nIHRoaXMgaXRlbTsgY29weSB1c2VzIHRoZSBzYW1lIHBhdGggdW5kZXIgdGhlIGNob3NlbiBsb2NhbGUgZm9sZGVyLlxuICAgKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy5vblRyYW5zbGF0ZWQgb3B0aW9uYWwg4oCUIGNhbGxlZCBhZnRlciBhIHN1Y2Nlc3NmdWwgcGFzdGUgdG8gcmVmZXRjaCB0aGUgdHJhbnNsYXRpb25zIGxpc3QgYWJvdmUuICovXG4gIC8qKiBAcGFyYW0gcHJvcHMudHJhbnNsYXRpb25DZmcgb3B0aW9uYWwg4oCUIGZyb20gcGFuZWwgc3RhdGUgd2hlbiBHRVQgZmFpbHMuICovXG4gIC8qKiBAcGFyYW0gcHJvcHMuZXhpc3RpbmdQYXRocyB0cmFuc2xhdGlvbiBzaWJsaW5nIHBhdGhzICsgY3VycmVudCBmb3JtIHBhdGggY291bnRzIGFzIGV4aXN0aW5nIGNvbnRlbnQuICovXG4gIC8qKiBAcGFyYW0gcHJvcHMudHJhbnNsYXRlQ29weVNvdXJjZVBhdGggcmVwbyBwYXRoIHRvIGNvcHkgZnJvbSAoYmFzZSBsYW5ndWFnZSk7IGZhbGxzIGJhY2sgdG8gZm9ybVBhdGggaWYgb21pdHRlZC4gKi9cbiAgZnVuY3Rpb24gQWRkVHJhbnNsYXRpb25Mb2NhbGVCYXIocHJvcHMpIHtcbiAgICB2YXIgZm9ybVBhdGggPSBwcm9wcy5mb3JtUGF0aDtcbiAgICB2YXIgdHJhbnNsYXRlQ29weVNvdXJjZVBhdGggPSBwcm9wcy50cmFuc2xhdGVDb3B5U291cmNlUGF0aCB8fCBmb3JtUGF0aDtcbiAgICB2YXIgc2l0ZUlkID0gcHJvcHMuc2l0ZUlkO1xuICAgIHZhciBkaXNwYXRjaCA9IHByb3BzLmRpc3BhdGNoO1xuICAgIHZhciBhdXRob3JpbmdCYXNlID0gcHJvcHMuYXV0aG9yaW5nQmFzZSB8fCBcIlwiO1xuICAgIHZhciByb290RGlyID0gcHJvcHMucm9vdERpcjtcbiAgICB2YXIgc3VmZml4ID0gcHJvcHMuc3VmZml4O1xuICAgIHZhciBleGlzdGluZ1BhdGhzID0gcHJvcHMuZXhpc3RpbmdQYXRocyB8fCBbXTtcbiAgICB2YXIgb25UcmFuc2xhdGVkID0gcHJvcHMub25UcmFuc2xhdGVkO1xuICAgIHZhciB0cmFuc2xhdGlvbkNmZ1Byb3AgPSBwcm9wcy50cmFuc2xhdGlvbkNmZztcbiAgICB2YXIgbG9jYWxlQ29kZXMgPSBwcm9wcy5sb2NhbGVDb2RlcyAmJiBwcm9wcy5sb2NhbGVDb2Rlcy5sZW5ndGggPyBwcm9wcy5sb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgbG9jYWxlTWV0YSA9IHByb3BzLmxvY2FsZU1ldGEgfHwgTE9DQUxFX01FVEE7XG5cbiAgICB2YXIgb3B0U3QgPSBSZWFjdC51c2VTdGF0ZShbXSk7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRTdFswXTtcbiAgICB2YXIgc2V0T3B0aW9ucyA9IG9wdFN0WzFdO1xuICAgIHZhciBzZWxTdCA9IFJlYWN0LnVzZVN0YXRlKFwiXCIpO1xuICAgIHZhciBzZWxlY3RlZCA9IHNlbFN0WzBdO1xuICAgIHZhciBzZXRTZWxlY3RlZCA9IHNlbFN0WzFdO1xuICAgIHZhciBsb2FkU3QgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgdmFyIGxvYWRpbmcgPSBsb2FkU3RbMF07XG4gICAgdmFyIHNldExvYWRpbmcgPSBsb2FkU3RbMV07XG4gICAgdmFyIGJ1c3lTdCA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICB2YXIgY29weUJ1c3kgPSBidXN5U3RbMF07XG4gICAgdmFyIHNldENvcHlCdXN5ID0gYnVzeVN0WzFdO1xuICAgIHZhciBmb2N1c1NlbFN0ID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIHZhciBzZWxlY3RGb2N1c2VkID0gZm9jdXNTZWxTdFswXTtcbiAgICB2YXIgc2V0U2VsZWN0Rm9jdXNlZCA9IGZvY3VzU2VsU3RbMV07XG5cbiAgICAvKiogU3VwcG9ydGVkIGxvY2FsZXMgZnJvbSBjb25maWcgbWludXMgbG9jYWxlcyBhbHJlYWR5IHByZXNlbnQgaW4gZm9ybVBhdGggKyB0cmFuc2xhdGlvblBhdGhzIChubyBjb250ZW50LWV4aXN0cykuICovXG4gICAgdmFyIGxvYWRUYXJnZXRzID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZm9ybVBhdGggfHwgIXNpdGVJZCB8fCAhcm9vdERpcikge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWZmU3VmZml4ID0gc3VmZml4O1xuICAgICAgICBpZiAoZWZmU3VmZml4ID09IG51bGwpIHtcbiAgICAgICAgICBlZmZTdWZmaXggPSBwYXJzZVN1ZmZpeEZyb21Gb3JtUGF0aChmb3JtUGF0aCwgcm9vdERpcikuc3VmZml4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZmZTdWZmaXggPT0gbnVsbCkge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcHBseUNvZGVzKGFjdGl2ZU1ldGEsIHJhd0NvZGVzKSB7XG4gICAgICAgICAgdmFyIHNlZW4gPSB7fTtcbiAgICAgICAgICB2YXIgYWN0aXZlQ29kZXMgPSBbXTtcbiAgICAgICAgICAocmF3Q29kZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHZhciBzID0gU3RyaW5nKGMgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgayA9IHMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWVuW2tdKSByZXR1cm47XG4gICAgICAgICAgICBzZWVuW2tdID0gdHJ1ZTtcbiAgICAgICAgICAgIGFjdGl2ZUNvZGVzLnB1c2gocyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFhY3RpdmVDb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhbnNsYXRlZExvY2FsZXMgPSBleGlzdGluZ1RyYW5zbGF0aW9uTG9jYWxlS2V5cyhleGlzdGluZ1BhdGhzLCByb290RGlyLCBmb3JtUGF0aCk7XG4gICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgIGFjdGl2ZUNvZGVzLmZvckVhY2goZnVuY3Rpb24gKGxvYykge1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0aW9uTG9jYWxlQWxyZWFkeVByZXNlbnQodHJhbnNsYXRlZExvY2FsZXMsIGxvYykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0YXJnZXRQYXRoID0gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBsb2MsIGVmZlN1ZmZpeCk7XG4gICAgICAgICAgICB2YXIgbWV0YSA9IG1ldGFGb3JQYXRoTG9jYWxlKGFjdGl2ZU1ldGEsIGxvYykgfHwge1xuICAgICAgICAgICAgICBsYWJlbDogbG9jLFxuICAgICAgICAgICAgICBmbGFnOiBmbGFnRm9yTG9jYWxlQ29kZShsb2MpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb3V0LnB1c2goe1xuICAgICAgICAgICAgICBsb2NhbGU6IGxvYyxcbiAgICAgICAgICAgICAgbGFiZWw6IG1ldGEubGFiZWwsXG4gICAgICAgICAgICAgIGZsYWc6IG1ldGEuZmxhZyB8fCBcIlxcdUQ4M0NcXHVERjEwXCIsXG4gICAgICAgICAgICAgIHRhcmdldFBhdGg6IHRhcmdldFBhdGgsXG4gICAgICAgICAgICAgIGV4aXN0czogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldE9wdGlvbnMob3V0KTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0cmFuc2xhdGlvbkNmZ1Byb3AgfHwgIXRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2RlcyB8fCAhdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzLmxlbmd0aCkge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXBwbHlDb2Rlcyh0cmFuc2xhdGlvbkNmZ1Byb3AubWV0YSB8fCBsb2NhbGVNZXRhLCB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXMpO1xuICAgICAgfSxcbiAgICAgIFtmb3JtUGF0aCwgc2l0ZUlkLCByb290RGlyLCBzdWZmaXgsIGV4aXN0aW5nUGF0aHMsIGxvY2FsZUNvZGVzLCBsb2NhbGVNZXRhLCB0cmFuc2xhdGlvbkNmZ1Byb3BdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9hZFRhcmdldHMoKTtcbiAgICAgIH0sXG4gICAgICBbbG9hZFRhcmdldHNdXG4gICAgKTtcblxuICAgIHZhciBydW5UcmFuc2xhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCB8fCAhZm9ybVBhdGgpIHJldHVybjtcbiAgICAgIHZhciBjaG9pY2UgPSBudWxsO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChvcHRpb25zW2ldLmxvY2FsZSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICBjaG9pY2UgPSBvcHRpb25zW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWNob2ljZSkgcmV0dXJuO1xuICAgICAgaWYgKGNob2ljZS5leGlzdHMpIHtcbiAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIFwiQSB0cmFuc2xhdGlvbiBhbHJlYWR5IGV4aXN0cyBhdCBcIiArIGNob2ljZS50YXJnZXRQYXRoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0Q29weUJ1c3kodHJ1ZSk7XG4gICAgICB2YXIgcGFyZW50ID0gcGFyZW50Rm9sZGVyUGF0aEZvckNvcHkoY2hvaWNlLnRhcmdldFBhdGgpO1xuICAgICAgdmFyIGNvbnRlbnRBcGlCYXNlID0gcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpO1xuICAgICAgcmV0dXJuIGNvcHlJdGVtUGFzdGVTdHVkaW8oY29udGVudEFwaUJhc2UsIHNpdGVJZCwgdHJhbnNsYXRlQ29weVNvdXJjZVBhdGgsIHBhcmVudCwgY2hvaWNlLnRhcmdldFBhdGgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBpZiAoIXJlcyB8fCAhcmVzLm9rKSB7XG4gICAgICAgICAgICBub3RpZnlEaXNwYXRjaChcbiAgICAgICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgICAgIChyZXMgJiYgcmVzLm1lc3NhZ2UpIHx8IFwiVHJhbnNsYXRlIGZhaWxlZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHNldENvcHlCdXN5KGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIFwiVHJhbnNsYXRlZCB0byBcIiArIGNob2ljZS5sYWJlbCArIFwiOiBcIiArIGNob2ljZS50YXJnZXRQYXRoKTtcbiAgICAgICAgICBzZXRTZWxlY3RlZChcIlwiKTtcbiAgICAgICAgICBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgY2hvaWNlLnRhcmdldFBhdGgsIGF1dGhvcmluZ0Jhc2UpO1xuICAgICAgICAgIGlmICh0eXBlb2Ygb25UcmFuc2xhdGVkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9uVHJhbnNsYXRlZCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZTEpIHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsb2FkVGFyZ2V0cygpLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0Q29weUJ1c3koZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICAgIHNldENvcHlCdXN5KGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBlZmZlY3RpdmVNaXJyb3JlZFN1ZmZpeCA9XG4gICAgICBzdWZmaXggIT0gbnVsbCA/IHN1ZmZpeCA6IHJvb3REaXIgJiYgZm9ybVBhdGggPyBwYXJzZVN1ZmZpeEZyb21Gb3JtUGF0aChmb3JtUGF0aCwgcm9vdERpcikuc3VmZml4IDogbnVsbDtcblxuICAgIHZhciBoaW50ID0gXCJcIjtcbiAgICBpZiAoIWRpc3BhdGNoKSBoaW50ID0gXCJTdHVkaW8gYWN0aW9ucyByZXF1aXJlIGFuIGFjdGl2ZSBzZXNzaW9uLlwiO1xuICAgIGVsc2UgaWYgKCFmb3JtUGF0aCB8fCAhc2l0ZUlkKSBoaW50ID0gXCJNaXNzaW5nIHBhdGggb3Igc2l0ZS5cIjtcbiAgICBlbHNlIGlmICghcm9vdERpciB8fCBlZmZlY3RpdmVNaXJyb3JlZFN1ZmZpeCA9PSBudWxsKVxuICAgICAgaGludCA9IFwiUGF0aCBsYXlvdXQgZG9lcyBub3Qgc3VwcG9ydCBtaXJyb3JlZCBsb2NhbGUgY29weSBmb3IgdGhpcyBpdGVtLlwiO1xuICAgIGVsc2UgaWYgKCFyZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSkpXG4gICAgICBoaW50ID0gXCJMb2FkaW5nIGF1dGhvcmluZyBjb250ZXh0XFx1MjAyNlwiO1xuICAgIGVsc2UgaWYgKCFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID09PSAwKVxuICAgICAgaGludCA9IFwiQWxsIGNvbmZpZ3VyZWQgbG9jYWxlcyBhbHJlYWR5IGhhdmUgYSB0cmFuc2xhdGlvbiBhdCB0aGlzIHBhdGguXCI7XG5cbiAgICB2YXIgc2VsZWN0RGlzYWJsZWQgPVxuICAgICAgbG9hZGluZyB8fFxuICAgICAgY29weUJ1c3kgfHxcbiAgICAgIG9wdGlvbnMubGVuZ3RoID09PSAwIHx8XG4gICAgICAhZGlzcGF0Y2ggfHxcbiAgICAgICFyb290RGlyIHx8XG4gICAgICBlZmZlY3RpdmVNaXJyb3JlZFN1ZmZpeCA9PSBudWxsIHx8XG4gICAgICAhcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpO1xuXG4gICAgdmFyIHNlbGVjdFN0eWxlID0ge1xuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIG1pbkhlaWdodDogXCI0MnB4XCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIFwiICsgKHNlbGVjdEZvY3VzZWQgJiYgIXNlbGVjdERpc2FibGVkID8gXCJ2YXIoLS10di1zZWxlY3QtZm9jdXMpXCIgOiBcInZhcigtLXR2LWJvcmRlci1pbnB1dClcIiksXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgcGFkZGluZzogXCIxMHB4IDE0cHhcIixcbiAgICAgIHBhZGRpbmdSaWdodDogXCI0NHB4XCIsXG4gICAgICBmb250U2l6ZTogXCIxNHB4XCIsXG4gICAgICBsaW5lSGVpZ2h0OiAxLjQ1LFxuICAgICAgY29sb3I6IFwidmFyKC0tdHYtaW5wdXQtdGV4dClcIixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZWN0RGlzYWJsZWQgPyBcInZhcigtLXR2LWlucHV0LWJnLWRpc2FibGVkKVwiIDogXCJ2YXIoLS10di1pbnB1dC1iZylcIixcbiAgICAgIGJveFNoYWRvdzpcbiAgICAgICAgc2VsZWN0Rm9jdXNlZCAmJiAhc2VsZWN0RGlzYWJsZWRcbiAgICAgICAgICA/IFwiMCAwIDAgM3B4IHJnYmEoNTksIDEzMCwgMjQ2LCAwLjIpXCJcbiAgICAgICAgICA6IFwidmFyKC0tdHYtaW5wdXQtaW5zZXQpXCIsXG4gICAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICAgIGN1cnNvcjogc2VsZWN0RGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIG9wYWNpdHk6IHNlbGVjdERpc2FibGVkID8gMC44OCA6IDEsXG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIFdlYmtpdEFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgTW96QXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidmFyKC0tdHYtc2VsZWN0LWNoZXZyb24pXCIsXG4gICAgICBiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcInJpZ2h0IDEycHggY2VudGVyXCIsXG4gICAgICBiYWNrZ3JvdW5kU2l6ZTogXCIyMHB4IDIwcHhcIixcbiAgICAgIHRyYW5zaXRpb246IFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZVwiXG4gICAgfTtcblxuICAgIHZhciBhY3Rpb25zUm93U3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICAgIGdhcDogXCIxMHB4XCIsXG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgcGFkZGluZzogXCIxNHB4IDE2cHhcIixcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LWFjdGlvbnMtYm9yZGVyKVwiLFxuICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1hY3Rpb25zLWJnKVwiLFxuICAgICAgYm94U2hhZG93OiBcInZhcigtLXR2LXNoYWRvdylcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCJcbiAgICB9O1xuXG4gICAgdmFyIHNlbGVjdFdyYXBTdHlsZSA9IHtcbiAgICAgIGZsZXg6IFwiMSAxIDIyMHB4XCIsXG4gICAgICBtaW5XaWR0aDogXCIyMDBweFwiLFxuICAgICAgbWF4V2lkdGg6IFwiMTAwJVwiXG4gICAgfTtcblxuICAgIHZhciBidG5JY29uU3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIsXG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICB3aWR0aDogXCI0MnB4XCIsXG4gICAgICBoZWlnaHQ6IFwiNDJweFwiLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LWJvcmRlci1pbnB1dClcIixcbiAgICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtYnRuLWljb24tYmcpXCIsXG4gICAgICBjb2xvcjogXCJ2YXIoLS10di1idG4taWNvbi1mZylcIixcbiAgICAgIGN1cnNvcjogY29weUJ1c3kgfHwgbG9hZGluZyA/IFwibm90LWFsbG93ZWRcIiA6IFwicG9pbnRlclwiLFxuICAgICAgZm9udFNpemU6IFwiMjBweFwiLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICBib3hTaGFkb3c6IFwidmFyKC0tdHYtc2hhZG93LWNoaXApXCIsXG4gICAgICB0cmFuc2l0aW9uOiBcImJhY2tncm91bmQgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2VcIlxuICAgIH07XG5cbiAgICB2YXIgYnRuUHJpbWFyeVN0eWxlID0ge1xuICAgICAgcGFkZGluZzogXCIxMXB4IDIwcHhcIixcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgYmFja2dyb3VuZDogY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCA/IFwiIzk0YTNiOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICBmb250U2l6ZTogXCIxM3B4XCIsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDJlbVwiLFxuICAgICAgY3Vyc29yOiBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYm94U2hhZG93OlxuICAgICAgICBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCJub25lXCIgOiBcIjAgMXB4IDJweCByZ2JhKDM3LCA5OSwgMjM1LCAwLjM1KVwiLFxuICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZVwiXG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtYXJnaW5Ub3A6IFwiOHB4XCIgfSB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IFwidmFyKC0tdHYtdGV4dClcIiwgbWFyZ2luQm90dG9tOiBcIjhweFwiIH0gfSxcbiAgICAgICAgXCJUcmFuc2xhdGVcIlxuICAgICAgKSxcbiAgICAgIGhpbnRcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIiwgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCBtYXJnaW5Cb3R0b206IFwiMTBweFwiLCBsaW5lSGVpZ2h0OiAxLjQ1IH0gfSxcbiAgICAgICAgICAgIGhpbnRcbiAgICAgICAgICApXG4gICAgICAgIDogbnVsbCxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3R5bGU6IGFjdGlvbnNSb3dTdHlsZSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBzdHlsZTogc2VsZWN0V3JhcFN0eWxlIH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwic2VsZWN0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiBzZWxlY3RTdHlsZSxcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6IHNlbGVjdERpc2FibGVkLFxuICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb25Gb2N1czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZvY3VzZWQodHJ1ZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9uQmx1cjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZvY3VzZWQoZmFsc2UpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogXCJUYXJnZXQgbG9jYWxlIGZvciB0cmFuc2xhdGlvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJvcHRpb25cIixcbiAgICAgICAgICAgICAgeyB2YWx1ZTogXCJcIiB9LFxuICAgICAgICAgICAgICBsb2FkaW5nID8gXCJMb2FkaW5nXFx1MjAyNlwiIDogb3B0aW9ucy5sZW5ndGggPT09IDAgPyBcIlxcdTIwMTRcIiA6IFwiQ2hvb3NlIGxvY2FsZVxcdTIwMjZcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9wdGlvbnMubWFwKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCIsXG4gICAgICAgICAgICAgICAgeyBrZXk6IG8ubG9jYWxlLCB2YWx1ZTogby5sb2NhbGUgfSxcbiAgICAgICAgICAgICAgICBvLmZsYWcgKyBcIiBcIiArIG8ubGFiZWwgKyBcIiAoXCIgKyBvLmxvY2FsZSArIFwiKVwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBkaXNhYmxlZDogY29weUJ1c3kgfHwgbG9hZGluZyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbG9hZFRhcmdldHMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aXRsZTogXCJSZWxvYWQgbG9jYWxlIGxpc3RcIixcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBsb2FkaW5nID8gXCJMb2FkaW5nIGxvY2FsZXNcIiA6IFwiUmVsb2FkIGxvY2FsZSBsaXN0XCIsXG4gICAgICAgICAgICBzdHlsZTogYnRuSWNvblN0eWxlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsb2FkaW5nID8gU3Bpbm5lckVsKHsgc2l6ZTogMTYsIGxhYmVsOiBcIkxvYWRpbmcgbG9jYWxlc1wiIH0pIDogXCJcXHUyMUJCXCJcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBkaXNhYmxlZDogY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCxcbiAgICAgICAgICAgIHN0eWxlOiBidG5QcmltYXJ5U3R5bGUsXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJ1blRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29weUJ1c3kgPyBCdXN5TGFiZWwoXCJUcmFuc2xhdGluZ1xcdTIwMjZcIiwgeyBsaWdodDogdHJ1ZSwgc2l6ZTogMTQgfSkgOiBcIlRyYW5zbGF0ZVwiXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgdmFyIFBJTExfU1RZTEVTID0ge1xuICAgIGJhc2U6IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICBmb250U2l6ZTogXCIxMHB4XCIsXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDRlbVwiLFxuICAgICAgdGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIixcbiAgICAgIHBhZGRpbmc6IFwiMnB4IDhweFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjk5OXB4XCIsXG4gICAgICBsaW5lSGVpZ2h0OiAxLjNcbiAgICB9LFxuICAgIHNvdXJjZToge1xuICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1waWxsLXNvdXJjZS1iZylcIixcbiAgICAgIGNvbG9yOiBcInZhcigtLXR2LXBpbGwtc291cmNlLWZnKVwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCB2YXIoLS10di1waWxsLXNvdXJjZS1iZClcIlxuICAgIH0sXG4gICAgY3VycmVudDoge1xuICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1waWxsLWN1cnJlbnQtYmcpXCIsXG4gICAgICBjb2xvcjogXCJ2YXIoLS10di1waWxsLWN1cnJlbnQtZmcpXCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LXBpbGwtY3VycmVudC1iZClcIlxuICAgIH1cbiAgfTtcblxuICB2YXIgUk9XX1NVUkZBQ0UgPSB7XG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBnYXA6IFwiMTBweFwiLFxuICAgIHBhZGRpbmc6IFwiNnB4IDEwcHhcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiNnB4XCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCB2YXIoLS10di1ib3JkZXItcm93KVwiLFxuICAgIG1hcmdpbkJvdHRvbTogXCI2cHhcIixcbiAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LXBhcGVyKVwiXG4gIH07XG5cbiAgdmFyIE1FTlVfVFJJR0dFUl9TVFlMRSA9IHtcbiAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LWVsZXZhdGVkKVwiLFxuICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyLXJvdylcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgcGFkZGluZzogXCI0cHggOHB4XCIsXG4gICAgbWluV2lkdGg6IFwiMzJweFwiLFxuICAgIGZvbnRTaXplOiBcIjE2cHhcIixcbiAgICBsaW5lSGVpZ2h0OiAxLFxuICAgIGNvbG9yOiBcInZhcigtLXR2LXRleHQtbXV0ZWQpXCIsXG4gICAgY3Vyc29yOiBcInBvaW50ZXJcIlxuICB9O1xuXG4gIC8qKiBTdHVkaW8gSXRlbU1lZ2FNZW51IGlnbm9yZXMgaW5jbHVkZU9ubHk7IHdoaXRlbGlzdCB2aXNpYmxlIGxhYmVscyBhZnRlciBvcGVuLiAqL1xuICB2YXIgVFJBTlNMQVRJT05fSVRFTV9NRU5VX0xBQkVMUyA9IHtcbiAgICBlZGl0OiAxLFxuICAgIHZpZXc6IDEsXG4gICAgXCJ2aWV3IGZvcm1cIjogMSxcbiAgICBoaXN0b3J5OiAxLFxuICAgIGRlcGVuZGVuY2llczogMSxcbiAgICBwdWJsaXNoOiAxLFxuICAgIFwicmVxdWVzdCBwdWJsaXNoXCI6IDEsXG4gICAgYXBwcm92ZTogMSxcbiAgICBwcmV2aWV3OiAxXG4gIH07XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWVnYU1lbnVMYWJlbCh0ZXh0KSB7XG4gICAgcmV0dXJuIFN0cmluZyh0ZXh0IHx8IFwiXCIpXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIiBcIilcbiAgICAgIC50cmltKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBbGxvd2VkTWVnYU1lbnVMYWJlbCh0ZXh0LCBoaWRlRWRpdCkge1xuICAgIHZhciB0eHQgPSBub3JtYWxpemVNZWdhTWVudUxhYmVsKHRleHQpO1xuICAgIGlmICghdHh0KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGhpZGVFZGl0ICYmICh0eHQgPT09IFwiZWRpdFwiIHx8IHR4dC5pbmRleE9mKFwiZWRpdCBcIikgPT09IDApKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKFRSQU5TTEFUSU9OX0lURU1fTUVOVV9MQUJFTFNbdHh0XSkgcmV0dXJuIHRydWU7XG4gICAgZm9yICh2YXIga2V5IGluIFRSQU5TTEFUSU9OX0lURU1fTUVOVV9MQUJFTFMpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFRSQU5TTEFUSU9OX0lURU1fTUVOVV9MQUJFTFMsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgaWYgKHR4dCA9PT0ga2V5IHx8IHR4dC5pbmRleE9mKGtleSArIFwiIFwiKSA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlbcm9sZT0nbWVudWl0ZW0nXSwgLk11aU1lbnVJdGVtLXJvb3RcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG4gPSBub2Rlc1tpXTtcbiAgICAgIHZhciB0eHQgPSBuLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICBpZiAoIWlzQWxsb3dlZE1lZ2FNZW51TGFiZWwodHh0LCBoaWRlRWRpdCkpIHtcbiAgICAgICAgbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVFbmZvcmNlQWxsb3dlZEl0ZW1zSW5NZWdhTWVudShoaWRlRWRpdCkge1xuICAgIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBlbmZvcmNlQWxsb3dlZEl0ZW1zSW5PcGVuTWVnYU1lbnUoaGlkZUVkaXQpO1xuICAgIH0sIDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KTtcbiAgICB9LCA2MCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBlbmZvcmNlQWxsb3dlZEl0ZW1zSW5PcGVuTWVnYU1lbnUoaGlkZUVkaXQpO1xuICAgIH0sIDE2MCk7XG4gIH1cblxuICBmdW5jdGlvbiBUcmFuc2xhdGlvblZlcnNpb25Sb3cocHJvcHMpIHtcbiAgICB2YXIgbWV0YSA9IHByb3BzLm1ldGE7XG4gICAgdmFyIGlzU291cmNlID0gcHJvcHMuaXNTb3VyY2U7XG4gICAgdmFyIGV4aXN0cyA9IHByb3BzLmV4aXN0cyAhPT0gZmFsc2U7XG4gICAgdmFyIHRhcmdldFBhdGggPSBwcm9wcy50YXJnZXRQYXRoO1xuICAgIHZhciBkaXNwYXRjaCA9IHByb3BzLmRpc3BhdGNoO1xuICAgIHZhciBpc091dGRhdGVkID0gISFwcm9wcy5pc091dGRhdGVkO1xuICAgIHZhciBvblRyYW5zbGF0ZSA9IHByb3BzLm9uVHJhbnNsYXRlO1xuICAgIHZhciB0cmFuc2xhdGVCdXN5ID0gISFwcm9wcy50cmFuc2xhdGVCdXN5O1xuICAgIHZhciBzaG93UmVtb3ZlVHJhbnNsYXRpb24gPSAhIXByb3BzLnNob3dSZW1vdmVUcmFuc2xhdGlvbjtcbiAgICB2YXIgb25SZW1vdmVUcmFuc2xhdGlvbiA9IHByb3BzLm9uUmVtb3ZlVHJhbnNsYXRpb247XG4gICAgdmFyIGZvcm1QYXRoID0gcHJvcHMuZm9ybVBhdGggfHwgXCJcIjtcbiAgICB2YXIgaXNDdXJyZW50Um93ID0gZm9ybVBhdGggJiYgdGFyZ2V0UGF0aCAmJiBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aCh0YXJnZXRQYXRoKTtcbiAgICB2YXIgaXNDb21wYXJlU2VsZWN0ZWQgPSAhIXByb3BzLmlzQ29tcGFyZVNlbGVjdGVkO1xuICAgIHZhciByb3dDbGlja2FibGUgPSAhIWlzU291cmNlICYmICFpc0N1cnJlbnRSb3cgJiYgZXhpc3RzO1xuICAgIHZhciByb3dTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIFJPV19TVVJGQUNFKTtcbiAgICBpZiAoaXNDb21wYXJlU2VsZWN0ZWQpIHtcbiAgICAgIHJvd1N0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgcm93U3R5bGUsIHtcbiAgICAgICAgYm9yZGVyQ29sb3I6IFwidmFyKC0tdHYtc2VsZWN0LWZvY3VzKVwiLFxuICAgICAgICBib3hTaGFkb3c6IFwiMCAwIDAgMXB4IHJnYmEoMzcsIDk5LCAyMzUsIDAuNDUpIGluc2V0XCIsXG4gICAgICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtY29tcGFyZS1zZWxlY3RlZC1iZylcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChyb3dDbGlja2FibGUpIHtcbiAgICAgIHJvd1N0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgcm93U3R5bGUsIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9KTtcbiAgICB9XG4gICAgdmFyIHNob3dTdHVkaW9JdGVtTWVnYU1lbnUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICghZGlzcGF0Y2ggfHwgIXRhcmdldFBhdGgpIHJldHVybjtcbiAgICAgIHZhciB0b3AgPSB0eXBlb2YgZXZlbnQuY2xpZW50WSA9PT0gXCJudW1iZXJcIiA/IGV2ZW50LmNsaWVudFkgOiAwO1xuICAgICAgdmFyIGxlZnQgPSB0eXBlb2YgZXZlbnQuY2xpZW50WCA9PT0gXCJudW1iZXJcIiA/IGV2ZW50LmNsaWVudFggOiAwO1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcIlNIT1dfSVRFTV9NRUdBX01FTlVcIixcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHBhdGg6IHRhcmdldFBhdGgsXG4gICAgICAgICAgYW5jaG9yUmVmZXJlbmNlOiBcImFuY2hvclBvc2l0aW9uXCIsXG4gICAgICAgICAgYW5jaG9yUG9zaXRpb246IHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNjaGVkdWxlRW5mb3JjZUFsbG93ZWRJdGVtc0luTWVnYU1lbnUoaXNDdXJyZW50Um93KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6IFwidHJhbnNsYXRpb24tdmVyc2lvbnMtcm93XCIsXG4gICAgICAgIHN0eWxlOiByb3dTdHlsZSxcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMub25BY3RpdmF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBwcm9wcy5vbkFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgaXNTb3VyY2U6ICEhaXNTb3VyY2UsXG4gICAgICAgICAgICAgIGlzQ3VycmVudFJvdzogISFpc0N1cnJlbnRSb3dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcm9sZTogcm93Q2xpY2thYmxlID8gXCJidXR0b25cIiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGFiSW5kZXg6IHJvd0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWQsXG4gICAgICAgIG9uS2V5RG93bjogcm93Q2xpY2thYmxlXG4gICAgICAgICAgPyBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMub25BY3RpdmF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBwcm9wcy5vbkFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgaXNTb3VyY2U6ICEhaXNTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudFJvdzogISFpc0N1cnJlbnRSb3dcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICB0aXRsZTogcm93Q2xpY2thYmxlID8gXCJTaG93IHNvdXJjZSBmaWVsZHMgKHJlYWQtb25seSkgbmV4dCB0byB0aGlzIGZvcm1cIiA6IHVuZGVmaW5lZFxuICAgICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEuMTVyZW1cIiwgbGluZUhlaWdodDogMSB9LCBcImFyaWEtaGlkZGVuXCI6IHRydWUgfSxcbiAgICAgICAgbWV0YS5mbGFnXG4gICAgICApLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBtaW5XaWR0aDogXCI3MnB4XCIsIGZvbnRTaXplOiBcIjEzcHhcIiwgY29sb3I6IFwidmFyKC0tdHYtdGV4dClcIiB9IH0sXG4gICAgICAgIG1ldGEubGFiZWxcbiAgICAgICksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcInNwYW5cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGdhcDogXCI4cHhcIixcbiAgICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBmbGV4OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc1NvdXJjZVxuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIFBJTExfU1RZTEVTLmJhc2UsIFBJTExfU1RZTEVTLnNvdXJjZSkgfSxcbiAgICAgICAgICAgICAgXCJTb3VyY2VcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgaXNPdXRkYXRlZFxuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIFBJTExfU1RZTEVTLmJhc2UsIHsgYmFja2dyb3VuZDogXCJ2YXIoLS10di1waWxsLW91dGRhdGVkLWJnKVwiLCBjb2xvcjogXCJ2YXIoLS10di1waWxsLW91dGRhdGVkLWZnKVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkIHZhcigtLXR2LXBpbGwtb3V0ZGF0ZWQtYmQpXCIgfSksIHRpdGxlOiBcIk91dGRhdGVkIHRyYW5zbGF0aW9uXCIgfSxcbiAgICAgICAgICAgICAgXCJcXHVEODNEXFx1REVBOSBPdXRkYXRlZFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBpc0N1cnJlbnRSb3dcbiAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7IHN0eWxlOiBPYmplY3QuYXNzaWduKHt9LCBQSUxMX1NUWUxFUy5iYXNlLCBQSUxMX1NUWUxFUy5jdXJyZW50KSwgdGl0bGU6IFwiVGhpcyBpcyB0aGUgaXRlbSB5b3UgaGF2ZSBvcGVuIGluIHRoZSBmb3JtXCIgfSxcbiAgICAgICAgICAgICAgXCJDdXJyZW50XCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG51bGxcbiAgICAgICksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0eWxlOiB7IG1hcmdpbkxlZnQ6IFwiYXV0b1wiLCBmbGV4U2hyaW5rOiAwLCBkaXNwbGF5OiBcImZsZXhcIiwgZ2FwOiBcIjZweFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0gfSxcbiAgICAgICAgZXhpc3RzXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIsIGdhcDogXCI2cHhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiB9IH0sXG4gICAgICAgICAgICAgIHNob3dSZW1vdmVUcmFuc2xhdGlvblxuICAgICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGFuZ2VyIGJ0bi14c1wiLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ICYmIGV2LnN0b3BQcm9wYWdhdGlvbikgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uUmVtb3ZlVHJhbnNsYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZVRyYW5zbGF0aW9uKHRhcmdldFBhdGgsIG1ldGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiUmVtb3ZlIHRyYW5zbGF0aW9uIGZvciBcIiArIG1ldGEubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlbW92ZSB0aGlzIHRyYW5zbGF0ZWQgcGFnZSAob3B0aW9uYWwgc2hhcmVkIGNvbXBvbmVudHMgd2l0aCBubyBvdGhlciBwYWdlIHJlZmVyZW5jZXMpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgd2hpdGVTcGFjZTogXCJub3dyYXBcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiUmVtb3ZlXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tc21cIixcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHNob3dTdHVkaW9JdGVtTWVnYU1lbnUsXG4gICAgICAgICAgICAgICAgICBcImFyaWEtaGFzcG9wdXBcIjogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogKGlzQ3VycmVudFJvdyA/IFwiT3B0aW9ucyAoZWRpdGluZyB0aGlzIGl0ZW0g4oCUIEVkaXQgaGlkZGVuKSBcIiA6IFwiT3B0aW9ucyBmb3IgXCIpICsgbWV0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBpc0N1cnJlbnRSb3cgPyBcIk9wZW4gaXRlbSBtZW51IChFZGl0IGlzIGhpZGRlbiB3aGlsZSB0aGlzIGZvcm0gaXMgb3BlbiBmb3IgdGhpcyBwYXRoKVwiIDogXCJJdGVtIGFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiBNRU5VX1RSSUdHRVJfU1RZTEVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiXFx1MjJFRVwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLXByaW1hcnkgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRyYW5zbGF0ZUJ1c3ksXG4gICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZXYgJiYgZXYuc3RvcFByb3BhZ2F0aW9uKSBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVCdXN5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uVHJhbnNsYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2xhdGUodGFyZ2V0UGF0aCwgbWV0YSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogdHJhbnNsYXRlQnVzeSA/IFwiVHJhbnNsYXRpbmcgdG8gXCIgKyBtZXRhLmxhYmVsIDogXCJUcmFuc2xhdGUgdG8gXCIgKyBtZXRhLmxhYmVsLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IHdoaXRlU3BhY2U6IFwibm93cmFwXCIsIG1pbldpZHRoOiBcIjg4cHhcIiB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZUJ1c3kgPyBCdXN5TGFiZWwoXCJUcmFuc2xhdGluZ1xcdTIwMjZcIiwgeyBsaWdodDogdHJ1ZSwgc2l6ZTogMTIgfSkgOiBcIlRyYW5zbGF0ZVwiXG4gICAgICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFRyYW5zbGF0aW9uVmVyc2lvbnNQYW5lbChwcm9wcykge1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoO1xuICAgIHZhciBzaXRlSWQgPSBwcm9wcy5zaXRlSWQ7XG4gICAgdmFyIG1vZGVsID0gcHJvcHMubW9kZWwgfHwge307XG4gICAgdmFyIGZvcm0gPSBwcm9wcy5mb3JtO1xuICAgIHZhciBjb250cm9sQ29udGFpbmVyRWwgPSBwcm9wcy5jb250cm9sQ29udGFpbmVyRWw7XG4gICAgdmFyIHJlc29sdmVkQ29udGVudFR5cGVJZCA9IFN0cmluZyhcbiAgICAgIHByb3BzLmNvbnRlbnRUeXBlSWQgfHwgbW9kZWxbXCJjb250ZW50LXR5cGVcIl0gfHwgbW9kZWwuY29udGVudFR5cGUgfHwgXCJcIlxuICAgICkudHJpbSgpO1xuXG4gICAgdmFyIHNvdXJjZUxvY2FsZSA9IChtb2RlbC5zb3VyY2VMb2NhbGVDb2RlX3MgJiYgU3RyaW5nKG1vZGVsLnNvdXJjZUxvY2FsZUNvZGVfcykudHJpbSgpLnRvTG93ZXJDYXNlKCkpIHx8IFwiXCI7XG4gICAgdmFyIG1vZGVsTG9jYWxlID0gKG1vZGVsLmxvY2FsZUNvZGVfcyAmJiBTdHJpbmcobW9kZWwubG9jYWxlQ29kZV9zKS50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgXCJcIjtcbiAgICB2YXIgcGF0aExvY2FsZSA9IGdldExvY2FsZUZyb21QYXRoKGZvcm1QYXRoKSB8fCBcIlwiO1xuXG4gICAgLy8gU291cmNlIGluZGljYXRvciBpcyBkYXRhLWRyaXZlbiBvbmx5IGZyb20gWE1MIHNvdXJjZUxvY2FsZUNvZGVfcy5cbiAgICAvLyBJZiBtaXNzaW5nLCBkbyBub3QgbWFyayBhbnkgcm93IGFzIHNvdXJjZS5cbiAgICB2YXIgcmVzb2x2ZWRTb3VyY2UgPSBzb3VyY2VMb2NhbGU7XG4gICAgdmFyIHJlc29sdmVkU291cmNlS2V5ID0gU3RyaW5nKHJlc29sdmVkU291cmNlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB2YXIgcm9vdERpciA9IGdldE11bHRpTG9jYWxlUm9vdERpcihmb3JtUGF0aCk7XG5cbiAgICB2YXIgYXV0aG9yaW5nQmFzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIGF1dGhvcmluZ0Jhc2UgPSBhdXRob3JpbmdCYXNlU3RhdGVbMF07XG4gICAgdmFyIHNldEF1dGhvcmluZ0Jhc2UgPSBhdXRob3JpbmdCYXNlU3RhdGVbMV07XG5cbiAgICB2YXIgcGF0aHNTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcbiAgICB2YXIgdHJhbnNsYXRpb25QYXRocyA9IHBhdGhzU3RhdGVbMF07XG4gICAgdmFyIHNldFRyYW5zbGF0aW9uUGF0aHMgPSBwYXRoc1N0YXRlWzFdO1xuXG4gICAgdmFyIGxvYWRpbmdTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKHRydWUpO1xuICAgIHZhciBsb2FkaW5nID0gbG9hZGluZ1N0YXRlWzBdO1xuICAgIHZhciBzZXRMb2FkaW5nID0gbG9hZGluZ1N0YXRlWzFdO1xuXG4gICAgdmFyIGZpbHRlclN0YXRlID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIGZpbHRlclF1ZXJ5ID0gZmlsdGVyU3RhdGVbMF07XG4gICAgdmFyIHNldEZpbHRlclF1ZXJ5ID0gZmlsdGVyU3RhdGVbMV07XG4gICAgdmFyIHBhZ2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuICAgIHZhciBwYWdlSW5kZXggPSBwYWdlU3RhdGVbMF07XG4gICAgdmFyIHNldFBhZ2VJbmRleCA9IHBhZ2VTdGF0ZVsxXTtcblxuICAgIHZhciBsaXN0UmVmcmVzaFN0ID0gUmVhY3QudXNlU3RhdGUoMCk7XG4gICAgdmFyIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXkgPSBsaXN0UmVmcmVzaFN0WzBdO1xuICAgIHZhciBidW1wVHJhbnNsYXRpb25MaXN0ID0gbGlzdFJlZnJlc2hTdFsxXTtcbiAgICB2YXIgdHJhbnNsYXRpb25DZmdTdCA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIHZhciB0cmFuc2xhdGlvbkNmZyA9IHRyYW5zbGF0aW9uQ2ZnU3RbMF07XG4gICAgdmFyIHNldFRyYW5zbGF0aW9uQ2ZnID0gdHJhbnNsYXRpb25DZmdTdFsxXTtcblxuICAgIHZhciBzdGFsZUJ5UGF0aFN0ID0gUmVhY3QudXNlU3RhdGUoe30pO1xuICAgIHZhciBzdGFsZUJ5UGF0aCA9IHN0YWxlQnlQYXRoU3RbMF07XG4gICAgdmFyIHNldFN0YWxlQnlQYXRoID0gc3RhbGVCeVBhdGhTdFsxXTtcbiAgICB2YXIgZXhpc3RzQnlQYXRoU3QgPSBSZWFjdC51c2VTdGF0ZSh7fSk7XG4gICAgdmFyIGV4aXN0c0J5UGF0aCA9IGV4aXN0c0J5UGF0aFN0WzBdO1xuICAgIHZhciBzZXRFeGlzdHNCeVBhdGggPSBleGlzdHNCeVBhdGhTdFsxXTtcblxuICAgIHZhciBjb21wYXJlUGF0aFN0ID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgdmFyIGNvbXBhcmVTb3VyY2VQYXRoID0gY29tcGFyZVBhdGhTdFswXTtcbiAgICB2YXIgc2V0Q29tcGFyZVNvdXJjZVBhdGggPSBjb21wYXJlUGF0aFN0WzFdO1xuXG4gICAgdmFyIHJlbW92ZU1vZGFsU3QgPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgICB2YXIgcmVtb3ZlTW9kYWwgPSByZW1vdmVNb2RhbFN0WzBdO1xuICAgIHZhciBzZXRSZW1vdmVNb2RhbCA9IHJlbW92ZU1vZGFsU3RbMV07XG5cbiAgICB2YXIgcm93VHJhbnNsYXRlQnVzeVN0ID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIHJvd1RyYW5zbGF0ZUJ1c3lQYXRoID0gcm93VHJhbnNsYXRlQnVzeVN0WzBdO1xuICAgIHZhciBzZXRSb3dUcmFuc2xhdGVCdXN5UGF0aCA9IHJvd1RyYW5zbGF0ZUJ1c3lTdFsxXTtcblxuICAgIHZhciBjb2xsYXBzZWRTdCA9IFJlYWN0LnVzZVN0YXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZWFkVHJhbnNsYXRpb25XaWRnZXRDb2xsYXBzZWQoc2l0ZUlkKTtcbiAgICB9KTtcbiAgICB2YXIgd2lkZ2V0Q29sbGFwc2VkID0gY29sbGFwc2VkU3RbMF07XG4gICAgdmFyIHNldFdpZGdldENvbGxhcHNlZCA9IGNvbGxhcHNlZFN0WzFdO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRXaWRnZXRDb2xsYXBzZWQocmVhZFRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VkKHNpdGVJZCkpO1xuICAgICAgfSxcbiAgICAgIFtzaXRlSWRdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gb25TdG9yYWdlKGUpIHtcbiAgICAgICAgICBpZiAoIWUgfHwgZS5rZXkgIT09IHRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VTdG9yYWdlS2V5KHNpdGVJZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5leHRDb2xsYXBzZWQgPSBlLm5ld1ZhbHVlID09PSBcIjFcIjtcbiAgICAgICAgICBzZXRXaWRnZXRDb2xsYXBzZWQobmV4dENvbGxhcHNlZCk7XG4gICAgICAgICAgaWYgKG5leHRDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHNldENvbXBhcmVTb3VyY2VQYXRoKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkN1c3RvbShlKSB7XG4gICAgICAgICAgdmFyIGRldGFpbCA9IGUgJiYgZS5kZXRhaWw7XG4gICAgICAgICAgaWYgKCFkZXRhaWwgfHwgU3RyaW5nKGRldGFpbC5zaXRlSWQgfHwgXCJcIikgIT09IFN0cmluZyhzaXRlSWQgfHwgXCJcIikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5leHRDb2xsYXBzZWQgPSAhIWRldGFpbC5jb2xsYXBzZWQ7XG4gICAgICAgICAgc2V0V2lkZ2V0Q29sbGFwc2VkKG5leHRDb2xsYXBzZWQpO1xuICAgICAgICAgIGlmIChuZXh0Q29sbGFwc2VkKSB7XG4gICAgICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzdG9yYWdlXCIsIG9uU3RvcmFnZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRSQU5TTEFUSU9OX1dJREdFVF9DT0xMQVBTRV9FVkVOVCwgb25DdXN0b20pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCBvblN0b3JhZ2UpO1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFRSQU5TTEFUSU9OX1dJREdFVF9DT0xMQVBTRV9FVkVOVCwgb25DdXN0b20pO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFtzaXRlSWRdXG4gICAgKTtcblxuICAgIHZhciB0b2dnbGVXaWRnZXRDb2xsYXBzZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRXaWRnZXRDb2xsYXBzZWQoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgdmFyIG5leHQgPSAhcHJldjtcbiAgICAgICAgd3JpdGVUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZChzaXRlSWQsIG5leHQpO1xuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIHNldENvbXBhcmVTb3VyY2VQYXRoKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzdWZmaXggPSBwYXJzZVN1ZmZpeEZyb21Gb3JtUGF0aChmb3JtUGF0aCwgcm9vdERpcikuc3VmZml4O1xuICAgIHZhciBjdXJyZW50TG9jYWxlID0gKHBhdGhMb2NhbGUgfHwgbW9kZWxMb2NhbGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRQYWdlSW5kZXgoMCk7XG4gICAgfSwgW3RyYW5zbGF0aW9uUGF0aHMsIGZpbHRlclF1ZXJ5XSk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldENvbXBhcmVTb3VyY2VQYXRoKG51bGwpO1xuICAgICAgfSxcbiAgICAgIFtmb3JtUGF0aF1cbiAgICApO1xuXG4gICAgLyoqIE9uZSBzZXJ2ZXIgY2FsbDogdHJhbnNsYXRpb24gY29uZmlnICsgZXZlcnkgbG9jYWxlIHZhcmlhbnQgb2YgdGhpcyBpdGVtIChsaW5lYWdlLCBleGlzdHMsIG91dGRhdGVkKS4gKi9cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgc2V0QXV0aG9yaW5nQmFzZShnZXRBdXRob3JpbmdCYXNlKCkpO1xuXG4gICAgICAgIGlmICghc2l0ZUlkIHx8ICFmb3JtUGF0aCkge1xuICAgICAgICAgIHNldFRyYW5zbGF0aW9uUGF0aHMoW10pO1xuICAgICAgICAgIHNldEV4aXN0c0J5UGF0aCh7fSk7XG4gICAgICAgICAgc2V0U3RhbGVCeVBhdGgoe30pO1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICBmZXRjaFRyYW5zbGF0aW9uTG9jYWxlcyhnZXRTdHVkaW9BcGlCYXNlKCksIHNpdGVJZCwgZm9ybVBhdGgsIHtcbiAgICAgICAgICBjb250ZW50VHlwZTogcmVzb2x2ZWRDb250ZW50VHlwZUlkLFxuICAgICAgICAgIGxvY2FsZVNvdXJjZUlkOiBtb2RlbC5sb2NhbGVTb3VyY2VJZF9zLFxuICAgICAgICAgIG9iamVjdElkOiBtb2RlbC5vYmplY3RJZCxcbiAgICAgICAgICBzb3VyY2VMb2NhbGU6IHJlc29sdmVkU291cmNlS2V5XG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY2ZnKSB7XG4gICAgICAgICAgICAgIHNldFRyYW5zbGF0aW9uQ2ZnKHJlcy5jZmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBhdGhzID0ge307XG4gICAgICAgICAgICB2YXIgZXhpc3RzID0ge307XG4gICAgICAgICAgICB2YXIgc3RhbGUgPSB7fTtcbiAgICAgICAgICAgICgocmVzICYmIHJlcy5sb2NhbGVzKSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgIGlmICghcm93IHx8ICFyb3cucGF0aCkgcmV0dXJuO1xuICAgICAgICAgICAgICBleGlzdHNbcm93LnBhdGhdID0gISFyb3cuZXhpc3RzO1xuICAgICAgICAgICAgICBzdGFsZVtyb3cucGF0aF0gPSAhIXJvdy5pc091dGRhdGVkO1xuICAgICAgICAgICAgICBpZiAocm93LmV4aXN0cykgcGF0aHNbcm93LnBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGF0aHNbZm9ybVBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICAgIGV4aXN0c1tmb3JtUGF0aF0gPSB0cnVlO1xuICAgICAgICAgICAgc2V0RXhpc3RzQnlQYXRoKGV4aXN0cyk7XG4gICAgICAgICAgICBzZXRTdGFsZUJ5UGF0aChzdGFsZSk7XG4gICAgICAgICAgICBzZXRUcmFuc2xhdGlvblBhdGhzKFxuICAgICAgICAgICAgICBzb3J0VHJhbnNsYXRpb25QYXRoc0ZvckRpc3BsYXkoT2JqZWN0LmtleXMocGF0aHMpLCByZXNvbHZlZFNvdXJjZUtleSwgcmVzICYmIHJlcy5jZmcgJiYgcmVzLmNmZy5jb2RlcylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgc2V0VHJhbnNsYXRpb25QYXRocyhbZm9ybVBhdGhdKTtcbiAgICAgICAgICAgIHNldEV4aXN0c0J5UGF0aCh7fSk7XG4gICAgICAgICAgICBzZXRTdGFsZUJ5UGF0aCh7fSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgZm9ybVBhdGgsXG4gICAgICAgIHNpdGVJZCxcbiAgICAgICAgbW9kZWwubG9jYWxlU291cmNlSWRfcyxcbiAgICAgICAgbW9kZWwub2JqZWN0SWQsXG4gICAgICAgIHJlc29sdmVkQ29udGVudFR5cGVJZCxcbiAgICAgICAgcmVzb2x2ZWRTb3VyY2VLZXksXG4gICAgICAgIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXlcbiAgICAgIF1cbiAgICApO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIG9uQ2xvc2VDb21wYXJlKCkge1xuICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNsYXRpb246Y2xvc2Utc291cmNlLWNvbXBhcmVcIiwgb25DbG9zZUNvbXBhcmUpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2xhdGlvbjpjbG9zZS1zb3VyY2UtY29tcGFyZVwiLCBvbkNsb3NlQ29tcGFyZSk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzaXRlSWQgfHwgIWZvcm1QYXRoIHx8ICFmb3JtIHx8ICFjb250cm9sQ29udGFpbmVyRWwpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJhc2UgPSBhdXRob3JpbmdCYXNlIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICAgICAgdmFyIHNyYyA9IGJ1aWxkTGVnYWN5UmVhZG9ubHlGb3JtU3JjKGJhc2UsIHNpdGVJZCwgY29tcGFyZVNvdXJjZVBhdGggfHwgXCJcIik7XG4gICAgICAgIHZhciBob3N0ID0gZmluZEZvcm1GaWVsZHNDb21wYXJlSG9zdChmb3JtLCBjb250cm9sQ29udGFpbmVyRWwpO1xuICAgICAgICBpZiAoIWhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZGdldENvbGxhcHNlZCB8fCAhY29tcGFyZVNvdXJjZVBhdGggfHwgIXNyYykge1xuICAgICAgICAgIHVud3JhcEZvcm1Db21wYXJlTGF5b3V0KGhvc3QpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHdyYXBGb3JtQ29tcGFyZUxheW91dChob3N0LCBzcmMsIGNvbXBhcmVTb3VyY2VQYXRoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbY29tcGFyZVNvdXJjZVBhdGgsIGF1dGhvcmluZ0Jhc2UsIHNpdGVJZCwgZm9ybVBhdGgsIGZvcm0sIGNvbnRyb2xDb250YWluZXJFbCwgd2lkZ2V0Q29sbGFwc2VkXVxuICAgICk7XG5cbiAgICBpZiAoIXNpdGVJZCB8fCAhZm9ybVBhdGgpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IGNsYXNzTmFtZTogXCJoZWxwLWJsb2NrXCIsIHN0eWxlOiB7IG1hcmdpblRvcDogMCB9IH0sXG4gICAgICAgIFwiU2F2ZSB0aGUgaXRlbSBhbmQgb3BlbiBpdCBmcm9tIHRoZSBjb250ZW50IHRyZWUgdG8gc2VlIHRyYW5zbGF0aW9uIHZlcnNpb25zLlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciBkaXNwYXRjaCA9IGdldERpc3BhdGNoKCk7XG4gICAgdmFyIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoID0gcmVzb2x2ZVRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoKFxuICAgICAgdHJhbnNsYXRpb25DZmcsXG4gICAgICByb290RGlyLFxuICAgICAgc3VmZml4LFxuICAgICAgdHJhbnNsYXRpb25QYXRocyxcbiAgICAgIGZvcm1QYXRoLFxuICAgICAgcmVzb2x2ZWRTb3VyY2VLZXlcbiAgICApO1xuICAgIHZhciBjbG9zZVJlbW92ZVRyYW5zbGF0aW9uTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRSZW1vdmVNb2RhbChudWxsKTtcbiAgICB9O1xuXG4gICAgdmFyIG9wZW5SZW1vdmVUcmFuc2xhdGlvbk1vZGFsID0gZnVuY3Rpb24gKHRhcmdldFBhdGgsIG1ldGEpIHtcbiAgICAgIGlmICghc2l0ZUlkIHx8ICF0YXJnZXRQYXRoKSByZXR1cm47XG4gICAgICB2YXIgdHAgPSB0YXJnZXRQYXRoO1xuICAgICAgc2V0UmVtb3ZlTW9kYWwoe1xuICAgICAgICBwYWdlUGF0aDogdHAsXG4gICAgICAgIG1ldGFMYWJlbDogKG1ldGEgJiYgbWV0YS5sYWJlbCkgfHwgdHAsXG4gICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBjYW5kaWRhdGVzOiBbXSxcbiAgICAgICAgc2VsZWN0ZWRQYXRoczoge30sXG4gICAgICAgIHN1Ym1pdHRpbmc6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHZhciBzYiA9IGdldFN0dWRpb0FwaUJhc2UoKTtcbiAgICAgIGZldGNoVHJhbnNsYXRpb25SZW1vdmVDYW5kaWRhdGVzKHNiLCBzaXRlSWQsIHRwKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5vaykge1xuICAgICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgICAgaWYgKCFwcmV2IHx8IG5vcm1hbGl6ZVN0dWRpb1BhdGgocHJldi5wYWdlUGF0aCkgIT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodHApKSByZXR1cm4gcHJldjtcbiAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHByZXYsIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHJlcyAmJiByZXMubWVzc2FnZSkgfHwgXCJDb3VsZCBub3QgbG9hZCByZW1vdmFibGUgY29tcG9uZW50cy5cIlxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbGlzdCA9IHJlcy5jYW5kaWRhdGVzIHx8IFtdO1xuICAgICAgICAgIHZhciBzZWwgPSB7fTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChjICYmIGMucGF0aCkgc2VsW2MucGF0aF0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRSZW1vdmVNb2RhbChmdW5jdGlvbiAocHJldikge1xuICAgICAgICAgICAgaWYgKCFwcmV2IHx8IG5vcm1hbGl6ZVN0dWRpb1BhdGgocHJldi5wYWdlUGF0aCkgIT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodHApKSByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7XG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBsaXN0LFxuICAgICAgICAgICAgICBzZWxlY3RlZFBhdGhzOiBzZWwsXG4gICAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZXRSZW1vdmVNb2RhbChmdW5jdGlvbiAocHJldikge1xuICAgICAgICAgICAgaWYgKCFwcmV2IHx8IG5vcm1hbGl6ZVN0dWRpb1BhdGgocHJldi5wYWdlUGF0aCkgIT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodHApKSByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7IGxvYWRpbmc6IGZhbHNlLCBlcnJvcjogXCJOZXR3b3JrIGVycm9yIGxvYWRpbmcgY2FuZGlkYXRlcy5cIiB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB0b2dnbGVSZW1vdmVDYW5kaWRhdGUgPSBmdW5jdGlvbiAocGF0aCwgY2hlY2tlZCkge1xuICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgaWYgKCFwcmV2IHx8IHByZXYubG9hZGluZyB8fCBwcmV2LnN1Ym1pdHRpbmcpIHJldHVybiBwcmV2O1xuICAgICAgICB2YXIgbmV4dFNlbCA9IE9iamVjdC5hc3NpZ24oe30sIHByZXYuc2VsZWN0ZWRQYXRocyB8fCB7fSk7XG4gICAgICAgIG5leHRTZWxbcGF0aF0gPSAhIWNoZWNrZWQ7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7IHNlbGVjdGVkUGF0aHM6IG5leHRTZWwgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldEFsbFJlbW92ZUNhbmRpZGF0ZXMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgIGlmICghcHJldiB8fCBwcmV2LmxvYWRpbmcgfHwgcHJldi5zdWJtaXR0aW5nKSByZXR1cm4gcHJldjtcbiAgICAgICAgdmFyIG5leHRTZWwgPSB7fTtcbiAgICAgICAgKHByZXYuY2FuZGlkYXRlcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIGlmIChjICYmIGMucGF0aCkgbmV4dFNlbFtjLnBhdGhdID0gISF2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7IHNlbGVjdGVkUGF0aHM6IG5leHRTZWwgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNvbmZpcm1SZW1vdmVUcmFuc2xhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghcmVtb3ZlTW9kYWwgfHwgcmVtb3ZlTW9kYWwubG9hZGluZyB8fCByZW1vdmVNb2RhbC5zdWJtaXR0aW5nKSByZXR1cm47XG4gICAgICB2YXIgc2IgPSBnZXRTdHVkaW9BcGlCYXNlKCk7XG4gICAgICBpZiAoIXNiIHx8ICFzaXRlSWQpIHtcbiAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIFwiU3R1ZGlvIEFQSSBiYXNlIG9yIHNpdGUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBwYWdlUGF0aCA9IHJlbW92ZU1vZGFsLnBhZ2VQYXRoO1xuICAgICAgdmFyIHNlbCA9IHJlbW92ZU1vZGFsLnNlbGVjdGVkUGF0aHMgfHwge307XG4gICAgICB2YXIgcGF0aHMgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKHNlbCkuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICBpZiAoc2VsW3BdKSBwYXRocy5wdXNoKHApO1xuICAgICAgfSk7XG4gICAgICBzZXRSZW1vdmVNb2RhbChmdW5jdGlvbiAocHJldikge1xuICAgICAgICByZXR1cm4gcHJldiA/IE9iamVjdC5hc3NpZ24oe30sIHByZXYsIHsgc3VibWl0dGluZzogdHJ1ZSwgZXJyb3I6IG51bGwgfSkgOiBwcmV2O1xuICAgICAgfSk7XG4gICAgICBwb3N0VHJhbnNsYXRpb25SZW1vdmUoc2IsIHNpdGVJZCwgcGFnZVBhdGgsIHBhdGhzLCB0cnVlKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgdmFyIGRlbGV0ZWQgPSAocmVzICYmIHJlcy5kZWxldGVkKSB8fCBbXTtcbiAgICAgICAgICB2YXIgZmFpbGVkID0gKHJlcyAmJiByZXMuZmFpbGVkKSB8fCBbXTtcbiAgICAgICAgICB2YXIgZGVsZXRlZFBhZ2UgPVxuICAgICAgICAgICAgZGVsZXRlZC5zb21lKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVTdHVkaW9QYXRoKHApID09PSBub3JtYWxpemVTdHVkaW9QYXRoKHBhZ2VQYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmYWlsZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbXNnID1cbiAgICAgICAgICAgICAgXCJSZW1vdmUgZmluaXNoZWQgd2l0aCBlcnJvcnM6IFwiICtcbiAgICAgICAgICAgICAgZmFpbGVkXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChmICYmIGYucGF0aCkgKyAoZiAmJiBmLm1lc3NhZ2UgPyBcIiAoXCIgKyBmLm1lc3NhZ2UgKyBcIilcIiA6IFwiXCIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmpvaW4oXCI7IFwiKTtcbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub3RpZnlEaXNwYXRjaChcbiAgICAgICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgICAgIFwiUmVtb3ZlZCB0cmFuc2xhdGlvblwiICtcbiAgICAgICAgICAgICAgICAoZGVsZXRlZC5sZW5ndGggPyBcIiAoXCIgKyBkZWxldGVkLmxlbmd0aCArIFwiIGl0ZW0ocykpLlwiIDogXCIuXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidW1wVHJhbnNsYXRpb25MaXN0KGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICByZXR1cm4gbiArIDE7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY2xvc2VSZW1vdmVUcmFuc2xhdGlvbk1vZGFsKCk7XG4gICAgICAgICAgaWYgKGRlbGV0ZWRQYWdlICYmIGZvcm1QYXRoICYmIG5vcm1hbGl6ZVN0dWRpb1BhdGgoZm9ybVBhdGgpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKHBhZ2VQYXRoKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcIkRJU1BBVENIX0RPTV9FVkVOVFwiLCBwYXlsb2FkOiB7IGlkOiBcImVkaXREaWFsb2dTdWNjZXNzXCIgfSB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUxKSB7fVxuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goXG4gICAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgICBcIlRoZSBwYWdlIHlvdSBoYWQgb3BlbiB3YXMgZGVsZXRlZC4gQ2xvc2Ugb3IgcmVmcmVzaCB0aGlzIGRpYWxvZyBpZiBpdCBpcyBzdGlsbCBzaG93bi5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2ID8gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzdWJtaXR0aW5nOiBmYWxzZSwgZXJyb3I6IFwiTmV0d29yayBlcnJvciB3aGlsZSBkZWxldGluZy5cIiB9KSA6IHByZXY7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIFwiUmVtb3ZlIHRyYW5zbGF0aW9uIGZhaWxlZCAobmV0d29yaykuXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJ1blRyYW5zbGF0ZUZvclJvdyA9IGZ1bmN0aW9uICh0YXJnZXRQYXRoLCBtZXRhKSB7XG4gICAgICBpZiAoIWRpc3BhdGNoIHx8ICFyZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSkgfHwgIXNpdGVJZCB8fCAhdHJhbnNsYXRlQ29weVNvdXJjZVBhdGggfHwgIXRhcmdldFBhdGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHJvd1RyYW5zbGF0ZUJ1c3lQYXRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFJvd1RyYW5zbGF0ZUJ1c3lQYXRoKG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCkpO1xuICAgICAgdmFyIHBhcmVudCA9IHBhcmVudEZvbGRlclBhdGhGb3JDb3B5KHRhcmdldFBhdGgpO1xuICAgICAgdmFyIGNvbnRlbnRBcGlCYXNlID0gcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpO1xuICAgICAgY29weUl0ZW1QYXN0ZVN0dWRpbyhjb250ZW50QXBpQmFzZSwgc2l0ZUlkLCB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCwgcGFyZW50LCB0YXJnZXRQYXRoKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5vaykge1xuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIChyZXMgJiYgcmVzLm1lc3NhZ2UpIHx8IFwiVHJhbnNsYXRlIGZhaWxlZC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZWQgdG8gXCIgKyBtZXRhLmxhYmVsICsgXCI6IFwiICsgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgYnVtcFRyYW5zbGF0aW9uTGlzdChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9wZW5TdHVkaW9FZGl0Rm9ybShkaXNwYXRjaCwgc2l0ZUlkLCB0YXJnZXRQYXRoLCBhdXRob3JpbmdCYXNlIHx8IGdldEF1dGhvcmluZ0Jhc2UoKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIFwiVHJhbnNsYXRlIGZhaWxlZC5cIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZXRSb3dUcmFuc2xhdGVCdXN5UGF0aChcIlwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcGF0aExheW91dE5vdGUgPVxuICAgICAgIXJvb3REaXIgfHwgc3VmZml4ID09IG51bGxcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCBtYXJnaW5Ub3A6IFwiNHB4XCIsIG1heFdpZHRoOiBcIjUyMHB4XCIsIGxpbmVIZWlnaHQ6IDEuNDUgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiVHJhbnNsYXRpb24gbG9jYWxlIHNob3J0Y3V0cyB3b3JrIGJlc3Qgd2hlbiB0aGlzIGl0ZW0gbGl2ZXMgdW5kZXIgYSBwYXRoIGxpa2UgXCIsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9zaXRlL+KApi93ZWJzaXRlL3tsb2NhbGV9L+KAplwiKSxcbiAgICAgICAgICAgIFwiIG9yIFwiLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvc2l0ZS/igKYvY29tcG9uZW50cy97bG9jYWxlfS/igKZcIiksXG4gICAgICAgICAgICBcIi4gUmVsYXRlZCB0cmFuc2xhdGlvbnMgbWF5IHN0aWxsIGFwcGVhciBmcm9tIHRoZSBzZWFyY2ggaW5kZXggYWJvdmUuXCJcbiAgICAgICAgICApXG4gICAgICAgIDogbnVsbDtcblxuICAgIHZhciBzb3J0ZWRQYXRocyA9IHNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheShcbiAgICAgIHRyYW5zbGF0aW9uUGF0aHMsXG4gICAgICByZXNvbHZlZFNvdXJjZUtleSxcbiAgICAgIHRyYW5zbGF0aW9uQ2ZnICYmIHRyYW5zbGF0aW9uQ2ZnLmNvZGVzXG4gICAgKTtcbiAgICB2YXIgZmlsdGVyZWRQYXRocyA9IGZpbHRlclRyYW5zbGF0aW9uUGF0aHMoc29ydGVkUGF0aHMsIGZpbHRlclF1ZXJ5KTtcbiAgICAvKiogTGlzdCByb3dzIG9ubHkgZm9yIGxvY2FsZXMgdGhhdCBoYXZlIGNvbnRlbnQgKG9yIHRoaXMgZm9ybSk7IG1pc3NpbmcgbG9jYWxlcyBhcHBlYXIgdW5kZXIgVHJhbnNsYXRlIG9ubHkuICovXG4gICAgdmFyIHRyYW5zbGF0ZWRPbmx5UGF0aHMgPSBmaWx0ZXJlZFBhdGhzLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgICAgaWYgKCFwKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAocCA9PT0gZm9ybVBhdGgpIHJldHVybiB0cnVlO1xuICAgICAgdmFyIGV4ID0gZXhpc3RzQnlQYXRoW3BdO1xuICAgICAgaWYgKGV4ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgdmFyIGFjdGl2ZUxvY2FsZU1ldGEgPSAodHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcubWV0YSkgfHwgTE9DQUxFX01FVEE7XG4gICAgdmFyIHRvdGFsRmlsdGVyZWQgPSB0cmFuc2xhdGVkT25seVBhdGhzLmxlbmd0aDtcbiAgICB2YXIgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbEZpbHRlcmVkIC8gVFJBTlNMQVRJT05TX1BBR0VfU0laRSkpO1xuICAgIHZhciBzYWZlUGFnZSA9IE1hdGgubWluKHBhZ2VJbmRleCwgdG90YWxQYWdlcyAtIDEpO1xuICAgIHZhciBwYWdlU3RhcnQgPSBzYWZlUGFnZSAqIFRSQU5TTEFUSU9OU19QQUdFX1NJWkU7XG4gICAgdmFyIHBhZ2VTbGljZSA9IHRyYW5zbGF0ZWRPbmx5UGF0aHMuc2xpY2UocGFnZVN0YXJ0LCBwYWdlU3RhcnQgKyBUUkFOU0xBVElPTlNfUEFHRV9TSVpFKTtcbiAgICB2YXIgcmFuZ2VGcm9tID0gdG90YWxGaWx0ZXJlZCA9PT0gMCA/IDAgOiBwYWdlU3RhcnQgKyAxO1xuICAgIHZhciByYW5nZVRvID0gTWF0aC5taW4ocGFnZVN0YXJ0ICsgVFJBTlNMQVRJT05TX1BBR0VfU0laRSwgdG90YWxGaWx0ZXJlZCk7XG5cbiAgICB2YXIgZmlsdGVyVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGdhcDogXCIxMHB4XCIsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjhweFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBpbnB1dC1zbVwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJGaWx0ZXIgYnkgbGFuZ3VhZ2UsIGNvZGUsIG9yIHBhdGhcXHUyMDI2XCIsXG4gICAgICAgIHZhbHVlOiBmaWx0ZXJRdWVyeSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2V0RmlsdGVyUXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIG1heFdpZHRoOiBcIjI4MHB4XCIsXG4gICAgICAgICAgZmxleDogXCIxIDEgMTgwcHhcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LWlucHV0LWJnKVwiLFxuICAgICAgICAgIGNvbG9yOiBcInZhcigtLXR2LWlucHV0LXRleHQpXCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCB2YXIoLS10di1ib3JkZXItaW5wdXQpXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiRmlsdGVyIHRyYW5zbGF0aW9uc1wiXG4gICAgICB9KSxcbiAgICAgIHRvdGFsRmlsdGVyZWQgPiAwXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIHdoaXRlU3BhY2U6IFwibm93cmFwXCIsIGNvbG9yOiBcInZhcigtLXR2LXRleHQtbXV0ZWQpXCIgfSB9LFxuICAgICAgICAgICAgXCJTaG93aW5nIFwiLFxuICAgICAgICAgICAgcmFuZ2VGcm9tLFxuICAgICAgICAgICAgXCJcXHUyMDEzXCIsXG4gICAgICAgICAgICByYW5nZVRvLFxuICAgICAgICAgICAgXCIgb2YgXCIsXG4gICAgICAgICAgICB0b3RhbEZpbHRlcmVkXG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGxcbiAgICApO1xuXG4gICAgdmFyIHBhZ2luYXRpb25CYXIgPVxuICAgICAgdG90YWxGaWx0ZXJlZCA+IFRSQU5TTEFUSU9OU19QQUdFX1NJWkVcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIGdhcDogXCI4cHhcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWlnb29kaWVzLXR2LXBhZ2VyLWJ0blwiLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBzYWZlUGFnZSA8PSAwLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFBhZ2VJbmRleChNYXRoLm1heCgwLCBzYWZlUGFnZSAtIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiUHJldmlvdXNcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEycHhcIiwgY29sb3I6IFwidmFyKC0tdHYtdGV4dC1tdXRlZClcIiB9IH0sXG4gICAgICAgICAgICAgIFwiUGFnZSBcIixcbiAgICAgICAgICAgICAgc2FmZVBhZ2UgKyAxLFxuICAgICAgICAgICAgICBcIiAvIFwiLFxuICAgICAgICAgICAgICB0b3RhbFBhZ2VzXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpZ29vZGllcy10di1wYWdlci1idG5cIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogc2FmZVBhZ2UgPj0gdG90YWxQYWdlcyAtIDEsXG4gICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgc2V0UGFnZUluZGV4KE1hdGgubWluKHRvdGFsUGFnZXMgLSAxLCBzYWZlUGFnZSArIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiTmV4dFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGw7XG5cbiAgICB2YXIgb25UcmFuc2xhdGlvblJvd0FjdGl2YXRlID0gZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgIGlmIChpbmZvICYmIGluZm8uaXNTb3VyY2UgJiYgIWluZm8uaXNDdXJyZW50Um93ICYmIGluZm8udGFyZ2V0UGF0aCkge1xuICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChmdW5jdGlvbiAocHJldikge1xuICAgICAgICAgIGlmIChwcmV2ICYmIG5vcm1hbGl6ZVN0dWRpb1BhdGgocHJldikgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgoaW5mby50YXJnZXRQYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpbmZvLnRhcmdldFBhdGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICB9O1xuXG4gICAgdmFyIGxpc3RTZWN0aW9uID1cbiAgICAgIGxvYWRpbmcgJiYgdHJhbnNsYXRpb25QYXRocy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWQgdWlnb29kaWVzLXR2LWJ1c3lcIixcbiAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBwYWRkaW5nOiBcIjhweCAwXCIsIGdhcDogXCIxMHB4XCIgfSxcbiAgICAgICAgICAgICAgcm9sZTogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgXCJhcmlhLWxpdmVcIjogXCJwb2xpdGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFNwaW5uZXJFbCh7IHNpemU6IDE2LCBsYWJlbDogXCJMb2FkaW5nIHRyYW5zbGF0aW9uc1wiIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJMb2FkaW5nIHRyYW5zbGF0aW9uc1xcdTIwMjZcIilcbiAgICAgICAgICApXG4gICAgICAgIDogdHJhbnNsYXRpb25QYXRocy5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI0cHggMCA4cHhcIiB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiTm8gdHJhbnNsYXRpb25zIGZvdW5kLlwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0eWxlOiB7IG9wYWNpdHk6IGxvYWRpbmcgPyAwLjU1IDogMSwgcG9zaXRpb246IFwicmVsYXRpdmVcIiwgcG9pbnRlckV2ZW50czogbG9hZGluZyA/IFwibm9uZVwiIDogdW5kZWZpbmVkIH0gfSxcbiAgICAgICAgICAgICAgbG9hZGluZyAmJiB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWlnb29kaWVzLXR2LWJ1c3lcIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwidmFyKC0tdHYtdGV4dC1zb2Z0KVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1idXN5LWNoaXAtYmcpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCA4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCJ2YXIoLS10di1zaGFkb3ctY2hpcClcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJzdGF0dXNcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBTcGlubmVyRWwoeyBzaXplOiAxMiwgbGFiZWw6IFwiUmVmcmVzaGluZyB0cmFuc2xhdGlvbnNcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJSZWZyZXNoaW5nXFx1MjAyNlwiKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgZmlsdGVyVG9vbGJhcixcbiAgICAgICAgICAgICAgcGFnZVNsaWNlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI2cHggMFwiLCBjb2xvcjogXCJ2YXIoLS10di10ZXh0LW11dGVkKVwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWxGaWx0ZXJlZCA9PT0gMCAmJiBmaWx0ZXJlZFBhdGhzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiTm8gdHJhbnNsYXRlZCBsb2NhbGVzIG1hdGNoIHlvdXIgZmlsdGVyICh1bnRyYW5zbGF0ZWQgbG9jYWxlcyBhcmUgaW4gVHJhbnNsYXRlIGJlbG93KS5cIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJObyB0cmFuc2xhdGlvbnMgbWF0Y2ggeW91ciBmaWx0ZXIuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHBhZ2VTbGljZS5tYXAoZnVuY3Rpb24gKHRhcmdldFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aCh0YXJnZXRQYXRoKSB8fCBcInVua25vd25cIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGEgPVxuICAgICAgICAgICAgICAgICAgICAgIG1ldGFGb3JQYXRoTG9jYWxlKGFjdGl2ZUxvY2FsZU1ldGEsIGxvYykgfHwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxvYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwiXFx1RDgzQ1xcdURGMTBcIlxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1NvdXJjZSA9XG4gICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RzID0gZXhpc3RzQnlQYXRoW3RhcmdldFBhdGhdICE9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ3VycmVudFJvdyA9XG4gICAgICAgICAgICAgICAgICAgICAgISFmb3JtUGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgICEhdGFyZ2V0UGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZVN0dWRpb1BhdGgoZm9ybVBhdGgpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKHRhcmdldFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUcmFuc2xhdGlvblZlcnNpb25Sb3csIHtcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IHRhcmdldFBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgbWV0YTogbWV0YSxcbiAgICAgICAgICAgICAgICAgICAgICBpc1NvdXJjZTogaXNTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgZXhpc3RzOiBleGlzdHMsXG4gICAgICAgICAgICAgICAgICAgICAgaXNPdXRkYXRlZDogISFzdGFsZUJ5UGF0aFt0YXJnZXRQYXRoXSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICBvblRyYW5zbGF0ZTogcnVuVHJhbnNsYXRlRm9yUm93LFxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUJ1c3k6XG4gICAgICAgICAgICAgICAgICAgICAgICAhIXJvd1RyYW5zbGF0ZUJ1c3lQYXRoICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVTdHVkaW9QYXRoKHJvd1RyYW5zbGF0ZUJ1c3lQYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aCh0YXJnZXRQYXRoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmb3JtUGF0aDogZm9ybVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgb25BY3RpdmF0ZTogb25UcmFuc2xhdGlvblJvd0FjdGl2YXRlLFxuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGFyZVNlbGVjdGVkOlxuICAgICAgICAgICAgICAgICAgICAgICAgISFjb21wYXJlU291cmNlUGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplU3R1ZGlvUGF0aChjb21wYXJlU291cmNlUGF0aCkgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZVRyYW5zbGF0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNTb3VyY2UgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc0N1cnJlbnRSb3cgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGFnZVRyYW5zbGF0aW9uUm93KHRhcmdldFBhdGgsIHJlc29sdmVkQ29udGVudFR5cGVJZCksXG4gICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVUcmFuc2xhdGlvbjogb3BlblJlbW92ZVRyYW5zbGF0aW9uTW9kYWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgcGFnaW5hdGlvbkJhclxuICAgICAgICAgICAgKTtcblxuICAgIHZhciBhdXRob3JpbmdCYXNlUmVzb2x2ZWQgPSBhdXRob3JpbmdCYXNlIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcblxuICAgIHZhciBhZGRUcmFuc2xhdGlvbkJhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWRkVHJhbnNsYXRpb25Mb2NhbGVCYXIsIHtcbiAgICAgIGZvcm1QYXRoOiBmb3JtUGF0aCxcbiAgICAgIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoOiB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCxcbiAgICAgIHNpdGVJZDogc2l0ZUlkLFxuICAgICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgICAgYXV0aG9yaW5nQmFzZTogYXV0aG9yaW5nQmFzZVJlc29sdmVkLFxuICAgICAgcm9vdERpcjogcm9vdERpcixcbiAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgZXhpc3RpbmdQYXRoczogdHJhbnNsYXRpb25QYXRocyxcbiAgICAgIG9uVHJhbnNsYXRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBidW1wVHJhbnNsYXRpb25MaXN0KGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBsb2NhbGVDb2RlczogdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMsXG4gICAgICBsb2NhbGVNZXRhOiB0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5tZXRhLFxuICAgICAgdHJhbnNsYXRpb25DZmc6IHRyYW5zbGF0aW9uQ2ZnXG4gICAgfSk7XG5cbiAgICB2YXIgY29tcGFyZUxheW91dEJvZHkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtaW5XaWR0aDogMCB9IH0sXG4gICAgICBsaXN0U2VjdGlvbixcbiAgICAgIGFkZFRyYW5zbGF0aW9uQmFyXG4gICAgKTtcblxuICAgIHZhciByZW1vdmVUcmFuc2xhdGlvbk1vZGFsRWwgPSBudWxsO1xuICAgIGlmIChyZW1vdmVNb2RhbCkge1xuICAgICAgdmFyIHJtID0gcmVtb3ZlTW9kYWw7XG4gICAgICB2YXIgY2FuZGlkYXRlUm93cyA9XG4gICAgICAgICFybS5sb2FkaW5nICYmIHJtLmNhbmRpZGF0ZXMgJiYgcm0uY2FuZGlkYXRlcy5sZW5ndGhcbiAgICAgICAgICA/IHJtLmNhbmRpZGF0ZXMubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHZhciBwdGggPSBjLnBhdGg7XG4gICAgICAgICAgICAgIHZhciBjaGVja2VkID0gcm0uc2VsZWN0ZWRQYXRocyAmJiBybS5zZWxlY3RlZFBhdGhzW3B0aF07XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IHB0aCxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgdmFyKC0tdHYtYm9yZGVyLXNvZnQpXCIsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBybS5zdWJtaXR0aW5nID8gXCJkZWZhdWx0XCIgOiBcInBvaW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di1wYXBlci0yKVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgY2hlY2tlZDogISFjaGVja2VkLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVSZW1vdmVDYW5kaWRhdGUocHRoLCBlLnRhcmdldC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBzdHlsZTogeyBtYXJnaW5Ub3A6IFwiM3B4XCIsIGZsZXhTaHJpbms6IDAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBsaW5lSGVpZ2h0OiAxLjQsIHdvcmRCcmVhazogXCJicmVhay1hbGxcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcInN0cm9uZ1wiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiYmxvY2tcIiwgY29sb3I6IFwidmFyKC0tdHYtdGV4dClcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIChjLmludGVybmFsTmFtZSAmJiBTdHJpbmcoYy5pbnRlcm5hbE5hbWUpLnRyaW0oKSkgfHwgXCIobm8gaW50ZXJuYWwgbmFtZSlcIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCBjb2xvcjogXCJ2YXIoLS10di10ZXh0LWRpbSlcIiB9IH0sIHB0aClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogbnVsbDtcblxuICAgICAgcmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6IFwiZGlhbG9nXCIsXG4gICAgICAgICAgXCJhcmlhLW1vZGFsXCI6IFwidHJ1ZVwiLFxuICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwidHJhbnNsYXRpb24tcmVtb3ZlLXRyYW5zbGF0aW9uLXRpdGxlXCIsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgIHpJbmRleDogMTAwNTAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40NSlcIixcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgcGFkZGluZzogXCIxNnB4XCIsXG4gICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQgJiYgIXJtLnN1Ym1pdHRpbmcpIGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwidmFyKC0tdHYtbW9kYWwtYmcpXCIsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IFwiNTYwcHhcIixcbiAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IFwibWluKDg1dmgsIDY4MHB4KVwiLFxuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgYm94U2hhZG93OiBcIjAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjIyKVwiLFxuICAgICAgICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTRweCAxOHB4XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiBcIjFweCBzb2xpZCB2YXIoLS10di1tb2RhbC1ib3JkZXIpXCIsXG4gICAgICAgICAgICAgICAgZmxleFNocmluazogMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJoNFwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHJhbnNsYXRpb24tcmVtb3ZlLXRyYW5zbGF0aW9uLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHsgbWFyZ2luOiAwLCBmb250U2l6ZTogXCIxNnB4XCIsIGZvbnRXZWlnaHQ6IDYwMCB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiUmVtb3ZlIHRyYW5zbGF0aW9uXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEycHhcIiwgbWFyZ2luVG9wOiBcIjZweFwiLCBsaW5lSGVpZ2h0OiAxLjQ1IH0gfSxcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcm0ubWV0YUxhYmVsKSxcbiAgICAgICAgICAgICAgXCIg4oCUIFwiLFxuICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjExcHhcIiB9IH0sIHJtLnBhZ2VQYXRoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0eWxlOiB7IHBhZGRpbmc6IFwiMTJweCAxOHB4XCIsIG92ZXJmbG93WTogXCJhdXRvXCIsIGZsZXg6IFwiMSAxIGF1dG9cIiwgbWluSGVpZ2h0OiAwIH0gfSxcbiAgICAgICAgICAgIHJtLmxvYWRpbmdcbiAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWQgdWlnb29kaWVzLXR2LWJ1c3lcIixcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBwYWRkaW5nOiBcIjhweCAwXCIsIGdhcDogXCIxMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJzdGF0dXNcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFNwaW5uZXJFbCh7IHNpemU6IDE2LCBsYWJlbDogXCJGaW5kaW5nIGNvbXBvbmVudHNcIiB9KSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBcIkZpbmRpbmcgbG9jYWxlLXNwZWNpZmljIGNvbXBvbmVudHMgb25seSB1c2VkIGJ5IHRoaXMgcGFnZVxcdTIwMjZcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgcm0uZXJyb3JcbiAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImFsZXJ0IGFsZXJ0LWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIHBhZGRpbmc6IFwiOHB4IDEycHhcIiwgbWFyZ2luQm90dG9tOiBcIjEwcHhcIiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgcm0uZXJyb3JcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICFybS5sb2FkaW5nICYmICFybS5lcnJvciAmJiAoIXJtLmNhbmRpZGF0ZXMgfHwgIXJtLmNhbmRpZGF0ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcInBcIixcbiAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIiwgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBtYXJnaW46IFwiOHB4IDAgMTJweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIFwiTm8gc2hhcmVkIGNvbXBvbmVudHMgaW4gdGhpcyBsb2NhbGUgd2VyZSBmb3VuZCB0aGF0IGFyZSBzYWZlIHRvIGRlbGV0ZSBhdXRvbWF0aWNhbGx5ICh0aGV5IG1heSBiZSByZWZlcmVuY2VkIGVsc2V3aGVyZSkuIFRoZSB0cmFuc2xhdGVkIHBhZ2UgY2FuIHN0aWxsIGJlIHJlbW92ZWQgYmVsb3cuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICFybS5sb2FkaW5nICYmIHJtLmNhbmRpZGF0ZXMgJiYgcm0uY2FuZGlkYXRlcy5sZW5ndGhcbiAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgbWFyZ2luQm90dG9tOiBcIjEwcHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206IFwiNnB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBcIkFsc28gZGVsZXRlIHRoZXNlIGxvY2FsZSBjb21wb25lbnRzIChubyBvdGhlciBwYWdlIHJlZmVyZW5jZXMpXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiZmxleFwiLCBnYXA6IFwiOHB4XCIsIGZsZXhXcmFwOiBcIndyYXBcIiwgbWFyZ2luQm90dG9tOiBcIjhweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWxsUmVtb3ZlQ2FuZGlkYXRlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiU2VsZWN0IGFsbFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGVmYXVsdCBidG4teHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIXJtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFsbFJlbW92ZUNhbmRpZGF0ZXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJTZWxlY3Qgbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBjYW5kaWRhdGVSb3dzXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInBcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogXCJ2YXIoLS10di13YXJuLWZnKVwiLFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS10di13YXJuLWJnKVwiLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCB2YXIoLS10di13YXJuLWJkKVwiLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTBweFwiLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJUaGUgdHJhbnNsYXRlZCBwYWdlIHdpbGwgYmUgZGVsZXRlZCBhZnRlciB0aGUgc2VsZWN0ZWQgY29tcG9uZW50cy4gVGhpcyBjYW5ub3QgYmUgdW5kb25lLlwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEycHggMThweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlclRvcDogXCIxcHggc29saWQgdmFyKC0tdHYtbW9kYWwtYm9yZGVyKVwiLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImZsZXgtZW5kXCIsXG4gICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgIGZsZXhTaHJpbms6IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBjbG9zZVJlbW92ZVRyYW5zbGF0aW9uTW9kYWxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJDYW5jZWxcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRhbmdlciBidG4tc21cIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFybS5sb2FkaW5nIHx8ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBjb25maXJtUmVtb3ZlVHJhbnNsYXRpb25cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcm0uc3VibWl0dGluZyA/IFwiUmVtb3ZpbmdcXHUyMDI2XCIgOiBcIlJlbW92ZSB0cmFuc2xhdGlvblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3NOYW1lOiBcImNzdHVkaW8tZm9ybS1jb250cm9sLWlucHV0LWNvbnRhaW5lciB0cmFuc2xhdGlvbi12ZXJzaW9ucy1jb250cm9sXCIgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJzdHJldGNoXCIsXG4gICAgICAgICAgICBnYXA6IHdpZGdldENvbGxhcHNlZCA/IFwiMFwiIDogXCIyMHB4XCIsXG4gICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCB2YXIoLS10di1ib3JkZXIpXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNnB4XCIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LWJnKVwiLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRyYW5zbGF0aW9uLXZlcnNpb25zLWNvbGxhcHNlLXRvZ2dsZVwiLFxuICAgICAgICAgICAgb25DbGljazogdG9nZ2xlV2lkZ2V0Q29sbGFwc2VkLFxuICAgICAgICAgICAgXCJhcmlhLWV4cGFuZGVkXCI6IHdpZGdldENvbGxhcHNlZCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IFwidHJhbnNsYXRpb24tdmVyc2lvbnMtcGFuZWwtYm9keVwiLFxuICAgICAgICAgICAgdGl0bGU6IHdpZGdldENvbGxhcHNlZCA/IFwiRXhwYW5kIFRyYW5zbGF0aW9uc1wiIDogXCJDb2xsYXBzZSBUcmFuc2xhdGlvbnNcIixcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgcGFkZGluZzogXCIxMHB4IDEycHhcIixcbiAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiB3aWRnZXRDb2xsYXBzZWQgPyBcIm5vbmVcIiA6IFwiMXB4IHNvbGlkIHZhcigtLXR2LWJvcmRlci1zb2Z0KVwiLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLXR2LWhlYWRlcilcIixcbiAgICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxOHB4XCIsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcInZhcigtLXR2LXRleHQtbXV0ZWQpXCIsXG4gICAgICAgICAgICAgICAgZmxleDogXCIwIDAgYXV0b1wiLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogd2lkZ2V0Q29sbGFwc2VkID8gXCJyb3RhdGUoLTkwZGVnKVwiIDogXCJyb3RhdGUoMGRlZylcIixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcInRyYW5zZm9ybSAwLjE1cyBlYXNlXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiXFx1MjVCQ1wiXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZmxleDogXCIxIDEgYXV0b1wiLFxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwidmFyKC0tdHYtdGV4dClcIixcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIi0wLjAxZW1cIixcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiVHJhbnNsYXRpb25zXCJcbiAgICAgICAgICApLFxuICAgICAgICAgIHdpZGdldENvbGxhcHNlZCAmJiB0b3RhbEZpbHRlcmVkID4gMFxuICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIHdoaXRlU3BhY2U6IFwibm93cmFwXCIsIGZsZXg6IFwiMCAwIGF1dG9cIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b3RhbEZpbHRlcmVkICsgKHRvdGFsRmlsdGVyZWQgPT09IDEgPyBcIiBsb2NhbGVcIiA6IFwiIGxvY2FsZXNcIilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTFweFwiLCB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLCBmbGV4OiBcIjAgMCBhdXRvXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdpZGdldENvbGxhcHNlZCA/IFwiU2hvd1wiIDogXCJIaWRlXCJcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHdpZGdldENvbGxhcHNlZFxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRyYW5zbGF0aW9uLXZlcnNpb25zLXBhbmVsLWJvZHlcIixcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJzdHJldGNoXCIsXG4gICAgICAgICAgICAgICAgICBnYXA6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTJweFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwYXRoTGF5b3V0Tm90ZVxuICAgICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBwYXRoTGF5b3V0Tm90ZSlcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiwgbWluV2lkdGg6IDAgfSB9LFxuICAgICAgICAgICAgICAgIGNvbXBhcmVMYXlvdXRCb2R5XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICksXG4gICAgICByZW1vdmVUcmFuc2xhdGlvbk1vZGFsRWxcbiAgICApO1xuICB9XG5cbiAgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRyYW5zbGF0aW9uVmVyc2lvbnMgPVxuICAgIENTdHVkaW9Gb3Jtcy5Db250cm9scy5UcmFuc2xhdGlvblZlcnNpb25zIHx8XG4gICAgZnVuY3Rpb24gKGlkLCBmb3JtLCBvd25lciwgcHJvcGVydGllcywgY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJGaWVsZCh0aGlzKTtcbiAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgICAgdGhpcy5jb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzO1xuICAgICAgdGhpcy5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy52YWx1ZSA9IFwiX25vdC1zZXRcIjtcbiAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLnN1cHBvcnRlZFBvc3RGaXhlcyA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICBZQUhPTy5leHRlbmQoQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRyYW5zbGF0aW9uVmVyc2lvbnMsIENTdHVkaW9Gb3Jtcy5DU3R1ZGlvRm9ybUZpZWxkLCB7XG4gICAgLyoqIFNob3duIGluIHRoZSBDb250ZW50IFR5cGVzIGJ1aWxkZXIgY29udHJvbCBwYWxldHRlIChkcmFnLWFuZC1kcm9wIGxpc3QpLiAqL1xuICAgIGdldExhYmVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gXCJUcmFuc2xhdGlvbiB2ZXJzaW9ucyAoVHJhbnNsYXRpb24pXCI7XG4gICAgfSxcbiAgICBfcmVuZGVyOiBmdW5jdGlvbiAoc2VsZikge1xuICAgICAgdmFyIGNtcyA9IENyYWZ0ZXJDTVNOZXh0O1xuICAgICAgdmFyIHNpdGUgPVxuICAgICAgICAodHlwZW9mIENTdHVkaW9BdXRob3JpbmdDb250ZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIENTdHVkaW9BdXRob3JpbmdDb250ZXh0LnNpdGUpIHx8XG4gICAgICAgIChzZWxmLmZvcm0gJiYgc2VsZi5mb3JtLnNpdGUpIHx8XG4gICAgICAgIFwiXCI7XG4gICAgICB2YXIgaW50ZXJuYWxOYW1lID1cbiAgICAgICAgKHNlbGYuZm9ybS5tb2RlbCAmJiAoc2VsZi5mb3JtLm1vZGVsW1wiaW50ZXJuYWwtbmFtZVwiXSB8fCBzZWxmLmZvcm0ubW9kZWwuaW50ZXJuYWxOYW1lKSkgfHwgXCJcIjtcbiAgICAgIHZhciBjb250ZW50VHlwZUlkID1cbiAgICAgICAgKHNlbGYuZm9ybS5tb2RlbCAmJiAoc2VsZi5mb3JtLm1vZGVsW1wiY29udGVudC10eXBlXCJdIHx8IHNlbGYuZm9ybS5tb2RlbC5jb250ZW50VHlwZSkpIHx8IFwiXCI7XG4gICAgICB2YXIgcGFuZWxQcm9wcyA9IHtcbiAgICAgICAgZm9ybVBhdGg6IHNlbGYuZm9ybS5wYXRoLFxuICAgICAgICBzaXRlSWQ6IHNpdGUsXG4gICAgICAgIG1vZGVsOiBzZWxmLmZvcm0ubW9kZWwsXG4gICAgICAgIGludGVybmFsTmFtZTogaW50ZXJuYWxOYW1lLFxuICAgICAgICBjb250ZW50VHlwZUlkOiBjb250ZW50VHlwZUlkLFxuICAgICAgICBmb3JtOiBzZWxmLmZvcm0sXG4gICAgICAgIGNvbnRyb2xDb250YWluZXJFbDogc2VsZi5jb250YWluZXJFbFxuICAgICAgfTtcbiAgICAgIGlmIChzZWxmLl9jbXNSZW5kZXJIYW5kbGUgJiYgc2VsZi5fY21zUmVuZGVySGFuZGxlLnVubW91bnQpIHtcbiAgICAgICAgc2VsZi5fY21zUmVuZGVySGFuZGxlLnVubW91bnQoeyByZW1vdmVDb250YWluZXI6IGZhbHNlIH0pO1xuICAgICAgICBzZWxmLl9jbXNSZW5kZXJIYW5kbGUgPSBudWxsO1xuICAgICAgfVxuICAgICAgY21zXG4gICAgICAgIC5yZW5kZXIoXG4gICAgICAgICAgc2VsZi5jb250YWluZXJFbCxcbiAgICAgICAgICBmdW5jdGlvbiBUcmFuc2xhdGlvblZlcnNpb25zQnJpZGdlKHByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUcmFuc2xhdGlvblZlcnNpb25zUGFuZWwsIHByb3BzKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhbmVsUHJvcHNcbiAgICAgICAgKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgc2VsZi5fY21zUmVuZGVySGFuZGxlID0gaGFuZGxlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbdHJhbnNsYXRpb24tdmVyc2lvbnNdIEZhaWxlZCB0byByZW5kZXIgY29udHJvbFwiLCBlcnIpO1xuICAgICAgICAgIHNlbGYuY29udGFpbmVyRWwuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiIHN0eWxlPVwibWFyZ2luOjhweCAwXCI+VHJhbnNsYXRpb24gY29udHJvbCBjb3VsZCBub3QgbG9hZC4gUmVmcmVzaCBTdHVkaW8gYW5kIGNoZWNrIHRoZSBicm93c2VyIGNvbnNvbGUuPC9kaXY+JztcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChjb25maWcsIGNvbnRhaW5lckVsKSB7XG4gICAgICBjb250YWluZXJFbC5pZCA9IHRoaXMuaWQ7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsID0gY29udGFpbmVyRWw7XG4gICAgICB0aGlzLl9yZW5kZXIodGhpcyk7XG4gICAgfSxcbiAgICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXJFbCkge1xuICAgICAgICB0aGlzLl9yZW5kZXIodGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfSxcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfSxcbiAgICBnZXROYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGlvbi12ZXJzaW9uc1wiO1xuICAgIH0sXG4gICAgZ2V0U3VwcG9ydGVkUHJvcGVydGllczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZFBvc3RGaXhlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3VwcG9ydGVkUG9zdEZpeGVzO1xuICAgIH1cbiAgfSk7XG5cbiAgQ1N0dWRpb0F1dGhvcmluZy5Nb2R1bGUubW9kdWxlTG9hZGVkKFwidHJhbnNsYXRpb24tdmVyc2lvbnNcIiwgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRyYW5zbGF0aW9uVmVyc2lvbnMpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIENyYWZ0ZXJDTVNOZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIENyYWZ0ZXJDTVNOZXh0LlJlYWN0KSB7XG4gICAgYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkNyYWZ0ZXJDTVMuQ29kZWJhc2VCcmlkZ2VSZWFkeVwiLCBib290VHJhbnNsYXRpb25WZXJzaW9uc0NvbnRyb2wsIHsgb25jZTogdHJ1ZSB9KTtcbiAgfVxufSkoKTtcbiJdLCJuYW1lcyI6WyJib290VHJhbnNsYXRpb25WZXJzaW9uc0NvbnRyb2wiLCJSZWFjdCIsIkNyYWZ0ZXJDTVNOZXh0IiwiU1BJTk5FUl9TVFlMRV9JRCIsImVuc3VyZVNwaW5uZXJTdHlsZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJ0ZXh0Q29udGVudCIsImVuY29kZVVSSUNvbXBvbmVudCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIlNwaW5uZXJFbCIsIm9wdHMiLCJjbGFzc05hbWUiLCJsaWdodCIsInJvbGUiLCJsYWJlbCIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlcldpZHRoIiwiTWF0aCIsIm1heCIsInJvdW5kIiwidW5kZWZpbmVkIiwiQnVzeUxhYmVsIiwidGV4dCIsIlJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTIiwid2Vic2l0ZSIsImNvbXBvbmVudHMiLCJ0ZW1wbGF0ZXMiLCJzY3JpcHRzIiwiY29uZmlnIiwiTVVMVElfTE9DQUxFX0NPREVTIiwiTE9DQUxFX01FVEEiLCJmbGFnIiwiZmluZEZvcm1GaWVsZHNDb21wYXJlSG9zdCIsImZvcm0iLCJjb250cm9sQ29udGFpbmVyRWwiLCJzZWN0aW9ucyIsImNvbnRhaW5lckVsIiwic2VjIiwiY2xvc2VzdCIsInBnIiwiaWNlIiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwicGcyIiwiaWNlMiIsImUyIiwidW53cmFwRm9ybUNvbXBhcmVMYXlvdXQiLCJob3N0IiwiZGF0YXNldCIsInRyYW5zbGF0aW9uQ29tcGFyZVdyYXBwZWQiLCJyb3ciLCJmaXJzdEVsZW1lbnRDaGlsZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibWFpbiIsInF1ZXJ5U2VsZWN0b3IiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJlMyIsIlNNQVJUQ09QWV9DT01QQVJFX1dJRFRIX0xTIiwiVFJBTlNMQVRJT05fV0lER0VUX0NPTExBUFNFX0xTX1BSRUZJWCIsIlRSQU5TTEFUSU9OX1dJREdFVF9DT0xMQVBTRV9FVkVOVCIsInRyYW5zbGF0aW9uV2lkZ2V0Q29sbGFwc2VTdG9yYWdlS2V5Iiwic2l0ZUlkIiwiU3RyaW5nIiwidHJpbSIsInJlYWRUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJlIiwid3JpdGVUcmFuc2xhdGlvbldpZGdldENvbGxhcHNlZCIsImNvbGxhcHNlZCIsInNldEl0ZW0iLCJlTHMiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJlRXYiLCJhcHBseVNvdXJjZVBhbmVXaWR0aFB4IiwibGVmdEVsIiwidG90YWxSb3dXaWR0aFB4Iiwid2lkdGhQeCIsIm1pblciLCJtYXhXIiwidyIsIm1pbiIsImZsZXgiLCJtYXhXaWR0aCIsInJlYWRJbml0aWFsU291cmNlUGFuZVdpZHRoUHgiLCJob3N0V2lkdGhQeCIsIm1heEFsbG93ZWQiLCJzIiwibiIsInBhcnNlSW50IiwiaXNOYU4iLCJlMCIsImZsb29yIiwiYXR0YWNoU21hcnRjb3B5Q29tcGFyZVNwbGl0dGVyIiwic3BsaXR0ZXIiLCJzZXRBdHRyaWJ1dGUiLCJ0YWJJbmRleCIsImNzc1RleHQiLCJhZGRFdmVudExpc3RlbmVyIiwicG9pbnRlclR5cGUiLCJidXR0b24iLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0WCIsImNsaWVudFgiLCJzdGFydFciLCJvZmZzZXRXaWR0aCIsImdldE1heFciLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzZXRQb2ludGVyQ2FwdHVyZSIsInBvaW50ZXJJZCIsImNhcCIsIm9uTW92ZSIsImV2IiwiZHgiLCJudyIsIm9uVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVsZWFzZVBvaW50ZXJDYXB0dXJlIiwicmVsIiwibHMiLCJ3cmFwRm9ybUNvbXBhcmVMYXlvdXQiLCJpZnJhbWVTcmMiLCJwYXRoTGFiZWwiLCJleGlzdGluZ0lmcmFtZSIsInNyYyIsImNvZGVFbCIsImhvc3RXIiwiaW5uZXJXaWR0aCIsImxlZnQiLCJoZWFkZXIiLCJ0aXRsZUJsb2NrIiwibWluV2lkdGgiLCJzdHJvbmciLCJzdWIiLCJjb2RlIiwiY2xvc2VCdG4iLCJ0eXBlIiwiZTQiLCJpZnJhbWUiLCJ0aXRsZSIsImU1IiwiZ2V0TG9jYWxlTGlzdCIsImdldExvY2FsZUZyb21QYXRoIiwicGF0aCIsInBhcnRzIiwicmVwbGFjZSIsInNwbGl0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxlbmd0aCIsImxpc3QiLCJmaXJzdCIsInRvTG93ZXJDYXNlIiwiY2FuZGlkYXRlIiwiaW5kZXhPZiIsInRlc3QiLCJsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUiLCJhIiwiYiIsImMiLCJzdGFydHNXaXRoIiwibWV0YUZvclBhdGhMb2NhbGUiLCJhY3RpdmVNZXRhIiwibG9jIiwibGsiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJ0cmFuc2xhdGlvbkxvY2FsZUFscmVhZHlQcmVzZW50IiwidHJhbnNsYXRlZExvY2FsZXMiLCJzZWciLCJub3JtYWxpemVTdHVkaW9QYXRoIiwicCIsImdldE11bHRpTG9jYWxlUm9vdERpciIsImZ1bGxQYXRoIiwibSIsIm1hdGNoIiwicGF0aEZvclRhcmdldExvY2FsZSIsInJvb3REaXIiLCJsb2NhbGUiLCJzdWZmaXgiLCJyIiwic3VmIiwicGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgiLCJmb3JtUGF0aCIsImZwIiwicmwiLCJmbCIsInJlc3QiLCJzbGljZSIsImNoYXJBdCIsInN1ZmZpeFBhcnRzIiwiam9pbiIsImZpcnN0TG9jYWxlU2VnbWVudFVuZGVyUm9vdCIsImV4aXN0aW5nVHJhbnNsYXRpb25Mb2NhbGVLZXlzIiwicGF0aHMiLCJrZXlzIiwiYWRkIiwiayIsImZvckVhY2giLCJyZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UiLCJwcmVmIiwiZ2V0QXV0aG9yaW5nQmFzZSIsImdldFN0dWRpb0FwaUJhc2UiLCJjbXMiLCJjcmFmdGVyY21zIiwiZ2V0U3RvcmUiLCJzdG9yZSIsImdldFN0YXRlIiwiZW52IiwiYXV0aG9yaW5nQmFzZSIsIkNTdHVkaW9BdXRob3JpbmdDb250ZXh0IiwiYmFzZVVyaSIsImdldENyYWZ0ZXJTdHVkaW9BamF4IiwidXRpbHMiLCJhamF4IiwibWVyZ2VGZXRjaEhlYWRlcnMiLCJleHRyYSIsIm91dCIsImFzc2lnbiIsImdldEdsb2JhbEhlYWRlcnMiLCJjb29raWUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ1bndyYXBBamF4UmVzcG9uc2UiLCJyZXMiLCJyZXNwb25zZSIsInN0dWRpb0FqYXhHZXQiLCJ1cmwiLCJnZXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1YnNjcmliZSIsIm5leHQiLCJlcnJvciIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiQWNjZXB0IiwidGhlbiIsImpzb24iLCJzdGF0dXMiLCJzdHVkaW9BamF4UG9zdCIsImJvZHkiLCJwYXlsb2FkIiwiX3R5cGVvZiIsIkpTT04iLCJzdHJpbmdpZnkiLCJoIiwicG9zdCIsIm1ldGhvZCIsInVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkiLCJyZXN1bHQiLCJvayIsImZldGNoVHJhbnNsYXRpb25SZW1vdmVDYW5kaWRhdGVzIiwic3R1ZGlvQmFzZSIsInBhZ2VQYXRoIiwibWVzc2FnZSIsImNhbmRpZGF0ZXMiLCJwb3N0VHJhbnNsYXRpb25SZW1vdmUiLCJjb21wb25lbnRQYXRocyIsImRlbGV0ZVBhZ2UiLCJkZWxldGVkIiwiZmFpbGVkIiwiaXNQYWdlVHJhbnNsYXRpb25Sb3ciLCJ0YXJnZXRQYXRoIiwiY29udGVudFR5cGVJZCIsImN0IiwiZW5kc1dpdGgiLCJmbGFnRm9yTG9jYWxlQ29kZSIsImxvY2FsZUNvZGUiLCJtYXAiLCJlbiIsImVzIiwiZGUiLCJ6aCIsImNuIiwiamEiLCJmciIsIml0IiwicHQiLCJrbyIsImFyIiwiZmV0Y2hUcmFuc2xhdGlvbkxvY2FsZXMiLCJvdmVycmlkZXMiLCJvIiwicXMiLCJwdXNoIiwidiIsImNvZGVzIiwibWV0YSIsIkFycmF5IiwiaXNBcnJheSIsImxhbmd1YWdlcyIsImxjIiwiY2ZnIiwiYmFzZUxvY2FsZSIsImJhc2VMYW5ndWFnZSIsImxvY2FsZXMiLCJUUkFOU0xBVElPTlNfUEFHRV9TSVpFIiwibG9jYWxlTGFiZWxGb3JQYXRoIiwic29ydFRyYW5zbGF0aW9uUGF0aHNGb3JEaXNwbGF5Iiwic291cmNlTG9jYWxlS2V5Iiwib3JkZXJlZExvY2FsZUNvZGVzIiwib3JkZXIiLCJvcmRlckluZGV4IiwiaSIsImNvbmZpZ1JhbmsiLCJjaGFyQ29kZUF0IiwiYXJyIiwiaXNTb3VyY2VQYXRoIiwic29ydCIsImFzIiwiYnMiLCJyYSIsInJiIiwibGEiLCJsYiIsImNtcCIsImxvY2FsZUNvbXBhcmUiLCJzZW5zaXRpdml0eSIsImZpbHRlclRyYW5zbGF0aW9uUGF0aHMiLCJxdWVyeSIsInEiLCJnZXREaXNwYXRjaCIsImRpc3BhdGNoIiwiYmluZCIsImJ1aWxkTGVnYWN5UmVhZG9ubHlGb3JtU3JjIiwiYmFzZSIsIm5vdGlmeURpc3BhdGNoIiwib3BlblN0dWRpb0VkaXRGb3JtIiwiYXV0aG9yaW5nQmFzZUZvckRpYWxvZyIsImFiIiwic2l0ZSIsImlzSGlkZGVuIiwib25TYXZlU3VjY2VzcyIsIm9uQ2FuY2VsIiwicmVzb2x2ZVRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIiwidHJhbnNsYXRpb25DZmciLCJ0cmFuc2xhdGlvblBhdGhzIiwicmVzb2x2ZWRTb3VyY2VLZXkiLCJmcm9tU291cmNlTG9jYWxlIiwiZmluZCIsInBhcmVudEZvbGRlclBhdGhGb3JDb3B5IiwibGFzdEluZGV4T2YiLCJjb3B5SXRlbVBhc3RlU3R1ZGlvIiwic291cmNlUGF0aCIsInRhcmdldFBhcmVudFBhdGgiLCJleHBlY3RlZFRhcmdldFBhdGgiLCJBZGRUcmFuc2xhdGlvbkxvY2FsZUJhciIsInByb3BzIiwidHJhbnNsYXRlQ29weVNvdXJjZVBhdGgiLCJleGlzdGluZ1BhdGhzIiwib25UcmFuc2xhdGVkIiwidHJhbnNsYXRpb25DZmdQcm9wIiwibG9jYWxlQ29kZXMiLCJsb2NhbGVNZXRhIiwib3B0U3QiLCJ1c2VTdGF0ZSIsIm9wdGlvbnMiLCJzZXRPcHRpb25zIiwic2VsU3QiLCJzZWxlY3RlZCIsInNldFNlbGVjdGVkIiwibG9hZFN0IiwibG9hZGluZyIsImJ1c3lTdCIsImNvcHlCdXN5Iiwic2V0Q29weUJ1c3kiLCJmb2N1c1NlbFN0Iiwic2VsZWN0Rm9jdXNlZCIsInNldFNlbGVjdEZvY3VzZWQiLCJsb2FkVGFyZ2V0cyIsInVzZUNhbGxiYWNrIiwiZWZmU3VmZml4IiwiYXBwbHlDb2RlcyIsInJhd0NvZGVzIiwic2VlbiIsImFjdGl2ZUNvZGVzIiwiZXhpc3RzIiwidXNlRWZmZWN0IiwicnVuVHJhbnNsYXRlIiwiY2hvaWNlIiwicGFyZW50IiwiY29udGVudEFwaUJhc2UiLCJlMSIsImVmZmVjdGl2ZU1pcnJvcmVkU3VmZml4IiwiaGludCIsInNlbGVjdERpc2FibGVkIiwic2VsZWN0U3R5bGUiLCJib3hTaXppbmciLCJtaW5IZWlnaHQiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nIiwicGFkZGluZ1JpZ2h0IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJvdXRsaW5lIiwiY3Vyc29yIiwib3BhY2l0eSIsImFwcGVhcmFuY2UiLCJXZWJraXRBcHBlYXJhbmNlIiwiTW96QXBwZWFyYW5jZSIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRSZXBlYXQiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsInRyYW5zaXRpb24iLCJhY3Rpb25zUm93U3R5bGUiLCJkaXNwbGF5IiwiZmxleFdyYXAiLCJnYXAiLCJhbGlnbkl0ZW1zIiwiYmFja2dyb3VuZCIsInNlbGVjdFdyYXBTdHlsZSIsImJ0bkljb25TdHlsZSIsImp1c3RpZnlDb250ZW50IiwiZmxleFNocmluayIsImJ0blByaW1hcnlTdHlsZSIsImZvbnRXZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiZGlzYWJsZWQiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0Iiwib25Gb2N1cyIsIm9uQmx1ciIsIm9uQ2xpY2siLCJQSUxMX1NUWUxFUyIsInRleHRUcmFuc2Zvcm0iLCJzb3VyY2UiLCJjdXJyZW50IiwiUk9XX1NVUkZBQ0UiLCJNRU5VX1RSSUdHRVJfU1RZTEUiLCJUUkFOU0xBVElPTl9JVEVNX01FTlVfTEFCRUxTIiwiZWRpdCIsInZpZXciLCJoaXN0b3J5IiwiZGVwZW5kZW5jaWVzIiwicHVibGlzaCIsImFwcHJvdmUiLCJwcmV2aWV3Iiwibm9ybWFsaXplTWVnYU1lbnVMYWJlbCIsImlzQWxsb3dlZE1lZ2FNZW51TGFiZWwiLCJoaWRlRWRpdCIsInR4dCIsImVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudSIsIm5vZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsInNjaGVkdWxlRW5mb3JjZUFsbG93ZWRJdGVtc0luTWVnYU1lbnUiLCJzZXRUaW1lb3V0IiwiVHJhbnNsYXRpb25WZXJzaW9uUm93IiwiaXNTb3VyY2UiLCJpc091dGRhdGVkIiwib25UcmFuc2xhdGUiLCJ0cmFuc2xhdGVCdXN5Iiwic2hvd1JlbW92ZVRyYW5zbGF0aW9uIiwib25SZW1vdmVUcmFuc2xhdGlvbiIsImlzQ3VycmVudFJvdyIsImlzQ29tcGFyZVNlbGVjdGVkIiwicm93Q2xpY2thYmxlIiwicm93U3R5bGUiLCJib3JkZXJDb2xvciIsInNob3dTdHVkaW9JdGVtTWVnYU1lbnUiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsInRvcCIsImNsaWVudFkiLCJhbmNob3JSZWZlcmVuY2UiLCJhbmNob3JQb3NpdGlvbiIsIm9uQWN0aXZhdGUiLCJvbktleURvd24iLCJtYXJnaW5MZWZ0Iiwid2hpdGVTcGFjZSIsIlRyYW5zbGF0aW9uVmVyc2lvbnNQYW5lbCIsIm1vZGVsIiwicmVzb2x2ZWRDb250ZW50VHlwZUlkIiwiY29udGVudFR5cGUiLCJzb3VyY2VMb2NhbGUiLCJzb3VyY2VMb2NhbGVDb2RlX3MiLCJtb2RlbExvY2FsZSIsImxvY2FsZUNvZGVfcyIsInBhdGhMb2NhbGUiLCJyZXNvbHZlZFNvdXJjZSIsImF1dGhvcmluZ0Jhc2VTdGF0ZSIsInNldEF1dGhvcmluZ0Jhc2UiLCJwYXRoc1N0YXRlIiwic2V0VHJhbnNsYXRpb25QYXRocyIsImxvYWRpbmdTdGF0ZSIsInNldExvYWRpbmciLCJmaWx0ZXJTdGF0ZSIsImZpbHRlclF1ZXJ5Iiwic2V0RmlsdGVyUXVlcnkiLCJwYWdlU3RhdGUiLCJwYWdlSW5kZXgiLCJzZXRQYWdlSW5kZXgiLCJsaXN0UmVmcmVzaFN0IiwidHJhbnNsYXRpb25MaXN0UmVmcmVzaEtleSIsImJ1bXBUcmFuc2xhdGlvbkxpc3QiLCJ0cmFuc2xhdGlvbkNmZ1N0Iiwic2V0VHJhbnNsYXRpb25DZmciLCJzdGFsZUJ5UGF0aFN0Iiwic3RhbGVCeVBhdGgiLCJzZXRTdGFsZUJ5UGF0aCIsImV4aXN0c0J5UGF0aFN0IiwiZXhpc3RzQnlQYXRoIiwic2V0RXhpc3RzQnlQYXRoIiwiY29tcGFyZVBhdGhTdCIsImNvbXBhcmVTb3VyY2VQYXRoIiwic2V0Q29tcGFyZVNvdXJjZVBhdGgiLCJyZW1vdmVNb2RhbFN0IiwicmVtb3ZlTW9kYWwiLCJzZXRSZW1vdmVNb2RhbCIsInJvd1RyYW5zbGF0ZUJ1c3lTdCIsInJvd1RyYW5zbGF0ZUJ1c3lQYXRoIiwic2V0Um93VHJhbnNsYXRlQnVzeVBhdGgiLCJjb2xsYXBzZWRTdCIsIndpZGdldENvbGxhcHNlZCIsInNldFdpZGdldENvbGxhcHNlZCIsIm9uU3RvcmFnZSIsIm5leHRDb2xsYXBzZWQiLCJuZXdWYWx1ZSIsIm9uQ3VzdG9tIiwidG9nZ2xlV2lkZ2V0Q29sbGFwc2VkIiwicHJldiIsImNhbmNlbGxlZCIsImxvY2FsZVNvdXJjZUlkIiwibG9jYWxlU291cmNlSWRfcyIsIm9iamVjdElkIiwic3RhbGUiLCJvbkNsb3NlQ29tcGFyZSIsImNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCIsIm9wZW5SZW1vdmVUcmFuc2xhdGlvbk1vZGFsIiwidHAiLCJtZXRhTGFiZWwiLCJzZWxlY3RlZFBhdGhzIiwic3VibWl0dGluZyIsInNiIiwic2VsIiwidG9nZ2xlUmVtb3ZlQ2FuZGlkYXRlIiwiY2hlY2tlZCIsIm5leHRTZWwiLCJzZXRBbGxSZW1vdmVDYW5kaWRhdGVzIiwiY29uZmlybVJlbW92ZVRyYW5zbGF0aW9uIiwiZGVsZXRlZFBhZ2UiLCJzb21lIiwibXNnIiwiZiIsInJ1blRyYW5zbGF0ZUZvclJvdyIsInBhdGhMYXlvdXROb3RlIiwic29ydGVkUGF0aHMiLCJmaWx0ZXJlZFBhdGhzIiwidHJhbnNsYXRlZE9ubHlQYXRocyIsImV4IiwiYWN0aXZlTG9jYWxlTWV0YSIsInRvdGFsRmlsdGVyZWQiLCJ0b3RhbFBhZ2VzIiwiY2VpbCIsInNhZmVQYWdlIiwicGFnZVN0YXJ0IiwicGFnZVNsaWNlIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImZpbHRlclRvb2xiYXIiLCJwbGFjZWhvbGRlciIsInBhZ2luYXRpb25CYXIiLCJvblRyYW5zbGF0aW9uUm93QWN0aXZhdGUiLCJpbmZvIiwibGlzdFNlY3Rpb24iLCJwb3NpdGlvbiIsInBvaW50ZXJFdmVudHMiLCJyaWdodCIsInpJbmRleCIsImF1dGhvcmluZ0Jhc2VSZXNvbHZlZCIsImFkZFRyYW5zbGF0aW9uQmFyIiwiY29tcGFyZUxheW91dEJvZHkiLCJyZW1vdmVUcmFuc2xhdGlvbk1vZGFsRWwiLCJybSIsImNhbmRpZGF0ZVJvd3MiLCJwdGgiLCJ3b3JkQnJlYWsiLCJpbnRlcm5hbE5hbWUiLCJpbnNldCIsImN1cnJlbnRUYXJnZXQiLCJtYXhIZWlnaHQiLCJmbGV4RGlyZWN0aW9uIiwib3ZlcmZsb3ciLCJib3JkZXJCb3R0b20iLCJtYXJnaW4iLCJvdmVyZmxvd1kiLCJib3JkZXJUb3AiLCJ0ZXh0QWxpZ24iLCJ0cmFuc2Zvcm0iLCJDU3R1ZGlvRm9ybXMiLCJDb250cm9scyIsIlRyYW5zbGF0aW9uVmVyc2lvbnMiLCJvd25lciIsInByb3BlcnRpZXMiLCJjb25zdHJhaW50cyIsInJlZ2lzdGVyRmllbGQiLCJlcnJvcnMiLCJyZXF1aXJlZCIsInN1cHBvcnRlZFBvc3RGaXhlcyIsIllBSE9PIiwiZXh0ZW5kIiwiQ1N0dWRpb0Zvcm1GaWVsZCIsImdldExhYmVsIiwiX3JlbmRlciIsInNlbGYiLCJwYW5lbFByb3BzIiwiX2Ntc1JlbmRlckhhbmRsZSIsInVubW91bnQiLCJyZW1vdmVDb250YWluZXIiLCJyZW5kZXIiLCJUcmFuc2xhdGlvblZlcnNpb25zQnJpZGdlIiwiaGFuZGxlIiwiZXJyIiwiY29uc29sZSIsImlubmVySFRNTCIsInJlZnJlc2giLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0TmFtZSIsImdldFN1cHBvcnRlZFByb3BlcnRpZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsImdldFN1cHBvcnRlZFBvc3RGaXhlcyIsIkNTdHVkaW9BdXRob3JpbmciLCJNb2R1bGUiLCJtb2R1bGVMb2FkZWQiLCJvbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBRUEsU0FBU0EsOEJBQThCQSxHQUFHO0VBQ3hDLEVBQUEsSUFBSUMsS0FBSyxHQUFHQyxjQUFjLENBQUNELEtBQUssQ0FBQTtJQUVoQyxJQUFJRSxnQkFBZ0IsR0FBRyw0Q0FBNEMsQ0FBQTtJQUNuRSxTQUFTQyxtQkFBbUJBLEdBQUc7RUFDN0IsSUFBQSxJQUFJLE9BQU9DLFFBQVEsS0FBSyxXQUFXLEVBQUUsT0FBQTtFQUNyQyxJQUFBLElBQUlBLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDSCxnQkFBZ0IsQ0FBQyxFQUFFLE9BQUE7RUFDL0MsSUFBQSxJQUFJSSxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO01BQzNDRCxLQUFLLENBQUNFLEVBQUUsR0FBR04sZ0JBQWdCLENBQUE7TUFDM0JJLEtBQUssQ0FBQ0csV0FBVyxHQUNmLHND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QUFrQixHQUFHLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUks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QUksRUFBRSxNQUFBO09BQVE7RUFDbkQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxvQkFBb0I7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxzQkFBc0I7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDeEQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSw4QkFBOEI7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDaEUsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxtQkFBbUI7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDckQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxpQkFBaUI7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDbkQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxxQkFBcUI7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdkQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxvQkFBb0I7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdEQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxrQkFBa0I7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDcEQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxxQkFBcUI7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDdkQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFBRSxrQkFBa0I7RUFBRW1CLE1BQUFBLElBQUksRUFBRSxNQUFBO09BQVE7RUFDcEQsSUFBQSxPQUFPLEVBQUU7RUFBRW5CLE1BQUFBLEtBQUssRUFB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
