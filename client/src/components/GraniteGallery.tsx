import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";


const initialGranites = [
  { name: "Arctic White", category: "White", image: "/assets/granite-w1.jpeg" },
  { name: "Celestial White", category: "White", image: "/assets/granite-w2.jpeg" },
  { name: "Phantom Black", category: "Black", image: "/assets/granite-b2.png" },
  { name: "Golden Sahara", category: "Gold", image: "/assets/granite-g1.jpeg" },
  { name: "Midnight Galaxy", category: "Black", image: "/assets/granite-b4.jpg" },
  { name: "Emerald Forest", category: "Green", image: "/assets/granite-g2.jpeg" },
  { name: "Sapphire Night", category: "Blue", image: "/assets/granite-g3.jpeg" },
  { name: "Earth Espresso", category: "Brown", image: "/assets/granite-g4.jpeg" },
  { name: "Rose Aurora", category: "Red", image: "/assets/granite-g5.jpeg" },
];

const remainingGranites = [
  { name: "Titanium Grey", category: "Grey", image: "/assets/granite-g6.png" },
  { name: "Crystal Cream", category: "Gold", image: "/assets/granite-c2.jpeg" },
];

const categories = ["All", "Black", "Brown", "Red", "White", "Green", "Blue", "Gold", "Grey"];

export function GraniteGallery() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedGranite, setSelectedGranite] = useState<any>(null);

  const allGranites = [...initialGranites, ...remainingGranites];
  const displayedGranites = (showAll ? allGranites : initialGranites).filter(
    (g) => filter === "All" || g.category === filter
  );

  return (
    <section id="collection" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.4em] text-xs font-bold"
          >
            Stone Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-white mt-4"
          >
            Our Best Granite Selection
          </motion.h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-8 opacity-50" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest transition-all duration-500 border ${filter === cat
                ? "bg-gold text-black border-gold shadow-[0_5px_15px_rgba(212,175,55,0.3)]"
                : "bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {displayedGranites.map((granite, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={granite.name}
                className="group relative h-[500px] overflow-hidden rounded-lg cursor-pointer glass-card"
                onClick={() => setSelectedGranite(granite)}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700 z-10" />
                <img
                  src={granite.image}
                  alt={granite.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                  <div className="space-y-4">
                    <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {granite.category} Collection
                    </span>
                    <h3 className="text-3xl font-serif text-white translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      {granite.name}
                    </h3>
                    <div className="w-0 group-hover:w-full h-px bg-white/20 transition-all duration-700" />
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      <span className="text-white/60 text-[10px] uppercase tracking-[0.3em]">View Specifications</span>
                      <ArrowRight size={14} className="text-gold" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-6 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {!showAll && filter === "All" && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center gap-4 px-12 py-5 border border-white/10 text-white uppercase tracking-[0.3em] text-xs hover:border-gold transition-all duration-700"
            >
              <Plus size={16} className="text-gold group-hover:rotate-180 transition-transform duration-700" />
              <span>Explore More Granites</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </button>
          </div>
        )}

        {/* Modal */}
        <Dialog open={!!selectedGranite} onOpenChange={(open) => !open && setSelectedGranite(null)}>
          <DialogContent className="bg-[#0e0e0e] border-white/5 text-white max-w-5xl p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            {selectedGranite && (
              <div className="grid md:grid-cols-2 h-[90vh] md:h-[700px]">
                <div className="relative h-full overflow-hidden">
                  <img src={selectedGranite.image} className="w-full h-full object-cover" alt={selectedGranite.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-10">
                    <h2 className="text-5xl font-serif text-white">{selectedGranite.name}</h2>
                  </div>
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center bg-[#111]">
                  <span className="text-gold uppercase tracking-[0.4em] text-xs mb-4">{selectedGranite.category} Series</span>
                  <p className="text-white/60 font-light leading-relaxed mb-12 text-lg">
                    A testament to nature's artistry. Our {selectedGranite.name} granite offers unparalleled depth and durability.
                    Processed with state-of-the-art Italian technology to ensure a mirror-like finish that lasts a lifetime.
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-12 border-y border-white/5 py-8">
                    <div>
                      <span className="block text-white/30 text-[10px] uppercase tracking-widest mb-1">Origin</span>
                      <span className="text-white text-sm">Rajasthan, India</span>
                    </div>
                    <div>
                      <span className="block text-white/30 text-[10px] uppercase tracking-widest mb-1">Finish</span>
                      <span className="text-white text-sm">High Polish / Leather</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full py-5 bg-gold text-black uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 font-bold">
                      Request Quotation
                    </button>
                    <button className="w-full py-5 border border-white/10 text-white uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all duration-500">
                      Technical Data Sheet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
