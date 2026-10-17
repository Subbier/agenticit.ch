# Messung der Checks

Stand: 17.10.2026. Gilt für Kundenreise-, Automatisierungs-, Marketing-Setup-, Anfragen- und CRM-Ablauf-Check.

## Was die Signale bedeuten

| Ereignis | Auslöser | Keine Aussage über |
| --- | --- | --- |
| `check_started` | Erste Auswahl durch die Person | Abschluss, Qualität oder Kontakt |
| `check_result_ready` | Erster gültiger Ergebniszustand | Tatsächliches Lesen oder Machbarkeit |
| `plan_download_clicked` | Klick auf den Plan-Download | Erfolgreiches Speichern, CRM oder Lead |
| `inquiry_forwarded` | `/api/leads` antwortet mit erfolgreichem HTTP-Status und `ok: true`; das Bot-Feld ist leer | CRM-Datensatz, Qualifizierung, Termin oder Auftrag |

Beim Automatisierungs-Check entsteht der Ergebniszustand nach der ersten ausgewählten Aufgabe mit gültigen Beispielwerten. Er belegt keine vollständig angepasste Berechnung.

Start, Ergebnis und Download werden pro geöffnetem Check höchstens einmal versucht. Zurückgehen, Bearbeiten und wiederholtes Speichern zählen nicht erneut. Ein Neuladen oder ein neuer Besuch kann neu zählen. Das sind keine personenbezogen deduplizierten Nutzerzahlen. Eine erfolgreich übermittelte neue Anfrage kann neu zählen.

## Einwilligung und Daten

- Nur mit gültiger Statistik-Zustimmung zum Zeitpunkt des jeweiligen Ereignisses. Zuvor abgelehnte Ereignisse werden nicht nachgesendet.
- Nur HTTPS auf `agenticit.ch` oder `www.agenticit.ch`. Keine eigenen Check-Signale von localhost oder Vercel-Vorschauen.
- Festes Google-Ziel: vorhandenes `G-3NGDK2RM3B`. Der Google-Tag startet im GTM seit Version 6 erst mit Statistik-Zustimmung.
- Zusätzlicher Parameter `check_kind`: nur `customer_journey`, `automation`, `marketing_setup`, `inquiry_flow` oder `crm_flow`.
- Eigene Ereignisse übergeben eine feste saubere Seitenadresse ohne Query und einen leeren Referrer. Keine Antworten, Branchen, Rechenwerte, Namen, E-Mails, Telefonnummern oder CRM-Kennungen.
- Google kann bei erteilter Zustimmung weiterhin seine üblichen pseudonymen Messdaten erheben. Diese Änderung ersetzt keinen vollständigen Audit der automatisch erfassten Google-, Marketing- oder Vercel-Ereignisse.
- Blockierte Messung darf Check, Download und Kontaktanfrage nicht unterbrechen. Adblocker und fehlende Zustimmung machen diese Zahlen unvollständig.

## Ergebnisgrenzen und Prüfung

Das Frontend-Signal `inquiry_forwarded` wird nicht als `generate_lead` ausgegeben und nicht automatisch als Key Event markiert. Der Server bestätigt aktuell die erfolgreiche Annahme durch den konfigurierten Webhook. Ein tatsächlich erzeugter CRM-Datensatz braucht einen separaten Nachweis. D03 bleibt daher offen.

Unit-Tests prüfen Zustimmung, erlaubte Hosts, feste Nutzlast, einmalige Stufen, fehlende Wiederholung abgelehnter Stufen, Fehlerfälle, Bot-Feld und beide erforderlichen Bestätigungen. Die Kontaktanfrage wird dabei ausschliesslich simuliert. Live-Prüfungen nutzen nur Check-Auswahl und Download, keine Kontaktformular-Sendung oder Telefonie. QA-Ereignisse sind keine Kundenergebnisse.

Eigene Ereignisse und `check_kind` lassen sich im GA4-Echtzeitbericht prüfen. Die benötigte ereignisbezogene Dimension wurde am 17.10.2026 in der eigenen GA4-Property gespeichert und nach vollständigem Neuladen bestätigt. Sie wird durch den Website-Code nicht angelegt. Event-Zustellung ist noch kein fertiges CRM-Reporting.

## Gespeicherte GA4-Konfiguration

- Konto `396222014`, Property `539501132` mit sichtbarem Namen AgenticIT.
- Webstream `14973252346`, URL `https://agenticit.ch`, Mess-ID `G-3NGDK2RM3B`; mit dem Ziel im Website-Code abgeglichen.
- Dimensionsname **Checktyp**, Anwendungsbereich **Ereignis**, Ereignisparameter **check_kind**.
- Beschreibung: Verwendeter AgenticIT Check: customer_journey, automation, marketing_setup, inquiry_flow oder crm_flow.
- Vorher keine benutzerdefinierten Dimensionen, danach genau eine passende Zeile. Nach Neuladen und späterer Rückkehr erneut sichtbar. Keine bestehende Definition ersetzt.

Der Name enthält bewusst keinen Bindestrich. Umfang und Parameter sind vor dem Speichern mit der vorhandenen Messung abgeglichen. Keine neue Zielgruppe, kein neues Schlüsselereignis und keine zusätzliche Datenerhebung eingerichtet. GTM und Website-Code bleiben unverändert.

## Empfangsprüfung vom 17.10.2026

Ein eigener Besuch im CRM-Ablauf-Check wurde mit Statistik-Zustimmung und ohne Marketing-Zustimmung geprüft. Genau eine erste Auswahl löste `check_started` mit `check_kind = crm_flow` aus. Google nahm die Übertragung mit HTTP 204 an. Anschliessend zeigte die richtige Property das Ereignis im Echtzeitbericht mit Anzahl 1 und nach Aufschlüsselung den Parameterwert `crm_flow`.

Das ist ein technischer QA-Nachweis. Es wurde kein Ergebnis abgeschlossen, kein Downloadsignal ausgelöst und keine Kontaktanfrage gesendet. Der Start ist kein Kunden- oder Lead-Ergebnis. Vorherige Auswahl «nur notwendige» danach über die sichtbare Cookie-Einstellung wiederhergestellt, beide optionalen Kategorien als inaktiv bestätigt; eigene Netzwerkbeobachtung beendet und QA-Tab geschlossen. Gespeicherte Belege enthalten nur die festen Messfelder und Status, keine Netzwerk-Kennungen oder vollständigen Google-Anfragen.

## Nächste Auswertung und Grenzen

Google nennt für die reguläre Verwendung neuer benutzerdefinierter Dimensionen normalerweise 24 bis 48 Stunden nach Übermittlung und Einrichtung. Eine gespeicherte Definition und ein Echtzeittreffer belegen deshalb noch keinen fertigen Langzeitbericht. Die Liste «Letzte Ereignisse» enthielt vor dieser QA-Prüfung sechs Standardereignisse; die neuen Stufen waren dort noch nicht sichtbar. Daraus wurde keine fehlgeschlagene Übermittlung oder Nullnutzung abgeleitet.

Nach Verarbeitung sind **Checktyp**, **Ereignisname**, **Datum** und **Ereignisanzahl** die Grundlage einer ersten Tabelle. Auf die vier eigenen Ereignisnamen filtern und eigene QA-Nutzung gesondert berücksichtigen. Ereigniszahlen sind keine eindeutig gezählten Personen und ihr Verhältnis ist noch keine nachgewiesene Besucher-zu-Kunde-Conversion. Aussagekräftige Vergleiche brauchen vergleichbare Zeiträume und ausreichend tatsächliche Nutzung.

`inquiry_forwarded` bleibt die Bestätigung des Website-Webhooks. CRM-Eingang, Qualifizierung, Termin und Auftrag benötigen getrennte Nachweise aus dem richtigen Zielsystem. D03 und das vollständige Reporting bleiben offen.

Grundlage: [Google: Ereignisse einrichten](https://developers.google.com/analytics/devguides/collection/ga4/events), [Google-Tag-Referenz](https://developers.google.com/tag-platform/gtagjs/reference#event) und [ereignisbezogene benutzerdefinierte Dimensionen erstellen](https://support.google.com/analytics/answer/14239696?hl=de), gelesen am 17.10.2026.
