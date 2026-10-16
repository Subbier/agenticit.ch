"use client"

import { useEffect } from "react"
import { mountConsentTagManager } from "@/lib/consent-tags"

export function ConsentTags() {
  useEffect(mountConsentTagManager, [])
  return null
}
