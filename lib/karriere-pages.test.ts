import assert from "node:assert/strict"
import test from "node:test"
import { KARRIERE_JOBS } from "./karriere-content"

// Run against a started Next.js server or an explicitly supplied preview URL.
const baseUrl = process.env.CAREER_TEST_BASE_URL ?? "http://127.0.0.1:3105"

async function page(path: string) {
  const response = await fetch(new URL(path, baseUrl), {
    signal: AbortSignal.timeout(15_000),
  })
  return { status: response.status, html: await response.text() }
}

function text(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
}

test("homepage and career overview link directly to every new job page", async () => {
  for (const path of ["/", "/karriere"]) {
    const result = await page(path)
    assert.equal(result.status, 200, path)
    for (const job of KARRIERE_JOBS) {
      assert.ok(
        result.html.includes(`href="/karriere/${job.slug}"`),
        `${path}: ${job.slug}`,
      )
    }
    assert.ok(result.html.includes('src="/journey-brand.svg"'))
  }
})

for (const job of KARRIERE_JOBS) {
  test(`${job.slug}: full job page and matching application choice`, async () => {
    const result = await page(`/karriere/${job.slug}`)
    assert.equal(result.status, 200)
    const heading = result.html.match(
      /<h1[^>]*id="job-title"[^>]*>([\s\S]*?)<\/h1>/,
    )?.[1]
    assert.equal(text(heading ?? ""), job.title)
    assert.ok(result.html.includes('href="#bewerbung"'))
    assert.ok(result.html.includes('id="tasks-title"'))
    assert.ok(result.html.includes('id="skills-title"'))
    const selected = result.html.match(
      /<option\b[^>]*selected=""[^>]*>([\s\S]*?)<\/option>/,
    )?.[1]
    assert.equal(text(selected ?? ""), job.title)
    assert.ok(result.html.includes('href="/datenschutz"'))
    assert.match(result.html, /<button\b[^>]*type="submit"[^>]*disabled=""/)
  })
}

test("unknown jobs return 404 instead of an unrelated job", async () => {
  assert.equal((await page("/karriere/keine-solche-stelle")).status, 404)
})

test("sitemap includes each new job page once", async () => {
  const result = await page("/sitemap.xml")
  assert.equal(result.status, 200)
  for (const job of KARRIERE_JOBS) {
    assert.equal(result.html.split(`/karriere/${job.slug}</loc>`).length - 1, 1)
  }
})
