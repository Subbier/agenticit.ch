# Bedienbarkeit der AgenticIT-Website

Prüfstand: 17. Oktober 2026. Produktfassung d1c7feb94695dd599dfc8bb7da2ab14d237a3fef. Diese Arbeitsabnahme führt konkrete Nachweise zusammen. Sie ist keine vollständige WCAG-Konformitätserklärung und keine Prüfung mit allen assistiven Technologien.

## Prüfbereich

Die Tastaturstrecke umfasst Startseite, Kundenreise-Check, Automatisierungs-Check, Marketing-Setup-Check, Anfragen-Check, CRM-Ablauf-Check, Kontakt und Firmenvideo. Ansichten: 320, 390, 768 und 1440 CSS-Pixel. Die ausgelieferte Struktur wird zusätzlich für alle 79 kanonischen Sitemap-Seiten und die eigene 404-Seite geprüft.

Die abschliessende öffentliche Prüfung verwendet normale Tab-/Enter-/Tab-Tasten ohne vorheriges Fokussieren eines Elements: 32 von 32 Fällen bestehen, beim ersten Tab bleibt auch die Scrollposition unverändert. Ein anfänglicher Scrollsprung bei gezielter Body-Elementbedienung wurde damit als Werkzeugbefund abgegrenzt und nicht dem Produkt zugeschrieben. Die lokale Prüfung umfasst 32 gezielte Tastaturfälle; ein später geplanter zusätzlicher nativer Lokalvergleich wurde nach dem bereits beendeten Server nicht ausgeführt und nicht als weiterer Nachweis gezählt.

Prüfungen erzeugen keine echten Kontakte, Bewertungen, CRM-Einträge, Buchungen oder Anrufe. Der neue Hauptinhalt-Sprung verändert weder Einwilligungen noch Formularversand oder Agentenkonfigurationen.

## Nachweismatrix

| Bereich | Tatsächlicher Nachweis | Grenze / weitere Prüfung |
| --- | --- | --- |
| Wiederkehrende Navigation überspringen | Ein nativer, vor dem Header ausgelieferter Link führt zu genau einem fokussierbaren main-Element. Er erscheint beim ersten Tab-Schritt. Enter setzt den Fokus auf main; der nächste Tab erreicht eine Aktion im Hauptinhalt. 32 Fälle lokal und öffentlich geprüft. | Die Strukturprüfung ersetzt keinen vollständigen Screenreader-Test. Alte eigenständige Tools ausserhalb der Sitemap werden dadurch nicht pauschal abgenommen. |
| Adresse und Rücknavigation | Der bediente Sprung setzt nach Hydrierung keinen Fragment-Eintrag. Startseite → Sprung → Check → zurück zeigt wieder Startseitenadresse und Startseiten-H1. Vorher belegter Entwurfsfehler: Startseitenadresse mit Check-Inhalt. | Ohne JavaScript bleibt der ausgelieferte Anker als nativer Sprung nutzbar. Keine pauschale Reparatur sämtlicher anderer Abschnittslinks behauptet. |
| Fokus | Sprunglink mit sichtbarem dunklem Fokusrahmen, 44 Pixel Höhe; Hauptinhalt fokussierbar, nicht in der regulären Tab-Reihenfolge. Anschliessender Fokus liegt innerhalb des Hauptinhalts. | Prüfung mit dem verfügbaren Browser; keine Aussage über alle Browser-/Hilfsmittel-Kombinationen. |
| Mobiles Menü | Bei 390 Pixeln öffnet und schliesst Enter das Menü; Hauptinhalt rückt von y=76 auf y=360, also um 284 Pixel. Bestehende Etappen belegen Ausseninteraktion und Seitenwechsel. | Menü bleibt ein nicht-modaler, den Inhalt verschiebender Bereich. Keine zusätzliche Fokusfalle eingeführt. |
| Bewegte Darstellung | Karussell pausiert bedient; «Sales anzeigen» per Enter wählt Sales, data-running bleibt false. Bestehender Code berücksichtigt prefers-reduced-motion und die Seitensichtbarkeit. | Medienpräferenz in dieser Etappe nicht in allen Browsern emuliert; Quelltextnachweis nicht mit Laufzeitnachweis gleichsetzen. |
| Video | Wiedergabeknopf per Enter bedient; Video spielte mit readyState 4, Fokus auf VIDEO. Leertaste pausiert; native Steuerung vorhanden. Deutscher Untertitel und Textfassung bestehen weiterhin und werden von den vorhandenen Tests erfasst. | Keine Prüfung aller nativen Medienoberflächen oder vollständige audiovisuelle Barrierefreiheitsabnahme. Originale Ergebnisbehauptung wartet auf den separat angefragten Beleg. |
| Formulare | Dauerhafte Labels, Einwilligungen, Fokus- und Fehlerzustände in vorhandenen Tests und Etappen belegt. Neue Sprungstrecke erreicht das erste Feld direkt; kein Formular abgesendet. | Echter Empfang und CRM-Kontext bleiben D03. Helle Feldumrandung ist ein neuer konkreter Nachbesserungskandidat, siehe unten. |
| Textkontrast | Stichprobe auf acht Kernseiten: 530 direkt gerenderte Textstellen mit auswertbaren RGB-Farben; kein gemessener Wert unter der jeweils angesetzten Grenze. | 41 Stellen wegen Verlauf, Deckkraft oder nicht ausgewerteter Farbsyntax offen. Platzhalter, Bildtexte, alle Zustände und sämtliche Seiten sind damit nicht vollständig geprüft. |
| Reflow und Touch | Kernstrecken bei vier Breiten per Tastatur bedient; Sprunglink mindestens 44 Pixel hoch. Bestehende Etappen enthalten grössere Layout- und Formularprüfungen. | Keine pauschale Mindestgrösse für jedes Textelement oder formale Gesamtprüfung bei Zoom abgeleitet. |

## Kontrastmethode und neuer Befund

Die Stichprobe liest sichtbare direkte Textknoten und die berechneten Browserfarben. RGB-Hintergründe werden durch die Vorfahren zusammengesetzt; bewertet werden 4,5:1 für normalen Text und 3:1 für entsprechend grosse Schrift. Verläufe, Deckkraft und nicht unterstützte Farbsyntax bleiben ausdrücklich offen. Der im unterstützten Browser nicht gezeichnete Video-Fallback wird nicht als sichtbarer Textfehler gezählt. Ein anfänglicher Durchlauf vor fertiger Darstellung lieferte für die Startseite keine Werte; erst die erneut gelesene sichtbare Seite ging in die konsolidierte Auswertung ein.

Kontaktfelder haben einen weissen Innenbereich und eine Umrandung rgb(191,203,184), entsprechend #bfcbb8. Diese Grenze erreicht gegen Weiss nur 1,6868:1. Die vorhandenen Labels bleiben erkennbar; daraus wird hier kein vollständiges WCAG-Urteil abgeleitet. Die nächste gezielte Verbesserung ist eine besser erkennbare Feldgrenze, geprüft gegen Innen- und Aussenfläche sowie im Fokuszustand. Keine pauschale Farbänderung aller Karten oder Buttons auf Verdacht.

## Referenzen

- W3C: [Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- W3C: [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- W3C: [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- W3C: [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Installierte Next-Dokumentation: node_modules/next/dist/docs/03-architecture/accessibility.md und use-client.md.

## Wiederholbare Abnahme und Ablage

- npm run test:keyboard prüft Hauptinhalt-Ziele sowie Fokuslogik, native Rückfallebene und modifizierte Klicks.
- Gesamtlauf: 390 kombinierte Tests in 47 relevanten Dateien, ohne test-leads-Tests. TypeScript, Formatter und Produktionsbuild einschliesslich Import-/Tailwind-Prüfung bestanden. Öffentliche GET-Abnahme nach nachgewiesener Veröffentlichung; kein echter Versand daraus abgeleitet.
- Originale Nachweise in OneDrive: AgenticIT Webseite/Umsetzung-2026-10-17/Nachweise/accessibility-*. Dazu Entwurfsfehler, korrigierter Rückweg, Tastaturfälle je Umgebung, Textfarben, Menü, Videobedienung und Abbildungen.
- Der bereits zuvor beobachtete lokale NoFallbackError beim Serverende bleibt separat ungeklärt; erfolgreiche 404-Tests sind keine pauschale Laufzeitfehlerfreiheit.

Gesamtziel bleibt aktiv. Offene Nachweise zu realer Sichtbarkeit, qualifizierten Kundenanfragen, CRM-Zustellung und vollständiger Barrierefreiheit bleiben im Schlachtplan erhalten.
