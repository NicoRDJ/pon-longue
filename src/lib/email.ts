import { Resend } from "resend";
import { formatDate, formatTime } from "./reservation";
import type { Lang } from "./i18n/dictionaries";

// TODO: once a real domain is verified in Resend, send from
// "reservas@ponlounge.co" instead — onboarding@resend.dev works without
// domain verification, which is fine for this pre-launch phase.
const FROM_ADDRESS = "PON Lounge <onboarding@resend.dev>";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY env var");
  }
  resendClient ??= new Resend(apiKey);
  return resendClient;
}

export async function sendReservationConfirmation({
  to,
  id,
  name,
  partySize,
  date,
  time,
  lang,
}: {
  to: string;
  id: string;
  name: string;
  partySize: number;
  date: string;
  time: string;
  lang: Lang;
}) {
  const resend = getResendClient();

  const subject =
    lang === "es"
      ? `Reserva confirmada — PON Lounge, ${formatDate(date, lang)}`
      : `Reservation confirmed — PON Lounge, ${formatDate(date, lang)}`;

  const html = renderConfirmationHtml({
    id,
    name,
    partySize,
    date,
    time,
    lang,
  });

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

function renderConfirmationHtml({
  id,
  name,
  partySize,
  date,
  time,
  lang,
}: {
  id: string;
  name: string;
  partySize: number;
  date: string;
  time: string;
  lang: Lang;
}) {
  const t =
    lang === "es"
      ? {
          heading: "Tu reserva está confirmada",
          greeting: `Hola ${name},`,
          body: "Te esperamos en PON Lounge. Aquí el resumen de tu reserva:",
          people: "Personas",
          date: "Fecha",
          time: "Hora",
          cancelButton: "Cancelar mi reserva",
          footer:
            "¿Necesitas cambiar algo o cancelar? Usa el botón de arriba, escríbenos por WhatsApp, o responde a este correo.",
        }
      : {
          heading: "Your reservation is confirmed",
          greeting: `Hi ${name},`,
          body: "We look forward to seeing you at PON Lounge. Here's your reservation summary:",
          people: "Guests",
          date: "Date",
          time: "Time",
          cancelButton: "Cancel my reservation",
          footer:
            "Need to change something or cancel? Use the button above, message us on WhatsApp, or just reply to this email.",
        };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100";
  const cancelUrl = `${siteUrl}/cancelar/${id}`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0b0d10;padding:32px;color:#f2ece0;">
    <div style="max-width:480px;margin:0 auto;background:#14181d;border:1px solid rgba(242,236,224,0.12);border-radius:16px;padding:32px;">
      <p style="color:#b98d4b;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">PON Lounge</p>
      <h1 style="font-size:22px;margin:0 0 20px;color:#f2ece0;">${t.heading}</h1>
      <p style="margin:0 0 8px;">${t.greeting}</p>
      <p style="margin:0 0 24px;color:#c9c0ae;">${t.body}</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#c9c0ae;border-bottom:1px dashed rgba(242,236,224,0.15);">${t.people}</td>
          <td style="padding:8px 0;text-align:right;font-weight:bold;border-bottom:1px dashed rgba(242,236,224,0.15);">${partySize}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#c9c0ae;border-bottom:1px dashed rgba(242,236,224,0.15);">${t.date}</td>
          <td style="padding:8px 0;text-align:right;font-weight:bold;border-bottom:1px dashed rgba(242,236,224,0.15);">${formatDate(date, lang)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#c9c0ae;">${t.time}</td>
          <td style="padding:8px 0;text-align:right;font-weight:bold;">${formatTime(time)}</td>
        </tr>
      </table>
      <a href="${cancelUrl}" style="display:block;text-align:center;margin:24px 0 0;padding:12px 20px;border-radius:999px;border:1px dashed rgba(185,141,75,0.55);color:#d9b578;text-decoration:none;font-size:13px;font-weight:bold;">${t.cancelButton}</a>
      <p style="margin:16px 0 0;font-size:13px;color:#c9c0ae;">${t.footer}</p>
    </div>
  </div>`;
}
