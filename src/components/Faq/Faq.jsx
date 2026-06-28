import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { FaChevronDown, FaWhatsapp } from 'react-icons/fa'
import { faq } from '../../data/faq'
import { company } from '../../data/company'

// Sanitiza telefone para URLs
const sanitizePhone = (phone) => String(phone || '').replace(/\D/g, '')

export default function Faq() {
  // Permite múltiplos itens abertos simultaneamente (melhor UX)
  const [openItems, setOpenItems] = useState(new Set([0]))
  const itemRefs = useRef([])

  // Sanitiza dados do WhatsApp
  const whatsappData = useMemo(() => {
    const cleanNumber = sanitizePhone(company?.whatsapp)
    const message = company?.whatsappMessage || 'Olá! Vim pelo site e gostaria de tirar uma dúvida.'

    return {
      url: cleanNumber
        ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
        : '#',
      displayNumber: company?.whatsapp || 'WhatsApp não disponível',
    }
  }, [])

  // Schema.org FAQPage - CRÍTICO para SEO (Rich Snippets no Google)
  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }), [])

  // Alterna um item específico
  const toggleItem = useCallback((index) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  // Scroll suave para o item quando aberto (apenas se estiver parcialmente fora da viewport)
  useEffect(() => {
    const lastOpened = Array.from(openItems).pop()
    if (lastOpened === undefined) return

    const el = itemRefs.current[lastOpened]
    if (!el) return

    // Aguarda a animação iniciar antes de scrollar
    const timeout = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

      if (!isVisible) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [openItems])

  // Estado vazio
  if (!faq || faq.length === 0) {
    return null
  }

  return (
    <section
      className="py-20 lg:py-28 px-6 bg-[#f5f7fa]"
      aria-labelledby="faq-title"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Schema.org JSON-LD para Rich Snippets no Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
            Dúvidas frequentes
          </span>
          <h2
            id="faq-title"
            className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4 tracking-tight"
          >
            Perguntas Frequentes
          </h2>
          <div
            className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full"
            aria-hidden="true"
          />
          <p className="mt-4 text-gray-600 text-base max-w-xl">
            Respostas rápidas para as dúvidas mais comuns sobre nossos serviços de engenharia e consultoria.
          </p>
        </div>

        {/* Lista de perguntas */}
        <div className="space-y-3" role="list">
          {faq.map((item, i) => {
            const isOpen = openItems.has(i)
            const panelId = `faq-panel-${i}`
            const headingId = `faq-heading-${i}`

            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`
                  bg-white rounded-2xl border overflow-hidden
                  transition-all duration-300
                  ${isOpen
                    ? 'border-[#4a9e10]/30 shadow-md shadow-green-100/50'
                    : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
                  }
                `}
                role="listitem"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3 className="sr-only" itemProp="name">{item.q}</h3>

                <button
                  id={headingId}
                  onClick={() => toggleItem(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={`
                    w-full flex items-center justify-between gap-4 text-left 
                    px-6 py-5 transition-colors
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4a9e10]
                    ${isOpen ? 'bg-green-50/40' : 'hover:bg-gray-50'}
                  `}
                >
                  <span
                    className={`
                      font-bold text-[15px] sm:text-base transition-colors
                      ${isOpen ? 'text-[#2d6208]' : 'text-[#1a2e0a]'}
                    `}
                    itemProp="name"
                  >
                    {item.q}
                  </span>
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isOpen
                      ? 'bg-[#4a9e10] text-white rotate-180'
                      : 'bg-gray-100 text-[#4a9e10] group-hover:bg-green-100'
                    }
                  `}>
                    <FaChevronDown size={13} aria-hidden="true" />
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  aria-hidden={!isOpen}
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-[15px] leading-relaxed prose prose-sm max-w-none prose-p:mb-2 prose-a:text-[#4a9e10] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
                      itemProp="text"
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA de contato */}
        <div
          className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center"
          role="complementary"
          aria-label="Suporte adicional"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <FaWhatsapp size={18} className="text-[#25D366]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-[#1a2e0a]">Ainda tem dúvidas?</h3>
          </div>
          <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
            Nossa equipe está pronta para ajudar você. Atendimento rápido e personalizado de segunda a sexta.
          </p>
          <a
            href={whatsappData.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Falar com especialista pelo WhatsApp: ${whatsappData.displayNumber}`}
            className="inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9e10] focus-visible:ring-offset-2"
            style={{ background: 'linear-gradient(135deg, #6aa521 0%, #3a7d0a 100%)' }}
          >
            <FaWhatsapp size={18} aria-hidden="true" />
            <span>Tirar dúvida pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}