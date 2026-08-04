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

export const ADDRESS_LINE =
  process.env.NEXT_PUBLIC_ADDRESS ??
  "Cra 44 #20-28, Distrito Vera, El Poblado, Medellín, Colombia";

// Social links — unset (undefined) until the client shares the real
// handles. Components should skip rendering a link whose value is
// undefined rather than pointing it at "#".
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
export const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL;
export const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL;
