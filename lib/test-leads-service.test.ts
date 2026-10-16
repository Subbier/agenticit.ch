import assert from "node:assert/strict"
import test from "node:test"
import { prepareTestLead, TEST_LEAD_CONSENT_VERSION } from "./test-leads"
import {
  dispatchTestLeadCalls,
  submitTestLead,
  testLeadCrm,
} from "./test-leads-service"

const prefix = "agenticit:testleads:v1:"

test("the current Zoho standalone function receives a JSON request body", async () =>
  scenario(async () => {
    globalThis.fetch = (async (_url, init) => {
      assert.equal(
        new Headers(init?.headers).get("content-type"),
        "application/json",
      )
      assert.equal(JSON.parse(String(init?.body)).action, "get")
      return Response.json({
        code: "success",
        details: {
          output: JSON.stringify({
            ok: true,
            module: "TestLeads",
            org: "20114585987",
          }),
        },
      })
    }) as typeof fetch
    await testLeadCrm("get", {
      crmId: "991895000009999999",
      requestId: "cf8b9130-4f9e-4891-90c2-30a9a7f655a1",
    })
  }))
const input = {
  requestId: "cf8b9130-4f9e-4891-90c2-30a9a7f655a1",
  fullName: "Internal Test",
  gender: "male" as const,
  birthDate: "1990-01-01",
  postcode: "3000",
  city: "Bern",
  familyMembers: 0,
  insurer: "CSS" as const,
  phone: "0791234567",
  email: "internal@example.invalid",
  consent: true as const,
  consentVersion: TEST_LEAD_CONSENT_VERSION,
  companyWebsite: "",
}
const lead = prepareTestLead(
  { ...input, consentVersion: TEST_LEAD_CONSENT_VERSION },
  "2026-10-16T18:00:00.000Z",
)

async function scenario(
  run: (state: ReturnType<typeof backend>) => Promise<void>,
) {
  const originalFetch = globalThis.fetch
  const env = { ...process.env }
  const state = backend()
  Object.assign(process.env, {
    TESTLEADS_ENABLED: "true",
    CRON_SECRET: "test-placeholder",
    KV_REST_API_URL: "https://queue.example.invalid",
    KV_REST_API_TOKEN: "test-placeholder",
    TESTLEADS_CRM_GATEWAY_URL:
      "https://www.zohoapis.eu/crm/v7/functions/testleads_gateway/actions/execute",
    TESTLEADS_AIRCALL_API_KEY: "test-placeholder",
  })
  globalThis.fetch = state.fetch as typeof fetch
  try {
    await run(state)
  } finally {
    globalThis.fetch = originalFetch
    process.env = env
  }
}

function backend() {
  const values = new Map<string, string>()
  const queue = new Set<string>()
  const state = {
    values,
    queue,
    failQueue: false,
    consent: true,
    creates: 0,
    calls: 0,
    callContext: {} as Record<string, string>,
    ambiguousCall: false,
    submittedLead: lead,
    fetch: async (
      url: string | URL | Request,
      init?: RequestInit,
    ): Promise<Response> => {
      if (String(url).includes("queue.example.invalid")) {
        const command = JSON.parse(String(init?.body)) as (string | number)[]
        const [op, key, value] = command
        let result: unknown = null
        if (op === "GET") result = values.get(String(key)) ?? null
        if (op === "SET") {
          if (!command.includes("NX") || !values.has(String(key))) {
            values.set(String(key), String(value))
            result = "OK"
          }
        }
        if (op === "DEL") {
          values.delete(String(key))
          result = 1
        }
        if (op === "INCR") {
          result = Number(values.get(String(key)) || 0) + 1
          values.set(String(key), String(result))
        }
        if (op === "EXPIRE") result = 1
        if (op === "ZADD") {
          if (state.failQueue)
            return Response.json({ error: "queue write failed" })
          queue.add(String(command.at(-1)))
          result = 1
        }
        if (op === "ZREM") {
          queue.delete(String(value))
          result = 1
        }
        if (op === "ZRANGEBYSCORE")
          result = [...queue]
            .filter(
              (id) =>
                new Date(
                  JSON.parse(values.get(`${prefix}job:${id}`)!).dueAt,
                ).getTime() <= Number(command[3]),
            )
            .slice(0, Number(command[6]))
        if (op === "EVAL") {
          if (state.failQueue)
            return Response.json({ error: "queue write failed" })
          // The intake transaction must persist both the receipt and due entry together.
          const job = JSON.parse(String(command[5]))
          values.set(`${prefix}job:${job.requestId}`, JSON.stringify(job))
          queue.add(job.requestId)
          result = 1
        }
        return Response.json({ result })
      }
      if (String(url).startsWith("https://www.zohoapis.eu/")) {
        const payload = JSON.parse(String(init?.body))
        if (payload.action === "create") {
          state.creates++
          state.submittedLead = payload.lead
        }
        return Response.json({
          code: "success",
          details: {
            output: JSON.stringify({
              ok: true,
              module: "TestLeads",
              org: "20114585987",
              crmId: "991895000009999999",
              lead: state.submittedLead,
              consentActive: state.consent,
            }),
          },
        })
      }
      if (String(url).startsWith("https://api.aircall.io/")) {
        state.calls++
        state.callContext = JSON.parse(String(init?.body)).context
        if (state.ambiguousCall)
          throw new Error("Simulated timeout after provider received request")
        return Response.json({ id: "test-call-id" }, { status: 202 })
      }
      throw new Error("Unexpected destination")
    },
  }
  return state
}

test("intake never acknowledges a CRM record without a durable due entry, including retries", async () =>
  scenario(async (state) => {
    state.failQueue = true
    await assert.rejects(submitTestLead(lead, "test-ip"))
    await assert.rejects(submitTestLead(lead, "test-ip"))
    state.failQueue = false
    await submitTestLead(lead, "test-ip")
    assert.equal(state.queue.has(lead.requestId), true)
  }))

test("retries do not create another lead and a revoked opt-in prevents any call", async () =>
  scenario(async (state) => {
    await submitTestLead(lead, "test-ip")
    await submitTestLead(lead, "test-ip")
    assert.equal(state.creates, 1)
    state.consent = false
    await dispatchTestLeadCalls(new Date("2026-10-16T18:05:00Z"))
    assert.equal(state.calls, 0)
  }))

test("an ambiguous provider result is not dialled again by a later worker", async () =>
  scenario(async (state) => {
    await submitTestLead(lead, "test-ip")
    state.ambiguousCall = true
    await dispatchTestLeadCalls(new Date("2026-10-16T18:05:00Z"))
    await dispatchTestLeadCalls(new Date("2026-10-16T18:06:00Z"))
    assert.equal(state.calls, 1)
    assert.equal(
      JSON.parse(state.values.get(`${prefix}job:${lead.requestId}`)!).state,
      "uncertain",
    )
  }))

test("a saved lead can be called immediately and the fallback worker cannot call it twice", async () =>
  scenario(async (state) => {
    await submitTestLead(lead, "test-ip")
    await dispatchTestLeadCalls(new Date(lead.submittedAt))
    assert.equal(state.calls, 1)
    await dispatchTestLeadCalls(new Date("2026-10-16T18:01:00Z"))
    assert.equal(state.calls, 1)
  }))

test("the worker passes the gender read back from CRM to Mia", async () => {
  for (const [gender, salutation] of [
    ["female", "Frau"],
    ["male", "Herr"],
  ] as const)
    await scenario(async (state) => {
      await submitTestLead({ ...lead, gender }, "test-ip")
      assert.equal(state.submittedLead.gender, gender)
      await dispatchTestLeadCalls(new Date(lead.submittedAt))
      assert.equal(state.calls, 1)
      assert.equal(state.callContext.anrede, salutation)
    })
})
