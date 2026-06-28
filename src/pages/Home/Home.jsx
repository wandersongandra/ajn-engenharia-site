import { Link } from 'react-router-dom'
import {
  FaShieldAlt, FaLeaf, FaLightbulb, FaUsers,
  FaHardHat, FaFire, FaBolt, FaClipboardCheck,
  FaBullseye, FaEye, FaGem,
} from 'react-icons/fa'
import Typewriter from '../../components/Typewriter/Typewriter'
import VideoBackground from '../../components/VideoBackground/VideoBackground'
import ImageBackground from '../../components/ImageBackground/ImageBackground'
import Reveal from '../../components/Reveal/Reveal'

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

const highlights = [
  { icon: FaHardHat,       label: 'Segurança do Trabalho', bg: 'from-blue-700 to-blue-900' },
  { icon: FaFire,          label: 'Combate a Incêndio',    bg: 'from-red-600 to-red-900' },
  { icon: FaBolt,          label: 'Projetos Elétricos',    bg: 'from-yellow-500 to-orange-700' },
  { icon: FaClipboardCheck,label: 'Gestão QSSMA',          bg: 'from-green-600 to-green-900' },
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
      <ImageBackground>
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
          <Typewriter texts={['AJN Consultoria e Engenharia']} typeSpeed={70} deleteSpeed={30} pauseAfter={2500} />
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#5cbf1a] to-[#4a9e10] rounded-full mx-auto mb-6" />
        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-4">
          <Typewriter texts={[company.description]} typeSpeed={50} deleteSpeed={20} pauseAfter={3000} />
        </p>
        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          <Typewriter texts={['Realizamos perícias de insalubridade e periculosidade, emissão de laudos técnicos (NR-12), projetos de combate a incêndio (PPCI) com emissão de AVCB/CLCB junto ao Corpo de Bombeiros de Minas Gerais.']} typeSpeed={50} deleteSpeed={20} pauseAfter={3000} />
        </p>
      </ImageBackground>

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
              bg: '#6e8a4d',
            },
            {
              icon: FaEye,
              label: 'Nossa Visão',
              text: company.vision,
              bg: '#5d7740',
            },
            {
              icon: FaGem,
              label: 'Nossos Valores',
              text: 'Mantemos uma comunicação aberta e transparente, prazos rigorosamente cumpridos e soluções customizadas para atender às necessidades específicas de cada cliente. Oferecemos soluções eficazes, inovadoras e sustentáveis para o seu negócio.',
              bg: '#6e8a4d',
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

    </main>
  )
}
