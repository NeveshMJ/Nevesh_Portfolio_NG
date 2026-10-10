import { useCallback, useEffect, useRef, useState } from 'react'
import Intro from './components/Intro/Intro'
import ProfileSelector from './components/ProfileSelector/ProfileSelector'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Catalog, { FILTER_DEFAULT } from './components/Catalog/Catalog'
import Skills from './components/Skills/Skills'
import Achievements from './components/Achievements/Achievements'
import About from './components/About/About'
import ResumeViewer from './components/ResumeViewer/ResumeViewer'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ProjectDetails from './components/ProjectDetails/ProjectDetails'
import { MODES, DEFAULT_MODE } from './data/modes'
import { projectById } from './data/projects'
import { safeGet, safeSet } from './utils/storage'
import { scrollToSection } from './utils/assets'

const hashProject = () => {
  const m = window.location.hash.match(/^#p\/([\w-]+)/)
  return m && projectById(m[1]) ? m[1] : null
}

export default function App() {
  const storedMode = safeGet('localStorage', 'ng.mode')
  // Every visit opens with the orb intro and then "Who's watching?" — except shared project deep links
  const [introDone, setIntroDone] = useState(() => !!hashProject())
  const [introLeaving, setIntroLeaving] = useState(false)
  const [mode, setMode] = useState(() => (MODES[storedMode] ? storedMode : DEFAULT_MODE))
  const [selector, setSelector] = useState(() => !hashProject())
  const [switching, setSwitching] = useState(false)
  const [openId, setOpenId] = useState(hashProject)
  const [filters, setFilters] = useState(FILTER_DEFAULT)
  const pushed = useRef(false)

  const finishIntro = useCallback(() => setIntroDone(true), [])
  const openSelector = useCallback(() => { setSwitching(true); setSelector(true) }, [])

  const chooseMode = useCallback((id) => { setMode(id); safeSet('localStorage', 'ng.mode', id); setSelector(false) }, [])
  const skipSelector = useCallback(() => { safeSet('localStorage', 'ng.mode', mode); setSelector(false) }, [mode])

  // Project dialog <-> URL hash (#p/<id>) so links are shareable and the Back button closes the dialog
  const openProject = useCallback((id) => {
    history.pushState(null, '', `#p/${id}`)
    pushed.current = true
    setOpenId(id)
  }, [])
  const closeProject = useCallback(() => {
    if (pushed.current) { pushed.current = false; history.back() }
    else { history.replaceState(null, '', '#projects'); setOpenId(null) }
  }, [])
  useEffect(() => {
    const onPop = () => { setOpenId(hashProject()) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const filterTech = useCallback((tech) => {
    if (openId) { pushed.current = false; history.replaceState(null, '', '#projects'); setOpenId(null) }
    setFilters({ ...FILTER_DEFAULT, tech })
    requestAnimationFrame(() => scrollToSection('projects'))
  }, [openId])

  // If the page was opened on a deep link, land on the catalogue behind the dialog
  useEffect(() => {
    if (openId && !pushed.current) requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const overlay = !introDone || selector
  const m = MODES[mode]
  const project = openId ? projectById(openId) : null

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
      <div inert={overlay || undefined} aria-hidden={overlay || undefined}>
        <Navbar mode={mode} onMode={chooseMode} onOpenSelector={openSelector} />
        <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
          <Hero mode={m} onOpen={openProject} />
          <Catalog mode={m} filters={filters} setFilters={setFilters} onOpen={openProject} />
          <Skills onOpen={openProject} onFilterTech={filterTech} />
          <Achievements />
          <About onOpen={openProject} />
          <ResumeViewer />
          <Contact />
        </main>
        <Footer />
      </div>

      {project && <ProjectDetails key={project.id} project={project} mode={m} onClose={closeProject} onTech={filterTech} />}
      {!introDone && <Intro onLeave={() => setIntroLeaving(true)} onDone={finishIntro} />}
      {(introDone || introLeaving) && selector &&<ProfileSelector current={MODES[storedMode] ? mode : null} onSelect={chooseMode} onSkip={skipSelector} switching={switching} />}
    </>
  )
}
