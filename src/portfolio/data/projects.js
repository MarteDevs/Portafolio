const gh = (repo) => `https://github.com/MarteDevs/${repo}`;

export const categories = ['Todos', 'Full-stack', 'Backend', 'Móvil', 'Automatización', 'Datos & IA'];

// El orden importa: la cuadrícula "Todos" alterna tarjetas anchas y angostas en bloques de 7.
// Los primeros 7 se ven de entrada; el resto aparece con "Ver más". Mantén el total ≡ 0 o 2 (mod 7) para que las filas cierren.
export const projects = [
  {
    id: 'expedientecheck',
    title: 'ExpedienteCheck · Reto técnico',
    category: 'Full-stack',
    summary:
      'Reto técnico para finalistas: mini-producto que consume la API de Datos Abiertos del MEF (Ejecución Presupuestal, más de 11 millones de registros) y sigue funcionando aunque el servicio del gobierno falle.',
    highlights: [
      'Proxy en Cloud Functions con caché en Firestore (hash SHA-256) que responde en milisegundos',
      'Enrutamiento inteligente entre búsqueda de texto completo y consultas SQL para evitar errores 409',
      'Infraestructura con Terraform (DEV y PROD), CI/CD con GitHub Actions y pruebas con Vitest',
    ],
    tech: ['Vite', 'JavaScript', 'Firebase', 'Cloud Functions', 'Firestore', 'Terraform', 'GitHub Actions'],
    links: { code: gh('expedientecheck-reto') },
  },
  {
    id: 'sire-bot',
    title: 'SIRE Compras Bot · SUNAT',
    category: 'Automatización',
    org: 'Grupo Ormasan',
    private: true,
    summary:
      'Bot RPA que automatiza el login, la navegación y la descarga masiva de comprobantes electrónicos desde SUNAT y los guarda en SQL Server.',
    highlights: [
      'Facturas, guías y XML serie E y F, de punta a punta',
      'Reintentos automáticos y validación de integridad del XML',
      'Reportes con Pandas; redujo el proceso de horas a minutos',
    ],
    tech: ['Python', 'Playwright', 'FastAPI', 'SQL Server', 'Pandas'],
    links: {},
  },
  {
    id: 'pegasus',
    title: 'Santos Pegasus · Agente de IA (RAG)',
    category: 'Datos & IA',
    summary:
      'Asistente virtual que lee la documentación interna de una empresa en PDF y responde solo con base en esos documentos, sin inventar información.',
    highlights: [
      'RAG con LangChain, Gemini (LLM y embeddings) y base vectorial FAISS',
      'Embeddings por lotes que respetan los límites de la API gratuita',
      'Despliegue automatizado en Oracle Cloud con Terraform y cloud-init',
    ],
    tech: ['Python', 'LangChain', 'Gemini', 'FAISS', 'Streamlit', 'Terraform', 'OCI'],
    links: { code: gh('santos-pegasus-agent') },
  },
  {
    id: 'kardia',
    title: 'Kardia · Reserva médica EsSalud',
    category: 'Móvil',
    summary:
      'App Android para reservar citas médicas: busca doctores por especialidad, agenda, reprograma y cancela citas.',
    highlights: [
      'Registro e inicio de sesión con Firebase Auth y Google',
      'Directorio de doctores con filtros y calificaciones',
      'Notificaciones y recordatorios de citas',
    ],
    tech: ['Kotlin', 'Android', 'Firebase Auth', 'Firestore'],
    links: { code: gh('Essalud-reserva-medica-app') },
  },
  {
    id: 'aura',
    title: 'Aura Music Downloader',
    category: 'Móvil',
    summary:
      'Ecosistema cliente-servidor para buscar y descargar música en FLAC y MP3 320k, con web en React y app Android.',
    highlights: [
      'Cola de descargas con progreso en tiempo real por WebSocket',
      'Etiquetado ID3 con carátula, biblioteca y favoritos',
      'HTTPS automático con Caddy, rate limiting y protección de rutas',
    ],
    tech: ['FastAPI', 'React', 'Kotlin', 'WebSocket', 'MySQL'],
    links: { code: gh('AuraDowloader') },
  },
  {
    id: 'madera-app',
    title: 'Madera Poltand · App Android',
    category: 'Móvil',
    summary:
      'Aplicación Android para la gestión de inventario y operaciones de Madera Poltand, con APK y AAB firmados para producción.',
    highlights: [
      'Interfaz moderna con Jetpack Compose',
      'Inyección de dependencias con Hilt',
      'Compatible con Android 8.0 (API 26) o superior',
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Android'],
    links: { code: gh('MaderaApp') },
  },
  {
    id: 'licitaciones',
    title: 'Plataforma de Licitaciones Inversas',
    category: 'Full-stack',
    summary:
      'Los compradores publican lo que necesitan y los proveedores compiten con sus ofertas; solo el comprador ve todas las propuestas.',
    highlights: [
      'Frontend en React con TypeScript y API REST en FastAPI',
      'PostgreSQL como base de datos y autenticación con Firebase Auth / JWT',
      'Roles de consumidor y proveedor, con privacidad entre ofertas',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Firebase Auth'],
    links: { code: gh('Licitaciones') },
  },
  {
    id: 'mineria',
    title: 'Madera Minería · Microservicios',
    category: 'Backend',
    summary:
      'Sistema de pedidos y entregas de madera para minería, con cinco microservicios que se comunican de forma síncrona y asíncrona.',
    highlights: [
      'API Gateway con JWT y control de roles',
      'OpenFeign y RabbitMQ para el flujo pedido, notificación y entrega',
      'Una base PostgreSQL por servicio y orquestación con Docker Compose',
    ],
    tech: ['Java 21', 'Spring Boot', 'RabbitMQ', 'OpenFeign', 'PostgreSQL', 'Docker'],
    links: { code: gh('madera-mineria') },
  },
  {
    id: 'soldadura',
    title: 'Control de proyectos de soldadura · IA',
    category: 'Automatización',
    summary:
      'API que automatiza el costeo y seguimiento de proyectos de soldadura: lee presupuestos en PDF, extrae los datos con IA y los estructura en base de datos.',
    highlights: [
      'FastAPI con arquitectura en capas (controladores, servicios y modelos)',
      'Extracción estructurada de PDFs con la API de OpenAI',
      'Control de avances semanales y reportes estandarizados',
    ],
    tech: ['Python', 'FastAPI', 'OpenAI', 'SQLAlchemy', 'MySQL'],
    links: { code: gh('automation-of-tracking-back') },
  },
  {
    id: 'rxh-bot',
    title: 'Bot SUNAT · Recibos por Honorarios',
    category: 'Automatización',
    org: 'Grupo Ormasan',
    private: true,
    summary:
      'Automatiza el flujo completo de RxH: autenticación, búsqueda, descarga masiva, procesamiento y generación de reportes.',
    highlights: [
      'Integrado con SQL Server para trazabilidad',
      'Procesamiento y reportes con Pandas',
    ],
    tech: ['Python', 'FastAPI', 'Playwright', 'SQL Server'],
    links: {},
  },
  {
    id: 'sismoclima',
    title: 'Sismoclima Perú',
    category: 'Datos & IA',
    summary:
      'Plataforma de prevención que consolida clima, calidad del aire y sismicidad en tiempo real y detecta anomalías con Machine Learning.',
    highlights: [
      'Backend SOAP con Spring Boot (Java 21) y MySQL',
      'Ingesta de USGS, Open-Meteo y OpenAQ',
      'Panel Vue 3 con mapas Leaflet y reportes PDF',
    ],
    tech: ['Java 21', 'Spring Boot', 'SOAP', 'MySQL', 'Vue 3', 'Leaflet'],
    links: { code: gh('anomaly-detection') },
  },
  {
    id: 'madera-erp',
    title: 'Madera ERP',
    category: 'Full-stack',
    summary:
      'Sistema logístico que digitaliza pedidos, viajes y stock de madera, desde el requerimiento hasta la recepción en planta.',
    highlights: [
      'API REST en TypeScript con Prisma y MySQL',
      'Validación con Zod, tests con Jest y documentación Swagger',
      'Autenticación JWT con refresh token',
    ],
    tech: ['TypeScript', 'Express', 'Prisma', 'MySQL', 'Vue', 'Docker'],
    links: { code: gh('maderera-backend'), demo: 'https://maderera-frontend.vercel.app' },
  },
  {
    id: 'mype-ai',
    title: 'Asistente AI para MYPE Perú',
    category: 'Full-stack',
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
    id: 'tallermina',
    title: 'Análisis de Consumos · Taller Mina',
    category: 'Datos & IA',
    summary:
      'Plataforma web que carga archivos Excel de consumo, calcula indicadores de costos y exporta reportes ejecutivos.',
    highlights: [
      'KPIs en tiempo real y gráficos de gasto por mina y producto',
      'Reporte consolidado por lotes de minas',
      'Exportación a Excel y PDF con formato corporativo',
    ],
    tech: ['Python', 'Flask', 'Excel', 'PDF'],
    links: { code: gh('AnaliticDataTallerMina') },
  },
  {
    id: 'telecomx',
    title: 'Telecom X · Predicción de churn',
    category: 'Datos & IA',
    summary:
      'Challenge de Alura Latam (Oracle ONE): análisis y modelo de machine learning para predecir la evasión de clientes de una telco.',
    highlights: [
      'EDA sobre 7.043 clientes: 26,5 % de churn',
      'Los contratos mes a mes concentran el 88 % de la fuga',
      'Regresión logística y Random Forest, evaluados con ROC-AUC y matriz de confusión',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    links: { code: gh('reto_final_telecomX') },
  },
  {
    id: 'bcrp-etl',
    title: 'Pipeline ETL · Indicadores BCRP',
    category: 'Datos & IA',
    summary:
      'Extrae indicadores macroeconómicos del BCRP, los valida y los carga en SQL Server para análisis.',
    highlights: [
      'Extractor, transformador, validador y loader desacoplados',
      'Tipo de cambio, inflación, reservas y tasa de referencia',
      'Empaquetado con Docker y tests',
    ],
    tech: ['Python', 'Pandas', 'SQLAlchemy', 'SQL Server', 'Docker'],
    links: { code: gh('bcrp-etl') },
  },
];
