import assert from "node:assert/strict"
import test from "node:test"
import { readdirSync } from "node:fs"
import { join } from "node:path"
import { INDEXABLE_ROUTES } from "./seo"
import { getAllPosts } from "./blog"
import { BRANCHEN_LPS } from "./branchen-content"
import { KARRIERE_JOBS } from "./karriere-content"
import { datenschutzSections } from "./legal-datenschutz"
import { impressumSections } from "./legal-impressum"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
function staticRoutes(
  directory = join(process.cwd(), "app"),
  prefix = "",
): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && !entry.name.includes("["))
      return staticRoutes(
        join(directory, entry.name),
        `${prefix}/${entry.name}`,
      )
    return entry.isFile() && entry.name === "page.tsx" ? [prefix || "/"] : []
  })
}
const paths = [
  ...new Set([
    ...INDEXABLE_ROUTES,
    ...staticRoutes(),
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
    ...BRANCHEN_LPS.map((lp) => `/branchen/${lp.slug}`),
    ...KARRIERE_JOBS.map((job) => `/karriere/${job.slug}`),
    "/danke",
    "/danke-auswertung",
    "/kktermin",
    "/voiceagent",
    "/finmacl",
    "/finmacl.html",
  ]),
]

async function readPage(path: string) {
  const response = await fetch(new URL(path, baseUrl), {
    signal: AbortSignal.timeout(20_000),
  })
  assert.equal(response.status, 200, path)
  return response.text()
}

for (const path of paths) {
  test(`${path} uses the current site design and legal navigation`, async () => {
    const html = await readPage(path)
    assert.ok(
      html.includes('data-site-design="journey"'),
      `${path}: current design missing`,
    )
    assert.ok(
      html.includes('src="/journey-brand.svg"'),
      `${path}: brand missing`,
    )
    assert.ok(
      html.includes('href="/datenschutz"'),
      `${path}: privacy link missing`,
    )
    assert.ok(
      html.includes('href="/impressum"'),
      `${path}: legal notice link missing`,
    )
    assert.ok(html.includes('id="footer"'), `${path}: shared footer missing`)
  })
}

test("missing pages retain the current navigation and return 404", async () => {
  const response = await fetch(new URL("/diese-seite-existiert-nicht", baseUrl))
  assert.equal(response.status, 404)
  assert.ok((await response.text()).includes('data-site-design="journey"'))
})

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

test("/impressum groups short details compactly and shows the LinkedIn brand", async () => {
  const html = await readPage("/impressum")
  assert.equal((html.match(/data-legal-compact="true"/g) ?? []).length, 3)
  assert.match(
    html,
    /href="https:\/\/www\.linkedin\.com\/in\/rastoder"[^>]*><svg[^>]*data-brand="linkedin"/,
  )
  assert.match(html, /<ul[^>]*data-legal-links="true"/)
})

for (const [path, sections] of [
  ["/datenschutz", datenschutzSections],
  ["/impressum", impressumSections],
] as const) {
  test(`${path} preserves every existing legal section and statement`, async () => {
    const html = await readPage(path)
    for (const section of sections) {
      for (const statement of [
        section.title,
        ...(section.paragraphs ?? []),
        ...(section.list ?? []),
        ...(section.extra ? [section.extra] : []),
      ]) {
        assert.ok(
          html.includes(escapeHtml(statement)),
          `${path}: missing text in ${section.title}`,
        )
      }
      for (const link of section.links ?? []) {
        assert.ok(
          html.includes(`href="${escapeHtml(link.href)}"`),
          `${path}: missing ${link.href}`,
        )
      }
    }
  })
}
