# Unbenutzte Komponenten erzeugen keine Startseiten-Styles

Stand: 18. Oktober 2026. Produkt e4ff23f. Bestehende Quellenprüfung gezielt erweitert, keine Dateien gelöscht oder verschoben.

## Konkreter Befund

Der installierte Tailwind-Scanner und Compiler wurden mit dem vorhandenen statischen Importprüfer und dem getesteten CSS-Selektorleser ausgewertet. 76 App-Einstiege erreichen 199 lokale Dateien. Von 91 weiterhin gescannten, nicht eingebundenen Komponentendateien tragen 79 tatsächlich erzeugte CSS-Klassen bei. Besonders grosse Einzelbeiträge stammen aus ungenutzter Seitenleiste, Navigation, Analysebereich und Zeitleiste. Das ist ein neuer gemessener Quellenbefund; der globale Inline-Versuch bleibt verworfen.

Diese 79 Dateien sind nun einzeln per @source not benannt. Die 28 früher ausgeschlossenen Dateien bleiben erhalten. Die automatische Erkennung neuer Quellen bleibt aktiv. Vor jedem Produktionsbuild prüft derselbe vorhandene Import-Guard alle Ausschlüsse. Wird eine ausgeschlossene Datei wieder eingebunden, muss ihr Ausschluss vor einem erfolgreichen Build entfernt werden. Literalimporte, Re-Exports, lazy imports, CommonJS und ImportEquals werden verfolgt; unklare dynamische Pfade werden abgewiesen. Keine neue Production-Dependency.

## Tatsächliche Auslieferung vor Veröffentlichung

| Messung                    | Vorher öffentlich | Nachher lokaler Produktionsbuild |
| -------------------------- | ----------------: | -------------------------------: |
| Startseiten-Stylesheets    |                 3 |                                2 |
| CSS vor Komprimierung      |     255'894 Bytes |                    140'052 Bytes |
| Identisch berechnetes gzip |      41'344 Bytes |                     24'941 Bytes |

Rund 45,3 Prozent weniger CSS vor Komprimierung und 39,7 Prozent weniger bei derselben gzip-Berechnung. gzip ist hier eine Vergleichsrechnung, kein gemessener Netztransfer. Der separate Compiler-Vergleich vor Minifizierung ist ebenfalls keine Produktionsgrösse und wird nicht mit dieser Tabelle vermischt. Keine neue Ladezeitwirkung vor einer Nachmessung behauptet.

Der verschärfte Budgettest scheiterte vor der Korrektur bei 255'895 lokalen CSS-Bytes. Neue Grenzen: 200'000 Bytes roh und 35'000 identisch berechnete gzip-Bytes. Nachher bestehen 439 kombinierte Tests in 57 Dateien, ohne test-leads-Tests. Darunter CSS-Abdeckung aller kanonischen Seiten plus bestehender Sonderansichten, Budgets, Formulare und reine Mock-Übergaben. Produktionsbuild, separate TypeScript-Prüfung, Formatter und Diff-Prüfung erfolgreich.

Zwölf bestätigte Vorher-/Nachher-Ansichten: Startseite, Marketing-Setup-Check, Automatisierungs-Check, Kontakt, Website-Kostenratgeber und Excellence bei 390/1280 Pixeln. Erfasste Texte, Schriften, Farben, Feldgrenzen und Abmessungen identisch; kein Seitenüberlauf. Absolute y-Werte einschliesslich Scrollposition verglichen. Vier zusätzliche lokale Ansichten von Startseite und Marketing-Check bei 320/768 ohne Seitenüberlauf.

Interaktiv lokal: alle drei Hero-Bereiche, mobiles Menü und Servicewechsel, fünf Marketing-Fragen, Ergebnis, Angabenübersicht und freiwilliger Kontaktbereich. Menü verschiebt den Inhalt um 284 Pixel und schliesst nach Navigation. Kontaktfelder bleiben leer, Einwilligung ungekreuzt. Fokus landet auf dem benannten Kontaktcontainer; dieser hat keine id, deshalb bedeutet eine leere activeId hier keinen Fokusverlust. Kein Download wiederholt und kein Formular gesendet.

## Veröffentlichung

Produktcommit e4ff23f2efb1a16b9441a9639b8e3fabbb4ce1fd gepusht. Veröffentlichung und öffentliche Abnahme separat nachweisen; Build-Erfolg allein ist kein Live-Nachweis. Die erste Connector-Anfrage scheiterte vor Ausführung an der fehlenden requestBody-Hülle. Mit korrigierter Struktur genau ein Deployment erstellt: dpl_77xFwEDRFBpWm8yMsFnUMVKFU23F, v1-main-fnrrrpm11-gntc.vercel.app. Team und Projekt vorab direkt bestätigt. Keine Änderung von Umgebungsvariablen oder Hostingzusagen.

Das Deployment ist READY für exakt diesen SHA. Anschliessende Domain-Abfrage bestätigt agenticit.ch und www.agenticit.ch am richtigen Projekt. Öffentliche Auslieferung: zwei Stylesheets, 140'051 Bytes roh und 24'939 identisch berechnete gzip-Bytes. Eine Byte-Differenz zum lokalen Build ist kein behaupteter Hash-Gleichstand; die erfasste Darstellung stimmt überein. Alle 439 kombinierten Prüfungen in 57 Dateien auch mit öffentlicher GET-Basis bestanden.

Zwölf öffentliche Ansichten bei 390/1280 plus vier bei 320/768 stimmen mit den lokalen Messwerten überein. Einmal zeigte der Browser beim Kostenratgeber 1326 statt angeforderter 1280 Pixel; dieser Wert wurde nicht gewertet. Override nach der Navigation erneut direkt am selben Tab gesetzt und tatsächliche 1280 bestätigt. Elf öffentliche Interaktionsfälle einschliesslich aller Hero-Bereiche, Menü-/Servicewechsel, fünf Marketing-Fragen und leerem Kontaktformular bestehen. Kein echter Versand. Lokales und öffentliches Kontaktbild visuell gelesen.

## Mobile Nachmessung

[PageSpeed-Bericht](https://pagespeed.web.dev/analysis/https-agenticit-ch/g9fav1x3r5?form_factor=mobile), 18.10.2026, 03:21 MESZ. Nach bestätigter Veröffentlichung genau einmal im bisherigen Profil gestartet: Moto G Power, langsames 4G, erster Seitenaufbau, Lighthouse 13.5.0.

| Messwert    | Vorher, 02:55 | Nachher, 03:21 |
| ----------- | ------------: | -------------: |
| Leistung    |            94 |             96 |
| FCP         |       1351 ms |        1051 ms |
| LCP         |       3001 ms |        2701 ms |
| TBT         |         27 ms |           0 ms |
| CLS         |             0 |              0 |
| Speed Index |       2856 ms |        2106 ms |

Google meldet 29,5 statt 47,5 KiB für blockierende Styles, geschätztes verbleibendes Potenzial 450 statt 590 ms. LCP bleibt der Hero-Absatz; Breakdown: 10 ms TTFB und 970 ms Renderingverzögerung. Diese Teilwerte sind nicht der simulierte Gesamt-LCP. Zwei einzelne Laborläufe, keine CrUX-Felddaten und kein isolierter Kausalbeweis oder belegter Conversioneffekt. Ziel von 2,5 Sekunden und echte Feldmessung bleiben offen. Keine weitere unveränderte Messung gestartet.

Eigener Prüfserver beendet, Port 3105 ohne Listener. Dabei erneut der bereits zuvor dokumentierte NoFallbackError gesehen; Ursache bleibt ungeklärt, 404- und Canonical-Prüfungen bestehen. Temporären Ziel-Tab-Override entfernt und beide eigenen Prüf-Tabs geschlossen; Abschlussnachweis separat. Keine vollständige Laufzeit-/Barrierefreiheitsabnahme aus den bestandenen Prüfungen ableiten.

Nachweise css-source-\* unter Umsetzung-2026-10-18/Nachweise in der zentralen OneDrive-Ablage. Analyse nur auf dem bestehenden Repository, ohne Import oder Ausführung von Geschäfts-Endpunkten. Keine echten Leads, CRM-Schreibaktionen, Nachrichten, Telefonie, Kalender- oder Messkonfiguration. Ausstehende CRM-Freigabe nicht übergangen.
