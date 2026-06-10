"use client"

import { useMemo, useState } from "react"
import { BarChart3, Clock, TrendingUp, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { formatChf } from "@/lib/format-currency"

const businessDefaults = {
  ecommerce: { label: "E-Commerce", avgOrder: 85, maxOrder: 500, conversion: 35, response: 80 },
  automotive: { label: "Automotive", avgOrder: 500, maxOrder: 5000, conversion: 30, response: 75 },
  finance: { label: "Finance", avgOrder: 1200, maxOrder: 10000, conversion: 35, response: 85 },
  health: { label: "Health", avgOrder: 250, maxOrder: 2000, conversion: 45, response: 90 },
  education: { label: "Education", avgOrder: 180, maxOrder: 1500, conversion: 28, response: 72 },
}

type BusinessType = keyof typeof businessDefaults

export function RoiCalculator() {
  const [businessType, setBusinessType] = useState<BusinessType>("ecommerce")
  const [traffic, setTraffic] = useState(10000)
  const [conversionRate, setConversionRate] = useState(2)
  const [orderValue, setOrderValue] = useState(85)

  const config = businessDefaults[businessType]

  const metrics = useMemo(() => {
    const currentLeads = Math.round((traffic * conversionRate) / 100)
    const improvedRate = conversionRate * (1 + config.conversion / 100)
    const improvedLeads = Math.round((traffic * improvedRate) / 100)
    const additionalLeads = Math.max(0, improvedLeads - currentLeads)
    const monthlyRevenue = additionalLeads * orderValue

    return {
      currentLeads,
      improvedLeads,
      additionalLeads,
      monthlyRevenue,
      annualRevenue: monthlyRevenue * 12,
      increase: currentLeads > 0 ? ((improvedLeads - currentLeads) / currentLeads) * 100 : 0,
    }
  }, [config.conversion, conversionRate, orderValue, traffic])

  const updateBusinessType = (value: BusinessType) => {
    setBusinessType(value)
    setOrderValue(businessDefaults[value].avgOrder)
  }

  return (
    <section id="roi" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="overline text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Growth-Kalkulator</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Ihr unentdecktes Umsatzpotenzial
          </h2>
          <p className="mt-5 text-base leading-7 text-white/64 sm:text-lg">
            Simulieren Sie in Echtzeit, welchen finanziellen ROI autonome Sales-KI für Ihr Unternehmen erzeugen kann.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.06] p-5 sm:p-7">
            <h3 className="text-xl font-semibold text-white">Ihre Metriken</h3>
            <div className="mt-7 grid gap-6">
              <label className="grid gap-2 text-sm text-white/72">
                Branche
                <select
                  value={businessType}
                  onChange={(event) => updateBusinessType(event.target.value as BusinessType)}
                  className="h-11 rounded-lg border border-white/[0.12] bg-black/[0.45] px-3 text-white outline-none focus:border-emerald-300"
                >
                  {Object.entries(businessDefaults).map(([value, item]) => (
                    <option key={value} value={value} className="bg-neutral-950">
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <RangeControl
                label="Monatlicher Traffic"
                value={traffic}
                min={1000}
                max={100000}
                step={1000}
                suffix=""
                onChange={setTraffic}
              />
              <RangeControl
                label="Aktuelle Conversion"
                value={conversionRate}
                min={0.5}
                max={10}
                step={0.1}
                suffix="%"
                onChange={setConversionRate}
              />
              <RangeControl
                label="Warenkorb-Wert"
                value={orderValue}
                min={25}
                max={config.maxOrder}
                step={25}
                formatValue={formatChf}
                onChange={setOrderValue}
              />
            </div>

            <div className="mt-8 rounded-lg border border-emerald-300/[0.18] bg-emerald-300/[0.08] p-4">
              <h4 className="text-sm font-semibold text-emerald-100">Marktdynamik</h4>
              <div className="mt-3 grid gap-3 text-sm leading-6 text-white/68">
                <p>Performance-Boost: innovative Betriebe sehen rund {config.conversion}% mehr Conversions.</p>
                <p>Speed-to-Lead: autonome Agents reagieren rund {config.response}% schneller.</p>
                <p>Loyalität: verzugsfreier 24/7-Support stärkt Vertrauen und Wiederkehr.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.12] bg-white text-neutral-950 p-5 sm:p-7">
            <h3 className="text-xl font-semibold">Ihr Vorsprung durch AgenticIT</h3>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Metric label="Heute" value={`${metrics.currentLeads}`} detail="Leads/Monat" icon={Users} />
              <Metric label="Mit AgenticIT" value={`${metrics.improvedLeads}`} detail="Leads/Monat" icon={TrendingUp} />
            </div>
            <div className="mt-5 grid gap-3">
              <ResultRow label="Zusätzliche Leads" value={`+${metrics.additionalLeads}`} icon={Users} />
              <ResultRow label="Zusätzlicher Umsatz" value={formatChf(metrics.monthlyRevenue)} icon={BarChart3} />
              <ResultRow label="Umsatzplus" value={`+${metrics.increase.toFixed(1)}%`} icon={TrendingUp} />
              <ResultRow label="Antwortzeit" value={`${config.response}% schneller`} icon={Clock} />
            </div>
            <div className="mt-6 rounded-lg bg-neutral-950 p-5 text-white">
              <p className="text-sm text-white/60">Geschätztes zusätzliches Jahresumsatzvolumen</p>
              <p className="mt-2 text-3xl font-semibold">{formatChf(metrics.annualRevenue)}</p>
              <p className="mt-3 text-xs leading-5 text-white/46">
                Basierend auf Ihren Angaben und marktüblichen Benchmarks. Resultate können je nach Angebot, Datenlage und
                Prozessqualität variieren.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  formatValue,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  formatValue?: (value: number) => string
  onChange: (value: number) => void
}) {
  return (
    <label className="grid gap-3 text-sm text-white/72">
      <span className="flex items-center justify-between gap-4">
        {label}
        <strong className="text-white">
          {formatValue ? formatValue(value) : `${prefix}${value.toLocaleString("de-CH")}${suffix}`}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-emerald-300"
      />
    </label>
  )
}

function Metric({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <Icon className="size-4 text-emerald-700" />
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="text-xs text-neutral-500">{detail}</p>
    </div>
  )
}

function ResultRow({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-4 py-3">
      <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
        <Icon className="size-4 text-emerald-700" />
        {label}
      </span>
      <strong className="text-right text-sm">{value}</strong>
    </div>
  )
}
