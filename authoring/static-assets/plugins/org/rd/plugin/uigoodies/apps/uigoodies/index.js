const React = craftercms.libs.React;
const { useState, useRef, useEffect, useMemo, useCallback } = craftercms.libs.React;
const React__default = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, useTheme, accordionClasses, accordionSummaryClasses, Accordion, AccordionSummary, Typography, AccordionDetails, Button: Button$1, CircularProgress, alpha, buttonClasses, Backdrop, Alert, Paper, Box: Box$1, AlertTitle, Stepper, Step, StepLabel, Autocomplete, TextField: TextField$1, FormControlLabel, Checkbox, List, ListItem } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Button = craftercms.libs.MaterialUI.Button && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Button, 'default') ? craftercms.libs.MaterialUI.Button['default'] : craftercms.libs.MaterialUI.Button;
const SystemIcon = craftercms.components.SystemIcon && Object.prototype.hasOwnProperty.call(craftercms.components.SystemIcon, 'default') ? craftercms.components.SystemIcon['default'] : craftercms.components.SystemIcon;
const { isItemLockedForMe } = craftercms.utils.content;
const { SystemIcon: SystemIcon$1, WidgetsGrid, DialogBody, DialogFooter: DialogFooter$1 } = craftercms.components;
const ExpandMore = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined');
const { createCustomDocumentEventListener } = craftercms.utils.dom;
const TextField = craftercms.libs.MaterialUI.TextField && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.TextField, 'default') ? craftercms.libs.MaterialUI.TextField['default'] : craftercms.libs.MaterialUI.TextField;
const Container = craftercms.libs.MaterialUI.Container && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Container, 'default') ? craftercms.libs.MaterialUI.Container['default'] : craftercms.libs.MaterialUI.Container;
const Box = craftercms.libs.MaterialUI.Box && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Box, 'default') ? craftercms.libs.MaterialUI.Box['default'] : craftercms.libs.MaterialUI.Box;
const { writeContent } = craftercms.services.content;
const { DialogFooter, PathNavigator } = craftercms.components;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const Tooltip$1 = craftercms.libs.MaterialUI.Tooltip && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Tooltip, 'default') ? craftercms.libs.MaterialUI.Tooltip['default'] : craftercms.libs.MaterialUI.Tooltip;
const { pull, push } = craftercms.services.repositories;
const DownloadIcon = craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined');
const PublishIcon = craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined');
const Snackbar = craftercms.libs.MaterialUI.Snackbar && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Snackbar, 'default') ? craftercms.libs.MaterialUI.Snackbar['default'] : craftercms.libs.MaterialUI.Snackbar;
const { FormattedMessage } = craftercms.libs.ReactIntl;
const { of, from, concatMap: concatMap$1, forkJoin } = craftercms.libs.rxjs;
const { concatMap, expand, toArray, catchError, switchMap } = craftercms.libs.rxjs;
const { fetchUnpublished } = craftercms.services.dashboard;
const { nou } = craftercms.utils.object;
const { lookupItemByPath } = craftercms.utils.content;
const { hasInitialPublish, fetchAll } = craftercms.services.sites;
const { useTheme: useTheme$1 } = craftercms.libs.MaterialUI;
const InfoOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined');
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const ExpandMoreRounded = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded');
const { fetchContentTypes } = craftercms.services.contentTypes;
const { fetchConfigurationXML, writeConfiguration } = craftercms.services.configuration;
const Popover = craftercms.libs.MaterialUI.Popover && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Popover, 'default') ? craftercms.libs.MaterialUI.Popover['default'] : craftercms.libs.MaterialUI.Popover;
const Paper$1 = craftercms.libs.MaterialUI.Paper && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Paper, 'default') ? craftercms.libs.MaterialUI.Paper['default'] : craftercms.libs.MaterialUI.Paper;
const Typography$1 = craftercms.libs.MaterialUI.Typography && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Typography, 'default') ? craftercms.libs.MaterialUI.Typography['default'] : craftercms.libs.MaterialUI.Typography;
const Alert$1 = craftercms.libs.MaterialUI.Alert && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Alert, 'default') ? craftercms.libs.MaterialUI.Alert['default'] : craftercms.libs.MaterialUI.Alert;
const PreviewAudiencesPanel = craftercms.components.PreviewAudiencesPanel && Object.prototype.hasOwnProperty.call(craftercms.components.PreviewAudiencesPanel, 'default') ? craftercms.components.PreviewAudiencesPanel['default'] : craftercms.components.PreviewAudiencesPanel;
const { createLookupTable } = craftercms.utils.object;
const PreviewSimulatorPanel = craftercms.components.PreviewSimulatorPanel && Object.prototype.hasOwnProperty.call(craftercms.components.PreviewSimulatorPanel, 'default') ? craftercms.components.PreviewSimulatorPanel['default'] : craftercms.components.PreviewSimulatorPanel;

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=React__default,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	{
	  jsxRuntime.exports = requireReactJsxRuntime_production_min();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveUser() {
  return useSelector((state) => state.user);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useEnv() {
  return useSelector((state) => state.env);
}

// src/utils/formatProdErrorMessage.ts

// src/utils/isPlainObject.ts
function isPlainObject$1(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

// src/utils/isAction.ts
function isAction(action) {
  return isPlainObject$1(action) && "type" in action && typeof action.type === "string";
}

// src/utils/env.ts
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}

// src/utils/common.ts
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || !isObjectish(value))
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null || proto === O[PROTOTYPE])
    return true;
  const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
  if (Ctor === Object)
    return true;
  if (!isFunction(Ctor))
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0 /* Object */) {
    const keys = strict ? Reflect.ownKeys(obj) : O.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 /* Map */ ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => (
  // @ts-ignore
  type === 2 /* Map */ ? thing.get(prop) : thing[prop]
);
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
  if (type === 2 /* Map */)
    thing.set(propOrOldValue, value);
  else if (type === 3 /* Set */) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
};
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean = (target) => typeof target === "boolean";
function isArrayIndex(value) {
  const n = +value;
  return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (isArray(base))
    return Array[PROTOTYPE].slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = O.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc[WRITABLE] === false) {
        desc[WRITABLE] = true;
        desc[CONFIGURABLE] = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          [CONFIGURABLE]: true,
          [WRITABLE]: true,
          // could live with !!desc.set as well here...
          [ENUMERABLE]: desc[ENUMERABLE],
          [VALUE]: base[key]
        };
    }
    return O.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = O.create(proto);
    return O.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    O.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  O.freeze(obj);
  if (deep)
    each(
      obj,
      (_key, value) => {
        freeze(value, true);
      },
      false
    );
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  [VALUE]: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || !isObjectish(obj))
    return true;
  return O.isFrozen(obj);
}

// src/utils/plugins.ts
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];

// src/core/scope.ts
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
  drafts_: [],
  parent_,
  immer_,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: true,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
  arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    scope.patchPlugin_ = getPlugin(PluginPatches);
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */)
    state.revoke_();
  else
    state.revoked_ = true;
}

// src/core/finalize.ts
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
    }
    const { patchPlugin_ } = scope;
    if (patchPlugin_) {
      patchPlugin_.generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope
      );
    }
  } else {
    result = finalize(scope, baseDraft);
  }
  maybeFreeze(scope, result, true);
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    const finalValue = handleValue(value, rootScope.handledSet_, rootScope);
    return finalValue;
  }
  if (!isSameScope(state, rootScope)) {
    return value;
  }
  if (!state.modified_) {
    return state.base_;
  }
  if (!state.finalized_) {
    const { callbacks_ } = state;
    if (callbacks_) {
      while (callbacks_.length > 0) {
        const callback = callbacks_.pop();
        callback(rootScope);
      }
    }
    generatePatchesAndFinalize(state, rootScope);
  }
  return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function markStateFinalized(state) {
  state.finalized_ = true;
  state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
  const parentCopy = latest(parent);
  const parentType = parent.type_;
  if (originalKey !== void 0) {
    const currentValue = get(parentCopy, originalKey, parentType);
    if (currentValue === draftValue) {
      set(parentCopy, originalKey, finalizedValue, parentType);
      return;
    }
  }
  if (!parent.draftLocations_) {
    const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
    each(parentCopy, (key, value) => {
      if (isDraft(value)) {
        const keys = draftLocations.get(value) || [];
        keys.push(key);
        draftLocations.set(value, keys);
      }
    });
  }
  const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
  for (const location of locations) {
    set(parentCopy, location, finalizedValue, parentType);
  }
}
function registerChildFinalizationCallback(parent, child, key) {
  parent.callbacks_.push(function childCleanup(rootScope) {
    const state = child;
    if (!state || !isSameScope(state, rootScope)) {
      return;
    }
    rootScope.mapSetPlugin_?.fixSetContents(state);
    const finalizedValue = getFinalValue(state);
    updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
    generatePatchesAndFinalize(state, rootScope);
  });
}
function generatePatchesAndFinalize(state, rootScope) {
  const shouldFinalize = state.modified_ && !state.finalized_ && (state.type_ === 3 /* Set */ || state.type_ === 1 /* Array */ && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0);
  if (shouldFinalize) {
    const { patchPlugin_ } = rootScope;
    if (patchPlugin_) {
      const basePath = patchPlugin_.getPath(state);
      if (basePath) {
        patchPlugin_.generatePatches_(state, basePath, rootScope);
      }
    }
    markStateFinalized(state);
  }
}
function handleCrossReference(target, key, value) {
  const { scope_ } = target;
  if (isDraft(value)) {
    const state = value[DRAFT_STATE];
    if (isSameScope(state, scope_)) {
      state.callbacks_.push(function crossReferenceCleanup() {
        prepareCopy(target);
        const finalizedValue = getFinalValue(state);
        updateDraftInParent(target, value, finalizedValue, key);
      });
    }
  } else if (isDraftable(value)) {
    target.callbacks_.push(function nestedDraftCleanup() {
      const targetCopy = latest(target);
      if (target.type_ === 3 /* Set */) {
        if (targetCopy.has(value)) {
          handleValue(value, scope_.handledSet_, scope_);
        }
      } else {
        if (get(targetCopy, key, target.type_) === value) {
          if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) {
            handleValue(
              get(target.copy_, key, target.type_),
              scope_.handledSet_,
              scope_
            );
          }
        }
      }
    });
  }
}
function handleValue(target, handledSet, rootScope) {
  if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
    return target;
  }
  if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) {
    return target;
  }
  handledSet.add(target);
  each(target, (key, value) => {
    if (isDraft(value)) {
      const state = value[DRAFT_STATE];
      if (isSameScope(state, rootScope)) {
        const updatedValue = getFinalValue(state);
        set(target, key, updatedValue, target.type_);
        markStateFinalized(state);
      }
    } else if (isDraftable(value)) {
      handleValue(value, handledSet, rootScope);
    }
  });
  return target;
}

// src/core/proxy.ts
function createProxyProxy(base, parent) {
  const baseIsArray = isArray(base);
  const state = {
    type_: baseIsArray ? 1 /* Array */ : 0 /* Object */,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let target = state;
  let traps = objectTraps;
  if (baseIsArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return [proxy, state];
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    let arrayPlugin = state.scope_.arrayMethodsPlugin_;
    const isArrayWithStringProp = state.type_ === 1 /* Array */ && typeof prop === "string";
    if (isArrayWithStringProp) {
      if (arrayPlugin?.isArrayOperationMethod(prop)) {
        return arrayPlugin.createMethodInterceptor(state, prop);
      }
    }
    const source = latest(state);
    if (!has(source, prop, state.type_)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(
      state.operationMethod
    ) && isArrayIndex(prop)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      const childKey = state.type_ === 1 /* Array */ ? +prop : prop;
      const childDraft = createProxy(state.scope_, value, state, childKey);
      return state.copy_[childKey] = childDraft;
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_.set(prop, false);
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_.set(prop, true);
    handleCrossReference(state, prop, value);
    return true;
  },
  deleteProperty(state, prop) {
    prepareCopy(state);
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_.set(prop, false);
      markChanged(state);
    } else {
      state.assigned_.delete(prop);
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      [WRITABLE]: true,
      [CONFIGURABLE]: state.type_ !== 1 /* Array */ || prop !== "length",
      [ENUMERABLE]: desc[ENUMERABLE],
      [VALUE]: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
for (let key in objectTraps) {
  let fn = objectTraps[key];
  arrayTraps[key] = function() {
    const args = arguments;
    args[0] = args[0][0];
    return fn.apply(this, args);
  };
}
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? VALUE in desc ? desc[VALUE] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.assigned_ = /* @__PURE__ */ new Map();
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}

// src/core/immerClass.ts
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = false;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = (base, recipe, patchListener) => {
      if (isFunction(base) && !isFunction(recipe)) {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (!isFunction(recipe))
        die(6);
      if (patchListener !== void 0 && !isFunction(patchListener))
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(scope, base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || !isObjectish(base)) {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
            patches_: p,
            inversePatches_: ip
          });
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (isFunction(base)) {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (isBoolean(config?.autoFreeze))
      this.setAutoFreeze(config.autoFreeze);
    if (isBoolean(config?.useStrictShallowCopy))
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (isBoolean(config?.useStrictIteration))
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(scope, base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(rootScope, value, parent, key) {
  const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent?.scope_ ?? getCurrentScope();
  scope.drafts_.push(draft);
  state.callbacks_ = parent?.callbacks_ ?? [];
  state.key_ = key;
  if (parent && key !== void 0) {
    registerChildFinalizationCallback(parent, state, key);
  } else {
    state.callbacks_.push(function rootDraftCleanup(rootScope2) {
      rootScope2.mapSetPlugin_?.fixSetContents(state);
      const { patchPlugin_ } = rootScope2;
      if (state.modified_ && patchPlugin_) {
        patchPlugin_.generatePatches_(state, [], rootScope2);
      }
    });
  }
  return draft;
}

// src/core/current.ts
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

// src/immer.ts
var immer = new Immer2();
var produce = immer.produce;

// src/index.ts

// src/createAction.ts
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => isAction(action) && action.type === type;
  return actionCreator;
}
function freezeDraftable(val) {
  return isDraftable(val) ? produce(val, () => {
  }) : val;
}

// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) {
        throw new Error(formatProdErrorMessage(28) );
      }
      if (type in actionsMap) {
        throw new Error(formatProdErrorMessage(29) );
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addAsyncThunk(asyncThunk, reducers) {
      if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
      if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
      if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
      if (reducers.settled) actionMatchers.push({
        matcher: asyncThunk.settled,
        reducer: reducers.settled
      });
      return builder;
    },
    addMatcher(matcher, reducer) {
      actionMatchers.push({
        matcher,
        reducer
      });
      return builder;
    },
    addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}

// src/createReducer.ts
function isStateFunction(x) {
  return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = () => freezeDraftable(initialState());
  } else {
    const frozenInitialState = freezeDraftable(initialState);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
      matcher
    }) => matcher(action)).map(({
      reducer: reducer2
    }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return produce(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}

// src/formatProdErrorMessage.ts
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// endregion
// region Publish
const showPublishDialog = /*#__PURE__*/ createAction('SHOW_PUBLISH_DIALOG');
const closePublishDialog = /*#__PURE__*/ createAction('CLOSE_PUBLISH_DIALOG');
// endregion
// region Legacy Form
const showEditDialog = /*#__PURE__*/ createAction('SHOW_EDIT_DIALOG');
// endregion
// region Path Selection Dialog
const showPathSelectionDialog = /*#__PURE__*/ createAction('SHOW_PATH_SELECTION_DIALOG');
const closePathSelectionDialog = /*#__PURE__*/ createAction('CLOSE_PATH_SELECTION_DIALOG');
const pathSelectionDialogClosed = /*#__PURE__*/ createAction('PATH_SELECTION_CLOSED');
// endregion
// region Widget Dialog
const showWidgetDialog = /*#__PURE__*/ createAction('SHOW_WIDGET_DIALOG');
// endregion

function EditOrViewCurrent(props) {
    // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
    var item = props.item, useIcon = props.useIcon;
    var dispatch = useDispatch();
    var currentUser = useActiveUser();
    var siteId = useActiveSiteId();
    var env = useEnv();
    var readonly = true;
    // make sure the user has access to the item,
    if ((item === null || item === void 0 ? void 0 : item.availableActionsMap.edit) === true && isItemLockedForMe(item, currentUser.username) === false) {
        readonly = false;
    }
    var label = readonly ? 'View' : 'Edit';
    var iconId = item
        ? readonly
            ? '@mui/icons-material/PreviewOutlined'
            : '@mui/icons-material/EditOutlined'
        : '@mui/icons-material/HourglassEmptyOutlined';
    var handleClick = function (event) {
        if (!item.stateMap.systemProcessing) {
            dispatch(showEditDialog({
                site: siteId,
                path: item.path,
                authoringBase: env.authoringBase,
                readonly: readonly
            }));
        }
    };
    return useIcon ? (jsxRuntimeExports.jsx(Tooltip, { title: item ? "".concat(label, " (shift+e)") : '', children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handleClick, disabled: !item, children: jsxRuntimeExports.jsx(SystemIcon, { icon: { id: iconId } }) }) })) : (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item, children: label }));
}

function PublishOrRequestPublish(props) {
    // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
    var item = props.item, useIcon = props.useIcon;
    var dispatch = useDispatch();
    var showButton = Boolean(item) && (item.stateMap.modified || item.stateMap.new);
    var forceRequest = !(item === null || item === void 0 ? void 0 : item.availableActionsMap.publish);
    var label = forceRequest ? 'Request Publish' : 'Publish';
    var iconId = item
        ? forceRequest
            ? '@mui/icons-material/CloudDoneOutlined'
            : '@mui/icons-material/BackupOutlined'
        : '@mui/icons-material/HourglassEmptyOutlined';
    var handleClick = function (event) {
        dispatch(showPublishDialog({ items: [item], onSuccess: closePublishDialog() }));
    };
    return showButton === true ? (useIcon ? (jsxRuntimeExports.jsx(Tooltip, { title: item ? label : '', children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handleClick, disabled: !item, children: jsxRuntimeExports.jsx(SystemIcon, { icon: { id: iconId } }) }) })) : (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item, children: label }))) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}));
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function ToolPanelAccordion(props) {
    var _a, _b;
    var title = props.title, icon = props.icon, sxs = props.sxs;
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var theme = useTheme();
    var expandedClass = accordionClasses.expanded;
    var contentClass = accordionSummaryClasses.content;
    return (jsxRuntimeExports.jsxs(Accordion, { expanded: open, onChange: function (e, isExpanded) { return setOpen(isExpanded); }, sx: __assign((_a = { boxShadow: 0 }, _a["&.".concat(expandedClass)] = { margin: 0 }, _a), sxs === null || sxs === void 0 ? void 0 : sxs.accordion), children: [jsxRuntimeExports.jsxs(AccordionSummary, { expandIcon: jsxRuntimeExports.jsx(ExpandMore, {}), sx: __assign((_b = { alignItems: 'center' }, _b["&, &.".concat(expandedClass)] = { minHeight: '48px' }, _b[".".concat(contentClass, ", .").concat(contentClass, ".").concat(expandedClass)] = { margin: 0 }, _b), sxs === null || sxs === void 0 ? void 0 : sxs.accordionSummary), children: [icon && jsxRuntimeExports.jsx(SystemIcon$1, { icon: icon, style: { marginRight: '10px', color: theme.palette.action.active } }), jsxRuntimeExports.jsx(Typography, { children: title })] }), jsxRuntimeExports.jsx(AccordionDetails, { sx: __assign({ padding: 0 }, sxs === null || sxs === void 0 ? void 0 : sxs.accordionDetails), children: jsxRuntimeExports.jsx(WidgetsGrid, { container: true, spacing: 0, direction: "column", widgets: props.widgets, sx: sxs === null || sxs === void 0 ? void 0 : sxs.widgetsGrid }) })] }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const showPublishItemSuccessNotification = /*#__PURE__*/ createAction('SHOW_PUBLISH_ITEM_SUCCESS_NOTIFICATION');
const showSystemNotification = /*#__PURE__*/ createAction('SHOW_SYSTEM_NOTIFICATION');
// endregion

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// region Batch Actions
const batchActions = /*#__PURE__*/ createAction('BATCH_ACTIONS');
// endregion
// region dispatch DOM Event
const dispatchDOMEvent = /*#__PURE__*/ createAction('DISPATCH_DOM_EVENT');
// endregion

var MyLoadingButton = function (props) {
    var loading = props.loading, children = props.children, rest = __rest(props, ["loading", "children"]);
    return (jsxRuntimeExports.jsx(Button$1, __assign({ startIcon: loading ? jsxRuntimeExports.jsx(CircularProgress, { size: 16 }) : undefined }, rest, { children: children })));
};

function ContentUpload(props) {
    var _a;
    var _b = useState((_a = props.defaultPath) !== null && _a !== void 0 ? _a : '/site'), path = _b[0], setPath = _b[1];
    var _c = useState(''), content = _c[0], setContent = _c[1];
    var _d = useState(false), processing = _d[0], setProcessing = _d[1];
    var dispatch = useDispatch();
    var inputRef = useRef(null);
    var siteId = useActiveSiteId();
    var handleSelectPath = function () {
        var rootPath = '/site';
        var callbackId = 'ContentUploadPathSelectionDialogCallback';
        var callbackAccept = 'accept';
        dispatch(showPathSelectionDialog({
            rootPath: rootPath ,
            initialPath: path,
            showCreateFolderOption: false,
            allowSwitchingRootPath: !rootPath,
            stripXmlIndex: true,
            onClosed: batchActions([
                dispatchDOMEvent({
                    id: callbackId,
                    action: 'close'
                }),
                pathSelectionDialogClosed()
            ]),
            onOk: batchActions([
                dispatchDOMEvent({
                    id: callbackId,
                    action: callbackAccept
                }),
                closePathSelectionDialog()
            ])
        }));
        createCustomDocumentEventListener(callbackId, function (detail) {
            if (detail.action === callbackAccept) {
                var path_1 = detail.path;
                setPath(path_1);
            }
        });
    };
    var onFileChange = function (event) {
        var file = event.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.readAsText(event.target.files[0], 'UTF-8');
        reader.onload = function (e) {
            setContent(e.target.result);
        };
        reader.onerror = function (e) {
            dispatch(showSystemNotification({
                message: "Error while reading file. Please try again.",
                options: { variant: 'error' }
            }));
        };
    };
    var handleUploadXMLFile = function () {
        if (!content) {
            return;
        }
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(content, 'text/xml');
        var contentTypeNode = xmlDoc.evaluate('/*/content-type', xmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
        var fileNameNode = xmlDoc.evaluate('/*/file-name', xmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (!contentTypeNode || !fileNameNode) {
            dispatch(showSystemNotification({ message: 'Invalid XML document. Cannot upload content' }));
            return;
        }
        contentTypeNode.childNodes[0].nodeValue;
        var fileName = fileNameNode.childNodes[0].nodeValue;
        var contentFullPath = "".concat(path, "/").concat(fileName);
        setProcessing(true);
        writeContent(siteId, contentFullPath, content).subscribe({
            next: function () {
                setContent('');
                setProcessing(false);
                inputRef.current.value = null;
                dispatch(showSystemNotification({ message: 'Content uploaded to the destination.' }));
            },
            error: function (e) {
                console.error(e);
                setProcessing(false);
                dispatch(showSystemNotification({ message: "Error while uploading content: ".concat(e.message) }));
            }
        });
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Container, { sx: {
                    'padding-top': '40px',
                    'padding-bottom': '40px'
                }, children: [jsxRuntimeExports.jsxs(Box, { sx: {
                            display: 'flex',
                            marginBottom: '20px',
                            alignItems: 'center'
                        }, children: [jsxRuntimeExports.jsx(TextField, { label: "Path to upload", id: "path-read-only-input", sx: { minWidth: '450px' }, InputProps: { readOnly: !props.allowPathInput }, value: path, onChange: props.allowPathInput
                                    ? function (e) {
                                        setPath(e.target.value);
                                    }
                                    : undefined }), props.allowPathSelection && (jsxRuntimeExports.jsx(Button, { variant: "outlined", onClick: handleSelectPath, disabled: processing, sx: { minWidth: '130px', marginLeft: '20px' }, children: "Select Path" }))] }), jsxRuntimeExports.jsx(Box, { sx: function (theme) { return ({
                            'font-family': '"Source Sans Pro", "Open Sans", sans-serif',
                            '& input::file-selector-button': {
                                display: 'inline-flex',
                                '-webkit-box-align': 'center',
                                'align-items': 'center',
                                '-webkit-box-pack': 'center',
                                'justify-content': 'center',
                                position: 'relative',
                                'box-sizing': 'border-box',
                                '-webkit-tap-highlight-color': 'transparent',
                                backgroundColor: 'transparent',
                                outline: '0px',
                                margin: '0px',
                                cursor: 'pointer',
                                'user-select': 'none',
                                'vertical-align': 'middle',
                                appearance: 'none',
                                'text-decoration': 'none',
                                'text-transform': 'none',
                                'font-family': '"Source Sans Pro", "Open Sans", sans-serif',
                                'font-weight': '600',
                                'font-size': '0.875rem',
                                'line-height': '1.75',
                                padding: '5px 15px',
                                'border-radius': '4px',
                                transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                border: "1px solid ".concat(alpha(theme.palette.primary.main, 0.5)),
                                color: theme.palette.primary.main,
                                'min-width': '130px',
                                marginRight: '10px',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                    border: "1px solid ".concat(theme.palette.primary.main)
                                }
                            }
                        }); }, children: jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: ".xml", onChange: onFileChange, onClick: function () {
                                inputRef.current.value = null;
                            } }) })] }), jsxRuntimeExports.jsx(DialogFooter, { children: jsxRuntimeExports.jsx(MyLoadingButton, { variant: "contained", onClick: handleUploadXMLFile, loading: processing, disabled: !content, sx: { minWidth: '130px' }, children: "Upload Content" }) })] }));
}

var CONTENT_UPLOAD_DEFAULTS = {
    title: 'Content Upload',
    defaultPath: '/site',
    icon: { id: '@mui/icons-material/FileUploadOutlined' },
    allowPathSelection: true,
    allowPathInput: false
};
var BULK_PUBLISH_DEFAULTS = {
    title: 'Bulk Publish',
    defaultPath: '/static-assets',
    icon: { id: '@mui/icons-material/AutoAwesomeMotionOutlined' }
};
function useOpenContentUpload(props) {
    var dispatch = useDispatch();
    return function () {
        var _a, _b, _c, _d;
        return dispatch(showWidgetDialog({
            title: (_a = props.title) !== null && _a !== void 0 ? _a : CONTENT_UPLOAD_DEFAULTS.title,
            fullHeight: false,
            fullWidth: false,
            widget: {
                id: 'org.rd.plugin.uigoodies.ContentUpload',
                configuration: {
                    defaultPath: (_b = props.defaultPath) !== null && _b !== void 0 ? _b : CONTENT_UPLOAD_DEFAULTS.defaultPath,
                    allowPathSelection: (_c = props.allowPathSelection) !== null && _c !== void 0 ? _c : CONTENT_UPLOAD_DEFAULTS.allowPathSelection,
                    allowPathInput: (_d = props.allowPathInput) !== null && _d !== void 0 ? _d : CONTENT_UPLOAD_DEFAULTS.allowPathInput
                }
            }
        }));
    };
}
function useOpenBulkPublish(props) {
    var dispatch = useDispatch();
    return function () {
        var _a, _b;
        return dispatch(showWidgetDialog({
            title: (_a = props.title) !== null && _a !== void 0 ? _a : BULK_PUBLISH_DEFAULTS.title,
            fullHeight: false,
            fullWidth: false,
            widget: {
                id: 'org.rd.plugin.uigoodies.bulkPublishView',
                configuration: {
                    defaultPath: (_b = props.defaultPath) !== null && _b !== void 0 ? _b : BULK_PUBLISH_DEFAULTS.defaultPath
                }
            }
        }));
    };
}

function OpenContentUploadPanelButton(props) {
    var _a = props.title, title = _a === void 0 ? CONTENT_UPLOAD_DEFAULTS.title : _a, _b = props.icon, icon = _b === void 0 ? CONTENT_UPLOAD_DEFAULTS.icon : _b, _c = props.dialogTitle, dialogTitle = _c === void 0 ? title : _c;
    var handleClick = useOpenContentUpload(__assign(__assign({}, props), { title: dialogTitle }));
    return jsxRuntimeExports.jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick });
}

function OpenContentUploadToolbarButton(props) {
    var _a;
    var _b = props.title, title = _b === void 0 ? CONTENT_UPLOAD_DEFAULTS.title : _b, _c = props.tooltip, tooltip = _c === void 0 ? title : _c, _d = props.useIcon, useIcon = _d === void 0 ? true : _d, _e = props.useIconWithText, useIconWithText = _e === void 0 ? false : _e, _f = props.buttonSize, buttonSize = _f === void 0 ? 'small' : _f, _g = props.dialogTitle, dialogTitle = _g === void 0 ? title : _g, _h = props.icon, icon = _h === void 0 ? CONTENT_UPLOAD_DEFAULTS.icon : _h;
    // Protection against confusion of using the two props combined (i.e. useIcon, useIconWithText)...
    if (useIconWithText) {
        useIcon = false;
    }
    var handleClick = useOpenContentUpload(__assign(__assign({}, props), { title: dialogTitle }));
    var applyTooltip = function (children) {
        return useIcon || props.tooltip ? jsxRuntimeExports.jsx(Tooltip$1, { title: tooltip, children: children }) : children;
    };
    return applyTooltip(useIcon ? (jsxRuntimeExports.jsx(IconButton, { size: buttonSize, onClick: handleClick, children: jsxRuntimeExports.jsx(SystemIcon, { icon: icon }) })) : (jsxRuntimeExports.jsx(Button$1, { size: buttonSize, onClick: handleClick, startIcon: useIconWithText ? jsxRuntimeExports.jsx(SystemIcon, { icon: icon }) : void 0, sx: (_a = {}, _a[".".concat(buttonClasses.startIcon)] = { mr: 0.5 }, _a), children: title })));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const useSelection =
  useSelector ;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useRoles() {
  return useSelection((state) => state.user.rolesBySite);
}

function PullPushRemoteButtons(props) {
    var useIcon = props.useIcon, remoteName = props.remoteName, mergeStrategy = props.mergeStrategy, pullBranch = props.pullBranch, pushBranch = props.pushBranch, pullLabel = props.pullLabel, pushLabel = props.pushLabel, enablePull = props.enablePull, enablePush = props.enablePush;
    var siteId = useActiveSiteId();
    useEnv();
    var roles = useRoles();
    var _a = React.useState(''), snackMessage = _a[0], setSnackMessage = _a[1];
    var _b = React.useState(true), snackSuccess = _b[0], setSnackSuccess = _b[1];
    var _c = React.useState(false), snackShow = _c[0], setSnackShow = _c[1];
    var _d = React.useState(false), progressShow = _d[0], setProgressShow = _d[1];
    var onPullSuccess = function (result) {
        setSnackMessage("".concat(pullLabel ? pullLabel : 'Pull', " completed successfully."));
        setSnackSuccess(true);
        setSnackShow(true);
    };
    var onPullError = function (result) {
        setSnackMessage("".concat(pullLabel ? pullLabel : 'Pull', " failed."));
        setSnackSuccess(false);
        setSnackShow(true);
    };
    var onPushSuccess = function () {
        setSnackMessage("".concat(pushLabel ? pushLabel : 'Push', " completed successfully."));
        setSnackSuccess(true);
        setSnackShow(true);
    };
    var onPushError = function (result) {
        setSnackMessage("".concat(pushLabel ? pushLabel : 'Push', " failed."));
        setSnackSuccess(false);
        setSnackShow(true);
    };
    var handlePullClick = function (event) {
        setProgressShow(true);
        pull({
            siteId: siteId,
            remoteName: remoteName,
            remoteBranch: pullBranch,
            mergeStrategy: mergeStrategy
        }).subscribe({
            next: function (result) {
                onPullSuccess();
            },
            error: function (_a) {
                var response = _a.response;
                onPullError(response.response);
            }
        });
    };
    var handlePushClick = function (event) {
        setProgressShow(true);
        push(siteId, remoteName, pushBranch, false).subscribe({
            next: function () {
                onPushSuccess();
            },
            error: function (_a) {
                var response = _a.response;
                onPushError(response.response);
            }
        });
    };
    var shouldShowButton = function (enabled) {
        var allowed = false;
        if (props.permittedRoles) {
            var allowedRoles = props.permittedRoles;
            var userRoles = roles[siteId];
            if (allowedRoles.role) {
                var aRoles = Object.values(allowedRoles.role);
                for (var i = 0; i < aRoles.length; i++) {
                    //@ts-ignore
                    if (userRoles.indexOf(aRoles[i]) != -1) {
                        allowed = true;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < allowedRoles.length; i++) {
                    //@ts-ignore
                    if (userRoles.indexOf(allowedRoles[i]) != -1) {
                        allowed = true;
                        break;
                    }
                }
            }
        }
        else {
            allowed = true;
        }
        return enabled && allowed;
    };
    function handleSnackClose(event, reason) {
        setProgressShow(false);
        setSnackShow(false);
    }
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [useIcon ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [shouldShowButton(enablePull) ? (jsxRuntimeExports.jsx(Tooltip, { title: pullLabel ? pullLabel : "Pull", children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handlePullClick, children: jsxRuntimeExports.jsx(DownloadIcon, {}) }) })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {})), shouldShowButton(enablePush) ? (jsxRuntimeExports.jsx(Tooltip, { title: pushLabel ? pushLabel : "Push", children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handlePushClick, children: jsxRuntimeExports.jsx(PublishIcon, {}) }) })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}))] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [shouldShowButton(enablePull) ? (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handlePullClick, children: pullLabel ? pullLabel : "Pull" })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {})), shouldShowButton(enablePush) ? (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handlePushClick, children: pushLabel ? pushLabel : "Push" })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}))] })), jsxRuntimeExports.jsxs(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow, children: [jsxRuntimeExports.jsx(CircularProgress, { color: "inherit" }), jsxRuntimeExports.jsx(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 5000, onClose: handleSnackClose, children: jsxRuntimeExports.jsx(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' }, children: snackMessage }) })] })] }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function usePermissionsBySite() {
  return useSelector((state) => state.user.permissionsBySite);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const completeDetailedItem = /*#__PURE__*/ createAction('COMPLETE_DETAILED_ITEM');
// endregion

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useDetailedItem(path) {
  const dispatch = useDispatch();
  const itemsByPath = useSelection((state) => state.content.itemsByPath);
  const item = lookupItemByPath(path, itemsByPath) ;
  const beingFetching = useSelection((state) => state.content.itemsBeingFetchedByPath[path]);
  useEffect(() => {
    if (nou(item) && path && beingFetching === undefined) {
      dispatch(completeDetailedItem({ path }));
    }
  }, [beingFetching, dispatch, item, path]);
  return item;
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const showErrorDialog = /*#__PURE__*/ createAction('SHOW_ERROR_DIALOG');
const closeErrorDialog = /*#__PURE__*/ createAction('CLOSE_ERROR_DIALOG');
const errorDialogClosed = /*#__PURE__*/ createAction('ERROR_DIALOG_CLOSED');
const initialState = {
  open: false,
  error: null
};
createReducer(initialState, (builder) => {
  builder
    .addCase(showErrorDialog, (state, { payload }) => ({
      onClose: closeErrorDialog(),
      onClosed: errorDialogClosed(),
      onDismiss: closeErrorDialog(),
      error: null,
      ...payload,
      open: true
    }))
    .addCase(closeErrorDialog, (state) => ({ ...state, open: false }))
    .addCase(errorDialogClosed, (state) => initialState);
});

// for 4.1.x since `@craftercms/studio-ui/PathSelector` is not a valid component
// @ts-ignore
var PathSelector = craftercms.components.SiteSearchPathSelector;
var FETCH_UNPUBLISHED_ITEMS_LIMIT = 100;
function BulkPublishView(props) {
    var _a, _b;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var theme = useTheme$1();
    var permissionsBySite = usePermissionsBySite();
    var hasPublishPermission = (_a = permissionsBySite[siteId]) === null || _a === void 0 ? void 0 : _a.includes('publish');
    var initialPublishItem = useDetailedItem('/site/website/index.xml');
    var _c = useState((_b = props.defaultPath) !== null && _b !== void 0 ? _b : BULK_PUBLISH_DEFAULTS.defaultPath), selectedPath = _c[0], setSelectedPath = _c[1];
    var _d = useState(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var _e = useState(null), hasInitialPublish$1 = _e[0], setHasInitialPublish = _e[1];
    useEffect(function () {
        hasInitialPublish(siteId).subscribe({
            next: function (response) {
                setHasInitialPublish(response);
            },
            error: function (error) {
                dispatch(showErrorDialog(error));
            }
        });
    }, [siteId]);
    var customEventId = 'dialogDismissConfirm';
    var onSubmitBulkPublish = function () {
        setIsSubmitting(true);
        var fetchItems = function (offset) { return fetchUnpublished(siteId, { limit: FETCH_UNPUBLISHED_ITEMS_LIMIT, offset: offset }); };
        var itemsByPath = [];
        of(0)
            .pipe(concatMap(function (offset) { return fetchItems(offset); }), expand(function (data) {
            itemsByPath.push.apply(itemsByPath, data.filter(function (item) { return item.path.startsWith(selectedPath); }));
            return data.total > data.limit + data.offset ? fetchItems(data.limit + data.offset) : of();
        }), toArray())
            .subscribe({
            complete: function () {
                if (itemsByPath.length === 0) {
                    dispatch(showSystemNotification({
                        message: 'No items to publish at provided path'
                    }));
                    setIsSubmitting(false);
                    return;
                }
                dispatch(showPublishDialog({
                    items: itemsByPath,
                    onSuccess: batchActions([
                        showPublishItemSuccessNotification(),
                        closePublishDialog(),
                        dispatchDOMEvent({ id: customEventId, type: 'publish' })
                    ]),
                    onClosed: dispatchDOMEvent({ id: customEventId, type: 'cancel' })
                }));
                setIsSubmitting(false);
            }
        });
    };
    var onInitialPublish = function () {
        dispatch(showPublishDialog({
            items: [initialPublishItem],
            onSuccess: batchActions([closePublishDialog(), dispatchDOMEvent({ id: customEventId, type: 'publish' })]),
            onClosed: dispatchDOMEvent({ id: customEventId, type: 'cancel' })
        }));
        createCustomDocumentEventListener(customEventId, function (_a) {
            var type = _a.type;
            type === 'publish' && setHasInitialPublish(true);
        });
    };
    var onPathSelected = function (value) {
        setSelectedPath(value.replace('/index.xml', ''));
    };
    if (hasInitialPublish$1 === null) {
        return jsxRuntimeExports.jsx(Paper, { elevation: 2, sx: { height: '100%' } });
    }
    return (jsxRuntimeExports.jsx(Paper, { elevation: 2, sx: { height: '100%' }, children: jsxRuntimeExports.jsx(Box$1, { sx: { p: 1 }, children: hasInitialPublish$1 ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(DialogBody, { sx: { minHeight: '24vh', minWidth: '48vh' }, children: [jsxRuntimeExports.jsx(Typography, { variant: "body1", sx: {
                                    paddingBottom: 2,
                                    float: 'left'
                                }, children: "Select a path to calculate publish packages." }), jsxRuntimeExports.jsx(Box$1, { sx: { paddingBottom: 1 }, children: jsxRuntimeExports.jsx(PathSelector, { value: selectedPath, disabled: false, onPathSelected: onPathSelected, stripXmlIndex: false }) })] }), jsxRuntimeExports.jsx(DialogFooter$1, { children: jsxRuntimeExports.jsx(Button$1, { sx: { float: 'right' }, variant: "contained", color: "primary", disabled: isSubmitting, onClick: onSubmitBulkPublish, children: "Bulk Publish" }) })] })) : (jsxRuntimeExports.jsxs(Box$1, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: theme.spacing(2),
                    padding: theme.spacing(5)
                }, children: [jsxRuntimeExports.jsx(InfoOutlinedIcon, { sx: {
                            color: theme.palette.text.secondary,
                            fontSize: '1.75rem'
                        } }), jsxRuntimeExports.jsx(Typography, { variant: "body1", sx: {
                            maxWidth: '470px',
                            textAlign: 'center'
                        }, children: jsxRuntimeExports.jsx(FormattedMessage, { id: "publishOnDemand.noInitialPublish", defaultMessage: "The project needs to undergo its initial publish before other publishing options become available" }) }), hasPublishPermission && (jsxRuntimeExports.jsx(MyLoadingButton, { loading: false, variant: "contained", color: "primary", onClick: onInitialPublish, children: jsxRuntimeExports.jsx(FormattedMessage, { id: "publishOnDemand.publishEntireProject", defaultMessage: "Publish Entire Project" }) }))] })) }) }));
}

function OpenBulkPublishPanelButton(props) {
    var _a = props.title, title = _a === void 0 ? BULK_PUBLISH_DEFAULTS.title : _a, _b = props.icon, icon = _b === void 0 ? BULK_PUBLISH_DEFAULTS.icon : _b, _c = props.dialogTitle, dialogTitle = _c === void 0 ? title : _c;
    var handleClick = useOpenBulkPublish(__assign(__assign({}, props), { title: dialogTitle }));
    return jsxRuntimeExports.jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick });
}

function OpenBulkPublishToolbarButton(props) {
    var _a;
    var _b = props.title, title = _b === void 0 ? BULK_PUBLISH_DEFAULTS.title : _b, _c = props.tooltip, tooltip = _c === void 0 ? title : _c, _d = props.useIcon, useIcon = _d === void 0 ? true : _d, _e = props.useIconWithText, useIconWithText = _e === void 0 ? false : _e, _f = props.buttonSize, buttonSize = _f === void 0 ? 'small' : _f, _g = props.dialogTitle, dialogTitle = _g === void 0 ? title : _g, _h = props.icon, icon = _h === void 0 ? BULK_PUBLISH_DEFAULTS.icon : _h;
    // Protection against confusion of using the two props combined (i.e. useIcon, useIconWithText)...
    if (useIconWithText) {
        useIcon = false;
    }
    var handleClick = useOpenBulkPublish(__assign(__assign({}, props), { title: dialogTitle }));
    var applyTooltip = function (children) {
        return useIcon || props.tooltip ? jsxRuntimeExports.jsx(Tooltip$1, { title: tooltip, children: children }) : children;
    };
    return applyTooltip(useIcon ? (jsxRuntimeExports.jsx(IconButton, { size: buttonSize, onClick: handleClick, children: jsxRuntimeExports.jsx(SystemIcon, { icon: icon }) })) : (jsxRuntimeExports.jsx(Button$1, { size: buttonSize, onClick: handleClick, startIcon: useIconWithText ? jsxRuntimeExports.jsx(SystemIcon, { icon: icon }) : void 0, sx: (_a = {}, _a[".".concat(buttonClasses.startIcon)] = { mr: 0.5 }, _a), children: title })));
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(function (err) {
        console.error('Failed to copy text: ', err);
    });
}
function CopyCurrentPageUrl(props) {
    var item = props.item, useIcon = props.useIcon, environments = props.environments;
    var _a = React.useState(null), optionMenuAnchorEl = _a[0], setOptionMenuAnchorEl = _a[1];
    var iconId = '@mui/icons-material/FileCopyOutlined';
    var siteId = useActiveSiteId();
    var dispatch = useDispatch();
    var options = (environments === null || environments === void 0 ? void 0 : environments.label) && (environments === null || environments === void 0 ? void 0 : environments.pattern)
        ? Object.keys(environments.label).map(function (key) { return ({
            label: environments.label[key],
            pattern: environments.pattern[key]
        }); })
        : [];
    var handleClick = function (event) {
        copyToClipboard(item.previewUrl);
        dispatch(showSystemNotification({
            message: 'URL copied to clipboard'
        }));
    };
    var handleOptionMenuClick = function (event) {
        setOptionMenuAnchorEl(optionMenuAnchorEl ? null : event.currentTarget);
    };
    var handleOptionSelect = function (label, pattern) {
        var url = pattern.replace('[URL]', item.previewUrl).replace('[SITEID]', siteId);
        copyToClipboard(url);
        dispatch(showSystemNotification({
            message: 'URL copied to clipboard'
        }));
        setTimeout(function () {
            setOptionMenuAnchorEl(null);
        }, 50);
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [useIcon ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Tooltip, { title: "Copy Page URL", children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handleClick, children: jsxRuntimeExports.jsx(SystemIcon, { icon: { id: iconId } }) }) }), options && options.length > 0 && (jsxRuntimeExports.jsx(Button, { id: "urls-select-button", variant: "text", color: "inherit", onClick: handleOptionMenuClick, "aria-controls": optionMenuAnchorEl ? 'urls-select-menu' : undefined, "aria-haspopup": "true", "aria-expanded": Boolean(optionMenuAnchorEl), sx: {
                            typography: 'subtitle1',
                            textTransform: 'none',
                            borderRadius: 1,
                            minWidth: 0
                        }, endIcon: jsxRuntimeExports.jsx(ExpandMoreRounded, {}), children: "Copy URLs" }))] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handleClick, children: "Copy Page URL" }), options && options.length > 0 && (jsxRuntimeExports.jsx(Tooltip, { title: "Copy more URLs", children: jsxRuntimeExports.jsx(IconButton, { id: "urls-select-button", color: "inherit", size: "small", "aria-controls": optionMenuAnchorEl ? 'urls-select-menu' : undefined, "aria-haspopup": "true", onClick: handleOptionMenuClick, children: jsxRuntimeExports.jsx(ExpandMoreRounded, {}) }) }))] })), options && options.length > 0 && (jsxRuntimeExports.jsx(Menu, { id: "urls-select-menu", anchorEl: optionMenuAnchorEl, open: Boolean(optionMenuAnchorEl), onClose: function () { return setOptionMenuAnchorEl(null); }, MenuListProps: {
                    'aria-labelledby': 'urls-select-button'
                }, slotProps: {
                    paper: {
                        style: { minWidth: 132 }
                    }
                }, children: options.map(function (option) { return (jsxRuntimeExports.jsx(MenuItem, { onClick: function () { return handleOptionSelect(option.label, option.pattern); }, children: option.label }, option.label)); }) }))] }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSite() {
  const id = useActiveSiteId();
  return useSelector((state) => state.sites.byId[id]);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const pathNavigatorFetchPath = /*#__PURE__*/ createAction('PATH_NAV_FETCH_PATH');

// shim
function isFolder(item) {
    return (item === null || item === void 0 ? void 0 : item.systemType) === 'folder';
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const contentTypeDropTargetsResponse = /*#__PURE__*/ createAction('CONTENT_TYPE_DROP_TARGETS_RESPONSE');
const CHANGE_CURRENT_URL = 'CHANGE_CURRENT_URL';
const changeCurrentUrl = /*#__PURE__*/ createAction(CHANGE_CURRENT_URL);
/*#__PURE__*/ createAction(contentTypeDropTargetsResponse.type);

var ComponentPreviewPathNavigator = function (props) {
    var _a, _b;
    var dispatch = useDispatch();
    var siteId = useActiveSite().id;
    var pathNavigatorId = 'componentPreviewPathNavigator';
    var doesPathMatchRegex = function (inputPath) {
        var regexList = props.nonPreviewablePaths.split(',');
        for (var i = 0; i < regexList.length; i++) {
            var regex = new RegExp("^".concat(regexList[i], "$"));
            if (regex.test(inputPath)) {
                return true;
            }
        }
        return false;
    };
    var onItemClicked = function (item, e) {
        if (isFolder(item)) {
            onPathSelected(item);
        }
        else {
            // show edit form
            // const foundExactMatch = props.nonPreviewablePaths.includes(item.path);
            // const itemFolderPath = item.path.substring(0, item.path.lastIndexOf('/'));
            // const foundFolderMatch = props.nonPreviewablePaths.includes(itemFolderPath);
            var isLevelDescriptor_1 = item.path
                .substring(item.path.length, item.path.lastIndexOf('/'))
                .includes('crafter-level-descriptor.level.xml');
            var isNotPreviewable = doesPathMatchRegex(item.path);
            if (isNotPreviewable) {
                showEditForm(item);
                return;
            }
            var path_1;
            if (props.paths.item[0]) {
                var paths = Object.values(props.paths.item);
                paths.map(function (p) {
                    var path_without_extension = item.path.substring(0, item.path.lastIndexOf('/'));
                    if (isLevelDescriptor_1 && path_without_extension.includes(p.source) && p.isLevelDescriptor) {
                        path_1 = p;
                        return;
                    }
                    if (path_without_extension.includes(p.source) && !p.isLevelDescriptor) {
                        path_1 = p;
                        return;
                    }
                });
            }
            else {
                path_1 = props.paths.item;
            }
            // construct preview path
            var previewPath = item.path
                .substring(0, item.path.length - 4) // remove .xml extension
                .replace(path_1.source, path_1.target);
            // Send path to preview in xb
            dispatch(changeCurrentUrl(previewPath));
        }
    };
    var onPathSelected = function (item) {
        dispatch(pathNavigatorFetchPath({
            id: pathNavigatorId,
            path: item.path
        }));
    };
    var validConfigurationExists = function () {
        return props.icon && props.label && props.rootPath && props.limit;
    };
    var showEditForm = function (item) {
        var authoringBase = '/studio';
        dispatch(showEditDialog({
            path: item.path,
            authoringBase: authoringBase,
            site: siteId,
            readonly: true
        }));
    };
    return (jsxRuntimeExports.jsx("div", { children: validConfigurationExists() ? (jsxRuntimeExports.jsx(PathNavigator, { id: pathNavigatorId, label: props.label, rootPath: props.rootPath, onItemClicked: onItemClicked, icon: { id: props.icon }, limit: props.limit, excludes: (_b = (_a = props.excludedPaths) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [] })) : (jsxRuntimeExports.jsxs(Alert, { severity: "warning", children: [jsxRuntimeExports.jsx(AlertTitle, { children: "Component Preview Path Navigator plugin configuration not found" }), "Please edit the ui.xml file and configure the widget as described in the README.md."] })) }));
};

var MODULE = 'studio';
function contentTypeConfigPaths(contentTypeId) {
    var id = contentTypeId.startsWith('/') ? contentTypeId : "/".concat(contentTypeId);
    var base = "/content-types".concat(id).replace(/\/{2,}/g, '/');
    return {
        configPath: "".concat(base, "/config.xml"),
        formPath: "".concat(base, "/form-definition.xml")
    };
}
function normalizeContentTypeId(value) {
    var trimmed = (value !== null && value !== void 0 ? value : '').trim();
    if (!trimmed) {
        return '';
    }
    return trimmed.startsWith('/') ? trimmed : "/".concat(trimmed);
}
function suggestCopyId(baseId, takenIds) {
    var normalizedBase = normalizeContentTypeId(baseId);
    var suffix = '-copy';
    var candidate = "".concat(normalizedBase).concat(suffix);
    var counter = 2;
    while (takenIds.has(candidate)) {
        candidate = "".concat(normalizedBase).concat(suffix, "-").concat(counter);
        counter += 1;
    }
    return candidate;
}
function assertValidXml(doc, xmlType) {
    if (doc.querySelector('parsererror')) {
        throw new Error("Unable to parse ".concat(xmlType, " XML while preparing copied content type."));
    }
}
function transformConfigXml(xml, targetId, targetLabel) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, 'application/xml');
    assertValidXml(doc, 'config');
    var root = doc.querySelector('content-type');
    if (root) {
        root.setAttribute('name', targetId);
    }
    var labelNode = doc.querySelector('content-type > label');
    if (labelNode) {
        labelNode.textContent = targetLabel;
    }
    return new XMLSerializer().serializeToString(doc);
}
function transformFormDefinitionXml(xml, targetId, targetLabel) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, 'application/xml');
    assertValidXml(doc, 'form-definition');
    var contentTypeNode = doc.querySelector('form > content-type');
    if (contentTypeNode) {
        contentTypeNode.textContent = targetId;
    }
    var titleNode = doc.querySelector('form > title');
    if (titleNode) {
        titleNode.textContent = targetLabel;
    }
    return new XMLSerializer().serializeToString(doc);
}
function CrossSiteContentTypeCopy() {
    var dispatch = useDispatch();
    var activeSiteId = useActiveSiteId();
    var _a = useState(0), activeStep = _a[0], setActiveStep = _a[1];
    var _b = useState([]), sites = _b[0], setSites = _b[1];
    var _c = useState(true), sitesLoading = _c[0], setSitesLoading = _c[1];
    var _d = useState(null), sourceSite = _d[0], setSourceSite = _d[1];
    var _e = useState(null), destSite = _e[0], setDestSite = _e[1];
    var _f = useState(false), typesLoading = _f[0], setTypesLoading = _f[1];
    var _g = useState([]), contentTypes = _g[0], setContentTypes = _g[1];
    var _h = useState(''), typeFilter = _h[0], setTypeFilter = _h[1];
    var _j = useState({}), selectedIds = _j[0], setSelectedIds = _j[1];
    var _k = useState(new Set()), destinationTypeIds = _k[0], setDestinationTypeIds = _k[1];
    var _l = useState(false), destinationTypesLoading = _l[0], setDestinationTypesLoading = _l[1];
    var _m = useState({}), renameOverrides = _m[0], setRenameOverrides = _m[1];
    var _o = useState(false), copying = _o[0], setCopying = _o[1];
    useEffect(function () {
        var sub = fetchAll({ limit: 500, offset: 0 }).subscribe({
            next: function (sitesResponse) {
                var list = (Array.isArray(sitesResponse) ? sitesResponse : []).filter(Boolean);
                setSites(list);
                setSitesLoading(false);
            },
            error: function (error) {
                setSitesLoading(false);
                dispatch(showErrorDialog(error));
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [dispatch]);
    useEffect(function () {
        setSelectedIds({});
    }, [sourceSite === null || sourceSite === void 0 ? void 0 : sourceSite.id]);
    useEffect(function () {
        if (!sourceSite) {
            setContentTypes([]);
            return;
        }
        setTypesLoading(true);
        var sub = fetchContentTypes(sourceSite.id).subscribe({
            next: function (types) {
                var rows = (types !== null && types !== void 0 ? types : [])
                    .map(function (t) {
                    var _a, _b, _c;
                    return ({
                        id: ((_a = t.id) !== null && _a !== void 0 ? _a : '').trim(),
                        name: ((_c = (_b = t.name) !== null && _b !== void 0 ? _b : t.id) !== null && _c !== void 0 ? _c : '').trim()
                    });
                })
                    .filter(function (t) { return t.id.length > 0; })
                    .sort(function (a, b) { return a.id.localeCompare(b.id); });
                setContentTypes(rows);
                setTypesLoading(false);
            },
            error: function (error) {
                setTypesLoading(false);
                dispatch(showErrorDialog(error));
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [dispatch, sourceSite]);
    useEffect(function () {
        if (!destSite) {
            setDestinationTypeIds(new Set());
            return;
        }
        setDestinationTypesLoading(true);
        var sub = fetchContentTypes(destSite.id).subscribe({
            next: function (types) {
                var ids = new Set((types !== null && types !== void 0 ? types : []).map(function (t) { var _a; return normalizeContentTypeId((_a = t.id) !== null && _a !== void 0 ? _a : ''); }).filter(Boolean));
                setDestinationTypeIds(ids);
                setDestinationTypesLoading(false);
            },
            error: function (error) {
                setDestinationTypesLoading(false);
                dispatch(showErrorDialog(error));
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [dispatch, destSite]);
    useEffect(function () {
        if (activeSiteId && sites.length && !sourceSite) {
            var current = sites.find(function (s) { return s.id === activeSiteId; });
            if (current) {
                setSourceSite(current);
            }
        }
    }, [activeSiteId, sites, sourceSite]);
    var filteredTypes = useMemo(function () {
        var q = typeFilter.trim().toLowerCase();
        if (!q) {
            return contentTypes;
        }
        return contentTypes.filter(function (t) { return t.id.toLowerCase().includes(q) || t.name.toLowerCase().includes(q); });
    }, [contentTypes, typeFilter]);
    var selectedList = useMemo(function () { return contentTypes.filter(function (t) { return selectedIds[t.id]; }).map(function (t) { return t.id; }); }, [contentTypes, selectedIds]);
    var selectedRows = useMemo(function () { return contentTypes.filter(function (t) { return selectedIds[t.id]; }); }, [contentTypes, selectedIds]);
    var selectedLookup = useMemo(function () { return selectedRows.reduce(function (acc, row) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[row.id] = row, _a)));
    }, {}); }, [selectedRows]);
    var conflictingIds = useMemo(function () { return selectedList.filter(function (id) { return destinationTypeIds.has(normalizeContentTypeId(id)); }); }, [selectedList, destinationTypeIds]);
    useEffect(function () {
        if (!conflictingIds.length) {
            setRenameOverrides({});
            return;
        }
        setRenameOverrides(function (prev) {
            var next = {};
            var takenIds = new Set(destinationTypeIds);
            selectedList.forEach(function (id) {
                var _a, _b;
                var normalizedId = normalizeContentTypeId(id);
                if (!destinationTypeIds.has(normalizedId)) {
                    return;
                }
                var existing = prev[id];
                var defaultLabel = "".concat(((_a = selectedLookup[id]) === null || _a === void 0 ? void 0 : _a.name) || id, " Copy");
                var newId = (existing === null || existing === void 0 ? void 0 : existing.newId) ? normalizeContentTypeId(existing.newId) : suggestCopyId(normalizedId, takenIds);
                next[id] = {
                    newId: newId,
                    newLabel: (_b = existing === null || existing === void 0 ? void 0 : existing.newLabel) !== null && _b !== void 0 ? _b : defaultLabel
                };
                takenIds.add(newId);
            });
            return next;
        });
    }, [conflictingIds.length, destinationTypeIds, selectedList, selectedLookup]);
    var toggleType = useCallback(function (id) {
        setSelectedIds(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[id] = !prev[id], _a)));
        });
    }, []);
    var toggleAllFiltered = useCallback(function () {
        var allOn = filteredTypes.every(function (t) { return selectedIds[t.id]; });
        setSelectedIds(function (prev) {
            var next = __assign({}, prev);
            filteredTypes.forEach(function (t) {
                next[t.id] = !allOn;
            });
            return next;
        });
    }, [filteredTypes, selectedIds]);
    var canNextFromSource = Boolean(sourceSite);
    var canNextFromTypes = selectedList.length > 0;
    var conflictValidationErrors = useMemo(function () {
        var errors = [];
        if (!destSite) {
            return errors;
        }
        var reserved = new Set(destinationTypeIds);
        conflictingIds.forEach(function (id) {
            var _a, _b;
            var override = renameOverrides[id];
            var newId = normalizeContentTypeId((_a = override === null || override === void 0 ? void 0 : override.newId) !== null && _a !== void 0 ? _a : '');
            var newLabel = ((_b = override === null || override === void 0 ? void 0 : override.newLabel) !== null && _b !== void 0 ? _b : '').trim();
            if (!newId) {
                errors.push("Provide a new ID for ".concat(id, "."));
                return;
            }
            if (newId === normalizeContentTypeId(id)) {
                errors.push("New ID for ".concat(id, " must be different from existing ID."));
            }
            if (reserved.has(newId)) {
                errors.push("ID ".concat(newId, " already exists in destination project."));
            }
            if (!newLabel) {
                errors.push("Provide a new label for ".concat(id, "."));
            }
            reserved.add(newId);
        });
        return errors;
    }, [conflictingIds, destinationTypeIds, renameOverrides, destSite]);
    var canNextFromDest = Boolean(destSite);
    var canCopy = canNextFromDest && selectedList.length > 0 && conflictValidationErrors.length === 0;
    var handleNext = function () {
        if (activeStep === 0 && !canNextFromSource) {
            return;
        }
        if (activeStep === 1 && !canNextFromTypes) {
            return;
        }
        if (activeStep === 2 && !canNextFromDest) {
            return;
        }
        setActiveStep(function (s) { return Math.min(s + 1, 3); });
    };
    var handleBack = function () { return setActiveStep(function (s) { return Math.max(s - 1, 0); }); };
    var runCopy = function () {
        if (!sourceSite || !destSite || selectedList.length === 0) {
            return;
        }
        setCopying(true);
        from(selectedList)
            .pipe(concatMap$1(function (sourceTypeId) {
            var _a, _b, _c, _d;
            var sourceRow = selectedLookup[sourceTypeId];
            var isConflict = conflictingIds.includes(sourceTypeId);
            var targetTypeId = isConflict
                ? normalizeContentTypeId((_b = (_a = renameOverrides[sourceTypeId]) === null || _a === void 0 ? void 0 : _a.newId) !== null && _b !== void 0 ? _b : '')
                : normalizeContentTypeId(sourceTypeId);
            var targetLabel = isConflict
                ? ((_d = (_c = renameOverrides[sourceTypeId]) === null || _c === void 0 ? void 0 : _c.newLabel) !== null && _d !== void 0 ? _d : '').trim()
                : (sourceRow === null || sourceRow === void 0 ? void 0 : sourceRow.name) || sourceTypeId;
            var sourcePaths = contentTypeConfigPaths(sourceTypeId);
            var targetPaths = contentTypeConfigPaths(targetTypeId);
            return forkJoin({
                config: fetchConfigurationXML(sourceSite.id, sourcePaths.configPath, MODULE).pipe(catchError(function (err) {
                    dispatch(showErrorDialog(err));
                    throw err;
                })),
                form: fetchConfigurationXML(sourceSite.id, sourcePaths.formPath, MODULE).pipe(catchError(function (err) {
                    dispatch(showErrorDialog(err));
                    throw err;
                }))
            }).pipe(switchMap(function (_a) {
                var config = _a.config, form = _a.form;
                var configContent = isConflict ? transformConfigXml(config, targetTypeId, targetLabel) : config;
                var formContent = isConflict ? transformFormDefinitionXml(form, targetTypeId, targetLabel) : form;
                return forkJoin([
                    writeConfiguration(destSite.id, targetPaths.configPath, MODULE, configContent),
                    writeConfiguration(destSite.id, targetPaths.formPath, MODULE, formContent)
                ]);
            }));
        }))
            .subscribe({
            complete: function () {
                setCopying(false);
                dispatch(showSystemNotification({
                    message: "Copied ".concat(selectedList.length, " content type(s) from \"").concat(sourceSite.id, "\" to \"").concat(destSite.id, "\".")
                }));
                setActiveStep(0);
                setSelectedIds({});
                setDestSite(null);
            },
            error: function () {
                setCopying(false);
            }
        });
    };
    var destOptions = useMemo(function () { return sites; }, [sites]);
    return (jsxRuntimeExports.jsxs(Paper, { elevation: 2, sx: { height: '100%', display: 'flex', flexDirection: 'column' }, children: [jsxRuntimeExports.jsxs(Box$1, { sx: { p: 2, flex: 1, overflow: 'auto' }, children: [jsxRuntimeExports.jsx(Typography, { variant: "h6", gutterBottom: true, children: "Copy content types across projects" }), jsxRuntimeExports.jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: ["Copies ", jsxRuntimeExports.jsx("code", { children: "config.xml" }), " and ", jsxRuntimeExports.jsx("code", { children: "form-definition.xml" }), " for each selected type from a source project to a destination project. If a selected ID already exists in destination, you must provide a new ID and label (supports same-project duplication). Preview images and other files in the type folder are not copied."] }), jsxRuntimeExports.jsxs(Stepper, { activeStep: activeStep, sx: { mb: 2 }, children: [jsxRuntimeExports.jsx(Step, { children: jsxRuntimeExports.jsx(StepLabel, { children: "Source project" }) }), jsxRuntimeExports.jsx(Step, { children: jsxRuntimeExports.jsx(StepLabel, { children: "Content types" }) }), jsxRuntimeExports.jsx(Step, { children: jsxRuntimeExports.jsx(StepLabel, { children: "Destination" }) }), jsxRuntimeExports.jsx(Step, { children: jsxRuntimeExports.jsx(StepLabel, { children: "Confirm" }) })] }), activeStep === 0 && (jsxRuntimeExports.jsx(DialogBody, { children: sitesLoading ? (jsxRuntimeExports.jsx(Box$1, { sx: { display: 'flex', justifyContent: 'center', py: 4 }, children: jsxRuntimeExports.jsx(CircularProgress, { size: 32 }) })) : (jsxRuntimeExports.jsx(Autocomplete, { options: sites, getOptionLabel: function (o) { return "".concat(o.name, " (").concat(o.id, ")"); }, value: sourceSite, onChange: function (_, v) { return setSourceSite(v); }, renderInput: function (params) { return jsxRuntimeExports.jsx(TextField$1, __assign({}, params, { label: "Source project", required: true })); } })) })), activeStep === 1 && (jsxRuntimeExports.jsx(DialogBody, { sx: { minHeight: '40vh' }, children: typesLoading ? (jsxRuntimeExports.jsx(Box$1, { sx: { display: 'flex', justifyContent: 'center', py: 4 }, children: jsxRuntimeExports.jsx(CircularProgress, { size: 32 }) })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(TextField$1, { fullWidth: true, size: "small", label: "Filter types", value: typeFilter, onChange: function (e) { return setTypeFilter(e.target.value); }, sx: { mb: 1 } }), jsxRuntimeExports.jsx(FormControlLabel, { control: jsxRuntimeExports.jsx(Checkbox, { checked: filteredTypes.length > 0 && filteredTypes.every(function (t) { return selectedIds[t.id]; }), indeterminate: filteredTypes.some(function (t) { return selectedIds[t.id]; }) &&
                                            !filteredTypes.every(function (t) { return selectedIds[t.id]; }), onChange: toggleAllFiltered }), label: "Select all (filtered)" }), jsxRuntimeExports.jsx(List, { dense: true, sx: { maxHeight: 360, overflow: 'auto', border: 1, borderColor: 'divider' }, children: filteredTypes.map(function (t) { return (jsxRuntimeExports.jsx(ListItem, { disablePadding: true, children: jsxRuntimeExports.jsx(FormControlLabel, { sx: { px: 1, width: '100%', m: 0 }, control: jsxRuntimeExports.jsx(Checkbox, { checked: Boolean(selectedIds[t.id]), onChange: function () { return toggleType(t.id); } }), label: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Typography, { component: "span", variant: "body2", sx: { fontFamily: 'monospace' }, children: t.id }), t.name && t.name !== t.id ? (jsxRuntimeExports.jsxs(Typography, { component: "span", variant: "body2", color: "text.secondary", sx: { ml: 1 }, children: ["\u2014 ", t.name] })) : null] }) }) }, t.id)); }) })] })) })), activeStep === 2 && (jsxRuntimeExports.jsx(DialogBody, { children: jsxRuntimeExports.jsx(Autocomplete, { options: destOptions, getOptionLabel: function (o) { return "".concat(o.name, " (").concat(o.id, ")"); }, value: destSite, onChange: function (_, v) { return setDestSite(v); }, renderInput: function (params) { return (jsxRuntimeExports.jsx(TextField$1, __assign({}, params, { label: "Destination project", required: true, helperText: destinationTypesLoading ? 'Loading destination content types...' : ' ' }))); } }) })), activeStep === 3 && (jsxRuntimeExports.jsxs(DialogBody, { children: [jsxRuntimeExports.jsx(Typography, { variant: "body1", gutterBottom: true, children: "Please confirm:" }), jsxRuntimeExports.jsxs(Typography, { variant: "body2", component: "div", children: [jsxRuntimeExports.jsx("strong", { children: "From:" }), " ", sourceSite === null || sourceSite === void 0 ? void 0 : sourceSite.name, " (", sourceSite === null || sourceSite === void 0 ? void 0 : sourceSite.id, ")"] }), jsxRuntimeExports.jsxs(Typography, { variant: "body2", component: "div", sx: { mt: 1 }, children: [jsxRuntimeExports.jsx("strong", { children: "To:" }), " ", destSite === null || destSite === void 0 ? void 0 : destSite.name, " (", destSite === null || destSite === void 0 ? void 0 : destSite.id, ")"] }), jsxRuntimeExports.jsx(Typography, { variant: "body2", sx: { mt: 2 }, children: jsxRuntimeExports.jsxs("strong", { children: ["Types (", selectedList.length, "):"] }) }), jsxRuntimeExports.jsx(Box$1, { component: "ul", sx: { mt: 0, pl: 2, maxHeight: 240, overflow: 'auto' }, children: selectedList.map(function (id) { return (jsxRuntimeExports.jsx("li", { children: jsxRuntimeExports.jsx(Typography, { variant: "body2", component: "code", children: id }) }, id)); }) }), conflictingIds.length > 0 && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Alert, { severity: "warning", sx: { mt: 2 }, children: ["Destination already has ", conflictingIds.length, " selected content type ID(s). Provide a new label and new ID for each conflict."] }), jsxRuntimeExports.jsx(Box$1, { sx: { mt: 2, display: 'grid', gap: 2 }, children: conflictingIds.map(function (id) {
                                            var _a, _b, _c, _d;
                                            return (jsxRuntimeExports.jsxs(Box$1, { sx: { border: 1, borderColor: 'divider', p: 1.5, borderRadius: 1 }, children: [jsxRuntimeExports.jsxs(Typography, { variant: "body2", sx: { mb: 1 }, children: ["Existing ID: ", jsxRuntimeExports.jsx("code", { children: id })] }), jsxRuntimeExports.jsx(TextField$1, { fullWidth: true, label: "New content type ID", value: (_b = (_a = renameOverrides[id]) === null || _a === void 0 ? void 0 : _a.newId) !== null && _b !== void 0 ? _b : '', onChange: function (e) {
                                                            return setRenameOverrides(function (prev) {
                                                                var _a;
                                                                var _b;
                                                                return (__assign(__assign({}, prev), (_a = {}, _a[id] = __assign(__assign({}, ((_b = prev[id]) !== null && _b !== void 0 ? _b : { newLabel: '', newId: '' })), { newId: e.target.value }), _a)));
                                                            });
                                                        }, sx: { mb: 1 } }), jsxRuntimeExports.jsx(TextField$1, { fullWidth: true, label: "New label", value: (_d = (_c = renameOverrides[id]) === null || _c === void 0 ? void 0 : _c.newLabel) !== null && _d !== void 0 ? _d : '', onChange: function (e) {
                                                            return setRenameOverrides(function (prev) {
                                                                var _a;
                                                                var _b;
                                                                return (__assign(__assign({}, prev), (_a = {}, _a[id] = __assign(__assign({}, ((_b = prev[id]) !== null && _b !== void 0 ? _b : { newLabel: '', newId: '' })), { newLabel: e.target.value }), _a)));
                                                            });
                                                        } })] }, id));
                                        }) })] })), conflictValidationErrors.length > 0 && (jsxRuntimeExports.jsx(Alert, { severity: "error", sx: { mt: 2 }, children: conflictValidationErrors[0] }))] }))] }), jsxRuntimeExports.jsxs(DialogFooter$1, { sx: { borderTop: 1, borderColor: 'divider' }, children: [jsxRuntimeExports.jsx(Button$1, { onClick: handleBack, disabled: activeStep === 0 || copying, children: "Back" }), activeStep < 3 ? (jsxRuntimeExports.jsx(Button$1, { variant: "contained", onClick: handleNext, disabled: copying ||
                            (activeStep === 0 && !canNextFromSource) ||
                            (activeStep === 1 && !canNextFromTypes) ||
                            (activeStep === 2 && !canNextFromDest), children: "Next" })) : (jsxRuntimeExports.jsx(Button$1, { variant: "contained", color: "primary", onClick: runCopy, disabled: !canCopy || copying, children: copying ? jsxRuntimeExports.jsx(CircularProgress, { size: 22, color: "inherit" }) : 'Copy' }))] })] }));
}

function objectValuesIfNumericKeys$1(obj) {
    var keys = Object.keys(obj);
    if (!keys.length || !keys.every(function (k) { return /^\d+$/.test(k); })) {
        return [];
    }
    return keys.sort(function (a, b) { return Number(a) - Number(b); }).map(function (k) { return obj[k]; });
}
/**
 * Toolbar transforms turn <values><value/></values> into arrays or { value: [...] } or { value: {0:{},1:{}} }.
 * Dropdown expects field.values as an array of { label, value }.
 */
function coerceAudienceFieldValues(raw) {
    if (raw == null) {
        return undefined;
    }
    if (Array.isArray(raw)) {
        return raw.filter(Boolean);
    }
    if (typeof raw !== 'object') {
        return undefined;
    }
    var o = raw;
    var inner = o.value;
    if (Array.isArray(inner)) {
        return inner.filter(Boolean);
    }
    if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
        var numeric = objectValuesIfNumericKeys$1(inner);
        if (numeric.length) {
            return numeric.filter(Boolean);
        }
        return [inner];
    }
    return undefined;
}
function scalarish(v) {
    if (v == null) {
        return undefined;
    }
    if (typeof v === 'string' || typeof v === 'number') {
        return String(v);
    }
    if (Array.isArray(v)) {
        return scalarish(v[0]);
    }
    if (typeof v === 'object' && '#text' in v) {
        return scalarish(v['#text']);
    }
    return undefined;
}
function normalizeDropdownValueRow(row) {
    var _a;
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
        return null;
    }
    var r = row;
    var value = (_a = scalarish(r.value)) !== null && _a !== void 0 ? _a : '';
    var label = scalarish(r.label);
    if (!label && r.label && typeof r.label === 'object') {
        var dm = r.label.defaultMessage;
        label = typeof dm === 'string' ? dm : undefined;
    }
    return { label: label !== null && label !== void 0 ? label : value, value: value };
}
function normalizeOneField(key, field) {
    var _a, _b, _c, _d, _e, _f;
    var id = (_a = scalarish(field.id)) !== null && _a !== void 0 ? _a : key;
    var name = (_b = scalarish(field.name)) !== null && _b !== void 0 ? _b : id;
    var rawValues = coerceAudienceFieldValues(field.values);
    var coercedValues = rawValues === null || rawValues === void 0 ? void 0 : rawValues.map(function (row) { return normalizeDropdownValueRow(row); }).filter(function (row) { return row != null && row.value.length > 0; });
    return __assign(__assign(__assign({}, field), { id: id, name: name, type: (_c = scalarish(field.type)) !== null && _c !== void 0 ? _c : 'input', description: field.description != null ? (_d = scalarish(field.description)) !== null && _d !== void 0 ? _d : '' : undefined, helpText: field.helpText != null ? (_e = scalarish(field.helpText)) !== null && _e !== void 0 ? _e : '' : undefined, defaultValue: field.defaultValue, validations: (_f = field.validations) !== null && _f !== void 0 ? _f : {} }), (coercedValues && coercedValues.length ? { values: coercedValues } : {}));
}
/**
 * Toolbar ui.xml deserialization does not apply ICE-panel `lookupTables: ['fields']`.
 * Normalize `<fields>` content into a lookup table for PreviewAudiencesPanel.
 */
function normalizeAudienceFields(raw) {
    if (raw == null) {
        return undefined;
    }
    if (Array.isArray(raw)) {
        return createLookupTable(raw, 'id');
    }
    if (typeof raw !== 'object') {
        return undefined;
    }
    var o = raw;
    var out = {};
    Object.keys(o).forEach(function (key) {
        var _a;
        var field = o[key];
        if (!field || typeof field !== 'object' || Array.isArray(field)) {
            return;
        }
        var id = (_a = scalarish(field.id)) !== null && _a !== void 0 ? _a : key;
        out[id] = normalizeOneField(key, field);
    });
    return Object.keys(out).length ? out : undefined;
}
function buildAudienceFields(raw) {
    return normalizeAudienceFields(raw);
}

var defaultIcon$1 = { id: '@mui/icons-material/EmojiPeopleRounded' };
function rawFieldsFromProps(props, configuration) {
    var _a;
    if (configuration.fields != null) {
        return configuration.fields;
    }
    if (props.fields != null) {
        return props.fields;
    }
    var widget = props.widget;
    return (_a = widget === null || widget === void 0 ? void 0 : widget.configuration) === null || _a === void 0 ? void 0 : _a.fields;
}
function AudienceTargetingFlyoutToolbarButton(props) {
    var _a, _b, _c, _d;
    var configuration = (_a = props.configuration) !== null && _a !== void 0 ? _a : {};
    var title = (_b = configuration.title) !== null && _b !== void 0 ? _b : 'Audience targeting';
    var tooltip = (_c = configuration.tooltip) !== null && _c !== void 0 ? _c : title;
    var icon = (_d = configuration.icon) !== null && _d !== void 0 ? _d : defaultIcon$1;
    var fields = buildAudienceFields(rawFieldsFromProps(props, configuration));
    var _e = React.useState(null), anchorEl = _e[0], setAnchorEl = _e[1];
    var open = Boolean(anchorEl);
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Tooltip$1, { title: tooltip, children: jsxRuntimeExports.jsx(IconButton, { size: "small", "aria-label": title, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: function (e) { return setAnchorEl(anchorEl ? null : e.currentTarget); }, children: jsxRuntimeExports.jsx(SystemIcon, { icon: icon }) }) }), jsxRuntimeExports.jsx(Popover, { open: open, anchorEl: anchorEl, onClose: function () { return setAnchorEl(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, slotProps: {
                    paper: {
                        elevation: 8,
                        sx: { mt: 0.5, maxWidth: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(480px, calc(100vh - 120px))' }
                    }
                }, children: jsxRuntimeExports.jsx(Paper$1, { variant: "outlined", sx: { overflow: 'auto' }, children: jsxRuntimeExports.jsx(Box, { sx: { minWidth: 320, minHeight: 280, p: 1 }, children: fields ? (jsxRuntimeExports.jsx(PreviewAudiencesPanel, { fields: fields })) : (jsxRuntimeExports.jsx(Alert$1, { severity: "warning", children: jsxRuntimeExports.jsx(Typography$1, { variant: "body2", children: "No audience fields were found for this toolbar button. Add a fields block under this widget's configuration in ui.xml (same structure as the Experience Builder audience tool)." }) })) }) }) })] }));
}

function scalarXmlValue(v) {
    if (v == null) {
        return undefined;
    }
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        return v;
    }
    if (Array.isArray(v)) {
        return scalarXmlValue(v[0]);
    }
    if (typeof v === 'object' && v !== null && '#text' in v) {
        return scalarXmlValue(v['#text']);
    }
    return undefined;
}
function parsePositiveInt(v) {
    var s = scalarXmlValue(v);
    if (s === undefined) {
        return NaN;
    }
    var n = parseInt(String(s), 10);
    return Number.isFinite(n) && n > 0 ? n : NaN;
}
function pickTitle(d, index) {
    var t = d.title;
    if (typeof t === 'string' && t.length) {
        return t;
    }
    if (t && typeof t === 'object' && 'defaultMessage' in t) {
        var m = t.defaultMessage;
        if (typeof m === 'string' && m.length) {
            return m;
        }
    }
    return "device-".concat(index);
}
/**
 * Preview toolbar widget config does not use ICE-panel `arrays: ['devices', ...]`, so
 * `applyDeserializedXMLTransforms` may turn `<device>` lists into `{ 0: {...}, 1: {...} }`
 * instead of an array. Coerce all common shapes into a device array for PreviewSimulatorPanel.
 */
function coercePreviewDeviceList(raw) {
    if (raw == null) {
        return [];
    }
    if (Array.isArray(raw)) {
        return raw.filter(Boolean);
    }
    if (typeof raw !== 'object') {
        return [];
    }
    var o = raw;
    var inner = o.device;
    if (Array.isArray(inner)) {
        return inner.filter(Boolean);
    }
    if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
        var innerObj = inner;
        var fromNumeric = objectValuesIfNumericKeys(innerObj);
        if (fromNumeric.length > 0) {
            return fromNumeric;
        }
        return [innerObj];
    }
    var topNumeric = objectValuesIfNumericKeys(o);
    if (topNumeric.length > 0) {
        return topNumeric;
    }
    return [];
}
function objectValuesIfNumericKeys(obj) {
    var keys = Object.keys(obj);
    if (keys.length === 0) {
        return [];
    }
    var allNumeric = keys.every(function (k) { return /^\d+$/.test(k); });
    if (!allNumeric) {
        return [];
    }
    return keys
        .sort(function (a, b) { return Number(a) - Number(b); })
        .map(function (k) { return obj[k]; })
        .filter(function (v) { return Boolean(v) && typeof v === 'object' && !Array.isArray(v); });
}
/**
 * Produces width/height numbers Studio's PreviewSimulatorPanel can use (avoids NaN `value` keys).
 * Falls back when XML shapes are odd or rows are invalid.
 */
function buildSimulatorDevices(raw, fallback) {
    var rows = coercePreviewDeviceList(raw);
    var out = rows
        .map(function (d, i) { return ({
        title: pickTitle(d, i),
        width: parsePositiveInt(d.width),
        height: parsePositiveInt(d.height)
    }); })
        .filter(function (d) { return Number.isFinite(d.width) && Number.isFinite(d.height); });
    return out.length > 0 ? out : fallback;
}

var defaultIcon = { id: '@mui/icons-material/DevicesRounded' };
var defaultDevices = [
    { title: 'smartPhone', width: 375, height: 667 },
    { title: 'tablet', width: 768, height: 1024 }
];
function rawDevicesFromProps(props, configuration) {
    var _a;
    if (configuration.devices != null) {
        return configuration.devices;
    }
    if (props.devices != null) {
        return props.devices;
    }
    var widget = props.widget;
    return (_a = widget === null || widget === void 0 ? void 0 : widget.configuration) === null || _a === void 0 ? void 0 : _a.devices;
}
function DeviceSimulatorFlyoutToolbarButton(props) {
    var _a, _b, _c, _d;
    var configuration = (_a = props.configuration) !== null && _a !== void 0 ? _a : {};
    var title = (_b = configuration.title) !== null && _b !== void 0 ? _b : 'Device simulator';
    var tooltip = (_c = configuration.tooltip) !== null && _c !== void 0 ? _c : title;
    var icon = (_d = configuration.icon) !== null && _d !== void 0 ? _d : defaultIcon;
    var devices = buildSimulatorDevices(rawDevicesFromProps(props, configuration), defaultDevices);
    var _e = React.useState(null), anchorEl = _e[0], setAnchorEl = _e[1];
    var open = Boolean(anchorEl);
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Tooltip$1, { title: tooltip, children: jsxRuntimeExports.jsx(IconButton, { size: "small", "aria-label": title, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: function (e) { return setAnchorEl(anchorEl ? null : e.currentTarget); }, children: jsxRuntimeExports.jsx(SystemIcon, { icon: icon }) }) }), jsxRuntimeExports.jsx(Popover, { open: open, anchorEl: anchorEl, onClose: function () { return setAnchorEl(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, slotProps: {
                    paper: {
                        elevation: 8,
                        sx: { mt: 0.5, maxWidth: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(520px, calc(100vh - 120px))' }
                    }
                }, children: jsxRuntimeExports.jsx(Paper$1, { variant: "outlined", sx: { overflow: 'auto' }, children: jsxRuntimeExports.jsx(Box, { sx: { minWidth: 320 }, children: jsxRuntimeExports.jsx(PreviewSimulatorPanel, { devices: devices }) }) }) })] }));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.uigoodies',
    widgets: {
        'org.rd.plugin.uigoodies.ComponentPreviewPathNavigator': ComponentPreviewPathNavigator,
        'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
        'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish,
        'org.rd.plugin.uigoodies.ToolPanelAccordion': ToolPanelAccordion,
        'org.rd.plugin.uigoodies.ContentUpload': ContentUpload,
        'org.rd.plugin.uigoodies.openContentUploadPanelButton': OpenContentUploadPanelButton,
        'org.rd.plugin.uigoodies.openContentUploadToolbarButton': OpenContentUploadToolbarButton,
        'org.rd.plugin.uigoodies.PullPushRemoteButtons': PullPushRemoteButtons,
        'org.rd.plugin.uigoodies.bulkPublishView': BulkPublishView,
        'org.rd.plugin.uigoodies.openBulkPublishPanelButton': OpenBulkPublishPanelButton,
        'org.rd.plugin.uigoodies.openBulkPublishToolbarButton': OpenBulkPublishToolbarButton,
        'org.rd.plugin.uigoodies.CopyCurrentPageUrl': CopyCurrentPageUrl,
        'org.rd.plugin.uigoodies.CrossSiteContentTypeCopy': CrossSiteContentTypeCopy,
        'org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton': AudienceTargetingFlyoutToolbarButton,
        'org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton': DeviceSimulatorFlyoutToolbarButton
    }
};

export { AudienceTargetingFlyoutToolbarButton, BulkPublishView, ComponentPreviewPathNavigator, ContentUpload, CopyCurrentPageUrl, CrossSiteContentTypeCopy, DeviceSimulatorFlyoutToolbarButton, EditOrViewCurrent, OpenBulkPublishPanelButton, OpenBulkPublishToolbarButton, OpenContentUploadPanelButton, OpenContentUploadToolbarButton, PublishOrRequestPublish, PullPushRemoteButtons, ToolPanelAccordion, plugin as default };
