// Fresh, explicitly requested demo calls run after the delay, including evenings.
// Booking availability is controlled separately by Sabir's Calendly schedule.
export function nextTestLeadCallback(submittedAt: Date) {
  return new Date(submittedAt.getTime() + 4 * 60_000)
}
export function callbackLabel(due: Date, now: Date) {
  return due.getTime() <= now.getTime()
    ? "Dein Testanruf wird vorbereitet. Halte bitte dein Telefon bereit."
    : "Mia ruft dich innerhalb von fünf Minuten an. Halte dein Telefon bereit."
}
