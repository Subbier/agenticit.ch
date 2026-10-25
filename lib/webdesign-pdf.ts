import PDFDocument from "pdfkit"
import { buildWebsiteConcept, type WebsiteBrief } from "./webdesign-brief"

export async function buildWebdesignPdf(
  input: WebsiteBrief,
  person: { name: string; company: string },
) {
  const c = buildWebsiteConcept(input)
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 44,
      info: {
        Title: "Ihr persönliches Website-Konzept",
        Author: "AgenticIT GmbH",
      },
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
      color = "#183024",
      width = 507,
    ) =>
      doc
        .font("Helvetica")
        .fontSize(size)
        .fillColor(color)
        .text(value, x, y, { width, lineGap: 3 })
    text("AgenticIT", 44, 34, 13, c.style.color)
    text("Ihr persönliches Website-Konzept", 44, 72, 22)
    doc
      .fontSize(11)
      .fillColor("#45614d")
      .text(`${person.name} | ${person.company}`, 44, 111, {
        width: 507,
        height: 30,
        ellipsis: true,
      })
    doc.roundedRect(44, 157, 507, 85, 10).fill("#edf4e9")
    text("IHR VORHABEN", 60, 172, 9, c.style.color, 350)
    text(c.title, 60, 194, 17, "#183024", 350)
    doc.roundedRect(435, 173, 94, 54, 4).fill(c.style.color)
    doc
      .rect(444, 183, 50, 4)
      .fill("white")
      .rect(444, 193, 70, 2)
      .fill("white")
      .rect(444, 201, 60, 2)
      .fill("white")
      .roundedRect(444, 211, 28, 7, 2)
      .fill("white")
    text("Was Ihre Website für Sie erreichen soll", 44, 266, 12, c.style.color)
    text(c.goal.benefit, 44, 290)
    text("Ihre passende Seitenstruktur", 44, 346, 12, c.style.color)
    c.structure.forEach((item, i) => {
      const y = 374 + i * 29
      doc.circle(52, y + 6, 8).fill("#edf4e9")
      text(String(i + 1), 49, y + 1, 8, c.style.color, 10)
      text(item, 69, y, 10, "#183024", 480)
    })
    text(`Ihre Gestaltung: ${c.style.title}`, 44, 509, 12, c.style.color)
    text(c.style.description, 44, 533, 10)
    text("Ihre Inhalte und Bilder", 44, 584, 11, c.style.color)
    text(c.material, 44, 605, 10)
    text(`Ihr Wunschtermin: ${c.timing}`, 44, 658, 10)
    doc.roundedRect(44, 690, 507, 43, 6).fill(c.style.color)
    text(`Ihre Hauptaktion: ${c.goal.cta}`, 60, 705, 12, "white", 475)
    text(c.goal.feature, 44, 747, 9, "#45614d")
    text(
      "Startkonzept aus Ihren Angaben. Kein verbindlicher Umfang, Preis oder Liefertermin. agenticit.ch",
      44,
      789,
      7,
      "#45614d",
    )
    doc.end()
  })
}
