import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const services = [
  ["ki-entwicklung", /KI-Entwicklung/],
  ["webdesign", /Webdesign/],
  ["prozessautomatisierung", /Prozessautomatisierung/],
  ["gtm-markteintritt", /Marketing/],
  ["revops-umsatzgenerierung", /Sales/],
] as const

test("desktop and mobile offer navigation expose all five services on every page", async () => {
  const expected = services.map(([slug]) => `/loesungen/${slug}`)
  for (const path of ["/", "/blog/ki-agenten"]) {
    const response = await fetch(new URL(path, baseUrl))
    assert.equal(response.status, 200)
    const html = await response.text()
    const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1] ?? ""
    for (const view of ["desktop", "mobile"]) {
      const group = header.match(
        new RegExp(`data-offer-navigation="${view}"[\\s\\S]*?<\\/(?:details|div)>`),
      )?.[0]
      assert.ok(group, `${path}: ${view} offer navigation is missing`)
      assert.match(group, /Angebote/)
      const destinations = [...group.matchAll(/<a\b[^>]*>/g)]
        .map(([tag]) => tag)
        .filter((tag) => tag.includes("data-offer-link"))
        .map((tag) => tag.match(/href="([^"]+)"/)?.[1])
      assert.deepEqual(destinations, expected, `${path}: ${view}`)
      assert.ok(group.includes('href="/pakete"'))
    }
  }
})

for (const [slug, intent] of services) {
  test(`${slug} serves its own useful, indexable service page`, async () => {
    const path = `/loesungen/${slug}`
    const response = await fetch(new URL(path, baseUrl), {
      redirect: "manual",
    })
    assert.equal(response.status, 200, "Service intent must not be redirected")
    const html = await response.text()
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)]
    assert.equal(headings.length, 1)
    assert.match(headings[0][1], intent)
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch${path}"`),
    )
    assert.ok(html.includes('content="index, follow"'))
    assert.ok(html.includes('data-site-design="journey"'))
    assert.ok(html.includes('"@type":"Service"'))
    assert.ok(html.includes('href="/datenschutz"'))
    assert.match(
      html,
      /href="\/(automatisierungs-check|kundenreise-check|marketing-setup-check|anfragen-check)/,
    )
    assert.ok((html.match(/<details\b/g) ?? []).length >= 4)
  })
}

for (const [slug, checkHref] of [
  ["gtm-markteintritt", "/marketing-setup-check"],
  ["revops-umsatzgenerierung", "/anfragen-check"],
]) {
  test(`${slug} explains the service without invented results and offers a relevant check`, async () => {
    const response = await fetch(new URL(`/loesungen/${slug}`, baseUrl))
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main.includes(`href="${checkHref}"`))
    assert.ok(
      !/171\s*%|fehlerfrei|24\/7, auch am Sonntag|Daten bleiben in der Schweiz/.test(
        main,
      ),
    )
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json))
    const faq = data.find((item) => item["@type"] === "FAQPage")
    assert.equal(faq?.mainEntity.length, 5)
    for (const question of faq.mainEntity) {
      assert.ok(main.includes(question.name.replace(/&/g, "&amp;")))
      assert.ok(
        main.includes(question.acceptedAnswer.text.replace(/&/g, "&amp;")),
      )
    }
    assert.ok(main.includes("Freigabe"), "The team must retain control")
    assert.ok(main.includes("Kosten"), "Scope and costs must be explained")
  })
}

test("the service overview links to every new core service", async () => {
  const html = await (await fetch(new URL("/pakete", baseUrl))).text()
  for (const [slug] of services)
    assert.ok(html.includes(`href="/loesungen/${slug}"`), slug)
})

test("the sitemap includes canonical core services and excludes test leads", async () => {
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  for (const [slug] of services)
    assert.ok(xml.includes(`<loc>https://agenticit.ch/loesungen/${slug}</loc>`))
  assert.ok(!xml.includes("beste-variante"))
})
