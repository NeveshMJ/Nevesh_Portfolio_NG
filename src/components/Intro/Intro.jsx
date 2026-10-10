import { useEffect, useState } from 'react'
import Orb from '../Orb/Orb'
import { profile } from '../../data/profile'
import useReducedMotion from '../../hooks/useReducedMotion'
import './Intro.css'

/**
 * Brief cinematic opener (~2.3s): the orb flies in from deep space, spins, then warps toward the
 * camera and hands over to "Who's watching?". Skippable at any time (click, Enter or Escape);
 * reduced-motion visitors get a short static card.
 */
export default function Intro({ onLeave, onDone }) {
  const reduced = useReducedMotion()
  const [leaving, setLeaving] = useState(false)

  const finish = () => {
    if (leaving) return
    setLeaving(true)
    onLeave?.() // lets the next screen mount underneath, so the fade reveals it rather than the page
    setTimeout(onDone, reduced ? 0 : 650)
  }

  useEffect(() => {
    const t = setTimeout(finish, reduced ? 800 : 1650)
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') finish() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-label={`${profile.name} — portfolio`} onClick={finish}>
      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-orb" aria-hidden="true"><Orb /></div>
      <p className="intro-name">{profile.name}</p>
      <button className="intro-skip" onClick={finish}>Skip</button>
    </div>
  )
}
