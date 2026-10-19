import assert from "node:assert/strict"
import { readdirSync } from "node:fs"
import test from "node:test"
import { getPost } from "./blog"
import { worksheetLibrary } from "./worksheet-library"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the worksheet library covers every existing public template with its matching guide", () => {
  const files = readdirSync("content/downloads")
    .filter((file) => file.endsWith(".txt"))
    .sort()
  assert.deepEqual(worksheetLibrary.map((item) => item.filename).sort(), files)
  for (const item of worksheetLibrary) {
    assert.equal(
      getPost(item.guide)?.resource?.href,
      `/vorlagen/${item.filename}`,
    )
    assert.ok(item.copy.length > 30)
  }
})

test("all worksheets can be read and downloaded directly from the tools page", async () => {
  const response = await fetch(new URL("/werkzeuge", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  const section =
    html.match(
      /<section\b[^>]*aria-labelledby="worksheet-library-title"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1] ?? ""
  assert.ok(section, "The template library is present in the initial HTML")
  assert.equal(
    (section.match(/<details\b/g) ?? []).length,
    worksheetLibrary.length,
  )
  for (const item of worksheetLibrary) {
    assert.ok(section.includes(`href="/vorlagen/${item.filename}"`), item.name)
    assert.ok(
      section.includes(`href="/vorlagen/${item.filename}?download=1"`),
      item.name,
    )
    assert.ok(section.includes(`download="${item.filename}"`), item.name)
    assert.ok(section.includes(`href="/blog/${item.guide}"`), item.name)
  }
})
