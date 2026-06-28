import { useState, useEffect } from 'react'

// Carrossel de fotos reais da AJN — preenche o container pai (relativo).
const images = [
  '/images/foto1.jpg',
  '/images/foto2.jpg',
  '/images/foto3.jpg',
  '/images/foto4.jpg',
  '/images/foto5.jpg',
  '/images/foto6.jpg',
  '/images/foto7.jpg',
  '/images/foto8.jpg',
]

export default function ImageBackground() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 8000) // sincronizado com a duração do Ken Burns (8s)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Trabalho da AJN Engenharia"
          className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
            i === current ? 'opacity-100 ken-burns' : 'opacity-0'
          }`}
        />
      ))}
      {/* indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Foto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
