import assert from "node:assert/strict"
import test from "node:test"
import { assertLeadAcknowledged } from "./lead-acknowledgement"

test("only a successful HTTP response and an explicit acknowledgement confirm a request", async () => {
  for (const honey of [null, ""])
    await assert.doesNotReject(
      assertLeadAcknowledged(Response.json({ ok: true }), honey),
    )
  for (const body of [{ ok: false }, {}, { ok: "true" }, null, true, []])
    await assert.rejects(assertLeadAcknowledged(Response.json(body), ""))
  await assert.rejects(
    assertLeadAcknowledged(
      new Response("broken response", { status: 200 }),
      "",
    ),
  )
  await assert.rejects(
    assertLeadAcknowledged(new Response(null, { status: 204 }), ""),
  )
  await assert.rejects(
    assertLeadAcknowledged(Response.json({ ok: true }, { status: 503 }), ""),
  )
  await assert.rejects(
    assertLeadAcknowledged(Response.json({ ok: true }), "filled"),
  )
})

test("a useful server error is retained without converting it to a success", async () => {
  await assert.rejects(
    assertLeadAcknowledged(
      Response.json(
        { ok: false, message: "Bitte später erneut versuchen." },
        { status: 502 },
      ),
      "",
    ),
    /Bitte später erneut versuchen/,
  )
})
