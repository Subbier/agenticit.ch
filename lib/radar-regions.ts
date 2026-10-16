export type RegionId =
  | "mittelland"
  | "nordwestschweiz"
  | "zuerich"
  | "nordostschweiz"
  | "innerschweiz"

// Estimated population shares of German-speaking Switzerland, July 2026.
export const REGIONS: {
  id: RegionId
  label: string
  share: number
  cities: string
}[] = [
  {
    id: "mittelland",
    label: "Mittelland",
    share: 0.23,
    cities: "Bern · Biel · Solothurn · Thun",
  },
  {
    id: "nordwestschweiz",
    label: "Nordwestschweiz",
    share: 0.2,
    cities: "Basel · Aarau · Baden",
  },
  {
    id: "zuerich",
    label: "Zürich-Region",
    share: 0.26,
    cities: "Zürich · Winterthur",
  },
  {
    id: "nordostschweiz",
    label: "Nordostschweiz",
    share: 0.17,
    cities: "St. Gallen · Chur · Frauenfeld",
  },
  {
    id: "innerschweiz",
    label: "Innerschweiz",
    share: 0.14,
    cities: "Luzern · Zug · Schwyz",
  },
]

export function toggleRegionSelection(
  selected: RegionId[],
  regionId: RegionId,
): RegionId[] {
  return selected.includes(regionId)
    ? selected.filter((id) => id !== regionId)
    : [...selected, regionId]
}

export function getSelectedRegions(selected: RegionId[]) {
  return REGIONS.filter((region) => selected.includes(region.id))
}

export function estimateRegionalVolume(
  totalVolume: number,
  selected: RegionId[],
) {
  const share = getSelectedRegions(selected).reduce(
    (sum, region) => sum + region.share,
    0,
  )
  return totalVolume * Math.min(share, 1)
}
