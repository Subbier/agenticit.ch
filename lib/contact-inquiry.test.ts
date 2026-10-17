import assert from "node:assert/strict"
import test from "node:test"
import {
  buildContactRequest,
  contactValidationMessage,
  createContactSender,
} from "./contact-inquiry"

const input = {
  consent: true,
  honey: "",
  form: {
    name: " Internal Test ",
    email: " contact@example.invalid ",
    phone: "",
    company: "",
    message: " Bitte den Anfrageweg prüfen. ",
  },
}

test("contact requests trim only their own fields and keep optional fields optional", () => {
  assert.deepEqual(buildContactRequest(input), {
    source: "contact-page",
    name: "Internal Test",
    email: "contact@example.invalid",
    message: "Bitte den Anfrageweg prüfen.",
    phone: undefined,
    company: undefined,
    consent: true,
    contactMethod: "email",
    company_website: "",
  })
  const payload = buildContactRequest({
    ...input,
    form: {
      ...input.form,
      phone: " +41 (0) 00 000 00 00 ",
      company: " Internal ",
    },
  })
  assert.equal(payload.phone, "+41 (0) 00 000 00 00")
  assert.equal(payload.company, "Internal")
  assert.equal(payload.contactMethod, "email")
})

test("invalid or excessive contact fields and missing consent block transport", async () => {
  let calls = 0
  const send = createContactSender(async () => {
    calls += 1
    return Response.json({ ok: true })
  })
  for (const patch of [
    { name: " " },
    { name: "a".repeat(121) },
    { email: "invalid" },
    { email: "a".repeat(170) + "@example.invalid" },
    { phone: "number1234567" },
    { phone: "123456" },
    { phone: "0".repeat(81) },
    { company: "a".repeat(161) },
    { message: "    " },
    { message: "abcd" },
    { message: "a".repeat(1201) },
  ]) {
    const changed = { ...input, form: { ...input.form, ...patch } }
    assert.ok(contactValidationMessage(changed.form, true))
    await assert.rejects(send(changed))
  }
  await assert.rejects(send({ ...input, consent: false }))
  await assert.rejects(send({ ...input, honey: "bot" }))
  assert.equal(calls, 0)
})

test("contact success requires explicit acknowledgement, including on HTTP 200", async () => {
  for (const response of [
    Response.json({ ok: false }),
    Response.json({ ok: "true" }),
    Response.json({}),
    new Response("<html>unavailable</html>"),
    new Response(null, { status: 204 }),
    Response.json({ ok: true }, { status: 503 }),
  ])
    await assert.rejects(createContactSender(async () => response)(input))
})

test("one contact form suppresses concurrent and repeated successful requests", async () => {
  let calls = 0
  let complete!: (response: Response) => void
  const send = createContactSender(async (url, options) => {
    calls += 1
    assert.equal(url, "/api/leads")
    assert.equal(options?.method, "POST")
    assert.equal(JSON.parse(String(options?.body)).source, "contact-page")
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

test("a failed contact handoff permits deliberate retry and never retries automatically", async () => {
  let calls = 0
  const send = createContactSender(async () => {
    calls += 1
    if (calls === 1) throw new Error("Verbindung unterbrochen.")
    if (calls === 2)
      return Response.json({ ok: false, message: "Bitte später versuchen." })
    return Response.json({ ok: true })
  })
  await assert.rejects(send(input), /Verbindung unterbrochen/)
  assert.equal(calls, 1)
  await assert.rejects(send(input), /Bitte später versuchen/)
  assert.equal(calls, 2)
  assert.equal(await send(input), true)
  assert.equal(calls, 3)
})
