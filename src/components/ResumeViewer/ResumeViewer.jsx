import { useEffect, useState } from 'react'
import { LuDownload, LuExternalLink, LuFileText, LuMonitorSmartphone } from 'react-icons/lu'
import useReveal from '../../hooks/useReveal'
import { profile } from '../../data/profile'
import { asset } from '../../utils/assets'
import './ResumeViewer.css'

const useMedia = (q) => {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

export default function ResumeViewer() {
  const ref = useReveal()
  const wide = useMedia('(min-width: 900px) and (pointer: fine)')
  const canEmbed = wide && navigator.pdfViewerEnabled !== false
  const url = asset(profile.resume.path)

  return (
    <section id="resume" className="section resume" aria-labelledby="resume-title">
      <div className="container resume-grid reveal" ref={ref}>
        <div className="resume-copy">
          <span className="eyebrow">Now playing</span>
          <h2 id="resume-title" className="display section-title">Resume</h2>
          <p className="section-lead">One page — education, projects, internships, skills, certifications and achievements. Read it here, open it in a tab, or take it with you.</p>
          <div className="resume-file">
            <LuFileText />
            <div><b>{profile.resume.filename}</b><small>PDF · 1 page</small></div>
          </div>
          <div className="resume-cta">
            <a className="btn btn-red" href={url} download={profile.resume.filename}><LuDownload /> Download Resume</a>
            <a className="btn btn-ghost" href={url} target="_blank" rel="noopener noreferrer"><LuExternalLink /> View in new tab</a>
          </div>
          {!canEmbed && <p className="resume-note"><LuMonitorSmartphone /> Inline PDF viewing is limited on this device, so a preview is shown instead.</p>}
        </div>

        <div className="resume-screen">
          <div className="resume-chrome" aria-hidden="true"><i /><i /><i /><span>{profile.resume.filename}</span></div>
          {canEmbed ? (
            <div className="resume-stage">
              {/* preview sits underneath: a real PDF viewer paints over it, anything else still shows the resume */}
              <img className="resume-under" src={asset(profile.resume.preview)} alt="" aria-hidden="true" />
              <object className="resume-pdf" data={`${url}#view=FitH&toolbar=0&navpanes=0`} type="application/pdf" aria-label="Resume PDF viewer">
                <Fallback url={url} />
              </object>
            </div>
          ) : (
            <Fallback url={url} />
          )}
        </div>
      </div>
    </section>
  )
}

function Fallback({ url }) {
  return (
    <a className="resume-fallback" href={url} target="_blank" rel="noopener noreferrer">
      <img src={asset(profile.resume.preview)} alt="Preview of the resume's first page — open the PDF to read it in full" loading="lazy" />
      <span className="btn btn-light btn-sm"><LuExternalLink /> Open the full PDF</span>
    </a>
  )
}
