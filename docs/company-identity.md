# Unternehmensangaben: Belege und Darstellung

Prüfdatum: 17.10.2026. Gilt für AgenticIT und die neue Website agenticit.ch.

## Bestätigte Fakten

| Angabe                                                  | Beleg                                                                                                                                                       | Verwendung                                                                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| AgenticIT GmbH, aktiv; Eschenweg 12, 3072 Ostermundigen | [Zentraler Firmenindex, EHRA-ID 1750164](https://www.zefix.ch/de/search/entity/list/firm/1750164), live im Browser gelesen                                  | Kontakt, Zusammenarbeit, Impressum, verantwortliche Stelle im Datenschutz, Metadaten und globale Unternehmensdaten |
| UID CHE-157.845.314                                     | Derselbe Zefix-Eintrag mit Link zum [UID-Register](https://www.uid.admin.ch/Detail.aspx?uid_id=CHE157845314)                                                | Sichtbar im Impressum und auf Zusammenarbeit; strukturierter Identifier. Keine Behauptung eines MWST-Status        |
| Mitglied bei Swico                                      | [Offizielles Mitgliederverzeichnis](https://www.swico.ch/de/verband/mitgliedschaft/mitgliederverzeichnis/), Eintrag AgenticIT GmbH mit Link zu agenticit.ch | Sichtbare Quellenlinks und `memberOf`. Die Verbandswebsite ist kein `sameAs`-Profil der Firma                      |
| info@agenticit.ch und 031 539 44 44                     | Bestehende, vom Auftraggeber verwendete öffentliche Kontaktdaten                                                                                            | Zentral in `lib/company.ts`; sichtbare Links und Schema stimmen überein. Keine Kontaktaufnahme zum Test            |

Das Swico-Verzeichnis nennt 3073 Ostermundigen. Für die Firmenadresse wird die amtlich bestätigte Adresse 3072 verwendet. Ein davon abweichender Postfachstandort wird nicht erfunden; die Verzeichnisabweichung bleibt dokumentiert. Mitgliedschaft bedeutet keine Zertifizierung, Empfehlung oder Qualitätsbewertung.

## Strukturierte Daten

- Eine Unternehmensdefinition unter der bestehenden stabilen ID `https://agenticit.ch/#organization`. Die zusätzliche, nicht belegte Tochter-/Standorteinheit `#localbusiness` entfällt. Die Website beschreibt eine schweizweit arbeitende Agentur; ein öffentlich zugängliches Ladenlokal wird nicht vorausgesetzt.
- Services, Fachartikel, Website und Checks behalten ihre Verweise auf diese ID. Der amtliche Firmenname ersetzt die frühere Schreibweise mit Leerzeichen.
- `sameAs` verweist nur auf den amtlichen Eintrag genau dieser Firma. Keine angenommenen LinkedIn-/GitHub-Profile oder Personen hinzugefügt.
- Der neue Schema-Logo-Pfad enthält SVG mit 512 × 512 Pixeln und unveränderter dunkler Zeichnung aus `journey-brand.svg`. Der bisherige öffentliche Pfad `/icon.svg` liefert das weisse 64 × 64-Favicon; die App-Route hat Vorrang vor der gleichnamigen älteren Datei im Public-Ordner. Für Suchdarstellungen auf weissem Hintergrund ist nun die grössere dunkle Variante vorgesehen. Favicon und sichtbares Logo bleiben unberührt.
- Unbelegte Öffnungszeiten, Koordinaten, Preisbereich und pauschale Schweizer Datenhaltung-/ROI-Zusagen aus den globalen Unternehmensdaten entfernt.
- Keine `SearchAction` auf `/blog?q=...`: Die tatsächliche Blogseite hat keine solche Suchfunktion.
- Orientierung: [Google Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [Schema.org identifier](https://schema.org/identifier), [Schema.org memberOf](https://schema.org/memberOf) und die installierten Next.js-Anleitungen zu JSON-LD/Metadaten.

## Sichtbare Grenzen

Kontakt verwendet die amtliche Adresse und verlinkt Zefix und den Swico-Eintrag. Die neue kompakte Firmenkarte auf Zusammenarbeit ergänzt die bestehenden Rollen, ohne die zuvor entfernten Personennamen wieder einzuführen. Datenschutz wird ausschliesslich bei Name/Adresse/Kontakt der verantwortlichen Stelle korrigiert; TestLeads-/FAIR-Ablauf und weitere Rechtstexte werden nicht umgebaut. Eine vollständige rechtliche Prüfung ist damit nicht erfolgt.

Der bestehende Footer-Hinweis «100% Schweizer Software & Hosting» bleibt bis zur bereits angefragten Freigabe einer passenden Formulierung unverändert. Die aktuelle Vercel-Region ist nicht mit reinem Schweizer Hosting gleichzusetzen. Auch swissICT-/Ausbildungslogos werden hier weder entfernt noch als neue extern verifizierte Zertifizierung ausgewiesen. Keine neuen Erfahrungsjahre, Kundenresultate, Auszeichnungen oder Personenprofile erfunden.

## Prüfung und Veröffentlichung

Fünf gezielte Regressionstests zeigten vor der Korrektur Fehler bei Firmenname, Schema-Zusagen, Anbieterreferenzen, nicht vorhandener Suche und fehlenden sichtbaren Fakten. Ein zusätzlicher Assettest prüft Grösse und unveränderte Zeichnung des neuen Schema-Logos. Danach sechs Unit-Prüfungen erfolgreich. Zwei zusätzliche öffentliche GET-Prüfungen kontrollieren die eindeutige Unternehmensdefinition auf acht Routen und sichtbare Firmenangaben auf vier Routen. Weitere Test-, Browser- und Live-Nachweise werden mit der Veröffentlichung im Schlachtplan und in der OneDrive-Übergabe erfasst.

Register- und Schema-Belege sind kein Nachweis von Rankings, KI-Empfehlungen oder gewonnenen Kunden. Die neue Seite benötigt eine eigene, datierte Ausgangsmessung; alte Suchindex-Auszüge bleiben von ihrer heutigen Auslieferung getrennt.

## Verifizierter Release

- Produktcommit `d50b0f119b85e93c0b4756045e3f84f778a5374f`, Produktion `dpl_CQhz4ZAtyZvaDg4Tzp7pEz86SWwm`, READY und mit agenticit.ch verbunden.
- 219 lokale Prüfungen und 14 abschliessende Prüfungen gegen die öffentliche Website bestanden. Darin die 77 direkt erreichbaren Sitemap-Seiten mit passenden Canonicals.
- Firmenkarte ohne seitliches Überlaufen auf 320/390/768/1280 Pixeln. Quellenlinks 44 Pixel hoch, Tastaturfokus sichtbar. Kontakt und Datenschutzhinweis im Browser bedient; kein Formular ausgefüllt oder gesendet. Finaler Abstand unter der Firmenkarte 16 Pixel.
- [Googles Live-Test](https://search.google.com/test/rich-results/result/r%2Forganization-info?id=f_iDXC3I9mSgJn9b7LkUiQ) erkannte ein gültiges Unternehmen. Aufgeklappte Felder enthalten die neue UID, Adresse, den Zefix-Link und den neuen Logo-Pfad. Dies bestätigt die Verarbeitung der aktuellen Daten, keine Indexierung oder Suchposition.
- Öffentliches Schema-Logo: HTTP 200, image/svg+xml, 3'823 Bytes, bytegleich zur geprüften Datei. SHA-256 `d4c5a74fed8482bf17fddb59d2aee7ac6cdf506739d0e6d6cb8c9c169c6a621d`.
- Screenshots, Testberichte und Übergabe liegen in OneDrive/Documents/ChatGPT/AgenticIT Webseite/Umsetzung-2026-10-17. Lokal gespeichert; Cloud-Synchronisierung nicht gesondert nachgewiesen. Eigener Prüfserver auf Port 3105 beendet.

## Ergänzte Unternehmenseinstiege, 17.10.2026

Die genauen Altpfade `/unternehmen` und `/ueber-uns` führen jetzt mit HTTP 308 auf `/zusammenarbeit`, wo die oben belegten Firmenangaben bereits stehen. Dort verweist der Technologie-Abschnitt auf `/sicherheit`. Beide Wege, der Sicherheitsverweis und Zurück wurden lokal und öffentlich bedient. Keine neuen Personenprofile oder Firmennachweise hinzugefügt. Produkt `6dd45be21789b9d44fd053e617c1cc8701aa9e59`, Deployment `dpl_FbnKbfwW7FGhk8k15LyRUfpH14af`, READY. Die redaktionelle Sicherheitsseite ersetzt keine technische oder rechtliche Gesamtabnahme; Footer-Formulierung bleibt offen. Nachweise in OneDrive unter `Umsetzung-2026-10-17/Nachweise/trust-*`.
