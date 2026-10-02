import Navbar from './portfolio/components/Navbar';
import Hero from './portfolio/components/Hero';
import Marquee from './portfolio/components/Marquee';
import Projects from './portfolio/components/Projects';
import Stack from './portfolio/components/Stack';
import About from './portfolio/components/About';
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
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
