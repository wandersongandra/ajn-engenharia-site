import { useState, useEffect } from 'react';

export default function Typewriter({ texts, typeSpeed = 60, deleteSpeed = 30, pauseAfter = 2000 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Reinicia o efeito caso o array `texts` mude durante a vida do componente
  useEffect(() => {
    setTextIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, [texts]);

  const currentText = texts?.[textIndex] || '';

  useEffect(() => {
    let timeout;

    if (isPaused) {
      // Aguarda antes de começar a apagar
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseAfter);
    } else if (isDeleting) {
      if (charIndex === 0) {
        // Terminou de apagar, avança para o próximo texto
        setTextIndex((prev) => (prev + 1) % (texts?.length || 1));
        setIsDeleting(false);
        setIsPaused(false);
      } else {
        // Remove um caractere
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, deleteSpeed);
      }
    } else {
      // Fase de digitação
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, typeSpeed);
      } else {
        // Terminou de digitar, entra em pausa
        setIsPaused(true);
      }
    }

    // Cleanup evita memory leaks e timeouts "fantasmas"
    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    isPaused,
    textIndex,
    texts?.length,
    typeSpeed,
    deleteSpeed,
    pauseAfter,
    currentText.length
  ]);

  // Texto exibido é DERIVADO do estado, eliminando riscos de dessincronização
  const displayText = currentText.slice(0, charIndex);

  // Proteção contra array vazio — AGORA depois dos hooks (regras de hooks)
  if (!texts?.length) return null;

  return (
    <span role="status" aria-live="polite" className="inline-flex items-center">
      {displayText}
      {/* Cursor some durante a digitação reversa para um efeito mais natural */}
      {!isDeleting && <span className="animate-pulse">|</span>}
    </span>
  );
}