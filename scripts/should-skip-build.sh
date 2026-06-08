#!/usr/bin/env bash
# Netlify "ignore" command: exit 0 = skip build, exit 1 = run build.
# Content-only edits are handled by /api/revalidate via Tina webhook.

set -euo pipefail

if [ -z "${CACHED_COMMIT_REF:-}" ] || [ -z "${COMMIT_REF:-}" ]; then
  # First deploy or missing refs — always build.
  exit 1
fi

changed=$(git diff --name-only "$CACHED_COMMIT_REF" "$COMMIT_REF" 2>/dev/null || true)

if [ -z "$changed" ]; then
  exit 1
fi

# New or removed pages/posts need getStaticPaths to run — full build required.
added_or_removed=$(git diff --name-only --diff-filter=AD "$CACHED_COMMIT_REF" "$COMMIT_REF" 2>/dev/null || true)
if echo "$added_or_removed" | grep -qE '^content/(page|blog)/'; then
  exit 1
fi

# Any change outside content/ or uploaded media → full build.
if echo "$changed" | grep -qvE '^(content/|public/media/)'; then
  exit 1
fi

# Only content/media edits — skip build; webhook will revalidate pages.
exit 0
