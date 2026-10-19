import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import {
  organizationJsonLd,
  websiteJsonLd,
  serviceJsonLd,
  articleJsonLd,
  toolPageJsonLd,
  SITE_URL,
} from "./seo"
import { impressumSections } from "./legal-impressum"
import { datenschutzSections } from "./legal-datenschutz"

const entityId = `${SITE_URL}/#organization`
const registerUrl = "https://www.uid.admin.ch/Detail.aspx?uid_id=CHE157845314"

test("identity unit: company name, address and UID match the official UID register entry", () => {
  const entity = organizationJsonLd() as Record<string, any>
  assert.equal(entity.name, "AgenticIT GmbH")
  assert.equal(entity["@id"], entityId)
  assert.equal(entity.address.streetAddress, "Eschenweg 12")
  assert.equal(entity.address.postalCode, "3072")
  assert.equal(entity.address.addressLocality, "Ostermundigen")
  assert.equal(entity.identifier.value, "CHE-157.845.314")
  assert.ok(entity.sameAs.includes(registerUrl))
})

test("identity unit: global facts contain no assumed hours, coordinates, prices or hosting guarantee", () => {
  const entity = organizationJsonLd() as Record<string, any>
  for (const field of [
    "openingHoursSpecification",
    "geo",
    "priceRange",
    "parentOrganization",
  ])
    assert.equal(entity[field], undefined, field)
  assert.doesNotMatch(
    JSON.stringify(entity),
    /Datenhaltung in der Schweiz|Daten sicher in der Schweiz|messbarem ROI/,
  )
  assert.equal(entity.email, "info@agenticit.ch")
  assert.equal(entity.telephone, "+41315394444")
  assert.equal(entity.memberOf[0].name, "Swico")
  assert.ok(entity.sameAs.every((url: string) => !url.includes("swico.ch")))
})

test("identity unit: services, articles and tools refer to the same company", () => {
  const service = serviceJsonLd({
    name: "Webdesign",
    description: "Website planen",
    path: "/loesungen/webdesign",
  })
  const article = articleJsonLd({
    headline: "Website planen",
    description: "Briefing",
    path: "/blog/website-briefing-vorlage",
    datePublished: "2026-10-17",
  })
  const tool = toolPageJsonLd({
    name: "Anfragen-Check",
    description: "Anfragen prüfen",
    path: "/anfragen-check",
  })
  assert.equal(service.provider["@id"], entityId)
  assert.equal(service.provider.name, "AgenticIT GmbH")
  assert.equal(article.publisher["@id"], entityId)
  assert.equal(article.publisher.name, "AgenticIT GmbH")
  assert.equal(tool.publisher["@id"], entityId)
})

test("identity unit: the website does not advertise a non-functional blog search", () => {
  const website = websiteJsonLd() as Record<string, any>
  assert.equal(website.publisher["@id"], entityId)
  assert.equal(website.potentialAction, undefined)
})

test("identity unit: official address and UID are visible in the imprint and controller details", () => {
  const provider = impressumSections.find(
    (section) => section.title === "Anbieter dieser Website",
  )
  assert.ok(provider)
  const imprint = JSON.stringify(provider)
  for (const value of [
    "AgenticIT GmbH",
    "Eschenweg 12",
    "3072 Ostermundigen",
    "CHE-157.845.314",
    registerUrl,
  ])
    assert.ok(imprint.includes(value), value)
  const controller = datenschutzSections.find(
    (section) => section.title === "Verantwortliche Stelle",
  )
  for (const value of ["AgenticIT GmbH", "Eschenweg 12", "3072 Ostermundigen"])
    assert.ok(JSON.stringify(controller).includes(value), value)
})

test("identity unit: the schema logo is real SVG, large enough and uses the existing dark brand drawing", () => {
  const url = new URL(organizationJsonLd().logo)
  const svg = readFileSync(`public${url.pathname}`, "utf8")
  assert.match(svg, /^<svg\b/)
  assert.ok(Number(svg.match(/width="(\d+)"/)?.[1]) >= 112)
  assert.ok(Number(svg.match(/height="(\d+)"/)?.[1]) >= 112)
  assert.match(svg, /stroke="#000000"/)
  const normalize = (value: string) =>
    value
      .replace(/(?:width|height)="\d+"/g, "")
      .replace(/\s+/g, " ")
      .trim()
  assert.equal(
    normalize(svg),
    normalize(readFileSync("public/journey-brand.svg", "utf8")),
  )
})

function jsonLd(html: string): Record<string, any>[] {
  return [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((match) => {
    const value = JSON.parse(match[1])
    return Array.isArray(value) ? value : (value["@graph"] ?? [value])
  })
}

test("identity HTTP: public pages expose one company definition and no invented local subsidiary", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  for (const path of [
    "/",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/zusammenarbeit",
    "/loesungen/webdesign",
    "/blog/website-briefing-vorlage",
    "/firmenvideo",
  ]) {
    const response = await fetch(new URL(path, baseUrl))
    assert.equal(response.status, 200, path)
    const html = await response.text()
    const graph = jsonLd(html)
    const definitions = graph.filter(
      (node) => node["@id"] === entityId && node.address,
    )
    assert.equal(definitions.length, 1, path)
    assert.equal(definitions[0].identifier.value, "CHE-157.845.314", path)
    assert.equal(definitions[0].address.streetAddress, "Eschenweg 12", path)
    assert.ok(
      !graph.some((node) => node["@id"] === `${SITE_URL}/#localbusiness`),
      path,
    )
    assert.ok(
      !graph.some(
        (node) =>
          node["@type"] === "SearchAction" ||
          node.potentialAction?.["@type"] === "SearchAction",
      ),
      path,
    )
    assert.ok(!html.includes('name="author" content="Agentic IT GmbH"'), path)
  }
})

test("identity HTTP: company facts and source links can be read without executing JavaScript", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  for (const path of [
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/zusammenarbeit",
  ]) {
    const html = await (await fetch(new URL(path, baseUrl))).text()
    const visible = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
    for (const value of [
      "AgenticIT GmbH",
      "Eschenweg 12",
      "3072 Ostermundigen",
    ])
      assert.ok(visible.includes(value), `${path}: ${value}`)
    assert.doesNotMatch(visible, /Agentic IT GmbH|Postfach/)
    if (path === "/impressum" || path === "/zusammenarbeit") {
      assert.ok(visible.includes("CHE-157.845.314"), path)
      assert.ok(html.includes(`href="${registerUrl}"`), path)
    }
  }
})
