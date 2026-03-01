import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";


const showcaseItems = [
   { id: 1, title: "Luxurious Living Spaces", image: "/assets/tile-w1.webp", desc: "Italian-engineered surfaces for the heart of the home." },
   { id: 2, title: "Grand Lobby Entrances", image: "/assets/tile-t8.avif", desc: "First impressions that resonate with architectural power." },
   { id: 3, title: "Spa & Sanctuary", image: "/assets/tile-t7.avif", desc: "Water-resistant luxury that brings nature's serenity indoors." },
   { id: 4, title: "Corporate Monuments", image: "/assets/tile-b1.avif", desc: "Timeless granite expressions for world-class establishments." },
];

export function ApplicationShowcase() {
   const [currentIndex, setCurrentIndex] = useState(0);

   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
   const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);

   return (
      <section id="showcase" className="py-24 bg-black overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
               <div className="max-w-2xl">
                  <motion.span
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     className="text-gold uppercase tracking-[0.4em] text-xs font-bold block mb-4"
                  >
                     Applications
                  </motion.span>
                  <motion.h2
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-tight"
                  >
                     Spaces <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white">Transformed</span>
                  </motion.h2>
               </div>

               <div className="flex gap-2 mt-8 md:mt-0">
                  <button
                     onClick={prevSlide}
                     className="w-16 h-16 rounded-full border border-white/10 text-white hover:border-gold hover:text-gold transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
                  >
                     <ChevronLeft size={24} />
                  </button>
                  <button
                     onClick={nextSlide}
                     className="w-16 h-16 rounded-full border border-white/10 text-white hover:border-gold hover:text-gold transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
                  >
                     <ChevronRight size={24} />
                  </button>
               </div>
            </div>

            <div className="relative h-[650px] w-full rounded-3xl overflow-hidden glass-panel">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={currentIndex}
                     initial={{ opacity: 0, scale: 1.1 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                     className="absolute inset-0"
                  >
                     <img
                        src={showcaseItems[currentIndex].image}
                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                        alt={showcaseItems[currentIndex].title}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

                     <div className="absolute bottom-0 left-0 p-12 md:p-20 max-w-2xl">
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.5 }}
                        >
                           <h3 className="text-5xl md:text-7xl font-serif text-white mb-6">
                              {showcaseItems[currentIndex].title}
                           </h3>
                           <p className="text-white/60 font-light text-lg mb-10 tracking-wide max-w-md">
                              {showcaseItems[currentIndex].desc}
                           </p>
                           <button className="flex items-center gap-4 group">
                              <span className="w-12 h-px bg-gold group-hover:w-24 transition-all duration-700" />
                              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold group-hover:text-white transition-colors">
                                 Explore Collection
                              </span>
                           </button>
                        </motion.div>
                     </div>

                     {/* Slide Indicator */}
                     <div className="absolute top-12 right-12 text-white/20 font-serif text-6xl">
                        0{currentIndex + 1}
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </section>
   );
}
