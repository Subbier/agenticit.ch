# Schriften gezielt laden

Stand: 17. Oktober 2026.

Die Startseite verwendet Inter, Space Grotesk und JetBrains Mono. Geist Mono wurde bisher zusätzlich vorgeladen, obwohl kein sichtbarer Text der geprüften Startseite diese Schrift verwendet. Sie bleibt für andere Ansichten verfügbar, lädt aber erst bei tatsächlicher Verwendung. Datei, Gewicht, Fallbacks und CSS-Variable bleiben erhalten. Keine neue Abhängigkeit.

## Nachweis vor Veröffentlichung

| Messung                           | Vorher öffentlich  | Nachher lokaler Produktionsbuild |
| --------------------------------- | ------------------ | -------------------------------- |
| Sofort vorgeladene Schriftdateien | 4                  | 3                                |
| Summe der Schriftdateien          | 173096 Bytes       | 102092 Bytes                     |
| Geist Mono                        | 71004 Bytes sofort | bei Bedarf                       |

Das sind 71004 Bytes weniger in den vorgeladenen Schriftdateien, keine Aussage über die gesamte Ladezeit. Die drei verbleibenden Dateien und die später verfügbare Geist-Mono-Datei sind bytegleich mit dem Ausgangsstand.

Die neue Budgetprüfung schlägt gegen den vorherigen öffentlichen Stand mit vier Schriften fehl. Nach der Änderung bestehen 225 passende Prüfungen am lokalen Produktionsbuild, TypeScript, Formatter und Build. Mobile Schriftfamilien, Grössen, Gewichte, Farben und Positionen von Marke, H1, Hero-Absatz und Hauptaktion stimmen bei 390 Pixeln mit der Ausgangsmessung überein. Startseite bei 320, 390, 768 und 1280 Pixeln ohne seitlichen Überlauf. Leistungsseite und Tastaturweg zum Marketing-Check zusätzlich geprüft.

## Verbleibende Performance-Arbeit

Eine Eingrenzung der Tailwind-Quellensuche brachte keine kleinere CSS-Datei. Experimentelles CSS-Chunking im Graph-Modus reduzierte CSS etwas, erzeugte jedoch mehr Ladeanfragen. Beide Versuche wurden vor Veröffentlichung zurückgenommen. CSS-Auslieferung und echte Feldmessung bleiben offen.

Frische öffentliche Ausgangsmessung: [PageSpeed Mobile](https://pagespeed.web.dev/analysis/https-agenticit-ch/l0gqsh7vbi?form_factor=mobile), 17.10.2026, 04:21:42. Leistung 91, LCP 3451 ms, FCP 1351 ms, TBT 22 ms und CLS 0. Einzelner Laborlauf ohne CrUX-Felddaten; kein Ranking- oder Geschäftsergebnis. Eine Nachmessung erfolgt erst nach bestätigter Veröffentlichung.

Die Messdateien liegen in der zentralen OneDrive-Projektablage unter `Umsetzung-2026-10-17/Nachweise`, insbesondere `fonts-delivery-after-local.json`, `fonts-deferred-tests-local.txt`, `fonts-visual-after-local.json` und `styles-pagespeed-before.txt`.

## Veröffentlichung und Nachmessung

Produktcommit `232ac2b3b5a4a50c3054913a8f801240dbe17e8f` ist gepusht. Produktionsdeployment `dpl_7np67mPgPPf6HfQGWJpH34qcERJy` meldet READY mit genau diesem Stand und der Zuordnung zu `agenticit.ch`. Öffentliche Abfragen bestätigen drei vorgeladene Schriften mit insgesamt 102092 Bytes. Alle drei Hashes stimmen mit der Ausgangsmessung überein. Die bei Bedarf verfügbare Geist-Mono-Datei ist öffentlich bytegleich mit der bestehenden lokalen Originaldatei.

Elf gezielte Unit-/öffentliche GET-Prüfungen nach Veröffentlichung bestanden, einschliesslich aller 77 kanonischen Sitemap-Ziele. Die mobile Live-Ansicht bei 390 Pixeln bestätigt dieselben geprüften Schriften, Farben und Positionen wie vor der Änderung sowie keinen seitlichen Überlauf. Kein Formular versendet, kein CRM-Eintrag und kein Anruf.

Nachmessung [PageSpeed Mobile](https://pagespeed.web.dev/analysis/https-agenticit-ch/cqbaotj2j6?form_factor=mobile), 17.10.2026, 04:37:59, mit demselben sichtbaren Profil (Moto G Power, langsames 4G, erster Seitenaufbau, Lighthouse 13.5):

| Messwert    | Vorher  | Nachher |
| ----------- | ------- | ------- |
| Leistung    | 91      | 92      |
| FCP         | 1351 ms | 1351 ms |
| LCP         | 3451 ms | 3301 ms |
| TBT         | 22 ms   | 45 ms   |
| CLS         | 0       | 0       |
| Speed Index | 2843 ms | 2027 ms |

Automatische Prüfwerte für Barrierefreiheit, Best Practices und SEO jeweils 100. Kein vollständiger manueller Barrierefreiheitsnachweis. Zwei einzelne Laborläufe mit Schwankungen: LCP und Speed Index günstiger, TBT höher; kein isolierter Kausalbeweis. Weiterhin keine CrUX-Felddaten. CSS-Blockierung (geschätzte 570 ms) bleibt offen. Die Schriftänderung wird aufgrund des eindeutig vermiedenen Downloads und der unveränderten Darstellung übernommen, nicht aufgrund eines garantierten Score-Gewinns.

## Erneute Eingrenzung am 18. Oktober 2026

Nach der veröffentlichten CSS-Quellenbereinigung mit Produktcommit `e4ff23f2efb1a16b9441a9639b8e3fabbb4ce1fd` wurde der verbleibende Ladepfad lesend geprüft. Die bestehende Messung vom 18.10., 03:21 MESZ, bleibt massgeblich: [PageSpeed Mobile](https://pagespeed.web.dev/analysis/https-agenticit-ch/g9fav1x3r5?form_factor=mobile), Leistung 96, LCP 2701 ms. Kein neuer Messlauf, Build oder Produktrelease in dieser Prüfung.

| Vorgeladene Schrift | Öffentlich gelieferte Bytes | Beobachtetes Beispiel im Hero |
| ------------------- | --------------------------- | ----------------------------- |
| Inter               | 48432                       | Einleitender Absatz, 17 px    |
| Space Grotesk       | 22320                       | Hauptüberschrift, rund 61 px  |
| JetBrains Mono      | 31340                       | Bereichszähler, 12 px         |

Alle drei Dateien antworteten mit HTTP 200 und verwenden `font-display: swap`. Insgesamt weiterhin 102092 Bytes. Die berechneten Schriftfamilien der bekannten sichtbaren Hero-Elemente wurden bei 1326 × 1398 Pixeln gelesen; der Fontstatus war `loaded`. Das ist eine gezielte Stichprobe. Native Video-Ersatztexte und abgeschnittene Live-Texte aus der breiteren DOM-Abfrage zählen ausdrücklich nicht als sichtbare Schriftverwendung.

Der aufgeklappte Netzwerkabhängigkeitsbaum desselben abgeschlossenen PageSpeed-Berichts zeigt die Navigation und zwei CSS-Dateien: Navigation 582 ms / 21,75 KiB, CSS 861 ms / 17,54 KiB und 888 ms / 11,99 KiB. Die maximale gemeldete kritische Pfadlatenz beträgt 888 ms. Google nennt keinen weiteren geeigneten Ursprung für eine Vorverbindung.

Die fehlende Auflistung von Schriften in diesem Baum beweist keine fehlende Wirkung auf LCP. Netzwerkzeiten und simulierter LCP werden nicht voneinander abgezogen. Alle verbleibenden Preloads haben einen beobachteten Verwendungszweck im Hero; der Bericht liefert keinen neuen Befund für eine weitere Schrift- oder Preconnect-Änderung. Deshalb keine Konfiguration auf Verdacht geändert. LCP bis 2,5 s und reale Felddaten bleiben offen.

Nachweise in `Umsetzung-2026-10-18/Nachweise`: `font-critical-assets.json`, `font-critical-dependency-tree.txt` und `font-critical-selected-usage.json`. Beide eigenen Prüftabs geschlossen, keine Emulation gesetzt. Keine echte Anfrage oder sonstige Geschäftsaktion.
