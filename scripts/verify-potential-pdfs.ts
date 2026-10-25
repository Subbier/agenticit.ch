import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { buildPotentialPdf } from "../lib/potential-pdf"
import { potentialKinds, type PotentialInput } from "../lib/potential-report"

async function main() {
  const output = process.argv[2]
  if (!output || !path.isAbsolute(output))
    throw new Error("An absolute output folder is required")
  await mkdir(output, { recursive: true })
  for (const kind of potentialKinds) {
    const input: PotentialInput = {
      version: 1,
      kind,
      volume: 100,
      targetVolume: kind === "acquisition" ? 120 : 100,
      currentRate: 20,
      targetRate: 22,
      value: 3000,
      margin: 40,
      minutes: 30,
      targetMinutes: 15,
      hourlyRate: 100,
      setupCost: 1000,
      monthlyCost: 100,
    }
    const bytes = await buildPotentialPdf(input, {
      name: "Beispiel - keine Kundenangaben",
      company: "Musterunternehmen | Ausschliesslich Rechenbeispiel",
    })
    await writeFile(path.join(output, `Muster-Potenzial-${kind}.pdf`), bytes)
    console.log(`${kind}: ${bytes.length} bytes`)
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
