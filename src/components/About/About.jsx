import { LuGraduationCap, LuMapPin, LuEye, LuUsers, LuRocket } from 'react-icons/lu'
import Timeline from '../Timeline/Timeline'
import useReveal from '../../hooks/useReveal'
import { profile } from '../../data/profile'
import { asset } from '../../utils/assets'
import './About.css'

const HOW = [
  { icon: LuEye, title: 'Make uncertainty visible', text: 'Self-Heal returns a confidence band and the sentences behind a match; Greivex falls back to offline NLP when external AI is unavailable.' },
  { icon: LuUsers, title: 'Keep a human in the loop where it matters', text: 'Analyst override and escalation paths sit between the model and anything irreversible.' },
  { icon: LuRocket, title: 'Ship end to end', text: 'Data and model → API → UI → deployment: Age Lens runs from raw photos to a hosted web app, EverShop from code to an Auto Scaling AWS setup.' },
]

export default function About({ onOpen }) {
  const a = useReveal()
  const b = useReveal()
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about-grid">
        <figure className="about-photo reveal" ref={a}>
          <div className="about-frame">
            <img src={asset(profile.photo)} alt="Portrait of Nevesh Gokul M J" loading="lazy" width="900" height="1200" />
            <span className="about-grade" aria-hidden="true" />
            <i className="about-corner tl" /><i className="about-corner tr" /><i className="about-corner bl" /><i className="about-corner br" />
          </div>
          <figcaption><b className="display">{profile.name}</b><span><LuMapPin /> {profile.location}</span></figcaption>
        </figure>

        <div className="about-copy reveal" ref={b}>
          <span className="eyebrow">The story so far</span>
          <h2 id="about-title" className="display section-title">About</h2>
          <p className="about-lead">I’m a Computer Science Engineering student at St. Joseph’s Institute of Technology, Chennai — and my recent projects all share one pattern: software that has to <em>decide</em>.</p>
          <p>Self-Heal decides whether to fix an IT ticket, ask for more detail or hand it to a human analyst. Age Lens blends a classifier and a regressor into a single age estimate. Greivex classifies a photo and routes the complaint to the right government department.</p>
          <p>Around the models I work on the plumbing: JWT-secured Spring Boot and FastAPI services, Docker sandboxes, and an AWS deployment with Auto Scaling and Load Balancers from my NULLCLASS internship. A UI/UX internship at Big-Si-Bucks Innovation — Figma, personas, wireframes, reusable components — shapes how I build the front end.</p>

          <ul className="how">
            {HOW.map(({ icon: I, title, text }) => (
              <li key={title}><span><I /></span><div><b>{title}</b><p>{text}</p></div></li>
            ))}
          </ul>

          <div className="edu">
            <h3 className="block-label"><LuGraduationCap /> Education</h3>
            <ul>
              {profile.education.map((e) => (
                <li key={e.school}>
                  <div><b>{e.school}</b><small>{e.degree}</small></div>
                  <div className="edu-meta"><span className="chip">{e.score}</span><span>{e.period}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Timeline onOpen={onOpen} />
    </section>
  )
}
