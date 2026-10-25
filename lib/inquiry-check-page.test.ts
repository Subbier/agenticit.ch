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
test("the inquiry potential calculator is indexable and starts without exposing a result", async () => {
  const response = await fetch(new URL("/anfragen-check", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.includes("Wie viel mehr steckt in Ihren Anfragen?"))
  assert.ok(/<form\b/.test(main))
  assert.ok(main.includes('name="volume"'))
  assert.ok(main.includes('name="currentRate"'))
  assert.ok(main.includes('aria-label="Ihr Fortschritt"'))
  assert.ok(main.includes("Schritt ") && main.includes("von 3"))
  assert.ok(!main.includes('download="'))
  assert.ok(
    html.includes('rel="canonical" href="https://agenticit.ch/anfragen-check"'),
  )
  assert.ok(!html.includes('content="noindex'))
  assert.ok(!main.includes("nach Eingabe Ihrer Kontaktdaten"))
  assert.ok(main.includes("Ihr persönliches Ergebnis als PDF."))
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
})
test("relevant entry points and sitemap find the inquiry check", async () => {
  for (const path of [
    "/",
    "/werkzeuge",
    "/loesungen/revops-umsatzgenerierung",
  ]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.ok(
      html.includes(
        path.startsWith("/loesungen/")
          ? 'data-visual-lead-magnet="conversion"'
          : 'href="/anfragen-check"',
      ),
      path,
    )
  }
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  assert.ok(xml.includes("<loc>https://agenticit.ch/anfragen-check</loc>"))
})
