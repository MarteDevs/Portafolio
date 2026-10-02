const gh = (repo) => `https://github.com/MarteDevs/${repo}`;

export const categories = ['Todos', 'Full-stack', 'Backend', 'Datos & IA'];

export const projects = [
  {
    id: 'sismoclima',
    title: 'Sismoclima Perú',
    category: 'Datos & IA',
    featured: true,
    summary:
      'Plataforma de prevención que consolida clima, calidad del aire y sismicidad en tiempo real y detecta anomalías con Machine Learning.',
    highlights: [
      'Backend SOAP con Spring Boot (Java 21) y persistencia en MySQL',
      'Ingesta de USGS, Open-Meteo y OpenAQ; modelos tipo Isolation Forest',
      'Panel Vue 3 con mapas Leaflet y reportes PDF',
    ],
    tech: ['Java 21', 'Spring Boot', 'SOAP', 'MySQL', 'Vue 3', 'Leaflet'],
    links: { code: gh('anomaly-detection') },
  },
  {
    id: 'mype-ai',
    title: 'Asistente AI para MYPE Perú',
    category: 'Full-stack',
    featured: true,
    summary:
      'Asistente para micro y pequeñas empresas: calcula el régimen tributario más conveniente y responde consultas con IA.',
    highlights: [
      'Chat de asesoría empresarial con Google Gemini',
      'Cálculo automático de régimen tributario',
      'API modular con validación, logging y manejo central de errores',
    ],
    tech: ['Node.js', 'Express', 'Google Gemini', 'Vue', 'Vercel'],
    links: {
      code: gh('Asistente-AI-MYPE-Peru---Backend'),
      demo: 'https://asistente-ai-mype-peru-frontend.vercel.app',
    },
  },
  {
    id: 'madera-erp',
    title: 'Madera ERP',
    category: 'Full-stack',
    featured: true,
    summary:
      'Sistema logístico que digitaliza pedidos, viajes y stock de madera, desde el requerimiento hasta la recepción en planta.',
    highlights: [
      'API REST en TypeScript con Prisma y MySQL',
      'Validación con Zod, tests con Jest y documentación Swagger',
      'Autenticación JWT con refresh token',
    ],
    tech: ['TypeScript', 'Express', 'Prisma', 'MySQL', 'Vue', 'Docker'],
    links: {
      code: gh('maderera-backend'),
      demo: 'https://maderera-frontend.vercel.app',
    },
  },
  {
    id: 'microservicios',
    title: 'E-commerce con Microservicios',
    category: 'Backend',
    featured: false,
    summary:
      'Arquitectura distribuida con Spring Cloud: descubrimiento de servicios, gateway único y seguridad centralizada con JWT.',
    highlights: [
      'Eureka, API Gateway y OpenFeign entre servicios',
      'Servicios de auth, productos y órdenes',
      'Validación de tokens en el gateway',
    ],
    tech: ['Java 17', 'Spring Boot', 'Spring Cloud', 'Eureka', 'JWT'],
    links: { code: gh('microservicies-example') },
  },
  {
    id: 'bcrp-etl',
    title: 'Pipeline ETL · Indicadores BCRP',
    category: 'Datos & IA',
    featured: false,
    summary:
      'Pipeline que extrae indicadores macroeconómicos del BCRP, los valida y los carga en SQL Server para análisis.',
    highlights: [
      'Extractor, transformador, validador y loader desacoplados',
      'Tipo de cambio, inflación, reservas y tasa de referencia',
      'Empaquetado con Docker y tests',
    ],
    tech: ['Python', 'Pandas', 'SQLAlchemy', 'SQL Server', 'Docker'],
    links: { code: gh('bcrp-etl') },
  },
  {
    id: 'costeos',
    title: 'Seguimiento y Costeo de Taller',
    category: 'Full-stack',
    featured: false,
    summary:
      'Aplicación para seguir proyectos de taller y calcular costos automáticamente, con exportación de manifiestos.',
    highlights: [
      'API REST con arquitectura MVC y transacciones MySQL',
      'Campos calculados directamente en la base de datos',
      'Frontend en Vue desplegado en Vercel',
    ],
    tech: ['Node.js', 'Express', 'MySQL', 'Vue', 'Vercel'],
    links: {
      code: gh('seguimiento-costeos-taller-backend'),
      demo: 'https://seguimiento-costeos-taller-frontend.vercel.app',
    },
  },
];
