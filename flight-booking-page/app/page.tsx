import { Header } from "@/components/header";
import { FlightSearch } from "@/components/flight-search";
import { BenefitsBar } from "@/components/benefits-bar";
import { Destinations } from "@/components/destinations";
import { Packages } from "@/components/packages";
import { SpecialOffers } from "@/components/special-offers";
import { Stats } from "@/components/stats";
import { TourOperators } from "@/components/tour-operators";
import { Testimonials } from "@/components/testimonials";
import { TrustSection } from "@/components/trust-section";
import { FAQ } from "@/components/faq";
import { ContactSection } from "@/components/contact-section";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <FlightSearch />
      <BenefitsBar />
      <Destinations />
      <Packages />
      <SpecialOffers />
      <Stats />
      <TourOperators />
      <Testimonials />
      <TrustSection />
      <FAQ />
      <ContactSection />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  );
}
