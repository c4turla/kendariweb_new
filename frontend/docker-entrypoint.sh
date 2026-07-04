#!/bin/sh
set -e

echo "========================================"
echo "  KendariWeb - Starting Deployment"
echo "========================================"

if [ -z "$DATABASE_URL" ]; then
  echo "[WARN] DATABASE_URL is not set. Skipping migrations."
else
  echo "[INFO] Running database migrations..."
  node run-migrate.mjs
fi

echo "[INFO] Starting Next.js server on port ${PORT:-3000}..."
exec node server.js
