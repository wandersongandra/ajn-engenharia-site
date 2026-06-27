import { FaWhatsapp } from 'react-icons/fa'
import { company } from '../../data/company'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:bg-[#1ebe5c] hover:scale-105 transition-all duration-200 group"
    >
      <FaWhatsapp size={24} />
      <span className="text-sm font-semibold hidden sm:inline">Fale Conosco</span>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
    </a>
  )
}
