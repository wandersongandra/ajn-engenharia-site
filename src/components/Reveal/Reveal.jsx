import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * Componente de revelação com animação ao entrar na viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo a ser revelado
 * @param {number} props.delay - Atraso antes da animação iniciar (ms)
 * @param {number} props.duration - Duração da animação (ms)
 * @param {'up'|'down'|'left'|'right'|'fade'|'scale'} props.direction - Direção da animação
 * @param {number} props.threshold - Percentual visível para ativar (0-1)
 * @param {number} props.rootMargin - Margem adicional da viewport
 * @param {boolean} props.once - Se true, anima apenas uma vez (padrão: true)
 * @param {string} props.className - Classes CSS adicionais
 * @param {Function} props.onReveal - Callback chamado quando revelado
 * 
 * @example
 * // Uso básico
 * <Reveal><MinhaSecao /></Reveal>
 * 
 * @example
 * // Com delay e direção
 * <Reveal delay={200} direction="left">
 *   <Card />
 * </Reveal>
 * 
 * @example
 * // Com callback
 * <Reveal onReveal={() => console.log('Revelado!')}>
 *   <Conteudo />
 * </Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 800,
  direction = 'up',
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  once = true,
  className = '',
  onReveal,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const hasRevealed = useRef(false)

  // Detecta preferência de movimento reduzido (acessibilidade WCAG 2.1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleReveal = useCallback(() => {
    if (hasRevealed.current && once) return

    setVisible(true)
    hasRevealed.current = true

    if (onReveal) {
      // Aguarda o delay antes de chamar o callback
      setTimeout(onReveal, delay)
    }
  }, [delay, once, onReveal])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Se preferir movimento reduzido, revela imediatamente sem animação
    if (prefersReducedMotion) {
      handleReveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleReveal()
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, handleReveal, prefersReducedMotion])

  // Mapeia direções para transformações iniciais
  const getInitialState = () => {
    if (prefersReducedMotion) return 'opacity-100 translate-y-0 translate-x-0 scale-100'

    const states = {
      up: 'opacity-0 translate-y-12 scale-[0.96]',
      down: 'opacity-0 -translate-y-12 scale-[0.96]',
      left: 'opacity-0 translate-x-12 scale-[0.96]',
      right: 'opacity-0 -translate-x-12 scale-[0.96]',
      fade: 'opacity-0 scale-100',
      scale: 'opacity-0 scale-90',
    }

    return states[direction] || states.up
  }

  const getVisibleState = () => {
    return 'opacity-100 translate-y-0 translate-x-0 scale-100'
  }

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out will-change-[transform,opacity]
        ${visible ? getVisibleState() : getInitialState()}
        ${className}
      `}
      style={{
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        transitionDelay: visible && !prefersReducedMotion ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}