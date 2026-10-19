import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { getPost } from "./blog"
import sitemap from "../app/sitemap"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const guides = [
  {
    slug: "werbung-fuer-kmu",
    nextStep: "/marketing-setup-check",
    rejected:
      /nur für echte Klicks|meist der effizienteste Franken|reinen Rechenaufgabe|will.*jetzt.*kaufen|ohne Streuverlust/,
  },
  {
    slug: "speed-to-lead-5-minuten-regel",
    nextStep: "/anfragen-check",
    rejected:
      /21.fach|21×|40–60|unter 60 Sekunden|innerhalb einer Minute|verlieren Sie messbar Umsatz|nDSG- und DSGVO-konform/,
  },
] as const

for (const guide of guides) {
  test(`${guide.slug} replaces unsupported promises with a sourced decision and matching check`, () => {
    const post = getPost(guide.slug)!
    assert.ok(post)
    assert.equal(post.date, "2026-07-24")
    assert.equal(post.updated, "2026-10-19")
    assert.equal(post.nextStep?.href, guide.nextStep)
    assert.equal(post.faq.length, 4)
    assert.ok(post.sources.length >= 2)
    assert.ok(post.sources.every(({ url }) => url.startsWith("https://")))
    assert.doesNotMatch(JSON.stringify(post), guide.rejected)
    assert.equal(
      sitemap().find(({ url }) => url.endsWith(`/blog/${guide.slug}`))
        ?.lastModified,
      "2026-10-19",
    )
  })

  test(`${guide.slug} serves visible evidence and matching structured answers without a contact gate`, async () => {
    const response = await fetch(new URL(`/blog/${guide.slug}`, baseUrl), {
      redirect: "manual",
    })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = (
      html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    ).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    const post = getPost(guide.slug)!
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(!/<form\b/.test(main))
    assert.doesNotMatch(main, guide.rejected)
    assert.ok(main.includes(`href="${guide.nextStep}"`))
    assert.ok(
      html.includes(
        `rel="canonical" href="https://agenticit.ch/blog/${guide.slug}"`,
      ),
    )
    for (const { url } of post.sources)
      assert.ok(main.includes(`href="${url}"`))
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json))
    const article = data.find((entry) => entry["@type"] === "Article")
    assert.equal(article.datePublished, post.date)
    assert.equal(article.dateModified, post.updated)
    const faq = data.find((entry) => entry["@type"] === "FAQPage")
    assert.equal(faq.mainEntity.length, 4)
    for (const entry of faq.mainEntity) {
      assert.ok(main.includes(entry.name))
      assert.ok(main.includes(entry.acceptedAnswer.text.replace(/&/g, "&amp;")))
    }
  })
}

test("advertising readers can reuse the complete existing acquisition plan", async () => {
  const post = getPost("werbung-fuer-kmu")!
  assert.equal(post.resource?.href, "/vorlagen/AgenticIT-Akquise-Plan.txt")
  const response = await fetch(new URL(post.resource!.href, baseUrl))
  assert.equal(response.status, 200)
  const text = await response.text()
  assert.equal(
    text,
    readFileSync(
      `content/downloads/${post.resource!.href.split("/").pop()}`,
      "utf8",
    ),
  )
  for (const term of [
    "Kanal und Begründung",
    "Kostenbestandteile",
    "TEAMÜBERGABE",
    "WIRKUNG AUSWERTEN",
  ])
    assert.ok(text.includes(term))
})

test("response-time guidance distinguishes acknowledgement, attempt and actual conversation", () => {
  const post = getPost("speed-to-lead-5-minuten-regel")!
  for (const term of [
    "Eingangsbestätigung",
    "Kontaktversuch",
    "Geschäftszeit",
    "Vertretung",
  ])
    assert.ok(post.html.includes(term), term)
  assert.ok(post.html.includes("Beispiel"))
  assert.ok(post.html.includes('href="/crm-ablauf-check"'))
})
