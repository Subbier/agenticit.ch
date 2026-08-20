const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ACTIONS = new Set(["download", "consult"])
const RISK_LEVELS = new Set(["Niedrig", "Mittel", "Erhöht", "Hoch"])
const PRIORITIES = new Set(["critical", "high", "medium"])
const STATUSES = new Set(["partial", "missing"])

function isText(value, max) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max
}

function isIntegerBetween(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max
}

function validateSecurityCheckLead(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false
  if (data.source !== "security-check" || data.page !== "/security-check" || !ACTIONS.has(data.action)) return false

  const contact = data.contact
  if (!contact || typeof contact !== "object" || Array.isArray(contact)) return false
  if (!isText(contact.firstName, 80) || !isText(contact.lastName, 80)) return false
  if (!isText(contact.company, 160) || !isText(contact.phone, 80)) return false
  if (!isText(contact.email, 180) || !EMAIL_PATTERN.test(contact.email.trim())) return false

  const assessment = data.assessment
  if (!assessment || typeof assessment !== "object" || Array.isArray(assessment)) return false
  if (!isIntegerBetween(assessment.level, 1, 5)) return false
  if (!isIntegerBetween(assessment.implementation, 0, 100)) return false
  if (!isIntegerBetween(assessment.riskScore, 0, 30) || !RISK_LEVELS.has(assessment.residualRisk)) return false
  if (!Array.isArray(assessment.gaps) || assessment.gaps.length > 12) return false
  if (!Array.isArray(assessment.profile) || assessment.profile.length !== 7) return false

  const validGaps = assessment.gaps.every((gap) =>
    gap &&
    typeof gap === "object" &&
    isText(gap.id, 40) &&
    isText(gap.title, 160) &&
    isText(gap.term, 160) &&
    PRIORITIES.has(gap.priority) &&
    isIntegerBetween(gap.requiredLevel, 1, 5) &&
    STATUSES.has(gap.status),
  )
  if (!validGaps) return false

  return assessment.profile.every((entry) =>
    entry && typeof entry === "object" && isText(entry.question, 220) && isText(entry.answer, 160),
  )
}

function buildSecurityCheckWebhookPayload(data) {
  const isConsultation = data.action === "consult"

  return {
    source: data.source,
    name: `${data.contact.firstName.trim()} ${data.contact.lastName.trim()}`,
    email: data.contact.email.trim(),
    company: data.contact.company.trim(),
    phone: data.contact.phone.trim(),
    consent: true,
    message: isConsultation
      ? "Mehr Infos zum Security-Check angefordert. Menschliche Prüfung und 5-Minuten-Rückruf erforderlich."
      : "Persönlichen Security-Check-Bericht heruntergeladen.",
    crm: "zoho",
    tags: ["security-check", `security-level:${data.assessment.level}`, `action:${data.action}`],
    leadAction: data.action,
    humanReviewRequired: true,
    followUpTask: isConsultation ? "5-Minuten-Rückruf Security-Check" : undefined,
    securityAssessment: data.assessment,
    page: data.page,
    submittedAt: new Date().toISOString(),
  }
}

module.exports = { buildSecurityCheckWebhookPayload, validateSecurityCheckLead }
