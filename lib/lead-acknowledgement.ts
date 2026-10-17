/** HTTP success alone is not a handoff acknowledgement or a CRM receipt. */
export async function assertLeadAcknowledged(
  response: Response,
  honeypot: unknown,
) {
  const body: unknown = await response.json().catch(() => null)
  const object = typeof body === "object" && body !== null ? body : null
  if (
    !response.ok ||
    !object ||
    !("ok" in object) ||
    object.ok !== true ||
    (honeypot !== null && honeypot !== "")
  ) {
    const message =
      object &&
      "message" in object &&
      typeof object.message === "string" &&
      object.message.trim()
        ? object.message
        : "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut."
    throw new Error(message)
  }
}
