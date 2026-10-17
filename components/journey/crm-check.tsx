"use client"

import {
  buildCrmPlan,
  buildCrmResult,
  crmQuestions,
  crmStatusLabels,
} from "@/lib/crm-check"
import { ChoiceCheck } from "./choice-check"
import { JourneyContact } from "./check"

export function CrmCheck() {
  return (
    <ChoiceCheck
      label="CRM-Ablauf-Check"
      kind="crm_flow"
      questions={crmQuestions}
      statusLabels={crmStatusLabels}
      buildResult={buildCrmResult}
      buildPlan={buildCrmPlan}
      filename="AgenticIT-CRM-Ablaufplan.txt"
      planPreviewLabel="Vollständigen Ablaufplan ansehen"
      resultNote="Diese Selbsteinschätzung ordnet Ihren Stand ein. Sie ersetzt keine technische Prüfung und misst keine Fehlerquote oder Einsparung."
      introNote="Keine Kundendaten oder Systemzugänge nötig. Ihre Antworten werden erst mit einer optionalen Kontaktanfrage übermittelt."
      renderContact={(input) => <JourneyContact crmCheck={input} />}
    />
  )
}
