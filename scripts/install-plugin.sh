#!/usr/bin/env bash
set -euo pipefail

# Install org.rd.plugin.uigoodies into a CrafterCMS site via marketplace/copy.
# Builds UI bundle, copies plugin files into site sandbox (auto-commit), reloads Groovy scripts.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_PATH="$(cd "${SCRIPT_DIR}/.." && pwd)"
SITE_ID="${1:-}"
STUDIO_URL="${2:-http://localhost:8080}"
CRAFTER_DATA="${CRAFTER_DATA:-/home/russdanner/crafter-installs/4-x/craftercms/crafter-authoring/data}"

# shellcheck source=lib/studio-auth.sh
source "${SCRIPT_DIR}/lib/studio-auth.sh"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  echo "Usage: $0 <siteId> [studioUrl=http://localhost:8080]" >&2
  echo "  Builds uigoodies-components, then POST /studio/api/2/marketplace/copy." >&2
  echo "  Token: CRAFTER_STUDIO_TOKEN env or scripts/.studio-token (gitignored)." >&2
  echo "" >&2
  echo "  SKIP_YARN_DIST=1       Skip UI build (bundle must already exist)." >&2
  echo "  SKIP_SCRIPT_RELOAD=1   Skip Groovy script reload after copy." >&2
  echo "  SKIP_WHITELIST=1       Do not merge sandbox whitelist fragment (default: skip)." >&2
  echo "  SKIP_UI_XML=1          Do not merge DevContentOps / Translation into config/studio/ui.xml." >&2
  echo "" >&2
  echo "IMPORTANT: marketplace/copy reads 'path' from the Studio server's filesystem." >&2
  echo "  Run this script ON the Studio host (or set path to a clone on that host)." >&2
  exit 0
fi

if [[ -z "${SITE_ID}" ]]; then
  echo "Error: siteId is required. Usage: $0 <siteId> [studioUrl]" >&2
  exit 1
fi

PLUGIN_UI_DEPLOY="${PLUGIN_PATH}/authoring/static-assets/plugins/org/rd/plugin/uigoodies/apps/uigoodies"
SITE_PLUGIN="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox/config/studio/static-assets/plugins/org/rd/plugin/uigoodies/apps/uigoodies/index.js"
WHITELIST="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox/config/studio/extension/groovy/whitelist"
WHITELIST_APPEND="${PLUGIN_PATH}/authoring/config/studio/extension/groovy/uigoodies-plugin-whitelist.append"
UI_SITE_TOOLS_FRAGMENT="${PLUGIN_PATH}/authoring/config/studio/ui-dev-content-ops-tools.append.xml"
UI_TRANSLATION_CONFIG_TOOLS_FRAGMENT="${PLUGIN_PATH}/authoring/config/studio/ui-translation-config-tools.append.xml"
UI_TRANSLATION_TOOLBAR_FRAGMENT="${PLUGIN_PATH}/authoring/config/studio/ui-translation-toolbar.append.xml"
UI_LINK_CHECK_TOOLBAR_FRAGMENT="${PLUGIN_PATH}/authoring/config/studio/ui-link-check-toolbar.append.xml"
UI_SITE_TOOLS_REFERENCE_FRAGMENT="${PLUGIN_PATH}/authoring/config/studio/ui-site-tools-reference.append.xml"
DEV_CONTENT_OPS_TOOL_ID="org.rd.plugin.uigoodies.DevContentOpsTools"
TRANSLATION_CONFIG_TOOL_ID="org.rd.plugin.uigoodies.TranslationConfigTools"
TRANSLATION_TOOLBAR_WIDGET_ID="org.rd.plugin.uigoodies.openTranslationToolbarButton"
LINK_CHECK_TOOLBAR_WIDGET_ID="org.craftercms.studio.linkcheck.toolbar"
LINK_CHECK_A11Y_WIDGET_ID="org.craftercms.studio.linkcheck.a11y"
SITE_TOOLS_REFERENCE_ID="craftercms.siteTools"
MARKER="# Studio UI Goodies plugin (org.rd.plugin.uigoodies)"

if ! studio_require_token; then
  exit 2
fi
if ! studio_verify_token "${STUDIO_URL}"; then
  exit 2
fi

run_yarn_dist() {
  local pkg_dir="$1"
  (
    cd "${pkg_dir}"
    yarn install
    yarn dist
  )
}

build_ui() {
  if [[ "${SKIP_YARN_DIST:-}" == "1" ]]; then
    echo "Skipping UI build (SKIP_YARN_DIST=1)."
    if [[ ! -f "${PLUGIN_UI_DEPLOY}/index.js" ]]; then
      echo "Error: ${PLUGIN_UI_DEPLOY}/index.js missing — run without SKIP_YARN_DIST first." >&2
      exit 1
    fi
    return 0
  fi
  local major=0
  major="$(node -p "parseInt(process.versions.node,10)||0" 2>/dev/null || echo 0)"
  if [[ "${major}" -ge 18 ]]; then
    echo "Building UI bundle (Node ${major})..."
    run_yarn_dist "${PLUGIN_PATH}/src/packages/uigoodies-components"
    echo "Building translation form controls..."
    run_yarn_dist "${PLUGIN_PATH}/src/packages/custom-locale"
    run_yarn_dist "${PLUGIN_PATH}/src/packages/translation-versions"
    return 0
  fi
  if command -v docker >/dev/null 2>&1; then
    local img="${PLUGIN_NODE_IMAGE:-node:20-bookworm}"
    echo "Building UI bundle via Docker (${img})..."
    docker run --rm \
      -v "${PLUGIN_PATH}:/work" \
      -w /work/src/packages/uigoodies-components \
      "${img}" \
      bash -lc "corepack enable && yarn install && yarn dist"
    docker run --rm \
      -v "${PLUGIN_PATH}:/work" \
      -w /work/src/packages/custom-locale \
      "${img}" \
      bash -lc "corepack enable && yarn install && yarn dist"
    docker run --rm \
      -v "${PLUGIN_PATH}:/work" \
      -w /work/src/packages/translation-versions \
      "${img}" \
      bash -lc "corepack enable && yarn install && yarn dist"
    return 0
  fi
  echo "Error: Need Node 18+ or Docker to run yarn dist." >&2
  exit 1
}

build_ui

if [[ -f "${PLUGIN_UI_DEPLOY}/index.js" ]]; then
  echo "UI bundle: $(stat -c '%y (%s bytes)' "${PLUGIN_UI_DEPLOY}/index.js" 2>/dev/null || echo 'present')"
fi

PLUGIN_VERSION="$(grep -E '^\s+patch:' "${PLUGIN_PATH}/craftercms-plugin.yaml" | head -1 | awk '{print $2}' | tr -d '\r' || true)"
echo "Installing plugin (patch ${PLUGIN_VERSION:-?}) into site '${SITE_ID}'..."
echo "Plugin path (must exist on Studio server): ${PLUGIN_PATH}"

STUDIO_URL="${STUDIO_URL%/}"
curl --fail-with-body --show-error \
  --location \
  --max-time "${INSTALL_COPY_TIMEOUT_SEC:-600}" \
  --request POST "${STUDIO_URL}/studio/api/2/marketplace/copy" \
  --header "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}" \
  --header "Content-Type: application/json" \
  --data-raw "$(cat <<EOF
{
  "siteId": "${SITE_ID}",
  "path": "${PLUGIN_PATH}",
  "parameters": {}
}
EOF
)"
echo ""
echo "marketplace/copy finished."

sync_git_cli_runner() {
  # UigoodiesGitCliRunner was removed; delete stale copies from older installs.
  local stale_plugin="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox/config/studio/scripts/classes/plugins/org/rd/plugin/uigoodies/UigoodiesGitCliRunner.groovy"
  local stale_studio="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox/config/studio/scripts/classes/org/craftercms/studio/impl/v2/utils/git/UigoodiesGitCliRunner.groovy"
  for stale in "${stale_plugin}" "${stale_studio}"; do
    if [[ ! -f "${stale}" ]]; then
      continue
    fi
    if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      local rel="${stale#${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox/}"
      git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rm -f "${rel}" 2>/dev/null || rm -f "${stale}"
    else
      rm -f "${stale}"
    fi
    echo "Removed stale UigoodiesGitCliRunner: ${stale}"
  done
}

sync_git_cli_runner

sync_stale_blob_store_classes() {
  local sandbox="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox"
  local rel_paths=(
    "config/studio/scripts/classes/plugins/org/rd/plugin/uigoodies/DevContentOpsBlobPublishItem.groovy"
    "config/studio/scripts/classes/plugins/org/rd/plugin/uigoodies/DevContentOpsBlobStoreNoopStage.groovy"
  )
  for rel in "${rel_paths[@]}"; do
    local stale="${sandbox}/${rel}"
    if [[ ! -f "${stale}" ]]; then
      continue
    fi
    if git -C "${sandbox}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git -C "${sandbox}" rm -f "${rel}" 2>/dev/null || rm -f "${stale}"
    else
      rm -f "${stale}"
    fi
    echo "Removed stale blob-store class: ${stale}"
  done
}

sync_stale_blob_store_classes

if [[ "${SKIP_SCRIPT_RELOAD:-}" != "1" ]]; then
  echo "Reloading Groovy plugin scripts for site '${SITE_ID}'..."
  reload_code="$(curl -s -o /dev/null -w '%{http_code}' \
    "${STUDIO_URL}/studio/api/2/plugin/script/reload?siteId=${SITE_ID}&token=${CRAFTER_STUDIO_TOKEN}" \
    -H "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}" || echo "000")"
  if [[ "${reload_code}" == "200" ]]; then
    echo "Script reload OK."
  else
    echo "Warning: script reload returned HTTP ${reload_code}. Restart Studio or retry reload manually." >&2
  fi
fi

if [[ "${SKIP_WHITELIST:-1}" != "1" && -f "${WHITELIST_APPEND}" && -f "${WHITELIST}" ]]; then
  if ! grep -qF "${MARKER}" "${WHITELIST}" 2>/dev/null; then
    echo "Appending uigoodies Groovy sandbox whitelist entries to site sandbox..."
    {
      echo ""
      echo "${MARKER}"
      grep -v '^#' "${WHITELIST_APPEND}" | grep -v '^[[:space:]]*$' || true
    } >> "${WHITELIST}"
    if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/extension/groovy/whitelist" 2>/dev/null || true
    fi
    echo "Commit site sandbox if you intentionally maintain a site-local whitelist."
  else
    added=0
    while IFS= read -r line; do
      [[ -z "${line}" ]] && continue
      if ! grep -qF "${line}" "${WHITELIST}" 2>/dev/null; then
        echo "${line}" >> "${WHITELIST}"
        added=1
      fi
    done < <(grep -v '^#' "${WHITELIST_APPEND}" | grep -v '^[[:space:]]*$' || true)
    if [[ "${added}" -eq 1 ]]; then
      echo "Merged missing uigoodies whitelist entries into site sandbox."
      if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/extension/groovy/whitelist" 2>/dev/null || true
      fi
    fi
  fi
elif [[ "${SKIP_WHITELIST:-1}" != "1" && -f "${WHITELIST_APPEND}" && ! -f "${WHITELIST}" ]]; then
  echo "Note: site whitelist not found at ${WHITELIST} — skip or create whitelist before merge."
fi

SITE_UI_XML="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox/config/studio/ui.xml"
if [[ "${SKIP_UI_XML:-}" != "1" && -f "${SITE_UI_XML}" && -f "${UI_SITE_TOOLS_REFERENCE_FRAGMENT}" ]]; then
  if grep -qF "reference id=\"${SITE_TOOLS_REFERENCE_ID}\"" "${SITE_UI_XML}" 2>/dev/null; then
    echo "Project Tools reference (craftercms.siteTools) already present in ui.xml."
  else
    echo "Merging craftercms.siteTools reference into config/studio/ui.xml..."
    python3 - "${SITE_UI_XML}" "${UI_SITE_TOOLS_REFERENCE_FRAGMENT}" "${SITE_TOOLS_REFERENCE_ID}" <<'PY'
import re
import sys
from pathlib import Path

ui_path = Path(sys.argv[1])
fragment_path = Path(sys.argv[2])
reference_id = sys.argv[3]

def normalize_fragment(raw: str) -> str:
    raw = re.sub(r"^\s*<\?xml[^?]*\?>\s*", "", raw, count=1)
    raw = re.sub(r"<!--.*?-->", "", raw, flags=re.DOTALL)
    return raw.strip() + "\n"

text = ui_path.read_text(encoding="utf-8")
fragment = normalize_fragment(fragment_path.read_text(encoding="utf-8"))
if f'reference id="{reference_id}"' in text:
    sys.exit(0)
refs_open = text.find("<references>")
if refs_open == -1:
    refs_close = text.rfind("</siteUi>")
    if refs_close == -1:
        print("Warning: <references> and </siteUi> not found — add craftercms.siteTools manually.", file=sys.stderr)
        sys.exit(0)
    insert = "    <references>\n" + fragment + "    </references>\n"
    updated = text[:refs_close] + insert + text[refs_close:]
else:
    refs_close = text.find("</references>", refs_open)
    if refs_close == -1:
        print("Warning: </references> not found — add craftercms.siteTools manually.", file=sys.stderr)
        sys.exit(0)
    updated = text[:refs_close] + fragment + text[refs_close:]
ui_path.write_text(updated, encoding="utf-8")
print("craftercms.siteTools reference merged into ui.xml.")
PY
    if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/ui.xml" 2>/dev/null || true
    fi
  fi
fi

if [[ "${SKIP_UI_XML:-}" != "1" && -f "${SITE_UI_XML}" && -f "${UI_SITE_TOOLS_FRAGMENT}" ]]; then
  if grep -qF "${DEV_CONTENT_OPS_TOOL_ID}" "${SITE_UI_XML}" 2>/dev/null; then
    echo "DevContentOps Tools already present in ui.xml."
  else
    echo "Merging DevContentOps Tools into config/studio/ui.xml..."
    python3 - "${SITE_UI_XML}" "${UI_SITE_TOOLS_FRAGMENT}" "${DEV_CONTENT_OPS_TOOL_ID}" <<'PY'
import sys
from pathlib import Path

ui_path = Path(sys.argv[1])
fragment_path = Path(sys.argv[2])
widget_id = sys.argv[3]
text = ui_path.read_text(encoding="utf-8")
fragment = fragment_path.read_text(encoding="utf-8")
if widget_id in text:
    sys.exit(0)
needle = '<reference id="craftercms.siteTools">'
start = text.find(needle)
if start == -1:
    needle = "id='craftercms.siteTools'"
    start = text.find(needle)
if start == -1:
    print("Warning: craftercms.siteTools reference not found in ui.xml — add DevContentOps Tools manually.", file=sys.stderr)
    sys.exit(0)
tools_open = text.find("<tools>", start)
if tools_open == -1:
    print("Warning: siteTools <tools> not found — add DevContentOps Tools manually.", file=sys.stderr)
    sys.exit(0)
tools_close = text.find("</tools>", tools_open)
if tools_close == -1:
    print("Warning: siteTools </tools> not found — add DevContentOps Tools manually.", file=sys.stderr)
    sys.exit(0)
updated = text[:tools_close] + fragment + text[tools_close:]
ui_path.write_text(updated, encoding="utf-8")
print("DevContentOps Tools merged into Project Tools.")
PY
    if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/ui.xml" 2>/dev/null || true
    fi
  fi
elif [[ "${SKIP_UI_XML:-}" != "1" && ! -f "${SITE_UI_XML}" ]]; then
  echo "Note: site ui.xml not found — merge DevContentOps Tools manually (see docs/widgets/dev-content-ops-tools.md)."
fi

if [[ "${SKIP_UI_XML:-}" != "1" && -f "${SITE_UI_XML}" && -f "${UI_TRANSLATION_CONFIG_TOOLS_FRAGMENT}" ]]; then
  if grep -qF "${TRANSLATION_CONFIG_TOOL_ID}" "${SITE_UI_XML}" 2>/dev/null; then
    echo "Translation tool already present in ui.xml — syncing title from plugin fragment..."
    python3 - "${SITE_UI_XML}" "${UI_TRANSLATION_CONFIG_TOOLS_FRAGMENT}" "${TRANSLATION_CONFIG_TOOL_ID}" <<'PY'
import re
import sys
from pathlib import Path

ui_path = Path(sys.argv[1])
fragment_path = Path(sys.argv[2])
widget_id = sys.argv[3]
text = ui_path.read_text(encoding="utf-8")
fragment = fragment_path.read_text(encoding="utf-8")
title_match = re.search(r'<title\s+id="uigoodies\.translationConfigTools\.title"\s+defaultMessage="([^"]*)"', fragment)
desired_title = title_match.group(1) if title_match else "Translation"
updated, n = re.subn(
    r'(<title\s+id="uigoodies\.translationConfigTools\.title"\s+defaultMessage=")[^"]*(")',
    rf'\1{desired_title}\2',
    text,
    count=1,
)
if n:
    ui_path.write_text(updated, encoding="utf-8")
    print(f"Translation tool title updated to \"{desired_title}\".")
else:
    print("Warning: Translation tool title not found in ui.xml — update manually.", file=sys.stderr)
PY
  else
    echo "Merging Translation tool into config/studio/ui.xml..."
    python3 - "${SITE_UI_XML}" "${UI_TRANSLATION_CONFIG_TOOLS_FRAGMENT}" "${TRANSLATION_CONFIG_TOOL_ID}" <<'PY'
import sys
from pathlib import Path

ui_path = Path(sys.argv[1])
fragment_path = Path(sys.argv[2])
widget_id = sys.argv[3]
text = ui_path.read_text(encoding="utf-8")
fragment = fragment_path.read_text(encoding="utf-8")
if widget_id in text:
    sys.exit(0)
needle = '<reference id="craftercms.siteTools">'
start = text.find(needle)
if start == -1:
    needle = "id='craftercms.siteTools'"
    start = text.find(needle)
if start == -1:
    print("Warning: craftercms.siteTools reference not found in ui.xml — add Translation tool manually.", file=sys.stderr)
    sys.exit(0)
tools_open = text.find("<tools>", start)
if tools_open == -1:
    print("Warning: siteTools <tools> not found — add Translation tool manually.", file=sys.stderr)
    sys.exit(0)
tools_close = text.find("</tools>", tools_open)
if tools_close == -1:
    print("Warning: siteTools </tools> not found — add Translation tool manually.", file=sys.stderr)
    sys.exit(0)
updated = text[:tools_close] + fragment + text[tools_close:]
ui_path.write_text(updated, encoding="utf-8")
print("Translation tool merged into Project Tools.")
PY
  fi
  if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/ui.xml" 2>/dev/null || true
  fi
fi

if [[ "${SKIP_UI_XML:-}" != "1" && -f "${SITE_UI_XML}" && -f "${UI_TRANSLATION_TOOLBAR_FRAGMENT}" ]]; then
  if grep -qF "${TRANSLATION_TOOLBAR_WIDGET_ID}" "${SITE_UI_XML}" 2>/dev/null; then
    echo "Translation toolbar widget already present in ui.xml."
  else
    echo "Merging Translation toolbar widget into config/studio/ui.xml..."
    python3 - "${SITE_UI_XML}" "${UI_TRANSLATION_TOOLBAR_FRAGMENT}" "${TRANSLATION_TOOLBAR_WIDGET_ID}" <<'PY'
import re
import sys
from pathlib import Path

ui_path = Path(sys.argv[1])
fragment_path = Path(sys.argv[2])
widget_id = sys.argv[3]

def normalize_fragment(raw: str) -> str:
    raw = re.sub(r"^\s*<\?xml[^?]*\?>\s*", "", raw, count=1)
    raw = re.sub(r"<!--.*?-->", "", raw, flags=re.DOTALL)
    return raw.strip() + "\n"

text = ui_path.read_text(encoding="utf-8")
fragment = normalize_fragment(fragment_path.read_text(encoding="utf-8"))
if widget_id in text:
    sys.exit(0)
needle = '<widget id="craftercms.components.PreviewToolbar">'
start = text.find(needle)
if start == -1:
    print("Warning: PreviewToolbar widget not found in ui.xml — add Translation toolbar manually.", file=sys.stderr)
    sys.exit(0)
right_open = text.find("<rightSection>", start)
if right_open == -1:
    print("Warning: PreviewToolbar rightSection not found — add Translation toolbar manually.", file=sys.stderr)
    sys.exit(0)
widgets_open = text.find("<widgets>", right_open)
if widgets_open == -1:
    print("Warning: PreviewToolbar rightSection <widgets> not found — add Translation toolbar manually.", file=sys.stderr)
    sys.exit(0)
widgets_close = text.find("</widgets>", widgets_open)
if widgets_close == -1:
    print("Warning: PreviewToolbar </widgets> not found — add Translation toolbar manually.", file=sys.stderr)
    sys.exit(0)
updated = text[:widgets_close] + fragment + text[widgets_close:]
ui_path.write_text(updated, encoding="utf-8")
print("Translation toolbar widget merged into Preview toolbar.")
PY
    if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/ui.xml" 2>/dev/null || true
    fi
  fi
elif [[ "${SKIP_UI_XML:-}" != "1" && ! -f "${SITE_UI_XML}" ]]; then
  echo "Note: site ui.xml not found — merge Translation toolbar manually (see docs/widgets/translation-tools.md)."
fi

if [[ "${SKIP_UI_XML:-}" != "1" && -f "${SITE_UI_XML}" && -f "${UI_LINK_CHECK_TOOLBAR_FRAGMENT}" ]]; then
  echo "Patching link-check / WCAG toolbar widgets in config/studio/ui.xml..."
  python3 - "${SITE_UI_XML}" "${UI_LINK_CHECK_TOOLBAR_FRAGMENT}" "${LINK_CHECK_TOOLBAR_WIDGET_ID}" "${LINK_CHECK_A11Y_WIDGET_ID}" <<'PY'
import re
import sys
from pathlib import Path

ui_path = Path(sys.argv[1])
fragment_path = Path(sys.argv[2])
toolbar_id = sys.argv[3]
a11y_id = sys.argv[4]

def normalize_fragment(raw: str) -> str:
    raw = re.sub(r"^\s*<\?xml[^?]*\?>\s*", "", raw, count=1)
    raw = re.sub(r"<!--.*?-->", "", raw, flags=re.DOTALL)
    return raw.strip() + "\n"

text = ui_path.read_text(encoding="utf-8")
fragment = normalize_fragment(fragment_path.read_text(encoding="utf-8"))

uigoodies_plugin = (
    '<plugin id="org.rd.plugin.uigoodies"\n'
    '                                site="{site}"\n'
    '                                type="apps"\n'
    '                                name="uigoodies"\n'
    '                                file="index.js"/>'
)

for widget_id in (toolbar_id, a11y_id):
    pattern = re.compile(
        rf'(<widget id="{re.escape(widget_id)}">\s*)<plugin\b[^>]*/>',
        re.DOTALL,
    )
    text = pattern.sub(rf"\1{uigoodies_plugin}", text)

missing = [wid for wid in (toolbar_id, a11y_id) if wid not in text]
if missing:
    needle = '<widget id="craftercms.components.PreviewToolbar">'
    start = text.find(needle)
    if start != -1:
        right_open = text.find("<rightSection>", start)
        widgets_open = text.find("<widgets>", right_open) if right_open != -1 else -1
        widgets_close = text.find("</widgets>", widgets_open) if widgets_open != -1 else -1
        if widgets_close != -1:
            text = text[:widgets_close] + fragment + text[widgets_close:]

ui_path.write_text(text, encoding="utf-8")
print("Link-check / WCAG toolbar widgets wired to uigoodies bundle.")
PY
  if git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git -C "${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox" add "config/studio/ui.xml" 2>/dev/null || true
  fi
fi

if [[ -f "${SITE_PLUGIN}" ]]; then
  echo "Site UI bundle: $(stat -c '%y (%s bytes)' "${SITE_PLUGIN}")"
else
  echo "Warning: expected site bundle missing at ${SITE_PLUGIN}" >&2
  echo "  Hard-refresh Studio (Ctrl+Shift+R). If still missing, bump plugin version in craftercms-plugin.yaml." >&2
fi

SITE_REPO="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox"
if git -C "${SITE_REPO}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if [[ -n "$(git -C "${SITE_REPO}" status --porcelain 2>/dev/null)" ]]; then
    echo "Note: site sandbox has uncommitted changes — commit in Studio to activate whitelist/UI updates."
  else
    echo "Site sandbox git tree is clean."
  fi
fi

echo
echo "Done. Hard-refresh Studio (Ctrl+Shift+R) for site '${SITE_ID}'."
