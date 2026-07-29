"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { MenuCategory } from "@/data/menu";
import MenuItemPhoto from "@/components/MenuItemPhoto";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function MenuAccordion({
  categories,
}: {
  categories: MenuCategory[];
}) {
  const { lang } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  function moveFocus(dir: 1 | -1, idx: number) {
    const next =
      categories[(idx + dir + categories.length) % categories.length];
    if (next) document.getElementById(`acc-trigger-${next.id}`)?.focus();
  }

  return (
    <div className="mx-auto max-w-4xl">
      {categories.map((cat, idx) => {
        const isOpen = openId === cat.id;
        return (
          <div key={cat.id} className="border-b border-white/10 first:border-t">
            <button
              type="button"
              id={`acc-trigger-${cat.id}`}
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${cat.id}`}
              onClick={() => toggle(cat.id)}
              onKeyDown={(e) => {
                const dir =
                  e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
                if (!dir) return;
                e.preventDefault();
                moveFocus(dir, idx);
              }}
              className="font-display text-cream hover:text-brass-light flex w-full items-center justify-between gap-4 py-5.5 text-left text-[clamp(19px,2.6vw,24px)] transition-colors"
            >
              <span>{cat[lang]}</span>
              <span
                aria-hidden="true"
                className={`text-brass font-sans text-xl font-light transition-transform ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div
                id={`acc-panel-${cat.id}`}
                role="region"
                aria-labelledby={`acc-trigger-${cat.id}`}
                className="pb-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name_es}
                      className="hover:border-brass/35 bg-obsidian flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-white/10 p-6 transition-all hover:-translate-y-0.5"
                    >
                      <MenuItemPhoto
                        image={item.image}
                        alt={item[`name_${lang}`]}
                        className="-mx-6 -mt-6 aspect-[4/3] w-[calc(100%+3rem)] rounded-none"
                      />
                      <div className="font-display text-cream text-lg">
                        {item[`name_${lang}`]}
                      </div>
                      <p className="text-cream-muted text-[13px] leading-relaxed">
                        {item[`desc_${lang}`]}
                      </p>
                      {item.price != null && (
                        <span className="border-brass/35 text-brass-light font-display self-start rounded-full border px-3 py-1 text-[17px]">
                          {currency.format(item.price)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
