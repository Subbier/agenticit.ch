// Zentrale WhatsApp-URL für AgenticIT (offizielle Nummer +41 31 539 44 44).
// Wird vom Footer und vom Chatbot-Widget (WhatsApp-Fallback) genutzt.

const WA_NUMBER = "41315394444"
const WA_TEXT = encodeURIComponent("Guten Tag AgenticIT, ich habe eine Frage zu Ihren Leistungen.")

export const WHATSAPP_URL = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`
