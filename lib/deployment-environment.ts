type DeploymentEnvironment = Record<string, string | undefined>

export function usesVercelTelemetry(env: DeploymentEnvironment) {
  return env.VERCEL === "1"
}

export function isProductionDeployment(env: DeploymentEnvironment) {
  return env.VERCEL_ENV
    ? env.VERCEL_ENV === "production"
    : env.NODE_ENV === "production"
}
