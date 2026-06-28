import { useState, useRef, useEffect } from 'react'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { company } from '../../data/company'

// Ordem definida por impacto visual: o içamento contra o céu abre,
// depois skyline, terraplenagem e fecha com o aéreo do drone.
const videos = [
  '/videos/video3.mp4',
  '/videos/video4.mp4',
  '/videos/video1.mp4',
]

export default function VideoBackground({ children }) {
  const [current, setCurrent] = useState(0)
  const videoRef = useRef(null)
  const hasVideo = videos.length > 0

  useEffect(() => {
    if (hasVideo && videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [current, hasVideo])

  return (
    <div className="relative w-full overflow-hidden bg-black h-[88svh] min-h-[560px] lg:h-[90vh] lg:max-h-[820px]">

      {/* ── Mídia de fundo (object-cover: preenche sem distorcer) ── */}
      {hasVideo ? (
        <video
          ref={videoRef} key={current}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted playsInline
          onEnded={() => setCurrent((prev) => (prev + 1) % videos.length)}
        >
          <source src={videos[current]} type="video/mp4" />
        </video>
      ) : (
        <img
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      )}

      {/* Overlay — horizontal p/ desktop + reforço inferior p/ mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 sm:to-transparent" />

      {/* ── Conteúdo ── */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 pt-20 sm:pt-16">
          <div className="max-w-2xl lg:pl-8">
            {children}
          </div>
        </div>
      </div>

      {/* ── Ícones sociais flutuantes (círculos com espaço) ── */}
      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 sm:gap-4">
        <a href="#" aria-label="LinkedIn"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0077B5] hover:bg-[#005d8f] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all">
          <FaLinkedin size={16} className="sm:w-5 sm:h-5" />
        </a>
        <a href="#" aria-label="Instagram"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
          style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
          <FaInstagram size={16} className="sm:w-5 sm:h-5" />
        </a>
        <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#1db954] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all">
          <FaWhatsapp size={16} className="sm:w-5 sm:h-5" />
        </a>
      </div>

      {/* Indicadores de vídeo */}
      {videos.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {videos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-3 bg-white/40'}`}
              aria-label={`Vídeo ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}
