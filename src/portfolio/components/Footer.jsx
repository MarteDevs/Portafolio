import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} {profile.name} · Hecho con React, Tailwind, Framer Motion y Spline
    </footer>
  );
}
