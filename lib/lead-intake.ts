import { z } from "zod"
import { websiteBriefSchema, websiteBriefSummary } from "./webdesign-brief"
import {
  potentialInputSchema,
  potentialConfigs,
  reportSummary,
} from "./potential-report"
import { contactSummary } from "./contact-inquiry"
import {
  CALLBACK_GOALS,
  callbackSourceForPath,
  callbackSummary,
  isCallbackPhoneNumber,
} from "./callback-inquiry"
import { buildJourneyPlan } from "./journey"
import { buildAutomationPlan, calculateAutomationPotential } from "./automation"
import {
  buildMarketingSetupPlan,
  marketingSetupSchema,
} from "./marketing-setup"
import { buildInquiryPlan, inquirySchema } from "./inquiry-check"
import { buildCrmPlan, crmSchema } from "./crm-check"
import {
  acquisitionPlanSchema,
  buildAcquisitionPlan,
  planningIndustryLabels,
} from "./acquisition-planner"

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
      "industry-page",
      "website-callback",
      "contact-page",
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
    callback: z
      .object({
        version: z.literal(1),
        path: z
          .string()
          .max(240)
          .refine((path) => callbackSourceForPath(path) !== null),
        goal: z.enum(CALLBACK_GOALS).optional(),
      })
      .optional(),
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
    acquisitionPlan: acquisitionPlanSchema.optional(),
    potentialReport: potentialInputSchema.optional(),
    websiteBrief: websiteBriefSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.websiteBrief) {
      if (
        data.source !== "journey-check" ||
        data.potentialReport ||
        data.journey ||
        data.callback ||
        data.automation ||
        data.marketingSetup ||
        data.inquiryCheck ||
        data.crmCheck ||
        data.acquisitionPlan ||
        data.contactMethod === "phone"
      )
        ctx.addIssue({
          code: "custom",
          path: ["websiteBrief"],
          message: "Bitte nur die Angaben Ihres Website-Konzepts übermitteln.",
        })
      if (!data.company || data.company.length < 2)
        ctx.addIssue({
          code: "custom",
          path: ["company"],
          message: "Bitte geben Sie Ihr Unternehmen an.",
        })
      return
    }
    if (data.potentialReport) {
      if (
        data.source !== potentialConfigs[data.potentialReport.kind].source ||
        data.callback ||
        data.journey ||
        data.automation ||
        data.marketingSetup ||
        data.inquiryCheck ||
        data.crmCheck ||
        data.acquisitionPlan ||
        data.contactMethod === "phone"
      )
        ctx.addIssue({
          code: "custom",
          path: ["potentialReport"],
          message:
            "Bitte nur die Angaben dieses Potenzialrechners übermitteln.",
        })
      if (!data.company || data.company.length < 2)
        ctx.addIssue({
          code: "custom",
          path: ["company"],
          message: "Bitte geben Sie Ihr Unternehmen an.",
        })
      return
    }
    if (data.source === "contact-page") {
      if (!data.message || data.message.length < 5)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["message"],
          message:
            "Bitte beschreiben Sie Ihr Anliegen in mindestens 5 Zeichen.",
        })
      if (data.phone && !isCallbackPhoneNumber(data.phone))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Bitte prüfen Sie Ihre Telefonnummer mit Vorwahl.",
        })
      if (
        data.contactMethod === "phone" ||
        data.callback ||
        data.journey ||
        data.automation ||
        data.marketingSetup ||
        data.inquiryCheck ||
        data.crmCheck ||
        data.acquisitionPlan ||
        data.goal !== undefined ||
        data.challenge !== undefined ||
        data.industry !== undefined ||
        data.leadVolume !== undefined ||
        data.leadPrice !== undefined
      )
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["source"],
          message: "Bitte nur die Angaben Ihrer Kontaktanfrage übermitteln.",
        })
    }
    if (data.contactMethod === "phone" && !isCallbackPhoneNumber(data.phone))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Für einen Rückruf benötigen wir Ihre Telefonnummer.",
      })
    if (
      data.callback &&
      (callbackSourceForPath(data.callback.path) !== data.source ||
        data.contactMethod !== "phone" ||
        data.journey ||
        data.automation ||
        data.marketingSetup ||
        data.inquiryCheck ||
        data.crmCheck ||
        data.acquisitionPlan)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["callback"],
        message: "Bitte nur die Angaben dieser Rückrufanfrage übermitteln.",
      })
    if (
      (data.source === "industry-page" || data.source === "website-callback") &&
      !data.callback
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["callback"],
        message: "Der Seitenkontext der Rückrufanfrage fehlt.",
      })
    if (
      data.acquisitionPlan &&
      (data.source !== "potenzialrechner" ||
        data.journey ||
        data.automation ||
        data.marketingSetup ||
        data.inquiryCheck ||
        data.crmCheck)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["acquisitionPlan"],
        message: "Bitte nur die Angaben Ihrer Anfragenplanung übermitteln.",
      })
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
      data.source !== "crm-ablauf-check" &&
      !data.acquisitionPlan
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
  const acquisitionPlan =
    lead.source === "potenzialrechner" && lead.acquisitionPlan
      ? buildAcquisitionPlan(lead.acquisitionPlan)
      : null
  const planningIndustry = lead.acquisitionPlan
    ? planningIndustryLabels(lead.acquisitionPlan.industryIds).join(", ")
    : ""
  return {
    ...lead,
    ...(lead.source === "contact-page"
      ? {
          message: contactSummary(lead.message!),
          pagePath: "/kontakt",
          goal: "Kontaktanfrage besprechen",
          contactMethod: "email",
          marketingConsent: false,
        }
      : {}),
    ...(lead.callback
      ? {
          message: callbackSummary(lead.callback),
          goal: lead.callback.goal || "Anliegen persönlich besprechen",
          contactMethod: "phone",
          marketingConsent: false,
        }
      : {}),
    ...(acquisitionPlan
      ? {
          message: acquisitionPlan,
          industry: planningIndustry || undefined,
          leadPrice: undefined,
          challenge: "acquisition",
          goal: "Anfrageziel und Bearbeitung planen",
          contactMethod: lead.contactMethod ?? "email",
          marketingConsent: false,
        }
      : {}),
    ...(plan
      ? {
          message: plan.download,
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
    ...(lead.websiteBrief
      ? {
          message: websiteBriefSummary(lead.websiteBrief),
          goal: "Persönliches Website-Konzept",
          challenge: "webdesign",
          pagePath: "/loesungen/webdesign",
          contactMethod: "email" as const,
          marketingConsent: false,
        }
      : {}),
    ...(lead.potentialReport
      ? {
          message: reportSummary(lead.potentialReport),
          challenge: lead.potentialReport.kind,
          goal: `${potentialConfigs[lead.potentialReport.kind].label}: Potenzial-PDF`,
          pagePath: potentialConfigs[lead.potentialReport.kind].path,
          contactMethod: "email" as const,
          marketingConsent: false,
        }
      : {}),
    tags: [
      ...(lead.websiteBrief
        ? ["quelle:webdesign", "service:webdesign", "download:website-konzept"]
        : []),
      ...(lead.potentialReport
        ? [
            `quelle:${lead.source}`,
            `potenzial:${lead.potentialReport.kind}`,
            "download:potenzial-pdf",
          ]
        : []),
      ...(lead.source === "contact-page"
        ? ["quelle:kontakt", "kontakt:nachricht"]
        : []),
      ...(lead.callback ? [`quelle:${lead.source}`, "kontakt:rueckruf"] : []),
      (acquisitionPlan ? planningIndustry : lead.industry)
        ? `branche:${acquisitionPlan ? planningIndustry : lead.industry}`
        : null,
      !acquisitionPlan && typeof lead.leadPrice === "number"
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
                : acquisitionPlan
                  ? [
                      "quelle:anfragenplanung",
                      "service:marketing",
                      "herausforderung:acquisition",
                    ]
                  : []),
    ].filter((tag): tag is string => Boolean(tag)),
    followUpTask: lead.websiteBrief
      ? "Website-Konzept-Anfrage persönlich prüfen"
      : lead.potentialReport
        ? "Potenzial-PDF-Anfrage persönlich prüfen"
        : lead.source === "contact-page"
          ? "Kontaktanfrage persönlich prüfen"
          : lead.callback
            ? "Website-Rückruf persönlich prüfen"
            : plan
              ? "Kundenreise-Check persönlich prüfen"
              : automationPlan
                ? "Automatisierungs-Check persönlich prüfen"
                : marketingPlan
                  ? "Marketing-Setup-Check persönlich prüfen"
                  : inquiryPlan
                    ? "Anfragen-Check persönlich prüfen"
                    : crmPlan
                      ? "CRM-Ablauf-Check persönlich prüfen"
                      : acquisitionPlan
                        ? "Anfragenplanung persönlich prüfen"
                        : "Rückruf",
    submittedAt,
    userAgent,
  }
}
