# Portafolio · Marco Polo Silva

Portafolio de Backend Developer & Automation Engineer. React 18 + Vite + Tailwind + Framer Motion, con hero 3D en Spline.

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Dónde editar el contenido
- `src/portfolio/data/profile.js`: nombre, resumen, correo y redes.
- `src/portfolio/data/projects.js`: proyectos (datos tomados de los repos de GitHub).
- `src/portfolio/data/skills.js`: stack.
- Escena 3D: constante `SPLINE_SCENE` en `src/portfolio/components/Hero.jsx` (solo se carga en pantallas ≥ 1024px y sin "reducir movimiento").

## Formulario de contacto (EmailJS)
1. Crea un servicio y una plantilla en https://dashboard.emailjs.com. La plantilla usa `{{name}}`, `{{email}}` y `{{message}}`.
2. Copia `.env.example` a `.env` y completa `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY`.
3. En Vercel agrega las mismas variables. Sin ellas, el formulario abre el correo (`mailto:`) como alternativa.
