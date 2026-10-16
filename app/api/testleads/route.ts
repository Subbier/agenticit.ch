import { after } from "next/server"
import { createTestLeadHandler } from "@/lib/test-leads-handler"
import { dispatchTestLeadCalls, submitTestLead } from "@/lib/test-leads-service"

export const runtime = "nodejs"
export const maxDuration = 120
export const POST = createTestLeadHandler(async (lead, ip) => {
  const receipt = await submitTestLead(lead, ip)
  // Keep the response fast; Vercel keeps this callback alive after sending it.
  // The durable minute worker remains a fallback, using the same dispatch lock.
  after(async () => {
    try {
      await dispatchTestLeadCalls()
    } catch {
      console.warn("Testlead dispatch deferred to scheduled worker")
    }
  })
  return receipt
})
