import type { Metadata } from "next";
import { z } from "zod";
import Header from "@/components/Header";
import CartaFooter from "@/components/CartaFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SkipLink from "@/components/SkipLink";
import CancelReservationPanel, {
  type CancelPageStatus,
} from "@/components/CancelReservationPanel";
import { getReservationById } from "@/db/reservationsStore";
import { isPastCancellationCutoff } from "@/lib/reservation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cancelar reserva",
  // Personal, reservation-specific link shared via email — never index it.
  robots: { index: false, follow: false },
};

export default async function CancelReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = z.string().uuid().safeParse(id);

  const reservation = parsedId.success
    ? await getReservationById(parsedId.data)
    : null;

  let status: CancelPageStatus;
  if (!reservation) {
    status = "not_found";
  } else if (reservation.status === "cancelled") {
    status = "already_cancelled";
  } else if (isPastCancellationCutoff(reservation.date, reservation.time)) {
    status = "too_late";
  } else {
    status = "confirmed";
  }

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden px-6 pt-40 pb-24">
          <CancelReservationPanel
            id={parsedId.success ? parsedId.data : id}
            status={status}
            reservation={
              reservation
                ? {
                    name: reservation.name,
                    date: reservation.date,
                    time: reservation.time,
                    partySize: reservation.partySize,
                  }
                : null
            }
          />
        </section>
      </main>
      <CartaFooter />
      <WhatsAppFloat />
    </>
  );
}
