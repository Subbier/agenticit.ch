type ContentJumpEvent = Pick<
  MouseEvent,
  | "button"
  | "defaultPrevented"
  | "ctrlKey"
  | "altKey"
  | "metaKey"
  | "shiftKey"
  | "preventDefault"
>

type ContentTarget = Pick<HTMLElement, "focus" | "scrollIntoView">

export function jumpToMainContent(
  event: ContentJumpEvent,
  target: ContentTarget | null,
): boolean {
  if (
    !target ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey ||
    event.shiftKey
  )
    return false

  // Keep the URL unchanged: a fragment before a client-side route transition
  // can restore the previous address without restoring its page content.
  event.preventDefault()
  target.focus({ preventScroll: true })
  target.scrollIntoView({ block: "start" })
  return true
}
