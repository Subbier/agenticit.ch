import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the homepage only preloads its three actively used font families", async () => {
  const html = await (await fetch(baseUrl)).text()
  const fonts = [...html.matchAll(/<link\b[^>]+>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes('rel="preload"') && tag.includes('as="font"'))
  assert.ok(fonts.length > 0, "The primary self-hosted font remains preloaded")
  assert.ok(
    fonts.length <= 3,
    `Expected at most three critical font downloads, received ${fonts.length}`,
  )
  for (const font of fonts)
    assert.match(
      font,
      /href="\/_next\/static\/(?:immutable\/)?media\//,
      "Fonts stay self-hosted",
    )
  const bytes = await Promise.all(
    fonts.map(async (tag) => {
      const path = tag.match(/href="([^"]+)"/)?.[1]
      assert.ok(path)
      const response = await fetch(new URL(path, baseUrl))
      assert.equal(response.status, 200)
      return (await response.arrayBuffer()).byteLength
    }),
  )
  assert.ok(
    bytes.reduce((total, value) => total + value, 0) < 110000,
    "Critical font files stay below 110000 bytes; deferred fonts do not compete with them",
  )
})

test("the deferred code font remains self-hosted and unchanged", async () => {
  const html = await (await fetch(baseUrl)).text()
  const preloads = [...html.matchAll(/<link\b[^>]+>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes('rel="preload"') && tag.includes('as="font"'))
  assert.ok(preloads.every((tag) => !tag.includes("GeistMono")))
  const styles = [...html.matchAll(/<link\b[^>]+>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes('rel="stylesheet"'))
  let fontUrl: URL | undefined
  for (const style of styles) {
    const path = style.match(/href="([^"]+)"/)?.[1]
    assert.ok(path)
    const styleUrl = new URL(path, baseUrl)
    const css = await (await fetch(styleUrl)).text()
    const match = css.match(/url\(([^)]*GeistMono[^)]*\.woff2)\)/)
    if (match) {
      assert.ok(css.includes("--font-geist-mono"))
      fontUrl = new URL(match[1].replaceAll('"', ""), styleUrl)
    }
  }
  assert.ok(fontUrl, "The code font remains available when a page needs it")
  assert.equal(fontUrl.origin, new URL(baseUrl).origin)
  const response = await fetch(fontUrl)
  assert.equal(response.status, 200)
  assert.deepEqual(
    Buffer.from(await response.arrayBuffer()),
    readFileSync(
      "node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
    ),
  )
})
