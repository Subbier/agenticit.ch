// AgenticIT · Zeitgewinn durch Automatisierung wiederholender Aufgaben

export type AutomationInput = {
  hoursPerWeek: number
  hourlyRate: number
  automationPercent: number
}

export type AutomationResult = {
  hoursSavedWeek: number
  hoursSavedYear: number
  valuePerYear: number
  weeksPerYear: number
}

const WEEKS_PER_YEAR = 48

export function computeAutomation(input: AutomationInput): AutomationResult {
  const rate = Math.min(95, Math.max(10, input.automationPercent)) / 100
  const hoursSavedWeek = Math.round(input.hoursPerWeek * rate * 10) / 10
  const hoursSavedYear = Math.round(hoursSavedWeek * WEEKS_PER_YEAR)
  const valuePerYear = Math.round(hoursSavedYear * input.hourlyRate)
  return {
    hoursSavedWeek,
    hoursSavedYear,
    valuePerYear,
    weeksPerYear: WEEKS_PER_YEAR,
  }
}
