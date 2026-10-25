import type { PotentialKind } from "./potential-report"

export const potentialQuestions = {
  acquisition: {
    volume: "Wie viele Kundenanfragen erhalten Sie pro Monat?",
    rate: "Wie viel Prozent dieser Anfragen werden zu Aufträgen?",
    value: "Wie viel Umsatz bringt Ihnen ein Auftrag im Durchschnitt? (CHF)",
    targetVolume: "Wie viele Kundenanfragen wünschen Sie sich pro Monat?",
    targetRate: "Wie viel Prozent Ihrer Anfragen sollen zu Aufträgen werden?",
  },
  conversion: {
    volume: "Wie viele Kundenanfragen erhalten Sie pro Monat?",
    rate: "Wie viel Prozent dieser Anfragen werden zu Aufträgen?",
    value: "Wie viel Umsatz bringt Ihnen ein Auftrag im Durchschnitt? (CHF)",
    targetVolume: "Wie viele Kundenanfragen erhalten Sie pro Monat?",
    targetRate: "Wie viel Prozent Ihrer Anfragen sollen zu Aufträgen werden?",
  },
  phone: {
    volume: "Wie viele geschäftliche Anrufe erhalten Sie pro Monat?",
    rate: "Wie viel Prozent dieser Anrufe führen zu einem Auftrag?",
    value: "Wie viel Umsatz bringt Ihnen ein Auftrag im Durchschnitt? (CHF)",
    targetVolume: "Wie viele geschäftliche Anrufe erhalten Sie pro Monat?",
    targetRate: "Wie viel Prozent Ihrer Anrufe sollen zu Aufträgen führen?",
  },
  retention: {
    volume: "Bei wie vielen Kunden steht pro Monat eine Verlängerung an?",
    rate: "Wie viel Prozent dieser Kunden verlängern heute?",
    value: "Wie viel Umsatz bringt Ihnen eine Verlängerung? (CHF)",
    targetVolume: "Bei wie vielen Kunden steht pro Monat eine Verlängerung an?",
    targetRate: "Wie viel Prozent dieser Kunden sollen künftig verlängern?",
  },
  admin: {
    volume: "Wie viele Aufgaben erledigen Sie pro Monat von Hand?",
    time: "Wie viele Minuten brauchen Sie heute für eine solche Aufgabe?",
    targetTime: "Wie viele Minuten möchten Sie künftig pro Aufgabe aufwenden?",
  },
  onboarding: {
    volume: "Wie viele neue Kunden kommen pro Monat zu Ihnen?",
    time: "Wie viele Minuten brauchen Sie heute, um einen neuen Kunden einzurichten?",
    targetTime:
      "Wie viele Minuten möchten Sie künftig pro neuem Kunden aufwenden?",
  },
  partnership: {
    volume: "Wie viele Abstimmungen oder Technikaufgaben fallen pro Monat an?",
    time: "Wie viele Minuten brauchen Sie heute für einen solchen Fall?",
    targetTime: "Wie viele Minuten möchten Sie künftig pro Fall aufwenden?",
  },
} as const satisfies Record<
  PotentialKind,
  {
    volume: string
    rate?: string
    value?: string
    targetVolume?: string
    targetRate?: string
    time?: string
    targetTime?: string
  }
>

export const potentialStepLabels = [
  "Ihre Zahlen",
  "Ihr Wunschziel",
  "PDF anfordern",
] as const
export const hourlyValueQuestion =
  "Welchen Wert hat eine Arbeitsstunde für Sie? (CHF)"
