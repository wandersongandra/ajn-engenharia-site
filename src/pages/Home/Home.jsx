import { Link } from 'react-router-dom'
import {
  FaShieldAlt, FaLeaf, FaLightbulb, FaUsers,
  FaHardHat, FaBullseye, FaEye, FaGem, FaArrowRight,
  FaSearch, FaFileAlt, FaHeadset,
} from 'react-icons/fa'
import Typewriter from '../../components/Typewriter/Typewriter'
import VideoBackground from '../../components/VideoBackground/VideoBackground'
import ImageBackground from '../../components/ImageBackground/ImageBackground'
import Reveal from '../../components/Reveal/Reveal'
import Faq from '../../components/Faq/Faq'

import { company, clientLogos } from '../../data/company'
import { services } from '../../data/services'



const taglines = [
  'Especialistas em Engenharia de Segurança do Trabalho e QSSMA.',
  'Projetos elétricos, combate a incêndio e laudos técnicos.',
  'Consultoria personalizada para sua empresa ficar em conformidade.',
  'Soluções completas em segurança, meio ambiente e engenharia.',
]

const differentials = [
  { icon: FaShieldAlt, title: 'Equipe Qualificada',        desc: 'Profissionais experientes e certificados em todas as áreas de QSSMA.' },
  { icon: FaLeaf,      title: 'Comprometimento Ambiental', desc: 'Práticas sustentáveis integradas a todas as nossas soluções.' },
  { icon: FaLightbulb, title: 'Inovação Tecnológica',      desc: 'Uso de tecnologias avançadas para garantir eficiência e precisão.' },
  { icon: FaUsers,     title: 'Atendimento Personalizado', desc: 'Envolvimento próximo com o cliente — cada projeto tratado com dedicação.' },
]

const processSteps = [
  { n: '01', icon: FaSearch,  title: 'Diagnóstico',      desc: 'Visitamos sua empresa, avaliamos os riscos e mapeamos as obrigações legais aplicáveis.' },
  { n: '02', icon: FaFileAlt, title: 'Proposta',         desc: 'Apresentamos um plano sob medida, com escopo, prazos e valores claros — sem surpresas.' },
  { n: '03', icon: FaHardHat, title: 'Execução',         desc: 'Implementamos programas, laudos, projetos e treinamentos com equipe técnica habilitada.' },
  { n: '04', icon: FaHeadset, title: 'Acompanhamento',   desc: 'Monitoramos prazos, atualizamos documentos e damos suporte contínuo à sua equipe.' },
]

// Cards de soluções — cada foto fica em public/images/servicos/{slug}.jpg
const solutions = services.map((s) => ({
  slug: s.slug,
  title: s.shortTitle,
  summary: s.summary,
  image: `/images/servicos/${s.slug}.jpg`,
}))

export default function Home() {
  return (
    <main>

      {/* ══════════════════════════════════════
          HERO — vídeo + typewriter
      ══════════════════════════════════════ */}
      <VideoBackground>
        <p
          className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight min-h-[6rem] max-w-3xl"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 6px 24px rgba(0,0,0,0.8)' }}
        >
          <Typewriter texts={taglines} typeSpeed={50} deleteSpeed={25} pauseAfter={2500} />
        </p>
      </VideoBackground>

      {/* ══════════════════════════════════════
          QUEM SOMOS — fotos + texto centralizado
      ══════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 55%, #44621f 100%)' }}>
        {/* brilhos decorativos */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#a4d65e]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-black/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Card de vidro (texto) */}
          <Reveal>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-7 sm:p-9 shadow-2xl">
              <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-4 bg-[#a4d65e]/15 px-4 py-2 rounded-full border border-[#a4d65e]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" /> Quem Somos
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-black mb-4 leading-tight">
                AJN Consultoria <span className="text-[#a4d65e]">e Engenharia</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#5cbf1a] to-[#a4d65e] rounded-full mb-6" />
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-5">
                {company.description}
              </p>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8">
                Realizamos perícias de insalubridade e periculosidade, laudos técnicos (NR-12) e projetos de combate a incêndio (PPCI) com emissão de AVCB/CLCB junto ao Corpo de Bombeiros de MG.
              </p>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #6aa521 0%, #3a7d0a 100%)' }}
              >
                Conheça nossos serviços <FaArrowRight size={13} />
              </Link>
            </div>
          </Reveal>

          {/* Quadro de fotos alternando */}
          <Reveal delay={150}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl ring-1 ring-white/15">
              <ImageBackground />
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════
           CLIENTES QUE CONFIAM NO NOSSO TRABALHO
       ══════════════════════════════════════ */}
      <section className="py-16 md:py-36 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col items-center text-center mb-10 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-[#3a7d0a] mb-4 max-w-2xl mx-auto">
              Clientes que confiam no nosso trabalho
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#4a9e10] to-[#5cbf1a] rounded-full" />
          </Reveal>
        </div>

        {/* Carrossel infinito de logos em cards brancos */}
        <div className="marquee-mask overflow-hidden py-6">
          <div className="marquee-track gap-10 items-center px-4">
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-64 h-32 flex items-center justify-center p-6 animate-fade-in-up"
                style={{ animationDelay: `${(i % clientLogos.length) * 150}ms` }}
              >
                <img
                  src={src}
                  alt="Cliente AJN"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSÃO / VISÃO / VALORES
      ══════════════════════════════════════ */}
      <section>
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
              text: 'Mantemos uma comunicação aberta e transparente, prazos rigorosamente cumpridos e soluções customizadas para atender às necessidades específicas de cada cliente. Oferecemos soluções eficazes, inovadoras e sustentáveis para o seu negócio.',
              bg: '#3a7d0a',
            },
          ].map((col) => (
            <div
              key={col.label}
              className="relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[320px] md:min-h-[460px] px-6 md:px-10 py-14 md:py-24 lg:py-28"
              style={{ backgroundColor: col.bg }}
            >
              {/* Ícone marca d'água */}
              <col.icon
                className="absolute -bottom-10 right-6 text-black/10 pointer-events-none"
                size={200}
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
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          NOSSAS SOLUÇÕES — carrossel de serviços
      ══════════════════════════════════════ */}
      <section className="bg-white overflow-hidden py-16 md:py-28">
        <Reveal className="max-w-7xl mx-auto px-8 lg:px-10 mb-16">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-[0.3em] mb-2">
            Conheça as
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#4a8c0a]">
            Nossas Soluções
          </h2>
        </Reveal>

        {/* Carrossel contínuo — duplicamos os cards p/ loop infinito */}
        <div className="cards-viewport marquee-mask overflow-hidden">
          <div className="cards-track gap-6 px-4">
            {[...solutions, ...solutions].map((sol, i) => (
              <Link
                key={`${sol.slug}-${i}`}
                to={`/servicos/${sol.slug}`}
                className="group relative shrink-0 w-[220px] h-[340px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Foto de fundo */}
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />

                {/* Conteúdo */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-5">
                  <h3 className="text-white font-bold text-base leading-snug mb-3"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {sol.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#5cbf1a] rounded-full mb-3 group-hover:w-12 transition-all duration-300" />
                  <p className="text-white/85 text-xs leading-relaxed"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                    {sol.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center border border-white/70 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full group-hover:bg-white group-hover:text-[#2d6208] group-hover:border-white transition-all duration-300">
                    Saiba mais
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DIFERENCIAIS
      ══════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" /> Por que nos escolher
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4">Nossos Diferenciais</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={(i % 4) * 100}>
                <div className="group relative h-full bg-white rounded-3xl p-7 border border-gray-100 hover:border-[#a4d65e] shadow-sm hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-2 transition-all duration-300 text-center overflow-hidden">
                  {/* barra de destaque no topo */}
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-10 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-b-full group-hover:w-full transition-all duration-500" />
                  {/* número marca d'água */}
                  <span className="absolute top-3 right-5 text-5xl font-black text-gray-50 group-hover:text-green-100 transition-colors select-none leading-none pointer-events-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-900/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}>
                    <d.icon className="text-white" size={26} />
                    <span className="absolute inset-0 rounded-2xl ring-2 ring-[#a4d65e]/0 group-hover:ring-[#a4d65e]/50 group-hover:scale-125 transition-all duration-300" />
                  </div>
                  <h3 className="relative text-[#1a2e0a] font-black text-lg mb-2">{d.title}</h3>
                  <p className="relative text-gray-500 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMO TRABALHAMOS
      ══════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" /> Nosso Processo
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a2e0a] mb-4">Como Trabalhamos</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-4" />
            <p className="text-gray-500 text-base md:text-lg max-w-2xl">
              Um método simples e transparente, do primeiro contato ao acompanhamento contínuo.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 relative">
            {/* linha conectora com seta de fluxo (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#a4d65e]/40 via-[#4a9e10]/70 to-[#a4d65e]/40 z-0" />

            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={(i % 4) * 120}>
                <div className="group relative z-10 text-center">
                  {/* círculo */}
                  <div className="relative mx-auto mb-6 w-20 h-20">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#a4d65e] flex items-center justify-center overflow-hidden shadow-lg shadow-green-900/5 transition-all duration-300 group-hover:border-transparent group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-green-900/25">
                      {/* preenchimento no hover */}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }} />
                      <step.icon className="relative z-10 text-[#3a7d0a] group-hover:text-white transition-colors duration-300" size={28} />
                    </div>
                    {/* badge do número */}
                    <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#1a2e0a] text-white text-xs font-black flex items-center justify-center shadow-md ring-2 ring-white group-hover:bg-[#a4d65e] group-hover:text-[#1a2e0a] transition-colors duration-300">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-[#1a2e0a] font-black text-lg mb-2 group-hover:text-[#3a7d0a] transition-colors">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
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

    </main>
  )
}
