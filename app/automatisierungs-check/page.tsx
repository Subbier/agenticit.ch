import { PotentialPage } from "@/components/journey/potential-page"
import { potentialConfigs } from "@/lib/potential-report"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: potentialConfigs.admin.label + ": Ihr persönliches Potenzial",
  description:
    potentialConfigs.admin.intro + " Drei Schritte. Ihr persönliches PDF.",
  path: "/automatisierungs-check",
})

export default function Page() {
  return <PotentialPage kind="admin" />
}
