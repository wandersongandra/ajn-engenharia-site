import React, { useState, useEffect } from 'react'

// Fotos reais da AJN — alternam no fundo da seção
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

export default function ImageBackground({ children }) {
  const [current, setCurrent] = useState(0)

  // Avança para a próxima imagem (cíclica)
  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 2000) // troca a cada 2s
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[560px] overflow-hidden flex items-center justify-center">
      {/* Carrossel — proporção 16:9 igual às fotos, evitando cortes */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {children}
      </div>
    </section>
  )
}
