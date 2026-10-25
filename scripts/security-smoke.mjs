// Passive checks plus deliberately invalid requests: never submit a valid lead,
// call, message, booking or report request to an external service.
const base = process.env.SITE_TEST_BASE_URL || "http://127.0.0.1:3128"
const results = []
async function check(path, options, allowed) {
  const response = await fetch(new URL(path, base), {
    ...options,
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
  })
  results.push({
    path,
    method: options.method || "GET",
    status: response.status,
    ok: allowed.includes(response.status),
  })
  return response
}
const page = await check("/", {}, [200])
for (const [name, pattern] of [
  ["strict-transport-security", /max-age=/],
  ["x-content-type-options", /^nosniff$/],
  ["x-frame-options", /^DENY$/],
  ["content-security-policy", /frame-ancestors 'none'/],
  ["referrer-policy", /strict-origin/],
])
  results.push({ header: name, ok: pattern.test(page.headers.get(name) || "") })
for (const path of [
  "/.env",
  "/.env.local",
  "/.git/config",
  "/package.json",
  "/package-lock.json",
])
  await check(path, { method: "HEAD" }, [403, 404])
for (const path of [
  "leads",
  "callback",
  "karriere",
  "analyse",
  "kk-lead",
  "potential-report",
  "website-brief",
])
  await check(
    `/api/${path}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    },
    [400, 413, 429],
  )
await check("/api/voice/confirm", { method: "POST", body: "{}" }, [401])
await check("/api/kk-call", { method: "POST", body: "{}" }, [401])
await check("/api/kk-confirm", { method: "POST", body: "{}" }, [401])
await check("/api/whatsapp/inbound", { method: "POST", body: "Body=invalid" }, [
  403,
])
await check("/api/whatsapp/fallback", {}, [401])
console.log(
  JSON.stringify(
    {
      base,
      checks: results.length,
      failed: results.filter((x) => !x.ok).length,
      results,
    },
    null,
    2,
  ),
)
if (results.some((x) => !x.ok)) process.exitCode = 1
