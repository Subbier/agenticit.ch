# Zoho One – Implementierungsplan für AgenticIT

**Firma:** AgenticIT (Bern) – IT-Agentur spezialisiert auf KI-Agenten & KI-Agent-geführte Revenue Operations
**Team:** 2 Personen (Saby = digital/Betrieb, Chef = Verträge/Kunden)
**Modell:** Sales-Partner, der Kunden von der ersten Lead-Sichtung bis über den Abschluss hinaus begleitet
**Kunden aktuell:** 2 Krankenkassen-/Versicherungsmakler

---

## Leistungskatalog (bereits im CRM angelegt ✅)

| Produkt | Inhalt |
|---|---|
| Lead Engine | KI-gestützte Lead-Gen: Meta/Google Ads, Landing Pages, Lead-Erfassung |
| Conversion Studio | Landing Pages & Funnels |
| Revenue Cockpit | KI-Agent-geführte RevOps: CRM, Lead-Scoring, Reporting, Begleitung |
| Always-On Betrieb | IT-/System-Unterhalt, Hosting, Automationen |
| Full-Cycle Sales Partner | Dachangebot A–Z aus einer Hand |

---

## Was ich direkt über die Integration bauen kann vs. was Admin/UI ist

| Bereich | Zoho-App | Über Integration baubar? |
|---|---|---|
| Kundenverwaltung, Pipeline, Produkte, Deals | **CRM** | ✅ Ja (ich) |
| Rechnungen, Artikel, Ausgaben | **Books** | ✅ Ja (sobald Trial aktiv) |
| Support-Tickets | **Desk** | ✅ Ja |
| Projekte/Aufgaben | **Projects** | ✅ Ja |
| E-Mail-Postfächer (md@, sr@…) | **Mail** | ⚙️ Admin (du) |
| Kalender / Termine | **Calendar / Bookings** | ⚙️ Admin + teils Integration |
| Benutzer, Lizenzen, App-Aktivierung | **Zoho One Admin** | ⚙️ Admin (du) |
| Automationen / KI-Agenten | **Flow / Zia / CRM-Workflows** | ⚙️ teils Integration, teils UI |

---

## Phasen-Plan

**Phase 1 – CRM-Kern (läuft)**
- [x] Leistungskatalog (Produkte) anlegen
- [ ] Pipeline-Phasen setzen: Lead-Sichtung → Qualifiziert → Beratung/Termin → Offerte → Abschluss → Onboarding → Betreuung (Zyklus)
- [ ] Die 2 Makler-Firmen als **Accounts** anlegen
- [ ] Lead-Quellen-Felder (Kampagne: Meta / Google / Landing Page) ergänzen

**Phase 2 – Finanzen**
- [ ] Books-Trial reaktivieren
- [ ] Die 2 Firmen als Kunden, Leistungen als Artikel (Retainer + Einmalig)
- [ ] Ausgaben-Kategorien für Tools (Semrush, Meta, Google Ads, Vercel, Zoho)

**Phase 3 – Kommunikation & Betrieb**
- [ ] Mail-Postfächer & Domain in Zoho Mail (Admin)
- [ ] Calendar / Bookings für Beratungstermine
- [ ] Desk für Support-Anfragen der Kunden

**Phase 4 – Automatisierung / KI-Agenten**
- [ ] CRM-Workflows: Lead rein → Scoring → Aufgabe/Termin
- [ ] Zia / Flow für „Agent sagt Ziel, System erledigt"
- [ ] Anbindung Website-Formular (agenticit.ch) → CRM

---

## Was ich von dir brauche, um Phase 1 fertigzustellen

1. **Namen der 2 Makler-Firmen** (für die Accounts).
2. **Abrechnungsmodell**: Retainer / pro Lead / pro Projekt?
3. **OK für die Pipeline-Phasen** oben (Änderung wirkt global im CRM).

---

## Website-Formular → Zoho CRM (Phase 4, vorbereitet ✅)

Das Kontaktformular auf agenticit.ch sendet an die interne API-Route `POST /api/leads`.
Diese leitet den Lead an einen Webhook weiter (Env-Variable **`LEADS_WEBHOOK_URL`**).
Hinter dem Webhook hängt eine Zoho-Automation (Zoho Flow *oder* eine Deluge-Funktion),
die den Lead anlegt und eine Rückruf-Aufgabe erstellt.

**Was die API bereits Zoho-fertig mitliefert** (JSON-Payload):

```jsonc
{
  "source": "home",
  "name": "Vorname Nachname",
  "email": "kontakt@firma.ch",
  "company": "Firma AG",
  "phone": "+41 …",
  "message": "…",
  "industry": "Versicherung",        // gewählte Branche
  "leadPrice": 50,                   // Richtwert pro Kundenanfrage (CHF) zur Branche
  "crm": "zoho",
  "tags": ["branche:Versicherung", "lead_preis:50"],
  "followUpTask": "Rückruf",
  "submittedAt": "2026-…Z"
}
```

**Einrichtung (einmalig, kein Code nötig):**

1. In **Zoho Flow** einen Webhook-Trigger erstellen → die erzeugte URL als
   `LEADS_WEBHOOK_URL` in Vercel (Project → Settings → Environment Variables) hinterlegen.
2. Flow-Aktion **„Create Lead“** im CRM: Felder aus dem Payload mappen
   (`name`, `email`, `company`, `phone`, `message`, Lead-Quelle = `source`).
3. **Tags** aus `tags[]` übernehmen (Branche + Lead-Preis) → für Segmentierung & Reporting.
4. Flow-Aktion **„Create Task“**: Betreff = `followUpTask` („Rückruf“), fällig +1 Werktag,
   zugewiesen an Sales – verknüpft mit dem neuen Lead.

> Hinweis: Solange `LEADS_WEBHOOK_URL` nicht gesetzt ist, antwortet die API mit
> „Lead-Webhook ist noch nicht konfiguriert.“ – der Rest der Seite funktioniert normal.
