import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import AuthorityVideo from "@/components/AuthorityVideo";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import BeforeAfter from "@/components/BeforeAfter";
import Podcast from "@/components/Podcast";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="font-['Montserrat',sans-serif] scroll-smooth">
      <WhatsAppButton />
      <Navigation />
      <Hero />
      <Benefits />
      <AuthorityVideo />
      <Testimonials />
      <Certifications />
      <BeforeAfter />
      <Podcast />
      <CallToAction />
      <Footer />
    </div>
  );
}
