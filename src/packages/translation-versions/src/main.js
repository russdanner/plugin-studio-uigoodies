"use strict";

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

  /** Keep in sync with translation-components `config/multiLocaleConfig.ts`. */
  var BASE_LOCALE = "en";
  var MULTI_LOCALE_CODES = ["en", "es", "ja", "zh"];
  var LOCALE_META = {
    en: { label: "English", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
    es: { label: "Spanish", flag: "\uD83C\uDDEA\uD83C\uDDF8" },
    ja: { label: "Japanese", flag: "\uD83C\uDDEF\uD83C\uDDF5" },
    zh: { label: "Chinese", flag: "\uD83C\uDDE8\uD83C\uDDF3" },
    ar: { label: "Arabic", flag: "\uD83C\uDDF8\uD83C\uDDE6" }
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
        return sec.parentNode && sec.parentNode.nodeType === 1 ? /** @type {HTMLElement} */ (sec.parentNode) : null;
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
    splitter.style.cssText =
      "flex:0 0 10px;width:10px;cursor:col-resize;align-self:stretch;touch-action:none;-webkit-user-select:none;user-select:none;position:relative;background:#e9ecef;border-radius:4px;border:1px solid #cfd4db;";
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
          existingIframe.style.cssText =
            "flex:1 1 auto;min-height:0;width:100%;height:100%;border:1px solid #cfd4db;border-radius:6px;background:#fff;box-sizing:border-box;";
        }
        var codeEl = host.querySelector(".translation-source-compare-path");
        if (codeEl) codeEl.textContent = pathLabel || "";
        return;
      }
      var row = document.createElement("div");
      row.className = "translation-form-compare-row";
      row.style.cssText =
        "display:flex;flex-direction:row;align-items:stretch;gap:8px;width:100%;min-height:0;box-sizing:border-box;";

      var hostW = host.getBoundingClientRect().width || (typeof window !== "undefined" ? window.innerWidth : 800) || 800;
      var left = document.createElement("div");
      left.className = "translation-source-compare-iframe-host";
      left.style.cssText =
        "flex:0 0 auto;display:flex;flex-direction:column;gap:8px;min-height:0;align-self:stretch;box-sizing:border-box;";
      applySourcePaneWidthPx(left, hostW, readInitialSourcePaneWidthPx(hostW));

      var header = document.createElement("div");
      header.style.cssText =
        "display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;flex-shrink:0;";
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
      iframe.style.cssText =
        "flex:1 1 auto;min-height:0;width:100%;height:100%;border:1px solid #cfd4db;border-radius:6px;background:#fff;box-sizing:border-box;";
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
    return [
      "en",
      "es",
      "ja",
      "zh",
      "us",
      "uk",
      "de",
      "fr",
      "it",
      "dk",
      "fi",
      "nl",
      "no",
      "ru",
      "se",
      "br",
      "el",
      "jp",
      "pt",
      "ko",
      "ar",
      "pl",
      "tr",
      "vi"
    ];
  }

  function getLocaleFromPath(path) {
    if (!path) return "";
    var parts = path
      .replace(/^\/site\/[^/]+\//i, "")
      .split("/")
      .filter(Boolean);
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
    var s = String(a || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
    var c = String(b || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
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
    return String(p || "")
      .replace(/\\/g, "/")
      .replace(/\/+$/, "");
  }

  function getMultiLocaleRootDir(fullPath) {
    if (!fullPath) return null;
    var m = fullPath.match(/^(\/site\/[^/]+\/(?:website|components))(?=\/|$)/i);
    if (m) return m[1];
    m = fullPath.match(/^(\/site\/(?:website|components))(?=\/|$)/i);
    return m ? m[1] : null;
  }

  function getSuffixAfterLocale(fullPath, rootDir, locale) {
    if (!fullPath || !rootDir || !locale) return null;
    var p = rootDir.replace(/\/$/, "") + "/" + locale.toLowerCase();
    var lower = fullPath.toLowerCase();
    var pl = p.toLowerCase();
    if (lower === pl) return "";
    var prefix = pl + "/";
    if (lower.startsWith(prefix)) {
      return fullPath.slice(p.length);
    }
    return null;
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
    if (!formPath || !rootDir) return { suffix: null };
    var r = rootDir.replace(/\/$/, "");
    var fp = String(formPath).replace(/\\/g, "/");
    var rl = r.toLowerCase();
    var fl = fp.toLowerCase();
    if (fl === rl) return { suffix: "" };
    if (fl.indexOf(rl + "/") !== 0) return { suffix: null };
    var rest = fp.slice(r.length);
    if (rest.charAt(0) === "/") rest = rest.slice(1);
    var parts = rest.split("/").filter(Boolean);
    if (parts.length === 0) return { suffix: "" };
    var suffixParts = parts.slice(1);
    if (suffixParts.length === 0) return { suffix: "" };
    return { suffix: "/" + suffixParts.join("/") };
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
    var m =
      typeof document !== "undefined" && document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
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
          next: function (r) {
            resolve(r);
          },
          error: function (e) {
            reject(e);
          }
        });
      });
    }
    return fetch(url, {
      credentials: "include",
      headers: mergeFetchHeaders({ Accept: "application/json" })
    }).then(function (r) {
      return r.json().then(function (json) {
        return { status: r.status, response: json };
      });
    });
  }

  /** @param body string or object (object is JSON.stringified) */
  function studioAjaxPost(url, body, headers) {
    var ajax = getCrafterStudioAjax();
    var payload =
      body != null && typeof body === "object" ? JSON.stringify(body) : body != null ? String(body) : "";
    var h = Object.assign({ Accept: "application/json" }, headers || {});
    if (typeof body === "object" && body != null && !h["Content-Type"]) {
      h["Content-Type"] = "application/json";
    }
    if (ajax && typeof ajax.post === "function") {
      return new Promise(function (resolve, reject) {
        ajax.post(url, payload, h).subscribe({
          next: function (r) {
            resolve(r);
          },
          error: function (e) {
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
        return { status: r.status, response: json };
      });
    });
  }

  function unwrapPluginScriptResultBody(body) {
    var p = body && body.result !== undefined ? body.result : body;
    if (p && typeof p === "object" && p.result != null && p.ok === undefined) {
      p = p.result;
    }
    return p && typeof p === "object" ? p : null;
  }

  function fetchTranslationRemoveCandidates(studioBase, siteId, pagePath) {
    var url =
      String(studioBase || "").replace(/\/$/, "") +
      "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove-candidates.post?siteId=" +
      encodeURIComponent(siteId);
    return studioAjaxPost(url, { pagePath: pagePath }, { Accept: "application/json", "Content-Type": "application/json" })
      .then(unwrapAjaxResponse)
      .then(function (body) {
        var p = unwrapPluginScriptResultBody(body);
        return p || { ok: false, message: "Empty response", candidates: [] };
      });
  }

  function postTranslationRemove(studioBase, siteId, pagePath, componentPaths, deletePage) {
    var url =
      String(studioBase || "").replace(/\/$/, "") +
      "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove.post?siteId=" +
      encodeURIComponent(siteId);
    return studioAjaxPost(
      url,
      {
        pagePath: pagePath,
        componentPaths: componentPaths || [],
        deletePage: deletePage !== false
      },
      { Accept: "application/json", "Content-Type": "application/json" }
    )
      .then(unwrapAjaxResponse)
      .then(function (body) {
        var p = unwrapPluginScriptResultBody(body);
        return p || { ok: false, deleted: [], failed: [{ path: "", message: "Empty response" }] };
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
      var p = item.path || item.localId || (item.item && (item.item.path || item.item.localId));
      if (p && out.indexOf(p) === -1) out.push(p);
    });
    return out;
  }

  /**
   * Studio OpenSearch: find all indexed items sharing the same translation lineage id.
   */
  function extractPathsFromPluginResult(body) {
    var payload = body && body.result;
    if (payload && typeof payload === "object" && payload.result != null && payload.ok === undefined) {
      payload = payload.result;
    }
    if (!payload || typeof payload !== "object") {
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
    var url =
      studioBase +
      "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-siblings.post?siteId=" +
      encodeURIComponent(siteId) +
      "&contentType=" +
      encodeURIComponent(String(contentType).trim()) +
      "&localeSourceId=" +
      encodeURIComponent(lid || "") +
      "&objectId=" +
      encodeURIComponent(oid || "");
    return studioAjaxPost(url, "", { Accept: "application/json" })
      .then(unwrapAjaxResponse)
      .then(extractPathsFromPluginResult)
      .catch(function () {
        return [];
      });
  }

  function searchPathsByLocaleSourceId(studioBase, siteId, localeSourceId) {
    if (!studioBase || !siteId || !localeSourceId) {
      return Promise.resolve([]);
    }
    var url =
      studioBase + "/api/2/search/search.json?siteId=" + encodeURIComponent(siteId);
    function postSearch(body) {
      return studioAjaxPost(url, body, { "Content-Type": "application/json", Accept: "application/json" }).then(
        unwrapAjaxResponse
      );
    }
    return postSearch({
      keywords: "",
      offset: 0,
      limit: 200,
      filters: {
        localeSourceId_s: [String(localeSourceId).trim()]
      }
    })
      .then(function (body) {
        var items = (body.response && body.response.result && body.response.result.items) || [];
        var paths = extractPathsFromSearchItems(items);
        if (paths.length > 0) return paths;
        return postSearch({
          keywords: String(localeSourceId).trim(),
          offset: 0,
          limit: 200
        }).then(function (body2) {
          var items2 = (body2.response && body2.response.result && body2.response.result.items) || [];
          return extractPathsFromSearchItems(items2);
        });
      })
      .catch(function () {
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
    var url =
      studioBase +
      "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-config.get?siteId=" +
      encodeURIComponent(siteId);
    return studioAjaxGet(url)
      .then(unwrapAjaxResponse)
      .then(function (body) {
        var p = body && body.result !== undefined ? body.result : body;
        if (!p || !p.ok || !Array.isArray(p.languages) || p.languages.length === 0) return null;
        var codes = [];
        var meta = {};
        p.languages.forEach(function (row) {
          var lc = row && row.locale ? String(row.locale).toLowerCase() : "";
          if (!lc) return;
          if (codes.indexOf(lc) < 0) codes.push(lc);
          meta[lc] = {
            label: (row && row.label) || lc,
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
      })
      .catch(function () {
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
      var cmp = la.localeCompare(lb, undefined, { sensitivity: "base" });
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
      return (
        String(p).toLowerCase().indexOf(q) >= 0 ||
        loc.indexOf(q) >= 0 ||
        label.indexOf(q) >= 0
      );
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
    var url =
      base +
      "/api/1/services/api/1/content/content-exists.json?site_id=" +
      encodeURIComponent(siteId) +
      "&path=" +
      encodeURIComponent(path);
    return studioAjaxGet(url)
      .then(function (res) {
        var body = unwrapAjaxResponse(res);
        return parseContentExistsPayload(body);
      })
      .catch(function () {
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
    var url =
      base +
      "/api/1/services/api/1/content/get-items-tree.json?site=" +
      encodeURIComponent(siteId) +
      "&path=" +
      encodeURIComponent(path) +
      "&depth=0";
    return studioAjaxGet(url)
      .then(unwrapAjaxResponse)
      .then(function (body) {
        var item = body && body.item;
        if (!item) return null;
        return (
          parseTimestampMs(item.lastModifiedDate_dt) ||
          parseTimestampMs(item.lastModifiedDate) ||
          parseTimestampMs(item.lastEditDate) ||
          parseTimestampMs(item.modifiedDate) ||
          parseTimestampMs(item.dateModified) ||
          null
        );
      })
      .catch(function () {
        return null;
      });
  }

  /**
   * Same URL shape as Crafter Studio UI {@code getEditFormSrc} (legacy form engine), read-only for source compare iframe.
   * @see https://github.com/craftercms/studio-ui/blob/develop/ui/app/src/utils/path.ts
   */
  function buildLegacyReadonlyFormSrc(authoringBase, siteId, path) {
    var base = String(authoringBase || "")
      .trim()
      .replace(/\/$/, "");
    if (!base || !siteId || !path) {
      return "";
    }
    return (
      base +
      "/legacy/form?site=" +
      encodeURIComponent(siteId) +
      "&path=" +
      encodeURIComponent(path) +
      "&readonly=true" +
      "&isHidden=false"
    );
  }

  function notifyDispatch(dispatch, message) {
    if (!dispatch || message == null) return;
    try {
      dispatch({ type: "SHOW_SYSTEM_NOTIFICATION", payload: { message: String(message) } });
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
            payload: [
              { type: "DISPATCH_DOM_EVENT", payload: { id: "editDialogSuccess" } },
              { type: "SHOW_EDIT_ITEM_SUCCESS_NOTIFICATION" },
              { type: "CLOSE_EDIT_DIALOG" }
            ]
          },
          onCancel: {
            type: "BATCH_ACTIONS",
            payload: [
              { type: "CLOSE_EDIT_DIALOG" },
              { type: "DISPATCH_DOM_EVENT", payload: { id: "editDialogDismissed" } }
            ]
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
    var fromSourceLocale =
      (translationPaths || []).find(function (p) {
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

  function detectLocaleFolderNamesForSite(childPaths, rootDir, localeCodes) {
    var prefix = rootDir.endsWith("/") ? rootDir : rootDir + "/";
    var localeSet = {};
    var codes = localeCodes && localeCodes.length ? localeCodes : MULTI_LOCALE_CODES;
    var seen = {};
    var names = [];
    (childPaths || []).forEach(function (p) {
      if (!p || p.indexOf(prefix) !== 0) return;
      var rest = p.slice(prefix.length);
      var seg = rest.split("/").filter(Boolean)[0];
      var matched =
        seg &&
        codes.some(function (code) {
          return localeSegmentsCompatible(seg, code);
        });
      if (matched && !seen[seg.toLowerCase()]) {
        seen[seg.toLowerCase()] = true;
        names.push(seg);
      }
    });
    return names;
  }

  function isMultiLocaleFolderSet(names) {
    if (!names || names.length < 2) return false;
    for (var i = 0; i < names.length; i++) {
      if (String(names[i]).toLowerCase() === BASE_LOCALE.toLowerCase()) return true;
    }
    return false;
  }

  /**
   * After multi-locale is confirmed from existing folders, list every MULTI_LOCALE_CODES target
   * (use repo folder casing when present, else the code e.g. ja so Japanese appears before /ja exists).
   */
  /**
   * @param {{ fromTranslationConfig?: boolean }} [opts]
   *   When fromTranslationConfig and translation-config.xml lists 2+ locales, return ordered codes
   *   even if fewer than two locale folders exist on disk yet (authors can translate into missing trees).
   */
  function resolveLocaleFoldersOrderedFromPaths(childPaths, rootDir, localeCodes, opts) {
    opts = opts || {};
    var fromTranslationConfig = !!opts.fromTranslationConfig;
    var activeCodes = localeCodes && localeCodes.length ? localeCodes : MULTI_LOCALE_CODES;
    var names = detectLocaleFolderNamesForSite(childPaths, rootDir, activeCodes);
    if (!isMultiLocaleFolderSet(names)) {
      if (!fromTranslationConfig || activeCodes.length < 2) {
        return null;
      }
    }
    var ordered = [];
    activeCodes.forEach(function (code) {
      var match = null;
      for (var i = 0; i < names.length; i++) {
        if (localeSegmentsCompatible(names[i], code)) {
          match = names[i];
          break;
        }
      }
      ordered.push(match || code);
    });
    names.forEach(function (n) {
      var inCfg = activeCodes.some(function (c) {
        return localeSegmentsCompatible(n, c);
      });
      if (!inCfg) ordered.push(n);
    });
    return ordered;
  }

  function getChildrenPathsTree(base, siteId, path) {
    var url =
      base +
      "/api/1/services/api/1/content/get-items-tree.json?site=" +
      encodeURIComponent(siteId) +
      "&path=" +
      encodeURIComponent(path) +
      "&depth=1";
    return studioAjaxGet(url)
      .then(function (res) {
        var body = unwrapAjaxResponse(res);
        var raw = body && body.item && body.item.children;
        if (!Array.isArray(raw)) return [];
        return raw
          .filter(function (ch) {
            return ch && ch.path && ch.path !== path;
          })
          .map(function (ch) {
            return ch.path;
          });
      })
      .catch(function () {
        return [];
      });
  }

  function copyItemPasteStudio(base, siteId, sourcePath, targetParentPath, expectedTargetPath) {
    var url =
      String(base).replace(/\/$/, "") +
      "/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-copy.post?siteId=" +
      encodeURIComponent(siteId);
    var body = {
      sourcePath: sourcePath,
      targetParentPath: targetParentPath,
      expectedTargetPath: expectedTargetPath || ""
    };
    return studioAjaxPost(url, body, { Accept: "application/json", "Content-Type": "application/json" })
      .then(function (res) {
        var body = unwrapAjaxResponse(res);
        return body && body.result !== undefined ? body.result : body;
      })
      .catch(function () {
        return null;
      });
  }

  /** Chevron for native select (no Bootstrap). */
  var ADD_TRANSLATION_SELECT_CHEVRON =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'
    );

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
    var loadTargets = React.useCallback(
      function () {
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
        return fetchTranslationConfig(studioBase, siteId)
          .then(function (fetched) {
            var rawCodes =
              fetched && fetched.codes && fetched.codes.length
                ? fetched.codes
                : translationCfgProp && translationCfgProp.codes && translationCfgProp.codes.length
                  ? translationCfgProp.codes
                  : localeCodes && localeCodes.length
                    ? localeCodes
                    : MULTI_LOCALE_CODES;
            var activeMeta =
              (fetched && fetched.meta) ||
              (translationCfgProp && translationCfgProp.meta) ||
              localeMeta;
            return applyCodes(activeMeta, rawCodes);
          })
          .catch(function () {
            var rawCodes =
              translationCfgProp && translationCfgProp.codes && translationCfgProp.codes.length
                ? translationCfgProp.codes
                : localeCodes && localeCodes.length
                  ? localeCodes
                  : MULTI_LOCALE_CODES;
            var activeMeta = (translationCfgProp && translationCfgProp.meta) || localeMeta;
            return applyCodes(activeMeta, rawCodes);
          })
          .finally(function () {
            setLoading(false);
          });
      },
      [formPath, siteId, rootDir, suffix, existingPaths, localeCodes, localeMeta, translationCfgProp]
    );

    React.useEffect(
      function () {
        loadTargets();
      },
      [loadTargets]
    );

    var runTranslate = function () {
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
      return copyItemPasteStudio(contentApiBase, siteId, translateCopySourcePath, parent, choice.targetPath)
        .then(function (res) {
          if (!res || !res.ok) {
            notifyDispatch(
              dispatch,
              (res && res.message) || "Translate failed."
            );
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
          return loadTargets().finally(function () {
            setCopyBusy(false);
          });
        })
        .catch(function () {
          notifyDispatch(dispatch, "Translate failed.");
          setCopyBusy(false);
        });
    };

    var effectiveMirroredSuffix =
      suffix != null ? suffix : rootDir && formPath ? parseSuffixFromFormPath(formPath, rootDir).suffix : null;

    var hint = "";
    if (!dispatch) hint = "Studio actions require an active session.";
    else if (!formPath || !siteId) hint = "Missing path or site.";
    else if (!rootDir || effectiveMirroredSuffix == null)
      hint = "Path layout does not support mirrored locale copy for this item.";
    else if (!resolveAuthoringContentApiBase(authoringBase))
      hint = "Loading authoring context\u2026";
    else if (!loading && options.length === 0)
      hint = "All configured locales already have a translation at this path.";

    var selectDisabled =
      loading ||
      copyBusy ||
      options.length === 0 ||
      !dispatch ||
      !rootDir ||
      effectiveMirroredSuffix == null ||
      !resolveAuthoringContentApiBase(authoringBase);

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
      boxShadow:
        selectFocused && !selectDisabled
          ? "0 0 0 3px rgba(59, 130, 246, 0.2)"
          : "inset 0 1px 2px rgba(15, 23, 42, 0.04)",
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
      boxShadow:
        copyBusy || !selected || !dispatch ? "none" : "0 1px 2px rgba(37, 99, 235, 0.35)",
      transition: "background 0.15s ease, box-shadow 0.15s ease"
    };

    return React.createElement(
      "div",
      { style: { width: "100%", marginTop: "8px" } },
      React.createElement(
        "div",
        { style: { fontSize: "13px", fontWeight: 600, color: "#212529", marginBottom: "8px" } },
        "Translate"
      ),
      hint
        ? React.createElement(
            "div",
            { className: "text-muted", style: { fontSize: "12px", marginBottom: "10px", lineHeight: 1.45 } },
            hint
          )
        : null,
      React.createElement(
        "div",
        { style: actionsRowStyle },
        React.createElement(
          "div",
          { style: selectWrapStyle },
          React.createElement(
            "select",
            {
              style: selectStyle,
              disabled: selectDisabled,
              value: selected,
              onChange: function (e) {
                setSelected(e.target.value);
              },
              onFocus: function () {
                setSelectFocused(true);
              },
              onBlur: function () {
                setSelectFocused(false);
              },
              "aria-label": "Target locale for translation"
            },
            React.createElement(
              "option",
              { value: "" },
              loading ? "Loading\u2026" : options.length === 0 ? "\u2014" : "Choose locale\u2026"
            ),
            options.map(function (o) {
              return React.createElement(
                "option",
                { key: o.locale, value: o.locale },
                o.flag + " " + o.label + " (" + o.locale + ")"
              );
            })
          )
        ),
        React.createElement(
          "button",
          {
            type: "button",
            disabled: copyBusy || loading,
            onClick: function () {
              loadTargets();
            },
            title: "Reload locale list",
            style: btnIconStyle
          },
          "\u21BB"
        ),
        React.createElement(
          "button",
          {
            type: "button",
            disabled: copyBusy || !selected || !dispatch,
            style: btnPrimaryStyle,
            onClick: function () {
              runTranslate();
            }
          },
          "Translate"
        )
      )
    );
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
    var allowedLabels = hideEdit
      ? {
          delete: 1,
          "view form": 1,
          unlock: 1,
          history: 1,
          dependencies: 1
        }
      : {
          edit: 1,
          delete: 1,
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
      rowStyle = Object.assign({}, rowStyle, { cursor: "pointer" });
    }
    var showStudioItemMegaMenu = function (event) {
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
          anchorPosition: { top: top, left: left }
        }
      });
      scheduleEnforceAllowedItemsInMegaMenu(isCurrentRow);
    };

    return React.createElement(
      "div",
      {
        className: "translation-versions-row",
        style: rowStyle,
        onClick: function () {
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
        onKeyDown: rowClickable
          ? function (ev) {
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
            }
          : undefined,
        title: rowClickable ? "Show source fields (read-only) next to this form" : undefined
      },
      React.createElement(
        "span",
        { style: { fontSize: "1.15rem", lineHeight: 1 }, "aria-hidden": true },
        meta.flag
      ),
      React.createElement(
        "span",
        { style: { fontWeight: 600, minWidth: "72px", fontSize: "13px", color: "#212529" } },
        meta.label
      ),
      React.createElement(
        "span",
        {
          style: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
            flex: 1
          }
        },
        isSource
          ? React.createElement(
              "span",
              { style: Object.assign({}, PILL_STYLES.base, PILL_STYLES.source) },
              "Source"
            )
          : null,
        isOutdated
          ? React.createElement(
              "span",
              { style: Object.assign({}, PILL_STYLES.base, { background: "#fff7e6", color: "#ad6800", border: "1px solid #ffd591" }), title: "Outdated translation" },
              "\uD83D\uDEA9 Outdated"
            )
          : null,
        isCurrentRow
          ? React.createElement(
              "span",
              { style: Object.assign({}, PILL_STYLES.base, PILL_STYLES.current), title: "This is the item you have open in the form" },
              "Current"
            )
          : null
      ),
      React.createElement(
        "div",
        { style: { marginLeft: "auto", flexShrink: 0, display: "flex", gap: "6px", alignItems: "center" } },
        exists
          ? React.createElement(
              "span",
              { style: { display: "inline-flex", gap: "6px", alignItems: "center" } },
              showRemoveTranslation
                ? React.createElement(
                    "button",
                    {
                      type: "button",
                      className: "btn btn-danger btn-xs",
                      onClick: function (ev) {
                        if (ev && ev.stopPropagation) ev.stopPropagation();
                        if (typeof onRemoveTranslation === "function") {
                          onRemoveTranslation(targetPath, meta);
                        }
                      },
                      "aria-label": "Remove translation for " + meta.label,
                      title:
                        "Remove this translated page (optional shared components with no other page references)",
                      style: { whiteSpace: "nowrap" }
                    },
                    "Remove"
                  )
                : null,
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-sm",
                  onClick: showStudioItemMegaMenu,
                  "aria-haspopup": "true",
                  "aria-label": (isCurrentRow ? "Options (editing this item — Edit hidden) " : "Options for ") + meta.label,
                  title: isCurrentRow ? "Open item menu (Edit is hidden while this form is open for this path)" : "Item actions",
                  style: MENU_TRIGGER_STYLE
                },
                "\u22EE"
              )
            )
          : React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-primary btn-xs",
                onClick: function (ev) {
                  if (ev && ev.stopPropagation) ev.stopPropagation();
                  if (typeof onTranslate === "function") {
                    onTranslate(targetPath, meta);
                  }
                },
                "aria-label": "Translate to " + meta.label
              },
              "Translate"
            )
      )
    );
  }

  function TranslationVersionsPanel(props) {
    var formPath = props.formPath;
    var siteId = props.siteId;
    var model = props.model || {};
    var form = props.form;
    var controlContainerEl = props.controlContainerEl;
    var resolvedContentTypeId = String(
      props.contentTypeId || model["content-type"] || model.contentType || ""
    ).trim();

    var sourceLocale = (model.sourceLocaleCode_s && String(model.sourceLocaleCode_s).trim().toLowerCase()) || "";
    var modelLocale = (model.localeCode_s && String(model.localeCode_s).trim().toLowerCase()) || "";
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

    var suffix = parseSuffixFromFormPath(formPath, rootDir).suffix;
    var currentLocale = (pathLocale || modelLocale || "").toLowerCase();

    React.useEffect(function () {
      setPageIndex(0);
    }, [translationPaths, filterQuery]);

    React.useEffect(
      function () {
        setCompareSourcePath(null);
      },
      [formPath]
    );

    React.useEffect(
      function () {
        var active = true;
        fetchTranslationConfig(resolveAuthoringContentApiBase(authoringBase), siteId).then(function (cfg) {
          if (active) setTranslationCfg(cfg);
        });
        return function () {
          active = false;
        };
      },
      [authoringBase, siteId]
    );

    React.useEffect(
      function () {
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
          Promise.all(
            ((translationCfg && translationCfg.codes) || MULTI_LOCALE_CODES).map(function (loc) {
              var p = pathForTargetLocale(rootDir, loc, suffix);
              return contentExists(base, siteId, p).then(function (ok) {
                if (ok) return p;
                if (cur && localeSegmentsCompatible(cur, loc)) return p;
                return null;
              });
            })
          )
            .then(function (results) {
              if (cancelled) return;
              var m = {};
              results.forEach(function (p) {
                if (p) m[p] = true;
              });
              if (formPath) {
                m[formPath] = true;
              }
              finish(sortTranslationPathsForDisplay(Object.keys(m), resolvedSourceKey));
            })
            .catch(function () {
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
          var cfgCodes =
            translationCfg && translationCfg.codes && translationCfg.codes.length
              ? translationCfg.codes
              : MULTI_LOCALE_CODES;
          if (base && siteId && rootDir != null && suffix != null && cfgCodes.length) {
            Promise.all(
              cfgCodes.map(function (code) {
                var p = pathForTargetLocale(rootDir, code, suffix);
                return contentExists(base, siteId, p).then(function (ok) {
                  return ok ? p : null;
                });
              })
            )
              .then(function (found) {
                if (cancelled) return;
                (found || []).forEach(function (p) {
                  if (p) m[p] = true;
                });
                applyMap();
              })
              .catch(function () {
                applyMap();
              });
          } else {
            applyMap();
          }
        }

        /** Preview OpenSearch plugin: same content-type + lineage (localeSourceId_s or objectId on hits). */
        if (ctype && (lsid || oid) && studioBase) {
          fetchTranslationSiblingsFromPlugin(studioBase, siteId, ctype, lsid, oid)
            .then(function (paths) {
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
            })
            .catch(function () {
              if (cancelled) return;
              if (lsid && studioBase) {
                searchPathsByLocaleSourceId(studioBase, siteId, lsid)
                  .then(function (legacyPaths) {
                    if (cancelled) return;
                    if (legacyPaths && legacyPaths.length > 0) {
                      mergePathsAndFinish(legacyPaths);
                    } else {
                      runFallback();
                    }
                  })
                  .catch(function () {
                    runFallback();
                  });
              } else {
                runFallback();
              }
            });
        } else if (lsid && studioBase) {
          searchPathsByLocaleSourceId(studioBase, siteId, lsid)
            .then(function (paths) {
              if (cancelled) return;
              if (!paths || paths.length === 0) {
                runFallback();
                return;
              }
              mergePathsAndFinish(paths);
            })
            .catch(function () {
              runFallback();
            });
        } else {
          runFallback();
        }

        return function () {
          cancelled = true;
        };
      },
      [
        formPath,
        siteId,
        rootDir,
        suffix,
        model.localeSourceId_s,
        model.objectId,
        resolvedContentTypeId,
        currentLocale,
        translationListRefreshKey,
        translationCfg
      ]
    );

    React.useEffect(
      function () {
        var cancelled = false;
        var base = authoringBase || getAuthoringBase();
        if (!siteId || !base || !translationPaths || translationPaths.length === 0) {
          setStaleByPath({});
          return function () {
            cancelled = true;
          };
        }
        var sourcePath =
          translationPaths.find(function (p) {
            var loc = (getLocaleFromPath(p) || "").toLowerCase();
            return resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
          }) || formPath;
        Promise.all(
          [getItemModifiedTimestamp(base, siteId, sourcePath)].concat(
            translationPaths.map(function (p) {
              return getItemModifiedTimestamp(base, siteId, p);
            })
          )
        ).then(function (arr) {
          if (cancelled) return;
          var sourceMs = arr[0];
          var map = {};
          translationPaths.forEach(function (p, i) {
            var targetMs = arr[i + 1];
            var loc = (getLocaleFromPath(p) || "").toLowerCase();
            var isSource = resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
            map[p] =
              !isSource &&
              sourceMs != null &&
              targetMs != null &&
              Number(targetMs) < Number(sourceMs);
          });
          setStaleByPath(map);
        }).catch(function () {
          if (!cancelled) setStaleByPath({});
        });
        return function () {
          cancelled = true;
        };
      },
      [authoringBase, siteId, translationPaths, resolvedSourceKey, formPath]
    );

    React.useEffect(
      function () {
        var cancelled = false;
        var base = authoringBase || getAuthoringBase();
        if (!siteId || !base || !translationPaths || translationPaths.length === 0) {
          setExistsByPath({});
          return function () {
            cancelled = true;
          };
        }
        Promise.all(
          translationPaths.map(function (p) {
            return contentExists(base, siteId, p).then(function (ok) {
              return [p, !!ok];
            });
          })
        )
          .then(function (pairs) {
            if (cancelled) return;
            var map = {};
            pairs.forEach(function (row) {
              map[row[0]] = row[1];
            });
            setExistsByPath(map);
          })
          .catch(function () {
            if (!cancelled) setExistsByPath({});
          });
        return function () {
          cancelled = true;
        };
      },
      [authoringBase, siteId, translationPaths]
    );

    React.useEffect(function () {
      function onCloseCompare() {
        setCompareSourcePath(null);
      }
      window.addEventListener("translation:close-source-compare", onCloseCompare);
      return function () {
        window.removeEventListener("translation:close-source-compare", onCloseCompare);
      };
    }, []);

    React.useEffect(
      function () {
        if (!siteId || !formPath || !form || !controlContainerEl) {
          return function () {};
        }
        var base = authoringBase || getAuthoringBase();
        var src = buildLegacyReadonlyFormSrc(base, siteId, compareSourcePath || "");
        var host = findFormFieldsCompareHost(form, controlContainerEl);
        if (!host) {
          return function () {};
        }
        if (!compareSourcePath || !src) {
          unwrapFormCompareLayout(host);
          return function () {
            unwrapFormCompareLayout(host);
          };
        }
        wrapFormCompareLayout(host, src, compareSourcePath);
        return function () {
          unwrapFormCompareLayout(host);
        };
      },
      [compareSourcePath, authoringBase, siteId, formPath, form, controlContainerEl]
    );

    if (!siteId || !formPath) {
      return React.createElement(
        "div",
        { className: "help-block", style: { marginTop: 0 } },
        "Save the item and open it from the content tree to see translation versions."
      );
    }

    var dispatch = getDispatch();
    var translateCopySourcePath = resolveTranslateCopySourcePath(
      translationCfg,
      rootDir,
      suffix,
      translationPaths,
      formPath,
      resolvedSourceKey
    );
    var closeRemoveTranslationModal = function () {
      setRemoveModal(null);
    };

    var openRemoveTranslationModal = function (targetPath, meta) {
      if (!siteId || !targetPath) return;
      var tp = targetPath;
      setRemoveModal({
        pagePath: tp,
        metaLabel: (meta && meta.label) || tp,
        loading: true,
        error: null,
        candidates: [],
        selectedPaths: {},
        submitting: false
      });
      var sb = getStudioApiBase();
      fetchTranslationRemoveCandidates(sb, siteId, tp)
        .then(function (res) {
          if (!res || !res.ok) {
            setRemoveModal(function (prev) {
              if (!prev || normalizeStudioPath(prev.pagePath) !== normalizeStudioPath(tp)) return prev;
              return Object.assign({}, prev, {
                loading: false,
                error: (res && res.message) || "Could not load removable components."
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
        })
        .catch(function () {
          setRemoveModal(function (prev) {
            if (!prev || normalizeStudioPath(prev.pagePath) !== normalizeStudioPath(tp)) return prev;
            return Object.assign({}, prev, { loading: false, error: "Network error loading candidates." });
          });
        });
    };

    var toggleRemoveCandidate = function (path, checked) {
      setRemoveModal(function (prev) {
        if (!prev || prev.loading || prev.submitting) return prev;
        var nextSel = Object.assign({}, prev.selectedPaths || {});
        nextSel[path] = !!checked;
        return Object.assign({}, prev, { selectedPaths: nextSel });
      });
    };

    var setAllRemoveCandidates = function (value) {
      setRemoveModal(function (prev) {
        if (!prev || prev.loading || prev.submitting) return prev;
        var nextSel = {};
        (prev.candidates || []).forEach(function (c) {
          if (c && c.path) nextSel[c.path] = !!value;
        });
        return Object.assign({}, prev, { selectedPaths: nextSel });
      });
    };

    var confirmRemoveTranslation = function () {
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
        return prev ? Object.assign({}, prev, { submitting: true, error: null }) : prev;
      });
      postTranslationRemove(sb, siteId, pagePath, paths, true)
        .then(function (res) {
          var deleted = (res && res.deleted) || [];
          var failed = (res && res.failed) || [];
          var deletedPage =
            deleted.some(function (p) {
              return normalizeStudioPath(p) === normalizeStudioPath(pagePath);
            });
          if (failed.length) {
            var msg =
              "Remove finished with errors: " +
              failed
                .map(function (f) {
                  return (f && f.path) + (f && f.message ? " (" + f.message + ")" : "");
                })
                .join("; ");
            notifyDispatch(dispatch, msg);
          } else {
            notifyDispatch(
              dispatch,
              "Removed translation" +
                (deleted.length ? " (" + deleted.length + " item(s))." : ".")
            );
          }
          bumpTranslationList(function (n) {
            return n + 1;
          });
          closeRemoveTranslationModal();
          if (deletedPage && formPath && normalizeStudioPath(formPath) === normalizeStudioPath(pagePath)) {
            try {
              dispatch({ type: "DISPATCH_DOM_EVENT", payload: { id: "editDialogSuccess" } });
            } catch (e1) {}
            notifyDispatch(
              dispatch,
              "The page you had open was deleted. Close or refresh this dialog if it is still shown."
            );
          }
        })
        .catch(function () {
          setRemoveModal(function (prev) {
            return prev ? Object.assign({}, prev, { submitting: false, error: "Network error while deleting." }) : prev;
          });
          notifyDispatch(dispatch, "Remove translation failed (network).");
        });
    };

    var runTranslateForRow = function (targetPath, meta) {
      if (!dispatch || !resolveAuthoringContentApiBase(authoringBase) || !siteId || !translateCopySourcePath || !targetPath) {
        return;
      }
      var parent = parentFolderPathForCopy(targetPath);
      var contentApiBase = resolveAuthoringContentApiBase(authoringBase);
      copyItemPasteStudio(contentApiBase, siteId, translateCopySourcePath, parent, targetPath)
        .then(function (res) {
          if (!res || !res.ok) {
            notifyDispatch(dispatch, (res && res.message) || "Translate failed.");
            return;
          }
          notifyDispatch(dispatch, "Translated to " + meta.label + ": " + targetPath);
          bumpTranslationList(function (n) {
            return n + 1;
          });
          openStudioEditForm(dispatch, siteId, targetPath, authoringBase || getAuthoringBase());
        })
        .catch(function () {
          notifyDispatch(dispatch, "Translate failed.");
        });
    };
    var pathLayoutNote =
      !rootDir || suffix == null
        ? React.createElement(
            "div",
            {
              className: "text-muted",
              style: { fontSize: "12px", marginTop: "4px", maxWidth: "520px", lineHeight: 1.45 }
            },
            "Translation locale shortcuts work best when this item lives under a path like ",
            React.createElement("code", null, "/site/…/website/{locale}/…"),
            " or ",
            React.createElement("code", null, "/site/…/components/{locale}/…"),
            ". Related translations may still appear from the search index above."
          )
        : null;

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
    var activeLocaleMeta = (translationCfg && translationCfg.meta) || LOCALE_META;
    var totalFiltered = translatedOnlyPaths.length;
    var totalPages = Math.max(1, Math.ceil(totalFiltered / TRANSLATIONS_PAGE_SIZE));
    var safePage = Math.min(pageIndex, totalPages - 1);
    var pageStart = safePage * TRANSLATIONS_PAGE_SIZE;
    var pageSlice = translatedOnlyPaths.slice(pageStart, pageStart + TRANSLATIONS_PAGE_SIZE);
    var rangeFrom = totalFiltered === 0 ? 0 : pageStart + 1;
    var rangeTo = Math.min(pageStart + TRANSLATIONS_PAGE_SIZE, totalFiltered);

    var filterToolbar = React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px"
        }
      },
      React.createElement("input", {
        type: "text",
        className: "form-control input-sm",
        placeholder: "Filter by language, code, or path\u2026",
        value: filterQuery,
        onChange: function (e) {
          setFilterQuery(e.target.value);
        },
        style: { maxWidth: "280px", flex: "1 1 180px" },
        "aria-label": "Filter translations"
      }),
      totalFiltered > 0
        ? React.createElement(
            "span",
            { className: "text-muted", style: { fontSize: "12px", whiteSpace: "nowrap" } },
            "Showing ",
            rangeFrom,
            "\u2013",
            rangeTo,
            " of ",
            totalFiltered
          )
        : null
    );

    var paginationBar =
      totalFiltered > TRANSLATIONS_PAGE_SIZE
        ? React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
                flexWrap: "wrap"
              }
            },
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-default btn-xs",
                disabled: safePage <= 0,
                onClick: function () {
                  setPageIndex(Math.max(0, safePage - 1));
                }
              },
              "Previous"
            ),
            React.createElement(
              "span",
              { className: "text-muted", style: { fontSize: "12px" } },
              "Page ",
              safePage + 1,
              " / ",
              totalPages
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-default btn-xs",
                disabled: safePage >= totalPages - 1,
                onClick: function () {
                  setPageIndex(Math.min(totalPages - 1, safePage + 1));
                }
              },
              "Next"
            )
          )
        : null;

    var onTranslationRowActivate = function (info) {
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

    var listSection =
      loading && translationPaths.length === 0
        ? React.createElement(
            "div",
            {
              className: "text-muted",
              style: { fontSize: "13px", padding: "4px 0 8px" }
            },
            "Loading translations\u2026"
          )
        : translationPaths.length === 0
          ? React.createElement(
              "div",
              {
                className: "text-muted",
                style: { fontSize: "13px", padding: "4px 0 8px" }
              },
              "No translations found."
            )
          : React.createElement(
              "div",
              { style: { opacity: loading ? 0.9 : 1 } },
              filterToolbar,
              pageSlice.length === 0
                ? React.createElement(
                    "div",
                    {
                      className: "text-muted",
                      style: { fontSize: "13px", padding: "6px 0" }
                    },
                    totalFiltered === 0 && filteredPaths.length > 0
                      ? "No translated locales match your filter (untranslated locales are in Translate below)."
                      : "No translations match your filter."
                  )
                : pageSlice.map(function (targetPath) {
                    var loc = (getLocaleFromPath(targetPath) || "unknown").toLowerCase();
                    var meta =
                      metaForPathLocale(activeLocaleMeta, loc) || {
                        label: loc,
                        flag: "\uD83C\uDF10"
                      };
                    var isSource =
                      resolvedSourceKey && localeSegmentsCompatible(loc, resolvedSourceKey);
                    var exists = existsByPath[targetPath] !== false;
                    var isCurrentRow =
                      !!formPath &&
                      !!targetPath &&
                      normalizeStudioPath(formPath) === normalizeStudioPath(targetPath);
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
                      isCompareSelected:
                        !!compareSourcePath &&
                        normalizeStudioPath(compareSourcePath) === normalizeStudioPath(targetPath),
                      showRemoveTranslation:
                        exists &&
                        !isSource &&
                        !isCurrentRow &&
                        isPageTranslationRow(targetPath, resolvedContentTypeId),
                      onRemoveTranslation: openRemoveTranslationModal
                    });
                  }),
              paginationBar
            );

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
      onTranslated: function () {
        bumpTranslationList(function (n) {
          return n + 1;
        });
      },
      localeCodes: translationCfg && translationCfg.codes,
      localeMeta: translationCfg && translationCfg.meta,
      translationCfg: translationCfg
    });

    var compareLayoutBody = React.createElement(
      "div",
      { style: { width: "100%", minWidth: 0 } },
      listSection,
      addTranslationBar
    );

    var removeTranslationModalEl = null;
    if (removeModal) {
      var rm = removeModal;
      var candidateRows =
        !rm.loading && rm.candidates && rm.candidates.length
          ? rm.candidates.map(function (c) {
              var pth = c.path;
              var checked = rm.selectedPaths && rm.selectedPaths[pth];
              return React.createElement(
                "label",
                {
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
                },
                React.createElement("input", {
                  type: "checkbox",
                  checked: !!checked,
                  disabled: !!rm.submitting,
                  onChange: function (e) {
                    toggleRemoveCandidate(pth, e.target.checked);
                  },
                  style: { marginTop: "3px", flexShrink: 0 }
                }),
                React.createElement(
                  "span",
                  { style: { fontSize: "13px", lineHeight: 1.4, wordBreak: "break-all" } },
                  React.createElement(
                    "strong",
                    { style: { display: "block", color: "#212529" } },
                    (c.internalName && String(c.internalName).trim()) || "(no internal name)"
                  ),
                  React.createElement("code", { style: { fontSize: "12px", color: "#555" } }, pth)
                )
              );
            })
          : null;

      removeTranslationModalEl = React.createElement(
        "div",
        {
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
          onClick: function (e) {
            if (e.target === e.currentTarget && !rm.submitting) closeRemoveTranslationModal();
          }
        },
        React.createElement(
          "div",
          {
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
            onClick: function (ev) {
              ev.stopPropagation();
            }
          },
          React.createElement(
            "div",
            {
              style: {
                padding: "14px 18px",
                borderBottom: "1px solid #eee",
                flexShrink: 0
              }
            },
            React.createElement(
              "h4",
              {
                id: "translation-remove-translation-title",
                style: { margin: 0, fontSize: "16px", fontWeight: 600 }
              },
              "Remove translation"
            ),
            React.createElement(
              "div",
              { className: "text-muted", style: { fontSize: "12px", marginTop: "6px", lineHeight: 1.45 } },
              React.createElement("span", null, rm.metaLabel),
              " — ",
              React.createElement("code", { style: { fontSize: "11px" } }, rm.pagePath)
            )
          ),
          React.createElement(
            "div",
            { style: { padding: "12px 18px", overflowY: "auto", flex: "1 1 auto", minHeight: 0 } },
            rm.loading
              ? React.createElement(
                  "div",
                  { className: "text-muted", style: { fontSize: "13px", padding: "8px 0" } },
                  "Finding locale-specific components only used by this page\u2026"
                )
              : null,
            rm.error
              ? React.createElement(
                  "div",
                  {
                    className: "alert alert-danger",
                    style: { fontSize: "13px", padding: "8px 12px", marginBottom: "10px" }
                  },
                  rm.error
                )
              : null,
            !rm.loading && !rm.error && (!rm.candidates || !rm.candidates.length)
              ? React.createElement(
                  "p",
                  { className: "text-muted", style: { fontSize: "13px", margin: "8px 0 12px" } },
                  "No shared components in this locale were found that are safe to delete automatically (they may be referenced elsewhere). The translated page can still be removed below."
                )
              : null,
            !rm.loading && rm.candidates && rm.candidates.length
              ? React.createElement(
                  "div",
                  { style: { marginBottom: "10px" } },
                  React.createElement(
                    "div",
                    { style: { fontSize: "13px", fontWeight: 600, marginBottom: "6px" } },
                    "Also delete these locale components (no other page references)"
                  ),
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" } },
                    React.createElement(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-default btn-xs",
                        disabled: !!rm.submitting,
                        onClick: function () {
                          setAllRemoveCandidates(true);
                        }
                      },
                      "Select all"
                    ),
                    React.createElement(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-default btn-xs",
                        disabled: !!rm.submitting,
                        onClick: function () {
                          setAllRemoveCandidates(false);
                        }
                      },
                      "Select none"
                    )
                  ),
                  candidateRows
                )
              : null,
            React.createElement(
              "p",
              {
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
              },
              "The translated page will be deleted after the selected components. This cannot be undone."
            )
          ),
          React.createElement(
            "div",
            {
              style: {
                padding: "12px 18px",
                borderTop: "1px solid #eee",
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                flexShrink: 0
              }
            },
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-default btn-sm",
                disabled: !!rm.submitting,
                onClick: closeRemoveTranslationModal
              },
              "Cancel"
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-danger btn-sm",
                disabled: !!rm.loading || !!rm.submitting,
                onClick: confirmRemoveTranslation
              },
              rm.submitting ? "Removing\u2026" : "Remove translation"
            )
          )
        )
      );
    }

    return React.createElement(
      "div",
      { className: "cstudio-form-control-input-container translation-versions-control" },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "20px",
            width: "100%",
            boxSizing: "border-box"
          }
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            {
              style: {
                margin: 0,
                padding: 0,
                fontSize: "16px",
                fontWeight: 600,
                color: "#212529",
                letterSpacing: "-0.01em",
                lineHeight: 1.3
              }
            },
            "Translations"
          ),
          pathLayoutNote
        ),
        React.createElement(
          "div",
          { style: { width: "100%", minWidth: 0 } },
          compareLayoutBody
        )
      ),
      removeTranslationModalEl
    );
  }

  CStudioForms.Controls.TranslationVersions =
    CStudioForms.Controls.TranslationVersions ||
    function (id, form, owner, properties, constraints) {
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
    getLabel: function () {
      return "Translation versions (Translation)";
    },
    _render: function (self) {
      var cms = CrafterCMSNext;
      var site =
        (typeof CStudioAuthoringContext !== "undefined" && CStudioAuthoringContext.site) ||
        (self.form && self.form.site) ||
        "";
      var internalName =
        (self.form.model && (self.form.model["internal-name"] || self.form.model.internalName)) || "";
      var contentTypeId =
        (self.form.model && (self.form.model["content-type"] || self.form.model.contentType)) || "";
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
        self._cmsRenderHandle.unmount({ removeContainer: false });
        self._cmsRenderHandle = null;
      }
      cms
        .render(
          self.containerEl,
          function TranslationVersionsBridge(props) {
            return React.createElement(TranslationVersionsPanel, props);
          },
          panelProps
        )
        .then(function (handle) {
          self._cmsRenderHandle = handle;
          pinTranslationVersionsFieldToTopOfForm(self.form, self.containerEl);
        })
        .catch(function (err) {
          console.error("[translation-versions] Failed to render control", err);
          self.containerEl.innerHTML =
            '<div class="alert alert-warning" style="margin:8px 0">Translation control could not load. Refresh Studio and check the browser console.</div>';
        });
    },
    render: function (config, containerEl) {
      containerEl.id = this.id;
      this.containerEl = containerEl;
      this._render(this);
    },
    refresh: function () {
      if (this.containerEl) {
        this._render(this);
      }
    },
    getValue: function () {
      return this.value;
    },
    setValue: function (value) {
      this.value = value;
    },
    getName: function () {
      return "translation-versions";
    },
    getSupportedProperties: function () {
      return [];
    },
    getSupportedConstraints: function () {
      return [];
    },
    getSupportedPostFixes: function () {
      return this.supportedPostFixes;
    }
  });

  CStudioAuthoring.Module.moduleLoaded("translation-versions", CStudioForms.Controls.TranslationVersions);
}

(function () {
  if (typeof CrafterCMSNext !== "undefined" && CrafterCMSNext.React) {
    bootTranslationVersionsControl();
  } else {
    document.addEventListener("CrafterCMS.CodebaseBridgeReady", bootTranslationVersionsControl, { once: true });
  }
})();
