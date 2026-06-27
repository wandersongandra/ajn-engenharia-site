import { useState, useEffect, useCallback } from 'react'

export default function Typewriter({ texts, typeSpeed = 60, deleteSpeed = 30, pauseAfter = 2000 }) {
  const [display, setDisplay] = useState('')
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState('typing')
  const [charIdx, setCharIdx] = useState(0)

  const currentText = texts[i] || ''

  const startNext = useCallback(() => {
    setI((p) => (p + 1) % texts.length)
    setCharIdx(0)
    setPhase('typing')
    setDisplay('')
  }, [texts])

  useEffect(() => {
    if (phase === 'typing') {
      if (charIdx < currentText.length) {
        const t = setTimeout(() => {
          setDisplay(currentText.slice(0, charIdx + 1))
          setCharIdx(charIdx + 1)
        }, typeSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseAfter)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplay(currentText.slice(0, charIdx - 1))
          setCharIdx(charIdx - 1)
        }, deleteSpeed)
        return () => clearTimeout(t)
      } else {
        startNext()
      }
    }
  }, [phase, charIdx, currentText, typeSpeed, deleteSpeed, pauseAfter, startNext])

  return <span>{display}<span className="animate-pulse">|</span></span>
}
