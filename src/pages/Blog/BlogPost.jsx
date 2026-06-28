import { useParams, Link } from 'react-router-dom'

import {
  FaWhatsapp, FaCalendarAlt, FaClock, FaArrowLeft, FaArrowRight,
  FaHome, FaChevronRight, FaCheckCircle,
  FaFileAlt, FaUserMd, FaHardHat, FaFire, FaLaptopCode,
} from 'react-icons/fa'
import { getPostBySlug, posts, categoryStyle } from '../../data/blog'
import { company } from '../../data/company'
import { fmtDate } from '../../utils/fmtDate'
import Reveal from '../../components/Reveal/Reveal'
import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ShareButtons from '../../components/ShareButtons/ShareButtons'
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress'

const iconMap = { FaFileAlt, FaUserMd, FaHardHat, FaFire, FaLaptopCode }


export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const url = window.location.href

  if (!post) {
    return (
      <main className="pt-28 sm:pt-36 lg:pt-48 pb-20 min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a2e0a] mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-[#3a7d0a] font-semibold hover:underline">← Voltar para o Blog</Link>
        </div>
      </main>
    )
  }

  const s = categoryStyle[post.category] || { icon: 'FaFileAlt', from: '#3a7d0a', to: '#235104' }
  const HeroIcon = iconMap[s.icon] || FaFileAlt
  const suggestions =
    posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3).length
      ? posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
       : posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const currentIndex = posts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  return (
    <main>
      <ScrollProgress />
      {/* ══════════ HERO ══════════ */}
      <Reveal>
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-6 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${s.from} 0%, ${s.to} 100%)` }}>
        <HeroIcon className="absolute right-0 bottom-0 text-white/[0.07] pointer-events-none" size={340} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaHome size={12} /> Home
            </Link>
            <FaChevronRight size={9} />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <FaChevronRight size={9} />
            <span className="text-white">{post.category}</span>
          </div>
          <span className="inline-block bg-white text-xs font-bold px-4 py-1.5 rounded-full mb-5" style={{ color: s.to }}>
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2"><FaCalendarAlt size={12} /> {fmtDate(post.date)}</span>
            <span className="flex items-center gap-2"><FaClock size={12} /> {post.readTime} de leitura</span>
          </div>
        </div>
      </section>
    </Reveal>

      {/* ══════════ CORPO ══════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <Reveal>
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#3a7d0a] font-semibold text-sm mb-10 hover:gap-3 transition-all">
            <FaArrowLeft size={12} /> Voltar para o Blog
          </Link>

          <p className="text-xl text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100 font-medium">
            {post.excerpt}
          </p>

          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2 key={i} id={`toc-${i}`} className="text-2xl font-black text-[#1a2e0a] pt-4 flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-[#6aa521] rounded-full" />
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="space-y-3 pl-1">
                    {block.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <FaCheckCircle className="text-[#4a9e10] mt-1 shrink-0" size={15} />
                        <span className="text-gray-600 leading-relaxed">{it}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              return <p key={i} className="text-gray-600 leading-[1.8] text-[17px]">{block.text}</p>
            })}
          </div>

          {post.keywords && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.keywords.map((kw) => (
                <span key={kw} className="bg-green-50 text-[#3a7d0a] text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #2a3f12 0%, #44621f 100%)' }}>
            <h3 className="text-white font-black text-xl mb-2">Precisa de ajuda com {post.category.toLowerCase()}?</h3>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Fale com os especialistas da AJN e receba uma orientação personalizada.
            </p>
            <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Olá! Li o artigo "${post.title}" e gostaria de mais informações.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#a4d65e] hover:bg-[#92c44d] text-[#1a2e0a] px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105">
              <FaWhatsapp size={18} /> Falar pelo WhatsApp
            </a>
          </div>
            <ShareButtons url={url} title={post.title} />
        </article>
          <aside className="hidden lg:block w-64">
            <TableOfContents content={post.content} />
          </aside>
        </Reveal>
        </div>
      </section>

      {/* ══════════ RELACIONADOS ══════════ */}
      {suggestions.length > 0 && (
        <Reveal>
          <section className="py-16 px-6 bg-[#f5f7fa]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-black text-[#1a2e0a] mb-8">Leia também</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {suggestions.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`}
                    className="group relative w-full h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />
                    <span className="absolute top-3 left-3 bg-white/95 text-xs font-bold px-3 py-1 rounded-full text-[#2d6208] z-10">
                      {p.category}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {p.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-xs group-hover:text-white group-hover:gap-3 transition-all">
                        Ler artigo <FaArrowRight size={10} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

          {/* Navegação Prev/Next */}
          <div className="flex justify-between max-w-6xl mx-auto py-8">
            {prevPost && (
              <Link to={`/blog/${prevPost.slug}`} className="flex items-center gap-2 text-[#3a7d0a] font-semibold">
                <FaArrowLeft size={12} /> {prevPost.title}
              </Link>
            )}
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="flex items-center gap-2 text-[#3a7d0a] font-semibold">
                {nextPost.title} <FaArrowRight size={12} />
              </Link>
            )}
          </div>
    </main>
  )
}
