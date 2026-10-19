---
title: "RevOps-Kennzahlen: Anfragen und Aufträge messen"
slug: "revops-metriken-kennzahlen"
description: "Vier Kennzahlen vom Anfrageeingang bis zum Auftrag: Zählregeln, Bezugsgrössen und fehlende Werte verständlich festhalten. Mit bearbeitbarem Arbeitsblatt."
date: "2026-07-24"
updated: "2026-10-19"
category: "RevOps"
tags: ["RevOps", "Kennzahlen", "CRM", "Marketing", "Sales"]
keywords:
  [
    "revops metriken",
    "revops kennzahlen",
    "revenue operations kennzahlen",
    "vertrieb kennzahlen",
  ]
readingTime: 4
resource:
  title: "Ihre Kennzahlen verständlich festhalten."
  copy: "Definieren Sie Eingang, Passung, Gespräch und Auftrag mit Quelle, Bezugsgrösse und verantwortlicher Rolle. Das Arbeitsblatt ist direkt nutzbar."
  href: "/vorlagen/AgenticIT-Kennzahlen-Arbeitsblatt.txt"
  label: "Arbeitsblatt speichern (.txt)"
nextStep:
  title: "Kommt Ihre Anfrage bis zur richtigen Person?"
  copy: "Der Anfragen-Check ordnet Eingang, Zuständigkeit, Reaktion, Nachfassen und Ergebnis ein. Sie erhalten konkrete nächste Schritte."
  href: "/anfragen-check"
  label: "Anfrageweg prüfen"
sources:
  - label: "Google Analytics: Anfrage, Qualifizierung und Abschluss getrennt erfassen"
    url: "https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events?hl=de"
  - label: "UK Government: Vollständigkeit und Richtigkeit unterscheiden"
    url: "https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework"
faq:
  - q: "Mit welchen RevOps-Kennzahlen können wir beginnen?"
    a: "Ein möglicher Einstieg sind eindeutige Anfragen, deren fachliche Passung, tatsächlich geführte Gespräche und Aufträge. Definieren Sie für jede Stufe Datenquelle, Zeitpunkt, Zählregel und verantwortliche Rolle."
  - q: "Sind Website-Ereignisse schon echte Leads?"
    a: "Ein Ereignis zeigt zunächst die gemeldete Website-Aktion. Für den Eingang im CRM und die fachliche Qualifizierung braucht es eigene Nachweise. Wiederholte Ereignisse können ausserdem vom selben Kontakt stammen."
  - q: "Wie berechnen wir eine Übergangsquote?"
    a: "Teilen Sie die Zahl der weitergekommenen Vorgänge durch die passende Ausgangsgruppe und multiplizieren Sie mit 100. Beide Zahlen müssen dieselbe definierte Gruppe betreffen. Bei einem Nenner von null wird keine Quote ausgewiesen."
  - q: "Welche Zielquote ist für unser Unternehmen richtig?"
    a: "Das hängt von Angebot, Zielgruppe, Kanal, Bearbeitung und gewählter Definition ab. Beginnen Sie mit einer nachvollziehbaren eigenen Ausgangsmessung. Kleine, offene oder unterschiedlich lange bearbeitete Gruppen erlauben noch keinen belastbaren Vergleich."
---

> **Vier nachvollziehbare Stufen sind ein guter Anfang für Ihre RevOps-Auswertung: Anfrage, Passung, geführtes Gespräch und Auftrag.** Der Wert entsteht durch gemeinsame Definitionen. Dieser Beitrag zeigt die Zählregeln und rechnet die Übergänge an einem frei gewählten Beispiel durch.

## Klären Sie zuerst, was ein Status bedeutet

Fragen Sie Marketing und Verkauf unabhängig voneinander: «Wann gilt bei uns eine Anfrage als qualifiziert?» Wenn die Antworten unterschiedlich sind, zeigt ein gemeinsames Dashboard noch keinen gemeinsamen Stand.

Halten Sie die Definition mit einem passenden und einem unpassenden Beispiel fest. Benennen Sie Quelle und verantwortliche Rolle. Danach kann Ihr Team die Zahl prüfen und Veränderungen besprechen. Das Arbeitsblatt oben enthält dafür Zähler, Nenner und Auswertungsstand. Es hilft auch, einen gebuchten Termin von einem tatsächlich geführten Gespräch zu unterscheiden.

## Welche vier Kennzahlen sind ein verständlicher Einstieg?

Das folgende Modell ist ein eigener Vorschlag für Beratungs- und Vertriebsteams. Passen Sie die Definitionen an Ihren Betrieb an.

| Kennzahl           | Was gezählt wird                                                                       |
| ------------------ | -------------------------------------------------------------------------------------- |
| Anfrageeingang     | Eindeutige, tatsächlich eingegangene Vorgänge nach Bereinigung von Tests und Dubletten |
| Fachliche Passung  | Vorgänge, die das Team nach vereinbarten Kriterien als passend geprüft hat             |
| Geführtes Gespräch | Anfragevorgänge aus der passenden Gruppe mit tatsächlich geführtem Gespräch            |
| Auftrag            | Anfragevorgänge aus der Gesprächsgruppe mit nachgewiesenem Auftrag                     |

Ein gebuchter Termin und ein geführtes Gespräch sind verschiedene Stände. Ein Auftrag braucht einen eigenen Beleg und bedeutet noch keinen Zahlungseingang. Auch [Google Analytics führt unterschiedliche Ereignisse für Anfrage, Qualifizierung und Abschluss](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events?hl=de).

## Wie lassen sich Übergänge berechnen?

**Frei gewähltes Rechenbeispiel, kein Kundenergebnis:** Eine abgeschlossene Gruppe enthält 100 bereinigte Anfragen. Davon wurden 40 als passend geprüft. Bei 20 dieser Anfragen fand ein Gespräch statt; vier davon führten zu einem Auftrag. Die Zähleinheit ist der Anfragevorgang. Pro Vorgang und Stufe wird höchstens einmal gezählt.

- **Passung:** 40 von 100 Anfragen = 40 Prozent.
- **Gespräch:** 20 von 40 passenden Anfragen = 50 Prozent.
- **Auftrag:** 4 von 20 Anfragevorgängen mit Gespräch = 20 Prozent.

Benennen Sie die Ausgangsgruppe bei jeder Quote. Eine Quote aus Gesprächen beantwortet eine andere Frage als eine Quote aus sämtlichen Anfragen. Bei einem Nenner von null wird die Quote als nicht berechenbar markiert.

Das Modell beschreibt den Weg über ein Gespräch. Direktaufträge und andere Wege werden separat gezählt. Für gewonnene Neukunden braucht es zusätzlich eine Zählregel für eindeutige neue Kunden.

## Wie vergleichen wir Zeiträume sinnvoll?

Legen Sie eine Gruppe fest, etwa anhand ihres Anfrageeingangs und Angebots. Notieren Sie den Auswertungsstand und noch offene Vorgänge. Eine frisch eingegangene Gruppe hat meist weniger Zeit für Gespräche und Aufträge als eine länger bearbeitete Gruppe.

Fehlende Angaben bleiben als offen erkennbar. Das [Government Data Quality Framework trennt vollständige von tatsächlich richtigen Daten](https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework). Prüfen Sie deshalb die verwendeten Status und Belege stichprobenartig.

Das Arbeitsblatt oben hält Definition, Datenquelle, Zähler, Nenner und offene Punkte zusammen.

## Was können wir aus einer Veränderung ableiten?

Besprechen Sie den nächsten prüfbaren Schritt. Bei fehlender Passung könnten Zielgruppe oder Angebot überprüft werden. Bei offenen Gesprächsvorgängen helfen klare Zuständigkeit und Bearbeitungsstand. Das sind mögliche Fragen an den Ablauf; eine einzelne Quote beweist noch keine Ursache.

Beobachten Sie ergänzend die Zeit bis zur persönlichen Bearbeitung. Der Leitfaden [Anfragen rechtzeitig bearbeiten](/blog/speed-to-lead-5-minuten-regel) hilft, ein passendes Rückmeldeziel festzulegen.

Wenn Sie Kosten ergänzen, benennen Sie, welche Ausgaben und welcher Zeitraum enthalten sind. Werbekosten pro Anfrage und die gesamten Kosten der Kundengewinnung brauchen unterschiedliche Grundlagen.

## Wie unterstützt AgenticIT die Messung?

Wir verbinden die fachlichen Definitionen mit vorhandenen Datenfeldern, Übergaben und verantwortlichen Personen. Messung, tatsächlicher CRM-Eingang, Qualifizierung und Auftrag werden dabei getrennt geprüft.

[RevOps für Ihr Team](/blog/revops-as-a-service) erklärt die Zusammenarbeit. [KI-Datenanalyse](/blog/ki-datenanalyse-kmu) zeigt, wie vorhandene Daten und verständliche Auswertungen dazu beitragen können. Der Check unten betrachtet Ihren Anfrageweg.
