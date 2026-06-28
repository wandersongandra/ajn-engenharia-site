import { useRef, useEffect, useState } from 'react'

/**
 * SectionTitle – Cabeçalho de seção com animação de entrada e flexibilidade total.
 *
 * @param {Object} props
 * @param {string} props.tag - Rótulo superior (ex: "NOSSOS SERVIÇOS")
 * @param {string} props.title - Título principal
 * @param {string} props.subtitle - Subtítulo opcional
 * @param {boolean} props.light - Tema claro (fundo escuro)
 * @param {'left'|'center'|'right'} props.align - Alinhamento
 * @param {'h1'|'h2'|'h3'|'h4'} props.as - Tag HTML do título (SEO)
 * @param {'sm'|'md'|'lg'} props.size - Tamanho do título
 * @param {boolean} props.decorated - Mostra linha decorativa sob o tag
 * @param {string} props.className - Classes adicionais do wrapper
 */
export default function SectionTitle({
  tag,
  title,
  subtitle,
  light = false,
  align = 'center',
  as: HeadingTag = 'h2',
  size = 'md',
  decorated = false,
  className = '',
}) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Animação de entrada: fade + slide up quando entra na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Dispara apenas uma vez
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Sistema de variantes (mais limpo que template literals gigantes)
  const variants = {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    size: {
      sm: 'text-xl sm:text-2xl md:text-3xl',
      md: 'text-2xl sm:text-3xl md:text-4xl',
      lg: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    },
    tag: {
      light: 'text-[#5cbf1a] bg-[#5cbf1a]/10 border-[#5cbf1a]/30',
      dark: 'text-[#3a7d0a] bg-green-50 border-green-200',
    },
    title: {
      light: 'text-white',
      dark: 'text-[#0f1e0a]', // Tom ainda mais escuro para contraste WCAG AAA
    },
    subtitle: {
      light: 'text-white/70', // 70% em vez de 55% para melhor legibilidade
      dark: 'text-gray-600',
    },
    decoration: {
      light: 'bg-[#5cbf1a]',
      dark: 'bg-[#3a7d0a]',
    },
  }

  const alignClass = variants.align[align] || variants.align.center
  const sizeClass = variants.size[size] || variants.size.md
  const tagClass = light ? variants.tag.light : variants.tag.dark
  const titleClass = light ? variants.title.light : variants.title.dark
  const subtitleClass = light ? variants.subtitle.light : variants.subtitle.dark
  const decorClass = light ? variants.decoration.light : variants.decoration.dark

  // Suporta título em HTML (ex: "Soluções <span>inteligentes</span>")
  const renderContent = (content) =>
    typeof content === 'string' ? (
      <span dangerouslySetInnerHTML={{ __html: content }} />
    ) : (
      content
    )

  return (
    <header
      ref={sectionRef}
      className={`
        mb-12 md:mb-16 max-w-5xl
        ${align === 'center' ? 'mx-auto' : ''}
        ${alignClass}
        ${className}
      `}
    >
      {/* Animação em camadas: tag → título → subtítulo */}
      <div
        className={`
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        {tag && (
          <div className="inline-flex flex-col items-center gap-2 mb-5">
            <p
              className={`
                inline-block text-xs font-bold uppercase tracking-[0.2em]
                px-4 py-1.5 rounded-full border
                ${tagClass}
              `}
            >
              {tag}
            </p>
            {decorated && (
              <span
                aria-hidden="true"
                className={`
                  block h-0.5 w-10 rounded-full
                  ${decorClass}
                  transition-all duration-1000 delay-300
                  ${isVisible ? 'w-16' : 'w-0'}
                `}
              />
            )}
          </div>
        )}
      </div>

      <div
        className={`
          transition-all duration-700 delay-150 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <HeadingTag
          className={`
            ${sizeClass}
            font-extrabold
            leading-[1.15] tracking-tight
            mb-4
            ${titleClass}
          `}
        >
          {renderContent(title)}
        </HeadingTag>
      </div>

      {subtitle && (
        <div
          className={`
            transition-all duration-700 delay-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <p
            className={`
              text-base sm:text-lg md:text-xl
              leading-relaxed
              max-w-2xl
              ${align === 'center' ? 'mx-auto' : ''}
              ${subtitleClass}
            `}
          >
            {renderContent(subtitle)}
          </p>
        </div>
      )}
    </header>
  )
}