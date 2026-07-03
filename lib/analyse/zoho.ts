// Lead-Weiterleitung an Zoho (über den bestehenden Webhook).

import type { Analysis } from "./types"

export async function forwardLeadToZoho(a: Analysis): Promise<{ ok: boolean; note?: string }> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL
  if (!webhookUrl) return { ok: false, note: "LEADS_WEBHOOK_URL fehlt – Zoho-Weiterleitung übersprungen." }

  const c = a.contact
  const tags = [
    "quelle:ki-analyse",
    a.semrush.found ? "semrush:ja" : "semrush:nein",
    `potenzial_chf:${a.roi.total}`,
  ]

  const payload = {
    crm: "zoho",
    name: `${c.vorname} ${c.nachname}`.trim(),
    email: c.email,
    phone: c.phone,
    company: c.firma,
    website: c.url,
    city: c.stadt,
    zip: c.plz,
    goal: "agentische-analyse",
    tags,
    followUpTask: "Rückruf – KI-Analyse besprechen",
    analysis: {
      visibility: a.visibility,
      freedWeeklyHours: a.freed.weeklyHours,
      roiTotal: a.roi.total,
      priorities: a.priorities,
    },
    submittedAt: a.generatedAt,
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok, note: res.ok ? undefined : `Webhook antwortete mit ${res.status}` }
  } catch {
    return { ok: false, note: "Zoho-Webhook nicht erreichbar." }
  }
}
