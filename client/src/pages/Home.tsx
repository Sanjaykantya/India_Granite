import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GraniteGallery } from "@/components/GraniteGallery";
import { TilesGallery } from "@/components/TilesGallery";
import { ApplicationShowcase } from "@/components/ApplicationShowcase";
import { BeforeAfter } from "@/components/BeforeAfter";
import { About } from "@/components/About";
import { GlobalMap } from "@/components/GlobalMap";
import { Leadership } from "@/components/Leadership";
import { ContactSection as Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { InstagramFeed } from "@/components/InstagramFeed";
import { FloatingContact } from "@/components/FloatingContact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <GraniteGallery />
      <TilesGallery />
      <ApplicationShowcase />
      <BeforeAfter />
      <GlobalMap />
      <Leadership />
      <InstagramFeed />
      <Contact />
      <Footer />
      <FloatingContact />
    </main>
  );
}
