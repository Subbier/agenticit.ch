import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import {
  projectStartFaqs,
  projectStartResource,
  projectStartStages,
} from "./project-start"
import { buildJourneyPlan } from "./journey"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the project start plan covers scope, access, acceptance and the handover without collecting secrets", () => {
  const text = readFileSync(`public${projectStartResource.href}`, "utf8")
  assert.equal(projectStartStages.length, 5)
  assert.equal(new Set(projectStartStages.map((s) => s.id)).size, 5)
  for (const term of [
    "ZIEL",
    "AUFTRAG",
    "ZUSTÄNDIGKEITEN",
    "ZUGRIFFE",
    "PRÜFUNG UND ABNAHME",
    "BETRIEB UND ÜBERGABE",
    "Keine Passwörter",
    "menschliche Freigabe",
    "zusätzliche Arbeiten",
    "nicht mehr benötigte Zugriffe",
  ])
    assert.ok(text.includes(term), term)
  assert.ok(text.includes("Erwartung | tatsächliches Ergebnis | Nachweis"))
  assert.ok(!/Passwort\s*:|API-Schlüssel\s*:|CHF\s*\d|\d+\s*%|24\/7/.test(text))
})

test("the collaboration page offers a clear project entry, five native expandable stages and matching FAQs", async () => {
  const response = await fetch(new URL("/zusammenarbeit", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
  assert.ok(main.includes('href="/kontakt"'))
  assert.ok(main.includes(`href="${projectStartResource.href}"`))
  assert.ok(main.includes(`href="${projectStartResource.downloadHref}"`))
  assert.ok(main.includes(`download="${projectStartResource.filename}"`))
  const heroTemplateLink = [
    ...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g),
  ].find(([, , content]) => content.includes("Startvorlage mitnehmen"))
  assert.ok(heroTemplateLink)
  assert.ok(
    heroTemplateLink[1].includes(`href="${projectStartResource.downloadHref}"`),
  )
  assert.ok(
    heroTemplateLink[1].includes(`download="${projectStartResource.filename}"`),
  )
  for (const stage of projectStartStages) {
    assert.ok(main.includes(stage.title), stage.title)
    assert.ok(main.includes(stage.gate), stage.gate)
  }
  const data = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => JSON.parse(json))
  const faq = data.find((item) => item["@type"] === "FAQPage")
  assert.equal(faq?.mainEntity.length, projectStartFaqs.length)
  for (const item of projectStartFaqs) assert.ok(main.includes(item.question))
  assert.ok(!/<form\b/.test(main))
  assert.ok(
    html.includes('rel="canonical" href="https://agenticit.ch/zusammenarbeit"'),
  )
})

test("the public project start worksheet matches its editable original", async () => {
  const response = await fetch(new URL(projectStartResource.href, baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  assert.deepEqual(
    Buffer.from(await response.arrayBuffer()),
    readFileSync(`public${projectStartResource.href}`),
  )
})

test("the download response is a named attachment while the separate view stays readable", async () => {
  const download = await fetch(
    new URL(projectStartResource.downloadHref, baseUrl),
  )
  assert.equal(download.status, 200)
  assert.equal(
    download.headers.get("content-disposition"),
    `attachment; filename="${projectStartResource.filename}"`,
  )
  assert.deepEqual(
    Buffer.from(await download.arrayBuffer()),
    readFileSync(`public${projectStartResource.href}`),
  )
  for (const path of [
    projectStartResource.href,
    `${projectStartResource.href}?download=0`,
  ]) {
    const view = await fetch(new URL(path, baseUrl))
    assert.equal(view.status, 200)
    const disposition = view.headers.get("content-disposition")
    assert.ok(
      disposition === null || /^inline(?:;|$)/.test(disposition),
      "The normal view must remain inline; hosting may provide an explicit filename",
    )
    assert.match(view.headers.get("content-type") ?? "", /text\/plain/)
  }
})

test("the existing onboarding result keeps the reusable project start worksheet accessible", () => {
  const plan = buildJourneyPlan({
    challenge: "onboarding",
    channel: "web",
    system: "manual",
  })
  assert.ok(
    plan.download.includes(`https://agenticit.ch${projectStartResource.href}`),
  )
  assert.ok(plan.template.includes("Verantwortlich"))
})
