import { L } from '../i18n/L';

// Fechas en 'YYYY-MM'; end: null = actualidad.
export const jobs = [
  {
    role: L('Programador Full Stack Junior', 'Junior Full Stack Developer', 'Desenvolvedor Full Stack Júnior'),
    org: 'ExpedienteCheck',
    place: L('Lima, Perú · Remoto', 'Lima, Peru · Remote', 'Lima, Peru · Remoto'),
    start: '2026-07',
    end: null,
    points: L(
      [
        'Desarrollo funcionalidades full stack: infraestructura de software y front-end para la plataforma de la empresa.',
        'Participo en el ciclo completo, del diseño de componentes a la integración con servicios backend.',
        'Trabajo en proyectos de monitoreo de obras.',
      ],
      [
        "Build full stack features: software infrastructure and front-end for the company's platform.",
        'Involved in the full cycle, from component design to backend service integration.',
        'Work on construction-site monitoring projects.',
      ],
      [
        'Desenvolvo funcionalidades full stack: infraestrutura de software e front-end para a plataforma da empresa.',
        'Participo do ciclo completo, do design de componentes à integração com serviços backend.',
        'Atuo em projetos de monitoramento de obras.',
      ]
    ),
  },
  {
    role: L('Analista de Datos (Prácticas)', 'Data Analyst (Internship)', 'Analista de Dados (Estágio)'),
    org: L('AENUP · Asociación Estudiantil Nuclear del Perú', 'AENUP · Peruvian Nuclear Student Association', 'AENUP · Associação Estudantil Nuclear do Peru'),
    place: L('Perú · Remoto', 'Peru · Remote', 'Peru · Remoto'),
    start: '2026-05',
    end: null,
    points: L(
      [
        'Análisis exploratorio de datos (EDA) para proyectos de investigación científica del sector nuclear.',
        'Proceso y transformo datasets con Python, Pandas y NumPy, y genero visualizaciones e insights accionables.',
      ],
      [
        'Exploratory data analysis (EDA) for scientific research projects in the nuclear sector.',
        'Process and transform datasets with Python, Pandas and NumPy, producing visualizations and actionable insights.',
      ],
      [
        'Análise exploratória de dados (EDA) para projetos de pesquisa científica do setor nuclear.',
        'Processo e transformo datasets com Python, Pandas e NumPy, gerando visualizações e insights acionáveis.',
      ]
    ),
  },
  {
    role: L('Desarrollador Back-end (Prácticas)', 'Back-end Developer (Internship)', 'Desenvolvedor Back-end (Estágio)'),
    org: 'Grupo Ormasan',
    place: L('Trujillo, Perú · Remoto', 'Trujillo, Peru · Remote', 'Trujillo, Peru · Remoto'),
    start: '2025-08',
    end: '2026-04',
    points: L(
      [
        'Bots RPA con Python y Playwright para SUNAT (SIRE Compras y RxH): login, descarga masiva de XML y almacenamiento en SQL Server. Pasaron de horas de trabajo manual a minutos.',
        'Backend principal del ERP con Node.js, Express y SQL Server: JWT, RBAC, Socket.IO en tiempo real, auditoría y logs.',
        'API de generación de PDF (facturas, órdenes, guías) a partir de XML, con Python, Flask y plantillas HTML.',
        'Arquitectura en capas, patrón MVC y buenas prácticas de seguridad en todos los módulos.',
      ],
      [
        'RPA bots with Python and Playwright for SUNAT (SIRE Purchases and RxH): login, bulk XML download and storage in SQL Server. Went from hours of manual work to minutes.',
        "Main ERP backend with Node.js, Express and SQL Server: JWT, RBAC, real-time Socket.IO, auditing and logs.",
        'PDF generation API (invoices, orders, delivery notes) from XML, with Python, Flask and HTML templates.',
        'Layered architecture, MVC pattern and security best practices across all modules.',
      ],
      [
        'Bots RPA com Python e Playwright para a SUNAT (SIRE Compras e RxH): login, download em massa de XML e armazenamento no SQL Server. Passaram de horas de trabalho manual para minutos.',
        'Backend principal do ERP com Node.js, Express e SQL Server: JWT, RBAC, Socket.IO em tempo real, auditoria e logs.',
        'API de geração de PDF (faturas, ordens, guias) a partir de XML, com Python, Flask e templates HTML.',
        'Arquitetura em camadas, padrão MVC e boas práticas de segurança em todos os módulos.',
      ]
    ),
  },
  {
    role: L('Desarrollador Back-end (Prácticas)', 'Back-end Developer (Internship)', 'Desenvolvedor Back-end (Estágio)'),
    org: L('Consultoría de Tecnología e Innovación', 'Technology & Innovation Consulting', 'Consultoria de Tecnologia e Inovação'),
    place: L('Perú · Remoto', 'Peru · Remote', 'Peru · Remoto'),
    start: '2024-12',
    end: '2025-08',
    points: L(
      [
        'Fitness System (gestión de gimnasios) y Rental System (plataforma de alquileres): APIs REST, JWT, RBAC y MySQL.',
        'Modelado de flujos con UML y bases de datos relacionales, bajo Scrum y Kanban.',
      ],
      [
        'Fitness System (gym management) and Rental System (rental platform): REST APIs, JWT, RBAC and MySQL.',
        'Workflow modeling with UML and relational databases, working under Scrum and Kanban.',
      ],
      [
        'Fitness System (gestão de academias) e Rental System (plataforma de aluguéis): APIs REST, JWT, RBAC e MySQL.',
        'Modelagem de fluxos com UML e bancos relacionais, sob Scrum e Kanban.',
      ]
    ),
  },
];

export const education = [
  {
    title: L('Ingeniería · Computer Systems Technology', 'Engineering · Computer Systems Technology', 'Engenharia · Computer Systems Technology'),
    org: 'UPC · Universidad Peruana de Ciencias Aplicadas',
    start: '2026-08',
    end: '2028-08',
    note: L('En curso.', 'In progress.', 'Em andamento.'),
  },
  {
    title: L('Tecnicatura en Computación e Informática', 'Technical degree in Computing & IT', 'Curso Técnico em Computação e Informática'),
    org: 'CIBERTEC · Lima',
    start: '2023-08',
    end: '2026-06',
    note: L(
      'Especialización en backend con Java y Python. Delegado de aula.',
      'Backend specialization with Java and Python. Class representative.',
      'Especialização em backend com Java e Python. Representante de turma.'
    ),
  },
  {
    title: 'GCI World · Data Science',
    org: L('Universidad de Tokio · Matsuo-Iwasawa Laboratory', 'University of Tokyo · Matsuo-Iwasawa Laboratory', 'Universidade de Tóquio · Matsuo-Iwasawa Laboratory'),
    start: '2026-04',
    end: '2026-08',
    note: L(
      'Análisis de datos, machine learning, feature engineering y estadística. Evaluación final aprobada.',
      'Data analysis, machine learning, feature engineering and statistics. Final assessment passed.',
      'Análise de dados, machine learning, feature engineering e estatística. Avaliação final aprovada.'
    ),
  },
  {
    title: L('Programa de Inglés WeTALK', 'WeTALK English Program', 'Programa de Inglês WeTALK'),
    org: 'UPC',
    start: '2024-05',
    end: '2026-04',
    note: L(
      '6 niveles completos, enfocados en comunicación técnica.',
      '6 levels completed, focused on technical communication.',
      '6 níveis concluídos, com foco em comunicação técnica.'
    ),
  },
];

export const certifications = [
  { name: 'Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', date: '2026-03' },
  { name: 'Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', date: '2026-03' },
  { name: 'Security, Compliance & Identity (SC-900)', issuer: 'Microsoft', date: '2026-03' },
  { name: 'Cybersecurity (CCST)', issuer: 'Cisco', icon: 'cisco', date: '2026-05' },
  { name: 'IT Specialist · JavaScript', issuer: 'Pearson', icon: 'pearson', date: '2026-05' },
  { name: 'IT Specialist · Python', issuer: 'Pearson', icon: 'pearson', date: '2025-12' },
  {
    name: L('Diseño y Arquitectura de Soluciones TI', 'IT Solutions Design & Architecture', 'Design e Arquitetura de Soluções de TI'),
    issuer: 'CIBERTEC',
    date: '2026-03',
  },
  { name: 'ONE Tech Foundation · Data Science', issuer: 'Alura Latam / Oracle', date: '2025-08' },
  { name: 'Scrum Foundation (SFPC)', issuer: 'CertiProf', date: '2023-11' },
  { name: 'Artificial Intelligence Fundamentals', issuer: 'IBM', date: '2025-04' },
  { name: L('Git y GitHub', 'Git & GitHub', 'Git e GitHub'), issuer: 'Platzi', icon: 'platzi', date: '2022-12' },
  {
    name: L('Redes Informáticas de Internet', 'Internet Networking', 'Redes de Computadores e Internet'),
    issuer: 'Platzi',
    icon: 'platzi',
    date: '2023-09',
  },
  { name: 'Lifelong Learning', issuer: 'CertiProf', date: '2023-11' },
];
