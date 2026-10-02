import { L } from '../i18n/L';

// icon: nombre de ícono lucide (ver Roles.jsx). proofs: ids de proyectos que lo respaldan.
export const roles = [
  {
    id: 'backend',
    icon: 'Server',
    title: L('Backend Developer', 'Backend Developer', 'Desenvolvedor Backend'),
    text: L(
      'APIs REST seguras y escalables, autenticación JWT/RBAC, tiempo real con Socket.IO y microservicios.',
      'Secure, scalable REST APIs, JWT/RBAC authentication, real-time with Socket.IO and microservices.',
      'APIs REST seguras e escaláveis, autenticação JWT/RBAC, tempo real com Socket.IO e microsserviços.'
    ),
    tech: ['Python', 'FastAPI', 'Node.js', 'Express', 'Java', 'Spring Boot'],
    proofs: ['poltand', 'mineria'],
  },
  {
    id: 'fullstack',
    icon: 'Layers',
    title: L('Full Stack Developer', 'Full Stack Developer', 'Desenvolvedor Full Stack'),
    text: L(
      'Del componente de interfaz al servicio backend: Vue y React conectados a APIs propias, con despliegue.',
      'From UI component to backend service: Vue and React wired to custom APIs, deployed end to end.',
      'Do componente de interface ao serviço backend: Vue e React conectados a APIs próprias, com implantação.'
    ),
    tech: ['Vue 3', 'React', 'TypeScript', 'MySQL', 'PostgreSQL', 'Vercel'],
    proofs: ['expedientecheck', 'licitaciones'],
  },
  {
    id: 'automation',
    icon: 'Bot',
    title: L('Automatización / RPA', 'Automation / RPA', 'Automação / RPA'),
    text: L(
      'Bots que reemplazan horas de trabajo manual: portales web, XML, Excel y reportes, con reintentos y trazabilidad.',
      'Bots that replace hours of manual work: web portals, XML, Excel and reports, with retries and traceability.',
      'Bots que substituem horas de trabalho manual: portais web, XML, Excel e relatórios, com tentativas e rastreabilidade.'
    ),
    tech: ['Python', 'Playwright', 'OpenPyXL', 'Pandas', 'SQL Server'],
    proofs: ['sire-bot', 'soldadura'],
  },
  {
    id: 'data',
    icon: 'BarChart3',
    title: L('Datos & Analítica', 'Data & Analytics', 'Dados & Analytics'),
    text: L(
      'EDA, pipelines ETL, tableros e indicadores; modelos de machine learning con Scikit-learn.',
      'EDA, ETL pipelines, dashboards and KPIs; machine-learning models with Scikit-learn.',
      'EDA, pipelines ETL, painéis e indicadores; modelos de machine learning com Scikit-learn.'
    ),
    tech: ['Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'SQL Server', 'Jupyter'],
    proofs: ['telecomx', 'bcrp-etl'],
  },
  {
    id: 'ai',
    icon: 'Sparkles',
    title: L('IA aplicada', 'Applied AI', 'IA aplicada'),
    text: L(
      'Integración de LLMs en productos: RAG sobre documentos propios, extracción estructurada y asistentes.',
      'Integrating LLMs into products: RAG over private documents, structured extraction and assistants.',
      'Integração de LLMs em produtos: RAG sobre documentos próprios, extração estruturada e assistentes.'
    ),
    tech: ['LangChain', 'Google Gemini', 'OpenAI', 'FAISS', 'Streamlit'],
    proofs: ['pegasus', 'mype-ai'],
  },
  {
    id: 'mobile',
    icon: 'Smartphone',
    title: L('Android', 'Android', 'Android'),
    text: L(
      'Apps nativas con Kotlin y Jetpack Compose, Firebase y consumo de APIs REST.',
      'Native apps with Kotlin and Jetpack Compose, Firebase and REST API consumption.',
      'Apps nativos com Kotlin e Jetpack Compose, Firebase e consumo de APIs REST.'
    ),
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Android'],
    proofs: ['kardia', 'madera-app'],
  },
];
