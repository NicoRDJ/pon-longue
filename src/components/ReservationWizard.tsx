"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { DictKey } from "@/lib/i18n/dictionaries";
import {
  buildReservationIcs,
  buildReservationMessage,
  formatDate,
  formatTime,
} from "@/lib/reservation";
import {
  PHONE_E164,
  PHONE_DISPLAY,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
} from "@/lib/config";
import { VENUE_OPEN_TIME, LAST_RESERVATION_TIME } from "@/lib/hours";
import ParallaxImage from "@/components/ParallaxImage";

const STEPS = [
  { n: 1, key: "wizard.step1" },
  { n: 2, key: "wizard.step2" },
  { n: 3, key: "wizard.step3" },
  { n: 4, key: "wizard.step4" },
] as const satisfies { n: number; key: DictKey }[];

const OCCASIONS = [
  { value: "casual", key: "wizard.occasionCasual" },
  { value: "birthday", key: "wizard.occasionBirthday" },
  { value: "anniversary", key: "wizard.occasionAnniversary" },
  { value: "business", key: "wizard.occasionBusiness" },
  { value: "other", key: "wizard.occasionOther" },
] as const satisfies { value: string; key: DictKey }[];

type Channel = "whatsapp" | "call" | "email";
type Slot = { time: string; capacity: number; booked: number };
type SlotStatus = "open" | "low" | "full";
type BookingState = "idle" | "submitting" | "confirmed" | "full" | "error";

function slotStatus(slot: Slot): SlotStatus {
  const ratio = slot.booked / slot.capacity;
  if (ratio >= 1) return "full";
  if (ratio >= 0.75) return "low";
  return "open";
}

function Chip({
  selected,
  disabled,
  onClick,
  onKeyDown,
  children,
  ariaLabel,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="aria-checked:border-brass aria-checked:bg-brass/[0.14] aria-checked:text-brass-light hover:border-brass hover:text-brass-light text-cream-muted rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] transition-all disabled:cursor-not-allowed disabled:line-through disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default function ReservationWizard() {
  const { lang, t } = useLanguage();

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState("casual");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");

  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsFailed, setSlotsFailed] = useState(false);

  const [bookingState, setBookingState] = useState<BookingState>("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeGroupRef = useRef<HTMLDivElement>(null);
  const timeFallbackRef = useRef<HTMLInputElement>(null);

  // Live mode: we successfully loaded real availability for this date, so
  // the primary action is automatic confirmation against the database.
  // Fallback mode (slotsFailed): degrade gracefully to manual WhatsApp/
  // call/email, e.g. while the database isn't connected yet.
  const liveMode = !slotsFailed;

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    /* eslint-disable react-hooks/set-state-in-effect -- this effect's job
       is fetching availability for the selected date; loading/failed are
       reset synchronously right before the request starts. */
    setSlotsLoading(true);
    setSlotsFailed(false);
    /* eslint-enable react-hooks/set-state-in-effect */
    fetch(`/api/availability?date=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data: { slots: Slot[] }) => {
        if (cancelled) return;
        setSlots(data.slots);
        setTime((current) =>
          data.slots.some((s) => s.time === current) ? current : "",
        );
      })
      .catch(() => {
        if (cancelled) return;
        setSlots(null);
        setSlotsFailed(true);
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  const slotStatusLabel = {
    open: t("reserve.legendOpen"),
    low: t("reserve.legendLow"),
    full: t("reserve.legendFull"),
  };

  function moveTimeFocus(dir: 1 | -1, currentIdx: number) {
    if (!slots) return;
    const next = slots[(currentIdx + dir + slots.length) % slots.length];
    if (!next || slotStatus(next) === "full") return;
    setTime(next.time);
    document.getElementById(`time-chip-${next.time}`)?.focus();
  }

  function validateStep(n: number): boolean {
    if (n === 2) return Boolean(date && time);
    if (n === 3) return name.trim().length > 0;
    return true;
  }

  function goNext() {
    if (!validateStep(step)) {
      if (step === 2) {
        if (!date) {
          dateRef.current?.focus();
        } else if (slotsFailed) {
          timeFallbackRef.current?.focus();
        } else {
          timeGroupRef.current?.focus();
        }
      }
      if (step === 3) nameRef.current?.focus();
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  const peopleLabel =
    people === 1 ? t("reserve.personSingular") : t("reserve.personPlural");

  const previewRows = useMemo(() => {
    if (!name && !date && !time) return null;
    return [
      [t("reserve.previewName"), name || "—"],
      [t("reserve.previewPeople"), `${people} ${peopleLabel}`],
      [t("reserve.previewDate"), date ? formatDate(date, lang) : "—"],
      [t("reserve.previewTime"), time ? formatTime(time) : "—"],
    ];
  }, [name, date, time, people, peopleLabel, lang, t]);

  function downloadIcs() {
    if (!date || !time) return;
    const blob = buildReservationIcs({
      date,
      time,
      summary: t("reserve.icsSummary"),
      location: t("reserve.icsLocation"),
      description: `${people} ${peopleLabel}`,
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "reserva-pon-lounge.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function confirmAutomatically() {
    if (!name.trim() || !date || !time) {
      if (!name.trim()) {
        setStep(3);
        nameRef.current?.focus();
      } else {
        setStep(2);
      }
      return;
    }

    setBookingState("submitting");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          partySize: people,
          date,
          time,
          occasion,
          notes,
          lang,
        }),
      });

      if (res.status === 201) {
        setBookingState("confirmed");
        return;
      }
      if (res.status === 409) {
        setBookingState("full");
        return;
      }
      setBookingState("error");
    } catch {
      setBookingState("error");
    }
  }

  function contactManually() {
    const message = buildReservationMessage({
      lang,
      name,
      people,
      date,
      time,
      notes,
    });

    if (channel === "call") {
      window.location.href = `tel:${PHONE_E164}`;
    } else if (channel === "email") {
      const subject =
        lang === "es" ? "Reserva PON Lounge" : "PON Lounge reservation";
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    } else {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener",
      );
    }
  }

  const manualLabelKey: DictKey =
    channel === "call"
      ? "reserve.submitCall"
      : channel === "email"
        ? "reserve.submitEmail"
        : "reserve.submitWhatsapp";

  return (
    <section
      id="reservas"
      className="bg-obsidian relative overflow-hidden px-6 py-24"
    >
      <ParallaxImage
        src="/photos/coctel-de-autor.png"
        alt=""
        className="absolute inset-0 opacity-30"
        strength={16}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,13,16,0.6), rgba(11,13,16,0.92))",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="text-brass mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="bg-brass h-px w-6" />
            {t("reserve.eyebrow")}
          </div>
          <h2 className="font-display text-cream text-3xl sm:text-4xl">
            {t("reserve.title")}
          </h2>
          <p className="text-cream-muted mt-3.5">{t("reserve.lead")}</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:grid-cols-[260px_1fr]">
          <aside className="bg-obsidian-soft flex flex-col justify-between border border-white/10 p-7.5 md:border-r-0">
            <ol className="grid gap-5.5">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  aria-current={step === s.n ? "step" : undefined}
                  onClick={() => s.n < step && setStep(s.n)}
                  className={`text-cream-muted flex cursor-pointer items-center gap-3.5 text-sm transition-colors ${
                    step === s.n ? "text-cream font-semibold" : ""
                  } ${s.n < step ? "text-cream-muted" : ""}`}
                >
                  <span
                    className={`font-display flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border text-sm transition-all ${
                      step === s.n
                        ? "bg-brass border-brass text-obsidian"
                        : s.n < step
                          ? "border-brass text-brass-light"
                          : "border-white/10"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span>{t(s.key)}</span>
                </li>
              ))}
            </ol>

            <div className="mt-9 grid gap-2.5 border-t border-white/10 pt-5.5">
              <div className="text-cream-muted text-[11px] tracking-[0.06em] uppercase">
                {t("reserve.directTitle")}
              </div>
              <a
                href={`tel:${PHONE_E164}`}
                className="text-cream inline-flex w-fit items-center gap-2.5 text-sm"
              >
                <span className="text-brass">☎</span> {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-cream inline-flex w-fit items-center gap-2.5 text-sm"
              >
                <span className="text-brass">✉</span> {CONTACT_EMAIL}
              </a>
            </div>
          </aside>

          <div className="bg-obsidian-soft border border-white/10 p-8.5">
            {step === 1 && (
              <div>
                <h3 className="font-display text-cream mb-5.5 text-xl">
                  {t("wizard.pane1Title")}
                </h3>
                <div
                  role="radiogroup"
                  aria-label="Ocasión"
                  className="flex flex-wrap gap-2"
                >
                  {OCCASIONS.map((o) => (
                    <Chip
                      key={o.value}
                      selected={occasion === o.value}
                      onClick={() => setOccasion(o.value)}
                    >
                      {t(o.key)}
                    </Chip>
                  ))}
                </div>

                <div className="mt-6.5">
                  <label
                    id="people-label"
                    className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                  >
                    {t("reserve.people")}
                  </label>
                  <div
                    role="group"
                    aria-labelledby="people-label"
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-1.5"
                  >
                    <button
                      type="button"
                      aria-label="Disminuir número de personas"
                      onClick={() => setPeople((p) => Math.max(1, p - 1))}
                      disabled={people <= 1}
                      className="hover:border-brass hover:text-brass-light flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/10 text-lg disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      −
                    </button>
                    <output className="font-display min-w-[70px] text-center text-lg">
                      {people}
                    </output>
                    <button
                      type="button"
                      aria-label="Aumentar número de personas"
                      onClick={() => setPeople((p) => Math.min(30, p + 1))}
                      disabled={people >= 30}
                      className="hover:border-brass hover:text-brass-light flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/10 text-lg disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-cream mb-5.5 text-xl">
                  {t("wizard.pane2Title")}
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="rDate"
                    className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                  >
                    {t("reserve.date")}
                  </label>
                  <input
                    id="rDate"
                    ref={dateRef}
                    type="date"
                    value={date}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDate(value);
                      setTime("");
                      setSlots(null);
                      setSlotsFailed(false);
                    }}
                    className="focus-visible:border-brass text-cream w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm"
                  />
                </div>

                {!date && (
                  <p className="text-cream-muted text-sm italic">
                    {t("reserve.chooseDateFirst")}
                  </p>
                )}

                {date && slotsLoading && (
                  <p className="text-cream-muted text-sm italic">
                    {t("reserve.slotsLoading")}
                  </p>
                )}

                {date && !slotsLoading && liveMode && slots && (
                  <div>
                    <label
                      id="time-label"
                      className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                    >
                      {t("reserve.time")}
                    </label>
                    <div
                      ref={timeGroupRef}
                      role="radiogroup"
                      aria-labelledby="time-label"
                      tabIndex={-1}
                      className="flex flex-wrap gap-2"
                    >
                      {slots.map((slot, idx) => {
                        const status = slotStatus(slot);
                        const dotClass =
                          status === "full"
                            ? "bg-[#8a5050]"
                            : status === "low"
                              ? "bg-brass"
                              : "bg-[#4caf7d]";
                        return (
                          <Chip
                            key={slot.time}
                            selected={time === slot.time}
                            disabled={status === "full"}
                            ariaLabel={`${formatTime(slot.time)} — ${slotStatusLabel[status]}`}
                            onClick={() => setTime(slot.time)}
                            onKeyDown={(e) => {
                              const dir =
                                e.key === "ArrowRight"
                                  ? 1
                                  : e.key === "ArrowLeft"
                                    ? -1
                                    : 0;
                              if (!dir) return;
                              e.preventDefault();
                              moveTimeFocus(dir, idx);
                            }}
                          >
                            <span
                              id={`time-chip-${slot.time}`}
                              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${dotClass}`}
                              aria-hidden="true"
                            />
                            {formatTime(slot.time)}
                          </Chip>
                        );
                      })}
                    </div>
                    <div className="text-cream-muted mt-3 flex flex-wrap gap-4 text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="h-2 w-2 rounded-full bg-[#4caf7d]" />
                        {t("reserve.legendOpen")}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <i className="bg-brass h-2 w-2 rounded-full" />
                        {t("reserve.legendLow")}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <i className="h-2 w-2 rounded-full bg-[#8a5050]" />
                        {t("reserve.legendFull")}
                      </span>
                    </div>
                  </div>
                )}

                {date && !slotsLoading && slotsFailed && (
                  <div>
                    <label
                      htmlFor="rTimeFallback"
                      className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                    >
                      {t("reserve.time")}
                    </label>
                    <input
                      id="rTimeFallback"
                      ref={timeFallbackRef}
                      type="time"
                      min={VENUE_OPEN_TIME}
                      max={LAST_RESERVATION_TIME}
                      step={1800}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="focus-visible:border-brass text-cream w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm"
                    />
                    <p className="text-cream-muted mt-2.5 text-xs italic">
                      {t("reserve.slotsUnavailable")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-cream mb-5.5 text-xl">
                  {t("wizard.pane3Title")}
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="rName"
                    className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                  >
                    {t("reserve.name")}
                  </label>
                  <input
                    id="rName"
                    ref={nameRef}
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre y apellido"
                    className="focus-visible:border-brass text-cream w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="rEmail"
                    className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                  >
                    {t("reserve.email")}
                  </label>
                  <input
                    id="rEmail"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@correo.com"
                    className="focus-visible:border-brass text-cream w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rNotes"
                    className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                  >
                    {t("reserve.notes")}
                  </label>
                  <textarea
                    id="rNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Celebración, alergias, zona VIP..."
                    className="focus-visible:border-brass text-cream min-h-[80px] w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-display text-cream mb-5.5 text-xl">
                  {t("wizard.pane4Title")}
                </h3>

                {bookingState === "confirmed" ? (
                  <div className="rounded-2xl border border-[#4caf7d]/40 bg-[#4caf7d]/[0.08] p-6 text-center">
                    <div className="mb-2 text-2xl">✓</div>
                    <p className="text-cream font-semibold">
                      {t("reserve.confirmedTitle")}
                    </p>
                    <p className="text-cream-muted mt-1.5 text-sm">
                      {t("reserve.confirmedBody")}
                    </p>
                    {date && time && (
                      <button
                        type="button"
                        onClick={downloadIcs}
                        className="border-brass/35 text-brass-light hover:bg-brass/[0.08] mt-4 flex w-full justify-center rounded-full border border-dashed py-2.5 text-[13px] font-semibold"
                      >
                        {t("reserve.addToCalendar")}
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="border-brass/35 bg-brass/[0.05] rounded-2xl border border-dashed p-5">
                      <div className="text-brass mb-2.5 text-[11px] font-bold tracking-[0.1em] uppercase">
                        {t("reserve.previewTitle")}
                      </div>
                      {previewRows ? (
                        <div>
                          {previewRows.map(([label, value]) => (
                            <div
                              key={label}
                              className="flex justify-between gap-3 border-b border-dashed border-white/10 py-1.5 text-sm last:border-b-0"
                            >
                              <span className="text-cream-muted">{label}</span>
                              <span className="text-cream text-right font-semibold">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-cream-muted text-[13px] italic">
                          {t("reserve.previewEmpty")}
                        </p>
                      )}
                    </div>

                    {liveMode && (
                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={confirmAutomatically}
                          disabled={bookingState === "submitting"}
                          className="from-brass-light to-brass text-obsidian flex w-full justify-center rounded-full bg-gradient-to-br px-6.5 py-3.5 text-sm font-semibold disabled:opacity-60"
                        >
                          {bookingState === "submitting"
                            ? t("reserve.confirming")
                            : t("reserve.confirmAuto")}
                        </button>
                        {bookingState === "full" && (
                          <div className="mt-3 text-center">
                            <p className="text-sm text-[#e08a8a]">
                              {t("reserve.errorFull")}
                            </p>
                            <button
                              type="button"
                              onClick={() => setStep(2)}
                              className="text-brass-light mt-1.5 text-sm underline"
                            >
                              {t("reserve.chooseAnotherTime")}
                            </button>
                          </div>
                        )}
                        {bookingState === "error" && (
                          <p className="mt-3 text-center text-sm text-[#e08a8a]">
                            {t("reserve.errorGeneric")}
                          </p>
                        )}
                      </div>
                    )}

                    <div
                      className={
                        liveMode ? "mt-7 border-t border-white/10 pt-6" : "mt-5"
                      }
                    >
                      {liveMode && (
                        <p className="text-cream-muted mb-4 text-center text-xs tracking-[0.05em] uppercase">
                          {t("reserve.orContactDirect")}
                        </p>
                      )}
                      <label
                        id="channel-label"
                        className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                      >
                        {t("reserve.channelLabel")}
                      </label>
                      <div
                        role="radiogroup"
                        aria-labelledby="channel-label"
                        className="mb-4 flex flex-wrap gap-2"
                      >
                        <Chip
                          selected={channel === "whatsapp"}
                          onClick={() => setChannel("whatsapp")}
                        >
                          WhatsApp
                        </Chip>
                        <Chip
                          selected={channel === "call"}
                          onClick={() => setChannel("call")}
                        >
                          {t("reserve.channelCall")}
                        </Chip>
                        <Chip
                          selected={channel === "email"}
                          onClick={() => setChannel("email")}
                        >
                          {t("reserve.channelEmail")}
                        </Chip>
                      </div>
                      <button
                        type="button"
                        onClick={contactManually}
                        className={
                          liveMode
                            ? "border-cream text-cream hover:border-brass flex w-full justify-center rounded-full border px-6.5 py-3 text-sm font-semibold"
                            : "from-brass-light to-brass text-obsidian flex w-full justify-center rounded-full bg-gradient-to-br px-6.5 py-3.5 text-sm font-semibold"
                        }
                      >
                        {t(manualLabelKey)}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {bookingState !== "confirmed" && (
              <div className="mt-7.5 flex items-center justify-between gap-3.5 border-t border-white/10 pt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-cream hover:border-brass rounded-full border border-white/15 px-6.5 py-3 text-sm font-semibold"
                  >
                    {t("wizard.back")}
                  </button>
                ) : (
                  <span />
                )}

                {step < 4 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="from-brass-light to-brass text-obsidian ml-auto rounded-full bg-gradient-to-br px-6.5 py-3 text-sm font-semibold"
                  >
                    {t("wizard.next")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-cream-muted mx-auto mt-7 max-w-3xl text-center text-[13px]">
          {t("reserve.p1")} <span aria-hidden="true"> · </span>
          {t("reserve.p2")} <span aria-hidden="true"> · </span>
          {t("reserve.p3")}
        </p>
      </div>
    </section>
  );
}
