import { L } from './L';

// Textos de la interfaz. Para agregar un idioma: añade su código en LANGS y un valor en cada L().
export const LANGS = [
  { code: 'es', label: 'ES', name: 'Español', locale: 'es-PE' },
  { code: 'en', label: 'EN', name: 'English', locale: 'en-US' },
  { code: 'pt', label: 'PT', name: 'Português', locale: 'pt-BR' },
];

export const ui = {
  skip: L('Saltar al contenido', 'Skip to content', 'Pular para o conteúdo'),
  nav: {
    projects: L('Proyectos', 'Projects', 'Projetos'),
    roles: L('Áreas', 'Areas', 'Áreas'),
    experience: L('Experiencia', 'Experience', 'Experiência'),
    stack: L('Stack', 'Stack', 'Stack'),
    education: L('Formación', 'Education', 'Formação'),
    contact: L('Contacto', 'Contact', 'Contato'),
    menu: L('Menú', 'Menu', 'Menu'),
  },
  hero: {
    status: L('Abierto a oportunidades · Remoto', 'Open to opportunities · Remote', 'Aberto a oportunidades · Remoto'),
    pre: L('Automatizo lo que antes era ', 'I automate what used to be ', 'Automatizo o que antes era '),
    accent: L('manual', 'manual', 'manual'),
    intro: L(
      'Soy Marco Polo Silva, Full Stack Developer con más de 2 años construyendo APIs REST, automatizando procesos críticos de negocio e integrando IA, con Python, Node.js, Vue y apps Android.',
      "I'm Marco Polo Silva, a Full Stack Developer with 2+ years building REST APIs, automating business-critical processes and integrating AI, using Python, Node.js, Vue and Android apps.",
      'Sou Marco Polo Silva, Full Stack Developer com mais de 2 anos construindo APIs REST, automatizando processos críticos de negócio e integrando IA, com Python, Node.js, Vue e apps Android.'
    ),
    projects: L('Ver proyectos', 'View projects', 'Ver projetos'),
    contact: L('Escríbeme', 'Get in touch', 'Fale comigo'),
    cv: L('CV', 'CV', 'CV'),
  },
  projects: {
    eyebrow: L('01 — Proyectos', '01 — Projects', '01 — Projetos'),
    title: L('Sistemas reales, no demos de tutorial.', 'Real systems, not tutorial demos.', 'Sistemas reais, não demos de tutorial.'),
    subtitle: L(
      'Una selección de mis repositorios y trabajos: backend, automatización, datos, IA y apps móviles aplicados a problemas concretos.',
      'A selection of my repositories and work: backend, automation, data, AI and mobile apps applied to concrete problems.',
      'Uma seleção dos meus repositórios e trabalhos: backend, automação, dados, IA e apps móveis aplicados a problemas concretos.'
    ),
    cat: {
      all: L('Todos', 'All', 'Todos'),
      fullstack: L('Full-stack', 'Full-stack', 'Full-stack'),
      backend: L('Backend', 'Backend', 'Backend'),
      mobile: L('Móvil', 'Mobile', 'Mobile'),
      automation: L('Automatización', 'Automation', 'Automação'),
      data: L('Datos & IA', 'Data & AI', 'Dados & IA'),
    },
    code: L('Código', 'Code', 'Código'),
    private: L('Código privado', 'Private code', 'Código privado'),
    demo: L('Demo en vivo', 'Live demo', 'Demo ao vivo'),
    prod: L('Ver en producción', 'View in production', 'Ver em produção'),
    more: L('Ver más proyectos', 'Show more projects', 'Ver mais projetos'),
    less: L('Ver menos', 'Show less', 'Ver menos'),
    all: L('Ver todos mis repositorios en GitHub', 'See all my repositories on GitHub', 'Ver todos os meus repositórios no GitHub'),
  },
  roles: {
    eyebrow: L('02 — Áreas', '02 — Areas', '02 — Áreas'),
    title: L('Dónde puedo aportar desde el primer día.', 'Where I can contribute from day one.', 'Onde posso contribuir desde o primeiro dia.'),
    subtitle: L(
      'Áreas donde tengo experiencia comprobable, respaldada por proyectos reales.',
      'Areas where I have hands-on experience, backed by real projects.',
      'Áreas em que tenho experiência comprovada, respaldada por projetos reais.'
    ),
    evidence: L('Evidencia', 'Evidence', 'Evidência'),
    remote: L('Remoto', 'Remote', 'Remoto'),
    english: L('Inglés técnico', 'Technical English', 'Inglês técnico'),
  },
  experience: {
    eyebrow: L('03 — Experiencia', '03 — Experience', '03 — Experiência'),
    title: L('Dónde he construido sistemas reales', "Where I've built real systems", 'Onde construí sistemas reais'),
    bio: L(
      'Soy desarrollador full stack con base sólida en backend. He trabajado en RR. HH., logística, auditoría y gestión documental, siempre con el mismo objetivo: que el equipo deje de hacer a mano lo que una API o un bot hace mejor.',
      "I'm a full stack developer with a strong backend foundation. I've worked in HR, logistics, auditing and document management, always with the same goal: so teams stop doing by hand what an API or a bot does better.",
      'Sou desenvolvedor full stack com base sólida em backend. Já atuei em RH, logística, auditoria e gestão documental, sempre com o mesmo objetivo: que a equipe deixe de fazer à mão o que uma API ou um bot faz melhor.'
    ),
    years: L('Años de experiencia', 'Years of experience', 'Anos de experiência'),
    projects: L('Proyectos destacados', 'Featured projects', 'Projetos em destaque'),
    certs: L('Certificaciones', 'Certifications', 'Certificações'),
    cv: L('Descargar CV (PDF)', 'Download CV (PDF, Spanish)', 'Baixar CV (PDF, espanhol)'),
    present: L('Actualidad', 'Present', 'Atual'),
  },
  stack: {
    eyebrow: L('04 — Stack', '04 — Stack', '04 — Stack'),
    title: L('Tecnologías con las que construyo', 'Technologies I build with', 'Tecnologias com que construo'),
    subtitle: L(
      'Lo que uso en los proyectos de arriba, agrupado por área.',
      'What I use in the projects above, grouped by area.',
      'O que uso nos projetos acima, agrupado por área.'
    ),
  },
  education: {
    eyebrow: L('05 — Formación', '05 — Education', '05 — Formação'),
    title: L('Estudios y certificaciones', 'Education & certifications', 'Formação e certificações'),
    subtitle: L(
      'Aprendizaje continuo: de la ingeniería en UPC a un curso de Data Science con la Universidad de Tokio.',
      'Continuous learning: from engineering at UPC to a Data Science course with the University of Tokyo.',
      'Aprendizado contínuo: da engenharia na UPC a um curso de Data Science com a Universidade de Tóquio.'
    ),
    certs: L('Certificaciones', 'Certifications', 'Certificações'),
  },
  contact: {
    eyebrow: L('06 — Contacto', '06 — Contact', '06 — Contato'),
    title: L('¿Tienes un proyecto o una vacante?', 'Have a project or an open role?', 'Tem um projeto ou uma vaga?'),
    subtitle: L(
      'Escríbeme y te respondo lo antes posible.',
      "Write to me and I'll reply as soon as possible.",
      'Escreva-me e respondo o mais rápido possível.'
    ),
    name: L('Nombre', 'Name', 'Nome'),
    namePh: L('Tu nombre', 'Your name', 'Seu nome'),
    email: L('Correo', 'Email', 'E-mail'),
    message: L('Mensaje', 'Message', 'Mensagem'),
    messagePh: L('Cuéntame sobre el proyecto o la oportunidad…', 'Tell me about the project or the opportunity…', 'Conte-me sobre o projeto ou a oportunidade…'),
    send: L('Enviar mensaje', 'Send message', 'Enviar mensagem'),
    sending: L('Enviando…', 'Sending…', 'Enviando…'),
    ok: L('¡Mensaje enviado! Te responderé pronto.', "Message sent! I'll reply soon.", 'Mensagem enviada! Responderei em breve.'),
    error: L('No se pudo enviar. Escríbeme a', "Couldn't send. Email me at", 'Não foi possível enviar. Escreva para'),
    subject: L('Contacto desde portafolio', 'Contact from portfolio', 'Contato pelo portfólio'),
  },
  footer: L(
    'Hecho con React, Tailwind, Framer Motion y Spline',
    'Built with React, Tailwind, Framer Motion and Spline',
    'Feito com React, Tailwind, Framer Motion e Spline'
  ),
  meta: {
    title: L('Marco Polo Silva · Full Stack Developer', 'Marco Polo Silva · Full Stack Developer', 'Marco Polo Silva · Full Stack Developer'),
    description: L(
      'Full Stack Developer en Lima, Perú. APIs, automatización RPA, apps Android e IA con Python, Node.js, Vue y Kotlin.',
      'Full Stack Developer in Lima, Peru. APIs, RPA automation, Android apps and AI with Python, Node.js, Vue and Kotlin.',
      'Full Stack Developer em Lima, Peru. APIs, automação RPA, apps Android e IA com Python, Node.js, Vue e Kotlin.'
    ),
  },
};
