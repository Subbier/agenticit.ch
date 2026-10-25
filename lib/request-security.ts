import { createHmac, timingSafeEqual } from "node:crypto"

export function validWebhookSecret(
  actual: string | null,
  expected: string | undefined,
): boolean {
  if (!actual || !expected || actual.length > 1024) return false
  const left = Buffer.from(actual)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function readBoundedText(
  request: Request,
  maxBytes = 65_536,
): Promise<string> {
  const declared = Number(request.headers.get("content-length"))
  if (declared > maxBytes) throw new Error("Request body too large")
  const reader = request.body?.getReader()
  if (!reader) return ""
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) {
        await reader.cancel()
        throw new Error("Request body too large")
      }
      chunks.push(value)
    }
    return Buffer.concat(chunks).toString("utf8")
  } finally {
    reader.releaseLock()
  }
}

export async function readBoundedJson(request: Request): Promise<unknown> {
  return JSON.parse(await readBoundedText(request))
}

export function validTwilioSignature(
  url: string,
  params: URLSearchParams,
  signature: string,
  token: string,
): boolean {
  if (!token || !signature || signature.length > 100) return false
  let payload = url
  for (const key of [...new Set(params.keys())].sort()) {
    for (const value of [...new Set(params.getAll(key))].sort())
      payload += key + value
  }
  const expected = Buffer.from(
    createHmac("sha1", token).update(payload).digest("base64"),
  )
  const actual = Buffer.from(signature)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}
