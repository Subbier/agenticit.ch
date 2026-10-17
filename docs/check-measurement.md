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

Eigene Ereignisse und `check_kind` lassen sich im GA4-Echtzeitbericht prüfen. Für langfristige Auswertungen nach `check_kind` ist eine passende ereignisbezogene benutzerdefinierte Dimension erforderlich; sie wird durch den Website-Code nicht angelegt. Event-Zustellung ist noch kein fertiges CRM-Reporting.

Grundlage: [Google: Ereignisse einrichten](https://developers.google.com/analytics/devguides/collection/ga4/events) und [Google-Tag-Referenz](https://developers.google.com/tag-platform/gtagjs/reference#event), gelesen am 17.10.2026.
