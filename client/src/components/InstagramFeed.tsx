import { Instagram } from "lucide-react";

const craftPhotos = [
   { src: "/assets/craft-ct3p.png", alt: "Granite Craftsmanship" },
   { src: "/assets/craft-ct1.png", alt: "Stone Cutting Process" },
   { src: "/assets/craft-ct4.webp", alt: "Precision Polishing" },
   { src: "/assets/craft-ct2.png", alt: "Quality Inspection" },
];

export function InstagramFeed() {
   return (
      <section className="py-20 bg-[#0A0A0A]">
         <div className="container mx-auto px-6 text-center">
            <div className="mb-12">
               <Instagram className="mx-auto text-gold w-8 h-8 mb-4" />
               <h2 className="text-3xl font-serif text-white">Follow Our Craftsmanship</h2>
               <a href="#" className="text-white/50 text-sm hover:text-gold transition-colors mt-2 block">@IndiaGranite</a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
               {craftPhotos.map((photo, idx) => (
                  <div key={idx} className="aspect-square bg-white/5 relative group overflow-hidden cursor-pointer rounded-lg">
                     <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <Instagram className="text-white drop-shadow-lg" />
                     </div>
                     <img
                        src={photo.src}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={photo.alt}
                     />
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
