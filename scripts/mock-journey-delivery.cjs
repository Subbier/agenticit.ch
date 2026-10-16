// Local-only integration fixture. Accepts reserved test recipients; never forwards.
const http = require("node:http")
let count = 0
let context = null
const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json")
  if (request.method === "GET" && request.url === "/status") {
    response.end(JSON.stringify({ count, context }))
    return
  }
  if (request.method !== "POST" || request.url !== "/intake") {
    response.writeHead(404).end("{}")
    return
  }
  let body = ""
  request.on("data", (chunk) => {
    body += chunk
    if (body.length > 20000) request.destroy()
  })
  request.on("end", () => {
    try {
      const data = JSON.parse(body)
      if (!String(data.email).endsWith("@example.invalid")) {
        response.writeHead(400).end('{"ok":false}')
        return
      }
      count += 1
      context = {
        source: data.source,
        tags: data.tags,
        contactMethod: data.contactMethod,
        marketingConsent: data.marketingConsent,
        followUpTask: data.followUpTask,
      }
      response.end('{"ok":true}')
    } catch {
      response.writeHead(400).end('{"ok":false}')
    }
  })
})
server.listen(3116, "127.0.0.1", () =>
  console.log(
    "Local mock delivery ready on 127.0.0.1:3116; no external forwarding.",
  ),
)
