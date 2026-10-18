import assert from "node:assert/strict"
import test from "node:test"
import { getBuildOptions } from "../scripts/build-next.mjs"

test("standard hosting keeps the default Next.js build", () => {
  assert.deepEqual(getBuildOptions({}, []), {
    args: ["build"],
    hostinger: false,
  })
})

test("Hostinger's standard build command selects Webpack through its environment", () => {
  assert.deepEqual(getBuildOptions({ AGENTICIT_HOSTINGER_BUILD: "1" }, []), {
    args: ["build", "--webpack"],
    hostinger: true,
  })
})

test("the dedicated Hostinger build also works without a hosting environment", () => {
  assert.deepEqual(getBuildOptions({}, ["--hostinger"]), {
    args: ["build", "--webpack"],
    hostinger: true,
  })
})
