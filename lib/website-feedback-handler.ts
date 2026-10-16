import { randomUUID } from "node:crypto"
import { z } from "zod"
import { isFeedbackAnswer, type FeedbackAnswers } from "./website-feedback"

const answerSchema = z
  .object({
    clarity: z.string().refine((value) => isFeedbackAnswer("clarity", value)),
    navigation: z
      .string()
      .refine((value) => isFeedbackAnswer("navigation", value)),
    design: z.string().refine((value) => isFeedbackAnswer("design", value)),
    missing: z.string().refine((value) => isFeedbackAnswer("missing", value)),
    overall: z.string().refine((value) => isFeedbackAnswer("overall", value)),
  })
  .strict()

const feedbackSchema = z
  .object({
    version: z.literal(1),
    answers: answerSchema,
  })
  .strict()

type DeliverFeedback = (
  answers: FeedbackAnswers,
  receiptId: string,
) => Promise<void>

export function createFeedbackHandler(deliver: DeliverFeedback) {
  // Best effort per instance, bounded and transient. No IP is sent with feedback.
  const buckets = new Map<string, { count: number; resetAt: number }>()
  return async function POST(request: Request) {
    const respond = (body: object, status = 200) =>
      Response.json(body, {
        status,
        headers: { "Cache-Control": "no-store" },
      })
    const origin = request.headers.get("origin")
    if (origin && origin !== new URL(request.url).origin)
      return respond({ ok: false }, 403)
    if (!request.headers.get("content-type")?.includes("application/json"))
      return respond({ ok: false }, 415)

    const now = Date.now()
    for (const [key, bucket] of buckets)
      if (bucket.resetAt <= now) buckets.delete(key)
    if (buckets.size >= 2000) return respond({ ok: false }, 429)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
    const bucket = buckets.get(ip) ?? { count: 0, resetAt: now + 600_000 }
    bucket.count++
    buckets.set(ip, bucket)
    if (bucket.count > 5) return respond({ ok: false }, 429)

    let json: unknown
    try {
      const body = await request.text()
      if (body.length > 2048) return respond({ ok: false }, 413)
      json = JSON.parse(body)
    } catch {
      return respond({ ok: false }, 400)
    }
    const parsed = feedbackSchema.safeParse(json)
    if (!parsed.success) return respond({ ok: false }, 400)

    const receiptId = randomUUID()
    try {
      await deliver(parsed.data.answers, receiptId)
      console.info("Website feedback accepted by mail transport", { receiptId })
      return respond({ ok: true })
    } catch {
      console.error("Website feedback mail transport failed", { receiptId })
      return respond(
        {
          ok: false,
          message:
            "Das Senden hat gerade nicht geklappt. Bitte versuchen Sie es noch einmal.",
        },
        502,
      )
    }
  }
}
