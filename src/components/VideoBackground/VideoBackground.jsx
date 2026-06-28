import { useState, useRef, useEffect, useMemo } from 'react'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { company } from '../../data/company'

// Ordem definida por impacto visual
const videos = [
  '/videos/video3.mp4',
  '/videos/video4.mp4',
  '/videos/video1.mp4',
]

export default function VideoBackground({ children }) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef(null)
  const hasVideo = videos.length > 0

  // Memoiza os links sociais para limpar o JSX e facilitar manutenção
  const socialLinks = useMemo(() => [
    {
      id: 'linkedin',
      url: company?.social?.linkedin,
      Icon: FaLinkedin,
      className: 'bg-[#0077B5] hover:bg-[#005d8f]',
      label: 'LinkedIn'
    },
    {
      id: 'instagram',
      url: company?.social?.instagram,
      Icon: FaInstagram,
      // Gradiente exato do Instagram usando arbitrary values do Tailwind
      className: 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] hover:opacity-90',
      label: 'Instagram'
    },
    {
      id: 'whatsapp',
      // Sanitiza o número removendo espaços, traços e parênteses para a API do wa.me
      url: company?.whatsapp ? `https://wa.me/${String(company.whatsapp).replace(/\D/g, '')}` : null,
      Icon: FaWhatsapp,
      className: 'bg-[#25D366] hover:bg-[#1db954]',
      label: 'WhatsApp'
    }
  ], [])

  useEffect(() => {
    if (hasVideo && videoRef.current) {
      videoRef.current.load()
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Fallback caso o navegador bloqueie o autoplay (ex: economia de bateria)
          setIsPlaying(false)
        })
      }
    }
  }, [current, hasVideo, isPlaying])

  const togglePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative w-full overflow-hidden bg-black h-[88svh] min-h-[560px] lg:h-auto lg:aspect-[16/9]">

      {/* ── Mídia de fundo ── */}
      {hasVideo ? (
        <video
          ref={videoRef}
          key={current} // Remonta o vídeo para garantir transição limpa e reset do buffer
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted playsInline preload="auto"
          poster="/videos/poster.jpg"
          onEnded={() => setCurrent((prev) => (prev + 1) % videos.length)}
          aria-hidden="true" // Esconde de leitores de tela
          tabIndex={-1}
        >
          <source src={videos[current]} type="video/mp4" />
        </video>
      ) : (
        <img
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          aria-hidden="true"
        />
      )}

      {/* Overlays com pointer-events-none para não bloquear cliques no conteúdo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 sm:to-transparent pointer-events-none" />

      {/* ── Conteúdo Principal ── */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 pt-20 sm:pt-16">
          <div className="max-w-2xl lg:pl-8 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>

      {/* ── Ícones sociais flutuantes ── */}
      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 sm:gap-4">
        {socialLinks.map(({ id, url, Icon, className, label }) =>
          url ? (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${className}`}
            >
              <Icon size={18} className="sm:w-5 sm:h-5" />
            </a>
          ) : null
        )}
      </div>

      {/* ── Controles de Vídeo (Indicadores + Play/Pause) ── */}
      {hasVideo && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">

          {/* Botão Play/Pause (Acessibilidade e UX) */}
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full"
          >
            {isPlaying ? (
              // Ícone de Pausa (Heroicons)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              // Ícone de Play (Heroicons)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Indicadores de navegação */}
          {videos.length > 1 && (
            <div className="flex gap-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${i === current ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Ir para vídeo ${i + 1}`}
                  aria-current={i === current}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}