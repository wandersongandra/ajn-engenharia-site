import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Reveal from '../../components/Reveal/Reveal'
import { services } from '../../data/services'
import { company } from '../../data/company'
import { FaWhatsapp } from 'react-icons/fa'

export default function Services() {
  return (
    <main>
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#1a3a0a] via-[#2d5c1a] to-[#3a7d0a] pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #5cbf1a 0%, transparent 60%), radial-gradient(circle at 75% 50%, #5cbf1a 0%, transparent 60%)' }} />
        <span className="relative inline-block text-[#5cbf1a] text-xs font-bold uppercase tracking-widest mb-4 border border-[#5cbf1a]/40 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
          O que oferecemos
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Nossos Serviços</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Soluções completas em QSSMA, combate a incêndio, projetos elétricos e laudos técnicos para sua empresa.
        </p>
      </section>

      {/* Grid de serviços com fotos */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            tag="Todos os serviços"
            title="Como podemos ajudar?"
            subtitle="Selecione um serviço para conhecer mais detalhes sobre como a AJN pode atender sua empresa."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 100}>
              <Link
                to={`/servicos/${service.slug}`}
                className="group relative block w-full h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={`/images/servicos/${service.slug}.jpg`}
                  alt={service.shortTitle}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />
                <div className="relative h-full flex flex-col items-center justify-center text-center px-5">
                  <h3 className="text-white font-bold text-base leading-snug mb-3"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {service.shortTitle}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#5cbf1a] rounded-full mb-3 group-hover:w-12 transition-all duration-300" />
                  <p className="text-white/85 text-xs leading-relaxed"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center border border-white/70 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full group-hover:bg-white group-hover:text-[#2d6208] group-hover:border-white transition-all duration-300">
                    Saiba mais
                  </span>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#3a7d0a] to-[#5cbf1a] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #ffffff 0%, transparent 60%)' }} />
        <h2 className="relative text-3xl font-extrabold text-white mb-4">
          Não encontrou o que precisa?
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Entre em contato pelo WhatsApp. Nossa equipe está pronta para desenvolver uma solução customizada para a sua empresa.
        </p>
        <a
          href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#2d6208] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          <FaWhatsapp size={20} className="text-[#25D366]" />
          Falar pelo WhatsApp
        </a>
      </section>
    </main>
  )
}
