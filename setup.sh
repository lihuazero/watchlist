#!/bin/bash
set -e

export DEBIAN_FRONTEND=noninteractive

cd "$(dirname "$0")"

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
