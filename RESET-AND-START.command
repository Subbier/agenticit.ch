#!/usr/bin/env bash
# Stoppt alle alten Dev-Server, löscht den Build-Cache und startet sauber neu.

set -e
cd "$(dirname "$0")"

echo ""
echo "=========================================="
echo "  AgenticIT – Sauberer Reset & Dev-Server"
echo "=========================================="
echo ""

echo ">> Stoppe alle Next.js-Server auf Ports 3000-3010..."
for port in 3000 3001 3002 3003 3004 3005; do
  pid=$(lsof -ti:$port 2>/dev/null || true)
  if [ -n "$pid" ]; then
    echo "   killing pid $pid auf Port $port"
    kill -9 $pid 2>/dev/null || true
  fi
done

echo ">> Kille etwaige hängende next-Prozesse..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
sleep 1

echo ">> Lösche Next.js-Build-Cache (.next)..."
rm -rf .next

if [ ! -d node_modules ] || [ ! -f node_modules/.bin/next ]; then
  echo ">> node_modules fehlt – frischer Install..."
  rm -rf node_modules package-lock.json 2>/dev/null || true
  npm install --legacy-peer-deps --no-audit --no-fund
fi

echo ""
echo ">> Öffne http://localhost:3000 in 8 Sekunden..."
( sleep 8 && open "http://localhost:3000" ) &

echo ">> Starte Next.js-Dev-Server..."
echo "   (zum Beenden: Ctrl+C)"
echo ""

npm run dev
