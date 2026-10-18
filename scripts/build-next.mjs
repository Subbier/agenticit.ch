import { spawnSync } from "node:child_process"
import { fileURLToPath, pathToFileURL } from "node:url"

export function getBuildOptions(env, argv) {
  const hostinger =
    env.AGENTICIT_HOSTINGER_BUILD === "1" || argv.includes("--hostinger")
  return { args: ["build", ...(hostinger ? ["--webpack"] : [])], hostinger }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const options = getBuildOptions(process.env, process.argv.slice(2))
  const result = spawnSync(
    process.execPath,
    [
      fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)),
      ...options.args,
    ],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        AGENTICIT_HOSTINGER_BUILD: options.hostinger ? "1" : "0",
      },
    },
  )
  if (result.error) console.error("The website build process could not start.")
  process.exit(result.status ?? 1)
}
