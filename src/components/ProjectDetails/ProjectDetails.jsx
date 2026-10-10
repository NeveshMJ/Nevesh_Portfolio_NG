import { useMemo, useRef, useState } from 'react'
import { LuX, LuPlay, LuExternalLink, LuCheck, LuArrowRight, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { FaGithub } from 'react-icons/fa6'
import ProjectCover from '../ProjectCard/ProjectCover'
import useFocusTrap from '../../hooks/useFocusTrap'
import { GENRES } from '../../data/projects'
import { asset } from '../../utils/assets'
import './ProjectDetails.css'

const SOURCE = { resume: 'From the resume', github: 'Public repository', portfolio: 'From the earlier portfolio' }

export default function ProjectDetails({ project, mode, onClose, onTech }) {
  const panel = useRef(null)
  const [closing, setClosing] = useState(false)
  const requestClose = () => {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220)
  }
  useFocusTrap(panel, requestClose)

  const tabs = useMemo(() => {
    const t = [{ id: 'overview', label: 'Overview' }]
    if (project.workflow?.length) t.push({ id: 'architecture', label: 'How it works' })
    if (project.contributions?.length || project.decisions?.length) t.push({ id: 'role', label: 'Role & decisions' })
    t.push({ id: 'stack', label: 'Tech stack' })
    if (project.gallery?.length) t.push({ id: 'gallery', label: 'Screenshots' })
    return t
  }, [project])

  const [tab, setTab] = useState(() => (tabs.some((t) => t.id === mode.modalTab) ? mode.modalTab : 'overview'))
  const [shot, setShot] = useState(0)

  const onTabKey = (e) => {
    const i = tabs.findIndex((t) => t.id === tab)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
      setTab(n.id)
      requestAnimationFrame(() => document.getElementById(`tab-${n.id}`)?.focus())
    }
  }

  return (
    <div className={`modal ${closing ? 'is-closing' : ''}`} onMouseDown={(e) => e.target === e.currentTarget && requestClose()}>
      <div className="modal-panel" ref={panel} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close icon-btn" onClick={requestClose} aria-label="Close project details" data-autofocus><LuX /></button>

        <div className="modal-hero">
          <div className={`modal-hero-art ${project.cover.kind === 'shot' ? 'is-shot' : ''}`}><ProjectCover project={project} eager fit="meet" /></div>
          <span className="modal-hero-shade" aria-hidden="true" />
          <div className="modal-hero-copy">
            <span className="eyebrow">{GENRES[project.genres[0]]}{project.date ? ` · ${project.date}` : ''}</span>
            <h2 id="modal-title" className="display modal-title">{project.title}</h2>
            <p className="modal-tag">{project.tagline}</p>
            <div className="modal-cta">
              {project.githubUrl && <a className="btn btn-light" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><FaGithub /> View on GitHub</a>}
              {project.liveUrl && <a className="btn btn-light" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><LuExternalLink /> Live demo</a>}
              {!project.githubUrl && !project.liveUrl && <span className="chip">{SOURCE[project.source]} · no public link</span>}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-tabs" role="tablist" aria-label="Project sections" onKeyDown={onTabKey}>
            {tabs.map((t) => (
              <button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} tabIndex={tab === t.id ? 0 : -1} className={`modal-tab ${tab === t.id ? 'is-on' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>

          <div className="modal-pane" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} key={tab}>
            {tab === 'overview' && (
              <div className="ov">
                <div className="ov-main">
                  <p className="ov-lead">{project.fullDescription}</p>
                  {project.problem && <Block label="The problem">{project.problem}</Block>}
                  {project.solution && <Block label="The solution">{project.solution}</Block>}
                </div>
                <aside className="ov-side">
                  <h3 className="block-label">Key features</h3>
                  <ul className="ticks">{project.features.map((f) => <li key={f}><LuCheck />{f}</li>)}</ul>
                </aside>
              </div>
            )}

            {tab === 'architecture' && (
              <>
                <h3 className="block-label">Workflow</h3>
                <ol className="flow">
                  {project.workflow.map((s, i) => (
                    <li key={s.title} style={{ '--i': i }}>
                      <span className="flow-n display">{String(i + 1).padStart(2, '0')}</span>
                      <h4>{s.title}</h4>
                      <p>{s.detail}</p>
                      {i < project.workflow.length - 1 && <LuArrowRight className="flow-arrow" aria-hidden="true" />}
                    </li>
                  ))}
                </ol>
              </>
            )}

            {tab === 'role' && (
              <div className="role">
                {project.contributions?.length > 0 && (
                  <div><h3 className="block-label">My contribution</h3><ul className="ticks">{project.contributions.map((c) => <li key={c}><LuCheck />{c}</li>)}</ul></div>
                )}
                {project.decisions?.length > 0 && (
                  <div><h3 className="block-label">Technical decisions</h3><ul className="decisions">{project.decisions.map((d, i) => <li key={d}><span>{i + 1}</span>{d}</li>)}</ul></div>
                )}
              </div>
            )}

            {tab === 'stack' && (
              <>
                <h3 className="block-label">Technologies used</h3>
                <ul className="stack">
                  {project.technologies.map((t) => (
                    <li key={t}><button className="stack-chip" onClick={() => onTech(t)} title={`Show every project that uses ${t}`}>{t}<LuArrowRight /></button></li>
                  ))}
                </ul>
                <p className="stack-note">Select a technology to filter the catalogue by it.</p>
              </>
            )}

            {tab === 'gallery' && (
              <div className="gal">
                <div className="gal-stage">
                  <img src={asset(project.gallery[shot])} alt={`${project.title} screenshot ${shot + 1} of ${project.gallery.length}`} />
                  <button className="gal-nav gal-nav--l icon-btn" onClick={() => setShot((shot + project.gallery.length - 1) % project.gallery.length)} aria-label="Previous screenshot"><LuChevronLeft /></button>
                  <button className="gal-nav gal-nav--r icon-btn" onClick={() => setShot((shot + 1) % project.gallery.length)} aria-label="Next screenshot"><LuChevronRight /></button>
                </div>
                <ul className="gal-thumbs">
                  {project.gallery.map((g, i) => (
                    <li key={g}><button className={i === shot ? 'is-on' : ''} onClick={() => setShot(i)} aria-label={`Show screenshot ${i + 1}`} aria-current={i === shot}><img src={asset(g)} alt="" loading="lazy" /></button></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <p className="modal-source"><LuPlay /> {SOURCE[project.source]}</p>
        </div>
      </div>
    </div>
  )
}

const Block = ({ label, children }) => (
  <div className="block"><h3 className="block-label">{label}</h3><p>{children}</p></div>
)
