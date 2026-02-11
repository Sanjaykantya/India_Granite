import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const showcaseItems = [
  { id: 1, title: "Luxury Living Room", image: "/assets/interior-living.jpg" },
  { id: 2, title: "Designer Bathrooms", image: "/assets/imperial-gold.jpg" },
  { id: 3, title: "Commercial Spaces", image: "/assets/brown-granite.jpg" },
  { id: 4, title: "Premium Staircases", image: "/assets/monument.jpg" },
];

export function ApplicationShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);

  return (
    <section id="showcase" className="py-20 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Applications</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">Spaces Transformed</h2>
           </div>
           
           <div className="flex gap-4 mt-8 md:mt-0">
              <button onClick={prevSlide} className="p-4 border border-white/10 rounded-full text-white hover:bg-gold hover:text-black transition-all">
                 <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="p-4 border border-white/10 rounded-full text-white hover:bg-gold hover:text-black transition-all">
                 <ChevronRight size={24} />
              </button>
           </div>
        </div>

        <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
           <AnimatePresence mode="wait">
              <motion.div
                 key={currentIndex}
                 initial={{ opacity: 0, x: 100 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -100 }}
                 transition={{ duration: 0.7, ease: "easeInOut" }}
                 className="absolute inset-0"
              >
                 <img 
                    src={showcaseItems[currentIndex].image} 
                    className="w-full h-full object-cover" 
                    alt={showcaseItems[currentIndex].title}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                 
                 <div className="absolute bottom-0 left-0 p-12">
                    <h3 className="text-4xl md:text-6xl font-serif text-white mb-4">
                       {showcaseItems[currentIndex].title}
                    </h3>
                    <button className="text-gold uppercase tracking-widest text-sm hover:text-white transition-colors">
                       View Projects
                    </button>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
