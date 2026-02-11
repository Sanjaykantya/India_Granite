import { Instagram } from "lucide-react";

export function InstagramFeed() {
  // Using placeholders as we can't fetch real insta
  const posts = [1, 2, 3, 4, 5, 6];

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-12">
           <Instagram className="mx-auto text-gold w-8 h-8 mb-4" />
           <h2 className="text-3xl font-serif text-white">Follow Our Craftsmanship</h2>
           <a href="#" className="text-white/50 text-sm hover:text-gold transition-colors mt-2 block">@IndiaGranite</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
           {posts.map((post) => (
              <div key={post} className="aspect-square bg-white/5 relative group overflow-hidden cursor-pointer">
                 <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <Instagram className="text-white drop-shadow-lg" />
                 </div>
                 <img 
                    src={`/assets/${post % 2 === 0 ? 'interior-living.jpg' : 'imperial-gold.jpg'}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Instagram Post" 
                 />
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
