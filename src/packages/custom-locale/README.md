# Custom Locale Control Plugin

## Update Plugin

To update, modify `src/main.js` file.

## Build source code

```
cd sources/custom-locale
yarn
yarn build
```

## Install plugin

Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.

## Add required fields to content types

* Add an input with name Locale Code

  * Variable: localeCode_s

  * Display Size: 50

  * Readonly: true

* Add an input with name Source Locale Code

  * Variable: sourceLocaleCode_s

  * Display Size: 50

  * Readonly: true

* Add Custom Locale control

  * Variable: localeSourceId_s

## Content type `controller.groovy` guidance

If your copy/translate operations go through the Translation REST endpoint
`translation-copy.post.groovy`, you can keep content-type controllers minimal because
locale/source metadata and shared-reference rewrites are handled server-side by that endpoint.

Use `src/controller.groovy` only as a fallback for non-Smart-Copy copy/duplicate flows.