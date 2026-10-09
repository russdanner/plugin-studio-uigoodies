const { jsx, Fragment, jsxs } = craftercms.libs.reactJsxRuntime;
const { useSelector, useDispatch, useStore } = craftercms.libs.ReactRedux;
const { Tooltip, useTheme, accordionClasses, accordionSummaryClasses, Accordion, AccordionSummary, Typography, AccordionDetails, Button: Button$1, CircularProgress, alpha, buttonClasses, Backdrop, Alert, Paper, Box: Box$1, AlertTitle, Dialog, FormControl, TextField: TextField$1, InputAdornment, IconButton: IconButton$1, FormHelperText, Stack, Autocomplete, TableRow, TableCell, Menu: Menu$1, MenuItem: MenuItem$1, FormControlLabel, Checkbox: Checkbox$1, Divider, Chip, Table, TableHead, TableBody, Slider, ToggleButtonGroup, ToggleButton, InputLabel, Select, Switch, ButtonGroup, ListItemButton, ListItemText, DialogTitle, DialogContent, Tabs, Tab, DialogActions, RadioGroup, Radio, Collapse: Collapse$1, Breadcrumbs, Link, List, ListItemIcon } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Button = craftercms.libs.MaterialUI.Button && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Button, 'default') ? craftercms.libs.MaterialUI.Button['default'] : craftercms.libs.MaterialUI.Button;
const SystemIcon = craftercms.components.SystemIcon && Object.prototype.hasOwnProperty.call(craftercms.components.SystemIcon, 'default') ? craftercms.components.SystemIcon['default'] : craftercms.components.SystemIcon;
const { isItemLockedForMe } = craftercms.utils.content;
const React = craftercms.libs.React;
const { useState, useRef, useReducer, useEffect, useMemo, useCallback, createElement } = craftercms.libs.React;
const React__default = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;
const { SystemIcon: SystemIcon$1, WidgetsGrid, PublishOnDemandForm, DialogHeader, DialogBody, BasePathSelector, DialogFooter: DialogFooter$1 } = craftercms.components;
const ExpandMore = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreOutlined');
const { createCustomDocumentEventListener } = craftercms.utils.dom;
const TextField = craftercms.libs.MaterialUI.TextField && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.TextField, 'default') ? craftercms.libs.MaterialUI.TextField['default'] : craftercms.libs.MaterialUI.TextField;
const Container = craftercms.libs.MaterialUI.Container && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Container, 'default') ? craftercms.libs.MaterialUI.Container['default'] : craftercms.libs.MaterialUI.Container;
const Box = craftercms.libs.MaterialUI.Box && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Box, 'default') ? craftercms.libs.MaterialUI.Box['default'] : craftercms.libs.MaterialUI.Box;
const { writeContent, fetchChildrenByPath, checkPathExistence, fetchDetailedItems, fetchContentXML, updateField, fetchItemsByPath, uploadDataUrl } = craftercms.services.content;
const { DialogFooter, PathNavigator } = craftercms.components;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const Tooltip$1 = craftercms.libs.MaterialUI.Tooltip && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Tooltip, 'default') ? craftercms.libs.MaterialUI.Tooltip['default'] : craftercms.libs.MaterialUI.Tooltip;
const { pull, push: push$1 } = craftercms.services.repositories;
const DownloadIcon = craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DownloadOutlined');
const PublishIcon = craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PublishOutlined');
const Snackbar = craftercms.libs.MaterialUI.Snackbar && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Snackbar, 'default') ? craftercms.libs.MaterialUI.Snackbar['default'] : craftercms.libs.MaterialUI.Snackbar;
const { defineMessages, useIntl, FormattedMessage } = craftercms.libs.ReactIntl;
const { nou } = craftercms.utils.object;
const { lookupItemByPath } = craftercms.utils.content;
const { hasInitialPublish, fetchAll } = craftercms.services.sites;
const { fetchPublishingTargets, bulkGoLive } = craftercms.services.publishing;
const { isBlank } = craftercms.utils.string;
const { useTheme: useTheme$1, useThemeProps: useThemeProps$2, styled, alpha: alpha$1 } = craftercms.libs.MaterialUI;
const InfoOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/InfoOutlined');
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const ExpandMoreRounded = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded');
const { createSvgIcon } = craftercms.libs.MaterialUI;
const ItemPublishingTargetIcon = craftercms.components.ItemPublishingTargetIcon && Object.prototype.hasOwnProperty.call(craftercms.components.ItemPublishingTargetIcon, 'default') ? craftercms.components.ItemPublishingTargetIcon['default'] : craftercms.components.ItemPublishingTargetIcon;
const ItemStateIcon = craftercms.components.ItemStateIcon && Object.prototype.hasOwnProperty.call(craftercms.components.ItemStateIcon, 'default') ? craftercms.components.ItemStateIcon['default'] : craftercms.components.ItemStateIcon;
const ItemTypeIcon = craftercms.components.ItemTypeIcon && Object.prototype.hasOwnProperty.call(craftercms.components.ItemTypeIcon, 'default') ? craftercms.components.ItemTypeIcon['default'] : craftercms.components.ItemTypeIcon;
const CheckRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded');
const ErrorRounded = craftercms.utils.constants.components.get('@mui/icons-material/ErrorRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ErrorRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ErrorRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ErrorRounded');
const KeyboardArrowLeftRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowLeftRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowLeftRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowLeftRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowLeftRounded');
const ArrowRightRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ArrowRightRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ArrowRightRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ArrowRightRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ArrowRightRounded');
const ArrowDropDownRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded');
const { withoutIndex, getRootPath, getIndividualPaths, withoutFile, withIndex } = craftercms.utils.path;
const { takeUntil, map, catchError, take, filter, mergeMap, toArray, concatMap } = craftercms.libs.rxjs;
const { Subject, of, firstValueFrom, from } = craftercms.libs.rxjs;
const Collapse = craftercms.libs.MaterialUI.Collapse && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Collapse, 'default') ? craftercms.libs.MaterialUI.Collapse['default'] : craftercms.libs.MaterialUI.Collapse;
const Checkbox = craftercms.libs.MaterialUI.Checkbox && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Checkbox, 'default') ? craftercms.libs.MaterialUI.Checkbox['default'] : craftercms.libs.MaterialUI.Checkbox;
const { postJSON, getGlobalHeaders, post, get: get$1 } = craftercms.utils.ajax;
const Popover = craftercms.libs.MaterialUI.Popover && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Popover, 'default') ? craftercms.libs.MaterialUI.Popover['default'] : craftercms.libs.MaterialUI.Popover;
const Paper$1 = craftercms.libs.MaterialUI.Paper && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Paper, 'default') ? craftercms.libs.MaterialUI.Paper['default'] : craftercms.libs.MaterialUI.Paper;
const Typography$1 = craftercms.libs.MaterialUI.Typography && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Typography, 'default') ? craftercms.libs.MaterialUI.Typography['default'] : craftercms.libs.MaterialUI.Typography;
const Alert$1 = craftercms.libs.MaterialUI.Alert && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Alert, 'default') ? craftercms.libs.MaterialUI.Alert['default'] : craftercms.libs.MaterialUI.Alert;
const PreviewAudiencesPanel = craftercms.components.PreviewAudiencesPanel && Object.prototype.hasOwnProperty.call(craftercms.components.PreviewAudiencesPanel, 'default') ? craftercms.components.PreviewAudiencesPanel['default'] : craftercms.components.PreviewAudiencesPanel;
const { createLookupTable } = craftercms.utils.object;
const PreviewSimulatorPanel = craftercms.components.PreviewSimulatorPanel && Object.prototype.hasOwnProperty.call(craftercms.components.PreviewSimulatorPanel, 'default') ? craftercms.components.PreviewSimulatorPanel['default'] : craftercms.components.PreviewSimulatorPanel;
const CropRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CropRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CropRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CropRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CropRounded');
const CenterFocusStrongRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CenterFocusStrongRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CenterFocusStrongRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CenterFocusStrongRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CenterFocusStrongRounded');
const TuneRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/TuneRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/TuneRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/TuneRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/TuneRounded');
const PhotoSizeSelectLargeRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/PhotoSizeSelectLargeRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PhotoSizeSelectLargeRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PhotoSizeSelectLargeRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PhotoSizeSelectLargeRounded');
const AutoAwesomeRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AutoAwesomeRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AutoAwesomeRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AutoAwesomeRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AutoAwesomeRounded');
const BrushRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/BrushRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/BrushRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/BrushRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/BrushRounded');
const SaveRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SaveRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SaveRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SaveRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SaveRounded');
const SwapHorizRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SwapHorizRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SwapHorizRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SwapHorizRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SwapHorizRounded');
const FullscreenRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/FullscreenRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/FullscreenRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/FullscreenRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/FullscreenRounded');
const FullscreenExitRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/FullscreenExitRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/FullscreenExitRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/FullscreenExitRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/FullscreenExitRounded');
const RotateLeftRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RotateLeftRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RotateLeftRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RotateLeftRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RotateLeftRounded');
const RotateRightRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RotateRightRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RotateRightRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RotateRightRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RotateRightRounded');
const FlipRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/FlipRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/FlipRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/FlipRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/FlipRounded');
const RestartAltRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RestartAltRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RestartAltRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RestartAltRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RestartAltRounded');
const AutoFixOffRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AutoFixOffRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AutoFixOffRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AutoFixOffRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AutoFixOffRounded');
const ShowChartRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ShowChartRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ShowChartRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ShowChartRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ShowChartRounded');
const TextFieldsRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/TextFieldsRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/TextFieldsRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/TextFieldsRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/TextFieldsRounded');
const CropSquareRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CropSquareRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CropSquareRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CropSquareRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CropSquareRounded');
const CircleOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CircleOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CircleOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CircleOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CircleOutlined');
const UndoRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/UndoRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/UndoRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/UndoRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/UndoRounded');
const ZoomInRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ZoomInRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ZoomInRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ZoomInRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ZoomInRounded');
const ZoomOutRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ZoomOutRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ZoomOutRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ZoomOutRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ZoomOutRounded');
const FitScreenRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/FitScreenRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/FitScreenRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/FitScreenRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/FitScreenRounded');
const SearchRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SearchRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SearchRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SearchRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SearchRounded');
const { fetchContentTypes: fetchContentTypes$1 } = craftercms.services.contentTypes;
const Search = craftercms.components.Search && Object.prototype.hasOwnProperty.call(craftercms.components.Search, 'default') ? craftercms.components.Search['default'] : craftercms.components.Search;
const PathNavigator$1 = craftercms.components.PathNavigator && Object.prototype.hasOwnProperty.call(craftercms.components.PathNavigator, 'default') ? craftercms.components.PathNavigator['default'] : craftercms.components.PathNavigator;
const { fetchMyActivity, fetchUnpublished } = craftercms.services.dashboard;
const RefreshRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded');
const CloudUploadRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CloudUploadRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CloudUploadRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CloudUploadRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CloudUploadRounded');
const PhotoLibraryRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/PhotoLibraryRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PhotoLibraryRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PhotoLibraryRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PhotoLibraryRounded');
const ContentPasteRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded');
const CloseRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded');
const FolderRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/FolderRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/FolderRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/FolderRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/FolderRounded');
const ImageRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ImageRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ImageRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ImageRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ImageRounded');
const { search } = craftercms.services.search;
const Divider$1 = craftercms.libs.MaterialUI.Divider && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Divider, 'default') ? craftercms.libs.MaterialUI.Divider['default'] : craftercms.libs.MaterialUI.Divider;
const Stack$1 = craftercms.libs.MaterialUI.Stack && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Stack, 'default') ? craftercms.libs.MaterialUI.Stack['default'] : craftercms.libs.MaterialUI.Stack;
const Card = craftercms.libs.MaterialUI.Card && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Card, 'default') ? craftercms.libs.MaterialUI.Card['default'] : craftercms.libs.MaterialUI.Card;
const CardContent = craftercms.libs.MaterialUI.CardContent && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.CardContent, 'default') ? craftercms.libs.MaterialUI.CardContent['default'] : craftercms.libs.MaterialUI.CardContent;
const CardHeader = craftercms.libs.MaterialUI.CardHeader && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.CardHeader, 'default') ? craftercms.libs.MaterialUI.CardHeader['default'] : craftercms.libs.MaterialUI.CardHeader;
const Chip$1 = craftercms.libs.MaterialUI.Chip && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Chip, 'default') ? craftercms.libs.MaterialUI.Chip['default'] : craftercms.libs.MaterialUI.Chip;
const ContentCopyOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyOutlined');
const CircularProgress$1 = craftercms.libs.MaterialUI.CircularProgress && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.CircularProgress, 'default') ? craftercms.libs.MaterialUI.CircularProgress['default'] : craftercms.libs.MaterialUI.CircularProgress;
const FormControl$1 = craftercms.libs.MaterialUI.FormControl && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.FormControl, 'default') ? craftercms.libs.MaterialUI.FormControl['default'] : craftercms.libs.MaterialUI.FormControl;
const InputLabel$1 = craftercms.libs.MaterialUI.InputLabel && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.InputLabel, 'default') ? craftercms.libs.MaterialUI.InputLabel['default'] : craftercms.libs.MaterialUI.InputLabel;
const Select$1 = craftercms.libs.MaterialUI.Select && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Select, 'default') ? craftercms.libs.MaterialUI.Select['default'] : craftercms.libs.MaterialUI.Select;
const RefreshOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RefreshOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RefreshOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RefreshOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RefreshOutlined');
const PlaylistAddRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/PlaylistAddRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PlaylistAddRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PlaylistAddRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PlaylistAddRounded');
const HomeWorkOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/HomeWorkOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/HomeWorkOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/HomeWorkOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/HomeWorkOutlined');
const ArrowUpwardRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ArrowUpwardRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ArrowUpwardRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ArrowUpwardRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ArrowUpwardRounded');
const ArrowDownwardRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ArrowDownwardRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ArrowDownwardRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ArrowDownwardRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ArrowDownwardRounded');
const DeleteOutlineRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded');
const { fetchConfigurationXML, writeConfiguration } = craftercms.services.configuration;
const Dialog$1 = craftercms.libs.MaterialUI.Dialog && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Dialog, 'default') ? craftercms.libs.MaterialUI.Dialog['default'] : craftercms.libs.MaterialUI.Dialog;
const DialogActions$1 = craftercms.libs.MaterialUI.DialogActions && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.DialogActions, 'default') ? craftercms.libs.MaterialUI.DialogActions['default'] : craftercms.libs.MaterialUI.DialogActions;
const DialogContent$1 = craftercms.libs.MaterialUI.DialogContent && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.DialogContent, 'default') ? craftercms.libs.MaterialUI.DialogContent['default'] : craftercms.libs.MaterialUI.DialogContent;
const DialogTitle$1 = craftercms.libs.MaterialUI.DialogTitle && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.DialogTitle, 'default') ? craftercms.libs.MaterialUI.DialogTitle['default'] : craftercms.libs.MaterialUI.DialogTitle;
const FormControlLabel$1 = craftercms.libs.MaterialUI.FormControlLabel && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.FormControlLabel, 'default') ? craftercms.libs.MaterialUI.FormControlLabel['default'] : craftercms.libs.MaterialUI.FormControlLabel;
const List$1 = craftercms.libs.MaterialUI.List && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.List, 'default') ? craftercms.libs.MaterialUI.List['default'] : craftercms.libs.MaterialUI.List;
const ListItem = craftercms.libs.MaterialUI.ListItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItem, 'default') ? craftercms.libs.MaterialUI.ListItem['default'] : craftercms.libs.MaterialUI.ListItem;
const ListItemText$1 = craftercms.libs.MaterialUI.ListItemText && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItemText, 'default') ? craftercms.libs.MaterialUI.ListItemText['default'] : craftercms.libs.MaterialUI.ListItemText;
const LinkRounded = craftercms.utils.constants.components.get('@mui/icons-material/LinkRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/LinkRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/LinkRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/LinkRounded');
const KeyboardArrowDownRounded = craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowDownRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowDownRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowDownRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/KeyboardArrowDownRounded');
const { getHostToGuestBus, getHostToHostBus, getGuestToHostBus } = craftercms.utils.subjects;
const AccessibilityNewRounded = craftercms.utils.constants.components.get('@mui/icons-material/AccessibilityNewRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AccessibilityNewRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AccessibilityNewRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AccessibilityNewRounded');

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
function isPlainObject$2(obj) {
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
  return isPlainObject$2(action) && "type" in action && typeof action.type === "string";
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
  return isPlainObject$1(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject$1(value) {
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
  const isPlain = isPlainObject$1(base);
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

// region History
const showHistoryDialog = /*#__PURE__*/ createAction('SHOW_HISTORY_DIALOG');
// endregion
// region Confirm
const showConfirmDialog = /*#__PURE__*/ createAction('SHOW_CONFIRM_DIALOG');
const closeConfirmDialog = /*#__PURE__*/ createAction('CLOSE_CONFIRM_DIALOG');
// endregion
// region Publish
const showPublishDialog = /*#__PURE__*/ createAction('SHOW_PUBLISH_DIALOG');
const closePublishDialog = /*#__PURE__*/ createAction('CLOSE_PUBLISH_DIALOG');
// endregion
// region Dependencies
const showDependenciesDialog = /*#__PURE__*/ createAction('SHOW_DEPENDENCIES_DIALOG');
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
const closeWidgetDialog = /*#__PURE__*/ createAction('CLOSE_WIDGET_DIALOG');
const updateWidgetDialog = /*#__PURE__*/ createAction('UPDATE_WIDGET_DIALOG');
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
    return useIcon ? (jsx(Tooltip, { title: item ? "".concat(label, " (shift+e)") : '', children: jsx(IconButton, { size: "small", onClick: handleClick, disabled: !item, children: jsx(SystemIcon, { icon: { id: iconId } }) }) })) : (jsx(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item, children: label }));
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
    return showButton === true ? (useIcon ? (jsx(Tooltip, { title: item ? label : '', children: jsx(IconButton, { size: "small", onClick: handleClick, disabled: !item, children: jsx(SystemIcon, { icon: { id: iconId } }) }) })) : (jsx(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item, children: label }))) : (jsx(Fragment, {}));
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    return (jsxs(Accordion, { expanded: open, onChange: function (e, isExpanded) { return setOpen(isExpanded); }, sx: __assign((_a = { boxShadow: 0 }, _a["&.".concat(expandedClass)] = { margin: 0 }, _a), sxs === null || sxs === void 0 ? void 0 : sxs.accordion), children: [jsxs(AccordionSummary, { expandIcon: jsx(ExpandMore, {}), sx: __assign((_b = { alignItems: 'center' }, _b["&, &.".concat(expandedClass)] = { minHeight: '48px' }, _b[".".concat(contentClass, ", .").concat(contentClass, ".").concat(expandedClass)] = { margin: 0 }, _b), sxs === null || sxs === void 0 ? void 0 : sxs.accordionSummary), children: [icon && jsx(SystemIcon$1, { icon: icon, style: { marginRight: '10px', color: theme.palette.action.active } }), jsx(Typography, { children: title })] }), jsx(AccordionDetails, { sx: __assign({ padding: 0 }, sxs === null || sxs === void 0 ? void 0 : sxs.accordionDetails), children: jsx(WidgetsGrid, { container: true, spacing: 0, direction: "column", widgets: props.widgets, sx: sxs === null || sxs === void 0 ? void 0 : sxs.widgetsGrid }) })] }));
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
    return (jsx(Button$1, __assign({ startIcon: loading ? jsx(CircularProgress, { size: 16 }) : undefined }, rest, { children: children })));
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
    return (jsxs(Fragment, { children: [jsxs(Container, { sx: {
                    'padding-top': '40px',
                    'padding-bottom': '40px'
                }, children: [jsxs(Box, { sx: {
                            display: 'flex',
                            marginBottom: '20px',
                            alignItems: 'center'
                        }, children: [jsx(TextField, { label: "Path to upload", id: "path-read-only-input", sx: { minWidth: '450px' }, InputProps: { readOnly: !props.allowPathInput }, value: path, onChange: props.allowPathInput
                                    ? function (e) {
                                        setPath(e.target.value);
                                    }
                                    : undefined }), props.allowPathSelection && (jsx(Button, { variant: "outlined", onClick: handleSelectPath, disabled: processing, sx: { minWidth: '130px', marginLeft: '20px' }, children: "Select Path" }))] }), jsx(Box, { sx: function (theme) { return ({
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
                        }); }, children: jsx("input", { ref: inputRef, type: "file", accept: ".xml", onChange: onFileChange, onClick: function () {
                                inputRef.current.value = null;
                            } }) })] }), jsx(DialogFooter, { children: jsx(MyLoadingButton, { variant: "contained", onClick: handleUploadXMLFile, loading: processing, disabled: !content, sx: { minWidth: '130px' }, children: "Upload Content" }) })] }));
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
var IMAGE_STUDIO_DEFAULTS = {
    title: 'Image Studio',
    defaultPath: '/static-assets/images',
    icon: { id: '@mui/icons-material/PhotoLibraryRounded' }
};
function useOpenImageStudio(props) {
    var dispatch = useDispatch();
    return function () {
        var _a, _b;
        return dispatch(showWidgetDialog({
            title: (_a = props.title) !== null && _a !== void 0 ? _a : IMAGE_STUDIO_DEFAULTS.title,
            fullHeight: true,
            fullWidth: true,
            isFullScreen: false,
            onFullScreen: updateWidgetDialog({ isFullScreen: true }),
            onCancelFullScreen: updateWidgetDialog({ isFullScreen: false }),
            widget: {
                id: 'org.rd.plugin.uigoodies.ImageStudio',
                configuration: {
                    defaultPath: (_b = props.defaultPath) !== null && _b !== void 0 ? _b : IMAGE_STUDIO_DEFAULTS.defaultPath
                }
            }
        }));
    };
}
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
    return jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick });
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
        return useIcon || props.tooltip ? jsx(Tooltip$1, { title: tooltip, children: children }) : children;
    };
    return applyTooltip(useIcon ? (jsx(IconButton, { size: buttonSize, onClick: handleClick, children: jsx(SystemIcon, { icon: icon }) })) : (jsx(Button$1, { size: buttonSize, onClick: handleClick, startIcon: useIconWithText ? jsx(SystemIcon, { icon: icon }) : void 0, sx: (_a = {}, _a[".".concat(buttonClasses.startIcon)] = { mr: 0.5 }, _a), children: title })));
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
        push$1(siteId, remoteName, pushBranch, false).subscribe({
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
    return (jsxs(Fragment, { children: [useIcon ? (jsxs(Fragment, { children: [shouldShowButton(enablePull) ? (jsx(Tooltip, { title: pullLabel ? pullLabel : "Pull", children: jsx(IconButton, { size: "small", onClick: handlePullClick, children: jsx(DownloadIcon, {}) }) })) : (jsx(Fragment, {})), shouldShowButton(enablePush) ? (jsx(Tooltip, { title: pushLabel ? pushLabel : "Push", children: jsx(IconButton, { size: "small", onClick: handlePushClick, children: jsx(PublishIcon, {}) }) })) : (jsx(Fragment, {}))] })) : (jsxs(Fragment, { children: [shouldShowButton(enablePull) ? (jsx(Button, { size: "small", variant: "text", onClick: handlePullClick, children: pullLabel ? pullLabel : "Pull" })) : (jsx(Fragment, {})), shouldShowButton(enablePush) ? (jsx(Button, { size: "small", variant: "text", onClick: handlePushClick, children: pushLabel ? pushLabel : "Push" })) : (jsx(Fragment, {}))] })), jsxs(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow, children: [jsx(CircularProgress, { color: "inherit" }), jsx(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 5000, onClose: handleSnackClose, children: jsx(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' }, children: snackMessage }) })] })] }));
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

function useSpreadState(initialState, init) {
  return useReducer(
    (state, nextState) => (nextState === '$RESET$' ? { ...initialState } : { ...state, ...nextState }),
    initialState,
    init
  );
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
var messages = defineMessages({
    publishStudioWarning: {
        id: 'publishingDashboard.warning',
        defaultMessage: "This will force publish all items that match the pattern requested including their dependencies, and it may take a long time depending on the number of items. Please make sure that all modified items (including potentially someone's work in progress) are ready to be published before continuing."
    },
    warningLabel: {
        id: 'words.warning',
        defaultMessage: 'Warning'
    },
    publishStudioNote: {
        id: 'publishingDashboard.studioNote',
        defaultMessage: 'Publishing by path should be used to publish changes made in Studio via the UI. For changes made via direct git actions, please <a>publish by commit or tag</a>.'
    },
    publishSuccess: {
        id: 'publishingDashboard.publishSuccess',
        defaultMessage: 'Published successfully.'
    },
    bulkPublishStarted: {
        id: 'publishingDashboard.bulkPublishStarted',
        defaultMessage: 'Bulk Publish process has been started.'
    },
    invalidForm: {
        id: 'publishingDashboard.invalidForm',
        defaultMessage: 'You cannot publish until form requirements are satisfied.'
    }
});
function BulkPublishView(props) {
    var _a, _b, _c;
    var formatMessage = useIntl().formatMessage;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var theme = useTheme$1();
    var permissionsBySite = usePermissionsBySite();
    var hasPublishPermission = (_a = permissionsBySite[siteId]) === null || _a === void 0 ? void 0 : _a.includes('publish');
    var initialPublishItem = useDetailedItem('/site/website/index.xml');
    var _d = useState((_b = props.defaultPath) !== null && _b !== void 0 ? _b : BULK_PUBLISH_DEFAULTS.defaultPath), path = _d[0], setPath = _d[1];
    var _e = useState(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
    var _f = useSelection(function (state) { return state.uiConfig.publishing; }), bulkPublishCommentRequired = _f.bulkPublishCommentRequired, publishByCommitCommentRequired = _f.publishByCommitCommentRequired;
    var initialPublishStudioFormData = {
        path: (_c = props.defaultPath) !== null && _c !== void 0 ? _c : BULK_PUBLISH_DEFAULTS.defaultPath,
        publishingTarget: '',
        comment: ''
    };
    var _g = useSpreadState(initialPublishStudioFormData), publishStudioFormData = _g[0], setPublishStudioFormData = _g[1];
    var _h = useState(null), hasInitialPublish$1 = _h[0], setHasInitialPublish = _h[1];
    var _j = useState(null), publishingTargets = _j[0], setPublishingTargets = _j[1];
    var _k = useState(null), publishingTargetsError = _k[0], setPublishingTargetsError = _k[1];
    var publishStudioFormValid = !isBlank(publishStudioFormData.publishingTarget) &&
        (!bulkPublishCommentRequired || !isBlank(publishStudioFormData.comment)) &&
        publishStudioFormData.path.replace(/\s/g, '') !== '';
    var setDefaultPublishingTarget = function (targets, clearData) {
        var _a;
        if (targets.length) {
            var stagingEnv = targets.find(function (target) { return target.name === 'staging'; });
            var publishingTarget = (_a = stagingEnv === null || stagingEnv === void 0 ? void 0 : stagingEnv.name) !== null && _a !== void 0 ? _a : targets[0].name;
            setPublishStudioFormData(__assign(__assign({}, (clearData)), { publishingTarget: publishingTarget }));
        }
    };
    useEffect(function () {
        hasInitialPublish(siteId).subscribe({
            next: function (response) {
                setHasInitialPublish(response);
            },
            error: function (error) {
                dispatch(showErrorDialog(error));
            }
        });
        fetchPublishingTargets(siteId).subscribe({
            next: function (_a) {
                var targets = _a.publishingTargets;
                setPublishingTargets(targets);
                // Set pre-selected environment.
                setDefaultPublishingTarget(targets);
            },
            error: function (error) {
                setPublishingTargetsError(error);
            }
        });
        // We only want to re-fetch the publishingTargets when the site changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [siteId]);
    var onSubmitBulkPublish = function () {
        var eventId = 'bulkPublishWidgetSubmit';
        var studioNote = formatMessage(messages.publishStudioNote, { a: function (msg) { return msg[0]; } });
        dispatch(showConfirmDialog({
            body: "".concat(formatMessage(messages.publishStudioWarning), " ").concat(studioNote),
            onCancel: batchActions([closeConfirmDialog(), dispatchDOMEvent({ id: eventId, button: 'cancel' })]),
            onOk: batchActions([closeConfirmDialog(), dispatchDOMEvent({ id: eventId, button: 'ok' })])
        }));
        createCustomDocumentEventListener(eventId, function (_a) {
            var button = _a.button;
            if (button === 'ok') {
                setIsSubmitting(true);
                var path_1 = publishStudioFormData.path, publishingTarget_1 = publishStudioFormData.publishingTarget, comment = publishStudioFormData.comment;
                bulkGoLive(siteId, path_1, publishingTarget_1, comment).subscribe({
                    next: function () {
                        setIsSubmitting(false);
                        setPublishStudioFormData(__assign(__assign({}, initialPublishStudioFormData), { publishingTarget: publishingTarget_1 }));
                        dispatch(showSystemNotification({
                            message: formatMessage(messages.bulkPublishStarted)
                        }));
                    },
                    error: function (_a) {
                        var response = _a.response;
                        setIsSubmitting(false);
                        showSystemNotification({
                            message: response.message,
                            options: { variant: 'error' }
                        });
                    }
                });
            }
        });
    };
    var customEventId = 'dialogDismissConfirm';
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
        setPath(value);
        setPublishStudioFormData(__assign(__assign({}, publishStudioFormData), { path: value }));
    };
    if (hasInitialPublish$1 === null) {
        return (jsx(Paper, { elevation: 2, sx: { height: '100%' }, children: jsx(Typography, { children: "Loading..." }) }));
    }
    return (jsx(Paper, { elevation: 2, sx: { height: '100%' }, children: jsx(Box$1, { sx: { p: 3 }, children: hasInitialPublish$1 ? (jsxs(Fragment, { children: [jsx(Box$1, { sx: { mb: 3 }, children: jsx(PathSelector, { value: path, disabled: false, onPathSelected: onPathSelected, stripXmlIndex: false }) }), jsx(PublishOnDemandForm, { disabled: isSubmitting, formData: publishStudioFormData, setFormData: setPublishStudioFormData, mode: 'studio', publishingTargets: publishingTargets, publishingTargetsError: publishingTargetsError, bulkPublishCommentRequired: bulkPublishCommentRequired, publishByCommitCommentRequired: publishByCommitCommentRequired }), jsx(Box$1, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 3 }, children: jsx(MyLoadingButton, { variant: "contained", color: "primary", disabled: !publishStudioFormValid, loading: isSubmitting, onClick: onSubmitBulkPublish, children: "Bulk Publish" }) })] })) : (jsxs(Box$1, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: theme.spacing(2),
                    padding: theme.spacing(5)
                }, children: [jsx(InfoOutlinedIcon, { sx: {
                            color: theme.palette.text.secondary,
                            fontSize: '1.75rem'
                        } }), jsx(Typography, { variant: "body1", sx: {
                            maxWidth: '470px',
                            textAlign: 'center'
                        }, children: jsx(FormattedMessage, { id: "publishOnDemand.noInitialPublish", defaultMessage: "The project needs to undergo its initial publish before other publishing options become available" }) }), hasPublishPermission && (jsx(MyLoadingButton, { loading: false, variant: "contained", color: "primary", onClick: onInitialPublish, children: jsx(FormattedMessage, { id: "publishOnDemand.publishEntireProject", defaultMessage: "Publish Entire Project" }) }))] })) }) }));
}

function OpenBulkPublishPanelButton(props) {
    var _a = props.title, title = _a === void 0 ? BULK_PUBLISH_DEFAULTS.title : _a, _b = props.icon, icon = _b === void 0 ? BULK_PUBLISH_DEFAULTS.icon : _b, _c = props.dialogTitle, dialogTitle = _c === void 0 ? title : _c;
    var handleClick = useOpenBulkPublish(__assign(__assign({}, props), { title: dialogTitle }));
    return jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick });
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
        return useIcon || props.tooltip ? jsx(Tooltip$1, { title: tooltip, children: children }) : children;
    };
    return applyTooltip(useIcon ? (jsx(IconButton, { size: buttonSize, onClick: handleClick, children: jsx(SystemIcon, { icon: icon }) })) : (jsx(Button$1, { size: buttonSize, onClick: handleClick, startIcon: useIconWithText ? jsx(SystemIcon, { icon: icon }) : void 0, sx: (_a = {}, _a[".".concat(buttonClasses.startIcon)] = { mr: 0.5 }, _a), children: title })));
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
    return (jsxs(Fragment, { children: [useIcon ? (jsxs(Fragment, { children: [jsx(Tooltip, { title: "Copy Page URL", children: jsx(IconButton, { size: "small", onClick: handleClick, children: jsx(SystemIcon, { icon: { id: iconId } }) }) }), options && options.length > 0 && (jsx(Button, { id: "urls-select-button", variant: "text", color: "inherit", onClick: handleOptionMenuClick, "aria-controls": optionMenuAnchorEl ? 'urls-select-menu' : undefined, "aria-haspopup": "true", "aria-expanded": Boolean(optionMenuAnchorEl), sx: {
                            typography: 'subtitle1',
                            textTransform: 'none',
                            borderRadius: 1,
                            minWidth: 0
                        }, endIcon: jsx(ExpandMoreRounded, {}), children: "Copy URLs" }))] })) : (jsxs(Fragment, { children: [jsx(Button, { size: "small", variant: "text", onClick: handleClick, children: "Copy Page URL" }), options && options.length > 0 && (jsx(Tooltip, { title: "Copy more URLs", children: jsx(IconButton, { id: "urls-select-button", color: "inherit", size: "small", "aria-controls": optionMenuAnchorEl ? 'urls-select-menu' : undefined, "aria-haspopup": "true", onClick: handleOptionMenuClick, children: jsx(ExpandMoreRounded, {}) }) }))] })), options && options.length > 0 && (jsx(Menu, { id: "urls-select-menu", anchorEl: optionMenuAnchorEl, open: Boolean(optionMenuAnchorEl), onClose: function () { return setOptionMenuAnchorEl(null); }, MenuListProps: {
                    'aria-labelledby': 'urls-select-button'
                }, slotProps: {
                    paper: {
                        style: { minWidth: 132 }
                    }
                }, children: options.map(function (option) { return (jsx(MenuItem, { onClick: function () { return handleOptionSelect(option.label, option.pattern); }, children: option.label }, option.label)); }) }))] }));
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

const sortItemOperationComplete = /*#__PURE__*/ createAction('SORT_ITEM_OPERATION_COMPLETE');
const insertOperationComplete = /*#__PURE__*/ createAction('INSERT_COMPONENT_OPERATION_COMPLETE');
const insertItemOperationComplete = /*#__PURE__*/ createAction('INSERT_ITEM_OPERATION_COMPLETE');
const duplicateItemOperationComplete = /*#__PURE__*/ createAction('DUPLICATE_ITEM_OPERATION_COMPLETE');
const moveItemOperationComplete = /*#__PURE__*/ createAction('MOVE_ITEM_OPERATION_COMPLETE');
const deleteItemOperationComplete = /*#__PURE__*/ createAction('DELETE_ITEM_OPERATION_COMPLETE');
const updateFieldValueOperationComplete = /*#__PURE__*/ createAction('UPDATE_FIELD_VALUE_OPERATION_COMPLETE');
const reloadRequest = /*#__PURE__*/ createAction('RELOAD_REQUEST');
const contentTypeDropTargetsResponse = /*#__PURE__*/ createAction('CONTENT_TYPE_DROP_TARGETS_RESPONSE');
const FETCH_CONTENT_TYPES = 'FETCH_CONTENT_TYPES';
const CHANGE_CURRENT_URL = 'CHANGE_CURRENT_URL';
const fetchContentTypes = /*#__PURE__*/ createAction(FETCH_CONTENT_TYPES);
const changeCurrentUrl = /*#__PURE__*/ createAction(CHANGE_CURRENT_URL);
/*#__PURE__*/ createAction(contentTypeDropTargetsResponse.type);
// endregion
// region Navigation stack
const goToLastPage = /*#__PURE__*/ createAction('GO_TO_LAST_PAGE');

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
    return (jsx("div", { children: validConfigurationExists() ? (jsx(PathNavigator, { id: pathNavigatorId, label: props.label, rootPath: props.rootPath, onItemClicked: onItemClicked, icon: { id: props.icon }, limit: props.limit, excludes: (_b = (_a = props.excludedPaths) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [] })) : (jsxs(Alert, { severity: "warning", children: [jsx(AlertTitle, { children: "Component Preview Path Navigator plugin configuration not found" }), "Please edit the ui.xml file and configure the widget as described in the README.md."] })) }));
};

var DeleteOutlineIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
}), 'DeleteOutline');

var CheckCircleIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
}), 'CheckCircle');

var CancelIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"
}), 'Cancel');

var MoreVertIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
}), 'MoreVert');

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

function changeSite(nextSite, nextUrl = '/') {
  return {
    type: changeSite.type,
    payload: { nextSite, nextUrl }
  };
}
changeSite.type = 'CHANGE_SITE';

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

const fetchItemVersions = /*#__PURE__*/ createAction('FETCH_ITEM_VERSIONS');

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var propTypes = {exports: {}};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret () {
	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
	hasRequiredReactPropTypesSecret = 1;

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	ReactPropTypesSecret_1 = ReactPropTypesSecret;
	return ReactPropTypesSecret_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims () {
	if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
	hasRequiredFactoryWithThrowingShims = 1;

	var ReactPropTypesSecret = /*@__PURE__*/ requireReactPropTypesSecret();

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  }	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredPropTypes;

function requirePropTypes () {
	if (hasRequiredPropTypes) return propTypes.exports;
	hasRequiredPropTypes = 1;
	{
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  propTypes.exports = /*@__PURE__*/ requireFactoryWithThrowingShims()();
	}
	return propTypes.exports;
}

var propTypesExports = /*@__PURE__*/ requirePropTypes();
var PropTypes = /*@__PURE__*/getDefaultExportFromCjs(propTypesExports);

/* eslint no-restricted-syntax: 0, prefer-template: 0, guard-for-in: 0
   ---
   These rules are preventing the performance optimizations below.
 */

/**
 * Compose classes from multiple sources.
 *
 * @example
 * ```tsx
 * const slots = {
 *  root: ['root', 'primary'],
 *  label: ['label'],
 * };
 *
 * const getUtilityClass = (slot) => `MuiButton-${slot}`;
 *
 * const classes = {
 *   root: 'my-root-class',
 * };
 *
 * const output = composeClasses(slots, getUtilityClass, classes);
 * // {
 * //   root: 'MuiButton-root MuiButton-primary my-root-class',
 * //   label: 'MuiButton-label',
 * // }
 * ```
 *
 * @param slots a list of classes for each possible slot
 * @param getUtilityClass a function to resolve the class based on the slot name
 * @param classes the input classes from props
 * @returns the resolved classes for all slots
 */
function composeClasses(slots, getUtilityClass, classes = undefined) {
  const output = {};
  for (const slotName in slots) {
    const slot = slots[slotName];
    let buffer = '';
    let start = true;
    for (let i = 0; i < slot.length; i += 1) {
      const value = slot[i];
      if (value) {
        buffer += (start === true ? '' : ' ') + getUtilityClass(value);
        start = false;
        if (classes && classes[value]) {
          buffer += ' ' + classes[value];
        }
      }
    }
    output[slotName] = buffer;
  }
  return output;
}

/**
 * Merges refs into a single memoized callback ref or `null`.
 *
 * ```tsx
 * const rootRef = React.useRef<Instance>(null);
 * const refFork = useForkRef(rootRef, props.ref);
 *
 * return (
 *   <Root {...props} ref={refFork} />
 * );
 * ```
 *
 * @param {Array<React.Ref<Instance> | undefined>} refs The ref array.
 * @returns {React.RefCallback<Instance> | null} The new ref callback.
 */
function useForkRef(...refs) {
  const cleanupRef = React.useRef(undefined);
  const refEffect = React.useCallback(instance => {
    const cleanups = refs.map(ref => {
      if (ref == null) {
        return null;
      }
      if (typeof ref === 'function') {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === 'function' ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach(refCleanup => refCleanup?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }
    return value => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = undefined;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- intentionally ignoring that the dependency array must be an array literal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isHostComponent(element) {
  return typeof element === 'string';
}

/**
 * Type of the ownerState based on the type of an element it applies to.
 * This resolves to the provided OwnerState for React components and `undefined` for host components.
 * Falls back to `OwnerState | undefined` when the exact type can't be determined in development time.
 */

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node or undefined, `ownerState` is not applied.
 * @param otherProps Props of the element.
 * @param ownerState
 */
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === undefined || isHostComponent(elementType)) {
    return otherProps;
  }
  return {
    ...otherProps,
    ownerState: {
      ...otherProps.ownerState,
      ...ownerState
    }
  };
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */
function extractEventHandlers(object, excludeKeys = []) {
  if (object === undefined) {
    return {};
  }
  const result = {};
  Object.keys(object).filter(prop => prop.match(/^on[A-Z]/) && typeof object[prop] === 'function' && !excludeKeys.includes(prop)).forEach(prop => {
    result[prop] = object[prop];
  });
  return result;
}

/**
 * Removes event handlers from the given object.
 * A field is considered an event handler if it is a function with a name beginning with `on`.
 *
 * @param object Object to remove event handlers from.
 * @returns Object with event handlers removed.
 */
function omitEventHandlers(object) {
  if (object === undefined) {
    return {};
  }
  const result = {};
  Object.keys(object).filter(prop => !(prop.match(/^on[A-Z]/) && typeof object[prop] === 'function')).forEach(prop => {
    result[prop] = object[prop];
  });
  return result;
}

/**
 * Merges the slot component internal props (usually coming from a hook)
 * with the externally provided ones.
 *
 * The merge order is (the latter overrides the former):
 * 1. The internal props (specified as a getter function to work with get*Props hook result)
 * 2. Additional props (specified internally on a Base UI component)
 * 3. External props specified on the owner component. These should only be used on a root slot.
 * 4. External props specified in the `slotProps.*` prop.
 * 5. The `className` prop - combined from all the above.
 * @param parameters
 * @returns
 */
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    // The simpler case - getSlotProps is not defined, so no internal event handlers are defined,
    // so we can simply merge all the props without having to worry about extracting event handlers.
    const joinedClasses = clsx(additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
    const mergedStyle = {
      ...additionalProps?.style,
      ...externalForwardedProps?.style,
      ...externalSlotProps?.style
    };
    const props = {
      ...additionalProps,
      ...externalForwardedProps,
      ...externalSlotProps
    };
    if (joinedClasses.length > 0) {
      props.className = joinedClasses;
    }
    if (Object.keys(mergedStyle).length > 0) {
      props.style = mergedStyle;
    }
    return {
      props,
      internalRef: undefined
    };
  }

  // In this case, getSlotProps is responsible for calling the external event handlers.
  // We don't need to include them in the merged props because of this.

  const eventHandlers = extractEventHandlers({
    ...externalForwardedProps,
    ...externalSlotProps
  });
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);

  // The order of classes is important here.
  // Emotion (that we use in libraries consuming Base UI) depends on this order
  // to properly override style. It requires the most important classes to be last
  // (see https://github.com/mui/material-ui/pull/33205) for the related discussion.
  const joinedClasses = clsx(internalSlotProps?.className, additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
  const mergedStyle = {
    ...internalSlotProps?.style,
    ...additionalProps?.style,
    ...externalForwardedProps?.style,
    ...externalSlotProps?.style
  };
  const props = {
    ...internalSlotProps,
    ...additionalProps,
    ...otherPropsWithoutEventHandlers,
    ...componentsPropsWithoutEventHandlers
  };
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}

/**
 * If `componentProps` is a function, calls it with the provided `ownerState`.
 * Otherwise, just returns `componentProps`.
 */
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === 'function') {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}

/**
 * @ignore - do not document.
 * Builds the props to be passed into the slot of an unstyled component.
 * It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
 * If the slot component is not a host component, it also merges in the `ownerState`.
 *
 * @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
 */
function useSlotProps(parameters) {
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false,
    ...other
  } = parameters;
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps({
    ...other,
    externalSlotProps: resolvedComponentsProps
  });
  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
  const props = appendOwnerState(elementType, {
    ...mergedProps,
    ref
  }, ownerState);
  return props;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createUseThemeProps(name) {
  return useThemeProps$2;
}

const defaultGenerator = componentName => componentName;
const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
};
const ClassNameGenerator = createClassNameGenerator();

const globalStateClasses = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  open: 'open',
  readOnly: 'readOnly',
  required: 'required',
  selected: 'selected'
};
function generateUtilityClass(componentName, slot, globalStatePrefix = 'Mui') {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator.generate(componentName)}-${slot}`;
}

function generateUtilityClasses(componentName, slots, globalStatePrefix = 'Mui') {
  const result = {};
  slots.forEach(slot => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}

function getSimpleTreeViewUtilityClass(slot) {
  return generateUtilityClass('MuiSimpleTreeView', slot);
}
generateUtilityClasses('MuiSimpleTreeView', ['root']);

/**
 * Implements the same behavior as `useControlled` but for several models.
 * The controlled models are never stored in the state, and the state is only updated if the model is not controlled.
 */
const useTreeViewModels = (plugins, props) => {
  const modelsRef = React.useRef({});
  const [modelsState, setModelsState] = React.useState(() => {
    const initialState = {};
    plugins.forEach(plugin => {
      if (plugin.models) {
        Object.entries(plugin.models).forEach(([modelName, modelInitializer]) => {
          modelsRef.current[modelName] = {
            isControlled: props[modelName] !== undefined,
            getDefaultValue: modelInitializer.getDefaultValue
          };
          initialState[modelName] = modelInitializer.getDefaultValue(props);
        });
      }
    });
    return initialState;
  });
  const models = Object.fromEntries(Object.entries(modelsRef.current).map(([modelName, model]) => {
    const value = props[modelName] ?? modelsState[modelName];
    return [modelName, {
      value,
      setControlledValue: newValue => {
        if (!model.isControlled) {
          setModelsState(prevState => _extends({}, prevState, {
            [modelName]: newValue
          }));
        }
      }
    }];
  }));
  /* eslint-enable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */

  return models;
};

// Used https://gist.github.com/mudge/5830382 as a starting point.
// See https://github.com/browserify/events/blob/master/events.js for
// the Node.js (https://nodejs.org/api/events.html) polyfill used by webpack.
class EventManager {
  constructor() {
    this.maxListeners = 20;
    this.warnOnce = false;
    this.events = {};
  }
  on(eventName, listener, options = {}) {
    let collection = this.events[eventName];
    if (!collection) {
      collection = {
        highPriority: new Map(),
        regular: new Map()
      };
      this.events[eventName] = collection;
    }
    if (options.isFirst) {
      collection.highPriority.set(listener, true);
    } else {
      collection.regular.set(listener, true);
    }
  }
  removeListener(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].regular.delete(listener);
      this.events[eventName].highPriority.delete(listener);
    }
  }
  removeAllListeners() {
    this.events = {};
  }
  emit(eventName, ...args) {
    const collection = this.events[eventName];
    if (!collection) {
      return;
    }
    const highPriorityListeners = Array.from(collection.highPriority.keys());
    const regularListeners = Array.from(collection.regular.keys());
    for (let i = highPriorityListeners.length - 1; i >= 0; i -= 1) {
      const listener = highPriorityListeners[i];
      if (collection.highPriority.has(listener)) {
        listener.apply(this, args);
      }
    }
    for (let i = 0; i < regularListeners.length; i += 1) {
      const listener = regularListeners[i];
      if (collection.regular.has(listener)) {
        listener.apply(this, args);
      }
    }
  }
  once(eventName, listener) {
    // eslint-disable-next-line consistent-this
    const that = this;
    this.on(eventName, function oneTimeListener(...args) {
      that.removeListener(eventName, oneTimeListener);
      listener.apply(that, args);
    });
  }
}

const isSyntheticEvent = event => {
  return event.isPropagationStopped !== undefined;
};
const useTreeViewInstanceEvents = () => {
  const [eventManager] = React.useState(() => new EventManager());
  const publishEvent = React.useCallback((...args) => {
    const [name, params, event = {}] = args;
    event.defaultMuiPrevented = false;
    if (isSyntheticEvent(event) && event.isPropagationStopped()) {
      return;
    }
    eventManager.emit(name, params, event);
  }, [eventManager]);
  const subscribeEvent = React.useCallback((event, handler) => {
    eventManager.on(event, handler);
    return () => {
      eventManager.removeListener(event, handler);
    };
  }, [eventManager]);
  return {
    instance: {
      $$publishEvent: publishEvent,
      $$subscribeEvent: subscribeEvent
    }
  };
};
useTreeViewInstanceEvents.params = {};

const useTreeViewOptionalPlugins = ({
  plugins
}) => {
  const pluginSet = new Set(plugins);
  const getAvailablePlugins = () => pluginSet;
  return {
    instance: {
      getAvailablePlugins
    }
  };
};
useTreeViewOptionalPlugins.params = {};

let globalTreeViewDefaultId = 0;
const createTreeViewDefaultId = () => {
  globalTreeViewDefaultId += 1;
  return `mui-tree-view-${globalTreeViewDefaultId}`;
};

/**
 * Generate the id attribute (i.e.: the `id` attribute passed to the DOM element) of a Tree Item.
 * If the user explicitly defined an id attribute, it will be returned.
 * Otherwise, the method creates a unique id for the item based on the Tree View id attribute and the item `itemId`
 * @param {object} params The parameters to determine the id attribute of the item.
 * @param {TreeViewItemId} params.itemId The id of the item to get the id attribute of.
 * @param {string | undefined} params.idAttribute The id attribute of the item if explicitly defined by the user.
 * @param {string} params.treeId The id attribute of the Tree View.
 * @returns {string} The id attribute of the item.
 */
const generateTreeItemIdAttribute = ({
  id,
  treeId = '',
  itemId
}) => {
  if (id != null) {
    return id;
  }
  return `${treeId}-${itemId}`;
};

const useTreeViewId = ({
  params,
  state,
  setState
}) => {
  React.useEffect(() => {
    setState(prevState => {
      if (prevState.id.treeId === params.id && prevState.id.treeId !== undefined) {
        return prevState;
      }
      return _extends({}, prevState, {
        id: _extends({}, prevState.id, {
          treeId: params.id ?? createTreeViewDefaultId()
        })
      });
    });
  }, [setState, params.id]);
  const treeId = params.id ?? state.id.treeId;
  return {
    getRootProps: () => ({
      id: treeId
    }),
    contextValue: {
      treeId
    }
  };
};
useTreeViewId.params = {
  id: true
};
useTreeViewId.getInitialState = ({
  id
}) => ({
  id: {
    treeId: id ?? undefined
  }
});

/**
 * Internal plugins that create the tools used by the other plugins.
 * These plugins are used by the Tree View components.
 */
const TREE_VIEW_CORE_PLUGINS = [useTreeViewInstanceEvents, useTreeViewOptionalPlugins, useTreeViewId];

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

const _excluded$3 = ["slots", "slotProps", "apiRef", "experimentalFeatures"];
const extractPluginParamsFromProps = _ref => {
  let {
      props: {
        slots,
        slotProps,
        apiRef,
        experimentalFeatures: inExperimentalFeatures
      },
      plugins
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref.props, _excluded$3);
  const paramsLookup = {};
  plugins.forEach(plugin => {
    Object.assign(paramsLookup, plugin.params);
  });
  const pluginParams = {};
  const forwardedProps = {};
  Object.keys(props).forEach(propName => {
    const prop = props[propName];
    if (paramsLookup[propName]) {
      pluginParams[propName] = prop;
    } else {
      forwardedProps[propName] = prop;
    }
  });
  const experimentalFeatures = inExperimentalFeatures ?? {};
  const defaultizedPluginParams = plugins.reduce((acc, plugin) => {
    if (plugin.getDefaultizedParams) {
      return plugin.getDefaultizedParams({
        params: acc,
        experimentalFeatures
      });
    }
    return acc;
  }, pluginParams);
  return {
    apiRef,
    forwardedProps,
    pluginParams: defaultizedPluginParams,
    slots: slots ?? {},
    slotProps: slotProps ?? {},
    experimentalFeatures
  };
};

const useTreeViewBuildContext = ({
  plugins,
  instance,
  publicAPI,
  rootRef
}) => {
  const runItemPlugins = itemPluginProps => {
    let finalRootRef = null;
    let finalContentRef = null;
    const pluginPropEnhancers = [];
    const pluginPropEnhancersNames = {};
    plugins.forEach(plugin => {
      if (!plugin.itemPlugin) {
        return;
      }
      const itemPluginResponse = plugin.itemPlugin({
        props: itemPluginProps,
        rootRef: finalRootRef,
        contentRef: finalContentRef
      });
      if (itemPluginResponse?.rootRef) {
        finalRootRef = itemPluginResponse.rootRef;
      }
      if (itemPluginResponse?.contentRef) {
        finalContentRef = itemPluginResponse.contentRef;
      }
      if (itemPluginResponse?.propsEnhancers) {
        pluginPropEnhancers.push(itemPluginResponse.propsEnhancers);

        // Prepare a list of all the slots which are enhanced by at least one plugin
        Object.keys(itemPluginResponse.propsEnhancers).forEach(propsEnhancerName => {
          pluginPropEnhancersNames[propsEnhancerName] = true;
        });
      }
    });
    const resolvePropsEnhancer = currentSlotName => currentSlotParams => {
      const enhancedProps = {};
      pluginPropEnhancers.forEach(propsEnhancersForCurrentPlugin => {
        const propsEnhancerForCurrentPluginAndSlot = propsEnhancersForCurrentPlugin[currentSlotName];
        if (propsEnhancerForCurrentPluginAndSlot != null) {
          Object.assign(enhancedProps, propsEnhancerForCurrentPluginAndSlot(currentSlotParams));
        }
      });
      return enhancedProps;
    };
    const propsEnhancers = Object.fromEntries(Object.keys(pluginPropEnhancersNames).map(propEnhancerName => [propEnhancerName, resolvePropsEnhancer(propEnhancerName)]));
    return {
      contentRef: finalContentRef,
      rootRef: finalRootRef,
      propsEnhancers
    };
  };
  const wrapItem = ({
    itemId,
    children
  }) => {
    let finalChildren = children;
    // The wrappers are reversed to ensure that the first wrapper is the outermost one.
    for (let i = plugins.length - 1; i >= 0; i -= 1) {
      const plugin = plugins[i];
      if (plugin.wrapItem) {
        finalChildren = plugin.wrapItem({
          itemId,
          children: finalChildren,
          instance
        });
      }
    }
    return finalChildren;
  };
  const wrapRoot = ({
    children
  }) => {
    let finalChildren = children;
    // The wrappers are reversed to ensure that the first wrapper is the outermost one.
    for (let i = plugins.length - 1; i >= 0; i -= 1) {
      const plugin = plugins[i];
      if (plugin.wrapRoot) {
        finalChildren = plugin.wrapRoot({
          children: finalChildren,
          instance
        });
      }
    }
    return finalChildren;
  };
  return {
    runItemPlugins,
    wrapItem,
    wrapRoot,
    instance,
    rootRef,
    publicAPI
  };
};

function useTreeViewApiInitialization(inputApiRef) {
  const fallbackPublicApiRef = React.useRef({});
  if (inputApiRef) {
    if (inputApiRef.current == null) {
      inputApiRef.current = {};
    }
    return inputApiRef.current;
  }
  return fallbackPublicApiRef.current;
}
const useTreeView = ({
  plugins: inPlugins,
  rootRef,
  props
}) => {
  const plugins = [...TREE_VIEW_CORE_PLUGINS, ...inPlugins];
  const {
    pluginParams,
    forwardedProps,
    apiRef,
    experimentalFeatures,
    slots,
    slotProps
  } = extractPluginParamsFromProps({
    plugins,
    props
  });
  const models = useTreeViewModels(plugins, pluginParams);
  const instanceRef = React.useRef({});
  const instance = instanceRef.current;
  const publicAPI = useTreeViewApiInitialization(apiRef);
  const innerRootRef = React.useRef(null);
  const handleRootRef = useForkRef(innerRootRef, rootRef);
  const contextValue = useTreeViewBuildContext({
    plugins,
    instance,
    publicAPI,
    rootRef: innerRootRef
  });
  const [state, setState] = React.useState(() => {
    const temp = {};
    plugins.forEach(plugin => {
      if (plugin.getInitialState) {
        Object.assign(temp, plugin.getInitialState(pluginParams));
      }
    });
    return temp;
  });
  const rootPropsGetters = [];
  const runPlugin = plugin => {
    const pluginResponse = plugin({
      instance,
      params: pluginParams,
      slots,
      slotProps,
      experimentalFeatures,
      state,
      setState,
      rootRef: innerRootRef,
      models,
      plugins
    });
    if (pluginResponse.getRootProps) {
      rootPropsGetters.push(pluginResponse.getRootProps);
    }
    if (pluginResponse.publicAPI) {
      Object.assign(publicAPI, pluginResponse.publicAPI);
    }
    if (pluginResponse.instance) {
      Object.assign(instance, pluginResponse.instance);
    }
    if (pluginResponse.contextValue) {
      Object.assign(contextValue, pluginResponse.contextValue);
    }
  };
  plugins.forEach(runPlugin);
  const getRootProps = (otherHandlers = {}) => {
    const rootProps = _extends({
      role: 'tree'
    }, forwardedProps, otherHandlers, {
      ref: handleRootRef
    });
    rootPropsGetters.forEach(rootPropsGetter => {
      Object.assign(rootProps, rootPropsGetter(otherHandlers));
    });
    return rootProps;
  };
  return {
    getRootProps,
    rootRef: handleRootRef,
    contextValue,
    instance
  };
};

/**
 * @ignore - internal component.
 */
const TreeViewContext = /*#__PURE__*/React.createContext(null);

/**
 * Sets up the contexts for the underlying TreeItem components.
 *
 * @ignore - do not document.
 */
function TreeViewProvider(props) {
  const {
    value,
    children
  } = props;
  return /*#__PURE__*/jsx(TreeViewContext.Provider, {
    value: value,
    children: value.wrapRoot({
      children,
      instance: value.instance
    })
  });
}

const useTreeViewContext = () => {
  const context = React.useContext(TreeViewContext);
  if (context == null) {
    throw new Error(['MUI X: Could not find the Tree View context.', 'It looks like you rendered your component outside of a SimpleTreeView or RichTreeView parent component.', 'This can also happen if you are bundling multiple versions of the Tree View.'].join('\n'));
  }
  return context;
};

const publishTreeViewEvent = (instance, eventName, params) => {
  instance.$$publishEvent(eventName, params);
};

const TREE_VIEW_ROOT_PARENT_ID = '__TREE_VIEW_ROOT_PARENT_ID__';
const buildSiblingIndexes = siblings => {
  const siblingsIndexLookup = {};
  siblings.forEach((childId, index) => {
    siblingsIndexLookup[childId] = index;
  });
  return siblingsIndexLookup;
};

const TreeViewItemDepthContext = /*#__PURE__*/React.createContext(() => -1);

const _excluded$2 = ["children"];
const updateItemsState = ({
  items,
  isItemDisabled,
  getItemLabel,
  getItemId
}) => {
  const itemMetaMap = {};
  const itemMap = {};
  const itemOrderedChildrenIds = {
    [TREE_VIEW_ROOT_PARENT_ID]: []
  };
  const processItem = (item, depth, parentId) => {
    const id = getItemId ? getItemId(item) : item.id;
    if (id == null) {
      throw new Error(['MUI X: The Tree View component requires all items to have a unique `id` property.', 'Alternatively, you can use the `getItemId` prop to specify a custom id for each item.', 'An item was provided without id in the `items` prop:', JSON.stringify(item)].join('\n'));
    }
    if (itemMetaMap[id] != null) {
      throw new Error(['MUI X: The Tree View component requires all items to have a unique `id` property.', 'Alternatively, you can use the `getItemId` prop to specify a custom id for each item.', `Two items were provided with the same id in the \`items\` prop: "${id}"`].join('\n'));
    }
    const label = getItemLabel ? getItemLabel(item) : item.label;
    if (label == null) {
      throw new Error(['MUI X: The Tree View component requires all items to have a `label` property.', 'Alternatively, you can use the `getItemLabel` prop to specify a custom label for each item.', 'An item was provided without label in the `items` prop:', JSON.stringify(item)].join('\n'));
    }
    itemMetaMap[id] = {
      id,
      label,
      parentId,
      idAttribute: undefined,
      expandable: !!item.children?.length,
      disabled: isItemDisabled ? isItemDisabled(item) : false,
      depth
    };
    itemMap[id] = item;
    const parentIdWithDefault = parentId ?? TREE_VIEW_ROOT_PARENT_ID;
    if (!itemOrderedChildrenIds[parentIdWithDefault]) {
      itemOrderedChildrenIds[parentIdWithDefault] = [];
    }
    itemOrderedChildrenIds[parentIdWithDefault].push(id);
    item.children?.forEach(child => processItem(child, depth + 1, id));
  };
  items.forEach(item => processItem(item, 0, null));
  const itemChildrenIndexes = {};
  Object.keys(itemOrderedChildrenIds).forEach(parentId => {
    itemChildrenIndexes[parentId] = buildSiblingIndexes(itemOrderedChildrenIds[parentId]);
  });
  return {
    itemMetaMap,
    itemMap,
    itemOrderedChildrenIds,
    itemChildrenIndexes
  };
};
const useTreeViewItems = ({
  instance,
  params,
  state,
  setState,
  experimentalFeatures
}) => {
  const getItemMeta = React.useCallback(itemId => state.items.itemMetaMap[itemId], [state.items.itemMetaMap]);
  const getItem = React.useCallback(itemId => state.items.itemMap[itemId], [state.items.itemMap]);
  const getItemTree = React.useCallback(() => {
    const getItemFromItemId = id => {
      const _state$items$itemMap$ = state.items.itemMap[id],
        item = _objectWithoutPropertiesLoose(_state$items$itemMap$, _excluded$2);
      const newChildren = state.items.itemOrderedChildrenIds[id];
      if (newChildren) {
        item.children = newChildren.map(getItemFromItemId);
      }
      return item;
    };
    return state.items.itemOrderedChildrenIds[TREE_VIEW_ROOT_PARENT_ID].map(getItemFromItemId);
  }, [state.items.itemMap, state.items.itemOrderedChildrenIds]);
  const isItemDisabled = React.useCallback(itemId => {
    if (itemId == null) {
      return false;
    }
    let itemMeta = instance.getItemMeta(itemId);

    // This can be called before the item has been added to the item map.
    if (!itemMeta) {
      return false;
    }
    if (itemMeta.disabled) {
      return true;
    }
    while (itemMeta.parentId != null) {
      itemMeta = instance.getItemMeta(itemMeta.parentId);
      if (itemMeta.disabled) {
        return true;
      }
    }
    return false;
  }, [instance]);
  const getItemIndex = React.useCallback(itemId => {
    const parentId = instance.getItemMeta(itemId).parentId ?? TREE_VIEW_ROOT_PARENT_ID;
    return state.items.itemChildrenIndexes[parentId][itemId];
  }, [instance, state.items.itemChildrenIndexes]);
  const getItemOrderedChildrenIds = React.useCallback(itemId => state.items.itemOrderedChildrenIds[itemId ?? TREE_VIEW_ROOT_PARENT_ID] ?? [], [state.items.itemOrderedChildrenIds]);
  const getItemDOMElement = itemId => {
    const itemMeta = instance.getItemMeta(itemId);
    if (itemMeta == null) {
      return null;
    }
    return document.getElementById(generateTreeItemIdAttribute({
      treeId: state.id.treeId,
      itemId,
      id: itemMeta.idAttribute
    }));
  };
  const isItemNavigable = itemId => {
    if (params.disabledItemsFocusable) {
      return true;
    }
    return !instance.isItemDisabled(itemId);
  };
  const areItemUpdatesPreventedRef = React.useRef(false);
  const preventItemUpdates = React.useCallback(() => {
    areItemUpdatesPreventedRef.current = true;
  }, []);
  const areItemUpdatesPrevented = React.useCallback(() => areItemUpdatesPreventedRef.current, []);
  React.useEffect(() => {
    if (instance.areItemUpdatesPrevented()) {
      return;
    }
    setState(prevState => {
      const newState = updateItemsState({
        items: params.items,
        isItemDisabled: params.isItemDisabled,
        getItemId: params.getItemId,
        getItemLabel: params.getItemLabel
      });
      Object.values(prevState.items.itemMetaMap).forEach(item => {
        if (!newState.itemMetaMap[item.id]) {
          publishTreeViewEvent(instance, 'removeItem', {
            id: item.id
          });
        }
      });
      return _extends({}, prevState, {
        items: newState
      });
    });
  }, [instance, setState, params.items, params.isItemDisabled, params.getItemId, params.getItemLabel]);
  const getItemsToRender = () => {
    const getPropsFromItemId = id => {
      const item = state.items.itemMetaMap[id];
      return {
        label: item.label,
        itemId: item.id,
        id: item.idAttribute,
        children: state.items.itemOrderedChildrenIds[id]?.map(getPropsFromItemId)
      };
    };
    return state.items.itemOrderedChildrenIds[TREE_VIEW_ROOT_PARENT_ID].map(getPropsFromItemId);
  };
  return {
    getRootProps: () => ({
      style: {
        '--TreeView-itemChildrenIndentation': typeof params.itemChildrenIndentation === 'number' ? `${params.itemChildrenIndentation}px` : params.itemChildrenIndentation
      }
    }),
    publicAPI: {
      getItem,
      getItemDOMElement,
      getItemTree,
      getItemOrderedChildrenIds
    },
    instance: {
      getItemMeta,
      getItem,
      getItemTree,
      getItemsToRender,
      getItemIndex,
      getItemDOMElement,
      getItemOrderedChildrenIds,
      isItemDisabled,
      isItemNavigable,
      preventItemUpdates,
      areItemUpdatesPrevented
    },
    contextValue: {
      items: {
        onItemClick: params.onItemClick,
        disabledItemsFocusable: params.disabledItemsFocusable,
        indentationAtItemLevel: experimentalFeatures.indentationAtItemLevel ?? false
      }
    }
  };
};
useTreeViewItems.getInitialState = params => ({
  items: updateItemsState({
    items: params.items,
    isItemDisabled: params.isItemDisabled,
    getItemId: params.getItemId,
    getItemLabel: params.getItemLabel
  })
});
useTreeViewItems.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  disabledItemsFocusable: params.disabledItemsFocusable ?? false,
  itemChildrenIndentation: params.itemChildrenIndentation ?? '12px'
});
useTreeViewItems.wrapRoot = ({
  children,
  instance
}) => {
  return /*#__PURE__*/jsx(TreeViewItemDepthContext.Provider, {
    value: itemId => instance.getItemMeta(itemId)?.depth ?? 0,
    children: children
  });
};
useTreeViewItems.params = {
  disabledItemsFocusable: true,
  items: true,
  isItemDisabled: true,
  getItemLabel: true,
  getItemId: true,
  onItemClick: true,
  itemChildrenIndentation: true
};

/**
 * A version of `React.useLayoutEffect` that does not show a warning when server-side rendering.
 * This is useful for effects that are only needed for client-side rendering but not for SSR.
 *
 * Before you use this hook, make sure to read https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * and confirm it doesn't apply to your use-case.
 */
const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */

function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useRef((...args) =>
  // @ts-expect-error hide `this`
  (0, ref.current)(...args)).current;
}

const useTreeViewExpansion = ({
  instance,
  params,
  models
}) => {
  const expandedItemsMap = React.useMemo(() => {
    const temp = new Map();
    models.expandedItems.value.forEach(id => {
      temp.set(id, true);
    });
    return temp;
  }, [models.expandedItems.value]);
  const setExpandedItems = (event, value) => {
    params.onExpandedItemsChange?.(event, value);
    models.expandedItems.setControlledValue(value);
  };
  const isItemExpanded = React.useCallback(itemId => expandedItemsMap.has(itemId), [expandedItemsMap]);
  const isItemExpandable = React.useCallback(itemId => !!instance.getItemMeta(itemId)?.expandable, [instance]);
  const toggleItemExpansion = useEventCallback((event, itemId) => {
    const isExpandedBefore = instance.isItemExpanded(itemId);
    instance.setItemExpansion(event, itemId, !isExpandedBefore);
  });
  const setItemExpansion = useEventCallback((event, itemId, isExpanded) => {
    const isExpandedBefore = instance.isItemExpanded(itemId);
    if (isExpandedBefore === isExpanded) {
      return;
    }
    let newExpanded;
    if (isExpanded) {
      newExpanded = [itemId].concat(models.expandedItems.value);
    } else {
      newExpanded = models.expandedItems.value.filter(id => id !== itemId);
    }
    if (params.onItemExpansionToggle) {
      params.onItemExpansionToggle(event, itemId, isExpanded);
    }
    setExpandedItems(event, newExpanded);
  });
  const expandAllSiblings = (event, itemId) => {
    const itemMeta = instance.getItemMeta(itemId);
    const siblings = instance.getItemOrderedChildrenIds(itemMeta.parentId);
    const diff = siblings.filter(child => instance.isItemExpandable(child) && !instance.isItemExpanded(child));
    const newExpanded = models.expandedItems.value.concat(diff);
    if (diff.length > 0) {
      if (params.onItemExpansionToggle) {
        diff.forEach(newlyExpandedItemId => {
          params.onItemExpansionToggle(event, newlyExpandedItemId, true);
        });
      }
      setExpandedItems(event, newExpanded);
    }
  };
  const expansionTrigger = React.useMemo(() => {
    if (params.expansionTrigger) {
      return params.expansionTrigger;
    }
    if (instance.isTreeViewEditable) {
      return 'iconContainer';
    }
    return 'content';
  }, [params.expansionTrigger, instance.isTreeViewEditable]);
  return {
    publicAPI: {
      setItemExpansion
    },
    instance: {
      isItemExpanded,
      isItemExpandable,
      setItemExpansion,
      toggleItemExpansion,
      expandAllSiblings
    },
    contextValue: {
      expansion: {
        expansionTrigger
      }
    }
  };
};
useTreeViewExpansion.models = {
  expandedItems: {
    getDefaultValue: params => params.defaultExpandedItems
  }
};
const DEFAULT_EXPANDED_ITEMS = [];
useTreeViewExpansion.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  defaultExpandedItems: params.defaultExpandedItems ?? DEFAULT_EXPANDED_ITEMS
});
useTreeViewExpansion.params = {
  expandedItems: true,
  defaultExpandedItems: true,
  onExpandedItemsChange: true,
  onItemExpansionToggle: true,
  expansionTrigger: true
};

const getLastNavigableItemInArray = (instance, items) => {
  // Equivalent to Array.prototype.findLastIndex
  let itemIndex = items.length - 1;
  while (itemIndex >= 0 && !instance.isItemNavigable(items[itemIndex])) {
    itemIndex -= 1;
  }
  if (itemIndex === -1) {
    return undefined;
  }
  return items[itemIndex];
};
const getPreviousNavigableItem = (instance, itemId) => {
  const itemMeta = instance.getItemMeta(itemId);
  const siblings = instance.getItemOrderedChildrenIds(itemMeta.parentId);
  const itemIndex = instance.getItemIndex(itemId);

  // TODO: What should we do if the parent is not navigable?
  if (itemIndex === 0) {
    return itemMeta.parentId;
  }

  // Finds the previous navigable sibling.
  let previousNavigableSiblingIndex = itemIndex - 1;
  while (!instance.isItemNavigable(siblings[previousNavigableSiblingIndex]) && previousNavigableSiblingIndex >= 0) {
    previousNavigableSiblingIndex -= 1;
  }
  if (previousNavigableSiblingIndex === -1) {
    // If we are at depth 0, then it means all the items above the current item are not navigable.
    if (itemMeta.parentId == null) {
      return null;
    }

    // Otherwise, we can try to go up a level and find the previous navigable item.
    return getPreviousNavigableItem(instance, itemMeta.parentId);
  }

  // Finds the last navigable ancestor of the previous navigable sibling.
  let currentItemId = siblings[previousNavigableSiblingIndex];
  let lastNavigableChild = getLastNavigableItemInArray(instance, instance.getItemOrderedChildrenIds(currentItemId));
  while (instance.isItemExpanded(currentItemId) && lastNavigableChild != null) {
    currentItemId = lastNavigableChild;
    lastNavigableChild = instance.getItemOrderedChildrenIds(currentItemId).find(instance.isItemNavigable);
  }
  return currentItemId;
};
const getNextNavigableItem = (instance, itemId) => {
  // If the item is expanded and has some navigable children, return the first of them.
  if (instance.isItemExpanded(itemId)) {
    const firstNavigableChild = instance.getItemOrderedChildrenIds(itemId).find(instance.isItemNavigable);
    if (firstNavigableChild != null) {
      return firstNavigableChild;
    }
  }
  let itemMeta = instance.getItemMeta(itemId);
  while (itemMeta != null) {
    // Try to find the first navigable sibling after the current item.
    const siblings = instance.getItemOrderedChildrenIds(itemMeta.parentId);
    const currentItemIndex = instance.getItemIndex(itemMeta.id);
    if (currentItemIndex < siblings.length - 1) {
      let nextItemIndex = currentItemIndex + 1;
      while (!instance.isItemNavigable(siblings[nextItemIndex]) && nextItemIndex < siblings.length - 1) {
        nextItemIndex += 1;
      }
      if (instance.isItemNavigable(siblings[nextItemIndex])) {
        return siblings[nextItemIndex];
      }
    }

    // If the sibling does not exist, go up a level to the parent and try again.
    itemMeta = instance.getItemMeta(itemMeta.parentId);
  }
  return null;
};
const getLastNavigableItem = instance => {
  let itemId = null;
  while (itemId == null || instance.isItemExpanded(itemId)) {
    const children = instance.getItemOrderedChildrenIds(itemId);
    const lastNavigableChild = getLastNavigableItemInArray(instance, children);

    // The item has no navigable children.
    if (lastNavigableChild == null) {
      return itemId;
    }
    itemId = lastNavigableChild;
  }
  return itemId;
};
const getFirstNavigableItem = instance => instance.getItemOrderedChildrenIds(null).find(instance.isItemNavigable);

/**
 * This is used to determine the start and end of a selection range so
 * we can get the items between the two border items.
 *
 * It finds the items' common ancestor using
 * a naive implementation of a lowest common ancestor algorithm
 * (https://en.wikipedia.org/wiki/Lowest_common_ancestor).
 * Then compares the ancestor's 2 children that are ancestors of itemA and ItemB
 * so we can compare their indexes to work out which item comes first in a depth first search.
 * (https://en.wikipedia.org/wiki/Depth-first_search)
 *
 * Another way to put it is which item is shallower in a trémaux tree
 * https://en.wikipedia.org/wiki/Tr%C3%A9maux_tree
 */
const findOrderInTremauxTree = (instance, itemAId, itemBId) => {
  if (itemAId === itemBId) {
    return [itemAId, itemBId];
  }
  const itemMetaA = instance.getItemMeta(itemAId);
  const itemMetaB = instance.getItemMeta(itemBId);
  if (itemMetaA.parentId === itemMetaB.id || itemMetaB.parentId === itemMetaA.id) {
    return itemMetaB.parentId === itemMetaA.id ? [itemMetaA.id, itemMetaB.id] : [itemMetaB.id, itemMetaA.id];
  }
  const aFamily = [itemMetaA.id];
  const bFamily = [itemMetaB.id];
  let aAncestor = itemMetaA.parentId;
  let bAncestor = itemMetaB.parentId;
  let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
  let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
  let continueA = true;
  let continueB = true;
  while (!bAncestorIsCommon && !aAncestorIsCommon) {
    if (continueA) {
      aFamily.push(aAncestor);
      aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
      continueA = aAncestor !== null;
      if (!aAncestorIsCommon && continueA) {
        aAncestor = instance.getItemMeta(aAncestor).parentId;
      }
    }
    if (continueB && !aAncestorIsCommon) {
      bFamily.push(bAncestor);
      bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
      continueB = bAncestor !== null;
      if (!bAncestorIsCommon && continueB) {
        bAncestor = instance.getItemMeta(bAncestor).parentId;
      }
    }
  }
  const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
  const ancestorFamily = instance.getItemOrderedChildrenIds(commonAncestor);
  const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
  const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];
  return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide) ? [itemAId, itemBId] : [itemBId, itemAId];
};
const getNonDisabledItemsInRange = (instance, itemAId, itemBId) => {
  const getNextItem = itemId => {
    // If the item is expanded and has some children, return the first of them.
    if (instance.isItemExpandable(itemId) && instance.isItemExpanded(itemId)) {
      return instance.getItemOrderedChildrenIds(itemId)[0];
    }
    let itemMeta = instance.getItemMeta(itemId);
    while (itemMeta != null) {
      // Try to find the first navigable sibling after the current item.
      const siblings = instance.getItemOrderedChildrenIds(itemMeta.parentId);
      const currentItemIndex = instance.getItemIndex(itemMeta.id);
      if (currentItemIndex < siblings.length - 1) {
        return siblings[currentItemIndex + 1];
      }

      // If the item is the last of its siblings, go up a level to the parent and try again.
      itemMeta = instance.getItemMeta(itemMeta.parentId);
    }
    throw new Error('Invalid range');
  };
  const [first, last] = findOrderInTremauxTree(instance, itemAId, itemBId);
  const items = [first];
  let current = first;
  while (current !== last) {
    current = getNextItem(current);
    if (!instance.isItemDisabled(current)) {
      items.push(current);
    }
  }
  return items;
};
const getAllNavigableItems = instance => {
  let item = getFirstNavigableItem(instance);
  const navigableItems = [];
  while (item != null) {
    navigableItems.push(item);
    item = getNextNavigableItem(instance, item);
  }
  return navigableItems;
};

/**
 * Checks if the target is in a descendant of this item.
 * This can prevent from firing some logic on the ancestors on the interacted item when the event handler is on the root.
 * @param {HTMLElement} target The target to check
 * @param {HTMLElement | null} itemRoot The root of the item to check if the event target is in its descendants
 * @returns {boolean} Whether the target is in a descendant of this item
 */
const isTargetInDescendants = (target, itemRoot) => {
  return itemRoot !== target.closest('*[role="treeitem"]');
};

/**
 * Transform the `selectedItems` model to be an array if it was a string or null.
 * @param {string[] | string | null} model The raw model.
 * @returns {string[]} The converted model.
 */
const convertSelectedItemsToArray = model => {
  if (Array.isArray(model)) {
    return model;
  }
  if (model != null) {
    return [model];
  }
  return [];
};
const getLookupFromArray = array => {
  const lookup = {};
  array.forEach(itemId => {
    lookup[itemId] = true;
  });
  return lookup;
};

const useTreeViewSelection = ({
  instance,
  params,
  models
}) => {
  const lastSelectedItem = React.useRef(null);
  const lastSelectedRange = React.useRef({});
  const selectedItemsMap = React.useMemo(() => {
    const temp = new Map();
    if (Array.isArray(models.selectedItems.value)) {
      models.selectedItems.value.forEach(id => {
        temp.set(id, true);
      });
    } else if (models.selectedItems.value != null) {
      temp.set(models.selectedItems.value, true);
    }
    return temp;
  }, [models.selectedItems.value]);
  const setSelectedItems = (event, newSelectedItems) => {
    if (params.onItemSelectionToggle) {
      if (params.multiSelect) {
        const addedItems = newSelectedItems.filter(itemId => !instance.isItemSelected(itemId));
        const removedItems = models.selectedItems.value.filter(itemId => !newSelectedItems.includes(itemId));
        addedItems.forEach(itemId => {
          params.onItemSelectionToggle(event, itemId, true);
        });
        removedItems.forEach(itemId => {
          params.onItemSelectionToggle(event, itemId, false);
        });
      } else if (newSelectedItems !== models.selectedItems.value) {
        if (models.selectedItems.value != null) {
          params.onItemSelectionToggle(event, models.selectedItems.value, false);
        }
        if (newSelectedItems != null) {
          params.onItemSelectionToggle(event, newSelectedItems, true);
        }
      }
    }
    if (params.onSelectedItemsChange) {
      params.onSelectedItemsChange(event, newSelectedItems);
    }
    models.selectedItems.setControlledValue(newSelectedItems);
  };
  const isItemSelected = itemId => selectedItemsMap.has(itemId);
  const selectItem = ({
    event,
    itemId,
    keepExistingSelection = false,
    shouldBeSelected
  }) => {
    if (params.disableSelection) {
      return;
    }
    let newSelected;
    if (keepExistingSelection) {
      const cleanSelectedItems = convertSelectedItemsToArray(models.selectedItems.value);
      const isSelectedBefore = instance.isItemSelected(itemId);
      if (isSelectedBefore && (shouldBeSelected === false || shouldBeSelected == null)) {
        newSelected = cleanSelectedItems.filter(id => id !== itemId);
      } else if (!isSelectedBefore && (shouldBeSelected === true || shouldBeSelected == null)) {
        newSelected = [itemId].concat(cleanSelectedItems);
      } else {
        newSelected = cleanSelectedItems;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (shouldBeSelected === false || shouldBeSelected == null && instance.isItemSelected(itemId)) {
        newSelected = params.multiSelect ? [] : null;
      } else {
        newSelected = params.multiSelect ? [itemId] : itemId;
      }
    }
    setSelectedItems(event, newSelected);
    lastSelectedItem.current = itemId;
    lastSelectedRange.current = {};
  };
  const selectRange = (event, [start, end]) => {
    if (params.disableSelection || !params.multiSelect) {
      return;
    }
    let newSelectedItems = convertSelectedItemsToArray(models.selectedItems.value).slice();

    // If the last selection was a range selection,
    // remove the items that were part of the last range from the model
    if (Object.keys(lastSelectedRange.current).length > 0) {
      newSelectedItems = newSelectedItems.filter(id => !lastSelectedRange.current[id]);
    }

    // Add to the model the items that are part of the new range and not already part of the model.
    const selectedItemsLookup = getLookupFromArray(newSelectedItems);
    const range = getNonDisabledItemsInRange(instance, start, end);
    const itemsToAddToModel = range.filter(id => !selectedItemsLookup[id]);
    newSelectedItems = newSelectedItems.concat(itemsToAddToModel);
    setSelectedItems(event, newSelectedItems);
    lastSelectedRange.current = getLookupFromArray(range);
  };
  const expandSelectionRange = (event, itemId) => {
    if (lastSelectedItem.current != null) {
      const [start, end] = findOrderInTremauxTree(instance, itemId, lastSelectedItem.current);
      selectRange(event, [start, end]);
    }
  };
  const selectRangeFromStartToItem = (event, itemId) => {
    selectRange(event, [getFirstNavigableItem(instance), itemId]);
  };
  const selectRangeFromItemToEnd = (event, itemId) => {
    selectRange(event, [itemId, getLastNavigableItem(instance)]);
  };
  const selectAllNavigableItems = event => {
    if (params.disableSelection || !params.multiSelect) {
      return;
    }
    const navigableItems = getAllNavigableItems(instance);
    setSelectedItems(event, navigableItems);
    lastSelectedRange.current = getLookupFromArray(navigableItems);
  };
  const selectItemFromArrowNavigation = (event, currentItem, nextItem) => {
    if (params.disableSelection || !params.multiSelect) {
      return;
    }
    let newSelectedItems = convertSelectedItemsToArray(models.selectedItems.value).slice();
    if (Object.keys(lastSelectedRange.current).length === 0) {
      newSelectedItems.push(nextItem);
      lastSelectedRange.current = {
        [currentItem]: true,
        [nextItem]: true
      };
    } else {
      if (!lastSelectedRange.current[currentItem]) {
        lastSelectedRange.current = {};
      }
      if (lastSelectedRange.current[nextItem]) {
        newSelectedItems = newSelectedItems.filter(id => id !== currentItem);
        delete lastSelectedRange.current[currentItem];
      } else {
        newSelectedItems.push(nextItem);
        lastSelectedRange.current[nextItem] = true;
      }
    }
    setSelectedItems(event, newSelectedItems);
  };
  return {
    getRootProps: () => ({
      'aria-multiselectable': params.multiSelect
    }),
    publicAPI: {
      selectItem
    },
    instance: {
      isItemSelected,
      selectItem,
      selectAllNavigableItems,
      expandSelectionRange,
      selectRangeFromStartToItem,
      selectRangeFromItemToEnd,
      selectItemFromArrowNavigation
    },
    contextValue: {
      selection: {
        multiSelect: params.multiSelect,
        checkboxSelection: params.checkboxSelection,
        disableSelection: params.disableSelection
      }
    }
  };
};
useTreeViewSelection.models = {
  selectedItems: {
    getDefaultValue: params => params.defaultSelectedItems
  }
};
const DEFAULT_SELECTED_ITEMS = [];
useTreeViewSelection.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  disableSelection: params.disableSelection ?? false,
  multiSelect: params.multiSelect ?? false,
  checkboxSelection: params.checkboxSelection ?? false,
  defaultSelectedItems: params.defaultSelectedItems ?? (params.multiSelect ? DEFAULT_SELECTED_ITEMS : null)
});
useTreeViewSelection.params = {
  disableSelection: true,
  multiSelect: true,
  checkboxSelection: true,
  defaultSelectedItems: true,
  selectedItems: true,
  onSelectedItemsChange: true,
  onItemSelectionToggle: true
};

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// If no effect ran after this amount of time, we assume that the render was not committed by React
const CLEANUP_TIMER_LOOP_MILLIS = 1000;
class TimerBasedCleanupTracking {
  constructor(timeout = CLEANUP_TIMER_LOOP_MILLIS) {
    this.timeouts = new Map();
    this.cleanupTimeout = CLEANUP_TIMER_LOOP_MILLIS;
    this.cleanupTimeout = timeout;
  }
  register(object, unsubscribe, unregisterToken) {
    if (!this.timeouts) {
      this.timeouts = new Map();
    }
    const timeout = setTimeout(() => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
      this.timeouts.delete(unregisterToken.cleanupToken);
    }, this.cleanupTimeout);
    this.timeouts.set(unregisterToken.cleanupToken, timeout);
  }
  unregister(unregisterToken) {
    const timeout = this.timeouts.get(unregisterToken.cleanupToken);
    if (timeout) {
      this.timeouts.delete(unregisterToken.cleanupToken);
      clearTimeout(timeout);
    }
  }
  reset() {
    if (this.timeouts) {
      this.timeouts.forEach((value, key) => {
        this.unregister({
          cleanupToken: key
        });
      });
      this.timeouts = undefined;
    }
  }
}

class FinalizationRegistryBasedCleanupTracking {
  constructor() {
    this.registry = new FinalizationRegistry(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
  }
  register(object, unsubscribe, unregisterToken) {
    this.registry.register(object, unsubscribe, unregisterToken);
  }
  unregister(unregisterToken) {
    this.registry.unregister(unregisterToken);
  }

  // eslint-disable-next-line class-methods-use-this
  reset() {}
}

// We use class to make it easier to detect in heap snapshots by name
class ObjectToBeRetainedByReact {}

// Based on https://github.com/Bnaya/use-dispose-uncommitted/blob/main/src/finalization-registry-based-impl.ts
// Check https://github.com/facebook/react/issues/15317 to get more information
function createUseInstanceEventHandler(registryContainer) {
  let cleanupTokensCounter = 0;
  return function useInstanceEventHandler(instance, eventName, handler) {
    if (registryContainer.registry === null) {
      registryContainer.registry = typeof FinalizationRegistry !== 'undefined' ? new FinalizationRegistryBasedCleanupTracking() : new TimerBasedCleanupTracking();
    }
    const [objectRetainedByReact] = React.useState(new ObjectToBeRetainedByReact());
    const subscription = React.useRef(null);
    const handlerRef = React.useRef(undefined);
    handlerRef.current = handler;
    const cleanupTokenRef = React.useRef(null);
    if (!subscription.current && handlerRef.current) {
      const enhancedHandler = (params, event) => {
        if (!event.defaultMuiPrevented) {
          handlerRef.current?.(params, event);
        }
      };
      subscription.current = instance.$$subscribeEvent(eventName, enhancedHandler);
      cleanupTokensCounter += 1;
      cleanupTokenRef.current = {
        cleanupToken: cleanupTokensCounter
      };
      registryContainer.registry.register(objectRetainedByReact,
      // The callback below will be called once this reference stops being retained
      () => {
        subscription.current?.();
        subscription.current = null;
        cleanupTokenRef.current = null;
      }, cleanupTokenRef.current);
    } else if (!handlerRef.current && subscription.current) {
      subscription.current();
      subscription.current = null;
      if (cleanupTokenRef.current) {
        registryContainer.registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }
    }
    React.useEffect(() => {
      if (!subscription.current && handlerRef.current) {
        const enhancedHandler = (params, event) => {
          if (!event.defaultMuiPrevented) {
            handlerRef.current?.(params, event);
          }
        };
        subscription.current = instance.$$subscribeEvent(eventName, enhancedHandler);
      }
      if (cleanupTokenRef.current && registryContainer.registry) {
        // If the effect was called, it means that this render was committed
        // so we can trust the cleanup function to remove the listener.
        registryContainer.registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }
      return () => {
        subscription.current?.();
        subscription.current = null;
      };
    }, [instance, eventName]);
  };
}
const registryContainer = {
  registry: null
};
const useInstanceEventHandler = createUseInstanceEventHandler(registryContainer);

// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
const getActiveElement = (root = document) => {
  const activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};

// TODO, eventually replaces this function with CSS.escape, once available in jsdom, either added manually or built in
// https://github.com/jsdom/jsdom/issues/1550#issuecomment-236734471
function escapeOperandAttributeSelector(operand) {
  return operand.replace(/["\\]/g, '\\$&');
}

const useDefaultFocusableItemId = (instance, selectedItems) => {
  let tabbableItemId = convertSelectedItemsToArray(selectedItems).find(itemId => {
    if (!instance.isItemNavigable(itemId)) {
      return false;
    }
    const itemMeta = instance.getItemMeta(itemId);
    return itemMeta && (itemMeta.parentId == null || instance.isItemExpanded(itemMeta.parentId));
  });
  if (tabbableItemId == null) {
    tabbableItemId = getFirstNavigableItem(instance);
  }
  return tabbableItemId;
};
const useTreeViewFocus = ({
  instance,
  params,
  state,
  setState,
  models,
  rootRef
}) => {
  const defaultFocusableItemId = useDefaultFocusableItemId(instance, models.selectedItems.value);
  const setFocusedItemId = useEventCallback(itemId => {
    const cleanItemId = typeof itemId === 'function' ? itemId(state.focusedItemId) : itemId;
    if (state.focusedItemId !== cleanItemId) {
      setState(prevState => _extends({}, prevState, {
        focusedItemId: cleanItemId
      }));
    }
  });
  const isTreeViewFocused = React.useCallback(() => !!rootRef.current && rootRef.current.contains(getActiveElement(ownerDocument(rootRef.current))), [rootRef]);
  const isItemFocused = React.useCallback(itemId => state.focusedItemId === itemId && isTreeViewFocused(), [state.focusedItemId, isTreeViewFocused]);
  const isItemVisible = itemId => {
    const itemMeta = instance.getItemMeta(itemId);
    return itemMeta && (itemMeta.parentId == null || instance.isItemExpanded(itemMeta.parentId));
  };
  const innerFocusItem = (event, itemId) => {
    const itemElement = instance.getItemDOMElement(itemId);
    if (itemElement) {
      itemElement.focus();
    }
    setFocusedItemId(itemId);
    if (params.onItemFocus) {
      params.onItemFocus(event, itemId);
    }
  };
  const focusItem = useEventCallback((event, itemId) => {
    // If we receive an itemId, and it is visible, the focus will be set to it
    if (isItemVisible(itemId)) {
      innerFocusItem(event, itemId);
    }
  });
  const removeFocusedItem = useEventCallback(() => {
    if (state.focusedItemId == null) {
      return;
    }
    const itemMeta = instance.getItemMeta(state.focusedItemId);
    if (itemMeta) {
      const itemElement = instance.getItemDOMElement(state.focusedItemId);
      if (itemElement) {
        itemElement.blur();
      }
    }
    setFocusedItemId(null);
  });
  const canItemBeTabbed = itemId => itemId === defaultFocusableItemId;
  useInstanceEventHandler(instance, 'removeItem', ({
    id
  }) => {
    if (state.focusedItemId === id) {
      innerFocusItem(null, defaultFocusableItemId);
    }
  });
  const createRootHandleFocus = otherHandlers => event => {
    otherHandlers.onFocus?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }

    // if the event bubbled (which is React specific) we don't want to steal focus
    if (event.target === event.currentTarget) {
      innerFocusItem(event, defaultFocusableItemId);
    }
  };
  return {
    getRootProps: otherHandlers => ({
      onFocus: createRootHandleFocus(otherHandlers)
    }),
    publicAPI: {
      focusItem
    },
    instance: {
      isItemFocused,
      canItemBeTabbed,
      focusItem,
      removeFocusedItem
    }
  };
};
useTreeViewFocus.getInitialState = () => ({
  focusedItemId: null
});
useTreeViewFocus.params = {
  onItemFocus: true
};

const RtlContext = /*#__PURE__*/React.createContext();
const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

const hasPlugin = (instance, plugin) => {
  const plugins = instance.getAvailablePlugins();
  return plugins.has(plugin);
};

const useTreeViewLabelItemPlugin = ({
  props
}) => {
  const {
    instance
  } = useTreeViewContext();
  const {
    label,
    itemId
  } = props;
  const [labelInputValue, setLabelInputValue] = React.useState(label);
  const isItemBeingEdited = instance.isItemBeingEdited(itemId);
  React.useEffect(() => {
    if (!isItemBeingEdited) {
      setLabelInputValue(label);
    }
  }, [isItemBeingEdited, label]);
  return {
    propsEnhancers: {
      labelInput: ({
        externalEventHandlers,
        interactions
      }) => {
        const editable = instance.isItemEditable(itemId);
        if (!editable) {
          return {};
        }
        const handleKeydown = event => {
          externalEventHandlers.onKeyDown?.(event);
          if (event.defaultMuiPrevented) {
            return;
          }
          const target = event.target;
          if (event.key === 'Enter' && target.value) {
            interactions.handleSaveItemLabel(event, target.value);
          } else if (event.key === 'Escape') {
            interactions.handleCancelItemLabelEditing(event);
          }
        };
        const handleBlur = event => {
          externalEventHandlers.onBlur?.(event);
          if (event.defaultMuiPrevented) {
            return;
          }
          if (event.target.value) {
            interactions.handleSaveItemLabel(event, event.target.value);
          }
        };
        const handleInputChange = event => {
          externalEventHandlers.onChange?.(event);
          setLabelInputValue(event.target.value);
        };
        return {
          value: labelInputValue ?? '',
          'data-element': 'labelInput',
          onChange: handleInputChange,
          onKeyDown: handleKeydown,
          onBlur: handleBlur,
          autoFocus: true,
          type: 'text'
        };
      }
    }
  };
};

const useTreeViewLabel = ({
  instance,
  state,
  setState,
  params
}) => {
  const editedItemRef = React.useRef(state.editedItemId);
  const isItemBeingEditedRef = itemId => editedItemRef.current === itemId;
  const setEditedItemId = editedItemId => {
    setState(prevState => _extends({}, prevState, {
      editedItemId
    }));
    editedItemRef.current = editedItemId;
  };
  const isItemBeingEdited = itemId => itemId === state.editedItemId;
  const isTreeViewEditable = Boolean(params.isItemEditable);
  const isItemEditable = itemId => {
    if (itemId == null || !isTreeViewEditable) {
      return false;
    }
    const item = instance.getItem(itemId);
    if (!item) {
      return false;
    }
    return typeof params.isItemEditable === 'function' ? params.isItemEditable(item) : Boolean(params.isItemEditable);
  };
  const updateItemLabel = (itemId, label) => {
    if (!label) {
      throw new Error(['MUI X: The Tree View component requires all items to have a `label` property.', 'The label of an item cannot be empty.', itemId].join('\n'));
    }
    setState(prevState => {
      const item = prevState.items.itemMetaMap[itemId];
      if (item.label !== label) {
        return _extends({}, prevState, {
          items: _extends({}, prevState.items, {
            itemMetaMap: _extends({}, prevState.items.itemMetaMap, {
              [itemId]: _extends({}, item, {
                label
              })
            })
          })
        });
      }
      return prevState;
    });
    if (params.onItemLabelChange) {
      params.onItemLabelChange(itemId, label);
    }
  };
  return {
    instance: {
      setEditedItemId,
      isItemBeingEdited,
      updateItemLabel,
      isItemEditable,
      isTreeViewEditable,
      isItemBeingEditedRef
    },
    publicAPI: {
      updateItemLabel
    }
  };
};
useTreeViewLabel.itemPlugin = useTreeViewLabelItemPlugin;
useTreeViewLabel.getDefaultizedParams = ({
  params,
  experimentalFeatures
}) => {
  const canUseFeature = experimentalFeatures?.labelEditing;
  return _extends({}, params, {
    isItemEditable: canUseFeature ? params.isItemEditable ?? false : false
  });
};
useTreeViewLabel.getInitialState = () => ({
  editedItemId: null
});
useTreeViewLabel.params = {
  onItemLabelChange: true,
  isItemEditable: true
};

function isPrintableKey(string) {
  return !!string && string.length === 1 && !!string.match(/\S/);
}
const useTreeViewKeyboardNavigation = ({
  instance,
  params,
  state
}) => {
  const isRtl = useRtl();
  const firstCharMap = React.useRef({});
  const updateFirstCharMap = useEventCallback(callback => {
    firstCharMap.current = callback(firstCharMap.current);
  });
  React.useEffect(() => {
    if (instance.areItemUpdatesPrevented()) {
      return;
    }
    const newFirstCharMap = {};
    const processItem = item => {
      newFirstCharMap[item.id] = item.label.substring(0, 1).toLowerCase();
    };
    Object.values(state.items.itemMetaMap).forEach(processItem);
    firstCharMap.current = newFirstCharMap;
  }, [state.items.itemMetaMap, params.getItemId, instance]);
  const getFirstMatchingItem = (itemId, query) => {
    const cleanQuery = query.toLowerCase();
    const getNextItem = itemIdToCheck => {
      const nextItemId = getNextNavigableItem(instance, itemIdToCheck);
      // We reached the end of the tree, check from the beginning
      if (nextItemId === null) {
        return getFirstNavigableItem(instance);
      }
      return nextItemId;
    };
    let matchingItemId = null;
    let currentItemId = getNextItem(itemId);
    const checkedItems = {};
    // The "!checkedItems[currentItemId]" condition avoids an infinite loop when there is no matching item.
    while (matchingItemId == null && !checkedItems[currentItemId]) {
      if (firstCharMap.current[currentItemId] === cleanQuery) {
        matchingItemId = currentItemId;
      } else {
        checkedItems[currentItemId] = true;
        currentItemId = getNextItem(currentItemId);
      }
    }
    return matchingItemId;
  };
  const canToggleItemSelection = itemId => !params.disableSelection && !instance.isItemDisabled(itemId);
  const canToggleItemExpansion = itemId => {
    return !instance.isItemDisabled(itemId) && instance.isItemExpandable(itemId);
  };

  // ARIA specification: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/#keyboardinteraction
  const handleItemKeyDown = (event, itemId) => {
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.altKey || isTargetInDescendants(event.target, event.currentTarget)) {
      return;
    }
    const ctrlPressed = event.ctrlKey || event.metaKey;
    const key = event.key;

    // eslint-disable-next-line default-case
    switch (true) {
      // Select the item when pressing "Space"
      case key === ' ' && canToggleItemSelection(itemId):
        {
          event.preventDefault();
          if (params.multiSelect && event.shiftKey) {
            instance.expandSelectionRange(event, itemId);
          } else {
            instance.selectItem({
              event,
              itemId,
              keepExistingSelection: params.multiSelect,
              shouldBeSelected: params.multiSelect ? undefined : true
            });
          }
          break;
        }

      // If the focused item has children, we expand it.
      // If the focused item has no children, we select it.
      case key === 'Enter':
        {
          if (hasPlugin(instance, useTreeViewLabel) && instance.isItemEditable(itemId) && !instance.isItemBeingEdited(itemId)) {
            instance.setEditedItemId(itemId);
          } else if (canToggleItemExpansion(itemId)) {
            instance.toggleItemExpansion(event, itemId);
            event.preventDefault();
          } else if (canToggleItemSelection(itemId)) {
            if (params.multiSelect) {
              event.preventDefault();
              instance.selectItem({
                event,
                itemId,
                keepExistingSelection: true
              });
            } else if (!instance.isItemSelected(itemId)) {
              instance.selectItem({
                event,
                itemId
              });
              event.preventDefault();
            }
          }
          break;
        }

      // Focus the next focusable item
      case key === 'ArrowDown':
        {
          const nextItem = getNextNavigableItem(instance, itemId);
          if (nextItem) {
            event.preventDefault();
            instance.focusItem(event, nextItem);

            // Multi select behavior when pressing Shift + ArrowDown
            // Toggles the selection state of the next item
            if (params.multiSelect && event.shiftKey && canToggleItemSelection(nextItem)) {
              instance.selectItemFromArrowNavigation(event, itemId, nextItem);
            }
          }
          break;
        }

      // Focuses the previous focusable item
      case key === 'ArrowUp':
        {
          const previousItem = getPreviousNavigableItem(instance, itemId);
          if (previousItem) {
            event.preventDefault();
            instance.focusItem(event, previousItem);

            // Multi select behavior when pressing Shift + ArrowUp
            // Toggles the selection state of the previous item
            if (params.multiSelect && event.shiftKey && canToggleItemSelection(previousItem)) {
              instance.selectItemFromArrowNavigation(event, itemId, previousItem);
            }
          }
          break;
        }

      // If the focused item is expanded, we move the focus to its first child
      // If the focused item is collapsed and has children, we expand it
      case key === 'ArrowRight' && !isRtl || key === 'ArrowLeft' && isRtl:
        {
          if (ctrlPressed) {
            return;
          }
          if (instance.isItemExpanded(itemId)) {
            const nextItemId = getNextNavigableItem(instance, itemId);
            if (nextItemId) {
              instance.focusItem(event, nextItemId);
              event.preventDefault();
            }
          } else if (canToggleItemExpansion(itemId)) {
            instance.toggleItemExpansion(event, itemId);
            event.preventDefault();
          }
          break;
        }

      // If the focused item is expanded, we collapse it
      // If the focused item is collapsed and has a parent, we move the focus to this parent
      case key === 'ArrowLeft' && !isRtl || key === 'ArrowRight' && isRtl:
        {
          if (ctrlPressed) {
            return;
          }
          if (canToggleItemExpansion(itemId) && instance.isItemExpanded(itemId)) {
            instance.toggleItemExpansion(event, itemId);
            event.preventDefault();
          } else {
            const parent = instance.getItemMeta(itemId).parentId;
            if (parent) {
              instance.focusItem(event, parent);
              event.preventDefault();
            }
          }
          break;
        }

      // Focuses the first item in the tree
      case key === 'Home':
        {
          // Multi select behavior when pressing Ctrl + Shift + Home
          // Selects the focused item and all items up to the first item.
          if (canToggleItemSelection(itemId) && params.multiSelect && ctrlPressed && event.shiftKey) {
            instance.selectRangeFromStartToItem(event, itemId);
          } else {
            instance.focusItem(event, getFirstNavigableItem(instance));
          }
          event.preventDefault();
          break;
        }

      // Focuses the last item in the tree
      case key === 'End':
        {
          // Multi select behavior when pressing Ctrl + Shirt + End
          // Selects the focused item and all the items down to the last item.
          if (canToggleItemSelection(itemId) && params.multiSelect && ctrlPressed && event.shiftKey) {
            instance.selectRangeFromItemToEnd(event, itemId);
          } else {
            instance.focusItem(event, getLastNavigableItem(instance));
          }
          event.preventDefault();
          break;
        }

      // Expand all siblings that are at the same level as the focused item
      case key === '*':
        {
          instance.expandAllSiblings(event, itemId);
          event.preventDefault();
          break;
        }

      // Multi select behavior when pressing Ctrl + a
      // Selects all the items
      case String.fromCharCode(event.keyCode) === 'A' && ctrlPressed && params.multiSelect && !params.disableSelection:
        {
          instance.selectAllNavigableItems(event);
          event.preventDefault();
          break;
        }

      // Type-ahead
      // TODO: Support typing multiple characters
      case !ctrlPressed && !event.shiftKey && isPrintableKey(key):
        {
          const matchingItem = getFirstMatchingItem(itemId, key);
          if (matchingItem != null) {
            instance.focusItem(event, matchingItem);
            event.preventDefault();
          }
          break;
        }
    }
  };
  return {
    instance: {
      updateFirstCharMap,
      handleItemKeyDown
    }
  };
};
useTreeViewKeyboardNavigation.params = {};

const useTreeViewIcons = ({
  slots,
  slotProps
}) => {
  return {
    contextValue: {
      icons: {
        slots: {
          collapseIcon: slots.collapseIcon,
          expandIcon: slots.expandIcon,
          endIcon: slots.endIcon
        },
        slotProps: {
          collapseIcon: slotProps.collapseIcon,
          expandIcon: slotProps.expandIcon,
          endIcon: slotProps.endIcon
        }
      }
    }
  };
};
useTreeViewIcons.params = {};

const TreeViewChildrenItemContext = /*#__PURE__*/React.createContext(null);
function TreeViewChildrenItemProvider(props) {
  const {
    children,
    itemId = null
  } = props;
  const {
    instance,
    treeId,
    rootRef
  } = useTreeViewContext();
  const childrenIdAttrToIdRef = React.useRef(new Map());
  React.useEffect(() => {
    if (!rootRef.current) {
      return;
    }
    let idAttr = null;
    if (itemId == null) {
      idAttr = rootRef.current.id;
    } else {
      // Undefined during 1st render
      const itemMeta = instance.getItemMeta(itemId);
      if (itemMeta !== undefined) {
        idAttr = generateTreeItemIdAttribute({
          itemId,
          treeId,
          id: itemMeta.idAttribute
        });
      }
    }
    if (idAttr == null) {
      return;
    }
    const previousChildrenIds = instance.getItemOrderedChildrenIds(itemId ?? null) ?? [];
    const escapedIdAttr = escapeOperandAttributeSelector(idAttr);
    const childrenElements = rootRef.current.querySelectorAll(`${itemId == null ? '' : `*[id="${escapedIdAttr}"] `}[role="treeitem"]:not(*[id="${escapedIdAttr}"] [role="treeitem"] [role="treeitem"])`);
    const childrenIds = Array.from(childrenElements).map(child => childrenIdAttrToIdRef.current.get(child.id));
    const hasChanged = childrenIds.length !== previousChildrenIds.length || childrenIds.some((childId, index) => childId !== previousChildrenIds[index]);
    if (hasChanged) {
      instance.setJSXItemsOrderedChildrenIds(itemId ?? null, childrenIds);
    }
  });
  const value = React.useMemo(() => ({
    registerChild: (childIdAttribute, childItemId) => childrenIdAttrToIdRef.current.set(childIdAttribute, childItemId),
    unregisterChild: childIdAttribute => childrenIdAttrToIdRef.current.delete(childIdAttribute),
    parentId: itemId
  }), [itemId]);
  return /*#__PURE__*/jsx(TreeViewChildrenItemContext.Provider, {
    value: value,
    children: children
  });
}

const useTreeViewJSXItems = ({
  instance,
  setState
}) => {
  instance.preventItemUpdates();
  const insertJSXItem = useEventCallback(item => {
    setState(prevState => {
      if (prevState.items.itemMetaMap[item.id] != null) {
        throw new Error(['MUI X: The Tree View component requires all items to have a unique `id` property.', 'Alternatively, you can use the `getItemId` prop to specify a custom id for each item.', `Two items were provided with the same id in the \`items\` prop: "${item.id}"`].join('\n'));
      }
      return _extends({}, prevState, {
        items: _extends({}, prevState.items, {
          itemMetaMap: _extends({}, prevState.items.itemMetaMap, {
            [item.id]: item
          }),
          // For Simple Tree View, we don't have a proper `item` object, so we create a very basic one.
          itemMap: _extends({}, prevState.items.itemMap, {
            [item.id]: {
              id: item.id,
              label: item.label
            }
          })
        })
      });
    });
    return () => {
      setState(prevState => {
        const newItemMetaMap = _extends({}, prevState.items.itemMetaMap);
        const newItemMap = _extends({}, prevState.items.itemMap);
        delete newItemMetaMap[item.id];
        delete newItemMap[item.id];
        return _extends({}, prevState, {
          items: _extends({}, prevState.items, {
            itemMetaMap: newItemMetaMap,
            itemMap: newItemMap
          })
        });
      });
      publishTreeViewEvent(instance, 'removeItem', {
        id: item.id
      });
    };
  });
  const setJSXItemsOrderedChildrenIds = (parentId, orderedChildrenIds) => {
    const parentIdWithDefault = parentId ?? TREE_VIEW_ROOT_PARENT_ID;
    setState(prevState => _extends({}, prevState, {
      items: _extends({}, prevState.items, {
        itemOrderedChildrenIds: _extends({}, prevState.items.itemOrderedChildrenIds, {
          [parentIdWithDefault]: orderedChildrenIds
        }),
        itemChildrenIndexes: _extends({}, prevState.items.itemChildrenIndexes, {
          [parentIdWithDefault]: buildSiblingIndexes(orderedChildrenIds)
        })
      })
    }));
  };
  const mapFirstCharFromJSX = useEventCallback((itemId, firstChar) => {
    instance.updateFirstCharMap(firstCharMap => {
      firstCharMap[itemId] = firstChar;
      return firstCharMap;
    });
    return () => {
      instance.updateFirstCharMap(firstCharMap => {
        const newMap = _extends({}, firstCharMap);
        delete newMap[itemId];
        return newMap;
      });
    };
  });
  return {
    instance: {
      insertJSXItem,
      setJSXItemsOrderedChildrenIds,
      mapFirstCharFromJSX
    }
  };
};
const isItemExpandable = reactChildren => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isItemExpandable);
  }
  return Boolean(reactChildren);
};
const useTreeViewJSXItemsItemPlugin = ({
  props,
  rootRef,
  contentRef
}) => {
  const {
    instance,
    treeId
  } = useTreeViewContext();
  const {
    children,
    disabled = false,
    label,
    itemId,
    id
  } = props;
  const parentContext = React.useContext(TreeViewChildrenItemContext);
  if (parentContext == null) {
    throw new Error(['MUI X: Could not find the Tree View Children Item context.', 'It looks like you rendered your component outside of a SimpleTreeView parent component.', 'This can also happen if you are bundling multiple versions of the Tree View.'].join('\n'));
  }
  const {
    registerChild,
    unregisterChild,
    parentId
  } = parentContext;
  const expandable = isItemExpandable(children);
  const pluginContentRef = React.useRef(null);
  const handleContentRef = useForkRef(pluginContentRef, contentRef);

  // Prevent any flashing
  useEnhancedEffect(() => {
    const idAttribute = generateTreeItemIdAttribute({
      itemId,
      treeId,
      id
    });
    registerChild(idAttribute, itemId);
    return () => {
      unregisterChild(idAttribute);
    };
  }, [registerChild, unregisterChild, itemId, id, treeId]);
  React.useEffect(() => {
    return instance.insertJSXItem({
      id: itemId,
      idAttribute: id,
      parentId,
      expandable,
      disabled
    });
  }, [instance, parentId, itemId, expandable, disabled, id]);
  React.useEffect(() => {
    if (label) {
      return instance.mapFirstCharFromJSX(itemId, (pluginContentRef.current?.textContent ?? '').substring(0, 1).toLowerCase());
    }
    return undefined;
  }, [instance, itemId, label]);
  return {
    contentRef: handleContentRef,
    rootRef
  };
};
useTreeViewJSXItems.itemPlugin = useTreeViewJSXItemsItemPlugin;
useTreeViewJSXItems.wrapItem = ({
  children,
  itemId
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const depthContext = React.useContext(TreeViewItemDepthContext);
  return /*#__PURE__*/jsx(TreeViewChildrenItemProvider, {
    itemId: itemId,
    children: /*#__PURE__*/jsx(TreeViewItemDepthContext.Provider, {
      value: depthContext + 1,
      children: children
    })
  });
};
useTreeViewJSXItems.wrapRoot = ({
  children
}) => /*#__PURE__*/jsx(TreeViewChildrenItemProvider, {
  children: /*#__PURE__*/jsx(TreeViewItemDepthContext.Provider, {
    value: 0,
    children: children
  })
});
useTreeViewJSXItems.params = {};

const SIMPLE_TREE_VIEW_PLUGINS = [useTreeViewItems, useTreeViewExpansion, useTreeViewSelection, useTreeViewFocus, useTreeViewKeyboardNavigation, useTreeViewIcons, useTreeViewJSXItems];

// We can't infer this type from the plugin, otherwise we would lose the generics.

const useThemeProps$1 = createUseThemeProps();
const useUtilityClasses$1 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getSimpleTreeViewUtilityClass, classes);
};
const SimpleTreeViewRoot = styled('ul', {
  name: 'MuiSimpleTreeView',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  outline: 0,
  position: 'relative'
});
const EMPTY_ITEMS = [];

/**
 *
 * Demos:
 *
 * - [Tree View](https://mui.com/x/react-tree-view/)
 *
 * API:
 *
 * - [SimpleTreeView API](https://mui.com/x/api/tree-view/simple-tree-view/)
 */
const SimpleTreeView = /*#__PURE__*/React.forwardRef(function SimpleTreeView(inProps, ref) {
  const props = useThemeProps$1({
    props: inProps,
    name: 'MuiSimpleTreeView'
  });
  const ownerState = props;
  const {
    getRootProps,
    contextValue
  } = useTreeView({
    plugins: SIMPLE_TREE_VIEW_PLUGINS,
    rootRef: ref,
    props: _extends({}, props, {
      items: EMPTY_ITEMS
    })
  });
  const {
    slots,
    slotProps
  } = props;
  const classes = useUtilityClasses$1(props);
  const Root = slots?.root ?? SimpleTreeViewRoot;
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps?.root,
    className: classes.root,
    getSlotProps: getRootProps,
    ownerState
  });
  return /*#__PURE__*/jsx(TreeViewProvider, {
    value: contextValue,
    children: /*#__PURE__*/jsx(Root, _extends({}, rootProps))
  });
});

var reactIs = {exports: {}};

var reactIs_production = {};

/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production;

function requireReactIs_production () {
	if (hasRequiredReactIs_production) return reactIs_production;
	hasRequiredReactIs_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
	  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	  REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	  REACT_MEMO_TYPE = Symbol.for("react.memo"),
	  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	  REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"),
	  REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
	function typeOf(object) {
	  if ("object" === typeof object && null !== object) {
	    var $$typeof = object.$$typeof;
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        switch (((object = object.type), object)) {
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	          case REACT_SUSPENSE_LIST_TYPE:
	          case REACT_VIEW_TRANSITION_TYPE:
	            return object;
	          default:
	            switch (((object = object && object.$$typeof), object)) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	                return object;
	              case REACT_CONSUMER_TYPE:
	                return object;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }
	}
	reactIs_production.ContextConsumer = REACT_CONSUMER_TYPE;
	reactIs_production.ContextProvider = REACT_CONTEXT_TYPE;
	reactIs_production.Element = REACT_ELEMENT_TYPE;
	reactIs_production.ForwardRef = REACT_FORWARD_REF_TYPE;
	reactIs_production.Fragment = REACT_FRAGMENT_TYPE;
	reactIs_production.Lazy = REACT_LAZY_TYPE;
	reactIs_production.Memo = REACT_MEMO_TYPE;
	reactIs_production.Portal = REACT_PORTAL_TYPE;
	reactIs_production.Profiler = REACT_PROFILER_TYPE;
	reactIs_production.StrictMode = REACT_STRICT_MODE_TYPE;
	reactIs_production.Suspense = REACT_SUSPENSE_TYPE;
	reactIs_production.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
	reactIs_production.isContextConsumer = function (object) {
	  return typeOf(object) === REACT_CONSUMER_TYPE;
	};
	reactIs_production.isContextProvider = function (object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	};
	reactIs_production.isElement = function (object) {
	  return (
	    "object" === typeof object &&
	    null !== object &&
	    object.$$typeof === REACT_ELEMENT_TYPE
	  );
	};
	reactIs_production.isForwardRef = function (object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	};
	reactIs_production.isFragment = function (object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	};
	reactIs_production.isLazy = function (object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	};
	reactIs_production.isMemo = function (object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	};
	reactIs_production.isPortal = function (object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	};
	reactIs_production.isProfiler = function (object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	};
	reactIs_production.isStrictMode = function (object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	};
	reactIs_production.isSuspense = function (object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	};
	reactIs_production.isSuspenseList = function (object) {
	  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
	};
	reactIs_production.isValidElementType = function (type) {
	  return "string" === typeof type ||
	    "function" === typeof type ||
	    type === REACT_FRAGMENT_TYPE ||
	    type === REACT_PROFILER_TYPE ||
	    type === REACT_STRICT_MODE_TYPE ||
	    type === REACT_SUSPENSE_TYPE ||
	    type === REACT_SUSPENSE_LIST_TYPE ||
	    ("object" === typeof type &&
	      null !== type &&
	      (type.$$typeof === REACT_LAZY_TYPE ||
	        type.$$typeof === REACT_MEMO_TYPE ||
	        type.$$typeof === REACT_CONTEXT_TYPE ||
	        type.$$typeof === REACT_CONSUMER_TYPE ||
	        type.$$typeof === REACT_FORWARD_REF_TYPE ||
	        type.$$typeof === REACT_CLIENT_REFERENCE ||
	        void 0 !== type.getModuleId))
	    ? true
	    : false;
	};
	reactIs_production.typeOf = typeOf;
	return reactIs_production;
}

var hasRequiredReactIs;

function requireReactIs () {
	if (hasRequiredReactIs) return reactIs.exports;
	hasRequiredReactIs = 1;

	{
	  reactIs.exports = /*@__PURE__*/ requireReactIs_production();
	}
	return reactIs.exports;
}

var reactIsExports = /*@__PURE__*/ requireReactIs();

// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
function isPlainObject(item) {
  if (typeof item !== 'object' || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if (/*#__PURE__*/React.isValidElement(source) || reactIsExports.isValidElementType(source) || !isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach(key => {
    output[key] = deepClone(source[key]);
  });
  return output;
}

/**
 * Merge objects deeply.
 * It will shallow copy React elements.
 *
 * If `options.clone` is set to `false` the source object will be merged directly into the target object.
 *
 * @example
 * ```ts
 * deepmerge({ a: { b: 1 }, d: 2 }, { a: { c: 2 }, d: 4 });
 * // => { a: { b: 1, c: 2 }, d: 4 }
 * ````
 *
 * @param target The target object.
 * @param source The source object.
 * @param options The merge options.
 * @param options.clone Set to `false` to merge the source object directly into the target object.
 * @returns The merged object.
 */
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? {
    ...target
  } : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      if (/*#__PURE__*/React.isValidElement(source[key]) || reactIsExports.isValidElementType(source[key])) {
        output[key] = source[key];
      } else if (isPlainObject(source[key]) &&
      // Avoid prototype pollution
      Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) {
        // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

/**
 * WARNING: Don't import this directly. It's imported by the code generated by
 * `@mui/interal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
 * constructors to ensure the plugin works as expected. Supported patterns include:
 *   throw new Error('My message');
 *   throw new Error(`My message: ${foo}`);
 *   throw new Error(`My message: ${foo}` + 'another string');
 *   ...
 * @param {number} code
 */
function formatMuiErrorMessage(code, ...args) {
  const url = new URL(`https://mui.com/production-error/?code=${code}`);
  args.forEach(arg => url.searchParams.append('args[]', arg));
  return `Minified MUI error #${code}; visit ${url} for the full message.`;
}

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error(formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
const sortBreakpointsValues = values => {
  const breakpointsAsArray = Object.keys(values).map(key => ({
    key,
    val: values[key]
  })) || [];
  // Sort in ascending order
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return {
      ...acc,
      [obj.key]: obj.val
    };
  }, {});
};

// Keep in mind that @media is inclusive by the CSS specification.
function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536 // large screen
    },
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints;
  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }
  return {
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit,
    ...other
  };
}

/**
 * For using in `sx` prop to sort the breakpoint from low to high.
 * Note: this function does not work and will not support multiple units.
 *       e.g. input: { '@container (min-width:300px)': '1rem', '@container (min-width:40rem)': '2rem' }
 *            output: { '@container (min-width:40rem)': '2rem', '@container (min-width:300px)': '1rem' } // since 40 < 300 even though 40rem > 300px
 */
function sortContainerQueries(theme, css) {
  if (!theme.containerQueries) {
    return css;
  }
  const sorted = Object.keys(css).filter(key => key.startsWith('@container')).sort((a, b) => {
    const regex = /min-width:\s*([0-9.]+)/;
    return +(a.match(regex)?.[1] || 0) - +(b.match(regex)?.[1] || 0);
  });
  if (!sorted.length) {
    return css;
  }
  return sorted.reduce((acc, key) => {
    const value = css[key];
    delete acc[key];
    acc[key] = value;
    return acc;
  }, {
    ...css
  });
}
function isCqShorthand(breakpointKeys, value) {
  return value === '@' || value.startsWith('@') && (breakpointKeys.some(key => value.startsWith(`@${key}`)) || !!value.match(/^@\d/));
}
function getContainerQuery(theme, shorthand) {
  const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
  if (!matches) {
    return null;
  }
  const [, containerQuery, containerName] = matches;
  const value = Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery;
  return theme.containerQueries(containerName).up(value);
}
function cssContainerQueries(themeInput) {
  const toContainerQuery = (mediaQuery, name) => mediaQuery.replace('@media', name ? `@container ${name}` : '@container');
  function attachCq(node, name) {
    node.up = (...args) => toContainerQuery(themeInput.breakpoints.up(...args), name);
    node.down = (...args) => toContainerQuery(themeInput.breakpoints.down(...args), name);
    node.between = (...args) => toContainerQuery(themeInput.breakpoints.between(...args), name);
    node.only = (...args) => toContainerQuery(themeInput.breakpoints.only(...args), name);
    node.not = (...args) => {
      const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
      if (result.includes('not all and')) {
        // `@container` does not work with `not all and`, so need to invert the logic
        return result.replace('not all and ', '').replace('min-width:', 'width<').replace('max-width:', 'width>').replace('and', 'or');
      }
      return result;
    };
  }
  const node = {};
  const containerQueries = name => {
    attachCq(node, name);
    return node;
  };
  attachCq(containerQueries);
  return {
    ...themeInput,
    containerQueries
  };
}

const shape = {
  borderRadius: 4
};

function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false // No need to clone deep, it's way faster.
  });
}

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
const values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen
};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values[key]}px)`
};
const defaultContainerQueries = {
  containerQueries: containerName => ({
    up: key => {
      let result = typeof key === 'number' ? key : values[key] || key;
      if (typeof result === 'number') {
        result = `${result}px`;
      }
      return containerName ? `@container ${containerName} (min-width:${result})` : `@container (min-width:${result})`;
    }
  })
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (isCqShorthand(themeBreakpoints.keys, breakpoint)) {
        const containerKey = getContainerQuery(theme.containerQueries ? theme : defaultContainerQueries, breakpoint);
        if (containerKey) {
          acc[containerKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
        }
      }
      // key is breakpoint
      else if (Object.keys(themeBreakpoints.values || values).includes(breakpoint)) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  const breakpointsInOrder = breakpointsInput.keys?.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style);
}

function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  // Check if CSS variables are used
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split('.').reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = props => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = propValueFinal => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = {};
  fn.filterProps = [prop];
  return fn;
}

function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}

const properties = {
  m: 'margin',
  p: 'padding'
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize(prop => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});
const marginKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd'];
const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd'];
[...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey, true) ?? defaultValue;
  if (typeof themeSpacing === 'number' || typeof themeSpacing === 'string') {
    return val => {
      if (typeof val === 'string') {
        return val;
      }
      if (typeof themeSpacing === 'string') {
        if (themeSpacing.startsWith('var(') && val === 0) {
          return 0;
        }
        if (themeSpacing.startsWith('var(') && val === 1) {
          return themeSpacing;
        }
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return val => {
      if (typeof val === 'string') {
        return val;
      }
      const abs = Math.abs(val);
      const transformed = themeSpacing[abs];
      if (val >= 0) {
        return transformed;
      }
      if (typeof transformed === 'number') {
        return -transformed;
      }
      if (typeof transformed === 'string' && transformed.startsWith('var(')) {
        return `calc(-1 * ${transformed})`;
      }
      return `-${transformed}`;
    };
  }
  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }
  return () => undefined;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8);
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }
  return transformer(propValue);
}
function getStyleFromPropValue(cssProperties, transformer) {
  return propValue => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (!keys.includes(prop)) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map(prop => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
function margin(props) {
  return style(props, marginKeys);
}
margin.propTypes = {};
margin.filterProps = marginKeys;
function padding(props) {
  return style(props, paddingKeys);
}
padding.propTypes = {};
padding.filterProps = paddingKeys;

// The different signatures imply different meaning for their arguments that can't be expressed structurally.
// We express the difference with variable names.

function createSpacing(spacingInput = 8,
// Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
// Smaller components, such as icons, can align to a 4dp grid.
// https://m2.material.io/design/layout/understanding-layout.html
transform = createUnarySpacing({
  spacing: spacingInput
})) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  }
  const spacing = (...argsInput) => {
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map(argument => {
      const output = transform(argument);
      return typeof output === 'number' ? `${output}px` : output;
    }).join(' ');
  };
  spacing.mui = true;
  return spacing;
}

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach(prop => {
      acc[prop] = style;
    });
    return acc;
  }, {});

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = props => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = {};
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);
  return fn;
}

function borderTransform(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style$1({
    prop,
    themeKey: 'borders',
    transform
  });
}
const border = createBorderStyle('border', borderTransform);
const borderTop = createBorderStyle('borderTop', borderTransform);
const borderRight = createBorderStyle('borderRight', borderTransform);
const borderBottom = createBorderStyle('borderBottom', borderTransform);
const borderLeft = createBorderStyle('borderLeft', borderTransform);
const borderColor = createBorderStyle('borderColor');
const borderTopColor = createBorderStyle('borderTopColor');
const borderRightColor = createBorderStyle('borderRightColor');
const borderBottomColor = createBorderStyle('borderBottomColor');
const borderLeftColor = createBorderStyle('borderLeftColor');
const outline = createBorderStyle('outline', borderTransform);
const outlineColor = createBorderStyle('outlineColor');

// false positive
// eslint-disable-next-line react/function-component-definition
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4);
    const styleFromPropValue = propValue => ({
      borderRadius: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = {};
borderRadius.filterProps = ['borderRadius'];
compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);

// false positive
// eslint-disable-next-line react/function-component-definition
const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8);
    const styleFromPropValue = propValue => ({
      gap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = {};
gap.filterProps = ['gap'];

// false positive
// eslint-disable-next-line react/function-component-definition
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8);
    const styleFromPropValue = propValue => ({
      columnGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = {};
columnGap.filterProps = ['columnGap'];

// false positive
// eslint-disable-next-line react/function-component-definition
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8);
    const styleFromPropValue = propValue => ({
      rowGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = {};
rowGap.filterProps = ['rowGap'];
const gridColumn = style$1({
  prop: 'gridColumn'
});
const gridRow = style$1({
  prop: 'gridRow'
});
const gridAutoFlow = style$1({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = style$1({
  prop: 'gridAutoColumns'
});
const gridAutoRows = style$1({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = style$1({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = style$1({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = style$1({
  prop: 'gridTemplateAreas'
});
const gridArea = style$1({
  prop: 'gridArea'
});
compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);

function paletteTransform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}
const color = style$1({
  prop: 'color',
  themeKey: 'palette',
  transform: paletteTransform
});
const bgcolor = style$1({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
const backgroundColor = style$1({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
compose(color, bgcolor, backgroundColor);

function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
const width = style$1({
  prop: 'width',
  transform: sizingTransform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      const breakpoint = props.theme?.breakpoints?.values?.[propValue] || values[propValue];
      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue)
        };
      }
      if (props.theme?.breakpoints?.unit !== 'px') {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
        };
      }
      return {
        maxWidth: breakpoint
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ['maxWidth'];
const minWidth = style$1({
  prop: 'minWidth',
  transform: sizingTransform
});
const height = style$1({
  prop: 'height',
  transform: sizingTransform
});
const maxHeight = style$1({
  prop: 'maxHeight',
  transform: sizingTransform
});
const minHeight = style$1({
  prop: 'minHeight',
  transform: sizingTransform
});
style$1({
  prop: 'size',
  cssProperty: 'width',
  transform: sizingTransform
});
style$1({
  prop: 'size',
  cssProperty: 'height',
  transform: sizingTransform
});
const boxSizing = style$1({
  prop: 'boxSizing'
});
compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);

const defaultSxConfig = {
  // borders
  border: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderTop: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderRight: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderBottom: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderLeft: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderColor: {
    themeKey: 'palette'
  },
  borderTopColor: {
    themeKey: 'palette'
  },
  borderRightColor: {
    themeKey: 'palette'
  },
  borderBottomColor: {
    themeKey: 'palette'
  },
  borderLeftColor: {
    themeKey: 'palette'
  },
  outline: {
    themeKey: 'borders',
    transform: borderTransform
  },
  outlineColor: {
    themeKey: 'palette'
  },
  borderRadius: {
    themeKey: 'shape.borderRadius',
    style: borderRadius
  },
  // palette
  color: {
    themeKey: 'palette',
    transform: paletteTransform
  },
  bgcolor: {
    themeKey: 'palette',
    cssProperty: 'backgroundColor',
    transform: paletteTransform
  },
  backgroundColor: {
    themeKey: 'palette',
    transform: paletteTransform
  },
  // spacing
  p: {
    style: padding
  },
  pt: {
    style: padding
  },
  pr: {
    style: padding
  },
  pb: {
    style: padding
  },
  pl: {
    style: padding
  },
  px: {
    style: padding
  },
  py: {
    style: padding
  },
  padding: {
    style: padding
  },
  paddingTop: {
    style: padding
  },
  paddingRight: {
    style: padding
  },
  paddingBottom: {
    style: padding
  },
  paddingLeft: {
    style: padding
  },
  paddingX: {
    style: padding
  },
  paddingY: {
    style: padding
  },
  paddingInline: {
    style: padding
  },
  paddingInlineStart: {
    style: padding
  },
  paddingInlineEnd: {
    style: padding
  },
  paddingBlock: {
    style: padding
  },
  paddingBlockStart: {
    style: padding
  },
  paddingBlockEnd: {
    style: padding
  },
  m: {
    style: margin
  },
  mt: {
    style: margin
  },
  mr: {
    style: margin
  },
  mb: {
    style: margin
  },
  ml: {
    style: margin
  },
  mx: {
    style: margin
  },
  my: {
    style: margin
  },
  margin: {
    style: margin
  },
  marginTop: {
    style: margin
  },
  marginRight: {
    style: margin
  },
  marginBottom: {
    style: margin
  },
  marginLeft: {
    style: margin
  },
  marginX: {
    style: margin
  },
  marginY: {
    style: margin
  },
  marginInline: {
    style: margin
  },
  marginInlineStart: {
    style: margin
  },
  marginInlineEnd: {
    style: margin
  },
  marginBlock: {
    style: margin
  },
  marginBlockStart: {
    style: margin
  },
  marginBlockEnd: {
    style: margin
  },
  // display
  displayPrint: {
    cssProperty: false,
    transform: value => ({
      '@media print': {
        display: value
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: gap
  },
  rowGap: {
    style: rowGap
  },
  columnGap: {
    style: columnGap
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: 'zIndex'
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: 'shadows'
  },
  // sizing
  width: {
    transform: sizingTransform
  },
  maxWidth: {
    style: maxWidth
  },
  minWidth: {
    transform: sizingTransform
  },
  height: {
    transform: sizingTransform
  },
  maxHeight: {
    transform: sizingTransform
  },
  minHeight: {
    transform: sizingTransform
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: 'font'
  },
  fontFamily: {
    themeKey: 'typography'
  },
  fontSize: {
    themeKey: 'typography'
  },
  fontStyle: {
    themeKey: 'typography'
  },
  fontWeight: {
    themeKey: 'typography'
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: false,
    themeKey: 'typography'
  }
};

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style
    } = options;
    if (val == null) {
      return null;
    }

    // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
    if (themeKey === 'typography' && val === 'inherit') {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme, themeKey) || {};
    if (style) {
      return style(props);
    }
    const styleFromPropValue = propValueFinal => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx(props) {
    const {
      sx,
      theme = {},
      nested
    } = props || {};
    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }
    const config = theme.unstable_sxConfig ?? defaultSxConfig;

    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css = emptyBreakpoints;
      Object.keys(sxObject).forEach(styleKey => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (config[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, x => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme,
                  nested: true
                });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      if (!nested && theme.modularCssLayers) {
        return {
          '@layer sx': sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css))
        };
      }
      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css));
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];

/**
 * A universal utility to style components with multiple color modes. Always use it from the theme object.
 * It works with:
 *  - [Basic theme](https://mui.com/material-ui/customization/dark-mode/)
 *  - [CSS theme variables](https://mui.com/material-ui/customization/css-theme-variables/overview/)
 *  - Zero-runtime engine
 *
 * Tips: Use an array over object spread and place `theme.applyStyles()` last.
 *
 * With the styled function:
 * ✅ [{ background: '#e5e5e5' }, theme.applyStyles('dark', { background: '#1c1c1c' })]
 * 🚫 { background: '#e5e5e5', ...theme.applyStyles('dark', { background: '#1c1c1c' })}
 *
 * With the sx prop:
 * ✅ [{ background: '#e5e5e5' }, theme => theme.applyStyles('dark', { background: '#1c1c1c' })]
 * 🚫 { background: '#e5e5e5', ...theme => theme.applyStyles('dark', { background: '#1c1c1c' })}
 *
 * @example
 * 1. using with `styled`:
 * ```jsx
 *   const Component = styled('div')(({ theme }) => [
 *     { background: '#e5e5e5' },
 *     theme.applyStyles('dark', {
 *       background: '#1c1c1c',
 *       color: '#fff',
 *     }),
 *   ]);
 * ```
 *
 * @example
 * 2. using with `sx` prop:
 * ```jsx
 *   <Box sx={[
 *     { background: '#e5e5e5' },
 *     theme => theme.applyStyles('dark', {
 *        background: '#1c1c1c',
 *        color: '#fff',
 *      }),
 *     ]}
 *   />
 * ```
 *
 * @example
 * 3. theming a component:
 * ```jsx
 *   extendTheme({
 *     components: {
 *       MuiButton: {
 *         styleOverrides: {
 *           root: ({ theme }) => [
 *             { background: '#e5e5e5' },
 *             theme.applyStyles('dark', {
 *               background: '#1c1c1c',
 *               color: '#fff',
 *             }),
 *           ],
 *         },
 *       }
 *     }
 *   })
 *```
 */
function applyStyles(key, styles) {
  // @ts-expect-error this is 'any' type
  const theme = this;
  if (theme.vars) {
    if (!theme.colorSchemes?.[key] || typeof theme.getColorSchemeSelector !== 'function') {
      return {};
    }
    // If CssVarsProvider is used as a provider, returns '*:where({selector}) &'
    let selector = theme.getColorSchemeSelector(key);
    if (selector === '&') {
      return styles;
    }
    if (selector.includes('data-') || selector.includes('.')) {
      // '*' is required as a workaround for Emotion issue (https://github.com/emotion-js/emotion/issues/2836)
      selector = `*:where(${selector.replace(/\s*&$/, '')}) &`;
    }
    return {
      [selector]: styles
    };
  }
  if (theme.palette.mode === key) {
    return styles;
  }
  return {};
}

function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {},
    ...other
  } = options;
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: {
      mode: 'light',
      ...paletteInput
    },
    spacing,
    shape: {
      ...shape,
      ...shapeInput
    }
  }, other);
  muiTheme = cssContainerQueries(muiTheme);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...other?.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-labels */
/* eslint-disable no-lone-blocks */

createTheme();

// Update /system/styled/#api in case if this changes
function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

function useTreeItemState(itemId) {
  const {
    instance,
    items: {
      onItemClick
    },
    selection: {
      multiSelect,
      checkboxSelection,
      disableSelection
    },
    expansion: {
      expansionTrigger
    }
  } = useTreeViewContext();
  const expandable = instance.isItemExpandable(itemId);
  const expanded = instance.isItemExpanded(itemId);
  const focused = instance.isItemFocused(itemId);
  const selected = instance.isItemSelected(itemId);
  const disabled = instance.isItemDisabled(itemId);
  const editing = instance?.isItemBeingEdited ? instance?.isItemBeingEdited(itemId) : false;
  const editable = instance.isItemEditable ? instance.isItemEditable(itemId) : false;
  const handleExpansion = event => {
    if (!disabled) {
      if (!focused) {
        instance.focusItem(event, itemId);
      }
      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

      // If already expanded and trying to toggle selection don't close
      if (expandable && !(multiple && instance.isItemExpanded(itemId))) {
        instance.toggleItemExpansion(event, itemId);
      }
    }
  };
  const handleSelection = event => {
    if (!disabled) {
      if (!focused && !editing) {
        instance.focusItem(event, itemId);
      }
      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
      if (multiple) {
        if (event.shiftKey) {
          instance.expandSelectionRange(event, itemId);
        } else {
          instance.selectItem({
            event,
            itemId,
            keepExistingSelection: true
          });
        }
      } else {
        instance.selectItem({
          event,
          itemId,
          shouldBeSelected: true
        });
      }
    }
  };
  const handleCheckboxSelection = event => {
    if (disableSelection || disabled) {
      return;
    }
    const hasShift = event.nativeEvent.shiftKey;
    if (multiSelect && hasShift) {
      instance.expandSelectionRange(event, itemId);
    } else {
      instance.selectItem({
        event,
        itemId,
        keepExistingSelection: multiSelect,
        shouldBeSelected: event.target.checked
      });
    }
  };
  const preventSelection = event => {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      // Prevent text selection
      event.preventDefault();
    }
  };
  const toggleItemEditing = () => {
    if (!hasPlugin(instance, useTreeViewLabel)) {
      return;
    }
    if (instance.isItemEditable(itemId)) {
      if (instance.isItemBeingEdited(itemId)) {
        instance.setEditedItemId(null);
      } else {
        instance.setEditedItemId(itemId);
      }
    }
  };
  const handleSaveItemLabel = (event, label) => {
    if (!hasPlugin(instance, useTreeViewLabel)) {
      return;
    }

    // As a side effect of `instance.focusItem` called here and in `handleCancelItemLabelEditing` the `labelInput` is blurred
    // The `onBlur` event is triggered, which calls `handleSaveItemLabel` again.
    // To avoid creating an unwanted behavior we need to check if the item is being edited before calling `updateItemLabel`
    // using `instance.isItemBeingEditedRef` instead of `instance.isItemBeingEdited` since the state is not yet updated in this point
    if (instance.isItemBeingEditedRef(itemId)) {
      instance.updateItemLabel(itemId, label);
      toggleItemEditing();
      instance.focusItem(event, itemId);
    }
  };
  const handleCancelItemLabelEditing = event => {
    if (!hasPlugin(instance, useTreeViewLabel)) {
      return;
    }
    if (instance.isItemBeingEditedRef(itemId)) {
      toggleItemEditing();
      instance.focusItem(event, itemId);
    }
  };
  return {
    disabled,
    expanded,
    selected,
    focused,
    editable,
    editing,
    disableSelection,
    checkboxSelection,
    handleExpansion,
    handleSelection,
    handleCheckboxSelection,
    handleContentClick: onItemClick,
    preventSelection,
    expansionTrigger,
    toggleItemEditing,
    handleSaveItemLabel,
    handleCancelItemLabelEditing
  };
}

const TreeItem2DragAndDropOverlayRoot = styled('div', {
  name: 'MuiTreeItem2DragAndDropOverlay',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
  shouldForwardProp: prop => shouldForwardProp(prop) && prop !== 'action'
})(({
  theme
}) => ({
  position: 'absolute',
  left: 0,
  display: 'flex',
  top: 0,
  bottom: 0,
  right: 0,
  pointerEvents: 'none',
  variants: [{
    props: {
      action: 'make-child'
    },
    style: {
      marginLeft: 'calc(var(--TreeView-indentMultiplier) * var(--TreeView-itemDepth))',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.darkChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha$1(theme.palette.primary.dark, theme.palette.action.focusOpacity)
    }
  }, {
    props: {
      action: 'reorder-above'
    },
    style: {
      marginLeft: 'calc(var(--TreeView-indentMultiplier) * var(--TreeView-itemDepth))',
      borderTop: `1px solid ${(theme.vars || theme).palette.action.active}`
    }
  }, {
    props: {
      action: 'reorder-below'
    },
    style: {
      marginLeft: 'calc(var(--TreeView-indentMultiplier) * var(--TreeView-itemDepth))',
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.active}`
    }
  }, {
    props: {
      action: 'move-to-parent'
    },
    style: {
      marginLeft: 'calc(var(--TreeView-indentMultiplier) * calc(var(--TreeView-itemDepth) - 1))',
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.active}`
    }
  }]
}));
function TreeItem2DragAndDropOverlay(props) {
  if (props.action == null) {
    return null;
  }
  return /*#__PURE__*/jsx(TreeItem2DragAndDropOverlayRoot, _extends({}, props));
}

/**
 * @ignore - internal component.
 */
const TreeItem2LabelInput = styled('input', {
  name: 'MuiTreeItem2',
  slot: 'LabelInput',
  overridesResolver: (props, styles) => styles.labelInput
})(({
  theme
}) => _extends({}, theme.typography.body1, {
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: 'none',
  padding: '0 2px',
  boxSizing: 'border-box',
  '&:focus': {
    outline: `1px solid ${theme.palette.primary.main}`
  }
}));

const _excluded$1 = ["classes", "className", "displayIcon", "expansionIcon", "icon", "label", "itemId", "onClick", "onMouseDown", "dragAndDropOverlayProps", "labelInputProps"];
/**
 * @ignore - internal component.
 */
const TreeItemContent = /*#__PURE__*/React.forwardRef(function TreeItemContent(props, ref) {
  const {
      classes,
      className,
      displayIcon,
      expansionIcon,
      icon: iconProp,
      label,
      itemId,
      onClick,
      onMouseDown,
      dragAndDropOverlayProps,
      labelInputProps
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const {
    disabled,
    expanded,
    selected,
    focused,
    editing,
    editable,
    disableSelection,
    checkboxSelection,
    handleExpansion,
    handleSelection,
    handleCheckboxSelection,
    handleContentClick,
    preventSelection,
    expansionTrigger,
    toggleItemEditing
  } = useTreeItemState(itemId);
  const icon = iconProp || expansionIcon || displayIcon;
  const checkboxRef = React.useRef(null);
  const handleMouseDown = event => {
    preventSelection(event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  };
  const handleClick = event => {
    handleContentClick?.(event, itemId);
    if (checkboxRef.current?.contains(event.target)) {
      return;
    }
    if (expansionTrigger === 'content') {
      handleExpansion(event);
    }
    if (!checkboxSelection) {
      handleSelection(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  // If we click on the expansion icon and expansionTrigger is "iconContainer", we expand or collapse the tree item.
  const handleIconClick = expansionIcon != null && icon === expansionIcon && expansionTrigger === 'iconContainer' ? event => {
    if (expansionIcon != null && icon === expansionIcon && expansionTrigger === 'iconContainer') {
      handleExpansion(event);
    }
  } : undefined;
  const handleLabelDoubleClick = event => {
    if (event.defaultMuiPrevented) {
      return;
    }
    toggleItemEditing();
  };
  return /*#__PURE__*/ /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */jsxs("div", _extends({}, other, {
    className: clsx(classes.root, className, expanded && classes.expanded, selected && classes.selected, focused && classes.focused, disabled && classes.disabled, editing && classes.editing, editable && classes.editable),
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    ref: ref,
    children: [/*#__PURE__*/jsx("div", {
      className: classes.iconContainer,
      onClick: handleIconClick,
      children: icon
    }), checkboxSelection && /*#__PURE__*/jsx(Checkbox, {
      className: classes.checkbox,
      checked: selected,
      onChange: handleCheckboxSelection,
      disabled: disabled || disableSelection,
      ref: checkboxRef,
      tabIndex: -1
    }), editing ? /*#__PURE__*/jsx(TreeItem2LabelInput, _extends({}, labelInputProps, {
      className: classes.labelInput
    })) : /*#__PURE__*/jsx("div", _extends({
      className: classes.label
    }, editable && {
      onDoubleClick: handleLabelDoubleClick
    }, {
      children: label
    })), dragAndDropOverlayProps && /*#__PURE__*/jsx(TreeItem2DragAndDropOverlay, _extends({}, dragAndDropOverlayProps))]
  }));
});

function getTreeItemUtilityClass(slot) {
  return generateUtilityClass('MuiTreeItem', slot);
}
const treeItemClasses = generateUtilityClasses('MuiTreeItem', ['root', 'groupTransition', 'content', 'expanded', 'selected', 'focused', 'disabled', 'iconContainer', 'label', 'checkbox', 'labelInput', 'editable', 'editing', 'dragAndDropOverlay']);

const TreeViewExpandIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'TreeViewExpandIcon');
const TreeViewCollapseIcon = createSvgIcon(/*#__PURE__*/jsx("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), 'TreeViewCollapseIcon');

function TreeItem2Provider(props) {
  const {
    children,
    itemId
  } = props;
  const {
    wrapItem,
    instance
  } = useTreeViewContext();
  return wrapItem({
    children,
    itemId,
    instance
  });
}
TreeItem2Provider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  itemId: PropTypes.string.isRequired
};

const _excluded = ["children", "className", "slots", "slotProps", "ContentComponent", "ContentProps", "itemId", "id", "label", "onClick", "onMouseDown", "onFocus", "onBlur", "onKeyDown"],
  _excluded2 = ["ownerState"],
  _excluded3 = ["ownerState"],
  _excluded4 = ["ownerState"];
const useThemeProps = createUseThemeProps();
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    content: ['content'],
    expanded: ['expanded'],
    selected: ['selected'],
    focused: ['focused'],
    disabled: ['disabled'],
    iconContainer: ['iconContainer'],
    checkbox: ['checkbox'],
    label: ['label'],
    labelInput: ['labelInput'],
    editing: ['editing'],
    editable: ['editable'],
    groupTransition: ['groupTransition']
  };
  return composeClasses(slots, getTreeItemUtilityClass, classes);
};
const TreeItemRoot = styled('li', {
  name: 'MuiTreeItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  outline: 0
});
const StyledTreeItemContent = styled(TreeItemContent, {
  name: 'MuiTreeItem',
  slot: 'Content',
  overridesResolver: (props, styles) => {
    return [styles.content, styles.iconContainer && {
      [`& .${treeItemClasses.iconContainer}`]: styles.iconContainer
    }, styles.label && {
      [`& .${treeItemClasses.label}`]: styles.label
    }];
  },
  shouldForwardProp: prop => shouldForwardProp(prop) && prop !== 'indentationAtItemLevel'
})(({
  theme
}) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  boxSizing: 'border-box',
  // prevent width + padding to overflow
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${treeItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
    backgroundColor: 'transparent'
  },
  [`&.${treeItemClasses.focused}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${treeItemClasses.selected}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha$1(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha$1(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha$1(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    },
    [`&.${treeItemClasses.focused}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha$1(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    width: 16,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18
    }
  },
  [`& .${treeItemClasses.label}`]: _extends({
    width: '100%',
    boxSizing: 'border-box',
    // prevent width + padding to overflow
    // fixes overflow - see https://github.com/mui/material-ui/issues/27372
    minWidth: 0,
    position: 'relative'
  }, theme.typography.body1),
  [`& .${treeItemClasses.checkbox}`]: {
    padding: 0
  },
  variants: [{
    props: {
      indentationAtItemLevel: true
    },
    style: {
      paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`
    }
  }]
}));
const TreeItemGroup = styled(Collapse, {
  name: 'MuiTreeItem',
  slot: 'GroupTransition',
  overridesResolver: (props, styles) => styles.groupTransition,
  shouldForwardProp: prop => shouldForwardProp(prop) && prop !== 'indentationAtItemLevel'
})({
  margin: 0,
  padding: 0,
  paddingLeft: 'var(--TreeView-itemChildrenIndentation)',
  variants: [{
    props: {
      indentationAtItemLevel: true
    },
    style: {
      paddingLeft: 0
    }
  }]
});

/**
 *
 * Demos:
 *
 * - [Tree View](https://mui.com/x/react-tree-view/)
 *
 * API:
 *
 * - [TreeItem API](https://mui.com/x/api/tree-view/tree-item/)
 */
const TreeItem = /*#__PURE__*/React.forwardRef(function TreeItem(inProps, inRef) {
  const {
    icons: contextIcons,
    runItemPlugins,
    items: {
      disabledItemsFocusable,
      indentationAtItemLevel
    },
    selection: {
      disableSelection
    },
    treeId,
    instance
  } = useTreeViewContext();
  const depthContext = React.useContext(TreeViewItemDepthContext);
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTreeItem'
  });
  const {
      children,
      className,
      slots: inSlots,
      slotProps: inSlotProps,
      ContentComponent = TreeItemContent,
      ContentProps,
      itemId,
      id,
      label,
      onClick,
      onMouseDown,
      onBlur,
      onKeyDown
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    expanded,
    focused,
    selected,
    disabled,
    editing,
    handleCancelItemLabelEditing,
    handleSaveItemLabel
  } = useTreeItemState(itemId);
  const {
    contentRef,
    rootRef,
    propsEnhancers
  } = runItemPlugins(props);
  const rootRefObject = React.useRef(null);
  const contentRefObject = React.useRef(null);
  const handleRootRef = useForkRef(inRef, rootRef, rootRefObject);
  const handleContentRef = useForkRef(ContentProps?.ref, contentRef, contentRefObject);
  const slots = {
    expandIcon: inSlots?.expandIcon ?? contextIcons.slots.expandIcon ?? TreeViewExpandIcon,
    collapseIcon: inSlots?.collapseIcon ?? contextIcons.slots.collapseIcon ?? TreeViewCollapseIcon,
    endIcon: inSlots?.endIcon ?? contextIcons.slots.endIcon,
    icon: inSlots?.icon,
    groupTransition: inSlots?.groupTransition
  };
  const isExpandable = reactChildren => {
    if (Array.isArray(reactChildren)) {
      return reactChildren.length > 0 && reactChildren.some(isExpandable);
    }
    return Boolean(reactChildren);
  };
  const expandable = isExpandable(children);
  const ownerState = _extends({}, props, {
    expanded,
    focused,
    selected,
    disabled,
    indentationAtItemLevel
  });
  const classes = useUtilityClasses(ownerState);
  const GroupTransition = slots.groupTransition ?? undefined;
  const groupTransitionProps = useSlotProps({
    elementType: GroupTransition,
    ownerState: {},
    externalSlotProps: inSlotProps?.groupTransition,
    additionalProps: _extends({
      unmountOnExit: true,
      in: expanded,
      component: 'ul',
      role: 'group'
    }, indentationAtItemLevel ? {
      indentationAtItemLevel: true
    } : {}),
    className: classes.groupTransition
  });
  const ExpansionIcon = expanded ? slots.collapseIcon : slots.expandIcon;
  const _useSlotProps = useSlotProps({
      elementType: ExpansionIcon,
      ownerState: {},
      externalSlotProps: tempOwnerState => {
        if (expanded) {
          return _extends({}, resolveComponentProps(contextIcons.slotProps.collapseIcon, tempOwnerState), resolveComponentProps(inSlotProps?.collapseIcon, tempOwnerState));
        }
        return _extends({}, resolveComponentProps(contextIcons.slotProps.expandIcon, tempOwnerState), resolveComponentProps(inSlotProps?.expandIcon, tempOwnerState));
      }
    }),
    expansionIconProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded2);
  const expansionIcon = expandable && !!ExpansionIcon ? /*#__PURE__*/jsx(ExpansionIcon, _extends({}, expansionIconProps)) : null;
  const DisplayIcon = expandable ? undefined : slots.endIcon;
  const _useSlotProps2 = useSlotProps({
      elementType: DisplayIcon,
      ownerState: {},
      externalSlotProps: tempOwnerState => {
        if (expandable) {
          return {};
        }
        return _extends({}, resolveComponentProps(contextIcons.slotProps.endIcon, tempOwnerState), resolveComponentProps(inSlotProps?.endIcon, tempOwnerState));
      }
    }),
    displayIconProps = _objectWithoutPropertiesLoose(_useSlotProps2, _excluded3);
  const displayIcon = DisplayIcon ? /*#__PURE__*/jsx(DisplayIcon, _extends({}, displayIconProps)) : null;
  const Icon = slots.icon;
  const _useSlotProps3 = useSlotProps({
      elementType: Icon,
      ownerState: {},
      externalSlotProps: inSlotProps?.icon
    }),
    iconProps = _objectWithoutPropertiesLoose(_useSlotProps3, _excluded4);
  const icon = Icon ? /*#__PURE__*/jsx(Icon, _extends({}, iconProps)) : null;

  // https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
  let ariaSelected;
  if (selected) {
    // - each selected node has aria-selected set to true.
    ariaSelected = true;
  } else if (disableSelection || disabled) {
    // - if the tree contains nodes that are not selectable, aria-selected is not present on those nodes.
    ariaSelected = undefined;
  } else {
    // - all nodes that are selectable but not selected have aria-selected set to false.
    ariaSelected = false;
  }
  function handleFocus(event) {
    const canBeFocused = !disabled || disabledItemsFocusable;
    if (!focused && canBeFocused && event.currentTarget === event.target) {
      instance.focusItem(event, itemId);
    }
  }
  function handleBlur(event) {
    onBlur?.(event);
    if (editing ||
    // we can exit the editing state by clicking outside the input (within the Tree Item) or by pressing Enter or Escape -> we don't want to remove the focused item from the state in these cases
    // we can also exit the editing state by clicking on the root itself -> want to remove the focused item from the state in this case
    event.relatedTarget && isTargetInDescendants(event.relatedTarget, rootRefObject.current) && (event.target && event.target?.dataset?.element === 'labelInput' && isTargetInDescendants(event.target, rootRefObject.current) || event.relatedTarget?.dataset?.element === 'labelInput')) {
      return;
    }
    instance.removeFocusedItem();
  }
  const handleKeyDown = event => {
    onKeyDown?.(event);
    if (event.target?.dataset?.element === 'labelInput') {
      return;
    }
    instance.handleItemKeyDown(event, itemId);
  };
  const idAttribute = generateTreeItemIdAttribute({
    itemId,
    treeId,
    id
  });
  const tabIndex = instance.canItemBeTabbed(itemId) ? 0 : -1;
  const sharedPropsEnhancerParams = {
    rootRefObject,
    contentRefObject,
    interactions: {
      handleSaveItemLabel,
      handleCancelItemLabelEditing
    }
  };
  const enhancedRootProps = propsEnhancers.root?.(_extends({}, sharedPropsEnhancerParams, {
    externalEventHandlers: extractEventHandlers(other)
  })) ?? {};
  const enhancedContentProps = propsEnhancers.content?.(_extends({}, sharedPropsEnhancerParams, {
    externalEventHandlers: extractEventHandlers(ContentProps)
  })) ?? {};
  const enhancedDragAndDropOverlayProps = propsEnhancers.dragAndDropOverlay?.(_extends({}, sharedPropsEnhancerParams, {
    externalEventHandlers: {}
  })) ?? {};
  const enhancedLabelInputProps = propsEnhancers.labelInput?.(_extends({}, sharedPropsEnhancerParams, {
    externalEventHandlers: {}
  })) ?? {};
  return /*#__PURE__*/jsx(TreeItem2Provider, {
    itemId: itemId,
    children: /*#__PURE__*/jsxs(TreeItemRoot, _extends({
      className: clsx(classes.root, className),
      role: "treeitem",
      "aria-expanded": expandable ? expanded : undefined,
      "aria-selected": ariaSelected,
      "aria-disabled": disabled || undefined,
      id: idAttribute,
      tabIndex: tabIndex
    }, other, {
      ownerState: ownerState,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      ref: handleRootRef,
      style: indentationAtItemLevel ? _extends({}, other.style, {
        '--TreeView-itemDepth': typeof depthContext === 'function' ? depthContext(itemId) : depthContext
      }) : other.style
    }, enhancedRootProps, {
      children: [/*#__PURE__*/jsx(StyledTreeItemContent, _extends({
        as: ContentComponent,
        classes: {
          root: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          focused: classes.focused,
          disabled: classes.disabled,
          editable: classes.editable,
          editing: classes.editing,
          iconContainer: classes.iconContainer,
          label: classes.label,
          labelInput: classes.labelInput,
          checkbox: classes.checkbox
        },
        label: label,
        itemId: itemId,
        onClick: onClick,
        onMouseDown: onMouseDown,
        icon: icon,
        expansionIcon: expansionIcon,
        displayIcon: displayIcon,
        ownerState: ownerState
      }, ContentProps, enhancedContentProps, enhancedDragAndDropOverlayProps.action == null ? {} : {
        dragAndDropOverlayProps: enhancedDragAndDropOverlayProps
      }, enhancedLabelInputProps.value == null ? {} : {
        labelInputProps: enhancedLabelInputProps
      }, {
        ref: handleContentRef
      })), children && /*#__PURE__*/jsx(TreeItemGroup, _extends({
        as: GroupTransition
      }, groupTransitionProps, {
        children: children
      }))]
    }))
  });
});

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

function useObservable() {
  return useMemo(() => {
    const subject = new Subject();
    return { subject, observable: subject.asObservable() };
  }, []);
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

function useUnmount$() {
  const { subject, observable } = useObservable();
  useEffect(() => {
    return () => {
      subject.next();
      subject.complete();
    };
  }, [subject]);
  return observable;
}

var DEFAULT_ROOT = '/site';
var TREE_FETCH_LIMIT = 100;
/** Same roots as Studio's PathSelectionDialog BasePathSelector defaults. */
var STUDIO_BASE_PATHS = [
    { id: 'content', path: '/site' },
    { id: 'assets', path: '/static-assets' },
    { id: 'templates', path: '/templates' },
    { id: 'scripts', path: '/scripts' }
];
function getTreeSystemTypes(rootPath) {
    switch (getRootPath(rootPath || DEFAULT_ROOT)) {
        case '/static-assets':
            return ['folder', 'asset'];
        case '/templates':
            return ['folder', 'renderingTemplate'];
        case '/scripts':
            return ['folder', 'script'];
        default:
            return ['folder', 'page', 'component'];
    }
}
function allowsFileSelection(rootPath) {
    var root = getRootPath(rootPath || '');
    return root === '/static-assets' || root === '/templates' || root === '/scripts';
}
function parseChildrenResponse(response) {
    var _a, _b;
    var items = [];
    for (var index = 0; index < response.length; index++) {
        var item = response[index];
        if (item === null || item === void 0 ? void 0 : item.path) {
            items.push(item);
        }
    }
    if ((_a = response.levelDescriptor) === null || _a === void 0 ? void 0 : _a.path) {
        items.unshift(response.levelDescriptor);
    }
    return {
        items: items,
        total: (_b = response.total) !== null && _b !== void 0 ? _b : items.length
    };
}
function getChildrenFetchPath(itemPath) {
    if (itemPath.startsWith('/site/website') && itemPath.endsWith('/index.xml')) {
        return withoutIndex(itemPath);
    }
    return itemPath;
}
function isWebsiteFolderPage(item) {
    return item.systemType === 'page' && item.path.startsWith('/site/website') && item.path.endsWith('/index.xml');
}
/** Tree item ids for website folder pages use index.xml; folder paths from the path field do not. */
function toTreeItemId(contentPath) {
    var normalized = contentPath.replace(/\/$/, '');
    if (normalized === '/site/website') {
        return withIndex(normalized);
    }
    return contentPath;
}
function pathsMatchForSelection(selectedPath, itemPath) {
    return selectedPath === itemPath || withoutIndex(selectedPath) === withoutIndex(itemPath);
}
function isBranchNode(item, children, isRoot) {
    var _a;
    if (isRoot === void 0) { isRoot = false; }
    if (isRoot) {
        return true;
    }
    if (children !== undefined) {
        return children.length > 0;
    }
    if (item.systemType === 'folder') {
        return true;
    }
    if (item.systemType === 'page') {
        return ((_a = item.childrenCount) !== null && _a !== void 0 ? _a : 0) > 0 || isWebsiteFolderPage(item);
    }
    return false;
}
function rootItem(rootPath) {
    var _a;
    var name = (_a = rootPath.split('/').filter(Boolean).pop()) !== null && _a !== void 0 ? _a : rootPath;
    return {
        path: rootPath,
        label: name,
        systemType: 'folder'
    };
}
function SourcePathSelectionInput(_a) {
    var siteId = _a.siteId, rootPath = _a.rootPath, currentPath = _a.currentPath, _b = _a.allowFiles, allowFiles = _b === void 0 ? false : _b, onChange = _a.onChange, _c = _a.allowSwitchingRootPath, allowSwitchingRootPath = _c === void 0 ? false : _c, onChangeRoot = _a.onChangeRoot;
    var unmount$ = useUnmount$();
    var _d = useState(''), path = _d[0], setPath = _d[1];
    var _e = useState(null), pathExists = _e[0], setPathExists = _e[1];
    var _f = useState(false), isChecking = _f[0], setIsChecking = _f[1];
    useEffect(function () {
        var relative = withoutIndex(currentPath.startsWith(rootPath) ? currentPath.slice(rootPath.length) : currentPath);
        setPath(relative);
        setPathExists(null);
        setIsChecking(false);
    }, [rootPath, currentPath]);
    var getFullPath = function () { return "".concat(rootPath).concat(path).trim(); };
    var validatePath = function () {
        setIsChecking(true);
        var value = getFullPath();
        if (!allowFiles) {
            value = withoutFile(value);
        }
        value = value.replace(/\/$/, '');
        var relative = value.startsWith(rootPath) ? value.slice(rootPath.length) : value;
        setPath(relative);
        checkPathExistence(siteId, value)
            .pipe(takeUntil(unmount$))
            .subscribe({
            next: function (exists) {
                setIsChecking(false);
                setPathExists(exists);
                if (exists) {
                    onChange(value);
                }
            },
            error: function () {
                setIsChecking(false);
                setPathExists(false);
            }
        });
    };
    return (jsxs(FormControl, { sx: { mb: 1, width: '100%' }, children: [jsx(TextField$1, { fullWidth: true, value: path, onKeyDown: function (event) {
                    if (event.key === 'Enter') {
                        validatePath();
                    }
                }, onChange: function (event) {
                    setPath(event.target.value);
                    setPathExists(null);
                }, error: pathExists === false, label: jsx(FormattedMessage, { id: "words.path", defaultMessage: "Path" }), InputProps: {
                    startAdornment: rootPath ? (jsxs(InputAdornment, { position: "start", sx: { mr: 0 }, children: [allowSwitchingRootPath && onChangeRoot ? (jsx(Tooltip, { title: jsx(FormattedMessage, { id: "pathSelectionDialog.changeRootButtonLabel", defaultMessage: "Change root" }), children: jsx(IconButton$1, { sx: { mr: 0.5 }, onClick: onChangeRoot, size: "small", children: jsx(KeyboardArrowLeftRoundedIcon, {}) }) })) : null, rootPath] })) : undefined,
                    endAdornment: isChecking ? (jsx(InputAdornment, { position: "end", children: jsx(CircularProgress, { size: 20 }) })) : pathExists === true ? (jsx(InputAdornment, { position: "end", children: jsx(CheckRoundedIcon, { color: "success" }) })) : pathExists === false ? (jsx(InputAdornment, { position: "end", children: jsx(ErrorRounded, { color: "error" }) })) : undefined
                } }), jsx(FormHelperText, { error: pathExists === false, children: pathExists ? (jsx(FormattedMessage, { id: "pathSelectionInput.found", defaultMessage: "Path found" })) : pathExists === false ? (jsx(FormattedMessage, { id: "pathSelectionInput.invalidPath", defaultMessage: "The entered path doesn't exist" })) : (jsx(FormattedMessage, { id: "pathSelectionInput.description", defaultMessage: "Enter a path and press `enter` to validate" })) })] }));
}
function SiteTreeItem(_a) {
    var item = _a.item, selectedPath = _a.selectedPath, expandedItems = _a.expandedItems, childrenByParent = _a.childrenByParent, loadingParents = _a.loadingParents, onPathSelected = _a.onPathSelected, _b = _a.isRoot, isRoot = _b === void 0 ? false : _b;
    var children = childrenByParent[item.path];
    var loading = Boolean(loadingParents[item.path]);
    var isExpanded = expandedItems.includes(item.path);
    var branch = isBranchNode(item, children, isRoot);
    var isSelected = pathsMatchForSelection(selectedPath, item.path);
    var treeChildren = null;
    if (branch) {
        if (loading || (isExpanded && children === undefined)) {
            treeChildren = (jsxs(Box$1, { sx: { display: 'flex', alignItems: 'center', pl: 3, py: 0.5 }, children: [jsx(CircularProgress, { size: 14 }), jsx(Typography, { variant: "caption", color: "text.secondary", sx: { ml: 1 }, children: jsx(FormattedMessage, { id: "words.loading", defaultMessage: "Loading" }) })] }));
        }
        else if (children === null || children === void 0 ? void 0 : children.length) {
            treeChildren = children.map(function (child) { return (jsx(SiteTreeItem, { item: child, selectedPath: selectedPath, expandedItems: expandedItems, childrenByParent: childrenByParent, loadingParents: loadingParents, onPathSelected: onPathSelected }, child.path)); });
        }
        else if (children === undefined) {
            // Non-tree placeholder child so MUI shows the expand affordance before the first fetch.
            treeChildren = jsx(Box$1, { sx: { display: 'none' }, "aria-hidden": true }, "".concat(item.path, "::placeholder"));
        }
    }
    return (jsx(TreeItem, { itemId: item.path, slots: {
            expandIcon: ArrowRightRoundedIcon,
            collapseIcon: ArrowDropDownRoundedIcon
        }, label: jsxs(Box$1, { role: "button", onClick: function (event) {
                event.stopPropagation();
                onPathSelected(item.path);
            }, sx: {
                display: 'flex',
                alignItems: 'center',
                minHeight: 28,
                width: '100%',
                borderRadius: 0.5,
                px: 0.5,
                bgcolor: isSelected ? 'action.selected' : 'transparent',
                '&:hover': {
                    bgcolor: isSelected ? 'action.selected' : 'action.hover'
                }
            }, children: [jsx(Box$1, { sx: { display: 'flex', alignItems: 'center', mr: 0.5, '& svg': { fontSize: '1.1rem' } }, children: jsx(ItemTypeIcon, { item: item }) }), jsx(Typography, { variant: "body2", noWrap: true, sx: { flex: 1, minWidth: 0 }, children: item.label || item.path })] }), children: branch ? treeChildren : undefined }));
}
function SourceSiteContentTree(_a) {
    var siteId = _a.siteId, rootPath = _a.rootPath, selectedPath = _a.selectedPath, onPathSelected = _a.onPathSelected;
    var _b = useState({}), childrenByParent = _b[0], setChildrenByParent = _b[1];
    var _c = useState({}), loadingParents = _c[0], setLoadingParents = _c[1];
    var _d = useState([rootPath]), expandedItems = _d[0], setExpandedItems = _d[1];
    var childrenByParentRef = useRef(childrenByParent);
    var loadingParentsRef = useRef(loadingParents);
    var systemTypes = useMemo(function () { return getTreeSystemTypes(rootPath); }, [rootPath]);
    childrenByParentRef.current = childrenByParent;
    loadingParentsRef.current = loadingParents;
    var loadChildren = useCallback(function (parentPath) {
        if (childrenByParentRef.current[parentPath] !== undefined ||
            loadingParentsRef.current[parentPath]) {
            return;
        }
        setLoadingParents(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[parentPath] = true, _a)));
        });
        var fetchPath = getChildrenFetchPath(parentPath);
        fetchChildrenByPath(siteId, fetchPath, {
            limit: TREE_FETCH_LIMIT,
            sortStrategy: 'foldersFirst',
            order: 'ASC',
            systemTypes: systemTypes
        }).subscribe({
            next: function (response) {
                setChildrenByParent(function (current) {
                    var _a;
                    return (__assign(__assign({}, current), (_a = {}, _a[parentPath] = parseChildrenResponse(response).items, _a)));
                });
                setLoadingParents(function (current) {
                    var next = __assign({}, current);
                    delete next[parentPath];
                    return next;
                });
            },
            error: function () {
                setChildrenByParent(function (current) {
                    var _a;
                    return (__assign(__assign({}, current), (_a = {}, _a[parentPath] = [], _a)));
                });
                setLoadingParents(function (current) {
                    var next = __assign({}, current);
                    delete next[parentPath];
                    return next;
                });
            }
        });
    }, [siteId, systemTypes]);
    var expandPathAncestors = useCallback(function (path) {
        if (!path || !path.startsWith(rootPath)) {
            return;
        }
        var ancestors = getIndividualPaths(path, rootPath);
        var expandedPaths = new Set();
        var loadPaths = new Set();
        ancestors.forEach(function (ancestorPath) {
            expandedPaths.add(ancestorPath);
            expandedPaths.add(toTreeItemId(ancestorPath));
            loadPaths.add(toTreeItemId(ancestorPath));
        });
        loadPaths.add(toTreeItemId(path));
        setExpandedItems(function (current) {
            var merged = new Set(__spreadArray(__spreadArray([], current, true), Array.from(expandedPaths), true));
            return Array.from(merged);
        });
        loadPaths.forEach(function (loadPath) {
            loadChildren(loadPath);
        });
    }, [rootPath, loadChildren]);
    useEffect(function () {
        setChildrenByParent({});
        setLoadingParents({});
        setExpandedItems([rootPath]);
        loadChildren(rootPath);
    }, [siteId, rootPath, loadChildren]);
    useEffect(function () {
        if (selectedPath) {
            expandPathAncestors(selectedPath);
        }
    }, [selectedPath, expandPathAncestors]);
    var root = useMemo(function () { return rootItem(rootPath); }, [rootPath]);
    var handleExpandedItemsChange = function (_event, itemIds) {
        var newlyExpanded = itemIds.filter(function (id) { return !expandedItems.includes(id); });
        newlyExpanded.forEach(function (path) { return loadChildren(toTreeItemId(path)); });
        setExpandedItems(itemIds);
    };
    if (!rootPath) {
        return null;
    }
    return (jsx(Box$1, { sx: {
            mt: 1.5,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'auto',
            maxHeight: '45vh',
            py: 0.5
        }, children: jsx(SimpleTreeView, { expandedItems: expandedItems, onExpandedItemsChange: handleExpandedItemsChange, disableSelection: true, sx: { flexGrow: 1 }, children: jsx(SiteTreeItem, { item: root, selectedPath: selectedPath, expandedItems: expandedItems, childrenByParent: childrenByParent, loadingParents: loadingParents, onPathSelected: onPathSelected, isRoot: true }) }) }));
}
function CrossSitePathSelectionDialog(_a) {
    var open = _a.open, siteId = _a.siteId, siteLabel = _a.siteLabel, _b = _a.stripXmlIndex, stripXmlIndex = _b === void 0 ? false : _b, onClose = _a.onClose, onAccept = _a.onAccept;
    var _c = useState(DEFAULT_ROOT), rootPath = _c[0], setRootPath = _c[1];
    var _d = useState(DEFAULT_ROOT), currentPath = _d[0], setCurrentPath = _d[1];
    useEffect(function () {
        if (!open) {
            return;
        }
        setRootPath(DEFAULT_ROOT);
        setCurrentPath(DEFAULT_ROOT);
    }, [open, siteId]);
    var handleAccept = function () {
        var path = (stripXmlIndex ? withoutIndex(currentPath) : currentPath).trim();
        if (!path) {
            return;
        }
        onAccept(path);
        onClose();
    };
    return (jsxs(Dialog, { open: open, onClose: onClose, fullWidth: true, maxWidth: "sm", children: [jsx(DialogHeader, { title: jsxs(Fragment, { children: [jsx(FormattedMessage, { id: "pathSelectionDialog.title", defaultMessage: "Select Path" }), siteLabel ? " \u2014 ".concat(siteLabel) : ''] }), onCloseButtonClick: onClose }), jsx(DialogBody, { sx: { minHeight: '60vh' }, children: rootPath ? (jsxs(Fragment, { children: [jsx(SourcePathSelectionInput, { siteId: siteId, rootPath: rootPath, currentPath: currentPath, allowFiles: allowsFileSelection(rootPath), onChange: setCurrentPath, allowSwitchingRootPath: true, onChangeRoot: function () {
                                setRootPath('');
                                setCurrentPath('');
                            } }), jsx(SourceSiteContentTree, { siteId: siteId, rootPath: rootPath, selectedPath: currentPath, onPathSelected: setCurrentPath })] })) : (jsx(BasePathSelector, { value: "", basePaths: STUDIO_BASE_PATHS, onChange: function (event) {
                        var path = event.target.value;
                        setRootPath(path);
                        setCurrentPath(path);
                    } })) }), jsxs(DialogFooter$1, { children: [jsx(Button$1, { onClick: onClose, children: jsx(FormattedMessage, { id: "words.cancel", defaultMessage: "Cancel" }) }), jsx(Button$1, { variant: "contained", onClick: handleAccept, children: jsx(FormattedMessage, { id: "words.accept", defaultMessage: "Accept" }) })] })] }));
}

function isInWorkflow(stateMap) {
    return stateMap
        ? Boolean(stateMap.deleted ||
            stateMap.disabled ||
            stateMap.systemProcessing ||
            stateMap.locked ||
            stateMap.submittedToLive ||
            stateMap.submittedToStaging ||
            stateMap.submitted ||
            stateMap.scheduled ||
            stateMap.new ||
            stateMap.modified ||
            stateMap.publishing)
        : false;
}
function isKeepFile(path) {
    return path.endsWith('/.keep');
}
function asPlainString(value) {
    if (value == null) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object') {
        var gstring = value;
        if (typeof gstring.bytes === 'string' && gstring.bytes) {
            try {
                return atob(gstring.bytes);
            }
            catch (_a) {
                /* fall through */
            }
        }
    }
    return String(value);
}
function pluginScriptUrl(scriptName, studioSiteId) {
    return ('/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/' +
        scriptName +
        '?siteId=' +
        encodeURIComponent(studioSiteId));
}
function isApiResponse(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    var obj = value;
    return 'code' in obj && 'message' in obj;
}
function isAjaxResponse(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    var obj = value;
    return 'response' in obj && ('status' in obj || 'xhr' in obj);
}
function isPlanPayload(value) {
    return 'sourceSiteId' in value || 'sourcePath' in value || 'sourcePaths' in value || 'items' in value;
}
function isCopyResultPayload(value) {
    return 'successCount' in value || 'successes' in value || 'failureCount' in value;
}
function isApiErrorCode(code) {
    return typeof code === 'number' && code >= 1000;
}
function looksLikeStackTrace(text) {
    return (text.includes('FilterChain.doFilter') ||
        text.includes('UrlRewriteFilter') ||
        text.includes('FilterChainProxy') ||
        /\n\s+at org\./.test(text) ||
        /\n\s+at java\./.test(text));
}
/** One-line message for authors. Stack traces belong in server logs only. */
function sanitizeUserErrorMessage(text, fallback) {
    var trimmed = text.trim();
    if (!trimmed || looksLikeStackTrace(trimmed)) {
        return fallback;
    }
    var firstLine = trimmed.split('\n')[0].trim();
    if (!firstLine || looksLikeStackTrace(firstLine)) {
        return fallback;
    }
    return firstLine.length > 300 ? "".concat(firstLine.slice(0, 300), "\u2026") : firstLine;
}
function formatStudioCode1000() {
    return {
        message: 'The copy plan could not be built. Your Studio administrator can find details in the authoring log.'
    };
}
function extractPluginErrorDetails(value, fallback) {
    var _a, _b;
    var current = value;
    for (var depth = 0; depth < 8; depth++) {
        if (!current || typeof current !== 'object') {
            break;
        }
        var obj = current;
        if (typeof obj.error === 'string' && obj.error) {
            return {
                message: sanitizeUserErrorMessage(asPlainString(obj.error), fallback),
                detail: typeof obj.detail === 'string' ? obj.detail : undefined
            };
        }
        if (isApiResponse(obj) && isApiErrorCode(obj.code)) {
            var nested = (_a = obj.response) !== null && _a !== void 0 ? _a : obj.result;
            if (nested && typeof nested === 'object') {
                var fromNested = extractPluginErrorDetails(nested, fallback);
                if (fromNested) {
                    return fromNested;
                }
            }
            var msg = (_b = obj.message) === null || _b === void 0 ? void 0 : _b.trim();
            if (msg && msg !== 'Internal system failure') {
                return { message: sanitizeUserErrorMessage(msg, fallback) };
            }
            return formatStudioCode1000();
        }
        if (isAjaxResponse(obj)) {
            current = obj.response;
            continue;
        }
        if (obj.response != null && typeof obj.response === 'object') {
            current = obj.response;
            continue;
        }
        if (obj.result != null && typeof obj.result === 'object') {
            current = obj.result;
            continue;
        }
        break;
    }
    return null;
}
function pluginErrorFromPayload(payload, fallback) {
    return {
        message: payload.error ? sanitizeUserErrorMessage(asPlainString(payload.error), fallback) : fallback,
        detail: payload.detail
    };
}
function pluginErrorSummary(details) {
    return details.message;
}
function PluginErrorAlert(_a) {
    var details = _a.details;
    return (jsx(Alert, { severity: "error", children: jsx(Typography, { variant: "body2", component: "div", children: details.message }) }));
}
function unwrapPluginResponse(response, payloadCheck) {
    if (payloadCheck === void 0) { payloadCheck = isPlanPayload; }
    var current = response;
    for (var depth = 0; depth < 6; depth++) {
        if (!current || typeof current !== 'object') {
            break;
        }
        if (isAjaxResponse(current)) {
            current = current.response;
            continue;
        }
        var obj = current;
        if (isApiResponse(obj)) {
            if (isApiErrorCode(obj.code)) {
                break;
            }
            if (obj.response != null && typeof obj.response === 'object' && !payloadCheck(obj)) {
                current = obj.response;
                continue;
            }
        }
        if ('result' in obj && obj.result != null && typeof obj.result === 'object' && !payloadCheck(obj)) {
            current = obj.result;
            continue;
        }
        break;
    }
    return (current !== null && current !== void 0 ? current : {});
}
function parsePlanResponse(response) {
    var fallback = 'The copy plan could not be built.';
    var envelopeError = extractPluginErrorDetails(response, fallback);
    if (envelopeError) {
        return {
            error: envelopeError.message,
            detail: envelopeError.detail,
            items: [],
            sourcePaths: []
        };
    }
    var raw = unwrapPluginResponse(response, isPlanPayload);
    if (raw.error) {
        return __assign(__assign({}, raw), { error: sanitizeUserErrorMessage(asPlainString(raw.error), fallback), items: [] });
    }
    if (isApiResponse(raw) && isApiErrorCode(raw.code)) {
        var studioError = formatStudioCode1000();
        return {
            error: studioError.message,
            items: [],
            sourcePaths: []
        };
    }
    if (!raw.sourceSiteId && !Array.isArray(raw.items) && !raw.sourcePath && !raw.sourcePaths) {
        return { error: 'Invalid copy plan response from server', items: [], sourcePaths: [] };
    }
    var items = Array.isArray(raw.items)
        ? raw.items
            .map(function (entry) { return ({
            path: asPlainString(entry === null || entry === void 0 ? void 0 : entry.path),
            folder: Boolean(entry === null || entry === void 0 ? void 0 : entry.folder),
            existsOnDestination: Boolean(entry === null || entry === void 0 ? void 0 : entry.existsOnDestination),
            role: ((entry === null || entry === void 0 ? void 0 : entry.role) === 'dependency' ? 'dependency' : 'primary'),
            sourceSelection: (entry === null || entry === void 0 ? void 0 : entry.sourceSelection) ? asPlainString(entry.sourceSelection) : undefined
        }); })
            .filter(function (entry) { return !isKeepFile(entry.path); })
        : [];
    return __assign(__assign({}, raw), { error: raw.error ? asPlainString(raw.error) : undefined, sourcePaths: Array.isArray(raw.sourcePaths)
            ? raw.sourcePaths.map(asPlainString)
            : raw.sourcePath
                ? [asPlainString(raw.sourcePath)]
                : [], items: items });
}
function parseCopyResponse(response) {
    var fallback = 'The copy could not be completed.';
    var envelopeError = extractPluginErrorDetails(response, fallback);
    if (envelopeError) {
        return {
            successCount: 0,
            failureCount: 0,
            skippedCount: 0,
            successes: [],
            failures: [],
            skipped: [],
            error: envelopeError.message,
            detail: envelopeError.detail
        };
    }
    var raw = unwrapPluginResponse(response, isCopyResultPayload);
    if (raw.error) {
        return {
            successCount: 0,
            failureCount: 0,
            skippedCount: 0,
            successes: [],
            failures: [],
            skipped: [],
            error: sanitizeUserErrorMessage(asPlainString(raw.error), fallback),
            detail: raw.detail
        };
    }
    if (isApiResponse(raw) && isApiErrorCode(raw.code)) {
        var studioError = formatStudioCode1000();
        return {
            successCount: 0,
            failureCount: 0,
            skippedCount: 0,
            successes: [],
            failures: [],
            skipped: [],
            error: studioError.message
        };
    }
    var successes = (Array.isArray(raw.successes)
        ? raw.successes.map(function (entry) { return ({
            path: asPlainString(entry === null || entry === void 0 ? void 0 : entry.path),
            destinationPath: asPlainString(entry === null || entry === void 0 ? void 0 : entry.destinationPath),
            overwritten: Boolean(entry === null || entry === void 0 ? void 0 : entry.overwritten)
        }); })
        : []).filter(function (entry) { return !isKeepFile(entry.path); });
    var failures = (Array.isArray(raw.failures)
        ? raw.failures.map(function (entry) { return ({
            path: asPlainString(entry === null || entry === void 0 ? void 0 : entry.path),
            message: asPlainString(entry === null || entry === void 0 ? void 0 : entry.message)
        }); })
        : []).filter(function (entry) { return !isKeepFile(entry.path); });
    var skipped = (Array.isArray(raw.skipped)
        ? raw.skipped.map(function (entry) { return ({
            path: asPlainString(entry === null || entry === void 0 ? void 0 : entry.path),
            reason: asPlainString(entry === null || entry === void 0 ? void 0 : entry.reason)
        }); })
        : []).filter(function (entry) { return !isKeepFile(entry.path); });
    return {
        successCount: successes.length,
        failureCount: failures.length,
        skippedCount: skipped.length,
        successes: successes,
        failures: failures,
        skipped: skipped,
        error: raw.error ? asPlainString(raw.error) : undefined,
        sourceSiteId: raw.sourceSiteId ? asPlainString(raw.sourceSiteId) : undefined,
        destinationSiteId: raw.destinationSiteId ? asPlainString(raw.destinationSiteId) : undefined,
        sourcePath: raw.sourcePath ? asPlainString(raw.sourcePath) : undefined,
        sourcePaths: Array.isArray(raw.sourcePaths)
            ? raw.sourcePaths.map(asPlainString)
            : raw.sourcePath
                ? [asPlainString(raw.sourcePath)]
                : []
    };
}
function extractAjaxErrorDetails(error, fallback) {
    var _a;
    var fromBody = (_a = extractPluginErrorDetails(error, fallback)) !== null && _a !== void 0 ? _a : extractPluginErrorDetails(error === null || error === void 0 ? void 0 : error.response, fallback);
    if (fromBody) {
        return fromBody;
    }
    var e = error;
    var statusSuffix = typeof e.status === 'number' ? " (HTTP ".concat(e.status, ")") : '';
    var rawMessage = typeof e.message === 'string' && e.message ? "".concat(e.message).concat(statusSuffix) : fallback;
    return { message: sanitizeUserErrorMessage(rawMessage, fallback) };
}
function callPlan(studioSiteId, body) {
    return postJSON(pluginScriptUrl('cross-site-content-copy-plan', studioSiteId), body).pipe(map(function (response) { return parsePlanResponse(response); }), catchError(function (error) {
        var details = extractAjaxErrorDetails(error, 'Failed to build copy plan.');
        return of({
            error: details.message,
            detail: details.detail,
            items: [],
            sourcePaths: []
        });
    }));
}
function callCopy(studioSiteId, body) {
    return postJSON(pluginScriptUrl('cross-site-content-copy', studioSiteId), body).pipe(map(function (response) { return parseCopyResponse(response); }), catchError(function (error) {
        var details = extractAjaxErrorDetails(error, 'Copy failed.');
        return of({
            error: details.message,
            detail: details.detail,
            successCount: 0,
            failureCount: 0,
            skippedCount: 0,
            successes: [],
            failures: [],
            skipped: []
        });
    }));
}
function ContentItemRow(_a) {
    var item = _a.item, path = _a.path, loading = _a.loading, trailing = _a.trailing, leading = _a.leading;
    return (jsxs(Box$1, { sx: { display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0, flex: 1 }, children: [leading, loading && !item && jsx(CircularProgress, { size: 16, sx: { flexShrink: 0 } }), item && (jsxs(Fragment, { children: [isInWorkflow(item.stateMap) || item.systemType === 'folder' ? (jsx(Box$1, { component: "span", sx: { fontSize: '1.1rem', flexShrink: 0, display: 'inline-flex' }, children: jsx(ItemStateIcon, { item: item }) })) : (jsx(Box$1, { component: "span", sx: { fontSize: '1.1rem', flexShrink: 0, display: 'inline-flex' }, children: jsx(ItemPublishingTargetIcon, { item: item }) })), jsx(Box$1, { component: "span", sx: { fontSize: '1.1rem', flexShrink: 0, display: 'inline-flex' }, children: jsx(ItemTypeIcon, { item: item }) })] })), jsx(Typography, { variant: "body2", noWrap: true, title: item ? "".concat(item.label, " \u2014 ").concat(path) : path, sx: { minWidth: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }, children: item ? (jsxs(Fragment, { children: [asPlainString(item.label), jsx(Box$1, { component: "span", sx: { color: 'text.secondary', fontFamily: 'monospace', ml: 1 }, children: path })] })) : loading ? ('Loading…') : (jsx(Box$1, { component: "span", sx: { fontFamily: 'monospace' }, children: path })) }), trailing] }));
}
function useDetailedItemsByPath(siteId, paths) {
    var _a = useState({}), itemsByPath = _a[0], setItemsByPath = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var pathsKey = paths.join('\0');
    useEffect(function () {
        if (!siteId || paths.length === 0) {
            setItemsByPath({});
            setLoading(false);
            return;
        }
        setLoading(true);
        var sub = fetchDetailedItems(siteId, paths).subscribe({
            next: function (items) {
                var next = {};
                paths.forEach(function (path, index) {
                    if (items[index]) {
                        next[path] = items[index];
                    }
                });
                setItemsByPath(next);
                setLoading(false);
            },
            error: function () {
                setItemsByPath({});
                setLoading(false);
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [siteId, pathsKey]);
    return { itemsByPath: itemsByPath, loading: loading };
}
function PlanItemTrailing(_a) {
    var planItem = _a.planItem;
    return (jsxs(Stack, { direction: "row", spacing: 0.5, sx: { flexShrink: 0, ml: 0.5 }, children: [jsx(Chip, { size: "small", variant: "outlined", label: planItem.role === 'dependency' ? 'Dependency' : 'Primary', sx: { height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } } }), jsx(Chip, { size: "small", variant: "outlined", color: planItem.existsOnDestination ? 'warning' : 'success', label: planItem.existsOnDestination ? 'Overwrite' : 'Create', sx: { height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } } })] }));
}
function CopyStatusIcon(_a) {
    var status = _a.status;
    if (status === 'success') {
        return jsx(CheckCircleIcon, { color: "success", sx: { fontSize: '1.1rem', flexShrink: 0 } });
    }
    if (status === 'failure') {
        return jsx(CancelIcon, { color: "error", sx: { fontSize: '1.1rem', flexShrink: 0 } });
    }
    return null;
}
function ItemListTable(_a) {
    var headerLabel = _a.headerLabel, children = _a.children, _b = _a.actionsColumn, actionsColumn = _b === void 0 ? false : _b, sx = _a.sx;
    return (jsx(Paper, { variant: "outlined", sx: sx, children: jsxs(Table, { size: "small", children: [jsx(TableHead, { children: jsxs(TableRow, { children: [jsx(TableCell, { children: headerLabel }), actionsColumn && (jsx(TableCell, { align: "right", width: 88, children: "Actions" }))] }) }), jsx(TableBody, { children: children })] }) }));
}
function CrossSiteContentCopy() {
    var _a, _b, _c;
    var dispatch = useDispatch();
    var activeSiteId = useActiveSiteId();
    var env = useEnv();
    var _d = useState([]), sites = _d[0], setSites = _d[1];
    var _e = useState(true), sitesLoading = _e[0], setSitesLoading = _e[1];
    var _f = useState(null), sourceSite = _f[0], setSourceSite = _f[1];
    var _g = useState([]), sourcePaths = _g[0], setSourcePaths = _g[1];
    var _h = useState(false), sourcePathPickerOpen = _h[0], setSourcePathPickerOpen = _h[1];
    var _j = useState(null), itemMenuAnchor = _j[0], setItemMenuAnchor = _j[1];
    var _k = useState(null), itemMenuPath = _k[0], setItemMenuPath = _k[1];
    var _l = useState(null), addPathError = _l[0], setAddPathError = _l[1];
    var _m = useState(null), destSite = _m[0], setDestSite = _m[1];
    var _o = useState(true), copyDependencies = _o[0], setCopyDependencies = _o[1];
    var _p = useState(null), plan = _p[0], setPlan = _p[1];
    var _q = useState(null), planError = _q[0], setPlanError = _q[1];
    var _r = useState(false), planLoading = _r[0], setPlanLoading = _r[1];
    var _s = useState(false), copying = _s[0], setCopying = _s[1];
    var _t = useState(null), copyResult = _t[0], setCopyResult = _t[1];
    var mountedRef = useRef(true);
    var copySubRef = useRef(null);
    var skipSourceResetRef = useRef(false);
    useEffect(function () {
        mountedRef.current = true;
        return function () {
            var _a;
            mountedRef.current = false;
            (_a = copySubRef.current) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
    }, []);
    useEffect(function () {
        var sub = fetchAll({ limit: 500, offset: 0 }).subscribe({
            next: function (sitesResponse) {
                setSites((Array.isArray(sitesResponse) ? sitesResponse : []).filter(Boolean));
                setSitesLoading(false);
            },
            error: function () {
                setSitesLoading(false);
            }
        });
        return function () { return sub.unsubscribe(); };
    }, []);
    useEffect(function () {
        if (activeSiteId && sites.length && !sourceSite) {
            var current = sites.find(function (site) { return site.id === activeSiteId; });
            if (current) {
                setSourceSite(current);
            }
        }
    }, [activeSiteId, sites, sourceSite]);
    useEffect(function () {
        if (skipSourceResetRef.current) {
            skipSourceResetRef.current = false;
            return;
        }
        setSourcePaths([]);
        setAddPathError(null);
        setPlan(null);
        setPlanError(null);
        setCopyResult(null);
    }, [sourceSite === null || sourceSite === void 0 ? void 0 : sourceSite.id]);
    var sourceSiteId = sourceSite === null || sourceSite === void 0 ? void 0 : sourceSite.id;
    var sameSourceAndDestination = Boolean(sourceSiteId && destSite && sourceSiteId === destSite.id);
    var readyForPlan = Boolean(activeSiteId && sourceSiteId && sourcePaths.length > 0 && destSite && !sameSourceAndDestination);
    var handlePathSelected = function (path) {
        var normalized = path.trim();
        if (!normalized) {
            return;
        }
        var duplicate = sourcePaths.some(function (existing) { return existing === normalized || existing.replace(/\/$/, '') === normalized.replace(/\/$/, ''); });
        if (duplicate) {
            setAddPathError('That path is already in the list.');
            return;
        }
        setSourcePaths(function (current) { return __spreadArray(__spreadArray([], current, true), [normalized], false); });
        setAddPathError(null);
    };
    var openAddItemDialog = function () {
        if (!sourceSite) {
            return;
        }
        setSourcePathPickerOpen(true);
    };
    var removeSourcePath = function (path) {
        setSourcePaths(function (current) { return current.filter(function (entry) { return entry !== path; }); });
    };
    var clearSourcePaths = function () {
        setSourcePaths([]);
        setAddPathError(null);
    };
    var copyableItems = ((_a = plan === null || plan === void 0 ? void 0 : plan.items) !== null && _a !== void 0 ? _a : []).filter(function (item) { return !item.folder && !isKeepFile(item.path); });
    var planItemPaths = useMemo(function () { var _a; return ((_a = plan === null || plan === void 0 ? void 0 : plan.items) !== null && _a !== void 0 ? _a : []).filter(function (item) { return !item.folder; }).map(function (item) { return item.path; }); }, [plan]);
    var resultItemPaths = useMemo(function () {
        if (!copyResult) {
            return [];
        }
        var paths = new Set();
        copyResult.successes.forEach(function (entry) { return paths.add(entry.path); });
        copyResult.failures.forEach(function (entry) { return paths.add(entry.path); });
        copyResult.skipped.forEach(function (entry) { return paths.add(entry.path); });
        return Array.from(paths);
    }, [copyResult]);
    var _u = useDetailedItemsByPath(sourceSiteId, sourcePaths), sourceItemsByPath = _u.itemsByPath, sourceItemsLoading = _u.loading;
    var _v = useDetailedItemsByPath(sourceSiteId, planItemPaths), planItemsByPath = _v.itemsByPath, planItemsLoading = _v.loading;
    var _w = useDetailedItemsByPath(sourceSiteId, resultItemPaths), resultItemsByPath = _w.itemsByPath, resultItemsLoading = _w.loading;
    var resultRows = useMemo(function () {
        if (!copyResult) {
            return [];
        }
        var rows = [];
        copyResult.successes.forEach(function (entry) {
            return rows.push({
                path: entry.path,
                status: 'success',
                detail: entry.overwritten ? 'Overwritten' : 'Created'
            });
        });
        copyResult.failures.forEach(function (entry) {
            return rows.push({ path: entry.path, status: 'failure', detail: entry.message });
        });
        copyResult.skipped.forEach(function (entry) {
            return rows.push({ path: entry.path, status: 'skipped', detail: entry.reason });
        });
        return rows;
    }, [copyResult]);
    var itemMenuItem = itemMenuPath ? sourceItemsByPath[itemMenuPath] : null;
    var openItemMenu = function (event, path) {
        setItemMenuAnchor(event.currentTarget);
        setItemMenuPath(path);
    };
    var closeItemMenu = function () {
        setItemMenuAnchor(null);
        setItemMenuPath(null);
    };
    var handleItemView = function () {
        if (!itemMenuItem || !sourceSiteId) {
            return;
        }
        dispatch(showEditDialog({
            site: sourceSiteId,
            path: itemMenuItem.path,
            authoringBase: env.authoringBase,
            readonly: true
        }));
        closeItemMenu();
    };
    var handleItemHistory = function () {
        if (!itemMenuItem) {
            return;
        }
        dispatch(batchActions([
            fetchItemVersions({ item: itemMenuItem, rootPath: getRootPath(itemMenuItem.path) }),
            showHistoryDialog({})
        ]));
        closeItemMenu();
    };
    var handleItemDependencies = function () {
        if (!itemMenuItem) {
            return;
        }
        dispatch(showDependenciesDialog({ item: itemMenuItem, rootPath: getRootPath(itemMenuItem.path) }));
        closeItemMenu();
    };
    useEffect(function () {
        if (!readyForPlan) {
            setPlan(null);
            setPlanError(null);
            setPlanLoading(false);
            return;
        }
        setPlanError(null);
        setPlanLoading(true);
        setCopyResult(null);
        var sub = callPlan(activeSiteId, {
            sourceSiteId: sourceSiteId,
            sourcePaths: sourcePaths,
            destinationSiteId: destSite.id,
            copyDependencies: copyDependencies
        }).subscribe({
            next: function (result) {
                setPlanLoading(false);
                if (result.error) {
                    setPlanError(pluginErrorFromPayload(result, 'The copy plan could not be built.'));
                    setPlan(null);
                    return;
                }
                setPlan(result);
            },
            error: function (error) {
                setPlanLoading(false);
                setPlanError(extractAjaxErrorDetails(error, 'Failed to build copy plan.'));
                setPlan(null);
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [readyForPlan, activeSiteId, sourceSiteId, sourcePaths, destSite, copyDependencies]);
    var overwriteCount = copyableItems.filter(function (item) { return item.existsOnDestination; }).length;
    var newCount = copyableItems.length - overwriteCount;
    var runCopy = function () {
        var _a;
        if (!activeSiteId || !sourceSiteId || sourcePaths.length === 0 || !destSite || copyableItems.length === 0) {
            return;
        }
        (_a = copySubRef.current) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        setCopying(true);
        copySubRef.current = callCopy(activeSiteId, {
            sourceSiteId: sourceSiteId,
            sourcePaths: sourcePaths,
            destinationSiteId: destSite.id,
            copyDependencies: copyDependencies
        }).subscribe({
            next: function (result) {
                var _a;
                if (!mountedRef.current) {
                    return;
                }
                setCopying(false);
                setCopyResult(result);
                if (result.error) {
                    dispatch(showSystemNotification({ message: pluginErrorSummary(pluginErrorFromPayload(result, 'Copy failed.')) }));
                    return;
                }
                if (result.successCount === 0) {
                    dispatch(showSystemNotification({ message: 'Copy failed — no items were written.' }));
                    return;
                }
                var destId = (_a = result.destinationSiteId) !== null && _a !== void 0 ? _a : destSite.id;
                var msg = result.failureCount > 0
                    ? "Copied ".concat(result.successCount, " item(s) to ").concat(destId, " (").concat(result.failureCount, " failed).")
                    : "Copied ".concat(result.successCount, " item(s) to ").concat(destId, ". Open that project to view them.");
                dispatch(showSystemNotification({ message: msg }));
            },
            error: function (error) {
                if (!mountedRef.current) {
                    return;
                }
                setCopying(false);
                dispatch(showSystemNotification({
                    message: pluginErrorSummary(extractAjaxErrorDetails(error, 'Copy failed.'))
                }));
            }
        });
    };
    var reset = function () {
        setSourcePaths([]);
        setAddPathError(null);
        setDestSite(null);
        setCopyDependencies(true);
        setPlan(null);
        setPlanError(null);
        setCopyResult(null);
        setSourcePathPickerOpen(false);
        if (activeSiteId) {
            var current = sites.find(function (site) { return site.id === activeSiteId; });
            setSourceSite(current !== null && current !== void 0 ? current : null);
        }
        else {
            setSourceSite(null);
        }
    };
    var copiedDestinationSiteId = (_b = copyResult === null || copyResult === void 0 ? void 0 : copyResult.destinationSiteId) !== null && _b !== void 0 ? _b : destSite === null || destSite === void 0 ? void 0 : destSite.id;
    var copiedDestinationLabel = useMemo(function () {
        if (!copiedDestinationSiteId) {
            return '';
        }
        var match = sites.find(function (site) { return site.id === copiedDestinationSiteId; });
        return match ? "".concat(match.name, " (").concat(match.id, ")") : copiedDestinationSiteId;
    }, [copiedDestinationSiteId, sites]);
    var switchToDestination = function () {
        if (!copiedDestinationSiteId) {
            return;
        }
        dispatch(changeSite(copiedDestinationSiteId));
    };
    return (jsxs(Paper, { elevation: 0, sx: { height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }, children: [jsxs(DialogBody, { sx: { flex: 1, overflow: 'auto', pt: 2 }, children: [jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 3 }, children: "Copy content from one project into another. Choose source and destination projects, then select items to copy." }), jsxs(Stack, { spacing: 3, children: [jsxs(Box$1, { children: [jsx(Typography, { variant: "subtitle2", gutterBottom: true, children: "1. Projects" }), sitesLoading ? (jsx(CircularProgress, { size: 24 })) : (jsxs(Stack, { spacing: 1.5, children: [jsx(Autocomplete, { options: sites, getOptionLabel: function (option) { return "".concat(option.name, " (").concat(option.id, ")"); }, isOptionEqualToValue: function (option, value) { return option.id === value.id; }, value: sourceSite, onChange: function (_, value) { return setSourceSite(value); }, renderInput: function (params) { return jsx(TextField$1, __assign({}, params, { label: "Source project", required: true, size: "small" })); } }), jsx(Autocomplete, { options: sites, getOptionLabel: function (option) { return "".concat(option.name, " (").concat(option.id, ")"); }, isOptionEqualToValue: function (option, value) { return option.id === value.id; }, value: destSite, onChange: function (_, value) { return setDestSite(value); }, renderInput: function (params) { return (jsx(TextField$1, __assign({}, params, { label: "Destination project", required: true, size: "small" }))); } }), sameSourceAndDestination && (jsx(Alert, { severity: "warning", children: "Source and destination must be different projects." }))] }))] }), jsxs(Box$1, { children: [jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", sx: { mb: 1 }, children: [jsx(Typography, { variant: "subtitle2", children: "2. Source content" }), jsxs(Stack, { direction: "row", spacing: 1, children: [jsx(Button$1, { size: "small", onClick: openAddItemDialog, disabled: !sourceSite, children: "Add item" }), sourcePaths.length > 0 && (jsx(Button$1, { size: "small", onClick: clearSourcePaths, children: "Clear list" }))] })] }), jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1.5 }, children: ["Add content, static assets, templates, or scripts from", ' ', jsx("strong", { children: (_c = sourceSite === null || sourceSite === void 0 ? void 0 : sourceSite.id) !== null && _c !== void 0 ? _c : 'the source project' }), ". Use Add item to browse and select a folder or file."] }), addPathError && (jsx(Typography, { variant: "caption", color: "error", sx: { mb: 1, display: 'block' }, children: addPathError })), sourcePaths.length > 0 ? (jsx(ItemListTable, { headerLabel: "Selected items", actionsColumn: true, sx: { mt: 2 }, children: sourcePaths.map(function (path) {
                                            var item = sourceItemsByPath[path];
                                            var itemLoading = sourceItemsLoading && !item;
                                            return (jsxs(TableRow, { hover: true, children: [jsx(TableCell, { sx: { py: 1.25, maxWidth: 0, width: '100%' }, children: jsx(ContentItemRow, { item: item, path: path, loading: itemLoading }) }), jsxs(TableCell, { align: "right", sx: { whiteSpace: 'nowrap' }, children: [jsx(IconButton$1, { size: "small", "aria-label": "Item options", onClick: function (event) { return openItemMenu(event, path); }, disabled: !item, children: jsx(MoreVertIcon, { fontSize: "small" }) }), jsx(IconButton$1, { size: "small", "aria-label": "Remove", onClick: function () { return removeSourcePath(path); }, children: jsx(DeleteOutlineIcon, { fontSize: "small" }) })] })] }, path));
                                        }) })) : (jsxs(Alert, { severity: "info", sx: { mt: 2 }, children: ["No source items yet. Click ", jsx("strong", { children: "Add item" }), " to browse and add paths to copy."] })), jsxs(Menu$1, { anchorEl: itemMenuAnchor, open: Boolean(itemMenuAnchor), onClose: closeItemMenu, children: [jsx(MenuItem$1, { onClick: handleItemView, children: "View" }), jsx(MenuItem$1, { onClick: handleItemHistory, children: "History" }), jsx(MenuItem$1, { onClick: handleItemDependencies, children: "Dependencies" })] })] }), jsx(Box$1, { children: jsx(FormControlLabel, { control: jsx(Checkbox$1, { size: "small", checked: copyDependencies, onChange: function (e) { return setCopyDependencies(e.target.checked); } }), label: "Include dependencies (components, linked assets)" }) }), jsx(Divider, {}), jsxs(Box$1, { children: [jsx(Typography, { variant: "subtitle2", gutterBottom: true, children: "3. Preview" }), !readyForPlan && (jsx(Typography, { variant: "body2", color: "text.secondary", children: "Choose source and destination projects, add at least one source item, and ensure they are different to preview what will be copied." })), readyForPlan && plan && !planLoading && !copyResult && sourcePaths.length > 1 && (jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1.5 }, children: ["Copying ", sourcePaths.length, " source selection(s) into ", jsx("strong", { children: destSite === null || destSite === void 0 ? void 0 : destSite.id }), "."] })), readyForPlan && planLoading && (jsxs(Box$1, { sx: { display: 'flex', alignItems: 'center', gap: 1, py: 2 }, children: [jsx(CircularProgress, { size: 20 }), jsx(Typography, { variant: "body2", color: "text.secondary", children: "Building copy plan\u2026" })] })), readyForPlan && planError && !planLoading && jsx(PluginErrorAlert, { details: planError }), readyForPlan && plan && !planLoading && !copyResult && (jsxs(Fragment, { children: [jsxs(Stack, { direction: "row", spacing: 1, sx: { mb: 2, flexWrap: 'wrap' }, children: [jsx(Chip, { size: "small", label: "".concat(copyableItems.length, " file(s)"), color: "primary", variant: "outlined" }), newCount > 0 && jsx(Chip, { size: "small", label: "".concat(newCount, " new"), color: "success", variant: "outlined" }), overwriteCount > 0 && (jsx(Chip, { size: "small", label: "".concat(overwriteCount, " overwrite"), color: "warning", variant: "outlined" }))] }), overwriteCount > 0 && (jsxs(Alert, { severity: "warning", sx: { mb: 2 }, children: [overwriteCount, " item(s) already exist in ", jsx("strong", { children: destSite === null || destSite === void 0 ? void 0 : destSite.id }), " and will be replaced."] })), copyableItems.length === 0 ? (jsx(Alert, { severity: "info", children: "No copyable files found for this selection." })) : (jsx(Box$1, { sx: { mt: 0 }, children: jsx(ItemListTable, { headerLabel: "Items to copy", children: copyableItems.map(function (planItem) {
                                                        var item = planItemsByPath[planItem.path];
                                                        var itemLoading = planItemsLoading && !item;
                                                        return (jsx(TableRow, { hover: true, children: jsx(TableCell, { sx: { py: 1.25, maxWidth: 0, width: '100%' }, children: jsx(ContentItemRow, { item: item, path: planItem.path, loading: itemLoading, trailing: jsx(PlanItemTrailing, { planItem: planItem }) }) }) }, planItem.path));
                                                    }) }) }))] })), copyResult && (jsxs(Stack, { spacing: 2, children: [copyResult.successCount === 0 ? (jsx(Alert, { severity: "error", children: "Copy failed. No items were written." })) : copyResult.failureCount === 0 ? (jsxs(Alert, { severity: "success", children: ["Copied ", copyResult.successCount, " item(s) to ", jsx("strong", { children: copiedDestinationLabel }), "."] })) : (jsxs(Alert, { severity: "warning", children: ["Copied ", copyResult.successCount, " item(s) to ", jsx("strong", { children: copiedDestinationLabel }), ";", ' ', copyResult.failureCount, " failed."] })), resultRows.length > 0 && (jsx(ItemListTable, { headerLabel: "Copy results", children: resultRows.map(function (row) {
                                                    var item = resultItemsByPath[row.path];
                                                    var itemLoading = resultItemsLoading && !item;
                                                    return (jsx(TableRow, { hover: true, children: jsx(TableCell, { sx: { py: 1.25, maxWidth: 0, width: '100%' }, children: jsx(ContentItemRow, { item: item, path: row.path, loading: itemLoading, leading: jsx(CopyStatusIcon, { status: row.status }), trailing: row.detail && row.status === 'failure' ? (jsx(Typography, { variant: "caption", color: "error", noWrap: true, title: row.detail, sx: { flexShrink: 1, minWidth: 0, maxWidth: 180, ml: 0.5 }, children: row.detail })) : row.detail ? (jsx(Typography, { variant: "caption", color: "text.secondary", sx: { flexShrink: 0, ml: 0.5 }, children: row.detail })) : undefined }) }) }, "".concat(row.status, "-").concat(row.path)));
                                                }) }))] }))] })] })] }), jsx(DialogFooter$1, { sx: { borderTop: 1, borderColor: 'divider', gap: 1 }, children: copyResult ? (jsxs(Fragment, { children: [jsx(Button$1, { onClick: reset, children: "Copy another" }), copyResult.successCount > 0 && copiedDestinationSiteId && (jsxs(Button$1, { variant: "outlined", onClick: switchToDestination, children: ["Switch to ", copiedDestinationSiteId] })), jsx(Button$1, { variant: "contained", onClick: reset, children: "Done" })] })) : (jsxs(Fragment, { children: [jsx(Button$1, { disabled: copying || planLoading, onClick: reset, children: "Cancel" }), jsx(Button$1, { variant: "contained", onClick: runCopy, disabled: copying || planLoading || !plan || copyableItems.length === 0, children: copying ? jsx(CircularProgress, { size: 22, color: "inherit" }) : "Copy ".concat(copyableItems.length || '', " item(s)") })] })) }), sourceSite && (jsx(CrossSitePathSelectionDialog, { open: sourcePathPickerOpen, siteId: sourceSite.id, siteLabel: "".concat(sourceSite.name, " (").concat(sourceSite.id, ")"), stripXmlIndex: false, onClose: function () { return setSourcePathPickerOpen(false); }, onAccept: handlePathSelected }))] }));
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
    return (jsxs(Fragment, { children: [jsx(Tooltip$1, { title: tooltip, children: jsx(IconButton, { size: "small", "aria-label": title, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: function (e) { return setAnchorEl(anchorEl ? null : e.currentTarget); }, children: jsx(SystemIcon, { icon: icon }) }) }), jsx(Popover, { open: open, anchorEl: anchorEl, onClose: function () { return setAnchorEl(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, slotProps: {
                    paper: {
                        elevation: 8,
                        sx: { mt: 0.5, maxWidth: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(480px, calc(100vh - 120px))' }
                    }
                }, children: jsx(Paper$1, { variant: "outlined", sx: { overflow: 'auto' }, children: jsx(Box, { sx: { minWidth: 320, minHeight: 280, p: 1 }, children: fields ? (jsx(PreviewAudiencesPanel, { fields: fields })) : (jsx(Alert$1, { severity: "warning", children: jsx(Typography$1, { variant: "body2", children: "No audience fields were found for this toolbar button. Add a fields block under this widget's configuration in ui.xml (same structure as the Experience Builder audience tool)." }) })) }) }) })] }));
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
    return (jsxs(Fragment, { children: [jsx(Tooltip$1, { title: tooltip, children: jsx(IconButton, { size: "small", "aria-label": title, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: function (e) { return setAnchorEl(anchorEl ? null : e.currentTarget); }, children: jsx(SystemIcon, { icon: icon }) }) }), jsx(Popover, { open: open, anchorEl: anchorEl, onClose: function () { return setAnchorEl(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, slotProps: {
                    paper: {
                        elevation: 8,
                        sx: { mt: 0.5, maxWidth: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(520px, calc(100vh - 120px))' }
                    }
                }, children: jsx(Paper$1, { variant: "outlined", sx: { overflow: 'auto' }, children: jsx(Box, { sx: { minWidth: 320 }, children: jsx(PreviewSimulatorPanel, { devices: devices }) }) }) })] }));
}

/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */
/** Merge `configuration` from ui.xml onto props (Studio passes both on plugin widgets). */
function mergePluginConfiguration(props) {
    var configuration = props.configuration, rest = __rest(props, ["configuration"]);
    var conf = configuration && typeof configuration === 'object' ? configuration : {};
    return __assign(__assign({}, rest), conf);
}
/** Default: open Studio search in a new tab (matches legacy cannedsearch behavior). */
function openInNewTabDefault(value) {
    if (value === false || value === 0) {
        return false;
    }
    if (value === true || value === 1) {
        return true;
    }
    if (typeof value === 'string') {
        var s = value.toLowerCase().trim();
        if (s === 'false' || s === '0') {
            return false;
        }
        if (s === 'true' || s === '1') {
            return true;
        }
    }
    return true;
}
function openCannedSearchStudioSearch(searchParams) {
    var urlRoot = "".concat(window.location.protocol, "//").concat(window.location.host);
    var windowUrl = "".concat(urlRoot, "/studio/search#/");
    if (searchParams && searchParams.trim() !== '') {
        windowUrl += "?".concat(searchParams);
    }
    window.open(windowUrl, '_studioSearch');
}

var DEFAULT_ICON$1 = { id: '@mui/icons-material/SavedSearchRounded' };
function OpenCannedSearchPanelButton(props) {
    var _a, _b;
    var dispatch = useDispatch();
    var p = mergePluginConfiguration(props);
    var title = p.title || 'Search';
    var icon = ((_a = p.icon) === null || _a === void 0 ? void 0 : _a.id) ? p.icon : DEFAULT_ICON$1;
    var searchParams = String((_b = p.searchParams) !== null && _b !== void 0 ? _b : '');
    var useNewTab = openInNewTabDefault(p.openInNewBrowserTab);
    var initialParameters = p.initialParameters;
    var onClick = function () {
        if (useNewTab) {
            openCannedSearchStudioSearch(searchParams);
        }
        else {
            dispatch(showWidgetDialog({
                id: 'CannedSearchDialog',
                title: title,
                widget: {
                    id: 'craftercms.components.Search',
                    configuration: {
                        embedded: true,
                        initialParameters: initialParameters
                    }
                }
            }));
        }
    };
    return jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: onClick });
}

var DEFAULT_ICON = { id: '@mui/icons-material/SavedSearchRounded' };
function OpenCannedSearchToolbarButton(props) {
    var _a;
    var _b, _c;
    var dispatch = useDispatch();
    var p = mergePluginConfiguration(props);
    var title = p.title || 'Search';
    var tooltip = p.tooltip || title;
    var dialogTitle = p.dialogTitle || title;
    var icon = ((_b = p.icon) === null || _b === void 0 ? void 0 : _b.id) ? p.icon : DEFAULT_ICON;
    var searchParams = String((_c = p.searchParams) !== null && _c !== void 0 ? _c : '');
    var useNewTab = openInNewTabDefault(p.openInNewBrowserTab);
    var initialParameters = p.initialParameters;
    var useIcon = p.useIcon !== false;
    var useIconWithText = Boolean(p.useIconWithText);
    var buttonSize = p.buttonSize || 'small';
    if (useIconWithText) {
        useIcon = false;
    }
    var onClick = function () {
        if (useNewTab) {
            openCannedSearchStudioSearch(searchParams);
        }
        else {
            dispatch(showWidgetDialog({
                id: 'CannedSearchDialog',
                title: dialogTitle,
                widget: {
                    id: 'craftercms.components.Search',
                    configuration: {
                        embedded: true,
                        initialParameters: initialParameters
                    }
                }
            }));
        }
    };
    var applyTooltip = function (children) {
        return useIcon || p.tooltip ? jsx(Tooltip$1, { title: tooltip, children: children }) : children;
    };
    return applyTooltip(useIcon ? (jsx(IconButton, { size: buttonSize, onClick: onClick, "aria-label": title, children: jsx(SystemIcon, { icon: icon }) })) : (jsx(Button$1, { size: buttonSize, onClick: onClick, startIcon: useIconWithText ? jsx(SystemIcon, { icon: icon }) : undefined, sx: (_a = {}, _a[".".concat(buttonClasses.startIcon)] = { mr: 0.5 }, _a), children: title })));
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */
var DEFAULT_CANVAS_VIEW = { zoom: 1, panX: 0, panY: 0 };
var MIN_CANVAS_ZOOM = 0.25;
var MAX_CANVAS_ZOOM = 6;
function clampCanvasZoom(zoom) {
    return Math.min(MAX_CANVAS_ZOOM, Math.max(MIN_CANVAS_ZOOM, zoom));
}
function computeImageLayout(containerWidth, containerHeight, imageWidth, imageHeight, view) {
    if (view === void 0) { view = { zoom: 1, panX: 0, panY: 0 }; }
    var fitScale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
    var scale = fitScale * view.zoom;
    var drawWidth = imageWidth * scale;
    var drawHeight = imageHeight * scale;
    return {
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        offsetX: (containerWidth - drawWidth) / 2 + view.panX,
        offsetY: (containerHeight - drawHeight) / 2 + view.panY,
        scale: scale,
        fitScale: fitScale,
        imageWidth: imageWidth,
        imageHeight: imageHeight
    };
}
/** Zoom toward a display-space point (e.g. cursor) so that point stays fixed on the image. */
function zoomViewAtPoint(containerWidth, containerHeight, imageWidth, imageHeight, view, displayX, displayY, newZoom) {
    var zoom = clampCanvasZoom(newZoom);
    var layout = computeImageLayout(containerWidth, containerHeight, imageWidth, imageHeight, view);
    var imgX = (displayX - layout.offsetX) / layout.scale;
    var imgY = (displayY - layout.offsetY) / layout.scale;
    var fitScale = layout.fitScale;
    var scale = fitScale * zoom;
    var panX = displayX - imgX * scale - (containerWidth - imageWidth * scale) / 2;
    var panY = displayY - imgY * scale - (containerHeight - imageHeight * scale) / 2;
    return { zoom: zoom, panX: panX, panY: panY };
}
function imageToDisplay(x, y, layout) {
    return {
        x: layout.offsetX + x * layout.scale,
        y: layout.offsetY + y * layout.scale
    };
}
function displayToImage(displayX, displayY, layout, clamp) {
    if (clamp === void 0) { clamp = true; }
    var x = (displayX - layout.offsetX) / layout.scale;
    var y = (displayY - layout.offsetY) / layout.scale;
    if (!clamp) {
        return { x: x, y: y };
    }
    if (x < 0 || y < 0 || x > layout.imageWidth || y > layout.imageHeight) {
        return null;
    }
    return {
        x: Math.max(0, Math.min(layout.imageWidth, x)),
        y: Math.max(0, Math.min(layout.imageHeight, y))
    };
}
function clientToImage(clientX, clientY, containerRect, layout, clamp) {
    if (clamp === void 0) { clamp = true; }
    var displayX = clientX - containerRect.left;
    var displayY = clientY - containerRect.top;
    return displayToImage(displayX, displayY, layout, clamp);
}
function clampCropArea(area, imageWidth, imageHeight, minSize) {
    if (minSize === void 0) { minSize = 8; }
    var width = Math.max(minSize, Math.min(area.width, imageWidth));
    var height = Math.max(minSize, Math.min(area.height, imageHeight));
    var x = Math.max(0, Math.min(area.x, imageWidth - width));
    var y = Math.max(0, Math.min(area.y, imageHeight - height));
    return {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height)
    };
}
function fullImageCrop(imageWidth, imageHeight) {
    return { x: 0, y: 0, width: imageWidth, height: imageHeight };
}
function cropAreaWithAspect(area, aspect, imageWidth, imageHeight) {
    if (!aspect) {
        return clampCropArea(area, imageWidth, imageHeight);
    }
    var centerX = area.x + area.width / 2;
    var centerY = area.y + area.height / 2;
    var width = area.width;
    var height = width / aspect;
    if (height > imageHeight) {
        height = imageHeight;
        width = height * aspect;
    }
    if (width > imageWidth) {
        width = imageWidth;
        height = width / aspect;
    }
    var x = centerX - width / 2;
    var y = centerY - height / 2;
    return clampCropArea({ x: x, y: y, width: width, height: height }, imageWidth, imageHeight);
}
function resizeCropToDimensions(area, targetWidth, targetHeight, imageWidth, imageHeight, aspect) {
    var width = Math.max(8, Math.min(targetWidth, imageWidth));
    var height = Math.max(8, Math.min(targetHeight, imageHeight));
    if (aspect) {
        height = width / aspect;
        if (height > imageHeight) {
            height = imageHeight;
            width = height * aspect;
        }
    }
    var centerX = area.x + area.width / 2;
    var centerY = area.y + area.height / 2;
    var x = centerX - width / 2;
    var y = centerY - height / 2;
    return clampCropArea({ x: x, y: y, width: width, height: height }, imageWidth, imageHeight);
}

/*!

pica
https://github.com/nodeca/pica

*/
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64decode(str) {
	const input = str.replace(/[\r\n=]/g, ""), max = input.length;
	const out = new Uint8Array(max * 3 >> 2);
	let bits = 0;
	let ptr = 0;
	for (let idx = 0; idx < max; idx++) {
		if (idx % 4 === 0 && idx) {
			out[ptr++] = bits >> 16 & 255;
			out[ptr++] = bits >> 8 & 255;
			out[ptr++] = bits & 255;
		}
		bits = bits << 6 | BASE64_MAP.indexOf(input.charAt(idx));
	}
	const tailbits = max % 4 * 6;
	if (tailbits === 0) {
		out[ptr++] = bits >> 16 & 255;
		out[ptr++] = bits >> 8 & 255;
		out[ptr++] = bits & 255;
	} else if (tailbits === 18) {
		out[ptr++] = bits >> 10 & 255;
		out[ptr++] = bits >> 2 & 255;
	} else if (tailbits === 12) out[ptr++] = bits >> 4 & 255;
	return out;
}
var wa;
function hasWebAssembly() {
	if (typeof wa !== "undefined") return wa;
	wa = false;
	if (typeof WebAssembly === "undefined") return wa;
	try {
		const bin = new Uint8Array([
			0,
			97,
			115,
			109,
			1,
			0,
			0,
			0,
			1,
			6,
			1,
			96,
			1,
			127,
			1,
			127,
			3,
			2,
			1,
			0,
			5,
			3,
			1,
			0,
			1,
			7,
			8,
			1,
			4,
			116,
			101,
			115,
			116,
			0,
			0,
			10,
			16,
			1,
			14,
			0,
			32,
			0,
			65,
			1,
			54,
			2,
			0,
			32,
			0,
			40,
			2,
			0,
			11
		]);
		const module = new WebAssembly.Module(bin);
		if (new WebAssembly.Instance(module, {}).exports.test(4) !== 0) wa = true;
		return wa;
	} catch (__) {}
	return wa;
}
var DEFAULT_OPTIONS = {
	js: true,
	wasm: true
};
var MultiMath = class {
	constructor(options) {
		const opts = Object.assign({}, DEFAULT_OPTIONS, options || {});
		this.options = opts;
		this.__cache = {};
		this.__init_promise = null;
		this.__modules = opts.modules || {};
		this.__memory = null;
		this.__wasm = {};
		this.__isLE = new Uint32Array(new Uint8Array([
			1,
			0,
			0,
			0
		]).buffer)[0] === 1;
		if (!this.options.js && !this.options.wasm) throw new Error("mathlib: at least \"js\" or \"wasm\" should be enabled");
	}
	has_wasm() {
		return hasWebAssembly();
	}
	use(module) {
		this.__modules[module.name] = module;
		if (this.options.wasm && this.has_wasm() && module.wasm_fn) this[module.name] = module.wasm_fn;
		else this[module.name] = module.fn;
		return this;
	}
	init() {
		if (this.__init_promise) return this.__init_promise;
		if (!this.options.js && this.options.wasm && !this.has_wasm()) return Promise.reject(/* @__PURE__ */ new Error("mathlib: only \"wasm\" was enabled, but it's not supported"));
		this.__init_promise = Promise.all(Object.keys(this.__modules).map((name) => {
			const module = this.__modules[name];
			if (!this.options.wasm || !this.has_wasm() || !module.wasm_fn) return null;
			if (this.__wasm[name]) return null;
			return WebAssembly.compile(base64decode(module.wasm_src)).then((m) => {
				this.__wasm[name] = m;
			});
		})).then(() => this);
		return this.__init_promise;
	}
	__reallocate(bytes) {
		if (!this.__memory) {
			this.__memory = new WebAssembly.Memory({ initial: Math.ceil(bytes / (64 * 1024)) });
			return this.__memory;
		}
		const mem_size = this.__memory.buffer.byteLength;
		if (mem_size < bytes) this.__memory.grow(Math.ceil((bytes - mem_size) / (64 * 1024)));
		return this.__memory;
	}
	__instance(name, memsize, env_extra) {
		if (memsize) this.__reallocate(memsize);
		if (!this.__wasm[name]) {
			const module = this.__modules[name];
			this.__wasm[name] = new WebAssembly.Module(base64decode(module.wasm_src));
		}
		if (!this.__cache[name]) {
			const env_base = {
				memoryBase: 0,
				memory: this.__memory,
				tableBase: 0,
				table: new WebAssembly.Table({
					initial: 0,
					element: "anyfunc"
				})
			};
			this.__cache[name] = new WebAssembly.Instance(this.__wasm[name], { env: Object.assign(env_base, env_extra || {}) });
		}
		return this.__cache[name];
	}
	__align(number, base) {
		base = base || 8;
		const reminder = number % base;
		return number + (reminder ? base - reminder : 0);
	}
};
function gaussCoef(sigma) {
	if (sigma < .5) sigma = .5;
	const a = Math.exp(.726 * .726) / sigma, g1 = Math.exp(-a), g2 = Math.exp(-2 * a), k = (1 - g1) * (1 - g1) / (1 + 2 * a * g1 - g2);
	const a0 = k;
	const a1 = k * (a - 1) * g1;
	const a2 = k * (a + 1) * g1;
	const a3 = -k * g2;
	const b1 = 2 * g1;
	const b2 = -g2;
	const left_corner = (a0 + a1) / (1 - b1 - b2);
	const right_corner = (a2 + a3) / (1 - b1 - b2);
	return new Float32Array([
		a0,
		a1,
		a2,
		a3,
		b1,
		b2,
		left_corner,
		right_corner
	]);
}
function convolveMono16(src, out, line, coeff, width, height) {
	let prev_src, curr_src, curr_out, prev_out, prev_prev_out;
	let src_index, out_index, line_index;
	let i, j;
	let coeff_a0, coeff_a1, coeff_b1, coeff_b2;
	for (i = 0; i < height; i++) {
		src_index = i * width;
		out_index = i;
		line_index = 0;
		prev_src = src[src_index];
		prev_prev_out = prev_src * coeff[6];
		prev_out = prev_prev_out;
		coeff_a0 = coeff[0];
		coeff_a1 = coeff[1];
		coeff_b1 = coeff[4];
		coeff_b2 = coeff[5];
		for (j = 0; j < width; j++) {
			curr_src = src[src_index];
			curr_out = curr_src * coeff_a0 + prev_src * coeff_a1 + prev_out * coeff_b1 + prev_prev_out * coeff_b2;
			prev_prev_out = prev_out;
			prev_out = curr_out;
			prev_src = curr_src;
			line[line_index] = prev_out;
			line_index++;
			src_index++;
		}
		src_index--;
		line_index--;
		out_index += height * (width - 1);
		prev_src = src[src_index];
		prev_prev_out = prev_src * coeff[7];
		prev_out = prev_prev_out;
		curr_src = prev_src;
		coeff_a0 = coeff[2];
		coeff_a1 = coeff[3];
		for (j = width - 1; j >= 0; j--) {
			curr_out = curr_src * coeff_a0 + prev_src * coeff_a1 + prev_out * coeff_b1 + prev_prev_out * coeff_b2;
			prev_prev_out = prev_out;
			prev_out = curr_out;
			prev_src = curr_src;
			curr_src = src[src_index];
			out[out_index] = line[line_index] + prev_out;
			src_index--;
			line_index--;
			out_index -= height;
		}
	}
}
function blurMono16(src, width, height, radius) {
	if (!radius) return;
	const out = new Uint16Array(src.length), tmp_line = new Float32Array(Math.max(width, height));
	const coeff = gaussCoef(radius);
	convolveMono16(src, out, tmp_line, coeff, width, height);
	convolveMono16(out, src, tmp_line, coeff, height, width);
}
function hsv_v16(img, width, height) {
	const size = width * height;
	const out = new Uint16Array(size);
	let r, g, b, max;
	for (let i = 0; i < size; i++) {
		r = img[4 * i];
		g = img[4 * i + 1];
		b = img[4 * i + 2];
		max = r >= g && r >= b ? r : g >= b && g >= r ? g : b;
		out[i] = max << 8;
	}
	return out;
}
function unsharp$1(img, width, height, amount, radius, threshold) {
	let v1, v2, vmul;
	let diff, iTimes4;
	if (amount === 0 || radius < .5) return;
	if (radius > 2) radius = 2;
	const brightness = hsv_v16(img, width, height);
	const blured = new Uint16Array(brightness);
	blurMono16(blured, width, height, radius);
	const amountFp = amount / 100 * 4096 + .5 | 0;
	const thresholdFp = threshold << 8;
	const size = width * height;
	for (let i = 0; i < size; i++) {
		v1 = brightness[i];
		diff = v1 - blured[i];
		if (Math.abs(diff) >= thresholdFp) {
			v2 = v1 + (amountFp * diff + 2048 >> 12);
			v2 = v2 > 65280 ? 65280 : v2;
			v2 = v2 < 0 ? 0 : v2;
			v1 = v1 !== 0 ? v1 : 1;
			vmul = (v2 << 12) / v1 | 0;
			iTimes4 = i * 4;
			img[iTimes4] = img[iTimes4] * vmul + 2048 >> 12;
			img[iTimes4 + 1] = img[iTimes4 + 1] * vmul + 2048 >> 12;
			img[iTimes4 + 2] = img[iTimes4 + 2] * vmul + 2048 >> 12;
		}
	}
}
function unsharp(img, width, height, amount, radius, threshold) {
	if (amount === 0 || radius < .5) return;
	if (radius > 2) radius = 2;
	const pixels = width * height;
	const img_bytes_cnt = pixels * 4;
	const hsv_bytes_cnt = pixels * 2;
	const blur_bytes_cnt = pixels * 2;
	const blur_line_byte_cnt = Math.max(width, height) * 4;
	const blur_coeffs_byte_cnt = 32;
	const img_offset = 0;
	const hsv_offset = img_bytes_cnt;
	const blur_offset = hsv_offset + hsv_bytes_cnt;
	const blur_tmp_offset = blur_offset + blur_bytes_cnt;
	const blur_line_offset = blur_tmp_offset + blur_bytes_cnt;
	const blur_coeffs_offset = blur_line_offset + blur_line_byte_cnt;
	const instance = this.__instance("unsharp_mask", img_bytes_cnt + hsv_bytes_cnt + blur_bytes_cnt * 2 + blur_line_byte_cnt + blur_coeffs_byte_cnt, { exp: Math.exp });
	const img32 = new Uint32Array(img.buffer);
	new Uint32Array(this.__memory.buffer).set(img32);
	let fn = instance.exports.hsv_v16 || instance.exports._hsv_v16;
	if (!fn) throw new Error("WASM hsv_v16 function is not available");
	fn(img_offset, hsv_offset, width, height);
	fn = instance.exports.blurMono16 || instance.exports._blurMono16;
	if (!fn) throw new Error("WASM blurMono16 function is not available");
	fn(hsv_offset, blur_offset, blur_tmp_offset, blur_line_offset, blur_coeffs_offset, width, height, radius);
	fn = instance.exports.unsharp || instance.exports._unsharp;
	if (!fn) throw new Error("WASM unsharp function is not available");
	fn(img_offset, img_offset, hsv_offset, blur_offset, width, height, amount, threshold);
	img32.set(new Uint32Array(this.__memory.buffer, 0, pixels));
}
var mm_unsharp_mask_default = {
	name: "unsharp_mask",
	fn: unsharp$1,
	wasm_fn: unsharp,
	wasm_src: "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"
};
var resize_filter_info_default = { filter: {
	box: {
		win: .5,
		fn(x) {
			if (x < 0) x = -x;
			return x < .5 ? 1 : 0;
		}
	},
	hamming: {
		win: 1,
		fn(x) {
			if (x < 0) x = -x;
			if (x >= 1) return 0;
			if (x < 1.1920929e-7) return 1;
			const xpi = x * Math.PI;
			return Math.sin(xpi) / xpi * (.54 + .46 * Math.cos(xpi / 1));
		}
	},
	lanczos2: {
		win: 2,
		fn(x) {
			if (x < 0) x = -x;
			if (x >= 2) return 0;
			if (x < 1.1920929e-7) return 1;
			const xpi = x * Math.PI;
			return Math.sin(xpi) / xpi * Math.sin(xpi / 2) / (xpi / 2);
		}
	},
	lanczos3: {
		win: 3,
		fn(x) {
			if (x < 0) x = -x;
			if (x >= 3) return 0;
			if (x < 1.1920929e-7) return 1;
			const xpi = x * Math.PI;
			return Math.sin(xpi) / xpi * Math.sin(xpi / 3) / (xpi / 3);
		}
	},
	mks2013: {
		win: 2.5,
		fn(x) {
			if (x < 0) x = -x;
			if (x >= 2.5) return 0;
			if (x >= 1.5) return -0.125 * (x - 2.5) * (x - 2.5);
			if (x >= .5) return .25 * (4 * x * x - 11 * x + 7);
			return 1.0625 - 1.75 * x * x;
		}
	}
} };
var FIXED_FRAC_BITS = 14;
function toFixedPoint(num) {
	return Math.round(num * ((1 << FIXED_FRAC_BITS) - 1));
}
function resizeFilterGen(filter, srcSize, destSize, scale, offset) {
	const filterFunction = resize_filter_info_default.filter[filter].fn;
	const scaleInverted = 1 / scale;
	const scaleClamped = Math.min(1, scale);
	const srcWindow = resize_filter_info_default.filter[filter].win / scaleClamped;
	let destPixel, srcPixel, srcFirst, srcLast, filterElementSize, floatFilter, fxpFilter, total, pxl, idx, floatVal, filterTotal, filterVal;
	let leftNotEmpty, rightNotEmpty, filterShift, filterSize;
	const maxFilterElementSize = Math.floor((srcWindow + 1) * 2);
	const packedFilter = new Int16Array((maxFilterElementSize + 2) * destSize);
	let packedFilterPtr = 0;
	const slowCopy = !packedFilter.subarray || !packedFilter.set;
	for (destPixel = 0; destPixel < destSize; destPixel++) {
		srcPixel = (destPixel + .5) * scaleInverted + offset;
		srcFirst = Math.max(0, Math.floor(srcPixel - srcWindow));
		srcLast = Math.min(srcSize - 1, Math.ceil(srcPixel + srcWindow));
		filterElementSize = srcLast - srcFirst + 1;
		floatFilter = new Float32Array(filterElementSize);
		fxpFilter = new Int16Array(filterElementSize);
		total = 0;
		for (pxl = srcFirst, idx = 0; pxl <= srcLast; pxl++, idx++) {
			floatVal = filterFunction((pxl + .5 - srcPixel) * scaleClamped);
			total += floatVal;
			floatFilter[idx] = floatVal;
		}
		filterTotal = 0;
		for (idx = 0; idx < floatFilter.length; idx++) {
			filterVal = floatFilter[idx] / total;
			filterTotal += filterVal;
			fxpFilter[idx] = toFixedPoint(filterVal);
		}
		fxpFilter[destSize >> 1] += toFixedPoint(1 - filterTotal);
		leftNotEmpty = 0;
		while (leftNotEmpty < fxpFilter.length && fxpFilter[leftNotEmpty] === 0) leftNotEmpty++;
		if (leftNotEmpty < fxpFilter.length) {
			rightNotEmpty = fxpFilter.length - 1;
			while (rightNotEmpty > 0 && fxpFilter[rightNotEmpty] === 0) rightNotEmpty--;
			filterShift = srcFirst + leftNotEmpty;
			filterSize = rightNotEmpty - leftNotEmpty + 1;
			packedFilter[packedFilterPtr++] = filterShift;
			packedFilter[packedFilterPtr++] = filterSize;
			if (!slowCopy) {
				packedFilter.set(fxpFilter.subarray(leftNotEmpty, rightNotEmpty + 1), packedFilterPtr);
				packedFilterPtr += filterSize;
			} else for (idx = leftNotEmpty; idx <= rightNotEmpty; idx++) packedFilter[packedFilterPtr++] = fxpFilter[idx];
		} else {
			packedFilter[packedFilterPtr++] = 0;
			packedFilter[packedFilterPtr++] = 0;
		}
	}
	return packedFilter;
}
function clampTo8(i) {
	return i < 0 ? 0 : i > 255 ? 255 : i;
}
function clampNegative(i) {
	return i >= 0 ? i : 0;
}
function convolveHor(src, dest, srcW, srcH, destW, filters) {
	let r, g, b, a;
	let filterPtr, filterShift, filterSize;
	let srcPtr, srcY, destX, filterVal;
	let srcOffset = 0, destOffset = 0;
	for (srcY = 0; srcY < srcH; srcY++) {
		filterPtr = 0;
		for (destX = 0; destX < destW; destX++) {
			filterShift = filters[filterPtr++];
			filterSize = filters[filterPtr++];
			srcPtr = srcOffset + filterShift * 4 | 0;
			r = g = b = a = 0;
			for (; filterSize > 0; filterSize--) {
				filterVal = filters[filterPtr++];
				a = a + filterVal * src[srcPtr + 3] | 0;
				b = b + filterVal * src[srcPtr + 2] | 0;
				g = g + filterVal * src[srcPtr + 1] | 0;
				r = r + filterVal * src[srcPtr] | 0;
				srcPtr = srcPtr + 4 | 0;
			}
			dest[destOffset + 3] = clampNegative(a >> 7);
			dest[destOffset + 2] = clampNegative(b >> 7);
			dest[destOffset + 1] = clampNegative(g >> 7);
			dest[destOffset] = clampNegative(r >> 7);
			destOffset = destOffset + srcH * 4 | 0;
		}
		destOffset = (srcY + 1) * 4 | 0;
		srcOffset = (srcY + 1) * srcW * 4 | 0;
	}
}
function convolveVert(src, dest, srcW, srcH, destW, filters) {
	let r, g, b, a;
	let filterPtr, filterShift, filterSize;
	let srcPtr, srcY, destX, filterVal;
	let srcOffset = 0, destOffset = 0;
	for (srcY = 0; srcY < srcH; srcY++) {
		filterPtr = 0;
		for (destX = 0; destX < destW; destX++) {
			filterShift = filters[filterPtr++];
			filterSize = filters[filterPtr++];
			srcPtr = srcOffset + filterShift * 4 | 0;
			r = g = b = a = 0;
			for (; filterSize > 0; filterSize--) {
				filterVal = filters[filterPtr++];
				a = a + filterVal * src[srcPtr + 3] | 0;
				b = b + filterVal * src[srcPtr + 2] | 0;
				g = g + filterVal * src[srcPtr + 1] | 0;
				r = r + filterVal * src[srcPtr] | 0;
				srcPtr = srcPtr + 4 | 0;
			}
			r >>= 7;
			g >>= 7;
			b >>= 7;
			a >>= 7;
			dest[destOffset + 3] = clampTo8(a + 8192 >> 14);
			dest[destOffset + 2] = clampTo8(b + 8192 >> 14);
			dest[destOffset + 1] = clampTo8(g + 8192 >> 14);
			dest[destOffset] = clampTo8(r + 8192 >> 14);
			destOffset = destOffset + srcH * 4 | 0;
		}
		destOffset = (srcY + 1) * 4 | 0;
		srcOffset = (srcY + 1) * srcW * 4 | 0;
	}
}
function convolveHorWithPre(src, dest, srcW, srcH, destW, filters) {
	let r, g, b, a, alpha;
	let filterPtr, filterShift, filterSize;
	let srcPtr, srcY, destX, filterVal;
	let srcOffset = 0, destOffset = 0;
	for (srcY = 0; srcY < srcH; srcY++) {
		filterPtr = 0;
		for (destX = 0; destX < destW; destX++) {
			filterShift = filters[filterPtr++];
			filterSize = filters[filterPtr++];
			srcPtr = srcOffset + filterShift * 4 | 0;
			r = g = b = a = 0;
			for (; filterSize > 0; filterSize--) {
				filterVal = filters[filterPtr++];
				alpha = src[srcPtr + 3];
				a = a + filterVal * alpha | 0;
				b = b + filterVal * src[srcPtr + 2] * alpha | 0;
				g = g + filterVal * src[srcPtr + 1] * alpha | 0;
				r = r + filterVal * src[srcPtr] * alpha | 0;
				srcPtr = srcPtr + 4 | 0;
			}
			b = b / 255 | 0;
			g = g / 255 | 0;
			r = r / 255 | 0;
			dest[destOffset + 3] = clampNegative(a >> 7);
			dest[destOffset + 2] = clampNegative(b >> 7);
			dest[destOffset + 1] = clampNegative(g >> 7);
			dest[destOffset] = clampNegative(r >> 7);
			destOffset = destOffset + srcH * 4 | 0;
		}
		destOffset = (srcY + 1) * 4 | 0;
		srcOffset = (srcY + 1) * srcW * 4 | 0;
	}
}
function convolveVertWithPre(src, dest, srcW, srcH, destW, filters) {
	let r, g, b, a;
	let filterPtr, filterShift, filterSize;
	let srcPtr, srcY, destX, filterVal;
	let srcOffset = 0, destOffset = 0;
	for (srcY = 0; srcY < srcH; srcY++) {
		filterPtr = 0;
		for (destX = 0; destX < destW; destX++) {
			filterShift = filters[filterPtr++];
			filterSize = filters[filterPtr++];
			srcPtr = srcOffset + filterShift * 4 | 0;
			r = g = b = a = 0;
			for (; filterSize > 0; filterSize--) {
				filterVal = filters[filterPtr++];
				a = a + filterVal * src[srcPtr + 3] | 0;
				b = b + filterVal * src[srcPtr + 2] | 0;
				g = g + filterVal * src[srcPtr + 1] | 0;
				r = r + filterVal * src[srcPtr] | 0;
				srcPtr = srcPtr + 4 | 0;
			}
			r >>= 7;
			g >>= 7;
			b >>= 7;
			a >>= 7;
			a = clampTo8(a + 8192 >> 14);
			if (a > 0) {
				r = r * 255 / a | 0;
				g = g * 255 / a | 0;
				b = b * 255 / a | 0;
			}
			dest[destOffset + 3] = a;
			dest[destOffset + 2] = clampTo8(b + 8192 >> 14);
			dest[destOffset + 1] = clampTo8(g + 8192 >> 14);
			dest[destOffset] = clampTo8(r + 8192 >> 14);
			destOffset = destOffset + srcH * 4 | 0;
		}
		destOffset = (srcY + 1) * 4 | 0;
		srcOffset = (srcY + 1) * srcW * 4 | 0;
	}
}
function hasAlpha$1(src, width, height) {
	let ptr = 3;
	const len = width * height * 4 | 0;
	while (ptr < len) {
		if (src[ptr] !== 255) return true;
		ptr = ptr + 4 | 0;
	}
	return false;
}
function resetAlpha$1(dst, width, height) {
	let ptr = 3;
	const len = width * height * 4 | 0;
	while (ptr < len) {
		dst[ptr] = 255;
		ptr = ptr + 4 | 0;
	}
}
function resize(options) {
	const src = options.src;
	const srcW = options.width;
	const srcH = options.height;
	const destW = options.toWidth;
	const destH = options.toHeight;
	const scaleX = options.scaleX || options.toWidth / options.width;
	const scaleY = options.scaleY || options.toHeight / options.height;
	const offsetX = options.offsetX || 0;
	const offsetY = options.offsetY || 0;
	const dest = options.dest || new Uint8Array(destW * destH * 4);
	const filter = typeof options.filter === "undefined" ? "mks2013" : options.filter;
	const filtersX = resizeFilterGen(filter, srcW, destW, scaleX, offsetX), filtersY = resizeFilterGen(filter, srcH, destH, scaleY, offsetY);
	const tmp = new Uint16Array(destW * srcH * 4);
	if (hasAlpha$1(src, srcW, srcH)) {
		convolveHorWithPre(src, tmp, srcW, srcH, destW, filtersX);
		convolveVertWithPre(tmp, dest, srcH, destW, destH, filtersY);
	} else {
		convolveHor(src, tmp, srcW, srcH, destW, filtersX);
		convolveVert(tmp, dest, srcH, destW, destH, filtersY);
		resetAlpha$1(dest, destW, destH);
	}
	return dest;
}
function hasAlpha(src, width, height) {
	let ptr = 3;
	const len = width * height * 4 | 0;
	while (ptr < len) {
		if (src[ptr] !== 255) return true;
		ptr = ptr + 4 | 0;
	}
	return false;
}
function resetAlpha(dst, width, height) {
	let ptr = 3;
	const len = width * height * 4 | 0;
	while (ptr < len) {
		dst[ptr] = 255;
		ptr = ptr + 4 | 0;
	}
}
function asUint8Array(src) {
	return new Uint8Array(src.buffer, 0, src.byteLength);
}
var IS_LE = true;
try {
	IS_LE = new Uint32Array(new Uint8Array([
		1,
		0,
		0,
		0
	]).buffer)[0] === 1;
} catch (__) {}
function copyInt16asLE(src, target, target_offset) {
	if (IS_LE) {
		target.set(asUint8Array(src), target_offset);
		return;
	}
	for (let ptr = target_offset, i = 0; i < src.length; i++) {
		const data = src[i];
		target[ptr++] = data & 255;
		target[ptr++] = data >> 8 & 255;
	}
}
function resize_wasm(options) {
	const src = options.src;
	const srcW = options.width;
	const srcH = options.height;
	const destW = options.toWidth;
	const destH = options.toHeight;
	const scaleX = options.scaleX || options.toWidth / options.width;
	const scaleY = options.scaleY || options.toHeight / options.height;
	const offsetX = options.offsetX || 0;
	const offsetY = options.offsetY || 0;
	const dest = options.dest || new Uint8Array(destW * destH * 4);
	const filter = typeof options.filter === "undefined" ? "mks2013" : options.filter;
	const filtersX = resizeFilterGen(filter, srcW, destW, scaleX, offsetX), filtersY = resizeFilterGen(filter, srcH, destH, scaleY, offsetY);
	const src_offset = 0;
	const src_size = Math.max(src.byteLength, dest.byteLength);
	const tmp_offset = this.__align(src_offset + src_size);
	const tmp_size = srcH * destW * 4 * 2;
	const filtersX_offset = this.__align(tmp_offset + tmp_size);
	const filtersY_offset = this.__align(filtersX_offset + filtersX.byteLength);
	const alloc_bytes = filtersY_offset + filtersY.byteLength;
	const instance = this.__instance("resize", alloc_bytes);
	const mem = new Uint8Array(this.__memory.buffer);
	const mem32 = new Uint32Array(this.__memory.buffer);
	const src32 = new Uint32Array(src.buffer);
	mem32.set(src32);
	copyInt16asLE(filtersX, mem, filtersX_offset);
	copyInt16asLE(filtersY, mem, filtersY_offset);
	const fn = instance.exports.convolveHV || instance.exports._convolveHV;
	if (!fn) throw new Error("WASM resize function is not available");
	if (hasAlpha(src, srcW, srcH)) fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH, 1);
	else {
		fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH, 0);
		resetAlpha(dest, destW, destH);
	}
	new Uint32Array(dest.buffer).set(new Uint32Array(this.__memory.buffer, 0, destH * destW));
	return dest;
}
var mm_resize_default = {
	name: "resize",
	fn: resize,
	wasm_fn: resize_wasm,
	wasm_src: "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL"
};
var MathLib = class extends MultiMath {
	constructor(requested_features) {
		const __requested_features = requested_features || [];
		const features = {
			js: __requested_features.indexOf("js") >= 0,
			wasm: __requested_features.indexOf("wasm") >= 0
		};
		super(features);
		this.features = {
			js: features.js,
			wasm: features.wasm && this.has_wasm()
		};
		this.use(mm_unsharp_mask_default);
		this.use(mm_resize_default);
	}
	resizeAndUnsharp(options) {
		const result = this.resize(options);
		if (options.unsharpAmount) this.unsharp_mask(result, options.toWidth, options.toHeight, options.unsharpAmount, options.unsharpRadius, options.unsharpThreshold);
		return result;
	}
};
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var GC_INTERVAL = 100;
var Pool = class {
	constructor(create, idle) {
		_defineProperty(this, "create", void 0);
		_defineProperty(this, "available", void 0);
		_defineProperty(this, "acquired", void 0);
		_defineProperty(this, "lastId", void 0);
		_defineProperty(this, "timeoutId", void 0);
		_defineProperty(this, "idle", void 0);
		this.create = create;
		this.available = [];
		this.acquired = {};
		this.lastId = 1;
		this.timeoutId = 0;
		this.idle = idle || 2e3;
	}
	acquire() {
		let descriptor;
		if (this.available.length !== 0) descriptor = this.available.pop();
		else descriptor = _objectSpread2(_objectSpread2({}, this.create()), {}, {
			id: this.lastId++,
			lastUsed: 0
		});
		this.acquired[descriptor.id] = descriptor;
		return {
			value: descriptor.value,
			release: () => this.release(descriptor)
		};
	}
	release(descriptor) {
		delete this.acquired[descriptor.id];
		descriptor.lastUsed = Date.now();
		this.available.push(descriptor);
		if (this.timeoutId === 0) this.timeoutId = setTimeout(() => this.gc(), GC_INTERVAL);
	}
	gc() {
		const now = Date.now();
		this.available = this.available.filter((descriptor) => {
			if (now - descriptor.lastUsed > this.idle) {
				descriptor.destroy();
				return false;
			}
			return true;
		});
		if (this.available.length !== 0) this.timeoutId = setTimeout(() => this.gc(), GC_INTERVAL);
		else this.timeoutId = 0;
	}
};
function objClass(obj) {
	var _obj$constructor$name, _obj$constructor;
	return (_obj$constructor$name = obj === null || obj === void 0 || (_obj$constructor = obj.constructor) === null || _obj$constructor === void 0 ? void 0 : _obj$constructor.name) !== null && _obj$constructor$name !== void 0 ? _obj$constructor$name : "";
}
function isCanvas(element) {
	const cname = objClass(element);
	return cname === "HTMLCanvasElement" || cname === "OffscreenCanvas" || cname === "Canvas" || cname === "CanvasElement";
}
function isImage(element) {
	return objClass(element) === "HTMLImageElement";
}
function isImageBitmap(element) {
	return objClass(element) === "ImageBitmap";
}
function limiter(concurrency) {
	let active = 0;
	const queue = [];
	function roll() {
		if (active < concurrency && queue.length) {
			var _queue$shift;
			active++;
			(_queue$shift = queue.shift()) === null || _queue$shift === void 0 || _queue$shift();
		}
	}
	return function limit(fn) {
		return new Promise((resolve, reject) => {
			queue.push(() => {
				fn().then((result) => {
					resolve(result);
					active--;
					roll();
				}, (err) => {
					reject(err);
					active--;
					roll();
				});
			});
			roll();
		});
	};
}
function cib_quality_name(num) {
	switch (num) {
		case 0: return "pixelated";
		case 1: return "low";
		case 2: return "medium";
	}
	return "high";
}
var CIB_QUALITY_FILTERS = [
	"box",
	"hamming",
	"lanczos2",
	"lanczos3"
];
function cib_quality_filter(num) {
	return CIB_QUALITY_FILTERS[num];
}
function is_cib_filter(filter) {
	return CIB_QUALITY_FILTERS.indexOf(filter) >= 0;
}
function filter_to_cib_quality(filter) {
	const index = CIB_QUALITY_FILTERS.indexOf(filter);
	return index >= 0 ? index : void 0;
}
var MIN_INNER_TILE_SIZE = 2;
var DEST_TILE_BORDER = 3;
function createStages(fromWidth, fromHeight, toWidth, toHeight, srcTileSize) {
	const scaleX = toWidth / fromWidth;
	const scaleY = toHeight / fromHeight;
	const minScale = (2 * DEST_TILE_BORDER + MIN_INNER_TILE_SIZE + 1) / srcTileSize;
	if (minScale > .5) return [[toWidth, toHeight]];
	const stageCount = Math.ceil(Math.log(Math.min(scaleX, scaleY)) / Math.log(minScale));
	if (stageCount <= 1) return [[toWidth, toHeight]];
	const result = [];
	for (let i = 0; i < stageCount; i++) {
		const width = Math.round(Math.pow(Math.pow(fromWidth, stageCount - i - 1) * Math.pow(toWidth, i + 1), 1 / stageCount));
		const height = Math.round(Math.pow(Math.pow(fromHeight, stageCount - i - 1) * Math.pow(toHeight, i + 1), 1 / stageCount));
		result.push([width, height]);
	}
	return result;
}
var PIXEL_EPSILON = 1e-5;
function pixelFloor(x) {
	const nearest = Math.round(x);
	if (Math.abs(x - nearest) < PIXEL_EPSILON) return nearest;
	return Math.floor(x);
}
function pixelCeil(x) {
	const nearest = Math.round(x);
	if (Math.abs(x - nearest) < PIXEL_EPSILON) return nearest;
	return Math.ceil(x);
}
function createRegions(options) {
	const scaleX = options.toWidth / options.width;
	const scaleY = options.toHeight / options.height;
	const innerTileWidth = pixelFloor(options.srcTileSize * scaleX) - 2 * options.destTileBorder;
	const innerTileHeight = pixelFloor(options.srcTileSize * scaleY) - 2 * options.destTileBorder;
	if (innerTileWidth < 1 || innerTileHeight < 1) throw new Error("Internal error in pica: target tile width/height is too small.");
	let x, y;
	let innerX, innerY, toTileWidth, toTileHeight;
	const tiles = [];
	let tile;
	for (innerY = 0; innerY < options.toHeight; innerY += innerTileHeight) for (innerX = 0; innerX < options.toWidth; innerX += innerTileWidth) {
		x = innerX - options.destTileBorder;
		if (x < 0) x = 0;
		toTileWidth = innerX + innerTileWidth + options.destTileBorder - x;
		if (x + toTileWidth >= options.toWidth) toTileWidth = options.toWidth - x;
		y = innerY - options.destTileBorder;
		if (y < 0) y = 0;
		toTileHeight = innerY + innerTileHeight + options.destTileBorder - y;
		if (y + toTileHeight >= options.toHeight) toTileHeight = options.toHeight - y;
		tile = {
			toX: x,
			toY: y,
			toWidth: toTileWidth,
			toHeight: toTileHeight,
			toInnerX: innerX,
			toInnerY: innerY,
			toInnerWidth: innerTileWidth,
			toInnerHeight: innerTileHeight,
			offsetX: x / scaleX - pixelFloor(x / scaleX),
			offsetY: y / scaleY - pixelFloor(y / scaleY),
			scaleX,
			scaleY,
			x: pixelFloor(x / scaleX),
			y: pixelFloor(y / scaleY),
			width: pixelCeil(toTileWidth / scaleX),
			height: pixelCeil(toTileHeight / scaleY)
		};
		tiles.push(tile);
	}
	return tiles;
}
var ORIENTED_JPEG_BASE64 = "/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==";
var features = {
	canvas: false,
	offscreen_canvas: false,
	may_be_worker: false,
	create_image_bitmap: false,
	safari_put_image_data_fix: false,
	bug_canvas_orientation_region: true,
	bug_image_bitmap_orientation_region: true,
	cib_resize: false
};
var checked = false;
var checking = null;
function check_canvas() {
	if (typeof document === "undefined" || !document.createElement) return false;
	try {
		const canvas = document.createElement("canvas");
		canvas.width = 2;
		canvas.height = 1;
		const ctx = canvas.getContext("2d");
		let d = ctx.createImageData(2, 1);
		d.data[0] = 12;
		d.data[1] = 23;
		d.data[2] = 34;
		d.data[3] = 255;
		d.data[4] = 45;
		d.data[5] = 56;
		d.data[6] = 67;
		d.data[7] = 255;
		ctx.putImageData(d, 0, 0);
		d = ctx.getImageData(0, 0, 2, 1);
		return d.data[0] === 12 && d.data[1] === 23 && d.data[2] === 34 && d.data[3] === 255 && d.data[4] === 45 && d.data[5] === 56 && d.data[6] === 67 && d.data[7] === 255;
	} catch (__) {
		return false;
	}
}
function check_offscreen_canvas() {
	if (typeof OffscreenCanvas === "undefined") return false;
	try {
		const ctx = new OffscreenCanvas(2, 1).getContext("2d");
		let d = ctx.createImageData(2, 1);
		d.data[0] = 12;
		d.data[1] = 23;
		d.data[2] = 34;
		d.data[3] = 255;
		d.data[4] = 45;
		d.data[5] = 56;
		d.data[6] = 67;
		d.data[7] = 255;
		ctx.putImageData(d, 0, 0);
		d = ctx.getImageData(0, 0, 2, 1);
		return d.data[0] === 12 && d.data[1] === 23 && d.data[2] === 34 && d.data[3] === 255 && d.data[4] === 45 && d.data[5] === 56 && d.data[6] === 67 && d.data[7] === 255;
	} catch (__) {
		return false;
	}
}
function check_create_image_bitmap() {
	return typeof createImageBitmap !== "undefined";
}
function check_may_be_worker() {
	return typeof Worker !== "undefined" && typeof URL !== "undefined" && !!URL.createObjectURL;
}
function check_safari_put_image_data_fix() {
	try {
		return !!(typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome") < 0);
	} catch (__) {
		return false;
	}
}
function check_bug_canvas_orientation_region_async() {
	return Promise.resolve().then(() => {
		if (check_offscreen_canvas() && check_create_image_bitmap() && typeof Blob !== "undefined" && typeof atob !== "undefined") {
			const binary = atob(ORIENTED_JPEG_BASE64);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
			return createImageBitmap(new Blob([bytes], { type: "image/jpeg" })).then((bitmap) => {
				const canvas = new OffscreenCanvas(1, 1);
				try {
					const ctx = canvas.getContext("2d");
					ctx.drawImage(bitmap, 1, 1, 1, 1, 0, 0, 1, 1);
					return ctx.getImageData(0, 0, 1, 1).data[0] < 240;
				} finally {
					bitmap.close();
				}
			});
		}
		if (check_canvas() && typeof Image !== "undefined") return new Promise((resolve) => {
			const image = new Image();
			image.onload = () => {
				try {
					const canvas = document.createElement("canvas");
					canvas.width = 1;
					canvas.height = 1;
					const ctx = canvas.getContext("2d");
					ctx.drawImage(image, 1, 1, 1, 1, 0, 0, 1, 1);
					resolve(ctx.getImageData(0, 0, 1, 1).data[0] < 240);
				} catch (__) {
					resolve(true);
				}
			};
			image.onerror = () => resolve(true);
			image.src = `data:image/jpeg;base64,${ORIENTED_JPEG_BASE64}`;
		});
		return true;
	}).catch(() => true);
}
function check_bug_image_bitmap_orientation_region_async() {
	return Promise.resolve().then(() => {
		if (!features.create_image_bitmap && !check_create_image_bitmap()) return true;
		if (typeof Blob === "undefined" || typeof atob === "undefined") return true;
		const canOffscreenCanvas = check_offscreen_canvas();
		const canCanvas = check_canvas();
		if (!canOffscreenCanvas && !canCanvas) return true;
		const binary = atob(ORIENTED_JPEG_BASE64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
		return createImageBitmap(new Blob([bytes], { type: "image/jpeg" })).then((imageBitmap) => createImageBitmap(imageBitmap, 1, 1, 1, 1).then((bitmap) => {
			let canvas;
			if (canOffscreenCanvas) canvas = new OffscreenCanvas(1, 1);
			else {
				canvas = document.createElement("canvas");
				canvas.width = 1;
				canvas.height = 1;
			}
			try {
				const ctx = canvas.getContext("2d");
				ctx.drawImage(bitmap, 0, 0);
				return bitmap.width !== 1 || bitmap.height !== 1 || ctx.getImageData(0, 0, 1, 1).data[0] < 240;
			} finally {
				imageBitmap.close();
				bitmap.close();
			}
		}, () => {
			imageBitmap.close();
			return true;
		}));
	}).catch(() => true);
}
function check_cib_resize_async() {
	return Promise.resolve().then(() => {
		if (!check_create_image_bitmap()) return false;
		const SRC_SIZE = 20;
		const DST_SIZE = 5;
		let canvas;
		if (features.canvas || check_canvas()) {
			canvas = document.createElement("canvas");
			canvas.width = SRC_SIZE;
			canvas.height = SRC_SIZE;
		} else if (features.offscreen_canvas || check_offscreen_canvas()) {
			canvas = new OffscreenCanvas(SRC_SIZE, SRC_SIZE);
			canvas.getContext("2d").clearRect(0, 0, SRC_SIZE, SRC_SIZE);
		} else return false;
		return createImageBitmap(canvas, 0, 0, SRC_SIZE, SRC_SIZE, {
			resizeWidth: DST_SIZE,
			resizeHeight: DST_SIZE,
			resizeQuality: "high"
		}).then((bitmap) => {
			const status = bitmap.width === DST_SIZE && !!bitmap.close;
			if (bitmap.close) bitmap.close();
			canvas = null;
			return status;
		});
	}).catch(() => false);
}
function get_supported_features() {
	if (checked) return Promise.resolve(Object.assign({}, features));
	if (checking) return checking.then(() => Object.assign({}, features));
	features.canvas = check_canvas();
	features.offscreen_canvas = check_offscreen_canvas();
	features.may_be_worker = check_may_be_worker();
	features.create_image_bitmap = check_create_image_bitmap();
	features.safari_put_image_data_fix = check_safari_put_image_data_fix();
	const bugCanvasOrientationRegion = check_bug_canvas_orientation_region_async().then((result) => {
		features.bug_canvas_orientation_region = result;
	}).catch(() => {});
	const bugImageBitmapOrientationRegion = check_bug_image_bitmap_orientation_region_async().then((result) => {
		features.bug_image_bitmap_orientation_region = result;
	}).catch(() => {});
	const cibResize = check_cib_resize_async().then((result) => {
		features.cib_resize = result;
	}).catch(() => {});
	checking = Promise.all([
		bugCanvasOrientationRegion,
		bugImageBitmapOrientationRegion,
		cibResize
	]).then(() => {
		checked = true;
		checking = null;
		return Object.assign({}, features);
	}, (err) => {
		checking = null;
		throw err;
	});
	return checking;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
var WORKER_SRC = "/*!\n\npica\nhttps://github.com/nodeca/pica\n\n*/\n!function(){var A;function t(A){const t=A.replace(/[\\r\\n=]/g,\"\"),e=t.length,n=new Uint8Array(3*e>>2);let a=0,i=0;for(let s=0;s<e;s++)s%4==0&&s&&(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a),a=a<<6|\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\".indexOf(t.charAt(s));const r=e%4*6;return 0===r?(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a):18===r?(n[i++]=a>>10&255,n[i++]=a>>2&255):12===r&&(n[i++]=a>>4&255),n}var e={js:!0,wasm:!0},n=class{constructor(A){const t=Object.assign({},e,A||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0],!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least \"js\" or \"wasm\" should be enabled')}has_wasm(){return function(){if(void 0!==A)return A;if(A=!1,\"undefined\"==typeof WebAssembly)return A;try{const t=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),e=new WebAssembly.Module(t);return 0!==new WebAssembly.Instance(e,{}).exports.test(4)&&(A=!0),A}catch(t){}return A}()}use(A){return this.__modules[A.name]=A,this.options.wasm&&this.has_wasm()&&A.wasm_fn?this[A.name]=A.wasm_fn:this[A.name]=A.fn,this}init(){return this.__init_promise?this.__init_promise:this.options.js||!this.options.wasm||this.has_wasm()?(this.__init_promise=Promise.all(Object.keys(this.__modules).map(A=>{const e=this.__modules[A];return this.options.wasm&&this.has_wasm()&&e.wasm_fn?this.__wasm[A]?null:WebAssembly.compile(t(e.wasm_src)).then(t=>{this.__wasm[A]=t}):null})).then(()=>this),this.__init_promise):Promise.reject(new Error('mathlib: only \"wasm\" was enabled, but it\\'s not supported'))}__reallocate(A){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(A/65536)}),this.__memory;const t=this.__memory.buffer.byteLength;return t<A&&this.__memory.grow(Math.ceil((A-t)/65536)),this.__memory}__instance(A,e,n){if(e&&this.__reallocate(e),!this.__wasm[A]){const e=this.__modules[A];this.__wasm[A]=new WebAssembly.Module(t(e.wasm_src))}if(!this.__cache[A]){const t={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:\"anyfunc\"})};this.__cache[A]=new WebAssembly.Instance(this.__wasm[A],{env:Object.assign(t,n||{})})}return this.__cache[A]}__align(A,t){const e=A%(t=t||8);return A+(e?t-e:0)}};function a(A,t,e,n,a,i){let r,s,o,g,I,h,B,Q,E,C,c,f,u,m;for(E=0;E<i;E++){for(h=E*a,B=E,Q=0,r=A[h],I=r*n[6],g=I,c=n[0],f=n[1],u=n[4],m=n[5],C=0;C<a;C++)s=A[h],o=s*c+r*f+g*u+I*m,I=g,g=o,r=s,e[Q]=g,Q++,h++;for(h--,Q--,B+=i*(a-1),r=A[h],I=r*n[7],g=I,s=r,c=n[2],f=n[3],C=a-1;C>=0;C--)o=s*c+r*f+g*u+I*m,I=g,g=o,r=s,s=A[h],t[B]=e[Q]+g,h--,Q--,B-=i}}function i(A,t,e,n){if(!n)return;const i=new Uint16Array(A.length),r=new Float32Array(Math.max(t,e)),s=function(A){A<.5&&(A=.5);const t=Math.exp(.527076)/A,e=Math.exp(-t),n=Math.exp(-2*t),a=(1-e)*(1-e)/(1+2*t*e-n),i=a*(t-1)*e,r=a*(t+1)*e,s=-a*n,o=2*e,g=-n;return new Float32Array([a,i,r,s,o,g,(a+i)/(1-o-g),(r+s)/(1-o-g)])}(n);a(A,i,r,s,t,e),a(i,A,r,s,e,t)}var r={name:\"unsharp_mask\",fn:function(A,t,e,n,a,r){let s,o,g,I,h;if(0===n||a<.5)return;a>2&&(a=2);const B=function(A,t,e){const n=t*e,a=new Uint16Array(n);let i,r,s,o;for(let g=0;g<n;g++)i=A[4*g],r=A[4*g+1],s=A[4*g+2],o=i>=r&&i>=s?i:r>=s&&r>=i?r:s,a[g]=o<<8;return a}(A,t,e),Q=new Uint16Array(B);i(Q,t,e,a);const E=n/100*4096+.5|0,C=r<<8,c=t*e;for(let i=0;i<c;i++)s=B[i],I=s-Q[i],Math.abs(I)>=C&&(o=s+(E*I+2048>>12),o=o>65280?65280:o,o=o<0?0:o,s=0!==s?s:1,g=(o<<12)/s|0,h=4*i,A[h]=A[h]*g+2048>>12,A[h+1]=A[h+1]*g+2048>>12,A[h+2]=A[h+2]*g+2048>>12)},wasm_fn:function(A,t,e,n,a,i){if(0===n||a<.5)return;a>2&&(a=2);const r=t*e,s=4*r,o=2*r,g=2*r,I=4*Math.max(t,e),h=s,B=h+o,Q=B+g,E=Q+g,C=E+I,c=this.__instance(\"unsharp_mask\",s+o+2*g+I+32,{exp:Math.exp}),f=new Uint32Array(A.buffer);new Uint32Array(this.__memory.buffer).set(f);let u=c.exports.hsv_v16||c.exports._hsv_v16;if(!u)throw new Error(\"WASM hsv_v16 function is not available\");if(u(0,h,t,e),u=c.exports.blurMono16||c.exports._blurMono16,!u)throw new Error(\"WASM blurMono16 function is not available\");if(u(h,B,Q,E,C,t,e,a),u=c.exports.unsharp||c.exports._unsharp,!u)throw new Error(\"WASM unsharp function is not available\");u(0,0,h,B,t,e,n,i),f.set(new Uint32Array(this.__memory.buffer,0,r))},wasm_src:\"AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL\"},s={filter:{box:{win:.5,fn:A=>(A<0&&(A=-A),A<.5?1:0)},hamming:{win:1,fn(A){if(A<0&&(A=-A),A>=1)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(A){if(A<0&&(A=-A),A>=2)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(A){if(A<0&&(A=-A),A>=3)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn:A=>(A<0&&(A=-A),A>=2.5?0:A>=1.5?-.125*(A-2.5)*(A-2.5):A>=.5?.25*(4*A*A-11*A+7):1.0625-1.75*A*A)}}};function o(A){return Math.round(16383*A)}function g(A,t,e,n,a){const i=s.filter[A].fn,r=1/n,g=Math.min(1,n),I=s.filter[A].win/g;let h,B,Q,E,C,c,f,u,m,d,w,l,y,_,b,D,M;const p=Math.floor(2*(I+1)),G=new Int16Array((p+2)*e);let U=0;const k=!G.subarray||!G.set;for(h=0;h<e;h++){for(B=(h+.5)*r+a,Q=Math.max(0,Math.floor(B-I)),E=Math.min(t-1,Math.ceil(B+I)),C=E-Q+1,c=new Float32Array(C),f=new Int16Array(C),u=0,m=Q,d=0;m<=E;m++,d++)w=i((m+.5-B)*g),u+=w,c[d]=w;for(l=0,d=0;d<c.length;d++)y=c[d]/u,l+=y,f[d]=o(y);for(f[e>>1]+=o(1-l),_=0;_<f.length&&0===f[_];)_++;if(_<f.length){for(b=f.length-1;b>0&&0===f[b];)b--;if(D=Q+_,M=b-_+1,G[U++]=D,G[U++]=M,k)for(d=_;d<=b;d++)G[U++]=f[d];else G.set(f.subarray(_,b+1),U),U+=M}else G[U++]=0,G[U++]=0}return G}function I(A){return A<0?0:A>255?255:A}function h(A){return A>=0?A:0}var B=!0;try{B=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]}catch(p){}function Q(A,t,e){if(B)t.set(function(A){return new Uint8Array(A.buffer,0,A.byteLength)}(A),e);else for(let n=e,a=0;a<A.length;a++){const e=A[a];t[n++]=255&e,t[n++]=e>>8&255}}var E={name:\"resize\",fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,B=A.offsetY||0,Q=A.dest||new Uint8Array(a*i*4),E=void 0===A.filter?\"mks2013\":A.filter,C=g(E,e,a,r,o),c=g(E,n,i,s,B),f=new Uint16Array(a*n*4);return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,c,f,u=0,m=0;for(C=0;C<n;C++){for(I=0,c=0;c<a;c++){for(B=i[I++],Q=i[I++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)f=i[I++],g=g+f*A[E+3]|0,o=o+f*A[E+2]|0,s=s+f*A[E+1]|0,r=r+f*A[E]|0,E=E+4|0;t[m+3]=h(g>>7),t[m+2]=h(o>>7),t[m+1]=h(s>>7),t[m]=h(r>>7),m=m+4*n|0}m=4*(C+1)|0,u=(C+1)*e*4|0}}(t,f,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,c,f,u=0,m=0;for(C=0;C<n;C++){for(h=0,c=0;c<a;c++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)f=i[h++],g=g+f*A[E+3]|0,o=o+f*A[E+2]|0,s=s+f*A[E+1]|0,r=r+f*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,t[m+3]=I(g+8192>>14),t[m+2]=I(o+8192>>14),t[m+1]=I(s+8192>>14),t[m]=I(r+8192>>14),m=m+4*n|0}m=4*(C+1)|0,u=(C+1)*e*4|0}}(f,Q,n,a,i,c),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(Q,a,i)):(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,c,f,u,m=0,d=0;for(c=0;c<n;c++){for(B=0,f=0;f<a;f++){for(Q=i[B++],E=i[B++],C=m+4*Q|0,r=s=o=g=0;E>0;E--)u=i[B++],I=A[C+3],g=g+u*I|0,o=o+u*A[C+2]*I|0,s=s+u*A[C+1]*I|0,r=r+u*A[C]*I|0,C=C+4|0;o=o/255|0,s=s/255|0,r=r/255|0,t[d+3]=h(g>>7),t[d+2]=h(o>>7),t[d+1]=h(s>>7),t[d]=h(r>>7),d=d+4*n|0}d=4*(c+1)|0,m=(c+1)*e*4|0}}(t,f,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,c,f,u=0,m=0;for(C=0;C<n;C++){for(h=0,c=0;c<a;c++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)f=i[h++],g=g+f*A[E+3]|0,o=o+f*A[E+2]|0,s=s+f*A[E+1]|0,r=r+f*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,g=I(g+8192>>14),g>0&&(r=255*r/g|0,s=255*s/g|0,o=255*o/g|0),t[m+3]=g,t[m+2]=I(o+8192>>14),t[m+1]=I(s+8192>>14),t[m]=I(r+8192>>14),m=m+4*n|0}m=4*(C+1)|0,u=(C+1)*e*4|0}}(f,Q,n,a,i,c)),Q},wasm_fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,I=A.offsetY||0,h=A.dest||new Uint8Array(a*i*4),B=void 0===A.filter?\"mks2013\":A.filter,E=g(B,e,a,r,o),C=g(B,n,i,s,I),c=Math.max(t.byteLength,h.byteLength),f=this.__align(0+c),u=n*a*4*2,m=this.__align(f+u),d=this.__align(m+E.byteLength),w=d+C.byteLength,l=this.__instance(\"resize\",w),y=new Uint8Array(this.__memory.buffer),_=new Uint32Array(this.__memory.buffer),b=new Uint32Array(t.buffer);_.set(b),Q(E,y,m),Q(C,y,d);const D=l.exports.convolveHV||l.exports._convolveHV;if(!D)throw new Error(\"WASM resize function is not available\");return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(D(m,d,f,e,n,a,i,0),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(h,a,i)):D(m,d,f,e,n,a,i,1),new Uint32Array(h.buffer).set(new Uint32Array(this.__memory.buffer,0,i*a)),h},wasm_src:\"AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL\"},C=class extends n{constructor(A){const t=A||[],e={js:t.indexOf(\"js\")>=0,wasm:t.indexOf(\"wasm\")>=0};super(e),this.features={js:e.js,wasm:e.wasm&&this.has_wasm()},this.use(r),this.use(E)}resizeAndUnsharp(A){const t=this.resize(A);return A.unsharpAmount&&this.unsharp_mask(t,A.toWidth,A.toHeight,A.unsharpAmount,A.unsharpRadius,A.unsharpThreshold),t}},c=\"/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==\",f={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},u=!1,m=null;function d(){if(\"undefined\"==typeof document||!document.createElement)return!1;try{const A=document.createElement(\"canvas\");A.width=2,A.height=1;const t=A.getContext(\"2d\");let e=t.createImageData(2,1);return e.data[0]=12,e.data[1]=23,e.data[2]=34,e.data[3]=255,e.data[4]=45,e.data[5]=56,e.data[6]=67,e.data[7]=255,t.putImageData(e,0,0),e=t.getImageData(0,0,2,1),12===e.data[0]&&23===e.data[1]&&34===e.data[2]&&255===e.data[3]&&45===e.data[4]&&56===e.data[5]&&67===e.data[6]&&255===e.data[7]}catch(p){return!1}}function w(){if(\"undefined\"==typeof OffscreenCanvas)return!1;try{const A=new OffscreenCanvas(2,1).getContext(\"2d\");let t=A.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,A.putImageData(t,0,0),t=A.getImageData(0,0,2,1),12===t.data[0]&&23===t.data[1]&&34===t.data[2]&&255===t.data[3]&&45===t.data[4]&&56===t.data[5]&&67===t.data[6]&&255===t.data[7]}catch(p){return!1}}function l(){return\"undefined\"!=typeof createImageBitmap}function y(){if(u)return Promise.resolve(Object.assign({},f));if(m)return m.then(()=>Object.assign({},f));f.canvas=d(),f.offscreen_canvas=w(),f.may_be_worker=\"undefined\"!=typeof Worker&&\"undefined\"!=typeof URL&&!!URL.createObjectURL,f.create_image_bitmap=l(),f.safari_put_image_data_fix=function(){try{return!!(\"undefined\"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.indexOf(\"Safari\")>=0&&navigator.userAgent.indexOf(\"Chrome\")<0)}catch(p){return!1}}();const A=Promise.resolve().then(()=>{if(w()&&l()&&\"undefined\"!=typeof Blob&&\"undefined\"!=typeof atob){const A=atob(c),t=new Uint8Array(A.length);for(let e=0;e<A.length;e++)t[e]=A.charCodeAt(e);return createImageBitmap(new Blob([t],{type:\"image/jpeg\"})).then(A=>{const t=new OffscreenCanvas(1,1);try{const e=t.getContext(\"2d\");return e.drawImage(A,1,1,1,1,0,0,1,1),e.getImageData(0,0,1,1).data[0]<240}finally{A.close()}})}return!d()||\"undefined\"==typeof Image||new Promise(A=>{const t=new Image;t.onload=()=>{try{const e=document.createElement(\"canvas\");e.width=1,e.height=1;const n=e.getContext(\"2d\");n.drawImage(t,1,1,1,1,0,0,1,1),A(n.getImageData(0,0,1,1).data[0]<240)}catch(p){A(!0)}},t.onerror=()=>A(!0),t.src=`data:image/jpeg;base64,${c}`})}).catch(()=>!0).then(A=>{f.bug_canvas_orientation_region=A}).catch(()=>{}),t=Promise.resolve().then(()=>{if(!f.create_image_bitmap&&!l())return!0;if(\"undefined\"==typeof Blob||\"undefined\"==typeof atob)return!0;const A=w(),t=d();if(!A&&!t)return!0;const e=atob(c),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return createImageBitmap(new Blob([n],{type:\"image/jpeg\"})).then(t=>createImageBitmap(t,1,1,1,1).then(e=>{let n;A?n=new OffscreenCanvas(1,1):(n=document.createElement(\"canvas\"),n.width=1,n.height=1);try{const A=n.getContext(\"2d\");return A.drawImage(e,0,0),1!==e.width||1!==e.height||A.getImageData(0,0,1,1).data[0]<240}finally{t.close(),e.close()}},()=>(t.close(),!0)))}).catch(()=>!0).then(A=>{f.bug_image_bitmap_orientation_region=A}).catch(()=>{}),e=Promise.resolve().then(()=>{if(!l())return!1;const A=20;let t;if(f.canvas||d())t=document.createElement(\"canvas\"),t.width=A,t.height=A;else{if(!f.offscreen_canvas&&!w())return!1;t=new OffscreenCanvas(A,A),t.getContext(\"2d\").clearRect(0,0,A,A)}return createImageBitmap(t,0,0,A,A,{resizeWidth:5,resizeHeight:5,resizeQuality:\"high\"}).then(A=>{const e=5===A.width&&!!A.close;return A.close&&A.close(),t=null,e})}).catch(()=>!1).then(A=>{f.cib_resize=A}).catch(()=>{});return m=Promise.all([A,t,e]).then(()=>(u=!0,m=null,Object.assign({},f)),A=>{throw m=null,A})}var _=self,b=null;function D(A,t){return b||(b=new C(A.features)),b.resizeAndUnsharp(t)}function M(A){if(\"bitmap\"===A.job.kind)return void function(A,t){let e=new OffscreenCanvas(t.width,t.height);const n=e.getContext(\"2d\");n.drawImage(t.src,0,0);const a=n.getImageData(0,0,t.width,t.height).data;e.width=e.height=0,e=null,t.src.close();const i=D(A,{src:a,width:t.width,height:t.height,toWidth:t.toWidth,toHeight:t.toHeight,scaleX:t.scaleX,scaleY:t.scaleY,offsetX:t.offsetX,offsetY:t.offsetY,filter:t.filter,unsharpAmount:t.unsharpAmount,unsharpRadius:t.unsharpRadius,unsharpThreshold:t.unsharpThreshold}),r=new OffscreenCanvas(t.toWidth,t.toHeight),s=r.getContext(\"2d\"),o=s.createImageData(t.toWidth,t.toHeight);o.data.set(i),s.putImageData(o,0,0);const g=r.transferToImageBitmap();_.postMessage({kind:\"bitmap\",data:g},[g])}(A,A.job);const t=D(A,A.job);_.postMessage({kind:\"array\",data:t},[t.buffer])}_.onmessage=function(A){Promise.resolve().then(()=>function(A){switch(A.method){case\"get_supported_features\":return y().then(A=>{_.postMessage({data:A})});case\"resize\":return M(A),Promise.resolve();default:return Promise.reject(new Error(`Unknown worker method: ${A.method}`))}}(A.data)).catch(A=>{_.postMessage({err:A})})}}();\n//# sourceURL=pica-inline-worker.js";
var concurrency = 1;
if (typeof navigator !== "undefined") concurrency = Math.min(navigator.hardwareConcurrency || 1, 4);
var DEFAULT_PICA_OPTS = {
	tile: 1024,
	concurrency,
	features: [
		"js",
		"wasm",
		"ww"
	],
	idle: 2e3
};
var DEFAULT_RESIZE_OPTS = {
	filter: "mks2013",
	unsharpAmount: 0,
	unsharpRadius: 0,
	unsharpThreshold: 0
};
var Pica = class {
	constructor(options) {
		_defineProperty(this, "options", void 0);
		_defineProperty(this, "__limit", void 0);
		_defineProperty(this, "resize_features", void 0);
		_defineProperty(this, "__workersPool", void 0);
		_defineProperty(this, "capabilities", void 0);
		_defineProperty(this, "__requested_features", void 0);
		_defineProperty(this, "__mathlib", void 0);
		_defineProperty(this, "__initPromise", void 0);
		this.options = Object.assign({}, DEFAULT_PICA_OPTS, options || {});
		if ((this.options.features.indexOf("ww") >= 0 || this.options.features.indexOf("all") >= 0) && !this.options.workerURL && false);
		this.__limit = limiter(this.options.concurrency);
		this.resize_features = {
			js: false,
			wasm: false,
			cib: false,
			ww: false
		};
		this.__workersPool = null;
		this.capabilities = {
			worker: false,
			ww_offscreen_canvas: false,
			canvas: false,
			offscreen_canvas: false,
			may_be_worker: false,
			create_image_bitmap: false,
			safari_put_image_data_fix: false,
			bug_canvas_orientation_region: true,
			bug_image_bitmap_orientation_region: true,
			cib_resize: false
		};
		this.__requested_features = [];
		this.__mathlib = null;
	}
	init() {
		if (this.__initPromise) return this.__initPromise;
		this.__initPromise = this.__init();
		return this.__initPromise;
	}
	__init() {
		var _this = this;
		return _asyncToGenerator(function* () {
			let features = _this.options.features.slice();
			if (features.indexOf("all") >= 0) features = [
				"cib",
				"wasm",
				"js",
				"ww"
			];
			_this.__requested_features = features;
			_this.__mathlib = new MathLib(features);
			const result = yield get_supported_features();
			Object.assign(_this.capabilities, result);
			if (_this.capabilities.cib_resize && features.indexOf("cib") >= 0) _this.resize_features.cib = true;
			if (_this.capabilities.may_be_worker && features.indexOf("ww") >= 0 && WORKER_SRC) _this.__workersPool = new Pool(() => _this.__createWorkerSlot(), _this.options.idle);
			if (_this.__workersPool) try {
				const result = yield _this.__invokeWorker("get_supported_features");
				const resultData = result && result.data;
				if (resultData) {
					_this.capabilities.worker = true;
					_this.resize_features.ww = true;
					_this.capabilities.ww_offscreen_canvas = !!resultData.offscreen_canvas;
				}
			} catch (__) {}
			const mathlib = yield _this.__mathlib.init();
			Object.assign(_this.resize_features, mathlib.features);
			return _this;
		})();
	}
	createCanvas(width, height, preferOffscreen) {
		if (preferOffscreen && this.capabilities.offscreen_canvas) return new OffscreenCanvas(width, height);
		if (this.capabilities.canvas) {
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			return canvas;
		}
		if (this.capabilities.ww_offscreen_canvas) return new OffscreenCanvas(width, height);
		throw new Error("Pica: cannot create canvas");
	}
	__createWorkerSlot() {
		if (this.options.workerURL) {
			const worker = new Worker(String(this.options.workerURL));
			return {
				value: worker,
				destroy() {
					worker.terminate();
				}
			};
		}
		{
			const objectURL = window.URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
			const worker = new Worker(objectURL);
			return {
				value: worker,
				destroy() {
					worker.terminate();
					if (typeof window !== "undefined") {
						var _window$URL, _window$URL$revokeObj;
						(_window$URL = window.URL) === null || _window$URL === void 0 || (_window$URL$revokeObj = _window$URL.revokeObjectURL) === null || _window$URL$revokeObj === void 0 || _window$URL$revokeObj.call(_window$URL, objectURL);
					}
				}
			};
		}
	}
	__invokeWorker(method, payload, transfer, opts) {
		return new Promise((resolve, reject) => {
			const w = this.__workersPool.acquire();
			if (opts && opts.cancelToken) opts.cancelToken.catch((err) => reject(err));
			w.value.onmessage = (ev) => {
				w.release();
				if (ev.data.err) reject(ev.data.err);
				else resolve(ev.data);
			};
			w.value.postMessage(Object.assign({ method }, payload || {}), transfer || []);
		});
	}
	__invokeResize(tileJob, ctx) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			yield Promise.resolve();
			if (!_this2.resize_features.ww) {
				if (tileJob.kind !== "array") throw new Error("Pica: resize tile data is missing");
				const mathOpts = {
					src: tileJob.src,
					width: tileJob.width,
					height: tileJob.height,
					toWidth: tileJob.toWidth,
					toHeight: tileJob.toHeight,
					scaleX: tileJob.scaleX,
					scaleY: tileJob.scaleY,
					offsetX: tileJob.offsetX,
					offsetY: tileJob.offsetY,
					filter: tileJob.filter,
					unsharpAmount: tileJob.unsharpAmount,
					unsharpRadius: tileJob.unsharpRadius,
					unsharpThreshold: tileJob.unsharpThreshold
				};
				return {
					kind: "array",
					data: _this2.__mathlib.resizeAndUnsharp(mathOpts)
				};
			}
			const transfer = [];
			if (tileJob.kind === "array") transfer.push(tileJob.src.buffer);
			else transfer.push(tileJob.src);
			return _this2.__invokeWorker("resize", {
				job: tileJob,
				features: _this2.__requested_features
			}, transfer, ctx);
		})();
	}
	__extractTileData(tile, from, stageEnv, extractTo) {
		if (this.resize_features.ww && this.capabilities.ww_offscreen_canvas) {
			this.debug("Create tile imageBitmap");
			const tileCanvas = this.createCanvas(tile.width, tile.height, { preferOffscreen: true });
			tileCanvas.getContext("2d").drawImage(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height, 0, 0, tile.width, tile.height);
			if (!("transferToImageBitmap" in tileCanvas)) throw new Error("Pica: offscreen canvas is not available for worker transfer");
			return Object.assign({}, extractTo, {
				kind: "bitmap",
				src: tileCanvas.transferToImageBitmap()
			});
		}
		if (isCanvas(from)) {
			if (!stageEnv.srcCtx) stageEnv.srcCtx = from.getContext("2d");
			this.debug("Get tile pixel data");
			return Object.assign({}, extractTo, {
				kind: "array",
				src: stageEnv.srcCtx.getImageData(tile.x, tile.y, tile.width, tile.height).data
			});
		}
		this.debug("Draw tile imageBitmap/image to temporary canvas");
		const tmpCanvas = this.createCanvas(tile.width, tile.height, { preferOffscreen: true });
		const tmpCtx = tmpCanvas.getContext("2d");
		tmpCtx.globalCompositeOperation = "copy";
		tmpCtx.drawImage(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height, 0, 0, tile.width, tile.height);
		this.debug("Get tile pixel data");
		const src = tmpCtx.getImageData(0, 0, tile.width, tile.height).data;
		tmpCanvas.width = tmpCanvas.height = 0;
		return Object.assign({}, extractTo, {
			kind: "array",
			src
		});
	}
	__landTileData(tile, result, stageEnv) {
		if (result.kind === "bitmap") {
			stageEnv.toCtx.drawImage(result.data, tile.toX, tile.toY);
			result.data.close();
			return null;
		}
		this.debug("Draw tile");
		const toImageData = stageEnv.toCtx.createImageData(tile.toWidth, tile.toHeight);
		toImageData.data.set(result.data);
		if (this.capabilities.safari_put_image_data_fix) stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth + 1e-5, tile.toInnerHeight + 1e-5);
		else stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth, tile.toInnerHeight);
		return null;
	}
	__tileAndResize(from, to, resizeParams, ctx) {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			const stageEnv = {
				srcCtx: null,
				srcImageBitmap: null,
				isImageBitmapReused: false,
				toCtx: null
			};
			const processTile = (tile) => _this3.__limit(_asyncToGenerator(function* () {
				if (ctx.canceled) return ctx.cancelToken;
				const tileJob = {
					width: tile.width,
					height: tile.height,
					toWidth: tile.toWidth,
					toHeight: tile.toHeight,
					scaleX: tile.scaleX,
					scaleY: tile.scaleY,
					offsetX: tile.offsetX,
					offsetY: tile.offsetY,
					filter: resizeParams.filter,
					unsharpAmount: resizeParams.unsharpAmount,
					unsharpRadius: resizeParams.unsharpRadius,
					unsharpThreshold: resizeParams.unsharpThreshold
				};
				_this3.debug("Invoke resize math");
				const extractedTileJob = yield _this3.__extractTileData(tile, from, stageEnv, tileJob);
				_this3.debug("Invoke resize math");
				const result = yield _this3.__invokeResize(extractedTileJob, ctx);
				if (ctx.canceled) return ctx.cancelToken;
				return _this3.__landTileData(tile, result, stageEnv);
			}));
			yield Promise.resolve();
			stageEnv.toCtx = to.getContext("2d");
			if (isCanvas(from)) ; else if (isImageBitmap(from)) {
				stageEnv.srcImageBitmap = from;
				stageEnv.isImageBitmapReused = true;
			} else if (isImage(from)) {
				if (_this3.capabilities.create_image_bitmap) {
					_this3.debug("Decode image via createImageBitmap");
					try {
						stageEnv.srcImageBitmap = yield createImageBitmap(from);
					} catch (__) {}
				}
			} else throw new Error("Pica: \".from\" should be Image, Canvas or ImageBitmap");
			if (ctx.canceled) return ctx.cancelToken;
			_this3.debug("Calculate tiles");
			const jobs = createRegions({
				width: resizeParams.width,
				height: resizeParams.height,
				srcTileSize: _this3.options.tile,
				toWidth: resizeParams.toWidth,
				toHeight: resizeParams.toHeight,
				destTileBorder: Math.ceil(Math.max(3, 2.5 * resizeParams.unsharpRadius | 0))
			}).map((tile) => processTile(tile));
			function cleanup(stageEnv) {
				if (stageEnv.srcImageBitmap) {
					if (!stageEnv.isImageBitmapReused) stageEnv.srcImageBitmap.close();
					stageEnv.srcImageBitmap = null;
				}
			}
			_this3.debug("Process tiles");
			try {
				yield Promise.all(jobs);
				_this3.debug("Finished!");
				cleanup(stageEnv);
				return to;
			} catch (err) {
				cleanup(stageEnv);
				throw err;
			}
		})();
	}
	__planStagesAndResize(from, to, resizeParams, ctx) {
		var _this4 = this;
		return _asyncToGenerator(function* () {
			let src = from;
			let srcWidth = resizeParams.width;
			let srcHeight = resizeParams.height;
			const stages = createStages(resizeParams.width, resizeParams.height, resizeParams.toWidth, resizeParams.toHeight, _this4.options.tile);
			while (stages.length > 0) {
				if (ctx.canceled) return ctx.cancelToken;
				const [toWidth, toHeight] = stages.shift();
				const isLastStage = stages.length === 0;
				let filter;
				if (isLastStage || !is_cib_filter(resizeParams.filter)) filter = resizeParams.filter;
				else if (resizeParams.filter === "box") filter = "box";
				else filter = "hamming";
				const stageParams = _objectSpread2(_objectSpread2({}, resizeParams), {}, {
					filter,
					width: srcWidth,
					height: srcHeight,
					toWidth,
					toHeight
				});
				const dest = isLastStage ? to : _this4.createCanvas(toWidth, toHeight, { preferOffscreen: true });
				const prevTmp = src !== from ? src : void 0;
				try {
					yield _this4.__tileAndResize(src, dest, stageParams, ctx);
				} finally {
					if (prevTmp) prevTmp.width = prevTmp.height = 0;
				}
				src = dest;
				srcWidth = toWidth;
				srcHeight = toHeight;
			}
			return to;
		})();
	}
	__resizeViaCreateImageBitmap(from, to, resizeParams, ctx) {
		var _this5 = this;
		return _asyncToGenerator(function* () {
			var _utils$filter_to_cib_;
			let toCtx = to.getContext("2d");
			_this5.debug("Resize via createImageBitmap()");
			const imageBitmap = yield createImageBitmap(from, {
				resizeWidth: resizeParams.toWidth,
				resizeHeight: resizeParams.toHeight,
				resizeQuality: cib_quality_name((_utils$filter_to_cib_ = filter_to_cib_quality(resizeParams.filter)) !== null && _utils$filter_to_cib_ !== void 0 ? _utils$filter_to_cib_ : 3)
			});
			if (ctx.canceled) return ctx.cancelToken;
			if (!resizeParams.unsharpAmount) {
				toCtx.drawImage(imageBitmap, 0, 0);
				imageBitmap.close();
				toCtx = null;
				_this5.debug("Finished!");
				return to;
			}
			_this5.debug("Unsharp result");
			let tmpCanvas = _this5.createCanvas(resizeParams.toWidth, resizeParams.toHeight);
			let tmpCtx = tmpCanvas.getContext("2d");
			tmpCtx.drawImage(imageBitmap, 0, 0);
			imageBitmap.close();
			let iData = tmpCtx.getImageData(0, 0, resizeParams.toWidth, resizeParams.toHeight);
			_this5.__mathlib.unsharp_mask(iData.data, resizeParams.toWidth, resizeParams.toHeight, resizeParams.unsharpAmount, resizeParams.unsharpRadius, resizeParams.unsharpThreshold);
			toCtx.putImageData(iData, 0, 0);
			tmpCanvas.width = tmpCanvas.height = 0;
			iData = tmpCtx = tmpCanvas = toCtx = null;
			_this5.debug("Finished!");
			return to;
		})();
	}
	resize(from, to, options) {
		var _this6 = this;
		return _asyncToGenerator(function* () {
			_this6.debug("Start resize...");
			const requested = {};
			if (options) Object.assign(requested, options);
			let filter = requested.filter || DEFAULT_RESIZE_OPTS.filter;
			if (Object.prototype.hasOwnProperty.call(requested, "quality")) {
				const quality = requested.quality;
				if (typeof quality !== "number" || quality < 0 || quality > 3) throw new Error(`Pica: .quality should be [0..3], got ${quality}`);
				filter = cib_quality_filter(quality);
			}
			const resizeParams = {
				filter,
				unsharpAmount: requested.unsharpAmount || DEFAULT_RESIZE_OPTS.unsharpAmount,
				unsharpRadius: requested.unsharpRadius || DEFAULT_RESIZE_OPTS.unsharpRadius,
				unsharpThreshold: requested.unsharpThreshold || DEFAULT_RESIZE_OPTS.unsharpThreshold,
				width: isImage(from) ? from.naturalWidth : from.width,
				height: isImage(from) ? from.naturalHeight : from.height,
				toWidth: to.width,
				toHeight: to.height
			};
			if (resizeParams.unsharpRadius > 2) resizeParams.unsharpRadius = 2;
			if (to.width === 0 || to.height === 0) return Promise.reject(/* @__PURE__ */ new Error(`Invalid output size: ${to.width}x${to.height}`));
			const ctx = {
				cancelToken: requested.cancelToken,
				canceled: false
			};
			if (ctx.cancelToken) ctx.cancelToken = ctx.cancelToken.then((data) => {
				ctx.canceled = true;
				throw data;
			}, (err) => {
				ctx.canceled = true;
				throw err;
			});
			yield _this6.init();
			if (ctx.canceled) return ctx.cancelToken;
			if (_this6.capabilities.bug_image_bitmap_orientation_region && (isImage(from) || isImageBitmap(from))) {
				const tmpCanvas = _this6.createCanvas(resizeParams.width, resizeParams.height);
				tmpCanvas.getContext("2d").drawImage(from, 0, 0);
				from = tmpCanvas;
			}
			if (_this6.resize_features.cib) {
				if (is_cib_filter(resizeParams.filter)) return _this6.__resizeViaCreateImageBitmap(from, to, resizeParams, ctx);
				_this6.debug("cib is enabled, but not supports provided filter, fallback to manual math");
			}
			if (!_this6.capabilities.canvas && !_this6.capabilities.offscreen_canvas) {
				const err = /* @__PURE__ */ new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");
				err.code = "ERR_GET_IMAGE_DATA";
				throw err;
			}
			return _this6.__planStagesAndResize(from, to, resizeParams, ctx);
		})();
	}
	resizeBuffer(options) {
		var _this7 = this;
		return _asyncToGenerator(function* () {
			const opts = Object.assign({}, DEFAULT_RESIZE_OPTS, options);
			if (Object.prototype.hasOwnProperty.call(opts, "quality")) {
				const quality = opts.quality;
				if (typeof quality !== "number" || quality < 0 || quality > 3) throw new Error(`Pica: .quality should be [0..3], got ${quality}`);
				opts.filter = cib_quality_filter(quality);
			}
			yield _this7.init();
			if (!_this7.__mathlib) throw new Error("Pica: math library is not initialized");
			const mathOpts = {
				src: opts.src,
				width: opts.width,
				height: opts.height,
				toWidth: opts.toWidth,
				toHeight: opts.toHeight,
				dest: opts.dest,
				scaleX: opts.toWidth / opts.width,
				scaleY: opts.toHeight / opts.height,
				offsetX: 0,
				offsetY: 0,
				filter: opts.filter,
				unsharpAmount: opts.unsharpAmount,
				unsharpRadius: opts.unsharpRadius,
				unsharpThreshold: opts.unsharpThreshold
			};
			return _this7.__mathlib.resizeAndUnsharp(mathOpts);
		})();
	}
	toBlob(canvas, mimeType, quality) {
		return _asyncToGenerator(function* () {
			mimeType = mimeType || "image/png";
			if ("toBlob" in canvas && canvas.toBlob) return new Promise((resolve) => {
				canvas.toBlob((blob) => resolve(blob), mimeType, quality);
			});
			if ("convertToBlob" in canvas && canvas.convertToBlob) return canvas.convertToBlob({
				type: mimeType,
				quality
			});
			const asString = atob(canvas.toDataURL(mimeType, quality).split(",")[1]);
			const len = asString.length;
			const asBuffer = new Uint8Array(len);
			for (let i = 0; i < len; i++) asBuffer[i] = asString.charCodeAt(i);
			return new Blob([asBuffer], { type: mimeType });
		})();
	}
	debug(..._args) {}
};
function pica(options) {
	return new Pica(options);
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */
var EMPTY_DRAW_STATE = { strokes: [], texts: [] };
var DEFAULT_TEXT_FONT_FAMILY = 'system-ui, sans-serif';
var DEFAULT_TEXT_FONT_SIZE = 32;
var TEXT_FONT_OPTIONS = [
    { label: 'System', value: 'system-ui, sans-serif' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
    { label: 'Courier New', value: '"Courier New", Courier, monospace' },
    { label: 'Impact', value: 'Impact, sans-serif' },
    { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Trebuchet', value: '"Trebuchet MS", sans-serif' }
];
var DEFAULT_OUTPUT_BACKGROUND = {
    mode: 'transparent',
    color: '#ffffff'
};
var OUTPUT_BACKGROUND_SWATCHES = [
    '#ffffff',
    '#000000',
    '#f5f5f5',
    '#e0e0e0',
    '#ff3b30',
    '#007aff',
    '#34c759',
    '#ffcc00'
];
var DEFAULT_ADJUSTMENTS = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
    hueRotate: 0,
    sepia: 0,
    grayscale: 0,
    blur: 0,
    vignette: 0,
    tintColor: '',
    tintStrength: 0
};
function buildCssFilter(adjustments) {
    var parts = [
        "brightness(".concat(adjustments.brightness, "%)"),
        "contrast(".concat(adjustments.contrast, "%)"),
        "saturate(".concat(adjustments.saturation, "%)")
    ];
    if (adjustments.hueRotate) {
        parts.push("hue-rotate(".concat(adjustments.hueRotate, "deg)"));
    }
    if (adjustments.sepia) {
        parts.push("sepia(".concat(adjustments.sepia, "%)"));
    }
    if (adjustments.grayscale) {
        parts.push("grayscale(".concat(adjustments.grayscale, "%)"));
    }
    if (adjustments.blur) {
        parts.push("blur(".concat(adjustments.blur, "px)"));
    }
    return parts.join(' ');
}
function blobToDataUrl(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () { return resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
function dataUrlToFile(dataUrl, name, type) {
    var _a, _b;
    var mime = (_b = type !== null && type !== void 0 ? type : (_a = dataUrl.match(/^data:([^;]+);/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : 'image/png';
    return { name: name, type: mime, dataUrl: dataUrl };
}
/** Crafter write-content.json expects `path` = parent folder (with trailing slash), `name` = file leaf. */
function splitStaticAssetPath(fullPath) {
    var normalized = fullPath.startsWith('/') ? fullPath : "/".concat(fullPath);
    var slash = normalized.lastIndexOf('/');
    if (slash < 0) {
        return { folderPath: '/', fileName: normalized };
    }
    return {
        folderPath: "".concat(normalized.substring(0, slash + 1)),
        fileName: normalized.substring(slash + 1)
    };
}
function loadRepoImageAsDataUrl(siteId, assetPath, guestOrigin) {
    return __awaiter(this, void 0, void 0, function () {
        var urls, _i, urls_1, url, response, blob;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    urls = [];
                    if (guestOrigin) {
                        urls.push("".concat(guestOrigin.replace(/\/$/, '')).concat(assetPath, "?t=").concat(Date.now()));
                    }
                    urls.push("/studio/api/2/content/get_content_by_commit_id?siteId=".concat(encodeURIComponent(siteId), "&path=").concat(encodeURIComponent(assetPath), "&_=").concat(Date.now()));
                    _i = 0, urls_1 = urls;
                    _b.label = 1;
                case 1:
                    if (!(_i < urls_1.length)) return [3 /*break*/, 8];
                    url = urls_1[_i];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, fetch(url, { headers: getGlobalHeaders(), credentials: 'include' })];
                case 3:
                    response = _b.sent();
                    if (!response.ok) {
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, response.blob()];
                case 4:
                    blob = _b.sent();
                    if (!blob.type.startsWith('image/')) {
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, blobToDataUrl(blob)];
                case 5: return [2 /*return*/, _b.sent()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: throw new Error("Unable to load image at ".concat(assetPath));
            }
        });
    });
}
function createImage(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.addEventListener('load', function () { return resolve(image); });
        image.addEventListener('error', function (error) { return reject(error); });
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });
}
function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}
function rotateSize(width, height, rotation) {
    var rotRad = getRadianAngle(rotation);
    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
    };
}
function applyTint(ctx, width, height, adjustments) {
    if (!adjustments.tintStrength || !adjustments.tintColor) {
        return;
    }
    ctx.save();
    ctx.globalAlpha = adjustments.tintStrength / 100;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = adjustments.tintColor;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}
/** Apply a vignette (darkened edges) effect to the canvas. */
function applyVignette(ctx, width, height, strength) {
    if (!strength) {
        return;
    }
    var cx = width / 2;
    var cy = height / 2;
    var radius = Math.max(width, height) * 0.65;
    var gradient = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, "rgba(0,0,0,".concat((strength / 100) * 0.65, ")"));
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}
function applyDrawLayer(ctx, pixelCrop, sourceWidth, sourceHeight, drawState) {
    if (!drawState || (!drawState.strokes.length && !drawState.texts.length)) {
        return;
    }
    var toLocal = function (p) { return ({
        x: p.x - pixelCrop.x,
        y: p.y - pixelCrop.y
    }); };
    for (var _i = 0, _a = drawState.strokes; _i < _a.length; _i++) {
        var stroke = _a[_i];
        if (!stroke.points.length) {
            continue;
        }
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = stroke.size;
        if (stroke.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
        }
        else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = stroke.color;
        }
        if (stroke.tool === 'line' && stroke.points.length >= 2) {
            var start = toLocal(stroke.points[0]);
            var end = toLocal(stroke.points[stroke.points.length - 1]);
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            continue;
        }
        if (stroke.tool === 'fillRect' && stroke.points.length >= 2) {
            var a = toLocal(stroke.points[0]);
            var b = toLocal(stroke.points[stroke.points.length - 1]);
            var x = Math.min(a.x, b.x);
            var y = Math.min(a.y, b.y);
            var w = Math.abs(b.x - a.x);
            var h = Math.abs(b.y - a.y);
            ctx.fillStyle = stroke.color;
            ctx.fillRect(x, y, w, h);
            continue;
        }
        if (stroke.tool === 'fillEllipse' && stroke.points.length >= 2) {
            var a = toLocal(stroke.points[0]);
            var b = toLocal(stroke.points[stroke.points.length - 1]);
            var x = Math.min(a.x, b.x);
            var y = Math.min(a.y, b.y);
            var w = Math.abs(b.x - a.x);
            var h = Math.abs(b.y - a.y);
            ctx.fillStyle = stroke.color;
            ctx.beginPath();
            ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            continue;
        }
        ctx.beginPath();
        stroke.points.forEach(function (point, index) {
            var local = toLocal(point);
            if (index === 0) {
                ctx.moveTo(local.x, local.y);
            }
            else {
                ctx.lineTo(local.x, local.y);
            }
        });
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    for (var _b = 0, _c = drawState.texts; _b < _c.length; _b++) {
        var text = _c[_b];
        var pos = toLocal({ x: text.x, y: text.y });
        ctx.fillStyle = text.color;
        ctx.font = "".concat(text.fontSize, "px ").concat(text.fontFamily);
        ctx.textBaseline = 'top';
        ctx.fillText(text.text, pos.x, pos.y);
    }
}
function composeToOutputSize(sourceCanvas, outputWidth, outputHeight, background, mimeType) {
    return __awaiter(this, void 0, void 0, function () {
        var srcW, srcH, scale, drawW, drawH, contentCanvas, scaled, pica_1, final, ctx, useTransparent, x, y;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    srcW = sourceCanvas.width;
                    srcH = sourceCanvas.height;
                    scale = Math.min(outputWidth / srcW, outputHeight / srcH);
                    drawW = Math.max(1, Math.round(srcW * scale));
                    drawH = Math.max(1, Math.round(srcH * scale));
                    contentCanvas = sourceCanvas;
                    if (!(drawW !== srcW || drawH !== srcH)) return [3 /*break*/, 2];
                    scaled = document.createElement('canvas');
                    scaled.width = drawW;
                    scaled.height = drawH;
                    pica_1 = pica({ features: ['js', 'wasm'] });
                    return [4 /*yield*/, pica_1.resize(sourceCanvas, scaled, { quality: 3 })];
                case 1:
                    _a.sent();
                    contentCanvas = scaled;
                    _a.label = 2;
                case 2:
                    final = document.createElement('canvas');
                    final.width = outputWidth;
                    final.height = outputHeight;
                    ctx = final.getContext('2d');
                    if (!ctx) {
                        throw new Error('Canvas not supported');
                    }
                    useTransparent = background.mode === 'transparent' && mimeType !== 'image/jpeg';
                    if (useTransparent) {
                        ctx.clearRect(0, 0, outputWidth, outputHeight);
                    }
                    else {
                        ctx.fillStyle = background.mode === 'color' ? background.color : '#ffffff';
                        ctx.fillRect(0, 0, outputWidth, outputHeight);
                    }
                    x = (outputWidth - drawW) / 2;
                    y = (outputHeight - drawH) / 2;
                    ctx.drawImage(contentCanvas, x, y, drawW, drawH);
                    return [2 /*return*/, final];
            }
        });
    });
}
function getCroppedImageBlob(imageSrc_1, pixelCrop_1, adjustments_1, outputWidth_1, outputHeight_1) {
    return __awaiter(this, arguments, void 0, function (imageSrc, pixelCrop, adjustments, outputWidth, outputHeight, mimeType, quality, drawState, outputBackground) {
        var image, canvas, ctx, rotRad, _a, bBoxWidth, bBoxHeight, scaleX, scaleY, croppedCanvas, croppedCtx, resultCanvas;
        if (mimeType === void 0) { mimeType = 'image/png'; }
        if (quality === void 0) { quality = 0.92; }
        if (outputBackground === void 0) { outputBackground = DEFAULT_OUTPUT_BACKGROUND; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createImage(imageSrc)];
                case 1:
                    image = _b.sent();
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    if (!ctx) {
                        throw new Error('Canvas not supported');
                    }
                    rotRad = getRadianAngle(adjustments.rotation);
                    _a = rotateSize(image.width, image.height, adjustments.rotation), bBoxWidth = _a.width, bBoxHeight = _a.height;
                    canvas.width = bBoxWidth;
                    canvas.height = bBoxHeight;
                    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
                    ctx.rotate(rotRad);
                    scaleX = adjustments.flipHorizontal ? -1 : 1;
                    scaleY = adjustments.flipVertical ? -1 : 1;
                    ctx.scale(scaleX, scaleY);
                    ctx.translate(-image.width / 2, -image.height / 2);
                    ctx.filter = buildCssFilter(adjustments);
                    ctx.drawImage(image, 0, 0);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    applyTint(ctx, bBoxWidth, bBoxHeight, adjustments);
                    croppedCanvas = document.createElement('canvas');
                    croppedCtx = croppedCanvas.getContext('2d');
                    if (!croppedCtx) {
                        throw new Error('Canvas not supported');
                    }
                    croppedCanvas.width = pixelCrop.width;
                    croppedCanvas.height = pixelCrop.height;
                    croppedCtx.drawImage(canvas, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
                    applyDrawLayer(croppedCtx, pixelCrop, image.width, image.height, drawState);
                    applyVignette(croppedCtx, pixelCrop.width, pixelCrop.height, adjustments.vignette);
                    resultCanvas = croppedCanvas;
                    if (!(outputWidth && outputHeight && (outputWidth !== pixelCrop.width || outputHeight !== pixelCrop.height))) return [3 /*break*/, 3];
                    return [4 /*yield*/, composeToOutputSize(croppedCanvas, outputWidth, outputHeight, outputBackground, mimeType)];
                case 2:
                    resultCanvas = _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resultCanvas.toBlob(function (blob) {
                            if (!blob) {
                                reject(new Error('Export failed'));
                                return;
                            }
                            resolve(blob);
                        }, mimeType, quality);
                    })];
            }
        });
    });
}
/** Compute a crop rectangle around a focal point for a target aspect ratio. */
function focalCropArea(imageWidth, imageHeight, focal, aspectRatio) {
    var fx = (focal.x / 100) * imageWidth;
    var fy = (focal.y / 100) * imageHeight;
    var cropWidth = imageWidth;
    var cropHeight = imageHeight;
    if (imageWidth / imageHeight > aspectRatio) {
        cropHeight = imageHeight;
        cropWidth = cropHeight * aspectRatio;
    }
    else {
        cropWidth = imageWidth;
        cropHeight = cropWidth / aspectRatio;
    }
    var x = fx - cropWidth / 2;
    var y = fy - cropHeight / 2;
    x = Math.max(0, Math.min(x, imageWidth - cropWidth));
    y = Math.max(0, Math.min(y, imageHeight - cropHeight));
    return {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(cropWidth),
        height: Math.round(cropHeight)
    };
}
function suggestVariantFilename(originalPath) {
    var lastSlash = originalPath.lastIndexOf('/');
    var dir = lastSlash >= 0 ? originalPath.slice(0, lastSlash + 1) : '';
    var file = lastSlash >= 0 ? originalPath.slice(lastSlash + 1) : originalPath;
    var dot = file.lastIndexOf('.');
    var base = dot >= 0 ? file.slice(0, dot) : file;
    var ext = dot >= 0 ? file.slice(dot) : '.png';
    var stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return "".concat(dir).concat(base, "-variant-").concat(stamp).concat(ext);
}
function formatDimensionSpec(req) {
    var _a, _b, _c, _d;
    var parts = [];
    var w = req.widthExact != null
        ? "".concat(req.widthExact, "px")
        : req.widthMin != null || req.widthMax != null
            ? "".concat((_a = req.widthMin) !== null && _a !== void 0 ? _a : '—', "\u2013").concat((_b = req.widthMax) !== null && _b !== void 0 ? _b : '—', "px")
            : null;
    var h = req.heightExact != null
        ? "".concat(req.heightExact, "px")
        : req.heightMin != null || req.heightMax != null
            ? "".concat((_c = req.heightMin) !== null && _c !== void 0 ? _c : '—', "\u2013").concat((_d = req.heightMax) !== null && _d !== void 0 ? _d : '—', "px")
            : null;
    if (w)
        parts.push("W: ".concat(w));
    if (h)
        parts.push("H: ".concat(h));
    return parts.length ? parts.join(', ') : 'No size constraints';
}
function imageMatchesRequirement(width, height, req) {
    var check = function (value, exact, min, max) {
        if (exact != null && value !== exact)
            return false;
        if (min != null && value < min)
            return false;
        if (max != null && value > max)
            return false;
        return true;
    };
    return check(width, req.widthExact, req.widthMin, req.widthMax) && check(height, req.heightExact, req.heightMin, req.heightMax);
}
function pickConstraintDimension(exact, min, max) {
    if (exact != null) {
        return exact;
    }
    if (max != null) {
        return max;
    }
    if (min != null) {
        return min;
    }
    return undefined;
}
/** Resolve form constraints into editor targets (exact preferred, else max, else min). */
function resolveImageConstraints(req) {
    var outputWidth = pickConstraintDimension(req.widthExact, req.widthMin, req.widthMax);
    var outputHeight = pickConstraintDimension(req.heightExact, req.heightMin, req.heightMax);
    if (outputWidth == null && outputHeight == null) {
        return null;
    }
    var resolved = {};
    if (outputWidth != null) {
        resolved.outputWidth = outputWidth;
    }
    if (outputHeight != null) {
        resolved.outputHeight = outputHeight;
    }
    if (outputWidth != null && outputHeight != null) {
        resolved.aspect = outputWidth / outputHeight;
    }
    return resolved;
}
function hasApplicableConstraints(req) {
    return resolveImageConstraints(req) != null;
}
var ASPECT_PRESETS = [
    { label: 'Free', value: undefined },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '3:2', value: 3 / 2 },
    { label: '16:9', value: 16 / 9 },
    { label: '9:16', value: 9 / 16 },
    { label: '2:1', value: 2 }
];
var FOCAL_PREVIEW_RATIOS = [
    { label: '16:9', ratio: 16 / 9 },
    { label: '4:3', ratio: 4 / 3 },
    { label: '1:1', ratio: 1 },
    { label: '9:16', ratio: 9 / 16 }
];
var DEFAULT_FOCAL = { x: 50, y: 50 };
function clampFocal(point) {
    return {
        x: Math.max(0, Math.min(100, point.x)),
        y: Math.max(0, Math.min(100, point.y))
    };
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */
/** Instagram-inspired looks approximated with CSS filters (no LUT assets). */
var FILTER_PRESETS = [
    { id: 'normal', label: 'Normal', adjustments: __assign({}, DEFAULT_ADJUSTMENTS) },
    {
        id: 'clarendon',
        label: 'Clarendon',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 108, contrast: 118, saturation: 125 })
    },
    {
        id: 'gingham',
        label: 'Gingham',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 108, contrast: 95, saturation: 90, hueRotate: -8 })
    },
    {
        id: 'moon',
        label: 'Moon',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 112, contrast: 125, saturation: 0, grayscale: 100 })
    },
    {
        id: 'lark',
        label: 'Lark',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 115, contrast: 105, saturation: 130 })
    },
    {
        id: 'reyes',
        label: 'Reyes',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 112, contrast: 88, saturation: 85, sepia: 22, hueRotate: 12 })
    },
    {
        id: 'juno',
        label: 'Juno',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 108, contrast: 112, saturation: 140, hueRotate: 8 })
    },
    {
        id: 'slumber',
        label: 'Slumber',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 105, contrast: 95, saturation: 80, hueRotate: -18, sepia: 12 })
    },
    {
        id: 'nashville',
        label: 'Nashville',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 110, contrast: 108, saturation: 115, sepia: 18, hueRotate: 15 })
    },
    {
        id: 'walden',
        label: 'Walden',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 118, contrast: 102, saturation: 125, sepia: 28, hueRotate: 5 })
    },
    {
        id: 'willow',
        label: 'Willow',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 105, contrast: 90, saturation: 0, grayscale: 85 })
    },
    {
        id: 'valencia',
        label: 'Valencia',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 112, contrast: 100, saturation: 110, sepia: 15, hueRotate: 6 })
    },
    {
        id: 'hudson',
        label: 'Hudson',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 108, contrast: 115, saturation: 95, hueRotate: -22, vignette: 35 })
    },
    {
        id: 'lofi',
        label: 'Lo-Fi',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 102, contrast: 135, saturation: 145, vignette: 45 })
    },
    {
        id: 'xpro2',
        label: 'X-Pro II',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 105, contrast: 128, saturation: 120, vignette: 55 })
    },
    {
        id: 'sierra',
        label: 'Sierra',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 110, contrast: 92, saturation: 88, sepia: 10 })
    },
    {
        id: 'rise',
        label: 'Rise',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 118, contrast: 95, saturation: 105, sepia: 20, hueRotate: 10 })
    },
    {
        id: 'inkwell',
        label: 'Inkwell',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 108, contrast: 120, saturation: 0, grayscale: 100 })
    },
    {
        id: 'dramatic',
        label: 'Dramatic',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 95, contrast: 145, saturation: 110, vignette: 40 })
    },
    {
        id: 'fade',
        label: 'Fade',
        adjustments: __assign(__assign({}, DEFAULT_ADJUSTMENTS), { brightness: 115, contrast: 85, saturation: 75 })
    }
];

var TINT_COLORS = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#5856d6', '#af52de', '#ff2d55', '#ffffff', '#000000'];
function ImageStudioFiltersPanel(_a) {
    var _b;
    var imageSrc = _a.imageSrc, activePresetId = _a.activePresetId, adjustments = _a.adjustments, onSelectPreset = _a.onSelectPreset, onTintChange = _a.onTintChange;
    var theme = useTheme();
    return (jsxs(Box$1, { sx: { display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0 }, children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Tap a look, then optionally add a color wash over the effect." }), jsxs(Paper, { elevation: 0, variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: [jsx(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, display: 'block', mb: 1 }, children: "Color wash" }), jsxs(Stack, { direction: "row", spacing: 0.5, flexWrap: "wrap", useFlexGap: true, sx: { mb: 1 }, children: [TINT_COLORS.map(function (color) { return (jsx(IconButton$1, { size: "small", onClick: function () { return onTintChange(color, adjustments.tintStrength || 35); }, sx: {
                                    width: 26,
                                    height: 26,
                                    bgcolor: color,
                                    border: adjustments.tintColor === color ? "2px solid ".concat(theme.palette.primary.main) : '1px solid',
                                    borderColor: adjustments.tintColor === color ? 'primary.main' : 'divider'
                                } }, color)); }), jsx(IconButton$1, { size: "small", onClick: function () { return onTintChange('', 0); }, sx: { width: 26, height: 26, fontSize: 11 }, children: "Off" })] }), jsx(Typography, { variant: "caption", color: "text.secondary", children: "Wash strength" }), jsx(Slider, { size: "small", min: 0, max: 100, value: (_b = adjustments.tintStrength) !== null && _b !== void 0 ? _b : 0, onChange: function (_, v) { return onTintChange(adjustments.tintColor || '#007aff', v); } })] }), jsx(Box$1, { sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
                    gap: 1.5,
                    flex: 1,
                    minHeight: 0,
                    overflow: 'auto',
                    pb: 1
                }, children: FILTER_PRESETS.map(function (preset) {
                    var selected = preset.id === activePresetId;
                    var previewAdjustments = __assign(__assign({}, preset.adjustments), { tintColor: adjustments.tintColor, tintStrength: adjustments.tintStrength });
                    return (jsxs(Paper, { elevation: 0, onClick: function () {
                            return onSelectPreset(preset.id, __assign(__assign({}, preset.adjustments), { tintColor: adjustments.tintColor, tintStrength: adjustments.tintStrength }));
                        }, sx: {
                            cursor: 'pointer',
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: selected ? "2px solid ".concat(theme.palette.primary.main) : "1px solid ".concat(theme.palette.divider),
                            bgcolor: 'background.paper',
                            transition: 'transform 0.15s, box-shadow 0.15s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 2
                            }
                        }, children: [jsxs(Box$1, { sx: { position: 'relative', aspectRatio: '1', bgcolor: '#222' }, children: [jsx(Box$1, { sx: {
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundImage: "url(".concat(imageSrc, ")"),
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: buildCssFilter(previewAdjustments)
                                        } }), previewAdjustments.tintStrength && previewAdjustments.tintColor && (jsx(Box$1, { sx: {
                                            position: 'absolute',
                                            inset: 0,
                                            bgcolor: previewAdjustments.tintColor,
                                            opacity: previewAdjustments.tintStrength / 100,
                                            mixBlendMode: 'multiply',
                                            pointerEvents: 'none'
                                        } }))] }), jsx(Typography, { variant: "caption", sx: {
                                    display: 'block',
                                    textAlign: 'center',
                                    py: 0.75,
                                    fontWeight: selected ? 600 : 400,
                                    color: selected ? 'primary.main' : 'text.primary'
                                }, children: preset.label })] }, preset.id));
                }) })] }));
}

function ImageCanvasZoomBar(_a) {
    var view = _a.view, onViewChange = _a.onViewChange, compact = _a.compact;
    var setZoom = function (zoom) {
        onViewChange(__assign(__assign({}, view), { zoom: clampCanvasZoom(zoom) }));
    };
    return (jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1, flexWrap: "wrap", useFlexGap: true, sx: { py: compact ? 0 : 0.5 }, children: [jsx(Tooltip, { title: "Zoom out", children: jsx(IconButton$1, { size: "small", onClick: function () { return setZoom(view.zoom / 1.2); }, children: jsx(ZoomOutRoundedIcon, { fontSize: "small" }) }) }), jsx(Box$1, { sx: { width: compact ? 100 : 140, px: 0.5 }, children: jsx(Slider, { size: "small", min: MIN_CANVAS_ZOOM, max: MAX_CANVAS_ZOOM, step: 0.05, value: view.zoom, onChange: function (_, v) { return setZoom(v); } }) }), jsx(Tooltip, { title: "Zoom in", children: jsx(IconButton$1, { size: "small", onClick: function () { return setZoom(view.zoom * 1.2); }, children: jsx(ZoomInRoundedIcon, { fontSize: "small" }) }) }), jsxs(Typography, { variant: "caption", sx: { fontWeight: 600, minWidth: 40 }, children: [Math.round(view.zoom * 100), "%"] }), jsx(Tooltip, { title: "Fit to view", children: jsx(IconButton$1, { size: "small", onClick: function () { return onViewChange(DEFAULT_CANVAS_VIEW); }, children: jsx(FitScreenRoundedIcon, { fontSize: "small" }) }) }), !compact && (jsx(Typography, { variant: "caption", color: "text.secondary", children: "Scroll to zoom \u00B7 Space + drag to pan" }))] }));
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */
function useImageCanvasView(containerRef, naturalSize, canvasView, onCanvasViewChange) {
    var _a = useState(false), spaceDown = _a[0], setSpaceDown = _a[1];
    var _b = useState(false), isPanning = _b[0], setIsPanning = _b[1];
    var panDragRef = useRef(null);
    var viewRef = useRef(canvasView);
    viewRef.current = canvasView;
    useEffect(function () {
        var onKeyDown = function (e) {
            var _a, _b;
            if (e.code === 'Space' && !e.repeat) {
                var tag = (_a = e.target) === null || _a === void 0 ? void 0 : _a.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA' || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.isContentEditable)) {
                    return;
                }
                e.preventDefault();
                setSpaceDown(true);
            }
        };
        var onKeyUp = function (e) {
            var _a;
            if (e.code === 'Space') {
                setSpaceDown(false);
                if (((_a = panDragRef.current) === null || _a === void 0 ? void 0 : _a.initiatedBy) === 'space') {
                    panDragRef.current = null;
                    setIsPanning(false);
                }
            }
        };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return function () {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);
    var handleWheel = useCallback(function (e) {
        e.preventDefault();
        var container = containerRef.current;
        if (!container || !naturalSize.width) {
            return;
        }
        var rect = container.getBoundingClientRect();
        var displayX = e.clientX - rect.left;
        var displayY = e.clientY - rect.top;
        var factor = e.deltaY > 0 ? 0.9 : 1.1;
        var view = viewRef.current;
        var newZoom = clampCanvasZoom(view.zoom * factor);
        onCanvasViewChange(zoomViewAtPoint(rect.width, rect.height, naturalSize.width, naturalSize.height, view, displayX, displayY, newZoom));
    }, [containerRef, naturalSize.width, naturalSize.height, onCanvasViewChange]);
    var tryStartPan = useCallback(function (e) {
        if (!spaceDown && e.button !== 1) {
            return false;
        }
        e.preventDefault();
        var view = viewRef.current;
        panDragRef.current = {
            startClientX: e.clientX,
            startClientY: e.clientY,
            startPanX: view.panX,
            startPanY: view.panY,
            initiatedBy: spaceDown ? 'space' : 'middleMouse'
        };
        setIsPanning(true);
        e.target.setPointerCapture(e.pointerId);
        return true;
    }, [spaceDown]);
    var handlePanMove = useCallback(function (e) {
        var drag = panDragRef.current;
        if (!drag) {
            return false;
        }
        var dx = e.clientX - drag.startClientX;
        var dy = e.clientY - drag.startClientY;
        var view = viewRef.current;
        onCanvasViewChange(__assign(__assign({}, view), { panX: drag.startPanX + dx, panY: drag.startPanY + dy }));
        return true;
    }, [onCanvasViewChange]);
    var endPan = useCallback(function () {
        panDragRef.current = null;
        setIsPanning(false);
    }, []);
    var panCursor = isPanning ? 'grabbing' : spaceDown ? 'grab' : undefined;
    return {
        spaceDown: spaceDown,
        panCursor: panCursor,
        handleWheel: handleWheel,
        tryStartPan: tryStartPan,
        handlePanMove: handlePanMove,
        endPan: endPan
    };
}

var BRUSH_COLORS = ['#ffffff', '#000000', '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#af52de'];
function newTextId() {
    return "text-".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8));
}
function ImageStudioDrawCanvas(_a) {
    var _b, _c, _d;
    var imageSrc = _a.imageSrc, adjustments = _a.adjustments, drawState = _a.drawState, onDrawStateChange = _a.onDrawStateChange, drawTool = _a.drawTool, onDrawToolChange = _a.onDrawToolChange, brushColor = _a.brushColor, onBrushColorChange = _a.onBrushColorChange, brushSize = _a.brushSize, onBrushSizeChange = _a.onBrushSizeChange, textFontFamily = _a.textFontFamily, onTextFontFamilyChange = _a.onTextFontFamilyChange, textFontSize = _a.textFontSize, onTextFontSizeChange = _a.onTextFontSizeChange, canvasView = _a.canvasView, onCanvasViewChange = _a.onCanvasViewChange;
    var theme = useTheme();
    var containerRef = useRef(null);
    var canvasRef = useRef(null);
    var imageRef = useRef(null);
    var layoutRef = useRef(null);
    var _e = useState({ width: 0, height: 0 }), naturalSize = _e[0], setNaturalSize = _e[1];
    var _f = useState(null), activeStroke = _f[0], setActiveStroke = _f[1];
    var _g = useState(null), lineStart = _g[0], setLineStart = _g[1];
    var _h = useState(null), selectedTextId = _h[0], setSelectedTextId = _h[1];
    var _j = useState(''), editingText = _j[0], setEditingText = _j[1];
    var dragTextRef = useRef(null);
    var viewInteraction = useImageCanvasView(containerRef, naturalSize, canvasView, onCanvasViewChange);
    useEffect(function () {
        var cancelled = false;
        createImage(imageSrc).then(function (img) {
            if (!cancelled) {
                imageRef.current = img;
                setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
            }
        });
        return function () {
            cancelled = true;
        };
    }, [imageSrc]);
    var hitTestText = function (ctx, layout, px, py) {
        for (var i = drawState.texts.length - 1; i >= 0; i--) {
            var text = drawState.texts[i];
            var pos = imageToDisplay(text.x, text.y, layout);
            var fontSize = text.fontSize * layout.scale;
            ctx.font = "".concat(fontSize, "px ").concat(text.fontFamily);
            var width = ctx.measureText(text.text).width;
            var height = fontSize * 1.25;
            if (px >= pos.x && px <= pos.x + width && py >= pos.y && py <= pos.y + height) {
                return text;
            }
        }
        return null;
    };
    var paintCanvas = useCallback(function () {
        var canvas = canvasRef.current;
        var container = containerRef.current;
        var img = imageRef.current;
        if (!canvas || !container || !img || !naturalSize.width) {
            return;
        }
        var rect = container.getBoundingClientRect();
        var displayWidth = Math.max(1, Math.floor(rect.width));
        var displayHeight = Math.max(1, Math.floor(rect.height));
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        var layout = computeImageLayout(displayWidth, displayHeight, naturalSize.width, naturalSize.height, canvasView);
        layoutRef.current = layout;
        var drawWidth = naturalSize.width * layout.scale;
        var drawHeight = naturalSize.height * layout.scale;
        ctx.fillStyle = '#141414';
        ctx.fillRect(0, 0, displayWidth, displayHeight);
        ctx.save();
        ctx.filter = buildCssFilter(adjustments);
        ctx.drawImage(img, layout.offsetX, layout.offsetY, drawWidth, drawHeight);
        ctx.restore();
        if (adjustments.tintStrength && adjustments.tintColor) {
            ctx.save();
            ctx.globalAlpha = adjustments.tintStrength / 100;
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = adjustments.tintColor;
            ctx.fillRect(layout.offsetX, layout.offsetY, drawWidth, drawHeight);
            ctx.restore();
        }
        var toDisplay = function (p) { return imageToDisplay(p.x, p.y, layout); };
        var drawStrokePath = function (stroke) {
            if (stroke.points.length < 1) {
                return;
            }
            var size = stroke.size * layout.scale;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = size;
            if (stroke.tool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            }
            else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = stroke.color;
            }
            if (stroke.tool === 'line' && stroke.points.length >= 2) {
                var start = toDisplay(stroke.points[0]);
                var end = toDisplay(stroke.points[stroke.points.length - 1]);
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.stroke();
                ctx.globalCompositeOperation = 'source-over';
                return;
            }
            if (stroke.tool === 'fillRect' && stroke.points.length >= 2) {
                var a = toDisplay(stroke.points[0]);
                var b = toDisplay(stroke.points[stroke.points.length - 1]);
                var x = Math.min(a.x, b.x);
                var y = Math.min(a.y, b.y);
                var w = Math.abs(b.x - a.x);
                var h = Math.abs(b.y - a.y);
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = stroke.color;
                ctx.fillRect(x, y, w, h);
                return;
            }
            if (stroke.tool === 'fillEllipse' && stroke.points.length >= 2) {
                var a = toDisplay(stroke.points[0]);
                var b = toDisplay(stroke.points[stroke.points.length - 1]);
                var x = Math.min(a.x, b.x);
                var y = Math.min(a.y, b.y);
                var w = Math.abs(b.x - a.x);
                var h = Math.abs(b.y - a.y);
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = stroke.color;
                ctx.beginPath();
                ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                return;
            }
            ctx.beginPath();
            stroke.points.forEach(function (point, index) {
                var d = toDisplay(point);
                if (index === 0) {
                    ctx.moveTo(d.x, d.y);
                }
                else {
                    ctx.lineTo(d.x, d.y);
                }
            });
            ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';
        };
        drawState.strokes.forEach(drawStrokePath);
        if (activeStroke) {
            drawStrokePath(activeStroke);
        }
        drawState.texts.forEach(function (text) {
            var pos = toDisplay({ x: text.x, y: text.y });
            var fontSize = text.fontSize * layout.scale;
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = text.color;
            ctx.font = "".concat(fontSize, "px ").concat(text.fontFamily);
            ctx.textBaseline = 'top';
            ctx.fillText(text.text, pos.x, pos.y);
            if (text.id === selectedTextId) {
                var width = ctx.measureText(text.text).width;
                var height = fontSize * 1.25;
                ctx.strokeStyle = theme.palette.primary.main;
                ctx.lineWidth = 2;
                ctx.strokeRect(pos.x - 2, pos.y - 2, width + 4, height + 4);
            }
        });
    }, [adjustments, activeStroke, canvasView, drawState, naturalSize, selectedTextId, theme.palette.primary.main]);
    useEffect(function () {
        paintCanvas();
    }, [paintCanvas]);
    useEffect(function () {
        var container = containerRef.current;
        if (!container) {
            return;
        }
        var observer = new ResizeObserver(function () { return paintCanvas(); });
        observer.observe(container);
        return function () { return observer.disconnect(); };
    }, [paintCanvas]);
    useEffect(function () {
        var _a;
        var selected = drawState.texts.find(function (t) { return t.id === selectedTextId; });
        setEditingText((_a = selected === null || selected === void 0 ? void 0 : selected.text) !== null && _a !== void 0 ? _a : '');
    }, [selectedTextId, drawState.texts]);
    useEffect(function () {
        var selected = drawState.texts.find(function (t) { return t.id === selectedTextId; });
        if (selected) {
            onTextFontFamilyChange(selected.fontFamily);
            onTextFontSizeChange(selected.fontSize);
        }
    }, [selectedTextId, drawState.texts, onTextFontFamilyChange, onTextFontSizeChange]);
    var commitStroke = function (stroke) {
        onDrawStateChange(__assign(__assign({}, drawState), { strokes: __spreadArray(__spreadArray([], drawState.strokes, true), [stroke], false) }));
    };
    var updateSelectedText = function (patch) {
        if (!selectedTextId) {
            return;
        }
        onDrawStateChange(__assign(__assign({}, drawState), { texts: drawState.texts.map(function (t) { return (t.id === selectedTextId ? __assign(__assign({}, t), patch) : t); }) }));
    };
    var pointerDown = function (e) {
        var _a, _b;
        if (viewInteraction.tryStartPan(e)) {
            return;
        }
        if (!naturalSize.width) {
            return;
        }
        var rect = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var layout = layoutRef.current;
        if (!rect || !layout) {
            return;
        }
        var displayX = e.clientX - rect.left;
        var displayY = e.clientY - rect.top;
        var ctx = (_b = canvasRef.current) === null || _b === void 0 ? void 0 : _b.getContext('2d');
        if (ctx) {
            var hit = hitTestText(ctx, layout, displayX, displayY);
            if (hit) {
                var imgPoint = clientToImage(e.clientX, e.clientY, rect, layout);
                if (!imgPoint) {
                    return;
                }
                setSelectedTextId(hit.id);
                dragTextRef.current = {
                    id: hit.id,
                    offsetX: hit.x - imgPoint.x,
                    offsetY: hit.y - imgPoint.y
                };
                e.target.setPointerCapture(e.pointerId);
                return;
            }
        }
        var point = clientToImage(e.clientX, e.clientY, rect, layout);
        if (!point) {
            setSelectedTextId(null);
            return;
        }
        if (drawTool === 'text') {
            setSelectedTextId(null);
            var annotation = {
                id: newTextId(),
                x: point.x,
                y: point.y,
                text: 'Text',
                color: brushColor,
                fontSize: textFontSize,
                fontFamily: textFontFamily
            };
            onDrawStateChange(__assign(__assign({}, drawState), { texts: __spreadArray(__spreadArray([], drawState.texts, true), [annotation], false) }));
            setSelectedTextId(annotation.id);
            return;
        }
        setSelectedTextId(null);
        if (drawTool === 'line' || drawTool === 'fillRect' || drawTool === 'fillEllipse') {
            setLineStart(point);
            e.target.setPointerCapture(e.pointerId);
            return;
        }
        if (drawTool !== 'brush' && drawTool !== 'eraser') {
            return;
        }
        var stroke = {
            tool: drawTool,
            color: brushColor,
            size: brushSize,
            points: [point]
        };
        setActiveStroke(stroke);
        e.target.setPointerCapture(e.pointerId);
    };
    var pointerMove = function (e) {
        var _a;
        if (viewInteraction.handlePanMove(e)) {
            return;
        }
        var rect = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var layout = layoutRef.current;
        if (!rect || !layout) {
            return;
        }
        if (dragTextRef.current) {
            var point = clientToImage(e.clientX, e.clientY, rect, layout);
            if (!point) {
                return;
            }
            updateSelectedText({
                x: Math.max(0, Math.min(naturalSize.width, point.x + dragTextRef.current.offsetX)),
                y: Math.max(0, Math.min(naturalSize.height, point.y + dragTextRef.current.offsetY))
            });
            return;
        }
        if (activeStroke && drawTool !== 'line' && drawTool !== 'text' && drawTool !== 'fillRect' && drawTool !== 'fillEllipse') {
            var point = clientToImage(e.clientX, e.clientY, rect, layout);
            if (!point) {
                return;
            }
            setActiveStroke(__assign(__assign({}, activeStroke), { points: __spreadArray(__spreadArray([], activeStroke.points, true), [point], false) }));
            return;
        }
        if ((drawTool === 'line' || drawTool === 'fillRect' || drawTool === 'fillEllipse') &&
            lineStart) {
            var point = clientToImage(e.clientX, e.clientY, rect, layout);
            if (!point) {
                return;
            }
            setActiveStroke({
                tool: drawTool,
                color: brushColor,
                size: drawTool === 'line' ? brushSize : 0,
                points: [lineStart, point]
            });
        }
    };
    var pointerUp = function (e) {
        var _a, _b;
        viewInteraction.endPan();
        dragTextRef.current = null;
        if (activeStroke && activeStroke.points.length > 0 && drawTool !== 'line' && drawTool !== 'fillRect' && drawTool !== 'fillEllipse') {
            commitStroke(activeStroke);
            setActiveStroke(null);
            return;
        }
        if (drawTool === 'line' && lineStart) {
            var rect = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            var layout = layoutRef.current;
            if (rect && layout) {
                var end = clientToImage(e.clientX, e.clientY, rect, layout);
                if (end) {
                    commitStroke({
                        tool: 'line',
                        color: brushColor,
                        size: brushSize,
                        points: [lineStart, end]
                    });
                }
            }
            setLineStart(null);
            setActiveStroke(null);
        }
        if ((drawTool === 'fillRect' || drawTool === 'fillEllipse') && lineStart) {
            var rect = (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            var layout = layoutRef.current;
            if (rect && layout) {
                var end = clientToImage(e.clientX, e.clientY, rect, layout);
                if (end) {
                    commitStroke({
                        tool: drawTool,
                        color: brushColor,
                        size: 0,
                        points: [lineStart, end]
                    });
                }
            }
            setLineStart(null);
            setActiveStroke(null);
        }
    };
    var selectedText = drawState.texts.find(function (t) { return t.id === selectedTextId; });
    var showTextControls = drawTool === 'text' || selectedTextId;
    var activeFontFamily = (_b = selectedText === null || selectedText === void 0 ? void 0 : selectedText.fontFamily) !== null && _b !== void 0 ? _b : textFontFamily;
    var activeFontSize = (_c = selectedText === null || selectedText === void 0 ? void 0 : selectedText.fontSize) !== null && _c !== void 0 ? _c : textFontSize;
    var setActiveFontFamily = function (family) {
        if (selectedTextId) {
            updateSelectedText({ fontFamily: family });
        }
        else {
            onTextFontFamilyChange(family);
        }
    };
    var setActiveFontSize = function (size) {
        var clamped = Math.max(8, Math.min(200, Math.round(size)));
        if (selectedTextId) {
            updateSelectedText({ fontSize: clamped });
        }
        else {
            onTextFontSizeChange(clamped);
        }
    };
    var undo = function () {
        if (drawState.texts.length) {
            onDrawStateChange(__assign(__assign({}, drawState), { texts: drawState.texts.slice(0, -1) }));
            setSelectedTextId(null);
            return;
        }
        if (drawState.strokes.length) {
            onDrawStateChange(__assign(__assign({}, drawState), { strokes: drawState.strokes.slice(0, -1) }));
        }
    };
    var drawCursor = (_d = viewInteraction.panCursor) !== null && _d !== void 0 ? _d : (drawTool === 'text' ? 'text' : 'crosshair');
    return (jsxs(Box$1, { sx: { display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minHeight: 0 }, children: [jsxs(Paper, { elevation: 0, variant: "outlined", sx: { p: 1.25, borderRadius: 2 }, children: [jsx(ImageCanvasZoomBar, { view: canvasView, onViewChange: onCanvasViewChange, compact: true }), jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", flexWrap: "wrap", useFlexGap: true, sx: { mt: 1 }, children: [jsxs(ToggleButtonGroup, { size: "small", value: drawTool, exclusive: true, onChange: function (_, val) { return val && onDrawToolChange(val); }, children: [jsx(ToggleButton, { value: "brush", children: jsx(Tooltip, { title: "Brush", children: jsx(BrushRoundedIcon, { fontSize: "small" }) }) }), jsx(ToggleButton, { value: "eraser", children: jsx(Tooltip, { title: "Eraser", children: jsx(AutoFixOffRoundedIcon, { fontSize: "small" }) }) }), jsx(ToggleButton, { value: "line", children: jsx(Tooltip, { title: "Line", children: jsx(ShowChartRoundedIcon, { fontSize: "small" }) }) }), jsx(ToggleButton, { value: "text", children: jsx(Tooltip, { title: "Add text", children: jsx(TextFieldsRoundedIcon, { fontSize: "small" }) }) }), jsx(ToggleButton, { value: "fillRect", children: jsx(Tooltip, { title: "Filled rectangle", children: jsx(CropSquareRoundedIcon, { fontSize: "small" }) }) }), jsx(ToggleButton, { value: "fillEllipse", children: jsx(Tooltip, { title: "Filled circle", children: jsx(CircleOutlinedIcon, { fontSize: "small" }) }) })] }), jsx(Box$1, { sx: { display: 'flex', gap: 0.5 }, children: BRUSH_COLORS.map(function (color) { return (jsx(IconButton$1, { size: "small", onClick: function () {
                                        onBrushColorChange(color);
                                        if (selectedTextId) {
                                            updateSelectedText({ color: color });
                                        }
                                    }, sx: {
                                        width: 24,
                                        height: 24,
                                        bgcolor: color,
                                        border: brushColor === color ? "2px solid ".concat(theme.palette.primary.main) : '1px solid',
                                        borderColor: brushColor === color ? 'primary.main' : 'divider'
                                    } }, color)); }) }), jsxs(Box$1, { sx: { minWidth: 120, flex: 1, maxWidth: 160 }, children: [jsxs(Typography, { variant: "caption", color: "text.secondary", children: [drawTool === 'text' || drawTool === 'fillRect' || drawTool === 'fillEllipse' ? 'Stroke' : 'Brush', " size"] }), jsx(Slider, { size: "small", min: 2, max: 48, value: brushSize, onChange: function (_, v) { return onBrushSizeChange(v); }, disabled: drawTool === 'text' || drawTool === 'fillRect' || drawTool === 'fillEllipse' })] }), jsx(Button$1, { size: "small", startIcon: jsx(UndoRoundedIcon, {}), onClick: undo, disabled: !drawState.strokes.length && !drawState.texts.length, children: "Undo" })] }), showTextControls && (jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", flexWrap: "wrap", useFlexGap: true, sx: { mt: 1 }, children: [jsxs(FormControl, { size: "small", sx: { minWidth: 150 }, children: [jsx(InputLabel, { children: "Font" }), jsx(Select, { label: "Font", value: activeFontFamily, onChange: function (e) { return setActiveFontFamily(e.target.value); }, children: TEXT_FONT_OPTIONS.map(function (opt) { return (jsx(MenuItem$1, { value: opt.value, sx: { fontFamily: opt.value }, children: opt.label }, opt.value)); }) })] }), jsxs(Box$1, { sx: { minWidth: 120, flex: 1, maxWidth: 200 }, children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Text size (px)" }), jsx(Slider, { size: "small", min: 8, max: 120, value: activeFontSize, onChange: function (_, v) { return setActiveFontSize(v); } })] }), jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, minWidth: 48 }, children: [activeFontSize, "px"] }), jsx(TextField$1, { size: "small", label: "Size", type: "number", value: activeFontSize, onChange: function (e) {
                                    var n = Number(e.target.value);
                                    if (Number.isFinite(n)) {
                                        setActiveFontSize(n);
                                    }
                                }, inputProps: { min: 8, max: 200, step: 1 }, sx: { width: 88 } })] })), selectedTextId && (jsxs(Stack, { direction: "row", spacing: 1, sx: { mt: 1 }, alignItems: "center", children: [jsx(TextField$1, { size: "small", fullWidth: true, label: "Text content", value: editingText, onChange: function (e) {
                                    setEditingText(e.target.value);
                                    updateSelectedText({ text: e.target.value });
                                } }), jsx(Typography, { variant: "caption", color: "text.secondary", children: "Drag to move" })] }))] }), jsx(Paper, { ref: containerRef, elevation: 0, onWheel: viewInteraction.handleWheel, sx: {
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#141414',
                    border: "1px solid ".concat(alpha(theme.palette.common.white, 0.08)),
                    touchAction: 'none'
                }, children: jsx("canvas", { ref: canvasRef, style: {
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        cursor: drawCursor
                    }, onPointerDown: pointerDown, onPointerMove: pointerMove, onPointerUp: pointerUp, onPointerLeave: pointerUp }) })] }));
}

var HANDLE_SIZE = 10;
function hitHandle(px, py, crop, layout) {
    var tl = imageToDisplay(crop.x, crop.y, layout);
    var br = imageToDisplay(crop.x + crop.width, crop.y + crop.height, layout);
    var cx = (tl.x + br.x) / 2;
    var cy = (tl.y + br.y) / 2;
    var hs = HANDLE_SIZE;
    var checks = [
        { id: 'nw', x: tl.x, y: tl.y },
        { id: 'n', x: cx, y: tl.y },
        { id: 'ne', x: br.x, y: tl.y },
        { id: 'e', x: br.x, y: cy },
        { id: 'se', x: br.x, y: br.y },
        { id: 's', x: cx, y: br.y },
        { id: 'sw', x: tl.x, y: br.y },
        { id: 'w', x: tl.x, y: cy }
    ];
    for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
        var check = checks_1[_i];
        if (Math.abs(px - check.x) <= hs && Math.abs(py - check.y) <= hs) {
            return check.id;
        }
    }
    if (px >= tl.x && px <= br.x && py >= tl.y && py <= br.y) {
        return 'move';
    }
    return null;
}
function resizeCrop(crop, handle, pointer, startCrop, startPointer, imageWidth, imageHeight, aspect) {
    var dx = pointer.x - startPointer.x;
    var dy = pointer.y - startPointer.y;
    var x = startCrop.x, y = startCrop.y, width = startCrop.width, height = startCrop.height;
    if (handle === 'move') {
        x = startCrop.x + dx;
        y = startCrop.y + dy;
        return clampCropArea({ x: x, y: y, width: width, height: height }, imageWidth, imageHeight);
    }
    if (handle.includes('e')) {
        width = startCrop.width + dx;
    }
    if (handle.includes('w')) {
        width = startCrop.width - dx;
        x = startCrop.x + dx;
    }
    if (handle.includes('s')) {
        height = startCrop.height + dy;
    }
    if (handle.includes('n')) {
        height = startCrop.height - dy;
        y = startCrop.y + dy;
    }
    if (aspect) {
        if (handle === 'e' || handle === 'w' || handle === 'ne' || handle === 'nw' || handle === 'se' || handle === 'sw') {
            height = width / aspect;
            if (handle.includes('n')) {
                y = startCrop.y + startCrop.height - height;
            }
        }
        else {
            width = height * aspect;
            if (handle.includes('w')) {
                x = startCrop.x + startCrop.width - width;
            }
        }
    }
    return clampCropArea({ x: x, y: y, width: width, height: height }, imageWidth, imageHeight);
}
function ImageStudioCropCanvas(_a) {
    var _b;
    var imageSrc = _a.imageSrc, cropArea = _a.cropArea, onCropAreaChange = _a.onCropAreaChange, aspect = _a.aspect, onAspectChange = _a.onAspectChange, canvasView = _a.canvasView, onCanvasViewChange = _a.onCanvasViewChange, onApplyCrop = _a.onApplyCrop, _c = _a.applyingCrop, applyingCrop = _c === void 0 ? false : _c;
    var theme = useTheme();
    var containerRef = useRef(null);
    var canvasRef = useRef(null);
    var imageRef = useRef(null);
    var _d = useState({ width: 0, height: 0 }), naturalSize = _d[0], setNaturalSize = _d[1];
    var dragRef = useRef(null);
    var _e = useState(''), cropWidthInput = _e[0], setCropWidthInput = _e[1];
    var _f = useState(''), cropHeightInput = _f[0], setCropHeightInput = _f[1];
    var viewInteraction = useImageCanvasView(containerRef, naturalSize, canvasView, onCanvasViewChange);
    useEffect(function () {
        var cancelled = false;
        createImage(imageSrc)
            .then(function (img) {
            if (!cancelled) {
                imageRef.current = img;
                setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
                if (!cropArea) {
                    onCropAreaChange(fullImageCrop(img.naturalWidth, img.naturalHeight));
                }
            }
        })
            .catch(function (error) {
            if (!cancelled) {
                console.error('Failed to load image for crop canvas:', error);
            }
        });
        return function () {
            cancelled = true;
        };
    }, [imageSrc]);
    useEffect(function () {
        if (cropArea) {
            setCropWidthInput(String(cropArea.width));
            setCropHeightInput(String(cropArea.height));
        }
    }, [cropArea === null || cropArea === void 0 ? void 0 : cropArea.width, cropArea === null || cropArea === void 0 ? void 0 : cropArea.height, cropArea === null || cropArea === void 0 ? void 0 : cropArea.x, cropArea === null || cropArea === void 0 ? void 0 : cropArea.y]);
    var paint = useCallback(function () {
        var canvas = canvasRef.current;
        var container = containerRef.current;
        var img = imageRef.current;
        if (!canvas || !container || !img || !naturalSize.width || !cropArea) {
            return;
        }
        var rect = container.getBoundingClientRect();
        var cw = Math.max(1, Math.floor(rect.width));
        var ch = Math.max(1, Math.floor(rect.height));
        canvas.width = cw;
        canvas.height = ch;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        var layout = computeImageLayout(cw, ch, naturalSize.width, naturalSize.height, canvasView);
        var tl = imageToDisplay(cropArea.x, cropArea.y, layout);
        var br = imageToDisplay(cropArea.x + cropArea.width, cropArea.y + cropArea.height, layout);
        ctx.fillStyle = '#141414';
        ctx.fillRect(0, 0, cw, ch);
        var drawW = naturalSize.width * layout.scale;
        var drawH = naturalSize.height * layout.scale;
        ctx.drawImage(img, layout.offsetX, layout.offsetY, drawW, drawH);
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.beginPath();
        ctx.rect(0, 0, cw, ch);
        ctx.rect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
        ctx.fill('evenodd');
        ctx.restore();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 2;
        ctx.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#007aff';
        ctx.lineWidth = 1;
        var handles = [
            [tl.x, tl.y],
            [(tl.x + br.x) / 2, tl.y],
            [br.x, tl.y],
            [br.x, (tl.y + br.y) / 2],
            [br.x, br.y],
            [(tl.x + br.x) / 2, br.y],
            [tl.x, br.y],
            [tl.x, (tl.y + br.y) / 2]
        ];
        handles.forEach(function (_a) {
            var hx = _a[0], hy = _a[1];
            ctx.fillRect(hx - HANDLE_SIZE / 2, hy - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
            ctx.strokeRect(hx - HANDLE_SIZE / 2, hy - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
        });
    }, [cropArea, naturalSize, canvasView]);
    useEffect(function () {
        paint();
    }, [paint]);
    useEffect(function () {
        var container = containerRef.current;
        if (!container) {
            return;
        }
        var observer = new ResizeObserver(function () { return paint(); });
        observer.observe(container);
        return function () { return observer.disconnect(); };
    }, [paint]);
    var onPointerDown = function (e) {
        var _a;
        if (viewInteraction.tryStartPan(e)) {
            return;
        }
        if (!cropArea || !naturalSize.width) {
            return;
        }
        var rect = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (!rect) {
            return;
        }
        var layout = computeImageLayout(rect.width, rect.height, naturalSize.width, naturalSize.height, canvasView);
        var displayX = e.clientX - rect.left;
        var displayY = e.clientY - rect.top;
        var handle = hitHandle(displayX, displayY, cropArea, layout);
        if (!handle) {
            return;
        }
        var pointer = clientToImage(e.clientX, e.clientY, rect, layout, false);
        if (!pointer) {
            return;
        }
        dragRef.current = { handle: handle, startCrop: cropArea, startPointer: pointer };
        e.target.setPointerCapture(e.pointerId);
    };
    var onPointerMove = function (e) {
        var _a;
        if (viewInteraction.handlePanMove(e)) {
            return;
        }
        var drag = dragRef.current;
        if (!drag || !naturalSize.width) {
            return;
        }
        var rect = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (!rect) {
            return;
        }
        var layout = computeImageLayout(rect.width, rect.height, naturalSize.width, naturalSize.height, canvasView);
        var pointer = clientToImage(e.clientX, e.clientY, rect, layout, false);
        if (!pointer) {
            return;
        }
        var next = resizeCrop(cropArea, drag.handle, pointer, drag.startCrop, drag.startPointer, naturalSize.width, naturalSize.height, aspect);
        onCropAreaChange(cropAreaWithAspect(next, aspect, naturalSize.width, naturalSize.height));
    };
    var onPointerUp = function () {
        viewInteraction.endPan();
        dragRef.current = null;
    };
    var applyDimensionInputs = function () {
        if (!cropArea || !naturalSize.width) {
            return;
        }
        var w = Number(cropWidthInput);
        var h = Number(cropHeightInput);
        if (!Number.isFinite(w) || !Number.isFinite(h) || w < 8 || h < 8) {
            return;
        }
        onCropAreaChange(resizeCropToDimensions(cropArea, w, h, naturalSize.width, naturalSize.height, aspect));
    };
    return (jsxs(Box$1, { sx: { display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minHeight: 0 }, children: [jsx(Paper, { elevation: 0, variant: "outlined", sx: { p: 1.25, borderRadius: 2 }, children: jsxs(Stack, { spacing: 1, children: [jsx(ImageCanvasZoomBar, { view: canvasView, onViewChange: onCanvasViewChange, compact: true }), jsxs(Stack, { direction: "row", spacing: 2, alignItems: "center", flexWrap: "wrap", useFlexGap: true, children: [jsx(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600 }, children: "Aspect" }), jsx(ToggleButtonGroup, { size: "small", value: aspect !== null && aspect !== void 0 ? aspect : 'free', exclusive: true, onChange: function (_, val) {
                                        if (val === null || !cropArea || !naturalSize.width)
                                            return;
                                        var nextAspect = val === 'free' ? undefined : Number(val);
                                        onAspectChange(nextAspect);
                                        if (nextAspect) {
                                            onCropAreaChange(cropAreaWithAspect(cropArea, nextAspect, naturalSize.width, naturalSize.height));
                                        }
                                    }, children: ASPECT_PRESETS.map(function (preset) {
                                        var _a;
                                        return (jsx(ToggleButton, { value: (_a = preset.value) !== null && _a !== void 0 ? _a : 'free', children: preset.label }, preset.label));
                                    }) }), jsx(TextField$1, { size: "small", label: "W (px)", type: "number", value: cropWidthInput, onChange: function (e) { return setCropWidthInput(e.target.value); }, onKeyDown: function (e) { return e.key === 'Enter' && applyDimensionInputs(); }, sx: { width: 100 } }), jsx(TextField$1, { size: "small", label: "H (px)", type: "number", value: cropHeightInput, onChange: function (e) { return setCropHeightInput(e.target.value); }, onKeyDown: function (e) { return e.key === 'Enter' && applyDimensionInputs(); }, sx: { width: 100 } }), jsx(Button$1, { size: "small", variant: "outlined", onClick: applyDimensionInputs, disabled: !cropArea, children: "Set size" }), onApplyCrop && (jsx(Button$1, { size: "small", variant: "contained", startIcon: jsx(CheckRoundedIcon, {}), onClick: onApplyCrop, disabled: !cropArea || applyingCrop, children: applyingCrop ? 'Applying…' : 'Apply crop' }))] }), jsxs(Typography, { variant: "caption", color: "text.secondary", children: ["Drag handles to adjust the crop, then click ", jsx("strong", { children: "Apply crop" }), " to lock it in before filters or save."] })] }) }), jsx(Paper, { ref: containerRef, elevation: 0, onWheel: viewInteraction.handleWheel, sx: {
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#141414',
                    border: "1px solid ".concat(alpha(theme.palette.common.white, 0.08)),
                    touchAction: 'none'
                }, children: jsx("canvas", { ref: canvasRef, style: {
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        cursor: (_b = viewInteraction.panCursor) !== null && _b !== void 0 ? _b : 'crosshair'
                    }, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, onPointerLeave: onPointerUp }) })] }));
}

function ImageStudioEditor(_a) {
    var _b, _c;
    var imageSrc = _a.imageSrc, tool = _a.tool, adjustments = _a.adjustments, onAdjustmentsChange = _a.onAdjustmentsChange, focal = _a.focal, onFocalChange = _a.onFocalChange, croppedAreaPixels = _a.croppedAreaPixels, onCroppedAreaPixelsChange = _a.onCroppedAreaPixelsChange, aspect = _a.aspect, onAspectChange = _a.onAspectChange, outputWidth = _a.outputWidth, outputHeight = _a.outputHeight, onOutputWidthChange = _a.onOutputWidthChange, onOutputHeightChange = _a.onOutputHeightChange, lockOutputAspect = _a.lockOutputAspect, onLockOutputAspectChange = _a.onLockOutputAspectChange, outputBackground = _a.outputBackground, onOutputBackgroundChange = _a.onOutputBackgroundChange, onReset = _a.onReset, filterPresetId = _a.filterPresetId, onSelectFilterPreset = _a.onSelectFilterPreset, onTintChange = _a.onTintChange, drawState = _a.drawState, onDrawStateChange = _a.onDrawStateChange, drawTool = _a.drawTool, onDrawToolChange = _a.onDrawToolChange, brushColor = _a.brushColor, onBrushColorChange = _a.onBrushColorChange, brushSize = _a.brushSize, onBrushSizeChange = _a.onBrushSizeChange, textFontFamily = _a.textFontFamily, onTextFontFamilyChange = _a.onTextFontFamilyChange, textFontSize = _a.textFontSize, onTextFontSizeChange = _a.onTextFontSizeChange, canvasView = _a.canvasView, onCanvasViewChange = _a.onCanvasViewChange, onApplyCrop = _a.onApplyCrop, applyingCrop = _a.applyingCrop;
    var theme = useTheme();
    var _d = useState({ width: 0, height: 0 }), naturalSize = _d[0], setNaturalSize = _d[1];
    useEffect(function () {
        var img = new Image();
        img.onload = function () { return setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight }); };
        img.src = imageSrc;
    }, [imageSrc]);
    var focalPreviews = useMemo(function () {
        if (!naturalSize.width || !naturalSize.height) {
            return [];
        }
        return FOCAL_PREVIEW_RATIOS.map(function (preset) { return (__assign(__assign({}, preset), { area: focalCropArea(naturalSize.width, naturalSize.height, focal, preset.ratio) })); });
    }, [naturalSize, focal]);
    var handleFocalClick = function (e) {
        var rect = e.currentTarget.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        onFocalChange(clampFocal({ x: x, y: y }));
    };
    var rotate = function (delta) {
        onAdjustmentsChange(__assign(__assign({}, adjustments), { rotation: (adjustments.rotation + delta) % 360 }));
    };
    var canvasBg = '#141414';
    var showSidePanel = tool === 'adjust' || tool === 'resize';
    var previewFilter = buildCssFilter(adjustments);
    var cropW = (_b = croppedAreaPixels === null || croppedAreaPixels === void 0 ? void 0 : croppedAreaPixels.width) !== null && _b !== void 0 ? _b : naturalSize.width;
    var cropH = (_c = croppedAreaPixels === null || croppedAreaPixels === void 0 ? void 0 : croppedAreaPixels.height) !== null && _c !== void 0 ? _c : naturalSize.height;
    var outW = outputWidth === '' ? 0 : Number(outputWidth);
    var outH = outputHeight === '' ? 0 : Number(outputHeight);
    var outputSizeDiffers = outW > 0 && outH > 0 && cropW > 0 && cropH > 0 && (outW !== cropW || outH !== cropH);
    if (tool === 'filters') {
        return (jsx(Box$1, { sx: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }, children: jsx(ImageStudioFiltersPanel, { imageSrc: imageSrc, activePresetId: filterPresetId, adjustments: adjustments, onSelectPreset: onSelectFilterPreset, onTintChange: onTintChange }) }));
    }
    if (tool === 'crop') {
        return (jsx(Box$1, { sx: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }, children: jsx(ImageStudioCropCanvas, { imageSrc: imageSrc, cropArea: croppedAreaPixels, onCropAreaChange: onCroppedAreaPixelsChange, aspect: aspect, onAspectChange: onAspectChange, canvasView: canvasView, onCanvasViewChange: onCanvasViewChange, onApplyCrop: onApplyCrop, applyingCrop: applyingCrop }) }));
    }
    if (tool === 'draw') {
        return (jsx(Box$1, { sx: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }, children: jsx(ImageStudioDrawCanvas, { imageSrc: imageSrc, adjustments: adjustments, drawState: drawState, onDrawStateChange: onDrawStateChange, drawTool: drawTool, onDrawToolChange: onDrawToolChange, brushColor: brushColor, onBrushColorChange: onBrushColorChange, brushSize: brushSize, onBrushSizeChange: onBrushSizeChange, textFontFamily: textFontFamily, onTextFontFamilyChange: onTextFontFamilyChange, textFontSize: textFontSize, onTextFontSizeChange: onTextFontSizeChange, canvasView: canvasView, onCanvasViewChange: onCanvasViewChange }) }));
    }
    return (jsxs(Box$1, { sx: { display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minHeight: 0 }, children: [jsxs(Box$1, { sx: { display: 'flex', gap: 2, flex: 1, minHeight: 0, minWidth: 0 }, children: [jsxs(Paper, { elevation: 0, sx: {
                            flex: 1,
                            position: 'relative',
                            minHeight: 0,
                            borderRadius: 2,
                            overflow: 'hidden',
                            bgcolor: canvasBg,
                            border: "1px solid ".concat(alpha(theme.palette.common.white, 0.08))
                        }, children: [tool === 'focal' && (jsx(Box$1, { sx: {
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 2
                                }, children: jsxs(Box$1, { onClick: handleFocalClick, sx: {
                                        position: 'relative',
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        cursor: 'crosshair',
                                        userSelect: 'none',
                                        borderRadius: 1,
                                        overflow: 'hidden'
                                    }, children: [jsx("img", { src: imageSrc, alt: "Focal point", style: {
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                display: 'block',
                                                filter: previewFilter
                                            } }), jsx(Box$1, { sx: {
                                                position: 'absolute',
                                                left: "".concat(focal.x, "%"),
                                                top: "".concat(focal.y, "%"),
                                                width: 22,
                                                height: 22,
                                                borderRadius: '50%',
                                                border: '2px solid #fff',
                                                boxShadow: '0 0 0 2px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
                                                transform: 'translate(-50%, -50%)',
                                                pointerEvents: 'none'
                                            } })] }) })), (tool === 'adjust' || tool === 'resize') && (jsx(Box$1, { sx: {
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 2
                                }, children: jsx("img", { src: imageSrc, alt: "Preview", style: {
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        borderRadius: 4,
                                        transform: "rotate(".concat(adjustments.rotation, "deg) scaleX(").concat(adjustments.flipHorizontal ? -1 : 1, ") scaleY(").concat(adjustments.flipVertical ? -1 : 1, ")"),
                                        filter: previewFilter
                                    } }) }))] }), showSidePanel && (jsxs(Paper, { elevation: 0, variant: "outlined", sx: {
                            width: { xs: '100%', md: 280 },
                            flexShrink: 0,
                            p: 2,
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            minHeight: 0,
                            overflowY: 'auto'
                        }, children: [tool === 'adjust' && (jsxs(Fragment, { children: [jsx(Typography, { variant: "subtitle2", sx: { fontWeight: 600 }, children: "Adjustments" }), jsxs(Box$1, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Brightness" }), jsx(Slider, { size: "small", min: 50, max: 150, value: adjustments.brightness, onChange: function (_, v) { return onAdjustmentsChange(__assign(__assign({}, adjustments), { brightness: v })); } })] }), jsxs(Box$1, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Contrast" }), jsx(Slider, { size: "small", min: 50, max: 150, value: adjustments.contrast, onChange: function (_, v) { return onAdjustmentsChange(__assign(__assign({}, adjustments), { contrast: v })); } })] }), jsxs(Box$1, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Saturation" }), jsx(Slider, { size: "small", min: 0, max: 200, value: adjustments.saturation, onChange: function (_, v) { return onAdjustmentsChange(__assign(__assign({}, adjustments), { saturation: v })); } })] }), jsxs(Box$1, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Hue" }), jsx(Slider, { size: "small", min: -90, max: 90, value: adjustments.hueRotate, onChange: function (_, v) { return onAdjustmentsChange(__assign(__assign({}, adjustments), { hueRotate: v })); } })] }), jsxs(Box$1, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Vignette" }), jsx(Slider, { size: "small", min: 0, max: 100, value: adjustments.vignette, onChange: function (_, v) { return onAdjustmentsChange(__assign(__assign({}, adjustments), { vignette: v })); } })] }), jsxs(Box$1, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", children: "Blur" }), jsx(Slider, { size: "small", min: 0, max: 8, step: 0.5, value: adjustments.blur, onChange: function (_, v) { return onAdjustmentsChange(__assign(__assign({}, adjustments), { blur: v })); } })] })] })), tool === 'resize' && (jsxs(Fragment, { children: [jsx(Typography, { variant: "subtitle2", sx: { fontWeight: 600 }, children: "Output size" }), jsx(TextField$1, { size: "small", fullWidth: true, label: "Width (px)", type: "number", value: outputWidth, onChange: function (e) {
                                            var val = e.target.value === '' ? '' : Number(e.target.value);
                                            onOutputWidthChange(val);
                                            if (lockOutputAspect && val && croppedAreaPixels) {
                                                var ratio = croppedAreaPixels.height / croppedAreaPixels.width;
                                                onOutputHeightChange(Math.round(Number(val) * ratio));
                                            }
                                        } }), jsx(TextField$1, { size: "small", fullWidth: true, label: "Height (px)", type: "number", value: outputHeight, onChange: function (e) {
                                            var val = e.target.value === '' ? '' : Number(e.target.value);
                                            onOutputHeightChange(val);
                                            if (lockOutputAspect && val && croppedAreaPixels) {
                                                var ratio = croppedAreaPixels.width / croppedAreaPixels.height;
                                                onOutputWidthChange(Math.round(Number(val) * ratio));
                                            }
                                        } }), jsx(FormControlLabel, { control: jsx(Switch, { size: "small", checked: lockOutputAspect, onChange: function (e) { return onLockOutputAspectChange(e.target.checked); } }), label: "Lock aspect ratio" }), croppedAreaPixels && (jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Crop area: ", croppedAreaPixels.width, " \u00D7 ", croppedAreaPixels.height, "px"] })), outputSizeDiffers && (jsxs(Box$1, { sx: { mt: 1 }, children: [jsx(Typography, { variant: "caption", color: "text.secondary", display: "block", sx: { mb: 1 }, children: "Image is scaled to fit and centered. Extra canvas area uses the background below." }), jsxs(ToggleButtonGroup, { size: "small", exclusive: true, value: outputBackground.mode, onChange: function (_, val) {
                                                    if (val) {
                                                        onOutputBackgroundChange(__assign(__assign({}, outputBackground), { mode: val }));
                                                    }
                                                }, children: [jsx(ToggleButton, { value: "transparent", children: "Transparent" }), jsx(ToggleButton, { value: "color", children: "Color" })] }), outputBackground.mode === 'color' && (jsxs(Stack, { direction: "row", spacing: 0.5, sx: { mt: 1 }, flexWrap: "wrap", useFlexGap: true, children: [OUTPUT_BACKGROUND_SWATCHES.map(function (color) { return (jsx(IconButton$1, { size: "small", onClick: function () { return onOutputBackgroundChange(__assign(__assign({}, outputBackground), { color: color })); }, sx: {
                                                            width: 28,
                                                            height: 28,
                                                            bgcolor: color,
                                                            border: outputBackground.color === color ? "2px solid ".concat(theme.palette.primary.main) : '1px solid',
                                                            borderColor: outputBackground.color === color ? 'primary.main' : 'divider'
                                                        } }, color)); }), jsx(TextField$1, { size: "small", label: "Custom", value: outputBackground.color, onChange: function (e) {
                                                            return onOutputBackgroundChange(__assign(__assign({}, outputBackground), { color: e.target.value }));
                                                        }, sx: { width: 100 } })] }))] }))] }))] }))] }), tool === 'focal' && (jsxs(Paper, { elevation: 0, variant: "outlined", sx: { p: 2, borderRadius: 2 }, children: [jsx(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, display: 'block', mb: 1.5 }, children: "Crop previews at focal point" }), jsx(Box$1, { sx: { display: 'flex', gap: 1.5, overflowX: 'auto', pb: 0.5 }, children: focalPreviews.map(function (preview) { return (jsxs(Box$1, { sx: { flexShrink: 0, width: 120 }, children: [jsx(Typography, { variant: "caption", display: "block", sx: { mb: 0.5 }, children: preview.label }), jsx(Box$1, { sx: {
                                        position: 'relative',
                                        width: 120,
                                        aspectRatio: "".concat(preview.ratio),
                                        overflow: 'hidden',
                                        bgcolor: canvasBg,
                                        borderRadius: 1.5,
                                        border: "1px solid ".concat(theme.palette.divider)
                                    }, children: jsx("img", { src: imageSrc, alt: preview.label, style: {
                                            position: 'absolute',
                                            width: "".concat((naturalSize.width / preview.area.width) * 100, "%"),
                                            height: "".concat((naturalSize.height / preview.area.height) * 100, "%"),
                                            left: "".concat(-(preview.area.x / preview.area.width) * 100, "%"),
                                            top: "".concat(-(preview.area.y / preview.area.height) * 100, "%"),
                                            maxWidth: 'none'
                                        } }) })] }, preview.label)); }) })] })), jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", flexWrap: "wrap", useFlexGap: true, sx: {
                    pt: 0.5,
                    borderTop: 1,
                    borderColor: 'divider'
                }, children: [jsxs(ButtonGroup, { size: "small", variant: "outlined", sx: { borderRadius: 2 }, children: [jsx(Button$1, { onClick: function () { return rotate(-90); }, title: "Rotate left", children: jsx(RotateLeftRoundedIcon, { fontSize: "small" }) }), jsx(Button$1, { onClick: function () { return rotate(90); }, title: "Rotate right", children: jsx(RotateRightRoundedIcon, { fontSize: "small" }) }), jsx(Button$1, { onClick: function () { return onAdjustmentsChange(__assign(__assign({}, adjustments), { flipHorizontal: !adjustments.flipHorizontal })); }, title: "Flip horizontal", children: jsx(FlipRoundedIcon, { fontSize: "small" }) })] }), jsx(Button$1, { size: "small", variant: "text", startIcon: jsx(RestartAltRoundedIcon, {}), onClick: onReset, children: "Reset edits" }), naturalSize.width > 0 && (jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { ml: 'auto' }, children: ["Source: ", naturalSize.width, " \u00D7 ", naturalSize.height, "px"] }))] })] }));
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

function useContentTypes() {
  const dispatch = useDispatch();
  const site = useActiveSiteId();
  const { byId, isFetching } = useSelection((state) => state.contentTypes);
  useEffect(() => {
    if (!byId && site && isFetching === null) {
      dispatch(fetchContentTypes());
    }
  }, [dispatch, site, byId, isFetching]);
  return byId;
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */
function labelFromFormPath(formPath) {
    var relative = formPath
        .replace('/config/studio/content-types/', '')
        .replace('/form-definition.xml', '');
    var parts = relative.split('/').filter(Boolean);
    if (parts.length >= 2) {
        var category = parts[0];
        var name_1 = parts.slice(1).join(' / ');
        var categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
        return "".concat(name_1, " (").concat(categoryLabel, ")");
    }
    return relative;
}
function parseImagePickerFieldsFromXml(xml) {
    var results = [];
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, 'text/xml');
    doc.querySelectorAll('field').forEach(function (field) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var type = (_b = (_a = field.querySelector('type')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
        if (type !== 'image-picker') {
            return;
        }
        var fieldId = (_e = (_d = (_c = field.querySelector('id')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) !== null && _e !== void 0 ? _e : '';
        var fieldTitle = (_h = (_g = (_f = field.querySelector('title')) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.trim()) !== null && _h !== void 0 ? _h : fieldId;
        if (fieldId) {
            results.push({ fieldId: fieldId, fieldTitle: fieldTitle });
        }
    });
    return results;
}
function contentTypeToFormPath(contentType) {
    var normalized = contentType.replace(/^\//, '');
    return "/config/studio/content-types/".concat(normalized, "/form-definition.xml");
}
function loadImagePickerFieldsForContent(siteId, contentPath) {
    return __awaiter(this, void 0, void 0, function () {
        var xml, parser, doc, contentType, objectId, formPath, formXml, fields;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, fetchContentXML(siteId, contentPath).pipe(take(1)).toPromise()];
                case 1:
                    xml = _g.sent();
                    if (!xml) {
                        return [2 /*return*/, { objectId: '', contentType: '', fields: [] }];
                    }
                    parser = new DOMParser();
                    doc = parser.parseFromString(xml, 'text/xml');
                    contentType = (_c = (_b = (_a = doc.querySelector('content-type')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '';
                    objectId = (_f = (_e = (_d = doc.querySelector('objectId')) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : '';
                    formPath = contentTypeToFormPath(contentType);
                    return [4 /*yield*/, fetchContentXML(siteId, formPath).pipe(take(1)).toPromise()];
                case 2:
                    formXml = _g.sent();
                    fields = formXml ? parseImagePickerFieldsFromXml(formXml) : [];
                    return [2 /*return*/, { objectId: objectId, contentType: contentType, fields: fields }];
            }
        });
    });
}
function updateContentImageField(siteId, contentPath, objectId, fieldId, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateField(siteId, objectId, fieldId, null, contentPath, imagePath, false).pipe(take(1)).toPromise()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function contentTypeFormOptionsFromCatalog(types) {
    return types
        .map(function (ct) {
        var _a;
        return ({
            formPath: contentTypeToFormPath(ct.id),
            contentType: ct.id,
            label: ((_a = ct.name) === null || _a === void 0 ? void 0 : _a.trim()) || labelFromFormPath(contentTypeToFormPath(ct.id))
        });
    })
        .sort(function (a, b) { return a.label.localeCompare(b.label); });
}
function collectContentTypeFields(fields, acc) {
    if (acc === void 0) { acc = []; }
    if (!fields) {
        return acc;
    }
    Object.values(fields).forEach(function (field) {
        acc.push(field);
        if (field.fields) {
            collectContentTypeFields(field.fields, acc);
        }
    });
    return acc;
}
function dimensionFromValidation(validations, exactKey, minKey, maxKey) {
    var _a, _b, _c;
    var exactVal = (_a = validations[exactKey]) === null || _a === void 0 ? void 0 : _a.value;
    if (exactVal != null && exactVal !== '' && Number.isFinite(Number(exactVal))) {
        return { exact: Number(exactVal) };
    }
    var min = (_b = validations[minKey]) === null || _b === void 0 ? void 0 : _b.value;
    var max = (_c = validations[maxKey]) === null || _c === void 0 ? void 0 : _c.value;
    return {
        min: min != null && min !== '' && Number.isFinite(Number(min)) ? Number(min) : undefined,
        max: max != null && max !== '' && Number.isFinite(Number(max)) ? Number(max) : undefined
    };
}
/** Build image-picker requirements from an in-memory ContentType (no extra API call). */
function parseImageRequirementsFromContentType(contentType) {
    var fields = collectContentTypeFields(contentType.fields);
    var results = [];
    fields.forEach(function (field) {
        if (field.type !== 'image') {
            return;
        }
        var width = dimensionFromValidation(field.validations, 'width', 'minWidth', 'maxWidth');
        var height = dimensionFromValidation(field.validations, 'height', 'minHeight', 'maxHeight');
        results.push({
            contentType: contentType.id,
            contentTypeLabel: contentType.name,
            fieldId: field.id,
            fieldTitle: field.name || field.id,
            widthMin: width.min,
            widthMax: width.max,
            widthExact: width.exact,
            heightMin: height.min,
            heightMax: height.max,
            heightExact: height.exact
        });
    });
    return results.sort(function (a, b) { return a.fieldTitle.localeCompare(b.fieldTitle); });
}

function ImageSizeRequirementsPanel(_a) {
    var _b;
    var currentWidth = _a.currentWidth, currentHeight = _a.currentHeight, _c = _a.active, active = _c === void 0 ? true : _c, appliedFieldId = _a.appliedFieldId, onApplyConstraints = _a.onApplyConstraints;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var contentTypesById = useContentTypes();
    var contentTypesFetching = useSelector(function (state) { var _a; return (_a = state.contentTypes) === null || _a === void 0 ? void 0 : _a.isFetching; });
    var _d = useState(false), loadingTypes = _d[0], setLoadingTypes = _d[1];
    var _e = useState(null), selectedType = _e[0], setSelectedType = _e[1];
    var _f = useState([]), requirements = _f[0], setRequirements = _f[1];
    var _g = useState(''), filter = _g[0], setFilter = _g[1];
    var _h = useState(null), error = _h[0], setError = _h[1];
    var _j = useState(null), selectedFieldId = _j[0], setSelectedFieldId = _j[1];
    useEffect(function () {
        setSelectedFieldId(null);
    }, [selectedType === null || selectedType === void 0 ? void 0 : selectedType.formPath]);
    useEffect(function () {
        if (!siteId || !active) {
            return;
        }
        if (!contentTypesById && contentTypesFetching === null) {
            dispatch(fetchContentTypes());
        }
    }, [siteId, active, contentTypesById, contentTypesFetching, dispatch]);
    var contentTypes = useMemo(function () {
        if (!contentTypesById) {
            return [];
        }
        return contentTypeFormOptionsFromCatalog(Object.values(contentTypesById));
    }, [contentTypesById]);
    useEffect(function () {
        setLoadingTypes(Boolean(active && siteId && !contentTypesById && contentTypesFetching));
    }, [active, siteId, contentTypesById, contentTypesFetching]);
    useEffect(function () {
        if (!selectedType || !contentTypesById) {
            setRequirements([]);
            return;
        }
        var contentType = contentTypesById[selectedType.contentType];
        if (!contentType) {
            setRequirements([]);
            return;
        }
        setError(null);
        setRequirements(parseImageRequirementsFromContentType(contentType));
    }, [selectedType, contentTypesById]);
    var filtered = useMemo(function () {
        var q = filter.trim().toLowerCase();
        if (!q) {
            return requirements;
        }
        return requirements.filter(function (req) {
            return req.fieldId.toLowerCase().includes(q) ||
                req.fieldTitle.toLowerCase().includes(q) ||
                formatDimensionSpec(req).toLowerCase().includes(q);
        });
    }, [requirements, filter]);
    var selectedRequirement = (_b = requirements.find(function (r) { return r.fieldId === selectedFieldId; })) !== null && _b !== void 0 ? _b : null;
    var applyEnabled = Boolean(selectedRequirement && hasApplicableConstraints(selectedRequirement));
    return (jsxs(Paper, { variant: "outlined", sx: {
            p: 2,
            height: '100%',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }, children: [jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Image size requirements" }), jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Choose a content type to see image-picker width and height constraints for its fields." }), currentWidth && currentHeight && (jsx(Box$1, { sx: { mb: 2 }, children: jsxs(Typography, { variant: "body2", children: ["Current image: ", jsxs("strong", { children: [currentWidth, " \u00D7 ", currentHeight, "px"] })] }) })), jsx(Autocomplete, { size: "small", options: contentTypes, value: selectedType, onChange: function (_, value) { return setSelectedType(value); }, getOptionLabel: function (opt) { return opt.label; }, isOptionEqualToValue: function (a, b) { return a.formPath === b.formPath; }, loading: loadingTypes, disabled: loadingTypes || !contentTypes.length, renderInput: function (params) { return (jsx(TextField$1, __assign({}, params, { label: "Content type", placeholder: "Search content types\u2026", InputProps: __assign(__assign({}, params.InputProps), { endAdornment: (jsxs(Fragment, { children: [loadingTypes ? jsx(CircularProgress, { color: "inherit", size: 18 }) : null, params.InputProps.endAdornment] })) }) }))); }, sx: { mb: 2 } }), selectedType && (jsx(Typography, { variant: "caption", color: "text.secondary", display: "block", sx: { mb: 1 }, children: selectedType.contentType })), selectedType && (jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", sx: { mb: 2 }, flexWrap: "wrap", useFlexGap: true, children: [jsx(TextField$1, { size: "small", fullWidth: true, placeholder: "Filter image fields\u2026", value: filter, onChange: function (e) { return setFilter(e.target.value); }, sx: { flex: 1, minWidth: 200 }, InputProps: {
                            startAdornment: (jsx(InputAdornment, { position: "start", children: jsx(SearchRoundedIcon, { fontSize: "small" }) }))
                        } }), onApplyConstraints && (jsx(Button$1, { size: "small", variant: "contained", startIcon: jsx(CheckRoundedIcon, {}), disabled: !applyEnabled, onClick: function () { return selectedRequirement && onApplyConstraints(selectedRequirement); }, children: "Apply constraints" }))] })), selectedType && selectedRequirement && !hasApplicableConstraints(selectedRequirement) && (jsx(Typography, { variant: "caption", color: "text.secondary", display: "block", sx: { mb: 1 }, children: "Selected field has no width or height constraints to apply." })), selectedType && !selectedRequirement && requirements.length > 0 && (jsx(Typography, { variant: "caption", color: "text.secondary", display: "block", sx: { mb: 1 }, children: "Click a field row, then apply constraints to crop, resize, and output size." })), error && (jsx(Typography, { color: "error", variant: "body2", children: error })), !loadingTypes && !error && !contentTypes.length && (jsx(Typography, { variant: "body2", color: "text.secondary", children: "No content types found in this site." })), !selectedType && !loadingTypes && contentTypes.length > 0 && (jsx(Typography, { variant: "body2", color: "text.secondary", sx: { py: 2 }, children: "Select a content type above to load its image field requirements." })), selectedType && !error && (jsx(Box$1, { sx: { flex: 1, minHeight: 0, overflow: 'auto' }, children: jsxs(Table, { size: "small", stickyHeader: true, children: [jsx(TableHead, { children: jsxs(TableRow, { children: [jsx(TableCell, { children: "Field" }), jsx(TableCell, { children: "Requirements" }), currentWidth && currentHeight ? jsx(TableCell, { children: "Match" }) : null] }) }), jsxs(TableBody, { children: [filtered.map(function (req) {
                                    var matches = currentWidth && currentHeight
                                        ? imageMatchesRequirement(currentWidth, currentHeight, req)
                                        : null;
                                    return (jsxs(TableRow, { hover: true, selected: selectedFieldId === req.fieldId, onClick: function () { return setSelectedFieldId(req.fieldId); }, sx: { cursor: 'pointer' }, children: [jsxs(TableCell, { children: [jsx(Typography, { variant: "body2", children: req.fieldTitle }), jsx(Typography, { variant: "caption", color: "text.secondary", children: req.fieldId }), appliedFieldId === req.fieldId && (jsx(Chip, { size: "small", label: "Applied", color: "primary", variant: "outlined", sx: { mt: 0.5 } }))] }), jsx(TableCell, { children: jsx(Typography, { variant: "body2", children: formatDimensionSpec(req) }) }), currentWidth && currentHeight ? (jsx(TableCell, { children: jsx(Chip, { size: "small", label: matches ? 'OK' : 'Mismatch', color: matches ? 'success' : 'warning', variant: matches ? 'filled' : 'outlined' }) })) : null] }, req.fieldId));
                                }), !filtered.length && (jsx(TableRow, { children: jsx(TableCell, { colSpan: currentWidth && currentHeight ? 3 : 2, children: jsx(Typography, { variant: "body2", color: "text.secondary", children: "No image-picker fields on this content type." }) }) }))] })] }) }))] }));
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */
var FEED_LIMIT = 50;
var RECENT_ACTIVITY_ACTIONS = ['CREATE', 'UPDATE', 'MOVE'];
function formatDateTime(value) {
    try {
        return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
    }
    catch (_a) {
        return value;
    }
}
function activityActionLabel(actionType) {
    switch (actionType) {
        case 'CREATE':
            return 'Created';
        case 'UPDATE':
            return 'Updated';
        case 'MOVE':
            return 'Moved';
        default:
            return actionType.replace(/_/g, ' ').toLowerCase();
    }
}
function isValidContentPath(path) {
    if (!path || !path.trim()) {
        return false;
    }
    var trimmed = path.trim();
    return trimmed !== 'undefined' && trimmed !== 'null';
}
function isSelectableContentPath(path) {
    if (!isValidContentPath(path)) {
        return false;
    }
    var trimmed = path.trim();
    if (trimmed.includes('level.xml')) {
        return false;
    }
    return trimmed.startsWith('/site/website/') || trimmed.startsWith('/site/components/');
}
function dedupeRecentActivity(activities) {
    var seen = new Set();
    var entries = [];
    activities.forEach(function (activity) {
        var _a, _b, _c, _d;
        var path = (_b = (_a = activity.item) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.trim();
        if (!path || !isSelectableContentPath(path) || seen.has(path)) {
            return;
        }
        seen.add(path);
        var action = activityActionLabel(activity.actionType);
        var when = activity.actionTimestamp ? formatDateTime(activity.actionTimestamp) : '';
        entries.push({
            path: path,
            label: (_c = activity.item) === null || _c === void 0 ? void 0 : _c.label,
            systemType: (_d = activity.item) === null || _d === void 0 ? void 0 : _d.systemType,
            subtitle: when ? "".concat(action, " \u00B7 ").concat(when) : action
        });
    });
    return entries;
}
function loadMyRecentActivityFeed(siteId) {
    return fetchMyActivity(siteId, {
        limit: FEED_LIMIT,
        offset: 0,
        actions: __spreadArray([], RECENT_ACTIVITY_ACTIONS, true)
    }).pipe(map(function (activities) { return dedupeRecentActivity(activities); }), catchError(function () { return of([]); }));
}
function loadUnpublishedWorkFeed(siteId) {
    return fetchUnpublished(siteId, {
        limit: FEED_LIMIT,
        offset: 0,
        sortBy: 'dateModified',
        sortOrder: 'desc'
    }).pipe(map(function (items) {
        return items
            .filter(function (item) { return isSelectableContentPath(item.path); })
            .map(function (item) { return ({
            path: item.path.trim(),
            label: item.label,
            systemType: item.systemType,
            subtitle: item.dateModified ? "Modified \u00B7 ".concat(formatDateTime(item.dateModified)) : 'Unpublished'
        }); });
    }), catchError(function () { return of([]); }));
}

var NAVIGATOR_ID = 'imageStudioSaveContentBrowse';
function isFolderItem(item) {
    return (item === null || item === void 0 ? void 0 : item.systemType) === 'folder';
}
function ImageStudioContentBrowsePanel(_a) {
    var selectedPath = _a.selectedPath, onSelect = _a.onSelect;
    var dispatch = useDispatch();
    var onItemClicked = function (item) {
        if (isFolderItem(item)) {
            dispatch(pathNavigatorFetchPath({
                id: NAVIGATOR_ID,
                path: item.path
            }));
            return;
        }
        if (isSelectableContentPath(item.path)) {
            onSelect(item.path, item.label);
        }
    };
    return (jsxs(Box$1, { sx: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }, children: [jsxs(Box$1, { sx: { px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider' }, children: [jsx(Typography, { variant: "subtitle2", fontWeight: 600, children: "Browse repository" }), jsx(Typography, { variant: "caption", color: "text.secondary", children: "Open folders to find pages and components under /site" }), selectedPath ? (jsxs(Typography, { variant: "caption", display: "block", sx: { mt: 0.5 }, color: "primary.main", children: ["Selected: ", selectedPath] })) : null] }), jsx(Box$1, { sx: { flex: 1, minHeight: 0, overflow: 'auto', px: 1 }, children: jsx(PathNavigator$1, { id: NAVIGATOR_ID, label: "Site content", rootPath: "/site", limit: 50, initialCollapsed: false, excludes: ['level\\.xml$'], onItemClicked: onItemClicked }) })] }));
}

function ImageStudioContentFeedPanel(_a) {
    var title = _a.title, description = _a.description, entries = _a.entries, loading = _a.loading, error = _a.error, selectedPath = _a.selectedPath, onSelect = _a.onSelect, onRefresh = _a.onRefresh;
    var siteId = useActiveSiteId();
    var _b = useState({}), itemsByPath = _b[0], setItemsByPath = _b[1];
    var pathsKey = useMemo(function () { return entries.map(function (entry) { return entry.path; }).join('\0'); }, [entries]);
    useEffect(function () {
        if (!siteId || entries.length === 0) {
            setItemsByPath({});
            return;
        }
        var paths = entries.map(function (entry) { return entry.path; }).filter(Boolean);
        if (paths.length === 0) {
            setItemsByPath({});
            return;
        }
        fetchItemsByPath(siteId, paths, { castAsDetailedItem: true }).subscribe({
            next: function (items) {
                var nextMap = {};
                items.forEach(function (item) {
                    if (item === null || item === void 0 ? void 0 : item.path) {
                        nextMap[item.path] = item;
                    }
                });
                setItemsByPath(nextMap);
            },
            error: function () {
                setItemsByPath({});
            }
        });
    }, [pathsKey, siteId]);
    return (jsxs(Box$1, { sx: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }, children: [jsxs(Stack, { direction: "row", alignItems: "flex-start", justifyContent: "space-between", sx: { px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider' }, children: [jsxs(Box$1, { sx: { minWidth: 0, pr: 1 }, children: [jsx(Typography, { variant: "subtitle2", fontWeight: 600, children: title }), jsx(Typography, { variant: "caption", color: "text.secondary", children: description })] }), onRefresh ? (jsx(Tooltip, { title: "Refresh", children: jsx("span", { children: jsx(IconButton$1, { size: "small", "aria-label": "Refresh", onClick: onRefresh, disabled: loading, children: jsx(RefreshRoundedIcon, { fontSize: "small" }) }) }) })) : null] }), jsx(Box$1, { sx: { flex: 1, minHeight: 0, overflowY: 'auto' }, children: loading ? (jsx(Box$1, { sx: { display: 'flex', justifyContent: 'center', py: 4 }, children: jsx(CircularProgress, { size: 28 }) })) : error ? (jsx(Typography, { variant: "body2", color: "error", sx: { px: 2, py: 2 }, children: error })) : entries.length === 0 ? (jsx(Typography, { variant: "body2", color: "text.secondary", sx: { px: 2, py: 2 }, children: "Nothing to show in this feed right now." })) : (entries.map(function (entry, index) {
                    var _a, _b, _c;
                    var item = itemsByPath[entry.path];
                    var label = (_b = (_a = item === null || item === void 0 ? void 0 : item.label) !== null && _a !== void 0 ? _a : entry.label) !== null && _b !== void 0 ? _b : entry.path;
                    var selected = selectedPath === entry.path;
                    return (jsxs(React__default.Fragment, { children: [index > 0 ? jsx(Divider, {}) : null, jsxs(ListItemButton, { selected: selected, onClick: function () { return onSelect(entry.path, label); }, sx: { alignItems: 'flex-start', py: 1 }, children: [jsx(Box$1, { sx: { mr: 1, mt: 0.25, display: 'flex', '& svg': { fontSize: '1.1rem' } }, children: jsx(ItemTypeIcon, { item: item !== null && item !== void 0 ? item : { path: entry.path, systemType: entry.systemType } }) }), jsx(ListItemText, { primary: label, secondary: (_c = entry.subtitle) !== null && _c !== void 0 ? _c : entry.path, primaryTypographyProps: { variant: 'body2', fontWeight: selected ? 600 : 400 }, secondaryTypographyProps: { variant: 'caption', noWrap: true } })] })] }, entry.path));
                })) })] }));
}

function ImageStudioContentPickerDialog(_a) {
    var open = _a.open, onClose = _a.onClose, onSelect = _a.onSelect, initialPath = _a.initialPath;
    var siteId = useActiveSiteId();
    var _b = useState('recent'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = useState(null), selectedPath = _c[0], setSelectedPath = _c[1];
    var _d = useState(''), selectedLabel = _d[0], setSelectedLabel = _d[1];
    var _e = useState([]), recentEntries = _e[0], setRecentEntries = _e[1];
    var _f = useState(false), recentLoading = _f[0], setRecentLoading = _f[1];
    var _g = useState(null), recentError = _g[0], setRecentError = _g[1];
    var _h = useState([]), unpublishedEntries = _h[0], setUnpublishedEntries = _h[1];
    var _j = useState(false), unpublishedLoading = _j[0], setUnpublishedLoading = _j[1];
    var _k = useState(null), unpublishedError = _k[0], setUnpublishedError = _k[1];
    var handleClose = useCallback(function () {
        setSelectedPath(null);
        setSelectedLabel('');
        setActiveTab('recent');
        onClose();
    }, [onClose]);
    var pickPath = useCallback(function (path, label) {
        setSelectedPath(path);
        setSelectedLabel((label === null || label === void 0 ? void 0 : label.trim()) || path);
    }, []);
    var handleSearchSelect = useCallback(function (path, selected) {
        if (selected) {
            pickPath(path);
        }
    }, [pickPath]);
    var handleConfirm = useCallback(function () {
        if (!selectedPath) {
            return;
        }
        onSelect({ path: selectedPath, label: selectedLabel || selectedPath });
        setSelectedPath(null);
        setSelectedLabel('');
        setActiveTab('recent');
    }, [onSelect, selectedLabel, selectedPath]);
    var loadRecentFeed = useCallback(function () {
        if (!siteId) {
            setRecentEntries([]);
            return undefined;
        }
        setRecentLoading(true);
        setRecentError(null);
        return loadMyRecentActivityFeed(siteId).subscribe({
            next: function (entries) {
                setRecentEntries(entries);
                setRecentLoading(false);
            },
            error: function () {
                setRecentError('Unable to load your recent activity.');
                setRecentEntries([]);
                setRecentLoading(false);
            }
        });
    }, [siteId]);
    var loadUnpublishedFeed = useCallback(function () {
        if (!siteId) {
            setUnpublishedEntries([]);
            return undefined;
        }
        setUnpublishedLoading(true);
        setUnpublishedError(null);
        return loadUnpublishedWorkFeed(siteId).subscribe({
            next: function (entries) {
                setUnpublishedEntries(entries);
                setUnpublishedLoading(false);
            },
            error: function () {
                setUnpublishedError('Unable to load unpublished work.');
                setUnpublishedEntries([]);
                setUnpublishedLoading(false);
            }
        });
    }, [siteId]);
    useEffect(function () {
        if (!open) {
            return;
        }
        setSelectedPath(initialPath !== null && initialPath !== void 0 ? initialPath : null);
        setSelectedLabel(initialPath !== null && initialPath !== void 0 ? initialPath : '');
    }, [open, initialPath]);
    useEffect(function () {
        if (!open) {
            return;
        }
        if (activeTab === 'recent') {
            var subscription_1 = loadRecentFeed();
            return function () { return subscription_1 === null || subscription_1 === void 0 ? void 0 : subscription_1.unsubscribe(); };
        }
        if (activeTab === 'unpublished') {
            var subscription_2 = loadUnpublishedFeed();
            return function () { return subscription_2 === null || subscription_2 === void 0 ? void 0 : subscription_2.unsubscribe(); };
        }
    }, [activeTab, loadRecentFeed, loadUnpublishedFeed, open]);
    return (jsxs(Dialog, { open: open, onClose: handleClose, fullWidth: true, maxWidth: false, scroll: "paper", disableRestoreFocus: true, PaperProps: {
            sx: function (theme) { return ({
                width: 'min(96vw, 1100px)',
                maxWidth: "min(".concat(theme.breakpoints.values.lg, "px, calc(100vw - ").concat(theme.spacing(4), "))"),
                height: 'min(85vh, 880px)',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column'
            }); }
        }, children: [jsx(DialogTitle, { sx: { pb: 0 }, children: "Choose content item" }), jsxs(DialogContent, { sx: {
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    flex: 1,
                    overflow: 'hidden'
                }, children: [jsxs(Tabs, { value: activeTab, onChange: function (_, value) { return setActiveTab(value); }, variant: "scrollable", scrollButtons: "auto", sx: { px: 2, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }, children: [jsx(Tab, { value: "browse", label: "Browse" }), jsx(Tab, { value: "recent", label: "My recent activity" }), jsx(Tab, { value: "unpublished", label: "Unpublished work" }), jsx(Tab, { value: "search", label: "Search" })] }), jsxs(Box$1, { sx: { flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }, children: [open && activeTab === 'browse' ? (jsx(ImageStudioContentBrowsePanel, { selectedPath: selectedPath, onSelect: pickPath })) : null, open ? (jsx(Box$1, { hidden: activeTab !== 'search', sx: {
                                    flex: 1,
                                    minHeight: 0,
                                    minWidth: 0,
                                    width: '100%',
                                    display: activeTab === 'search' ? 'block' : 'none',
                                    overflow: 'hidden',
                                    '& > section': {
                                        width: '100%',
                                        height: '100%',
                                        minHeight: 0,
                                        minWidth: 0
                                    },
                                    '& > section > section:last-of-type': {
                                        display: 'none'
                                    }
                                }, children: jsx(Search, { embedded: true, mode: "select", onClose: handleClose, onSelect: handleSearchSelect }) })) : null, activeTab === 'recent' ? (jsx(ImageStudioContentFeedPanel, { title: "My recent activity", description: "Pages and components you created or edited recently", entries: recentEntries, loading: recentLoading, error: recentError, selectedPath: selectedPath, onSelect: pickPath, onRefresh: loadRecentFeed })) : null, activeTab === 'unpublished' ? (jsx(ImageStudioContentFeedPanel, { title: "Unpublished work", description: "Sandbox items not yet published", entries: unpublishedEntries, loading: unpublishedLoading, error: unpublishedError, selectedPath: selectedPath, onSelect: pickPath, onRefresh: loadUnpublishedFeed })) : null] })] }), jsxs(DialogActions, { sx: { px: 2, py: 1.5, flexWrap: 'wrap', gap: 1 }, children: [jsx(Box$1, { sx: { flex: 1, minWidth: 200 }, children: selectedPath ? (jsxs(Typography, { variant: "body2", color: "text.secondary", noWrap: true, children: [selectedLabel, jsx(Typography, { component: "span", variant: "caption", color: "text.disabled", sx: { ml: 1 }, children: selectedPath })] })) : (jsx(Typography, { variant: "body2", color: "text.secondary", children: "Select a page or component" })) }), jsx(Button$1, { onClick: handleClose, children: "Cancel" }), jsx(Button$1, { variant: "contained", disabled: !selectedPath, onClick: handleConfirm, children: "Use this content" })] })] }));
}

function ImageStudioSaveDialog(_a) {
    var _b;
    var open = _a.open, onClose = _a.onClose, onSave = _a.onSave, saving = _a.saving, defaultFolder = _a.defaultFolder, sourcePath = _a.sourcePath, suggestedName = _a.suggestedName;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _c = useState(defaultFolder), folder = _c[0], setFolder = _c[1];
    var _d = useState(suggestedName !== null && suggestedName !== void 0 ? suggestedName : 'image.png'), fileName = _d[0], setFileName = _d[1];
    var _e = useState(sourcePath ? 'variant' : 'new'), mode = _e[0], setMode = _e[1];
    var _f = useState('image/png'), mimeType = _f[0], setMimeType = _f[1];
    var _g = useState(0.92), quality = _g[0], setQuality = _g[1];
    var _h = useState(false), linkEnabled = _h[0], setLinkEnabled = _h[1];
    var _j = useState(false), contentPickerOpen = _j[0], setContentPickerOpen = _j[1];
    var _k = useState(null), selectedContent = _k[0], setSelectedContent = _k[1];
    var _l = useState([]), imageFields = _l[0], setImageFields = _l[1];
    var _m = useState(false), fieldsLoading = _m[0], setFieldsLoading = _m[1];
    var _o = useState(null), fieldsError = _o[0], setFieldsError = _o[1];
    var _p = useState(null), selectedField = _p[0], setSelectedField = _p[1];
    var _q = useState(''), contentObjectId = _q[0], setContentObjectId = _q[1];
    useEffect(function () {
        if (open) {
            setFolder(defaultFolder);
            setFileName(suggestedName !== null && suggestedName !== void 0 ? suggestedName : 'image.png');
            setMode(sourcePath ? 'variant' : 'new');
            setLinkEnabled(false);
            setContentPickerOpen(false);
            setSelectedContent(null);
            setImageFields([]);
            setSelectedField(null);
            setContentObjectId('');
            setFieldsError(null);
        }
    }, [open, defaultFolder, suggestedName, sourcePath]);
    useEffect(function () {
        if (!open || !linkEnabled || !siteId || !selectedContent) {
            setImageFields([]);
            setSelectedField(null);
            setContentObjectId('');
            setFieldsError(null);
            return;
        }
        var cancelled = false;
        setFieldsLoading(true);
        setFieldsError(null);
        loadImagePickerFieldsForContent(siteId, selectedContent.path)
            .then(function (result) {
            var _a;
            if (!cancelled) {
                setImageFields(result.fields);
                setContentObjectId(result.objectId);
                setSelectedField((_a = result.fields[0]) !== null && _a !== void 0 ? _a : null);
            }
        })
            .catch(function () {
            if (!cancelled) {
                setImageFields([]);
                setSelectedField(null);
                setContentObjectId('');
                setFieldsError('Unable to load image fields for this content item.');
            }
        })
            .finally(function () {
            if (!cancelled) {
                setFieldsLoading(false);
            }
        });
        return function () {
            cancelled = true;
        };
    }, [open, linkEnabled, siteId, selectedContent]);
    var fullPath = useMemo(function () {
        var normalizedFolder = folder.replace(/\/$/, '');
        var name = fileName.replace(/^\//, '');
        return "".concat(normalizedFolder, "/").concat(name);
    }, [folder, fileName]);
    var handleModeChange = function (nextMode) {
        var _a;
        setMode(nextMode);
        if (nextMode === 'replace' && sourcePath) {
            setFolder(sourcePath.substring(0, sourcePath.lastIndexOf('/')));
            setFileName(sourcePath.substring(sourcePath.lastIndexOf('/') + 1));
            var ext = (_a = sourcePath.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (ext === 'jpg' || ext === 'jpeg') {
                setMimeType('image/jpeg');
            }
            else if (ext === 'webp') {
                setMimeType('image/webp');
            }
            else if (ext === 'png') {
                setMimeType('image/png');
            }
        }
        else if (nextMode === 'variant' && sourcePath) {
            var variantPath = suggestVariantFilename(sourcePath);
            setFolder(variantPath.substring(0, variantPath.lastIndexOf('/')));
            setFileName(variantPath.substring(variantPath.lastIndexOf('/') + 1));
        }
    };
    var handleSelectFolder = function () {
        var callbackId = 'ImageStudioSavePathSelection';
        var callbackAccept = 'accept';
        dispatch(showPathSelectionDialog({
            rootPath: '/static-assets',
            initialPath: folder,
            showCreateFolderOption: true,
            allowSwitchingRootPath: true,
            stripXmlIndex: true,
            onClosed: batchActions([
                dispatchDOMEvent({ id: callbackId, action: 'close' }),
                pathSelectionDialogClosed()
            ]),
            onOk: batchActions([
                dispatchDOMEvent({ id: callbackId, action: callbackAccept }),
                closePathSelectionDialog()
            ])
        }));
        createCustomDocumentEventListener(callbackId, function (detail) {
            if (detail.action === callbackAccept) {
                setFolder(detail.path);
            }
        });
    };
    var contentFieldLink = linkEnabled && selectedContent && selectedField && contentObjectId
        ? {
            contentPath: selectedContent.path,
            objectId: contentObjectId,
            fieldId: selectedField.fieldId,
            fieldTitle: selectedField.fieldTitle
        }
        : null;
    var handleSubmit = function () {
        onSave({
            fullPath: mode === 'replace' && sourcePath ? sourcePath : fullPath,
            mode: mode,
            mimeType: mimeType,
            quality: quality,
            contentFieldLink: contentFieldLink
        });
    };
    return (jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "md", fullWidth: true, children: [jsx(DialogTitle, { children: "Save image" }), jsxs(DialogContent, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [sourcePath && (jsxs(Box$1, { children: [jsx(Typography, { variant: "subtitle2", gutterBottom: true, children: "Save as" }), jsxs(RadioGroup, { value: mode, onChange: function (e) { return handleModeChange(e.target.value); }, children: [jsx(FormControlLabel, { value: "replace", control: jsx(Radio, {}), label: "Replace original image" }), jsx(FormControlLabel, { value: "variant", control: jsx(Radio, {}), label: "Save as new variant (recommended)" }), jsx(FormControlLabel, { value: "new", control: jsx(Radio, {}), label: "Save to a new path" })] })] })), mode !== 'replace' && (jsxs(Stack, { direction: "row", spacing: 1, alignItems: "flex-start", children: [jsx(TextField$1, { label: "Folder", fullWidth: true, size: "small", value: folder, onChange: function (e) { return setFolder(e.target.value); }, helperText: "Repository folder under /static-assets" }), jsx(Button$1, { variant: "outlined", onClick: handleSelectFolder, sx: { mt: 1, minWidth: 100 }, children: "Browse" })] })), mode !== 'replace' && (jsx(TextField$1, { label: "File name", fullWidth: true, size: "small", value: fileName, onChange: function (e) { return setFileName(e.target.value); }, helperText: "Use letters, numbers, dots, dashes, and underscores" })), jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 2, children: [jsxs(FormControl, { fullWidth: true, size: "small", disabled: mode === 'replace', children: [jsx(InputLabel, { children: "Format" }), jsxs(Select, { label: "Format", value: mimeType, onChange: function (e) { return setMimeType(e.target.value); }, children: [jsx(MenuItem$1, { value: "image/png", children: "PNG (lossless)" }), jsx(MenuItem$1, { value: "image/jpeg", children: "JPEG" }), jsx(MenuItem$1, { value: "image/webp", children: "WebP" })] }), mode === 'replace' && (jsx(FormHelperText, { children: "Format matches the original file extension when replacing." }))] }), mimeType !== 'image/png' && (jsx(TextField$1, { label: "Quality", type: "number", size: "small", fullWidth: true, inputProps: { min: 0.1, max: 1, step: 0.05 }, value: quality, onChange: function (e) { return setQuality(Number(e.target.value)); } }))] }), jsxs(FormHelperText, { sx: { mt: 0 }, children: ["Destination: ", jsx("strong", { children: mode === 'replace' && sourcePath ? sourcePath : fullPath })] }), jsxs(Box$1, { sx: { borderTop: 1, borderColor: 'divider', pt: 2 }, children: [jsx(FormControlLabel, { control: jsx(Checkbox$1, { checked: linkEnabled, onChange: function (e) { return setLinkEnabled(e.target.checked); } }), label: "Update a content item image field after save" }), jsx(Collapse$1, { in: linkEnabled, children: jsxs(Stack, { spacing: 1.5, sx: { mt: 1 }, children: [jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", flexWrap: "wrap", useFlexGap: true, children: [jsx(Button$1, { variant: "outlined", size: "small", onClick: function () { return setContentPickerOpen(true); }, children: selectedContent ? 'Change content…' : 'Choose content…' }), selectedContent ? (jsxs(Box$1, { sx: { minWidth: 0, flex: 1 }, children: [jsx(Typography, { variant: "body2", noWrap: true, fontWeight: 500, children: selectedContent.label }), jsx(Typography, { variant: "caption", color: "text.secondary", noWrap: true, display: "block", children: selectedContent.path })] })) : (jsx(Typography, { variant: "body2", color: "text.secondary", children: "Browse, pick recent or unpublished items, or search" }))] }), selectedContent && (jsxs(FormControl, { fullWidth: true, size: "small", disabled: fieldsLoading || !imageFields.length, children: [jsx(InputLabel, { children: "Image field" }), jsx(Select, { label: "Image field", value: (_b = selectedField === null || selectedField === void 0 ? void 0 : selectedField.fieldId) !== null && _b !== void 0 ? _b : '', onChange: function (e) {
                                                        var field = imageFields.find(function (f) { return f.fieldId === e.target.value; });
                                                        setSelectedField(field !== null && field !== void 0 ? field : null);
                                                    }, children: imageFields.map(function (field) { return (jsxs(MenuItem$1, { value: field.fieldId, children: [field.fieldTitle, " (", field.fieldId, ")"] }, field.fieldId)); }) }), !fieldsLoading && fieldsError && (jsx(FormHelperText, { error: true, children: fieldsError })), !fieldsLoading && !fieldsError && imageFields.length === 0 && (jsx(FormHelperText, { children: "No image-picker fields on this content type." })), fieldsLoading ? (jsxs(Box$1, { sx: { display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }, children: [jsx(CircularProgress, { size: 16 }), jsx(Typography, { variant: "caption", color: "text.secondary", children: "Loading fields\u2026" })] })) : null] }))] }) })] })] }), jsx(ImageStudioContentPickerDialog, { open: contentPickerOpen, onClose: function () { return setContentPickerOpen(false); }, initialPath: selectedContent === null || selectedContent === void 0 ? void 0 : selectedContent.path, onSelect: function (selection) {
                    setSelectedContent(selection);
                    setContentPickerOpen(false);
                } }), jsxs(DialogActions, { children: [jsx(Button$1, { onClick: onClose, disabled: saving, children: "Cancel" }), jsx(Button$1, { onClick: handleSubmit, variant: "contained", disabled: saving || !fileName.trim(), children: saving ? 'Saving…' : linkEnabled && contentFieldLink ? 'Save & update content' : 'Save' })] })] }));
}

function ImageStudioWelcome(_a) {
    var onFile = _a.onFile, onBrowseRequest = _a.onBrowseRequest;
    var theme = useTheme();
    var fileInputRef = useRef(null);
    var _b = useState(false), dragOver = _b[0], setDragOver = _b[1];
    useEffect(function () {
        var handlePaste = function (e) {
            var _a;
            var items = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
            if (!items) {
                return;
            }
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.startsWith('image/')) {
                    var file = items[i].getAsFile();
                    if (file) {
                        onFile(file);
                        break;
                    }
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return function () { return window.removeEventListener('paste', handlePaste); };
    }, [onFile]);
    var onDrop = function (e) {
        var _a;
        e.preventDefault();
        setDragOver(false);
        var file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file === null || file === void 0 ? void 0 : file.type.startsWith('image/')) {
            onFile(file);
        }
    };
    return (jsx(Box$1, { sx: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            minHeight: 420
        }, children: jsxs(Box$1, { onDragOver: function (e) {
                e.preventDefault();
                setDragOver(true);
            }, onDragLeave: function () { return setDragOver(false); }, onDrop: onDrop, sx: {
                width: '100%',
                maxWidth: 520,
                textAlign: 'center',
                p: 4,
                borderRadius: 3,
                border: "2px dashed ".concat(dragOver ? theme.palette.primary.main : alpha(theme.palette.divider, 0.9)),
                bgcolor: dragOver ? alpha(theme.palette.primary.main, 0.06) : alpha(theme.palette.background.paper, 0.8),
                transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
                boxShadow: dragOver ? "0 8px 32px ".concat(alpha(theme.palette.primary.main, 0.15)) : 'none'
            }, children: [jsx(Box$1, { sx: {
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main'
                    }, children: jsx(CloudUploadRoundedIcon, { sx: { fontSize: 36 } }) }), jsx(Typography, { variant: "h5", sx: { fontWeight: 600, mb: 0.5 }, children: "Start with an image" }), jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 3 }, children: "Drag and drop here, or choose an option below" }), jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 1.5, justifyContent: "center", sx: { mb: 2 }, children: [jsx(Button$1, { variant: "contained", size: "large", startIcon: jsx(CloudUploadRoundedIcon, {}), onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: "Upload file" }), jsx(Button$1, { variant: "outlined", size: "large", startIcon: jsx(PhotoLibraryRoundedIcon, {}), onClick: onBrowseRequest, children: "Browse repository" })] }), jsxs(Stack, { direction: "row", spacing: 0.75, alignItems: "center", justifyContent: "center", children: [jsx(ContentPasteRoundedIcon, { sx: { fontSize: 18, color: 'text.secondary' } }), jsx(Typography, { variant: "caption", color: "text.secondary", children: "You can also paste an image from your clipboard" })] }), jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", hidden: true, onChange: function (e) {
                        var _a;
                        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                        if (file) {
                            onFile(file);
                        }
                        e.target.value = '';
                    } })] }) }));
}

var IMAGE_MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
    'image/webp',
    'image/bmp',
    'image/x-icon',
    'image/vnd.microsoft.icon'
];
var IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i;
function isImageAsset(item) {
    var _a;
    if ((_a = item.mimeType) === null || _a === void 0 ? void 0 : _a.startsWith('image/')) {
        return true;
    }
    if (item.systemType === 'asset' && IMAGE_EXT_RE.test(item.path || '')) {
        return true;
    }
    return IMAGE_EXT_RE.test(item.path || '');
}
function pathSegments(path) {
    var parts = path.replace(/\/$/, '').split('/').filter(Boolean);
    var segments = [];
    var current = '';
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        current += "/".concat(part);
        segments.push(current);
    }
    return segments;
}
function itemName(item) {
    if ('label' in item && item.label) {
        return item.label;
    }
    if ('name' in item && item.name) {
        return item.name;
    }
    return item.path.split('/').pop() || item.path;
}
function matchesNameQuery(item, query) {
    var q = query.trim().toLowerCase();
    if (!q) {
        return true;
    }
    var name = itemName(item).toLowerCase();
    var path = (item.path || '').toLowerCase();
    return name.includes(q) || path.includes(q);
}
function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/** OpenSearch path filter: everything under the folder (recursive). */
function recursivePathFilter(folderPath) {
    var normalized = folderPath.replace(/\/+$/, '') || '/';
    return "".concat(escapeRegex(normalized), "/.*");
}
function previewSrc(item, guestOrigin) {
    if (item.previewUrl) {
        return item.previewUrl;
    }
    if (guestOrigin && item.path) {
        return "".concat(guestOrigin.replace(/\/$/, '')).concat(item.path.startsWith('/') ? item.path : "/".concat(item.path));
    }
    return item.path || undefined;
}
function searchItemToBrowseImage(item) {
    return {
        path: item.path,
        name: item.name,
        label: item.name,
        previewUrl: item.previewUrl,
        mimeType: item.mimeType
    };
}
function ImageThumb(_a) {
    var item = _a.item, guestOrigin = _a.guestOrigin;
    var _b = useState(false), failed = _b[0], setFailed = _b[1];
    var src = previewSrc(item, guestOrigin);
    if (!src || failed) {
        return (jsx(Box$1, { sx: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.selected'
            }, children: jsx(ImageRoundedIcon, { color: "primary" }) }));
    }
    return (jsx(Box$1, { component: "img", src: src, alt: itemName(item), loading: "lazy", onError: function () { return setFailed(true); }, sx: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
        } }));
}
function ImageRepoBrowserDialog(_a) {
    var _this = this;
    var open = _a.open, onClose = _a.onClose, defaultPath = _a.defaultPath, guestOrigin = _a.guestOrigin, onImageSelected = _a.onImageSelected, onError = _a.onError, loadRepoImage = _a.loadRepoImage;
    var siteId = useActiveSiteId();
    var _b = useState(defaultPath), browsePath = _b[0], setBrowsePath = _b[1];
    var _c = useState(''), nameQuery = _c[0], setNameQuery = _c[1];
    var _d = useState(''), debouncedQuery = _d[0], setDebouncedQuery = _d[1];
    var _e = useState([]), items = _e[0], setItems = _e[1];
    var _f = useState(null), searchImages = _f[0], setSearchImages = _f[1];
    var _g = useState(false), loading = _g[0], setLoading = _g[1];
    var _h = useState(false), searching = _h[0], setSearching = _h[1];
    var _j = useState(false), loadingImage = _j[0], setLoadingImage = _j[1];
    var onErrorRef = useRef(onError);
    onErrorRef.current = onError;
    var searchSubRef = useRef(null);
    var wasOpenRef = useRef(false);
    var loadFolder = useCallback(function (path) { return __awaiter(_this, void 0, void 0, function () {
        var response, list, i, item, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!siteId) {
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, firstValueFrom(fetchChildrenByPath(siteId, path, { limit: 200 }).pipe(take(1)))];
                case 2:
                    response = _a.sent();
                    list = [];
                    if (response) {
                        for (i = 0; i < response.length; i++) {
                            item = response[i];
                            if (item === null || item === void 0 ? void 0 : item.path) {
                                list.push(item);
                            }
                        }
                    }
                    setItems(list);
                    setBrowsePath(path);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    onErrorRef.current(e_1.message);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [siteId]);
    // Reset only when the dialog opens (not when loadFolder identity changes).
    useEffect(function () {
        if (open && !wasOpenRef.current) {
            setBrowsePath(defaultPath);
            setNameQuery('');
            setDebouncedQuery('');
            setSearchImages(null);
            loadFolder(defaultPath);
        }
        wasOpenRef.current = open;
    }, [open, defaultPath, loadFolder]);
    useEffect(function () {
        var handle = window.setTimeout(function () { return setDebouncedQuery(nameQuery.trim()); }, 350);
        return function () { return window.clearTimeout(handle); };
    }, [nameQuery]);
    // Recursive site search when the user types a name (scoped under the current browse folder).
    useEffect(function () {
        var _a;
        (_a = searchSubRef.current) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        searchSubRef.current = null;
        if (!open || !siteId || !debouncedQuery) {
            setSearchImages(null);
            setSearching(false);
            return;
        }
        setSearching(true);
        var sub = search(siteId, {
            keywords: debouncedQuery,
            path: recursivePathFilter(browsePath),
            offset: 0,
            limit: 60,
            sortBy: '_score',
            sortOrder: 'desc',
            filters: {
                'mime-type': IMAGE_MIME_TYPES
            }
        }).subscribe({
            next: function (result) {
                var _a;
                var found = ((_a = result === null || result === void 0 ? void 0 : result.items) !== null && _a !== void 0 ? _a : [])
                    .filter(function (item) { var _a; return (item === null || item === void 0 ? void 0 : item.path) && (((_a = item.mimeType) === null || _a === void 0 ? void 0 : _a.startsWith('image/')) || IMAGE_EXT_RE.test(item.path)); })
                    .map(searchItemToBrowseImage);
                setSearchImages(found);
                setSearching(false);
            },
            error: function (e) {
                setSearchImages([]);
                setSearching(false);
                onErrorRef.current((e === null || e === void 0 ? void 0 : e.message) || 'Image search failed');
            }
        });
        searchSubRef.current = sub;
        return function () {
            sub.unsubscribe();
        };
    }, [open, siteId, debouncedQuery, browsePath]);
    var isSearching = Boolean(debouncedQuery);
    var folders = useMemo(function () {
        return isSearching
            ? []
            : items.filter(function (item) { return item.systemType === 'folder' && matchesNameQuery(item, nameQuery); });
    }, [items, nameQuery, isSearching]);
    var folderImages = useMemo(function () {
        return items
            .filter(function (item) { return isImageAsset(item) && matchesNameQuery(item, nameQuery); })
            .map(function (item) { return ({
            path: item.path,
            label: item.label,
            previewUrl: item.previewUrl,
            mimeType: item.mimeType
        }); });
    }, [items, nameQuery]);
    var images = isSearching ? searchImages !== null && searchImages !== void 0 ? searchImages : [] : folderImages;
    var crumbs = useMemo(function () { return pathSegments(browsePath); }, [browsePath]);
    var openRepoImage = function (path, name) { return __awaiter(_this, void 0, void 0, function () {
        var dataUrl, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingImage(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, loadRepoImage(path)];
                case 2:
                    dataUrl = _a.sent();
                    onImageSelected({ dataUrl: dataUrl, sourcePath: path, name: name });
                    onClose();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    onError(e_2.message);
                    return [3 /*break*/, 5];
                case 4:
                    setLoadingImage(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "md", fullWidth: true, children: [jsxs(DialogTitle, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }, children: [jsx(Typography, { variant: "h6", component: "span", children: "Browse images" }), jsx(IconButton$1, { size: "small", onClick: onClose, "aria-label": "Close", children: jsx(CloseRoundedIcon, {}) })] }), jsxs(DialogContent, { sx: { pt: 0 }, children: [jsx(Breadcrumbs, { sx: { mb: 1.5, flexWrap: 'wrap' }, children: crumbs.map(function (segment, index) {
                            var label = segment.split('/').pop() || '/';
                            var isLast = index === crumbs.length - 1;
                            return isLast ? (jsx(Typography, { variant: "body2", color: "text.primary", children: label }, segment)) : (jsx(Link, { component: "button", variant: "body2", underline: "hover", onClick: function () {
                                    setNameQuery('');
                                    setDebouncedQuery('');
                                    loadFolder(segment);
                                }, children: label }, segment));
                        }) }), jsx(TextField$1, { size: "small", fullWidth: true, label: "Folder path", value: browsePath, onChange: function (e) { return setBrowsePath(e.target.value); }, onKeyDown: function (e) {
                            if (e.key === 'Enter') {
                                setNameQuery('');
                                setDebouncedQuery('');
                                loadFolder(browsePath);
                            }
                        }, sx: { mb: 1.5 } }), jsx(TextField$1, { size: "small", fullWidth: true, label: "Search by name", placeholder: "Find images under this folder by filename\u2026", value: nameQuery, onChange: function (e) { return setNameQuery(e.target.value); }, sx: { mb: 1.5 }, InputProps: {
                            startAdornment: (jsx(InputAdornment, { position: "start", children: jsx(SearchRoundedIcon, { fontSize: "small", color: "action" }) })),
                            endAdornment: nameQuery ? (jsx(InputAdornment, { position: "end", children: jsx(IconButton$1, { size: "small", "aria-label": "Clear name search", onClick: function () { return setNameQuery(''); }, edge: "end", children: jsx(CloseRoundedIcon, { fontSize: "small" }) }) })) : undefined
                        }, helperText: isSearching
                            ? "Searching under ".concat(browsePath, "\u2026")
                            : 'Leave empty to browse this folder. Type a name to search nested folders.' }), jsxs(Box$1, { sx: { position: 'relative', minHeight: 320, maxHeight: 440, overflow: 'auto', borderRadius: 1, bgcolor: 'action.hover', p: 1 }, children: [(loading || searching || loadingImage) && (jsx(Box$1, { sx: {
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: function (theme) {
                                        return theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.6)';
                                    },
                                    zIndex: 1
                                }, children: jsx(CircularProgress, { size: 28 }) })), folders.length > 0 && (jsx(List, { dense: true, disablePadding: true, sx: { mb: images.length ? 1 : 0 }, children: folders.map(function (folder) { return (jsxs(ListItemButton, { onClick: function () { return loadFolder(folder.path); }, sx: { borderRadius: 1 }, children: [jsx(ListItemIcon, { sx: { minWidth: 36 }, children: jsx(FolderRoundedIcon, { fontSize: "small", color: "action" }) }), jsx(ListItemText, { primary: itemName(folder) })] }, folder.path)); }) })), images.length > 0 && (jsx(Box$1, { sx: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
                                    gap: 1
                                }, children: images.map(function (image) {
                                    var name = itemName(image);
                                    return (jsxs(Box$1, { component: "button", type: "button", onClick: function () { return openRepoImage(image.path, name); }, title: image.path, sx: {
                                            appearance: 'none',
                                            border: 1,
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            p: 0,
                                            m: 0,
                                            bgcolor: 'background.paper',
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            textAlign: 'left',
                                            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                boxShadow: 1
                                            }
                                        }, children: [jsx(Box$1, { sx: { width: '100%', aspectRatio: '1 / 1', bgcolor: 'action.hover' }, children: jsx(ImageThumb, { item: image, guestOrigin: guestOrigin }) }), jsxs(Box$1, { sx: { px: 1, py: 0.75 }, children: [jsx(Typography, { variant: "caption", noWrap: true, display: "block", fontWeight: 600, children: name }), jsx(Typography, { variant: "caption", color: "text.secondary", noWrap: true, display: "block", children: image.path })] })] }, image.path));
                                }) })), !loading && !searching && !folders.length && !images.length && (jsx(Box$1, { sx: { p: 3, textAlign: 'center' }, children: jsx(Typography, { variant: "body2", color: "text.secondary", children: isSearching ? 'No matching images found.' : 'No images in this folder.' }) }))] })] })] }));
}

var TOOL_OPTIONS = [
    { value: 'crop', label: 'Crop', icon: jsx(CropRoundedIcon, { fontSize: "small" }) },
    { value: 'focal', label: 'Focal', icon: jsx(CenterFocusStrongRoundedIcon, { fontSize: "small" }) },
    { value: 'filters', label: 'Filters', icon: jsx(AutoAwesomeRoundedIcon, { fontSize: "small" }) },
    { value: 'adjust', label: 'Adjust', icon: jsx(TuneRoundedIcon, { fontSize: "small" }) },
    { value: 'draw', label: 'Draw', icon: jsx(BrushRoundedIcon, { fontSize: "small" }) },
    { value: 'resize', label: 'Resize', icon: jsx(PhotoSizeSelectLargeRoundedIcon, { fontSize: "small" }) }
];
function ImageStudio(_a) {
    var _this = this;
    var _b;
    var _c = _a.defaultPath, defaultPath = _c === void 0 ? '/static-assets/images' : _c;
    var theme = useTheme();
    var siteId = useActiveSiteId();
    var dispatch = useDispatch();
    var guestOrigin = useSelector(function (state) { var _a, _b; return (_b = (_a = state.preview) === null || _a === void 0 ? void 0 : _a.guest) === null || _b === void 0 ? void 0 : _b.origin; });
    var isFullScreen = useSelector(function (state) { var _a, _b, _c; return (_c = (_b = (_a = state.dialogs) === null || _a === void 0 ? void 0 : _a.widget) === null || _b === void 0 ? void 0 : _b.isFullScreen) !== null && _c !== void 0 ? _c : false; });
    var _d = useState('studio'), mainTab = _d[0], setMainTab = _d[1];
    var _e = useState(null), loaded = _e[0], setLoaded = _e[1];
    var _f = useState('crop'), tool = _f[0], setTool = _f[1];
    var _g = useState(DEFAULT_ADJUSTMENTS), adjustments = _g[0], setAdjustments = _g[1];
    var _h = useState(DEFAULT_FOCAL), focal = _h[0], setFocal = _h[1];
    var _j = useState(null), croppedAreaPixels = _j[0], setCroppedAreaPixels = _j[1];
    var _k = useState(undefined), aspect = _k[0], setAspect = _k[1];
    var _l = useState(''), outputWidth = _l[0], setOutputWidth = _l[1];
    var _m = useState(''), outputHeight = _m[0], setOutputHeight = _m[1];
    var _o = useState(true), lockOutputAspect = _o[0], setLockOutputAspect = _o[1];
    var _p = useState(DEFAULT_OUTPUT_BACKGROUND), outputBackground = _p[0], setOutputBackground = _p[1];
    var _q = useState(false), saveOpen = _q[0], setSaveOpen = _q[1];
    var _r = useState(false), browseOpen = _r[0], setBrowseOpen = _r[1];
    var _s = useState(false), saving = _s[0], setSaving = _s[1];
    var _t = useState(false), applyingCrop = _t[0], setApplyingCrop = _t[1];
    var _u = useState('normal'), filterPresetId = _u[0], setFilterPresetId = _u[1];
    var _v = useState(EMPTY_DRAW_STATE), drawState = _v[0], setDrawState = _v[1];
    var _w = useState('brush'), drawTool = _w[0], setDrawTool = _w[1];
    var _x = useState('#ffffff'), brushColor = _x[0], setBrushColor = _x[1];
    var _y = useState(8), brushSize = _y[0], setBrushSize = _y[1];
    var _z = useState(DEFAULT_TEXT_FONT_FAMILY), textFontFamily = _z[0], setTextFontFamily = _z[1];
    var _0 = useState(DEFAULT_TEXT_FONT_SIZE), textFontSize = _0[0], setTextFontSize = _0[1];
    var _1 = useState(DEFAULT_CANVAS_VIEW), canvasView = _1[0], setCanvasView = _1[1];
    var _2 = useState(null), appliedFieldId = _2[0], setAppliedFieldId = _2[1];
    var loadRepoImage = useCallback(function (path) { return loadRepoImageAsDataUrl(siteId, path, guestOrigin); }, [siteId, guestOrigin]);
    var resetEdits = useCallback(function () {
        setAdjustments(DEFAULT_ADJUSTMENTS);
        setFocal(DEFAULT_FOCAL);
        setCroppedAreaPixels(null);
        setAspect(undefined);
        setOutputWidth('');
        setOutputHeight('');
        setOutputBackground(DEFAULT_OUTPUT_BACKGROUND);
        setFilterPresetId('normal');
        setDrawState(EMPTY_DRAW_STATE);
        setDrawTool('brush');
        setBrushColor('#ffffff');
        setBrushSize(8);
        setTextFontFamily(DEFAULT_TEXT_FONT_FAMILY);
        setTextFontSize(DEFAULT_TEXT_FONT_SIZE);
        setCanvasView(DEFAULT_CANVAS_VIEW);
        setAppliedFieldId(null);
    }, []);
    var handleAdjustmentsChange = useCallback(function (next) {
        setAdjustments(next);
        setFilterPresetId('custom');
    }, []);
    var handleSelectFilterPreset = useCallback(function (presetId, presetAdjustments) {
        setFilterPresetId(presetId);
        setAdjustments(presetAdjustments);
    }, []);
    var handleTintChange = useCallback(function (tintColor, tintStrength) {
        setAdjustments(function (prev) { return (__assign(__assign({}, prev), { tintColor: tintColor, tintStrength: tintStrength })); });
        setFilterPresetId('custom');
    }, []);
    var handleImageSelected = useCallback(function (payload) {
        setLoaded(payload);
        resetEdits();
        setMainTab('studio');
        setTool('crop');
    }, [resetEdits]);
    var handleError = useCallback(function (message) {
        dispatch(showSystemNotification({ message: message, options: { variant: 'error' } }));
    }, [dispatch]);
    var handleLocalFile = useCallback(function (file) { return __awaiter(_this, void 0, void 0, function () {
        var dataUrl, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, blobToDataUrl(file)];
                case 1:
                    dataUrl = _a.sent();
                    handleImageSelected({ dataUrl: dataUrl, name: file.name });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    handleError(e_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [handleImageSelected, handleError]);
    useEffect(function () {
        var onPaste = function (e) {
            var _a;
            var items = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
            if (!items) {
                return;
            }
            var _loop_1 = function (i) {
                var item = items[i];
                if (item.type.startsWith('image/')) {
                    var file_1 = item.getAsFile();
                    if (file_1) {
                        blobToDataUrl(file_1).then(function (dataUrl) {
                            handleImageSelected({ dataUrl: dataUrl, name: file_1.name || 'pasted-image.png' });
                        });
                    }
                    return "break";
                }
            };
            for (var i = 0; i < items.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        };
        window.addEventListener('paste', onPaste);
        return function () { return window.removeEventListener('paste', onPaste); };
    }, [handleImageSelected]);
    var handleApplyConstraints = useCallback(function (req) { return __awaiter(_this, void 0, void 0, function () {
        var resolved, img, crop;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    resolved = resolveImageConstraints(req);
                    if (!resolved) {
                        handleError('This field has no size constraints to apply.');
                        return [2 /*return*/];
                    }
                    setAppliedFieldId(req.fieldId);
                    if (resolved.outputWidth != null) {
                        setOutputWidth(resolved.outputWidth);
                    }
                    if (resolved.outputHeight != null) {
                        setOutputHeight(resolved.outputHeight);
                    }
                    setLockOutputAspect(true);
                    if (!(resolved.aspect != null)) return [3 /*break*/, 4];
                    setAspect(resolved.aspect);
                    if (!loaded) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createImage(loaded.dataUrl)];
                case 2:
                    img = _b.sent();
                    crop = croppedAreaPixels !== null && croppedAreaPixels !== void 0 ? croppedAreaPixels : fullImageCrop(img.naturalWidth, img.naturalHeight);
                    setCroppedAreaPixels(cropAreaWithAspect(crop, resolved.aspect, img.naturalWidth, img.naturalHeight));
                    return [3 /*break*/, 4];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    setMainTab('studio');
                    setTool('resize');
                    dispatch(showSystemNotification({
                        message: "Applied ".concat(req.fieldTitle, ": ").concat(formatDimensionSpec(req)),
                        options: { variant: 'success' }
                    }));
                    return [2 /*return*/];
            }
        });
    }); }, [croppedAreaPixels, dispatch, handleError, loaded]);
    var previewDimensions = useMemo(function () {
        if (croppedAreaPixels) {
            return { width: croppedAreaPixels.width, height: croppedAreaPixels.height };
        }
        return null;
    }, [croppedAreaPixels]);
    var resolveCropArea = useCallback(function (img) { return __awaiter(_this, void 0, void 0, function () {
        var ratio;
        return __generator(this, function (_a) {
            if (croppedAreaPixels) {
                return [2 /*return*/, croppedAreaPixels];
            }
            if (tool === 'focal') {
                ratio = aspect !== null && aspect !== void 0 ? aspect : img.naturalWidth / img.naturalHeight;
                return [2 /*return*/, focalCropArea(img.naturalWidth, img.naturalHeight, focal, ratio)];
            }
            return [2 /*return*/, fullImageCrop(img.naturalWidth, img.naturalHeight)];
        });
    }); }, [aspect, croppedAreaPixels, focal, tool]);
    var handleApplyCrop = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var img, cropArea, blob, dataUrl, cropped, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!loaded || !croppedAreaPixels) {
                        return [2 /*return*/];
                    }
                    setApplyingCrop(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, createImage(loaded.dataUrl)];
                case 2:
                    img = _a.sent();
                    return [4 /*yield*/, resolveCropArea(img)];
                case 3:
                    cropArea = _a.sent();
                    return [4 /*yield*/, getCroppedImageBlob(loaded.dataUrl, cropArea, DEFAULT_ADJUSTMENTS, undefined, undefined, 'image/png', 0.92, EMPTY_DRAW_STATE)];
                case 4:
                    blob = _a.sent();
                    return [4 /*yield*/, blobToDataUrl(blob)];
                case 5:
                    dataUrl = _a.sent();
                    return [4 /*yield*/, createImage(dataUrl)];
                case 6:
                    cropped = _a.sent();
                    setLoaded(__assign(__assign({}, loaded), { dataUrl: dataUrl }));
                    setCroppedAreaPixels(fullImageCrop(cropped.naturalWidth, cropped.naturalHeight));
                    setAspect(undefined);
                    setCanvasView(DEFAULT_CANVAS_VIEW);
                    dispatch(showSystemNotification({
                        message: "Crop applied \u2014 working image is now ".concat(cropped.naturalWidth, " \u00D7 ").concat(cropped.naturalHeight, "px"),
                        options: { variant: 'success' }
                    }));
                    return [3 /*break*/, 9];
                case 7:
                    e_2 = _a.sent();
                    handleError("Apply crop failed: ".concat(e_2.message));
                    return [3 /*break*/, 9];
                case 8:
                    setApplyingCrop(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); }, [croppedAreaPixels, dispatch, handleError, loaded, resolveCropArea]);
    var handleSave = function (options) { return __awaiter(_this, void 0, void 0, function () {
        var img, cropArea, outW, outH, targetPath, _a, folderPath, fileName, mimeType, ext, blob, savedDataUrl, uploadFileName, file, savedFullPath, nextImage, e_3;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!loaded || !siteId) {
                        return [2 /*return*/];
                    }
                    setSaving(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 10, 11, 12]);
                    return [4 /*yield*/, createImage(loaded.dataUrl)];
                case 2:
                    img = _c.sent();
                    return [4 /*yield*/, resolveCropArea(img)];
                case 3:
                    cropArea = _c.sent();
                    outW = outputWidth === '' ? undefined : Number(outputWidth);
                    outH = outputHeight === '' ? undefined : Number(outputHeight);
                    targetPath = options.fullPath;
                    _a = splitStaticAssetPath(targetPath), folderPath = _a.folderPath, fileName = _a.fileName;
                    mimeType = options.mode === 'replace' ? (_b = mimeTypeForPath(targetPath)) !== null && _b !== void 0 ? _b : options.mimeType : options.mimeType;
                    ext = mimeType === 'image/jpeg' ? '.jpg' : mimeType === 'image/webp' ? '.webp' : '.png';
                    return [4 /*yield*/, getCroppedImageBlob(loaded.dataUrl, cropArea, adjustments, outW, outH, mimeType, options.quality, drawState, outputBackground)];
                case 4:
                    blob = _c.sent();
                    return [4 /*yield*/, blobToDataUrl(blob)];
                case 5:
                    savedDataUrl = _c.sent();
                    uploadFileName = fileName.endsWith(ext) ? fileName : "".concat(fileName.replace(/\.[^.]+$/, '')).concat(ext);
                    file = dataUrlToFile(savedDataUrl, uploadFileName, mimeType);
                    return [4 /*yield*/, uploadDataUrl(siteId, file, folderPath, '_csrf')
                            .pipe(filter(function (event) { return event.type === 'complete'; }), take(1))
                            .toPromise()];
                case 6:
                    _c.sent();
                    savedFullPath = "".concat(folderPath).concat(uploadFileName);
                    if (!(options.contentFieldLink && siteId)) return [3 /*break*/, 8];
                    return [4 /*yield*/, updateContentImageField(siteId, options.contentFieldLink.contentPath, options.contentFieldLink.objectId, options.contentFieldLink.fieldId, savedFullPath)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    dispatch(showSystemNotification({
                        message: options.contentFieldLink
                            ? "Image saved and ".concat(options.contentFieldLink.fieldTitle, " updated")
                            : "Image saved to ".concat(savedFullPath),
                        options: { variant: 'success' }
                    }));
                    setSaveOpen(false);
                    return [4 /*yield*/, createImage(savedDataUrl)];
                case 9:
                    nextImage = _c.sent();
                    setLoaded({ dataUrl: savedDataUrl, sourcePath: savedFullPath, name: uploadFileName });
                    setCroppedAreaPixels(fullImageCrop(nextImage.naturalWidth, nextImage.naturalHeight));
                    return [3 /*break*/, 12];
                case 10:
                    e_3 = _c.sent();
                    handleError("Save failed: ".concat(e_3.message));
                    return [3 /*break*/, 12];
                case 11:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    var suggestedSaveName = loaded
        ? loaded.sourcePath
            ? (_b = suggestVariantFilename(loaded.sourcePath).split('/').pop()) !== null && _b !== void 0 ? _b : loaded.name
            : loaded.name
        : 'image.png';
    return (jsxs(Box$1, { sx: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }, children: [jsxs(DialogBody, { sx: {
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 0,
                    overflow: 'hidden',
                    bgcolor: alpha(theme.palette.background.default, 0.4)
                }, children: [jsxs(Box$1, { sx: {
                            px: 2.5,
                            pt: 1.5,
                            pb: 0,
                            borderBottom: 1,
                            borderColor: 'divider',
                            bgcolor: 'background.paper'
                        }, children: [jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", sx: { mb: 1 }, children: [jsxs(Tabs, { value: mainTab, onChange: function (_, v) { return setMainTab(v); }, sx: {
                                            minHeight: 40,
                                            '& .MuiTab-root': { minHeight: 40, py: 0.5, fontWeight: 500 }
                                        }, children: [jsx(Tab, { value: "studio", label: "Editor" }), jsx(Tab, { value: "requirements", label: "Size requirements", icon: jsx(InfoOutlinedIcon, { sx: { fontSize: 18 } }), iconPosition: "start" })] }), loaded && mainTab === 'studio' && (jsxs(Stack, { direction: "row", alignItems: "center", spacing: 0.5, children: [jsx(Tooltip, { title: isFullScreen ? 'Exit full screen' : 'Full screen', children: jsx(IconButton$1, { size: "small", onClick: function () { return dispatch(updateWidgetDialog({ isFullScreen: !isFullScreen })); }, children: isFullScreen ? (jsx(FullscreenExitRoundedIcon, { fontSize: "small" })) : (jsx(FullscreenRoundedIcon, { fontSize: "small" })) }) }), jsx(Tooltip, { title: "Load a different image", children: jsx(IconButton$1, { size: "small", onClick: function () { return setBrowseOpen(true); }, children: jsx(SwapHorizRoundedIcon, { fontSize: "small" }) }) })] }))] }), loaded && mainTab === 'studio' && (jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: "space-between", gap: 1.5, sx: { pb: 1.5 }, children: [jsxs(Box$1, { sx: { minWidth: 0 }, children: [jsx(Typography, { variant: "subtitle2", noWrap: true, sx: { fontWeight: 600 }, children: loaded.name }), loaded.sourcePath && (jsx(Typography, { variant: "caption", color: "text.secondary", noWrap: true, display: "block", children: loaded.sourcePath }))] }), jsx(ToggleButtonGroup, { size: "small", value: tool, exclusive: true, onChange: function (_, val) { return val && setTool(val); }, sx: {
                                            flexWrap: 'wrap',
                                            maxWidth: { xs: '100%', sm: 520 },
                                            '& .MuiToggleButton-root': {
                                                px: 1.5,
                                                gap: 0.5,
                                                borderRadius: 2,
                                                mx: 0.25,
                                                border: 0,
                                                '&.Mui-selected': {
                                                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                                                    color: 'primary.main'
                                                }
                                            }
                                        }, children: TOOL_OPTIONS.map(function (opt) { return (jsxs(ToggleButton, { value: opt.value, children: [opt.icon, opt.label] }, opt.value)); }) })] }))] }), jsxs(Box$1, { sx: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }, children: [mainTab === 'requirements' && (jsx(Box$1, { sx: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', p: 1.5, overflow: 'hidden' }, children: jsx(ImageSizeRequirementsPanel, { active: mainTab === 'requirements', appliedFieldId: appliedFieldId, onApplyConstraints: handleApplyConstraints, currentWidth: previewDimensions === null || previewDimensions === void 0 ? void 0 : previewDimensions.width, currentHeight: previewDimensions === null || previewDimensions === void 0 ? void 0 : previewDimensions.height }) })), mainTab === 'studio' && !loaded && (jsx(ImageStudioWelcome, { onFile: handleLocalFile, onBrowseRequest: function () { return setBrowseOpen(true); } })), mainTab === 'studio' && loaded && (jsx(Box$1, { sx: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', px: 1.5, py: 1 }, children: jsx(ImageStudioEditor, { imageSrc: loaded.dataUrl, tool: tool, adjustments: adjustments, onAdjustmentsChange: handleAdjustmentsChange, focal: focal, onFocalChange: setFocal, croppedAreaPixels: croppedAreaPixels, onCroppedAreaPixelsChange: setCroppedAreaPixels, aspect: aspect, onAspectChange: setAspect, outputWidth: outputWidth, outputHeight: outputHeight, onOutputWidthChange: setOutputWidth, onOutputHeightChange: setOutputHeight, lockOutputAspect: lockOutputAspect, onLockOutputAspectChange: setLockOutputAspect, outputBackground: outputBackground, onOutputBackgroundChange: setOutputBackground, onReset: resetEdits, filterPresetId: filterPresetId, onSelectFilterPreset: handleSelectFilterPreset, onTintChange: handleTintChange, drawState: drawState, onDrawStateChange: setDrawState, drawTool: drawTool, onDrawToolChange: setDrawTool, brushColor: brushColor, onBrushColorChange: setBrushColor, brushSize: brushSize, onBrushSizeChange: setBrushSize, textFontFamily: textFontFamily, onTextFontFamilyChange: setTextFontFamily, textFontSize: textFontSize, onTextFontSizeChange: setTextFontSize, canvasView: canvasView, onCanvasViewChange: setCanvasView, onApplyCrop: handleApplyCrop, applyingCrop: applyingCrop }) }))] })] }), jsx(Divider, {}), jsx(DialogFooter$1, { sx: { px: 2.5, py: 1.5, bgcolor: 'background.paper' }, children: jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", width: "100%", children: [loaded && previewDimensions ? (jsx(Chip, { size: "small", variant: "outlined", label: "".concat(previewDimensions.width, " \u00D7 ").concat(previewDimensions.height, "px"), sx: { fontWeight: 500 } })) : (jsx(Box$1, {})), jsx(MyLoadingButton, { variant: "contained", startIcon: jsx(SaveRoundedIcon, {}), disabled: !loaded, loading: saving, onClick: function () { return loaded && setSaveOpen(true); }, children: "Save image" })] }) }), jsx(ImageRepoBrowserDialog, { open: browseOpen, onClose: function () { return setBrowseOpen(false); }, defaultPath: defaultPath, guestOrigin: guestOrigin, onImageSelected: handleImageSelected, onError: handleError, loadRepoImage: loadRepoImage }), jsx(ImageStudioSaveDialog, { open: saveOpen, onClose: function () { return setSaveOpen(false); }, onSave: handleSave, saving: saving, defaultFolder: (loaded === null || loaded === void 0 ? void 0 : loaded.sourcePath) ? loaded.sourcePath.substring(0, loaded.sourcePath.lastIndexOf('/')) : defaultPath, sourcePath: loaded === null || loaded === void 0 ? void 0 : loaded.sourcePath, suggestedName: suggestedSaveName })] }));
}
function mimeTypeForPath(path) {
    var _a;
    var ext = (_a = path.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') {
        return 'image/jpeg';
    }
    if (ext === 'webp') {
        return 'image/webp';
    }
    if (ext === 'png') {
        return 'image/png';
    }
    return undefined;
}

function OpenImageStudioPanelButton(props) {
    var _a = props.title, title = _a === void 0 ? IMAGE_STUDIO_DEFAULTS.title : _a, _b = props.icon, icon = _b === void 0 ? IMAGE_STUDIO_DEFAULTS.icon : _b, _c = props.dialogTitle, dialogTitle = _c === void 0 ? title : _c, defaultPath = props.defaultPath;
    var handleClick = useOpenImageStudio({ title: dialogTitle, defaultPath: defaultPath });
    return jsx(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick });
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

function useItemsByPath() {
  return useSelection((state) => state.content.itemsByPath);
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

function usePreviewGuest() {
  return useSelector((state) => state.preview.guest);
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

function useCurrentPreviewItem() {
  const { path } = usePreviewGuest() ?? {};
  const items = useItemsByPath();
  return items?.[path];
}

var SourceItemTable = function (_a) {
    var sourceItem = _a.sourceItem, _b = _a.subheader, subheader = _b === void 0 ? 'Item selected in preview' : _b;
    return (jsxs(Card, { variant: "outlined", sx: {
            mx: 2.5,
            mb: 2,
            borderRadius: 2,
            boxShadow: function (theme) {
                return theme.palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(15, 23, 42, 0.06)';
            }
        }, children: [jsx(CardHeader, { avatar: jsx(ContentCopyOutlinedIcon, { color: "primary", sx: { opacity: 0.9 }, "aria-hidden": true }), title: "Source", titleTypographyProps: { variant: 'subtitle1', fontWeight: 600 }, subheader: subheader, subheaderTypographyProps: { variant: 'caption', color: 'text.secondary' } }), jsx(CardContent, { sx: { pt: 0 }, children: sourceItem ? (jsxs(Stack$1, { spacing: 1.25, children: [jsxs("div", { children: [jsx(Typography$1, { variant: "caption", color: "text.secondary", display: "block", gutterBottom: true, children: "Name" }), jsx(Typography$1, { variant: "body2", sx: { fontWeight: 500 }, children: sourceItem.name })] }), jsxs("div", { children: [jsx(Typography$1, { variant: "caption", color: "text.secondary", display: "block", gutterBottom: true, children: "Path" }), jsx(Typography$1, { variant: "body2", component: "code", sx: {
                                        display: 'block',
                                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                        fontSize: '0.8125rem',
                                        wordBreak: 'break-all',
                                        bgcolor: function (theme) {
                                            return theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : theme.palette.grey[100];
                                        },
                                        px: 1,
                                        py: 0.75,
                                        borderRadius: 1
                                    }, children: sourceItem.path })] })] })) : (jsxs(Stack$1, { direction: "row", alignItems: "center", spacing: 1, sx: { py: 0.5 }, children: [jsx(Chip$1, { size: "small", label: "No selection", color: "default", variant: "outlined" }), jsx(Typography$1, { variant: "body2", color: "text.secondary", children: "Select an item in preview to copy it." })] })) })] }));
};

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var MAX_CONCURRENT_GETS = 3;
var getQueue = [];
var activeGets = 0;
function pumpGetQueue() {
    var _loop_1 = function () {
        var job = getQueue.shift();
        activeGets += 1;
        get$1(job.url).subscribe({
            next: function (response) {
                activeGets -= 1;
                job.resolve(response);
                pumpGetQueue();
            },
            error: function (e) {
                activeGets -= 1;
                job.reject(e);
                pumpGetQueue();
            }
        });
    };
    while (activeGets < MAX_CONCURRENT_GETS && getQueue.length > 0) {
        _loop_1();
    }
}
var HttpUtils = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            getQueue.push({ url: url, resolve: resolve, reject: reject });
            pumpGetQueue();
        });
    },
    post: function (url, body, headers) {
        return new Promise(function (resolve, reject) {
            post(url, body, headers).subscribe({
                next: function (response) {
                    resolve(response);
                },
                error: function (e) {
                    reject(e);
                }
            });
        });
    }
};

/**
 * Multi–locale folder layout under paths like /site/website and /site/components.
 * Folder names must match repo locale roots (or aliases below).
 *
 * Catalog: full ISO 639-1 languages, common BCP-47 regional tags, ISO 3166-1 country/market
 * folder codes, and CMS aliases (us, uk, br, shared, …).
 */
/**
 * Canonical locale catalog: key = folder / config code (lowercase, hyphen).
 *
 * Includes:
 * - ISO 639-1 language codes
 * - Common BCP-47 regional tags (en-us, pt-br, zh-cn, …)
 * - ISO 3166-1 alpha-2 country/market folder codes (when not already a language code)
 * - CMS aliases (us, uk, br, jp, dk, se, shared, …)
 *
 * CMS alias precedence (intentional overrides of rare ISO language codes):
 * - `uk` = English (UK); use `ua` / `uk-ua` for Ukrainian
 * - `br` = Portuguese (Brazil); Breton is not exposed as a folder alias
 * - `ae` / `sa` / `tw` prefer market Arabic/Chinese labels over rare ISO language uses
 */
var LOCALE_CATALOG = {
    'aa': { label: 'Afar', flag: '🇪🇹' },
    'ab': { label: 'Abkhaz', flag: '🇬🇪' },
    'ad': { label: 'Andorra', flag: '🇦🇩' },
    'ae': { label: 'Arabic (UAE)', flag: '🇦🇪' },
    'af': { label: 'Afrikaans', flag: '🇿🇦' },
    'ag': { label: 'Antigua and Barbuda', flag: '🇦🇬' },
    'ai': { label: 'Anguilla', flag: '🇦🇮' },
    'ak': { label: 'Akan', flag: '🇬🇭' },
    'al': { label: 'Albania', flag: '🇦🇱' },
    'am': { label: 'Amharic', flag: '🇪🇹' },
    'an': { label: 'Aragonese', flag: '🇪🇸' },
    'ao': { label: 'Angola', flag: '🇦🇴' },
    'aq': { label: 'Antarctica', flag: '🇦🇶' },
    'ar': { label: 'Arabic', flag: '🇸🇦' },
    'ar-ae': { label: 'Arabic (UAE)', flag: '🇦🇪' },
    'ar-bh': { label: 'Arabic (Bahrain)', flag: '🇧🇭' },
    'ar-dz': { label: 'Arabic (Algeria)', flag: '🇩🇿' },
    'ar-eg': { label: 'Arabic (Egypt)', flag: '🇪🇬' },
    'ar-iq': { label: 'Arabic (Iraq)', flag: '🇮🇶' },
    'ar-jo': { label: 'Arabic (Jordan)', flag: '🇯🇴' },
    'ar-kw': { label: 'Arabic (Kuwait)', flag: '🇰🇼' },
    'ar-lb': { label: 'Arabic (Lebanon)', flag: '🇱🇧' },
    'ar-ly': { label: 'Arabic (Libya)', flag: '🇱🇾' },
    'ar-ma': { label: 'Arabic (Morocco)', flag: '🇲🇦' },
    'ar-om': { label: 'Arabic (Oman)', flag: '🇴🇲' },
    'ar-qa': { label: 'Arabic (Qatar)', flag: '🇶🇦' },
    'ar-sa': { label: 'Arabic (Saudi Arabia)', flag: '🇸🇦' },
    'ar-sy': { label: 'Arabic (Syria)', flag: '🇸🇾' },
    'ar-tn': { label: 'Arabic (Tunisia)', flag: '🇹🇳' },
    'ar-ye': { label: 'Arabic (Yemen)', flag: '🇾🇪' },
    'as': { label: 'Assamese', flag: '🇮🇳' },
    'at': { label: 'Austria', flag: '🇦🇹' },
    'au': { label: 'English (Australia)', flag: '🇦🇺' },
    'av': { label: 'Avaric', flag: '🇷🇺' },
    'aw': { label: 'Aruba', flag: '🇦🇼' },
    'ax': { label: 'Åland Islands', flag: '🇦🇽' },
    'ay': { label: 'Aymara', flag: '🇧🇴' },
    'az': { label: 'Azerbaijani', flag: '🇦🇿' },
    'ba': { label: 'Bashkir', flag: '🇷🇺' },
    'bb': { label: 'Barbados', flag: '🇧🇧' },
    'bd': { label: 'Bangladesh', flag: '🇧🇩' },
    'be': { label: 'Belarusian', flag: '🇧🇾' },
    'bf': { label: 'Burkina Faso', flag: '🇧🇫' },
    'bg': { label: 'Bulgarian', flag: '🇧🇬' },
    'bh': { label: 'Bihari', flag: '🇮🇳' },
    'bi': { label: 'Bislama', flag: '🇻🇺' },
    'bj': { label: 'Benin', flag: '🇧🇯' },
    'bl': { label: 'Saint Barthélemy', flag: '🇧🇱' },
    'bm': { label: 'Bambara', flag: '🇲🇱' },
    'bn': { label: 'Bengali', flag: '🇧🇩' },
    'bn-bd': { label: 'Bengali (Bangladesh)', flag: '🇧🇩' },
    'bn-in': { label: 'Bengali (India)', flag: '🇮🇳' },
    'bo': { label: 'Tibetan Standard', flag: '🇨🇳' },
    'bq': { label: 'Bonaire, Sint Eustatius and Saba', flag: '🇧🇶' },
    'br': { label: 'Portuguese (Brazil)', flag: '🇧🇷' },
    'bs': { label: 'Bosnian', flag: '🇧🇦' },
    'bt': { label: 'Bhutan', flag: '🇧🇹' },
    'bv': { label: 'Bouvet Island', flag: '🇧🇻' },
    'bw': { label: 'Botswana', flag: '🇧🇼' },
    'by': { label: 'Belarus', flag: '🇧🇾' },
    'bz': { label: 'Belize', flag: '🇧🇿' },
    'ca': { label: 'Catalan', flag: '🇦🇩' },
    'cc': { label: 'Cocos (Keeling) Islands', flag: '🇨🇨' },
    'cd': { label: 'Congo, Democratic Republic of the', flag: '🇨🇩' },
    'ce': { label: 'Chechen', flag: '🇷🇺' },
    'cf': { label: 'Central African Republic', flag: '🇨🇫' },
    'cg': { label: 'Congo', flag: '🇨🇬' },
    'ch': { label: 'Chamorro', flag: '🇬🇺' },
    'ci': { label: 'Côte d\'Ivoire', flag: '🇨🇮' },
    'ck': { label: 'Cook Islands', flag: '🇨🇰' },
    'cl': { label: 'Chile', flag: '🇨🇱' },
    'cm': { label: 'Cameroon', flag: '🇨🇲' },
    'cn': { label: 'Chinese', flag: '🇨🇳' },
    'co': { label: 'Corsican', flag: '🇫🇷' },
    'common': { label: 'Common', flag: '🌐' },
    'cr': { label: 'Cree', flag: '🇨🇦' },
    'cs': { label: 'Czech', flag: '🇨🇿' },
    'cu': { label: 'Old Church Slavonic', flag: '🇷🇺' },
    'cv': { label: 'Chuvash', flag: '🇷🇺' },
    'cw': { label: 'Curaçao', flag: '🇨🇼' },
    'cx': { label: 'Christmas Island', flag: '🇨🇽' },
    'cy': { label: 'Welsh', flag: '🇬🇧' },
    'cz': { label: 'Czechia', flag: '🇨🇿' },
    'da': { label: 'Danish', flag: '🇩🇰' },
    'de': { label: 'German', flag: '🇩🇪' },
    'de-at': { label: 'German (Austria)', flag: '🇦🇹' },
    'de-ch': { label: 'German (Switzerland)', flag: '🇨🇭' },
    'de-de': { label: 'German (Germany)', flag: '🇩🇪' },
    'de-li': { label: 'German (Liechtenstein)', flag: '🇱🇮' },
    'de-lu': { label: 'German (Luxembourg)', flag: '🇱🇺' },
    'dj': { label: 'Djibouti', flag: '🇩🇯' },
    'dk': { label: 'Danish', flag: '🇩🇰' },
    'dm': { label: 'Dominica', flag: '🇩🇲' },
    'do': { label: 'Dominican Republic', flag: '🇩🇴' },
    'dv': { label: 'Divehi', flag: '🇲🇻' },
    'dz': { label: 'Dzongkha', flag: '🇧🇹' },
    'ec': { label: 'Ecuador', flag: '🇪🇨' },
    'ee': { label: 'Ewe', flag: '🇬🇭' },
    'eg': { label: 'Egypt', flag: '🇪🇬' },
    'eh': { label: 'Western Sahara', flag: '🇪🇭' },
    'el': { label: 'Greek (modern)', flag: '🇬🇷' },
    'en': { label: 'English', flag: '🇺🇸' },
    'en-au': { label: 'English (Australia)', flag: '🇦🇺' },
    'en-bz': { label: 'English (Belize)', flag: '🇧🇿' },
    'en-ca': { label: 'English (Canada)', flag: '🇨🇦' },
    'en-gb': { label: 'English (UK)', flag: '🇬🇧' },
    'en-hk': { label: 'English (Hong Kong)', flag: '🇭🇰' },
    'en-ie': { label: 'English (Ireland)', flag: '🇮🇪' },
    'en-in': { label: 'English (India)', flag: '🇮🇳' },
    'en-jm': { label: 'English (Jamaica)', flag: '🇯🇲' },
    'en-my': { label: 'English (Malaysia)', flag: '🇲🇾' },
    'en-nz': { label: 'English (New Zealand)', flag: '🇳🇿' },
    'en-ph': { label: 'English (Philippines)', flag: '🇵🇭' },
    'en-sg': { label: 'English (Singapore)', flag: '🇸🇬' },
    'en-tt': { label: 'English (Trinidad & Tobago)', flag: '🇹🇹' },
    'en-us': { label: 'English (US)', flag: '🇺🇸' },
    'en-za': { label: 'English (South Africa)', flag: '🇿🇦' },
    'en-zw': { label: 'English (Zimbabwe)', flag: '🇿🇼' },
    'eo': { label: 'Esperanto', flag: '🌐' },
    'er': { label: 'Eritrea', flag: '🇪🇷' },
    'es': { label: 'Spanish', flag: '🇪🇸' },
    'es-ar': { label: 'Spanish (Argentina)', flag: '🇦🇷' },
    'es-bo': { label: 'Spanish (Bolivia)', flag: '🇧🇴' },
    'es-cl': { label: 'Spanish (Chile)', flag: '🇨🇱' },
    'es-co': { label: 'Spanish (Colombia)', flag: '🇨🇴' },
    'es-cr': { label: 'Spanish (Costa Rica)', flag: '🇨🇷' },
    'es-do': { label: 'Spanish (Dominican Republic)', flag: '🇩🇴' },
    'es-ec': { label: 'Spanish (Ecuador)', flag: '🇪🇨' },
    'es-es': { label: 'Spanish (Spain)', flag: '🇪🇸' },
    'es-gt': { label: 'Spanish (Guatemala)', flag: '🇬🇹' },
    'es-hn': { label: 'Spanish (Honduras)', flag: '🇭🇳' },
    'es-mx': { label: 'Spanish (Mexico)', flag: '🇲🇽' },
    'es-ni': { label: 'Spanish (Nicaragua)', flag: '🇳🇮' },
    'es-pa': { label: 'Spanish (Panama)', flag: '🇵🇦' },
    'es-pe': { label: 'Spanish (Peru)', flag: '🇵🇪' },
    'es-pr': { label: 'Spanish (Puerto Rico)', flag: '🇵🇷' },
    'es-py': { label: 'Spanish (Paraguay)', flag: '🇵🇾' },
    'es-sv': { label: 'Spanish (El Salvador)', flag: '🇸🇻' },
    'es-uy': { label: 'Spanish (Uruguay)', flag: '🇺🇾' },
    'es-ve': { label: 'Spanish (Venezuela)', flag: '🇻🇪' },
    'et': { label: 'Estonian', flag: '🇪🇪' },
    'eu': { label: 'Basque', flag: '🇪🇸' },
    'fa': { label: 'Persian (Farsi)', flag: '🇮🇷' },
    'ff': { label: 'Fula', flag: '🇸🇳' },
    'fi': { label: 'Finnish', flag: '🇫🇮' },
    'fj': { label: 'Fijian', flag: '🇫🇯' },
    'fk': { label: 'Falkland Islands (Malvinas)', flag: '🇫🇰' },
    'fm': { label: 'Micronesia, Federated States of', flag: '🇫🇲' },
    'fo': { label: 'Faroese', flag: '🇫🇴' },
    'fr': { label: 'French', flag: '🇫🇷' },
    'fr-be': { label: 'French (Belgium)', flag: '🇧🇪' },
    'fr-ca': { label: 'French (Canada)', flag: '🇨🇦' },
    'fr-ch': { label: 'French (Switzerland)', flag: '🇨🇭' },
    'fr-fr': { label: 'French (France)', flag: '🇫🇷' },
    'fr-lu': { label: 'French (Luxembourg)', flag: '🇱🇺' },
    'fr-mc': { label: 'French (Monaco)', flag: '🇲🇨' },
    'fy': { label: 'Western Frisian', flag: '🇳🇱' },
    'ga': { label: 'Irish', flag: '🇮🇪' },
    'gb': { label: 'English (UK)', flag: '🇬🇧' },
    'gd': { label: 'Scottish Gaelic', flag: '🇬🇧' },
    'ge': { label: 'Georgia', flag: '🇬🇪' },
    'gf': { label: 'French Guiana', flag: '🇬🇫' },
    'gg': { label: 'Guernsey', flag: '🇬🇬' },
    'gh': { label: 'Ghana', flag: '🇬🇭' },
    'gi': { label: 'Gibraltar', flag: '🇬🇮' },
    'gl': { label: 'Galician', flag: '🇪🇸' },
    'global': { label: 'Global', flag: '🌐' },
    'gm': { label: 'Gambia', flag: '🇬🇲' },
    'gn': { label: 'Guaraní', flag: '🇵🇾' },
    'gp': { label: 'Guadeloupe', flag: '🇬🇵' },
    'gq': { label: 'Equatorial Guinea', flag: '🇬🇶' },
    'gr': { label: 'Greece', flag: '🇬🇷' },
    'gs': { label: 'South Georgia and the South Sandwich Islands', flag: '🇬🇸' },
    'gt': { label: 'Guatemala', flag: '🇬🇹' },
    'gu': { label: 'Gujarati', flag: '🇮🇳' },
    'gv': { label: 'Manx', flag: '🇮🇲' },
    'gw': { label: 'Guinea-Bissau', flag: '🇬🇼' },
    'gy': { label: 'Guyana', flag: '🇬🇾' },
    'ha': { label: 'Hausa', flag: '🇳🇬' },
    'he': { label: 'Hebrew (modern)', flag: '🇮🇱' },
    'hi': { label: 'Hindi', flag: '🇮🇳' },
    'hk': { label: 'Chinese (Hong Kong)', flag: '🇭🇰' },
    'hm': { label: 'Heard Island and McDonald Islands', flag: '🇭🇲' },
    'hn': { label: 'Honduras', flag: '🇭🇳' },
    'ho': { label: 'Hiri Motu', flag: '🇵🇬' },
    'hr': { label: 'Croatian', flag: '🇭🇷' },
    'ht': { label: 'Haitian', flag: '🇭🇹' },
    'hu': { label: 'Hungarian', flag: '🇭🇺' },
    'hy': { label: 'Armenian', flag: '🇦🇲' },
    'hz': { label: 'Herero', flag: '🇳🇦' },
    'ia': { label: 'Interlingua', flag: '🌐' },
    'id': { label: 'Indonesian', flag: '🇮🇩' },
    'ie': { label: 'Interlingue', flag: '🌐' },
    'ig': { label: 'Igbo', flag: '🇳🇬' },
    'ii': { label: 'Nuosu', flag: '🇨🇳' },
    'ik': { label: 'Inupiaq', flag: '🇺🇸' },
    'il': { label: 'Israel', flag: '🇮🇱' },
    'im': { label: 'Isle of Man', flag: '🇮🇲' },
    'in': { label: 'India', flag: '🇮🇳' },
    'io': { label: 'Ido', flag: '🌐' },
    'iq': { label: 'Iraq', flag: '🇮🇶' },
    'ir': { label: 'Iran, Islamic Republic of', flag: '🇮🇷' },
    'is': { label: 'Icelandic', flag: '🇮🇸' },
    'it': { label: 'Italian', flag: '🇮🇹' },
    'it-ch': { label: 'Italian (Switzerland)', flag: '🇨🇭' },
    'it-it': { label: 'Italian (Italy)', flag: '🇮🇹' },
    'iu': { label: 'Inuktitut', flag: '🇨🇦' },
    'ja': { label: 'Japanese', flag: '🇯🇵' },
    'ja-jp': { label: 'Japanese (Japan)', flag: '🇯🇵' },
    'je': { label: 'Jersey', flag: '🇯🇪' },
    'jm': { label: 'Jamaica', flag: '🇯🇲' },
    'jo': { label: 'Jordan', flag: '🇯🇴' },
    'jp': { label: 'Japanese', flag: '🇯🇵' },
    'jv': { label: 'Javanese', flag: '🇮🇩' },
    'ka': { label: 'Georgian', flag: '🇬🇪' },
    'ke': { label: 'Kenya', flag: '🇰🇪' },
    'kg': { label: 'Kongo', flag: '🇨🇩' },
    'kh': { label: 'Cambodia', flag: '🇰🇭' },
    'ki': { label: 'Kikuyu', flag: '🇰🇪' },
    'kj': { label: 'Kwanyama', flag: '🇳🇦' },
    'kk': { label: 'Kazakh', flag: '🇰🇿' },
    'kl': { label: 'Kalaallisut', flag: '🇬🇱' },
    'km': { label: 'Khmer', flag: '🇰🇭' },
    'kn': { label: 'Kannada', flag: '🇮🇳' },
    'ko': { label: 'Korean', flag: '🇰🇷' },
    'ko-kr': { label: 'Korean (Korea)', flag: '🇰🇷' },
    'kp': { label: 'Korea, Democratic People\'s Republic of', flag: '🇰🇵' },
    'kr': { label: 'Korean', flag: '🇰🇷' },
    'ks': { label: 'Kashmiri', flag: '🇮🇳' },
    'ku': { label: 'Kurdish', flag: '🇮🇶' },
    'kv': { label: 'Komi', flag: '🇷🇺' },
    'kw': { label: 'Cornish', flag: '🇬🇧' },
    'ky': { label: 'Kyrgyz', flag: '🇰🇬' },
    'kz': { label: 'Kazakhstan', flag: '🇰🇿' },
    'la': { label: 'Latin', flag: '🇻🇦' },
    'lb': { label: 'Luxembourgish', flag: '🇱🇺' },
    'lc': { label: 'Saint Lucia', flag: '🇱🇨' },
    'lg': { label: 'Ganda', flag: '🇺🇬' },
    'li': { label: 'Limburgish', flag: '🇳🇱' },
    'lk': { label: 'Sri Lanka', flag: '🇱🇰' },
    'ln': { label: 'Lingala', flag: '🇨🇩' },
    'lo': { label: 'Lao', flag: '🇱🇦' },
    'lr': { label: 'Liberia', flag: '🇱🇷' },
    'ls': { label: 'Lesotho', flag: '🇱🇸' },
    'lt': { label: 'Lithuanian', flag: '🇱🇹' },
    'lu': { label: 'Luba-Katanga', flag: '🇨🇩' },
    'lv': { label: 'Latvian', flag: '🇱🇻' },
    'ly': { label: 'Libya', flag: '🇱🇾' },
    'ma': { label: 'Morocco', flag: '🇲🇦' },
    'mc': { label: 'Monaco', flag: '🇲🇨' },
    'md': { label: 'Moldova, Republic of', flag: '🇲🇩' },
    'me': { label: 'Montenegro', flag: '🇲🇪' },
    'mf': { label: 'Saint Martin (French part)', flag: '🇲🇫' },
    'mg': { label: 'Malagasy', flag: '🇲🇬' },
    'mh': { label: 'Marshallese', flag: '🇲🇭' },
    'mi': { label: 'Māori', flag: '🇳🇿' },
    'mk': { label: 'Macedonian', flag: '🇲🇰' },
    'ml': { label: 'Malayalam', flag: '🇮🇳' },
    'mm': { label: 'Myanmar', flag: '🇲🇲' },
    'mn': { label: 'Mongolian', flag: '🇲🇳' },
    'mo': { label: 'Macao', flag: '🇲🇴' },
    'mp': { label: 'Northern Mariana Islands', flag: '🇲🇵' },
    'mq': { label: 'Martinique', flag: '🇲🇶' },
    'mr': { label: 'Marathi (Marāṭhī)', flag: '🇮🇳' },
    'ms': { label: 'Malay', flag: '🇲🇾' },
    'mt': { label: 'Maltese', flag: '🇲🇹' },
    'mu': { label: 'Mauritius', flag: '🇲🇺' },
    'mv': { label: 'Maldives', flag: '🇲🇻' },
    'mw': { label: 'Malawi', flag: '🇲🇼' },
    'mx': { label: 'Spanish (Mexico)', flag: '🇲🇽' },
    'my': { label: 'Burmese', flag: '🇲🇲' },
    'mz': { label: 'Mozambique', flag: '🇲🇿' },
    'na': { label: 'Nauruan', flag: '🇳🇷' },
    'nb': { label: 'Norwegian Bokmål', flag: '🇳🇴' },
    'nb-no': { label: 'Norwegian Bokmål (Norway)', flag: '🇳🇴' },
    'nc': { label: 'New Caledonia', flag: '🇳🇨' },
    'nd': { label: 'Northern Ndebele', flag: '🇿🇼' },
    'ne': { label: 'Nepali', flag: '🇳🇵' },
    'nf': { label: 'Norfolk Island', flag: '🇳🇫' },
    'ng': { label: 'Ndonga', flag: '🇳🇦' },
    'ni': { label: 'Nicaragua', flag: '🇳🇮' },
    'nl': { label: 'Dutch', flag: '🇳🇱' },
    'nl-be': { label: 'Dutch (Belgium)', flag: '🇧🇪' },
    'nl-nl': { label: 'Dutch (Netherlands)', flag: '🇳🇱' },
    'nn': { label: 'Norwegian Nynorsk', flag: '🇳🇴' },
    'nn-no': { label: 'Norwegian Nynorsk (Norway)', flag: '🇳🇴' },
    'no': { label: 'Norwegian', flag: '🇳🇴' },
    'np': { label: 'Nepal', flag: '🇳🇵' },
    'nr': { label: 'Southern Ndebele', flag: '🇿🇦' },
    'nu': { label: 'Niue', flag: '🇳🇺' },
    'nv': { label: 'Navajo', flag: '🇺🇸' },
    'ny': { label: 'Chichewa', flag: '🇲🇼' },
    'nz': { label: 'New Zealand', flag: '🇳🇿' },
    'oc': { label: 'Occitan', flag: '🇫🇷' },
    'oj': { label: 'Ojibwe', flag: '🇨🇦' },
    'om': { label: 'Oromo', flag: '🇪🇹' },
    'or': { label: 'Oriya', flag: '🇮🇳' },
    'os': { label: 'Ossetian', flag: '🇬🇪' },
    'pa': { label: '(Eastern) Punjabi', flag: '🇮🇳' },
    'pe': { label: 'Peru', flag: '🇵🇪' },
    'pf': { label: 'French Polynesia', flag: '🇵🇫' },
    'pg': { label: 'Papua New Guinea', flag: '🇵🇬' },
    'ph': { label: 'Philippines', flag: '🇵🇭' },
    'pi': { label: 'Pāli', flag: '🇮🇳' },
    'pk': { label: 'Pakistan', flag: '🇵🇰' },
    'pl': { label: 'Polish', flag: '🇵🇱' },
    'pm': { label: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    'pn': { label: 'Pitcairn', flag: '🇵🇳' },
    'pr': { label: 'Puerto Rico', flag: '🇵🇷' },
    'ps': { label: 'Pashto', flag: '🇦🇫' },
    'pt': { label: 'Portuguese', flag: '🇵🇹' },
    'pt-ao': { label: 'Portuguese (Angola)', flag: '🇦🇴' },
    'pt-br': { label: 'Portuguese (Brazil)', flag: '🇧🇷' },
    'pt-pt': { label: 'Portuguese (Portugal)', flag: '🇵🇹' },
    'pw': { label: 'Palau', flag: '🇵🇼' },
    'py': { label: 'Paraguay', flag: '🇵🇾' },
    'qa': { label: 'Qatar', flag: '🇶🇦' },
    'qu': { label: 'Quechua', flag: '🇵🇪' },
    're': { label: 'Réunion', flag: '🇷🇪' },
    'rm': { label: 'Romansh', flag: '🇨🇭' },
    'rn': { label: 'Kirundi', flag: '🇧🇮' },
    'ro': { label: 'Romanian', flag: '🇷🇴' },
    'rs': { label: 'Serbia', flag: '🇷🇸' },
    'ru': { label: 'Russian', flag: '🇷🇺' },
    'ru-ru': { label: 'Russian (Russia)', flag: '🇷🇺' },
    'rw': { label: 'Kinyarwanda', flag: '🇷🇼' },
    'sa': { label: 'Arabic (Saudi Arabia)', flag: '🇸🇦' },
    'sb': { label: 'Solomon Islands', flag: '🇸🇧' },
    'sc': { label: 'Sardinian', flag: '🇮🇹' },
    'sd': { label: 'Sindhi', flag: '🇵🇰' },
    'se': { label: 'Swedish', flag: '🇸🇪' },
    'sg': { label: 'Sango', flag: '🇨🇫' },
    'sh': { label: 'Saint Helena, Ascension and Tristan da Cunha', flag: '🇸🇭' },
    'shared': { label: 'Shared', flag: '🌐' },
    'si': { label: 'Sinhalese', flag: '🇱🇰' },
    'sj': { label: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
    'sk': { label: 'Slovak', flag: '🇸🇰' },
    'sl': { label: 'Slovene', flag: '🇸🇮' },
    'sm': { label: 'Samoan', flag: '🇼🇸' },
    'sn': { label: 'Shona', flag: '🇿🇼' },
    'so': { label: 'Somali', flag: '🇸🇴' },
    'sq': { label: 'Albanian', flag: '🇦🇱' },
    'sr': { label: 'Serbian', flag: '🇷🇸' },
    'ss': { label: 'Swati', flag: '🇸🇿' },
    'st': { label: 'Southern Sotho', flag: '🇱🇸' },
    'su': { label: 'Sundanese', flag: '🇮🇩' },
    'sv': { label: 'Swedish', flag: '🇸🇪' },
    'sv-fi': { label: 'Swedish (Finland)', flag: '🇫🇮' },
    'sv-se': { label: 'Swedish (Sweden)', flag: '🇸🇪' },
    'sw': { label: 'Swahili', flag: '🇹🇿' },
    'sx': { label: 'Sint Maarten (Dutch part)', flag: '🇸🇽' },
    'sy': { label: 'Syrian Arab Republic', flag: '🇸🇾' },
    'sz': { label: 'Eswatini', flag: '🇸🇿' },
    'ta': { label: 'Tamil', flag: '🇮🇳' },
    'tc': { label: 'Turks and Caicos Islands', flag: '🇹🇨' },
    'td': { label: 'Chad', flag: '🇹🇩' },
    'te': { label: 'Telugu', flag: '🇮🇳' },
    'tf': { label: 'French Southern Territories', flag: '🇹🇫' },
    'tg': { label: 'Tajik', flag: '🇹🇯' },
    'th': { label: 'Thai', flag: '🇹🇭' },
    'ti': { label: 'Tigrinya', flag: '🇪🇷' },
    'tj': { label: 'Tajikistan', flag: '🇹🇯' },
    'tk': { label: 'Turkmen', flag: '🇹🇲' },
    'tl': { label: 'Tagalog', flag: '🇵🇭' },
    'tm': { label: 'Turkmenistan', flag: '🇹🇲' },
    'tn': { label: 'Tswana', flag: '🇧🇼' },
    'to': { label: 'Tonga (Tonga Islands)', flag: '🇹🇴' },
    'tr': { label: 'Turkish', flag: '🇹🇷' },
    'ts': { label: 'Tsonga', flag: '🇿🇦' },
    'tt': { label: 'Tatar', flag: '🇷🇺' },
    'tv': { label: 'Tuvalu', flag: '🇹🇻' },
    'tw': { label: 'Chinese (Traditional)', flag: '🇹🇼' },
    'ty': { label: 'Tahitian', flag: '🇵🇫' },
    'tz': { label: 'Tanzania, United Republic of', flag: '🇹🇿' },
    'ua': { label: 'Ukrainian', flag: '🇺🇦' },
    'ug': { label: 'Uyghur', flag: '🇨🇳' },
    'uk': { label: 'English (UK)', flag: '🇬🇧' },
    'uk-ua': { label: 'Ukrainian (Ukraine)', flag: '🇺🇦' },
    'um': { label: 'United States Minor Outlying Islands', flag: '🇺🇲' },
    'ur': { label: 'Urdu', flag: '🇵🇰' },
    'us': { label: 'English (US)', flag: '🇺🇸' },
    'uy': { label: 'Uruguay', flag: '🇺🇾' },
    'uz': { label: 'Uzbek', flag: '🇺🇿' },
    'va': { label: 'Holy See', flag: '🇻🇦' },
    'vc': { label: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
    've': { label: 'Venda', flag: '🇿🇦' },
    'vg': { label: 'Virgin Islands (British)', flag: '🇻🇬' },
    'vi': { label: 'Vietnamese', flag: '🇻🇳' },
    'vn': { label: 'Viet Nam', flag: '🇻🇳' },
    'vo': { label: 'Volapük', flag: '🌐' },
    'vu': { label: 'Vanuatu', flag: '🇻🇺' },
    'wa': { label: 'Walloon', flag: '🇧🇪' },
    'wf': { label: 'Wallis and Futuna', flag: '🇼🇫' },
    'wo': { label: 'Wolof', flag: '🇸🇳' },
    'ws': { label: 'Samoa', flag: '🇼🇸' },
    'xh': { label: 'Xhosa', flag: '🇿🇦' },
    'ye': { label: 'Yemen', flag: '🇾🇪' },
    'yi': { label: 'Yiddish', flag: '🇮🇱' },
    'yo': { label: 'Yoruba', flag: '🇳🇬' },
    'yt': { label: 'Mayotte', flag: '🇾🇹' },
    'za': { label: 'Zhuang', flag: '🇨🇳' },
    'zh': { label: 'Chinese', flag: '🇨🇳' },
    'zh-cn': { label: 'Chinese (Simplified)', flag: '🇨🇳' },
    'zh-hk': { label: 'Chinese (Hong Kong)', flag: '🇭🇰' },
    'zh-mo': { label: 'Chinese (Macau)', flag: '🇲🇴' },
    'zh-sg': { label: 'Chinese (Singapore)', flag: '🇸🇬' },
    'zh-tw': { label: 'Chinese (Traditional)', flag: '🇹🇼' },
    'zm': { label: 'Zambia', flag: '🇿🇲' },
    'zu': { label: 'Zulu', flag: '🇿🇦' },
    'zw': { label: 'Zimbabwe', flag: '🇿🇼' }
};
/** @deprecated Prefer LOCALE_CATALOG — kept for existing imports. */
var LOCALE_META = LOCALE_CATALOG;
/** @deprecated Prefer getFlagForLocale / LOCALE_CATALOG. */
Object.fromEntries(Object.entries(LOCALE_CATALOG).map(function (_a) {
    var code = _a[0], meta = _a[1];
    return [code, meta.flag];
}));
/**
 * Codes used when detecting locale folders without a site translation-config.xml.
 * Includes ISO codes and common CMS aliases.
 */
var MULTI_LOCALE_CODES = Object.keys(LOCALE_CATALOG).sort(function (a, b) {
    return a.localeCompare(b);
});
function getLocaleMeta(localeCode) {
    var _a, _b;
    var k = String(localeCode || '')
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
    if (!k) {
        return { label: '', flag: '🌐' };
    }
    return ((_b = (_a = LOCALE_CATALOG[k]) !== null && _a !== void 0 ? _a : LOCALE_CATALOG[k.slice(0, 2)]) !== null && _b !== void 0 ? _b : {
        label: k,
        flag: '🌐'
    });
}
function getFlagForLocale(localeCode) {
    return getLocaleMeta(localeCode).flag || '🌐';
}
/** Avoid redundant `setTranslationConfig` when API returns a new object with the same locale list (prevents load/effect loops). */
function translationConfigsEqual(a, b) {
    var _a, _b;
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (a.baseLanguage !== b.baseLanguage) {
        return false;
    }
    if (a.languages.length !== b.languages.length) {
        return false;
    }
    for (var i = 0; i < a.languages.length; i += 1) {
        var x = a.languages[i];
        var y = b.languages[i];
        if (x.locale !== y.locale || x.label !== y.label) {
            return false;
        }
        var xf = (_a = x.flag) !== null && _a !== void 0 ? _a : '';
        var yf = (_b = y.flag) !== null && _b !== void 0 ? _b : '';
        if (xf !== yf) {
            return false;
        }
    }
    return true;
}
/** True when translation-config.xml defines at least a base locale and one target (two or more entries). */
function hasConfiguredTranslationLocales(config) {
    var _a, _b;
    return ((_b = (_a = config === null || config === void 0 ? void 0 : config.languages) === null || _a === void 0 ? void 0 : _a.filter(function (l) { return Boolean(l.locale); }).length) !== null && _b !== void 0 ? _b : 0) >= 2;
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Same GET transport as `translation-versions` `studioAjaxGet`: `craftercms.utils.ajax` when present (preview/auth),
 * otherwise `@craftercms/studio-ui/utils/ajax` via HttpUtils.
 */
function studioPluginScriptGet(url) {
    var _a, _b;
    try {
        var ajax_1 = typeof window !== 'undefined' ? (_b = (_a = window.craftercms) === null || _a === void 0 ? void 0 : _a.utils) === null || _b === void 0 ? void 0 : _b.ajax : null;
        if (ajax_1 && typeof ajax_1.get === 'function') {
            return new Promise(function (resolve, reject) {
                ajax_1.get(url).subscribe({
                    next: function (r) { return resolve(r); },
                    error: function (e) { return reject(e); }
                });
            });
        }
    }
    catch (_c) {
        /* ignore */
    }
    return HttpUtils.get(url);
}
/** Same unwrap + nested `result` as `translation-versions` (`unwrapAjaxResponse` + `fetchTranslationConfig` / `extractPathsFromPluginResult`). */
function parsePluginScriptPayload(res) {
    var _a, _b;
    if (res == null) {
        return null;
    }
    var body = res.response !== undefined ? res.response : res;
    if (body == null || typeof body !== 'object') {
        return null;
    }
    var p = body.result !== undefined ? body.result : body;
    if (p && typeof p === 'object' && p.result != null && p.ok === undefined) {
        p = p.result;
    }
    if (!p || typeof p !== 'object' || p.ok === undefined) {
        p = (_b = (_a = body.response) === null || _a === void 0 ? void 0 : _a.result) !== null && _b !== void 0 ? _b : p;
    }
    return p;
}
var API_GET_ITEM_TREE = '/api/1/services/api/1/content/get-items-tree.json';
var API_GET_CONTENT = '/api/1/services/api/1/content/get-content.json';
var API_CONTENT_EXISTS = '/api/1/services/api/1/content/content-exists.json';
var API_CREATE_FOLDER = '/api/1/services/api/1/content/create-folder.json';
var API_RENAME_FOLDER = '/api/1/services/api/1/content/rename-folder.json';
var API_TRANSLATION_SERVER_COPY = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-copy.post';
var API_TRANSLATION_REMOVE_CANDIDATES = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove-candidates.post';
var API_TRANSLATION_REMOVE = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-remove.post';
var API_TRANSLATION_CONFIG = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-config.get';
var API_TRANSLATION_LOCALES = '/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/translation-locales';
/** Same as Studio `fetchConfigurationXML` — path under `module=studio` (file: `config/studio/translation-config.xml`). */
var API_GET_CONFIGURATION = '/api/2/configuration/get_configuration';
var CONFIG_STUDIO_TRANSLATION_XML_PATH = '/translation-config.xml';
function extractConfigurationXmlContent(res) {
    var _a;
    if (res == null) {
        return null;
    }
    var inner = res.response !== undefined ? res.response : res;
    if (typeof (inner === null || inner === void 0 ? void 0 : inner.content) === 'string' && inner.content.trim()) {
        return inner.content;
    }
    if (typeof ((_a = inner === null || inner === void 0 ? void 0 : inner.response) === null || _a === void 0 ? void 0 : _a.content) === 'string' && inner.response.content.trim()) {
        return inner.response.content;
    }
    return null;
}
function normalizeLookupKey$1(code) {
    return String(code || '')
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
}
/** Same as Groovy {@code folderLocaleFromKey}: full normalized tag (e.g. zh-cn, ar-sa). */
function folderLocaleFromKey$1(key) {
    var k = String(key || '')
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
    return k || '';
}
function lookupLocaleMetaForUi(key) {
    var k = normalizeLookupKey$1(key);
    var direct = LOCALE_META[k];
    if (direct) {
        return { label: direct.label, flag: direct.flag };
    }
    if (k.length > 2) {
        var two = k.substring(0, 2);
        var fromTwo = LOCALE_META[two];
        if (fromTwo) {
            return { label: fromTwo.label, flag: fromTwo.flag };
        }
    }
    return null;
}
/**
 * Parse `translation-config.xml` the same way as `translation-config.get.groovy`.
 * Document order of locale entries is preserved. Optional language/flag override the catalog.
 */
function parseTranslationConfigFromXml(xml) {
    var _a;
    var trimmed = String(xml || '').trim();
    if (!trimmed) {
        return null;
    }
    var doc;
    try {
        doc = new DOMParser().parseFromString(trimmed, 'text/xml');
    }
    catch (_b) {
        return null;
    }
    if (doc.querySelector('parsererror')) {
        return null;
    }
    var root = doc.querySelector('translation-config');
    if (!root) {
        return null;
    }
    var codesParent = root.querySelector('localeCodes');
    if (!codesParent) {
        return null;
    }
    var seen = new Set();
    var languages = [];
    Array.from(codesParent.children).forEach(function (elm) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var tag = (elm.tagName || '').toLowerCase();
        var rawCode = '';
        var languageRaw = '';
        var flagRaw = '';
        if (tag === 'locale') {
            rawCode =
                (((_a = elm.querySelector(':scope > code')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim() ||
                    (((_b = elm.querySelector(':scope > localeCode')) === null || _b === void 0 ? void 0 : _b.textContent) || '').trim();
            languageRaw =
                (((_c = elm.querySelector(':scope > language')) === null || _c === void 0 ? void 0 : _c.textContent) || '').trim() ||
                    (((_d = elm.querySelector(':scope > label')) === null || _d === void 0 ? void 0 : _d.textContent) || '').trim();
            flagRaw = (((_e = elm.querySelector(':scope > flag')) === null || _e === void 0 ? void 0 : _e.textContent) || '').trim();
        }
        else if (tag === 'localecode') {
            var nestedCode = (((_f = elm.querySelector(':scope > code')) === null || _f === void 0 ? void 0 : _f.textContent) || '').trim();
            if (nestedCode) {
                rawCode = nestedCode;
                languageRaw =
                    (((_g = elm.querySelector(':scope > language')) === null || _g === void 0 ? void 0 : _g.textContent) || '').trim() ||
                        (((_h = elm.querySelector(':scope > label')) === null || _h === void 0 ? void 0 : _h.textContent) || '').trim();
                flagRaw = (((_j = elm.querySelector(':scope > flag')) === null || _j === void 0 ? void 0 : _j.textContent) || '').trim();
            }
            else {
                rawCode = (elm.textContent || '').trim();
                languageRaw = (elm.getAttribute('language') || elm.getAttribute('label') || '').trim();
                flagRaw = (elm.getAttribute('flag') || '').trim();
            }
        }
        else {
            return;
        }
        var key = normalizeLookupKey$1(rawCode);
        if (!key) {
            return;
        }
        var norm = folderLocaleFromKey$1(key);
        if (!norm || seen.has(norm)) {
            return;
        }
        seen.add(norm);
        var meta = lookupLocaleMetaForUi(key) || lookupLocaleMetaForUi(norm);
        var label = languageRaw || (meta === null || meta === void 0 ? void 0 : meta.label) || norm;
        var flag = flagRaw || (meta === null || meta === void 0 ? void 0 : meta.flag) || getFlagForLocale(norm);
        languages.push({ locale: norm, label: label, flag: flag });
    });
    if (languages.length === 0) {
        return null;
    }
    var defaultCodeRaw = (((_a = root.querySelector('defaultLocaleCode')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
    var defaultKey = normalizeLookupKey$1(defaultCodeRaw);
    var normalizedDefault = defaultKey ? folderLocaleFromKey$1(defaultKey) : '';
    if (!normalizedDefault || !seen.has(normalizedDefault)) {
        normalizedDefault = languages[0].locale;
    }
    return { baseLanguage: normalizedDefault, languages: languages };
}
function getTranslationConfigFromStudioConfigurationApi(base, siteId) {
    return __awaiter(this, void 0, void 0, function () {
        var qs, url, res, status_1, xml;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    qs = [
                        "siteId=".concat(encodeURIComponent(siteId)),
                        "module=".concat(encodeURIComponent('studio')),
                        "path=".concat(encodeURIComponent(CONFIG_STUDIO_TRANSLATION_XML_PATH)),
                        "environment=".concat(encodeURIComponent('default'))
                    ].join('&');
                    url = "".concat(base).concat(API_GET_CONFIGURATION, "?").concat(qs);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, studioPluginScriptGet(url)];
                case 2:
                    res = _c.sent();
                    status_1 = (_b = res === null || res === void 0 ? void 0 : res.status) !== null && _b !== void 0 ? _b : res === null || res === void 0 ? void 0 : res.statusCode;
                    if (status_1 != null && status_1 !== 200) {
                        return [2 /*return*/, null];
                    }
                    xml = extractConfigurationXmlContent(res);
                    if (!xml) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, parseTranslationConfigFromXml(xml)];
                case 3:
                    _c.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function extractContentXmlString(body) {
    var _a, _b, _c, _d, _e;
    if (body == null) {
        return null;
    }
    if (typeof body === 'string' && body.includes('<')) {
        return body;
    }
    var inner = (_a = body.response) !== null && _a !== void 0 ? _a : body;
    if (typeof inner === 'string' && inner.includes('<')) {
        return inner;
    }
    var c = (_e = (_d = (_b = inner === null || inner === void 0 ? void 0 : inner.content) !== null && _b !== void 0 ? _b : (_c = inner === null || inner === void 0 ? void 0 : inner.item) === null || _c === void 0 ? void 0 : _c.content) !== null && _d !== void 0 ? _d : inner === null || inner === void 0 ? void 0 : inner.text) !== null && _e !== void 0 ? _e : inner === null || inner === void 0 ? void 0 : inner.xml;
    if (typeof c === 'string' && c.includes('<')) {
        return c;
    }
    return null;
}
function parseTranslationLocaleHintsFromXml(xml) {
    var pick = function (tag) {
        var re = new RegExp("<".concat(tag, "\\s*>([\\s\\S]*?)<\\/").concat(tag, "\\s*>"), 'i');
        var m = xml.match(re);
        if (!m) {
            return '';
        }
        var inner = String(m[1]).trim();
        var cdata = inner.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
        if (cdata) {
            inner = String(cdata[1]).trim();
        }
        return inner
            .replace(/<[^>]+>/g, '')
            .trim()
            .toLowerCase();
    };
    return {
        sourceLocaleCode: pick('sourceLocaleCode_s'),
        localeCode: pick('localeCode_s')
    };
}
function parseTimestampMs(input) {
    if (input == null) {
        return null;
    }
    if (typeof input === 'number' && Number.isFinite(input)) {
        return input;
    }
    var asNum = Number(input);
    if (Number.isFinite(asNum) && asNum > 0) {
        return asNum;
    }
    var parsed = Date.parse(String(input));
    return Number.isFinite(parsed) ? parsed : null;
}
var StudioAPI = {
    /** Store path for the item currently shown in preview (toolbar / XB context). */
    getPreviewItem: function (previewItem) {
        var p = previewItem !== null && previewItem !== void 0 ? previewItem : {};
        var path = (typeof p.path === 'string' && p.path.trim()) ||
            (typeof p.storeUrl === 'string' && p.storeUrl.trim()) ||
            (p.item && typeof p.item.path === 'string' && p.item.path.trim()) ||
            '';
        var name = (typeof p.label === 'string' && p.label) ||
            (typeof p.internalName === 'string' && p.internalName) ||
            (path ? path.replace(/^.*\//, '') : '');
        var contentType = (typeof p.contentTypeId === 'string' && p.contentTypeId) ||
            (typeof p.contentType === 'string' && p.contentType) ||
            '';
        return { name: name, path: path, contentType: contentType };
    },
    contentExists: function (authoringBase, siteId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, body, flag;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_CONTENT_EXISTS, "?site_id=").concat(encodeURIComponent(siteId), "&path=").concat(encodeURIComponent(path));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.get(url)];
                    case 2:
                        res = _c.sent();
                        if (res.status === 200 && res.response) {
                            body = res.response;
                            flag = (_a = body.content) !== null && _a !== void 0 ? _a : (_b = body.response) === null || _b === void 0 ? void 0 : _b.content;
                            if (flag != null) {
                                return [2 /*return*/, Boolean(flag)];
                            }
                        }
                        return [2 /*return*/, false];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getChildrenPaths: function (authoringBase, siteId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, raw, list;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_GET_ITEM_TREE, "?site=").concat(siteId, "&path=").concat(path, "&depth=1");
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.get(url)];
                    case 2:
                        res = _c.sent();
                        if (res.status === 200) {
                            raw = (_b = (_a = res.response) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.children;
                            list = Array.isArray(raw) ? raw : [];
                            return [2 /*return*/, list
                                    .filter(function (child) { return child && child.path && child.path !== path; })
                                    .map(function (child) { return child.path; })];
                        }
                        return [2 /*return*/, []];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getContentXml: function (authoringBase, siteId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, body;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_GET_CONTENT, "?site_id=").concat(encodeURIComponent(siteId), "&path=").concat(encodeURIComponent(path));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.get(url)];
                    case 2:
                        res = _c.sent();
                        if (res.status !== 200) {
                            return [2 /*return*/, null];
                        }
                        body = (_b = res.response) !== null && _b !== void 0 ? _b : res;
                        return [2 /*return*/, extractContentXmlString(body)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /** Reads Translation locale fields from item XML (same semantics as translation-versions form `sourceLocaleCode_s`). */
    getTranslationLocaleHints: function (authoringBase, siteId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var xml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContentXml(authoringBase, siteId, path)];
                    case 1:
                        xml = _a.sent();
                        if (!xml) {
                            return [2 /*return*/, { sourceLocaleCode: '', localeCode: '' }];
                        }
                        return [2 /*return*/, parseTranslationLocaleHintsFromXml(xml)];
                }
            });
        });
    },
    getItemModifiedTimestamp: function (authoringBase, siteId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, item;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_GET_ITEM_TREE, "?site=").concat(encodeURIComponent(siteId), "&path=").concat(encodeURIComponent(path), "&depth=0");
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.get(url)];
                    case 2:
                        res = _g.sent();
                        if (res.status !== 200) {
                            return [2 /*return*/, null];
                        }
                        item = (_a = res.response) === null || _a === void 0 ? void 0 : _a.item;
                        if (!item) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, ((_f = (_e = (_d = (_c = (_b = parseTimestampMs(item.lastModifiedDate_dt)) !== null && _b !== void 0 ? _b : parseTimestampMs(item.lastModifiedDate)) !== null && _c !== void 0 ? _c : parseTimestampMs(item.lastEditDate)) !== null && _d !== void 0 ? _d : parseTimestampMs(item.modifiedDate)) !== null && _e !== void 0 ? _e : parseTimestampMs(item.dateModified)) !== null && _f !== void 0 ? _f : null)];
                    case 3:
                        _g.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    copyItem: function (authoringBase, siteId, path, destinationPath, expectedTargetPath) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, res, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_TRANSLATION_SERVER_COPY, "?siteId=").concat(encodeURIComponent(siteId));
                        body = {
                            sourcePath: path,
                            targetParentPath: destinationPath,
                            expectedTargetPath: expectedTargetPath || ''
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.post(url, body)];
                    case 2:
                        res = _a.sent();
                        if (res.status !== 200) {
                            return [2 /*return*/, null];
                        }
                        p = parsePluginScriptPayload(res);
                        return [2 /*return*/, p && typeof p === 'object' ? p : null];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    fetchTranslationRemoveCandidates: function (authoringBase, siteId, pagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, p;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_TRANSLATION_REMOVE_CANDIDATES, "?siteId=").concat(encodeURIComponent(siteId));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.post(url, { pagePath: pagePath })];
                    case 2:
                        res = _b.sent();
                        if (res.status !== 200) {
                            return [2 /*return*/, { ok: false, candidates: [], message: "HTTP ".concat(res.status) }];
                        }
                        p = parsePluginScriptPayload(res);
                        if (!p || typeof p !== 'object') {
                            return [2 /*return*/, { ok: false, candidates: [], message: 'Empty response' }];
                        }
                        return [2 /*return*/, {
                                ok: Boolean(p.ok),
                                message: typeof p.message === 'string' ? p.message : undefined,
                                candidates: Array.isArray(p.candidates) ? p.candidates : [],
                                pagePath: typeof p.pagePath === 'string' ? p.pagePath : pagePath
                            }];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { ok: false, candidates: [], message: 'Request failed' }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    postTranslationRemove: function (authoringBase_1, siteId_1, pagePath_1, componentPaths_1) {
        return __awaiter(this, arguments, void 0, function (authoringBase, siteId, pagePath, componentPaths, deletePage) {
            var url, res, p;
            if (deletePage === void 0) { deletePage = true; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_TRANSLATION_REMOVE, "?siteId=").concat(encodeURIComponent(siteId));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.post(url, {
                                pagePath: pagePath,
                                componentPaths: componentPaths !== null && componentPaths !== void 0 ? componentPaths : [],
                                deletePage: deletePage
                            })];
                    case 2:
                        res = _b.sent();
                        if (res.status !== 200) {
                            return [2 /*return*/, { ok: false, deleted: [], failed: [{ message: "HTTP ".concat(res.status) }] }];
                        }
                        p = parsePluginScriptPayload(res);
                        if (!p || typeof p !== 'object') {
                            return [2 /*return*/, { ok: false, deleted: [], failed: [{ message: 'Empty response' }] }];
                        }
                        return [2 /*return*/, {
                                ok: Boolean(p.ok),
                                deleted: Array.isArray(p.deleted) ? p.deleted : [],
                                failed: Array.isArray(p.failed) ? p.failed : []
                            }];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { ok: false, deleted: [], failed: [{ message: 'Request failed' }] }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    createFolder: function (authoringBase, siteId, path, name) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_CREATE_FOLDER, "?site=").concat(siteId, "&path=").concat(path, "&name=").concat(name);
                        body = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.post(url, body)];
                    case 2:
                        res = _a.sent();
                        if (res.status === 200) {
                            return [2 /*return*/, res.response];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    renameFolder: function (authoringBase, siteId, path, name) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(authoringBase).concat(API_RENAME_FOLDER, "?site=").concat(siteId, "&path=").concat(path, "&name=").concat(name);
                        body = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HttpUtils.post(url, body)];
                    case 2:
                        res = _a.sent();
                        if (res.status === 200) {
                            return [2 /*return*/, res.response];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getTranslationConfig: function (authoringBase_1, siteId_1) {
        return __awaiter(this, arguments, void 0, function (authoringBase, siteId, _ensureDefault) {
            var base, fromConfiguration, url, res, status_2, p, languages, baseLanguage;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = String(authoringBase || '').replace(/\/$/, '');
                        if (!base || !siteId) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, getTranslationConfigFromStudioConfigurationApi(base, siteId)];
                    case 1:
                        fromConfiguration = _b.sent();
                        if (fromConfiguration && fromConfiguration.languages.length > 0) {
                            return [2 /*return*/, fromConfiguration];
                        }
                        url = "".concat(base).concat(API_TRANSLATION_CONFIG, "?siteId=").concat(encodeURIComponent(siteId));
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, studioPluginScriptGet(url)];
                    case 3:
                        res = _b.sent();
                        status_2 = (_a = res === null || res === void 0 ? void 0 : res.status) !== null && _a !== void 0 ? _a : res === null || res === void 0 ? void 0 : res.statusCode;
                        if (status_2 != null && status_2 !== 200) {
                            return [2 /*return*/, null];
                        }
                        p = parsePluginScriptPayload(res);
                        if (!p || !p.ok || !p.baseLanguage || !Array.isArray(p.languages)) {
                            return [2 /*return*/, null];
                        }
                        languages = p.languages
                            .map(function (row) { return (__assign({ locale: String((row === null || row === void 0 ? void 0 : row.locale) || '').toLowerCase(), label: String((row === null || row === void 0 ? void 0 : row.label) || (row === null || row === void 0 ? void 0 : row.locale) || '') }, ((row === null || row === void 0 ? void 0 : row.flag) != null && String(row.flag).trim() !== '' ? { flag: String(row.flag) } : {}))); })
                            .filter(function (row) { return row.locale; });
                        if (languages.length === 0) {
                            return [2 /*return*/, null];
                        }
                        baseLanguage = String(p.baseLanguage).toLowerCase();
                        return [2 /*return*/, { baseLanguage: baseLanguage, languages: languages }];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Translation config plus every locale variant of `path` (lineage + mirrored folder, exists, modified,
     * source/outdated flags) in one request. Without `path` only `config` is filled.
     */
    getTranslationLocales: function (authoringBase, siteId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var base, qs, res, status_3, p, languages, config, locales;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = String(authoringBase || '').replace(/\/$/, '');
                        if (!base || !siteId) {
                            return [2 /*return*/, null];
                        }
                        qs = ["siteId=".concat(encodeURIComponent(siteId))];
                        if (path) {
                            qs.push("path=".concat(encodeURIComponent(path)));
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, studioPluginScriptGet("".concat(base).concat(API_TRANSLATION_LOCALES, "?").concat(qs.join('&')))];
                    case 2:
                        res = _c.sent();
                        status_3 = (_b = res === null || res === void 0 ? void 0 : res.status) !== null && _b !== void 0 ? _b : res === null || res === void 0 ? void 0 : res.statusCode;
                        if (status_3 != null && status_3 !== 200) {
                            return [2 /*return*/, null];
                        }
                        p = parsePluginScriptPayload(res);
                        if (!p || !p.ok) {
                            return [2 /*return*/, null];
                        }
                        languages = (Array.isArray(p.languages) ? p.languages : [])
                            .map(function (row) { return (__assign({ locale: String((row === null || row === void 0 ? void 0 : row.locale) || '').toLowerCase(), label: String((row === null || row === void 0 ? void 0 : row.label) || (row === null || row === void 0 ? void 0 : row.locale) || '') }, ((row === null || row === void 0 ? void 0 : row.flag) != null && String(row.flag).trim() !== '' ? { flag: String(row.flag) } : {}))); })
                            .filter(function (row) { return row.locale; });
                        config = languages.length && p.baseLanguage ? { baseLanguage: String(p.baseLanguage).toLowerCase(), languages: languages } : null;
                        locales = (Array.isArray(p.locales) ? p.locales : []).map(function (r) { return ({
                            locale: String((r === null || r === void 0 ? void 0 : r.locale) || ''),
                            code: String((r === null || r === void 0 ? void 0 : r.code) || (r === null || r === void 0 ? void 0 : r.locale) || ''),
                            label: String((r === null || r === void 0 ? void 0 : r.label) || (r === null || r === void 0 ? void 0 : r.locale) || ''),
                            flag: ((r === null || r === void 0 ? void 0 : r.flag) && String(r.flag).trim()) || getFlagForLocale(String((r === null || r === void 0 ? void 0 : r.locale) || '')),
                            path: String((r === null || r === void 0 ? void 0 : r.path) || ''),
                            parentPath: String((r === null || r === void 0 ? void 0 : r.parentPath) || ''),
                            exists: Boolean(r === null || r === void 0 ? void 0 : r.exists),
                            lastModified: parseTimestampMs(r === null || r === void 0 ? void 0 : r.lastModified),
                            isSource: Boolean(r === null || r === void 0 ? void 0 : r.isSource),
                            isOutdated: Boolean(r === null || r === void 0 ? void 0 : r.isOutdated),
                            isCurrent: Boolean(r === null || r === void 0 ? void 0 : r.isCurrent),
                            isPage: Boolean(r === null || r === void 0 ? void 0 : r.isPage),
                            matchedBy: (r === null || r === void 0 ? void 0 : r.matchedBy) === 'lineage' || (r === null || r === void 0 ? void 0 : r.matchedBy) === 'folder' ? r.matchedBy : null
                        }); });
                        return [2 /*return*/, {
                                config: config,
                                path: p.path || undefined,
                                rootDir: p.rootDir || undefined,
                                relativeUnderLocale: p.relativeUnderLocale || undefined,
                                currentLocale: p.currentLocale || undefined,
                                sourceLocale: p.sourceLocale || undefined,
                                contentType: p.contentType || undefined,
                                objectId: p.objectId || undefined,
                                localeSourceId: p.localeSourceId || undefined,
                                locales: locales,
                                message: typeof p.message === 'string' ? p.message : undefined
                            }];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};

/** True if a repo locale folder segment matches a configured locale code (exact or zh ↔ zh-cn style). */
function localeSegmentsCompatible(a, b) {
    var s = String(a || '')
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
    var c = String(b || '')
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
    if (!s || !c) {
        return false;
    }
    if (s === c) {
        return true;
    }
    if (s.startsWith("".concat(c, "-"))) {
        return true;
    }
    if (c.startsWith("".concat(s, "-"))) {
        return true;
    }
    return false;
}
function pathLastSegment(path) {
    var parts = path.split('/').filter(Boolean);
    return parts[parts.length - 1] || path;
}
var DEFAULT_WEBSITE_PATH = '/site/website';
var DEFAULT_COMPONENT_PATH = '/site/components';
/** Repo root for locale folders from a full content path. */
function getWebsiteComponentsRootDir(fullPath) {
    if (!fullPath) {
        return null;
    }
    var withSite = fullPath.match(/^(\/site\/[^/]+\/(?:website|components))(?=\/|$)/i);
    if (withSite) {
        return withSite[1];
    }
    if (fullPath.startsWith(DEFAULT_WEBSITE_PATH)) {
        return DEFAULT_WEBSITE_PATH;
    }
    if (fullPath.startsWith(DEFAULT_COMPONENT_PATH)) {
        return DEFAULT_COMPONENT_PATH;
    }
    var bare = fullPath.match(/^(\/site\/(?:website|components))(?=\/|$)/i);
    return bare ? bare[1] : null;
}
/**
 * Returns locale folder names found as direct children of rootDir (e.g. en, es under /site/website).
 * @param allowedLocaleCodes When set (e.g. from `translation-config.xml`), only these folder names count;
 *   otherwise falls back to `MULTI_LOCALE_CODES` from the plugin bundle.
 */
function detectLocaleFolderNames(childPaths, rootDir, allowedLocaleCodes) {
    var codes = allowedLocaleCodes && allowedLocaleCodes.length > 0 ? allowedLocaleCodes : __spreadArray([], MULTI_LOCALE_CODES, true);
    var prefix = rootDir.endsWith('/') ? rootDir : "".concat(rootDir, "/");
    var names = [];
    var _loop_1 = function (p) {
        if (!p.startsWith(prefix)) {
            return "continue";
        }
        var rest = p.slice(prefix.length);
        var seg = rest.split('/').filter(Boolean)[0];
        if (seg && codes.some(function (code) { return localeSegmentsCompatible(seg, code); })) {
            names.push(seg);
        }
    };
    for (var _i = 0, childPaths_1 = childPaths; _i < childPaths_1.length; _i++) {
        var p = childPaths_1[_i];
        _loop_1(p);
    }
    return Array.from(new Set(names));
}
/** At least two locale folders on disk. When {@code baseLocale} is set, it must be among them. */
function isMultiLocaleLayout(localeFolders, baseLocale) {
    if (localeFolders.length < 2) {
        return false;
    }
    if (!baseLocale || !String(baseLocale).trim()) {
        return true;
    }
    var base = String(baseLocale).trim().toLowerCase().replace(/_/g, '-');
    var lower = localeFolders.map(function (s) { return s.toLowerCase().replace(/_/g, '-'); });
    return lower.some(function (seg) { return localeSegmentsCompatible(seg, base); });
}
/**
 * Full repo path for the same relative path in another locale folder.
 */
function pathForLocale(rootDir, relativeUnderBase, locale) {
    var r = rootDir.replace(/\/$/, '');
    var suffix = relativeUnderBase === '' ? '' : relativeUnderBase.startsWith('/') ? relativeUnderBase : "/".concat(relativeUnderBase);
    return "".concat(r, "/").concat(locale).concat(suffix);
}
function parentFolderPath(fileOrFolderPath) {
    var i = fileOrFolderPath.lastIndexOf('/');
    if (i <= 0) {
        return '/';
    }
    return fileOrFolderPath.slice(0, i) || '/';
}
/**
 * Parse `fullPath` under `rootDir` when the first segment is a locale folder (e.g. en, es).
 * @returns locale folder name and path under that locale (starts with `/`, or empty if path is the locale root).
 */
function parseLocaleRelative(fullPath, rootDir, localeFolderNames) {
    var rd = rootDir.replace(/\/$/, '');
    var norm = fullPath.replace(/\/$/, '');
    if (!norm.startsWith("".concat(rd, "/")) && norm !== rd) {
        return null;
    }
    var rest = norm === rd ? '' : norm.slice(rd.length + 1);
    if (!rest) {
        return null;
    }
    var parts = rest.split('/').filter(Boolean);
    var first = parts[0];
    var match = localeFolderNames.find(function (l) { return localeSegmentsCompatible(first, l); });
    if (!match) {
        return null;
    }
    var tail = parts.slice(1);
    var relativeUnderLocale = tail.length ? "/".concat(tail.join('/')) : '';
    return { locale: match, relativeUnderLocale: relativeUnderLocale };
}

/** Opens Studio form editor for `path` (same action as other Translation widgets). */
function openEditFormStudioDispatch(dispatch, siteId, path, authoringBase) {
    dispatch(showEditDialog({
        site: siteId,
        path: path,
        authoringBase: authoringBase
    }));
}

/**
 * Ordered locale segments for mirrored paths.
 *
 * With `translation-config.xml` codes: at least two configured locales; every code is returned in order
 * (disk folder casing when present). Without site config codes, falls back to legacy detection: at least
 * two matching locale folders on disk including the default locale.
 *
 * Targets: every configured locale code is included in order. Missing folders still appear as targets
 * so authors can translate after creating `/site/website/{locale}/…`.
 */
function resolveLocaleFoldersOnSite(authoringBase, siteId, rootDir, configuredLocaleCodes, defaultLocaleCode) {
    return __awaiter(this, void 0, void 0, function () {
        var configured, paths, detected, base, fromSiteConfig, primary_1, _loop_1, _i, configured_1, code, extra_1, primary, _loop_2, _a, configured_2, code, extra;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    configured = (configuredLocaleCodes && configuredLocaleCodes.length > 0
                        ? configuredLocaleCodes
                        : __spreadArray([], MULTI_LOCALE_CODES, true)).map(function (s) { return String(s).toLowerCase(); });
                    return [4 /*yield*/, StudioAPI.getChildrenPaths(authoringBase, siteId, rootDir)];
                case 1:
                    paths = _b.sent();
                    detected = detectLocaleFolderNames(paths, rootDir, configured);
                    base = (defaultLocaleCode && String(defaultLocaleCode).trim()) || undefined;
                    fromSiteConfig = Boolean(configuredLocaleCodes && configuredLocaleCodes.length > 0);
                    // When locales come from translation-config.xml, list every configured code (e.g. `de`)
                    // even if that folder is not created yet — translate flow prompts to create it.
                    if (fromSiteConfig) {
                        if (configured.length < 2) {
                            return [2 /*return*/, null];
                        }
                        primary_1 = [];
                        _loop_1 = function (code) {
                            var match = detected.find(function (d) { return localeSegmentsCompatible(d, code); });
                            primary_1.push(match !== null && match !== void 0 ? match : code);
                        };
                        for (_i = 0, configured_1 = configured; _i < configured_1.length; _i++) {
                            code = configured_1[_i];
                            _loop_1(code);
                        }
                        extra_1 = detected.filter(function (d) { return !configured.some(function (c) { return localeSegmentsCompatible(d, c); }); });
                        return [2 /*return*/, __spreadArray(__spreadArray([], primary_1, true), extra_1, true)];
                    }
                    if (!isMultiLocaleLayout(detected, base)) {
                        return [2 /*return*/, null];
                    }
                    primary = [];
                    _loop_2 = function (code) {
                        var match = detected.find(function (d) { return localeSegmentsCompatible(d, code); });
                        if (match && !primary.some(function (p) { return p.toLowerCase() === match.toLowerCase(); })) {
                            primary.push(match);
                        }
                    };
                    for (_a = 0, configured_2 = configured; _a < configured_2.length; _a++) {
                        code = configured_2[_a];
                        _loop_2(code);
                    }
                    extra = detected.filter(function (d) { return !primary.some(function (p) { return localeSegmentsCompatible(d, p); }); });
                    return [2 /*return*/, __spreadArray(__spreadArray([], primary, true), extra, true)];
            }
        });
    });
}
/**
 * All mirrored locale targets except the source locale (same paths as {@link listMissingLocaleTargets}),
 * including locales where the target file already exists (`exists: true`).
 */
function listAllLocaleTargets(authoringBase, siteId, sourcePath, rootDir, localeFolders, localeMetaOverride) {
    return __awaiter(this, void 0, void 0, function () {
        var parsed, sourceLocale, relativeUnderLocale, out, _i, localeFolders_2, loc, targetFilePath, exists, meta;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parsed = parseLocaleRelative(sourcePath, rootDir, localeFolders);
                    if (!parsed) {
                        return [2 /*return*/, []];
                    }
                    sourceLocale = parsed.locale, relativeUnderLocale = parsed.relativeUnderLocale;
                    out = [];
                    _i = 0, localeFolders_2 = localeFolders;
                    _c.label = 1;
                case 1:
                    if (!(_i < localeFolders_2.length)) return [3 /*break*/, 4];
                    loc = localeFolders_2[_i];
                    if (localeSegmentsCompatible(loc, sourceLocale)) {
                        return [3 /*break*/, 3];
                    }
                    targetFilePath = pathForLocale(rootDir, relativeUnderLocale, loc);
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, targetFilePath)];
                case 2:
                    exists = _c.sent();
                    meta = (_b = (_a = localeMetaOverride === null || localeMetaOverride === void 0 ? void 0 : localeMetaOverride[loc.toLowerCase()]) !== null && _a !== void 0 ? _a : LOCALE_META[loc.toLowerCase()]) !== null && _b !== void 0 ? _b : { label: loc, flag: '🌐' };
                    out.push({
                        locale: loc,
                        label: meta.label,
                        flag: meta.flag,
                        targetFilePath: targetFilePath,
                        destinationParentPath: parentFolderPath(targetFilePath),
                        exists: exists
                    });
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, out];
            }
        });
    });
}

function TranslateToLocalePicker(props) {
    var _this = this;
    var _a;
    var _b = props.variant, variant = _b === void 0 ? 'dialog' : _b, translationFormPath = props.translationFormPath, translationFormName = props.translationFormName, translationFormContentType = props.translationFormContentType, translationAuthoringBase = props.translationAuthoringBase, _c = props.closeDialogOnSuccess, closeDialogOnSuccess = _c === void 0 ? false : _c;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var envAuthoringBase = useEnv().authoringBase;
    var currentPreviewItem = useCurrentPreviewItem();
    var previewDerived = currentPreviewItem ? StudioAPI.getPreviewItem(currentPreviewItem) : null;
    var authoringBase = (translationAuthoringBase === null || translationAuthoringBase === void 0 ? void 0 : translationAuthoringBase.trim()) || envAuthoringBase || '';
    var sourceItem = useMemo(function () {
        var trimmed = typeof translationFormPath === 'string' ? translationFormPath.trim() : '';
        if (trimmed !== '') {
            return {
                name: (typeof translationFormName === 'string' && translationFormName.trim()) || pathLastSegment(trimmed),
                path: trimmed,
                contentType: (typeof translationFormContentType === 'string' && translationFormContentType) || ''
            };
        }
        return previewDerived;
    }, [translationFormPath, translationFormName, translationFormContentType, previewDerived]);
    var _d = useState([]), options = _d[0], setOptions = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var _f = useState(''), selectedLocale = _f[0], setSelectedLocale = _f[1];
    var _g = useState(false), copyBusy = _g[0], setCopyBusy = _g[1];
    var _h = useState(null), translationConfig = _h[0], setTranslationConfig = _h[1];
    var translationConfigRef = useRef(null);
    translationConfigRef.current = translationConfig;
    useEffect(function () {
        var cancelled = false;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var cfg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!siteId || !authoringBase) {
                            setTranslationConfig(null);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, StudioAPI.getTranslationConfig(authoringBase, siteId, true)];
                    case 1:
                        cfg = _a.sent();
                        if (!cancelled) {
                            setTranslationConfig(cfg);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            cancelled = true;
        };
    }, [siteId, authoringBase]);
    var loadTargets = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var rootDir, liveConfig_1, effectiveConfig_1, localeCodes, localeMeta, folders, targets;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    setSelectedLocale('');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 5, 6]);
                    if (!siteId || !authoringBase || !(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path)) {
                        setOptions([]);
                        return [2 /*return*/];
                    }
                    rootDir = getWebsiteComponentsRootDir(sourceItem.path);
                    if (!rootDir) {
                        setOptions([]);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, StudioAPI.getTranslationConfig(authoringBase, siteId, true)];
                case 2:
                    liveConfig_1 = _b.sent();
                    if (liveConfig_1) {
                        setTranslationConfig(function (prev) {
                            return translationConfigsEqual(prev, liveConfig_1) ? prev : liveConfig_1;
                        });
                    }
                    effectiveConfig_1 = liveConfig_1 !== null && liveConfig_1 !== void 0 ? liveConfig_1 : translationConfigRef.current;
                    localeCodes = ((_a = effectiveConfig_1 === null || effectiveConfig_1 === void 0 ? void 0 : effectiveConfig_1.languages) !== null && _a !== void 0 ? _a : [])
                        .map(function (l) { return l.locale; })
                        .filter(function (c) { return Boolean(c); });
                    if (localeCodes.length < 2) {
                        setOptions([]);
                        return [2 /*return*/];
                    }
                    localeMeta = localeCodes.reduce(function (acc, code) {
                        var _a;
                        var row = (_a = effectiveConfig_1 === null || effectiveConfig_1 === void 0 ? void 0 : effectiveConfig_1.languages) === null || _a === void 0 ? void 0 : _a.find(function (l) { return l.locale.toLowerCase() === code.toLowerCase(); });
                        var label = (row === null || row === void 0 ? void 0 : row.label) || code;
                        var flag = ((row === null || row === void 0 ? void 0 : row.flag) && String(row.flag).trim()) || getFlagForLocale(code);
                        acc[code.toLowerCase()] = { label: label, flag: flag };
                        return acc;
                    }, {});
                    return [4 /*yield*/, resolveLocaleFoldersOnSite(authoringBase, siteId, rootDir, localeCodes, effectiveConfig_1 === null || effectiveConfig_1 === void 0 ? void 0 : effectiveConfig_1.baseLanguage)];
                case 3:
                    folders = _b.sent();
                    if (!folders) {
                        setOptions([]);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, listAllLocaleTargets(authoringBase, siteId, sourceItem.path, rootDir, folders, localeMeta)];
                case 4:
                    targets = _b.sent();
                    setOptions(targets);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [siteId, authoringBase, sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path]);
    useEffect(function () {
        void loadTargets();
    }, [loadTargets]);
    var selected = (_a = options.find(function (o) { return o.locale === selectedLocale; })) !== null && _a !== void 0 ? _a : null;
    var runCopy = function (copyAndEdit) { return __awaiter(_this, void 0, void 0, function () {
        var res, pastedPath;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!selected || !(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) || !siteId || !authoringBase || copyBusy) {
                        return [2 /*return*/];
                    }
                    if (selected.exists) {
                        dispatch(showSystemNotification({
                            message: "A file already exists for ".concat(selected.label, " (").concat(selected.locale, ").")
                        }));
                        return [2 /*return*/];
                    }
                    setCopyBusy(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, StudioAPI.copyItem(authoringBase, siteId, sourceItem.path, selected.destinationParentPath, selected.targetFilePath)];
                case 2:
                    res = _c.sent();
                    pastedPath = ((res === null || res === void 0 ? void 0 : res.pastedPath) || ((_b = res === null || res === void 0 ? void 0 : res.items) === null || _b === void 0 ? void 0 : _b[0]));
                    if (!(res === null || res === void 0 ? void 0 : res.ok) || !pastedPath) {
                        dispatch(showSystemNotification({
                            message: (res === null || res === void 0 ? void 0 : res.message) || "Could not copy to ".concat(selected.label, ".")
                        }));
                        return [2 /*return*/];
                    }
                    dispatch(showSystemNotification({
                        message: "Copied to ".concat(selected.label, ": ").concat(pastedPath)
                    }));
                    if (copyAndEdit && pastedPath) {
                        openEditFormStudioDispatch(dispatch, siteId, pastedPath, authoringBase);
                    }
                    return [4 /*yield*/, loadTargets()];
                case 3:
                    _c.sent();
                    if (closeDialogOnSuccess && variant === 'dialog') {
                        dispatch(closeWidgetDialog());
                    }
                    return [3 /*break*/, 6];
                case 4:
                    _c.sent();
                    dispatch(showSystemNotification({
                        message: "Could not copy to ".concat(selected.label, ".")
                    }));
                    return [3 /*break*/, 6];
                case 5:
                    setCopyBusy(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var onSelectChange = function (e) {
        setSelectedLocale(e.target.value);
    };
    var disabledCore = !siteId || !authoringBase || !(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path);
    var hint = disabledCore
        ? variant === 'toolbar'
            ? 'Select an item in preview or open a form.'
            : 'No source path — open from preview or a content form.'
        : !getWebsiteComponentsRootDir(sourceItem.path)
            ? 'Path must be under /site/…/website or …/components.'
            : options.length === 0 && !loading
                ? 'No target locales: ensure /config/studio/translation-config.xml lists at least two localeCodes, the plugin script returns them, and this path is under /site/…/website or …/components.'
                : options.length > 0 && options.every(function (o) { return o.exists; }) && !loading
                    ? 'All configured locales already have a file at this path.'
                    : null;
    var isToolbar = variant === 'toolbar';
    var labelId = 'translation-locale-select-label';
    var controls = (jsxs(Stack$1, { direction: isToolbar ? 'row' : 'column', spacing: isToolbar ? 1 : 1.5, alignItems: isToolbar ? 'center' : 'stretch', sx: { width: isToolbar ? 'auto' : '100%', minWidth: 0 }, children: [jsxs(FormControl$1, { size: "small", disabled: disabledCore || loading || options.length === 0, sx: { minWidth: isToolbar ? 140 : '100%', flex: isToolbar ? '0 1 auto' : undefined }, children: [jsx(InputLabel$1, { id: labelId, children: "Locale" }), jsxs(Select$1, { labelId: labelId, label: "Locale", value: selectedLocale, onChange: onSelectChange, displayEmpty: true, renderValue: function (v) {
                            if (!v) {
                                return loading ? '…' : options.length === 0 ? '—' : 'Choose locale…';
                            }
                            var o = options.find(function (x) { return x.locale === v; });
                            return o ? "".concat(o.flag, " ").concat(o.label) : v;
                        }, children: [jsx(MenuItem, { value: "", disabled: true, children: jsx("em", { children: "Choose locale\u2026" }) }), options.map(function (o) { return (jsxs(MenuItem, { value: o.locale, disabled: o.exists, children: [o.flag, " ", o.label, " (", o.locale, ")", o.exists ? ' — exists' : ''] }, o.locale)); })] })] }), jsxs(Stack$1, { direction: "row", spacing: 1, alignItems: "center", flexWrap: "wrap", children: [jsx(Tooltip$1, { title: "Reload locale list and content-exists checks", children: jsx("span", { children: jsx(IconButton, { size: "small", "aria-label": "Refresh locales", onClick: function () { return void loadTargets(); }, disabled: disabledCore || loading || copyBusy, children: loading ? jsx(CircularProgress$1, { size: 18 }) : jsx(RefreshOutlinedIcon, { fontSize: "small" }) }) }) }), jsx(Button, { size: "small", variant: "contained", disabled: !selected || !!(selected === null || selected === void 0 ? void 0 : selected.exists) || copyBusy || loading, onClick: function () { return void runCopy(false); }, startIcon: copyBusy ? jsx(CircularProgress$1, { size: 14, color: "inherit" }) : undefined, children: copyBusy ? 'Copying…' : 'Copy' }), jsx(Button, { size: "small", variant: "outlined", disabled: !selected || !!(selected === null || selected === void 0 ? void 0 : selected.exists) || copyBusy || loading, onClick: function () { return void runCopy(true); }, startIcon: copyBusy ? jsx(CircularProgress$1, { size: 14, color: "inherit" }) : undefined, children: copyBusy ? 'Copying…' : 'Copy & edit' })] })] }));
    if (isToolbar) {
        return (jsx(Box, { sx: { display: 'inline-flex', alignItems: 'center', maxWidth: '100%' }, children: hint ? (jsx(Tooltip$1, { title: hint, children: jsx("span", { style: { display: 'inline-flex' }, children: controls }) })) : (controls) }));
    }
    return (jsxs(Box, { sx: { width: '100%', minWidth: 0 }, children: [hint ? (jsx(Typography$1, { variant: "body2", color: "text.secondary", sx: { mb: 1.5 }, children: hint })) : null, (sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) ? (jsx(Typography$1, { variant: "caption", color: "text.secondary", component: "div", sx: { mb: 1, fontFamily: 'ui-monospace, monospace', wordBreak: 'break-all' }, children: sourceItem.path })) : null, controls] }));
}

function TranslationDialog(props) {
    if (props === void 0) { props = {}; }
    var currentPreviewItem = useCurrentPreviewItem();
    var previewDerived = currentPreviewItem ? StudioAPI.getPreviewItem(currentPreviewItem) : null;
    var trimmedPath = typeof props.translationFormPath === 'string' ? props.translationFormPath.trim() : '';
    var sourceItemFromForm = trimmedPath !== ''
        ? {
            name: (typeof props.translationFormName === 'string' && props.translationFormName.trim()) ||
                pathLastSegment(trimmedPath),
            path: trimmedPath,
            contentType: (typeof props.translationFormContentType === 'string' && props.translationFormContentType) || ''
        }
        : null;
    var sourceItem = sourceItemFromForm !== null && sourceItemFromForm !== void 0 ? sourceItemFromForm : previewDerived;
    var sourceItemFromFormFlag = Boolean(sourceItemFromForm);
    return (jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxHeight: '100%',
            overflow: 'auto',
            bgcolor: 'background.default',
            pb: 2
        }, children: [jsxs(Box, { sx: { flexShrink: 0, px: 2.5, pt: 2.5, pb: 1 }, children: [jsx(Typography$1, { variant: "overline", color: "text.secondary", sx: { letterSpacing: 0.5 }, children: "Smart copy" }), jsx(Typography$1, { variant: "h6", component: "h1", sx: { fontWeight: 600, mt: 0.25 }, children: "Add translation" }), jsx(Typography$1, { variant: "body2", color: "text.secondary", sx: { mt: 0.5, maxWidth: 520 }, children: "Pick a locale that does not have this item yet. The copy uses the same path under that locale folder." })] }), jsx(Box, { sx: { flexShrink: 0, px: 2.5 }, children: jsx(SourceItemTable, { sourceItem: sourceItem, subheader: sourceItemFromFormFlag ? 'Current form item' : 'Item selected in preview' }) }), jsx(Divider$1, { sx: { mx: 2.5, my: 2, flexShrink: 0 } }), jsxs(Stack$1, { spacing: 1.5, sx: { px: 2.5, flexShrink: 0 }, children: [jsx(Typography$1, { variant: "subtitle2", sx: { fontWeight: 600 }, children: "Target locale" }), jsx(TranslateToLocalePicker, { variant: "dialog", translationFormPath: props.translationFormPath, translationFormName: props.translationFormName, translationFormContentType: props.translationFormContentType, translationAuthoringBase: props.translationAuthoringBase })] })] }));
}

var TRANSLATION_CONFIG_PATH = '/translation-config.xml';
var TRANSLATION_CONFIG_MODULE = 'studio';
var UIGOODIES_PLUGIN_ID = 'org.rd.plugin.uigoodies';
var DEFAULT_TRANSLATION_SECTION_TITLE = 'Translation';
/** Legacy / Smart Copy section title reused when present so Fix does not rename it. */
var DEFAULT_PREFERRED_EXISTING_SECTION_TITLES = [
    'Alternative Locale Properties'
];
function resolveTranslationFormSectionOptions(options) {
    var _a;
    var createTitle = String((_a = options === null || options === void 0 ? void 0 : options.sectionTitle) !== null && _a !== void 0 ? _a : DEFAULT_TRANSLATION_SECTION_TITLE).trim() ||
        DEFAULT_TRANSLATION_SECTION_TITLE;
    var preferRaw = (options === null || options === void 0 ? void 0 : options.preferExistingSectionTitles) !== undefined
        ? options.preferExistingSectionTitles
        : __spreadArray([], DEFAULT_PREFERRED_EXISTING_SECTION_TITLES, true);
    var preferExisting = [];
    var seenPrefer = new Set();
    for (var _i = 0, preferRaw_1 = preferRaw; _i < preferRaw_1.length; _i++) {
        var raw = preferRaw_1[_i];
        var title = String(raw || '').trim();
        if (!title) {
            continue;
        }
        var key = title.toLowerCase();
        if (seenPrefer.has(key) || key === createTitle.toLowerCase()) {
            continue;
        }
        seenPrefer.add(key);
        preferExisting.push(title);
    }
    var acceptedLower = new Set(__spreadArray([
        createTitle.toLowerCase()
    ], preferExisting.map(function (t) { return t.toLowerCase(); }), true));
    return { createTitle: createTitle, preferExisting: preferExisting, acceptedLower: acceptedLower };
}
function sectionTitleText(section) {
    var _a;
    return (((_a = section.querySelector(':scope > title')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
}
function isAcceptedTranslationSectionTitle(title, resolved) {
    return resolved.acceptedLower.has(title.trim().toLowerCase());
}
/**
 * Pick the section title to keep/create: first preferred title that already exists on the form,
 * else an existing createTitle section, else createTitle for a new section.
 */
function resolveTargetTranslationSectionTitle(doc, options) {
    var resolved = resolveTranslationFormSectionOptions(options);
    var sections = doc.querySelector('form > sections');
    if (!sections) {
        return resolved.createTitle;
    }
    var titles = Array.from(sections.querySelectorAll(':scope > section')).map(sectionTitleText);
    var _loop_1 = function (preferred) {
        if (titles.some(function (t) { return t.toLowerCase() === preferred.toLowerCase(); })) {
            return { value: preferred };
        }
    };
    for (var _i = 0, _a = resolved.preferExisting; _i < _a.length; _i++) {
        var preferred = _a[_i];
        var state_1 = _loop_1(preferred);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    var createMatch = titles.find(function (t) { return t.toLowerCase() === resolved.createTitle.toLowerCase(); });
    return createMatch || resolved.createTitle;
}
/** Human-readable labels for each required piece of the Translation form definition. */
var TRANSLATION_FORM_REQUIREMENTS = [
    { id: 'translation-section', label: 'Translation section' },
    { id: 'localeCode_s', label: 'localeCode_s (readonly input)' },
    { id: 'sourceLocaleCode_s', label: 'sourceLocaleCode_s (readonly input)' },
    { id: 'localeSourceId_s', label: 'localeSourceId_s (custom-locale control)' },
    { id: 'translations', label: 'translations (translation-versions control)' }
];
function normalizeLookupKey(code) {
    return String(code || '')
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
}
function folderLocaleFromKey(key) {
    return normalizeLookupKey(key);
}
function lookupMeta(code) {
    var _a;
    var k = normalizeLookupKey(code);
    var fromMeta = (_a = LOCALE_META[k]) !== null && _a !== void 0 ? _a : LOCALE_META[k.slice(0, 2)];
    if (fromMeta) {
        return { label: fromMeta.label, flag: fromMeta.flag };
    }
    // Unknown custom folder names (e.g. site-specific aliases) still appear with a globe.
    return { label: k, flag: '🌐' };
}
function contentTypeFormPath(contentTypeId) {
    var id = contentTypeId.startsWith('/') ? contentTypeId : "/".concat(contentTypeId);
    return "/content-types".concat(id, "/form-definition.xml").replace(/\/{2,}/g, '/');
}
function childText(parent, tag) {
    var el = parent.querySelector(":scope > ".concat(tag));
    return ((el === null || el === void 0 ? void 0 : el.textContent) || '').trim();
}
function attrText(el, name) {
    return (el.getAttribute(name) || '').trim();
}
/**
 * Parse one locale entry from translation-config.xml (document order = UI order).
 * Supports:
 * - `<locale><code>…</code><language>…</language><flag>…</flag></locale>`
 * - `<localeCode>…</localeCode>` (plain or with optional label/language/flag attributes)
 */
function parseLocaleEntry(elm) {
    var tag = (elm.tagName || '').toLowerCase();
    var rawCode = '';
    var languageRaw = '';
    var flagRaw = '';
    if (tag === 'locale') {
        rawCode = childText(elm, 'code') || childText(elm, 'localeCode');
        languageRaw = childText(elm, 'language') || childText(elm, 'label');
        flagRaw = childText(elm, 'flag');
    }
    else if (tag === 'localecode') {
        // Prefer nested <code> when present; otherwise direct text (ignore nested language/flag text).
        var nestedCode = childText(elm, 'code');
        if (nestedCode) {
            rawCode = nestedCode;
            languageRaw = childText(elm, 'language') || childText(elm, 'label');
            flagRaw = childText(elm, 'flag');
        }
        else {
            rawCode = (elm.textContent || '').trim();
            languageRaw = attrText(elm, 'language') || attrText(elm, 'label');
            flagRaw = attrText(elm, 'flag');
        }
    }
    else {
        return null;
    }
    var norm = folderLocaleFromKey(rawCode);
    if (!norm) {
        return null;
    }
    var meta = lookupMeta(norm);
    var customLanguage = Boolean(languageRaw);
    var customFlag = Boolean(flagRaw);
    return {
        locale: norm,
        label: customLanguage ? languageRaw : meta.label,
        flag: customFlag ? flagRaw : meta.flag,
        customLanguage: customLanguage,
        customFlag: customFlag
    };
}
function parseTranslationConfigXml(xml) {
    var _a;
    var trimmed = String(xml || '').trim();
    if (!trimmed) {
        return null;
    }
    var doc = new DOMParser().parseFromString(trimmed, 'application/xml');
    if (doc.querySelector('parsererror')) {
        return null;
    }
    var root = doc.querySelector('translation-config');
    if (!root) {
        return null;
    }
    var codesParent = root.querySelector('localeCodes');
    if (!codesParent) {
        return null;
    }
    var seen = new Set();
    var languages = [];
    // Preserve document order — do not sort.
    Array.from(codesParent.children).forEach(function (elm) {
        var row = parseLocaleEntry(elm);
        if (!row || seen.has(row.locale)) {
            return;
        }
        seen.add(row.locale);
        languages.push(row);
    });
    if (languages.length === 0) {
        return null;
    }
    var defaultRaw = (((_a = root.querySelector('defaultLocaleCode')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
    var baseLanguage = folderLocaleFromKey(defaultRaw);
    if (!baseLanguage || !seen.has(baseLanguage)) {
        baseLanguage = languages[0].locale;
    }
    return { baseLanguage: baseLanguage, languages: languages };
}
function buildTranslationConfigXml(model) {
    var rows = [];
    var seen = new Set();
    for (var _i = 0, _a = model.languages; _i < _a.length; _i++) {
        var row = _a[_i];
        var code = folderLocaleFromKey(row.locale);
        if (!code || seen.has(code)) {
            continue;
        }
        seen.add(code);
        rows.push(__assign(__assign({}, row), { locale: code }));
    }
    if (rows.length === 0) {
        throw new Error('At least one locale is required.');
    }
    var baseLanguage = folderLocaleFromKey(model.baseLanguage);
    if (!baseLanguage || !seen.has(baseLanguage)) {
        baseLanguage = rows[0].locale;
    }
    var lines = rows.map(function (row) {
        var parts = ["      <code>".concat(escapeXmlText(row.locale), "</code>")];
        if (row.customLanguage && row.label.trim()) {
            parts.push("      <language>".concat(escapeXmlText(row.label.trim()), "</language>"));
        }
        if (row.customFlag && row.flag.trim()) {
            parts.push("      <flag>".concat(escapeXmlText(row.flag.trim()), "</flag>"));
        }
        return "    <locale>\n".concat(parts.join('\n'), "\n    </locale>");
    });
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<translation-config>\n  <defaultLocaleCode>".concat(escapeXmlText(baseLanguage), "</defaultLocaleCode>\n  <localeCodes>\n").concat(lines.join('\n'), "\n  </localeCodes>\n</translation-config>\n");
}
/** Resolved display label (custom language or catalog). */
function resolveLocaleLanguage(row) {
    var label = String(row.label || '').trim();
    if (label) {
        return label;
    }
    return lookupMeta(row.locale).label;
}
/** Resolved display flag (custom or catalog). */
function resolveLocaleFlag(row) {
    var flag = String(row.flag || '').trim();
    if (flag) {
        return flag;
    }
    return lookupMeta(row.locale).flag;
}
function defaultTranslationConfigModel() {
    return {
        baseLanguage: 'en',
        languages: [
            { locale: 'en', label: 'English', flag: '🇺🇸', customLanguage: false, customFlag: false },
            { locale: 'es', label: 'Spanish', flag: '🇪🇸', customLanguage: false, customFlag: false }
        ]
    };
}
function suggestedLocaleOptions() {
    return Object.entries(LOCALE_META)
        .map(function (_a) {
        var code = _a[0], meta = _a[1];
        return ({ code: code, label: meta.label, flag: meta.flag });
    })
        .sort(function (a, b) { return a.label.localeCompare(b.label); });
}
function escapeXmlText(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function pluginName(field, name) {
    var plugin = field.querySelector(':scope > plugin');
    if (!plugin) {
        return false;
    }
    var pluginNameNode = plugin.querySelector('name');
    var pluginIdNode = plugin.querySelector('pluginId');
    var pluginNameVal = ((pluginNameNode === null || pluginNameNode === void 0 ? void 0 : pluginNameNode.textContent) || '').trim();
    var pluginIdVal = ((pluginIdNode === null || pluginIdNode === void 0 ? void 0 : pluginIdNode.textContent) || '').trim();
    return pluginNameVal === name && (!pluginIdVal || pluginIdVal === UIGOODIES_PLUGIN_ID);
}
function fieldId(field) {
    var _a;
    return (((_a = field.querySelector(':scope > id')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
}
function fieldType(field) {
    var _a;
    return (((_a = field.querySelector(':scope > type')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
}
function fieldPropertyValue(field, propName) {
    var _a, _b;
    var properties = field.querySelectorAll(':scope > properties > property');
    for (var _i = 0, _c = Array.from(properties); _i < _c.length; _i++) {
        var property = _c[_i];
        var name_1 = (((_a = property.querySelector('name')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
        if (name_1 === propName) {
            return (((_b = property.querySelector('value')) === null || _b === void 0 ? void 0 : _b.textContent) || '').trim();
        }
    }
    return null;
}
function isReadonlyInputField(field) {
    var _a;
    if (!field) {
        return false;
    }
    if (fieldType(field) !== 'input') {
        return false;
    }
    return ((_a = fieldPropertyValue(field, 'readonly')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true';
}
var TRANSLATION_FIELD_IDS = [
    'translations',
    'localeSourceId_s',
    'localeCode_s',
    'sourceLocaleCode_s'
];
var CANONICAL_FIELD_ORDER = __spreadArray([], TRANSLATION_FIELD_IDS, true);
function allFormFields(doc) {
    return Array.from(doc.querySelectorAll('form field')).filter(function (field) { return field.querySelector(':scope > id'); });
}
function allTranslationSections(doc, resolved) {
    if (resolved === void 0) { resolved = resolveTranslationFormSectionOptions(); }
    var sections = doc.querySelector('form > sections');
    if (!sections) {
        return [];
    }
    return Array.from(sections.querySelectorAll(':scope > section')).filter(function (section) {
        return isAcceptedTranslationSectionTitle(sectionTitleText(section), resolved);
    });
}
function findTranslationSection(doc, resolved) {
    var _a;
    if (resolved === void 0) { resolved = resolveTranslationFormSectionOptions(); }
    var matches = allTranslationSections(doc, resolved);
    if (matches.length === 0) {
        return null;
    }
    var _loop_2 = function (preferred) {
        var hit = matches.find(function (s) { return sectionTitleText(s).toLowerCase() === preferred.toLowerCase(); });
        if (hit) {
            return { value: hit };
        }
    };
    // Prefer preferred-existing title order, then createTitle.
    for (var _i = 0, _b = resolved.preferExisting; _i < _b.length; _i++) {
        var preferred = _b[_i];
        var state_2 = _loop_2(preferred);
        if (typeof state_2 === "object")
            return state_2.value;
    }
    var createHit = matches.find(function (s) { return sectionTitleText(s).toLowerCase() === resolved.createTitle.toLowerCase(); });
    return (_a = createHit !== null && createHit !== void 0 ? createHit : matches[0]) !== null && _a !== void 0 ? _a : null;
}
function translationSectionFieldElements(section) {
    if (!section) {
        return [];
    }
    return Array.from(section.querySelectorAll(':scope > fields > field'));
}
function fieldsById(doc, id) {
    return allFormFields(doc).filter(function (field) { return fieldId(field) === id; });
}
function fieldById(fields, id) {
    return fields.find(function (field) { return fieldId(field) === id; });
}
function isCanonicalTranslationsField(field) {
    return (Boolean(field) &&
        fieldType(field) === 'translation-versions' &&
        pluginName(field, 'translation-versions'));
}
function isCanonicalLocaleSourceIdField(field) {
    return Boolean(field) && fieldType(field) === 'custom-locale' && pluginName(field, 'custom-locale');
}
function isTranslationSectionCollapsed(section) {
    var _a;
    var defaultOpen = (((_a = section.querySelector(':scope > defaultOpen')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim().toLowerCase();
    return defaultOpen === 'false';
}
function isTranslationSectionLast(doc, section) {
    if (!section) {
        return false;
    }
    var sections = doc.querySelector('form > sections');
    if (!sections) {
        return false;
    }
    var allSections = sections.querySelectorAll(':scope > section');
    if (allSections.length === 0) {
        return false;
    }
    return allSections[allSections.length - 1] === section;
}
function analyzeFormDefinition(xml, options) {
    var resolved = resolveTranslationFormSectionOptions(options);
    var doc = new DOMParser().parseFromString(String(xml || ''), 'application/xml');
    if (doc.querySelector('parsererror')) {
        return {
            hasTranslationSection: false,
            hasLocaleCode: false,
            hasSourceLocaleCode: false,
            hasLocaleSourceId: false,
            hasCustomLocaleControl: false,
            hasTranslationVersions: false,
            hasTranslationsField: false,
            complete: false,
            missing: ['Invalid form-definition XML']
        };
    }
    var translationSections = allTranslationSections(doc, resolved);
    var translationSection = findTranslationSection(doc, resolved);
    var hasTranslationSection = translationSection !== null;
    var foundSectionTitle = translationSection ? sectionTitleText(translationSection) : undefined;
    var sectionFields = translationSectionFieldElements(translationSection);
    var localeCodeField = fieldById(sectionFields, 'localeCode_s');
    var sourceLocaleCodeField = fieldById(sectionFields, 'sourceLocaleCode_s');
    var localeSourceIdField = fieldById(sectionFields, 'localeSourceId_s');
    var translationsField = fieldById(sectionFields, 'translations');
    var hasLocaleCode = isReadonlyInputField(localeCodeField);
    var hasSourceLocaleCode = isReadonlyInputField(sourceLocaleCodeField);
    var hasLocaleSourceId = Boolean(localeSourceIdField);
    var hasCustomLocaleControl = isCanonicalLocaleSourceIdField(localeSourceIdField);
    var hasTranslationsField = Boolean(translationsField);
    var hasTranslationVersions = isCanonicalTranslationsField(translationsField);
    var missing = [];
    var sectionLabel = foundSectionTitle || resolved.createTitle;
    if (!hasTranslationSection) {
        missing.push("Form section \"".concat(resolved.createTitle, "\" (or preferred existing)"));
    }
    if (translationSections.length > 1) {
        missing.push("Multiple locale/translation sections (".concat(translationSections.length, ")"));
    }
    if (translationSection && !isTranslationSectionLast(doc, translationSection)) {
        missing.push("Section \"".concat(sectionLabel, "\" must be last"));
    }
    if (translationSection && !isTranslationSectionCollapsed(translationSection)) {
        missing.push("Section \"".concat(sectionLabel, "\" must default closed"));
    }
    TRANSLATION_FIELD_IDS.forEach(function (id) {
        var matches = fieldsById(doc, id);
        if (matches.length > 1) {
            missing.push("Duplicate ".concat(id, " field (").concat(matches.length, ")"));
        }
        var outsideSection = matches.filter(function (field) { return !translationSection || !translationSection.contains(field); });
        if (outsideSection.length > 0) {
            missing.push("".concat(id, " outside section \"").concat(sectionLabel, "\""));
        }
    });
    if (!localeCodeField) {
        missing.push('localeCode_s (readonly input)');
    }
    else if (!hasLocaleCode) {
        missing.push('localeCode_s (must be readonly input)');
    }
    if (!sourceLocaleCodeField) {
        missing.push('sourceLocaleCode_s (readonly input)');
    }
    else if (!hasSourceLocaleCode) {
        missing.push('sourceLocaleCode_s (must be readonly input)');
    }
    if (!localeSourceIdField) {
        missing.push('localeSourceId_s (custom-locale control)');
    }
    else if (!hasCustomLocaleControl) {
        missing.push('localeSourceId_s (must use custom-locale control)');
    }
    if (!translationsField) {
        missing.push('translations (translation-versions control)');
    }
    else if (!hasTranslationVersions) {
        missing.push('translations (must use translation-versions control)');
    }
    var translationFieldIdsInSection = sectionFields
        .map(function (field) { return fieldId(field); })
        .filter(function (id) { return TRANSLATION_FIELD_IDS.includes(id); });
    if (translationSection && translationFieldIdsInSection.length === CANONICAL_FIELD_ORDER.length) {
        if (translationFieldIdsInSection.join(',') !== CANONICAL_FIELD_ORDER.join(',')) {
            missing.push('Translation fields must be ordered: translations, localeSourceId_s, localeCode_s, sourceLocaleCode_s');
        }
    }
    else if (translationSection && translationFieldIdsInSection.length === 0) {
        missing.push("Section \"".concat(sectionLabel, "\" has no translation fields"));
    }
    else if (translationSection && translationFieldIdsInSection.length !== CANONICAL_FIELD_ORDER.length) {
        missing.push("Section \"".concat(sectionLabel, "\" must contain all 4 translation fields (found ").concat(translationFieldIdsInSection.length, ")"));
    }
    return {
        hasTranslationSection: hasTranslationSection,
        hasLocaleCode: hasLocaleCode,
        hasSourceLocaleCode: hasSourceLocaleCode,
        hasLocaleSourceId: hasLocaleSourceId,
        hasCustomLocaleControl: hasCustomLocaleControl,
        hasTranslationVersions: hasTranslationVersions,
        hasTranslationsField: hasTranslationsField,
        sectionTitle: foundSectionTitle,
        complete: missing.length === 0,
        missing: missing
    };
}
var READONLY_INPUT_FIELD = function (id, title) { return "\n\t\t\t\t<field>\n\t\t\t\t\t<type>input</type>\n\t\t\t\t\t<id>".concat(id, "</id>\n\t\t\t\t\t<iceId></iceId>\n\t\t\t\t\t<title>").concat(title, "</title>\n\t\t\t\t\t<description></description>\n\t\t\t\t\t<defaultValue></defaultValue>\n\t\t\t\t\t<help></help>\n\t\t\t\t\t<properties>\n\t\t\t\t\t\t<property>\n\t\t\t\t\t\t\t<name>size</name>\n\t\t\t\t\t\t\t<value>50</value>\n\t\t\t\t\t\t\t<type>int</type>\n\t\t\t\t\t\t</property>\n\t\t\t\t\t\t<property>\n\t\t\t\t\t\t\t<name>maxlength</name>\n\t\t\t\t\t\t\t<value>50</value>\n\t\t\t\t\t\t\t<type>int</type>\n\t\t\t\t\t\t</property>\n\t\t\t\t\t\t<property>\n\t\t\t\t\t\t\t<name>readonly</name>\n\t\t\t\t\t\t\t<value>true</value>\n\t\t\t\t\t\t\t<type>boolean</type>\n\t\t\t\t\t\t</property>\n\t\t\t\t\t\t<property>\n\t\t\t\t\t\t\t<name>tokenize</name>\n\t\t\t\t\t\t\t<value>false</value>\n\t\t\t\t\t\t\t<type>boolean</type>\n\t\t\t\t\t\t</property>\n\t\t\t\t\t\t<property>\n\t\t\t\t\t\t\t<name>escapeContent</name>\n\t\t\t\t\t\t\t<value>false</value>\n\t\t\t\t\t\t\t<type>boolean</type>\n\t\t\t\t\t\t</property>\n\t\t\t\t\t</properties>\n\t\t\t\t\t<constraints>\n\t\t\t\t\t</constraints>\n\t\t\t\t</field>"); };
var CUSTOM_LOCALE_FIELD = "\n\t\t\t\t<field>\n\t\t\t\t\t<type>custom-locale</type>\n\t\t\t\t\t<id>localeSourceId_s</id>\n\t\t\t\t\t<iceId></iceId>\n\t\t\t\t\t<title>Locale Source ID</title>\n\t\t\t\t\t<description></description>\n\t\t\t\t\t<defaultValue></defaultValue>\n\t\t\t\t\t<help></help>\n\t\t\t\t\t<plugin>\n\t\t\t\t\t\t<pluginId>".concat(UIGOODIES_PLUGIN_ID, "</pluginId>\n\t\t\t\t\t\t<type>control</type>\n\t\t\t\t\t\t<name>custom-locale</name>\n\t\t\t\t\t\t<filename>main.js</filename>\n\t\t\t\t\t</plugin>\n\t\t\t\t\t<properties>\n\t\t\t\t\t</properties>\n\t\t\t\t\t<constraints>\n\t\t\t\t\t</constraints>\n\t\t\t\t</field>");
var TRANSLATION_VERSIONS_FIELD = "\n\t\t\t\t<field>\n\t\t\t\t\t<type>translation-versions</type>\n\t\t\t\t\t<id>translations</id>\n\t\t\t\t\t<iceId></iceId>\n\t\t\t\t\t<title>Translations</title>\n\t\t\t\t\t<description></description>\n\t\t\t\t\t<defaultValue></defaultValue>\n\t\t\t\t\t<help></help>\n\t\t\t\t\t<plugin>\n\t\t\t\t\t\t<pluginId>".concat(UIGOODIES_PLUGIN_ID, "</pluginId>\n\t\t\t\t\t\t<type>control</type>\n\t\t\t\t\t\t<name>translation-versions</name>\n\t\t\t\t\t\t<filename>main.js</filename>\n\t\t\t\t\t</plugin>\n\t\t\t\t\t<properties>\n\t\t\t\t\t</properties>\n\t\t\t\t\t<constraints>\n\t\t\t\t\t</constraints>\n\t\t\t\t</field>");
function parseFieldFragment(fragment) {
    var doc = new DOMParser().parseFromString("<fields>".concat(fragment, "</fields>"), 'application/xml');
    if (doc.querySelector('parsererror') || !doc.documentElement.firstElementChild) {
        throw new Error('Unable to build translation field fragment.');
    }
    return doc.documentElement.firstElementChild;
}
function removeTranslationFieldsEverywhere(doc) {
    var removed = [];
    allFormFields(doc).forEach(function (field) {
        var _a;
        var id = fieldId(field);
        if (TRANSLATION_FIELD_IDS.includes(id)) {
            removed.push(id);
            (_a = field.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(field);
        }
    });
    return removed;
}
function harvestTranslationFields(doc) {
    var harvested = new Map();
    allFormFields(doc).forEach(function (field) {
        var id = fieldId(field);
        if (!TRANSLATION_FIELD_IDS.includes(id)) {
            return;
        }
        if (!harvested.has(id)) {
            harvested.set(id, field);
        }
    });
    return harvested;
}
function canonicalFieldTemplate(id) {
    switch (id) {
        case 'translations':
            return TRANSLATION_VERSIONS_FIELD;
        case 'localeSourceId_s':
            return CUSTOM_LOCALE_FIELD;
        case 'localeCode_s':
            return READONLY_INPUT_FIELD('localeCode_s', 'Locale Code');
        case 'sourceLocaleCode_s':
            return READONLY_INPUT_FIELD('sourceLocaleCode_s', 'Source Locale Code');
        default:
            throw new Error("Unknown translation field id: ".concat(id));
    }
}
function isCanonicalTranslationField(field, id) {
    switch (id) {
        case 'translations':
            return isCanonicalTranslationsField(field);
        case 'localeSourceId_s':
            return isCanonicalLocaleSourceIdField(field);
        case 'localeCode_s':
        case 'sourceLocaleCode_s':
            return isReadonlyInputField(field);
        default:
            return false;
    }
}
function buildCanonicalTranslationField(doc, id, harvested) {
    var existing = harvested.get(id);
    if (existing && isCanonicalTranslationField(existing, id)) {
        return doc.importNode(existing, true);
    }
    return doc.importNode(parseFieldFragment(canonicalFieldTemplate(id)), true);
}
function ensureTranslationSectionCollapsed(doc, section) {
    var _a;
    var defaultOpen = section.querySelector(':scope > defaultOpen');
    if (!defaultOpen) {
        defaultOpen = doc.createElement('defaultOpen');
        var description = section.querySelector(':scope > description');
        if (description === null || description === void 0 ? void 0 : description.nextSibling) {
            section.insertBefore(defaultOpen, description.nextSibling);
        }
        else if (description) {
            description.after(defaultOpen);
        }
        else {
            var title = section.querySelector(':scope > title');
            if (title === null || title === void 0 ? void 0 : title.nextSibling) {
                section.insertBefore(defaultOpen, title.nextSibling);
            }
            else {
                section.prepend(defaultOpen);
            }
        }
        defaultOpen.textContent = 'false';
        return true;
    }
    if (((_a = defaultOpen.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) !== 'false') {
        defaultOpen.textContent = 'false';
        return true;
    }
    return false;
}
function createTranslationSectionAtBottom(doc, sectionTitle) {
    var sections = doc.querySelector('form > sections');
    if (!sections) {
        throw new Error('form-definition.xml has no <sections> element.');
    }
    var section = doc.createElement('section');
    var title = doc.createElement('title');
    title.textContent = sectionTitle;
    var description = doc.createElement('description');
    var defaultOpen = doc.createElement('defaultOpen');
    defaultOpen.textContent = 'false';
    var fields = doc.createElement('fields');
    section.append(title, description, defaultOpen, fields);
    sections.appendChild(section);
    return section;
}
function ensureSectionFieldsContainer(doc, section) {
    var fields = section.querySelector(':scope > fields');
    if (!fields) {
        fields = doc.createElement('fields');
        section.appendChild(fields);
    }
    return fields;
}
function moveNonTranslationFields(fromSection, toFields) {
    var fromFields = fromSection.querySelector(':scope > fields');
    if (!fromFields) {
        return 0;
    }
    var moved = 0;
    Array.from(fromFields.querySelectorAll(':scope > field')).forEach(function (field) {
        var id = fieldId(field);
        if (TRANSLATION_FIELD_IDS.includes(id)) {
            return;
        }
        toFields.appendChild(field);
        moved += 1;
    });
    return moved;
}
/** Move locale/translation section to the bottom and collapse it by default. */
function ensureTranslationFormLayout(doc, options) {
    var resolved = resolveTranslationFormSectionOptions(options);
    var sections = doc.querySelector('form > sections');
    if (!sections) {
        return false;
    }
    var translationSection = findTranslationSection(doc, resolved);
    if (!translationSection) {
        return false;
    }
    var changed = false;
    if (!isTranslationSectionLast(doc, translationSection)) {
        sections.appendChild(translationSection);
        changed = true;
    }
    if (ensureTranslationSectionCollapsed(doc, translationSection)) {
        changed = true;
    }
    var fields = translationSection.querySelector(':scope > fields');
    if (fields && orderTranslationFieldsInSection(fields)) {
        changed = true;
    }
    return changed;
}
function orderTranslationFieldsInSection(fields) {
    var allFields = Array.from(fields.querySelectorAll(':scope > field'));
    var byId = new Map();
    allFields.forEach(function (field) {
        var id = fieldId(field);
        if (TRANSLATION_FIELD_IDS.includes(id) && !byId.has(id)) {
            byId.set(id, field);
        }
    });
    var ordered = CANONICAL_FIELD_ORDER.map(function (id) { return byId.get(id); }).filter(function (f) { return Boolean(f); });
    if (ordered.length === 0) {
        return false;
    }
    var currentOrder = allFields
        .map(function (field) { return fieldId(field); })
        .filter(function (id) { return TRANSLATION_FIELD_IDS.includes(id); });
    var desiredOrder = ordered.map(function (field) { return fieldId(field); });
    if (currentOrder.join(',') === desiredOrder.join(',')) {
        return false;
    }
    var insertAt = 0;
    for (var i = 0; i < allFields.length; i += 1) {
        if (TRANSLATION_FIELD_IDS.includes(fieldId(allFields[i]))) {
            break;
        }
        insertAt += 1;
    }
    var others = allFields.filter(function (field) { return !TRANSLATION_FIELD_IDS.includes(fieldId(field)); });
    while (fields.firstChild) {
        fields.removeChild(fields.firstChild);
    }
    others.slice(0, insertAt).forEach(function (field) { return fields.appendChild(field); });
    ordered.forEach(function (field) { return fields.appendChild(field); });
    others.slice(insertAt).forEach(function (field) { return fields.appendChild(field); });
    return true;
}
function consolidateTranslationForm(doc, options) {
    var _a;
    var resolved = resolveTranslationFormSectionOptions(options);
    var targetTitle = resolveTargetTranslationSectionTitle(doc, options);
    var actions = [];
    var harvested = harvestTranslationFields(doc);
    var movedFromElsewhere = TRANSLATION_FIELD_IDS.filter(function (id) {
        var field = harvested.get(id);
        if (!field) {
            return false;
        }
        var section = field.closest('section');
        var title = section ? sectionTitleText(section) : '';
        return title.toLowerCase() !== targetTitle.toLowerCase();
    });
    if (movedFromElsewhere.length > 0) {
        actions.push("Moved translation fields into section \"".concat(targetTitle, "\": ").concat(movedFromElsewhere.join(', ')));
    }
    // Prefer keeping an existing target section (preserves non-translation fields).
    var targetSection = null;
    var sectionsEl = doc.querySelector('form > sections');
    if (sectionsEl) {
        targetSection =
            (_a = Array.from(sectionsEl.querySelectorAll(':scope > section')).find(function (section) { return sectionTitleText(section).toLowerCase() === targetTitle.toLowerCase(); })) !== null && _a !== void 0 ? _a : null;
    }
    if (!targetSection) {
        targetSection = createTranslationSectionAtBottom(doc, targetTitle);
        actions.push("Created section \"".concat(targetTitle, "\""));
    }
    var targetFields = ensureSectionFieldsContainer(doc, targetSection);
    // Merge extras from duplicate accepted sections, then remove those duplicates.
    var duplicates = allTranslationSections(doc, resolved).filter(function (section) { return section !== targetSection; });
    var preservedExtras = 0;
    duplicates.forEach(function (section) {
        var _a;
        preservedExtras += moveNonTranslationFields(section, targetFields);
        (_a = section.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(section);
    });
    if (duplicates.length > 0) {
        actions.push(duplicates.length === 1
            ? "Removed duplicate locale/translation section"
            : "Removed ".concat(duplicates.length, " duplicate locale/translation sections"));
    }
    if (preservedExtras > 0) {
        actions.push("Preserved ".concat(preservedExtras, " non-translation field(s) in \"").concat(targetTitle, "\""));
    }
    var removedFields = removeTranslationFieldsEverywhere(doc);
    if (removedFields.length > 0 && movedFromElsewhere.length === 0) {
        var unique = Array.from(new Set(removedFields));
        actions.push("Normalized translation fields: ".concat(unique.join(', ')));
    }
    var added = [];
    CANONICAL_FIELD_ORDER.forEach(function (id) {
        if (!harvested.has(id)) {
            added.push(id);
        }
        targetFields.appendChild(buildCanonicalTranslationField(doc, id, harvested));
    });
    if (added.length > 0) {
        actions.push("Added missing translation fields: ".concat(added.join(', ')));
    }
    if (orderTranslationFieldsInSection(targetFields)) {
        actions.push("Ordered translation fields in \"".concat(targetTitle, "\""));
    }
    ensureTranslationFormLayout(doc, options);
    return actions;
}
function patchFormDefinitionWithTranslationFields(xml, options) {
    var originalXml = String(xml || '');
    var doc = new DOMParser().parseFromString(originalXml, 'application/xml');
    if (doc.querySelector('parsererror')) {
        throw new Error('Unable to parse form-definition.xml.');
    }
    var beforeStatus = analyzeFormDefinition(originalXml, options);
    var actions = consolidateTranslationForm(doc, options);
    var serialized = new XMLSerializer().serializeToString(doc);
    var afterStatus = analyzeFormDefinition(serialized, options);
    var changed = serialized !== originalXml || !beforeStatus.complete;
    return {
        xml: serialized,
        added: actions.length > 0 ? actions : changed ? ['Normalized translation form layout'] : [],
        changed: changed || !afterStatus.complete
    };
}

var GLOBAL_HOME_PATH = '/site/website/index.xml';
var WEBSITE_ROOT = '/site/website';
var COMPONENTS_ROOT = '/site/components';
var GLOBAL_HOME_INTERNAL_NAME = 'Global Home';
function newObjectId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function getXmlElementText(xml, localName) {
    var doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) {
        return '';
    }
    var el = doc.documentElement.querySelector(":scope > ".concat(localName));
    return ((el === null || el === void 0 ? void 0 : el.textContent) || '').trim();
}
function objectGroupIdFrom(objectId) {
    var id = String(objectId || '').trim();
    return id.length >= 4 ? id.substring(0, 4) : id;
}
function applyXmlFieldPatches(xml, patches, options) {
    var next = xml;
    for (var _i = 0, _a = Object.entries(patches); _i < _a.length; _i++) {
        var _b = _a[_i], tag = _b[0], value = _b[1];
        next = upsertXmlElementText(next, tag, value);
    }
    if (options === null || options === void 0 ? void 0 : options.objectId) {
        next = upsertXmlElementText(next, 'objectId', options.objectId);
        next = upsertXmlElementText(next, 'objectGroupId', objectGroupIdFrom(options.objectId));
    }
    return next;
}
function upsertXmlElementText(xml, localName, value) {
    var doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) {
        throw new Error('Invalid content XML');
    }
    var root = doc.documentElement;
    var el = root.querySelector(":scope > ".concat(localName));
    if (!el) {
        el = doc.createElement(localName);
        var anchor = root.querySelector(':scope > objectId') ||
            root.querySelector(':scope > merge-strategy') ||
            root.querySelector(':scope > file-name');
        if (anchor === null || anchor === void 0 ? void 0 : anchor.nextSibling) {
            root.insertBefore(el, anchor.nextSibling);
        }
        else if (anchor) {
            root.appendChild(el);
        }
        else {
            root.insertBefore(el, root.firstChild);
        }
    }
    el.textContent = value;
    var body = new XMLSerializer().serializeToString(doc);
    if (xml.trimStart().startsWith('<?xml') && !body.trimStart().startsWith('<?xml')) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n".concat(body);
    }
    return body;
}
function localeHomeInternalName(locale) {
    return "Home (".concat(String(locale || '').trim().toUpperCase(), ")");
}
function localeFolderName(locale, configuredLocales) {
    var key = String(locale || '')
        .trim()
        .toLowerCase();
    var match = configuredLocales.find(function (c) { return c.toLowerCase() === key; });
    return match !== null && match !== void 0 ? match : key;
}
function writeStoreContent(siteId, path, xml) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firstValueFrom(writeContent(siteId, path, xml))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function patchStoreContent(siteId, path, patches, options) {
    return __awaiter(this, void 0, void 0, function () {
        var current, next;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firstValueFrom(fetchContentXML(siteId, path))];
                case 1:
                    current = _a.sent();
                    if (!(current === null || current === void 0 ? void 0 : current.trim())) {
                        return [2 /*return*/, false];
                    }
                    next = applyXmlFieldPatches(current, patches, options);
                    if (next === current) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, writeStoreContent(siteId, path, next)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
function localeHomeUsesLocaleSourceId(siteId, authoringBase, configuredCodes, localeSourceId) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, configuredCodes_1, locale, folder, path, exists, xml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!localeSourceId) {
                        return [2 /*return*/, false];
                    }
                    _i = 0, configuredCodes_1 = configuredCodes;
                    _a.label = 1;
                case 1:
                    if (!(_i < configuredCodes_1.length)) return [3 /*break*/, 5];
                    locale = configuredCodes_1[_i];
                    folder = localeFolderName(locale, configuredCodes);
                    path = "".concat(WEBSITE_ROOT, "/").concat(folder, "/index.xml");
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, path)];
                case 2:
                    exists = _a.sent();
                    if (!exists) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, firstValueFrom(fetchContentXML(siteId, path))];
                case 3:
                    xml = _a.sent();
                    if (getXmlElementText(xml, 'localeSourceId_s') === localeSourceId) {
                        return [2 /*return*/, true];
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, false];
            }
        });
    });
}
function readLocaleHomeLineageId(siteId_1, authoringBase_1, configuredCodes_2) {
    return __awaiter(this, arguments, void 0, function (siteId, authoringBase, configuredCodes, excludeLocaleSourceIds) {
        var excluded, _i, configuredCodes_3, locale, folder, path, exists, xml, lineageId;
        if (excludeLocaleSourceIds === void 0) { excludeLocaleSourceIds = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    excluded = new Set(excludeLocaleSourceIds.filter(Boolean));
                    _i = 0, configuredCodes_3 = configuredCodes;
                    _a.label = 1;
                case 1:
                    if (!(_i < configuredCodes_3.length)) return [3 /*break*/, 5];
                    locale = configuredCodes_3[_i];
                    folder = localeFolderName(locale, configuredCodes);
                    path = "".concat(WEBSITE_ROOT, "/").concat(folder, "/index.xml");
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, path)];
                case 2:
                    exists = _a.sent();
                    if (!exists) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, firstValueFrom(fetchContentXML(siteId, path))];
                case 3:
                    xml = _a.sent();
                    lineageId = getXmlElementText(xml, 'localeSourceId_s');
                    if (lineageId && !excluded.has(lineageId)) {
                        return [2 /*return*/, lineageId];
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, null];
            }
        });
    });
}
function ensureComponentLocaleFolders(authoringBase, siteId, locales, configuredLocales) {
    return __awaiter(this, void 0, void 0, function () {
        var created, componentsExists, _i, locales_1, locale, folder, folderPath, exists, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    created = [];
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, COMPONENTS_ROOT)];
                case 1:
                    componentsExists = _a.sent();
                    if (!componentsExists) {
                        return [2 /*return*/, created];
                    }
                    _i = 0, locales_1 = locales;
                    _a.label = 2;
                case 2:
                    if (!(_i < locales_1.length)) return [3 /*break*/, 6];
                    locale = locales_1[_i];
                    folder = localeFolderName(locale, configuredLocales);
                    folderPath = "".concat(COMPONENTS_ROOT, "/").concat(folder);
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, folderPath)];
                case 3:
                    exists = _a.sent();
                    if (exists) {
                        return [3 /*break*/, 5];
                    }
                    return [4 /*yield*/, StudioAPI.createFolder(authoringBase, siteId, COMPONENTS_ROOT, folder)];
                case 4:
                    res = _a.sent();
                    if (res) {
                        created.push(folderPath);
                    }
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, created];
            }
        });
    });
}
/**
 * Copies the global home page into each configured locale folder and renames items for translation layout.
 *
 * - `/site/website/index.xml` → internal-name **Global Home** (standalone; not in the locale-home translation set)
 * - `/site/website/{locale}/index.xml` → internal-name **Home (LOCALE)** sharing one `localeSourceId_s` among locales
 * - Each locale home gets a unique `objectId` when created (via translation-copy); duplicates vs global are fixed on update
 * - Creates empty `/site/components/{locale}/` folders when `/site/components` exists
 */
function scaffoldLocaleSiteStructure(siteId, authoringBase, config) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, locales, configuredCodes, globalExists, globalHomeUpdated, baseLanguage, globalObjectId, globalLocaleSourceId, localeHomeLineageId, globalXml, globalLsidFromXml, existingLocaleLineageId, patchedGlobal, error_1, msg, componentFoldersCreated, error_2, _i, configuredCodes_2, locale, folder, targetPath, targetParent, displayName, targetExists, localeXml, localeObjectId, needsNewObjectId, updated, copyRes, pastedPath, error_3, msg, createdCount, updatedCount, ok, parts, message;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = [];
                    locales = [];
                    configuredCodes = config.languages.map(function (row) { return row.locale; });
                    if (!siteId || !authoringBase) {
                        return [2 /*return*/, { ok: false, message: 'Site and authoring context are required.', globalHomeUpdated: false, componentFoldersCreated: [], locales: locales, errors: errors }];
                    }
                    if (configuredCodes.length < 2) {
                        return [2 /*return*/, {
                                ok: false,
                                message: 'Save at least two locales in translation-config.xml first.',
                                globalHomeUpdated: false,
                                componentFoldersCreated: [],
                                locales: locales,
                                errors: errors
                            }];
                    }
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, GLOBAL_HOME_PATH)];
                case 1:
                    globalExists = _b.sent();
                    if (!globalExists) {
                        return [2 /*return*/, {
                                ok: false,
                                message: "Global home not found at ".concat(GLOBAL_HOME_PATH, ". Create a site home page there first."),
                                globalHomeUpdated: false,
                                componentFoldersCreated: [],
                                locales: locales,
                                errors: errors
                            }];
                    }
                    globalHomeUpdated = false;
                    baseLanguage = config.baseLanguage || configuredCodes[0];
                    globalObjectId = '';
                    globalLocaleSourceId = '';
                    localeHomeLineageId = '';
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, , 9]);
                    return [4 /*yield*/, firstValueFrom(fetchContentXML(siteId, GLOBAL_HOME_PATH))];
                case 3:
                    globalXml = _b.sent();
                    if (!(globalXml === null || globalXml === void 0 ? void 0 : globalXml.trim())) {
                        throw new Error("Could not read ".concat(GLOBAL_HOME_PATH));
                    }
                    globalObjectId = getXmlElementText(globalXml, 'objectId') || newObjectId();
                    globalLsidFromXml = getXmlElementText(globalXml, 'localeSourceId_s');
                    globalLocaleSourceId = globalLsidFromXml || newObjectId();
                    return [4 /*yield*/, readLocaleHomeLineageId(siteId, authoringBase, configuredCodes, [
                            globalLsidFromXml,
                            globalObjectId
                        ])];
                case 4:
                    existingLocaleLineageId = _b.sent();
                    localeHomeLineageId = existingLocaleLineageId || newObjectId();
                    // Global home is not a translation sibling of locale homes — keep lineage ids separate.
                    if (globalLocaleSourceId === localeHomeLineageId) {
                        globalLocaleSourceId = newObjectId();
                    }
                    return [4 /*yield*/, localeHomeUsesLocaleSourceId(siteId, authoringBase, configuredCodes, globalLocaleSourceId)];
                case 5:
                    if (_b.sent()) {
                        globalLocaleSourceId = newObjectId();
                    }
                    patchedGlobal = applyXmlFieldPatches(globalXml, {
                        'internal-name': GLOBAL_HOME_INTERNAL_NAME,
                        localeSourceId_s: globalLocaleSourceId,
                        localeCode_s: baseLanguage,
                        sourceLocaleCode_s: baseLanguage
                    });
                    if (!(patchedGlobal !== globalXml)) return [3 /*break*/, 7];
                    return [4 /*yield*/, writeStoreContent(siteId, GLOBAL_HOME_PATH, patchedGlobal)];
                case 6:
                    _b.sent();
                    globalHomeUpdated = true;
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    msg = error_1 instanceof Error ? error_1.message : String(error_1);
                    errors.push("Global home: ".concat(msg));
                    return [2 /*return*/, {
                            ok: false,
                            message: "Failed to update global home: ".concat(msg),
                            globalHomeUpdated: false,
                            componentFoldersCreated: [],
                            locales: locales,
                            errors: errors
                        }];
                case 9:
                    componentFoldersCreated = [];
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, ensureComponentLocaleFolders(authoringBase, siteId, configuredCodes, configuredCodes)];
                case 11:
                    componentFoldersCreated = _b.sent();
                    return [3 /*break*/, 13];
                case 12:
                    error_2 = _b.sent();
                    errors.push(error_2 instanceof Error ? error_2.message : String(error_2));
                    return [3 /*break*/, 13];
                case 13:
                    _i = 0, configuredCodes_2 = configuredCodes;
                    _b.label = 14;
                case 14:
                    if (!(_i < configuredCodes_2.length)) return [3 /*break*/, 24];
                    locale = configuredCodes_2[_i];
                    folder = localeFolderName(locale, configuredCodes);
                    targetPath = "".concat(WEBSITE_ROOT, "/").concat(folder, "/index.xml");
                    targetParent = "".concat(WEBSITE_ROOT, "/").concat(folder);
                    displayName = localeHomeInternalName(folder);
                    _b.label = 15;
                case 15:
                    _b.trys.push([15, 22, , 23]);
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, targetPath)];
                case 16:
                    targetExists = _b.sent();
                    if (!targetExists) return [3 /*break*/, 19];
                    return [4 /*yield*/, firstValueFrom(fetchContentXML(siteId, targetPath))];
                case 17:
                    localeXml = _b.sent();
                    localeObjectId = getXmlElementText(localeXml, 'objectId');
                    needsNewObjectId = Boolean(globalObjectId && localeObjectId && localeObjectId === globalObjectId);
                    return [4 /*yield*/, patchStoreContent(siteId, targetPath, {
                            'internal-name': displayName,
                            localeSourceId_s: localeHomeLineageId,
                            localeCode_s: folder.toLowerCase(),
                            sourceLocaleCode_s: baseLanguage,
                            'folder-name': folder
                        }, needsNewObjectId ? { objectId: newObjectId() } : undefined)];
                case 18:
                    updated = _b.sent();
                    locales.push({
                        locale: folder,
                        path: targetPath,
                        action: updated ? 'updated' : 'skipped',
                        message: updated
                            ? needsNewObjectId
                                ? 'Updated metadata and assigned a new objectId'
                                : 'Updated labels and locale metadata'
                            : 'Already present'
                    });
                    return [3 /*break*/, 23];
                case 19: return [4 /*yield*/, StudioAPI.copyItem(authoringBase, siteId, GLOBAL_HOME_PATH, targetParent, targetPath)];
                case 20:
                    copyRes = _b.sent();
                    pastedPath = ((copyRes === null || copyRes === void 0 ? void 0 : copyRes.pastedPath) || ((_a = copyRes === null || copyRes === void 0 ? void 0 : copyRes.items) === null || _a === void 0 ? void 0 : _a[0]));
                    if (!(copyRes === null || copyRes === void 0 ? void 0 : copyRes.ok) || !pastedPath) {
                        errors.push("".concat(folder, ": ").concat((copyRes === null || copyRes === void 0 ? void 0 : copyRes.message) || 'Copy failed'));
                        locales.push({
                            locale: folder,
                            path: targetPath,
                            action: 'skipped',
                            message: (copyRes === null || copyRes === void 0 ? void 0 : copyRes.message) || 'Copy failed'
                        });
                        return [3 /*break*/, 23];
                    }
                    return [4 /*yield*/, patchStoreContent(siteId, pastedPath, {
                            'internal-name': displayName,
                            localeSourceId_s: localeHomeLineageId,
                            localeCode_s: folder.toLowerCase(),
                            sourceLocaleCode_s: baseLanguage,
                            'folder-name': folder
                        })];
                case 21:
                    _b.sent();
                    locales.push({
                        locale: folder,
                        path: pastedPath,
                        action: 'created',
                        message: 'Copied from global home'
                    });
                    return [3 /*break*/, 23];
                case 22:
                    error_3 = _b.sent();
                    msg = error_3 instanceof Error ? error_3.message : String(error_3);
                    errors.push("".concat(folder, ": ").concat(msg));
                    locales.push({ locale: folder, path: targetPath, action: 'skipped', message: msg });
                    return [3 /*break*/, 23];
                case 23:
                    _i++;
                    return [3 /*break*/, 14];
                case 24:
                    createdCount = locales.filter(function (row) { return row.action === 'created'; }).length;
                    updatedCount = locales.filter(function (row) { return row.action === 'updated'; }).length;
                    ok = errors.length === 0;
                    parts = [];
                    if (globalHomeUpdated) {
                        parts.push('global home renamed to Global Home');
                    }
                    if (createdCount) {
                        parts.push("".concat(createdCount, " locale home page(s) created"));
                    }
                    if (updatedCount) {
                        parts.push("".concat(updatedCount, " locale home page(s) updated"));
                    }
                    if (componentFoldersCreated.length) {
                        parts.push("".concat(componentFoldersCreated.length, " component locale folder(s) created"));
                    }
                    message = ok
                        ? parts.length
                            ? parts.join('; ')
                            : 'Locale site structure is already in place.'
                        : "Completed with ".concat(errors.length, " error(s). ").concat(parts.join('; '));
                    return [2 /*return*/, {
                            ok: ok,
                            message: message,
                            globalHomeUpdated: globalHomeUpdated,
                            componentFoldersCreated: componentFoldersCreated,
                            locales: locales,
                            errors: errors
                        }];
            }
        });
    });
}

function statusColor(complete, missingCount) {
    if (complete) {
        return 'success';
    }
    if (missingCount > 0) {
        return 'warning';
    }
    return 'default';
}
function TranslationConfigTools() {
    var _this = this;
    var _a;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var authoringBase = useEnv().authoringBase;
    var _b = useState('locales'), tab = _b[0], setTab = _b[1];
    var _c = useState(true), configLoading = _c[0], setConfigLoading = _c[1];
    var _d = useState(false), configSaving = _d[0], setConfigSaving = _d[1];
    var _e = useState(false), configExists = _e[0], setConfigExists = _e[1];
    var _f = useState(''), configError = _f[0], setConfigError = _f[1];
    var _g = useState(defaultTranslationConfigModel()), configModel = _g[0], setConfigModel = _g[1];
    var _h = useState(null), newLocaleCode = _h[0], setNewLocaleCode = _h[1];
    var _j = useState(false), typesLoading = _j[0], setTypesLoading = _j[1];
    var _k = useState(''), typesError = _k[0], setTypesError = _k[1];
    var _l = useState([]), typeRows = _l[0], setTypeRows = _l[1];
    var _m = useState(new Set()), selectedTypeIds = _m[0], setSelectedTypeIds = _m[1];
    var _o = useState(false), applyLoading = _o[0], setApplyLoading = _o[1];
    var _p = useState(false), scaffoldOpen = _p[0], setScaffoldOpen = _p[1];
    var _q = useState(false), scaffoldLoading = _q[0], setScaffoldLoading = _q[1];
    var _r = useState(DEFAULT_TRANSLATION_SECTION_TITLE), sectionTitle = _r[0], setSectionTitle = _r[1];
    var _s = useState(__spreadArray([], DEFAULT_PREFERRED_EXISTING_SECTION_TITLES, true)), preferExistingTitles = _s[0], setPreferExistingTitles = _s[1];
    var formSectionOptions = useMemo(function () { return ({
        sectionTitle: sectionTitle.trim() || DEFAULT_TRANSLATION_SECTION_TITLE,
        preferExistingSectionTitles: preferExistingTitles
    }); }, [sectionTitle, preferExistingTitles]);
    var localeSuggestions = useMemo(function () { return suggestedLocaleOptions(); }, []);
    var localePreview = useMemo(function () {
        return configModel.languages
            .map(function (row) { return "".concat(WEBSITE_ROOT, "/").concat(row.locale, "/index.xml \u2192 ").concat(localeHomeInternalName(row.locale)); })
            .join('\n');
    }, [configModel.languages]);
    var loadConfig = useCallback(function () {
        if (!siteId) {
            setConfigLoading(false);
            return;
        }
        setConfigLoading(true);
        setConfigError('');
        var sub = fetchConfigurationXML(siteId, TRANSLATION_CONFIG_PATH, TRANSLATION_CONFIG_MODULE).subscribe({
            next: function (xml) {
                var parsed = parseTranslationConfigXml(xml);
                if (parsed) {
                    setConfigModel(parsed);
                    setConfigExists(true);
                }
                else {
                    setConfigModel(defaultTranslationConfigModel());
                    setConfigExists(false);
                    setConfigError('translation-config.xml is missing or invalid. Save below to create it (not site-config.xml).');
                }
                setConfigLoading(false);
            },
            error: function () {
                setConfigModel(defaultTranslationConfigModel());
                setConfigExists(false);
                setConfigError('translation-config.xml is not configured yet. Save below to create it (not site-config.xml).');
                setConfigLoading(false);
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [siteId]);
    useEffect(function () {
        var cleanup = loadConfig();
        return cleanup;
    }, [loadConfig]);
    var scanContentTypes = useCallback(function () {
        if (!siteId) {
            return;
        }
        setTypesLoading(true);
        setTypesError('');
        setTypeRows([]);
        setSelectedTypeIds(new Set());
        var sub = fetchContentTypes$1(siteId)
            .pipe(mergeMap(function (types) { return from(types !== null && types !== void 0 ? types : []); }), map(function (type) {
            var _a, _b, _c;
            return ({
                id: ((_a = type.id) !== null && _a !== void 0 ? _a : '').trim(),
                name: ((_c = (_b = type.name) !== null && _b !== void 0 ? _b : type.id) !== null && _c !== void 0 ? _c : '').trim()
            });
        }), mergeMap(function (type) {
            if (!type.id) {
                return of(null);
            }
            var formPath = contentTypeFormPath(type.id);
            return fetchConfigurationXML(siteId, formPath, TRANSLATION_CONFIG_MODULE).pipe(map(function (xml) { return ({
                id: type.id,
                name: type.name || type.id,
                formPath: formPath,
                status: analyzeFormDefinition(xml, formSectionOptions)
            }); }), catchError(function () {
                return of({
                    id: type.id,
                    name: type.name || type.id,
                    formPath: formPath,
                    status: {
                        hasTranslationSection: false,
                        hasLocaleCode: false,
                        hasSourceLocaleCode: false,
                        hasLocaleSourceId: false,
                        hasCustomLocaleControl: false,
                        hasTranslationVersions: false,
                        hasTranslationsField: false,
                        complete: false,
                        missing: ['Unable to load form-definition.xml']
                    }
                });
            }));
        }), toArray(), map(function (rows) {
            return rows
                .filter(Boolean)
                .sort(function (a, b) { return a.id.localeCompare(b.id); });
        }))
            .subscribe({
            next: function (rows) {
                setTypeRows(rows);
                var missing = rows.filter(function (row) { return !row.status.complete; }).map(function (row) { return row.id; });
                setSelectedTypeIds(new Set(missing));
                setTypesLoading(false);
            },
            error: function (error) {
                setTypesError(error instanceof Error ? error.message : String(error));
                setTypesLoading(false);
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [siteId, formSectionOptions]);
    useEffect(function () {
        if (tab === 'content-types' && siteId && typeRows.length === 0 && !typesLoading) {
            scanContentTypes();
        }
    }, [tab, siteId, typeRows.length, typesLoading, scanContentTypes]);
    var saveConfig = function () {
        if (!siteId) {
            return;
        }
        if (configModel.languages.length < 2) {
            dispatch(showSystemNotification({
                message: 'Add at least two locales for translation workflows.',
                options: { variant: 'warning' }
            }));
            return;
        }
        setConfigSaving(true);
        var xml = '';
        try {
            xml = buildTranslationConfigXml(configModel);
        }
        catch (error) {
            setConfigSaving(false);
            dispatch(showSystemNotification({
                message: error instanceof Error ? error.message : String(error),
                options: { variant: 'error' }
            }));
            return;
        }
        writeConfiguration(siteId, TRANSLATION_CONFIG_PATH, TRANSLATION_CONFIG_MODULE, xml).subscribe({
            next: function () {
                setConfigSaving(false);
                setConfigExists(true);
                setConfigError('');
                dispatch(showSystemNotification({
                    message: 'Saved /config/studio/translation-config.xml',
                    options: { variant: 'success' }
                }));
            },
            error: function (error) {
                setConfigSaving(false);
                dispatch(showSystemNotification({
                    message: error instanceof Error ? error.message : String(error),
                    options: { variant: 'error' }
                }));
            }
        });
    };
    var addLocale = function () {
        var code = (newLocaleCode || '').trim().toLowerCase().replace(/_/g, '-');
        if (!code) {
            return;
        }
        if (configModel.languages.some(function (row) { return row.locale === code; })) {
            return;
        }
        var suggestion = localeSuggestions.find(function (row) { return row.code === code; });
        var catalog = getLocaleMeta(code);
        setConfigModel(function (prev) {
            var _a, _b, _c, _d;
            return (__assign(__assign({}, prev), { languages: __spreadArray(__spreadArray([], prev.languages, true), [
                    {
                        locale: code,
                        label: (_b = (_a = suggestion === null || suggestion === void 0 ? void 0 : suggestion.label) !== null && _a !== void 0 ? _a : catalog.label) !== null && _b !== void 0 ? _b : code,
                        flag: (_d = (_c = suggestion === null || suggestion === void 0 ? void 0 : suggestion.flag) !== null && _c !== void 0 ? _c : catalog.flag) !== null && _d !== void 0 ? _d : '🌐',
                        customLanguage: false,
                        customFlag: false
                    }
                ], false) }));
        });
        setNewLocaleCode(null);
    };
    var removeLocale = function (locale) {
        setConfigModel(function (prev) {
            var _a, _b;
            var languages = prev.languages.filter(function (row) { return row.locale !== locale; });
            var baseLanguage = prev.baseLanguage;
            if (baseLanguage === locale) {
                baseLanguage = (_b = (_a = languages[0]) === null || _a === void 0 ? void 0 : _a.locale) !== null && _b !== void 0 ? _b : '';
            }
            return { baseLanguage: baseLanguage, languages: languages };
        });
    };
    var moveLocale = function (index, delta) {
        setConfigModel(function (prev) {
            var next = __spreadArray([], prev.languages, true);
            var target = index + delta;
            if (target < 0 || target >= next.length) {
                return prev;
            }
            var tmp = next[index];
            next[index] = next[target];
            next[target] = tmp;
            return __assign(__assign({}, prev), { languages: next });
        });
    };
    var updateLocaleRow = function (locale, patch) {
        setConfigModel(function (prev) { return (__assign(__assign({}, prev), { languages: prev.languages.map(function (row) { return (row.locale === locale ? __assign(__assign({}, row), patch) : row); }) })); });
    };
    var applyTranslationFields = function () {
        if (!siteId || selectedTypeIds.size === 0) {
            return;
        }
        var targets = typeRows.filter(function (row) { return selectedTypeIds.has(row.id); });
        setApplyLoading(true);
        from(targets)
            .pipe(concatMap(function (row) {
            return fetchConfigurationXML(siteId, row.formPath, TRANSLATION_CONFIG_MODULE).pipe(mergeMap(function (xml) {
                var patched = patchFormDefinitionWithTranslationFields(xml, formSectionOptions);
                if (!patched.changed) {
                    return of({ id: row.id, skipped: true });
                }
                return writeConfiguration(siteId, row.formPath, TRANSLATION_CONFIG_MODULE, patched.xml).pipe(map(function () { return ({ id: row.id, skipped: false, actions: patched.added.length }); }));
            }));
        }), toArray())
            .subscribe({
            next: function (results) {
                setApplyLoading(false);
                var updated = results.filter(function (result) { return !result.skipped; }).length;
                dispatch(showSystemNotification({
                    message: updated
                        ? "Fixed translation setup on ".concat(updated, " content type(s).")
                        : 'Selected content types already match the translation form layout.',
                    options: { variant: 'success' }
                }));
                scanContentTypes();
            },
            error: function (error) {
                setApplyLoading(false);
                dispatch(showSystemNotification({
                    message: error instanceof Error ? error.message : String(error),
                    options: { variant: 'error' }
                }));
            }
        });
    };
    var runScaffold = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!siteId || !authoringBase) {
                        return [2 /*return*/];
                    }
                    if (configModel.languages.length < 2) {
                        dispatch(showSystemNotification({
                            message: 'Save at least two locales before creating locale home pages.',
                            options: { variant: 'warning' }
                        }));
                        return [2 /*return*/];
                    }
                    setScaffoldLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, scaffoldLocaleSiteStructure(siteId, authoringBase, configModel)];
                case 2:
                    result = _a.sent();
                    dispatch(showSystemNotification({
                        message: result.message,
                        options: { variant: result.ok ? 'success' : 'warning' }
                    }));
                    if (result.ok) {
                        setScaffoldOpen(false);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    dispatch(showSystemNotification({
                        message: error_1 instanceof Error ? error_1.message : String(error_1),
                        options: { variant: 'error' }
                    }));
                    return [3 /*break*/, 5];
                case 4:
                    setScaffoldLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var incompleteCount = typeRows.filter(function (row) { return !row.status.complete; }).length;
    return (jsxs(Box$1, { sx: { height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', p: 2, gap: 2 }, children: [jsxs(Box$1, { children: [jsx(Typography, { variant: "h5", sx: { fontWeight: 700 }, children: "Translation" }), jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Configure site locales and add Translation form controls to content types for project", ' ', jsx(Box$1, { component: "span", sx: { fontFamily: 'monospace' }, children: siteId || '—' }), "."] })] }), jsxs(Tabs, { value: tab, onChange: function (_, value) { return setTab(value); }, children: [jsx(Tab, { value: "locales", label: "Locales" }), jsx(Tab, { value: "content-types", label: "Content types".concat(incompleteCount ? " (".concat(incompleteCount, ")") : '') })] }), tab === 'locales' && (jsx(Paper, { sx: { p: 2, display: 'flex', flexDirection: 'column', gap: 2 }, children: configLoading ? (jsx(Box$1, { sx: { display: 'flex', justifyContent: 'center', py: 4 }, children: jsx(CircularProgress, { size: 28 }) })) : (jsxs(Fragment, { children: [configError && (jsx(Alert, { severity: configExists ? 'warning' : 'info', onClose: function () { return setConfigError(''); }, children: configError })), jsxs(Typography, { variant: "subtitle2", color: "text.secondary", children: ["File: ", jsx(Box$1, { component: "code", children: "/config/studio/translation-config.xml" }), ' — ', "not ", jsx(Box$1, { component: "code", children: "site-config.xml" }), ". List order is used by all translation UIs."] }), jsx(TextField$1, { select: true, SelectProps: { native: true }, label: "Default locale", value: configModel.baseLanguage, onChange: function (event) {
                                return setConfigModel(function (prev) { return (__assign(__assign({}, prev), { baseLanguage: event.target.value })); });
                            }, size: "small", sx: { maxWidth: 280 }, children: configModel.languages.map(function (row) { return (jsxs("option", { value: row.locale, children: [resolveLocaleFlag(row), " ", resolveLocaleLanguage(row), " (", row.locale, ")"] }, row.locale)); }) }), jsxs(Table, { size: "small", sx: { maxWidth: 920 }, children: [jsx(TableHead, { children: jsxs(TableRow, { children: [jsx(TableCell, { width: 88, children: "Order" }), jsx(TableCell, { width: 100, children: "Code" }), jsx(TableCell, { children: "Language (optional)" }), jsx(TableCell, { width: 120, children: "Flag (optional)" }), jsx(TableCell, { width: 56 })] }) }), jsx(TableBody, { children: configModel.languages.map(function (row, index) {
                                        var catalog = getLocaleMeta(row.locale);
                                        return (jsxs(TableRow, { selected: row.locale === configModel.baseLanguage, children: [jsx(TableCell, { children: jsxs(Box$1, { sx: { display: 'flex', gap: 0.25 }, children: [jsx(Tooltip$1, { title: "Move up", children: jsx("span", { children: jsx(IconButton, { size: "small", disabled: index === 0, onClick: function () { return moveLocale(index, -1); }, "aria-label": "Move ".concat(row.locale, " up"), children: jsx(ArrowUpwardRoundedIcon, { fontSize: "small" }) }) }) }), jsx(Tooltip$1, { title: "Move down", children: jsx("span", { children: jsx(IconButton, { size: "small", disabled: index === configModel.languages.length - 1, onClick: function () { return moveLocale(index, 1); }, "aria-label": "Move ".concat(row.locale, " down"), children: jsx(ArrowDownwardRoundedIcon, { fontSize: "small" }) }) }) })] }) }), jsxs(TableCell, { children: [jsx(Box$1, { component: "code", sx: { fontWeight: 600 }, children: row.locale }), row.locale === configModel.baseLanguage ? (jsx(Typography, { variant: "caption", color: "primary", display: "block", children: "default" })) : null] }), jsx(TableCell, { children: jsx(TextField$1, { size: "small", fullWidth: true, placeholder: catalog.label || row.locale, value: row.customLanguage ? row.label : '', onChange: function (event) {
                                                            var value = event.target.value;
                                                            if (!value.trim()) {
                                                                updateLocaleRow(row.locale, {
                                                                    label: catalog.label || row.locale,
                                                                    customLanguage: false
                                                                });
                                                            }
                                                            else {
                                                                updateLocaleRow(row.locale, {
                                                                    label: value,
                                                                    customLanguage: true
                                                                });
                                                            }
                                                        }, helperText: row.customLanguage ? 'Saved in config' : "Catalog: ".concat(catalog.label || row.locale) }) }), jsx(TableCell, { children: jsx(TextField$1, { size: "small", fullWidth: true, placeholder: catalog.flag || '🌐', value: row.customFlag ? row.flag : '', onChange: function (event) {
                                                            var value = event.target.value;
                                                            if (!value.trim()) {
                                                                updateLocaleRow(row.locale, {
                                                                    flag: catalog.flag || '🌐',
                                                                    customFlag: false
                                                                });
                                                            }
                                                            else {
                                                                updateLocaleRow(row.locale, {
                                                                    flag: value,
                                                                    customFlag: true
                                                                });
                                                            }
                                                        }, helperText: row.customFlag ? 'Saved in config' : "Catalog: ".concat(catalog.flag || '🌐') }) }), jsx(TableCell, { children: jsx(Tooltip$1, { title: "Remove locale", children: jsx("span", { children: jsx(IconButton, { size: "small", color: "error", disabled: configModel.languages.length <= 1, onClick: function () { return removeLocale(row.locale); }, "aria-label": "Remove ".concat(row.locale), children: jsx(DeleteOutlineRoundedIcon, { fontSize: "small" }) }) }) }) })] }, row.locale));
                                    }) })] }), jsxs(Box$1, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }, children: [jsx(Autocomplete, { size: "small", sx: { minWidth: 280 }, options: localeSuggestions, getOptionLabel: function (option) { return "".concat(option.flag, " ").concat(option.label, " (").concat(option.code, ")"); }, value: (_a = localeSuggestions.find(function (row) { return row.code === newLocaleCode; })) !== null && _a !== void 0 ? _a : null, onChange: function (_, value) { var _a; return setNewLocaleCode((_a = value === null || value === void 0 ? void 0 : value.code) !== null && _a !== void 0 ? _a : null); }, renderInput: function (params) { return jsx(TextField$1, __assign({}, params, { label: "Add locale", placeholder: "Search locales" })); } }), jsx(Button$1, { variant: "outlined", onClick: addLocale, disabled: !newLocaleCode, children: "Add locale" })] }), jsxs(Box$1, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [jsx(Button$1, { variant: "contained", startIcon: configSaving ? jsx(CircularProgress, { size: 16, color: "inherit" }) : jsx(SaveRoundedIcon, {}), onClick: saveConfig, disabled: configSaving, children: "Save locale config" }), jsx(Button$1, { variant: "outlined", startIcon: jsx(HomeWorkOutlinedIcon, {}), onClick: function () { return setScaffoldOpen(true); }, disabled: configLoading || configModel.languages.length < 2 || !siteId, children: "Create locale site structure" }), jsx(Button$1, { variant: "text", startIcon: jsx(RefreshRoundedIcon, {}), onClick: loadConfig, children: "Reload" })] }), jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'block', maxWidth: 720 }, children: [jsx("strong", { children: "Create locale site structure" }), " copies", ' ', jsx(Box$1, { component: "code", children: GLOBAL_HOME_PATH }), " into each configured locale folder, renames the global page to ", jsx("strong", { children: GLOBAL_HOME_INTERNAL_NAME }), ", and creates locale home pages named", ' ', jsx("strong", { children: localeHomeInternalName('en') }), ", etc. Empty", ' ', jsx(Box$1, { component: "code", children: "/site/components/<locale>/" }), " folders are added when", ' ', jsx(Box$1, { component: "code", children: "/site/components" }), " exists."] })] })) })), jsxs(Dialog, { open: scaffoldOpen, onClose: scaffoldLoading ? undefined : function () { return setScaffoldOpen(false); }, maxWidth: "sm", fullWidth: true, children: [jsx(DialogTitle, { children: "Create locale site structure" }), jsxs(DialogContent, { dividers: true, children: [jsxs(Typography, { variant: "body2", sx: { mb: 2 }, children: ["This will update ", jsx(Box$1, { component: "code", children: GLOBAL_HOME_PATH }), " to internal-name", ' ', jsx("strong", { children: GLOBAL_HOME_INTERNAL_NAME }), " (standalone \u2014 not grouped with locale homes), then copy it into each locale folder below. Locale homes share one translation lineage and each gets its own", ' ', jsx(Box$1, { component: "code", children: "objectId" }), ". Existing locale home pages are updated, not overwritten."] }), jsx(Typography, { variant: "subtitle2", sx: { mb: 1 }, children: "Planned locale home pages" }), jsx(Box$1, { component: "pre", sx: {
                                    m: 0,
                                    p: 1.5,
                                    bgcolor: 'action.hover',
                                    borderRadius: 1,
                                    fontSize: '0.75rem',
                                    overflow: 'auto',
                                    whiteSpace: 'pre-wrap'
                                }, children: localePreview || 'Add locales and save the config first.' })] }), jsxs(DialogActions, { children: [jsx(Button$1, { onClick: function () { return setScaffoldOpen(false); }, disabled: scaffoldLoading, children: "Cancel" }), jsx(Button$1, { variant: "contained", onClick: function () { return void runScaffold(); }, disabled: scaffoldLoading || configModel.languages.length < 2, startIcon: scaffoldLoading ? jsx(CircularProgress, { size: 16, color: "inherit" }) : jsx(HomeWorkOutlinedIcon, {}), children: scaffoldLoading ? 'Creating…' : 'Create structure' })] })] }), tab === 'content-types' && (jsxs(Paper, { sx: { p: 2, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0, flex: 1 }, children: [jsxs(Box$1, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }, children: [jsx(Button$1, { variant: "outlined", startIcon: typesLoading ? jsx(CircularProgress, { size: 16 }) : jsx(RefreshRoundedIcon, {}), onClick: scanContentTypes, disabled: typesLoading || !siteId, children: "Scan content types" }), jsx(Button$1, { variant: "contained", startIcon: applyLoading ? jsx(CircularProgress, { size: 16, color: "inherit" }) : jsx(PlaylistAddRoundedIcon, {}), onClick: applyTranslationFields, disabled: applyLoading || selectedTypeIds.size === 0, children: "Fix translation setup on selected" }), jsx(FormControlLabel, { control: jsx(Checkbox$1, { checked: typeRows.length > 0 && selectedTypeIds.size === typeRows.length, indeterminate: selectedTypeIds.size > 0 && selectedTypeIds.size < typeRows.length, onChange: function (event) {
                                        if (event.target.checked) {
                                            setSelectedTypeIds(new Set(typeRows.map(function (row) { return row.id; })));
                                        }
                                        else {
                                            setSelectedTypeIds(new Set());
                                        }
                                    } }), label: "Select all" }), jsx(FormControlLabel, { control: jsx(Checkbox$1, { checked: typeRows.filter(function (row) { return !row.status.complete; }).length > 0 &&
                                        typeRows.filter(function (row) { return !row.status.complete; }).every(function (row) { return selectedTypeIds.has(row.id); }), indeterminate: typeRows.some(function (row) { return !row.status.complete && selectedTypeIds.has(row.id); }) &&
                                        !typeRows.filter(function (row) { return !row.status.complete; }).every(function (row) { return selectedTypeIds.has(row.id); }), onChange: function (event) {
                                        if (event.target.checked) {
                                            setSelectedTypeIds(new Set(typeRows.filter(function (row) { return !row.status.complete; }).map(function (row) { return row.id; })));
                                        }
                                        else {
                                            setSelectedTypeIds(new Set());
                                        }
                                    } }), label: "Select incomplete" })] }), typesError && jsx(Alert, { severity: "error", children: typesError }), jsxs(Box$1, { sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 1.5,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            maxWidth: 720
                        }, children: [jsx(Typography, { variant: "subtitle2", children: "Form section" }), jsx(TextField$1, { size: "small", label: "Section title when creating new", value: sectionTitle, onChange: function (event) { return setSectionTitle(event.target.value); }, helperText: "Default: ".concat(DEFAULT_TRANSLATION_SECTION_TITLE), sx: { maxWidth: 420 } }), jsx(Autocomplete, { multiple: true, freeSolo: true, size: "small", options: __spreadArray([], DEFAULT_PREFERRED_EXISTING_SECTION_TITLES, true), value: preferExistingTitles, onChange: function (_, value) {
                                    return setPreferExistingTitles(value
                                        .map(function (item) { return String(item).trim(); })
                                        .filter(Boolean)
                                        .filter(function (title, index, all) {
                                        return all.findIndex(function (t) { return t.toLowerCase() === title.toLowerCase(); }) === index;
                                    }));
                                }, renderTags: function (value, getTagProps) {
                                    return value.map(function (option, index) { return (createElement(Chip, __assign({ variant: "outlined", label: option, size: "small" }, getTagProps({ index: index }), { key: option }))); });
                                }, renderInput: function (params) { return (jsx(TextField$1, __assign({}, params, { label: "Prefer existing section if present", placeholder: "Add section title", helperText: 'If a listed section already exists (e.g. Smart Copy \u201CAlternative Locale Properties\u201D), Fix reuses it and keeps other fields in that section.' }))); } })] }), jsxs(Alert, { severity: "info", sx: { mb: 2 }, children: ["Each content type must have exactly one locale/translation section (last on the form, collapsed by default) containing", ' ', TRANSLATION_FORM_REQUIREMENTS.filter(function (req) { return req.id !== 'translation-section'; })
                                .map(function (req) { return req.label; })
                                .join('; '), ". Scan/Fix use section ", jsx("strong", { children: formSectionOptions.sectionTitle }), preferExistingTitles.length > 0
                                ? ", preferring existing: ".concat(preferExistingTitles.map(function (t) { return "\u201C".concat(t, "\u201D"); }).join(', '))
                                : '', ". Extra non-translation fields in a preferred section are preserved."] }), !typesLoading && typeRows.length === 0 && !typesError && (jsx(Alert, { severity: "info", children: "Scan content types to see which definitions need Translation fields." })), typeRows.length > 0 && (jsx(Box$1, { sx: { overflow: 'auto' }, children: jsxs(Table, { size: "small", stickyHeader: true, children: [jsx(TableHead, { children: jsxs(TableRow, { children: [jsx(TableCell, { padding: "checkbox" }), jsx(TableCell, { children: "Content type" }), jsx(TableCell, { children: "Status" }), jsx(TableCell, { children: "Missing" })] }) }), jsx(TableBody, { children: typeRows.map(function (row) {
                                        var checked = selectedTypeIds.has(row.id);
                                        return (jsxs(TableRow, { hover: true, selected: checked, children: [jsx(TableCell, { padding: "checkbox", children: jsx(Checkbox$1, { checked: checked, onChange: function (event) {
                                                            setSelectedTypeIds(function (prev) {
                                                                var next = new Set(prev);
                                                                if (event.target.checked) {
                                                                    next.add(row.id);
                                                                }
                                                                else {
                                                                    next.delete(row.id);
                                                                }
                                                                return next;
                                                            });
                                                        } }) }), jsxs(TableCell, { children: [jsx(Typography, { variant: "body2", sx: { fontFamily: 'monospace' }, children: row.id }), jsx(Typography, { variant: "caption", color: "text.secondary", children: row.name })] }), jsx(TableCell, { children: jsx(Chip, { size: "small", label: row.status.complete ? 'Ready' : 'Incomplete', color: statusColor(row.status.complete, row.status.missing.length) }) }), jsx(TableCell, { children: row.status.complete ? (jsx(Typography, { variant: "caption", color: "text.secondary", children: "\u2014" })) : (row.status.missing.join(', ')) })] }, row.id));
                                    }) })] }) }))] }))] }));
}

/**
 * Tools panel: full-width locale picker + copy actions (no dialog).
 */
function OpenTranslationPanelButton(props) {
    var _a = props.title, title = _a === void 0 ? 'Add translation' : _a;
    return (jsxs(Box, { sx: { width: '100%', px: 1.5, py: 1.5, boxSizing: 'border-box' }, children: [jsx(Typography$1, { variant: "subtitle2", sx: { fontWeight: 600, mb: 1 }, children: title }), jsx(TranslateToLocalePicker, { variant: "panel" })] }));
}

/** Match `translation-versions` form control row pills (Source / Outdated / Current). */
var pillBase = {
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    px: 1,
    py: '2px',
    borderRadius: '999px',
    lineHeight: 1.3
};
var translationIndicatorSx = {
    source: __assign(__assign({}, pillBase), { backgroundColor: function (theme) {
            return theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.22)' : '#e8f1ff';
        }, color: function (theme) { return (theme.palette.mode === 'dark' ? '#93c5fd' : '#0d4ea6'); }, border: function (theme) {
            return theme.palette.mode === 'dark' ? '1px solid rgba(147,197,253,0.45)' : '1px solid #b6d4fe';
        } }),
    outdated: __assign(__assign({}, pillBase), { backgroundColor: function (theme) {
            return theme.palette.mode === 'dark' ? 'rgba(245,158,11,0.2)' : '#fff7e6';
        }, color: function (theme) { return (theme.palette.mode === 'dark' ? '#fcd34d' : '#ad6800'); }, border: function (theme) {
            return theme.palette.mode === 'dark' ? '1px solid rgba(252,211,77,0.4)' : '1px solid #ffd591';
        } }),
    current: __assign(__assign({}, pillBase), { backgroundColor: function (theme) {
            return theme.palette.mode === 'dark' ? 'rgba(34,197,94,0.2)' : '#f6ffed';
        }, color: function (theme) { return (theme.palette.mode === 'dark' ? '#86efac' : '#237804'); }, border: function (theme) {
            return theme.palette.mode === 'dark' ? '1px solid rgba(134,239,172,0.4)' : '1px solid #b7eb8f';
        } })
};

function TranslationSourceBadge() {
    return jsx(Box, { component: "span", sx: translationIndicatorSx.source, title: "Source translation (authoritative)", children: "Source" });
}
function TranslationOutdatedBadge() {
    return (jsx(Box, { component: "span", sx: translationIndicatorSx.outdated, title: "Outdated translation", children: "\uD83D\uDEA9 Outdated" }));
}
function TranslationCurrentBadge() {
    return (jsx(Box, { component: "span", sx: translationIndicatorSx.current, title: "This is the item you have open", children: "Current" }));
}

function normalizeRepoPath(p) {
    return String(p !== null && p !== void 0 ? p : '')
        .replace(/\\/g, '/')
        .replace(/\/+$/, '');
}
/** Same rule as translation-versions form control: pages under website only. */
function isPageRepoPath(p) {
    var n = normalizeRepoPath(p).toLowerCase();
    return n.includes('/website/') && n.endsWith('.xml');
}
/** Studio ItemMegaMenu ignores includeOnly; keep only these action labels visible. */
var TRANSLATION_ITEM_MENU_LABELS = {
    edit: true,
    view: true,
    'view form': true,
    history: true,
    dependencies: true,
    publish: true,
    'request publish': true,
    approve: true,
    preview: true
};
function normalizeMegaMenuLabel(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}
function isAllowedMegaMenuLabel(text, hideEdit) {
    if (hideEdit === void 0) { hideEdit = false; }
    var txt = normalizeMegaMenuLabel(text);
    if (!txt)
        return false;
    if (hideEdit && (txt === 'edit' || txt.startsWith('edit ')))
        return false;
    if (TRANSLATION_ITEM_MENU_LABELS[txt])
        return true;
    return Object.keys(TRANSLATION_ITEM_MENU_LABELS).some(function (key) { return txt === key || txt.startsWith("".concat(key, " ")); });
}
function enforceAllowedItemsInOpenMegaMenu(hideEdit) {
    if (hideEdit === void 0) { hideEdit = false; }
    if (typeof document === 'undefined')
        return;
    document.querySelectorAll("li[role='menuitem'], .MuiMenuItem-root").forEach(function (node) {
        if (!isAllowedMegaMenuLabel(node.textContent || '', hideEdit)) {
            node.style.display = 'none';
        }
    });
}
function scheduleEnforceAllowedItemsInMegaMenu(hideEdit) {
    if (hideEdit === void 0) { hideEdit = false; }
    enforceAllowedItemsInOpenMegaMenu(hideEdit);
    window.setTimeout(function () { return enforceAllowedItemsInOpenMegaMenu(hideEdit); }, 0);
    window.setTimeout(function () { return enforceAllowedItemsInOpenMegaMenu(hideEdit); }, 60);
    window.setTimeout(function () { return enforceAllowedItemsInOpenMegaMenu(hideEdit); }, 160);
}
function storePathToPreviewPath(storePath) {
    var m = String(storePath || '').match(/^\/site\/[^/]+\/website\/([^/]+)(\/.*)?$/i);
    if (!m) {
        return null;
    }
    var locale = m[1];
    var rest = m[2] || '';
    var clean = rest.replace(/\/index\.xml$/i, '/').replace(/\.xml$/i, '');
    if (!clean.startsWith('/')) {
        clean = "/".concat(clean);
    }
    clean = clean.replace(/\/+/g, '/');
    return "/".concat(locale).concat(clean);
}
/**
 * One level up in the website tree: .../website/{locale}/.../child/index.xml -> .../parent/index.xml.
 * Returns null when already at locale root (.../website/{locale}/index.xml).
 */
function parentWebsiteIndexStorePath(storePath) {
    var n = normalizeRepoPath(storePath);
    if (!n.toLowerCase().endsWith('/index.xml')) {
        return null;
    }
    var folder = n.replace(/\/index\.xml$/i, '');
    var parentFolder = folder.replace(/\/[^/]+$/, '');
    if (!parentFolder || parentFolder === folder) {
        return null;
    }
    var localeRoot = /\/website\/[^/]+$/i.test(parentFolder);
    var hasSegmentUnderLocale = /\/website\/[^/]+\/[^/]+/i.test("".concat(parentFolder, "/"));
    if (!localeRoot && !hasSegmentUnderLocale) {
        return null;
    }
    return "".concat(parentFolder, "/index.xml");
}
/**
 * Preview toolbar: icon opens a menu of locales to add this item under (mirrored path, copy + form).
 */
function OpenTranslationToolbarButton(props) {
    var _this = this;
    var _a = props.tooltip, tooltip = _a === void 0 ? 'Add to Scope' : _a, _b = props.icon, icon = _b === void 0 ? { id: '@mui/icons-material/TranslateOutlined' } : _b, _c = props.buttonSize, buttonSize = _c === void 0 ? 'small' : _c;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var authoringBase = useEnv().authoringBase;
    var currentPreviewItem = useCurrentPreviewItem();
    var sourceItem = useMemo(function () { return (currentPreviewItem ? StudioAPI.getPreviewItem(currentPreviewItem) : null); }, [currentPreviewItem]);
    var _d = useState(null), anchorEl = _d[0], setAnchorEl = _d[1];
    var _e = useState([]), rows = _e[0], setRows = _e[1];
    /** Preview path `rows` belong to; rows for any other path are stale. */
    var _f = useState(null), rowsPath = _f[0], setRowsPath = _f[1];
    var rowsPathRef = useRef(null);
    rowsPathRef.current = rowsPath;
    var _g = useState(false), loading = _g[0], setLoading = _g[1];
    var _h = useState(false), copyBusy = _h[0], setCopyBusy = _h[1];
    /** Existing base-language variant of the previewed item; translations are copied from it when present. */
    var baseCopySourceRef = useRef(null);
    var _j = useState(null), removeDialog = _j[0], setRemoveDialog = _j[1];
    var loadSeqRef = useRef(0);
    /** One server call: every locale variant of the previewed item (empty when it is not under a locale). */
    var loadTargets = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var seq, base, path, res, cfg_1, locales, baseRow;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    seq = ++loadSeqRef.current;
                    base = authoringBase || '';
                    path = (sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) || null;
                    if (!siteId || !base || !path) {
                        setRows([]);
                        setRowsPath(null);
                        setLoading(false);
                        baseCopySourceRef.current = null;
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, StudioAPI.getTranslationLocales(base, siteId, path)];
                case 2:
                    res = _b.sent();
                    if (seq !== loadSeqRef.current) {
                        return [2 /*return*/];
                    }
                    if (!res) {
                        // Failed request: keep what we already know about this page rather than hiding the button.
                        if (rowsPathRef.current !== path) {
                            setRows([]);
                            setRowsPath(path);
                            baseCopySourceRef.current = null;
                        }
                        return [2 /*return*/];
                    }
                    cfg_1 = res.config;
                    locales = res.relativeUnderLocale && hasConfiguredTranslationLocales(cfg_1) ? res.locales : [];
                    if (locales.length < 2) {
                        setRows([]);
                        setRowsPath(path);
                        baseCopySourceRef.current = null;
                        return [2 /*return*/];
                    }
                    baseRow = (cfg_1 === null || cfg_1 === void 0 ? void 0 : cfg_1.baseLanguage)
                        ? locales.find(function (l) { return l.exists && localeSegmentsCompatible(l.locale, cfg_1.baseLanguage); })
                        : undefined;
                    baseCopySourceRef.current = (_a = baseRow === null || baseRow === void 0 ? void 0 : baseRow.path) !== null && _a !== void 0 ? _a : null;
                    setRows(locales.map(function (l) { return ({
                        locale: l.locale,
                        label: l.label,
                        flag: l.flag,
                        targetFilePath: l.path,
                        destinationParentPath: l.parentPath,
                        exists: l.exists,
                        isOutdated: l.isOutdated,
                        isSource: l.isSource,
                        isCurrentPreview: l.isCurrent
                    }); }));
                    setRowsPath(path);
                    return [3 /*break*/, 4];
                case 3:
                    if (seq === loadSeqRef.current) {
                        setLoading(false);
                    }
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [siteId, authoringBase, sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path]);
    var openRemoveDialog = function (row) { return __awaiter(_this, void 0, void 0, function () {
        var res, selected_1;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!siteId || !authoringBase) {
                        return [2 /*return*/];
                    }
                    setAnchorEl(null);
                    setRemoveDialog({
                        pagePath: row.targetFilePath,
                        label: row.label,
                        loading: true,
                        candidates: [],
                        selected: {}
                    });
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, StudioAPI.fetchTranslationRemoveCandidates(authoringBase, siteId, row.targetFilePath)];
                case 2:
                    res = _e.sent();
                    selected_1 = {};
                    ((_b = res.candidates) !== null && _b !== void 0 ? _b : []).forEach(function (c) {
                        if (c.path) {
                            selected_1[c.path] = true;
                        }
                    });
                    setRemoveDialog({
                        pagePath: row.targetFilePath,
                        label: row.label,
                        loading: false,
                        candidates: (_c = res.candidates) !== null && _c !== void 0 ? _c : [],
                        selected: selected_1,
                        error: res.ok ? undefined : (_d = res.message) !== null && _d !== void 0 ? _d : 'Could not load removable components.'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    _e.sent();
                    setRemoveDialog({
                        pagePath: row.targetFilePath,
                        label: row.label,
                        loading: false,
                        candidates: [],
                        selected: {},
                        error: 'Network error loading removable components.'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var closeRemoveDialog = function () {
        setRemoveDialog(null);
    };
    var confirmRemoveTranslation = function () { return __awaiter(_this, void 0, void 0, function () {
        var pagePath, label, paths, currentPreviewNorm, res, failed, deletedList, pageRemoved, removedWhatWeWerePreviewing, parentCandidate, previewUrl;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!removeDialog || removeDialog.loading || removeDialog.submitting || !siteId || !authoringBase) {
                        return [2 /*return*/];
                    }
                    pagePath = removeDialog.pagePath;
                    label = removeDialog.label;
                    paths = Object.keys(removeDialog.selected).filter(function (p) { return removeDialog.selected[p]; });
                    currentPreviewNorm = normalizeRepoPath((_b = sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) !== null && _b !== void 0 ? _b : '');
                    setRemoveDialog(function (prev) { return (prev ? __assign(__assign({}, prev), { submitting: true, error: undefined }) : prev); });
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, StudioAPI.postTranslationRemove(authoringBase, siteId, pagePath, paths, true)];
                case 2:
                    res = _e.sent();
                    failed = (_c = res.failed) !== null && _c !== void 0 ? _c : [];
                    deletedList = (_d = res.deleted) !== null && _d !== void 0 ? _d : [];
                    pageRemoved = deletedList.some(function (p) { return normalizeRepoPath(p) === normalizeRepoPath(pagePath); });
                    removedWhatWeWerePreviewing = pageRemoved && currentPreviewNorm && currentPreviewNorm === normalizeRepoPath(pagePath);
                    if (failed.length) {
                        dispatch(showSystemNotification({
                            message: "Remove finished with issues: ".concat(failed.map(function (f) { var _a, _b; return "".concat((_a = f.path) !== null && _a !== void 0 ? _a : '', " ").concat((_b = f.message) !== null && _b !== void 0 ? _b : '').trim(); }).join('; '))
                        }));
                    }
                    else {
                        dispatch(showSystemNotification({
                            message: "Removed translation: ".concat(label)
                        }));
                    }
                    closeRemoveDialog();
                    if (!removedWhatWeWerePreviewing) return [3 /*break*/, 9];
                    parentCandidate = parentWebsiteIndexStorePath(pagePath);
                    _e.label = 3;
                case 3:
                    if (!parentCandidate) return [3 /*break*/, 7];
                    return [4 /*yield*/, StudioAPI.contentExists(authoringBase, siteId, parentCandidate)];
                case 4:
                    if (!_e.sent()) return [3 /*break*/, 6];
                    previewUrl = storePathToPreviewPath(parentCandidate);
                    if (previewUrl) {
                        dispatch(changeCurrentUrl(previewUrl));
                    }
                    else {
                        dispatch(goToLastPage());
                    }
                    return [4 /*yield*/, loadTargets()];
                case 5:
                    _e.sent();
                    return [2 /*return*/];
                case 6:
                    parentCandidate = parentWebsiteIndexStorePath(parentCandidate);
                    return [3 /*break*/, 3];
                case 7:
                    dispatch(goToLastPage());
                    return [4 /*yield*/, loadTargets()];
                case 8:
                    _e.sent();
                    return [2 /*return*/];
                case 9: return [4 /*yield*/, loadTargets()];
                case 10:
                    _e.sent();
                    return [3 /*break*/, 12];
                case 11:
                    _e.sent();
                    dispatch(showSystemNotification({
                        message: 'Remove translation failed (network).'
                    }));
                    setRemoveDialog(function (prev) { return (prev ? __assign(__assign({}, prev), { submitting: false }) : prev); });
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        void loadTargets();
    }, [loadTargets]);
    var openMenu = function (event) {
        setAnchorEl(event.currentTarget);
        void loadTargets();
    };
    var closeMenu = function () {
        setAnchorEl(null);
    };
    var handleTranslateTo = function (target) { return __awaiter(_this, void 0, void 0, function () {
        var copySource, res, pastedPath;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) || !siteId || !authoringBase || copyBusy) {
                        return [2 /*return*/];
                    }
                    setCopyBusy(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    copySource = baseCopySourceRef.current || sourceItem.path;
                    return [4 /*yield*/, StudioAPI.copyItem(authoringBase, siteId, copySource, target.destinationParentPath, target.targetFilePath)];
                case 2:
                    res = _c.sent();
                    pastedPath = ((res === null || res === void 0 ? void 0 : res.pastedPath) || ((_b = res === null || res === void 0 ? void 0 : res.items) === null || _b === void 0 ? void 0 : _b[0]));
                    if (!(res === null || res === void 0 ? void 0 : res.ok) || !pastedPath) {
                        dispatch(showSystemNotification({
                            message: (res === null || res === void 0 ? void 0 : res.message) || "Could not translate to ".concat(target.label, ".")
                        }));
                        return [2 /*return*/];
                    }
                    dispatch(showSystemNotification({
                        message: "Copied to ".concat(target.label, ": ").concat(pastedPath)
                    }));
                    openEditFormStudioDispatch(dispatch, siteId, pastedPath, authoringBase);
                    return [4 /*yield*/, loadTargets()];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 4:
                    _c.sent();
                    dispatch(showSystemNotification({
                        message: "Could not translate to ".concat(target.label, ".")
                    }));
                    return [3 /*break*/, 6];
                case 5:
                    setCopyBusy(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var disabledCore = !siteId || !authoringBase || !(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path);
    var menuOpen = Boolean(anchorEl);
    var openPreview = function (targetPath) {
        var previewPath = storePathToPreviewPath(targetPath);
        closeMenu();
        if (previewPath) {
            var sep = previewPath.includes('?') ? '&' : '?';
            window.location.assign("".concat(previewPath).concat(sep, "crafterSite=").concat(encodeURIComponent(siteId)));
            return;
        }
        openEditFormStudioDispatch(dispatch, siteId, targetPath, authoringBase);
    };
    var showStudioItemMegaMenu = function (event, path) {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        dispatch({
            type: 'SHOW_ITEM_MEGA_MENU',
            payload: {
                path: path,
                anchorReference: 'anchorPosition',
                anchorPosition: {
                    top: typeof event.clientY === 'number' ? event.clientY : 0,
                    left: typeof event.clientX === 'number' ? event.clientX : 0
                }
            }
        });
        var hideEdit = normalizeRepoPath(path) === normalizeRepoPath((_a = sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) !== null && _a !== void 0 ? _a : '');
        scheduleEnforceAllowedItemsInMegaMenu(hideEdit);
    };
    // Only show the button once this page's locales are known; pages outside a locale folder
    // (e.g. the global home) have nothing to translate to.
    var showButton = Boolean(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) && rowsPath === (sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.path) && rows.length > 0;
    useEffect(function () {
        if (!showButton) {
            setAnchorEl(null);
        }
    }, [showButton]);
    return (jsxs(Fragment, { children: [showButton ? (jsxs(Fragment, { children: [jsx(Tooltip$1, { title: tooltip, children: jsx("span", { children: jsx(IconButton, { size: buttonSize, onClick: openMenu, disabled: disabledCore || copyBusy, "aria-label": tooltip, "aria-haspopup": "true", "aria-expanded": menuOpen ? 'true' : undefined, children: copyBusy || (loading && menuOpen) ? (jsx(CircularProgress$1, { size: buttonSize === 'small' ? 18 : 22 })) : (jsx(SystemIcon, { icon: icon })) }) }) }), jsx(Menu, { anchorEl: anchorEl, open: menuOpen, onClose: closeMenu, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, PaperProps: { sx: { minWidth: 220 } }, children: rows.map(function (o) {
                            var showRemove = o.exists && !o.isSource && isPageRepoPath(o.targetFilePath);
                            return (jsxs(MenuItem, { dense: true, disabled: copyBusy, onClick: o.exists ? function () { return openPreview(o.targetFilePath); } : undefined, sx: { py: 1 }, children: [jsxs(Box, { component: "span", sx: {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            flexWrap: 'wrap',
                                            typography: 'body2',
                                            flex: 1,
                                            minWidth: 0
                                        }, children: [jsx(Box, { component: "span", sx: { fontSize: '1.25rem', lineHeight: 1 }, "aria-hidden": true, children: o.flag }), jsx(Box, { component: "span", sx: { minWidth: 100 }, children: o.label }), jsxs(Box, { component: "span", sx: { display: 'inline-flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }, children: [o.isSource ? jsx(TranslationSourceBadge, {}) : null, o.isOutdated ? jsx(TranslationOutdatedBadge, {}) : null, o.isCurrentPreview ? jsx(TranslationCurrentBadge, {}) : null] })] }), jsx(Box, { sx: { ml: 'auto', display: 'inline-flex', alignItems: 'center', gap: 0.5 }, children: o.exists ? (jsxs(Fragment, { children: [showRemove ? (jsx(Tooltip$1, { title: o.isCurrentPreview
                                                        ? 'Remove this translation (preview moves to the parent page, or back if there is no parent)'
                                                        : 'Remove this translated page (and optional locale-only components)', children: jsx(IconButton, { size: "small", color: "error", onClick: function (e) {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            void openRemoveDialog(o);
                                                        }, "aria-label": "Remove translation ".concat(o.label), children: jsx(DeleteOutlineIcon, { fontSize: "small" }) }) })) : null, jsx(IconButton, { size: "small", onClick: function (e) {
                                                        e.stopPropagation();
                                                        showStudioItemMegaMenu(e, o.targetFilePath);
                                                    }, "aria-label": "Options for ".concat(o.label), children: "\u22EE" })] })) : (jsx(Box, { component: "button", type: "button", onClick: function (e) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                void handleTranslateTo(o);
                                            }, disabled: copyBusy, sx: {
                                                border: 'none',
                                                borderRadius: 1,
                                                px: 1,
                                                py: 0.25,
                                                fontSize: '0.75rem',
                                                color: 'white',
                                                bgcolor: copyBusy ? 'grey.400' : 'primary.main',
                                                cursor: copyBusy ? 'not-allowed' : 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                minWidth: 96,
                                                justifyContent: 'center'
                                            }, children: copyBusy ? (jsxs(Fragment, { children: [jsx(CircularProgress$1, { size: 12, sx: { color: 'white' } }), "Adding\u2026"] })) : ('Add to Scope') })) })] }, o.locale));
                        }) })] })) : null, jsx(Dialog$1, { open: Boolean(removeDialog), onClose: (removeDialog === null || removeDialog === void 0 ? void 0 : removeDialog.submitting) ? undefined : closeRemoveDialog, maxWidth: "sm", fullWidth: true, children: removeDialog ? (jsxs(Fragment, { children: [jsx(DialogTitle$1, { children: "Remove translation" }), jsxs(DialogContent$1, { dividers: true, children: [removeDialog.loading ? (jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }, children: [jsx(CircularProgress$1, { size: 20 }), jsx(Typography$1, { variant: "body2", color: "text.secondary", children: "Loading removable components\u2026" })] })) : null, removeDialog.error ? (jsx(Typography$1, { variant: "body2", color: "error", sx: { mb: 1 }, children: removeDialog.error })) : null, !removeDialog.loading && !removeDialog.error && removeDialog.candidates.length === 0 ? (jsx(Typography$1, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: "No locale-only components were found that are safe to delete automatically. The translated page will still be removed." })) : null, removeDialog.candidates.length > 0 ? (jsxs(Fragment, { children: [jsx(Typography$1, { variant: "subtitle2", sx: { mb: 1 }, children: "Also delete these components (checked by default)" }), jsxs(Box, { sx: { display: 'flex', gap: 1, mb: 1 }, children: [jsx(Button, { size: "small", onClick: function () {
                                                        return setRemoveDialog(function (prev) {
                                                            if (!prev || prev.loading) {
                                                                return prev;
                                                            }
                                                            var next = {};
                                                            prev.candidates.forEach(function (c) {
                                                                if (c.path) {
                                                                    next[c.path] = true;
                                                                }
                                                            });
                                                            return __assign(__assign({}, prev), { selected: next });
                                                        });
                                                    }, children: "Select all" }), jsx(Button, { size: "small", onClick: function () {
                                                        return setRemoveDialog(function (prev) {
                                                            if (!prev || prev.loading) {
                                                                return prev;
                                                            }
                                                            var next = {};
                                                            prev.candidates.forEach(function (c) {
                                                                if (c.path) {
                                                                    next[c.path] = false;
                                                                }
                                                            });
                                                            return __assign(__assign({}, prev), { selected: next });
                                                        });
                                                    }, children: "Select none" })] }), removeDialog.candidates.map(function (c) { return (jsx(FormControlLabel$1, { control: jsx(Checkbox, { size: "small", checked: Boolean(removeDialog.selected[c.path]), disabled: Boolean(removeDialog.submitting), onChange: function (ev) {
                                                    var checked = ev.target.checked;
                                                    setRemoveDialog(function (prev) {
                                                        var _a;
                                                        if (!prev) {
                                                            return prev;
                                                        }
                                                        return __assign(__assign({}, prev), { selected: __assign(__assign({}, prev.selected), (_a = {}, _a[c.path] = checked, _a)) });
                                                    });
                                                } }), label: jsxs(Box, { children: [jsx(Typography$1, { variant: "body2", children: c.internalName || '(no internal name)' }), jsx(Typography$1, { variant: "caption", color: "text.secondary", sx: { wordBreak: 'break-all' }, children: c.path })] }), sx: { alignItems: 'flex-start', ml: 0, display: 'flex' } }, c.path)); })] })) : null, jsx(Typography$1, { variant: "caption", color: "warning.main", sx: { display: 'block', mt: 2 }, children: "The translated page will be deleted. This cannot be undone." })] }), jsxs(DialogActions$1, { children: [jsx(Button, { onClick: closeRemoveDialog, disabled: Boolean(removeDialog.submitting), children: "Cancel" }), jsx(Button, { color: "error", variant: "contained", disabled: Boolean(removeDialog.loading || removeDialog.submitting), onClick: function () { return void confirmRemoveTranslation(); }, startIcon: removeDialog.submitting ? jsx(CircularProgress$1, { size: 16, color: "inherit" }) : undefined, children: removeDialog.submitting ? 'Removing…' : 'Remove translation' })] })] })) : null })] }));
}

/**
 * Build a stable CSS selector for an element inside parsed preview HTML.
 * Prefer #id when present; otherwise use a short nth-of-type path from the root.
 */
function cssSelectorForElement(el) {
    var _a, _b, _c;
    if (!el || el.nodeType !== 1) {
        return undefined;
    }
    var id = (_a = el.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.trim();
    if (id) {
        return "#".concat(escapeCssIdent(id));
    }
    var parts = [];
    var current = el;
    var stopAt = (_c = (_b = el.ownerDocument) === null || _b === void 0 ? void 0 : _b.documentElement) !== null && _c !== void 0 ? _c : null;
    while (current && current !== stopAt && current.parentElement) {
        var parent_1 = current.parentElement;
        var tag = current.tagName.toLowerCase();
        var sameTagSiblings = Array.from(parent_1.children).filter(function (child) { return child.tagName === current.tagName; });
        if (sameTagSiblings.length === 1) {
            parts.unshift(tag);
        }
        else {
            var index = sameTagSiblings.indexOf(current) + 1;
            parts.unshift("".concat(tag, ":nth-of-type(").concat(index, ")"));
        }
        current = parent_1;
    }
    return parts.length > 0 ? parts.join(' > ') : tagNameSelector(el);
}
function tagNameSelector(el) {
    return el.tagName.toLowerCase();
}
function escapeCssIdent(value) {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
        return CSS.escape(value);
    }
    return value.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}

function getPreviewHtml(pageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var iframe, root, res;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    iframe = document.getElementById('crafterCMSPreviewIframe');
                    try {
                        root = (_b = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _b === void 0 ? void 0 : _b.documentElement;
                        if (root) {
                            return [2 /*return*/, root.outerHTML];
                        }
                    }
                    catch (_d) {
                        // cross-origin iframe
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(pageUrl, {
                            credentials: 'include',
                            mode: 'cors',
                            cache: 'no-store'
                        })];
                case 2:
                    res = _c.sent();
                    if (!res.ok) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, res.text()];
                case 3: return [2 /*return*/, _c.sent()];
                case 4:
                    _c.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Collect unique absolute http(s) URLs from anchor hrefs (fragments stripped for the request).
 */
function extractHttpUrlsFromAnchors(html, baseUrl) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var base;
    try {
        base = new URL(baseUrl);
    }
    catch (_a) {
        return [];
    }
    var seen = new Set();
    doc.querySelectorAll('a[href]').forEach(function (el) {
        var _a;
        var href = (_a = el.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.trim();
        if (!href) {
            return;
        }
        var lower = href.toLowerCase();
        if (lower.startsWith('javascript:') ||
            lower.startsWith('mailto:') ||
            lower.startsWith('tel:') ||
            lower.startsWith('data:')) {
            return;
        }
        if (href === '#' || (href.startsWith('#') && !href.includes('://'))) {
            return;
        }
        try {
            var abs = new URL(href, base);
            var u = abs.href;
            var noHash = u.split('#')[0];
            if (noHash.startsWith('http:') || noHash.startsWith('https:')) {
                seen.add(noHash);
            }
        }
        catch (_b) {
            /* ignore invalid */
        }
    });
    return Array.from(seen);
}
/**
 * Map each same-origin http(s) anchor target to one or more CSS selectors in the parsed HTML.
 */
function extractAnchorUrlRefs(html, baseUrl) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var base;
    try {
        base = new URL(baseUrl);
    }
    catch (_a) {
        return [];
    }
    var refs = [];
    var seen = new Set();
    doc.querySelectorAll('a[href]').forEach(function (node) {
        var _a;
        var el = node;
        var href = (_a = el.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.trim();
        if (!href) {
            return;
        }
        var lower = href.toLowerCase();
        if (lower.startsWith('javascript:') ||
            lower.startsWith('mailto:') ||
            lower.startsWith('tel:') ||
            lower.startsWith('data:')) {
            return;
        }
        if (href === '#' || (href.startsWith('#') && !href.includes('://'))) {
            return;
        }
        try {
            var abs = new URL(href, base);
            var noHash = abs.href.split('#')[0];
            if (!noHash.startsWith('http:') && !noHash.startsWith('https:')) {
                return;
            }
            var selector = cssSelectorForElement(el);
            if (!selector) {
                return;
            }
            var key = "".concat(noHash, "\0").concat(selector);
            if (seen.has(key)) {
                return;
            }
            seen.add(key);
            refs.push({ url: noHash, selector: selector, href: href });
        }
        catch (_b) {
            /* ignore invalid */
        }
    });
    return refs;
}
function selectorsByUrl(refs) {
    var map = new Map();
    refs.forEach(function (ref) {
        var _a;
        var list = (_a = map.get(ref.url)) !== null && _a !== void 0 ? _a : [];
        if (!list.includes(ref.selector)) {
            list.push(ref.selector);
        }
        map.set(ref.url, list);
    });
    return map;
}
function guestPageUrl(guest) {
    if (!(guest === null || guest === void 0 ? void 0 : guest.origin) || guest.url == null) {
        return null;
    }
    return guest.origin + guest.url;
}

function englishHttpDetail(status) {
    var ctx = '(checked in your browser from the plugin bundle)';
    if (status === 401) {
        return "Unauthorized (HTTP 401) ".concat(ctx, " \u2014 the target returned 401. Preview URLs may require an active preview session.");
    }
    if (status === 403) {
        return "Forbidden (HTTP 403) ".concat(ctx, " \u2014 access denied for this URL.");
    }
    if (status === 404) {
        return "Not found (HTTP 404) ".concat(ctx, " \u2014 no resource at this URL.");
    }
    if (status >= 500 && status < 600) {
        return "Server error (HTTP ".concat(status, ") ").concat(ctx, " \u2014 the target server failed while handling the request.");
    }
    if (status >= 400) {
        return "Client or policy error (HTTP ".concat(status, ") ").concat(ctx, " \u2014 the request was not satisfied.");
    }
    return "Unexpected status (HTTP ".concat(status, ") ").concat(ctx, ".");
}
function checkUrlInBrowser(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, ok, e_1, msg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            credentials: 'include',
                            cache: 'no-store',
                            redirect: 'follow',
                            mode: 'same-origin'
                        })];
                case 1:
                    res = _a.sent();
                    ok = res.status >= 200 && res.status < 400;
                    return [2 /*return*/, __assign({ url: url, ok: ok, status: res.status, checkedBy: 'browser' }, (!ok && { detail: englishHttpDetail(res.status), error: "HTTP ".concat(res.status) }))];
                case 2:
                    e_1 = _a.sent();
                    msg = e_1 instanceof Error ? e_1.message : String(e_1);
                    return [2 /*return*/, {
                            url: url,
                            ok: false,
                            checkedBy: 'browser',
                            error: msg,
                            detail: "Could not fetch this URL in the browser (".concat(msg, ").")
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Keep only URLs that share the preview page origin (same site as the guest iframe).
 * External links are not validated — all checks run only from the plugin bundle in-browser.
 */
function filterSameOriginPreviewUrls(urls, previewOrigin) {
    if (!previewOrigin) {
        return [];
    }
    var base;
    try {
        base = new URL(previewOrigin);
    }
    catch (_a) {
        return [];
    }
    var out = [];
    var seen = new Set();
    for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
        var u = urls_1[_i];
        try {
            if (new URL(u).origin === base.origin && !seen.has(u)) {
                seen.add(u);
                out.push(u);
            }
        }
        catch (_b) {
            /* skip invalid */
        }
    }
    return out;
}
/**
 * Validates links using **only** the bundled toolbar code: same-origin-as-preview URLs are checked
 * with `fetch` in the browser. No Studio REST script, no server-side requests to arbitrary URLs.
 * External (different-origin) links are ignored.
 */
function validateAllLinks(urls, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var previewOrigin, toCheck, results;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    previewOrigin = (_a = opts === null || opts === void 0 ? void 0 : opts.previewOrigin) !== null && _a !== void 0 ? _a : null;
                    toCheck = filterSameOriginPreviewUrls(urls, previewOrigin);
                    if (urls.length > 0 && toCheck.length === 0) {
                        return [2 /*return*/, {
                                results: [],
                                message: 'No links on the preview origin to check. This plugin validates only same-origin URLs; external links are skipped.'
                            }];
                    }
                    return [4 /*yield*/, Promise.all(toCheck.map(function (u) { return checkUrlInBrowser(u); }))];
                case 1:
                    results = _b.sent();
                    return [2 /*return*/, { results: results }];
            }
        });
    });
}

/** Guest iframe → Studio messages use `type` or legacy `topic` (see Host.js postMessage normalizer). */
function previewIntercomType(action) {
    var _a;
    if (!action || typeof action !== 'object') {
        return undefined;
    }
    var a = action;
    return (_a = a.type) !== null && _a !== void 0 ? _a : a.topic;
}
var GUEST_WRITE_ACTION_TYPES = new Set([
    'UPDATE_FIELD_VALUE_OPERATION',
    'INSERT_COMPONENT_OPERATION',
    'INSERT_ITEM_OPERATION',
    'DUPLICATE_ITEM_OPERATION',
    'MOVE_ITEM_OPERATION',
    'DELETE_ITEM_OPERATION',
    'SORT_ITEM_OPERATION'
]);
/**
 * Debounced re-run when preview navigates, content reloads, or XB/ICE buses fire.
 * Shared by link-check and accessibility toolbar widgets.
 */
function usePreviewToolbarAutoRecheck(runCheckRef, guest) {
    var store = useStore();
    React.useEffect(function () {
        if (!(guest === null || guest === void 0 ? void 0 : guest.url)) {
            return;
        }
        var t = window.setTimeout(function () {
            void runCheckRef.current();
        }, 700);
        return function () { return window.clearTimeout(t); };
    }, [guest === null || guest === void 0 ? void 0 : guest.url, guest === null || guest === void 0 ? void 0 : guest.path, guest === null || guest === void 0 ? void 0 : guest.models]);
    React.useEffect(function () {
        var guestPath = guest === null || guest === void 0 ? void 0 : guest.path;
        if (!(guest === null || guest === void 0 ? void 0 : guest.url) || !guestPath) {
            return;
        }
        var debounceTimer;
        var schedule = function () {
            window.clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(function () { return void runCheckRef.current(); }, 900);
        };
        var read = function () {
            var _a, _b, _c, _d, _e;
            var s = store.getState();
            var g = (_a = s.preview) === null || _a === void 0 ? void 0 : _a.guest;
            var modelId = g === null || g === void 0 ? void 0 : g.modelId;
            var model = modelId && (g === null || g === void 0 ? void 0 : g.models) && Object.prototype.hasOwnProperty.call(g.models, modelId)
                ? g.models[modelId]
                : undefined;
            return {
                item: (_c = (_b = s.content) === null || _b === void 0 ? void 0 : _b.itemsByPath) === null || _c === void 0 ? void 0 : _c[guestPath],
                fetching: (_e = (_d = s.content) === null || _d === void 0 ? void 0 : _d.itemsBeingFetchedByPath) === null || _e === void 0 ? void 0 : _e[guestPath],
                model: model
            };
        };
        var prev = read();
        var unsubscribe = store.subscribe(function () {
            var _a, _b;
            var s = store.getState();
            if (((_b = (_a = s.preview) === null || _a === void 0 ? void 0 : _a.guest) === null || _b === void 0 ? void 0 : _b.path) !== guestPath) {
                return;
            }
            var next = read();
            if (next.item !== prev.item || next.fetching !== prev.fetching || next.model !== prev.model) {
                prev = next;
                schedule();
            }
        });
        return function () {
            unsubscribe();
            window.clearTimeout(debounceTimer);
        };
    }, [guest === null || guest === void 0 ? void 0 : guest.url, guest === null || guest === void 0 ? void 0 : guest.path, store]);
    React.useEffect(function () {
        var debounceTimer;
        var schedule = function () {
            window.clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(function () { return void runCheckRef.current(); }, 900);
        };
        var previewContentChangedMatchers = [
            reloadRequest,
            updateFieldValueOperationComplete,
            insertOperationComplete,
            insertItemOperationComplete,
            duplicateItemOperationComplete,
            moveItemOperationComplete,
            sortItemOperationComplete,
            deleteItemOperationComplete
        ];
        var onHostIntercom = function (action) {
            if (previewContentChangedMatchers.some(function (m) { return m.match(action); })) {
                schedule();
            }
        };
        var onGuestToHost = function (action) {
            var t = previewIntercomType(action);
            if (t && GUEST_WRITE_ACTION_TYPES.has(t)) {
                schedule();
            }
        };
        var h2g = getHostToGuestBus();
        var h2h = getHostToHostBus();
        var g2h = getGuestToHostBus();
        var s1 = h2g.subscribe(onHostIntercom);
        var s2 = h2h.subscribe(onHostIntercom);
        var s3 = g2h.subscribe(onGuestToHost);
        return function () {
            s1.unsubscribe();
            s2.unsubscribe();
            s3.unsubscribe();
            window.clearTimeout(debounceTimer);
        };
    }, []);
}

var HIGHLIGHT_CLASS = 'crafter-linkcheck-issue-highlight';
var STYLE_ID = 'crafter-linkcheck-issue-highlight-style';
var activeHighlightEl = null;
var activeHighlightTimer;
function getPreviewDocument() {
    var _a;
    var iframe = document.getElementById('crafterCMSPreviewIframe');
    try {
        return (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) !== null && _a !== void 0 ? _a : null;
    }
    catch (_b) {
        return null;
    }
}
function ensureHighlightStyle(doc) {
    var _a;
    if (doc.getElementById(STYLE_ID)) {
        return;
    }
    var style = doc.createElement('style');
    style.id = STYLE_ID;
    style.textContent = "\n.".concat(HIGHLIGHT_CLASS, " {\n  outline: 3px solid #e53935 !important;\n  outline-offset: 2px !important;\n  box-shadow: 0 0 0 4px rgba(229, 57, 53, 0.22) !important;\n  scroll-margin: 64px 16px !important;\n}");
    ((_a = doc.head) !== null && _a !== void 0 ? _a : doc.documentElement).appendChild(style);
}
function clearHighlight() {
    if (activeHighlightEl) {
        activeHighlightEl.classList.remove(HIGHLIGHT_CLASS);
        activeHighlightEl = null;
    }
    if (activeHighlightTimer != null) {
        window.clearTimeout(activeHighlightTimer);
        activeHighlightTimer = undefined;
    }
}
function highlightBriefly(el) {
    clearHighlight();
    var doc = el.ownerDocument;
    ensureHighlightStyle(doc);
    el.classList.add(HIGHLIGHT_CLASS);
    activeHighlightEl = el;
    activeHighlightTimer = window.setTimeout(function () { return clearHighlight(); }, 2200);
}
function jumpToPreviewElement(el) {
    if (!el || el.nodeType !== 1) {
        return false;
    }
    try {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        highlightBriefly(el);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function jumpToPreviewSelector(selector) {
    var trimmed = String(selector || '').trim();
    if (!trimmed) {
        return false;
    }
    var doc = getPreviewDocument();
    if (!doc) {
        return false;
    }
    var el = null;
    try {
        el = doc.querySelector(trimmed);
    }
    catch (_a) {
        return false;
    }
    return jumpToPreviewElement(el);
}
/** Resolve a selector captured from parsed HTML against the live preview document. */
function jumpToPreviewSelectorFromParsedHtml(selector) {
    if (jumpToPreviewSelector(selector)) {
        return true;
    }
    var doc = getPreviewDocument();
    if (!doc || !selector) {
        return false;
    }
    if (selector.startsWith('#')) {
        var id = selector.slice(1).replace(/\\/g, '');
        return jumpToPreviewElement(doc.getElementById(id));
    }
    return false;
}

function JumpToPreviewButton(_a) {
    var selector = _a.selector, disabled = _a.disabled, onJump = _a.onJump;
    var canJump = Boolean(selector === null || selector === void 0 ? void 0 : selector.trim()) && !disabled;
    return (jsx(Tooltip$1, { title: canJump ? 'Scroll preview to this element' : 'No element to jump to in preview', children: jsx("span", { children: jsx(Button, { size: "small", color: "primary", variant: "outlined", disabled: !canJump, onClick: function (event) {
                    event.stopPropagation();
                    if (jumpToPreviewSelectorFromParsedHtml(selector)) {
                        onJump === null || onJump === void 0 ? void 0 : onJump();
                    }
                }, sx: { minWidth: 72, flexShrink: 0, py: 0.25 }, children: "Jump to" }) }) }));
}

var RUNNING_BLUE$1 = '#1976d2';
var OK_GREEN$1 = '#2e7d32';
var FAIL_RED$1 = '#c62828';
function LinkCheckToolbar() {
    var _this = this;
    var _a;
    var guest = usePreviewGuest();
    var siteId = (_a = useActiveSiteId()) !== null && _a !== void 0 ? _a : '';
    var _b = React.useState(false), running = _b[0], setRunning = _b[1];
    var _c = React.useState(0), progress = _c[0], setProgress = _c[1];
    var _d = React.useState([]), broken = _d[0], setBroken = _d[1];
    var _e = React.useState(null), lastOk = _e[0], setLastOk = _e[1];
    var _f = React.useState(null), errorMsg = _f[0], setErrorMsg = _f[1];
    var _g = React.useState(null), anchorMenu = _g[0], setAnchorMenu = _g[1];
    var runSeq = React.useRef(0);
    var chevronRef = React.useRef(null);
    var pageUrl = guestPageUrl(guest);
    var runCheck = React.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var seq, html, urls, anchorRefs, urlSelectors_1, _a, results, bad, e_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!siteId || !pageUrl) {
                        setErrorMsg('No preview page loaded.');
                        setLastOk(null);
                        return [2 /*return*/];
                    }
                    seq = ++runSeq.current;
                    setRunning(true);
                    setProgress(0);
                    setErrorMsg(null);
                    setBroken([]);
                    setLastOk(null);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, getPreviewHtml(pageUrl)];
                case 2:
                    html = _c.sent();
                    if (seq !== runSeq.current) {
                        return [2 /*return*/];
                    }
                    if (!html) {
                        setErrorMsg('Could not read preview markup (try again after preview loads).');
                        setBroken([]);
                        setLastOk(false);
                        return [2 /*return*/];
                    }
                    urls = extractHttpUrlsFromAnchors(html, pageUrl);
                    anchorRefs = extractAnchorUrlRefs(html, pageUrl);
                    urlSelectors_1 = selectorsByUrl(anchorRefs);
                    if (urls.length === 0) {
                        setProgress(100);
                        setLastOk(true);
                        return [2 /*return*/];
                    }
                    setProgress(25);
                    return [4 /*yield*/, validateAllLinks(urls, {
                            previewOrigin: (_b = guest === null || guest === void 0 ? void 0 : guest.origin) !== null && _b !== void 0 ? _b : null
                        })];
                case 3:
                    _a = (_c.sent()).results, results = _a === void 0 ? [] : _a;
                    if (seq !== runSeq.current) {
                        return [2 /*return*/];
                    }
                    setProgress(100);
                    /** All hrefs were external (different origin) — nothing to validate in-browser; counts as OK. */
                    if (urls.length > 0 && results.length === 0) {
                        setBroken([]);
                        setLastOk(true);
                        return [2 /*return*/];
                    }
                    bad = results
                        .filter(function (r) { return r && r.ok !== true; })
                        .map(function (row) {
                        var _a;
                        return (__assign(__assign({}, row), { selectors: (_a = urlSelectors_1.get(row.url)) !== null && _a !== void 0 ? _a : [] }));
                    });
                    setBroken(bad);
                    setLastOk(bad.length === 0);
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _c.sent();
                    if (seq !== runSeq.current) {
                        return [2 /*return*/];
                    }
                    setBroken([]);
                    setErrorMsg(e_1 instanceof Error ? e_1.message : String(e_1));
                    setLastOk(false);
                    return [3 /*break*/, 6];
                case 5:
                    if (seq === runSeq.current) {
                        setRunning(false);
                    }
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [siteId, pageUrl, guest]);
    var runCheckRef = React.useRef(runCheck);
    runCheckRef.current = runCheck;
    usePreviewToolbarAutoRecheck(runCheckRef, guest);
    var openMenu = Boolean(anchorMenu);
    /** Any failed check: broken links and/or errorMsg (not “no preview” pre-check which sets lastOk null). */
    var showChevron = !running && lastOk === false;
    var iconColor = running ? RUNNING_BLUE$1 : lastOk === true ? OK_GREEN$1 : lastOk === false ? FAIL_RED$1 : 'action.active';
    return (jsxs(Stack$1, { direction: "row", alignItems: "center", spacing: 0, sx: { flexShrink: 0, minWidth: 'fit-content', overflow: 'visible' }, children: [jsx(Tooltip$1, { title: errorMsg
                    ? errorMsg
                    : running
                        ? 'Checking links…'
                        : lastOk === true
                            ? 'All links responded successfully'
                            : lastOk === false
                                ? errorMsg
                                    ? errorMsg + ' — use the chevron for details'
                                    : 'Some links failed — use the chevron for details'
                                : 'Check links on the current preview page', children: jsxs(Box, { sx: __assign({ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }, (running && {
                        color: RUNNING_BLUE$1,
                        '& .MuiSvgIcon-root': { color: RUNNING_BLUE$1 }
                    })), children: [running && (jsx(Box, { sx: {
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'none'
                            }, children: jsxs(Box, { component: "svg", viewBox: "0 0 40 40", sx: {
                                    width: 36,
                                    height: 36,
                                    transform: 'rotate(-90deg)',
                                    color: RUNNING_BLUE$1
                                }, children: [jsx("circle", { cx: "20", cy: "20", r: "16", fill: "none", stroke: "currentColor", strokeWidth: "3", opacity: 0.2 }), jsx("circle", { cx: "20", cy: "20", r: "16", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeDasharray: 2 * Math.PI * 16, strokeDashoffset: (2 * Math.PI * 16 * (100 - progress)) / 100, strokeLinecap: "round" })] }) })), jsx(IconButton, { size: "small", onClick: function () { return void runCheck(); }, disabled: !pageUrl, "aria-label": "Check links on preview page", sx: {
                                color: iconColor,
                                '&:hover': { color: running ? RUNNING_BLUE$1 : iconColor }
                            }, children: jsx(LinkRounded, { fontSize: "small" }) })] }) }), showChevron && (jsx(Tooltip$1, { title: broken.length > 0 ? 'Show broken links report' : 'Show error details', children: jsx(IconButton, { ref: chevronRef, size: "small", onClick: function (e) { return setAnchorMenu(e.currentTarget); }, "aria-label": "Open link check report", sx: {
                        ml: 0,
                        flexShrink: 0,
                        color: FAIL_RED$1,
                        minWidth: 32,
                        width: 32,
                        height: 32
                    }, children: jsx(KeyboardArrowDownRounded, { fontSize: "small" }) }) })), jsxs(Popover, { open: openMenu, anchorEl: anchorMenu, onClose: function () { return setAnchorMenu(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, sx: { zIndex: 2000 }, PaperProps: {
                    sx: { maxWidth: 480, maxHeight: 360, mt: 0.5 }
                }, children: [jsx(Box, { sx: { px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }, children: jsx(Typography$1, { variant: "subtitle2", children: broken.length > 0 ? "Broken links (".concat(broken.length, ")") : 'Link check' }) }), jsx(List$1, { dense: true, disablePadding: true, sx: { py: 0 }, children: broken.length > 0 ? (broken.map(function (row) {
                            var _a;
                            return (jsxs(ListItem, { alignItems: "flex-start", sx: { py: 1.5, px: 2, display: 'flex', gap: 1 }, children: [jsx(ListItemText$1, { sx: { flex: 1, minWidth: 0, m: 0 }, primary: jsx(Typography$1, { variant: "body2", sx: { wordBreak: 'break-all' }, children: row.url }), secondary: row.detail ||
                                            (row.status != null
                                                ? "HTTP ".concat(row.status) +
                                                    (row.checkedBy ? " (checked ".concat(row.checkedBy, ")") : '')
                                                : row.error || 'Request failed') }), jsx(Box, { sx: { flexShrink: 0, alignSelf: 'flex-start' }, children: jsx(JumpToPreviewButton, { selector: (_a = row.selectors) === null || _a === void 0 ? void 0 : _a[0], onJump: function () { return setAnchorMenu(null); } }) })] }, row.url));
                        })) : (jsx(ListItem, { sx: { py: 1.5, px: 2 }, children: jsx(ListItemText$1, { primary: jsx(Typography$1, { variant: "body2", color: "text.secondary", children: errorMsg || 'No per-URL results. Try running the check again.' }) }) })) })] })] }));
}

/**
 * Bundled accessibility heuristics (WCAG-aligned hints). Not a full audit — manual testing still required.
 *
 * Implementation is original to this plugin (MIT). Checks are aligned with WCAG 2.1 success criteria as
 * described in public W3C guidance (facts are not copyrightable). We do not ship or embed third-party
 * rule engines (e.g. axe-core); rules are maintained here for a small, dependency-free bundle.
 */
function push(issues, issue) {
    issues.push(issue);
}
function pushForElement(issues, el, issue) {
    push(issues, __assign(__assign({}, issue), { selector: cssSelectorForElement(el) }));
}
function idExists(doc, id) {
    return Boolean(id && doc.getElementById(id));
}
function normalizeText(s) {
    return s.replace(/\s+/g, ' ').trim().toLowerCase();
}
/** Suspicious link text (sole link content) — common anti-pattern per public WCAG technique guidance. */
var SUSPICIOUS_LINK_TEXT = new Set([
    'click here',
    'read more',
    'here',
    'more',
    'learn more',
    'link',
    'details',
    'this',
    'more here',
    'download'
]);
function checkAriaTokenRefs(doc, issues, el, attr, ruleId, wcag) {
    var _a;
    var raw = (_a = el.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.trim();
    if (!raw) {
        return;
    }
    var tokens = raw.split(/\s+/).filter(Boolean);
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (!idExists(doc, token)) {
            pushForElement(issues, el, {
                ruleId: ruleId,
                severity: 'serious',
                wcag: wcag,
                message: "".concat(attr, " references id \"").concat(token, "\" but no element with that id exists in the document."),
                context: el.tagName.toLowerCase()
            });
        }
    }
}
function metaViewportRestrictsZoom(content) {
    var c = content.toLowerCase().replace(/\s+/g, '');
    return (c.includes('user-scalable=no') ||
        c.includes('user-scalable=0') ||
        /maximum-scale=1(\.0)?(?![0-9])/.test(c) ||
        c.includes('maximum-scale=1;'));
}
/**
 * Parse preview HTML and collect issues. Runs entirely in the bundled toolbar (no network).
 */
function runA11yChecks(html) {
    var _a, _b, _c;
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var issues = [];
    var root = doc.documentElement;
    if (root && root.tagName.toLowerCase() === 'html' && !((_a = root.getAttribute('lang')) === null || _a === void 0 ? void 0 : _a.trim())) {
        push(issues, {
            ruleId: 'html-lang',
            severity: 'serious',
            wcag: '3.1.1',
            message: 'The root <html> element should have a lang attribute.',
            context: 'html',
            selector: 'html'
        });
    }
    var titleEl = doc.querySelector('title');
    var titleText = (_c = (_b = titleEl === null || titleEl === void 0 ? void 0 : titleEl.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\s+/g, ' ').trim()) !== null && _c !== void 0 ? _c : '';
    if (!titleText) {
        push(issues, {
            ruleId: 'document-title',
            severity: 'serious',
            wcag: '2.4.2',
            message: 'The page should have a non-empty <title> in <head>.',
            context: 'title',
            selector: 'head'
        });
    }
    var head = doc.querySelector('head');
    var hasCharset = doc.querySelector('meta[charset]') !== null ||
        doc.querySelector('meta[http-equiv="Content-Type" i]') !== null;
    if (head && !hasCharset) {
        push(issues, {
            ruleId: 'html-charset',
            severity: 'moderate',
            wcag: '4.1.1',
            message: 'Declare character encoding (e.g. <meta charset="utf-8">) in <head>.',
            context: 'head',
            selector: 'head'
        });
    }
    doc.querySelectorAll('meta[name="viewport" i]').forEach(function (meta) {
        var _a;
        var content = (_a = meta.getAttribute('content')) !== null && _a !== void 0 ? _a : '';
        if (metaViewportRestrictsZoom(content)) {
            pushForElement(issues, meta, {
                ruleId: 'meta-viewport-zoom',
                severity: 'moderate',
                wcag: '1.4.10',
                message: 'Viewport meta should not disable zoom (avoid user-scalable=no or maximum-scale=1) unless you have a documented exception.',
                context: 'meta[name=viewport]'
            });
        }
    });
    doc.querySelectorAll('meta[http-equiv="refresh" i]').forEach(function (meta) {
        var _a;
        var c = (_a = meta.getAttribute('content')) !== null && _a !== void 0 ? _a : '';
        if (/\d+\s*;\s*url\s*=/i.test(c) || /^\d+\s*$/i.test(c.trim())) {
            pushForElement(issues, meta, {
                ruleId: 'meta-refresh',
                severity: 'moderate',
                wcag: '2.2.1',
                message: 'Avoid auto-refresh redirects; they can disorient users and interfere with reading time.',
                context: 'meta[http-equiv=refresh]'
            });
        }
    });
    doc.querySelectorAll('img').forEach(function (img) {
        if (!img.hasAttribute('alt')) {
            pushForElement(issues, img, {
                ruleId: 'img-missing-alt',
                severity: 'serious',
                wcag: '1.1.1',
                message: 'Images must have an alt attribute (use alt="" if decorative).',
                context: 'img'
            });
        }
    });
    doc.querySelectorAll('input[type="image" i]').forEach(function (inp) {
        if (!inp.hasAttribute('alt')) {
            pushForElement(issues, inp, {
                ruleId: 'input-image-alt',
                severity: 'serious',
                wcag: '1.1.1',
                message: 'input[type=image] must have an alt attribute describing the button.',
                context: 'input[type=image]'
            });
        }
    });
    doc.querySelectorAll('a[href]').forEach(function (a) {
        var _a, _b;
        var text = (a.textContent || '').replace(/\s+/g, ' ').trim();
        var aria = (_a = a.getAttribute('aria-label')) === null || _a === void 0 ? void 0 : _a.trim();
        var title = (_b = a.getAttribute('title')) === null || _b === void 0 ? void 0 : _b.trim();
        if (!text && !aria && !title) {
            pushForElement(issues, a, {
                ruleId: 'link-name',
                severity: 'serious',
                wcag: '2.4.4',
                message: 'Links should have visible text, aria-label, or title.',
                context: 'a'
            });
        }
        else if (text && !aria && !title) {
            var norm = normalizeText(text);
            if (SUSPICIOUS_LINK_TEXT.has(norm)) {
                pushForElement(issues, a, {
                    ruleId: 'link-suspicious-text',
                    severity: 'moderate',
                    wcag: '2.4.4',
                    message: 'Link text is vague; use descriptive text that makes sense out of context.',
                    context: 'a'
                });
            }
        }
    });
    doc.querySelectorAll('button').forEach(function (btn) {
        var _a;
        var text = (btn.textContent || '').replace(/\s+/g, ' ').trim();
        var aria = (_a = btn.getAttribute('aria-label')) === null || _a === void 0 ? void 0 : _a.trim();
        if (!text && !aria) {
            pushForElement(issues, btn, {
                ruleId: 'button-name',
                severity: 'serious',
                wcag: '4.1.2',
                message: 'Buttons should have visible text or aria-label.',
                context: 'button'
            });
        }
    });
    var h1s = doc.querySelectorAll('h1');
    if (h1s.length > 1) {
        pushForElement(issues, h1s[0], {
            ruleId: 'heading-multiple-h1',
            severity: 'moderate',
            wcag: '1.3.1',
            message: 'Multiple <h1> elements found; prefer a single top-level heading per page unless using a documented pattern.',
            context: 'h1'
        });
    }
    var firstHeading = doc.querySelector('h1, h2, h3, h4, h5, h6');
    if (firstHeading && firstHeading.tagName.toLowerCase() !== 'h1') {
        pushForElement(issues, firstHeading, {
            ruleId: 'heading-no-h1',
            severity: 'minor',
            wcag: '1.3.1',
            message: 'First heading is not <h1>; consider starting the main outline with an h1 for consistency.',
            context: firstHeading.tagName.toLowerCase()
        });
    }
    var idCounts = new Map();
    doc.querySelectorAll('[id]').forEach(function (el) {
        var _a;
        var id = el.id;
        if (id) {
            idCounts.set(id, ((_a = idCounts.get(id)) !== null && _a !== void 0 ? _a : 0) + 1);
        }
    });
    idCounts.forEach(function (count, id) {
        if (count > 1) {
            var first = doc.getElementById(id);
            push(issues, {
                ruleId: 'duplicate-id',
                severity: 'serious',
                wcag: '4.1.1',
                message: "Duplicate id \"".concat(id, "\" appears ").concat(count, " times; ids must be unique."),
                context: "#".concat(id),
                selector: first ? cssSelectorForElement(first) : "#".concat(id)
            });
        }
    });
    doc.querySelectorAll('[aria-label]').forEach(function (el) {
        var v = el.getAttribute('aria-label');
        if (v !== null && v.trim() === '') {
            pushForElement(issues, el, {
                ruleId: 'aria-label-empty',
                severity: 'moderate',
                wcag: '4.1.2',
                message: 'aria-label is present but empty; remove it or provide a meaningful name.',
                context: el.tagName.toLowerCase()
            });
        }
    });
    doc.querySelectorAll('[aria-labelledby], [aria-describedby]').forEach(function (el) {
        checkAriaTokenRefs(doc, issues, el, 'aria-labelledby', 'aria-labelledby-missing', '1.3.1');
        checkAriaTokenRefs(doc, issues, el, 'aria-describedby', 'aria-describedby-missing', '1.3.1');
    });
    doc.querySelectorAll('[tabindex]').forEach(function (el) {
        var t = el.getAttribute('tabindex');
        if (t == null) {
            return;
        }
        var n = parseInt(t, 10);
        if (!Number.isNaN(n) && n > 0) {
            pushForElement(issues, el, {
                ruleId: 'tabindex-positive',
                severity: 'moderate',
                wcag: '2.4.3',
                message: 'Positive tabindex values can disrupt focus order; prefer natural DOM order or tabindex="0".',
                context: el.tagName.toLowerCase()
            });
        }
    });
    doc.querySelectorAll('iframe').forEach(function (frame) {
        var _a;
        var t = (_a = frame.getAttribute('title')) === null || _a === void 0 ? void 0 : _a.trim();
        if (!t) {
            pushForElement(issues, frame, {
                ruleId: 'iframe-title',
                severity: 'serious',
                wcag: '4.1.2',
                message: 'Frames should have a title attribute describing their purpose.',
                context: 'iframe'
            });
        }
    });
    doc.querySelectorAll('object, embed').forEach(function (el) {
        var _a, _b;
        var tag = el.tagName.toLowerCase();
        var title = (_a = el.getAttribute('title')) === null || _a === void 0 ? void 0 : _a.trim();
        var aria = (_b = el.getAttribute('aria-label')) === null || _b === void 0 ? void 0 : _b.trim();
        if (!title && !aria) {
            pushForElement(issues, el, {
                ruleId: "".concat(tag, "-name"),
                severity: 'serious',
                wcag: '4.1.2',
                message: "<".concat(tag, "> should have a title or aria-label describing the embedded content."),
                context: tag
            });
        }
    });
    doc.querySelectorAll('svg').forEach(function (svg) {
        var _a, _b, _c, _d;
        var role = (_a = svg.getAttribute('role')) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (role === 'img') {
            var aria = (_b = svg.getAttribute('aria-label')) === null || _b === void 0 ? void 0 : _b.trim();
            var title = (_d = (_c = svg.querySelector('title')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
            if (!aria && !title) {
                pushForElement(issues, svg, {
                    ruleId: 'svg-img-name',
                    severity: 'serious',
                    wcag: '1.1.1',
                    message: 'SVG with role="img" should have aria-label or a <title> child.',
                    context: 'svg'
                });
            }
        }
    });
    doc.querySelectorAll('fieldset').forEach(function (fs) {
        if (!fs.querySelector('legend')) {
            pushForElement(issues, fs, {
                ruleId: 'fieldset-legend',
                severity: 'moderate',
                wcag: '1.3.1',
                message: '<fieldset> should include a <legend> describing the group.',
                context: 'fieldset'
            });
        }
    });
    doc.querySelectorAll('table').forEach(function (table) {
        var _a;
        var role = (_a = table.getAttribute('role')) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (role === 'presentation' || role === 'none') {
            return;
        }
        var hasTh = table.querySelector('th') !== null;
        if (!hasTh) {
            pushForElement(issues, table, {
                ruleId: 'table-headers',
                severity: 'moderate',
                wcag: '1.3.1',
                message: 'Data tables should use <th> for headers (or verify this is a layout table with role presentation).',
                context: 'table'
            });
        }
    });
    doc.querySelectorAll('video').forEach(function (video) {
        if (video.hasAttribute('muted') && video.hasAttribute('autoplay')) {
            return;
        }
        var hasCaptions = video.querySelector('track[kind="captions" i]') !== null ||
            video.querySelector('track[kind="subtitles" i]') !== null;
        if (!hasCaptions) {
            pushForElement(issues, video, {
                ruleId: 'video-captions',
                severity: 'moderate',
                wcag: '1.2.2',
                message: 'Prerecorded video should include captions (e.g. <track kind="captions">) unless exempt.',
                context: 'video'
            });
        }
    });
    doc.querySelectorAll('audio').forEach(function (audio) {
        if (!audio.hasAttribute('controls')) {
            pushForElement(issues, audio, {
                ruleId: 'audio-controls',
                severity: 'minor',
                wcag: '1.1.1',
                message: 'Audio elements should expose controls so users can adjust playback.',
                context: 'audio'
            });
        }
    });
    doc.querySelectorAll('blink, marquee').forEach(function (el) {
        pushForElement(issues, el, {
            ruleId: 'deprecated-element',
            severity: 'moderate',
            wcag: '2.2.2',
            message: "Avoid deprecated <".concat(el.tagName.toLowerCase(), ">; it can distract users or cause seizures."),
            context: el.tagName.toLowerCase()
        });
    });
    doc.querySelectorAll('[accesskey]').forEach(function (el) {
        pushForElement(issues, el, {
            ruleId: 'accesskey',
            severity: 'minor',
            wcag: '2.1.4',
            message: 'accesskey can conflict with assistive tech and browser shortcuts; use sparingly.',
            context: el.tagName.toLowerCase()
        });
    });
    doc.querySelectorAll('a button, a input, a textarea, a select').forEach(function (el) {
        pushForElement(issues, el, {
            ruleId: 'interactive-nested-in-link',
            severity: 'moderate',
            wcag: '4.1.2',
            message: 'Avoid nesting interactive elements inside a link; use a single focusable control.',
            context: el.tagName.toLowerCase()
        });
    });
    doc.querySelectorAll('figure').forEach(function (fig) {
        if ((fig.querySelector('img') || fig.querySelector('picture')) && !fig.querySelector('figcaption')) {
            pushForElement(issues, fig, {
                ruleId: 'figure-figcaption',
                severity: 'moderate',
                wcag: '1.1.1',
                message: 'Figures with images should include a <figcaption> or ensure the image alt is sufficient in context.',
                context: 'figure'
            });
        }
    });
    doc.querySelectorAll('ul, ol').forEach(function (list) {
        var invalidChild = Array.from(list.children).some(function (child) {
            var t = child.tagName.toLowerCase();
            return t !== 'li' && t !== 'script' && t !== 'template';
        });
        if (invalidChild) {
            pushForElement(issues, list, {
                ruleId: 'list-structure',
                severity: 'moderate',
                wcag: '1.3.1',
                message: 'List elements should only contain <li>, <script>, or <template> as direct children.',
                context: list.tagName.toLowerCase()
            });
        }
    });
    doc.querySelectorAll('abbr').forEach(function (abbr) {
        var _a;
        if (!((_a = abbr.getAttribute('title')) === null || _a === void 0 ? void 0 : _a.trim())) {
            pushForElement(issues, abbr, {
                ruleId: 'abbr-title',
                severity: 'minor',
                wcag: '3.1.4',
                message: 'Abbreviations should provide expansion via a title attribute (or surrounding text).',
                context: 'abbr'
            });
        }
    });
    doc.querySelectorAll('area[href]').forEach(function (area) {
        if (!area.hasAttribute('alt')) {
            pushForElement(issues, area, {
                ruleId: 'area-alt',
                severity: 'serious',
                wcag: '1.1.1',
                message: 'Image map <area> elements should have an alt attribute describing the destination.',
                context: 'area'
            });
        }
    });
    doc.querySelectorAll('canvas').forEach(function (canvas) {
        var _a, _b, _c;
        var aria = (_a = canvas.getAttribute('aria-label')) === null || _a === void 0 ? void 0 : _a.trim();
        var labelledby = (_b = canvas.getAttribute('aria-labelledby')) === null || _b === void 0 ? void 0 : _b.trim();
        var fallback = (_c = canvas.textContent) === null || _c === void 0 ? void 0 : _c.replace(/\s+/g, ' ').trim();
        if (!aria && !labelledby && !fallback) {
            pushForElement(issues, canvas, {
                ruleId: 'canvas-fallback',
                severity: 'moderate',
                wcag: '1.1.1',
                message: 'Canvas should have accessible text (aria-label, aria-labelledby, or fallback content).',
                context: 'canvas'
            });
        }
    });
    doc.querySelectorAll('[autofocus]').forEach(function (el) {
        pushForElement(issues, el, {
            ruleId: 'autofocus',
            severity: 'minor',
            wcag: '2.4.3',
            message: 'autofocus moves focus on load and can disorient users; use only when intentional.',
            context: el.tagName.toLowerCase()
        });
    });
    doc.querySelectorAll('input, select, textarea').forEach(function (control) {
        var _a, _b, _c, _d;
        if (control.tagName.toLowerCase() === 'input') {
            var type = (_b = (_a = control.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : 'text';
            if (type === 'hidden' || type === 'button' || type === 'submit' || type === 'reset') {
                return;
            }
        }
        var wrappedInLabel = control.closest('label');
        var id = control.getAttribute('id');
        var labelByFor = id &&
            Array.from(doc.querySelectorAll('label[for]')).find(function (l) { return l.getAttribute('for') === id; });
        var ariaLabel = (_c = control.getAttribute('aria-label')) === null || _c === void 0 ? void 0 : _c.trim();
        var ariaLabelledby = (_d = control.getAttribute('aria-labelledby')) === null || _d === void 0 ? void 0 : _d.trim();
        var hasVisibleLabel = !!(wrappedInLabel || labelByFor);
        var hasAccessibleName = !!(hasVisibleLabel || ariaLabel || ariaLabelledby);
        if (!hasAccessibleName) {
            pushForElement(issues, control, {
                ruleId: 'form-label',
                severity: 'moderate',
                wcag: '1.3.1',
                message: 'Form controls should have an accessible name (label, aria-label, or aria-labelledby). Do not rely on placeholder alone.',
                context: control.tagName.toLowerCase()
            });
        }
    });
    return issues;
}

var RUNNING_BLUE = '#1976d2';
var OK_GREEN = '#2e7d32';
var FAIL_RED = '#c62828';
var SEVERITY_COLOR = {
    critical: 'error',
    serious: 'error',
    moderate: 'warning',
    minor: 'info'
};
function A11yToolbar() {
    var _this = this;
    var _a;
    var guest = usePreviewGuest();
    var siteId = (_a = useActiveSiteId()) !== null && _a !== void 0 ? _a : '';
    var _b = React.useState(false), running = _b[0], setRunning = _b[1];
    var _c = React.useState(0), progress = _c[0], setProgress = _c[1];
    var _d = React.useState([]), issues = _d[0], setIssues = _d[1];
    var _e = React.useState(null), lastOk = _e[0], setLastOk = _e[1];
    var _f = React.useState(null), errorMsg = _f[0], setErrorMsg = _f[1];
    var _g = React.useState(null), anchorMenu = _g[0], setAnchorMenu = _g[1];
    var runSeq = React.useRef(0);
    var chevronRef = React.useRef(null);
    var pageUrl = guestPageUrl(guest);
    var runCheck = React.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var seq, html, found, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!siteId || !pageUrl) {
                        setErrorMsg('No preview page loaded.');
                        setLastOk(null);
                        return [2 /*return*/];
                    }
                    seq = ++runSeq.current;
                    setRunning(true);
                    setProgress(0);
                    setErrorMsg(null);
                    setIssues([]);
                    setLastOk(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, getPreviewHtml(pageUrl)];
                case 2:
                    html = _a.sent();
                    if (seq !== runSeq.current) {
                        return [2 /*return*/];
                    }
                    if (!html) {
                        setErrorMsg('Could not read preview markup (try again after preview loads).');
                        setIssues([]);
                        setLastOk(false);
                        return [2 /*return*/];
                    }
                    setProgress(40);
                    found = runA11yChecks(html);
                    if (seq !== runSeq.current) {
                        return [2 /*return*/];
                    }
                    setProgress(100);
                    setIssues(found);
                    setLastOk(found.length === 0);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    if (seq !== runSeq.current) {
                        return [2 /*return*/];
                    }
                    setIssues([]);
                    setErrorMsg(e_1 instanceof Error ? e_1.message : String(e_1));
                    setLastOk(false);
                    return [3 /*break*/, 5];
                case 4:
                    if (seq === runSeq.current) {
                        setRunning(false);
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [siteId, pageUrl]);
    var runCheckRef = React.useRef(runCheck);
    runCheckRef.current = runCheck;
    usePreviewToolbarAutoRecheck(runCheckRef, guest);
    var openMenu = Boolean(anchorMenu);
    var showChevron = !running && lastOk === false;
    var iconColor = running ? RUNNING_BLUE : lastOk === true ? OK_GREEN : lastOk === false ? FAIL_RED : 'action.active';
    return (jsxs(Stack$1, { direction: "row", alignItems: "center", spacing: 0, sx: { flexShrink: 0, minWidth: 'fit-content', overflow: 'visible' }, children: [jsx(Tooltip$1, { title: errorMsg
                    ? errorMsg
                    : running
                        ? 'Running accessibility checks…'
                        : lastOk === true
                            ? 'No issues found (bundle rules only)'
                            : lastOk === false
                                ? errorMsg
                                    ? errorMsg + ' — use the chevron for details'
                                    : 'Some checks failed — use the chevron for details'
                                : 'Check preview page for accessibility (bundled rules)', children: jsxs(Box, { sx: __assign({ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }, (running && {
                        color: RUNNING_BLUE,
                        '& .MuiSvgIcon-root': { color: RUNNING_BLUE }
                    })), children: [running && (jsx(Box, { sx: {
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'none'
                            }, children: jsxs(Box, { component: "svg", viewBox: "0 0 40 40", sx: {
                                    width: 36,
                                    height: 36,
                                    transform: 'rotate(-90deg)',
                                    color: RUNNING_BLUE
                                }, children: [jsx("circle", { cx: "20", cy: "20", r: "16", fill: "none", stroke: "currentColor", strokeWidth: "3", opacity: 0.2 }), jsx("circle", { cx: "20", cy: "20", r: "16", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeDasharray: 2 * Math.PI * 16, strokeDashoffset: (2 * Math.PI * 16 * (100 - progress)) / 100, strokeLinecap: "round" })] }) })), jsx(IconButton, { size: "small", onClick: function () { return void runCheck(); }, disabled: !pageUrl, "aria-label": "Run accessibility checks on preview page", sx: {
                                color: iconColor,
                                '&:hover': { color: running ? RUNNING_BLUE : iconColor }
                            }, children: jsx(AccessibilityNewRounded, { fontSize: "small" }) })] }) }), showChevron && (jsx(Tooltip$1, { title: issues.length > 0 ? 'Show accessibility report' : 'Show error details', children: jsx(IconButton, { ref: chevronRef, size: "small", onClick: function (e) { return setAnchorMenu(e.currentTarget); }, "aria-label": "Open accessibility report", sx: {
                        ml: 0,
                        flexShrink: 0,
                        color: FAIL_RED,
                        minWidth: 32,
                        width: 32,
                        height: 32
                    }, children: jsx(KeyboardArrowDownRounded, { fontSize: "small" }) }) })), jsxs(Popover, { open: openMenu, anchorEl: anchorMenu, onClose: function () { return setAnchorMenu(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, sx: { zIndex: 2000 }, PaperProps: {
                    sx: { maxWidth: 500, maxHeight: 400, mt: 0.5 }
                }, children: [jsx(Box, { sx: { px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }, children: jsx(Typography$1, { variant: "subtitle2", children: issues.length > 0 ? "Issues (".concat(issues.length, ")") : 'Accessibility check' }) }), jsx(List$1, { dense: true, disablePadding: true, sx: { py: 0 }, children: issues.length > 0 ? (issues.map(function (issue, idx) {
                            var _a, _b;
                            return (jsxs(ListItem, { alignItems: "flex-start", sx: { py: 1.5, px: 2, display: 'flex', gap: 1 }, children: [jsx(ListItemText$1, { sx: { flex: 1, minWidth: 0, m: 0 }, primary: jsxs(Stack$1, { direction: "row", alignItems: "center", spacing: 1, flexWrap: "wrap", sx: { mb: 0.5 }, children: [jsx(Chip$1, { size: "small", label: issue.severity, color: (_a = SEVERITY_COLOR[issue.severity]) !== null && _a !== void 0 ? _a : 'default', variant: "outlined" }), issue.wcag && (jsxs(Typography$1, { component: "span", variant: "caption", color: "text.secondary", children: ["WCAG ", issue.wcag] }))] }), secondary: jsxs(Fragment, { children: [jsx(Typography$1, { variant: "body2", component: "span", display: "block", children: issue.message }), jsxs(Typography$1, { variant: "caption", color: "text.secondary", children: [issue.ruleId, issue.context ? " \u00B7 ".concat(issue.context) : ''] })] }) }), jsx(Box, { sx: { flexShrink: 0, alignSelf: 'flex-start' }, children: jsx(JumpToPreviewButton, { selector: issue.selector, onJump: function () { return setAnchorMenu(null); } }) })] }, "".concat(issue.ruleId, "-").concat((_b = issue.selector) !== null && _b !== void 0 ? _b : 'none', "-").concat(idx)));
                        })) : (jsx(ListItem, { sx: { py: 1.5, px: 2 }, children: jsx(ListItemText$1, { primary: jsx(Typography$1, { variant: "body2", color: "text.secondary", children: errorMsg || 'No rule results. Run the check again.' }) }) })) })] })] }));
}

var buildInfo = {"version":"1.0.112","commit":"d7ebe03-dirty","builtAt":"2026-10-09T19:01:15.082Z"};

function formatBuiltAt(iso) {
    var date = new Date(iso);
    return isNaN(date.getTime()) ? iso : date.toLocaleString();
}
var rows = [
    ['Plugin', 'org.rd.plugin.uigoodies'],
    ['Version', buildInfo.version],
    ['Built', formatBuiltAt(buildInfo.builtAt)],
    ['Commit', buildInfo.commit]
];
function UIGoodiesAdmin() {
    return (jsxs(Box, { sx: { height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', p: 2, gap: 2, overflow: 'auto' }, children: [jsx(Typography$1, { variant: "h5", children: "UI Goodies" }), jsxs(Paper$1, { sx: { p: 2 }, children: [jsx(Typography$1, { variant: "h6", gutterBottom: true, children: "Build" }), jsx(Box, { component: "dl", sx: { display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 3, rowGap: 1, m: 0 }, children: rows.map(function (_a) {
                            var label = _a[0], value = _a[1];
                            return (jsxs(React__default.Fragment, { children: [jsx(Typography$1, { component: "dt", color: "text.secondary", children: label }), jsx(Typography$1, { component: "dd", sx: { m: 0, fontFamily: 'monospace' }, children: value })] }, label));
                        }) })] }), jsxs(Paper$1, { sx: { p: 2 }, children: [jsx(Typography$1, { variant: "h6", gutterBottom: true, children: "Preferences" }), jsx(Typography$1, { color: "text.secondary", children: "No preferences yet." })] })] }));
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
        'org.rd.plugin.uigoodies.CrossSiteContentCopy': CrossSiteContentCopy,
        'org.rd.plugin.uigoodies.AudienceTargetingFlyoutToolbarButton': AudienceTargetingFlyoutToolbarButton,
        'org.rd.plugin.uigoodies.DeviceSimulatorFlyoutToolbarButton': DeviceSimulatorFlyoutToolbarButton,
        'org.rd.plugin.uigoodies.openCannedSearchPanelButton': OpenCannedSearchPanelButton,
        'org.rd.plugin.uigoodies.openCannedSearchToolbarButton': OpenCannedSearchToolbarButton,
        'org.rd.plugin.uigoodies.ImageStudio': ImageStudio,
        'org.rd.plugin.uigoodies.openImageStudioPanelButton': OpenImageStudioPanelButton,
        'org.rd.plugin.uigoodies.TranslationConfigTools': TranslationConfigTools,
        'org.rd.plugin.uigoodies.TranslationDialog': TranslationDialog,
        'org.rd.plugin.uigoodies.openTranslationPanelButton': OpenTranslationPanelButton,
        'org.rd.plugin.uigoodies.openTranslationToolbarButton': OpenTranslationToolbarButton,
        'org.craftercms.studio.linkcheck.toolbar': LinkCheckToolbar,
        'org.craftercms.studio.linkcheck.a11y': A11yToolbar,
        'org.rd.plugin.uigoodies.UIGoodiesAdmin': UIGoodiesAdmin
    }
};

export { A11yToolbar, AudienceTargetingFlyoutToolbarButton, BulkPublishView, ComponentPreviewPathNavigator, ContentUpload, CopyCurrentPageUrl, CrossSiteContentCopy, DeviceSimulatorFlyoutToolbarButton, EditOrViewCurrent, ImageStudio, LinkCheckToolbar, OpenBulkPublishPanelButton, OpenBulkPublishToolbarButton, OpenCannedSearchPanelButton, OpenCannedSearchToolbarButton, OpenContentUploadPanelButton, OpenContentUploadToolbarButton, OpenImageStudioPanelButton, OpenTranslationPanelButton, OpenTranslationToolbarButton, PublishOrRequestPublish, PullPushRemoteButtons, ToolPanelAccordion, TranslationConfigTools, TranslationDialog, UIGoodiesAdmin, plugin as default };
