import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FaShieldAlt, FaLeaf, FaMicrochip, FaHandshake,
  FaBalanceScale, FaRocket, FaArrowRight, FaArrowUp,
  FaHardHat, FaBullseye, FaEye, FaGem,
  FaSearch, FaFileAlt, FaHeadset, FaWhatsapp,
  FaCheckCircle, FaCertificate, FaMapMarkerAlt, FaTrophy,
  FaUsers, FaCalendarAlt, FaSmile, FaBuilding,
  FaPhone, FaPlay, FaQuoteLeft,
} from 'react-icons/fa'
import Typewriter from '../../components/Typewriter/Typewriter'
import VideoBackground from '../../components/VideoBackground/VideoBackground'
import ImageBackground from '../../components/ImageBackground/ImageBackground'
import Reveal from '../../components/Reveal/Reveal'
import Faq from '../../components/Faq/Faq'
import TiltCard from '../../components/TiltCard/TiltCard'

import {
  company, clientLogos, getWhatsappUrl, getBusinessStatus,
  getOrganizationSchema, sanitizePhone,
} from '../../data/company'
import { services, getFeaturedServices } from '../../data/services'

// ═══════════════════════════════════════════════════════════════════
// CONSTANTES E DADOS
// ═══════════════════════════════════════════════════════════════════

const taglines = [
  'Especialistas em Engenharia de Segurança do Trabalho e QSSMA.',
  'Projetos elétricos, combate a incêndio e laudos técnicos.',
  'Consultoria personalizada para sua empresa ficar em conformidade.',
  'Soluções completas em segurança, meio ambiente e engenharia.',
]

const processSteps = [
  { n: '01', icon: FaSearch, title: 'Diagnóstico', desc: 'Visitamos sua empresa, avaliamos os riscos e mapeamos as obrigações legais aplicáveis.' },
  { n: '02', icon: FaFileAlt, title: 'Proposta', desc: 'Apresentamos um plano sob medida, com escopo, prazos e valores claros — sem surpresas.' },
  { n: '03', icon: FaHardHat, title: 'Execução', desc: 'Implementamos programas, laudos, projetos e treinamentos com equipe técnica habilitada.' },
  { n: '04', icon: FaHeadset, title: 'Acompanhamento', desc: 'Monitoramos prazos, atualizamos documentos e damos suporte contínuo à sua equipe.' },
]

const differentials = [
  { icon: FaShieldAlt,    title: 'Expertise Técnica Certificada', desc: 'Profissionais certificados com atuação comprovada em projetos de alta complexidade, garantindo conformidade total com as NRs.' },
  { icon: FaLeaf,         title: 'Gestão Ambiental Estratégica',  desc: 'Práticas sustentáveis integradas às soluções, reduzindo impactos e fortalecendo sua conformidade perante órgãos fiscalizadores.' },
  { icon: FaMicrochip,    title: 'Inovação Tecnológica Aplicada', desc: 'Ferramentas digitais e metodologias modernas que garantem diagnósticos precisos, laudos ágeis e eliminação de retrabalhos.' },
  { icon: FaHandshake,    title: 'Atendimento Consultivo Premium', desc: 'Engenheiros seniores dedicados que atuam como parceiros estratégicos, entendendo as necessidades do seu negócio.' },
  { icon: FaBalanceScale, title: 'Conformidade Legal Garantida',  desc: 'Projetos e laudos 100% alinhados às NRs e à legislação vigente, protegendo sua empresa contra passivos e autuações.' },
  { icon: FaRocket,       title: 'Agilidade na Implantação',      desc: 'Processos otimizados e equipe mobilizada para entregar soluções completas no menor prazo, sem abrir mão da qualidade.' },
]

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook para animação de contagem numérica (IntersectionObserver)
 */
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted, startOnView])

  useEffect(() => {
    if (!hasStarted) return

    // Extrai o número do final (ex: "200+" → 200)
    const numericEnd = parseInt(String(end).replace(/\D/g, ''), 10) || 0
    const suffix = String(end).replace(/[\d]/g, '')

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.floor(eased * numericEnd)
      setCount(current)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(numericEnd)
      }
    }
    requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  const suffix = String(end).replace(/[\d]/g, '')
  return { ref, value: `${count}${suffix}` }
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const businessStatus = useMemo(() => getBusinessStatus(), [])
  const featuredServices = useMemo(() => getFeaturedServices(6), [])
  const whatsappUrl = useMemo(() => getWhatsappUrl(), [])

  // Schema.org Organization
  useEffect(() => {
    const schema = getOrganizationSchema()
    let script = document.getElementById('home-organization-schema')
    if (!script) {
      script = document.createElement('script')
      script.id = 'home-organization-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
    return () => {
      const s = document.getElementById('home-organization-schema')
      if (s) s.remove()
    }
  }, [])

  // Botão voltar ao topo
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Soluções (featured + fallback para todos)
  const heroStats = [
    { value: company.foundingYear ? `${new Date().getFullYear() - company.foundingYear}+` : '15+', label: 'Anos de equipe', icon: 'FaCheckCircle' },
    { value: '200+', label: 'Projetos', icon: 'FaTrophy' },
    { value: '50+', label: 'Empresas', icon: 'FaUsers' },
  ];
  const solutions = useMemo(() => {
    return (featuredServices.length > 0 ? featuredServices : services.slice(0, 6)).map((s) => ({
      slug: s.slug,
      title: s.shortTitle,
      summary: s.summary,
      image: `/images/servicos/${s.slug}.jpg`,
      icon: s.icon,
    }))
  }, [featuredServices])

  return (
    <main>
      {/* ══════════════════════════════════════
          HERO — vídeo + typewriter + stats flutuantes
      ══════════════════════════════════════ */}
      <section className="relative">
        <VideoBackground>
          <div className="max-w-4xl">
            <h1
              className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] min-h-[8rem] max-w-3xl mb-6"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 6px 24px rgba(0,0,0,0.8)' }}
            >
              <Typewriter texts={taglines} typeSpeed={50} deleteSpeed={25} pauseAfter={2500} />
            </h1>

            <p
              className="text-white/85 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              {company.shortDescription}
            </p>

            {/* CTAs principais */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-900/40"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                Falar com especialista
              </a>
              <Link
                to="/servicos"
                className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                <FaPlay size={12} aria-hidden="true" />
                Ver soluções
              </Link>
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* ══════════════════════════════════════
          QUEM SOMOS — Premium v2
      ══════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1804 0%, #1a2e0a 50%, #2a4212 100%)' }}
        aria-labelledby="about-heading"
      >
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#a4d65e]/6 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#4a9e10]/5 blur-3xl pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(164,214,94,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Coluna de texto */}
          <Reveal>
            <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
              <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-[0.25em] mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" aria-hidden="true" />
                Quem Somos
              </span>

              <h2
                id="about-heading"
                className="text-white text-3xl sm:text-4xl font-black mb-3 leading-tight tracking-tight"
              >
                AJN Consultoria <span className="text-[#a4d65e]">e Engenharia</span>
              </h2>

              <p className="text-white/70 text-base sm:text-lg font-medium mb-5 leading-snug">
                Engenharia que protege pessoas, operações e o meio ambiente.
              </p>

              <div className="w-16 h-1 bg-gradient-to-r from-[#5cbf1a] to-[#a4d65e] rounded-full mb-6" aria-hidden="true" />

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-7">
                {company.description.split('.')[0]}.
              </p>

              {/* Mini-stats em linha */}
<div className="grid grid-cols-3 gap-4 mb-7 pt-6 border-t border-white/10">
  {heroStats.map((stat, i) => (
    <StatCard key={stat.label} stat={stat} index={i} />
  ))}
</div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/servicos"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6aa521] to-[#3a7d0a] text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-900/30"
                >
                  Conheça nossas soluções
                  <FaArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/contato"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm transition-all"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Coluna de imagem */}
          <Reveal delay={150}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl ring-1 ring-white/15">
              <ImageBackground />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
              <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5">
                <span className="w-2 h-2 rounded-full bg-[#a4d65e]" aria-hidden="true" />
                <span className="text-white text-[11px] font-bold tracking-wide">
                  EQUIPE TÉCNICA CERTIFICADA
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CLIENTES QUE CONFIAM NO NOSSO TRABALHO
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#f5f7fa]" aria-labelledby="clients-heading">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col items-center text-center mb-10 md:mb-16">
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
              Prova Social
            </span>
            <h2
              id="clients-heading"
              className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4 max-w-2xl mx-auto tracking-tight"
            >
              Empresas que confiam no nosso trabalho
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl">
              Parcerias de longa duração com indústrias, construtoras e empresas de serviços em todo o estado.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#4a9e10] to-[#5cbf1a] rounded-full mt-6" aria-hidden="true" />
          </Reveal>
        </div>

        {/* Carrossel infinito */}
        <div className="marquee-mask overflow-hidden py-6">
          <div className="marquee-track gap-10 items-center px-4">
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={i}
                className="shrink-0 w-64 h-32 flex items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <img
                  src={logo.src || logo}
                  alt={logo.name || logo.alt || `Cliente ${i + 1} da AJN Engenharia`}
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSÃO / VISÃO / VALORES
      ══════════════════════════════════════ */}
      <section aria-labelledby="mvv-heading">
        <h2 id="mvv-heading" className="sr-only">
          Missão, Visão e Valores da AJN Engenharia
        </h2>
        <div className="grid md:grid-cols-3">
          {[
            {
              icon: FaBullseye,
              label: 'Nossa Missão',
              text: company.mission,
              bg: '#3a7d0a',
            },
            {
              icon: FaEye,
              label: 'Nossa Visão',
              text: company.vision,
              bg: '#2d6208',
            },
            {
              icon: FaGem,
              label: 'Nossos Valores',
              text: 'Comunicação aberta e transparente. Prazos rigorosamente cumpridos. Soluções customizadas, eficazes, inovadoras e sustentáveis para o seu negócio.',
              bg: '#3a7d0a',
            },
          ].map((col, i) => (
            <Reveal key={col.label} delay={i * 100}>
              <div
                className="relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[320px] md:min-h-[460px] px-6 md:px-10 py-14 md:py-24 lg:py-28"
                style={{ backgroundColor: col.bg }}
              >
                <col.icon
                  className="absolute -bottom-10 right-6 text-black/10 pointer-events-none"
                  size={200}
                  aria-hidden="true"
                />
                <div className="relative">
                  <h3 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-wide mb-8">
                    {col.label}
                  </h3>
                  <p className="text-white/90 text-base lg:text-[17px] leading-loose max-w-md mx-auto">
                    {col.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          NOSSAS SOLUÇÕES
      ══════════════════════════════════════ */}
      <section className="bg-white overflow-hidden py-16 md:py-28" aria-labelledby="solutions-heading">
        <Reveal className="max-w-7xl mx-auto px-8 lg:px-10 mb-16">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-[0.3em] mb-2">
            Conheça as
          </p>
          <h2
            id="solutions-heading"
            className="text-4xl md:text-5xl font-black text-[#1a2e0a] tracking-tight"
          >
            Nossas Soluções
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl">
            Serviços técnicos integrados de QSSMA, engenharia e combate a incêndio.
          </p>
        </Reveal>

        <div className="cards-viewport overflow-hidden">
          <div className="cards-track gap-6 px-4">
            {[...solutions, ...solutions].map((sol, i) => (
              <Link
                key={`${sol.slug}-${i}`}
                to={`/servicos/${sol.slug}`}
                className="group relative shrink-0 w-[260px] h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4a9e10]/50"
              >
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/5 group-hover:from-[#1a2e0a]/95 group-hover:via-[#2d6208]/55 group-hover:to-transparent transition-colors duration-500" aria-hidden="true" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <h3
                    className="text-white font-bold text-[15px] leading-snug mb-2.5"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                  >
                    {sol.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#5cbf1a] rounded-full mx-auto mb-3 group-hover:w-12 transition-all duration-300" aria-hidden="true" />
                  <p
                    className="text-white/80 text-xs leading-relaxed mb-4 line-clamp-3"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                  >
                    {sol.summary}
                  </p>
                  <span className="inline-flex items-center justify-center border border-white/60 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2 rounded-full group-hover:bg-white group-hover:text-[#2d6208] group-hover:border-white transition-all duration-300">
                    Saiba mais
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-10 mt-12 text-center">
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 bg-[#3a7d0a] hover:bg-[#2d6208] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-xl"
          >
            Ver todos os serviços
            <FaArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DIFERENCIAIS — Premium
      ══════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1804 0%, #16280a 55%, #1f3310 100%)' }}
        aria-labelledby="differentials-heading"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#a4d65e]/[0.07] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#4a9e10]/[0.06] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(164,214,94,0.5) 1px, transparent 0)', backgroundSize: '38px 38px' }} />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-14 lg:mb-16">
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-[0.25em] mb-5 bg-green-50/80 px-5 py-2.5 rounded-full border border-green-200/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
              Por que nos escolher
            </span>
            <h2
              id="differentials-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a2e0a] mb-4 leading-tight tracking-tight"
            >
              Nossos Diferenciais
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
              Seis razões pelas quais empresas de todos os portes confiam na AJN.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mt-6" aria-hidden="true" />
          </Reveal>

        </div>

        {/* Carrossel contínuo — desliza sozinho e pausa no hover */}
        <div className="relative cards-viewport overflow-hidden mt-2">
          <div className="cards-track gap-6 px-4 py-4">
            {[...differentials, ...differentials].map((d, i) => {
              const n = (i % differentials.length) + 1
              return (
                <div key={i} className="shrink-0 w-[300px]">
                  <TiltCard className="group h-full" max={9}>
                    <div
                      className="relative h-full bg-white rounded-2xl p-7 lg:p-8 border border-gray-100 group-hover:border-[#a4d65e]/50 shadow-sm group-hover:shadow-2xl group-hover:shadow-green-900/15 transition-shadow duration-500 overflow-hidden"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Número de fundo */}
                      <span
                        className="absolute top-3 right-5 text-6xl font-black text-gray-50 group-hover:text-green-100/70 transition-colors leading-none select-none pointer-events-none"
                        aria-hidden="true"
                      >
                        {String(n).padStart(2, '0')}
                      </span>
                      {/* Barra de destaque */}
                      <span
                        className="absolute top-0 left-7 h-1 w-10 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-b-full group-hover:w-[calc(100%-3.5rem)] transition-all duration-500"
                        aria-hidden="true"
                      />

                      {/* Ícone com profundidade 3D (translateZ) */}
                      <div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-green-900/20 group-hover:shadow-green-900/30 transition-all duration-500"
                        style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)', transform: 'translateZ(45px)' }}
                      >
                        <d.icon className="text-white" size={24} aria-hidden="true" />
                        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" aria-hidden="true" />
                      </div>

                      <h3
                        className="relative text-[#1a2e0a] font-black text-lg lg:text-xl mb-3 leading-snug group-hover:text-[#3a7d0a] transition-colors duration-300"
                        style={{ transform: 'translateZ(25px)' }}
                      >
                        {d.title}
                      </h3>
                      <p className="relative text-gray-500 text-sm leading-relaxed" style={{ transform: 'translateZ(15px)' }}>
                        {d.desc}
                      </p>
                    </div>
                  </TiltCard>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMO TRABALHAMOS
      ══════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6 bg-[#f6f8fa]" aria-labelledby="process-heading">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
              Nosso Processo
            </span>
            <h2
              id="process-heading"
              className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4 tracking-tight"
            >
              Como Trabalhamos
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-4" aria-hidden="true" />
            <p className="text-gray-500 text-base md:text-lg max-w-2xl">
              Um método simples e transparente, do primeiro contato ao acompanhamento contínuo.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 relative">
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#a4d65e]/40 via-[#4a9e10]/70 to-[#a4d65e]/40 z-0"
              aria-hidden="true"
            />

            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={(i % 4) * 120}>
                <div className="group relative z-10 text-center">
                  <div className="relative mx-auto mb-6 w-20 h-20">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#a4d65e] flex items-center justify-center overflow-hidden shadow-lg shadow-green-900/5 transition-all duration-300 group-hover:border-transparent group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-green-900/25">
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}
                        aria-hidden="true"
                      />
                      <step.icon
                        className="relative z-10 text-[#3a7d0a] group-hover:text-white transition-colors duration-300"
                        size={28}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#1a2e0a] text-white text-xs font-black flex items-center justify-center shadow-md ring-2 ring-white group-hover:bg-[#a4d65e] group-hover:text-[#1a2e0a] transition-colors duration-300">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-[#1a2e0a] font-black text-lg mb-2 group-hover:text-[#3a7d0a] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <Faq />

      {/* ══════════════════════════════════════
          CTA FINAL DE CONVERSÃO
      ══════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 px-6 overflow-hidden text-center"
        style={{ background: 'linear-gradient(135deg, #2a3f12 0%, #1a2e0a 100%)' }}
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#a4d65e] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#5cbf1a] blur-3xl" />
        </div>

        <Reveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#a4d65e]/20 flex items-center justify-center">
              <FaWhatsapp className="text-[#a4d65e]" size={28} aria-hidden="true" />
            </div>
            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
            >
              Pronto para proteger sua empresa?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Fale com um especialista agora. Orçamento gratuito e resposta em até 15 minutos em horário comercial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-900/40"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                Falar com especialista
              </a>
              <a
                href={`tel:+${sanitizePhone(company.phone)}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                <FaPhone size={14} aria-hidden="true" />
                {company.whatsappDisplay || company.phone}
              </a>
            </div>
            <p className="text-white/50 text-xs mt-6 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-[#a4d65e]" size={12} aria-hidden="true" />
              Orçamento gratuito · Sem compromisso · Atendimento em toda MG
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          BOTÃO VOLTAR AO TOPO
      ══════════════════════════════════════ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo da página"
        className={`
          fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full
          bg-[#3a7d0a] hover:bg-[#2d6208] text-white
          shadow-lg shadow-green-900/30
          flex items-center justify-center
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3a7d0a]
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
 * Stat do Hero (flutuante sobre o vídeo)
 */
function HeroStat({ stat, delay }) {
  return (
    <div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[#a4d65e] text-2xl sm:text-3xl font-black leading-none mb-1">
        {stat.value}
      </p>
      <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
        {stat.label}
      </p>
    </div>
  )
}

/**
 * Card de estatística com animação de contagem
 */
function StatCard({ stat, index }) {
  const { ref, value } = useCountUp(stat.value, 2000, true)

  const iconMap = {
    FaCheckCircle,
    FaCalendarAlt,
    FaSmile,
    FaBuilding,
    FaTrophy,
    FaUsers,
  }

  const Icon = iconMap[stat.icon] || FaTrophy

  return (
    <Reveal delay={index * 100}>
      <div
        ref={ref}
        className="group relative bg-gradient-to-br from-white to-[#f9fafb] rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-[#a4d65e]/30 hover:shadow-xl hover:shadow-green-900/10 transition-all duration-500 hover:-translate-y-1 text-center"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6aa521] to-[#2d6208] flex items-center justify-center shadow-lg shadow-green-900/15 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
          <Icon className="text-white" size={22} aria-hidden="true" />
        </div>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a2e0a] mb-2 tracking-tight">
          {value}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          {stat.label}
        </p>
      </div>
    </Reveal>
  )
}