import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cancelReservation } from "@/db/reservationsStore";

export const dynamic = "force-dynamic";

const idSchema = z.string().uuid();

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const parsed = idSchema.safeParse(id);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  let result: Awaited<ReturnType<typeof cancelReservation>>;
  try {
    result = await cancelReservation(parsed.data);
  } catch (err) {
    console.error("POST /api/reservations/[id]/cancel failed:", err);
    return NextResponse.json(
      { error: "reservations_unavailable" },
      { status: 503 },
    );
  }

  if (result.status === "not_found") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (result.status === "already_cancelled" || result.status === "too_late") {
    return NextResponse.json(
      { error: result.status, date: result.date, time: result.time },
      { status: 409 },
    );
  }

  return NextResponse.json(
    { status: "cancelled", date: result.date, time: result.time },
    { status: 200 },
  );
}
