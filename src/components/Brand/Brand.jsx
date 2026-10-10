import './Brand.css'

/** Original monogram: framed "N" with a play-notch — a nod to a title card, not to any real brand. */
export function Monogram({ size = 40, className = '' }) {
  return (
    <svg className={`monogram ${className}`} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="56" height="56" rx="11" fill="#0a0a0e" stroke="var(--red)" strokeWidth="3" className="mono-frame" />
      <path className="mono-n" d="M19 47V18l26 29V18" fill="none" stroke="var(--text)" strokeWidth="6.5" strokeLinejoin="round" strokeLinecap="square" />
      <path className="mono-play" d="M41 10.5l10 6.5-10 6.5z" fill="var(--red)" />
    </svg>
  )
}

export function Wordmark({ compact = false }) {
  return (
    <span className="wordmark" aria-label="Nevesh Gokul M J">
      <Monogram size={compact ? 30 : 36} />
      <span className="wordmark-text display">
        NEVESH<span className="wordmark-dot" />
      </span>
    </span>
  )
}
