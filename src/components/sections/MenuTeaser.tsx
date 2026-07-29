"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const highlights = [
  { nameKey: "menu.h1Name", descKey: "menu.h1Desc", price: "$48.000" },
  { nameKey: "menu.h2Name", descKey: "menu.h2Desc", price: "$62.000" },
  { nameKey: "menu.h3Name", descKey: "menu.h3Desc", price: "$98.000" },
] as const;

export default function MenuTeaser() {
  const { t } = useLanguage();

  return (
    <section id="carta-teaser" className="bg-obsidian px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="text-brass mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="bg-brass h-px w-6" />
            {t("menu.eyebrow")}
          </div>
          <h2 className="font-display text-cream text-3xl sm:text-4xl">
            {t("menu.title")}
          </h2>
          <p className="text-cream-muted mt-3.5 max-w-lg">{t("menu.lead")}</p>

          <Link
            href="/carta"
            className="from-brass-light to-brass text-obsidian mt-6.5 inline-flex rounded-full bg-gradient-to-br px-7 py-3.5 text-sm font-semibold"
          >
            {t("menu.ctaFull")}
          </Link>

          <div className="border-brass/35 bg-brass/[0.06] text-cream-muted mt-6 flex items-start gap-3 rounded-2xl border border-dashed p-4.5 text-[13px]">
            <span
              aria-hidden="true"
              className="border-brass/35 grid h-[30px] w-[30px] flex-none grid-cols-3 grid-rows-3 gap-0.5 rounded-md border p-[3px]"
            >
              {Array.from({ length: 9 }, (_, i) => (
                <span
                  key={i}
                  className={i % 2 === 0 ? "bg-brass-light rounded-[1px]" : ""}
                />
              ))}
            </span>
            <span>{t("menu.qrNote")}</span>
          </div>
        </div>

        <div className="grid gap-4.5">
          {highlights.map((h) => (
            <div
              key={h.nameKey}
              className="bg-obsidian-soft flex justify-between gap-4 rounded-2xl border border-white/10 p-5.5"
            >
              <div>
                <div className="font-display text-cream text-[17px]">
                  {t(h.nameKey)}
                </div>
                <div className="text-cream-muted mt-1 text-[13px]">
                  {t(h.descKey)}
                </div>
              </div>
              <div className="font-display text-brass-light whitespace-nowrap">
                {h.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
