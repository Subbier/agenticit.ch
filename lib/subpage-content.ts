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
        { lead: "Spürbare Ersparnis:", text: "Schweizer KMU mit klarem Anwendungsfall sparen CHF 8.000–25.000 pro Monat." },
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

  // ───────────────────────── SICHERHEIT ─────────────────────────
  "sicherheit/datensouveraenitaet": {
    slug: "sicherheit/datensouveraenitaet",
    parentSlug: "sicherheit",
    parentLabel: "Sicherheit",
    navLabel: "Datensouveränität",
    problem: {
      title: "Daten wandern ins Ausland.",
      body: [
        "Die meisten KI-Dienste verarbeiten Ihre Eingaben auf fremden Servern – häufig ausserhalb der Schweiz, unter fremdem Recht.",
        "Sie geben Ihre wertvollsten Informationen aus der Hand, ohne genau zu wissen, wohin sie gehen und wer Zugriff hat.",
      ],
    },
    agitate: {
      title: "Bei Mandanten- und Kundendaten ist „irgendwo im Ausland“ keine Option.",
      intro: "Gerade in der Schweiz steht viel auf dem Spiel:",
      bullets: [
        { lead: "Vertrauensbruch:", text: "Erfährt ein Kunde, dass seine Daten im Ausland liegen, ist das Vertrauen weg." },
        { lead: "Rechtliches Risiko:", text: "Das Schweizer Datenschutzgesetz stellt klare Anforderungen – Verstösse können teuer werden." },
        { lead: "Kontrollverlust:", text: "Liegen Daten erst beim fremden Anbieter, bestimmt dessen Recht, nicht Ihres." },
      ],
      outro: ["Ein einziger Vorfall kann Reputation kosten, die Sie über Jahre aufgebaut haben."],
    },
    solution: {
      title: "Sie entscheiden, wo Ihre Daten liegen. Punkt.",
      intro: ["Bei uns bestimmen Sie den Speicherort – nicht der Anbieter."],
      changeTitle: "Das bedeutet konkret:",
      bullets: [
        { text: "Daten werden in der Schweiz gespeichert und verarbeitet." },
        { text: "Klar geregelt nach Schweizer Datenschutzgesetz (DSG)." },
        { lead: "Volle Transparenz:", text: "Sie wissen jederzeit, wo welche Daten liegen." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Sie müssen kein Datenschutzexperte sein – die sichere Datenhaltung läuft im Hintergrund. Sie nutzen modernste KI und behalten die volle Hoheit.",
    },
    interactive: {
      label: "Live-Element: Toggle „Cloud vs. Schweiz/On-Premise“",
      text: "Schieben Sie einen Regler und sehen Sie visuell, wo die Daten in jedem Szenario bleiben.",
    },
    cta: {
      title: "Sehen Sie, wo Ihre Daten liegen würden.",
      text: "In einem kostenlosen Gespräch zeigen wir Ihnen Ihre Optionen – verständlich und auf Ihre Branche bezogen.",
      primary: "Jetzt Sicherheits-Gespräch sichern",
      assistant: "Mit dem KI-Assistenten starten",
    },
    meta: {
      title: "Datensouveränität – Ihre Daten bleiben in der Schweiz | AgenticIT",
      description:
        "Sie bestimmen, wo Ihre Daten liegen – Cloud Schweiz oder On-Premise. DSG-konform, transparent, jederzeit nachvollziehbar. KI nutzen ohne Kontrollverlust.",
    },
  },

  "sicherheit/lokale-ki-infrastruktur": {
    slug: "sicherheit/lokale-ki-infrastruktur",
    parentSlug: "sicherheit",
    parentLabel: "Sicherheit",
    navLabel: "Lokale KI-Infrastruktur",
    problem: {
      title: "KI steht still ohne Internet.",
      body: [
        "Cloud-basierte KI braucht ständig Internet und einen externen Anbieter. Fällt einer davon aus, steht Ihr digitaler Kollege still.",
        "Und jede Anfrage verlässt dabei Ihr Haus – über Leitungen, die Sie nicht kontrollieren.",
      ],
    },
    agitate: {
      title: "Abhängigkeit ist ein Risiko, das sich im falschen Moment rächt.",
      intro: "Wer komplett auf fremde Server angewiesen ist:",
      bullets: [
        { lead: "Steht still bei Ausfall", text: "– Internetstörung oder Anbieterproblem legt den Betrieb lahm." },
        { lead: "Gibt bei jeder Anfrage Daten nach aussen", text: "– ein Einfallstor, das man nicht braucht." },
        { lead: "Ist Preis- und Regeländerungen ausgeliefert,", text: "die der Anbieter diktiert." },
      ],
      outro: [
        "Bei besonders sensiblen Daten – Finanzen, Recht, Gesundheit – ist allein der Weg nach draussen schon zu viel Risiko.",
      ],
    },
    solution: {
      title: "Eine KI, die direkt bei Ihnen läuft – auch ohne Internet.",
      intro: ["Unsere KI braucht nicht zwingend die Cloud. Sie kann lokal in Ihrem Haus laufen."],
      changeTitle: "Das bringt es Ihnen:",
      bullets: [
        { lead: "Keine Abhängigkeit", text: "von externen Diensten oder Anbietern." },
        { text: "Läuft weiter, auch wenn das Internet ausfällt." },
        { lead: "Maximale Sicherheit:", text: "Was lokal bleibt, kann nicht abfliessen." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Die Technik richten wir ein – Sie nutzen die KI wie gewohnt, nur eben sicher im eigenen Haus. Kein IT-Studium nötig.",
    },
    interactive: {
      label: "Live-Element: Offline-Demo",
      text: "Ein kleines, lokal laufendes Sprachmodell beantwortet eine Frage „ohne Internet“ – mit durchgestrichenem Netzwerk-Symbol als Beweis.",
    },
    cta: {
      title: "Erleben Sie KI, die offline funktioniert.",
      text: "Wir zeigen Ihnen live, wie unsere lokale KI arbeitet – ohne dass ein Byte Ihr Haus verlässt.",
      primary: "Jetzt Live-Demo sichern",
      assistant: "Lokale KI entdecken",
    },
    meta: {
      title: "Lokale KI-Infrastruktur – KI, die sogar offline läuft | AgenticIT",
      description:
        "KI direkt bei Ihnen im Haus – ohne Abhängigkeit von externen Diensten, auf Wunsch komplett offline. Maximale Sicherheit für sensible Daten.",
    },
  },

  "sicherheit/private-enterprise-ki": {
    slug: "sicherheit/private-enterprise-ki",
    parentSlug: "sicherheit",
    parentLabel: "Sicherheit",
    navLabel: "Private Enterprise KI",
    problem: {
      title: "Öffentliche KI füttert die Konkurrenz.",
      body: [
        "Viele KI-Tools lernen aus dem, was Nutzer eingeben. Im Zweifel landen Ihre Firmeninterna in einem Modell, das auch andere nutzen.",
        "Wer genau Zugriff hat und wofür Ihre Eingaben verwendet werden, bleibt oft im Dunkeln.",
      ],
    },
    agitate: {
      title: "Was einmal im fremden Modell steckt, holen Sie nicht zurück.",
      intro: "Bei geteilten, öffentlichen KI-Diensten droht:",
      bullets: [
        { lead: "Ihr Wissen wird Allgemeingut:", text: "Strategien, Zahlen, Mandanteninfos – als Trainingsmaterial für andere." },
        { lead: "Kein klarer Zugriffsschutz:", text: "Sie wissen nicht sicher, wer mitliest." },
        { lead: "Compliance-Lücke:", text: "Bei sensiblen Daten ein kaum tragbares Risiko." },
      ],
      outro: [
        "Ein einziges durchgesickertes Detail kann einen Wettbewerbsvorteil zunichtemachen, den Sie sich hart erarbeitet haben.",
      ],
    },
    solution: {
      title: "Ihre eigene KI – abgeschottet, exklusiv, unter Ihrer Kontrolle.",
      intro: ["Eine Private Enterprise KI arbeitet nur für Sie. Keine geteilte Lösung, kein Training Ihrer Daten für Fremde."],
      changeTitle: "Das bringt es Ihnen:",
      bullets: [
        { text: "Ihre Informationen fliessen nicht in öffentliche Modelle." },
        { lead: "Zugriff streng geregelt", text: "– nur Ihr Unternehmen." },
        { lead: "Klare Checkliste „Was bleibt bei Ihnen“", text: "– einfach und nachvollziehbar." },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Sie bekommen die Leistung modernster KI – aber in einem geschlossenen Raum, der nur Ihnen gehört. Bedienung wie gewohnt, Schutz im Hintergrund.",
    },
    interactive: {
      label: "Live-Element: „Was bleibt bei Ihnen“-Checkliste",
      text: "Eine kurze, abhakbare Liste, die in Sekunden zeigt, welche Daten das Haus nie verlassen.",
    },
    cta: {
      title: "Sichern Sie sich Ihre eigene, private KI.",
      text: "In einem kostenlosen Gespräch zeigen wir Ihnen, wie eine abgeschottete KI für Ihr Unternehmen aussähe.",
      primary: "Jetzt Sicherheits-Gespräch sichern",
      assistant: "Private KI entdecken",
    },
    meta: {
      title: "Private Enterprise KI – eine KI nur für Ihr Unternehmen | AgenticIT",
      description:
        "Ihre eigene, abgeschottete KI: Ihre Daten trainieren keine fremden Modelle, Zugriff streng geregelt. Volle Kontrolle, klare Checkliste. Schweizer Datenhaltung.",
    },
  },

  // ───────────────────────── BRANCHEN ─────────────────────────
  "branchen/finanzwesen-treuhand": {
    slug: "branchen/finanzwesen-treuhand",
    parentSlug: "branchen",
    parentLabel: "Branchen",
    navLabel: "Finanzwesen & Treuhand",
    problem: {
      title: "Belege statt Beratung.",
      body: [
        "Belege abtippen, Fristen überwachen, dieselben Standardfragen beantworten: Aufgaben, die Stunden kosten, aber kein Honorar bringen.",
        "Die wertvolle Beratungszeit – das, wofür Mandanten Sie wirklich bezahlen – bleibt dabei auf der Strecke.",
      ],
    },
    agitate: {
      title: "Jede Stunde Routine ist eine Stunde, die kein Mandat finanziert.",
      intro: "Im Treuhand- und Finanzalltag heisst das:",
      bullets: [
        { lead: "Teure Köpfe für günstige Arbeit:", text: "Fachkräfte verbringen den Tag mit Erfassung statt Beratung." },
        { lead: "Wachstum nur mit Neueinstellung:", text: "Mehr Mandate bedeuten mehr Handarbeit – und höhere Kosten." },
        { lead: "Fehlerrisiko bei Fristen und Zahlen,", text: "das im schlimmsten Fall den Mandanten kostet." },
      ],
      outro: [
        "Und während Sie abtippen, gewinnt die Kanzlei nebenan, die ihre Routine längst automatisiert hat, mehr Mandate mit demselben Team.",
      ],
    },
    solution: {
      title: "Ein digitaler Kollege übernimmt die Routine – Sie übernehmen die Beratung.",
      intro: ["Unsere Lösungen, übersetzt in die Sprache des Treuhands:"],
      bullets: [
        { lead: "Belege und Daten", text: "werden automatisch erfasst und zugeordnet." },
        { lead: "Mandantenanfragen", text: "beantwortet die KI rund um die Uhr." },
        { lead: "Fristen", text: "im Blick, ohne manuelles Nachhalten." },
        { lead: "Ihr Vorteil:", text: "mehr Mandate betreuen, ohne mehr Personal." },
      ],
      easyTitle: "Sicher nach Schweizer Standard",
      easyText:
        "Mandantendaten sind heilig – sie bleiben in der Schweiz, DSG-konform, auf Wunsch lokal. So einfach zu nutzen wie ein Office-Programm.",
    },
    interactive: {
      label: "Live-Element: Treuhand-Use-Case mit ROI",
      text: "2–3 konkrete Anwendungsfälle plus ROI-Beispiel (z. B. gesparte Stunden pro Monat bei der Belegerfassung).",
    },
    cta: {
      title: "Sehen Sie Ihren Treuhand-Anwendungsfall.",
      text: "In einem kostenlosen Gespräch zeigen wir Ihnen eine konkrete Aufgabe aus Ihrem Kanzleialltag – automatisiert, mit klarer Zahl.",
      primary: "Jetzt Treuhand-Gespräch sichern",
      assistant: "Treuhand-Anwendungsfall ansehen",
    },
    meta: {
      title: "KI & Digitalisierung für Treuhand & Finanzwesen | AgenticIT",
      description:
        "Belege automatisch erfassen, Fristen im Griff, Mandantenfragen rund um die Uhr beantwortet. Mehr Mandate ohne mehr Personal – Daten in der Schweiz.",
    },
  },

  "branchen/professional-services": {
    slug: "branchen/professional-services",
    parentSlug: "branchen",
    parentLabel: "Branchen",
    navLabel: "Professional Services",
    problem: {
      title: "Administration frisst Honorare.",
      body: [
        "Beratungen, Kanzleien und Agenturen leben von fakturierbaren Stunden.",
        "Doch ein grosser Teil des Tages geht für Terminkoordination, Nachfassen und Dokumente drauf – Arbeit, die niemand bezahlt.",
      ],
    },
    agitate: {
      title: "Jede nicht-fakturierbare Stunde ist Umsatz, der nie entsteht.",
      intro: "Im Professional-Services-Alltag bedeutet das:",
      bullets: [
        { lead: "Verschenkter Umsatz:", text: "Administration frisst Zeit, die Sie verrechnen könnten." },
        { lead: "Gespräche mit den Falschen:", text: "unqualifizierte Anfragen kosten Stunden ohne Ergebnis." },
        { lead: "Wachstumsgrenze:", text: "mehr Mandate gehen nur mit mehr Overhead – oder schlechterem Service." },
      ],
      outro: [
        "Während Sie Termine koordinieren, gewinnt der Mitbewerber, der das automatisiert hat, mehr Mandate bei höherer Marge.",
      ],
    },
    solution: {
      title: "Gewinnen Sie Ihre abrechenbare Zeit zurück.",
      intro: ["Unsere Lösungen, übersetzt in Ihren Alltag:"],
      bullets: [
        { lead: "Termine, Nachfassungen und Dokumente", text: "laufen automatisch." },
        { lead: "Anfragen werden vorqualifiziert", text: "– Sie sprechen nur mit den Richtigen." },
        { lead: "Ihr Vorteil:", text: "höhere Auslastung, mehr Umsatz pro Kopf." },
      ],
      easyTitle: "Sicher & einfach",
      easyText:
        "Vertrauliche Unterlagen bleiben in der Schweiz, DSG-konform. Die Bedienung ist so vertraut wie ein Office-Programm – ohne Schulung.",
    },
    interactive: {
      label: "Live-Element: Use-Case mit ROI",
      text: "2–3 Anwendungsfälle plus ROI-Beispiel (z. B. zurückgewonnene fakturierbare Stunden pro Woche).",
    },
    cta: {
      title: "Sehen Sie, wie viel abrechenbare Zeit Sie zurückgewinnen.",
      text: "In einem kostenlosen Gespräch zeigen wir Ihnen eine konkrete Aufgabe aus Ihrem Alltag – automatisiert, mit klarer Zahl.",
      primary: "Jetzt Gespräch sichern",
      assistant: "Anwendungsfall ansehen",
    },
    meta: {
      title: "KI & Digitalisierung für Kanzleien, Beratungen, Agenturen | AgenticIT",
      description:
        "Mehr fakturierbare Stunden: Termine, Nachfassungen und Dokumente laufen automatisch. Anfragen vorqualifiziert. Höhere Auslastung – Daten in der Schweiz.",
    },
  },

  "branchen/industrie-handel": {
    slug: "branchen/industrie-handel",
    parentSlug: "branchen",
    parentLabel: "Branchen",
    navLabel: "Industrie & Handel",
    problem: {
      title: "Handarbeit bremst jede Lieferung.",
      body: [
        "Aufträge erfassen, Lagerbestände abgleichen, mit Lieferanten kommunizieren: viele Schritte, viele Übergaben, viele Fehlerquellen.",
        "Jeder manuelle Handgriff kostet Zeit – und ein einziger Fehler kann eine ganze Lieferkette ins Stocken bringen.",
      ],
    },
    agitate: {
      title: "Ein Zahlendreher im Lager kann eine ganze Lieferung kippen.",
      intro: "In Industrie und Handel bedeutet Handarbeit konkret:",
      bullets: [
        { lead: "Teure Fehler:", text: "falsche Mengen, verpasste Nachbestellungen, verärgerte Kunden." },
        { lead: "Langsame Durchlaufzeiten:", text: "Aufträge warten auf den nächsten freien Mitarbeiter." },
        { lead: "Höhere Prozesskosten:", text: "jeder manuelle Schritt frisst Marge." },
      ],
      outro: [
        "Und der Wettbewerber, der seine Abläufe automatisiert hat, liefert schneller und günstiger – während Sie noch Bestände abgleichen.",
      ],
    },
    solution: {
      title: "Verbinden Sie Ihre Abläufe – und liefern Sie schneller, mit weniger Fehlern.",
      intro: ["Unsere Lösungen, übersetzt in Ihren Betrieb:"],
      bullets: [
        { lead: "Aufträge", text: "werden automatisch erfasst und weitergeleitet." },
        { lead: "Lagerabgleich und Nachbestellung", text: "laufen im Hintergrund." },
        { text: "Weniger manuelle Fehler, schnellere Durchlaufzeiten." },
        { lead: "Ihr Vorteil:", text: "zufriedenere Kunden, tiefere Prozesskosten." },
      ],
      easyTitle: "Sicher & einfach",
      easyText:
        "Wir docken an Ihre bestehenden Systeme an – kein Umbau. Bedienung so vertraut wie ein Office-Programm, Daten in der Schweiz.",
    },
    interactive: {
      label: "Live-Element: Use-Case mit ROI",
      text: "2–3 Anwendungsfälle plus ROI-Beispiel (z. B. reduzierte Durchlaufzeit oder Fehlerquote pro Monat).",
    },
    cta: {
      title: "Sehen Sie Ihren Anwendungsfall für Industrie & Handel.",
      text: "In einem kostenlosen Gespräch zeigen wir Ihnen einen Ihrer Abläufe automatisiert – mit klarer Zahl, was er spart.",
      primary: "Jetzt Gespräch sichern",
      assistant: "Anwendungsfall ansehen",
    },
    meta: {
      title: "KI & Automatisierung für Industrie & Handel | AgenticIT",
      description:
        "Bestellungen, Lagerabgleich und Lieferanten-Kommunikation laufen automatisch. Weniger Fehler, schnellere Durchlaufzeiten, tiefere Prozesskosten.",
    },
  },

  // ───────────────────────── UNTERNEHMEN ─────────────────────────
  "unternehmen/ueber-uns": {
    slug: "unternehmen/ueber-uns",
    parentSlug: "unternehmen",
    parentLabel: "Unternehmen",
    navLabel: "Über uns",
    problem: {
      title: "KI scheitert an der Angst.",
      body: [
        "Viele Unternehmen zögern – nicht weil die Technologie fehlt, sondern weil sie kompliziert, riskant und „nichts für uns“ wirkt.",
        "Und genau hier lassen die meisten Anbieter ihre Kunden allein: Sie liefern Tools, aber nehmen niemanden mit.",
      ],
    },
    agitate: {
      title: "Eine Technologie, die das Team nicht versteht, wird zum teuren Stillstand.",
      intro: "Wo KI ohne den Menschen eingeführt wird, passiert das:",
      bullets: [
        { lead: "Berührungsängste lähmen", text: "– das Team meidet, was es nicht versteht." },
        { lead: "Investitionen verpuffen,", text: "weil niemand die neue Lösung wirklich nutzt." },
        { lead: "Frust statt Fortschritt", text: "– und am Ende heisst es: „KI funktioniert bei uns nicht.“" },
      ],
      outro: ["Die Technologie war nie das Problem. Der fehlende Partner an Ihrer Seite war es."],
    },
    solution: {
      title: "Wir sind der Partner, der KI greifbar macht – für Sie und Ihr Team.",
      intro: [
        "Wir sind keine starren Theoretiker und kein anonymes Tech-Haus. Wir sind Ihr partnerschaftlicher Wegbegleiter in die KI.",
      ],
      changeTitle: "Drei Werte tragen alles, was wir tun:",
      bullets: [
        { lead: "Ganzheitlich:", text: "ein digitaler Kollege auf jeder Unternehmensebene – ein Team, nicht ein einzelnes Tool." },
        { lead: "Swissness & Souveränität:", text: "lokale Infrastruktur, Schweizer Datenhaltung, funktioniert auch offline." },
        { lead: "ROI statt Schickschnack:", text: "jede Lösung wird am messbaren Nutzen verkauft, nie an der Technik." },
      ],
      easyTitle: "Wir nehmen Ihre Belegschaft aktiv mit",
      easyText:
        "Wir bauen Berührungsängste ab – denn KI wirkt nur, wenn die Menschen sie nutzen. Schon das erste Gespräch ist klar, konkret und ohne Fachjargon: Sie verstehen sofort, was möglich ist und was es bringt.",
    },
    cta: {
      title: "Lernen wir uns kennen.",
      text: "Sehen Sie in einem kostenlosen Erstgespräch, wie wir arbeiten – und welche eine Aufgabe wir für Sie automatisieren würden.",
      primary: "Jetzt kostenloses Erstgespräch buchen",
      assistant: "Mit dem KI-Assistenten starten",
    },
    meta: {
      title: "Über AgenticIT | Die KI-Agentur, die Menschen mitnimmt",
      description:
        "Wir machen KI greifbar – ganzheitlich, schweizerisch souverän, am ROI gemessen. Lernen Sie das Team kennen, das Ihr digitales Team aufbaut.",
    },
  },

  "unternehmen/praxisbeispiele": {
    slug: "unternehmen/praxisbeispiele",
    parentSlug: "unternehmen",
    parentLabel: "Unternehmen",
    navLabel: "Praxisbeispiele",
    problem: {
      title: "Versprechen ohne Zahlen.",
      body: [
        "Versprechen gibt es viele. Was Entscheider wirklich brauchen, ist der Beweis: Funktioniert das auch in einem Betrieb wie meinem?",
        "Ohne konkrete Resultate bleibt jede KI-Behauptung nur ein Marketing-Satz.",
      ],
    },
    agitate: {
      title: "Ohne Beweise bleibt die Entscheidung Bauchgefühl – und das blockiert.",
      intro: "Wer kein konkretes Resultat sieht:",
      bullets: [
        { lead: "zögert,", text: "weil das Risiko ungreifbar wirkt;" },
        { lead: "vergleicht Äpfel mit Birnen,", text: "weil jeder Anbieter „Effizienz“ verspricht;" },
        { lead: "verschiebt die Entscheidung", text: "– und verliert weiter Zeit und Geld an den Status quo." },
      ],
      outro: ["Genau dieses Zögern kostet Sie jeden Monat mehr, als die Lösung kosten würde."],
    },
    solution: {
      title: "Zahlen, die für sich sprechen.",
      intro: [
        "Hier zeigen wir echte Vorher-Nachher-Kennzahlen aus umgesetzten Projekten – betrieben von unserer eigenen KI und IT.",
      ],
      changeTitle: "Was Sie hier finden:",
      bullets: [
        { lead: "Konkrete Fälle", text: "statt Werbefloskeln." },
        { lead: "Vorher/Nachher mit Zahlen:", text: "gesparte Stunden, kürzere Durchlaufzeiten, mehr bediente Kunden." },
        { lead: "Nach Branche gefiltert,", text: "damit Sie sofort Ihren eigenen Fall erkennen." },
      ],
      easyTitle: "Beispiel-Kennzahlen aus dem Markt (Orientierung, projektabhängig)",
      easyText:
        "bis zu 84 % kürzere Bearbeitungszeiten · im Schnitt 171 % ROI · CHF 8.000–25.000 monatliche Ersparnis bei klarem Anwendungsfall.",
    },
    interactive: {
      label: "Live-Element: Case-Filter",
      text: "Filtern Sie Praxisbeispiele nach Branche und sehen Sie je Fall die wichtigste Kennzahl. Ein Klick führt zur Detail-Story (Ausgangslage → Lösung → Resultat in Zahlen).",
    },
    cta: {
      title: "Schreiben wir Ihre Erfolgsgeschichte.",
      text: "Sehen Sie in einem kostenlosen Gespräch, welches Resultat in Ihrem Betrieb realistisch ist – mit einer konkreten Zahl.",
      primary: "Jetzt kostenloses Gespräch buchen",
      assistant: "Passendes Beispiel ansehen",
    },
    meta: {
      title: "Praxisbeispiele – KI-Resultate mit echten Zahlen | AgenticIT",
      description:
        "Echte Vorher-Nachher-Zahlen aus umgesetzten Projekten: gesparte Stunden, kürzere Durchlaufzeiten, mehr bediente Kunden. Nach Branche gefiltert.",
    },
  },

  "unternehmen/kontakt": {
    slug: "unternehmen/kontakt",
    parentSlug: "unternehmen",
    parentLabel: "Unternehmen",
    navLabel: "Kontakt",
    problem: {
      title: "Der erste Schritt fühlt sich gross an.",
      body: [
        "Lange Kontaktformulare, unklare „Wir melden uns“-Versprechen, die Sorge vor Verkaufsdruck.",
        "Genau das hält viele davon ab, den einen kleinen Schritt zu machen, der alles ins Rollen bringt.",
      ],
    },
    agitate: {
      title: "Jeder Tag „später“ ist ein Tag mit unnötigen Kosten.",
      intro: "Aufschieben fühlt sich sicher an – ist es aber nicht:",
      bullets: [
        { lead: "Die Routine frisst weiter Zeit und Geld,", text: "Tag für Tag." },
        { lead: "Der Vorsprung der Konkurrenz wächst,", text: "während Sie warten." },
        { lead: "Der „richtige Moment“ kommt nie von allein", text: "– er entsteht durch den ersten Schritt." },
      ],
    },
    solution: {
      title: "Ihr erster Schritt dauert 60 Sekunden. Ohne Druck.",
      intro: ["Kein langes Formular, kein Verkaufsgespräch – nur ein einfacher Weg zum Gespräch."],
      changeTitle: "So einfach geht's:",
      bullets: [
        { lead: "Online-Termin buchen:", text: "Sie wählen den Slot, der Ihnen passt." },
        { lead: "Oder sofort mit dem KI-Assistenten starten", text: "– er beantwortet Ihre erste Frage in Sekunden." },
        { text: "Persönlich, schnell, unverbindlich." },
      ],
      easyTitle: "Was Sie im Erstgespräch erhalten",
      easyText:
        "Im kostenlosen Erstgespräch zeigen wir Ihnen eine konkrete Aufgabe, die wir für Sie automatisieren könnten – mit einer klaren Zahl, was das bringt.",
    },
    cta: {
      title: "Machen Sie den ersten Schritt.",
      text: "Buchen Sie ein kostenloses Erstgespräch oder starten Sie direkt mit dem KI-Assistenten.",
      primary: "Jetzt kostenloses Erstgespräch buchen",
      assistant: "Mit dem KI-Assistenten starten",
    },
    contact: {
      email: "hello@agenticit.ch",
      phone: "[Platzhalter – Telefon]",
      address: "[Platzhalter – Adresse]",
      calendar: "[Platzhalter – Buchungslink einbinden]",
    },
    meta: {
      title: "Kontakt & Terminbuchung | AgenticIT",
      description:
        "Ihr erster Schritt dauert 60 Sekunden: Termin online buchen oder direkt mit dem KI-Assistenten starten. Kostenlos, unverbindlich, konkret.",
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
