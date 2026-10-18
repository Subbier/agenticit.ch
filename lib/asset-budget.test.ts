import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import { resolve } from "node:path"
import { compile } from "@tailwindcss/node"
import postcss from "postcss"
import sitemap from "../app/sitemap"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

function stylesheetClasses(css: string) {
  const names = new Set<string>()
  postcss.parse(css).walkRules((rule) => {
    for (const match of rule.selector.matchAll(
      /\.((?:\\[0-9a-fA-F]{1,6}\s?|\\[^\r\n]|[\w\u00a0-\uffff-])+)/g,
    ))
      names.add(
        match[1].replace(
          /\\([0-9a-fA-F]{1,6})\s?|\\([^\r\n])/g,
          (_, hex: string, character: string) =>
            hex ? String.fromCodePoint(parseInt(hex, 16)) : character,
        ),
      )
  })
  return names
}

function decodeClassAttribute(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&quot;", '"')
    .replace(
      /&#(?:x([\da-fA-F]+)|(\d+));/g,
      (_, hex: string, decimal: string) =>
        String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)),
    )
}

test("CSS coverage recognises escaped variants, arbitrary values and numeric prefixes", () => {
  const css = String.raw`.sm\:w-1\/2:hover,.w-\[calc\(100\%-24px\)\]{width:1px}.\32 xl\:grid{display:grid}`
  assert.deepEqual(
    [...stylesheetClasses(css)].sort(),
    ["sm:w-1/2", "w-[calc(100%-24px)]", "2xl:grid"].sort(),
  )
})

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
    raw < 200000,
    `${raw} initial CSS bytes exceeds the 200000-byte budget`,
  )
  assert.ok(
    gzip < 35000,
    `${gzip} gzip CSS bytes exceeds the 35000-byte budget`,
  )
})

test("public pages deliver their stylesheets and all rendered Tailwind classes", async () => {
  const styles = new Set<string>()
  const rendered = new Set<string>()
  const paths = [
    ...new Set([
      ...sitemap().map((entry) => new URL(entry.url).pathname),
      "/beste-variante",
      "/danke",
      "/danke-auswertung",
      "/kktermin",
      "/voiceagent",
    ]),
  ]
  for (let start = 0; start < paths.length; start += 8) {
    await Promise.all(
      paths.slice(start, start + 8).map(async (path) => {
        const response = await fetch(new URL(path, baseUrl))
        assert.equal(response.status, 200, path)
        const html = await response.text()
        for (const [, attribute] of html.matchAll(/\bclass="([^"]*)"/g)) {
          for (const name of decodeClassAttribute(attribute).split(/\s+/))
            if (name) rendered.add(name)
        }
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
  const delivered = new Set<string>()
  for (const url of styles) {
    const response = await fetch(url)
    assert.equal(response.status, 200, url)
    assert.match(response.headers.get("content-type") ?? "", /^text\/css/)
    const css = await response.text()
    assert.ok(css.length > 0, url)
    for (const name of stylesheetClasses(css)) delivered.add(name)
  }
  const compiler = await compile(readFileSync("app/globals.css", "utf8"), {
    base: resolve("app"),
    from: resolve("app/globals.css"),
    onDependency: () => {},
  })
  const expected = stylesheetClasses(compiler.build([...rendered]))
  const missing = [...rendered].filter(
    (name) => expected.has(name) && !delivered.has(name),
  )
  assert.deepEqual(
    missing,
    [],
    "Rendered utility classes must survive CSS source exclusions",
  )
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
