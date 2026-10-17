import assert from "node:assert/strict"
import test from "node:test"
import { industryFocus } from "./industry-focus"
import { BRANCHEN_LPS } from "./branchen-content"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
for (const focus of industryFocus) {
  test(`${focus.slug} speaks to the intended advisory audience and links a useful check`, async () => {
    assert.ok(
      BRANCHEN_LPS.some((item) => item.slug === focus.slug),
      "Existing industry URL must be reused",
    )
    const path = `/branchen/${focus.slug}`
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main.includes(focus.headline))
    assert.ok(main.includes(`href="${focus.checkHref}"`))
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch${path}"`),
    )
    assert.ok(
      !/Daten bleiben in der Schweiz|24\/7|nDSG-konform|DSGVO-konform|lückenlos|fehlerfrei/.test(
        main,
      ),
    )
    for (const area of focus.areas) {
      assert.equal(area.items.length, 4)
      assert.ok(main.includes(area.name))
      for (const text of area.items) assert.ok(main.includes(text))
    }
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json))
    const faq = data.find((item) => item["@type"] === "FAQPage")
    assert.equal(faq?.mainEntity.length, 5)
    assert.ok(data.some((item) => item["@type"] === "Service"))
    for (const entry of faq.mainEntity)
      assert.ok(main.includes(entry.acceptedAnswer.text))
  })
}

test("the industry overview prioritises advisory teams and keeps all existing industry links", async () => {
  const response = await fetch(new URL("/branchen", baseUrl))
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  for (const text of ["Vorsorge", "Broker", "Telesales", "Aussendienst"])
    assert.ok(main.includes(text))
  for (const item of BRANCHEN_LPS)
    assert.ok(main.includes(`href="/branchen/${item.slug}"`))
  assert.ok(main.includes('href="/kundenreise-check"'))
  assert.ok(
    !/Ihre Daten bleiben in der Schweiz|Offline-fähig|CRM pflegt sich von selbst|DSG-konform/.test(
      main,
    ),
  )
})
