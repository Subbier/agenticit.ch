// Lokaler Smoke-Test: erzeugt zwei Beispiel-PDFs (mit/ohne SEMrush-Treffer).
// Ausführen aus v1-main:  npx tsx scripts/analyse-sample.ts
import { writeFileSync } from "node:fs"
import { buildAnalysis } from "../lib/analyse/engine"
import { generatePdf } from "../lib/analyse/pdf"
import type { Analysis, AnalysePayload } from "../lib/analyse/types"

const OUT = process.env.OUT_DIR || "." // schreibt standardmässig ins aktuelle Verzeichnis

const payload: AnalysePayload = {
  contact: {
    vorname: "Sandra", nachname: "Muster", firma: "Muster Treuhand AG",
    url: "muster-treuhand.ch", email: "sandra@muster-treuhand.ch", phone: "079 123 45 67",
    plz: "3011", stadt: "Bern",
  },
  answers: {
    branche: "treuhand",
    web_zufriedenheit: "Geht so", sichtbarkeit: "Kaum", marketing: "Sporadisch", web_anfragen: "Unter 5",
    routine_stunden: "15–30",
    automation_done: [],
    automation_todo: [],
    revops_done: [],
    revops_todo: [],
  },
  consent: true,
}

const main = async () => {
  const a = await buildAnalysis(payload)
  writeFileSync(`${OUT}/analyse-sample1.pdf`, await generatePdf(a))
  console.log("sample1 (ohne SEMrush):", JSON.stringify({ vis: a.visibility, freed: a.freed, roi: a.roi.total, semrush: a.semrush.found }))

  const withSem: Analysis = {
    ...a,
    visibility: { google: 64, local: 52, bing: 38, ki: 29 },
    semrush: {
      found: true, rank: 897, organicKeywords: 5216, organicTraffic: 89615, paidKeywords: 230,
      topKeywords: [
        { keyword: "treuhand bern", position: 3, volume: 1300, cpc: 6.1 },
        { keyword: "buchhaltung kmu", position: 5, volume: 880, cpc: 4.2 },
        { keyword: "steuererklärung firma", position: 8, volume: 2400, cpc: 5.5 },
      ],
    },
  }
  writeFileSync(`${OUT}/analyse-sample2.pdf`, await generatePdf(withSem))
  console.log("sample2 (mit SEMrush): geschrieben")
}

main().catch((e) => { console.error(e); process.exit(1) })
