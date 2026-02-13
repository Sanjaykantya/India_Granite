import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";


const tiles = [
    { name: "Classic Beige", image: "/assets/tile-t2.webp" },
    { name: "Royal Pattern", image: "/assets/tile-t7.avif" },
    { name: "Midnight Black", image: "/assets/tile-b1.avif" },
    { name: "Onyx Shadow", image: "/assets/tile-b2.avif" },
    { name: "Desert Sand", image: "/assets/tile-t5.avif" },
    { name: "Ivory Elegance", image: "/assets/tile-t6.avif" },
];

export function TilesGallery() {
    return (
        <section id="tiles" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
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
                        className="text-4xl md:text-6xl font-serif text-white mt-4"
                    >
                        Premium Tiles Collection
                    </motion.h2>
                    <p className="text-white/40 mt-6 max-w-2xl mx-auto font-light tracking-widest text-sm uppercase">
                        Architectural elegance redefined through precision craftsmanship
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white/5 p-1 rounded-sm">
                    {tiles.map((tile, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={tile.name}
                            className="group relative h-[450px] overflow-hidden cursor-crosshair"
                        >
                            <img
                                src={tile.image}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt={tile.name}
                            />
                            {/* Luxury Frame */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700 z-30 pointer-events-none" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 z-10" />

                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                <h3 className="text-3xl font-serif text-white mb-6 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                                    {tile.name}
                                </h3>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black uppercase tracking-widest text-[10px] font-bold hover:bg-gold transition-colors duration-500">
                                        <Eye size={14} />
                                        Preview
                                    </button>
                                    <button className="p-3 border border-white/30 text-white hover:border-gold hover:text-gold transition-all duration-500">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Title peek on idle (mobile/desktop) */}
                            <div className="absolute bottom-8 left-8 z-20 group-hover:opacity-0 transition-opacity duration-500">
                                <h3 className="text-white text-lg font-serif tracking-wide">{tile.name}</h3>
                                <div className="w-8 h-0.5 bg-gold mt-2" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
