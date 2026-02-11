import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GraniteGallery } from "@/components/GraniteGallery";
import { ApplicationShowcase } from "@/components/ApplicationShowcase";
import { BeforeAfter } from "@/components/BeforeAfter";
import { GlobalMap } from "@/components/GlobalMap";
import { About } from "@/components/About";
import { Leadership } from "@/components/Leadership";
import { ContactSection } from "@/components/Contact";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-gold selection:text-black">
      <Navbar />
      <Hero />
      <GraniteGallery />
      <ApplicationShowcase />
      <BeforeAfter />
      <GlobalMap />
      <About />
      <Leadership />
      <ContactSection />
      <InstagramFeed />
      <Footer />
      <FloatingContact />
    </div>
  );
}
