const chfNumberFormatter = new Intl.NumberFormat("de-CH", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatChf(amount: number): string {
  return `CHF ${chfNumberFormatter.format(Math.round(amount))}.-`
}
