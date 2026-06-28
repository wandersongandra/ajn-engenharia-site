import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaCalendarAlt, FaClock, FaArrowRight, FaHome, FaChevronRight,
  FaSearch, FaTimes, FaBookOpen, FaTag, FaUser, FaFilter, FaFrown,
} from 'react-icons/fa'
import {
  posts, blogCategories, categoryStyle,
  getPostsByCategory, searchPosts, getFeaturedPosts, getBlogStats,
} from '../../data/blog'
import { company, sanitizePhone } from '../../data/company'
import { fmtDate } from '../../utils/fmtDate'
import Reveal from '../../components/Reveal/Reveal'

const POSTS_PER_PAGE = 6

export default function Blog() {
  const [category, setCategory] = useState('Todos')
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const searchInputRef = useRef(null)

  // Debounce da busca (300ms)
  const debounceRef = useRef(null)
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const trimmed = searchInput.trim()
      setQuery(trimmed)
      // Reset da paginação quando a busca muda
      setVisibleCount(POSTS_PER_PAGE)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchInput])

  // Reset da paginação quando a categoria muda
  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE)
  }, [category])

  // Memoiza estatísticas do blog
  const stats = useMemo(() => getBlogStats(), [])

  // Filtragem e busca inteligente usando os helpers do módulo
  const filtered = useMemo(() => {
    // Se há query de busca, usa o scoring avançado
    if (query) {
      const searchResults = searchPosts(query, 50)
      // Aplica filtro de categoria sobre os resultados da busca
      return category === 'Todos'
        ? searchResults
        : searchResults.filter((p) => p.category === category)
    }
    // Sem query: usa o helper de categoria (já ordena por data)
    return getPostsByCategory(category)
  }, [query, category])

  // Separa o post em destaque (prioriza flag `featured`)
  const featured = useMemo(() => {
    if (filtered.length === 0) return null
    // Se há busca ativa, pega o primeiro resultado
    if (query) return filtered[0]
    // Senão, tenta pegar um post com flag `featured: true`
    const featuredPost = filtered.find((p) => p.featured)
    return featuredPost || filtered[0]
  }, [filtered, query])

  // Posts do grid (exclui o destaque)
  const gridPosts = useMemo(() => {
    const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered
    return rest.slice(0, visibleCount)
  }, [filtered, featured, visibleCount])

  const hasMore = gridPosts.length < (filtered.length - (featured ? 1 : 0))

  // Atalho de teclado: "/" foca na busca
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchInput('')
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const whatsappUrl = useMemo(
    () => `https://wa.me/${sanitizePhone(company.whatsapp)}?text=${encodeURIComponent(company.whatsappMessage)}`,
    []
  )

  // Schema.org CollectionPage + BlogPosting
  const blogSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: 'Blog AJN Engenharia',
    description: 'Artigos técnicos sobre QSSMA, saúde ocupacional, laudos técnicos, segurança do trabalho e combate a incêndio.',
    url: `${company.seo?.siteUrl || 'https://ajnengenharia.com.br'}/blog`,
    publisher: {
      '@type': 'Organization',
      name: company.name,
      logo: {
        '@type': 'ImageObject',
        url: `${company.seo?.siteUrl || 'https://ajnengenharia.com.br'}/logo.png`,
      },
    },
    blogPost: filtered.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image?.src || post.image,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      url: `${company.seo?.siteUrl || 'https://ajnengenharia.com.br'}/blog/${post.slug}`,
      author: {
        '@type': 'Organization',
        name: company.name,
      },
    })),
  }), [filtered])

  return (
    <main>
      {/* Schema.org para Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* ══════════ HERO ══════════ */}
      <Reveal>
        <section
          className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 50%, #44621f 100%)' }}
        >
          {/* Brilhos decorativos */}
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
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
              <Link
                to="/"
                className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors focus:outline-none focus-visible:text-[#a4d65e]"
              >
                <FaHome size={12} aria-hidden="true" />
                <span>Home</span>
              </Link>
              <FaChevronRight size={9} aria-hidden="true" />
              <span className="text-[#a4d65e] font-semibold" aria-current="page">Blog</span>
            </nav>

            <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" aria-hidden="true" />
              Conteúdo técnico
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
              Blog AJN Engenharia
            </h1>

            <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              Artigos sobre QSSMA, saúde ocupacional, laudos técnicos, segurança do trabalho e combate a incêndio.
            </p>

            {/* Contador de artigos */}
            <p className="text-white/50 text-sm mb-8">
              <FaBookOpen size={12} className="inline mr-1.5" aria-hidden="true" />
              {stats.total} artigos publicados • Atualizado em {fmtDate(new Date(stats.lastUpdated).toISOString().split('T')[0])}
            </p>

            {/* Busca */}
            <div className="max-w-md mx-auto relative">
              <label htmlFor="blog-search" className="sr-only">Buscar artigos</label>
              <FaSearch
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={15}
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                id="blog-search"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar artigo... (pressione /)"
                className="w-full bg-white/95 backdrop-blur-sm rounded-full pl-12 pr-20 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] shadow-lg"
                autoComplete="off"
              />
              {searchInput ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('')
                    searchInputRef.current?.focus()
                  }}
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
              <p className="mt-4 text-white/70 text-sm">
                {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'} para "
                <span className="text-[#a4d65e] font-semibold">{query}</span>"
              </p>
            )}
          </div>
        </section>
      </Reveal>

      {/* ══════════ CONTEÚDO ══════════ */}
      <section className="py-16 px-6 bg-[#f5f7fa]" aria-labelledby="blog-articles-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="blog-articles-heading" className="sr-only">
            Artigos do blog
          </h2>

          {/* Filtro de categorias */}
          <Reveal>
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
                <FaFilter size={12} aria-hidden="true" />
                <span>Filtrar por categoria</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Categorias do blog">
                {blogCategories.map((cat) => {
                  const count = cat === 'Todos' ? stats.total : (stats.categories[cat] || 0)
                  const isActive = category === cat
                  return (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCategory(cat)}
                      className={`
                        px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2
                        ${isActive
                          ? 'bg-[#3a7d0a] text-white shadow-lg shadow-green-900/20'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-[#a4d65e] hover:text-[#3a7d0a]'
                        }
                      `}
                    >
                      {cat}
                      <span className={`ml-1.5 text-xs ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        ({count})
                      </span>
                    </button>
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
                  Nenhum artigo encontrado
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Não encontramos artigos para {query ? `"${query}"` : `a categoria "${category}"`}.
                  Tente buscar por outros termos ou explore todas as categorias.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {query && (
                    <button
                      onClick={() => {
                        setSearchInput('')
                        searchInputRef.current?.focus()
                      }}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      Limpar busca
                    </button>
                  )}
                  <button
                    onClick={() => setCategory('Todos')}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[#3a7d0a] text-white hover:bg-[#2d6208] transition-colors"
                  >
                    Ver todos os artigos
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {/* Destaque */}
          {featured && (
            <Reveal>
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className="group mb-10"
              >
                <Link
                  to={`/blog/${featured.slug}`}
                  className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 sm:h-64 lg:h-full min-h-[280px] overflow-hidden">
                    <img
                      src={featured.image?.src || featured.image}
                      alt={featured.image?.alt || featured.title}
                      loading="eager"
                      fetchPriority="high"
                      itemProp="image"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />

                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-[#2d6208] shadow-sm">
                      {featured.category}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80 text-xs">
                      <div className="flex items-center gap-4">
                        <time
                          className="flex items-center gap-1.5"
                          dateTime={featured.date}
                          itemProp="datePublished"
                        >
                          <FaCalendarAlt size={11} aria-hidden="true" />
                          {fmtDate(featured.date)}
                        </time>
                        <span className="flex items-center gap-1.5">
                          <FaClock size={11} aria-hidden="true" />
                          {featured.readTime}
                        </span>
                      </div>
                      {featured.difficulty && (
                        <span className="hidden sm:inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold">
                          <FaTag size={8} aria-hidden="true" />
                          {featured.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3a7d0a]" aria-hidden="true" />
                      Em destaque
                    </span>

                    <h2
                      className="text-2xl lg:text-3xl font-black text-[#1a2e0a] mb-4 leading-snug group-hover:text-[#3a7d0a] transition-colors"
                      itemProp="headline"
                    >
                      {featured.title}
                    </h2>

                    <p
                      className="text-gray-600 leading-relaxed mb-6"
                      itemProp="description"
                    >
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FaUser size={11} aria-hidden="true" />
                        <span itemProp="author">{company.shortName}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[#3a7d0a] font-bold text-sm group-hover:gap-3 transition-all">
                        Ler artigo completo
                        <FaArrowRight size={12} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          )}

          {/* Grid de posts */}
          {gridPosts.length > 0 && (
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {gridPosts.map((post) => (
                  <article
                    key={post.slug}
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    className="group"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="relative block w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2"
                    >
                      <img
                        src={post.image?.src || post.image}
                        alt={post.image?.alt || post.title}
                        loading="lazy"
                        itemProp="image"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />

                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-[#2d6208] z-10 shadow-sm">
                        {post.category}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="flex items-center gap-4 text-white/70 text-xs mb-2">
                          <time
                            className="flex items-center gap-1.5"
                            dateTime={post.date}
                            itemProp="datePublished"
                          >
                            <FaCalendarAlt size={10} aria-hidden="true" />
                            {fmtDate(post.date)}
                          </time>
                          <span className="flex items-center gap-1.5">
                            <FaClock size={10} aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3
                          className="text-white font-bold text-base leading-snug mb-2 line-clamp-2"
                          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                          itemProp="headline"
                        >
                          {post.title}
                        </h3>

                        <p
                          className="text-white/80 text-xs leading-relaxed line-clamp-2 mb-3"
                          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                          itemProp="description"
                        >
                          {post.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-xs group-hover:text-white group-hover:gap-3 transition-all">
                          Ler artigo
                          <FaArrowRight size={10} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Botão "Carregar mais" */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-[#3a7d0a] hover:text-[#3a7d0a] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
                  >
                    Carregar mais artigos
                    <FaArrowRight size={12} aria-hidden="true" />
                  </button>
                  <p className="text-gray-400 text-xs mt-3">
                    Mostrando {gridPosts.length} de {filtered.length - (featured ? 1 : 0)} artigos
                  </p>
                </div>
              )}
            </Reveal>
          )}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <Reveal>
        <section className="py-16 px-6 bg-white text-center border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
              <FaWhatsapp size={28} className="text-[#25D366]" aria-hidden="true" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1a2e0a] mb-3">
              Tem uma dúvida técnica?
            </h2>
            <p className="text-gray-600 mb-7 max-w-xl mx-auto leading-relaxed">
              Nossa equipe de engenheiros e especialistas está pronta para te ajudar.
              Atendimento rápido e personalizado pelo WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com especialista pelo WhatsApp"
              className="inline-flex items-center gap-2.5 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #6aa521 0%, #3a7d0a 100%)' }}
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
            <p className="text-gray-400 text-xs mt-4">
              Resposta em até 15 minutos em horário comercial
            </p>
          </div>
        </section>
      </Reveal>
    </main>
  )
}