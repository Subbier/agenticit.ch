// Branchen-Liste (8 Kernbranchen + Fallback) und Preset-Lookup.
// Die eigentlichen Use-Case-Listen je Branche stehen in branch-presets.ts.

import { BRANCH_PRESETS, type BranchPreset } from "./branch-presets"

export type Branch = { id: string; label: string }

export const BRANCHES: Branch[] = [
  { id: "treuhand", label: "Treuhand · Finanzen · Versicherung" },
  { id: "beratung", label: "Beratung · Kanzlei · Coaching" },
  { id: "agentur", label: "Agentur · Marketing · Medien" },
  { id: "handel", label: "Handel · E-Commerce · Retail" },
  { id: "handwerk", label: "Handwerk · Bau" },
  { id: "gastro", label: "Gastronomie · Hotel · Tourismus" },
  { id: "gesundheit", label: "Gesundheit · Praxis" },
  { id: "it", label: "IT · SaaS · Software" },
  { id: "andere", label: "Andere Branche" },
]

export const BRANCH_OPTIONS = BRANCHES.map((b) => ({ id: b.id, label: b.label }))

export function branchLabelOf(id: string): string {
  return BRANCHES.find((b) => b.id === id)?.label ?? ""
}

export function presetFor(id: string): BranchPreset {
  return BRANCH_PRESETS[id] ?? BRANCH_PRESETS["andere"]
}
