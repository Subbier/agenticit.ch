import type { Metadata } from "next"
import { company } from "./company"

export const SITE_URL = "https://agenticit.ch"
export const SITE_NAME = "AgenticIT"
export const SITE_LOCALE = "de_CH"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`

// Only pages that identify this exact company, not association homepages.
export const SOCIAL_PROFILES: readonly string[] = [company.registerUrl]

// Topics described by the public services; not certifications or ranking claims.
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
  image?: string
  imageAlt?: string
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
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const title = stripBrandSuffix(rawTitle)
  const imageUrl = absoluteUrl(image)

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
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
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
    name: company.legalName,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(company.logo),
    image: absoluteUrl(company.logo),
    description: company.description,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      ...company.address,
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "UID",
      value: company.uid,
      url: company.uidUrl,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      email: company.email,
      contactType: "sales",
      areaServed: "CH",
      availableLanguage: ["de", "de-CH"],
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
    sameAs: [...SOCIAL_PROFILES],
    memberOf: [
      {
        "@type": "Organization",
        name: company.swico.name,
        url: company.swico.url,
      },
    ],
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
      name: input.provider ?? company.legalName,
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
      name: company.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(company.logo),
      },
    },
    inLanguage: "de-CH",
    mainEntityOfPage: absoluteUrl(input.path),
  }
}

export function toolPageJsonLd(input: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "de-CH",
    isAccessibleForFree: true,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export const INDEXABLE_ROUTES = [
  "/",
  "/firmenvideo",
  "/kundenreise-check",
  "/automatisierungs-check",
  "/marketing-setup-check",
  "/anfragen-check",
  "/crm-ablauf-check",
  "/werkzeuge",
  "/pakete",
  "/zusammenarbeit",
  "/kontakt",
  "/potenzial",
  "/loesungen",
  "/loesungen/ki-entwicklung",
  "/loesungen/webdesign",
  "/loesungen/prozessautomatisierung",
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
