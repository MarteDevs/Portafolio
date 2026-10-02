# 🛡️ Portafolio SPA con Temática Retro RPG / Terminal

> **Aventurero / Autor**: Marco Polo Silva  
> **Clase**: Full Stack Paladin & Code Alchemist  
> **Versión**: 2.0  
> **Stack**: React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide Icons, Web Audio API

---

## 🎮 Características Destacadas

- **HUD de Aventurero**: Barra superior fija con avatar, nivel, barras dinámicas de HP, MP y XP, reloj de sistema y toggles para silenciar audio y alternar líneas scanline CRT.
- **Efectos de Sonido 8-Bit Nativos**: Sintetizador retro generado en tiempo real con Web Audio API (tonos para clicks, hovers, confirmación de misiones y terminal bips), con soporte de silencio persistente en `localStorage`.
- **Efectos Visuales Retro**:
  - Scanlines CRT y viñeta arcade conmutable.
  - Marcos de tarjetas estilo ASCII (`╔═╗ ╚═╝`).
  - Animación typewriter y terminal cursor en tiempo real.
  - Paleta neón ciberpunk optimizada para máxima legibilidad y contraste.
- **Tablón de Misiones (Proyectos)**:
  - Filtros dinámicos reactivos por categoría (Fullstack, Frontend, Backend, Mobile) y proyectos legendarios.
  - Modal interactivo de inspección de artefacto con preview, historia técnica, runas equipadas y enlaces a GitHub y demos en vivo.
- **Árbol de Habilidades (Skills Tree)**:
  - Disciplinas clasificadas (Frontend Magic, Backend Alchemy, DevOps & Runes).
  - Barras de maestría de 1 a 100 con rangos (Grand Master, Master, Adept).
  - Perks pasivos de desarrollo desbloqueados.
- **Ficha del Héroe (About Me)**:
  - Atributos clásicos estilo D&D (STR, INT, AGI, VIT, WIS).
  - Crónica / Biografía técnica.
  - Condecoraciones y logros desbloqueados en producción.
- **Portal de Invocación (Contacto)**:
  - Terminal interactiva para transmisión de pergaminos con simulación de envío, feedback sonoro y canales directos.
- **Carga de Datos Flexible (Google Sheets / Airtable / Local)**:
  - El hook `useProjects` soporta consumir Google Sheets o Airtable mediante variables en `.env`.
  - Si no se configuran credenciales remotas o se está sin conexión, la app realiza un fallback instantáneo y seguro a los datos estáticos de `src/data/mockProjects.js`.

---

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar en modo desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL que indique Vite (por defecto `http://localhost:3000`).

### 3. Compilar para producción
```bash
npm run build
```

---

## 🗄️ Esquema de Datos RPG (Misiones / Proyectos)

Cada proyecto en `src/data/mockProjects.js` (o en las columnas de Google Sheets) sigue el esquema estandarizado:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | string | Identificador único (`quest-01`, `quest-02`, ...) |
| `title` | string | Título de la misión / proyecto |
| `tagline` | string | Resumen en una sola línea |
| `description` | string | Lore y detalles técnicos completos |
| `category` | string | Categoría (`Fullstack`, `Frontend`, `Backend`, `Mobile`) |
| `technologies` | array | Lista de tecnologías/runas empleadas |
| `year` | number | Año de conclusión |
| `difficultyRank` | string | Rango de dificultad (`S-Rank`, `A-Rank`, `B-Rank`) |
| `githubUrl` | string | Enlace al repositorio de código |
| `demoUrl` | string | Enlace a la aplicación desplegada |
| `imageUrl` | string | URL del artefacto o captura de pantalla |
| `featured` | boolean | Si aparece como Legendario destacado |

---

## 📄 Conexión Opcional a Google Sheets API

Si deseas gestionar tus proyectos en Google Sheets:
1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
2. Rellena las variables:
   ```env
   VITE_GOOGLE_API_KEY=tu_api_key_de_google_cloud
   VITE_GOOGLE_SHEET_ID=tu_id_de_hoja_de_calculo
   ```
3. La hoja de Google Sheets debe contener las siguientes columnas en la fila 1:
   `id`, `title`, `description`, `technologies`, `year`, `github_url`, `demo_url`, `image_url`, `featured`
