import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import { projects, categories } from '../data/projects';
import { profile } from '../data/profile';
import Reveal, { SectionTitle } from './Reveal';

function Card({ p }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onMouseMove={onMove}
      className="spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/25"
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan">{p.category}</span>
          {p.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
              <Star className="h-3 w-3 fill-current" /> Destacado
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.summary}</p>

        <ul className="mt-4 space-y-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-slate-300">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-violet" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3 border-t border-white/10 pt-4 text-sm">
          <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-slate-300 transition hover:text-white">
            <Github className="h-4 w-4" /> Código
          </a>
          {p.links.demo && (
            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent-cyan transition hover:text-white">
              <ExternalLink className="h-4 w-4" /> Demo en vivo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [cat, setCat] = useState('Todos');
  const list = projects.filter((p) => cat === 'Todos' || p.category === cat);

  return (
    <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle
        eyebrow="Proyectos"
        title="Sistemas reales, no demos de tutorial"
        subtitle="Una selección de mis repositorios en GitHub: backend, datos e IA aplicados a problemas concretos."
      />

      <Reveal className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              cat === c
                ? 'border-transparent bg-white text-ink'
                : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-10 text-center">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white">
          <Github className="h-4 w-4" /> Ver todos mis repositorios en GitHub
        </a>
      </Reveal>
    </section>
  );
}
