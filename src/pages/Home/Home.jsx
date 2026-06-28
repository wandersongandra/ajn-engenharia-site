import { Link } from 'react-router-dom'
import {
  FaShieldAlt, FaLeaf, FaMicrochip, FaHandshake,
  FaBalanceScale, FaRocket,
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
  { icon: FaShieldAlt,   title: 'Expertise Técnica Certificada',     desc: 'Profissionais certificados com atuação comprovada em projetos de alta complexidade, garantindo conformidade total com as NRs e redução de riscos operacionais.' },
  { icon: FaLeaf,        title: 'Gestão Ambiental Estratégica',      desc: 'Práticas sustentáveis integradas às soluções, reduzindo impactos ambientais e fortalecendo sua conformidade perante órgãos fiscalizadores.' },
  { icon: FaMicrochip,   title: 'Inovação Tecnológica Aplicada',     desc: 'Ferramentas digitais e metodologias modernas que garantem diagnósticos precisos, laudos ágeis e eliminação de retrabalhos.' },
  { icon: FaHandshake,   title: 'Atendimento Consultivo Premium',    desc: 'Engenheiros seniores dedicados que atuam como parceiros estratégicos, compreendendo as necessidades específicas do seu negócio.' },
  { icon: FaBalanceScale,title: 'Conformidade Legal Garantida',      desc: 'Projetos e laudos 100% alinhados às NRs e legislação vigente, protegendo sua empresa contra passivos trabalhistas e autuações.' },
  { icon: FaRocket,      title: 'Agilidade na Implantação',          desc: 'Processos otimizados e equipe mobilizada para entregar soluções completas no menor prazo, sem comprometer a qualidade técnica.' },
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
          QUEM SOMOS — Premium v2
      ══════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1804 0%, #1a2e0a 50%, #2a4212 100%)' }}>
        {/* Glow orbs — iluminação ambiente dramática */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#a4d65e]/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#4a9e10]/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(164,214,94,0.4) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Coluna de texto */}
          <Reveal>
            <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
              <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-[0.25em] mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/20 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" /> Quem Somos
              </span>

              {/* Value headline — propósito da empresa */}
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-snug">
                Engenharia que protege pessoas, operações e o meio ambiente.
              </p>

              {/* Brand name */}
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black mb-2 leading-tight tracking-tight">
                AJN Consultoria <span className="text-[#a4d65e]">e Engenharia</span>
              </h2>

              <p className="text-[#a4d65e]/80 text-sm sm:text-base font-semibold mb-5">
                {company.slogan}
              </p>

              <div className="w-16 h-1 bg-gradient-to-r from-[#5cbf1a] to-[#a4d65e] rounded-full mb-6" />

              {/* Descrição — versão concisa (primeira frase) */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                {company.description.split('.')[0]}.
              </p>

              {/* Stats / Indicadores de credibilidade */}
              <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/[0.04] rounded-2xl p-4 mb-7 border border-white/[0.03]">
                {[
                  { label: 'CREA',     sub: 'Registro Profissional Ativo' },
                  { label: 'MG',       sub: 'Atendimento em Todo o Estado' },
                  { label: 'QSSMA',    sub: 'Especialização Técnica Completa' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center px-2">
                    <p className="text-[#a4d65e] text-lg lg:text-xl font-black">{stat.label}</p>
                    <p className="text-white/40 text-[11px] leading-tight mt-0.5 tracking-wide">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Pilares de atuação */}
              <div className="space-y-2.5 mb-7">
                {[
                  'Perícias de insalubridade, laudos NR-12 e projetos de combate a incêndio',
                  'Emissão de AVCB/CLCB com engenheiros certificados e registrados no CREA',
                  'Soluções completas em QSSMA com suporte técnico e acompanhamento contínuo',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e] mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA principal */}
              <Link
                to="/servicos"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#6aa521] to-[#3a7d0a] text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-900/30 active:scale-100"
              >
                Conheça nossas soluções
                <FaArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Coluna de imagem — carrossel com proporção editorial */}
          <Reveal delay={150}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl ring-1 ring-white/15">
              <ImageBackground />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              {/* Badge flutuante */}
              <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5">
                <span className="w-2 h-2 rounded-full bg-[#a4d65e]" />
                <span className="text-white text-[11px] font-bold tracking-wide">EQUIPE TÉCNICA CERTIFICADA</span>
              </div>
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
          DIFERENCIAIS — Premium
      ══════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden bg-[#f6f8fa]">
        {/* Background — luz ambiente sutil */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#4a9e10]/[0.03] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#a4d65e]/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-14 lg:mb-16">
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-[0.25em] mb-5 bg-green-50/80 px-5 py-2.5 rounded-full border border-green-200/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" /> Por que nos escolher
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a2e0a] mb-4 leading-tight tracking-tight">
              Nossos Diferenciais
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
              Seis razões pelas quais empresas de todos os portes confiam na AJN.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mt-6" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={(i % 6) * 80}>
                <div className="group relative h-full bg-white rounded-2xl p-7 lg:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-1.5 transition-all duration-500 ease-out">
                  {/* Barra lateral decorativa (hover) */}
                  <span className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#4a9e10] to-[#a4d65e] rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Ícone */}
                  <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-green-900/15 group-hover:shadow-green-900/25 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500"
                    style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}>
                    <d.icon className="text-white" size={22} />
                    <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
                  </div>

                  {/* Conteúdo */}
                  <h3 className="text-[#1a2e0a] font-black text-lg lg:text-xl mb-3 leading-snug group-hover:text-[#3a7d0a] transition-colors duration-300">
                    {d.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {d.desc}
                  </p>
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
