import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-black/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif text-foreground mb-6 uppercase tracking-widest">
              India <span className="text-gold">Granite</span>
            </h2>
            <p className="text-foreground/60 font-light leading-relaxed mb-6">
              Crafting legacy through stone. We bring the finest granite from the heart of India to the world's most luxurious spaces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-gold transition-colors cursor-pointer" title="Instagram (Coming Soon)"><Instagram size={20} /></a>
              <a href="tel:9772988333" className="text-foreground/60 hover:text-gold transition-colors cursor-pointer" title="Call Us"><Phone size={20} /></a>
              <a href="mailto:indiagranite@gmail.com" className="text-foreground/60 hover:text-gold transition-colors cursor-pointer" title="Email Us"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-serif uppercase tracking-widest mb-6 text-sm">Head Office</h3>
            <div className="text-foreground/60 font-light space-y-2">
              <p>India Granite</p>
              <p>Jaipur</p>
              <p>Rajasthan – 303702</p>
              <p>India</p>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-serif uppercase tracking-widest mb-6 text-sm">Sub Offices</h3>
            <ul className="text-foreground/60 font-light space-y-2">
              <li className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> Kishangarh</li>
              <li className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> Rajsamand</li>
              <li className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> Karimnagar</li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-serif uppercase tracking-widest mb-6 text-sm">Quick Links</h3>
            <ul className="text-foreground/60 font-light space-y-2">
              <li><a href="#collection" className="hover:text-gold transition-colors">Collection</a></li>
              <li><a href="#showcase" className="hover:text-gold transition-colors">Projects</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="/admin" className="hover:text-gold transition-colors">Admin Login</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-foreground/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} India Granite. All Rights Reserved.</p>
          <p>Designed for Ultra Luxury.</p>
        </div>
      </div>
    </footer>
  );
}
