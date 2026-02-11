import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { GripVertical } from "lucide-react";

export function BeforeAfter() {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); // This will need to be driven by interaction

  // Simplified custom drag implementation
  const [sliderPosition, setSliderPosition] = useState(50); // percentage

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Transformation</span>
           <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">The Art of Polishing</h2>
        </div>

        <div 
           ref={containerRef}
           className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-lg overflow-hidden cursor-ew-resize select-none border border-white/10"
           onMouseMove={handleMouseMove}
           onTouchMove={handleTouchMove}
        >
           {/* BEFORE Image (Background) */}
           <div className="absolute inset-0">
              <img 
                 src="/assets/factory-slab.jpg" 
                 className="w-full h-full object-cover grayscale brightness-75" 
                 alt="Raw Granite" 
              />
              <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded text-white text-xs uppercase tracking-widest border border-white/10">
                 Before (Raw Block)
              </div>
           </div>

           {/* AFTER Image (Clipped) */}
           <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
           >
              <img 
                 src="/assets/interior-living.jpg" 
                 className="w-full h-full object-cover" 
                 style={{ width: '100vw', maxWidth: '64rem' }} // Hack to keep image static while container clips
                 alt="Polished Interior" 
              />
              <div className="absolute top-8 right-8 bg-gold/80 backdrop-blur-md px-4 py-2 rounded text-black text-xs uppercase tracking-widest font-bold">
                 After (Luxury Finish)
              </div>
           </div>

           {/* Slider Handle */}
           <div 
              className="absolute top-0 bottom-0 w-1 bg-gold cursor-ew-resize z-20 shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              style={{ left: `${sliderPosition}%` }}
           >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                 <GripVertical size={20} className="text-black" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
