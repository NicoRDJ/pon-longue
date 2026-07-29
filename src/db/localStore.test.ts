import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { rmSync } from "node:fs";
import path from "node:path";
import {
  getLocalAvailability,
  bookLocalReservation,
  __resetLocalStoreForTests,
} from "./localStore";

const DATA_FILE = path.join(process.cwd(), ".data", "local-reservations.json");

function baseInput(
  overrides: Partial<Parameters<typeof bookLocalReservation>[0]> = {},
) {
  return {
    name: "Ana Torres",
    email: null,
    phone: null,
    partySize: 4,
    date: "2099-01-01",
    time: "16:00",
    occasion: null,
    notes: null,
    ...overrides,
  };
}

beforeEach(() => {
  rmSync(DATA_FILE, { force: true });
  __resetLocalStoreForTests();
});

afterEach(() => {
  rmSync(DATA_FILE, { force: true });
  __resetLocalStoreForTests();
});

describe("localStore", () => {
  it("seeds default slots (16:00–21:00 every 30 min, capacity 30) with zero booked", async () => {
    const slots = await getLocalAvailability("2099-01-01");
    expect(slots).toHaveLength(11);
    expect(slots[0]).toEqual({ time: "16:00", capacity: 30, booked: 0 });
    expect(slots.at(-1)).toEqual({ time: "21:00", capacity: 30, booked: 0 });
    expect(slots.every((s) => s.capacity === 30)).toBe(true);
  });

  it("books a reservation and reflects it in availability", async () => {
    const result = await bookLocalReservation(baseInput());
    expect(result.status).toBe("confirmed");
    expect(result.id).toBeTruthy();
    expect(result.remaining).toBe(26);

    const slots = await getLocalAvailability("2099-01-01");
    const slot = slots.find((s) => s.time === "16:00");
    expect(slot?.booked).toBe(4);
  });

  it("rejects a booking that would exceed slot capacity", async () => {
    const result = await bookLocalReservation(baseInput({ partySize: 31 }));
    expect(result.status).toBe("full");
    expect(result.remaining).toBe(30);
    expect(result.id).toBeNull();
  });

  it("fills a slot exactly to capacity across bookings, then rejects the next", async () => {
    const first = await bookLocalReservation(baseInput({ partySize: 30 }));
    expect(first.status).toBe("confirmed");
    expect(first.remaining).toBe(0);

    const second = await bookLocalReservation(baseInput({ partySize: 1 }));
    expect(second.status).toBe("full");
    expect(second.remaining).toBe(0);
  });

  it("rejects a time that isn't a configured slot", async () => {
    const result = await bookLocalReservation(baseInput({ time: "15:00" }));
    expect(result.status).toBe("unknown_slot");
  });

  it("rejects an invalid party size", async () => {
    const result = await bookLocalReservation(baseInput({ partySize: 0 }));
    expect(result.status).toBe("invalid_party_size");
  });
});
