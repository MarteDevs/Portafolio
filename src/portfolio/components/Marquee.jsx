import { marquee } from '../data/skills';
import TechIcon from './TechIcon';

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="marquee-track flex w-max gap-12">
        {items.map((name, i) => (
          <span key={i} className="flex items-center gap-2.5 font-mono text-sm text-slate-400">
            <TechIcon name={name} size={20} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
