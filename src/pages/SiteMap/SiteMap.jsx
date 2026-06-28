import { Link } from 'react-router-dom'
import {
  FaHome, FaChevronRight, FaSitemap, FaArrowRight,
  FaFileAlt, FaNewspaper, FaPhoneAlt,
} from 'react-icons/fa'
import { services } from '../../data/services'
import { posts } from '../../data/blog'

const mainPages = [
  { to: '/', label: 'Home' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

function Column({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}>
          <Icon className="text-white" size={18} />
        </div>
        <h2 className="text-[#1a2e0a] font-black text-lg">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Item({ to, children }) {
  return (
    <li>
      <Link to={to}
        className="group flex items-center gap-2 text-gray-600 hover:text-[#3a7d0a] text-sm py-1.5 transition-colors">
        <FaArrowRight size={9} className="text-[#a4d65e] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        {children}
      </Link>
    </li>
  )
}

export default function SiteMap() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 50%, #44621f 100%)' }}>
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
            <Link to="/" className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors">
              <FaHome size={12} /> Home
            </Link>
            <FaChevronRight size={9} />
            <span className="text-[#a4d65e]">Mapa do Site</span>
          </div>
          <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/30">
            <FaSitemap size={12} /> Navegação
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">Mapa do Site</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Encontre rapidamente todas as páginas, serviços e artigos do site da AJN Engenharia.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="py-20 px-6 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-start">

          {/* Páginas + Contato */}
          <div className="space-y-8">
            <Column icon={FaPhoneAlt} title="Páginas">
              <ul>
                {mainPages.map((p) => <Item key={p.to} to={p.to}>{p.label}</Item>)}
                <Item to="/mapa-do-site">Mapa do Site</Item>
              </ul>
            </Column>
          </div>

          {/* Serviços */}
          <Column icon={FaFileAlt} title="Serviços">
            <ul>
              {services.map((s) => (
                <Item key={s.id} to={`/servicos/${s.slug}`}>{s.shortTitle}</Item>
              ))}
            </ul>
          </Column>

          {/* Blog */}
          <Column icon={FaNewspaper} title="Blog">
            <ul>
              {posts.map((p) => (
                <Item key={p.slug} to={`/blog/${p.slug}`}>{p.title}</Item>
              ))}
            </ul>
          </Column>
        </div>
      </section>
    </main>
  )
}
