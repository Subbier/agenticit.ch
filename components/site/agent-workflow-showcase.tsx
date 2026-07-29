"use client"

// Agent-Workflow-Showcase auf der Startseite (29.07.2026).
//
// Herkunft: das Cowork-Artefakt "AgenticIT Geschäftsfälle" (Fall 01 Speed-to-Lead,
// 10 Schritte, Carbon & Signal). Das SVG ist 1:1 übernommen — Icons, orthogonale
// Konnektoren und die gestaffelten CSS-Verzögerungen.
//
// Zwei Anpassungen gegenüber dem Artefakt:
//   1. Überschriften kleiner und an die Startseiten-Typografie angepasst.
//   2. Die Animation läuft in Dauerschleife: alle Schritte erscheinen nacheinander,
//      danach eine kurze Pause, dann beginnt die Sequenz von vorne. Umgesetzt über
//      einen Zähler als React-key — das erzwingt einen Neuaufbau und startet damit
//      die CSS-Animationen neu.
//
// Wer "Bewegung reduzieren" im Betriebssystem eingeschaltet hat, sieht den
// fertigen Graphen ohne Animation und ohne Schleife (siehe globals.css).

import { useEffect, useState } from "react"

/** Letzte Verzögerung 5,8 s + Animationsdauer 1,6 s = rund 7,5 s bis alles steht. */
const SEQUENCE_MS = 7500
/** Standzeit, bevor die Sequenz neu startet. */
const PAUSE_MS = 2400

const DEFS_SVG = `<defs>
    <marker id="ah" viewBox="0 0 10 8" refX="8.5" refY="4" markerWidth="9" markerHeight="7" orient="auto-start-reverse">
      <path d="M0.8 0.8 9 4 0.8 7.2z" fill="#C8F04B"/>
    </marker>
    <marker id="ahg" viewBox="0 0 10 8" refX="8.5" refY="4" markerWidth="9" markerHeight="7" orient="auto-start-reverse"><path d="M0.8 0.8 9 4 0.8 7.2z" fill="#34C98A"/></marker>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/>
    </filter>
    <g id="ic-lead"><rect width="30" height="30" rx="9" fill="#C8F04B"/><path d="M17 5 11 16h4.4l-1.3 8L20 13h-4.4l1-8z" fill="#1A2400"/></g>
    <g id="ic-outlook"><rect width="30" height="30" rx="9" fill="#0F6CBD"/><rect x="10" y="7" width="16" height="11.5" rx="1.8" fill="#fff" opacity=".95"/><path d="m10 8 8 5.2 8-5.2" stroke="#0F6CBD" stroke-width="1.4" fill="none"/><circle cx="10.5" cy="20.5" r="6.6" fill="#28A8EA" stroke="#fff" stroke-width="1.3"/><text x="10.5" y="23.7" fill="#fff" font-size="8.6" font-weight="700" text-anchor="middle" font-family="Inter,Arial">O</text></g>
    <g id="ic-claude"><rect width="30" height="30" rx="9" fill="#D97757"/><g transform="translate(15,15)" stroke="#fff" stroke-width="2.3" stroke-linecap="round"><line x1="0" y1="-8" x2="0" y2="-3.6"/><line x1="0" y1="3.6" x2="0" y2="8"/><line x1="-8" y1="0" x2="-3.6" y2="0"/><line x1="3.6" y1="0" x2="8" y2="0"/><line x1="-5.7" y1="-5.7" x2="-2.5" y2="-2.5"/><line x1="2.5" y1="2.5" x2="5.7" y2="5.7"/><line x1="-5.7" y1="5.7" x2="-2.5" y2="2.5"/><line x1="2.5" y1="-2.5" x2="5.7" y2="-5.7"/></g></g>
    <g id="ic-missed"><rect width="30" height="30" rx="9" fill="#2A1430"/><path d="M7 21c3.5 2.6 10.5 2.6 14 0l-1.8-3.4c-2.6 1.3-7.8 1.3-10.4 0z" fill="#E879F9"/><path d="m18 5 5.4 5.4M23.4 5 18 10.4" stroke="#E879F9" stroke-width="2" stroke-linecap="round"/></g>
    <g id="ic-clock"><rect width="30" height="30" rx="9" fill="#242B34"/><circle cx="15" cy="15" r="8.6" stroke="#C7D3DF" stroke-width="1.8" fill="none"/><path d="M15 10v5.4l3.4 2" stroke="#C7D3DF" stroke-width="1.8" stroke-linecap="round" fill="none"/></g>
    <g id="ic-wa"><rect width="30" height="30" rx="9" fill="#25D366"/><path d="M15 5a9.6 9.6 0 0 0-8.3 14.4l-1.3 4.6 4.9-1.3A9.6 9.6 0 1 0 15 5z" fill="#fff"/><path d="M11.6 10.7c-.35 0-.7.17-.9.44-.87.96-.7 2.6.26 4.2 1 1.66 2.6 3.06 4.55 3.76 1.3.52 2.36.44 3.06-.26.26-.26.35-.7.26-1.05l-.17-.78c-.09-.26-.44-.44-.7-.35l-1.5.35c-.87-.44-2.36-1.57-2.9-2.53l.7-1.3c.09-.26 0-.6-.17-.78l-.6-.6a.9.9 0 0 0-.7-.26l-1.2-.35z" fill="#25D366"/></g>
    <g id="ic-ms"><rect width="30" height="30" rx="9" fill="#fff"/><rect x="7.5" y="7.5" width="7" height="7" fill="#F25022"/><rect x="16.5" y="7.5" width="7" height="7" fill="#7FBA00"/><rect x="7.5" y="16.5" width="7" height="7" fill="#00A4EF"/><rect x="16.5" y="16.5" width="7" height="7" fill="#FFB900"/></g>
    <g id="ic-db"><rect width="30" height="30" rx="9" fill="#0F2A3C"/><ellipse cx="15" cy="8.5" rx="8" ry="3" stroke="#57C7FF" stroke-width="1.7" fill="none"/><path d="M7 8.5v6.4c0 1.7 3.6 3 8 3s8-1.3 8-3V8.5M7 14.9v6.4c0 1.7 3.6 3 8 3s8-1.3 8-3v-6.4" stroke="#57C7FF" stroke-width="1.7" fill="none"/></g>
    <g id="ic-human"><rect width="30" height="30" rx="9" fill="#1F9A5E"/><circle cx="15" cy="11" r="4.4" stroke="#fff" stroke-width="1.7" fill="none"/><path d="M8 25c1-3.8 3.8-5.7 7-5.7s6 1.9 7 5.7" stroke="#fff" stroke-width="1.7" stroke-linecap="round" fill="none"/></g>
  </defs>`
const DESK_SVG = `<svg class="g-desk" viewBox="0 0 1140 262">
      <path class="e" style="animation-delay:0.2s"  d="M164 70 H210" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:0.8s"  d="M384 70 H430" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:1.4s"  d="M588 70 H634" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:2s"   d="M836 70 H882" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:2.6s" d="M1016 70 H1082 Q1090 70 1090 78 V192 Q1090 200 1082 200 H1048" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:3.4s" d="M870 200 H828" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:4s"   d="M672 200 H630" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:4.6s" d="M436 200 H394" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:5.2s" d="M246 200 H204" marker-end="url(#ah)"/>
      <path class="e dash" style="animation-delay:2.4s" d="M560 102 V116"/>
      <path class="e dash" style="animation-delay:3s" d="M560 148 V158 H747 V166" marker-end="url(#ahg)"/>
      <g fill="#0A1626" stroke="#C8F04B" stroke-width="1.5">
        <circle class="n" style="animation-delay:0.5s" cx="164" cy="70" r="4"/><circle class="n" style="animation-delay:0.5s" cx="216" cy="70" r="4"/>
        <circle class="n" style="animation-delay:1.1s" cx="384" cy="70" r="4"/><circle class="n" style="animation-delay:1.1s" cx="436" cy="70" r="4"/>
        <circle class="n" style="animation-delay:1.7s" cx="588" cy="70" r="4"/><circle class="n" style="animation-delay:1.7s" cx="640" cy="70" r="4"/>
        <circle class="n" style="animation-delay:2.3s" cx="836" cy="70" r="4"/><circle class="n" style="animation-delay:2.3s" cx="888" cy="70" r="4"/>
        <circle class="n" style="animation-delay:2.9s" cx="1016" cy="70" r="4"/><circle class="n" style="animation-delay:3.6s" cx="1042" cy="200" r="4"/>
        <circle class="n" style="animation-delay:3.7s" cx="870" cy="200" r="4"/><circle class="n" style="animation-delay:4.1s" cx="822" cy="200" r="4"/>
        <circle class="n" style="animation-delay:4.2s" cx="672" cy="200" r="4"/><circle class="n" style="animation-delay:4.7s" cx="624" cy="200" r="4"/>
        <circle class="n" style="animation-delay:4.8s" cx="436" cy="200" r="4"/><circle class="n" style="animation-delay:5.3s" cx="388" cy="200" r="4"/>
        <circle class="n" style="animation-delay:5.4s" cx="246" cy="200" r="4"/><circle class="n" style="animation-delay:5.8s" cx="198" cy="200" r="4"/>
      </g>
      <circle class="n" style="animation-delay:2.6s" cx="560" cy="102" r="4" fill="#0A1626" stroke="#C8F04B" stroke-width="1.5"/>
      <circle class="n" style="animation-delay:3.2s" cx="747" cy="174" r="4.5" fill="#0A1626" stroke="#C8F04B" stroke-width="1.5"/>

      <g class="n" style="animation-delay:0.1s" filter="url(#sh)">
        <rect x="36" y="44" width="128" height="52" rx="13" fill="#1E2631" stroke="#C8F04B" stroke-opacity=".55"/>
        <use href="#ic-lead" x="47" y="55"/>
        <text class="ntit" x="88" y="76" fill="#F0F6EC">Lead</text>
      </g>
      <g class="n" style="animation-delay:0.7s" filter="url(#sh)">
        <rect x="216" y="44" width="168" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-outlook" x="227" y="55"/>
        <text class="ntit" x="268" y="76" fill="#EDF2F7">Follow-up</text>
      </g>
      <g class="n" style="animation-delay:1.3s" filter="url(#sh)">
        <rect x="436" y="44" width="152" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-claude" x="447" y="55"/>
        <text class="ntit" x="488" y="76" fill="#F6EAE3">KI-Anruf</text>
      </g>
      <g class="n" style="animation-delay:1.9s" filter="url(#sh)">
        <rect x="640" y="44" width="196" height="52" rx="13" fill="#1E2631" stroke="#E879F9" stroke-opacity=".4"/>
        <use href="#ic-missed" x="651" y="55"/>
        <text class="ntit" x="692" y="76" fill="#FBEFE0">Nicht erreicht</text>
      </g>
      <g class="n" style="animation-delay:2.7s" filter="url(#sh)">
        <rect x="888" y="44" width="128" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-clock" x="899" y="55"/>
        <text class="ntit" x="940" y="76" fill="#DDE3EA">+5 Min</text>
      </g>
      <g class="n" style="animation-delay:2.6s">
        <rect x="494" y="116" width="132" height="32" rx="10" fill="rgba(31,154,94,.14)" stroke="#34C98A" stroke-dasharray="5 5"/>
        <text x="514" y="137" fill="#9BE8C0" font-size="12.5" font-weight="600" font-family="Space Grotesk,Arial">Erreicht ✓</text>
      </g>
      <g class="n" style="animation-delay:3.2s" filter="url(#sh)">
        <rect x="870" y="174" width="172" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-wa" x="881" y="185"/>
        <text class="ntit" x="922" y="206" fill="#E9FBEF">WhatsApp</text>
      </g>
      <g class="n" style="animation-delay:3.9s" filter="url(#sh)">
        <rect x="672" y="174" width="150" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-ms" x="683" y="185"/>
        <text class="ntit" x="724" y="206" fill="#F2F5F8">Termin</text>
      </g>
      <g class="n" style="animation-delay:4.5s" filter="url(#sh)">
        <rect x="436" y="174" width="188" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-db" x="447" y="185"/>
        <text class="ntit" x="488" y="206" fill="#E7F6FF">Anreicherung</text>
      </g>
      <g class="n" style="animation-delay:5.1s" filter="url(#sh)">
        <rect x="246" y="174" width="142" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-claude" x="257" y="185"/>
        <text class="ntit" x="298" y="206" fill="#F6EAE3">Persona</text>
      </g>
      <g class="n" style="animation-delay:5.7s" filter="url(#sh)">
        <rect x="36" y="174" width="162" height="52" rx="13" fill="#122019" stroke="#1F9A5E" stroke-opacity=".85"/>
        <use href="#ic-human" x="47" y="185"/>
        <text class="ntit" x="88" y="206" fill="#DEF7EA">Übergabe</text>
      </g>
    </svg>`
const MOB_SVG  = `<svg class="g-mob" viewBox="0 0 380 940">
      <path class="e" style="animation-delay:0.4s"  d="M140 72 V106" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:1s"  d="M140 164 V198" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:1.6s"  d="M140 256 V290" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:2.2s" d="M140 348 V382" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:2.8s" d="M140 440 V474" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:3.4s" d="M140 532 V566" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:4s"   d="M140 624 V658" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:4.6s" d="M140 716 V750" marker-end="url(#ah)"/>
      <path class="e" style="animation-delay:5.2s" d="M140 808 V842" marker-end="url(#ah)"/>
      <path class="e dash" style="animation-delay:2s" d="M256 230 H302"/>
      <path class="e dash" style="animation-delay:2.6s" d="M330 250 V598 H262" marker-end="url(#ahg)"/>
      <g fill="#0A1626" stroke="#C8F04B" stroke-width="1.5">
        <circle class="n" style="animation-delay:0.6s" cx="140" cy="72" r="4"/><circle class="n" style="animation-delay:0.6s" cx="140" cy="112" r="4"/>
        <circle class="n" style="animation-delay:1.2s" cx="140" cy="164" r="4"/><circle class="n" style="animation-delay:1.2s" cx="140" cy="204" r="4"/>
        <circle class="n" style="animation-delay:1.8s" cx="140" cy="256" r="4"/><circle class="n" style="animation-delay:1.8s" cx="140" cy="296" r="4"/>
        <circle class="n" style="animation-delay:2.4s" cx="140" cy="348" r="4"/><circle class="n" style="animation-delay:2.4s" cx="140" cy="388" r="4"/>
        <circle class="n" style="animation-delay:3s" cx="140" cy="440" r="4"/><circle class="n" style="animation-delay:3s" cx="140" cy="480" r="4"/>
        <circle class="n" style="animation-delay:3.6s" cx="140" cy="532" r="4"/><circle class="n" style="animation-delay:3.6s" cx="140" cy="572" r="4"/>
        <circle class="n" style="animation-delay:4.2s" cx="140" cy="624" r="4"/><circle class="n" style="animation-delay:4.2s" cx="140" cy="664" r="4"/>
        <circle class="n" style="animation-delay:4.8s" cx="140" cy="716" r="4"/><circle class="n" style="animation-delay:4.8s" cx="140" cy="756" r="4"/>
        <circle class="n" style="animation-delay:5.4s" cx="140" cy="808" r="4"/><circle class="n" style="animation-delay:5.4s" cx="140" cy="848" r="4"/>
      </g>
      <circle class="n" style="animation-delay:2.2s" cx="256" cy="230" r="4" fill="#0A1626" stroke="#C8F04B" stroke-width="1.5"/>
      <circle class="n" style="animation-delay:2.8s" cx="268" cy="598" r="4.5" fill="#0A1626" stroke="#C8F04B" stroke-width="1.5"/>
      <g class="n" style="animation-delay:0.1s" filter="url(#sh)">
        <rect x="24" y="20" width="232" height="52" rx="13" fill="#1E2631" stroke="#C8F04B" stroke-opacity=".55"/>
        <use href="#ic-lead" x="35" y="31"/><text class="ntit" x="76" y="52" fill="#F0F6EC">Lead</text>
      </g>
      <g class="n" style="animation-delay:0.7s" filter="url(#sh)">
        <rect x="24" y="112" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-outlook" x="35" y="123"/><text class="ntit" x="76" y="144" fill="#EDF2F7">Follow-up</text>
      </g>
      <g class="n" style="animation-delay:1.3s" filter="url(#sh)">
        <rect x="24" y="204" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-claude" x="35" y="215"/><text class="ntit" x="76" y="236" fill="#F6EAE3">KI-Anruf</text>
      </g>
      <g class="n" style="animation-delay:1.9s" filter="url(#sh)">
        <rect x="24" y="296" width="232" height="52" rx="13" fill="#1E2631" stroke="#E879F9" stroke-opacity=".4"/>
        <use href="#ic-missed" x="35" y="307"/><text class="ntit" x="76" y="328" fill="#FBEFE0">Nicht erreicht</text>
      </g>
      <g class="n" style="animation-delay:2.5s" filter="url(#sh)">
        <rect x="24" y="388" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-clock" x="35" y="399"/><text class="ntit" x="76" y="420" fill="#DDE3EA">+5 Min</text>
      </g>
      <g class="n" style="animation-delay:3.1s" filter="url(#sh)">
        <rect x="24" y="480" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-wa" x="35" y="491"/><text class="ntit" x="76" y="512" fill="#E9FBEF">WhatsApp</text>
      </g>
      <g class="n" style="animation-delay:3.7s" filter="url(#sh)">
        <rect x="24" y="572" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-ms" x="35" y="583"/><text class="ntit" x="76" y="604" fill="#F2F5F8">Termin</text>
      </g>
      <g class="n" style="animation-delay:4.3s" filter="url(#sh)">
        <rect x="24" y="664" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-db" x="35" y="675"/><text class="ntit" x="76" y="696" fill="#E7F6FF">Anreicherung</text>
      </g>
      <g class="n" style="animation-delay:4.9s" filter="url(#sh)">
        <rect x="24" y="756" width="232" height="52" rx="13" fill="#1E2631" stroke="rgba(255,255,255,.16)"/>
        <use href="#ic-claude" x="35" y="767"/><text class="ntit" x="76" y="788" fill="#F6EAE3">Persona</text>
      </g>
      <g class="n" style="animation-delay:5.5s" filter="url(#sh)">
        <rect x="24" y="848" width="232" height="52" rx="13" fill="#122019" stroke="#1F9A5E" stroke-opacity=".85"/>
        <use href="#ic-human" x="35" y="859"/><text class="ntit" x="76" y="880" fill="#DEF7EA">Übergabe</text>
      </g>
      <g class="n" style="animation-delay:2.3s">
        <rect x="302" y="210" width="56" height="40" rx="10" fill="rgba(31,154,94,.14)" stroke="#34C98A" stroke-dasharray="5 5"/>
        <text x="311" y="228" fill="#9BE8C0" font-size="10" font-weight="600" font-family="Space Grotesk,Arial">Erreicht</text>
        <text x="322" y="242" fill="#9BE8C0" font-size="10" font-weight="600" font-family="Space Grotesk,Arial">✓</text>
      </g>
    </svg>`

const STYLES = `
/* --- Agent-Workflow-Showcase · alles unter .awf gekapselt --- */
.awf{background:#0A0C10;padding:64px 0 72px}
.awf-inner{margin:0 auto;max-width:1120px;padding:0 24px}
.awf-eyebrow{display:block;font-family:var(--font-jetbrains-mono),ui-monospace,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8FE05A}
/* Überschrift bewusst kleiner als im Artefakt: hier ist sie eine Sektions-
   überschrift auf der Startseite, keine Seitenüberschrift. */
.awf-title{margin-top:10px;font-family:var(--font-display),var(--font-space-grotesk),system-ui,sans-serif;font-weight:700;font-size:clamp(21px,2.6vw,30px);line-height:1.18;letter-spacing:-.015em;color:#fff}
.awf-title em{font-style:normal;color:#C8F04B}
.awf-lead{margin-top:8px;font-family:var(--font-carbon-text),system-ui,sans-serif;font-size:14.5px;color:#8B94A1}
.awf-lead b{color:#C8F04B;font-weight:700}
.awf-frame{position:relative;margin-top:26px;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:20px;background:#141A24;padding:32px 24px 24px}
.awf-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1.1px,transparent 1.5px);background-size:22px 22px}
.awf-graphs{position:relative}
.awf-frame svg{display:block;width:100%;height:auto}
.awf-mob{display:none}
@media(max-width:700px){
  .awf-desk{display:none}
  .awf-mob{display:block;max-width:420px;margin:0 auto}
  .awf-frame{padding:22px 14px 16px}
}
.awf .e{fill:none;stroke:#C8F04B;stroke-width:2;stroke-linecap:round;stroke-dasharray:600;stroke-dashoffset:600;animation:awf-draw 1.6s ease forwards}
.awf .e.dash{stroke:#34C98A;stroke-dasharray:5 6;stroke-dashoffset:0;opacity:0;animation:awf-fadein 1s ease forwards}
.awf .n{opacity:0;animation:awf-pop .9s ease forwards}
.awf .ntit{font-family:var(--font-display),var(--font-space-grotesk),system-ui,sans-serif;font-weight:600;font-size:15px}
.awf .nsub{font-family:var(--font-jetbrains-mono),ui-monospace,monospace;font-size:9.5px;fill:#7E8896}
@keyframes awf-draw{to{stroke-dashoffset:0}}
@keyframes awf-fadein{to{opacity:1}}
@keyframes awf-pop{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
/* Bewegung reduzieren: fertiger Graph, keine Animation, keine Schleife. */
@media(prefers-reduced-motion:reduce){
  .awf .e,.awf .e.dash{animation:none;stroke-dashoffset:0;opacity:1}
  .awf .n{animation:none;opacity:1}
}
/* --- Eingebettete Variante: sitzt direkt im dunklen Hero (29.07.2026) ---
   Kein eigener Hintergrund/Abstand, deutlich kleinere Überschrift —
   der Hero liefert Badge, H1 und Intro bereits selbst. */
.awf--embedded{background:transparent;padding:0}
.awf--embedded .awf-inner{max-width:none;padding:0}
.awf--embedded .awf-title{margin-top:8px;font-size:clamp(20px,2.5vw,28px);text-align:center}
.awf--embedded .awf-lead{font-size:14px;text-align:center}
.awf--embedded .awf-frame{margin-top:16px}
`

type AgentWorkflowShowcaseProps = {
  /** true = Variante für den Hero: transparent, ohne Eyebrow, kleine Überschrift. */
  embedded?: boolean
}

export function AgentWorkflowShowcase({ embedded = false }: AgentWorkflowShowcaseProps) {
  const [run, setRun] = useState(0)

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const id = setInterval(() => setRun((n) => n + 1), SEQUENCE_MS + PAUSE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={embedded ? "awf awf--embedded" : "awf"} aria-labelledby="awf-title">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="awf-inner">
        {!embedded && <span className="awf-eyebrow">AgenticIT · Agent-Workflows</span>}
        <h2 id="awf-title" className="awf-title">
          Speed-to-Lead. Von Agenten <em>erledigt</em>.
        </h2>
        <p className="awf-lead">
          Einer von <b>380</b> automatisierten Workflows.
        </p>

        <div className="awf-frame">
          <div className="awf-dots" aria-hidden="true" />
          {/* Icon-Definitionen einmalig, ausserhalb der Schleife */}
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"
               dangerouslySetInnerHTML={{ __html: DEFS_SVG }} />

          {/* key erzwingt bei jedem Durchlauf einen Neuaufbau → CSS-Animation startet neu */}
          <div key={run} className="awf-graphs">
            <div className="awf-desk" role="img"
                 aria-label="Ablauf: Lead, Follow-up, KI-Anruf, nicht erreicht, fünf Minuten später WhatsApp, Termin, Anreicherung, Persona, Übergabe an einen Kundenberater"
                 dangerouslySetInnerHTML={{ __html: DESK_SVG }} />
            <div className="awf-mob" aria-hidden="true"
                 dangerouslySetInnerHTML={{ __html: MOB_SVG }} />
          </div>
        </div>
      </div>
    </section>
  )
}
