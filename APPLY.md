# ROI-Rechner neu – Einspielen ins Repo (agenticit.ch)

Passgenauer **Drop-in-Ersatz** für den bestehenden ROI-Rechner. Gleicher Komponenten-Name
(`ROICalculatorSection`) und gleiche `id="roi-calculator"` → keine weiteren Änderungen nötig,
alle bestehenden Links (`/#roi-calculator`) funktionieren weiter.

## Was neu ist

- **Weisse Rechner-Karte** auf der dunklen Sektion (starker Kontrast, „weisser Grund").
- **9 Microservices** als eure Produkte, gruppiert unter 3 Säulen (RevOps & Growth, Kundendienst-KI, Prozessautomatisierung) – aufklappbar, kompakt, mobil-first.
- **Szenario-Schalter** (Vorsichtig/Realistisch/Optimistisch) + animiertes Jahrespotenzial & ROI.
- Nutzt eure Bausteine: `@/components/ui/slider`, `@/lib/utils` (cn), `@/lib/format-currency`, `@/lib/typography`, `framer-motion`, `lucide-react` – **keine neuen Dependencies**.

## Dateien (2 Stück)

| Datei | Aktion |
|---|---|
| `lib/microservices.ts` | **NEU** – Produktdaten + ROI-Logik (Single Source of Truth) |
| `components/roi-calculator-section.tsx` | **ERSETZEN** – alte Datei überschreiben |

## Schritte (in Cursor)

```bash
# 1. Im Repo agenticit.ch:
#    - lib/microservices.ts  → neu anlegen (Inhalt aus repo-integration/lib/)
#    - components/roi-calculator-section.tsx → mit der neuen Version überschreiben

# 2. Lokal testen
npm run dev
#    Browser → Startseite, runter zum Abschnitt „Rechnen Sie nach" (#roi-calculator)

# 3. Live schalten (wie gewohnt, Projekt v1-main)
npx vercel --prod
```

## Hinweise

- Der alte Rechner nutzte `lib/lead-pricing.ts` (Branchen-Modell). Der neue nutzt es **nicht** mehr – die Datei kann bleiben (evtl. anderswo referenziert), ist hier aber irrelevant.
- **CTA-Button**: aktuell Platzhalter (`onClick` leer). An euer Lead-Formular / Opt-in anbinden (DSG-konform).
- **Zahlen der Microservices**: indikativ, kalibriert. Vor Live-Schaltung fachlich bestätigen.

## ⚠️ Human-in-the-Loop
KI-gestützte Indikativwerte aus eurem ROI-Konzept. Vor Veröffentlichung inhaltlich und rechtlich (DSG, Quellen) menschlich prüfen und freigeben.

---

### Separat: kompletter Homepage-Umbau (5 Menü-Welten)
Die neue Seitenstruktur (Lösungen/Technologie/Sicherheit/Branchen/Unternehmen) ist ein
**grösserer, eigener Schritt** – sie betrifft `components/site/home-page.tsx` + neue Routen.
Den Rechner-Swap kannst du **sofort und isoliert** live nehmen; den Struktur-Umbau machen wir danach.
