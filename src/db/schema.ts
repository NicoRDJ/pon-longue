import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  date,
  time,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const reservationStatus = pgEnum("reservation_status", [
  "confirmed",
  "pending_deposit",
  "cancelled",
]);

export const slotCapacity = pgTable("slot_capacity", {
  slotTime: time("slot_time").primaryKey(),
  capacity: integer("capacity").notNull(),
});

export const reservations = pgTable("reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  confirmationCode: text("confirmation_code").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  partySize: integer("party_size").notNull(),
  reservationDate: date("reservation_date").notNull(),
  reservationTime: time("reservation_time").notNull(),
  occasion: text("occasion"),
  notes: text("notes"),
  status: reservationStatus("status").notNull().default("confirmed"),
  // Deposit is self-declared by the customer (amount + a reference code
  // they put in the bank transfer's description) and verified manually
  // by staff against the bank statement — there's no payment gateway
  // wired up yet.
  depositRequired: integer("deposit_required").notNull().default(0),
  depositAmount: integer("deposit_amount").notNull().default(0),
  depositReference: text("deposit_reference"),
  depositVerified: boolean("deposit_verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
export type SlotCapacity = typeof slotCapacity.$inferSelect;
