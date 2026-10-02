import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Lock } from 'lucide-react';
import { projects, categories } from '../data/projects';
import { profile } from '../data/profile';
import Reveal, { SectionTitle } from './Reveal';

function Card({ p, span, index }) {
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
      className={`spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-accent ${span}`}
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500">{p.category}</span>
          <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="font-display text-2xl font-bold leading-tight text-white">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.summary}</p>

        <ul className="mt-4 space-y-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-slate-300">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-6 border-t border-white/10 pt-4 text-sm">
          {p.links.code ? (
            <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-slate-200 transition hover:text-accent">
              <Github className="h-4 w-4" /> Código
            </a>
          ) : (
            <span className="inline-flex min-h-[44px] items-center gap-1.5 text-slate-500">
              <Lock className="h-4 w-4" /> Código privado{p.org ? ` · ${p.org}` : ''}
            </span>
          )}
          {p.links.demo && (
            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-accent transition hover:text-white">
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
  // Cuadrícula tipo bento (solo ≥ lg): ciclo de 7 tarjetas = filas 2+1, 1+1+1, 1+2.
  const cycle = ['lg:col-span-2', '', '', '', '', '', 'lg:col-span-2'];
  const spans =
    cat === 'Todos'
      ? list.map((_, i) => cycle[i % 7])
      : list.length === 1
        ? ['lg:col-span-3']
        : list.length === 2
          ? ['lg:col-span-2', '']
          : list.map(() => '');
  // Si la última fila queda incompleta en "Todos", la última tarjeta la completa.
  if (cat === 'Todos' && list.length % 7 === 1) spans[list.length - 1] = 'lg:col-span-3';

  return (
    <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle
        eyebrow="01 — Proyectos"
        title="Sistemas reales, no demos de tutorial"
        subtitle="Una selección de mis repositorios en GitHub: backend, datos e IA aplicados a problemas concretos."
      />

      <Reveal className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-medium transition ${
              cat === c
                ? 'border-transparent bg-[#eceae4] text-ink'
                : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <Card key={p.id} p={p} index={i} span={spans[i] ?? ''} />
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
