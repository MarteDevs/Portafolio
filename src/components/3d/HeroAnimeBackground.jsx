import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRpg } from '../../context/RpgContext';

export default function HeroAnimeBackground() {
  const location = useLocation();
  const { stance, stanceData, isSlashing, combatPopups, handleAttack, bgMode } = useRpg();

  // Subtle mouse parallax state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 24; // -12px to +12px
      const y = ((e.clientY / innerHeight) - 0.5) * 16; // -8px to +8px
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine transform & opacity based on current route
  const getRouteStyles = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return {
          containerClass: 'right-[-8%] sm:right-[0%] md:right-[2%] lg:right-[4%] xl:right-[8%] top-[50%] -translate-y-1/2',
          opacity: 'opacity-95 md:opacity-100',
          scale: 'scale-95 sm:scale-100 lg:scale-105',
          interactive: true,
          auraSpread: '75%',
        };
      case '/projects':
        return {
          containerClass: 'right-[-12%] sm:right-[-6%] lg:right-[0%] top-[50%] -translate-y-1/2',
          opacity: 'opacity-15 sm:opacity-20',
          scale: 'scale-90',
          interactive: false,
          auraSpread: '40%',
        };
      case '/skills':
        return {
          containerClass: 'right-[-10%] sm:right-[5%] lg:right-[15%] top-[50%] -translate-y-1/2',
          opacity: 'opacity-20 sm:opacity-25',
          scale: 'scale-90 sm:scale-95',
          interactive: false,
          auraSpread: '60%',
        };
      case '/about':
        return {
          containerClass: 'right-[-10%] sm:right-[0%] lg:right-[5%] xl:right-[10%] top-[50%] -translate-y-1/2',
          opacity: 'opacity-70 sm:opacity-85',
          scale: 'scale-95 lg:scale-100',
          interactive: true,
          auraSpread: '70%',
        };
      case '/contact':
        return {
          containerClass: 'right-[-15%] sm:right-[-5%] lg:right-[2%] top-[50%] -translate-y-1/2',
          opacity: 'opacity-20 sm:opacity-25',
          scale: 'scale-90',
          interactive: false,
          auraSpread: '45%',
        };
      default:
        return {
          containerClass: 'right-0 top-[50%] -translate-y-1/2',
          opacity: 'opacity-25',
          scale: 'scale-90',
          interactive: false,
          auraSpread: '50%',
        };
    }
  };

  const routeStyle = getRouteStyles();
  const currentAura = stanceData[stance]?.aura || 'rgba(0, 255, 136, 0.35)';
  const currentHex = stanceData[stance]?.hex || '#00FF88';

  // If in 3D model mode on the hero page, hide the 2D background so 3D viewer is uninhibited
  if (bgMode === 'model3d' && location.pathname === '/') {
    return null;
  }

  return (
    <aside 
      aria-label="Fondo táctico del héroe 3D"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Dynamic Stance Atmospheric Radiant Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 75% 50%, ${currentAura} 0%, transparent ${routeStyle.auraSpread})`
        }}
      />

      {/* Cyber Grid Ambient Ground Reflection */}
      <div 
        className="absolute bottom-0 right-0 w-[60vw] h-[35vh] pointer-events-none opacity-20 [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{
          backgroundImage: `radial-gradient(${currentHex} 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Character Wrapper with Fluid Route Transitions & Mouse Parallax */}
      <div
        onClick={routeStyle.interactive ? handleAttack : undefined}
        className={`absolute max-h-[92vh] h-[780px] w-auto max-w-[90vw] sm:max-w-[70vw] lg:max-w-[55vw] flex items-center justify-center transition-all duration-700 ease-out ${routeStyle.containerClass} ${routeStyle.opacity} ${routeStyle.scale} ${
          routeStyle.interactive ? 'pointer-events-auto cursor-pointer group' : 'pointer-events-none'
        }`}
        style={{
          transform: `translate3d(${mouseOffset.x}px, calc(-50% + ${mouseOffset.y}px), 0)`,
        }}
        title={routeStyle.interactive ? "¡Haz clic sobre el Paladín para lanzar un ataque y ganar XP!" : undefined}
      >
        {/* Soft edge feathering mask so character melts seamlessly into the background */}
        <div className="relative w-full h-full flex items-center justify-center [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_88%,transparent_100%)] [mask-image:radial-gradient(ellipse_60%_80%_at_65%_45%,black_50%,transparent_100%)]">
          <img
            src="/assets/images/hero_anime.jpg"
            alt="Paladín Cyberpunk 3D Render"
            className={`w-full h-full object-contain object-center transform transition-transform duration-300 drop-shadow-[0_0_40px_rgba(0,0,0,0.95)] ${
              routeStyle.interactive ? 'group-hover:scale-[1.03]' : ''
            } ${
              isSlashing ? 'scale-[1.08] brightness-125 filter drop-shadow-[0_0_50px_rgba(0,255,136,0.95)]' : ''
            }`}
          />

          {/* Energy Blade Slash Overlay Animation */}
          {isSlashing && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00FF88]/40 to-white/70 pointer-events-none animate-pulse" />
          )}

          {/* Interactive Hint Badge (Only on Hero Page) */}
          {location.pathname === '/' && (
            <div className="absolute bottom-10 right-6 px-3 py-1 bg-[#0A0A0F]/90 border border-[#00FF88]/50 text-[#00FF88] text-[10px] font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,136,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-ping" />
              ⚔️ TOCA EL RENDER 3D PARA ATACAR
            </div>
          )}
        </div>

        {/* Floating Combat Popups */}
        {combatPopups.map((popup) => (
          <div
            key={popup.id}
            className="absolute z-50 font-retro text-sm sm:text-base lg:text-lg text-[#FFD700] text-glow-mana pointer-events-none animate-bounce"
            style={{ 
              top: '25%', 
              right: '35%',
              textShadow: '0 0 10px #FFD700, 0 0 20px #FF5E00'
            }}
          >
            {popup.text}
          </div>
        ))}
      </div>
    </aside>
  );
}
