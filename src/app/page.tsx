import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PreviewBanner from "@/components/PreviewBanner";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MenuTeaser from "@/components/sections/MenuTeaser";
import WhySection from "@/components/sections/WhySection";
import EventsSection from "@/components/sections/EventsSection";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Location from "@/components/sections/Location";
import ReservationWizard from "@/components/ReservationWizard";
import SkipLink from "@/components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <PreviewBanner />
      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <MenuTeaser />
        <WhySection />
        <EventsSection />
        <Testimonials />
        <Gallery />
        <Location />
        <ReservationWizard />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
