import { PotentialPage } from "@/components/journey/potential-page"
import { potentialKinds, type PotentialKind } from "@/lib/potential-report"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Ihr persönliches Potenzial: Mehr Wert für Ihr Unternehmen",
  description:
    "Mehr Umsatz oder mehr freie Zeit? Berechnen Sie Ihr persönliches Szenario in drei Schritten. Ihr Potenzial-PDF erhalten Sie nach Eingabe Ihrer Kontaktdaten.",
  path: "/kundenreise-check",
})

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ thema?: string }>
}) {
  const { thema } = await searchParams
  const kind = potentialKinds.includes(thema as PotentialKind)
    ? (thema as PotentialKind)
    : "conversion"
  return (
    <PotentialPage
      kind={kind}
      chooseKind={!potentialKinds.includes(thema as PotentialKind)}
    />
  )
}
