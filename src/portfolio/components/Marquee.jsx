import { marquee } from '../data/skills';

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max gap-10">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm text-slate-500">
            {t}
            <span className="h-1 w-1 rounded-full bg-accent-violet" />
          </span>
        ))}
      </div>
    </div>
  );
}
