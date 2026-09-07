// Local, file-simulated database for reservations. Used automatically
// whenever DATABASE_URL/POSTGRES_URL isn't set (see reservationsStore.ts),
// so the wizard can book automatically before real Postgres is provisioned
// — no cloud setup required for local development or an early launch.
//
// Data lives in a JSON file under .data/ (gitignored) so it survives dev
// server restarts. Writes are best-effort: on a read-only filesystem (e.g.
// a serverless cold start) they're caught and the store keeps working
// in-memory for the lifetime of that instance instead of crashing.

import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DEFAULT_SLOTS } from "@/lib/hours";
import { isPastCancellationCutoff } from "@/lib/reservation";

type ReservationStatus = "confirmed" | "cancelled";

type LocalReservation = {
  id: string;
  confirmationCode: string;
  name: string;
  email: string | null;
  phone: string | null;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  occasion: string | null;
  notes: string | null;
  status: ReservationStatus;
  createdAt: string;
};

type LocalSlot = { slotTime: string; capacity: number };

type StoreData = {
  slots: LocalSlot[];
  reservations: LocalReservation[];
};

export type BookResult = {
  id: string | null;
  code: string | null;
  status: "confirmed" | "full" | "unknown_slot" | "invalid_party_size";
  remaining: number | null;
};

export type ReservationSummary = {
  id: string;
  code: string;
  name: string;
  email: string | null;
  partySize: number;
  date: string;
  time: string;
  status: ReservationStatus;
};

export type CancelResult = {
  status: "cancelled" | "not_found" | "already_cancelled" | "too_late";
  name?: string;
  email?: string | null;
  date?: string;
  time?: string;
};

const DATA_FILE = path.join(process.cwd(), ".data", "local-reservations.json");

let persistenceWarned = false;

function defaultData(): StoreData {
  return { slots: DEFAULT_SLOTS.map((s) => ({ ...s })), reservations: [] };
}

// Generates a short, human-typeable confirmation code like "PON-A3F9K2".
// This is the identifier customers actually use — typed into the
// "cancelar" lookup form, or embedded in the emailed cancel link
// (/cancelar/<code>) so clicking it goes straight there too.
function generateCodeCandidate(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `PON-${code}`;
}

// Keeps generating candidates until one doesn't collide with an existing
// reservation's code (checked against *all* reservations, including
// cancelled ones, so a cancelled reservation's code can never be reissued
// to someone else).
function generateConfirmationCode(data: StoreData): string {
  let code = generateCodeCandidate();
  let attempts = 0;
  while (
    data.reservations.some(
      (r) => r.confirmationCode.toUpperCase() === code.toUpperCase(),
    )
  ) {
    code = generateCodeCandidate();
    attempts += 1;
    if (attempts > 20) {
      throw new Error(
        "Couldn't generate a unique confirmation code after 20 attempts",
      );
    }
  }
  return code;
}

// No in-memory cache between calls — always read the file fresh and
// write it back immediately. At this venue's scale (a handful of
// reservations at a time, not high-frequency traffic) the extra disk
// read/write per request is free, and it rules out an entire class of
// staleness bugs: two route handlers (or two module instances, which can
// happen under dev hot-reload/Turbopack) ending up with different
// snapshots in memory until the server restarts.
function load(): StoreData {
  try {
    const raw = readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as StoreData;
    return {
      slots: parsed.slots?.length ? parsed.slots : defaultData().slots,
      reservations: parsed.reservations ?? [],
    };
  } catch {
    return defaultData();
  }
}

function persist(data: StoreData) {
  try {
    mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    if (!persistenceWarned) {
      persistenceWarned = true;
      console.warn(
        "Local reservation store: couldn't persist to disk, continuing " +
          "in-memory for this instance only.",
        err,
      );
    }
  }
}

// Per date+time async lock so two near-simultaneous requests for the last
// open spot in a slot can't both read the same "booked" count and both
// succeed — mirrors what pg_advisory_xact_lock does for the real DB.
const slotLocks = new Map<string, Promise<unknown>>();

async function withSlotLock<T>(
  key: string,
  fn: () => T | Promise<T>,
): Promise<T> {
  const prior = slotLocks.get(key) ?? Promise.resolve();
  let release: () => void;
  const next = new Promise<void>((resolve) => (release = resolve));
  slotLocks.set(
    key,
    prior.then(() => next),
  );
  await prior;
  try {
    return await fn();
  } finally {
    release!();
    if (slotLocks.get(key) === next) slotLocks.delete(key);
  }
}

export async function getLocalAvailability(
  date: string,
): Promise<{ time: string; capacity: number; booked: number }[]> {
  const data = load();
  return data.slots
    .slice()
    .sort((a, b) => a.slotTime.localeCompare(b.slotTime))
    .map((slot) => {
      const booked = data.reservations
        .filter(
          (r) =>
            r.reservationDate === date &&
            r.reservationTime === slot.slotTime &&
            r.status === "confirmed",
        )
        .reduce((sum, r) => sum + r.partySize, 0);
      return { time: slot.slotTime, capacity: slot.capacity, booked };
    });
}

export async function bookLocalReservation(input: {
  name: string;
  email: string | null;
  phone: string | null;
  partySize: number;
  date: string;
  time: string;
  occasion: string | null;
  notes: string | null;
}): Promise<BookResult> {
  if (!input.partySize || input.partySize < 1) {
    return {
      id: null,
      code: null,
      status: "invalid_party_size",
      remaining: null,
    };
  }

  return withSlotLock(`${input.date}|${input.time}`, () => {
    const data = load();
    const slot = data.slots.find((s) => s.slotTime === input.time);
    if (!slot) {
      return { id: null, code: null, status: "unknown_slot", remaining: null };
    }

    const booked = data.reservations
      .filter(
        (r) =>
          r.reservationDate === input.date &&
          r.reservationTime === input.time &&
          r.status === "confirmed",
      )
      .reduce((sum, r) => sum + r.partySize, 0);

    if (booked + input.partySize > slot.capacity) {
      return {
        id: null,
        code: null,
        status: "full",
        remaining: Math.max(slot.capacity - booked, 0),
      };
    }

    const reservation: LocalReservation = {
      id: randomUUID(),
      confirmationCode: generateConfirmationCode(data),
      name: input.name,
      email: input.email,
      phone: input.phone,
      partySize: input.partySize,
      reservationDate: input.date,
      reservationTime: input.time,
      occasion: input.occasion,
      notes: input.notes,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    data.reservations.push(reservation);
    persist(data);

    return {
      id: reservation.id,
      code: reservation.confirmationCode,
      status: "confirmed",
      remaining: Math.max(slot.capacity - booked - input.partySize, 0),
    };
  });
}

export async function getLocalReservationByCode(
  code: string,
): Promise<ReservationSummary | null> {
  const data = load();
  const normalized = code.trim().toUpperCase();
  const r = data.reservations.find(
    (res) => res.confirmationCode.toUpperCase() === normalized,
  );
  if (!r) return null;
  return {
    id: r.id,
    code: r.confirmationCode,
    name: r.name,
    email: r.email,
    partySize: r.partySize,
    date: r.reservationDate,
    time: r.reservationTime,
    status: r.status,
  };
}

export async function cancelLocalReservation(
  code: string,
): Promise<CancelResult> {
  const normalized = code.trim().toUpperCase();
  return withSlotLock(`cancel|${normalized}`, () => {
    const data = load();
    const r = data.reservations.find(
      (res) => res.confirmationCode.toUpperCase() === normalized,
    );
    if (!r) return { status: "not_found" };
    if (r.status === "cancelled") {
      return {
        status: "already_cancelled",
        name: r.name,
        email: r.email,
        date: r.reservationDate,
        time: r.reservationTime,
      };
    }
    if (isPastCancellationCutoff(r.reservationDate, r.reservationTime)) {
      return {
        status: "too_late",
        name: r.name,
        email: r.email,
        date: r.reservationDate,
        time: r.reservationTime,
      };
    }

    r.status = "cancelled";
    persist(data);
    return {
      status: "cancelled",
      name: r.name,
      email: r.email,
      date: r.reservationDate,
      time: r.reservationTime,
    };
  });
}

// Test-only: kept as a no-op for compatibility with existing test files —
// there's no in-memory cache to reset anymore since load() always reads
// the file fresh. Deleting the file between tests (which the tests
// already do) is what actually resets state now.
export function __resetLocalStoreForTests() {}
