#!/usr/bin/env bash
# Doppelklick auf diese Datei, um den Dev-Server zu starten.
# Beim ersten Mal werden Dependencies installiert (~2 Min).
# Danach öffnet sich automatisch http://localhost:3000 im Browser.

set -e
cd "$(dirname "$0")"

echo ""
echo "=========================================="
echo "  AgenticIT – Dev-Server starten"
echo "=========================================="
echo ""

if [ ! -d node_modules ] || [ ! -f node_modules/.bin/next ]; then
  echo ">> Installiere Dependencies (kann 1-2 Minuten dauern)..."
  npm install --legacy-peer-deps --no-audit --no-fund
  echo ""
fi

echo ">> Öffne http://localhost:3000 in 5 Sekunden..."
( sleep 5 && open "http://localhost:3000" ) &

echo ">> Starte Next.js-Dev-Server..."
echo "   (zum Beenden: Ctrl+C)"
echo ""

npm run dev
