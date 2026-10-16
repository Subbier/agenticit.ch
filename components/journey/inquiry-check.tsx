"use client"

import {
  buildInquiryPlan,
  buildInquiryResult,
  inquiryQuestions,
  inquiryStatusLabels,
} from "@/lib/inquiry-check"
import { ChoiceCheck } from "./choice-check"
import { JourneyContact } from "./check"

export function InquiryCheck() {
  return (
    <ChoiceCheck
      label="Anfragen-Check"
      kind="inquiry_flow"
      questions={inquiryQuestions}
      statusLabels={inquiryStatusLabels}
      buildResult={buildInquiryResult}
      buildPlan={buildInquiryPlan}
      filename="AgenticIT-Anfragen-Plan.txt"
      resultNote="Diese Selbsteinschätzung zeigt Ansatzpunkte. Sie belegt keine verlorenen Anfragen, keine technische Funktion und keine Umsatzwirkung."
      introNote="Keine Kundendaten oder Systemzugänge nötig. Ihre Antworten werden erst mit einer optionalen Kontaktanfrage übermittelt."
      renderContact={(input) => <JourneyContact inquiryCheck={input} />}
    />
  )
}
