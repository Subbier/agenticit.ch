import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

// Keep the standard build unchanged; Hostinger uses the supported Webpack path.
const result = spawnSync(
  process.execPath,
  [
    fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)),
    "build",
    "--webpack",
  ],
  {
    stdio: "inherit",
    env: { ...process.env, AGENTICIT_HOSTINGER_BUILD: "1" },
  },
)

if (result.error) {
  console.error("The Hostinger build process could not start.")
}
process.exit(result.status ?? 1)
