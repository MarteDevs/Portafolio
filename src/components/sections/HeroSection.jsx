import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, ArrowRight, Zap, Trophy, Flame, Sparkles, Shield, Cpu } from 'lucide-react';
import { characterData } from '../../data/characterData';
import RetroButton from '../ui/RetroButton';
import { useAudio } from '../../context/AudioContext';
import { useAnime } from '../../hooks/useAnime';
import { useRpg } from '../../context/RpgContext';

export default function HeroSection() {
  const navigate = useNavigate();
  const { playClick } = useAudio();
  const { animateCounter } = useAnime();
  const {
    level,
    currentXp,
    maxXp,
    xpPercent,
    stance,
    stanceData,
    changeStance,
    activeModel,
    setActiveModel,
    availableModels,
    handleAttack,
  } = useRpg();

  // Counter refs for Anime.js
  const counterRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    characterData.quickMetrics.forEach((metric, index) => {
      if (counterRefs[index]) {
        animateCounter(counterRefs[index], 0, metric.value, 1200, metric.value % 1 !== 0 ? 1 : 0);
      }
    });
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-130px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Foreground Content: Clean, High-Contrast Tactical HUD */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pointer-events-none">
        
        {/* Left Column (7 cols): UX-Optimized Typography & Controls */}
        <div className="lg:col-span-7 space-y-6 bg-gradient-to-r from-[#0A0A0F]/95 via-[#0A0A0F]/85 to-[#0A0A0F]/70 backdrop-blur-md p-6 sm:p-8 border border-[#272938]/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto">
          
          {/* Header Row: Combat Status + 3D Model Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#272938]/60 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#12121A] border border-[#00FF88]/40 text-[#00FF88] flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,136,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                STATUS: EN COMBATE
              </span>
              <span className={`px-2.5 py-1 bg-[#12121A] border ${stanceData[stance].color} hidden sm:inline-block`}>
                {stanceData[stance].rune}
              </span>
            </div>

            {/* Single Elegant 3D Model Switcher */}
            <div className="flex items-center gap-1 bg-[#0e1017] p-1 border border-[#272938]">
              <span className="text-[10px] text-[#8B949E] px-1.5 hidden md:inline-block">
                AVATAR 3D:
              </span>
              {availableModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playClick();
                    setActiveModel(m.id);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-mono border transition-all ${
                    activeModel === m.id
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/20 shadow-[0_0_10px_rgba(0,255,136,0.3)] font-bold'
                      : 'border-transparent text-[#8B949E] hover:text-[#E6EDF3] hover:border-[#272938]'
                  }`}
                  title={m.desc}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Identity & Title (Clear Visual Hierarchy) */}
          <div className="space-y-2">
            <h1 className="font-retro text-2xl sm:text-4xl text-[#E6EDF3] tracking-wide leading-tight">
              MARCO POLO <span className="text-[#00FF88] text-glow-mana">SILVA</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-[#00D4FF]">
              <Zap className="w-4 h-4 text-[#FF5E00]" />
              <span className="font-bold tracking-wider">{characterData.roleTitle}</span>
              <span className="text-[#8B949E]">//</span>
              <span className="text-[#E6EDF3]">CLASE: PALADÍN LVL {level}</span>
            </div>
          </div>

          {/* Value Proposition (Clear, Readable Lore) */}
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed border-l-2 border-[#00FF88] pl-3 py-1 bg-[#12121A]/40">
            {characterData.loreSummary}
          </p>

          {/* Tactical Stance Selector (Clean 3-Pill Layout) */}
          <div className="space-y-2 max-w-xl">
            <div className="text-[11px] font-mono text-[#8B949E] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FF5E00]" /> POSTURA TÁCTICA:
              </span>
              <span className="text-[10px] text-[#00FF88] font-mono">
                {stanceData[stance].label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => changeStance('assault')}
                className={`py-2 px-2 text-[11px] font-mono border transition-all text-center ${
                  stance === 'assault'
                    ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/15 shadow-[0_0_12px_rgba(0,255,136,0.3)] font-bold'
                    : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#12121A]'
                }`}
              >
                ⚔️ ASALTO (Front)
              </button>
              <button
                onClick={() => changeStance('defense')}
                className={`py-2 px-2 text-[11px] font-mono border transition-all text-center ${
                  stance === 'defense'
                    ? 'border-[#00D4FF] text-[#00D4FF] bg-[#00D4FF]/15 shadow-[0_0_12px_rgba(0,212,255,0.3)] font-bold'
                    : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#12121A]'
                }`}
              >
                🛡️ DEFENSA (Back)
              </button>
              <button
                onClick={() => changeStance('alchemy')}
                className={`py-2 px-2 text-[11px] font-mono border transition-all text-center ${
                  stance === 'alchemy'
                    ? 'border-[#FF007F] text-[#FF007F] bg-[#FF007F]/15 shadow-[0_0_12px_rgba(255,0,127,0.3)] font-bold'
                    : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#12121A]'
                }`}
              >
                🔮 ALQUIMIA (Arch)
              </button>
            </div>
          </div>

          {/* Live XP Progress Bar */}
          <div className="bg-[#12121A]/90 border border-[#272938] p-3 space-y-1.5 max-w-xl">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#00D4FF] flex items-center gap-1.5 font-bold">
                <Trophy className="w-3.5 h-3.5 text-[#FFD700]" /> NIVEL {level} (EXPERIENCIA)
              </span>
              <span className="text-[#8B949E]">
                {currentXp} / {maxXp} XP ({xpPercent}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#0A0A0F] border border-[#272938] p-[1px] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.6)] transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Action CTAs: High Impact Navigation & Combat */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <RetroButton
              variant="mana"
              size="md"
              icon={Swords}
              onClick={() => {
                playClick();
                navigate('/projects');
              }}
            >
              Misiones & Proyectos
            </RetroButton>

            <RetroButton
              variant="ember"
              size="md"
              icon={ArrowRight}
              onClick={() => {
                playClick();
                navigate('/skills');
              }}
            >
              Habilidades & Stack
            </RetroButton>

            <RetroButton
              variant="magic"
              size="md"
              icon={Sparkles}
              onClick={handleAttack}
            >
              ⚔️ Lanzar Golpe (+XP)
            </RetroButton>
          </div>

          {/* Quick Metrics Grid (Fixed: Clean Non-Overlapping Typography) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 max-w-xl">
            {characterData.quickMetrics.map((item, idx) => (
              <div key={idx} className="bg-[#12121A]/95 border border-[#272938] p-3 text-center font-mono">
                <div className="text-xl sm:text-2xl font-bold font-retro text-[#E6EDF3] flex items-center justify-center">
                  <span ref={counterRefs[idx]}>0</span>
                  <span className="text-sm text-[#00FF88] ml-0.5">{item.suffix}</span>
                </div>
                <div className="text-[10px] text-[#8B949E] uppercase tracking-wider mt-1 font-semibold truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty 5 cols on desktop for the 3D model to breathe in full focus */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

      </div>
    </section>
  );
}
