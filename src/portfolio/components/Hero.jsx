import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import SafeBoundary from './SafeBoundary';

const Spline = lazy(() => import('@splinetool/react-spline'));
const SPLINE_SCENE = 'https://prod.spline.design/YIhBL7hdI7uYHp2z/scene.splinecode';

function useRotating(list, ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % list.length), ms);
    return () => clearInterval(t);
  }, [list.length, ms]);
  return list[i];
}

function SplineScene() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${
          ready ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-accent-violet/40 to-accent-cyan/30 blur-2xl" />
      </div>
      <Suspense fallback={null}>
        <Spline
          scene={SPLINE_SCENE}
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`!h-full !w-full transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      </Suspense>
    </div>
  );
}

export default function Hero() {
  const role = useRotating(profile.rotatingRoles);
  const reduce = useReducedMotion();
  const [showSpline, setShowSpline] = useState(false);

  // Cargar la escena 3D solo en pantallas grandes y sin "reduce motion"
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShowSpline(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  const item = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fondo: resplandores + rejilla */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent-violet/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent-cyan/15 blur-[120px]" />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* Escena Spline (solo desktop) */}
      {showSpline && (
        <div className="absolute inset-y-0 right-0 w-[62%]">
          <SafeBoundary>
            <SplineScene />
          </SafeBoundary>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </div>
      )}

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28">
        <div className="max-w-xl">
          <motion.div {...item(0.05)} className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponible para nuevos proyectos
            <span className="text-slate-600">·</span>
            <MapPin className="h-3 w-3" /> {profile.location}
          </motion.div>

          <motion.h1 {...item(0.15)} className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Hola, soy <span className="text-gradient">{profile.name.split(' ').slice(0, 2).join(' ')}</span>
          </motion.h1>

          <motion.div {...item(0.25)} className="mt-4 h-9 text-xl font-medium text-slate-300 sm:text-2xl" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={role}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {role}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p {...item(0.35)} className="mt-5 text-lg leading-relaxed text-slate-400">
            {profile.headline} {profile.summary}
          </motion.p>

          <motion.div {...item(0.45)} className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-200"
            >
              Ver proyectos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Contáctame
            </a>
          </motion.div>
        </div>
      </div>

      <a
        href="#proyectos"
        aria-label="Bajar"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-500 md:block"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="block h-9 w-5 rounded-full border border-slate-600 p-1"
        >
          <span className="block h-1.5 w-1 rounded-full bg-slate-400 mx-auto" />
        </motion.span>
      </a>
    </section>
  );
}
