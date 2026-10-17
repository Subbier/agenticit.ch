import assert from "node:assert/strict"
import test from "node:test"
import { CONSENT_STORAGE_KEY } from "./consent"
import {
  createCheckMeasurement,
  trackCheckEvent,
  trackInquiryAcknowledgement,
} from "./check-measurement"

function browserFixture(statistics = true, hostname = "agenticit.ch") {
  const originalWindow = globalThis.window
  let raw: string | null = JSON.stringify({
    version: 1,
    statistics,
    marketing: false,
    decidedAt: "2026-10-17T00:00:00Z",
  })
  const dataLayer: unknown[] = []
  Object.assign(globalThis, {
    window: {
      dataLayer,
      location: { hostname, protocol: "https:" },
      localStorage: {
        getItem: (key: string) => (key === CONSENT_STORAGE_KEY ? raw : null),
      },
    },
  })
  return {
    commands: () =>
      dataLayer.map((item) => Array.from(item as ArrayLike<unknown>)),
    setConsent: (value: string | null) => {
      raw = value
    },
    restore: () => {
      if (originalWindow === undefined)
        Reflect.deleteProperty(globalThis, "window")
      else Object.assign(globalThis, { window: originalWindow })
    },
  }
}

test("check measurement is safe outside the browser", () => {
  assert.equal(trackCheckEvent("check_started", "automation"), false)
})

test("only statistics consent on the two production hosts permits events", () => {
  for (const hostname of [
    "agenticit.ch",
    "www.agenticit.ch",
    "localhost",
    "127.0.0.1",
    "v1-main.example.vercel.app",
    "agenticit.ch.example.org",
  ]) {
    for (const statistics of [false, true]) {
      const fixture = browserFixture(statistics, hostname)
      try {
        const permitted =
          statistics && ["agenticit.ch", "www.agenticit.ch"].includes(hostname)
        assert.equal(trackCheckEvent("check_started", "automation"), permitted)
        assert.equal(fixture.commands().length, permitted ? 1 : 0)
      } finally {
        fixture.restore()
      }
    }
  }
})

test("absent, malformed or marketing-only consent does not queue events", () => {
  const fixture = browserFixture()
  try {
    for (const raw of [
      null,
      "{broken",
      JSON.stringify({
        version: 1,
        statistics: "true",
        marketing: true,
        decidedAt: "2026-10-17",
      }),
      JSON.stringify({
        version: 1,
        statistics: false,
        marketing: true,
        decidedAt: "2026-10-17",
      }),
    ]) {
      fixture.setConsent(raw)
      assert.equal(trackCheckEvent("check_started", "customer_journey"), false)
    }
    assert.equal(fixture.commands().length, 0)
  } finally {
    fixture.restore()
  }
})

test("event payloads contain only a fixed event, check kind and clean page URL", () => {
  const fixture = browserFixture()
  try {
    for (const kind of [
      "customer_journey",
      "automation",
      "marketing_setup",
      "inquiry_flow",
      "crm_flow",
    ] as const) {
      assert.equal(trackCheckEvent("check_result_ready", kind), true)
    }
    assert.deepEqual(
      fixture.commands().map((command) => command[2]),
      [
        {
          send_to: "G-3NGDK2RM3B",
          check_kind: "customer_journey",
          page_location: "https://agenticit.ch/kundenreise-check",
          page_referrer: "",
        },
        {
          send_to: "G-3NGDK2RM3B",
          check_kind: "automation",
          page_location: "https://agenticit.ch/automatisierungs-check",
          page_referrer: "",
        },
        {
          send_to: "G-3NGDK2RM3B",
          check_kind: "marketing_setup",
          page_location: "https://agenticit.ch/marketing-setup-check",
          page_referrer: "",
        },
        {
          send_to: "G-3NGDK2RM3B",
          check_kind: "inquiry_flow",
          page_location: "https://agenticit.ch/anfragen-check",
          page_referrer: "",
        },
        {
          send_to: "G-3NGDK2RM3B",
          check_kind: "crm_flow",
          page_location: "https://agenticit.ch/crm-ablauf-check",
          page_referrer: "",
        },
      ],
    )
    assert.ok(
      !Array.isArray(window.dataLayer?.[0]),
      "gtag uses an arguments object",
    )
    assert.equal(
      trackCheckEvent("arbitrary_personal_value" as never, "automation"),
      false,
    )
    assert.equal(
      trackCheckEvent("check_started", "arbitrary_personal_value" as never),
      false,
    )
    assert.equal(fixture.commands().length, 5)
  } finally {
    fixture.restore()
  }
})

test("each stage is attempted once per check visit and denied stages are not replayed", () => {
  const fixture = browserFixture(false)
  try {
    const measurement = createCheckMeasurement("marketing_setup")
    measurement.record("check_started")
    fixture.setConsent(
      JSON.stringify({
        version: 1,
        statistics: true,
        marketing: false,
        decidedAt: "2026-10-17",
      }),
    )
    measurement.record("check_started")
    measurement.record("check_result_ready")
    measurement.record("check_result_ready")
    measurement.record("plan_download_clicked")
    measurement.record("plan_download_clicked")
    assert.deepEqual(
      fixture.commands().map((command) => command[1]),
      ["check_result_ready", "plan_download_clicked"],
    )
    fixture.setConsent(null)
    assert.equal(trackCheckEvent("check_started", "automation"), false)
  } finally {
    fixture.restore()
  }
})

test("inquiry measurement requires both HTTP and body acknowledgement and an empty honeypot", () => {
  const fixture = browserFixture()
  try {
    for (const [httpOk, body, honeypot] of [
      [false, { ok: true }, ""],
      [true, { ok: false }, ""],
      [true, null, ""],
      [true, { ok: "true" }, ""],
      [true, { ok: true }, "filled"],
    ] as const) {
      assert.equal(
        trackInquiryAcknowledgement("automation", httpOk, body, honeypot),
        false,
      )
    }
    assert.equal(fixture.commands().length, 0)
    assert.equal(
      trackInquiryAcknowledgement("automation", true, { ok: true }, ""),
      true,
    )
    assert.equal(fixture.commands()[0][1], "inquiry_forwarded")
    assert.ok(!JSON.stringify(fixture.commands()).includes("generate_lead"))
  } finally {
    fixture.restore()
  }
})

test("unavailable browser facilities cannot interrupt the check", () => {
  const fixture = browserFixture()
  try {
    Object.assign(window, {
      localStorage: {
        getItem: () => {
          throw new Error("blocked")
        },
      },
    })
    assert.equal(trackCheckEvent("check_started", "automation"), false)
  } finally {
    fixture.restore()
  }
})
