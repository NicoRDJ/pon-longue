export interface TimeSlot {
  time: string;
  capacity: number;
  booked: number;
}

// Mock availability data. In production, replace the usage of this module
// (see useAvailability in ReservationWizard) with a fetch to the real
// reservations API — same shape ({ time, capacity, booked }[]) so the UI
// (status dots, disabled full slots) doesn't need to change.
export const timeSlots: TimeSlot[] = [
  { time: "18:00", capacity: 40, booked: 6 },
  { time: "19:00", capacity: 40, booked: 21 },
  { time: "20:00", capacity: 40, booked: 33 },
  { time: "21:00", capacity: 30, booked: 30 },
  { time: "22:00", capacity: 30, booked: 9 },
];

export type SlotStatus = "open" | "low" | "full";

export function getSlotStatus(slot: TimeSlot): SlotStatus {
  const ratio = slot.booked / slot.capacity;
  if (ratio >= 1) return "full";
  if (ratio >= 0.75) return "low";
  return "open";
}
