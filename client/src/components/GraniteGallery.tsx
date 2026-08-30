import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ── NEW photos from 29th_May_Enhance_photo — displayed FIRST (top of grid) ──
const newTopGranites = [
  { name: "Brown Black 2", category: "Brown", image: "/assets/29th_May_Enhance_photo/Brownblack2.png" },
  { name: "Black White Dot", category: "Black", image: "/assets/29th_May_Enhance_photo/blacky_whitedot.png" },
  { name: "Brown Black", category: "Brown", image: "/assets/29th_May_Enhance_photo/brownblack.png" },
  { name: "Granite P1", category: "Grey", image: "/assets/29th_May_Enhance_photo/p1.png" },
  { name: "Granite P2", category: "Grey", image: "/assets/29th_May_Enhance_photo/p2.png" },
  { name: "Granite P3", category: "Grey", image: "/assets/29th_May_Enhance_photo/p3.png" },
  { name: "Photo 2", category: "White", image: "/assets/29th_May_Enhance_photo/photo2.png" },
  { name: "White Black", category: "White", image: "/assets/29th_May_Enhance_photo/whiteblack1.png" },
];

// All granites with proper color categories
const initialGranites = [
  // New granite photos (categorized by visual color from the actual images)
  { name: "Silver Pearl", category: "Grey", image: "/assets/new-granite-1.jpeg" },
  { name: "Golden Autumn", category: "Gold", image: "/assets/new-granite-2.jpeg" },
  { name: "Tiger Red", category: "Red", image: "/assets/new-granite-3.jpeg" },
  { name: "P White", category: "White", image: "/assets/new-granite-4.jpeg" },
  { name: "Jhansi Red", category: "Red", image: "/assets/new-granite-5.jpeg" },
  { name: "Chima Pink", category: "Brown", image: "/assets/new-granite-6.jpeg" },
  { name: "Alaska White", category: "White", image: "/assets/new-granite-7.jpeg" },
  { name: "Steel Grey", category: "Grey", image: "/assets/new-granite-8.jpeg" },
  { name: "S White", category: "White", image: "/assets/new-granite-9.jpeg" },
  { name: "Absolute Black", category: "Black", image: "/assets/new-granite-10.jpeg" },
  { name: "Rajasthan Black", category: "Black", image: "/assets/new-granite-14.jpeg" },
  // Original granites
  { name: "Phantom Black", category: "Black", image: "/assets/granite-b2.png" },
  { name: "Golden Sahara", category: "Gold", image: "/assets/granite-g1.jpeg" },
  { name: "Midnight Galaxy", category: "Black", image: "/assets/granite-b4.jpg" },
  { name: "Emerald Forest", category: "Green", image: "/assets/granite-g2.jpeg" },
  { name: "Sapphire Night", category: "Blue", image: "/assets/granite-g3.jpeg" },
  { name: "Earth Espresso", category: "Brown", image: "/assets/granite-g4.jpeg" },
  { name: "Rose Aurora", category: "Red", image: "/assets/granite-g5.jpeg" },
];

const remainingGranites = [
  { name: "Verde Guatemala", category: "Green", image: "/assets/new-granite-11.jpeg" },
  { name: "Thunder White", category: "White", image: "/assets/new-granite-12.jpeg" },
  { name: "Lavender Blue", category: "Blue", image: "/assets/new-granite-13.jpeg" },
  { name: "Arctic White", category: "White", image: "/assets/granite-w1.jpeg" },
  { name: "Celestial White", category: "White", image: "/assets/granite-w2.jpeg" },
  { name: "Titanium Grey", category: "Grey", image: "/assets/granite-g6.png" },
  { name: "Crystal Cream", category: "Gold", image: "/assets/granite-c2.jpeg" },
];

const categories = ["All", "Black", "Brown", "Red", "White", "Green", "Blue", "Gold", "Grey"];

export function GraniteGallery() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedGranite, setSelectedGranite] = useState<any>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // New top photos + existing photos combined (new ones first)
  const allTopGranites = [...newTopGranites, ...initialGranites];
  const allGranites = [...allTopGranites, ...remainingGranites];

  const displayedGranites = (showAll ? allGranites : allTopGranites).filter(
    (g) => filter === "All" || g.category === filter
  );

  // Auto-slideshow for the first card position - cycles through images every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % allGranites.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="collection" className="py-24 bg-secondary">
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
            className="text-4xl md:text-6xl font-serif text-foreground mt-4"
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
                ? "bg-gold text-white border-gold shadow-[0_5px_15px_rgba(184,143,58,0.3)]"
                : "bg-transparent text-foreground/40 border-black/10 hover:border-black/25 hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {displayedGranites.map((granite, index) => {
              // First card gets the auto-slideshow feature, but ONLY showing remaining granites to prevent duplicates
              const isFirstCard = index === 0 && filter === "All" && !showAll;
              const currentGranite = isFirstCard ? remainingGranites[heroSlideIndex % remainingGranites.length] : granite;
              const displayImage = currentGranite.image;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={granite.name + (isFirstCard ? "hero" : "")}
                  className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-lg cursor-pointer glass-card"
                  onClick={() => setSelectedGranite(currentGranite)}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700 z-10" />

                  {isFirstCard ? (
                    // Auto-slideshow on first card
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={heroSlideIndex % remainingGranites.length}
                        src={displayImage}
                        alt={currentGranite.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </AnimatePresence>
                  ) : (
                    <img
                      src={displayImage}
                      alt={currentGranite.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}

                  {/* Name overlay for slideshow card */}
                  {isFirstCard && (
                     <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        <span className="text-white text-[10px] tracking-widest uppercase">{currentGranite.name}</span>
                     </div>
                  )}

                  {/* Decorative Elements */}
                  <div className="absolute inset-6 border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none" />

                  {/* Slideshow indicator on first card */}
                  {isFirstCard && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                      {remainingGranites.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-0.5 rounded-full transition-all duration-500 ${idx === heroSlideIndex % remainingGranites.length ? "bg-gold w-4" : "bg-white/40 w-2"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {!showAll && filter === "All" && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center gap-4 px-12 py-5 border border-black/10 text-foreground uppercase tracking-[0.3em] text-xs hover:border-gold transition-all duration-700"
            >
              <Plus size={16} className="text-gold group-hover:rotate-180 transition-transform duration-700" />
              <span>Explore More Granites</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </button>
          </div>
        )}

        {/* Modal — shows only the zoomed image + Contact Us button */}
        <Dialog open={!!selectedGranite} onOpenChange={(open) => !open && setSelectedGranite(null)}>
          <DialogContent className="bg-white border-black/10 text-foreground max-w-4xl p-0 overflow-hidden shadow-2xl">
            {selectedGranite && (
              <div className="relative flex flex-col items-center">
                {/* Full zoomed image */}
                <div className="relative w-full">
                  <img
                    src={selectedGranite.image}
                    className="w-full object-contain"
                    style={{ maxHeight: "75vh" }}
                    alt={selectedGranite.name}
                  />
                </div>

                {/* Contact Us button */}
                <div className="w-full px-8 py-6 bg-secondary flex justify-center">
                  <a
                    href="#contact"
                    onClick={() => setSelectedGranite(null)}
                    className="inline-block px-16 py-4 bg-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-gold-dark transition-all duration-500"
                  >
                    Contact Us for This Material
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
