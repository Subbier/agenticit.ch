# Automatisierungs-Check

## Berechnung und Versionen

Die öffentliche Seite `/automatisierungs-check` verwendet Version 2. Die Berechnung in `lib/automation.ts` läuft im Browser und wird für eine Anfrage auf dem Server erneut ausgeführt. Ergebnisse aus dem Browser werden nicht als vertrauenswürdiger Geld- oder Zeitwert übernommen.

- Version 1 bleibt für bereits geöffnete oder bestehende Clients gültig. Ihr Prozentwert beschreibt den Netto-Zielanteil inklusive bereits eingerechneter Kontrolle.
- Version 2 verwendet einen Brutto-Zielanteil `automationPercent` und zusätzlich `controlMinutes` je Vorgang. Die bisherige restliche Handarbeit bleibt erhalten.
- Zeitgewinn je Aufgabe in Minuten: `weeklyCount * minutes * automationPercent / 100 - weeklyCount * controlMinutes`.
- Bei einem Zielanteil von 0 % läuft keine Automatisierung und kein zusätzlicher Kontrollschritt. Die Kontrollzeit wird dann nicht als neue Arbeit angesetzt.
- Ein negatives Ergebnis bleibt negativ und erscheint als Mehraufwand. Es wird nicht auf einen vermeintlichen Zeitgewinn von 0 begrenzt.
- Unter einer Stunde werden Minuten angezeigt, damit kleine positive oder negative Werte nicht als 0 Stunden erscheinen. Ergebniswerte sind gerundet.
- Der Automatisierungsanteil ist nach dem heutigen Zeitaufwand gewichtet. Er ist keine technische Machbarkeitsprüfung und kein Reifegrad des ganzen Unternehmens.

Der vorsichtige Vergleich rechnet mit 75 % des eingegebenen Zielanteils und unveränderter Kontrollzeit. Beispiel: 80 % werden zu 60 %. Das ist eine andere Annahme, keine Prognose und keine Erfolgswahrscheinlichkeit.

Monatlicher Zeitwert: Netto-Wochenstunden × 52 / 12 × interner Stundensatz. Das ist keine automatisch eingesparte Ausgabe. Einrichtungs-, Software- und Betriebskosten sind nicht abgezogen. Ohne Stundensatz wird kein CHF-Wert erzeugt.

## Anfrage und Freigabe

Der Check und sein Textdownload benötigen keine Kontaktangaben. Erst die separate Kontaktstufe kann eine Anfrage an `/api/leads` senden. Sie übernimmt die gewählten Branchen, Aufgaben und Kontrollwerte. Eingabeänderungen schliessen die Kontaktstufe, damit ein neuer Rechenstand bewusst übernommen wird.

`lib/lead-intake.ts` validiert beide Versionen, berechnet den Plan erneut und fordert eine persönliche Prüfung an. Marketing-Einwilligung wird nicht unterstellt. Die vorhandene Weiterleitung bleibt unverändert. Die Tests ersetzen diese Weiterleitung durch einen Mock; sie beweisen keinen echten Zoho-CRM-Eingang.

## Prüfung und Pflege

- Unit- und Mock-Prüfung: `npm run test:automation` und `npm run test:journey`.
- Gerenderte Prüfungen benötigen den lokalen Produktionsserver auf Port 3105; `SITE_TEST_BASE_URL` kann auf die öffentliche Domain gesetzt werden. Die Sitemap-, Service-, Vorschau- und Ressourcenprüfungen senden nur GET-Anfragen.
- Mit echten Browseraktionen bei 320, 390, 768 und 1280 Pixeln prüfen. Positive Rechnung, negativer Zeitgewinn, fehlende Kontrollzeit, Download, aufklappbare Details und Kontaktstufe berücksichtigen.
- Keine ungefragten Live-Testleads oder Anrufe auslösen. Ein echter CRM-Eingang bleibt ein separater Nachweis.
- Bei einer wesentlichen Inhaltsänderung das belegte Datum für `/automatisierungs-check` in `lib/sitemap-content-dates.ts` pflegen. Kein Build-Datum als Inhaltsänderung verwenden.
