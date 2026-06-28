import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaHome, FaChevronRight, FaSitemap, FaArrowRight,
  FaFileAlt, FaNewspaper, FaPhoneAlt, FaBuilding, FaWhatsapp,
  FaEnvelope, FaMapMarkerAlt, FaTags, FaCalendarAlt, FaBookOpen,
  FaHardHat, FaLeaf, FaClipboardCheck, FaUserMd, FaSearch,
  FaFire, FaBolt, FaChalkboardTeacher, FaTools, FaArrowUp,
  FaLayerGroup, FaListUl, FaShieldAlt,
} from 'react-icons/fa'
import { services, iconMap as serviceIconMap } from '../../data/services'
import { posts, blogCategories, categoryStyle } from '../../data/blog'
import { company, getWhatsappUrl } from '../../data/company'
import Reveal from '../../components/Reveal/Reveal'

// ═══════════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════════

const MAX_POSTS_PER_CATEGORY = 4
const TOTAL_RECENT_POSTS = 8

const mainPages = [
  { to: '/', label: 'Home', icon: FaHome, desc: 'Página inicial' },
  { to: '/servicos', label: 'Serviços', icon: FaShieldAlt, desc: 'Todas as soluções' },
  { to: '/blog', label: 'Blog', icon: FaNewspaper, desc: 'Artigos técnicos' },
  { to: '/contato', label: 'Contato', icon: FaPhoneAlt, desc: 'Fale conosco' },
  { to: '/mapa-do-site', label: 'Mapa do Site', icon: FaSitemap, desc: 'Esta página' },
]

const institutionalLinks = [
  { to: '/sobre', label: 'Sobre a AJN', icon: FaBuilding },
  { to: '/contato', label: 'Trabalhe Conosco', icon: FaUserMd },
]

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

export default function SiteMap() {
  // Dados derivados
  const { postsByCategory, recentPosts, whatsappUrl, stats } = useMemo(() => {
    const byCategory = {}
    blogCategories.slice(1).forEach((cat) => {
      byCategory[cat] = posts
        .filter((p) => p.category === cat)
        .slice(0, MAX_POSTS_PER_CATEGORY)
    })

    const recent = [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, TOTAL_RECENT_POSTS)

    return {
      postsByCategory: byCategory,
      recentPosts: recent,
      whatsappUrl: getWhatsappUrl(),
      stats: {
        pages: mainPages.length,
        services: services.length,
        posts: posts.length,
        categories: blogCategories.length - 1,
      },
    }
  }, [])

  // Schema.org SiteNavigationElement + WebPage
  useEffect(() => {
    const siteUrl = company.seo?.siteUrl || 'https://ajnengenharia.com.br'

    document.title = `Mapa do Site | ${company.shortName} — Navegação Completa`

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', 'Mapa do site da AJN Engenharia: encontre todas as páginas, serviços técnicos e artigos do blog em um só lugar.')
    setMeta('name', 'robots', 'noindex, follow') // Mapas de site geralmente são noindex
    setMeta('property', 'og:title', `Mapa do Site | ${company.shortName}`)
    setMeta('property', 'og:url', `${siteUrl}/mapa-do-site`)

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'Mapa do Site',
          url: `${siteUrl}/mapa-do-site`,
          description: 'Navegação completa do site AJN Engenharia',
        },
        {
          '@type': 'ItemList',
          name: 'Navegação do Site',
          itemListElement: [
            ...mainPages.map((p, i) => ({
              '@type': 'SiteNavigationElement',
              position: i + 1,
              name: p.label,
              url: `${siteUrl}${p.to}`,
            })),
            ...services.map((s, i) => ({
              '@type': 'SiteNavigationElement',
              position: mainPages.length + i + 1,
              name: s.shortTitle,
              url: `${siteUrl}/servicos/${s.slug}`,
            })),
          ],
        },
      ],
    }

    let script = document.getElementById('sitemap-schema')
    if (!script) {
      script = document.createElement('script')
      script.id = 'sitemap-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)

    return () => {
      const s = document.getElementById('sitemap-schema')
      if (s) s.remove()
    }
  }, [])

  return (
    <main>
      {/* ══════════ HERO ══════════ */}
      <section
        className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 50%, #44621f 100%)' }}
      >
        <div
          className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-black/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6"
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
              Mapa do Site
            </span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/30">
            <FaSitemap size={12} aria-hidden="true" />
            Navegação completa
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            Mapa do Site
          </h1>

          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Encontre rapidamente todas as páginas, serviços e artigos do site da AJN Engenharia.
          </p>

          {/* Stats rápidos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <HeroStat icon={FaLayerGroup} value={stats.pages} label="Páginas" />
            <HeroStat icon={FaShieldAlt} value={stats.services} label="Serviços" />
            <HeroStat icon={FaBookOpen} value={stats.posts} label="Artigos" />
            <HeroStat icon={FaTags} value={stats.categories} label="Categorias" />
          </div>
        </div>
      </section>

      {/* ══════════ CONTEÚDO PRINCIPAL ══════════ */}
      <section className="py-16 lg:py-20 px-6 bg-[#f5f7fa]" aria-labelledby="sitemap-heading">
        <h2 id="sitemap-heading" className="sr-only">
          Estrutura completa do site
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

          {/* ── COLUNA 1: Navegação + Institucional ── */}
          <Reveal>
            <div className="space-y-6">
              <SiteMapColumn
                icon={FaHome}
                title="Páginas"
                count={mainPages.length}
                accentColor="#3a7d0a"
              >
                <ul className="space-y-1">
                  {mainPages.map((p) => (
                    <SitemapItem key={p.to} to={p.to} icon={p.icon} desc={p.desc}>
                      {p.label}
                    </SitemapItem>
                  ))}
                </ul>
              </SiteMapColumn>

              <SiteMapColumn
                icon={FaBuilding}
                title="Institucional"
                count={institutionalLinks.length}
                accentColor="#2d6208"
              >
                <ul className="space-y-1">
                  {institutionalLinks.map((link) => (
                    <SitemapItem key={link.to} to={link.to} icon={link.icon}>
                      {link.label}
                    </SitemapItem>
                  ))}
                </ul>
              </SiteMapColumn>

              <SiteMapColumn
                icon={FaPhoneAlt}
                title="Contato Rápido"
                accentColor="#1a2e0a"
              >
                <ul className="space-y-2.5">
                  <ContactItem
                    href={whatsappUrl}
                    icon={FaWhatsapp}
                    label={company.whatsappDisplay || company.phone}
                    accent
                    external
                  />
                  <ContactItem
                    href={`mailto:${company.email}`}
                    icon={FaEnvelope}
                    label={company.email}
                    external
                  />
                  <ContactItem
                    href={`https://maps.google.com/?q=${encodeURIComponent(company.address.full)}`}
                    icon={FaMapMarkerAlt}
                    label="Ver no mapa"
                    external
                  />
                </ul>
              </SiteMapColumn>
            </div>
          </Reveal>

          {/* ── COLUNA 2: Serviços ── */}
          <Reveal delay={100}>
            <SiteMapColumn
              icon={FaShieldAlt}
              title="Serviços"
              count={services.length}
              accentColor="#4a9e10"
            >
              <ul className="space-y-1">
                {services.map((s) => {
                  const Icon = serviceIconMap[s.icon] || FaFileAlt
                  return (
                    <SitemapItem
                      key={s.id}
                      to={`/servicos/${s.slug}`}
                      icon={Icon}
                      desc={s.summary}
                      showIcon
                    >
                      {s.shortTitle}
                    </SitemapItem>
                  )
                })}
              </ul>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-2 text-[#3a7d0a] font-bold text-xs hover:gap-3 transition-all"
                >
                  Ver todos os serviços
                  <FaArrowRight size={10} aria-hidden="true" />
                </Link>
              </div>
            </SiteMapColumn>
          </Reveal>

          {/* ── COLUNA 3: Artigos Recentes ── */}
          <Reveal delay={200}>
            <SiteMapColumn
              icon={FaBookOpen}
              title="Artigos Recentes"
              count={recentPosts.length}
              accentColor="#3a7d0a"
            >
              <ul className="space-y-1">
                {recentPosts.map((p) => (
                  <BlogItem key={p.slug} post={p} showDate compact />
                ))}
              </ul>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-[#3a7d0a] font-bold text-xs hover:gap-3 transition-all"
                >
                  Ver todos os artigos
                  <FaArrowRight size={10} aria-hidden="true" />
                </Link>
              </div>
            </SiteMapColumn>
          </Reveal>

          {/* ── COLUNA 4: Categorias do Blog ── */}
          <Reveal delay={300}>
            <SiteMapColumn
              icon={FaTags}
              title="Categorias do Blog"
              count={stats.categories}
              accentColor="#2d6208"
            >
              <div className="space-y-4">
                {blogCategories.slice(1).map((cat) => {
                  const style = categoryStyle[cat]
                  const catPosts = postsByCategory[cat] || []
                  const Icon = serviceIconMap[style?.icon] || FaFileAlt

                  return (
                    <div key={cat} className="group">
                      <Link
                        to={`/blog?categoria=${encodeURIComponent(cat)}`}
                        className="flex items-center gap-2 mb-2 group-hover:gap-3 transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: style
                              ? `linear-gradient(135deg, ${style.from} 0%, ${style.to} 100%)`
                              : '#6b7280',
                          }}
                        >
                          <Icon className="text-white" size={12} aria-hidden="true" />
                        </div>
                        <span className="font-bold text-[#1a2e0a] text-sm group-hover:text-[#3a7d0a] transition-colors flex-1">
                          {cat}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {posts.filter((p) => p.category === cat).length}
                        </span>
                      </Link>

                      {catPosts.length > 0 && (
                        <ul className="space-y-0.5 pl-9">
                          {catPosts.slice(0, 3).map((p) => (
                            <li key={p.slug}>
                              <Link
                                to={`/blog/${p.slug}`}
                                className="text-gray-500 text-xs hover:text-[#3a7d0a] transition-colors line-clamp-1 py-0.5"
                              >
                                {p.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            </SiteMapColumn>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <Reveal>
        <section
          className="py-16 px-6 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2a3f12 0%, #1a2e0a 100%)' }}
          aria-labelledby="sitemap-cta-heading"
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#a4d65e] blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#5cbf1a] blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#a4d65e]/20 flex items-center justify-center">
              <FaWhatsapp className="text-[#a4d65e]" size={24} aria-hidden="true" />
            </div>
            <h2
              id="sitemap-cta-heading"
              className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight"
            >
              Não encontrou o que procurava?
            </h2>
            <p className="text-white/70 text-base mb-7 max-w-xl mx-auto leading-relaxed">
              Nossa equipe está pronta para te ajudar. Fale com um especialista pelo WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com especialista pelo WhatsApp"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Falar com especialista
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTES
// ═══════════════════════════════════════════════════════════════════

/**
 * Stat flutuante do Hero
 */
function HeroStat({ icon: Icon, value, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-center">
      <Icon className="text-[#a4d65e] mx-auto mb-1.5" size={16} aria-hidden="true" />
      <p className="text-white text-xl font-black leading-none mb-0.5">{value}</p>
      <p className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">
        {label}
      </p>
    </div>
  )
}

/**
 * Coluna do mapa do site (card branco)
 */
function SiteMapColumn({ icon: Icon, title, count, children, accentColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)` }}
        >
          <Icon className="text-white" size={17} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[#1a2e0a] font-black text-base leading-tight">{title}</h2>
          {count !== undefined && (
            <p className="text-gray-400 text-xs mt-0.5">
              {count} {count === 1 ? 'item' : 'itens'}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

/**
 * Item genérico de navegação
 */
function SitemapItem({ to, children, icon: Icon, desc, showIcon = false }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-start gap-2.5 text-gray-600 hover:text-[#3a7d0a] text-sm py-1.5 transition-colors focus:outline-none focus-visible:text-[#3a7d0a] focus-visible:underline"
      >
        {showIcon && Icon && (
          <Icon
            className="text-[#a4d65e] mt-0.5 shrink-0 group-hover:text-[#3a7d0a] transition-colors"
            size={13}
            aria-hidden="true"
          />
        )}
        {!showIcon && (
          <FaArrowRight
            size={9}
            className="text-[#a4d65e] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="flex-1 leading-snug">{children}</span>
      </Link>
    </li>
  )
}

/**
 * Item de contato (WhatsApp, email, etc)
 */
function ContactItem({ href, icon: Icon, label, accent = false, external = false }) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`
          group flex items-center gap-3 p-2.5 rounded-lg transition-all
          ${accent
            ? 'bg-[#25D366]/10 hover:bg-[#25D366]/15'
            : 'hover:bg-gray-50'
          }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]
        `}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accent ? 'bg-[#25D366]/20' : 'bg-gray-100 group-hover:bg-[#a4d65e]/20'
            }`}
        >
          <Icon
            className={accent ? 'text-[#25D366]' : 'text-[#3a7d0a]'}
            size={13}
            aria-hidden="true"
          />
        </div>
        <span
          className={`text-xs font-medium truncate flex-1 ${accent ? 'text-[#1a2e0a]' : 'text-gray-700'
            }`}
        >
          {label}
        </span>
        <FaArrowRight
          size={9}
          className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          aria-hidden="true"
        />
      </a>
    </li>
  )
}

/**
 * Item de blog com categoria e data
 */
function BlogItem({ post, showDate = false, compact = false }) {
  const style = categoryStyle[post.category]

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
      })
    } catch {
      return ''
    }
  }

  return (
    <li>
      <Link
        to={`/blog/${post.slug}`}
        className="group flex items-start gap-2 text-gray-600 hover:text-[#3a7d0a] text-sm py-1.5 transition-colors focus:outline-none focus-visible:text-[#3a7d0a] focus-visible:underline"
      >
        <div
          className="w-1 h-1 rounded-full mt-2 shrink-0"
          style={{ backgroundColor: style?.accent || '#4a9e10' }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <p className="leading-snug line-clamp-2">{post.title}</p>
          {showDate && post.date && (
            <p className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
              <FaCalendarAlt size={8} aria-hidden="true" />
              {formatDate(post.date)}
              <span className="mx-0.5">·</span>
              <span
                className="font-semibold"
                style={{ color: style?.accent || '#4a9e10' }}
              >
                {post.category}
              </span>
            </p>
          )}
        </div>
      </Link>
    </li>
  )
}