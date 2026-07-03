// WhatsApp-Versand über die Twilio REST-API (ohne SDK – nur fetch).
// Benötigt: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, WHATSAPP_FROM (z. B. "whatsapp:+41315394444").

const SID = process.env.TWILIO_ACCOUNT_SID
const TOKEN = process.env.TWILIO_AUTH_TOKEN
const FROM = process.env.WHATSAPP_FROM

export function whatsappConfigured(): boolean {
  return Boolean(SID && TOKEN && FROM)
}

export function normalizePhone(phone: string): string {
  const p = phone.trim().replace(/[^\d+]/g, "")
  return p.startsWith("+") ? p : `+${p.replace(/^0+/, "")}`
}

function toWhatsApp(phone: string): string {
  return `whatsapp:${normalizePhone(phone)}`
}

async function send(params: Record<string, string>): Promise<{ ok: boolean; note?: string }> {
  if (!SID || !TOKEN || !FROM) return { ok: false, note: "WhatsApp nicht konfiguriert" }
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${SID}:${TOKEN}`).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  })
  if (!res.ok) {
    const t = await res.text().catch(() => "")
    return { ok: false, note: `Twilio ${res.status}: ${t.slice(0, 200)}` }
  }
  return { ok: true }
}

// Genehmigtes Template (business-initiated) mit Variablen, z. B. { "1": "Herr Müller" }.
export async function sendTemplate(toPhone: string, contentSid: string, variables: Record<string, string>) {
  return send({
    From: FROM!,
    To: toWhatsApp(toPhone),
    ContentSid: contentSid,
    ContentVariables: JSON.stringify(variables),
  })
}

// Freie Session-Nachricht (nur innerhalb des 24-h-Fensters nach Kundenantwort erlaubt).
export async function sendText(toPhone: string, body: string) {
  return send({ From: FROM!, To: toWhatsApp(toPhone), Body: body })
}
