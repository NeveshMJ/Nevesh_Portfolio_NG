import { memo } from 'react'
import { LuPlay, LuInfo, LuExternalLink } from 'react-icons/lu'
import { FaGithub } from 'react-icons/fa6'
import ProjectCover from './ProjectCover'
import { GENRES } from '../../data/projects'
import './ProjectCard.css'

/**
 * One card component, four treatments so rows never look copy-pasted:
 *  poster    – portrait "Top Picks" card with an oversized rank numeral
 *  landscape – default 16:9 catalogue card
 *  blueprint – drafting-table treatment for cloud / infrastructure work
 *  browser   – window-chrome thumbnail for live web projects
 */
function ProjectCard({ project, variant = 'landscape', rank, mode, onOpen }) {
  const genre = GENRES[project.genres[0]]
  const line = mode?.cardLine === 'outcome' ? project.outcome : project.shortDescription

  return (
    <li className={`pcard pcard--${variant}`} data-card>
      {variant === 'poster' && <span className="pcard-num" aria-hidden="true">{rank}</span>}
      <div className="pcard-inner">
        <div className="pcard-media">
          <ProjectCover project={project} frame={variant === 'browser'} />
          <span className="pcard-shade" aria-hidden="true" />
          {variant === 'blueprint' && <span className="pcard-bp" aria-hidden="true" />}
          <button className="pcard-open" onClick={() => onOpen(project.id)} aria-haspopup="dialog">
            <span className="sr-only">Open details for {project.title}</span>
          </button>
          <div className="pcard-caption">
            <span className="pcard-genre">{variant === 'poster' ? `Top Pick ${rank}` : genre}</span>
            <h3 className="pcard-title display">{project.title}</h3>
            {mode?.showTechOnCards && (
              <ul className="pcard-stack" aria-label="Key technologies">
                {project.technologies.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </div>
        </div>

        <div className="pcard-panel">
          <div className="pcard-actions">
            <button className="pcard-play" onClick={() => onOpen(project.id)} aria-label={`Play ${project.title} details`}><LuPlay /></button>
            {project.githubUrl && (
              <a className="icon-btn" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub (opens in new tab)`}><FaGithub /></a>
            )}
            {project.liveUrl && (
              <a className="icon-btn" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo (opens in new tab)`}><LuExternalLink /></a>
            )}
            <button className="icon-btn pcard-info" onClick={() => onOpen(project.id)} aria-label={`More details about ${project.title}`}><LuInfo /></button>
          </div>
          <p className="pcard-meta">
            <b>{genre}</b>{project.date ? <span>{project.date}</span> : null}
          </p>
          <p className="pcard-desc">{line}</p>
          <ul className="pcard-chips" aria-label="Technologies">
            {project.technologies.slice(0, 4).map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
        </div>
      </div>
    </li>
  )
}
export default memo(ProjectCard)
