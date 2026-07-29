"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { DictKey } from "@/lib/i18n/dictionaries";

const tiles = [
  {
    captionKey: "gallery.c1",
    gradient: "from-[#2a2117] to-brass",
    span: "col-span-2 row-span-2",
  },
  {
    captionKey: "gallery.c2",
    gradient: "from-emerald to-brass-light",
    span: "",
  },
  { captionKey: "gallery.c3", gradient: "from-[#201c16] to-emerald", span: "" },
  {
    captionKey: "gallery.c4",
    gradient: "from-emerald to-[#201c16]",
    span: "row-span-2",
  },
  { captionKey: "gallery.c5", gradient: "from-brass to-[#201c16]", span: "" },
  { captionKey: "gallery.c6", gradient: "from-[#17171b] to-brass", span: "" },
  { captionKey: "gallery.c7", gradient: "from-emerald to-brass", span: "" },
] satisfies { captionKey: DictKey; gradient: string; span: string }[];

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="galeria" className="bg-obsidian px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="text-brass mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="bg-brass h-px w-6" />
            {t("gallery.eyebrow")}
          </div>
          <h2 className="font-display text-cream text-3xl sm:text-4xl">
            {t("gallery.title")}
          </h2>
          <p className="text-cream-muted mt-3 text-[13px] italic opacity-70">
            {t("gallery.sampleNote")}
          </p>
        </div>

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3.5 md:grid-cols-4">
          {tiles.map((tile) => (
            <figure
              key={tile.captionKey}
              className={`relative m-0 flex items-end overflow-hidden rounded-xl bg-gradient-to-br p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${tile.gradient} ${tile.span}`}
            >
              <figcaption className="text-cream rounded-full bg-[rgba(11,13,16,0.55)] px-2.5 py-1.5 text-xs tracking-[0.04em] uppercase backdrop-blur-[4px]">
                {t(tile.captionKey)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
