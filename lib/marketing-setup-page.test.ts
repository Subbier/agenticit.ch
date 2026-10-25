import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("marketing potential starts with business numbers and an explicit contact gate", async () => {
  const response = await fetch(new URL("/marketing-setup-check", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.length > 0)
  assert.ok(/<form\b/.test(main))
  assert.ok(
    html.includes(
      'rel="canonical" href="https://agenticit.ch/marketing-setup-check"',
    ),
  )
  assert.ok(!html.includes('content="noindex'))
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  assert.ok(main.includes('name="volume"'))
  assert.ok(main.includes('name="currentRate"'))
  assert.ok(main.includes('aria-label="Ihr Fortschritt"'))
  assert.ok(main.includes("nach Eingabe Ihrer Kontaktdaten"))
  assert.ok(!main.includes('download="'))
})

test("relevant entry points find the marketing check and the sitemap includes it", async () => {
  for (const path of ["/", "/werkzeuge", "/pakete"]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(html.includes('href="/marketing-setup-check"'), path)
  }
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  assert.ok(
    xml.includes("<loc>https://agenticit.ch/marketing-setup-check</loc>"),
  )
})
