import assert from "node:assert/strict"
import test from "node:test"
import {
  buildCallbackRequest,
  callbackSourceForPath,
  createCallbackSender,
  isCallbackPhoneNumber,
} from "./callback-inquiry"

const input = {
  pagePath: "/blog/ki-agenten",
  consent: true,
  honey: "",
  form: {
    firstName: " Internal ",
    lastName: " Test ",
    company: "",
    phone: "+41000000000",
    email: "callback@example.invalid",
    goal: "Zeit gewinnen",
  },
}

test("callback context uses a public path, never a query, fragment or external address", () => {
  for (const [path, source] of [
    ["/", "home"],
    ["/blog", "blog"],
    ["/blog/ki-agenten", "blog"],
    ["/branchen/treuhand", "industry-page"],
    ["/voiceagent", "website-callback"],
  ])
    assert.equal(callbackSourceForPath(path), source)
  for (const path of [
    "https://agenticit.ch/blog",
    "//other.invalid",
    "/blog?email=private",
    "/blog#private",
    "/../private",
    "/with space",
    null,
    "/" + "a".repeat(241),
  ])
    assert.equal(callbackSourceForPath(path), null)
  const payload = buildCallbackRequest(input)
  assert.equal(payload.name, "Internal Test")
  assert.equal(payload.source, "blog")
  assert.equal(payload.contactMethod, "phone")
  assert.deepEqual(payload.callback, {
    version: 1,
    path: "/blog/ki-agenten",
    goal: "Zeit gewinnen",
  })
})

test("phone checks allow common formatting but reject prose and incomplete numbers", () => {
  for (const phone of ["+41 (0) 00 000 00 00", "000/000-00-00", "0000000"])
    assert.equal(isCallbackPhoneNumber(phone), true)
  for (const phone of [
    "abcdefg",
    "number1234567",
    "123456",
    "",
    null,
    "0".repeat(81),
  ])
    assert.equal(isCallbackPhoneNumber(phone), false)
})

test("invalid data and honeypots never invoke the sender", async () => {
  let calls = 0
  const send = createCallbackSender(async () => {
    calls += 1
    return Response.json({ ok: true })
  })
  for (const changed of [
    { ...input, consent: false },
    { ...input, honey: "bot" },
    { ...input, pagePath: "/blog?private=1" },
    { ...input, form: { ...input.form, phone: "number1234567" } },
  ])
    await assert.rejects(send(changed))
  assert.equal(calls, 0)
})

test("only an explicit acknowledgement completes a callback", async () => {
  for (const response of [
    Response.json({ ok: false }),
    Response.json({}),
    new Response("", { status: 200 }),
    Response.json({ ok: true }, { status: 503 }),
    new Response(null, { status: 204 }),
  ]) {
    const send = createCallbackSender(async () => response)
    await assert.rejects(send(input))
  }
})

test("a mounted form suppresses concurrent and repeated successful requests", async () => {
  let calls = 0
  let complete!: (response: Response) => void
  const send = createCallbackSender(async (_url, options) => {
    calls += 1
    const body = JSON.parse(String(options?.body))
    assert.equal(body.source, "blog")
    assert.equal(body.contactMethod, "phone")
    return new Promise<Response>((resolve) => {
      complete = resolve
    })
  })
  const first = send(input)
  assert.equal(await send(input), false)
  assert.equal(calls, 1)
  complete(Response.json({ ok: true }))
  assert.equal(await first, true)
  assert.equal(await send(input), false)
  assert.equal(calls, 1)
})

test("a failed handoff preserves the ability to retry deliberately", async () => {
  let calls = 0
  const send = createCallbackSender(async () => {
    calls += 1
    return Response.json({
      ok: calls > 1,
      message: "Bitte später erneut versuchen.",
    })
  })
  await assert.rejects(send(input), /Bitte später erneut versuchen/)
  assert.equal(await send(input), true)
  assert.equal(calls, 2)
})
