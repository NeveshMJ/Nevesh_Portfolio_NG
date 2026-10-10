import { useEffect, useRef } from 'react'
import { MODE_LIST } from '../../data/modes'
import { Icon } from '../common/icons.jsx'
import { Wordmark } from '../Brand/Brand'
import { LuArrowRight } from 'react-icons/lu'
import './ProfileSelector.css'

export default function ProfileSelector({ current, onSelect, onSkip, switching }) {
  const first = useRef(null)
  useEffect(() => {
    first.current?.focus({ preventScroll: true })
    const onKey = (e) => { if (e.key === 'Escape') onSkip() }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('lock')
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('lock') }
  }, [onSkip])

  return (
    <div className="profiles" role="dialog" aria-modal="true" aria-labelledby="profiles-title">
      <div className="profiles-bg" aria-hidden="true" />
      <header className="profiles-head"><Wordmark /></header>
      <main className="profiles-main">
        <h1 id="profiles-title" className="display profiles-title">Who’s exploring?</h1>
        <p className="profiles-sub">Pick a cut — each one reorders and reframes the same portfolio for what you need.</p>
        <ul className="profiles-grid">
          {MODE_LIST.map((m, i) => (
            <li key={m.id} style={{ '--i': i, '--accent': m.color }}>
              <button
                ref={i === 0 ? first : null}
                className={`profile ${current === m.id ? 'is-current' : ''}`}
                onClick={() => onSelect(m.id)}
                aria-label={`${m.label}: ${m.blurb}`}
              >
                <span className="profile-avatar" aria-hidden="true">
                  <span className="profile-avatar-art" />
                  <Icon name={m.icon} />
                </span>
                <span className="profile-name">{m.label}</span>
                <span className="profile-tag">{m.tag}</span>
                <span className="profile-blurb">{m.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-ghost profiles-skip" onClick={onSkip}>
          {switching ? 'Back to portfolio' : 'Skip to portfolio'} <LuArrowRight />
        </button>
      </main>
    </div>
  )
}
