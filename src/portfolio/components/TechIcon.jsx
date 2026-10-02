import {
  siPython, siFastapi, siFlask, siNodedotjs, siExpress, siTypescript, siJavascript, siOpenjdk,
  siSpringboot, siSpring, siVuedotjs, siReact, siVite, siTailwindcss, siHtml5, siKotlin,
  siJetpackcompose, siAndroid, siFirebase, siMysql, siPostgresql, siMongodb, siPrisma, siSqlalchemy,
  siSqlite, siPandas, siNumpy, siScikitlearn, siLangchain, siGooglegemini, siJupyter, siDocker, siGit,
  siGithub, siGithubactions, siTerraform, siVercel, siRabbitmq, siSocketdotio, siJsonwebtokens,
  siSwagger, siStreamlit, siLeaflet, siGooglecloud, siPm2, siCisco, siPlatzi, siPearson,
} from 'simple-icons';

// nombre normalizado → icono de simple-icons. Lo que no esté aquí muestra un monograma.
const ICONS = {
  python: siPython, fastapi: siFastapi, flask: siFlask, nodejs: siNodedotjs, express: siExpress,
  typescript: siTypescript, javascript: siJavascript, java: siOpenjdk, java17: siOpenjdk, java21: siOpenjdk,
  springboot: siSpringboot, springcloud: siSpring, openfeign: siSpring, vue: siVuedotjs, vue3: siVuedotjs,
  react: siReact, vite: siVite, tailwindcss: siTailwindcss, html5: siHtml5, kotlin: siKotlin,
  jetpackcompose: siJetpackcompose, android: siAndroid, firebase: siFirebase, firebaseauth: siFirebase,
  firestore: siFirebase, cloudfunctions: siGooglecloud, mysql: siMysql, postgresql: siPostgresql,
  mongodb: siMongodb, prisma: siPrisma, sqlalchemy: siSqlalchemy, sqlite: siSqlite, pandas: siPandas,
  numpy: siNumpy, scikitlearn: siScikitlearn, langchain: siLangchain, googlegemini: siGooglegemini,
  gemini: siGooglegemini, jupyter: siJupyter, docker: siDocker, git: siGit, github: siGithub,
  githubactions: siGithubactions, terraform: siTerraform, vercel: siVercel, rabbitmq: siRabbitmq,
  socketio: siSocketdotio, jwt: siJsonwebtokens, swagger: siSwagger, streamlit: siStreamlit,
  leaflet: siLeaflet, pm2: siPm2, cisco: siCisco, platzi: siPlatzi, pearson: siPearson,
  oci: null,
};

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

// Monograma para marcas sin logo disponible (Azure, SQL Server, Playwright, OpenAI…).
const mono = (name) => {
  const words = String(name).replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
};

export default function TechIcon({ name, size = 16, fallback = true, className = '' }) {
  const icon = ICONS[norm(name)];
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className={`shrink-0 ${className}`}>
        <path d={icon.path} />
      </svg>
    );
  }
  if (!fallback) return null;
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-[4px] border border-current font-mono font-bold leading-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(7, Math.round(size * 0.46)) }}
    >
      {mono(name)}
    </span>
  );
}
