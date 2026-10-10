import { useMemo } from 'react'
import { LuSearch, LuX, LuArrowRight, LuDownload, LuTrophy, LuAward, LuCode } from 'react-icons/lu'
import { FaGithub } from 'react-icons/fa6'
import ProjectCard from '../ProjectCard/ProjectCard'
import ProjectCarousel from '../ProjectCarousel/ProjectCarousel'
import useReveal from '../../hooks/useReveal'
import { projects, GENRES, allTechnologies } from '../../data/projects'
import { timeline } from '../../data/experience'
import { profile } from '../../data/profile'
import { asset, scrollToSection } from '../../utils/assets'
import './Catalog.css'

const variantFor = (p, rowKey) => {
  if (rowKey === 'top') return 'poster'
  if (p.genres.includes('cloud')) return 'blueprint'
  if (p.cover.kind === 'shot') return 'browser'
  return 'landscape'
}

export const FILTER_DEFAULT = { genre: 'all', query: '', tech: '' }

export default function Catalog({ mode, filters, setFilters, onOpen }) {
  const head = useReveal()
  const topPicks = useMemo(() => projects.filter((p) => p.topPick).sort((a, b) => a.topPick - b.topPick), [])
  const active = filters.genre !== 'all' || filters.query.trim() || filters.tech
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }))

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return projects.filter((p) => {
      if (filters.genre !== 'all' && !p.genres.includes(filters.genre)) return false
      if (filters.tech && !p.technologies.includes(filters.tech)) return false
      if (q) {
        const hay = [p.title, p.tagline, p.shortDescription, ...p.technologies].join(' ').toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [filters])

  const rows = [
    { key: 'top', title: 'Top Picks', kicker: 'Start here', items: topPicks },
    { key: 'ai', title: GENRES.ai, kicker: 'Models · embeddings · pipelines', items: projects.filter((p) => p.genres.includes('ai')) },
    { key: 'fullstack', title: GENRES.fullstack, kicker: 'APIs · dashboards · live apps', items: projects.filter((p) => p.genres.includes('fullstack')) },
    { key: 'cloud', title: GENRES.cloud, kicker: 'AWS · deployment', items: projects.filter((p) => p.genres.includes('cloud')) },
  ].filter((r) => r.items.length)

  return (
    <section id="projects" className="section catalog" aria-labelledby="projects-title">
      <div className="container catalog-head reveal" ref={head}>
        <span className="eyebrow">The catalogue</span>
        <h2 id="projects-title" className="display section-title">Projects</h2>
        <p className="section-lead">{projects.length} titles — AI systems, full-stack products and cloud deployments. Open any card for the problem, the build and the stack.</p>
      </div>

      {/* browse bar */}
      <div className="container">
        <div className="browse" role="search" aria-label="Filter projects">
          <div className="browse-chips" role="group" aria-label="Genre">
            {[['all', 'All'], ...Object.entries(GENRES)].map(([k, label]) => (
              <button key={k} className={`browse-chip ${filters.genre === k ? 'is-on' : ''}`} aria-pressed={filters.genre === k} onClick={() => set({ genre: k })}>{label}</button>
            ))}
          </div>
          <div className="browse-fields">
            <label className="browse-search">
              <LuSearch aria-hidden="true" />
              <span className="sr-only">Search projects or technologies</span>
              <input type="search" placeholder="Search titles or tech…" value={filters.query} onChange={(e) => set({ query: e.target.value })} />
            </label>
            <label className="browse-select">
              <span className="sr-only">Filter by technology</span>
              <select value={filters.tech} onChange={(e) => set({ tech: e.target.value })}>
                <option value="">Any technology</option>
                {allTechnologies.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            {active && <button className="btn btn-ghost btn-sm" onClick={() => setFilters(FILTER_DEFAULT)}><LuX /> Clear</button>}
          </div>
        </div>
      </div>

      {active ? (
        <div className="container results" aria-live="polite">
          <p className="results-count">{results.length} {results.length === 1 ? 'title' : 'titles'}{filters.tech ? <> using <b>{filters.tech}</b></> : null}</p>
          {results.length ? (
            <ul className="results-grid">
              {results.map((p) => <ProjectCard key={p.id} project={p} variant={variantFor(p, 'grid')} mode={mode} onOpen={onOpen} />)}
            </ul>
          ) : (
            <div className="empty">
              <LuSearch />
              <h3 className="display">Nothing in the catalogue matches</h3>
              <p>Try a different keyword or technology — or clear the filters to see every title.</p>
              <button className="btn btn-light btn-sm" onClick={() => setFilters(FILTER_DEFAULT)}>Show all projects</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="rows">
            {rows.map((r) => (
              <ProjectCarousel key={r.key} title={r.title} kicker={r.kicker} count={r.items.length}>
                {r.items.map((p, i) => <ProjectCard key={`${r.key}-${p.id}`} project={p} rank={i + 1} variant={variantFor(p, r.key)} mode={mode} onOpen={onOpen} />)}
              </ProjectCarousel>
            ))}
          </div>

          <Band mode={mode} onOpen={onOpen} />
        </>
      )}
    </section>
  )
}

/** Mode-specific band above the rows — the clearest place the three profiles diverge. */
function Band({ mode, onOpen }) {
  const ref = useReveal()
  if (mode.band === 'glance') {
    return (
      <div className="container band reveal" ref={ref}>
        <div className="band-card band-glance">
          <ul className="band-stats">
            {profile.stats.map((s) => <li key={s.label}><b className="display">{s.value}</b><span>{s.label}</span></li>)}
          </ul>
          <div className="band-actions">
            <a className="btn btn-red btn-sm" href={asset(profile.resume.path)} download={profile.resume.filename}><LuDownload /> Download resume</a>
            <button className="btn btn-ghost btn-sm" onClick={() => scrollToSection('achievements')}><LuTrophy /> Wins & certifications</button>
          </div>
        </div>
      </div>
    )
  }
  if (mode.band === 'repos') {
    const repos = projects.filter((p) => p.githubUrl)
    return (
      <div className="container band reveal" ref={ref}>
        <div className="band-card band-repos">
          <h3 className="band-title"><LuCode /> Source, one click away</h3>
          <ul>
            {repos.map((p) => (
              <li key={p.id}>
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub /><code>{p.githubUrl.replace('https://github.com/', '')}</code>
                  <span>{p.technologies.slice(0, 3).join(' · ')}</span><LuArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  const reel = timeline.filter((t) => t.kind !== 'Education').slice(-6)
  return (
    <div className="container band reveal" ref={ref}>
      <div className="band-card band-journey">
        <h3 className="band-title"><LuAward /> The journey so far</h3>
        <ol>
          {reel.map((t) => (
            <li key={t.id}>
              <button onClick={() => (t.project ? onOpen(t.project) : scrollToSection('about'))}>
                <small>{t.date}</small><span>{t.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
