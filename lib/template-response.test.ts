import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import { GET } from "../app/vorlagen/[filename]/route"

const filename = "AgenticIT-Akquise-Plan.txt"

test("template downloads preserve their original bytes and explicit filename", async () => {
  const response = await GET(new Request(`https://agenticit.ch/vorlagen/${filename}?download=1`), {
    params: Promise.resolve({ filename }),
  })
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("content-disposition"), `attachment; filename="${filename}"`)
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), readFileSync(`content/downloads/${filename}`))
})

test("the same template remains readable without a forced download", async () => {
  const response = await GET(new Request(`https://agenticit.ch/vorlagen/${filename}?download=0`), {
    params: Promise.resolve({ filename }),
  })
  assert.equal(response.status, 200)
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain/)
  assert.equal(response.headers.get("content-disposition"), null)
})

test("unknown names and traversal never expose files outside the template catalogue", async () => {
  for (const filename of ["unknown.txt", "../../.env", "%2e%2e/.env"]) {
    const response = await GET(new Request("https://agenticit.ch/vorlagen/unknown.txt"), {
      params: Promise.resolve({ filename }),
    })
    assert.equal(response.status, 404)
  }
})
