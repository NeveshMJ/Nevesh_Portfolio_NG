import { useEffect } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,iframe,[tabindex]:not([tabindex="-1"])'

/** Traps Tab focus inside `ref`, closes on Escape, locks body scroll and restores focus on unmount. */
export default function useFocusTrap(ref, onClose, active = true) {
  useEffect(() => {
    if (!active) return
    const node = ref.current
    const previous = document.activeElement
    document.body.classList.add('lock')
    const first = node?.querySelector('[data-autofocus]') || node?.querySelector(FOCUSABLE)
    first?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose() }
      if (e.key !== 'Tab' || !node) return
      const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const a = items[0], z = items[items.length - 1]
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('lock')
      previous?.focus?.({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}
