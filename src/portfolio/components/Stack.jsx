import { skillGroups } from '../data/skills';
import Reveal, { SectionTitle } from './Reveal';

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle
        eyebrow="Stack"
        title="Tecnologías con las que construyo"
        subtitle="Lo que uso en los proyectos de arriba, agrupado por área."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.07}>
            <div className="h-full rounded-2xl border border-white/10 bg-surface p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition hover:border-accent-violet/60 hover:text-white">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
