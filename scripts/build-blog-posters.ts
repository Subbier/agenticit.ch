import { mkdir, readFile, writeFile } from "node:fs/promises"
import sharp from "sharp"
import { makeEditorialPoster } from "../lib/blog-poster-design"
import { videoTopics } from "../lib/blog-videos"

async function buildPosters() {
  const manifestPath = "content/blog-videos.json"
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
  await mkdir("public/blog-videos/editorial", { recursive: true })
  for (const [slug, video] of Object.entries(manifest)) {
    const topic = videoTopics.find((item) =>
      (item.slugs as readonly string[]).includes(slug),
    )
    if (!topic) throw new Error(`Missing topic: ${slug}`)
    const poster = `/blog-videos/editorial/${slug}.webp`
    await sharp(Buffer.from(makeEditorialPoster(slug, topic.id, topic.label)))
      .webp({ quality: 86 })
      .toFile(`public${poster}`)
    ;(video as { poster: string }).poster = poster
  }
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Built ${Object.keys(manifest).length} editorial covers.`)
}

buildPosters().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
