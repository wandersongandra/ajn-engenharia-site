import { useParams, Link } from 'react-router-dom'
import {
  FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope,
  FaHome, FaChevronRight,
  FaHardHat, FaLeaf, FaClipboardCheck, FaFileAlt, FaUserMd,
  FaSearch, FaFire, FaBolt, FaChalkboardTeacher, FaTools,
} from 'react-icons/fa'
import { getServiceBySlug, services } from '../../data/services'
import { company } from '../../data/company'

const iconMap = {
  FaHardHat, FaLeaf, FaClipboardCheck, FaFileAlt, FaUserMd,
  FaSearch, FaFire, FaBolt, FaChalkboardTeacher, FaTools,
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2d6208] mb-4">Serviço não encontrado</h1>
          <Link to="/servicos" className="text-[#4a9e10] hover:underline">
            ← Voltar para Serviços
          </Link>
        </div>
      </main>
    )
  }

  const Icon = iconMap[service.icon] || FaHardHat
  const related = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <main>
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#1a3a0a] via-[#2d5c1a] to-[#3a7d0a] pt-28 sm:pt-36 lg:pt-44 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
            <Link to="/" className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors">
              <FaHome size={12} /> Home
            </Link>
            <FaChevronRight size={9} />
            <Link to="/servicos" className="hover:text-[#a4d65e] transition-colors">Serviços</Link>
            <FaChevronRight size={9} />
            <span className="text-[#a4d65e]">{service.shortTitle}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Icon className="text-[#5cbf1a]" size={32} />
            </div>
            <div>
              <span className="text-[#5cbf1a] text-xs font-bold uppercase tracking-widest mb-2 block">
                Serviço
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{service.title}</h1>
              <p className="text-white/70 text-lg">{service.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 lg:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">

          {/* Coluna principal */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-black text-[#1a2e0a] mb-2">Sobre este serviço</h2>
            <div className="w-14 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-7" />
            {service.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 leading-[1.8] text-[17px] mb-4">{para}</p>
            ))}

            {/* Lista de itens */}
            {service.items && service.items.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-black text-[#1a2e0a] mb-5">O que está incluído</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-[#f5f7fa] border border-gray-100 rounded-xl px-4 py-3">
                      <FaCheckCircle className="text-[#4a9e10] mt-0.5 shrink-0" size={16} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* NRs (para treinamentos) */}
            {service.nrs && (
              <div className="mt-10">
                <h3 className="text-xl font-black text-[#1a2e0a] mb-5">Treinamentos disponíveis</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {service.nrs.map((nr) => (
                    <div key={nr} className="flex items-center gap-2 text-sm text-gray-700 bg-[#f5f7fa] border border-gray-100 px-3 py-2.5 rounded-lg">
                      <FaCheckCircle className="text-[#4a9e10] shrink-0" size={12} />
                      {nr}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA (sticky) */}
          <aside className="lg:sticky lg:top-32">
            <div className="rounded-3xl p-7 shadow-xl text-white" style={{ background: 'linear-gradient(160deg, #2a3f12 0%, #3a5519 60%, #44621f 100%)' }}>
              <h3 className="text-xl font-black mb-2">Solicite um orçamento</h3>
              <p className="text-white/70 text-sm mb-6">
                Fale com nossa equipe e receba uma proposta para <strong className="text-[#a4d65e]">{service.shortTitle}</strong> sem compromisso.
              </p>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de um orçamento para: ${service.title}.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#a4d65e] hover:bg-[#92c44d] text-[#1a2e0a] px-5 py-3.5 rounded-full font-bold text-sm w-full transition-all hover:scale-[1.02] mb-3"
              >
                <FaWhatsapp size={18} /> Pedir pelo WhatsApp
              </a>
              <a
                href={`tel:${company.phone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white px-5 py-3 rounded-full font-semibold text-sm w-full transition-all"
              >
                <FaPhone size={13} /> {company.phone}
              </a>

              <div className="border-t border-white/15 mt-6 pt-5 space-y-3 text-sm">
                <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors break-all">
                  <FaEnvelope className="text-[#a4d65e] shrink-0" size={13} /> {company.email}
                </a>
                <p className="text-white/50 text-xs">Atendimento: Seg–Sex 8h–18h · Sáb 8h–12h</p>
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* Serviços relacionados */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#2d6208] mb-8">Outros serviços</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((s) => (
              <Link
                key={s.id}
                to={`/servicos/${s.slug}`}
                className="group relative w-full h-[340px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={`/images/servicos/${s.slug}.jpg`}
                  alt={s.shortTitle}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85 group-hover:from-[#2d6208]/75 group-hover:via-[#3a7d0a]/80 group-hover:to-black/90 transition-colors duration-500" />
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                  <h3 className="text-white font-bold text-sm leading-snug mb-2"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {s.shortTitle}
                  </h3>
                  <div className="w-6 h-0.5 bg-[#5cbf1a] rounded-full mb-2 group-hover:w-10 transition-all duration-300" />
                  <p className="text-white/85 text-xs leading-relaxed line-clamp-2"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                    {s.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
