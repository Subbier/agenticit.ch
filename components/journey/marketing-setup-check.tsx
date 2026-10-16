"use client"

import {
  buildMarketingSetupPlan,
  buildMarketingSetupResult,
  marketingSetupQuestions,
  marketingStatusLabels,
} from "@/lib/marketing-setup"
import { ChoiceCheck } from "./choice-check"
import { JourneyContact } from "./check"

export function MarketingSetupCheck() {
  return (
    <ChoiceCheck
      label="Marketing-Setup-Check"
      kind="marketing_setup"
      questions={marketingSetupQuestions.map((question) => ({
        ...question,
        extraOptions:
          question.id === "accounts"
            ? [
                {
                  value: "not-planned" as const,
                  label: "Vorerst ohne bezahlte Werbung",
                },
              ]
            : [],
      }))}
      statusLabels={marketingStatusLabels}
      buildResult={buildMarketingSetupResult}
      buildPlan={buildMarketingSetupPlan}
      filename="AgenticIT-Marketing-Setup-Plan.txt"
      resultNote="Diese Selbsteinschätzung ersetzt keinen technischen Audit. Sie ist keine Freigabe zum Kampagnenstart und keine Erfolgsprognose."
      introNote="Kein Zugang zu Ihren Konten nötig. Ihre Antworten werden erst mit einer optionalen Kontaktanfrage übermittelt."
      renderContact={(input) => <JourneyContact marketingSetup={input} />}
    />
  )
}
