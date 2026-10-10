// Storage can throw (private mode, blocked cookies) — never let that break the app.
export const safeGet = (store, key, fallback = null) => {
  try { return window[store].getItem(key) ?? fallback } catch { return fallback }
}
export const safeSet = (store, key, value) => {
  try { window[store].setItem(key, value) } catch { /* ignore */ }
}
