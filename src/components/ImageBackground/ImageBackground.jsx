import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

// Carrossel de fotos reais da AJN — curadas (melhores tomadas).
// Removidas foto1 (parede de tela) e foto6 (lixeiras) por não valorizarem a seção.
const images = [
  { src: '/images/foto3.jpg', alt: 'Equipe AJN Engenharia uniformizada em canteiro de obras' },
  { src: '/images/foto5.jpg', alt: 'Gestão à vista com Permissão de Trabalho e APR preenchidas' },
  { src: '/images/foto8.jpg', alt: 'Operação de içamento com guindaste em obra industrial' },
  { src: '/images/foto2.jpg', alt: 'Canteiro de obras organizado com sinalização de segurança' },
  { src: '/images/foto7.jpg', alt: 'Rigging e movimentação de carga pesada em obra' },
  { src: '/images/foto4.jpg', alt: 'Escavadeira hidráulica em operação de terraplenagem' },
]

export default function ImageBackground() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  const total = images.length

  // Navegação memoizada para não recriar funções em cada render
  const goTo = useCallback((index) => {
    setCurrent(((index % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Preload inteligente da próxima imagem para transição suave sem flicker
  useEffect(() => {
    const nextIndex = (current + 1) % total
    const img = new Image()
    img.src = images[nextIndex].src
  }, [current, total])

  // Intervalo do carrossel — respeita pausa do usuário e visibilidade da aba
  useEffect(() => {
    if (isPaused || !isVisible || total === 0) return

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 8000) // sincronizado com Ken Burns (8s)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, isVisible, total])

  // Page Visibility API — pausa automaticamente quando o usuário muda de aba
  // Economiza bateria e CPU em dispositivos móveis
  useEffect(() => {
    const handleVisibility = () => setIsVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Navegação por teclado (setas ← → e Home/End)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement) &&
        document.activeElement !== document.body) return

      switch (e.key) {
        case 'ArrowRight': next(); break
        case 'ArrowLeft': prev(); break
        case 'Home': goTo(0); break
        case 'End': goTo(total - 1); break
        default: return
      }
      e.preventDefault()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev, goTo, total])

  // Fallback se não houver imagens
  if (total === 0) return null

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeria de obras da AJN Engenharia"
      className="absolute inset-0 overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Imagens — apenas a atual e a próxima/ anterior são renderizadas com qualidade */}
      {images.map((image, i) => {
        const isActive = i === current
        const isNear = Math.abs(i - current) <= 1 || (current === 0 && i === total - 1) || (current === total - 1 && i === 0)

        return (
          <img
            key={image.src}
            src={image.src}
            alt={isActive ? image.alt : ''}
            aria-hidden={!isActive}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
            className={`
              w-full h-full object-cover object-center absolute inset-0
              transition-opacity duration-[1600ms] ease-in-out
              ${isActive ? 'opacity-100 ken-burns' : 'opacity-0'}
              ${!isNear ? 'scale-105 blur-sm' : ''}
            `}
            style={{
              // Só anima Ken Burns na imagem ativa para economizar GPU
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
        )
      })}

      {/* Botão Play/Pause discreto — acessibilidade WCAG */}
      <button
        onClick={() => setIsPaused((p) => !p)}
        aria-label={isPaused ? 'Reproduzir carrossel' : 'Pausar carrossel'}
        className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center 
                   bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white
                   transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {isPaused ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        )}
      </button>

      {/* Indicadores com área de toque adequada (44px) — Apple HIG + WCAG */}
      <div
        role="tablist"
        aria-label="Selecionar foto"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-1"
      >
        {images.map((image, i) => (
          <button
            key={image.src}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ver ${image.alt}`}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-center p-2 focus:outline-none"
          >
            {/* Área clicável invisível (44px) respeita WCAG 2.5.5 Target Size */}
            <span
              className={`
                block h-1.5 rounded-full transition-all duration-300 ease-out
                ${i === current
                  ? 'w-8 bg-white'
                  : 'w-3 bg-white/50 group-hover:bg-white/80'
                }
              `}
              aria-hidden="true"
            />
            {/* Anel de foco visível para navegação por teclado */}
            <span className="absolute inset-0 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" />
          </button>
        ))}
      </div>

      {/* Live region anuncia mudança para leitores de tela */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Foto {current + 1} de {total}: {images[current].alt}
      </div>
    </div>
  )
}