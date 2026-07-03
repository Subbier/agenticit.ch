# ElevenLabs – „Rückruftermin buchen"-Tool (Voice-Agent → Zoho CRM)

Damit Alexa am Gesprächsende den Rückruftermin in Zoho (Lead + Meeting in Meliksahs Kalender) auslöst, braucht der Agent ein **Webhook-Tool**.

**Wo einrichten:** ElevenLabs → dein Agent → **Tools** → **Add Tool** → **Webhook**.

---

## 1) Tool-Grunddaten

- **Name:** `rueckruftermin_buchen`
- **Description (wann aufrufen):**
  > Rufe dieses Tool auf, sobald der Besucher einen Rückruftermin bestätigt hat UND du Name, Telefonnummer, Datum und Uhrzeit kennst. Bestätige dem Besucher den Termin erst, nachdem das Tool erfolgreich war.
- **Method:** `POST`
- **URL:**
  ```
  https://flow.zoho.eu/20115207906/flow/webhook/incoming?zapikey=1001.9b4d5951d614c170fde879d130f2b6df.92c3d44e7fb5cce4767b39f2b25ab398&isdebug=false
  ```
- **Headers:** `Content-Type: application/json`

---

## 2) Body-Parameter (Request Body)

Lege diese Felder als Body-Parameter an. Die Beschreibungen sagen dem Agent, wie er sie füllt.

| Parameter | Typ | Pflicht | Beschreibung (für den Agent) |
|---|---|---|---|
| `name` | string | ja | Vollständiger Name des Besuchers (Vor- und Nachname). |
| `company` | string | – | Firma des Besuchers. |
| `phone` | string | ja | Telefonnummer für den Rückruf. |
| `email` | string | – | E-Mail-Adresse für die Bestätigung. |
| `interest` | string | – | Anliegen / was den Besucher interessiert (kurz). |
| `callback_date` | string | ja | Rückruf-Datum im Format `YYYY-MM-DD` (z. B. `2026-06-27`). |
| `callback_time` | string | ja | Rückruf-Uhrzeit im 24h-Format `HH:mm` (z. B. `17:00`). |
| `callback_datetime` | string | ja | Startzeit als ISO 8601 mit Zeitzone Europe/Zurich `+02:00`. Bilde sie aus Datum + Uhrzeit, z. B. `2026-06-27T17:00:00+02:00`. |
| `callback_end_datetime` | string | ja | Endzeit = Startzeit **+ 30 Minuten**, gleiches Format, z. B. `2026-06-27T17:30:00+02:00`. |
| `notes` | string | – | Kurze Stichworte aus dem Gespräch. |
| `source` | string | – | Fester Wert: `voice-agent`. |

> Zeitzonen-Hinweis: Schweiz = `+02:00` (Sommerzeit). Falls der Agent das Jahr/Datum nicht sicher kennt, nutze das aktuelle Datum aus dem Systemkontext.

---

## 3) Ergänzung im System-Prompt

Füge im Agent-System-Prompt (am Ende des Gesprächsablaufs) hinzu:

> Wenn der Besucher einen Rückruftermin bestätigt hat, rufe **vor** der finalen Bestätigung das Tool `rueckruftermin_buchen` mit allen bekannten Feldern auf. Berechne `callback_datetime` aus Datum + Uhrzeit (Zeitzone `+02:00`) und `callback_end_datetime` = Startzeit + 30 Minuten. Erst wenn das Tool erfolgreich war, bestätige dem Besucher Termin, Telefonnummer und E-Mail.

---

## 4) Test

Nach dem Einrichten einmal einen Test-Dialog führen, in dem Alexa einen Termin vereinbart. Danach in Zoho CRM prüfen:
- **Leads** → neuer Lead mit Name/Firma/Telefon/E-Mail.
- **Kalender / Meetings** → Eintrag „Rückruf: …" bei **Meliksah** zur vereinbarten Zeit (30 Min.).

(Die Webhook-URL enthält einen geheimen `zapikey` – wie ein Passwort behandeln.)
