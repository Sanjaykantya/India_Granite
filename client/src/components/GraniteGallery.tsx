import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const granites = [
  { name: "Ten Brown", category: "Brown", image: "/assets/brown-granite.jpg" },
  { name: "Ten Red", category: "Red", image: "/assets/monument.jpg" }, // varied
  { name: "Absolute Black", category: "Black", image: "/hero-bg.png" }, // texture
  { name: "Galaxy Black", category: "Black", image: "/hero-bg.png" },
  { name: "Sapphire Blue", category: "Blue", image: "/assets/brown-granite.jpg" }, // placeholder
  { name: "Coffee Brown", category: "Brown", image: "/assets/brown-granite.jpg" },
  { name: "Vizag Blue", category: "Blue", image: "/assets/brown-granite.jpg" }, // placeholder
  { name: "Jet Black", category: "Black", image: "/hero-bg.png" },
  { name: "Black Aurora", category: "Black", image: "/hero-bg.png" },
  { name: "Lakha Red", category: "Red", image: "/assets/monument.jpg" },
  { name: "Jira Wal", category: "White", image: "/assets/factory-slab.jpg" },
  { name: "Tiger Skin", category: "Yellow", image: "/assets/gold-granite.jpg" },
  { name: "S White", category: "White", image: "/assets/factory-slab.jpg" },
  { name: "Forest Green", category: "Green", image: "/assets/green-granite.jpg" },
  { name: "Green Marble", category: "Green", image: "/assets/green-granite.jpg" },
  { name: "Z Brown", category: "Brown", image: "/assets/brown-granite.jpg" },
  { name: "Peradiso", category: "Grey", image: "/assets/factory-slab.jpg" }, // placeholder
  { name: "Kotkasta", category: "Grey", image: "/assets/factory-slab.jpg" },
  { name: "Narlai White", category: "White", image: "/assets/factory-slab.jpg" },
  { name: "Sira Grey", category: "Grey", image: "/assets/factory-slab.jpg" },
  { name: "Classic Red", category: "Red", image: "/assets/monument.jpg" },
  { name: "Green", category: "Green", image: "/assets/green-granite.jpg" },
  { name: "Spider Green", category: "Green", image: "/assets/green-granite.jpg" },
  { name: "Pali Red", category: "Red", image: "/assets/monument.jpg" },
  { name: "Viscon White", category: "White", image: "/assets/factory-slab.jpg" },
  { name: "Imperial Gold", category: "Gold", image: "/assets/imperial-gold.jpg" },
];

const categories = ["All", "Black", "Brown", "Red", "White", "Green", "Blue", "Gold", "Grey"];

export function GraniteGallery() {
  const [filter, setFilter] = useState("All");
  const [selectedGranite, setSelectedGranite] = useState<typeof granites[0] | null>(null);

  const filteredGranites = filter === "All" 
    ? granites 
    : granites.filter(g => g.category === filter);

  return (
    <section id="collection" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Our Collection</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">Curated Excellence</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                filter === cat 
                  ? "bg-gold text-black border-gold" 
                  : "bg-transparent text-white/50 border-white/10 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredGranites.map((granite) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={granite.name}
                className="group relative h-[400px] overflow-hidden rounded-sm cursor-pointer"
                onClick={() => setSelectedGranite(granite)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                <img 
                  src={granite.image} 
                  alt={granite.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {granite.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-gold my-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-white/80 text-xs uppercase tracking-widest">View Details</span>
                    <ArrowRight size={14} className="text-gold" />
                  </div>
                </div>

                {/* Glass Hover Border */}
                <div className="absolute inset-4 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <Dialog open={!!selectedGranite} onOpenChange={(open) => !open && setSelectedGranite(null)}>
           <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-4xl p-0 overflow-hidden">
              {selectedGranite && (
                 <div className="grid md:grid-cols-2 h-[80vh] md:h-[600px]">
                    <div className="relative h-full">
                       <img src={selectedGranite.image} className="w-full h-full object-cover" alt={selectedGranite.name} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                          <h2 className="text-4xl font-serif text-white">{selectedGranite.name}</h2>
                       </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-neutral-900">
                       <h3 className="text-gold uppercase tracking-widest text-sm mb-2">{selectedGranite.category} Granite</h3>
                       <p className="text-white/60 font-light leading-relaxed mb-8">
                         A premium selection from our {selectedGranite.category} collection. 
                         Perfect for luxury interiors, countertops, and architectural statements. 
                         Ethically sourced and processed with Italian machinery for a glass-like finish.
                       </p>
                       
                       <div className="space-y-4">
                          <button className="w-full py-4 bg-gold text-black uppercase tracking-widest text-sm hover:bg-white transition-colors font-medium">
                            Request Sample
                          </button>
                          <button className="w-full py-4 border border-white/20 text-white uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-colors">
                            Download Spec Sheet
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
