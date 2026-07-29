// Schlanker SEMrush-API-Client (Standard-API, api.semrush.com).
// Doku: type=domain_rank / domain_organic. Antwort = CSV (;-getrennt) mit Header.
//
// Robustheit: Jeder Call wird bei Netzwerkfehlern einmal wiederholt, und wenn die
// Schweizer Datenbank nichts liefert, prüfen wir zusätzlich DE und US. So entsteht
// nur noch in echten Ausnahmefällen eine "geschätzte" Beurteilung.

import type { SemrushResult } from "./types"

const BASE = "https://api.semrush.com/"
const CALL_TIMEOUT_MS = 15_000
const DATABASES = ["ch", "de", "us"] as const

export function normalizeDomain(input: string): string {
  if (!input) return ""
  let d = input.trim().toLowerCase()
  d = d.replace(/^https?:\/\//, "").replace(/^www\./, "")
  d = d.split("/")[0].split("?")[0].trim()
  return d
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/)
  if (lines.length < 2) return []
  const headers = lines[0].split(";")
  return lines.slice(1).map((line) => {
    const cols = line.split(";")
    const row: Record<string, string> = {}
    headers.forEach((h, i) => (row[h] = cols[i] ?? ""))
    return row
  })
}

async function callOnce(params: Record<string, string>): Promise<string> {
  const url = new URL(BASE)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), CALL_TIMEOUT_MS)
  try {
    const res = await fetch(url.toString(), { signal: controller.signal })
    return await res.text()
  } finally {
    clearTimeout(timeout)
  }
}

// Ein Retry bei Netzwerk-/Timeout-Fehlern, damit ein kurzer Aussetzer der API
// nicht sofort zu "geschätzten" Werten führt.
async function call(params: Record<string, string>): Promise<string> {
  try {
    return await callOnce(params)
  } catch {
    await new Promise((r) => setTimeout(r, 600))
    return callOnce(params)
  }
}

function isEmpty(raw: string): boolean {
  return /ERROR|NOTHING FOUND/i.test(raw) || !raw.includes(";")
}

/**
 * Holt Domain-Overview + Top-Keywords. Prüft CH, dann DE, dann US.
 * Liefert bei fehlendem Key oder komplett fehlenden Daten einen sauberen
 * `found:false`-Zustand (kein Throw).
 */
export async function fetchSemrush(domain: string): Promise<SemrushResult> {
  // Akzeptiert beide Variablennamen: SEMRUSH_API_KEY (Doku-Standard) ODER SEMRUSH
  // (so ist der Key aktuell in Vercel hinterlegt). So greift der Key unabhängig vom Namen.
  const key = process.env.SEMRUSH_API_KEY || process.env.SEMRUSH
  const empty: SemrushResult = { found: false, topKeywords: [] }
  if (!key) return { ...empty, note: "SEMrush-Key fehlt – Sichtbarkeitswerte geschätzt." }
  if (!domain) return { ...empty, note: "Keine Domain angegeben." }

  let lastNote = "Für diese Domain liegen (noch) keine SEMrush-Daten vor."

  for (const database of DATABASES) {
    let overviewRaw: string
    try {
      overviewRaw = await call({
        type: "domain_rank",
        key,
        domain,
        database,
        export_columns: "Dn,Rk,Or,Ot,Oc,Ad",
      })
    } catch {
      lastNote = "SEMrush zeitweise nicht erreichbar – Sichtbarkeitswerte geschätzt."
      continue
    }

    if (isEmpty(overviewRaw)) continue

    const ov = parseCsv(overviewRaw)[0] ?? {}
    const result: SemrushResult = {
      found: true,
      rank: num(ov["Rank"]),
      organicKeywords: num(ov["Organic Keywords"]),
      organicTraffic: num(ov["Organic Traffic"]),
      paidKeywords: num(ov["Adwords Keywords"]),
      topKeywords: [],
    }
    if (database !== "ch") {
      result.note = `Datenbasis: SEMrush ${database.toUpperCase()} (für CH liegen keine Daten vor).`
    }

    // Top-Keywords (best effort, blockiert das Ergebnis nicht)
    try {
      const kwRaw = await call({
        type: "domain_organic",
        key,
        domain,
        database,
        display_limit: "10",
        display_sort: "tr_desc",
        export_columns: "Ph,Po,Nq,Cp",
      })
      if (!isEmpty(kwRaw)) {
        result.topKeywords = parseCsv(kwRaw)
          .map((r) => ({
            keyword: r["Keyword"] ?? "",
            position: num(r["Position"]) ?? 0,
            volume: num(r["Search Volume"]) ?? 0,
            cpc: parseFloat((r["CPC"] ?? "0").replace(",", ".")) || 0,
          }))
          .filter((k) => k.keyword)
          .slice(0, 10)
      }
    } catch {
      /* Keywords optional */
    }

    return result
  }

  return { ...empty, note: lastNote }
}

function num(v: string | undefined): number | undefined {
  if (v === undefined || v === "") return undefined
  const n = Number(v.replace(/[^\d.-]/g, ""))
  return Number.isFinite(n) ? n : undefined
}
