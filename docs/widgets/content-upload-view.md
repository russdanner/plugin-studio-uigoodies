# Content upload view (`org.rd.plugin.uigoodies.ContentUpload`)

**Embedded** upload UI used inside the dialogs opened by [openContentUploadPanelButton](open-content-upload-panel-button.md) and [openContentUploadToolbarButton](open-content-upload-toolbar-button.md).

## Configuration (programmatic / custom dialog)

**Typical wiring:** add [content upload — panel](open-content-upload-panel-button.md) or [toolbar](open-content-upload-toolbar-button.md) to `ui.xml`; those buttons open a dialog that embeds this widget. You normally **do not** list `ContentUpload` directly in `ui.xml`.

**Advanced (custom dialog / code):** dispatch `showWidgetDialog` with a `widget` payload like the plugin’s `useOpenContentUpload` helper:

```ts
showWidgetDialog({
  title: 'Content Upload',
  fullHeight: false,
  fullWidth: false,
  widget: {
    id: 'org.rd.plugin.uigoodies.ContentUpload',
    configuration: {
      defaultPath: '/site/components/headers',
      allowPathSelection: true,
      allowPathInput: false
    }
  }
});
```

| Field | Purpose |
|-------|---------|
| `defaultPath` | Starting folder for uploads. |
| `allowPathSelection` | Whether authors can pick another path in the dialog. |
| `allowPathInput` | Whether manual path entry is allowed. |

Registered so Studio can resolve the widget when the open buttons dispatch the upload dialog.
