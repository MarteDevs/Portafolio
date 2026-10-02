import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { profile } from '../data/profile';
import SafeBoundary from './SafeBoundary';

const Spline = lazy(() => import('@splinetool/react-spline'));
const SPLINE_SCENE = 'https://prod.spline.design/YIhBL7hdI7uYHp2z/scene.splinecode';

// Escena 3D de Spline. Mientras carga (o si falla) se ve la animación CSS de fondo.
function SplineScene() {
  const [ready, setReady] = useState(false);
  return (
    <Suspense fallback={null}>
      <Spline
        scene={SPLINE_SCENE}
        onLoad={() => setReady(true)}
        className={`!absolute !inset-0 !h-full !w-full transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </Suspense>
  );
}

// Animación de respaldo en CSS puro: se muestra en móvil, con "reducir movimiento" o si el 3D no carga.
function OrbitFallback({ animate }) {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="absolute h-[92%] w-[92%] rounded-full border border-dashed border-white/15" />
      <div className={`absolute h-[74%] w-[74%] rounded-full border border-dashed border-white/15 ${animate ? 'animate-orbit' : ''}`}>
        <span className="absolute -top-[7px] left-[calc(50%-7px)] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_18px_#c8f542]" />
      </div>
      <div className={`absolute h-[56%] w-[56%] rounded-full border border-dashed border-white/15 ${animate ? 'animate-orbit-rev' : ''}`}>
        <span className="absolute -bottom-[7px] left-[calc(50%-7px)] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_18px_#c8f542]" />
      </div>
      <div
        className={`h-[34%] w-[34%] rounded-full shadow-[0_0_90px_#c8f542] ${animate ? 'animate-bob' : ''}`}
        style={{ background: 'radial-gradient(circle at 35% 30%, #fff, #c8f542 38%, #1c2a05 100%)' }}
      />
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [showSpline, setShowSpline] = useState(false);

  // El 3D solo se carga en pantallas grandes y sin "reducir movimiento"
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShowSpline(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  const item = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        <div>
          <motion.div {...item(0.05)} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {profile.status} · {profile.location}
          </motion.div>

          <motion.h1 {...item(0.15)} className="mt-7 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[84px]">
            Automatizo lo que antes era <span className="text-accent">manual</span>.
          </motion.h1>

          <motion.p {...item(0.28)} className="mt-7 max-w-lg text-lg leading-relaxed text-slate-400 sm:text-xl">
            Soy {profile.name}, {profile.role}. {profile.summary}
          </motion.p>

          <motion.div {...item(0.4)} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-accent px-7 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5"
            >
              Ver proyectos
              <ArrowRight className="h-[18px] w-[18px] transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="inline-flex min-h-[48px] items-center rounded-full border border-white/20 px-7 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
            >
              Escríbeme
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex min-h-[48px] items-center gap-2 px-4 text-[15px] font-medium text-slate-400 transition hover:text-white"
            >
              <Download className="h-4 w-4" /> CV
            </a>
          </motion.div>
        </div>

        {/* Escena 3D: tarjeta redondeada que contiene el Spline */}
        <motion.div
          {...item(0.2)}
          className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#1a1d27_0,#0e1016_62%)] lg:aspect-square lg:max-h-[640px]"
        >
          <OrbitFallback animate={!reduce} />
          {showSpline && (
            <SafeBoundary>
              <SplineScene />
            </SafeBoundary>
          )}
        </motion.div>
      </div>
    </section>
  );
}
