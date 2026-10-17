import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const areas = [
  ["begeistern", "/marketing-setup-check"],
  ["umsetzen", "/anfragen-check"],
  ["erschaffen", "/crm-ablauf-check"],
  ["erweitern", "/automatisierungs-check"],
] as const

function structuredData(html: string) {
  return [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
    .map(([, json]) => JSON.parse(json))
    .flat()
}

for (const [slug, check] of [["", "/kundenreise-check"], ...areas]) {
  const path = `/angebot${slug ? `/${slug}` : ""}`
  test(`${path} offers a useful next step without unsupported results or another contact gate`, async () => {
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.ok(main.length > 300)
    assert.equal([...main.matchAll(/<h1\b/g)].length, 1)
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch${path}"`),
    )
    assert.ok(html.includes('data-site-design="journey"'))
    assert.ok(
      main.includes(`href="${check}"`),
      `${path}: relevant check missing`,
    )
    assert.ok(main.includes('href="/kontakt"'))
    assert.doesNotMatch(main, /<form\b|<iframe\b/)
    assert.doesNotMatch(
      main,
      /\+200%|−70%|70%|Branchenstudie|Studien-Richtwerte|revDSG-konform|Belegte Wirkung|volle, verlässliche Kalender|Agentic Begeistern/,
    )
    const faq = structuredData(html).find((item) => item["@type"] === "FAQPage")
    assert.ok(faq)
    assert.equal(faq.mainEntity.length, 4)
    assert.equal([...main.matchAll(/<summary\b/g)].length, 4)
    for (const item of faq.mainEntity) {
      assert.ok(main.includes(item.name))
      const escaped = item.acceptedAnswer.text
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#x27;")
      assert.ok(
        main.includes(escaped),
        `${path}: FAQ differs from visible answer`,
      )
    }
    if (slug) {
      const tasks =
        main.match(
          /<ul\b[^>]*data-offer-tasks="true"[^>]*>([\s\S]*?)<\/ul>/,
        )?.[1] ?? ""
      assert.equal([...tasks.matchAll(/<li\b/g)].length, 4)
      assert.ok(main.includes("Was wir gemeinsam prüfen"))
      assert.ok(
        structuredData(html).some((item) => item["@type"] === "Service"),
      )
    } else {
      for (const title of ["Marketing", "Sales", "Verwaltung"])
        assert.ok(main.includes(`<h3>${title}</h3>`))
      for (const [area] of areas)
        assert.ok(main.includes(`href="/angebot/${area}"`))
      for (const service of [
        "gtm-markteintritt",
        "revops-umsatzgenerierung",
        "prozessautomatisierung",
      ]) {
        assert.ok(main.includes(`href="/loesungen/${service}"`))
      }
      const list = structuredData(html).find(
        (item) => item["@type"] === "CollectionPage",
      )
      assert.equal(list?.hasPart.length, 4)
    }
  })
}
