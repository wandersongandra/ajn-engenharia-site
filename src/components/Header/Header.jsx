import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaChevronDown, FaGraduationCap } from 'react-icons/fa'
import { company } from '../../data/company'
import { services } from '../../data/services'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/servicos', label: 'Serviços', hasDropdown: true },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setServicesOpen(false) }, [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>

      {/* ── Barra superior ── */}
      <div
        className="text-white text-[13px] py-3 px-6"
        style={{ background: 'linear-gradient(90deg, #4a6b22 0%, #3a5519 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-2">
          <a
            href="https://maps.google.com/?q=Rua+Alberto+Cintra,+35,+União,+Belo+Horizonte"
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2.5 text-white/85 hover:text-white transition-colors"
          >
            <FaMapMarkerAlt size={13} className="text-[#a4d65e]" />
            Rua Alberto Cintra, 35, sala 601 — Belo Horizonte/MG
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/85 hover:text-white transition-colors">
              <FaWhatsapp size={14} className="text-[#a4d65e]" /> (31) 98473-4644
            </a>
            <span className="hidden sm:block w-px h-3.5 bg-white/20" />
            <a href={`mailto:${company.email}`}
              className="flex items-center gap-2 text-white/85 hover:text-white transition-colors">
              <FaEnvelope size={13} className="text-[#a4d65e]" /> {company.email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Navbar branca ── */}
      <nav className={`bg-white border-b border-gray-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className={`max-w-7xl mx-auto px-5 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 sm:h-24' : 'h-20 sm:h-28'}`}>

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="AJN Consultoria e Engenharia"
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-14 sm:h-20' : 'h-16 sm:h-28'}`}
            />
          </Link>

          {/* Links desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-semibold transition-colors relative group ${
                          isActive ? 'text-[#4a8c0a]' : 'text-gray-700 hover:text-[#4a8c0a]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <FaChevronDown size={10} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                          <span className={`absolute -bottom-0.5 left-4 right-4 h-0.5 bg-[#6aa521] rounded-full transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </>
                      )}
                    </NavLink>

                    {/* Dropdown serviços */}
                    {servicesOpen && (
                      <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 mt-1">
                        {services.slice(0, 9).map((s) => (
                          <Link
                            key={s.id}
                            to={`/servicos/${s.slug}`}
                            className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-700 hover:text-[#4a8c0a] hover:bg-green-50 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e] shrink-0" />
                            {s.shortTitle}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link to="/servicos" className="block px-5 py-2 text-sm font-bold text-[#4a8c0a] hover:bg-green-50">
                            Ver todos os serviços →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-[15px] font-semibold transition-colors relative group ${
                        isActive ? 'text-[#4a8c0a]' : 'text-gray-700 hover:text-[#4a8c0a]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span className={`absolute -bottom-0.5 left-4 right-4 h-0.5 bg-[#6aa521] rounded-full transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Botão Treinamentos */}
          <Link
            to="/servicos/treinamentos-nr"
            className="hidden lg:flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-900/25 hover:scale-105 shrink-0"
            style={{ background: 'linear-gradient(135deg, #6aa521 0%, #4a8c0a 100%)' }}
          >
            <FaGraduationCap size={16} />
            Treinamentos online
          </Link>

          {/* Hamburger mobile */}
          <button
            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 px-4 py-4 bg-white">
            <ul className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                        isActive ? 'text-[#4a8c0a] bg-green-50' : 'text-gray-700 hover:text-[#4a8c0a] hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/servicos/treinamentos-nr"
              className="flex items-center justify-center bg-[#4a8c0a] text-white px-6 py-3 rounded-full font-bold text-sm w-full"
            >
              Treinamentos online
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
