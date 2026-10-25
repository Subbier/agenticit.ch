import { PotentialPage } from "@/components/journey/potential-page"
import { potentialConfigs } from "@/lib/potential-report"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: potentialConfigs.conversion.label + ": Ihr persönliches Potenzial",
  description:
    potentialConfigs.conversion.intro + " Drei Schritte. Ihr persönliches PDF.",
  path: "/anfragen-check",
})

export default function Page() {
  return <PotentialPage kind="conversion" />
}
