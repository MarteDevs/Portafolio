import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { Zap, Database, Bot } from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import Reveal, { SectionTitle } from './Reveal';

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = to;
      return;
    }
    const c = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>0</span>;
}

const stats = [
  { value: projects.length, label: 'Proyectos destacados' },
  { value: new Date().getFullYear() - profile.sinceYear, label: 'Años en GitHub' },
  { value: 4, label: 'Lenguajes en producción' },
];

const pillars = [
  { icon: Zap, title: 'Automatización', text: 'Convierto procesos manuales y repetitivos en flujos automáticos y confiables.' },
  { icon: Database, title: 'Datos', text: 'Pipelines ETL, modelado en SQL y APIs que mueven la información correcta.' },
  { icon: Bot, title: 'IA aplicada', text: 'Integro LLMs y modelos de detección en productos con un caso de uso claro.' },
];

export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle eyebrow="Sobre mí" title="Backend con mentalidad de producto" />
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="space-y-5 text-lg leading-relaxed text-slate-400 lg:col-span-3">
          <p>
            Soy desarrollador backend e ingeniero de automatización en <span className="text-white">{profile.company}</span>, {profile.location}.
            Me enfoco en construir sistemas que se usan todos los días y que reducen el trabajo manual del equipo.
          </p>
          <p>
            Trabajo con Python, Node.js y Java, diseño APIs y microservicios, y conecto servicios de IA con procesos reales de negocio:
            desde asesoría tributaria para MYPE hasta logística de madera y detección de anomalías ambientales.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-surface p-4">
                <div className="text-3xl font-bold text-gradient"><Counter to={s.value} /></div>
                <div className="mt-1 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="space-y-4 lg:col-span-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-surface p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-violet/30 to-accent-cyan/20 text-accent-cyan">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
