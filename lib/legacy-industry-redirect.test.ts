import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const destinationPath = "/branchen/autohaus"

test("the former dealership entry retains its industry intent in one permanent redirect", async () => {
  const response = await fetch(
    new URL("/car-dealerships?utm_source=legacy-test", baseUrl),
    { redirect: "manual" },
  )
  assert.equal(response.status, 308)
  const location = response.headers.get("location")
  assert.ok(location, "A permanent redirect must provide its destination")
  const destination = new URL(location, baseUrl)
  assert.equal(destination.pathname, destinationPath)
  assert.equal(destination.searchParams.get("utm_source"), "legacy-test")
  assert.equal(destination.origin, new URL(baseUrl).origin)

  const target = await fetch(destination, { redirect: "manual" })
  assert.equal(
    target.status,
    200,
    "The matching page must need no further redirect",
  )
  const html = await target.text()
  assert.match(html, /Vom Fahrzeuginteresse zum klaren nächsten Schritt\./)
  assert.ok(
    html.includes(
      `rel="canonical" href="https://agenticit.ch${destinationPath}"`,
    ),
  )
  assert.ok(html.includes('href="/anfragen-check"'))
})

test("the sitemap retains the dealership canonical and excludes its former alias", async () => {
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  assert.ok(xml.includes(`<loc>https://agenticit.ch${destinationPath}</loc>`))
  assert.ok(!xml.includes("/car-dealerships"))
})
