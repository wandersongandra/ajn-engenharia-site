import { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FaWhatsapp, FaCalendarAlt, FaClock, FaArrowLeft, FaArrowRight,
  FaHome, FaChevronRight, FaCheckCircle, FaQuoteLeft, FaExclamationTriangle,
  FaInfoCircle, FaLightbulb, FaUser, FaHistory, FaBookOpen, FaArrowUp,
} from 'react-icons/fa'
import {
  getPostBySlug, posts, categoryStyle, authors,
  getRelatedPosts, generatePostSchema, getPostBreadcrumb,
} from '../../data/blog'
import { company, sanitizePhone } from '../../data/company'
import { fmtDate } from '../../utils/fmtDate'
import Reveal from '../../components/Reveal/Reveal'
import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ShareButtons from '../../components/ShareButtons/ShareButtons'
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress'

// ═══════════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════════

const WORDS_PER_MINUTE = 200 // Velocidade média de leitura em português

// ═══════════════════════════════════════════════════════════════════
// HELPERS LOCAIS
// ═══════════════════════════════════════════════════════════════════

/**
 * Calcula tempo de leitura baseado no conteúdo real do artigo
 */
const calculateReadTime = (content) => {
  if (!content) return '5 min'

  const totalWords = content.reduce((acc, block) => {
    if (block.text) acc += block.text.split(/\s+/).length
    if (block.items) acc += block.items.join(' ').split(/\s+/).length
    return acc
  }, 0)

  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE))
  return `${minutes} min`
}

/**
 * Extrai texto puro de blocos (para Schema.org)
 */
const extractPlainText = (content) => {
  return content
    .map((block) => {
      if (block.text) return block.text
      if (block.items) return block.items.join(' ')
      return ''
    })
    .join(' ')
    .replace(/<[^>]*>/g, '') // Remove HTML
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  // Dados derivados memoizados
  const {
    categoryStyleData,
    readTime,
    relatedPosts,
    prevPost,
    nextPost,
    breadcrumb,
    author,
    whatsappUrl,
    plainText,
  } = useMemo(() => {
    if (!post) return {}

    const catStyle = categoryStyle[post.category] || {
      icon: 'FaFileAlt',
      from: '#3a7d0a',
      to: '#235104',
      accent: '#4a9e10',
    }

    const currentIndex = posts.findIndex((p) => p.slug === slug)
    const related = getRelatedPosts(post, 3)

    return {
      categoryStyleData: catStyle,
      readTime: post.readTime || calculateReadTime(post.content),
      relatedPosts: related,
      prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
      nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
      breadcrumb: getPostBreadcrumb(post),
      author: authors[post.author] || authors['equipe-ajn'],
      whatsappUrl: `https://wa.me/${sanitizePhone(company.whatsapp)}?text=${encodeURIComponent(
        `Olá! Li o artigo "${post.title}" no site da AJN e gostaria de mais informações.`
      )}`,
      plainText: extractPlainText(post.content),
    }
  }, [post, slug])

  // ── Injeção dinâmica de meta tags e Schema.org ──
  useEffect(() => {
    if (!post) return

    const siteUrl = company.seo?.siteUrl || 'https://ajnengenharia.com.br'
    const canonical = `${siteUrl}/blog/${post.slug}`
    const image = post.image?.src || post.image
    const imageAbs = image?.startsWith('http') ? image : `${siteUrl}${image}`

    // Title e description
    document.title = post.metaTitle || `${post.title} | ${company.shortName}`

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel, href) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Meta tags básicas
    setMeta('name', 'description', post.metaDescription || post.excerpt)
    setLink('canonical', canonical)

    // Open Graph
    setMeta('property', 'og:type', 'article')
    setMeta('property', 'og:title', post.metaTitle || post.title)
    setMeta('property', 'og:description', post.metaDescription || post.excerpt)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', imageAbs)
    setMeta('property', 'article:published_time', post.date)
    if (post.updatedAt) setMeta('property', 'article:modified_time', post.updatedAt)
    setMeta('property', 'article:author', company.name)
    setMeta('property', 'article:section', post.category)
    post.keywords?.forEach((kw, i) => setMeta('property', `article:tag`, kw))

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', post.title)
    setMeta('name', 'twitter:description', post.excerpt)
    setMeta('name', 'twitter:image', imageAbs)

    // Schema.org BlogPosting
    const schema = generatePostSchema(post, siteUrl)
    let ldScript = document.getElementById('blog-post-schema')
    if (!ldScript) {
      ldScript = document.createElement('script')
      ldScript.id = 'blog-post-schema'
      ldScript.type = 'application/ld+json'
      document.head.appendChild(ldScript)
    }
    ldScript.textContent = JSON.stringify(schema)

    // Cleanup ao desmontar
    return () => {
      const ld = document.getElementById('blog-post-schema')
      if (ld) ld.remove()
    }
  }, [post])

  // ── 404 State ──
  if (!post) {
    const popularPosts = posts.slice(0, 3)
    return (
      <main className="pt-28 sm:pt-36 lg:pt-48 pb-20 min-h-screen px-6 bg-[#f5f7fa]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <FaBookOpen size={28} className="text-red-500" aria-hidden="true" />
          </div>
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-3">404</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4">
            Artigo não encontrado
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            O artigo que você procurou pode ter sido removido ou o link está incorreto.
            Que tal conferir nossos conteúdos mais populares?
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {popularPosts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="block bg-white rounded-xl p-4 text-left hover:shadow-md transition-all border border-gray-100"
              >
                <p className="text-xs text-[#3a7d0a] font-bold uppercase mb-2">{p.category}</p>
                <p className="text-sm font-bold text-[#1a2e0a] line-clamp-2">{p.title}</p>
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#3a7d0a] hover:bg-[#2d6208] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            <FaArrowLeft size={12} aria-hidden="true" />
            Voltar para o Blog
          </Link>
        </div>
      </main>
    )
  }

  const s = categoryStyleData

  return (
    <main className="bg-white">
      <ScrollProgress />

      {/* ══════════ HERO ══════════ */}
      <Reveal>
        <section
          className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-6 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${s.from} 0%, ${s.to} 100%)` }}
        >
          {/* Ícone decorativo de fundo */}
          <div
            className="absolute right-0 bottom-0 text-white/[0.07] pointer-events-none"
            aria-hidden="true"
            style={{ fontSize: '340px', lineHeight: 1 }}
          >
            {/* Renderiza o ícone via componente */}
          </div>
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-white/70 text-sm mb-6 flex-wrap"
            >
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <FaChevronRight size={9} aria-hidden="true" />}
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-white font-semibold" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.url}
                      className="hover:text-white transition-colors focus:outline-none focus-visible:underline"
                    >
                      {i === 0 ? (
                        <span className="flex items-center gap-1.5">
                          <FaHome size={12} aria-hidden="true" />
                          {item.name}
                        </span>
                      ) : (
                        item.name
                      )}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            {/* Badge de categoria */}
            <span
              className="inline-block bg-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 shadow-sm"
              style={{ color: s.to }}
            >
              {post.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Metadata do artigo */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/80 text-sm flex-wrap">
              <span className="flex items-center gap-2">
                <FaCalendarAlt size={12} aria-hidden="true" />
                <time dateTime={post.date}>{fmtDate(post.date)}</time>
              </span>
              <span className="w-px h-4 bg-white/30 hidden sm:block" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <FaClock size={12} aria-hidden="true" />
                {readTime} de leitura
              </span>
              {author && (
                <>
                  <span className="w-px h-4 bg-white/30 hidden sm:block" aria-hidden="true" />
                  <span className="flex items-center gap-2">
                    <FaUser size={12} aria-hidden="true" />
                    {author.name}
                  </span>
                </>
              )}
            </div>

            {/* Data de atualização (SEO freshness) */}
            {post.updatedAt && post.updatedAt !== post.date && (
              <p className="mt-4 text-white/60 text-xs flex items-center justify-center gap-1.5">
                <FaHistory size={10} aria-hidden="true" />
                Atualizado em {fmtDate(post.updatedAt)}
              </p>
            )}
          </div>
        </section>
      </Reveal>

      {/* ══════════ CORPO DO ARTIGO ══════════ */}
      <section className="py-12 lg:py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Artigo principal */}
          <Reveal>
            <article
              className="max-w-3xl mx-auto lg:mx-0"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Link voltar (mobile friendly) */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#3a7d0a] font-semibold text-sm mb-8 hover:gap-3 transition-all focus:outline-none focus-visible:underline"
              >
                <FaArrowLeft size={12} aria-hidden="true" />
                Voltar para o Blog
              </Link>

              {/* Excerpt / Introdução */}
              <p className="text-xl text-gray-700 leading-relaxed mb-10 pb-10 border-b border-gray-100 font-medium">
                {post.excerpt}
              </p>

              {/* Corpo do artigo com suporte a múltiplos tipos de bloco */}
              <div className="space-y-6 prose prose-lg max-w-none prose-headings:text-[#1a2e0a] prose-p:text-gray-700 prose-p:leading-[1.8] prose-a:text-[#3a7d0a] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1a2e0a]">
                {post.content.map((block, i) => (
                  <ArticleBlock key={i} block={block} index={i} />
                ))}
              </div>

              {/* Tags / Keywords */}
              {post.keywords && post.keywords.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Tags relacionadas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="bg-green-50 text-[#3a7d0a] text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Box do autor */}
              {author && (
                <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full bg-[#3a7d0a] flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Escrito por
                    </p>
                    <p className="font-bold text-[#1a2e0a] mb-1">{author.name}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                  </div>
                </div>
              )}

              {/* CTA WhatsApp */}
              <div
                className="mt-12 rounded-3xl p-8 text-center"
                style={{ background: 'linear-gradient(135deg, #2a3f12 0%, #44621f 100%)' }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <FaWhatsapp size={24} className="text-[#a4d65e]" aria-hidden="true" />
                </div>
                <h3 className="text-white font-black text-xl mb-2">
                  Precisa de ajuda com {post.category.toLowerCase()}?
                </h3>
                <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
                  Fale com os especialistas da AJN e receba uma orientação personalizada sobre
                  este tema.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar com especialista sobre este artigo pelo WhatsApp"
                  className="inline-flex items-center gap-2 bg-[#a4d65e] hover:bg-[#92c44d] text-[#1a2e0a] px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <FaWhatsapp size={18} aria-hidden="true" />
                  Falar pelo WhatsApp
                </a>
              </div>

              {/* Compartilhar */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Compartilhe este artigo
                </p>
                <ShareButtons
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={post.title}
                />
              </div>
            </article>
          </Reveal>

          {/* Sidebar com Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={post.content} />

              {/* Box informativo */}
              <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                <p className="text-xs font-bold text-[#3a7d0a] uppercase tracking-wider mb-2">
                  Sobre a AJN
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {company.shortDescription}
                </p>
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-1.5 text-[#3a7d0a] font-semibold text-sm hover:gap-2.5 transition-all"
                >
                  Nossos serviços
                  <FaArrowRight size={10} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════ NAVEGAÇÃO PREV/NEXT ══════════ */}
      {(prevPost || nextPost) && (
        <section className="py-12 px-6 bg-[#f5f7fa] border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Post anterior */}
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#a4d65e] hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
                  aria-label={`Artigo anterior: ${prevPost.title}`}
                >
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <FaArrowLeft size={10} aria-hidden="true" />
                    Artigo anterior
                  </span>
                  <p className="text-xs text-[#3a7d0a] font-bold uppercase mb-1">
                    {prevPost.category}
                  </p>
                  <p className="font-bold text-[#1a2e0a] group-hover:text-[#3a7d0a] transition-colors line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {/* Próximo post */}
              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#a4d65e] hover:shadow-md transition-all text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
                  aria-label={`Próximo artigo: ${nextPost.title}`}
                >
                  <span className="flex items-center justify-end gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Próximo artigo
                    <FaArrowRight size={10} aria-hidden="true" />
                  </span>
                  <p className="text-xs text-[#3a7d0a] font-bold uppercase mb-1">
                    {nextPost.category}
                  </p>
                  <p className="font-bold text-[#1a2e0a] group-hover:text-[#3a7d0a] transition-colors line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ RELACIONADOS ══════════ */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Reveal>
          <section className="py-16 px-6 bg-[#f5f7fa]" aria-labelledby="related-heading">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 id="related-heading" className="text-2xl md:text-3xl font-black text-[#1a2e0a]">
                  Leia também
                </h2>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-2 text-[#3a7d0a] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Ver todos
                  <FaArrowRight size={11} aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group relative w-full h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2"
                  >
                    <img
                      src={p.image?.src || p.image}
                      alt={p.image?.alt || p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-[#2d6208] z-10 shadow-sm">
                      {p.category}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3
                        className="text-white font-bold text-base leading-snug mb-2 line-clamp-2"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                      >
                        {p.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-xs group-hover:text-white group-hover:gap-3 transition-all">
                        Ler artigo
                        <FaArrowRight size={10} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Botão voltar ao topo (aparece ao rolar) */}
      <BackToTopButton />
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTES
// ═══════════════════════════════════════════════════════════════════

/**
 * Renderiza um bloco de conteúdo do artigo
 */
function ArticleBlock({ block, index }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={`toc-${index}`}
          className="text-2xl md:text-3xl font-black text-[#1a2e0a] pt-6 flex items-center gap-3 scroll-mt-24"
        >
          <span className="w-1.5 h-7 bg-[#6aa521] rounded-full" aria-hidden="true" />
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3 className="text-xl font-bold text-[#1a2e0a] pt-4">
          {block.text}
        </h3>
      )

    case 'ul':
      return (
        <ul className="space-y-3 pl-1 not-prose">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <FaCheckCircle
                className="text-[#4a9e10] mt-1 shrink-0"
                size={16}
                aria-hidden="true"
              />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="space-y-3 pl-1 not-prose">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-[#3a7d0a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      )

    case 'callout':
      const calloutStyles = {
        info: {
          icon: FaInfoCircle,
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          text: 'text-blue-900',
          iconColor: 'text-blue-600',
        },
        warning: {
          icon: FaExclamationTriangle,
          bg: 'bg-amber-50',
          border: 'border-amber-500',
          text: 'text-amber-900',
          iconColor: 'text-amber-600',
        },
        success: {
          icon: FaCheckCircle,
          bg: 'bg-green-50',
          border: 'border-[#4a9e10]',
          text: 'text-green-900',
          iconColor: 'text-[#4a9e10]',
        },
        tip: {
          icon: FaLightbulb,
          bg: 'bg-purple-50',
          border: 'border-purple-500',
          text: 'text-purple-900',
          iconColor: 'text-purple-600',
        },
      }
      const style = calloutStyles[block.variant] || calloutStyles.info
      const Icon = style.icon

      return (
        <div
          className={`my-8 p-5 rounded-xl border-l-4 ${style.bg} ${style.border} not-prose`}
          role="note"
        >
          <div className="flex items-start gap-3">
            <Icon className={`${style.iconColor} mt-0.5 shrink-0`} size={20} aria-hidden="true" />
            <div>
              {block.title && (
                <p className={`font-bold ${style.text} mb-1`}>{block.title}</p>
              )}
              <p
                className={`${style.text} leading-relaxed text-sm`}
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            </div>
          </div>
        </div>
      )

    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-[#4a9e10] bg-green-50/50 py-4 pr-4 rounded-r-xl not-prose">
          <FaQuoteLeft
            className="text-[#4a9e10] mb-2"
            size={20}
            aria-hidden="true"
          />
          <p className="text-lg text-gray-800 italic leading-relaxed mb-2">
            "{block.text}"
          </p>
          {block.author && (
            <cite className="block text-sm not-italic text-gray-600 font-semibold">
              — {block.author}
            </cite>
          )}
        </blockquote>
      )

    case 'cta':
      return (
        <div className="my-8 text-center not-prose">
          <Link
            to={block.href}
            className="inline-flex items-center gap-2 bg-[#3a7d0a] hover:bg-[#2d6208] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2"
          >
            {block.text}
            <FaArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      )

    case 'image':
      return (
        <figure className="my-8 not-prose">
          <img
            src={block.src}
            alt={block.alt || ''}
            loading="lazy"
            className="w-full rounded-2xl shadow-md"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'p':
    default:
      return (
        <p
          className="text-gray-700 leading-[1.8] text-[17px]"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      )
  }
}

/**
 * Botão voltar ao topo
 */
function BackToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#3a7d0a] hover:bg-[#2d6208] text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <FaArrowUp size={16} aria-hidden="true" />
    </button>
  )
}