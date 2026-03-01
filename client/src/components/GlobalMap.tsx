import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function GlobalMap() {
   const locations = [
      // India Region (Spread out to avoid overlap)
      { name: "Rajasthan", x: "48%", y: "52%", type: "Domestic (HQ)", labelPos: "bottom" },
      { name: "New Delhi", x: "48%", y: "42%", type: "Domestic", labelPos: "top" },
      { name: "West Bengal", x: "58%", y: "55%", type: "Domestic", labelPos: "right" },
      { name: "Karnataka", x: "44%", y: "68%", type: "Domestic", labelPos: "left" },
      { name: "Gujarat", x: "40%", y: "50%", type: "Domestic", labelPos: "left" },
      { name: "Maharashtra", x: "42%", y: "58%", type: "Domestic", labelPos: "left" },
      { name: "Chennai", x: "50%", y: "72%", type: "Domestic", labelPos: "right" },

      // International
      { name: "Nepal", x: "56%", y: "45%", type: "International", labelPos: "right" },
      { name: "China", x: "70%", y: "35%", type: "International", labelPos: "right" },
      { name: "Russia", x: "62%", y: "15%", type: "International", labelPos: "top" },
      { name: "Europe", x: "25%", y: "25%", type: "International", labelPos: "left" },
   ];

   return (
      <section id="global" className="py-24 bg-[#050505] relative overflow-hidden">
         {/* Background Decorative Elements */}
         <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-gold mb-4"
               >
                  <Globe size={18} />
                  <span className="uppercase tracking-[0.5em] text-[10px] font-bold">World Presence</span>
               </motion.div>
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-serif text-white uppercase tracking-tight"
               >
                  Our Presence <span className="text-gold italic">Across the World</span>
               </motion.h2>
            </div>

            <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] bg-[#0a0a0a]/50 rounded-3xl border border-white/5 overflow-hidden shadow-2xl group transition-all duration-700 hover:border-white/10">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111,transparent)]" />

               {/* India "Small Circle" Visual Grouping */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-gold/10 bg-gold/[0.02] pointer-events-none"
               />

               <TooltipProvider>
                  {locations.map((loc, i) => (
                     <div key={i} className="absolute z-20" style={{ left: loc.x, top: loc.y }}>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <motion.div
                                 initial={{ scale: 0, opacity: 0 }}
                                 whileInView={{ scale: 1, opacity: 1 }}
                                 transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                                 className="relative cursor-pointer group/dot"
                              >
                                 <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] group-hover/dot:scale-150 transition-transform duration-300" />
                                 <div className="absolute inset-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-30" />

                                 {/* Dynamic Label Placement to avoid overlap */}
                                 <div className={`absolute pointer-events-none opacity-80 group-hover/dot:opacity-100 transition-opacity whitespace-nowrap
                                    ${loc.labelPos === 'right' ? 'left-6 top-1/2 -translate-y-1/2' : ''}
                                    ${loc.labelPos === 'left' ? 'right-6 top-1/2 -translate-y-1/2' : ''}
                                    ${loc.labelPos === 'top' ? 'left-1/2 -translate-x-1/2 bottom-6' : ''}
                                    ${loc.labelPos === 'bottom' ? 'left-1/2 -translate-x-1/2 top-6' : ''}
                                 `}>
                                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.2em] bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                                       {loc.name}
                                    </span>
                                 </div>
                              </motion.div>
                           </TooltipTrigger>
                           <TooltipContent className="bg-black/95 border border-gold/20 text-white p-3 shadow-2xl">
                              <div className="flex flex-col gap-1">
                                 <span className="text-xs font-bold uppercase tracking-widest text-gold">{loc.name}</span>
                                 <span className="text-[10px] text-white/50 uppercase tracking-widest">{loc.type} Hub</span>
                              </div>
                           </TooltipContent>
                        </Tooltip>
                     </div>
                  ))}
               </TooltipProvider>

               {/* Decorative Grid Lines */}
               <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
                  <div className="w-full h-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
               </div>
            </div>

            <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
               {[
                  { label: "Global Presence", value: "28+ Countries" },
                  { label: "Export Hubs", value: "12 Offices" },
                  { label: "Warehouse Area", value: "2M+ Sq.Ft" },
                  { label: "Elite Projects", value: "500+" }
               ].map((stat, i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl"
                  >
                     <div className="text-4xl font-serif text-gold mb-3">{stat.value}</div>
                     <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">{stat.label}</div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
}
