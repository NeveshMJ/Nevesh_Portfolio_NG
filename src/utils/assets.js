// Resolve a path inside /public so it works with any Vite `base` (dev, preview, sub-path hosting).
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`

export const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
