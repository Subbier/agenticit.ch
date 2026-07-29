# Karriereseite → Zoho People: Integrations-Runbook

Die neue Seite `/karriere` sammelt Bewerbungen über ein eigenes Formular (`app/api/karriere/route.ts`) und sendet sie an eine Webhook-URL (`KARRIERE_WEBHOOK_URL`), sobald sie gesetzt ist — bis dahin gibt die Route bewusst einen Fehler zurück, statt Bewerbungen ins Leere laufen zu lassen.

**Warum kein direkter Zoho-People-Call aus der Website:** Zoho People ist in dieser Session nicht als Werkzeug verbunden (nur Zoho CRM, Books, Desk, Projects) — die Anbindung muss einmalig manuell eingerichtet werden, genau wie beim Zoho-CRM-Setup für die Lead-Formulare (siehe `zoho-one-implementierung.md`).

## Schritt 1 — Zoho People Recruitment-Modul vorbereiten

1. In Zoho People: Recruitment-Modul aktivieren (falls noch nicht geschehen).
2. Die drei offenen Stellen als Job-Postings anlegen (Titel, Start, Pensum, Setup — Inhalte aus `lib/karriere-content.ts`).
3. Prüfen, welche Felder ein neuer Bewerber-Datensatz mindestens braucht (Name, E-Mail, Telefon, Position, Link/Portfolio, Nachricht) — diese Felder liefert das Formular bereits 1:1.

## Schritt 2 — Verbindung herstellen (Zoho Flow, empfohlen)

1. Zoho Flow → neuer Flow → Trigger: „Webhook" (Custom Webhook).
2. Die generierte Webhook-URL in die Umgebungsvariable `KARRIERE_WEBHOOK_URL` im Vercel-Projekt **v1-main** eintragen (Projekt-Einstellungen → Environment Variables) und neu deployen.
3. Im Flow: Aktion „Zoho People – Bewerber erstellen" (Recruitment-Modul), Felder mappen:
   - `name` → Bewerber-Name
   - `email` → E-Mail
   - `phone` → Telefon
   - `position` → Beworbene Stelle
   - `link` → LinkedIn/Portfolio (Custom Field, falls nötig anlegen)
   - `message` → Notiz/Motivationstext
4. Optional: Benachrichtigung an das Recruiting-Team (E-Mail oder Zoho Cliq) als zweiter Schritt im selben Flow.

## Schritt 3 — Testen

1. Testbewerbung über `/karriere` mit eigener E-Mail-Adresse senden.
2. Prüfen, ob der Bewerber-Datensatz korrekt in Zoho People (Recruitment) ankommt.
3. Erst danach das Formular auf der Live-Seite für echte Bewerbungen offen lassen.

## Compliance

Jede Bewerbung wird von einem Menschen gelesen und beantwortet — kein automatisiertes Ablehnen durch eine KI (Hinweis dazu steht bereits im Formular). Daten bleiben DSG-konform in der Schweiz verarbeitet; Einwilligung wird per Checkbox im Formular eingeholt und mitgeloggt (`consent: true` im Payload).

## Hinweis zum Header-CTA

Der Button „Jetzt starten →" im Seiten-Header (`components/site/site-header.tsx`) wurde durch „Karriere →" ersetzt und verweist neu auf `/karriere` — wie von Sabir gewünscht. Der bisherige Lead-Weg über den Header entfällt dadurch; die Lead-Generierung läuft weiterhin über die Kontakt-Buttons (Telefon/Mail-Icons im Header), den `/kontakt`-Link und die Rückruf-Formulare auf jeder Unterseite.
