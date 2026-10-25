import { PotentialPage } from "@/components/journey/potential-page"
import { potentialConfigs } from "@/lib/potential-report"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: potentialConfigs.acquisition.label + ": Ihr persönliches Potenzial",
  description:
    potentialConfigs.acquisition.intro +
    " Drei Schritte. Ihr persönliches PDF.",
  path: "/marketing-setup-check",
})

export default function Page() {
  return <PotentialPage kind="acquisition" />
}
