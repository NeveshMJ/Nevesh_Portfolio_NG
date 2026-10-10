import { LuArrowUp } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Wordmark } from '../Brand/Brand'
import { NAV } from '../Navbar/Navbar'
import { profile } from '../../data/profile'
import { scrollToSection } from '../../utils/assets'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand"><Wordmark /><p>{profile.roleLine.replace(/\s{2,}/g, ' ')}</p></div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(n.id) }}>{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="footer-right">
          <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <button className="icon-btn" onClick={() => scrollToSection('home')} aria-label="Back to top"><LuArrowUp /></button>
        </div>
      </div>
      <p className="footer-fine container">© {new Date().getFullYear()} {profile.name}. Designed and built with React. Not affiliated with any streaming service.</p>
    </footer>
  )
}
