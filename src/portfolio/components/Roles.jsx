import { Server, Layers, Bot, BarChart3, Sparkles, Smartphone, MapPin, Languages } from 'lucide-react';
import { roles } from '../data/roles';
import { projects } from '../data/projects';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../data/profile';
import TechIcon from './TechIcon';
import Reveal, { SectionTitle } from './Reveal';

const ICONS = { Server, Layers, Bot, BarChart3, Sparkles, Smartphone };
const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

export default function Roles() {
  const { t, tr } = useLang();
  return (
    <section id="areas" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle eyebrow={tr(t.roles.eyebrow)} title={tr(t.roles.title)} subtitle={tr(t.roles.subtitle)} />

      <Reveal className="-mt-6 mb-10 flex flex-wrap gap-2 text-sm text-slate-300">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
          <MapPin className="h-4 w-4 text-accent" /> {tr(t.roles.remote)} · {tr(profile.location)}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
          <Languages className="h-4 w-4 text-accent" /> {tr(t.roles.english)}
        </span>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((r, i) => {
          const Icon = ICONS[r.icon];
          return (
            <Reveal key={r.id} delay={i * 0.05}>
              <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-ink">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{tr(r.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{tr(r.text)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {r.tech.map((n) => (
                    <span key={n} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300" title={n}>
                      <TechIcon name={n} size={14} /> <span className="text-xs">{n}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{tr(t.roles.evidence)}</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {r.proofs.map((id) => (
                      <li key={id} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <a href="#proyectos" className="hover:text-accent">
                          {tr(byId[id].title)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
