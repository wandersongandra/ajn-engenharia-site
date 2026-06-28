import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, SITE_NAME, SITE_URL } from '../../utils/seo'

/**
 * Gerencia meta tags SEO dinamicamente baseado na rota atual.
 * Remove tags antigas automaticamente para evitar duplicatas.
 */
export default function Seo({ additionalMeta = [] }) {
  const { pathname } = useLocation()

  // Memoiza os dados SEO para evitar recálculos desnecessários
  const seoData = useMemo(() => {
    if (typeof window === 'undefined') return null // SSR-safe

    const seo = getSeo(pathname)
    const imageAbs = seo.image?.startsWith('http')
      ? seo.image
      : `${SITE_URL}${seo.image || '/og-default.jpg'}`

    return {
      ...seo,
      imageAbs,
      canonical: seo.canonical || `${SITE_URL}${pathname}`,
    }
  }, [pathname])

  useEffect(() => {
    if (!seoData) return

    // Função helper que remove tag antiga antes de criar nova (evita duplicatas)
    const updateMeta = (attr, key, content) => {
      // Remove meta tag existente com mesmo atributo
      const existing = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (existing) existing.remove()

      // Cria nova meta tag
      const meta = document.createElement('meta')
      meta.setAttribute(attr, key)
      meta.setAttribute('content', content)
      document.head.appendChild(meta)

      return meta
    }

    const updateLink = (rel, href) => {
      const existing = document.head.querySelector(`link[rel="${rel}"]`)
      if (existing) existing.remove()

      const link = document.createElement('link')
      link.setAttribute('rel', rel)
      link.setAttribute('href', href)
      document.head.appendChild(link)

      return link
    }

    // Armazena referências para cleanup
    const createdElements = []

    // Title
    document.title = seoData.title

    // Meta tags básicas
    createdElements.push(updateMeta('name', 'description', seoData.description))
    createdElements.push(updateLink('canonical', seoData.canonical))

    // Open Graph
    const ogTags = [
      ['og:title', seoData.title],
      ['og:description', seoData.description],
      ['og:type', seoData.type || 'website'],
      ['og:url', seoData.canonical],
      ['og:image', seoData.imageAbs],
      ['og:site_name', SITE_NAME],
      ['og:locale', 'pt_BR'],
    ]
    ogTags.forEach(([key, value]) => {
      createdElements.push(updateMeta('property', key, value))
    })

    // Twitter Card
    const twitterTags = [
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', seoData.title],
      ['twitter:description', seoData.description],
      ['twitter:image', seoData.imageAbs],
    ]
    twitterTags.forEach(([key, value]) => {
      createdElements.push(updateMeta('name', key, value))
    })

    // Meta tags adicionais (customizadas via props)
    additionalMeta.forEach(({ name, property, content }) => {
      if (name) createdElements.push(updateMeta('name', name, content))
      if (property) createdElements.push(updateMeta('property', property, content))
    })

    // JSON-LD (Structured Data)
    let ldScript = document.getElementById('ld-json')
    if (seoData.jsonLd) {
      if (!ldScript) {
        ldScript = document.createElement('script')
        ldScript.id = 'ld-json'
        ldScript.type = 'application/ld+json'
        document.head.appendChild(ldScript)
      }
      ldScript.textContent = JSON.stringify(seoData.jsonLd)
      createdElements.push(ldScript)
    } else if (ldScript) {
      ldScript.remove()
    }

    // Cleanup: remove todas as meta tags criadas quando componente desmonta ou rota muda
    return () => {
      createdElements.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, [seoData, additionalMeta])

  return null
}

/**
 * Uso com meta tags adicionais:
 * 
 * <Seo 
 *   additionalMeta={[
 *     { name: 'robots', content: 'index, follow' },
 *     { name: 'author', content: 'AJN Engenharia' },
 *     { property: 'article:author', content: 'https://facebook.com/ajn' }
 *   ]} 
 * />
 */