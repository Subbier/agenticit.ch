import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the former intelligence page preserves its sales-analysis intent in one permanent redirect", async () => {
  const response = await fetch(
    new URL("/intelligence?utm_source=legacy-test", baseUrl),
    { redirect: "manual" },
  )
  assert.equal(response.status, 308)
  const location = response.headers.get("location")
  assert.ok(location)
  const destination = new URL(location, baseUrl)
  assert.equal(destination.pathname, "/loesungen/revops-umsatzgenerierung")
  assert.equal(destination.origin, new URL(baseUrl).origin)
  assert.equal(destination.searchParams.get("utm_source"), "legacy-test")

  const target = await fetch(destination, { redirect: "manual" })
  assert.equal(target.status, 200)
  const html = await target.text()
  assert.match(html, /CRM/)
  assert.ok(
    html.includes(
      'rel="canonical" href="https://agenticit.ch/loesungen/revops-umsatzgenerierung"',
    ),
  )
})
