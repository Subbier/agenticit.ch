import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
test("self-service checks keep floating chat clear of choices and forms; the homepage retains Mia", async () => {
  for (const path of [
    "/anfragen-check",
    "/marketing-setup-check",
    "/automatisierungs-check",
    "/kundenreise-check",
  ]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(!html.includes('aria-label="Chat mit Mia öffnen"'), path)
  }
  const home = await (await fetch(new URL("/", baseUrl))).text()
  assert.ok(home.includes('aria-label="Chat mit Mia öffnen"'))
})
test("the inquiry check is indexable, accessible and distinct from a contact form", async () => {
  const response = await fetch(new URL("/anfragen-check", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.includes("Anfragen im Blick."))
  assert.ok(!/<form\b/.test(main))
  assert.equal((main.match(/type="radio"/g) ?? []).length, 4)
  assert.ok(main.includes('name="intake"'))
  assert.ok(main.includes("<legend") && main.includes("<progress"))
  assert.ok(
    html.includes('rel="canonical" href="https://agenticit.ch/anfragen-check"'),
  )
  assert.ok(!html.includes('content="noindex'))
  assert.ok(html.includes('"@type":"FAQPage"'))
  assert.ok(html.includes("keinen entgangenen Umsatz"))
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
})
test("relevant entry points and sitemap find the inquiry check", async () => {
  for (const path of [
    "/",
    "/werkzeuge",
    "/loesungen/revops-umsatzgenerierung",
  ]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(html.includes('href="/anfragen-check"'), path)
  }
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  assert.ok(xml.includes("<loc>https://agenticit.ch/anfragen-check</loc>"))
})
