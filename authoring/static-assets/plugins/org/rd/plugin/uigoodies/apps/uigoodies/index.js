const React = craftercms.libs.React;
const { useState, useRef, useEffect } = craftercms.libs.React;
const React__default = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, useTheme, accordionClasses, accordionSummaryClasses, Accordion, AccordionSummary, Typography, AccordionDetails, alpha, Button: Button$1, buttonClasses, Backdrop, CircularProgress: CircularProgress$1, Alert, Paper, Box: Box$1 } = craftercms.libs.MaterialUI;
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
const { DialogFooter } = craftercms.components;
const { capitalize, unstable_useId } = craftercms.libs.MaterialUI;
const { styled, useThemeProps, useTheme: useTheme$1 } = craftercms.libs.MaterialUI;
const CircularProgress = craftercms.libs.MaterialUI.CircularProgress && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.CircularProgress, 'default') ? craftercms.libs.MaterialUI.CircularProgress['default'] : craftercms.libs.MaterialUI.CircularProgress;
const generateUtilityClass = craftercms.libs.MaterialUI.generateUtilityClass && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.generateUtilityClass, 'default') ? craftercms.libs.MaterialUI.generateUtilityClass['default'] : craftercms.libs.MaterialUI.generateUtilityClass;
const generateUtilityClasses = craftercms.libs.MaterialUI.generateUtilityClasses && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.generateUtilityClasses, 'default') ? craftercms.libs.MaterialUI.generateUtilityClasses['default'] : craftercms.libs.MaterialUI.generateUtilityClasses;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const Tooltip$1 = craftercms.libs.MaterialUI.Tooltip && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Tooltip, 'default') ? craftercms.libs.MaterialUI.Tooltip['default'] : craftercms.libs.MaterialUI.Tooltip;
const { pull, push } = craftercms.services.repositories;
const DownloadIcon = craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined');
const PublishIcon = craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined');
const Snackbar = craftercms.libs.MaterialUI.Snackbar && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Snackbar, 'default') ? craftercms.libs.MaterialUI.Snackbar['default'] : craftercms.libs.MaterialUI.Snackbar;
const { FormattedMessage } = craftercms.libs.ReactIntl;
const { of } = craftercms.libs.rxjs;
const { concatMap, expand, toArray } = craftercms.libs.rxjs;
const { fetchUnpublished } = craftercms.services.dashboard;
const { nou } = craftercms.utils.object;
const { lookupItemByPath } = craftercms.utils.content;
const { hasInitialPublish } = craftercms.services.sites;
const InfoOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined');
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const ExpandMoreRounded = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded');

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
var f$1=React__default,k$1=Symbol.for("react.element"),l$1=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n$1=f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p$1={key:!0,ref:!0,__self:!0,__source:!0};
function q$1(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p$1.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k$1,type:c,key:e,ref:h,props:d,_owner:n$1.current}}reactJsxRuntime_production_min.Fragment=l$1;reactJsxRuntime_production_min.jsx=q$1;reactJsxRuntime_production_min.jsxs=q$1;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

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

function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return "'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return !!n&&!!n[Q]}function t(n){var r;return !!n&&(function(n){if(!n||"object"!=typeof n)return !1;var r=Object.getPrototypeOf(n);if(null===r)return !0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!(null===(r=n.constructor)||void 0===r?void 0:r[L])||s(n)||v(n))}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n);})):n.forEach((function(t,e){return r(e,t,n)}));}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?n.add(t):n[r]=t;}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]});}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)||(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0)),n}function h(){n(2);}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r);}function _(){return U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r);}function g(n){O(n),n.p.forEach(S),n.p=null;}function O(n){n===U&&(U=n.l);}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.g=!0;}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.O||b("ES5").S(e,r,o),o?(i[Q].P&&(g(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),g(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o,u=o,a=!1;3===e.i&&(u=new Set(o),o.clear(),a=!0),i(u,(function(r,i){return A(n,e,o,r,i,t,a)})),x(n,o,!1),t&&n.u&&b("Patches").N(e,t,n.u,n.s);}return e.o}function A(e,i,o,a,c,s,v){if(r(c)){var p=M(e,c,s&&i&&3!==i.i&&!u(i.R,a)?s.concat(a):void 0);if(f(o,a,p),!r(p))return;e.m=!1;}else v&&o.add(c);if(t(c)&&!y(c)){if(!e.h.D&&e._<1)return;M(e,c),i&&i.A.l||x(e,c);}}function x(n,r,t){void 0===t&&(t=!1),!n.l&&n.h.D&&n.m&&d(r,t);}function z(n,r){var t=n[Q];return (t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t);}}function k(n){n.P||(n.P=!0,n.l&&k(n.l));}function E(n){n.o||(n.o=l(n.t));}function N(n,r,t){var e=s(r)?b("MapSet").F(r,t):v(r)?b("MapSet").T(r,t):n.O?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return (t?t.A:_()).p.push(e),e}function R(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=D(r,c),u.I=!1;}else e=D(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t));})),3===c?new Set(e):e}(e)}function D(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function F(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return en.get(r,n)},set:function(r){var t=this[Q];en.set(t,n,r);}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t);}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return !0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return !0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return !0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return !0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return !0;return !1}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable);}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:i,o:null,g:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.R,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)));})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t));}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l]);}}}}(n.p[0]),e(n.p));},K:function(n){return 4===n.i?o(n):a(n)}});}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t);})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=N(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.R[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return !0;E(n),k(n);}return n.o[r]===t&&(void 0!==t||r in n.o)||Number.isNaN(t)&&Number.isNaN(n.o[r])||(n.o[r]=t,n.R[r]=!0),!0},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.R[r]=!1,E(n),k(n)):delete n.R[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11);},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12);}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)};})),on.deleteProperty=function(r,t){return on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.O=B,this.D=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return (t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=N(e,r,void 0),v=!0;try{f=i(s),v=!1;}finally{v?g(c):O(c);}return "undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw g(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.D&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l);}return f}n(21,r);},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r;}));return "undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return [n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze);}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=R(e));var i=w(this),o=N(this,e,void 0);return o[Q].C=!0,O(i),o},i.finishDraft=function(r,t){var e=r&&r[Q];var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.D=n;},i.setUseProxies=function(r){r&&!B&&n(20),this.O=r;},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce;an.produceWithPatches.bind(an);an.setAutoFreeze.bind(an);an.setUseProxies.bind(an);an.applyPatches.bind(an);an.createDraft.bind(an);an.finishDraft.bind(an);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function (obj, key, value) { return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value }) : obj[key] = value; };
var __spreadValues = function (a, b) {
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        for (var _i = 0, _c = __getOwnPropSymbols(b); _i < _c.length; _i++) {
            var prop = _c[_i];
            if (__propIsEnum.call(b, prop))
                __defNormalProp(a, prop, b[prop]);
        }
    return a;
};
var __spreadProps = function (a, b) { return __defProps(a, __getOwnPropDescs(b)); };
var __async = function (__this, __arguments, generator) {
    return new Promise(function (resolve, reject) {
        var fulfilled = function (value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        };
        var rejected = function (value) {
            try {
                step(generator.throw(value));
            }
            catch (e) {
                reject(e);
            }
        };
        var step = function (x) { return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected); };
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
// src/createAction.ts
function createAction(type, prepareAction) {
    function actionCreator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (prepareAction) {
            var prepared = prepareAction.apply(void 0, args);
            if (!prepared) {
                throw new Error("prepareAction did not return an object");
            }
            return __spreadValues(__spreadValues({
                type: type,
                payload: prepared.payload
            }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
        }
        return { type: type, payload: args[0] };
    }
    actionCreator.toString = function () { return "" + type; };
    actionCreator.type = type;
    actionCreator.match = function (action) { return action.type === type; };
    return actionCreator;
}
/** @class */ ((function (_super) {
    __extends(MiddlewareArray, _super);
    function MiddlewareArray() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.setPrototypeOf(_this, MiddlewareArray.prototype);
        return _this;
    }
    Object.defineProperty(MiddlewareArray, Symbol.species, {
        get: function () {
            return MiddlewareArray;
        },
        enumerable: false,
        configurable: true
    });
    MiddlewareArray.prototype.concat = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray.prototype.prepend = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        if (arr.length === 1 && Array.isArray(arr[0])) {
            return new (MiddlewareArray.bind.apply(MiddlewareArray, __spreadArray([void 0], arr[0].concat(this))))();
        }
        return new (MiddlewareArray.bind.apply(MiddlewareArray, __spreadArray([void 0], arr.concat(this))))();
    };
    return MiddlewareArray;
})(Array));
/** @class */ ((function (_super) {
    __extends(EnhancerArray, _super);
    function EnhancerArray() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.setPrototypeOf(_this, EnhancerArray.prototype);
        return _this;
    }
    Object.defineProperty(EnhancerArray, Symbol.species, {
        get: function () {
            return EnhancerArray;
        },
        enumerable: false,
        configurable: true
    });
    EnhancerArray.prototype.concat = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        return _super.prototype.concat.apply(this, arr);
    };
    EnhancerArray.prototype.prepend = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        if (arr.length === 1 && Array.isArray(arr[0])) {
            return new (EnhancerArray.bind.apply(EnhancerArray, __spreadArray([void 0], arr[0].concat(this))))();
        }
        return new (EnhancerArray.bind.apply(EnhancerArray, __spreadArray([void 0], arr.concat(this))))();
    };
    return EnhancerArray;
})(Array));
function freezeDraftable(val) {
    return t(val) ? fn(val, function () {
    }) : val;
}
// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {};
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
        addCase: function (typeOrActionCreator, reducer) {
            var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
            if (!type) {
                throw new Error("`builder.addCase` cannot be called with an empty action type");
            }
            if (type in actionsMap) {
                throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");
            }
            actionsMap[type] = reducer;
            return builder;
        },
        addMatcher: function (matcher, reducer) {
            actionMatchers.push({ matcher: matcher, reducer: reducer });
            return builder;
        },
        addDefaultCase: function (reducer) {
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
function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) { actionMatchers = []; }
    var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
    var getInitialState;
    if (isStateFunction(initialState)) {
        getInitialState = function () { return freezeDraftable(initialState()); };
    }
    else {
        var frozenInitialState_1 = freezeDraftable(initialState);
        getInitialState = function () { return frozenInitialState_1; };
    }
    function reducer(state, action) {
        if (state === void 0) { state = getInitialState(); }
        var caseReducers = __spreadArray([
            actionsMap[action.type]
        ], finalActionMatchers.filter(function (_c) {
            var matcher = _c.matcher;
            return matcher(action);
        }).map(function (_c) {
            var reducer2 = _c.reducer;
            return reducer2;
        }));
        if (caseReducers.filter(function (cr) { return !!cr; }).length === 0) {
            caseReducers = [finalDefaultCaseReducer];
        }
        return caseReducers.reduce(function (previousState, caseReducer) {
            if (caseReducer) {
                if (r(previousState)) {
                    var draft = previousState;
                    var result = caseReducer(draft, action);
                    if (result === void 0) {
                        return previousState;
                    }
                    return result;
                }
                else if (!t(previousState)) {
                    var result = caseReducer(previousState, action);
                    if (result === void 0) {
                        if (previousState === null) {
                            return previousState;
                        }
                        throw Error("A case reducer on a non-draftable value must not return undefined");
                    }
                    return result;
                }
                else {
                    return fn(previousState, function (draft) {
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
// src/nanoid.ts
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function (size) {
    if (size === void 0) { size = 21; }
    var id = "";
    var i = size;
    while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
};
// src/createAsyncThunk.ts
var commonProperties = [
    "name",
    "message",
    "stack",
    "code"
];
var RejectWithValue = /** @class */ (function () {
    function RejectWithValue(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return RejectWithValue;
}());
var FulfillWithMeta = /** @class */ (function () {
    function FulfillWithMeta(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return FulfillWithMeta;
}());
var miniSerializeError = function (value) {
    if (typeof value === "object" && value !== null) {
        var simpleError = {};
        for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
            var property = commonProperties_1[_i];
            if (typeof value[property] === "string") {
                simpleError[property] = value[property];
            }
        }
        return simpleError;
    }
    return { message: String(value) };
};
((function () {
    function createAsyncThunk2(typePrefix, payloadCreator, options) {
        var fulfilled = createAction(typePrefix + "/fulfilled", function (payload, requestId, arg, meta) { return ({
            payload: payload,
            meta: __spreadProps(__spreadValues({}, meta || {}), {
                arg: arg,
                requestId: requestId,
                requestStatus: "fulfilled"
            })
        }); });
        var pending = createAction(typePrefix + "/pending", function (requestId, arg, meta) { return ({
            payload: void 0,
            meta: __spreadProps(__spreadValues({}, meta || {}), {
                arg: arg,
                requestId: requestId,
                requestStatus: "pending"
            })
        }); });
        var rejected = createAction(typePrefix + "/rejected", function (error, requestId, arg, payload, meta) { return ({
            payload: payload,
            error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
            meta: __spreadProps(__spreadValues({}, meta || {}), {
                arg: arg,
                requestId: requestId,
                rejectedWithValue: !!payload,
                requestStatus: "rejected",
                aborted: (error == null ? void 0 : error.name) === "AbortError",
                condition: (error == null ? void 0 : error.name) === "ConditionError"
            })
        }); });
        var AC = typeof AbortController !== "undefined" ? AbortController : /** @class */ (function () {
            function class_1() {
                this.signal = {
                    aborted: false,
                    addEventListener: function () {
                    },
                    dispatchEvent: function () {
                        return false;
                    },
                    onabort: function () {
                    },
                    removeEventListener: function () {
                    },
                    reason: void 0,
                    throwIfAborted: function () {
                    }
                };
            }
            class_1.prototype.abort = function () {
            };
            return class_1;
        }());
        function actionCreator(arg) {
            return function (dispatch, getState, extra) {
                var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
                var abortController = new AC();
                var abortReason;
                function abort(reason) {
                    abortReason = reason;
                    abortController.abort();
                }
                var promise2 = function () {
                    return __async(this, null, function () {
                        var _a, _b, finalAction, conditionResult, abortedPromise, err_1, skipDispatch;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 4, , 5]);
                                    conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, { getState: getState, extra: extra });
                                    if (!isThenable(conditionResult)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, conditionResult];
                                case 1:
                                    conditionResult = _c.sent();
                                    _c.label = 2;
                                case 2:
                                    if (conditionResult === false || abortController.signal.aborted) {
                                        throw {
                                            name: "ConditionError",
                                            message: "Aborted due to condition callback returning false."
                                        };
                                    }
                                    abortedPromise = new Promise(function (_, reject) { return abortController.signal.addEventListener("abort", function () { return reject({
                                        name: "AbortError",
                                        message: abortReason || "Aborted"
                                    }); }); });
                                    dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, { requestId: requestId, arg: arg }, { getState: getState, extra: extra })));
                                    return [4 /*yield*/, Promise.race([
                                            abortedPromise,
                                            Promise.resolve(payloadCreator(arg, {
                                                dispatch: dispatch,
                                                getState: getState,
                                                extra: extra,
                                                requestId: requestId,
                                                signal: abortController.signal,
                                                abort: abort,
                                                rejectWithValue: function (value, meta) {
                                                    return new RejectWithValue(value, meta);
                                                },
                                                fulfillWithValue: function (value, meta) {
                                                    return new FulfillWithMeta(value, meta);
                                                }
                                            })).then(function (result) {
                                                if (result instanceof RejectWithValue) {
                                                    throw result;
                                                }
                                                if (result instanceof FulfillWithMeta) {
                                                    return fulfilled(result.payload, requestId, arg, result.meta);
                                                }
                                                return fulfilled(result, requestId, arg);
                                            })
                                        ])];
                                case 3:
                                    finalAction = _c.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _c.sent();
                                    finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                                    return [3 /*break*/, 5];
                                case 5:
                                    skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                                    if (!skipDispatch) {
                                        dispatch(finalAction);
                                    }
                                    return [2 /*return*/, finalAction];
                            }
                        });
                    });
                }();
                return Object.assign(promise2, {
                    abort: abort,
                    requestId: requestId,
                    arg: arg,
                    unwrap: function () {
                        return promise2.then(unwrapResult);
                    }
                });
            };
        }
        return Object.assign(actionCreator, {
            pending: pending,
            rejected: rejected,
            fulfilled: fulfilled,
            typePrefix: typePrefix
        });
    }
    createAsyncThunk2.withTypes = function () { return createAsyncThunk2; };
    return createAsyncThunk2;
}))();
function unwrapResult(action) {
    if (action.meta && action.meta.rejectedWithValue) {
        throw action.payload;
    }
    if (action.error) {
        throw action.error;
    }
    return action.payload;
}
function isThenable(value) {
    return value !== null && typeof value === "object" && typeof value.then === "function";
}
var alm = "listenerMiddleware";
createAction(alm + "/add");
createAction(alm + "/removeAll");
createAction(alm + "/remove");
var promise;
typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : globalThis) : function (cb) { return (promise || (promise = Promise.resolve())).then(cb).catch(function (err) { return setTimeout(function () {
    throw err;
}, 0); }); };
// src/index.ts
F();

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
    if ((item === null || item === void 0 ? void 0 : item.availableActionsMap.edit) === true
        && isItemLockedForMe(item, currentUser.username) === false) {
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
/* global Reflect, Promise */


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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach( // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
  // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
  slot => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        acc.push(getUtilityClass(key));

        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
      }

      return acc;
    }, []).join(' ');
  });
  return output;
}

function getLoadingButtonUtilityClass(slot) {
  return generateUtilityClass('MuiLoadingButton', slot);
}
const loadingButtonClasses = generateUtilityClasses('MuiLoadingButton', ['root', 'loading', 'loadingIndicator', 'loadingIndicatorCenter', 'loadingIndicatorStart', 'loadingIndicatorEnd', 'endIconLoadingEnd', 'startIconLoadingStart']);
var loadingButtonClasses$1 = loadingButtonClasses;

const _excluded = ["children", "disabled", "id", "loading", "loadingIndicator", "loadingPosition", "variant"];

const useUtilityClasses = ownerState => {
  const {
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ['root', loading && 'loading'],
    startIcon: [loading && `startIconLoading${capitalize(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${capitalize(loadingPosition)}`],
    loadingIndicator: ['loadingIndicator', loading && `loadingIndicator${capitalize(loadingPosition)}`]
  };
  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
}; // TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core


const rootShouldForwardProp = prop => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';

const LoadingButtonRoot = styled(Button, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root, styles.startIconLoadingStart && {
      [`& .${loadingButtonClasses$1.startIconLoadingStart}`]: styles.startIconLoadingStart
    }, styles.endIconLoadingEnd && {
      [`& .${loadingButtonClasses$1.endIconLoadingEnd}`]: styles.endIconLoadingEnd
    }];
  }
})(({
  ownerState,
  theme
}) => _extends({
  [`& .${loadingButtonClasses$1.startIconLoadingStart}, & .${loadingButtonClasses$1.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0
  }
}, ownerState.loadingPosition === 'center' && {
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short
  }),
  [`&.${loadingButtonClasses$1.loading}`]: {
    color: 'transparent'
  }
}, ownerState.loadingPosition === 'start' && ownerState.fullWidth && {
  [`& .${loadingButtonClasses$1.startIconLoadingStart}, & .${loadingButtonClasses$1.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    marginRight: -8
  }
}, ownerState.loadingPosition === 'end' && ownerState.fullWidth && {
  [`& .${loadingButtonClasses$1.startIconLoadingStart}, & .${loadingButtonClasses$1.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    marginLeft: -8
  }
}));
const LoadingButtonLoadingIndicator = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.loadingIndicator, styles[`loadingIndicator${capitalize(ownerState.loadingPosition)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex'
}, ownerState.loadingPosition === 'start' && (ownerState.variant === 'outlined' || ownerState.variant === 'contained') && {
  left: ownerState.size === 'small' ? 10 : 14
}, ownerState.loadingPosition === 'start' && ownerState.variant === 'text' && {
  left: 6
}, ownerState.loadingPosition === 'center' && {
  left: '50%',
  transform: 'translate(-50%)',
  color: (theme.vars || theme).palette.action.disabled
}, ownerState.loadingPosition === 'end' && (ownerState.variant === 'outlined' || ownerState.variant === 'contained') && {
  right: ownerState.size === 'small' ? 10 : 14
}, ownerState.loadingPosition === 'end' && ownerState.variant === 'text' && {
  right: 6
}, ownerState.loadingPosition === 'start' && ownerState.fullWidth && {
  position: 'relative',
  left: -10
}, ownerState.loadingPosition === 'end' && ownerState.fullWidth && {
  position: 'relative',
  right: -10
}));
const LoadingButton = /*#__PURE__*/React.forwardRef(function LoadingButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiLoadingButton'
  });

  const {
    children,
    disabled = false,
    id: idProp,
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    variant = 'text'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const id = unstable_useId(idProp);
  const loadingIndicator = loadingIndicatorProp != null ? loadingIndicatorProp : /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgress, {
    "aria-labelledby": id,
    color: "inherit",
    size: 16
  });

  const ownerState = _extends({}, props, {
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    variant
  });

  const classes = useUtilityClasses(ownerState);
  const loadingButtonLoadingIndicator = loading ? /*#__PURE__*/jsxRuntimeExports.jsx(LoadingButtonLoadingIndicator, {
    className: classes.loadingIndicator,
    ownerState: ownerState,
    children: loadingIndicator
  }) : null;
  return /*#__PURE__*/jsxRuntimeExports.jsxs(LoadingButtonRoot, _extends({
    disabled: disabled || loading,
    id: id,
    ref: ref
  }, other, {
    variant: variant,
    classes: classes,
    ownerState: ownerState,
    children: [ownerState.loadingPosition === 'end' ? children : loadingButtonLoadingIndicator, ownerState.loadingPosition === 'end' ? loadingButtonLoadingIndicator : children]
  }));
});
var LoadingButton$1 = LoadingButton;

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
                            'display': 'flex',
                            'marginBottom': '20px',
                            'alignItems': 'center'
                        }, children: [jsxRuntimeExports.jsx(TextField, { label: "Path to upload", id: "path-read-only-input", sx: { minWidth: '450px' }, InputProps: { readOnly: !props.allowPathInput }, value: path, onChange: props.allowPathInput ? function (e) {
                                    setPath(e.target.value);
                                } : undefined }), props.allowPathSelection && (jsxRuntimeExports.jsx(Button, { variant: "outlined", onClick: handleSelectPath, disabled: processing, sx: { minWidth: '130px', marginLeft: '20px' }, children: "Select Path" }))] }), jsxRuntimeExports.jsx(Box, { sx: function (theme) { return ({
                            'font-family': '"Source Sans Pro", "Open Sans", sans-serif',
                            '& input::file-selector-button': {
                                'display': 'inline-flex',
                                '-webkit-box-align': 'center',
                                'align-items': 'center',
                                '-webkit-box-pack': 'center',
                                'justify-content': 'center',
                                'position': 'relative',
                                'box-sizing': 'border-box',
                                '-webkit-tap-highlight-color': 'transparent',
                                'backgroundColor': 'transparent',
                                'outline': '0px',
                                'margin': '0px',
                                'cursor': 'pointer',
                                'user-select': 'none',
                                'vertical-align': 'middle',
                                'appearance': 'none',
                                'text-decoration': 'none',
                                'text-transform': 'none',
                                'font-family': '"Source Sans Pro", "Open Sans", sans-serif',
                                'font-weight': '600',
                                'font-size': '0.875rem',
                                'line-height': '1.75',
                                'padding': '5px 15px',
                                'border-radius': '4px',
                                'transition': 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                'border': "1px solid ".concat(alpha(theme.palette.primary.main, 0.5)),
                                'color': theme.palette.primary.main,
                                'min-width': '130px',
                                'marginRight': '10px',
                                '&:hover': {
                                    'backgroundColor': alpha(theme.palette.primary.main, 0.04),
                                    'border': "1px solid ".concat(theme.palette.primary.main)
                                }
                            }
                        }); }, children: jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: ".xml", onChange: onFileChange, onClick: function () {
                                inputRef.current.value = null;
                            } }) })] }), jsxRuntimeExports.jsx(DialogFooter, { children: jsxRuntimeExports.jsx(LoadingButton$1, { variant: "contained", onClick: handleUploadXMLFile, loading: processing, disabled: !content, loadingPosition: "start", sx: { minWidth: '130px' }, children: "Upload Content" }) })] }));
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
    return (jsxRuntimeExports.jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick }));
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
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [useIcon ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [shouldShowButton(enablePull) ? (jsxRuntimeExports.jsx(Tooltip, { title: pullLabel ? pullLabel : "Pull", children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handlePullClick, children: jsxRuntimeExports.jsx(DownloadIcon, {}) }) })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {})), shouldShowButton(enablePush) ? (jsxRuntimeExports.jsx(Tooltip, { title: pushLabel ? pushLabel : "Push", children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handlePushClick, children: jsxRuntimeExports.jsx(PublishIcon, {}) }) })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}))] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [shouldShowButton(enablePull) ? (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handlePullClick, children: pullLabel ? pullLabel : "Pull" })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {})), shouldShowButton(enablePush) ? (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handlePushClick, children: pushLabel ? pushLabel : "Push" })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}))] })), jsxRuntimeExports.jsxs(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow, children: [jsxRuntimeExports.jsx(CircularProgress$1, { color: "inherit" }), jsxRuntimeExports.jsx(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 5000, onClose: handleSnackClose, children: jsxRuntimeExports.jsx(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' }, children: snackMessage }) })] })] }));
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
  const item = path ? lookupItemByPath(path, itemsByPath) : null;
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
createReducer(initialState, {
  [showErrorDialog.type]: (state, { payload }) =>
    Object.assign(
      Object.assign(
        { onClose: closeErrorDialog(), onClosed: errorDialogClosed(), onDismiss: closeErrorDialog() },
        payload
      ),
      { open: true }
    ),
  [closeErrorDialog.type]: (state) => Object.assign(Object.assign({}, state), { open: false }),
  [errorDialogClosed.type]: () => initialState
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
        of(0).pipe(concatMap(function (offset) { return fetchItems(offset); }), expand(function (data) {
            itemsByPath.push.apply(itemsByPath, data.filter(function (item) { return item.path.startsWith(selectedPath); }));
            return data.total > data.limit + data.offset ? fetchItems(data.limit + data.offset) : of();
        }), toArray()).subscribe({
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
        return (jsxRuntimeExports.jsx(Paper, { elevation: 2, sx: { height: '100%' } }));
    }
    return (jsxRuntimeExports.jsx(Paper, { elevation: 2, sx: { height: '100%' }, children: jsxRuntimeExports.jsx(Box$1, { sx: { p: 1 }, children: hasInitialPublish$1 ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(DialogBody, { sx: { minHeight: '24vh', minWidth: '48vh' }, children: [jsxRuntimeExports.jsx(Typography, { variant: "body1", sx: {
                                    paddingBottom: 2,
                                    float: 'left',
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
                        }, children: jsxRuntimeExports.jsx(FormattedMessage, { id: "publishOnDemand.noInitialPublish", defaultMessage: "The project needs to undergo its initial publish before other publishing options become available" }) }), hasPublishPermission && (jsxRuntimeExports.jsx(LoadingButton$1, { variant: "contained", color: "primary", onClick: onInitialPublish, children: jsxRuntimeExports.jsx(FormattedMessage, { id: "publishOnDemand.publishEntireProject", defaultMessage: "Publish Entire Project" }) }))] })) }) }));
}

function OpenBulkPublishPanelButton(props) {
    var _a = props.title, title = _a === void 0 ? BULK_PUBLISH_DEFAULTS.title : _a, _b = props.icon, icon = _b === void 0 ? BULK_PUBLISH_DEFAULTS.icon : _b, _c = props.dialogTitle, dialogTitle = _c === void 0 ? title : _c;
    var handleClick = useOpenBulkPublish(__assign(__assign({}, props), { title: dialogTitle }));
    return (jsxRuntimeExports.jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick }));
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
    navigator.clipboard.writeText(text)
        .catch(function (err) {
        console.error('Failed to copy text: ', err);
    });
}
function CopyCurrentPageUrl(props) {
    var item = props.item, useIcon = props.useIcon, environments = props.environments;
    var _a = React.useState(null), optionMenuAnchorEl = _a[0], setOptionMenuAnchorEl = _a[1];
    var iconId = '@mui/icons-material/FileCopyOutlined';
    var siteId = useActiveSiteId();
    var dispatch = useDispatch();
    var options = (environments === null || environments === void 0 ? void 0 : environments.label) && (environments === null || environments === void 0 ? void 0 : environments.pattern) ? Object.keys(environments.label).map(function (key) { return ({
        label: environments.label[key],
        pattern: environments.pattern[key]
    }); }) : [];
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
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [useIcon ? (jsxRuntimeExports.jsx(Tooltip, { title: 'Copy Page Relative URL', children: jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handleClick, children: jsxRuntimeExports.jsx(SystemIcon, { icon: { id: iconId } }) }) })) : (jsxRuntimeExports.jsx(Button, { size: "small", variant: "text", onClick: handleClick, children: "Copy Page URL" })), options && options.length > 0 && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Button, { id: "urls-select-button", variant: "text", color: "inherit", onClick: handleOptionMenuClick, "aria-controls": optionMenuAnchorEl ? 'urls-select-menu' : undefined, "aria-haspopup": "true", "aria-expanded": Boolean(optionMenuAnchorEl), sx: {
                            typography: 'subtitle1',
                            textTransform: 'none',
                            borderRadius: 1,
                            minWidth: 0
                        }, endIcon: jsxRuntimeExports.jsx(ExpandMoreRounded, {}), children: "Copy URLs" }), jsxRuntimeExports.jsx(Menu, { id: "urls-select-menu", anchorEl: optionMenuAnchorEl, open: Boolean(optionMenuAnchorEl), onClose: function () { return setOptionMenuAnchorEl(null); }, MenuListProps: {
                            'aria-labelledby': 'urls-select-button'
                        }, slotProps: {
                            paper: {
                                style: { minWidth: 132 }
                            }
                        }, children: options.map(function (option) { return (jsxRuntimeExports.jsx(MenuItem, { onClick: function () { return handleOptionSelect(option.label, option.pattern); }, children: option.label }, option.label)); }) })] }))] }));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.uigoodies',
    widgets: {
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
        'org.rd.plugin.uigoodies.CopyCurrentPageUrl': CopyCurrentPageUrl
    }
};

export { CopyCurrentPageUrl, EditOrViewCurrent, PublishOrRequestPublish, PullPushRemoteButtons, ToolPanelAccordion, plugin as default };
