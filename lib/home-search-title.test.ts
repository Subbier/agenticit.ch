import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the homepage search title explains the offer, audience and brand while retaining its hero", async () => {
  const html = await (await fetch(new URL("/", baseUrl))).text()
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? ""
  for (const term of ["Marketing", "Sales", "KI", "Schweizer KMU", "AgenticIT"]) {
    assert.ok(title.includes(term), `Search title needs ${term}`)
  }
  assert.ok(title.length <= 60)
  assert.match(html, /Neue Kunden\./)
  assert.match(html, /Digitale Abläufe\./)
  assert.match(html, /Ein Partner\./)
})
