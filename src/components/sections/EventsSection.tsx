"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EventsSection() {
  const { t } = useLanguage();

  return (
    <section id="eventos" className="relative overflow-hidden px-6 py-24">
      <Image
        src="/photos/celebracion-barman.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(27,19,16,0.93), rgba(22,52,43,0.88) 130%)",
        }}
      />
      <div className="relative z-[2] mx-auto max-w-xl text-center">
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
