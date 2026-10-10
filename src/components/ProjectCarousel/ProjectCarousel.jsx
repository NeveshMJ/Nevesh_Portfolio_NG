import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import useReveal from '../../hooks/useReveal'
import './ProjectCarousel.css'

/** Horizontal row: arrow buttons (desktop), native touch scrolling + snap (mobile), arrow-key roving between cards. */
export default function ProjectCarousel({ title, kicker, children, count }) {
  const scroller = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const labelId = useId()
  const reveal = useReveal()

  const measure = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    measure()
    const el = scroller.current
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => { el.removeEventListener('scroll', measure); ro.disconnect() }
  }, [measure, count])

  const page = (dir) => {
    const el = scroller.current
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const cards = [...scroller.current.querySelectorAll('.pcard-open')]
    const i = cards.indexOf(document.activeElement)
    if (i < 0) return
    const next = cards[i + (e.key === 'ArrowRight' ? 1 : -1)]
    if (next) { e.preventDefault(); next.focus() }
  }

  return (
    <section className="row reveal" ref={reveal} aria-labelledby={labelId}>
      <div className="row-head container">
        <h3 id={labelId} className="row-title">{title}</h3>
        {kicker && <span className="row-kicker">{kicker}</span>}
        <span className="row-hint" aria-hidden="true">Explore all <LuChevronRight /></span>
      </div>
      <div className="row-body">
        <button className="row-arrow row-arrow--l" onClick={() => page(-1)} disabled={edge.start} aria-label={`Scroll ${title} left`}><LuChevronLeft /></button>
        <ul className="row-track" ref={scroller} onKeyDown={onKeyDown} tabIndex={-1}>{children}</ul>
        <button className="row-arrow row-arrow--r" onClick={() => page(1)} disabled={edge.end} aria-label={`Scroll ${title} right`}><LuChevronRight /></button>
      </div>
    </section>
  )
}
