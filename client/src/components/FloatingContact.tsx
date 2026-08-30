import { Phone, MessageCircle } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3 sm:gap-4">
      <a
        href="https://wa.me/919772988333"
        target="_blank"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
      >
        <MessageCircle className="text-white" size={20} />
      </a>
      <a
        href="tel:+919772988333"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-gold rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Phone className="text-white" size={20} />
      </a>
    </div>
  );
}
