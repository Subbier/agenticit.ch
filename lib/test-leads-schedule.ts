// Fresh, explicitly requested demo calls are immediately due, including evenings.
// Booking availability is controlled separately by Sabir's Calendly schedule.
export function nextTestLeadCallback(submittedAt: Date) {
  return new Date(submittedAt.getTime())
}
export function callbackLabel(due: Date, now: Date) {
  return due.getTime() <= now.getTime()
    ? "Dein Testanruf wird vorbereitet. Halte bitte dein Telefon bereit."
    : "Mia ruft dich so rasch wie möglich an. Halte dein Telefon bereit."
}
