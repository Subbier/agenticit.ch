import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

async function page(path: string) {
  const response = await fetch(new URL(path, baseUrl))
  assert.equal(response.status, 200, path)
  return response.text()
}

test("the planning tool describes its page without claiming unverified software reviews", async () => {
  const html = await page("/potenzial")
  const entities = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, value]) => {
    const data = JSON.parse(value)
    return Array.isArray(data) ? data : [data]
  })
  const toolPage = entities.find(
    (entity) =>
      entity["@type"] === "WebPage" &&
      entity.url === "https://agenticit.ch/potenzial",
  )
  assert.ok(toolPage, "The calculator is described as a WebPage")
  assert.equal(toolPage.isAccessibleForFree, true)
  assert.equal(toolPage.publisher["@id"], "https://agenticit.ch/#organization")
  assert.ok(
    !entities.some((entity) =>
      ["SoftwareApplication", "WebApplication"].includes(entity["@type"]),
    ),
  )
  assert.equal(toolPage.aggregateRating, undefined)
  assert.equal(toolPage.review, undefined)
})

test("blog breadcrumbs name the home destination instead of a generic start link", async () => {
  for (const path of ["/blog", "/blog/ki-agenten"]) {
    const html = await page(path)
    const breadcrumbs =
      html.match(
        /<nav\b[^>]*aria-label="Brotkrumen"[^>]*>([\s\S]*?)<\/nav>/,
      )?.[1] ?? ""
    const homeText = breadcrumbs
      .match(/<a\b[^>]*href="\/"[^>]*>([\s\S]*?)<\/a>/)?.[1]
      ?.replace(/<[^>]*>/g, "")
      .trim()
    assert.equal(homeText, "AgenticIT", path)
  }
})

test("the AI service makes its technology hub and explanations discoverable", async () => {
  const html = await page("/loesungen/ki-entwicklung")
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  for (const path of [
    "/technologie",
    "/technologie/autonome-ki-agenten",
    "/technologie/multi-agenten-systeme",
    "/technologie/enterprise-integration",
  ]) {
    assert.ok(
      main.includes(`href="${path}"`),
      `${path} needs a contextual entry`,
    )
  }
})

test("the footer exposes security information and the marketing channel explanation", async () => {
  const html = await page("/")
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1] ?? ""
  assert.match(footer, /href="\/sicherheit"/)
  assert.match(footer, /href="\/excellence"/)
})
