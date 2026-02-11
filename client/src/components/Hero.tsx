import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
        <img
          src="/hero-bg.png"
          alt="Luxury Granite Texture"
          className="w-full h-full object-cover scale-110 animate-slow-zoom" // custom animate-slow-zoom needed in css or motion
        />
        {/* Animated grain/noise could go here */}
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-tight"
        >
          Where Stone <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6E27A] to-[#D4AF37]">
            Becomes Art
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/80 text-sm md:text-lg uppercase tracking-[0.2em] mb-12 max-w-2xl mx-auto font-light"
        >
          15+ Years Crafting Timeless Granite Excellence Across India & Worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a
            href="#collection"
            className="px-10 py-4 border border-white/20 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500 min-w-[200px]"
          >
            Explore Collection
          </a>
          <button
            onClick={() => document.getElementById('contact-btn')?.click()} // Hacky hook but works for layout
            className="px-10 py-4 bg-gold text-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-500 min-w-[200px] relative overflow-hidden group"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-0" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="text-white/50 w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
