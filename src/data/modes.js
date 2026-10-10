// Visitor "profiles" — each one changes what the site emphasises, not just a label.
export const MODES = {
  recruiter: {
    id: 'recruiter',
    label: 'Recruiter',
    tag: 'The 60-second overview',
    blurb: 'Strongest projects, outcomes, resume, certifications and contact — fast.',
    color: '#b20710',
    icon: 'LuBriefcase',
    heroKicker: 'Now showing · Recruiter cut',
    modalTab: 'overview',
    cardLine: 'outcome', // cards lead with the outcome
    showTechOnCards: false,
    band: 'glance',
  },
  developer: {
    id: 'developer',
    label: 'Developer',
    tag: 'Under the hood',
    blurb: 'Architecture, stacks, design decisions and repositories — straight to the code.',
    color: '#5b86ff',
    icon: 'LuTerminal',
    heroKicker: 'Now showing · Developer cut',
    modalTab: 'architecture',
    cardLine: 'short',
    showTechOnCards: true,
    band: 'repos',
  },
  explorer: {
    id: 'explorer',
    label: 'Explorer',
    tag: 'The full experience',
    blurb: 'Rotating spotlights, galleries, the journey so far — browse it like a catalogue.',
    color: '#8f6bff',
    icon: 'LuCompass',
    heroKicker: 'Now showing · Director’s cut',
    modalTab: 'overview',
    cardLine: 'short',
    showTechOnCards: false,
    band: 'journey',
  },
}
export const MODE_LIST = Object.values(MODES)
export const DEFAULT_MODE = 'recruiter'
