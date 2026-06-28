import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  FaBars, FaTimes, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaChevronDown, FaGraduationCap, FaArrowRight
} from 'react-icons/fa'
import { company } from '../../data/company'
import { services } from '../../data/services'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/servicos', label: 'Serviços', hasDropdown: true },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

// Sanitiza o número do WhatsApp removendo qualquer caractere não numérico
const sanitizePhone = (phone) => String(phone || '').replace(/\D/g, '')

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)
  const dropdownButtonRef = useRef(null)
  const location = useLocation()

  // Memoiza dados para evitar recálculos
  const whatsappUrl = useMemo(
    () => `https://wa.me/${sanitizePhone(company.whatsapp)}`,
    []
  )

  const limitedServices = useMemo(() => services.slice(0, 9), [])

  // ── Scroll tracking (passive + threshold para evitar re-renders) ──
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // estado inicial
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Fecha menus ao mudar de rota ──
  useEffect(() => {
    setMenuOpen(false)
    setMobileServicesOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  // ── Body scroll lock quando menu mobile aberto ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Click outside fecha dropdown ──
  useEffect(() => {
    if (!dropdownOpen) return

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        dropdownButtonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [dropdownOpen])

  // ── Navegação por teclado no dropdown ──
  const handleDropdownKeyDown = useCallback((e) => {
    if (!dropdownOpen) return

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll('[role="menuitem"]')
      if (!items || items.length === 0) return

      const currentIndex = Array.from(items).indexOf(document.activeElement)
      let nextIndex

      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      }

      items[nextIndex]?.focus()
    }
  }, [dropdownOpen])

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev)
  }, [])

  // Classes reutilizáveis
  const gradientTopBar = 'bg-[linear-gradient(90deg,#4a6b22_0%,#3a5519_100%)]'
  const gradientCTA = 'bg-[linear-gradient(135deg,#6aa521_0%,#4a8c0a_100%)]'

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Barra superior de contato ── */}
      <div className={`text-white text-[13px] py-3 px-6 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'} ${gradientTopBar}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-2">
          <a
            href="https://maps.google.com/?q=Rua+Alberto+Cintra,+35,+União,+Belo+Horizonte"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2.5 text-white/85 hover:text-white transition-colors"
            aria-label="Ver endereço no Google Maps"
          >
            <FaMapMarkerAlt size={13} className="text-[#a4d65e]" aria-hidden="true" />
            <span>Rua Alberto Cintra, 35, sala 601 — Belo Horizonte/MG</span>
          </a>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
              aria-label={`WhatsApp: ${company.whatsapp || '31 98473-4644'}`}
            >
              <FaWhatsapp size={14} className="text-[#a4d65e]" aria-hidden="true" />
              <span>(31) 98473-4644</span>
            </a>

            <span className="hidden sm:block w-px h-3.5 bg-white/20" aria-hidden="true" />

            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
              aria-label={`Enviar email para ${company.email}`}
            >
              <FaEnvelope size={13} className="text-[#a4d65e]" aria-hidden="true" />
              <span className="hidden md:inline">{company.email}</span>
              <span className="md:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Navbar principal ── */}
      <nav
        className={`bg-white border-b border-gray-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
        aria-label="Navegação principal"
      >
        <div
          className={`max-w-7xl mx-auto px-5 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-24'
            }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0"
            aria-label="AJN Consultoria e Engenharia - Ir para página inicial"
          >
            <img
              src="/logo.png"
              alt=""
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-12 sm:h-16' : 'h-14 sm:h-20'
                }`}
            />
            <span className="sr-only">AJN Consultoria e Engenharia</span>
          </Link>

          {/* ── Links desktop ── */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to} className="relative">
                {link.hasDropdown ? (
                  <div
                    ref={dropdownRef}
                    onKeyDown={handleDropdownKeyDown}
                  >
                    <button
                      ref={dropdownButtonRef}
                      onClick={toggleDropdown}
                      onMouseEnter={() => setDropdownOpen(true)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="menu"
                      className={`
                        flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-semibold 
                        transition-colors relative group
                        ${location.pathname.startsWith('/servicos')
                          ? 'text-[#4a8c0a]'
                          : 'text-gray-700 hover:text-[#4a8c0a]'
                        }
                      `}
                    >
                      {link.label}
                      <FaChevronDown
                        size={10}
                        className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                          }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`
                          absolute -bottom-0.5 left-4 right-4 h-0.5 bg-[#6aa521] 
                          rounded-full transition-transform origin-left
                          ${location.pathname.startsWith('/servicos')
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                          }
                        `}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Dropdown serviços */}
                    <div
                      role="menu"
                      aria-label="Lista de serviços"
                      className={`
                        absolute top-full left-0 w-80 bg-white rounded-2xl 
                        shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 
                        py-3 z-50 mt-2 origin-top-left
                        transition-all duration-200
                        ${dropdownOpen
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }
                      `}
                    >
                      {limitedServices.map((s) => (
                        <Link
                          key={s.id}
                          to={`/servicos/${s.slug}`}
                          role="menuitem"
                          tabIndex={dropdownOpen ? 0 : -1}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:text-[#4a8c0a] hover:bg-green-50 transition-colors focus:outline-none focus:bg-green-50 focus:text-[#4a8c0a]"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#a4d65e] shrink-0"
                            aria-hidden="true"
                          />
                          <span className="flex-1">{s.shortTitle}</span>
                        </Link>
                      ))}

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/servicos"
                          role="menuitem"
                          tabIndex={dropdownOpen ? 0 : -1}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center justify-between px-5 py-3 text-sm font-bold text-[#4a8c0a] hover:bg-green-50 transition-colors focus:outline-none focus:bg-green-50"
                        >
                          <span>Ver todos os serviços</span>
                          <FaArrowRight size={11} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-[15px] font-semibold transition-colors relative group ${isActive ? 'text-[#4a8c0a]' : 'text-gray-700 hover:text-[#4a8c0a]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          className={`
                            absolute -bottom-0.5 left-4 right-4 h-0.5 bg-[#6aa521] 
                            rounded-full transition-transform origin-left
                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                          `}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* ── Botão CTA Treinamentos (Desktop) ── */}
          <Link
            to="/servicos/treinamentos-nr"
            className="hidden lg:flex items-center gap-2 text-white px-7 py-3 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-900/25 hover:scale-105 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6aa521] focus-visible:ring-offset-2"
            style={{ background: 'linear-gradient(135deg, #6aa521 0%, #4a8c0a 100%)' }}
          >
            <FaGraduationCap size={16} aria-hidden="true" />
            <span>Treinamentos online</span>
          </Link>

          {/* ── Botão hamburger mobile ── */}
          <button
            className="lg:hidden text-gray-700 p-2.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6aa521]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* ── Menu mobile com animação ── */}
        <div
          id="mobile-menu"
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}
          `}
          aria-hidden={!menuOpen}
        >
          <div className="border-t border-gray-100 px-4 py-4 bg-white">
            <ul className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((p) => !p)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-lg 
                          text-sm font-semibold transition-colors
                          ${location.pathname.startsWith('/servicos')
                            ? 'text-[#4a8c0a] bg-green-50'
                            : 'text-gray-700 hover:text-[#4a8c0a] hover:bg-gray-50'
                          }
                        `}
                        aria-expanded={mobileServicesOpen}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          size={11}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''
                            }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Accordion mobile dos serviços */}
                      <div
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${mobileServicesOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
                        `}
                      >
                        <ul className="pl-4 mt-1 space-y-0.5 border-l-2 border-green-100 ml-4">
                          {limitedServices.map((s) => (
                            <li key={s.id}>
                              <Link
                                to={`/servicos/${s.slug}`}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-[#4a8c0a] hover:bg-green-50 rounded-lg transition-colors"
                              >
                                {s.shortTitle}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              to="/servicos"
                              className="block px-4 py-2 text-sm font-bold text-[#4a8c0a] hover:bg-green-50 rounded-lg transition-colors"
                            >
                              Ver todos →
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'text-[#4a8c0a] bg-green-50' : 'text-gray-700 hover:text-[#4a8c0a] hover:bg-gray-50'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Links de contato mobile */}
            <div className="pt-4 border-t border-gray-100 mb-4 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-[#4a8c0a] rounded-lg hover:bg-gray-50"
              >
                <FaWhatsapp size={16} className="text-[#25D366]" aria-hidden="true" />
                <span>(31) 98473-4644</span>
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-[#4a8c0a] rounded-lg hover:bg-gray-50"
              >
                <FaEnvelope size={15} className="text-[#4a8c0a]" aria-hidden="true" />
                <span className="truncate">{company.email}</span>
              </a>
            </div>

            <Link
              to="/servicos/treinamentos-nr"
              className="flex items-center justify-center gap-2 bg-[#4a8c0a] hover:bg-[#3a7d0a] text-white px-6 py-3.5 rounded-full font-bold text-sm w-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6aa521]"
            >
              <FaGraduationCap size={16} aria-hidden="true" />
              <span>Treinamentos online</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}