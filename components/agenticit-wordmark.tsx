import { cn } from "@/lib/utils"

type AgenticITWordmarkProps = {
  className?: string
  /** nav = kompakt in der Leiste, footer = etwas grösser */
  size?: "nav" | "footer"
}

/** Schriftzug ohne Hintergrund: Arial, «Agentic» regular, «IT» gleiche Grösse wie das A, fett und kursiv. */
export function AgenticITWordmark({ className, size = "nav" }: AgenticITWordmarkProps) {
  const textSize =
    size === "footer" ? "text-lg md:text-xl leading-none" : "text-xl md:text-2xl leading-none"

  return (
    <span
      className={cn("inline-flex items-baseline tracking-tight whitespace-nowrap", className)}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <span className={cn(textSize, "font-normal")}>Agentic</span>
      <span className={cn(textSize, "font-bold italic")}>IT</span>
    </span>
  )
}
