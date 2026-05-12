# Bulk publish view (`org.rd.plugin.uigoodies.bulkPublishView`)

**Embedded** bulk-publish UI used inside dialogs opened by [openBulkPublishPanelButton](open-bulk-publish-panel-button.md) and [openBulkPublishToolbarButton](open-bulk-publish-toolbar-button.md).

## Configuration (programmatic / custom dialog)

**Typical wiring:** add [open bulk publish — panel](open-bulk-publish-panel-button.md) or [toolbar](open-bulk-publish-toolbar-button.md) to `ui.xml`; those buttons open a dialog that embeds this widget. You usually **do not** list `bulkPublishView` directly in `ui.xml`.

**Advanced (custom dialog / code):** dispatch Studio’s `showWidgetDialog` with a `widget` payload matching the shape used in this plugin’s `utils.ts`:

```ts
showWidgetDialog({
  title: 'Bulk Publish',
  fullHeight: false,
  fullWidth: false,
  widget: {
    id: 'org.rd.plugin.uigoodies.bulkPublishView',
    configuration: {
      defaultPath: '/static-assets'
    }
  }
});
```

| Field | Purpose |
|-------|---------|
| `defaultPath` | Initial repository path for the bulk publish tree (optional; default `/static-assets`). |
