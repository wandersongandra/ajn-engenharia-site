import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaHome, FaChevronRight, FaPaperPlane,
} from 'react-icons/fa'
import { company } from '../../data/company'

const contactInfo = [
  { icon: FaMapMarkerAlt, label: 'Endereço', value: company.address.full, href: 'https://maps.google.com/?q=Rua+Alberto+Cintra,+35,+Bairro+União,+Belo+Horizonte,+MG' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: company.phone, href: `https://wa.me/${company.whatsapp}`, accent: true },
  { icon: FaPhone, label: 'Telefone', value: company.phone, href: `tel:${company.phone.replace(/\D/g, '')}` },
  { icon: FaEnvelope, label: 'E-mail', value: company.email, href: `mailto:${company.email}` },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleWhatsApp = (e) => {
    e.preventDefault()
    const text = `Olá! Meu nome é ${form.name}.\n\nAssunto: ${form.subject}\n\n${form.message}\n\nContato: ${form.phone || form.email}`
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  const inputCls =
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6aa521] focus:ring-2 focus:ring-[#a4d65e]/40 transition-all'

  return (
    <main>
      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 50%, #44621f 100%)' }}>
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
            <Link to="/" className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors">
              <FaHome size={12} /> Home
            </Link>
            <FaChevronRight size={9} />
            <span className="text-[#a4d65e]">Contato</span>
          </div>
          <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" /> Fale conosco
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">Entre em Contato</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Nossa equipe está pronta para atender você. Envie uma mensagem ou fale diretamente pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* ══════════ CONTEÚDO ══════════ */}
      <section className="py-20 px-6 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Informações + mapa */}
          <div>
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" /> Onde estamos
            </span>
            <h2 className="text-3xl font-black text-[#1a2e0a] mb-3">Informações de Contato</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-8" />

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:border-[#a4d65e]/50 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.accent ? 'rgba(37,211,102,0.12)' : 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}>
                    <item.icon className={item.accent ? 'text-[#25D366]' : 'text-white'} size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1a2e0a] text-sm mb-0.5">{item.label}</p>
                    <p className="text-gray-500 text-sm leading-snug break-words group-hover:text-[#3a7d0a] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Horário */}
            <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-4 mb-8">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}>
                <FaClock className="text-white" size={17} />
              </div>
              <div>
                <p className="font-bold text-[#1a2e0a] text-sm mb-0.5">Horário de Atendimento</p>
                <p className="text-gray-500 text-sm">Seg–Sex: 8h às 18h · Sábado: 8h às 12h</p>
              </div>
            </div>

            {/* Mapa real */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64">
              <iframe
                title="Localização AJN Engenharia"
                src="https://www.google.com/maps?q=Rua+Alberto+Cintra,+35,+Bairro+Uni%C3%A3o,+Belo+Horizonte,+MG&output=embed"
                width="100%" height="100%" style={{ border: 0 }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Formulário */}
          <div>
            <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" /> Mensagem
            </span>
            <h2 className="text-3xl font-black text-[#1a2e0a] mb-3">Envie sua mensagem</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-8" />

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="text-[#25D366]" size={32} />
                </div>
                <h3 className="text-[#1a2e0a] font-black text-xl mb-2">Mensagem enviada!</h3>
                <p className="text-gray-600 text-sm mb-5">Você foi redirecionado para o WhatsApp. Nossa equipe retornará em breve.</p>
                <button onClick={() => setSubmitted(false)} className="text-[#3a7d0a] font-semibold text-sm hover:underline">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsApp} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Seu nome completo" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefone / WhatsApp</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="(31) 9 0000-0000" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="seuemail@empresa.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assunto *</label>
                  <select name="subject" required value={form.subject} onChange={handleChange}
                    className={`${inputCls} text-gray-600`}>
                    <option value="">Selecione um assunto</option>
                    <option>Assessoria em Segurança do Trabalho</option>
                    <option>PCMSO / ASOs</option>
                    <option>Gestão Ambiental</option>
                    <option>Combate a Incêndio / PPCI</option>
                    <option>Projetos Elétricos</option>
                    <option>Treinamentos de NR</option>
                    <option>Laudos Técnicos</option>
                    <option>eSocial</option>
                    <option>Outro assunto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mensagem *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Descreva como podemos ajudar sua empresa..." className={`${inputCls} resize-none`} />
                </div>
                <button type="submit"
                  className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-bold text-base w-full transition-all hover:scale-[1.02] shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #25D366 0%, #1db954 100%)' }}>
                  <FaPaperPlane size={16} /> Enviar pelo WhatsApp
                </button>
                <p className="text-gray-400 text-xs text-center">
                  Ao enviar, você será redirecionado para o WhatsApp com sua mensagem pré-preenchida.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
