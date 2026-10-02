import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { jobs, certifications } from '../data/experience';
import Reveal, { SectionTitle } from './Reveal';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = to + suffix;
      return;
    }
    const c = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix, reduce]);
  return <span ref={ref}>0</span>;
}

const stats = [
  { value: profile.yearsExperience, suffix: '+', label: 'Años de experiencia' },
  { value: projects.length, label: 'Proyectos destacados' },
  { value: certifications.length, label: 'Certificaciones' },
];

export default function Experience() {
  return (
    <section id="experiencia" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle eyebrow="02 — Experiencia" title="Dónde he construido sistemas reales" />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <p className="text-lg leading-relaxed text-slate-400">
            Soy desarrollador full stack con base sólida en backend. He trabajado en RR. HH., logística, auditoría y gestión
            documental, siempre con el mismo objetivo: que el equipo deje de hacer a mano lo que una API o un bot hace mejor.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-surface p-4">
                <div className="font-display text-4xl font-extrabold text-accent">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
          <a
            href={profile.cv}
            download
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            Descargar CV (PDF)
          </a>
        </Reveal>

        <ol className="relative space-y-5 border-l border-white/10 pl-6 sm:pl-8">
          {jobs.map((j, i) => (
            <li key={j.org + j.period} className="relative">
              <span
                className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-ink sm:-left-[39px] ${
                  j.current ? 'bg-accent shadow-[0_0_14px_#c8f542]' : 'bg-slate-600'
                }`}
              />
              <Reveal delay={i * 0.06}>
                <div className="rounded-3xl border border-white/10 bg-surface p-6 transition hover:border-white/25">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-slate-500">
                    <span className={j.current ? 'text-accent' : ''}>{j.period}</span>
                    <span>·</span>
                    <span>{j.place}</span>
                  </div>
                  <h3 className="mt-3 flex items-start gap-2 font-display text-xl font-bold text-white">
                    <Briefcase className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                    {j.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{j.org}</p>
                  <ul className="mt-4 space-y-2">
                    {j.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
