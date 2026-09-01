import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { bookReservation, type BookResult } from "@/db/reservationsStore";
import { sendReservationConfirmation } from "@/lib/email";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  partySize: z.number().int().min(1).max(30),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "time must be HH:MM"),
  occasion: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(1000).optional(),
  lang: z.enum(["es", "en"]).default("es"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, phone, partySize, date, time, occasion, notes, lang } =
    parsed.data;

  let result: BookResult;
  try {
    result = await bookReservation({
      name,
      email: email || null,
      phone: phone || null,
      partySize,
      date,
      time,
      occasion: occasion || null,
      notes: notes || null,
    });
  } catch (err) {
    console.error("POST /api/reservations failed:", err);
    return NextResponse.json(
      { error: "reservations_unavailable" },
      { status: 503 },
    );
  }

  if (!result || result.status !== "confirmed") {
    const reason = result?.status ?? "unknown_error";
    const statusCode = reason === "full" ? 409 : 400;
    return NextResponse.json(
      { error: reason, remaining: result?.remaining ?? 0 },
      { status: statusCode },
    );
  }

  if (email && result.id) {
    try {
      await sendReservationConfirmation({
        to: email,
        id: result.id,
        name,
        partySize,
        date,
        time,
        lang,
      });
    } catch (err) {
      // The reservation is already confirmed in the database — an email
      // hiccup shouldn't fail the booking. Log and let the client know via
      // the response so it can still show a success state.
      console.error("Failed to send confirmation email:", err);
    }
  }

  return NextResponse.json(
    { id: result.id, status: "confirmed", remaining: result.remaining },
    { status: 201 },
  );
}
