const React = craftercms.libs.React;
const { useState, useEffect } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, Badge, CircularProgress } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const SystemIcon = craftercms.components.SystemIcon && Object.prototype.hasOwnProperty.call(craftercms.components.SystemIcon, 'default') ? craftercms.components.SystemIcon['default'] : craftercms.components.SystemIcon;
const { createAction } = craftercms.libs.ReduxToolkit;
const { fetchItemsByPath } = craftercms.services.content;

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
function usePreviewNavigation() {
  return useSelector((state) => state.previewNavigation);
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
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _a = React.useState(null); _a[0]; _a[1];
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath), internalUrl = _c[0], setInternalUrl = _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(false), forceView = _e[0], setForceView = _e[1];
    var useIcon = props.useIcon != 'undefined' ? props.useIcon : true;
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        var path = '/site/website' + internalUrl + '/index.xml';
        setIsFetching(true);
        fetchItemsByPath(siteId, [path], { castAsDetailedItem: true }).subscribe({
            next: function (sandboxItems) {
                var sandboxItem = sandboxItems[0];
                setForceView(false);
                setIsFetching(false);
                if (sandboxItem.stateMap.locked) {
                    setForceView(true);
                }
            }
        });
    }, [currentUrlPath]);
    var handleClick = function (event) {
        var site = siteId;
        var path = '/site/website' + internalUrl + '/index.xml';
        var authoringBase = '/studio';
        dispatch(showEditDialog({ site: site, path: path, authoringBase: authoringBase, readonly: forceView ? true : false }));
    };
    var label = forceView ? 'View' : 'Edit';
    var iconId = forceView ? '@mui/icons-material/PreviewRounded' : '@mui/icons-material/EditRounded';
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: label },
            React.createElement(Badge, { badgeContent: null, color: "primary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": "false", "aria-haspopup": "true", "aria-expanded": "false", onClick: handleClick }, useIcon ? (React.createElement(SystemIcon, { icon: { id: iconId }, fontIconProps: { fontSize: 'small' } })) : (React.createElement(MenuItem, null, label))),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } }))))));
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
// region Batch Actions
const batchActions = /*#__PURE__*/ createAction('BATCH_ACTIONS');
// endregion

function PublishOrRequestPublish(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _a = React.useState(null); _a[0]; _a[1];
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath), internalUrl = _c[0], setInternalUrl = _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(false), forceView = _e[0], setForceView = _e[1];
    var useIcon = props.useIcon != 'undefined' ? props.useIcon : true;
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        var path = '/site/website' + internalUrl + '/index.xml';
        setIsFetching(true);
        fetchItemsByPath(siteId, [path], { castAsDetailedItem: true }).subscribe({
            next: function (sandboxItems) {
                var sandboxItem = sandboxItems[0];
                setForceView(false);
                setIsFetching(false);
                if (sandboxItem.stateMap.locked) {
                    setForceView(true);
                }
            }
        });
    }, [currentUrlPath]);
    var handleClick = function (event) {
        var path = '/site/website' + internalUrl + '/index.xml';
        fetchItemsByPath(siteId, [path], { castAsDetailedItem: true }).subscribe({
            next: function (sandboxItems) {
                dispatch(showPublishDialog({ items: sandboxItems, onSuccess: batchActions([closePublishDialog()]) }));
            }
        });
    };
    var label = forceView ? 'Request Publish' : 'Publish';
    var iconId = forceView ? '@mui/icons-material/CloudDoneRounded' : '@mui/icons-material/BackupRounded';
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: label },
            React.createElement(Badge, { badgeContent: null, color: "primary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": "false", "aria-haspopup": "true", "aria-expanded": "false", onClick: handleClick }, useIcon ? (React.createElement(SystemIcon, { icon: { id: iconId }, fontIconProps: { fontSize: 'small' } })) : (React.createElement(MenuItem, null, label))),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } }))))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.uigoodies',
    widgets: {
        'org.rd.plugin.uigoodies.EditOrViewCurrent': EditOrViewCurrent,
        'org.rd.plugin.uigoodies.PublishOrRequestPublish': PublishOrRequestPublish
    }
};

export { EditOrViewCurrent, PublishOrRequestPublish, plugin as default };
