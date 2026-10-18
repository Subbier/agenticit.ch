const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { join } = require("node:path")
const test = require("node:test")

const source = readFileSync(join(__dirname, "website-intake.deluge"), "utf8")

test("only the verified legacy analysis sender may keep its existing branch", () => {
  assert.match(
    source,
    /payload\.get\("source"\) == null && payload\.get\("goal"\) == "agentische-analyse" && payload\.get\("analysis"\) != null/,
  )
  assert.match(source, /return \{"ok":true,"state":"legacy_passthrough"\}/)
})

test("website intake uses only its existing EU CRM connection", () => {
  const urls = [...source.matchAll(/https:\/\/([^"\s]+)/g)].map((m) => m[1])
  assert.ok(urls.length > 0)
  for (const value of urls) {
    const host = value.split("/")[0]
    assert.ok(["www.zohoapis.eu", "agenticit.ch"].includes(host), host)
  }
  const connections = [...source.matchAll(/connection\s*:\s*"([^"]+)"/g)]
  assert.ok(connections.length > 0)
  for (const [, connection] of connections) assert.equal(connection, "zoho_crm")
})

test("website intake has no outbound messaging, telephony or deletion action", () => {
  assert.doesNotMatch(source, /sendmail|send_mail|aircall|twilio|calendly/i)
  assert.doesNotMatch(source, /type\s*:\s*DELETE/)
  assert.doesNotMatch(source, /Remind_At|Recurring_Activity/)
  assert.match(source, /"Send_Notification_Email":false/)
  assert.match(source, /"send_notification":false/)
})

test("each CRM write uses an explicit automation suppression envelope", () => {
  assert.match(
    source,
    /leadBody = \{"data":leadRows,"trigger":List\(\),"skip_feature_execution":\{\{"name":"cadences"\}\}\}/,
  )
  assert.match(
    source,
    /taskBody = \{"data":taskRows,"trigger":List\(\),"skip_feature_execution":\{\{"name":"cadences"\}\}\}/,
  )
  const writes = [...source.matchAll(/invokeurl\s*\[([\s\S]*?)\];/g)]
    .map((m) => m[1])
    .filter((block) => /type\s*:\s*(POST|PUT)/.test(block))
  assert.equal(writes.length, 3)
  for (const block of writes) {
    assert.match(block, /parameters:(leadBody|taskBody)\.toString\(\)/)
  }
})

test("CRM receipt is checked through explicit result and record readback", () => {
  assert.match(source, /get\("code"\) != "SUCCESS"/)
  assert.match(source, /saved_owner_unverified/)
  assert.match(source, /saved_task_context_mismatch/)
  assert.match(source, /taskFields\.put\("What_Id",\{"id":leadId\}\)/)
  assert.match(source, /taskFields\.put\("\$se_module","Leads"\)/)
})
