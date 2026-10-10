import { useEffect, useMemo, useRef } from 'react'
import { LuPlay, LuFileText } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { Icon } from '../common/icons.jsx'
import Orb from '../Orb/Orb'
import useReducedMotion from '../../hooks/useReducedMotion'
import { profile } from '../../data/profile'
import { skills } from '../../data/skills'
import { scrollToSection } from '../../utils/assets'
import './Hero.css'

const HIGHLIGHTS = ['Java', 'Python', 'React JS', 'Spring Boot', 'FastAPI', 'PyTorch', 'TensorFlow', 'Docker', 'AWS EC2', 'PostgreSQL', 'MongoDB']
const seeded =(n) => { const x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x) }

export default function Hero({ mode, onOpen }) {
  const reduced = useReducedMotion()
  const art = useRef(null)
  const scene = useRef(null)

  // 3D orb follows the pointer
  const tilt = (e) => {
    if (reduced || !scene.current) return
    const r = scene.current.getBoundingClientRect()
    const clamp = (v) => Math.max(-0.5, Math.min(0.5, v))
    const x = clamp((e.clientX - r.left) / r.width - 0.5)
    const y = clamp((e.clientY - r.top) / r.height - 0.5)
    scene.current.style.setProperty('--ry', `${x * 30}deg`)
    scene.current.style.setProperty('--rx', `${-y * 30}deg`)
  }
  const untilt = () => { scene.current?.style.setProperty('--ry', '0deg'); scene.current?.style.setProperty('--rx', '0deg') }

  // restrained parallax
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900)
        art.current?.style.setProperty('--py', `${y * 0.18}px`)
      })
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [reduced])

  const particles = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    left: `${seeded(i + 1) * 100}%`, size: 1 + seeded(i + 40) * 2.6, delay: `${-seeded(i + 80) * 18}s`,
    dur: `${14 + seeded(i + 120) * 16}s`, dx: `${(seeded(i + 160) - 0.5) * 120}px`, o: 0.25 + seeded(i + 200) * 0.5,
  })), [])

  const chips = HIGHLIGHTS.map((n) => skills.find((s) => s.name === n)).filter(Boolean)
  return (
    <section id="home" className="hero" aria-label="Introduction" onMouseMove={tilt} onMouseLeave={untilt}>
      <div className="hero-art" ref={art} aria-hidden="true">
        <span className="hb-blob hb-blob-1" />
        <span className="hb-blob hb-blob-2" />
        <span className="hb-blob hb-blob-3" />
        <span className="hb-beam" />
        <span className="hb-floor" />
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p, i) => (
          <i key={i} style={{ left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur, '--dx': p.dx, '--o': p.o }} />
        ))}
      </div>

      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="hero-badge">N</span>{mode.heroKicker}</p>
          <h1 className="hero-name display" aria-label={profile.name}>
            <span>{profile.firstName}</span>
            <span className="hero-name-2">{profile.lastName}</span>
          </h1>
          <p className="hero-role">{profile.role} <i /> <span className="hero-role-accent">AI & Full-Stack Developer</span></p>
          <p className="hero-summary">{profile.heroSummary}</p>
          <div className="hero-cta">
            <button className="btn btn-light" onClick={() => scrollToSection('projects')}><LuPlay /> Explore Projects</button>
            <button className="btn btn-ghost" onClick={() => scrollToSection('resume')}><LuFileText /> View Resume</button>
            <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)"><FaGithub /></a>
            <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)"><FaLinkedinIn /></a>
            <a className="icon-btn hero-lc" href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode (opens in new tab)"><SiLeetcode /></a>
          </div>
          <ul className="hero-tech" aria-label="Technology highlights">
            {chips.map((s) => <li key={s.name}><Icon name={s.icon} />{s.name}</li>)}
          </ul>
        </div>

        <div className="hero-3d" aria-hidden="true">
          <Orb sceneRef={scene} />
        </div>
      </div>
      <button className="hero-scroll" onClick={() => scrollToSection('projects')} aria-label="Scroll to projects"><span /></button>
    </section>
  )
}
