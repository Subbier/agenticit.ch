// Google PageSpeed Insights (Lighthouse) – Performance- & SEO-Score der Domain.
// Gratis-API; optionaler PAGESPEED_API_KEY erhöht das Kontingent.

export type LighthouseResult = {
  found: boolean
  performance: number | null // 0–100
  seo: number | null // 0–100
  lcp: number | null // Sekunden
  note?: string
}

function fullUrl(input: string): string {
  const s = (input || "").trim()
  if (!s) return ""
  return /^https?:\/\//i.test(s) ? s : `https://${s.replace(/^\/+/, "")}`
}

export async function fetchPageSpeed(rawUrl: string): Promise<LighthouseResult> {
  const empty: LighthouseResult = { found: false, performance: null, seo: null, lcp: null }
  const url = fullUrl(rawUrl)
  if (!url) return { ...empty, note: "Keine URL angegeben." }

  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed")
  api.searchParams.set("url", url)
  api.searchParams.set("strategy", "mobile")
  api.searchParams.append("category", "performance")
  api.searchParams.append("category", "seo")
  if (process.env.PAGESPEED_API_KEY) api.searchParams.set("key", process.env.PAGESPEED_API_KEY)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)
  try {
    const res = await fetch(api.toString(), { signal: controller.signal })
    if (!res.ok) return { ...empty, note: "PageSpeed nicht verfügbar." }
    const data = (await res.json()) as {
      lighthouseResult?: {
        categories?: { performance?: { score?: number }; seo?: { score?: number } }
        audits?: { "largest-contentful-paint"?: { numericValue?: number } }
      }
    }
    const cat = data.lighthouseResult?.categories
    const perf = cat?.performance?.score
    const seo = cat?.seo?.score
    const lcpMs = data.lighthouseResult?.audits?.["largest-contentful-paint"]?.numericValue
    if (perf === undefined && seo === undefined) return { ...empty, note: "Keine Lighthouse-Daten erhalten." }
    return {
      found: true,
      performance: perf !== undefined ? Math.round(perf * 100) : null,
      seo: seo !== undefined ? Math.round(seo * 100) : null,
      lcp: lcpMs !== undefined ? Math.round((lcpMs / 1000) * 10) / 10 : null,
    }
  } catch {
    return { ...empty, note: "PageSpeed nicht erreichbar." }
  } finally {
    clearTimeout(timeout)
  }
}
