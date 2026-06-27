import { useState } from 'react'
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { company } from '../../data/company'

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

  return (
    <main className="pt-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#0a2342] to-[#1a3a5c] py-20 px-6 text-center">
        <span className="inline-block text-[#00d4a7] text-xs font-bold uppercase tracking-widest mb-4 border border-[#00d4a7]/50 px-4 py-1.5 rounded-full">
          Fale conosco
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Entre em Contato</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Nossa equipe está pronta para atender você. Envie uma mensagem ou fale diretamente pelo WhatsApp.
        </p>
      </section>

      {/* Conteúdo */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
          {/* Informações */}
          <div>
            <SectionTitle tag="Onde estamos" title="Informações de Contato" center={false} />

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a2342] flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-[#00d4a7]" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2342] mb-1">Endereço</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{company.address.full}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a2342] flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-[#00d4a7]" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2342] mb-1">WhatsApp / Telefone</p>
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#25D366] text-sm transition-colors"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a2342] flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-[#00d4a7]" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2342] mb-1">E-mail</p>
                  <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-[#00d4a7] text-sm transition-colors">
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a2342] flex items-center justify-center shrink-0">
                  <FaClock className="text-[#00d4a7]" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2342] mb-1">Horário de Atendimento</p>
                  <p className="text-gray-600 text-sm">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-gray-600 text-sm">Sábado: 8h às 12h</p>
                </div>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div className="rounded-2xl overflow-hidden h-56 bg-gray-100 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-400">
                <FaMapMarkerAlt size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Mapa — Rua Alberto Cintra, 35</p>
                <p className="text-xs">Bairro União, BH/MG</p>
                <a
                  href="https://maps.google.com/?q=Rua+Alberto+Cintra,+35,+Bairro+União,+Belo+Horizonte,+MG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00d4a7] text-xs hover:underline mt-1 block"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div>
            <SectionTitle tag="Mensagem" title="Envie sua mensagem" center={false} />

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <FaWhatsapp className="text-[#25D366] mx-auto mb-3" size={40} />
                <h3 className="text-green-800 font-bold text-xl mb-2">Mensagem enviada!</h3>
                <p className="text-green-700 text-sm">Sua mensagem foi enviada via WhatsApp. Nossa equipe retornará em breve.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-[#00d4a7] text-sm hover:underline">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsApp} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a7] focus:ring-1 focus:ring-[#00d4a7] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(31) 9 0000-0000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a7] focus:ring-1 focus:ring-[#00d4a7] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seuemail@empresa.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a7] focus:ring-1 focus:ring-[#00d4a7] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assunto *</label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a7] focus:ring-1 focus:ring-[#00d4a7] transition-colors text-gray-600"
                  >
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
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Descreva como podemos ajudar sua empresa..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a7] focus:ring-1 focus:ring-[#00d4a7] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white px-8 py-4 rounded-full font-bold text-base w-full transition-all shadow-lg hover:shadow-xl"
                >
                  <FaWhatsapp size={20} />
                  Enviar pelo WhatsApp
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
