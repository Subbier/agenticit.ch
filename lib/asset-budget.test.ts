import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import sitemap from "../app/sitemap"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the homepage keeps its initial styles within the first-load budget", async () => {
  const html = await (await fetch(baseUrl)).text()
  const styles = [...html.matchAll(/<link\b[^>]+>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes('rel="stylesheet"'))
  assert.ok(styles.length > 0, "The homepage still provides its styles")
  const files = await Promise.all(
    styles.map(async (tag) => {
      const path = tag.match(/href="([^"]+)"/)?.[1]
      assert.ok(path)
      const response = await fetch(new URL(path, baseUrl))
      assert.equal(response.status, 200)
      const css = Buffer.from(await response.arrayBuffer())
      return { raw: css.length, gzip: gzipSync(css).length }
    }),
  )
  const raw = files.reduce((total, file) => total + file.raw, 0)
  const gzip = files.reduce((total, file) => total + file.gzip, 0)
  assert.ok(
    raw < 330000,
    `${raw} initial CSS bytes exceeds the 330000-byte budget`,
  )
  assert.ok(
    gzip < 50000,
    `${gzip} gzip CSS bytes exceeds the 50000-byte budget`,
  )
})

test("every canonical page delivers its referenced stylesheets", async () => {
  const styles = new Set<string>()
  const paths = sitemap().map((entry) => new URL(entry.url).pathname)
  for (let start = 0; start < paths.length; start += 8) {
    await Promise.all(
      paths.slice(start, start + 8).map(async (path) => {
        const response = await fetch(new URL(path, baseUrl))
        assert.equal(response.status, 200, path)
        const html = await response.text()
        const tags = [...html.matchAll(/<link\b[^>]+>/g)]
          .map(([tag]) => tag)
          .filter((tag) => tag.includes('rel="stylesheet"'))
        assert.ok(tags.length > 0, `${path} has no stylesheet`)
        for (const tag of tags) {
          const href = tag.match(/href="([^"]+)"/)?.[1]
          assert.ok(href)
          const url = new URL(href, baseUrl)
          assert.equal(url.origin, new URL(baseUrl).origin)
          styles.add(url.href)
        }
      }),
    )
  }
  for (const url of styles) {
    const response = await fetch(url)
    assert.equal(response.status, 200, url)
    assert.match(response.headers.get("content-type") ?? "", /^text\/css/)
    assert.ok((await response.text()).length > 0, url)
  }
})

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
