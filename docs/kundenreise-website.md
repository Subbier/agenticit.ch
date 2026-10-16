# Website und Kundenreise

Die neue Hauptstrecke verbindet eine konkrete Herausforderung mit einer kostenlosen Ersthilfe, einem begrenzten Pilot und einem persönlichen Folgegespräch. Preise werden vor einem Auftrag individuell festgelegt.

## Seiten

- `/`: Einstieg, sieben Herausforderungen, Kundenreise, Testpakete und Fragen.
- `/werkzeuge`: Übersicht der Checks und Vorlagen; bestehender Branchen-Radar mit seinem ausgewiesenen Datenstand.
- `/kundenreise-check`: drei Fragen, direkt sichtbares Ergebnis, speicherbare Vorlage und freiwillige Kontaktaufnahme.
- `/automatisierungs-check`: Branchen wählen, manuelle Aufgaben markieren und Aufwand sowie geplanten Automatisierungsanteil eintragen. Gewichtete Zeitrechnung und optionaler Zeitwert in CHF mit Download und freiwilliger Anfrage.
- `/pakete`: Umfang, Voraussetzungen und Messung der drei Testpakete.
- `/zusammenarbeit`: Diagnose, Auftrag, Kundenstart, Pilot und Abschluss beziehungsweise Betreuung.

Bestehende Fachseiten, rechtliche Seiten und APIs bleiben erreichbar. Die Hauptstrecke verwendet einen abgegrenzten hellen Stil. Es wurden keine zusätzlichen Production-Abhängigkeiten eingeführt.

## Ergebnisse und Anfrage

`lib/journey.ts` enthält die sieben Themen, Paketzuordnung, Vorlagen und Berechnung. Der neue Digitalisierungs-Fahrplan hilft bei der Übersicht über Systeme, externe Partner und Verantwortlichkeiten. Die Selbsteinschätzung prüft keine Systeme und behauptet keine messbaren Kundenergebnisse.

`lib/automation.ts` enthält den Aufgabenkatalog und die Berechnung. Die Aufgaben sind redaktionelle Beispiele, keine gemessenen Branchenbenchmarks. Mehrere Branchen ergeben eine deduplizierte Aufgabenliste. Beispielwerte von 10 Vorgängen, 15 Minuten und 50 Prozent sind veränderbare Planungsannahmen. Freie Stunden = Summe aus Vorgängen × Minuten × Zielanteil / 60. Der Automatisierungsgrad ist nach Zeitaufwand gewichtet und gilt nur für die ausgewählten Aufgaben. Monat = Woche × 52 / 12. Der optionale CHF-Wert bewertet Kapazität mit dem eingegebenen internen Stundensatz; er ist keine bestätigte Kostenersparnis. Projekt-, Software- und Betriebskosten werden nicht abgezogen. Die Kontaktübergabe berechnet den Plan auf dem Server erneut und fordert eine persönliche Prüfung an.

Der Branchen-Radar erlaubt mehrere Branchen und Regionen. Regionen werden über ihre bisherigen Schätzanteile zusammengefasst; Branchen werden wegen möglicher Keyword-Überschneidungen einzeln angezeigt. Regionale Anbieterlisten bleiben nach Branche und Region getrennt. Datenstand Juli 2026 wurde nicht neu erhoben.

Fachliche Quellen für die Aufgabenbeispiele: [Zoho Workflow-Aufgaben](https://help.zoho.com/portal/en/kb/crm/automate-business-processes/actions/articles/workflow-tasks), [Microsoft Dokumentfreigaben](https://learn.microsoft.com/en-us/power-automate/modern-approvals), [Zoho Immobilienprozesse](https://www.zoho.com/crm/verticals/real-estate/). Daraus werden keine Zeitquoten oder Einsparbenchmarks abgeleitet.

Ergebnisse und Downloads sind ohne Kontaktdaten verfügbar. Das Kontaktformular fragt Name, E-Mail und Unternehmen ab. Eine Telefonnummer wird nur für einen gewünschten Rückruf benötigt. Die Zustimmung gilt für die konkrete Anfrage und meldet keinen Newsletter an.

`/api/leads` validiert die Antworten mit `lib/lead-intake.ts`. Für `journey-check` berechnet der Server die Paketzuordnung erneut. Der bestehende AgenticIT-Webhook erhält Thema, Antworten, Vorlage zur Besprechung, Tags und die Aufgabe «Kundenreise-Check persönlich prüfen». Es werden keine automatischen Verkaufsnachrichten versendet und keine Kalendertermine behauptet. Die tatsächliche Anlage und Zuordnung im CRM bleibt Aufgabe der bestehenden nachgelagerten Automation und muss dort separat geprüft werden.

Die notwendige Konfiguration heisst `LEADS_WEBHOOK_URL`. Werte bleiben ausschliesslich in der bestehenden geschützten Umgebung. Bei fehlender oder fehlerhafter Übergabe meldet die Website keinen Erfolg.

## Prüfung

- `npm run test:journey`: Varianten, Berechnung, Validierung, Kontextübergabe, bestehende Quellen und Fehlerbehandlung; externe Übergaben werden simuliert.
- `npm run test:automation`: branchenspezifische Aufgaben, Deduplizierung, Zeitgewichtung, CHF-Rechnung, ungültige Eingaben und serverseitige Ableitung.
- `npm run test:radar`: Mehrfachauswahl von Branchen und Regionen sowie regionale Schätzanteile.
- `npm run lint`: TypeScript-Prüfung des Projekts.
- `npm run build`: produktionsfähiger Next.js-Build.
- `scripts/mock-journey-delivery.cjs`: ausschliesslich lokaler Browser-Testempfänger. Akzeptiert nur die reservierte Domain `example.invalid`, leitet nichts weiter und protokolliert keine Kontaktdaten. Niemals als produktiven Empfänger konfigurieren.

Der lokale Browser-Funktionstest führte eine Anfrage bis zur Erfolgsanzeige und zur einmaligen Annahme am Testempfänger. Das belegt den kontrollierten technischen Weg; es belegt keinen echten CRM-Eingang. Desktop, mobile Ansicht, Rechner, Download und Tastaturbedienung der Kundenreise wurden geprüft.

Der vorhandene Test `scripts/test-finmacl.cjs` schlägt am unveränderten Ausgangsstand mit `11 !== 15` fehl. Die zugehörige FINMA-Checkliste gehört nicht zur neuen Kundenreise-Strecke und wurde nicht verändert.
