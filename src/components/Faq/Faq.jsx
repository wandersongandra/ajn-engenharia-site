import { useState } from 'react'
import { FaChevronDown, FaWhatsapp } from 'react-icons/fa'
import { faq } from '../../data/faq'
import { company } from '../../data/company'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-20 lg:py-28 px-6 bg-[#f5f7fa]">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" /> Dúvidas frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4">Perguntas Frequentes</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full" />
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-green-50/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#1a2e0a] text-[15px] sm:text-base">{item.q}</span>
                  <FaChevronDown
                    size={15}
                    className={`text-[#4a9e10] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm mb-4">Não encontrou sua dúvida?</p>
          <a
            href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #6aa521 0%, #3a7d0a 100%)' }}
          >
            <FaWhatsapp size={18} /> Tirar dúvida pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
