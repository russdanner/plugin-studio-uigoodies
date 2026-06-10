#!/usr/bin/env bash
# shellcheck shell=bash
# Sourced by install-plugin.sh — loads CRAFTER_STUDIO_TOKEN from env or scripts/.studio-token.

studio_scripts_dir() {
  cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd
}

studio_load_token() {
  local scripts_root
  scripts_root="$(studio_scripts_dir)"
  if [[ -z "${CRAFTER_STUDIO_TOKEN:-}" ]] && [[ -f "${scripts_root}/.studio-token" ]]; then
    set -a
    # shellcheck source=/dev/null
    source "${scripts_root}/.studio-token"
    set +a
  fi
}

studio_require_token() {
  studio_load_token
  if [[ -z "${CRAFTER_STUDIO_TOKEN:-}" ]]; then
    echo "Error: Missing CRAFTER_STUDIO_TOKEN. Set env var or create scripts/.studio-token (see .studio-token.example)." >&2
    return 2
  fi
  return 0
}

studio_verify_token() {
  local studio_url="${1:-http://localhost:8080}"
  studio_url="${studio_url%/}"
  local code
  code="$(curl -s -o /dev/null -w '%{http_code}' \
    "${studio_url}/studio/api/2/users/me" \
    -H "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}")" || code="000"
  if [[ "${code}" == "200" ]]; then
    return 0
  fi
  echo "Error: Studio rejected CRAFTER_STUDIO_TOKEN (GET /users/me → ${code})." >&2
  echo "  Tokens expire quickly and invalidate after a Studio restart." >&2
  echo "  Log in at ${studio_url}, copy a fresh Bearer token, update scripts/.studio-token." >&2
  return 2
}
