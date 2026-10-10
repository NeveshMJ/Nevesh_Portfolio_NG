import { useState } from 'react'
import { LuMail, LuPhone, LuMapPin, LuSend, LuCopy, LuCheck, LuArrowUpRight } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import useReveal from '../../hooks/useReveal'
import { profile } from '../../data/profile'
import './Contact.css'

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: LuMail, ext: false },
  { label: 'LinkedIn', value: 'nevesh-gokul', href: profile.links.linkedin, icon: FaLinkedinIn, ext: true },
  { label: 'GitHub', value: 'NeveshMJ', href: profile.links.github, icon: FaGithub, ext: true },
  { label: 'LeetCode', value: '_Nevesh_06', href: profile.links.leetcode, icon: SiLeetcode, ext: true },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: LuPhone, ext: false },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const ref = useReveal()
  const [vals, setVals] = useState({ name: '', email: '', message: '' })
  const [errs, setErrs] = useState({})
  const [status, setStatus] = useState('idle') // idle | ready
  const [copied, setCopied] = useState(false)

  const validate = (v) => {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address so I can reply.'
    if (v.message.trim().length < 10) e.message = 'Tell me a little more (at least 10 characters).'
    return e
  }
  const onChange = (k) => (ev) => {
    const next = { ...vals, [k]: ev.target.value }
    setVals(next)
    if (errs[k]) setErrs(validate(next))
  }
  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate(vals)
    setErrs(e)
    if (Object.keys(e).length) { setStatus('idle'); document.querySelector('[aria-invalid="true"]')?.focus(); return }
    // No backend is configured, so this is honest about what happens: it hands off to the visitor's email app.
    const subject = encodeURIComponent(`Portfolio enquiry from ${vals.name.trim()}`)
    const body = encodeURIComponent(`${vals.message.trim()}\n\n— ${vals.name.trim()} (${vals.email.trim()})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('ready')
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { /* clipboard unavailable */ }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact-grid reveal" ref={ref}>
        <div className="contact-copy">
          <span className="eyebrow">Final scene</span>
          <h2 id="contact-title" className="display contact-title">Let’s build something worth watching.</h2>
          <p className="section-lead">Reach out about software engineering roles, internships or collaborations in AI/ML, full-stack and cloud work.</p>
          <p className="contact-loc"><LuMapPin /> {profile.location}</p>
          <ul className="contact-links">
            {LINKS.map(({ label, value, href, icon: I, ext }) => (
              <li key={label}>
                <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={`${label}: ${value}${ext ? ' (opens in new tab)' : ''}`}>
                  <span className="contact-ico"><I /></span>
                  <span><small>{label}</small><b>{value}</b></span>
                  <LuArrowUpRight className="contact-go" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby="form-note">
          <h3 className="display">Send a message</h3>
          <Field id="cf-name" label="Your name" error={errs.name}><input id="cf-name" autoComplete="name" value={vals.name} onChange={onChange('name')} aria-invalid={!!errs.name} aria-describedby={errs.name ? 'cf-name-err' : undefined} /></Field>
          <Field id="cf-email" label="Your email" error={errs.email}><input id="cf-email" type="email" autoComplete="email" value={vals.email} onChange={onChange('email')} aria-invalid={!!errs.email} aria-describedby={errs.email ? 'cf-email-err' : undefined} /></Field>
          <Field id="cf-message" label="Message" error={errs.message}><textarea id="cf-message" rows="5" value={vals.message} onChange={onChange('message')} aria-invalid={!!errs.message} aria-describedby={errs.message ? 'cf-message-err' : undefined} /></Field>
          <div className="form-actions">
            <button className="btn btn-red" type="submit"><LuSend /> Compose email</button>
            <button className="btn btn-ghost" type="button" onClick={copy}>{copied ? <><LuCheck /> Copied</> : <><LuCopy /> Copy email address</>}</button>
          </div>
          <p id="form-note" className="form-note" role="status">
            {status === 'ready'
              ? 'Your email app should now be open with the message filled in — nothing is sent until you press send there. If it didn’t open, copy my address and paste it into your mail client.'
              : 'This opens your email app with the message pre-filled (there’s no server involved, so nothing is sent until you hit send).'}
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="field-err" id={`${id}-err`}>{error}</p>}
    </div>
  )
}
