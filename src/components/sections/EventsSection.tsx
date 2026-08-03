"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EventsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="eventos"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(135deg, #1b1310, var(--color-emerald) 130%)",
      }}
    >
      {/* object-contain (not cover) so the full, uncropped photo shows —
          the section is tall enough (min-h-screen) to give a portrait
          photo room to breathe; the gradient above fills any letterboxed
          edges instead of leaving them blank. */}
      <Image
        src="/photos/celebracion-barman.png"
        alt={t("events.photoAlt")}
        fill
        className="object-contain"
        sizes="100vw"
      />

      <div className="border-brass/20 relative z-[2] mx-auto max-w-xl rounded-3xl border bg-[rgba(11,13,16,0.72)] px-8 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="text-brass mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
          <span className="bg-brass h-px w-6" />
          {t("events.eyebrow")}
        </div>
        <h2 className="font-display text-cream text-3xl sm:text-4xl">
          {t("events.title")}
        </h2>
        <p className="text-cream-muted mt-4 text-base">{t("events.lead")}</p>
        <a
          href="#reservas"
          className="from-brass-light to-brass text-obsidian mt-7.5 inline-flex rounded-full bg-gradient-to-br px-7 py-3.5 text-sm font-semibold"
        >
          {t("events.cta")}
        </a>
      </div>
    </section>
  );
}
