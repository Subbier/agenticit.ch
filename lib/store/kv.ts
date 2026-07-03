// Schlanker KV-Store über die Upstash/Vercel-KV REST-API (ohne SDK – nur fetch).
// Aktiv, sobald KV_REST_API_URL + KV_REST_API_TOKEN gesetzt sind (Vercel KV / Upstash).

const BASE = process.env.KV_REST_API_URL
const TOKEN = process.env.KV_REST_API_TOKEN

export function kvConfigured(): boolean {
  return Boolean(BASE && TOKEN)
}

async function cmd(args: (string | number)[]): Promise<unknown> {
  if (!BASE || !TOKEN) throw new Error("KV nicht konfiguriert")
  const res = await fetch(BASE, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify(args),
  })
  if (!res.ok) throw new Error(`KV-Fehler ${res.status}`)
  const data = (await res.json()) as { result?: unknown }
  return data.result
}

export async function kvSetJson(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  const args: (string | number)[] = ["SET", key, JSON.stringify(value)]
  if (ttlSeconds) args.push("EX", ttlSeconds)
  await cmd(args)
}

export async function kvGetJson<T>(key: string): Promise<T | null> {
  const r = await cmd(["GET", key])
  if (r == null) return null
  try {
    return JSON.parse(r as string) as T
  } catch {
    return null
  }
}

export async function kvDel(key: string): Promise<void> {
  await cmd(["DEL", key])
}

export async function kvKeys(pattern: string): Promise<string[]> {
  const r = await cmd(["KEYS", pattern])
  return Array.isArray(r) ? (r as string[]) : []
}
