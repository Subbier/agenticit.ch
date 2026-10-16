import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the marketing setup check has an indexable canonical page, native choices and useful answers", async () => {
  const response = await fetch(new URL("/marketing-setup-check", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.ok(
    html.includes(
      'rel="canonical" href="https://agenticit.ch/marketing-setup-check"',
    ),
  )
  assert.ok(!html.includes('content="noindex'))
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  assert.equal((html.match(/type="radio"/g) ?? []).length, 4)
  assert.ok(html.includes('name="offer"'))
  assert.ok(html.includes("<legend"))
  assert.ok(html.includes("<progress"))
  assert.ok(html.includes('"@type":"FAQPage"'))
  assert.ok(html.includes("keine bezahlte Werbung"))
  assert.ok(html.includes('href="/datenschutz"'))
})

test("relevant entry points find the marketing check and the sitemap includes it", async () => {
  for (const path of ["/", "/werkzeuge", "/pakete", "/loesungen/webdesign"]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(html.includes('href="/marketing-setup-check"'), path)
  }
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  assert.ok(
    xml.includes("<loc>https://agenticit.ch/marketing-setup-check</loc>"),
  )
})
