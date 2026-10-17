import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { company } from "./company"
import { coreServices } from "./core-services"
import { SITE_URL } from "./seo"
import sitemap from "../app/sitemap"

const text = readFileSync("public/llms.txt", "utf8")
const localUrls = [
  ...text.matchAll(/\]\((https:\/\/agenticit\.ch\/[^\s)]+)\)/g),
].map((match) => match[1])

test("the AI reference agrees with verified company facts and current services", () => {
  assert.match(text, /^# AgenticIT\b/)
  for (const fact of [
    company.legalName,
    company.email,
    company.phoneLabel,
    company.address.streetAddress,
    company.address.postalCode,
    company.address.addressLocality,
    company.uid,
    company.registerUrl,
  ])
    assert.ok(text.includes(fact), fact)
  for (const service of coreServices)
    assert.ok(
      localUrls.includes(`${SITE_URL}/loesungen/${service.slug}`),
      service.slug,
    )
})

test("the AI reference does not revive retired price, hosting, timing or editorial promises", () => {
  assert.doesNotMatch(
    text,
    /Agentic IT GmbH|Datenhaltung in der Schweiz|unter 60 Sekunden|rund um die Uhr|CHF\s*[\d']|Retainer ab|4–8 Wochen|von Menschen geprüft/,
  )
  assert.ok(text.includes("vor dem Auftrag"))
  assert.ok(text.includes("menschliche Freigabe"))
})

test("the AI reference directs readers only to canonical public site pages", () => {
  const publicUrls = new Set(sitemap().map((entry) => entry.url))
  assert.ok(localUrls.length >= 10)
  assert.equal(new Set(localUrls).size, localUrls.length)
  for (const url of localUrls) {
    assert.ok(publicUrls.has(url), url)
    assert.equal(new URL(url).search, "")
    assert.equal(new URL(url).hash, "")
  }
  assert.ok(
    !/beste-variante|localhost|127\.0\.0\.1|admin\.agenticit/.test(text),
  )
})

test("the existing reference endpoint serves the reviewed plain text publicly", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  const response = await fetch(new URL("/llms.txt", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/)
  assert.equal(
    (await response.text()).replace(/\r\n/g, "\n"),
    text.replace(/\r\n/g, "\n"),
  )
})

test("every listed AgenticIT destination responds with its own indexable canonical page", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  await Promise.all(
    localUrls.map(async (url) => {
      const response = await fetch(new URL(new URL(url).pathname, baseUrl), {
        redirect: "manual",
      })
      assert.equal(response.status, 200, url)
      const html = await response.text()
      assert.ok(html.includes(`rel="canonical" href="${url}"`), url)
      assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), url)
    }),
  )
})
