import { motion } from "framer-motion";
import { User, Linkedin, Mail } from "lucide-react";

const leaders = [
  {
    role: "Founder",
    name: "Sumant Kantya",
    title: "Visionary Leader",
  },
  {
    role: "Co-Founder",
    name: "Ram Lal Kantya",
    title: "Master Craftsman",
  },
  {
    role: "Owner",
    name: "Shivam Kumawat",
    title: "Global Strategist",
  },
];

export function Leadership() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#050505]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Leadership</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">The Minds Behind the Legacy</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative"
            >
              <div className="glass-panel p-8 text-center h-full border border-white/5 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                {/* Image Placeholder Frame */}
                <div className="w-32 h-32 mx-auto rounded-full border border-white/10 p-2 mb-6 group-hover:scale-105 transition-transform duration-500 bg-black">
                   <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                      <User className="text-white/20 w-12 h-12" />
                   </div>
                </div>

                <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-gold transition-colors">{leader.name}</h3>
                <p className="text-gold/80 uppercase text-xs tracking-widest mb-6">{leader.role}</p>
                <p className="text-white/40 font-light text-sm italic">"{leader.title}"</p>

                <div className="flex justify-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="p-2 border border-white/10 rounded-full hover:bg-gold hover:text-black cursor-pointer transition-colors text-white/50">
                     <Linkedin size={16} />
                   </div>
                   <div className="p-2 border border-white/10 rounded-full hover:bg-gold hover:text-black cursor-pointer transition-colors text-white/50">
                     <Mail size={16} />
                   </div>
                </div>
                
                {/* Floating Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
