import assert from "node:assert/strict"
import test from "node:test"
import { getAllPosts } from "./blog"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

for (const post of getAllPosts()) {
  test(`${post.slug} keeps its rendered search title within 65 characters including the brand`, async () => {
    const response = await fetch(new URL(`/blog/${post.slug}`, baseUrl))
    assert.equal(response.status, 200)
    const html = await response.text()
    const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#x27;", "'")
    assert.ok(title.length > 0)
    assert.ok(title.includes("AgenticIT"))
    assert.ok(
      title.length <= 65,
      `${post.slug}: delivered title has ${title.length} characters including the brand`,
    )
  })
}
