// Pré-renderização para SEO: gera um index.html por rota com <title>/meta/JSON-LD
// corretos (crawlers e WhatsApp/Facebook leem sem rodar JS) + sitemap.xml + robots.txt.
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSeo, getAllRoutes, SITE_URL, SITE_NAME } from '../src/utils/seo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')

const escAttr = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escJsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')
const absImg = (img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)

function buildHead(seo) {
  const img = absImg(seo.image)
  const tags = [
    `<title>${escAttr(seo.title)}</title>`,
    `<meta name="description" content="${escAttr(seo.description)}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:title" content="${escAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escAttr(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:site_name" content="${escAttr(SITE_NAME)}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ]
  if (seo.jsonLd) {
    tags.push(`<script type="application/ld+json">${escJsonLd(seo.jsonLd)}</script>`)
  }
  return tags.join('\n    ')
}

// Remove tags que serão substituídas, evitando duplicidade
function stripOld(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+name="keywords"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^>]*>/gi, '')
}

async function run() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
  const routes = getAllRoutes()

  for (const route of routes) {
    const seo = getSeo(route)
    const html = stripOld(template).replace('</head>', `    ${buildHead(seo)}\n  </head>`)

    const outDir = route === '/' ? DIST : path.join(DIST, route)
    await fs.mkdir(outDir, { recursive: true })
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')
  }

  // sitemap.xml
  const urls = routes
    .map((r) => {
      const loc = `${SITE_URL}${r === '/' ? '' : r}`
      const priority = r === '/' ? '1.0' : r.includes('/blog/') || r.includes('/servicos/') ? '0.7' : '0.8'
      return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
    })
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  // robots.txt
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  await fs.writeFile(path.join(DIST, 'robots.txt'), robots, 'utf8')

  console.log(`✓ Pré-render: ${routes.length} rotas + sitemap.xml + robots.txt`)
}

run().catch((e) => {
  console.error('Falha no pré-render:', e)
  process.exit(1)
})
