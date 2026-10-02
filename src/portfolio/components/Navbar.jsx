import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';
import { profile } from '../data/profile';
import { useLang } from '../i18n/LanguageContext';
import Logo from './Logo';
import LangSwitch from './LangSwitch';

const links = [
  { id: 'proyectos', key: 'projects' },
  { id: 'areas', key: 'roles' },
  { id: 'experiencia', key: 'experience' },
  { id: 'stack', key: 'stack' },
  { id: 'formacion', key: 'education' },
  { id: 'contacto', key: 'contact' },
];

export default function Navbar() {
  const { t, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-2.5 text-white" aria-label={profile.name}>
          <Logo size={36} />
          <span className="hidden font-display font-bold xl:inline">Marco Polo</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === l.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tr(t.nav[l.key])}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/30 hover:text-white sm:grid"
          >
            <Github className="h-4 w-4" />
          </a>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={tr(t.nav.menu)}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/10 px-5 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {tr(t.nav[l.key])}
              </a>
            </li>
          ))}
        </ul>
      )}

      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent" />
    </header>
  );
}
