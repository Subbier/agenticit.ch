import PDFDocument from "pdfkit"
import {
  calculatePotential,
  potentialConfigs,
  type PotentialInput,
} from "./potential-report"

const ink = "#183024",
  green = "#285c3d",
  muted = "#45614d"
const num = (value: number, digits = 0) =>
  new Intl.NumberFormat("de-CH", { maximumFractionDigits: digits })
    .format(value)
    .replace(/’/g, "'")
const chf = (value: number) => `CHF ${num(value)}`

export async function buildPotentialPdf(
  input: PotentialInput,
  person: { name: string; company: string },
  date = new Date(),
) {
  const r = calculatePotential(input),
    c = potentialConfigs[input.kind],
    revenue = c.mode === "revenue"
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 44,
      info: { Title: `${c.label} - Ihre Berechnung`, Author: "AgenticIT GmbH" },
    })
    const chunks: Buffer[] = []
    doc.on("data", (chunk) => chunks.push(chunk))
    doc.on("error", reject)
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    const text = (
      value: string,
      x: number,
      y: number,
      size = 11,
      bold = false,
      width = 507,
      color = ink,
    ) => {
      doc
        .font(bold ? "Helvetica-Bold" : "Helvetica")
        .fontSize(size)
        .fillColor(color)
        .text(value, x, y, { width, lineGap: 3 })
    }
    text("AgenticIT", 44, 38, 13, true, 507, green)
    text(c.label, 44, 77, 18, true)
    text("Ihre persönliche Berechnung", 44, 105, 11, false, 507, muted)
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(ink)
      .text(`${person.name} | ${person.company}`, 44, 132, {
        width: 507,
        height: 28,
        ellipsis: true,
      })
    text(
      date.toLocaleDateString("de-CH", { timeZone: "Europe/Zurich" }),
      44,
      169,
      9,
      false,
      507,
      muted,
    )
    doc.roundedRect(44, 197, 507, 91, 8).fill("#eaf3e4")
    text(
      revenue
        ? "Möglicher zusätzlicher Umsatz pro Jahr"
        : "Möglicher Zeitgewinn pro Jahr",
      60,
      213,
      11,
      true,
    )
    text(
      revenue
        ? chf(r.annualRevenueDelta)
        : `${num(r.annualHoursSaved, 1)} Stunden`,
      60,
      238,
      23,
      true,
      475,
      green,
    )
    const rows: Array<[string, string]> = revenue
      ? [
          [c.unit, num(input.volume)],
          ["Volumen im Szenario", num(input.targetVolume)],
          [
            input.kind === "retention"
              ? "Verlängerungsquote: heute / Ziel"
              : "Abschlussquote: heute / Ziel",
            `${num(input.currentRate, 2)} % / ${num(input.targetRate, 2)} %`,
          ],
          [
            input.kind === "retention"
              ? "Wert pro Verlängerung"
              : "Durchschnittlicher Auftragswert",
            chf(input.value),
          ],
          [
            "Zusätzliche Aufträge pro Monat (Rechenwert)",
            num(r.targetWins - r.currentWins, 2),
          ],
          ["Zusätzlicher Umsatz pro Monat", chf(r.monthlyRevenueDelta)],
        ]
      : [
          [c.unit, num(input.volume)],
          [
            "Minuten pro Fall: heute / Ziel",
            `${num(input.minutes, 1)} / ${num(input.targetMinutes, 1)}`,
          ],
          [
            "Zeitaufwand pro Monat: heute / Ziel",
            `${num(r.currentHours, 1)} / ${num(r.targetHours, 1)} Std.`,
          ],
          ["Freie Zeit pro Monat", `${num(r.hoursSaved, 1)} Stunden`],
          ["Ihr kalkulatorischer Stundensatz", chf(input.hourlyRate)],
          ["Wert der freien Zeit pro Jahr", chf(r.firstYearTimeValue)],
        ]
    rows.forEach(([label, value], i) => {
      const y = 310 + i * 38
      text(label, 44, y, 10, false, 325)
      text(value, 380, y, 11, true, 171)
      doc
        .moveTo(44, y + 28)
        .lineTo(551, y + 28)
        .strokeColor("#dce4d8")
        .stroke()
    })
    text("Ihr Ergebnis zum Weiterrechnen", 44, 558, 12, true, 507, green)
    text(
      revenue
        ? `Bei ${num(input.targetVolume)} ${input.kind === "phone" ? "Anrufen" : input.kind === "retention" ? "anstehenden Verlängerungen" : "Anfragen"} im Monat und ${num(input.targetRate, 2)} % Quote ergibt Ihr Ziel ${num(r.targetWins, 2)} Aufträge im Monat. Heute sind es rechnerisch ${num(r.currentWins, 2)}. Der Umsatzwert steigt von ${chf(r.currentRevenue)} auf ${chf(r.targetRevenue)} pro Monatsgruppe.`
        : `Mit ${num(input.targetMinutes, 1)} statt ${num(input.minutes, 1)} Minuten pro Fall gewinnen Sie bei gleichem Volumen ${num(r.hoursSaved, 1)} Stunden pro Monat zurück.${r.additionalCapacity !== null ? ` Das entspricht rechnerisch Kapazität für ${num(r.additionalCapacity)} weitere Fälle im Monat.` : ""}`,
      44,
      581,
      11,
    )
    text("So wurde gerechnet", 44, 658, 10, true, 507, muted)
    text(
      revenue
        ? "Monatsvolumen x Quote / 100 x Auftragswert. Jahresunterschied = (Ziel - Heute) x 12. Umsatz ist kein Gewinn; Kosten sind nicht abgezogen."
        : "Monatsvolumen x (Minuten heute - Minuten Ziel) / 60. Zeitwert = freie Stunden x Stundensatz. Jahreswert = Monatswert x 12. Kapazitätswert ist keine automatische Kostenersparnis.",
      44,
      677,
      9,
      false,
      507,
      muted,
    )
    text(
      "Szenario mit Ihren Angaben, keine Erfolgsprognose. Der Jahreswert setzt 12 vergleichbare Monatsgruppen voraus. Anlaufzeit, Saisonalität und zusätzliche Kosten sind nicht berücksichtigt. Negative Werte zeigen einen Nachteil.",
      44,
      726,
      8.5,
      false,
      507,
      muted,
    )
    text("agenticit.ch | info@agenticit.ch", 44, 782, 8.5, false, 507, green)
    doc.end()
  })
}
