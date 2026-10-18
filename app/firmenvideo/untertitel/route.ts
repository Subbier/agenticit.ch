import { readFile } from "node:fs/promises"
import { join } from "node:path"

// Serve through Next.js so every host supplies the required WebVTT media type.
export const dynamic = "force-static"

export async function GET() {
  const captions = await readFile(
    join(process.cwd(), "public/videos/agenticit-firmenvideo-v3.de.vtt"),
    "utf8",
  )
  return new Response(captions, {
    headers: {
      "Content-Type": "text/vtt; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
