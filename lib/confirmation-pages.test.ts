import assert from "node:assert/strict"
import test from "node:test"
const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

for (const path of ["/danke", "/danke-auswertung"])
  test(`${path} explains next steps without claiming a submission or an automatic dispatch`, async () => {
    const response = await fetch(new URL(path, baseUrl))
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main)
    assert.doesNotMatch(
      main,
      /Anfrage erhalten|Ihre Anfrage ist da|Auswertung ist unterwegs|Sie erhalten demnächst|innerhalb eines Werktags|Schnupper-Abo|advok\.app|76 202 01 36/,
    )
    assert.match(html, /content="noindex, nofollow"/)
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
    assert.match(main, /href="\/kontakt"/)
    assert.match(main, /info@agenticit\.ch/)
    assert.ok(!/<form\b/.test(main))
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? ""
    assert.equal((title.match(/AgenticIT/g) ?? []).length, 1)
  })

test("the active callback form labels required contact fields and offers privacy before sending", async () => {
  const html = await (await fetch(new URL("/excellence", baseUrl))).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  const form = main.match(/<form\b[^>]*>([\s\S]*?)<\/form>/)?.[1] ?? ""
  assert.ok(form)
  assert.match(
    form,
    /<input[^>]*name="phone"[^>]*required|<input[^>]*required[^>]*name="phone"/,
  )
  assert.match(form, /href="\/datenschutz"/)
  assert.match(
    form,
    /type="checkbox"[^>]*required|<input[^>]*required[^>]*type="checkbox"/,
  )
  assert.doesNotMatch(form, /text-white|bg-black|text-red-100|text-\[#57C7FF\]/)
})

test("the legacy marketing page keeps useful examples without blanket credentials or outcomes", async () => {
  const html = await (await fetch(new URL("/excellence", baseUrl))).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.doesNotMatch(
    main,
    /Akkreditiert|akkreditiert|zertifiziert|ohne Lernkurve|Keine Lernkurve|Sofort-Reaktion|verlässlicher Strom|nichts geht verloren|Keine Umstellung|Kein Aufwand/,
  )
  assert.match(main, /marketing-setup-check/)
  assert.match(main, /Beispiel/)
})
