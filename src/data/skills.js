/**
 * Skills are exactly those listed on the resume. `projects` links a skill to projects whose
 * verified stack/source uses it; `note` appears only when a project supports the sentence.
 * No proficiency percentages — evidence only.
 */
export const SKILL_CATEGORIES = [
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'AI & Machine Learning',
  'Cloud & DevOps',
  'Databases',
  'Developer Tools',
  'UI/UX Design',
  'Architecture',
]

export const skills = [
  // Languages
  { name: 'Java', icon: 'SiOpenjdk', category: 'Programming Languages', note: 'Spring Boot REST API with JWT security (TaskFlow).', projects: ['taskflow'] },
  { name: 'Python', icon: 'SiPython', category: 'Programming Languages', note: 'ML pipelines, FastAPI services and the embedding matcher.', projects: ['self-heal', 'age-lens', 'greivex'] },
  { name: 'SQL', icon: 'LuDatabase', category: 'Programming Languages', note: 'PostgreSQL schema for the Self-Heal knowledge base and audit log.', projects: ['self-heal'] },

  // Frontend
  { name: 'HTML5', icon: 'SiHtml5', category: 'Frontend Development', projects: ['code-review', 'foodyield', 'techbridge'] },
  { name: 'CSS3', icon: 'SiCss', category: 'Frontend Development', projects: ['code-review', 'techbridge'] },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'Frontend Development', projects: ['code-review', 'edu-connect', 'foodyield'] },
  { name: 'React JS', icon: 'SiReact', category: 'Frontend Development', note: 'Interfaces for Greivex, Age Lens and Self-Heal.', projects: ['greivex', 'age-lens', 'self-heal', 'edu-connect'] },

  // Backend
  { name: 'Spring Boot', icon: 'SiSpringboot', category: 'Backend Development', note: 'Layered REST API (controller → service → JPA repository).', projects: ['taskflow'] },
  { name: 'Spring Security', icon: 'SiSpringsecurity', category: 'Backend Development', note: 'JWT filter chain and BCrypt password hashing.', projects: ['taskflow'] },
  { name: 'FastAPI', icon: 'SiFastapi', category: 'Backend Development', note: 'Inference API for Age Lens and the ticket API for Self-Heal.', projects: ['age-lens', 'self-heal'] },
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend Development', projects: ['greivex', 'edu-connect', 'ecobin'] },
  { name: 'Express.js', icon: 'SiExpress', category: 'Backend Development', projects: ['greivex', 'edu-connect', 'ecobin'] },

  // AI / ML
  { name: 'TensorFlow', icon: 'SiTensorflow', category: 'AI & Machine Learning', note: 'Image classifier that routes Greivex complaints.', projects: ['greivex'] },
  { name: 'PyTorch', icon: 'SiPytorch', category: 'AI & Machine Learning', note: 'Training the Age Lens backbones and dual-head models.', projects: ['age-lens'] },
  { name: 'Scikit-learn', icon: 'SiScikitlearn', category: 'AI & Machine Learning', projects: ['age-lens'] },
  { name: 'Ensemble Learning', icon: 'LuLayers', category: 'AI & Machine Learning', note: 'Blending three trained checkpoints into one age estimate.', projects: ['age-lens'] },
  { name: 'Sentence Transformers', icon: 'SiHuggingface', category: 'AI & Machine Learning', note: 'all-mpnet-base-v2 embeddings for ticket-to-article matching.', projects: ['self-heal'] },
  { name: 'Knowledge Base', icon: 'LuScrollText', category: 'AI & Machine Learning', note: 'Department-specific articles with SOP references.', projects: ['self-heal'] },
  { name: 'RAG', icon: 'LuBrain', category: 'AI & Machine Learning', projects: [] },

  // Cloud & DevOps
  { name: 'AWS EC2', icon: 'FaAws', category: 'Cloud & DevOps', note: 'Hosted the EverShop application behind Auto Scaling.', projects: ['evershop-aws'] },
  { name: 'AWS S3', icon: 'FaAws', category: 'Cloud & DevOps', projects: ['evershop-aws', 'code-review'] },
  { name: 'AWS Lambda', icon: 'FaAws', category: 'Cloud & DevOps', projects: ['code-review'] },
  { name: 'AWS IAM', icon: 'FaAws', category: 'Cloud & DevOps', projects: [] },
  { name: 'AWS VPC', icon: 'FaAws', category: 'Cloud & DevOps', projects: [] },
  { name: 'Docker', icon: 'SiDocker', category: 'Cloud & DevOps', note: 'Sandboxed execution of whitelisted fix scripts in Self-Heal.', projects: ['self-heal'] },
  { name: 'Jenkins', icon: 'SiJenkins', category: 'Cloud & DevOps', projects: [] },
  { name: 'CI/CD', icon: 'SiGithubactions', category: 'Cloud & DevOps', note: 'GitHub Actions deploys to Firebase Hosting; AWS CodeBuild.', projects: ['age-lens', 'code-review'] },
  { name: 'Maven', icon: 'SiApachemaven', category: 'Cloud & DevOps', projects: ['taskflow'] },

  // Databases
  { name: 'MySQL', icon: 'SiMysql', category: 'Databases', projects: ['techbridge'] },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'Databases', note: 'Complaint, user and role data for Greivex.', projects: ['greivex', 'edu-connect', 'foodyield', 'ecobin'] },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Databases', note: 'Knowledge base and audit log, todo persistence, EverShop data.', projects: ['self-heal', 'taskflow', 'evershop-aws'] },
  { name: 'Amazon RDS', icon: 'FaAws', category: 'Databases', projects: [] },

  // Tools
  { name: 'Git', icon: 'SiGit', category: 'Developer Tools', projects: [] },
  { name: 'GitHub', icon: 'SiGithub', category: 'Developer Tools', projects: [] },
  { name: 'VS Code', icon: 'LuCode', category: 'Developer Tools', projects: [] },
  { name: 'IntelliJ IDEA', icon: 'SiIntellijidea', category: 'Developer Tools', projects: [] },
  { name: 'AWS Console', icon: 'FaAws', category: 'Developer Tools', projects: [] },
  { name: 'Power BI', icon: 'LuChartColumn', category: 'Developer Tools', projects: [] },

  // UI / UX
  { name: 'Figma', icon: 'SiFigma', category: 'UI/UX Design', note: 'Personas, wireframes and prototypes during the Big-Si-Bucks Innovation internship.', projects: [] },
  { name: 'Wireframing & prototyping', icon: 'LuPalette', category: 'UI/UX Design', note: 'Big-Si-Bucks Innovation internship.', projects: [] },
  { name: 'Design systems', icon: 'LuLayers', category: 'UI/UX Design', note: 'Reusable UI components and design guidelines (internship).', projects: [] },

  // Architecture
  { name: 'OOP', icon: 'LuBox', category: 'Architecture', projects: [] },
  { name: 'MVC', icon: 'LuWorkflow', category: 'Architecture', projects: ['taskflow'] },
  { name: 'SOLID principles', icon: 'LuPuzzle', category: 'Architecture', projects: [] },
]
