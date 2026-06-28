import { useState, useEffect, useMemo } from 'react'

/**
 * Table of Contents – Sumário dinâmico com scroll spy.
 * Detecta automaticamente qual seção está visível e a destaca no menu.
 * O componente de artigo deve gerar os mesmos IDs (`toc-{index}`) nos <h2>.
 */
export default function TableOfContents({ content }) {
  const [activeId, setActiveId] = useState('')

  // Filtra apenas os h2 e memoiza para evitar recálculos
  const headings = useMemo(() => {
    if (!Array.isArray(content)) return []
    return content
      .map((block, i) => (block.type === 'h2' ? { id: `toc-${i}`, text: block.text } : null))
      .filter(Boolean)
  }, [content])

  // Scroll Spy: observa cada heading e atualiza o ativo quando entra na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        // rootMargin negativo no topo compensa headers fixos da página
        rootMargin: '-100px 0px -66% 0px',
        threshold: 0,
      }
    )

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean)

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [headings])

  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    // Offset para não deixar o heading atrás de headers fixos
    const headerOffset = 96
    const elementPosition = target.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    // Atualiza a URL com hash sem pular (acessibilidade + bookmarking)
    window.history.pushState(null, '', `#${id}`)
  }

  // Não renderiza nada se não houver headings — depois dos hooks (regras de hooks)
  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Sumário do artigo"
      className="sticky top-24 self-start max-w-xs ml-4 hidden lg:block"
    >
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#2d6208] mb-4">
        Neste artigo
      </h3>

      <ul className="space-y-1 text-sm border-l-2 border-gray-200" role="list">
        {headings.map(({ id, text }) => {
          const isActive = activeId === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? 'location' : undefined}
                className={`
                  block pl-4 py-1.5 border-l-2 -ml-0.5 transition-all duration-200
                  ${isActive
                    ? 'border-[#3a7d0a] text-[#2d6208] font-semibold bg-[#3a7d0a]/5'
                    : 'border-transparent text-gray-600 hover:text-[#3a7d0a] hover:border-gray-400'
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]/40 focus-visible:rounded
                `}
              >
                {text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}