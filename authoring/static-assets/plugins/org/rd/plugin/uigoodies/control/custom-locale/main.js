(function () {
  'use strict';

  function bootCustomLocaleControl() {
    var React = CrafterCMSNext.React;
    var CrafterCMSNextBridge = CrafterCMSNext.components.CrafterCMSNextBridge;
    var ConfirmDialog = CrafterCMSNext.components.ConfirmDialog;
    var STYLE_ID = "uigoodies-custom-locale-css";

    function ensureStyles() {
      if (typeof document === "undefined") return;
      if (document.getElementById(STYLE_ID)) return;
      var style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = ".uigoodies-custom-locale{" + "--cl-input-bg:#f8fafc;" + "--cl-input-fg:#0f172a;" + "--cl-input-bd:#cbd5e1;" + "--cl-btn-on:#2563eb;" + "--cl-btn-off:#94a3b8;" + "--cl-btn-fg:#ffffff;" + "--cl-btn-shadow:0 1px 2px rgba(37,99,235,0.35);" + "}" + "@media (prefers-color-scheme: dark){" + ".uigoodies-custom-locale{" + "--cl-input-bg:#2d2d2d;" + "--cl-input-fg:#e8eaed;" + "--cl-input-bd:#5f6368;" + "--cl-btn-on:#409cff;" + "--cl-btn-off:#5f6368;" + "--cl-btn-fg:#ffffff;" + "--cl-btn-shadow:0 1px 2px rgba(0,0,0,0.45);" + "}" + "}" + ".uigoodies-custom-locale-field{display:block;width:100%;box-sizing:border-box;clear:both;}" + ".uigoodies-custom-locale-field>.cstudio-form-field-title{" + "display:block!important;float:none!important;width:100%!important;" + "margin:0 0 6px 0!important;padding:0!important;text-align:left!important;" + "line-height:1.4!important;box-sizing:border-box;" + "}" + ".uigoodies-custom-locale-control{display:block;width:100%;float:none;clear:both;min-width:0;box-sizing:border-box;}" + ".uigoodies-custom-locale-row{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;" + "gap:12px;width:100%;min-width:0;box-sizing:border-box;}" + ".uigoodies-custom-locale-input{flex:1 1 auto;min-width:0;box-sizing:border-box;padding:10px 12px;" + "border:1px solid var(--cl-input-bd);border-radius:8px;background:var(--cl-input-bg);color:var(--cl-input-fg);" + "font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.4;}" + ".uigoodies-custom-locale-btn{flex-shrink:0;white-space:nowrap;padding:11px 20px;border-radius:10px;border:none;" + "font-weight:600;font-size:13px;letter-spacing:0.02em;color:var(--cl-btn-fg);transition:background 0.15s ease,box-shadow 0.15s ease;}" + ".uigoodies-custom-locale-btn.is-enabled{background:var(--cl-btn-on);cursor:pointer;box-shadow:var(--cl-btn-shadow);}" + ".uigoodies-custom-locale-btn.is-disabled{background:var(--cl-btn-off);cursor:not-allowed;box-shadow:none;}";
      document.head.appendChild(style);
    }

    ensureStyles();
    var RESERVED_FIRST_SEGMENTS = {
      website: 1,
      components: 1,
      "static-assets": 1,
      templates: 1,
      scripts: 1,
      config: 1
    };

    function CustomLocale(props) {
      var isOpenState = React.useState(false);
      var isDialogOpen = isOpenState[0];
      var setIsDialogOpen = isOpenState[1];
      var localeState = React.useState(props.locale);
      var locale = localeState[0];
      var setLocale = localeState[1];
      React.useEffect(function () {
        setLocale(props.locale);
      }, [props.locale]);
      React.useEffect(function () {
        if (!locale || typeof props.onLocaleChange !== "function") return;
        props.onLocaleChange(locale);
      }, [locale, props.onLocaleChange]);

      var onConfirmOk = function onConfirmOk(e) {
        e.preventDefault();

        var _props$unlinkLocale = props.unlinkLocale();

        var uuid = _props$unlinkLocale.uuid;
        var sourceLocaleCode = _props$unlinkLocale.sourceLocaleCode;
        setLocale({
          localeCode: locale.localeCode,
          localeSourceId: uuid,
          sourceLocaleCode: sourceLocaleCode
        });
        setIsDialogOpen(false);
      };

      if (!locale) {
        return null;
      }

      var pathLocale = (locale.localeCode || "").toLowerCase();
      var sourceLocale = (locale.sourceLocaleCode || "").toLowerCase();
      var canUnlink = !!(pathLocale && sourceLocale && pathLocale !== sourceLocale);
      var sourceId = locale.localeSourceId && String(locale.localeSourceId).trim() || "";
      return React.createElement("div", {
        className: "uigoodies-custom-locale uigoodies-custom-locale-row"
      }, React.createElement("input", {
        type: "text",
        readOnly: true,
        className: "uigoodies-custom-locale-input",
        value: sourceId,
        title: sourceId || "No locale source id",
        "aria-label": "Locale Source ID"
      }), React.createElement("button", {
        type: "button",
        className: "uigoodies-custom-locale-btn " + (canUnlink ? "is-enabled" : "is-disabled"),
        disabled: !canUnlink,
        title: canUnlink ? "Unlink this item from its translation source" : "This item is not linked to a different source locale",
        onClick: function onClick() {
          if (!canUnlink) return;
          setIsDialogOpen(true);
        }
      }, "Unlink Translation"), React.createElement(CrafterCMSNextBridge, null, React.createElement(ConfirmDialog, {
        open: isDialogOpen,
        onOk: onConfirmOk,
        onCancel: function onCancel() {
          setIsDialogOpen(false);
        },
        onClose: function onClose() {
          setIsDialogOpen(false);
        },
        body: "Warning: By unlinking this content you are indicating that this object has no localization relationships to any other objects in the system. Do you wish to continue?",
        title: "Unlink Translation",
        disableEnforceFocus: false
      })));
    }

    CStudioForms.Controls.CustomLocale = CStudioForms.Controls.CustomLocale || function (id, form, owner, properties, constraints) {
      this.owner = owner;
      this.owner.registerField(this);
      this.errors = [];
      this.properties = properties;
      this.constraints = constraints;
      this.inputEl = null;
      this.countEl = null;
      this.required = false;
      this.value = "_not-set";
      this.form = form;
      this.id = id;
      this.supportedPostFixes = ["_s"];
      return this;
    };

    YAHOO.extend(CStudioForms.Controls.CustomLocale, CStudioForms.CStudioFormField, {
      /**
       * Shown in the Content Types builder control palette (drag-and-drop list).
       * The field row label in the form still comes from the form definition field title.
       */
      getLabel: function getLabel() {
        return "Custom locale (Translation)";
      },

      /**
       * Legacy allow-list (folder names). Also used as hints; path parser accepts standard BCP47-style segments.
       */
      _getLocaleList: function _getLocaleList() {
        return ["en", "es", "ja", "zh", "us", "uk", "de", "fr", "it", "dk", "fi", "nl", "no", "ru", "se", "br", "el", "jp", "pt", "ko", "ar", "pl", "tr", "vi"];
      },

      /**
       * Locale folder from repo path: /site/{site}/website/en/... or /site/{site}/components/en/...
       */
      _getLocaleFromPath: function _getLocaleFromPath(path) {
        if (!path) return "";
        var parts = path.replace(/^\/site\/[^/]+\//i, "").split("/").filter(Boolean);
        if (parts.length === 0) return "";
        var first = parts[0].toLowerCase();

        if (RESERVED_FIRST_SEGMENTS[first] && parts[1]) {
          var candidate = parts[1].toLowerCase();

          if (this._getLocaleList().indexOf(candidate) >= 0) {
            return candidate;
          }

          if (/^[a-z]{2}(-[a-z0-9]{1,8})?$/i.test(parts[1])) {
            return candidate;
          }

          return "";
        }

        if (RESERVED_FIRST_SEGMENTS[first]) {
          return "";
        }

        if (this._getLocaleList().indexOf(first) >= 0) {
          return first;
        }

        if (/^[a-z]{2}(-[a-z0-9]{1,8})?$/i.test(parts[0])) {
          return first;
        }

        return "";
      },
      _unlinkLocale: function _unlinkLocale(obj) {
        var uuid = CStudioAuthoring.Utils.generateUUID();

        var sourceLocaleCode = this._getLocaleFromPath(obj.form.path);

        obj.form.updateModel("localeSourceId_s", uuid);
        obj.form.updateModel("sourceLocaleCode_s", sourceLocaleCode);
        return {
          uuid: uuid,
          sourceLocaleCode: sourceLocaleCode
        };
      },
      _renderReactComponent: function _renderReactComponent(obj) {
        var localeFromPath = this._getLocaleFromPath(obj.form.path);

        if (!obj.form.model.localeSourceId_s) {
          return this._renderNewItem(obj, localeFromPath);
        }

        return this._renderExistingItem(obj, localeFromPath);
      },
      _mountCustomLocale: function _mountCustomLocale(obj, locale, key) {
        var cms = CrafterCMSNext;
        obj.value = locale.localeSourceId || "";
        var props = {
          locale: locale,
          onLocaleChange: function onLocaleChange(nextLocale) {
            obj.value = nextLocale.localeSourceId || "";
            obj.form.updateModel("localeCode_s", nextLocale.localeCode || "");
            obj.form.updateModel("sourceLocaleCode_s", nextLocale.sourceLocaleCode || "");
            obj.form.updateModel("localeSourceId_s", nextLocale.localeSourceId || "");
          },
          unlinkLocale: function () {
            return this._unlinkLocale(obj);
          }.bind(this)
        };
        var handleKey = key || "default";

        if (!obj._cmsRenderHandles) {
          obj._cmsRenderHandles = {};
        }

        if (obj._cmsRenderHandles[handleKey] && obj._cmsRenderHandles[handleKey].unmount) {
          obj._cmsRenderHandles[handleKey].unmount({
            removeContainer: false
          });
        }

        var mountEl = obj.controlWidgetContainerEl || obj.containerEl;
        mountEl.style.width = "100%";
        mountEl.style.minWidth = "0";
        mountEl.style.boxSizing = "border-box";
        cms.render(mountEl, function CustomLocaleBridge(props) {
          return React.createElement(CustomLocale, props);
        }, props).then(function (handle) {
          obj._cmsRenderHandles[handleKey] = handle; // React root wrappers from CrafterCMSNext.render often don't stretch; force full width.

          var root = mountEl.firstElementChild;

          if (root && root.style) {
            root.style.width = "100%";
            root.style.minWidth = "0";
            root.style.boxSizing = "border-box";
            root.style.display = "block";
          }
        })["catch"](function (err) {
          console.error("[custom-locale] Failed to render control", err);
          mountEl.innerHTML = '<div class="alert alert-warning" style="margin:8px 0">Locale control could not load. Refresh Studio and check the console.</div>';
        });
      },
      _renderNewItem: function _renderNewItem(obj, localeFromPath) {
        var locale = {
          localeCode: localeFromPath,
          sourceLocaleCode: localeFromPath,
          localeSourceId: CStudioAuthoring.Utils.generateUUID()
        };
        obj.form.updateModel("localeCode_s", locale.localeCode);
        obj.form.updateModel("sourceLocaleCode_s", locale.sourceLocaleCode);
        obj.form.updateModel("localeSourceId_s", locale.localeSourceId);

        this._mountCustomLocale(obj, locale, "new");
      },
      _renderExistingItem: function _renderExistingItem(obj, localeFromPath) {
        var model = obj.form.model;
        var persisted = model.localeCode_s && String(model.localeCode_s).trim() ? String(model.localeCode_s).trim().toLowerCase() : "";
        var fromPath = localeFromPath || "";
        var localeCode = persisted || fromPath;
        var locale = {
          localeCode: localeCode,
          sourceLocaleCode: model.sourceLocaleCode_s ? String(model.sourceLocaleCode_s).trim().toLowerCase() : localeCode,
          localeSourceId: model.localeSourceId_s
        };
        obj.form.updateModel("localeCode_s", locale.localeCode);
        obj.form.updateModel("sourceLocaleCode_s", locale.sourceLocaleCode);

        this._mountCustomLocale(obj, locale, "existing");
      },
      render: function render(config, containerEl) {
        containerEl.id = this.id;
        this.containerEl = containerEl;
        YAHOO.util.Dom.addClass(containerEl, "uigoodies-custom-locale");
        YAHOO.util.Dom.addClass(containerEl, "uigoodies-custom-locale-field");
        var titleEl = document.createElement("span");
        YAHOO.util.Dom.addClass(titleEl, "cstudio-form-field-title");
        titleEl.textContent = config.title || "Locale Source ID";
        containerEl.appendChild(titleEl);
        var controlWidgetContainerEl = document.createElement("div");
        YAHOO.util.Dom.addClass(controlWidgetContainerEl, "cstudio-form-control-uuid-container");
        YAHOO.util.Dom.addClass(controlWidgetContainerEl, "uigoodies-custom-locale-control");
        containerEl.appendChild(controlWidgetContainerEl);
        this.controlWidgetContainerEl = controlWidgetContainerEl;

        if (config.description) {
          var descriptionEl = document.createElement("span");
          YAHOO.util.Dom.addClass(descriptionEl, "description");
          YAHOO.util.Dom.addClass(descriptionEl, "cstudio-form-field-description");
          descriptionEl.style.cssText = "display:block;width:100%;float:none;margin:6px 0 0 0;padding:0;text-align:left;";
          descriptionEl.innerHTML = config.description;
          containerEl.appendChild(descriptionEl);
        }

        this._renderReactComponent(this);
      },
      getValue: function getValue() {
        return this.value;
      },
      setValue: function setValue(value) {
        this.value = value;
      },
      getName: function getName() {
        return "custom-locale";
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
    CStudioAuthoring.Module.moduleLoaded("custom-locale", CStudioForms.Controls.CustomLocale);
  }

  (function () {
    if (typeof CrafterCMSNext !== "undefined" && CrafterCMSNext.React) {
      bootCustomLocaleControl();
    } else {
      document.addEventListener("CrafterCMS.CodebaseBridgeReady", bootCustomLocaleControl, {
        once: true
      });
    }
  })();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3BhY2thZ2VzL2N1c3RvbS1sb2NhbGUvc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGJvb3RDdXN0b21Mb2NhbGVDb250cm9sKCkge1xuICB2YXIgUmVhY3QgPSBDcmFmdGVyQ01TTmV4dC5SZWFjdDtcbiAgdmFyIENyYWZ0ZXJDTVNOZXh0QnJpZGdlID0gQ3JhZnRlckNNU05leHQuY29tcG9uZW50cy5DcmFmdGVyQ01TTmV4dEJyaWRnZTtcbiAgdmFyIENvbmZpcm1EaWFsb2cgPSBDcmFmdGVyQ01TTmV4dC5jb21wb25lbnRzLkNvbmZpcm1EaWFsb2c7XG5cbiAgdmFyIFNUWUxFX0lEID0gXCJ1aWdvb2RpZXMtY3VzdG9tLWxvY2FsZS1jc3NcIjtcbiAgZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoU1RZTEVfSUQpKSByZXR1cm47XG4gICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLmlkID0gU1RZTEVfSUQ7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPVxuICAgICAgXCIudWlnb29kaWVzLWN1c3RvbS1sb2NhbGV7XCIgK1xuICAgICAgXCItLWNsLWlucHV0LWJnOiNmOGZhZmM7XCIgK1xuICAgICAgXCItLWNsLWlucHV0LWZnOiMwZjE3MmE7XCIgK1xuICAgICAgXCItLWNsLWlucHV0LWJkOiNjYmQ1ZTE7XCIgK1xuICAgICAgXCItLWNsLWJ0bi1vbjojMjU2M2ViO1wiICtcbiAgICAgIFwiLS1jbC1idG4tb2ZmOiM5NGEzYjg7XCIgK1xuICAgICAgXCItLWNsLWJ0bi1mZzojZmZmZmZmO1wiICtcbiAgICAgIFwiLS1jbC1idG4tc2hhZG93OjAgMXB4IDJweCByZ2JhKDM3LDk5LDIzNSwwLjM1KTtcIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspe1wiICtcbiAgICAgIFwiLnVpZ29vZGllcy1jdXN0b20tbG9jYWxle1wiICtcbiAgICAgIFwiLS1jbC1pbnB1dC1iZzojMmQyZDJkO1wiICtcbiAgICAgIFwiLS1jbC1pbnB1dC1mZzojZThlYWVkO1wiICtcbiAgICAgIFwiLS1jbC1pbnB1dC1iZDojNWY2MzY4O1wiICtcbiAgICAgIFwiLS1jbC1idG4tb246IzQwOWNmZjtcIiArXG4gICAgICBcIi0tY2wtYnRuLW9mZjojNWY2MzY4O1wiICtcbiAgICAgIFwiLS1jbC1idG4tZmc6I2ZmZmZmZjtcIiArXG4gICAgICBcIi0tY2wtYnRuLXNoYWRvdzowIDFweCAycHggcmdiYSgwLDAsMCwwLjQ1KTtcIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIn1cIiArXG4gICAgICBcIi51aWdvb2RpZXMtY3VzdG9tLWxvY2FsZS1maWVsZHtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O2NsZWFyOmJvdGg7fVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy1jdXN0b20tbG9jYWxlLWZpZWxkPi5jc3R1ZGlvLWZvcm0tZmllbGQtdGl0bGV7XCIgK1xuICAgICAgXCJkaXNwbGF5OmJsb2NrIWltcG9ydGFudDtmbG9hdDpub25lIWltcG9ydGFudDt3aWR0aDoxMDAlIWltcG9ydGFudDtcIiArXG4gICAgICBcIm1hcmdpbjowIDAgNnB4IDAhaW1wb3J0YW50O3BhZGRpbmc6MCFpbXBvcnRhbnQ7dGV4dC1hbGlnbjpsZWZ0IWltcG9ydGFudDtcIiArXG4gICAgICBcImxpbmUtaGVpZ2h0OjEuNCFpbXBvcnRhbnQ7Ym94LXNpemluZzpib3JkZXItYm94O1wiICtcbiAgICAgIFwifVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy1jdXN0b20tbG9jYWxlLWNvbnRyb2x7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2Zsb2F0Om5vbmU7Y2xlYXI6Ym90aDttaW4td2lkdGg6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7fVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy1jdXN0b20tbG9jYWxlLXJvd3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2ZsZXgtd3JhcDpub3dyYXA7YWxpZ24taXRlbXM6Y2VudGVyO1wiICtcbiAgICAgIFwiZ2FwOjEycHg7d2lkdGg6MTAwJTttaW4td2lkdGg6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7fVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy1jdXN0b20tbG9jYWxlLWlucHV0e2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6MTBweCAxMnB4O1wiICtcbiAgICAgIFwiYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1jbC1pbnB1dC1iZCk7Ym9yZGVyLXJhZGl1czo4cHg7YmFja2dyb3VuZDp2YXIoLS1jbC1pbnB1dC1iZyk7Y29sb3I6dmFyKC0tY2wtaW5wdXQtZmcpO1wiICtcbiAgICAgIFwiZm9udC1mYW1pbHk6dWktbW9ub3NwYWNlLFNGTW9uby1SZWd1bGFyLE1lbmxvLE1vbmFjbyxDb25zb2xhcyxtb25vc3BhY2U7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MS40O31cIiArXG4gICAgICBcIi51aWdvb2RpZXMtY3VzdG9tLWxvY2FsZS1idG57ZmxleC1zaHJpbms6MDt3aGl0ZS1zcGFjZTpub3dyYXA7cGFkZGluZzoxMXB4IDIwcHg7Ym9yZGVyLXJhZGl1czoxMHB4O2JvcmRlcjpub25lO1wiICtcbiAgICAgIFwiZm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxM3B4O2xldHRlci1zcGFjaW5nOjAuMDJlbTtjb2xvcjp2YXIoLS1jbC1idG4tZmcpO3RyYW5zaXRpb246YmFja2dyb3VuZCAwLjE1cyBlYXNlLGJveC1zaGFkb3cgMC4xNXMgZWFzZTt9XCIgK1xuICAgICAgXCIudWlnb29kaWVzLWN1c3RvbS1sb2NhbGUtYnRuLmlzLWVuYWJsZWR7YmFja2dyb3VuZDp2YXIoLS1jbC1idG4tb24pO2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6dmFyKC0tY2wtYnRuLXNoYWRvdyk7fVwiICtcbiAgICAgIFwiLnVpZ29vZGllcy1jdXN0b20tbG9jYWxlLWJ0bi5pcy1kaXNhYmxlZHtiYWNrZ3JvdW5kOnZhcigtLWNsLWJ0bi1vZmYpO2N1cnNvcjpub3QtYWxsb3dlZDtib3gtc2hhZG93Om5vbmU7fVwiO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG4gIGVuc3VyZVN0eWxlcygpO1xuXG4gIHZhciBSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyA9IHtcbiAgICB3ZWJzaXRlOiAxLFxuICAgIGNvbXBvbmVudHM6IDEsXG4gICAgXCJzdGF0aWMtYXNzZXRzXCI6IDEsXG4gICAgdGVtcGxhdGVzOiAxLFxuICAgIHNjcmlwdHM6IDEsXG4gICAgY29uZmlnOiAxXG4gIH07XG5cbiAgZnVuY3Rpb24gQ3VzdG9tTG9jYWxlKHByb3BzKSB7XG4gICAgdmFyIGlzT3BlblN0YXRlID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIHZhciBpc0RpYWxvZ09wZW4gPSBpc09wZW5TdGF0ZVswXTtcbiAgICB2YXIgc2V0SXNEaWFsb2dPcGVuID0gaXNPcGVuU3RhdGVbMV07XG5cbiAgICB2YXIgbG9jYWxlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5sb2NhbGUpO1xuICAgIHZhciBsb2NhbGUgPSBsb2NhbGVTdGF0ZVswXTtcbiAgICB2YXIgc2V0TG9jYWxlID0gbG9jYWxlU3RhdGVbMV07XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvY2FsZShwcm9wcy5sb2NhbGUpO1xuICAgICAgfSxcbiAgICAgIFtwcm9wcy5sb2NhbGVdXG4gICAgKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsb2NhbGUgfHwgdHlwZW9mIHByb3BzLm9uTG9jYWxlQ2hhbmdlICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybjtcbiAgICAgICAgcHJvcHMub25Mb2NhbGVDaGFuZ2UobG9jYWxlKTtcbiAgICAgIH0sXG4gICAgICBbbG9jYWxlLCBwcm9wcy5vbkxvY2FsZUNoYW5nZV1cbiAgICApO1xuXG4gICAgdmFyIG9uQ29uZmlybU9rID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBfcHJvcHMkdW5saW5rTG9jYWxlID0gcHJvcHMudW5saW5rTG9jYWxlKCk7XG4gICAgICB2YXIgdXVpZCA9IF9wcm9wcyR1bmxpbmtMb2NhbGUudXVpZDtcbiAgICAgIHZhciBzb3VyY2VMb2NhbGVDb2RlID0gX3Byb3BzJHVubGlua0xvY2FsZS5zb3VyY2VMb2NhbGVDb2RlO1xuICAgICAgc2V0TG9jYWxlKHtcbiAgICAgICAgbG9jYWxlQ29kZTogbG9jYWxlLmxvY2FsZUNvZGUsXG4gICAgICAgIGxvY2FsZVNvdXJjZUlkOiB1dWlkLFxuICAgICAgICBzb3VyY2VMb2NhbGVDb2RlOiBzb3VyY2VMb2NhbGVDb2RlXG4gICAgICB9KTtcbiAgICAgIHNldElzRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgfTtcblxuICAgIGlmICghbG9jYWxlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcGF0aExvY2FsZSA9IChsb2NhbGUubG9jYWxlQ29kZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBzb3VyY2VMb2NhbGUgPSAobG9jYWxlLnNvdXJjZUxvY2FsZUNvZGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgY2FuVW5saW5rID0gISEocGF0aExvY2FsZSAmJiBzb3VyY2VMb2NhbGUgJiYgcGF0aExvY2FsZSAhPT0gc291cmNlTG9jYWxlKTtcbiAgICB2YXIgc291cmNlSWQgPSAobG9jYWxlLmxvY2FsZVNvdXJjZUlkICYmIFN0cmluZyhsb2NhbGUubG9jYWxlU291cmNlSWQpLnRyaW0oKSkgfHwgXCJcIjtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3NOYW1lOiBcInVpZ29vZGllcy1jdXN0b20tbG9jYWxlIHVpZ29vZGllcy1jdXN0b20tbG9jYWxlLXJvd1wiIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgIGNsYXNzTmFtZTogXCJ1aWdvb2RpZXMtY3VzdG9tLWxvY2FsZS1pbnB1dFwiLFxuICAgICAgICB2YWx1ZTogc291cmNlSWQsXG4gICAgICAgIHRpdGxlOiBzb3VyY2VJZCB8fCBcIk5vIGxvY2FsZSBzb3VyY2UgaWRcIixcbiAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiTG9jYWxlIFNvdXJjZSBJRFwiXG4gICAgICB9KSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgIGNsYXNzTmFtZTpcbiAgICAgICAgICAgIFwidWlnb29kaWVzLWN1c3RvbS1sb2NhbGUtYnRuIFwiICsgKGNhblVubGluayA/IFwiaXMtZW5hYmxlZFwiIDogXCJpcy1kaXNhYmxlZFwiKSxcbiAgICAgICAgICBkaXNhYmxlZDogIWNhblVubGluayxcbiAgICAgICAgICB0aXRsZTogY2FuVW5saW5rXG4gICAgICAgICAgICA/IFwiVW5saW5rIHRoaXMgaXRlbSBmcm9tIGl0cyB0cmFuc2xhdGlvbiBzb3VyY2VcIlxuICAgICAgICAgICAgOiBcIlRoaXMgaXRlbSBpcyBub3QgbGlua2VkIHRvIGEgZGlmZmVyZW50IHNvdXJjZSBsb2NhbGVcIixcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhblVubGluaykgcmV0dXJuO1xuICAgICAgICAgICAgc2V0SXNEaWFsb2dPcGVuKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJVbmxpbmsgVHJhbnNsYXRpb25cIlxuICAgICAgKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIENyYWZ0ZXJDTVNOZXh0QnJpZGdlLFxuICAgICAgICBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbmZpcm1EaWFsb2csIHtcbiAgICAgICAgICBvcGVuOiBpc0RpYWxvZ09wZW4sXG4gICAgICAgICAgb25Pazogb25Db25maXJtT2ssXG4gICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldElzRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTpcbiAgICAgICAgICAgIFwiV2FybmluZzogQnkgdW5saW5raW5nIHRoaXMgY29udGVudCB5b3UgYXJlIGluZGljYXRpbmcgdGhhdCB0aGlzIG9iamVjdCBoYXMgbm8gbG9jYWxpemF0aW9uIHJlbGF0aW9uc2hpcHMgdG8gYW55IG90aGVyIG9iamVjdHMgaW4gdGhlIHN5c3RlbS4gRG8geW91IHdpc2ggdG8gY29udGludWU/XCIsXG4gICAgICAgICAgdGl0bGU6IFwiVW5saW5rIFRyYW5zbGF0aW9uXCIsXG4gICAgICAgICAgZGlzYWJsZUVuZm9yY2VGb2N1czogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLkN1c3RvbUxvY2FsZSA9XG4gICAgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLkN1c3RvbUxvY2FsZSB8fFxuICAgIGZ1bmN0aW9uIChpZCwgZm9ybSwgb3duZXIsIHByb3BlcnRpZXMsIGNvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRmllbGQodGhpcyk7XG4gICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICAgIHRoaXMuY29uc3RyYWludHMgPSBjb25zdHJhaW50cztcbiAgICAgIHRoaXMuaW5wdXRFbCA9IG51bGw7XG4gICAgICB0aGlzLmNvdW50RWwgPSBudWxsO1xuICAgICAgdGhpcy5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy52YWx1ZSA9IFwiX25vdC1zZXRcIjtcbiAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLnN1cHBvcnRlZFBvc3RGaXhlcyA9IFtcIl9zXCJdO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gIFlBSE9PLmV4dGVuZChDU3R1ZGlvRm9ybXMuQ29udHJvbHMuQ3VzdG9tTG9jYWxlLCBDU3R1ZGlvRm9ybXMuQ1N0dWRpb0Zvcm1GaWVsZCwge1xuICAgIC8qKlxuICAgICAqIFNob3duIGluIHRoZSBDb250ZW50IFR5cGVzIGJ1aWxkZXIgY29udHJvbCBwYWxldHRlIChkcmFnLWFuZC1kcm9wIGxpc3QpLlxuICAgICAqIFRoZSBmaWVsZCByb3cgbGFiZWwgaW4gdGhlIGZvcm0gc3RpbGwgY29tZXMgZnJvbSB0aGUgZm9ybSBkZWZpbml0aW9uIGZpZWxkIHRpdGxlLlxuICAgICAqL1xuICAgIGdldExhYmVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gXCJDdXN0b20gbG9jYWxlIChUcmFuc2xhdGlvbilcIjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIExlZ2FjeSBhbGxvdy1saXN0IChmb2xkZXIgbmFtZXMpLiBBbHNvIHVzZWQgYXMgaGludHM7IHBhdGggcGFyc2VyIGFjY2VwdHMgc3RhbmRhcmQgQkNQNDctc3R5bGUgc2VnbWVudHMuXG4gICAgICovXG4gICAgX2dldExvY2FsZUxpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIFwiZW5cIixcbiAgICAgICAgXCJlc1wiLFxuICAgICAgICBcImphXCIsXG4gICAgICAgIFwiemhcIixcbiAgICAgICAgXCJ1c1wiLFxuICAgICAgICBcInVrXCIsXG4gICAgICAgIFwiZGVcIixcbiAgICAgICAgXCJmclwiLFxuICAgICAgICBcIml0XCIsXG4gICAgICAgIFwiZGtcIixcbiAgICAgICAgXCJmaVwiLFxuICAgICAgICBcIm5sXCIsXG4gICAgICAgIFwibm9cIixcbiAgICAgICAgXCJydVwiLFxuICAgICAgICBcInNlXCIsXG4gICAgICAgIFwiYnJcIixcbiAgICAgICAgXCJlbFwiLFxuICAgICAgICBcImpwXCIsXG4gICAgICAgIFwicHRcIixcbiAgICAgICAgXCJrb1wiLFxuICAgICAgICBcImFyXCIsXG4gICAgICAgIFwicGxcIixcbiAgICAgICAgXCJ0clwiLFxuICAgICAgICBcInZpXCJcbiAgICAgIF07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgZm9sZGVyIGZyb20gcmVwbyBwYXRoOiAvc2l0ZS97c2l0ZX0vd2Vic2l0ZS9lbi8uLi4gb3IgL3NpdGUve3NpdGV9L2NvbXBvbmVudHMvZW4vLi4uXG4gICAgICovXG4gICAgX2dldExvY2FsZUZyb21QYXRoOiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgaWYgKCFwYXRoKSByZXR1cm4gXCJcIjtcblxuICAgICAgdmFyIHBhcnRzID0gcGF0aFxuICAgICAgICAucmVwbGFjZSgvXlxcL3NpdGVcXC9bXi9dK1xcLy9pLCBcIlwiKVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSByZXR1cm4gXCJcIjtcblxuICAgICAgdmFyIGZpcnN0ID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChSRVNFUlZFRF9GSVJTVF9TRUdNRU5UU1tmaXJzdF0gJiYgcGFydHNbMV0pIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHBhcnRzWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0aGlzLl9nZXRMb2NhbGVMaXN0KCkuaW5kZXhPZihjYW5kaWRhdGUpID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXlthLXpdezJ9KC1bYS16MC05XXsxLDh9KT8kL2kudGVzdChwYXJ0c1sxXSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoUkVTRVJWRURfRklSU1RfU0VHTUVOVFNbZmlyc3RdKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZ2V0TG9jYWxlTGlzdCgpLmluZGV4T2YoZmlyc3QpID49IDApIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgfVxuICAgICAgaWYgKC9eW2Etel17Mn0oLVthLXowLTldezEsOH0pPyQvaS50ZXN0KHBhcnRzWzBdKSkge1xuICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0sXG4gICAgX3VubGlua0xvY2FsZTogZnVuY3Rpb24gKG9iaikge1xuICAgICAgdmFyIHV1aWQgPSBDU3R1ZGlvQXV0aG9yaW5nLlV0aWxzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgdmFyIHNvdXJjZUxvY2FsZUNvZGUgPSB0aGlzLl9nZXRMb2NhbGVGcm9tUGF0aChvYmouZm9ybS5wYXRoKTtcbiAgICAgIG9iai5mb3JtLnVwZGF0ZU1vZGVsKFwibG9jYWxlU291cmNlSWRfc1wiLCB1dWlkKTtcbiAgICAgIG9iai5mb3JtLnVwZGF0ZU1vZGVsKFwic291cmNlTG9jYWxlQ29kZV9zXCIsIHNvdXJjZUxvY2FsZUNvZGUpO1xuICAgICAgcmV0dXJuIHsgdXVpZDogdXVpZCwgc291cmNlTG9jYWxlQ29kZTogc291cmNlTG9jYWxlQ29kZSB9O1xuICAgIH0sXG4gICAgX3JlbmRlclJlYWN0Q29tcG9uZW50OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICB2YXIgbG9jYWxlRnJvbVBhdGggPSB0aGlzLl9nZXRMb2NhbGVGcm9tUGF0aChvYmouZm9ybS5wYXRoKTtcblxuICAgICAgaWYgKCFvYmouZm9ybS5tb2RlbC5sb2NhbGVTb3VyY2VJZF9zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJOZXdJdGVtKG9iaiwgbG9jYWxlRnJvbVBhdGgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRXhpc3RpbmdJdGVtKG9iaiwgbG9jYWxlRnJvbVBhdGgpO1xuICAgIH0sXG4gICAgX21vdW50Q3VzdG9tTG9jYWxlOiBmdW5jdGlvbiAob2JqLCBsb2NhbGUsIGtleSkge1xuICAgICAgdmFyIGNtcyA9IENyYWZ0ZXJDTVNOZXh0O1xuICAgICAgb2JqLnZhbHVlID0gbG9jYWxlLmxvY2FsZVNvdXJjZUlkIHx8IFwiXCI7XG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxuICAgICAgICBvbkxvY2FsZUNoYW5nZTogZnVuY3Rpb24gKG5leHRMb2NhbGUpIHtcbiAgICAgICAgICBvYmoudmFsdWUgPSBuZXh0TG9jYWxlLmxvY2FsZVNvdXJjZUlkIHx8IFwiXCI7XG4gICAgICAgICAgb2JqLmZvcm0udXBkYXRlTW9kZWwoXCJsb2NhbGVDb2RlX3NcIiwgbmV4dExvY2FsZS5sb2NhbGVDb2RlIHx8IFwiXCIpO1xuICAgICAgICAgIG9iai5mb3JtLnVwZGF0ZU1vZGVsKFwic291cmNlTG9jYWxlQ29kZV9zXCIsIG5leHRMb2NhbGUuc291cmNlTG9jYWxlQ29kZSB8fCBcIlwiKTtcbiAgICAgICAgICBvYmouZm9ybS51cGRhdGVNb2RlbChcImxvY2FsZVNvdXJjZUlkX3NcIiwgbmV4dExvY2FsZS5sb2NhbGVTb3VyY2VJZCB8fCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5saW5rTG9jYWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3VubGlua0xvY2FsZShvYmopO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgIH07XG4gICAgICB2YXIgaGFuZGxlS2V5ID0ga2V5IHx8IFwiZGVmYXVsdFwiO1xuICAgICAgaWYgKCFvYmouX2Ntc1JlbmRlckhhbmRsZXMpIHtcbiAgICAgICAgb2JqLl9jbXNSZW5kZXJIYW5kbGVzID0ge307XG4gICAgICB9XG4gICAgICBpZiAob2JqLl9jbXNSZW5kZXJIYW5kbGVzW2hhbmRsZUtleV0gJiYgb2JqLl9jbXNSZW5kZXJIYW5kbGVzW2hhbmRsZUtleV0udW5tb3VudCkge1xuICAgICAgICBvYmouX2Ntc1JlbmRlckhhbmRsZXNbaGFuZGxlS2V5XS51bm1vdW50KHsgcmVtb3ZlQ29udGFpbmVyOiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICAgIHZhciBtb3VudEVsID0gb2JqLmNvbnRyb2xXaWRnZXRDb250YWluZXJFbCB8fCBvYmouY29udGFpbmVyRWw7XG4gICAgICBtb3VudEVsLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICBtb3VudEVsLnN0eWxlLm1pbldpZHRoID0gXCIwXCI7XG4gICAgICBtb3VudEVsLnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgICAgY21zXG4gICAgICAgIC5yZW5kZXIoXG4gICAgICAgICAgbW91bnRFbCxcbiAgICAgICAgICBmdW5jdGlvbiBDdXN0b21Mb2NhbGVCcmlkZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEN1c3RvbUxvY2FsZSwgcHJvcHMpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcHNcbiAgICAgICAgKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgICAgb2JqLl9jbXNSZW5kZXJIYW5kbGVzW2hhbmRsZUtleV0gPSBoYW5kbGU7XG4gICAgICAgICAgLy8gUmVhY3Qgcm9vdCB3cmFwcGVycyBmcm9tIENyYWZ0ZXJDTVNOZXh0LnJlbmRlciBvZnRlbiBkb24ndCBzdHJldGNoOyBmb3JjZSBmdWxsIHdpZHRoLlxuICAgICAgICAgIHZhciByb290ID0gbW91bnRFbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBpZiAocm9vdCAmJiByb290LnN0eWxlKSB7XG4gICAgICAgICAgICByb290LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgICAgICByb290LnN0eWxlLm1pbldpZHRoID0gXCIwXCI7XG4gICAgICAgICAgICByb290LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW2N1c3RvbS1sb2NhbGVdIEZhaWxlZCB0byByZW5kZXIgY29udHJvbFwiLCBlcnIpO1xuICAgICAgICAgIG1vdW50RWwuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiIHN0eWxlPVwibWFyZ2luOjhweCAwXCI+TG9jYWxlIGNvbnRyb2wgY291bGQgbm90IGxvYWQuIFJlZnJlc2ggU3R1ZGlvIGFuZCBjaGVjayB0aGUgY29uc29sZS48L2Rpdj4nO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIF9yZW5kZXJOZXdJdGVtOiBmdW5jdGlvbiAob2JqLCBsb2NhbGVGcm9tUGF0aCkge1xuICAgICAgdmFyIGxvY2FsZSA9IHtcbiAgICAgICAgbG9jYWxlQ29kZTogbG9jYWxlRnJvbVBhdGgsXG4gICAgICAgIHNvdXJjZUxvY2FsZUNvZGU6IGxvY2FsZUZyb21QYXRoLFxuICAgICAgICBsb2NhbGVTb3VyY2VJZDogQ1N0dWRpb0F1dGhvcmluZy5VdGlscy5nZW5lcmF0ZVVVSUQoKVxuICAgICAgfTtcblxuICAgICAgb2JqLmZvcm0udXBkYXRlTW9kZWwoXCJsb2NhbGVDb2RlX3NcIiwgbG9jYWxlLmxvY2FsZUNvZGUpO1xuICAgICAgb2JqLmZvcm0udXBkYXRlTW9kZWwoXCJzb3VyY2VMb2NhbGVDb2RlX3NcIiwgbG9jYWxlLnNvdXJjZUxvY2FsZUNvZGUpO1xuICAgICAgb2JqLmZvcm0udXBkYXRlTW9kZWwoXCJsb2NhbGVTb3VyY2VJZF9zXCIsIGxvY2FsZS5sb2NhbGVTb3VyY2VJZCk7XG5cbiAgICAgIHRoaXMuX21vdW50Q3VzdG9tTG9jYWxlKG9iaiwgbG9jYWxlLCBcIm5ld1wiKTtcbiAgICB9LFxuICAgIF9yZW5kZXJFeGlzdGluZ0l0ZW06IGZ1bmN0aW9uIChvYmosIGxvY2FsZUZyb21QYXRoKSB7XG4gICAgICB2YXIgbW9kZWwgPSBvYmouZm9ybS5tb2RlbDtcbiAgICAgIHZhciBwZXJzaXN0ZWQgPVxuICAgICAgICBtb2RlbC5sb2NhbGVDb2RlX3MgJiYgU3RyaW5nKG1vZGVsLmxvY2FsZUNvZGVfcykudHJpbSgpXG4gICAgICAgICAgPyBTdHJpbmcobW9kZWwubG9jYWxlQ29kZV9zKS50cmltKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIDogXCJcIjtcbiAgICAgIHZhciBmcm9tUGF0aCA9IGxvY2FsZUZyb21QYXRoIHx8IFwiXCI7XG4gICAgICB2YXIgbG9jYWxlQ29kZSA9IHBlcnNpc3RlZCB8fCBmcm9tUGF0aDtcbiAgICAgIHZhciBsb2NhbGUgPSB7XG4gICAgICAgIGxvY2FsZUNvZGU6IGxvY2FsZUNvZGUsXG4gICAgICAgIHNvdXJjZUxvY2FsZUNvZGU6IG1vZGVsLnNvdXJjZUxvY2FsZUNvZGVfcyA/IFN0cmluZyhtb2RlbC5zb3VyY2VMb2NhbGVDb2RlX3MpLnRyaW0oKS50b0xvd2VyQ2FzZSgpIDogbG9jYWxlQ29kZSxcbiAgICAgICAgbG9jYWxlU291cmNlSWQ6IG1vZGVsLmxvY2FsZVNvdXJjZUlkX3NcbiAgICAgIH07XG4gICAgICBvYmouZm9ybS51cGRhdGVNb2RlbChcImxvY2FsZUNvZGVfc1wiLCBsb2NhbGUubG9jYWxlQ29kZSk7XG4gICAgICBvYmouZm9ybS51cGRhdGVNb2RlbChcInNvdXJjZUxvY2FsZUNvZGVfc1wiLCBsb2NhbGUuc291cmNlTG9jYWxlQ29kZSk7XG4gICAgICB0aGlzLl9tb3VudEN1c3RvbUxvY2FsZShvYmosIGxvY2FsZSwgXCJleGlzdGluZ1wiKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKGNvbmZpZywgY29udGFpbmVyRWwpIHtcbiAgICAgIGNvbnRhaW5lckVsLmlkID0gdGhpcy5pZDtcbiAgICAgIHRoaXMuY29udGFpbmVyRWwgPSBjb250YWluZXJFbDtcbiAgICAgIFlBSE9PLnV0aWwuRG9tLmFkZENsYXNzKGNvbnRhaW5lckVsLCBcInVpZ29vZGllcy1jdXN0b20tbG9jYWxlXCIpO1xuICAgICAgWUFIT08udXRpbC5Eb20uYWRkQ2xhc3MoY29udGFpbmVyRWwsIFwidWlnb29kaWVzLWN1c3RvbS1sb2NhbGUtZmllbGRcIik7XG5cbiAgICAgIHZhciB0aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBZQUhPTy51dGlsLkRvbS5hZGRDbGFzcyh0aXRsZUVsLCBcImNzdHVkaW8tZm9ybS1maWVsZC10aXRsZVwiKTtcbiAgICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSBjb25maWcudGl0bGUgfHwgXCJMb2NhbGUgU291cmNlIElEXCI7XG4gICAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aXRsZUVsKTtcblxuICAgICAgdmFyIGNvbnRyb2xXaWRnZXRDb250YWluZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBZQUhPTy51dGlsLkRvbS5hZGRDbGFzcyhjb250cm9sV2lkZ2V0Q29udGFpbmVyRWwsIFwiY3N0dWRpby1mb3JtLWNvbnRyb2wtdXVpZC1jb250YWluZXJcIik7XG4gICAgICBZQUhPTy51dGlsLkRvbS5hZGRDbGFzcyhjb250cm9sV2lkZ2V0Q29udGFpbmVyRWwsIFwidWlnb29kaWVzLWN1c3RvbS1sb2NhbGUtY29udHJvbFwiKTtcbiAgICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGNvbnRyb2xXaWRnZXRDb250YWluZXJFbCk7XG4gICAgICB0aGlzLmNvbnRyb2xXaWRnZXRDb250YWluZXJFbCA9IGNvbnRyb2xXaWRnZXRDb250YWluZXJFbDtcblxuICAgICAgaWYgKGNvbmZpZy5kZXNjcmlwdGlvbikge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBZQUhPTy51dGlsLkRvbS5hZGRDbGFzcyhkZXNjcmlwdGlvbkVsLCBcImRlc2NyaXB0aW9uXCIpO1xuICAgICAgICBZQUhPTy51dGlsLkRvbS5hZGRDbGFzcyhkZXNjcmlwdGlvbkVsLCBcImNzdHVkaW8tZm9ybS1maWVsZC1kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgZGVzY3JpcHRpb25FbC5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgICBcImRpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtmbG9hdDpub25lO21hcmdpbjo2cHggMCAwIDA7cGFkZGluZzowO3RleHQtYWxpZ246bGVmdDtcIjtcbiAgICAgICAgZGVzY3JpcHRpb25FbC5pbm5lckhUTUwgPSBjb25maWcuZGVzY3JpcHRpb247XG4gICAgICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uRWwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZW5kZXJSZWFjdENvbXBvbmVudCh0aGlzKTtcbiAgICB9LFxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9LFxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9LFxuICAgIGdldE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBcImN1c3RvbS1sb2NhbGVcIjtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZFByb3BlcnRpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRQb3N0Rml4ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZFBvc3RGaXhlcztcbiAgICB9XG4gIH0pO1xuICBDU3R1ZGlvQXV0aG9yaW5nLk1vZHVsZS5tb2R1bGVMb2FkZWQoXCJjdXN0b20tbG9jYWxlXCIsIENTdHVkaW9Gb3Jtcy5Db250cm9scy5DdXN0b21Mb2NhbGUpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIENyYWZ0ZXJDTVNOZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIENyYWZ0ZXJDTVNOZXh0LlJlYWN0KSB7XG4gICAgYm9vdEN1c3RvbUxvY2FsZUNvbnRyb2woKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiQ3JhZnRlckNNUy5Db2RlYmFzZUJyaWRnZVJlYWR5XCIsIGJvb3RDdXN0b21Mb2NhbGVDb250cm9sLCB7IG9uY2U6IHRydWUgfSk7XG4gIH1cbn0pKCk7XG4iXSwibmFtZXMiOlsiYm9vdEN1c3RvbUxvY2FsZUNvbnRyb2wiLCJSZWFjdCIsIkNyYWZ0ZXJDTVNOZXh0IiwiQ3JhZnRlckNNU05leHRCcmlkZ2UiLCJjb21wb25lbnRzIiwiQ29uZmlybURpYWxvZyIsIlNUWUxFX0lEIiwiZW5zdXJlU3R5bGVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsImlkIiwidGV4dENvbnRlbnQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJSRVNFUlZFRF9GSVJTVF9TRUdNRU5UUyIsIndlYnNpdGUiLCJ0ZW1wbGF0ZXMiLCJzY3JpcHRzIiwiY29uZmlnIiwiQ3VzdG9tTG9jYWxlIiwicHJvcHMiLCJpc09wZW5TdGF0ZSIsInVzZVN0YXRlIiwiaXNEaWFsb2dPcGVuIiwic2V0SXNEaWFsb2dPcGVuIiwibG9jYWxlU3RhdGUiLCJsb2NhbGUiLCJzZXRMb2NhbGUiLCJ1c2VFZmZlY3QiLCJvbkxvY2FsZUNoYW5nZSIsIm9uQ29uZmlybU9rIiwiZSIsInByZXZlbnREZWZhdWx0IiwiX3Byb3BzJHVubGlua0xvY2FsZSIsInVubGlua0xvY2FsZSIsInV1aWQiLCJzb3VyY2VMb2NhbGVDb2RlIiwibG9jYWxlQ29kZSIsImxvY2FsZVNvdXJjZUlkIiwicGF0aExvY2FsZSIsInRvTG93ZXJDYXNlIiwic291cmNlTG9jYWxlIiwiY2FuVW5saW5rIiwic291cmNlSWQiLCJTdHJpbmciLCJ0cmltIiwiY2xhc3NOYW1lIiwidHlwZSIsInJlYWRPbmx5IiwidmFsdWUiLCJ0aXRsZSIsImRpc2FibGVkIiwib25DbGljayIsIm9wZW4iLCJvbk9rIiwib25DYW5jZWwiLCJvbkNsb3NlIiwiYm9keSIsImRpc2FibGVFbmZvcmNlRm9jdXMiLCJDU3R1ZGlvRm9ybXMiLCJDb250cm9scyIsImZvcm0iLCJvd25lciIsInByb3BlcnRpZXMiLCJjb25zdHJhaW50cyIsInJlZ2lzdGVyRmllbGQiLCJlcnJvcnMiLCJpbnB1dEVsIiwiY291bnRFbCIsInJlcXVpcmVkIiwic3VwcG9ydGVkUG9zdEZpeGVzIiwiWUFIT08iLCJleHRlbmQiLCJDU3R1ZGlvRm9ybUZpZWxkIiwiZ2V0TGFiZWwiLCJfZ2V0TG9jYWxlTGlzdCIsIl9nZXRMb2NhbGVGcm9tUGF0aCIsInBhdGgiLCJwYXJ0cyIsInJlcGxhY2UiLCJzcGxpdCIsImZpbHRlciIsIkJvb2xlYW4iLCJsZW5ndGgiLCJmaXJzdCIsImNhbmRpZGF0ZSIsImluZGV4T2YiLCJ0ZXN0IiwiX3VubGlua0xvY2FsZSIsIm9iaiIsIkNTdHVkaW9BdXRob3JpbmciLCJVdGlscyIsImdlbmVyYXRlVVVJRCIsInVwZGF0ZU1vZGVsIiwiX3JlbmRlclJlYWN0Q29tcG9uZW50IiwibG9jYWxlRnJvbVBhdGgiLCJtb2RlbCIsImxvY2FsZVNvdXJjZUlkX3MiLCJfcmVuZGVyTmV3SXRlbSIsIl9yZW5kZXJFeGlzdGluZ0l0ZW0iLCJfbW91bnRDdXN0b21Mb2NhbGUiLCJrZXkiLCJjbXMiLCJuZXh0TG9jYWxlIiwiYmluZCIsImhhbmRsZUtleSIsIl9jbXNSZW5kZXJIYW5kbGVzIiwidW5tb3VudCIsInJlbW92ZUNvbnRhaW5lciIsIm1vdW50RWwiLCJjb250cm9sV2lkZ2V0Q29udGFpbmVyRWwiLCJjb250YWluZXJFbCIsIndpZHRoIiwibWluV2lkdGgiLCJib3hTaXppbmciLCJyZW5kZXIiLCJDdXN0b21Mb2NhbGVCcmlkZ2UiLCJ0aGVuIiwiaGFuZGxlIiwicm9vdCIsImZpcnN0RWxlbWVudENoaWxkIiwiZGlzcGxheSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsImlubmVySFRNTCIsInBlcnNpc3RlZCIsImxvY2FsZUNvZGVfcyIsImZyb21QYXRoIiwic291cmNlTG9jYWxlQ29kZV9zIiwidXRpbCIsIkRvbSIsImFkZENsYXNzIiwidGl0bGVFbCIsImRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb25FbCIsImNzc1RleHQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0TmFtZSIsImdldFN1cHBvcnRlZFByb3BlcnRpZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsImdldFN1cHBvcnRlZFBvc3RGaXhlcyIsIk1vZHVsZSIsIm1vZHVsZUxvYWRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIl0sIm1hcHBpbmdzIjoiOzs7RUFFQSxTQUFTQSx1QkFBVCxHQUFtQztFQUNqQyxNQUFJQyxLQUFLLEdBQUdDLGNBQWMsQ0FBQ0QsS0FBM0I7RUFDQSxNQUFJRSxvQkFBb0IsR0FBR0QsY0FBYyxDQUFDRSxVQUFmLENBQTBCRCxvQkFBckQ7RUFDQSxNQUFJRSxhQUFhLEdBQUdILGNBQWMsQ0FBQ0UsVUFBZixDQUEwQkMsYUFBOUM7RUFFQSxNQUFJQyxRQUFRLEdBQUcsNkJBQWY7O0VBQ0EsV0FBU0MsWUFBVCxHQUF3QjtFQUN0QixRQUFJLE9BQU9DLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7RUFDckMsUUFBSUEsUUFBUSxDQUFDQyxjQUFULENBQXdCSCxRQUF4QixDQUFKLEVBQXVDO0VBQ3ZDLFFBQUlJLEtBQUssR0FBR0YsUUFBUSxDQUFDRyxhQUFULENBQXVCLE9BQXZCLENBQVo7RUFDQUQsSUFBQUEsS0FBSyxDQUFDRSxFQUFOLEdBQVdOLFFBQVg7RUFDQUksSUFBQUEsS0FBSyxDQUFDRyxXQUFOLEdBQ0UsOEJBQ0Esd0JBREEsR0FFQSx3QkFGQSxHQUdBLHdCQUhBLEdBSUEsc0JBSkEsR0FLQSx1QkFMQSxHQU1BLHNCQU5BLEdBT0EsaURBUEEsR0FRQSxHQVJBLEdBU0Esc0NBVEEsR0FVQSwyQkFWQSxHQVdBLHdCQVhBLEdBWUEsd0JBWkEsR0FhQSx3QkFiQSxHQWNBLHNCQWRBLEdBZUEsdUJBZkEsR0FnQkEsc0JBaEJBLEdBaUJBLDZDQWpCQSxHQWtCQSxHQWxCQSxHQW1CQSxHQW5CQSxHQW9CQSw0RkFwQkEsR0FxQkEsMkRBckJBLEdBc0JBLG9FQXRCQSxHQXVCQSwyRUF2QkEsR0F3QkEsa0RBeEJBLEdBeUJBLEdBekJBLEdBMEJBLHFIQTFCQSxHQTJCQSxtR0EzQkEsR0E0QkEseURBNUJBLEdBNkJBLG1HQTdCQSxHQThCQSwrR0E5QkEsR0ErQkEsMEdBL0JBLEdBZ0NBLGlIQWhDQSxHQWlDQSxzSUFqQ0EsR0FrQ0Esc0hBbENBLEdBbUNBLDRHQXBDRjtFQXFDQUwsSUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFdBQWQsQ0FBMEJMLEtBQTFCO0VBQ0Q7O0VBQ0RILEVBQUFBLFlBQVk7RUFFWixNQUFJUyx1QkFBdUIsR0FBRztFQUM1QkMsSUFBQUEsT0FBTyxFQUFFLENBRG1CO0VBRTVCYixJQUFBQSxVQUFVLEVBQUUsQ0FGZ0I7RUFHNUIscUJBQWlCLENBSFc7RUFJNUJjLElBQUFBLFNBQVMsRUFBRSxDQUppQjtFQUs1QkMsSUFBQUEsT0FBTyxFQUFFLENBTG1CO0VBTTVCQyxJQUFBQSxNQUFNLEVBQUU7RUFOb0IsR0FBOUI7O0VBU0EsV0FBU0MsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7RUFDM0IsUUFBSUMsV0FBVyxHQUFHdEIsS0FBSyxDQUFDdUIsUUFBTixDQUFlLEtBQWYsQ0FBbEI7RUFDQSxRQUFJQyxZQUFZLEdBQUdGLFdBQVcsQ0FBQyxDQUFELENBQTlCO0VBQ0EsUUFBSUcsZUFBZSxHQUFHSCxXQUFXLENBQUMsQ0FBRCxDQUFqQztFQUVBLFFBQUlJLFdBQVcsR0FBRzFCLEtBQUssQ0FBQ3VCLFFBQU4sQ0FBZUYsS0FBSyxDQUFDTSxNQUFyQixDQUFsQjtFQUNBLFFBQUlBLE1BQU0sR0FBR0QsV0FBVyxDQUFDLENBQUQsQ0FBeEI7RUFDQSxRQUFJRSxTQUFTLEdBQUdGLFdBQVcsQ0FBQyxDQUFELENBQTNCO0VBRUExQixJQUFBQSxLQUFLLENBQUM2QixTQUFOLENBQ0UsWUFBWTtFQUNWRCxNQUFBQSxTQUFTLENBQUNQLEtBQUssQ0FBQ00sTUFBUCxDQUFUO0VBQ0QsS0FISCxFQUlFLENBQUNOLEtBQUssQ0FBQ00sTUFBUCxDQUpGO0VBT0EzQixJQUFBQSxLQUFLLENBQUM2QixTQUFOLENBQ0UsWUFBWTtFQUNWLFVBQUksQ0FBQ0YsTUFBRCxJQUFXLE9BQU9OLEtBQUssQ0FBQ1MsY0FBYixLQUFnQyxVQUEvQyxFQUEyRDtFQUMzRFQsTUFBQUEsS0FBSyxDQUFDUyxjQUFOLENBQXFCSCxNQUFyQjtFQUNELEtBSkgsRUFLRSxDQUFDQSxNQUFELEVBQVNOLEtBQUssQ0FBQ1MsY0FBZixDQUxGOztFQVFBLFFBQUlDLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQVVDLENBQVYsRUFBYTtFQUM3QkEsTUFBQUEsQ0FBQyxDQUFDQyxjQUFGOztFQUNBLFVBQUlDLG1CQUFtQixHQUFHYixLQUFLLENBQUNjLFlBQU4sRUFBMUI7O0VBQ0EsVUFBSUMsSUFBSSxHQUFHRixtQkFBbUIsQ0FBQ0UsSUFBL0I7RUFDQSxVQUFJQyxnQkFBZ0IsR0FBR0gsbUJBQW1CLENBQUNHLGdCQUEzQztFQUNBVCxNQUFBQSxTQUFTLENBQUM7RUFDUlUsUUFBQUEsVUFBVSxFQUFFWCxNQUFNLENBQUNXLFVBRFg7RUFFUkMsUUFBQUEsY0FBYyxFQUFFSCxJQUZSO0VBR1JDLFFBQUFBLGdCQUFnQixFQUFFQTtFQUhWLE9BQUQsQ0FBVDtFQUtBWixNQUFBQSxlQUFlLENBQUMsS0FBRCxDQUFmO0VBQ0QsS0FYRDs7RUFhQSxRQUFJLENBQUNFLE1BQUwsRUFBYTtFQUNYLGFBQU8sSUFBUDtFQUNEOztFQUVELFFBQUlhLFVBQVUsR0FBRyxDQUFDYixNQUFNLENBQUNXLFVBQVAsSUFBcUIsRUFBdEIsRUFBMEJHLFdBQTFCLEVBQWpCO0VBQ0EsUUFBSUMsWUFBWSxHQUFHLENBQUNmLE1BQU0sQ0FBQ1UsZ0JBQVAsSUFBMkIsRUFBNUIsRUFBZ0NJLFdBQWhDLEVBQW5CO0VBQ0EsUUFBSUUsU0FBUyxHQUFHLENBQUMsRUFBRUgsVUFBVSxJQUFJRSxZQUFkLElBQThCRixVQUFVLEtBQUtFLFlBQS9DLENBQWpCO0VBQ0EsUUFBSUUsUUFBUSxHQUFJakIsTUFBTSxDQUFDWSxjQUFQLElBQXlCTSxNQUFNLENBQUNsQixNQUFNLENBQUNZLGNBQVIsQ0FBTixDQUE4Qk8sSUFBOUIsRUFBMUIsSUFBbUUsRUFBbEY7RUFFQSxXQUFPOUMsS0FBSyxDQUFDVSxhQUFOLENBQ0wsS0FESyxFQUVMO0VBQUVxQyxNQUFBQSxTQUFTLEVBQUU7RUFBYixLQUZLLEVBR0wvQyxLQUFLLENBQUNVLGFBQU4sQ0FBb0IsT0FBcEIsRUFBNkI7RUFDM0JzQyxNQUFBQSxJQUFJLEVBQUUsTUFEcUI7RUFFM0JDLE1BQUFBLFFBQVEsRUFBRSxJQUZpQjtFQUczQkYsTUFBQUEsU0FBUyxFQUFFLCtCQUhnQjtFQUkzQkcsTUFBQUEsS0FBSyxFQUFFTixRQUpvQjtFQUszQk8sTUFBQUEsS0FBSyxFQUFFUCxRQUFRLElBQUkscUJBTFE7RUFNM0Isb0JBQWM7RUFOYSxLQUE3QixDQUhLLEVBV0w1QyxLQUFLLENBQUNVLGFBQU4sQ0FDRSxRQURGLEVBRUU7RUFDRXNDLE1BQUFBLElBQUksRUFBRSxRQURSO0VBRUVELE1BQUFBLFNBQVMsRUFDUCxrQ0FBa0NKLFNBQVMsR0FBRyxZQUFILEdBQWtCLGFBQTdELENBSEo7RUFJRVMsTUFBQUEsUUFBUSxFQUFFLENBQUNULFNBSmI7RUFLRVEsTUFBQUEsS0FBSyxFQUFFUixTQUFTLEdBQ1osOENBRFksR0FFWixzREFQTjtFQVFFVSxNQUFBQSxPQUFPLEVBQUUsbUJBQVk7RUFDbkIsWUFBSSxDQUFDVixTQUFMLEVBQWdCO0VBQ2hCbEIsUUFBQUEsZUFBZSxDQUFDLElBQUQsQ0FBZjtFQUNEO0VBWEgsS0FGRixFQWVFLG9CQWZGLENBWEssRUE0Qkx6QixLQUFLLENBQUNVLGFBQU4sQ0FDRVIsb0JBREYsRUFFRSxJQUZGLEVBR0VGLEtBQUssQ0FBQ1UsYUFBTixDQUFvQk4sYUFBcEIsRUFBbUM7RUFDakNrRCxNQUFBQSxJQUFJLEVBQUU5QixZQUQyQjtFQUVqQytCLE1BQUFBLElBQUksRUFBRXhCLFdBRjJCO0VBR2pDeUIsTUFBQUEsUUFBUSxFQUFFLG9CQUFZO0VBQ3BCL0IsUUFBQUEsZUFBZSxDQUFDLEtBQUQsQ0FBZjtFQUNELE9BTGdDO0VBTWpDZ0MsTUFBQUEsT0FBTyxFQUFFLG1CQUFZO0VBQ25CaEMsUUFBQUEsZUFBZSxDQUFDLEtBQUQsQ0FBZjtFQUNELE9BUmdDO0VBU2pDaUMsTUFBQUEsSUFBSSxFQUNGLHVLQVYrQjtFQVdqQ1AsTUFBQUEsS0FBSyxFQUFFLG9CQVgwQjtFQVlqQ1EsTUFBQUEsbUJBQW1CLEVBQUU7RUFaWSxLQUFuQyxDQUhGLENBNUJLLENBQVA7RUErQ0Q7O0VBRURDLEVBQUFBLFlBQVksQ0FBQ0MsUUFBYixDQUFzQnpDLFlBQXRCLEdBQ0V3QyxZQUFZLENBQUNDLFFBQWIsQ0FBc0J6QyxZQUF0QixJQUNBLFVBQVVULEVBQVYsRUFBY21ELElBQWQsRUFBb0JDLEtBQXBCLEVBQTJCQyxVQUEzQixFQUF1Q0MsV0FBdkMsRUFBb0Q7RUFDbEQsU0FBS0YsS0FBTCxHQUFhQSxLQUFiO0VBQ0EsU0FBS0EsS0FBTCxDQUFXRyxhQUFYLENBQXlCLElBQXpCO0VBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7RUFDQSxTQUFLSCxVQUFMLEdBQWtCQSxVQUFsQjtFQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0VBQ0EsU0FBS0csT0FBTCxHQUFlLElBQWY7RUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtFQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7RUFDQSxTQUFLcEIsS0FBTCxHQUFhLFVBQWI7RUFDQSxTQUFLWSxJQUFMLEdBQVlBLElBQVo7RUFDQSxTQUFLbkQsRUFBTCxHQUFVQSxFQUFWO0VBQ0EsU0FBSzRELGtCQUFMLEdBQTBCLENBQUMsSUFBRCxDQUExQjtFQUVBLFdBQU8sSUFBUDtFQUNELEdBakJIOztFQW1CQUMsRUFBQUEsS0FBSyxDQUFDQyxNQUFOLENBQWFiLFlBQVksQ0FBQ0MsUUFBYixDQUFzQnpDLFlBQW5DLEVBQWlEd0MsWUFBWSxDQUFDYyxnQkFBOUQsRUFBZ0Y7RUFDOUU7RUFDSjtFQUNBO0VBQ0E7RUFDSUMsSUFBQUEsUUFBUSxFQUFFLG9CQUFZO0VBQ3BCLGFBQU8sNkJBQVA7RUFDRCxLQVA2RTs7RUFROUU7RUFDSjtFQUNBO0VBQ0lDLElBQUFBLGNBQWMsRUFBRSwwQkFBWTtFQUMxQixhQUFPLENBQ0wsSUFESyxFQUVMLElBRkssRUFHTCxJQUhLLEVBSUwsSUFKSyxFQUtMLElBTEssRUFNTCxJQU5LLEVBT0wsSUFQSyxFQVFMLElBUkssRUFTTCxJQVRLLEVBVUwsSUFWSyxFQVdMLElBWEssRUFZTCxJQVpLLEVBYUwsSUFiSyxFQWNMLElBZEssRUFlTCxJQWZLLEVBZ0JMLElBaEJLLEVBaUJMLElBakJLLEVBa0JMLElBbEJLLEVBbUJMLElBbkJLLEVBb0JMLElBcEJLLEVBcUJMLElBckJLLEVBc0JMLElBdEJLLEVBdUJMLElBdkJLLEVBd0JMLElBeEJLLENBQVA7RUEwQkQsS0F0QzZFOztFQXVDOUU7RUFDSjtFQUNBO0VBQ0lDLElBQUFBLGtCQUFrQixFQUFFLDRCQUFVQyxJQUFWLEVBQWdCO0VBQ2xDLFVBQUksQ0FBQ0EsSUFBTCxFQUFXLE9BQU8sRUFBUDtFQUVYLFVBQUlDLEtBQUssR0FBR0QsSUFBSSxDQUNiRSxPQURTLENBQ0QsbUJBREMsRUFDb0IsRUFEcEIsRUFFVEMsS0FGUyxDQUVILEdBRkcsRUFHVEMsTUFIUyxDQUdGQyxPQUhFLENBQVo7RUFJQSxVQUFJSixLQUFLLENBQUNLLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0IsT0FBTyxFQUFQO0VBRXhCLFVBQUlDLEtBQUssR0FBR04sS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTdEMsV0FBVCxFQUFaOztFQUNBLFVBQUkxQix1QkFBdUIsQ0FBQ3NFLEtBQUQsQ0FBdkIsSUFBa0NOLEtBQUssQ0FBQyxDQUFELENBQTNDLEVBQWdEO0VBQzlDLFlBQUlPLFNBQVMsR0FBR1AsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTdEMsV0FBVCxFQUFoQjs7RUFDQSxZQUFJLEtBQUttQyxjQUFMLEdBQXNCVyxPQUF0QixDQUE4QkQsU0FBOUIsS0FBNEMsQ0FBaEQsRUFBbUQ7RUFDakQsaUJBQU9BLFNBQVA7RUFDRDs7RUFDRCxZQUFJLCtCQUErQkUsSUFBL0IsQ0FBb0NULEtBQUssQ0FBQyxDQUFELENBQXpDLENBQUosRUFBbUQ7RUFDakQsaUJBQU9PLFNBQVA7RUFDRDs7RUFDRCxlQUFPLEVBQVA7RUFDRDs7RUFFRCxVQUFJdkUsdUJBQXVCLENBQUNzRSxLQUFELENBQTNCLEVBQW9DO0VBQ2xDLGVBQU8sRUFBUDtFQUNEOztFQUVELFVBQUksS0FBS1QsY0FBTCxHQUFzQlcsT0FBdEIsQ0FBOEJGLEtBQTlCLEtBQXdDLENBQTVDLEVBQStDO0VBQzdDLGVBQU9BLEtBQVA7RUFDRDs7RUFDRCxVQUFJLCtCQUErQkcsSUFBL0IsQ0FBb0NULEtBQUssQ0FBQyxDQUFELENBQXpDLENBQUosRUFBbUQ7RUFDakQsZUFBT00sS0FBUDtFQUNEOztFQUVELGFBQU8sRUFBUDtFQUNELEtBM0U2RTtFQTRFOUVJLElBQUFBLGFBQWEsRUFBRSx1QkFBVUMsR0FBVixFQUFlO0VBQzVCLFVBQUl0RCxJQUFJLEdBQUd1RCxnQkFBZ0IsQ0FBQ0MsS0FBakIsQ0FBdUJDLFlBQXZCLEVBQVg7O0VBQ0EsVUFBSXhELGdCQUFnQixHQUFHLEtBQUt3QyxrQkFBTCxDQUF3QmEsR0FBRyxDQUFDNUIsSUFBSixDQUFTZ0IsSUFBakMsQ0FBdkI7O0VBQ0FZLE1BQUFBLEdBQUcsQ0FBQzVCLElBQUosQ0FBU2dDLFdBQVQsQ0FBcUIsa0JBQXJCLEVBQXlDMUQsSUFBekM7RUFDQXNELE1BQUFBLEdBQUcsQ0FBQzVCLElBQUosQ0FBU2dDLFdBQVQsQ0FBcUIsb0JBQXJCLEVBQTJDekQsZ0JBQTNDO0VBQ0EsYUFBTztFQUFFRCxRQUFBQSxJQUFJLEVBQUVBLElBQVI7RUFBY0MsUUFBQUEsZ0JBQWdCLEVBQUVBO0VBQWhDLE9BQVA7RUFDRCxLQWxGNkU7RUFtRjlFMEQsSUFBQUEscUJBQXFCLEVBQUUsK0JBQVVMLEdBQVYsRUFBZTtFQUNwQyxVQUFJTSxjQUFjLEdBQUcsS0FBS25CLGtCQUFMLENBQXdCYSxHQUFHLENBQUM1QixJQUFKLENBQVNnQixJQUFqQyxDQUFyQjs7RUFFQSxVQUFJLENBQUNZLEdBQUcsQ0FBQzVCLElBQUosQ0FBU21DLEtBQVQsQ0FBZUMsZ0JBQXBCLEVBQXNDO0VBQ3BDLGVBQU8sS0FBS0MsY0FBTCxDQUFvQlQsR0FBcEIsRUFBeUJNLGNBQXpCLENBQVA7RUFDRDs7RUFFRCxhQUFPLEtBQUtJLG1CQUFMLENBQXlCVixHQUF6QixFQUE4Qk0sY0FBOUIsQ0FBUDtFQUNELEtBM0Y2RTtFQTRGOUVLLElBQUFBLGtCQUFrQixFQUFFLDRCQUFVWCxHQUFWLEVBQWUvRCxNQUFmLEVBQXVCMkUsR0FBdkIsRUFBNEI7RUFDOUMsVUFBSUMsR0FBRyxHQUFHdEcsY0FBVjtFQUNBeUYsTUFBQUEsR0FBRyxDQUFDeEMsS0FBSixHQUFZdkIsTUFBTSxDQUFDWSxjQUFQLElBQXlCLEVBQXJDO0VBQ0EsVUFBSWxCLEtBQUssR0FBRztFQUNWTSxRQUFBQSxNQUFNLEVBQUVBLE1BREU7RUFFVkcsUUFBQUEsY0FBYyxFQUFFLHdCQUFVMEUsVUFBVixFQUFzQjtFQUNwQ2QsVUFBQUEsR0FBRyxDQUFDeEMsS0FBSixHQUFZc0QsVUFBVSxDQUFDakUsY0FBWCxJQUE2QixFQUF6QztFQUNBbUQsVUFBQUEsR0FBRyxDQUFDNUIsSUFBSixDQUFTZ0MsV0FBVCxDQUFxQixjQUFyQixFQUFxQ1UsVUFBVSxDQUFDbEUsVUFBWCxJQUF5QixFQUE5RDtFQUNBb0QsVUFBQUEsR0FBRyxDQUFDNUIsSUFBSixDQUFTZ0MsV0FBVCxDQUFxQixvQkFBckIsRUFBMkNVLFVBQVUsQ0FBQ25FLGdCQUFYLElBQStCLEVBQTFFO0VBQ0FxRCxVQUFBQSxHQUFHLENBQUM1QixJQUFKLENBQVNnQyxXQUFULENBQXFCLGtCQUFyQixFQUF5Q1UsVUFBVSxDQUFDakUsY0FBWCxJQUE2QixFQUF0RTtFQUNELFNBUFM7RUFRVkosUUFBQUEsWUFBWSxFQUFFLFlBQVk7RUFDeEIsaUJBQU8sS0FBS3NELGFBQUwsQ0FBbUJDLEdBQW5CLENBQVA7RUFDRCxTQUZhLENBRVplLElBRlksQ0FFUCxJQUZPO0VBUkosT0FBWjtFQVlBLFVBQUlDLFNBQVMsR0FBR0osR0FBRyxJQUFJLFNBQXZCOztFQUNBLFVBQUksQ0FBQ1osR0FBRyxDQUFDaUIsaUJBQVQsRUFBNEI7RUFDMUJqQixRQUFBQSxHQUFHLENBQUNpQixpQkFBSixHQUF3QixFQUF4QjtFQUNEOztFQUNELFVBQUlqQixHQUFHLENBQUNpQixpQkFBSixDQUFzQkQsU0FBdEIsS0FBb0NoQixHQUFHLENBQUNpQixpQkFBSixDQUFzQkQsU0FBdEIsRUFBaUNFLE9BQXpFLEVBQWtGO0VBQ2hGbEIsUUFBQUEsR0FBRyxDQUFDaUIsaUJBQUosQ0FBc0JELFNBQXRCLEVBQWlDRSxPQUFqQyxDQUF5QztFQUFFQyxVQUFBQSxlQUFlLEVBQUU7RUFBbkIsU0FBekM7RUFDRDs7RUFDRCxVQUFJQyxPQUFPLEdBQUdwQixHQUFHLENBQUNxQix3QkFBSixJQUFnQ3JCLEdBQUcsQ0FBQ3NCLFdBQWxEO0VBQ0FGLE1BQUFBLE9BQU8sQ0FBQ3JHLEtBQVIsQ0FBY3dHLEtBQWQsR0FBc0IsTUFBdEI7RUFDQUgsTUFBQUEsT0FBTyxDQUFDckcsS0FBUixDQUFjeUcsUUFBZCxHQUF5QixHQUF6QjtFQUNBSixNQUFBQSxPQUFPLENBQUNyRyxLQUFSLENBQWMwRyxTQUFkLEdBQTBCLFlBQTFCO0VBQ0FaLE1BQUFBLEdBQUcsQ0FDQWEsTUFESCxDQUVJTixPQUZKLEVBR0ksU0FBU08sa0JBQVQsQ0FBNEJoRyxLQUE1QixFQUFtQztFQUNqQyxlQUFPckIsS0FBSyxDQUFDVSxhQUFOLENBQW9CVSxZQUFwQixFQUFrQ0MsS0FBbEMsQ0FBUDtFQUNELE9BTEwsRUFNSUEsS0FOSixFQVFHaUcsSUFSSCxDQVFRLFVBQVVDLE1BQVYsRUFBa0I7RUFDdEI3QixRQUFBQSxHQUFHLENBQUNpQixpQkFBSixDQUFzQkQsU0FBdEIsSUFBbUNhLE1BQW5DLENBRHNCOztFQUd0QixZQUFJQyxJQUFJLEdBQUdWLE9BQU8sQ0FBQ1csaUJBQW5COztFQUNBLFlBQUlELElBQUksSUFBSUEsSUFBSSxDQUFDL0csS0FBakIsRUFBd0I7RUFDdEIrRyxVQUFBQSxJQUFJLENBQUMvRyxLQUFMLENBQVd3RyxLQUFYLEdBQW1CLE1BQW5CO0VBQ0FPLFVBQUFBLElBQUksQ0FBQy9HLEtBQUwsQ0FBV3lHLFFBQVgsR0FBc0IsR0FBdEI7RUFDQU0sVUFBQUEsSUFBSSxDQUFDL0csS0FBTCxDQUFXMEcsU0FBWCxHQUF1QixZQUF2QjtFQUNBSyxVQUFBQSxJQUFJLENBQUMvRyxLQUFMLENBQVdpSCxPQUFYLEdBQXFCLE9BQXJCO0VBQ0Q7RUFDRixPQWxCSCxXQW1CUyxVQUFVQyxHQUFWLEVBQWU7RUFDcEJDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDBDQUFkLEVBQTBERixHQUExRDtFQUNBYixRQUFBQSxPQUFPLENBQUNnQixTQUFSLEdBQ0Usa0lBREY7RUFFRCxPQXZCSDtFQXdCRCxLQTlJNkU7RUErSTlFM0IsSUFBQUEsY0FBYyxFQUFFLHdCQUFVVCxHQUFWLEVBQWVNLGNBQWYsRUFBK0I7RUFDN0MsVUFBSXJFLE1BQU0sR0FBRztFQUNYVyxRQUFBQSxVQUFVLEVBQUUwRCxjQUREO0VBRVgzRCxRQUFBQSxnQkFBZ0IsRUFBRTJELGNBRlA7RUFHWHpELFFBQUFBLGNBQWMsRUFBRW9ELGdCQUFnQixDQUFDQyxLQUFqQixDQUF1QkMsWUFBdkI7RUFITCxPQUFiO0VBTUFILE1BQUFBLEdBQUcsQ0FBQzVCLElBQUosQ0FBU2dDLFdBQVQsQ0FBcUIsY0FBckIsRUFBcUNuRSxNQUFNLENBQUNXLFVBQTVDO0VBQ0FvRCxNQUFBQSxHQUFHLENBQUM1QixJQUFKLENBQVNnQyxXQUFULENBQXFCLG9CQUFyQixFQUEyQ25FLE1BQU0sQ0FBQ1UsZ0JBQWxEO0VBQ0FxRCxNQUFBQSxHQUFHLENBQUM1QixJQUFKLENBQVNnQyxXQUFULENBQXFCLGtCQUFyQixFQUF5Q25FLE1BQU0sQ0FBQ1ksY0FBaEQ7O0VBRUEsV0FBSzhELGtCQUFMLENBQXdCWCxHQUF4QixFQUE2Qi9ELE1BQTdCLEVBQXFDLEtBQXJDO0VBQ0QsS0EzSjZFO0VBNEo5RXlFLElBQUFBLG1CQUFtQixFQUFFLDZCQUFVVixHQUFWLEVBQWVNLGNBQWYsRUFBK0I7RUFDbEQsVUFBSUMsS0FBSyxHQUFHUCxHQUFHLENBQUM1QixJQUFKLENBQVNtQyxLQUFyQjtFQUNBLFVBQUk4QixTQUFTLEdBQ1g5QixLQUFLLENBQUMrQixZQUFOLElBQXNCbkYsTUFBTSxDQUFDb0QsS0FBSyxDQUFDK0IsWUFBUCxDQUFOLENBQTJCbEYsSUFBM0IsRUFBdEIsR0FDSUQsTUFBTSxDQUFDb0QsS0FBSyxDQUFDK0IsWUFBUCxDQUFOLENBQTJCbEYsSUFBM0IsR0FBa0NMLFdBQWxDLEVBREosR0FFSSxFQUhOO0VBSUEsVUFBSXdGLFFBQVEsR0FBR2pDLGNBQWMsSUFBSSxFQUFqQztFQUNBLFVBQUkxRCxVQUFVLEdBQUd5RixTQUFTLElBQUlFLFFBQTlCO0VBQ0EsVUFBSXRHLE1BQU0sR0FBRztFQUNYVyxRQUFBQSxVQUFVLEVBQUVBLFVBREQ7RUFFWEQsUUFBQUEsZ0JBQWdCLEVBQUU0RCxLQUFLLENBQUNpQyxrQkFBTixHQUEyQnJGLE1BQU0sQ0FBQ29ELEtBQUssQ0FBQ2lDLGtCQUFQLENBQU4sQ0FBaUNwRixJQUFqQyxHQUF3Q0wsV0FBeEMsRUFBM0IsR0FBbUZILFVBRjFGO0VBR1hDLFFBQUFBLGNBQWMsRUFBRTBELEtBQUssQ0FBQ0M7RUFIWCxPQUFiO0VBS0FSLE1BQUFBLEdBQUcsQ0FBQzVCLElBQUosQ0FBU2dDLFdBQVQsQ0FBcUIsY0FBckIsRUFBcUNuRSxNQUFNLENBQUNXLFVBQTVDO0VBQ0FvRCxNQUFBQSxHQUFHLENBQUM1QixJQUFKLENBQVNnQyxXQUFULENBQXFCLG9CQUFyQixFQUEyQ25FLE1BQU0sQ0FBQ1UsZ0JBQWxEOztFQUNBLFdBQUtnRSxrQkFBTCxDQUF3QlgsR0FBeEIsRUFBNkIvRCxNQUE3QixFQUFxQyxVQUFyQztFQUNELEtBNUs2RTtFQTZLOUV5RixJQUFBQSxNQUFNLEVBQUUsZ0JBQVVqRyxNQUFWLEVBQWtCNkYsV0FBbEIsRUFBK0I7RUFDckNBLE1BQUFBLFdBQVcsQ0FBQ3JHLEVBQVosR0FBaUIsS0FBS0EsRUFBdEI7RUFDQSxXQUFLcUcsV0FBTCxHQUFtQkEsV0FBbkI7RUFDQXhDLE1BQUFBLEtBQUssQ0FBQzJELElBQU4sQ0FBV0MsR0FBWCxDQUFlQyxRQUFmLENBQXdCckIsV0FBeEIsRUFBcUMseUJBQXJDO0VBQ0F4QyxNQUFBQSxLQUFLLENBQUMyRCxJQUFOLENBQVdDLEdBQVgsQ0FBZUMsUUFBZixDQUF3QnJCLFdBQXhCLEVBQXFDLCtCQUFyQztFQUVBLFVBQUlzQixPQUFPLEdBQUcvSCxRQUFRLENBQUNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZDtFQUNBOEQsTUFBQUEsS0FBSyxDQUFDMkQsSUFBTixDQUFXQyxHQUFYLENBQWVDLFFBQWYsQ0FBd0JDLE9BQXhCLEVBQWlDLDBCQUFqQztFQUNBQSxNQUFBQSxPQUFPLENBQUMxSCxXQUFSLEdBQXNCTyxNQUFNLENBQUNnQyxLQUFQLElBQWdCLGtCQUF0QztFQUNBNkQsTUFBQUEsV0FBVyxDQUFDbEcsV0FBWixDQUF3QndILE9BQXhCO0VBRUEsVUFBSXZCLHdCQUF3QixHQUFHeEcsUUFBUSxDQUFDRyxhQUFULENBQXVCLEtBQXZCLENBQS9CO0VBQ0E4RCxNQUFBQSxLQUFLLENBQUMyRCxJQUFOLENBQVdDLEdBQVgsQ0FBZUMsUUFBZixDQUF3QnRCLHdCQUF4QixFQUFrRCxxQ0FBbEQ7RUFDQXZDLE1BQUFBLEtBQUssQ0FBQzJELElBQU4sQ0FBV0MsR0FBWCxDQUFlQyxRQUFmLENBQXdCdEIsd0JBQXhCLEVBQWtELGlDQUFsRDtFQUNBQyxNQUFBQSxXQUFXLENBQUNsRyxXQUFaLENBQXdCaUcsd0JBQXhCO0VBQ0EsV0FBS0Esd0JBQUwsR0FBZ0NBLHdCQUFoQzs7RUFFQSxVQUFJNUYsTUFBTSxDQUFDb0gsV0FBWCxFQUF3QjtFQUN0QixZQUFJQyxhQUFhLEdBQUdqSSxRQUFRLENBQUNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7RUFDQThELFFBQUFBLEtBQUssQ0FBQzJELElBQU4sQ0FBV0MsR0FBWCxDQUFlQyxRQUFmLENBQXdCRyxhQUF4QixFQUF1QyxhQUF2QztFQUNBaEUsUUFBQUEsS0FBSyxDQUFDMkQsSUFBTixDQUFXQyxHQUFYLENBQWVDLFFBQWYsQ0FBd0JHLGFBQXhCLEVBQXVDLGdDQUF2QztFQUNBQSxRQUFBQSxhQUFhLENBQUMvSCxLQUFkLENBQW9CZ0ksT0FBcEIsR0FDRSxpRkFERjtFQUVBRCxRQUFBQSxhQUFhLENBQUNWLFNBQWQsR0FBMEIzRyxNQUFNLENBQUNvSCxXQUFqQztFQUNBdkIsUUFBQUEsV0FBVyxDQUFDbEcsV0FBWixDQUF3QjBILGFBQXhCO0VBQ0Q7O0VBRUQsV0FBS3pDLHFCQUFMLENBQTJCLElBQTNCO0VBQ0QsS0F6TTZFO0VBME05RTJDLElBQUFBLFFBQVEsRUFBRSxvQkFBWTtFQUNwQixhQUFPLEtBQUt4RixLQUFaO0VBQ0QsS0E1TTZFO0VBNk05RXlGLElBQUFBLFFBQVEsRUFBRSxrQkFBVXpGLEtBQVYsRUFBaUI7RUFDekIsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0VBQ0QsS0EvTTZFO0VBZ045RTBGLElBQUFBLE9BQU8sRUFBRSxtQkFBWTtFQUNuQixhQUFPLGVBQVA7RUFDRCxLQWxONkU7RUFtTjlFQyxJQUFBQSxzQkFBc0IsRUFBRSxrQ0FBWTtFQUNsQyxhQUFPLEVBQVA7RUFDRCxLQXJONkU7RUFzTjlFQyxJQUFBQSx1QkFBdUIsRUFBRSxtQ0FBWTtFQUNuQyxhQUFPLEVBQVA7RUFDRCxLQXhONkU7RUF5TjlFQyxJQUFBQSxxQkFBcUIsRUFBRSxpQ0FBWTtFQUNqQyxhQUFPLEtBQUt4RSxrQkFBWjtFQUNEO0VBM042RSxHQUFoRjtFQTZOQW9CLEVBQUFBLGdCQUFnQixDQUFDcUQsTUFBakIsQ0FBd0JDLFlBQXhCLENBQXFDLGVBQXJDLEVBQXNEckYsWUFBWSxDQUFDQyxRQUFiLENBQXNCekMsWUFBNUU7RUFDRDs7RUFFRCxDQUFDLFlBQVk7RUFDWCxNQUFJLE9BQU9uQixjQUFQLEtBQTBCLFdBQTFCLElBQXlDQSxjQUFjLENBQUNELEtBQTVELEVBQW1FO0VBQ2pFRCxJQUFBQSx1QkFBdUI7RUFDeEIsR0FGRCxNQUVPO0VBQ0xRLElBQUFBLFFBQVEsQ0FBQzJJLGdCQUFULENBQTBCLGdDQUExQixFQUE0RG5KLHVCQUE1RCxFQUFxRjtFQUFFb0osTUFBQUEsSUFBSSxFQUFFO0VBQVIsS0FBckY7RUFDRDtFQUNGLENBTkQ7Ozs7OzsifQ==
