import {
  pgTable,
  uuid,
  text,
  integer,
  date,
  time,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const reservationStatus = pgEnum("reservation_status", [
  "confirmed",
  "cancelled",
]);

export const slotCapacity = pgTable("slot_capacity", {
  slotTime: time("slot_time").primaryKey(),
  capacity: integer("capacity").notNull(),
});

export const reservations = pgTable("reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  partySize: integer("party_size").notNull(),
  reservationDate: date("reservation_date").notNull(),
  reservationTime: time("reservation_time").notNull(),
  occasion: text("occasion"),
  notes: text("notes"),
  status: reservationStatus("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
export type SlotCapacity = typeof slotCapacity.$inferSelect;
