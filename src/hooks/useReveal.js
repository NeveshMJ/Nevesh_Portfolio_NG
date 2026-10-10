import { useEffect, useRef } from 'react'

/** Adds `.in` to the element once it scrolls into view (CSS handles the animation). */
export default function useReveal(options = { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ref
}
