import { randomUUID } from "node:crypto"
import { leadSchema } from "@/lib/lead-intake"
import { buildWebdesignPdf } from "@/lib/webdesign-pdf"
import { POST as submitLead } from "../leads/route"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"))
  if (contentLength > 16000)
    return Response.json(
      { message: "Bitte prüfen Sie Ihre Angaben." },
      { status: 413 },
    )
  let raw: unknown
  try {
    const body = await request.text()
    if (body.length > 16000)
      return Response.json({ message: "Zu viele Angaben." }, { status: 413 })
    raw = JSON.parse(body)
  } catch {
    return Response.json(
      { message: "Bitte prüfen Sie Ihre Angaben." },
      { status: 400 },
    )
  }
  const parsed = leadSchema.safeParse(raw)
  if (
    !parsed.success ||
    !parsed.data.websiteBrief ||
    parsed.data.company_website
  )
    return Response.json(
      {
        message:
          "Bitte prüfen Sie Ihre Angaben und bestätigen Sie die PDF-Anfrage.",
      },
      { status: 400 },
    )
  // Render before sending the lead: a rendering error must not create a lead on retry.
  let pdf: Buffer
  try {
    pdf = await buildWebdesignPdf(parsed.data.websiteBrief, {
      name: parsed.data.name,
      company: parsed.data.company!,
    })
  } catch {
    return Response.json(
      {
        message:
          "Das PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
      },
      { status: 500 },
    )
  }
  const headers = new Headers(request.headers)
  headers.delete("content-length")
  headers.set("content-type", "application/json")
  const acknowledgement = await submitLead(
    new Request(request.url, {
      method: "POST",
      headers,
      body: JSON.stringify(parsed.data),
    }),
  )
  if (!acknowledgement.ok) return acknowledgement
  const receipt = randomUUID()
  // No contact details, financial inputs or webhook URL in the audit event.
  console.info(
    JSON.stringify({
      event: "website_concept_lead_accepted",
      receipt,
      at: new Date().toISOString(),
    }),
  )
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition":
        'attachment; filename="AgenticIT-Mein-Website-Konzept.pdf"',
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
      "x-report-receipt": receipt,
    },
  })
}
