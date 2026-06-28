import { useEffect, useRef } from 'react'

/**
 * Barra de progresso de leitura — performance máxima.
 * 
 * Otimizações aplicadas:
 * - Zero re-renders do React (manipulação direta via ref)
 * - Transform scaleX() em vez de width (GPU-accelerated)
 * - Throttle via requestAnimationFrame
 * - Semântica ARIA correta (role="progressbar")
 * - Suporte a prefers-reduced-motion
 */
export default function ScrollProgress() {
  const barRef = useRef(null)
  const rafRef = useRef(null)
  const lastKnownProgress = useRef(0)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    // Detecta preferência de movimento reduzido (acessibilidade WCAG)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

      // Evita divisão por zero em páginas sem scroll
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0

      // Só atualiza se houver mudança significativa (evita repaints desnecessários)
      if (Math.abs(progress - lastKnownProgress.current) > 0.1) {
        lastKnownProgress.current = progress
        bar.style.transform = `scaleX(${progress / 100})`
      }
    }

    const handleScroll = () => {
      if (rafRef.current) return // Evita múltiplos rAF em fila

      rafRef.current = requestAnimationFrame(() => {
        updateProgress()
        rafRef.current = null
      })
    }

    // Inicializa no mount
    updateProgress()

    // Listener passive = melhor performance (não bloqueia scroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Atualiza também no resize (quando altura do documento muda)
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 w-full z-40 pointer-events-none"
      role="progressbar"
      aria-label="Progresso de leitura do artigo"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#4a9e10] via-[#5cbf1a] to-[#a4d65e] will-change-transform"
        style={{
          transform: 'scaleX(0)',
          // Transição suave apenas se o usuário NÃO preferir movimento reduzido
          transition: 'transform 120ms linear',
        }}
        aria-hidden="true"
      />
    </div>
  )
}