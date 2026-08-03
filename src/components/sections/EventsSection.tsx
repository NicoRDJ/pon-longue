"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EventsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="eventos"
      className="overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(135deg, #1b1310, var(--color-emerald) 130%)",
      }}
    >
      <ScrollReveal className="mx-auto max-w-2xl text-center">
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
      </ScrollReveal>

      {/* Sized by height + its natural aspect ratio (not full-bleed), so
          the full photo shows uncropped without leaving large empty
          gradient margins on wide screens. */}
      <ScrollReveal
        delay={150}
        className="border-brass/35 relative mx-auto mt-14 aspect-[941/1672] h-[56vh] max-h-[560px] min-h-[320px] overflow-hidden rounded-2xl border shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
      >
        <Image
          src="/photos/celebracion-barman.png"
          alt={t("events.photoAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 560px"
        />
      </ScrollReveal>
    </section>
  );
}
