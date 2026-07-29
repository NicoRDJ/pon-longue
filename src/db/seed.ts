import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getSql, getDb } from "./client";
import { slotCapacity } from "./schema";

// Run once after `npm run db:push` to install the atomic booking function
// and seed the default time slots. Safe to re-run (idempotent): the
// function is CREATE OR REPLACE, and slot seeding upserts on conflict.
async function main() {
  const sql = getSql();
  const db = getDb();

  const dir = path.dirname(fileURLToPath(import.meta.url));
  const functionSql = readFileSync(
    path.join(dir, "sql/book_reservation.sql"),
    "utf-8",
  );
  await sql.query(functionSql);
  console.log("✓ book_reservation() function installed");

  const defaultSlots = [
    { slotTime: "18:00", capacity: 40 },
    { slotTime: "19:00", capacity: 40 },
    { slotTime: "20:00", capacity: 40 },
    { slotTime: "21:00", capacity: 30 },
    { slotTime: "22:00", capacity: 30 },
  ];

  for (const slot of defaultSlots) {
    await db
      .insert(slotCapacity)
      .values(slot)
      .onConflictDoUpdate({
        target: slotCapacity.slotTime,
        set: { capacity: slot.capacity },
      });
  }
  console.log(`✓ Seeded ${defaultSlots.length} time slots`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
