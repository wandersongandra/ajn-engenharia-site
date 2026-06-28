import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaPaperPlane, FaEnvelope, FaMapMarkerAlt,
  FaInstagram, FaLinkedin, FaArrowRight, FaPhone,
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

function ColTitle({ children }) {
  return (
    <div className="mb-6">
      <h3 className="text-white font-extrabold text-sm uppercase tracking-[0.15em]">{children}</h3>
      <div className="w-10 h-[3px] bg-[#a4d65e] rounded-full mt-2.5" />
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #4a6b22 0%, #3a5519 50%, #2a3f12 100%)' }}
    >
      {/* Linha de destaque no topo */}
      <div className="h-1 w-full bg-gradient-to-r from-[#a4d65e] via-[#6aa521] to-[#a4d65e]" />

      {/* Brilhos decorativos */}
      <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-black/15 blur-3xl pointer-events-none" />

      {/* ── Corpo ── */}
      <div className="relative max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">

        {/* Logo + info + social */}
        <div className="lg:col-span-4">
          <img src="/logo-white.png" alt="AJN Consultoria e Engenharia" className="h-20 w-auto mb-5" />
          <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
            Especialistas em QSSMA, combate a incêndio, projetos elétricos e laudos técnicos em Belo Horizonte e região.
          </p>
          <div className="space-y-1 mb-6 text-sm">
            <p className="text-white/70"><span className="text-white/45">Razão Social:</span> {company.legalName}</p>
            <p className="text-white/70"><span className="text-white/45">CNPJ:</span> {company.cnpj}</p>
          </div>
          {/* Social */}
          <div className="flex gap-3">
            {company.social?.instagram && (
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] hover:-translate-y-0.5 transition-all">
                <FaInstagram size={17} />
              </a>
            )}
            {company.social?.linkedin && (
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] hover:-translate-y-0.5 transition-all">
                <FaLinkedin size={17} />
              </a>
            )}
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:-translate-y-0.5 transition-all">
              <FaWhatsapp size={17} />
            </a>
          </div>
        </div>

        {/* Navegação */}
        <div className="lg:col-span-2">
          <ColTitle>Navegação</ColTitle>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}
                  className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[15px] transition-colors">
                  <span className="w-0 group-hover:w-3 h-px bg-[#a4d65e] transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Serviços */}
        <div className="lg:col-span-3">
          <ColTitle>Serviços</ColTitle>
          <ul className="space-y-3">
            {topServices.map((s) => (
              <li key={s.id}>
                <Link to={`/servicos/${s.slug}`}
                  className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[15px] transition-colors">
                  <span className="w-0 group-hover:w-3 h-px bg-[#a4d65e] transition-all duration-300" />
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div className="lg:col-span-3">
          <ColTitle>Contato</ColTitle>
          <ul className="space-y-4 mb-6">
            <li className="flex gap-3 text-white/70 text-sm leading-relaxed">
              <FaMapMarkerAlt className="text-[#a4d65e] mt-0.5 shrink-0" size={15} />
              <span>Rua Alberto Cintra, 35, sala 601 — União, Belo Horizonte/MG · CEP 31160-370</span>
            </li>
            <li>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors">
                <FaPhone className="text-[#a4d65e] shrink-0" size={13} /> {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors">
                <FaEnvelope className="text-[#a4d65e] shrink-0" size={13} />
                <span className="break-words">{company.email}</span>
              </a>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <Link to="/contato"
              className="inline-flex items-center justify-center gap-2 bg-[#a4d65e] hover:bg-[#92c44d] text-[#2a3f12] px-5 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg">
              <FaPaperPlane size={13} /> Envie sua mensagem!
            </Link>
            <Link to="/contato"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-[#a4d65e] hover:bg-white/5 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all">
              Trabalhe Conosco <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Rodapé final ── */}
      <div className="relative border-t border-white/12">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-white/50 text-xs text-center sm:text-left">
              © {currentYear} AJN Consultoria e Engenharia. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-[11px] text-center sm:text-left">
              Desenvolvido por <a href="https://gandratecnologia.com.br" target="_blank" rel="noopener noreferrer" className="text-[#a4d65e] hover:text-white transition-colors">Gandra Tecnologia</a>
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Rua+Alberto+Cintra,+35,+União,+Belo+Horizonte,+MG"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/45 hover:text-[#a4d65e] text-xs transition-colors"
          >
            <FaMapMarkerAlt size={11} /> Ver no Google Maps
          </a>
        </div>
      </div>
    </footer>
  )
}
