"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { DictKey } from "@/lib/i18n/dictionaries";

const tiles = [
  {
    captionKey: "gallery.c1",
    image: "/photos/pared-relojes.png",
    span: "col-span-2 row-span-2",
  },
  {
    captionKey: "gallery.c2",
    image: "/photos/barra-mojitos.png",
    span: "",
  },
  { captionKey: "gallery.c3", image: "/photos/zona-lounge.png", span: "" },
  {
    captionKey: "gallery.c4",
    image: "/photos/barra-bartender.png",
    span: "row-span-2",
  },
  { captionKey: "gallery.c5", image: "/photos/coctel-de-autor.png", span: "" },
  {
    captionKey: "gallery.c6",
    image: "/photos/pared-relojes-noche.png",
    span: "",
  },
  { captionKey: "gallery.c7", image: "/photos/servicio-mesera.png", span: "" },
] satisfies { captionKey: DictKey; image: string; span: string }[];

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
        </div>

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3.5 md:grid-cols-4">
          {tiles.map((tile) => (
            <figure
              key={tile.captionKey}
              className={`relative m-0 flex items-end overflow-hidden rounded-xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${tile.span}`}
            >
              <Image
                src={tile.image}
                alt={t(tile.captionKey)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(11,13,16,0.65), rgba(11,13,16,0) 55%)",
                }}
              />
              <figcaption className="text-cream relative rounded-full bg-[rgba(11,13,16,0.55)] px-2.5 py-1.5 text-xs tracking-[0.04em] uppercase backdrop-blur-[4px]">
                {t(tile.captionKey)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
