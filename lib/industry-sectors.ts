import { industryFocus, type IndustryFocus } from "./industry-focus"

export const additionalIndustryFocus: readonly IndustryFocus[] = [
  {
    slug: "treuhand",
    label: "Treuhand",
    title: "Digitalisierung und KI für Treuhandbüros",
    description:
      "Belege, Mandantenanfragen und Fristen besser organisieren. AgenticIT verbindet Auftritt, Anfrageweg und Verwaltung für Schweizer Treuhandbüros.",
    headline: "Mehr Überblick im Mandatsalltag.",
    intro:
      "Unterlagen anfordern, Belege zuordnen, Auskunft geben: Zwischen den Fachaufgaben steckt viel Koordination. Wir verbinden Ihren Auftritt mit dem Mandantenkontakt und vereinfachen wiederkehrende Büroarbeit. Ihr Team entscheidet über Buchungen und fachliche Ergebnisse.",
    audience:
      "Für Treuhandbüros mit wiederkehrenden Mandaten und vielen Unterlagen.",
    flow: [
      ["Unterlagen kommen an", "Mandat und Bearbeitungsstand zuordnen"],
      ["Das Team prüft", "Fehlende Angaben und Vorschläge gemeinsam sichten"],
      [
        "Der nächste Schritt steht",
        "Freigabe, Frist und Verantwortung festhalten",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Zeigen, welche Mandate zu Ihrem Büro passen und wie die Zusammenarbeit beginnt.",
        items: [
          "Leistungen und Mandantengruppen schärfen",
          "Website mit verständlichem Leistungsangebot",
          "Hilfreiche Checklisten für neue Mandanten",
          "Anfrageweg und Herkunft messbar machen",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Aus einer Anfrage ein vorbereitetes Erstgespräch machen.",
        items: [
          "Anliegen und zuständige Fachperson erfassen",
          "Unterlagen fürs Erstgespräch abstimmen",
          "Offerten zur Freigabe vorbereiten",
          "Mandatsstart mit klarer Übergabe planen",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Weniger Suchen und Übertragen bei der laufenden Mandatsarbeit.",
        items: [
          "Belege zur Prüfung vorerfassen",
          "Fehlende Unterlagen übersichtlich halten",
          "Fristen mit Verantwortung verknüpfen",
          "Statusberichte als Entwurf vorbereiten",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/automatisierungs-check",
    checkLabel: "Manuelle Aufgaben prüfen",
    checkTitle: "Wo steckt wiederkehrende Büroarbeit?",
    checkCopy:
      "Wählen Sie Ihre manuellen Aufgaben und schätzen Sie den heutigen Aufwand. Der Automatisierungs-Check zeigt ein mögliches Entlastungspotenzial mit offengelegten Annahmen. Mandantendaten werden dafür nicht benötigt.",
    faqs: [
      {
        question: "Kann KI Belege selbstständig verbuchen?",
        answer:
          "Ein möglicher Einstieg ist die Vorerfassung: Angaben aus Belegen übernehmen und Zuordnungen vorschlagen. Kontierung, Buchung und fachliche Prüfung bleiben im vereinbarten Freigabeprozess Ihres Teams. Welche Schritte geeignet sind, prüfen wir mit freigegebenen Beispielen.",
      },
      {
        question: "Müssen wir unsere Treuhandsoftware ersetzen?",
        answer:
          "Wir prüfen Ihre Software, die Ablage und verfügbare Schnittstellen oder Exporte. Daraus entsteht ein abgegrenzter Ablauf. Eine durchgängige Verbindung oder ein Systemwechsel wird erst nach dieser Prüfung vereinbart.",
      },
      {
        question: "Wie bleiben Mandantendaten vertraulich?",
        answer:
          "Vor der Einrichtung klären wir benötigte Daten, Berechtigungen, Anbieter, Speicherorte und Aufbewahrung. Für erste Prüfungen verwenden wir freigegebene, möglichst anonymisierte Beispiele. Der passende Umgang mit vertraulichen Unterlagen gehört zum konkreten Auftrag.",
      },
      {
        question: "Hilft das bei Fristen und fehlenden Unterlagen?",
        answer:
          "Wir können offene Unterlagen, Fristen und zuständige Personen in einer gemeinsamen Übersicht verbinden. Erinnerungen werden nach vereinbarten Regeln vorbereitet. Zuständigkeit und Kontrolle bleiben bei Ihrem Büro; auch fehlende oder widersprüchliche Angaben werden geprüft.",
      },
      {
        question: "Womit beginnt ein kleines Treuhandbüro?",
        answer:
          "Zum Beispiel mit dem Eingang von Belegen oder dem Nachhalten fehlender Unterlagen für eine Mandantengruppe. Wir halten den heutigen Aufwand fest und vergleichen nach der Einführung dieselben Aufgaben. Umfang, Kosten und Abnahme werden vor dem Start vereinbart.",
      },
    ],
    relatedSlugs: ["beratung", "immobilien"],
  },
  {
    slug: "gastronomie",
    label: "Gastronomie",
    title: "Digitalisierung für Restaurants und Gastronomie",
    description:
      "Reservationsanfragen, Gruppenanlässe und Gästekommunikation verbinden. Passende Websites, Tools und Automatisierungen für Ihren Gastronomiebetrieb.",
    headline: "Der Gast im Fokus. Die Abläufe im Griff.",
    intro:
      "Während Ihr Team Gäste betreut, kommen Anrufe, Reservationen und Gruppenanfragen herein. Wir ordnen diese Wege, verbinden passende Tools und bereiten wiederkehrende Antworten vor. So sieht Ihr Team, was bestätigt ist und wer noch eine Rückmeldung braucht.",
    audience:
      "Für Restaurants, Cafés und Gastronomiebetriebe mit Reservationen oder Anlässen.",
    flow: [
      [
        "Eine Anfrage geht ein",
        "Datum, Personenanzahl und Kontaktweg aufnehmen",
      ],
      ["Der Betrieb prüft", "Verfügbarkeit und besondere Wünsche abstimmen"],
      [
        "Der Gast erhält Klarheit",
        "Bestätigung und interne Übergabe zusammenführen",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Gästen zeigen, was Ihren Betrieb ausmacht und wie sie zu Ihnen finden.",
        items: [
          "Mobile Website mit Speisekarte und Anfahrt",
          "Google-Unternehmensprofil abstimmen",
          "Saisonangebote und Anlässe vorbereiten",
          "Reservationsweg gut sichtbar einbinden",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Reservationen und Gruppenanfragen gezielt zum nächsten Schritt führen.",
        items: [
          "Anfragen aus vereinbarten Kanälen bündeln",
          "Freie Plätze vor Bestätigung prüfen",
          "Gruppenanlässe an das richtige Team geben",
          "Offerten für Anlässe zur Freigabe erstellen",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Wiederkehrende Gästefragen und interne Übergaben vereinfachen.",
        items: [
          "Freigegebene Antworten zentral pflegen",
          "Änderungen an Reservationen zuordnen",
          "Erinnerungen nach vereinbarten Regeln",
          "Antwortentwürfe auf Bewertungen prüfen",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/anfragen-check",
    checkLabel: "Ihren Anfrageweg prüfen",
    checkTitle: "Wer übernimmt die nächste Gruppenanfrage?",
    checkCopy:
      "Der Anfragen-Check hilft, Eingang, Zuständigkeit und Rückmeldung zu ordnen. Sie erhalten priorisierte Schritte, die Sie auf Reservationen und Anlässe in Ihrem Betrieb übertragen können.",
    faqs: [
      {
        question: "Kann ein Assistent Tischreservationen annehmen?",
        answer:
          "Wenn Ihr Reservationssystem eine geeignete Anbindung bietet, kann ein Assistent Wünsche aufnehmen und Verfügbarkeit prüfen. Buchungsregeln, Bestätigung und Übergabe bei Ausnahmen richten wir gemeinsam ein. Ohne bestätigte Verfügbarkeit wird eine Anfrage nicht als feste Reservation dargestellt.",
      },
      {
        question: "Was passiert bei Allergien oder besonderen Wünschen?",
        answer:
          "Allergenfragen und besondere Anforderungen gehen an die zuständigen Mitarbeitenden. Ein Assistent darf dazu keine verbindliche Auskunft erfinden. Wir legen fest, welche geprüften Informationen genutzt werden dürfen und wann Ihr Team übernimmt.",
      },
      {
        question:
          "Funktioniert das mit unserem bestehenden Reservationssystem?",
        answer:
          "Wir prüfen die vorhandenen Schnittstellen, Kalender und Zugriffsrechte. Danach legen wir fest, welche Angaben übertragen werden können und wie Änderungen behandelt werden. Die Anbindung wird mit freigegebenen Beispielreservationen geprüft.",
      },
      {
        question: "Können Gäste weiterhin persönlich mit uns sprechen?",
        answer:
          "Ja. Wir planen den persönlichen Kontakt und die Zuständigkeit bei Rückfragen mit ein. Ein kundenorientierter Assistent stellt sich als KI vor und nennt den vereinbarten Weg zu Ihrem Team. Er verspricht keine Erreichbarkeit, die Ihr Betrieb nicht anbieten kann.",
      },
      {
        question: "Woran erkennen wir den Nutzen?",
        answer:
          "Wir vergleichen etwa Bearbeitungszeit, offene Gruppenanfragen oder Rückfragen bei Änderungen vor und nach der Einführung. Welche Werte Ihr System tatsächlich liefert, klären wir zuerst. Buchungszuwachs und weniger ausgefallene Reservationen werden erst mit eigenen Daten beurteilt.",
      },
    ],
    relatedSlugs: ["hotellerie", "fitness"],
  },
  {
    slug: "gesundheit",
    label: "Praxen & Therapie",
    title: "Digitalisierung und KI für Praxisorganisation",
    description:
      "Terminwünsche, Rückrufe und Empfangsaufgaben strukturieren. AgenticIT verbindet digitale Abläufe für Praxen und Therapiezentren mit Ihrem Team.",
    headline: "Mehr Ruhe am Empfang. Klarere Abläufe.",
    intro:
      "Das Telefon klingelt, während Ihr Team Menschen vor Ort betreut. Wir helfen, Terminwünsche, Rückrufe und organisatorische Fragen zu ordnen. Passende Tools unterstützen den Empfang; Diagnosen, Behandlungen und die Beurteilung der Dringlichkeit bleiben beim medizinischen Fachpersonal.",
    audience:
      "Für Praxen und Therapiezentren, die organisatorische Arbeit gezielt vereinfachen möchten.",
    flow: [
      ["Ein Terminwunsch kommt an", "Nur die vereinbarten Angaben aufnehmen"],
      ["Der Empfang übernimmt", "Zuständigkeit und verfügbare Zeiten prüfen"],
      [
        "Die Rückmeldung ist klar",
        "Termin oder nächsten Kontakt nachvollziehbar festhalten",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Leistungen und Kontaktwege verständlich zugänglich machen.",
        items: [
          "Mobile Praxiswebsite mit klarer Anfahrt",
          "Leistungen durch Ihr Fachteam prüfen lassen",
          "Terminwünsche und Kontaktwege erklären",
          "Öffnungszeiten konsistent pflegen",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Organisatorische Anfragen so weitergeben, dass der Empfang damit arbeiten kann.",
        items: [
          "Terminwünsche strukturiert aufnehmen",
          "Zuständigkeit im Empfangsteam klären",
          "Rückrufe mit nächstem Schritt organisieren",
          "Verfügbarkeit vor Terminbestätigung prüfen",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Wiederkehrende Empfangsaufgaben mit klaren Zugriffsrechten verbinden.",
        items: [
          "Freigegebene organisatorische Auskünfte",
          "Erinnerungen nach vereinbarten Regeln",
          "Änderungen und Absagen zuordnen",
          "Offene Aufgaben im Team sichtbar halten",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/crm-ablauf-check",
    checkLabel: "Ihren Ablauf prüfen",
    checkTitle: "Wo bleibt ein organisatorisches Anliegen liegen?",
    checkCopy:
      "Fünf Fragen zu Zuständigkeit, Übergaben und nächsten Aufgaben. Sie prüfen Ihren Arbeitsablauf und geben keine Patientendaten ein. Der Check ersetzt keine Prüfung Ihres Praxissystems.",
    faqs: [
      {
        question: "Geht es um medizinische Beratung durch KI?",
        answer:
          "Diese Beispiele betreffen die Praxisorganisation. Diagnosen, Behandlungen und die Beurteilung der Dringlichkeit bleiben beim medizinischen Fachpersonal. Wir definieren mit Ihrer Praxis, wann ein Assistent stoppt und welcher Hinweis oder Kontaktweg dann angezeigt wird.",
      },
      {
        question: "Wie berücksichtigen Sie Patientendaten und Berufsgeheimnis?",
        answer:
          "Vor einer Anbindung werden Zweck, notwendige Angaben, Zugriffsrechte, beteiligte Anbieter, Speicherorte und Aufbewahrung geklärt. Berufsgeheimnis und die Vorgaben Ihrer Einrichtung werden in die Planung einbezogen. Die konkrete Verarbeitung muss vor dem Einsatz fachlich und rechtlich geprüft sein.",
      },
      {
        question: "Können wir unser Praxissystem weiterverwenden?",
        answer:
          "Wir prüfen zuerst dessen Schnittstellen und die zulässigen Zugriffe. Möglich ist auch ein begrenzter Ablauf ohne direkten Zugriff auf Patientendossiers. Welche Verbindung sinnvoll und zulässig ist, wird vor einer Umsetzung festgelegt.",
      },
      {
        question:
          "Wie erkennen Patientinnen und Patienten einen KI-Assistenten?",
        answer:
          "Ein kundenorientierter Assistent nennt zu Beginn seine Rolle als KI. Er erklärt seinen organisatorischen Aufgabenbereich und den vereinbarten Kontaktweg zum Empfang. Antworten kommen nur aus freigegebenen Informationen; medizinische Inhalte werden nicht ergänzt.",
      },
      {
        question: "Was ist ein sinnvoller erster Schritt?",
        answer:
          "Zum Beispiel die Zuordnung organisatorischer Rückrufe an das Empfangsteam. Wir prüfen den Ablauf zunächst ohne echte Patientendaten, einschliesslich fehlender Angaben und Übergabe an Menschen. Danach entscheiden Sie über den vereinbarten Einsatzumfang.",
      },
    ],
    relatedSlugs: ["beratung", "fitness"],
  },
  {
    slug: "autohaus",
    label: "Autohäuser & Garagen",
    title: "Digitalisierung und KI für Autohäuser und Garagen",
    description:
      "Fahrzeuganfragen, Probefahrten und Serviceaufgaben verbinden. AgenticIT richtet Marketing, Sales und Verwaltung auf den Alltag Ihres Autohauses aus.",
    headline: "Vom Fahrzeuginteresse zum klaren nächsten Schritt.",
    intro:
      "Eine Anfrage aus dem Fahrzeugportal, ein Wunsch nach einer Probefahrt, ein offenes Serviceanliegen: Wir bringen diese Vorgänge mit Ihrem Team zusammen. Passender Auftritt, CRM und Automatisierungen unterstützen Verkauf und Werkstatt bei der täglichen Koordination.",
    audience:
      "Für Autohäuser und Garagen mit Fahrzeugverkauf, Probefahrten und Service.",
    flow: [
      [
        "Das Interesse wird konkret",
        "Fahrzeug, Anliegen und Kontaktwunsch zuordnen",
      ],
      ["Das Team bereitet vor", "Zuständigkeit und Terminverfügbarkeit prüfen"],
      [
        "Die Betreuung geht weiter",
        "Offerte, Vereinbarung und Serviceaufgabe festhalten",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Ihr Fahrzeugangebot und Ihre Services auf einen passenden Anfrageweg ausrichten.",
        items: [
          "Fahrzeug- und Serviceangebot verständlich zeigen",
          "Landingpages für ausgewählte Angebote",
          "Kampagnenkonten und Messung vorbereiten",
          "Anfragen mit Fahrzeugbezug erfassen",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Verkäuferinnen und Verkäufer mit Kontext statt einzelnen Nachrichten versorgen.",
        items: [
          "Portal- und Websiteanfragen zuordnen",
          "Wunschfahrzeug und Zuständigkeit im CRM",
          "Probefahrt nach Verfügbarkeit abstimmen",
          "Offerten mit nächster Aktion nachhalten",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Verkauf und Werkstatt bei Übergaben und wiederkehrenden Aufgaben unterstützen.",
        items: [
          "Fahrzeugübergabe mit Checkliste vorbereiten",
          "Serviceanliegen strukturiert weitergeben",
          "Erinnerungsentwürfe zur Freigabe erstellen",
          "Gesprächsnotizen als Aufgaben vorbereiten",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/anfragen-check",
    checkLabel: "Ihren Anfrageweg prüfen",
    checkTitle: "Was passiert nach der nächsten Fahrzeuganfrage?",
    checkCopy:
      "Prüfen Sie Eingang, Zuständigkeit, Rückmeldung und nächste Aktion. Der Anfragen-Check zeigt, wo Ihr Verkaufsteam einen klareren Ablauf braucht und womit Sie beginnen können.",
    faqs: [
      {
        question: "Können Anfragen aus Fahrzeugportalen ins CRM fliessen?",
        answer:
          "Wir prüfen die vereinbarten Portale, erlaubten Anbindungen und verfügbaren Angaben. Danach ordnen wir Fahrzeugbezug, Kontaktwunsch und zuständige Person zu. Fehlende Daten und doppelte Anfragen gehören zu den Prüffällen vor dem Einsatz.",
      },
      {
        question: "Wie wird eine Probefahrt vereinbart?",
        answer:
          "Dafür müssen Fahrzeug und betreuende Person verfügbar sein. Wir stimmen die Regeln mit Ihrem Team ab und prüfen Kalender oder vorhandene Planungssysteme. Erst ein bestätigter Buchungsschritt darf dem Interessenten als fester Termin angezeigt werden.",
      },
      {
        question: "Bleibt unser Garagen- oder Händlersystem bestehen?",
        answer:
          "Wir beginnen mit Ihrem vorhandenen System und prüfen Schnittstellen, Exporte sowie Rechte. Der erste Ablauf kann bewusst begrenzt sein. Welche Verbindungen eingerichtet werden, halten wir vor dem Auftrag fest.",
      },
      {
        question: "Wer gibt Offerten und Erinnerungen frei?",
        answer:
          "Preise, verbindliche Angebote und geschäftliche Empfehlungen prüft die zuständige Person. Ausgehende Sales-Nachrichten werden vor dem Versand menschlich freigegeben. Kontaktwünsche und Abmeldungen werden im vereinbarten Ablauf berücksichtigt.",
      },
      {
        question: "Wie messen wir eine Verbesserung im Verkauf?",
        answer:
          "Zum Beispiel über die Zeit bis zur ersten Rückmeldung, offene Fahrzeuganfragen und tatsächlich vereinbarte Probefahrten. Wir halten die Ausgangslage und die verfügbare Datenbasis fest. Daraus folgt keine Zusage für zusätzliche Fahrzeugverkäufe.",
      },
    ],
    relatedSlugs: ["handwerk", "beratung"],
  },
  {
    slug: "immobilien",
    label: "Immobilien",
    title: "Digitalisierung für Immobilienvermarktung und Bewirtschaftung",
    description:
      "Objektanfragen, Besichtigungen und Meldungen im Team organisieren. AgenticIT verbindet Marketing, CRM und Verwaltung für Immobilienfirmen.",
    headline: "Objekte vermarkten. Anliegen geordnet bearbeiten.",
    intro:
      "Auf ein Inserat folgen viele Nachrichten. Parallel warten Besichtigungen und Meldungen aus der Bewirtschaftung. Wir verbinden Objektbezug, Zuständigkeit und nächste Aufgabe, damit Ihr Team die passenden Informationen am richtigen Vorgang findet.",
    audience:
      "Für Immobilienvermarktung und Bewirtschaftung mit vielen Anfragen und Übergaben.",
    flow: [
      [
        "Eine Objektanfrage geht ein",
        "Objekt und gewünschte Auskunft zusammenführen",
      ],
      [
        "Die zuständige Person übernimmt",
        "Besichtigung oder weitere Unterlagen abstimmen",
      ],
      [
        "Der Vorgang bleibt sichtbar",
        "Vereinbarungen und offene Aufgaben nachhalten",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Objekte und Leistungen mit einem klaren Weg zur Anfrage präsentieren.",
        items: [
          "Objektseiten für mobile Nutzung gestalten",
          "Inserate und Landingpages abstimmen",
          "Freigegebene Objektinformationen pflegen",
          "Anfragequelle und Objektbezug erfassen",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Interessenten betreuen und Besichtigungen nachvollziehbar organisieren.",
        items: [
          "Objektanfragen im CRM zusammenführen",
          "Zuständigkeit und Rückmeldung festlegen",
          "Besichtigungen nach Verfügbarkeit planen",
          "Benötigte Unterlagen gezielt anfordern",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Meldungen und wiederkehrende Aufgaben in der Bewirtschaftung ordnen.",
        items: [
          "Reparaturmeldungen dem Objekt zuordnen",
          "Übergaben an Bewirtschaftung vorbereiten",
          "Unterlagenstatus übersichtlich führen",
          "Antwortentwürfe und Aufgaben prüfen",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/anfragen-check",
    checkLabel: "Ihren Anfrageweg prüfen",
    checkTitle: "Findet jede Objektanfrage eine Zuständigkeit?",
    checkCopy:
      "Der Anfragen-Check hilft, die Übergabe vom Eingang zur nächsten Aktion zu prüfen. Sie erhalten einen Plan für klarere Zuständigkeiten und Rückmeldungen, ohne Bewerberdossiers einzugeben.",
    faqs: [
      {
        question: "Können wir unser Immobilienprogramm behalten?",
        answer:
          "Wir prüfen Ihr Programm, Objektkennungen, Schnittstellen und erlaubte Exporte. Daraus leiten wir ab, welche Angaben zuverlässig verbunden werden können. Ein Austausch der Software ist keine Voraussetzung und wird nur nach gemeinsamer Entscheidung geplant.",
      },
      {
        question: "Trifft KI eine Auswahl unter Mietinteressenten?",
        answer:
          "Die hier beschriebenen Abläufe betreffen Zuordnung, Terminorganisation und Unterlagenstatus. Die Auswahl von Personen und verbindliche Entscheidungen bleiben bei Ihrem zuständigen Team. Es wird kein automatisches Bonitäts- oder Eignungsurteil versprochen.",
      },
      {
        question: "Wie behandeln Sie Bewerberdossiers?",
        answer:
          "Wir legen Zweck, notwendige Unterlagen, Zugriffsrechte, Anbieter, Speicherorte und Löschfristen für den konkreten Ablauf fest. Für erste Prüfungen verwenden wir freigegebene Beispiele ohne echte Dossiers. Eine Weitergabe an zusätzliche Systeme muss vorab geklärt sein.",
      },
      {
        question: "Wie werden Besichtigungen und Absagen koordiniert?",
        answer:
          "Wir stimmen verfügbare Zeiten, Betreuung und mögliche Gruppentermine mit Ihrem Team ab. Änderungen müssen am selben Vorgang sichtbar sein. Fehlende Verfügbarkeit und Überschneidungen werden vor dem Einsatz mitgeprüft.",
      },
      {
        question: "Womit beginnen wir in der Bewirtschaftung?",
        answer:
          "Ein möglicher Einstieg sind Reparaturmeldungen: Objekt, Anliegen und nächste zuständige Person zusammenführen. Regeln für dringende Fälle werden mit Ihrer Bewirtschaftung festgelegt. Wir prüfen Bearbeitungsaufwand und offene Meldungen anhand Ihrer Ausgangslage.",
      },
    ],
    relatedSlugs: ["treuhand", "handwerk"],
  },
  {
    slug: "fitness",
    label: "Fitness & Studios",
    title: "Digitalisierung und KI für Fitnessstudios",
    description:
      "Probetrainings, Mitgliedschaftsanfragen und Studioaufgaben verbinden. AgenticIT unterstützt Marketing, Sales und Verwaltung mit passenden Tools.",
    headline: "Mehr Zeit auf der Trainingsfläche.",
    intro:
      "Ein Probetraining anfragen, ein Abo verstehen, einen Kurstermin ändern: Rund um die Betreuung entsteht viel Koordination. Wir verbinden Ihren digitalen Auftritt mit Anfragebearbeitung und Mitgliederverwaltung. Ihr Team bleibt für die Menschen im Studio da.",
    audience:
      "Für Fitnessstudios, Trainingszentren und Kursanbieter mit persönlicher Betreuung.",
    flow: [
      ["Interesse entsteht", "Trainingsangebot und Kontaktwunsch aufnehmen"],
      [
        "Das Team plant den Einstieg",
        "Freie Zeit und zuständige Betreuung prüfen",
      ],
      ["Die Betreuung beginnt", "Vereinbarung und nächste Aufgabe festhalten"],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Das passende Training und den Einstieg ins Studio sichtbar machen.",
        items: [
          "Trainingsangebot und Zielgruppe schärfen",
          "Mobile Seiten fürs Probetraining gestalten",
          "Kampagnen und Kontaktweg vorbereiten",
          "Anfragen nach Herkunft auswerten",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Interessenten persönlich begleiten, vom Erstkontakt bis zum Studiostart.",
        items: [
          "Probetrainingsanfragen dem Team zuordnen",
          "Freie Betreuung und Termin abstimmen",
          "Abofragen mit geprüften Angaben beantworten",
          "Nächsten Kontakt gemeinsam vereinbaren",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Die Organisation rund um Kurse und Mitgliedschaften vereinfachen.",
        items: [
          "Mitgliederstart mit Checkliste begleiten",
          "Kursänderungen strukturiert bearbeiten",
          "Erinnerungen nach vereinbarten Regeln",
          "Vertragsanliegen zur Prüfung zuordnen",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/marketing-setup-check",
    checkLabel: "Ihr Marketing-Setup prüfen",
    checkTitle: "Ist der Weg ins Probetraining klar?",
    checkCopy:
      "Fünf Fragen zu Angebot, Auftritt, Konten, Messung und Übergabe. Sie erhalten priorisierte Schritte, mit denen Sie den Einstieg für Interessenten und Ihr Team verbessern können.",
    faqs: [
      {
        question: "Kann ein Assistent Probetrainings buchen?",
        answer:
          "Wenn Studioverwaltung und Kalender geeignete Anbindungen bieten, lassen sich freie Plätze und Betreuung prüfen. Gemeinsam legen wir Buchung, Bestätigung und Änderungen fest. Eine Anfrage gilt erst nach erfolgreicher Buchung als bestätigter Termin.",
      },
      {
        question: "Brauchen Sie dafür Gesundheits- oder Trainingsdaten?",
        answer:
          "Für den Einstieg können wir uns auf organisatorische Angaben wie Kontaktwunsch und Termin konzentrieren. Gesundheits- und Trainingsdaten werden dafür nicht pauschal benötigt. Zusätzliche Datenwege und Zugriffe müssen zweckbezogen vorab geklärt werden.",
      },
      {
        question: "Können wir bestehende Mitglieder gezielt kontaktieren?",
        answer:
          "Wir planen Anlass, Kontaktwunsch und Abmeldemöglichkeit mit Ihrem Team. Eine Reaktivierungsnachricht wird als Entwurf vorbereitet und vor dem Versand menschlich freigegeben. Es gibt keinen automatischen Werbeversand allein aufgrund einer früheren Mitgliedschaft.",
      },
      {
        question: "Hilft das bei ausgefallenen Probetrainings?",
        answer:
          "Klare Bestätigungen, passende Erinnerungen und ein erreichbarer Änderungsweg können den Ablauf unterstützen. Ob tatsächlich mehr Termine wahrgenommen werden, prüfen wir mit Ihren Daten. Eine bestimmte Senkung der Ausfallquote wird nicht vorausgesetzt.",
      },
      {
        question: "Womit kann ein einzelnes Studio starten?",
        answer:
          "Zum Beispiel mit der Übergabe einer Probetrainingsanfrage an eine zuständige Person samt nächster Aufgabe. Wir berücksichtigen vorhandene Tools und prüfen den Ablauf mit Ihrem Team. Einführung, laufende Dienste und Betreuung werden vor dem Auftrag getrennt kalkuliert.",
      },
    ],
    relatedSlugs: ["gesundheit", "gastronomie"],
  },
  {
    slug: "handwerk",
    label: "Handwerk",
    title: "Digitalisierung und KI für Handwerksbetriebe",
    description:
      "Anfragen, Besichtigungen, Offerten und Büroarbeit verbinden. AgenticIT richtet passende Websites, CRM und Automatisierungen für Handwerksbetriebe ein.",
    headline: "Die Arbeit läuft. Das Büro kommt mit.",
    intro:
      "Auf der Baustelle arbeiten und abends noch Anfragen sortieren, Termine abstimmen und Offerten schreiben: Wir bringen diese Aufgaben in einen gemeinsamen Ablauf. Ihr Betrieb erhält passende Tools und Unterstützung bei der Einführung, direkt an den täglichen Aufgaben.",
    audience:
      "Für Handwerksbetriebe mit Einsätzen vor Ort und wiederkehrender Büroarbeit.",
    flow: [
      [
        "Der Auftrag beginnt als Anfrage",
        "Leistung, Einsatzort und Kontaktwunsch aufnehmen",
      ],
      [
        "Das Team bereitet vor",
        "Besichtigung oder nächste Abklärung abstimmen",
      ],
      [
        "Die Arbeit wird übergeben",
        "Freigegebene Offerte und Einsatzaufgaben verbinden",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Ihre Leistungen und Ihr Einsatzgebiet mit einem einfachen Anfrageweg zeigen.",
        items: [
          "Mobile Website mit Leistungen und Region",
          "Freigegebene Arbeitsbeispiele präsentieren",
          "Google-Unternehmensprofil abstimmen",
          "Anfrageformular mit benötigten Angaben",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Vom ersten Anliegen zur fachlich geprüften Offerte kommen.",
        items: [
          "Anfrage dem passenden Gewerk zuordnen",
          "Besichtigung nach Kapazität abstimmen",
          "Offertentwürfe zur Prüfung vorbereiten",
          "Offene Angebote und nächste Aktion sehen",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Die Nacharbeit zu Einsätzen mit weniger doppeltem Übertragen organisieren.",
        items: [
          "Einsatznotizen als Aufgaben vorbereiten",
          "Belege und Unterlagen dem Auftrag zuordnen",
          "Fahrten zur Kontrolle dokumentieren",
          "Übergaben an Büro und Buchhaltung ordnen",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/automatisierungs-check",
    checkLabel: "Manuelle Aufgaben prüfen",
    checkTitle: "Welche Büroaufgabe kostet Sie jeden Tag Zeit?",
    checkCopy:
      "Wählen Sie die Aufgaben, die Sie heute von Hand erledigen, und schätzen Sie Ihren Aufwand. Der Automatisierungs-Check zeigt mögliche Entlastung anhand sichtbarer Annahmen. Sie entscheiden, welcher Ablauf genauer geprüft werden soll.",
    faqs: [
      {
        question: "Muss unser Team zuerst einen KI-Kurs besuchen?",
        answer:
          "Wir richten den vereinbarten Ablauf ein und zeigen Ihrem Team die konkreten Arbeitsschritte. Die Einführung kann beispielsweise an einer Anfrage oder Einsatznotiz stattfinden. Eine verständliche Bedienung und der Umgang mit Fehlerfällen gehören zur gemeinsamen Prüfung.",
      },
      {
        question: "Erstellt KI eine verbindliche Offerte?",
        answer:
          "KI kann Angaben aus der Anfrage ordnen und einen Entwurf anhand Ihrer Vorlagen vorbereiten. Leistungsumfang, Aufwand, Material und Preis prüft die zuständige Fachperson. Ein Angebot wird erst nach menschlicher Freigabe versendet.",
      },
      {
        question: "Was kann ein digitales Fahrtenbuch übernehmen?",
        answer:
          "Eine passende Lösung kann Fahrten erfassen und zur Zuordnung vorbereiten. Zweck, geschäftliche oder private Nutzung sowie Korrekturen müssen im gewählten System geklärt werden. Die Eignung für Ihre Abrechnung wird mit den zuständigen Personen geprüft.",
      },
      {
        question: "Passt das zu unserem Kalender und der Bürosoftware?",
        answer:
          "Wir prüfen die vorhandenen Systeme, Schnittstellen und Zugriffsrechte. Ein erster Ablauf kann auch mit einer klaren Übergabe ans Büro beginnen. Verfügbarkeiten und erfolgreiche Übertragung werden geprüft, bevor eine automatische Bestätigung vorgesehen wird.",
      },
      {
        question: "Wie planen wir Aufwand und Kosten?",
        answer:
          "Wir wählen eine konkrete wiederkehrende Aufgabe und erfassen den heutigen Aufwand. Anschliessend vereinbaren wir Ergebnis, Einführung, Kosten und Abnahme. Lizenzen, laufender Betrieb und Betreuung werden gesondert ausgewiesen; eine bestimmte Zeitersparnis wird nicht vorweggenommen.",
      },
    ],
    relatedSlugs: ["autohaus", "immobilien"],
  },
  {
    slug: "hotellerie",
    label: "Hotellerie",
    title: "Digitalisierung und KI für Hotels und Beherbergung",
    description:
      "Reservationsanfragen, Gästekommunikation und Empfangsaufgaben verbinden. AgenticIT begleitet Hotels mit passenden Websites, Tools und Automatisierungen.",
    headline: "Gäste betreuen. Abläufe vereinfachen.",
    intro:
      "Am Empfang treffen Anreise, Telefon und Reservationsanfragen zusammen. Wir verbinden Ihren Auftritt mit Anfragebearbeitung und wiederkehrenden Gästeinformationen. Ihr Team sieht, welche Buchung bestätigt ist, was noch geklärt werden muss und wer übernimmt.",
    audience:
      "Für Hotels und Beherbergungsbetriebe mit direktem Gästekontakt und Reservationsanfragen.",
    flow: [
      ["Ein Gast fragt an", "Reisezeitraum und Wünsche strukturiert aufnehmen"],
      [
        "Die Rezeption prüft",
        "Verfügbarkeit, Angebot und Bedingungen abstimmen",
      ],
      [
        "Der Aufenthalt wird vorbereitet",
        "Bestätigte Angaben ans zuständige Team übergeben",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Zimmer, Angebote und Buchungsweg für passende Gäste klar darstellen.",
        items: [
          "Mobile Website mit klarem Buchungsweg",
          "Zimmer und Angebote verständlich zeigen",
          "Kampagnen und Landingpages abstimmen",
          "Herkunft direkter Anfragen auswerten",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Reservations- und Gruppenanfragen vorbereitet bearbeiten.",
        items: [
          "Reisezeitraum und Anfrage zuordnen",
          "Zimmerverfügbarkeit vor Zusage prüfen",
          "Gruppenangebote zur Freigabe vorbereiten",
          "Zuständigkeit und nächste Aktion festhalten",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Verwaltung",
        copy: "Rezeption und Betrieb bei wiederkehrenden Informationen unterstützen.",
        items: [
          "Geprüfte Anreiseinformationen bereitstellen",
          "Besondere Wünsche ans Team weitergeben",
          "Änderungen am Aufenthalt zuordnen",
          "Antwortentwürfe auf Gästebewertungen prüfen",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/anfragen-check",
    checkLabel: "Ihren Anfrageweg prüfen",
    checkTitle: "Wird aus der Anfrage ein klarer nächster Schritt?",
    checkCopy:
      "Prüfen Sie Eingang, Zuständigkeit und Rückmeldung für Ihre Reservationsanfragen. Der Check liefert priorisierte Schritte. Zimmerpreise, Gäste- oder Buchungsdaten werden dafür nicht benötigt.",
    faqs: [
      {
        question: "Kann das mit unserem Buchungssystem verbunden werden?",
        answer:
          "Wir prüfen PMS, Buchungsmaschine und verfügbare Schnittstellen. Dabei klären wir, welches System für Verfügbarkeit, Preise und bestätigte Buchungen massgeblich ist. Erst danach wird der Umfang einer Anbindung festgelegt.",
      },
      {
        question: "Verhindert KI doppelte Zimmerbuchungen?",
        answer:
          "Eine solche Garantie geben wir nicht. Vor einer automatischen Zusage müssen aktuelle Verfügbarkeit und der erfolgreiche Buchungsschritt bestätigt sein. Wir prüfen Überschneidungen, Änderungen und Ausfälle; bei unklarem Stand übernimmt Ihre Rezeption.",
      },
      {
        question: "Können Gäste Informationen in mehreren Sprachen erhalten?",
        answer:
          "Wir vereinbaren benötigte Sprachen und freigegebene Informationen etwa zu Anreise, Parkplatz oder Frühstück. Ihr Team prüft die Inhalte und typische Rückfragen. Ein kundenorientierter Assistent stellt sich als KI vor und erfindet keine Leistungen oder Bedingungen.",
      },
      {
        question: "Wie bleiben Gästedaten und besondere Wünsche geschützt?",
        answer:
          "Wir klären benötigte Angaben, Berechtigungen, Anbieter, Speicherorte und Aufbewahrung vor dem Einsatz. Besondere Wünsche werden nur im vereinbarten Umfang weitergegeben. Für die erste Prüfung sind freigegebene Beispiele ohne echte Gästedossiers sinnvoll.",
      },
      {
        question: "Was ist ein sinnvoller Einstieg für ein kleineres Hotel?",
        answer:
          "Zum Beispiel die strukturierte Übergabe einer Reservationsanfrage oder Antwortentwürfe zu wiederkehrenden organisatorischen Fragen. Wir erfassen den heutigen Aufwand und prüfen den Ablauf mit der Rezeption. Kosten, Einführung und Betreuung stehen vor dem Auftrag fest.",
      },
    ],
    relatedSlugs: ["gastronomie", "immobilien"],
  },
]

export const allIndustryFocus: readonly IndustryFocus[] = [
  ...industryFocus,
  ...additionalIndustryFocus,
]

export function relatedIndustries(
  focus: IndustryFocus,
): readonly IndustryFocus[] {
  const slugs = focus.relatedSlugs ?? industryFocus.map((item) => item.slug)
  return allIndustryFocus
    .filter((item) => item.slug !== focus.slug && slugs.includes(item.slug))
    .slice(0, 2)
}
