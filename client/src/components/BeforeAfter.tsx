import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GripVertical, Sparkles } from "lucide-react";

export function BeforeAfter() {
   const containerRef = useRef<HTMLDivElement>(null);
   const [sliderPosition, setSliderPosition] = useState(50);
   const [isDrag, setIsDrag] = useState(false);

   const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
   };

   return (
      <section className="py-24 bg-[#050505] overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="text-center mb-20">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-gold mb-4"
               >
                  <Sparkles size={16} />
                  <span className="uppercase tracking-[0.5em] text-[10px] font-bold">Space Transformation</span>
               </motion.div>
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tight"
               >
                  The Art of Master <span className="text-gold italic">Polishing</span>
               </motion.h2>
               <p className="text-white/40 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                  Witness the evolution from raw earth to mirror-like perfection through our signature 15-step diamond-abrasive process.
               </p>
            </div>

            <div
               ref={containerRef}
               className="relative w-full aspect-[21/9] max-w-7xl mx-auto rounded-2xl overflow-hidden cursor-none select-none border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] group"
               onMouseMove={(e) => handleMove(e.clientX)}
               onTouchMove={(e) => handleMove(e.touches[0].clientX)}
               onMouseDown={() => setIsDrag(true)}
               onMouseUp={() => setIsDrag(false)}
            >
               {/* Legend */}
               <div className="absolute top-10 inset-x-10 z-30 flex justify-between pointer-events-none">
                  <div className="px-6 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                     <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">Raw Slabs</span>
                  </div>
                  <div className="px-6 py-2 bg-gold/90 backdrop-blur-xl border border-white/20 rounded-full">
                     <span className="text-black text-[10px] uppercase tracking-[0.3em] font-bold">Italian High Gloss</span>
                  </div>
               </div>

               {/* AFTER Image (Background) */}
               <div className="absolute inset-0">
                  <img
                     src="/assets/tile-b2.avif"
                     className="w-full h-full object-cover"
                     alt="Polished Finish"
                  />
                  <div className="absolute inset-0 bg-black/10" />
               </div>

               {/* BEFORE Image (Clipped) */}
               <div
                  className="absolute inset-0 z-10 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
               >
                  <img
                     src="/assets/tile-b1.avif"
                     className="w-full h-full object-cover filter contrast-75 brightness-75 grayscale"
                     alt="Unpolished Material"
                  />
                  <div className="absolute inset-0 bg-black/40" />
               </div>

               {/* Custom Cursor Handle */}
               <motion.div
                  className="absolute top-0 bottom-0 w-px bg-white/50 z-20"
                  style={{ left: `${sliderPosition}%` }}
               >
                  {/* Handle Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                     <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                        <div className="w-1 h-3 bg-gold rounded-full" />
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                     </div>
                  </div>

                  {/* Glow Line */}
                  <div className="absolute inset-y-0 -left-4 w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
               </motion.div>
            </div>

            <div className="mt-12 flex justify-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
               <p className="text-[10px] text-white uppercase tracking-[0.4em] font-light">
                  Slide handle to view the mirror transformation
               </p>
            </div>
         </div>
      </section>
   );
}
