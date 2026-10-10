# Nevesh Gokul M J — Portfolio (cinematic edition)

A streaming-catalogue style developer portfolio built with **React + Vite** and a hand-written CSS design system.
Visitors pick a *cut* (Recruiter / Developer / Explorer), browse projects in rows, open detail dialogs, explore a
skills library, and view or download the resume.

> Original design and identity — it borrows streaming-platform *browsing patterns* only; no streaming-service logos or assets are used.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
```

Requires Node 18+.

## Deploy

`vite.config.js` uses `base: './'` and navigation is hash-based (`#projects`, `#p/<project-id>`), so `dist/` works on any
static host with no rewrite rules:

* **Vercel / Netlify** — build command `npm run build`, output directory `dist`.
* **GitHub Pages** — publish the contents of `dist/` (works from a repo sub-path too).
* **AWS S3 / CloudFront** — upload `dist/` as a static site.

## Where things live

```
public/resume/Nevesh_Resume_S_H.pdf   ← the original resume, untouched
public/assets/images/                 ← portrait + resume preview image
public/assets/projects/               ← screenshots from the earlier portfolio
src/data/                             ← ALL content (edit here, not in components)
  projects.js  skills.js  achievements.js  experience.js  profile.js  modes.js
src/components/                       ← Intro, ProfileSelector, Navbar, Hero, Catalog, ProjectCard,
                                        ProjectCarousel, ProjectDetails, Skills, Achievements, About,
                                        Timeline, ResumeViewer, Contact, Footer
src/styles/                           ← variables.css (design tokens), global.css, animations.css
```

### Add a project
Append an object to `src/data/projects.js` (fields are documented at the top of the file). Cards, filters, rows,
detail dialog and skill links all read from that one list. Optional fields (`problem`, `workflow`, `decisions`,
`githubUrl`, `liveUrl`, `gallery`…) are simply hidden when absent. For a custom cover, add a `cover.kind` of `shot`
(with `image`) or draw a new SVG in `components/ProjectCard/ProjectCover.jsx`.

### Update the resume
Replace `public/resume/Nevesh_Resume_S_H.pdf`, regenerate `public/assets/images/resume-preview.webp`
(first page as an image, used on mobile / as a fallback) and keep the name in `src/data/profile.js` in sync.

## Features

* **Intro** (~3 s, skippable, remembered per session, static under `prefers-reduced-motion`).
* **Who’s exploring?** — three modes that change the hero feature card, the band above the catalogue
  (key facts / repositories / journey), card content, and which tab the project dialog opens on. Persisted in
  `localStorage`; switch any time from the navbar.
* **Catalogue** — Top Picks (ranked posters), AI & ML, Full-Stack, Cloud & DevOps; four card treatments; arrow
  buttons, touch scrolling, arrow-key navigation; genre / text / technology filters with an empty state.
* **Project dialog** — overview, workflow, role & decisions, tech stack, screenshots; deep-linkable (`#p/self-heal`),
  Back button and Escape close it, focus is trapped and restored.
* **Skills library** — resume skills by category; each links to the projects that evidence it. No self-rated percentages.
* **Resume** — inline PDF viewer on desktop, image preview fallback on touch devices, download button.
* **Contact** — direct links plus a validated form that opens the visitor’s email client (`mailto:`); there is no server,
  so nothing is “sent” until they press send.

## Content integrity

Every project description, stack and feature comes from the resume, the public GitHub repositories
(README + source), or the earlier portfolio’s own text. Nothing was invented: no metrics, awards, dates or links
beyond those sources. Where a source is silent the UI omits the field.

## Fonts

Bebas Neue, Inter and JetBrains Mono are loaded from Google Fonts in `index.html`. To self-host instead:
`npm i @fontsource/bebas-neue @fontsource-variable/inter @fontsource/jetbrains-mono`, import them in `src/main.jsx`
and delete the three `<link>` tags.
