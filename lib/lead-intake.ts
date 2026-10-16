import { z } from "zod"
import { buildJourneyPlan } from "./journey"

const optionalText = (max = 500) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().max(max).optional(),
  )

export const leadSchema = z
  .object({
    source: z.enum([
      "home",
      "ai-agents",
      "revops",
      "excellence",
      "omnichannel",
      "intelligence",
      "smart-apps",
      "case-studies",
      "blog",
      "potenzialrechner",
      "gtm-checkliste",
      "journey-check",
    ]),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(180),
    consent: z.literal(true),
    company: optionalText(160),
    phone: optionalText(80),
    message: optionalText(1200),
    leadVolume: optionalText(80),
    challenge: optionalText(160),
    industry: optionalText(120),
    leadPrice: z.preprocess(
      (value) => (value === "" || value === null ? undefined : value),
      z.coerce.number().int().min(0).max(100000).optional(),
    ),
    goal: optionalText(160),
    company_website: optionalText(200),
    contactMethod: z.enum(["email", "phone"]).optional(),
    journey: z
      .object({
        version: z.literal(1),
        challenge: z.enum([
          "acquisition",
          "conversion",
          "admin",
          "onboarding",
          "phone",
          "retention",
        ]),
        channel: z.enum(["web", "phone", "mixed"]),
        system: z.enum(["manual", "crm", "connected"]),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.source !== "journey-check") return
    if (!data.journey)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["journey"],
        message: "Die Check-Antworten fehlen.",
      })
    if (!data.company || data.company.length < 2)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Bitte geben Sie Ihr Unternehmen an.",
      })
    if (
      data.contactMethod === "phone" &&
      (!data.phone || data.phone.trim().length < 7)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Für einen Rückruf benötigen wir Ihre Telefonnummer.",
      })
  })

export function prepareLeadPayload(
  data: z.infer<typeof leadSchema>,
  submittedAt: string,
  userAgent?: string,
) {
  const { company_website: _honeypot, ...lead } = data
  const plan =
    lead.source === "journey-check" && lead.journey
      ? buildJourneyPlan(lead.journey)
      : null
  return {
    ...lead,
    ...(plan
      ? {
          message: `${plan.title}\n${plan.steps.join("\n")}\nMessung: ${plan.measure}`,
          challenge: lead.journey!.challenge,
          goal: plan.focus,
          contactMethod: lead.contactMethod ?? "email",
          marketingConsent: false,
        }
      : {}),
    crm: "zoho",
    tags: [
      lead.industry ? `branche:${lead.industry}` : null,
      typeof lead.leadPrice === "number"
        ? `lead_preis:${lead.leadPrice}`
        : null,
      ...(plan
        ? [
            "quelle:kundenreise-check",
            `herausforderung:${lead.journey!.challenge}`,
            `pilot:${plan.packageId}`,
          ]
        : []),
    ].filter((tag): tag is string => Boolean(tag)),
    followUpTask: plan ? "Kundenreise-Check persönlich prüfen" : "Rückruf",
    submittedAt,
    userAgent,
  }
}
