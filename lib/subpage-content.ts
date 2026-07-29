// AgenticIT · Inhalte der Unterseiten (aus den PAS-Drafts, Stand 20.06.2026).
// ⚠️ Human-in-the-Loop: Marktzahlen/ROI sowie DSG-Aussagen vor Live-Schaltung
// menschlich (und wo nötig juristisch) prüfen und mit Quellen belegen.
//
// GTM/RevOps-Split (26.07.2026, SEMrush-validiert): "loesungen" hat neu genau
// zwei Hub-Seiten — gtm-markteintritt (Kunden holen) und revops-umsatzgenerierung
// (aus Kunden mehr machen). Die alten drei Seiten (kundendienst-ki,
// prozessautomatisierung, revops-growth) wurden in diese zwei aufgeteilt und
// per 301 dorthin umgeleitet, siehe next.config.mjs.

import type { AngebotChartData } from "@/lib/angebot-content"

export type SubBullet = { lead?: string; text: string }

export type SubPageContent = {
  slug: string // voller Pfad-Slug, z. B. "loesungen/gtm-markteintritt"
  parentSlug: string // "loesungen"
  parentLabel: string // "Lösungen"
  navLabel: string // "GTM: Markteintritt"
  problem: { title: string; body: string[]; kicker?: string }
  agitate: { title: string; intro?: string; bullets: SubBullet[]; outro?: string[] }
  solution: {
    title: string
    intro: string[]
    changeTitle?: string
    bullets: SubBullet[]
    easyTitle?: string
    easyText?: string
  }
  /** Optionales Style-Visual (wiederverwendet die Angebot-Chart-Bibliothek). */
  chart?: AngebotChartData
  chartAccent?: string
  /** Cross-Links zu passenden Angebot-Bereichen (z. B. GTM → Begeistern/Umsetzen). */
  relatedAngebot?: Array<"begeistern" | "umsetzen" | "erschaffen" | "erweitern">
  interactive?: { label: string; text: string }
  voiceAgent?: {
    agentId: string
    branchId?: string
    eyebrow?: string
    title?: string
    description?: string
  }
  chooseAgentDemo?: boolean
  multiAgentTimeWin?: boolean
  enterpriseOrgChart?: boolean
  /** GTM-Seite: Story-Sektion "Warum Go-to-Market entscheidet" + Checklisten-Lead-Magnet. */
  gtmPlaybook?: boolean
  cta: { title: string; text: string; primary: string; assistant: string }
  contact?: { email?: string; phone?: string; address?: string; calendar?: string }
  meta: { title: string; description: string }
}

export const SUBPAGES: Record<string, SubPageContent> = {
  // ───────────────────────── LÖSUNGEN ─────────────────────────
  "loesungen/gtm-markteintritt": {
    slug: "loesungen/gtm-markteintritt",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "GTM: Markteintritt",
    problem: {
      title: "Ihre Kunden suchen längst. Nur nicht bei Ihnen.",
      body: [
        "Jeden Monat suchen Tausende in der Schweiz genau das, was Sie anbieten – bei Google, und immer öfter direkt bei ChatGPT. Gefunden wird, wer dort steht. Die anderen existieren für den Kunden schlicht nicht.",
        "Und wenn doch eine Anfrage kommt: 19 Uhr, Feierabend. Bis morgen früh hat der Interessent längst beim Nächsten unterschrieben.",
      ],
      kicker: "Der Markt wartet nicht.",
    },
    agitate: {
      title: "Jede unbeantwortete Anfrage ist ein Geschenk an Ihre Konkurrenz.",
      bullets: [
        { lead: "Die KI-Suche kennt Sie nicht.", text: "Immer mehr Kunden fragen ChatGPT statt Google – wer dort nicht auftaucht, wird nicht einmal verglichen." },
        { lead: "Nach 5 Minuten ist der Lead kalt.", text: "Die Abschlusswahrscheinlichkeit fällt um ein Vielfaches, wenn die Antwort Stunden statt Sekunden dauert." },
        { lead: "Kaltakquise verpufft.", text: "Streuverlust statt planbarer Termine – und Ihre besten Leute verbrennen ihre Zeit am Telefon." },
      ],
      outro: ["Jeder Monat ohne System vergrössert den Vorsprung der Konkurrenz, die längst automatisiert gefunden wird und automatisiert antwortet."],
    },
    solution: {
      title: "Der agentische Markteintritt: gefunden werden, sofort antworten, Termin sichern.",
      intro: [
        "Wir bauen Ihre Kundengewinnung als System: Zuerst messen wir mit dem Branchen-Radar die echte Nachfrage in Ihrer Region – dann besetzen KI-Agenten jeden Schritt vom ersten Klick bis zum vollen Kalender.",
      ],
      changeTitle: "Das ändert sich ab Tag eins:",
      bullets: [
        { lead: "Sichtbar in Google & KI-Antworten", text: "– SEO und AIO/GEO sorgen dafür, dass Google UND ChatGPT Sie empfehlen, bevor die Konkurrenz genannt wird." },
        { lead: "Kampagnen mit klarem Preisschild", text: "– bezahlte Werbung, gesteuert auf Kosten pro Termin statt auf Klicks. Sie sehen jeden Franken und was er bringt." },
        { lead: "Speed-to-Lead in Sekunden", text: "– ob Formular, Anruf oder WhatsApp: ein Agent meldet sich sofort, qualifiziert und bucht den Termin. 24/7, auch am Sonntag." },
        { lead: "Nachfassen läuft automatisch", text: "– kein Interessent geht mehr vergessen: freundliche Follow-ups per E-Mail und Telefon, bis der Termin steht oder ein klares Nein." },
        { lead: "Volle Kalender statt Telefon-Pingpong", text: "– der Agent vereinbart Termine direkt in Ihrer Agenda und erinnert beide Seiten." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText: "Kein neues Tool zum Lernen. Ein klares Dashboard zeigt Nachfrage, Anfragen und Termine – der Rest läuft automatisiert. Daten bleiben in der Schweiz.",
    },
    chart: {
      type: "funnel",
      title: "Vom Unsichtbaren zum Kunden",
      steps: [
        { label: "Sichtbar", pct: 100 },
        { label: "Anfrage", pct: 62 },
        { label: "Termin", pct: 38 },
        { label: "Kunde", pct: 22 },
      ],
    },
    chartAccent: "#57C7FF",
    relatedAngebot: ["begeistern", "umsetzen"],
    gtmPlaybook: true,
    interactive: {
      label: "Live-Element: Speed-to-Lead-Simulator",
      text: "Eine Anfrage trifft ein – sehen Sie live, wie ein Agent in Sekunden antwortet und einen Termin bucht.",
    },
    cta: {
      title: "Sehen Sie Ihren Markteintritt in Zahlen.",
      text: "Der Branchen-Radar zeigt, wie viele Menschen in Ihrer Region jeden Monat nach Ihrem Angebot suchen – und wer diese Anfragen heute bekommt. Spoiler: Es muss nicht die Konkurrenz sein.",
      primary: "Jetzt kostenlosen Rückruf sichern",
      assistant: "Markteintritt prüfen",
    },
    meta: {
      title: "GTM: Kundengewinnung mit KI-Agenten",
      description:
        "Go-to-Market als System: Sichtbarkeit in Google & KI-Antworten (SEO/AIO), Kampagnen auf Kosten pro Termin, Speed-to-Lead in Sekunden, automatische Termine. Planbar statt Kaltakquise.",
    },
  },

  "loesungen/revops-umsatzgenerierung": {
    slug: "loesungen/revops-umsatzgenerierung",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "RevOps: Umsatzgenerierung",
    problem: {
      title: "Kunden sind da. Der Umsatz bleibt trotzdem liegen.",
      body: [
        "Dieselbe Excel-Tabelle zum dritten Mal aktualisiert. Ein Vertrag läuft unbemerkt aus.",
        "Marketing, Vertrieb und Service arbeiten nebeneinander – in den Lücken dazwischen verschwindet Ihr Umsatz.",
      ],
      kicker: "Wachstum, das nicht ankommt.",
    },
    agitate: {
      title: "Jeder manuelle Prozess kostet mehr als ein neuer Kunde einbringt.",
      bullets: [
        { lead: "Abwanderung unbemerkt.", text: "Kündigungen kommen selten aus heiterem Himmel – die Warnsignale werden nur übersehen." },
        { lead: "Fleissarbeit statt Facharbeit.", text: "Ihre besten Leute tippen Daten ab, statt zu beraten." },
        { lead: "Bestand ungenutzt.", text: "Der günstigste Umsatz – aus bestehenden Kunden – bleibt liegen." },
      ],
      outro: ["Das ist kein Wachstum. Das ist ein Bremsklotz, den Sie jeden Monat teurer bezahlen."],
    },
    solution: {
      title: "Der agentische RevOps-Motor: binden, ausbauen, automatisieren.",
      intro: [
        "Wir verbinden Marketing, Vertrieb und Service zu einem System, das Kunden hält, ausbaut – und den Betrieb im Hintergrund am Laufen.",
      ],
      changeTitle: "Das ändert sich ab Tag eins:",
      bullets: [
        { lead: "Kündigungs-Frühwarnung", text: "erkennt Abwanderung, bevor sie passiert." },
        { lead: "Bestands-Ausbau", text: "– mehr Umsatz aus Kunden, die Sie längst haben." },
        { lead: "Prozesse laufen von allein", text: "– erfassen, prüfen, weiterleiten, fehlerfrei." },
        { lead: "Referenz aus dem Markt:", text: "vergleichbare KI-Systeme erreichen im Schnitt 171 % ROI." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText: "Ein klares Dashboard zeigt jederzeit, wo jeder Kunde steht. Kein Tool-Wirrwarr, Daten bleiben in der Schweiz.",
    },
    chart: {
      type: "line",
      title: "Umsatz pro Kunde über Zeit (Index)",
      xLabels: ["Start", "+3 Mt.", "+6 Mt.", "+12 Mt."],
      agentic: [100, 122, 148, 178],
      now: [100, 103, 106, 107],
    },
    chartAccent: "#1F9A5E",
    relatedAngebot: ["erschaffen", "erweitern"],
    interactive: {
      label: "Live-Element: Wachstumsrechner",
      text: "Geben Sie Kundenzahl und Abwanderungsquote ein und sehen Sie, wie sich Ihr Umsatz über 12 Monate verändert.",
    },
    voiceAgent: {
      agentId: "agent_0201kwjmq83cf1btc17d9048pf8n",
      branchId: "agtbrch_6601kvjmepw7fa6thh05fk60s626",
      eyebrow: "RevOps live testen",
      title: "Sprechen Sie mit unserem RevOps-Agenten.",
      description: "Testen Sie Kundenbindung, Nachfassung und Wachstum – sprechen Sie direkt mit dem Agenten.",
    },
    cta: {
      title: "Sehen Sie, wie viel Umsatz aktuell liegen bleibt.",
      text: "In einer kostenlosen Analyse zeigen wir Ihnen, wo Umsatz versickert – und was es bringt, das zu schliessen.",
      primary: "Jetzt kostenlose Wachstums-Analyse sichern",
      assistant: "Wachstumspotenzial berechnen",
    },
    meta: {
      title: "RevOps: mehr Umsatz aus bestehenden Kunden",
      description:
        "Kundenbindung, Customer Lifetime Value und Prozessautomatisierung als ein RevOps-Motor. Kein Umsatz versickert mehr. Schweizer Datenhaltung.",
    },
  },

  // ───────────────────────── TECHNOLOGIE ─────────────────────────
  "technologie/autonome-ki-agenten": {
    slug: "technologie/autonome-ki-agenten",
    parentSlug: "technologie",
    parentLabel: "Technologie",
    navLabel: "Autonome KI-Agenten",
    problem: {
      title: "KI redet. Handelt nicht.",
      body: [
        "Sie bekommen einen Vorschlag, eine Antwort, eine Zusammenfassung – und müssen den eigentlichen Schritt trotzdem selbst machen.",
        "Anrufen. Eintragen. Nachfassen. Buchen.",
        "Das ist kein digitaler Kollege. Das ist ein weiteres Programm, das Ihre Aufmerksamkeit fordert.",
      ],
    },
    agitate: {
      title: "Ein Helfer, der nur redet, schafft neue Arbeit – keine Entlastung.",
      intro: "Solange die KI nur Vorschläge macht, gilt:",
      bullets: [
        { lead: "Sie bleiben der Flaschenhals.", text: "Jede Aufgabe wartet weiterhin auf einen Menschen." },
        { lead: "Halbe Automatisierung frustriert:", text: "Die Hälfte erledigt das Tool, die andere Hälfte hängt an Ihnen." },
        { lead: "Nachts und am Wochenende steht alles still", text: "– genau dann, wenn Kunden anfragen." },
      ],
      outro: [
        "Und während Sie noch abtippen, was ein Tool „vorgeschlagen“ hat, hat die Konkurrenz mit echten Agenten die Aufgabe längst abgeschlossen.",
      ],
    },
    solution: {
      title: "Ein Agent, der den nächsten Schritt selbst macht.",
      intro: [
        "Ein autonomer KI-Agent wartet nicht auf Knopfdruck. Er erkennt einen Auslöser und handelt von Anfang bis Ende.",
        "Das Telefon klingelt → der Agent meldet sich, klärt das Anliegen, bucht den Termin und trägt ihn ein. Ohne Ihr Zutun.",
      ],
      changeTitle: "Das macht ihn zum echten Kollegen:",
      bullets: [
        { lead: "Übernimmt klar definierte Aufgaben", text: "komplett selbstständig." },
        { lead: "Arbeitet rund um die Uhr", text: "– ohne Pause, ohne Müdigkeitsfehler." },
        { lead: "Sie behalten die Kontrolle:", text: "jede Regel und Grenze bestimmen Sie." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Sie geben dem Agenten seine Aufgabe über eine klare Oberfläche – den Rest erledigt er. Kein Programmieren, kein IT-Studium. Ihre Daten bleiben in der Schweiz.",
    },
    interactive: {
      label: "Live-Element: „Wähle deinen Agenten“",
      text: "Bestimmen Sie eine Rolle, der Agent demonstriert live seinen Task (Telefon klingelt → meldet sich → qualifiziert → bucht Termin).",
    },
    chooseAgentDemo: true,
    cta: {
      title: "Lassen Sie einen Agenten eine echte Aufgabe übernehmen.",
      text: "In einer kurzen Demo zeigen wir Ihnen einen Agenten, der eine Aufgabe aus Ihrem Alltag erledigt.",
      primary: "Jetzt kostenlose Live-Demo sichern",
      assistant: "Agenten ausprobieren",
    },
    meta: {
      title: "Autonome KI-Agenten fÃ¼r Unternehmen",
      description:
        "Ein KI-Agent, der selbstständig handelt: Anruf annehmen, qualifizieren, Termin buchen – rund um die Uhr. Sie bestimmen die Regeln. Schweizer Datenhaltung.",
    },
  },

  "technologie/multi-agenten-systeme": {
    slug: "technologie/multi-agenten-systeme",
    parentSlug: "technologie",
    parentLabel: "Technologie",
    navLabel: "Multi-Agenten-Systeme",
    problem: {
      title: "Ein Helfer. Alles nacheinander.",
      body: [
        "Komplexe Abläufe bestehen aus vielen Schritten: recherchieren, prüfen, erstellen, versenden.",
        "Ein einzelner Helfer macht das nacheinander – Schritt für Schritt. Und Sie warten, bis er fertig ist.",
      ],
    },
    agitate: {
      title: "Nacheinander ist langsam. Und langsam ist im Geschäft teuer.",
      intro: "Wenn alles über eine einzige Instanz läuft:",
      bullets: [
        { lead: "Engpass garantiert:", text: "Jeder Schritt muss warten, bis der vorige fertig ist." },
        { lead: "Keine Spezialisierung:", text: "Ein Alleskönner macht jede Teilaufgabe nur mittelgut." },
        { lead: "Wachstum bringt das System ins Stocken:", text: "mehr Aufgaben, längere Wartezeiten." },
      ],
      outro: [
        "In der Zwischenzeit liefert ein Mitbewerber, dessen System die Arbeit aufteilt, das Ergebnis in einem Bruchteil der Zeit – und gewinnt den Auftrag.",
      ],
    },
    solution: {
      title: "Mehrere Spezialisten, die gleichzeitig anpacken.",
      intro: [
        "Ein Multi-Agenten-System teilt die Arbeit auf: Ein Hauptagent zerlegt die Aufgabe, mehrere Spezial-Agenten arbeiten parallel daran – jeder an seinem Teil.",
      ],
      changeTitle: "Das bringt es Ihnen:",
      bullets: [
        { lead: "Deutlich schneller", text: "als ein einzelner Agent, der alles nacheinander macht." },
        { lead: "Höhere Qualität,", text: "weil jeder Agent Spezialist für seinen Teil ist." },
        { lead: "Wächst mit:", text: "mehr Last? Einfach mehr Agenten." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Sie sehen nur das fertige Ergebnis und einen klaren Fortschritt – die Koordination im Hintergrund übernehmen wir. Ihre Daten bleiben in der Schweiz.",
    },
    interactive: {
      label: "Live-Element: Zeitgewinn-Visualisierung",
      text: "Eine Aufgabe wird in Segmente geteilt, mehrere Sub-Agenten laufen parallel. Ein Fortschrittsbalken zeigt den Zeitgewinn gegenüber „nacheinander“.",
    },
    multiAgentTimeWin: true,
    cta: {
      title: "Sehen Sie, wie ein Agenten-Team Ihre Aufgabe halbiert.",
      text: "Wir zeigen Ihnen an einem echten Beispiel, wie viel schneller ein Multi-Agenten-System arbeitet.",
      primary: "Jetzt kostenlose Live-Demo sichern",
      assistant: "Multi-Agenten-System erleben",
    },
    meta: {
      title: "Multi-Agenten-Systeme für Unternehmen",
      description:
        "Mehrere KI-Agenten arbeiten gleichzeitig an einer Aufgabe – schneller und präziser als ein einzelner. Skaliert mit Ihrem Bedarf. Schweizer Datenhaltung.",
    },
  },

  "technologie/enterprise-integration": {
    slug: "technologie/enterprise-integration",
    parentSlug: "technologie",
    parentLabel: "Technologie",
    navLabel: "Enterprise-Integration",
    problem: {
      title: "KI neben Ihren Systemen.",
      body: [
        "Ein neues Tool hier, eine Insellösung dort – und am Ende müssen Ihre Leute Daten von Hand zwischen den Programmen hin- und herschaufeln.",
        "Statt Entlastung entsteht ein weiteres System, das niemand mit den anderen verbindet.",
      ],
    },
    agitate: {
      title: "Insellösungen kosten doppelt: einmal Geld, einmal Nerven.",
      intro: "Wenn KI nicht in Ihre Welt integriert ist:",
      bullets: [
        { lead: "Doppelte Arbeit:", text: "dieselben Daten in mehreren Systemen pflegen." },
        { lead: "Fehler und Lücken,", text: "weil Informationen nicht automatisch zusammenfliessen." },
        { lead: "Akzeptanz sinkt:", text: "Ihr Team meidet Tools, die den Alltag komplizierter machen." },
      ],
      outro: [
        "So wird aus einer teuren Investition ein digitaler Staubfänger – und die erhoffte Effizienz bleibt aus.",
      ],
    },
    solution: {
      title: "Wir docken die KI dort an, wo Sie schon arbeiten.",
      intro: [
        "Wir integrieren die Agenten in Ihre bestehende Umgebung – E-Mail, Telefonie, CRM, Buchhaltung. Auf jeder Unternehmensebene andockt ein digitaler Kollege und liefert seinen Beitrag.",
      ],
      changeTitle: "Das bringt es Ihnen:",
      bullets: [
        { lead: "Kein Systemwechsel:", text: "Ihre Tools bleiben, die KI kommt dazu." },
        { lead: "Daten fliessen automatisch", text: "zwischen Ihren Systemen – kein Doppelpflegen." },
        { lead: "Kundendienst rauf, lästige Aufgaben runter,", text: "zufriedenere Mitarbeiter." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Die Integration übernehmen wir – sauber und sicher nach Schweizer Standard. Sie merken nur, dass plötzlich alles zusammenspielt. Ihre Daten bleiben in der Schweiz.",
    },
    interactive: {
      label: "Live-Element: Org-Chart-Andockung",
      text: "Ein Org-Chart, in dem auf jeder Ebene ein „digitaler Kollege“ andockt und seinen Beitrag zeigt (Kundendienst ↑, lästige Aufgaben ↓, zufriedene Mitarbeiter).",
    },
    enterpriseOrgChart: true,
    cta: {
      title: "Sehen Sie, wie KI in Ihre Systemlandschaft passt.",
      text: "In einem kostenlosen Gespräch zeigen wir Ihnen, wo ein digitaler Kollege bei Ihnen andocken würde – ohne Umbau.",
      primary: "Jetzt kostenloses Integrations-Gespräch sichern",
      assistant: "Integration prüfen",
    },
    meta: {
      title: "KI- und Systemintegration für Unternehmen",
      description:
        "KI dockt an Ihre bestehenden Systeme an – E-Mail, CRM, Telefonie, Buchhaltung. Kein Systemwechsel, kein Umbau. Auf jeder Ebene ein digitaler Kollege.",
    },
  },

}

export const SUBPAGE_SLUGS = Object.keys(SUBPAGES)

// Unterseiten gruppiert nach Eltern-Hub (für Verlinkung in den Hub-Seiten).
export const SUBPAGES_BY_PARENT: Record<string, SubPageContent[]> = SUBPAGE_SLUGS.reduce(
  (acc, key) => {
    const page = SUBPAGES[key]
    ;(acc[page.parentSlug] ||= []).push(page)
    return acc
  },
  {} as Record<string, SubPageContent[]>,
)
