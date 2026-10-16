import {
  dispatchTestLeadCalls,
  validTestLeadWorkerAuth,
} from "@/lib/test-leads-service"

export const runtime = "nodejs"
export const maxDuration = 120
export const dynamic = "force-dynamic"
export async function GET(request: Request) {
  try {
    if (!validTestLeadWorkerAuth(request.headers.get("authorization")))
      return Response.json({ ok: false }, { status: 401 })
    return Response.json(
      { ok: true, ...(await dispatchTestLeadCalls()) },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return Response.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
}
