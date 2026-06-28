import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, SITE_NAME, SITE_URL } from '../../utils/seo'

// Cria/atualiza uma <meta> por name ou property
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeo(pathname)
    const imageAbs = seo.image.startsWith('http') ? seo.image : `${SITE_URL}${seo.image}`

    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setLink('canonical', seo.canonical)

    // Open Graph
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:type', seo.type)
    setMeta('property', 'og:url', seo.canonical)
    setMeta('property', 'og:image', imageAbs)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'pt_BR')

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', imageAbs)

    // JSON-LD
    let ld = document.getElementById('ld-json')
    if (seo.jsonLd) {
      if (!ld) {
        ld = document.createElement('script')
        ld.id = 'ld-json'
        ld.type = 'application/ld+json'
        document.head.appendChild(ld)
      }
      ld.textContent = JSON.stringify(seo.jsonLd)
    } else if (ld) {
      ld.remove()
    }
  }, [pathname])

  return null
}
