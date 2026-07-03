// 5-seitiger PDF-Report (pdfkit), Material-Light: White Core, Hellblau/Hellorange, schwarze Typo.

import PDFDocument from "pdfkit"
import QRCode from "qrcode"
import type { Analysis } from "./types"

const INK = "#16233B"
const SUB = "#5C6B82"
const HAIR = "#E6ECF3"
const SURF = "#F6F8FB"
const BLUE = "#2DA8FF"
const ORANGE = "#F97316"
const GREEN = "#2BB673"
const AMBER = "#E69A2E"
const ROSE = "#F2667A"

const W = 595.28
const H = 841.89
const M = 48
const CW = W - 2 * M
const TOTAL = 7

function n(v: number): string {
  return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
function chf(v: number): string {
  return "CHF " + n(v)
}
// pdfkit-Standardfont (WinAnsi) kann manche Unicode-Zeichen nicht – ersetzen.
function san(s: string): string {
  return (s || "")
    .replace(/[→⟶➔➜⇨]/g, "->")
    .replace(/⇒/g, "=>")
    .replace(/↑/g, "+")
    .replace(/↓/g, "-")
    .replace(/[✓✔]/g, "+")
    .replace(/[✗✘]/g, "x")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
}

type Doc = PDFKit.PDFDocument

function hline(doc: Doc, y: number, x0 = M, x1 = W - M, color = HAIR) {
  doc.moveTo(x0, y).lineTo(x1, y).lineWidth(0.8).strokeColor(color).stroke()
}
function label(doc: Doc, x: number, y: number, text: string, color = BLUE) {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(color).text(text.split("").join(" "), x, y)
}
function tick(doc: Doc, x: number, y: number, color = BLUE, w = 18, h = 3) {
  doc.roundedRect(x, y, w, h, h / 2).fill(color)
}
function card(doc: Doc, x: number, y: number, w: number, h: number, fill = "#FFFFFF", stroke = HAIR) {
  doc.save()
  doc.roundedRect(x + 1.5, y + 2.5, w, h, 12).fill("#EDF1F6")
  doc.roundedRect(x, y, w, h, 12).fillAndStroke(fill, stroke)
  doc.restore()
}
function bar(doc: Doc, x: number, y: number, w: number, pct: number, color: string, h = 6) {
  doc.roundedRect(x, y, w, h, h / 2).fill(HAIR)
  doc.roundedRect(x, y, Math.max(h, w * Math.min(pct, 1)), h, h / 2).fill(color)
}

function header(doc: Doc, page: number, lblText: string, titleLight: string, titleBold: string) {
  tick(doc, M, 56)
  label(doc, M + 26, 53, lblText)
  doc.font("Helvetica").fontSize(8.5).fillColor(SUB).text(`${String(page).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`, W - M - 60, 53, { width: 60, align: "right" })
  doc.font("Helvetica").fontSize(21).fillColor(INK).text(titleLight + " ", M, 78, { continued: true })
  doc.font("Helvetica-Bold").text(titleBold)
  hline(doc, 112)
  return 130
}
function footer(doc: Doc) {
  hline(doc, H - 52)
  doc.font("Helvetica").fontSize(7.3).fillColor(SUB)
  doc.text("AgenticIT · Agentische Standortbestimmung · KI-gestützter Entwurf, vor Versand menschlich geprüft · DSG-konform", M, H - 44, { width: CW })
  doc.text("agenticit.ch", W - M - 80, H - 44, { width: 80, align: "right" })
}

export async function generatePdf(a: Analysis): Promise<Buffer> {
  const qr = await QRCode.toBuffer("https://agenticit.ch/#kontakt", { margin: 1, width: 200 })
  const C = a.contact
  const fullName = `${C.vorname} ${C.nachname}`.trim()
  const dateStr = new Date(a.generatedAt).toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" })

  return await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0 })
    const chunks: Buffer[] = []
    doc.on("data", (c: Buffer) => chunks.push(c))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    /* ---------- PAGE 1 · DECKBLATT ---------- */
    doc.rect(0, 0, W, 6).fill(BLUE)
    doc.rect(W * 0.62, 0, W - W * 0.62, 6).fill(ORANGE)
    // Brand
    doc.roundedRect(M, 54, 24, 24, 7).fill(BLUE)
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#FFFFFF").text("A", M + 6.5, 60)
    doc.font("Helvetica-Bold").fontSize(14).fillColor(INK).text("AgenticIT", M + 33, 60)
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(SUB).text("100% SCHWEIZER UNTERNEHMEN".split("").join(" "), W - M - 240, 62, { width: 240, align: "right" })

    // Titelblock
    const cy = 235
    label(doc, M, cy, "STANDORTBESTIMMUNG · KI & DIGITALES WACHSTUM")
    doc.font("Helvetica").fontSize(40).fillColor(INK).text("Klarer Blick auf", M, cy + 22)
    doc.font("Helvetica-Bold").fontSize(40).fillColor(INK).text("Ihr Potenzial.", M, cy + 68)
    doc.font("Helvetica").fontSize(13).fillColor(SUB).text(
      "Eine kompakte Auswertung Ihrer Abläufe, Ihrer Sichtbarkeit und Ihrer Wachstumshebel — verständlich aufbereitet, auf einen Blick.",
      M, cy + 122, { width: 380, lineGap: 5 },
    )
    hline(doc, cy + 186)
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(SUB).text("VERTRAUTE PLATTFORMEN".split("").join(" "), M, cy + 200)
    doc.font("Helvetica-Bold").fontSize(12).fillColor(INK).text("Google      Microsoft      Anthropic", M, cy + 218)
    doc.font("Helvetica-Bold").fontSize(9).fillColor(ORANGE).text("Über 15 Jahre Erfahrung im Online-Markt", M, cy + 242)

    // Empfänger-Karte + QR
    const py = 648
    card(doc, M, py, CW, 110)
    doc.font("Helvetica-Bold").fontSize(8).fillColor(SUB).text("ERSTELLT FÜR".split("").join(" "), M + 24, py + 22)
    doc.font("Helvetica-Bold").fontSize(8).fillColor(SUB).text("DOMAIN".split("").join(" "), M + 250, py + 22)
    doc.font("Helvetica-Bold").fontSize(8).fillColor(SUB).text("DATUM".split("").join(" "), M + 24, py + 64)
    doc.font("Helvetica-Bold").fontSize(15).fillColor(INK).text(C.firma, M + 24, py + 38, { width: 200 })
    doc.font("Helvetica-Bold").fontSize(13).fillColor(BLUE).text(C.url || "—", M + 250, py + 38, { width: 180 })
    doc.font("Helvetica-Bold").fontSize(12).fillColor(INK).text(dateStr, M + 24, py + 80)
    doc.image(qr, W - M - 100, py + 16, { width: 84, height: 84 })
    doc.font("Helvetica").fontSize(7).fillColor(SUB).text("Auf dem Handy öffnen", W - M - 116, py + 102, { width: 116, align: "center" })

    doc.font("Helvetica").fontSize(8).fillColor(SUB).text(
      `Persönliche Auswertung für ${fullName || C.firma}. Vertraulich · KI-gestützter Entwurf, vor Versand menschlich geprüft · DSG-konform · Daten in der Schweiz.`,
      M, 778, { width: CW, lineGap: 2 },
    )
    doc.rect(0, H - 6, W, 6).fill(BLUE)

    /* ---------- PAGE 2 · IST-SITUATION ---------- */
    doc.addPage({ size: "A4", margin: 0 })
    let y = header(doc, 2, "TEIL 1 · WEBAUFTRITT & SICHTBARKEIT", "Ihre", "Ist-Situation.")
    doc.font("Helvetica").fontSize(11).fillColor(SUB).text(
      "So sichtbar ist Ihr Unternehmen heute online — und hier liegt die Luft nach oben, aus der sich Anfragen und Umsatz gewinnen lassen.",
      M, y, { width: CW, lineGap: 3 },
    )
    y += 44

    // Sichtbarkeits-Scorecards
    const vis = [
      { name: "Lokal", v: a.visibility.local, c: AMBER },
      { name: "Google", v: a.visibility.google, c: BLUE },
      { name: "Bing", v: a.visibility.bing, c: ROSE },
      { name: "KI-Suche", v: a.visibility.ki, c: GREEN },
    ]
    const cw = (CW - 3 * 12) / 4
    vis.forEach((s, i) => {
      const x = M + i * (cw + 12)
      card(doc, x, y, cw, 72)
      doc.font("Helvetica-Bold").fontSize(21).fillColor(INK).text(String(s.v), x + 14, y + 16)
      doc.font("Helvetica").fontSize(9).fillColor(SUB).text("/100", x + 14 + doc.widthOfString(String(s.v)) + 16, y + 24)
      bar(doc, x + 14, y + 44, cw - 28, s.v / 100, s.c)
      doc.font("Helvetica-Bold").fontSize(9).fillColor(SUB).text(s.name, x + 14, y + 54)
    })
    y += 72 + 22

    // Website-Technik (Lighthouse)
    if (a.lighthouse.found) {
      label(doc, M, y, "WEBSITE-TECHNIK · GOOGLE LIGHTHOUSE (MOBIL)")
      y += 16
      card(doc, M, y, CW, 56, SURF)
      const lh: [string, string][] = [
        [a.lighthouse.performance != null ? String(a.lighthouse.performance) : "—", "Performance /100"],
        [a.lighthouse.seo != null ? String(a.lighthouse.seo) : "—", "SEO /100"],
        [a.lighthouse.lcp != null ? `${String(a.lighthouse.lcp).replace(".", ",")} s` : "—", "Ladezeit (LCP)"],
      ]
      const lw = CW / 3
      lh.forEach((m, i) => {
        const x = M + i * lw
        if (i) doc.moveTo(x, y + 12).lineTo(x, y + 44).lineWidth(0.8).strokeColor(HAIR).stroke()
        doc.font("Helvetica-Bold").fontSize(18).fillColor(INK).text(m[0], x + 16, y + 12)
        doc.font("Helvetica").fontSize(8.5).fillColor(SUB).text(m[1], x + 16, y + 36)
      })
      y += 56 + 16
    }

    // SEMrush
    label(doc, M, y, a.semrush.found ? "KENNZAHLEN · LIVE VIA SEMRUSH" : "SICHTBARKEIT · EINSCHÄTZUNG")
    y += 16
    if (a.semrush.found) {
      card(doc, M, y, CW, 56, SURF)
      const metrics = [
        [a.semrush.rank ? n(a.semrush.rank) : "—", "Authority-Rang"],
        [a.semrush.organicKeywords ? n(a.semrush.organicKeywords) : "—", "Keywords"],
        [a.semrush.organicTraffic ? n(a.semrush.organicTraffic) : "—", "Besuche/Mt."],
        [a.semrush.paidKeywords ? n(a.semrush.paidKeywords) : "—", "Paid-Keywords"],
      ]
      const mw = CW / 4
      metrics.forEach((mtr, i) => {
        const x = M + i * mw
        if (i) doc.moveTo(x, y + 12).lineTo(x, y + 44).lineWidth(0.8).strokeColor(HAIR).stroke()
        doc.font("Helvetica-Bold").fontSize(18).fillColor(INK).text(mtr[0], x + 16, y + 12)
        doc.font("Helvetica").fontSize(8.5).fillColor(SUB).text(mtr[1], x + 16, y + 36)
      })
      y += 56 + 12
      if (a.semrush.topKeywords.length) {
        doc.font("Helvetica").fontSize(8.5).fillColor(SUB).text("Top-Keywords: " + a.semrush.topKeywords.map((k) => `${k.keyword} (Pos. ${k.position})`).join("  ·  "), M, y, { width: CW })
        y += 22
      }
    } else {
      card(doc, M, y, CW, 50, SURF)
      doc.font("Helvetica").fontSize(10).fillColor(SUB).text(
        a.semrush.note || "Für diese Domain liegen noch keine Sichtbarkeitsdaten vor – ein klares Zeichen für ungenutztes Potenzial. Die Werte oben sind eine Einschätzung.",
        M + 16, y + 14, { width: CW - 32, lineGap: 2 },
      )
      y += 50 + 12
    }

    // Suchnachfrage in der Branche (die „Rechnung")
    if (a.searchDemand.total) {
      label(doc, M, y, "SUCHNACHFRAGE IN IHRER BRANCHE")
      y += 16
      doc.roundedRect(M, y, CW, 54, 12).fill(INK)
      doc.font("Helvetica").fontSize(9).fillColor("#9FB0C8").text("Suchanfragen / Monat (Auswahl)", M + 20, y + 11)
      doc.font("Helvetica-Bold").fontSize(23).fillColor("#FFFFFF").text(n(a.searchDemand.total), M + 20, y + 24)
      doc.font("Helvetica").fontSize(9).fillColor(BLUE).text(
        `bei guter Sichtbarkeit: ~${n(a.searchDemand.potentialVisitors)} Besucher  ·  ~${n(a.searchDemand.potentialLeads)} Anfragen / Mt.`,
        W - M - 290, y + 22, { width: 272, align: "right" },
      )
      y += 54 + 10
      doc.font("Helvetica").fontSize(8.5).fillColor(SUB)
      const kwLine = a.searchDemand.keywords.map((k) => `${san(k.keyword)} (${n(k.volume)})`).join("   ·   ")
      doc.text(kwLine, M, y, { width: CW })
      y += doc.heightOfString(kwLine, { width: CW }) + 5
      doc.font("Helvetica-Oblique").fontSize(7.5).fillColor(SUB).text(
        "Richtwerte (SEMrush CH) · Annahme 8 % erreichbare Reichweite, 4 % Anfragequote.",
        M, y, { width: CW },
      )
      y += 18
    }

    // Callout
    card(doc, M, y, CW, 46, SURF)
    tick(doc, M + 18, y + 13, ORANGE)
    doc.font("Helvetica-Bold").fontSize(12.5).fillColor(INK).text("Luft nach oben heisst: mehr Anfragen, ohne mehr Aufwand.", M + 18, y + 21)
    footer(doc)

    /* ---------- PAGE 2 · RESSOURCEN & AUTOMATION ---------- */
    doc.addPage({ size: "A4", margin: 0 })
    y = header(doc, 3, "TEIL 2 · RESSOURCEN & AUTOMATION", "Gewonnene", "Kapazität.")
    doc.font("Helvetica").fontSize(11).fillColor(SUB).text(
      "Wiederkehrende Tätigkeiten binden wertvolle Zeit. Diese Aufgaben übernehmen digitale Mitarbeitende — verlässlich und rund um die Uhr.",
      M, y, { width: CW, lineGap: 3 },
    )
    y += 44
    const de = (v: number) => String(v).replace(".", ",")
    const big = [
      [`${de(a.freed.weeklyHours)} Std.`, "pro Woche", BLUE],
      [`${n(a.freed.yearlyHours)} Std.`, "pro Jahr", "#1E8FE6"],
      [`${de(a.freed.fte)} FTE`, "freigesetzt", ORANGE],
    ] as const
    const bw = (CW - 2 * 14) / 3
    big.forEach((b, i) => {
      const x = M + i * (bw + 14)
      card(doc, x, y, bw, 72)
      tick(doc, x + 16, y + 16, b[2])
      doc.font("Helvetica-Bold").fontSize(22).fillColor(INK).text(b[0], x + 16, y + 26)
      doc.font("Helvetica").fontSize(9.5).fillColor(SUB).text(b[1], x + 16, y + 54)
    })
    y += 72 + 24
    label(doc, M, y, "WAS IHRE DIGITALEN KOLLEGEN ÜBERNEHMEN")
    y += 18
    const tasks = a.tasks.length ? a.tasks : [{ label: "Allgemeine Routineaufgaben", hours: 4 }]
    const maxH = Math.max(...tasks.map((t) => t.hours), 5)
    tasks.forEach((t) => {
      doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(t.label, M, y)
      bar(doc, W - M - 230, y + 2, 150, t.hours / maxH, BLUE)
      doc.font("Helvetica-Bold").fontSize(9.5).fillColor(SUB).text(`${t.hours} Std./Wo.`, W - M - 70, y, { width: 70, align: "right" })
      hline(doc, y + 20)
      y += 30
    })
    y += 10
    if (a.automation.length) {
      label(doc, M, y, "PASSEND FÜR IHRE BRANCHE")
      y += 16
      a.automation.slice(0, 3).forEach((p) => {
        doc.circle(M + 4, y + 5, 3).fill(BLUE)
        doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(san(p.title), M + 16, y, { continued: true })
        doc.font("Helvetica").fontSize(10).fillColor(SUB).text(`  —  ${san(p.benefit)}`)
        y += 15
        if (p.ablauf) {
          const t = san(p.ablauf)
          doc.font("Helvetica").fontSize(8.5).fillColor(SUB).text(t, M + 16, y, { width: CW - 16 })
          y += doc.heightOfString(t, { width: CW - 16 }) + 7
        } else {
          y += 5
        }
      })
    } else {
      doc.font("Helvetica-Oblique").fontSize(9).fillColor(SUB).text(
        "Aus diesen Stunden wird wieder Zeit für Kundschaft, Qualität und Wachstum.",
        M, y, { width: CW },
      )
    }
    footer(doc)

    /* ---------- PAGE 3 · REVENUE OPERATIONS ---------- */
    doc.addPage({ size: "A4", margin: 0 })
    y = header(doc, 4, "TEIL 3 · REVENUE OPERATIONS", "Aus Zeit wird", "Umsatz.")
    doc.font("Helvetica").fontSize(11).fillColor(SUB).text(
      "Die gewonnene Zeit fliesst ins Kerngeschäft — und moderne Abschlusstechnologie verwandelt Anfragen zuverlässiger in Aufträge.",
      M, y, { width: CW, lineGap: 3 },
    )
    y += 48
    const levers = [
      ["Zurückgewonnene Zeit", `${n(a.freed.yearlyHours)} Std./Jahr, bewertet`, a.roi.timeValue, GREEN],
      ["Zusätzliche Abschlüsse", "schnellere Reaktion, konsequentes Nachfassen", a.roi.dealsValue, BLUE],
      ["Stabilere Kundschaft", "weniger Abwanderung, mehr Wiederkauf", a.roi.retentionValue, "#1E8FE6"],
    ] as const
    levers.forEach((l) => {
      card(doc, M, y, CW, 46)
      tick(doc, M + 18, y + 11, l[3])
      doc.font("Helvetica-Bold").fontSize(11.5).fillColor(INK).text(String(l[0]), M + 18, y + 18)
      doc.font("Helvetica").fontSize(9).fillColor(SUB).text(String(l[1]), M + 18, y + 32)
      doc.font("Helvetica-Bold").fontSize(16).fillColor(String(l[3])).text(chf(Number(l[2])), W - M - 200, y + 16, { width: 182, align: "right" })
      y += 56
    })
    y += 2
    // Total band (dunkel)
    doc.roundedRect(M, y, CW, 60, 12).fill(INK)
    doc.font("Helvetica").fontSize(9.5).fillColor("#9FB0C8").text("Geschätzter Jahresbeitrag", M + 22, y + 14)
    doc.font("Helvetica-Bold").fontSize(26).fillColor("#FFFFFF").text(`rund ${chf(a.roi.total)}`, M + 22, y + 28)
    doc.font("Helvetica-Bold").fontSize(11).fillColor(BLUE).text(`Amortisation unter ${a.roi.paybackMonths} Monaten`, W - M - 230, y + 22, { width: 212, align: "right" })
    y += 60 + 18
    label(doc, M, y, a.revops.length ? "PASSENDE REVOPS-USE-CASES" : "EMPFOHLENE HEBEL")
    y += 16
    const revItems = a.revops.length
      ? a.revops.slice(0, 5).map((p) => ({ title: san(p.title), effect: san(p.benefit), ablauf: san(p.ablauf) }))
      : a.recommendations.slice(0, 5).map((r) => ({ title: r.title, effect: r.effect, ablauf: "" }))
    revItems.forEach((r) => {
      doc.circle(M + 4, y + 5, 3).fill(BLUE)
      doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(r.title, M + 16, y, { continued: true })
      doc.font("Helvetica").fontSize(10).fillColor(SUB).text(`  —  ${r.effect}`)
      y += 15
      if (r.ablauf) {
        doc.font("Helvetica").fontSize(8.5).fillColor(SUB).text(r.ablauf, M + 16, y, { width: CW - 16 })
        y += doc.heightOfString(r.ablauf, { width: CW - 16 }) + 7
      } else {
        y += 5
      }
    })
    footer(doc)

    /* ---------- PAGE 4 · SYNTHESE & ROADMAP ---------- */
    doc.addPage({ size: "A4", margin: 0 })
    y = header(doc, 5, "TEIL 4 · SYNTHESE", "Ihre Ziele,", "unser Fahrplan.")
    doc.font("Helvetica").fontSize(11).fillColor(SUB).text(
      "Eingangs ging es um Ihre Schwerpunkte. Hier sehen Sie, wie sich jeder davon einlösen lässt — und in welchem Tempo.",
      M, y, { width: CW, lineGap: 3 },
    )
    y += 44
    label(doc, M, y, "IHRE SCHWERPUNKTE · UNSERE ANTWORT")
    y += 16
    a.priorities.slice(0, 4).forEach((p) => {
      doc.circle(M + 4, y + 5, 3).fill(ORANGE)
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(p.want, M + 16, y)
      doc.font("Helvetica").fontSize(9.5).fillColor(SUB).text(p.answer, M + 16, y + 14, { width: CW - 16 })
      hline(doc, y + 32)
      y += 42
    })
    y += 8
    label(doc, M, y, "1-JAHRES-ROADMAP")
    y += 18
    const rw = (CW - 3 * 10) / 4
    a.roadmap.forEach((r, i) => {
      const x = M + i * (rw + 10)
      card(doc, x, y, rw, 106)
      doc.roundedRect(x, y, rw, 5, 0).fill(i % 2 ? ORANGE : BLUE)
      doc.font("Helvetica-Bold").fontSize(8).fillColor(i % 2 ? ORANGE : BLUE).text(r.period.toUpperCase(), x + 12, y + 14)
      doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(r.title, x + 12, y + 28, { width: rw - 22 })
      doc.font("Helvetica").fontSize(8).fillColor(SUB).text(r.desc, x + 12, y + 60, { width: rw - 22, lineGap: 1.5 })
    })
    footer(doc)

    /* ---------- PAGE 6 · WARUM AGENTICIT ---------- */
    doc.addPage({ size: "A4", margin: 0 })
    y = header(doc, 6, "WARUM AGENTICIT", "Warum", "mit uns.")
    doc.font("Helvetica").fontSize(11).fillColor(SUB).text(
      "Wir arbeiten selbst durchgängig mit Agenten — und geben den Effizienzgewinn direkt an Sie weiter.",
      M, y, { width: CW, lineGap: 3 },
    )
    y += 40
    const vals: [string, string][] = [
      ["Tempo", "Wir liefern in Tagen, wofür andere Wochen veranschlagen."],
      ["Konditionen", "Spitzenleistung zu Preisen, die angenehm überraschen."],
      ["Schweizer Wurzeln", "Daten, Verträge und Ansprechpartner — alles im Inland."],
      ["Haltung", "KI dort, wo sie Menschen entlastet, statt sie zu ersetzen."],
      ["Verlässlichkeit", "Klare Regeln, klare Grenzen. Die Kontrolle bleibt bei Ihnen."],
      ["Sinn", "Mehr Zeit für das, was zählt — Kundschaft, Team, Familie."],
    ]
    const vw = (CW - 14) / 2
    vals.forEach(([t, d], i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      const x = M + col * (vw + 14)
      const vy = y + row * 72
      card(doc, x, vy, vw, 62)
      tick(doc, x + 16, vy + 13, i % 2 ? ORANGE : BLUE)
      doc.font("Helvetica-Bold").fontSize(12).fillColor(INK).text(t, x + 16, vy + 20)
      doc.font("Helvetica").fontSize(8.8).fillColor(SUB).text(d, x + 16, vy + 37, { width: vw - 30, lineGap: 1.5 })
    })
    y += 3 * 72 + 8
    hline(doc, y)
    y += 18
    doc.font("Helvetica-Bold").fontSize(13).fillColor(BLUE).text("Gut für Ihr Unternehmen, Ihr Team und Ihre Kundschaft.", M, y, { width: CW, align: "center" })
    footer(doc)

    /* ---------- PAGE 7 · NEXT STEPS ---------- */
    doc.addPage({ size: "A4", margin: 0 })
    y = header(doc, 7, "TEIL 5 · NÄCHSTE SCHRITTE", "Sprechen", "wir darüber.")
    doc.font("Helvetica").fontSize(11).fillColor(SUB).text(
      "Diese Auswertung ist die Grundlage für ein kurzes, unverbindliches Gespräch. Drei Fragen als Einstieg:",
      M, y, { width: CW, lineGap: 3 },
    )
    y += 44
    const qs = [
      "Wie treffend spiegelt diese Auswertung Ihren Alltag wider?",
      "Welcher der gezeigten Hebel würde Ihnen am meisten bringen?",
      "Was ist Ihre brennendste Frage zum Thema KI & Automatisierung?",
    ]
    qs.forEach((q, i) => {
      card(doc, M, y, CW, 34)
      doc.font("Helvetica-Bold").fontSize(13).fillColor(BLUE).text(`0${i + 1}`, M + 16, y + 10)
      doc.font("Helvetica").fontSize(11).fillColor(INK).text(q, M + 50, y + 10, { width: CW - 64 })
      y += 44
    })
    y += 10
    // CTA + QR
    const ctaH = 110
    doc.roundedRect(M, y, CW, ctaH, 14).fill(INK)
    tick(doc, M + 24, y + 22, BLUE)
    doc.font("Helvetica-Bold").fontSize(17).fillColor("#FFFFFF").text("Was machen wir als Nächstes?", M + 24, y + 34)
    doc.font("Helvetica").fontSize(10).fillColor("#9FB0C8").text("Sichern Sie sich Ihr unverbindliches Strategiegespräch mit AgenticIT.", M + 24, y + 58, { width: CW - 180 })
    doc.roundedRect(M + 24, y + 76, 180, 24, 12).fill(BLUE)
    doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text("agenticit.ch/#kontakt", M + 24, y + 83, { width: 180, align: "center" })
    doc.image(qr, W - M - 92, y + 20, { width: 70, height: 70 })
    doc.font("Helvetica").fontSize(7).fillColor("#9FB0C8").text("Scannen & Termin sichern", W - M - 110, y + 92, { width: 100, align: "center" })
    footer(doc)

    doc.end()
  })
}
