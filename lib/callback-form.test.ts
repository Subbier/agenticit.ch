import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

for (const path of ["/blog", "/branchen/treuhand", "/voiceagent"])
  test(`${path}: the callback form keeps six labels, its page and a privacy link`, async () => {
    const response = await fetch(new URL(path, baseUrl))
    assert.equal(response.status, 200)
    const page = await response.text()
    const html =
      page.match(
        /<form\b[^>]*aria-label="Persönlichen Rückruf anfragen"[\s\S]*?<\/form>/,
      )?.[0] ?? ""
    assert.ok(html.length > 300)
    assert.ok(html.includes(`data-callback-page="${path}"`))
    const controls = [...html.matchAll(/<(?:input|select)\b[^>]*>/g)].map(
      ([tag]) => tag,
    )
    for (const field of [
      "firstName",
      "lastName",
      "company",
      "phone",
      "email",
      "goal",
    ]) {
      const control = controls.find((tag) => tag.includes(`name="${field}"`))
      assert.ok(control, `Missing named field: ${field}`)
      const id = control.match(/\bid="([^"]+)"/)?.[1]
      assert.ok(id)
      assert.ok(
        html.includes(`for="${id}"`),
        `Missing persistent label: ${field}`,
      )
    }
    assert.ok(html.includes('href="/datenschutz"'))
    const privacy = html.match(/<a\b[^>]*href="\/datenschutz"[^>]*>/)?.[0] ?? ""
    assert.ok(privacy.includes('target="_blank"'))
    assert.ok(privacy.includes('rel="noopener noreferrer"'))
    assert.ok(privacy.includes("neuer Tab"))
    assert.ok(html.includes("Rückruf anfragen"))
    assert.doesNotMatch(html, /– kostenlos|DSG-konform|Antwort innert/)
    assert.doesNotMatch(html, /type="checkbox"[^>]*checked/)
  })
