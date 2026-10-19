import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("marketing platform illustrations resolve without waiting for a broken-image fallback", async () => {
  const page = await fetch(new URL("/excellence", baseUrl))
  assert.equal(page.status, 200)
  const html = await page.text()
  assert.match(html, /LinkedIn/)
  const sources = [
    ...new Set(
      [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)]
        .map(([, source]) => source.replaceAll("&amp;", "&"))
        .filter((source) => /cdn\.simpleicons\.org|^\/brands\//.test(source)),
    ),
  ]
  assert.ok(sources.length > 0, "The platform examples remain visible")
  for (const source of sources) {
    const response = await fetch(new URL(source, baseUrl))
    assert.equal(response.status, 200, source)
    assert.match(response.headers.get("content-type") ?? "", /^image\//)
  }
})
