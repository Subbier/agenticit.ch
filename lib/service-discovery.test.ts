import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the solution hub leads visitors to task-based services and marketing channels", async () => {
  const response = await fetch(new URL("/loesungen", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  for (const path of ["/angebot", "/excellence", "/case-studies"]) {
    assert.ok(html.includes(`href="${path}"`), `${path} needs a visible entry`)
    const target = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(target.status, 200)
  }

  const offer = await (await fetch(new URL("/angebot", baseUrl))).text()
  for (const slug of ["begeistern", "umsetzen", "erschaffen", "erweitern"]) {
    assert.ok(offer.includes(`href="/angebot/${slug}"`))
  }
})
