import assert from "node:assert/strict"
import test from "node:test"
import { existsSync, statSync, readFileSync } from "node:fs"
import { getAllPosts } from "./blog"
import {
  getBlogVideo,
  formatVideoDuration,
  homeVideoSlugs,
  pauseOtherMedia,
} from "./blog-videos"

test("all 34 articles resolve to their own supplied video and a small poster", () => {
  const paths = new Set<string>()
  for (const post of getAllPosts()) {
    const video = getBlogVideo(post.slug)
    assert.ok(video, post.slug)
    assert.ok(video.src.includes(`AgenticIT_${post.slug}_16x9_`))
    assert.equal(paths.has(video.src), false, `duplicate video: ${post.slug}`)
    paths.add(video.src)
    assert.ok(video.durationSeconds > 0)
    assert.equal(video.width / video.height, 16 / 9)
    assert.ok(
      video.bytes < 6_000_000,
      `${post.slug}: compact web file required`,
    )
    assert.equal(statSync(`public${video.src}`).size, video.bytes)
    assert.ok(existsSync(`public${video.poster}`))
    assert.ok(statSync(`public${video.poster}`).size < 100_000)
  }
  assert.equal(paths.size, 34)
  assert.equal(getBlogVideo("not-an-article"), undefined)
  assert.equal(getBlogVideo("toString"), undefined)
})

test("duration labels and home selection use real media metadata", () => {
  assert.equal(formatVideoDuration(164.367), "2:45")
  assert.equal(formatVideoDuration(60), "1:00")
  assert.equal(formatVideoDuration(9), "0:09")
  assert.equal(new Set(homeVideoSlugs).size, 6)
  for (const slug of homeVideoSlugs) assert.ok(getBlogVideo(slug))
})

test("starting a blog video stops every other player and leaves itself playing", () => {
  const paused: string[] = []
  const company = { pause: () => paused.push("company") }
  const active = { pause: () => paused.push("active") }
  const another = { pause: () => paused.push("another") }
  pauseOtherMedia(active, [company, active, another])
  assert.deepEqual(paused, ["company", "another"])
})

test("player retains native touch controls, postpones download and handles errors", () => {
  const code = readFileSync("components/site/blog-video-player.tsx", "utf8")
  assert.match(code, /preload="none"/)
  assert.match(code, /playsInline/)
  assert.match(code, /controls/)
  assert.match(code, /poster=\{video.poster\}/)
  assert.match(code, /onError/)
  assert.match(code, /player\.play\(\)/)
  assert.match(code, /addEventListener\("play", pauseOtherPlayers, true\)/)
  assert.doesNotMatch(code, /autoPlay|setInterval/)
})
