// Zentrale Schrift-Hierarchie der Website (eine Quelle der Wahrheit).
// Neue oder überarbeitete Seiten verwenden diese Klassen, damit Überschriften,
// Absätze und Bullets überall identisch aussehen.

export const T = {
  // Kleines, grünes Label über einer Überschrift
  eyebrow: "text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200",

  // H1 – Hero-Überschrift (eine pro Seite)
  h1: "text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance leading-tight",

  // H2 – Abschnitts-Überschrift
  h2: "text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance",

  // H2 light – ruhige CTA-/Kontakt-Überschrift
  h2Light: "text-3xl md:text-4xl font-light text-white leading-tight text-balance",

  // H3 – Karten-/Unterüberschrift
  h3: "text-xl sm:text-2xl font-bold text-white text-balance",

  // Lead – einleitender Absatz direkt unter einer Überschrift
  lead: "text-base sm:text-lg text-white/75 leading-relaxed font-light",

  // Lead groß – im Hero
  leadHero: "text-base sm:text-xl text-white/75 leading-relaxed font-light",

  // Fließtext
  body: "text-base text-white/72 leading-relaxed",

  // Kleiner Fließtext (z. B. in Karten)
  bodySm: "text-sm leading-7 text-white/65",

  // Bullet-Zeile (zusammen mit einem CheckCircle2-Icon davor)
  bullet: "flex items-start gap-3 text-sm sm:text-base text-white/80",
} as const
