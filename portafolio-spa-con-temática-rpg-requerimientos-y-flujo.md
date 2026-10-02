# 📜 Portafolio SPA con Temática RPG: Requerimientos, Datos y Flujo de Implementación

> **Autor / Aventurero**: Marco Polo Silva  
> **Clase**: Full Stack Alchemist / Code Paladin  
> **Fecha**: 15 de septiembre de 2026  
> **Versión**: 2.0 (Organizada, Renombrada y Estandarizada)  
> **Estado**: 🛡️ **En Implementación Activa**

---

## 🎯 **1. Objetivo General**
Desarrollar una **Single Page Application (SPA)** moderna, inmersiva y de alto rendimiento que funcione como portafolio profesional con estética **Retro Terminal Cyber-RPG / 8-Bit Fantasy**:
- **Interfaz Híbrida**: Estilo terminal CRT vintage combinado con HUD de RPG (Barra HP/MP/XP, rangos, inventario de misiones y árbol de habilidades).
- **Interactividad Táctil & Sonora**: Microinteracciones fluidas con Framer Motion y sintetizador retro nativo Web Audio API (efectos 8-bit de clicks, level-up y hover sin dependencias externas rotas).
- **Carga de Datos Flexible**: Adaptador dinámico para proyectos desde Google Sheets (REST / CSV público) o Airtable, con fallback instantáneo a datos locales integrados (mock offline garantizado).
- **Diseño Responsivo y Accesible**: Tipografías retrolegibles, soporte de teclado, contraste WCAG y modo scanline conmutable.

---

## 🧭 **2. Estructura y Rutas del SPA**

| Sección / Módulo | Ruta | Descripción RPG | Elementos Clave | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **HUD / Top Header** | Global | Barra de estado de Aventurero | Status Bar: Avatar, Nombre, Nivel, HP (Salud de código), XP (Experiencia), Navegación terminal, SFX toggle | ⭐⭐⭐⭐⭐ |
| **Hero / Chamber** | `/` | Portal de Bienvenida & Lore inicial | Título glitch/typewriter, botones CTA "Iniciar Aventura" / "Examinar Misiones", terminal status log | ⭐⭐⭐⭐⭐ |
| **Quest Board (Proyectos)** | `/projects` | Tablón de Misiones Cumplidas | Filtros por Runa/Tecnología y Año; Tarjetas de Misión estilo ítem de inventario; Modal de Detalle de Misión | ⭐⭐⭐⭐⭐ |
| **Skill Tree (Habilidades)** | `/skills` | Árbol de Magias y Disciplinas | Barras de maestría (Nivel 1-100), categorías (Frontend Magic, Backend Alchemy, DevOps & Tools), perks desbloqueados | ⭐⭐⭐⭐ |
| **Hero Chronicle (Sobre Mí)** | `/about` | Registro Biográfico & Lore | Retrato del Aventurero, biografía narrativa RPG, estadísticas de atributos (STR, INT, AGI, VIT, WIS) | ⭐⭐⭐⭐ |
| **Summon Guild (Contacto)** | `/contact` / Footer | Pergamino de Invocación / Quest Log | Formulario interactivo tipo prompt/terminal, enlaces de gremio (GitHub, LinkedIn, Email), copyright ASCII | ⭐⭐⭐ |

---

## 🎨 **3. Especificación de Diseño Visual (UI/UX)**

### **Paleta de Colores Cyber-RPG**
| Variable de Color | Hex Code | Propósito en la Interfaz |
| :--- | :--- | :--- |
| `bg-terminal` | `#0A0A0F` | Fondo principal oscuro, emulando pantalla fósforo apagada. |
| `card-surface` | `#12121A` | Fondo de tarjetas, paneles HUD e inventario. |
| `primary-mana` | `#00FF88` | Verde fósforo brillante (textos destacados, XP, éxito). |
| `secondary-ember` | `#FF5E00` | Naranja fuego retro (hover, acciones secundarias, alertas). |
| `accent-magic` | `#FF007F` | Rosa neón / Púrpura mágico (bordes raros, items legendarios). |
| `hp-crimson` | `#FF2A4D` | Rojo sangre para barra de HP y botones críticos. |
| `text-display` | `#E0E6ED` | Blanco grisáceo de alta legibilidad para cuerpo de texto. |
| `border-bracket` | `#2D323F` | Bordes estructurados y divisiones tipo consola. |

### **Tipografía**
- **Títulos y Cabeceras HUD**: `'Press Start 2P'`, monospace retro arcade.
- **Cuerpo, Lore y Terminal Code**: `'Fira Code'`, `'JetBrains Mono'`, monospace moderna con ligaduras para máxima legibilidad.

### **Efectos Visuales**
- **Scanlines CRT**: Capa CSS sutil simulando monitor arcade vintage (conmutable para accesibilidad).
- **Bordes ASCII / Frame RPG**: Marcos `╔═══╗`, `║   ║`, `╚═══╝` en tarjetas y paneles.
- **Neon Glow**: Resplandor `box-shadow` e iluminación neón controlada en hovers y estados activos.

---

## 📦 **4. Modelo de Datos Estandarizado (Renombrado y Normalizado)**

### **4.1. Misiones / Proyectos (`ProjectQuest`)**
Para conectar de forma homogénea con Google Sheets, Airtable o `staticData.js`, se define el siguiente esquema normalizado:

| Campo RPG (Estandarizado) | Alias Google Sheet / API | Tipo | Ejemplo | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `id` | `string \| number` | `"quest-01"` | Identificador único de la misión. |
| `title` | `quest_title` | `string` | `"Grimorio Digital SPA"` | Título comercial y temático del proyecto. |
| `tagline` | `quest_tagline` | `string` | `"Plataforma e-commerce para gremios"` | Breve descripción tipo subtítulo (1 línea). |
| `description` | `quest_lore` | `string` | `"Desarrollo de un portal reactivo..."` | Historia completa y detalles técnicos. |
| `category` | `quest_type` | `string` | `"Fullstack" \| "Frontend" \| "Mobile"` | Tipo o gremio de la misión. |
| `technologies` | `runes_equipped` | `string[]` | `["React", "Tailwind", "Framer"]` | Lista de tecnologías (separadas por coma en Sheets). |
| `year` | `chronicle_year` | `number` | `2026` | Año de conclusión de la misión. |
| `difficultyRank` | `difficulty_rank` | `string` | `"S-Rank" \| "A-Rank" \| "B-Rank"` | Grado de complejidad de la misión. |
| `githubUrl` | `code_scroll_url` | `string` | `"https://github.com/..."` | Enlace al repositorio de código fuente. |
| `demoUrl` | `realm_portal_url` | `string` | `"https://demo.com"` | Enlace a la aplicación desplegada en vivo. |
| `imageUrl` | `artefact_image_url` | `string` | `"/assets/images/p1.png"` | Portada visual o screenshot del proyecto. |
| `featured` | `is_legendary` | `boolean` | `true \| false` | Destacado en el Hero / Showcase principal. |

### **4.2. Estadísticas de Habilidades (`CharacterSkill`)**
| Campo | Tipo | Ejemplo |
| :--- | :--- | :--- |
| `id` | `string` | `"skill-react"` |
| `name` | `string` | `"React & Next.js"` |
| `category` | `string` | `"Frontend Magic" \| "Backend Alchemy" \| "DevOps & Runes"` |
| `level` | `number` | `92` (0 a 100) |
| `tier` | `string` | `"Grand Master" \| "Adept" \| "Journeyman"` |
| `iconName` | `string` | `"Code", "Database", "Terminal", "Cpu"` |

### **4.3. Perfil del Personaje (`HeroProfile`)**
- **Nombre**: Marco Polo Silva
- **Título**: Full Stack Engineer & Software Architect
- **Nivel**: Lvl 28
- **HP (Health Points)**: 100 / 100 (Code Integrity)
- **MP (Mana Points)**: 150 / 150 (Creative Energy)
- **XP Actual**: 8,450 / 10,000 XP
- **Atributos**:
  - `STR` (Clean Architecture & Performance): 88
  - `INT` (Algorithms & Logic): 94
  - `AGI` (Fast Delivery & Prototyping): 90
  - `VIT` (Code Resilience & Testing): 85
  - `WIS` (System Design & UX): 92

---

## 🛠️ **5. Arquitectura Técnica y Stack Actualizado**

- **Framework**: React 18+ con Vite
- **Estilos**: Tailwind CSS con configuración de colores cyberpunk y utilidades personalizadas
- **Animaciones**: Framer Motion para transiciones de rutas, orquestación de listas escalonadas y efectos hover
- **Iconografía**: `lucide-react` (iconos vectoriales fiables, modernos y pixel-perfect)
- **Audio Retro**: Motor nativo Web Audio API integrado en hook (`useRetroAudio`), permitiendo sonidos sintéticos retro 8-bit (click, hover, power-up, terminal blip) sin dependencias rotas ni archivos wav pesados
- **Fuente de Datos**:
  - Hook `useProjects`: Capaz de consumir Google Sheets (mediante API Key o endpoint público JSON), Airtable, o caer en `src/data/mockProjects.js` si no hay variables de entorno configuradas.