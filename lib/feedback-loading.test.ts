import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the delayed feedback dialog is absent from initial page scripts", async () => {
  const html = await (await fetch(new URL("/", baseUrl))).text()
  const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*>/g)]
    .filter(([tag]) => !/noModule/i.test(tag))
    .map(([, src]) => src)
  assert.ok(scripts.length > 0)
  const sources = await Promise.all(
    scripts.map(async (src) =>
      (await fetch(new URL(src.replaceAll("&amp;", "&"), baseUrl))).text(),
    ),
  )
  assert.ok(
    !sources.some(
      (source) =>
        source.includes("DialogContent") && source.includes("DialogTitle"),
    ),
    "Load the feedback dialog implementation only when the visitor can use it",
  )
})
