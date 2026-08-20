const assert = require("node:assert/strict")
const { readFile } = require("node:fs/promises")
const path = require("node:path")
const test = require("node:test")

const {
  buildSecurityCheckWebhookPayload,
  validateSecurityCheckLead,
} = require("../lib/security-check-lead")
const vercelHandler = require("../api/security-check/lead")

const validLead = {
  source: "security-check",
  action: "consult",
  contact: {
    firstName: "Sabir",
    lastName: "R.",
    company: "AgenticIT GmbH",
    email: "test@example.com",
    phone: "+41 31 000 00 00",
  },
  assessment: {
    level: 3,
    implementation: 62,
    residualRisk: "Mittel",
    riskScore: 11,
    gaps: [
      {
        id: "mfa",
        title: "Zweite Bestätigung beim Login",
        term: "Multi-Faktor-Authentifizierung (MFA)",
        priority: "critical",
        requiredLevel: 1,
        status: "missing",
      },
    ],
    profile: Array.from({ length: 7 }, (_, index) => ({
      question: `Frage ${index + 1}`,
      answer: `Antwort ${index + 1}`,
    })),
  },
  page: "/security-check",
}

test("accepts the bounded Security-Check lead contract", () => {
  assert.equal(validateSecurityCheckLead(validLead), true)
  assert.equal(typeof vercelHandler, "function")
})

test("rejects unrecognised actions and oversized assessment arrays", () => {
  assert.equal(
    validateSecurityCheckLead({
      ...validLead,
      action: "send-email",
      assessment: { ...validLead.assessment, gaps: Array(13).fill(validLead.assessment.gaps[0]) },
    }),
    false,
  )
})

test("creates a human-review task only for consultation requests", () => {
  const consultation = buildSecurityCheckWebhookPayload(validLead)
  const download = buildSecurityCheckWebhookPayload({ ...validLead, action: "download" })

  assert.equal(consultation.humanReviewRequired, true)
  assert.equal(consultation.followUpTask, "5-Minuten-Rückruf Security-Check")
  assert.equal(download.followUpTask, undefined)
})

test("ships the approved CTA language and conversion endpoint", async () => {
  const html = await readFile(path.join(__dirname, "..", "index.html"), "utf8")

  assert.match(html, />Mehr Infos anfordern</)
  assert.match(html, /5-minütiges Telefongespräch/)
  assert.match(html, /kostenfrei und unverbindlich/)
  assert.match(html, /fetch\('\/api\/security-check\/lead'/)
  assert.doesNotMatch(html, /kostenlos/i)
  assert.doesNotMatch(html, /createTask/)
})
