// Terminbestätigungs-Mail für Voice-Rückruftermine (Nodemailer / SMTP).
// Unabhängig von Zoho Flow – nutzt dieselbe authentifizierte SMTP-Verbindung
// wie die Analyse-Mail, sendet aber bewusst aus terminbestaetigung@agenticit.ch.

import nodemailer from "nodemailer"

export type VoiceBooking = {
  name?: string
  company?: string
  phone?: string
  email?: string
  interest?: string
  callback_date?: string // "YYYY-MM-DD"
  callback_time?: string // "HH:mm"
  notes?: string
}

export type MailResult = { sent: boolean; note?: string }

const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]

function formatDate(date?: string): string {
  if (!date) return ""
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim())
  if (!m) return date
  const [, y, mo, d] = m
  const dt = new Date(Number(y), Number(mo) - 1, Number(d))
  const wd = Number.isNaN(dt.getTime()) ? "" : `${WEEKDAYS[dt.getDay()]}, `
  return `${wd}${d}.${mo}.${y}`
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export async function sendVoiceConfirmation(b: VoiceBooking): Promise<MailResult> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return { sent: false, note: "SMTP nicht konfiguriert – Versand übersprungen." }
  }
  if (!b.email) return { sent: false, note: "Keine E-Mail-Adresse – kein Versand." }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const from = process.env.MAIL_FROM_VOICE || `AgenticIT | Terminbestätigung <terminbestaetigung@agenticit.ch>`

  const name = (b.name || "").trim()
  const anrede = name ? `Guten Tag ${esc(name)},` : "Guten Tag,"
  const dateStr = formatDate(b.callback_date)
  const timeStr = (b.callback_time || "").trim()
  const terminLine = [dateStr, timeStr ? `um ${esc(timeStr)} Uhr` : ""].filter(Boolean).join(" ")

  const text = [
    name ? `Guten Tag ${name},` : "Guten Tag,",
    "",
    "vielen Dank für Ihr Interesse an AgenticIT und das angenehme Gespräch mit unserer digitalen Assistentin.",
    "",
    "Gerne bestätigen wir Ihnen Ihren persönlichen Rückruftermin:",
    terminLine ? `Rückruf: ${[dateStr, timeStr ? `um ${timeStr} Uhr` : ""].filter(Boolean).join(" ")}` : "Rückruf: wie besprochen",
    b.phone ? `Wir rufen Sie an unter: ${b.phone}` : "",
    "",
    "Das Gespräch dauert maximal 3 Minuten und ist für Sie selbstverständlich kostenfrei und unverbindlich. Einer unserer Berater meldet sich pünktlich zur vereinbarten Zeit bei Ihnen.",
    "",
    "Über 15 Jahre Erfahrung im Online-Markt und mehr als 140 Diplome & Zertifikate. Zertifiziert durch: Google, Microsoft, Meta, OpenAI, Anthropic, HubSpot, SEMrush, LinkedIn und Surfer SEO.",
    "",
    "Herzliche Grüsse",
    "Ihr AgenticIT-Team",
    "",
    "AgenticIT GmbH",
    "+41 31 539 44 44",
    "info@agenticit.ch",
    "www.agenticit.ch",
    "",
    "— DSG-konform · Daten in der Schweiz",
  ]
    .filter((l) => l !== "")
    .join("\n")

  const terminBox = terminLine
    ? `<div style="background:#eef6ff;border:1px solid #cfe4fb;border-radius:10px;padding:16px 18px;margin:18px 0;">
         <div style="font-size:12px;color:#5C6B82;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;">Ihr Rückruftermin</div>
         <div style="font-size:18px;font-weight:800;color:#13294B;">${terminLine}</div>
         ${b.phone ? `<div style="font-size:13px;color:#5C6B82;margin-top:6px;">Wir rufen Sie an unter <strong style="color:#16233B;">${esc(b.phone)}</strong></div>` : ""}
       </div>`
    : ""

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px 16px;">
      <div style="background:#13294B;border-radius:14px 14px 0 0;padding:22px 28px;">
        <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.3px;">AgenticIT</div>
        <div style="color:#9fb8d6;font-size:12px;margin-top:2px;">Terminbestätigung</div>
      </div>
      <div style="background:#ffffff;border:1px solid #e6ecf3;border-top:none;border-radius:0 0 14px 14px;padding:28px;color:#16233B;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 14px;">${anrede}</p>
        <p style="margin:0 0 14px;">vielen Dank für Ihr Interesse an <strong>AgenticIT</strong> und das angenehme Gespräch mit unserer digitalen Assistentin.</p>
        <p style="margin:0 0 4px;">Gerne bestätigen wir Ihnen Ihren persönlichen Rückruftermin:</p>
        ${terminBox}
        <p style="margin:0 0 14px;">Das Gespräch dauert <strong>maximal 3 Minuten</strong> und ist für Sie selbstverständlich <strong>kostenfrei und unverbindlich</strong>. Einer unserer Berater meldet sich pünktlich zur vereinbarten Zeit bei Ihnen.</p>
        <div style="background:#f6f8fb;border:1px solid #e6ecf3;border-radius:10px;padding:14px 16px;font-size:13px;color:#5C6B82;margin:18px 0;line-height:1.5;">
          Über <strong>15 Jahre Erfahrung</strong> im Online-Markt &amp; mehr als <strong>140 Diplome &amp; Zertifikate</strong> · Zertifiziert durch: <strong>Google · Microsoft · Meta · OpenAI · Anthropic · HubSpot · SEMrush · LinkedIn · Surfer SEO</strong>
        </div>
        <p style="margin:18px 0 4px;">Herzliche Grüsse</p>
        <p style="margin:0 0 16px;font-weight:700;">Ihr AgenticIT-Team</p>
        <div style="border-top:1px solid #e6ecf3;padding-top:16px;font-size:13px;color:#5C6B82;line-height:1.8;">
          <strong style="color:#16233B;">AgenticIT GmbH</strong><br>
          <a href="tel:+41315394444" style="color:#5C6B82;text-decoration:none;">+41 31 539 44 44</a><br>
          <a href="mailto:info@agenticit.ch" style="color:#5C6B82;text-decoration:none;">info@agenticit.ch</a><br>
          <a href="https://agenticit.ch" style="color:#2DA8FF;text-decoration:none;">www.agenticit.ch</a>
        </div>
        <div style="margin-top:16px;font-size:11px;color:#9fb0c8;">DSG-konform · Daten in der Schweiz</div>
      </div>
    </div>
  </div>`

  await transporter.sendMail({
    from,
    to: b.email,
    bcc: process.env.MAIL_BCC || undefined,
    subject: "Ihr Rückruftermin bei AgenticIT – Bestätigung",
    text,
    html,
  })

  return { sent: true }
}
