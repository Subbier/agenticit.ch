---
title: "KI-Agenten für KMU: Beispiele und Grenzen"
slug: "ki-agenten"
description: "Was KI-Agenten im Betrieb übernehmen können, wann ein Workflow reicht und wie Sie Nutzen und Fehlerfälle prüfen. Mit einer bearbeitbaren Einsatzkarte."
date: "2026-07-24"
updated: "2026-10-17"
category: "KI-Agenten"
tags: ["KI-Agenten", "KMU", "Prozessautomatisierung", "Entscheidungshilfe"]
keywords:
  [
    "ki agenten",
    "was ist ein ki agent",
    "ki agenten unternehmen",
    "ki agenten kmu",
  ]
readingTime: 6
pillar: true
resource:
  title: "Ihre erste Aufgabe für KI – auf einer Einsatzkarte."
  copy: "Halten Sie Aufgabe, Daten, Befugnisse und Prüffälle fest. Eine bearbeitbare Vorlage, die Sie unabhängig von einer Zusammenarbeit nutzen können."
  href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt"
  label: "Einsatzkarte speichern (.txt)"
nextStep:
  title: "Wie viel Routine könnten Sie abgeben?"
  copy: "Im Automatisierungs-Check wählen Sie Aufgaben und rechnen mit eigenen Zeitangaben. Verbleibende Arbeit und zusätzliche Kontrolle werden berücksichtigt."
  href: "/automatisierungs-check"
  label: "Automatisierungspotenzial prüfen"
sources:
  - label: "Anthropic: Workflows und Agenten unterscheiden"
    url: "https://www.anthropic.com/engineering/building-effective-agents"
  - label: "Google Cloud: Definition und Aufbau von KI-Agenten"
    url: "https://cloud.google.com/discover/what-are-ai-agents?hl=de"
faq:
  - q: "Was ist ein KI-Agent einfach erklärt?"
    a: "Ein KI-Agent ist eine Anwendung, bei der ein KI-Modell innerhalb festgelegter Grenzen nächste Arbeitsschritte und Werkzeuge auswählt. Er kann zum Beispiel Informationen nachschlagen und eine Aufgabe vorbereiten. Welche Aktionen tatsächlich möglich sind, hängt von Anbindungen und Berechtigungen ab."
  - q: "Was unterscheidet einen KI-Agenten von einem Workflow?"
    a: "Ein Workflow folgt vorgegebenen Schritten. Bei einem Agenten entscheidet ein Modell teilweise selbst, welcher Schritt als Nächstes nötig ist. Beides kann kombiniert werden. Ein Chatfenster allein sagt nichts über diese Fähigkeiten aus."
  - q: "Welche Aufgabe eignet sich als Einstieg für ein KMU?"
    a: "Wählen Sie eine wiederkehrende Aufgabe mit überprüfbarem Ergebnis und begrenzten Folgen bei Fehlern. Beispiele sind das Vorbereiten einer Antwort aus freigegebenen Unterlagen oder das Einordnen einer Anfrage mit anschliessender Teamprüfung."
  - q: "Sparen KI-Agenten automatisch Zeit und Geld?"
    a: "Nein. Vergleichen Sie die heutige Bearbeitung mit verbleibender Handarbeit, Kontrolle und laufender Pflege. Einrichtung, Lizenzen und Betrieb kommen hinzu. Freie Arbeitszeit wird erst dann wirtschaftlich nutzbar, wenn Ihr Team sie sinnvoll einsetzen kann."
---

> **Ein KI-Agent kann Arbeitsschritte auswählen und Werkzeuge nutzen, um eine Aufgabe zu bearbeiten.** Für Ihren Betrieb zählt, ob das Ergebnis zuverlässig genug ist und der gesamte Aufwand sinkt. Starten Sie bei einer konkreten Aufgabe, die Ihr Team heute bereits kennt.

## Was sind KI-Agenten – und was sind sie nicht automatisch?

Bei einem KI-Agenten entscheidet ein Modell innerhalb eines eingerichteten Ablaufs mit: Welche Information fehlt? Welche freigegebene Quelle hilft? Welches Werkzeug ist als Nächstes nötig? Ein angebundenes System kann anschliessend einen Entwurf erstellen oder eine erlaubte Aktion ausführen. Ohne passende Anbindung kann der Agent beispielsweise keinen Eintrag im CRM speichern.

Ein Chatfenster ist zunächst eine Bedienoberfläche. Dahinter kann ein einfaches Antwortsystem, ein fester Workflow oder ein Agent stehen. Deshalb hilft die Bezeichnung «Chatbot» allein bei der Auswahl wenig. Fragen Sie nach dem konkreten Verhalten und den verfügbaren Befugnissen. [Google Cloud beschreibt die grundlegenden Bausteine von Agenten](https://cloud.google.com/discover/what-are-ai-agents?hl=de).

## Wann reicht ein Workflow, wann braucht es einen Agenten?

Wenn ein Formular immer dieselben Pflichtfelder ins CRM übergibt, ist ein festgelegter Ablauf oft gut geeignet. Wenn unterschiedlich formulierte Anfragen verstanden, mit Wissen abgeglichen und fehlende Angaben erkannt werden sollen, kann KI helfen. Ob das einen Agenten erfordert, hängt vom Ablauf ab.

| Situation                                       | Möglicher Einstieg                                    |
| ----------------------------------------------- | ----------------------------------------------------- |
| Feste Felder von A nach B übertragen            | Workflow mit klaren Prüfregeln                        |
| Einen Text oder ein Dokument bearbeiten         | Vorhandenes KI-Tool mit Teamprüfung                   |
| Je nach Inhalt unterschiedliche Schritte wählen | Agent mit begrenzten Werkzeugen                       |
| Fehler wären schwer erkennbar oder folgenreich  | Zuerst menschliche Bearbeitung und bessere Kontrollen |

Diese Unterscheidung orientiert sich an [Anthropics Beschreibung von Workflows und Agenten](https://www.anthropic.com/engineering/building-effective-agents). Mehr Autonomie kann zusätzliche Kosten, Wartezeit und Fehlerquellen mitbringen. Prüfen Sie die einfachste passende Lösung. Beim Vergleich von Standardtool und eigener Anwendung hilft unser Beitrag [ChatGPT oder eigener KI-Agent?](/blog/eigene-ki-agenten-vs-chatgpt).

## Welche Aufgaben sind für Schweizer KMU interessant?

Die folgenden Beispiele zeigen mögliche Abläufe. Sie sind keine Referenzprojekte oder Ergebniszusagen.

### Anfragen für die Beratung vorbereiten

Eine Anfrage enthält Anliegen, gewünschte Leistung und Rückfragen. KI ordnet die Angaben und markiert fehlende Informationen. Ein fester Ablauf weist den Vorgang einer zuständigen Person zu. Ihr Team prüft die Einordnung und übernimmt den Kundenkontakt. Wie die Übergabe aussehen kann, lesen Sie im [Leitfaden zu Anfrage und CRM](/blog/ki-automatisierung-vertrieb).

### Antworten aus freigegebenem Wissen entwerfen

Ein interner Assistent sucht in freigegebenen Produkt- oder Serviceunterlagen und erstellt einen Antwortentwurf mit Quelle. Bei widersprüchlichen oder fehlenden Angaben übergibt er an eine Person. Eine Wissenssuche verhindert falsche Antworten nicht automatisch; sie macht ihre Grundlage besser überprüfbar.

### Besprechungen in Aufgaben überführen

Aus einer freigegebenen Gesprächsnotiz werden Aufgaben vorgeschlagen. Verantwortliche und Fristen müssen aus dem Inhalt hervorgehen oder offenbleiben. Vor dem Anlegen prüft das Team die Vorschläge. Ein Auftrag wie «Kunde bis Freitag zurückrufen» darf keine bereits erfolgte Kontaktaufnahme vortäuschen.

## Wie prüfen wir eine Aufgabe vor der Umsetzung?

Beschreiben Sie einen echten, möglichst einfachen Vorgang:

1. **Auslöser:** Wodurch beginnt die Aufgabe, und welche Angaben liegen vor?
2. **Ergebnis:** Was muss am Ende konkret vorliegen, damit Ihr Team weiterarbeiten kann?
3. **Befugnisse:** Welche Informationen darf die Anwendung lesen, was nur vorbereiten und was nach Freigabe ausführen?
4. **Übernahme:** Wer übernimmt, wenn Daten fehlen, Systeme ausfallen oder die Antwort unklar ist?

Nutzen Sie dafür die Einsatzkarte oben. Tragen Sie offene Punkte ein. Für die erste Planung braucht es keine Passwörter, Kundendossiers oder vollständigen Gesprächsaufnahmen.

## Wie lässt sich der Nutzen realistisch berechnen?

Messen Sie zunächst heutige Bearbeitungszeit und Fallzahl. Rechnen Sie danach mit verbleibender Arbeit und zusätzlicher Kontrolle. Laufende Pflege sowie Einrichtungs- und Betriebskosten gehören ebenfalls in den Vergleich.

**Rechenbeispiel mit frei gewählten Annahmen:** 100 Vorgänge pro Monat benötigen heute je sechs Minuten, zusammen zehn Stunden. Künftig bleiben je zwei Minuten Bearbeitung und eine Minute Kontrolle. Das sind fünf Stunden Restaufwand und zunächst fünf Stunden Zeitgewinn. Weitere Pflege ist davon noch abzuziehen. Das Beispiel ist kein gemessenes Kundenresultat.

Prüfen Sie ausserdem die Qualität: Wie oft muss Ihr Team korrigieren? Gehen Informationen verloren? Wird die nächste Aufgabe tatsächlich erledigt? Eine kurze Antwortzeit allein belegt keinen besseren Ablauf. Der [Automatisierungs-Check](/automatisierungs-check) hilft, mit Ihren eigenen Annahmen zu beginnen.

## Was muss vor dem Einsatz funktionieren?

Prüfen Sie normale Fälle sowie fehlende Angaben, widersprüchliche Quellen, doppelte Eingänge und einen Ausfall des Zielsystems. Der Ablauf muss Fehler erkennen lassen und eine nachvollziehbare Übernahme anbieten. Wiederholte Ausführung darf dieselbe Aktion nicht unbeabsichtigt mehrfach auslösen.

Kundenorientierte Agenten von AgenticIT weisen sich als KI aus. Für ausgehende Sales-Nachrichten planen wir eine menschliche Freigabe. Datenzugriff, Anbieter, Hosting und Aufbewahrung klären wir für die jeweilige Lösung; die Bezeichnung «eigener Agent» garantiert keine Schweizer Datenhaltung.

Der Leitfaden [KI und Datenschutz](/blog/ki-datenschutz-schweiz-ndsg) hilft bei der Vorbereitung dieser Fragen. Wie Befugnisse und Freigaben praktisch geprüft werden, zeigt [KI-Agenten: Wer darf was?](/blog/ki-agenten-sicherheit-compliance).

## Wie begleitet AgenticIT die Einführung?

Wir klären die Aufgabe mit Ihrem Team, vergleichen vorhandene Tools und entwickeln bei Bedarf eine passende Anwendung. Danach prüfen wir Verhalten, Übergaben und Aufwand am vereinbarten Einsatzfall. Umfang, Kosten, Abnahme und Betreuung werden vor der Umsetzung festgelegt. Mehr zum Angebot: [KI-Entwicklung für Schweizer KMU](/loesungen/ki-entwicklung).
