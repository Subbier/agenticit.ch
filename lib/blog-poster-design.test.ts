import assert from "node:assert/strict"
import test from "node:test"
import { statSync } from "node:fs"
import sharp from "sharp"
import { getAllPosts } from "./blog"
import { getBlogVideo } from "./blog-videos"
import { posterHeadlines } from "./blog-poster-design"

test("every article has a readable editorial cover within the shared image budget", async () => {
  const posts = getAllPosts()
  assert.deepEqual(
    Object.keys(posterHeadlines).sort(),
    posts.map((post) => post.slug).sort(),
  )
  let totalBytes = 0
  for (const post of posts) {
    const video = getBlogVideo(post.slug)!
    assert.ok(video.poster.startsWith("/blog-videos/editorial/"), post.slug)
    const file = `public${video.poster}`
    const metadata = await sharp(file).metadata()
    assert.equal(metadata.width, 960, post.slug)
    assert.equal(metadata.height, 540, post.slug)
    assert.equal(metadata.format, "webp", post.slug)
    const size = statSync(file).size
    assert.ok(size < 40_000, `${post.slug}: keep covers lightweight`)
    totalBytes += size
  }
  assert.ok(totalBytes < 1_000_000, "all 34 covers together stay below 1 MB")
})
