import assert from "node:assert/strict"
import test from "node:test"
import { readdirSync, readFileSync } from "node:fs"
import { getAllPosts } from "./blog"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const files = readdirSync("public/vorlagen").filter((file) =>
  file.endsWith(".txt"),
)

for (const filename of files) {
  test(`${filename} explicitly downloads byte-for-byte while both reading variants stay inline`, async () => {
    const path = `/vorlagen/${filename}`
    const original = readFileSync(`public${path}`)
    const download = await fetch(new URL(`${path}?download=1`, baseUrl))
    assert.equal(download.status, 200)
    assert.match(download.headers.get("content-type") ?? "", /text\/plain/)
    assert.equal(
      download.headers.get("content-disposition"),
      `attachment; filename="${filename}"`,
    )
    assert.deepEqual(Buffer.from(await download.arrayBuffer()), original)

    for (const suffix of ["", "?download=0"]) {
      const view = await fetch(new URL(`${path}${suffix}`, baseUrl))
      assert.equal(view.status, 200)
      assert.match(view.headers.get("content-type") ?? "", /text\/plain/)
      const disposition = view.headers.get("content-disposition")
      assert.ok(disposition === null || /^inline(?:;|$)/.test(disposition))
      assert.deepEqual(Buffer.from(await view.arrayBuffer()), original)
    }
  })
}

test("each article offers a distinct download link and a plain reading link for its actual template", async () => {
  const posts = getAllPosts().filter((post) => post.resource)
  assert.ok(posts.length > 0)
  for (const post of posts) {
    const path = post.resource!.href
    assert.match(path, /^\/vorlagen\/[^/?#]+\.txt$/)
    assert.ok(files.includes(path.split("/").pop()!))
    const response = await fetch(new URL(`/blog/${post.slug}`, baseUrl))
    assert.equal(response.status, 200)
    const html = await response.text()
    const resource = html.match(
      /<aside\b[^>]*class="blog-resource"[^>]*>([\s\S]*?)<\/aside>/,
    )?.[1]
    assert.ok(resource, post.slug)
    assert.ok(resource.includes(`href="${path}?download=1"`), post.slug)
    assert.ok(resource.includes(`download="${path.split("/").pop()}"`))
    assert.ok(resource.includes(`class="blog-resource-view" href="${path}"`))
  }
})
