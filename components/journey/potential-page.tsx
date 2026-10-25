import { JourneyShell } from "./shell"
import { PotentialCheck } from "./potential-check"
import type { PotentialKind } from "@/lib/potential-report"

export function PotentialPage({
  kind,
  chooseKind = false,
  title,
  context,
}: {
  kind: PotentialKind
  chooseKind?: boolean
  title?: string
  context?: "crm"
}) {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1}>
        <PotentialCheck
          initialKind={kind}
          chooseKind={chooseKind}
          title={title}
          context={context}
        />
      </main>
    </JourneyShell>
  )
}
