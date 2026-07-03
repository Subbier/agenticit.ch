// Automation Engine: führt Branche, Schon/Noch-nicht-Antworten und SEMrush-Daten
// zu einer branchengenauen Analyse zusammen.

import type { AnalysePayload, Analysis, SemrushResult, UseCasePick } from "./types"
import { RECOMMENDATIONS } from "./catalog"
import { fetchSemrush, normalizeDomain } from "./semrush"
import { fetchPageSpeed } from "./pagespeed"
import { BRANCHES, presetFor } from "./recommend"
import type { PresetItem } from "./branch-presets"
import { BRANCH_KEYWORDS } from "./branch-keywords"

// Konservative Annahmen für die Nachfrage-Rechnung (klar als Schätzung gekennzeichnet).
const REACH_RATE = 0.08 // realistisch erreichbarer Anteil der Suchen bei guter Sichtbarkeit
const LEAD_RATE = 0.04 // Anteil der Besucher, der zur Anfrage wird

const HOURLY_RATE = 75 // CHF, konservativer Mischsatz
const WORK_WEEKS = 46
const ROUTINE_MID: Record<string, number> = { "Unter 5": 4, "5–15": 10, "15–30": 22, "Über 30": 35 }

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, Math.round(n)))
}

function googleScore(sr: SemrushResult, sichtbarkeit: string): number {
  if (sr.found && sr.organicTraffic !== undefined) {
    const t = Math.max(1, sr.organicTraffic)
    return clamp(20 + (Math.log10(t) / 5) * 80)
  }
  const map: Record<string, number> = { "Sehr gut": 72, Mittel: 50, Kaum: 28, "Weiss ich nicht": 32 }
  return map[sichtbarkeit] ?? 35
}

function buildVisibility(sr: SemrushResult, a: AnalysePayload["answers"]) {
  const google = googleScore(sr, a.sichtbarkeit)
  return {
    google,
    local: clamp(google * 0.8 + (a.web_anfragen === "Über 20" ? 12 : 0) - 6),
    bing: clamp(google * 0.6),
    ki: clamp(google * 0.45),
  }
}

// Geschätzte Wochenstunden je Use-Case (aus „~X Std./Woche" oder Aufwand).
function estHours(it: PresetItem): number {
  const m = it.benefit.match(/(\d+)\s*(?:[-–]\s*(\d+))?\s*Std/)
  if (m) {
    const lo = Number(m[1])
    const hi = m[2] ? Number(m[2]) : lo
    return Math.max(1, Math.round((lo + hi) / 2))
  }
  return it.aufwand === "Hoch" ? 4 : it.aufwand === "Niedrig" ? 2 : 3
}

function toPick(it: PresetItem): UseCasePick {
  return {
    title: it.title,
    benefit: it.benefit,
    trigger: it.trigger,
    ablauf: it.ablauf,
    bereich: it.bereich,
    aufwand: it.aufwand,
    branchSpecific: it.branchSpecific,
  }
}

// „Noch nicht"-Punkte sind die Empfehlung. Macht der Besucher schon alles,
// zeigen wir trotzdem die wichtigsten Ausbau-Ideen.
function selectByStatus(items: PresetItem[], todo: string[], limit: number): PresetItem[] {
  const chosen = items.filter((i) => todo.includes(i.title))
  const list = chosen.length ? chosen : items.slice(0, 3)
  return list.slice(0, limit)
}

function buildRoi(yearlyHours: number, revTodo: PresetItem[]) {
  const timeValue = yearlyHours * HOURLY_RATE
  const acqClose = revTodo.filter((i) => ["Kundengewinnung", "Angebote & Abschluss"].includes(i.bereich)).length
  const retentionGap = revTodo.filter((i) =>
    ["Kundenbindung & Verlängerung", "Empfehlungen & Bewertungen"].includes(i.bereich),
  ).length
  const dealsValue = 18_000 + Math.min(3, acqClose) * 9_000
  const retentionValue = 12_000 + Math.min(3, retentionGap) * 7_000
  const total = timeValue + dealsValue + retentionValue
  const paybackMonths = total > 120_000 ? 2 : 3
  return { timeValue, dealsValue, retentionValue, total, paybackMonths }
}

function buildRecommendations(a: AnalysePayload["answers"], autoTodo: PresetItem[], revTodo: PresetItem[]) {
  const recs: { title: string; effect: string; area: string }[] = []
  const push = (r: { title: string; effect: string; area: string }) => {
    if (!recs.find((x) => x.title === r.title)) recs.push(r)
  }
  if (["Kaum", "Weiss ich nicht", "Mittel"].includes(a.sichtbarkeit) || a.web_anfragen !== "Über 20")
    push(RECOMMENDATIONS.sichtbarkeit)
  if (revTodo.some((i) => i.bereich === "Angebote & Abschluss")) {
    push(RECOMMENDATIONS.speed)
    push(RECOMMENDATIONS.followup)
  }
  if (autoTodo.some((i) => i.bereich === "Telefon & Empfang")) push(RECOMMENDATIONS.voice)
  push(RECOMMENDATIONS.leadscoring)
  return recs.slice(0, 5)
}

function buildPriorities(a: AnalysePayload["answers"], autoTodo: PresetItem[], revTodo: PresetItem[]) {
  const p: { want: string; answer: string }[] = []
  if (["Kaum", "Weiss ich nicht", "Mittel"].includes(a.sichtbarkeit) || a.web_anfragen !== "Über 20")
    p.push({ want: "Mehr Sichtbarkeit & qualifizierte Anfragen", answer: "SEO/GEO-Aufbau plus Speed-to-Lead bringen die richtigen Anfragen zuerst." })
  if (autoTodo.length)
    p.push({ want: "Spürbar weniger Administration", answer: "Die branchenüblichen Routineaufgaben übernehmen digitale Mitarbeitende." })
  if (revTodo.length)
    p.push({ want: "Mehr Abschlüsse & stärkere Bindung", answer: "Nachfassen, Renewal und Empfehlungen laufen automatisiert – kein Potenzial bleibt liegen." })
  p.push({ want: "Fokus auf das Kerngeschäft", answer: "Die Routine übernimmt die KI; Sie gestalten das Wesentliche." })
  return p.slice(0, 5)
}

const ROADMAP = [
  { period: "Monat 1", title: "Andocken & Quick Wins", desc: "Anbindung an Website, E-Mail, CRM und Telefonie. Erste Routine wird automatisiert." },
  { period: "Monat 2–3", title: "Back-Office entlasten", desc: "Belege, Posteingang, Termine und Reports laufen selbstständig." },
  { period: "Monat 4–6", title: "Revenue-Motor", desc: "Lead-Scoring, Speed-to-Lead, Termin- und Follow-up-Automation gehen live." },
  { period: "Monat 7–12", title: "Halten & wachsen", desc: "Bindung, Upsell und Empfehlungen plus laufendes Reporting und Feintuning." },
]

export async function buildAnalysis(payload: AnalysePayload): Promise<Analysis> {
  const domain = normalizeDomain(payload.contact.url)
  const [semrush, lighthouse] = await Promise.all([fetchSemrush(domain), fetchPageSpeed(payload.contact.url)])
  const a = payload.answers

  const kw = BRANCH_KEYWORDS[a.branche] ?? BRANCH_KEYWORDS["andere"]
  const potentialVisitors = Math.round(kw.total * REACH_RATE)
  const searchDemand = {
    keywords: kw.keywords,
    total: kw.total,
    potentialVisitors,
    potentialLeads: Math.round(potentialVisitors * LEAD_RATE),
  }

  const preset = presetFor(a.branche)
  const autoTodo = selectByStatus(preset.automation, a.automation_todo ?? [], 5)
  const revTodo = selectByStatus(preset.revops, a.revops_todo ?? [], 5)

  const tasks = autoTodo.slice(0, 4).map((i) => ({ label: i.title, hours: estHours(i) }))
  const sumHours = autoTodo.reduce((s, i) => s + estHours(i), 0)
  const routineCap = ROUTINE_MID[a.routine_stunden] ?? 99
  const weeklyHours = Math.max(2, Math.min(routineCap, sumHours || 6))
  const yearlyHours = weeklyHours * WORK_WEEKS
  const freed = { weeklyHours, yearlyHours, fte: Math.round((yearlyHours / 1800) * 10) / 10 }
  const roi = buildRoi(yearlyHours, revTodo)

  return {
    contact: payload.contact,
    answers: a,
    generatedAt: new Date().toISOString(),
    visibility: buildVisibility(semrush, a),
    semrush,
    lighthouse,
    searchDemand,
    freed,
    roi,
    tasks,
    recommendations: buildRecommendations(a, autoTodo, revTodo),
    roadmap: ROADMAP,
    priorities: buildPriorities(a, autoTodo, revTodo),
    branchLabel: BRANCHES.find((b) => b.id === a.branche)?.label ?? "",
    automation: autoTodo.map(toPick),
    revops: revTodo.map(toPick),
  }
}
