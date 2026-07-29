// Single source of truth for contact details shown across the site. Reads
// from public env vars (safe to expose to the client) so the real business
// info can be updated in Vercel's dashboard without a code change.

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";

export const PHONE_E164 = `+${WHATSAPP_NUMBER}`;

export const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+57 300 000 0000";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_RESERVATIONS_EMAIL ?? "hola@ponlounge.co";
