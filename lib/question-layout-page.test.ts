import assert from "node:assert/strict"
import test from "node:test"
import { potentialKinds } from "./potential-report"
import { potentialQuestions } from "./potential-questions"
const base = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3133"
for (const kind of potentialKinds)
  test(`${kind}: complete questions sit directly above their own inputs`, async () => {
    const html = await (
      await fetch(`${base}/kundenreise-check?thema=${kind}`)
    ).text()
    const form = html.match(/<form\b[^>]*>([\s\S]*?)<\/form>/)?.[1] ?? ""
    assert.ok(form.includes(potentialQuestions[kind].volume))
    assert.ok(!form.includes("Ihre Ausgangslage"))
    assert.ok(!form.includes("Aus Interesse werden neue Anfragen"))
    for (const label of form.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/g)) {
      if (!label[1].includes('type="number"')) continue
      assert.match(label[1], /^<span>[^<]*\?[^<]*<\/span>\s*<input\b/)
      assert.ok(!label[1].includes("<p") && !label[1].includes("<svg"))
    }
    assert.ok(
      html.includes("Ihre Zahlen") &&
        html.includes("Ihr Wunschziel") &&
        html.includes("PDF anfordern"),
    )
  })
