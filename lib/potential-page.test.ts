import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import { leadSchema } from "./lead-intake"
import { planningFaqs } from "./potenzial-content"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the active calculator uses a source accepted by the lead endpoint", () => {
  const source = readFileSync(
    "components/site/potenzial-page.tsx",
    "utf8",
  ).match(/source: "([^"]+)"/)?.[1]
  assert.ok(source)
  assert.equal(
    leadSchema.safeParse({
      source,
      name: "Internal Test",
      email: "planner@example.invalid",
      consent: true,
      phone: "00000000",
    }).success,
    true,
    `The active form source ${source} must be accepted`,
  )
})

test("the potential page offers a transparent editable plan instead of unverified demand promises", async () => {
  const response = await fetch(new URL("/potenzial", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.doesNotMatch(
    main,
    /Das Problem ist nie die Nachfrage|keine Schätzung|keine Startkosten|15-köpfig|Datenbasis: Semrush/,
  )
  assert.match(main, /Kundenziel pro Monat/)
  assert.match(main, /Angenommene Abschlussquote/)
  assert.match(main, /keine Prognose/)
  assert.match(main, /Beispiel einsetzen/)
  assert.ok(
    !/<form\b/.test(main),
    "Contact is optional and opens only on request",
  )
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  assert.match(html, /rel="canonical" href="https:\/\/agenticit.ch\/potenzial"/)
  assert.ok(!html.includes('content="noindex'))
  const entities = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, value]) => {
    const data = JSON.parse(value)
    return Array.isArray(data) ? data : [data]
  })
  const faq = entities.find((entity) => entity["@type"] === "FAQPage")
  assert.ok(faq)
  assert.equal(faq.mainEntity.length, planningFaqs.length)
  for (const [index, item] of planningFaqs.entries()) {
    assert.ok(main.includes(item.q))
    assert.equal(faq.mainEntity[index].name, item.q)
    assert.equal(faq.mainEntity[index].acceptedAnswer.text, item.a)
  }
})

test("the existing calculator alias keeps its canonical destination", async () => {
  const response = await fetch(new URL("/potenzialrechner", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 308)
  assert.equal(
    new URL(response.headers.get("location")!, baseUrl).pathname,
    "/potenzial",
  )
})
