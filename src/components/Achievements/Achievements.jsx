import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LuTrophy, LuMedal, LuAward, LuCode, LuArrowUpRight, LuBadgeCheck, LuMaximize2, LuX } from 'react-icons/lu'
import useReveal from '../../hooks/useReveal'
import useFocusTrap from '../../hooks/useFocusTrap'
import { achievements, certifications } from '../../data/achievements'
import { asset } from '../../utils/assets'
import './Achievements.css'

const ICON = { expo: LuTrophy, blaze: LuTrophy, deepblue: LuMedal, leetcode: LuCode }

export default function Achievements() {
  const head = useReveal()
  const grid = useReveal()
  const certs = useReveal()
  const [open, setOpen] = useState(null)
  return (
    <section id="achievements" className="section ach" aria-labelledby="ach-title">
      <div className="ach-glow" aria-hidden="true" />
      <div className="container">
        <div className="reveal" ref={head}>
          <span className="eyebrow">Awards season</span>
          <h2 id="ach-title" className="display section-title">Achievements</h2>
          <p className="section-lead">Competition results and milestones, exactly as listed on the resume.</p>
        </div>

        <ul className="ach-grid reveal" ref={grid}>
          {achievements.map((a, i) => {
            const I = ICON[a.id] || LuAward
            const Tag = a.href ? 'a' : 'div'
            return (
              <li key={a.id} className={`ach-card tone-${a.tone} ach-${i}`} style={{ '--d': `${i * 90}ms` }}>
                <Tag className="ach-inner" {...(a.href ? { href: a.href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${a.title} — ${a.org} (opens in new tab)` } : {})}>
                  <span className="ach-laurel" aria-hidden="true"><I /></span>
                  <span className="ach-kind">{a.kind}</span>
                  <h3 className="display ach-title">{a.title}</h3>
                  <p className="ach-org">{a.org}{a.date ? ` · ${a.date}` : ''}</p>
                  <p className="ach-detail">{a.detail}</p>
                  {a.href && <LuArrowUpRight className="ach-go" />}
                </Tag>
              </li>
            )
          })}
        </ul>

        <div className="certs reveal" ref={certs}>
          <h3 className="block-label"><LuBadgeCheck /> Certifications</h3>
          <ul className="certs-row">
            {certifications.map((c) => (
              <li key={c.id}>
                <button className="ticket" onClick={() => setOpen(c)} aria-label={`${c.title} — view certificate`}>
                  <span className="ticket-stub" aria-hidden="true"><LuAward /></span>
                  <span className="ticket-body"><b>{c.title}</b><small>{c.org}{c.issued ? ` · ${c.issued}` : ''}</small><em>View certificate <LuMaximize2 /></em></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {open && <CertViewer cert={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

/** Lightbox that shows the certificate image on the page instead of sending visitors elsewhere. */
function CertViewer({ cert, onClose }) {
  const ref = useRef(null)
  useFocusTrap(ref, onClose)
  // portal to <body> so no section stacking context or the fixed navbar can sit on top of it
  return createPortal(
    <div className="cert-viewer" role="dialog" aria-modal="true" aria-label={cert.title} onClick={onClose}>
      <span className="cert-spot" aria-hidden="true" />
      <figure className="cert-frame" ref={ref} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn cert-close" onClick={onClose} aria-label="Close certificate" data-autofocus><LuX /></button>
        <div className="cert-glass">
          <img src={asset(cert.image)} alt={`${cert.title} certificate`} />
          <span className="cert-shine" aria-hidden="true" />
        </div>
        <figcaption>
          <span className="cert-badge"><LuBadgeCheck /> Verified credential</span>
          <b className="display">{cert.title}</b>
          <span>{cert.org}{cert.issued ? ` · Issued ${cert.issued}` : ''}</span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  )
}
