const React = craftercms.libs.React;
const { useState } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, useTheme, accordionClasses, accordionSummaryClasses, Accordion, AccordionSummary, Typography, AccordionDetails } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Button = craftercms.libs.MaterialUI.Button && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Button, 'default') ? craftercms.libs.MaterialUI.Button['default'] : craftercms.libs.MaterialUI.Button;
const SystemIcon = craftercms.components.SystemIcon && Object.prototype.hasOwnProperty.call(craftercms.components.SystemIcon, 'default') ? craftercms.components.SystemIcon['default'] : craftercms.components.SystemIcon;
const { createAction } = craftercms.libs.ReduxToolkit;
const { SystemIcon: SystemIcon$1, WidgetsGrid } = craftercms.components;
const ExpandMore = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined');

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

function EditOrViewCurrent(props) {
    // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
    var item = props.item, useIcon = props.useIcon;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var env = useEnv();
    var readonly = (item === null || item === void 0 ? void 0 : item.availableActionsMap.edit) !== true;
    var label = readonly ? 'View' : 'Edit';
    var iconId = item
        ? readonly
            ? '@mui/icons-material/PreviewOutlined'
            : '@mui/icons-material/EditOutlined'
        : '@mui/icons-material/HourglassEmptyOutlined';
    var handleClick = function (event) {
        dispatch(showEditDialog({
            site: siteId,
            path: item.path,
            authoringBase: env.authoringBase,
            readonly: readonly
        }));
    };
    return useIcon ? (React.createElement(Tooltip, { title: item ? "".concat(label, " (shift+e)") : '' },
        React.createElement(IconButton, { size: "small", onClick: handleClick, disabled: !item },
            React.createElement(SystemIcon, { icon: { id: iconId } })))) : (React.createElement(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item }, label));
}

function PublishOrRequestPublish(props) {
    // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
    var item = props.item, useIcon = props.useIcon;
    var dispatch = useDispatch();
    var showButton = false;
    var forceRequest = false;
    if (item) {
        if (item.stateMap.modified === true || item.stateMap.new === true) {
            showButton = true;
            if (item.availableActionsMap.publish === false) {
                forceRequest = true;
            }
        }
    }
    var label = forceRequest ? 'Request Publish' : 'Publish';
    var iconId = item
        ? forceRequest
            ? '@mui/icons-material/CloudDoneOutlined'
            : '@mui/icons-material/BackupOutlined'
        : '@mui/icons-material/HourglassEmptyOutlined';
    var handleClick = function (event) {
        dispatch(showPublishDialog({ items: [item], onSuccess: closePublishDialog() }));
    };
    return showButton === true ? (useIcon ? (React.createElement(Tooltip, { title: item ? label : '' },
        React.createElement(IconButton, { size: "small", onClick: handleClick, disabled: !item },
            React.createElement(SystemIcon, { icon: { id: iconId } })))) : (React.createElement(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item }, label))) : (React.createElement(React.Fragment, null));
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
    return (React.createElement(Accordion, { expanded: open, onChange: function (e, isExpanded) { return setOpen(isExpanded); }, sx: __assign((_a = { boxShadow: 0 }, _a["&.".concat(expandedClass)] = { margin: 0 }, _a), sxs === null || sxs === void 0 ? void 0 : sxs.accordion) },
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMore, null), sx: __assign((_b = { alignItems: 'center' }, _b["&, &.".concat(expandedClass)] = { minHeight: '48px' }, _b[".".concat(contentClass, ", .").concat(contentClass, ".").concat(expandedClass)] = { margin: 0 }, _b), sxs === null || sxs === void 0 ? void 0 : sxs.accordionSummary) },
            icon && React.createElement(SystemIcon$1, { icon: icon, style: { marginRight: 10, color: theme.palette.action.active } }),
            React.createElement(Typography, null, title)),
        React.createElement(AccordionDetails, { sx: __assign({ padding: 0 }, sxs === null || sxs === void 0 ? void 0 : sxs.accordionDetails) },
            React.createElement(WidgetsGrid, { container: true, spacing: 0, direction: "column", widgets: props.widgets, sx: sxs === null || sxs === void 0 ? void 0 : sxs.widgetsGrid }))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.uigoodies',
    widgets: {
        'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
        'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish,
        'org.rd.plugin.uigoodies.ToolPanelAccordion': ToolPanelAccordion
    }
};

export { EditOrViewCurrent, PublishOrRequestPublish, ToolPanelAccordion, plugin as default };
