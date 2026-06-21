"use strict";

function bootCustomLocaleControl() {
  var React = CrafterCMSNext.React;
  var CrafterCMSNextBridge = CrafterCMSNext.components.CrafterCMSNextBridge;
  var ConfirmDialog = CrafterCMSNext.components.ConfirmDialog;

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

    React.useEffect(
      function () {
        setLocale(props.locale);
      },
      [props.locale]
    );

    React.useEffect(
      function () {
        if (!locale || typeof props.onLocaleChange !== "function") return;
        props.onLocaleChange(locale);
      },
      [locale, props.onLocaleChange]
    );

    var onConfirmOk = function (e) {
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
    var linkedElsewhere = pathLocale && sourceLocale && pathLocale !== sourceLocale;

    // Match stock form controls: same container class as built-in inputs; no custom panels.
    return React.createElement(
      "div",
      { className: "cstudio-form-control-input-container" },
      linkedElsewhere
        ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "p",
              {
                className: "help-block",
                style: { marginBottom: "8px", marginTop: 0 }
              },
              "This item is linked to a translation (source locale differs from this folder). Locale Code and Source Locale Code are shown in the fields below."
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-default btn-sm edit-position",
                style: { marginRight: "6px" },
                onClick: function () {
                  setIsDialogOpen(true);
                }
              },
              "Unlink"
            ),
            React.createElement(
              CrafterCMSNextBridge,
              null,
              React.createElement(ConfirmDialog, {
                open: isDialogOpen,
                onOk: onConfirmOk,
                onCancel: function () {
                  setIsDialogOpen(false);
                },
                onClose: function () {
                  setIsDialogOpen(false);
                },
                body:
                  "Warning: By unlinking this content you are indicating that this object has no localization relationships to any other objects in the system. Do you wish to continue?",
                title: "Unlink",
                disableEnforceFocus: false
              })
            )
          )
        : null
    );
  }

  CStudioForms.Controls.CustomLocale =
    CStudioForms.Controls.CustomLocale ||
    function (id, form, owner, properties, constraints) {
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
    getLabel: function () {
      return "Custom locale (Translation)";
    },
    /**
     * Legacy allow-list (folder names). Also used as hints; path parser accepts standard BCP47-style segments.
     */
    _getLocaleList: function () {
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
    },
    /**
     * Locale folder from repo path: /site/{site}/website/en/... or /site/{site}/components/en/...
     */
    _getLocaleFromPath: function (path) {
      if (!path) return "";

      var parts = path
        .replace(/^\/site\/[^/]+\//i, "")
        .split("/")
        .filter(Boolean);
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
    _unlinkLocale: function (obj) {
      var uuid = CStudioAuthoring.Utils.generateUUID();
      var sourceLocaleCode = this._getLocaleFromPath(obj.form.path);
      obj.form.updateModel("localeSourceId_s", uuid);
      obj.form.updateModel("sourceLocaleCode_s", sourceLocaleCode);
      return { uuid: uuid, sourceLocaleCode: sourceLocaleCode };
    },
    _renderReactComponent: function (obj) {
      var localeFromPath = this._getLocaleFromPath(obj.form.path);

      if (!obj.form.model.localeSourceId_s) {
        return this._renderNewItem(obj, localeFromPath);
      }

      return this._renderExistingItem(obj, localeFromPath);
    },
    _mountCustomLocale: function (obj, locale, key) {
      var cms = CrafterCMSNext;
      var props = {
        locale: locale,
        onLocaleChange: function (nextLocale) {
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
        obj._cmsRenderHandles[handleKey].unmount({ removeContainer: false });
      }
      cms
        .render(
          obj.containerEl,
          function CustomLocaleBridge(props) {
            return React.createElement(CustomLocale, props);
          },
          props
        )
        .then(function (handle) {
          obj._cmsRenderHandles[handleKey] = handle;
        })
        .catch(function (err) {
          console.error("[custom-locale] Failed to render control", err);
          obj.containerEl.innerHTML =
            '<div class="alert alert-warning" style="margin:8px 0">Locale control could not load. Refresh Studio and check the console.</div>';
        });
    },
    _renderNewItem: function (obj, localeFromPath) {
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
    _renderExistingItem: function (obj, localeFromPath) {
      var model = obj.form.model;
      var persisted =
        model.localeCode_s && String(model.localeCode_s).trim()
          ? String(model.localeCode_s).trim().toLowerCase()
          : "";
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
    render: function (config, containerEl) {
      containerEl.id = this.id;
      this.containerEl = containerEl;
      this._renderReactComponent(this);
    },
    getValue: function () {
      return this.value;
    },
    setValue: function (value) {
      this.value = value;
    },
    getName: function () {
      return "custom-locale";
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
  CStudioAuthoring.Module.moduleLoaded("custom-locale", CStudioForms.Controls.CustomLocale);
}

(function () {
  if (typeof CrafterCMSNext !== "undefined" && CrafterCMSNext.React) {
    bootCustomLocaleControl();
  } else {
    document.addEventListener("CrafterCMS.CodebaseBridgeReady", bootCustomLocaleControl, { once: true });
  }
})();
