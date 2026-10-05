#!/usr/bin/env bash
# Connect Claude Code to the Barchin MCP server.
# Get your API key at https://barchin.net/dashboard/api-keys
set -euo pipefail

BARCHIN_API_KEY="${BARCHIN_API_KEY:-bk_live_XXXX}"

claude mcp add --transport http barchin https://barchin.net/mcp \
  --header "Authorization: Bearer ${BARCHIN_API_KEY}"
