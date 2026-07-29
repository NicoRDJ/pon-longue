import { NextRequest, NextResponse } from "next/server";
import { eq, and, sql as sqlOp } from "drizzle-orm";
import { getDb } from "@/db/client";
import { slotCapacity, reservations } from "@/db/schema";

export const dynamic = "force-dynamic";

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !dateRe.test(date)) {
    return NextResponse.json(
      { error: "Missing or invalid ?date=YYYY-MM-DD" },
      { status: 400 },
    );
  }

  try {
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

    const result = slots.map((slot) => ({
      time: slot.slotTime.slice(0, 5),
      capacity: slot.capacity,
      booked: bookedByTime.get(slot.slotTime) ?? 0,
    }));

    return NextResponse.json({ date, slots: result });
  } catch (err) {
    console.error("GET /api/availability failed:", err);
    return NextResponse.json(
      { error: "availability_unavailable" },
      { status: 503 },
    );
  }
}
