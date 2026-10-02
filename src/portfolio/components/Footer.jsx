import { profile } from '../data/profile';
import { useLang } from '../i18n/LanguageContext';

export default function Footer() {
  const { t, tr } = useLang();
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} {profile.name} · {tr(t.footer)}
    </footer>
  );
}
