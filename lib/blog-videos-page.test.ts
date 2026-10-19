import assert from "node:assert/strict"
import test from "node:test"
import { getAllPosts } from "./blog"
import { getBlogVideo } from "./blog-videos"

const base = process.env.SITE_TEST_BASE_URL ?? "http://localhost:3109"

test("all article players and posters match their article; MP4 range delivery works", async () => {
  const posts = getAllPosts()
  for (let i = 0; i < posts.length; i += 4) {
    await Promise.all(
      posts.slice(i, i + 4).map(async (post) => {
        const video = getBlogVideo(post.slug)!
        const article = await fetch(`${base}/blog/${post.slug}`)
        assert.equal(article.status, 200, post.slug)
        const html = await article.text()
        assert.ok(html.includes(video.src), post.slug)
        assert.ok(html.includes(`poster="${video.poster}"`), post.slug)
        assert.ok(html.includes('preload="none"'))
        assert.ok(html.indexOf('id="video"') < html.indexOf('id="artikel"'))
        const poster = await fetch(`${base}${video.poster}`)
        assert.equal(poster.status, 200)
        assert.match(poster.headers.get("content-type") ?? "", /^image\/webp/)
        const clip = await fetch(`${base}${video.src}`, {
          headers: { Range: "bytes=0-63" },
        })
        assert.equal(clip.status, 206, `${post.slug}: seek/range support`)
        assert.equal(
          clip.headers.get("content-range"),
          `bytes 0-63/${video.bytes}`,
        )
        const bytes = Buffer.from(await clip.arrayBuffer())
        assert.equal(bytes.length, 64)
        assert.equal(bytes.toString("ascii", 4, 8), "ftyp")
      }),
    )
  }
})

test("index announces all 34 videos and homepage has one media player before a selection", async () => {
  const index = await (await fetch(`${base}/blog`)).text()
  assert.equal((index.match(/<img[^>]+src="\/blog-videos\//g) ?? []).length, 34)
  const home = await (await fetch(base)).text()
  assert.ok(home.includes('id="home-video-rail"'))
  assert.equal(
    (home.match(/<video\b/g) ?? []).length,
    1,
    "only the existing company video is mounted",
  )
  assert.ok(home.includes("Weitere Videos"))
})
