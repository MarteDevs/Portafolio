import React, { createContext, useContext, useState } from 'react';
import { characterData } from '../data/characterData';
import { useAudio } from './AudioContext';
import { useAnime } from '../hooks/useAnime';

const RpgCtx = createContext(null);

export function RpgProvider({ children }) {
  const { playSwordSlash, playPowerUp, playSuccess } = useAudio();
  const { triggerConfetti } = useAnime();

  // Combat State
  const [level, setLevel] = useState(characterData.level);
  const [currentXp, setCurrentXp] = useState(characterData.stats.xp.current);
  const maxXp = characterData.stats.xp.max;
  const [combatPopups, setCombatPopups] = useState([]);
  const [isSlashing, setIsSlashing] = useState(false);

  // Tactical Stance: 'assault' | 'defense' | 'alchemy'
  const [stance, setStance] = useState('assault');

  // Active 3D Model: 'soldier' | 'hero' | 'xbot' | 'anime'
  const [activeModel, setActiveModel] = useState('soldier');

  const availableModels = [
    { id: 'soldier', label: '⚔️ PALADÍN', path: '/models/soldier.glb', desc: 'Soldado Cyberpunk Táctico' },
    { id: 'hero', label: '🤖 MECHA', path: '/models/hero.glb', desc: 'Robot Expressive Animado' },
    { id: 'xbot', label: '⚡ ANDROIDE', path: '/models/xbot.glb', desc: 'Androide Bipédico Sci-Fi' },
    { id: 'anime', label: '🌸 SKETCH', path: '/models/scene.gltf', desc: 'Ilustración Sketchfab' },
  ];

  const stanceData = {
    assault: { 
      label: 'MODO ASALTO', 
      rune: '⚡ FRONTEND MAGIC', 
      color: 'text-[#00FF88] border-[#00FF88]',
      hex: '#00FF88',
      aura: 'rgba(0, 255, 136, 0.35)',
    },
    defense: { 
      label: 'MODO DEFENSIVO', 
      rune: '🛡️ BACKEND RESILIENCE', 
      color: 'text-[#00D4FF] border-[#00D4FF]',
      hex: '#00D4FF',
      aura: 'rgba(0, 212, 255, 0.35)',
    },
    alchemy: { 
      label: 'MODO ALQUIMISTA', 
      rune: '🔮 SYSTEM ARCHITECTURE', 
      color: 'text-[#FF007F] border-[#FF007F]',
      hex: '#FF007F',
      aura: 'rgba(255, 0, 127, 0.35)',
    },
  };

  const handleAttack = () => {
    setIsSlashing(true);
    playSwordSlash();
    setTimeout(() => setIsSlashing(false), 450);

    const id = Date.now() + Math.random();
    const crits = [
      '⚡ CRÍTICO! +180 DMG', 
      '🗡️ BLADE SLASH! +90 XP', 
      '🔥 OVERDRIVE COMBO!', 
      '💎 PURGADO! +120 DMG',
      '⚔️ TACTICAL HIT! +75 XP'
    ];
    const randomCrit = crits[Math.floor(Math.random() * crits.length)];
    setCombatPopups((prev) => [...prev, { id, text: randomCrit }]);
    setTimeout(() => {
      setCombatPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1100);

    setCurrentXp((prev) => {
      const next = prev + 65;
      if (next >= maxXp) {
        setLevel((lvl) => lvl + 1);
        playSuccess();
        triggerConfetti(0.7, 0.5);
        return next - maxXp;
      }
      return next;
    });
  };

  const changeStance = (newStance) => {
    playPowerUp();
    setStance(newStance);
  };

  const xpPercent = Math.min(100, Math.round((currentXp / maxXp) * 100));

  return (
    <RpgCtx.Provider value={{
      level,
      currentXp,
      maxXp,
      xpPercent,
      isSlashing,
      combatPopups,
      stance,
      stanceData,
      changeStance,
      activeModel,
      setActiveModel,
      availableModels,
      handleAttack,
    }}>
      {children}
    </RpgCtx.Provider>
  );
}

export function useRpg() {
  const context = useContext(RpgCtx);
  if (!context) {
    throw new Error('useRpg must be used within an RpgProvider');
  }
  return context;
}
