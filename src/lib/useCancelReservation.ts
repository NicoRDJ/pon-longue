"use client";

import { useState } from "react";

// Shared network + state logic for cancelling a reservation by id — used by
// both the inline "cancel" block in ReservationWizard (right after booking,
// same session) and the standalone /cancelar/[id] page (reached via the
// link in the confirmation email). Keeping the fetch/error handling here
// means both UIs only have to render, not duplicate the request logic.

export type CancelState =
  | "idle"
  | "confirming"
  | "cancelling"
  | "cancelled"
  | "tooLate"
  | "alreadyCancelled"
  | "error";

export function useCancelReservation(id: string) {
  const [state, setState] = useState<CancelState>("idle");

  async function requestCancel() {
    setState("cancelling");
    try {
      const res = await fetch(`/api/reservations/${id}/cancel`, {
        method: "POST",
      });

      if (res.status === 200) {
        setState("cancelled");
        return;
      }
      if (res.status === 409) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setState(body?.error === "too_late" ? "tooLate" : "alreadyCancelled");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  return { state, setState, requestCancel };
}
