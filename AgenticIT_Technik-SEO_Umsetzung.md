# AgenticIT — Technik-SEO Umsetzungspaket

**Domain:** agenticit.ch · **Datenquelle:** Semrush Site Audit (Snapshot vom letzten Crawl, 28 Seiten) + Live-Crawl
**Stand:** 19.06.2026 · **Hosting:** Vercel (Projekt „agenticit-website") · **Build:** Next.js
**Erstellt für:** expertico AI-Workforce (technische Umsetzung) & AgenticIT

---

## 0. Aktueller Audit-Stand (Ausgangswert)

| Kennzahl | Wert |
|---|---|
| **Site Health / Quality** | 86 % |
| **AI Search Score** | 89 / 100 |
| HTTPS | 100 % |
| Internes SEO | 100 % |
| Crawlability | 97 % |
| Performance | 100 % |
| Verlinkung (Linking) | 94 % |
| Markups | 96 % |
| **Fehler / Warnungen / Hinweise** | **15 / 27 / 2** |

Das Fundament ist stark (Schema, HTTPS, Performance, Mobile alles grün). Die Fehler konzentrieren sich auf **eine einzige Ursache** plus ein Schema-Detail. Beides ist schnell behebbar.

---

## 1. KRITISCH — 12 von 15 Fehlern haben EINE Ursache

**Vier Seiten sind intern verlinkt und werden referenziert, liefern aber `404`:**

| URL (404) | Hinterlegter Title (= war geplant) |
|---|---|
| `https://agenticit.ch/services` | Services & KI-Pakete für Schweizer Unternehmen |
| `https://agenticit.ch/omnichannel` | Omnichannel Marketing & WhatsApp Business API |
| `https://agenticit.ch/intelligence` | Lead Scoring & Predicting Data Intelligence |
| `https://agenticit.ch/blog` | Speed-to-Lead & Lead-Burnout Blog |

Diese vier 404-Seiten verursachen gleich **drei** Fehlertypen im Audit:

- **Fehler #2 — 4xx-Fehler (4×):** die Seiten liefern 404.
- **Fehler #8 — defekte interne Links (4×):** im Code wird auf diese URLs verlinkt (Quelle: `www.agenticit.ch/...`-Varianten).
- **Fehler #38 — defekte Canonical-URLs (4×):** Canonical-Tags zeigen auf diese 404-URLs.

### Empfehlung: bauen statt nur entfernen
Die Titles sind sauber durchdacht und decken **reale AgenticIT-Stärken** ab — `/omnichannel` (WhatsApp Business / Twilio-Setup), `/intelligence` (Predictive Lead Scoring), `/blog` (= der empfohlene Content-Cluster). Strategisch beste Lösung:

1. **`/blog`, `/omnichannel`, `/intelligence`, `/services` als echte Seiten ausliefern** (Next.js-Routen anlegen). → behebt alle 12 Fehler dauerhaft **und** baut Content/Relevanz auf.
2. **Falls (noch) nicht möglich:** als Sofort-Fix die internen Links auf diese vier URLs entfernen/umbiegen, die Seiten aus `sitemap.xml` nehmen und keine Canonicals darauf setzen.

> Zusatzbefund: Die defekten Links stammen von der **`www.`-Variante** (`www.agenticit.ch/...`). Sicherstellen, dass `www` sauber per **301 auf die Nicht-www-Version** weiterleitet (in Vercel: Domain-Redirect konfigurieren).

---

## 2. KRITISCH — Schema-Markup-Fehler auf der Startseite

**Fehler #45 (3×):** Das JSON-LD vom Typ `SoftwareApplication` ist ungültig — die laut Google **erforderlichen Felder `aggregateRating` und `review` fehlen**.

- **Fix:** `SoftwareApplication`-Block entfernen und durch `ProfessionalService` ersetzen (richtiger Typ für eine Agentur, ohne Rating-Pflicht).
- **Datei:** `homepage-schema-fix.html` (liegt bei) — fertiges JSON-LD zum Einsetzen.
- **Compliance:** **keine Bewertungen erfinden.** Sobald echte, verifizierbare Kundenbewertungen vorliegen, kann `aggregateRating` sauber ergänzt werden.

> Die übrigen Schema-Typen sind bereits valide und bleiben: Organization (35 Items), FAQPage (13), BreadcrumbList (12), Sitelinks-Searchbox (21). Gute Arbeit — das ist die Basis für AI-Sichtbarkeit.

---

## 3. WARNUNGEN (27) — mittlere Priorität

| # | Warnung | Betroffen | Fix |
|---|---|---|---|
| 112 | Niedriges Text-/HTML-Verhältnis | 21 Seiten | Mehr **crawlbarer Fliesstext** je Seite (JS-lastige SPA → wenig sichtbarer Text). Pro Seite 150–300 Wörter echten Content ergänzen. |
| 117 | Geringe Wortzahl | 3 Seiten | Dünne Seiten inhaltlich ausbauen (s. Content-Cluster). |
| 14 | Defekte externe Bilder | 2 | Bildquellen prüfen/ersetzen. |
| 102 | Title zu lang | 1 | Startseiten-Title kürzen → siehe `meta-tags-optimierung.md`. |

Warnung #112 + #117 lösen sich grösstenteils mit dem **Content-Aufbau** (Blog + längere Seitentexte) — derselbe Hebel, der auch Rankings bringt.

---

## 4. HINWEISE (2) — niedrige Priorität, schnell erledigt

| # | Hinweis | Fix |
|---|---|---|
| 137 | `llms.txt` nicht gefunden | Datei `llms.txt` (liegt bei) im Root deployen → `https://agenticit.ch/llms.txt`. Stärkt KI-Sichtbarkeit. |
| 213 | Seite mit nur einem internen Link | Interne Verlinkung dieser Seite erhöhen (aus Nav/Footer/Content verlinken). |

---

## 5. Mitgelieferte Dateien (deploy-fertig)

| Datei | Zweck | Ablageort |
|---|---|---|
| `llms.txt` | KI-Sichtbarkeit + behebt Hinweis #137 | Root: `/llms.txt` |
| `robots.txt` | erweitert: KI-Crawler explizit erlaubt, Sitemap referenziert | Root: `/robots.txt` (bestehende ersetzen) |
| `homepage-schema-fix.html` | korrigiertes JSON-LD (behebt Fehler #45) | `<head>` der Startseite + /revops |
| `meta-tags-optimierung.md` | optimierte Titles/Descriptions je Seite | je Seiten-Metadata |

---

## 6. Umsetzungs-Reihenfolge (für die Workforce)

1. **`www` → non-www** 301-Redirect in Vercel sicherstellen.
2. **Vier 404-Routen** bauen (oder Links + Sitemap-Einträge entfernen). → −12 Fehler.
3. **Startseiten-Schema** ersetzen (`homepage-schema-fix.html`). → −3 Fehler. **Damit: 0 Fehler.**
4. **`llms.txt` + neue `robots.txt`** ins Root deployen.
5. **Meta-Tags** gemäss `meta-tags-optimierung.md` aktualisieren.
6. **Seitentexte** verlängern (Warnung #112/#117) — parallel zum Content-Aufbau.
7. **Re-Audit** in Semrush starten und Ergebnis prüfen (Ziel: Health 95 %+, 0 Fehler).

---

## 7. Was NICHT über Code läuft — bitte manuell anstossen

### Google Search Console (Pflicht — liefert echte Klickdaten)
1. `search.google.com/search-console` → Property `agenticit.ch` hinzufügen (Domain-Property via DNS-TXT, bei der Domain-Registrar/Vercel hinterlegen).
2. `sitemap.xml` einreichen.
3. Nach Fix: betroffene URLs zur erneuten Indexierung anstossen.
4. Optional: **Bing Webmaster Tools** analog (speist auch ChatGPT-Suche).

### Semrush
- Projekt `agenticit.ch` existiert bereits (Site Audit, Backlink Audit, SEO Ideas, Position Tracking aktiv). ✅
- **Google Analytics im Audit verbinden** (aktuell „NOT CONNECTED") — bessere Daten.
- **Position Tracking** mit den Ziel-Keywords füllen: `revops`, `revenue operations`, `online marketing agentur schweiz`, `performance marketing schweiz`, `leadgenerierung schweiz`, `neukundengewinnung`.
- Nach dem Deploy: **Re-Audit** laufen lassen.

### Google Business Profile
- Anlegen/verifizieren für lokale + KI-/Map-Sichtbarkeit in der Deutschschweiz (NAP konsistent zu Impressum: Agentic IT GmbH, +41 76 202 01 36).

---

## 8. Erwartetes Ergebnis nach Umsetzung

| | Vorher | Nach Fix |
|---|---|---|
| Fehler | 15 | **0** |
| Warnungen | 27 | < 5 |
| Site Health | 86 % | **95 %+** |
| AI Search Score | 89 | 92–95 |

Damit ist die technische Basis „sauber" — und alle weiteren Effekte (Rankings, Traffic) hängen dann nur noch an **Content + Backlinks** gemäss Strategie-Report.

---

*Human-in-the-Loop: Alle Code-Änderungen vor dem Live-Deploy prüfen und auf einer Vorschau-/Preview-Deployment in Vercel testen. Keine Bewertungen oder Kennzahlen erfinden (Schema). Änderungen sind richtlinien- und DSGVO-konform.*
