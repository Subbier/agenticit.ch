import type { Metadata } from "next"
import { PotenzialPage } from "@/components/site/potenzial-page"
import { breadcrumbJsonLd, createPageMetadata, webApplicationJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Potenzialrechner: Nachfrage in Ihrer Branche | AgenticIT",
  description:
    "Wählen Sie Ihre Branche und sehen Sie, wie viele Menschen in der Deutschschweiz monatlich danach suchen – und was eine Anfrage wert ist.",
  path: "/potenzial",
  keywords: [
    "Potenzialrechner",
    "Nachfrage Schweiz",
    "Suchvolumen Branche",
    "Leadgenerierung Schweiz",
    "Kundengewinnung",
    "Was kostet eine Kundenanfrage",
  ],
})

const jsonLd = [
  webApplicationJsonLd({
    name: "AgenticIT Potenzialrechner",
    description:
      "Kostenloser Rechner: monatliche Suchnachfrage und Richtwert pro Kundenanfrage je Schweizer Branche.",
    path: "/potenzial",
  }),
  breadcrumbJsonLd([
    { name: "Start", path: "/" },
    { name: "Potenzialrechner", path: "/potenzial" },
  ]),
]

export default function Page() {
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <PotenzialPage />
    </>
  )
}
