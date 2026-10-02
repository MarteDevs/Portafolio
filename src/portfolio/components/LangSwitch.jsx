import { LANGS } from '../i18n/ui';
import { useLang } from '../i18n/LanguageContext';

export default function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex rounded-full border border-white/10 p-0.5 text-xs font-semibold">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.name}
          lang={l.code}
          className={`grid h-8 min-w-[34px] place-items-center rounded-full px-2 transition ${
            lang === l.code ? 'bg-accent text-ink' : 'text-slate-400 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
