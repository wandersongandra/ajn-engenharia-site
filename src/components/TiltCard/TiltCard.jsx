import { useRef, useState, useEffect } from 'react'

/**
 * Card com efeito 3D (tilt) que segue o mouse + brilho (glare).
 * 100% CSS/JS nativo, sem biblioteca. Respeita prefers-reduced-motion.
 *
 * @param {number} max - inclinação máxima em graus (padrão 10)
 */
export default function TiltCard({ children, className = '', max = 10 }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const handleMove = (e) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rotateY = (px - 0.5) * 2 * max
    const rotateX = -(py - 0.5) * 2 * max
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`)
    setGlare({ x: px * 100, y: py * 100, o: 0.14 })
  }

  const reset = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')
    setGlare((g) => ({ ...g, o: 0 }))
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative h-full transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d', transform: reduced ? undefined : transform }}
    >
      {children}
      {/* Brilho que segue o cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 55%)`,
          opacity: glare.o > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </div>
  )
}
