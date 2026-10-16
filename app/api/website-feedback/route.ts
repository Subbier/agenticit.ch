import nodemailer from "nodemailer"
import { createFeedbackHandler } from "@/lib/website-feedback-handler"
import { feedbackMailText } from "@/lib/website-feedback"

export const runtime = "nodejs"

export const POST = createFeedbackHandler(async (answers, receiptId) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS)
    throw Object.assign(new Error("Mail transport unavailable"), {
      code: "NOT_CONFIGURED",
    })
  const port = Number(SMTP_PORT ?? 587)
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  const recipient = "sr@agenticit.ch"
  const isProduction = process.env.VERCEL_ENV === "production"
  const result = await transport.sendMail({
    from: MAIL_FROM || `AgenticIT <${SMTP_USER}>`,
    to: recipient,
    subject: `${isProduction ? "" : "[Test/Vorschau] "}Website-Bewertung · ${answers.overall}/5`,
    text: feedbackMailText(answers, receiptId),
  })
  if (
    !result.accepted?.some(
      (address: string | { address: string }) =>
        (typeof address === "string"
          ? address
          : address.address
        ).toLowerCase() === recipient,
    )
  )
    throw Object.assign(new Error("Recipient not accepted"), {
      code: "RECIPIENT_NOT_ACCEPTED",
    })
})
