import { z } from "zod"
import { buildJourneyPlan } from "./journey"
import { buildAutomationPlan, calculateAutomationPotential } from "./automation"
import {
  buildMarketingSetupPlan,
  marketingSetupSchema,
} from "./marketing-setup"
import { buildInquiryPlan, inquirySchema } from "./inquiry-check"
import { buildCrmPlan, crmSchema } from "./crm-check"

const optionalText = (max = 500) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().max(max).optional(),
  )

const automationTaskSchema = z.object({
  id: z.string().max(50),
  weeklyCount: z.number().int().min(1).max(100000),
  minutes: z.number().positive().max(10080),
  automationPercent: z.number().min(0).max(100),
})
const automationBaseSchema = z.object({
  industryIds: z.array(z.string().max(50)).min(1).max(10),
  hourlyRate: z.number().min(0).max(10000).optional(),
})
const automationSchema = z
  .discriminatedUnion("version", [
    automationBaseSchema.extend({
      version: z.literal(1),
      tasks: z.array(automationTaskSchema).min(1).max(30),
    }),
    automationBaseSchema.extend({
      version: z.literal(2),
      tasks: z
        .array(
          automationTaskSchema.extend({
            controlMinutes: z.number().min(0).max(10080),
          }),
        )
        .min(1)
        .max(30),
    }),
  ])
  .refine(
    (value) => calculateAutomationPotential(value) !== null,
    "Bitte prüfen Sie Branchen, Aufgaben und Berechnung.",
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
      "automation-check",
      "marketing-setup-check",
      "anfragen-check",
      "crm-ablauf-check",
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
          "partnership",
        ]),
        channel: z.enum(["web", "phone", "mixed"]),
        system: z.enum(["manual", "crm", "connected"]),
      })
      .optional(),
    automation: automationSchema.optional(),
    marketingSetup: marketingSetupSchema.optional(),
    inquiryCheck: inquirySchema.optional(),
    crmCheck: crmSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.crmCheck && data.source !== "crm-ablauf-check")
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["crmCheck"],
        message: "Diese Antworten gehören zum CRM-Ablauf-Check.",
      })
    if (
      data.source === "crm-ablauf-check" &&
      (!data.crmCheck ||
        data.journey ||
        data.automation ||
        data.marketingSetup ||
        data.inquiryCheck)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["crmCheck"],
        message:
          "Bitte nur die vollständigen Antworten des CRM-Ablauf-Checks übermitteln.",
      })
    if (data.marketingSetup && data.source !== "marketing-setup-check")
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["marketingSetup"],
        message: "Diese Antworten gehören zum Marketing-Setup-Check.",
      })
    if (
      data.source === "marketing-setup-check" &&
      (!data.marketingSetup ||
        data.journey ||
        data.automation ||
        data.inquiryCheck)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["marketingSetup"],
        message:
          "Bitte nur die vollständigen Antworten des Marketing-Setup-Checks übermitteln.",
      })
    if (data.inquiryCheck && data.source !== "anfragen-check")
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["inquiryCheck"],
        message: "Diese Antworten gehören zum Anfragen-Check.",
      })
    if (
      data.source === "anfragen-check" &&
      (!data.inquiryCheck ||
        data.journey ||
        data.automation ||
        data.marketingSetup)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["inquiryCheck"],
        message:
          "Bitte nur die vollständigen Antworten des Anfragen-Checks übermitteln.",
      })
    if (data.automation && data.source !== "automation-check") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["automation"],
        message: "Die Berechnung gehört zum Automatisierungs-Check.",
      })
    }
    if (
      data.source !== "journey-check" &&
      data.source !== "automation-check" &&
      data.source !== "marketing-setup-check" &&
      data.source !== "anfragen-check" &&
      data.source !== "crm-ablauf-check"
    )
      return
    if (data.source === "journey-check" && !data.journey)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["journey"],
        message: "Die Check-Antworten fehlen.",
      })
    if (data.source === "automation-check" && !data.automation)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["automation"],
        message: "Die Berechnung fehlt.",
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
  const automationPlan =
    lead.source === "automation-check" && lead.automation
      ? buildAutomationPlan(lead.automation)
      : null
  const marketingPlan =
    lead.source === "marketing-setup-check" && lead.marketingSetup
      ? buildMarketingSetupPlan(lead.marketingSetup)
      : null
  const inquiryPlan =
    lead.source === "anfragen-check" && lead.inquiryCheck
      ? buildInquiryPlan(lead.inquiryCheck)
      : null
  const crmPlan =
    lead.source === "crm-ablauf-check" && lead.crmCheck
      ? buildCrmPlan(lead.crmCheck)
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
      : automationPlan
        ? {
            message: automationPlan,
            challenge: "admin",
            goal: "Wiederkehrende Aufgaben automatisieren",
            contactMethod: lead.contactMethod ?? "email",
            marketingConsent: false,
          }
        : marketingPlan
          ? {
              message: marketingPlan,
              challenge: "acquisition",
              goal: "Marketing-Grundlagen und Anfrageweg prüfen",
              contactMethod: lead.contactMethod ?? "email",
              marketingConsent: false,
            }
          : inquiryPlan
            ? {
                message: inquiryPlan,
                challenge: "conversion",
                goal: "Anfragebearbeitung und nächsten Schritt prüfen",
                contactMethod: lead.contactMethod ?? "email",
                marketingConsent: false,
              }
            : crmPlan
              ? {
                  message: crmPlan,
                  challenge: "admin",
                  goal: "CRM-Daten und Übergaben prüfen",
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
        : automationPlan
          ? [
              "quelle:automatisierungs-check",
              "herausforderung:admin",
              "pilot:workflow",
            ]
          : marketingPlan
            ? [
                "quelle:marketing-setup-check",
                "service:marketing",
                "herausforderung:acquisition",
              ]
            : inquiryPlan
              ? [
                  "quelle:anfragen-check",
                  "service:sales",
                  "herausforderung:conversion",
                ]
              : crmPlan
                ? [
                    "quelle:crm-ablauf-check",
                    "service:sales",
                    "herausforderung:admin",
                  ]
                : []),
    ].filter((tag): tag is string => Boolean(tag)),
    followUpTask: plan
      ? "Kundenreise-Check persönlich prüfen"
      : automationPlan
        ? "Automatisierungs-Check persönlich prüfen"
        : marketingPlan
          ? "Marketing-Setup-Check persönlich prüfen"
          : inquiryPlan
            ? "Anfragen-Check persönlich prüfen"
            : crmPlan
              ? "CRM-Ablauf-Check persönlich prüfen"
              : "Rückruf",
    submittedAt,
    userAgent,
  }
}
