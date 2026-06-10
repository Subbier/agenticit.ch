import {
  type EdtechTierId,
  type ItTierId,
  type MarketingTierId,
  type PainPointId,
  edtechTiers,
  itTiers,
  marketingTiers,
} from "@/lib/services-benchmark-data"

export type PackageSelection = {
  teamSize: number
  painPoint: PainPointId
  it: { enabled: boolean; tier: ItTierId }
  marketing: { enabled: boolean; tier: MarketingTierId }
  edtech: { enabled: boolean; tier: EdtechTierId }
}

export function getDefaultSelection(painPoint: PainPointId = "all"): PackageSelection {
  const presets: Record<PainPointId, Omit<PackageSelection, "teamSize" | "painPoint">> = {
    it: {
      it: { enabled: true, tier: "premium" },
      marketing: { enabled: false, tier: "leadgen" },
      edtech: { enabled: false, tier: "vbv" },
    },
    marketing: {
      it: { enabled: false, tier: "basis" },
      marketing: { enabled: true, tier: "revops" },
      edtech: { enabled: false, tier: "vbv" },
    },
    compliance: {
      it: { enabled: false, tier: "basis" },
      marketing: { enabled: false, tier: "leadgen" },
      edtech: { enabled: true, tier: "academy" },
    },
    all: {
      it: { enabled: true, tier: "crm" },
      marketing: { enabled: true, tier: "nurturing" },
      edtech: { enabled: true, tier: "vbv" },
    },
  }

  return { teamSize: 8, painPoint, ...presets[painPoint] }
}

export function calculatePackageMrr(selection: PackageSelection) {
  const itTier = itTiers.find((t) => t.id === selection.it.tier)!
  const marketingTier = marketingTiers.find((t) => t.id === selection.marketing.tier)!
  const edtechTier = edtechTiers.find((t) => t.id === selection.edtech.tier)!

  const itMrr = selection.it.enabled ? itTier.pricePerUser * selection.teamSize : 0
  const marketingMrr = selection.marketing.enabled ? marketingTier.retainer : 0
  const edtechMrr = selection.edtech.enabled
    ? edtechTier.flat ?? (edtechTier.perUser ?? 0) * selection.teamSize
    : 0

  return {
    itMrr,
    marketingMrr,
    edtechMrr,
    totalMrr: itMrr + marketingMrr + edtechMrr,
    annualValue: (itMrr + marketingMrr + edtechMrr) * 12,
  }
}

export function generatePackageProposal(selection: PackageSelection) {
  const mrr = calculatePackageMrr(selection)
  const painLabels: Record<PainPointId, string> = {
    it: "veraltete IT-Infrastruktur und Security-Risiken",
    marketing: "schwache Neukundengewinnung und fehlende Marketing-Automatisierung",
    compliance: "fehlende Cicero/VBV-Compliance und Weiterbildungsübersicht",
    all: "eine ganzheitliche Digitalisierung von Workplace, Marketing und EdTech",
  }

  const lines: string[] = [
    `## Empfohlenes Paket für ${selection.teamSize} Berater`,
    "",
    `**Ausgangslage:** Ihr Büro kämpft mit ${painLabels[selection.painPoint]}.`,
    "",
    "### Zusammensetzung",
  ]

  if (selection.it.enabled) {
    const tier = itTiers.find((t) => t.id === selection.it.tier)!
    lines.push(
      `- **Workplace & IT:** ${tier.label} – **${formatChfShort(mrr.itMrr)}/Monat** (${selection.teamSize} × CHF ${tier.pricePerUser})`,
    )
  }
  if (selection.marketing.enabled) {
    const tier = marketingTiers.find((t) => t.id === selection.marketing.tier)!
    lines.push(`- **RevOps & Marketing:** ${tier.label} – **${formatChfShort(mrr.marketingMrr)}/Monat** Retainer`)
  }
  if (selection.edtech.enabled) {
    const tier = edtechTiers.find((t) => t.id === selection.edtech.tier)!
    lines.push(`- **EdTech & Compliance:** ${tier.label} – **${formatChfShort(mrr.edtechMrr)}/Monat**`)
  }

  lines.push(
    "",
    `### Investition`,
    `- **Monatliches Total (MRR):** **${formatChfShort(mrr.totalMrr)}**`,
    `- **Jährlicher Paketwert:** **${formatChfShort(mrr.annualValue)}**`,
    "",
    "### Warum AgenticIT",
    "AgenticIT kombiniert technologische Infrastruktur, Revenue Operations und compliance-konforme Lernplattformen – spezialisiert auf Schweizer Finanz- und Vorsorgeberater. Sie erhalten ein skalierbares Setup statt isolierter Einzellösungen.",
    "",
    "**Nächster Schritt:** Kostenloses Strategiegespräch – wir validieren die Annahmen mit Ihren realen Zahlen.",
  )

  return lines.join("\n")
}

function formatChfShort(amount: number) {
  return `CHF ${Math.round(amount).toLocaleString("de-CH")}.-`
}
