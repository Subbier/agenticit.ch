#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# AgenticIT – Sicheres Aufräum-Skript (Umfang: NUR MÜLL)
# Löscht ausschließlich Temp-/Cache-/Generier-Dateien. App-Code, Dokumente,
# Lead-CSVs und Scratch-Ordner bleiben unangetastet.
# Ausführen:  cd ~/AppEntwicklung/Apps/v1-main && bash aufraeumen.sh
# ─────────────────────────────────────────────────────────────────────────────
set -u
cd "$(dirname "$0")" || exit 1

echo "Aufräumen in: $(pwd)"
echo "-----------------------------------------"

removed=0
rm_if() {
  local p="$1"
  if [ -e "$p" ]; then
    rm -rf -- "$p" && { echo "  ✓ entfernt: $p"; removed=$((removed+1)); } \
      || echo "  ✗ FEHLER bei: $p"
  fi
}

echo "Temp-/Check-Ordner:"
rm_if ".tc"
rm_if ".tcx"
rm_if ".tcz"
rm_if ".tmpcheck"
rm_if ".tmpchk2"

echo "Office-Lockfile:"
rm_if '~$AgenticIT_Wachstumsmotor-Katalog.xlsx'

echo "Generierte Sample-PDFs (regenerierbar via: npm run analyse:sample):"
rm_if "analyse-sample1.pdf"
rm_if "analyse-sample2.pdf"

echo "Build-Cache (wird automatisch neu erzeugt):"
rm_if "tsconfig.check.tsbuildinfo"
rm_if "tsconfig.tsbuildinfo"

echo "Reste aus der Debug-Sitzung:"
rm_if "__deltest__"
rm_if "scripts/_diag.ts"

echo "-----------------------------------------"
echo "Fertig. $removed Einträge entfernt."
echo "Unangetastet geblieben: App-Code, README/robots/llms, Logos,"
echo "alle .docx/.xlsx/.md-Dokumente, Lead-CSVs und Scratch-Ordner."
