import { useMemo, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope, FaClock,
  FaHome, FaChevronRight, FaArrowRight, FaArrowLeft, FaBookOpen,
  FaHardHat, FaLeaf, FaClipboardCheck, FaFileAlt, FaUserMd,
  FaSearch, FaFire, FaBolt, FaChalkboardTeacher, FaTools,
  FaShieldAlt, FaChartLine, FaAward, FaCertificate, FaIndustry,
  FaBuilding, FaHospital, FaSchool, FaWarehouse, FaBoxOpen,
  FaQuestionCircle, FaChevronDown, FaExclamationTriangle,
  FaInfoCircle, FaLightbulb, FaMapMarkerAlt, FaQuoteLeft,
  FaStar, FaUsers, FaCalendarAlt, FaArrowUp,
} from 'react-icons/fa'
import {
  getServiceBySlug, services, iconMap as serviceIconMap,
  getRelatedServices, getServiceBreadcrumb, generateServiceSchema,
} from '../../data/services'
import {
  company, sanitizePhone, getBusinessStatus, getWhatsappUrl,
} from '../../data/company'
import Reveal from '../../components/Reveal/Reveal'
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress'
import ShareButtons from '../../components/ShareButtons/ShareButtons'

// ═══════════════════════════════════════════════════════════════════
// MAPEAMENTO DE ÍCONES EXPANDIDO
// ═══════════════════════════════════════════════════════════════════

const iconMap = {
  // Ícones de serviços
  FaHardHat, FaLeaf, FaClipboardCheck, FaFileAlt, FaUserMd,
  FaSearch, FaFire, FaBolt, FaChalkboardTeacher, FaTools,
  // Ícones de benefícios / diferenciais
  FaShieldAlt, FaChartLine, FaAward, FaCertificate,
  FaClock, FaCheckCircle, FaUsers, FaCalendarAlt,
  FaIndustry, FaBuilding, FaHospital, FaSchool, FaWarehouse,
  FaBoxOpen, FaQuoteLeft, FaStar,
}

// ═══════════════════════════════════════════════════════════════════
// HELPERS LOCAIS
// ═══════════════════════════════════════════════════════════════════

/**
 * Categoriza normas técnicas para renderização visual
 */
const categorizeNorm = (norm) => {
  const upper = norm.toUpperCase()
  if (upper.startsWith('NR-')) return { type: 'NR', color: 'blue', label: 'Norma Regulamentadora' }
  if (upper.startsWith('NBR')) return { type: 'NBR', color: 'purple', label: 'Norma ABNT' }
  if (upper.startsWith('IT-')) return { type: 'IT', color: 'red', label: 'Instrução Técnica CBMMG' }
  if (upper.startsWith('ISO')) return { type: 'ISO', color: 'teal', label: 'Norma Internacional' }
  if (upper.includes('LEI')) return { type: 'LEI', color: 'orange', label: 'Legislação' }
  if (upper.includes('PMOC')) return { type: 'PMOC', color: 'gray', label: 'Plano de Manutenção' }
  return { type: 'NORMA', color: 'gray', label: 'Norma Técnica' }
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // ── Dados derivados memoizados ──
  const {
    relatedServices,
    breadcrumb,
    whatsappUrl,
    businessStatus,
  } = useMemo(() => {
    if (!service) return {}

    const msg = `Olá! Vi o serviço "${service.title}" no site da AJN e gostaria de um orçamento.`

    return {
      relatedServices: getRelatedServices(service, 3),
      breadcrumb: getServiceBreadcrumb(service),
      whatsappUrl: getWhatsappUrl(msg),
      businessStatus: getBusinessStatus(),
    }
  }, [service])

  // ── Injeção dinâmica de meta tags e Schema.org ──
  useEffect(() => {
    if (!service) return

    const siteUrl = company.seo?.siteUrl || 'https://ajnengenharia.com.br'
    const canonical = `${siteUrl}/servicos/${service.slug}`

    // Title e description
    document.title = service.metaTitle || `${service.title} | ${company.shortName}`

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
    setMeta('name', 'description', service.metaDescription || service.summary)
    setLink('canonical', canonical)

    // Open Graph
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:title', service.metaTitle || service.title)
    setMeta('property', 'og:description', service.metaDescription || service.summary)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', `${siteUrl}/images/servicos/${service.slug}.jpg`)
    setMeta('property', 'og:site_name', company.name)

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', service.title)
    setMeta('name', 'twitter:description', service.summary)

    // Keywords
    if (service.keywords?.length) {
      setMeta('name', 'keywords', service.keywords.join(', '))
    }

    // Schema.org Service
    const serviceSchema = generateServiceSchema(service, siteUrl)

    // Schema.org BreadcrumbList
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${siteUrl}${item.url}`,
      })),
    }

    // Schema.org FAQPage (se o serviço tiver FAQs)
    const faqSchema = service.faq?.length ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    } : null

    // Injeta schemas
    const schemas = [serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean)

    let ldScript = document.getElementById('service-detail-schema')
    if (!ldScript) {
      ldScript = document.createElement('script')
      ldScript.id = 'service-detail-schema'
      ldScript.type = 'application/ld+json'
      document.head.appendChild(ldScript)
    }
    ldScript.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : {
      '@context': 'https://schema.org',
      '@graph': schemas,
    })

    return () => {
      const ld = document.getElementById('service-detail-schema')
      if (ld) ld.remove()
    }
  }, [service, breadcrumb])

  // ── Botão voltar ao topo ──
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Scroll para o topo quando muda de serviço ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  // ── 404 State rico ──
  if (!service) {
    const popularServices = services.slice(0, 3)
    return (
      <main className="pt-28 sm:pt-36 lg:pt-48 pb-20 min-h-screen px-6 bg-[#f5f7fa]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <FaBookOpen size={28} className="text-red-500" aria-hidden="true" />
          </div>
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-3">404</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4">
            Serviço não encontrado
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            O serviço que você procurou pode ter sido removido ou o link está incorreto.
            Confira nossos serviços mais procurados:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {popularServices.map((s) => (
              <Link
                key={s.id}
                to={`/servicos/${s.slug}`}
                className="block bg-white rounded-xl p-4 text-left hover:shadow-md transition-all border border-gray-100"
              >
                <p className="text-xs text-[#3a7d0a] font-bold uppercase mb-2">Serviço</p>
                <p className="text-sm font-bold text-[#1a2e0a] line-clamp-2">{s.shortTitle}</p>
              </Link>
            ))}
          </div>
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 bg-[#3a7d0a] hover:bg-[#2d6208] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            <FaArrowLeft size={12} aria-hidden="true" />
            Ver todos os serviços
          </Link>
        </div>
      </main>
    )
  }

  const Icon = iconMap[service.icon] || FaHardHat

  return (
    <main className="bg-white">
      <ScrollProgress />

      {/* ══════════ HERO BANNER ══════════ */}
      <Reveal>
        <section className="bg-gradient-to-br from-[#1a3a0a] via-[#2d5c1a] to-[#3a7d0a] pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 relative overflow-hidden">
          {/* Elementos decorativos */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-black/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-white/60 text-sm mb-8 flex-wrap"
            >
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <FaChevronRight size={9} aria-hidden="true" />}
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-[#a4d65e] font-semibold" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.url}
                      className="hover:text-[#a4d65e] transition-colors focus:outline-none focus-visible:underline"
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

            {/* Título e descrição */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div
                className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 shadow-xl"
                aria-hidden="true"
              >
                <Icon className="text-[#a4d65e]" size={36} />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-3 bg-[#a4d65e]/10 px-4 py-1.5 rounded-full border border-[#a4d65e]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" aria-hidden="true" />
                  Serviço especializado
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                  {service.title}
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed">
                  {service.summary}
                </p>

                {/* Badges rápidos */}
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  {service.featured && (
                    <span className="inline-flex items-center gap-1.5 bg-[#a4d65e] text-[#1a2e0a] text-xs font-bold px-3 py-1.5 rounded-full">
                      <FaStar size={10} aria-hidden="true" />
                      Mais procurado
                    </span>
                  )}
                  {service.relatedNorms?.slice(0, 3).map((norm, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
                    >
                      <FaCertificate size={10} aria-hidden="true" />
                      {norm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════ CONTEÚDO PRINCIPAL ══════════ */}
      <section className="py-16 lg:py-20 px-6 bg-white" aria-labelledby="service-about-heading">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

          {/* ── Coluna principal ── */}
          <article itemScope itemType="https://schema.org/Service">
            <meta itemProp="name" content={service.title} />
            <meta itemProp="description" content={service.summary} />

            {/* Descrição */}
            <Reveal>
              <div className="mb-12">
                <h2
                  id="service-about-heading"
                  className="text-2xl md:text-3xl font-black text-[#1a2e0a] mb-2 tracking-tight"
                >
                  Sobre este serviço
                </h2>
                <div
                  className="w-14 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-7"
                  aria-hidden="true"
                />
                <div className="prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:text-[17px] prose-headings:text-[#1a2e0a]">
                  {service.description.split('\n\n').map((para, i) => (
                    <p key={i} itemProp="description">{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Benefícios */}
            {service.benefits && service.benefits.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    Por que contratar este serviço
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Benefícios reais para sua empresa
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {service.benefits.map((benefit, i) => {
                      const BenefitIcon = iconMap[benefit.icon] || FaCheckCircle
                      return (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl p-5 border border-green-100"
                        >
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6aa521] to-[#2d6208] flex items-center justify-center mb-3 shadow-md">
                            <BenefitIcon className="text-white" size={18} aria-hidden="true" />
                          </div>
                          <h4 className="font-bold text-[#1a2e0a] text-sm mb-1.5">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            )}

            {/* O que está incluído */}
            {service.items && service.items.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    O que está incluído
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Escopo completo do serviço
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 bg-[#f5f7fa] hover:bg-green-50/60 border border-gray-100 hover:border-[#a4d65e]/50 rounded-xl px-4 py-3 transition-all"
                      >
                        <FaCheckCircle
                          className="text-[#4a9e10] mt-0.5 shrink-0"
                          size={16}
                          aria-hidden="true"
                        />
                        <span className="text-gray-700 text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Entregáveis */}
            {service.deliverables && service.deliverables.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    Entregáveis
                  </h3>
                  <p className="text-gray-500 mb-6">
                    O que você recebe ao final do serviço
                  </p>
                  <div className="bg-gradient-to-br from-[#1a2e0a] to-[#2a3f12] rounded-2xl p-6 md:p-8">
                    <ul className="space-y-3">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#a4d65e] flex items-center justify-center shrink-0 mt-0.5">
                            <FaBoxOpen className="text-[#1a2e0a]" size={12} aria-hidden="true" />
                          </div>
                          <span className="text-white/90 text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )}

            {/* NRs (para treinamentos) */}
            {service.nrs && service.nrs.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    Treinamentos disponíveis
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Cursos com certificação válida em todo o Brasil
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-5 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Norma
                          </th>
                          <th className="text-left px-5 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                            Título
                          </th>
                          <th className="text-center px-5 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Carga
                          </th>
                          <th className="text-center px-5 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                            Reciclagem
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {service.nrs.map((nr, i) => {
                          const isObject = typeof nr === 'object'
                          return (
                            <tr
                              key={i}
                              className="hover:bg-green-50/40 transition-colors"
                            >
                              <td className="px-5 py-3">
                                <span className="inline-flex items-center gap-1.5 font-bold text-[#3a7d0a] text-sm">
                                  <FaCheckCircle size={12} aria-hidden="true" />
                                  {isObject ? nr.nr : nr}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-sm text-gray-700 hidden sm:table-cell">
                                {isObject ? nr.title : ''}
                              </td>
                              <td className="px-5 py-3 text-center text-sm text-gray-600">
                                {isObject ? nr.carga : '—'}
                              </td>
                              <td className="px-5 py-3 text-center text-sm text-gray-600 hidden md:table-cell">
                                {isObject ? nr.reciclagem : '—'}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Normas relacionadas */}
            {service.relatedNorms && service.relatedNorms.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    Normas técnicas aplicáveis
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Serviço 100% alinhado à legislação vigente
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.relatedNorms.map((norm, i) => {
                      const cat = categorizeNorm(norm)
                      const colorMap = {
                        blue: 'bg-blue-50 text-blue-700 border-blue-200',
                        purple: 'bg-purple-50 text-purple-700 border-purple-200',
                        red: 'bg-red-50 text-red-700 border-red-200',
                        teal: 'bg-teal-50 text-teal-700 border-teal-200',
                        orange: 'bg-orange-50 text-orange-700 border-orange-200',
                        gray: 'bg-gray-50 text-gray-700 border-gray-200',
                      }
                      return (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${colorMap[cat.color]}`}
                          title={cat.label}
                        >
                          <FaCertificate size={10} aria-hidden="true" />
                          {norm}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Segmentos atendidos */}
            {service.segments && service.segments.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    Segmentos atendidos
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Expertise em diversos setores da economia
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.segments.map((seg, i) => {
                      const segmentIcons = {
                        industria: FaIndustry,
                        construcao: FaHardHat,
                        comercio: FaBuilding,
                        saude: FaHospital,
                        educacao: FaSchool,
                        logistica: FaWarehouse,
                        residencial: FaHome,
                        servicos: FaBuilding,
                      }
                      const segmentLabels = {
                        industria: 'Indústria',
                        construcao: 'Construção Civil',
                        comercio: 'Comércio',
                        saude: 'Saúde',
                        educacao: 'Educação',
                        logistica: 'Logística',
                        residencial: 'Residencial',
                        servicos: 'Serviços',
                      }
                      const SegIcon = segmentIcons[seg] || FaBuilding
                      return (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 bg-[#f5f7fa] border border-gray-200 text-[#1a2e0a] px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          <SegIcon className="text-[#4a9e10]" size={14} aria-hidden="true" />
                          {segmentLabels[seg] || seg}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            )}

            {/* FAQs específicas do serviço */}
            {service.faq && service.faq.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2e0a] mb-2 tracking-tight">
                    Perguntas frequentes
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Dúvidas comuns sobre {service.shortTitle.toLowerCase()}
                  </p>
                  <div className="space-y-3">
                    {service.faq.map((f, i) => (
                      <ServiceFaqItem key={i} item={f} index={i} />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Compartilhar */}
            <Reveal>
              <div className="pt-8 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Compartilhe este serviço
                </p>
                <ShareButtons
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={service.title}
                />
              </div>
            </Reveal>
          </article>

          {/* ── Sidebar CTA (sticky) ── */}
          <aside className="lg:sticky lg:top-24 space-y-5">
            <Reveal>
              <div
                className="rounded-3xl p-7 shadow-xl text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #2a3f12 0%, #3a5519 60%, #44621f 100%)' }}
              >
                {/* Glow decorativo */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative">
                  <h3 className="text-xl font-black mb-2">Solicite um orçamento</h3>
                  <p className="text-white/70 text-sm mb-6 leading-relaxed">
                    Fale com nossa equipe e receba uma proposta para{' '}
                    <strong className="text-[#a4d65e]">{service.shortTitle}</strong> sem compromisso.
                  </p>

                  {/* Status de atendimento */}
                  <div className="flex items-center gap-2 mb-5 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${businessStatus.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                        }`}
                      aria-hidden="true"
                    />
                    <span className="text-white/90 text-xs font-semibold flex-1">
                      {businessStatus.status}
                    </span>
                    {businessStatus.closesAt && (
                      <span className="text-white/60 text-[11px]">{businessStatus.closesAt}</span>
                    )}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Solicitar orçamento pelo WhatsApp"
                    className="flex items-center justify-center gap-2 bg-[#a4d65e] hover:bg-[#92c44d] text-[#1a2e0a] px-5 py-3.5 rounded-full font-bold text-sm w-full transition-all hover:scale-[1.02] mb-3 shadow-lg"
                  >
                    <FaWhatsapp size={18} aria-hidden="true" />
                    Pedir pelo WhatsApp
                  </a>

                  <a
                    href={`tel:+${sanitizePhone(company.phone)}`}
                    className="flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 hover:bg-white/5 text-white px-5 py-3 rounded-full font-semibold text-sm w-full transition-all"
                  >
                    <FaPhone size={13} aria-hidden="true" />
                    {company.whatsappDisplay || company.phone}
                  </a>

                  <div className="border-t border-white/15 mt-6 pt-5 space-y-3 text-sm">
                    <a
                      href={`mailto:${company.email}?subject=Orçamento: ${encodeURIComponent(service.title)}`}
                      className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors break-all focus:outline-none focus-visible:underline"
                    >
                      <FaEnvelope className="text-[#a4d65e] shrink-0" size={13} aria-hidden="true" />
                      <span className="text-xs">{company.email}</span>
                    </a>
                    <div className="flex items-start gap-2.5 text-white/60">
                      <FaMapMarkerAlt className="text-[#a4d65e] shrink-0 mt-0.5" size={13} aria-hidden="true" />
                      <span className="text-xs leading-relaxed">
                        {company.address.line1}<br />
                        {company.address.line2}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/60">
                      <FaClock className="text-[#a4d65e] shrink-0" size={13} aria-hidden="true" />
                      <span className="text-xs">Seg–Sex 8h–18h · Sáb 8h–12h</span>
                    </div>
                  </div>

                  {/* Prova social */}
                  <div className="mt-6 pt-5 border-t border-white/15">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <p className="text-[#a4d65e] text-xl font-black leading-none mb-1">200+</p>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">Projetos</p>
                      </div>
                      <div>
                        <p className="text-[#a4d65e] text-xl font-black leading-none mb-1">98%</p>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">Satisfação</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Box de garantia */}
            <Reveal delay={100}>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4a9e10] flex items-center justify-center shrink-0">
                    <FaShieldAlt className="text-white" size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2e0a] text-sm mb-1">
                      Garantia técnica
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Todos os serviços com ART registrada no CREA-MG e responsabilidade técnica garantida.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ══════════ SERVIÇOS RELACIONADOS ══════════ */}
      {relatedServices && relatedServices.length > 0 && (
        <Reveal>
          <section className="py-16 lg:py-20 px-6 bg-[#f5f7fa]" aria-labelledby="related-heading">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-3 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
                    Você também pode precisar
                  </span>
                  <h2
                    id="related-heading"
                    className="text-2xl md:text-3xl font-black text-[#1a2e0a] tracking-tight"
                  >
                    Serviços relacionados
                  </h2>
                </div>
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-2 text-[#3a7d0a] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Ver todos os serviços
                  <FaArrowRight size={11} aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((s) => (
                  <RelatedServiceCard key={s.id} service={s} />
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* ══════════ CTA FINAL ══════════ */}
      <Reveal>
        <section
          className="relative py-20 px-6 text-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 100%)' }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#a4d65e] blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#5cbf1a] blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Pronto para começar?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Solicite agora seu orçamento de <strong className="text-[#a4d65e]">{service.shortTitle}</strong> e receba uma proposta em até 48 horas úteis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                Falar com especialista
              </a>
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                Formulário de contato
                <FaArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

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
 * Item de FAQ expansível (accordion)
 */
function ServiceFaqItem({ item, index }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `service-faq-panel-${index}`
  const headingId = `service-faq-heading-${index}`

  return (
    <div
      className={`
        bg-white rounded-2xl border overflow-hidden transition-all duration-300
        ${isOpen ? 'border-[#4a9e10]/30 shadow-md shadow-green-100/50' : 'border-gray-100 shadow-sm'}
      `}
    >
      <button
        id={headingId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`
          w-full flex items-center justify-between gap-4 text-left
          px-6 py-5 transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4a9e10]
          ${isOpen ? 'bg-green-50/40' : 'hover:bg-gray-50'}
        `}
      >
        <span
          className={`
            font-bold text-[15px] transition-colors flex-1
            ${isOpen ? 'text-[#2d6208]' : 'text-[#1a2e0a]'}
          `}
        >
          {item.q}
        </span>
        <div
          className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-300
            ${isOpen ? 'bg-[#4a9e10] text-white rotate-180' : 'bg-gray-100 text-[#4a9e10]'}
          `}
        >
          <FaChevronDown size={13} aria-hidden="true" />
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isOpen}
        className={`
          grid transition-all duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-1 text-gray-600 text-sm leading-relaxed">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Card de serviço relacionado
 */
function RelatedServiceCard({ service }) {
  const Icon = iconMap[service.icon] || FaHardHat
  return (
    <Link
      to={`/servicos/${service.slug}`}
      className="group relative w-full h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4a9e10]/50"
    >
      <img
        src={`/images/servicos/${service.slug}.jpg`}
        alt={service.shortTitle}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/90 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/95 transition-colors duration-500"
        aria-hidden="true"
      />

      {/* Ícone decorativo no topo */}
      <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
        <Icon className="text-white" size={18} aria-hidden="true" />
      </div>

      {/* Conteúdo ancorado embaixo */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3
          className="text-white font-bold text-base leading-snug mb-2 line-clamp-2"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {service.shortTitle}
        </h3>
        <div
          className="w-6 h-0.5 bg-[#5cbf1a] rounded-full mb-3 group-hover:w-10 transition-all duration-300"
          aria-hidden="true"
        />
        <p
          className="text-white/80 text-xs leading-relaxed line-clamp-2 mb-3"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
        >
          {service.summary}
        </p>
        <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-xs group-hover:text-white group-hover:gap-3 transition-all">
          Saiba mais
          <FaArrowRight size={10} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}