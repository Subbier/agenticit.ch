// AgenticIT · Inhalte der Unterseiten (aus den PAS-Drafts, Stand 20.06.2026).
// ⚠️ Human-in-the-Loop: Marktzahlen/ROI sowie DSG-Aussagen vor Live-Schaltung
// menschlich (und wo nötig juristisch) prüfen und mit Quellen belegen.

export type SubBullet = { lead?: string; text: string }

export type SubPageContent = {
  slug: string // voller Pfad-Slug, z. B. "loesungen/kundendienst-ki"
  parentSlug: string // "loesungen"
  parentLabel: string // "Lösungen"
  navLabel: string // "Kundendienst-KI"
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
  cta: { title: string; text: string; primary: string; assistant: string }
  contact?: { email?: string; phone?: string; address?: string; calendar?: string }
  meta: { title: string; description: string }
}

export const SUBPAGES: Record<string, SubPageContent> = {
  // ───────────────────────── LÖSUNGEN ─────────────────────────
  "loesungen/kundendienst-ki": {
    slug: "loesungen/kundendienst-ki",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "Kundendienst-KI",
    problem: {
      title: "Wartende Kunden gehen verloren.",
      body: [
        "Eine Anfrage kommt um 19 Uhr. Niemand antwortet bis morgen früh.",
        "Das Telefon klingelt, während alle im Gespräch sind. Der Anrufer legt auf.",
        "Eine simple Standardfrage bindet schon wieder einen Ihrer besten Mitarbeiter.",
        "Kundenservice ist heute ein Wettlauf um Sekunden – und die meisten Unternehmen verlieren ihn, ohne es zu merken.",
      ],
      kicker: "Kommt Ihnen bekannt vor?",
    },
    agitate: {
      title: "Jede unbeantwortete Anfrage ist eine Einladung an Ihre Konkurrenz.",
      intro: "Was wirklich passiert, während niemand antwortet:",
      bullets: [
        { lead: "Der Kunde ist weg.", text: "Wer keine schnelle Antwort bekommt, fragt beim Nächsten an – oft nur einen Klick entfernt." },
        { lead: "Ihr Team brennt aus.", text: "Ständige Unterbrechungen durch Routinefragen kosten Konzentration, Motivation und am Ende gute Leute." },
        { lead: "Ihr Ruf leidet.", text: "Eine schlechte Bewertung wegen langsamer Antwort liest jeder künftige Interessent mit." },
      ],
      outro: [
        "Und das Bittere: Diese Verluste tauchen in keiner Rechnung auf. Sie sehen nicht, was Sie verlieren – Sie spüren nur, dass es zäher läuft, als es müsste.",
        "Mit jedem Monat ohne Lösung wird der Rückstand auf die grösser, die ihren Service längst automatisiert haben.",
      ],
    },
    solution: {
      title: "Ein digitaler Kollege, der jede Anfrage sofort beantwortet – Tag und Nacht.",
      intro: [
        "Unsere Kundendienst-KI nimmt Anfragen entgegen, beantwortet die häufigsten Fragen selbstständig und bucht sogar Termine – über Chat und Telefon, rund um die Uhr.",
        "Kein Kunde wartet mehr. Kein Anruf geht verloren. Ihr Team hat den Rücken frei.",
      ],
      changeTitle: "Das ändert sich ab Tag eins:",
      bullets: [
        { lead: "Sofort-Antwort, immer:", text: "24 Stunden, 7 Tage – ohne Überstunden, ohne Pause." },
        { lead: "Bis zu 84 % kürzere Bearbeitungszeiten", text: "in Vorzeige-Projekten." },
        { lead: "Ihr Team konzentriert sich", text: "auf die kniffligen Fälle, nicht auf Routine." },
        { lead: "Termine landen direkt im Kalender", text: "– ohne Hin und Her." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Keine Schulungswochen, kein IT-Wissen. Sie sehen ein klares Dashboard, der Rest läuft im Hintergrund. Ihre Daten bleiben dabei in der Schweiz – DSG-konform.",
    },
    interactive: {
      label: "Live-Element: Sprechender Avatar „Kai“",
      text: "Stellen Sie „Kai“ live eine Kundenanfrage – er antwortet und vereinbart einen Termin. In 30 Sekunden sehen Sie, was die Kundendienst-KI im echten Betrieb leistet.",
    },
    cta: {
      title: "Erleben Sie Ihren digitalen Kundendienst – live.",
      text: "Lassen Sie unsere KI eine echte Anfrage aus Ihrem Alltag beantworten. Sie sehen sofort, wie das bei Ihren Kunden ankäme – und was es an Zeit spart.",
      primary: "Jetzt kostenlose Live-Demo sichern",
      assistant: "Kundendienst-KI testen",
    },
    meta: {
      title: "KI Kundenservice & Chatbot, der Termine bucht – AgenticIT",
      description:
        "Ein Chatbot, der Anfragen löst und Termine bucht – rund um die Uhr. Antwortzeiten runter, Kundenzufriedenheit rauf. Schweizer Datenhaltung. Jetzt live erleben.",
    },
  },

  "loesungen/prozessautomatisierung": {
    slug: "loesungen/prozessautomatisierung",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "Prozessautomatisierung",
    problem: {
      title: "Fleissarbeit statt Facharbeit.",
      body: [
        "Daten aus einer E-Mail ins System übertragen. Belege manuell erfassen. Dieselbe Excel-Tabelle zum dritten Mal aktualisieren.",
        "Tag für Tag verschwinden so Stunden – für Arbeit, die niemand bemerkt, solange sie erledigt ist, und alle bemerken, sobald sie liegen bleibt.",
      ],
      kicker: "Wertvolle Zeit, die in stupider Fleissarbeit versickert.",
    },
    agitate: {
      title: "Handarbeit ist nicht nur langsam. Sie ist teuer – und riskant.",
      intro: "Was diese manuellen Abläufe Sie wirklich kosten:",
      bullets: [
        { lead: "Versteckte Personalkosten:", text: "Ihre Fachkräfte verbringen einen Teil ihres Tages mit Aufgaben, für die Sie sie nicht eingestellt haben." },
        { lead: "Fehler, die nachher teuer werden:", text: "Ein Zahlendreher beim Abtippen, eine vergessene Frist – manuelle Schritte sind die häufigste Fehlerquelle überhaupt." },
        { lead: "Tempo, das nicht reicht:", text: "Während Ihre Abläufe auf den nächsten freien Mitarbeiter warten, liefert die automatisierte Konkurrenz längst." },
      ],
      outro: [
        "Und je mehr Ihr Unternehmen wächst, desto schlimmer wird es. Mehr Aufträge bedeuten mehr Handarbeit – bis Sie neue Leute nur einstellen, um Routine abzuarbeiten.",
        "Das ist kein Wachstum. Das ist ein Bremsklotz, den Sie jeden Monat teurer bezahlen.",
      ],
    },
    solution: {
      title: "Verbinden Sie Ihre Systeme – und lassen Sie die Abläufe von allein laufen.",
      intro: [
        "Unsere Prozessautomatisierung (im Fachjargon RPA) übernimmt genau die wiederkehrenden Schritte, die heute Zeit fressen: erfassen, übertragen, prüfen, weiterleiten.",
        "Ein Auslöser kommt – der Ablauf startet. Im Hintergrund, fehlerfrei, ohne Ihr Zutun.",
      ],
      changeTitle: "Das ändert sich ab Tag eins:",
      bullets: [
        { lead: "Kein Abtippen mehr:", text: "Daten fliessen automatisch von A nach B." },
        { lead: "Weniger Fehler,", text: "weil keine Handarbeit mehr im Spiel ist." },
        { lead: "Mehr Tempo:", text: "Abläufe starten in dem Moment, in dem der Auslöser eintrifft." },
        { lead: "Spürbare Ersparnis:", text: "Schweizer KMU mit klarem Anwendungsfall sparen CHF 8'000–25'000 pro Monat." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Sie müssen nichts programmieren und nichts umstellen. Wir docken an Ihre bestehenden Systeme an, Sie behalten den Überblick über ein klares Dashboard. Ihre Daten bleiben in der Schweiz – DSG-konform.",
    },
    interactive: {
      label: "Live-Element: Branchen-Trigger",
      text: "Wählen Sie Ihre Branche und lösen Sie per Klick einen Auslöser aus – ein branchenspezifischer Ablauf läuft live und automatisiert durch (z. B. „Anfrage eingeht → Daten erfasst → Angebot erstellt → versendet“).",
    },
    cta: {
      title: "Rechnen Sie nach, was bei Ihnen frei wird.",
      text: "Zeigen Sie uns einen Ihrer zeitfressenden Abläufe – wir zeigen Ihnen, wie er automatisiert aussähe und wie viele Stunden pro Woche das spart.",
      primary: "Jetzt kostenlose Prozess-Analyse sichern",
      assistant: "Sparpotenzial entdecken",
    },
    meta: {
      title: "Prozessautomatisierung für KMU – Schluss mit Fleissarbeit | AgenticIT",
      description:
        "Wiederkehrende Abläufe laufen ab jetzt von allein – fehlerfrei und im Hintergrund. Weniger Handarbeit, mehr Tempo, messbare Ersparnis. Schweizer Datenhaltung.",
    },
  },

  "loesungen/revops-growth": {
    slug: "loesungen/revops-growth",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "RevOps & Growth",
    problem: {
      title: "Leads verloren, bevor jemand reagiert.",
      body: [
        "Eine Anfrage kommt rein und bleibt im Postfach liegen. Ein Interessent meldet sich, doch die Nachfassung vergisst sich im Tagesgeschäft.",
        "Marketing, Vertrieb und Kundenservice arbeiten nebeneinander statt miteinander – und in den Lücken dazwischen verschwindet Ihr Umsatz.",
      ],
    },
    agitate: {
      title: "Jeder verlorene Lead ist Geld, das Sie schon ausgegeben haben.",
      intro: "Sie zahlen für Werbung, Website und Reichweite – aber:",
      bullets: [
        { lead: "Die teuer gewonnenen Kontakte versanden,", text: "weil niemand schnell genug reagiert." },
        { lead: "Ihr Vertrieb rät,", text: "statt zu wissen, welcher Lead heiss ist." },
        { lead: "Niemand sieht das ganze Bild:", text: "Marketing kennt die Abschlüsse nicht, der Vertrieb kennt die Kampagnen nicht." },
      ],
      outro: [
        "Das Ergebnis: Sie arbeiten härter für Wachstum, das eigentlich schon bezahlt und zum Greifen nah war. Und die Konkurrenz, die ihre Leads automatisiert nachfasst, schnappt sie Ihnen vor der Nase weg.",
      ],
    },
    solution: {
      title: "Ein Wachstumsmotor, der keinen Lead mehr fallen lässt.",
      intro: [
        "Wir verbinden Marketing, Vertrieb und Service zu einem System – datengestützt und automatisiert.",
        "Jeder Kontakt wird erfasst, bewertet und automatisch weitergeführt, bis aus dem Interessenten ein Kunde wird.",
      ],
      changeTitle: "Das ändert sich:",
      bullets: [
        { lead: "Kein Lead geht verloren", text: "– jede Anfrage wird automatisch erfasst und nachgefasst." },
        { lead: "Heisse Kontakte zuerst:", text: "Ihr Vertrieb spricht mit den Richtigen, im richtigen Moment." },
        { lead: "Aus Interessenten werden schneller Kunden.", text: "" },
        { lead: "Referenz aus dem Markt:", text: "vergleichbare KI-Systeme erreichen im Schnitt 171 % ROI." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Ein klares Dashboard zeigt Ihnen jederzeit, wo jeder Kontakt steht. Kein Tool-Wirrwarr, kein Vorwissen nötig. Ihre Daten bleiben in der Schweiz.",
    },
    interactive: {
      label: "Live-Element: Wachstumsrechner",
      text: "Geben Sie Lead-Zahl und Abschlussquote ein und sehen Sie, wie sich Umsatz und bediente Kontakte mit einem Agenten verändern – Vorher/Nachher in Sekunden.",
    },
    voiceAgent: {
      agentId: "agent_0201kwjmq83cf1btc17d9048pf8n",
      branchId: "agtbrch_6601kvjmepw7fa6thh05fk60s626",
      eyebrow: "RevOps live testen",
      title: "Sprechen Sie mit unserem RevOps-Agenten.",
      description:
        "Testen Sie Lead-Nachfassung, Qualifizierung und Wachstum – sprechen Sie direkt mit dem Agenten, der für RevOps & Growth trainiert ist.",
    },
    cta: {
      title: "Sehen Sie, wie viel Umsatz aktuell liegen bleibt.",
      text: "In einer kostenlosen Analyse zeigen wir Ihnen, wo in Ihrem Funnel Leads verloren gehen – und was es bringt, das zu schliessen.",
      primary: "Jetzt kostenlose Wachstums-Analyse sichern",
      assistant: "Wachstumspotenzial berechnen",
    },
    meta: {
      title: "RevOps & Marketing Automatisierung – mehr Umsatz, kein Lead verloren | AgenticIT",
      description:
        "Marketing, Vertrieb und Service als ein Wachstumsmotor. Automatisierte Leadgenerierung, kein verlorener Kontakt, messbarer ROI. Schweizer Datenhaltung.",
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
      title: "Autonome KI-Agenten, die Aufgaben wirklich erledigen | AgenticIT",
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
      title: "Multi-Agenten-Systeme – Teamarbeit, die Zeit halbiert | AgenticIT",
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
      title: "KI-Integration & Systemintegration für Unternehmen | AgenticIT",
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
