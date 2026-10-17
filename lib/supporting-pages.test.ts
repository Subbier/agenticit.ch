import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const pages = [
  ["/loesungen", /Marketing/, "/kundenreise-check", "CollectionPage"],
  ["/technologie", /Technik/, "/automatisierungs-check", "CollectionPage"],
  [
    "/technologie/autonome-ki-agenten",
    /KI-Agenten/,
    "/anfragen-check",
    "Service",
  ],
  [
    "/technologie/multi-agenten-systeme",
    /Mehrere KI-Agenten/,
    "/automatisierungs-check",
    "Service",
  ],
  [
    "/technologie/enterprise-integration",
    /Systeme/,
    "/crm-ablauf-check",
    "Service",
  ],
] as const

for (const [path, intent, check, kind] of pages) {
  test(`${path} explains the offer honestly and offers a relevant next step`, async () => {
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main.length > 0)
    const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)]
    assert.equal(headings.length, 1)
    assert.match(headings[0][1], intent)
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch${path}"`),
    )
    assert.ok(main.includes(`href="${check}"`))
    assert.ok(main.includes("Freigabe"))
    assert.ok(main.includes('href="/kontakt"'))
    assert.ok(main.includes('id="kontakt"'))
    assert.ok(
      !/171\s*%|Volle Kalender|Daten bleiben in der Schweiz|Schweizer Server|ohne Ihr Zutun|Antwort innert 24 Stunden|Ã¼|Engpass garantiert|Aufgabe halbiert|Kein Systemwechsel, kein Umbau/i.test(
        main,
      ),
    )
    assert.ok(
      !/<form\b/.test(main),
      "Let visitors use the check before asking for contact details",
    )
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, value]) => JSON.parse(value))
    assert.ok(data.some((item) => item["@type"] === kind))
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
        assert.ok(
          main.includes(escaped),
          `${path}: structured FAQ differs from visible text`,
        )
      }
    }
  })
}

test("the solution hub links to all five specific services rather than relying on card positions", async () => {
  const html = await (await fetch(new URL("/loesungen", baseUrl))).text()
  for (const slug of [
    "gtm-markteintritt",
    "revops-umsatzgenerierung",
    "ki-entwicklung",
    "webdesign",
    "prozessautomatisierung",
  ]) {
    assert.ok(html.includes(`href="/loesungen/${slug}"`), slug)
  }
})

test("each solution area has four clear tasks and links to its matching service", async () => {
  const html = await (await fetch(new URL("/loesungen", baseUrl))).text()
  const cards = [
    ...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g),
  ].map(([, card]) => card)
  assert.equal(cards.length, 3)
  for (const [name, slug] of [
    ["Marketing", "gtm-markteintritt"],
    ["Sales", "revops-umsatzgenerierung"],
    ["Digitalisierung &amp; KI", "prozessautomatisierung"],
  ]) {
    const card = cards.find((value) =>
      new RegExp(`<h3[^>]*>${name}</h3>`).test(value),
    )
    assert.ok(card, name)
    assert.equal((card.match(/<li\b/g) ?? []).length, 4)
    assert.ok(card.includes(`href="/loesungen/${slug}"`), name)
  }
})

test("technology details offer a usable worksheet, a guide and their architecture sources", async () => {
  for (const [path] of pages.slice(2)) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    assert.match(html, /href="[^\"]+\?download=1"/)
    assert.match(html, /href="\/blog\//)
    assert.ok(
      html.includes(
        'href="https://www.anthropic.com/engineering/building-effective-agents"',
      ),
    )
    assert.ok(
      html.includes(
        'href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"',
      ),
    )
  }
})
