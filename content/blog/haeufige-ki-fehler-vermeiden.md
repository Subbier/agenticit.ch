---
title: "KI-Fehler früh erkennen"
slug: "haeufige-ki-fehler-vermeiden"
description: "Neun Prüffragen für Ihr KI-Vorhaben: Aufgabe, Quellen, Freigabe, Datenwege, Team und Betrieb. Mit konkreten nächsten Schritten und KI-Einsatzkarte."
date: "2026-07-24"
updated: "2026-10-17"
category: "KI-Grundlagen"
tags: ["KI-Einführung", "Qualität", "KI-Agenten", "KMU"]
keywords:
  [
    "ki fehler",
    "fehler ki einführung",
    "ki projekte prüfen",
    "ki automatisierung",
  ]
readingTime: 5
resource:
  title: "Einen Ablauf vor dem Einsatz prüfen."
  copy: "Die KI-Einsatzkarte verbindet Aufgabe, Quellen, Befugnisse und Prüffälle. Halten Sie tatsächliche Ergebnisse und offene Korrekturen fest."
  href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt"
  label: "KI-Einsatzkarte speichern (.txt)"
nextStep:
  title: "Ist das Zeitpotenzial nachvollziehbar?"
  copy: "Prüfen Sie im Automatisierungs-Check ein Szenario mit eigenen Angaben. Verbleibende Arbeit, Kontrolle und Pflege gehören in den Vergleich."
  href: "/automatisierungs-check"
  label: "Zeitpotenzial prüfen"
sources:
  - label: "NIST: Qualität, Grenzen und Prüfung im Einsatz messen"
    url: "https://airc.nist.gov/airmf-resources/playbook/measure/"
  - label: "OWASP: Funktionen, Rechte und Autonomie von KI-Agenten begrenzen"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
  - label: "EDÖB: KI und Datenschutz"
    url: "https://www.edoeb.admin.ch/de/ki-und-datenschutz"
faq:
  - q: "Wie erkennen wir eine Lücke im KI-Vorhaben?"
    a: "Prüfen Sie einen vollständigen Vorgang: Sind Aufgabe, Quelle, erlaubte Aktion, zuständige Person und Ergebnis klar? Fehlende Angaben werden als offene Voraussetzungen festgehalten. Eine einzelne Lücke ist ein Anlass zur Klärung, kein pauschaler Beweis für das Scheitern des gesamten Projekts."
  - q: "Beweist eine überzeugende Demo die Einsatzreife?"
    a: "Eine Vorführung zeigt einen ausgewählten Ablauf. Für die Abnahme brauchen Sie passende Prüffälle, tatsächliche Ergebnisse und Nachweise einschliesslich fehlender Angaben, Ausfällen und persönlicher Übernahme. Neue Aufgaben oder Anbindungen werden gesondert geprüft."
  - q: "Wie viel Autonomie sollte ein Agent haben?"
    a: "Nur die für die vereinbarte Aufgabe benötigten Funktionen und Rechte. Lesen, Entwurf und Ausführung werden getrennt beurteilt. Bei AgenticIT benötigen ausgehende Sales-Nachrichten und geschäftliche Empfehlungen eine menschliche Freigabe vor dem Versand."
  - q: "Wann lohnt es sich, eine Aufgabe vorerst nicht zu automatisieren?"
    a: "Wenn Voraussetzungen fehlen oder der Aufwand einschliesslich Kontrolle und Pflege den erwarteten Nutzen nicht trägt, kann eine einfachere Lösung oder ein Aufschub sinnvoll sein. Halten Sie den Grund und den nächsten Klärungsschritt fest."
---

> **KI-Fehler lassen sich besser einordnen, wenn die erwartete Aufgabe und das tatsächliche Ergebnis klar sind.** Die folgenden neun Prüffragen helfen, offene Punkte vor dem Einsatz und im Betrieb sichtbar zu machen. Sie sind eine eigene Arbeitshilfe, keine statistische Rangliste von Scheitergründen.

## Welche neun Punkte sollten wir prüfen?

### 1. Ist die Aufgabe konkret genug?

«Wir brauchen KI» beschreibt noch kein Ergebnis. Formulieren Sie einen Vorgang, die benötigten Eingaben und die Person, die das Ergebnis beurteilt.

**Nächster Schritt:** Ein Beispiel vom Eingang bis zur Übernahme beschreiben. Der [Leitfaden zur KI-Einführung](/blog/ki-einfuehrung-schritt-fuer-schritt) hilft beim Start.

### 2. Braucht dieser Schritt überhaupt KI?

Ein klarer Eingang oder eine feste Zuordnung lässt sich möglicherweise mit vorhandenen Regeln lösen. Prüfen Sie, wo tatsächlich unterschiedliche Inhalte verstanden oder Entscheidungen vorbereitet werden müssen.

**Nächster Schritt:** Vorhandene Funktionen, festen Workflow und KI-Unterstützung anhand derselben Aufgabe vergleichen.

### 3. Sind Quellen und offene Angaben erkennbar?

Eine flüssig formulierte Antwort belegt weder ihre Richtigkeit noch den Eingang im Zielsystem. Halten Sie fest, welche Quelle genutzt wurde und welche Angaben ungeklärt bleiben.

**Nächster Schritt:** Ein vollständiges und ein unvollständiges Beispiel prüfen. Fehlendes Wissen darf nicht durch eine erfundene Angabe ersetzt werden.

### 4. Sind die Befugnisse passend begrenzt?

Ein Assistent, der Informationen zusammenfasst, benötigt dafür nicht automatisch Versand- oder Löschrechte. [OWASP beschreibt Risiken übermässiger Funktionen, Rechte und Autonomie und empfiehlt deren Begrenzung sowie Freigaben für weitreichende Aktionen](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).

**Nächster Schritt:** Lesen, Entwurf und Ausführung getrennt festlegen und technisch begrenzen. Ausgehende Sales-Nachrichten und geschäftliche Empfehlungen werden bei AgenticIT vor dem Versand menschlich freigegeben.

### 5. Sind Datenwege und Transparenz geklärt?

Der [EDÖB erläutert, dass das Schweizer Datenschutzgesetz auch beim KI-Einsatz gilt](https://www.edoeb.admin.ch/de/ki-und-datenschutz). Zweck, Anbieter, benötigte Angaben, Zugriffe und Aufbewahrung gehören vor der Verarbeitung auf den Tisch.

**Nächster Schritt:** Die Datenwege beschreiben und offene Fragen klären. Kundenorientierte Assistenten stellen sich bei AgenticIT zu Beginn als KI vor.

### 6. Kann das Team prüfen und übernehmen?

Eine Zuständigkeit im Konzept hilft erst, wenn die Person den Vorgang tatsächlich erhält und bearbeiten kann. Auch Abwesenheit und der ausdrückliche Wunsch nach persönlicher Hilfe gehören dazu.

**Nächster Schritt:** Prüfung und Übernahme mit den betroffenen Personen üben. Mehr dazu unter [KI im Team einführen](/blog/change-management-mit-ki).

### 7. Decken die Prüffälle den Einsatz ab?

Ein gelungener Normalfall reicht nicht. Spielen Sie auch fehlende Informationen, doppelte Eingänge und ausgefallene Anbindungen durch. Notieren Sie Erwartung, tatsächliches Ergebnis und offenen nächsten Schritt.

Das [NIST-Playbook behandelt Messung, Grenzen und passende Prüfverfahren über den Einsatz hinweg](https://airc.nist.gov/airmf-resources/playbook/measure/). Daraus folgt keine allgemeine Bestehensquote für Ihr Vorhaben.

**Nächster Schritt:** Vor dem Start vereinbaren, welche Fehler behoben werden müssen und wer die Abnahme entscheidet.

### 8. Ist die Nutzenrechnung vollständig?

Erfassen Sie neben möglicher Entlastung auch verbleibende Arbeit, Prüfung, Fehlerkorrektur, Einrichtung, Nutzung und Betreuung. Freie Zeit bedeutet nicht automatisch sinkende Ausgaben.

**Nächster Schritt:** Annahmen offenlegen und später mit tatsächlichen Vorgängen vergleichen. Der Beitrag [KI-ROI berechnen](/blog/ki-roi-berechnen) trennt Zeitwert und Geldfluss.

### 9. Ist der Betrieb organisiert?

Wissensquellen, Zuständigkeiten und Anbindungen können sich ändern. Klären Sie, wer Fehler bemerkt, Aktualisierungen prüft und bei einer Störung übernimmt.

**Nächster Schritt:** Betriebsverantwortung, Supportweg und erneute Prüfung nach Änderungen festhalten.

## Was machen wir mit offenen Punkten?

Ordnen Sie jeder Beobachtung eine verantwortliche Rolle und einen nächsten Klärungsschritt zu. Halten Sie fest, welche Voraussetzung vor dem Einsatz erfüllt sein muss. Ein einfacher Status «offen» ist hilfreicher als eine unbelegte Zusage, das System werde den Fall schon lösen.

Die Einsatzkarte oben bietet Platz für Prüffälle, Ist-Ergebnis und Nachweis. Verwenden Sie für die erste Planung erfundene Beispiele ohne Kundendossiers oder Zugangsdaten.

## Wie unterstützt AgenticIT?

Wir prüfen die Aufgabe gemeinsam mit Ihrem Team und verbinden [KI-Entwicklung](/loesungen/ki-entwicklung) mit passenden Abläufen und begrenzten Befugnissen. Unsere [Zusammenarbeit](/zusammenarbeit) beschreibt Vorbereitung, Abnahme und Betreuung. Eine konkrete Umsetzung beginnt mit einem vereinbarten Leistungsumfang.
