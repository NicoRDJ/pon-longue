import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getSql, getDb } from "./client";
import { slotCapacity } from "./schema";
import { DEFAULT_SLOTS } from "@/lib/hours";

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

  for (const slot of DEFAULT_SLOTS) {
    await db
      .insert(slotCapacity)
      .values(slot)
      .onConflictDoUpdate({
        target: slotCapacity.slotTime,
        set: { capacity: slot.capacity },
      });
  }
  console.log(`✓ Seeded ${DEFAULT_SLOTS.length} time slots`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
