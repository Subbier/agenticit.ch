import type { PotentialKind } from "./potential-report"

export const potentialScenes = {
  acquisition: {
    scene: "magnet",
    title: "Mehr Wunschkunden",
    caption: "Aus Interesse werden neue Anfragen.",
  },
  conversion: {
    scene: "chart",
    title: "Mehr Abschlüsse",
    caption: "Mehr aus Ihren bestehenden Anfragen machen.",
  },
  admin: {
    scene: "workflow",
    title: "Weniger Handarbeit",
    caption: "Routine abgeben. Zeit zurückgewinnen.",
  },
  onboarding: {
    scene: "welcome",
    title: "Einfacher starten",
    caption: "Neue Kunden begrüssen statt Daten nachtragen.",
  },
  phone: {
    scene: "phone",
    title: "Mehr aus Ihren Anrufen",
    caption: "Aus Gesprächen können Aufträge werden.",
  },
  retention: {
    scene: "heart",
    title: "Kunden halten",
    caption: "Gute Beziehungen zahlen sich länger aus.",
  },
  partnership: {
    scene: "connect",
    title: "Weniger abstimmen",
    caption: "Ein Ansprechpartner. Mehr freie Kapazität.",
  },
} as const satisfies Record<
  PotentialKind,
  { scene: string; title: string; caption: string }
>

export function scenarioChoices(
  kind: PotentialKind,
  baseline: { volume: number; currentRate: number; minutes: number },
) {
  const time = ["admin", "onboarding", "partnership"].includes(kind)
  return [0, 1, 2].map((index) => {
    const reduction = [25, 50, 75][index]
    const points = [5, 10, 15][index]
    const targetRate = Math.min(100, baseline.currentRate + points)
    const growth = [25, 50, 100][index]
    return {
      id: String(index),
      title: time
        ? `${reduction} % weniger Handarbeit`
        : `${Number((targetRate - baseline.currentRate).toFixed(2))} zusätzliche ${kind === "retention" ? "Verlängerungen" : "Aufträge"}`,
      caption: time
        ? `${baseline.minutes} → ${Number((baseline.minutes * (1 - reduction / 100)).toFixed(2))} Minuten pro Vorgang`
        : kind === "acquisition"
          ? `Dazu ${growth} % mehr Kundenanfragen`
          : kind === "retention"
            ? `${baseline.currentRate} → ${targetRate} von 100 Kunden verlängern`
            : `${baseline.currentRate} → ${targetRate} Aufträge je 100 ${kind === "phone" ? "Anrufe" : "Anfragen"}`,
      targetRate: time ? undefined : targetRate,
      targetMinutes: time
        ? Number((baseline.minutes * (1 - reduction / 100)).toFixed(2))
        : undefined,
      targetVolume:
        kind === "acquisition"
          ? Math.round(baseline.volume * (1 + growth / 100))
          : undefined,
      level: index + 1,
    }
  })
}
