/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rpg: {
          bg: '#0A0A0F',
          surface: '#12121A',
          card: '#161622',
          border: '#272938',
          mana: '#00FF88',     // Verde Neón Fósforo
          ember: '#FF5E00',    // Naranja Fuego
          magic: '#FF007F',    // Rosa / Púrpura Mágico
          hp: '#FF2A4D',       // Rojo Sangre HP
          xp: '#00D4FF',       // Azul Mágico XP
          gold: '#FFD700',     // Oro Legendario
          muted: '#8B949E',
          light: '#E6EDF3',
        }
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace', 'cursive'],
        mono: ['"Fira Code"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-mana': '0 0 15px rgba(0, 255, 136, 0.4)',
        'glow-ember': '0 0 15px rgba(255, 94, 0, 0.4)',
        'glow-magic': '0 0 15px rgba(255, 0, 127, 0.4)',
        'glow-xp': '0 0 15px rgba(0, 212, 255, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.98' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
