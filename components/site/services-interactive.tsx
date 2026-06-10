"use client"

import { useMemo, useState, type ComponentType } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Sparkles, Shield, Megaphone, GraduationCap } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { formatChf } from "@/lib/format-currency"
import {
  benchmarkKpis,
  edtechPie,
  edtechRetention,
  edtechTiers,
  itTiers,
  marketingBenchmark,
  marketingTiers,
  painPointOptions,
  roiMatrix,
  waasBenchmark,
  type EdtechTierId,
  type ItTierId,
  type MarketingTierId,
  type PainPointId,
} from "@/lib/services-benchmark-data"
import {
  calculatePackageMrr,
  generatePackageProposal,
  getDefaultSelection,
  type PackageSelection,
} from "@/lib/services-package-engine"

const PIE_COLORS = ["hsl(215 20% 55%)", "hsl(142 70% 55%)", "hsl(210 40% 70%)"]

const tooltipProps = {
  contentStyle: {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",
    color: "#f8fafc",
  },
}

function ProposalView({ text }: { text: string }) {
  return (
    <article className="space-y-2 text-sm leading-7 text-white/80">
      {text.split("\n").map((line, i) => {
        if (line.startsWith("## "))
          return (
            <h3 key={i} className="pt-2 text-lg font-semibold text-emerald-200">
              {line.slice(3)}
            </h3>
          )
        if (line.startsWith("### "))
          return (
            <h4 key={i} className="font-semibold text-white">
              {line.slice(4)}
            </h4>
          )
        if (line.startsWith("- "))
          return (
            <p key={i} className="border-l-2 border-emerald-400/40 pl-3">
              {line.slice(2)}
            </p>
          )
        if (!line.trim()) return null
        return <p key={i}>{line}</p>
      })}
    </article>
  )
}

function TierToggle({
  icon: Icon,
  title,
  enabled,
  onEnabled,
  tier,
  onTier,
  options,
  priceLabel,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  enabled: boolean
  onEnabled: (v: boolean) => void
  tier: string
  onTier: (v: string) => void
  options: { id: string; label: string; description: string }[]
  priceLabel: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-emerald-200" />
          <span className="font-medium text-white">{title}</span>
        </div>
        <Switch checked={enabled} onCheckedChange={onEnabled} />
      </div>
      {enabled && (
        <div className="mt-4 space-y-3">
          <Select value={tier} onValueChange={onTier}>
            <SelectTrigger className="border-white/20 bg-black/40 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-white/55">{options.find((o) => o.id === tier)?.description}</p>
          <p className="text-sm font-semibold text-emerald-200">{priceLabel}</p>
        </div>
      )}
    </div>
  )
}

export function ServicesInteractive() {
  const [selection, setSelection] = useState<PackageSelection>(() => getDefaultSelection("all"))
  const [showProposal, setShowProposal] = useState(false)
  const mrr = useMemo(() => calculatePackageMrr(selection), [selection])
  const proposal = useMemo(
    () => (showProposal ? generatePackageProposal(selection) : ""),
    [selection, showProposal],
  )

  const applyPain = (pain: PainPointId) => {
    const preset = getDefaultSelection(pain)
    setSelection((prev) => ({ ...preset, teamSize: prev.teamSize }))
    setShowProposal(false)
  }

  const itTier = itTiers.find((t) => t.id === selection.it.tier)!
  const mktTier = marketingTiers.find((t) => t.id === selection.marketing.tier)!
  const eduTier = edtechTiers.find((t) => t.id === selection.edtech.tier)!

  return (
    <div className="space-y-16">
      <div className="grid gap-4 sm:grid-cols-3">
        {benchmarkKpis.map((kpi) => (
          <Card key={kpi.label} className="border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm">
            <p className="text-4xl font-bold text-emerald-200">{kpi.value}</p>
            <p className="mt-2 text-sm text-white/65">{kpi.label}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="simulator" className="gap-6">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 bg-white/10 p-2">
          <TabsTrigger value="simulator" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Paket-Simulator
          </TabsTrigger>
          <TabsTrigger value="workplace" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Workplace
          </TabsTrigger>
          <TabsTrigger value="marketing" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Marketing
          </TabsTrigger>
          <TabsTrigger value="edtech" className="data-[state=active]:bg-white data-[state=active]:text-black">
            EdTech
          </TabsTrigger>
          <TabsTrigger value="matrix" className="data-[state=active]:bg-white data-[state=active]:text-black">
            ROI-Matrix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-center gap-2 text-emerald-200">
                <Sparkles className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">Paket-Rechner</span>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Teamgrösse, Pain Point und Module wählen – MRR live berechnet.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <Label className="text-white/80">Anzahl Berater: {selection.teamSize}</Label>
                  <Slider
                    className="mt-3"
                    min={1}
                    max={40}
                    step={1}
                    value={[selection.teamSize]}
                    onValueChange={([v]) => setSelection((s) => ({ ...s, teamSize: v }))}
                  />
                </div>
                <div>
                  <Label className="text-white/80">Pain Point</Label>
                  <Select
                    value={selection.painPoint}
                    onValueChange={(v) => applyPain(v as PainPointId)}
                  >
                    <SelectTrigger className="mt-2 border-white/20 bg-black/40 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {painPointOptions.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <TierToggle
                  icon={Shield}
                  title="Workplace & IT"
                  enabled={selection.it.enabled}
                  onEnabled={(v) => setSelection((s) => ({ ...s, it: { ...s.it, enabled: v } }))}
                  tier={selection.it.tier}
                  onTier={(v) => setSelection((s) => ({ ...s, it: { ...s.it, tier: v as ItTierId } }))}
                  options={itTiers}
                  priceLabel={
                    selection.it.enabled
                      ? formatChf(itTier.pricePerUser * selection.teamSize) + " / Monat"
                      : "—"
                  }
                />
                <TierToggle
                  icon={Megaphone}
                  title="RevOps & Marketing"
                  enabled={selection.marketing.enabled}
                  onEnabled={(v) =>
                    setSelection((s) => ({ ...s, marketing: { ...s.marketing, enabled: v } }))
                  }
                  tier={selection.marketing.tier}
                  onTier={(v) =>
                    setSelection((s) => ({
                      ...s,
                      marketing: { ...s.marketing, tier: v as MarketingTierId },
                    }))
                  }
                  options={marketingTiers}
                  priceLabel={selection.marketing.enabled ? formatChf(mktTier.retainer) + " / Monat" : "—"}
                />
                <TierToggle
                  icon={GraduationCap}
                  title="EdTech & Compliance"
                  enabled={selection.edtech.enabled}
                  onEnabled={(v) => setSelection((s) => ({ ...s, edtech: { ...s.edtech, enabled: v } }))}
                  tier={selection.edtech.tier}
                  onTier={(v) =>
                    setSelection((s) => ({ ...s, edtech: { ...s.edtech, tier: v as EdtechTierId } }))
                  }
                  options={edtechTiers}
                  priceLabel={
                    selection.edtech.enabled
                      ? formatChf(
                          eduTier.flat ?? (eduTier.perUser ?? 0) * selection.teamSize,
                        ) + " / Monat"
                      : "—"
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowProposal(true)}
                  className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-emerald-100"
                >
                  Maßgeschneidertes Paket generieren
                </button>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="border-emerald-400/30 bg-emerald-400/10 p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-emerald-200/80">Live MRR</p>
                <p className="mt-2 text-4xl font-bold text-white">{formatChf(mrr.totalMrr)}</p>
                <p className="mt-1 text-sm text-white/60">pro Monat · {formatChf(mrr.annualValue)} / Jahr</p>
                <div className="mt-6 space-y-2 text-sm text-white/75">
                  <p>IT: {formatChf(mrr.itMrr)}</p>
                  <p>Marketing: {formatChf(mrr.marketingMrr)}</p>
                  <p>EdTech: {formatChf(mrr.edtechMrr)}</p>
                </div>
              </Card>
              {showProposal && proposal && (
                <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                  <ProposalView text={proposal} />
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workplace">
          <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Workplace-as-a-Service</h3>
            <div className="mt-6 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...waasBenchmark]} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip {...tooltipProps} />
                  <Bar dataKey="price" radius={4}>
                    {waasBenchmark.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">RevOps Funnel</h3>
              <div className="mt-4 space-y-2">
                {["Webdesign & Sichtbarkeit", "Lead-Gen & Akquise", "Omnichannel Nurturing"].map((step, i) => (
                  <div
                    key={step}
                    className={`rounded-lg p-3 text-center text-sm font-medium ${
                      i === 2 ? "bg-white text-black" : "bg-white/15 text-white"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...marketingBenchmark]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={60} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip {...tooltipProps} formatter={(v: number) => formatChf(v)} />
                    <Bar dataKey="price" fill="hsl(270 60% 65%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edtech">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[...edtechPie]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} cx="50%" cy="50%">
                      {edtechPie.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipProps} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[...edtechRetention]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip {...tooltipProps} />
                    <Legend />
                    <Line type="monotone" dataKey="seminar" stroke="#94a3b8" strokeWidth={2} name="Seminar" />
                    <Line type="monotone" dataKey="micro" stroke="#10b981" strokeWidth={2} name="Micro-Learning" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matrix">
          <Card className="border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" dataKey="cost" name="MRR" tick={{ fill: "#94a3b8" }} />
                  <YAxis type="number" dataKey="value" name="Value" tick={{ fill: "#94a3b8" }} />
                  <ZAxis type="category" dataKey="label" />
                  <Tooltip {...tooltipProps} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={roiMatrix.map((p) => ({ ...p }))}>
                    {roiMatrix.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
