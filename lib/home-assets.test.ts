import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"

test("the homepage offers responsive video and Mia images without fetching the full poster twice", async () => {
  const html = await (await fetch(baseUrl)).text()
  const images = [...html.matchAll(/<img\b[^>]+>/g)].map(([tag]) => tag)
  for (const asset of ["agenticit-thumbnail", "mia.png"]) {
    const optimized = images.filter(
      (tag) => tag.includes(asset) && tag.includes("/_next/image?"),
    )
    assert.ok(optimized.length > 0, `${asset} has an optimized image`)
    for (const tag of optimized) assert.match(tag, /srcset=/i)
  }
  assert.ok(
    !/<video\b[^>]*poster=/.test(html),
    "The full-size video poster must not download in addition to the responsive image",
  )
  assert.ok(html.includes('preload="none"'))
  assert.ok(html.includes("Firmenvideo abspielen (60 Sekunden)"))
})

for (const [asset, width, maxBytes] of [
  ["mia.png", 128, 12000],
  ["agenticit-thumbnail", 750, 80000],
] as const) {
  test(`${asset} stays within its responsive image budget`, async () => {
    const html = await (await fetch(baseUrl)).text()
    const tag = [...html.matchAll(/<img\b[^>]+>/g)]
      .map(([tag]) => tag)
      .find((tag) => tag.includes(asset) && tag.includes("/_next/image?"))
    assert.ok(tag, "The visible image provides an optimized URL")
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1]
    assert.ok(src)
    const image = new URL(src.replace(/&amp;/g, "&"), baseUrl)
    image.searchParams.set("w", String(width))
    image.searchParams.set("q", "75")
    const response = await fetch(image, {
      headers: { Accept: "image/avif,image/webp" },
    })
    assert.equal(response.status, 200)
    assert.match(
      response.headers.get("content-type") ?? "",
      /^image\/(avif|webp)/,
    )
    const bytes = (await response.arrayBuffer()).byteLength
    assert.ok(
      bytes < maxBytes,
      `${bytes} bytes exceeds the ${maxBytes}-byte budget`,
    )
  })
}
