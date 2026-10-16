import {
  CONSENT_CHANGED_EVENT,
  readConsent,
  type ConsentChoice,
} from "./consent"

type Categories = Pick<ConsentChoice, "statistics" | "marketing">
const SCRIPT_ID = "agenticit-tag-manager"

/** Basic consent mode: optional Google tags have no network request before consent. */
export function mountConsentTagManager() {
  if (typeof window === "undefined" || typeof document === "undefined")
    return () => {}
  let previous: Categories | null = readConsent()
  let loaded = Boolean(document.getElementById(SCRIPT_ID))

  const update = (choice: Categories | null) => {
    if (!choice) return
    const withdrawn =
      loaded &&
      previous &&
      ((previous.statistics && !choice.statistics) ||
        (previous.marketing && !choice.marketing))
    previous = choice
    if (withdrawn) {
      // Removing a script element cannot undo executed tags. A fresh page applies
      // the saved choice before any optional container is allowed to load again.
      window.location.reload()
      return
    }
    if (loaded || (!choice.statistics && !choice.marketing)) return
    loaded = true
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })
    const script = document.createElement("script")
    script.id = SCRIPT_ID
    script.async = true
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-K4TN9PVZ"
    document.head.appendChild(script)
  }

  const onChange = (event: Event) => {
    const choice = (event as CustomEvent<Categories>).detail
    if (
      typeof choice?.statistics !== "boolean" ||
      typeof choice?.marketing !== "boolean"
    )
      return
    update(choice)
  }
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange)
  update(previous)
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange)
}
