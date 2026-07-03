# RASTODER — Masterpiece (standalone)

Eigenständige Next.js-Site mit der 3D-Cinematic-Experience (ausgelagert aus agenticit.ch).

## Lokal starten
```bash
cd rastoder-site
npm install
npm run dev
```

## Deployen (eigenes Vercel-Projekt)
```bash
cd rastoder-site
vercel        # einmalig: neues Projekt anlegen
vercel --prod # live
```
Danach in Vercel eine eigene Domain verbinden (z. B. rastoder.ch).

## Inhalt
- `app/` – Layout + Seite (lädt die Experience clientseitig)
- `components/rastoder/` – Scene, Shader, UI, Lib (Three.js / R3F)
- `public/rastoder/textures/` – Texturen (earth_day.jpg etc. hier ablegen)

> Hinweis: Die Erd-Texturen (`earth_day.jpg`, `earth_night.jpg`, `earth_clouds.jpg`, `earth_specular.jpg`) gehören nach `public/rastoder/textures/`.
