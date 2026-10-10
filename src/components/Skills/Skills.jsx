import { useMemo, useState } from 'react'
import { LuArrowRight, LuFilter } from 'react-icons/lu'
import { Icon } from '../common/icons.jsx'
import useReveal from '../../hooks/useReveal'
import { skills, SKILL_CATEGORIES } from '../../data/skills'
import { projects, projectById, allTechnologies } from '../../data/projects'
import './Skills.css'

const ALIAS = { 'React JS': 'React', 'Scikit-learn': 'scikit-learn', 'Express.js': 'Express.js', 'PyTorch': 'PyTorch', 'CI/CD': 'GitHub Actions' }
const techFor = (name) => {
  const n = ALIAS[name] || name
  return allTechnologies.find((t) => t.toLowerCase() === n.toLowerCase())
}

export default function Skills({ onOpen, onFilterTech }) {
  const head = useReveal()
  const [cat, setCat] = useState('All')
  const [picked, setPicked] = useState('Python')

  const cats = useMemo(() => ['All', ...SKILL_CATEGORIES.filter((c) => skills.some((s) => s.category === c))], [])
  const list = useMemo(() => skills.filter((s) => cat === 'All' || s.category === cat), [cat])
  const sel = skills.find((s) => s.name === picked) || list[0]
  const evidence = sel.projects.map(projectById).filter(Boolean)
  const tech = techFor(sel.name)

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="reveal" ref={head}>
          <span className="eyebrow">Technology library</span>
          <h2 id="skills-title" className="display section-title">Skills</h2>
          <p className="section-lead">Everything on the resume, grouped like a streaming library. Pick a technology to see the projects that demonstrate it — no self-rated percentages.</p>
        </div>

        <div className="skills-cats" role="tablist" aria-label="Skill categories">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`skills-cat ${cat === c ? 'is-on' : ''}`} onClick={() => setCat(c)}>
              {c}<small>{c === 'All' ? skills.length : skills.filter((s) => s.category === c).length}</small>
            </button>
          ))}
        </div>

        <div className="skills-layout">
          <ul className="skills-grid" role="list">
            {list.map((s, i) => (
              <li key={s.name} style={{ '--i': Math.min(i, 14) }}>
                <button className={`skill ${sel.name === s.name ? 'is-on' : ''}`} onClick={() => setPicked(s.name)} aria-pressed={sel.name === s.name}>
                  <span className="skill-icon"><Icon name={s.icon} /></span>
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-cat">{s.category}</span>
                  {s.projects.length > 0 && <span className="skill-count">{s.projects.length} {s.projects.length === 1 ? 'project' : 'projects'}</span>}
                </button>
              </li>
            ))}
          </ul>

          <aside className="skill-detail" aria-live="polite" key={sel.name}>
            <span className="skill-detail-icon"><Icon name={sel.icon} /></span>
            <p className="eyebrow">{sel.category}</p>
            <h3 className="display">{sel.name}</h3>
            {sel.note && <p className="skill-note">{sel.note}</p>}
            {evidence.length > 0 ? (
              <>
                <h4 className="block-label">Seen in</h4>
                <ul className="skill-evidence">
                  {evidence.map((p) => (
                    <li key={p.id}><button onClick={() => onOpen(p.id)}><span><b>{p.title}</b><small>{p.tagline}</small></span><LuArrowRight /></button></li>
                  ))}
                </ul>
                {tech && <button className="btn btn-ghost btn-sm" onClick={() => onFilterTech(tech)}><LuFilter /> Filter catalogue by {tech}</button>}
              </>
            ) : (
              <p className="skill-none">Listed on my resume{sel.category === 'UI/UX Design' ? ' from the Big-Si-Bucks Innovation internship' : ''}. No project in the catalogue is tagged with it yet.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
