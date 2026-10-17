import assert from "node:assert/strict"
import test from "node:test"
import { allIndustryFocus, relatedIndustries } from "./industry-sectors"
import { industryFocus } from "./industry-focus"
import { BRANCHEN_LPS } from "./branchen-content"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const sectors = {
  treuhand: "/automatisierungs-check",
  gastronomie: "/anfragen-check",
  gesundheit: "/crm-ablauf-check",
  autohaus: "/anfragen-check",
  immobilien: "/anfragen-check",
  fitness: "/marketing-setup-check",
  handwerk: "/automatisierungs-check",
  hotellerie: "/anfragen-check",
} as const

test("reviewed sector content covers existing URLs without expanding the primary audience", () => {
  assert.deepEqual(
    allIndustryFocus.map((item) => item.slug).sort(),
    BRANCHEN_LPS.map((item) => item.slug).sort(),
  )
  assert.equal(new Set(allIndustryFocus.map((item) => item.slug)).size, 10)
  assert.deepEqual(
    industryFocus.map((item) => item.slug),
    ["beratung", "versicherungen"],
  )
  for (const focus of allIndustryFocus) {
    const related = relatedIndustries(focus)
    assert.ok(related.length >= 1 && related.length <= 2)
    assert.ok(related.every((item) => item.slug !== focus.slug))
    if (focus.relatedSlugs)
      assert.deepEqual(
        related.map((item) => item.slug).sort(),
        [...focus.relatedSlugs].sort(),
      )
  }
})

for (const [slug, check] of Object.entries(sectors)) {
  test(`${slug} explains three connected services without invented results`, async () => {
    const path = `/branchen/${slug}`
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" })
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
    const areas =
      main.match(
        /<section\b[^>]*id="bereiche"[^>]*>([\s\S]*?)<\/section>/,
      )?.[1] ?? ""
    const cards = [...areas.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)]
    assert.equal(
      cards.length,
      3,
      "Marketing, Sales and Verwaltung must show concrete tasks",
    )
    for (const [index, [, card]] of cards.entries()) {
      assert.ok(card.includes(["Marketing", "Sales", "Verwaltung"][index]))
      assert.equal((card.match(/<li\b/g) ?? []).length, 4)
    }
    assert.ok(main.includes(`href="${check}"`), "Use an existing useful check")
    assert.ok(
      !/24\/7|100\s*%|nDSG-konform|DSGVO-konform|Compliance inklusive|keine verpassten|garantiert|30 Std\.|12 %|21.600|unter 5 Min\./i.test(
        main,
      ),
    )
    const json = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, value]) => JSON.parse(value))
    const faq = json.find((entry) => entry["@type"] === "FAQPage")
    assert.equal(faq?.mainEntity.length, 5)
    for (const entry of faq.mainEntity) {
      assert.ok(main.includes(entry.name))
      assert.ok(main.includes(entry.acceptedAnswer.text))
    }
    assert.ok(json.some((entry) => entry["@type"] === "Service"))
    assert.ok(
      html.includes(`rel="canonical" href="https://agenticit.ch${path}"`),
    )
    assert.ok(!/<meta[^>]+name="robots"[^>]+noindex/.test(html))
    assert.equal((main.match(/<details\b/g) ?? []).length, 5)
  })
}

test("healthcare examples distinguish reception tasks from medical decisions", async () => {
  const html = await (
    await fetch(new URL("/branchen/gesundheit", baseUrl))
  ).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.match(
    main,
    /Diagnosen, Behandlungen und die Beurteilung der Dringlichkeit bleiben beim medizinischen Fachpersonal/,
  )
  assert.match(main, /keine Patientendaten/i)
  assert.match(main, /Berufsgeheimnis/)
})

test("all reviewed industry pages retain a compact route to other relevant sectors", async () => {
  for (const slug of ["beratung", "versicherungen", ...Object.keys(sectors)]) {
    const html = await (
      await fetch(new URL(`/branchen/${slug}`, baseUrl))
    ).text()
    const related =
      html.match(
        /<nav\b[^>]+aria-label="Weitere Branchen"[^>]*>([\s\S]*?)<\/nav>/,
      )?.[1] ?? ""
    const links = [...related.matchAll(/href="([^"]+)"/g)].map(
      ([, href]) => href,
    )
    assert.ok(links.length >= 2 && links.length <= 3, slug)
    assert.ok(links.includes("/branchen"), slug)
    assert.ok(!links.includes(`/branchen/${slug}`), slug)
  }
})
