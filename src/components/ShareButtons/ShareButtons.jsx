import { useState, useMemo, useEffect } from 'react'
import { FaWhatsapp, FaLinkedin, FaLink, FaCheck, FaShareAlt } from 'react-icons/fa'

/**
 * Grupo de botões de compartilhamento para posts de blog.
 * Usa a Web Share API nativa em dispositivos móveis para uma UX superior.
 */
export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  // Detecta suporte à API nativa de compartilhamento (SSR-safe)
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  // Memoiza as URLs e dados para evitar recálculos e re-renders desnecessários
  const shareData = useMemo(() => {
    if (!url) return null

    const safeTitle = title || 'Artigo'
    const message = `Confira este artigo da AJN Engenharia: "${safeTitle}"`

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message} – ${url}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      native: { title: safeTitle, text: message, url }
    }
  }, [url, title])

  const handleCopy = async () => {
    if (!url || copied) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      console.error('Falha ao copiar:', e)
    }
  }

  const handleNativeShare = async () => {
    if (!shareData) return
    try {
      await navigator.share(shareData.native)
    } catch (err) {
      // Ignora erro de cancelamento (quando o usuário fecha o menu nativo)
      if (err.name !== 'AbortError') console.error('Erro ao compartilhar:', err)
    }
  }

  // Não renderiza nada se a URL for inválida
  if (!shareData) return null

  const socialLinks = [
    {
      id: 'whatsapp',
      label: 'Compartilhar no WhatsApp',
      icon: FaWhatsapp,
      href: shareData.whatsapp,
      className: 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm hover:shadow-md',
      text: 'WhatsApp'
    },
    {
      id: 'linkedin',
      label: 'Compartilhar no LinkedIn',
      icon: FaLinkedin,
      href: shareData.linkedin,
      className: 'bg-[#0A66C2] hover:bg-[#084d9c] text-white shadow-sm hover:shadow-md',
      text: 'LinkedIn'
    }
  ]

  return (
    <div
      className="flex flex-wrap gap-3 mt-6 items-center"
      role="group"
      aria-label="Compartilhar artigo"
    >
      {/*  Botão de Share Nativo (Aparece APENAS em dispositivos móveis compatíveis) */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:hidden"
          aria-label="Compartilhar usando opções do dispositivo"
        >
          <FaShareAlt size={14} />
          <span>Compartilhar</span>
        </button>
      )}

      {/*  Links Sociais (Ocultos em mobile se o share nativo estiver ativo para evitar poluição visual) */}
      {socialLinks.map(({ id, label, icon: Icon, href, className, text }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1a2e0a]
            ${className}
            ${canNativeShare ? 'hidden sm:flex' : 'flex'}
          `}
        >
          <Icon size={16} />
          {/* Se o share nativo existir, o botão some no mobile, então o texto pode sumir junto. 
              Se não existir, o texto deve aparecer sempre para garantir usabilidade. */}
          <span className={canNativeShare ? 'hidden sm:inline' : 'inline'}>{text}</span>
        </a>
      ))}

      {/*  Botão Copiar Link */}
      <button
        onClick={handleCopy}
        disabled={copied}
        aria-label={copied ? 'Link copiado para a área de transferência' : 'Copiar link do artigo'}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
          border transition-all duration-300 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1a2e0a]
          ${copied
            ? 'bg-green-50 border-green-300 text-green-700 cursor-default'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
          }
        `}
      >
        {copied ? (
          <>
            <FaCheck size={14} className="text-green-600" />
            <span>Copiado!</span>
          </>
        ) : (
          <>
            <FaLink size={14} />
            <span className="hidden sm:inline">Copiar link</span>
            <span className="sm:hidden">Copiar</span>
          </>
        )}
      </button>
    </div>
  )
}