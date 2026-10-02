import { L } from '../i18n/L';

const gh = (repo) => `https://github.com/MarteDevs/${repo}`;

// category: fullstack | backend | mobile | automation | data
// El orden importa: la cuadrícula "Todos" alterna tarjetas anchas y angostas en bloques de 7.
// Los primeros 7 se ven de entrada; el resto con "Ver más". Mantén el total ≡ 0 o 2 (mod 7).
export const projects = [
  {
    id: 'expedientecheck',
    category: 'fullstack',
    title: L('ExpedienteCheck · Reto técnico', 'ExpedienteCheck · Technical challenge', 'ExpedienteCheck · Desafio técnico'),
    summary: L(
      'Reto técnico para finalistas: mini-producto que consume la API de Datos Abiertos del MEF (Ejecución Presupuestal, más de 11 millones de registros) y sigue funcionando aunque el servicio del gobierno falle.',
      'Finalist technical challenge: a mini-product that consumes the Peruvian MEF Open Data API (budget execution, 11M+ records) and keeps working even when the government service goes down.',
      'Desafio técnico para finalistas: mini-produto que consome a API de Dados Abertos do MEF (execução orçamentária, mais de 11 milhões de registros) e continua funcionando mesmo quando o serviço do governo cai.'
    ),
    highlights: L(
      [
        'Proxy en Cloud Functions con caché en Firestore (hash SHA-256) que responde en milisegundos',
        'Enrutamiento inteligente entre búsqueda de texto completo y consultas SQL para evitar errores 409',
        'Infraestructura con Terraform (DEV y PROD), CI/CD con GitHub Actions y pruebas con Vitest',
      ],
      [
        'Cloud Functions proxy with a Firestore cache (SHA-256 hash) that answers in milliseconds',
        'Smart routing between full-text search and SQL queries to avoid 409 errors',
        'Terraform infrastructure (DEV and PROD), CI/CD with GitHub Actions and Vitest tests',
      ],
      [
        'Proxy em Cloud Functions com cache no Firestore (hash SHA-256) que responde em milissegundos',
        'Roteamento inteligente entre busca de texto completo e consultas SQL para evitar erros 409',
        'Infraestrutura com Terraform (DEV e PROD), CI/CD com GitHub Actions e testes com Vitest',
      ]
    ),
    tech: ['Vite', 'JavaScript', 'Firebase', 'Cloud Functions', 'Firestore', 'Terraform', 'GitHub Actions'],
    links: { code: gh('expedientecheck-reto') },
  },
  {
    id: 'sire-bot',
    category: 'automation',
    org: 'Grupo Ormasan',
    private: true,
    title: L('SIRE Compras Bot · SUNAT', 'SIRE Purchases Bot · SUNAT', 'Bot SIRE Compras · SUNAT'),
    summary: L(
      'Bot RPA que automatiza el login, la navegación y la descarga masiva de comprobantes electrónicos desde SUNAT y los guarda en SQL Server.',
      'RPA bot that automates login, navigation and bulk download of electronic invoices from SUNAT (Peru tax authority) and stores them in SQL Server.',
      'Bot RPA que automatiza o login, a navegação e o download em massa de comprovantes eletrônicos da SUNAT (receita peruana) e os guarda no SQL Server.'
    ),
    highlights: L(
      [
        'Facturas, guías y XML serie E y F, de punta a punta',
        'Reintentos automáticos y validación de integridad del XML',
        'Reportes con Pandas; redujo el proceso de horas a minutos',
      ],
      [
        'Invoices, delivery notes and E/F-series XML, end to end',
        'Automatic retries and XML integrity validation',
        'Pandas reports; cut the process from hours to minutes',
      ],
      [
        'Faturas, guias e XML série E e F, de ponta a ponta',
        'Tentativas automáticas e validação de integridade do XML',
        'Relatórios com Pandas; reduziu o processo de horas para minutos',
      ]
    ),
    tech: ['Python', 'Playwright', 'FastAPI', 'SQL Server', 'Pandas'],
    links: {},
  },
  {
    id: 'pegasus',
    category: 'data',
    title: L('Santos Pegasus · Agente de IA (RAG)', 'Santos Pegasus · AI Agent (RAG)', 'Santos Pegasus · Agente de IA (RAG)'),
    summary: L(
      'Asistente virtual que lee la documentación interna de una empresa en PDF y responde solo con base en esos documentos, sin inventar información.',
      "Virtual assistant that reads a company's internal PDF documentation and answers only from those documents, without making things up.",
      'Assistente virtual que lê a documentação interna de uma empresa em PDF e responde apenas com base nesses documentos, sem inventar informações.'
    ),
    highlights: L(
      [
        'RAG con LangChain, Gemini (LLM y embeddings) y base vectorial FAISS',
        'Embeddings por lotes que respetan los límites de la API gratuita',
        'Despliegue automatizado en Oracle Cloud con Terraform y cloud-init',
      ],
      [
        'RAG with LangChain, Gemini (LLM and embeddings) and a FAISS vector store',
        'Batched embeddings that respect free-tier API limits',
        'Automated deployment on Oracle Cloud with Terraform and cloud-init',
      ],
      [
        'RAG com LangChain, Gemini (LLM e embeddings) e base vetorial FAISS',
        'Embeddings em lotes que respeitam os limites da API gratuita',
        'Implantação automatizada no Oracle Cloud com Terraform e cloud-init',
      ]
    ),
    tech: ['Python', 'LangChain', 'Gemini', 'FAISS', 'Streamlit', 'Terraform', 'OCI'],
    links: { code: gh('santos-pegasus-agent') },
  },
  {
    id: 'kardia',
    category: 'mobile',
    title: L('Kardia · Reserva médica EsSalud', 'Kardia · EsSalud medical booking', 'Kardia · Agendamento médico EsSalud'),
    summary: L(
      'App Android para reservar citas médicas: busca doctores por especialidad, agenda, reprograma y cancela citas.',
      'Android app for booking medical appointments: search doctors by specialty, schedule, reschedule and cancel.',
      'App Android para agendar consultas médicas: busca médicos por especialidade, agenda, reagenda e cancela.'
    ),
    highlights: L(
      [
        'Registro e inicio de sesión con Firebase Auth y Google',
        'Directorio de doctores con filtros y calificaciones',
        'Notificaciones y recordatorios de citas',
      ],
      [
        'Sign-up and login with Firebase Auth and Google',
        'Doctor directory with filters and ratings',
        'Appointment notifications and reminders',
      ],
      [
        'Cadastro e login com Firebase Auth e Google',
        'Diretório de médicos com filtros e avaliações',
        'Notificações e lembretes de consultas',
      ]
    ),
    tech: ['Kotlin', 'Android', 'Firebase Auth', 'Firestore'],
    links: { code: gh('Essalud-reserva-medica-app') },
  },
  {
    id: 'aura',
    category: 'mobile',
    title: L('Aura Music Downloader', 'Aura Music Downloader', 'Aura Music Downloader'),
    summary: L(
      'Ecosistema cliente-servidor para buscar y descargar música en FLAC y MP3 320k, con web en React y app Android.',
      'Client-server ecosystem to search and download music in FLAC and 320k MP3, with a React web app and an Android app.',
      'Ecossistema cliente-servidor para buscar e baixar música em FLAC e MP3 320k, com web em React e app Android.'
    ),
    highlights: L(
      [
        'Cola de descargas con progreso en tiempo real por WebSocket',
        'Etiquetado ID3 con carátula, biblioteca y favoritos',
        'HTTPS automático con Caddy, rate limiting y protección de rutas',
      ],
      [
        'Download queue with real-time WebSocket progress',
        'ID3 tagging with cover art, library and favorites',
        'Automatic HTTPS with Caddy, rate limiting and path protection',
      ],
      [
        'Fila de downloads com progresso em tempo real por WebSocket',
        'Etiquetas ID3 com capa, biblioteca e favoritos',
        'HTTPS automático com Caddy, rate limiting e proteção de rotas',
      ]
    ),
    tech: ['FastAPI', 'React', 'Kotlin', 'WebSocket', 'MySQL'],
    links: { code: gh('AuraDowloader') },
  },
  {
    id: 'madera-app',
    category: 'mobile',
    title: L('Madera Poltand · App Android', 'Madera Poltand · Android app', 'Madera Poltand · App Android'),
    summary: L(
      'Aplicación Android para la gestión de inventario y operaciones de Madera Poltand, con APK y AAB firmados para producción.',
      "Android app for inventory and operations management at Madera Poltand, with signed APK and AAB builds for production.",
      'Aplicativo Android para gestão de estoque e operações da Madera Poltand, com APK e AAB assinados para produção.'
    ),
    highlights: L(
      ['Interfaz moderna con Jetpack Compose', 'Inyección de dependencias con Hilt', 'Compatible con Android 8.0 (API 26) o superior'],
      ['Modern UI with Jetpack Compose', 'Dependency injection with Hilt', 'Supports Android 8.0 (API 26) and above'],
      ['Interface moderna com Jetpack Compose', 'Injeção de dependências com Hilt', 'Compatível com Android 8.0 (API 26) ou superior']
    ),
    tech: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Android'],
    links: { code: gh('MaderaApp') },
  },
  {
    id: 'licitaciones',
    category: 'fullstack',
    title: L('Plataforma de Licitaciones Inversas', 'Reverse Auction Platform', 'Plataforma de Licitações Inversas'),
    summary: L(
      'Los compradores publican lo que necesitan y los proveedores compiten con sus ofertas; solo el comprador ve todas las propuestas.',
      'Buyers post what they need and suppliers compete with their offers; only the buyer sees all the bids.',
      'Os compradores publicam o que precisam e os fornecedores competem com suas ofertas; só o comprador vê todas as propostas.'
    ),
    highlights: L(
      [
        'Frontend en React con TypeScript y API REST en FastAPI',
        'PostgreSQL como base de datos y autenticación con Firebase Auth / JWT',
        'Roles de consumidor y proveedor, con privacidad entre ofertas',
      ],
      [
        'React + TypeScript frontend and a FastAPI REST API',
        'PostgreSQL database with Firebase Auth / JWT authentication',
        'Buyer and supplier roles, with privacy between bids',
      ],
      [
        'Frontend em React com TypeScript e API REST em FastAPI',
        'PostgreSQL como banco de dados e autenticação com Firebase Auth / JWT',
        'Papéis de comprador e fornecedor, com privacidade entre as ofertas',
      ]
    ),
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Firebase Auth'],
    links: { code: gh('Licitaciones') },
  },
  {
    id: 'mineria',
    category: 'backend',
    title: L('Madera Minería · Microservicios', 'Mining Timber · Microservices', 'Madeira para Mineração · Microsserviços'),
    summary: L(
      'Sistema de pedidos y entregas de madera para minería, con cinco microservicios que se comunican de forma síncrona y asíncrona.',
      'Timber ordering and delivery system for mining, built from five microservices that communicate synchronously and asynchronously.',
      'Sistema de pedidos e entregas de madeira para mineração, com cinco microsserviços que se comunicam de forma síncrona e assíncrona.'
    ),
    highlights: L(
      [
        'API Gateway con JWT y control de roles',
        'OpenFeign y RabbitMQ para el flujo pedido, notificación y entrega',
        'Una base PostgreSQL por servicio y orquestación con Docker Compose',
      ],
      [
        'API Gateway with JWT and role-based access control',
        'OpenFeign and RabbitMQ for the order, notification and delivery flow',
        'One PostgreSQL database per service, orchestrated with Docker Compose',
      ],
      [
        'API Gateway com JWT e controle de papéis',
        'OpenFeign e RabbitMQ para o fluxo pedido, notificação e entrega',
        'Um banco PostgreSQL por serviço e orquestração com Docker Compose',
      ]
    ),
    tech: ['Java 21', 'Spring Boot', 'RabbitMQ', 'OpenFeign', 'PostgreSQL', 'Docker'],
    links: { code: gh('madera-mineria') },
  },
  {
    id: 'soldadura',
    category: 'automation',
    title: L('Control de proyectos de soldadura · IA', 'Welding project control · AI', 'Controle de projetos de soldagem · IA'),
    summary: L(
      'API que automatiza el costeo y seguimiento de proyectos de soldadura: lee presupuestos en PDF, extrae los datos con IA y los estructura en base de datos.',
      'API that automates costing and tracking of welding projects: it reads PDF quotes, extracts the data with AI and structures it in a database.',
      'API que automatiza o orçamento e o acompanhamento de projetos de soldagem: lê orçamentos em PDF, extrai os dados com IA e os estrutura em banco de dados.'
    ),
    highlights: L(
      [
        'FastAPI con arquitectura en capas (controladores, servicios y modelos)',
        'Extracción estructurada de PDFs con la API de OpenAI',
        'Control de avances semanales y reportes estandarizados',
      ],
      [
        'FastAPI with layered architecture (controllers, services, models)',
        'Structured PDF extraction with the OpenAI API',
        'Weekly progress tracking and standardized reports',
      ],
      [
        'FastAPI com arquitetura em camadas (controllers, serviços e modelos)',
        'Extração estruturada de PDFs com a API da OpenAI',
        'Controle de avanços semanais e relatórios padronizados',
      ]
    ),
    tech: ['Python', 'FastAPI', 'OpenAI', 'SQLAlchemy', 'MySQL'],
    links: { code: gh('automation-of-tracking-back') },
  },
  {
    id: 'rxh-bot',
    category: 'automation',
    org: 'Grupo Ormasan',
    private: true,
    title: L('Bot SUNAT · Recibos por Honorarios', 'SUNAT Bot · Fee Receipts (RxH)', 'Bot SUNAT · Recibos por Honorários'),
    summary: L(
      'Automatiza el flujo completo de RxH: autenticación, búsqueda, descarga masiva, procesamiento y generación de reportes.',
      'Automates the full RxH flow: authentication, search, bulk download, processing and report generation.',
      'Automatiza o fluxo completo de RxH: autenticação, busca, download em massa, processamento e geração de relatórios.'
    ),
    highlights: L(
      ['Integrado con SQL Server para trazabilidad', 'Procesamiento y reportes con Pandas'],
      ['Integrated with SQL Server for traceability', 'Processing and reports with Pandas'],
      ['Integrado ao SQL Server para rastreabilidade', 'Processamento e relatórios com Pandas']
    ),
    tech: ['Python', 'FastAPI', 'Playwright', 'SQL Server'],
    links: {},
  },
  {
    id: 'sismoclima',
    category: 'data',
    title: L('Sismoclima Perú', 'Sismoclima Peru', 'Sismoclima Peru'),
    summary: L(
      'Plataforma de prevención que consolida clima, calidad del aire y sismicidad en tiempo real y detecta anomalías con Machine Learning.',
      'Prevention platform that consolidates weather, air quality and seismic activity in real time and detects anomalies with Machine Learning.',
      'Plataforma de prevenção que consolida clima, qualidade do ar e sismicidade em tempo real e detecta anomalias com Machine Learning.'
    ),
    highlights: L(
      ['Backend SOAP con Spring Boot (Java 21) y MySQL', 'Ingesta de USGS, Open-Meteo y OpenAQ', 'Panel Vue 3 con mapas Leaflet y reportes PDF'],
      ['SOAP backend with Spring Boot (Java 21) and MySQL', 'Ingestion from USGS, Open-Meteo and OpenAQ', 'Vue 3 dashboard with Leaflet maps and PDF reports'],
      ['Backend SOAP com Spring Boot (Java 21) e MySQL', 'Ingestão de USGS, Open-Meteo e OpenAQ', 'Painel Vue 3 com mapas Leaflet e relatórios PDF']
    ),
    tech: ['Java 21', 'Spring Boot', 'SOAP', 'MySQL', 'Vue 3', 'Leaflet'],
    links: { code: gh('anomaly-detection') },
  },
  {
    id: 'poltand',
    category: 'fullstack',
    title: L('Madera Poltand · Sistema en producción', 'Madera Poltand · Production system', 'Madera Poltand · Sistema em produção'),
    summary: L(
      'Sistema web de la empresa para gestionar requerimientos, viajes, ingresos y proveedores de madera, en uso real con acceso por usuario.',
      "The company's web system to manage timber requests, trips, receipts and suppliers, in real use with per-user access.",
      'Sistema web da empresa para gerenciar requisições, viagens, entradas e fornecedores de madeira, em uso real com acesso por usuário.'
    ),
    highlights: L(
      [
        'API REST con Node.js y Express 5, MySQL y autenticación JWT con bcrypt',
        'Seguridad en capas: Helmet, CORS estricto, rate limiting, HPP y control por API key',
        'Logs con Winston y despliegue con PM2 detrás de un proxy inverso',
      ],
      [
        'REST API with Node.js and Express 5, MySQL and JWT auth with bcrypt',
        'Layered security: Helmet, strict CORS, rate limiting, HPP and API-key control',
        'Winston logging and PM2 deployment behind a reverse proxy',
      ],
      [
        'API REST com Node.js e Express 5, MySQL e autenticação JWT com bcrypt',
        'Segurança em camadas: Helmet, CORS estrito, rate limiting, HPP e controle por API key',
        'Logs com Winston e implantação com PM2 atrás de um proxy reverso',
      ]
    ),
    tech: ['Node.js', 'Express', 'MySQL', 'JWT', 'Vue', 'PM2'],
    links: { code: gh('poltand_madera'), demo: 'https://poltand.duckdns.org/login', demoKind: 'prod' },
  },
  {
    id: 'mype-ai',
    category: 'fullstack',
    title: L('Asistente AI para MYPE Perú', 'AI Assistant for Peruvian SMEs', 'Assistente de IA para MYPE Peru'),
    summary: L(
      'Asistente para micro y pequeñas empresas: calcula el régimen tributario más conveniente y responde consultas con IA.',
      'Assistant for micro and small businesses: it calculates the most convenient tax regime and answers questions with AI.',
      'Assistente para micro e pequenas empresas: calcula o regime tributário mais conveniente e responde dúvidas com IA.'
    ),
    highlights: L(
      [
        'Chat de asesoría empresarial con Google Gemini',
        'Cálculo automático de régimen tributario',
        'API modular con validación, logging y manejo central de errores',
      ],
      [
        'Business advisory chat powered by Google Gemini',
        'Automatic tax-regime calculation',
        'Modular API with validation, logging and centralized error handling',
      ],
      [
        'Chat de consultoria empresarial com Google Gemini',
        'Cálculo automático do regime tributário',
        'API modular com validação, logging e tratamento central de erros',
      ]
    ),
    tech: ['Node.js', 'Express', 'Google Gemini', 'Vue', 'Vercel'],
    links: { code: gh('Asistente-AI-MYPE-Peru---Backend'), demo: 'https://asistente-ai-mype-peru-frontend.vercel.app' },
  },
  {
    id: 'tallermina',
    category: 'data',
    title: L('Análisis de Consumos · Taller Mina', 'Consumption Analytics · Mine Workshop', 'Análise de Consumos · Oficina da Mina'),
    summary: L(
      'Plataforma web que carga archivos Excel de consumo, calcula indicadores de costos y exporta reportes ejecutivos.',
      'Web platform that loads Excel consumption files, computes cost indicators and exports executive reports.',
      'Plataforma web que carrega arquivos Excel de consumo, calcula indicadores de custos e exporta relatórios executivos.'
    ),
    highlights: L(
      ['KPIs en tiempo real y gráficos de gasto por mina y producto', 'Reporte consolidado por lotes de minas', 'Exportación a Excel y PDF con formato corporativo'],
      ['Real-time KPIs and spend charts by mine and product', 'Batch-consolidated report across mines', 'Excel and PDF export with corporate formatting'],
      ['KPIs em tempo real e gráficos de gasto por mina e produto', 'Relatório consolidado por lotes de minas', 'Exportação para Excel e PDF com formatação corporativa']
    ),
    tech: ['Python', 'Flask', 'Excel', 'PDF'],
    links: { code: gh('AnaliticDataTallerMina') },
  },
  {
    id: 'telecomx',
    category: 'data',
    title: L('Telecom X · Predicción de churn', 'Telecom X · Churn prediction', 'Telecom X · Previsão de churn'),
    summary: L(
      'Challenge de Alura Latam (Oracle ONE): análisis y modelo de machine learning para predecir la evasión de clientes de una telco.',
      'Alura Latam (Oracle ONE) challenge: analysis and machine-learning model to predict customer churn at a telecom company.',
      'Desafio da Alura Latam (Oracle ONE): análise e modelo de machine learning para prever a evasão de clientes de uma telecom.'
    ),
    highlights: L(
      ['EDA sobre 7.043 clientes: 26,5 % de churn', 'Los contratos mes a mes concentran el 88 % de la fuga', 'Regresión logística y Random Forest, evaluados con ROC-AUC y matriz de confusión'],
      ['EDA on 7,043 customers: 26.5% churn', 'Month-to-month contracts account for 88% of churn', 'Logistic regression and Random Forest, evaluated with ROC-AUC and a confusion matrix'],
      ['EDA com 7.043 clientes: 26,5 % de churn', 'Contratos mensais concentram 88 % da evasão', 'Regressão logística e Random Forest, avaliados com ROC-AUC e matriz de confusão']
    ),
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    links: { code: gh('reto_final_telecomX') },
  },
  {
    id: 'bcrp-etl',
    category: 'data',
    title: L('Pipeline ETL · Indicadores BCRP', 'ETL Pipeline · BCRP Indicators', 'Pipeline ETL · Indicadores BCRP'),
    summary: L(
      'Extrae indicadores macroeconómicos del BCRP, los valida y los carga en SQL Server para análisis.',
      "Extracts macroeconomic indicators from Peru's central bank (BCRP), validates them and loads them into SQL Server for analysis.",
      'Extrai indicadores macroeconômicos do BCRP (banco central do Peru), valida-os e os carrega no SQL Server para análise.'
    ),
    highlights: L(
      ['Extractor, transformador, validador y loader desacoplados', 'Tipo de cambio, inflación, reservas y tasa de referencia', 'Empaquetado con Docker y tests'],
      ['Decoupled extractor, transformer, validator and loader', 'Exchange rate, inflation, reserves and policy rate', 'Packaged with Docker and tests'],
      ['Extrator, transformador, validador e loader desacoplados', 'Câmbio, inflação, reservas e taxa de referência', 'Empacotado com Docker e testes']
    ),
    tech: ['Python', 'Pandas', 'SQLAlchemy', 'SQL Server', 'Docker'],
    links: { code: gh('bcrp-etl') },
  },
];
