import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaCalendarAlt, FaClock, FaArrowRight, FaHome, FaChevronRight,
  FaSearch, FaTimes,
} from 'react-icons/fa'
import { posts, blogCategories } from '../../data/blog'
import { company } from '../../data/company'
import { fmtDate } from '../../utils/fmtDate'
import Reveal from '../../components/Reveal/Reveal'


export default function Blog() {
  const [category, setCategory] = useState('Todos')
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')

  // Debounce search input to avoid heavy filtering on each keystroke
  const debounceRef = useRef(null)
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setQuery(searchInput.trim())
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchInput])

  const filtered = posts.filter((p) => {
    const matchCat = category === 'Todos' || p.category === category
    const matchQ = !query || (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main>
      {/* ══════════ HERO ══════════ */}
      <Reveal>
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 50%, #44621f 100%)' }}>
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-black/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
            <Link to="/" className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors">
              <FaHome size={12} /> Home
            </Link>
            <FaChevronRight size={9} />
            <span className="text-[#a4d65e]">Blog</span>
          </div>
          <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" /> Conteúdo técnico
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">Blog AJN Engenharia</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Artigos sobre QSSMA, saúde ocupacional, laudos técnicos, segurança do trabalho e combate a incêndio.
          </p>
          {/* Busca */}
          <div className="max-w-md mx-auto relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar artigo..."
              className="w-full bg-white/95 backdrop-blur-sm rounded-full pl-12 pr-12 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a4d65e]"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        </div>
      </section>
    </Reveal>

{/* ══════════ CONTEÚDO ══════════ */}
      <section className="py-16 px-6 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto">

          {/* Filtro de categorias */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5 mb-12">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    category === cat
                      ? 'bg-[#3a7d0a] text-white shadow-lg shadow-green-900/20'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#a4d65e] hover:text-[#3a7d0a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-20">Nenhum artigo encontrado para essa busca.</p>
          )}

          {/* Destaque */}
          {featured && (
            <Reveal>
              <Link to={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 mb-10 border border-gray-100">
                <div className="relative h-56 sm:h-64 lg:h-full min-h-[200px] sm:min-h-[300px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />
                  <span className="absolute top-4 left-4 bg-white/95 text-xs font-bold px-3 py-1.5 rounded-full text-[#2d6208]">
                    {featured.category}
                  </span>
                  <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white/70 text-xs">
                    <span className="flex items-center gap-1.5"><FaCalendarAlt size={11} /> {fmtDate(featured.date)}</span>
                    <span className="flex items-center gap-1.5"><FaClock size={11} /> {featured.readTime}</span>
          </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-3">★ Em destaque</span>
                  <h2 className="text-2xl lg:text-3xl font-black text-[#1a2e0a] mb-4 leading-snug group-hover:text-[#3a7d0a] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[#3a7d0a] font-bold text-sm group-hover:gap-3 transition-all">
                    Ler artigo completo <FaArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Grade */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {rest.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}
                  className="group relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />
                  <span className="absolute top-4 left-4 bg-white/95 text-xs font-bold px-3 py-1.5 rounded-full text-[#2d6208] z-10">
                    {post.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-4 text-white/60 text-xs mb-2">
                      <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} /> {fmtDate(post.date)}</span>
                      <span className="flex items-center gap-1.5"><FaClock size={10} /> {post.readTime}</span>
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug mb-2 line-clamp-2"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                      {post.title}
                    </h3>
                    <p className="text-white/75 text-xs leading-relaxed line-clamp-2 mb-3"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-xs group-hover:text-white group-hover:gap-3 transition-all">
                      Ler artigo <FaArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 px-6 bg-white text-center border-t border-gray-100">
        <h2 className="text-2xl md:text-3xl font-black text-[#1a2e0a] mb-3">Tem uma dúvida técnica?</h2>
        <p className="text-gray-500 mb-7 max-w-xl mx-auto">
          Nossa equipe de especialistas está pronta para te ajudar pelo WhatsApp.
        </p>
        <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #6aa521 0%, #3a7d0a 100%)' }}>
          <FaWhatsapp size={18} /> Falar pelo WhatsApp
        </a>
      </section>
    </main>
  )
}
