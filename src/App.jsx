import Navbar from './portfolio/components/Navbar';
import Hero from './portfolio/components/Hero';
import Marquee from './portfolio/components/Marquee';
import Projects from './portfolio/components/Projects';
import Experience from './portfolio/components/Experience';
import Stack from './portfolio/components/Stack';
import Education from './portfolio/components/Education';
import Contact from './portfolio/components/Contact';
import Footer from './portfolio/components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Experience />
        <Stack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
