import assert from "node:assert/strict"
import test from "node:test"
import sitemap from "../app/sitemap"
import { SITE_URL } from "./seo"

test("unchanged content does not acquire a new modification date on a later build", (t) => {
  t.mock.timers.enable({
    apis: ["Date"],
    now: new Date("2026-10-17T00:00:00Z"),
  })
  const first = sitemap()
  t.mock.timers.setTime(Date.UTC(2026, 9, 20))
  assert.ok(
    JSON.stringify(sitemap()) === JSON.stringify(first),
    "Only a real content update may change a modification date",
  )
})

test("unknown modification dates are omitted instead of inferred from a publication date", () => {
  for (const path of [
    "/blog/ki-agenten",
    "/branchen/treuhand",
    "/karriere/lehrstelle-informatik-efz",
  ]) {
    assert.equal(
      sitemap().find((entry) => entry.url === `${SITE_URL}${path}`)
        ?.lastModified,
      undefined,
    )
  }
})

test("verified service and calculator updates retain their real content dates", () => {
  for (const [path, date] of [
    ["/loesungen/ki-entwicklung", "2026-10-16"],
    ["/loesungen/webdesign", "2026-10-17"],
    ["/loesungen/prozessautomatisierung", "2026-10-16"],
    ["/automatisierungs-check", "2026-10-17"],
    ["/marketing-setup-check", "2026-10-17"],
  ])
    assert.equal(
      sitemap().find((entry) => entry.url === `${SITE_URL}${path}`)
        ?.lastModified,
      date,
    )
})

test("the sitemap keeps unique public absolute URLs and excludes the test funnel", () => {
  const urls = sitemap().map((entry) => entry.url)
  assert.equal(new Set(urls).size, urls.length)
  assert.ok(urls.length > 30)
  for (const url of urls) {
    assert.equal(new URL(url).origin, SITE_URL)
    assert.ok(
      !url.includes("beste-variante") &&
        !url.includes("/api/") &&
        !url.includes("?"),
    )
  }
})

test("the served XML includes only verified content modification dates", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  const response = await fetch(new URL("/sitemap.xml", baseUrl))
  assert.equal(response.status, 200)
  const xml = await response.text()
  const served = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    ([, block]) => ({
      url: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
      lastModified: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
    }),
  )
  assert.equal(served.length, sitemap().length)
  for (const expected of sitemap())
    assert.equal(
      served.find((entry) => entry.url === expected.url)?.lastModified,
      expected.lastModified,
      expected.url,
    )
})

test("every sitemap entry responds directly with its own indexable canonical page", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  const entries = sitemap()
  const failures: string[] = []
  for (let start = 0; start < entries.length; start += 6) {
    await Promise.all(
      entries.slice(start, start + 6).map(async (entry) => {
        const path = new URL(entry.url).pathname
        const response = await fetch(new URL(path, baseUrl), {
          redirect: "manual",
        })
        if (response.status !== 200) {
          failures.push(`${path}: HTTP ${response.status}`)
          return
        }
        if (/noindex/i.test(response.headers.get("x-robots-tag") ?? "")) {
          failures.push(`${path}: X-Robots-Tag noindex`)
        }
        const html = await response.text()
        const links = [...html.matchAll(/<link\b[^>]+>/g)].map(([tag]) => tag)
        const canonical = links
          .find((tag) => tag.includes('rel="canonical"'))
          ?.match(/href="([^"]+)"/)?.[1]
        if (canonical !== entry.url)
          failures.push(`${path}: canonical ${canonical ?? "missing"}`)
        const robots = [...html.matchAll(/<meta\b[^>]+>/g)]
          .map(([tag]) => tag)
          .find((tag) => tag.includes('name="robots"'))
        if (robots?.includes("noindex")) failures.push(`${path}: noindex`)
      }),
    )
  }
  assert.deepEqual(failures, [])
})
