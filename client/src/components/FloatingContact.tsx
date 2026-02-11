import { Phone, MessageCircle } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <a 
        href="https://wa.me/919772988333" 
        target="_blank" 
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
      >
        <MessageCircle className="text-white" size={24} />
      </a>
      <a 
        href="tel:+919772988333" 
        className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Phone className="text-black" size={24} />
      </a>
    </div>
  );
}
