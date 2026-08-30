import type { Metadata } from "next"

export const SITE_URL = "https://agenticit.ch"
export const SITE_NAME = "AgenticIT"
export const SITE_LOCALE = "de_CH"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icon.svg`

// Verifizierte Social-/Autoritätsprofile für sameAs (E-E-A-T-Signal).
// Sobald die offiziellen Profile bekannt sind (LinkedIn, Zefix, etc.) hier eintragen.
export const SOCIAL_PROFILES: readonly string[] = []

// Themen, die AgenticIT nachweislich beherrscht – ausgerichtet auf die
// Ziel-Keyword-Cluster (Basis für thematische Relevanz in Google & KI-Antworten).
export const ENTITY_TOPICS: readonly string[] = [
  "KI-Agenten",
  "Agentische KI",
  "Multi-Agenten-Systeme",
  "KI-Automatisierung",
  "Prozessautomatisierung",
  "Workflow-Automatisierung",
  "RevOps",
  "Revenue Operations",
  "KI im Vertrieb",
  "Lead-Generierung",
  "Marketing Automation",
  "KI-Beratung",
  "Digitale Transformation",
  "Kundendienst-Automatisierung",
  "Schweizer Datenhaltung",
]

export type FaqItem = {
  question: string
  answer: string
}

export type BreadcrumbItem = {
  name: string
  path: string
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

/**
 * Entfernt einen bereits im Seitentitel enthaltenen Marken-Zusatz
 * (" | AgenticIT" / " – AgenticIT" / " - AgenticIT").
 * Das Root-Layout hängt die Marke über `title.template` ohnehin an —
 * ohne diese Bereinigung stünde "AgenticIT" doppelt im Titel.
 */
function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[|–—-]\s*AgenticIT\s*$/i, "").trim()
}

export function createPageMetadata({
  title: rawTitle,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const title = stripBrandSuffix(rawTitle)

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Agentic IT GmbH",
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/icon.svg`,
    description:
      "Schweizer Agentur für KI-Agenten, agentische Automatisierung und RevOps. Wir automatisieren Vertrieb, Kundendienst und Prozesse – mit Datenhaltung in der Schweiz und messbarem ROI.",
    email: "info@agenticit.ch",
    telephone: "+41315394444",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Postfach",
      postalCode: "3072",
      addressLocality: "Ostermundigen",
      addressRegion: "Bern",
      addressCountry: "CH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+41315394444",
      email: "info@agenticit.ch",
      contactType: "sales",
      areaServed: "CH",
      availableLanguage: ["de", "de-CH"],
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
    sameAs: [...SOCIAL_PROFILES],
    knowsAbout: [...ENTITY_TOPICS],
  }
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Agentic IT GmbH",
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/icon.svg`,
    description:
      "KI-Agentur aus Bern (Ostermundigen): KI-Agenten, Prozessautomatisierung und RevOps für Schweizer KMU – Daten sicher in der Schweiz.",
    email: "info@agenticit.ch",
    telephone: "+41315394444",
    priceRange: "$$",
    currenciesAccepted: "CHF",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Postfach",
      postalCode: "3072",
      addressLocality: "Ostermundigen",
      addressRegion: "Bern",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.9564,
      longitude: 7.4906,
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    sameAs: [...SOCIAL_PROFILES],
    knowsAbout: [...ENTITY_TOPICS],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "de-CH",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function serviceJsonLd(input: {
  name: string
  description: string
  path: string
  provider?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: input.provider ?? "Agentic IT GmbH",
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
    serviceType: input.name,
  }
}

export function articleJsonLd(input: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: input.author ?? SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Agentic IT GmbH",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    inLanguage: "de-CH",
    mainEntityOfPage: absoluteUrl(input.path),
  }
}

export function webApplicationJsonLd(input: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
    provider: { "@id": `${SITE_URL}/#organization` },
  }
}

export const INDEXABLE_ROUTES = [
  "/",
  "/kontakt",
  "/potenzial",
  "/loesungen",
  "/loesungen/gtm-markteintritt",
  "/loesungen/revops-umsatzgenerierung",
  "/technologie",
  "/technologie/autonome-ki-agenten",
  "/technologie/multi-agenten-systeme",
  "/technologie/enterprise-integration",
  "/angebot",
  "/angebot/begeistern",
  "/angebot/umsetzen",
  "/angebot/erschaffen",
  "/angebot/erweitern",
  "/branchen",
  "/blog",
  "/sicherheit",
  "/karriere",
  "/excellence",
  "/case-studies",
  "/impressum",
  "/datenschutz",
] as const
