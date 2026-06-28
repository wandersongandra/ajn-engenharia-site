import { useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { company } from '../../data/company'

export default function WhatsAppButton() {
  // Sanitiza dados e prepara a URL (evita links quebrados e bugs de encoding)
  const whatsappData = useMemo(() => {
    const rawNumber = company?.whatsapp
    if (!rawNumber) return null

    const cleanNumber = String(rawNumber).replace(/\D/g, '')
    const cleanMessage = company?.whatsappMessage
      ? String(company.whatsappMessage).trim()
      : ''

    // Monta a URL garantindo que a mensagem só seja adicionada se existir
    const url = cleanMessage
      ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(cleanMessage)}`
      : `https://wa.me/${cleanNumber}`

    return {
      url,
      // Formata o número para exibição acessível (ex: +55 11 99999-9999)
      formattedNumber: `+${cleanNumber}`,
    }
  }, [])

  // Não renderiza nada se não houver número configurado (evita links quebrados)
  if (!whatsappData) return null

  return (
    <a
      href={whatsappData.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${company?.name || 'empresa'} pelo WhatsApp: ${whatsappData.formattedNumber}`}
      className="group fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 
                 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full 
                 shadow-[0_8px_24px_rgba(37,211,102,0.4)] 
                 hover:bg-[#20bd5a] hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] 
                 hover:scale-105 active:scale-100
                 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                 transition-all duration-300 ease-out"
    >
      <FaWhatsapp size={26} className="flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
      <span className="text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap hidden sm:inline">
        Fale Conosco
      </span>

      {/* Pulse ring - Mais sutil e menos agressivo que o animate-ping padrão */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 pointer-events-none"
      />

      {/* Tooltip acessível para desktop (mostra o número ao passar o mouse) */}
      <span
        role="tooltip"
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 
                   bg-gray-900 text-white text-xs font-medium 
                   px-3 py-1.5 rounded-lg shadow-lg 
                   opacity-0 group-hover:opacity-100 pointer-events-none
                   transition-opacity duration-300 whitespace-nowrap
                   hidden md:block"
      >
        {whatsappData.formattedNumber}
        {/* Seta do tooltip */}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
      </span>
    </a>
  )
}