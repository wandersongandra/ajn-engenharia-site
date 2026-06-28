import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaPaperPlane, FaEnvelope, FaMapMarkerAlt,
  FaInstagram, FaLinkedin, FaArrowRight, FaPhone, FaArrowUp,
} from 'react-icons/fa'
import { company } from '../../data/company'
import { services } from '../../data/services'

const topServices = services.slice(0, 6)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
  { to: '/mapa-do-site', label: 'Mapa do site' },
]

// Sanitiza telefone para URLs (wa.me e tel:)
const sanitizePhone = (phone) => String(phone || '').replace(/\D/g, '')

function ColTitle({ children, id }) {
  return (
    <div className="mb-6">
      <h3
        id={id}
        className="text-white font-extrabold text-sm uppercase tracking-[0.15em]"
      >
        {children}
      </h3>
      <div
        className="w-10 h-[3px] bg-[#a4d65e] rounded-full mt-2.5"
        aria-hidden="true"
      />
    </div>
  )
}

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Sanitiza dados de contato uma única vez
  const contactData = useMemo(() => {
    const cleanPhone = sanitizePhone(company.phone)
    const cleanWhatsapp = sanitizePhone(company.whatsapp)

    return {
      phoneUrl: cleanPhone ? `tel:+${cleanPhone}` : '#',
      whatsappUrl: cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : '#',
      displayPhone: company.phone || 'Telefone não disponível',
    }
  }, [])

  // Redes sociais como array (DRY)
  const socialLinks = useMemo(() => [
    {
      id: 'instagram',
      url: company.social?.instagram,
      Icon: FaInstagram,
      label: 'Instagram',
      hoverClass: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    },
    {
      id: 'linkedin',
      url: company.social?.linkedin,
      Icon: FaLinkedin,
      label: 'LinkedIn',
      hoverClass: 'hover:bg-[#0077B5] hover:border-[#0077B5]',
    },
    {
      id: 'whatsapp',
      url: contactData.whatsappUrl !== '#' ? contactData.whatsappUrl : null,
      Icon: FaWhatsapp,
      label: 'WhatsApp',
      hoverClass: 'hover:bg-[#25D366] hover:border-[#25D366]',
    },
  ].filter(link => link.url), [contactData.whatsappUrl])

  // Mostra botão "voltar ao topo" após 400px de scroll
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Schema.org JSON-LD para SEO Local (crítico para negócios locais!)
  const localBusinessSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': company.website || 'https://ajnengenharia.com.br',
    name: company.legalName || 'AJN Consultoria e Engenharia',
    image: '/logo.png',
    telephone: contactData.phoneUrl.replace('tel:', ''),
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Alberto Cintra, 35, sala 601',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      postalCode: '31160-370',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.9167,
      longitude: -43.9345,
    },
    url: company.website || 'https://ajnengenharia.com.br',
    sameAs: [
      company.social?.instagram,
      company.social?.linkedin,
    ].filter(Boolean),
  }), [contactData.phoneUrl])

  // IDs únicos para ARIA
  const navId = 'footer-nav'
  const servicesId = 'footer-services'
  const contactId = 'footer-contact'

  return (
    <footer
      className="relative text-white overflow-hidden bg-gradient-to-br from-[#4a6b22] via-[#3a5519] to-[#2a3f12]"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Schema.org para motores de busca (não renderizado visualmente) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Linha de destaque no topo */}
      <div
        className="h-1 w-full bg-gradient-to-r from-[#a4d65e] via-[#6aa521] to-[#a4d65e]"
        aria-hidden="true"
      />

      {/* Brilhos decorativos - respeitam prefers-reduced-motion */}
      <div className="motion-safe:block hidden" aria-hidden="true">
        <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-black/15 blur-3xl pointer-events-none" />
      </div>

      {/* ── Corpo ── */}
      <div className="relative max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">

        {/* Logo + info + social */}
        <div className="lg:col-span-4">
          <img
            src="/logo-white.png"
            alt="AJN Consultoria e Engenharia"
            className="h-20 w-auto mb-5"
            itemProp="logo"
          />
          <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
            Especialistas em QSSMA, combate a incêndio, projetos elétricos e laudos técnicos em Belo Horizonte e região.
          </p>
          <div className="space-y-1 mb-6 text-sm" itemProp="additionalProperty">
            <p className="text-white/70">
              <span className="text-white/45">Razão Social:</span>{' '}
              <span itemProp="legalName">{company.legalName}</span>
            </p>
            <p className="text-white/70">
              <span className="text-white/45">CNPJ:</span>{' '}
              <span itemProp="taxID">{company.cnpj}</span>
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ id, url, Icon, label, hoverClass }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${label} da AJN Engenharia`}
                className={`
                  w-10 h-10 rounded-xl bg-white/10 border border-white/15 
                  flex items-center justify-center hover:-translate-y-0.5 
                  transition-all duration-200 focus:outline-none 
                  focus-visible:ring-2 focus-visible:ring-[#a4d65e] focus-visible:ring-offset-2 
                  focus-visible:ring-offset-[#3a5519]
                  ${hoverClass}
                `}
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div className="lg:col-span-2">
          <ColTitle id={navId}>Navegação</ColTitle>
          <ul aria-labelledby={navId} className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[15px] transition-colors focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:decoration-[#a4d65e] focus-visible:underline-offset-4"
                >
                  <span
                    className="w-0 group-hover:w-3 h-px bg-[#a4d65e] transition-all duration-300"
                    aria-hidden="true"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Serviços */}
        <div className="lg:col-span-3">
          <ColTitle id={servicesId}>Serviços</ColTitle>
          <ul aria-labelledby={servicesId} className="space-y-3">
            {topServices.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/servicos/${s.slug}`}
                  className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[15px] transition-colors focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:decoration-[#a4d65e] focus-visible:underline-offset-4"
                >
                  <span
                    className="w-0 group-hover:w-3 h-px bg-[#a4d65e] transition-all duration-300"
                    aria-hidden="true"
                  />
                  {s.shortTitle}
                </Link>
              </li>
            ))}
            {/* Link "Ver todos" para não limitar o usuário */}
            {services.length > topServices.length && (
              <li className="pt-2">
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-2 text-[#a4d65e] hover:text-white font-semibold text-sm transition-colors focus:outline-none focus-visible:underline"
                >
                  Ver todos os serviços
                  <FaArrowRight size={11} aria-hidden="true" />
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Contato */}
        <div className="lg:col-span-3">
          <ColTitle id={contactId}>Contato</ColTitle>
          <ul aria-labelledby={contactId} className="space-y-4 mb-6" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <li className="flex gap-3 text-white/70 text-sm leading-relaxed">
              <FaMapMarkerAlt className="text-[#a4d65e] mt-0.5 shrink-0" size={15} aria-hidden="true" />
              <address className="not-italic">
                <span itemProp="streetAddress">Rua Alberto Cintra, 35, sala 601</span> —
                <span itemProp="addressLocality">União, Belo Horizonte/MG</span> ·
                CEP <span itemProp="postalCode">31160-370</span>
              </address>
            </li>
            <li>
              <a
                href={contactData.phoneUrl}
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors focus:outline-none focus-visible:text-white focus-visible:underline"
                itemProp="telephone"
              >
                <FaPhone className="text-[#a4d65e] shrink-0" size={13} aria-hidden="true" />
                <span>{contactData.displayPhone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors break-all focus:outline-none focus-visible:text-white focus-visible:underline"
                itemProp="email"
              >
                <FaEnvelope className="text-[#a4d65e] shrink-0" size={13} aria-hidden="true" />
                <span>{company.email}</span>
              </a>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 bg-[#a4d65e] hover:bg-[#92c44d] text-[#2a3f12] px-5 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3a5519]"
            >
              <FaPaperPlane size={13} aria-hidden="true" />
              Envie sua mensagem!
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-[#a4d65e] hover:bg-white/5 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a4d65e]"
            >
              Trabalhe Conosco
              <FaArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Rodapé final ── */}
      <div className="relative border-t border-white/12">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-white/50 text-xs text-center sm:text-left">
              © {currentYear} AJN Consultoria e Engenharia. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-[11px] text-center sm:text-left">
              Desenvolvido por{' '}
              <a
                href="https://gandratecnologia.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a4d65e] hover:text-white transition-colors focus:outline-none focus-visible:underline"
              >
                Gandra Tecnologia
              </a>
            </p>
          </div>

          {/* Link Google Maps (compacto) */}
          <a
            href="https://maps.google.com/?q=Rua+Alberto+Cintra,+35,+União,+Belo+Horizonte,+MG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/45 hover:text-[#a4d65e] text-xs transition-colors focus:outline-none focus-visible:text-white focus-visible:underline"
            aria-label="Ver localização no Google Maps"
          >
            <FaMapMarkerAlt size={11} aria-hidden="true" />
            Ver no Google Maps
          </a>
        </div>
      </div>

      {/* ── Botão Voltar ao Topo ── */}
      <button
        onClick={scrollToTop}
        aria-label="Voltar ao topo da página"
        className={`
          fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full 
          bg-white/10 backdrop-blur-sm border border-white/20 
          flex items-center justify-center text-white 
          hover:bg-[#a4d65e] hover:border-[#a4d65e] hover:text-[#2a3f12]
          transition-all duration-300 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a4d65e]
          ${showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
      >
        <FaArrowUp size={14} aria-hidden="true" />
      </button>
    </footer>
  )
}