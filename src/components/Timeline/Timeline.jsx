import { useRef } from 'react'
import { LuChevronLeft, LuChevronRight, LuArrowRight } from 'react-icons/lu'
import useReveal from '../../hooks/useReveal'
import { timeline } from '../../data/experience'
import './Timeline.css'

const KIND_COLOR = { Education: 'var(--blue)', Internship: 'var(--amber)', Project: 'var(--red-bright)', Achievement: 'var(--green)' }

/** A film-strip: each milestone is a frame. Scrolls sideways on desktop, becomes a vertical reel on mobile. */
export default function Timeline({ onOpen }) {
  const track = useRef(null)
  const ref = useReveal()
  const page = (d) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.7, behavior: 'smooth' })
  return (
    <div className="tl container reveal" ref={ref}>
      <div className="tl-head">
        <div>
          <span className="eyebrow">Education & journey</span>
          <h3 className="display tl-title">The reel</h3>
        </div>
        <div className="tl-ctrl">
          <button className="icon-btn" onClick={() => page(-1)} aria-label="Scroll timeline backwards"><LuChevronLeft /></button>
          <button className="icon-btn" onClick={() => page(1)} aria-label="Scroll timeline forwards"><LuChevronRight /></button>
        </div>
      </div>
      <div className="tl-strip">
        <ol className="tl-track" ref={track} tabIndex={0} aria-label="Timeline of education, internships, projects and achievements">
          {timeline.map((t, i) => (
            <li key={t.id} className="frame" style={{ '--k': KIND_COLOR[t.kind], '--i': i }}>
              <span className="frame-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <time className="frame-date display">{t.date}</time>
              <span className="frame-kind">{t.kind}</span>
              <h4 className="frame-title">{t.title}</h4>
              <p className="frame-place">{t.place}</p>
              {t.points && <ul className="frame-points">{t.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              {t.project && <button className="frame-link" onClick={() => onOpen(t.project)}>Open project <LuArrowRight /></button>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
