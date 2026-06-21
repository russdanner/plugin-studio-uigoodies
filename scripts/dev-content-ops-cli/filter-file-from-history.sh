#!/usr/bin/env bash
#
# Remove a repository-relative path from entire git history for a CrafterCMS site sandbox.
# Uses git-filter-repo when available, otherwise git filter-branch.
#
# Usage:
#   ./filter-file-from-history.sh <siteId> <repo-relative-path> [crafter-data-dir]
#
# Examples:
#   ./filter-file-from-history.sh xb-test-1 static-assets/images/large-video.mp4
#   CRAFTER_DATA=/opt/crafter/crafter-authoring/data ./filter-file-from-history.sh my-site path/to/file.xml
#
set -euo pipefail

SITE_ID="${1:?siteId required}"
FILE_PATH="${2:?repository-relative path required}"
CRAFTER_DATA="${3:-${CRAFTER_DATA:-}}"

if [[ -z "${CRAFTER_DATA}" ]]; then
  for candidate in \
    "${HOME}/crafter-installs/4-x/craftercms/crafter-authoring/data" \
    "/opt/crafter/crafter-authoring/data" \
    "/usr/local/crafter/crafter-authoring/data"; do
    if [[ -d "${candidate}/repos/sites/${SITE_ID}/sandbox/.git" ]]; then
      CRAFTER_DATA="${candidate}"
      break
    fi
  done
fi

REPO="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox"
if [[ ! -d "${REPO}/.git" ]]; then
  echo "Could not find sandbox git repo for site '${SITE_ID}' under ${CRAFTER_DATA:-<unset>}" >&2
  exit 1
fi

FILE_PATH="${FILE_PATH#/}"
if [[ "${FILE_PATH}" == *".."* ]] || [[ "${FILE_PATH}" == .git* ]]; then
  echo "Unsafe repository path: ${FILE_PATH}" >&2
  exit 1
fi

echo "Repository: ${REPO}"
echo "Removing path from history: ${FILE_PATH}"
echo

run_filter_repo() {
  if git -C "${REPO}" filter-repo --help >/dev/null 2>&1; then
    git -C "${REPO}" filter-repo --path "${FILE_PATH}" --invert-paths --force
    return 0
  fi
  if command -v git-filter-repo >/dev/null 2>&1; then
    git-filter-repo --repo "${REPO}" --path "${FILE_PATH}" --invert-paths --force
    return 0
  fi
  return 1
}

cleanup_filter_branch_backups() {
  git -C "${REPO}" for-each-ref --format='delete %(refname)' refs/original 2>/dev/null \
    | git -C "${REPO}" update-ref --stdin 2>/dev/null || true
  git -C "${REPO}" reflog expire --expire=now --all 2>/dev/null || true
  git -C "${REPO}" gc --prune=now 2>/dev/null || true
}

if run_filter_repo; then
  echo "Used git filter-repo"
else
  echo "git-filter-repo not found; using git filter-branch fallback" >&2
  git -C "${REPO}" filter-branch --force \
    --index-filter "git rm --cached --ignore-unmatch '${FILE_PATH}'" \
    --prune-empty --tag-name-filter cat -- --all
  cleanup_filter_branch_backups
fi

HEAD="$(git -C "${REPO}" rev-parse HEAD)"
echo
echo "Done."
echo "New HEAD: ${HEAD}"
echo "In Studio DevContentOps Tools: Set processed commit to ${HEAD} and sync."
