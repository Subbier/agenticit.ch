import assert from "node:assert/strict"
import test from "node:test"
import { websiteCostFields } from "./website-cost-comparison"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the cost guide offers an optional empty calculator without removing its template or existing next step", async () => {
  const response = await fetch(
    new URL("/blog/webdesign-kosten-schweiz", baseUrl),
  )
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.includes('id="website-cost-period"'))
  assert.ok(main.includes('href="#offertenvergleich"'))
  assert.ok(main.includes('id="offertenvergleich"'))
  assert.ok(
    !main.includes("<form"),
    "The calculator does not require contact or submission",
  )
  assert.ok(main.includes("Leere Felder bleiben offen"))
  assert.ok(main.includes("Leistungsumfang und MWST-Basis sind abgeglichen"))
  assert.ok(main.includes("Noch offen"))
  assert.ok(main.includes("<noscript>"))
  assert.match(main, /<button\b[^>]*disabled=""[^>]*>Vergleich speichern/)
  assert.ok(
    main.includes(
      'href="/vorlagen/AgenticIT-Website-Kostenvergleich.txt?download=1"',
    ),
  )
  assert.ok(main.includes('href="/marketing-setup-check"'))
  for (const offer of ["a", "b"])
    for (const { key } of websiteCostFields) {
      const id = `website-cost-${offer}-${key}`
      assert.ok(main.includes(`<label for="${id}">`), id)
      const input = main.match(
        new RegExp(`<input\\b[^>]*id="${id}"[^>]*>`),
      )?.[0]
      assert.ok(input, id)
      assert.ok(
        input.includes('value=""'),
        "No example cost may look like an actual offer",
      )
      assert.ok(
        input.includes('inputMode="decimal"') ||
          input.includes('inputmode="decimal"'),
      )
    }
})

test("unrelated decision guides retain their existing resources without the cost calculator", async () => {
  for (const slug of [
    "ki-agent-entwickeln-lassen",
    "marketing-automatisierung-kmu",
  ]) {
    const html = await (await fetch(new URL(`/blog/${slug}`, baseUrl))).text()
    assert.ok(!html.includes('id="website-cost-period"'))
    assert.ok(html.includes('class="blog-resource"'))
  }
})

test("the existing tools overview points directly to the optional comparison", async () => {
  const html = await (await fetch(new URL("/werkzeuge", baseUrl))).text()
  assert.ok(
    html.includes('href="/blog/webdesign-kosten-schweiz#offertenvergleich"'),
  )
  assert.ok(html.includes("Website-Offerten vergleichen"))
})
