import type { Metadata } from "next"

export const SITE_URL = "https://agenticit.ch"
export const SITE_NAME = "AgenticIT"
export const SITE_LOCALE = "de_CH"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icon.svg`

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

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)

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
    email: "hello@agenticit.ch",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
      addressLocality: "Ostermundigen",
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
    sameAs: [],
    knowsAbout: [
      "KI Agenten",
      "Conversational AI",
      "Lead Scoring",
      "Predicting Lead Scoring",
      "Omnichannel Marketing",
      "WhatsApp Business API",
      "Speed-to-Lead",
      "Lead Qualifizierung",
      "Smart Apps",
      "advok.app",
    ],
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
  "/revops",
  "/ai-agents",
  "/excellence",
  "/smart-apps",
  "/agentic-ai",
  "/ki-agenten-unternehmen",
  "/services",
  "/omnichannel",
  "/intelligence",
  "/blog",
  "/case-studies",
  "/ueber-uns",
  "/impressum",
  "/datenschutz",
] as const
