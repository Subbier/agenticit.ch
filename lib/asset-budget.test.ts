import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the homepage keeps early font downloads within its four-family budget", async () => {
  const html = await (await fetch(baseUrl)).text()
  const fonts = [...html.matchAll(/<link\b[^>]+>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes('rel="preload"') && tag.includes('as="font"'))
  assert.ok(fonts.length > 0, "The primary self-hosted font remains preloaded")
  assert.ok(
    fonts.length <= 4,
    `Expected at most four critical font downloads, received ${fonts.length}`,
  )
  for (const font of fonts)
    assert.match(
      font,
      /href="\/_next\/static\/(?:immutable\/)?media\//,
      "Fonts stay self-hosted",
    )
})
