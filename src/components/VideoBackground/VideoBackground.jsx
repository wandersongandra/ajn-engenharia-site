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
    <div className="relative w-full min-h-[280px] sm:min-h-[400px] lg:min-h-[600px] overflow-hidden flex items-center">

      {/* ── Mídia de fundo ── */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      {/* ── Conteúdo (indentado à esquerda) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32">
        <div className="max-w-2xl lg:pl-8">
          {children}
        </div>
      </div>

      {/* ── Ícones sociais flutuantes (círculos com espaço) ── */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        <a href="#" aria-label="LinkedIn"
          className="w-12 h-12 rounded-full bg-[#0077B5] hover:bg-[#005d8f] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all">
          <FaLinkedin size={20} />
        </a>
        <a href="#" aria-label="Instagram"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
          style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
          <FaInstagram size={20} />
        </a>
        <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1db954] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all">
          <FaWhatsapp size={20} />
        </a>
      </div>

      {/* Indicadores de vídeo */}
      {videos.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
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
