import { skillGroups } from '../data/skills';
import { useLang } from '../i18n/LanguageContext';
import TechIcon from './TechIcon';
import Reveal, { SectionTitle } from './Reveal';

export default function Stack() {
  const { t, tr } = useLang();
  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle eyebrow={tr(t.stack.eyebrow)} title={tr(t.stack.title)} subtitle={tr(t.stack.subtitle)} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div className="h-full rounded-3xl border border-white/10 bg-surface p-6">
              <h3 className="mb-4 font-display text-xl font-bold text-white">{tr(g.title)}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s, j) => {
                  const label = tr(s);
                  const key = typeof s === 'string' ? s : s.es;
                  return (
                    <span
                      key={j}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition hover:border-accent/60 hover:text-white"
                    >
                      <TechIcon name={key} size={15} fallback={false} className="text-slate-400" />
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
