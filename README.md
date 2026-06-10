# AgenticIT Website

Marketing-Website der Agentic IT GmbH (agenticit.ch) – KI-Agenten, Omnichannel-Automation,
Lead Scoring und Smart Apps für Schweizer KMU. Gebaut mit Next.js 14 (App Router),
React 19, Tailwind CSS und shadcn/ui.

## Tech-Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 19, Tailwind CSS, shadcn/ui (Radix UI), Framer Motion
- **WebGL-Hintergründe:** Aurora (ogl) – clientseitig dynamisch geladen
- **Formulare/Validierung:** react-hook-form, zod
- **Analytics:** Vercel Analytics + Speed Insights
- **Sprache:** TypeScript

## Voraussetzungen

- Node.js 18+ (empfohlen: 20)
- npm (das Projekt nutzt `package-lock.json`)

## Setup & Entwicklung

```bash
npm install --legacy-peer-deps
npm run dev
```

Die Seite läuft dann unter http://localhost:3000.

Alternativ (macOS): per Doppelklick auf `START-DEV.command` bzw. `RESET-AND-START.command`.

## Skripte

| Befehl              | Zweck                                              |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Entwicklungsserver starten                         |
| `npm run dev:clean` | `.next` löschen und Entwicklungsserver starten     |
| `npm run build`     | Produktions-Build (inkl. TypeScript-Typecheck)     |
| `npm run start`     | Produktions-Build lokal ausliefern                 |
| `npm run lint`      | ESLint ausführen                                   |

## Umgebungsvariablen

Eine `.env`-Datei im Projektroot anlegen (Vorlage: `.env.example`):

```
LEADS_WEBHOOK_URL=    # Ziel-Webhook, an den eingehende Leads weitergeleitet werden
```

Ohne gesetzten `LEADS_WEBHOOK_URL` antwortet die Lead-API mit einem Konfigurationsfehler.

## Projektstruktur

```
app/            # Routen (App Router): Seiten, API-Routen, SEO (sitemap, robots)
  api/leads/    # Lead-Formular-Endpoint (Validierung, Honeypot, Rate-Limiting)
components/     # UI- und Seiten-Komponenten
  site/         # Seitenspezifische Komponenten
  ui/           # shadcn/ui-Komponenten
lib/            # Inhalte, SEO-Helfer, Typen, Datenmodelle
hooks/          # React-Hooks
public/         # Statische Assets
```

## Lead-Formular

Eingehende Leads werden in `app/api/leads/route.ts` per zod validiert, durch ein
verstecktes Honeypot-Feld (`company_website`) und ein einfaches IP-Rate-Limiting gegen
Spam geschützt und anschließend an `LEADS_WEBHOOK_URL` weitergeleitet.

## Deployment

Optimiert für Vercel. Bildoptimierung (AVIF/WebP) ist in `next.config.mjs` aktiviert.
