import assert from "node:assert/strict"
import test from "node:test"
import { isProductionDeployment, usesVercelTelemetry } from "./deployment-environment"

test("Hostinger production does not load Vercel's platform telemetry", () => {
  assert.equal(usesVercelTelemetry({ NODE_ENV: "production" }), false)
  assert.equal(usesVercelTelemetry({ VERCEL: "1" }), true)
})

test("mail subjects distinguish production, preview and development on both hosts", () => {
  assert.equal(isProductionDeployment({ NODE_ENV: "production" }), true)
  assert.equal(isProductionDeployment({ NODE_ENV: "development" }), false)
  assert.equal(isProductionDeployment({ NODE_ENV: "production", VERCEL_ENV: "preview" }), false)
  assert.equal(isProductionDeployment({ VERCEL_ENV: "production" }), true)
})
