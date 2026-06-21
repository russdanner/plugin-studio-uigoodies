# Translation / Translation Plugin — Product & Engineering Spec

**Operator setup guide:** [TRANSLATION_SETUP.md](TRANSLATION_SETUP.md) · **Install:** [INSTALLATION.md](INSTALLATION.md)

This document is the **source of truth** for scope and order of work. When plans change, **update this file first**, then implement.

---

## 1. Purpose

**Translation** helps authors **copy content between locale roots** in a multi-locale Crafter site and **preserve translation lineage** (which source item a translated copy came from). It reduces manual path/locale fixes and makes “copy to locale” a guided Studio action.

**Primary users:** Authors and developers working in Crafter Studio on multi-locale sites.

---

## 2. Principles

1. **Do not replace stock Studio** where it already works well — e.g. Site Explorer **Pages / Components** stay **`craftercms.components.PathNavigatorTree`** unless a future spec phase explicitly adds a plugin navigator with clear UX and performance criteria.
2. **Plugin owns** Translation–specific UI: dialog, optional toolbar/panel entry points, form controls, and server-side copy behavior.
3. **Configurable locale model** — folder names and base locale must be definable (today: `src/.../config/multiLocaleConfig.ts`); avoid hard-coding site-specific paths in scattered places.
4. **Observable behavior** — debug logging behind `translationDebug` (localStorage or widget config) for support.
5. **Spec-driven** — no large features without a spec section and acceptance criteria.

---

## 3. Current Baseline (v1 in repo)

| Area | Status |
|------|--------|
| **Studio app** (`translation-components` → `index.js`) | Dialog (`org.rd.plugin.uigoodies.dialog`), Preview toolbar button |
| **Locale tree / copy UX** | `App.tsx`, `LocalePathTreeView`, `DirectoryTreeView`, `TranslationTreeItemLabel`, Studio API wrapper |
| **Form control** | `custom-locale` control; server endpoint `translation-copy.post.groovy` normalizes lineage on Translation (controller optional fallback) |
| **Site Explorer** | **No** plugin path navigator (removed); sites use stock `PathNavigatorTree` |
| **Plugin descriptor** | `craftercms-plugin.yaml` + `registerMissingPluginWidgets` guard in `index.tsx` |

---

## 4. Functional Requirements (target)

### 4.1 Copy to locale (dialog)

- User picks **source** path(s) and **destination** locale/root (within supported layout).
- Copy invokes Studio/content APIs as today; **controller** updates locale metadata and child references where defined.
- Clear **success / error** feedback; avoid silent partial failure.

### 4.2 Lineage on content (form control)

- Content types can expose **locale source id**, **locale code**, **source locale code** (or equivalent) with readonly fields where appropriate.
- **Studio UI** (`custom-locale` + `parseElementByContentType`): if Studio core lacks `custom-locale` in content preview, document **patch or upstream issue** — do not rely on undefined behavior.

### 4.3 Entry points

- Preview toolbar widget remains supported; configuration via `ui.xml` fragments in repo and site sandbox.

### 4.4 Multi-locale layout detection

- Detect **locale folders** under configured roots (e.g. `/site/website/{en,es,...}`) using shared utilities (`useLocaleLayout`, `localePathUtils`).
- Behavior must be **defined** when layout is single-locale or non-standard (no false “translation” UI).

---

## 5. Non-Goals (unless added in a new spec revision)

- Replacing **stock PathNavigatorTree** for default Pages/Components without a written phase and performance budget.
- Search, sitemap, or delivery-tier features (Engine) — out of plugin scope unless explicitly added.
- Automatic machine translation.

---

## 6. Architecture (stable identifiers)

| Item | Value |
|------|--------|
| Plugin id | `org.rd.plugin.uigoodies` |
| App bundle | `static-assets/plugins/org/rd/plugin/uigoodies/apps/translation/index.js` |
| Form control bundle | `.../control/custom-locale/main.js` |
| Widget ids | `org.rd.plugin.uigoodies.dialog`, `openTranslationToolbarButton` |

---

## 7. Phased Delivery

Work **in order** unless a phase is explicitly skipped by team agreement (note the change in this doc).

### Phase A — Stabilize baseline

- [ ] Confirm test site `ui.xml` uses **stock** Pages/Components trees; Translation entry points only via plugin widgets.
- [ ] Document **local sandbox path** (see root `README.md` — local test site).
- [ ] One-command **build + deploy path** documented: `yarn workspace translation-components dist` and where `index.js` lands for the test site.

**Acceptance:** Fresh Studio session opens Translation dialog; no missing-widget errors for registered widgets.

### Phase B — Spec the copy pipeline

- [ ] Sequence diagram or bullet pipeline: select items → Translation REST call → server paste+normalization → resulting items.
- [ ] List **content types** and **fields** the controller expects; fail gracefully when absent.

**Acceptance:** Another developer can trace copy behavior without reading the whole React tree.

### Phase C — UX hardening (dialog)

- [ ] Loading / empty / error states for tree and tables.
- [ ] Caps for large folders documented (`maxChildrenPerFolder` etc.); no browser hang on expand.

**Acceptance:** Manual test on `simple-multi-lang-v2` with debug logging shows bounded fetches.

### Phase D — Form control + Studio core alignment

- [ ] Verify **XB / form editor** behavior for `custom-locale` and `localeSourceId_s`.
- [ ] Track **upstream** `parseElementByContentType` / `custom-locale` if still required.

**Acceptance:** No console spam for missing types; fields editable where intended.

### Phase E — Optional: Site Explorer enhancement (only if approved)

- [ ] Written UX (stock tree + additive controls vs separate panel).
- [ ] Performance and registration strategy (no duplicate-plugin registration surprises).

**Acceptance:** Criteria written **before** code in a new subsection here.

---

## 8. Testing

- **Site:** `simple-multi-lang-v2` sandbox (path documented in repo `README.md` for local 4.4.x authoring).
- **Checks:** dialog open, copy happy path, form control on a typed content item, commit/publish from Studio after `ui.xml` or static-asset changes.

---

## 9. Open Decisions (fill in as we go)

| # | Question | Decision / owner | Date |
|---|----------|------------------|------|
| 1 | Default locale list vs site-driven config (XML/API)? | TBD | |
| 2 | Re-introduce any Site Explorer plugin UI? | Default **no**; Phase E only | |
| 3 | Minimum supported Crafter version line? | TBD | |

---

## 10. How to use this spec

1. Pick the **next unchecked** item in the current phase.
2. Implement in the **smallest** change that satisfies the acceptance line.
3. Check the box or note **deferred** with reason.
4. For scope creep, add a **new bullet or phase** here first.

---

*Last updated: spec creation — align with repo state after removal of `translationPathNavigatorTree`.*
