import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ContactModal } from "@/components/Contact";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "#collection" },
    { name: "Showcase", href: "#showcase" },
    { name: "Global", href: "#global" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase cursor-pointer hover:text-gold transition-colors">
              India <span className="text-gold">Granite</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest text-white/80 hover:text-gold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => setContactOpen(true)}
              className="px-6 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase text-xs tracking-widest"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-b border-white/10"
            >
              <div className="flex flex-col items-center py-8 space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg uppercase tracking-widest text-white hover:text-gold"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setContactOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black uppercase text-sm tracking-widest"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
