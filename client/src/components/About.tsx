import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Globe, Award, Briefcase } from "lucide-react";

function Counter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6 glass-card border border-white/5">
      <h3 className="text-4xl md:text-5xl font-serif text-gold mb-2">{value}</h3>
      <p className="text-white/60 uppercase tracking-widest text-xs">{label}</p>
    </div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black">
      {/* Decorative Gold Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight"
          >
            15+ Years of <span className="text-gold italic">Excellence</span> in Stone Craftsmanship
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-white/60 leading-relaxed font-light text-lg"
          >
            Rooted in the rich mineral landscapes of Rajasthan, India Granite has evolved into a global symbol of luxury. 
            We don't just supply stone; we curate the earth's finest art for the world's most prestigious spaces.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isInView && (
            <>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Counter value="15+" label="Years Experience" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Counter value="25+" label="Premium Collections" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Counter value="PAN" label="India Network" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Counter value="EXP" label="Global Reach" />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
