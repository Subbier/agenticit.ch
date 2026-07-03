import type { DetailedHTMLProps, HTMLAttributes } from "react"

type ElevenLabsConvaiProps = HTMLAttributes<HTMLElement> & {
  "agent-id"?: string
  "signed-url"?: string
  variant?: "compact" | "expanded"
  "server-location"?: "us" | "eu-residency" | "in-residency" | "global"
  "action-text"?: string
  "start-call-text"?: string
  "end-call-text"?: string
  "listening-text"?: string
  "speaking-text"?: string
  "avatar-orb-color-1"?: string
  "avatar-orb-color-2"?: string
  dismissible?: boolean
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<ElevenLabsConvaiProps, HTMLElement>
    }
  }
}

export {}
