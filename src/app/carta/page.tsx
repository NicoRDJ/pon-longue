import type { Metadata } from "next";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SkipLink from "@/components/SkipLink";
import PreviewBanner from "@/components/PreviewBanner";
import CartaHero from "@/components/sections/CartaHero";
import MenuAccordion from "@/components/MenuAccordion";
import CartaNote from "@/components/CartaNote";
import CartaFooter from "@/components/CartaFooter";
import { menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de PON Lounge: cócteles de autor, platos para compartir, fuertes, postres y vinos. Precios en pesos colombianos.",
  robots: { index: false, follow: false },
};

export default function CartaPage() {
  return (
    <>
      <SkipLink />
      <PreviewBanner textKey="preview.bannerCarta" />
      <Header cartaActive />

      <main id="main-content" className="flex-1">
        <CartaHero />

        <section className="bg-obsidian px-6 pb-24">
          <MenuAccordion categories={menu} />
          <p className="text-cream-muted mt-9 text-center text-sm">
            <CartaNote />
          </p>
        </section>
      </main>

      <CartaFooter />
      <WhatsAppFloat />
    </>
  );
}
