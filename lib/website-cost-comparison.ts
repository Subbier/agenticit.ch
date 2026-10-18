export const websiteCostFields = [
  { key: "setup", label: "Einrichtung" },
  { key: "monthly", label: "Pro Monat" },
  { key: "annually", label: "Pro Jahr" },
  { key: "extras", label: "Zusatzarbeiten" },
] as const

export type WebsiteCostKey = (typeof websiteCostFields)[number]["key"]
export type WebsiteCostInputs = Record<WebsiteCostKey, string>
export type WebsiteCostPeriod = 12 | 24 | 36
export type ParsedCost =
  | { kind: "missing" }
  | { kind: "invalid" }
  | { kind: "valid"; cents: number }

export function emptyWebsiteCostInputs(): WebsiteCostInputs {
  return { setup: "", monthly: "", annually: "", extras: "" }
}

export function parseWebsiteCost(value: string): ParsedCost {
  const text = value
    .trim()
    .replace(/^CHF\s*/i, "")
    .replaceAll("’", "'")
    .replace(/[\u00a0\u202f]/g, " ")
  if (!value.trim()) return { kind: "missing" }
  const match = text.match(
    /^((?:\d+|\d{1,3}(?:'\d{3})+|\d{1,3}(?: \d{3})+))(?:[.,](\d{1,2}))?$/,
  )
  if (!match) return { kind: "invalid" }
  const francs = Number(match[1].replace(/[' ]/g, ""))
  const cents = francs * 100 + Number((match[2] ?? "").padEnd(2, "0"))
  if (!Number.isSafeInteger(cents) || cents < 0 || cents > 100_000_000)
    return { kind: "invalid" }
  return { kind: "valid", cents }
}

export function calculateWebsiteOffer(
  inputs: WebsiteCostInputs,
  months: WebsiteCostPeriod,
) {
  if (![12, 24, 36].includes(months))
    throw new RangeError("Unsupported comparison period")
  const parsed = Object.fromEntries(
    websiteCostFields.map(({ key }) => [key, parseWebsiteCost(inputs[key])]),
  ) as Record<WebsiteCostKey, ParsedCost>
  const missing = websiteCostFields
    .filter(({ key }) => parsed[key].kind === "missing")
    .map(({ key }) => key)
  const invalid = websiteCostFields
    .filter(({ key }) => parsed[key].kind === "invalid")
    .map(({ key }) => key)
  const complete = !missing.length && !invalid.length
  const amount = (key: WebsiteCostKey) => {
    const value = parsed[key]
    return value.kind === "valid" ? value.cents : 0
  }
  const totalCents = complete
    ? amount("setup") +
      months * amount("monthly") +
      (months / 12) * amount("annually") +
      amount("extras")
    : null
  return { parsed, missing, invalid, complete, totalCents }
}

export function compareWebsiteOffers(
  a: WebsiteCostInputs,
  b: WebsiteCostInputs,
  months: WebsiteCostPeriod,
  comparable: boolean,
) {
  const offerA = calculateWebsiteOffer(a, months)
  const offerB = calculateWebsiteOffer(b, months)
  const ready =
    comparable && offerA.totalCents !== null && offerB.totalCents !== null
  const differenceCents = ready
    ? Math.abs(offerA.totalCents! - offerB.totalCents!)
    : null
  const lowerCost =
    !ready || differenceCents === 0
      ? null
      : offerA.totalCents! < offerB.totalCents!
        ? ("a" as const)
        : ("b" as const)
  return { offerA, offerB, months, comparable, differenceCents, lowerCost }
}

const currencyFormatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
})

export function formatWebsiteCost(cents: number) {
  return currencyFormatter.format(cents / 100)
}

export function createWebsiteComparisonText(
  a: WebsiteCostInputs,
  b: WebsiteCostInputs,
  months: WebsiteCostPeriod,
  comparable: boolean,
): string | null {
  const result = compareWebsiteOffers(a, b, months, comparable)
  if (!result.offerA.complete || !result.offerB.complete) return null
  const details = (["a", "b"] as const).map((key) => {
    const offer = key === "a" ? result.offerA : result.offerB
    return [
      `OFFERTE ${key.toUpperCase()}`,
      ...websiteCostFields.map(({ key: field, label }) => {
        const value = offer.parsed[field]
        return `${label}: ${value.kind === "valid" ? formatWebsiteCost(value.cents) : "offen"}`
      }),
      `Gesamtkosten: ${formatWebsiteCost(offer.totalCents!)}`,
    ].join("\n")
  })
  return [
    "AGENTICIT | WEBSITE-OFFERTENVERGLEICH",
    `Zeitraum: ${months} Monate`,
    "Eigene Eingaben. Keine AgenticIT-Offerte und keine Anbieterbewertung.",
    "Formel: Einrichtung + Monate x monatlich + Jahre x jährlich + Zusatzarbeiten.",
    "Monatliche und jährliche Positionen dürfen keine Leistungen doppelt enthalten.",
    "",
    ...details.flatMap((detail) => [detail, ""]),
    comparable
      ? "Leistungsumfang und MWST-Basis: vom Nutzer als abgeglichen angegeben."
      : "Leistungsumfang und MWST-Basis: noch offen; keine Vergleichsaussage.",
    result.differenceCents === null
      ? "Kostenunterschied: noch nicht eingeordnet."
      : result.differenceCents === 0
        ? "Die berechneten Gesamtkosten sind gleich."
        : `Offerte ${result.lowerCost!.toUpperCase()} liegt rechnerisch ${formatWebsiteCost(result.differenceCents)} tiefer.`,
    "Kosten allein belegen weder Qualität noch Eignung. Eigenaufwand und nicht enthaltene Leistungen separat prüfen.",
    "",
    "Weitere Fragen zum Umfang: https://agenticit.ch/blog/webdesign-kosten-schweiz",
    "Ihren Auftritt einordnen: https://agenticit.ch/marketing-setup-check",
    "",
  ].join("\n")
}
