import type { Lang } from "./i18n/dictionaries";
import { CANCELLATION_CUTOFF_HOURS } from "./hours";

function toLocalDate(date: string, time: string): Date {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  const [h = 0, min = 0] = time.split(":").map(Number);
  return new Date(y, m - 1, d, h, min);
}

// True once we're within CANCELLATION_CUTOFF_HOURS of the reservation (or
// past it) — self-service cancellation is blocked at that point, matching
// the "cancelaciones flexibles hasta 2 horas antes" promise shown on the
// page. `now` is injectable for tests.
export function isPastCancellationCutoff(
  date: string,
  time: string,
  now: Date = new Date(),
): boolean {
  const cutoffMs = CANCELLATION_CUTOFF_HOURS * 60 * 60 * 1000;
  return now.getTime() >= toLocalDate(date, time).getTime() - cutoffMs;
}

export function formatDate(value: string, lang: Lang): string {
  if (!value) return "";
  const parts = value.split("-").map(Number);
  if (parts.length !== 3) return value;
  const [y = 0, m = 1, d = 1] = parts;
  const date = new Date(y, m - 1, d);
  const formatter = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return formatter.format(date);
}

export function formatTime(value: string): string {
  if (!value) return "";
  const [hStr = "0", m = "00"] = value.split(":");
  const h = Number(hStr);
  const suffix = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${suffix}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function buildIcsDate(date: string, time: string, addHours = 0): string {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  const [h = 0, min = 0] = time.split(":").map(Number);
  const dt = new Date(y, m - 1, d, h, min);
  if (addHours) dt.setHours(dt.getHours() + addHours);
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
}

export function buildReservationIcs({
  date,
  time,
  summary,
  location,
  description,
}: {
  date: string;
  time: string;
  summary: string;
  location: string;
  description: string;
}): Blob {
  const uid = `ponlounge-${Date.now()}@ponlounge.co`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PON Lounge//Reservas//ES",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${buildIcsDate(date, time)}Z`,
    `DTSTART:${buildIcsDate(date, time)}`,
    `DTEND:${buildIcsDate(date, time, 2)}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
}

export function buildReservationMessage({
  lang,
  name,
  people,
  date,
  time,
  notes,
}: {
  lang: Lang;
  name: string;
  people: number;
  date: string;
  time: string;
  notes: string;
}): string {
  const lines =
    lang === "es"
      ? [
          "Hola PON Lounge, quiero reservar una mesa:",
          `Nombre: ${name}`,
          `Personas: ${people}`,
          `Fecha: ${date}`,
          `Hora: ${time}`,
          notes ? `Notas: ${notes}` : null,
        ]
      : [
          "Hi PON Lounge, I'd like to book a table:",
          `Name: ${name}`,
          `Guests: ${people}`,
          `Date: ${date}`,
          `Time: ${time}`,
          notes ? `Notes: ${notes}` : null,
        ];
  return lines.filter(Boolean).join("\n");
}
