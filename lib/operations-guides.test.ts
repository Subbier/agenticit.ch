import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { getPost } from "./blog"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const guides = [
  {
    slug: "ki-sprachassistent-telefonie",
    resource: "/vorlagen/AgenticIT-Telefonassistent-Pruefplan.txt",
    terms: ["ECHTE TELEFONSTRECKE", "TERMINE", "MENSCHLICHE ÜBERNAHME"],
    rejected: /Kein verpasster Anruf mehr|wenigen Wochen realistisch/,
  },
  {
    slug: "ki-automatisierung-vertrieb",
    resource: "/vorlagen/AgenticIT-Anfrage-CRM-Pruefplan.txt",
    terms: ["ZIELSYSTEM", "DUBLETTEN", "FEHLERFALL", "FREIGABE"],
    rejected:
      /fünf wirkungsvollsten|4 zusätzliche Verkaufsstunden|Schweizer-konformen Leitplanken/,
  },
] as const

for (const guide of guides) {
  test(`${guide.slug} offers a sourced decision guide without unsupported promises`, () => {
    const post = getPost(guide.slug)!
    assert.equal(post.date, "2026-07-24")
    assert.equal(post.updated, "2026-10-19")
    assert.equal(post.resource?.href, guide.resource)
    assert.equal(post.nextStep?.href, "/anfragen-check")
    assert.ok(post.sources.length >= 2)
    assert.equal(post.faq.length, 4)
    assert.ok(!guide.rejected.test(post.html))
    assert.ok(post.html.includes("Prüfplan"))
  })

  test(`${guide.slug} renders matching evidence, dates and optional next steps`, async () => {
    const post = getPost(guide.slug)!
    const response = await fetch(new URL(`/blog/${guide.slug}`, baseUrl))
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = (
      html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    ).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(!/<form\b/.test(main))
    assert.ok(main.includes(`href="${guide.resource}"`))
    assert.ok(main.includes('href="/anfragen-check"'))
    assert.ok(!guide.rejected.test(main))
    assert.ok(
      html.includes(
        `rel="canonical" href="https://agenticit.ch/blog/${guide.slug}"`,
      ),
    )
    for (const source of post.sources)
      assert.ok(main.includes(`href="${source.url}"`))
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json))
    const article = data.find((item) => item["@type"] === "Article")
    assert.equal(article.datePublished, post.date)
    assert.equal(article.dateModified, post.updated)
    const faq = data.find((item) => item["@type"] === "FAQPage")
    assert.equal(faq.mainEntity.length, 4)
    for (const entry of faq.mainEntity)
      assert.ok(main.includes(entry.acceptedAnswer.text.replace(/&/g, "&amp;")))
  })

  test(`${guide.slug} serves the complete editable checklist without a contact gate`, async () => {
    const response = await fetch(new URL(guide.resource, baseUrl))
    assert.equal(response.status, 200)
    const text = await response.text()
    assert.equal(
      text,
      readFileSync(
        `content/downloads/${guide.resource.split("/").pop()}`,
        "utf8",
      ),
    )
    for (const term of guide.terms) assert.ok(text.includes(term), term)
    assert.ok(text.includes("nicht automatisch"))
    assert.ok(text.includes("Keine Passwörter"))
    assert.ok(text.includes("Ist-Ergebnis:"))
    assert.ok(text.includes("Nachweis:"))
  })
}

test("Sales visitors can reach the CRM guide and the voice guide connects related work", async () => {
  const sales = await (
    await fetch(new URL("/loesungen/revops-umsatzgenerierung", baseUrl))
  ).text()
  assert.ok(sales.includes('href="/blog/ki-automatisierung-vertrieb"'))
  const voice = await (
    await fetch(new URL("/blog/ki-sprachassistent-telefonie", baseUrl))
  ).text()
  assert.ok(voice.includes('href="/blog/ki-automatisierung-vertrieb"'))
})
