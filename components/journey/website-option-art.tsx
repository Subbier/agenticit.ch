export function WebsiteOptionArt({
  variant,
  selected = false,
}: {
  variant: string
  selected?: boolean
}) {
  const dark = ["bold", "landing", "sales", "soon"].includes(variant)
  const personal = ["personal", "trust", "help"].includes(variant)
  const shop = ["shop", "ready"].includes(variant)
  const calendar = ["bookings", "quarter", "later", "explore"].includes(variant)
  const accent =
    variant === "editorial"
      ? "#776194"
      : dark
        ? "#B4E981"
        : personal
          ? "#54A99B"
          : "#6E9A50"
  const surface = dark ? "#1C3026" : "#FFFFFF"
  const line = dark ? "#DCEBD8" : "#2B4737"
  return (
    <svg
      viewBox="0 0 360 160"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="360"
        height="160"
        rx="10"
        fill={dark ? "#DCE6D5" : "#EDF1E8"}
      />
      <rect
        x="32"
        y="17"
        width="296"
        height="130"
        rx="7"
        fill={surface}
        stroke="#CAD7C4"
      />
      <rect
        x="32"
        y="17"
        width="296"
        height="18"
        rx="7"
        fill={dark ? "#334C3D" : "#E4EBDE"}
      />
      {[43, 51, 59].map((x) => (
        <circle key={x} cx={x} cy="26" r="2" fill="#7B9373" />
      ))}
      <rect x="49" y="45" width="32" height="6" rx="2" fill={accent} />
      {[251, 275, 299].map((x) => (
        <rect
          key={x}
          x={x}
          y="47"
          width="15"
          height="3"
          rx="1"
          fill={line}
          opacity=".45"
        />
      ))}
      {calendar ? (
        <>
          <rect
            x="58"
            y="62"
            width="112"
            height="70"
            rx="5"
            fill={dark ? "#344E3E" : "#EDF3E7"}
          />
          <rect x="66" y="69" width="96" height="12" rx="2" fill={accent} />
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={69 + col * 18}
                y={88 + row * 13}
                width="11"
                height="7"
                rx="2"
                fill={row === 1 && col === 2 ? accent : "#C7D5C0"}
              />
            )),
          )}
          <rect x="193" y="70" width="85" height="6" rx="2" fill={line} />
          <rect
            x="193"
            y="84"
            width="105"
            height="4"
            rx="2"
            fill={line}
            opacity=".3"
          />
          <rect
            x="193"
            y="97"
            width="75"
            height="4"
            rx="2"
            fill={line}
            opacity=".3"
          />
          <rect x="193" y="115" width="69" height="14" rx="4" fill={accent} />
        </>
      ) : shop ? (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={58 + i * 84}
                y="65"
                width="72"
                height="43"
                rx="4"
                fill={i === 1 ? "#DCEBCF" : "#E5E8F0"}
              />
              <path
                d={`M${79 + i * 84} 82 l8 -7 9 7 -3 15 h-11z`}
                fill={i === 1 ? accent : "#9AA8C0"}
              />
              <rect
                x={58 + i * 84}
                y="116"
                width="52"
                height="4"
                rx="2"
                fill={line}
              />
              <rect
                x={58 + i * 84}
                y="125"
                width="30"
                height="3"
                rx="1"
                fill={line}
                opacity=".3"
              />
            </g>
          ))}
        </>
      ) : personal ? (
        <>
          <rect x="213" y="62" width="94" height="73" rx="7" fill="#D0E5DF" />
          <circle cx="259" cy="85" r="13" fill="#80B4A8" />
          <path d="M232 128q0-27 27-27t27 27" fill="#3B7F70" />
          <rect x="57" y="72" width="125" height="7" rx="2" fill={line} />
          <rect
            x="57"
            y="87"
            width="110"
            height="5"
            rx="2"
            fill={line}
            opacity=".35"
          />
          <rect
            x="57"
            y="98"
            width="92"
            height="4"
            rx="2"
            fill={line}
            opacity=".25"
          />
          <rect x="57" y="116" width="72" height="15" rx="4" fill={accent} />
        </>
      ) : variant === "editorial" ? (
        <>
          <rect x="49" y="61" width="263" height="60" rx="3" fill="#D9D6E3" />
          <circle cx="249" cy="79" r="10" fill="#B9B0CD" />
          <path d="M49 121l64-39 47 31 56-30 96 38" fill="#9B8DAD" />
          <rect x="66" y="77" width="107" height="7" rx="2" fill="white" />
          <rect x="66" y="92" width="80" height="4" rx="2" fill="white" />
          <rect x="49" y="130" width="175" height="4" rx="2" fill={line} />
        </>
      ) : variant === "new" ? (
        <>
          <rect
            x="73"
            y="65"
            width="215"
            height="68"
            rx="5"
            stroke="#9DB38F"
            strokeDasharray="5 4"
            fill="#F5F8F1"
          />
          <circle cx="180" cy="99" r="19" fill="#DCEACF" />
          <path
            d="M180 90v18m-9-9h18"
            stroke="#537D3A"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <rect x="57" y="71" width="139" height="7" rx="2" fill={line} />
          <rect
            x="57"
            y="85"
            width="113"
            height="6"
            rx="2"
            fill={line}
            opacity=".8"
          />
          <rect
            x="57"
            y="100"
            width="126"
            height="4"
            rx="2"
            fill={line}
            opacity=".3"
          />
          <rect x="57" y="117" width="76" height="14" rx="4" fill={accent} />
          <rect
            x="219"
            y="64"
            width="87"
            height="68"
            rx="5"
            fill={dark ? "#42614A" : "#DCE8D0"}
          />
          {variant === "inquiries" ? (
            <>
              <rect x="230" y="75" width="65" height="11" rx="3" fill="white" />
              <rect x="230" y="92" width="65" height="11" rx="3" fill="white" />
              <rect
                x="230"
                y="111"
                width="37"
                height="10"
                rx="3"
                fill={accent}
              />
            </>
          ) : (
            <>
              <circle cx="277" cy="83" r="10" fill={accent} />
              <path
                d="M219 132l28-32 20 20 20-18 19 30"
                fill={dark ? "#9BC37F" : "#A4C18B"}
              />
            </>
          )}
        </>
      )}
      {selected ? (
        <>
          <circle cx="316" cy="26" r="10" fill="#4D7C36" />
          <path
            d="m311 26 3 3 6-6"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : null}
    </svg>
  )
}
