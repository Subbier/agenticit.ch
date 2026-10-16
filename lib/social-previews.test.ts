import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const pages = [
  ["/", "/opengraph-image"],
  ["/loesungen/ki-entwicklung", "/loesungen/ki-entwicklung/opengraph-image"],
  ["/loesungen/webdesign", "/loesungen/webdesign/opengraph-image"],
  [
    "/loesungen/prozessautomatisierung",
    "/loesungen/prozessautomatisierung/opengraph-image",
  ],
] as const

for (const [page, imagePath] of pages) {
  test(`${page} shares a readable PNG preview with matching card metadata`, async () => {
    const html = await (await fetch(new URL(page, baseUrl))).text()
    for (const property of ['property="og:image"', 'name="twitter:image"']) {
      const tag = [...html.matchAll(/<meta\b[^>]+>/g)]
        .map(([value]) => value)
        .find((value) => value.includes(property))
      assert.ok(tag, `${property} is present`)
      assert.ok(tag.includes(imagePath), `${property} uses this page's preview`)
      assert.ok(!tag.includes("icon.svg"))
    }
    const response = await fetch(new URL(imagePath, baseUrl))
    assert.equal(response.status, 200)
    assert.match(response.headers.get("content-type") ?? "", /^image\/png/)
    const png = Buffer.from(await response.arrayBuffer())
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a")
    assert.equal(png.readUInt32BE(16), 1200)
    assert.equal(png.readUInt32BE(20), 630)
  })
}

test("other indexable pages inherit the branded PNG instead of an SVG card", async () => {
  const html = await (await fetch(new URL("/pakete", baseUrl))).text()
  assert.ok(html.includes('content="https://agenticit.ch/opengraph-image"'))
  assert.ok(
    !html.includes(
      'property="og:image" content="https://agenticit.ch/icon.svg"',
    ),
  )
})
