import { company } from '../data/company.js'
import { services } from '../data/services.js'
import { posts } from '../data/blog.js'
import { faq } from '../data/faq.js'

// ⚠️ Troque para o domínio final quando conectar (ex.: https://www.ajnengenharia.com.br)
export const SITE_URL = 'https://www.ajnengenharia.com.br'
export const SITE_NAME = 'AJN Consultoria e Engenharia'
export const DEFAULT_IMAGE = '/og-image.jpg'

const abs = (path) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Schema base da empresa (LocalBusiness)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  image: abs(DEFAULT_IMAGE),
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: '+55' + company.whatsapp,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Alberto Cintra, 35, sala 601',
    addressLocality: 'Belo Horizonte',
    addressRegion: 'MG',
    postalCode: '31160-370',
    addressCountry: 'BR',
  },
  areaServed: 'Belo Horizonte e região - MG',
  priceRange: '$$',
}

// Schema FAQPage (rich result no Google)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// Retorna os metadados de SEO para uma rota
export function getSeo(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'

  // Serviço individual
  if (clean.startsWith('/servicos/')) {
    const slug = clean.split('/')[2]
    const s = services.find((x) => x.slug === slug)
    if (s) {
      return {
        title: `${s.title} em BH | ${SITE_NAME}`,
        description: s.summary,
        canonical: abs(clean),
        image: `/images/servicos/${s.slug}.jpg`,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: s.title,
          provider: { '@type': 'LocalBusiness', name: SITE_NAME, url: SITE_URL },
          areaServed: 'Belo Horizonte - MG',
          description: s.summary,
        },
      }
    }
  }

  // Artigo individual
  if (clean.startsWith('/blog/')) {
    const slug = clean.split('/')[2]
    const p = posts.find((x) => x.slug === slug)
    if (p) {
      return {
        title: `${p.title} | Blog ${SITE_NAME}`,
        description: p.excerpt,
        canonical: abs(clean),
        image: p.image || DEFAULT_IMAGE,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          dateModified: p.date,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: abs('/logo.png') } },
          mainEntityOfPage: abs(clean),
          articleSection: p.category,
        },
      }
    }
  }

  const map = {
    '/': {
      title: 'AJN Consultoria e Engenharia — QSSMA, Combate a Incêndio e Projetos Elétricos em BH',
      description:
        'Especialistas em QSSMA, segurança do trabalho, PCMSO, PGR, laudos técnicos, combate a incêndio (PPCI/AVCB) e projetos elétricos em Belo Horizonte e região.',
      jsonLd: [localBusinessSchema, faqSchema],
    },
    '/servicos': {
      title: `Serviços — Segurança do Trabalho, QSSMA e Engenharia | ${SITE_NAME}`,
      description:
        'Conheça os serviços da AJN: segurança do trabalho, PCMSO, gestão ambiental, eSocial, perícias, combate a incêndio, projetos elétricos e treinamentos de NR em BH.',
    },
    '/blog': {
      title: `Blog — Segurança do Trabalho e Saúde Ocupacional | ${SITE_NAME}`,
      description:
        'Artigos técnicos sobre LTCAT, PCMSO, PGR, NR-35, PPP, AVCB, eSocial e segurança do trabalho. Conteúdo da AJN Consultoria e Engenharia.',
    },
    '/contato': {
      title: `Contato — Fale com a AJN Engenharia em Belo Horizonte | ${SITE_NAME}`,
      description:
        'Entre em contato com a AJN Consultoria e Engenharia. WhatsApp (31) 98473-4644 — Rua Alberto Cintra, 35, União, Belo Horizonte/MG.',
      jsonLd: localBusinessSchema,
    },
    '/mapa-do-site': {
      title: `Mapa do Site | ${SITE_NAME}`,
      description: 'Todas as páginas, serviços e artigos da AJN Consultoria e Engenharia.',
    },
  }

  const base = map[clean] || {
    title: SITE_NAME,
    description:
      'Especialistas em QSSMA, segurança do trabalho, combate a incêndio e projetos elétricos em Belo Horizonte.',
  }

  return {
    title: base.title,
    description: base.description,
    canonical: abs(clean),
    image: base.image || DEFAULT_IMAGE,
    type: 'website',
    jsonLd: base.jsonLd || null,
  }
}

// Todas as rotas estáticas do site (para sitemap e pré-render)
export function getAllRoutes() {
  return [
    '/',
    '/servicos',
    ...services.map((s) => `/servicos/${s.slug}`),
    '/blog',
    ...posts.map((p) => `/blog/${p.slug}`),
    '/contato',
    '/mapa-do-site',
  ]
}
