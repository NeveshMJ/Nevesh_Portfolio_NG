/**
 * Single source of truth for every project card, filter, row and detail view.
 *
 * Every claim below was checked against the resume (Nevesh_Resume_S_H.pdf), the public
 * GitHub repositories (README + source), or the previous portfolio's own project text.
 * Optional fields (problem, workflow, decisions, githubUrl, liveUrl, gallery…) are simply
 * omitted when there is nothing verified to show — the UI hides empty sections.
 *
 * `featured` drives the hero and "Now showing"; `topPick` (1–10) orders the Top Picks row.
 *
 * Fields: id, title, tagline, genres[], date, source, featured, topPick, shortDescription, outcome,
 *         fullDescription, problem, solution, features[], contributions[], workflow[],
 *         decisions[], technologies[], cover{kind,c1,c2}, image, gallery[], githubUrl, liveUrl
 */
export const GENRES = {
  ai: 'AI & Machine Learning',
  fullstack: 'Full-Stack Applications',
  cloud: 'Cloud & DevOps',
}

const GH = 'https://github.com/NeveshMJ'

export const projects = [
  /* ───────────────────────────── Resume projects ───────────────────────────── */
  {
    id: 'self-heal',
    title: 'Self-Heal',
    tagline: 'AI-Powered IT Support Self-Healing Controller',
    genres: ['ai'],
    date: '09 2026',
    source: 'resume',
    featured: true,
    topPick: 1,
    shortDescription:
      'Reads a user-reported IT issue, matches it to the right remediation and decides — by confidence — whether to fix it, ask for more detail, or escalate to a human analyst.',
    outcome: 'Turns IT tickets into automatic fixes, clarifying questions or analyst hand-offs — with a full audit trail.',
    fullDescription:
      'An AI-assisted IT support system. Each ticket is embedded and matched against a department-specific knowledge base. The match confidence drives what happens next: apply the fix automatically inside a sandbox, let an analyst review and override, ask the user follow-up questions, or escalate to a human. Every decision is recorded in an audit log.',
    problem:
      'User-reported IT issues need to be analysed and routed to the right remediation — without auto-running anything when the system is unsure.',
    solution:
      'A semantic matcher scores each ticket against knowledge-base articles and maps the score to one of four confidence bands, each with its own safe behaviour.',
    features: [
      'Semantic matching with sentence embeddings (all-mpnet-base-v2) over a PostgreSQL knowledge base',
      'Four confidence bands: self-heal at 100%, analyst override at 95–99.9%, ask-for-more-info at 81–94.9%, escalate at 80% and below',
      'Exact SOP reference in the ticket is treated as a certain (100%) match within its department',
      'Interpretability: top-3 matching sentences and shared words returned for the UI to highlight',
      'Ask-More rounds (up to 3) with T5-small question generation and a template fallback',
      'Ticket tracking and audit logging of analysis, remediation actions and resolution status',
    ],
    contributions: [
      'Built an AI-assisted IT support system that analyses user-reported issues and identifies suitable remediation actions.',
      'Developed the automated self-healing workflow with confidence-based decision making: resolve automatically, request more information, or escalate to human analysts.',
      'Implemented ticket tracking and audit logging for issue analysis, remediation actions and resolution status.',
    ],
    workflow: [
      { title: 'Ticket', detail: 'A user reports an issue for a department (e.g. Corporate Banking, Laptop Assets, Data Center).' },
      { title: 'Match', detail: 'Ticket text is embedded and compared by cosine similarity with the department’s knowledge-base sentences.' },
      { title: 'Decide', detail: '100% → self-heal · 95–99.9% → analyst override · 81–94.9% → ask more · ≤80% → escalate.' },
      { title: 'Act', detail: 'A whitelisted fix script runs in a locked-down Docker container (30 s timeout, exclusion list checked).' },
      { title: 'Audit', detail: 'Every action and status change is written to the audit log.' },
    ],
    decisions: [
      'Confidence bands instead of one threshold — automation is trusted only at the top, the middle bands keep a human or the user in the loop.',
      'Only whitelisted scripts run, inside a Docker sandbox; articles on an exclusion list can never auto-execute.',
      'Show why a match was made (top sentences + shared words) rather than returning a bare score.',
      'SHA-256 hashes of source files are stored for data provenance.',
    ],
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Sentence Transformers', 'T5', 'Docker', 'React', 'Vite'],
    cover: { kind: 'selfheal', c1: '#3ecf8e', c2: '#b20710' },
    githubUrl: `${GH}/Self-heal`,
  },
  {
    id: 'age-lens',
    title: 'Age Lens',
    tagline: 'AI-Powered Facial Age Estimation System',
    genres: ['ai'],
    date: '07 2026',
    source: 'resume',
    featured: true,
    topPick: 2,
    shortDescription:
      'Predicts age from a face photo with a hybrid classification + regression head, ensembled across three CNN backbones and served through FastAPI.',
    outcome: 'End-to-end ML pipeline — data to trained ensemble to live web app.',
    fullDescription:
      'An end-to-end age-estimation pipeline built on ResNet18/50, EfficientNet-B0 and MobileNetV2. Instead of relying on a single prediction head, each model has a classification head (most likely exact age) and a regression head (continuous age) sharing one CNN backbone; checkpoints are blended into the final estimate. It ships as a local training pipeline, a FastAPI inference backend and a React frontend deployed to Firebase Hosting.',
    problem: 'Estimate a person’s age from a face photo more robustly than a single classifier or a single regressor can.',
    solution:
      'Align faces, train a shared backbone with two heads on a combined loss, evaluate on held-out photos, then ensemble the trained checkpoints behind an API.',
    features: [
      'Hybrid prediction: classification head over 100 age buckets plus a regression head on one shared backbone',
      'Backbones: ResNet18/50, EfficientNet-B0, MobileNetV2 — compared and ensembled',
      'MediaPipe face-landmark alignment to 128×128 so the model learns age, not pose',
      'Honest evaluation: exact accuracy, within-3/5-years accuracy, MAE and RMSE on a held-out test split',
      'FastAPI backend with /upload, /predict (age, range, confidence) and /health endpoints',
      'React + Vite frontend with GitHub Actions deploys to Firebase Hosting (live and per-PR preview channels)',
    ],
    contributions: [
      'Built an end-to-end age-estimation pipeline using ResNet18/50, EfficientNet-B0 and MobileNetV2.',
      'Designed a hybrid prediction approach combining classification and regression outputs instead of a single prediction head.',
      'Built the web frontend that consumes the live prediction API.',
    ],
    workflow: [
      { title: 'Manifest', detail: 'Two labelled photo sets are merged into one manifest; duplicates are flagged.' },
      { title: 'Align', detail: 'MediaPipe landmarks normalise every face to a 128×128 aligned crop.' },
      { title: 'Train', detail: 'Shared backbone + classification and regression heads, combined loss, early stopping on validation loss.' },
      { title: 'Evaluate', detail: 'Classification vs regression compared side by side on the held-out test split.' },
      { title: 'Serve', detail: 'FastAPI detects, aligns and runs the ensemble → age, range and confidence.' },
    ],
    decisions: [
      'Transfer learning from pretrained CNN backbones rather than training from scratch.',
      'Two heads on one backbone: the classifier and regressor see the same features but fail differently, so blending helps.',
      'Ensemble of independently trained checkpoints blended into one final estimate.',
    ],
    technologies: ['Python', 'PyTorch', 'torchvision', 'MediaPipe', 'scikit-learn', 'FastAPI', 'React', 'Vite', 'Firebase', 'GitHub Actions'],
    cover: { kind: 'lens', c1: '#5b86ff', c2: '#8f6bff' },
    githubUrl: `${GH}/AGE_PREDICITON`,
  },
  {
    id: 'greivex',
    title: 'Greivex',
    tagline: 'Citizen Service Management Portal',
    genres: ['ai', 'fullstack'],
    date: '02 2026',
    source: 'resume',
    featured: true,
    topPick: 3,
    shortDescription:
      'A MERN civic-grievance platform where an ML model classifies uploaded photos and routes complaints to the right government department.',
    outcome: 'Citizens report an issue with a photo; the system routes it to the right department and tracks it to resolution.',
    fullDescription:
      'Greivex lets citizens report public-service issues and have them routed automatically. An image-classification model identifies the issue and maps it to a department; text complaints are processed with LLMs and a cloud vision API, with an offline NLP fallback. Citizens, service providers and management each get their own dashboard with a status timeline and email notifications.',
    problem: 'Civic complaints are slow to reach the right department and hard for citizens to track.',
    solution:
      'Classify the complaint on arrival (photo or text), prioritise it, filter duplicates, route it to the department and keep the citizen updated.',
    features: [
      'Photo or text complaints classified into an issue category with a confidence score and mapped to a government department',
      'AI priority levels (Critical, High, Medium, Low) and duplicate / fake-complaint detection',
      'GPS capture with reverse geocoding to auto-fill the locality',
      'Role-based dashboards for citizens, service providers and management',
      'Status timeline with real-time updates, OTP verification and email notifications',
      'JWT authentication with role-based access control',
    ],
    contributions: [
      'Developed an ML model that classifies uploaded images and automatically routes complaint tickets to the appropriate government department.',
      'Built dashboards and complaint-management systems for administrators and citizens.',
      'Developed and deployed a full-stack MERN application using React, Node.js, Express.js and MongoDB.',
    ],
    workflow: [
      { title: 'Report', detail: 'A citizen uploads a live photo or describes the issue; GPS fills in the area.' },
      { title: 'Classify', detail: 'A TensorFlow image classifier (Flask service) returns class, confidence and department; text uses Google Cloud Vision + OpenRouter LLMs with an NLP fallback.' },
      { title: 'Triage', detail: 'Priority is assigned and duplicate / fake complaints are checked.' },
      { title: 'Route', detail: 'The ticket reaches the right department’s service providers.' },
      { title: 'Track', detail: 'Status timeline, dashboards and email notifications keep everyone updated.' },
    ],
    decisions: [
      'A separate Python ML service keeps the model out of the Node.js API, which calls it over HTTP.',
      'An offline NLP fallback keeps classification working when external AI services are unavailable.',
      'Three roles (user, provider, management) enforced with JWT-based access control.',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TensorFlow', 'Flask', 'JWT', 'Google Cloud Vision', 'Nodemailer'],
    cover: { kind: 'civic', c1: '#f5b13d', c2: '#b20710' },
    githubUrl: `${GH}/TNSMP`,
  },
  {
    id: 'clinical-intelligence',
    title: 'Clinical Intelligence',
    tagline: 'Clinical Intelligence Platform · team project',
    genres: ['ai'],
    source: 'github',
    topPick: 4,
    shortDescription: 'A clinical intelligence platform built as a team project.',
    outcome: 'Team-built clinical intelligence platform.',
    fullDescription: 'A clinical intelligence platform developed together with a teammate. See the repository for the full write-up.',
    technologies: ['AI', 'Healthcare'],
    cover: { kind: 'clinical', c1: '#e50914', c2: '#5b86ff' },
    githubUrl: 'https://github.com/Mohanraj1232/clinical-intelligence-platform',
  },
  {
    id: 'paddysense',
    title: 'PaddySense',
    tagline: 'Rice leaf disease detection · repo: Paddy-Detection',
    genres: ['ai', 'fullstack'],
    source: 'github',
    topPick: 5,
    shortDescription:
      'Upload a rice-leaf photo and a MobileNetV2 model classifies it as healthy or diseased, with a confidence score and treatment advice.',
    outcome: 'Helps farmers spot rice leaf disease from a photo and act on it.',
    fullDescription:
      'A full-stack web app for farmers. A React frontend uploads leaf images to a Node.js/Express API, which compresses them and runs a TensorFlow/Keras MobileNetV2 classifier through a Python script. Results — class, confidence and treatment / prevention guidance — are saved to MongoDB and kept in a per-user prediction history.',
    problem: 'Farmers need a quick way to tell whether a rice leaf is diseased and what to do about it.',
    solution: 'A transfer-learned MobileNetV2 classifier behind a simple upload-and-predict web app with stored history.',
    features: [
      'Healthy vs diseased classification with a confidence score (MobileNetV2, 224×224 input)',
      'Treatment and prevention recommendations for each result',
      'Drag-and-drop upload with preview and Sharp image compression',
      'JWT authentication with bcrypt-hashed passwords',
      'Paginated prediction history with delete',
    ],
    workflow: [
      { title: 'Upload', detail: 'The user drops a leaf photo; Multer stores it and Sharp compresses it.' },
      { title: 'Predict', detail: 'Express calls a Python script that runs the MobileNetV2 model and returns JSON.' },
      { title: 'Advise', detail: 'The class and confidence are mapped to treatment and prevention guidance.' },
      { title: 'Save', detail: 'The result is stored in MongoDB Atlas and shown in the user’s history.' },
    ],
    decisions: [
      'Transfer learning with lightweight MobileNetV2 so inference stays fast on modest hardware.',
      'The model runs as a separate Python process, keeping the Node.js API free of ML dependencies.',
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Python', 'TensorFlow', 'Keras', 'OpenCV'],
    cover: { kind: 'leaf', c1: '#3ecf8e', c2: '#f5b13d' },
    githubUrl: `${GH}/Paddy-Detection`,
  },
  {
    id: 'microplastic-detector',
    title: 'Microplastic Detector',
    tagline: 'Cosmetics ingredient scanner',
    genres: ['ai'],
    source: 'github',
    topPick: 6,
    shortDescription:
      'Point a webcam at a cosmetic’s ingredient list — OCR reads it, fuzzy matching flags microplastic ingredients, and the product gets a safety score.',
    outcome: 'Tells you in seconds whether a product lists microplastic ingredients.',
    fullDescription:
      'A Flask web app that captures or uploads a photo of a product’s ingredient label, extracts the text with EasyOCR, and matches each ingredient (with aliases) against a database of microplastic polymers such as PDMS, PMMA, Polyethylene, Nylon and PTFE. Each match lowers the product’s safety score, which maps to Safe, Caution or Not Recommended. Scans are saved to SQLite for history.',
    problem: 'Microplastic ingredients hide behind chemical names and aliases on cosmetic labels.',
    solution: 'OCR the label, normalise the ingredient list, and fuzzy-match it against known microplastic names and aliases.',
    features: [
      'Live webcam feed with capture, plus image upload',
      'Brightness check rejects frames that are too dark or washed out',
      'EasyOCR text extraction with validation that the image really is an ingredient list',
      'RapidFuzz alias matching against a microplastic database (PDMS, PMMA, PE, PTFE, Nylon…)',
      'Safety score with Safe / Caution / Not Recommended levels',
      'Scan history stored in SQLite',
    ],
    workflow: [
      { title: 'Capture', detail: 'Webcam frame or uploaded photo of the ingredient label.' },
      { title: 'Read', detail: 'EasyOCR extracts the text; non-ingredient images are rejected.' },
      { title: 'Match', detail: 'Ingredients are parsed and fuzzy-matched against microplastic names and aliases.' },
      { title: 'Score', detail: 'Each match lowers the score → Safe, Caution or Not Recommended; the scan is saved.' },
    ],
    technologies: ['Python', 'Flask', 'OpenCV', 'EasyOCR', 'RapidFuzz', 'SQLite'],
    cover: { kind: 'scan', c1: '#5b86ff', c2: '#3ecf8e' },
    githubUrl: `${GH}/Microplastic_detecter`,
  },
  {
    id: 'evershop-aws',
    title: 'EverShop on AWS',
    tagline: 'Highly available e-commerce deployment · NULLCLASS internship',
    genres: ['cloud'],
    date: 'Aug 2025',
    source: 'resume',
    shortDescription:
      'Deployed a full-stack e-commerce application (EverShop) on AWS with EC2, S3 and PostgreSQL, behind Auto Scaling and Load Balancers.',
    outcome: 'A production-style, highly available AWS deployment of a full-stack storefront.',
    fullDescription:
      'During the NULLCLASS internship I deployed EverShop, a full-stack e-commerce application, on AWS and configured it for availability and performance.',
    solution: 'EC2 instances behind a Load Balancer with Auto Scaling, connected securely to a PostgreSQL database, with S3 in the stack.',
    features: [
      'Full-stack e-commerce application deployed on AWS (EC2, S3, PostgreSQL)',
      'Auto Scaling and Load Balancers configured for high availability and performance',
      'Secure cloud infrastructure and database connectivity',
    ],
    contributions: [
      'Deployed the full-stack e-commerce application (EverShop) on AWS using EC2, S3 and PostgreSQL.',
      'Configured Auto Scaling and Load Balancers to ensure high availability and performance optimisation.',
      'Implemented secure cloud infrastructure and database connectivity for reliable deployment.',
    ],
    workflow: [
      { title: 'Traffic', detail: 'Requests arrive at the Load Balancer.' },
      { title: 'Compute', detail: 'EC2 instances in an Auto Scaling group run the application.' },
      { title: 'Data', detail: 'The app connects securely to PostgreSQL; S3 is part of the stack.' },
    ],
    technologies: ['AWS EC2', 'AWS S3', 'PostgreSQL', 'Auto Scaling', 'Load Balancer'],
    cover: { kind: 'aws', c1: '#f5b13d', c2: '#5b86ff' },
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    tagline: 'Todo Application · Spring Boot REST API (repo: Todo-List)',
    genres: ['fullstack'],
    source: 'github',
    topPick: 9,
    shortDescription:
      'A secured Spring Boot 4 REST API for todos with JWT authentication, Spring Security and PostgreSQL persistence.',
    outcome: 'A clean Java 21 backend: register, log in, and manage todos behind JWT-protected endpoints.',
    fullDescription:
      'The backend of a todo application written with Spring Boot (Java 21). Users register and log in at /auth; every other endpoint requires a valid JWT, checked by a custom filter. Todos are persisted with Spring Data JPA in PostgreSQL and the API is documented with Swagger UI.',
    features: [
      'Register / login endpoints (/auth/**) issuing signed JWTs',
      'All other routes authenticated; passwords hashed with BCrypt',
      'Todo endpoints under /api/v1/todo: create, read (by id, list, paged), update and delete',
      'Bean Validation on todo input',
      'Interactive API documentation via springdoc OpenAPI (Swagger UI)',
    ],
    workflow: [
      { title: 'Register / Login', detail: 'POST /auth/register and /auth/login; BCrypt-hashed credentials.' },
      { title: 'JWT', detail: 'A signed token is issued and sent with each request.' },
      { title: 'Filter', detail: 'A JWT filter in the Spring Security chain authenticates the caller.' },
      { title: 'Todos', detail: 'Controller → service → JPA repository → PostgreSQL.' },
    ],
    decisions: [
      'Stateless authentication with JWT instead of server-side sessions.',
      'Layered structure (controller, service, repository, models) to keep the API easy to extend.',
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring Data JPA', 'PostgreSQL', 'Maven', 'Swagger'],
    cover: { kind: 'todo', c1: '#8f6bff', c2: '#3ecf8e' },
    githubUrl: `${GH}/Todo-List`,
  },

  /* ─────────────── From the previous portfolio (screenshots + live demos) ─────────────── */
  {
    id: 'code-review',
    title: 'Cloud-Based Code Review Platform',
    tagline: 'Serverless review dashboard on AWS',
    genres: ['cloud'],
    source: 'portfolio',
    topPick: 7,
    shortDescription:
      'A code-review website designed and deployed on AWS S3, Lambda and CodeBuild, with a dashboard for submissions, reviews and automated testing.',
    outcome: 'A cloud-hosted collaborative review workflow with an automated-testing dashboard.',
    fullDescription:
      'A code-review website with a frontend in HTML, CSS and JavaScript, designed and deployed with AWS S3, Lambda and CodeBuild.',
    features: [
      'Collaborative code review',
      'Dashboard for tracking code submissions, reviews and automated testing',
      'Built on AWS cloud services for high availability and performance',
    ],
    technologies: ['AWS S3', 'AWS Lambda', 'AWS CodeBuild', 'HTML', 'CSS', 'JavaScript', 'REST APIs'],
    cover: { kind: 'review', c1: '#5b86ff', c2: '#8f6bff' },
    image: 'assets/projects/codereview-1.webp',
    gallery: ['assets/projects/codereview-1.webp', 'assets/projects/codereview-2.webp', 'assets/projects/codereview-3.webp'],
    githubUrl: `${GH}/cloudd`,
    liveUrl: 'https://cloudd.vercel.app/',
  },
  {
    id: 'edu-connect',
    title: 'Digital College & Student Management System',
    tagline: 'EduConnect · role-based academic platform',
    genres: ['fullstack'],
    source: 'portfolio',
    shortDescription:
      'An integrated platform for student profiles, attendance, internal marks, courses and faculty — with role-based dashboards for admins, faculty and students.',
    outcome: 'One place for attendance, marks and course data, with automated routine processes.',
    fullDescription:
      'A centralised academic-management platform. Secure authentication gives administrators, faculty and students personalised dashboards and permissions, and key processes are automated to reduce manual workload.',
    features: [
      'Centralised student profiles, attendance, internal marks, course details and faculty information',
      'Role-based access for administrators, faculty and students',
      'Automation of attendance tracking, timetable management, notifications and internal assessments',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'JWT', 'JavaScript'],
    cover: { kind: 'shot', c1: '#3ecf8e', c2: '#07070a' },
    image: 'assets/projects/edu-1.webp',
    gallery: ['assets/projects/edu-1.webp', 'assets/projects/edu-2.webp', 'assets/projects/edu-3.webp'],
    liveUrl: 'https://edu-connect1-0.vercel.app/',
  },
  {
    id: 'foodyield',
    title: 'Smart Food Management System',
    tagline: 'FoodYield · surplus-food donation platform',
    genres: ['fullstack'],
    source: 'portfolio',
    shortDescription:
      'A platform connecting hotels and NGOs so surplus food is donated instead of wasted, with a real-time dashboard for requests and donations.',
    outcome: 'Redistributes surplus food from hotels to NGOs with live tracking.',
    fullDescription:
      'A food-donation platform that connects hotels and NGOs, with a real-time dashboard tracking food requests, donations and hotel food waste.',
    features: [
      'Hotel-to-NGO donation of surplus food',
      'Real-time monitoring dashboard for requests, donations and food waste',
      'Google Maps integration',
    ],
    technologies: ['EJS', 'HTML', 'Google Maps API', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'JavaScript'],
    cover: { kind: 'shot', c1: '#f5b13d', c2: '#07070a' },
    image: 'assets/projects/food-1.webp',
    gallery: ['assets/projects/food-1.webp', 'assets/projects/food-2.webp', 'assets/projects/food-3.webp'],
    liveUrl: 'https://deepblue-xcxk.onrender.com/',
  },
  {
    id: 'ecobin',
    title: 'Waste Processing System',
    tagline: 'EcoBin · smart waste management',
    genres: ['fullstack'],
    source: 'portfolio',
    topPick: 8,
    shortDescription:
      'A smart waste-management system with role-based access that integrates IoT-sensed waste levels and analytics to streamline collection.',
    outcome: 'Waste-level monitoring and analytics for better collection planning.',
    fullDescription:
      'A waste-processing system with separate role entry points (admin, head, workers) that integrates IoT sensors to track waste levels in real time and uses data analytics to understand waste patterns.',
    features: [
      'IoT-driven waste-level monitoring in real time',
      'Data analytics on waste patterns for predictive analysis and resource allocation',
      'Role selection on entry (admin, head, workers)',
    ],
    technologies: ['Node.js', 'Express.js', 'EJS', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    cover: { kind: 'bin', c1: '#3ecf8e', c2: '#5b86ff' },
    image: 'assets/projects/ecobin-1.webp',
    gallery: ['assets/projects/ecobin-1.webp', 'assets/projects/ecobin-2.webp', 'assets/projects/ecobin-3.webp'],
    githubUrl: 'https://github.com/prajin1910/EcoBin',
    liveUrl: 'https://ecobin-nu.vercel.app/',
  },
  {
    id: 'techbridge',
    title: 'TechBridge Innovations',
    tagline: 'Company website with REST-backed forms',
    genres: ['fullstack'],
    source: 'portfolio',
    shortDescription:
      'The TechBridge Innovations Private Limited website — responsive UI in HTML, CSS and JavaScript with RESTful APIs behind it.',
    outcome: 'A live company site with a custom UI and API-connected front end.',
    fullDescription:
      'Intuitive user interfaces built with HTML, CSS and JavaScript, plus RESTful APIs connecting the front end and back end.',
    features: [
      'Intuitive UI built with HTML, CSS and JavaScript',
      'RESTful APIs integrating front end and back end',
      'EmailJS for contact messages',
    ],
    technologies: ['Firebase', 'EJS', 'Bootstrap', 'EmailJS', 'Tailwind CSS', 'MySQL'],
    cover: { kind: 'shot', c1: '#8f6bff', c2: '#07070a' },
    image: 'assets/projects/techbridge-1.webp',
    gallery: ['assets/projects/techbridge-1.webp', 'assets/projects/techbridge-2.webp', 'assets/projects/techbridge-3.webp'],
    liveUrl: 'https://techbridgeinnovations.vercel.app/index.html',
  },
]

export const projectById = (id) => projects.find((p) => p.id === id)
export const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].sort((a, b) => a.localeCompare(b))
