#!/usr/bin/env bash
# Fail if the portal repo is private or GitHub Pages is disabled.
# Usage: ./scripts/check_pages_health.sh [owner/repo]
set -euo pipefail

REPO="${1:-${GITHUB_REPOSITORY:-oldrepublicwizard/holowan-underlabs}}"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI required" >&2
  exit 1
fi

meta=$(gh api "repos/${REPO}" --jq '{private:.private, visibility:.visibility}')
private=$(echo "$meta" | python3 -c 'import json,sys; print(json.load(sys.stdin)["private"])')
visibility=$(echo "$meta" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("visibility",""))')

if [[ "$private" == "True" || "$private" == "true" ]]; then
  echo "FAIL: ${REPO} is private — Holowan Pages must stay public" >&2
  exit 1
fi

pages_json=$(gh api "repos/${REPO}/pages" 2>/dev/null || true)
if [[ -z "$pages_json" ]]; then
  echo "FAIL: ${REPO} has no GitHub Pages site configured" >&2
  exit 1
fi

build_type=$(echo "$pages_json" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("build_type",""))')
html_url=$(echo "$pages_json" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("html_url",""))')

if [[ "$build_type" != "workflow" ]]; then
  echo "FAIL: Pages build_type must be workflow (got: ${build_type:-none})" >&2
  exit 1
fi

echo "OK pages health: ${REPO} visibility=${visibility} build_type=${build_type} url=${html_url}"

# Probe critical live assets when URL is known
if [[ -n "$html_url" ]]; then
  base="${html_url%/}"
  fail=0
  for p in /css/terminal.css /js/site.js /play.html /legal.html; do
    code=$(curl -sI -L -A 'HolowanPagesHealth/1' -o /dev/null -w '%{http_code}' --max-time 15 "${base}${p}" || echo ERR)
    echo "$code ${base}${p}"
    [[ "$code" == "200" ]] || fail=1
  done
  exit $fail
fi
