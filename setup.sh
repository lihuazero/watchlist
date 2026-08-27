#!/bin/bash
set -e

export DEBIAN_FRONTEND=noninteractive

cd "$(dirname "$0")"

# This is an npm workspaces monorepo (backend/ + frontend/). Installing from
# the repository root provisions both workspaces via the single root
# package-lock.json — no per-workspace install step is needed.
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
