import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaHome, FaChevronRight, FaPaperPlane, FaCheckCircle, FaExclamationCircle,
  FaSpinner, FaArrowRight, FaCalendarAlt, FaBuilding,
} from 'react-icons/fa'
import {
  company, getAllContacts, getBusinessStatus, getMapsUrl,
  getWhatsappUrl, sanitizePhone, getLocalBusinessSchema,
} from '../../data/company'
import { services } from '../../data/services'
import Reveal from '../../components/Reveal/Reveal'

// ═══════════════════════════════════════════════════════════════════
// HELPERS LOCAIS
// ═══════════════════════════════════════════════════════════════════

/**
 * Máscara de telefone brasileiro (celular e fixo)
 * (31) 98473-4644 ou (31) 3333-4444
 */
const maskPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})/, '($1) ')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return digits
    .replace(/^(\d{2})/, '($1) ')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

/**
 * Validação de campos do formulário
 */
const validators = {
  name: (v) => {
    if (!v.trim()) return 'Nome é obrigatório'
    if (v.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres'
    if (!/^[a-zA-ZÀ-ú\s]+$/.test(v.trim())) return 'Nome deve conter apenas letras'
    return ''
  },
  email: (v) => {
    if (!v.trim()) return '' // opcional
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'E-mail inválido'
    return ''
  },
  phone: (v) => {
    if (!v.trim()) return '' // opcional
    const digits = v.replace(/\D/g, '')
    if (digits.length < 10) return 'Telefone deve ter pelo menos 10 dígitos'
    return ''
  },
  subject: (v) => {
    if (!v) return 'Selecione um assunto'
    return ''
  },
  message: (v) => {
    if (!v.trim()) return 'Mensagem é obrigatória'
    if (v.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres'
    return ''
  },
}

/**
 * Gera assuntos dinamicamente a partir dos serviços + opções fixas
 */
const generateSubjects = () => [
  { value: '', label: 'Selecione um assunto' },
  ...services.map((s) => ({ value: s.shortTitle, label: s.shortTitle })),
  { value: 'Orçamento Geral', label: 'Orçamento Geral' },
  { value: 'Parceria Comercial', label: 'Parceria Comercial' },
  { value: 'Trabalhe Conosco', label: 'Trabalhe Conosco' },
  { value: 'Outro', label: 'Outro assunto' },
]

/**
 * Formata horário de funcionamento (segunda a domingo)
 */
const formatBusinessHours = (hours) => {
  const dayLabels = {
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo',
  }

  const grouped = {}
  Object.entries(hours).forEach(([day, h]) => {
    const label = h.isOpen ? `${h.open}–${h.close}` : 'Fechado'
    if (!grouped[label]) grouped[label] = []
    grouped[label].push(dayLabels[day])
  })

  return Object.entries(grouped).map(([time, days]) => ({
    days: days.join(', '),
    time,
  }))
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '', // Anti-spam: bots preenchem, humanos não
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef(null)
  const successRef = useRef(null)

  // Dados derivados
  const contacts = useMemo(() => getAllContacts(), [])
  const businessStatus = useMemo(() => getBusinessStatus(), [])
  const subjects = useMemo(() => generateSubjects(), [])
  const businessHours = useMemo(() => formatBusinessHours(company.hours), [])
  const mapsUrl = useMemo(() => getMapsUrl(), [])

  // Meta tags dinâmicas + Schema.org
  useEffect(() => {
    const siteUrl = company.seo?.siteUrl || 'https://ajnengenharia.com.br'

    document.title = `Contato | ${company.shortName} — Fale Conosco`

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', 'Entre em contato com a AJN Engenharia em Belo Horizonte. Orçamentos, dúvidas técnicas e suporte especializado em SST, laudos e treinamentos NR.')
    setMeta('property', 'og:title', `Contato | ${company.shortName}`)
    setMeta('property', 'og:description', 'Fale com nossa equipe de especialistas. Resposta rápida via WhatsApp.')
    setMeta('property', 'og:url', `${siteUrl}/contato`)

    // Schema.org ContactPage + LocalBusiness
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          name: 'Contato',
          url: `${siteUrl}/contato`,
        },
        getLocalBusinessSchema(),
      ],
    }

    let ldScript = document.getElementById('contact-schema')
    if (!ldScript) {
      ldScript = document.createElement('script')
      ldScript.id = 'contact-schema'
      ldScript.type = 'application/ld+json'
      document.head.appendChild(ldScript)
    }
    ldScript.textContent = JSON.stringify(schema)

    return () => {
      const ld = document.getElementById('contact-schema')
      if (ld) ld.remove()
    }
  }, [])

  // Atualiza validação ao digitar (apenas campos já tocados)
  useEffect(() => {
    const newErrors = {}
    Object.keys(touched).forEach((field) => {
      if (touched[field] && validators[field]) {
        const error = validators[field](form[field])
        if (error) newErrors[field] = error
      }
    })
    setErrors(newErrors)
  }, [form, touched])

  // Alerta ao sair da página com formulário preenchido
  useEffect(() => {
    const hasContent = Object.values(form).some((v) => v && v.trim() !== '')
    if (!hasContent || submitted) return

    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [form, submitted])

  // Focus no card de sucesso após submit
  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus()
    }
  }, [submitted])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target

    // Aplica máscara no telefone
    const finalValue = name === 'phone' ? maskPhone(value) : value

    setForm((prev) => ({ ...prev, [name]: finalValue }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    // Anti-spam: se honeypot preenchido, silencia
    if (form.honeypot) {
      console.warn('Spam detectado')
      return
    }

    // Valida todos os campos
    const newErrors = {}
    const fieldsToValidate = ['name', 'email', 'phone', 'subject', 'message']
    fieldsToValidate.forEach((field) => {
      const error = validators[field](form[field])
      if (error) newErrors[field] = error
    })

    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })

    if (Object.keys(newErrors).length > 0) {
      // Foca no primeiro campo com erro
      const firstErrorField = Object.keys(newErrors)[0]
      formRef.current?.querySelector(`[name="${firstErrorField}"]`)?.focus()
      return
    }

    setIsSubmitting(true)

    // Monta mensagem para WhatsApp
    const text = [
      `*Nova mensagem do site*`,
      ``,
      `*Nome:* ${form.name}`,
      form.email ? `*E-mail:* ${form.email}` : '',
      form.phone ? `*Telefone:* ${form.phone}` : '',
      `*Assunto:* ${form.subject}`,
      ``,
      `*Mensagem:*`,
      form.message,
    ].filter(Boolean).join('\n')

    // Simula delay de rede (1s) para UX
    setTimeout(() => {
      const whatsappUrl = getWhatsappUrl(text)
      window.open(whatsappUrl, '_blank')

      // Tracking (exemplo — substitua pelo seu analytics)
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: form.subject,
        })
      }

      setIsSubmitting(false)
      setSubmitted(true)
    }, 800)
  }, [form])

  const resetForm = useCallback(() => {
    setForm({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' })
    setErrors({})
    setTouched({})
    setSubmitted(false)
    formRef.current?.querySelector('[name="name"]')?.focus()
  }, [])

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <main>
      {/* ══════════ HERO ══════════ */}
      <Reveal>
        <section
          className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 50%, #44621f 100%)' }}
        >
          <div
            className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#a4d65e]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-black/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6"
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 hover:text-[#a4d65e] transition-colors focus:outline-none focus-visible:text-[#a4d65e]"
              >
                <FaHome size={12} aria-hidden="true" />
                <span>Home</span>
              </Link>
              <FaChevronRight size={9} aria-hidden="true" />
              <span className="text-[#a4d65e] font-semibold" aria-current="page">
                Contato
              </span>
            </nav>

            <span className="inline-flex items-center gap-2 text-[#a4d65e] text-xs font-bold uppercase tracking-widest mb-5 bg-[#a4d65e]/10 px-4 py-2 rounded-full border border-[#a4d65e]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]" aria-hidden="true" />
              Fale conosco
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
              Entre em Contato
            </h1>

            <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
              Nossa equipe de engenheiros e especialistas está pronta para atender você.
              Envie uma mensagem ou fale diretamente pelo WhatsApp.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════ CONTEÚDO ══════════ */}
      <section className="py-20 px-6 bg-[#f5f7fa]" aria-labelledby="contact-info-heading">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* ── Informações + Mapa ── */}
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
                Onde estamos
              </span>

              <h2
                id="contact-info-heading"
                className="text-3xl font-black text-[#1a2e0a] mb-3 tracking-tight"
              >
                Informações de Contato
              </h2>
              <div
                className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-8"
                aria-hidden="true"
              />

              {/* Cards de contato */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contacts.map((item) => {
                  const isAccent = item.type === 'whatsapp'
                  return (
                    <a
                      key={item.type}
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={`${item.label}: ${item.value}`}
                      className="group flex items-start gap-3.5 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:border-[#a4d65e]/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9e10]"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: isAccent
                            ? 'rgba(37,211,102,0.12)'
                            : 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)',
                        }}
                      >
                        <item.icon
                          className={isAccent ? 'text-[#25D366]' : 'text-white'}
                          size={17}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#1a2e0a] text-sm mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-gray-500 text-sm leading-snug break-words group-hover:text-[#3a7d0a] transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Horário de funcionamento dinâmico + Status */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(135deg, #6aa521 0%, #2d6208 100%)' }}
                    >
                      <FaClock className="text-white" size={17} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a2e0a] text-sm">
                        Horário de Atendimento
                      </p>
                      <p className="text-gray-500 text-xs">
                        Fuso horário de Brasília (GMT-3)
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                      ${businessStatus.isOpen
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                      }
                    `}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${businessStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                        }`}
                      aria-hidden="true"
                    />
                    {businessStatus.status}
                  </span>
                </div>

                <div className="space-y-2 pl-14">
                  {businessHours.map((slot, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-gray-600 font-medium">{slot.days}</span>
                      <span
                        className={`font-semibold ${slot.time === 'Fechado' ? 'text-gray-400' : 'text-[#1a2e0a]'
                          }`}
                      >
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mapa do Google */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64 bg-gray-100">
                <iframe
                  title={`Localização ${company.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    company.address.full
                  )}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Link "Ver no mapa" abaixo do mapa */}
              <div className="mt-3 text-center">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#3a7d0a] text-sm font-semibold hover:underline focus:outline-none focus-visible:underline"
                >
                  <FaMapMarkerAlt size={12} aria-hidden="true" />
                  Abrir no Google Maps
                  <FaArrowRight size={10} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── Formulário ── */}
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-[#3a7d0a] text-xs font-bold uppercase tracking-widest mb-5 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e10]" aria-hidden="true" />
                Mensagem
              </span>

              <h2 className="text-3xl font-black text-[#1a2e0a] mb-3 tracking-tight">
                Envie sua mensagem
              </h2>
              <div
                className="w-16 h-1 bg-gradient-to-r from-[#4a9e10] to-[#a4d65e] rounded-full mb-8"
                aria-hidden="true"
              />

              {submitted ? (
                <SuccessMessage onReset={resetForm} ref={successRef} />
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm space-y-5"
                >
                  {/* Honeypot anti-spam (invisível para humanos) */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="Nome"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name}
                      touched={touched.name}
                      placeholder="Seu nome completo"
                      autoComplete="name"
                    />
                    <FormField
                      label="Telefone / WhatsApp"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phone}
                      touched={touched.phone}
                      placeholder="(31) 9 0000-0000"
                      autoComplete="tel"
                    />
                  </div>

                  <FormField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    placeholder="seuemail@empresa.com"
                    autoComplete="email"
                  />

                  <FormField
                    label="Assunto"
                    name="subject"
                    as="select"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.subject}
                    touched={touched.subject}
                    options={subjects}
                  />

                  <FormField
                    label="Mensagem"
                    name="message"
                    as="textarea"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    touched={touched.message}
                    placeholder="Descreva como podemos ajudar sua empresa..."
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-bold text-base w-full transition-all hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]"
                    style={{ background: 'linear-gradient(135deg, #25D366 0%, #1db954 100%)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" size={16} aria-hidden="true" />
                        Preparando mensagem...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={16} aria-hidden="true" />
                        Enviar pelo WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center leading-relaxed">
                    <FaWhatsapp size={10} className="inline mr-1" aria-hidden="true" />
                    Ao enviar, você será redirecionado para o WhatsApp com sua mensagem
                    pré-preenchida. Seus dados não são armazenados.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <Reveal>
        <section
          className="py-16 px-6 text-center text-white overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #1a2e0a 0%, #2a3f12 100%)' }}
        >
          <div
            className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto">
            <FaBuilding className="mx-auto mb-4 text-[#a4d65e]/60" size={36} aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Prefere falar direto com um especialista?
            </h2>
            <p className="text-white/70 mb-7 max-w-xl mx-auto leading-relaxed">
              Ligue agora ou envie um WhatsApp. Respondemos em até 15 minutos em horário comercial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:+${sanitizePhone(company.phone)}`}
                className="inline-flex items-center gap-2 bg-white text-[#1a2e0a] px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FaPhone size={14} aria-hidden="true" />
                Ligar agora
              </a>
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FaWhatsapp size={16} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTES
// ═══════════════════════════════════════════════════════════════════

/**
 * Campo de formulário reutilizável com label, erro e estados
 */
function FormField({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  autoComplete,
  as = 'input',
  options = [],
  rows = 3,
}) {
  const id = `field-${name}`
  const errorId = `${id}-error`
  const hasError = touched && error

  const baseClass = `
    w-full border rounded-xl px-4 py-3 text-sm transition-all
    focus:outline-none focus:ring-2
    ${hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-200 focus:border-[#6aa521] focus:ring-[#a4d65e]/40'
    }
  `

  const inputProps = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    autoComplete,
    required,
    'aria-invalid': hasError ? 'true' : 'false',
    'aria-describedby': hasError ? errorId : undefined,
    className: baseClass,
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>

      {as === 'select' ? (
        <select {...inputProps}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input type={type} {...inputProps} />
      )}

      {/* Mensagem de erro */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5"
        >
          <FaExclamationCircle size={11} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Mensagem de sucesso após envio
 */
const SuccessMessage = ({ onReset }) => {
  return (
    <div
      ref={useRef()}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-10 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9e10]"
    >
      <div className="w-20 h-20 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-5 animate-[bounce_1s_ease-in-out]">
        <FaCheckCircle className="text-[#25D366]" size={40} aria-hidden="true" />
      </div>
      <h3 className="text-[#1a2e0a] font-black text-2xl mb-2">
        Mensagem preparada!
      </h3>
      <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
        Você foi redirecionado para o WhatsApp com sua mensagem pré-preenchida.
        Basta clicar em <strong>Enviar</strong> e nossa equipe retornará em breve.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onReset}
          className="text-[#3a7d0a] font-semibold text-sm hover:underline focus:outline-none focus-visible:underline"
        >
          Enviar outra mensagem
        </button>
        <a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <FaWhatsapp size={14} aria-hidden="true" />
          Abrir WhatsApp
        </a>
      </div>
    </div>
  )
}