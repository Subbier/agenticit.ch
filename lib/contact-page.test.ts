import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

async function readContactPage() {
  const response = await fetch(new URL("/kontakt", baseUrl), {
    signal: AbortSignal.timeout(20_000),
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.length > 0)
  return main
}

test("contact fields keep their names after typing and support browser autofill", async () => {
  const main = await readContactPage()
  for (const [name, autocomplete] of [
    ["name", "name"],
    ["email", "email"],
    ["phone", "tel"],
    ["company", "organization"],
    ["message", null],
  ] as const) {
    const id = `contact-${name}`
    const field = main.match(
      new RegExp(`<(?:input|textarea)\\b[^>]*id="${id}"[^>]*>`),
    )?.[0]
    assert.ok(field, `${name}: field identifier missing`)
    assert.match(
      main,
      new RegExp(`<label\\b[^>]*for="${id}"[^>]*>[^<]+`),
      `${name}: persistent label missing`,
    )
    assert.ok(
      field.includes(`name="${name}"`),
      `${name}: browser field name missing`,
    )
    if (autocomplete) {
      assert.ok(
        field.includes(`autoComplete="${autocomplete}"`),
        `${name}: autofill hint missing`,
      )
    }
  }
})

test("the contact form comes before secondary company information in reading and keyboard order", async () => {
  const main = await readContactPage()
  assert.ok(main.indexOf("<form") >= 0)
  assert.ok(
    main.indexOf("<form") < main.indexOf('href="tel:'),
    "the form is buried below secondary contact information",
  )
  assert.ok(main.includes("Mit * markierte Felder sind erforderlich."))
  assert.match(main, /<label\b[^>]*for="contact-consent"/)
  assert.match(main, /<input\b[^>]*id="contact-consent"[^>]*required=""/)
  assert.ok(main.includes('href="/datenschutz"'))
  assert.match(main, /<button\b[^>]*type="submit"[^>]*disabled=""/)
})
