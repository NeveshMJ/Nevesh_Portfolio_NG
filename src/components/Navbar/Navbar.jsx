import { useEffect, useRef, useState } from 'react'
import { LuMenu, LuX, LuCheck, LuUsers } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Wordmark } from '../Brand/Brand'
import { Icon } from '../common/icons.jsx'
import { MODE_LIST, MODES } from '../../data/modes'
import { profile } from '../../data/profile'
import { scrollToSection } from '../../utils/assets'
import './Navbar.css'

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ mode, onMode, onOpenSelector }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('home')
  const menuRef = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // scroll-spy
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // close menus on outside click / Escape
  useEffect(() => {
    const onDown = (e) => { if (menu && menuRef.current && !menuRef.current.contains(e.target)) setMenu(false) }
    const onKey = (e) => { if (e.key === 'Escape') { setMenu(false); setOpen(false) } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [menu])

  useEffect(() => { document.body.classList.toggle('lock', open) ; return () => document.body.classList.remove('lock') }, [open])

  const go = (id) => (e) => { e.preventDefault(); setOpen(false); scrollToSection(id) }
  const m = MODES[mode]

  return (
    <>
    <header className={`nav ${scrolled || open ? 'is-solid' : ''}`}>
      <nav className="nav-inner" aria-label="Primary">
        <a href="#home" className="nav-brand" onClick={go('home')} aria-label="Home"><Wordmark compact /></a>

        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'true' : undefined}>{n.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a className="nav-social" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)"><FaGithub /></a>
          <a className="nav-social" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)"><FaLinkedinIn /></a>

          <div className="nav-profile" ref={menuRef}>
            <button className="nav-profile-btn" onClick={() => setMenu((v) => !v)} aria-haspopup="true" aria-expanded={menu} aria-label={`Viewing as ${m.label}. Switch profile`} style={{ '--accent': m.color }}>
              <span className="nav-avatar"><Icon name={m.icon} /></span>
              <span className="nav-profile-label">{m.label}</span>
              <span className="caret" aria-hidden="true" />
            </button>
            {menu && (
              <div className="nav-menu" role="menu">
                {MODE_LIST.map((x) => (
                  <button key={x.id} role="menuitemradio" aria-checked={x.id === mode} className="nav-menu-item" style={{ '--accent': x.color }}
                    onClick={() => { onMode(x.id); setMenu(false) }}>
                    <span className="nav-avatar"><Icon name={x.icon} /></span>
                    <span>{x.label}<small>{x.tag}</small></span>
                    {x.id === mode && <LuCheck className="tick" />}
                  </button>
                ))}
                <button className="nav-menu-item nav-menu-all" role="menuitem" onClick={() => { setMenu(false); onOpenSelector() }}>
                  <LuUsers /> <span>Who’s exploring? screen</span>
                </button>
              </div>
            )}
          </div>

          <button className="nav-burger icon-btn" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav">
            {open ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </nav>
    </header>

      <div id="mobile-nav" className={`nav-drawer ${open ? 'is-open' : ''}`} hidden={!open}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ '--i': i }}>
              <a href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'is-active' : ''}>{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-drawer-foot">
          <button className="btn btn-ghost btn-sm" onClick={() => { setOpen(false); onOpenSelector() }}><Icon name={m.icon} /> Viewing as {m.label}</button>
          <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </div>
    </>
  )
}
