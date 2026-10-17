import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { createHash } from "node:crypto"

const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
const captionPath = "/videos/agenticit-firmenvideo-v3.de.vtt"
const sourceHash =
  "3880e2908ec36e131d0e594fa08ddabecc6fa34afc256d4699091c3a84cad8d9"

function seconds(value: string) {
  const [hours, minutes, rest] = value.split(":").map(Number)
  return hours * 3600 + minutes * 60 + rest
}

function cues(vtt: string) {
  assert.ok(vtt.startsWith("WEBVTT\n"))
  return vtt
    .trim()
    .split(/\n\n+/)
    .slice(1)
    .map((block) => {
      const [timing, ...lines] = block.split("\n")
      const match = timing.match(
        /^(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})$/,
      )
      assert.ok(match, timing)
      return { start: seconds(match[1]), end: seconds(match[2]), lines }
    })
}

test("the supplied video remains unchanged while its accessible alternatives are added", () => {
  assert.equal(
    createHash("sha256")
      .update(readFileSync("public/videos/agenticit-firmenvideo.mp4"))
      .digest("hex"),
    sourceHash,
  )
})

test("the German subtitle file has readable, ordered cues within the measured video", async () => {
  const response = await fetch(new URL(captionPath, baseUrl))
  assert.equal(response.status, 200)
  assert.match(response.headers.get("content-type") ?? "", /text\/vtt/)
  const vtt = await response.text()
  assert.equal(vtt, readFileSync(`public${captionPath}`, "utf8"))
  const rows = cues(vtt)
  assert.ok(rows.length >= 10)
  for (const [index, cue] of rows.entries()) {
    assert.ok(cue.end > cue.start)
    assert.ok(cue.end <= 58.1)
    assert.ok(cue.start >= (rows[index - 1]?.end ?? 0))
    assert.ok(cue.lines.length <= 2)
    assert.ok(cue.lines.every((line) => line.length <= 42))
    assert.ok(cue.lines.join(" ").length / (cue.end - cue.start) <= 23)
  }
  const spoken = rows.map((cue) => cue.lines.join(" ")).join(" ")
  assert.ok(spoken.startsWith("Stellen Sie sich einen Betrieb vor"))
  assert.ok(
    spoken.includes("bis zu 40 % ihrer Zeit zurück"),
    "Preserve the supplied spoken text rather than inventing a different script",
  )
  assert.ok(spoken.endsWith("Starten Sie jetzt Ihren Automatisierungs-Check."))
})

test("the homepage keeps click-to-play and offers subtitles plus a collapsed transcript", async () => {
  const html = await (await fetch(baseUrl)).text()
  assert.match(html, /<track\b[^>]*kind="subtitles"[^>]*srcLang="de"/)
  assert.ok(html.includes(`src="${captionPath}"`))
  assert.ok(
    !/<track\b[^>]*\bdefault(?:=|\s|>)/.test(html),
    "The supplied video already has burned-in subtitles; a second track must be opt-in",
  )
  assert.ok(html.includes('preload="none"'))
  assert.ok(!/<video\b[^>]*autoPlay/i.test(html))
  assert.ok(!/<video\b[^>]*poster=/.test(html))
  const transcript = html.match(
    /<details\b[^>]*>[\s\S]*?Video als Text lesen[\s\S]*?<\/details>/,
  )?.[0]
  assert.ok(transcript)
  assert.ok(!/^<details\b[^>]*\bopen(?:=|\s|>)/.test(transcript))
  assert.ok(transcript.includes('href="/firmenvideo"'))
})

test("the dedicated watch page has one video, a matching transcript and factual video metadata", async () => {
  const response = await fetch(new URL("/firmenvideo", baseUrl), {
    redirect: "manual",
  })
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.ok(
    html.includes('rel="canonical" href="https://agenticit.ch/firmenvideo"'),
  )
  const main = (
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  ).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
  assert.equal((main.match(/<video\b/g) ?? []).length, 1)
  assert.ok(!/<form\b|<iframe\b/.test(main))
  assert.ok(main.includes('href="/automatisierungs-check"'))
  const data = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => JSON.parse(json))
  const video = data.find((item) => item["@type"] === "VideoObject")
  assert.ok(video)
  assert.equal(
    video.contentUrl,
    "https://agenticit.ch/videos/agenticit-firmenvideo.mp4?v=3",
  )
  assert.equal(video.duration, "PT58.1S")
  assert.equal(video.uploadDate, "2026-10-16T15:33:45.971Z")
  assert.equal(
    video.thumbnailUrl,
    "https://agenticit.ch/videos/agenticit-thumbnail.jpg?v=4",
  )
  assert.equal(video.interactionStatistic, undefined)
  assert.equal(video.aggregateRating, undefined)
  const vtt = readFileSync(`public${captionPath}`, "utf8")
  const text = cues(vtt)
    .map((cue) => cue.lines.join(" "))
    .join(" ")
  assert.equal(video.transcript, text)
  const visible = main
    .match(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/)?.[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  assert.equal(visible, text)
})

test("the sitemap describes the watch page and the same stable video assets", async () => {
  const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text()
  const block = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map(([, b]) => b)
    .find((b) => b.includes("https://agenticit.ch/firmenvideo</loc>"))
  assert.ok(block)
  assert.ok(block.includes("<video:video>"))
  assert.ok(
    block.includes(
      "<video:content_loc>https://agenticit.ch/videos/agenticit-firmenvideo.mp4?v=3</video:content_loc>",
    ),
  )
  assert.ok(
    block.includes(
      "<video:thumbnail_loc>https://agenticit.ch/videos/agenticit-thumbnail.jpg?v=4</video:thumbnail_loc>",
    ),
  )
})
