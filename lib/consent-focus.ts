type FocusTarget = Pick<HTMLElement, "isConnected" | "focus">

export function restoreConsentFocus(
  preferred: FocusTarget | null,
  fallback: FocusTarget | null,
) {
  const target = preferred?.isConnected
    ? preferred
    : fallback?.isConnected
      ? fallback
      : null
  if (!target) return false
  target.focus({ preventScroll: true })
  return true
}
