"use client";

import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { timeSlots, getSlotStatus } from "@/data/availability";
import {
  buildReservationIcs,
  buildReservationMessage,
  formatDate,
  formatTime,
} from "@/lib/reservation";

const PHONE_E164 = "+573000000000"; // TODO: replace with the real phone number
const CONTACT_EMAIL = "hola@ponlounge.co"; // TODO: replace with the real reservations email
const WHATSAPP_NUMBER = "573000000000"; // TODO: replace with the real WhatsApp number

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
  const [notes, setNotes] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");

  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeGroupRef = useRef<HTMLDivElement>(null);

  const slotStatusLabel = {
    open: t("reserve.legendOpen"),
    low: t("reserve.legendLow"),
    full: t("reserve.legendFull"),
  };

  function selectTime(chipTime: string) {
    setTime(chipTime);
  }

  function moveTimeFocus(dir: 1 | -1, currentIdx: number) {
    const next =
      timeSlots[(currentIdx + dir + timeSlots.length) % timeSlots.length];
    if (!next || getSlotStatus(next) === "full") return;
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
        (date ? timeGroupRef.current : dateRef.current)?.focus();
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !date || !time) {
      if (!name.trim()) {
        setStep(3);
        nameRef.current?.focus();
      } else {
        setStep(2);
      }
      return;
    }

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

  const submitLabelKey: DictKey =
    channel === "call"
      ? "reserve.submitCall"
      : channel === "email"
        ? "reserve.submitEmail"
        : "reserve.submitWhatsapp";

  return (
    <section id="reservas" className="bg-obsidian px-6 py-24">
      <div className="mx-auto max-w-6xl">
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
                <span className="text-brass">☎</span> +57 300 000 0000
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-cream inline-flex w-fit items-center gap-2.5 text-sm"
              >
                <span className="text-brass">✉</span> {CONTACT_EMAIL}
              </a>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="bg-obsidian-soft border border-white/10 p-8.5"
          >
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
                    onChange={(e) => setDate(e.target.value)}
                    className="focus-visible:border-brass text-cream w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm"
                  />
                </div>
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
                    {timeSlots.map((slot, idx) => {
                      const status = getSlotStatus(slot);
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
                          onClick={() => selectTime(slot.time)}
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
                <div>
                  <label
                    id="channel-label"
                    className="text-cream-muted mb-2 block text-xs tracking-[0.06em] uppercase"
                  >
                    {t("reserve.channelLabel")}
                  </label>
                  <div
                    role="radiogroup"
                    aria-labelledby="channel-label"
                    className="flex flex-wrap gap-2"
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
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-display text-cream mb-5.5 text-xl">
                  {t("wizard.pane4Title")}
                </h3>
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
                  {date && time && (
                    <button
                      type="button"
                      onClick={downloadIcs}
                      className="border-brass/35 text-brass-light hover:bg-brass/[0.08] mt-3.5 flex w-full justify-center rounded-full border border-dashed py-2.5 text-[13px] font-semibold"
                    >
                      {t("reserve.addToCalendar")}
                    </button>
                  )}
                </div>
              </div>
            )}

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

              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="from-brass-light to-brass text-obsidian ml-auto rounded-full bg-gradient-to-br px-6.5 py-3 text-sm font-semibold"
                >
                  {t("wizard.next")}
                </button>
              ) : (
                <button
                  type="submit"
                  className="from-brass-light to-brass text-obsidian ml-auto rounded-full bg-gradient-to-br px-6.5 py-3 text-sm font-semibold"
                >
                  {t(submitLabelKey)}
                </button>
              )}
            </div>
          </form>
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
