import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
test("the CRM calculator offers a visual scenario and gates its PDF behind contact", async () => {
  const response = await fetch(new URL("/crm-ablauf-check", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.includes("CRM-Handarbeit"))
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  assert.ok(main.includes('data-visual-lead-magnet="admin"'))
  assert.ok(main.includes('name="volume"') && main.includes("<progress"))
  assert.ok(!main.includes('download="'))
  assert.ok(
    html.includes(
      'rel="canonical" href="https://agenticit.ch/crm-ablauf-check"',
    ),
  )
  assert.ok(!html.includes('content="noindex'))
})

test("the tools overview, Sales service and sitemap lead to the CRM check", async () => {
  for (const path of ["/werkzeuge", "/loesungen/revops-umsatzgenerierung"]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(html.includes('href="/crm-ablauf-check"'), path)
  }
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  assert.ok(xml.includes("<loc>https://agenticit.ch/crm-ablauf-check</loc>"))
})
