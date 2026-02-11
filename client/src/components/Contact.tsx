import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Upload } from "lucide-react";
import { useState } from "react";

export function ContactModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border border-gold/20 text-white max-w-3xl p-8 overflow-y-auto max-h-[90vh]">
        <button 
           onClick={() => onOpenChange(false)}
           className="absolute top-4 right-4 text-white/50 hover:text-gold transition-colors"
        >
           <X size={24} />
        </button>
        
        <div className="text-center mb-8">
           <h2 className="text-3xl font-serif text-white mb-2">Start Your Project</h2>
           <p className="text-white/50 text-sm uppercase tracking-widest">Connect with our luxury consultants</p>
        </div>

        <form className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold">Full Name</label>
                 <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold">Mobile Number</label>
                 <input type="tel" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="+91 98765 43210" />
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold">Email Address</label>
                 <input type="email" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold">Location</label>
                 <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="City, Country" />
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold">Project Type</label>
                 <select className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors appearance-none">
                    <option className="bg-black">Residential</option>
                    <option className="bg-black">Commercial</option>
                    <option className="bg-black">Hospitality</option>
                    <option className="bg-black">Architectural</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold">Granite Interest</label>
                 <select className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors appearance-none">
                    <option className="bg-black">Select Collection</option>
                    <option className="bg-black">Black Collection</option>
                    <option className="bg-black">Gold Collection</option>
                    <option className="bg-black">Exotic Collection</option>
                 </select>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold">Quantity Required (Sq. Ft.)</label>
              <input type="number" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="e.g. 5000" />
           </div>

           <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold">Reference Image (Optional)</label>
              <div className="w-full bg-white/5 border border-white/10 border-dashed p-8 text-center cursor-pointer hover:bg-white/10 transition-colors group">
                 <Upload className="mx-auto text-white/30 group-hover:text-gold mb-2" />
                 <span className="text-white/50 text-xs">Click to upload reference style</span>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold">Message</label>
              <textarea className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors h-32" placeholder="Tell us about your requirements..."></textarea>
           </div>

           <button className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
              Submit Enquiry
           </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ContactSection() {
   const [open, setOpen] = useState(false);

   return (
      <>
      <div className="py-20 bg-neutral-900 text-center">
         <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Ready to Transform Your Space?</h2>
         <button 
            id="contact-btn"
            onClick={() => setOpen(true)}
            className="px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
         >
            Get a Quote
         </button>
      </div>
      <ContactModal open={open} onOpenChange={setOpen} />
      </>
   );
}
