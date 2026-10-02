import { GraduationCap, Award } from 'lucide-react';
import { education, certifications } from '../data/experience';
import { useLang } from '../i18n/LanguageContext';
import TechIcon from './TechIcon';
import Reveal, { SectionTitle } from './Reveal';

export default function Education() {
  const { t, tr, fmt } = useLang();
  return (
    <section id="formacion" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle eyebrow={tr(t.education.eyebrow)} title={tr(t.education.title)} subtitle={tr(t.education.subtitle)} />

      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="h-full rounded-3xl border border-white/10 bg-surface p-6 transition hover:border-white/25">
              <GraduationCap className="mb-4 h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold text-white">{tr(e.title)}</h3>
              <p className="mt-1 text-sm text-accent">{tr(e.org)}</p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                {fmt(e.start)} – {fmt(e.end)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{tr(e.note)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-bold text-white">
          <Award className="h-5 w-5 text-accent" /> {tr(t.education.certs)}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-surface px-5 py-4">
              <div className="text-sm font-medium text-white">{tr(c.name)}</div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-slate-500">
                {c.icon && <TechIcon name={c.icon} size={12} fallback={false} />}
                {c.issuer} · {fmt(c.date)}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
