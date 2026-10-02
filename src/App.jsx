import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RpgProvider } from './context/RpgContext';
import NavbarHUD from './components/layout/NavbarHUD';
import TerminalFooter from './components/layout/TerminalFooter';
import CRTOverlay from './components/layout/CRTOverlay';
import ManaTrail from './components/ui/ManaTrail';
import Hero3DBackground from './components/3d/Hero3DBackground';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  return (
    <RpgProvider>
      <div className="relative min-h-screen flex flex-col justify-between bg-[#0A0A0F] text-[#E6EDF3] font-mono selection:bg-[#00FF88] selection:text-[#0A0A0F] overflow-x-hidden">
        {/* Visual CRT Overlay (Scanlines & Vignette) */}
        <CRTOverlay />

        {/* Real 3D WebGL Background (Rendering public/models/scene.gltf or hero.glb fused with the page) */}
        <Hero3DBackground />

        {/* Interactive Cursor Mana Trail */}
        <ManaTrail />

        {/* Top HUD with RPG Vitals, Navigation & SFX toggles */}
        <NavbarHUD />

        {/* Main Quest Content Body */}
        <main className="flex-1 w-full relative z-10">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/skills" element={<SkillsSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Bottom Terminal Quest Log */}
        <TerminalFooter />
      </div>
    </RpgProvider>
  );
}
