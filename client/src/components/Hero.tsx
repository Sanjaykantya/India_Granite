import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const heroSlides = [
  "/assets/hero-f4p.png",
  "/assets/hero-f3p.webp",
  "/assets/hero-f2.jpeg",
  "/assets/hero-f1.jpeg",
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Slideshow - Smooth Right to Left */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={heroSlides[currentSlide]}
            alt="India Granite Premium Stone"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 80, scale: 1.05 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.98 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? "bg-gold w-12" : "bg-white/30 w-8"
              }`}
          />
        ))}
      </div>

      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold bg-white/5 py-2 px-6 rounded-full border border-white/10 backdrop-blur-sm">
            Est. 2010 • Excellence in Stone
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-tight selection:bg-gold/30"
        >
          Where Stone <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6E27A] to-[#D4AF37] filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Becomes Timeless Art
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/70 text-base md:text-xl uppercase tracking-[0.3em] mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Crafting the World's Most Exquisite Granite for Elite Architectural Masterpieces
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <a
            href="#collection"
            className="px-12 py-5 border border-white/10 glass-panel text-white uppercase tracking-[0.2em] text-xs hover:border-gold hover:text-gold transition-all duration-700 min-w-[220px]"
          >
            Our Best Selection
          </a>
          <button
            onClick={() => document.getElementById('contact-btn')?.click()}
            className="px-12 py-5 bg-gold text-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-700 min-w-[220px] font-bold shadow-[0_10px_40px_rgba(212,175,55,0.2)]"
          >
            Custom Special Request
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-white/30 uppercase tracking-[0.3em] text-[10px]">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ArrowDown className="text-gold w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
