import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import test from "node:test"

function readBuildConfig(hostingerBuild: boolean) {
  const output = execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      'import config from "./next.config.mjs"; console.log(JSON.stringify(config));',
    ],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        AGENTICIT_HOSTINGER_BUILD: hostingerBuild ? "1" : "0",
      },
    },
  )
  return JSON.parse(output)
}

test("Hostinger Webpack builds omit the unsupported Turbopack CSS mode", () => {
  assert.equal(readBuildConfig(true).experimental?.cssChunking, undefined)
})

test("regular builds retain their existing CSS split and image formats", () => {
  const config = readBuildConfig(false)
  assert.equal(config.experimental.cssChunking, "graph")
  assert.deepEqual(config.images.formats, ["image/avif", "image/webp"])
})
