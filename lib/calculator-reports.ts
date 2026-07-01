import { formatChf } from "@/lib/format-currency"
import type { AutomationResult } from "@/lib/automation-calculator"
export type RoiResult = {
  roi: number
  annual: number
  count: number
}

export type CalculatorReportContact = {
  name: string
  address: string
  phone: string
  email?: string
}

function baseStyles() {
  return `
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0B1F3A; margin: 0; padding: 40px; background: #fff; }
    .brand { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .brand span { color: #16C7C0; }
    .eyebrow { display: inline-block; background: rgba(22,199,192,.12); color: #0a8f89; font-size: 11px; font-weight: 800; letter-spacing: .6px; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; margin: 16px 0 8px; }
    h1 { font-size: 28px; line-height: 1.15; margin: 0 0 12px; }
    p { color: #475569; line-height: 1.55; font-size: 14px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 24px 0; }
    .card { border: 1px solid #E3E9F2; border-radius: 14px; padding: 16px; background: #FAFCFF; }
    .card b { display: block; font-size: 26px; color: #0a8f89; margin-top: 4px; }
    .card span { font-size: 12px; color: #5A6B82; text-transform: uppercase; letter-spacing: .4px; font-weight: 700; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #E3E9F2; font-size: 11px; color: #9aa9bf; }
    @media print { body { padding: 24px; } }
  `
}

export function automationReportHtml(
  contact: CalculatorReportContact,
  input: { hoursPerWeek: number; hourlyRate: number; automationPercent: number },
  result: AutomationResult,
) {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>AgenticIT – Zeitgewinn Automatisierung</title><style>${baseStyles()}</style></head><body>
  <div class="brand">Agentic<span>IT</span></div>
  <div class="eyebrow">AgenticIT-Rechner · Teil 1</div>
  <h1>Zeitgewinn durch Automatisierung</h1>
  <p>Wiederholende, zeitintensive Aufgaben automatisieren wir mit KI und passenden Tools – damit Ihr Team Kapazität für geschäftskritische Arbeit gewinnt.</p>
  <div class="grid">
    <div class="card"><span>Stunden gespart / Woche</span><b>${result.hoursSavedWeek} h</b></div>
    <div class="card"><span>Stunden gespart / Jahr</span><b>${result.hoursSavedYear.toLocaleString("de-CH")} h</b></div>
    <div class="card"><span>Freiwerdender Wert / Jahr</span><b>${formatChf(result.valuePerYear)}</b></div>
    <div class="card"><span>Basis</span><b>${input.hoursPerWeek} h/Wo · ${input.automationPercent}% automatisierbar</b></div>
  </div>
  <p><strong>${contact.name}</strong><br>${contact.address}<br>${contact.phone}${contact.email ? `<br>${contact.email}` : ""}</p>
  <div class="footer">Indikativwerte · DSG-konform · AgenticIT · agenticit.ch · ${new Date().toLocaleDateString("de-CH")}</div>
  <script>window.onload=()=>window.print()</script>
  </body></html>`
}

export function roiReportHtml(
  contact: CalculatorReportContact,
  investment: number,
  scenarioLabel: string,
  result: RoiResult,
) {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>AgenticIT – ROI Auswertung</title><style>${baseStyles()}</style></head><body>
  <div class="brand">Agentic<span>IT</span></div>
  <div class="eyebrow">AgenticIT-Rechner · Teil 2</div>
  <h1>Return on Invest (ROI)</h1>
  <p>Potenzial durch digitales Team: RevOps, Kundendienst-KI und Prozessautomatisierung – konservativ gerechnet (${scenarioLabel}).</p>
  <div class="grid">
    <div class="card"><span>ROI</span><b>${result.roi > 0 ? "+" : ""}${Math.round(result.roi).toLocaleString("de-CH")} %</b></div>
    <div class="card"><span>Jahrespotenzial</span><b>${formatChf(result.annual)}</b></div>
    <div class="card"><span>Investition / Jahr</span><b>${formatChf(investment)}</b></div>
    <div class="card"><span>Bereiche gewählt</span><b>${result.count}</b></div>
  </div>
  <p><strong>${contact.name}</strong><br>${contact.address}<br>${contact.phone}${contact.email ? `<br>${contact.email}` : ""}</p>
  <div class="footer">Indikativwerte aus belegten Studienwerten · vor Nutzung menschlich prüfen · AgenticIT · ${new Date().toLocaleDateString("de-CH")}</div>
  <script>window.onload=()=>window.print()</script>
  </body></html>`
}

export function openReport(html: string) {
  const w = window.open("", "_blank")
  if (!w) return false
  w.document.write(html)
  w.document.close()
  return true
}

/** Lädt den Report als HTML-Datei herunter – funktioniert auch ohne Pop-up-Freigabe. */
export function downloadReport(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function reportFilename(prefix: string) {
  const date = new Date().toISOString().slice(0, 10)
  const safe = prefix.replace(/[^\w\-äöüÄÖÜ]/g, "_")
  return `AgenticIT_${safe}_${date}.html`
}
