import { L } from '../i18n/L';

// Cada ítem: nombre (string o L) — el logo se resuelve por nombre en TechIcon.
export const skillGroups = [
  {
    title: 'Backend',
    items: ['Python', 'FastAPI', 'Flask', 'Node.js', 'Express', 'TypeScript', 'Java', 'Spring Boot', 'Socket.IO', 'JWT', 'REST'],
  },
  {
    title: L('Frontend & Móvil', 'Frontend & Mobile', 'Frontend & Mobile'),
    items: ['Vue 3', 'React', 'Vite', 'JavaScript', 'Tailwind CSS', 'HTML5', 'Kotlin', 'Jetpack Compose', 'Firebase'],
  },
  {
    title: L('Bases de datos', 'Databases', 'Bancos de dados'),
    items: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Prisma', 'SQLAlchemy', 'SQLite'],
  },
  {
    title: L('Automatización', 'Automation', 'Automação'),
    items: ['Playwright', 'RPA', L('Bots SUNAT', 'SUNAT bots', 'Bots SUNAT'), 'OpenPyXL', L('Procesamiento XML', 'XML processing', 'Processamento XML'), 'Pandas'],
  },
  {
    title: L('Data Science & IA', 'Data Science & AI', 'Data Science & IA'),
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'ETL', 'LangChain', 'Google Gemini', 'OpenAI', 'Jupyter'],
  },
  {
    title: L('Cloud & Metodologías', 'Cloud & Methodologies', 'Cloud & Metodologias'),
    items: ['Azure', 'Docker', 'Git', 'GitHub Actions', 'Terraform', 'Vercel', 'Scrum', 'Kanban', 'UML'],
  },
];

// Logos de la cinta superior (ver TechIcon para el mapa nombre → logo).
export const marquee = [
  'Python', 'FastAPI', 'Node.js', 'Java', 'Spring Boot', 'TypeScript', 'Vue 3', 'React', 'Kotlin',
  'MySQL', 'PostgreSQL', 'SQL Server', 'Docker', 'Terraform', 'Firebase', 'Pandas', 'Playwright', 'Azure',
];
