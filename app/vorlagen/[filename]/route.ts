import { readFile } from "node:fs/promises"
import { join } from "node:path"

const templates = new Set([
  "AgenticIT-Akquise-Plan.txt",
  "AgenticIT-Anfrage-CRM-Pruefplan.txt",
  "AgenticIT-Kennzahlen-Arbeitsblatt.txt",
  "AgenticIT-KI-Einsatzkarte.txt",
  "AgenticIT-KI-Projektbriefing.txt",
  "AgenticIT-Projektstart-Plan.txt",
  "AgenticIT-Telefonassistent-Pruefplan.txt",
  "AgenticIT-Website-Briefing.txt",
  "AgenticIT-Website-Kostenvergleich.txt",
])

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> },
) {
  const { filename } = await context.params
  if (!templates.has(filename)) return new Response(null, { status: 404 })
  const bytes = await readFile(join(process.cwd(), "content/downloads", filename))
  const headers = new Headers({
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  })
  if (new URL(request.url).searchParams.get("download") === "1")
    headers.set("Content-Disposition", `attachment; filename="${filename}"`)
  return new Response(new Uint8Array(bytes), { headers })
}
