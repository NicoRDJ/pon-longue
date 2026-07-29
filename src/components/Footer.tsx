"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#08080a] px-6 py-15 text-sm">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="font-display text-cream mb-3.5 text-xl tracking-wide">
              PON <em className="text-brass-light italic not-italic">Lounge</em>
            </div>
            <p className="text-cream-muted">{t("footer.about")}</p>
          </div>
          <div>
            <h5 className="text-cream mb-4 text-xs tracking-[0.1em] uppercase">
              {t("footer.linksTitle")}
            </h5>
            <ul className="text-cream-muted grid gap-2">
              <li>
                <Link href="/#nosotros">{t("nav.about")}</Link>
              </li>
              <li>
                <Link href="/carta">{t("nav.menu")}</Link>
              </li>
              <li>
                <Link href="/#eventos">{t("nav.events")}</Link>
              </li>
              <li>
                <Link href="/#ubicacion">{t("nav.location")}</Link>
              </li>
              <li>
                <Link href="/#reservas">{t("nav.reservations")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-cream mb-4 text-xs tracking-[0.1em] uppercase">
              {t("footer.contactTitle")}
            </h5>
            <p className="text-cream-muted mb-2">
              {t("location.addressValue")}
            </p>
            <p className="text-cream-muted mb-2">+57 300 000 0000</p>
            <p className="text-cream-muted mb-2">hola@ponlounge.co</p>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:border-brass hover:text-brass-light flex h-9 w-9 items-center justify-center rounded-full border border-white/15"
              >
                IG
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="hover:border-brass hover:text-brass-light flex h-9 w-9 items-center justify-center rounded-full border border-white/15"
              >
                WA
              </a>
            </div>
          </div>
        </div>
        <div className="text-cream-muted flex flex-wrap items-center justify-between gap-3 pt-6 text-xs">
          <span>
            © {new Date().getFullYear()} PON Lounge. {t("footer.rights")}
          </span>
          <span>{t("footer.credit")}</span>
        </div>
      </div>
    </footer>
  );
}
