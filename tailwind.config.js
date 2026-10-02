/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0c10',
        surface: '#12141b',
        accent: '#c8f542',
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Hanken Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        spin: { to: { transform: 'rotate(360deg)' } },
        bob: { '0%,100%': { transform: 'translateY(-10px)' }, '50%': { transform: 'translateY(10px)' } },
      },
      animation: {
        orbit: 'spin 26s linear infinite',
        'orbit-rev': 'spin 38s linear infinite reverse',
        bob: 'bob 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
