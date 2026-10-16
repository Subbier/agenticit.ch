import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/leads/route"

test("lead endpoint validates before forwarding and handles delivery failure honestly", async (suite) => {
  const originalFetch = globalThis.fetch
  const originalWebhook = process.env.LEADS_WEBHOOK_URL
  const valid = {
    source: "journey-check",
    name: "Internal Test",
    email: "route@example.invalid",
    company: "Test organisation",
    consent: true,
    journey: {
      version: 1,
      challenge: "admin",
      channel: "mixed",
      system: "crm",
    },
  }
  let calls = 0
  let forwarded: Record<string, unknown> = {}
  const request = (body: unknown, ip: string) =>
    new Request("https://example.invalid/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    })
  try {
    process.env.LEADS_WEBHOOK_URL = "https://webhook.example.invalid/intake"
    globalThis.fetch = async (_input, options) => {
      calls += 1
      forwarded = JSON.parse(String(options?.body))
      return new Response("", { status: 200 })
    }
    await suite.test("invalid consent does not leave the server", async () => {
      const response = await POST(
        request({ ...valid, consent: false }, "192.0.2.1"),
      )
      assert.equal(response.status, 400)
      assert.equal(calls, 0)
    })
    await suite.test("honeypot is not forwarded", async () => {
      const response = await POST(
        request({ ...valid, company_website: "filled" }, "192.0.2.2"),
      )
      assert.equal(response.status, 200)
      assert.equal(calls, 0)
    })
    await suite.test(
      "one valid request forwards its derived context once",
      async () => {
        const response = await POST(request(valid, "192.0.2.3"))
        assert.equal(response.status, 200)
        assert.equal(calls, 1)
        assert.ok((forwarded.tags as string[]).includes("pilot:workflow"))
        assert.equal(forwarded.marketingConsent, false)
        assert.equal(
          forwarded.followUpTask,
          "Kundenreise-Check persönlich prüfen",
        )
      },
    )
    await suite.test(
      "automation calculation is validated and forwarded once with human review",
      async () => {
        const response = await POST(
          request(
            {
              source: "automation-check",
              name: "Internal Test",
              email: "automation-route@example.invalid",
              company: "Test organisation",
              consent: true,
              automation: {
                version: 1,
                industryIds: ["versicherung"],
                tasks: [
                  {
                    id: "intake",
                    weeklyCount: 20,
                    minutes: 15,
                    automationPercent: 80,
                  },
                ],
                hourlyRate: 100,
              },
            },
            "192.0.2.7",
          ),
        )
        assert.equal(response.status, 200)
        assert.equal(calls, 2)
        assert.ok(
          (forwarded.tags as string[]).includes(
            "quelle:automatisierungs-check",
          ),
        )
        assert.equal(
          forwarded.followUpTask,
          "Automatisierungs-Check persönlich prüfen",
        )
        assert.ok(String(forwarded.message).includes("4 Stunden/Woche"))
        assert.equal(forwarded.marketingConsent, false)
      },
    )
    await suite.test(
      "version 2 forwards the control-adjusted plan once and rejects missing controls",
      async () => {
        const lead = {
          source: "automation-check",
          name: "Internal Test",
          email: "control-route@example.invalid",
          company: "Test organisation",
          consent: true,
          automation: {
            version: 2,
            industryIds: ["versicherung"],
            tasks: [
              {
                id: "intake",
                weeklyCount: 20,
                minutes: 15,
                automationPercent: 80,
                controlMinutes: 2,
              },
              {
                id: "meeting",
                weeklyCount: 10,
                minutes: 30,
                automationPercent: 40,
                controlMinutes: 5,
              },
            ],
            hourlyRate: 100,
          },
          monthlyTimeValue: 999999,
        }
        const response = await POST(request(lead, "192.0.2.8"))
        assert.equal(response.status, 200)
        assert.equal(calls, 3)
        assert.ok(String(forwarded.message).includes("CHF 1'950"))
        assert.ok(
          String(forwarded.message).includes(
            "Zusätzliche Kontrolle: 1.5 Std./Woche",
          ),
        )
        assert.equal(forwarded.marketingConsent, false)
        const invalid = {
          ...lead,
          automation: {
            ...lead.automation,
            tasks: [
              {
                id: "intake",
                weeklyCount: 20,
                minutes: 15,
                automationPercent: 80,
              },
            ],
          },
        }
        const rejected = await POST(request(invalid, "192.0.2.9"))
        assert.equal(rejected.status, 400)
        assert.equal(calls, 3)
      },
    )
    await suite.test(
      "marketing setup forwards only a complete derived plan for personal review",
      async () => {
        const lead = {
          ...valid,
          source: "marketing-setup-check",
          journey: undefined,
          marketingSetup: {
            version: 1,
            answers: {
              offer: "open",
              website: "ready",
              accounts: "not-planned",
              measurement: "unknown",
              handoff: "partial",
            },
          },
          message: "forged plan",
        }
        const before = calls
        const response = await POST(request(lead, "192.0.2.10"))
        assert.equal(response.status, 200)
        assert.equal(calls, before + 1)
        assert.ok(
          String(forwarded.message).includes(
            "Zielgruppe & Angebot: Noch offen",
          ),
        )
        assert.ok(!String(forwarded.message).includes("forged plan"))
        assert.equal(forwarded.marketingConsent, false)
        assert.equal(
          forwarded.followUpTask,
          "Marketing-Setup-Check persönlich prüfen",
        )
        assert.ok((forwarded.tags as string[]).includes("service:marketing"))
        for (const changed of [
          { marketingSetup: undefined },
          { consent: false },
        ]) {
          assert.equal(
            (await POST(request({ ...lead, ...changed }, "192.0.2.11"))).status,
            400,
          )
          assert.equal(calls, before + 1)
        }
      },
    )
    await suite.test(
      "inquiry check forwards one derived plan and rejects mixed or incomplete context",
      async () => {
        const lead = {
          ...valid,
          source: "anfragen-check",
          journey: undefined,
          inquiryCheck: {
            version: 1,
            answers: {
              intake: "unknown",
              owner: "open",
              response: "partial",
              followup: "ready",
              outcome: "unknown",
            },
          },
          message: "forged plan",
          goal: "forged goal",
        }
        const before = calls
        const response = await POST(request(lead, "192.0.2.20"))
        assert.equal(response.status, 200)
        assert.equal(calls, before + 1)
        assert.ok(
          String(forwarded.message).includes(
            "AGENTICIT · IHR PLAN FÜR DIE ANFRAGEBEARBEITUNG",
          ),
        )
        assert.ok(!String(forwarded.message).includes("forged plan"))
        assert.notEqual(forwarded.goal, "forged goal")
        assert.equal(forwarded.marketingConsent, false)
        assert.equal(forwarded.followUpTask, "Anfragen-Check persönlich prüfen")
        assert.ok((forwarded.tags as string[]).includes("service:sales"))
        for (const [index, change] of [
          { inquiryCheck: undefined },
          { inquiryCheck: { version: 1, answers: {} } },
          { consent: false },
          { company: "" },
          { source: "journey-check" },
          { journey: valid.journey },
        ].entries()) {
          assert.equal(
            (
              await POST(
                request({ ...lead, ...change }, `192.0.2.${21 + index}`),
              )
            ).status,
            400,
          )
          assert.equal(calls, before + 1)
        }
      },
    )
    await suite.test(
      "failed forwarding is not reported as success",
      async () => {
        globalThis.fetch = async () => new Response("", { status: 503 })
        const response = await POST(request(valid, "192.0.2.4"))
        assert.equal(response.status, 502)
        assert.equal((await response.json()).ok, false)
      },
    )
    await suite.test("network failure is not reported as success", async () => {
      globalThis.fetch = async () => {
        throw new Error("Simulated offline transport")
      }
      const response = await POST(request(valid, "192.0.2.5"))
      assert.equal(response.status, 502)
    })
    await suite.test(
      "unconfigured forwarding gives a useful contact alternative",
      async () => {
        delete process.env.LEADS_WEBHOOK_URL
        const response = await POST(request(valid, "192.0.2.6"))
        assert.equal(response.status, 500)
        assert.ok((await response.json()).message.includes("info@agenticit.ch"))
      },
    )
  } finally {
    globalThis.fetch = originalFetch
    if (originalWebhook === undefined) delete process.env.LEADS_WEBHOOK_URL
    else process.env.LEADS_WEBHOOK_URL = originalWebhook
  }
})
