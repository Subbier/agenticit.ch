// E-Mail-Versand des Reports via SMTP (Nodemailer).

import nodemailer from "nodemailer"
import type { Analysis } from "./types"

export type MailResult = { sent: boolean; note?: string }

export async function sendReportMail(analysis: Analysis, pdf: Buffer): Promise<MailResult> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return { sent: false, note: "SMTP nicht konfiguriert – Versand übersprungen." }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const c = analysis.contact
  const from = MAIL_FROM || `AgenticIT <${SMTP_USER}>`

  const anrede = c.vorname?.trim() ? `Hallo ${c.vorname.trim()},` : "Guten Tag,"
  const bookingUrl = "https://agenticit.ch/#kontakt"

  const text = [
    anrede,
    "",
    "vielen Dank für Ihr Interesse an AgenticIT und dass Sie unsere KI-Blitzanalyse genutzt haben. Im Anhang finden Sie Ihre persönliche KI-Standortbestimmung als PDF.",
    "",
    "Sie zeigt Ihre digitale Sichtbarkeit, welche Aufgaben sich automatisieren lassen, den möglichen Wertbeitrag und einen 1-Jahres-Fahrplan.",
    "",
    "Wir melden uns am nächsten Arbeitstag bei Ihnen, um offene Fragen zu beantworten und die Auswertung gemeinsam durchzugehen.",
    `Möchten Sie früher? Vereinbaren Sie direkt ein unverbindliches Gespräch: ${bookingUrl}`,
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
  ].join("\n")

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px 16px;">
      <div style="background:#1E2631;border-radius:14px 14px 0 0;padding:22px 28px;">
        <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.3px;">AgenticIT</div>
        <div style="color:#9fb8d6;font-size:12px;margin-top:2px;">Ihre KI-Standortbestimmung</div>
      </div>
      <div style="background:#ffffff;border:1px solid #e6ecf3;border-top:none;border-radius:0 0 14px 14px;padding:28px;color:#16233B;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 14px;">${anrede}</p>
        <p style="margin:0 0 14px;">vielen Dank für Ihr Interesse an <strong>AgenticIT</strong> und dass Sie unsere KI-Blitzanalyse genutzt haben. Im Anhang finden Sie Ihre persönliche <strong>KI-Standortbestimmung</strong> als PDF.</p>
        <p style="margin:0 0 14px;">Sie zeigt Ihre digitale Sichtbarkeit, welche Aufgaben sich automatisieren lassen, den möglichen Wertbeitrag und einen 1-Jahres-Fahrplan.</p>
        <p style="margin:0 0 18px;">Wir <strong>melden uns am nächsten Arbeitstag</strong> bei Ihnen, um offene Fragen zu beantworten und die Auswertung gemeinsam durchzugehen.</p>
        <div style="text-align:center;margin:22px 0;">
          <a href="${bookingUrl}" style="display:inline-block;background:#57C7FF;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 28px;border-radius:10px;">Direkt einen Termin vereinbaren</a>
        </div>
        <div style="background:#f6f8fb;border:1px solid #e6ecf3;border-radius:10px;padding:14px 16px;font-size:13px;color:#5C6B82;margin:18px 0;line-height:1.5;">
          Über <strong>15 Jahre Erfahrung</strong> im Online-Markt &amp; mehr als <strong>140 Diplome &amp; Zertifikate</strong> · Zertifiziert durch: <strong>Google · Microsoft · Meta · OpenAI · Anthropic · HubSpot · SEMrush · LinkedIn · Surfer SEO</strong>
        </div>
        <p style="margin:18px 0 4px;">Herzliche Grüsse</p>
        <p style="margin:0 0 16px;font-weight:700;">Ihr AgenticIT-Team</p>
        <div style="border-top:1px solid #e6ecf3;padding-top:16px;font-size:13px;color:#5C6B82;line-height:1.8;">
          <strong style="color:#16233B;">AgenticIT GmbH</strong><br>
          <a href="tel:+41315394444" style="color:#5C6B82;text-decoration:none;">+41 31 539 44 44</a><br>
          <a href="mailto:info@agenticit.ch" style="color:#5C6B82;text-decoration:none;">info@agenticit.ch</a><br>
          <a href="https://agenticit.ch" style="color:#57C7FF;text-decoration:none;">www.agenticit.ch</a>
        </div>
        <div style="margin-top:16px;font-size:11px;color:#9AA6B2;">DSG-konform · Daten in der Schweiz</div>
      </div>
    </div>
  </div>`

  await transporter.sendMail({
    from,
    to: c.email,
    bcc: process.env.MAIL_BCC || undefined,
    subject: `Ihre KI-Standortbestimmung – ${c.firma || "AgenticIT"}`,
    text,
    html,
    attachments: [{ filename: "AgenticIT_Standortbestimmung.pdf", content: pdf, contentType: "application/pdf" }],
  })

  return { sent: true }
}
