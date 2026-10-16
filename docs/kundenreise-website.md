# Website und Kundenreise

Die neue Hauptstrecke verbindet eine konkrete Herausforderung mit einer kostenlosen Ersthilfe, einem begrenzten Pilot und einem persönlichen Folgegespräch. Preise werden vor einem Auftrag individuell festgelegt.

## Seiten

- `/`: Einstieg, sechs Herausforderungen, Kundenreise, Testpakete und Fragen.
- `/werkzeuge`: Übersicht der Checks und Vorlagen; bestehender Branchen-Radar mit seinem ausgewiesenen Datenstand.
- `/kundenreise-check`: drei Fragen, direkt sichtbares Ergebnis, speicherbare Vorlage und freiwillige Kontaktaufnahme.
- `/pakete`: Umfang, Voraussetzungen und Messung der drei Testpakete.
- `/zusammenarbeit`: Diagnose, Auftrag, Kundenstart, Pilot und Abschluss beziehungsweise Betreuung.

Bestehende Fachseiten, rechtliche Seiten und APIs bleiben erreichbar. Die Hauptstrecke verwendet einen abgegrenzten hellen Stil. Es wurden keine zusätzlichen Production-Abhängigkeiten eingeführt.

## Ergebnisse und Anfrage

`lib/journey.ts` enthält die sechs Themen, Paketzuordnung, Vorlagen und Berechnung. Die Selbsteinschätzung prüft keine Systeme und behauptet keine messbaren Kundenergebnisse. Der Zeitrechner verwendet aktuelle und geschätzte künftige Bearbeitungszeiten; er rechnet Kapazität, keinen Gewinn.

Ergebnisse und Downloads sind ohne Kontaktdaten verfügbar. Das Kontaktformular fragt Name, E-Mail und Unternehmen ab. Eine Telefonnummer wird nur für einen gewünschten Rückruf benötigt. Die Zustimmung gilt für die konkrete Anfrage und meldet keinen Newsletter an.

`/api/leads` validiert die Antworten mit `lib/lead-intake.ts`. Für `journey-check` berechnet der Server die Paketzuordnung erneut. Der bestehende AgenticIT-Webhook erhält Thema, Antworten, Vorlage zur Besprechung, Tags und die Aufgabe «Kundenreise-Check persönlich prüfen». Es werden keine automatischen Verkaufsnachrichten versendet und keine Kalendertermine behauptet. Die tatsächliche Anlage und Zuordnung im CRM bleibt Aufgabe der bestehenden nachgelagerten Automation und muss dort separat geprüft werden.

Die notwendige Konfiguration heisst `LEADS_WEBHOOK_URL`. Werte bleiben ausschliesslich in der bestehenden geschützten Umgebung. Bei fehlender oder fehlerhafter Übergabe meldet die Website keinen Erfolg.

## Prüfung

- `npm run test:journey`: Varianten, Berechnung, Validierung, Kontextübergabe, bestehende Quellen und Fehlerbehandlung; externe Übergaben werden simuliert.
- `npm run lint`: TypeScript-Prüfung des Projekts.
- `npm run build`: produktionsfähiger Next.js-Build.
- `scripts/mock-journey-delivery.cjs`: ausschliesslich lokaler Browser-Testempfänger. Akzeptiert nur die reservierte Domain `example.invalid`, leitet nichts weiter und protokolliert keine Kontaktdaten. Niemals als produktiven Empfänger konfigurieren.

Der lokale Browser-Funktionstest führte eine Anfrage bis zur Erfolgsanzeige und zur einmaligen Annahme am Testempfänger. Das belegt den kontrollierten technischen Weg; es belegt keinen echten CRM-Eingang. Desktop, mobile Ansicht, Rechner, Download und Tastaturbedienung der Kundenreise wurden geprüft.

Der vorhandene Test `scripts/test-finmacl.cjs` schlägt am unveränderten Ausgangsstand mit `11 !== 15` fehl. Die zugehörige FINMA-Checkliste gehört nicht zur neuen Kundenreise-Strecke und wurde nicht verändert.
