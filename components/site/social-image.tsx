import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const socialImageSize = { width: 1200, height: 630 }

export async function createSocialImage(input: {
  title: string
  description: string
  category?: string
}) {
  const logo = await readFile(join(process.cwd(), "public/journey-brand.svg"))

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f4f7f1",
          color: "#1b261e",
          padding: "48px 56px 0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* The existing vector is embedded locally, without an external request. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
              width={48}
              height={48}
              alt=""
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 40,
                letterSpacing: -2,
              }}
            >
              <span style={{ fontWeight: 700 }}>Agentic</span>
              <span>IT</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 19,
              color: "#506443",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 9,
                background: "#8ce14d",
              }}
            />
            Schweizer Lösungen für KMU
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "28px 0 36px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 17,
              fontWeight: 700,
              color: "#54753b",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {input.category ?? "Marketing · Sales · Digitalisierung & KI"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: input.title.length > 65 ? 59 : 68,
              lineHeight: 1.06,
              letterSpacing: -3,
              fontWeight: 700,
              maxWidth: 1040,
            }}
          >
            {input.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 25,
              lineHeight: 1.4,
              color: "#59685e",
              maxWidth: 980,
              marginTop: 24,
            }}
          >
            {input.description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#1b2d20",
            color: "#f4f7f1",
            borderRadius: "18px 18px 0 0",
            padding: "24px 30px",
            fontSize: 22,
          }}
        >
          <span>Ein Partner. Von der Idee bis zum Betrieb.</span>
          <span style={{ color: "#a1ec6d", fontWeight: 700 }}>
            agenticit.ch ↗
          </span>
        </div>
      </div>
    ),
    socialImageSize,
  )
}
