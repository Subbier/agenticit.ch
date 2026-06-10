import type { ReactNode } from "react"

type CollapsibleBlockProps = {
  summary: string
  children: ReactNode
  className?: string
  variant?: "dark" | "light"
}

export function CollapsibleBlock({
  summary,
  children,
  className = "",
  variant = "dark",
}: CollapsibleBlockProps) {
  const styles =
    variant === "light"
      ? "border-slate-200 bg-slate-50 open:border-emerald-300/40"
      : "border-white/10 bg-white/[0.03] open:border-emerald-300/25"

  const summaryStyles = variant === "light" ? "text-emerald-800" : "text-emerald-200"
  const bodyStyles = variant === "light" ? "text-slate-600" : "text-white/72"

  return (
    <details className={`group rounded-xl border ${styles} ${className}`}>
      <summary
        className={`cursor-pointer list-none px-4 py-3 text-sm font-medium ${summaryStyles} marker:content-none [&::-webkit-details-marker]:hidden`}
      >
        <span className="flex items-center justify-between gap-3">
          {summary}
          <span className="shrink-0 text-xs opacity-70 transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className={`border-t border-inherit px-4 pb-4 pt-3 text-sm leading-7 ${bodyStyles}`}>{children}</div>
    </details>
  )
}
