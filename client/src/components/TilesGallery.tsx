import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const marblePhotos = [
    { name: "Premium Marble 1", image: "/assets/marble-1.jpeg" },
    { name: "Premium Marble 2", image: "/assets/marble-2.jpeg" },
    { name: "Premium Marble 3", image: "/assets/marble-3.jpeg" },
    { name: "Premium Marble 4", image: "/assets/marble-4.jpeg" },
    { name: "Premium Marble 5", image: "/assets/marble-5.jpeg" },
    { name: "Premium Marble 6", image: "/assets/marble-6.jpeg" },
    { name: "Premium Marble 7", image: "/assets/marble-7.jpeg" },
    { name: "Premium Marble 8", image: "/assets/marble-8.jpeg" },
    { name: "Premium Marble 9", image: "/assets/marble-9.jpeg" },
    { name: "Premium Marble 10", image: "/assets/marble-10.jpeg" },
    { name: "Premium Marble 11", image: "/assets/marble-11.jpeg" },
    { name: "Premium Marble 12", image: "/assets/marble-12.jpeg" },
    { name: "Premium Marble 13", image: "/assets/marble-13.jpeg" },
    { name: "Premium Marble 14", image: "/assets/marble-14.jpeg" },
    { name: "Premium Marble 15", image: "/assets/marble-15.jpeg" },
    { name: "Premium Marble 16", image: "/assets/marble-16.jpeg" },
    { name: "Premium Marble 17", image: "/assets/marble-17.jpeg" },
    { name: "Premium Marble 18", image: "/assets/marble-18.jpeg" },
    { name: "Premium Marble 19", image: "/assets/marble-19.jpeg" },
    { name: "Premium Marble 20", image: "/assets/marble-20.jpeg" },
    { name: "Premium Marble 21", image: "/assets/marble-21.jpeg" },
    { name: "Premium Marble 22", image: "/assets/marble-22.jpeg" },
    { name: "Premium Marble 23", image: "/assets/marble-23.jpeg" },
    { name: "Premium Marble 24", image: "/assets/marble-24.jpeg" },
    { name: "Premium Marble 25", image: "/assets/marble-25.jpeg" },
    { name: "Premium Marble 26", image: "/assets/marble-26.jpeg" },
    { name: "Premium Marble 27", image: "/assets/marble-27.jpeg" },
    { name: "Premium Marble 28", image: "/assets/marble-28.jpeg" },
    { name: "Premium Marble 29", image: "/assets/marble-29.jpeg" },
    { name: "Premium Marble 30", image: "/assets/marble-30.jpeg" },
    { name: "Premium Marble 31", image: "/assets/marble-31.jpeg" },
    { name: "Premium Marble 32", image: "/assets/marble-32.jpeg" },
    { name: "Premium Marble 33", image: "/assets/marble-33.jpeg" },
    { name: "Premium Marble 34", image: "/assets/marble-34.jpeg" },
];

// Original tile photos kept as part of the collection
const originalTiles = [
    { name: "Classic Beige", image: "/assets/tile-t2.webp" },
    { name: "Royal Pattern", image: "/assets/tile-t7.avif" },
    { name: "Midnight Black", image: "/assets/tile-b1.avif" },
    { name: "Onyx Shadow", image: "/assets/tile-b2.avif" },
    { name: "Desert Sand", image: "/assets/tile-t5.avif" },
    { name: "Ivory Elegance", image: "/assets/tile-t6.avif" },
];

const allMarbles = [...originalTiles, ...marblePhotos];

// How many to show initially in grid
const INITIAL_SHOW = 6;

export function TilesGallery() {
    const [showAll, setShowAll] = useState(false);
    const [selectedMarble, setSelectedMarble] = useState<any>(null);

    // Slideshow state for the featured section
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance the featured slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % allMarbles.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % allMarbles.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + allMarbles.length) % allMarbles.length);

    const displayedMarbles = showAll ? allMarbles : allMarbles.slice(0, INITIAL_SHOW);

    return (
        <section id="tiles" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        className="text-gold uppercase text-xs font-bold transition-all duration-1000"
                    >
                        New Arrival
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-serif text-foreground mt-4"
                    >
                        Premium Marble Collection
                    </motion.h2>
                    <p className="text-foreground/50 mt-6 max-w-2xl mx-auto font-light tracking-widest text-sm uppercase">
                        Architectural elegance redefined through precision craftsmanship
                    </p>
                </div>

                {/* Featured Slideshow - Large hero image with auto-rotate */}
                <div className="relative mb-16 rounded-lg overflow-hidden group bg-secondary shadow-lg" style={{ height: "550px" }}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentSlide}
                            src={allMarbles[currentSlide].image}
                            alt={allMarbles[currentSlide].name}
                            className="absolute inset-0 w-full h-full object-contain p-4 md:p-12"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10 pointer-events-none" />

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-gold/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-gold/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Info overlay */}
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">
                            {currentSlide + 1} / {allMarbles.length}
                        </span>
                        <h3 className="text-white text-2xl font-serif mt-1">{allMarbles[currentSlide].name}</h3>
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-6 right-6 z-20 flex gap-1.5">
                        {allMarbles.slice(0, Math.min(allMarbles.length, 20)).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? "bg-gold w-6" : "bg-white/40 w-3"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Grid of marble photos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedMarbles.map((marble, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            key={marble.name + index}
                            className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-crosshair bg-secondary shadow-sm"
                            onClick={() => setSelectedMarble(marble)}
                        >
                            <img
                                src={marble.image}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt={marble.name}
                            />
                            {/* Luxury Frame */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-700 z-30 pointer-events-none" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/55 transition-colors duration-500 z-10" />

                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-foreground uppercase tracking-widest text-[10px] font-bold hover:bg-gold hover:text-white transition-colors duration-500">
                                        <Eye size={14} />
                                        Preview
                                    </button>
                                    <button className="p-3 border border-white/40 text-white hover:border-gold hover:text-gold transition-all duration-500">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                {!showAll && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="group relative inline-flex items-center gap-4 px-12 py-5 border border-black/10 text-foreground uppercase tracking-[0.3em] text-xs hover:border-gold transition-all duration-700"
                        >
                            <Plus size={16} className="text-gold group-hover:rotate-180 transition-transform duration-700" />
                            <span>View All Marbles ({allMarbles.length})</span>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        </button>
                    </div>
                )}
            </div>

            {/* Marble Preview Modal */}
            <Dialog open={!!selectedMarble} onOpenChange={(open) => !open && setSelectedMarble(null)}>
                <DialogContent className="bg-white border-black/10 text-foreground max-w-5xl p-0 overflow-hidden shadow-2xl">
                    {selectedMarble && (
                        <div className="relative h-[85vh] flex items-center justify-center p-8 bg-secondary">
                            <img
                                src={selectedMarble.image}
                                className="w-full h-full object-contain"
                                alt={selectedMarble.name}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                <h3 className="text-3xl font-serif text-white">{selectedMarble.name}</h3>
                                <p className="text-white/70 mt-2 font-light">Premium Marble Collection</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
