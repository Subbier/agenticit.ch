import { z } from "zod"

export const TEST_LEAD_SOURCE = "https://agenticit.ch/beste-variante"
export const TEST_LEAD_CONSENT_VERSION = "testleads-2026-10-16-v2"
export const TEST_LEAD_CONSENT =
  "Das ist ein Testlead und kein echter Versicherungslead."
export const TEST_LEAD_CALL_NOTICE =
  "Hier ruft Mia dich an. Das KI-Testgespräch wird zur Qualitätsprüfung aufgezeichnet."

export const healthInsurers = [
  "Agrisano",
  "AMB",
  "Aquilana",
  "Assura",
  "Atupri",
  "Avenir",
  "Birchmeier",
  "CONCORDIA",
  "CSS",
  "curaulta",
  "EGK",
  "Einsiedler Krankenkasse",
  "Galenos",
  "Glarner",
  "Helsana",
  "KPT",
  "Krankenkasse Luzerner Hinterland",
  "Mutuel",
  "ÖKK",
  "Philos",
  "rhenusana",
  "sana24",
  "Sanitas",
  "SLKK",
  "Sodalis",
  "Sumiswalder",
  "Steffisburg",
  "SWICA",
  "Vallée d’Entremont",
  "Visana",
  "Visperterminen",
  "vita surselva",
  "Vivao Sympany",
  "Wädenswil",
  "Andere Krankenkasse",
  "Weiss ich gerade nicht",
] as const

export function normalizeSwissPhone(value: string): string | null {
  const compact = value.trim().replace(/[\s().\/-]/g, "")
  const normalized = compact.startsWith("0041")
    ? `+41${compact.slice(4)}`
    : /^0[2-9]\d{8}$/.test(compact)
      ? `+41${compact.slice(1)}`
      : compact
  return /^\+41[2-9]\d{8}$/.test(normalized) ? normalized : null
}

function validBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T12:00:00Z`)
  return (
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value &&
    value >= "1900-01-01" &&
    value <= new Date().toISOString().slice(0, 10)
  )
}

export const testLeadDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Bitte deinen vollständigen Namen eingeben.")
    .max(120),
  birthDate: z
    .string()
    .refine(validBirthDate, "Bitte ein gültiges Geburtsdatum eingeben."),
  postcode: z
    .string()
    .trim()
    .regex(
      /^[1-9]\d{3}$/,
      "Bitte eine vierstellige Schweizer Postleitzahl eingeben.",
    ),
  city: z.string().trim().min(2, "Bitte deinen Ort eingeben.").max(100),
  familyMembers: z.coerce.number().int().min(0).max(15),
  insurer: z.enum(healthInsurers),
})

export const testLeadSchema = testLeadDetailsSchema
  .extend({
    requestId: z.string().uuid(),
    phone: z
      .string()
      .max(40)
      .refine(
        (v) => normalizeSwissPhone(v) !== null,
        "Bitte eine gültige Schweizer Telefonnummer eingeben.",
      ),
    email: z
      .string()
      .trim()
      .email("Bitte deine E-Mail-Adresse prüfen.")
      .max(180),
    consent: z.literal(true),
    consentVersion: z.literal(TEST_LEAD_CONSENT_VERSION),
    companyWebsite: z.string().max(200).optional().default(""),
  })
  .strict()

export type TestLeadInput = z.infer<typeof testLeadSchema>

export function prepareTestLead(data: TestLeadInput, submittedAt: string) {
  const parts = data.fullName.trim().split(/\s+/)
  return {
    requestId: data.requestId,
    fullName: data.fullName,
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
    birthDate: data.birthDate,
    postcode: data.postcode,
    city: data.city,
    familyMembers: data.familyMembers,
    insurer: data.insurer,
    phone: normalizeSwissPhone(data.phone)!,
    email: data.email,
    source: TEST_LEAD_SOURCE,
    submittedAt,
    consent: {
      accepted: true,
      version: TEST_LEAD_CONSENT_VERSION,
      text: TEST_LEAD_CONSENT,
      callNotice: TEST_LEAD_CALL_NOTICE,
      recordedAt: submittedAt,
    },
    marketingConsent: false,
  }
}

export type PreparedTestLead = ReturnType<typeof prepareTestLead>

export function miaContext(lead: PreparedTestLead, crmId: string) {
  return {
    vorname: lead.firstName,
    nachname: lead.lastName,
    geburtsdatum: lead.birthDate,
    plz: lead.postcode,
    ort: lead.city,
    telefon: lead.phone,
    email: lead.email,
    kasse: lead.insurer,
    familienmitglieder: String(lead.familyMembers),
    franchise: "noch nicht angegeben",
    unfall: "noch nicht angegeben",
    plattform: "agenticit.ch/beste-variante",
    thema: "Test der KI-gestützten Lead-Terminierung",
    testmodus: "ja",
    record_id: crmId,
    anfrage_id: lead.requestId,
    rueckruf_erlaubt: "ja",
    anfragezeit: lead.submittedAt,
  }
}
