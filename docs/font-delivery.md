# Schriften gezielt laden

Stand: 17. Oktober 2026.

Die Startseite verwendet Inter, Space Grotesk und JetBrains Mono. Geist Mono wurde bisher zusätzlich vorgeladen, obwohl kein sichtbarer Text der geprüften Startseite diese Schrift verwendet. Sie bleibt für andere Ansichten verfügbar, lädt aber erst bei tatsächlicher Verwendung. Datei, Gewicht, Fallbacks und CSS-Variable bleiben erhalten. Keine neue Abhängigkeit.

## Nachweis vor Veröffentlichung

| Messung | Vorher öffentlich | Nachher lokaler Produktionsbuild |
| --- | --- | --- |
| Sofort vorgeladene Schriftdateien | 4 | 3 |
| Summe der Schriftdateien | 173096 Bytes | 102092 Bytes |
| Geist Mono | 71004 Bytes sofort | bei Bedarf |

Das sind 71004 Bytes weniger in den vorgeladenen Schriftdateien, keine Aussage über die gesamte Ladezeit. Die drei verbleibenden Dateien und die später verfügbare Geist-Mono-Datei sind bytegleich mit dem Ausgangsstand.

Die neue Budgetprüfung schlägt gegen den vorherigen öffentlichen Stand mit vier Schriften fehl. Nach der Änderung bestehen 225 passende Prüfungen am lokalen Produktionsbuild, TypeScript, Formatter und Build. Mobile Schriftfamilien, Grössen, Gewichte, Farben und Positionen von Marke, H1, Hero-Absatz und Hauptaktion stimmen bei 390 Pixeln mit der Ausgangsmessung überein. Startseite bei 320, 390, 768 und 1280 Pixeln ohne seitlichen Überlauf. Leistungsseite und Tastaturweg zum Marketing-Check zusätzlich geprüft.

## Verbleibende Performance-Arbeit

Eine Eingrenzung der Tailwind-Quellensuche brachte keine kleinere CSS-Datei. Experimentelles CSS-Chunking im Graph-Modus reduzierte CSS etwas, erzeugte jedoch mehr Ladeanfragen. Beide Versuche wurden vor Veröffentlichung zurückgenommen. CSS-Auslieferung und echte Feldmessung bleiben offen.

Frische öffentliche Ausgangsmessung: [PageSpeed Mobile](https://pagespeed.web.dev/analysis/https-agenticit-ch/l0gqsh7vbi?form_factor=mobile), 17.10.2026, 04:21:42. Leistung 91, LCP 3451 ms, FCP 1351 ms, TBT 22 ms und CLS 0. Einzelner Laborlauf ohne CrUX-Felddaten; kein Ranking- oder Geschäftsergebnis. Eine Nachmessung erfolgt erst nach bestätigter Veröffentlichung.

Die Messdateien liegen in der zentralen OneDrive-Projektablage unter `Umsetzung-2026-10-17/Nachweise`, insbesondere `fonts-delivery-after-local.json`, `fonts-deferred-tests-local.txt`, `fonts-visual-after-local.json` und `styles-pagespeed-before.txt`.
