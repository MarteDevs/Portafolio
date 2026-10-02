import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, ui } from './ui';

const Ctx = createContext(null);
const STORAGE_KEY = 'portfolio-lang';
const codes = LANGS.map((l) => l.code);

// Idioma inicial: el elegido antes > el del navegador del visitante > inglés (internacional).
function detect() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (codes.includes(saved)) return saved;
  } catch {
    /* sin almacenamiento */
  }
  const prefs = (typeof navigator !== 'undefined' && (navigator.languages?.length ? navigator.languages : [navigator.language])) || [];
  for (const p of prefs) {
    const base = String(p).toLowerCase().split('-')[0];
    if (codes.includes(base)) return base;
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detect);

  const setLang = useCallback((code) => {
    if (!codes.includes(code)) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* sin almacenamiento */
    }
  }, []);

  const value = useMemo(() => {
    const locale = LANGS.find((l) => l.code === lang).locale;
    // tr: elige el texto del idioma activo (acepta string o {es,en,pt}).
    const tr = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x[lang] ?? x.es : x);
    // fmt: 'YYYY-MM' -> "mar. 2026" / "Mar 2026"
    const fmt = (ym) => {
      const [y, m] = ym.split('-').map(Number);
      return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(new Date(y, m - 1, 1));
    };
    return { lang, setLang, tr, fmt, t: ui };
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = value.tr(ui.meta.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.tr(ui.meta.description));
  }, [lang, value]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
