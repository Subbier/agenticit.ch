/** Mitgliedschaft & Ausbildung – weiße Linien, transparent, dunkler Footer */
export function FooterBadges() {
  return (
    <div className="flex flex-nowrap items-start gap-6">
      <a
        href="https://www.swissict.ch"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center opacity-75 transition hover:opacity-100"
        title="swissICT – Schweizer Fachverband für IT & Kommunikationstechnologie"
      >
        <span className="flex h-24 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/swissict-white.png"
            alt="swissICT – Schweizer Fachverband für IT & Kommunikationstechnologie"
            className="h-14 w-auto object-contain"
          />
        </span>
        <span className="mt-2 text-center text-[11px] leading-snug text-[#9AA6B2]">
          Schweizer Fachverband für IT &amp;
          <br />
          Kommunikationstechnologie
        </span>
      </a>
      <a
        href="/karriere"
        className="flex flex-col items-center opacity-75 transition hover:opacity-100"
        title="Wir bilden aus – Bewirb dich jetzt!"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/wir-bilden-aus.png"
          alt="Wir bilden aus – Bewirb dich jetzt!"
          className="h-24 w-24 object-contain"
        />
        <span className="mt-2 text-center text-[11px] leading-snug text-[#9AA6B2]">
          Wir bilden aus
          <br />
          Bewirb dich jetzt!
        </span>
      </a>
    </div>
  )
}
