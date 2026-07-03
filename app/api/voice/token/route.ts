import { NextResponse } from "next/server"

// Server-seitige Authentifizierung gegen ElevenLabs – funktioniert für JEDEN Besucher,
// unabhängig von Domain-Allowlist. Der API-Key bleibt geheim (nur serverseitig).
export const runtime = "nodejs"

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "agent_0201kwjmq83cf1btc17d9048pf8n"

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_key", message: "ELEVENLABS_API_KEY ist nicht gesetzt." },
      { status: 503 },
    )
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(AGENT_ID)}`,
      { headers: { "xi-api-key": apiKey }, cache: "no-store" },
    )
    if (!res.ok) {
      return NextResponse.json({ error: "token_failed", status: res.status }, { status: 502 })
    }
    const data = (await res.json()) as { token?: string }
    if (!data.token) {
      return NextResponse.json({ error: "no_token" }, { status: 502 })
    }
    return NextResponse.json({ token: data.token })
  } catch {
    return NextResponse.json({ error: "request_failed" }, { status: 502 })
  }
}
