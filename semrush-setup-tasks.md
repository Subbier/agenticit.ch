# Semrush-Setup — Task-Liste für Cloud-Browser-Agent

**Ziel:** Semrush für die Domain `agenticit.ch` vollständig einrichten (SEO-Projekt + Advertising/PPC).
**Markt:** Schweiz · **Sprache:** Deutsch · **GA4:** `G-3NGDK2RM3B` · **GSC:** agenticit.ch (per DNS verifiziert)

> Hinweise (nicht an den Agenten, nur für mich):
> - Abo muss **Projekte** + **Advertising/PPC-Tools** enthalten, sonst sind Schritte gesperrt.
> - Semrush ersetzt **nicht** die Google-Ads-Verwaltung — der Advertising-Teil dient Recherche + Keyword-Vorbereitung; die Kampagne läuft am Ende in Google Ads (CSV-Export aus dem PPC Keyword Tool).

---

## Agenten-Prompt (1:1 kopieren)

```
ZIEL: Semrush für die Domain agenticit.ch vollständig einrichten (SEO-Projekt + Advertising/PPC). Markt: Schweiz, Sprache: Deutsch.

== TEIL A: SEO-PROJEKT EINRICHTEN ==
1. Bei Semrush einloggen.
2. Neues Projekt anlegen: Domain "agenticit.ch", Projektname "AgenticIT".
3. Tool "Site Audit" konfigurieren und starten: Crawl-Quelle Website, bis zu 100–500 Seiten, dann Audit ausführen.
4. Tool "Position Tracking" einrichten:
   - Standort/Markt: Schweiz (Switzerland), Sprache: Deutsch.
   - Gerät: Desktop UND Mobil.
   - Folgende Keywords hinzufügen:
     Chatbot
     AI Agents
     WhatsApp Business
     Marketing Automation
     Google Ads Agentur
     Leadgenerierung
     KI Beratung
     Conversational AI
     Leads generieren
     Neukundenakquise
     Chatbot Unternehmen
     B2B Leadgenerierung
     Leadgenerierung Schweiz
   - 2–3 Wettbewerber-Domains hinzufügen (falls bekannt; sonst von Semrush vorgeschlagene übernehmen).
5. Google Analytics 4 (Property G-3NGDK2RM3B) mit dem Projekt verbinden.
6. Google Search Console (Property agenticit.ch, bereits per DNS verifiziert) mit dem Projekt verbinden.
7. Tool "On Page SEO Checker" aktivieren (optional, nutzt die obigen Keywords).

== TEIL B: ADVERTISING / PPC EINRICHTEN ==
8. Google-Ads-Konto mit Semrush verbinden (Advertising-Bereich → Google-Ads-Konto verknüpfen).
9. Tool "PPC Keyword Tool" öffnen, neue Kampagne "AgenticIT CH" anlegen.
10. Keywords importieren und in Anzeigengruppen sortieren:
    - Gruppe "KI/Chatbot": AI Agents, Chatbot, Conversational AI, KI Beratung, Chatbot Unternehmen
    - Gruppe "Leadgen": Leadgenerierung, Leads generieren, B2B Leadgenerierung, Leadgenerierung Schweiz, Neukundenakquise
    - Gruppe "Ads-Service": Google Ads Agentur
    - Gruppe "Messaging": WhatsApp Business
11. Match-Types setzen (Phrase + Exact als Start), Geo-Modifier Schweiz beachten.
12. Negative Keywords ergänzen: "kostenlos", "gratis", "job", "jobs", "ausbildung", "definition", "was ist", "praktikum", "selber machen".
13. Tool "Advertising Research" für 2–3 Wettbewerber öffnen: deren bezahlte Keywords und Anzeigentexte als Referenz exportieren.
14. Fertige Kampagne aus dem PPC Keyword Tool als CSV exportieren (für späteren Import in Google Ads).

== ABSCHLUSS ==
15. Bestätigen, dass Site Audit, Position Tracking, GA4- und GSC-Verbindung aktiv sind.
16. Kurze Zusammenfassung zurückgeben: was eingerichtet wurde + was manuell nachzuziehen ist.
```

---

## Keyword-Liste (Copy-Paste, CH-Nachfrage geprüft)

```
Chatbot, AI Agents, WhatsApp Business, Marketing Automation, Google Ads Agentur, Leadgenerierung, KI Beratung, Conversational AI, Leads generieren, Neukundenakquise, Chatbot Unternehmen, B2B Leadgenerierung, Leadgenerierung Schweiz
```

| Keyword | CH-Volumen | CPC (CHF) |
|---|---|---|
| Chatbot | 3 600 | 0.67 |
| AI Agents | 1 900 | 2.95 |
| WhatsApp Business | 880 | 3.83 |
| Marketing Automation | 480 | 6.65 |
| Google Ads Agentur | 390 | 16.42 |
| Leadgenerierung | 260 | 5.28 |
| KI Beratung | 170 | 7.95 |
| Conversational AI | 170 | 2.33 |
| Leads generieren | 140 | 7.28 |
| Neukundenakquise | 140 | 4.93 |
| Chatbot Unternehmen | 30 | – |
| B2B Leadgenerierung | 20 | 6.36 |
| Leadgenerierung Schweiz | 20 | 4.62 |

**Bewusst NICHT getrackt** (zu breit / falsche Suchabsicht): „KI" (40 500), „Google Ads" (22 200), „Verkauf" (2 400), „Leads" (1 900).
**In CH keine Nachfrage** (deshalb gestrichen): KI Agentur, AI Agentur, KI Automatisierung, KI Dienstleister, KI Marketing Agentur, Meta Ads Agentur, WhatsApp Business API, KI Agentur Schweiz.
