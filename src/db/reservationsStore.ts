// Single entry point the API routes use for availability + booking.
//
// Picks a backend automatically: real Postgres (Neon) when DATABASE_URL /
// POSTGRES_URL is set, otherwise the local JSON-file-simulated database in
// localStore.ts. This means automatic booking works out of the box before
// Postgres is provisioned — flip it to the real thing later just by
// setting the env var, no code change needed.

import { eq, and, sql as sqlOp } from "drizzle-orm";
import { getDb, getSql } from "@/db/client";
import { slotCapacity, reservations } from "@/db/schema";
import {
  getLocalAvailability,
  bookLocalReservation,
  type BookResult,
} from "@/db/localStore";

export type AvailabilitySlot = {
  time: string;
  capacity: number;
  booked: number;
};
export type { BookResult };

function hasRemoteDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export async function getAvailability(
  date: string,
): Promise<AvailabilitySlot[]> {
  if (!hasRemoteDatabase()) {
    return getLocalAvailability(date);
  }

  const db = getDb();

  const slots = await db
    .select()
    .from(slotCapacity)
    .orderBy(slotCapacity.slotTime);

  const booked = await db
    .select({
      time: reservations.reservationTime,
      total: sqlOp<number>`coalesce(sum(${reservations.partySize}), 0)`,
    })
    .from(reservations)
    .where(
      and(
        eq(reservations.reservationDate, date),
        eq(reservations.status, "confirmed"),
      ),
    )
    .groupBy(reservations.reservationTime);

  const bookedByTime = new Map(booked.map((b) => [b.time, Number(b.total)]));

  return slots.map((slot) => ({
    time: slot.slotTime.slice(0, 5),
    capacity: slot.capacity,
    booked: bookedByTime.get(slot.slotTime) ?? 0,
  }));
}

export async function bookReservation(input: {
  name: string;
  email: string | null;
  phone: string | null;
  partySize: number;
  date: string;
  time: string;
  occasion: string | null;
  notes: string | null;
}): Promise<BookResult> {
  if (!hasRemoteDatabase()) {
    return bookLocalReservation(input);
  }

  const sql = getSql();
  const rows = (await sql`
    select * from book_reservation(
      ${input.name}, ${input.email}, ${input.phone}, ${input.partySize},
      ${input.date}, ${input.time}, ${input.occasion}, ${input.notes}
    )
  `) as BookResult[];

  return (
    rows[0] ?? { id: null, status: "unknown_slot" as const, remaining: null }
  );
}
