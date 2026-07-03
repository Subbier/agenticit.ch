// Schlanker SEMrush-API-Client (Standard-API, api.semrush.com).
// Doku: type=domain_rank / domain_organic. Antwort = CSV (;-getrennt) mit Header.

import type { SemrushResult } from "./types"

const BASE = "https://api.semrush.com/"

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

async function call(params: Record<string, string>, signal?: AbortSignal): Promise<string> {
  const url = new URL(BASE)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString(), { signal })
  const text = await res.text()
  return text
}

/**
 * Holt Domain-Overview + Top-Keywords. Liefert bei fehlendem Key oder
 * "NOTHING FOUND" einen sauberen `found:false`-Zustand (kein Throw).
 */
export async function fetchSemrush(domain: string, database = "ch"): Promise<SemrushResult> {
  // Akzeptiert beide Variablennamen: SEMRUSH_API_KEY (Doku-Standard) ODER SEMRUSH
  // (so ist der Key aktuell in Vercel hinterlegt). So greift der Key unabhängig vom Namen.
  const key = process.env.SEMRUSH_API_KEY || process.env.SEMRUSH
  const empty: SemrushResult = { found: false, topKeywords: [] }
  if (!key) return { ...empty, note: "SEMrush-Key fehlt – Sichtbarkeitswerte geschätzt." }
  if (!domain) return { ...empty, note: "Keine Domain angegeben." }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12_000)
  try {
    const overviewRaw = await call(
      {
        type: "domain_rank",
        key,
        domain,
        database,
        export_columns: "Dn,Rk,Or,Ot,Oc,Ad",
      },
      controller.signal,
    )

    if (/ERROR|NOTHING FOUND/i.test(overviewRaw) || !overviewRaw.includes(";")) {
      return { ...empty, note: "Für diese Domain liegen (noch) keine SEMrush-Daten vor." }
    }

    const ov = parseCsv(overviewRaw)[0] ?? {}
    const result: SemrushResult = {
      found: true,
      rank: num(ov["Rank"]),
      organicKeywords: num(ov["Organic Keywords"]),
      organicTraffic: num(ov["Organic Traffic"]),
      paidKeywords: num(ov["Adwords Keywords"]),
      topKeywords: [],
    }

    // Top-Keywords (best effort, blockiert das Ergebnis nicht)
    try {
      const kwRaw = await call(
        {
          type: "domain_organic",
          key,
          domain,
          database,
          display_limit: "6",
          display_sort: "tr_desc",
          export_columns: "Ph,Po,Nq,Cp",
        },
        controller.signal,
      )
      if (kwRaw.includes(";") && !/ERROR|NOTHING FOUND/i.test(kwRaw)) {
        result.topKeywords = parseCsv(kwRaw)
          .map((r) => ({
            keyword: r["Keyword"] ?? "",
            position: num(r["Position"]) ?? 0,
            volume: num(r["Search Volume"]) ?? 0,
            cpc: parseFloat((r["CPC"] ?? "0").replace(",", ".")) || 0,
          }))
          .filter((k) => k.keyword)
          .slice(0, 6)
      }
    } catch {
      /* Keywords optional */
    }

    return result
  } catch {
    return { ...empty, note: "SEMrush nicht erreichbar – Sichtbarkeitswerte geschätzt." }
  } finally {
    clearTimeout(timeout)
  }
}

function num(v: string | undefined): number | undefined {
  if (v === undefined || v === "") return undefined
  const n = Number(v.replace(/[^\d.-]/g, ""))
  return Number.isFinite(n) ? n : undefined
}
