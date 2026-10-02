import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Volume2, VolumeX, Monitor, Shield, Zap, Sparkles, Menu, X } from 'lucide-react';
import { characterData } from '../../data/characterData';
import { useAudio } from '../../context/AudioContext';
import { useRpg } from '../../context/RpgContext';
import StatBar from '../ui/StatBar';

export default function NavbarHUD() {
  const { isMuted, toggleMute, scanlinesActive, toggleScanlines, playClick } = useAudio();
  const { level, currentXp, maxXp } = useRpg();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clockTime, setClockTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'CAMPO BASE', path: '/' },
    { name: 'MISIONES', path: '/projects' },
    { name: 'HABILIDADES', path: '/skills' },
    { name: 'PERSONAJE', path: '/about' },
    { name: 'INVOCAR', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0F]/95 backdrop-blur-md border-b-2 border-[#272938] shadow-lg">
      {/* Top HUD Stats Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 border-b border-[#1A1C28] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Hero Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={characterData.avatarUrl}
              alt={characterData.name}
              className="w-8 h-8 rounded border border-[#00FF88] bg-[#12121A] p-0.5 object-cover object-top"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#FF007F] text-[9px] font-retro px-1 text-white leading-none py-0.5">
              {level}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#E6EDF3] tracking-wider">{characterData.name}</span>
              <span className="hidden sm:inline-block text-[10px] text-[#00FF88] border border-[#00FF88]/40 px-1.5 py-0.2">
                LVL {level} // {characterData.roleTitle}
              </span>
            </div>
            <div className="text-[10px] text-[#8B949E] hidden md:block">
              {characterData.classBadge.replace(/LVL \d+/, `LVL ${level}`)}
            </div>
          </div>
        </div>

        {/* Dynamic Vitals: HP & XP */}
        <div className="hidden lg:flex items-center gap-5 w-72">
          <div className="w-1/2">
            <StatBar 
              label="HP" 
              current={characterData.stats.hp.current} 
              max={characterData.stats.hp.max} 
              color="rpg-hp" 
              size="sm"
            />
          </div>
          <div className="w-1/2">
            <StatBar 
              label="XP" 
              current={currentXp} 
              max={maxXp} 
              color="rpg-xp" 
              size="sm"
            />
          </div>
        </div>

        {/* System & Audio Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[#8B949E] text-[11px] hidden sm:inline-block">
            TIME: <span className="text-[#00FF88]">{clockTime}</span>
          </span>

          {/* Scanlines Toggle */}
          <button
            onClick={() => {
              playClick();
              toggleScanlines();
            }}
            className={`p-1.5 border transition-all ${
              scanlinesActive
                ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/10'
                : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3]'
            }`}
            title="Alternar Scanlines CRT"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playClick();
              toggleMute();
            }}
            className={`p-1.5 border transition-all ${
              !isMuted
                ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/10'
                : 'border-[#FF2A4D] text-[#FF2A4D] bg-[#FF2A4D]/10'
            }`}
            title={isMuted ? 'Activar Efectos SFX 8-Bit' : 'Silenciar SFX'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-[#272938] text-[#00FF88] hover:bg-[#12121A]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="hidden md:flex items-center justify-between py-2">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={playClick}
                className={({ isActive }) => `
                  px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-150 border
                  ${
                    isActive
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/10 shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                      : 'border-transparent text-[#8B949E] hover:text-[#E6EDF3] hover:border-[#272938]'
                  }
                `}
              >
                <span className="text-[#00FF88] mr-1 opacity-70">/</span>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="text-[11px] text-[#8B949E] font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
            <span className="text-[#00FF88]">SERVER: READY</span>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#1A1C28] flex flex-col space-y-2 font-mono">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) => `
                  px-3 py-2 text-xs border text-left
                  ${
                    isActive
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/10'
                      : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3]'
                  }
                `}
              >
                ▶ {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
