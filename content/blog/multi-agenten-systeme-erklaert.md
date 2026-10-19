---
title: "Multi-Agenten-Systeme: Wann mehrere KI-Agenten helfen"
slug: "multi-agenten-systeme-erklaert"
description: "Mehrere KI-Agenten sinnvoll aufteilen: Rollen, Übergaben, Quellen und Freigaben. Ein verständliches Planungsbeispiel und der Vergleich mit einfacheren Abläufen."
date: "2026-07-24"
updated: "2026-10-19"
category: "KI-Grundlagen"
tags: ["Multi-Agenten-Systeme", "KI-Entwicklung", "Workflows", "Freigabe"]
keywords:
  ["multi-agenten-systeme", "multi agenten system erklärt", "ki agenten team"]
readingTime: 4
resource:
  title: "Aufgabe und Befugnisse vor der Architektur klären."
  copy: "Beschreiben Sie Quellen, erlaubte Aktionen und Prüffälle mit der KI-Einsatzkarte. Daraus lässt sich die passende Arbeitsteilung ableiten."
  href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt"
  label: "KI-Einsatzkarte speichern (.txt)"
nextStep:
  title: "Wie arbeiten KI und Team zusammen?"
  copy: "Eine vorgegebene Ablauf-Demo zeigt Vorbereitung, menschliche Freigabe und Übernahme bei fehlender Zuständigkeit."
  href: "/loesungen/ki-entwicklung#beispiele"
  label: "Ablauf ausprobieren"
sources:
  - label: "Anthropic: Workflows, Parallelisierung und Orchestrator-Workers"
    url: "https://www.anthropic.com/engineering/building-effective-agents"
  - label: "OWASP: Funktionen, Rechte und Autonomie von Agenten begrenzen"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
faq:
  - q: "Was ist ein Multi-Agenten-System?"
    a: "Mehrere KI-Agenten übernehmen voneinander abgegrenzte Aufgaben und geben Ergebnisse weiter. Die Koordination kann nach festen Regeln oder durch einen koordinierenden Agenten erfolgen. Rollen, Werkzeuge und Übergabeformate müssen ausdrücklich eingerichtet werden."
  - q: "Braucht jede Aufgabe mehrere Agenten?"
    a: "Nein. Vergleichen Sie zuerst vorhandene Funktionen, einen festen Workflow oder einen einzelnen Assistenten. Zusätzliche Agenten sind sinnvoll zu prüfen, wenn eine konkrete Arbeitsteilung einen messbaren Vorteil bringt und die zusätzlichen Übergaben beherrschbar bleiben."
  - q: "Erkennt ein Prüf-Agent automatisch alle Fehler?"
    a: "Eine zweite KI-Ausgabe ist kein unabhängiger Nachweis. Prüfen Sie Quellen und tatsächliche Ergebnisse mit geeigneten Verfahren. Agenten können ähnliche Fehler machen oder ungeprüfte Angaben voneinander übernehmen."
  - q: "Wie bleiben ausgehende Aktionen kontrollierbar?"
    a: "Begrenzen Sie Funktionen und Rechte je Rolle. Bei AgenticIT werden ausgehende Sales-Nachrichten und geschäftliche Empfehlungen vor dem Versand menschlich freigegeben. Die erlaubte Aktion wird im ausführenden System technisch geprüft."
---

> **In einem Multi-Agenten-System übernehmen mehrere KI-Agenten unterschiedliche Teilaufgaben.** Eine Anwendung koordiniert die Ergebnisse und die nächsten Schritte. Diese Arbeitsteilung kann sinnvoll sein, wenn Aufgaben klar trennbar sind. Sie bringt aber auch zusätzliche Übergaben mit sich, die gepflegt und geprüft werden müssen.

## Teilen Sie die Arbeit nach Ergebnissen auf

«Agent eins recherchiert, Agent zwei schreibt» ist noch kein vollständiger Ablauf. Die schreibende Rolle braucht die gefundenen Informationen samt Quelle, offenen Punkten und erlaubtem Verwendungszweck. Fehlt diese Übergabe, kann sie eine Lücke übersehen oder als Tatsache formulieren.

Beschreiben Sie deshalb zuerst die Ergebnisse der einzelnen Rollen. Prüfen Sie dann, ob diese tatsächlich unabhängig entstehen können. Muss eine Rolle auf die andere warten, wird dieser Teil durch zusätzliche Agenten nicht automatisch schneller. Vergleichen Sie die aufgeteilte Lösung mit einem einfacheren Ablauf anhand derselben Aufgabe.

## Welche Arbeitsteilung ist gemeint?

Ein Agent kann Informationen aus freigegebenen Quellen vorbereiten, ein anderer einen Entwurf erstellen. Eine koordinierende Anwendung hält fest, welche Aufgabe offen ist und welche Angaben übergeben werden.

[Anthropic beschreibt unter anderem feste Abläufe, Parallelisierung und das Muster Orchestrator-Workers](https://www.anthropic.com/engineering/building-effective-agents). Die Architekturprinzipien des Beitrags sind eine Einordnung, keine Garantie für ein bestimmtes Produkt oder dessen aktuelle Funktionen.

Nicht jede Folge mehrerer KI-Aufrufe ist ein autonomes Agententeam. Bei einem festen Workflow sind die Schritte vorgegeben. Welche Form zu Ihrer Aufgabe passt, wird gesondert beurteilt.

## Wie könnte ein einfacher Ablauf aussehen?

**Eigenes Planungsbeispiel:** Ein Team möchte aus freigegebenen Unterlagen einen fachlichen Beitrag vorbereiten.

1. **Quellen vorbereiten:** Eine Rolle sammelt benötigte Informationen mit Herkunft und offenen Punkten.
2. **Entwurf erstellen:** Eine weitere Rolle formuliert aus dieser Grundlage einen Text.
3. **Gegenprüfen:** Quellen, Aussagen und vereinbarte Kriterien werden geprüft. Eine zweite KI-Ausgabe genügt dafür allein nicht.
4. **Persönlich freigeben:** Die zuständige Redaktion entscheidet, welche konkrete Fassung veröffentlicht werden darf.

Für jede Übergabe braucht es das erwartete Ergebnis und einen Umgang mit fehlenden Angaben. Das Modell zeigt eine mögliche Aufgabenteilung. Leistungen und überprüfbare Ergebnisse werden für das jeweilige Vorhaben vereinbart.

## Wann ist eine einfachere Lösung passend?

Wenn ein vorhandenes Tool oder ein fester Ablauf die Aufgabe mit weniger Aufwand erfüllt, ist zusätzliche Koordination nicht automatisch hilfreich. Vergleichen Sie dieselben Prüffälle bei einer einfachen Lösung und einer aufgeteilten Variante.

Betrachten Sie Qualität, benötigte Zeit, Nutzungskosten, Kontrolle und Pflege. Parallel arbeitende Rollen können bei unabhängigen Teilaufgaben helfen. Abhängige Schritte können weiterhin aufeinander warten; eine höhere Geschwindigkeit ist nicht pauschal zugesagt.

## Wie werden Rechte und Freigaben begrenzt?

[OWASP beschreibt die Risiken übermässiger Funktionen, Rechte und Autonomie](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). Geben Sie jeder Rolle nur die für ihre Aufgabe benötigten Zugriffe. Informationen lesen, einen Entwurf vorbereiten und eine Aktion ausführen sind getrennte Befugnisse.

Bei AgenticIT benötigen ausgehende Sales-Nachrichten und geschäftliche Empfehlungen eine menschliche Freigabe vor dem Versand. Fremde Nachrichten oder Ergebnisse anderer Agenten erteilen keine zusätzlichen Rechte. Eine Anweisung im Prompt ersetzt die Prüfung der erlaubten Aktion im Zielsystem nicht.

## Was prüfen wir vor dem Einsatz?

Spielen Sie neben dem Normalfall auch eine fehlende Quelle, widersprüchliche Ergebnisse, doppelte Ausführung und den Ausfall einer Rolle durch. Halten Sie fest, wer übernimmt und wann der Ablauf stoppt.

Die Einsatzkarte oben bietet Platz für Aufgabe, Wissen, Befugnisse und Prüffälle. Der Beitrag [KI-Fehler früh erkennen](/blog/haeufige-ki-fehler-vermeiden) ergänzt die Kontrolle. Für die Einordnung vorhandener Werkzeuge hilft [eigener Agent oder vorhandene KI](/blog/eigene-ki-agenten-vs-chatgpt).

## Wie unterstützt AgenticIT?

Wir beginnen mit Aufgabe, vorhandenen Tools und Abnahme. Danach planen wir passende [KI-Anwendungen](/loesungen/ki-entwicklung) oder [Prozessautomatisierungen](/loesungen/prozessautomatisierung). Die verlinkte Ablauf-Demo zeigt Vorbereitung, Freigabe und persönliche Übernahme anhand vorgegebener Inhalte.
