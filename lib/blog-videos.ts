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

export const homeVideoSlugs = [
  "ki-agenten",
  "ki-im-verkaufsgespraech",
  "marketing-automatisierung-kmu",
  "prozessautomatisierung-kmu-leitfaden",
  "webdesign-kosten-schweiz",
  "ki-sprachassistent-telefonie",
] as const
