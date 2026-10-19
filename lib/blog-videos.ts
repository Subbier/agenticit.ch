import manifest from "@/content/blog-videos.json"

export type BlogVideo = {
  src: string
  poster: string
  durationSeconds: number
  width: number
  height: number
  bytes: number
  sha256: string
}

export function getBlogVideo(slug: string): BlogVideo | undefined {
  return Object.hasOwn(manifest, slug)
    ? (manifest as Record<string, BlogVideo>)[slug]
    : undefined
}

export function formatVideoDuration(seconds: number) {
  const total = Math.ceil(seconds)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`
}

export function pauseOtherMedia<T extends { pause(): void }>(
  active: T | null,
  players: Iterable<T>,
) {
  if (!active) return
  for (const player of players) if (player !== active) player.pause()
}

const featuredVideoSlugs = [
  "ki-agenten",
  "ki-im-verkaufsgespraech",
  "marketing-automatisierung-kmu",
  "prozessautomatisierung-kmu-leitfaden",
  "webdesign-kosten-schweiz",
  "ki-sprachassistent-telefonie",
] as const

export const videoTopics = [
  {
    id: "marketing",
    label: "Kunden gewinnen",
    slugs: [
      "marketing-automatisierung-kmu",
      "webdesign-kosten-schweiz",
      "landingpage-oder-website",
      "website-briefing-vorlage",
      "werbung-fuer-kmu",
      "kundenakquise-methoden",
      "leadgenerierung-ki",
      "leadgenerierung-mit-ki-leitfaden",
      "neukundengewinnung-kmu-schweiz",
      "ki-social-media-automatisierung",
    ],
  },
  {
    id: "sales",
    label: "Verkauf verbessern",
    slugs: [
      "ki-im-verkaufsgespraech",
      "ki-automatisierung-vertrieb",
      "revops-as-a-service",
      "revops-metriken-kennzahlen",
      "speed-to-lead-5-minuten-regel",
      "ki-datenanalyse-kmu",
    ],
  },
  {
    id: "operations",
    label: "Alltag vereinfachen",
    slugs: [
      "ki-agenten",
      "prozessautomatisierung-kmu-leitfaden",
      "ki-sprachassistent-telefonie",
      "buchhaltung-automatisieren-ki",
      "ki-email-management",
      "ki-im-kundenservice-leitfaden",
      "ki-vs-mensch-im-service",
      "ki-agenten-praxisbeispiele-schweiz",
    ],
  },
  {
    id: "getting-started",
    label: "KI richtig einführen",
    slugs: [
      "ki-einfuehrung-schritt-fuer-schritt",
      "eigene-ki-agenten-vs-chatgpt",
      "ki-agent-entwickeln-lassen",
      "haeufige-ki-fehler-vermeiden",
      "change-management-mit-ki",
      "ki-roi-berechnen",
      "ki-agenten-sicherheit-compliance",
      "ki-datenschutz-schweiz-ndsg",
      "ki-trends-2026-schweiz",
      "multi-agenten-systeme-erklaert",
    ],
  },
] as const

export type VideoTopicId = "all" | (typeof videoTopics)[number]["id"]

export const homeVideoSlugs = [
  ...new Set<string>([
    ...featuredVideoSlugs,
    ...videoTopics.flatMap((topic) => [...topic.slugs]),
  ]),
]

export function filterVideos<T extends { slug: string }>(
  items: readonly T[],
  topicId: VideoTopicId,
): readonly T[] {
  if (topicId === "all") return items
  const topic = videoTopics.find((topic) => topic.id === topicId)
  const slugs = new Set<string>(topic?.slugs)
  return items.filter((item) => slugs.has(item.slug))
}
