# CRM-Ablauf-Check

Stand: 17. Oktober 2026. C04 des Website-Schlachtplans.

## Nutzen und Abgrenzung

Die neue Seite `/crm-ablauf-check` hilft KMU, einen konkreten Datenweg zwischen Formular, Gespräch, Liste und CRM vorzubereiten. Der bestehende Anfragen-Check bleibt auf Vertriebsbearbeitung ausgerichtet. Der neue Check prüft anhand der Selbstauskunft fünf Grundlagen: Felder und Quelle, Datenübernahme, wiederholte Übergaben, Übernahme im Team und Fehlerbehandlung. Keine Kundendaten oder Zugänge nötig.

Bekannte offene oder teilweise gelöste Punkte stehen vor ungeklärten Angaben. Unbekannt bedeutet Klärung, keine festgestellte Störung. Bis zu drei Prioritäten bleiben sichtbar. Alle offenen Punkte samt Zuständigkeit, Abnahme und Prüftermin stehen im vollständigen Textplan. Bei fünf als bereit angegebenen Grundlagen folgt ein gemeinsamer Nachweis anhand freigegebener Fälle, keine erfundene Baustelle oder Bewertung.

Die bearbeitbare Vorlage enthält Quelle, Feldzuordnung, getrennte Kontakt-/Vorgangskennung, CRM-Ziel und Nachweis, Teamübernahme sowie Fehlerfall. Vier Abnahmefälle unterscheiden Normalfall, technische Wiederholung, neues Anliegen derselben Person und unterbrochene Übergabe. Das ist eine Vorbereitung für eine spätere Prüfung, keine ausgeführte Integration.

## Gestaltung und Kontaktweg

Vorhandene ChoiceCheck-Komponente, native Radios, ausdrückliches Weiter, Fokusführung und editierbare Antworten wiederverwenden. Ergebnis, Download und aufklappbarer vollständiger Ablaufplan stehen vor einer freiwilligen Anfrage. Die zusätzliche Textansicht ist nur für diesen Check aktiviert; die bestehenden Checks behalten ihre Darstellung. Keine neue Menüebene; Einstieg kompakt auf der Werkzeugseite und als weiterführender Link der Sales-Leistungsseite. Der schwebende Chat bleibt wie bei den übrigen Checks ausgeblendet. Keine Änderung an Mias Stimme, Skript oder Telefonie.

Die bestehende Kontaktstrecke erhält den eigenen Kontext `crmCheck`, Quelle `crm-ablauf-check` und den fest vorgegebenen Messwert `crm_flow`. Der Server validiert alle fünf Antworten und erzeugt Plan, Ziel und Prüfungshinweis selbst. Gemischte Kontexte, fehlende Firma und fehlende Zustimmung werden abgewiesen. Kein automatisches Marketing-Opt-in. Die zusätzliche Übergabe wird nur im Mock geprüft; ein realer CRM-Eintrag ist damit nicht belegt. Die schon bekannte D03-Lücke der nachgelagerten Feldzuordnung bleibt offen.

## Recherchegrundlage

Die fachliche Umsetzung ist eine eigene Ableitung aus Prozessprüfung und der offiziellen [Zoho-Upsert-Dokumentation](https://www.zoho.com/crm/developer/docs/api/v8/upsert-records.html) sowie [Datensatzantworten](https://www.zoho.com/crm/developer/docs/api/v8/insert-records.html), gelesen am 17.10.2026. Ein konfiguriertes Abgleichfeld ist nicht automatisch eine passende Regel für neue Anliegen derselben Person. Die tatsächliche Datensatzantwort und der Zielvorgang gehören deshalb zur späteren Abnahme. Diese Aussagen beschreiben keine bereits eingerichtete Kundenintegration.

Ubersuggest-Schweiz am 17.10.2026: Standort erneut als 2756 aufgelöst; `crm beratung` auf Deutsch mit geschätzt 20 monatlichen Suchen und Schwierigkeit 23 gemeldet. Historische Reihe bis 202610, Suchabsicht nicht zugewiesen. Das rechtfertigt keine Lead- oder Rankingprognose. Der Check dient vor allem als passende Entscheidungshilfe im vorhandenen Sales-/CRM-Angebot. Kein zusätzliches SEO-Projekt und kein kostenpflichtiger Bericht eingerichtet.

## Abnahme

Unit-Tests decken vollständige Eingaben, unbekannte Angaben, Priorisierung, vollständigen Plan, Trennung von Kontakt und Vorgang, kontextgebundene freiwillige Anfrage, serverseitige Ableitung und simulierte Weiterleitung ab. Messung nutzt den bestehenden Zustimmungsvertrag ohne Antworten oder Kontaktdaten. Nach Hinzufügen der fünften Check-Kennung musste die alte feste Testanzahl von vier auf fünf aktualisiert werden; danach alle 236 passenden Prüfungen am endgültigen lokalen Produktionsbuild erfolgreich. TypeScript, Formatter und Build bestanden.

Frage- und Ergebniszustand jeweils bei tatsächlich gemessenen 320, 390, 768 und 1280 Pixeln ohne seitlichen Überlauf. Auswahlflächen mindestens 60 Pixel, Kontaktfelder 46 Pixel. Alle fünf Schritte per Tastatur bis zum Ergebnis durchlaufen; Antworten beim Bearbeiten erhalten. Kein natives Kontaktformular im Frage- oder Ergebniszustand, genau eines erst nach ausdrücklichem Öffnen; Bearbeiten schliesst es wieder. Kein Formular ausgefüllt oder versendet. FAQ per Enter bedient und der Werkzeuglink samt Browser-Rückkehr geprüft.

Der geöffnete vollständige Ablaufplan auf 320 Pixeln bricht lesbar um und ist zeichengetreu identisch mit dem erwarteten Plan. Nativer Download tatsächlich als Datei beobachtet und unabhängig mit dem erzeugten Beispielplan verglichen: 4493 Bytes, SHA-256 `5c06b0d71295e53581f10aea47e3315663a14175b2785e6793d801d05c92aadf`. Lokale OneDrive-Kopie gesichert.

## Veröffentlichung

Feature `c51d552` und die nach Sichtprüfung getrennte Linkzeile `23a714eee837a13831909f206781886fe023d269` gepusht. Nach der Layoutkorrektur erneut Build, TypeScript, Formatter und alle 236 passenden Prüfungen erfolgreich. Das finale Produktionsdeployment `dpl_FAYi9a7tqkzeHXvrFt1xYiDnQQ2V` ist READY mit genau diesem Commit und `agenticit.ch` zugeordnet.

Nach Veröffentlichung 39 kombinierte Unit-/öffentliche GET-Prüfungen erfolgreich, darunter alle 78 kanonischen Sitemap-Seiten mit jetzt 30 belegten Inhaltsdaten. Der Sales-Link steht sichtbar in einer eigenen Zeile und führt zum neuen Check. Alle fünf Fragen und der Download auf der öffentlichen Seite bedient. Die tatsächlich heruntergeladene Live-Datei ist bytegleich mit dem lokalen Beispielplan und in OneDrive gesichert.

Bei ausschliesslicher Statistik-Zustimmung wurden `check_started`, `check_result_ready` und `plan_download_clicked` mit dem festen Typ `crm_flow` und sauberer Seitenadresse von Google jeweils mit HTTP 204 angenommen. Nur Ereignis, Typ, Adresse und Status gespeichert, keine pseudonymen Kennungen oder Antworten. Die vorherige Auswahl «nur notwendige» anschliessend über die Oberfläche wiederhergestellt. Das sind QA-Ereignisse, keine Kundennutzung oder CRM-Nachweise. Eine Kontaktanfrage wurde weder lokal noch öffentlich gesendet. Keine Änderung an externen Workflows oder Telefonie.
