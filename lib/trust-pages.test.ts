import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

async function readSecurity() {
  const response = await fetch(new URL("/sicherheit", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.length > 0)
  return { html, main }
}

test("security information explains project decisions instead of promising a universal hosting setup", async () => {
  const { html, main } = await readSecurity()
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
  assert.ok(main.includes("KI nutzen. Daten im Blick."))
  assert.ok(
    html.includes('rel="canonical" href="https://agenticit.ch/sicherheit"'),
  )
  assert.ok(
    !/Ihre Daten bleiben (in der Schweiz|bei Ihnen)|Was lokal bleibt, kann nicht abfliessen|Sicher wie ein Schweizer Tresor|Antwort innert 24 Stunden|Keine Abhängigkeit von Fremdanbietern/i.test(
      main,
    ),
  )
  assert.ok(main.includes("Freigabe"))
  assert.ok(main.includes("Aufbewahrung"))
  assert.ok(main.includes("Anbieter"))
  assert.ok(!/<form\b/.test(main))
})

test("security FAQs and primary sources are visible and match the page's structured data", async () => {
  const { html, main } = await readSecurity()
  const data = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => JSON.parse(json))
  assert.ok(
    data.some(
      (item) =>
        item["@type"] === "WebPage" &&
        item.url === "https://agenticit.ch/sicherheit",
    ),
  )
  const faq = data.find((item) => item["@type"] === "FAQPage")
  assert.equal(faq?.mainEntity.length, 4)
  for (const question of faq.mainEntity) {
    for (const copy of [question.name, question.acceptedAnswer.text]) {
      const escaped = copy
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
      assert.ok(main.includes(escaped))
    }
  }
  for (const source of [
    "https://www.edoeb.admin.ch/de/ki-und-datenschutz",
    "https://www.bacs.admin.ch/de/csm26-s3-de",
    "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
  ])
    assert.ok(main.includes(`href="${source}"`))
})

test("security visitors can prepare a real task with the existing worksheet or contact the team directly", async () => {
  const { main } = await readSecurity()
  assert.ok(
    main.includes('href="/vorlagen/AgenticIT-KI-Einsatzkarte.txt?download=1"'),
  )
  assert.ok(main.includes("Aufgabe, Quellen, Befugnisse und Prüffälle"))
  assert.ok(main.includes('href="/kontakt"'))
  assert.ok(main.includes('href="/datenschutz"'))
  assert.ok(main.includes('id="kontakt"'))
})

for (const path of ["/unternehmen", "/ueber-uns"]) {
  test(`${path} preserves a permanent redirect to useful company information`, async () => {
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(response.status, 308)
    assert.equal(
      new URL(response.headers.get("location") ?? "", baseUrl).pathname,
      "/zusammenarbeit",
    )
    const target = await fetch(new URL("/zusammenarbeit", baseUrl))
    assert.equal(target.status, 200)
    const html = await target.text()
    assert.ok(html.includes("AgenticIT GmbH"))
    assert.ok(html.includes("CHE-157.845.314"))
    assert.ok(html.includes('href="/kontakt"'))
  })
}

test("company information offers the security explanation in its actual project context", async () => {
  const html = await (await fetch(new URL("/zusammenarbeit", baseUrl))).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.includes('href="/sicherheit"'))
})
