import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, Github, Linkedin, CheckCircle2, AlertCircle } from 'lucide-react';
import { profile } from '../data/profile';
import Reveal, { SectionTitle } from './Reveal';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const input =
  'w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30';

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    if (data.get('company')) return; // honeypot anti-spam

    if (!configured) {
      const subject = encodeURIComponent(`Contacto desde portafolio — ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('name')} <${data.get('email')}>`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, { publicKey: PUBLIC_KEY });
      setStatus('ok');
      form.current.reset();
    } catch (err) {
      console.error('EmailJS:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <SectionTitle
        eyebrow="04 — Contacto"
        title="¿Tienes un proyecto o una vacante?"
        subtitle="Escríbeme y te respondo lo antes posible."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <form ref={form} onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-slate-400">Nombre</span>
                <input className={input} name="name" required placeholder="Tu nombre" autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-slate-400">Correo</span>
                <input className={input} type="email" name="email" required placeholder="tu@correo.com" autoComplete="email" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm text-slate-400">Mensaje</span>
              <textarea className={`${input} resize-none`} name="message" rows={5} required placeholder="Cuéntame sobre el proyecto o la oportunidad…" />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:opacity-90 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              </button>
              <p role="status" aria-live="polite" className="text-sm">
                {status === 'ok' && (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> ¡Mensaje enviado! Te responderé pronto.
                  </span>
                )}
                {status === 'error' && (
                  <span className="inline-flex items-center gap-1.5 text-red-400">
                    <AlertCircle className="h-4 w-4" /> No se pudo enviar. Escríbeme a {profile.email}.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-3 lg:col-span-2">
          {[
            { icon: Mail, label: 'Correo', value: profile.email, href: `mailto:${profile.email}` },
            { icon: Github, label: 'GitHub', value: 'github.com/MarteDevs', href: profile.github },
            { icon: Linkedin, label: 'LinkedIn', value: 'in/noark-mps', href: profile.linkedin },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-5 transition hover:border-white/25"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent transition group-hover:bg-accent/20">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-slate-500">{c.label}</div>
                <div className="truncate text-sm font-medium text-white">{c.value}</div>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
