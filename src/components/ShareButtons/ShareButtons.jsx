import { useState } from 'react'
import { FaWhatsapp, FaLinkedin, FaLink } from 'react-icons/fa'

/**
 * Simple share button group for a blog post.
 * Props:
 *   - url: absolute URL of the article (including protocol)
 *   - title: article title (used in WhatsApp message)
 */
export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  const whatsappMessage = encodeURIComponent(`Confira este artigo da AJN Engenharia: "${title}" – ${url}`)
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex gap-4 mt-4 items-center text-[#1a2e0a]">
      <a
        href={`https://wa.me/?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1ebc55] text-white transition-colors"
      >
        <FaWhatsapp size={14} />
        <span>WhatsApp</span>
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#084d9c] text-white transition-colors"
      >
        <FaLinkedin size={14} />
        <span>LinkedIn</span>
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-[#1a2e0a] transition-colors"
      >
        <FaLink size={14} />
        <span>{copied ? 'Copiado!' : 'Copiar link'}</span>
      </button>
    </div>
  )
}
