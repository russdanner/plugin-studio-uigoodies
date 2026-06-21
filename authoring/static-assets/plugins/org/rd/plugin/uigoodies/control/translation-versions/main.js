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
    var MULTI_LOCALE_CODES = ["en", "es", "ja", "zh"];
    var LOCALE_META = {
      en: {
        label: "English",
        flag: "\uD83C\uDDFA\uD83C\uDDF8"
      },
      es: {
        label: "Spanish",
        flag: "\uD83C\uDDEA\uD83C\uDDF8"
      },
      ja: {
        label: "Japanese",
        flag: "\uD83C\uDDEF\uD83C\uDDF5"
      },
      zh: {
        label: "Chinese",
        flag: "\uD83C\uDDE8\uD83C\uDDF3"
      },
      ar: {
        label: "Arabic",
        flag: "\uD83C\uDDF8\uD83C\uDDE6"
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
      }, [compareSourcePath, authoringBase, siteId, formPath, form, controlContainerEl]);
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
          gap: "20px",
          width: "100%",
          boxSizing: "border-box"
        }
      }, React.createElement("div", null, React.createElement("h3", {
        style: {
          margin: 0,
          padding: 0,
          fontSize: "16px",
          fontWeight: 600,
          color: "#212529",
          letterSpacing: "-0.01em",
          lineHeight: 1.3
        }
      }, "Translations"), pathLayoutNote), React.createElement("div", {
        style: {
          width: "100%",
          minWidth: 0
        }
      }, compareLayoutBody)), removeTranslationModalEl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3BhY2thZ2VzL3RyYW5zbGF0aW9uLXZlcnNpb25zL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBib290VHJhbnNsYXRpb25WZXJzaW9uc0NvbnRyb2woKSB7XG4gIHZhciBSZWFjdCA9IENyYWZ0ZXJDTVNOZXh0LlJlYWN0O1xuXG4gIHZhciBSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyA9IHtcbiAgICB3ZWJzaXRlOiAxLFxuICAgIGNvbXBvbmVudHM6IDEsXG4gICAgXCJzdGF0aWMtYXNzZXRzXCI6IDEsXG4gICAgdGVtcGxhdGVzOiAxLFxuICAgIHNjcmlwdHM6IDEsXG4gICAgY29uZmlnOiAxXG4gIH07XG5cbiAgLyoqIEtlZXAgaW4gc3luYyB3aXRoIHRyYW5zbGF0aW9uLWNvbXBvbmVudHMgYGNvbmZpZy9tdWx0aUxvY2FsZUNvbmZpZy50c2AuICovXG4gIHZhciBCQVNFX0xPQ0FMRSA9IFwiZW5cIjtcbiAgdmFyIE1VTFRJX0xPQ0FMRV9DT0RFUyA9IFtcImVuXCIsIFwiZXNcIiwgXCJqYVwiLCBcInpoXCJdO1xuICB2YXIgTE9DQUxFX01FVEEgPSB7XG4gICAgZW46IHsgbGFiZWw6IFwiRW5nbGlzaFwiLCBmbGFnOiBcIlxcdUQ4M0NcXHVEREZBXFx1RDgzQ1xcdURERjhcIiB9LFxuICAgIGVzOiB7IGxhYmVsOiBcIlNwYW5pc2hcIiwgZmxhZzogXCJcXHVEODNDXFx1RERFQVxcdUQ4M0NcXHVEREY4XCIgfSxcbiAgICBqYTogeyBsYWJlbDogXCJKYXBhbmVzZVwiLCBmbGFnOiBcIlxcdUQ4M0NcXHVEREVGXFx1RDgzQ1xcdURERjVcIiB9LFxuICAgIHpoOiB7IGxhYmVsOiBcIkNoaW5lc2VcIiwgZmxhZzogXCJcXHVEODNDXFx1RERFOFxcdUQ4M0NcXHVEREYzXCIgfSxcbiAgICBhcjogeyBsYWJlbDogXCJBcmFiaWNcIiwgZmxhZzogXCJcXHVEODNDXFx1RERGOFxcdUQ4M0NcXHVEREU2XCIgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDcmFmdGVyIGZvcm1zLWVuZ2luZSBsYXlzIG91dCBzZWN0aW9ucyBhcyBgLnBhbmVsLnBhbmVsLWRlZmF1bHRgIGNoaWxkcmVuIG9mIGAucGFuZWwtZ3JvdXBgXG4gICAqIChzdGFuZGFyZCBmb3JtKSBvciB1c2VzIGAjaWNlLWNvbnRhaW5lcmAgKElDRSkuIFJlcGFyZW50IHRoaXMgZmllbGQncyBgLmNzdHVkaW8tZm9ybS1maWVsZC1jb250YWluZXJgXG4gICAqIHNvIGl0IGFsd2F5cyByZW5kZXJzIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZmlyc3Qgc2VjdGlvbiBjb250YWluZXIsIG5vIG1hdHRlciB3aGVyZSB0aGUgZmllbGRcbiAgICogYXBwZWFycyBpbiB0aGUgZm9ybSBkZWZpbml0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gcGluVHJhbnNsYXRpb25WZXJzaW9uc0ZpZWxkVG9Ub3BPZkZvcm0oZm9ybSwgY29udGFpbmVyRWwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFmb3JtIHx8ICFjb250YWluZXJFbCB8fCB0eXBlb2YgY29udGFpbmVyRWwuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb250YWluZXJFbC5jbG9zZXN0KFwiLmNzdHVkaW8tZm9ybS1yZXBlYXQtY29udGFpbmVyXCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHJvdyA9IGNvbnRhaW5lckVsLmNsb3Nlc3QoXCIuY3N0dWRpby1mb3JtLWZpZWxkLWNvbnRhaW5lclwiKTtcbiAgICAgIGlmICghcm93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZm9ybS5zZWN0aW9ucyB8fCBmb3JtLnNlY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZmlyc3RTZWN0aW9uID0gZm9ybS5zZWN0aW9uc1swXTtcbiAgICAgIGlmICghZmlyc3RTZWN0aW9uIHx8ICFmaXJzdFNlY3Rpb24uY29udGFpbmVyRWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWFya2VyID0gZmlyc3RTZWN0aW9uLmNvbnRhaW5lckVsO1xuICAgICAgdmFyIHBhcmVudCA9IG1hcmtlci5wYXJlbnROb2RlO1xuICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocm93LnBhcmVudE5vZGUgPT09IHBhcmVudCAmJiByb3cubmV4dFNpYmxpbmcgPT09IG1hcmtlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocm93LCBtYXJrZXIpO1xuICAgICAgcm93LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTJweFwiO1xuICAgICAgcm93LnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRpb24tdHJhbnNsYXRpb24tdmVyc2lvbnMtcGlubmVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgLyoqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxudWxsfSAqL1xuICBmdW5jdGlvbiBmaW5kRm9ybUZpZWxkc0NvbXBhcmVIb3N0KGZvcm0sIGNvbnRyb2xDb250YWluZXJFbCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZm9ybSAmJiBmb3JtLnNlY3Rpb25zICYmIGZvcm0uc2VjdGlvbnNbMF0gJiYgZm9ybS5zZWN0aW9uc1swXS5jb250YWluZXJFbCkge1xuICAgICAgICB2YXIgc2VjID0gZm9ybS5zZWN0aW9uc1swXS5jb250YWluZXJFbDtcbiAgICAgICAgaWYgKHNlYy5jbG9zZXN0KSB7XG4gICAgICAgICAgLyoqIFByZWZlciBgLnBhbmVsLWdyb3VwYCBvdmVyIGAjaWNlLWNvbnRhaW5lcmAgc28gd2Ugd3JhcCBhY2NvcmRpb24gc2VjdGlvbnMgb25seSwgbm90IHRoZSB3aG9sZSBJQ0Ugc2hlbGwgKGZpeGVzIGNvbnRyb2xzIGxpa2UgZmlsZS1uYW1lIC8gWEIpLiAqL1xuICAgICAgICAgIHZhciBwZyA9IHNlYy5jbG9zZXN0KFwiLnBhbmVsLWdyb3VwXCIpO1xuICAgICAgICAgIGlmIChwZykgcmV0dXJuIHBnO1xuICAgICAgICAgIHZhciBpY2UgPSBzZWMuY2xvc2VzdChcIiNpY2UtY29udGFpbmVyXCIpO1xuICAgICAgICAgIGlmIChpY2UpIHJldHVybiBpY2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlYy5wYXJlbnROb2RlICYmIHNlYy5wYXJlbnROb2RlLm5vZGVUeXBlID09PSAxID8gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKHNlYy5wYXJlbnROb2RlKSA6IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoY29udHJvbENvbnRhaW5lckVsICYmIGNvbnRyb2xDb250YWluZXJFbC5jbG9zZXN0KSB7XG4gICAgICAgIHZhciBwZzIgPSBjb250cm9sQ29udGFpbmVyRWwuY2xvc2VzdChcIi5wYW5lbC1ncm91cFwiKTtcbiAgICAgICAgaWYgKHBnMikgcmV0dXJuIHBnMjtcbiAgICAgICAgdmFyIGljZTIgPSBjb250cm9sQ29udGFpbmVyRWwuY2xvc2VzdChcIiNpY2UtY29udGFpbmVyXCIpO1xuICAgICAgICBpZiAoaWNlMikgcmV0dXJuIGljZTI7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZTIpIHt9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaG9zdCB8fCBob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZCAhPT0gXCIxXCIpIHJldHVybjtcbiAgICAgIHZhciByb3cgPSBob3N0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgaWYgKCFyb3cgfHwgIXJvdy5jbGFzc0xpc3QgfHwgIXJvdy5jbGFzc0xpc3QuY29udGFpbnMoXCJ0cmFuc2xhdGlvbi1mb3JtLWNvbXBhcmUtcm93XCIpKSB7XG4gICAgICAgIGRlbGV0ZSBob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG1haW4gPSByb3cucXVlcnlTZWxlY3RvcihcIi50cmFuc2xhdGlvbi1mb3JtLWNvbXBhcmUtbWFpblwiKTtcbiAgICAgIGlmIChtYWluKSB7XG4gICAgICAgIHdoaWxlIChtYWluLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICBob3N0LmFwcGVuZENoaWxkKG1haW4uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGhvc3QucmVtb3ZlQ2hpbGQocm93KTtcbiAgICAgIGRlbGV0ZSBob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZDtcbiAgICB9IGNhdGNoIChlMykge31cbiAgfVxuXG4gIHZhciBTTUFSVENPUFlfQ09NUEFSRV9XSURUSF9MUyA9IFwidHJhbnNsYXRpb25Tb3VyY2VDb21wYXJlV2lkdGhQeFwiO1xuXG4gIGZ1bmN0aW9uIGFwcGx5U291cmNlUGFuZVdpZHRoUHgobGVmdEVsLCB0b3RhbFJvd1dpZHRoUHgsIHdpZHRoUHgpIHtcbiAgICB2YXIgbWluVyA9IDIwMDtcbiAgICB2YXIgbWF4VyA9IE1hdGgubWF4KG1pblcgKyA4MCwgTWF0aC5yb3VuZCh0b3RhbFJvd1dpZHRoUHgpIC0gMjYwKTtcbiAgICB2YXIgdyA9IE1hdGgubWF4KG1pblcsIE1hdGgubWluKG1heFcsIE1hdGgucm91bmQod2lkdGhQeCkpKTtcbiAgICBsZWZ0RWwuc3R5bGUuZmxleCA9IFwiMCAwIFwiICsgdyArIFwicHhcIjtcbiAgICBsZWZ0RWwuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuICAgIGxlZnRFbC5zdHlsZS5tYXhXaWR0aCA9IFwibm9uZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEluaXRpYWxTb3VyY2VQYW5lV2lkdGhQeChob3N0V2lkdGhQeCkge1xuICAgIHZhciBtYXhBbGxvd2VkID0gTWF0aC5tYXgoMjgwLCBNYXRoLnJvdW5kKGhvc3RXaWR0aFB4KSAtIDI2MCk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBzID0gdHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTTUFSVENPUFlfQ09NUEFSRV9XSURUSF9MUyk7XG4gICAgICB2YXIgbiA9IHBhcnNlSW50KHMsIDEwKTtcbiAgICAgIGlmICghaXNOYU4obikgJiYgbiA+PSAyMDAgJiYgbiA8PSBtYXhBbGxvd2VkKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUwKSB7fVxuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLmZsb29yKGhvc3RXaWR0aFB4ICogMC40NCksIDYwMCwgbWF4QWxsb3dlZCk7XG4gIH1cblxuICAvKiogRHJhZ2dhYmxlIHZlcnRpY2FsIHNwbGl0dGVyIGJldHdlZW4gc291cmNlIHBhbmUgYW5kIG1haW4gZm9ybSBjb2x1bW4uICovXG4gIGZ1bmN0aW9uIGF0dGFjaFNtYXJ0Y29weUNvbXBhcmVTcGxpdHRlcihyb3cpIHtcbiAgICB2YXIgc3BsaXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNwbGl0dGVyLmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tZm9ybS1jb21wYXJlLXNwbGl0dGVyXCI7XG4gICAgc3BsaXR0ZXIuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInNlcGFyYXRvclwiKTtcbiAgICBzcGxpdHRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLW9yaWVudGF0aW9uXCIsIFwidmVydGljYWxcIik7XG4gICAgc3BsaXR0ZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkRyYWcgdG8gcmVzaXplIHNvdXJjZSBwYW5lbCB3aWR0aFwiKTtcbiAgICBzcGxpdHRlci50YWJJbmRleCA9IDA7XG4gICAgc3BsaXR0ZXIuc3R5bGUuY3NzVGV4dCA9XG4gICAgICBcImZsZXg6MCAwIDEwcHg7d2lkdGg6MTBweDtjdXJzb3I6Y29sLXJlc2l6ZTthbGlnbi1zZWxmOnN0cmV0Y2g7dG91Y2gtYWN0aW9uOm5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZDojZTllY2VmO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgI2NmZDRkYjtcIjtcbiAgICBzcGxpdHRlci5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZS5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBsZWZ0RWwgPSByb3cucXVlcnlTZWxlY3RvcihcIi50cmFuc2xhdGlvbi1zb3VyY2UtY29tcGFyZS1pZnJhbWUtaG9zdFwiKTtcbiAgICAgIGlmICghbGVmdEVsKSByZXR1cm47XG4gICAgICB2YXIgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgdmFyIHN0YXJ0VyA9IGxlZnRFbC5vZmZzZXRXaWR0aDtcbiAgICAgIHZhciBtaW5XID0gMjAwO1xuICAgICAgZnVuY3Rpb24gZ2V0TWF4VygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pblcgKyA4MCwgTWF0aC5yb3VuZChyb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIC0gMjYwKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHNwbGl0dGVyLnNldFBvaW50ZXJDYXB0dXJlKGUucG9pbnRlcklkKTtcbiAgICAgIH0gY2F0Y2ggKGNhcCkge31cbiAgICAgIGZ1bmN0aW9uIG9uTW92ZShldikge1xuICAgICAgICB2YXIgZHggPSBldi5jbGllbnRYIC0gc3RhcnRYO1xuICAgICAgICB2YXIgbncgPSBzdGFydFcgKyBkeDtcbiAgICAgICAgdmFyIG1heFcgPSBnZXRNYXhXKCk7XG4gICAgICAgIGlmIChudyA8IG1pblcpIG53ID0gbWluVztcbiAgICAgICAgaWYgKG53ID4gbWF4VykgbncgPSBtYXhXO1xuICAgICAgICBsZWZ0RWwuc3R5bGUuZmxleCA9IFwiMCAwIFwiICsgbncgKyBcInB4XCI7XG4gICAgICAgIGxlZnRFbC5zdHlsZS53aWR0aCA9IG53ICsgXCJweFwiO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG9uTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgb25VcCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIG9uVXApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNwbGl0dGVyLnJlbGVhc2VQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgIH0gY2F0Y2ggKHJlbCkge31cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU01BUlRDT1BZX0NPTVBBUkVfV0lEVEhfTFMsIFN0cmluZyhsZWZ0RWwub2Zmc2V0V2lkdGgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7fVxuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIG9uVXApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJjYW5jZWxcIiwgb25VcCk7XG4gICAgfSk7XG4gICAgcm93LmFwcGVuZENoaWxkKHNwbGl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHJlYWQtb25seSBzb3VyY2UgaWZyYW1lIHRvIHRoZSBsZWZ0IG9mIGFsbCBjdXJyZW50IGZvcm0gZmllbGRzIChzZWN0aW9ucyArIHBpbm5lZCB3aWRnZXRzKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlmcmFtZVNyY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aExhYmVsXG4gICAqL1xuICBmdW5jdGlvbiB3cmFwRm9ybUNvbXBhcmVMYXlvdXQoaG9zdCwgaWZyYW1lU3JjLCBwYXRoTGFiZWwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFob3N0IHx8ICFpZnJhbWVTcmMpIHJldHVybjtcbiAgICAgIGlmIChob3N0LmRhdGFzZXQudHJhbnNsYXRpb25Db21wYXJlV3JhcHBlZCA9PT0gXCIxXCIpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nSWZyYW1lID0gaG9zdC5xdWVyeVNlbGVjdG9yKFwiLnRyYW5zbGF0aW9uLXNvdXJjZS1jb21wYXJlLWlmcmFtZS1ob3N0IGlmcmFtZVwiKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nSWZyYW1lKSB7XG4gICAgICAgICAgZXhpc3RpbmdJZnJhbWUuc3JjID0gaWZyYW1lU3JjO1xuICAgICAgICAgIGV4aXN0aW5nSWZyYW1lLnN0eWxlLmNzc1RleHQgPVxuICAgICAgICAgICAgXCJmbGV4OjEgMSBhdXRvO21pbi1oZWlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JvcmRlcjoxcHggc29saWQgI2NmZDRkYjtib3JkZXItcmFkaXVzOjZweDtiYWNrZ3JvdW5kOiNmZmY7Ym94LXNpemluZzpib3JkZXItYm94O1wiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlRWwgPSBob3N0LnF1ZXJ5U2VsZWN0b3IoXCIudHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtcGF0aFwiKTtcbiAgICAgICAgaWYgKGNvZGVFbCkgY29kZUVsLnRleHRDb250ZW50ID0gcGF0aExhYmVsIHx8IFwiXCI7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgcm93LmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tZm9ybS1jb21wYXJlLXJvd1wiO1xuICAgICAgcm93LnN0eWxlLmNzc1RleHQgPVxuICAgICAgICBcImRpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24taXRlbXM6c3RyZXRjaDtnYXA6OHB4O3dpZHRoOjEwMCU7bWluLWhlaWdodDowO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcblxuICAgICAgdmFyIGhvc3RXID0gaG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5pbm5lcldpZHRoIDogODAwKSB8fCA4MDA7XG4gICAgICB2YXIgbGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBsZWZ0LmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtaWZyYW1lLWhvc3RcIjtcbiAgICAgIGxlZnQuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgIFwiZmxleDowIDAgYXV0bztkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo4cHg7bWluLWhlaWdodDowO2FsaWduLXNlbGY6c3RyZXRjaDtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCI7XG4gICAgICBhcHBseVNvdXJjZVBhbmVXaWR0aFB4KGxlZnQsIGhvc3RXLCByZWFkSW5pdGlhbFNvdXJjZVBhbmVXaWR0aFB4KGhvc3RXKSk7XG5cbiAgICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPVxuICAgICAgICBcImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjhweDtmbGV4LXdyYXA6d3JhcDtmbGV4LXNocmluazowO1wiO1xuICAgICAgdmFyIHRpdGxlQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGl0bGVCbG9jay5zdHlsZS5taW5XaWR0aCA9IFwiMFwiO1xuICAgICAgdmFyIHN0cm9uZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIik7XG4gICAgICBzdHJvbmcuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjEycHg7Y29sb3I6IzIxMjUyOTtcIjtcbiAgICAgIHN0cm9uZy50ZXh0Q29udGVudCA9IFwiU291cmNlIChyZWFkLW9ubHkpXCI7XG4gICAgICB0aXRsZUJsb2NrLmFwcGVuZENoaWxkKHN0cm9uZyk7XG4gICAgICB2YXIgc3ViID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHN1Yi5jbGFzc05hbWUgPSBcInRleHQtbXV0ZWRcIjtcbiAgICAgIHN1Yi5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MTBweDttYXJnaW4tdG9wOjJweDt3b3JkLWJyZWFrOmJyZWFrLWFsbDtcIjtcbiAgICAgIHZhciBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNvZGVcIik7XG4gICAgICBjb2RlLmNsYXNzTmFtZSA9IFwidHJhbnNsYXRpb24tc291cmNlLWNvbXBhcmUtcGF0aFwiO1xuICAgICAgY29kZS5zdHlsZS5jc3NUZXh0ID0gXCJmb250LXNpemU6MTBweDtcIjtcbiAgICAgIGNvZGUudGV4dENvbnRlbnQgPSBwYXRoTGFiZWwgfHwgXCJcIjtcbiAgICAgIHN1Yi5hcHBlbmRDaGlsZChjb2RlKTtcbiAgICAgIHRpdGxlQmxvY2suYXBwZW5kQ2hpbGQoc3ViKTtcbiAgICAgIHZhciBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjbG9zZUJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgIGNsb3NlQnRuLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiO1xuICAgICAgY2xvc2VCdG4udGV4dENvbnRlbnQgPSBcIkNsb3NlXCI7XG4gICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInRyYW5zbGF0aW9uOmNsb3NlLXNvdXJjZS1jb21wYXJlXCIpKTtcbiAgICAgICAgfSBjYXRjaCAoZTQpIHt9XG4gICAgICB9KTtcbiAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZUJsb2NrKTtcbiAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgICAgaWZyYW1lLnRpdGxlID0gXCJTb3VyY2UgaXRlbSDigJQgcmVhZC1vbmx5IGZvcm1cIjtcbiAgICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVTcmM7XG4gICAgICBpZnJhbWUuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgIFwiZmxleDoxIDEgYXV0bzttaW4taGVpZ2h0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtib3JkZXI6MXB4IHNvbGlkICNjZmQ0ZGI7Ym9yZGVyLXJhZGl1czo2cHg7YmFja2dyb3VuZDojZmZmO2JveC1zaXppbmc6Ym9yZGVyLWJveDtcIjtcbiAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuICAgICAgdmFyIG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWFpbi5jbGFzc05hbWUgPSBcInRyYW5zbGF0aW9uLWZvcm0tY29tcGFyZS1tYWluXCI7XG4gICAgICBtYWluLnN0eWxlLmNzc1RleHQgPSBcImZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowO3dpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O1wiO1xuICAgICAgd2hpbGUgKGhvc3QuZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGhvc3QuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICByb3cuYXBwZW5kQ2hpbGQobGVmdCk7XG4gICAgICBhdHRhY2hTbWFydGNvcHlDb21wYXJlU3BsaXR0ZXIocm93KTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChtYWluKTtcbiAgICAgIGhvc3QuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgIGhvc3QuZGF0YXNldC50cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkID0gXCIxXCI7XG4gICAgfSBjYXRjaCAoZTUpIHt9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2NhbGVMaXN0KCkge1xuICAgIHJldHVybiBbXG4gICAgICBcImVuXCIsXG4gICAgICBcImVzXCIsXG4gICAgICBcImphXCIsXG4gICAgICBcInpoXCIsXG4gICAgICBcInVzXCIsXG4gICAgICBcInVrXCIsXG4gICAgICBcImRlXCIsXG4gICAgICBcImZyXCIsXG4gICAgICBcIml0XCIsXG4gICAgICBcImRrXCIsXG4gICAgICBcImZpXCIsXG4gICAgICBcIm5sXCIsXG4gICAgICBcIm5vXCIsXG4gICAgICBcInJ1XCIsXG4gICAgICBcInNlXCIsXG4gICAgICBcImJyXCIsXG4gICAgICBcImVsXCIsXG4gICAgICBcImpwXCIsXG4gICAgICBcInB0XCIsXG4gICAgICBcImtvXCIsXG4gICAgICBcImFyXCIsXG4gICAgICBcInBsXCIsXG4gICAgICBcInRyXCIsXG4gICAgICBcInZpXCJcbiAgICBdO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxlRnJvbVBhdGgocGF0aCkge1xuICAgIGlmICghcGF0aCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHBhcnRzID0gcGF0aFxuICAgICAgLnJlcGxhY2UoL15cXC9zaXRlXFwvW14vXStcXC8vaSwgXCJcIilcbiAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIGxpc3QgPSBnZXRMb2NhbGVMaXN0KCk7XG4gICAgdmFyIGZpcnN0ID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoUkVTRVJWRURfRklSU1RfU0VHTUVOVFNbZmlyc3RdICYmIHBhcnRzWzFdKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcGFydHNbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChsaXN0LmluZGV4T2YoY2FuZGlkYXRlKSA+PSAwKSByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgaWYgKC9eW2Etel17Mn0oLVthLXowLTldezEsOH0pPyQvaS50ZXN0KHBhcnRzWzFdKSkgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBpZiAoUkVTRVJWRURfRklSU1RfU0VHTUVOVFNbZmlyc3RdKSByZXR1cm4gXCJcIjtcbiAgICBpZiAobGlzdC5pbmRleE9mKGZpcnN0KSA+PSAwKSByZXR1cm4gZmlyc3Q7XG4gICAgaWYgKC9eW2Etel17Mn0oLVthLXowLTldezEsOH0pPyQvaS50ZXN0KHBhcnRzWzBdKSkgcmV0dXJuIGZpcnN0O1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgLyoqIFNhbWUgYXMgdHJhbnNsYXRpb24tY29tcG9uZW50cyB7QGNvZGUgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlfSAoYXIg4oaUIGFyLXNhLCB6aCDihpQgemgtY24pLiAqL1xuICBmdW5jdGlvbiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUoYSwgYikge1xuICAgIHZhciBzID0gU3RyaW5nKGEgfHwgXCJcIilcbiAgICAgIC50cmltKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgvXy9nLCBcIi1cIik7XG4gICAgdmFyIGMgPSBTdHJpbmcoYiB8fCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbiAgICBpZiAoIXMgfHwgIWMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocyA9PT0gYykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHMuc3RhcnRzV2l0aChjICsgXCItXCIpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoYy5zdGFydHNXaXRoKHMgKyBcIi1cIikpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ldGFGb3JQYXRoTG9jYWxlKGFjdGl2ZU1ldGEsIGxvYykge1xuICAgIHZhciBsayA9IFN0cmluZyhsb2MgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoYWN0aXZlTWV0YSAmJiBhY3RpdmVNZXRhW2xrXSkgcmV0dXJuIGFjdGl2ZU1ldGFbbGtdO1xuICAgIGlmICghYWN0aXZlTWV0YSkgcmV0dXJuIG51bGw7XG4gICAgZm9yICh2YXIga2V5IGluIGFjdGl2ZU1ldGEpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFjdGl2ZU1ldGEsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShsaywga2V5KSkgcmV0dXJuIGFjdGl2ZU1ldGFba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGlvbkxvY2FsZUFscmVhZHlQcmVzZW50KHRyYW5zbGF0ZWRMb2NhbGVzLCBsb2MpIHtcbiAgICB2YXIgbGsgPSBTdHJpbmcobG9jIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHRyYW5zbGF0ZWRMb2NhbGVzW2xrXSkgcmV0dXJuIHRydWU7XG4gICAgZm9yICh2YXIgc2VnIGluIHRyYW5zbGF0ZWRMb2NhbGVzKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0cmFuc2xhdGVkTG9jYWxlcywgc2VnKSkgY29udGludWU7XG4gICAgICBpZiAoIXRyYW5zbGF0ZWRMb2NhbGVzW3NlZ10pIGNvbnRpbnVlO1xuICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShzZWcsIGxrKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBOb3JtYWxpemUgcmVwbyBwYXRocyBmb3IgZXF1YWxpdHkgKHNsYXNoZXMsIG5vIHRyYWlsaW5nIHNsYXNoKS4gKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplU3R1ZGlvUGF0aChwKSB7XG4gICAgcmV0dXJuIFN0cmluZyhwIHx8IFwiXCIpXG4gICAgICAucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcbiAgICAgIC5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TXVsdGlMb2NhbGVSb290RGlyKGZ1bGxQYXRoKSB7XG4gICAgaWYgKCFmdWxsUGF0aCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG0gPSBmdWxsUGF0aC5tYXRjaCgvXihcXC9zaXRlXFwvW14vXStcXC8oPzp3ZWJzaXRlfGNvbXBvbmVudHMpKSg/PVxcL3wkKS9pKTtcbiAgICBpZiAobSkgcmV0dXJuIG1bMV07XG4gICAgbSA9IGZ1bGxQYXRoLm1hdGNoKC9eKFxcL3NpdGVcXC8oPzp3ZWJzaXRlfGNvbXBvbmVudHMpKSg/PVxcL3wkKS9pKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3VmZml4QWZ0ZXJMb2NhbGUoZnVsbFBhdGgsIHJvb3REaXIsIGxvY2FsZSkge1xuICAgIGlmICghZnVsbFBhdGggfHwgIXJvb3REaXIgfHwgIWxvY2FsZSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHAgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArIFwiL1wiICsgbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGxvd2VyID0gZnVsbFBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgcGwgPSBwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGxvd2VyID09PSBwbCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHByZWZpeCA9IHBsICsgXCIvXCI7XG4gICAgaWYgKGxvd2VyLnN0YXJ0c1dpdGgocHJlZml4KSkge1xuICAgICAgcmV0dXJuIGZ1bGxQYXRoLnNsaWNlKHAubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBwYXRoRm9yVGFyZ2V0TG9jYWxlKHJvb3REaXIsIGxvY2FsZSwgc3VmZml4KSB7XG4gICAgdmFyIHIgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB2YXIgc3VmID0gc3VmZml4ID09PSBcIlwiID8gXCJcIiA6IHN1ZmZpeC5zdGFydHNXaXRoKFwiL1wiKSA/IHN1ZmZpeCA6IFwiL1wiICsgc3VmZml4O1xuICAgIHJldHVybiByICsgXCIvXCIgKyBsb2NhbGUudG9Mb3dlckNhc2UoKSArIHN1ZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmRlciByb290RGlyICgvc2l0ZS97aWR9L3dlYnNpdGUgb3IgLi4uL2NvbXBvbmVudHMpLCBmaXJzdCBwYXRoIHNlZ21lbnQgaXMgdGhlIGxvY2FsZSBmb2xkZXI7XG4gICAqIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhhdCBpcyB0aGUgbWlycm9yZWQgc3VmZml4IGZvciBvdGhlciBsb2NhbGVzLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpIHtcbiAgICBpZiAoIWZvcm1QYXRoIHx8ICFyb290RGlyKSByZXR1cm4geyBzdWZmaXg6IG51bGwgfTtcbiAgICB2YXIgciA9IHJvb3REaXIucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIHZhciBmcCA9IFN0cmluZyhmb3JtUGF0aCkucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XG4gICAgdmFyIHJsID0gci50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBmbCA9IGZwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGZsID09PSBybCkgcmV0dXJuIHsgc3VmZml4OiBcIlwiIH07XG4gICAgaWYgKGZsLmluZGV4T2YocmwgKyBcIi9cIikgIT09IDApIHJldHVybiB7IHN1ZmZpeDogbnVsbCB9O1xuICAgIHZhciByZXN0ID0gZnAuc2xpY2Uoci5sZW5ndGgpO1xuICAgIGlmIChyZXN0LmNoYXJBdCgwKSA9PT0gXCIvXCIpIHJlc3QgPSByZXN0LnNsaWNlKDEpO1xuICAgIHZhciBwYXJ0cyA9IHJlc3Quc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSByZXR1cm4geyBzdWZmaXg6IFwiXCIgfTtcbiAgICB2YXIgc3VmZml4UGFydHMgPSBwYXJ0cy5zbGljZSgxKTtcbiAgICBpZiAoc3VmZml4UGFydHMubGVuZ3RoID09PSAwKSByZXR1cm4geyBzdWZmaXg6IFwiXCIgfTtcbiAgICByZXR1cm4geyBzdWZmaXg6IFwiL1wiICsgc3VmZml4UGFydHMuam9pbihcIi9cIikgfTtcbiAgfVxuXG4gIC8qKiBGaXJzdCBwYXRoIHNlZ21lbnQgdW5kZXIgcm9vdERpciAodGhlIGxvY2FsZSBmb2xkZXIpLCBsb3dlcmNhc2VkLiAqL1xuICBmdW5jdGlvbiBmaXJzdExvY2FsZVNlZ21lbnRVbmRlclJvb3QocGF0aCwgcm9vdERpcikge1xuICAgIGlmICghcGF0aCB8fCAhcm9vdERpcikgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHIgPSByb290RGlyLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICB2YXIgZnAgPSBTdHJpbmcocGF0aCkucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XG4gICAgdmFyIHJsID0gci50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBmbCA9IGZwLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGZsICE9PSBybCAmJiBmbC5pbmRleE9mKHJsICsgXCIvXCIpICE9PSAwKSByZXR1cm4gXCJcIjtcbiAgICB2YXIgcmVzdCA9IGZsID09PSBybCA/IFwiXCIgOiBmcC5zbGljZShyLmxlbmd0aCk7XG4gICAgaWYgKHJlc3QuY2hhckF0KDApID09PSBcIi9cIikgcmVzdCA9IHJlc3Quc2xpY2UoMSk7XG4gICAgdmFyIHNlZyA9IHJlc3Quc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKVswXSB8fCBcIlwiO1xuICAgIHJldHVybiBTdHJpbmcoc2VnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqIExvY2FsZXMgdGhhdCBhbHJlYWR5IGhhdmUgYSB0cmFuc2xhdGlvbiBpdGVtIChmcm9tIHJlcG8gcGF0aHMgdW5kZXIgcm9vdERpcikuICovXG4gIGZ1bmN0aW9uIGV4aXN0aW5nVHJhbnNsYXRpb25Mb2NhbGVLZXlzKHBhdGhzLCByb290RGlyLCBmb3JtUGF0aCkge1xuICAgIHZhciBrZXlzID0ge307XG4gICAgZnVuY3Rpb24gYWRkKHApIHtcbiAgICAgIHZhciBrID0gZmlyc3RMb2NhbGVTZWdtZW50VW5kZXJSb290KHAsIHJvb3REaXIpO1xuICAgICAgaWYgKGspIGtleXNba10gPSB0cnVlO1xuICAgIH1cbiAgICBhZGQoZm9ybVBhdGgpO1xuICAgIChwYXRocyB8fCBbXSkuZm9yRWFjaChhZGQpO1xuICAgIHJldHVybiBrZXlzO1xuICB9XG5cbiAgLyoqIFN0dWRpbyAvYXBpLzEvY29udGVudC9jb250ZW50LWV4aXN0cyDigJQgdW53cmFwIGNvbW1vbiByZXNwb25zZSBzaGFwZXMuICovXG4gIGZ1bmN0aW9uIHBhcnNlQ29udGVudEV4aXN0c1BheWxvYWQoYm9keSkge1xuICAgIGlmICghYm9keSkgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBjID0gYm9keS5jb250ZW50O1xuICAgIGlmIChjID09IG51bGwgJiYgYm9keS5yZXNwb25zZSkgYyA9IGJvZHkucmVzcG9uc2UuY29udGVudDtcbiAgICBpZiAoYyA9PSBudWxsICYmIGJvZHkucmVzdWx0KSBjID0gYm9keS5yZXN1bHQuY29udGVudDtcbiAgICBpZiAoYyA9PSBudWxsKSBjID0gYm9keS5leGlzdHM7XG4gICAgaWYgKHR5cGVvZiBjID09PSBcImJvb2xlYW5cIikgcmV0dXJuIGM7XG4gICAgaWYgKHR5cGVvZiBjID09PSBcInN0cmluZ1wiKSByZXR1cm4gU3RyaW5nKGMpLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiO1xuICAgIGlmICh0eXBlb2YgYyA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGMgIT09IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEF1dGhvcmluZyBiYXNlIGZvciAvYXBpLzEvc2VydmljZXMvYXBpLzEvY29udGVudC8uLi4gKHByZWYgcHJvcCBtYXkgYmUgZW1wdHkgb24gZmlyc3QgcGFpbnQpLiAqL1xuICBmdW5jdGlvbiByZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UocHJlZikge1xuICAgIHZhciBhID0gcHJlZiAmJiBTdHJpbmcocHJlZikucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIGlmIChhKSByZXR1cm4gYTtcbiAgICB0cnkge1xuICAgICAgYSA9IGdldEF1dGhvcmluZ0Jhc2UoKSAmJiBTdHJpbmcoZ2V0QXV0aG9yaW5nQmFzZSgpKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChhKSByZXR1cm4gYTtcbiAgICByZXR1cm4gKGdldFN0dWRpb0FwaUJhc2UoKSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBdXRob3JpbmdCYXNlKCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgY21zID0gd2luZG93LmNyYWZ0ZXJjbXM7XG4gICAgICBpZiAoY21zICYmIHR5cGVvZiBjbXMuZ2V0U3RvcmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgc3RvcmUgPSBjbXMuZ2V0U3RvcmUoKTtcbiAgICAgICAgaWYgKHN0b3JlICYmIHR5cGVvZiBzdG9yZS5nZXRTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdmFyIGVudiA9IHN0b3JlLmdldFN0YXRlKCkuZW52IHx8IHt9O1xuICAgICAgICAgIGlmIChlbnYuYXV0aG9yaW5nQmFzZSkgcmV0dXJuIGVudi5hdXRob3JpbmdCYXNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKiBTdHVkaW8gUkVTVCBiYXNlIChlLmcuIGh0dHBzOi8vaG9zdC9zdHVkaW8pIGZvciAvYXBpLzIvLi4uICovXG4gIGZ1bmN0aW9uIGdldFN0dWRpb0FwaUJhc2UoKSB7XG4gICAgdmFyIGIgPSBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgaWYgKGIpIHJldHVybiBiLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAodHlwZW9mIENTdHVkaW9BdXRob3JpbmdDb250ZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIENTdHVkaW9BdXRob3JpbmdDb250ZXh0LmJhc2VVcmkpIHtcbiAgICAgIHJldHVybiBTdHJpbmcoQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQuYmFzZVVyaSkucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIHRyYW5zcG9ydCBhcyBUcmFuc2xhdGlvbiAoYGFwcHMvdHJhbnNsYXRpb24vaW5kZXguanNgKTogYGNyYWZ0ZXJjbXMudXRpbHMuYWpheGBcbiAgICogbWVyZ2VzIEF1dGhvcml6YXRpb24gKEpXVCkgYW5kIG90aGVyIGdsb2JhbCBoZWFkZXJzIOKAlCByYXcgYGZldGNoYCBnZXRzIDQwMSBvbiBgL2FwaS8yLy4uLmAuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRDcmFmdGVyU3R1ZGlvQWpheCgpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGNtcyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmNyYWZ0ZXJjbXM7XG4gICAgICBpZiAoY21zICYmIGNtcy51dGlscyAmJiBjbXMudXRpbHMuYWpheCkge1xuICAgICAgICByZXR1cm4gY21zLnV0aWxzLmFqYXg7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRmV0Y2hIZWFkZXJzKGV4dHJhKSB7XG4gICAgdmFyIG91dCA9IE9iamVjdC5hc3NpZ24oe30sIGV4dHJhIHx8IHt9KTtcbiAgICB0cnkge1xuICAgICAgdmFyIGFqYXggPSBnZXRDcmFmdGVyU3R1ZGlvQWpheCgpO1xuICAgICAgaWYgKGFqYXggJiYgdHlwZW9mIGFqYXguZ2V0R2xvYmFsSGVhZGVycyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0LCBhamF4LmdldEdsb2JhbEhlYWRlcnMoKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB2YXIgbSA9XG4gICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQuY29va2llLm1hdGNoKC8oPzpefDtcXHMqKVhTUkYtVE9LRU49KFteO10rKS8pO1xuICAgIGlmIChtICYmICFvdXRbXCJYLVhTUkYtVE9LRU5cIl0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG91dFtcIlgtWFNSRi1UT0tFTlwiXSA9IGRlY29kZVVSSUNvbXBvbmVudChtWzFdKTtcbiAgICAgIH0gY2F0Y2ggKGUyKSB7fVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gdW53cmFwQWpheFJlc3BvbnNlKHJlcykge1xuICAgIGlmICghcmVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHJlcy5yZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzLnJlc3BvbnNlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgZnVuY3Rpb24gc3R1ZGlvQWpheEdldCh1cmwpIHtcbiAgICB2YXIgYWpheCA9IGdldENyYWZ0ZXJTdHVkaW9BamF4KCk7XG4gICAgaWYgKGFqYXggJiYgdHlwZW9mIGFqYXguZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGFqYXguZ2V0KHVybCkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgcmVzb2x2ZShyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgaGVhZGVyczogbWVyZ2VGZXRjaEhlYWRlcnMoeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuanNvbigpLnRoZW4oZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiByLnN0YXR1cywgcmVzcG9uc2U6IGpzb24gfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwYXJhbSBib2R5IHN0cmluZyBvciBvYmplY3QgKG9iamVjdCBpcyBKU09OLnN0cmluZ2lmaWVkKSAqL1xuICBmdW5jdGlvbiBzdHVkaW9BamF4UG9zdCh1cmwsIGJvZHksIGhlYWRlcnMpIHtcbiAgICB2YXIgYWpheCA9IGdldENyYWZ0ZXJTdHVkaW9BamF4KCk7XG4gICAgdmFyIHBheWxvYWQgPVxuICAgICAgYm9keSAhPSBudWxsICYmIHR5cGVvZiBib2R5ID09PSBcIm9iamVjdFwiID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiBib2R5ICE9IG51bGwgPyBTdHJpbmcoYm9keSkgOiBcIlwiO1xuICAgIHZhciBoID0gT2JqZWN0LmFzc2lnbih7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSwgaGVhZGVycyB8fCB7fSk7XG4gICAgaWYgKHR5cGVvZiBib2R5ID09PSBcIm9iamVjdFwiICYmIGJvZHkgIT0gbnVsbCAmJiAhaFtcIkNvbnRlbnQtVHlwZVwiXSkge1xuICAgICAgaFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICAgIH1cbiAgICBpZiAoYWpheCAmJiB0eXBlb2YgYWpheC5wb3N0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGFqYXgucG9zdCh1cmwsIHBheWxvYWQsIGgpLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBoZWFkZXJzOiBtZXJnZUZldGNoSGVhZGVycyhoKSxcbiAgICAgIGJvZHk6IHBheWxvYWRcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5qc29uKCkudGhlbihmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4geyBzdGF0dXM6IHIuc3RhdHVzLCByZXNwb25zZToganNvbiB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bndyYXBQbHVnaW5TY3JpcHRSZXN1bHRCb2R5KGJvZHkpIHtcbiAgICB2YXIgcCA9IGJvZHkgJiYgYm9keS5yZXN1bHQgIT09IHVuZGVmaW5lZCA/IGJvZHkucmVzdWx0IDogYm9keTtcbiAgICBpZiAocCAmJiB0eXBlb2YgcCA9PT0gXCJvYmplY3RcIiAmJiBwLnJlc3VsdCAhPSBudWxsICYmIHAub2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcCA9IHAucmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gcCAmJiB0eXBlb2YgcCA9PT0gXCJvYmplY3RcIiA/IHAgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hUcmFuc2xhdGlvblJlbW92ZUNhbmRpZGF0ZXMoc3R1ZGlvQmFzZSwgc2l0ZUlkLCBwYWdlUGF0aCkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKHN0dWRpb0Jhc2UgfHwgXCJcIikucmVwbGFjZSgvXFwvJC8sIFwiXCIpICtcbiAgICAgIFwiL2FwaS8yL3BsdWdpbi9zY3JpcHQvcGx1Z2lucy9vcmcvcmQvcGx1Z2luL3VpZ29vZGllcy90cmFuc2xhdGlvbi1yZW1vdmUtY2FuZGlkYXRlcy5wb3N0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheFBvc3QodXJsLCB7IHBhZ2VQYXRoOiBwYWdlUGF0aCB9LCB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgcCA9IHVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkoYm9keSk7XG4gICAgICAgIHJldHVybiBwIHx8IHsgb2s6IGZhbHNlLCBtZXNzYWdlOiBcIkVtcHR5IHJlc3BvbnNlXCIsIGNhbmRpZGF0ZXM6IFtdIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc3RUcmFuc2xhdGlvblJlbW92ZShzdHVkaW9CYXNlLCBzaXRlSWQsIHBhZ2VQYXRoLCBjb21wb25lbnRQYXRocywgZGVsZXRlUGFnZSkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKHN0dWRpb0Jhc2UgfHwgXCJcIikucmVwbGFjZSgvXFwvJC8sIFwiXCIpICtcbiAgICAgIFwiL2FwaS8yL3BsdWdpbi9zY3JpcHQvcGx1Z2lucy9vcmcvcmQvcGx1Z2luL3VpZ29vZGllcy90cmFuc2xhdGlvbi1yZW1vdmUucG9zdD9zaXRlSWQ9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCk7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KFxuICAgICAgdXJsLFxuICAgICAge1xuICAgICAgICBwYWdlUGF0aDogcGFnZVBhdGgsXG4gICAgICAgIGNvbXBvbmVudFBhdGhzOiBjb21wb25lbnRQYXRocyB8fCBbXSxcbiAgICAgICAgZGVsZXRlUGFnZTogZGVsZXRlUGFnZSAhPT0gZmFsc2VcbiAgICAgIH0sXG4gICAgICB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cbiAgICApXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgcCA9IHVud3JhcFBsdWdpblNjcmlwdFJlc3VsdEJvZHkoYm9keSk7XG4gICAgICAgIHJldHVybiBwIHx8IHsgb2s6IGZhbHNlLCBkZWxldGVkOiBbXSwgZmFpbGVkOiBbeyBwYXRoOiBcIlwiLCBtZXNzYWdlOiBcIkVtcHR5IHJlc3BvbnNlXCIgfV0gfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIFBhZ2UgaXRlbXMgb25seSAobm90IGNvbXBvbmVudHMgZm9sZGVyKTogc2hvdyBSZW1vdmUgdHJhbnNsYXRpb24gaW5zdGVhZCBvZiBvbmx5IOKLriBmb3Igbm9uLXNvdXJjZSByb3dzLiAqL1xuICBmdW5jdGlvbiBpc1BhZ2VUcmFuc2xhdGlvblJvdyh0YXJnZXRQYXRoLCBjb250ZW50VHlwZUlkKSB7XG4gICAgdmFyIGN0ID0gU3RyaW5nKGNvbnRlbnRUeXBlSWQgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChjdC5pbmRleE9mKFwiL3BhZ2UvXCIpID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgcCA9IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCkudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gcC5pbmRleE9mKFwiL3dlYnNpdGUvXCIpID49IDAgJiYgcC5lbmRzV2l0aChcIi54bWxcIik7XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0UGF0aHNGcm9tU2VhcmNoSXRlbXMoaXRlbXMpIHtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgaWYgKCFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoKSByZXR1cm4gb3V0O1xuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBwID0gaXRlbS5wYXRoIHx8IGl0ZW0ubG9jYWxJZCB8fCAoaXRlbS5pdGVtICYmIChpdGVtLml0ZW0ucGF0aCB8fCBpdGVtLml0ZW0ubG9jYWxJZCkpO1xuICAgICAgaWYgKHAgJiYgb3V0LmluZGV4T2YocCkgPT09IC0xKSBvdXQucHVzaChwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0dWRpbyBPcGVuU2VhcmNoOiBmaW5kIGFsbCBpbmRleGVkIGl0ZW1zIHNoYXJpbmcgdGhlIHNhbWUgdHJhbnNsYXRpb24gbGluZWFnZSBpZC5cbiAgICovXG4gIGZ1bmN0aW9uIGV4dHJhY3RQYXRoc0Zyb21QbHVnaW5SZXN1bHQoYm9keSkge1xuICAgIHZhciBwYXlsb2FkID0gYm9keSAmJiBib2R5LnJlc3VsdDtcbiAgICBpZiAocGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIiAmJiBwYXlsb2FkLnJlc3VsdCAhPSBudWxsICYmIHBheWxvYWQub2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGF5bG9hZCA9IHBheWxvYWQucmVzdWx0O1xuICAgIH1cbiAgICBpZiAoIXBheWxvYWQgfHwgdHlwZW9mIHBheWxvYWQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHBheWxvYWQgPSBib2R5ICYmIGJvZHkucmVzcG9uc2UgJiYgYm9keS5yZXNwb25zZS5yZXN1bHQ7XG4gICAgfVxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC5vaykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgaXRlbXMgPSBwYXlsb2FkLml0ZW1zIHx8IFtdO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdCkge1xuICAgICAgdmFyIHAgPSBpdCAmJiAoaXQubG9jYWxJZCB8fCBpdC5wYXRoKTtcbiAgICAgIGlmIChwICYmIG91dC5pbmRleE9mKHApID09PSAtMSkge1xuICAgICAgICBvdXQucHVzaChwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZpZXcgT3BlblNlYXJjaCAocGx1Z2luIEdyb292eSk6IHNhbWUgY29udGVudC10eXBlIGFuZCBsb2NhbGVTb3VyY2VJZF9zIG1hdGNoaW5nIGxpbmVhZ2Ugb3Igb2JqZWN0SWQuXG4gICAqL1xuICBmdW5jdGlvbiBmZXRjaFRyYW5zbGF0aW9uU2libGluZ3NGcm9tUGx1Z2luKHN0dWRpb0Jhc2UsIHNpdGVJZCwgY29udGVudFR5cGUsIGxvY2FsZVNvdXJjZUlkLCBvYmplY3RJZCkge1xuICAgIGlmICghc3R1ZGlvQmFzZSB8fCAhc2l0ZUlkIHx8ICFjb250ZW50VHlwZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIHZhciBsaWQgPSBsb2NhbGVTb3VyY2VJZCAmJiBTdHJpbmcobG9jYWxlU291cmNlSWQpLnRyaW0oKTtcbiAgICB2YXIgb2lkID0gb2JqZWN0SWQgJiYgU3RyaW5nKG9iamVjdElkKS50cmltKCk7XG4gICAgaWYgKCFsaWQgJiYgIW9pZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgc3R1ZGlvQmFzZSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tc2libGluZ3MucG9zdD9zaXRlSWQ9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImY29udGVudFR5cGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhjb250ZW50VHlwZSkudHJpbSgpKSArXG4gICAgICBcIiZsb2NhbGVTb3VyY2VJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQobGlkIHx8IFwiXCIpICtcbiAgICAgIFwiJm9iamVjdElkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChvaWQgfHwgXCJcIik7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KHVybCwgXCJcIiwgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgICAudGhlbih1bndyYXBBamF4UmVzcG9uc2UpXG4gICAgICAudGhlbihleHRyYWN0UGF0aHNGcm9tUGx1Z2luUmVzdWx0KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2hQYXRoc0J5TG9jYWxlU291cmNlSWQoc3R1ZGlvQmFzZSwgc2l0ZUlkLCBsb2NhbGVTb3VyY2VJZCkge1xuICAgIGlmICghc3R1ZGlvQmFzZSB8fCAhc2l0ZUlkIHx8ICFsb2NhbGVTb3VyY2VJZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgc3R1ZGlvQmFzZSArIFwiL2FwaS8yL3NlYXJjaC9zZWFyY2guanNvbj9zaXRlSWQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICBmdW5jdGlvbiBwb3N0U2VhcmNoKGJvZHkpIHtcbiAgICAgIHJldHVybiBzdHVkaW9BamF4UG9zdCh1cmwsIGJvZHksIHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSkudGhlbihcbiAgICAgICAgdW53cmFwQWpheFJlc3BvbnNlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcG9zdFNlYXJjaCh7XG4gICAgICBrZXl3b3JkczogXCJcIixcbiAgICAgIG9mZnNldDogMCxcbiAgICAgIGxpbWl0OiAyMDAsXG4gICAgICBmaWx0ZXJzOiB7XG4gICAgICAgIGxvY2FsZVNvdXJjZUlkX3M6IFtTdHJpbmcobG9jYWxlU291cmNlSWQpLnRyaW0oKV1cbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gKGJvZHkucmVzcG9uc2UgJiYgYm9keS5yZXNwb25zZS5yZXN1bHQgJiYgYm9keS5yZXNwb25zZS5yZXN1bHQuaXRlbXMpIHx8IFtdO1xuICAgICAgICB2YXIgcGF0aHMgPSBleHRyYWN0UGF0aHNGcm9tU2VhcmNoSXRlbXMoaXRlbXMpO1xuICAgICAgICBpZiAocGF0aHMubGVuZ3RoID4gMCkgcmV0dXJuIHBhdGhzO1xuICAgICAgICByZXR1cm4gcG9zdFNlYXJjaCh7XG4gICAgICAgICAga2V5d29yZHM6IFN0cmluZyhsb2NhbGVTb3VyY2VJZCkudHJpbSgpLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBsaW1pdDogMjAwXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGJvZHkyKSB7XG4gICAgICAgICAgdmFyIGl0ZW1zMiA9IChib2R5Mi5yZXNwb25zZSAmJiBib2R5Mi5yZXNwb25zZS5yZXN1bHQgJiYgYm9keTIucmVzcG9uc2UucmVzdWx0Lml0ZW1zKSB8fCBbXTtcbiAgICAgICAgICByZXR1cm4gZXh0cmFjdFBhdGhzRnJvbVNlYXJjaEl0ZW1zKGl0ZW1zMik7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZmxhZ0ZvckxvY2FsZUNvZGUobG9jYWxlQ29kZSkge1xuICAgIHZhciBrID0gU3RyaW5nKGxvY2FsZUNvZGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIWspIHJldHVybiBcIlxcdUQ4M0NcXHVERjEwXCI7XG4gICAgdmFyIG1hcCA9IHtcbiAgICAgIGVuOiBcIlxcdUQ4M0NcXHVEREZBXFx1RDgzQ1xcdURERjhcIixcbiAgICAgIFwiZW4tdXNcIjogXCJcXHVEODNDXFx1RERGQVxcdUQ4M0NcXHVEREY4XCIsXG4gICAgICBcImVuLWdiXCI6IFwiXFx1RDgzQ1xcdURERUNcXHVEODNDXFx1RERFN1wiLFxuICAgICAgZXM6IFwiXFx1RDgzQ1xcdURERUFcXHVEODNDXFx1RERGOFwiLFxuICAgICAgXCJlcy1lc1wiOiBcIlxcdUQ4M0NcXHVEREVBXFx1RDgzQ1xcdURERjhcIixcbiAgICAgIGRlOiBcIlxcdUQ4M0NcXHVEREU5XFx1RDgzQ1xcdURERUFcIixcbiAgICAgIFwiZGUtZGVcIjogXCJcXHVEODNDXFx1RERFOVxcdUQ4M0NcXHVEREVBXCIsXG4gICAgICB6aDogXCJcXHVEODNDXFx1RERFOFxcdUQ4M0NcXHVEREYzXCIsXG4gICAgICBjbjogXCJcXHVEODNDXFx1RERFOFxcdUQ4M0NcXHVEREYzXCIsXG4gICAgICBcInpoLWNuXCI6IFwiXFx1RDgzQ1xcdURERThcXHVEODNDXFx1RERGM1wiLFxuICAgICAgXCJ6aC10d1wiOiBcIlxcdUQ4M0NcXHVEREY5XFx1RDgzQ1xcdURERkNcIixcbiAgICAgIGphOiBcIlxcdUQ4M0NcXHVEREVGXFx1RDgzQ1xcdURERjVcIixcbiAgICAgIFwiamEtanBcIjogXCJcXHVEODNDXFx1RERFRlxcdUQ4M0NcXHVEREY1XCIsXG4gICAgICBmcjogXCJcXHVEODNDXFx1RERFQlxcdUQ4M0NcXHVEREY3XCIsXG4gICAgICBcImZyLWZyXCI6IFwiXFx1RDgzQ1xcdURERUJcXHVEODNDXFx1RERGN1wiLFxuICAgICAgaXQ6IFwiXFx1RDgzQ1xcdURERUVcXHVEODNDXFx1RERGOVwiLFxuICAgICAgXCJpdC1pdFwiOiBcIlxcdUQ4M0NcXHVEREVFXFx1RDgzQ1xcdURERjlcIixcbiAgICAgIHB0OiBcIlxcdUQ4M0NcXHVEREY1XFx1RDgzQ1xcdURERjlcIixcbiAgICAgIFwicHQtcHRcIjogXCJcXHVEODNDXFx1RERGNVxcdUQ4M0NcXHVEREY5XCIsXG4gICAgICBcInB0LWJyXCI6IFwiXFx1RDgzQ1xcdURERTdcXHVEODNDXFx1RERGN1wiLFxuICAgICAga286IFwiXFx1RDgzQ1xcdURERjBcXHVEODNDXFx1RERGN1wiLFxuICAgICAgXCJrby1rclwiOiBcIlxcdUQ4M0NcXHVEREYwXFx1RDgzQ1xcdURERjdcIixcbiAgICAgIGFyOiBcIlxcdUQ4M0NcXHVEREY4XFx1RDgzQ1xcdURERTZcIixcbiAgICAgIFwiYXItc2FcIjogXCJcXHVEODNDXFx1RERGOFxcdUQ4M0NcXHVEREU2XCIsXG4gICAgICBcImFyLWFlXCI6IFwiXFx1RDgzQ1xcdURERTZcXHVEODNDXFx1RERFQVwiLFxuICAgICAgXCJhci1lZ1wiOiBcIlxcdUQ4M0NcXHVEREVBXFx1RDgzQ1xcdURERUNcIlxuICAgIH07XG4gICAgcmV0dXJuIG1hcFtrXSB8fCBtYXBbay5zbGljZSgwLCAyKV0gfHwgXCJcXHVEODNDXFx1REYxMFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hUcmFuc2xhdGlvbkNvbmZpZyhzdHVkaW9CYXNlLCBzaXRlSWQpIHtcbiAgICBpZiAoIXN0dWRpb0Jhc2UgfHwgIXNpdGVJZCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB2YXIgdXJsID1cbiAgICAgIHN0dWRpb0Jhc2UgK1xuICAgICAgXCIvYXBpLzIvcGx1Z2luL3NjcmlwdC9wbHVnaW5zL29yZy9yZC9wbHVnaW4vdWlnb29kaWVzL3RyYW5zbGF0aW9uLWNvbmZpZy5nZXQ/c2l0ZUlkPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzaXRlSWQpO1xuICAgIHJldHVybiBzdHVkaW9BamF4R2V0KHVybClcbiAgICAgIC50aGVuKHVud3JhcEFqYXhSZXNwb25zZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIHZhciBwID0gYm9keSAmJiBib2R5LnJlc3VsdCAhPT0gdW5kZWZpbmVkID8gYm9keS5yZXN1bHQgOiBib2R5O1xuICAgICAgICBpZiAoIXAgfHwgIXAub2sgfHwgIUFycmF5LmlzQXJyYXkocC5sYW5ndWFnZXMpIHx8IHAubGFuZ3VhZ2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBjb2RlcyA9IFtdO1xuICAgICAgICB2YXIgbWV0YSA9IHt9O1xuICAgICAgICBwLmxhbmd1YWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICB2YXIgbGMgPSByb3cgJiYgcm93LmxvY2FsZSA/IFN0cmluZyhyb3cubG9jYWxlKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcbiAgICAgICAgICBpZiAoIWxjKSByZXR1cm47XG4gICAgICAgICAgaWYgKGNvZGVzLmluZGV4T2YobGMpIDwgMCkgY29kZXMucHVzaChsYyk7XG4gICAgICAgICAgbWV0YVtsY10gPSB7XG4gICAgICAgICAgICBsYWJlbDogKHJvdyAmJiByb3cubGFiZWwpIHx8IGxjLFxuICAgICAgICAgICAgZmxhZzogcm93ICYmIHJvdy5mbGFnICYmIFN0cmluZyhyb3cuZmxhZykudHJpbSgpID8gU3RyaW5nKHJvdy5mbGFnKS50cmltKCkgOiBmbGFnRm9yTG9jYWxlQ29kZShsYylcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBiYXNlUmF3ID0gcC5iYXNlTGFuZ3VhZ2UgIT0gbnVsbCAmJiBTdHJpbmcocC5iYXNlTGFuZ3VhZ2UpLnRyaW0oKSA/IFN0cmluZyhwLmJhc2VMYW5ndWFnZSkudHJpbSgpIDogXCJcIjtcbiAgICAgICAgdmFyIGJhc2VMb2NhbGUgPSBiYXNlUmF3ID8gYmFzZVJhdy50b0xvd2VyQ2FzZSgpIDogY29kZXNbMF07XG4gICAgICAgIGlmIChjb2Rlcy5pbmRleE9mKGJhc2VMb2NhbGUpIDwgMCkge1xuICAgICAgICAgIGJhc2VMb2NhbGUgPSBjb2Rlc1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJhc2VMb2NhbGU6IGJhc2VMb2NhbGUsXG4gICAgICAgICAgY29kZXM6IGNvZGVzLFxuICAgICAgICAgIG1ldGE6IG1ldGFcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICB9XG5cbiAgdmFyIFRSQU5TTEFUSU9OU19QQUdFX1NJWkUgPSA1O1xuXG4gIGZ1bmN0aW9uIGxvY2FsZUxhYmVsRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwYXRoKSB8fCBcInVua25vd25cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbSA9IExPQ0FMRV9NRVRBW2xvY107XG4gICAgcmV0dXJuIG0gJiYgbS5sYWJlbCA/IG0ubGFiZWwgOiBsb2M7XG4gIH1cblxuICAvKiogU291cmNlIGxvY2FsZSByb3cocykgZmlyc3Q7IHJlbWFpbmluZyByb3dzIEHigJNaIGJ5IGRpc3BsYXkgbGFiZWwsIHRoZW4gcGF0aC4gKi9cbiAgZnVuY3Rpb24gc29ydFRyYW5zbGF0aW9uUGF0aHNGb3JEaXNwbGF5KHBhdGhzLCBzb3VyY2VMb2NhbGVLZXkpIHtcbiAgICB2YXIgc3JjID0gKHNvdXJjZUxvY2FsZUtleSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBhcnIgPSBwYXRocy5zbGljZSgpO1xuICAgIGZ1bmN0aW9uIGlzU291cmNlUGF0aChwKSB7XG4gICAgICByZXR1cm4gISEoc3JjICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiLCBzcmMpKTtcbiAgICB9XG4gICAgYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHZhciBhcyA9IGlzU291cmNlUGF0aChhKTtcbiAgICAgIHZhciBicyA9IGlzU291cmNlUGF0aChiKTtcbiAgICAgIGlmIChhcyAmJiAhYnMpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKCFhcyAmJiBicykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIHZhciBsYSA9IGxvY2FsZUxhYmVsRm9yUGF0aChhKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGxiID0gbG9jYWxlTGFiZWxGb3JQYXRoKGIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgY21wID0gbGEubG9jYWxlQ29tcGFyZShsYiwgdW5kZWZpbmVkLCB7IHNlbnNpdGl2aXR5OiBcImJhc2VcIiB9KTtcbiAgICAgIGlmIChjbXAgIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGNtcDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcoYSkubG9jYWxlQ29tcGFyZShTdHJpbmcoYikpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJUcmFuc2xhdGlvblBhdGhzKHBhdGhzLCBxdWVyeSkge1xuICAgIHZhciBxID0gKHF1ZXJ5IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghcSkge1xuICAgICAgcmV0dXJuIHBhdGhzLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBwYXRocy5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBsYWJlbCA9IGxvY2FsZUxhYmVsRm9yUGF0aChwKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgU3RyaW5nKHApLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxKSA+PSAwIHx8XG4gICAgICAgIGxvYy5pbmRleE9mKHEpID49IDAgfHxcbiAgICAgICAgbGFiZWwuaW5kZXhPZihxKSA+PSAwXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGF0Y2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjbXMgPSB3aW5kb3cuY3JhZnRlcmNtcztcbiAgICAgIGlmIChjbXMgJiYgdHlwZW9mIGNtcy5nZXRTdG9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IGNtcy5nZXRTdG9yZSgpO1xuICAgICAgICBpZiAoc3RvcmUgJiYgdHlwZW9mIHN0b3JlLmRpc3BhdGNoID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzdG9yZS5kaXNwYXRjaC5iaW5kKHN0b3JlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudEV4aXN0cyhhdXRob3JpbmdCYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgYmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICBpZiAoIWJhc2UgfHwgIXNpdGVJZCB8fCAhcGF0aCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2NvbnRlbnQtZXhpc3RzLmpzb24/c2l0ZV9pZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKTtcbiAgICByZXR1cm4gc3R1ZGlvQWpheEdldCh1cmwpXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciBib2R5ID0gdW53cmFwQWpheFJlc3BvbnNlKHJlcyk7XG4gICAgICAgIHJldHVybiBwYXJzZUNvbnRlbnRFeGlzdHNQYXlsb2FkKGJvZHkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VUaW1lc3RhbXBNcyhpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICAgIHZhciBhc051bSA9IE51bWJlcihpbnB1dCk7XG4gICAgaWYgKGlzRmluaXRlKGFzTnVtKSAmJiBhc051bSA+IDApIHJldHVybiBhc051bTtcbiAgICB2YXIgcGFyc2VkID0gRGF0ZS5wYXJzZShTdHJpbmcoaW5wdXQpKTtcbiAgICByZXR1cm4gaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAoYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCBwYXRoKSB7XG4gICAgdmFyIGJhc2UgPSByZXNvbHZlQXV0aG9yaW5nQ29udGVudEFwaUJhc2UoYXV0aG9yaW5nQmFzZSk7XG4gICAgaWYgKCFiYXNlIHx8ICFzaXRlSWQgfHwgIXBhdGgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICAgIHZhciB1cmwgPVxuICAgICAgYmFzZSArXG4gICAgICBcIi9hcGkvMS9zZXJ2aWNlcy9hcGkvMS9jb250ZW50L2dldC1pdGVtcy10cmVlLmpzb24/c2l0ZT1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKSArXG4gICAgICBcIiZwYXRoPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChwYXRoKSArXG4gICAgICBcIiZkZXB0aD0wXCI7XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhHZXQodXJsKVxuICAgICAgLnRoZW4odW53cmFwQWpheFJlc3BvbnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBib2R5ICYmIGJvZHkuaXRlbTtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdE1vZGlmaWVkRGF0ZV9kdCkgfHxcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdE1vZGlmaWVkRGF0ZSkgfHxcbiAgICAgICAgICBwYXJzZVRpbWVzdGFtcE1zKGl0ZW0ubGFzdEVkaXREYXRlKSB8fFxuICAgICAgICAgIHBhcnNlVGltZXN0YW1wTXMoaXRlbS5tb2RpZmllZERhdGUpIHx8XG4gICAgICAgICAgcGFyc2VUaW1lc3RhbXBNcyhpdGVtLmRhdGVNb2RpZmllZCkgfHxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIFVSTCBzaGFwZSBhcyBDcmFmdGVyIFN0dWRpbyBVSSB7QGNvZGUgZ2V0RWRpdEZvcm1TcmN9IChsZWdhY3kgZm9ybSBlbmdpbmUpLCByZWFkLW9ubHkgZm9yIHNvdXJjZSBjb21wYXJlIGlmcmFtZS5cbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3JhZnRlcmNtcy9zdHVkaW8tdWkvYmxvYi9kZXZlbG9wL3VpL2FwcC9zcmMvdXRpbHMvcGF0aC50c1xuICAgKi9cbiAgZnVuY3Rpb24gYnVpbGRMZWdhY3lSZWFkb25seUZvcm1TcmMoYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCBwYXRoKSB7XG4gICAgdmFyIGJhc2UgPSBTdHJpbmcoYXV0aG9yaW5nQmFzZSB8fCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBpZiAoIWJhc2UgfHwgIXNpdGVJZCB8fCAhcGF0aCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBiYXNlICtcbiAgICAgIFwiL2xlZ2FjeS9mb3JtP3NpdGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImcGF0aD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQocGF0aCkgK1xuICAgICAgXCImcmVhZG9ubHk9dHJ1ZVwiICtcbiAgICAgIFwiJmlzSGlkZGVuPWZhbHNlXCJcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gbm90aWZ5RGlzcGF0Y2goZGlzcGF0Y2gsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIWRpc3BhdGNoIHx8IG1lc3NhZ2UgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiU0hPV19TWVNURU1fTk9USUZJQ0FUSU9OXCIsIHBheWxvYWQ6IHsgbWVzc2FnZTogU3RyaW5nKG1lc3NhZ2UpIH0gfSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIC8qKiBPcGVucyBTdHVkaW8gZm9ybSBlZGl0b3IgZm9yIGBwYXRoYCAoc2FtZSBwYXlsb2FkIGFzIFRyYW5zbGF0aW9uIFJlYWN0IGhlbHBlcnMpLiAqL1xuICBmdW5jdGlvbiBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgcGF0aCwgYXV0aG9yaW5nQmFzZUZvckRpYWxvZykge1xuICAgIGlmICghZGlzcGF0Y2ggfHwgIXNpdGVJZCB8fCAhcGF0aCkgcmV0dXJuO1xuICAgIHZhciBhYiA9IFN0cmluZyhhdXRob3JpbmdCYXNlRm9yRGlhbG9nIHx8IGdldEF1dGhvcmluZ0Jhc2UoKSB8fCBcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gICAgaWYgKCFhYikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwiU0hPV19FRElUX0RJQUxPR1wiLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2l0ZTogc2l0ZUlkLFxuICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgYXV0aG9yaW5nQmFzZTogYWIsXG4gICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgICAgIG9uU2F2ZVN1Y2Nlc3M6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiQkFUQ0hfQUNUSU9OU1wiLFxuICAgICAgICAgICAgcGF5bG9hZDogW1xuICAgICAgICAgICAgICB7IHR5cGU6IFwiRElTUEFUQ0hfRE9NX0VWRU5UXCIsIHBheWxvYWQ6IHsgaWQ6IFwiZWRpdERpYWxvZ1N1Y2Nlc3NcIiB9IH0sXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJTSE9XX0VESVRfSVRFTV9TVUNDRVNTX05PVElGSUNBVElPTlwiIH0sXG4gICAgICAgICAgICAgIHsgdHlwZTogXCJDTE9TRV9FRElUX0RJQUxPR1wiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2FuY2VsOiB7XG4gICAgICAgICAgICB0eXBlOiBcIkJBVENIX0FDVElPTlNcIixcbiAgICAgICAgICAgIHBheWxvYWQ6IFtcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkNMT1NFX0VESVRfRElBTE9HXCIgfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiBcIkRJU1BBVENIX0RPTV9FVkVOVFwiLCBwYXlsb2FkOiB7IGlkOiBcImVkaXREaWFsb2dEaXNtaXNzZWRcIiB9IH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICAvKipcbiAgICogQ29weSBzb3VyY2UgZm9yIFRyYW5zbGF0aW9uIHRyYW5zbGF0ZTogcGx1Z2luLWNvbmZpZyBiYXNlIGxhbmd1YWdlIHBhdGggd2hlbiBsYXlvdXQgc3VwcG9ydHMgaXQsXG4gICAqIGVsc2UgbGVnYWN5IHNvdXJjZSBsb2NhbGUgZnJvbSBjb250ZW50IHRyZWUgcGF0aHMgLyBjdXJyZW50IGZvcm0uXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlVHJhbnNsYXRlQ29weVNvdXJjZVBhdGgodHJhbnNsYXRpb25DZmcsIHJvb3REaXIsIHN1ZmZpeCwgdHJhbnNsYXRpb25QYXRocywgZm9ybVBhdGgsIHJlc29sdmVkU291cmNlS2V5KSB7XG4gICAgaWYgKHRyYW5zbGF0aW9uQ2ZnICYmIHRyYW5zbGF0aW9uQ2ZnLmJhc2VMb2NhbGUgJiYgcm9vdERpciAhPSBudWxsICYmIHN1ZmZpeCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBTdHJpbmcodHJhbnNsYXRpb25DZmcuYmFzZUxvY2FsZSkudG9Mb3dlckNhc2UoKSwgc3VmZml4KTtcbiAgICB9XG4gICAgdmFyIGZyb21Tb3VyY2VMb2NhbGUgPVxuICAgICAgKHRyYW5zbGF0aW9uUGF0aHMgfHwgW10pLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgfSkgfHwgZm9ybVBhdGg7XG4gICAgcmV0dXJuIGZyb21Tb3VyY2VMb2NhbGUgfHwgZm9ybVBhdGg7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weShwKSB7XG4gICAgdmFyIGkgPSBwLmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICBpZiAoaSA8PSAwKSByZXR1cm4gXCIvXCI7XG4gICAgcmV0dXJuIHAuc2xpY2UoMCwgaSkgfHwgXCIvXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkZXRlY3RMb2NhbGVGb2xkZXJOYW1lc0ZvclNpdGUoY2hpbGRQYXRocywgcm9vdERpciwgbG9jYWxlQ29kZXMpIHtcbiAgICB2YXIgcHJlZml4ID0gcm9vdERpci5lbmRzV2l0aChcIi9cIikgPyByb290RGlyIDogcm9vdERpciArIFwiL1wiO1xuICAgIHZhciBsb2NhbGVTZXQgPSB7fTtcbiAgICB2YXIgY29kZXMgPSBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGggPyBsb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIChjaGlsZFBhdGhzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICBpZiAoIXAgfHwgcC5pbmRleE9mKHByZWZpeCkgIT09IDApIHJldHVybjtcbiAgICAgIHZhciByZXN0ID0gcC5zbGljZShwcmVmaXgubGVuZ3RoKTtcbiAgICAgIHZhciBzZWcgPSByZXN0LnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbilbMF07XG4gICAgICB2YXIgbWF0Y2hlZCA9XG4gICAgICAgIHNlZyAmJlxuICAgICAgICBjb2Rlcy5zb21lKGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShzZWcsIGNvZGUpO1xuICAgICAgICB9KTtcbiAgICAgIGlmIChtYXRjaGVkICYmICFzZWVuW3NlZy50b0xvd2VyQ2FzZSgpXSkge1xuICAgICAgICBzZWVuW3NlZy50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICAgIG5hbWVzLnB1c2goc2VnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmFtZXM7XG4gIH1cblxuICBmdW5jdGlvbiBpc011bHRpTG9jYWxlRm9sZGVyU2V0KG5hbWVzKSB7XG4gICAgaWYgKCFuYW1lcyB8fCBuYW1lcy5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFN0cmluZyhuYW1lc1tpXSkudG9Mb3dlckNhc2UoKSA9PT0gQkFTRV9MT0NBTEUudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBtdWx0aS1sb2NhbGUgaXMgY29uZmlybWVkIGZyb20gZXhpc3RpbmcgZm9sZGVycywgbGlzdCBldmVyeSBNVUxUSV9MT0NBTEVfQ09ERVMgdGFyZ2V0XG4gICAqICh1c2UgcmVwbyBmb2xkZXIgY2FzaW5nIHdoZW4gcHJlc2VudCwgZWxzZSB0aGUgY29kZSBlLmcuIGphIHNvIEphcGFuZXNlIGFwcGVhcnMgYmVmb3JlIC9qYSBleGlzdHMpLlxuICAgKi9cbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBmcm9tVHJhbnNsYXRpb25Db25maWc/OiBib29sZWFuIH19IFtvcHRzXVxuICAgKiAgIFdoZW4gZnJvbVRyYW5zbGF0aW9uQ29uZmlnIGFuZCB0cmFuc2xhdGlvbi1jb25maWcueG1sIGxpc3RzIDIrIGxvY2FsZXMsIHJldHVybiBvcmRlcmVkIGNvZGVzXG4gICAqICAgZXZlbiBpZiBmZXdlciB0aGFuIHR3byBsb2NhbGUgZm9sZGVycyBleGlzdCBvbiBkaXNrIHlldCAoYXV0aG9ycyBjYW4gdHJhbnNsYXRlIGludG8gbWlzc2luZyB0cmVlcykuXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlTG9jYWxlRm9sZGVyc09yZGVyZWRGcm9tUGF0aHMoY2hpbGRQYXRocywgcm9vdERpciwgbG9jYWxlQ29kZXMsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgZnJvbVRyYW5zbGF0aW9uQ29uZmlnID0gISFvcHRzLmZyb21UcmFuc2xhdGlvbkNvbmZpZztcbiAgICB2YXIgYWN0aXZlQ29kZXMgPSBsb2NhbGVDb2RlcyAmJiBsb2NhbGVDb2Rlcy5sZW5ndGggPyBsb2NhbGVDb2RlcyA6IE1VTFRJX0xPQ0FMRV9DT0RFUztcbiAgICB2YXIgbmFtZXMgPSBkZXRlY3RMb2NhbGVGb2xkZXJOYW1lc0ZvclNpdGUoY2hpbGRQYXRocywgcm9vdERpciwgYWN0aXZlQ29kZXMpO1xuICAgIGlmICghaXNNdWx0aUxvY2FsZUZvbGRlclNldChuYW1lcykpIHtcbiAgICAgIGlmICghZnJvbVRyYW5zbGF0aW9uQ29uZmlnIHx8IGFjdGl2ZUNvZGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBvcmRlcmVkID0gW107XG4gICAgYWN0aXZlQ29kZXMuZm9yRWFjaChmdW5jdGlvbiAoY29kZSkge1xuICAgICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShuYW1lc1tpXSwgY29kZSkpIHtcbiAgICAgICAgICBtYXRjaCA9IG5hbWVzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvcmRlcmVkLnB1c2gobWF0Y2ggfHwgY29kZSk7XG4gICAgfSk7XG4gICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgdmFyIGluQ2ZnID0gYWN0aXZlQ29kZXMuc29tZShmdW5jdGlvbiAoYykge1xuICAgICAgICByZXR1cm4gbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKG4sIGMpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIWluQ2ZnKSBvcmRlcmVkLnB1c2gobik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9yZGVyZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGlsZHJlblBhdGhzVHJlZShiYXNlLCBzaXRlSWQsIHBhdGgpIHtcbiAgICB2YXIgdXJsID1cbiAgICAgIGJhc2UgK1xuICAgICAgXCIvYXBpLzEvc2VydmljZXMvYXBpLzEvY29udGVudC9nZXQtaXRlbXMtdHJlZS5qc29uP3NpdGU9XCIgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVJZCkgK1xuICAgICAgXCImcGF0aD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQocGF0aCkgK1xuICAgICAgXCImZGVwdGg9MVwiO1xuICAgIHJldHVybiBzdHVkaW9BamF4R2V0KHVybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdmFyIGJvZHkgPSB1bndyYXBBamF4UmVzcG9uc2UocmVzKTtcbiAgICAgICAgdmFyIHJhdyA9IGJvZHkgJiYgYm9keS5pdGVtICYmIGJvZHkuaXRlbS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIHJhd1xuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2ggJiYgY2gucGF0aCAmJiBjaC5wYXRoICE9PSBwYXRoO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBjaC5wYXRoO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29weUl0ZW1QYXN0ZVN0dWRpbyhiYXNlLCBzaXRlSWQsIHNvdXJjZVBhdGgsIHRhcmdldFBhcmVudFBhdGgsIGV4cGVjdGVkVGFyZ2V0UGF0aCkge1xuICAgIHZhciB1cmwgPVxuICAgICAgU3RyaW5nKGJhc2UpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArXG4gICAgICBcIi9hcGkvMi9wbHVnaW4vc2NyaXB0L3BsdWdpbnMvb3JnL3JkL3BsdWdpbi91aWdvb2RpZXMvdHJhbnNsYXRpb24tY29weS5wb3N0P3NpdGVJZD1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoc2l0ZUlkKTtcbiAgICB2YXIgYm9keSA9IHtcbiAgICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGgsXG4gICAgICB0YXJnZXRQYXJlbnRQYXRoOiB0YXJnZXRQYXJlbnRQYXRoLFxuICAgICAgZXhwZWN0ZWRUYXJnZXRQYXRoOiBleHBlY3RlZFRhcmdldFBhdGggfHwgXCJcIlxuICAgIH07XG4gICAgcmV0dXJuIHN0dWRpb0FqYXhQb3N0KHVybCwgYm9keSwgeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB2YXIgYm9keSA9IHVud3JhcEFqYXhSZXNwb25zZShyZXMpO1xuICAgICAgICByZXR1cm4gYm9keSAmJiBib2R5LnJlc3VsdCAhPT0gdW5kZWZpbmVkID8gYm9keS5yZXN1bHQgOiBib2R5O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gIH1cblxuICAvKiogQ2hldnJvbiBmb3IgbmF0aXZlIHNlbGVjdCAobm8gQm9vdHN0cmFwKS4gKi9cbiAgdmFyIEFERF9UUkFOU0xBVElPTl9TRUxFQ1RfQ0hFVlJPTiA9XG4gICAgXCJkYXRhOmltYWdlL3N2Zyt4bWwsXCIgK1xuICAgIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjNjQ3NDhiXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNNiA5bDYgNiA2LTZcIi8+PC9zdmc+J1xuICAgICk7XG5cbiAgLyoqXG4gICAqIERyb3Bkb3duOiBsb2NhbGVzIHN0aWxsIG1pc3NpbmcgdGhpcyBpdGVtOyBjb3B5IHVzZXMgdGhlIHNhbWUgcGF0aCB1bmRlciB0aGUgY2hvc2VuIGxvY2FsZSBmb2xkZXIuXG4gICAqL1xuICAvKiogQHBhcmFtIHByb3BzLm9uVHJhbnNsYXRlZCBvcHRpb25hbCDigJQgY2FsbGVkIGFmdGVyIGEgc3VjY2Vzc2Z1bCBwYXN0ZSB0byByZWZldGNoIHRoZSB0cmFuc2xhdGlvbnMgbGlzdCBhYm92ZS4gKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy50cmFuc2xhdGlvbkNmZyBvcHRpb25hbCDigJQgZnJvbSBwYW5lbCBzdGF0ZSB3aGVuIEdFVCBmYWlscy4gKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy5leGlzdGluZ1BhdGhzIHRyYW5zbGF0aW9uIHNpYmxpbmcgcGF0aHMgKyBjdXJyZW50IGZvcm0gcGF0aCBjb3VudHMgYXMgZXhpc3RpbmcgY29udGVudC4gKi9cbiAgLyoqIEBwYXJhbSBwcm9wcy50cmFuc2xhdGVDb3B5U291cmNlUGF0aCByZXBvIHBhdGggdG8gY29weSBmcm9tIChiYXNlIGxhbmd1YWdlKTsgZmFsbHMgYmFjayB0byBmb3JtUGF0aCBpZiBvbWl0dGVkLiAqL1xuICBmdW5jdGlvbiBBZGRUcmFuc2xhdGlvbkxvY2FsZUJhcihwcm9wcykge1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoO1xuICAgIHZhciB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCA9IHByb3BzLnRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIHx8IGZvcm1QYXRoO1xuICAgIHZhciBzaXRlSWQgPSBwcm9wcy5zaXRlSWQ7XG4gICAgdmFyIGRpc3BhdGNoID0gcHJvcHMuZGlzcGF0Y2g7XG4gICAgdmFyIGF1dGhvcmluZ0Jhc2UgPSBwcm9wcy5hdXRob3JpbmdCYXNlIHx8IFwiXCI7XG4gICAgdmFyIHJvb3REaXIgPSBwcm9wcy5yb290RGlyO1xuICAgIHZhciBzdWZmaXggPSBwcm9wcy5zdWZmaXg7XG4gICAgdmFyIGV4aXN0aW5nUGF0aHMgPSBwcm9wcy5leGlzdGluZ1BhdGhzIHx8IFtdO1xuICAgIHZhciBvblRyYW5zbGF0ZWQgPSBwcm9wcy5vblRyYW5zbGF0ZWQ7XG4gICAgdmFyIHRyYW5zbGF0aW9uQ2ZnUHJvcCA9IHByb3BzLnRyYW5zbGF0aW9uQ2ZnO1xuICAgIHZhciBsb2NhbGVDb2RlcyA9IHByb3BzLmxvY2FsZUNvZGVzICYmIHByb3BzLmxvY2FsZUNvZGVzLmxlbmd0aCA/IHByb3BzLmxvY2FsZUNvZGVzIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgIHZhciBsb2NhbGVNZXRhID0gcHJvcHMubG9jYWxlTWV0YSB8fCBMT0NBTEVfTUVUQTtcblxuICAgIHZhciBvcHRTdCA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdFN0WzBdO1xuICAgIHZhciBzZXRPcHRpb25zID0gb3B0U3RbMV07XG4gICAgdmFyIHNlbFN0ID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIHNlbGVjdGVkID0gc2VsU3RbMF07XG4gICAgdmFyIHNldFNlbGVjdGVkID0gc2VsU3RbMV07XG4gICAgdmFyIGxvYWRTdCA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICB2YXIgbG9hZGluZyA9IGxvYWRTdFswXTtcbiAgICB2YXIgc2V0TG9hZGluZyA9IGxvYWRTdFsxXTtcbiAgICB2YXIgYnVzeVN0ID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIHZhciBjb3B5QnVzeSA9IGJ1c3lTdFswXTtcbiAgICB2YXIgc2V0Q29weUJ1c3kgPSBidXN5U3RbMV07XG4gICAgdmFyIGZvY3VzU2VsU3QgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgdmFyIHNlbGVjdEZvY3VzZWQgPSBmb2N1c1NlbFN0WzBdO1xuICAgIHZhciBzZXRTZWxlY3RGb2N1c2VkID0gZm9jdXNTZWxTdFsxXTtcblxuICAgIC8qKiBTdXBwb3J0ZWQgbG9jYWxlcyBmcm9tIGNvbmZpZyBtaW51cyBsb2NhbGVzIGFscmVhZHkgcHJlc2VudCBpbiBmb3JtUGF0aCArIHRyYW5zbGF0aW9uUGF0aHMgKG5vIGNvbnRlbnQtZXhpc3RzKS4gKi9cbiAgICB2YXIgbG9hZFRhcmdldHMgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFmb3JtUGF0aCB8fCAhc2l0ZUlkIHx8ICFyb290RGlyKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlZmZTdWZmaXggPSBzdWZmaXg7XG4gICAgICAgIGlmIChlZmZTdWZmaXggPT0gbnVsbCkge1xuICAgICAgICAgIGVmZlN1ZmZpeCA9IHBhcnNlU3VmZml4RnJvbUZvcm1QYXRoKGZvcm1QYXRoLCByb290RGlyKS5zdWZmaXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVmZlN1ZmZpeCA9PSBudWxsKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHZhciBzdHVkaW9CYXNlID0gZ2V0U3R1ZGlvQXBpQmFzZSgpO1xuICAgICAgICBmdW5jdGlvbiBhcHBseUNvZGVzKGFjdGl2ZU1ldGEsIHJhd0NvZGVzKSB7XG4gICAgICAgICAgdmFyIHNlZW4gPSB7fTtcbiAgICAgICAgICB2YXIgYWN0aXZlQ29kZXMgPSBbXTtcbiAgICAgICAgICAocmF3Q29kZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHZhciBzID0gU3RyaW5nKGMgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgayA9IHMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWVuW2tdKSByZXR1cm47XG4gICAgICAgICAgICBzZWVuW2tdID0gdHJ1ZTtcbiAgICAgICAgICAgIGFjdGl2ZUNvZGVzLnB1c2gocyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFhY3RpdmVDb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhbnNsYXRlZExvY2FsZXMgPSBleGlzdGluZ1RyYW5zbGF0aW9uTG9jYWxlS2V5cyhleGlzdGluZ1BhdGhzLCByb290RGlyLCBmb3JtUGF0aCk7XG4gICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgIGFjdGl2ZUNvZGVzLmZvckVhY2goZnVuY3Rpb24gKGxvYykge1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0aW9uTG9jYWxlQWxyZWFkeVByZXNlbnQodHJhbnNsYXRlZExvY2FsZXMsIGxvYykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0YXJnZXRQYXRoID0gcGF0aEZvclRhcmdldExvY2FsZShyb290RGlyLCBsb2MsIGVmZlN1ZmZpeCk7XG4gICAgICAgICAgICB2YXIgbWV0YSA9IGFjdGl2ZU1ldGFbbGtdIHx8IHtcbiAgICAgICAgICAgICAgbGFiZWw6IGxvYyxcbiAgICAgICAgICAgICAgZmxhZzogZmxhZ0ZvckxvY2FsZUNvZGUobG9jKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG91dC5wdXNoKHtcbiAgICAgICAgICAgICAgbG9jYWxlOiBsb2MsXG4gICAgICAgICAgICAgIGxhYmVsOiBtZXRhLmxhYmVsLFxuICAgICAgICAgICAgICBmbGFnOiBtZXRhLmZsYWcgfHwgXCJcXHVEODNDXFx1REYxMFwiLFxuICAgICAgICAgICAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICBleGlzdHM6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRPcHRpb25zKG91dCk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaFRyYW5zbGF0aW9uQ29uZmlnKHN0dWRpb0Jhc2UsIHNpdGVJZClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZmV0Y2hlZCkge1xuICAgICAgICAgICAgdmFyIHJhd0NvZGVzID1cbiAgICAgICAgICAgICAgZmV0Y2hlZCAmJiBmZXRjaGVkLmNvZGVzICYmIGZldGNoZWQuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyBmZXRjaGVkLmNvZGVzXG4gICAgICAgICAgICAgICAgOiB0cmFuc2xhdGlvbkNmZ1Byb3AgJiYgdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgID8gdHJhbnNsYXRpb25DZmdQcm9wLmNvZGVzXG4gICAgICAgICAgICAgICAgICA6IGxvY2FsZUNvZGVzICYmIGxvY2FsZUNvZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2FsZUNvZGVzXG4gICAgICAgICAgICAgICAgICAgIDogTVVMVElfTE9DQUxFX0NPREVTO1xuICAgICAgICAgICAgdmFyIGFjdGl2ZU1ldGEgPVxuICAgICAgICAgICAgICAoZmV0Y2hlZCAmJiBmZXRjaGVkLm1ldGEpIHx8XG4gICAgICAgICAgICAgICh0cmFuc2xhdGlvbkNmZ1Byb3AgJiYgdHJhbnNsYXRpb25DZmdQcm9wLm1ldGEpIHx8XG4gICAgICAgICAgICAgIGxvY2FsZU1ldGE7XG4gICAgICAgICAgICByZXR1cm4gYXBwbHlDb2RlcyhhY3RpdmVNZXRhLCByYXdDb2Rlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJhd0NvZGVzID1cbiAgICAgICAgICAgICAgdHJhbnNsYXRpb25DZmdQcm9wICYmIHRyYW5zbGF0aW9uQ2ZnUHJvcC5jb2RlcyAmJiB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyB0cmFuc2xhdGlvbkNmZ1Byb3AuY29kZXNcbiAgICAgICAgICAgICAgICA6IGxvY2FsZUNvZGVzICYmIGxvY2FsZUNvZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgPyBsb2NhbGVDb2Rlc1xuICAgICAgICAgICAgICAgICAgOiBNVUxUSV9MT0NBTEVfQ09ERVM7XG4gICAgICAgICAgICB2YXIgYWN0aXZlTWV0YSA9ICh0cmFuc2xhdGlvbkNmZ1Byb3AgJiYgdHJhbnNsYXRpb25DZmdQcm9wLm1ldGEpIHx8IGxvY2FsZU1ldGE7XG4gICAgICAgICAgICByZXR1cm4gYXBwbHlDb2RlcyhhY3RpdmVNZXRhLCByYXdDb2Rlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBbZm9ybVBhdGgsIHNpdGVJZCwgcm9vdERpciwgc3VmZml4LCBleGlzdGluZ1BhdGhzLCBsb2NhbGVDb2RlcywgbG9jYWxlTWV0YSwgdHJhbnNsYXRpb25DZmdQcm9wXVxuICAgICk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRUYXJnZXRzKCk7XG4gICAgICB9LFxuICAgICAgW2xvYWRUYXJnZXRzXVxuICAgICk7XG5cbiAgICB2YXIgcnVuVHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNvcHlCdXN5IHx8ICFzZWxlY3RlZCB8fCAhZGlzcGF0Y2ggfHwgIWZvcm1QYXRoKSByZXR1cm47XG4gICAgICB2YXIgY2hvaWNlID0gbnVsbDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAob3B0aW9uc1tpXS5sb2NhbGUgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgY2hvaWNlID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFjaG9pY2UpIHJldHVybjtcbiAgICAgIGlmIChjaG9pY2UuZXhpc3RzKSB7XG4gICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIkEgdHJhbnNsYXRpb24gYWxyZWFkeSBleGlzdHMgYXQgXCIgKyBjaG9pY2UudGFyZ2V0UGF0aCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldENvcHlCdXN5KHRydWUpO1xuICAgICAgdmFyIHBhcmVudCA9IHBhcmVudEZvbGRlclBhdGhGb3JDb3B5KGNob2ljZS50YXJnZXRQYXRoKTtcbiAgICAgIHZhciBjb250ZW50QXBpQmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICAgIHJldHVybiBjb3B5SXRlbVBhc3RlU3R1ZGlvKGNvbnRlbnRBcGlCYXNlLCBzaXRlSWQsIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoLCBwYXJlbnQsIGNob2ljZS50YXJnZXRQYXRoKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5vaykge1xuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goXG4gICAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgICAocmVzICYmIHJlcy5tZXNzYWdlKSB8fCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRDb3B5QnVzeShmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZWQgdG8gXCIgKyBjaG9pY2UubGFiZWwgKyBcIjogXCIgKyBjaG9pY2UudGFyZ2V0UGF0aCk7XG4gICAgICAgICAgc2V0U2VsZWN0ZWQoXCJcIik7XG4gICAgICAgICAgb3BlblN0dWRpb0VkaXRGb3JtKGRpc3BhdGNoLCBzaXRlSWQsIGNob2ljZS50YXJnZXRQYXRoLCBhdXRob3JpbmdCYXNlKTtcbiAgICAgICAgICBpZiAodHlwZW9mIG9uVHJhbnNsYXRlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBvblRyYW5zbGF0ZWQoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUxKSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbG9hZFRhcmdldHMoKS5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldENvcHlCdXN5KGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJUcmFuc2xhdGUgZmFpbGVkLlwiKTtcbiAgICAgICAgICBzZXRDb3B5QnVzeShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZWZmZWN0aXZlTWlycm9yZWRTdWZmaXggPVxuICAgICAgc3VmZml4ICE9IG51bGwgPyBzdWZmaXggOiByb290RGlyICYmIGZvcm1QYXRoID8gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpLnN1ZmZpeCA6IG51bGw7XG5cbiAgICB2YXIgaGludCA9IFwiXCI7XG4gICAgaWYgKCFkaXNwYXRjaCkgaGludCA9IFwiU3R1ZGlvIGFjdGlvbnMgcmVxdWlyZSBhbiBhY3RpdmUgc2Vzc2lvbi5cIjtcbiAgICBlbHNlIGlmICghZm9ybVBhdGggfHwgIXNpdGVJZCkgaGludCA9IFwiTWlzc2luZyBwYXRoIG9yIHNpdGUuXCI7XG4gICAgZWxzZSBpZiAoIXJvb3REaXIgfHwgZWZmZWN0aXZlTWlycm9yZWRTdWZmaXggPT0gbnVsbClcbiAgICAgIGhpbnQgPSBcIlBhdGggbGF5b3V0IGRvZXMgbm90IHN1cHBvcnQgbWlycm9yZWQgbG9jYWxlIGNvcHkgZm9yIHRoaXMgaXRlbS5cIjtcbiAgICBlbHNlIGlmICghcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpKVxuICAgICAgaGludCA9IFwiTG9hZGluZyBhdXRob3JpbmcgY29udGV4dFxcdTIwMjZcIjtcbiAgICBlbHNlIGlmICghbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMClcbiAgICAgIGhpbnQgPSBcIkFsbCBjb25maWd1cmVkIGxvY2FsZXMgYWxyZWFkeSBoYXZlIGEgdHJhbnNsYXRpb24gYXQgdGhpcyBwYXRoLlwiO1xuXG4gICAgdmFyIHNlbGVjdERpc2FibGVkID1cbiAgICAgIGxvYWRpbmcgfHxcbiAgICAgIGNvcHlCdXN5IHx8XG4gICAgICBvcHRpb25zLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgIWRpc3BhdGNoIHx8XG4gICAgICAhcm9vdERpciB8fFxuICAgICAgZWZmZWN0aXZlTWlycm9yZWRTdWZmaXggPT0gbnVsbCB8fFxuICAgICAgIXJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcblxuICAgIHZhciBzZWxlY3RTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICBtaW5IZWlnaHQ6IFwiNDJweFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCBcIiArIChzZWxlY3RGb2N1c2VkICYmICFzZWxlY3REaXNhYmxlZCA/IFwiIzNiODJmNlwiIDogXCIjZTJlOGYwXCIpLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIHBhZGRpbmc6IFwiMTBweCAxNHB4XCIsXG4gICAgICBwYWRkaW5nUmlnaHQ6IFwiNDRweFwiLFxuICAgICAgZm9udFNpemU6IFwiMTRweFwiLFxuICAgICAgbGluZUhlaWdodDogMS40NSxcbiAgICAgIGNvbG9yOiBcIiMwZjE3MmFcIixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZWN0RGlzYWJsZWQgPyBcIiNmOGZhZmNcIiA6IFwiI2ZmZmZmZlwiLFxuICAgICAgYm94U2hhZG93OlxuICAgICAgICBzZWxlY3RGb2N1c2VkICYmICFzZWxlY3REaXNhYmxlZFxuICAgICAgICAgID8gXCIwIDAgMCAzcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuMilcIlxuICAgICAgICAgIDogXCJpbnNldCAwIDFweCAycHggcmdiYSgxNSwgMjMsIDQyLCAwLjA0KVwiLFxuICAgICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgICBjdXJzb3I6IHNlbGVjdERpc2FibGVkID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICBvcGFjaXR5OiBzZWxlY3REaXNhYmxlZCA/IDAuODggOiAxLFxuICAgICAgYXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBXZWJraXRBcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIE1vekFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiJyArIEFERF9UUkFOU0xBVElPTl9TRUxFQ1RfQ0hFVlJPTiArICdcIiknLFxuICAgICAgYmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIixcbiAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogXCJyaWdodCAxMnB4IGNlbnRlclwiLFxuICAgICAgYmFja2dyb3VuZFNpemU6IFwiMjBweCAyMHB4XCIsXG4gICAgICB0cmFuc2l0aW9uOiBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2VcIlxuICAgIH07XG5cbiAgICB2YXIgYWN0aW9uc1Jvd1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgIHBhZGRpbmc6IFwiMTRweCAxNnB4XCIsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZThlYWVkXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmOGZhZmMgMTAwJSlcIixcbiAgICAgIGJveFNoYWRvdzogXCIwIDFweCAzcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA2KVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuICAgIH07XG5cbiAgICB2YXIgc2VsZWN0V3JhcFN0eWxlID0ge1xuICAgICAgZmxleDogXCIxIDEgMjIwcHhcIixcbiAgICAgIG1pbldpZHRoOiBcIjIwMHB4XCIsXG4gICAgICBtYXhXaWR0aDogXCIxMDAlXCJcbiAgICB9O1xuXG4gICAgdmFyIGJ0bkljb25TdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgIHdpZHRoOiBcIjQycHhcIixcbiAgICAgIGhlaWdodDogXCI0MnB4XCIsXG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2UyZThmMFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjZmZmZmZmXCIsXG4gICAgICBjb2xvcjogXCIjNDc1NTY5XCIsXG4gICAgICBjdXJzb3I6IGNvcHlCdXN5IHx8IGxvYWRpbmcgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIGZvbnRTaXplOiBcIjIwcHhcIixcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYm94U2hhZG93OiBcIjAgMXB4IDJweCByZ2JhKDE1LCAyMywgNDIsIDAuMDQpXCIsXG4gICAgICB0cmFuc2l0aW9uOiBcImJhY2tncm91bmQgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2VcIlxuICAgIH07XG5cbiAgICB2YXIgYnRuUHJpbWFyeVN0eWxlID0ge1xuICAgICAgcGFkZGluZzogXCIxMXB4IDIwcHhcIixcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgYmFja2dyb3VuZDogY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCA/IFwiIzk0YTNiOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICBmb250U2l6ZTogXCIxM3B4XCIsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDJlbVwiLFxuICAgICAgY3Vyc29yOiBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYm94U2hhZG93OlxuICAgICAgICBjb3B5QnVzeSB8fCAhc2VsZWN0ZWQgfHwgIWRpc3BhdGNoID8gXCJub25lXCIgOiBcIjAgMXB4IDJweCByZ2JhKDM3LCA5OSwgMjM1LCAwLjM1KVwiLFxuICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZVwiXG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtYXJnaW5Ub3A6IFwiOHB4XCIgfSB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IFwiIzIxMjUyOVwiLCBtYXJnaW5Cb3R0b206IFwiOHB4XCIgfSB9LFxuICAgICAgICBcIlRyYW5zbGF0ZVwiXG4gICAgICApLFxuICAgICAgaGludFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsIGxpbmVIZWlnaHQ6IDEuNDUgfSB9LFxuICAgICAgICAgICAgaGludFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdHlsZTogYWN0aW9uc1Jvd1N0eWxlIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0eWxlOiBzZWxlY3RXcmFwU3R5bGUgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJzZWxlY3RcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHNlbGVjdFN0eWxlLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogc2VsZWN0RGlzYWJsZWQsXG4gICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbkZvY3VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0Rm9jdXNlZCh0cnVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb25CbHVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0Rm9jdXNlZChmYWxzZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIlRhcmdldCBsb2NhbGUgZm9yIHRyYW5zbGF0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcIm9wdGlvblwiLFxuICAgICAgICAgICAgICB7IHZhbHVlOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGxvYWRpbmcgPyBcIkxvYWRpbmdcXHUyMDI2XCIgOiBvcHRpb25zLmxlbmd0aCA9PT0gMCA/IFwiXFx1MjAxNFwiIDogXCJDaG9vc2UgbG9jYWxlXFx1MjAyNlwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb3B0aW9ucy5tYXAoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJvcHRpb25cIixcbiAgICAgICAgICAgICAgICB7IGtleTogby5sb2NhbGUsIHZhbHVlOiBvLmxvY2FsZSB9LFxuICAgICAgICAgICAgICAgIG8uZmxhZyArIFwiIFwiICsgby5sYWJlbCArIFwiIChcIiArIG8ubG9jYWxlICsgXCIpXCJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGRpc2FibGVkOiBjb3B5QnVzeSB8fCBsb2FkaW5nLFxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBsb2FkVGFyZ2V0cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiBcIlJlbG9hZCBsb2NhbGUgbGlzdFwiLFxuICAgICAgICAgICAgc3R5bGU6IGJ0bkljb25TdHlsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJcXHUyMUJCXCJcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBkaXNhYmxlZDogY29weUJ1c3kgfHwgIXNlbGVjdGVkIHx8ICFkaXNwYXRjaCxcbiAgICAgICAgICAgIHN0eWxlOiBidG5QcmltYXJ5U3R5bGUsXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJ1blRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJUcmFuc2xhdGVcIlxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHZhciBQSUxMX1NUWUxFUyA9IHtcbiAgICBiYXNlOiB7XG4gICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgZm9udFNpemU6IFwiMTBweFwiLFxuICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjA0ZW1cIixcbiAgICAgIHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCIsXG4gICAgICBwYWRkaW5nOiBcIjJweCA4cHhcIixcbiAgICAgIGJvcmRlclJhZGl1czogXCI5OTlweFwiLFxuICAgICAgbGluZUhlaWdodDogMS4zXG4gICAgfSxcbiAgICBzb3VyY2U6IHtcbiAgICAgIGJhY2tncm91bmQ6IFwiI2U4ZjFmZlwiLFxuICAgICAgY29sb3I6IFwiIzBkNGVhNlwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjYjZkNGZlXCJcbiAgICB9LFxuICAgIGN1cnJlbnQ6IHtcbiAgICAgIGJhY2tncm91bmQ6IFwiI2Y2ZmZlZFwiLFxuICAgICAgY29sb3I6IFwiIzIzNzgwNFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjYjdlYjhmXCJcbiAgICB9XG4gIH07XG5cbiAgdmFyIFJPV19TVVJGQUNFID0ge1xuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgZ2FwOiBcIjEwcHhcIixcbiAgICBwYWRkaW5nOiBcIjZweCAxMHB4XCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjZweFwiLFxuICAgIGJvcmRlcjogXCIxcHggc29saWQgI2UwZTBlMFwiLFxuICAgIG1hcmdpbkJvdHRvbTogXCI2cHhcIixcbiAgICBiYWNrZ3JvdW5kOiBcIiNmOWY5ZjlcIlxuICB9O1xuXG4gIHZhciBNRU5VX1RSSUdHRVJfU1RZTEUgPSB7XG4gICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZTBlMGUwXCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgIHBhZGRpbmc6IFwiNHB4IDhweFwiLFxuICAgIG1pbldpZHRoOiBcIjMycHhcIixcbiAgICBmb250U2l6ZTogXCIxNnB4XCIsXG4gICAgbGluZUhlaWdodDogMSxcbiAgICBjb2xvcjogXCIjNDQ0XCIsXG4gICAgY3Vyc29yOiBcInBvaW50ZXJcIlxuICB9O1xuXG4gIC8qKiBTdHVkaW8gNC40IG1lZ2EgbWVudSBkb2Vzbid0IGhvbm9yIGluY2x1ZGVPbmx5OyBlbmZvcmNlIGEgd2hpdGVsaXN0IGFmdGVyIG9wZW4uICovXG4gIGZ1bmN0aW9uIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICB2YXIgYWxsb3dlZExhYmVscyA9IGhpZGVFZGl0XG4gICAgICA/IHtcbiAgICAgICAgICBkZWxldGU6IDEsXG4gICAgICAgICAgXCJ2aWV3IGZvcm1cIjogMSxcbiAgICAgICAgICB1bmxvY2s6IDEsXG4gICAgICAgICAgaGlzdG9yeTogMSxcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IDFcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgZWRpdDogMSxcbiAgICAgICAgICBkZWxldGU6IDEsXG4gICAgICAgICAgXCJ2aWV3IGZvcm1cIjogMSxcbiAgICAgICAgICB1bmxvY2s6IDEsXG4gICAgICAgICAgaGlzdG9yeTogMSxcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IDFcbiAgICAgICAgfTtcbiAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlbcm9sZT0nbWVudWl0ZW0nXSwgLk11aU1lbnVJdGVtLXJvb3RcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG4gPSBub2Rlc1tpXTtcbiAgICAgIHZhciB0eHQgPSAobi50ZXh0Q29udGVudCB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghYWxsb3dlZExhYmVsc1t0eHRdKSB7XG4gICAgICAgIG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlRW5mb3JjZUFsbG93ZWRJdGVtc0luTWVnYU1lbnUoaGlkZUVkaXQpIHtcbiAgICBlbmZvcmNlQWxsb3dlZEl0ZW1zSW5PcGVuTWVnYU1lbnUoaGlkZUVkaXQpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KTtcbiAgICB9LCAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZm9yY2VBbGxvd2VkSXRlbXNJbk9wZW5NZWdhTWVudShoaWRlRWRpdCk7XG4gICAgfSwgNjApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51KGhpZGVFZGl0KTtcbiAgICB9LCAxNjApO1xuICB9XG5cbiAgZnVuY3Rpb24gVHJhbnNsYXRpb25WZXJzaW9uUm93KHByb3BzKSB7XG4gICAgdmFyIG1ldGEgPSBwcm9wcy5tZXRhO1xuICAgIHZhciBpc1NvdXJjZSA9IHByb3BzLmlzU291cmNlO1xuICAgIHZhciBleGlzdHMgPSBwcm9wcy5leGlzdHMgIT09IGZhbHNlO1xuICAgIHZhciB0YXJnZXRQYXRoID0gcHJvcHMudGFyZ2V0UGF0aDtcbiAgICB2YXIgZGlzcGF0Y2ggPSBwcm9wcy5kaXNwYXRjaDtcbiAgICB2YXIgaXNPdXRkYXRlZCA9ICEhcHJvcHMuaXNPdXRkYXRlZDtcbiAgICB2YXIgb25UcmFuc2xhdGUgPSBwcm9wcy5vblRyYW5zbGF0ZTtcbiAgICB2YXIgc2hvd1JlbW92ZVRyYW5zbGF0aW9uID0gISFwcm9wcy5zaG93UmVtb3ZlVHJhbnNsYXRpb247XG4gICAgdmFyIG9uUmVtb3ZlVHJhbnNsYXRpb24gPSBwcm9wcy5vblJlbW92ZVRyYW5zbGF0aW9uO1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoIHx8IFwiXCI7XG4gICAgdmFyIGlzQ3VycmVudFJvdyA9IGZvcm1QYXRoICYmIHRhcmdldFBhdGggJiYgbm9ybWFsaXplU3R1ZGlvUGF0aChmb3JtUGF0aCkgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCk7XG4gICAgdmFyIGlzQ29tcGFyZVNlbGVjdGVkID0gISFwcm9wcy5pc0NvbXBhcmVTZWxlY3RlZDtcbiAgICB2YXIgcm93Q2xpY2thYmxlID0gISFpc1NvdXJjZSAmJiAhaXNDdXJyZW50Um93ICYmIGV4aXN0cztcbiAgICB2YXIgcm93U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBST1dfU1VSRkFDRSk7XG4gICAgaWYgKGlzQ29tcGFyZVNlbGVjdGVkKSB7XG4gICAgICByb3dTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHJvd1N0eWxlLCB7XG4gICAgICAgIGJvcmRlckNvbG9yOiBcIiMyNTYzZWJcIixcbiAgICAgICAgYm94U2hhZG93OiBcIjAgMCAwIDFweCByZ2JhKDM3LCA5OSwgMjM1LCAwLjQ1KSBpbnNldFwiLFxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmOGZhZmNcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChyb3dDbGlja2FibGUpIHtcbiAgICAgIHJvd1N0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgcm93U3R5bGUsIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9KTtcbiAgICB9XG4gICAgdmFyIHNob3dTdHVkaW9JdGVtTWVnYU1lbnUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICghZGlzcGF0Y2ggfHwgIXRhcmdldFBhdGgpIHJldHVybjtcbiAgICAgIHZhciB0b3AgPSB0eXBlb2YgZXZlbnQuY2xpZW50WSA9PT0gXCJudW1iZXJcIiA/IGV2ZW50LmNsaWVudFkgOiAwO1xuICAgICAgdmFyIGxlZnQgPSB0eXBlb2YgZXZlbnQuY2xpZW50WCA9PT0gXCJudW1iZXJcIiA/IGV2ZW50LmNsaWVudFggOiAwO1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcIlNIT1dfSVRFTV9NRUdBX01FTlVcIixcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHBhdGg6IHRhcmdldFBhdGgsXG4gICAgICAgICAgYW5jaG9yUmVmZXJlbmNlOiBcImFuY2hvclBvc2l0aW9uXCIsXG4gICAgICAgICAgYW5jaG9yUG9zaXRpb246IHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNjaGVkdWxlRW5mb3JjZUFsbG93ZWRJdGVtc0luTWVnYU1lbnUoaXNDdXJyZW50Um93KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6IFwidHJhbnNsYXRpb24tdmVyc2lvbnMtcm93XCIsXG4gICAgICAgIHN0eWxlOiByb3dTdHlsZSxcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMub25BY3RpdmF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBwcm9wcy5vbkFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgaXNTb3VyY2U6ICEhaXNTb3VyY2UsXG4gICAgICAgICAgICAgIGlzQ3VycmVudFJvdzogISFpc0N1cnJlbnRSb3dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcm9sZTogcm93Q2xpY2thYmxlID8gXCJidXR0b25cIiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGFiSW5kZXg6IHJvd0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWQsXG4gICAgICAgIG9uS2V5RG93bjogcm93Q2xpY2thYmxlXG4gICAgICAgICAgPyBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMub25BY3RpdmF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBwcm9wcy5vbkFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgaXNTb3VyY2U6ICEhaXNTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudFJvdzogISFpc0N1cnJlbnRSb3dcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICB0aXRsZTogcm93Q2xpY2thYmxlID8gXCJTaG93IHNvdXJjZSBmaWVsZHMgKHJlYWQtb25seSkgbmV4dCB0byB0aGlzIGZvcm1cIiA6IHVuZGVmaW5lZFxuICAgICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiBcIjEuMTVyZW1cIiwgbGluZUhlaWdodDogMSB9LCBcImFyaWEtaGlkZGVuXCI6IHRydWUgfSxcbiAgICAgICAgbWV0YS5mbGFnXG4gICAgICApLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBtaW5XaWR0aDogXCI3MnB4XCIsIGZvbnRTaXplOiBcIjEzcHhcIiwgY29sb3I6IFwiIzIxMjUyOVwiIH0gfSxcbiAgICAgICAgbWV0YS5sYWJlbFxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGZsZXg6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzU291cmNlXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgUElMTF9TVFlMRVMuYmFzZSwgUElMTF9TVFlMRVMuc291cmNlKSB9LFxuICAgICAgICAgICAgICBcIlNvdXJjZVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBpc091dGRhdGVkXG4gICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgUElMTF9TVFlMRVMuYmFzZSwgeyBiYWNrZ3JvdW5kOiBcIiNmZmY3ZTZcIiwgY29sb3I6IFwiI2FkNjgwMFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNmZmQ1OTFcIiB9KSwgdGl0bGU6IFwiT3V0ZGF0ZWQgdHJhbnNsYXRpb25cIiB9LFxuICAgICAgICAgICAgICBcIlxcdUQ4M0RcXHVERUE5IE91dGRhdGVkXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG51bGwsXG4gICAgICAgIGlzQ3VycmVudFJvd1xuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIFBJTExfU1RZTEVTLmJhc2UsIFBJTExfU1RZTEVTLmN1cnJlbnQpLCB0aXRsZTogXCJUaGlzIGlzIHRoZSBpdGVtIHlvdSBoYXZlIG9wZW4gaW4gdGhlIGZvcm1cIiB9LFxuICAgICAgICAgICAgICBcIkN1cnJlbnRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3R5bGU6IHsgbWFyZ2luTGVmdDogXCJhdXRvXCIsIGZsZXhTaHJpbms6IDAsIGRpc3BsYXk6IFwiZmxleFwiLCBnYXA6IFwiNnB4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfSB9LFxuICAgICAgICBleGlzdHNcbiAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIiwgZ2FwOiBcIjZweFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0gfSxcbiAgICAgICAgICAgICAgc2hvd1JlbW92ZVRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXYgJiYgZXYuc3RvcFByb3BhZ2F0aW9uKSBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25SZW1vdmVUcmFuc2xhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlVHJhbnNsYXRpb24odGFyZ2V0UGF0aCwgbWV0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogXCJSZW1vdmUgdHJhbnNsYXRpb24gZm9yIFwiICsgbWV0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVtb3ZlIHRoaXMgdHJhbnNsYXRlZCBwYWdlIChvcHRpb25hbCBzaGFyZWQgY29tcG9uZW50cyB3aXRoIG5vIG90aGVyIHBhZ2UgcmVmZXJlbmNlcylcIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJSZW1vdmVcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1zbVwiLFxuICAgICAgICAgICAgICAgICAgb25DbGljazogc2hvd1N0dWRpb0l0ZW1NZWdhTWVudSxcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiAoaXNDdXJyZW50Um93ID8gXCJPcHRpb25zIChlZGl0aW5nIHRoaXMgaXRlbSDigJQgRWRpdCBoaWRkZW4pIFwiIDogXCJPcHRpb25zIGZvciBcIikgKyBtZXRhLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGlzQ3VycmVudFJvdyA/IFwiT3BlbiBpdGVtIG1lbnUgKEVkaXQgaXMgaGlkZGVuIHdoaWxlIHRoaXMgZm9ybSBpcyBvcGVuIGZvciB0aGlzIHBhdGgpXCIgOiBcIkl0ZW0gYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IE1FTlVfVFJJR0dFUl9TVFlMRVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJcXHUyMkVFXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4teHNcIixcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChldiAmJiBldi5zdG9wUHJvcGFnYXRpb24pIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvblRyYW5zbGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uVHJhbnNsYXRlKHRhcmdldFBhdGgsIG1ldGEpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiVHJhbnNsYXRlIHRvIFwiICsgbWV0YS5sYWJlbFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlRyYW5zbGF0ZVwiXG4gICAgICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFRyYW5zbGF0aW9uVmVyc2lvbnNQYW5lbChwcm9wcykge1xuICAgIHZhciBmb3JtUGF0aCA9IHByb3BzLmZvcm1QYXRoO1xuICAgIHZhciBzaXRlSWQgPSBwcm9wcy5zaXRlSWQ7XG4gICAgdmFyIG1vZGVsID0gcHJvcHMubW9kZWwgfHwge307XG4gICAgdmFyIGZvcm0gPSBwcm9wcy5mb3JtO1xuICAgIHZhciBjb250cm9sQ29udGFpbmVyRWwgPSBwcm9wcy5jb250cm9sQ29udGFpbmVyRWw7XG4gICAgdmFyIHJlc29sdmVkQ29udGVudFR5cGVJZCA9IFN0cmluZyhcbiAgICAgIHByb3BzLmNvbnRlbnRUeXBlSWQgfHwgbW9kZWxbXCJjb250ZW50LXR5cGVcIl0gfHwgbW9kZWwuY29udGVudFR5cGUgfHwgXCJcIlxuICAgICkudHJpbSgpO1xuXG4gICAgdmFyIHNvdXJjZUxvY2FsZSA9IChtb2RlbC5zb3VyY2VMb2NhbGVDb2RlX3MgJiYgU3RyaW5nKG1vZGVsLnNvdXJjZUxvY2FsZUNvZGVfcykudHJpbSgpLnRvTG93ZXJDYXNlKCkpIHx8IFwiXCI7XG4gICAgdmFyIG1vZGVsTG9jYWxlID0gKG1vZGVsLmxvY2FsZUNvZGVfcyAmJiBTdHJpbmcobW9kZWwubG9jYWxlQ29kZV9zKS50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgXCJcIjtcbiAgICB2YXIgcGF0aExvY2FsZSA9IGdldExvY2FsZUZyb21QYXRoKGZvcm1QYXRoKSB8fCBcIlwiO1xuXG4gICAgLy8gU291cmNlIGluZGljYXRvciBpcyBkYXRhLWRyaXZlbiBvbmx5IGZyb20gWE1MIHNvdXJjZUxvY2FsZUNvZGVfcy5cbiAgICAvLyBJZiBtaXNzaW5nLCBkbyBub3QgbWFyayBhbnkgcm93IGFzIHNvdXJjZS5cbiAgICB2YXIgcmVzb2x2ZWRTb3VyY2UgPSBzb3VyY2VMb2NhbGU7XG4gICAgdmFyIHJlc29sdmVkU291cmNlS2V5ID0gU3RyaW5nKHJlc29sdmVkU291cmNlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB2YXIgcm9vdERpciA9IGdldE11bHRpTG9jYWxlUm9vdERpcihmb3JtUGF0aCk7XG5cbiAgICB2YXIgYXV0aG9yaW5nQmFzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIGF1dGhvcmluZ0Jhc2UgPSBhdXRob3JpbmdCYXNlU3RhdGVbMF07XG4gICAgdmFyIHNldEF1dGhvcmluZ0Jhc2UgPSBhdXRob3JpbmdCYXNlU3RhdGVbMV07XG5cbiAgICB2YXIgcGF0aHNTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcbiAgICB2YXIgdHJhbnNsYXRpb25QYXRocyA9IHBhdGhzU3RhdGVbMF07XG4gICAgdmFyIHNldFRyYW5zbGF0aW9uUGF0aHMgPSBwYXRoc1N0YXRlWzFdO1xuXG4gICAgdmFyIGxvYWRpbmdTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKHRydWUpO1xuICAgIHZhciBsb2FkaW5nID0gbG9hZGluZ1N0YXRlWzBdO1xuICAgIHZhciBzZXRMb2FkaW5nID0gbG9hZGluZ1N0YXRlWzFdO1xuXG4gICAgdmFyIGZpbHRlclN0YXRlID0gUmVhY3QudXNlU3RhdGUoXCJcIik7XG4gICAgdmFyIGZpbHRlclF1ZXJ5ID0gZmlsdGVyU3RhdGVbMF07XG4gICAgdmFyIHNldEZpbHRlclF1ZXJ5ID0gZmlsdGVyU3RhdGVbMV07XG4gICAgdmFyIHBhZ2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuICAgIHZhciBwYWdlSW5kZXggPSBwYWdlU3RhdGVbMF07XG4gICAgdmFyIHNldFBhZ2VJbmRleCA9IHBhZ2VTdGF0ZVsxXTtcblxuICAgIHZhciBsaXN0UmVmcmVzaFN0ID0gUmVhY3QudXNlU3RhdGUoMCk7XG4gICAgdmFyIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXkgPSBsaXN0UmVmcmVzaFN0WzBdO1xuICAgIHZhciBidW1wVHJhbnNsYXRpb25MaXN0ID0gbGlzdFJlZnJlc2hTdFsxXTtcbiAgICB2YXIgdHJhbnNsYXRpb25DZmdTdCA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIHZhciB0cmFuc2xhdGlvbkNmZyA9IHRyYW5zbGF0aW9uQ2ZnU3RbMF07XG4gICAgdmFyIHNldFRyYW5zbGF0aW9uQ2ZnID0gdHJhbnNsYXRpb25DZmdTdFsxXTtcblxuICAgIHZhciBzdGFsZUJ5UGF0aFN0ID0gUmVhY3QudXNlU3RhdGUoe30pO1xuICAgIHZhciBzdGFsZUJ5UGF0aCA9IHN0YWxlQnlQYXRoU3RbMF07XG4gICAgdmFyIHNldFN0YWxlQnlQYXRoID0gc3RhbGVCeVBhdGhTdFsxXTtcbiAgICB2YXIgZXhpc3RzQnlQYXRoU3QgPSBSZWFjdC51c2VTdGF0ZSh7fSk7XG4gICAgdmFyIGV4aXN0c0J5UGF0aCA9IGV4aXN0c0J5UGF0aFN0WzBdO1xuICAgIHZhciBzZXRFeGlzdHNCeVBhdGggPSBleGlzdHNCeVBhdGhTdFsxXTtcblxuICAgIHZhciBjb21wYXJlUGF0aFN0ID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgdmFyIGNvbXBhcmVTb3VyY2VQYXRoID0gY29tcGFyZVBhdGhTdFswXTtcbiAgICB2YXIgc2V0Q29tcGFyZVNvdXJjZVBhdGggPSBjb21wYXJlUGF0aFN0WzFdO1xuXG4gICAgdmFyIHJlbW92ZU1vZGFsU3QgPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgICB2YXIgcmVtb3ZlTW9kYWwgPSByZW1vdmVNb2RhbFN0WzBdO1xuICAgIHZhciBzZXRSZW1vdmVNb2RhbCA9IHJlbW92ZU1vZGFsU3RbMV07XG5cbiAgICB2YXIgc3VmZml4ID0gcGFyc2VTdWZmaXhGcm9tRm9ybVBhdGgoZm9ybVBhdGgsIHJvb3REaXIpLnN1ZmZpeDtcbiAgICB2YXIgY3VycmVudExvY2FsZSA9IChwYXRoTG9jYWxlIHx8IG1vZGVsTG9jYWxlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgc2V0UGFnZUluZGV4KDApO1xuICAgIH0sIFt0cmFuc2xhdGlvblBhdGhzLCBmaWx0ZXJRdWVyeV0pO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRDb21wYXJlU291cmNlUGF0aChudWxsKTtcbiAgICAgIH0sXG4gICAgICBbZm9ybVBhdGhdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGZldGNoVHJhbnNsYXRpb25Db25maWcocmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpLCBzaXRlSWQpLnRoZW4oZnVuY3Rpb24gKGNmZykge1xuICAgICAgICAgIGlmIChhY3RpdmUpIHNldFRyYW5zbGF0aW9uQ2ZnKGNmZyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFthdXRob3JpbmdCYXNlLCBzaXRlSWRdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYWIgPSBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgICAgIHNldEF1dGhvcmluZ0Jhc2UoYWIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmlzaChsaXN0KSB7XG4gICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHNldFRyYW5zbGF0aW9uUGF0aHMobGlzdCk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhZm9ybVBhdGgpIHtcbiAgICAgICAgICBmaW5pc2goW10pO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB2YXIgc3R1ZGlvQmFzZSA9IGdldFN0dWRpb0FwaUJhc2UoKTtcbiAgICAgICAgdmFyIGxzaWQgPSBtb2RlbC5sb2NhbGVTb3VyY2VJZF9zICYmIFN0cmluZyhtb2RlbC5sb2NhbGVTb3VyY2VJZF9zKS50cmltKCk7XG4gICAgICAgIHZhciBvaWQgPSBtb2RlbC5vYmplY3RJZCAmJiBTdHJpbmcobW9kZWwub2JqZWN0SWQpLnRyaW0oKTtcbiAgICAgICAgdmFyIGN0eXBlID0gcmVzb2x2ZWRDb250ZW50VHlwZUlkO1xuICAgICAgICB2YXIgY3VyID0gKGN1cnJlbnRMb2NhbGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHBhdGhPa0ZvckxvY2FsZVByb2JlID0gQm9vbGVhbihyb290RGlyICYmIHN1ZmZpeCAhPSBudWxsKTtcblxuICAgICAgICBmdW5jdGlvbiBydW5GYWxsYmFjaygpIHtcbiAgICAgICAgICB2YXIgYmFzZSA9IGFiIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICAgICAgICBpZiAoIWJhc2UpIHtcbiAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2goW2Zvcm1QYXRoXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcGF0aE9rRm9yTG9jYWxlUHJvYmUpIHtcbiAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2goW2Zvcm1QYXRoXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgKCh0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5jb2RlcykgfHwgTVVMVElfTE9DQUxFX0NPREVTKS5tYXAoZnVuY3Rpb24gKGxvYykge1xuICAgICAgICAgICAgICB2YXIgcCA9IHBhdGhGb3JUYXJnZXRMb2NhbGUocm9vdERpciwgbG9jLCBzdWZmaXgpO1xuICAgICAgICAgICAgICByZXR1cm4gY29udGVudEV4aXN0cyhiYXNlLCBzaXRlSWQsIHApLnRoZW4oZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9rKSByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICBpZiAoY3VyICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShjdXIsIGxvYykpIHJldHVybiBwO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICB2YXIgbSA9IHt9O1xuICAgICAgICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICBpZiAocCkgbVtwXSA9IHRydWU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoZm9ybVBhdGgpIHtcbiAgICAgICAgICAgICAgICBtW2Zvcm1QYXRoXSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmluaXNoKHNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheShPYmplY3Qua2V5cyhtKSwgcmVzb2x2ZWRTb3VyY2VLZXkpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKFtmb3JtUGF0aF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUm93cyA9IHRyYW5zbGF0ZWQgY29waWVzIG9ubHk6IHNpYmxpbmcvaW5kZXggcGF0aHMgcGx1cyBvbi1kaXNrIHBhdGhzIGZvciBjb25maWd1cmVkIGxvY2FsZXMuXG4gICAgICAgICAqIERvIG5vdCBhZGQgY29uZmlnIGxvY2FsZSBwYXRocyB1bmxlc3MgY29udGVudCBleGlzdHMgKG1pc3NpbmcgbG9jYWxlcyBiZWxvbmcgaW4gVHJhbnNsYXRlIGRyb3Bkb3duIG9ubHkpLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VQYXRoc0FuZEZpbmlzaChwYXRocykge1xuICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICB2YXIgbSA9IHt9O1xuICAgICAgICAgIChwYXRocyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgaWYgKHApIG1bcF0gPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmb3JtUGF0aCkge1xuICAgICAgICAgICAgbVtmb3JtUGF0aF0gPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFwcGx5TWFwKCkge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgZmluaXNoKHNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheShPYmplY3Qua2V5cyhtKSwgcmVzb2x2ZWRTb3VyY2VLZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYmFzZSA9IGFiIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcbiAgICAgICAgICB2YXIgY2ZnQ29kZXMgPVxuICAgICAgICAgICAgdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMubGVuZ3RoXG4gICAgICAgICAgICAgID8gdHJhbnNsYXRpb25DZmcuY29kZXNcbiAgICAgICAgICAgICAgOiBNVUxUSV9MT0NBTEVfQ09ERVM7XG4gICAgICAgICAgaWYgKGJhc2UgJiYgc2l0ZUlkICYmIHJvb3REaXIgIT0gbnVsbCAmJiBzdWZmaXggIT0gbnVsbCAmJiBjZmdDb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICBjZmdDb2Rlcy5tYXAoZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHBhdGhGb3JUYXJnZXRMb2NhbGUocm9vdERpciwgY29kZSwgc3VmZml4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudEV4aXN0cyhiYXNlLCBzaXRlSWQsIHApLnRoZW4oZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2sgPyBwIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIChmb3VuZCB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHApIG1bcF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwcGx5TWFwKCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlNYXAoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5TWFwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqIFByZXZpZXcgT3BlblNlYXJjaCBwbHVnaW46IHNhbWUgY29udGVudC10eXBlICsgbGluZWFnZSAobG9jYWxlU291cmNlSWRfcyBvciBvYmplY3RJZCBvbiBoaXRzKS4gKi9cbiAgICAgICAgaWYgKGN0eXBlICYmIChsc2lkIHx8IG9pZCkgJiYgc3R1ZGlvQmFzZSkge1xuICAgICAgICAgIGZldGNoVHJhbnNsYXRpb25TaWJsaW5nc0Zyb21QbHVnaW4oc3R1ZGlvQmFzZSwgc2l0ZUlkLCBjdHlwZSwgbHNpZCwgb2lkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBhdGhzKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKHBhdGhzICYmIHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtZXJnZVBhdGhzQW5kRmluaXNoKHBhdGhzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGxzaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbHNpZCkudGhlbihmdW5jdGlvbiAobGVnYWN5UGF0aHMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIGlmIChsZWdhY3lQYXRocyAmJiBsZWdhY3lQYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2gobGVnYWN5UGF0aHMpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBydW5GYWxsYmFjaygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKGxzaWQgJiYgc3R1ZGlvQmFzZSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaFBhdGhzQnlMb2NhbGVTb3VyY2VJZChzdHVkaW9CYXNlLCBzaXRlSWQsIGxzaWQpXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGVnYWN5UGF0aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGVnYWN5UGF0aHMgJiYgbGVnYWN5UGF0aHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHNBbmRGaW5pc2gobGVnYWN5UGF0aHMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bkZhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBydW5GYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobHNpZCAmJiBzdHVkaW9CYXNlKSB7XG4gICAgICAgICAgc2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkKHN0dWRpb0Jhc2UsIHNpdGVJZCwgbHNpZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYXRocykge1xuICAgICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmICghcGF0aHMgfHwgcGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbWVyZ2VQYXRoc0FuZEZpbmlzaChwYXRocyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcnVuRmFsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bkZhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBmb3JtUGF0aCxcbiAgICAgICAgc2l0ZUlkLFxuICAgICAgICByb290RGlyLFxuICAgICAgICBzdWZmaXgsXG4gICAgICAgIG1vZGVsLmxvY2FsZVNvdXJjZUlkX3MsXG4gICAgICAgIG1vZGVsLm9iamVjdElkLFxuICAgICAgICByZXNvbHZlZENvbnRlbnRUeXBlSWQsXG4gICAgICAgIGN1cnJlbnRMb2NhbGUsXG4gICAgICAgIHRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXksXG4gICAgICAgIHRyYW5zbGF0aW9uQ2ZnXG4gICAgICBdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYmFzZSA9IGF1dGhvcmluZ0Jhc2UgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhYmFzZSB8fCAhdHJhbnNsYXRpb25QYXRocyB8fCB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldFN0YWxlQnlQYXRoKHt9KTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzb3VyY2VQYXRoID1cbiAgICAgICAgICB0cmFuc2xhdGlvblBhdGhzLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgocCkgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlZFNvdXJjZUtleSAmJiBsb2NhbGVTZWdtZW50c0NvbXBhdGlibGUobG9jLCByZXNvbHZlZFNvdXJjZUtleSk7XG4gICAgICAgICAgfSkgfHwgZm9ybVBhdGg7XG4gICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgIFtnZXRJdGVtTW9kaWZpZWRUaW1lc3RhbXAoYmFzZSwgc2l0ZUlkLCBzb3VyY2VQYXRoKV0uY29uY2F0KFxuICAgICAgICAgICAgdHJhbnNsYXRpb25QYXRocy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldEl0ZW1Nb2RpZmllZFRpbWVzdGFtcChiYXNlLCBzaXRlSWQsIHApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIHZhciBzb3VyY2VNcyA9IGFyclswXTtcbiAgICAgICAgICB2YXIgbWFwID0ge307XG4gICAgICAgICAgdHJhbnNsYXRpb25QYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TXMgPSBhcnJbaSArIDFdO1xuICAgICAgICAgICAgdmFyIGxvYyA9IChnZXRMb2NhbGVGcm9tUGF0aChwKSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIGlzU291cmNlID0gcmVzb2x2ZWRTb3VyY2VLZXkgJiYgbG9jYWxlU2VnbWVudHNDb21wYXRpYmxlKGxvYywgcmVzb2x2ZWRTb3VyY2VLZXkpO1xuICAgICAgICAgICAgbWFwW3BdID1cbiAgICAgICAgICAgICAgIWlzU291cmNlICYmXG4gICAgICAgICAgICAgIHNvdXJjZU1zICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgdGFyZ2V0TXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBOdW1iZXIodGFyZ2V0TXMpIDwgTnVtYmVyKHNvdXJjZU1zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRTdGFsZUJ5UGF0aChtYXApO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHNldFN0YWxlQnlQYXRoKHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbYXV0aG9yaW5nQmFzZSwgc2l0ZUlkLCB0cmFuc2xhdGlvblBhdGhzLCByZXNvbHZlZFNvdXJjZUtleSwgZm9ybVBhdGhdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgYmFzZSA9IGF1dGhvcmluZ0Jhc2UgfHwgZ2V0QXV0aG9yaW5nQmFzZSgpO1xuICAgICAgICBpZiAoIXNpdGVJZCB8fCAhYmFzZSB8fCAhdHJhbnNsYXRpb25QYXRocyB8fCB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldEV4aXN0c0J5UGF0aCh7fSk7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICB0cmFuc2xhdGlvblBhdGhzLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRFeGlzdHMoYmFzZSwgc2l0ZUlkLCBwKS50aGVuKGZ1bmN0aW9uIChvaykge1xuICAgICAgICAgICAgICByZXR1cm4gW3AsICEhb2tdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYWlycykge1xuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgICAgICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgIG1hcFtyb3dbMF1dID0gcm93WzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRFeGlzdHNCeVBhdGgobWFwKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0RXhpc3RzQnlQYXRoKHt9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIFthdXRob3JpbmdCYXNlLCBzaXRlSWQsIHRyYW5zbGF0aW9uUGF0aHNdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBvbkNsb3NlQ29tcGFyZSgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zbGF0aW9uOmNsb3NlLXNvdXJjZS1jb21wYXJlXCIsIG9uQ2xvc2VDb21wYXJlKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNsYXRpb246Y2xvc2Utc291cmNlLWNvbXBhcmVcIiwgb25DbG9zZUNvbXBhcmUpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2l0ZUlkIHx8ICFmb3JtUGF0aCB8fCAhZm9ybSB8fCAhY29udHJvbENvbnRhaW5lckVsKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYXNlID0gYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCk7XG4gICAgICAgIHZhciBzcmMgPSBidWlsZExlZ2FjeVJlYWRvbmx5Rm9ybVNyYyhiYXNlLCBzaXRlSWQsIGNvbXBhcmVTb3VyY2VQYXRoIHx8IFwiXCIpO1xuICAgICAgICB2YXIgaG9zdCA9IGZpbmRGb3JtRmllbGRzQ29tcGFyZUhvc3QoZm9ybSwgY29udHJvbENvbnRhaW5lckVsKTtcbiAgICAgICAgaWYgKCFob3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29tcGFyZVNvdXJjZVBhdGggfHwgIXNyYykge1xuICAgICAgICAgIHVud3JhcEZvcm1Db21wYXJlTGF5b3V0KGhvc3QpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHdyYXBGb3JtQ29tcGFyZUxheW91dChob3N0LCBzcmMsIGNvbXBhcmVTb3VyY2VQYXRoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB1bndyYXBGb3JtQ29tcGFyZUxheW91dChob3N0KTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbY29tcGFyZVNvdXJjZVBhdGgsIGF1dGhvcmluZ0Jhc2UsIHNpdGVJZCwgZm9ybVBhdGgsIGZvcm0sIGNvbnRyb2xDb250YWluZXJFbF1cbiAgICApO1xuXG4gICAgaWYgKCFzaXRlSWQgfHwgIWZvcm1QYXRoKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzc05hbWU6IFwiaGVscC1ibG9ja1wiLCBzdHlsZTogeyBtYXJnaW5Ub3A6IDAgfSB9LFxuICAgICAgICBcIlNhdmUgdGhlIGl0ZW0gYW5kIG9wZW4gaXQgZnJvbSB0aGUgY29udGVudCB0cmVlIHRvIHNlZSB0cmFuc2xhdGlvbiB2ZXJzaW9ucy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBnZXREaXNwYXRjaCgpO1xuICAgIHZhciB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCA9IHJlc29sdmVUcmFuc2xhdGVDb3B5U291cmNlUGF0aChcbiAgICAgIHRyYW5zbGF0aW9uQ2ZnLFxuICAgICAgcm9vdERpcixcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHRyYW5zbGF0aW9uUGF0aHMsXG4gICAgICBmb3JtUGF0aCxcbiAgICAgIHJlc29sdmVkU291cmNlS2V5XG4gICAgKTtcbiAgICB2YXIgY2xvc2VSZW1vdmVUcmFuc2xhdGlvbk1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0UmVtb3ZlTW9kYWwobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBvcGVuUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCA9IGZ1bmN0aW9uICh0YXJnZXRQYXRoLCBtZXRhKSB7XG4gICAgICBpZiAoIXNpdGVJZCB8fCAhdGFyZ2V0UGF0aCkgcmV0dXJuO1xuICAgICAgdmFyIHRwID0gdGFyZ2V0UGF0aDtcbiAgICAgIHNldFJlbW92ZU1vZGFsKHtcbiAgICAgICAgcGFnZVBhdGg6IHRwLFxuICAgICAgICBtZXRhTGFiZWw6IChtZXRhICYmIG1ldGEubGFiZWwpIHx8IHRwLFxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgY2FuZGlkYXRlczogW10sXG4gICAgICAgIHNlbGVjdGVkUGF0aHM6IHt9LFxuICAgICAgICBzdWJtaXR0aW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB2YXIgc2IgPSBnZXRTdHVkaW9BcGlCYXNlKCk7XG4gICAgICBmZXRjaFRyYW5zbGF0aW9uUmVtb3ZlQ2FuZGlkYXRlcyhzYiwgc2l0ZUlkLCB0cClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IChyZXMgJiYgcmVzLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgcmVtb3ZhYmxlIGNvbXBvbmVudHMuXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGxpc3QgPSByZXMuY2FuZGlkYXRlcyB8fCBbXTtcbiAgICAgICAgICB2YXIgc2VsID0ge307XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoYyAmJiBjLnBhdGgpIHNlbFtjLnBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwge1xuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgY2FuZGlkYXRlczogbGlzdCxcbiAgICAgICAgICAgICAgc2VsZWN0ZWRQYXRoczogc2VsLFxuICAgICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICAgIGlmICghcHJldiB8fCBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYucGFnZVBhdGgpICE9PSBub3JtYWxpemVTdHVkaW9QYXRoKHRwKSkgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IFwiTmV0d29yayBlcnJvciBsb2FkaW5nIGNhbmRpZGF0ZXMuXCIgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlUmVtb3ZlQ2FuZGlkYXRlID0gZnVuY3Rpb24gKHBhdGgsIGNoZWNrZWQpIHtcbiAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgIGlmICghcHJldiB8fCBwcmV2LmxvYWRpbmcgfHwgcHJldi5zdWJtaXR0aW5nKSByZXR1cm4gcHJldjtcbiAgICAgICAgdmFyIG5leHRTZWwgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2LnNlbGVjdGVkUGF0aHMgfHwge30pO1xuICAgICAgICBuZXh0U2VsW3BhdGhdID0gISFjaGVja2VkO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzZWxlY3RlZFBhdGhzOiBuZXh0U2VsIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXRBbGxSZW1vdmVDYW5kaWRhdGVzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBzZXRSZW1vdmVNb2RhbChmdW5jdGlvbiAocHJldikge1xuICAgICAgICBpZiAoIXByZXYgfHwgcHJldi5sb2FkaW5nIHx8IHByZXYuc3VibWl0dGluZykgcmV0dXJuIHByZXY7XG4gICAgICAgIHZhciBuZXh0U2VsID0ge307XG4gICAgICAgIChwcmV2LmNhbmRpZGF0ZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoYyAmJiBjLnBhdGgpIG5leHRTZWxbYy5wYXRoXSA9ICEhdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldiwgeyBzZWxlY3RlZFBhdGhzOiBuZXh0U2VsIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjb25maXJtUmVtb3ZlVHJhbnNsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXJlbW92ZU1vZGFsIHx8IHJlbW92ZU1vZGFsLmxvYWRpbmcgfHwgcmVtb3ZlTW9kYWwuc3VibWl0dGluZykgcmV0dXJuO1xuICAgICAgdmFyIHNiID0gZ2V0U3R1ZGlvQXBpQmFzZSgpO1xuICAgICAgaWYgKCFzYiB8fCAhc2l0ZUlkKSB7XG4gICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlN0dWRpbyBBUEkgYmFzZSBvciBzaXRlIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcGFnZVBhdGggPSByZW1vdmVNb2RhbC5wYWdlUGF0aDtcbiAgICAgIHZhciBzZWwgPSByZW1vdmVNb2RhbC5zZWxlY3RlZFBhdGhzIHx8IHt9O1xuICAgICAgdmFyIHBhdGhzID0gW107XG4gICAgICBPYmplY3Qua2V5cyhzZWwpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgaWYgKHNlbFtwXSkgcGF0aHMucHVzaChwKTtcbiAgICAgIH0pO1xuICAgICAgc2V0UmVtb3ZlTW9kYWwoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgcmV0dXJuIHByZXYgPyBPYmplY3QuYXNzaWduKHt9LCBwcmV2LCB7IHN1Ym1pdHRpbmc6IHRydWUsIGVycm9yOiBudWxsIH0pIDogcHJldjtcbiAgICAgIH0pO1xuICAgICAgcG9zdFRyYW5zbGF0aW9uUmVtb3ZlKHNiLCBzaXRlSWQsIHBhZ2VQYXRoLCBwYXRocywgdHJ1ZSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBkZWxldGVkID0gKHJlcyAmJiByZXMuZGVsZXRlZCkgfHwgW107XG4gICAgICAgICAgdmFyIGZhaWxlZCA9IChyZXMgJiYgcmVzLmZhaWxlZCkgfHwgW107XG4gICAgICAgICAgdmFyIGRlbGV0ZWRQYWdlID1cbiAgICAgICAgICAgIGRlbGV0ZWQuc29tZShmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplU3R1ZGlvUGF0aChwKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aChwYWdlUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmFpbGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG1zZyA9XG4gICAgICAgICAgICAgIFwiUmVtb3ZlIGZpbmlzaGVkIHdpdGggZXJyb3JzOiBcIiArXG4gICAgICAgICAgICAgIGZhaWxlZFxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoZiAmJiBmLnBhdGgpICsgKGYgJiYgZi5tZXNzYWdlID8gXCIgKFwiICsgZi5tZXNzYWdlICsgXCIpXCIgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiOyBcIik7XG4gICAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgbXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90aWZ5RGlzcGF0Y2goXG4gICAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgICBcIlJlbW92ZWQgdHJhbnNsYXRpb25cIiArXG4gICAgICAgICAgICAgICAgKGRlbGV0ZWQubGVuZ3RoID8gXCIgKFwiICsgZGVsZXRlZC5sZW5ndGggKyBcIiBpdGVtKHMpKS5cIiA6IFwiLlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVtcFRyYW5zbGF0aW9uTGlzdChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCgpO1xuICAgICAgICAgIGlmIChkZWxldGVkUGFnZSAmJiBmb3JtUGF0aCAmJiBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aChwYWdlUGF0aCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJESVNQQVRDSF9ET01fRVZFTlRcIiwgcGF5bG9hZDogeyBpZDogXCJlZGl0RGlhbG9nU3VjY2Vzc1wiIH0gfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlMSkge31cbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKFxuICAgICAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAgICAgXCJUaGUgcGFnZSB5b3UgaGFkIG9wZW4gd2FzIGRlbGV0ZWQuIENsb3NlIG9yIHJlZnJlc2ggdGhpcyBkaWFsb2cgaWYgaXQgaXMgc3RpbGwgc2hvd24uXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFJlbW92ZU1vZGFsKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldiA/IE9iamVjdC5hc3NpZ24oe30sIHByZXYsIHsgc3VibWl0dGluZzogZmFsc2UsIGVycm9yOiBcIk5ldHdvcmsgZXJyb3Igd2hpbGUgZGVsZXRpbmcuXCIgfSkgOiBwcmV2O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlJlbW92ZSB0cmFuc2xhdGlvbiBmYWlsZWQgKG5ldHdvcmspLlwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBydW5UcmFuc2xhdGVGb3JSb3cgPSBmdW5jdGlvbiAodGFyZ2V0UGF0aCwgbWV0YSkge1xuICAgICAgaWYgKCFkaXNwYXRjaCB8fCAhcmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlKGF1dGhvcmluZ0Jhc2UpIHx8ICFzaXRlSWQgfHwgIXRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIHx8ICF0YXJnZXRQYXRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBwYXJlbnQgPSBwYXJlbnRGb2xkZXJQYXRoRm9yQ29weSh0YXJnZXRQYXRoKTtcbiAgICAgIHZhciBjb250ZW50QXBpQmFzZSA9IHJlc29sdmVBdXRob3JpbmdDb250ZW50QXBpQmFzZShhdXRob3JpbmdCYXNlKTtcbiAgICAgIGNvcHlJdGVtUGFzdGVTdHVkaW8oY29udGVudEFwaUJhc2UsIHNpdGVJZCwgdHJhbnNsYXRlQ29weVNvdXJjZVBhdGgsIHBhcmVudCwgdGFyZ2V0UGF0aClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmICghcmVzIHx8ICFyZXMub2spIHtcbiAgICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCAocmVzICYmIHJlcy5tZXNzYWdlKSB8fCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub3RpZnlEaXNwYXRjaChkaXNwYXRjaCwgXCJUcmFuc2xhdGVkIHRvIFwiICsgbWV0YS5sYWJlbCArIFwiOiBcIiArIHRhcmdldFBhdGgpO1xuICAgICAgICAgIGJ1bXBUcmFuc2xhdGlvbkxpc3QoZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHJldHVybiBuICsgMTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvcGVuU3R1ZGlvRWRpdEZvcm0oZGlzcGF0Y2gsIHNpdGVJZCwgdGFyZ2V0UGF0aCwgYXV0aG9yaW5nQmFzZSB8fCBnZXRBdXRob3JpbmdCYXNlKCkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG5vdGlmeURpc3BhdGNoKGRpc3BhdGNoLCBcIlRyYW5zbGF0ZSBmYWlsZWQuXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBwYXRoTGF5b3V0Tm90ZSA9XG4gICAgICAhcm9vdERpciB8fCBzdWZmaXggPT0gbnVsbFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpblRvcDogXCI0cHhcIiwgbWF4V2lkdGg6IFwiNTIwcHhcIiwgbGluZUhlaWdodDogMS40NSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJUcmFuc2xhdGlvbiBsb2NhbGUgc2hvcnRjdXRzIHdvcmsgYmVzdCB3aGVuIHRoaXMgaXRlbSBsaXZlcyB1bmRlciBhIHBhdGggbGlrZSBcIixcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL3NpdGUv4oCmL3dlYnNpdGUve2xvY2FsZX0v4oCmXCIpLFxuICAgICAgICAgICAgXCIgb3IgXCIsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9zaXRlL+KApi9jb21wb25lbnRzL3tsb2NhbGV9L+KAplwiKSxcbiAgICAgICAgICAgIFwiLiBSZWxhdGVkIHRyYW5zbGF0aW9ucyBtYXkgc3RpbGwgYXBwZWFyIGZyb20gdGhlIHNlYXJjaCBpbmRleCBhYm92ZS5cIlxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgdmFyIHNvcnRlZFBhdGhzID0gc29ydFRyYW5zbGF0aW9uUGF0aHNGb3JEaXNwbGF5KHRyYW5zbGF0aW9uUGF0aHMsIHJlc29sdmVkU291cmNlS2V5KTtcbiAgICB2YXIgZmlsdGVyZWRQYXRocyA9IGZpbHRlclRyYW5zbGF0aW9uUGF0aHMoc29ydGVkUGF0aHMsIGZpbHRlclF1ZXJ5KTtcbiAgICAvKiogTGlzdCByb3dzIG9ubHkgZm9yIGxvY2FsZXMgdGhhdCBoYXZlIGNvbnRlbnQgKG9yIHRoaXMgZm9ybSk7IG1pc3NpbmcgbG9jYWxlcyBhcHBlYXIgdW5kZXIgVHJhbnNsYXRlIG9ubHkuICovXG4gICAgdmFyIHRyYW5zbGF0ZWRPbmx5UGF0aHMgPSBmaWx0ZXJlZFBhdGhzLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgICAgaWYgKCFwKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAocCA9PT0gZm9ybVBhdGgpIHJldHVybiB0cnVlO1xuICAgICAgdmFyIGV4ID0gZXhpc3RzQnlQYXRoW3BdO1xuICAgICAgaWYgKGV4ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgdmFyIGFjdGl2ZUxvY2FsZU1ldGEgPSAodHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcubWV0YSkgfHwgTE9DQUxFX01FVEE7XG4gICAgdmFyIHRvdGFsRmlsdGVyZWQgPSB0cmFuc2xhdGVkT25seVBhdGhzLmxlbmd0aDtcbiAgICB2YXIgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbEZpbHRlcmVkIC8gVFJBTlNMQVRJT05TX1BBR0VfU0laRSkpO1xuICAgIHZhciBzYWZlUGFnZSA9IE1hdGgubWluKHBhZ2VJbmRleCwgdG90YWxQYWdlcyAtIDEpO1xuICAgIHZhciBwYWdlU3RhcnQgPSBzYWZlUGFnZSAqIFRSQU5TTEFUSU9OU19QQUdFX1NJWkU7XG4gICAgdmFyIHBhZ2VTbGljZSA9IHRyYW5zbGF0ZWRPbmx5UGF0aHMuc2xpY2UocGFnZVN0YXJ0LCBwYWdlU3RhcnQgKyBUUkFOU0xBVElPTlNfUEFHRV9TSVpFKTtcbiAgICB2YXIgcmFuZ2VGcm9tID0gdG90YWxGaWx0ZXJlZCA9PT0gMCA/IDAgOiBwYWdlU3RhcnQgKyAxO1xuICAgIHZhciByYW5nZVRvID0gTWF0aC5taW4ocGFnZVN0YXJ0ICsgVFJBTlNMQVRJT05TX1BBR0VfU0laRSwgdG90YWxGaWx0ZXJlZCk7XG5cbiAgICB2YXIgZmlsdGVyVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGdhcDogXCIxMHB4XCIsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjhweFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBpbnB1dC1zbVwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJGaWx0ZXIgYnkgbGFuZ3VhZ2UsIGNvZGUsIG9yIHBhdGhcXHUyMDI2XCIsXG4gICAgICAgIHZhbHVlOiBmaWx0ZXJRdWVyeSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2V0RmlsdGVyUXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBzdHlsZTogeyBtYXhXaWR0aDogXCIyODBweFwiLCBmbGV4OiBcIjEgMSAxODBweFwiIH0sXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIkZpbHRlciB0cmFuc2xhdGlvbnNcIlxuICAgICAgfSksXG4gICAgICB0b3RhbEZpbHRlcmVkID4gMFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIiwgc3R5bGU6IHsgZm9udFNpemU6IFwiMTJweFwiLCB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIH0gfSxcbiAgICAgICAgICAgIFwiU2hvd2luZyBcIixcbiAgICAgICAgICAgIHJhbmdlRnJvbSxcbiAgICAgICAgICAgIFwiXFx1MjAxM1wiLFxuICAgICAgICAgICAgcmFuZ2VUbyxcbiAgICAgICAgICAgIFwiIG9mIFwiLFxuICAgICAgICAgICAgdG90YWxGaWx0ZXJlZFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsXG4gICAgKTtcblxuICAgIHZhciBwYWdpbmF0aW9uQmFyID1cbiAgICAgIHRvdGFsRmlsdGVyZWQgPiBUUkFOU0xBVElPTlNfUEFHRV9TSVpFXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGVmYXVsdCBidG4teHNcIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogc2FmZVBhZ2UgPD0gMCxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRQYWdlSW5kZXgoTWF0aC5tYXgoMCwgc2FmZVBhZ2UgLSAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlByZXZpb3VzXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIgfSB9LFxuICAgICAgICAgICAgICBcIlBhZ2UgXCIsXG4gICAgICAgICAgICAgIHNhZmVQYWdlICsgMSxcbiAgICAgICAgICAgICAgXCIgLyBcIixcbiAgICAgICAgICAgICAgdG90YWxQYWdlc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHNhZmVQYWdlID49IHRvdGFsUGFnZXMgLSAxLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFBhZ2VJbmRleChNYXRoLm1pbih0b3RhbFBhZ2VzIC0gMSwgc2FmZVBhZ2UgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIk5leHRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgdmFyIG9uVHJhbnNsYXRpb25Sb3dBY3RpdmF0ZSA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICBpZiAoaW5mbyAmJiBpbmZvLmlzU291cmNlICYmICFpbmZvLmlzQ3VycmVudFJvdyAmJiBpbmZvLnRhcmdldFBhdGgpIHtcbiAgICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICBpZiAocHJldiAmJiBub3JtYWxpemVTdHVkaW9QYXRoKHByZXYpID09PSBub3JtYWxpemVTdHVkaW9QYXRoKGluZm8udGFyZ2V0UGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaW5mby50YXJnZXRQYXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0Q29tcGFyZVNvdXJjZVBhdGgobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBsaXN0U2VjdGlvbiA9XG4gICAgICBsb2FkaW5nICYmIHRyYW5zbGF0aW9uUGF0aHMubGVuZ3RoID09PSAwXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI0cHggMCA4cHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJMb2FkaW5nIHRyYW5zbGF0aW9uc1xcdTIwMjZcIlxuICAgICAgICAgIClcbiAgICAgICAgOiB0cmFuc2xhdGlvblBhdGhzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBwYWRkaW5nOiBcIjRweCAwIDhweFwiIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJObyB0cmFuc2xhdGlvbnMgZm91bmQuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogbG9hZGluZyA/IDAuOSA6IDEgfSB9LFxuICAgICAgICAgICAgICBmaWx0ZXJUb29sYmFyLFxuICAgICAgICAgICAgICBwYWdlU2xpY2UubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIHBhZGRpbmc6IFwiNnB4IDBcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmlsdGVyZWQgPT09IDAgJiYgZmlsdGVyZWRQYXRocy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgPyBcIk5vIHRyYW5zbGF0ZWQgbG9jYWxlcyBtYXRjaCB5b3VyIGZpbHRlciAodW50cmFuc2xhdGVkIGxvY2FsZXMgYXJlIGluIFRyYW5zbGF0ZSBiZWxvdykuXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiTm8gdHJhbnNsYXRpb25zIG1hdGNoIHlvdXIgZmlsdGVyLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBwYWdlU2xpY2UubWFwKGZ1bmN0aW9uICh0YXJnZXRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2MgPSAoZ2V0TG9jYWxlRnJvbVBhdGgodGFyZ2V0UGF0aCkgfHwgXCJ1bmtub3duXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRhID1cbiAgICAgICAgICAgICAgICAgICAgICBtZXRhRm9yUGF0aExvY2FsZShhY3RpdmVMb2NhbGVNZXRhLCBsb2MpIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcIlxcdUQ4M0NcXHVERjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNTb3VyY2UgPVxuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkU291cmNlS2V5ICYmIGxvY2FsZVNlZ21lbnRzQ29tcGF0aWJsZShsb2MsIHJlc29sdmVkU291cmNlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IGV4aXN0c0J5UGF0aFt0YXJnZXRQYXRoXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRSb3cgPVxuICAgICAgICAgICAgICAgICAgICAgICEhZm9ybVBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAhIXRhcmdldFBhdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVTdHVkaW9QYXRoKGZvcm1QYXRoKSA9PT0gbm9ybWFsaXplU3R1ZGlvUGF0aCh0YXJnZXRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNsYXRpb25WZXJzaW9uUm93LCB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIG1ldGE6IG1ldGEsXG4gICAgICAgICAgICAgICAgICAgICAgaXNTb3VyY2U6IGlzU291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgIGV4aXN0czogZXhpc3RzLFxuICAgICAgICAgICAgICAgICAgICAgIGlzT3V0ZGF0ZWQ6ICEhc3RhbGVCeVBhdGhbdGFyZ2V0UGF0aF0sXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgb25UcmFuc2xhdGU6IHJ1blRyYW5zbGF0ZUZvclJvdyxcbiAgICAgICAgICAgICAgICAgICAgICBmb3JtUGF0aDogZm9ybVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgb25BY3RpdmF0ZTogb25UcmFuc2xhdGlvblJvd0FjdGl2YXRlLFxuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGFyZVNlbGVjdGVkOlxuICAgICAgICAgICAgICAgICAgICAgICAgISFjb21wYXJlU291cmNlUGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplU3R1ZGlvUGF0aChjb21wYXJlU291cmNlUGF0aCkgPT09IG5vcm1hbGl6ZVN0dWRpb1BhdGgodGFyZ2V0UGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZVRyYW5zbGF0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNTb3VyY2UgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc0N1cnJlbnRSb3cgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGFnZVRyYW5zbGF0aW9uUm93KHRhcmdldFBhdGgsIHJlc29sdmVkQ29udGVudFR5cGVJZCksXG4gICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVUcmFuc2xhdGlvbjogb3BlblJlbW92ZVRyYW5zbGF0aW9uTW9kYWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgcGFnaW5hdGlvbkJhclxuICAgICAgICAgICAgKTtcblxuICAgIHZhciBhdXRob3JpbmdCYXNlUmVzb2x2ZWQgPSBhdXRob3JpbmdCYXNlIHx8IGdldEF1dGhvcmluZ0Jhc2UoKTtcblxuICAgIHZhciBhZGRUcmFuc2xhdGlvbkJhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWRkVHJhbnNsYXRpb25Mb2NhbGVCYXIsIHtcbiAgICAgIGZvcm1QYXRoOiBmb3JtUGF0aCxcbiAgICAgIHRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoOiB0cmFuc2xhdGVDb3B5U291cmNlUGF0aCxcbiAgICAgIHNpdGVJZDogc2l0ZUlkLFxuICAgICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgICAgYXV0aG9yaW5nQmFzZTogYXV0aG9yaW5nQmFzZVJlc29sdmVkLFxuICAgICAgcm9vdERpcjogcm9vdERpcixcbiAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgZXhpc3RpbmdQYXRoczogdHJhbnNsYXRpb25QYXRocyxcbiAgICAgIG9uVHJhbnNsYXRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBidW1wVHJhbnNsYXRpb25MaXN0KGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgcmV0dXJuIG4gKyAxO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBsb2NhbGVDb2RlczogdHJhbnNsYXRpb25DZmcgJiYgdHJhbnNsYXRpb25DZmcuY29kZXMsXG4gICAgICBsb2NhbGVNZXRhOiB0cmFuc2xhdGlvbkNmZyAmJiB0cmFuc2xhdGlvbkNmZy5tZXRhLFxuICAgICAgdHJhbnNsYXRpb25DZmc6IHRyYW5zbGF0aW9uQ2ZnXG4gICAgfSk7XG5cbiAgICB2YXIgY29tcGFyZUxheW91dEJvZHkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtaW5XaWR0aDogMCB9IH0sXG4gICAgICBsaXN0U2VjdGlvbixcbiAgICAgIGFkZFRyYW5zbGF0aW9uQmFyXG4gICAgKTtcblxuICAgIHZhciByZW1vdmVUcmFuc2xhdGlvbk1vZGFsRWwgPSBudWxsO1xuICAgIGlmIChyZW1vdmVNb2RhbCkge1xuICAgICAgdmFyIHJtID0gcmVtb3ZlTW9kYWw7XG4gICAgICB2YXIgY2FuZGlkYXRlUm93cyA9XG4gICAgICAgICFybS5sb2FkaW5nICYmIHJtLmNhbmRpZGF0ZXMgJiYgcm0uY2FuZGlkYXRlcy5sZW5ndGhcbiAgICAgICAgICA/IHJtLmNhbmRpZGF0ZXMubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHZhciBwdGggPSBjLnBhdGg7XG4gICAgICAgICAgICAgIHZhciBjaGVja2VkID0gcm0uc2VsZWN0ZWRQYXRocyAmJiBybS5zZWxlY3RlZFBhdGhzW3B0aF07XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IHB0aCxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICBnYXA6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2U4ZThlOFwiLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcm0uc3VibWl0dGluZyA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZhZmFmYVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgY2hlY2tlZDogISFjaGVja2VkLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVSZW1vdmVDYW5kaWRhdGUocHRoLCBlLnRhcmdldC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBzdHlsZTogeyBtYXJnaW5Ub3A6IFwiM3B4XCIsIGZsZXhTaHJpbms6IDAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBsaW5lSGVpZ2h0OiAxLjQsIHdvcmRCcmVhazogXCJicmVhay1hbGxcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBcInN0cm9uZ1wiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiYmxvY2tcIiwgY29sb3I6IFwiIzIxMjUyOVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgKGMuaW50ZXJuYWxOYW1lICYmIFN0cmluZyhjLmludGVybmFsTmFtZSkudHJpbSgpKSB8fCBcIihubyBpbnRlcm5hbCBuYW1lKVwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIGNvbG9yOiBcIiM1NTVcIiB9IH0sIHB0aClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogbnVsbDtcblxuICAgICAgcmVtb3ZlVHJhbnNsYXRpb25Nb2RhbEVsID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6IFwiZGlhbG9nXCIsXG4gICAgICAgICAgXCJhcmlhLW1vZGFsXCI6IFwidHJ1ZVwiLFxuICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwidHJhbnNsYXRpb24tcmVtb3ZlLXRyYW5zbGF0aW9uLXRpdGxlXCIsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgIHpJbmRleDogMTAwNTAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40NSlcIixcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgcGFkZGluZzogXCIxNnB4XCIsXG4gICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQgJiYgIXJtLnN1Ym1pdHRpbmcpIGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICAgICAgICAgIG1heFdpZHRoOiBcIjU2MHB4XCIsXG4gICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgbWF4SGVpZ2h0OiBcIm1pbig4NXZoLCA2ODBweClcIixcbiAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC4yMilcIixcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjE0cHggMThweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgI2VlZVwiLFxuICAgICAgICAgICAgICAgIGZsZXhTaHJpbms6IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRyYW5zbGF0aW9uLXJlbW92ZS10cmFuc2xhdGlvbi10aXRsZVwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IG1hcmdpbjogMCwgZm9udFNpemU6IFwiMTZweFwiLCBmb250V2VpZ2h0OiA2MDAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlJlbW92ZSB0cmFuc2xhdGlvblwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxMnB4XCIsIG1hcmdpblRvcDogXCI2cHhcIiwgbGluZUhlaWdodDogMS40NSB9IH0sXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHJtLm1ldGFMYWJlbCksXG4gICAgICAgICAgICAgIFwiIOKAlCBcIixcbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgeyBzdHlsZTogeyBmb250U2l6ZTogXCIxMXB4XCIgfSB9LCBybS5wYWdlUGF0aClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiBcIjEycHggMThweFwiLCBvdmVyZmxvd1k6IFwiYXV0b1wiLCBmbGV4OiBcIjEgMSBhdXRvXCIsIG1pbkhlaWdodDogMCB9IH0sXG4gICAgICAgICAgICBybS5sb2FkaW5nXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ0ZXh0LW11dGVkXCIsIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI4cHggMFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIFwiRmluZGluZyBsb2NhbGUtc3BlY2lmaWMgY29tcG9uZW50cyBvbmx5IHVzZWQgYnkgdGhpcyBwYWdlXFx1MjAyNlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBybS5lcnJvclxuICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiBcIjEzcHhcIiwgcGFkZGluZzogXCI4cHggMTJweFwiLCBtYXJnaW5Cb3R0b206IFwiMTBweFwiIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBybS5lcnJvclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgIXJtLmxvYWRpbmcgJiYgIXJtLmVycm9yICYmICghcm0uY2FuZGlkYXRlcyB8fCAhcm0uY2FuZGlkYXRlcy5sZW5ndGgpXG4gICAgICAgICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwicFwiLFxuICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwidGV4dC1tdXRlZFwiLCBzdHlsZTogeyBmb250U2l6ZTogXCIxM3B4XCIsIG1hcmdpbjogXCI4cHggMCAxMnB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgXCJObyBzaGFyZWQgY29tcG9uZW50cyBpbiB0aGlzIGxvY2FsZSB3ZXJlIGZvdW5kIHRoYXQgYXJlIHNhZmUgdG8gZGVsZXRlIGF1dG9tYXRpY2FsbHkgKHRoZXkgbWF5IGJlIHJlZmVyZW5jZWQgZWxzZXdoZXJlKS4gVGhlIHRyYW5zbGF0ZWQgcGFnZSBjYW4gc3RpbGwgYmUgcmVtb3ZlZCBiZWxvdy5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgIXJtLmxvYWRpbmcgJiYgcm0uY2FuZGlkYXRlcyAmJiBybS5jYW5kaWRhdGVzLmxlbmd0aFxuICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBtYXJnaW5Cb3R0b206IFwiMTBweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IFwiMTNweFwiLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogXCI2cHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFwiQWxzbyBkZWxldGUgdGhlc2UgbG9jYWxlIGNvbXBvbmVudHMgKG5vIG90aGVyIHBhZ2UgcmVmZXJlbmNlcylcIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogXCJmbGV4XCIsIGdhcDogXCI4cHhcIiwgZmxleFdyYXA6IFwid3JhcFwiLCBtYXJnaW5Cb3R0b206IFwiOHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBbGxSZW1vdmVDYW5kaWRhdGVzKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJTZWxlY3QgYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWxsUmVtb3ZlQ2FuZGlkYXRlcyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcIlNlbGVjdCBub25lXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZVJvd3NcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwicFwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM4YzRhMDBcIixcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZmZmJlNlwiLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZmZlNThmXCIsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIlRoZSB0cmFuc2xhdGVkIHBhZ2Ugd2lsbCBiZSBkZWxldGVkIGFmdGVyIHRoZSBzZWxlY3RlZCBjb21wb25lbnRzLiBUaGlzIGNhbm5vdCBiZSB1bmRvbmUuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTJweCAxOHB4XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyVG9wOiBcIjFweCBzb2xpZCAjZWVlXCIsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiZmxleC1lbmRcIixcbiAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgZmxleFNocmluazogMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGVmYXVsdCBidG4tc21cIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIkNhbmNlbFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGFuZ2VyIGJ0bi1zbVwiLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIXJtLmxvYWRpbmcgfHwgISFybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGNvbmZpcm1SZW1vdmVUcmFuc2xhdGlvblxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBybS5zdWJtaXR0aW5nID8gXCJSZW1vdmluZ1xcdTIwMjZcIiA6IFwiUmVtb3ZlIHRyYW5zbGF0aW9uXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzc05hbWU6IFwiY3N0dWRpby1mb3JtLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyIHRyYW5zbGF0aW9uLXZlcnNpb25zLWNvbnRyb2xcIiB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcbiAgICAgICAgICAgIGdhcDogXCIyMHB4XCIsXG4gICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiIzIxMjUyOVwiLFxuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiLTAuMDFlbVwiLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuM1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJUcmFuc2xhdGlvbnNcIlxuICAgICAgICAgICksXG4gICAgICAgICAgcGF0aExheW91dE5vdGVcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiLCBtaW5XaWR0aDogMCB9IH0sXG4gICAgICAgICAgY29tcGFyZUxheW91dEJvZHlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHJlbW92ZVRyYW5zbGF0aW9uTW9kYWxFbFxuICAgICk7XG4gIH1cblxuICBDU3R1ZGlvRm9ybXMuQ29udHJvbHMuVHJhbnNsYXRpb25WZXJzaW9ucyA9XG4gICAgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRyYW5zbGF0aW9uVmVyc2lvbnMgfHxcbiAgICBmdW5jdGlvbiAoaWQsIGZvcm0sIG93bmVyLCBwcm9wZXJ0aWVzLCBjb25zdHJhaW50cykge1xuICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgdGhpcy5vd25lci5yZWdpc3RlckZpZWxkKHRoaXMpO1xuICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgICB0aGlzLmNvbnN0cmFpbnRzID0gY29uc3RyYWludHM7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbHVlID0gXCJfbm90LXNldFwiO1xuICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuc3VwcG9ydGVkUG9zdEZpeGVzID0gW107XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gIFlBSE9PLmV4dGVuZChDU3R1ZGlvRm9ybXMuQ29udHJvbHMuVHJhbnNsYXRpb25WZXJzaW9ucywgQ1N0dWRpb0Zvcm1zLkNTdHVkaW9Gb3JtRmllbGQsIHtcbiAgICAvKiogU2hvd24gaW4gdGhlIENvbnRlbnQgVHlwZXMgYnVpbGRlciBjb250cm9sIHBhbGV0dGUgKGRyYWctYW5kLWRyb3AgbGlzdCkuICovXG4gICAgZ2V0TGFiZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBcIlRyYW5zbGF0aW9uIHZlcnNpb25zIChUcmFuc2xhdGlvbilcIjtcbiAgICB9LFxuICAgIF9yZW5kZXI6IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgICB2YXIgY21zID0gQ3JhZnRlckNNU05leHQ7XG4gICAgICB2YXIgc2l0ZSA9XG4gICAgICAgICh0eXBlb2YgQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQgIT09IFwidW5kZWZpbmVkXCIgJiYgQ1N0dWRpb0F1dGhvcmluZ0NvbnRleHQuc2l0ZSkgfHxcbiAgICAgICAgKHNlbGYuZm9ybSAmJiBzZWxmLmZvcm0uc2l0ZSkgfHxcbiAgICAgICAgXCJcIjtcbiAgICAgIHZhciBpbnRlcm5hbE5hbWUgPVxuICAgICAgICAoc2VsZi5mb3JtLm1vZGVsICYmIChzZWxmLmZvcm0ubW9kZWxbXCJpbnRlcm5hbC1uYW1lXCJdIHx8IHNlbGYuZm9ybS5tb2RlbC5pbnRlcm5hbE5hbWUpKSB8fCBcIlwiO1xuICAgICAgdmFyIGNvbnRlbnRUeXBlSWQgPVxuICAgICAgICAoc2VsZi5mb3JtLm1vZGVsICYmIChzZWxmLmZvcm0ubW9kZWxbXCJjb250ZW50LXR5cGVcIl0gfHwgc2VsZi5mb3JtLm1vZGVsLmNvbnRlbnRUeXBlKSkgfHwgXCJcIjtcbiAgICAgIHZhciBwYW5lbFByb3BzID0ge1xuICAgICAgICBmb3JtUGF0aDogc2VsZi5mb3JtLnBhdGgsXG4gICAgICAgIHNpdGVJZDogc2l0ZSxcbiAgICAgICAgbW9kZWw6IHNlbGYuZm9ybS5tb2RlbCxcbiAgICAgICAgaW50ZXJuYWxOYW1lOiBpbnRlcm5hbE5hbWUsXG4gICAgICAgIGNvbnRlbnRUeXBlSWQ6IGNvbnRlbnRUeXBlSWQsXG4gICAgICAgIGZvcm06IHNlbGYuZm9ybSxcbiAgICAgICAgY29udHJvbENvbnRhaW5lckVsOiBzZWxmLmNvbnRhaW5lckVsXG4gICAgICB9O1xuICAgICAgaWYgKHNlbGYuX2Ntc1JlbmRlckhhbmRsZSAmJiBzZWxmLl9jbXNSZW5kZXJIYW5kbGUudW5tb3VudCkge1xuICAgICAgICBzZWxmLl9jbXNSZW5kZXJIYW5kbGUudW5tb3VudCh7IHJlbW92ZUNvbnRhaW5lcjogZmFsc2UgfSk7XG4gICAgICAgIHNlbGYuX2Ntc1JlbmRlckhhbmRsZSA9IG51bGw7XG4gICAgICB9XG4gICAgICBjbXNcbiAgICAgICAgLnJlbmRlcihcbiAgICAgICAgICBzZWxmLmNvbnRhaW5lckVsLFxuICAgICAgICAgIGZ1bmN0aW9uIFRyYW5zbGF0aW9uVmVyc2lvbnNCcmlkZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRyYW5zbGF0aW9uVmVyc2lvbnNQYW5lbCwgcHJvcHMpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFuZWxQcm9wc1xuICAgICAgICApXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgICBzZWxmLl9jbXNSZW5kZXJIYW5kbGUgPSBoYW5kbGU7XG4gICAgICAgICAgcGluVHJhbnNsYXRpb25WZXJzaW9uc0ZpZWxkVG9Ub3BPZkZvcm0oc2VsZi5mb3JtLCBzZWxmLmNvbnRhaW5lckVsKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW3RyYW5zbGF0aW9uLXZlcnNpb25zXSBGYWlsZWQgdG8gcmVuZGVyIGNvbnRyb2xcIiwgZXJyKTtcbiAgICAgICAgICBzZWxmLmNvbnRhaW5lckVsLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIiBzdHlsZT1cIm1hcmdpbjo4cHggMFwiPlRyYW5zbGF0aW9uIGNvbnRyb2wgY291bGQgbm90IGxvYWQuIFJlZnJlc2ggU3R1ZGlvIGFuZCBjaGVjayB0aGUgYnJvd3NlciBjb25zb2xlLjwvZGl2Pic7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoY29uZmlnLCBjb250YWluZXJFbCkge1xuICAgICAgY29udGFpbmVyRWwuaWQgPSB0aGlzLmlkO1xuICAgICAgdGhpcy5jb250YWluZXJFbCA9IGNvbnRhaW5lckVsO1xuICAgICAgdGhpcy5fcmVuZGVyKHRoaXMpO1xuICAgIH0sXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyRWwpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH0sXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRpb24tdmVyc2lvbnNcIjtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZFByb3BlcnRpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRQb3N0Rml4ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZFBvc3RGaXhlcztcbiAgICB9XG4gIH0pO1xuXG4gIENTdHVkaW9BdXRob3JpbmcuTW9kdWxlLm1vZHVsZUxvYWRlZChcInRyYW5zbGF0aW9uLXZlcnNpb25zXCIsIENTdHVkaW9Gb3Jtcy5Db250cm9scy5UcmFuc2xhdGlvblZlcnNpb25zKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBDcmFmdGVyQ01TTmV4dCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBDcmFmdGVyQ01TTmV4dC5SZWFjdCkge1xuICAgIGJvb3RUcmFuc2xhdGlvblZlcnNpb25zQ29udHJvbCgpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJDcmFmdGVyQ01TLkNvZGViYXNlQnJpZGdlUmVhZHlcIiwgYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sLCB7IG9uY2U6IHRydWUgfSk7XG4gIH1cbn0pKCk7XG4iXSwibmFtZXMiOlsiYm9vdFRyYW5zbGF0aW9uVmVyc2lvbnNDb250cm9sIiwiUmVhY3QiLCJDcmFmdGVyQ01TTmV4dCIsIlJFU0VSVkVEX0ZJUlNUX1NFR01FTlRTIiwid2Vic2l0ZSIsImNvbXBvbmVudHMiLCJ0ZW1wbGF0ZXMiLCJzY3JpcHRzIiwiY29uZmlnIiwiTVVMVElfTE9DQUxFX0NPREVTIiwiTE9DQUxFX01FVEEiLCJlbiIsImxhYmVsIiwiZmxhZyIsImVzIiwiamEiLCJ6aCIsImFyIiwicGluVHJhbnNsYXRpb25WZXJzaW9uc0ZpZWxkVG9Ub3BPZkZvcm0iLCJmb3JtIiwiY29udGFpbmVyRWwiLCJjbG9zZXN0Iiwicm93Iiwic2VjdGlvbnMiLCJsZW5ndGgiLCJmaXJzdFNlY3Rpb24iLCJtYXJrZXIiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsInNldEF0dHJpYnV0ZSIsImUiLCJmaW5kRm9ybUZpZWxkc0NvbXBhcmVIb3N0IiwiY29udHJvbENvbnRhaW5lckVsIiwic2VjIiwicGciLCJpY2UiLCJub2RlVHlwZSIsInBnMiIsImljZTIiLCJlMiIsInVud3JhcEZvcm1Db21wYXJlTGF5b3V0IiwiaG9zdCIsImRhdGFzZXQiLCJ0cmFuc2xhdGlvbkNvbXBhcmVXcmFwcGVkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm1haW4iLCJxdWVyeVNlbGVjdG9yIiwiZmlyc3RDaGlsZCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJlMyIsIlNNQVJUQ09QWV9DT01QQVJFX1dJRFRIX0xTIiwiYXBwbHlTb3VyY2VQYW5lV2lkdGhQeCIsImxlZnRFbCIsInRvdGFsUm93V2lkdGhQeCIsIndpZHRoUHgiLCJtaW5XIiwibWF4VyIsIk1hdGgiLCJtYXgiLCJyb3VuZCIsInciLCJtaW4iLCJmbGV4Iiwid2lkdGgiLCJtYXhXaWR0aCIsInJlYWRJbml0aWFsU291cmNlUGFuZVdpZHRoUHgiLCJob3N0V2lkdGhQeCIsIm1heEFsbG93ZWQiLCJzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm4iLCJwYXJzZUludCIsImlzTmFOIiwiZTAiLCJmbG9vciIsImF0dGFjaFNtYXJ0Y29weUNvbXBhcmVTcGxpdHRlciIsInNwbGl0dGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidGFiSW5kZXgiLCJjc3NUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBvaW50ZXJUeXBlIiwiYnV0dG9uIiwicHJldmVudERlZmF1bHQiLCJzdGFydFgiLCJjbGllbnRYIiwic3RhcnRXIiwib2Zmc2V0V2lkdGgiLCJnZXRNYXhXIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2V0UG9pbnRlckNhcHR1cmUiLCJwb2ludGVySWQiLCJjYXAiLCJvbk1vdmUiLCJldiIsImR4IiwibnciLCJvblVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbGVhc2VQb2ludGVyQ2FwdHVyZSIsInJlbCIsInNldEl0ZW0iLCJTdHJpbmciLCJscyIsIndyYXBGb3JtQ29tcGFyZUxheW91dCIsImlmcmFtZVNyYyIsInBhdGhMYWJlbCIsImV4aXN0aW5nSWZyYW1lIiwic3JjIiwiY29kZUVsIiwidGV4dENvbnRlbnQiLCJob3N0VyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJsZWZ0IiwiaGVhZGVyIiwidGl0bGVCbG9jayIsIm1pbldpZHRoIiwic3Ryb25nIiwic3ViIiwiY29kZSIsImNsb3NlQnRuIiwidHlwZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImU0IiwiaWZyYW1lIiwidGl0bGUiLCJlNSIsImdldExvY2FsZUxpc3QiLCJnZXRMb2NhbGVGcm9tUGF0aCIsInBhdGgiLCJwYXJ0cyIsInJlcGxhY2UiLCJzcGxpdCIsImZpbHRlciIsIkJvb2xlYW4iLCJsaXN0IiwiZmlyc3QiLCJ0b0xvd2VyQ2FzZSIsImNhbmRpZGF0ZSIsImluZGV4T2YiLCJ0ZXN0IiwibG9jYWxlU2VnbWVudHNDb21wYXRpYmxlIiwiYSIsImIiLCJ0cmltIiwiYyIsInN0YXJ0c1dpdGgiLCJtZXRhRm9yUGF0aExvY2FsZSIsImFjdGl2ZU1ldGEiLCJsb2MiLCJsayIsImtleSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInRyYW5zbGF0aW9uTG9jYWxlQWxyZWFkeVByZXNlbnQiLCJ0cmFuc2xhdGVkTG9jYWxlcyIsInNlZyIsIm5vcm1hbGl6ZVN0dWRpb1BhdGgiLCJwIiwiZ2V0TXVsdGlMb2NhbGVSb290RGlyIiwiZnVsbFBhdGgiLCJtIiwibWF0Y2giLCJwYXRoRm9yVGFyZ2V0TG9jYWxlIiwicm9vdERpciIsImxvY2FsZSIsInN1ZmZpeCIsInIiLCJzdWYiLCJwYXJzZVN1ZmZpeEZyb21Gb3JtUGF0aCIsImZvcm1QYXRoIiwiZnAiLCJybCIsImZsIiwicmVzdCIsInNsaWNlIiwiY2hhckF0Iiwic3VmZml4UGFydHMiLCJqb2luIiwiZmlyc3RMb2NhbGVTZWdtZW50VW5kZXJSb290IiwiZXhpc3RpbmdUcmFuc2xhdGlvbkxvY2FsZUtleXMiLCJwYXRocyIsImtleXMiLCJhZGQiLCJrIiwiZm9yRWFjaCIsInBhcnNlQ29udGVudEV4aXN0c1BheWxvYWQiLCJib2R5IiwiY29udGVudCIsInJlc3BvbnNlIiwicmVzdWx0IiwiZXhpc3RzIiwicmVzb2x2ZUF1dGhvcmluZ0NvbnRlbnRBcGlCYXNlIiwicHJlZiIsImdldEF1dGhvcmluZ0Jhc2UiLCJnZXRTdHVkaW9BcGlCYXNlIiwiY21zIiwiY3JhZnRlcmNtcyIsImdldFN0b3JlIiwic3RvcmUiLCJnZXRTdGF0ZSIsImVudiIsImF1dGhvcmluZ0Jhc2UiLCJDU3R1ZGlvQXV0aG9yaW5nQ29udGV4dCIsImJhc2VVcmkiLCJnZXRDcmFmdGVyU3R1ZGlvQWpheCIsInV0aWxzIiwiYWpheCIsIm1lcmdlRmV0Y2hIZWFkZXJzIiwiZXh0cmEiLCJvdXQiLCJhc3NpZ24iLCJnZXRHbG9iYWxIZWFkZXJzIiwiY29va2llIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidW53cmFwQWpheFJlc3BvbnNlIiwicmVzIiwidW5kZWZpbmVkIiwic3R1ZGlvQWpheEdldCIsInVybCIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3Vic2NyaWJlIiwibmV4dCIsImVycm9yIiwiZmV0Y2giLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwianNvbiIsInN0YXR1cyIsInN0dWRpb0FqYXhQb3N0IiwicGF5bG9hZCIsIl90eXBlb2YiLCJKU09OIiwic3RyaW5naWZ5IiwiaCIsInBvc3QiLCJtZXRob2QiLCJ1bndyYXBQbHVnaW5TY3JpcHRSZXN1bHRCb2R5Iiwib2siLCJmZXRjaFRyYW5zbGF0aW9uUmVtb3ZlQ2FuZGlkYXRlcyIsInN0dWRpb0Jhc2UiLCJzaXRlSWQiLCJwYWdlUGF0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1lc3NhZ2UiLCJjYW5kaWRhdGVzIiwicG9zdFRyYW5zbGF0aW9uUmVtb3ZlIiwiY29tcG9uZW50UGF0aHMiLCJkZWxldGVQYWdlIiwiZGVsZXRlZCIsImZhaWxlZCIsImlzUGFnZVRyYW5zbGF0aW9uUm93IiwidGFyZ2V0UGF0aCIsImNvbnRlbnRUeXBlSWQiLCJjdCIsImVuZHNXaXRoIiwiZXh0cmFjdFBhdGhzRnJvbVNlYXJjaEl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwibG9jYWxJZCIsInB1c2giLCJleHRyYWN0UGF0aHNGcm9tUGx1Z2luUmVzdWx0IiwiaXQiLCJmZXRjaFRyYW5zbGF0aW9uU2libGluZ3NGcm9tUGx1Z2luIiwiY29udGVudFR5cGUiLCJsb2NhbGVTb3VyY2VJZCIsIm9iamVjdElkIiwibGlkIiwib2lkIiwic2VhcmNoUGF0aHNCeUxvY2FsZVNvdXJjZUlkIiwicG9zdFNlYXJjaCIsImtleXdvcmRzIiwib2Zmc2V0IiwibGltaXQiLCJmaWx0ZXJzIiwibG9jYWxlU291cmNlSWRfcyIsImJvZHkyIiwiaXRlbXMyIiwiZmxhZ0ZvckxvY2FsZUNvZGUiLCJsb2NhbGVDb2RlIiwibWFwIiwiZGUiLCJjbiIsImZyIiwicHQiLCJrbyIsImZldGNoVHJhbnNsYXRpb25Db25maWciLCJBcnJheSIsImlzQXJyYXkiLCJsYW5ndWFnZXMiLCJjb2RlcyIsIm1ldGEiLCJsYyIsImJhc2VSYXciLCJiYXNlTGFuZ3VhZ2UiLCJiYXNlTG9jYWxlIiwiVFJBTlNMQVRJT05TX1BBR0VfU0laRSIsImxvY2FsZUxhYmVsRm9yUGF0aCIsInNvcnRUcmFuc2xhdGlvblBhdGhzRm9yRGlzcGxheSIsInNvdXJjZUxvY2FsZUtleSIsImFyciIsImlzU291cmNlUGF0aCIsInNvcnQiLCJhcyIsImJzIiwibGEiLCJsYiIsImNtcCIsImxvY2FsZUNvbXBhcmUiLCJzZW5zaXRpdml0eSIsImZpbHRlclRyYW5zbGF0aW9uUGF0aHMiLCJxdWVyeSIsInEiLCJnZXREaXNwYXRjaCIsImRpc3BhdGNoIiwiYmluZCIsImNvbnRlbnRFeGlzdHMiLCJiYXNlIiwicGFyc2VUaW1lc3RhbXBNcyIsImlucHV0IiwiaXNGaW5pdGUiLCJhc051bSIsIk51bWJlciIsInBhcnNlZCIsIkRhdGUiLCJwYXJzZSIsImdldEl0ZW1Nb2RpZmllZFRpbWVzdGFtcCIsImxhc3RNb2RpZmllZERhdGVfZHQiLCJsYXN0TW9kaWZpZWREYXRlIiwibGFzdEVkaXREYXRlIiwibW9kaWZpZWREYXRlIiwiZGF0ZU1vZGlmaWVkIiwiYnVpbGRMZWdhY3lSZWFkb25seUZvcm1TcmMiLCJub3RpZnlEaXNwYXRjaCIsIm9wZW5TdHVkaW9FZGl0Rm9ybSIsImF1dGhvcmluZ0Jhc2VGb3JEaWFsb2ciLCJhYiIsInNpdGUiLCJpc0hpZGRlbiIsIm9uU2F2ZVN1Y2Nlc3MiLCJpZCIsIm9uQ2FuY2VsIiwicmVzb2x2ZVRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIiwidHJhbnNsYXRpb25DZmciLCJ0cmFuc2xhdGlvblBhdGhzIiwicmVzb2x2ZWRTb3VyY2VLZXkiLCJmcm9tU291cmNlTG9jYWxlIiwiZmluZCIsInBhcmVudEZvbGRlclBhdGhGb3JDb3B5IiwiaSIsImxhc3RJbmRleE9mIiwiY29weUl0ZW1QYXN0ZVN0dWRpbyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXJlbnRQYXRoIiwiZXhwZWN0ZWRUYXJnZXRQYXRoIiwiQUREX1RSQU5TTEFUSU9OX1NFTEVDVF9DSEVWUk9OIiwiQWRkVHJhbnNsYXRpb25Mb2NhbGVCYXIiLCJwcm9wcyIsInRyYW5zbGF0ZUNvcHlTb3VyY2VQYXRoIiwiZXhpc3RpbmdQYXRocyIsIm9uVHJhbnNsYXRlZCIsInRyYW5zbGF0aW9uQ2ZnUHJvcCIsImxvY2FsZUNvZGVzIiwibG9jYWxlTWV0YSIsIm9wdFN0IiwidXNlU3RhdGUiLCJvcHRpb25zIiwic2V0T3B0aW9ucyIsInNlbFN0Iiwic2VsZWN0ZWQiLCJzZXRTZWxlY3RlZCIsImxvYWRTdCIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiYnVzeVN0IiwiY29weUJ1c3kiLCJzZXRDb3B5QnVzeSIsImZvY3VzU2VsU3QiLCJzZWxlY3RGb2N1c2VkIiwic2V0U2VsZWN0Rm9jdXNlZCIsImxvYWRUYXJnZXRzIiwidXNlQ2FsbGJhY2siLCJlZmZTdWZmaXgiLCJhcHBseUNvZGVzIiwicmF3Q29kZXMiLCJzZWVuIiwiYWN0aXZlQ29kZXMiLCJmZXRjaGVkIiwidXNlRWZmZWN0IiwicnVuVHJhbnNsYXRlIiwiY2hvaWNlIiwiY29udGVudEFwaUJhc2UiLCJlMSIsImVmZmVjdGl2ZU1pcnJvcmVkU3VmZml4IiwiaGludCIsInNlbGVjdERpc2FibGVkIiwic2VsZWN0U3R5bGUiLCJib3hTaXppbmciLCJtaW5IZWlnaHQiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nIiwicGFkZGluZ1JpZ2h0IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJvdXRsaW5lIiwiY3Vyc29yIiwib3BhY2l0eSIsImFwcGVhcmFuY2UiLCJXZWJraXRBcHBlYXJhbmNlIiwiTW96QXBwZWFyYW5jZSIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRSZXBlYXQiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsInRyYW5zaXRpb24iLCJhY3Rpb25zUm93U3R5bGUiLCJkaXNwbGF5IiwiZmxleFdyYXAiLCJnYXAiLCJhbGlnbkl0ZW1zIiwiYmFja2dyb3VuZCIsInNlbGVjdFdyYXBTdHlsZSIsImJ0bkljb25TdHlsZSIsImp1c3RpZnlDb250ZW50IiwiaGVpZ2h0IiwiZmxleFNocmluayIsImJ0blByaW1hcnlTdHlsZSIsImZvbnRXZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwibWFyZ2luVG9wIiwiZGlzYWJsZWQiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0Iiwib25Gb2N1cyIsIm9uQmx1ciIsIm8iLCJvbkNsaWNrIiwiUElMTF9TVFlMRVMiLCJ0ZXh0VHJhbnNmb3JtIiwic291cmNlIiwiY3VycmVudCIsIlJPV19TVVJGQUNFIiwiTUVOVV9UUklHR0VSX1NUWUxFIiwiZW5mb3JjZUFsbG93ZWRJdGVtc0luT3Blbk1lZ2FNZW51IiwiaGlkZUVkaXQiLCJhbGxvd2VkTGFiZWxzIiwidW5sb2NrIiwiaGlzdG9yeSIsImRlcGVuZGVuY2llcyIsImVkaXQiLCJub2RlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0eHQiLCJzY2hlZHVsZUVuZm9yY2VBbGxvd2VkSXRlbXNJbk1lZ2FNZW51Iiwic2V0VGltZW91dCIsIlRyYW5zbGF0aW9uVmVyc2lvblJvdyIsImlzU291cmNlIiwiaXNPdXRkYXRlZCIsIm9uVHJhbnNsYXRlIiwic2hvd1JlbW92ZVRyYW5zbGF0aW9uIiwib25SZW1vdmVUcmFuc2xhdGlvbiIsImlzQ3VycmVudFJvdyIsImlzQ29tcGFyZVNlbGVjdGVkIiwicm93Q2xpY2thYmxlIiwicm93U3R5bGUiLCJib3JkZXJDb2xvciIsInNob3dTdHVkaW9JdGVtTWVnYU1lbnUiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsInRvcCIsImNsaWVudFkiLCJhbmNob3JSZWZlcmVuY2UiLCJhbmNob3JQb3NpdGlvbiIsIm9uQWN0aXZhdGUiLCJyb2xlIiwib25LZXlEb3duIiwibWFyZ2luTGVmdCIsIndoaXRlU3BhY2UiLCJUcmFuc2xhdGlvblZlcnNpb25zUGFuZWwiLCJtb2RlbCIsInJlc29sdmVkQ29udGVudFR5cGVJZCIsInNvdXJjZUxvY2FsZSIsInNvdXJjZUxvY2FsZUNvZGVfcyIsIm1vZGVsTG9jYWxlIiwibG9jYWxlQ29kZV9zIiwicGF0aExvY2FsZSIsInJlc29sdmVkU291cmNlIiwiYXV0aG9yaW5nQmFzZVN0YXRlIiwic2V0QXV0aG9yaW5nQmFzZSIsInBhdGhzU3RhdGUiLCJzZXRUcmFuc2xhdGlvblBhdGhzIiwibG9hZGluZ1N0YXRlIiwiZmlsdGVyU3RhdGUiLCJmaWx0ZXJRdWVyeSIsInNldEZpbHRlclF1ZXJ5IiwicGFnZVN0YXRlIiwicGFnZUluZGV4Iiwic2V0UGFnZUluZGV4IiwibGlzdFJlZnJlc2hTdCIsInRyYW5zbGF0aW9uTGlzdFJlZnJlc2hLZXkiLCJidW1wVHJhbnNsYXRpb25MaXN0IiwidHJhbnNsYXRpb25DZmdTdCIsInNldFRyYW5zbGF0aW9uQ2ZnIiwic3RhbGVCeVBhdGhTdCIsInN0YWxlQnlQYXRoIiwic2V0U3RhbGVCeVBhdGgiLCJleGlzdHNCeVBhdGhTdCIsImV4aXN0c0J5UGF0aCIsInNldEV4aXN0c0J5UGF0aCIsImNvbXBhcmVQYXRoU3QiLCJjb21wYXJlU291cmNlUGF0aCIsInNldENvbXBhcmVTb3VyY2VQYXRoIiwicmVtb3ZlTW9kYWxTdCIsInJlbW92ZU1vZGFsIiwic2V0UmVtb3ZlTW9kYWwiLCJjdXJyZW50TG9jYWxlIiwiYWN0aXZlIiwiY2ZnIiwiY2FuY2VsbGVkIiwiZmluaXNoIiwibHNpZCIsImN0eXBlIiwiY3VyIiwicGF0aE9rRm9yTG9jYWxlUHJvYmUiLCJydW5GYWxsYmFjayIsIm1lcmdlUGF0aHNBbmRGaW5pc2giLCJhbGwiLCJyZXN1bHRzIiwiYXBwbHlNYXAiLCJjZmdDb2RlcyIsImZvdW5kIiwibGVnYWN5UGF0aHMiLCJjb25jYXQiLCJzb3VyY2VNcyIsInRhcmdldE1zIiwicGFpcnMiLCJvbkNsb3NlQ29tcGFyZSIsImNsb3NlUmVtb3ZlVHJhbnNsYXRpb25Nb2RhbCIsIm9wZW5SZW1vdmVUcmFuc2xhdGlvbk1vZGFsIiwidHAiLCJtZXRhTGFiZWwiLCJzZWxlY3RlZFBhdGhzIiwic3VibWl0dGluZyIsInNiIiwicHJldiIsInNlbCIsInRvZ2dsZVJlbW92ZUNhbmRpZGF0ZSIsImNoZWNrZWQiLCJuZXh0U2VsIiwic2V0QWxsUmVtb3ZlQ2FuZGlkYXRlcyIsImNvbmZpcm1SZW1vdmVUcmFuc2xhdGlvbiIsImRlbGV0ZWRQYWdlIiwic29tZSIsIm1zZyIsImYiLCJydW5UcmFuc2xhdGVGb3JSb3ciLCJwYXRoTGF5b3V0Tm90ZSIsInNvcnRlZFBhdGhzIiwiZmlsdGVyZWRQYXRocyIsInRyYW5zbGF0ZWRPbmx5UGF0aHMiLCJleCIsImFjdGl2ZUxvY2FsZU1ldGEiLCJ0b3RhbEZpbHRlcmVkIiwidG90YWxQYWdlcyIsImNlaWwiLCJzYWZlUGFnZSIsInBhZ2VTdGFydCIsInBhZ2VTbGljZSIsInJhbmdlRnJvbSIsInJhbmdlVG8iLCJmaWx0ZXJUb29sYmFyIiwicGxhY2Vob2xkZXIiLCJwYWdpbmF0aW9uQmFyIiwib25UcmFuc2xhdGlvblJvd0FjdGl2YXRlIiwiaW5mbyIsImxpc3RTZWN0aW9uIiwiYXV0aG9yaW5nQmFzZVJlc29sdmVkIiwiYWRkVHJhbnNsYXRpb25CYXIiLCJjb21wYXJlTGF5b3V0Qm9keSIsInJlbW92ZVRyYW5zbGF0aW9uTW9kYWxFbCIsInJtIiwiY2FuZGlkYXRlUm93cyIsInB0aCIsIndvcmRCcmVhayIsImludGVybmFsTmFtZSIsInBvc2l0aW9uIiwiaW5zZXQiLCJ6SW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwibWF4SGVpZ2h0IiwiZmxleERpcmVjdGlvbiIsIm92ZXJmbG93IiwiYm9yZGVyQm90dG9tIiwibWFyZ2luIiwib3ZlcmZsb3dZIiwiYm9yZGVyVG9wIiwiQ1N0dWRpb0Zvcm1zIiwiQ29udHJvbHMiLCJUcmFuc2xhdGlvblZlcnNpb25zIiwib3duZXIiLCJwcm9wZXJ0aWVzIiwiY29uc3RyYWludHMiLCJyZWdpc3RlckZpZWxkIiwiZXJyb3JzIiwicmVxdWlyZWQiLCJzdXBwb3J0ZWRQb3N0Rml4ZXMiLCJZQUhPTyIsImV4dGVuZCIsIkNTdHVkaW9Gb3JtRmllbGQiLCJnZXRMYWJlbCIsIl9yZW5kZXIiLCJzZWxmIiwicGFuZWxQcm9wcyIsIl9jbXNSZW5kZXJIYW5kbGUiLCJ1bm1vdW50IiwicmVtb3ZlQ29udGFpbmVyIiwicmVuZGVyIiwiVHJhbnNsYXRpb25WZXJzaW9uc0JyaWRnZSIsImhhbmRsZSIsImVyciIsImNvbnNvbGUiLCJpbm5lckhUTUwiLCJyZWZyZXNoIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImdldE5hbWUiLCJnZXRTdXBwb3J0ZWRQcm9wZXJ0aWVzIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJnZXRTdXBwb3J0ZWRQb3N0Rml4ZXMiLCJDU3R1ZGlvQXV0aG9yaW5nIiwiTW9kdWxlIiwibW9kdWxlTG9hZGVkIiwib25jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztFQUVBLFNBQVNBLDhCQUE4QkEsR0FBRztFQUN4QyxFQUFBLElBQUlDLEtBQUssR0FBR0MsY0FBYyxDQUFDRCxLQUFLLENBQUE7RUFFaEMsRUFBQSxJQUFJRSx1QkFBdUIsR0FBRztFQUM1QkMsSUFBQUEsT0FBTyxFQUFFLENBQUM7RUFDVkMsSUFBQUEsVUFBVSxFQUFFLENBQUM7RUFDYixJQUFBLGVBQWUsRUFBRSxDQUFDO0VBQ2xCQyxJQUFBQSxTQUFTLEVBQUUsQ0FBQztFQUNaQyxJQUFBQSxPQUFPLEVBQUUsQ0FBQztFQUNWQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQTtLQUNULENBQUE7SUFJRCxJQUFJQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0VBQ2pELEVBQUEsSUFBSUMsV0FBVyxHQUFHO0VBQ2hCQyxJQUFBQSxFQUFFLEVBQUU7RUFBRUMsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLDBCQUFBO09BQTRCO0VBQzFEQyxJQUFBQSxFQUFFLEVBQUU7RUFBRUYsTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLDBCQUFBO09BQTRCO0VBQzFERSxJQUFBQSxFQUFFLEVBQUU7RUFBRUgsTUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsTUFBQUEsSUFBSSxFQUFFLDBCQUFBO09BQTRCO0VBQzNERyxJQUFBQSxFQUFFLEVBQUU7RUFBRUosTUFBQUEsS0FBSyxF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
