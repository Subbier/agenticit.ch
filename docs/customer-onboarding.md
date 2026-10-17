# Projektstart und Kunden-Onboarding

Stand: 17. Oktober 2026. D05 des Website-Schlachtplans.

## Öffentliches Vorgehen

Die bestehende Seite `/zusammenarbeit` erklärt den Weg von einer konkreten Aufgabe über Auftrag, Vorbereitung und gemeinsame Prüfung bis zur Übergabe. Jede Phase hat ein sichtbares Ergebnis und aufklappbare Klärungspunkte. Direkter Kontakt und eine frei nutzbare Textvorlage ersetzen einen weiteren Fragebogen. Der vorhandene Kundenreise-Check verlinkt dieselbe Vorlage im Onboarding-Ergebnis.

Das ist das beschriebene Arbeitsmodell und eine nutzbare Vorbereitung. Es ist keine bereits automatisierte CRM-Provisionierung, kein unterschriebener Auftrag und kein Nachweis, dass ein echtes Kundenprojekt diese Schritte durchlaufen hat. Ausgefüllte Vorlagen werden nicht automatisch übertragen.

## Interner Ablauf je tatsächlich beauftragtem Projekt

| Übergang                             | Verantwortlich                             | Benötigter Nachweis                                                                                                                            |
| ------------------------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Anfrage persönlich einordnen         | Business mit fachlicher Unterstützung      | Bedarf, Ansprechpartner, bestehende Zusagen und nächster vereinbarter Schritt                                                                  |
| Angebot und Auftrag abgleichen       | Business mit Technologie                   | Umfang, Kosten, Voraussetzungen, Mitwirkung und Abnahmekriterien bestätigt                                                                     |
| Bestehenden CRM-Vorgang weiterführen | Zuständige Person im richtigen Kundenkonto | Nach der Kundenentscheidung Kontakt, Deal und Verantwortung am bestehenden Vorgang nachvollziehbar; keine Dubletten oder unbestätigten Zusagen |
| Arbeitsstart freigeben               | Projektverantwortliche beider Seiten       | Unterlagen, benötigte Rechte, Datenwege und erster Arbeitsschritt geklärt                                                                      |
| Umsetzung und Test                   | Technologie mit Fachteam                   | Freigegebene Testfälle, Soll-/Ist-Ergebnis und menschliche Übernahme belegt                                                                    |
| Abnahme und Betrieb übergeben        | Freigabeverantwortliche mit Projektteam    | Abnahmeentscheidung, offene Punkte, Dokumentation, Einweisung und Betriebszuständigkeit festgehalten                                           |

Für jede offene Voraussetzung eine verantwortliche Person und einen Termin festhalten. Fehlende Startvoraussetzungen sichtbar klären. Zusätzlicher Umfang wird vor Umsetzung mit Auswirkungen auf Kosten und Termine abgestimmt. Keine automatische Annahme oder Kontaktfolge aus einem Download ableiten. Die beschriebenen externen CRM-Schritte wurden im Website-Auftrag nicht ausgeführt.

## Zugriffe und Betreuung

Nur benötigte Rollen über passende Einladungen bereitstellen. Keine Passwörter, geheimen Schlüssel oder Kundendaten in der Vorlage. Beteiligte Dienste und Speicherorte projektspezifisch prüfen; keine pauschale Schweizer Hostingzusage aus dem Ablaufplan ableiten. Nach Abschluss nicht mehr benötigte Rechte entfernen. Betreuung, Reaktionszeiten, Betrieb und gegebenenfalls Wiederherstellung separat vereinbaren.

Grundlage für diese eigene Arbeitsstruktur sind die bestehenden AgenticIT-Projektregeln und die [BACS-Empfehlungen zur Zusammenarbeit mit IT-Dienstleistern](https://www.bacs.admin.ch/de/empfehlungen-fuer-die-zusammenarbeit-mit-it-providern), am 17.10.2026 gelesen. Die Quelle betont unter anderem klare Zuständigkeiten, Datenstandorte und vereinbarte Prüfungen. Daraus wird keine Zertifizierung oder vollständige Sicherheits-/Rechtsprüfung von AgenticIT abgeleitet.

## Abnahme dieser Website-Etappe

Vier neue Prüfungen zeigen zunächst die fehlende Vorlage, fehlenden Seiteninhalte und den fehlenden Anschluss aus dem Onboarding-Plan. Nach Umsetzung sind Inhalts-/Byteprüfung, Produktionsbuild, TypeScript, Formatierung und Browseransichten zu prüfen. Veröffentlichung, echter Download und Zielseiten danach separat bestätigen. Kundenanfrage, CRM-Schreibaktion oder Testanruf sind dafür nicht erforderlich und werden nicht durchgeführt.

## Lokale Prüfergebnisse

Nach Umsetzung 241 passende Prüfungen am Produktionsbuild, TypeScript und Formatierung der neuen/geänderten Ansichten, Inhalte und Tests erfolgreich. Fünf Phasen mit nativen Details und vier übereinstimmenden FAQs; keine neue Production-Dependency und kein zusätzliches Formular. Acht geschlossene/geöffnete Ansichten bei tatsächlich gemessenen 320, 390, 768 und 1280 Pixeln ohne Überlauf. Phasen und Kostenfrage per Enter geöffnet; Abschnittssprung, Dateiansicht und Kontaktweg samt Browser-Rückkehr mit korrekter Adresse und H1 geprüft. Hauptaktion 50 Pixel hoch; Download auf 320 Pixeln 66,8 Pixel hoch, ohne seitlichen Überlauf.

Dateiansicht und Download getrennt: normaler Dateilink bleibt `text/plain`; `?download=1` liefert denselben Inhalt als benannten Dateianhang. Der zusätzliche HTTP-Test war davor rot. Anschliessend sind Dateianhang, Originalbytes und die weiterhin lesbare Ansicht inklusive `?download=0` geprüft. Die Regel gilt nur für diese Vorlage; bestehende Sicherheitsheader bleiben erhalten.

Die Browserbeobachtung meldete beim Speichern innerhalb des Prüffensters weder im In-App-Browser noch in Chrome einen abgeschlossenen Download. Das belegt keinen endgültigen Browserfehler; eine erfolgreiche native Speicherung wird damit aber noch nicht behauptet. Keine Änderung der Browser-Download-Einstellungen oder Umgehung geschützter Browseransichten. Die direkte Dateiansicht und serverseitige Auslieferung sind geprüft. Eine abschliessende Speicherkontrolle auf der veröffentlichten Seite bleibt offen.
