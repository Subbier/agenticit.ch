# CSS-Auslieferung: lokaler Inline-Versuch

Prüfstand: 18. Oktober 2026. Ausgangspunkt f71b42f, Produktcode 85b7418. Versuch verworfen und Konfiguration vollständig zurückgesetzt; keine Veröffentlichung.

## Anlass und aktuelle Ausgangsmessung

Der [mobile Google-Bericht](https://pagespeed.web.dev/analysis/https-agenticit-ch/jipunascaz?form_factor=mobile) vom 18.10., 02:55 MESZ, ergibt Leistung 94, FCP 1351 ms, LCP 3001 ms, TBT 27 ms, CLS 0 und Speed Index 2856 ms. Profil: Moto G Power, langsames 4G, erster Seitenaufbau, Lighthouse 13.5.0. Keine CrUX-Felddaten. Die bisherigen 3076 ms stammen vom 17.10. und sind kein aktueller Messwert.

LCP bleibt der Hero-Absatz. Drei CSS-Anfragen, gemeldete Übertragungsgrösse zusammen 47,5 KiB und geschätztes Potenzial von 590 ms. Diese Schätzung ist kein garantierter Geschwindigkeitsgewinn. Die Renderingverzögerung im Breakdown beträgt 1350 ms; sie ist ein anderer Messanteil als der simulierte Gesamt-LCP.

## Versuch und Abwägung

Installierte Next.js-16.3.3-Dokumentation zu inlineCss und cssChunking gelesen. Nur experimental.inlineCss=true zusätzlich zum vorhandenen graph-Verfahren lokal gesetzt. Der Produktionsbuild samt Importprüfung und TypeScript besteht. Keine neue Dependency, Versionsänderung oder Änderung von Inhalt, Formularen und Messkonfiguration.

Die drei CSS-Anfragen der Startseite entfallen, Styles stehen im HTML und zusätzlich im RSC-Payload. Die HTML-Antwort wächst stark. Tabelle: identische lokale gzip-Berechnung über HTML und referenzierte Stylesheets, keine gemessene Netzübertragung oder LCP-Nachmessung des Kandidaten.

| Einstieg               | Bisher HTML + CSS, gzip | Kandidat, gzip | Zunahme |
| ---------------------- | ----------------------: | -------------: | ------: |
| Startseite             |            64'712 Bytes |  147'625 Bytes | 128,1 % |
| Kundenreise-Check      |            50'812 Bytes |  133'165 Bytes | 162,1 % |
| Website-Kostenratgeber |            67'381 Bytes |  150'682 Bytes | 123,6 % |

Unkomprimiertes Startseiten-HTML wächst von 138'742 auf 918'834 Bytes. Die bisher getrennten Styles können unabhängig von vollständigen Dokumentabrufen im Browsercache bleiben. Laut Next gilt die Inline-Option global; bei Navigation zu vorgerenderten Seiten verwendet Next wiederum externe Styles. Deshalb keine pauschale Aussage über jeden Seitenwechsel oder tatsächliche Nutzerladezeit.

Die Variante wird wegen des deutlich höheren Datenvolumens nicht übernommen. Aus dem Entfall der CSS-Anfragen allein wird keine Beschleunigung behauptet. Konfiguration wieder identisch zum Ausgangsstand, ursprünglicher Produktionsbuild erneut hergestellt.

## Darstellungsprüfung und Grenzen

Sechs bestätigte Ansichten: Startseite, Kundenreise-Check und Kostenratgeber bei 390/1280 Pixeln. Schriften, Farben, Breiten und Höhen der erfassten Hauptüberschrift, ersten Absätze und Links stimmen überein; kein horizontaler Überlauf. Scrollabhängige y-Werte aus dem Vergleich ausgeschlossen. Erste mobile Kandidatenaufnahmen waren tatsächlich noch 1280 Pixel breit und sind verworfen; danach Ziel-Tab ausdrücklich auf 390 Pixel gesetzt und Breite vor Wertung bestätigt. Die Datei inline-css-home-candidate-390.png gehört zu diesem ungültigen ersten Durchlauf und ist kein Mobilnachweis.

Der verfügbare Browserkanal unterstützt PerformanceTimeline nicht. Kein direkter lokaler LCP daraus abgeleitet und kein Ersatz über nicht freigegebene Browsertechnik. PageSpeed wurde genau einmal für den unveränderten öffentlichen Stand gestartet. Ein erster Hilfsabruf las den Rechnerlink als Query statt als Fragment; die daraus entstandenen Nullwerte verworfen und vor Verwendung durch die tatsächlichen Linkwerte ersetzt. Daten und Bildschirmaufnahme stimmen mit 3001 ms LCP überein.

Nachweise inline-css-\* in der zugehörigen OneDrive-Ablage Umsetzung-2026-10-18/Nachweise. Der öffentliche Bericht und die lokale Konfiguration sind unterschiedliche Prüfobjekte. Dieser Versuch belegt keine neuen Rankings, Leads oder Kunden und keine Erfüllung des LCP-Ziels von 2,5 Sekunden. Ohne neue Ursacheninformation denselben globalen Inline-Versuch nicht wiederholen.

Nach Wiederherstellung bestehen 113 gezielte Unit-/GET-Prüfungen zu CSS-Abdeckung, Budgets, Schrift-/Bildauslieferung, aktuellem Design, Rechtsseiten, 404 und allen kanonischen Sitemap-Zielen. Produktionsbuild und separate TypeScript-Prüfung bestanden. Im Browser wieder drei Stylesheets und richtige Startseitenüberschrift bestätigt. Keine Formulare gesendet. Eigener Server beendet und Port 3105 ohne Listener; Ziel-Tab- und Viewport-Overrides entfernt, beide eigenen Prüf-Tabs geschlossen.

Grundlagen: installierte Dateien node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/inlineCss.md und cssChunking.md sowie [Google zur LCP-Optimierung](https://web.dev/articles/optimize-lcp). Browserprotokoll anhand der offiziellen [PerformanceTimeline-Definition](https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/domains/PerformanceTimeline.pdl) geprüft.
