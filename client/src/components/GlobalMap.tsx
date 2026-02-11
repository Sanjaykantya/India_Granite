import { motion } from "framer-motion";

export function GlobalMap() {
  const locations = [
     { name: "Jaipur", x: 28, y: 45 },
     { name: "Bangalore", x: 32, y: 65 },
     { name: "Rajsamand", x: 26, y: 48 },
     { name: "Europe", x: 52, y: 30, inactive: true },
     { name: "China", x: 70, y: 40, inactive: true },
  ];

  return (
    <section id="global" className="py-20 bg-black relative overflow-hidden h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 opacity-30">
        <img src="/map-bg.png" className="w-full h-full object-cover" alt="World Map" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
         <div className="mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Global Presence</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">Supply Network</h2>
         </div>

         {/* Abstract Visualization */}
         <div className="relative w-full max-w-4xl mx-auto h-[300px] border border-white/10 rounded-lg glass-card flex items-center justify-center overflow-hidden group">
            <p className="text-white/30 uppercase tracking-[0.5em] text-sm group-hover:text-gold transition-colors duration-500">Interactive Map Visualization</p>
            
            {/* Animated Dots (Mockup positions not accurate to map, just visual flair) */}
            {locations.map((loc, i) => (
               <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
               >
                  <div className={`w-3 h-3 rounded-full ${loc.inactive ? 'bg-white/20' : 'bg-gold animate-ping'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${loc.inactive ? 'bg-white/20' : 'bg-gold'} absolute top-0 left-0`}></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-white uppercase tracking-wider whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                     {loc.name} {loc.inactive && "(Coming Soon)"}
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}
