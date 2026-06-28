import { useEffect, useState } from 'react'

/**
 * Thin progress bar that fills from left to right as the user scrolls the page.
 * Used on blog post pages to give a subtle reading‑progress indicator.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrolled)
    }
    // Attach listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initialize on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 h-1 w-full z-40 pointer-events-none">
      <div
        className="h-full bg-[#a4d65e] transition-all duration-150 ease-linear"
        style={{ width: `${progress}%` }}
        aria-label="Leitura do artigo – barra de progresso"
      />
    </div>
  )
}
