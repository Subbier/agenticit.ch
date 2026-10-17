---
title: "KI und Datenschutz"
slug: "ki-datenschutz-schweiz-ndsg"
description: "KI und Datenschutz in der Schweiz: Datenwege, Anbieter, Aufbewahrung und Zuständigkeit vor dem Start klären. Mit Einsatzkarte und aktuellen Primärquellen."
date: "2026-07-24"
updated: "2026-10-17"
category: "Recht & Sicherheit"
tags: ["KI", "Datenschutz", "Schweiz", "Datenwege"]
keywords: ["ki datenschutz schweiz", "dsg ki", "ki datenbearbeitung"]
readingTime: 5
resource:
  title: "Ihre Datenwege zuerst klären."
  copy: "Die bestehende KI-Einsatzkarte hält Aufgabe, Systeme, Quellen und Befugnisse zusammen. Notieren Sie offene Fragen, bevor Sie Kundendaten oder Zugänge bereitstellen."
  href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt"
  label: "Einsatzkarte speichern (.txt)"
nextStep:
  title: "Kontrolle im Ablauf ansehen."
  copy: "Unser interaktives Beispiel zeigt, was KI vorbereitet und wann Ihr Team entscheidet. Sie können auch eine fehlende Zuständigkeit ausprobieren. Das Beispiel verwendet vorgegebene Inhalte und versendet keine Nachrichten."
  href: "/loesungen/ki-entwicklung#beispiele"
  label: "Ablaufbeispiel ausprobieren"
sources:
  - label: "EDÖB: KI und Datenschutz"
    url: "https://www.edoeb.admin.ch/de/ki-und-datenschutz"
  - label: "EDÖB: Verantwortung und Datenwege bei Auftragsbearbeitung"
    url: "https://www.edoeb.admin.ch/de/outsourcing-auftragsdatenbearbeitung"
  - label: "Europäische Kommission: Für welche Unternehmen die DSGVO gilt"
    url: "https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en"
faq:
  - q: "Gilt das Schweizer Datenschutzgesetz auch für KI?"
    a: "Der EDÖB hält fest, dass das Schweizer Datenschutzgesetz auf KI-gestützte Personendatenbearbeitung direkt anwendbar ist. Die konkrete Aufgabe, die verwendeten Daten und die beteiligten Anbieter müssen deshalb vor dem Einsatz geklärt werden."
  - q: "Gilt für jedes Schweizer KMU mit EU-Kunden automatisch die DSGVO?"
    a: "Diese Faustregel ist zu pauschal. Für die Anwendbarkeit sind unter anderem eine EU-Niederlassung oder ein auf Personen in der EU gerichtetes Angebot beziehungsweise eine entsprechende Verhaltensbeobachtung relevant. Der konkrete Anwendungsbereich muss geprüft werden."
  - q: "Reicht eine Anbieterzusage zur Schweizer Datenhaltung?"
    a: "Klären Sie den tatsächlichen Ablauf: beteiligte Anbieter und Unterauftragnehmer, Orte der Bearbeitung, Zugriffe und vertragliche Regelungen. Eine Standortangabe allein beschreibt nicht alle Datenwege. Bei Bekanntgaben ins Ausland sind die dafür geltenden Voraussetzungen zu prüfen."
  - q: "Welche Angaben brauchen wir für eine erste Projektklärung?"
    a: "Zunächst genügen Aufgabe, Datenarten, beteiligte Systeme und offene Fragen. Nutzen Sie erfundene Beispiele ohne Personendaten. Passwörter, Zugangsschlüssel und echte Kundendossiers gehören nicht in die Einsatzkarte oder eine allgemeine Anfrage."
---

> **Beginnen Sie mit einer Aufgabe und ihren Datenwegen.** Wer darf welche Angaben wofür verwenden? Welche Anbieter sind beteiligt? Mit diesen Antworten lässt sich ein KI-Vorhaben gezielt prüfen und besprechen.

## Welche Daten braucht die Aufgabe wirklich?

Beschreiben Sie zuerst das gewünschte Ergebnis. Soll ein Assistent Produktwissen finden, eine Anfrage zusammenfassen oder einen Antwortentwurf vorbereiten? Daraus ergibt sich, welche Informationen nötig sind.

Für einen ersten Entwurf reichen häufig frei erfundene Beispiele ohne Personendaten. Übernehmen Sie keine echten Kundendossiers, um eine Idee zu erklären. «Namen entfernt» bedeutet auch nicht automatisch anonym: Prüfen Sie, ob die Person über andere Angaben weiterhin erkennbar wäre.

Der [EDÖB bestätigt, dass das geltende Datenschutzgesetz auch auf KI-gestützte Personendatenbearbeitung anwendbar ist](https://www.edoeb.admin.ch/de/ki-und-datenschutz). Die Bezeichnung «KI» schafft keine Ausnahme von der Datenprüfung.

## Welche Datenwege sollten wir festhalten?

Zeichnen Sie einen einzelnen Vorgang vom Eingang bis zum Ergebnis nach. Eine kurze Arbeitsübersicht kann so aussehen:

| Klärung      | Was Ihr Team festhält                       |
| ------------ | ------------------------------------------- |
| Eingang      | Quelle, benötigte Angaben und Zweck         |
| Bearbeitung  | System, Anbieter und berechtigte Rollen     |
| Ergebnis     | Empfänger, Prüfung und weitere Verwendung   |
| Aufbewahrung | Speicherorte, Fristen und zuständige Person |

Erfassen Sie neben der Hauptanwendung auch eingebundene Dienste und Protokolle. Klären Sie ausdrücklich, ob Eingaben für weitere Zwecke wie Modelltraining verwendet werden und welche Einstellungen sowie Verträge tatsächlich gelten.

Die Einsatzkarte oben unterstützt diese erste Übersicht. Sie ist eine Planungshilfe für die Aufgabe und ersetzt keine abgeschlossene Datenschutzprüfung.

## Was müssen wir beim Anbieter klären?

Der [EDÖB erläutert, dass die Verantwortung für den Datenschutz bei einer Auftragsbearbeitung nicht einfach an den Dienstleister übergeht](https://www.edoeb.admin.ch/de/outsourcing-auftragsdatenbearbeitung). Klären Sie vor der Anbindung:

- **Auftrag und Vertrag:** Welche Bearbeitung ist vereinbart, welche Weisungen gelten?
- **Beteiligte Stellen:** Welche Anbieter und Unterauftragnehmer kommen zum Einsatz?
- **Orte und Zugriffe:** Wo findet die Bearbeitung statt und wer kann zugreifen?
- **Unterstützung:** Wie werden Auskunft, Korrekturen, Löschfragen und Sicherheitsvorfälle bearbeitet?

Ein Hostingland allein beantwortet diese Fragen nicht. Bei einer Bekanntgabe ins Ausland muss der konkrete Übermittlungsweg mit seinen Voraussetzungen geprüft werden. Lassen Sie unbekannte Anbieterangaben als offene Punkte stehen, statt sie mit einer allgemeinen Sicherheitszusage zu ersetzen.

## Wann kommt zusätzlich die DSGVO ins Spiel?

«Wir haben EU-Kunden» ist als alleinige Regel zu ungenau. Die [Europäische Kommission beschreibt unter anderem die Bearbeitung im Rahmen einer EU-Niederlassung sowie Angebote an oder Verhaltensbeobachtung von Personen in der EU](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en).

Lassen Sie den tatsächlichen Anwendungsbereich für Ihr Unternehmen und den geplanten Ablauf prüfen. Schweizer DSG und europäische DSGVO sollten dabei nicht als identische Checklisten behandelt werden.

## Was müssen Menschen erkennen und klären können?

Nach den [Hinweisen des EDÖB sind Zweck, Funktionsweise und Datenquellen transparent auszuweisen](https://www.edoeb.admin.ch/de/ki-und-datenschutz). Bei einem direkt kommunizierenden Sprachmodell sollen Menschen wissen, inwieweit sie mit einer Maschine sprechen und wofür ihre Eingaben verwendet werden.

Für die Umsetzung planen wir bei AgenticIT die erkennbare KI-Kennzeichnung und eine verantwortliche Rolle für Rückfragen ein. Legen Sie zusätzlich fest, wie betroffene Personen die zuständige Stelle erreichen und wie ihr Anliegen bearbeitet wird.

Bei Entscheidungen mit erheblichen Folgen für Menschen, besonders schützenswerten Angaben oder weiteren erhöhten Risiken braucht es eine vertiefte Prüfung. Ob zusätzliche gesetzliche Pflichten bestehen, lässt sich nicht aus einer kurzen Website-Checkliste ableiten.

## Wie machen wir aus offenen Fragen den nächsten Schritt?

Notieren Sie pro ungeklärtem Punkt eine verantwortliche Rolle und den benötigten Nachweis: etwa eine Anbieterantwort, eine Vertragsprüfung oder die Bestätigung eines Speicherorts. Vereinbaren Sie, welche Punkte vor einer Verarbeitung echter Daten geklärt sein müssen.

Die technische Durchsetzung von Befugnissen beschreibt der Beitrag [KI-Agenten: Wer darf was?](/blog/ki-agenten-sicherheit-compliance). Im [interaktiven Ablaufbeispiel](/loesungen/ki-entwicklung#beispiele) können Sie Vorbereitung, Teamprüfung und Freigabe ohne echte Daten ausprobieren.

Dieser Beitrag bietet eine allgemeine Orientierung für die Projektvorbereitung. Die rechtliche Beurteilung erfolgt am konkreten Einsatzfall.
