import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaPhone, FaSearch, FaTimes, FaArrowRight, FaHome,
  FaChevronRight, FaFilter, FaFrown, FaCheckCircle, FaCertificate,
  FaIndustry, FaBuilding, FaHospital, FaSchool, FaWarehouse, FaHardHat,
  FaArrowUp, FaStar, FaShieldAlt, FaUsers, FaAward, FaBookOpen,
} from 'react-icons/fa'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Reveal from '../../components/Reveal/Reveal'
import {
  services, getFeaturedServices, getServicesBySegment, searchServices,
  getServicesStats, marketSegments, iconMap as serviceIconMap,
} from '../../data/services'
import {
  company, sanitizePhone, getWhatsappUrl, getPhoneUrl,
} from '../../data/company'

// ═══════════════════════════════════════════════════════════════════
// MAPEAMENTO DE ÍCONES DE SEGMENTO
// ═══════════════════════════════════════════════════════════════════

const segmentIconMap = {
  FaIndustry, FaBuilding, FaHospital, FaSchool, FaWarehouse, FaHardHat,
  FaHome: FaBuilding, FaUsers,
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

export default function Services() {
  const [segment, setSegment] = useState('todos')
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Debounce da busca (300ms)
  useEffect(() => {
    const timeout = setTimeout(() => setQuery(searchInput.trim()), 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  // Dados derivados memoizados
  const stats = useMemo(() => getServicesStats(), [])
  const featured = useMemo(() => getFeaturedServices(4), [])
  const whatsappUrl = useMemo(() => getWhatsappUrl(), [])
  const phoneUrl = useMemo(() => getPhoneUrl(), [])

  // Filtragem inteligente
  const filtered = useMemo(() => {
    let result = services

    // Aplica filtro de segmento
    if (segment !== 'todos') {
      result = getServicesBySegment(segment)
    }

    // Aplica busca textual (com scoring)
    if (query) {
      const searchResults = searchServices(query, 50)
      const searchSlugs = new Set(searchResults.map((s) => s.slug))
      result = result.filter((s) => searchSlugs.has(s.slug))
    }

    // Ordena: featured primeiro, depois por ordem original
    return [...result].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }, [segment, query])

  // Schema.org CollectionPage
  useEffect(() => {
    const siteUrl = company.seo?.siteUrl || 'https://ajnengenharia.com.br'

    document.title = `Serviços de Engenharia e SST em BH | ${company.shortName}`

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', 'Conheça todos os serviços da AJN Engenharia em BH: laudos técnicos (LTCAT, PGR, PCMSO), treinamentos NR, combate a incêndio (AVCB/CLCB), projetos elétricos e eSocial SST.')
    setMeta('property', 'og:title', `Serviços | ${company.shortName}`)
    setMeta('property', 'og:description', 'Soluções completas em QSSMA e engenharia para sua empresa em Belo Horizonte.')
    setMeta('property', 'og:url', `${siteUrl}/servicos`)
    setMeta('property', 'og:image', `${siteUrl}/og-services.jpg`)

    // Schema.org ItemList de serviços
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Serviços da AJN Engenharia',
      description: 'Catálogo completo de serviços técnicos em SST, engenharia e combate a incêndio.',
      numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        url: `${siteUrl}/servicos/${s.slug}`,
      })),
    }

    let script = document.getElementById('services-schema')
    if (!script) {
      script = document.createElement('script')
      script.id = 'services-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)

    return () => {
      const s = document.getElementById('services-schema')
      if (s) s.remove()
    }
  }, [])

  // Botão voltar ao topo
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clearFilters = useCallback(() => {
    setSegment('todos')
    setSearchInput('')
    setQuery('')
  }, [])

  return (
    <main>
      {/* ══════════ HERO BANNER ══════════ */}
      <section
        className="bg-gradient-to-br from-[#1a3a0a] via-[#2d5c1a] to-[#3a7d0a] pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 text-center relative overflow-hidden"
      >
        {/* Elementos decorativos */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, #5cbf1a 0%, transparent 60%), radial-gradient(circle at 75% 50%, #5cbf1a 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-black/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6 flex-wrap"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors focus:outline-none focus-visible:text-[#a4d65e]"
            >
              <FaHome size={12} aria-hidden="true" />
              <span>Home</span>
            </Link>
            <FaChevronRight size={9} aria-hidden="true" />
            <span className="text-[#a4d65e] font-semibold" aria-current="page">
              Serviços
            </span>
          </nav>

          <span className="relative inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 border border-[#a4d65e]/40 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" aria-hidden="true" />
            O que oferecemos
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            Nossos Serviços
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Soluções completas em QSSMA, combate a incêndio, projetos elétricos e laudos técnicos para sua empresa.
          </p>

          {/* Busca */}
          <div className="max-w-md mx-auto relative mb-6">
            <label htmlFor="services-search" className="sr-only">
              Buscar serviço
            </label>
            <FaSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={15}
              aria-hidden="true"
            />
            <input
              id="services-search"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar serviço... (ex: LTCAT, NR-35, AVCB)"
              className="w-full bg-white/95 backdrop-blur-sm rounded-full pl-12 pr-20 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] shadow-lg"
              autoComplete="off"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Limpar busca"
              >
                <FaTimes size={14} />
              </button>
            ) : (
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200 font-mono">
                /
              </kbd>
            )}
          </div>

          {query && (
            <p className="text-white/70 text-sm">
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'} para "
              <span className="text-[#a4d65e] font-semibold">{query}</span>"
            </p>
          )}
        </div>
      </section>

      {/* ══════════ BARRA DE STATS ══════════ */}
      <section className="bg-[#1a2e0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatItem icon={FaBookOpen} value={stats.total} label="Serviços" />
            <StatItem icon={FaStar} value={stats.featured} label="Em destaque" />
            <StatItem icon={FaCertificate} value={stats.uniqueNorms} label="Normas atendidas" />
            <StatItem icon={FaUsers} value={stats.uniqueSegments} label="Segmentos" />
          </div>
        </div>
      </section>

      {/* ══════════ SERVIÇOS EM DESTAQUE ══════════ */}
      {featured.length > 0 && !query && segment === 'todos' && (
        <section className="py-16 lg:py-20 px-6 bg-white" aria-labelledby="featured-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-4 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <FaStar size={11} aria-hidden="true" />
                Mais procurados
              </span>
              <h2
                id="featured-heading"
                className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-3 tracking-tight"
              >
                Serviços em destaque
              </h2>
              <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                As soluções mais solicitadas pelos nossos clientes em Belo Horizonte e região.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((service, i) => (
                <Reveal key={service.id} delay={i * 80}>
                  <FeaturedServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ GRID DE SERVIÇOS ══════════ */}
      <section className="py-16 lg:py-20 px-6 bg-[#f5f7fa]" aria-labelledby="all-services-heading">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            tag={query ? 'Resultados da busca' : 'Todos os serviços'}
            title={query ? `Resultados para "${query}"` : 'Como podemos ajudar?'}
            subtitle={
              query
                ? `${filtered.length} serviço${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}`
                : 'Selecione um serviço para conhecer todos os detalhes, entregáveis e normas aplicáveis.'
            }
          />

          {/* Filtros por segmento */}
          <Reveal>
            <div className="mb-10">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
                <FaFilter size={12} aria-hidden="true" />
                <span>Filtrar por segmento</span>
              </div>
              <div
                className="flex flex-wrap justify-center gap-2.5"
                role="tablist"
                aria-label="Segmentos de mercado"
              >
                <SegmentButton
                  id="todos"
                  label="Todos"
                  count={services.length}
                  active={segment === 'todos'}
                  onClick={() => setSegment('todos')}
                />
                {marketSegments.map((seg) => {
                  const count = getServicesBySegment(seg.id).length
                  if (count === 0) return null
                  return (
                    <SegmentButton
                      key={seg.id}
                      id={seg.id}
                      label={seg.label}
                      count={count}
                      active={segment === seg.id}
                      onClick={() => setSegment(seg.id)}
                      icon={seg.icon}
                    />
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* Estado vazio */}
          {filtered.length === 0 && (
            <Reveal>
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaFrown size={32} className="text-gray-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nenhum serviço encontrado
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Não encontramos serviços para {query ? `"${query}"` : `o segmento selecionado`}.
                  Tente buscar por outros termos ou veja todos os serviços.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 bg-[#3a7d0a] hover:bg-[#2d6208] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                >
                  Ver todos os serviços
                </button>
              </div>
            </Reveal>
          )}

          {/* Grid de cards */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, i) => (
                <Reveal key={service.id} delay={(i % 3) * 80}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════ SOLUÇÕES POR SEGMENTO ══════════ */}
      {!query && segment === 'todos' && (
        <section className="py-16 lg:py-20 px-6 bg-white" aria-labelledby="segments-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-4 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <FaIndustry size={11} aria-hidden="true" />
                Para sua empresa
              </span>
              <h2
                id="segments-heading"
                className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-3 tracking-tight"
              >
                Soluções por segmento
              </h2>
              <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                Expertise especializada para diferentes setores da economia.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {marketSegments.map((seg, i) => {
                const count = getServicesBySegment(seg.id).length
                if (count === 0) return null
                const SegIcon = segmentIconMap[seg.icon] || FaBuilding
                return (
                  <Reveal key={seg.id} delay={i * 60}>
                    <button
                      onClick={() => {
                        setSegment(seg.id)
                        window.scrollTo({
                          top: document.getElementById('all-services-heading')?.offsetTop - 100,
                          behavior: 'smooth',
                        })
                      }}
                      className="group w-full bg-gradient-to-br from-white to-[#f9fafb] hover:from-green-50 hover:to-emerald-50 border border-gray-100 hover:border-[#a4d65e]/50 rounded-2xl p-5 text-center transition-all hover:shadow-lg hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#6aa521] to-[#2d6208] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <SegIcon className="text-white" size={20} aria-hidden="true" />
                      </div>
                      <p className="font-bold text-[#1a2e0a] text-sm mb-1">{seg.label}</p>
                      <p className="text-gray-500 text-xs">{count} serviços</p>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ CTA FINAL ══════════ */}
      <section
        className="py-16 lg:py-20 px-6 bg-gradient-to-br from-[#2a3f12] via-[#3a5519] to-[#44621f] text-center relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #ffffff 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#a4d65e]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#5cbf1a]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Reveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#a4d65e]/20 flex items-center justify-center">
              <FaWhatsapp className="text-[#a4d65e]" size={28} aria-hidden="true" />
            </div>

            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
            >
              Não encontrou o que precisa?
            </h2>

            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Entre em contato pelo WhatsApp. Nossa equipe de engenheiros está pronta para desenvolver
              uma <strong className="text-[#a4d65e]">solução customizada</strong> para sua empresa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com especialista pelo WhatsApp"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-900/40"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                Falar pelo WhatsApp
              </a>
              <a
                href={phoneUrl}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                <FaPhone size={14} aria-hidden="true" />
                {company.whatsappDisplay || company.phone}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <FaCheckCircle className="text-[#a4d65e]" size={12} aria-hidden="true" />
                Orçamento gratuito
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <FaCheckCircle className="text-[#a4d65e]" size={12} aria-hidden="true" />
                Resposta em até 15 minutos
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <FaCheckCircle className="text-[#a4d65e]" size={12} aria-hidden="true" />
                Sem compromisso
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Botão voltar ao topo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        className={`
          fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full
          bg-[#3a7d0a] hover:bg-[#2d6208] text-white
          shadow-lg shadow-green-900/30
          flex items-center justify-center
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white
          ${showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
      >
        <FaArrowUp size={16} aria-hidden="true" />
      </button>
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTES
// ═══════════════════════════════════════════════════════════════════

/**
 * Item de estatística para a barra superior
 */
function StatItem({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center justify-center gap-3 text-white">
      <div className="w-10 h-10 rounded-xl bg-[#a4d65e]/20 flex items-center justify-center shrink-0">
        <Icon className="text-[#a4d65e]" size={16} aria-hidden="true" />
      </div>
      <div className="text-left">
        <p className="text-white text-xl font-black leading-none">{value}</p>
        <p className="text-white/60 text-[11px] uppercase tracking-wider">{label}</p>
      </div>
    </div>
  )
}

/**
 * Botão de filtro por segmento
 */
function SegmentButton({ id, label, count, active, onClick, icon }) {
  const Icon = icon ? segmentIconMap[icon] : null
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2
        ${active
          ? 'bg-[#3a7d0a] text-white shadow-lg shadow-green-900/20'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-[#a4d65e] hover:text-[#3a7d0a]'
        }
      `}
    >
      {Icon && <Icon size={12} aria-hidden="true" />}
      {label}
      <span className={`text-xs ${active ? 'text-white/80' : 'text-gray-400'}`}>
        ({count})
      </span>
    </button>
  )
}

/**
 * Card de serviço em destaque (compacto)
 */
function FeaturedServiceCard({ service }) {
  const Icon = serviceIconMap[service.icon] || FaShieldAlt
  const colorData = {
    blue: { from: '#3b82f6', to: '#1e40af' },
    green: { from: '#4a9e10', to: '#2d6208' },
    indigo: { from: '#6366f1', to: '#4338ca' },
    purple: { from: '#9333ea', to: '#6b21a8' },
    teal: { from: '#14b8a6', to: '#0f766e' },
    orange: { from: '#f97316', to: '#b45309' },
    red: { from: '#ef4444', to: '#b91c1c' },
    yellow: { from: '#eab308', to: '#a16207' },
    gray: { from: '#6b7280', to: '#374151' },
  }[service.color] || { from: '#4a9e10', to: '#2d6208' }

  return (
    <Link
      to={`/servicos/${service.slug}`}
      className="group relative block h-full bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#a4d65e]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${colorData.from} 0%, ${colorData.to} 100%)` }}
      >
        <Icon className="text-white" size={24} aria-hidden="true" />
      </div>

      <h3 className="font-black text-[#1a2e0a] text-lg mb-2 group-hover:text-[#3a7d0a] transition-colors">
        {service.shortTitle}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {service.summary}
      </p>

      <span className="inline-flex items-center gap-1.5 text-[#3a7d0a] font-bold text-xs group-hover:gap-2.5 transition-all">
        Saiba mais
        <FaArrowRight size={10} aria-hidden="true" />
      </span>

      {/* Badge featured */}
      <div className="absolute top-4 right-4">
        <FaStar className="text-[#eab308]" size={16} aria-label="Em destaque" />
      </div>
    </Link>
  )
}

/**
 * Card de serviço principal (com foto e dados ricos)
 */
function ServiceCard({ service }) {
  const Icon = serviceIconMap[service.icon] || FaShieldAlt

  return (
    <Link
      to={`/servicos/${service.slug}`}
      className="group relative block w-full h-[420px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4a9e10]/50"
    >
      {/* Imagem de fundo */}
      <img
        src={`/images/servicos/${service.slug}.jpg`}
        alt={service.shortTitle}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Overlay gradiente */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/90 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/95 transition-colors duration-500"
        aria-hidden="true"
      />

      {/* Badges superiores */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
        {/* Ícone do serviço */}
        <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
          <Icon className="text-white" size={18} aria-hidden="true" />
        </div>

        {/* Badges à direita */}
        <div className="flex flex-col gap-1.5 items-end">
          {service.featured && (
            <span className="inline-flex items-center gap-1 bg-[#a4d65e] text-[#1a2e0a] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              <FaStar size={8} aria-hidden="true" />
              Destaque
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo ancorado embaixo */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3
          className="text-white font-black text-xl leading-tight mb-2.5 line-clamp-2"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
          {service.shortTitle}
        </h3>

        <div
          className="w-10 h-0.5 bg-[#5cbf1a] rounded-full mb-3 group-hover:w-16 transition-all duration-300"
          aria-hidden="true"
        />

        <p
          className="text-white/85 text-sm leading-relaxed line-clamp-2 mb-4"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
        >
          {service.summary}
        </p>

        {/* Normas relacionadas (se houver) */}
        {service.relatedNorms && service.relatedNorms.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.relatedNorms.slice(0, 3).map((norm, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full"
              >
                <FaCertificate size={8} aria-hidden="true" />
                {norm}
              </span>
            ))}
            {service.relatedNorms.length > 3 && (
              <span className="text-white/60 text-[10px] font-semibold self-center">
                +{service.relatedNorms.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <span className="inline-flex items-center justify-center gap-2 border border-white/60 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full group-hover:bg-white group-hover:text-[#2d6208] group-hover:border-white transition-all duration-300">
          Saiba mais
          <FaArrowRight size={10} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}