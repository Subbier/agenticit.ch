"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, Download, RotateCcw } from "lucide-react"
import type { BlogAction } from "@/lib/blog"
import {
  compareWebsiteOffers,
  createWebsiteComparisonText,
  emptyWebsiteCostInputs,
  formatWebsiteCost,
  websiteCostFields,
  type WebsiteCostInputs,
  type WebsiteCostKey,
  type WebsiteCostPeriod,
} from "@/lib/website-cost-comparison"
import styles from "./website-cost-comparison.module.css"

export function WebsiteCostComparison({ resource }: { resource: BlogAction }) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [offerA, setOfferA] = useState(emptyWebsiteCostInputs)
  const [offerB, setOfferB] = useState(emptyWebsiteCostInputs)
  const [months, setMonths] = useState<WebsiteCostPeriod>(36)
  const [comparable, setComparable] = useState(false)
  const [visited, setVisited] = useState<Record<string, boolean>>({})
  useEffect(() => {
    let frame: number | undefined
    function revealRequestedComparison() {
      if (window.location.hash !== "#offertenvergleich") return
      if (frame !== undefined) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!detailsRef.current) return
        detailsRef.current.open = true
        detailsRef.current.scrollIntoView({
          block: "start",
          behavior: "instant",
        })
      })
    }
    revealRequestedComparison()
    window.addEventListener("hashchange", revealRequestedComparison)
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", revealRequestedComparison)
    }
  }, [])
  const comparison = compareWebsiteOffers(offerA, offerB, months, comparable)
  const downloadText = createWebsiteComparisonText(
    offerA,
    offerB,
    months,
    comparable,
  )

  function updateOffer(offer: "a" | "b", field: WebsiteCostKey, value: string) {
    const setter = offer === "a" ? setOfferA : setOfferB
    setter((current) => ({ ...current, [field]: value }))
    setComparable(false)
  }

  function reset() {
    setOfferA(emptyWebsiteCostInputs())
    setOfferB(emptyWebsiteCostInputs())
    setComparable(false)
    setVisited({})
    setMonths(36)
  }

  function saveComparison() {
    if (!downloadText) return
    const url = URL.createObjectURL(
      new Blob([downloadText], { type: "text/plain;charset=utf-8" }),
    )
    const link = document.createElement("a")
    link.href = url
    link.download = "AgenticIT-Website-Offertenvergleich.txt"
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const difference = comparison.differenceCents
  const status =
    difference === null
      ? comparison.offerA.complete && comparison.offerB.complete
        ? "Leistungsumfang und MWST-Basis noch abgleichen, bevor Sie die Kosten vergleichen."
        : "Für den Kostenunterschied zuerst alle Beträge ergänzen und den Umfang abgleichen."
      : difference === 0
        ? "Die berechneten Gesamtkosten sind gleich."
        : `Offerte ${comparison.lowerCost!.toUpperCase()} liegt rechnerisch ${formatWebsiteCost(difference)} tiefer.`

  return (
    <aside className="blog-resource" aria-labelledby="article-resource-title">
      <div>
        <span>Direkt zum Mitnehmen</span>
        <h2 id="article-resource-title">{resource.title}</h2>
        <p>{resource.copy}</p>
        <a className="blog-resource-view" href={resource.href}>
          Vorlage im Browser ansehen
        </a>
      </div>
      <a
        href={`${resource.href}?download=1`}
        download={resource.href.split("/").pop()}
      >
        {resource.label}
        <Download size={17} aria-hidden="true" />
      </a>
      <details className={styles.calculator} ref={detailsRef}>
        <summary>
          Zwei Offerten direkt vergleichen
          <ChevronDown size={18} aria-hidden="true" />
        </summary>
        <div className={styles.body} id="offertenvergleich">
          <p className={styles.intro} id="website-cost-help">
            Ihre eigenen Beträge in CHF. Leere Felder bleiben offen. Wenn keine
            Kosten anfallen, tragen Sie 0 ein. Die Rechnung läuft lokal im
            Browser.
          </p>
          <div className={styles.period}>
            <label htmlFor="website-cost-period">Zeitraum</label>
            <select
              id="website-cost-period"
              value={months}
              onChange={(event) =>
                setMonths(Number(event.target.value) as WebsiteCostPeriod)
              }
            >
              <option value={12}>1 Jahr</option>
              <option value={24}>2 Jahre</option>
              <option value={36}>3 Jahre</option>
            </select>
          </div>
          <div className={styles.offers}>
            {(["a", "b"] as const).map((offer) => {
              const values: WebsiteCostInputs = offer === "a" ? offerA : offerB
              const result =
                offer === "a" ? comparison.offerA : comparison.offerB
              return (
                <fieldset key={offer} className={styles.offer}>
                  <legend>Offerte {offer.toUpperCase()}</legend>
                  <div className={styles.fields}>
                    {websiteCostFields.map(({ key, label }) => {
                      const id = `website-cost-${offer}-${key}`
                      const invalid =
                        visited[id] && result.parsed[key].kind === "invalid"
                      return (
                        <div className={styles.field} key={key}>
                          <label htmlFor={id}>{label}</label>
                          <input
                            id={id}
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                            maxLength={24}
                            value={values[key]}
                            onChange={(event) =>
                              updateOffer(offer, key, event.target.value)
                            }
                            onBlur={() =>
                              setVisited((current) => ({
                                ...current,
                                [id]: true,
                              }))
                            }
                            aria-invalid={invalid || undefined}
                            aria-describedby={
                              invalid ? `${id}-error` : "website-cost-help"
                            }
                          />
                          {invalid ? (
                            <small className={styles.error} id={`${id}-error`}>
                              Betrag von 0 bis 1&apos;000&apos;000 mit höchstens
                              zwei Dezimalstellen eingeben.
                            </small>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </fieldset>
              )
            })}
          </div>
          <p className={styles.hint}>
            Einrichtung und Zusatzarbeiten einmalig zählen. Monatliche und
            jährliche Positionen dürfen dieselbe Leistung nicht doppelt
            enthalten.
          </p>
          <div className={styles.totals}>
            {(["a", "b"] as const).map((offer) => {
              const result =
                offer === "a" ? comparison.offerA : comparison.offerB
              return (
                <div key={offer}>
                  <h3>
                    Offerte {offer.toUpperCase()} · {months} Monate
                  </h3>
                  <output
                    aria-live="polite"
                    aria-label={`Gesamtkosten Offerte ${offer.toUpperCase()}`}
                  >
                    {result.totalCents !== null
                      ? formatWebsiteCost(result.totalCents)
                      : result.invalid.length
                        ? "Angaben prüfen"
                        : "Noch offen"}
                  </output>
                </div>
              )
            })}
          </div>
          <label className={styles.scope}>
            <input
              type="checkbox"
              checked={comparable}
              onChange={(event) => setComparable(event.target.checked)}
            />
            Leistungsumfang und MWST-Basis sind abgeglichen.
          </label>
          <p role="status" className={styles.status}>
            {status}
          </p>
          <p className={styles.hint}>
            Kosten allein sagen noch nichts über Qualität oder Eignung aus.
            Eigenaufwand und fehlende Leistungen separat prüfen.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={saveComparison}
              disabled={!downloadText}
            >
              Vergleich speichern <Download size={16} aria-hidden="true" />
            </button>
            <button type="button" className={styles.reset} onClick={reset}>
              Eingaben leeren <RotateCcw size={15} aria-hidden="true" />
            </button>
            <Link href="/marketing-setup-check">
              Auftritt und Anfrageweg prüfen{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <noscript>
            Für den interaktiven Vergleich benötigen Sie JavaScript. Die
            Textvorlage oben können Sie weiterhin verwenden.
          </noscript>
        </div>
      </details>
    </aside>
  )
}
