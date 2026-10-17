import assert from "node:assert/strict"
import test from "node:test"
import { websiteCase } from "./website-case"
import { calculateAcquisitionPlan } from "./acquisition-planner"
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

test("the website case links five checks plus the planner and describes verification limits", async () => {
  assert.equal(
    websiteCase.tools.filter((tool) => tool.kind === "check").length,
    5,
  )
  assert.equal(
    websiteCase.tools.filter((tool) => tool.kind === "planner").length,
    1,
  )
  const html = await (await fetch(new URL("/case-studies", baseUrl))).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  for (const path of [
    "/kundenreise-check",
    "/marketing-setup-check",
    "/anfragen-check",
    "/automatisierungs-check",
    "/crm-ablauf-check",
    "/potenzial",
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
  const collection = data.find((entry) => entry["@type"] === "CollectionPage")
  const items = collection.mainEntity.itemListElement
  assert.equal(items.length, 6)
  assert.deepEqual(
    items.map((item: { position: number }) => item.position),
    [1, 2, 3, 4, 5, 6],
  )
  for (const item of items)
    assert.ok(main.includes(`href="${new URL(item.url).pathname}"`))
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

test("the visible planning example uses the existing calculator and labels its assumptions", async () => {
  const result = calculateAcquisitionPlan(websiteCase.exampleInput)
  assert.ok(result)
  assert.equal(result.requiredInquiries, 40)
  assert.equal(result.handlingMinutes, 600)
  const html = await (await fetch(new URL("/case-studies", baseUrl))).text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.match(main, /Frei gewählte Planungswerte/)
  assert.match(main, /Rechenweg ansehen/)
  assert.match(main, /href="\/potenzial"/)
  const visible = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")
  assert.match(visible, /Passende Anfragen\s+40/)
  assert.match(visible, /Zeitbedarf\s+10\s+Stunden/)
  assert.doesNotMatch(visible, /vier Checks|Vier Checks|Die vier verlinkten/)
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
