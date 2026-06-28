/**
 * Dados Corporativos — AJN Consultoria e Engenharia
 * 
 * Fonte única da verdade (Single Source of Truth) para todos os dados
 * da empresa usados em SEO, Schema.org, contatos e conteúdo do site.
 * 
 * @module data/company
 */

// ═══════════════════════════════════════════════════════════════════
// IDENTIDADE CORPORATIVA
// ═══════════════════════════════════════════════════════════════════

export const company = {
  // ── Identidade ──
  name: 'AJN Consultoria e Engenharia',
  shortName: 'AJN Engenharia',
  legalName: 'AJN Consultoria e Engenharia LTDA',
  tradeName: 'AJN Engenharia',
  cnpj: '50.970.588/0001-84',
  foundingYear: 2023, // Ano de fundação (credibilidade E-E-A-T)

  // ── Branding ──
  slogan: 'Qualidade, Segurança e Sustentabilidade para o seu negócio',
  tagline: 'Engenharia de excelência em QSSMA',

  description:
    'A AJN Consultoria e Engenharia é uma empresa especializada em serviços de qualidade, saúde, segurança e meio ambiente (QSSMA). Oferecemos soluções completas como treinamentos, gestão de contratos, fornecimento de equipes qualificadas, acompanhamento técnico, mobilização de pessoas, máquinas e equipamentos.',

  shortDescription:
    'Consultoria especializada em QSSMA, laudos técnicos, treinamentos NR e regularização de combate a incêndio em Belo Horizonte e região.',

  // ── Contato Primário ──
  phone: '(31) 98473-4644',
  whatsapp: '5531984734644',
  whatsappDisplay: '(31) 98473-4644', // Formato amigável para exibição
  email: 'faleconosco@ajnengenharia.com.br',
  supportEmail: 'suporte@ajnengenharia.com.br',
  commercialEmail: 'comercial@ajnengenharia.com.br',

  // ── Redes Sociais (deixe string vazia para esconder o ícone) ──
  social: {
    instagram: '',
    linkedin: '',
    facebook: '',
    youtube: '',
    twitter: '',
    tiktok: '',
  },

  // ── Endereço ──
  address: {
    street: 'Rua Alberto Cintra',
    number: '35',
    complement: 'sala 601',
    neighborhood: 'União',
    city: 'Belo Horizonte',
    state: 'MG',
    stateFull: 'Minas Gerais',
    country: 'Brasil',
    zip: '31160-370',
    // Formatos pré-montados para evitar repetição em múltiplos componentes
    line1: 'Rua Alberto Cintra, 35, sala 601',
    line2: 'Bairro União, Belo Horizonte/MG',
    line3: 'CEP 31160-370',
    full: 'Rua Alberto Cintra, 35, sala 601 — Bairro União, Belo Horizonte/MG — CEP 31160-370',
    short: 'Belo Horizonte/MG',
  },

  // ── Coordenadas Geográficas (crítico para SEO Local) ──
  geo: {
    latitude: -19.9003,
    longitude: -43.9156,
  },

  // ── Horário de Funcionamento ──
  hours: {
    monday: { open: '08:00', close: '18:00', isOpen: true },
    tuesday: { open: '08:00', close: '18:00', isOpen: true },
    wednesday: { open: '08:00', close: '18:00', isOpen: true },
    thursday: { open: '08:00', close: '18:00', isOpen: true },
    friday: { open: '08:00', close: '18:00', isOpen: true },
    saturday: { open: '08:00', close: '12:00', isOpen: true },
    sunday: { open: null, close: null, isOpen: false },
  },

  // ── Áreas de Atuação Geográfica (SEO Local) ──
  serviceAreas: [
    'Belo Horizonte',
    'Contagem',
    'Betim',
    'Nova Lima',
    'Santa Luzia',
    'Ribeirão das Neves',
    'Região Metropolitana de BH',
    'Minas Gerais',
  ],

  // ── Institucional ──
  mission:
    'Fornecer serviços de alta qualidade em QSSMA e gestão de equipamentos, contribuindo para a segurança, eficiência e conformidade de nossos clientes.',

  vision:
    'Ser reconhecida nacionalmente como uma empresa líder em consultoria em engenharia, destinada a projetos voltados à área de Qualidade, Saúde, Segurança, Meio Ambiente e combate a incêndio, oferecendo soluções inovadoras e sustentáveis.',

  values: [
    { icon: 'FaHandshake', title: 'Transparência', description: 'Comunicação aberta e honesta em todas as relações.' },
    { icon: 'FaClock', title: 'Pontualidade', description: 'Prazos rigorosamente cumpridos em cada entrega.' },
    { icon: 'FaCogs', title: 'Customização', description: 'Soluções sob medida para cada cliente.' },
    { icon: 'FaLeaf', title: 'Sustentabilidade', description: 'Práticas eficazes, inovadoras e ambientalmente responsáveis.' },
  ],

  // ── Diferenciais Competitivos ──
  differentials: [
    {
      id: 'team',
      icon: 'FaUserTie',
      title: 'Equipe Altamente Qualificada',
      description: 'Profissionais experientes e certificados em todas as áreas de QSSMA, com registro ativo no CREA e CRM.',
    },
    {
      id: 'environment',
      icon: 'FaLeaf',
      title: 'Comprometimento Ambiental',
      description: 'Práticas sustentáveis integradas a todas as nossas soluções, em conformidade com a ISO 14001.',
    },
    {
      id: 'technology',
      icon: 'FaMicrochip',
      title: 'Inovação Tecnológica',
      description: 'Uso de tecnologias avançadas de medição e gestão para garantir eficiência e precisão em cada projeto.',
    },
    {
      id: 'service',
      icon: 'FaHeart',
      title: 'Atendimento Personalizado',
      description: 'Envolvimento próximo com o cliente — tratamos cada projeto com dedicação e cuidado familiar.',
    },
  ],

  // ── Números / Estatísticas (usados em "nossos resultados") ──
  stats: [
    { value: '200+', label: 'Projetos entregues', icon: 'FaCheckCircle' },
    { value: '15+', label: 'Anos de experiência da equipe', icon: 'FaCalendarAlt' },
    { value: '98%', label: 'Clientes satisfeitos', icon: 'FaSmile' },
    { value: '50+', label: 'Empresas atendidas', icon: 'FaBuilding' },
  ],

  // ── Certificações e Registros (E-E-A-T para Google) ──
  certifications: [
    { name: 'CREA-MG', description: 'Registro ativo no Conselho Regional de Engenharia', number: '' },
    { name: 'ISO 9001', description: 'Sistema de Gestão da Qualidade', number: '' },
    { name: 'ISO 14001', description: 'Sistema de Gestão Ambiental', number: '' },
    { name: 'ISO 45001', description: 'Saúde e Segurança Ocupacional', number: '' },
  ],

  // ── Mensagem Padrão do WhatsApp ──
  whatsappMessage: 'Olá! Vim pelo site e gostaria de mais informações sobre os serviços da AJN Engenharia.',

  // ── SEO Global (meta tags padrão) ──
  seo: {
    siteName: 'AJN Engenharia',
    siteUrl: 'https://ajnengenharia.com.br',
    defaultTitle: 'AJN Engenharia | Consultoria em QSSMA e Segurança do Trabalho em BH',
    defaultDescription:
      'Especialistas em laudos técnicos (LTCAT, PGR, PCMSO), treinamentos NR, combate a incêndio (AVCB/CLCB) e gestão de eSocial SST em Belo Horizonte e região metropolitana.',
    defaultImage: '/og-image.jpg',
    twitterHandle: '@ajnengenharia',
    locale: 'pt_BR',
    keywords: [
      'consultoria engenharia BH',
      'segurança do trabalho Belo Horizonte',
      'LTCAT BH',
      'PGR PCMSO',
      'AVCB bombeiros MG',
      'treinamentos NR',
      'eSocial SST',
      'laudos técnicos',
    ],
  },
}

// ═══════════════════════════════════════════════════════════════════
// CLIENTES / PARCEIROS
// ═══════════════════════════════════════════════════════════════════

export const clientLogos = [
  { src: '/logos/logo1.jpg', alt: 'Cliente 1', name: 'Cliente 1' },
  { src: '/logos/logo2.jpg', alt: 'Cliente 2', name: 'Cliente 2' },
]

// ═══════════════════════════════════════════════════════════════════
// HELPERS UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════════

/**
 * Sanitiza telefone para URLs (remove tudo que não for dígito)
 * @param {string} phone 
 * @returns {string}
 */
export const sanitizePhone = (phone) => String(phone || '').replace(/\D/g, '')

/**
 * Retorna URL formatada do WhatsApp com mensagem pré-preenchida
 * @param {string} customMessage - Mensagem customizada (opcional)
 * @returns {string}
 */
export const getWhatsappUrl = (customMessage) => {
  const cleanNumber = sanitizePhone(company.whatsapp)
  const message = customMessage || company.whatsappMessage
  if (!cleanNumber) return '#'
  return `https://wa.me/${cleanNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

/**
 * Retorna URL formatada do Google Maps
 * @returns {string}
 */
export const getMapsUrl = () => {
  const query = encodeURIComponent(`${company.address.line1}, ${company.address.city}, ${company.address.state}`)
  return `https://maps.google.com/?q=${query}`
}

/**
 * Retorna URL de directions (rota) no Google Maps
 * @returns {string}
 */
export const getDirectionsUrl = () => {
  const query = encodeURIComponent(company.address.full)
  return `https://www.google.com/maps/dir/${query}`
}

/**
 * Retorna URL para chamada telefônica (tel:)
 * @returns {string}
 */
export const getPhoneUrl = () => `tel:+${sanitizePhone(company.phone)}`

/**
 * Retorna URL de email (mailto:)
 * @param {string} subject - Assunto opcional
 * @param {string} body - Corpo opcional
 * @returns {string}
 */
export const getEmailUrl = (subject = '', body = '') => {
  let url = `mailto:${company.email}`
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  if (params.length) url += `?${params.join('&')}`
  return url
}

/**
 * Retorna array com todos os contatos formatados (para componentes de contato)
 * @returns {Array}
 */
export const getAllContacts = () => [
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: company.whatsappDisplay,
    url: getWhatsappUrl(),
    icon: 'FaWhatsapp',
  },
  {
    type: 'phone',
    label: 'Telefone',
    value: company.phone,
    url: getPhoneUrl(),
    icon: 'FaPhone',
  },
  {
    type: 'email',
    label: 'Email',
    value: company.email,
    url: getEmailUrl(),
    icon: 'FaEnvelope',
  },
  {
    type: 'address',
    label: 'Endereço',
    value: company.address.full,
    url: getMapsUrl(),
    icon: 'FaMapMarkerAlt',
  },
]

/**
 * Retorna as redes sociais ativas (filtra as vazias)
 * @returns {Array}
 */
export const getActiveSocialLinks = () => {
  const iconMap = {
    instagram: 'FaInstagram',
    linkedin: 'FaLinkedin',
    facebook: 'FaFacebook',
    youtube: 'FaYoutube',
    twitter: 'FaTwitter',
    tiktok: 'FaTiktok',
  }

  return Object.entries(company.social)
    .filter(([_, url]) => url && url.trim() !== '')
    .map(([platform, url]) => ({
      platform,
      url,
      icon: iconMap[platform] || 'FaLink',
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
    }))
}

/**
 * Verifica se a empresa está aberta no horário atual
 * @returns {{ isOpen: boolean, nextChange: string }}
 */
export const getBusinessStatus = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const now = new Date()
  const today = days[now.getDay()]
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const todayHours = company.hours[today]

  if (!todayHours.isOpen) {
    return { isOpen: false, status: 'Fechado agora', nextChange: 'Abre amanhã' }
  }

  if (currentTime >= todayHours.open && currentTime < todayHours.close) {
    return { isOpen: true, status: 'Aberto agora', closesAt: `Fecha às ${todayHours.close}` }
  }

  return { isOpen: false, status: 'Fechado agora', nextChange: `Abre amanhã às ${company.hours.monday.open}` }
}

/**
 * Gera Schema.org LocalBusiness completo para SEO
 * @returns {Object}
 */
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${company.seo.siteUrl}/#organization`,
  name: company.name,
  alternateName: company.shortName,
  description: company.description,
  url: company.seo.siteUrl,
  telephone: `+${sanitizePhone(company.phone)}`,
  email: company.email,
  image: `${company.seo.siteUrl}/og-image.jpg`,
  logo: `${company.seo.siteUrl}/logo.png`,
  foundingDate: String(company.foundingYear),
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${company.address.street}, ${company.address.number}${company.address.complement ? `, ${company.address.complement}` : ''}`,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: company.geo.latitude,
    longitude: company.geo.longitude,
  },
  openingHoursSpecification: Object.entries(company.hours)
    .filter(([_, h]) => h.isOpen)
    .map(([day, h]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: h.open,
      closes: h.close,
    })),
  areaServed: company.serviceAreas.map((area) => ({
    '@type': 'City',
    name: area,
  })),
  sameAs: getActiveSocialLinks().map((s) => s.url),
})

/**
 * Gera Schema.org Organization para E-E-A-T
 * @returns {Object}
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  legalName: company.legalName,
  url: company.seo.siteUrl,
  logo: `${company.seo.siteUrl}/logo.png`,
  foundingDate: String(company.foundingYear),
  slogan: company.slogan,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${sanitizePhone(company.phone)}`,
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: ['Portuguese'],
  },
})