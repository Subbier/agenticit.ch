import { createHmac, timingSafeEqual } from "node:crypto"
import {
  miaContext,
  normalizeSwissPhone,
  type PreparedTestLead,
} from "./test-leads"
import { callbackLabel, nextTestLeadCallback } from "./test-leads-schedule"

const PREFIX = "agenticit:testleads:v1:"
const QUEUE = `${PREFIX}due`
const TTL = 7 * 86400
type Job = {
  requestId: string
  crmId: string
  dueAt: string
  state: "queued" | "dispatching" | "accepted" | "blocked" | "uncertain"
  fingerprint: string
  callId?: string
}

function secret() {
  const value = process.env.CRON_SECRET
  if (!value) throw new Error("Worker authentication unavailable")
  return value
}
function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex")
}
export function validTestLeadWorkerAuth(header: string | null) {
  const actual = Buffer.from(header || ""),
    expected = Buffer.from(`Bearer ${secret()}`)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
export async function testLeadRedis(command: (string | number)[]) {
  const url = process.env.KV_REST_API_URL,
    token = process.env.KV_REST_API_TOKEN
  if (!url || !token || !url.startsWith("https://"))
    throw new Error("Queue unavailable")
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Queue unavailable")
  const data = await response.json()
  if (data.error) throw new Error("Queue command failed")
  return data.result
}
export async function testLeadCrm(
  action: string,
  payload: Record<string, unknown>,
) {
  const raw = process.env.TESTLEADS_CRM_GATEWAY_URL
  if (!raw) throw new Error("CRM gateway unavailable")
  const url = new URL(raw)
  if (
    url.protocol !== "https:" ||
    url.hostname !== "www.zohoapis.eu" ||
    !url.pathname.includes("/functions/testleads_gateway/actions/execute")
  )
    throw new Error("Unexpected CRM gateway")
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error("CRM gateway failed")
  const result = await response.json()
  const output =
    typeof result.details?.output === "string"
      ? JSON.parse(result.details.output)
      : result.details?.output
  if (
    result.code !== "success" ||
    !output?.ok ||
    output.module !== "TestLeads" ||
    output.org !== "20114585987"
  )
    throw new Error("CRM receipt not verified")
  return output
}
async function saveJob(job: Job) {
  await testLeadRedis([
    "SET",
    `${PREFIX}job:${job.requestId}`,
    JSON.stringify(job),
    "EX",
    TTL,
  ])
}
async function queueJob(job: Job) {
  // The receipt and due entry become visible together; a failed write cannot acknowledge an unqueued call.
  await testLeadRedis([
    "EVAL",
    "redis.call('SET',KEYS[1],ARGV[1],'EX',ARGV[2]); redis.call('ZADD',KEYS[2],'NX',ARGV[3],ARGV[4]); return 1",
    2,
    `${PREFIX}job:${job.requestId}`,
    QUEUE,
    JSON.stringify(job),
    TTL,
    new Date(job.dueAt).getTime(),
    job.requestId,
  ])
}

export async function submitTestLead(lead: PreparedTestLead, ip: string) {
  if (
    process.env.TESTLEADS_ENABLED !== "true" ||
    !process.env.TESTLEADS_CRM_GATEWAY_URL ||
    !process.env.TESTLEADS_AIRCALL_API_KEY
  )
    throw new Error("Intake unavailable")
  const fingerprint = signature(
    JSON.stringify({
      ...lead,
      submittedAt: "",
      consent: { ...lead.consent, recordedAt: "" },
    }),
  )
  const existing = await testLeadRedis([
    "GET",
    `${PREFIX}job:${lead.requestId}`,
  ])
  if (existing) {
    const job = JSON.parse(existing) as Job
    if (job.fingerprint !== fingerprint) throw new Error("Request conflict")
    return {
      receiptId: lead.requestId.slice(0, 8).toUpperCase(),
      callbackLabel: callbackLabel(new Date(job.dueAt), new Date()),
    }
  }
  const rateKey = `${PREFIX}rate:${signature(ip)}:${Math.floor(Date.now() / 600_000)}`
  const count = Number(await testLeadRedis(["INCR", rateKey]))
  await testLeadRedis(["EXPIRE", rateKey, 660])
  if (count > 5) throw new Error("Request limited")
  const lock = `${PREFIX}intake-lock:${lead.requestId}`
  if ((await testLeadRedis(["SET", lock, "1", "NX", "EX", 40])) !== "OK")
    throw new Error("Request in progress")
  try {
    // A changed request ID cannot repeatedly call the same phone number from different IPs.
    const phoneKey = `${PREFIX}phone:${signature(lead.phone)}`
    const phoneLock = await testLeadRedis([
      "SET",
      phoneKey,
      lead.requestId,
      "NX",
      "EX",
      600,
    ])
    if (
      phoneLock !== "OK" &&
      (await testLeadRedis(["GET", phoneKey])) !== lead.requestId
    )
      throw new Error("Phone already requested")
    const receipt = await testLeadCrm("create", { lead })
    if (!/^\d{10,30}$/.test(String(receipt.crmId)))
      throw new Error("CRM ID missing")
    const due = nextTestLeadCallback(
      new Date(receipt.submittedAt || lead.submittedAt),
    )
    const job: Job = {
      requestId: lead.requestId,
      crmId: String(receipt.crmId),
      dueAt: due.toISOString(),
      state: "queued",
      fingerprint,
    }
    await queueJob(job)
    return {
      receiptId: lead.requestId.slice(0, 8).toUpperCase(),
      callbackLabel: callbackLabel(due, new Date()),
    }
  } finally {
    await testLeadRedis(["DEL", lock])
  }
}

export async function dispatchTestLeadCalls(now = new Date()) {
  if (process.env.TESTLEADS_ENABLED !== "true")
    return { processed: 0, enabled: false }
  const ids = (await testLeadRedis([
    "ZRANGEBYSCORE",
    QUEUE,
    0,
    now.getTime(),
    "LIMIT",
    0,
    5,
  ])) as string[]
  let processed = 0
  await Promise.all(
    ids.map(async (requestId) => {
      if (!/^[\da-f-]{36}$/i.test(requestId)) return
      const lock = `${PREFIX}dispatch-lock:${requestId}`
      if ((await testLeadRedis(["SET", lock, "1", "NX", "EX", 180])) !== "OK")
        return
      try {
        const raw = await testLeadRedis(["GET", `${PREFIX}job:${requestId}`])
        if (!raw) {
          await testLeadRedis(["ZREM", QUEUE, requestId])
          return
        }
        const job = JSON.parse(raw) as Job
        if (job.state !== "queued") {
          await testLeadRedis(["ZREM", QUEUE, requestId])
          return
        }
        // Read the current opt-out state immediately before any external call.
        const record = await testLeadCrm("get", {
          crmId: job.crmId,
          requestId,
        })
        const age = now.getTime() - new Date(record.lead?.submittedAt).getTime()
        if (
          !record.consentActive ||
          record.lead?.requestId !== requestId ||
          !Number.isFinite(age) ||
          age < 0 ||
          age > 900000 ||
          normalizeSwissPhone(record.lead?.phone || "") !== record.lead?.phone
        ) {
          job.state = "blocked"
          await saveJob(job)
          await testLeadRedis(["ZREM", QUEUE, requestId])
          await testLeadCrm("status", {
            crmId: job.crmId,
            requestId,
            state: "blocked",
            timestamp: now.toISOString(),
          })
          return
        }
        job.state = "dispatching"
        await saveJob(job)
        try {
          const response = await fetch(
            "https://api.aircall.io/v1/outbound-calls/agents/01M4KGPD57W6VZMC7294AZA88M",
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${process.env.TESTLEADS_AIRCALL_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contact_phone: record.lead.phone,
                idempotency_key: `testlead-${requestId}`,
                context: miaContext(record.lead, job.crmId),
                expiration_seconds: 60,
              }),
              signal: AbortSignal.timeout(15000),
            },
          )
          const result = await response.json()
          if (response.status !== 202 || !result.id)
            throw new Error("Call not accepted")
          job.state = "accepted"
          job.callId = String(result.id)
        } catch {
          job.state = "uncertain"
        }
        // A timed-out call is never blindly repeated; its idempotency key remains unchanged.
        await saveJob(job)
        await testLeadRedis(["ZREM", QUEUE, requestId])
        processed++
        await testLeadCrm("status", {
          crmId: job.crmId,
          requestId,
          state: job.state,
          callId: job.callId || "",
          timestamp: now.toISOString(),
        })
      } finally {
        await testLeadRedis(["DEL", lock])
      }
    }),
  )
  return { processed }
}
