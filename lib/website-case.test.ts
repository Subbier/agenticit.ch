import assert from "node:assert/strict"
import test from "node:test"
import {
  caseStudyFaqs,
  pageSeo,
  serviceRelatedLinks,
  servicesRelatedLinks,
} from "./seo-faqs"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the public case page does not present unverified results, testimonials or legal guarantees", async () => {
  const response = await fetch(new URL("/case-studies", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.ok(
    !/74\s*%|Elena Müller|rechtssicher|nach 90 Tagen|8 Wochen bis Live-Betrieb/i.test(
      html,
    ),
    "Unverified case claims must not be rendered in the page or metadata",
  )
  assert.ok(
    html.includes('rel="canonical" href="https://agenticit.ch/case-studies"'),
  )
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
  assert.ok(main.includes("Eigenes Projekt"))
  assert.ok(main.includes("AgenticIT Website"))
  assert.ok(
    !/<form\b|<iframe\b/.test(main),
    "Show the case without a contact gate or an unverified third-party demo",
  )
})

test("the website case links the four real checks and describes verification limits", async () => {
  const html = await (await fetch(new URL("/case-studies", baseUrl))).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  for (const path of [
    "/kundenreise-check",
    "/marketing-setup-check",
    "/anfragen-check",
    "/automatisierungs-check",
  ])
    assert.ok(main.includes(`href="${path}"`), path)
  assert.ok(main.includes("Geschäftsergebnisse"))
  assert.ok(main.includes("Prüfstand"))
  assert.ok(main.includes("17. Oktober 2026"))
  const data = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => JSON.parse(json))
  assert.ok(data.some((entry) => entry["@type"] === "CollectionPage"))
  assert.ok(
    !data.some((entry) =>
      ["Review", "AggregateRating"].includes(entry["@type"]),
    ),
  )
  const visible = main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  const faq = data.find((entry) => entry["@type"] === "FAQPage")
  assert.equal(faq.mainEntity.length, 5)
  for (const entry of faq.mainEntity)
    assert.ok(visible.includes(entry.acceptedAnswer.text))
})

test("shared case references do not keep advertising the old unsupported results", () => {
  const references = [
    ...Object.values(serviceRelatedLinks).flat(),
    ...servicesRelatedLinks,
  ].filter((entry) => entry.href === "/case-studies")
  assert.ok(references.length > 0)
  const content = JSON.stringify([
    references,
    pageSeo["case-studies"],
    caseStudyFaqs,
  ])
  assert.ok(!/74\s*%|advok\.app|Elena Müller|nach 90 Tagen/.test(content))
  assert.equal(caseStudyFaqs.length, 5)
})

test("the collaboration page makes the real website case discoverable", async () => {
  const response = await fetch(new URL("/zusammenarbeit", baseUrl))
  assert.equal(response.status, 200)
  assert.ok((await response.text()).includes('href="/case-studies"'))
})
