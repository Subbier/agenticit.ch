import { createTestLeadHandler } from "@/lib/test-leads-handler"
import { submitTestLead } from "@/lib/test-leads-service"

export const runtime = "nodejs"
export const maxDuration = 30
export const POST = createTestLeadHandler(submitTestLead)
