import type { Metadata } from "next"
import { PotenzialPage } from "@/components/site/potenzial-page"
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webApplicationJsonLd,
} from "@/lib/seo"
import { planningFaqs } from "@/lib/potenzial-content"

export const metadata: Metadata = createPageMetadata({
  title: "Anfragenplanung: Vom Kundenziel zum Akquise-Plan | AgenticIT",
  description:
    "Mit Kundenziel und eigener Abschlussquote passende Anfragen und Bearbeitungsaufwand planen. Transparente Rechnung, vorsichtigere Annahme und speicherbarer Plan.",
  path: "/potenzial",
})
const jsonLd = [
  webApplicationJsonLd({
    name: "AgenticIT Anfragenplaner",
    description:
      "Planungsrechnung mit eigenen Angaben: benötigte Anfragen und optionaler Bearbeitungsaufwand. Keine Markt- oder Ergebnisprognose.",
    path: "/potenzial",
  }),
  breadcrumbJsonLd([
    { name: "Start", path: "/" },
    { name: "Checks & Vorlagen", path: "/werkzeuge" },
    { name: "Anfragenplanung", path: "/potenzial" },
  ]),
  faqPageJsonLd(
    planningFaqs.map((faq) => ({ question: faq.q, answer: faq.a })),
  ),
]
export default function Page() {
  return (
    <>
      {jsonLd.map((object, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(object) }}
        />
      ))}
      <PotenzialPage />
    </>
  )
}
