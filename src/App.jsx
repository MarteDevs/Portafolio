import { LanguageProvider, useLang } from './portfolio/i18n/LanguageContext';
import Navbar from './portfolio/components/Navbar';
import Hero from './portfolio/components/Hero';
import Marquee from './portfolio/components/Marquee';
import Projects from './portfolio/components/Projects';
import Roles from './portfolio/components/Roles';
import Experience from './portfolio/components/Experience';
import Stack from './portfolio/components/Stack';
import Education from './portfolio/components/Education';
import Contact from './portfolio/components/Contact';
import Footer from './portfolio/components/Footer';

function Page() {
  const { t, tr } = useLang();
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {tr(t.skip)}
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Marquee />
        <Projects />
        <Roles />
        <Experience />
        <Stack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
