import type { Metadata } from "next";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SkipLink from "@/components/SkipLink";
import PreviewBanner from "@/components/PreviewBanner";
import CartaHero from "@/components/sections/CartaHero";
import MenuAccordion from "@/components/MenuAccordion";
import CartaNote from "@/components/CartaNote";
import CartaFooter from "@/components/CartaFooter";
import { cocktailMenu, menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de PON Lounge: cócteles de la casa, clásicos de autor, gin tonics, cítricos, mocktails y más. Precios en pesos colombianos.",
  robots: {
    index: process.env.NEXT_PUBLIC_ENV === "production",
    follow: process.env.NEXT_PUBLIC_ENV === "production",
  },
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
          <MenuAccordion categories={[...cocktailMenu, ...menu]} />
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
